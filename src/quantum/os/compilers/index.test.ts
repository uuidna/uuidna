import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compilerCensus, renderCompilers } from './index.js'
import { uuidnaExec, APPLETS } from '../exec/index.js'

test('every compiler measures a real translation, in both directions', () => {
  const c = compilerCensus()
  assert.equal(c.present, true, 'this host has the files')
  assert.ok(c.rows.length >= 4)
  for (const r of c.rows) {
    assert.ok(r.inBytes > 0, `${r.compiler} must have an input`)
    assert.ok(r.outBytes > 0, `${r.compiler} must have an output`)
  }
})

test('the ratio unit is fine enough to show a CONTRACTION', () => {
  // The defect this exists for: tenths truncated the edge mirror's 0.05× to a flat 0.0, reporting the most
  // interesting compiler in the list as doing nothing. A unit too coarse to show a contraction hides one.
  const mirror = compilerCensus().rows.find((r) => r.compiler === 'ledger → edge mirror')!
  assert.ok(mirror.ratioHundredths > 0, 'a contraction must not truncate to zero')
  assert.ok(mirror.ratioHundredths < 100, 'and it IS a contraction — addresses kept, statements dropped')
})

test('expansion and contraction both appear — the pipeline is not one-directional', () => {
  const c = compilerCensus()
  assert.ok(c.rows.some((r) => r.ratioHundredths > 100), 'markdown → site expands: every theorem gets a page')
  assert.ok(c.rows.some((r) => r.ratioHundredths < 100), 'ledger → mirror contracts')
})

test('uuidnaOS answers about its own compilers, through the one door', () => {
  const r = uuidnaExec('compilers')
  assert.equal(r.ok, true)
  assert.match(r.output[0] ?? '', /every translation this machine performs/)
  assert.ok((APPLETS as readonly string[]).includes('compilers'))
})

test('a host without a filesystem gets ABSENT, never zeros', () => {
  // asserted on the rendering path, since this process does have one: absent must be a distinct verdict
  const absent = { definition: 'uuidnaos-compilers' as const, present: false, rows: [], receipt: '', honest: '' }
  assert.equal(renderCompilers(absent)[0], 'compilers: ABSENT — no filesystem on this host')
})
