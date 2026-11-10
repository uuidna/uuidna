import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SyllabaryFormulas } from './index.js'
import '../../mcp/families.js'

test('syllabary: syllables, cvcombos, consonants, vowels, gridcells, orderingchoices, charsubsets, coverage — crossing to combinatorics', async (t) => {
  assert.equal(SyllabaryFormulas.syllables(5, 10).value, 50)
  assert.equal(SyllabaryFormulas.cvcombos(15, 2).value, 105)
  assert.equal(SyllabaryFormulas.consonants(14, 0).value, 14)
  assert.equal(SyllabaryFormulas.vowels(5, 0).value, 5)
  assert.equal(SyllabaryFormulas.gridcells(14, 5).value, 70)
  assert.equal(SyllabaryFormulas.orderingchoices(5).value, 120)
  assert.equal(SyllabaryFormulas.charsubsets(6).value, 64)
  assert.equal(SyllabaryFormulas.coverage(95, 100).value, 95)
  assert.equal(SyllabaryFormulas.syllables(5, 10).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('syllabary')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'syllabary', program: ['syllables'], params: [5, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `syllabary.syllables at ${uuid}`)
  uuidReceiptOf('syllabary syllables', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; syllables 50, cvcombos 105, consonants 14, vowels 5, gridcells 70, orderingchoices 120, charsubsets 64, coverage 95; crossing to combinatorics')
})
