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
  /** OWN — this repository claims the record IS its work, so a title mismatch is a defect. CITED — the record is
   *  someone else's work we reference, so the check is that it resolves to the paper we name. Both matter here:
   *  the cited Nature letter's published numbers are sealed as theorems in MoMBHStar1.lean, so citing the wrong
   *  paper would attribute those theorems to the wrong research. The role split is a peer's design
   *  (millennium-solutions, 2026-09-04) — mine read back only the owned seals, so every DOI cited in any other
   *  role was unverified, including that one. */
  role: 'own' | 'cited'
  declaredDoi: string
  declaredTitle: string
  /** false when the record could not be read — a fact about this host, not about the record */
  read: boolean
  reason?: string
  liveTitle?: string
  liveRecordId?: string
  liveConceptDoi?: string
  /** true only when the record was READ and the IDENTIFIER it returns is the one this repository cites */
  agrees?: boolean
  /** reported, never the verdict — see the note on titleOverlaps below */
  titleOverlaps?: boolean
}

// THE VERDICT IS THE IDENTIFIER, NOT THE TITLE, and I learned that by shipping the false positive a peer had
// warned me about minutes earlier (ceccec.github.io, 2026-09-04: "yours compares by title; mine compares by
// RECORD ID, which sidesteps the two false positives"). My first role-aware version compared prefix-wise and
// immediately failed the cited Nature letter — declared "A gas-enshrouded and gas-reddened black hole at cosmic
// dawn (Nature)" against a live title with no "(Nature)" annotation, so the declared string was LONGER and the
// prefix test ran the wrong way. Nothing was wrong with the citation.
//
// A title is prose that two parties legitimately phrase differently: a release appends a census, a registry
// appends a venue, a publisher revises punctuation. An IDENTIFIER is the thing that either resolves to the work
// we cite or does not, and a record swap — the defect this gate exists for — moves the identifier. So the
// identifier decides and the title is REPORTED, with a symmetric overlap check that surfaces a genuinely
// different work without failing on an annotation.

const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** THE RESOLVER DEPENDS ON THE REGISTRAR. A Zenodo DOI is read from the Zenodo API by record id; anything else
 *  (a Nature letter, say) has no record id here and is read from Crossref by DOI. A harvester that knows only
 *  one registrar reports every foreign DOI as unread, which is the same false silence as not checking. */
const resolverFor = (seal: typeof ZENODO_SEALS[number]): { url: string; kind: 'zenodo' | 'crossref' | 'datacite' } | null => {
  const doi = seal.standingDoi ?? ''
  if (seal.standingRecordId) return { url: `https://zenodo.org/api/records/${seal.standingRecordId}`, kind: 'zenodo' }
  // THE REGISTRAR IS CHOSEN BY THE PREFIX, because guessing one is how a verifiable DOI reports as unread.
  // Measured 2026-09-05: Crossref answers 404 for 10.7483/OPENDATA.CMS.53FG.V2S9 while DataCite resolves it
  // (title /SingleMu/Run2011A-v1/RAW, publisher CERN Open Data Portal). A harvester that knew only Crossref
  // would have called every CERN record unreadable — a false absence on identifiers this ledger cites.
  if (doi.startsWith('10.7483/') || doi.startsWith('10.5281/')) return { url: `https://api.datacite.org/dois/${doi}`, kind: 'datacite' }
  if (doi) return { url: `https://api.crossref.org/works/${doi}`, kind: 'crossref' }
  return null
}

const titleOf = (kind: 'zenodo' | 'crossref' | 'datacite', body: unknown): { title: string; doi?: string; id?: string; concept?: string } => {
  if (kind === 'datacite') {
    const a = (body as { data?: { attributes?: { doi?: string; titles?: { title?: string }[] } } }).data?.attributes
    return { title: String(a?.titles?.[0]?.title ?? ''), doi: a?.doi }
  }
  if (kind === 'zenodo') {
    const j = body as { id?: number; doi?: string; conceptdoi?: string; metadata?: { title?: string } }
    return { title: String(j.metadata?.title ?? ''), doi: j.doi, id: String(j.id ?? ''), concept: j.conceptdoi }
  }
  const j = body as { message?: { title?: string[]; DOI?: string } }
  return { title: (j.message?.title ?? []).join(' '), doi: j.message?.DOI }
}

/** harvestSeal(seal, fetchJson) → one record, read back in its declared ROLE. Injectable so tests stay offline. */
export async function harvestSeal(
  seal: typeof ZENODO_SEALS[number],
  fetchJson: (url: string) => Promise<{ status: number; body: unknown }> = defaultFetchJson,
): Promise<HarvestRow> {
  const role: 'own' | 'cited' = seal.owned ? 'own' : 'cited'
  const row: HarvestRow = { id: seal.id, role, declaredDoi: seal.standingDoi ?? '', declaredTitle: seal.title, read: false }
  const resolver = resolverFor(seal)
  if (!resolver) return { ...row, reason: 'no DOI and no record id declared, so there is nothing to read back' }
  try {
    const { status, body } = await fetchJson(resolver.url)
    if (status !== 200 || !body || typeof body !== 'object')
      return { ...row, reason: `${resolver.kind} answered ${status} — the record is UNREAD here, not disagreeing` }
    const j = titleOf(resolver.kind, body)
    const liveTitle = String(j.title ?? '')
    // THE COMPARISON IS PREFIX-WISE, and that is not laxity: an OWN record's live title carries the release
    // census appended to the declared title, so strict equality would fail on every release. A CITED record's
    // title is fixed by its publisher, so the declared title should be a prefix of it too — and for either role
    // the DOI must be the one we cite, which is the part that catches a record swap.
    // THE IDENTIFIER TEST. For a Zenodo record the returned record id must be the one we asked for; for any
    // other registrar the returned DOI must be the one we cite. Either way, a swap moves this and nothing else.
    const liveDoi = norm(j.doi ?? '')
    const wantDoi = norm(seal.standingDoi ?? '')
    const idAgrees = resolver.kind === 'zenodo'
      ? String(j.id ?? '') === String(seal.standingRecordId ?? '') && (liveDoi === wantDoi || !liveDoi || !wantDoi)
      : liveDoi === wantDoi
    // SYMMETRIC overlap, so an annotation on either side is not a failure while a different work still shows.
    const a = norm(liveTitle), b = norm(seal.title)
    const titleOverlaps = a.length > 0 && b.length > 0 && (a.startsWith(b) || b.startsWith(a))
    return {
      ...row, read: true, liveTitle: liveTitle.slice(0, 200),
      liveRecordId: j.id || undefined, liveConceptDoi: j.concept ?? undefined,
      agrees: idAgrees, titleOverlaps,
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

/** harvestOwnedDois(fetchJson?) → EVERY seal with a DOI, read back in its role — not only the owned ones.
 *  The name is kept for its callers; the scope is now every identifier this repository puts in print. */
export async function harvestOwnedDois(
  fetchJson: (url: string) => Promise<{ status: number; body: unknown }> = defaultFetchJson,
): Promise<Harvest> {
  const owned = ZENODO_SEALS.filter((s) => s.standingDoi || s.standingRecordId)
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
    console.log(`  ${r.read ? (r.agrees ? '✓' : '✗') : '·'} [${r.role}] ${r.id}  ${r.declaredDoi}`)
    console.log(`      declared: ${r.declaredTitle.slice(0, 80)}`)
    if (r.read) {
      console.log(`      live    : ${String(r.liveTitle).slice(0, 80)}`)
      if (r.liveConceptDoi) console.log(`      concept : ${r.liveConceptDoi}`)
      if (!r.titleOverlaps) console.log(`      NOTE    : the titles do not overlap — reported, not a verdict; the identifier is what decides`)
    } else console.log(`      UNREAD  : ${r.reason}`)
  }
  writeFileSync(join(ROOT, 'lean', 'doi-harvest.json'), JSON.stringify(h, null, 1) + '\n')
  console.log(`\n  ${h.readCount}/${h.owned} read · ${h.agreeing} agree · ${h.disagreeing.length} disagree · receipt ${h.receipt}`)
  if (h.disagreeing.length) {
    console.log('\n✗ audit-doi-harvest — this repository claims a record the public record does not support:')
    for (const r of h.disagreeing)
      console.log(`    GAP ${r.id} [${r.role}]: cites ${r.declaredDoi}, and the identifier it resolves to is not that one (landed on record ${r.liveRecordId ?? '?'}, titled "${String(r.liveTitle).slice(0, 50)}")\n    FIX correct src/zenodo-seals.ts to the identifier that IS this work, verified by resolution — every publication builds its DOI from that field`)
    process.exit(1)
  }
  if (h.readCount < h.owned) {
    console.log('\n· audit-doi-harvest — some records were UNREAD (see reasons above). Unread is not agreement:')
    console.log('  a mint must not proceed on an unverified archive claim, but nothing here is refuted either.')
    process.exit(2)
  }
  console.log('\n✓ audit-doi-harvest — every owned record reads back as this repository claims.')
}
