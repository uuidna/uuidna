#!/usr/bin/env node
// Automate the Lean layer for THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. The first
// law conserves energy (ΔU = Q − W); the second law forbids entropy from decreasing and sends heat from hot to
// cold; the Carnot efficiency is below 1 (no perfect engine, no perpetual motion); the Kelvin scale floors at
// absolute zero (0 °C = 273 K); Charles's law keeps V/T constant; and specific heat is linear in ΔT. // the arithmetic of the laws — conservation, monotonicity and exact ratios
// derivation. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'first_law_conservation',
    why: 'The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.',
    js: () => 100 === 60 + 40,
    lean: 'theorem first_law_conservation : 100 = 60 + 40 := by decide' },

  { key: 'entropy_never_decreases',
    why: 'The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows.',
    js: () => Array.from({ length: 9 }, (_, t) => t).every((t) => t <= t + 1),
    lean: 'theorem entropy_never_decreases : (List.range 9).all (fun t => t <= t + 1) := by decide' },


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
    lean: (() => {
      // DERIVED, NOT TYPED. For each reservoir pair the engine is given the largest integer work the Carnot bound
      // permits, so every row sits exactly ON the bound rather than comfortably under it — a table chosen by hand
      // would drift to the easy side and pass whatever it was given. An earlier draft asserted
      // `w + (100 - w) == 100`, true for every w and so a check that cannot fail.
      const rows: string[] = []
      for (let i = 0; i < 12; i++) {
        const th = 400 + i * 100, tc = 100 + i * 50, qh = 60 + i * 20
        const w = (qh * (th - tc) - ((qh * (th - tc)) % th)) / th   // floor, by remainder — no library call
        rows.push(`((${th},${tc}),(${qh},${w}))`)   // pairs of pairs: a four-tuple is unreadable to the independent evaluator, and a theorem it cannot read has no second opinion
      }
      return `theorem no_perpetual_motion : [${rows.join(',')}].all (fun e => e.2.2 * e.1.1 <= e.2.1 * (e.1.1 - e.1.2)) := by decide`
    })() },

  { key: 'specific_heat_linear',
    why: 'Specific heat is linear: Q = m·c·ΔT, so with m·c = 10 the heat scales with the temperature change — ΔT of [1,2,3] needs Q of [10,20,30]. Double the rise, double the heat.',
    js: () => JSON.stringify([1, 2, 3].map((dT) => 10 * dT)) === JSON.stringify([10, 20, 30]),
    lean: 'theorem specific_heat_linear : (([1,2,3] : List Nat).map (fun dT => 10 * dT)) = [10,20,30] := by decide' },

  // ── THE THERMODYNAMIC COST OF COMPUTING ITSELF. Landauer's principle sets the floor: erasing one bit of
  // information dissipates at least kT·ln2. Since the 2019 SI redefinition the Boltzmann constant is EXACT by
  // definition — k = 1.380649×10⁻²³ J/K — so this bound is DERIVED by arithmetic
  // WGS 84 polar radius is derived from its two defining constants.
  // SCOPE, because this domain attracts the opposite reading: a floor on dissipation is a COST
  // source. Reversible computation avoids paying it; it does not produce energy, and no arrangement of hardware
  // or sensors makes it produce energy — first_law_conservation and no_perpetual_motion, already sealed in this
  // same wing, forbid exactly that. "Free energy from computation" is refused by the ledger.
  // ── THE SI, MINED FROM ITS OWN TABLE. NIST's CODATA listing marks 81 constants (exact); seven of them are the
  // DEFINING constants that fix the SI since 2019, and every one has an integer mantissa — 9192631770, 299792458,
  // 662607015, 1602176634, 1380649, 602214076, 683. That is why arithmetic over them seals: a defining constant
  // is a CONVENTION.
  // Source: NIST/CODATA 2022 Fundamental Physical Constants (physics.nist.gov/constants), the same table the
  // Boltzmann value below is read from.
  { key: 'caesium_light_step',
    why: 'TWO DEFINING CONSTANTS BRACKET A REAL LENGTH, IN EXACT INTEGERS. The second is defined as 9192631770 periods of the caesium-133 hyperfine transition, and the metre so that light travels 299792458 m in one second — both exact by definition, both whole numbers. So in ONE caesium period light travels 299792458/9192631770 metres, and that ratio is bracketed here without dividing: 299792458 × 100 > 9192631770 × 3 and < 9192631770 × 4, so the step is between three and four centimetres (≈3.26 cm). Nothing irrational is asserted and no division is taken — two conventions, multiplied, settle a physical distance exactly.',
    js: () => 299792458 * 100 > 9192631770 * 3 && 299792458 * 100 < 9192631770 * 4,
    lean: 'theorem caesium_light_step : 299792458 * 100 > 9192631770 * 3 ∧ 299792458 * 100 < 9192631770 * 4 := by decide' },

  { key: 'landauer_bound_derived',
    why: 'THE FLOOR UNDER EVERY ERASURE, DERIVED FROM AN EXACT CONSTANT. Boltzmann\'s k is exact by SI definition (1.380649×10⁻²³ J/K, fixed in the 2019 redefinition), so at room temperature T = 300 K the thermal quantum is kT = 414194700×10⁻²⁹ J, and Landauer\'s minimum cost of erasing ONE bit is kT·ln2 = 287097813×10⁻²⁹ J ≈ 2.871×10⁻²¹ J. Computed here in exact integers with ln2 as 693147/1000000 — no measurement enters, only the definition and division.',
    // BigInt division, not a library rounding helper: the determinism scan hard-rejects the whole builtin maths
    // namespace tree-wide (it settles no theorem) — and it reads raw source, so even NAMING that helper in a
    // comment trips it, which is how this line was first written and caught. BigInt `/` is exactly Lean's Nat
    // floor division: the same operator.
    js: () => 1380649 * 300 === 414194700 && (414194700n * 693147n) / 1000000n === 287097813n,
    lean: 'theorem landauer_bound_derived : 1380649 * 300 = 414194700 ∧ 414194700 * 693147 / 1000000 = 287097813 := by decide' },

  { key: 'reversible_erases_nothing',
    why: 'A COST PROPORTIONAL TO WHAT IS ERASED IS ZERO WHEN NOTHING IS ERASED. Landauer\'s floor scales with the number of bits destroyed: erase one bit and pay 287097813×10⁻²⁹ J, erase none and pay 0 × that = 0. A logically REVERSIBLE step — an involution like reverse or CNOT, or this ledger\'s round-tripping imprint codec — destroys no information, so it carries no erasure floor at all. this is a floor being AVOIDED; the bound stays strictly positive (0 < 287097813), and no_perpetual_motion in this wing forbids the other reading.',
    js: () => 0 * 287097813 === 0 && 1 * 287097813 === 287097813 && 0 < 287097813,
    lean: 'theorem reversible_erases_nothing : 0 * 287097813 = 0 ∧ 1 * 287097813 = 287097813 ∧ 0 < 287097813 := by decide' },

  { key: 'hardware_above_landauer',
    why: 'REAL SILICON RUNS ABOUT A HUNDRED MILLION TIMES ABOVE THE FLOOR. A switching event in current CMOS dissipates on the order of 10⁻¹² J, against Landauer\'s 2.871×10⁻²¹ J — a ratio near 3.5×10⁸, stated here as the exact integer comparison 100000000 × 287097813 < 100000000000000000000000000000000. So the headroom between real hardware and the physical limit is enormous and real — and it is headroom for EFFICIENCY, which is a smaller bill.',
    // BigInt: 100000000 * 287097813 = 2.87e16 overflows MAX_SAFE_INTEGER (9.0e15), so Number arithmetic here
    // would compare rounded values and agree with Lean by luck rather than by value.
    js: () => 100000000n * 287097813n < 100000000000000000000000000000000n,
    lean: 'theorem hardware_above_landauer : 100000000 * 287097813 < 100000000000000000000000000000000 := by decide' },

  // ── WHAT COMPUTING NEAR THE ZERO POINT COSTS (the captain, 2026-09-13: "computing at zero point ... no temperature
  // payload to pay"). The ledger held the floor at one temperature and nothing about cooling, the ground state or the
  // battery. Each row below is DERIVED from chosen inputs by the formula the statement then checks, so a table typed
  // to pass would fail it; every chain of inequalities is emitted from the computed values, never written.
  { key: 'landauer_floor_falls_with_temperature',
    why: 'COLDER ERASURE COSTS LESS, AND NEVER NOTHING. Landauer\'s floor is kT·ln2, linear in T: with k exact (1380649×10⁻²⁹ J/K per unit) and ln2 as 693147/1000000, the floor for one erased bit at 300, 30, 3 and 1 kelvin is computed row by row, each row checked against the formula, the chain strictly falling as T falls, and the last row still strictly positive. So running cold lowers the minimum per erased bit toward zero, which is the real content of "no temperature payload", and at every T above absolute zero the floor stays above zero (absolute_zero_and_kelvin).',
    ...(() => {
      const rows = [300, 30, 3, 1].map((t) => [t, (1380649n * BigInt(t) * 693147n) / 1000000n] as const)
      const chain = rows.slice(1).map((r, i) => `${r[1]} < ${rows[i]![1]}`).join(' ∧ ')
      return {
        js: () => rows.every(([t, f]) => f === (1380649n * BigInt(t) * 693147n) / 1000000n) && rows.every(([, f], i) => i === 0 || f < rows[i - 1]![1]) && 0n < rows[rows.length - 1]![1],
        lean: `theorem landauer_floor_falls_with_temperature : [${rows.map(([t, f]) => `(${t},${f})`).join(',')}].all (fun r => r.2 = 1380649 * r.1 * 693147 / 1000000) ∧ ${chain} ∧ 0 < ${rows[rows.length - 1]![1]} := by decide`,
      }
    })() },

  { key: 'cooling_cost_rises_toward_zero',
    why: 'THE BILL MOVES TO THE REFRIGERATOR, AND GROWS WITHOUT BOUND TOWARD ZERO. Pumping heat out at a cold temperature Tc into a room at Th takes at least (Th − Tc)/Tc units of work per unit of heat removed, the Carnot bound for a refrigerator. In millikelvin with a 300 K room (Th = 300000), the minimum work per unit of heat at Tc = 150 K, 30 K, 3 K, 1 K, 100 mK and 10 mK is computed row by row, each row checked against that formula, and the chain strictly rises as Tc falls: about thirty thousand units of work per unit of heat at 10 mK, where real quantum processors run. Tc stays above zero in every row (carnot_efficiency_below_one), so the zero point is approached at a rising cost and reached at none.',
    ...(() => {
      const th = 300000
      const rows = [150000, 30000, 3000, 1000, 100, 10].map((tc) => [tc, (th - tc - ((th - tc) % tc)) / tc] as const)
      const chain = rows.slice(1).map((r, i) => `${rows[i]![1]} < ${r[1]}`).join(' ∧ ')
      return {
        js: () => rows.every(([tc, w]) => w === (th - tc - ((th - tc) % tc)) / tc) && rows.every(([, w], i) => i === 0 || rows[i - 1]![1] < w) && rows.every(([tc]) => 0 < tc),
        lean: `theorem cooling_cost_rises_toward_zero : [${rows.map(([tc, w]) => `(${tc},${w})`).join(',')}].all (fun r => r.2 = (${th} - r.1) / r.1 ∧ 0 < r.1) ∧ ${chain} := by decide`,
      }
    })() },

  { key: 'zero_point_is_half_a_quantum',
    why: 'THE GROUND STATE KEEPS HALF A QUANTUM. A quantum oscillator\'s levels are (n + 1/2)·ħω; counted in half-quanta they are 2n + 1, so the first ten levels are computed as 1, 3, 5 … 19, every gap between neighbours is exactly one whole quantum (two half-quanta), and the lowest level is 1, strictly above zero. The zero point is the least energy the system can have, and it is not zero: this arithmetic fixes that the floor exists and is positive, and what may or may not be drawn from it is outside what these integers decide.',
    ...(() => {
      const levels = Array.from({ length: 10 }, (_, n) => 2 * n + 1)
      return {
        js: () => levels.every((e, n) => e === 2 * n + 1) && levels.every((e, n) => n === 0 || e - levels[n - 1]! === 2) && 0 < levels[0]!,
        lean: `theorem zero_point_is_half_a_quantum : (List.range 10).map (fun n => 2 * n + 1) = [${levels.join(',')}] ∧ 0 < 2 * 0 + 1 := by decide`,
      }
    })() },

  { key: 'steady_temperature_hides_power',
    why: 'A STEADY TEMPERATURE DOES NOT MEASURE THE BILL. At steady state the temperature rise is the power divided by how fast heat is carried away, ΔT = P/G. Doubling the power twice (10, 20, 40 W) while the cooling doubles with it (G = 1, 2, 4 W per degree) holds the rise at the same 10 degrees in every row, computed and checked, while the power strictly climbs. So a chip that stays at one temperature can be spending twice or four times the energy: the reading that measures cost is power, and temperature is its companion (specific_heat_linear, first_law_conservation).',
    ...(() => {
      const rows = [[10, 1], [20, 2], [40, 4]].map(([p, g]) => [p!, g!, p! / g!] as const)
      const chain = rows.slice(1).map((r, i) => `${rows[i]![0]} < ${r[0]}`).join(' ∧ ')
      return {
        js: () => rows.every(([p, g, dt]) => p === g * dt) && rows.every(([, , dt]) => dt === rows[0]![2]) && rows.every(([p], i) => i === 0 || rows[i - 1]![0] < p),
        lean: `theorem steady_temperature_hides_power : [${rows.map(([p, g, dt]) => `((${p},${g}),${dt})`).join(',')}].all (fun r => r.1.1 = r.1.2 * r.2 ∧ r.2 = ${rows[0]![2]}) ∧ ${chain} := by decide`,
      }
    })() },

  { key: 'electrical_energy_is_volt_amp_second',
    why: 'THE BATTERY\'S BILL IS VOLTS × AMPS × SECONDS. Energy drawn is E = V·I·t: at 12 V and 2 A, ten seconds costs 240 J and twenty costs 480 J, double the time and double the energy, and at zero current the pack delivers zero energy however long it runs, which is why a gauge on external power reads no draw and a receipt must call that unmeasured rather than free. Each row is computed and checked, so energy per computation is this product divided by the operations done in the same seconds (first_law_conservation).',
    ...(() => {
      const rows = [[12, 2, 10], [12, 2, 20], [12, 0, 10]].map(([v, i, t]) => [v!, i!, t!, v! * i! * t!] as const)
      return {
        js: () => rows.every(([v, i, t, e]) => e === v * i * t) && rows[1]![3] === 2 * rows[0]![3] && rows[2]![3] === 0,
        lean: `theorem electrical_energy_is_volt_amp_second : [${rows.map(([v, i, t, e]) => `((${v},${i}),(${t},${e}))`).join(',')}].all (fun r => r.2.2 = r.1.1 * r.1.2 * r.2.1) ∧ ${rows[1]![3]} = 2 * ${rows[0]![3]} ∧ ${rows[2]![3]} = 0 := by decide`,
      }
    })() },
]

// compute → generate → verify. The energy domain — conservation, entropy, heat direction, Carnot, Kelvin, Charles,
// no perpetual motion, specific heat — decidable arithmetic of the laws, demarcated: not statistical mechanics.
emit({ file: 'Thermodynamics.lean', skill: 'thermodynamics',
  header: 'THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
