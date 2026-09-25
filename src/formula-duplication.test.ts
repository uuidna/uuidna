// THE TEST ATTACKS THE OVER-MERGE, because that is the failure that cannot be undone. Missing a duplicate costs a
// redundant record; merging two different results claims they are one, and if a DOI is minted on the merged key the
// literature carries that forever. proposition-address.ts states the asymmetry and this file is where it is enforced.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canonicalFormula, formulaAddress, duplicationCensus, glossOverlap, type Sealed } from './formula-duplication.js'
import { parseFormula, formulaSource } from './formula.js'

const form = (s: string): string => {
  const p = parseFormula(formulaSource(s))
  assert.ok(p.ok, `fixture must parse: ${s}`)
  return canonicalFormula(p.node)
}
const same = (a: string, b: string, why: string): void => assert.equal(form(a), form(b), why)
const differ = (a: string, b: string, why: string): void => assert.notEqual(form(a), form(b), why)

// ─── what MUST merge: the two laws this quotients by, and nothing else ───────────────────────────────────────
test('commutativity of + and * is quotiented', () => {
  same('(2 * 5) % 9 = 1', '(5 * 2) % 9 = 1', 'multiplication does not care about operand order')
  same('1 + 2 = 3', '2 + 1 = 3', 'nor does addition')
})

test('a chain of one associative operator is flattened, so grouping does not split a form', () => {
  same('1 + 2 + 3 = 6', '3 + 2 + 1 = 6', 'the same sum written backwards')
  same('(1 + 2) + 3 = 6', '1 + (2 + 3) = 6', 'associativity of + holds, so the grouping is not a fact')
})

test('equality is symmetric, so either side may be written first', () => {
  same('(2 * 5) % 9 = 1', '1 = (2 * 5) % 9', 'a = b and b = a are one statement')
})

test('an order relation written from either end is one relation', () => {
  same('2 < 5', '5 > 2', 'a < b and b > a say the same thing')
  same('3 <= 4', '4 >= 3', 'and so do the inclusive pair')
})

// ─── what MUST NOT merge: every non-commutative operator ─────────────────────────────────────────────────────
test('subtraction is NOT commutative and the census must never say otherwise', () => {
  differ('2 - 3 = 0', '3 - 2 = 1', 'over Nat these are different facts, and one of them is truncation')
})

test('division, modulo and exponentiation keep their operand order', () => {
  differ('8 / 4 = 2', '4 / 8 = 0', 'division is not commutative')
  differ('9 % 4 = 1', '4 % 9 = 4', 'nor is modulo')
  differ('2 ^ 3 = 8', '3 ^ 2 = 9', 'nor exponentiation — and here both sides are true, so a merge would be silent')
})

test('a flipped order relation is not the same as the same-direction one', () => {
  differ('2 < 5', '2 > 5', 'one is true and one is false; merging them would be catastrophic')
})

test('different numerals never merge, however similar the shape', () => {
  differ('(2 * 5) % 9 = 1', '(2 * 6) % 9 = 3', 'the shape is shared, the fact is not')
})

// THE MIRROR ORIENTATION MUST BE A BIJECTION, not a collapse: rewriting `>` to `<` while swapping the operands has
// to preserve which side is which, or `a > b` and `a < b` would both orient to the same string.
test('the mirror rewrite preserves truth — it reorders, it does not weaken', () => {
  const pairs: [string, string][] = [['2 < 5', '5 > 2'], ['5 > 2', '2 < 5'], ['3 <= 4', '4 >= 3']]
  for (const [a, b] of pairs) same(a, b, `${a} and ${b} are one relation`)
  // and the four directions over one pair of numerals give exactly TWO forms, not one and not four
  const forms = new Set([form('2 < 5'), form('5 > 2'), form('2 > 5'), form('5 < 2')])
  assert.equal(forms.size, 2, 'the two true readings collapse to one form and the two false readings to another')
})

// ─── the address, and the programs it declines to address ────────────────────────────────────────────────────
test('a statement that is not a pure formula has no algebraic address', () => {
  assert.equal(formulaAddress('(List.range 4).all (fun x => x < 4) = true'), null,
    'a program is not a formula, and guessing a normal form for one is how an over-merge starts')
})

test('the address is the canonical form, so two spellings of one formula share it', () => {
  assert.equal(formulaAddress('(2 * 5) % 9 = 1'), formulaAddress('(5*2) % 9 = 1'))
  assert.notEqual(formulaAddress('(2 * 5) % 9 = 1'), formulaAddress('(2 * 6) % 9 = 3'))
})

// ─── the census, including the distinction the measurement turned on ────────────────────────────────────────
const S = (key: string, statement: string, file: string, skill: string, name = key): Sealed => ({ key, statement, file, skill, name })

test('a form sealed by ONE skill is a copy; a form two skills meet on is shared', () => {
  const c = duplicationCensus([
    // the real shape of the widest collision: one skill, three files, three names
    S('mul9_2_5', '(2 * 5) % 9 = 1', 'Core.lean', 'z9-ring'),
    S('z9mul_2_5', '(2 * 5) % 9 = 1', 'Ring.lean', 'z9-ring'),
    S('two_mul_five', '(2*5) % 9 = 1', 'Vortex.lean', 'z9-ring'),
    // and a form two DIFFERENT skills arrive at, which is a candidate cross rather than waste
    S('a_thermo', '0 + 273 = 273', 'Thermodynamics.lean', 'thermodynamics', 'absolute zero sits 273 kelvin below the ice point'),
    S('a_colour', '273 = 0 + 273', 'Colour.lean', 'colour', 'the hue wheel returns to itself after a full turn of degrees'),
    // and one that is sealed once
    S('alone', '7 * 7 = 49', 'Core.lean', 'z9-ring'),
  ])
  assert.equal(c.formulas, 6)
  assert.equal(c.forms, 3, 'six statements, three distinct formulas')
  assert.equal(c.restatements, 3, 'three statements could go without losing a formula')
  assert.equal(c.copies, 1, 'the z9-ring triple is one skill copying itself')
  assert.equal(c.crosses, 1, 'thermodynamics and colour meeting on one form, meaning different things, is a cross')
  const triple = c.groups.find((g) => g.keys.length === 3)!
  assert.equal(triple.withinOneSkill, true)
  assert.deepEqual([...triple.files], ['Core.lean', 'Ring.lean', 'Vortex.lean'])
  assert.deepEqual([...triple.skills], ['z9-ring'])
})

test('a ledger with no duplication reports none, and the receipt still distinguishes it', () => {
  const clean = duplicationCensus([S('a', '1 + 1 = 2', 'A.lean', 's'), S('b', '2 + 2 = 4', 'B.lean', 's')])
  assert.equal(clean.groups.length, 0)
  assert.equal(clean.restatements, 0)
  const dirty = duplicationCensus([S('a', '1 + 1 = 2', 'A.lean', 's'), S('b', '1 + 1 = 2', 'B.lean', 's')])
  assert.equal(dirty.restatements, 1)
  assert.notEqual(clean.receipt, dirty.receipt, 'a receipt that cannot tell a clean ledger from a duplicated one records nothing')
})

test('the groups are ordered stably, so two runs diff to nothing', () => {
  const mk = (): Sealed[] => [
    S('a', '1 + 1 = 2', 'A.lean', 's'), S('b', '1 + 1 = 2', 'B.lean', 's'),
    S('c', '2 + 2 = 4', 'C.lean', 's'), S('d', '2 + 2 = 4', 'D.lean', 's'),
  ]
  assert.deepEqual(duplicationCensus(mk()).groups.map((g) => g.canonical),
    duplicationCensus(mk().reverse()).groups.map((g) => g.canonical))
})

// THE DISCRIMINATOR THAT THE FIRST CENSUS LACKED. Two skills meeting on a form is not enough: a statement renamed
// across a file boundary presents identically from the skill field. The gloss is where meaning lives, so it decides.
test('two skills meeting on one form is a CROSS only when the glosses differ', () => {
  const crossed = duplicationCensus([
    S('boyles_law', '2 * 6 = 3 * 4', 'Chemistry.lean', 'chemistry', "Boyle's law keeps pressure times volume constant at fixed temperature"),
    S('moment_balance', '2 * 6 = 3 * 4', 'Statics.lean', 'statics', 'Moments balance about a pivot: a six newton force at two metres holds four newtons at three'),
  ])
  assert.equal(crossed.crosses, 1, 'one conserved product carrying two different pieces of physics is a cross')
  assert.ok(crossed.groups[0]!.glossOverlap < 0.5)

  const renamed = duplicationCensus([
    S('teleportation_costs_two_coins', '2 * 2 = 4', 'Quantum.lean', 'quantum', 'teleportation costs the two coins a Bell measurement needs'),
    S('teleportation_costs_the_two_coins', '2 * 2 = 4', 'Wave.lean', 'wave', 'teleportation costs the two coins a Bell measurement needs'),
  ])
  assert.equal(renamed.crosses, 0, 'the same sentence under two skills is a copy that crossed a file, not a cross')
  assert.equal(renamed.groups[0]!.cross, false)
  assert.ok(renamed.groups[0]!.glossOverlap >= 0.5)
})

test('glossOverlap is 1 for one sentence, 0 for disjoint ones, and symmetric', () => {
  assert.equal(glossOverlap('the same words here', 'the same words here'), 1)
  assert.equal(glossOverlap('pressure times volume', 'moments about pivots'), 0)
  const [a, b] = ['Boyle law pressure volume constant', 'moment balance pivot force metres']
  assert.equal(glossOverlap(a, b), glossOverlap(b, a))
  assert.equal(glossOverlap('', 'anything at all'), 0, 'an absent gloss shares nothing rather than everything')
})
