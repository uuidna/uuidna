#!/usr/bin/env node
// harmonic-scan — FAIL ALL NON-HARMONIC code, FAST. Two rules, both enforced here (so a full 4-minute test wave is not
// needed to catch a violation):
//
//  (1) NON-HARMONIC OPS — network fetch, async/await, Promise, timers, process, eval/Function — are non-recomputable by
//      nature. Allowed ONLY in a top-level LIBRARY module that self-declares `// @non-harmonic: <reason>` (a NAMED
//      boundary visible in review). A library module carrying such an op WITHOUT the declaration FAILS. (Scripts and
//      the os/ + drivers/ boundary legitimately orchestrate — they are not part of the recomputable library core.)
//
//  (2) DETERMINISM hard-reject — host Math.* calls, wall-clock (the Date now/constructor reads), and RNG (the Math
//      random read / getRandomValues) — has NO exemption ANYWHERE, not even in a generator or a boundary file: exact
//      integer arithmetic settles the two coins, a host intrinsic never can. A single call in ANY src/**.ts FAILS.
//      This is the rule that a stray Math.* floor call in a lean-*.ts generator must trip in SECONDS, not only at the
//      pre-push smoke test. (This scanner names those intrinsics only via regex, never as a bare call, so it stays clean itself.)
//
// This scanner strips whole comment lines, then applies rule (1) to the library core and rule (2) to the WHOLE tree.
// A security scanner over-reports before it under-reports; a rare inline-comment false positive is cleared by moving
// the note to its own line. Run in the audit/pre-push wave AND fast, locally, before any reconcile. Integrity, not truth.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// scan the SOURCE tree, not dist (dist has .d.ts stubs with no bodies). From dist/scripts/ that is ../../src.
const SRC = join(dirname(fileURLToPath(import.meta.url)), '../../src')
// non-harmonic OPERATIONS (rule 1) — real calls, not export names (fetchAlpineLatest is fine; fetch( is not)
const OPS: [string, RegExp][] = [
  ['fetch', /\bfetch\s*\(/],
  ['async', /\basync\b/],
  ['await', /\bawait\b/],
  ['Promise', /\bnew Promise\b|\bPromise\s*\.\s*(all|allSettled|race|any|resolve|reject)\b/],
  ['timer', /\bset(Timeout|Interval)\s*\(/],
  ['process', /(?<![-\w])process\s*\.\s*[a-z]/], // the real global: standalone `process` + a lowercase method (not a `due-process.js` filename or `process. Integrity` prose)
  ['eval', /\beval\s*\(|\bnew Function\s*\(/],
]
// DETERMINISM hard-reject (rule 2) — CALLS only (a trailing `(` or `.now`), so prose like "bans Math.*" or "no Math.*"
// never trips it; a real host intrinsic always does. No exemption anywhere.
// FAITHFUL to the smoke test (src/test/smoke.test.ts) so the guard is NEVER laxer than the pre-push gate it front-runs
// — a laxer guard passes a violation, then the gate blocks the push, which re-spends the ~4-minute gate (the exact
// trap this guard exists to prevent). The Math rule matches any `Math` dot letter in RAW source (comments included: the
// smoke test does not strip), every file, no exemption. The wall-clock rule matches a raw-source clock read in the
// LIBRARY only (scripts/tests/drivers/os may legitimately time). RNG (the Math random read) is caught by the Math rule.
const MATH_CALL = /\bMath\s*\.\s*[a-zA-Z]/
const WALLCLOCK = /\b(?:Date\s*\.\s*now|new\s+Date|performance\s*\.\s*now|process\s*\.\s*hrtime|crypto\s*\.\s*getRandomValues)\b/
const isLibrary = (p: string): boolean => !/[\\/](?:scripts|tests?|drivers|os)[\\/]/.test(p)
// strip comments LINE-BASED, robustly: drop only whole comment lines (a line whose first non-space is // or * or /*).
// A line-based drop cannot swallow code across lines (the prior regex strip mis-parsed and ATE real code — a false
// negative that let non-quantum code avoid the scanner). A rare trailing inline comment could false-positive; that is
// the SAFE direction (a security scanner over-reports, never under-reports) and is cleared by @non-harmonic / a newline.
const strip = (s: string): string => s.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')

// walk the WHOLE src tree for rule (2); rule (1) applies to the top-level library modules only.
const walk = (dir: string): string[] => readdirSync(dir).flatMap((e) => {
  const p = join(dir, e)
  return statSync(p).isDirectory() ? walk(p) : (p.endsWith('.ts') ? [p] : [])
})
const rel = (p: string): string => p.slice(SRC.length + 1)

const libFiles = readdirSync(SRC).filter((f) => f.endsWith('.ts'))   // top-level library modules (rule 1)
const allFiles = walk(SRC)                                           // the whole tree (rule 2)
const named: string[] = []
const offenders: { file: string; ops: string[] }[] = []

// rule (1) — non-harmonic ops in the library core, @non-harmonic-gated
for (const f of libFiles) {
  const stripped = strip(readFileSync(join(SRC, f), 'utf8'))
  const declared = /@non-harmonic/.test(readFileSync(join(SRC, f), 'utf8'))
  const ops = OPS.filter(([, re]) => re.test(stripped)).map(([n]) => n)
  if (ops.length && declared) named.push(`${f} (${ops.join(', ')})`)
  else if (ops.length && !declared) offenders.push({ file: f, ops })
  else if (!ops.length && declared) offenders.push({ file: f, ops: ['(declares @non-harmonic but has no non-harmonic op — remove the stale marker)'] })
}

// rule (2) — determinism hard-reject over the WHOLE tree, scanned on RAW source (comments included, like the smoke
// test): Math dot letter everywhere (no exemption), a wall-clock read in the library only.
const nonDeterministic: { file: string; ops: string[] }[] = []
for (const p of allFiles) {
  const raw = readFileSync(p, 'utf8')
  const ops: string[] = []
  if (MATH_CALL.test(raw)) ops.push('Math.*')
  if (isLibrary(p) && WALLCLOCK.test(raw)) ops.push('wall-clock')
  if (ops.length) nonDeterministic.push({ file: rel(p), ops })
}

console.log(`harmonic-scan — ${libFiles.length} library modules (rule 1) + ${allFiles.length} files determinism-scanned (rule 2); ${named.length} NAMED non-harmonic boundary:`)
for (const n of named) console.log('  · ' + n)

let failed = false
if (offenders.length) {
  failed = true
  console.error('✗ harmonic-scan — NON-HARMONIC code in the core (declare `// @non-harmonic: <reason>` or make it recomputable):')
  for (const o of offenders) console.error(`    ${o.file}: ${o.ops.join(', ')}`)
}
if (nonDeterministic.length) {
  failed = true
  console.error('✗ harmonic-scan — DETERMINISM hard-reject (Math.*/wall-clock/RNG settle no theorem — NO exemption, anywhere):')
  for (const o of nonDeterministic) console.error(`    ${o.file}: ${o.ops.join(', ')}`)
}
if (failed) process.exit(1)
console.log('✓ harmonic-scan — the core is harmonic, and the whole tree is determinism-clean (no Math.*/wall-clock/RNG).')
