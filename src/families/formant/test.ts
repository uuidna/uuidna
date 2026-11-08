import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FormantFormulas } from './index.js'
import '../../mcp/families.js'

test('formant: centerfrequency, bandwidth, f1f2ratio, vowelspace, formantspacing, qfactor, dispersion, resonancepeak — crossing to acoustics', async (t) => {
  assert.equal(FormantFormulas.centerfrequency(500, 700).value, 600, 'the midpoint of the band')
  assert.equal(FormantFormulas.bandwidth(700, 500).value, 200)
  assert.equal(FormantFormulas.f1f2ratio(1500, 500).value, 300, 'F2 three times F1, as a percentage')
  assert.equal(FormantFormulas.vowelspace(200, 300).value, 60000)
  assert.equal(FormantFormulas.formantspacing(3000, 4).value, 1000, 'three gaps across the range')
  assert.equal(FormantFormulas.qfactor(600, 200).value, 3)
  assert.equal(FormantFormulas.dispersion(3500, 500, 4).value, 1000)
  assert.equal(FormantFormulas.resonancepeak(12, 5).value, 60, 'gain times Q')
  assert.equal(FormantFormulas.centerfrequency(500, 700).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('formant')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'formant', program: ['centerfrequency'], params: [500, 700] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `formant.centerfrequency at ${uuid}`)
  uuidReceiptOf('formant centerfrequency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; centerfrequency 600, bandwidth 200, f1f2ratio 300, vowelspace 60000, formantspacing 1000, qfactor 3, dispersion 1000, resonancepeak 60; crossing to acoustics')
})
