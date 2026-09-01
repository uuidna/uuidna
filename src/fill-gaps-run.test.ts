import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FILL_GAPS_PHASES,
  fillGapsPlan,
  hasDeskAutomatableWork,
} from './scripts/fill-gaps-run.js'
import type { GapSurvey } from './gap-survey.js'

const emptySurvey = (): GapSurvey => ({
  releaseReady: true,
  releaseOpen: 0,
  trialGaps: 0,
  openLeads: 0,
  tableShort: 0,
  tableLeadTop: null,
  lonely: 0,
  harvest: 0,
  alpinePending: 0,
  wavePending: 0,
  waveInFlight: 0,
  refusalOpen: 0,
  bookTrialsUntried: 0,
  buckets: [],
  kernelOnly: [],
  automatable: [],
})

test('fillGapsPlan — always includes develop bookends', () => {
  const plan = fillGapsPlan(emptySurvey())
  const names = plan.map((p) => p.name)
  assert.ok(names.includes('develop'))
  assert.ok(names.includes('develop-final'))
  assert.equal(names[names.length - 1], 'develop-final')
})

test('hasDeskAutomatableWork — false when only develop bookends would run', () => {
  assert.equal(hasDeskAutomatableWork(emptySurvey()), false)
})

test('hasDeskAutomatableWork — true when lonely, harvest, wave, or open-leads need work', () => {
  assert.equal(hasDeskAutomatableWork({ ...emptySurvey(), lonely: 3 }), true)
  assert.equal(hasDeskAutomatableWork({ ...emptySurvey(), harvest: 1 }), true)
  assert.equal(hasDeskAutomatableWork({ ...emptySurvey(), wavePending: 2 }), true)
  assert.equal(hasDeskAutomatableWork({ ...emptySurvey(), openLeads: 58 }), true)
  assert.equal(hasDeskAutomatableWork({ ...emptySurvey(), refusalOpen: 4 }), true)
  assert.equal(hasDeskAutomatableWork({ ...emptySurvey(), bookTrialsUntried: 75 }), true)
})

test('FILL_GAPS_PHASES — leverage order matches the taught arc', () => {
  assert.deepEqual(
    FILL_GAPS_PHASES.map((p) => p.name),
    ['dry-clean', 'develop', 'connect-lonely', 'books', 'alpine-discovery', 'domains-deposit', 'trial-refusals', 'trial-book-leads', 'wave', 'derive-surfaces', 'develop-final'],
  )
})
