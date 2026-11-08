import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AntennaFormulas } from './index.js'

/** antenna: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('antenna: gain, elements, frequency, wavelength, arrays, beamwidth, bands, pairs', async (t) => {
  assert.equal(AntennaFormulas.gain(10, 2).value, 20, 'gain(10, 2)')
  assert.equal(AntennaFormulas.elements(8, 0).value, 8, 'elements(8, 0)')
  assert.equal(AntennaFormulas.frequency(2400, 1).value, 2400, 'frequency(2400, 1)')
  assert.equal(AntennaFormulas.wavelength(300, 2).value, 150, 'wavelength(300, 2)')
  assert.equal(AntennaFormulas.arrays(4, 4).value, 16, 'arrays(4, 4)')
  assert.equal(AntennaFormulas.beamwidth(360, 330).value, 30, 'beamwidth(360, 330)')
  assert.equal(AntennaFormulas.bands(3, 2).value, 5, 'bands(3, 2)')
  assert.equal(AntennaFormulas.pairs(8, 2).value, 28, 'pairs(8, 2)')
  assert.equal(hexFamiliesOf().get('antenna')?.length, 8)
  for (const [name, params, expected] of [["gain",[10,2],20],["elements",[8,0],8],["frequency",[2400,1],2400]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'antenna', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `antenna.${name} at ${uuid}`)
    uuidReceiptOf(`antenna ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "gain=20, elements=8, frequency=2400")
})
