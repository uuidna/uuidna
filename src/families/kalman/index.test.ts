import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KalmanFormulas } from './index.js'
import '../../mcp/families.js'

test('kalman: gain, predictedstate, updatedestimate, errorcovariance, innovation, measurementresidual, processnoise, steadygain — crossing to cybernetics', async (t) => {
  assert.equal(KalmanFormulas.gain(3, 1).value, 75, 'trust three quarters of the innovation')
  assert.equal(KalmanFormulas.predictedstate(100, 5, 2).value, 110)
  assert.equal(KalmanFormulas.updatedestimate(100, 75, 8).value, 106, 'prediction corrected by the gained innovation')
  assert.equal(KalmanFormulas.errorcovariance(80, 75).value, 20)
  assert.equal(KalmanFormulas.innovation(110, 100).value, 10, 'the measurement surprise')
  assert.equal(KalmanFormulas.measurementresidual(110, 106).value, 4)
  assert.equal(KalmanFormulas.processnoise(3, 4).value, 12)
  assert.equal(KalmanFormulas.steadygain(2, 6).value, 25, 'the gain it settles on')
  assert.equal(KalmanFormulas.gain(3, 1).dst, 'cybernetics')
  assert.equal(hexFamiliesOf().get('kalman')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'kalman', program: ['gain'], params: [3, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `kalman.gain at ${uuid}`)
  uuidReceiptOf('kalman gain', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gain 75, predictedstate 110, updatedestimate 106, errorcovariance 20, innovation 10, measurementresidual 4, processnoise 12, steadygain 25; crossing to cybernetics')
})
