import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

// ONE RECONCILE REACHES THE FIXED POINT (PATCHES §46, 2026-09-15). The court record (lean/refusal-trials.json) reads
// the ledger, the axiom receipts and the witness seals, and it is one of the files spin seals. So reconcile must
// compute it AFTER the full derivation and BEFORE the seal: a court refresh followed by a re-derivation that did not
// recompute it left the court stale and the heal alternated court ↔ spin for six rounds, twice.
const stepsOf = (src: string): string[] => [...src.matchAll(/^run\('node dist\/scripts\/([a-z-]+)\.js[^']*'\)/gm)].map((m) => m[1]!)

const ordered = (steps: readonly string[]): boolean => {
  const derive = steps.indexOf('generate'), court = steps.indexOf('trial-refusals'), seal = steps.lastIndexOf('spin')
  return derive >= 0 && court > derive && seal > court
}

test('reconcile derives everything, then computes the court record, then seals', () => {
  const steps = stepsOf(readFileSync(join(ROOT, 'src', 'scripts', 'reconcile.ts'), 'utf8'))
  assert.ok(ordered(steps), `reconcile's steps must be generate … trial-refusals … spin --seal, got ${steps.join(' → ')}`)
})

test('control: the order the heal alternated on is refused', () => {
  assert.equal(ordered(['generate', 'spin', 'trial-refusals']), false, 'a court record written after the seal drifts it')
  assert.equal(ordered(['trial-refusals', 'generate', 'spin']), false, 'a court record computed before the derivation goes stale')
  assert.equal(ordered(['generate', 'spin']), false, 'a reconcile with no court step leaves the sealed court record behind')
})
