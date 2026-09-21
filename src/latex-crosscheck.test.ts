// latex-crosscheck — THE FINDER MUST BE ABLE TO FAIL BEFORE ITS CLEAN READING IS WORTH ANYTHING.
//
// This finder took five iterations to become trustworthy, and every flaw was caught by a number that matched too
// exactly to be chance: a sweeping regex read 1458 of 5499 blocks; the lstlisting wrapper was the wrong anchor
// because 9540 listings span 5499 theorems; the wings were read line by line, so 40 multi-line declarations read as
// unproved — exactly the gap between wings and ledger. So the control comes FIRST here: a run that could not read a
// surface must answer UNMEASURED and never agreement, because an empty comparison otherwise reports perfect
// agreement having compared nothing, which is this tree's recurring defect in its purest form — an action that was
// ABSENT reporting success.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { latexCrosscheck } from './latex-crosscheck.js'
import { ROOT } from './scripts/api.js'

test('THE CONTROL — a surface that cannot be read answers UNMEASURED, never agreement', () => {
  const c = latexCrosscheck('/nowhere-this-tree-has-never-been')
  assert.equal(c.agree, false, 'an unread surface must never read as agreement')
  assert.equal(typeof c.unmeasured, 'string', 'and it must say WHY it decided nothing')
  assert.equal(c.surfaces.wings, 0)
  assert.equal(c.surfaces.paper, 0)
})

test('the three surfaces are read, and the wings and the ledger agree in count', () => {
  const c = latexCrosscheck(ROOT)
  assert.equal(c.unmeasured, undefined, 'inside the repository every surface is readable')
  assert.ok(c.surfaces.wings > 1000, `wings read: ${c.surfaces.wings}`)
  assert.ok(c.surfaces.paper > 1000, `paper read: ${c.surfaces.paper}`)
  // the kernel-verified wings and the served ledger are derived along different paths; a difference between their
  // counts is how the parser's own blind spot was caught, so it is asserted rather than assumed
  assert.equal(c.surfaces.wings, c.surfaces.ledger, 'the wings the kernel verified and the ledger every door serves must hold the same keys')
})

test('every disagreement is reported as a LEAD with its key and its reason, never as a fix', () => {
  const c = latexCrosscheck(ROOT)
  const kinds = ['paper-disagrees-with-itself', 'proved-but-not-in-the-ledger', 'proved-but-not-published',
    'published-but-not-proved', 'same-key-different-statement']
  for (const l of c.leads) {
    assert.ok(l.key.length > 0, 'a lead names the theorem it is about')
    assert.ok(l.why.length > 0, 'and states what each surface said')
    assert.ok(kinds.includes(l.kind), `unknown kind ${l.kind}`)
  }
  assert.equal(c.agree, c.leads.length === 0, 'agree is exactly the absence of leads')
})
