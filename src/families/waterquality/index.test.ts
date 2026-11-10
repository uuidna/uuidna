import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WaterqualityFormulas } from './index.js'
import '../../mcp/families.js'

test('waterquality: wqi, dissolvedoxygen, bod, turbidity, hardness, phindex, nitrate, coliform — crossing to hydrology', async (t) => {
  assert.equal(WaterqualityFormulas.wqi(270, 3).value, 90, 'the mean sub-index score')
  assert.equal(WaterqualityFormulas.dissolvedoxygen(8, 10).value, 80, 'percent of saturation')
  assert.equal(WaterqualityFormulas.bod(9, 3).value, 6)
  assert.equal(WaterqualityFormulas.turbidity(5, 4).value, 20)
  assert.equal(WaterqualityFormulas.hardness(40, 10).value, 120, 'mg/L as CaCO₃')
  assert.equal(WaterqualityFormulas.phindex(9, 7).value, 2)
  assert.equal(WaterqualityFormulas.phindex(6, 7).value, 0)
  assert.equal(WaterqualityFormulas.nitrate(45, 50).value, 90, 'percent of the safe limit')
  assert.equal(WaterqualityFormulas.coliform(1000, 100).value, 10, 'CFU per unit volume')
  assert.equal(WaterqualityFormulas.wqi(270, 3).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('waterquality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'waterquality', program: ['wqi'], params: [270, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `waterquality.wqi at ${uuid}`)
  uuidReceiptOf('waterquality wqi', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wqi 90, dissolvedoxygen 80, bod 6, turbidity 20, hardness 120, phindex 2, nitrate 90, coliform 10; crossing to hydrology')
})
