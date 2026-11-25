// Drives headless Edge to render the hero videos (no ffmpeg, no video software).
//
// Version 1 — 3D map only (index.html):
//   node make.mjs stills <fr|en> [times]        -> still-<lang>-<t>.jpg control frames
//   node make.mjs video  <fr|en> [bitrate]      -> sig-maroc-<lang>.mp4 + poster
// Version 2 — 3D map + real city footage (villes.html, needs clips/*.mp4):
//   node make.mjs villes stills <fr|en> [times] -> still-villes-<lang>-<t>.jpg
//   node make.mjs villes video  <fr|en> [bitrate] -> sig-maroc-villes-<lang>.mp4 + poster
// Version 3 — space → Morocco → analyses → map + signature (ouverture.html, needs assets/, data.json, maroc.json):
//   node make.mjs ouverture stills <fr|en> [times]
//   node make.mjs ouverture video  <fr|en> [bitrate] -> sig-maroc-ouverture-<lang>.mp4 + poster
// City extracts (once, from the source clips listed in clips.json, downloaded into <srcDir>/<id>.mp4):
//   node make.mjs prep <srcDir>                 -> clips/<id>.mp4 (720×720, 3.5 s)
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const args = process.argv.slice(2);
const variant = ["villes", "ouverture", "casablanca"].includes(args[0]) ? args.shift() : null; // null = version 1 (index.html)
const [mode, a1, a2] = args;
const page = mode === "prep" ? "prep.html" : variant ? variant + ".html" : "index.html";
const prefix = variant ? "sig-maroc-" + variant : "sig-maroc";
const lang = mode === "prep" ? "fr" : a1 || "fr";
const srcDir = mode === "prep" ? path.resolve(a1 || ".") : null;

const TYPES = { ".html": "text/html; charset=utf-8", ".json": "application/json", ".mp4": "video/mp4", ".js": "text/javascript", ".jpg": "image/jpeg", ".png": "image/png" };
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split("?")[0].slice(1)) || page;
  const f = name.startsWith("src/") && srcDir ? path.join(srcDir, name.slice(4)) : path.join(dir, name);
  if (!fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); return res.end(); }
  const type = TYPES[path.extname(f)] || "application/octet-stream", size = fs.statSync(f).size, range = req.headers.range;
  if (range) { // video seeking needs byte ranges
    const [s, e] = range.replace("bytes=", "").split("-"); const start = +s, end = e ? +e : size - 1;
    res.writeHead(206, { "content-type": type, "accept-ranges": "bytes", "content-range": `bytes ${start}-${end}/${size}`, "content-length": end - start + 1 });
    return fs.createReadStream(f, { start, end }).pipe(res);
  }
  res.writeHead(200, { "content-type": type, "accept-ranges": "bytes", "content-length": size });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/${page}?lang=${lang}${process.env.CLEAN ? "&clean=1" : ""}`; // CLEAN=1: stills without captions
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9900 + Math.floor(Math.random() * 90);
const p = spawn(edge, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/edge-sig-${port}`, "--no-first-run", "--autoplay-policy=no-user-gesture-required", "--window-size=760,760", url], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target; for (let i = 0; i < 60 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {} if (!target) await sleep(200); }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expression) => { const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 700)); return r.result.result.value; };
// wait until the page has loaded its scripts (fonts and the muxer come from the network)
const ready = mode === "prep" ? "typeof window.prep" : "typeof window.init";
for (let i = 0; i < 100; i++) { const r = await send("Runtime.evaluate", { expression: ready, returnByValue: true }); if (r.result?.result?.value === "function") break; await sleep(300); }
try {
  if (mode === "prep") {
    fs.mkdirSync(path.join(dir, "clips"), { recursive: true });
    for (const cfg of JSON.parse(fs.readFileSync(path.join(dir, "clips.json"), "utf8"))) {
      const out = JSON.parse(await evalJs(`window.prep(${JSON.stringify(cfg)})`));
      const f = path.join(dir, "clips", `${cfg.id}.mp4`); fs.writeFileSync(f, Buffer.from(out.video, "base64"));
      console.log(cfg.id, { frames: out.frames, source: out.source, MB: (fs.statSync(f).size / 1048576).toFixed(2) });
    }
  } else {
    console.log("init:", await evalJs("window.init()"));
    if (mode === "stills") {
      for (const t of (a2 || "0,5.5,9.5,13.5,17,19.6").split(",")) {
        fs.writeFileSync(path.join(dir, `still-${variant ? variant + "-" : ""}${lang}-${t}.jpg`), Buffer.from(await evalJs(`window.still(${t})`), "base64"));
      }
      console.log("stills written");
    } else {
      const t0 = Date.now();
      const out = JSON.parse(await evalJs(`window.render(${a2 || 1000000})`));
      const mp4 = path.join(dir, `${prefix}-${lang}.mp4`);
      fs.writeFileSync(mp4, Buffer.from(out.video, "base64"));
      fs.writeFileSync(path.join(dir, `${prefix}-${lang}-poster.jpg`), Buffer.from(await evalJs("window.still(window.POSTER_T ?? 0)"), "base64"));
      console.log({ frames: out.frames, MB: (fs.statSync(mp4).size / 1048576).toFixed(2), seconds: ((Date.now() - t0) / 1000).toFixed(1) });
    }
  }
} catch (e) { console.error("ERROR", e.message); process.exitCode = 1; }
ws.close(); p.kill(); server.close();
