#!/usr/bin/env node
// support — the CODE half of the honesty audit, decided WITHOUT an agent. Prose earns its place by citing a sealed
// theorem (provenance.ts); a MODULE earns its place by being REACHABLE. A src module is SUPPORTED iff the import
// graph reaches it from a ROOT — the public API (index.ts, what the package/site/MCP consume), the build/CI scripts,
// or the tests. A module no root can reach is DEAD: nothing imports it, so nothing it claims is exercised — it is
// "the rest" the purge removes. This is a pure static decision (a reachability closure over the import edges), so CI
// and the trial decide it with no agent judgment: run it, read the verdict. Integrity, not truth.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { merkleFold } from '../address.js'
import { toUuid } from '../address.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const SRC = join(ROOT, 'src')

// Every .ts under src/ (the modules under audit), as repo-relative paths.
const walk = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.ts') ? [join(d, e.name)] : [])
const all = walk(SRC).map((f) => relative(ROOT, f)).sort()

// Resolve a relative import specifier (written with a .js extension, NodeNext style) to the .ts it compiles from.
const resolveImport = (fromFile: string, spec: string): string | null => {
  if (!spec.startsWith('.')) return null // a bare specifier is a dependency, not a src module
  const base = resolve(ROOT, dirname(fromFile), spec)
  for (const cand of [base.replace(/\.js$/, '.ts'), base + '.ts', join(base, 'index.ts')])
    if (existsSync(cand)) return relative(ROOT, cand)
  return null
}

// The import edges: file → the src modules it imports (from … '…' and dynamic import('…')).
const importsOf = (file: string): string[] => {
  const text = readFileSync(join(ROOT, file), 'utf8')
  const specs = [...text.matchAll(/(?:from|import)\s*\(?\s*['"](\.[^'"]+)['"]/g)].map((m) => m[1])
  return [...new Set(specs.map((s) => resolveImport(file, s)).filter((x): x is string => x !== null))]
}
const edges = new Map<string, string[]>(all.map((f) => [f, importsOf(f)]))

// ROOTS — the entry points nothing needs to import to justify: the public API (index.ts), every build/CI script, and
// every test (wherever it lives — a *.test.ts or anything under a test/tests dir). A module is SUPPORTED iff reachable
// from a root; the roots are supported by definition (they ARE the surface the package, site, MCP, CI and tests
// consume). Everything the closure never reaches is dead.
const isRoot = (f: string): boolean =>
  f === 'src/index.ts' || f.startsWith('src/scripts/') || /\.test\.ts$/.test(f) || /(^|\/)tests?\//.test(f)
const roots = all.filter(isRoot)

// worker.js is the Cloudflare EDGE ENTRY POINT — a real root that lives at the repo root and imports the COMPILED
// dist/*.js of the src modules it serves in production (adjudicate, address, mcp-http, analytics-handler, …). It is
// consumed exactly like index.ts consumes the public API, so its imports are supported. Map each ./dist/X.js back to
// src/X.ts (the audit scans src, not dist) and seed the closure with them, so a worker-only module is not "dead".
const workerReached = ((): string[] => {
  const wf = 'worker.js'
  if (!existsSync(join(ROOT, wf))) return []
  const text = readFileSync(join(ROOT, wf), 'utf8')
  const specs = [...text.matchAll(/(?:from|import)\s*\(?\s*['"](\.\/dist\/[^'"]+)\.js['"]/g)].map((m) => m[1])
  return [...new Set(specs.map((s) => join('src', s.replace(/^\.\/dist\//, '') + '.ts')).filter((c) => existsSync(join(ROOT, c))))]
})()

const reached = new Set<string>([...roots, ...workerReached])
const stack = [...roots, ...workerReached]
while (stack.length) {
  const f = stack.pop() as string
  for (const dep of edges.get(f) || []) if (!reached.has(dep)) { reached.add(dep); stack.push(dep) }
}

const supported = all.filter((f) => reached.has(f))
const unsupported = all.filter((f) => !reached.has(f)) // dead: no root reaches it

// R&D ROUTING — nothing is waste (the reactor's law: refusal starts the next fusion). An unsupported module is not
// deleted-and-lost; it becomes a LEAD sent to research & development with a DEVELOP WAVE — LOCAL options first (wire
// it to a root, promote its claim to a Lean theorem so the trial verifies it, or find the caller it should serve),
// and ONLY IF the local wave is exhausted does the lead escalate ONLINE (external research — domainWave's outer wave /
// deepResearch). The purge removes it from the main line, but the lead survives in research-leads.json: no lead lost.
const exportsOf = (file: string): string[] =>
  [...readFileSync(join(ROOT, file), 'utf8').matchAll(/^export\s+(?:async\s+)?(?:function|const|class|interface|type|enum)\s+([A-Za-z0-9_]+)/gm)].map((m) => m[1])
const leads = unsupported.map((module) => ({
  module,
  capability: exportsOf(module),                       // what would be lost — the exports no root reaches
  reason: 'no root reaches it — nothing in the public API, the scripts, or the tests imports it',
  develop: {
    local: [
      'wire it to a root — import its exports from index.ts (public API), a script, or a test',
      'promote its claim to a Lean theorem so the trial verifies it, not just runs it',
      'find the existing caller it was meant to serve, and connect it',
    ],
    online: 'if every local option is exhausted, escalate the lead ONLINE — external research (domainWave outer wave / deepResearch) on whether the capability is worth reviving; then TRIAL the results AT QUANTUM SCALE — adjudicate each finding VERIFIED/UNVERIFIED and fold them to the order-invariant quantum receipt (quantumReceipt / merkleGravity) — so nothing revived enters unverified, before it is archived',
  },
  receipt: toUuid('lead:' + module),
}))
const receipt = merkleFold([toUuid('support:' + all.length + ':' + supported.length), ...leads.map((l) => l.receipt)])

console.log('  SUPPORT AUDIT — a module earns its place by being REACHABLE (no agent decides; the import graph does).')
console.log(`    modules   : ${all.length}  (${roots.length} roots: index.ts + ${roots.filter((r) => r.startsWith('src/scripts/')).length} scripts + ${roots.filter((r) => /\.test\.ts$/.test(r) || /(^|\/)tests?\//.test(r)).length} tests)`)
console.log(`    supported : ${supported.length}  (reachable from a root)`)
console.log(`    dead      : ${unsupported.length}${unsupported.length ? ' — ' + unsupported.join(', ') : ' — none; every module is reached'}`)
if (leads.length) console.log(`    → ${leads.length} lead(s) sent to R&D (research-leads.json): local wave first, then online + trial at quantum scale — no lead lost`)
console.log(`    receipt   : ${receipt}`)

const report = { modules: all.length, roots: roots.length, supported: supported.length, dead: unsupported, receipt }
writeFileSync(join(ROOT, 'support-audit.json'), JSON.stringify(report, null, 2) + '\n')
// The R&D queue — every unsupported lead with its develop wave. Written even when empty (an empty queue is a fact:
// nothing is unsupported), so the file itself is the recomputable record that no lead was lost.
writeFileSync(join(ROOT, 'research-leads.json'), JSON.stringify({ leads, receipt }, null, 2) + '\n')

// --check: a non-zero exit when a dead module exists, so CI/the pre-push gate BLOCKS on unsupported code the same way
// it blocks on an overreaching claim. The lead is ALREADY captured in research-leads.json before the block, so the
// gate says "route it, then purge" — never "silently keep dead code". Without --check it only reports the decision.
if (process.argv.includes('--check') && unsupported.length > 0) {
  console.log(`  ✗ ${unsupported.length} unsupported module(s) — dead code no root reaches. Their leads are in research-leads.json; purge them from the main line or wire them to a root.`)
  process.exit(1)
}
