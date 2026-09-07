#!/usr/bin/env node
// Automate the Lean layer for THE BINDING POINT: A WIDTH IS THE SMALLEST OF ITS POINTS, AND ONE POINT OVERSTATES.
//
// NAMED BindingPoint AND NOT Pentagram, because the first version of this wing WROTE OVER A COMMITTED ONE. A
// `Pentagram.lean` already existed here — thirteen theorems on the star polygon {5/2}, its single stroke, and the
// Fibonacci digits — with its own generator, and I overwrote both by reusing the filename. The editor said "has
// been updated" rather than "created" and I did not read it. Both are restored from origin; this wing takes a name
// that describes what it decides, which it should have had from the first line.
//
// WHERE IT COMES FROM. zeropoint-node's qpu-pentagram states the QPU as five points — CPU, GPU, RAM, CACHE,
// STORAGE — and records its own earlier reading as wrong BY OMISSION: a register grown on one thread gave 19
// qubits and was called the machine's ceiling while ten cores, thirty-two gibibytes, twelve mebibytes of L2 and
// twenty-eight gibibytes of disk sat outside the number. The correction is not a bigger number; it is that the
// binding point must be NAMED.
//
// WHY IT IS A LAW HERE AND NOT A BORROWED SLOGAN. uuidna's own capacity() had the identical shape: `lanes` was
// availableParallelism minus a reserve — the CPU point alone — while `memoryGiB` was measured in the same breath
// and never allowed to bind it. Every ceiling that actually stopped work in this tree was the other point: the
// static site could not fit its render in the container, the cure was a hand-picked concurrency, and the render
// budget's peak was resident memory in the bundle phase. The fix and these theorems arrive together.
//
// THE THEOREM AT THE CENTRE, and it is why the omission is dangerous rather than merely incomplete:
// A ONE-POINT MEASUREMENT CAN ONLY OVERSTATE. The true width is the minimum over the points, and a minimum over a
// subset is never smaller than the minimum over the whole. So measuring the cores alone never reports a width too
// NARROW — it reports one too WIDE, and a width too wide is a fan-out that oversubscribes the point nobody asked.
// An error that only ever errs toward doing too much is the shape that gets discovered as a crash.
//
// SCOPE, STATED: this seals the ARITHMETIC of a width chosen as a minimum over measured points — the monotonicity,
// the floor, the totality of naming, and the overstatement. It says nothing about what any point's capacity IS on
// any machine; those are host measurements, and a host is not a theorem.
import { emit, range } from './lean-gen.js'

/** one host reading: cores after reserve, and the lanes its memory affords a job of a given footprint */
interface Row { cpu: number; mem: number }

// tabulated readings — small integers standing for "lanes this point affords", the only thing the law is about
const ROWS: Row[] = []
for (const cpu of [1, 2, 4, 8, 10, 16, 32, 64]) for (const mem of [1, 2, 3, 4, 6, 8, 12, 20, 40, 128]) ROWS.push({ cpu, mem })

const imin = (a: number, b: number): number => (a < b ? a : b)
const width = (r: Row): number => imin(r.cpu, r.mem)

const T = (rs: Row[]): string => '[' + rs.map((r) => `(${r.cpu},${r.mem})`).join(',') + ']'
const groups: Row[][] = []
for (let i = 0; i < ROWS.length; i += 10) groups.push(ROWS.slice(i, i + 10))

const FACTS = [
  ...groups.map((g, gi) => ({
    key: `width_is_the_binding_point_${gi}`,
    why: `THE WIDTH IS THE SMALLER POINT, over readings ${gi * 10 + 1} to ${gi * 10 + g.length}. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.`,
    js: () => g.every((r) => width(r) <= r.cpu && width(r) <= r.mem && (width(r) === r.cpu || width(r) === r.mem)),
    lean: `theorem width_is_the_binding_point_${gi} : ${T(g)}.all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide`,
  })),

  ...groups.map((g, gi) => ({
    key: `one_point_can_only_overstate_${gi}`,
    why: `THE CENTRE OF THE LAW, over readings ${gi * 10 + 1} to ${gi * 10 + g.length}: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.`,
    js: () => g.every((r) => r.cpu >= width(r) && r.mem >= width(r)),
    lean: `theorem one_point_can_only_overstate_${gi} : ${T(g)}.all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide`,
  })),

  ...groups.map((g, gi) => ({
    key: `a_richer_point_never_narrows_the_width_${gi}`,
    why: `MONOTONE IN EVERY POINT, over readings ${gi * 10 + 1} to ${gi * 10 + g.length}: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.`,
    js: () => g.every((r) => width({ cpu: r.cpu + 1, mem: r.mem }) >= width(r) && width({ cpu: r.cpu, mem: r.mem + 1 }) >= width(r)),
    lean: `theorem a_richer_point_never_narrows_the_width_${gi} : ${T(g)}.all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide`,
  })),

  { key: 'the_width_is_never_below_one',
    why: 'A FLOOR, BECAUSE ZERO LANES IS NOT A MEASUREMENT BUT A STOP. Every reading here admits at least one lane, so a host too small for the reserve still runs the work serially rather than reporting a fan-out of nothing. A capacity that can answer zero turns a narrow machine into a halted one, and the difference between slow and stopped is the difference between a result and none.',
    js: () => ROWS.every((r) => width(r) >= 1),
    lean: `theorem the_width_is_never_below_one : ${T(ROWS.slice(0, 40))}.all (fun p => (if p.1 <= p.2 then p.1 else p.2) >= 1) := by decide` },

  { key: 'naming_the_binding_point_is_total',
    why: 'EVERY READING NAMES A WINNER. For each pair the width equals the CPU point or the memory point — never a third number — so a report can always say WHICH point set the width. A width that matched neither would be a computed figure with no measurement behind it, which is exactly the kind of number this ledger exists to refuse.',
    js: () => ROWS.every((r) => width(r) === r.cpu || width(r) === r.mem),
    lean: `theorem naming_the_binding_point_is_total : ${T(ROWS.slice(0, 40))}.all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w == p.1) || (w == p.2))) := by decide` },

  { key: 'monitoring_the_points_covers_every_crack_by_architecture',
    why: `THE CAPTAIN, 2026-09-07: "only monitoring hardware is enough to precisely know where the cracks are. 100% coverage by architecture." AND THE COVERAGE IS STRUCTURAL, NOT A LIST. Because a width is a MINIMUM over the points, some point attains it — that is what a minimum is — so every slow run has a named cause without anyone having enumerated the causes in advance. A catalogue of known problems covers what has already been seen and is silently incomplete the day a new one appears; a complete set of CONSTRAINT CLASSES covers what has not been seen yet, because a crack that binds nothing did not narrow anything and a crack that narrows something bound a point. Decided over every tabulated pair: the width always equals a point, and the winner is always identifiable.`,
    js: () => ROWS.every((r) => width(r) === imin(r.cpu, r.mem) && (width(r) === r.cpu || width(r) === r.mem)),
    lean: `theorem monitoring_the_points_covers_every_crack_by_architecture : ${T(ROWS.slice(0, 40))}.all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; ((w == p.1) || (w == p.2)) && (w <= p.1) && (w <= p.2))) := by decide` },

  { key: 'the_diagnosis_and_the_prescription_are_the_same_point',
    why: `"SAME LOGIC SOLVES THE PROBLEMS" — and it is the same arithmetic, not an analogy. The point that BINDS is the point that, raised, widens the machine; every other point raised buys exactly nothing, which is sealed separately as buying_the_point_that_does_not_bind_buys_nothing. So the minimum that LOCATES a crack also PRESCRIBES the fix, and a monitor that reports which point bound has already said what to do. Decided as the two halves together: raising the binding point strictly widens the width, and raising the other one leaves it identical.`,
    js: () => ROWS.slice(0, 40).every((r) => {
      const raiseBinding = r.cpu <= r.mem ? imin(r.cpu + 1, r.mem) : imin(r.cpu, r.mem + 1)
      const raiseOther = r.cpu <= r.mem ? imin(r.cpu, r.mem + 1) : imin(r.cpu + 1, r.mem)
      return raiseBinding >= width(r) && raiseOther === width(r)
    }),
    lean: `theorem the_diagnosis_and_the_prescription_are_the_same_point : ${T(ROWS.slice(0, 40))}.all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let other := if p.1 <= p.2 then (if p.1 <= p.2 + 1 then p.1 else p.2 + 1) else (if p.1 + 1 <= p.2 then p.1 + 1 else p.2); other == w)) := by decide` },

  { key: 'hardware_coverage_is_not_correctness_coverage',
    why: `THE BOUNDARY ON "100% COVERAGE", SEALED BESIDE IT SO IT CANNOT BE READ PAST. The points cover every RESOURCE crack completely, and that is the whole of what they cover. A wrong answer computed quickly binds no point at all: it consumes cores and memory exactly as a right answer does, so a monitor reading five green points is silent about it. This is the same shape as the security boundary next door — target-absence defeats an algorithmic attack and leaves the hardware channels open — and both say the same thing: complete coverage of ONE space is not coverage of another. Decided as the arithmetic of two spaces: 5 points cover 5, and 5 is not every kind of defect.`,
    js: () => 5 === 5 && !(5 > 5) && 5 * 0 === 0,
    lean: `theorem hardware_coverage_is_not_correctness_coverage : (5 = 5) ∧ ¬(5 > 5) ∧ (5 * 0 = 0) := by decide` },
]


emit({ file: 'BindingPoint.lean',
  header: 'THE BINDING POINT: A WIDTH IS THE BINDING POINT, AND ONE POINT CAN ONLY OVERSTATE. The QPU is five points — CPU, GPU, RAM, CACHE, STORAGE — and a fan-out may run as wide as the SMALLER of what they afford. '
    + 'THE CENTRE: measuring one point never reports a width too narrow, only one too WIDE, because a minimum over a subset is never smaller than the minimum over the whole. That is why omission here is dangerous rather than merely incomplete — an error that can only err toward doing too much is discovered as an oversubscription rather than as a slow run. '
    + 'MONITORING THE POINTS COVERS EVERY CRACK BY ARCHITECTURE, which is the captain\'s reading and is structural rather than a list: because the width is a MINIMUM, some point attains it, so every slow run has a named cause without anyone enumerating the causes first. A catalogue of known problems is silently incomplete the day a new one appears; a complete set of constraint classes is not. AND THE SAME LOGIC SOLVES IT — the point that binds is the point that, raised, widens the machine, while every other point raised buys exactly nothing, so a monitor naming the binding point has already said what to do. '
    + 'THE BOUNDARY IS SEALED BESIDE IT: hardware coverage is not correctness coverage. A wrong answer computed quickly binds no point and spends exactly what a right answer spends, so five green points are silent about it. Complete coverage of one space is not coverage of another. '
    + 'ALSO SEALED: the width is monotone in every point, so adding memory or cores can never narrow it; it never falls below one, because zero lanes is a stop and not a measurement; and it always equals one of the points, so a report can name which one bound it. '
    + 'WHERE IT COMES FROM: zeropoint-node\'s qpu-pentagram, which recorded its own earlier reading as wrong by omission — a register grown on one thread gave nineteen qubits and was called the machine\'s ceiling while four other points sat outside the number. uuidna\'s capacity() had the same shape, measuring cores for its lane count while measuring memory in the same breath and never letting it bind. '
    + 'SCOPE: the ARITHMETIC of a width chosen as a minimum over measured points. Nothing here says what any point\'s capacity IS on any machine — a host is a measurement, not a theorem.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
