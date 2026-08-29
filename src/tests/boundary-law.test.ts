// boundary-law — the court holds boundaries; everywhere else cites theorems.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  BOUNDARY_POINTER, BOUNDARY_THEOREMS, allBoundaryTheoremsSealed,
  boundaryCitation, hasBoundaryPointer, bareBoundaryProse,
} from '../boundary-law.js'
import { gapSurvey } from '../gap-survey.js'
import { ROOT } from '../boundary.js'

test('every cited boundary law key is sealed in the live ledger', () => {
  assert.deepEqual(allBoundaryTheoremsSealed(), [])
})

test('boundaryCitation points at a theorem — never restates scope', () => {
  for (const key of Object.values(BOUNDARY_THEOREMS)) {
    const line = boundaryCitation(key)
    assert.match(line, new RegExp(`theorem ${key}`))
    assert.ok(hasBoundaryPointer(line))
    assert.equal(bareBoundaryProse(line), false)
  }
})

test('bare HONEST SCOPE without a theorem pointer is unlawful surface prose', () => {
  assert.equal(bareBoundaryProse('HONEST SCOPE: not physics, not money'), true)
  assert.equal(bareBoundaryProse(`HONEST SCOPE: integrity only. ${boundaryCitation(BOUNDARY_THEOREMS.integrity)}`), false)
})

test('gap survey kernel buckets cite theorems — no free-standing boundary prose', () => {
  const s = gapSurvey(ROOT)
  for (const b of s.kernelOnly) {
    assert.ok(hasBoundaryPointer(b.note), `${b.kind} note must cite a sealed theorem`)
    assert.doesNotMatch(b.note, /\bHONEST SCOPE\b/)
  }
  for (const b of s.automatable.filter((x) => x.kind !== 'guard-heal')) {
    if (b.note) assert.ok(hasBoundaryPointer(b.note), `${b.kind} note must cite a sealed theorem`)
  }
})

test('MCP lawful pointer matches boundary-law', () => {
  assert.equal(BOUNDARY_POINTER, boundaryCitation(BOUNDARY_THEOREMS.harmony))
})
