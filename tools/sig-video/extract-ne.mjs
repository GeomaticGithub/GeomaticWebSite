// Builds maroc.json for the hero film (ouverture.html) from public-domain data only:
//   - roads:  Natural Earth 10m roads (public domain)            ne_10m_roads.geojson
//   - cities: Wikidata (CC0), cities and urban communes ≥ 20 000 wd.json (SPARQL result, see README)
//   - outline: data.json (Natural Earth, already in this folder)
// Usage: node extract-ne.mjs <folder containing ne_10m_roads.geojson and wd.json>
// It also computes the two network analyses shown in the film (plain Dijkstra on the road graph):
//   t = travel time from Casablanca (minutes), h = nearest regional capital by travel time.
import fs from "node:fs";
import path from "node:path";
const src = process.argv[2];
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const DATA = JSON.parse(fs.readFileSync(path.join(here, "data.json"), "utf8"));
const ring = DATA.morocco[0];
const inside = (x, y) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const RAD = Math.PI / 180;
const km = (a, b) => { const x = (b[0] - a[0]) * RAD * Math.cos(((a[1] + b[1]) / 2) * RAD), y = (b[1] - a[1]) * RAD; return Math.hypot(x, y) * 6371; };

/* ---- cities (Wikidata) ---- */
const KEEP = /^(city|big city|urban commune of Morocco|town|port city|national capital|municipality)$/;
const DROP = /rural commune|province|prefecture|region|arrondissement|neighborhood|quarter|circle/;
let places = JSON.parse(fs.readFileSync(path.join(src, "wd.json"), "utf8")).results.bindings
  .map((r) => { const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(r.coord.value), types = r.types.value.split("/");
    return m && { name: r.itemLabel.value, lon: +m[1], lat: +m[2], pop: +r.pop.value, ok: types.some((t) => KEEP.test(t)) && !types.some((t) => DROP.test(t)) }; })
  .filter((p) => p && p.ok && p.pop < 5e6 && inside(p.lon, p.lat))
  .sort((a, b) => b.pop - a.pop);
// one dot per place: drop duplicates (several statements or several items for the same town) within 6 km
const kept = [];
for (const p of places) if (!kept.some((q) => km([p.lon, p.lat], [q.lon, q.lat]) < 6)) kept.push(p);
places = kept.map(({ name, lon, lat, pop }) => ({ name, lon: +lon.toFixed(4), lat: +lat.toFixed(4), pop }));

/* ---- roads (Natural Earth) ---- */
const SPEED = { "Major Highway": 100, "Secondary Highway": 80, Road: 65, Unknown: 55 }; // km/h, assumed per road class
const CLS = { "Major Highway": 0, "Secondary Highway": 1, Road: 1, Unknown: 2 };
const lines = [];
for (const f of JSON.parse(fs.readFileSync(path.join(src, "ne_10m_roads.geojson"), "utf8")).features) {
  const g = f.geometry, type = f.properties.type; if (!g || !(type in SPEED)) continue;
  for (const l of g.type === "LineString" ? [g.coordinates] : g.coordinates) {
    let cur = []; // keep the parts located inside the outline
    for (const p of l) { if (p[0] > -18 && p[0] < 0 && p[1] > 20 && p[1] < 36.5 && inside(p[0], p[1])) cur.push([p[0], p[1]]); else { if (cur.length > 1) lines.push({ type, pts: cur }); cur = []; } }
    if (cur.length > 1) lines.push({ type, pts: cur });
  }
}
// graph: vertices closer than ~1 km are the same node, so roads that meet are connected
const id = new Map(), nodes = [], adj = [];
const nid = (p) => { const k = Math.round(p[0] / 0.01) + "," + Math.round(p[1] / 0.01); let i = id.get(k); if (i === undefined) { i = nodes.length; id.set(k, i); nodes.push(p); adj.push([]); } return i; };
for (const l of lines) { l.ids = l.pts.map(nid);
  for (let i = 1; i < l.ids.length; i++) { const a = l.ids[i - 1], b = l.ids[i]; if (a === b) continue; const w = (km(l.pts[i - 1], l.pts[i]) / SPEED[l.type]) * 60; adj[a].push([b, w]); adj[b].push([a, w]); } }
// line ends that stop short of another road (gaps up to 4 km) are joined to the nearest node
let joins = 0;
for (const l of lines) for (const e of [0, l.ids.length - 1]) { const a = l.ids[e]; if (adj[a].length > 1) continue;
  let best = -1, bd = 4; for (let i = 0; i < nodes.length; i++) { if (i === a || l.ids.includes(i)) continue; const d = km(nodes[a], nodes[i]); if (d < bd) { bd = d; best = i; } }
  if (best >= 0) { const w = (bd / 55) * 60; adj[a].push([best, w]); adj[best].push([a, w]); joins++; } }
const nearest = (lon, lat) => { let best = 0, bd = 1e9; for (let i = 0; i < nodes.length; i++) { const d = km(nodes[i], [lon, lat]); if (d < bd) { bd = d; best = i; } } return [best, bd]; };
function dijkstra(sources) { // sources: [node, label]; returns travel time and label of the nearest source for every node
  const t = new Float64Array(nodes.length).fill(Infinity), h = new Int16Array(nodes.length).fill(-1), done = new Uint8Array(nodes.length);
  for (const [n, lab] of sources) { t[n] = 0; h[n] = lab; }
  for (;;) { let u = -1, m = Infinity; for (let i = 0; i < nodes.length; i++) if (!done[i] && t[i] < m) { m = t[i]; u = i; } if (u < 0) break; done[u] = 1;
    for (const [v, w] of adj[u]) if (t[u] + w < t[v]) { t[v] = t[u] + w; h[v] = h[u]; } }
  return { t, h };
}
const CASA = [-7.59, 33.57];
// capitals of the twelve regions
const HUBS = [["Tanger", -5.80, 35.77], ["Oujda", -1.91, 34.68], ["Fès", -5.00, 34.03], ["Rabat", -6.84, 34.02], ["Béni Mellal", -6.35, 32.34], ["Casablanca", -7.59, 33.57],
  ["Marrakech", -7.99, 31.63], ["Errachidia", -4.43, 31.93], ["Agadir", -9.60, 30.42], ["Guelmim", -10.06, 28.99], ["Laâyoune", -13.20, 27.15], ["Dakhla", -15.93, 23.71]];
const fromCasa = dijkstra([[nearest(...CASA)[0], 0]]);
const hubNodes = HUBS.map(([n, lon, lat], i) => { const [node, d] = nearest(lon, lat); return { n, lon, lat, node, gapKm: +d.toFixed(1), i }; });
const alloc = dijkstra(hubNodes.map((h) => [h.node, h.i]));
const roads = lines.map((l) => ({ c: CLS[l.type], p: l.pts.flatMap((p) => [+p[0].toFixed(4), +p[1].toFixed(4)]),
  t: l.ids.map((i) => (Number.isFinite(fromCasa.t[i]) ? Math.round(fromCasa.t[i]) : -1)), h: l.ids.map((i) => alloc.h[i]) }));
// each city is attached to the hub of its nearest road node (if a road passes within 60 km)
for (const p of places) { const [n, d] = nearest(p.lon, p.lat); p.h = d < 60 ? alloc.h[n] : -1; p.t = d < 60 && Number.isFinite(fromCasa.t[n]) ? Math.round(fromCasa.t[n]) : -1; }

const reached = [...fromCasa.t].filter(Number.isFinite).length;
const out = { source: "Roads: Natural Earth (public domain). Cities: Wikidata (CC0). Outline: Natural Earth.", speeds: SPEED,
  hubs: hubNodes.map(({ n, lon, lat }) => ({ n, lon, lat })), places, roads };
fs.writeFileSync(path.join(here, "maroc.json"), JSON.stringify(out));
console.log({ places: places.length, over100k: places.filter((p) => p.pop >= 1e5).length, top: places.slice(0, 8).map((p) => p.name + " " + p.pop).join(", "),
  lines: lines.length, nodes: nodes.length, joins, reachedFromCasa: `${reached}/${nodes.length}`, maxHours: +(Math.max(...[...fromCasa.t].filter(Number.isFinite)) / 60).toFixed(1),
  hubGapsKm: hubNodes.map((h) => `${h.n} ${h.gapKm}`).join(", "), hoursToHubs: hubNodes.map((h) => `${h.n} ${(fromCasa.t[h.node] / 60).toFixed(1)}`).join(", "),
  placesOnNetwork: places.filter((p) => p.h >= 0).length, kB: Math.round(fs.statSync(path.join(here, "maroc.json")).size / 1024) });
