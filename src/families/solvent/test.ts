import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SolventFormulas } from './index.js'

/** solvent: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('solvent: molarity, dilution, volume, ph, solubility, polarity, layers, combos', async (t) => {
  assert.equal(SolventFormulas.molarity(2000, 2).value, 1000, 'molarity(2000, 2)')
  assert.equal(SolventFormulas.dilution(1000, 10).value, 100, 'dilution(1000, 10)')
  assert.equal(SolventFormulas.volume(500, 2).value, 1000, 'volume(500, 2)')
  assert.equal(SolventFormulas.ph(70, 10).value, 7, 'ph(70, 10)')
  assert.equal(SolventFormulas.solubility(36, 1).value, 36, 'solubility(36, 1)')
  assert.equal(SolventFormulas.polarity(65, 100).value, 65, 'polarity(65, 100)')
  assert.equal(SolventFormulas.layers(2, 0).value, 2, 'layers(2, 0)')
  assert.equal(SolventFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('solvent')?.length, 8)
  for (const [name, params, expected] of [["molarity",[2000,2],1000],["dilution",[1000,10],100],["volume",[500,2],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'solvent', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `solvent.${name} at ${uuid}`)
    uuidReceiptOf(`solvent ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "molarity=1000, dilution=100, volume=1000")
})
