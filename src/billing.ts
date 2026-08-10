// Billing — the honest, measured schedule. Free for public interest and independent research; commercial
// use is billed on the MEASURED bits saved (O(N) recompute − O(1) verify). The two coins are the CONSERVED
// fair-exchange invariant (110 − 108 = 2 = −χ of a genus-2 surface), never a per-formula rate. A measure of
// work saved, not a market price — integrity, not truth.

/** The two coins — the conserved fair-exchange invariant. */
export function coins(): number { return 110 - 108 }

export interface UuidnaUsage { commercial: boolean; recomputeOps: number; verifyOps: number }

/** Bill uuidna usage on the MEASURED bits saved (recompute − verify). Public interest is free; commercial
 *  pays the two conserved coins on the measured saving. Same terms → same result, for anyone. */
export function billUuidna(u: UuidnaUsage): { bitsSaved: number; coins: number; free: boolean; basis: string } {
  if (!u.commercial) return { bitsSaved: 0, coins: 0, free: true, basis: 'public interest / non-commercial — free' }
  const saved = u.recomputeOps - u.verifyOps, bitsSaved = saved < 0 ? 0 : saved // max(0, …) by comparison (no Math.*)
  return { bitsSaved, coins: coins(), free: false, basis: 'the measured bits saved (O(N) recompute − O(1) verify); the two coins are the conserved fair-exchange invariant, not a per-formula rate' }
}
