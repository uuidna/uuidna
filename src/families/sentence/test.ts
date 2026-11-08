import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SentenceFormulas } from './index.js'
import '../../mcp/families.js'

test('sentence: terms combine and reduce — concurrent, consecutive, credit, parole, mandatory floor', async (t) => {
  assert.equal(SentenceFormulas.concurrent(60, 36).value, 60, 'concurrent: the longest term')
  assert.equal(SentenceFormulas.consecutive(60, 36).value, 96, 'consecutive: the sum')
  assert.equal(SentenceFormulas.credit(60, 14).value, 46, 'time served is credited')
  assert.equal(SentenceFormulas.credit(10, 20).value, 0, 'credit cannot go below zero')
  assert.equal(SentenceFormulas.parole(60, 50).value, 30, 'parole eligibility at half')
  assert.equal(SentenceFormulas.goodtime(60, 15).value, 9, '15% good-time')
  assert.equal(SentenceFormulas.mandatory(24, 18).value, 24, 'the mandatory minimum floor applies')
  assert.equal(SentenceFormulas.mandatory(24, 36).value, 36, 'above the minimum, the computed term stands')
  assert.equal(SentenceFormulas.enhance(60, 50).value, 90, 'a 50% enhancement')
  assert.equal(SentenceFormulas.fine(30, 50).value, 1500, 'thirty day-fine units at 50')
  assert.equal(hexFamiliesOf().get('sentence')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sentence', program: ['consecutive'], params: [60, 36] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 96, `sentence.consecutive at ${uuid}`)
  uuidReceiptOf('sentence consecutive', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; concurrent 60, consecutive 96, credit 46, parole 30, mandatory 24, enhance 90, fine 1500; crossing to law')
})
