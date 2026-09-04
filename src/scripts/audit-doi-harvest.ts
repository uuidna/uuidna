#!/usr/bin/env node
// audit-doi-harvest — READ BACK OUR OWN PERMANENT RECORDS AND COMPARE THEM TO WHAT THIS REPOSITORY CLAIMS.
//
// THE DEFECT THIS EXISTS FOR was found on 2026-09-04 and could not have been found here. src/zenodo-seals.ts
// declared uuidna's standing record as 21787144. Resolving it shows 21787144 is titled "Quantum Proofs of the
// Clay Millennium Problems v1.0" — a different work — while uuidna's actual record is 22256708. Every
// publication's metadata built its DOI from that field, so the whole corpus pointed at someone else's paper as
// its archive. EVERY GATE IN THIS TREE READS THE FILESYSTEM, and the fact that contradicted the claim lived only
// in the public record. A peer (millennium-solutions) hit the same class — a corrected repository whose
// permanent record was never corrected — and their remedy is this: harvest your own DOI and read it.
//
// UNREAD IS NOT MISMATCHED, and the distinction is the whole discipline of this file. If the network is absent,
// or Zenodo answers 429, the answer is `read: false` with the reason named — never "the title disagrees" and
// never a silent pass. A gate that treats an unreachable host as agreement is worse than no gate.
//
// @non-harmonic: resolves our own DOIs over the network — fetch IS the reading, and the boundary is named here
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { ZENODO_SEALS } from '../zenodo-seals.js'
import { toUuid, merkleFold } from '../address.js'

export interface HarvestRow {
  id: string
  declaredDoi: string
  declaredTitle: string
  /** false when the record could not be read — a fact about this host, not about the record */
  read: boolean
  reason?: string
  liveTitle?: string
  liveRecordId?: string
  liveConceptDoi?: string
  /** true only when the record was READ and its title matches what this repository claims */
  agrees?: boolean
}

const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** harvestSeal(seal, fetchJson) → one owned record, read back. Injectable so tests never touch the network. */
export async function harvestSeal(
  seal: typeof ZENODO_SEALS[number],
  fetchJson: (url: string) => Promise<{ status: number; body: unknown }> = defaultFetchJson,
): Promise<HarvestRow> {
  const row: HarvestRow = { id: seal.id, declaredDoi: seal.standingDoi ?? '', declaredTitle: seal.title, read: false }
  const recordId = seal.standingRecordId
  if (!recordId) return { ...row, reason: 'no standingRecordId declared, so there is nothing to read back' }
  try {
    const { status, body } = await fetchJson(`https://zenodo.org/api/records/${recordId}`)
    if (status !== 200 || !body || typeof body !== 'object')
      return { ...row, reason: `zenodo answered ${status} — the record is UNREAD here, not disagreeing` }
    const j = body as { id?: number; doi?: string; conceptdoi?: string; metadata?: { title?: string } }
    const liveTitle = String(j.metadata?.title ?? '')
    // the declared title is a PREFIX of the live one in practice (the live title carries the census), so the
    // comparison asks whether the live record's title BEGINS with what we claim — a stricter equality would
    // fail on every release that appends a theorem count.
    const agrees = norm(liveTitle).startsWith(norm(seal.title)) && (j.doi ?? '') === (seal.standingDoi ?? '')
    return {
      ...row, read: true, liveTitle: liveTitle.slice(0, 200),
      liveRecordId: String(j.id ?? recordId), liveConceptDoi: j.conceptdoi ?? undefined, agrees,
    }
  } catch (e) {
    return { ...row, reason: e instanceof Error ? e.message : String(e) }
  }
}

export const defaultFetchJson = async (url: string): Promise<{ status: number; body: unknown }> => {
  const res = await fetch(url, { headers: { 'user-agent': 'uuidna-doi-harvest/1' } })
  const body = res.status === 200 ? await res.json() : null
  return { status: res.status, body }
}

export interface Harvest {
  rows: HarvestRow[]
  owned: number
  readCount: number
  agreeing: number
  disagreeing: HarvestRow[]
  receipt: string
}

/** harvestOwnedDois(fetchJson?) → every seal this repository claims to OWN, read back from the public record. */
export async function harvestOwnedDois(
  fetchJson: (url: string) => Promise<{ status: number; body: unknown }> = defaultFetchJson,
): Promise<Harvest> {
  const owned = ZENODO_SEALS.filter((s) => s.owned && s.standingRecordId)
  const rows: HarvestRow[] = []
  for (const s of owned) rows.push(await harvestSeal(s, fetchJson))
  const read = rows.filter((r) => r.read)
  return {
    rows,
    owned: owned.length,
    readCount: read.length,
    agreeing: read.filter((r) => r.agrees).length,
    disagreeing: read.filter((r) => !r.agrees),
    receipt: merkleFold([toUuid('doi-harvest|' + owned.length), ...rows.map((r) => toUuid(r.id + '|' + (r.agrees ? '1' : r.read ? '0' : 'unread')))]),
  }
}

const isMain = process.argv[1]?.endsWith('audit-doi-harvest.js') ?? false
if (isMain) {
  const h = await harvestOwnedDois()
  console.log('audit-doi-harvest — our own permanent records, read back\n')
  for (const r of h.rows) {
    console.log(`  ${r.read ? (r.agrees ? '✓' : '✗') : '·'} ${r.id}  ${r.declaredDoi}`)
    console.log(`      declared: ${r.declaredTitle.slice(0, 80)}`)
    if (r.read) {
      console.log(`      live    : ${String(r.liveTitle).slice(0, 80)}`)
      if (r.liveConceptDoi) console.log(`      concept : ${r.liveConceptDoi}`)
    } else console.log(`      UNREAD  : ${r.reason}`)
  }
  writeFileSync(join(ROOT, 'lean', 'doi-harvest.json'), JSON.stringify(h, null, 1) + '\n')
  console.log(`\n  ${h.readCount}/${h.owned} read · ${h.agreeing} agree · ${h.disagreeing.length} disagree · receipt ${h.receipt}`)
  if (h.disagreeing.length) {
    console.log('\n✗ audit-doi-harvest — this repository claims a record the public record does not support:')
    for (const r of h.disagreeing)
      console.log(`    GAP ${r.id}: declared "${r.declaredTitle.slice(0, 60)}" at ${r.declaredDoi}, live record says "${String(r.liveTitle).slice(0, 60)}"\n    FIX correct src/zenodo-seals.ts to the record that IS this work, verified by resolution — every publication builds its DOI from that field`)
    process.exit(1)
  }
  if (h.readCount < h.owned) {
    console.log('\n· audit-doi-harvest — some records were UNREAD (see reasons above). Unread is not agreement:')
    console.log('  a mint must not proceed on an unverified archive claim, but nothing here is refuted either.')
    process.exit(2)
  }
  console.log('\n✓ audit-doi-harvest — every owned record reads back as this repository claims.')
}
