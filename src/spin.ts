// spin — "spin the bits and get the coins" (the captain). Every DERIVED artifact must equal its own recomputation
// from the one audited ledger: a FIXED POINT. Re-deriving the whole layer to check that is O(N) (the slow gate).
// SPIN is the O(1) check: fold each derived file's bytes into its content-address and take the top-64 COIN
// (coin64) — one order-invariant fold (`store_fold_order_invariant`), no re-derivation. A file whose re-spun coin
// equals its sealed coin has not drifted; a file whose coin MOVED is the "non-quantum" drift — it is hard-rejected.
// This is the two-coin advantage made operational: recompute O(N) − verify O(1) (`verify_cheaper_than_forge`),
// priced on the conserved two coins (`two_coins`, `captain_computes_only_with_two_coins`). spin
// proves a file is unchanged SINCE ITS LAST SEAL (self-consistency) — it does NOT re-prove the file against the
// ledger; that remains the O(N) gate. Spin is the fast door. Integrity.
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
  // ADDED after measuring: the gate git-diffs fourteen paths and this list named eight, so six files were gated
  // and never rotated. A file the gate watches but spin does not seal can drift without moving the receipt, which
  // is the exact hole the receipt exists to close. spin-parity.test.ts now asserts this list against the audit
  // script itself, so the two cannot separate again by hand.
  '.zenodo.json',
  'reports.json',
  'lean/statement-index.json',
  'README.md',
  'llm.txt',
  'src/chunks',   // a DIRECTORY: every chunk under it is sealed, matched by prefix
  'lean',         // likewise — the gate diffs ALL of lean/, and spin sealed three named files under it. The wings
                  // themselves, every domain manifest, and the heartbeat, findings and leads ledgers were gated
                  // and never rotated. The parity test found this while checking the smaller gap it was written for.
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
  // A DERIVED_FILES entry with no extension is a DIRECTORY: seal every file beneath it. src/chunks holds one file
  // per distinct statement and the gate diffs the whole tree, so sealing only the paths that happen to be plain
  // files left the largest derived surface in the repository un-rotated.
  const isDir = (p: string): boolean => !/\.[a-z0-9]+$/i.test(p)
  for (const p of DERIVED_FILES) {
    if (isDir(p)) {
      for (const f of Object.keys(files)) if (f.startsWith(p + '/')) coins[f] = spin(files[f]).coin
    } else if (p in files) coins[p] = spin(files[p]).coin
  }
  // fold the (path, coin) pairs in a FIXED order into one receipt — order-invariant content is the sorted join
  const receipt = toUuid(Object.keys(coins).sort().map((p) => p + '=' + coins[p]).join('\n'))
  return { coins, receipt }
}

export interface SpinDrift { path: string; sealed: string; spun: string }

/** Verify O(1): re-spin each file and compare its coin to the sealed manifest. Empty drift ⇒ the layer is a fixed
 *  point of its last seal. This does NOT touch the ledger; it is the fast self-consistency door.
 *
 *  THREE WAYS THE LAYER CAN DIFFER, AND IT USED TO NAME ONLY TWO. This walked the MANIFEST's paths, so it saw a
 *  coin that MOVED and a file that went ABSENT — but a file the manifest never covered was invisible to it, while
 *  still changing the receipt, because sealSpin folds whatever the derived set now contains. The result was a
 *  verifier that could FAIL WHILE REPORTING NOTHING: on 2026-08-25 four newly-landed files put it at
 *  "NON-QUANTUM DRIFT: 0 derived file(s) moved", which reads as "nothing is wrong and I am refusing anyway" and
 *  leaves the operator with no path to name and no idea what to fix.
 *
 *  A drift report that cannot name its own finding is the same defect as an arm that cannot say why it failed:
 *  the verdict is real and the evidence is withheld. UNSEALED paths are now reported alongside moved and absent
 *  ones, so every way the set can differ from its seal arrives with the path that differs. */
export function verifySpin(manifest: SpinManifest, files: Record<string, string>): { ok: boolean; drift: SpinDrift[]; receipt: string; sealedReceipt: string } {
  const drift: SpinDrift[] = []
  const current = sealSpin(files)
  for (const p of Object.keys(manifest.coins)) {
    const spun = p in files ? spin(files[p]).coin : '(absent)'
    if (spun !== manifest.coins[p]) drift.push({ path: p, sealed: manifest.coins[p], spun })
  }
  // the third way: sealed by nobody. A file the derived set now carries that the manifest never covered — it
  // moves the receipt without moving any coin, which is exactly the case that used to report an empty drift.
  for (const p of Object.keys(current.coins)) {
    if (!(p in manifest.coins)) drift.push({ path: p, sealed: '(unsealed)', spun: current.coins[p]! })
  }
  const receipt = current.receipt
  // AN EMPTY MANIFEST REFUSES. It sealed nothing, so it agreed with every file set alive or dead — verifySpin
  // returned ok:true against ANY input, which is a verifier that verifies nothing and passes. Same class as the
  // dna-recompute check that accepted a forged theorem: a control it could never fail.
  if (Object.keys(manifest.coins).length === 0) {
    return { ok: false, drift: [{ path: '(manifest)', sealed: '(empty)', spun: receipt }], receipt, sealedReceipt: manifest.receipt }
  }
  return { ok: drift.length === 0 && receipt === manifest.receipt, drift, receipt, sealedReceipt: manifest.receipt }
}
