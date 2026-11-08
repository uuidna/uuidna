import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MedFormulas } from './index.js'
import '../../mcp/families.js'

test('med: clinical and forensic-medical arithmetic read into evidence', async (t) => {
  assert.equal(MedFormulas.bmi(80, 180).value, 24, '80kg at 1.80m is BMI 24')
  assert.equal(MedFormulas.dose(70, 5).value, 350, '5 mg/kg at 70kg')
  assert.equal(MedFormulas.gcs(4, 5, 6).value, 15, 'a fully responsive GCS')
  assert.equal(MedFormulas.gcs(1, 1, 1).value, 3, 'the floor of the scale')
  assert.equal(MedFormulas.gcs(0, 5, 6).holds, false, 'eye score out of range')
  assert.equal(MedFormulas.map(120, 80).value, 93, 'mean arterial pressure')
  assert.equal(MedFormulas.packyears(20, 15).value, 15, 'a pack a day for fifteen years')
  assert.equal(MedFormulas.impairment(30, 100).value, 30, '30% whole-person impairment')
  assert.equal(MedFormulas.causation(250, 100).value, 250, 'relative risk 2.5 — causation more likely than not')
  assert.equal(MedFormulas.frequency(8).value, 3, 'every eight hours is thrice daily')
  assert.equal(MedFormulas.bmi(80, 180).dst, 'evidence', 'a medical finding is read into evidence')
  assert.equal(hexFamiliesOf().get('med')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'med', program: ['gcs'], params: [4, 5, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `med.gcs at ${uuid}`)
  uuidReceiptOf('med gcs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bmi 24, dose 350, gcs 15/3, map 93, packyears 15, impairment 30, causation 250, frequency 3; crossing to evidence')
})
