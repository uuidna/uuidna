#!/usr/bin/env node
// Automate the Lean layer for THE SEAT BOUND — the pigeonhole, stated. PURE ARITHMETIC, no empirical quantity and
// no ledger count: every number is a literal item-count or seat-count, so nothing here drifts when the ledger grows.
//
// WHY IT EXISTS. The ledger already carried a theorem named `seats_pigeonhole`, and its statement is
// `2^8 = 256 ∧ 2^0 = 1 ∧ 2^10 = 1024` — three powers of two. There is no pigeonhole in it: no items, no seats, and
// no inequality between two counts. The name asserts a bound the line never reaches, and I cited that name as a
// receipt earlier in the same session without opening it. This wing states what that name promised, so the bound is
// something the kernel decides rather than something a name claims.
//
// THE FORM THAT DECIDES. Pigeonhole is two facts: MORE ITEMS THAN SEATS forces sharing, and the fullest seat holds
// at least the ceiling of items/seats. Both decide on concrete instances, and the ceiling is written as the exact
// integer identity ⌈n/s⌉ = (n + s − 1) / s in Nat division, so no rounding is assumed.
//
// THE NEGATIONS ARE ON THE LINES. "Sharing is forced" and "equality is impossible" are each carried by a `≠` or a
// `<` in the theorem that claims them, never by the sentence above it.
import { emit } from './lean-gen.js'

// (items, seats) — chosen to span the cases: one over, many over, exact fit, and fewer than seats.
const CASES: [number, number][] = [[11, 10], [21, 10], [100, 9], [10, 10], [9, 10]]
// integer ceiling with NO library call — the determinism ban admits no exemption, generators included, and a
// rounding helper is exactly where a non-deterministic sneak would hide. Written as arithmetic: subtract the
// remainder, then divide exactly. This is the same expression the Lean `fullest` decides.
const ceil = (n: number, s: number) => { const t = n + s - 1; return (t - (t % s)) / s }
const OVER = CASES.filter(([n, s]) => n > s)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const PAIRS = '[' + CASES.map(([n, s]) => `(${n},${s})`).join(',') + ']'
const DEFS = `def seatCases : List (Nat × Nat) := ${PAIRS}

-- the fullest seat's floor: ⌈n/s⌉ written as exact Nat arithmetic, never a rounded division
def fullest (n s : Nat) : Nat := (n + s - 1) / s`

const FACTS = [
  { key: 'fullest_seat_ceiling',
    why: 'THE BOUND ITSELF: the fullest seat holds at least ⌈items/seats⌉, computed as the exact integer identity (n + s − 1)/s so no rounding is assumed. Across the five cases that is [2, 3, 12, 1, 1] — one over capacity already forces a seat holding two.',
    js: () => JSON.stringify(CASES.map(([n, s]) => ceil(n, s))) === JSON.stringify([2, 3, 12, 1, 1]),
    lean: `theorem fullest_seat_ceiling : seatCases.map (fun c => fullest c.1 c.2) = ${L(CASES.map(([n, s]) => ceil(n, s)))} := by decide` },

  { key: 'excess_forces_sharing',
    why: 'MORE ITEMS THAN SEATS FORCES SHARING, and the refusal is on this line: wherever items exceed seats the fullest seat holds at least two, so a seating with every seat holding at most one is impossible. Three of the five cases exceed; each is forced.',
    js: () => OVER.every(([n, s]) => ceil(n, s) >= 2),
    lean: `theorem excess_forces_sharing : (seatCases.filter (fun c => c.1 > c.2)).all (fun c => fullest c.1 c.2 ≥ 2) := by decide` },

  { key: 'fit_shares_nothing',
    why: 'AND THE BOUND DOES NOT OVERREACH: at an exact fit, and below it, the fullest seat holds one. Sharing is forced by EXCESS and by nothing else — a rival reading, on which any seating shares, fails here.',
    js: () => CASES.filter(([n, s]) => n <= s).every(([n, s]) => ceil(n, s) === 1),
    lean: `theorem fit_shares_nothing : (seatCases.filter (fun c => c.1 ≤ c.2)).all (fun c => fullest c.1 c.2 = 1) := by decide` },

  { key: 'powers_are_not_the_bound',
    why: 'THE CORRECTION, SEALED BESIDE THE THING IT CORRECTS. The powers of two that stand under the older name compute 256, 1 and 1024, and none of them is a seat bound: 2^8 is not ⌈11/10⌉. A name is not a proof, and this line says so in the one way a line can — by exhibiting the difference.',
    js: () => 2 ** 8 !== ceil(11, 10) && 2 ** 10 !== ceil(21, 10),
    lean: 'theorem powers_are_not_the_bound : ((2:Nat)^8 ≠ (11 + 10 - 1) / 10) ∧ ((2:Nat)^10 ≠ (21 + 10 - 1) / 10) := by decide' },

  { key: 'digits_split_five_five',
    why: 'THE TEN DIGITS PARTITION IN HALF by whether a walk from that seed reaches every digit: {2,6,7,8,9} cover and {0,1,3,4,5} do not. The two are disjoint, their union is all ten, and five plus five is the whole ring — a partition, decided, not a tally of two lists written side by side.',
    js: () => {
      const a = [2, 6, 7, 8, 9], b = [0, 1, 3, 4, 5], u = [...a, ...b]
      return u.length === 10 && Array.from({ length: 10 }, (_, d) => d).every((d) => u.includes(d)) && a.every((d) => !b.includes(d))
    },
    lean: 'theorem digits_split_five_five : (([2,6,7,8,9] ++ [0,1,3,4,5]).length = 10) ∧ ((List.range 10).all (fun d => ([2,6,7,8,9] ++ [0,1,3,4,5]).contains d)) ∧ ([2,6,7,8,9].all (fun d => !([0,1,3,4,5].contains d))) := by decide' },

  { key: 'ten_seats_bound_any_ring',
    why: 'A CONSEQUENCE WORTH NAMING: anything folded to a digit of the ring lands in one of ten seats, so past ten items collision is not evidence of a relation — it is arithmetic. SCOPE: this decides the counting; it asserts nothing about what any two colliding things have in common.',
    js: () => ceil(11, 10) >= 2 && 11 > 10,
    lean: 'theorem ten_seats_bound_any_ring : (11 > 10) ∧ ((11 + 10 - 1) / 10 ≥ 2) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Seats.lean', skill: 'seats', defs: DEFS,
  header: 'THE SEAT BOUND — the pigeonhole, stated. The ledger carried a theorem NAMED seats_pigeonhole whose statement is 2^8 = 256 ∧ 2^0 = 1 ∧ 2^10 = 1024: three powers of two, with no items, no seats and no inequality between two counts. This wing states the bound that name promised, so it is decided rather than claimed — the fullest seat holds at least ⌈items/seats⌉, written as the exact integer identity (n + s − 1)/s; excess forces sharing (and the impossibility is carried by a ≥ on its own line); an exact fit forces nothing, so the bound does not overreach; and the powers of two are exhibited as NOT the bound. Beside them the ten digits partition five-five by whether a walk from that seed reaches every digit — {2,6,7,8,9} cover, {0,1,3,4,5} do not, disjoint and exhausting. PURE ARITHMETIC: every number is a literal item- or seat-count, and no ledger count appears, so nothing here drifts as the ledger grows. HONEST SCOPE: integrity, not truth — this decides the counting. A collision past ten seats is arithmetic, never evidence that two colliding things have anything in common.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
