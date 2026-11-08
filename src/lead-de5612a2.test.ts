// lead-de5612a2 — THE FALSIFIER LEG FOR THE 42-STATE WALK'S UNIVERSALS. The kernel proved every theorem of
// lean/45bcb8b0.lean for ALL n; the falsifier evaluator's grammar cannot reach a ∀, so each statement is re-decided
// here over a range by an independent BigInt evaluation — the place a mutation that must fail would live. A theorem
// re-stated so that it stops being true over the first few hundred naturals goes red here; the universal itself
// stays the kernel's. Nothing here is a witness: the walk's arithmetic is this repository's own.
import { test } from 'node:test'
import assert from 'node:assert/strict'

const N = 300n
const range = (k: bigint): bigint[] => Array.from({ length: Number(k) }, (_, i) => BigInt(i))
const pow2 = (e: bigint): bigint => 1n << e
// the exact walk the lead names: x_n = 2^n mod 9, y_n = (1 + 2n) mod 7, both from 1
const x = (n: bigint): bigint => pow2(n) % 9n
const y = (n: bigint): bigint => (1n + 2n * n) % 7n

const STATEMENTS: Record<string, (n: bigint) => boolean> = {
  de5612a2_go_fuel: (n) => (n + 9n) % 9n === n % 9n && (n + 7n) % 7n === n % 7n,            // the worker's answer is the modulus's, whatever its fuel
  de5612a2_add_sub_self: (n) => (n + (n % 13n)) - (n % 13n) === n,
  de5612a2_go_congr: (n) => (n + 9n) % 9n === (n + 18n) % 9n,
  de5612a2_modCore_add_self: (n) => (n + 9n) % 9n === n % 9n,
  de5612a2_mod_add_self: (n) => range(12n).every((m) => (n + (m + 1n)) % (m + 1n) === n % (m + 1n)),
  de5612a2_add_mul_mod_self: (n) => range(12n).every((m) => range(6n).every((k) => (n + (m + 1n) * k) % (m + 1n) === n % (m + 1n))),
  de5612a2_mod_add_nine: (n) => (n + 9n) % 9n === n % 9n,
  de5612a2_mod_add_fourteen: (n) => (n + 14n) % 7n === n % 7n,
  de5612a2_mod_add_eighty_four: (n) => (n + 84n) % 7n === n % 7n,
  de5612a2_mul_two_mod_nine: (n) => (n * 2n) % 9n === ((n % 9n) * 2n) % 9n,
  de5612a2_mul_two_mod_nine_congr: (n) => range(40n).every((b) => n % 9n !== b % 9n || (n * 2n) % 9n === (b * 2n) % 9n),
  doubling_repeats_every_six: (n) => x(n + 6n) === x(n),
  doubling_repeats_every_forty_two: (n) => x(n + 42n) === x(n),
  stepping_repeats_every_seven: (n) => y(n + 7n) === y(n),
  stepping_repeats_every_forty_two: (n) => y(n + 42n) === y(n),
  pair_repeats_every_forty_two: (n) => x(n + 42n) === x(n) && y(n + 42n) === y(n),
}

test('every universal of lean/45bcb8b0.lean re-decides TRUE over the first 300 naturals, independently of the kernel', () => {
  for (const [key, holds] of Object.entries(STATEMENTS)) {
    const counter = range(N).find((n) => !holds(n))
    assert.equal(counter, undefined, `${key} fails at n = ${counter}`)
  }
  assert.equal(Object.keys(STATEMENTS).length, 16, 'sixteen universals, one per theorem the wing states for all n')
})

test('lead_de5612a2_verified: the finite clauses the lead names re-decide — first return at 42, all 42 states, both contact points', () => {
  const steps = range(42n)
  assert.equal(steps.filter((n) => n !== 0n && x(n) === 1n && y(n) === 1n).length, 0, 'no earlier return to (1,1) between steps 1 and 41')
  const visited = new Set(steps.map((n) => `${x(n)},${y(n)}`))
  for (const u of [1n, 2n, 4n, 8n, 7n, 5n]) for (const v of range(7n)) assert.ok(visited.has(`${u},${v}`), `(${u},${v}) is visited within one period`)
  assert.equal(x(21n), 8n); assert.equal(y(21n), 1n)
  assert.equal(x(42n), 1n); assert.equal(y(42n), 1n)
})

// CONTROL — the evaluation can fail: a period one short is caught at the first step it breaks
test('CONTROL — a wrong period is refuted at its first counterexample', () => {
  const wrong = range(N).find((n) => x(n + 41n) !== x(n))
  assert.notEqual(wrong, undefined, 'a 41-step claim must fail somewhere in the range')
})
