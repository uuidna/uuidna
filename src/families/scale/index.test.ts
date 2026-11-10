import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScaleFormulas } from './index.js'

/** The scored instruments exact; the score is a measure, not the verdict; contested ones are flagged. */
test('scale: PCL-R, Static-99R, Trotter-Gleser stature, Flesch, Hounsfield, polygraph ESS — instruments, not verdicts', async (t) => {
  assert.equal(ScaleFormulas.pclr(30).value, 1, 'meets the PCL-R cutoff')
  assert.equal(ScaleFormulas.pclr(29).value, 0)
  assert.equal(ScaleFormulas.static99(6).value, 5, 'score 6 is well-above-average risk')
  assert.equal(ScaleFormulas.static99(0).value, 1, 'score 0 is low')
  assert.equal(ScaleFormulas.stature(450).value, Math.round(2.38 * 45 + 61), 'a 450mm femur gives stature in cm')
  assert.ok(Number(ScaleFormulas.flesch(10, 100, 150).value) !== 0, 'Flesch reading ease computes')
  assert.equal(ScaleFormulas.hounsfield(1000).value, 3, 'HU 0 is fluid/water band')
  assert.equal(ScaleFormulas.hounsfield(2000).value, 5, 'HU +1000 is bone')
  assert.equal(ScaleFormulas.polygraph(102).value, 2, 'ESS +2 is no-deception-indicated')
  assert.equal(ScaleFormulas.polygraph(95).value, 1, 'ESS −5 is deception-indicated')
  assert.equal(ScaleFormulas.polygraph(100).value, 0, 'ESS 0 is inconclusive')
  assert.match(String((ScaleFormulas.polygraph(100) as unknown as { admissible: string }).admissible), /contested/, 'polygraph flagged contested')
  assert.equal(hexFamiliesOf().get('scale')?.length, 6)
  for (const [name, params, expected] of [['pclr', [30], 1], ['static99', [6], 5], ['hounsfield', [2000], 5]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'scale', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `scale.${name} at ${uuid}`)
    uuidReceiptOf(`scale ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('6 instruments; PCL-R≥30, Static-99R bands, Trotter-Gleser stature, Flesch, Hounsfield, polygraph (contested)')
})
