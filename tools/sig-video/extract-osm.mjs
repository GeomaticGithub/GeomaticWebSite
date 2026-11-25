// Extracts the Casablanca road network from an OpenStreetMap .osm.pbf file (no dependency: minimal PBF reader).
//   node extract-osm.mjs <morocco-latest.osm.pbf> [district.json] > writes casablanca.json
// Source file: https://download.geofabrik.de/africa/morocco-latest.osm.pbf  (© OpenStreetMap contributors, ODbL)
// district.json (optional): a Nominatim search result with polygon_geojson=1 for the highlighted district.
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

const [, , pbfPath, districtPath] = process.argv;
const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const BB = { s: 33.47, w: -7.78, n: 33.67, e: -7.42 };
const CLASS = { motorway: 0, trunk: 0, motorway_link: 0, trunk_link: 0, primary: 1, primary_link: 1, secondary: 2, tertiary: 2, residential: 3, unclassified: 3, living_street: 3 };

class Reader {
  constructor(b, p = 0, e = b.length) { this.b = b; this.p = p; this.e = e; }
  varint() { let r = 0, m = 1, c; do { c = this.b[this.p++]; r += (c & 0x7f) * m; m *= 128; } while (c & 0x80); return r; }
  svarint() { const n = this.varint(); return n % 2 ? -(n + 1) / 2 : n / 2; }
  // iterate fields: cb(fieldNo, wireType, reader) — for length-delimited fields a sub-reader is passed
  each(cb) { while (this.p < this.e) { const tag = this.varint(), f = Math.floor(tag / 8), w = tag & 7;
    if (w === 0) cb(f, w, this.varint()); else if (w === 2) { const l = this.varint(); cb(f, w, new Reader(this.b, this.p, this.p + l)); this.p += l; }
    else if (w === 1) this.p += 8; else if (w === 5) this.p += 4; else throw new Error("wire type " + w); } }
  bytes() { return this.b.subarray(this.p, this.e); }
}

const nodeIdx = new Map(); const lons = [], lats = [];
const lines = [[], [], [], []], coast = [];
const cities = []; // every place=city / place=town node of the extract (the whole country)
// 3D model area: the best-mapped part of Casablanca in OSM (Maârif / Gauthier / Bourgogne), about 1.75 km wide
const LOCAL = { s: 33.5863, w: -7.6480, n: 33.6021, e: -7.6290 };
const buildings = []; let bTagged = 0, bAll = 0;
// built-up density over the whole area: footprint area per 250 m cell
const CELL = 250, GX = Math.ceil(((BB.e - BB.w) * Math.cos(33.57 * Math.PI / 180) * 111320) / CELL), GY = Math.ceil(((BB.n - BB.s) * 110540) / CELL);
const density = new Float32Array(GX * GY);
let blocks = 0, nodesSeen = 0, waysKept = 0;

function parseBlock(buf) {
  const strings = []; let gran = 100, latOff = 0, lonOff = 0; const groups = [];
  new Reader(buf).each((f, w, v) => { if (f === 1) v.each((f2, w2, s) => { if (f2 === 1) strings.push(s.bytes()); }); else if (f === 2) groups.push(v); else if (f === 17) gran = v; else if (f === 19) latOff = v; else if (f === 20) lonOff = v; });
  const str = (i) => strings[i].toString("utf8");
  let kHighway = -1, kNatural = -1, vCoast = -1, kBuilding = -1, kHeight = -1, kLevels = -1, kPlace = -1, kName = -1, kNameFr = -1, kPop = -1, vCity = -1, vTown = -1;
  strings.forEach((s, i) => { const n = s.length; if (n < 4 || n > 10 && n !== 15) return; const t = s.toString("latin1");
    if (t === "place") kPlace = i; else if (t === "name") kName = i; else if (t === "name:fr") kNameFr = i; else if (t === "population") kPop = i; else if (t === "city") vCity = i; else if (t === "town") vTown = i;
    if (t === "highway") kHighway = i; else if (t === "natural") kNatural = i; else if (t === "coastline") vCoast = i; else if (t === "building") kBuilding = i; else if (t === "height") kHeight = i; else if (t === "building:levels") kLevels = i; });
  for (const g of groups) g.each((f, w, v) => {
    if (f === 2) { // DenseNodes
      let rid, rlat, rlon, rkv = null; v.each((f2, w2, x) => { if (f2 === 1) rid = x; else if (f2 === 8) rlat = x; else if (f2 === 9) rlon = x; else if (f2 === 10) rkv = x; });
      let id = 0, la = 0, lo = 0;
      while (rid.p < rid.e) { id += rid.svarint(); la += rlat.svarint(); lo += rlon.svarint(); nodesSeen++;
        const lat = 1e-9 * (latOff + gran * la), lon = 1e-9 * (lonOff + gran * lo);
        if (rkv && rkv.p < rkv.e) { let place = -1, name = -1, nameFr = -1, pop = -1; for (;;) { const k = rkv.varint(); if (k === 0) break; const val = rkv.varint(); if (k === kPlace) place = val; else if (k === kName) name = val; else if (k === kNameFr) nameFr = val; else if (k === kPop) pop = val; }
          if (place >= 0 && (place === vCity || place === vTown)) cities.push({ name: nameFr >= 0 ? str(nameFr) : name >= 0 ? str(name) : "", lon: +lon.toFixed(4), lat: +lat.toFixed(4), pop: pop >= 0 ? parseInt(str(pop).replace(/\D/g, ""), 10) || 0 : 0, place: place === vCity ? "city" : "town" }); }
        if (lat > BB.s && lat < BB.n && lon > BB.w && lon < BB.e) { nodeIdx.set(id, lons.length); lons.push(lon); lats.push(lat); } }
    } else if (f === 3 && (kHighway >= 0 || kBuilding >= 0 || (kNatural >= 0 && vCoast >= 0))) { // Way
      let keys, vals, refs; v.each((f2, w2, x) => { if (f2 === 2) keys = x; else if (f2 === 3) vals = x; else if (f2 === 8) refs = x; });
      if (!keys || !refs) return;
      let cls = -1, isCoast = false, isBuilding = false, hTag = NaN, lTag = NaN;
      while (keys.p < keys.e) { const k = keys.varint(), val = vals.varint(); if (k === kHighway) { const c = CLASS[str(val)]; if (c !== undefined) cls = c; } else if (k === kNatural && val === vCoast) isCoast = true;
        else if (k === kBuilding) isBuilding = true; else if (k === kHeight) hTag = parseFloat(str(val)); else if (k === kLevels) lTag = parseFloat(str(val)); }
      if (isBuilding && cls < 0) { // footprint: density grid everywhere, full geometry in the local 3D area
        let ref = 0; const pts = []; while (refs.p < refs.e) { ref += refs.svarint(); const i = nodeIdx.get(ref); if (i !== undefined) pts.push(lons[i], lats[i]); }
        if (pts.length < 8) return;
        let a = 0, cx = 0, cy = 0; const n = pts.length / 2, kx = Math.cos(33.57 * Math.PI / 180) * 111320, ky = 110540;
        for (let i = 0; i < n; i++) { const j = (i + 1) % n, x1 = pts[i * 2] * kx, y1 = pts[i * 2 + 1] * ky, x2 = pts[j * 2] * kx, y2 = pts[j * 2 + 1] * ky; a += x1 * y2 - x2 * y1; cx += pts[i * 2]; cy += pts[i * 2 + 1]; }
        const area = Math.abs(a) / 2; cx /= n; cy /= n;
        const gx = Math.floor(((cx - BB.w) * kx) / CELL), gy = Math.floor(((BB.n - cy) * ky) / CELL); if (gx >= 0 && gx < GX && gy >= 0 && gy < GY) density[gy * GX + gx] += area;
        if (cy > LOCAL.s && cy < LOCAL.n && cx > LOCAL.w && cx < LOCAL.e) { bAll++; const h = hTag > 0 ? hTag : lTag > 0 ? lTag * 3.2 : 0; if (h > 0) bTagged++;
          buildings.push({ h: Math.round(h * 10) / 10, p: pts.map((v) => Math.round(v * 1e6)) }); }
        return; }
      if (cls < 0 && !isCoast) return;
      let ref = 0, cur = []; const out = isCoast ? coast : lines[cls];
      const flush = () => { if (cur.length >= 4) { out.push(cur); waysKept++; } cur = []; };
      while (refs.p < refs.e) { ref += refs.svarint(); const i = nodeIdx.get(ref); if (i === undefined) flush(); else cur.push(Math.round(lons[i] * 1e5), Math.round(lats[i] * 1e5)); }
      flush();
    }
  });
}

const fd = fs.openSync(pbfPath, "r"); const size = fs.statSync(pbfPath).size; let pos = 0; const t0 = Date.now();
const read = (n) => { const b = Buffer.allocUnsafe(n); fs.readSync(fd, b, 0, n, pos); pos += n; return b; };
while (pos < size) {
  const hlen = read(4).readUInt32BE(0); let type = "", dsize = 0;
  new Reader(read(hlen)).each((f, w, v) => { if (f === 1) type = v.bytes().toString("latin1"); else if (f === 3) dsize = v; });
  const blob = read(dsize); if (type !== "OSMData") continue;
  let raw = null, z = null; new Reader(blob).each((f, w, v) => { if (f === 1) raw = v.bytes(); else if (f === 3) z = v.bytes(); });
  parseBlock(raw ?? zlib.inflateSync(z)); blocks++;
}
// highlighted district outline
let district = null;
if (districtPath) { const d = JSON.parse(fs.readFileSync(districtPath, "utf8"))[0]; const g = d.geojson; const ring = g.type === "Polygon" ? g.coordinates[0] : g.coordinates[0][0];
  district = { name: d.display_name.split(",")[0].split(" ⵜ")[0].trim(), ring: ring.flatMap(([lon, lat]) => [Math.round(lon * 1e5), Math.round(lat * 1e5)]) }; }
cities.sort((a, b) => b.pop - a.pop);
fs.writeFileSync(path.join(dir, "cities.json"), JSON.stringify({ source: "© OpenStreetMap contributors (ODbL), Geofabrik extract — nodes tagged place=city or place=town", cities }));
fs.writeFileSync(path.join(dir, "centre3d.json"), JSON.stringify({ bbox: LOCAL, scale: 1e6, source: "© OpenStreetMap contributors (ODbL), Geofabrik extract", note: "h = height in metres from the OSM tags height / building:levels; 0 = not tagged (estimated at render time)", buildings }));
const out = { density: { cell: CELL, gx: GX, gy: GY, areaM2: Array.from(density, (v) => Math.round(v)) }, bbox: BB, scale: 1e5, source: "© OpenStreetMap contributors (ODbL), Geofabrik extract", classes: ["motorway/trunk", "primary", "secondary/tertiary", "local streets"], lines, coast, district };
fs.writeFileSync(path.join(dir, "casablanca.json"), JSON.stringify(out));
console.log({ blocks, nodesSeen, bboxNodes: lons.length, waysKept, perClass: lines.map((l) => l.length), coast: coast.length, district: district?.name, cities: cities.filter((c) => c.place === "city").length, towns: cities.filter((c) => c.place === "town").length, localBuildings: bAll, withHeightTag: bTagged, densityCells: density.filter((v) => v > 0).length, tallest: buildings.map((b) => b.h).sort((a, b) => b - a).slice(0, 8), MB: (fs.statSync(path.join(dir, "casablanca.json")).size / 1048576).toFixed(2), seconds: ((Date.now() - t0) / 1000).toFixed(0) });
