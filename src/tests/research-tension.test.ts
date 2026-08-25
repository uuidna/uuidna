// research-ledger tensions — THE ANCHORING LAW GETS A SUBJECT. `anchors(f)` answered "may this anchor a theorem?"
// and the report counted how many findings passed; nothing answered "does any SEALED theorem rest on one that does
// not?", because no finding named a theorem and no theorem named a finding. A law with predicates, a census and no
// subject can be neither violated nor satisfied. These tests pin the three tensions it can now decide, and — the
// part that matters most — pin that an empty result over an UNLINKED corpus reports itself as unchecked rather
// than as clean. Each carries the mutation that breaks it (the falsifiability law in scripts/api.ts).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tensions, tensionReport, type Finding } from '../research-ledger.js'

const SEALED = new Set(['two_coins', 'drift_is_named_or_caught'])
const base: Finding = { claim: 'c', value: '1', units: 'u', source: 's', status: 'read', kind: 'convention' }

test('a finding citing a theorem that is not sealed is FABRICATED — a citation to nothing verifies nothing', () => {
  const t = tensions([{ ...base, theorem: 'no_such_theorem' }], SEALED)
  assert.equal(t.length, 1)
  assert.equal(t[0]!.kind, 'fabricated')
  // the mutation: seal the key and the tension must vanish, or the check is flagging the link rather than the gap
  assert.deepEqual(tensions([{ ...base, theorem: 'two_coins' }], SEALED), [])
})

test('THE PARADOX THE LAW EXISTS TO FORBID — a sealed theorem resting on a source that may not anchor', () => {
  for (const status of ['secondary', 'unread', 'refuted'] as const) {
    const t = tensions([{ ...base, status, theorem: 'two_coins' }], SEALED)
    assert.equal(t.length, 1, `${status} must not silently anchor a sealed theorem`)
    assert.equal(t[0]!.kind, 'unanchored')
    assert.match(t[0]!.why, /only a read primary source may anchor/)
  }
  // CONTROL — read anchors, and the check must say nothing about it. An audit that cannot pass is not an audit.
  assert.deepEqual(tensions([{ ...base, status: 'read', theorem: 'two_coins' }], SEALED), [])
})

test('a MEASURED finding anchoring a theorem is OVERSEALED — a measurement gets a bracket or nothing', () => {
  const t = tensions([{ ...base, kind: 'measured', theorem: 'two_coins' }], SEALED)
  assert.equal(t.length, 1)
  assert.equal(t[0]!.kind, 'oversealed')
  // a measured finding that is ALSO unread reports the stronger charge, not both — the status gate comes first
  const both = tensions([{ ...base, kind: 'measured', status: 'unread', theorem: 'two_coins' }], SEALED)
  assert.deepEqual(both.map((x) => x.kind), ['unanchored'])
})

test('AN UNLINKED FINDING IS SILENT, NOT CLEAN — the conflation this whole check exists to refuse', () => {
  const unlinked: Finding[] = [base, { ...base, status: 'unread' }]
  assert.deepEqual(tensions(unlinked, SEALED), [], 'no link means no claim to check, so no tension is reported')
  const r = tensionReport(unlinked, SEALED)
  // the point: zero tensions over zero links must NOT read as health
  assert.equal(r.checkable, false)
  assert.equal(r.linked, 0)
  assert.match(r.honest, /NOT CHECKABLE/)
  assert.match(r.honest, /never a clean bill of health/)
})

test('the report states its own reach whenever anything IS linked', () => {
  const mixed: Finding[] = [{ ...base, theorem: 'two_coins' }, base, base]
  const r = tensionReport(mixed, SEALED)
  assert.equal(r.checkable, true)
  assert.equal(r.linked, 1)
  assert.equal(r.unlinked, 2)
  assert.match(r.honest, /checked 1 of 3/)
  assert.match(r.honest, /silent rather than clean/, 'the unchecked remainder must never be described as passing')
})
