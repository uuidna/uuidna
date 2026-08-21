#!/usr/bin/env node
// Automate the Lean layer for THE TRINITY COVERING — how many threes it takes to span a space. PURE ARITHMETIC: every
// number is a power or a comparison between powers, nothing is measured from the world, and no ledger count appears,
// so nothing here drifts as the ledger grows.
//
// WHAT A TRINITY IS HERE. Three. n trinities span 3^n outcomes, exactly as n qubits span 2^n — the fold this project
// already walks is fifteen leaves as five trinities. A trinity is worth log2(3) = 1.5849625… qubits: MORE than one
// and LESS than two, which is why threes and bits never line up evenly and why the fold is 15 rather than 16.
//
// EVERY COVERING IS SEALED WITH ITS MINIMALITY, on the same line. A theorem saying only "81 trinities suffice" is
// satisfied by 82, by 900, by any larger number — it states a bound without stating that it is THE bound. So each
// fact here carries both halves: the power that covers, AND the one below it that does not. The `<` is the negation,
// discharged where it is claimed rather than asserted in the sentence above it.
//
// integrity, not truth. 81 trinities span the 128-bit content-address space and 81 = 9^2 is the size
// of the full Z/9 multiplication table. That coincidence is ARITHMETIC and is sealed as arithmetic: 128 / log2(3) =
// 80.76, so any space near 2^128 needs about 81 threes. No meaning is claimed for the resonance, and none is sealed.
import { emit } from './lean-gen.js'

const pow = (b: bigint, n: number) => b ** BigInt(n)
// the least n with 3^n >= target, found by walking — never by a logarithm, which would round
const least = (target: bigint): number => { let n = 0, v = 1n; while (v < target) { v *= 3n; n++ } return n }
const SPANS = [0, 1, 2, 3, 4, 5, 6].map((n) => Number(pow(3n, n)))
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const CASES: [string, bigint, string][] = [
  ['billion', 10n ** 9n, '10^9'],
  ['word', pow(2n, 64), '2^64'],
  ['address', pow(2n, 128), '2^128'],
]

const FACTS = [
  { key: 'trinities_span_powers',
    why: 'A TRINITY IS THREE, and n of them span 3^n — the same shape as n qubits spanning 2^n. Walked from none to six: [1, 3, 9, 27, 81, 243, 729]. Nine is two trinities and eighty-one is four.',
    js: () => JSON.stringify([0, 1, 2, 3, 4, 5, 6].map((n) => Number(pow(3n, n)))) === JSON.stringify(SPANS),
    lean: `theorem trinities_span_powers : (List.range 7).map (fun n => 3^n) = ${L(SPANS)} := by decide` },

  { key: 'trinity_exceeds_qubit',
    why: 'A TRINITY IS WORTH MORE THAN A QUBIT AND LESS THAN TWO: 2^1 < 3 < 2^2. Threes therefore never divide a binary space evenly, which is why a fold of fifteen leaves is five trinities and not a power of two.',
    js: () => 2 < 3 && 3 < 4,
    lean: 'theorem trinity_exceeds_qubit : ((2:Nat)^1 < 3) ∧ (3 < (2:Nat)^2) := by decide' },

  ...CASES.map(([name, target, shown]) => {
    const n = least(target)
    return {
      key: `trinities_cover_${name}`,
      why: `COVERING ${shown} TAKES ${n} TRINITIES, AND ${n - 1} DO NOT — both halves on one line, so this states THE bound and not merely a bound. 3^${n} reaches it; 3^${n - 1} falls short. A theorem that only said "${n} suffice" would be satisfied by any larger number and would seal nothing.`,
      js: () => pow(3n, n) >= target && pow(3n, n - 1) < target,
      lean: `theorem trinities_cover_${name} : ((3:Nat)^${n} ≥ ${shown}) ∧ ((3:Nat)^${n - 1} < ${shown}) := by decide`,
    }
  }),

  { key: 'eightyone_squares_nine',
    why: 'THE COVERING NUMBER FOR THE ADDRESS SPACE IS THE RING\'S OWN TABLE SIZE: 81 = 9^2 = 3^4, the full Z/9 multiplication table. SCOPE: this seals the arithmetic identity and nothing else. 128 divided by log2(3) is 80.76, so any space near 2^128 needs about eighty-one threes — the coincidence is decidable, its meaning is not, and no meaning is claimed here.',
    js: () => 81 === 9 * 9 && 81 === 3 ** 4,
    lean: 'theorem eightyone_squares_nine : (81 = 9^2) ∧ (81 = 3^4) ∧ (9 = 3^2) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Trinities.lean', skill: 'trinities', defs: '',
  header: 'THE TRINITY COVERING — how many threes span a space.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
