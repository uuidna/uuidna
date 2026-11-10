import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConditioningFormulas } from './index.js'
import '../../mcp/families.js'

test('conditioning: vo2max, heartrate, load, volume, intensity, trainingzone, recovery, onerepmax — crossing to physiology', async (t) => {
  assert.equal(ConditioningFormulas.vo2max(200, 50).value, 60, 'aerobic power from the pulse ratio')
  assert.equal(ConditioningFormulas.heartrate(30).value, 190, 'max heart rate at thirty')
  assert.equal(ConditioningFormulas.load(60, 8).value, 480)
  assert.equal(ConditioningFormulas.volume(3, 10, 100).value, 3000, 'the weight moved')
  assert.equal(ConditioningFormulas.intensity(80, 100).value, 80, 'eighty percent of the max')
  assert.equal(ConditioningFormulas.trainingzone(190, 70).value, 133)
  assert.equal(ConditioningFormulas.recovery(180, 120).value, 60, 'the one-minute pulse drop')
  assert.equal(ConditioningFormulas.onerepmax(100, 5).value, 116, 'the Epley estimate')
  assert.equal(ConditioningFormulas.vo2max(200, 50).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('conditioning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'conditioning', program: ['onerepmax'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 116, `conditioning.onerepmax at ${uuid}`)
  uuidReceiptOf('conditioning onerepmax', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; vo2max 60, heartrate 190, load 480, volume 3000, intensity 80, trainingzone 133, recovery 60, onerepmax 116; crossing to physiology')
})
