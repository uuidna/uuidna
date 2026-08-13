#!/usr/bin/env node
// harmonic-scan — FAIL ALL NON-HARMONIC code. The library's harmonic core is pure and recomputable ("quantum");
// any NON-QUANTUM operation (network fetch, async/await, Promise, timers, process, eval/Function) is non-harmonic —
// non-recomputable by nature. Such code is allowed ONLY in a file that self-declares `// @non-harmonic: <reason>`,
// a NAMED boundary visible in review. This scanner strips comments/strings, then FAILS (exit 1) any library module
// that carries a non-harmonic op WITHOUT that declaration — so no agent can sneak non-quantum code into the core.
// (Math.*/wall-clock/RNG are separately hard-rejected with NO exemption by the smoke test; os/ + drivers/ are the
// other named non-determinism boundary.) Run in the audit/pre-push wave. Integrity, not truth.
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// scan the SOURCE tree, not dist (dist has .d.ts stubs with no bodies). From dist/scripts/ that is ../../src.
const SRC = join(dirname(fileURLToPath(import.meta.url)), '../../src')
// non-harmonic OPERATIONS — real calls, not export names (fetchAlpineLatest is fine; fetch( is not)
const OPS: [string, RegExp][] = [
  ['fetch', /\bfetch\s*\(/],
  ['async', /\basync\b/],
  ['await', /\bawait\b/],
  ['Promise', /\bnew Promise\b|\bPromise\s*\.\s*(all|allSettled|race|any|resolve|reject)\b/],
  ['timer', /\bset(Timeout|Interval)\s*\(/],
  ['process', /\bprocess\s*\.\s*\w/],
  ['eval', /\beval\s*\(|\bnew Function\s*\(/],
]
const strip = (s: string): string => s
  .replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ')
  .replace(/'(?:[^'\\]|\\.)*'/g, "''").replace(/"(?:[^"\\]|\\.)*"/g, '""').replace(/`(?:[^`\\]|\\.)*`/g, '``')

const files = readdirSync(SRC).filter((f) => f.endsWith('.ts'))
const named: string[] = []
const offenders: { file: string; ops: string[] }[] = []
for (const f of files) {
  const raw = readFileSync(join(SRC, f), 'utf8')
  const declared = /@non-harmonic/.test(raw)
  const ops = OPS.filter(([, re]) => re.test(strip(raw))).map(([n]) => n)
  if (ops.length && declared) named.push(`${f} (${ops.join(', ')})`)
  else if (ops.length && !declared) offenders.push({ file: f, ops })
  else if (!ops.length && declared) offenders.push({ file: f, ops: ['(declares @non-harmonic but has no non-harmonic op — remove the stale marker)'] })
}

console.log(`harmonic-scan — ${files.length} library modules; ${named.length} NAMED non-harmonic boundary:`)
for (const n of named) console.log('  · ' + n)
if (offenders.length === 0) {
  console.log('✓ harmonic-scan — the core is harmonic: every non-harmonic op is in a declared boundary.')
} else {
  console.error('✗ harmonic-scan — NON-HARMONIC code in the core (declare `// @non-harmonic: <reason>` or make it recomputable):')
  for (const o of offenders) console.error(`    ${o.file}: ${o.ops.join(', ')}`)
  process.exit(1)
}
