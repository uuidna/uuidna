import { bigPowModOf } from './index.js'
/**
 * Witnessed factoring. A factorization is a witness (N, p, q). Its check is exact integer arithmetic:
 * p·q = N with 1 < p < N and 1 < q < N. The check holds for any N, so the proof does not depend on how
 * the factors were found. The period search in shor.ts is a discovery step; its output is only shown when
 * this check passes.
 *
 * The constructed instance is a semiprime N = p·q with p and q each 500 bits, both at least 1.5·2^499 so that N
 * has 1000 bits. It is a demonstration of the check, not a secret challenge: p and q come from fixed public starts
 * in this file, so anyone can recompute them, and the served output returns them. The check is exact either way.
 * Primality of p and q is Miller–Rabin with fixed bases: a strong probable-prime test, not a proof.
 */

/** Modular exponentiation on BigInt. */

/** Miller–Rabin with fixed bases: deterministic for all n below 3.3·10^24, a strong probable-prime test above that. */
export const isProbablePrime = (n: bigint): boolean => {
  if (n < 2n) return false
  const small = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n]
  for (const p of small) {
    if (n === p) return true
    if (n % p === 0n) return false
  }
  let d = n - 1n
  let r = 0
  while ((d & 1n) === 0n) {
    d >>= 1n
    r++
  }
  for (const a of small) {
    let x = bigPowModOf(a, d, n)
    if (x === 1n || x === n - 1n) continue
    let composite = true
    for (let i = 1; i < r; i++) {
      x = (x * x) % n
      if (x === n - 1n) {
        composite = false
        break
      }
    }
    if (composite) return false
  }
  return true
}

/** The least probable prime at or above `start`. */
const nextPrimeOf = (start: bigint): bigint => {
  let c = start | 1n
  while (!isProbablePrime(c)) c += 2n
  return c
}

/** The witness check: exact integer arithmetic, recomputed on every call. */
export const witnessOf = (n: bigint, p: bigint, q: bigint) => {
  const product = p * q
  const nontrivial = p > 1n && q > 1n && p < n && q < n
  const holds = product === n && nontrivial
  return {
    kind: 'witness' as const,
    n: n.toString(),
    p: p.toString(),
    q: q.toString(),
    product: product.toString(),
    bits: n.toString(2).length,
    nontrivial,
    holds,
  }
}

/** The constructed 1000-bit demonstration instance: N = p·q with p and q each 500 bits, both primes from public fixed starts.
 *  Not a secret: the factors are derivable from this source and are returned in the output. */
export const constructedSemiprimeOf = () => {
  const p = nextPrimeOf((3n << 498n) + 0x5a17c0ffeen)
  const q = nextPrimeOf((3n << 498n) + 0x9e3779b97fn)
  const n = p * q
  return {
    ...witnessOf(n, p, q),
    primality: 'Miller–Rabin, fixed bases (strong probable-prime test, not a proof)',
    construction: 'p and q are the least odd integers at or above fixed starts 3·2^498 + 0x5a17c0ffee and 3·2^498 + 0x9e3779b97f that pass the test',
  }
}
