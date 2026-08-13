// spin — "spin the bits and get the coins" (the captain). Every DERIVED artifact must equal its own recomputation
// from the one audited ledger: a FIXED POINT. Re-deriving the whole layer to check that is O(N) (the slow gate).
// SPIN is the O(1) check: fold each derived file's bytes into its content-address and take the top-64 COIN
// (coin64) — one order-invariant fold (`store_fold_order_invariant`), no re-derivation. A file whose re-spun coin
// equals its sealed coin has not drifted; a file whose coin MOVED is the "non-quantum" drift — it is hard-rejected.
// This is the two-coin advantage made operational: recompute O(N) − verify O(1) (`verify_cheaper_than_forge`),
// priced on the conserved two coins (`two_coins`, `captain_computes_only_with_two_coins`). HONEST SCOPE: spin
// proves a file is unchanged SINCE ITS LAST SEAL (self-consistency) — it does NOT re-prove the file against the
// ledger; that remains the O(N) gate. Spin is the fast door, not a replacement for the proof. Integrity, not truth.
import { coin64, toUuid } from './address.js'

/** The gated derived layer — the exact files the pre-push gate git-diffs against the ledger. Kept in one place so
 *  spin and reconcile name the same set (an omission here is how a file goes un-rotated). */
export const DERIVED_FILES: readonly string[] = [
  'src/theorems/generated.ts',
  'lean/PRINCIPLE.md',
  'CHANGELOG.md',
  'lean/axioms.json',
  'docs/mcp.md',
  'audit-citations.json',
  'support-audit.json',
  'research-leads.json',
]

/** Spin the bits: fold a file's bytes into its content-address and take the top-64 COIN. One order-invariant fold,
 *  O(1) in the ledger size — you get a coin out (`coin64`), the captain's unit. */
export function spin(content: string): { address: string; coin: string } {
  const address = toUuid(content)
  return { address, coin: coin64(content).replace(/-/g, '').slice(0, 16) }
}

export interface SpinManifest { coins: Record<string, string>; receipt: string }

/** Seal the coins: spin every derived file to its coin, and fold the coins themselves into ONE receipt (so a change
 *  in any single file moves the whole receipt — the layer has one address). `files` maps path → its current bytes. */
export function sealSpin(files: Record<string, string>): SpinManifest {
  const coins: Record<string, string> = {}
  for (const p of DERIVED_FILES) if (p in files) coins[p] = spin(files[p]).coin
  // fold the (path, coin) pairs in a FIXED order into one receipt — order-invariant content is the sorted join
  const receipt = toUuid(Object.keys(coins).sort().map((p) => p + '=' + coins[p]).join('\n'))
  return { coins, receipt }
}

export interface SpinDrift { path: string; sealed: string; spun: string }

/** Verify O(1): re-spin each file and compare its coin to the sealed manifest. Returns the drift — the files whose
 *  coin MOVED (non-quantum) and the files the manifest expected but that are absent. Empty drift ⇒ the layer is a
 *  fixed point of its last seal. This does NOT touch the ledger; it is the fast self-consistency door. */
export function verifySpin(manifest: SpinManifest, files: Record<string, string>): { ok: boolean; drift: SpinDrift[]; receipt: string; sealedReceipt: string } {
  const drift: SpinDrift[] = []
  for (const p of Object.keys(manifest.coins)) {
    const spun = p in files ? spin(files[p]).coin : '(absent)'
    if (spun !== manifest.coins[p]) drift.push({ path: p, sealed: manifest.coins[p], spun })
  }
  const receipt = sealSpin(files).receipt
  return { ok: drift.length === 0 && receipt === manifest.receipt, drift, receipt, sealedReceipt: manifest.receipt }
}
