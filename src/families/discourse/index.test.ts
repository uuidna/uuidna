import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DiscourseFormulas } from './index.js'
import '../../mcp/families.js'

test('discourse: cohesion, coherence, turnlength, referencechains, topicshifts, connectives, anaphoradensity, utterancecount — crossing to linguistics', async (t) => {
  assert.equal(DiscourseFormulas.cohesion(45, 100).value, 45, 'cohesive ties per hundred sentences')
  assert.equal(DiscourseFormulas.coherence(30, 50).value, 60)
  assert.equal(DiscourseFormulas.turnlength(1000, 50).value, 20, 'words per turn')
  assert.equal(DiscourseFormulas.referencechains(120, 30).value, 4, 'mentions per entity')
  assert.equal(DiscourseFormulas.topicshifts(12, 200).value, 6)
  assert.equal(DiscourseFormulas.connectives(80, 400).value, 20)
  assert.equal(DiscourseFormulas.anaphoradensity(50, 5000).value, 10, 'anaphors per thousand tokens')
  assert.equal(DiscourseFormulas.utterancecount(4, 25).value, 100, 'utterances spoken')
  assert.equal(DiscourseFormulas.cohesion(45, 100).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('discourse')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'discourse', program: ['turnlength'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `discourse.turnlength at ${uuid}`)
  uuidReceiptOf('discourse turnlength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cohesion 45, coherence 60, turnlength 20, referencechains 4, topicshifts 6, connectives 20, anaphoradensity 10, utterancecount 100; crossing to linguistics')
})
