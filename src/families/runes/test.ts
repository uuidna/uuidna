import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RunesFormulas } from './index.js'
import '../../mcp/families.js'

test('runes: futharkletters, inscriptionpairs, stavecount, orderingchoices, boundrunes, magicsubsets, rowdivisions, legibility — crossing to linguistics', async (t) => {
  assert.equal(RunesFormulas.futharkletters(24, 0).value, 24)
  assert.equal(RunesFormulas.inscriptionpairs(16, 2).value, 120)
  assert.equal(RunesFormulas.stavecount(16, 2).value, 32)
  assert.equal(RunesFormulas.orderingchoices(6).value, 720)
  assert.equal(RunesFormulas.boundrunes(3, 2).value, 5)
  assert.equal(RunesFormulas.magicsubsets(5).value, 32)
  assert.equal(RunesFormulas.rowdivisions(3, 0).value, 3)
  assert.equal(RunesFormulas.legibility(70, 100).value, 70)
  assert.equal(RunesFormulas.futharkletters(24, 0).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('runes')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'runes', program: ['futharkletters'], params: [24, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `runes.futharkletters at ${uuid}`)
  uuidReceiptOf('runes futharkletters', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; futharkletters 24, inscriptionpairs 120, stavecount 32, orderingchoices 720, boundrunes 5, magicsubsets 32, rowdivisions 3, legibility 70; crossing to linguistics')
})
