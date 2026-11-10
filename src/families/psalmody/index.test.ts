import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsalmodyFormulas } from './index.js'
import '../../mcp/families.js'

test('psalmody: psalmcount, versesum, acrosticletters, toneorderings, parallelismpairs, antiphonchoices, meterfeet, strophesubsets — crossing to linguistics', async (t) => {
  assert.equal(PsalmodyFormulas.psalmcount(100, 50).value, 150)
  assert.equal(PsalmodyFormulas.versesum(150, 16).value, 2400)
  assert.equal(PsalmodyFormulas.acrosticletters(22, 0).value, 22)
  assert.equal(PsalmodyFormulas.toneorderings(8).value, 40320)
  assert.equal(PsalmodyFormulas.parallelismpairs(150, 2).value, 11175)
  assert.equal(PsalmodyFormulas.antiphonchoices(10, 2).value, 90)
  assert.equal(PsalmodyFormulas.meterfeet(4, 3).value, 12)
  assert.equal(PsalmodyFormulas.strophesubsets(5).value, 32)
  assert.equal(PsalmodyFormulas.psalmcount(100, 50).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('psalmody')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'psalmody', program: ['psalmcount'], params: [100, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `psalmody.psalmcount at ${uuid}`)
  uuidReceiptOf('psalmody psalmcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; psalmcount 150, versesum 2400, acrosticletters 22, toneorderings 40320, parallelismpairs 11175, antiphonchoices 90, meterfeet 12, strophesubsets 32; crossing to linguistics')
})
