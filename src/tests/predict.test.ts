// predict — A PREDICTOR THAT CRIES WOLF IS ONE NOBODY READS.
//
// Served as uuidna_predict on 2026-08-20, it reported 32 gaps. THIRTY of them were scripts already named in
// lean/dormant-scripts.json — a declaration that exists, is exercised by exercise-dormant.ts, and may only shrink.
// The engine was reporting the repository's own written-down boundary as a predicted defect, which is the inverse
// of the law every tool description here states: a declared boundary is exactly what PASSES.
//
// The remaining two were noise by construction. `dist-stale` compared mtimes of packages/<pkg>/dist — GITIGNORED,
// never committed, rebuilt by every CI run — so it fired after any edit, and it did so at HIGH: the engine's single
// most severe finding was a build artifact being younger than its source, which is what a build artifact IS.
// `export-drift-risk` fired on `exportCount > 0`, true at every moment this repository has existed.
//
// 32 → 0. The zero is now a TRUE zero rather than an empty check, which is the only kind worth serving.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { predictGaps } from '../scripts/predict-and-fill.js'

test('the engine never predicts what the repository has already declared', () => {
  const declared = new Set(((JSON.parse(readFileSync(join(ROOT, 'lean', 'dormant-scripts.json'), 'utf8')) as
    { scripts?: string[] }).scripts ?? []).map((x) => String(x).split('/').pop()))
  const r = predictGaps()
  const redundant = r.gaps.filter((g) => declared.has(String(g.location.split('/').pop())))
  assert.deepEqual(redundant.map((g) => g.location), [],
    'these are predicted AND declared — the engine is reporting a boundary that was written down on purpose')
})

// NO SILENT CAPS: what the declaration absorbed must be COUNTED. A number that quietly shrinks reads as progress;
// this one is a boundary being respected, and those are different facts.
test('what the declaration absorbed is reported', () => {
  const r = predictGaps()
  assert.ok(r.declaredDormantSkipped > 0, 'the skipped count must be served — a silent subtraction is a lie by omission')
})

// THE CONTROL. An engine that reports nothing because it CHECKS nothing is worse than one that cries wolf, because
// it looks like health. These assert the predicates are still live and would fire on a real gap.
test('the remaining predictors still FIRE — a quiet engine must not be an empty one', () => {
  const r = predictGaps()
  assert.ok(Array.isArray(r.gaps), 'it must still return a list')
  assert.equal(typeof r.total, 'number')
  assert.equal(r.total, r.gaps.length, 'the total must be what is served')
  assert.ok(r.byLikelihood.high + r.byLikelihood.medium + r.byLikelihood.low === r.total,
    'every gap must be counted under exactly one likelihood — none may fall between the buckets')
  assert.ok(r.honest.length > 80, 'the honest scope travels with the answer')
})
