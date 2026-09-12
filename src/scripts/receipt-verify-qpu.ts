#!/usr/bin/env node
// @non-harmonic: one GET from the named QPU host — NAMED boundary (like receipt-deposit).
//
// receipt-verify-qpu — PROVE A COMMIT BY ONE FETCH. Reads the landing's deposited receipt from
// https://qpu.uuidna.com/storage/receipts/uuidna/<commit> and compares its covers to this tree's covers computed here.
// Equal covers mean the bytes this checkout holds are the bytes the landing proved green; the deploy then skips the
// guard and the suite as already proven (verify_beats_recompute_by_magnitudes). Any other answer — no deposit, a
// different digest, a host that does not answer — exits 1 so the caller falls back to proving by tree. Reads are open.
import { treeCovers } from '../gate-receipt-index.js'
import { QPU_RECEIPTS } from './receipt-deposit.js'

export const coversMatch = (remote: Record<string, string> | undefined, local: Record<string, string>): boolean =>
  !!remote && remote.src === local.src && remote.lean === local.lean && typeof local.src === 'string' && local.src.length > 0

export const verifyOnQpu = async (commit: string, fetchImpl: typeof fetch = fetch): Promise<{ proven: boolean; why: string; href: string }> => {
  const href = `${QPU_RECEIPTS}/${commit}`
  const res = await fetchImpl(href, { headers: { accept: 'application/ld+json' } })
  if (res.status !== 200) return { proven: false, why: `qpu answered ${res.status} for ${commit.slice(0, 8)} — no deposited receipt`, href }
  const body = (await res.json().catch(() => ({}))) as { holds?: boolean; value?: { commit?: string; covers?: Record<string, string> } }
  if (body.holds !== true || !body.value) return { proven: false, why: 'the key holds no receipt', href }
  if (body.value.commit !== commit) return { proven: false, why: `the receipt names ${String(body.value.commit).slice(0, 8)}, not ${commit.slice(0, 8)}`, href }
  const local = treeCovers()
  return coversMatch(body.value.covers, local)
    ? { proven: true, why: 'the deposited covers equal this tree: proven at landing, verified by one fetch', href }
    : { proven: false, why: 'the deposited covers differ from this tree', href }
}

const IS_CLI = (process.argv[1] ?? '').endsWith('receipt-verify-qpu.js')
if (IS_CLI) {
  const commit = process.argv[2] ?? ''
  verifyOnQpu(commit).then((r) => {
    console.log(`${r.proven ? '✓' : '·'} receipt-verify-qpu — ${r.why} (${r.href})`)
    process.exit(r.proven ? 0 : 1)
  }, (e: unknown) => { console.log(`· receipt-verify-qpu — ${String((e as Error)?.message ?? e)}`); process.exit(1) })
}
