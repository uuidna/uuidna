import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsychFormulas } from './index.js'
import '../../mcp/families.js'

test('psych: competency, capacity, risk, insanity, malingering, restoration — into evidence', async (t) => {
  assert.equal(PsychFormulas.competency(18, 15).value, 1, 'competent to stand trial')
  assert.equal(PsychFormulas.competency(10, 15).value, 0)
  assert.equal(PsychFormulas.capacity(4, 4).value, 1, 'every domain intact')
  assert.equal(PsychFormulas.capacity(4, 3).value, 0)
  assert.equal(PsychFormulas.risk(6, 4).value, 10, 'static plus dynamic factors')
  assert.equal(PsychFormulas.insanity(3, 2, 4).value, 1, 'impairment meets the legal threshold')
  assert.equal(PsychFormulas.insanity(1, 1, 4).value, 0)
  assert.equal(PsychFormulas.malingering(5, 3).value, 1, 'inconsistencies reach the cutoff')
  assert.equal(PsychFormulas.restoration(8, 6).value, 1)
  assert.equal(PsychFormulas.recidivism(4, 3).value, 12)
  assert.equal(PsychFormulas.dangerousness(5, 4).value, 20)
  assert.equal(PsychFormulas.risk(6, 4).dst, 'evidence')
  assert.equal(hexFamiliesOf().get('psych')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'psych', program: ['risk'], params: [6, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `psych.risk at ${uuid}`)
  uuidReceiptOf('psych risk', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; competency 1, capacity 1, risk 10, insanity 1, malingering 1, restoration 1, recidivism 12, dangerousness 20; crossing to evidence')
})
