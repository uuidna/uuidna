import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { probe, kernelPresent } from './kernel-probe.js'
import {
  INVOLUTION_HANDLES, formalShapeOf, judgeRow, formaliseLeads, formalLeads, buildFormalWing, involutionWings,
  wingFileOf, verdictCurrent, type LeadBook, type LeadRow, type Probe,
} from './involution-family.js'

// THE FORMALISED-LEAD DOOR, both directions: what the door refuses before the kernel, what the kernel refuses, what it
// accepts, and that a verdict is only ever ADDED to a row. The kernel tests skip where no toolchain is installed —
// the door VOIDS on an absent kernel rather than refusing, and a test may not be stricter than the door.

const kernel = kernelPresent()
const handleOfLead = (lead: string): string => handleOf(toUuid(lead))
const never: Probe = () => { throw new Error('the door asked the kernel about a text it should have refused itself') }
const readBook = (): LeadBook => JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as LeadBook

const TRUE_LEAD = 'formal door control: two and two make four'
const FALSE_LEAD = 'formal door control: two and two make five'
const T = handleOfLead(TRUE_LEAD), F = handleOfLead(FALSE_LEAD)
const proved = (h: string, claim: string): string => `def lead_${h} : Prop := ${claim}\ntheorem proof_${h} : lead_${h} := by unfold lead_${h}; decide`
const refuted = (h: string, claim: string): string => `def lead_${h} : Prop := ${claim}\ntheorem involution_${h} : ¬ lead_${h} := by unfold lead_${h}; decide`

test('a row whose lean names another handle is refused by the door, before the kernel', () => {
  const other = handleOfLead('another lead entirely')
  for (const lean of [
    proved(other, '2 + 2 = 4'),                                                        // every name is another lead's
    proved(T, `2 + 2 = 4 ∧ lead_${other}`),                                           // its own, plus a foreign name in code
  ]) {
    const v = judgeRow(T, { lead: TRUE_LEAD, lean }, never)
    assert.equal(v.verdict, 'refused')
    assert.equal(v.by, 'door')
    assert.match(v.said ?? '', new RegExp(other))
  }
  // a foreign handle in a comment names nothing, and the lead's own text passes the door (CONTROL)
  assert.ok(!('refused' in formalShapeOf(T, `-- unlike lead_${other}\n` + proved(T, '2 + 2 = 4'))))
})

test('the door refuses a text it has no verdict theorem to read from', () => {
  const cases: [string, RegExp][] = [
    [`def lead_${T} : Prop := 2 + 2 = 4`, /0 verdict theorems/],
    [proved(T, '2 + 2 = 4') + `\ntheorem involution_${T} : ¬ lead_${T} := by decide`, /2 verdict theorems/],
    [`def lead_${T} : Prop := 2 + 2 = 4\ntheorem proof_${T} : ¬ lead_${T} := by decide`, /must read/],
    [proved(T, '2 + 2 = 4') + '\ndef later : Nat := 1', /must close the text/],
    [`theorem proof_${T} : 2 + 2 = 4 := by decide`, /declares `def lead_/],
  ]
  for (const [lean, why] of cases) {
    const v = judgeRow(T, { lead: TRUE_LEAD, lean }, never)
    assert.equal(v.by, 'door')
    assert.match(v.said ?? '', why)
  }
})

test('the kernel refuses sorry and an axiom, and accepts the honest proof (control)', { skip: !kernel && 'no lean toolchain' }, () => {
  const sorry = judgeRow(T, { lead: TRUE_LEAD, lean: `def lead_${T} : Prop := 2 + 2 = 4\ntheorem proof_${T} : lead_${T} := by sorry` }, probe)
  assert.deepEqual([sorry.verdict, sorry.by], ['refused', 'kernel'])
  assert.match(sorry.said ?? '', /sorryAx/)
  const axiom = judgeRow(F, { lead: FALSE_LEAD, lean: `axiom cheat : 2 + 2 = 5\ndef lead_${F} : Prop := 2 + 2 = 5\ntheorem proof_${F} : lead_${F} := by exact cheat` }, probe)
  assert.deepEqual([axiom.verdict, axiom.by], ['refused', 'kernel'])
  assert.match(axiom.said ?? '', /cheat/)
  const honest = judgeRow(T, { lead: TRUE_LEAD, lean: proved(T, '2 + 2 = 4') }, probe)
  assert.deepEqual([honest.verdict, honest.by, honest.theorem, honest.axioms], ['accepted', 'kernel', `proof_${T}`, []])
})

test('an accepted row yields a wing; an edited text loses its verdict and its wing', { skip: !kernel && 'no lean toolchain' }, () => {
  const book: LeadBook = { trial: [{ lead: TRUE_LEAD, lean: proved(T, '2 + 2 = 4') }], refuted: [{ lead: FALSE_LEAD, lean: refuted(F, '2 + 2 = 5') }] }
  const { book: next, judged } = formaliseLeads(book, probe)
  assert.deepEqual(judged.map((j) => [j.handle, j.kernel.verdict]), [[T, 'accepted'], [F, 'accepted']])
  const formal = formalLeads(next)
  assert.deepEqual(formal.map((f) => [f.handle, f.kind, f.section]).sort(), [[T, 'proof', 'trial'], [F, 'involution', 'refuted']].sort())
  for (const f of formal) {
    const w = buildFormalWing(f)
    assert.equal(w.file, f.kind === 'involution' ? wingFileOf(f.handle) : `Proof${f.handle}.lean`)
    assert.ok(w.defs.replace(/\s+/g, ' ').includes(f.row.lead), 'the lead\'s own text documents lead_<handle>')
    assert.match(w.defs, new RegExp(`^def lead_${f.handle} : Prop :=`, 'm'))
    assert.equal(w.facts.length, 1)
    assert.equal(w.facts[0]!.key, `${f.kind}_${f.handle}`)
    assert.equal(w.facts[0]!.js?.(), true)
    // lean-ledger reads a theorem only in the shape `theorem <key> : <statement> := by <tactic>`
    assert.match(w.facts[0]!.lean ?? '', new RegExp(`^theorem ${w.facts[0]!.key} :[^]*?:= by`))
  }
  const edited: LeadBook = { ...next, trial: [{ ...next.trial[0]!, lean: proved(T, '2 + 2 = 2 * 2') }] }
  assert.equal(verdictCurrent(edited.trial[0]!), false)
  assert.deepEqual(formalLeads(edited).map((f) => f.handle), [F], 'a verdict stands for the text it judged and no other')
})

test('supporting theorems a row states before its verdict become facts, never rows no wing registers (lead ef58b583)', () => {
  const f = formalLeads().find((x) => x.handle === 'ef58b583')
  assert.ok(f, 'lead ef58b583 carries a text the kernel accepted')
  const w = buildFormalWing(f)
  assert.deepEqual(w.facts.map((x) => x.key), ['altWalk_zero', 'alternation_misses_from_zero', 'involution_ef58b583'], 'the verdict closes the wing')
  assert.doesNotMatch(w.defs, /^theorem\s/m, 'a theorem left in the defs reaches the ledger as a row no wing registers')
  for (const x of w.facts) assert.match(x.lean ?? '', new RegExp(`^theorem ${x.key} :[^]*?:= by`))
})

test('the door only adds verdicts: no lead text changes, no row moves, and a current verdict is not re-asked', () => {
  const book = readBook()
  const stripped: LeadBook = { ...book, trial: book.trial.map((r) => { const { kernel: _k, ...rest } = r; return rest as LeadRow }) }
  let asked = 0
  const { book: next, judged } = formaliseLeads(stripped, () => { asked++; return null })
  const withLean = [...book.trial, ...book.refuted].filter((r) => typeof r.lean === 'string')
  assert.ok(withLean.length >= 1, 'the tree carries at least one formalised lead')
  assert.equal(judged.length, stripped.trial.filter((r) => typeof r.lean === 'string').length + book.refuted.filter((r) => typeof r.lean === 'string' && !verdictCurrent(r)).length)
  assert.equal(asked, judged.filter((j) => j.kernel.by === 'kernel').length)
  for (const s of ['trial', 'refuted'] as const) {
    assert.equal(next[s].length, book[s].length, `${s}: the count never drops`)
    assert.deepEqual(next[s].map((r) => r.lead), book[s].map((r) => r.lead), `${s}: no lead text changes`)
    for (const [i, r] of next[s].entries()) if (typeof r.lean !== 'string') assert.equal(r, stripped[s][i], 'a row with no lean is the same object')
  }
  asked = 0
  formaliseLeads(next, () => { asked++; return null })
  assert.equal(asked, 0, 'every verdict is current, so the kernel is asked nothing')
})

test('a hand-built involution never goes through the generic builder, so its wing and seals stay as they are', () => {
  const book = readBook()
  const h = INVOLUTION_HANDLES[0]!
  const lean = refuted(h, '1 = 2')
  const refutedRows = book.refuted.map((r) => handleOfLead(r.lead) === h
    ? { ...r, lean, kernel: { verdict: 'accepted' as const, by: 'kernel' as const, theorem: `involution_${h}`, receipt: toUuid(lean), axioms: [] } }
    : r)
  const withBuilt: LeadBook = { ...book, refuted: refutedRows }
  assert.ok(!formalLeads(withBuilt).some((f) => f.handle === h))
  const wings = involutionWings(undefined, withBuilt)
  assert.deepEqual(wings.slice(0, INVOLUTION_HANDLES.length).map((w) => w.file), INVOLUTION_HANDLES.map(wingFileOf))
  assert.equal(new Set(wings.map((w) => w.file)).size, wings.length, 'one file per wing')
})

// THE REAL LEAD: trial de5612a2, the 42-state paired walk, formalised in its row and judged by the kernel.
const WALK = 'de5612a2'
test('lead de5612a2 carries its own Lean, and the kernel accepted it for its current text', () => {
  const row = readBook().trial.find((r) => handleOfLead(r.lead) === WALK)
  assert.ok(row?.lean, 'the row is in trial and carries lean')
  assert.equal(row.kernel?.verdict, 'accepted')
  assert.equal(verdictCurrent(row), true)
  assert.deepEqual(row.kernel?.axioms, [])
  assert.ok(formalLeads().some((f) => f.handle === WALK && f.kind === 'proof'))
})

test('the kernel refuses the walk once one of the lead\'s figures is moved (the perturbation)', { skip: !kernel && 'no lean toolchain' }, () => {
  const row = readBook().trial.find((r) => handleOfLead(r.lead) === WALK)!
  for (const [from, to] of [['fwd 21 = (8, 1)', 'fwd 21 = (8, 2)'], ['= [21, 42]', '= [21]'], ['eraseDups.length = 42', 'eraseDups.length = 41']] as const) {
    assert.ok(row.lean!.includes(from), `the statement carries ${from}`)
    const v = judgeRow(WALK, { ...row, lean: row.lean!.replace(from, to) }, probe)
    assert.deepEqual([v.verdict, v.by], ['refused', 'kernel'], `${to}: the kernel refuses a figure the walk does not reach`)
  }
})
