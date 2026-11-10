import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmailFormulas } from './index.js'
import '../../mcp/families.js'

test('email: deliverability, spam, optout, hardbounce, reputation, clickrate, hygiene, throttle — crossing to messaging', async (t) => {
  assert.equal(EmailFormulas.deliverability(980, 1000).value, 98)
  assert.equal(EmailFormulas.spam(5, 1000).value, 0, 'half a percent floors to 0')
  assert.equal(EmailFormulas.optout(3, 1000).value, 0)
  assert.equal(EmailFormulas.hardbounce(20, 1000).value, 2)
  assert.equal(EmailFormulas.reputation(1, 1000).value, 0)
  assert.equal(EmailFormulas.clickrate(150, 600).value, 25)
  assert.equal(EmailFormulas.hygiene(900, 1000).value, 90)
  assert.equal(EmailFormulas.throttle(1200, 500).value, 500, 'the limit caps the send')
  assert.equal(EmailFormulas.throttle(300, 500).value, 300, 'under the limit, all sent')
  assert.equal(EmailFormulas.deliverability(980, 1000).dst, 'messaging')
  assert.equal(hexFamiliesOf().get('email')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'email', program: ['hygiene'], params: [900, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `email.hygiene at ${uuid}`)
  uuidReceiptOf('email hygiene', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; deliverability 98, spam 0, optout 0, hardbounce 2, reputation 0, clickrate 25, hygiene 90, throttle 500/300; crossing to messaging')
})
