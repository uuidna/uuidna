import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NoticeFormulas } from './index.js'
import '../../mcp/families.js'

test('notice: severity, dismiss, cta, duration, stack, priority, impressions, autohide — crossing to frontend', async (t) => {
  assert.equal(NoticeFormulas.severity(3).value, 3)
  assert.equal(NoticeFormulas.dismiss(30, 120).value, 25)
  assert.equal(NoticeFormulas.cta(45, 300).value, 15, 'click-through percentage')
  assert.equal(NoticeFormulas.duration(5000).value, 5000)
  assert.equal(NoticeFormulas.stack(4).value, 4)
  assert.equal(NoticeFormulas.priority(7, 3).value, 1, 'the first notice wins')
  assert.equal(NoticeFormulas.priority(3, 7).value, 0)
  assert.equal(NoticeFormulas.impressions(80, 100).value, 80)
  assert.equal(NoticeFormulas.autohide(10).value, 10)
  assert.equal(NoticeFormulas.severity(3).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('notice')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'notice', program: ['cta'], params: [45, 300] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `notice.cta at ${uuid}`)
  uuidReceiptOf('notice cta', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; severity 3, dismiss 25, cta 15, duration 5000, stack 4, priority 1, impressions 80, autohide 10; crossing to frontend')
})
