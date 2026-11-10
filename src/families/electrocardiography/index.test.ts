import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectrocardiographyFormulas } from './index.js'
import '../../mcp/families.js'

test('electrocardiography: heartrate, qtinterval, printerval, qrsduration, rraverage, axisdeviation, correctedqt, intervalratio — crossing to cardiology', async (t) => {
  assert.equal(ElectrocardiographyFormulas.heartrate(1000).value, 60, '60 bpm at a 1000 ms R-R')
  assert.equal(ElectrocardiographyFormulas.qtinterval(440, 40).value, 400)
  assert.equal(ElectrocardiographyFormulas.qtinterval(40, 440).value, 0, 'never negative')
  assert.equal(ElectrocardiographyFormulas.printerval(40, 200).value, 160)
  assert.equal(ElectrocardiographyFormulas.qrsduration(140, 40).value, 100, 'a wide QRS')
  assert.equal(ElectrocardiographyFormulas.rraverage(6000, 6).value, 1000)
  assert.equal(ElectrocardiographyFormulas.axisdeviation(10, 4).value, 6)
  assert.equal(ElectrocardiographyFormulas.correctedqt(360, 900).value, 400, 'QT corrected to a 1000 ms cycle')
  assert.equal(ElectrocardiographyFormulas.intervalratio(400, 1000).value, 40, 'QT is 40% of the R-R')
  assert.equal(ElectrocardiographyFormulas.heartrate(1000).dst, 'cardiology')
  assert.equal(hexFamiliesOf().get('electrocardiography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'electrocardiography', program: ['heartrate'], params: [1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `electrocardiography.heartrate at ${uuid}`)
  uuidReceiptOf('electrocardiography heartrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; heartrate 60, qtinterval 400, printerval 160, qrsduration 100, rraverage 1000, axisdeviation 6, correctedqt 400, intervalratio 40; crossing to cardiology')
})
