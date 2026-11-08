import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MemoryFormulas } from './index.js'
import '../../mcp/families.js'

test('memory: retention, forgetting, recall, recognition, span, consolidation, interference, spacing — crossing to neurology', async (t) => {
  assert.equal(MemoryFormulas.retention(90, 100).value, 90)
  assert.equal(MemoryFormulas.forgetting(10, 100).value, 10)
  assert.equal(MemoryFormulas.recall(75, 100).value, 75, 'three in four retrieved')
  assert.equal(MemoryFormulas.recognition(95, 100).value, 95)
  assert.equal(MemoryFormulas.span(7).value, 7, 'seven items held')
  assert.equal(MemoryFormulas.consolidation(80, 100).value, 80)
  assert.equal(MemoryFormulas.interference(20, 100).value, 20)
  assert.equal(MemoryFormulas.spacing(12, 3).value, 4, 'four reviews per interval')
  assert.equal(MemoryFormulas.retention(90, 100).dst, 'neurology')
  assert.equal(hexFamiliesOf().get('memory')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'memory', program: ['spacing'], params: [12, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `memory.spacing at ${uuid}`)
  uuidReceiptOf('memory spacing', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; retention 90, forgetting 10, recall 75, recognition 95, span 7, consolidation 80, interference 20, spacing 4; crossing to neurology')
})
