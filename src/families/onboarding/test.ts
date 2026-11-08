import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OnboardingFormulas } from './index.js'
import '../../mcp/families.js'

test('onboarding: rampup, completion, milestone, enablement, timetoproductive, checklist, mentoring, satisfaction — crossing to pedagogy', async (t) => {
  assert.equal(OnboardingFormulas.rampup(30, 2).value, 60, 'a month of ramp')
  assert.equal(OnboardingFormulas.completion(8, 10).value, 80)
  assert.equal(OnboardingFormulas.milestone(10, 4).value, 3, 'three stages for the tasks')
  assert.equal(OnboardingFormulas.enablement(10000, 90).value, 900)
  assert.equal(OnboardingFormulas.timetoproductive(300, 10).value, 30, 'days per hire')
  assert.equal(OnboardingFormulas.checklist(60, 6).value, 10, 'items per day')
  assert.equal(OnboardingFormulas.mentoring(12, 5).value, 60)
  assert.equal(OnboardingFormulas.satisfaction(90, 80).value, 1, 'satisfaction met')
  assert.equal(OnboardingFormulas.satisfaction(70, 80).value, 0)
  assert.equal(OnboardingFormulas.rampup(30, 2).dst, 'pedagogy')
  assert.equal(hexFamiliesOf().get('onboarding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'onboarding', program: ['milestone'], params: [10, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `onboarding.milestone at ${uuid}`)
  uuidReceiptOf('onboarding milestone', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rampup 60, completion 80, milestone 3, enablement 900, timetoproductive 30, checklist 10, mentoring 60, satisfaction 1; crossing to pedagogy')
})
