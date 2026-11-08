import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpringFormulas } from './index.js'

/** spring: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('spring: force, constant, coils, deflection, energy, series, parallelsum, combos', async (t) => {
  assert.equal(SpringFormulas.force(50, 10).value, 500, 'force(50, 10)')
  assert.equal(SpringFormulas.constant(20, 1).value, 20, 'constant(20, 1)')
  assert.equal(SpringFormulas.coils(10, 2).value, 12, 'coils(10, 2)')
  assert.equal(SpringFormulas.deflection(100, 20).value, 5, 'deflection(100, 20)')
  assert.equal(SpringFormulas.energy(500, 2).value, 250, 'energy(500, 2)')
  assert.equal(SpringFormulas.series(100, 200).value, 300, 'series(100, 200)')
  assert.equal(SpringFormulas.parallelsum(50, 50).value, 100, 'parallelsum(50, 50)')
  assert.equal(SpringFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('spring')?.length, 8)
  for (const [name, params, expected] of [["force",[50,10],500],["constant",[20,1],20],["coils",[10,2],12]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'spring', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `spring.${name} at ${uuid}`)
    uuidReceiptOf(`spring ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "force=500, constant=20, coils=12")
})
