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

export const QPU_RECEIPTS = 'https://qpu.uuidna.com/storage/receipts/uuidna'

export interface GateReceipt { covers: Record<string, string>; verified: string[]; honest?: string }

export const depositRequestOf = (receipt: GateReceipt, commit: string, token: string | undefined): { url: string; init: { method: 'PUT'; headers: Record<string, string>; body: string } } => {
  if (!token) throw new Error('receipt-deposit: QPU_WRITE_TOKEN is not in the environment; qpu refuses unauthenticated writes, so nothing is sent')
  if (!/^[0-9a-f]{7,40}$/.test(commit)) throw new Error(`receipt-deposit: commit must be a hex sha — got ${JSON.stringify(commit)}`)
  const body = JSON.stringify({ kind: 'gate-receipt', repo: 'uuidna/uuidna', commit, covers: receipt.covers, verified: receipt.verified, honest: receipt.honest ?? '' })
  return { url: `${QPU_RECEIPTS}/${commit}`, init: { method: 'PUT', headers: { 'content-type': 'application/json', accept: 'application/ld+json', authorization: `Bearer ${token}` }, body } }
}

export const deposit = async (commit: string, fetchImpl: typeof fetch = fetch): Promise<{ ok: boolean; href: string; status: number }> => {
  const receipt = JSON.parse(readFileSync(join(ROOT, 'gate-receipt.json'), 'utf8')) as GateReceipt
  const { url, init } = depositRequestOf(receipt, commit, process.env.QPU_WRITE_TOKEN)
  const res = await fetchImpl(url, init)
  const reply = (await res.json().catch(() => ({}))) as { holds?: boolean }
  return { ok: res.status === 200 && reply.holds === true, href: url, status: res.status }
}

const IS_CLI = (process.argv[1] ?? '').endsWith('receipt-deposit.js')
if (IS_CLI) {
  const commit = process.argv[2] ?? ''
  if (!process.env.QPU_WRITE_TOKEN) {
    console.log('· receipt-deposit — no QPU_WRITE_TOKEN in the environment; the receipt stays local and deploy proves by tree')
    process.exit(0)
  }
  deposit(commit).then((r) => {
    console.log(r.ok ? `✓ receipt-deposit — ${r.href} (${r.status}); a verifier proves ${commit.slice(0, 8)} by one fetch` : `✗ receipt-deposit — ${r.href} answered ${r.status}; the receipt stays local`)
    process.exit(0)
  }, (e: unknown) => { console.log(`✗ receipt-deposit — ${String((e as Error)?.message ?? e)}`); process.exit(0) })
}
