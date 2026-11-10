import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FitnessFormulas } from './index.js'
import '../../mcp/families.js'

test('fitness: volume, onerm, heartrate, zone, pace, calories, recovery, progress — crossing to med', async (t) => {
  assert.equal(FitnessFormulas.volume(3, 10).value, 30, 'three sets of ten')
  assert.equal(FitnessFormulas.onerm(100, 5).value, 115, 'estimated one-rep max')
  assert.equal(FitnessFormulas.heartrate(40).value, 180, 'max heart rate at forty')
  assert.equal(FitnessFormulas.zone(135, 180).value, 75, 'seventy-five percent of max')
  assert.equal(FitnessFormulas.pace(5, 1500).value, 300, 'seconds per unit distance')
  assert.equal(FitnessFormulas.calories(8, 30).value, 240)
  assert.equal(FitnessFormulas.recovery(100, 4).value, 25)
  assert.equal(FitnessFormulas.progress(120, 100).value, 20, 'gain since baseline')
  assert.equal(FitnessFormulas.progress(80, 100).value, 0, 'no gain')
  assert.equal(FitnessFormulas.volume(3, 10).dst, 'med')
  assert.equal(hexFamiliesOf().get('fitness')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fitness', program: ['volume'], params: [3, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `fitness.volume at ${uuid}`)
  uuidReceiptOf('fitness volume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 30, onerm 115, heartrate 180, zone 75, pace 300, calories 240, recovery 25, progress 20; crossing to med')
})
