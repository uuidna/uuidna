import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProsodyFormulas } from './index.js'
import '../../mcp/families.js'

test('prosody: syllablecount, stressratio, speechrate, pausecount, pitchrange, meterfeet, rhythmindex, tempo — crossing to linguistics', async (t) => {
  assert.equal(ProsodyFormulas.syllablecount(100, 2).value, 200, 'a hundred two-syllable words')
  assert.equal(ProsodyFormulas.stressratio(3, 4).value, 75)
  assert.equal(ProsodyFormulas.speechrate(900, 6).value, 150, 'words per minute')
  assert.equal(ProsodyFormulas.pausecount(100, 7).value, 15, 'breaths per line')
  assert.equal(ProsodyFormulas.pitchrange(300, 120).value, 180)
  assert.equal(ProsodyFormulas.pitchrange(100, 150).value, 0)
  assert.equal(ProsodyFormulas.meterfeet(10, 2).value, 5, 'iambic pentameter')
  assert.equal(ProsodyFormulas.rhythmindex(30, 60).value, 50)
  assert.equal(ProsodyFormulas.tempo(480, 4).value, 120, 'beats per minute')
  assert.equal(ProsodyFormulas.syllablecount(100, 2).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('prosody')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'prosody', program: ['meterfeet'], params: [10, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `prosody.meterfeet at ${uuid}`)
  uuidReceiptOf('prosody meterfeet', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; syllablecount 200, stressratio 75, speechrate 150, pausecount 15, pitchrange 180, meterfeet 5, rhythmindex 50, tempo 120; crossing to linguistics')
})
