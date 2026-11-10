import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GelatinizationFormulas } from './index.js'
import '../../mcp/families.js'

test('gelatinization: onsettemp, swellingratio, waterabsorption, peakviscosity, starchconversion, setbacktemp, granuleexpansion, pasteclarity — crossing to chemistry', async (t) => {
  assert.equal(GelatinizationFormulas.onsettemp(60, 65).value, 65)
  assert.equal(GelatinizationFormulas.swellingratio(300, 100).value, 300)
  assert.equal(GelatinizationFormulas.waterabsorption(150, 100).value, 150)
  assert.equal(GelatinizationFormulas.peakviscosity(200, 3).value, 600)
  assert.equal(GelatinizationFormulas.starchconversion(85, 100).value, 85)
  assert.equal(GelatinizationFormulas.setbacktemp(95, 50).value, 45)
  assert.equal(GelatinizationFormulas.granuleexpansion(5, 4).value, 20)
  assert.equal(GelatinizationFormulas.pasteclarity(70, 100).value, 70)
  assert.equal(GelatinizationFormulas.onsettemp(60, 65).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('gelatinization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gelatinization', program: ['onsettemp'], params: [60, 65] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 65, `gelatinization.onsettemp at ${uuid}`)
  uuidReceiptOf('gelatinization onsettemp', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; onsettemp 65, swellingratio 300, waterabsorption 150, peakviscosity 600, starchconversion 85, setbacktemp 45, granuleexpansion 20, pasteclarity 70; crossing to chemistry')
})
