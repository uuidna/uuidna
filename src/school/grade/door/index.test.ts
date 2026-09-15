// school/grade/door — the door refuses each forbidden form and every way out of the proof block, and admits plain
// tactic proofs.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { doorRefusal, withoutComments, DOOR_MAX_LENGTH } from './index.js'

test('the door refuses each form the owner named, and says which', () => {
  const cases: [string, string][] = [
    ['#eval 1 + 1', '#eval'], ['rfl\n#exit', '#exit'], ['run_cmd pure ()', 'run_cmd'], ['run_tac pure ()', 'run_tac'],
    ['exact (IO.println 1)', 'IO'], ['exact unsafeCast 1', 'unsafe'], ['@[extern foo] rfl', '@[extern'],
    ['@[implemented_by f] rfl', '@[implemented_by'], ['exact axiom', 'axiom'], ['sorry', 'sorry'], ['admit', 'admit'],
    ['native_decide', 'native'], ['import Lean', 'import'], ['set_option maxHeartbeats 0 in decide', 'set_option'],
  ]
  for (const [proof, form] of cases) {
    const r = doorRefusal(proof)
    assert.ok(r, `refused: ${proof}`)
    assert.ok(r!.includes('`' + form + '`'), `${proof} → ${r}`)
  }
})

test('the door refuses every way out of the proof block', () => {
  const escapes = [
    'rfl)\nopen Nat in (rfl',                 // closes the outer parenthesis
    '-- (\nrfl)',                             // a parenthesis hidden in a line comment
    '/- ( -/ rfl)',                           // … in a block comment
    'exact \'(\'',                            // … in a character literal
    'rfl\nelab_rules : tactic | _ => pure ()', 'rfl\ntheorem t : True := trivial', 'rfl\ninstance : Inhabited Nat := ⟨0⟩',
    'rfl\nmacro "x" : tactic => `(tactic| rfl)', 'exact by_elab pure default', 'rfl\nend', 'rfl\nattribute [simp] Nat.add_zero',
    'exact «x»', 'rfl /- open', '(rfl', 'rfl\u0000', 'decide +native', '#check Nat', 'rfl\n@[simp] theorem x : True := trivial',
    'x'.repeat(DOOR_MAX_LENGTH + 1), '   \n  ',
  ]
  for (const e of escapes) assert.ok(doorRefusal(e), `refused: ${JSON.stringify(e)}`)
})

test('the door admits plain tactic proofs, primes, anonymous constructors and balanced comments', () => {
  const plain = [
    'intro n\nrfl', 'omega', 'simp [Nat.add_comm]', 'intro h\'\nexact h\'', '-- one (unbalanced in a comment is fine\nrfl',
    '/- nested /- (-/ -/ rfl', 'exact ⟨1, rfl⟩', 'constructor <;> decide', 'induction n with\n| zero => rfl\n| succ k ih => simp',
    'exact fun ⟨a, b⟩ => ⟨b, a⟩', 'open Nat in rfl', 'intro n\n  cases n <;> rfl', 'exact Nat.definitely_a_name',
  ]
  for (const p of plain) assert.equal(doorRefusal(p), null, p)
  assert.equal(withoutComments('a -- b\nc /- d /- e -/ f -/ g'), 'a \nc   g')
  assert.equal(withoutComments('a /- open'), null)
})
