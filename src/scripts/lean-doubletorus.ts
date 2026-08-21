#!/usr/bin/env node
// Automate the Lean layer for THE DOUBLE TORUS PRESENTATION — the finite description of an unbounded thing. PURE
// ARITHMETIC: every number is a genus, a count of generators, or a power of two; nothing is measured from the world
// and no ledger count appears, so nothing here drifts.
//
// WHAT IS ALREADY SEALED, AND WHAT IS NOT. two_coins_is_double_torus (2*2 − 2 = 2) and containment_is_genus_one
// ((2 − 2·1 = 0) ∧ (2 − 2·2 = −2)) already carry the Euler characteristic, and double_torus_boards_are_the_address
// fuses it to the 128-bit address. What no wing carries is the PRESENTATION: a genus-2 surface is described by 2g = 4
// generators and ONE relation — five symbols — while the words over those generators grow without bound. That gap is
// what this wing closes.
//
// THE LIMIT, STATED BEFORE THE FACTS. `by decide` cannot prove a group INFINITE; it settles finitely many
// cases. So infinity is NOT sealed here. What is sealed is that word counts OUTGROW the presentation and keep
// outgrowing it at every length tested, and that the description itself never grows — 5 symbols, at every n. The
// unboundedness is the reading; the growth is the fact.
import { emit } from './lean-gen.js'

const GENUS = 2
const GENERATORS = 2 * GENUS          // a1, b1, a2, b2
const RELATION = 1                    // [a1,b1][a2,b2] = 1
const ALPHABET = GENERATORS * 2       // each generator and its inverse — the per-step choice
const WORDS = [0, 1, 2, 3, 4, 5].map((n) => ALPHABET ** n)
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'chi_measures_genus',
    why: 'THE EULER CHARACTERISTIC IS THE GENUS, READ OFF: χ = 2 − 2g gives 0 at genus one (the plain torus, a closed pipe) and −2 at genus two, so −χ = 2 — the two coins. Both genera on one line, so the number is measured against its neighbour rather than stated alone.',
    js: () => 2 - 2 * 1 === 0 && 2 - 2 * 2 === -2,
    lean: 'theorem chi_measures_genus : (((2:Int) - 2 * 1 = 0) ∧ ((2:Int) - 2 * 2 = -2)) ∧ (-((2:Int) - 2 * 2) = 2) := by decide' },

  { key: 'handles_give_generators',
    why: 'EACH HANDLE CARRIES TWO GENERATORS, so a double torus has 2 × 2 = 4 — a₁, b₁ around the first handle and a₂, b₂ around the second. Four, and not two: the handle count and the generator count are different quantities, which the line proves rather than lets slide.',
    js: () => { const gens: number = 2 * GENUS, handles: number = GENUS; return gens === 4 && gens !== handles },
    lean: 'theorem handles_give_generators : (2 * 2 = 4) ∧ (4 ≠ 2) := by decide' },

  { key: 'presentation_counts_five',
    why: 'THE WHOLE DESCRIPTION IS FIVE SYMBOLS: four generators and one relation, [a₁,b₁][a₂,b₂] = 1. One relation— a free group on four generators is a different object, and the single constraint is exactly what closes the surface.',
    js: () => { const rel: number = RELATION, none: number = 0; return GENERATORS + RELATION === 5 && rel !== none },
    lean: 'theorem presentation_counts_five : (4 + 1 = 5) ∧ (1 ≠ 0) := by decide' },

  { key: 'step_costs_three',
    why: 'A STEP COSTS THREE QUBITS: two to name which of the four generators (2² = 4) and one for its direction (a or a⁻¹), so the per-step alphabet is 4 × 2 = 8 = 2³. The qubit cost of a step is the exponent, and the exponent is three.',
    js: () => 2 ** 2 === GENERATORS && GENERATORS * 2 === ALPHABET && 2 ** 3 === ALPHABET,
    lean: 'theorem step_costs_three : ((2:Nat)^2 = 4) ∧ (4 * 2 = 8) ∧ ((2:Nat)^3 = 8) := by decide' },

  { key: 'words_outgrow_presentation',
    why: 'WORDS GROW, THE DESCRIPTION DOES NOT. Words of length n over the eight letters number 8ⁿ — [1, 8, 64, 512, 4096, 32768] from length zero to five — and every length past the first already exceeds the five symbols that describe them all. The gap widens at every step and the presentation never moves.',
    js: () => JSON.stringify(WORDS) === JSON.stringify([1, 8, 64, 512, 4096, 32768]) && WORDS.slice(1).every((w) => w > 5),
    lean: `theorem words_outgrow_presentation : ((List.range 6).map (fun n => 8^n) = ${L(WORDS)}) ∧ (((List.range 6).map (fun n => 8^n)).drop 1).all (fun w => w > 5) := by decide` },

  { key: 'growth_is_not_bounded_here',
    why: 'AND THE LIMIT OF THIS METHOD, ON ITS OWN LINE: each length multiplies the count by eight — 8ⁿ⁺¹ = 8 · 8ⁿ at every tested length — so the counts do not settle. SCOPE: `by decide` settles finitely many cases and cannot prove a group INFINITE. What is decided is the GROWTH; that it never stops is the reading, and it is not sealed here.',
    js: () => [0, 1, 2, 3, 4].every((n) => ALPHABET ** (n + 1) === ALPHABET * ALPHABET ** n),
    lean: 'theorem growth_is_not_bounded_here : (List.range 5).all (fun n => 8^(n+1) == 8 * 8^n) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'DoubleTorus.lean', skill: 'double-torus', defs: '',
  header: 'THE DOUBLE TORUS PRESENTATION — the finite description of an unbounded thing.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
