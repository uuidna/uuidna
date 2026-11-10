import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MagnetometryFormulas } from './index.js'
import '../../mcp/families.js'

test('magnetometry: fieldstrength, anomaly, declination, inclination, gradient, surveylines, susceptibility, reversalcount — crossing to geology', async (t) => {
  assert.equal(MagnetometryFormulas.fieldstrength(50000, 1).value, 50000)
  assert.equal(MagnetometryFormulas.anomaly(52000, 50000).value, 2000)
  assert.equal(MagnetometryFormulas.declination(15, 3).value, 12)
  assert.equal(MagnetometryFormulas.inclination(900, 10).value, 90)
  assert.equal(MagnetometryFormulas.gradient(2000, 100).value, 20)
  assert.equal(MagnetometryFormulas.surveylines(40, 10).value, 400)
  assert.equal(MagnetometryFormulas.susceptibility(1000, 100).value, 10)
  assert.equal(MagnetometryFormulas.reversalcount(5, 3).value, 8)
  assert.equal(MagnetometryFormulas.fieldstrength(50000, 1).dst, 'geology')
  assert.equal(hexFamiliesOf().get('magnetometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'magnetometry', program: ['fieldstrength'], params: [50000, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `magnetometry.fieldstrength at ${uuid}`)
  uuidReceiptOf('magnetometry fieldstrength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fieldstrength 50000, anomaly 2000, declination 12, inclination 90, gradient 20, surveylines 400, susceptibility 10, reversalcount 8; crossing to geology')
})
