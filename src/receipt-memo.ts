// receipt-memo — PROVE ONCE PER LEDGER STATE, VERIFY AT EVERY GATEWAY (the captain, 2026-09-12: "external computation
// is a crack unless in coordinated waves; coordinate using receipts; each receipt is also cross gateways").
//
// MEASURED: publications() composes 178 monographs in 215 s and uuidnaDecode() walks the ledger in 191 s. Both are pure
// functions of the immutable ledger, both were memoised PER PROCESS, and every fresh process — a gate, a CLI, a test
// plan, a measurement — paid them again. This is the third time today the same cure was needed (the falsifier verdicts
// were the first), so it is one module: a receipt is {key, value} where key is the ledger's own digest; a generator
// MINTS it at reconcile (the drain law — nothing else writes), and any gateway READS it in O(1) when the key matches
// the ledger it is running against, recomputing in memory otherwise. A moved ledger misses; a stale receipt is never
// served as current. Deterministic: no clock, no randomness; the digest is the same on every machine.
// The disk is reached through boundary.ts, so the module loads at the edge; there the baked receipts answer.
import { ROOT, hostFs, type HostFs } from './boundary.js'
import { toUuid } from './address.js'
import { THEOREMS } from './theorems/index.js'
import { EDGE_SLICES } from './edge-slices/generated.js'

let _digest: string | null = null
/** the ledger's identity for receipts: every key, statement and wing, folded once per process (119 ms) */
export const ledgerDigest = (): string => (_digest ??= toUuid(THEOREMS.map((t) => t.key + t.statement + t.file).join(' ')))

export const receiptPath = (name: string, root: string = ROOT, fs: HostFs | null = hostFs): string =>
  fs ? fs.path.join(root, 'lean', `${name}-receipt.json`) : `${root}/lean/${name}-receipt.json`

/** readReceipt(name) → the minted value iff its key is THIS ledger's digest; null when absent or moved (never stale).
 *  The file answers where there is one; where there is none (the edge, an installed package) the receipt
 *  gen-edge-slices baked answers under the same key rule. */
export function readReceipt<T>(name: string, root: string = ROOT, digest: string = ledgerDigest(), fs: HostFs | null = hostFs): T | null {
  const p = receiptPath(name, root, fs)
  if (fs && fs.existsSync(p)) {
    try {
      const r = JSON.parse(fs.readFileSync(p, 'utf8')) as { key?: string; value?: T }
      return r.key === digest && r.value !== undefined ? r.value : null
    } catch { return null }
  }
  const baked = EDGE_SLICES.receipts[name]
  return baked && baked.key === digest ? baked.value as T : null
}

/** mintReceipt(name, value) — the drain's act: sealed under the ledger digest it was computed against */
export function mintReceipt<T>(name: string, value: T, root: string = ROOT, digest: string = ledgerDigest(), fs: HostFs | null = hostFs): string {
  if (!fs) throw new Error(`receipt-memo: minting ${name} writes lean/${name}-receipt.json on the host's disk, and this surface has no filesystem — mint at reconcile`)
  const p = receiptPath(name, root, fs)
  fs.writeFileSync(p, JSON.stringify({ name, key: digest, value }) + '\n')
  return p
}
