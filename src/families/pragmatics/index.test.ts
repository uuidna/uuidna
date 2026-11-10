import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PragmaticsFormulas } from './index.js'
import '../../mcp/families.js'

test('pragmatics: implicature, deixis, politeness, relevance, turntaking, speechact, presupposition, cooperation — crossing to linguistics', async (t) => {
  assert.equal(PragmaticsFormulas.implicature(30, 40).value, 75)
  assert.equal(PragmaticsFormulas.deixis(10, 3).value, 3)
  assert.equal(PragmaticsFormulas.politeness(8, 10).value, 80)
  assert.equal(PragmaticsFormulas.relevance(9, 10).value, 90)
  assert.equal(PragmaticsFormulas.turntaking(100, 4).value, 25, 'turns per speaker')
  assert.equal(PragmaticsFormulas.speechact(45, 50).value, 90)
  assert.equal(PragmaticsFormulas.presupposition(12, 4).value, 3)
  assert.equal(PragmaticsFormulas.cooperation(3, 4).value, 75)
  assert.equal(PragmaticsFormulas.implicature(30, 40).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('pragmatics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pragmatics', program: ['turntaking'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `pragmatics.turntaking at ${uuid}`)
  uuidReceiptOf('pragmatics turntaking', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; implicature 75, deixis 3, politeness 80, relevance 90, turntaking 25, speechact 90, presupposition 3, cooperation 75; crossing to linguistics')
})
