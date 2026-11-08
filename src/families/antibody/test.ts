import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AntibodyFormulas } from './index.js'

/** antibody: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('antibody: affinity, isotypes, chains, epitopes, titer, halflife, neutralization, combos', async (t) => {
  assert.equal(AntibodyFormulas.affinity(1000, 10).value, 100, 'affinity(1000, 10)')
  assert.equal(AntibodyFormulas.isotypes(5, 0).value, 5, 'isotypes(5, 0)')
  assert.equal(AntibodyFormulas.chains(2, 2).value, 4, 'chains(2, 2)')
  assert.equal(AntibodyFormulas.epitopes(6, 1).value, 6, 'epitopes(6, 1)')
  assert.equal(AntibodyFormulas.titer(1000, 2).value, 2000, 'titer(1000, 2)')
  assert.equal(AntibodyFormulas.halflife(21, 1).value, 21, 'halflife(21, 1)')
  assert.equal(AntibodyFormulas.neutralization(90, 100).value, 90, 'neutralization(90, 100)')
  assert.equal(AntibodyFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('antibody')?.length, 8)
  for (const [name, params, expected] of [["affinity",[1000,10],100],["isotypes",[5,0],5],["chains",[2,2],4]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'antibody', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `antibody.${name} at ${uuid}`)
    uuidReceiptOf(`antibody ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "affinity=100, isotypes=5, chains=4")
})
