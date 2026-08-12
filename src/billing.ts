// Billing — the honest, measured schedule. Free for public interest and independent research; commercial
// use is billed on the measured ADVANTAGE — the difference of computational power between PRODUCING (O(N)
// recompute) and VERIFYING (O(1)). The two coins are the CONSERVED fair-exchange invariant (110 − 108 = 2 = −χ
// of a genus-2 surface); the advantage is the measured quantity they are priced on, never a market rate. And the
// whole bill is COMPLETE IN ITS OWN RECEIPT — a content-address of every term, so a bill is recomputed and
// checked, never trusted. A measure of work saved, not a market price — integrity, not truth.
import { toUuid } from './address.js'

/** The two coins — the conserved fair-exchange invariant. */
export function coins(): number { return 110 - 108 }

/** A uuid address is 128 bits — the FIXED budget a value is presented by, whatever its size. */
export const ADDRESS_BITS = 128

/** referenceBitsSaved(items, payloadBits) → the BITS saved by presenting `items` values by their 128-bit address
 *  instead of their full payload: items · (payloadBits − 128). The pigeonhole saving — present by reference and any
 *  number of values fits a fixed budget per item. HONEST: it is 0 when the payload is no larger than an address (a
 *  tiny value saves nothing by reference), so it never books a saving it did not make. Never negative. */
export function referenceBitsSaved(items: number, payloadBits: number): number {
  const per = payloadBits - ADDRESS_BITS
  return per <= 0 || items <= 0 ? 0 : items * per // max(0, …) by comparison (no Math.*)
}

export interface UuidnaUsage { commercial: boolean; recomputeOps: number; verifyOps: number }

/** Bill uuidna usage on the measured ADVANTAGE — the difference of computational power between producing (O(N)
 *  recompute) and verifying (O(1)). Public interest is free; commercial pays the two conserved coins on that
 *  advantage. The whole bill folds to a `receipt` (a content-address of every term), so a SKEPTIC recomputes the
 *  bill themselves and lands on the same receipt — the price is not trusted, it is rechecked. Same terms → same
 *  bill → same receipt, for anyone. */
export function billUuidna(u: UuidnaUsage): { advantage: number; bitsSaved: number; coins: number; free: boolean; receipt: string; basis: string } {
  const diff = u.recomputeOps - u.verifyOps
  const advantage = diff < 0 ? 0 : diff // max(0, …) by comparison (no Math.*) — the recompute-over-verify asymmetry
  const commercial = u.commercial
  const coinsDue = commercial ? coins() : 0
  const bitsSaved = commercial ? advantage : 0
  // the bill, COMPLETE in its receipt — recompute toUuid of these exact terms and the receipt returns, or the bill was altered
  const receipt = toUuid(`bill|commercial=${commercial}|advantage=${advantage}|bitsSaved=${bitsSaved}|coins=${coinsDue}`)
  return {
    advantage, bitsSaved, coins: coinsDue, free: !commercial, receipt,
    basis: commercial
      ? 'the two coins (conserved invariant, −χ of the double torus) priced on the measured ADVANTAGE — recompute O(N) minus verify O(1); the whole bill folds to this receipt, complete and recomputable by anyone who doubts it'
      : 'public interest / non-commercial — free (0 coins); the bill is still complete in this receipt, the advantage measured for anyone to recheck',
  }
}
