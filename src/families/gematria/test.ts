import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GematriaFormulas } from './index.js'
import '../../mcp/families.js'

test('gematria: lettervalue, wordtotal, equivalences, cipherorderings, alphabetsize, valuesum, substitutions, reductionmod — crossing to linguistics', async (t) => {
  assert.equal(GematriaFormulas.lettervalue(22, 1).value, 22)
  assert.equal(GematriaFormulas.wordtotal(10, 20, 30).value, 60)
  assert.equal(GematriaFormulas.equivalences(22, 2).value, 231)
  assert.equal(GematriaFormulas.cipherorderings(5).value, 120)
  assert.equal(GematriaFormulas.alphabetsize(22, 0).value, 22)
  assert.equal(GematriaFormulas.valuesum(400, 1).value, 400)
  assert.equal(GematriaFormulas.substitutions(22, 2).value, 0)
  assert.equal(GematriaFormulas.reductionmod(60, 9).value, 6)
  assert.equal(GematriaFormulas.lettervalue(22, 1).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('gematria')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gematria', program: ['lettervalue'], params: [22, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 22, `gematria.lettervalue at ${uuid}`)
  uuidReceiptOf('gematria lettervalue', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lettervalue 22, wordtotal 60, equivalences 231, cipherorderings 120, alphabetsize 22, valuesum 400, substitutions 0, reductionmod 6; crossing to linguistics')
})
