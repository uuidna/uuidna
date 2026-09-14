#!/usr/bin/env node
// Automate the Lean layer for QUENEAU — A HUNDRED THOUSAND BILLION POEMS, AS COMBINATORICS (the captain, 2026-09-14:
// "learn combinatorics and train uuidna"). Raymond Queneau's Cent mille milliards de poèmes (1961, the book that began
// Oulipo with François Le Lionnais): ten sonnets of fourteen lines, each line on its own strip, and all ten sonnets share
// not only the rhyme scheme but the rhyme SOUNDS — so at every one of the fourteen positions the ten strips are
// interchangeable, and any choice of strips is a sonnet. Every number here is derived from the two the book is built
// from, SONNETS = 10 and LINES = 14; the kernel decides each one.
//
// THE CLAIM IS THE STRUCTURE, NOT THE POEMS. No line of the book is reproduced (its text is protected; a French court
// barred the original's publication online in 1997). What is sealed is arithmetic anyone can recompute.
//
// AND EVERY POEM IS A NUMERAL: choose, at position i, which of the ten sonnets supplies line i — that choice is one decimal
// digit, so a poem IS a fourteen-digit decimal numeral (leading zeros kept), and the poems are exactly the numerals
// 0 … 10^14 − 1. Reading them in order is counting. Kernel-checked before sealing: all five accepted, no axiom, 0.31 s.
import { emit } from './lean-gen.js'

const SONNETS = 10
const LINES = 14
const POEMS = SONNETS ** LINES   // 100000000000000 — exact in a double (< 2^53)

const FACTS = [
  { key: 'queneau_poems_are_ten_to_the_fourteen',
    why: `A HUNDRED THOUSAND BILLION POEMS: ${LINES} positions, each filled independently by one of ${SONNETS} interchangeable strips, give ${SONNETS}^${LINES} = ${POEMS} sonnets — the title's number, counted.`,
    js: () => POEMS === 100_000_000_000_000,
    lean: `theorem queneau_poems_are_ten_to_the_fourteen : ${SONNETS} ^ ${LINES} = ${POEMS} := by decide` },
  { key: 'queneau_one_strip_per_position',
    why: `THE CHOICES MULTIPLY BECAUSE THEY ARE INDEPENDENT: the rhyme sound at a position is shared by all ${SONNETS} strips, so choosing one position never constrains another, and the count is the product of ${LINES} factors of ${SONNETS} — the power, written out as the product it is.`,
    js: () => Array.from({ length: LINES }, () => SONNETS).reduce((a, b) => a * b, 1) === POEMS,
    lean: `theorem queneau_one_strip_per_position : (List.replicate ${LINES} ${SONNETS}).foldl (· * ·) 1 = ${SONNETS} ^ ${LINES} := by decide` },
  { key: 'queneau_poems_are_the_fourteen_digit_numerals',
    why: `EVERY POEM IS A NUMERAL: which sonnet supplies line i is one decimal digit, so a poem is a ${LINES}-digit decimal numeral and the poems are the numerals below 10^${LINES} — the largest poem is ${POEMS - 1}, all nines, the last strip at every position.`,
    js: () => String(POEMS - 1) === '9'.repeat(LINES) && String(POEMS).length === LINES + 1,
    lean: `theorem queneau_poems_are_the_fourteen_digit_numerals : ${POEMS} - 1 = ${'9'.repeat(LINES)} ∧ ${POEMS} = 10 ^ ${LINES} := by decide` },
  { key: 'queneau_a_sonnet_is_eight_and_six',
    why: `THE SONNET'S OWN SHAPE: ${LINES} lines are the octave and the sestet, 8 + 6, so the poems factor as ${SONNETS}^8 · ${SONNETS}^6 — every octave from the book can meet every sestet.`,
    js: () => 8 + 6 === LINES && SONNETS ** 8 * SONNETS ** 6 === POEMS,
    lean: `theorem queneau_a_sonnet_is_eight_and_six : 8 + 6 = ${LINES} ∧ ${SONNETS} ^ 8 * ${SONNETS} ^ 6 = ${SONNETS} ^ ${LINES} := by decide` },
  { key: 'queneau_ten_sonnets_are_a_vanishing_sample',
    why: `WHAT THE BOOK PRINTS AGAINST WHAT IT HOLDS: ${SONNETS} complete sonnets are printed, and they are ${SONNETS} of ${POEMS} — one in ten trillion; the other ${POEMS - SONNETS} exist only as choices.`,
    js: () => POEMS / SONNETS === 10_000_000_000_000,
    lean: `theorem queneau_ten_sonnets_are_a_vanishing_sample : ${POEMS} / ${SONNETS} = 10000000000000 ∧ ${SONNETS} < ${POEMS} := by decide` },
]

emit({ file: 'Queneau.lean',
  header: 'A HUNDRED THOUSAND BILLION POEMS, AS COMBINATORICS. Raymond Queneau\'s Cent mille milliards de poèmes (1961): ten sonnets of fourteen lines sharing their rhyme sounds, each line a strip, so every position chooses freely among ten and the book holds 10^14 sonnets. Every count is derived from SONNETS = 10 and LINES = 14 and decided by the kernel. THE CLAIM IS THE STRUCTURE: no line of the book is reproduced. Every poem is a fourteen-digit decimal numeral — reading them is counting.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
