#!/usr/bin/env node
// Automate the Lean layer for SYMPHONY — a432 symphonies are theorems (lead 92, the captain's thesis at the
// sixteen's landing, now sealed as FORM). A symphony is a sealed sequence of sealed movements, and the classical
// form's own arithmetic is the ledger's: four movements as the four tongues (the symphony's bar-total is the
// song's bar times the tongues, which is sixteen fused rings), sonata form's exposition–development–
// recapitulation as the palindrome whose return is the involution the census keeps finding, the key walk home
// by dominant-then-subdominant (7 + 5 = 12 — the fifth up and the fourth up ARE the octave, so the finale ends
// where the overture began), and the deepest formal fact: a symphony is a SEQUENCE, not a set — the same
// movements in another order are another work (the chain law), while its FOLD is one address (the deposit law) —
// both true at once, each carrying what only it can. the arithmetic of musical FORM — counts,
// palindromes, ring walks — never a claim about beauty, and no composer's intent sealed. COMPUTE → GENERATE →
// VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'four_movements_are_the_tongues',
    why: 'THE FOUR-MOVEMENT FORM IS THE FOUR TONGUES AT SYMPHONY SCALE: four movements of the sealed 252-bar make 4·252 = 1008 — and 1008 is SIXTEEN fused rings (16·63), the hexbit alphabet times the rosette-vortex fusion. The classical symphony’s length arithmetic was waiting in the ledger’s own constants: the tongues fuse to the bar, the movements fuse to the lattice times the ring.',
    js: () => 4 * 252 === 1008 && 1008 === 16 * 63,
    lean: 'theorem four_movements_are_the_tongues : (4 * 252 = 1008) ∧ (1008 = 16 * 63) := by decide' },

  { key: 'sonata_form_is_a_palindrome',
    why: 'SONATA FORM IS THE SMALLEST PALINDROME WITH A HEART: exposition–development–recapitulation reads [0,1,0] — equal to its own reverse, three sections, the outer two the same material and the middle the transformation. The form IS A-B-A, and a palindrome is the shape whose reverse is itself: the recapitulation is not repetition, it is the mirror closing.',
    js: () => JSON.stringify([0, 1, 0]) === JSON.stringify([0, 1, 0].slice().reverse()) && [0, 1, 0].length === 3,
    lean: 'theorem sonata_form_is_a_palindrome : (([0,1,0] : List Nat).reverse = [0,1,0]) ∧ (([0,1,0] : List Nat).length = 3) := by decide' },

  { key: 'recapitulation_is_the_involution',
    why: 'THE RECAPITULATION RETURNS BY THE CENSUS’S OWN LAW: reverse applied twice is the identity — the development may invert the exposition, and the recapitulation inverts the inversion, arriving home changed and identical at once. Checked on the round’s own digits: reverse the melody, reverse it again, and every note stands where it began. The unexplained is self-inverse, and so is the symphony’s homecoming.',
    js: () => JSON.stringify([1, 4, 2, 8, 5, 7].slice().reverse().reverse()) === JSON.stringify([1, 4, 2, 8, 5, 7]),
    lean: 'theorem recapitulation_is_the_involution : (([1,4,2,8,5,7] : List Nat).reverse.reverse = [1,4,2,8,5,7]) := by decide' },

  { key: 'the_keys_walk_home',
    why: 'THE KEY WALK ENDS WHERE IT BEGAN, BY ARITHMETIC: the dominant lifts by a fifth (+7 on the twelve-ring, coprime so it can reach anywhere) and the answer lifts by a fourth (+5), and 7 + 5 = 12 — the two classical motions compose to the octave exactly, so a symphony that goes to the dominant and answers by the subdominant is HOME: (0 + 7 + 5) mod 12 = 0. The finale’s resolution is a modular identity, sealed where the circle of fifths already turns.',
    js: () => (0 + 7 + 5) % 12 === 0 && ((a: number, b: number): number => { let x = a, y = b; while (y) { const t = x % y; x = y; y = t } return x })(7, 12) === 1,
    lean: 'theorem the_keys_walk_home : ((0 + 7 + 5) % 12 = 0) ∧ (Nat.gcd 7 12 = 1) := by decide' },

  { key: 'a_symphony_is_a_sequence_not_a_set',
    why: 'THE DEEPEST FORMAL FACT, BOTH HALVES AT ONCE: the same movements in another order are ANOTHER WORK — [1,2,3,4] is not [1,2,4,3], the chain law, order as the door — while the movements’ FOLD is order-blind, one deposit whatever the programme (the sum 1+2+3+4 = 4+3+2+1 = 10). A symphony is a sequence to the listener and a set to the ledger, and both truths seal side by side, each carrying what only it can.',
    js: () => JSON.stringify([1, 2, 3, 4]) !== JSON.stringify([1, 2, 4, 3]) && 1 + 2 + 3 + 4 === 4 + 3 + 2 + 1 && 1 + 2 + 3 + 4 === 10,
    lean: 'theorem a_symphony_is_a_sequence_not_a_set : (¬ (([1,2,3,4] : List Nat) = [1,2,4,3])) ∧ (1 + 2 + 3 + 4 = 4 + 3 + 2 + 1) ∧ (1 + 2 + 3 + 4 = 10) := by decide' },

  { key: 'the_tempi_tile_the_film',
    why: 'EVERY CLASSICAL TEMPO OF THE FORM TILES THE FILM RING EXACTLY: the allegro bar 252 ms is 4032 samples = 24 slots of 168; the adagio doubles it (504 ms = 8064 = 48·168); the scherzo halves it (126 ms = 2016 = 12·168) — slow, fast and dancing, every movement’s bar is whole film slots, so the symphony is a movie at every tempo without one rounding anywhere. The movie and the song stay one integer through every change of heart.',
    js: () => 16 * 252 === 24 * 168 && 16 * 504 === 48 * 168 && 16 * 126 === 12 * 168,
    lean: 'theorem the_tempi_tile_the_film : (16 * 252 = 24 * 168) ∧ (16 * 504 = 48 * 168) ∧ (16 * 126 = 12 * 168) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. The symphony as form — four tongues, the palindrome, the involution's homecoming,
// the keys' modular return, sequence-and-set, the tempi on the film ring — demarcated: form, never beauty.
emit({ file: 'Symphony.lean', skill: 'symphony',
  header: 'SYMPHONY — a432 symphonies are theorems: the form sealed — four tongues, the palindrome, the homecoming involution, the keys walking home, the tempi tiling the film.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
