import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PolyphonyFormulas } from './index.js'
import '../../mcp/families.js'

test('polyphony: voicecount, maxpolyphony, voiceleadingcost, independenceindex, densityratio, overlapcount, textureindex, activevoices — crossing to music', async (t) => {
  assert.equal(PolyphonyFormulas.voicecount(4, 3).value, 12, 'four parts of three lines')
  assert.equal(PolyphonyFormulas.maxpolyphony(8, 16).value, 16, 'the fuller section')
  assert.equal(PolyphonyFormulas.voiceleadingcost(60, 67).value, 7, 'a perfect fifth of motion')
  assert.equal(PolyphonyFormulas.independenceindex(3, 4).value, 75)
  assert.equal(PolyphonyFormulas.densityratio(7, 10).value, 70)
  assert.equal(PolyphonyFormulas.overlapcount(12, 5).value, 7, 'notes still sounding')
  assert.equal(PolyphonyFormulas.textureindex(24, 4).value, 6, 'notes per voice')
  assert.equal(PolyphonyFormulas.activevoices(16, 4).value, 12)
  assert.equal(PolyphonyFormulas.voicecount(4, 3).dst, 'music')
  assert.equal(hexFamiliesOf().get('polyphony')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'polyphony', program: ['voicecount'], params: [4, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `polyphony.voicecount at ${uuid}`)
  uuidReceiptOf('polyphony voicecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; voicecount 12, maxpolyphony 16, voiceleadingcost 7, independenceindex 75, densityratio 70, overlapcount 7, textureindex 6, activevoices 12; crossing to music')
})
