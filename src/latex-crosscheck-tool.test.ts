// latex-crosscheck-tool — THE DOOR, not the module beside it.
//
// src/latex-crosscheck.test.ts already exercises `latexCrosscheck()`. That is not the same question, and the
// tool-exercise census said so: it counted `uuidna_latex_crosscheck` as AGGREGATE-ONLY, covered by the folds
// that walk every tool at once and by no test that names it. A module can be correct while the door that serves
// it is wired to the wrong function, declares the wrong shape, or answers agreement where the module said
// UNMEASURED — and every one of those is invisible to a test that never opens the door.
//
// So every assertion here goes through callTool, the server's own dispatch.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, TOOL_NAMES } from './mcp.js'
import { latexCrosscheck } from './latex-crosscheck.js'
import { ROOT } from './boundary.js'
import { theorems } from './theorems/index.js'

type Answer = ReturnType<typeof latexCrosscheck>

const served = (): Answer => callTool('uuidna_latex_crosscheck', {}) as Answer

test('uuidna_latex_crosscheck is served, and answers the shape it declares', () => {
  assert.ok(TOOL_NAMES.includes('uuidna_latex_crosscheck'), 'the tool is declared in the catalogue')
  const a = served()
  for (const k of ['surfaces', 'leads', 'byKind', 'agree', 'receipt', 'honest'] as const) {
    assert.ok(k in a, `the answer carries ${k}, which the description promises`)
  }
  assert.equal(typeof a.agree, 'boolean')
  assert.ok(Array.isArray(a.leads))
  for (const k of ['wings', 'ledger', 'paper', 'selfChecked'] as const) {
    assert.equal(typeof a.surfaces[k], 'number', `surface ${k} is counted`)
  }
})

test('the door is wired to the module — same tree, same answer', () => {
  const direct = latexCrosscheck(ROOT ?? '')
  const door = served()
  assert.deepEqual(door.surfaces, direct.surfaces, 'a door reading a different tree than the module is the defect this catches')
  assert.equal(door.receipt, direct.receipt, 'the receipt folds the leads, so equal receipts mean equal findings')
  assert.equal(door.agree, direct.agree)
})

test('the ledger surface is the ledger, not a number typed beside it', () => {
  assert.equal(served().surfaces.ledger, theorems().length,
    'the ledger count must BE theorems().length — a literal here would keep answering yesterday')
})

// THE HONEST ANSWER IS THE ONE WORTH TESTING. Agreement reached by comparing nothing is exactly the failure this
// tool exists to refuse, so the two are held apart: `agree` may never be true while a surface went unread.
test('an unread surface answers UNMEASURED and never agreement', () => {
  const nowhere = latexCrosscheck('/nonexistent-root-for-this-test')
  assert.equal(nowhere.agree, false, 'nothing was compared, so nothing agreed')
  assert.match(String(nowhere.unmeasured), /not measured/)
  assert.equal(nowhere.leads.length, 0, 'an unread surface raises no lead either — it decides nothing in both directions')

  const here = served()
  if (here.unmeasured !== undefined) assert.equal(here.agree, false, 'unmeasured and agree can never both stand')
})

// A LEAD IS NAMED AND NOT SETTLED — the law the description states, held to on the served answer.
test('every lead names its kind and its key, and byKind counts exactly those leads', () => {
  const a = served()
  const KINDS = new Set(['paper-disagrees-with-itself', 'proved-but-not-in-the-ledger', 'proved-but-not-published', 'published-but-not-proved', 'same-key-different-statement'])
  for (const l of a.leads) {
    assert.ok(KINDS.has(l.kind), `a lead of unknown kind "${l.kind}" — the trial door cannot route it`)
    assert.ok(l.key.length > 0 && l.why.length > 0, 'a lead with no key or no reason is an accusation nobody can check')
  }
  const counted = Object.values(a.byKind).reduce((s, n) => s + n, 0)
  assert.equal(counted, a.leads.length, 'byKind is a census of the leads, not a separate claim')
  assert.match(a.honest, /LEAD/, 'the answer carries the law that a lead settles nothing')
})
