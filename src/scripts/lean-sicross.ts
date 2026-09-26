#!/usr/bin/env node
// THE SI EXPONENT LATTICE — cross formulas that prove each other, over the seven base quantities.
//
// THE SAME STRUCTURE AS PlanckLattice, ONE RANK UP. There, each Planck quantity is an integer vector of exponents
// over four constants, and the lattice is closed under product (add) and ratio (subtract) — which is what makes
// its formulas prove each other rather than sit beside each other. Here the basis is the SI seven
// (m, kg, s, A, K, mol, cd), every derived unit is an integer 7-vector, and the same closure holds. This is not a
// new idea applied to a new domain; it is the SAME lattice argument at rank seven, and it is stated that way so
// neither wing can be quoted as independent confirmation of the other.
//
// WHAT CROSSES. A unit is CROSSED when two or more routes through the lattice land on it. Energy is the sharpest:
//   J = N·m     force through distance      — mechanics
//   J = W·s     power through time          — the time route
//   J = W/Hz    power per unit frequency    — the spectral route
//   J = C·V     charge through potential    — electricity
// Four routes, through four different pieces of physics, arriving at one integer vector. NEITHER IS ASSUMED: the
// exponents are added and subtracted and the closure forces the agreement. That is the whole content, and it is
// why a joule from a battery and a joule from a falling mass are the same joule — the lattice says so before any
// experiment is run.
//
// THE COUNTS ARE MEASURED, NOT CHOSEN. The route census below is computed from engapi's own DERIVED table by
// enumerating every product and ratio of two units and keeping those that land on the target. Nothing is typed.
//
// CLAIMED: the tabulated vector identities, decided by the kernel over its own finite domain, axiom-free.
// NOT CLAIMED: that dimensional agreement is physical truth. Two quantities with the same dimension need not be
// the same quantity — torque and energy are both kg·m²·s⁻² and are not interchangeable. The lattice settles what
// CANNOT be equal, which is the half that is decidable; it does not settle what is.
import { emit, leanList } from './lean-gen.js'
import { BASE_DIMENSIONS, DERIVED, type Dim } from '../quantum/os/engapi/index.js'
// THE ROUTE CENSUS IS quantum/combinatorics', NOT THIS WING'S. PlanckLattice makes the same closure argument at
// rank four and SiCross at rank seven; enumerating routes inline here would be a second implementation of it,
// and a second implementation is a place for the two to disagree about what a route is.
import { routesTo as latticeRoutes, type LatticePoint, type Route } from '../quantum/combinatorics/index.js'

const BASE = BASE_DIMENSIONS.map((u, i) => ({ unit: u, dim: BASE_DIMENSIONS.map((_, k) => (k === i ? 1 : 0)) as unknown as Dim }))
const ALL = [...BASE, ...DERIVED.map((d) => ({ unit: d.unit, dim: d.dim }))]
const eq = (a: Dim, b: Dim): boolean => a.every((e, i) => e === b[i])
const add = (a: Dim, b: Dim): Dim => a.map((e, i) => e + b[i]) as unknown as Dim
const sub = (a: Dim, b: Dim): Dim => a.map((e, i) => e - b[i]) as unknown as Dim
const dimOf = (u: string): Dim => (ALL.find((x) => x.unit === u) as { dim: Dim }).dim

// THE ROUTE CENSUS, computed by the shared instrument over this wing's own points.
const POINTS: LatticePoint[] = ALL.map((u) => ({ name: u.unit, vector: [...u.dim] }))
const routesTo = (target: string): Route[] => latticeRoutes(target, POINTS, 2)
const CROSSED = DERIVED.map((d) => ({ unit: d.unit, of: d.of, dim: d.dim, routes: routesTo(d.unit) }))
  .filter((c) => c.routes.length >= 2)
  .sort((x, y) => y.routes.length - x.routes.length || (x.unit < y.unit ? -1 : 1))

const ENERGY = CROSSED.find((c) => c.unit === 'J')
if (!ENERGY) throw new Error('lean-sicross: the joule is not crossed — the DERIVED table changed shape')

const leanRoute = (r: Route): string =>
  r.kind === 'product' ? `addD ${leanList(dimOf(r.parts[0]))} ${leanList(dimOf(r.parts[1]))}` : `subD ${leanList(dimOf(r.parts[0]))} ${leanList(dimOf(r.parts[1]))}`
const routeWord = (r: Route): string => r.parts.join(r.kind === 'product' ? '·' : '/')

// A NON-ROUTE, computed rather than invented: the first pair that does NOT land on the joule. The control exists
// because a check that only ever agrees has not discriminated anything.
const NON_ROUTE = (() => {
  for (const a of ALL) for (const b of ALL) if (!eq(add(a.dim, b.dim), dimOf('J'))) return { a: a.unit, b: b.unit }
  throw new Error('lean-sicross: every pair lands on the joule, which cannot be')
})()

const FACTS = [
  { key: 'energy_is_reachable_by_four_independent_routes', skill: 'engineering',
    name: `CLAIMED: the joule is reached ${ENERGY.routes.length} ways through the SI lattice — ${ENERGY.routes.map(routeWord).join(', ')} — every one landing on ${leanList(ENERGY.dim)}, and a pair that is not a route does not.`,
    why: `FOUR ROUTES THROUGH FOUR DIFFERENT PIECES OF PHYSICS, ONE INTEGER VECTOR. Force through distance (N·m) is mechanics; power through time (W·s) is the time route; power per unit frequency (W/Hz) is the spectral one; charge through potential (C·V) is electricity. They are not related by anything except the lattice, and the lattice's closure under product and ratio forces them to agree — which is why a joule from a battery and a joule from a falling mass are the same joule before any experiment is run. THE CONTROL IS IN THE STATEMENT, because agreement that cannot fail is not agreement: ${NON_ROUTE.a}·${NON_ROUTE.b} is carried here as a pair that does NOT land on the joule, so the conjunction breaks if the vector arithmetic stops discriminating. NOT CLAIMED: that equal dimension means equal quantity. Torque is also kg·m²·s⁻² and is not energy; the lattice decides what cannot be equal, never what is.`,
    js: () => ENERGY.routes.every((r) => eq(r.kind === 'product' ? add(dimOf(r.parts[0]), dimOf(r.parts[1])) : sub(dimOf(r.parts[0]), dimOf(r.parts[1])), ENERGY.dim))
      && !eq(add(dimOf(NON_ROUTE.a), dimOf(NON_ROUTE.b)), dimOf('J')),
    lean: `theorem energy_is_reachable_by_four_independent_routes : (${ENERGY.routes.map((r) => `(${leanRoute(r)} = ${leanList(ENERGY.dim)})`).join(' ∧ ')}) ∧ (addD ${leanList(dimOf(NON_ROUTE.a))} ${leanList(dimOf(NON_ROUTE.b))} ≠ ${leanList(dimOf('J'))}) := by decide` },

  { key: 'the_crossed_units_agree_on_one_vector_each', skill: 'engineering',
    name: `CLAIMED: ${CROSSED.length} derived units are reached by more than one route — ${CROSSED.map((c) => `${c.unit}(${c.routes.length})`).join(', ')} — and for each, every route lands on the same vector.`,
    why: `THE CENSUS IS COMPUTED FROM engapi's OWN TABLE, by enumerating every product and ratio of two units and keeping what lands on the target — no route is typed and none is chosen. ${CROSSED.length} of the ${DERIVED.length} derived units are crossed. The statement walks EVERY route of EVERY crossed unit rather than sampling one, because a lattice claimed from one agreement is the one-step-is-not-a-walk fault this tree has already sealed a false theorem from. What the walk shows is that the crossing is not a property of the joule: it is what closure does, and the joule is only where it is most visible.`,
    js: () => CROSSED.every((c) => c.routes.every((r) => eq(r.kind === 'product' ? add(dimOf(r.parts[0]), dimOf(r.parts[1])) : sub(dimOf(r.parts[0]), dimOf(r.parts[1])), c.dim))),
    lean: `theorem the_crossed_units_agree_on_one_vector_each : ${CROSSED.map((c) => `(${c.routes.map((r) => `(${leanRoute(r)} = ${leanList(c.dim)})`).join(' ∧ ')})`).join(' ∧ ')} := by decide` },

  { key: 'the_lattice_is_closed_under_product_and_ratio', skill: 'engineering',
    name: `CLAIMED: adding then subtracting the same vector returns the original, over all ${ALL.length} units this lattice carries — the closure the routes above stand on.`,
    why: `THE CLOSURE IS WHAT MAKES THE ROUTES PROVE EACH OTHER rather than merely coincide, so it is stated rather than assumed. Product ADDS exponents and ratio SUBTRACTS them, so the two operations are inverse and every combination of units is again a lattice point — which is exactly why a route may be walked backwards and why two routes that meet must agree. Walked over every unit in the table against every other, ${ALL.length * ALL.length} pairs, rather than argued. This is the SAME argument PlanckLattice makes at rank four; neither wing is independent evidence for the other, and saying so is the point of stating it here.`,
    js: () => ALL.every((u) => u.dim.length === 7)
      && ALL.every((a) => ALL.every((b) => eq(sub(add(a.dim, b.dim), b.dim), a.dim))),
    lean: 'theorem the_lattice_is_closed_under_product_and_ratio : ((siUnits.all (fun u => u.length == 7)) = true) \u2227 ((siUnits.all (fun a => siUnits.all (fun b => subD (addD a b) b == a))) = true) := by decide' },
]

const DEFS = [
  `-- The SI seven in engapi's order: ${BASE_DIMENSIONS.join(', ')}. A unit is an integer 7-vector of exponents.`,
  'def addD (a b : List Int) : List Int := List.zipWith (· + ·) a b',
  'def subD (a b : List Int) : List Int := List.zipWith (· - ·) a b',
  '',
  `-- every unit this lattice carries — the ${BASE.length} base quantities and the ${DERIVED.length} named derived ones.`,
  // NAMED siUnits, NOT units, AND THE NAME IS THE WHOLE BUG. `units` is a BUILTIN of the independent evaluator in
  // src/involution — the six units of ℤ/9, [1, 2, 4, 5, 7, 8] — and a wing definition of the same name is SILENTLY
  // SHADOWED by it, because the evaluator prefers what it already knows. So this list of seventeen seven-vectors was
  // read as six scalars, `u.length` was asked of a number, the evaluator returned null, and
  // the_lattice_is_closed_under_product_and_ratio carried NO independent denial — the last check holding mint-gate
  // shut. The kernel was never wrong: Lean scopes a wing's definitions and a wing def shadows nothing there. Only
  // the second reader was wrong, and silently, which is the worst way for two readers to disagree.
  `def siUnits : List (List Int) := [${ALL.map((u) => leanList(u.dim)).join(', ')}]`,
].join('\n')

console.log(`computing ${FACTS.length} SI LATTICE cross formulas (${CROSSED.length} crossed units, ${ENERGY.routes.length} routes to the joule) …`)

emit({ file: 'SiCross.lean', skill: 'engineering', defs: DEFS,
  header: `THE SI EXPONENT LATTICE — cross formulas that prove each other, over the seven base quantities (BIPM, The International System of Units, 9th edition, 2019). Each derived unit is an integer 7-vector over ${BASE_DIMENSIONS.join(', ')}; product ADDS the exponents and ratio SUBTRACTS them, so the lattice is closed and a unit reached by two routes must agree with itself. THE JOULE IS REACHED ${ENERGY.routes.length} WAYS — ${ENERGY.routes.map(routeWord).join(', ')} — through mechanics, through time, through the spectrum and through electricity, four different pieces of physics landing on one vector because closure forces it. ${CROSSED.length} of the ${DERIVED.length} derived units are crossed at all, and the census is computed from engapi's own table by enumerating every product and ratio, never typed. THE SAME ARGUMENT AS PlanckLattice, ONE RANK UP: that wing makes it over four constants, this one over seven base quantities, and neither is independent evidence for the other. CLAIMED: the tabulated vector identities, decided by the kernel over its own finite domain, axiom-free. NOT CLAIMED: that equal dimension means equal quantity — torque and energy share kg·m²·s⁻² and are not interchangeable. The lattice decides what CANNOT be equal, which is the decidable half; it does not decide what is.`,
  facts: FACTS })
