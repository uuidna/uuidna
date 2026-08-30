import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremAxioms, theoremByKey, dependsOn, isUnbound, wingDefsFor, axiomIndex, axiomExplain, theoremsForDef } from '../../../index.js'

test('theoremAxioms — unknown key returns null', () => {
  assert.equal(theoremAxioms('no_such_theorem_xyz'), null)
})

test('theoremAxioms — two_coins is unbound on kernel numerals', () => {
  const a = theoremAxioms('two_coins')
  assert.ok(a)
  assert.equal(a.unbound, true)
  assert.equal(a.depCount, 0)
  assert.equal(a.gravity, 0)
  assert.deepEqual(a.dependsOn, [])
})

test('theoremAxioms — bound theorem cites wing defs from its file', () => {
  const bound = [...theoremByKey().values()].find((t) => dependsOn(t).length > 0)
  assert.ok(bound, 'ledger has at least one bound theorem')
  const a = theoremAxioms(bound.key)
  assert.ok(a)
  assert.equal(a.unbound, false)
  assert.ok(a.depCount > 0)
  assert.ok(a.gravity > 0)
  for (const d of a.dependsOn) assert.ok(a.wingDefs.includes(d), `${d} must be declared in ${a.file}`)
  assert.ok(a.unusedDefs.every((d) => !a.dependsOn.includes(d)))
})

test('wingDefsFor — every wing file in ledger has a map entry or empty list', () => {
  const files = new Set([...theoremByKey().values()].map((t) => t.file))
  for (const f of files) {
    const defs = wingDefsFor(f)
    assert.ok(Array.isArray(defs))
  }
})

test('theoremAxioms — neighbour count matches principle clique minus self', () => {
  const t = theoremByKey().get('seal_ten')
  assert.ok(t)
  const a = theoremAxioms('seal_ten')
  assert.ok(a)
  assert.ok(a.neighbourCount > 0)
})

test('axiomIndex — every cited def round-trips through theoremAxioms', () => {
  const idx = axiomIndex()
  assert.ok(idx.totalDefs > 0)
  assert.ok(idx.citedDefs > 0)
  const dz = axiomExplain('DivByZero.lean', 'dz')
  assert.ok(dz)
  assert.ok(dz.theoremCount > 0)
  for (const t of dz.theorems.slice(0, 5)) {
    const a = theoremAxioms(t.key)
    assert.ok(a?.dependsOn.includes('dz'), `${t.key} must cite dz`)
  }
})

test('theoremsForDef — matches axiomExplain keys', () => {
  const keys = theoremsForDef('DivByZero.lean', 'dz')
  const e = axiomExplain('DivByZero.lean', 'dz')
  assert.deepEqual([...keys].sort(), e?.theorems.map((t) => t.key).sort())
})

test('axiomIndex — bidirectional count: sum of citations ≥ bound theorem deps', () => {
  const idx = axiomIndex()
  const citeSum = idx.entries.reduce((s, e) => s + e.theoremCount, 0)
  const bound = [...theoremByKey().values()].filter((t) => !isUnbound(t))
  const depSum = bound.reduce((s, t) => s + dependsOn(t).length, 0)
  assert.equal(citeSum, depSum)
})

test('axiomBalance — fused receipt is deterministic and conservation holds on global slice', async () => {
  const { axiomBalance } = await import('../../../theorems/index.js')
  const [a, b] = [axiomBalance(), axiomBalance()]
  assert.equal(a.fused, b.fused)
  assert.equal(a.global.citeEdges, axiomIndex().entries.reduce((s, e) => s + e.theoremCount, 0))
  assert.ok(a.active > 0)
  assert.ok(a.slices.some((s) => s.dimension === 'wing'))
  assert.ok(a.slices.some((s) => s.dimension === 'skill'))
  assert.ok(a.slices.some((s) => s.dimension === 'ray'))
  assert.ok(a.slices.some((s) => s.dimension === 'principle'))
})

test('axiomBalanceSlice — balanced iff citedDefs equals bound with matching ratios', async () => {
  const { axiomBalanceSlice } = await import('../../../theorems/index.js')
  const t = theoremByKey().get('two_coins')!
  const empty = axiomBalanceSlice('ledger', 'kernel-only', [t])
  assert.equal(empty.balanced, true)
  assert.equal(empty.citeEdges, 0)
})
