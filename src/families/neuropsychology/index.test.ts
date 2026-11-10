import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NeuropsychologyFormulas } from './index.js'
import '../../mcp/families.js'

test('neuropsychology: iq, memoryquotient, lateralization, deficit, recovery, span, processingspeed, executivefunction — crossing to neurology', async (t) => {
  assert.equal(NeuropsychologyFormulas.iq(12, 10).value, 120, 'ratio IQ of a bright child')
  assert.equal(NeuropsychologyFormulas.memoryquotient(85, 100).value, 85)
  assert.equal(NeuropsychologyFormulas.lateralization(60, 40).value, 20, 'right-hemisphere bias')
  assert.equal(NeuropsychologyFormulas.deficit(100, 75).value, 25, 'points lost from baseline')
  assert.equal(NeuropsychologyFormulas.deficit(50, 80).value, 0)
  assert.equal(NeuropsychologyFormulas.recovery(30, 50).value, 60, 'percent of loss regained')
  assert.equal(NeuropsychologyFormulas.span(49, 7).value, 7)
  assert.equal(NeuropsychologyFormulas.processingspeed(120, 60).value, 120, 'items per minute')
  assert.equal(NeuropsychologyFormulas.executivefunction(48, 8).value, 40)
  assert.equal(NeuropsychologyFormulas.iq(12, 10).dst, 'neurology')
  assert.equal(hexFamiliesOf().get('neuropsychology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'neuropsychology', program: ['iq'], params: [12, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `neuropsychology.iq at ${uuid}`)
  uuidReceiptOf('neuropsychology iq', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; iq 120, memoryquotient 85, lateralization 20, deficit 25, recovery 60, span 7, processingspeed 120, executivefunction 40; crossing to neurology')
})
