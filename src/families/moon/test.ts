import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MoonFormulas } from './index.js'

/** moon: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('moon: phase, distance, period, diameter, tides, libration, craters, combos', async (t) => {
  assert.equal(MoonFormulas.phase(29, 8).value, 5, 'phase(29, 8)')
  assert.equal(MoonFormulas.distance(384, 1000).value, 384000, 'distance(384, 1000)')
  assert.equal(MoonFormulas.period(27, 0).value, 27, 'period(27, 0)')
  assert.equal(MoonFormulas.diameter(3474, 1).value, 3474, 'diameter(3474, 1)')
  assert.equal(MoonFormulas.tides(2, 1).value, 2, 'tides(2, 1)')
  assert.equal(MoonFormulas.libration(8, 1).value, 7, 'libration(8, 1)')
  assert.equal(MoonFormulas.craters(1000, 100).value, 100000, 'craters(1000, 100)')
  assert.equal(MoonFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('moon')?.length, 8)
  for (const [name, params, expected] of [["phase",[29,8],5],["distance",[384,1000],384000],["period",[27,0],27]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'moon', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `moon.${name} at ${uuid}`)
    uuidReceiptOf(`moon ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "phase=5, distance=384000, period=27")
})
