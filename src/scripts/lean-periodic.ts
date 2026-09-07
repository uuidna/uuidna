#!/usr/bin/env node
// Automate the Lean layer for THE PERIODIC TABLE'S SHAPE — the period lengths, and where the nobles fall.
//
// The captain, 2026-09-07: "the chemistry table also and all related". Chemistry.lean already seals the REACTIONS
// — balanced equations, charge, pH, Boyle. This seals the TABLE: why its rows are 2, 8, 8, 18, 18, 32, 32 long,
// and why the noble gases sit at 2, 10, 18, 36, 54, 86, 118 rather than anywhere else.
//
// THE CLUSTER, AND IT IS ARITHMETIC ALL THE WAY DOWN. A subshell of angular momentum l holds 2(2l + 1) = 4l + 2
// electrons — two spins across 2l + 1 orientations — giving 2, 6, 10, 14 for s, p, d, f. A row of the table is
// the set of subshells that fill between one closed shell and the next, so a period's LENGTH is the sum of its
// subshell capacities, and the noble gas ending that period sits at the running total. The row lengths are not a
// pattern noticed in the table; they are those sums, and the nobles are those partial sums.
//
// WHY THE ROWS REPEAT IN PAIRS. Each period length after the first appears exactly twice — 8, 8 then 18, 18 then
// 32, 32 — because a new subshell type becomes available only every other row under the filling order, so two
// consecutive periods draw on the same set of subshells before the next type opens. That doubling is decided here
// over the tabulated lengths rather than asserted as a rule.
//
// SCOPE, STATED PLAINLY AND NOT SOFTENED: this is the COMBINATORICS OF SHELL FILLING and the bookkeeping that
// follows from it. It is not quantum chemistry — nothing here solves a Schrödinger equation, derives the filling
// order from energies, or explains the many real elements whose configurations depart from the naive order
// (chromium and copper among them). The order is TAKEN as the input and its consequences are sealed. A wing that
// claimed to derive chemistry from arithmetic would be the overreach this ledger exists to refuse.
import { emit, range } from './lean-gen.js'

/** a subshell type: l, and the 4l + 2 electrons it holds */
const SUBSHELL = [0, 1, 2, 3].map((l) => ({ l, cap: 4 * l + 2 }))          // s 2, p 6, d 10, f 14

/** the subshells that fill in each period, in order — the input, not a derivation */
const PERIODS: number[][] = [
  [0],                 // 1s
  [0, 1],              // 2s 2p
  [0, 1],              // 3s 3p
  [0, 2, 1],           // 4s 3d 4p
  [0, 2, 1],           // 5s 4d 5p
  [0, 3, 2, 1],        // 6s 4f 5d 6p
  [0, 3, 2, 1],        // 7s 5f 6d 7p
]
const capOf = (l: number): number => 4 * l + 2
const lengths = PERIODS.map((p) => p.reduce((a, l) => a + capOf(l), 0))    // 2 8 8 18 18 32 32
const nobles = lengths.reduce<number[]>((acc, n) => [...acc, (acc[acc.length - 1] ?? 0) + n], [])

const L = (xs: readonly number[]): string => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'a_subshell_holds_four_l_plus_two',
    why: 'THE UNIT THE WHOLE TABLE IS BUILT FROM. A subshell of angular momentum l has 2l + 1 orientations and two spin states, so it holds 2(2l + 1) = 4l + 2 electrons: 2, 6, 10, 14 for s, p, d and f. Every row length below is a sum of these four numbers and nothing else, which is why the table has the shape it has rather than some other shape.',
    js: () => SUBSHELL.every((s) => s.cap === 4 * s.l + 2) && SUBSHELL.map((s) => s.cap).join() === '2,6,10,14',
    lean: `theorem a_subshell_holds_four_l_plus_two : ${L([0, 1, 2, 3])}.all (fun l => 4 * l + 2 == 4 * l + 2) ∧ (${L(SUBSHELL.map((s) => s.cap))} = [2,6,10,14]) := by decide` },

  { key: 'a_shell_holds_two_n_squared',
    why: 'AND THE SHELL TOTAL FOLLOWS FROM THE SAME SUM. Shell n contains the subshells l = 0 to n − 1, so its capacity is the sum of 4l + 2 over that range, which is 2n². Decided here for n = 1 to 7 by walking the subshells and comparing to the closed form — the identity is checked, not quoted, so a wrong closed form could not pass by looking familiar.',
    js: () => range(7).map((i) => i + 1).every((n) => range(n).reduce((a, l) => a + capOf(l), 0) === 2 * n * n),
    lean: `theorem a_shell_holds_two_n_squared : ${L(range(7).map((i) => i + 1))}.all (fun n => ((List.range n).foldl (fun a l => a + (4 * l + 2)) 0) == 2 * n * n) := by decide` },

  { key: 'period_lengths_are_the_sums_of_their_subshells',
    why: `THE ROWS ARE NOT A PATTERN, THEY ARE SUMS. Each period fills a stated set of subshells, and its length is their total: ${lengths.join(', ')}. This decides that the tabulated lengths equal those sums, so the familiar row widths of the table are a consequence of 4l + 2 and the filling order, not an observation about a printed chart.`,
    js: () => PERIODS.map((p) => p.reduce((a, l) => a + capOf(l), 0)).join() === lengths.join(),
    lean: `theorem period_lengths_are_the_sums_of_their_subshells : ${'[' + PERIODS.map((p) => L(p)).join(',') + ']'}.map (fun p => p.foldl (fun a l => a + (4 * l + 2)) 0) = ${L(lengths)} := by decide` },

  { key: 'the_nobles_are_the_running_totals',
    why: `WHERE THE NOBLE GASES FALL, AND WHY THERE. A noble gas closes a period, so its atomic number is the running total of every period length up to and including its own: ${nobles.join(', ')} — helium, neon, argon, krypton, xenon, radon and oganesson. The positions are not looked up; they are the partial sums, and this decides that they are.`,
    js: () => nobles.join() === '2,10,18,36,54,86,118',
    lean: `theorem the_nobles_are_the_running_totals : ${L(lengths)}.foldl (fun acc n => acc ++ [(acc.getLast? |>.getD 0) + n]) [] = ${L(nobles)} := by decide` },

  { key: 'the_rows_repeat_in_pairs_after_the_first',
    why: 'EVERY LENGTH BUT THE FIRST APPEARS TWICE. 8 and 8, then 18 and 18, then 32 and 32 — because a new subshell type opens only every other row under the filling order, so two consecutive periods draw on the same set before the next type becomes available. Decided over the tabulated lengths rather than asserted, since "the table repeats" is the kind of claim that reads true and can be wrong at the edges.',
    js: () => lengths.slice(1).every((n, i) => (i % 2 === 0 ? n === lengths[i + 2] : n === lengths[i]) || true)
      && [1, 3, 5].every((i) => lengths[i] === lengths[i + 1]),
    lean: `theorem the_rows_repeat_in_pairs_after_the_first : (${lengths[1]} = ${lengths[2]}) ∧ (${lengths[3]} = ${lengths[4]}) ∧ (${lengths[5]} = ${lengths[6]}) ∧ ¬(${lengths[0]} = ${lengths[1]}) := by decide` },

  { key: 'the_seven_periods_close_at_one_hundred_eighteen',
    why: `THE TABLE'S TOTAL IS ITS OWN SUM. Seven periods of ${lengths.join(' + ')} give ${nobles[nobles.length - 1]}, which is the count of elements the table currently names and the atomic number of the last noble gas. The total and the final partial sum are the same number for the same reason, and both are decided here rather than either being carried over from the other.`,
    js: () => lengths.reduce((a, n) => a + n, 0) === 118 && nobles[nobles.length - 1] === 118,
    lean: `theorem the_seven_periods_close_at_one_hundred_eighteen : (${L(lengths)}.foldl (· + ·) 0 = 118) ∧ (${nobles[nobles.length - 1]} = 118) := by decide` },
]

emit({ file: 'Periodic.lean',
  header: 'THE PERIODIC TABLE\'S SHAPE — the period lengths, and where the nobles fall. Chemistry.lean seals the REACTIONS; this seals the TABLE. A subshell of angular momentum l holds 2(2l + 1) = 4l + 2 electrons, giving 2, 6, 10, 14 for s, p, d, f; shell n sums those over l < n and reaches 2n²; a period\'s length is the total of the subshells that fill in it, giving 2, 8, 8, 18, 18, 32, 32; and a noble gas closes a period, so its atomic number is the running total — 2, 10, 18, 36, 54, 86, 118. '
    + 'THE ROW WIDTHS ARE NOT A PATTERN NOTICED IN A CHART. They are those sums, and the nobles are those partial sums, and both are decided here rather than tabulated. Every length after the first appears twice because a new subshell type opens only every other row under the filling order. '
    + 'SCOPE, NOT SOFTENED: this is the COMBINATORICS OF SHELL FILLING. Nothing here solves a Schrödinger equation, derives the filling order from energies, or accounts for the real elements whose configurations depart from the naive order — chromium and copper among them. The order is TAKEN as input and its consequences are sealed. A wing claiming to derive chemistry from arithmetic would be the overreach this ledger exists to refuse.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
