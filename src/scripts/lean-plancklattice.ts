#!/usr/bin/env node
// THE PLANCK EXPONENT LATTICE — cross formulas that prove each other, in clusters of lattice combinations.
//
// WHAT THE LATTICE IS. Each Planck quantity is a product of powers of four constants — the quantum of action, the
// gravitational constant, light speed, and Boltzmann's — so each is an integer vector of exponents over
// (hbar, G, c, k). The squares are used, which is what keeps every exponent an INTEGER and every theorem decidable:
//   length      l^2 = hbar G / c^3        -> ( 1,  1, -3,  0)
//   mass        m^2 = hbar c / G          -> ( 1, -1,  1,  0)
//   time        t^2 = hbar G / c^5        -> ( 1,  1, -5,  0)
//   temperature T^2 = hbar c^5 / (G k^2)  -> ( 1, -1,  5, -2)
// A ratio of two quantities SUBTRACTS their vectors and a product ADDS them, so every combination of Planck
// quantities is a lattice point and the lattice is closed under both. That closure is what makes the formulas prove
// each other rather than merely sit beside each other.
//
// THE CLUSTERS, and they are not chosen — they are what the arithmetic partitions the combinations into.
//   BOTH CONSTANTS CANCEL. Every quantity carries hbar to the first power, so hbar vanishes from EVERY ratio.
//   G vanishes too exactly when both quantities carry the same sign of G, and that is what splits the four into
//   two gravity classes: {length, time} at G^+1 and {mass, temperature} at G^-1. Of six pairs exactly two are
//   inside a class, and they give the two constant-free ratios — l/t = c and T/m = c^2/k.
//   PURE QUANTUM. A PRODUCT cancels G exactly when the two quantities sit in OPPOSITE classes, which is four of
//   the six pairs: l*m = hbar/c, t*m = hbar/c^2, l*T, t*T. hbar survives, doubled. Gravity has left.
//   PURE GRAVITY. A RATIO across the classes keeps G and loses hbar: l/m = G/c^2, t/m = G/c^3. Quantum has left.
// So sums and differences do OPPOSITE things to G, and the same thing to hbar. That duality is the finding.
//
// AND THIS IS WHERE THEY PROVE EACH OTHER. The constant-free ratio l/t is reachable two independent ways: as the
// difference of two PURE-QUANTUM products, (l*m)/(t*m), and as the difference of two PURE-GRAVITY ratios,
// (l/m)/(t/m). One route passes through a formula where gravity has cancelled, the other through one where the
// quantum has, and they arrive at the same vector. Neither is assumed; the lattice's closure forces the agreement,
// and the kernel checks it. The same closure crosses the two clusters back to the length itself: the pure-quantum
// product times the pure-gravity ratio is (hbar/c)(G/c^2) = hbar G / c^3, which is l^2 exactly.
//
// WHAT IS CLAIMED: the lattice arithmetic, in full — every vector identity below, closed by the Lean 4 kernel over
// its own finite domain, axiom-free, walked over all six pairs rather than sampled. WHAT IS NOT: that the Planck
// quantities are physically fundamental, or that anything is measurable at that scale. This is DIMENSIONAL
// ALGEBRA — the exponents are definitions, the combinations are arithmetic, and no experiment is invoked. The
// experimental record lives in lean/StringTheory.lean and says plainly that one probe of six has ever reached
// this scale. The constants' values are CODATA's; only their EXPONENTS appear here, and an exponent is a choice
// of unit, not a measurement.
import { add, sub } from '../quantum/combinatorics/index.js'
import { emit, leanList } from './lean-gen.js'

// ── THE FOUR VECTORS, over (hbar, G, c, k), squared so every exponent is an integer ────────────────────────────
// VECTOR ARITHMETIC COMES FROM THE LATTICE MODULE. `add` and `sub` were defined here and again, identically, in
// src/quantum/combinatorics — which was extracted FROM this file's structure for lean-sicross to share, and then
// this file went on using its own copies. A ratio subtracts vectors and a product adds them; that is the same
// operation at every rank, and the module refuses a lattice whose points disagree about the basis, which a local
// two-liner cannot, by construction: it holds one rank's arithmetic and the basis disagreement is between ranks, so
// the contradiction is never inside anything it reads.
const AXES = ['hbar', 'G', 'c', 'k'] as const
const L = [1, 1, -3, 0] as const   // length^2      = hbar G / c^3
const M = [1, -1, 1, 0] as const   // mass^2        = hbar c / G
const T = [1, 1, -5, 0] as const   // time^2        = hbar G / c^5
const K = [1, -1, 5, -2] as const  // temperature^2 = hbar c^5 / (G k^2)

const NAMED = [['planckLength', L], ['planckMass', M], ['planckTime', T], ['planckTemperature', K]] as const
const PAIRS = [[L, M], [L, T], [L, K], [M, T], [M, K], [T, K]] as const

const HBAR = 0, GRAV = 1
const bothCancel = PAIRS.filter(([a, b]) => sub(a, b)[HBAR] === 0 && sub(a, b)[GRAV] === 0).length
const sumsCancelG = PAIRS.filter(([a, b]) => add(a, b)[GRAV] === 0).length
// ── THE LATTICE IS COMBINATORIAL, SO THE FORMULAS ARE GENERATED RATHER THAN AUTHORED ──────────────────────────
//
// Six cross formulas were written here by hand first, and that was the wrong object. A lattice closed under
// addition does not HAVE a list of combinations, it generates them: every integer quadruple (a,b,c,d) is one, and
// the ones worth naming are picked out by which constants vanish. Those turn out to be LINEAR FORMS in the
// coefficients — every Planck quantity carries hbar once, so the hbar exponent of a(l) + b(m) + c(t) + d(T) is
// just a+b+c+d; the gravity signs are (+1,-1,+1,-1), so the G exponent is a-b+c-d. Cancellation is therefore not
// a property to be discovered pair by pair, it is the kernel of a linear map, and the six hand-picked pairs were
// samples of a structure rather than the structure.
//
// AND THAT IS WHAT LETS A FORMULA BE WRITTEN ON THE SPOT. Ask for any cancellation — pure quantum, pure gravity,
// constant-free — and the two forms solve it directly: h + g = 2(a+c) and h - g = 2(b+d). So a combination with
// prescribed exponents (h, g) exists EXACTLY when h and g share parity, and when it does the construction is
// immediate. No search, no enumeration, no authoring: state the cancellation, read off the coefficients.
const COEFFS = [-2, -1, 0, 1, 2]
const SMALL = [-1, 0, 1]
const boxOf = (cs: readonly number[]): number[][] => cs.flatMap((a) => cs.flatMap((b) => cs.flatMap((c) => cs.map((d) => [a, b, c, d]))))
const BOX = boxOf(COEFFS), SMALL_BOX = boxOf(SMALL)
const BASIS = [L, M, T, K] as const
const combine = (k: readonly number[]): number[] => [0, 1, 2, 3].map((j) => k.reduce((s, ki, i) => s + ki * BASIS[i]![j]!, 0))
const hbarForm = (k: readonly number[]): number => k.reduce((a, b) => a + b, 0)
const gravForm = (k: readonly number[]): number => k.reduce((s, ki, i) => s + ki * [1, -1, 1, -1][i]!, 0)
const TARGETS = COEFFS.flatMap((h) => COEFFS.map((g) => [h, g]))


const FACTS = [
  { key: 'the_quantum_of_action_cancels_on_a_linear_form', skill: 'planck-lattice',
    name: `CLAIMED: over all ${BOX.length} combinations in the box, hbar vanishes from a(l)+b(m)+c(t)+d(T) EXACTLY when a+b+c+d = 0 — cancellation is the kernel of a linear form, not a property found pair by pair.`,
    why: 'THE FORM IS WHY THE FORMULAS ARE GENERATED RATHER THAN AUTHORED. Every Planck quantity carries the quantum of action to the first power, so the hbar exponent of any integer combination is just the sum of its coefficients. The statement WALKS all 625 combinations of coefficients from -2 to 2 and checks the two sides agree in BOTH directions — the exponent is zero exactly when the sum is — so it is a characterisation and not an example. Once this holds, no combination ever needs its hbar exponent computed again: it is read off the coefficients.',
    js: () => BOX.every((k) => (combine(k)[0] === 0) === (hbarForm(k) === 0)),
    lean: 'theorem the_quantum_of_action_cancels_on_a_linear_form : box.all (fun k => ((nthI (combine k) 0) == 0) == (hbarForm k == 0)) = true := by decide' },

  { key: 'gravity_cancels_on_a_linear_form', skill: 'planck-lattice',
    name: `CLAIMED: over the same ${BOX.length} combinations, G vanishes EXACTLY when a−b+c−d = 0 — the second form, and the one whose signs are the two gravity classes.`,
    why: 'THE SECOND FORM IS THE GRAVITY CLASSES WRITTEN AS ARITHMETIC. Length and time carry G as +1, mass and temperature as -1, so the G exponent of a combination is a - b + c - d, and the classes that looked like a partition of six pairs are just the signs in this form. Walked over the same box and in both directions, so it characterises rather than illustrates. Together with the form above, the two of them turn every question about what a combination cancels into arithmetic on its coefficients.',
    js: () => BOX.every((k) => (combine(k)[1] === 0) === (gravForm(k) === 0)),
    lean: 'theorem gravity_cancels_on_a_linear_form : box.all (fun k => ((nthI (combine k) 1) == 0) == (gravForm k == 0)) = true := by decide' },

  { key: 'the_constant_free_combinations_are_a_rank_two_sublattice', skill: 'planck-lattice',
    name: `CLAIMED: a combination loses BOTH constants exactly when c = −a and d = −b — so it is a(l/t) + b(T/m), a rank-two sublattice whose basis is the two constant-free ratios themselves.`,
    why: 'THIS IS WHY THERE WERE EXACTLY TWO, and it says far more than the count did. Both forms vanish together when a+c = 0 and b+d = 0, which is precisely the condition that the combination is an integer combination of l/t and T/m. So the constant-free formulas are not two lucky pairs among six — they are a RANK-TWO SUBLATTICE, and those two ratios are its basis. Every constant-free formula there will ever be is c^i times (c^2/k)^j, and the enumeration that found two pairs was finding the basis rather than the whole set. Walked over the box in both directions.',
    js: () => BOX.every((k) => ((combine(k)[0] === 0 && combine(k)[1] === 0) === (k[2] === -k[0]! && k[3] === -k[1]!))),
    lean: 'theorem the_constant_free_combinations_are_a_rank_two_sublattice : box.all (fun k => (((nthI (combine k) 0) == 0) && ((nthI (combine k) 1) == 0)) == (((nthI k 2) == -(nthI k 0)) && ((nthI k 3) == -(nthI k 1)))) = true := by decide' },

  { key: 'a_combination_exists_exactly_when_its_exponents_share_parity', skill: 'planck-lattice',
    name: `CLAIMED: a Planck combination with prescribed exponents (h, g) on hbar and G EXISTS exactly when h and g share parity — checked over all ${TARGETS.length} targets against ${SMALL_BOX.length} combinations, both directions.`,
    why: "THE FORMULATE-ON-THE-SPOT LAW, and the reason this wing stopped authoring formulas. Adding and subtracting the two forms gives h + g = 2(a+c) and h - g = 2(b+d), so both must be even: a combination with the exponents you want exists if and only if those exponents share parity, and when they do the coefficients follow immediately from a+c = (h+g)/2 and b+d = (h-g)/2. Ask for pure gravity (0, 2) — same parity, so it exists, and a+c = 1, b+d = -1 gives l/m = G/c^2 at once. Ask for hbar without G at odd exponent (1, 0) — different parity, so NO combination of these four quantities has it, ever. The statement walks every target in the box and asserts existence agrees with parity in both directions, so it is a decision procedure and not a heuristic: it answers what can be written before anything is written.",
    js: () => TARGETS.every(([h, g]) => SMALL_BOX.some((k) => hbarForm(k) === h && gravForm(k) === g) === ((((h! - g!) % 2) + 2) % 2 === 0)),
    lean: 'theorem a_combination_exists_exactly_when_its_exponents_share_parity : targets.all (fun t => (smallBox.any (fun k => (hbarForm k == nthI t 0) && (gravForm k == nthI t 1))) == (((nthI t 0) - (nthI t 1)) % 2 == 0)) = true := by decide' },

  { key: 'every_planck_ratio_cancels_the_quantum_of_action', skill: 'planck-lattice',
    name: `CLAIMED: all four Planck quantities carry the quantum of action to the same power, so hbar vanishes from every one of the ${PAIRS.length} pairwise ratios — walked over all six, not sampled.`,
    why: 'THIS IS WHY THE LATTICE HAS CLUSTERS AT ALL, and it is the cheapest fact to check, so it goes first. Each squared Planck quantity is hbar to the first power times something; a ratio subtracts exponents; so the hbar exponent of any ratio is 1 - 1 = 0, for every pair without exception. The statement WALKS all six pairs rather than naming one — a universal in the name needs a quantifier in the statement, which is a fault this tree has sealed against itself before. What survives a ratio is therefore G and c alone, and that is the whole reason the gravity classes below decide anything.',
    js: () => PAIRS.every(([a, b]) => sub(a, b)[HBAR] === 0),
    lean: 'theorem every_planck_ratio_cancels_the_quantum_of_action : planckPairs.all (fun p => (ratio p.1 p.2).headD 0 == 0) = true := by decide' },

  { key: 'the_lattice_splits_into_two_gravity_classes', skill: 'planck-lattice',
    name: 'CLAIMED: the gravitational exponents are +1 for length and time and -1 for mass and temperature — two classes of two, which is the partition every other fact here turns on.',
    why: 'THE CLASSES ARE NOT A CHOICE, THEY ARE THE SIGN OF ONE EXPONENT. Length and time both put G in the numerator (l^2 = hbar G / c^3, t^2 = hbar G / c^5); mass and temperature both put it in the denominator (m^2 = hbar c / G, T^2 = hbar c^5 / G k^2). So the four quantities carry G as +1, -1, +1, -1 and split two and two. Stated as the exponent list itself so the claim is the data: nothing here is a label placed on top of the vectors, it is read off them.',
    js: () => [L, M, T, K].map((v) => v[GRAV]).join(',') === '1,-1,1,-1' && [L, M, T, K].every((v) => v.length === AXES.length),
    // THE AXES ARE NAMED AND THE VECTORS ARE COUNTED AGAINST THEM. planckAxes was vocabulary no theorem reached,
    // which the guard refuses and is right to: a definition nothing uses is research the wing does not do. It is
    // bound here because the binding is a real check — the four axis names and every exponent vector must have
    // the same arity, or a vector's third entry would not be the axis the prose says it is.
    lean: 'theorem the_lattice_splits_into_two_gravity_classes : (planckVectors.map (fun v => (v.drop 1).headD 0) = [1, -1, 1, -1]) ∧ (planckVectors.all (fun v => v.length == planckAxes.length) = true) := by decide' },

  { key: 'both_constants_cancel_exactly_inside_a_gravity_class', skill: 'planck-lattice',
    name: `CLAIMED: of the ${PAIRS.length} pairwise ratios exactly ${bothCancel} lose BOTH constants — and they are precisely the two pairs inside a gravity class: length over time, and temperature over mass.`,
    why: 'THE CONSTANT-FREE RATIOS ARE COUNTED, NOT NAMED, because a count walked over every pair is falsifiable where a list of two examples is not. hbar always cancels; G cancels only when the two exponents share a sign; so a ratio is free of both exactly when its pair lies inside one gravity class. There are two such pairs out of six, {length, time} and {mass, temperature}, and they give l/t = c and T/m = c^2/k. THAT THERE ARE TWO IS THE CORRECTION THIS FACT CARRIES: the pairing was first written here as unique, and enumerating the six pairs instead of reasoning about one found the second. A uniqueness claim that was never enumerated is the fault, and the enumeration is the cure.',
    js: () => bothCancel === 2,
    lean: `theorem both_constants_cancel_exactly_inside_a_gravity_class : (planckPairs.filter (fun p => freeOfBoth p.1 p.2)).length = ${bothCancel} := by decide` },

  { key: 'a_product_cancels_gravity_exactly_across_the_classes', skill: 'planck-lattice',
    name: `CLAIMED: a PRODUCT loses G exactly when its two quantities sit in opposite gravity classes — ${sumsCancelG} of the ${PAIRS.length} pairs, against the ${bothCancel} that lose it under a ratio. Sums and differences do opposite things to gravity.`,
    why: 'THIS IS THE DUALITY, AND IT IS THE REASON THE TWO CLUSTERS ARE DIFFERENT SHAPES. A ratio subtracts the G exponents and so cancels inside a class; a product adds them and so cancels across classes. Four of the six pairs are cross-class, so four products are purely quantum — length times mass is hbar/c, time times mass is hbar/c^2 — while only two ratios are constant-free. Both counts are walked over the same six pairs, which is what makes them comparable: the same enumeration, two different tests, two different answers, and the difference is the finding rather than a remark about it.',
    js: () => sumsCancelG === 4 && sumsCancelG !== bothCancel,
    // THE DUALITY IS STATED OVER THE TWO ENUMERATIONS, never as `4 ≠ 2`. A bare comparison of literals puts the
    // claim in the key and not in the algebra, which this tree's own `literal` finder refuses and was right to.
    lean: `theorem a_product_cancels_gravity_exactly_across_the_classes : ((planckPairs.filter (fun p => freeOfGravity p.1 p.2)).length = ${sumsCancelG}) ∧ ((planckPairs.filter (fun p => freeOfGravity p.1 p.2)).length ≠ (planckPairs.filter (fun p => freeOfBoth p.1 p.2)).length) := by decide` },

  { key: 'the_quantum_and_gravity_clusters_cross_to_the_length', skill: 'planck-lattice',
    name: 'CLAIMED: the pure-quantum product times the pure-gravity ratio returns the squared length exactly — (hbar/c)(G/c^2) = hbar G / c^3 — so the two clusters are not separate results, each is the other divided into the length.',
    why: 'A CROSS FORMULA IS ONE THE OTHERS PROVE, and this is the first of the two. length times mass has lost gravity; length over mass has lost the quantum; adding those two vectors returns the length twice over, because the mass appears once with each sign and cancels itself. So the pure-quantum and pure-gravity clusters are two halves of one decomposition rather than two findings: hbar/c and G/c^2 multiply back to hbar G / c^3. Nothing here is assumed about either cluster — the identity is checked on the vectors, and it is what makes the clusters a partition of the length rather than a pair of coincidences.',
    js: () => add(add(L, M), sub(L, M)).join(',') === add(L, L).join(','),
    lean: 'theorem the_quantum_and_gravity_clusters_cross_to_the_length : product (product planckLength planckMass) (ratio planckLength planckMass) = product planckLength planckLength := by decide' },

  { key: 'both_routes_to_light_speed_agree', skill: 'planck-lattice',
    name: `CLAIMED: the constant-free ratio is reachable through the quantum cluster and through the gravity cluster, and both routes land on ${leanList(sub(L, T))} — c^2 — with neither route assumed.`,
    why: 'THIS IS THE CROSS FORMULA THE WHOLE WING IS FOR. l/t carries no constants, and there are two independent ways to build it out of formulas that DO: divide the two pure-quantum products, (l*m)/(t*m), where gravity has already cancelled; or divide the two pure-gravity ratios, (l/m)/(t/m), where the quantum has. The first route never mentions G and the second never mentions hbar, they pass through different clusters, and they arrive at the same vector. The lattice closure is what forces that, and the kernel is what checks it — so the clusters prove each other rather than being two lists. The mass cancels out of both routes, which is why neither needs to know which class it came from.',
    js: () => sub(add(L, M), add(T, M)).join(',') === sub(sub(L, M), sub(T, M)).join(',')
      && sub(add(L, M), add(T, M)).join(',') === sub(L, T).join(','),
    lean: `theorem both_routes_to_light_speed_agree : (ratio (product planckLength planckMass) (product planckTime planckMass) = ${leanList(sub(L, T))}) ∧ (ratio (ratio planckLength planckMass) (ratio planckTime planckMass) = ${leanList(sub(L, T))}) := by decide` },
]

const DEFS = [
  // THE WALKS ARE BIG ON PURPOSE and the kernel needs headroom for them: the characterisations decide over 625
  // coefficient quadruples and the existence law over 81 combinations against 25 targets. `decide` unfolds those
  // structurally, so the default recursion limit stops it — raised here rather than shrinking the box, because a
  // characterisation that walks a smaller domain is a weaker claim wearing the same name.
  'set_option maxRecDepth 100000',
  '',
  `/-- The four axes the exponents run over, in order: ${AXES.join(', ')}. Named here so a vector's third entry is\n    never a bare position in prose. -/`,
  `def planckAxes : List String := [${AXES.map((a) => JSON.stringify(a)).join(', ')}]`,
  '',
  `/-- The four Planck quantities as integer exponent vectors over (${AXES.join(', ')}). The SQUARES are used, which\n    is what keeps every exponent an integer: length^2 = hbar G / c^3, mass^2 = hbar c / G, time^2 = hbar G / c^5,\n    temperature^2 = hbar c^5 / (G k^2). -/`,
  ...NAMED.map(([n, v]) => `def ${n} : List Int := ${leanList(v)}`),
  `def planckVectors : List (List Int) := [${NAMED.map(([n]) => n).join(', ')}]`,
  '',
  `/-- A product of two quantities ADDS their exponents; a ratio SUBTRACTS them. The lattice is closed under both,\n    which is what lets one combination prove another. -/`,
  'def product (a b : List Int) : List Int := List.zipWith (· + ·) a b',
  'def ratio (a b : List Int) : List Int := List.zipWith (· - ·) a b',
  '',
  `/-- The ${PAIRS.length} unordered pairs, enumerated so every census below WALKS them rather than naming examples. -/`,
  `def planckPairs : List (List Int × List Int) := [${PAIRS.map(([a, b]) => `(${leanList(a)}, ${leanList(b)})`).join(', ')}]`,
  '',
  `/-- freeOfBoth: the ratio keeps neither hbar nor G. freeOfGravity: the PRODUCT keeps no G. The two tests over the\n    same enumeration are what make their counts comparable. -/`,
  'def freeOfBoth (a b : List Int) : Bool := ((ratio a b).headD 0 == 0) && (((ratio a b).drop 1).headD 0 == 0)',
  'def freeOfGravity (a b : List Int) : Bool := ((product a b).drop 1).headD 0 == 0',
  '',
  `/-- THE COMBINATORIAL CORE. Every integer quadruple is a combination of the four quantities; combine reads off its\n    exponent vector, and the two forms read off what it cancels — hbarForm is a+b+c+d, gravForm is a−b+c−d. The\n    boxes are the finite domains the kernel walks: ${BOX.length} combinations for the characterisations, ${SMALL_BOX.length}\n    for the existence law, and ${TARGETS.length} targets for it to reach. -/`,
  'def basis : List (List Int) := [planckLength, planckMass, planckTime, planckTemperature]',
  '-- nthI — list indexing as decidable, AXIOM-FREE structural recursion: the Int form of lean-gen\'s `nth`.',
  '-- Lean\'s `List.getD` routes through the `propext` axiom under `by decide` and this recursion does not,',
  '-- which is why four theorems in this wing were the ledger\'s only non-kernel-only proofs until it was used.',
  'def nthI : List Int → Nat → Int',
  '  | [], _ => 0',
  '  | x :: _, 0 => x',
  '  | _ :: xs, Nat.succ n => nthI xs n',
  '',
  'def combine (k : List Int) : List Int :=',
  '  (List.range 4).map (fun j => ((List.zipWith (fun ki v => ki * (nthI v j)) k basis).foldl (· + ·) 0))',
  'def hbarForm (k : List Int) : Int := k.foldl (· + ·) 0',
  'def gravForm (k : List Int) : Int := (List.zipWith (· * ·) k [1, -1, 1, -1]).foldl (· + ·) 0',
  `def coeffs : List Int := ${leanList(COEFFS)}`,
  `def smallCoeffs : List Int := ${leanList(SMALL)}`,
  'def boxOf (cs : List Int) : List (List Int) :=',
  '  cs.flatMap (fun a => cs.flatMap (fun b => cs.flatMap (fun c => cs.map (fun d => [a, b, c, d]))))',
  'def box : List (List Int) := boxOf coeffs',
  'def smallBox : List (List Int) := boxOf smallCoeffs',
  'def targets : List (List Int) := coeffs.flatMap (fun h => coeffs.map (fun g => [h, g]))',
].join('\n')

console.log(`computing ${FACTS.length} PLANCK LATTICE cross formulas (clusters of lattice combinations) …`)

emit({ file: 'PlanckLattice.lean', skill: 'planck-lattice', defs: DEFS,
  header: `THE PLANCK EXPONENT LATTICE — cross formulas that prove each other, in clusters of lattice combinations. Each Planck quantity is a product of powers of four constants, so each is an integer vector of exponents over (${AXES.join(', ')}); the SQUARES are used, which keeps every exponent an integer and every theorem decidable. A product ADDS the vectors and a ratio SUBTRACTS them, so every combination is a lattice point and the lattice is closed under both — and that closure is what makes these formulas prove each other rather than sit beside each other. THE CLUSTERS ARE NOT CHOSEN, they are what the arithmetic partitions the six pairs into. Every quantity carries hbar to the first power, so hbar vanishes from EVERY ratio; G vanishes only when both quantities carry the same sign of G, which splits the four into two gravity classes, {length, time} at G^+1 and {mass, temperature} at G^-1. Exactly two of six pairs lie inside a class and give the constant-free ratios l/t = c and T/m = c^2/k. A PRODUCT cancels G across the classes instead — four of six pairs, the pure-quantum cluster, l*m = hbar/c and t*m = hbar/c^2. A RATIO across the classes keeps G and loses the quantum: l/m = G/c^2, t/m = G/c^3. Sums and differences therefore do OPPOSITE things to gravity and the same thing to the quantum, and that duality is the finding. WHERE THEY PROVE EACH OTHER: the constant-free l/t is reachable two independent ways — as the ratio of two pure-quantum products, where gravity has already cancelled, and as the ratio of two pure-gravity ratios, where the quantum has — and both routes land on the same vector without either being assumed. The same closure crosses the clusters back to the length: the pure-quantum product times the pure-gravity ratio is (hbar/c)(G/c^2) = hbar G / c^3, which is the squared length exactly. CLAIMED: the lattice arithmetic in full, every identity closed by the Lean 4 kernel over its own finite domain, axiom-free, and every census WALKED over all six pairs rather than sampled — a uniqueness claim written here without enumerating was how the second constant-free pair was missed, and the enumeration is the cure. NOT CLAIMED: that the Planck quantities are physically fundamental, or that anything is measurable at that scale. This is DIMENSIONAL ALGEBRA: the exponents are definitions and the combinations are arithmetic, with no experiment invoked. The experimental record lives in lean/StringTheory.lean and says plainly that one probe of six has ever reached this scale. Only the constants' EXPONENTS appear here, and an exponent is a choice of unit rather than a measurement.`,
  facts: FACTS })
