import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HinduismFormulas } from './index.js'
import '../../mcp/families.js'

test('hinduism: vedas, deitycombos, yogapaths, mantrarepetitions, chakras, versesum, stageorderings, gunasubsets — crossing to philosophy', async (t) => {
  assert.equal(HinduismFormulas.vedas(4, 0).value, 4)
  assert.equal(HinduismFormulas.deitycombos(33, 2).value, 528)
  assert.equal(HinduismFormulas.yogapaths(4, 0).value, 4)
  assert.equal(HinduismFormulas.mantrarepetitions(108, 1).value, 108)
  assert.equal(HinduismFormulas.chakras(7, 0).value, 7)
  assert.equal(HinduismFormulas.versesum(700, 1).value, 700)
  assert.equal(HinduismFormulas.stageorderings(4).value, 24)
  assert.equal(HinduismFormulas.gunasubsets(3).value, 8)
  assert.equal(HinduismFormulas.vedas(4, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('hinduism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hinduism', program: ['vedas'], params: [4, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `hinduism.vedas at ${uuid}`)
  uuidReceiptOf('hinduism vedas', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; vedas 4, deitycombos 528, yogapaths 4, mantrarepetitions 108, chakras 7, versesum 700, stageorderings 24, gunasubsets 8; crossing to philosophy')
})
