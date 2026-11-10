import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BreedingFormulas } from './index.js'
import '../../mcp/families.js'

test('breeding: heritability, inbreeding, selectiondifferential, geneticgain, breedingvalue, effectivepopulation, conceptionrate, progenycount — crossing to zoology', async (t) => {
  assert.equal(BreedingFormulas.heritability(40, 100).value, 40, 'genetic over phenotypic variance')
  assert.equal(BreedingFormulas.inbreeding(5, 50).value, 50, 'permille over five generations')
  assert.equal(BreedingFormulas.selectiondifferential(120, 100).value, 20, 'selected parents above the mean')
  assert.equal(BreedingFormulas.geneticgain(40, 20).value, 8, 'response to selection')
  assert.equal(BreedingFormulas.breedingvalue(80, 25).value, 20)
  assert.equal(BreedingFormulas.effectivepopulation(20, 80).value, 64, 'Ne from the breeding sexes')
  assert.equal(BreedingFormulas.conceptionrate(85, 100).value, 85)
  assert.equal(BreedingFormulas.progenycount(50, 8, 90).value, 360, 'surviving offspring')
  assert.equal(BreedingFormulas.heritability(40, 100).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('breeding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'breeding', program: ['effectivepopulation'], params: [20, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 64, `breeding.effectivepopulation at ${uuid}`)
  uuidReceiptOf('breeding effectivepopulation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; heritability 40, inbreeding 50, selectiondifferential 20, geneticgain 8, breedingvalue 20, effectivepopulation 64, conceptionrate 85, progenycount 360; crossing to zoology')
})
