#!/usr/bin/env node
// Automate the Lean layer for NOTATION — which of this ledger's harmonic facts are about NUMBERS and which are about
// how numbers are WRITTEN. PURE ARITHMETIC: every value is a literal, a base, or a remainder; nothing is measured
// from the world and no ledger count appears.
//
// WHY THIS WING EXISTS. The digital root is the ledger's harmonic marker — digital_root seals 432 % 9 = 0, and the
// grid, the fold and the receipts all read it. It works for exactly one reason: 10 ≡ 1 (mod 9), so every power of
// ten reduces to one and a digit SUM carries the same remainder as the number itself. That is a fact about DECIMAL
// NOTATION. In base eight the same construction gives mod 7; in hexadecimal, mod 15. The ring is not chosen by the
// numbers — it is chosen by the base, and this wing decides that rather than leaving it implicit.
//
// THE SHARPER CASE. k432 fuses 6 × 72 = 432 with 16 × 27 = 432 through the "involution" rev(72) = 27. Digit reversal
// is not an arithmetic operation: it acts on the STRING of digits. It holds at 72 and nowhere near it — rev(75) = 57
// gives 16 × 57 = 912, rev(78) = 87 gives 1392. A relation true of one spelling was sealed and then used to constrain
// growth, and the wing count has now left it. That is sealed here as what it is.
//
// HONEST SCOPE: integrity, not truth. NOTHING here makes an existing theorem false. 432 % 9 = 0 is exact and stays
// exact. What is decided is that its SIGNIFICANCE is base-relative — the arithmetic survives, the harmonic reading
// is notational, and the two were not previously distinguished in the ledger.
import { emit } from './lean-gen.js'

const rev = (n: number): number => Number(String(n).split('').reverse().join(''))
const BASES = [8, 10, 16]
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'ten_reduces_to_one',
    why: 'EVERY POWER OF TEN IS ONE, MOD NINE: 10, 100, 1000, 10000 all leave remainder 1. That is the entire mechanism of the digital root — a digit in any column contributes its own value and nothing more, so the digit sum carries the number\'s remainder.',
    js: () => [10, 100, 1000, 10000].every((p) => p % 9 === 1),
    lean: 'theorem ten_reduces_to_one : [10,100,1000,10000].all (fun p => p % 9 == 1) := by decide' },

  { key: 'base_fixes_modulus',
    why: 'THE MODULUS IS CHOSEN BY THE BASE, NOT BY THE NUMBERS: b ≡ 1 (mod b−1) for every base, so base eight gives mod 7, base ten mod 9, hexadecimal mod 15. Three bases, three different rings, one construction.',
    js: () => BASES.every((b) => b % (b - 1) === 1),
    lean: `theorem base_fixes_modulus : ${L(BASES)}.all (fun b => b % (b - 1) == 1) := by decide` },

  { key: 'bases_disagree_on_root',
    why: 'THE SAME NUMBER HAS DIFFERENT ROOTS IN DIFFERENT BASES, and the disagreement is on this line: 432 leaves 0 mod 9 (the sealed harmonic marker) but 5 mod 7, the base-eight invariant. Nine divides 432; seven does not. A number is not harmonic — a number WRITTEN IN A BASE is.',
    // the inequality is tested FIRST — TS narrows `nine` to 0 once `nine === 0` passes, then flags the compare as
    // no-overlap. Conjunction is commutative, so the reordered mirror computes exactly the Lean statement's truth.
    js: () => { const nine: number = 432 % 9, seven: number = 432 % 7; return nine !== seven && nine === 0 && seven === 5 },
    lean: 'theorem bases_disagree_on_root : (432 % 9 = 0) ∧ (432 % 7 = 5) ∧ (432 % 9 ≠ 432 % 7) := by decide' },

  { key: 'reversal_escapes_arithmetic',
    why: 'DIGIT REVERSAL ACTS ON THE SPELLING, NOT THE NUMBER. k432 fuses its two factorisations through rev(72) = 27, and 16 × 27 = 432 holds. It holds for that spelling alone: rev(75) = 57 gives 912 and rev(78) = 87 gives 1392, neither of them 432. The line proves the identity AND its two failures, so what was read as an involution over wings is shown to be a property of one written number.',
    js: () => rev(72) === 27 && 16 * 27 === 432 && rev(75) === 57 && 16 * 57 !== 432 && rev(78) === 87 && 16 * 87 !== 432,
    lean: 'theorem reversal_escapes_arithmetic : (16 * 27 = 432) ∧ (16 * 57 ≠ 432) ∧ (16 * 87 ≠ 432) := by decide' },

  { key: 'root_survives_the_reading',
    why: 'THE ARITHMETIC IS UNTOUCHED. Every digital-root fact the ledger seals stays exactly true — 432 % 9 = 0, and the nine units sum to 45 whose digits sum to 9. SCOPE: what this wing decides is that such facts are BASE-RELATIVE, never that they are wrong. The remainder is exact; the harmony read into it is notational, and the two are different claims.',
    js: () => { const a: number = 432 % 9; return a === 0 && 45 % 9 === 0 && 4 + 5 === 9 },
    lean: 'theorem root_survives_the_reading : (432 % 9 = 0) ∧ (45 % 9 = 0) ∧ (4 + 5 = 9) := by decide' },

  { key: 'nine_divides_by_construction',
    why: 'AND WHY MULTIPLES OF NINE ARE NEVER EVIDENCE: every multiple of nine has digital root nine by construction, so finding one carries no information. Walked over the first eight multiples — 9, 18, 27, …, 72 — all leave remainder zero, every time, because that is what a multiple is.',
    js: () => [9, 18, 27, 36, 45, 54, 63, 72].every((n) => n % 9 === 0),
    lean: 'theorem nine_divides_by_construction : ((List.range\' 1 8).map (fun k => 9 * k)).all (fun n => n % 9 == 0) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Notation.lean', skill: 'notation', defs: '',
  header: 'NOTATION — which harmonic facts are about NUMBERS and which are about how numbers are WRITTEN. The digital root is this ledger\'s harmonic marker, and it works for exactly one reason: 10 ≡ 1 (mod 9), so every power of ten reduces to one and a digit SUM carries the number\'s own remainder. That is a fact about DECIMAL NOTATION. The modulus is fixed by the base — b ≡ 1 (mod b−1) — so base eight gives mod 7 and hexadecimal mod 15; the ring is chosen by the base, not by the numbers. The same 432 leaves 0 mod 9 and 5 mod 7, and the two disagree on this ledger\'s own sealed width. Sharper still: k432 fuses 6 × 72 with 16 × 27 through rev(72) = 27, and digit reversal acts on the STRING of digits, not the number — rev(75) = 57 gives 912 and rev(78) = 87 gives 1392, so the fusion holds for one spelling and no other. And a multiple of nine has digital root nine BY CONSTRUCTION, so finding one is never evidence. HONEST SCOPE: integrity, not truth. Nothing here makes an existing theorem false — 432 % 9 = 0 is exact and stays exact. What is decided is that its SIGNIFICANCE is base-relative: the remainder survives, the harmony read into it is notational, and the ledger had not previously distinguished the two.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
