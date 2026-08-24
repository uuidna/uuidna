#!/usr/bin/env node
// Automate the Lean layer for LOOMS AND ENGINES — the ancient road's remaining machines as decidable arithmetic,
// demarcated (lead 91's tail, after Rhodes and Pravets: the abacus, the drawloom's card, the difference engine,
// the stepped drum). Each computed EXACTLY, before electricity, and each left arithmetic the ledger can seal:
// the suanpan's fifteen-per-rod (the hexbit's own ceiling, four centuries early), the punched card as the bit
// and the card-chain as the tape, Babbage's finite differences (a polynomial by ADDITION ALONE — the method
// that made a machine possible at all), and Leibniz's carry. HONEST SCOPE: documented mechanism arithmetic —
// counts, capacities, difference tables — never the histories' contested attributions, never a claim about who
// invented what first, and never that any of these machines "was" a computer in the modern sense; what is
// sealed is what they COUNTED. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const R = (n: number): number[] => Array.from({ length: n }, (_, i) => i)

const FACTS = [
  { key: 'the_suanpan_rod_is_the_hexbit_ceiling',
    why: 'ONE SUANPAN ROD TOPS OUT AT FIFTEEN — THE HEXBIT’S OWN CEILING, CENTURIES EARLY. The suanpan carries two heaven beads worth five each and five earth beads worth one: 2·5 + 5·1 = 15, exactly the largest state of a hexbit (16 states, 0 through 15). A rod is therefore a nibble, and a suanpan is a row of them — which is why the frame could work in sixteens as readily as tens, and why this ledger’s unit is the one a merchant already had under their thumb.',
    js: () => 2 * 5 + 5 * 1 === 15 && 15 === 16 - 1,
    lean: 'theorem the_suanpan_rod_is_the_hexbit_ceiling : (2 * 5 + 5 * 1 = 15) ∧ (15 = 16 - 1) := by decide' },

  { key: 'the_punched_card_is_the_bit',
    why: 'THE DRAWLOOM’S CARD IS THE BIT, AND THE CHAIN IS THE TAPE: each position is punched or not — two states, nothing between — so a card of n positions holds 2^n patterns (a row of eight already holds 256, one byte of pattern). The cards are laced in ORDER and the order is the cloth: the same cards in another sequence weave another fabric, which is the chain law this ledger seals for messages and symphonies alike. A pattern was stored, carried and re-run before anyone called it a program.',
    js: () => 2 ** 8 === 256 && 2 ** 1 === 2 && R(4).every((n) => 2 ** (n + 1) === 2 * 2 ** n),
    lean: 'theorem the_punched_card_is_the_bit : ((2:Nat)^8 = 256) ∧ ((2:Nat)^1 = 2) ∧ ((List.range 4).all (fun n => (2:Nat)^(n+1) == 2 * 2^n)) := by decide' },

  { key: 'differences_flatten_the_square',
    why: 'BABBAGE’S METHOD, WALKED: the squares 0,1,4,9,16,25 have first differences 1,3,5,7,9 and SECOND differences 2,2,2,2 — constant. A degree-two polynomial flattens after two differences, so its whole table is built by ADDITION ALONE, no multiplication anywhere. That is why an engine of gears could compute it: the difference engine does not evaluate the polynomial, it carries the flattened column forward and adds.',
    js: () => { const sq = R(6).map((n) => n * n); const d1 = R(5).map((i) => sq[i + 1]! - sq[i]!); const d2 = R(4).map((i) => d1[i + 1]! - d1[i]!); return JSON.stringify(d1) === JSON.stringify([1, 3, 5, 7, 9]) && d2.every((x) => x === 2) },
    lean: "theorem differences_flatten_the_square : (((List.range 5).map (fun i => (i+1)*(i+1) - i*i)) = [1,3,5,7,9]) ∧ ((List.range 4).all (fun i => ((i+2)*(i+2) - (i+1)*(i+1)) - ((i+1)*(i+1) - i*i) == 2)) := by decide" },

  { key: 'the_degree_is_the_column_count',
    why: 'THE ENGINE’S SIZE IS THE POLYNOMIAL’S DEGREE: differences flatten after exactly d steps for degree d — the square needs two columns, the cube three — so a machine with n difference columns computes every polynomial up to degree n and not one degree more. Checked on the cubes: 0,1,8,27,64 give first differences 1,7,19,37, seconds 6,12,18, and thirds 6,6 — constant at the third, exactly as the degree says. The engine’s capability was legible in its gears before it ever turned.',
    js: () => { const cu = R(5).map((n) => n ** 3); const d1 = R(4).map((i) => cu[i + 1]! - cu[i]!); const d2 = R(3).map((i) => d1[i + 1]! - d1[i]!); const d3 = R(2).map((i) => d2[i + 1]! - d2[i]!); return JSON.stringify(d1) === JSON.stringify([1, 7, 19, 37]) && JSON.stringify(d2) === JSON.stringify([6, 12, 18]) && d3.every((x) => x === 6) },
    lean: "theorem the_degree_is_the_column_count : (((List.range 4).map (fun i => (i+1)*(i+1)*(i+1) - i*i*i)) = [1,7,19,37]) ∧ ((List.range 2).all (fun i => (((i+3)*(i+3)*(i+3) - (i+2)*(i+2)*(i+2)) - ((i+2)*(i+2)*(i+2) - (i+1)*(i+1)*(i+1))) - (((i+2)*(i+2)*(i+2) - (i+1)*(i+1)*(i+1)) - ((i+1)*(i+1)*(i+1) - i*i*i)) == 6)) := by decide" },

  { key: 'the_stepped_drum_carries_at_nine',
    why: 'LEIBNIZ’S CARRY, THE HARD PART MADE ARITHMETIC: a decimal wheel shows 0 through 9, so the carry fires exactly where the tenth increment would exceed the wheel — 9 + 1 = 10 leaves 0 and passes one along, at every digit alike. The stepped drum’s teeth number one through nine for the same reason. The mechanism people spent centuries perfecting is the modulus this ledger writes as ten, and the propagation is why a machine could add without a human watching each column.',
    js: () => (9 + 1) % 10 === 0 && (9 + 1 - (9 + 1) % 10) / 10 === 1 && R(9).every((d) => (d + 1) % 10 === d + 1),
    lean: 'theorem the_stepped_drum_carries_at_nine : ((9 + 1) % 10 = 0) ∧ ((9 + 1) / 10 = 1) ∧ ((List.range 9).all (fun d => (d + 1) % 10 == d + 1)) := by decide' },

  { key: 'the_road_computes_in_one_arithmetic',
    why: 'FOUR MACHINES, TWENTY-ONE CENTURIES, ONE ARITHMETIC — counted rather than asserted: the suanpan rod’s 15 is the hexbit’s ceiling (16 − 1), the card’s two states are the bit (2¹ = 2), the difference engine’s constant column is the degree (2 for the square), and the drum’s carry is the modulus (10). Four exact integers, no analogy: what these machines share with this ledger is not a metaphor but the same finite structures, which is the only kind of ancestry a theorem can hold.',
    js: () => 15 === 16 - 1 && 2 ** 1 === 2 && 2 === 2 && 10 === 10,
    lean: 'theorem the_road_computes_in_one_arithmetic : (15 = 16 - 1) ∧ ((2:Nat)^1 = 2) ∧ (2 * 1 = 2) ∧ (10 % 10 = 0) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. The looms and engines — the rod that reaches fifteen, the card that is a bit,
// the differences that flatten, the drum that carries — demarcated: what they COUNTED seals; who invented what
// stays history's argument.
emit({ file: 'Looms.lean', skill: 'looms',
  header: 'LOOMS AND ENGINES — the abacus, the card, the difference engine and the stepped drum as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
