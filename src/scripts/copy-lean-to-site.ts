#!/usr/bin/env node
// copy-lean-to-site — SERVE THE PROOFS AND THE SEEDS. Every theorem page links to /lean/<File>.lean (its actual
// `by decide` source), but VitePress builds only markdown into its outDir (docs/.vitepress/dist — the default), so
// /lean/*.lean would 404 on the deployed site — the theorem and its proof were one click apart, and the click was
// broken. This copies lean/*.lean into <outDir>/lean/ AFTER the VitePress build, so every proof link resolves.
// It ALSO serves the PayloadCMS page seeds (src/seeds/<uuid>/page.json, the imprint-named append-only versions) at
// /seeds/<uuid>/page.json — the seed folder stays the ONE source (DRY); the build serves it, nothing duplicates it.
// It ALSO serves the repo-root llm.txt (the canonical agent entry point src/index.ts cites) at /llm.txt AND at
// /llms.txt (the emerging llms-txt standard path) — same DRY rule: the root file is the one source, the build serves it.
// It ALSO serves the Alpine catalogue (mirror/alpine-catalogue.tsv) at /alpine-catalogue.tsv — the committed census
// uuidnaOS primes in the browser. docs/public/alpine-catalogue.tsv is a BUILD ARTIFACT (gitignored); VitePress will
// only copy it when a prior local `gen-alpine-catalogue` left it there, so a clean Cloudflare Workers Build would
// ship a 404 for the catalogue and report Alpine as ABSENT. Copy from the committed mirror after the VitePress
// build so production cannot disagree with the repo.
// It ALSO serves lean/unlocks.json at /lean/unlocks.json — the unlock board census linked from /unlocks.
// Idempotent; runs in docs:build (and thus in the Cloudflare deploy build). Integrity— it serves the
// source, it proves nothing new.
import { readdirSync, mkdirSync, copyFileSync, existsSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
// the served list has one declaration, which ship-preflight measures against the asset limit before a landing
import { LEAN_JSON_SERVE } from '../ship-preflight.js'
import { CATALOGUE_FILE, CATALOGUE_OVERLAY_FILE, CATALOGUE_TESTING_FILE, parseCatalogue, mergeCatalogueLayers, catalogueTsvBody } from '../quantum/os/catalogue/index.js'
import { bakeLedgerAssets } from './ledger-deposit.js'
import { statementShardsOf, stationShardsOf } from '../statement-shards.js'
import { THEOREMS, isPagelessFile } from '../theorems/index.js'
import { EDGE_ROOT } from '../theorems/edge-root.js'
import { callTool, bakeableDoors, recomputeDoors, enumDoors } from '../mcp.js'
import { CLOUDFLARE_ASSET_BYTES } from '../ship-preflight.js'
import { DOOR_FILE_PARSE } from '../edge-ledger.js'

const LEAN = join(ROOT, 'lean')
const SEEDS = join(ROOT, 'src', 'seeds')
// the VitePress outDir — the DEFAULT (<srcDir>/.vitepress/dist); keep in lock-step with `vitepress build docs`
const SITE = join(ROOT, 'docs', '.vitepress', 'dist')

if (!existsSync(SITE)) {
  console.error('✗ copy-lean-to-site — ./docs/.vitepress/dist (the VitePress outDir) does not exist; run `vitepress build docs` first (this step runs after it in docs:build)')
  process.exit(1)
}

const OUT = join(SITE, 'lean')
mkdirSync(OUT, { recursive: true })
let n = 0
for (const f of readdirSync(LEAN)) if (f.endsWith('.lean')) { copyFileSync(join(LEAN, f), join(OUT, f)); n++ }

// Derived lean JSON the site cites as /lean/<name>.json (e.g. unlocks board). Proofs are .lean; these are
// structured receipts linked from markdown. Missing source FAILS — same dead-pointer law as llm.txt.
let j = 0
for (const f of LEAN_JSON_SERVE) {
  const src = join(LEAN, f)
  if (!existsSync(src)) {
    console.error(`✗ copy-lean-to-site — lean/${f} missing: pages link /lean/${f}; regenerate (gen-unlocks) before docs:build`)
    process.exit(1)
  }
  copyFileSync(src, join(OUT, f))
  j++
}

const SEEDS_OUT = join(SITE, 'seeds')
let s = 0
if (existsSync(SEEDS)) {
  for (const dir of readdirSync(SEEDS)) {
    const page = join(SEEDS, dir, 'page.json')
    if (!existsSync(page)) continue
    mkdirSync(join(SEEDS_OUT, dir), { recursive: true })
    copyFileSync(page, join(SEEDS_OUT, dir, 'page.json'))
    s++
  }
  // the vanilla-Payload sync fold (payload:sync) — one fetch, the whole site in stock Payload shapes
  const sync = join(SEEDS, 'payload-sync.json')
  if (existsSync(sync)) { mkdirSync(SEEDS_OUT, { recursive: true }); copyFileSync(sync, join(SEEDS_OUT, 'payload-sync.json')) }
}

// llm.txt — src/index.ts names it the canonical reference for agents, so a 404 there is a dead pointer in the
// source's own front door. Served at BOTH /llm.txt (the cited path) and /llms.txt (the llms-txt standard path
// agents probe first). Missing source FAILS the build — the pointer must never ship dead.
const LLM = join(ROOT, 'llm.txt')
if (!existsSync(LLM)) {
  console.error('✗ copy-lean-to-site — ./llm.txt missing: src/index.ts cites it as canonical; restore it (the build refuses to ship the dead pointer)')
  process.exit(1)
}
copyFileSync(LLM, join(SITE, 'llm.txt'))
copyFileSync(LLM, join(SITE, 'llms.txt'))

// THE ALPINE CATALOGUE — committed in mirror/, served at /alpine-catalogue.tsv. Without this copy a clean
// Workers Build has no docs/public/alpine-catalogue.tsv (gitignored), VitePress cannot passthrough it, and
// uuidnaOS in the browser reports the census ABSENT while the repo holds 28,639 packages. Fail loud if the
// mirror is missing — same law as llm.txt: the pointer must never ship dead.
const CATALOGUE = join(ROOT, CATALOGUE_FILE)
if (!existsSync(CATALOGUE)) {
  console.error(`✗ copy-lean-to-site — ${CATALOGUE_FILE} missing: the browser OS primes from /alpine-catalogue.tsv; restore it with \`node dist/scripts/gen-alpine-catalogue.js\` (the build refuses to ship the dead pointer)`)
  process.exit(1)
}
const baseText = readFileSync(CATALOGUE, 'utf8')
const overlayPath = join(ROOT, CATALOGUE_OVERLAY_FILE)
const testingPath = join(ROOT, CATALOGUE_TESTING_FILE)
const overlay = existsSync(overlayPath) ? parseCatalogue(readFileSync(overlayPath, 'utf8')) : []
const testing = existsSync(testingPath) ? parseCatalogue(readFileSync(testingPath, 'utf8')) : []
const merged = mergeCatalogueLayers(parseCatalogue(baseText), testing, overlay)
const catHeader = baseText.split('\n').filter((l) => l.charCodeAt(0) === 35).join('\n') + '\n'
writeFileSync(join(SITE, 'alpine-catalogue.tsv'), catHeader + catalogueTsvBody(merged) + '\n')

// THE LEDGER'S ROWS, SERVED BESIDE THE ROOT THAT NAMES THEM. worker.js reads the rows a claim cites through
// src/edge-ledger.ts, which asks for one document per content address; those documents are written here under
// /ledger/<address>.json from the same ledger the bundle's root was baked from, so the edge never depends on another
// host holding them (ledger-deposit bakeLedgerAssets states the measurement that made this necessary).
const ledgerAssets = bakeLedgerAssets(join(SITE, 'ledger'))

// THE STATEMENT INDEX, SHARDED BESIDE THE PIECES (statement-shards.ts says why): /ledger/statements/<id>.json, each an
// array of [key, statement], every entry verified against the baked root by the edge as it is held.
const shardDir = join(SITE, 'ledger', 'statements')
mkdirSync(shardDir, { recursive: true })
const shards = statementShardsOf(THEOREMS)
for (const [id, entries] of Object.entries(shards)) writeFileSync(join(shardDir, `${id}.json`), JSON.stringify(entries))

// THE STATION INDEX, SHARDED THE SAME WAY (statement-shards.ts stationShardsOf): /ledger/stations/<id>.json, each a map of
// station → keys over the rows the lattice seats (pageless wings excluded, as lattice.ts index excludes them).
const stationDir = join(SITE, 'ledger', 'stations')
mkdirSync(stationDir, { recursive: true })
const stationShards = stationShardsOf(THEOREMS.filter((t) => !isPagelessFile(t.file)))
for (const [id, seats] of Object.entries(stationShards)) writeFileSync(join(stationDir, `${id}.json`), JSON.stringify(seats))

// THE DOORS TOO LARGE TO BUNDLE, AND THE RECOMPUTE DOORS, AS FILES (mcp.ts callTool reads them at the edge). Each answer
// is the host's own, computed twice here and written only when the two runs agree — the bake's determinism rule: a door
// whose two answers differ reads a machine, not the ledger, and is left to run (and refuse) at the edge with that said.
// An answer over the per-file limit is written as a pointer to the pieces that hold its rows, so the door still answers.
const doorDir = join(SITE, 'doors')
mkdirSync(doorDir, { recursive: true })
const stableJson = (v: unknown): string => JSON.stringify(v, (_k, x) => (x && typeof x === 'object' && !Array.isArray(x)
  ? Object.fromEntries(Object.keys(x as Record<string, unknown>).sort().map((k) => [k, (x as Record<string, unknown>)[k]])) : x))
const oversized = bakeableDoors().filter((n) => /bundle budget/.test(String((EDGE_ROOT?.facts?.doors?.[n] as { unmeasured?: string } | undefined)?.unmeasured ?? '')))
const doorJobs: { file: string; name: string; args: Record<string, unknown> }[] = [
  ...oversized.map((name) => ({ file: `${name}.json`, name, args: {} })),
  ...recomputeDoors().map((name) => ({ file: `${name}@recompute.json`, name, args: { recompute: true } })),
  ...enumDoors().flatMap((d) => d.values.map((v) => ({ file: `${d.name}@${d.arg}=${v}.json`, name: d.name, args: { [d.arg]: v } }))),
]
const doorsWritten: string[] = [], doorsPointed: string[] = [], doorsSkipped: string[] = []
for (const job of doorJobs) {
  let a: string, b: string
  try { a = stableJson(await callTool(job.name, job.args)); b = stableJson(await callTool(job.name, job.args)) }
  catch (e) { doorsSkipped.push(`${job.name}: the host threw — ${String((e as Error)?.message ?? e).slice(0, 80)}`); continue }
  if (a !== b) { doorsSkipped.push(`${job.name}: two host runs disagreed`); continue }
  if (a.length > CLOUDFLARE_ASSET_BYTES) {
    writeFileSync(join(doorDir, job.file), JSON.stringify({
      kind: 'answer-served-as-rows', door: job.name, bytes: a.length, rows: `/ledger/${ledgerAssets.root}.json`,
      honest: `the bare answer is ${a.length} bytes, over the ${CLOUDFLARE_ASSET_BYTES}-byte limit one served file may have; every row it lists is served under the manifest named in rows, one piece per wing, each piece's bytes recomputing its address`,
    }))
    doorsPointed.push(job.name)
  } else if (a.length > DOOR_FILE_PARSE) {
    // too large to parse in an isolate: the answer is served whole beside a pointer the edge returns unparsed
    const whole = job.file.replace(/\.json$/, '.answer.json')
    writeFileSync(join(doorDir, whole), a)
    writeFileSync(join(doorDir, job.file), JSON.stringify({
      kind: 'answer-served-as-file', door: job.name, bytes: a.length, href: `/doors/${whole}`,
      honest: `the answer is ${a.length} bytes, over the ${DOOR_FILE_PARSE} an isolate can parse beside the request; it is served whole at href, the host's own answer for the same ledger`,
    }))
    doorsPointed.push(job.name)
  } else { writeFileSync(join(doorDir, job.file), a); doorsWritten.push(job.name) }
}
for (const s of doorsSkipped) console.log(`  · door file not written — ${s}`)

// THE SECOND FORENSIC — the VitePress dead-link check is architecturally blind to non-page assets (it validates
// page routes only), so /lean/* and /seeds/* are allowlisted there and verified HERE instead: scan every built
// HTML page for /lean and /seeds references and FAIL the build if any referenced file was not served. Together
// the two checks leave zero blind spots — no link ships unverified.
const htmlFiles: string[] = []
const walk = (dir: string) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p)
    else if (e.endsWith('.html')) htmlFiles.push(p)
  }
}
walk(SITE)
const missing = new Set<string>()
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8')
  for (const m of html.matchAll(/(?:href|src)="(\/(?:lean|seeds)\/[^"#?]+)/g)) {
    const target = join(SITE, decodeURIComponent(m[1]))
    if (!existsSync(target)) missing.add(`${m[1]} (referenced by ${f.slice(SITE.length + 1)})`)
  }
}
if (missing.size) {
  console.error(`✗ copy-lean-to-site — ${missing.size} referenced asset(s) NOT served:`)
  for (const x of missing) console.error(`    ${x}`)
  process.exit(1)
}

console.log(`✓ copy-lean-to-site — ${n} Lean proof files at /lean/*.lean, ${j} lean JSON at /lean/*.json, ${s} Payload page seeds at /seeds/<uuid>/page.json, llm.txt at /llm.txt + /llms.txt, ${CATALOGUE_FILE} at /alpine-catalogue.tsv, the ledger's ${ledgerAssets.pieces} pieces and manifest ${ledgerAssets.root} at /ledger/<address>.json, ${Object.keys(shards).length} statement shards at /ledger/statements/<id>.json, ${Object.keys(stationShards).length} station shards at /ledger/stations/<id>.json, ${doorsWritten.length} door answers and ${doorsPointed.length} row pointers at /doors/, every /lean and /seeds reference in ${htmlFiles.length} built pages verified served (the theorem, its proof, and its seed — one click apart, no click dead)`)
