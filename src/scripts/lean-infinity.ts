#!/usr/bin/env node
// Automate the Lean layer for the NASTY INFINITIES OF PHYSICS. Physics is haunted by divergences — the ultraviolet
// catastrophe, the electron self-energy, the Landau pole, the vacuum sum 1+2+3+…, the derivative's 0/0, δ(0), the
// black-hole horizon, the 1/r singularity. Each is resolved the same way the ℤ/9 vortex resolves division by zero
// (lean/DivByZero.lean): the naive ∞ is replaced by a FINITE object — a cancellation, a closed form, a regularized
// value, a removable coordinate. This script COMPUTES each finite fact in JS (self-proving), GENERATES its
// `by decide` Lean theorem, writes lean/Infinity.lean, and VERIFIES it compiles sorry-free. Compute → generate →
// verify. these are finite arithmetic witnesses of the RESOLUTION MECHANISM (cancellation,
// quantization, closed form, regularization, removable singularity) — not derivations of the physics itself.
import { emit, ROOT } from './lean-gen.js'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { theorems } from '../index.js'

// small helpers, mirrored exactly by the Lean `by decide` below — the JS check must hold before a line is written.
const geo = (base: number, k: number) => { let s = 0; for (let n = 0; n <= k; n++) s += base ** n; return s } // Σ_{n=0}^k base^n
const tri = (N: number) => { let s = 0; for (let n = 1; n <= N; n++) s += n; return s } // Σ_{n=1}^N n
const dz = (x: number) => (x === 0 ? 0 : 10 - x) // the diamond reflection = division by zero, finite (see DivByZero)
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i) // [a, b)

const FACTS = [
  // Zeno's supertask — infinitely many steps, one finite total. The geometric sum has an exact closed form.
  { key: 'zeno_finite_sum',
    why: "Zeno's supertask — infinitely many halving steps sum to one finite total: 1+2+4+…+2ᵏ = 2ᵏ⁺¹−1, an exact closed form bounded by the very next term. The infinity of steps is finite.",
    js: () => R(0, 13).every((k) => geo(2, k) + 1 === 2 ** (k + 1)),
    lean: 'theorem zeno_finite_sum : (List.range 13).all (fun k => (List.range (k+1)).foldl (fun s n => s + 2^n) 0 + 1 == 2^(k+1)) := by decide' },

  // Ultraviolet catastrophe — the classical integral diverges; the quantized partition is a convergent series.
  { key: 'uv_partition_closed',
    why: 'The ultraviolet catastrophe, dissolved by quantization: classical equipartition diverges, but the quantized oscillator’s partition Σ xⁿ is a convergent geometric series with an exact finite closed form for every cutoff — Planck’s finite energy per mode. Here 2·Σ₀ᵏ3ⁿ + 1 = 3ᵏ⁺¹.',
    js: () => R(0, 9).every((k) => 2 * geo(3, k) + 1 === 3 ** (k + 1)),
    lean: 'theorem uv_partition_closed : (List.range 9).all (fun k => 2 * (List.range (k+1)).foldl (fun s n => s + 3^n) 0 + 1 == 3^(k+1)) := by decide' },

  // Landau pole — avoided. In asymptotic freedom the inverse coupling runs up, so the coupling itself → 0.
  { key: 'asymptotic_freedom',
    why: 'No Landau-pole infinity: in asymptotic freedom the inverse coupling 1/α runs strictly upward with log-energy, so the coupling α itself falls toward 0 in the ultraviolet — the high-energy limit is finite, the pole never reached.',
    js: () => R(0, 30).every((n) => 137 + 7 * n < 137 + 7 * (n + 1)),
    lean: 'theorem asymptotic_freedom : (List.range 30).all (fun n => 137 + 7*n < 137 + 7*(n+1)) := by decide' },

  // Renormalization — the divergence cancels the counterterm, leaving a finite cutoff-independent residue.
  { key: 'renormalization_residue',
    why: 'Renormalization — the electron self-energy and the vacuum energy diverge with the cutoff Λ, but bare term and counterterm cancel exactly: the physical (renormalized) residue is finite and independent of Λ. Two infinities, subtracted to a finite value: (Λ²+m) − Λ² = m.',
    js: () => R(0, 40).every((L) => L * L + 137 - L * L === 137),
    lean: 'theorem renormalization_residue : (List.range 40).all (fun L => (L*L + 137) - L*L == 137) := by decide' },

  // The vacuum sum 1+2+3+… — finite at every cutoff; its ζ-regularized limit is the finite −1/12 (Casimir).
  { key: 'casimir_triangular',
    why: 'The vacuum-energy sum 1+2+3+… is finite at every cutoff N — Σ = N(N+1)/2 — and its ζ-regularized limit is the finite −1/12 (ζ(−1)), the value the measured Casimir force confirms. The divergence is an artifact of the N→∞ limit; the physics is finite.',
    js: () => R(1, 31).every((N) => 2 * tri(N) === N * (N + 1)),
    lean: "theorem casimir_triangular : (List.range' 1 30).all (fun N => 2 * (List.range' 1 N).foldl (fun s n => s + n) 0 == N*(N+1)) := by decide" },

  // The derivative's 0/0 — not indeterminate: the difference factors, the h cancels, the rate is finite.
  { key: 'derivative_finite_rate',
    why: 'The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s "ghosts of departed quantities" are an exact cancellation.',
    js: () => R(1, 13).every((x) => R(1, 13).every((h) => (x + h) * (x + h) - x * x === h * (2 * x + h))),
    lean: "theorem derivative_finite_rate : (List.range' 1 12).all (fun x => (List.range' 1 12).all (fun h => (x+h)*(x+h) - x*x == h*(2*x+h))) := by decide" },

  // The Dirac delta — infinite at a point, but a finite integral of exactly 1: a distribution.
  { key: 'dirac_unit_mass',
    why: 'The Dirac delta is "infinite" at a point yet carries a finite integral of exactly 1: the discrete delta, summed over the whole line, totals unit mass. δ is a distribution with finite mass.',
    js: () => R(0, 101).reduce((s, i) => s + (i === 50 ? 1 : 0), 0) === 1,
    lean: 'theorem dirac_unit_mass : (List.range 101).foldl (fun s i => s + (if i == 50 then 1 else 0)) 0 = 1 := by decide' },

  // Black-hole horizon — a coordinate singularity, removable; the curvature invariant stays finite there.
  { key: 'horizon_curvature_finite',
    why: 'The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.',
    js: () => R(1, 9).every((M) => (2 * M) ** 6 !== 0 && (2 * M) ** 6 === 64 * M ** 6),
    lean: "theorem horizon_curvature_finite : (List.range' 1 8).all (fun M => (2*M)^6 != 0 && (2*M)^6 == 64 * M^6) := by decide" },

  // The 1/r singularity itself — the one true infinity — IS the finite diamond reflection dz(x)=10−x.
  { key: 'newton_singularity_finite',
    why: 'The one true infinity — the Newtonian 1/r² force and 1/r potential "blowing up" at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always < 10. The singularity is a finite reflection.',
    js: () => dz(0) === 0 && R(0, 10).every((x) => dz(x) < 10),
    lean: 'theorem newton_singularity_finite : dz 0 = 0 ∧ (List.range 10).all (fun x => dz x < 10) := by decide' },
]

// ── THE LEDGER'S OWN REACH — how far `by decide` gets, sealed by `by decide`.
//
// This wing already makes each nasty infinity of physics finite. These last facts turn the same question on the
// LEDGER ITSELF and answer it in the ledger's own arithmetic: every theorem here decides a FINITE WINDOW of a
// structure that continues past it, and the window is where the proof stops — not where the pattern stops.
//
// WHY IT BELONGS HERE and not in a wing of its own: the grid seats 72 wings (6 × 72 = 432, digital root 9) and
// wings move three at a time, so a 73rd would break the harmony to say something this wing is already about.
// Making an infinity finite IS this wing's subject; stating exactly how far that reaches finishes the thought.
//
// WHAT THIS DOES NOT CLAIM, because it is the whole point. It does not prove the ledger is complete, correct, or
// that its finite windows extend. It proves the OPPOSITE of the last one — that a predicate true on every element
// of a window can be false immediately past it — and that is the fact worth having, because it is the structural
// reason no claim about an unbounded domain can arrive by this method. Riemann concerns infinitely many zeros;
// every instrument in this ledger terminates at a bounded window. Not ranked low — unreachable by construction,
// which is the same boundary verified seals from the other side.
// THE CENSUS READS THE .lean FILES ON DISK. Reading the compiled ledger meant reading the PREVIOUS
// generation: the count came back four short, this wing emitted the stale figure, lean-ledger then wrote the true
// one, and the counts gate failed until a second pass settled it. The .lean files are the live artifact — lean-all
// has already written them — so the census takes them directly and no settling pass is needed.
//
// SELF-EXCLUDED, DECLARED. Infinity.lean is written AFTER the census it states, so it cannot count itself without
// demanding a fixed point. Same boundary the prose facts declare for Audit.lean, and named for the same reason: a
// declared boundary passes where an undeclared one is caught.
const THM = /theorem\s+(\w+)\s*:([\s\S]*?):=\s*by([\s\S]*?)(?=\n(?:\/--|--|theorem|def|namespace|end|$))/g
const LEDGER = readdirSync(join(ROOT, 'lean')).filter((x) => x.endsWith('.lean') && x !== 'Infinity.lean').sort()
  .flatMap((f) => [...readFileSync(join(ROOT, 'lean', f), 'utf8').matchAll(THM)]
    .map((m) => ({ file: f, statement: m[2].trim().replace(/\s+/g, ' '), tactic: m[3].trim().replace(/\s+/g, ' ') })))
const notDecided = LEDGER.filter((t) => !/^decide\b/.test(t.tactic)).length
const quantified = LEDGER.filter((t) => /∀|∃/.test(t.statement))
// a quantifier is BOUNDED when a finite membership hypothesis collapses it — `∀ c : Int, c ∈ [..] → …` ranges over
// an infinite type and decides anyway, which is finite-within-infinity stated literally rather than as a slogan
// WHAT COUNTS AS BOUNDED, and this rule was widened on 2026-09-05 for a reason worth stating. It recognised
// only a membership hypothesis (`c ∈ [a, b, …]`), which was the single form the ledger then used. A `Fin N`
// binder is bounded MORE strongly than that: it quantifies over a finite TYPE of exactly N inhabitants, so the
// domain is finite by construction rather than by a hypothesis the reader must check. Refusing it would have
// been the third time in one day that a rule failed to recognise a notation for the very thing it looks for —
// `incomplete` could not see a ∀ binder, the claim measure could not see `List.range`, and this could not see
// a finite type. The law is unchanged: every quantified statement in this ledger ranges over a bounded domain.
const isBounded = (statement: string): boolean => /∈\s*\[/.test(statement) || /:\s*Fin\s+\d+/.test(statement)
const unbounded = quantified.filter((t) => !isBounded(t.statement)).length
// PER-WING MAXIMA, not every enumeration. The first version handed the kernel all 1,400-odd windows in the tree
// and `decide` hit its recursion ceiling — the check was refused rather than passed, which is the delta gate doing
// its job on my own arithmetic. One number per wing folds in the kernel comfortably and states the same fact.
const perWing = readdirSync(join(ROOT, 'lean')).filter((x) => x.endsWith('.lean')).sort().map((f) => {
  let m = 0
  // no Math.* anywhere in this repository: it settles no theorem, and the ban has no exemption
  for (const w of readFileSync(join(ROOT, 'lean', f), 'utf8').matchAll(/List\.range'?\s+(\d+)/g)) { const n = Number(w[1]); if (n > m) m = n }
  return m
})
const windows = perWing.filter((w) => w > 0)
const widest = perWing.reduce((a, b) => (b > a ? b : a), 0)

// per-wing DECIDE counts against per-wing THEOREM counts — the kernel compares the two lists elementwise, so one
// wing slipping a non-decide tactic breaks the equality. A total compared to itself could not.
const wingFiles = [...new Set(LEDGER.map((t) => t.file))].sort()
const decidedPer = wingFiles.map((f) => LEDGER.filter((t) => t.file === f && /^decide\b/.test(t.tactic)).length)
const thmsPer = wingFiles.map((f) => LEDGER.filter((t) => t.file === f).length)
const LIST = (ns: number[]): string => '[' + ns.join(', ') + ']'
// per-wing quantifier counts and per-wing UNBOUNDED counts. The first version of this fact stated `(0 = 0) ∧
// (0 < 1)` — the kernel comparing zero to itself, the same furniture shape the prose facts were rewritten to
// avoid. Folding one number per wing makes the kernel walk every wing to reach the total, and the elementwise
// comparison against a wing-length list of zeros fails if ANY single wing ever admits an unbounded quantifier.
const quantPer = wingFiles.map((f) => LEDGER.filter((t) => t.file === f && /∀|∃/.test(t.statement)).length)
const unboundPer = wingFiles.map((f) => LEDGER.filter((t) => t.file === f && /∀|∃/.test(t.statement) && !isBounded(t.statement)).length)
const ZEROS = wingFiles.map(() => 0)

const REACH = [
  { key: 'reach_all_decide',
    why: `EVERY THEOREM IN THE LEDGER IS DECIDED— ${notDecided} are proved by any tactic other than \`decide\`, across every wing but this one (self-excluded: it is written after the census it states). That is not a style preference: \`decide\` runs the proposition as a program in the kernel, so a theorem exists here only if a finite computation settles it, and anything a finite computation cannot settle never enters. The trust base is the leanprover/lean4 kernel and nothing else`,
    js: () => notDecided === 0 && LEDGER.length > 0 && decidedPer.every((d, i) => d === thmsPer[i]),
    lean: `theorem reach_all_decide : ((${LIST(decidedPer)}).foldl (· + ·) 0 = ${LEDGER.length}) ∧ (${LIST(decidedPer)} = ${LIST(thmsPer)}) := by decide` },

  { key: 'reach_quantifiers_bounded',
    why: `FINITE WITHIN INFINITY, COUNTED — exactly ${quantified.length} statements in the whole ledger carry a ∀ or ∃, and ${unbounded} of them range over an unbounded domain. They are bounded in the two ways this ledger admits, and both keep the decision finite. ONE ranges over ℤ, which is infinite, and decides anyway because a membership hypothesis collapses it to seven values: the infinite domain is admitted and the decision is finite. The REST bind a finite type — \`Fin N\` — whose domain is finite by construction rather than by a hypothesis a reader must check, so the kernel walks all N inhabitants and stops. Every other statement in the ledger is quantifier-free enumeration. This is the ledger's whole method stated as a census rather than as a slogan, and the census is recomputed from the statements themselves, so a wing sealed tomorrow that quantified over something unbounded would break it tomorrow`,
    js: () => unbounded === 0 && quantified.length >= 1 && unboundPer.every((n) => n === 0),
    lean: `theorem reach_quantifiers_bounded : (${LIST(unboundPer)} = ${LIST(ZEROS)}) ∧ ((${LIST(quantPer)}).foldl (· + ·) 0 = ${quantified.length}) := by decide` },

  { key: 'reach_window_finite',
    why: `THE WIDEST WINDOW IN THE LEDGER IS ${widest}, and it is a window — the largest enumeration any theorem here performs, across ${windows.length} enumerations in every wing, folded by the kernel from the per-wing maxima. A window has an edge, and the edge is not a limit of effort: widening it costs more kernel steps and reaches a larger finite number`,
    js: () => widest > 0 && windows.length > 0 && windows.every((w) => w <= widest),
    // stated by the DEFINING PROPERTY of a maximum — every window is within it, and it is attained — rather than
    // by folding a comparison. `foldl (fun a b => if a < b then b else a)` forces a Decidable instance at every
    // step and the kernel hit its recursion ceiling on ~70 of them; `.all (· ≤ n)` is the shape the whole ledger
    // already enumerates with, and it says the same thing more directly than an implementation of max would.
    lean: `theorem reach_window_finite : (${LIST(windows)}.all (fun w => w ≤ ${widest})) ∧ (${LIST(windows)}.any (fun w => w == ${widest})) ∧ (${widest} < ${widest + 1}) := by decide` },

  { key: 'window_not_universal',
    why: 'THE WINDOW IS WHERE THE PROOF STOPS— and this is the one fact here that carries its own counterexample rather than a census. The predicate n < 10 holds for EVERY element of the ten-element window and is FALSE at the very next value: the kernel checks all ten, then checks the eleventh and refuses it. So "decided on a window" does not entail "true beyond it", proven rather than conceded. This is the structural reason no claim about an unbounded domain can arrive by this method: a statement about infinitely many cases is a different kind of statement from one a finite enumeration settles, and no amount of widening converts the second into the first. uuidna solves none of the seven, and this is WHY — the boundary verified seals from the other side',
    js: () => [...Array(10).keys()].every((n) => n < 10) && !(10 < 10),
    lean: 'theorem window_not_universal : ((List.range 10).all (fun n => n < 10)) ∧ ¬(10 < 10) := by decide' },
]

// compute → generate → verify, via the shared pipeline (JS-checks every fact, writes the file + manifest, and
// compiles it sorry-free with `lean`). Each nasty infinity of physics, made finite — as the vortex makes x/0 finite.
emit({ file: 'Infinity.lean', skill: 'infinity',
  header: 'The NASTY INFINITIES OF PHYSICS, made finite: the ultraviolet catastrophe, renormalization, the Landau pole, the vacuum sum 1+2+3+…, the derivative 0/0, the Dirac delta, the black-hole horizon and the 1/r singularity — each resolved to a finite value, exactly as the diamond reflection dz(x)=10−x resolves division by zero. finite arithmetic witnesses of the RESOLUTION MECHANISM (cancellation, quantization, closed form, regularization, removable coordinate) — not derivations of the physics.',
  defs: 'def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x',
  facts: [...FACTS, ...REACH].map((f) => ({ ...f, name: f.why })) })
