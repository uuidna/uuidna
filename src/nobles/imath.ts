/** Integer math without host Math.* (uuidna determinism law). */
export const imin = (a: number, b: number): number => (a < b ? a : b)
export const imax = (a: number, b: number): number => (a > b ? a : b)
export const iabs = (n: number): number => (n < 0 ? -n : n)
/** floor(n/d) for non-negative integers. */
export const idiv = (n: number, d: number): number => (n / d) | 0
/** ceil(n/d) for non-negative integers. */
export const iceilDiv = (n: number, d: number): number => ((n + d - 1) / d) | 0
/** count leading zero bits in a 32-bit word */
export const iclz32 = (n: number): number => {
  if (n === 0) return 32
  let c = 0
  let x = n >>> 0
  if ((x & 0xffff0000) === 0) { c += 16; x <<= 16 }
  if ((x & 0xff000000) === 0) { c += 8; x <<= 8 }
  if ((x & 0xf0000000) === 0) { c += 4; x <<= 4 }
  if ((x & 0xc0000000) === 0) { c += 2; x <<= 2 }
  if ((x & 0x80000000) === 0) { c += 1 }
  return c
}
