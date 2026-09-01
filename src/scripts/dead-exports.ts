#!/usr/bin/env node
// @non-harmonic: walks the tree from disk — host boundary only.
//
// dead-exports — WHAT NOTHING IMPORTS. The dry finder asks whether a script re-declares boilerplate; the orphan
// finder asks whether build output outlived its source. Neither asks the plainest question: is this export read
// by anyone at all?
//
// IT COUNTS EVERY CONSUMER, and the first draft did not. Scanning src/ alone reported 248, and handleAnalytics
// sat near the top of that list — imported by worker.js, which the scan never opened. A dead-code finder that
// cannot see the worker, the VitePress theme or the published packages does not find dead code, it finds code it
// did not look for. With all four read the count is 244, and the four it lost were real consumers.
//
// IT REPORTS, IT DOES NOT DELETE. An unreferenced export is a QUESTION — deliberate public surface, a constant
// kept as a record, or genuinely dead — and the answer is not in the reference count. The guard's advisory tier
// was emptied on the argument that a finder which cannot refuse a proof does not belong in the gate, so this is
// a script the desk runs and reads.
//
//   npm run x -- dead-exports          → the count and the first names
//   npm run x -- dead-exports -- --all → every one, for a sweep someone is actually going to read
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

const ALL = process.argv.includes('--all')

const walk = (dir: string, out: string[] = []): string[] => {
  if (!existsSync(join(ROOT, dir))) return out
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) { if (e.name === 'node_modules' || e.name === 'dist') continue; walk(rel, out) }
    else if (/\.(ts|js|vue|md)$/.test(e.name)) out.push(rel)
  }
  return out
}

// every place an export can be READ from: the library, the worker, the served theme and pages, the packages
const consumers = [...walk('src'), ...walk('docs'), ...walk('packages'), 'worker.js'].filter((f) => existsSync(join(ROOT, f)))
const text = new Map(consumers.map((f) => [f, readFileSync(join(ROOT, f), 'utf8')]))

// src/index.ts is the DECLARED public surface — an export named there is API, never dead
const surface = text.get('src/index.ts') ?? ''
const sources = consumers.filter((f) => f.startsWith('src/') && f.endsWith('.ts') && !f.endsWith('.test.ts') && f !== 'src/index.ts')

const dead: { file: string; name: string }[] = []
for (const f of sources) {
  for (const m of (text.get(f) ?? '').matchAll(/^export (?:async )?(?:function|const) ([A-Za-z_][A-Za-z0-9_]*)/gm)) {
    const name = m[1]!
    if (new RegExp(`\\b${name}\\b`).test(surface)) continue
    let used = false
    for (const [g, gb] of text) { if (g === f) continue; if (new RegExp(`\\b${name}\\b`).test(gb)) { used = true; break } }
    if (!used) dead.push({ file: f, name })
  }
}

const byFile = new Map<string, number>()
for (const d of dead) byFile.set(d.file, (byFile.get(d.file) ?? 0) + 1)
const worst = [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)

console.log(`· dead-exports — ${dead.length} export(s) read by nothing, across ${byFile.size} file(s) and ${consumers.length} consumers scanned`)
console.log('  (public surface excluded: an export named in src/index.ts is API, whatever its reference count)')
for (const [f, n] of worst) console.log(`    ${String(n).padStart(3)}  ${f}`)
if (ALL) for (const d of dead) console.log(`    ${d.file} → ${d.name}`)
else {
  console.log(`  run with --all for every name; this REPORTS, it does not delete — an unreferenced export is a question, not a verdict`)
  // THE CAVEAT THAT COST THREE WRONG MEASUREMENTS IN ONE SESSION, printed where the next reader will meet it.
  // A static scan cannot see DYNAMIC DISPATCH, and this tree runs on it: scripts/run.ts discovers every file in
  // scripts/ with readdirSync and invokes it by name, so `npm run x -- <anything>` reaches all 300-odd of them.
  // An ad-hoc "nothing imports this" scan therefore reports the entire scripts/ directory as unreachable, which
  // is how I concluded 286 dead modules (including the CLI every git hook runs), then 137, then 143 "unrun"
  // scripts — each number smaller and each still an artefact of the same blind spot.
  console.log(`  NOT REACHABILITY: scripts/ is dispatched dynamically (run.ts reads the directory), so no static`)
  console.log(`  scan can call a script unreachable. Unrun-by-a-chain is a different question — lean/dormant-scripts.json`)
}
