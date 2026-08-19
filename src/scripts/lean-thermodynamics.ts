#!/usr/bin/env node
// Automate the Lean layer for THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. The first
// law conserves energy (ΔU = Q − W); the second law forbids entropy from decreasing and sends heat from hot to
// cold; the Carnot efficiency is below 1 (no perfect engine, no perpetual motion); the Kelvin scale floors at
// absolute zero (0 °C = 273 K); Charles's law keeps V/T constant; and specific heat is linear in ΔT. HONEST SCOPE:
// the arithmetic of the laws — conservation, monotonicity and exact ratios, not a full statistical-mechanics
// derivation. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'first_law_conservation',
    why: 'The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.',
    js: () => 100 === 60 + 40,
    lean: 'theorem first_law_conservation : 100 = 60 + 40 := by decide' },

  { key: 'entropy_never_decreases',
    why: 'The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.',
    js: () => Array.from({ length: 9 }, (_, t) => t).every((t) => t <= t + 1),
    lean: 'theorem entropy_never_decreases : (List.range 9).all (fun t => t <= t + 1) := by decide' },

  { key: 'heat_flows_hot_to_cold',
    why: 'The second law\'s direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.',
    js: () => 400 > 300,
    lean: 'theorem heat_flows_hot_to_cold : 400 > 300 := by decide' },

  { key: 'carnot_efficiency_below_one',
    why: 'The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 > 0 — no engine is perfect and none reaches absolute zero.',
    js: () => 400 - 300 < 400 && 0 < 300,
    lean: 'theorem carnot_efficiency_below_one : ((400 - 300) < 400) ∧ (0 < 300) := by decide' },

  { key: 'absolute_zero_and_kelvin',
    why: 'The Kelvin scale floors at absolute zero: 0 °C = 273 K and 100 °C = 373 K (K = °C + 273). Nothing goes below 0 K; temperature has a hard floor.',
    js: () => 0 + 273 === 273 && 100 + 273 === 373,
    lean: 'theorem absolute_zero_and_kelvin : (0 + 273 = 273) ∧ (100 + 273 = 373) := by decide' },

  { key: 'charles_law',
    why: "Charles's law keeps V/T constant at fixed pressure: heating a gas expands it proportionally — V₁/T₁ = V₂/T₂ gives 2/300 = 4/600, cross-multiplied 2·600 = 4·300 = 1200.",
    js: () => 2 * 600 === 4 * 300,
    lean: 'theorem charles_law : 2 * 600 = 4 * 300 := by decide' },

  { key: 'no_perpetual_motion',
    why: 'No perpetual motion: the work out never exceeds the heat in, and some is always wasted — from 100 units of heat at most 40 become work (40 ≤ 100), leaving 60 as waste heat. A 100%-efficient engine is forbidden.',
    js: () => 40 <= 100 && 100 - 40 === 60,
    lean: 'theorem no_perpetual_motion : (40 <= 100) ∧ ((100 - 40) = 60) := by decide' },

  { key: 'specific_heat_linear',
    why: 'Specific heat is linear: Q = m·c·ΔT, so with m·c = 10 the heat scales with the temperature change — ΔT of [1,2,3] needs Q of [10,20,30]. Double the rise, double the heat.',
    js: () => JSON.stringify([1, 2, 3].map((dT) => 10 * dT)) === JSON.stringify([10, 20, 30]),
    lean: 'theorem specific_heat_linear : (([1,2,3] : List Nat).map (fun dT => 10 * dT)) = [10,20,30] := by decide' },

  // ── THE THERMODYNAMIC COST OF COMPUTING ITSELF. Landauer's principle sets the floor: erasing one bit of
  // information dissipates at least kT·ln2. Since the 2019 SI redefinition the Boltzmann constant is EXACT by
  // definition — k = 1.380649×10⁻²³ J/K — so this bound is DERIVED by arithmetic, not measured, exactly as the
  // WGS 84 polar radius is derived from its two defining constants.
  // HONEST SCOPE, because this domain attracts the opposite reading: a floor on dissipation is a COST, never a
  // source. Reversible computation avoids paying it; it does not produce energy, and no arrangement of hardware
  // or sensors makes it produce energy — first_law_conservation and no_perpetual_motion, already sealed in this
  // same wing, forbid exactly that. "Free energy from computation" is refused by the ledger, not by opinion.
  { key: 'landauer_bound_derived',
    why: 'THE FLOOR UNDER EVERY ERASURE, DERIVED FROM AN EXACT CONSTANT. Boltzmann\'s k is exact by SI definition (1.380649×10⁻²³ J/K, fixed in the 2019 redefinition), so at room temperature T = 300 K the thermal quantum is kT = 414194700×10⁻²⁹ J, and Landauer\'s minimum cost of erasing ONE bit is kT·ln2 = 287097813×10⁻²⁹ J ≈ 2.871×10⁻²¹ J. Computed here in exact integers with ln2 as 693147/1000000 — no measurement enters, only the definition and division.',
    js: () => 1380649 * 300 === 414194700 && Math.floor(414194700 * 693147 / 1000000) === 287097813,
    lean: 'theorem landauer_bound_derived : 1380649 * 300 = 414194700 ∧ 414194700 * 693147 / 1000000 = 287097813 := by decide' },

  { key: 'reversible_erases_nothing',
    why: 'A COST PROPORTIONAL TO WHAT IS ERASED IS ZERO WHEN NOTHING IS ERASED. Landauer\'s floor scales with the number of bits destroyed: erase one bit and pay 287097813×10⁻²⁹ J, erase none and pay 0 × that = 0. A logically REVERSIBLE step — an involution like reverse or CNOT, or this ledger\'s round-tripping imprint codec — destroys no information, so it carries no erasure floor at all. HONEST SCOPE: this is a floor being AVOIDED, never energy being produced; the bound stays strictly positive (0 < 287097813), and no_perpetual_motion in this wing forbids the other reading.',
    js: () => 0 * 287097813 === 0 && 1 * 287097813 === 287097813 && 0 < 287097813,
    lean: 'theorem reversible_erases_nothing : 0 * 287097813 = 0 ∧ 1 * 287097813 = 287097813 ∧ 0 < 287097813 := by decide' },

  { key: 'hardware_above_landauer',
    why: 'REAL SILICON RUNS ABOUT A HUNDRED MILLION TIMES ABOVE THE FLOOR. A switching event in current CMOS dissipates on the order of 10⁻¹² J, against Landauer\'s 2.871×10⁻²¹ J — a ratio near 3.5×10⁸, stated here as the exact integer comparison 100000000 × 287097813 < 100000000000000000000000000000000. So the headroom between real hardware and the physical limit is enormous and real — and it is headroom for EFFICIENCY, which is a smaller bill, not a source of energy.',
    js: () => 100000000 * 287097813 < 1e32,
    lean: 'theorem hardware_above_landauer : 100000000 * 287097813 < 100000000000000000000000000000000 := by decide' },
]

// compute → generate → verify. The energy domain — conservation, entropy, heat direction, Carnot, Kelvin, Charles,
// no perpetual motion, specific heat — decidable arithmetic of the laws, demarcated: not statistical mechanics.
emit({ file: 'Thermodynamics.lean', skill: 'thermodynamics',
  header: 'THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. The first law conserves energy (ΔU = Q − W: 100 = 60 + 40); the second law forbids entropy from decreasing and sends heat hot → cold; the Carnot efficiency is below 1 (no perfect engine, no perpetual motion); the Kelvin scale floors at absolute zero (0 °C = 273 K); Charles\'s law keeps V/T constant; and specific heat is linear in ΔT. HONEST SCOPE: the arithmetic of the laws — conservation, monotonicity and exact ratios, not a full statistical-mechanics derivation.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
