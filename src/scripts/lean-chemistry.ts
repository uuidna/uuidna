#!/usr/bin/env node
// Automate the Lean layer for CHEMISTRY — the reactions domain, as decidable arithmetic, demarcated. A balanced
// equation conserves atoms (Haber, combustion); a neutral compound conserves charge; oxidation states sum to the
// molecular charge; pH + pOH = 14 at 25 °C; Boyle's law keeps P·V constant; neutralization pairs H⁺ with OH⁻; and
// stoichiometry scales linearly. the arithmetic of reaction bookkeeping — atom/charge counts and
// exact ratios, not a full thermodynamics or kinetics derivation, and distinct from the electron-shell chemistry
// (2n² shells, 4l+2 subshells) in BioPhysics. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'haber_balances',
    why: 'Mass is conserved — the Haber synthesis N₂ + 3H₂ → 2NH₃ balances: 2 nitrogen atoms on each side (2 = 2·1) and 6 hydrogen atoms on each side (3·2 = 2·3). Atoms are neither created nor destroyed.',
    js: () => 2 === 2 * 1 && 3 * 2 === 2 * 3,
    lean: 'theorem haber_balances : (2 = 2*1) ∧ (3*2 = 2*3) := by decide' },

  { key: 'combustion_methane_balances',
    why: 'Combustion balances too: CH₄ + 2O₂ → CO₂ + 2H₂O has 4 hydrogen atoms each side (4 = 2·2) and 4 oxygen atoms each side (2·2 = 2 + 2, the CO₂ and the two waters). Carbon is 1 = 1.',
    js: () => 4 === 2 * 2 && 2 * 2 === 2 + 2,
    lean: 'theorem combustion_methane_balances : (4 = 2*2) ∧ (2*2 = 2 + 2) := by decide' },

  { key: 'charge_balance_neutral',
    why: 'A neutral ionic compound conserves charge — Al₂O₃ has two Al³⁺ and three O²⁻, so 2·(+3) + 3·(−2) = +6 − 6 = 0. The formula is fixed by charge neutrality.',
    js: () => 2 * 3 + 3 * -2 === 0,
    lean: 'theorem charge_balance_neutral : (2*3 + 3*(-2) : Int) = 0 := by decide' },

  { key: 'oxidation_states_sum',
    why: 'Oxidation states sum to the molecular charge — in neutral H₂O the two H at +1 and the O at −2 give 2·(+1) + (−2) = 0. Redox bookkeeping conserves total oxidation number.',
    js: () => 2 * 1 + -2 === 0,
    lean: 'theorem oxidation_states_sum : (2*1 + (-2) : Int) = 0 := by decide' },

  { key: 'ph_plus_poh_14',
    why: 'At 25 °C water autoionization gives pH + pOH = 14, so the scale is a REFLECTION through centre 7 and not a negation: c(x) = 14 - x. Stated as this wing already states charge — as deviations from the centre that cancel over Int, the same shape charge_balance_neutral, oxidation_states_sum and neutralization use — pH 3 with pOH 11 gives (3-7) + (11-7) = 0, and the fixed point is 7 itself, the neutral solution. The chemistry is the same fact twice: neutralization is H+ + OH- making water, and pH + pOH = 14 is that equilibrium constant read logarithmically, so the wing states one equilibrium in two units. arithmetic of a reflection at 25 °C, where 14 is a measured value (Kw is temperature-dependent and the centre moves with it); no claim about any solution outside standard conditions.',
    js: () => { let fixed = 0; for (let x = 0; x <= 14; x++) if (14 - x === x) fixed = x; return 7 + 7 === 14 && (3 - 7) + (11 - 7) === 0 && fixed === 7 },
    lean: 'theorem ph_plus_poh_14 : (7 + 7 = 14) \u2227 (((3 - 7) + (11 - 7) : Int) = 0) \u2227 (14 - 7 = 7) := by decide' },

  { key: 'boyles_law',
    why: "Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.",
    js: () => 2 * 6 === 4 * 3,
    lean: 'theorem boyles_law : 2*6 = 4*3 := by decide' },

  { key: 'neutralization',
    why: 'Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.',
    js: () => 1 + -1 === 0,
    lean: 'theorem neutralization : (1 + (-1) : Int) = 0 := by decide' },

  { key: 'stoichiometry_scales',
    why: 'Stoichiometry scales linearly: in N₂ + 3H₂ → 2NH₃, k moles of N₂ yield 2k moles of NH₃ — [1,2,3] mol give [2,4,6] mol. Double the reactant, double the product, exactly.',
    js: () => JSON.stringify([1, 2, 3].map((k) => 2 * k)) === JSON.stringify([2, 4, 6]),
    lean: 'theorem stoichiometry_scales : (([1,2,3] : List Nat).map (fun k => 2 * k)) = [2,4,6] := by decide' },
  { key: 'annihilation_conserves_everything',
    why: 'NOTHING IS ANNIHILATED, AND THE NAME IS THE DEVIATION. An electron and a positron at rest do not cancel to nothing — they convert to two photons, and every conserved quantity survives the event exactly. Read it as this wing reads charge: the electron at -1 and the positron at +1 sum to 0 (charge_balance_neutral is the same line at a different centre), and that zero is the whole content of the word anti. But mass-energy does NOT go to zero: 511 keV plus 511 keV is 1022 keV before, and two photons of 511 keV each is 1022 keV after, so the balance is 1022 = 1022 and not 0. The prefix anti names one conserved quantity that happens to reflect through centre 0, then invites the reader to apply that zero to the rest, where it is simply false. THE ALTERNATIVE TO ANTI IS THE COMPLEMENT: c(x) = w - x, whose centre is w/2 and whose fixed point is a real state rather than an absence (complement_fixes_the_half proves the fixed point, tens_complement_involutive proves applying it twice returns the original). Negation x -> -x is the single case w = 0, and it is the only case with nothing at the centre; every other reflection in this ledger — pH about 7, the tens complement about 5, the supplement about 90 — has a populated middle. So a universe found with matter at its centre is what a reflection through a non-zero centre looks like, and only the w = 0 reading makes that a paradox demanding explanation. what is proven is the arithmetic — charge sums to zero, energy sums to 1022 keV both sides, and the complement map has a fixed point wherever the centre is even. It does NOT explain the baryon asymmetry, does not derive a value for it, does not contradict CPT or the Standard Model, and does not claim physics has made an error of fact. It says the WORD carries a zero that the physics does not, which is a claim about naming.',
    js: () => { const IN: number[] = [511, 511], OUT: number[] = [511, 511], Q: number[] = [-1, 1]; let before = 0, after = 0, charge = 0; for (const m of IN) before += m; for (const g of OUT) after += g; for (const q of Q) charge += q; return before === after && before !== 0 && before === 1022 && charge === 0 },
    lean: 'theorem annihilation_conserves_everything : (((-1) + 1 : Int) = 0) \u2227 (511 + 511 = 1022) \u2227 (1022 \u2260 0) := by decide' },
]
// compute → generate → verify. The reactions domain — mass balance, charge, oxidation states, pH+pOH, Boyle,
// neutralization, stoichiometry — decidable bookkeeping, demarcated: reaction arithmetic.
emit({ file: 'Chemistry.lean', skill: 'chemistry',
  header: 'CHEMISTRY — the reactions domain, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
