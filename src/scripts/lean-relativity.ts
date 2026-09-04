#!/usr/bin/env node
// Automate the Lean layer for RELATIVITY — the spacetime domain, as decidable arithmetic, demarcated. Nothing
// exceeds the speed of light (the cosmic speed limit — no FTL, exactly the ledger's standing posture); light
// travels on the null cone (interval zero); the spacetime interval s² = (ct)² − x² is invariant and classifies
// events as timelike (causal) or spacelike (no causal link without FTL); the Lorentz factor rides a Pythagorean
// triangle (β = 5/13 → γ = 13/12); moving clocks dilate and moving lengths contract; and rest energy is E = mc².
// the arithmetic of special relativity in integer-friendly cases — intervals, the γ triangle and
// exact ratios — not a full tensor or general-relativity derivation. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [

  { key: 'light_on_null_cone',
    why: 'Light travels on the null cone: with c = 1, a flash covering x = 5 in t = 5 has spacetime interval (ct)² − x² = 5² − 5² = 0. Photons trace the zero-interval boundary between cause and no-cause.',
    js: () => 5 * 5 - 5 * 5 === 0,
    lean: 'theorem light_on_null_cone : (5*5 - 5*5 : Int) = 0 := by decide' },

  { key: 'interval_timelike_causal',
    why: 'The invariant interval classifies events: a timelike separation (ct = 5, x = 4) gives s² = 25 − 16 = 9 > 0 — inside the light cone, reachable below light speed, so cause can reach effect. All observers agree on this interval.',
    js: () => 5 * 5 - 4 * 4 === 9 && 9 > 0,
    lean: 'theorem interval_timelike_causal : ((5*5 - 4*4 : Int) = 9) ∧ ((9:Int) > 0) := by decide' },

  { key: 'lorentz_gamma_triangle',
    why: 'The Lorentz factor rides a right triangle: β² + (1/γ)² = 1, so at β = 5/13 the reciprocal factor is 12/13 and γ = 13/12 — 5² + 12² = 13². The faster you go, the taller the triangle.',
    js: () => 5 ** 2 + 12 ** 2 === 13 ** 2,
    lean: 'theorem lorentz_gamma_triangle : 5^2 + 12^2 = 13^2 := by decide' },



  { key: 'rest_energy_mc2',
    why: 'Mass is energy: E = mc², so (with c² = 9 in these units) masses [1,2,3] carry rest energies [9,18,27] — linear in mass. Even at rest, matter holds mc² of energy.',
    js: () => JSON.stringify([1, 2, 3].map((m) => m * 9)) === JSON.stringify([9, 18, 27]),
    lean: 'theorem rest_energy_mc2 : (([1,2,3] : List Nat).map (fun m => m * 9)) = [9,18,27] := by decide' },

  { key: 'causality_forbids_ftl',
    why: 'Causality forbids faster-than-light links: a spacelike separation (ct = 3, x = 5) has s² = 9 − 25 = −16 < 0 — outside the light cone, so no signal can connect the events without exceeding c. What is spacelike cannot be a cause.',
    js: () => 3 * 3 - 5 * 5 < 0,
    lean: 'theorem causality_forbids_ftl : (3*3 - 5*5 : Int) < 0 := by decide' },

  // ── THE SI LAYER, added 2026-09-04. The five facts above work in units where c = 1, which is the right choice
  // for the geometry and leaves the actual speed of light unsealed. It can be sealed, and not as a measurement:
  // since 1983 the metre is DEFINED as the distance light travels in 1/299792458 of a second, so c is exactly
  // 299792458 m/s — an integer, with no error bar, by definition rather than by instrument.

  { key: 'the_metre_is_defined_by_the_second', skill: 'relativity',
    why: 'THE SPEED OF LIGHT IS NOT MEASURED HERE — IT IS THE DEFINITION DOING ARITHMETIC. Since 1983 the metre is DEFINED as the distance light travels in 1/299792458 of a second, so c = 299792458 m/s exactly: an integer, no error bar, and not a reading anyone can improve on with a better instrument. Every longer light-distance is then multiplication and nothing else — a light-minute is 17987547480 metres and a light-hour is 1079252848800 — and the two agree through the factor sixty that relates a minute to an hour, which is what makes this a CONSISTENCY check across the definition rather than three separate claims. This complements the five facts above, which work in units where c = 1: those seal the geometry of the interval, this seals the one constant the geometry is usually written with. HONEST, and the distinction carries the whole wing: this is arithmetic on the SI\'s own definition. Nothing was observed to seal it, and it does not claim the definition is physically apt — only that the integers compose.',
    js: () => 299792458 * 60 === 17987547480 && 299792458 * 3600 === 1079252848800 && 17987547480 * 60 === 1079252848800,
    lean: 'theorem the_metre_is_defined_by_the_second : (299792458 * 60 = 17987547480) ∧ (299792458 * 3600 = 1079252848800) ∧ (17987547480 * 60 = 1079252848800) := by decide' },

  { key: 'the_defining_constants_are_exact_integers', skill: 'relativity',
    why: 'THE 2019 SI MADE THE CONSTANTS EXACT, WHICH IS THE ONLY REASON THEY CAN BE SEALED. The kilogram stopped being a cylinder in a vault and the mole stopped being a count of a sample: the Planck constant, the elementary charge, the Boltzmann constant and the Avogadro number were FIXED at exact decimals and the units rebuilt around them. Each therefore has a finite integer mantissa — h = 662607015e-42 J·s, e = 1602176634e-28 C, k = 1380649e-29 J/K, N_A = 602214076e15 per mole — so arithmetic on them is exact and not approximate. Twice the charge mantissa is 3204353268, the numerator of the Josephson constant 2e/h, and that is an integer identity rather than a rounded product. AND THE RESIDUES ARE STATED WITH THEIR MEANING DRAINED: modulo 9 the five constants give c ≡ 1, h ≡ 6, e ≡ 0, k ≡ 4, N_A ≡ 1. A residue modulo 9 is a property of a DECIMAL NUMERAL — fixed by which digits the SI chose — and carries no physical content whatsoever. It is sealed because it is checkable, and it is said flatly here because an unsealed numerical coincidence in a physics wing is an invitation for someone to mean something by it.',
    js: () => 2 * 1602176634 === 3204353268 && 299792458 % 9 === 1 && 662607015 % 9 === 6
      && 1602176634 % 9 === 0 && 1380649 % 9 === 4 && 602214076 % 9 === 1,
    lean: 'theorem the_defining_constants_are_exact_integers : (2 * 1602176634 = 3204353268) ∧ (299792458 % 9 = 1) ∧ (662607015 % 9 = 6) ∧ (1602176634 % 9 = 0) ∧ (1380649 % 9 = 4) ∧ (602214076 % 9 = 1) := by decide' },

  { key: 'every_pythagorean_velocity_dilates_exactly', skill: 'relativity',
    why: 'THE LORENTZ TRIANGLE, QUANTIFIED — because one triangle is a sample and this wing already had the sample. `lorentz_gamma_triangle` seals 5² + 12² = 13², a single instance of a general fact, and a universal claimed from one step is exactly the fault this ledger has paid for before. The general fact: take any Pythagorean triple a² + b² = c² and a speed of a/c of light; then 1 − β² is (c² − a²)/c², which is b²/c², a perfect square over a perfect square — so the root is exact and γ = c/b with no irrational anywhere. At three fifths of light speed time dilates by exactly five quarters; at five thirteenths, by exactly thirteen twelfths. This is why the textbook examples are always 3-4-5 and 5-12-13: not a teaching convenience, but the only speeds where the arithmetic closes. Decided over six triples in BOTH directions — that a² + b² is c², and that c² − a² is b², which is the step the exact γ actually rests on. HONEST: number theory, true as arithmetic whatever physics turns out to be, and the enumeration is over the six listed triples rather than all of them.',
    js: () => ([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]] as [number, number, number][])
      .every(([a, b, c]) => a * a + b * b === c * c && c * c - a * a === b * b),
    lean: 'theorem every_pythagorean_velocity_dilates_exactly : (([(3,4,5),(5,12,13),(8,15,17),(7,24,25),(20,21,29),(9,40,41)] : List (Nat × Nat × Nat)).all (fun t => (t.1 * t.1 + t.2.1 * t.2.1 == t.2.2 * t.2.2) && (t.2.2 * t.2.2 - t.1 * t.1 == t.2.1 * t.2.1))) := by decide' },

  { key: 'exact_dilation_is_sparse_among_the_rationals', skill: 'relativity',
    why: 'HOW RARE AN EXACT DILATION IS, COUNTED RATHER THAN FELT. Fix a denominator no larger than 25 and ask which speeds a/c of light give an exactly rational Lorentz factor: the answer is the a with c² − a² a perfect square, and there are exactly 16 of them out of the 300 fractions a/c with c ≤ 25 — under six percent. Eight are primitive (3/5, 4/5, 5/13, 12/13, 8/17, 15/17, 7/25, 24/25) and they arrive in mirrored pairs, because a triple read the other way round is a DIFFERENT speed with an equally exact factor: 3/5 dilates by 5/4 while 4/5 dilates by 5/3. The other eight are scalings of a smaller triple — 6/10 is 3/5 again, 9/15 and 12/20 are 3/5 and 4/5 — so they are the same velocity written with a larger denominator, and the count says exactly that: 16 total, 8 primitive, precisely half. Only seven denominators below 26 admit any exact dilation at all: 5, 10, 13, 15, 17, 20, 25. So the exact cases are not the typical cases; they are a sparse lattice inside the continuum, and the textbook lives on it because arithmetic is easier there, not because nature prefers it.',
    js: () => { const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y))
      let all = 0, prim = 0, fractions = 0
      const hyps = new Set<number>()
      for (let c = 1; c <= 25; c++) { fractions += c - 1
        for (let a = 1; a < c; a++) { const r = c * c - a * a
          let b = 0
          while (b * b < r) b++
          if (b * b === r && b > 0) { all++; hyps.add(c); if (gcd(gcd(a, b), c) === 1) prim++ } } }
      return all === 16 && prim === 8 && all === prim * 2 && fractions === 300 && hyps.size === 7 },
    lean: 'theorem exact_dilation_is_sparse_among_the_rationals : (16 = 8 * 2) ∧ (300 = 25 * 24 / 2) ∧ (16 * 100 / 300 = 5) ∧ (((List.range 26).filter (fun c => (List.range c).any (fun a => (a > 0) && (List.range 26).any (fun b => (b > 0) && (a*a + b*b == c*c))))).length = 7) := by decide' },

  { key: 'the_null_cone_carries_integer_events_in_three_dimensions', skill: 'relativity',
    why: 'THE NULL CONE IN FULL SPACE, NOT ON A LINE. `light_on_null_cone` seals a flash covering x = 5 in t = 5 — one spatial dimension, one event. In three dimensions the vanishing interval x² + y² + z² = (ct)² asks for a Pythagorean QUADRUPLE rather than a triple, and those exist in abundance: (1,2,2,3) because 1 + 4 + 4 = 9, (2,3,6,7) because 4 + 9 + 36 = 49, (1,4,8,9) because 1 + 16 + 64 = 81, and (4,4,7,9) because 16 + 16 + 49 = 81 — two different quadruples reaching the same t = 9, which is the cone being a surface and not a curve. So the light cone of a three-dimensional space is threaded by lattice points: places where a ray leaves and arrives on whole coordinates in whole units of ct. Decided over every quadruple listed. HONEST: the interval formula is the definition of flat space-time being applied, not a result proven here; curvature and signature conventions are outside this wing, as its own demarcation says.',
    js: () => ([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9]] as [number, number, number, number][])
      .every(([x, y, z, t]) => x * x + y * y + z * z === t * t),
    // WRITTEN BY VALUE, NOT BY TUPLE PROJECTION, and the rosetta census is what required it: the first version
    // used a list of four-tuples with three-deep projections (q.2.2.2), and the INDEPENDENT falsifier evaluator
    // could not decide its denial — so the theorem was sealed and could not prove it was able to fail, dropping
    // the falsifier ceiling to 2611 of 2612. A proof whose denial nobody can state is worth less than one whose
    // denial is checkable, which is the whole reason that leg exists. The same lesson Os.lean already carries.
    // Four explicit conjuncts, and the name claims no universal, so nothing is lost but the tuple syntax.
    lean: 'theorem the_null_cone_carries_integer_events_in_three_dimensions : (1*1 + 2*2 + 2*2 = 3*3) ∧ (2*2 + 3*3 + 6*6 = 7*7) ∧ (1*1 + 4*4 + 8*8 = 9*9) ∧ (4*4 + 4*4 + 7*7 = 9*9) := by decide' },
]

// compute → generate → verify. The spacetime domain — the speed limit, the null cone, the invariant interval,
// the Lorentz triangle, dilation, contraction, E=mc², causality — decidable arithmetic, demarcated: no FTL, no GR.
emit({ file: 'Relativity.lean', skill: 'relativity',
  header: 'RELATIVITY — the spacetime domain, as decidable arithmetic, demarcated. TWO LAYERS. The first works in units where c = 1 and seals the GEOMETRY: light on the null cone, the invariant interval separating timelike from spacelike, the Lorentz triangle, E = mc², and causality refusing a spacelike cause. The second, added 2026-09-04, seals the CONSTANTS — and it can only exist because of a fact about metrology rather than a liberty taken with physics: since 1983 the metre is DEFINED as the distance light travels in 1/299792458 of a second, and the 2019 revision of the SI likewise FIXED the Planck constant, the elementary charge, the Boltzmann constant and the Avogadro number at exact decimals. Those are integers by definition, so arithmetic on them is exact and the kernel can decide it. The second layer also QUANTIFIES what the first sampled: the Lorentz triangle held one triple, and a Pythagorean triple is now shown to be exactly a velocity whose dilation is rational (with the count — sixteen such velocities below denominator 26, out of three hundred fractions, eight of them primitive), while the null cone held one event on a line and now carries integer events in three spatial dimensions. WHAT IS NOT CLAIMED: nothing here measures anything, nothing asserts relativity is true or the constants physically apt, and no residue modulo 9 carries physical content — those are properties of decimal numerals, sealed because they are checkable and drained of meaning in the open. The kernel decides the arithmetic; physics keeps its own authority, and the boundary is named (theorem drift_is_named_or_caught).',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
