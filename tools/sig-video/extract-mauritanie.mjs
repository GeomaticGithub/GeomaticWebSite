// Builds mauritanie.json: the outline of Mauritania and its towns, for the hero film (casablanca.html).
// Sources, both in the public domain (Natural Earth, https://github.com/nvkelso/natural-earth-vector, folder "geojson"):
//   ne_10m_admin_0_countries_mar.geojson   — countries, "Moroccan point of view": the file the outline of Morocco in data.json comes from
//   ne_10m_populated_places_simple.geojson — towns
// node extract-mauritanie.mjs <folder holding the two files>
import fs from "node:fs";
import path from "node:path";
const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const src = process.argv[2];
if (!src) { console.error("usage: node extract-mauritanie.mjs <folder with the Natural Earth files>"); process.exit(1); }
const read = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const TOLERANCE = 0.02; // degrees: detail kept on the outline (the film shows the country a few hundred pixels wide)

const morocco = read(path.join(dir, "data.json")).morocco[0];
// data.json stores rounded coordinates: a point is "on the outline of Morocco" when one of its points is within 0.0015°
const twin = (p) => morocco.find((m) => Math.abs(m[0] - p[0]) < 1.5e-3 && Math.abs(m[1] - p[1]) < 1.5e-3);
const onMorocco = { has: (p) => Boolean(twin(p)) };
const key = (p) => p;

const countries = read(path.join(src, "ne_10m_admin_0_countries_mar.geojson")).features;
const mrt = countries.find((f) => (f.properties.ADM0_A3 ?? f.properties.adm0_a3) === "MRT");
const rings = mrt.geometry.type === "Polygon" ? [mrt.geometry.coordinates[0]] : mrt.geometry.coordinates.map((p) => p[0]);
let ring = rings.sort((a, b) => b.length - a.length)[0].map(([x, y]) => [x, y]);
if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) ring.pop();

// The border with Morocco: on that stretch only the points Morocco's outline also has are kept,
// so that the two outlines follow exactly the same line (no gap, no overlap).
const shared = ring.map((p) => onMorocco.has(key(p)));
const n = ring.length, idx = shared.map((s, i) => (s ? i : -1)).filter((i) => i >= 0);
if (idx.length < 2) throw new Error("the outline of Mauritania shares no point with the outline of Morocco in data.json");
// start the ring at the end of the border, so the border is one stretch at the end of the list
let gap = 0, startAfter = idx[0];
for (let k = 0; k < idx.length; k++) { const a = idx[k], b = idx[(k + 1) % idx.length], d = (b - a + n) % n; if (d > gap) { gap = d; startAfter = a; } }
ring = ring.slice(startAfter).concat(ring.slice(0, startAfter)); // ring[0] = last border point, then the rest of the country, then the border
const borderFrom = ring.findIndex((p, i) => i > 0 && onMorocco.has(key(p)));
// border points take the very coordinates of Morocco's outline
const snap = (p) => twin(p) ?? p;
const free = ring.slice(0, borderFrom + 1).map((p, i, a) => (i === 0 || i === a.length - 1 ? snap(p) : p)), border = ring.slice(borderFrom + 1).filter((p) => onMorocco.has(key(p))).map(snap);

// Douglas-Peucker on the part that is not the border
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) { const [a, b] = stack.pop(); let far = -1, max = tol;
    const [ax, ay] = pts[a], [bx, by] = pts[b], dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-12;
    for (let i = a + 1; i < b; i++) { const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / len; if (d > max) { max = d; far = i; } }
    if (far > 0) { keep[far] = 1; stack.push([a, far], [far, b]); } }
  return pts.filter((_, i) => keep[i]);
}
const outline = simplify(free, TOLERANCE).concat(border).map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)]);

const inside = (x, y) => { let c = false; for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) { const [xi, yi] = outline[i], [xj, yj] = outline[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const places = read(path.join(src, "ne_10m_populated_places_simple.geojson")).features
  .map((f) => ({ name: f.properties.name, lon: +f.geometry.coordinates[0].toFixed(3), lat: +f.geometry.coordinates[1].toFixed(3), pop: f.properties.pop_max, capital: f.properties.featurecla === "Admin-0 capital" }))
  // Natural Earth files Saint-Louis under Mauritania; the town is in Senegal, on the border river
  .filter((p) => inside(p.lon, p.lat) && p.name !== "Saint-Louis")
  .sort((a, b) => b.pop - a.pop);

fs.writeFileSync(path.join(dir, "mauritanie.json"), JSON.stringify({ source: "Natural Earth (public domain): ne_10m_admin_0_countries_mar, ne_10m_populated_places_simple", outline, places }) + "\n");
console.log({ outlinePoints: outline.length, ofWhichBorderWithMorocco: border.length, places: places.length, largest: places.slice(0, 4).map((p) => p.name) });
