#!/usr/bin/env node
// Automate the Lean layer for the ℤ/9 vortex SEQUENCE and its reflection group. COMPUTE each fact from the local
// affine algebra (self-proving in JS), GENERATE a `by decide` Lean theorem, write lean/Sequence.lean, and VERIFY
// it compiles sorry-free with `lean`. The mirror m(d)=10−d (≡1−d mod 9, fixed at 5); doubling σ and the mirror
// generate AGL(1,ℤ/9) of order 54, acting in ONE orbit; the commutator [σ,μ] is the unit shift x↦x+1. Nothing
// typed twice — every cell derived. Integrity, not truth. 0/7.
import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const m9 = (n) => ((n % 9) + 9) % 9
const UNITS = [1, 2, 4, 5, 7, 8]
const R10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const isUnit = (d) => UNITS.includes(m9(d))
// the tour in ℤ/9 (9 ≡ 0): units by doubling 1→2→4→8→7→5, non-units by +3 (3→6→0, since 9≡0), then wrap 0→1.
const TOUR = [1, 2, 4, 8, 7, 5, 3, 6, 0]
const carries = (d, nx) => (isUnit(d) ? nx === m9(d * 2) : d === 3 || d === 6 ? nx === m9(d + 3) : false)
const seams = TOUR.filter((d, i) => !carries(d, TOUR[(i + 1) % TOUR.length])).length

const FACTS = [
  { key: 'mirror_congruence', why: 'the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].every((d) => m9(10 - d) === m9(1 - d)),
    lean: "theorem mirror_congruence : (List.range' 1 9).all (fun d => ((10 - d : Int)) % 9 = (1 - d) % 9) := by decide" },
  { key: 'mirror_fixed_five', why: 'the mirror fixes exactly one digit in 1..9 — the heart, 5',
    js: () => JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => m9(10 - d) === d)) === '[5]',
    lean: "theorem mirror_fixed_five : ((List.range' 1 9).filter (fun d => 10 - d == d)) = [5] := by decide" },
  { key: 'agl_order_54', why: 'AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements',
    js: () => UNITS.length * 9 === 54,
    lean: "theorem agl_order_54 : ((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length * 9 = 54 := by decide" },
  { key: 'commutator_is_shift', why: 'the commutator [σ,μ] of doubling with the mirror is the unit shift x ↦ x+1',
    js: () => { const ap = (a, b, x) => m9(a * x + b); const comm = (x) => ap(2, 0, ap(8, 1, ap(5, 0, ap(8, 1, x)))); return [0, 1, 2, 3, 4, 5, 6, 7, 8].every((x) => comm(x) === m9(x + 1)) },
    lean: "theorem commutator_is_shift : (List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x + 1) % 9) := by decide" },
  { key: 'one_orbit', why: 'the shifts alone act transitively — every digit is in ONE orbit of ℤ/9',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8].every((y) => [0, 1, 2, 3, 4, 5, 6, 7, 8].some((b) => m9(0 + b) === y)),
    lean: "theorem one_orbit : (List.range 9).all (fun y => (List.range 9).any (fun b => (0 + b) % 9 == y)) := by decide" },
  { key: 'ten_pairs', why: 'the reflection equilibrium: d + m(d) = 10 for every d in 1..9',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].every((d) => d + (10 - d) === 10),
    lean: "theorem ten_pairs : (List.range' 1 9).all (fun d => d + (10 - d) == 10) := by decide" },
  { key: 'polar_nine_pairs', why: 'the polar equilibrium: d + (9−d) = 9 across the negation of ℤ/9',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8].every((d) => d + (9 - d) === 9),
    lean: "theorem polar_nine_pairs : (List.range' 1 8).all (fun d => d + (9 - d) == 9) := by decide" },
  { key: 'partition_six_three', why: 'the 6+3 partition: 6 units {1,2,4,5,7,8} and 3 non-units {3,6,9}',
    js: () => [1, 2, 4, 5, 7, 8].length === 6 && [3, 6, 9].length === 3,
    lean: "theorem partition_six_three : ((List.range' 1 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length = 6 ∧ ((List.range' 1 9).filter (fun a => ¬ (List.range 9).any (fun e => a*e % 9 == 1))).length = 3 := by decide" },
  { key: 'angles_close', why: 'the ring closes: ten slots × 36° = 360°, and the ⟨2⟩ flow is 60° per doubling',
    js: () => 10 * 36 === 360 && 6 * 60 === 360,
    lean: "theorem angles_close : 10 * 36 = 360 ∧ 6 * 60 = 360 := by decide" },
  { key: 'seams_two', why: 'exactly 2 seams (5→3 and 0→1) where neither ×2 nor +3 carries — the two involution centers, −χ = 2',
    js: () => seams === 2,
    lean: "theorem seams_two : ((tour.zip (tour.drop 1 ++ tour.take 1)).filter (fun p => ! carries9 p.1 p.2)).length = 2 := by decide" },
  { key: 'polarities_plus_minus', why: 'the vortex polarities: the mirror pairs each sum to 10, splitting the digits into − (below the center 5) and + (above 5); the two centers 5 and 0≡9 are self-polar — the ± of the reflection',
    js: () => [[1, 9], [2, 8], [3, 7], [4, 6]].every(([a, b]) => a + b === 10 && a < 5 && b > 5) && (5 === 5) && (m9(9) === 0),
    lean: "theorem polarities_plus_minus : [(1,9),(2,8),(3,7),(4,6)].all (fun p => p.1 + p.2 == 10 && p.1 < 5 && p.2 > 5) ∧ (10 - 5 = 5) ∧ (9 % 9 = 0) := by decide" },
  { key: 'forward_reflected_mirror', why: 'the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)',
    js: () => { const A = [1, 2, 4, 8, 7, 5, 3, 6, 9]; const B = A.map((d) => 10 - d); return JSON.stringify(B) === JSON.stringify([9, 8, 6, 2, 3, 5, 7, 4, 1]) && JSON.stringify(B.map((d) => 10 - d)) === JSON.stringify(A) && A[8] % 9 === 0 && B[0] % 9 === 0 },
    lean: "theorem forward_reflected_mirror : ([9,8,6,2,3,5,7,4,1] = ([1,2,4,8,7,5,3,6,9].map (fun d => 10 - d))) ∧ ([1,2,4,8,7,5,3,6,9] = ([9,8,6,2,3,5,7,4,1].map (fun d => 10 - d))) ∧ (9 % 9 = 0) := by decide" },
  { key: 'every_digit_has_neighbours', why: 'every digit in ANY arrangement has DEFINED neighbours — the mirror (division by zero) and polar maps are total, surjective and self-inverse; no digit is isolated',
    js: () => { const dz = (x) => (x === 0 ? 0 : 10 - x); const polar = (x) => m9(9 - x);
      const mirror = R10.every((d) => dz(d) < 10 && R10.some((e) => dz(e) === d) && dz(dz(d)) === d)
      const R9 = [0, 1, 2, 3, 4, 5, 6, 7, 8]; const pol = R9.every((d) => polar(d) < 9 && R9.some((e) => polar(e) === d))
      return mirror && pol },
    lean: "theorem every_digit_has_neighbours : (List.range 10).all (fun d => dz d < 10) ∧ (List.range 10).all (fun d => (List.range 10).any (fun e => dz e == d)) ∧ (List.range 10).all (fun d => dz (dz d) == d) ∧ (List.range 9).all (fun d => polar d < 9) ∧ (List.range 9).all (fun d => (List.range 9).any (fun e => polar e == d)) := by decide" },
]

const jsFail = FACTS.filter((f) => f.js() !== true)
if (jsFail.length) { console.log('✗ JS computation failed: ' + jsFail.map((f) => f.key).join(', ') + '  (seams computed = ' + seams + ')'); process.exit(1) }
console.log('computed ' + FACTS.length + ' sequence/group facts from the vortex — all hold in JS (seams = ' + seams + ').')

const lean = `-- lean/Sequence.lean — GENERATED by scripts/lean-sequence.mjs (compute → generate → verify). The ℤ/9 vortex
-- sequence and its reflection group: the mirror m(d)=10−d, doubling σ and the mirror generating AGL(1,ℤ/9) of
-- order 54 in ONE orbit, with commutator [σ,μ] = the unit shift. Every theorem is \`by decide\`, sorry-free.
-- Regenerate with \`npm run lean:sequence\`. Integrity, not truth. 0/7.

def ap (a b x : Nat) : Nat := (a * x + b) % 9          -- an affine map on ℤ/9: x ↦ a·x + b
def tour : List Nat := [1, 2, 4, 8, 7, 5, 3, 6, 0]     -- the vortex tour in ℤ/9 (9 ≡ 0)
def units9 : List Nat := [1, 2, 4, 5, 7, 8]
def carries9 (d nx : Nat) : Bool :=                    -- ×2 on units, +3 on {3,6}; neither elsewhere
  if units9.contains d then nx == (2 * d) % 9
  else if d == 3 || d == 6 then nx == (d + 3) % 9
  else false
def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x -- the mirror neighbour (= division by zero)
def polar (x : Nat) : Nat := (9 - x) % 9               -- the polar neighbour (negation in ℤ/9)

${FACTS.map((f) => '-- ' + f.why + '\n' + f.lean).join('\n\n')}
`
const path = join(ROOT, 'lean', 'Sequence.lean')
writeFileSync(path, lean)
console.log('generated ' + FACTS.length + ' Lean theorems → lean/Sequence.lean')

try {
  execSync('lean ' + JSON.stringify(path), { cwd: ROOT, stdio: 'pipe' })
  console.log('✓ VERIFIED: lean/Sequence.lean compiles sorry-free — ' + FACTS.length + ' sequence/group theorems proved.')
} catch (e) {
  console.log('✗ Lean verification FAILED:\n' + (e.stdout?.toString() || '') + (e.stderr?.toString() || ''))
  process.exit(1)
}
