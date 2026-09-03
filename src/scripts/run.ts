#!/usr/bin/env node
// run — THE ONE DISPATCHER. package.json carried ~49 scripts of a single identical shape,
// "<name>": "npm run build && node dist/scripts/<file>.js" — a hand-typed line per script, which is the same
// repetition the `dry` law refuses in source, living in JSON where no finder was looking. Three of them had already
// rotted (the lean:<domain> family named 30 domains for a ledger that has 66) because a hand-typed list cannot know
// what exists; discovery can.
//
//   npm run x -- court [flags]     → uuidnaOS needs (same as os-mcp-gate; agnostic Alpine applet)
//   npm run x -- <script> [args…]  → run exactly that dist/scripts/<script>.js
//   npm run x                       → list every runnable script, discovered, never declared
//
// Named `x` (not `run`) because `npm run run` reads badly and npm reserves no such alias. A script keeps its OWN
// package.json entry only when something outside package.json calls it by name — CI, a git hook, the README or a
// docs page — because those are contracts with the outside world; scriptsGaps() in one-receipt.ts computes exactly
// that set and objects to any thin wrapper that is not in it, so this file cannot rot back into 49 lines.
import { readdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { HERE, ROOT } from './api.js'
import { bootOS } from '../quantum/os/index.js'

/** every dist/scripts/*.js that is a runnable entry point, discovered from disk.
 *  A compiled TEST is not a script — `all-run.test` sat in this list and could not be run, which is noise in the
 *  one place a reader goes to find out what CAN be run. */
export function runnable(): string[] {
  return readdirSync(HERE)
    .filter((f) => f.endsWith('.js') && !f.endsWith('.d.js') && !f.endsWith('.test.js')
      && f !== 'run.js' && f !== 'api.js')
    .map((f) => f.replace(/\.js$/, ''))
    .sort()
}

/** purposeOf(name) → the one-line purpose the script's OWN header already carries.
 *
 *  DRAINED, NEVER AUTHORED. 301 scripts and 228 of them reachable only through this dispatcher, listed as bare
 *  names: to find `lean-one` — the single-wing Lean loop, 0.087s against ~5 minutes for the whole chain — a reader
 *  had to already know it existed. Seven wings were enumerated the slow way for exactly that reason. Every script
 *  here opens with a comment saying what it does; the listing just never read it. A shebang is skipped, a
 *  `@non-harmonic:` marker and a `<name> —` prefix are stripped, and a script whose header says nothing shows
 *  nothing — the COUNT of those is printed, so the gap is a number that can shrink rather than an impression. */
export function purposeOf(name: string): string {
  try {
    for (const raw of readFileSync(join(ROOT, 'src', 'scripts', name + '.ts'), 'utf8').split('\n').slice(0, 10)) {
      const l = raw.trim()
      // BOTH COMMENT SHAPES. The first version read `//` only and reported crypto-measure as carrying no purpose
      // — it carries one, in a `/** … */` block. The count of purposeless scripts is meant to name a real gap, so
      // a reader that can only see one comment style manufactures gaps instead of finding them.
      if (!/^(\/\/|\/\*\*|\*)/.test(l)) continue
      const t = l.replace(/^(\/\/|\/\*\*|\*)\s*/, '')
        .replace(/^@non-harmonic:\s*/, '')
        .replace(new RegExp('^' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*[—–-]\\s*'), '')
        .trim()
      if (t.length > 3) return t
    }
  } catch { /* a script with no readable header shows none, and is counted */ }
  return ''
}

/** the family a script belongs to — its prefix before the first dash. */
const familyOf = (name: string): string => (name.includes('-') ? name.slice(0, name.indexOf('-')) : name)

/** the scripts package.json calls BY NAME — the header above says why those keep their own entry: something
 *  outside package.json (CI, a git hook, the README, a docs page) calls them, so they are the contracts with the
 *  outside world. That makes them the answer to "what do I actually run?", which is the question a bare list of
 *  299 filenames does not answer. Derived from package.json by construction, so it tracks what npm exposes. */
const namedByNpm = (): Set<string> => {
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
    const body = Object.values(pkg.scripts ?? {}).join(' ')
    return new Set([...body.matchAll(/dist\/scripts\/([a-z0-9-]+)\.js/g)].map((m) => m[1]!))
  } catch { return new Set() }
}

const [name, ...rest] = process.argv.slice(2)
try {
  bootOS()
} catch (e) {
  console.error('x — uuidnaOS REFUSED TO BOOT (hex image did not verify): ' + (e instanceof Error ? e.message : String(e)))
  process.exit(1)
}
if (!name || name === '--find' || name === '--help' || name === '--all') {
  // THE DEFAULT ANSWERS "WHAT DO I RUN?", not "here are 299 files". A flat list of every filename was the whole
  // listing, and grouping it by prefix made that worse rather than better: measured, 299 scripts fall into 97
  // families of which lean=120, gen=47, quantum=12 and audit=11 carry 190 between them while 93 families hold one
  // or two — so 97 group headers were 91 lines of noise around four real families. So the default shows the
  // ENTRY POINTS npm itself exposes, plus the family counts; --find searches every name AND purpose; --all is the
  // full list for anyone who wants it.
  const all = runnable()
  const needle = name === '--find' ? (rest[0] ?? '').toLowerCase() : ''
  const rows = all.map((s) => ({ name: s, why: purposeOf(s), family: familyOf(s) }))
  const fam = new Map<string, number>()
  for (const r of rows) fam.set(r.family, (fam.get(r.family) ?? 0) + 1)
  const shown = needle
    ? rows.filter((r) => r.name.toLowerCase().includes(needle) || r.why.toLowerCase().includes(needle))
    : name === '--all' ? rows
      : rows.filter((r) => namedByNpm().has(r.name))
  // NO Math.* — the determinism law hard-rejects it tree-wide (smoke.test.ts caught this line), so the column
  // width is FOLDED: the longest name, floored at 8 and capped at 28, by comparison rather than by a library.
  const width = shown.reduce((w, r) => (r.name.length > w ? r.name.length : w), 8) > 28
    ? 28
    : shown.reduce((w, r) => (r.name.length > w ? r.name.length : w), 8)
  console.log('x — uuidnaOS hex booted. uuidna_* via MCP, Alpine via uuidna_exec, firmware scripts after the image.')
  console.log('\n  npm run x -- <script> [args…]   run one'
    + '\n  npm run x -- --find <word>      search every name AND purpose'
    + '\n  npm run x -- --all             every runnable script\n')
  console.log(needle ? `${shown.length} of ${all.length} match "${needle}":\n`
    : name === '--all' ? `all ${shown.length} runnable scripts:\n`
      : `${shown.length} of ${all.length} are entry points npm names (the rest run through this dispatcher):\n`)
  const groups = [...new Set(shown.map((r) => r.family))].sort()
  for (const f of groups) {
    const inFamily = shown.filter((r) => r.family === f)
    if (groups.length > 1 && inFamily.length > 1) console.log(`  ── ${f} (${inFamily.length})`)
    for (const r of inFamily) console.log(`    ${r.name.padEnd(width)}  ${r.why.slice(0, 92)}`)
  }
  if (!needle && name !== '--all') {
    const big = [...fam].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1])
    console.log(`\n  families: ${big.map(([f, n]) => `${f} ${n}`).join(' · ')} — and ${all.length - big.reduce((s, [, n]) => s + n, 0)} more across ${[...fam].filter(([, n]) => n < 3).length} small families`)
    console.log('  find one by what it DOES:  npm run x -- --find enumerate    npm run x -- --find deploy')
  }
  const silent = shown.filter((r) => !r.why).length
  if (silent) console.log(`\n  ${silent} of ${shown.length} shown carry no header purpose — a script that cannot say what it does is the gap to close.`)
  process.exit(0)
}
if (name.startsWith('uuidna_')) {
  const { callTool } = await import('../mcp.js')
  const args = name === 'uuidna_exec'
    ? { line: rest.join(' ') }
    : rest[0]?.startsWith('{')
      ? JSON.parse(rest[0]) as Record<string, unknown>
      : {}
  const out = await Promise.resolve(callTool(name, args))
  console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 2))
  process.exit(0)
}
const path = join(HERE, `${name.replace(/\.js$/, '')}.js`)
if (existsSync(path)) {
  process.argv = [process.argv[0]!, path, ...rest]
  await import(pathToFileURL(path).href)
  process.exit(0)
}
const { uuidnaExec } = await import('../quantum/os/exec/index.js')
const ran = uuidnaExec([name, ...rest].join(' '))
for (const line of ran.output) console.log(line)
process.exit(ran.ok ? 0 : 1)
