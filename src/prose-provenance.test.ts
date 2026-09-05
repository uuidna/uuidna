import { test } from 'node:test'
import assert from 'node:assert/strict'
import { proseCensus, proseProvenance, proseProvenanceGaps, ORIGIN_FORMS, GENERATED_PROSE } from './prose-provenance.js'

// THE CAPTAIN ASKED FOR A PROOF THAT ALL ESSAYS ARE HUMAN CREATION WITH NO ARTIFICIAL EDITS. That claim is
// false in this repository and the pages say so themselves: all 234 under docs/articles are written by a
// generator. So the claim was involuted into the one that is both true and checkable — every machine-written
// page DECLARES that it is machine-written — which is the property that protects an authorship claim instead
// of diluting it. These tests hold that, and the first one holds the honesty of the surface itself.

test('the census refuses to certify human authorship, and says so in its own answer', () => {
  const c = proseCensus()
  assert.match(c.honest, /does NOT establish that anything was written by a person/i)
  assert.match(c.honest, /machine-written/i)
  assert.ok(c.pages > 100, 'the census must actually cover the prose tree')
})

test('every generated prose page declares its origin — none can be read as a person\'s writing', () => {
  const c = proseCensus()
  assert.deepEqual(c.silent, [], 'an unlabelled generated page is a machine\'s prose a reader could take for a person\'s')
  assert.equal(c.declared, c.pages, 'declared must BE the page count, not a number beside it')
  assert.deepEqual(proseProvenanceGaps(), [])
})

// THE CONTROL. A census that returns zero silent pages reads the same whether it checked or could not see. So
// the detector is shown FIRING on a page with no origin statement, and staying quiet on each wording in use.
test('the detector FIRES on a page with no origin statement, and accepts every wording in use', () => {
  const noOrigin = '---\ntitle: Something\n---\n\n# A heading\n\nOrdinary prose with no statement of where it came from.\n'
  assert.equal(ORIGIN_FORMS.some((r) => r.test(noOrigin)), false, 'silence must not match any accepted form')
  for (const form of ORIGIN_FORMS) {
    const sample = 'text ' + form.source.replace(/\\\//g, '/').replace(/[\^$]/g, '') + ' text'
    assert.ok(ORIGIN_FORMS.some((r) => r.test(sample)) || form.source.includes('\\'),
      `the form ${form.source} must match a page that uses it`)
  }
  assert.ok(ORIGIN_FORMS.length >= 4, 'several honest wordings, not one mandated phrase')
})

test('the wordings actually in use are visible, so the vocabulary is measured rather than assumed', () => {
  const c = proseCensus()
  assert.ok(c.forms.length >= 2, `more than one voice is in use: ${c.forms.join(' | ')}`)
  const rows = proseProvenance()
  assert.equal(rows.length, c.pages)
  for (const r of rows) assert.ok(r.writer.length > 0, `${r.path}: a generated page must name its writer`)
  assert.ok(GENERATED_PROSE.length > 0)
})
