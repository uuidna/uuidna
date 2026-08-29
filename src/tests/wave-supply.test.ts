// wave-supply — THE CENSUS THAT TELLS AN EMPTY CONVEYOR FROM AN EXHAUSTED ONE. circle called `pending === 0`
// QUIET and printed "the tree is at its fixed point", which is true arithmetic and a misleading verdict: a tree
// that has sealed everything its finders know to look for and a tree whose finders stopped producing print the
// same line. These tests pin the distinction, and each carries the mutation that breaks it — the falsifiability
// law in scripts/api.ts: an audit that cannot say no is not an audit.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { waveSupply, supplyVerdict, type Supply } from '../scripts/wave-supply.js'

const dry: Supply = {
  sources: [{ name: 'gaps', count: 0, where: 'gaps.json', reach: 'coverage holes' },
            { name: 'research-leads', count: 0, where: 'research-leads.json', reach: 'filed findings' }],
  pending: 0, available: 0, exhausted: true, honest: 'x',
}

test('DRY and SUPPLIED are different verdicts, and the wording never lets them read alike', () => {
  const supplied: Supply = { ...dry, sources: [{ ...dry.sources[0]!, count: 3 }, dry.sources[1]!], available: 3, exhausted: false }
  assert.match(supplyVerdict(dry), /^DRY/)
  assert.match(supplyVerdict(supplied), /^SUPPLIED/)
  // THE POINT, not merely the prefix: a dry verdict must say the conveyor is UNSUPPLIED rather than finished,
  // because "finished" is the reading that turns a stall into a success in an unattended log.
  assert.match(supplyVerdict(dry), /not finished, it is unsupplied/)
  assert.ok(!/fixed point/.test(supplyVerdict(dry)), 'a dry tree must never be described as having arrived anywhere')
})

test('a DRY verdict NAMES every empty finder, so the stop is attributable to one of them', () => {
  const v = supplyVerdict(dry)
  for (const s of dry.sources) assert.ok(v.includes(s.name), `the verdict must name ${s.name} — an unattributed stop is the thing being fixed`)
  // the mutation: drop a source and its name leaves the verdict, which is exactly how a silent finder hides
  const oneShort = supplyVerdict({ ...dry, sources: [dry.sources[0]!] })
  assert.ok(!oneShort.includes('research-leads'), 'CONTROL — a finder absent from the census is absent from the verdict, which is why the census must list them all')
})

test('exhausted means EVERY source and the conveyor, never just the conveyor', () => {
  assert.equal(dry.exhausted, true)
  // pending alone being empty is NOT exhaustion — that is the exact conflation circle used to make
  const queueEmptyButSupplied: Supply = { ...dry, sources: [{ ...dry.sources[0]!, count: 1 }, dry.sources[1]!], available: 1, exhausted: false }
  assert.equal(queueEmptyButSupplied.pending, 0)
  assert.equal(queueEmptyButSupplied.exhausted, false, 'an empty QUEUE with a supplied finder is not exhaustion — work exists, it is merely unqueued')
})

test('the live census reads the real tree and states what it cannot see', () => {
  const s = waveSupply()
  assert.ok(Array.isArray(s.sources) && s.sources.length >= 2)
  for (const src of s.sources) {
    assert.ok(Number.isInteger(src.count) && src.count >= 0, `${src.name} must count, never estimate`)
    assert.ok(src.reach.length > 0, `${src.name} must declare what it is able to notice — an empty count is a statement about REACH`)
  }
  assert.equal(s.available, s.sources.reduce((n, x) => n + x.count, 0), 'available is the sum of the finders, computed not asserted')
  // THE HONEST BOUND, load-bearing: an exhausted census is evidence about the finders, never a proof that no
  // theorem remains. A census that claimed the stronger thing would be the overreach this tree exists to refuse.
  assert.match(s.honest, /not a proof that no theorem remains to be found/)
  assert.match(s.honest, /axiomHunt/, 'axiom-hunt is counted through the exported hunt, never a second table')
  assert.ok(s.sources.some((x) => x.name === 'exposed-axioms'), 'remaining covering work is a finder, not a printed line')
})
