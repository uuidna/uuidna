#!/usr/bin/env node
// Automate the Lean layer for DECIPHERMENT — the refutation every letter-for-letter reading of an unread script meets,
// involuted into the statement whose truth IS the refutation (the captain: "involute refute"). A simple substitution
// relabels the alphabet, and a relabeling cannot change how often equal bigrams recur, so a claimed plaintext carries
// the source's statistics exactly. Decided here for every relabeling of a three-letter alphabet on one twelve-letter
// text, with the control beside it: the same letters in another order DO change the count, so the invariance is a
// fact about substitution and not a count that nothing moves. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const TEXT = [0, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 2]
const SORTED = [...TEXT].sort((a, b) => a - b)
const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]

/** Σ over adjacent pairs of how often that pair occurs — Σ c², the collision count plus the pair total */
const sumSq = (t: readonly number[]): number => {
  const bs = t.slice(1).map((c, i) => `${t[i]},${c}`)
  return bs.reduce((a, b) => a + bs.filter((x) => x === b).length, 0)
}
const relabel = (t: readonly number[], p: readonly number[]): number[] => t.map((c) => p[c]!)
const count = (t: readonly number[], v: number): number => t.filter((c) => c === v).length

const L = (xs: readonly number[]): string => `[${xs.join(',')}]`
const SQ = (w: string): string => `((${w}.zip ${w}.tail).map (fun b => (${w}.zip ${w}.tail).count b)).foldl (· + ·) 0`
const T = `(${L(TEXT)} : List Nat)`, S = `(${L(SORTED)} : List Nat)`
// each permutation is a triple and the relabel a match on the letter: indexing a list with `.getD` drags propext
// (axiom-report's AXIOM_INADMISSIBLE), a structural match drags nothing
const TRIPLE = (p: readonly number[]): string => `(${p.join(',')})`
const RELABELED = `(${L(TEXT)}.map (fun c => match c with | 0 => p.1 | 1 => p.2.1 | _ => p.2.2))`

const FACTS = [
  { key: 'relabel3_preserves_bigram_collisions',
    why: `A SUBSTITUTION CANNOT MOVE THE STATISTICS. Every relabeling of a three-letter alphabet, all six, leaves the sum over adjacent letter pairs of how often each recurs (Σ c² = ${sumSq(TEXT)} here) exactly where it was on this twelve-letter text, because a bijection sends equal pairs to equal pairs and unequal to unequal. That is why a letter-for-letter "decipherment" of the Voynich manuscript cannot rescue its low letter entropy: the claimed plaintext inherits it, and must be compared to real text in the claimed language. Decided for this text and alphabet; the general reason is the bijection.`,
    js: () => PERMS.every((p) => sumSq(relabel(TEXT, p)) === sumSq(TEXT)),
    lean: `theorem relabel3_preserves_bigram_collisions : ∀ p ∈ ([${PERMS.map(TRIPLE).join(',')}] : List (Nat × Nat × Nat)), ${SQ(RELABELED)} = ${SQ(T)} := by decide` },

  { key: 'letter_order_moves_bigram_collisions',
    why: `THE CONTROL FIRES. The same twelve letters, the same four of each, sorted instead of mixed, give Σ c² = ${sumSq(SORTED)} where the mixed text gives ${sumSq(TEXT)}: letter order does move the count, so the invariance beside this is a fact about substitution, not a count nothing can change. It is the letter-shuffle control of the decipherment bench, decided.`,
    js: () => [0, 1, 2].every((v) => count(SORTED, v) === count(TEXT, v)) && sumSq(SORTED) !== sumSq(TEXT),
    lean: `theorem letter_order_moves_bigram_collisions : ${S}.count 0 = ${T}.count 0 ∧ ${S}.count 1 = ${T}.count 1 ∧ ${S}.count 2 = ${T}.count 2 ∧ ${SQ(S)} = ${sumSq(SORTED)} ∧ ${SQ(T)} = ${sumSq(TEXT)} := by decide` },
]

emit({ file: 'Decipher.lean', skill: 'decipher',
  header: 'DECIPHER — the substitution invariants every letter-for-letter reading meets, with the control that can fail.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
