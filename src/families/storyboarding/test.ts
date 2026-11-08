import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StoryboardingFormulas } from './index.js'
import '../../mcp/families.js'

test('storyboarding: panels, shotcombos, framesize, sequenceorderings, aspectratio, gridcells, transitiontypes, coverage — crossing to geometry', async (t) => {
  assert.equal(StoryboardingFormulas.panels(40, 6).value, 240)
  assert.equal(StoryboardingFormulas.shotcombos(12, 2).value, 66)
  assert.equal(StoryboardingFormulas.framesize(16, 9).value, 144)
  assert.equal(StoryboardingFormulas.sequenceorderings(5).value, 120)
  assert.equal(StoryboardingFormulas.aspectratio(178, 100).value, 178)
  assert.equal(StoryboardingFormulas.gridcells(3, 3).value, 9)
  assert.equal(StoryboardingFormulas.transitiontypes(5, 3).value, 8)
  assert.equal(StoryboardingFormulas.coverage(90, 100).value, 90)
  assert.equal(StoryboardingFormulas.panels(40, 6).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('storyboarding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'storyboarding', program: ['panels'], params: [40, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 240, `storyboarding.panels at ${uuid}`)
  uuidReceiptOf('storyboarding panels', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; panels 240, shotcombos 66, framesize 144, sequenceorderings 120, aspectratio 178, gridcells 9, transitiontypes 8, coverage 90; crossing to geometry')
})
