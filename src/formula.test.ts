import { formulaLean, roundTrip } from './formula.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { typeset, parseFormula, classify, congruenceOf, formulaTex, type Node } from './formula.js'
import { THEOREMS } from './theorems/index.js'

// THE INSTRUMENT THAT CAN FAIL. A typesetter is easy to check the easy way — look at six formulas, agree they
// read nicely, ship. That checks what I already believed. Every sealed statement is TRUE by `decide`, so
// evaluating MY OWN parse tree is a check the kernel referees: get the precedence of `mod` wrong, or make `^`
// left-associative, and statements come out FALSE. 2^3^2 = 512 holds only right-associatively (512, not 64).
function evaluate(n: Node): bigint | boolean {
  if (n.kind === 'num') return BigInt(n.text)
  if (n.kind === 'neg') return -(evaluate(n.of) as bigint)
  if (n.kind === 'not') return !(evaluate(n.of) as boolean)
  const L = evaluate(n.left)
  const R = evaluate(n.right)
  if (n.op === '∧') return (L as boolean) && (R as boolean)
  const a = L as bigint
  const b = R as bigint
  switch (n.op) {
    case '+': return a + b
    // LEAN'S Nat IS TOTAL, AND BIGINT IS NOT. The kernel is the referee here, so the arithmetic must be the
    // kernel's: Nat subtraction truncates at zero, and division and modulo by zero are DEFINED — n / 0 = 0 and
    // n % 0 = n (Nat.div, Nat.mod; Isabelle and Coq agree, and Suppes stated it in 1957). BigInt instead returns
    // a negative and THROWS on a zero divisor, which is how the sealed statement
    // `division_by_zero_is_the_abstract_zero_fold : (5 / 0 = 0) ∧ (2 * 64 = 128)` crashed this test rather than
    // disagreeing with it. Measured over the ledger: the two arithmetics agree on all 1,446 statements that
    // evaluate under both, so this decides nothing except the one the kernel had already decided.
    //
    // THIS IS Nat.div, NOT uuidna's abstract-0 fold. The two are named as one — in src/index.ts, src/mcp.ts,
    // src/sign.ts, src/treason.ts and in that theorem's own name — and the owner states the fold as the MIRROR,
    // x / 0 = 10 - x (5→5, 9→1, 3→7, 6→4), which is the involution R of the vortex table and the only reading
    // under which the repository's own phrase "folding to 1 through 0" has a referent. No code implements either
    // rule; the fold is a slogan. Lean's convention governs a Lean statement and is all this evaluator claims.
    case '-': return a < b ? 0n : a - b
    case '*': return a * b
    case '/': return b === 0n ? 0n : a / b
    case '%': return b === 0n ? a : a % b
    case '^': return a ** b
    case '=': return a === b
    case '≠': return a !== b
    case '≤': return a <= b
    case '≥': return a >= b
    case '<': return a < b
    case '>': return a > b
  }
}

test('every formula-shaped statement parses, and the parse agrees with the kernel that sealed it', () => {
  let formula = 0
  const refused: string[] = []
  const wrong: string[] = []
  for (const t of THEOREMS) {
    if (classify(t.statement) !== 'formula') continue
    formula++
    const p = parseFormula(t.statement)
    if (!p.ok) { refused.push(`${p.why} :: ${t.statement}`); continue }
    const v = evaluate(p.node)
    if (typeof v !== 'boolean') { wrong.push(`not a proposition :: ${t.statement}`); continue }
    if (!v) wrong.push(`parsed FALSE but the kernel sealed it TRUE :: ${t.statement}`)
  }
  assert.deepEqual(refused, [], 'a formula-shaped statement that will not parse must be fixed, never skipped')
  assert.deepEqual(wrong, [], 'a parse that disagrees with `decide` is a typesetting bug, not a rounding matter')
  assert.ok(formula > 1300, `the formula-shaped family must not silently shrink — found ${formula}`)
})

test('classify partitions the ledger — a statement is typeset exactly or named a program, never approximated', () => {
  let f = 0
  let p = 0
  for (const t of THEOREMS) (classify(t.statement) === 'formula' ? f++ : p++)
  assert.equal(f + p, THEOREMS.length)
  assert.ok(p > 0, 'Lean programs exist in the ledger and must NOT be dressed as equations')
  for (const t of THEOREMS) {
    const r = typeset(t.statement)
    if (r.classification === 'program') {
      assert.equal(r.mathml, null, 'a fold over a list has no formula form; the page sets it as code')
      assert.equal(r.tex, null)
    } else {
      assert.equal(r.refused, null, `formula refused: ${r.refused} :: ${t.statement}`)
      assert.ok(r.mathml && r.tex)
    }
  }
})

test('MathML is well-formed and self-describing — balanced tags and the namespace print needs', () => {
  for (const t of THEOREMS.slice(0, 400)) {
    const r = typeset(t.statement)
    if (!r.mathml) continue
    assert.match(r.mathml, /^<math xmlns="http:\/\/www\.w3\.org\/1998\/Math\/MathML" display="(block|inline)">/)
    assert.ok(r.mathml.endsWith('</math>'))
    const open = (r.mathml.match(/<m(row|n|o|frac|sup|space)\b/g) ?? []).length
    const close = (r.mathml.match(/<\/m(row|n|o|frac|sup)>/g) ?? []).length
    const selfClosing = (r.mathml.match(/<mspace[^>]*\/>/g) ?? []).length
    assert.equal(open - selfClosing, close, `unbalanced MathML :: ${t.statement}`)
  }
})

test('the standard forms: congruence, built-up fraction, right-associative exponent', () => {
  // the ledger's own theorem NAMES already use congruence form (`1·1 ≡ 1 (mod 9)`); the typesetting agrees.
  assert.equal(typeset('(1 * 7) % 9 = 7').tex, '1 \\cdot 7 \\equiv 7 \\pmod{9}')
  assert.equal(typeset('360 / 10 = 36').tex, '\\frac{360}{10} = 36')
  assert.equal(typeset('2^3^2 = 512').tex, '2^{3^{2}} = 512')
  // brackets appear only where precedence demands them — redundant ones are what make set mathematics look set.
  assert.equal(typeset('(7 - 3) - 1 = 3').tex, '7 - 3 - 1 = 3')
  const p = parseFormula('7 - (3 - 1) = 5')
  assert.ok(p.ok && formulaTex(p.node) === '7 - \\left(3 - 1\\right) = 5', 'the RIGHT operand of `-` keeps its brackets')
  // `mod` keeps a compound left operand bracketed even where precedence would drop it: `1·7 mod 9` is ambiguous.
  const m = parseFormula('(1 * 7) % 9 > 3')
  assert.ok(m.ok && formulaTex(m.node).includes('\\left(1 \\cdot 7\\right) \\bmod 9'))
})

test('an unmappable character is NAMED, never passed through as if it typeset', () => {
  const r = typeset('1 + λ = 2')
  assert.equal(r.classification, 'program', 'a character outside the sealed census is not a formula')
  const p = parseFormula('1 + λ = 2')
  assert.ok(!p.ok && p.why.includes('unmapped character'), 'the refusal must say which character')
  assert.ok(!parseFormula('(1 + 2').ok, 'an unclosed bracket is a refusal, not a guess')
  assert.ok(!parseFormula('1 = 2 = 3').ok, 'chained relations were never sealed; accepting them invents associativity')
})

test('congruenceOf reads the shape from either side, and only that shape', () => {
  const a = parseFormula('(1 * 7) % 9 = 7')
  assert.ok(a.ok && congruenceOf(a.node))
  const b = parseFormula('7 = (1 * 7) % 9')
  assert.ok(b.ok && congruenceOf(b.node))
  const c = parseFormula('1 + 2 = 3')
  assert.ok(c.ok && congruenceOf(c.node) === null)
})

// ── `\frac` CLAIMS EXACTNESS THAT Nat DIVISION NEVER ASSERTS. This layer rendered `85179 / 36 = 2366` as
// \frac{85179}{36} = 2366 — true in Lean, where `/` on Nat floors, and FALSE in print, where that quotient is
// 2366.08. Found by typesetting a theorem sealed minutes earlier: the seal was honest and its rendering was not,
// which is the worse direction, because a reader trusts set mathematics over the source printed beside it.
test('a truncating division is FLOORED and an exact one is not', () => {
  assert.equal(typeset('360 / 10 = 36').tex, '\\frac{360}{10} = 36')
  assert.equal(typeset('85179 / 36 = 2366').tex, '\\left\\lfloor \\frac{85179}{36} \\right\\rfloor = 2366')
  // an expression numerator is evaluated, not guessed: 7·6 = 42 divides by 2, so it stays a plain fraction
  assert.equal(typeset('(7 * 6) / 2 = 21').tex, '\\frac{7 \\cdot 6}{2} = 21')
  // and MathML gets real floor fences, not a bracket drawn with parentheses
  assert.match(typeset('4352 / 26 = 167').mathml ?? '', /&#x230A;[\s\S]*mfrac[\s\S]*&#x230B;/)
})

// AND THE FIRST VERSION OF THIS CHECK WAS WRONG, NOT THE RENDERER — the fourth instrument-wrong-code-right of
// the day, and a textbook regex over-capture. It re-derived exactness with /(\d+)\s*\/\s*(\d+)/ over the SOURCE,
// so `72 * 71 / 2` (which parses left-associatively as (72·71)/2 = 5112/2, exact) was read as 71/2 and reported
// as a misprint. A substring is not a subexpression. The check walks the PARSE TREE now, and evaluates operands
// with THIS FILE'S own evaluator rather than calling formula.ts's — two separately written evaluators that must
// agree, because a file is never its own witness.
function divisions(n: Node): { exact: boolean }[] {
  if (n.kind === 'num') return []
  if (n.kind === 'neg' || n.kind === 'not') return divisions(n.of)
  const here: { exact: boolean }[] = []
  if (n.op === '/') {
    const a = evaluate(n.left)
    const b = evaluate(n.right)
    if (typeof a === 'bigint' && typeof b === 'bigint' && b !== 0n) here.push({ exact: a % b === 0n })
  }
  return [...here, ...divisions(n.left), ...divisions(n.right)]
}

test('EVERY sealed division typesets to a form that is true as written', () => {
  const wrong: string[] = []
  for (const t of THEOREMS) {
    if (classify(t.statement) !== 'formula' || !t.statement.includes('/')) continue
    const p = parseFormula(t.statement)
    if (!p.ok) continue
    const r = typeset(t.statement)
    if (!r.tex) continue
    const divs = divisions(p.node)
    if (!divs.length) continue
    const inexact = divs.filter((d) => !d.exact).length
    const floors = (r.tex.match(/\\lfloor/g) ?? []).length
    // one floor per truncating division, and none for an exact one: a plain \frac asserts an exactness that
    // Nat division does not have, and a floor on an exact quotient understates a fact the kernel does have
    if (floors !== inexact) {
      wrong.push(`${t.key}: ${inexact} truncating division(s) but ${floors} floor(s) — ${t.statement.slice(0, 60)}`)
    }
  }
  assert.deepEqual(wrong, [], 'a rendering that misstates its own division is worse than an unrendered one')
})

// `%` BINDS WITH `*` AND `/`, as it does in Lean (infixl 70, above `+` at 65). Each case is TRUE only under Lean's
// reading and FALSE under the table that put `%` below `+`, so the old precedence cannot pass it.
test('`%` binds with `*` and `/` above `+`, as the kernel reads it', () => {
  for (const s of ['3 + 7 % 5 = 5', '27 % 9 + 1 = 1', '(27 % 9 + 1) * 10 ^ (27 / 9) = 1000']) {
    const p = parseFormula(s)
    assert.ok(p.ok, `${s} parses`)
    if (p.ok) assert.equal(evaluate(p.node), true, `${s} is TRUE as Lean reads it`)
  }
  // CONTROL: the old reading is a different number, and says so when written out with its own brackets
  const old = parseFormula('(3 + 7) % 5 = 5')
  assert.ok(old.ok && evaluate(old.node) === false, '(3 + 7) % 5 is 0, so the old grouping is not what Lean decided')
})

// LEAN AND LATEX PROVE EACH OTHER, which until now only one of them could do.
//
// formulaTex renders a parsed statement as mathematics and nothing returns, so
// the projection could not be wrong in any way its reader could see: drop a ¬,
// turn a ≤ into a <, and the page still typesets beautifully and says
// something else. latex.ts is explicit that its document check tests STRUCTURE
// and not meaning. Nothing compared the two readings of a theorem.
//
// formulaLean renders the SAME node back, and the pair then decides for each
// other — with the independent evaluator as the third party neither rendering
// controls.

test('every formula-shaped statement survives the round trip', async () => {
  const { theorems } = await import('./index.js')
  const sealed = theorems().filter((t) => classify(t.statement) === 'formula')

  assert.ok(sealed.length > 1000, `expected the formula-shaped ledger, found ${sealed.length}`)

  const broken = sealed
    .map((t) => ({ key: t.key, trip: roundTrip(t.statement) }))
    .filter((r) => !r.trip.agrees)
    .map((r) => `${r.key}: ${r.trip.why ?? 'the returned node differs'}`)

  assert.deepEqual(broken, [], 'these parse to a node that does not render back to themselves')
})

test('and the returned form decides as the sealed one does', async () => {
  // The leg that matters. A round trip agreeing with itself only proves the
  // parser is self-consistent; this asks a DIFFERENT engine whether the two
  // readings are the same proposition.
  const { theorems } = await import('./index.js')
  const { holds } = await import('./involution/index.js')

  const disagreed: string[] = []
  let decided = 0

  for (const t of theorems()) {
    if (classify(t.statement) !== 'formula') continue
    const trip = roundTrip(t.statement)
    if (!trip.agrees || !trip.back) continue

    const sealed = holds(t.statement)
    const returned = holds(trip.back)
    if (sealed === null || returned === null) continue

    decided++
    if (sealed !== returned) disagreed.push(`${t.key}: sealed ${sealed}, returned ${returned}`)
  }

  assert.ok(decided > 1000, `the evaluator decided only ${decided}`)
  assert.deepEqual(disagreed, [], 'the two readings of these are not the same proposition')
})

test('the pair can fail — a rendering that lies is caught', async () => {
  // A hundred per cent that cannot fail is furniture. These are the exact
  // corruptions a projection suffers, applied to the node rather than the
  // renderer so the check is exercised without editing it: a dropped
  // negation, and a comparison loosened by one notch.
  const lying: Node = { kind: 'bin', left: { kind: 'num', text: '2' }, op: '<', right: { kind: 'num', text: '2' } }
  const honest: Node = { ...lying, op: '≤' }

  assert.notEqual(formulaLean(lying), formulaLean(honest))
  assert.notEqual(formulaTex(lying), formulaTex(honest))

  const dropped: Node = { kind: 'num', text: '0' }
  const negated: Node = { kind: 'not', of: dropped }
  assert.notEqual(formulaLean(negated), formulaLean(dropped))
})
