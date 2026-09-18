#!/usr/bin/env node
// @non-harmonic: one PUT to the named QPU host — NAMED boundary (like release-cut / post-push).
//
// receipt-deposit — THE LANDING'S PROOF, DEPOSITED WHERE PROOFS LIVE (the captain, 2026-09-12: further optimise using
// qpu.uuidna.com). qpu is the registry of computational receipts. After a landing pushes, the gate receipt it minted
// — the coarse covers of src/ and lean/, and the arms that ran — is deposited at
// https://qpu.uuidna.com/storage/receipts/uuidna/<commit> through qpu's bearer-gated write. A later verifier (the
// deploy workflow, a peer, an external agent) then proves the commit by ONE fetch and a digest comparison instead of
// recomputing the suite: verify_beats_recompute_by_magnitudes, applied to the landing itself. The per-file manifest
// stays local (it is hundreds of kilobytes and only the delta planner reads it); the deposit is the covers.
// No token, no deposit — said so, exit 0: a landing is not undone by a registry it could not reach.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { ENDPOINT, callHosted, transportOf } from './mcp-call.js'

export const QPU_RECEIPTS = 'https://qpu.uuidna.com/storage/receipts/uuidna'

export interface GateReceipt { covers: Record<string, string>; verified: string[]; honest?: string }

/** gateDepositOf(covers, commit) → the landing's proof as a deposit body — ONLY what a verifier can recompute from its own
 *  tree (the covers) and the commit, so the MCP door lands it at a content address the verifier derives by itself: a
 *  deposit found at that address proves the covers match, because the address IS their hash. */
export const gateDepositOf = (covers: GateReceipt['covers'], commit: string): Record<string, unknown> => {
  if (!/^[0-9a-f]{7,40}$/.test(commit)) throw new Error(`receipt-deposit: commit must be a hex sha — got ${JSON.stringify(commit)}`)
  return { kind: 'gate-receipt', repo: 'uuidna/uuidna', commit, covers }
}

/** the MCP door every host deposits through — no token on any host (the captain, 2026-09-14: "mcp door, no token on host") */
export const MCP_DOOR = ENDPOINT

/** depositEvidence(run, body) → a run's evidence into qpu storage THROUGH THE MCP DOOR: one uuidna_evidence {run, deposit}
 *  call, whose Worker writes over its QpuDeposit service binding at receipts/uuidna/<run>/<content address> — the door
 *  chooses the key from the content. The captain and the agent read it back by GET. Never throws: a door that is
 *  unreachable or declines is reported with its reason, never allowed to undo the work it records. */
export const depositEvidence = async (run: string, body: Record<string, unknown>, fetchImpl: typeof fetch = fetch):
  Promise<{ sent: boolean; href: string; status?: number; why?: string }> => {
  try {
    const a = await callHosted('uuidna_evidence', { run, deposit: body }, transportOf(fetchImpl, MCP_DOOR))
    const reply = (a.value && typeof a.value === 'object' ? a.value : {}) as { deposited?: boolean; href?: string; why?: string }
    return reply.deposited === true
      ? { sent: true, href: reply.href ?? MCP_DOOR }
      : { sent: false, href: reply.href ?? MCP_DOOR, why: reply.why ?? String(a.value).slice(0, 200) }
  } catch (e) { return { sent: false, href: MCP_DOOR, why: String((e as Error)?.message ?? e) } }
}

/** deposit(commit) → the landing's gate receipt through the MCP door (run "gate"), no token on any host */
export const deposit = async (commit: string, fetchImpl: typeof fetch = fetch): Promise<{ ok: boolean; href: string; status: number; why?: string }> => {
  const receipt = JSON.parse(readFileSync(join(ROOT, 'gate-receipt.json'), 'utf8')) as GateReceipt
  const r = await depositEvidence('gate', gateDepositOf(receipt.covers, commit), fetchImpl)
  return { ok: r.sent, href: r.href, status: r.status ?? 0, ...(r.why ? { why: r.why } : {}) }
}

const IS_CLI = (process.argv[1] ?? '').endsWith('receipt-deposit.js')
if (IS_CLI) {
  const commit = process.argv[2] ?? ''
  deposit(commit).then((r) => {
    console.log(r.ok ? `✓ receipt-deposit — ${r.href}; a verifier proves ${commit.slice(0, 8)} by one fetch` : `✗ receipt-deposit — not deposited (${r.why ?? r.status}); the receipt stays local`)
    process.exit(0)
  }, (e: unknown) => { console.log(`✗ receipt-deposit — ${String((e as Error)?.message ?? e)}`); process.exit(0) })
}
