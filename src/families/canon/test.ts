import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CanonFormulas } from './index.js'
import '../../mcp/families.js'

/** THE NUMBERING IS EXACT; THE MEANING IS A LEAD. The counts are facts — 66 books of the Protestant Bible in 1189
 *  chapters, 114 suras, 150 psalms, 4 Gospels, 2 testaments — and the ways to read a canon are exact combinatorics:
 *  5 books of the Torah fall into 120 orders, 4 Gospels into 24, and a canon of n books into 2^n − 1 selections. What
 *  those numbers signify is never asserted; each is fed to the discovery as a lead, crossing canon → cross. */
test('canon: the holy books numbered, and the ways they are read, exact — the significance a lead', async (t) => {
  // the numbering: facts
  assert.equal(CanonFormulas.books(0).value, 24, 'the Tanakh')
  assert.equal(CanonFormulas.books(2).value, 66, 'the Protestant Bible: 39 + 27')
  assert.equal(CanonFormulas.books(3).value, 27, 'the New Testament')
  assert.equal(CanonFormulas.books(4).value, 114, 'the Quran, in suras')
  assert.equal(CanonFormulas.books(99).holds, false, 'a canon not numbered here owes nothing')
  assert.equal(CanonFormulas.chapters(2).value, 1189, 'the Bible in chapters')
  assert.equal(CanonFormulas.chapters(1).value, 187, 'the Torah in chapters')
  assert.equal(CanonFormulas.chapters(0).holds, false, 'no chapter count asserted for the Tanakh here')
  assert.equal(CanonFormulas.suras().value, 114)
  assert.equal(CanonFormulas.psalms().value, 150)
  assert.equal(CanonFormulas.gospels().value, 4)
  assert.equal(CanonFormulas.testaments().value, 2, 'a coin')

  // the ways a canon is read: exact combinatorics
  assert.equal(CanonFormulas.orderings(4).value, 24, 'the 4 Gospels read in 24 orders')
  assert.equal(CanonFormulas.orderings(5).value, 120, 'the 5 books of the Torah in 120')
  assert.equal(CanonFormulas.orderings(0).value, 1, 'one way to read nothing')
  assert.equal(CanonFormulas.orderings(19).holds, false, '19! is past the safe integer — astronomical, a lead for the split')
  assert.equal(CanonFormulas.selections(5).value, 31, '2^5 − 1 non-empty selections of 5 books')
  assert.equal(CanonFormulas.selections(1).value, 1)
  assert.equal(CanonFormulas.selections(53).holds, false, 'past 2^52 the count leaves the safe integer')

  // every value crosses canon → cross (the discovery), the significance never asserted
  assert.equal(CanonFormulas.books(2).dst, 'cross')
  assert.equal(CanonFormulas.suras().dst, 'cross')

  // the family is exactly its eight registered formulas
  assert.equal(hexFamiliesOf().get('canon')?.length, 8)

  // a sample runs at its hex address and agrees, with a receipt
  for (const [name, params, expected] of [['books', [2], 66], ['suras', [], 114], ['orderings', [5], 120], ['selections', [5], 31]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'canon', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(Number(run.value), expected, `canon.${name} at ${uuid}`)
    assert.equal(run.holds, true)
    uuidReceiptOf(`canon ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; Bible 66/1189, Quran 114, Psalter 150, Gospels 4, testaments 2; Torah read 120 ways, Gospels 24; each a lead crossing canon → cross')
})
