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
    case '-': return a - b
    case '*': return a * b
    case '/': return a / b
    case '%': return a % b
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
