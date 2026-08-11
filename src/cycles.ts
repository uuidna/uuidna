// cycles — the recomputable number theory behind the rotations and the pentagram / Fibonacci-digit theorems, exposed
// as pure functions so an agent can compute what the sealed lean/*.lean facts prove. No Math.* — plain integer
// arithmetic only (the smoke test hard-rejects a host Math.* call: it is not a local theorem).
//
// Each mirrors a sealed theorem: coprime/gcd → circle_of_fifths & trinity_rosette_coprime; crt → the ℤ/21 ≅
// ℤ/3×ℤ/7 fusion; starPolygon → pentagram_single_stroke ({5/2}); fibonacciCycle → fib_single_digit_cycle_24 and its
// pentagram/rosette siblings; rotate → the discovery/vortex/rosette strands of the cross-link compass.

/** The greatest common divisor of |a| and |b| (Euclid) — plain integer arithmetic, no host math library. */
export function gcdInt(a: number, b: number): number {
  a = a < 0 ? -a : a
  b = b < 0 ? -b : b
  while (b) { const t = a % b; a = b; b = t }
  return a
}

/** Are a and b coprime? gcd(a,b) === 1 — the condition that makes a step permute ℤ/n and moduli fuse (CRT). */
export function coprime(a: number, b: number): boolean {
  return gcdInt(a, b) === 1
}

/** The star polygon {n/step}: the stroke visiting (step·k mod n) for k = 0..n−1. A SINGLE closed stroke covering all
 *  n points iff gcd(step,n)=1 (else it splits into gcd(step,n) shorter loops). Default {5/2} is the pentagram. */
export function starPolygon(n: number, step: number): { n: number; step: number; stroke: number[]; single: boolean; loops: number } {
  if (n < 1) throw new Error('cycles: n must be ≥ 1')
  const stroke = Array.from({ length: n }, (_, k) => (((step * k) % n) + n) % n)
  const g = gcdInt(((step % n) + n) % n, n) || n
  return { n, step, stroke, single: g === 1, loops: g }
}

/** The single-digit Fibonacci sequence mod m and its Pisano period: the cycle [F0,F1,… mod m] up to (but not
 *  including) the return to the seed pair (0,1). m=9 → period 24 (the digital-root Fibonacci); m=5 → 20; m=7 → 16. */
export function fibonacciCycle(m: number): { mod: number; period: number; cycle: number[] } {
  if (m < 1) throw new Error('cycles: modulus must be ≥ 1')
  const cycle: number[] = []
  let a = 0
  let b = 1
  do {
    cycle.push(a)
    const t = (a + b) % m
    a = b % m
    b = t
  } while (!(a === 0 && b === 1) && cycle.length < 100000)
  return { mod: m, period: cycle.length, cycle }
}

/** Rotate a list cyclically by `stride` and report its strand structure over ℤ/n: gcd(stride,n) strands of
 *  n/gcd each; `covers` is true when one strand visits every element (gcd = 1) — the closed cover of the compass. */
export function rotate<T>(list: readonly T[], stride: number): { rotated: T[]; strands: number; strandLength: number; covers: boolean } {
  const n = list.length
  if (!n) return { rotated: [], strands: 0, strandLength: 0, covers: false }
  const s = ((stride % n) + n) % n
  const rotated = list.map((_, i) => list[(i + s) % n])
  const g = gcdInt(s, n) || n
  return { rotated, strands: g, strandLength: n / g, covers: g === 1 }
}

/** The Chinese remainder solution: for coprime moduli m,n the unique x in [0, m·n) with x ≡ a (mod m) and
 *  x ≡ b (mod n) — the bijection ℤ/mn ≅ ℤ/m × ℤ/n (e.g. ℤ/21 ≅ ℤ/3 × ℤ/7, the trinity fused to the rosette). */
export function crt(a: number, m: number, b: number, n: number): { x: number; mod: number } {
  if (!coprime(m, n)) throw new Error(`cycles: CRT needs coprime moduli — gcd(${m},${n}) ≠ 1`)
  const N = m * n
  const am = ((a % m) + m) % m
  const bn = ((b % n) + n) % n
  for (let x = 0; x < N; x++) if (x % m === am && x % n === bn) return { x, mod: N }
  throw new Error('cycles: no CRT solution') // unreachable for coprime moduli
}
