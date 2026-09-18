#!/usr/bin/env node
// THE CERN CROSSINGS — one theorem for each angle where CERN's published integers meet arithmetic this ledger
// already seals. lean/Cern.lean quotes four CMS primary datasets (recids 38, 63, 35, 62, each CC0-1.0 and each
// carrying its DOI) and decides five facts over them. Those five stand alone: nothing else in the ledger touches
// them, which makes every one of them a lonely theorem in the sense lean-links.ts uses.
//
// WHAT A CROSSING IS, AND WHAT IT IS NOT. Each theorem here relates a CERN fact's OWN integers to a DIFFERENT
// sealed theorem's objects, and computes something NEITHER states alone. A restatement is not a crossing, so each
// was tested by perturbing either side, where it must fail; the perturbations that refused are recorded in the
// sentence. Where a coincidence of small integers is the only thing on offer, it is named as a coincidence and the
// CONTENT is stated separately — a numeral that agrees with another numeral for no reason the kernel can see is
// the hollow-seal fault this repository refuses elsewhere and will not manufacture here.
//
// WHOSE CLAIM IS WHOSE, carried forward from lean/Cern.lean unchanged. That the accelerator reached those
// energies, that the detector recorded those events, that the calibration holds — each is CERN's claim, published
// under the DOIs that wing lists, and credited to CERN first. CLAIMED HERE: the arithmetic relations below, each
// closed by the Lean 4 kernel over its own finite domain and axiom-free. Reading someone's published integers is
// not a claim on their experiment.
//
// THE INTEGERS ARE READ FROM lean/Cern.lean, NEVER TYPED. A pasted copy is a snapshot that rots the day that wing
// is restated, and the whole point of a crossing is that both sides still say what it says they say.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { emit, ROOT } from './lean-gen.js'

const CERN = readFileSync(join(ROOT, 'lean', 'Cern.lean'), 'utf8')

/** the one line of lean/Cern.lean that declares this theorem — so a moved statement is read, not remembered */
const stmtOf = (key: string): string => {
  const m = new RegExp(`^theorem ${key} :([\\s\\S]*?):=\\s*by`, 'm').exec(CERN)
  if (!m) throw new Error(`lean-cern-links: lean/Cern.lean no longer declares ${key}; the crossing has nothing to cross`)
  return m[1]!
}

const nums = (s: string, re: RegExp): number[][] => [...s.matchAll(re)].map((m) => m.slice(1).map(Number))

// recid → (files, quotient, remainder, events), in the order lean/Cern.lean states them
const DIVISIONS = nums(stmtOf('cms_events_close_over_their_files'), /\((\d+) \* (\d+) \+ (\d+) = (\d+)\)/g)
// the two closing sums: events, then files
const TOTALS = nums(stmtOf('the_four_cern_records_close_their_own_totals'), /\((\d+) \+ (\d+) \+ (\d+) \+ (\d+) = (\d+)\)/g)
// (published, taken, years) for each distinct embargo the wing decides
const EMBARGO = nums(stmtOf('the_open_data_embargo_ran_six_years_or_longer'), /\((\d+) - (\d+) = (\d+)\)/g)
// (label, per beam) for each energy
const BEAMS = nums(stmtOf('the_collision_energy_label_step_is_one_tev'), /\((\d+) \/ 2 = (\d+)\)/g)

if (DIVISIONS.length !== 4) throw new Error(`lean-cern-links: expected 4 divisions in cms_events_close_over_their_files, read ${DIVISIONS.length}`)
if (TOTALS.length !== 2) throw new Error(`lean-cern-links: expected the event total and the file total, read ${TOTALS.length}`)
if (EMBARGO.length !== 3) throw new Error(`lean-cern-links: expected 3 embargo differences, read ${EMBARGO.length}`)
if (BEAMS.length !== 2) throw new Error(`lean-cern-links: expected 2 beam energies, read ${BEAMS.length}`)

const EVENTS = DIVISIONS.map((d) => d[3]!)
const FILES = DIVISIONS.map((d) => d[0]!)
const EVENT_TOTAL = TOTALS[0]![4]!
const FILE_TOTAL = TOTALS[1]![4]!
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const m9 = (n: number): number => n % 9
const sumMod9 = (xs: readonly number[]): number => xs.reduce((a, x) => a + m9(x), 0) % 9

// the two energy classes: 7TeV was taken in 2011, 8TeV in 2012 — read off the embargo rows the wing decides
const SEVEN = EMBARGO.filter((e) => e[1] === 2011).map((e) => e[2]!)   // {8, 6}
const EIGHT = EMBARGO.filter((e) => e[1] === 2012).map((e) => e[2]!)   // {7}, one row covering both 2012 records
const STEP = BEAMS[1]![1]! - BEAMS[0]![1]!

const L = (xs: readonly number[], op: string): string => xs.join(` ${op} `)

const FACTS = [
  { key: 'the_cern_division_survives_casting_out_nines',
    name: `CERN'S FOUR DIVISIONS SURVIVE CASTING OUT NINES, checked in one-digit arithmetic that never forms the seven-digit product: for each of the four CMS datasets the published event count and its own files·quotient + remainder agree modulo 9.`,
    why: `The lonely theorem cms_events_close_over_their_files decides four exact divisions — events = files·q + r with r below the file count — by multiplying seven-digit numerals. The sealed theorem digital_root defines the ℤ/9 reduction this ledger uses everywhere, carrying 432 % 9 = 0 and the root of every n through 60. THE CROSSING applies that reduction to CERN's divisions and computes the check the original never takes: reduce each factor first, so the kernel decides ${DIVISIONS.map((d) => `${m9(d[0]!)}·${m9(d[1]!)} + ${m9(d[2]!)} ≡ ${m9(d[3]!)}`).join(', ')} (mod 9) — four one-digit multiplications standing in for four seven-digit ones. That is the classical casting-out-nines test, and it is an INDEPENDENT witness to the quotation: a transcription slip in any single digit of an event count moves its residue and the conjunct fails. PERTURBED AND REFUSED: ${EVENTS[0]} to ${EVENTS[0]! + 1} — the residue moves and decide refuses. SCOPE: casting out nines is a one-way test. It catches a moved digit; it cannot certify the division, which is what the lonely theorem already does over the full integers. This adds the cheap independent check, not a second proof.`,
    js: () => DIVISIONS.every((d) => m9(d[3]!) === (m9(d[0]!) * m9(d[1]!) + m9(d[2]!)) % 9),
    stmt: DIVISIONS.map((d) => `(${d[3]} % 9 = ((${d[0]} % 9) * (${d[1]} % 9) + ${d[2]} % 9) % 9)`).join(' ∧ ') },

  { key: 'the_cern_totals_close_under_the_ledger_own_reduction',
    name: `THE FOUR CERN RECORDS CLOSE THEIR TOTALS IN ℤ/9 AS WELL AS IN ℕ: the residues of the four event counts sum to the residue of the published total, and the same holds for the four file counts.`,
    why: `The lonely theorem the_four_cern_records_close_their_own_totals adds four seven-digit event counts to ${EVENT_TOTAL} and four file counts to ${FILE_TOTAL}, showing the quotation is internally consistent. The sealed theorem digital_root is the ℤ/9 reduction this ledger computes with. THE CROSSING carries the closure through that reduction, which the lonely theorem never does: the event residues are ${EVENTS.map(m9).join(', ')} and they sum to ${sumMod9(EVENTS)} ≡ ${m9(EVENT_TOTAL)}, the total's own residue; the file residues are ${FILES.map(m9).join(', ')} summing to ${sumMod9(FILES)} ≡ ${m9(FILE_TOTAL)}. So the four records close on BOTH sides of the reduction, and the consistency of CERN's published totals can be rechecked by a reader adding four single digits. PERTURBED AND REFUSED: the event total ${EVENT_TOTAL} to ${EVENT_TOTAL - 1}, which moves its residue while the parts stay put — decide refuses. SCOPE: agreement mod 9 is necessary, never sufficient; the ℕ closure is the lonely theorem's and stays its own.`,
    js: () => sumMod9(EVENTS) === m9(EVENT_TOTAL) && sumMod9(FILES) === m9(FILE_TOTAL),
    stmt: `((${EVENTS.map((e) => `${e} % 9`).join(' + ')}) % 9 = ${EVENT_TOTAL} % 9) ∧ ((${FILES.map((f) => `${f} % 9`).join(' + ')}) % 9 = ${FILE_TOTAL} % 9)` },

  { key: 'the_embargo_totals_match_across_the_two_energy_labels',
    name: `THE ENERGY LABEL DOES NOT PREDICT THE WAIT: the two 7TeV records waited ${L(SEVEN, 'and')} years, the two 8TeV records ${EIGHT[0]} and ${EIGHT[0]} — the two classes carry the SAME total embargo, ${SEVEN.reduce((a, b) => a + b, 0)} years each.`,
    why: `The lonely theorem the_open_data_embargo_ran_six_years_or_longer decides three differences — ${EMBARGO.map((e) => `${e[0]} − ${e[1]} = ${e[2]}`).join(', ')} — and that each is at least six. It says nothing about how the wait distributes. THE CROSSING pairs the differences by the year the data was taken, which is what the energy label names: the 2011 records (7TeV) waited ${SEVEN.join(' and ')}, the 2012 records (8TeV) waited ${EIGHT[0]} apiece, and ${SEVEN.join(' + ')} = ${EIGHT[0]} + ${EIGHT[0]}. The two classes are therefore indistinguishable by total embargo, which is a fact about CERN's release policy that neither the lonely theorem nor the energy theorem states: a longer wait for one 7TeV record is exactly paid for by a shorter wait for the other. PERTURBED AND REFUSED: ${SEVEN[1]} to ${SEVEN[1]! - 1}, which breaks the equality — decide refuses. NAMED AS A COINCIDENCE, NOT AS CONTENT: that shared total is ${SEVEN.reduce((a, b) => a + b, 0)}, and the ledger separately seals ve_fourteen_faces as 8 + 6 = 14, the same decomposition the 7TeV pair happens to take. Nothing connects a vector equilibrium's faces to a data-release calendar, and this theorem claims no such thing; the content is the EQUALITY of the two totals, which is arithmetic over CERN's own published years. SCOPE: four records, not a policy — a universal drawn from this sample is the fault lean/Cern.lean already refuses by naming "these two" rather than "the run".`,
    js: () => SEVEN.reduce((a, b) => a + b, 0) === EIGHT[0]! * 2,
    stmt: `(${SEVEN.join(' + ')} = ${SEVEN.reduce((a, b) => a + b, 0)}) ∧ (${EIGHT[0]} + ${EIGHT[0]} = ${EIGHT[0]! * 2}) ∧ (${SEVEN.join(' + ')} = ${EIGHT[0]} + ${EIGHT[0]})` },

  { key: 'the_beam_energies_are_coprime_multiples_of_their_own_step',
    name: `THE TWO BEAM ENERGIES ARE ${BEAMS[0]![1]! / STEP} AND ${BEAMS[1]![1]! / STEP} UNITS OF THEIR OWN DIFFERENCE: ${BEAMS[0]![1]} and ${BEAMS[1]![1]} GeV per beam have greatest common divisor ${STEP}, which is exactly the step between them, so the labels are the unit counts and the two are consecutive, hence coprime.`,
    why: `The lonely theorem the_collision_energy_label_step_is_one_tev decides the per-beam halves ${BEAMS.map((b) => `${b[0]}/2 = ${b[1]}`).join(', ')} and their difference ${STEP}. It never asks what the two energies share. THE CROSSING computes that: gcd(${BEAMS[0]![1]}, ${BEAMS[1]![1]}) = ${STEP}, the step ITSELF, so ${BEAMS[0]![1]} = ${BEAMS[0]![1]! / STEP}·${STEP} and ${BEAMS[1]![1]} = ${BEAMS[1]![1]! / STEP}·${STEP} and the two beam energies are consecutive multiples of their own gap — which is why gcd(${BEAMS[0]![1]! / STEP}, ${BEAMS[1]![1]! / STEP}) = 1. The sealed theorem rosette_and_vortex_are_coprime is this ledger's own coprimality fact, carrying gcd 7 9 = 1 beside gcd 7 14 = 7, and it is cited here for the same reason: consecutive integers are coprime, so the run labels "7TeV" and "8TeV" are not merely names but the unit counts of a common quantum, and no finer common step exists. PERTURBED AND REFUSED: ${BEAMS[1]![1]} to 4500, where the gap becomes 1000 while the gcd stays ${STEP}, so step and gcd part company and decide refuses. SCOPE: an arithmetic relation between two published numerals. Why the machine ran at those energies is CERN's to say.`,
    js: () => gcd(BEAMS[0]![1]!, BEAMS[1]![1]!) === STEP && gcd(BEAMS[0]![1]! / STEP, BEAMS[1]![1]! / STEP) === 1,
    stmt: `(Nat.gcd ${BEAMS[0]![1]} ${BEAMS[1]![1]} = ${STEP}) ∧ (${BEAMS[1]![1]} - ${BEAMS[0]![1]} = ${STEP}) ∧ (${BEAMS[0]![1]} = ${BEAMS[0]![1]! / STEP} * ${STEP}) ∧ (${BEAMS[1]![1]} = ${BEAMS[1]![1]! / STEP} * ${STEP}) ∧ (Nat.gcd ${BEAMS[0]![1]! / STEP} ${BEAMS[1]![1]! / STEP} = 1)` },

  { key: 'the_cern_file_total_is_twice_a_prime',
    name: `THE ${FILE_TOTAL} FILES ADMIT NO EVEN SPLIT BUT HALVING: ${FILE_TOTAL} = 2 · ${FILE_TOTAL / 2}, and ${FILE_TOTAL / 2} is prime on a bounded search, so the collection's only equal groupings by file are 1, 2, ${FILE_TOTAL / 2} and ${FILE_TOTAL}.`,
    why: `The lonely theorem the_four_cern_records_close_their_own_totals sums the four file counts to ${FILE_TOTAL} and stops there. THE CROSSING factors that total: ${FILE_TOTAL} = 2 · ${FILE_TOTAL / 2}, and no d in [2, 16) divides ${FILE_TOTAL / 2} while 16·16 > ${FILE_TOTAL / 2}, which is a complete primality witness by the square bound — so ${FILE_TOTAL / 2} is prime and ${FILE_TOTAL} has exactly four divisors. The consequence is about the collection rather than the numeral: these four records cannot be redistributed into three, four or any other equal number of file-groups; the only balanced split is in half. The four file counts ${FILES.join(', ')} are each even and their greatest common divisor is 2, which is where the single factor of two comes from and why no larger common grouping exists. PERTURBED AND REFUSED: ${FILE_TOTAL} to ${FILE_TOTAL - 2}, which is 2 · ${(FILE_TOTAL - 2) / 2} and NOT twice a prime — decide refuses the factorisation. SCOPE: an arithmetic property of the published file counts of these four records, and of nothing else; another harvest sums to another number.`,
    js: () => FILE_TOTAL === 2 * (FILE_TOTAL / 2)
      && [...Array(14).keys()].map((i) => i + 2).every((d) => (FILE_TOTAL / 2) % d !== 0)
      && 16 * 16 > FILE_TOTAL / 2
      && FILES.reduce((a, f) => gcd(a, f), 0) === 2,
    stmt: `(${FILE_TOTAL} = 2 * ${FILE_TOTAL / 2}) ∧ ((List.range 16).all (fun d => d < 2 || ${FILE_TOTAL / 2} % d != 0) = true) ∧ (16 * 16 > ${FILE_TOTAL / 2}) ∧ (Nat.gcd (Nat.gcd ${FILES[0]} ${FILES[1]}) (Nat.gcd ${FILES[2]} ${FILES[3]}) = 2)` },
]

emit({
  file: 'CernLinks.lean',
  skill: 'links',
  header: 'THE CERN CROSSINGS — five theorems relating the published integers of four CMS primary datasets, quoted '
    + 'in lean/Cern.lean under their DOIs and CC0-1.0, to arithmetic this ledger already seals. Each of the five '
    + 'CERN facts stood alone: nothing else in the ledger touched them, which made every one a lonely theorem. '
    + 'Each crossing computes something NEITHER side states alone, and each was tested by PERTURBING either side, '
    + 'where it must fail — the perturbations that refused are recorded in each sentence, because that is what '
    + 'separates a crossing from a restatement. THE FIVE: the four divisions rechecked by casting out nines in '
    + 'one-digit arithmetic, against digital_root; the four records closing their totals in ℤ/9 as well as in ℕ, '
    + 'against digital_root; the embargo totalling the same across both energy labels, so the label does not '
    + 'predict the wait; the two beam energies as consecutive multiples of their own difference and therefore '
    + 'coprime, against rosette_and_vortex_are_coprime; and the file total as twice a prime, so the collection '
    + 'admits no equal split but halving. '
    + 'A COINCIDENCE IS NAMED AS ONE. The shared embargo total is 14 and the ledger separately seals 8 + 6 = 14 as '
    + 've_fourteen_faces, the same decomposition the 7TeV pair happens to take; nothing connects a vector '
    + 'equilibrium to a release calendar and no theorem here says otherwise. The content is the EQUALITY of the '
    + 'two totals. A numeral agreeing with another numeral for no reason the kernel can see is the hollow seal '
    + 'this repository refuses elsewhere, and it is not manufactured here. '
    + 'WHOSE CLAIM IS WHOSE, unchanged from lean/Cern.lean: that the accelerator reached those energies, that the '
    + 'detector recorded those events and that the calibration holds are CERN\'s claims, published under the DOIs '
    + 'that wing lists and credited to CERN first. CLAIMED HERE: these arithmetic relations, each closed by the '
    + 'kernel over its own finite domain. Reading published integers is not a claim on the experiment. '
    + 'THE INTEGERS ARE READ FROM lean/Cern.lean, NEVER TYPED, so a crossing cannot outlive the statement it '
    + 'crosses. SCOPE: casting out nines is necessary and never sufficient, and four datasets are not a policy — '
    + 'the wing it crosses already refuses that universal by naming "these two" rather than "the run".',
  facts: FACTS.map((f) => ({ key: f.key, stmt: f.stmt, js: f.js, name: f.name + ' ' + f.why })),
})
