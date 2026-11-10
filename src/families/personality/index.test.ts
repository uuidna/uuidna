import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PersonalityFormulas } from './index.js'
import '../../mcp/families.js'

test('personality: openness, conscientiousness, extraversion, agreeableness, neuroticism, composite, trait, deviation — crossing to psychology', async (t) => {
  assert.equal(PersonalityFormulas.openness(40, 10).value, 80, 'four fifths of the maximum')
  assert.equal(PersonalityFormulas.conscientiousness(90, 100).value, 90)
  assert.equal(PersonalityFormulas.extraversion(70, 30).value, 40, 'net sociability')
  assert.equal(PersonalityFormulas.agreeableness(45, 10).value, 90)
  assert.equal(PersonalityFormulas.neuroticism(60, 25).value, 35, 'net negativity')
  assert.equal(PersonalityFormulas.composite(80, 90, 40).value, 210)
  assert.equal(PersonalityFormulas.trait(48, 12).value, 4, 'mean item score')
  assert.equal(PersonalityFormulas.deviation(80, 50).value, 30, 'above the mean')
  assert.equal(PersonalityFormulas.deviation(40, 50).value, 0)
  assert.equal(PersonalityFormulas.openness(40, 10).dst, 'psychology')
  assert.equal(hexFamiliesOf().get('personality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'personality', program: ['composite'], params: [80, 90, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 210, `personality.composite at ${uuid}`)
  uuidReceiptOf('personality composite', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; openness 80, conscientiousness 90, extraversion 40, agreeableness 90, neuroticism 35, composite 210, trait 4, deviation 30; crossing to psychology')
})
