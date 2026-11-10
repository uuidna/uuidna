import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PathogenFormulas } from './index.js'

/** pathogen: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('pathogen: r0, incubation, mortality, transmission, generations, strains, reservoir, combos', async (t) => {
  assert.equal(PathogenFormulas.r0(25, 10).value, 2, 'r0(25, 10)')
  assert.equal(PathogenFormulas.incubation(5, 2).value, 7, 'incubation(5, 2)')
  assert.equal(PathogenFormulas.mortality(2, 100).value, 2, 'mortality(2, 100)')
  assert.equal(PathogenFormulas.transmission(60, 100).value, 60, 'transmission(60, 100)')
  assert.equal(PathogenFormulas.generations(10, 2).value, 20, 'generations(10, 2)')
  assert.equal(PathogenFormulas.strains(4, 1).value, 5, 'strains(4, 1)')
  assert.equal(PathogenFormulas.reservoir(3, 0).value, 3, 'reservoir(3, 0)')
  assert.equal(PathogenFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('pathogen')?.length, 8)
  for (const [name, params, expected] of [["r0",[25,10],2],["incubation",[5,2],7],["mortality",[2,100],2]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'pathogen', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `pathogen.${name} at ${uuid}`)
    uuidReceiptOf(`pathogen ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "r0=2, incubation=7, mortality=2")
})
