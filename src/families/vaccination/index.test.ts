import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VaccinationFormulas } from './index.js'
import '../../mcp/families.js'

test('vaccination: coverage, herdthreshold, efficacy, dosesneeded, titer, boosterinterval, seroconversion, campaignreach — crossing to immunology', async (t) => {
  assert.equal(VaccinationFormulas.coverage(950, 1000).value, 95, '95% of the population vaccinated')
  assert.equal(VaccinationFormulas.herdthreshold(5).value, 80, 'R0 of 5 needs 80% immune')
  assert.equal(VaccinationFormulas.efficacy(100, 5).value, 95, '95% efficacy from attack rates')
  assert.equal(VaccinationFormulas.dosesneeded(1000, 2).value, 2000, 'two doses each')
  assert.equal(VaccinationFormulas.titer(10, 3).value, 80, 'three doublings of the titre')
  assert.equal(VaccinationFormulas.boosterinterval(12, 2).value, 6, 'a booster every six months')
  assert.equal(VaccinationFormulas.seroconversion(990, 1000).value, 99)
  assert.equal(VaccinationFormulas.campaignreach(10, 100, 5).value, 5000, 'reach over the campaign')
  assert.equal(VaccinationFormulas.coverage(950, 1000).dst, 'immunology')
  assert.equal(hexFamiliesOf().get('vaccination')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'vaccination', program: ['coverage'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `vaccination.coverage at ${uuid}`)
  uuidReceiptOf('vaccination coverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coverage 95, herdthreshold 80, efficacy 95, dosesneeded 2000, titer 80, boosterinterval 6, seroconversion 99, campaignreach 5000; crossing to immunology')
})
