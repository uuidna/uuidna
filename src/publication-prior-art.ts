// publication-prior-art — PRIOR-ART RESEARCH LAW for EVERY publication (captain, 2026-08-26).
//
// Agnostic: every seal/object MUST research prior art before seal/publish.
//   · Prior art FOUND  → credit those sources FIRST; captain comes NEXT in place.
//   · Prior art MISSING → THE CAPTAIN CLAIMS BY LAW (explicit claim outcome — never silent).
// A publication cannot pass the audit without a completed research step whose outcome is exactly one of
// (a) credit with ≥1 proving link/DOI or (b) explicit captain claim.
//
// Research sources (offline, recomputable — gate path; no network):
//   · DOIs / URLs already declared on the seal (related[], standing concept chain)
//   · DOIs mined from title+description (doisIn)
//   · Sibling seals in ZENODO_SEALS (related publications — complete crosslink graph)
//   · leanFiles → doiPriorArtForLeanFile (registry credit law)
// Online corroboration (Crossref/Zenodo/OpenAlex) remains available via corroborateWithResearch for desk work;
// the publish gate refuses network nondeterminism and seals from the offline research receipt alone.
import { toUuid } from './address.js'
import { doisIn } from './crossref.js'
import { CAPTAIN_CREDIT, type Credit } from './captain/credits/index.js'
import {
  ZENODO_SEALS,
  doiPriorArtForLeanFile,
  type ZenodoRelated,
  type ZenodoSeal,
} from './zenodo-seals.js'

export type PriorArtOutcome = 'credit' | 'claim'

export interface PriorArtSource {
  who: string
  link: string
  kind: 'doi' | 'url' | 'named' | 'related-publication'
}

export interface PublicationPriorArt {
  id: string
  researched: true
  outcome: PriorArtOutcome
  /** Prior sources found — empty iff outcome === 'claim'. */
  priors: readonly PriorArtSource[]
  /** Prior art first (if any), then captain — never captain-first when priors exist; never unclaimed. */
  creditOrder: readonly Credit[]
  claim: string
  /** Keyword tags encoding related pubs + prior DOIs for Zenodo discoverability. */
  keywords: readonly string[]
  /** Zenodo related_identifiers derived from researched priors + related publications. */
  relatedIdentifiers: readonly ZenodoRelated[]
  /** Sibling seals (every other registry publication) — complete crosslink set. */
  relatedPublications: readonly { id: string; title: string; doi: string; pageUrl: string }[]
  receipt: string
  honest: string
}

export interface PriorArtGap { id: string; what: string; fix: string }

export interface PublicationPriorArtAudit {
  ok: boolean
  gaps: PriorArtGap[]
  credited: number
  claimed: number
  count: number
  receipt: string
  honest: string
}

const HANDLE_HOST = 'https://uuidna.com'

function resourceTypeOf(seal: ZenodoSeal): string {
  return seal.uploadType === 'software' ? 'software' : 'publication'
}

function relationToSibling(from: ZenodoSeal, to: ZenodoSeal): string {
  if (from.role === 'software-archive') return 'references'
  if (to.role === 'software-archive') return 'isSupplementTo'
  if (to.role === 'cite-only') return 'references'
  return 'references'
}

/** Every other seal in the registry — complete related-publication graph (no hand gaps). */
export function relatedPublicationSeals(seal: ZenodoSeal): ZenodoSeal[] {
  return ZENODO_SEALS.filter((s) => s.id !== seal.id)
}

/**
 * researchPublicationPriorArt(seal) → completed research step.
 * Always sets researched:true; outcome is exactly 'credit' or 'claim'.
 */
export function researchPublicationPriorArt(seal: ZenodoSeal): PublicationPriorArt {
  const priors: PriorArtSource[] = []
  const relatedIds: ZenodoRelated[] = []
  const seenLink = new Set<string>()
  const seenWho = new Set<string>()

  const pushPrior = (p: PriorArtSource, rel?: ZenodoRelated) => {
    if (seenWho.has(p.who) || seenLink.has(p.link)) return
    seenWho.add(p.who)
    seenLink.add(p.link)
    priors.push(p)
    if (rel && !relatedIds.some((r) => r.identifier === rel.identifier)) relatedIds.push(rel)
  }

  // 1 · DOIs mined from title + description (exclude this seal's own standing/concept DOI)
  const hay = `${seal.title} ${seal.description}`
  const selfDois = new Set([seal.standingDoi, seal.conceptDoi].filter(Boolean) as string[])
  for (const doi of doisIn(hay)) {
    if (selfDois.has(doi)) continue
    pushPrior(
      { who: `DOI ${doi}`, link: `https://doi.org/${doi}`, kind: 'doi' },
      { identifier: doi, relation: 'references', resource_type: 'publication' },
    )
  }

  // 2 · Explicit seal.related entries that look like proving links / DOIs (exclude self)
  for (const r of seal.related) {
    const id = r.identifier
    if (/^10\.\d+\//.test(id) || id.includes('doi.org/')) {
      const doi = id.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
      if (selfDois.has(doi)) continue
      pushPrior(
        { who: `DOI ${doi}`, link: `https://doi.org/${doi}`, kind: 'doi' },
        { ...r, identifier: doi.startsWith('10.') ? doi : id },
      )
    } else if (/^https?:\/\//.test(id) && !id.startsWith(HANDLE_HOST)) {
      pushPrior(
        { who: id.replace(/^https?:\/\//, '').slice(0, 80), link: id, kind: 'url' },
        { ...r },
      )
    }
  }

  // 3 · leanFiles → registry DOI prior art (exclude self)
  for (const file of seal.leanFiles ?? []) {
    for (const prior of doiPriorArtForLeanFile(file)) {
      if (selfDois.has(prior.doi)) continue
      pushPrior(
        { who: `DOI ${prior.doi}`, link: prior.link, kind: 'doi' },
        { identifier: prior.doi, relation: 'references', resource_type: 'publication' },
      )
    }
  }

  // 4 · Related publications (every other seal) — ALWAYS crosslinked for adoption; cite-only siblings are PRIOR ART
  const siblings = relatedPublicationSeals(seal)
  const relatedPubs = siblings.map((s) => ({
    id: s.id,
    title: s.title,
    doi: s.standingDoi,
    pageUrl: s.pageUrl,
  }))
  for (const s of siblings) {
    const rel = relationToSibling(seal, s)
    if (!relatedIds.some((r) => r.identifier === s.standingDoi)) {
      relatedIds.push({
        identifier: s.standingDoi,
        relation: rel,
        resource_type: resourceTypeOf(s),
      })
    }
    if (s.pageUrl !== HANDLE_HOST && !relatedIds.some((r) => r.identifier === s.pageUrl)) {
      relatedIds.push({
        identifier: s.pageUrl,
        relation: 'isDocumentedBy',
        resource_type: 'publication-article',
        scheme: 'url',
      })
    }
    // Cite-only siblings are prior sources being referenced — credit them; owned peers are related works only
    if (s.role === 'cite-only') {
      pushPrior({
        who: `DOI ${s.standingDoi} (${s.id})`,
        link: `https://doi.org/${s.standingDoi}`,
        kind: 'doi',
      })
    }
  }

  // Concept DOI self-link (versioning) when present
  if (seal.conceptDoi && seal.conceptDoi !== seal.standingDoi) {
    if (!relatedIds.some((r) => r.identifier === seal.conceptDoi)) {
      relatedIds.push({
        identifier: seal.conceptDoi!,
        relation: 'isNewVersionOf',
        resource_type: resourceTypeOf(seal),
      })
    }
  }

  const outcome: PriorArtOutcome = priors.length > 0 ? 'credit' : 'claim'
  const creditOrder: Credit[] =
    outcome === 'credit'
      ? [...priors.map((p) => ({ who: p.who, link: p.link })), CAPTAIN_CREDIT]
      : [CAPTAIN_CREDIT]

  const claim =
    outcome === 'credit'
      ? `Prior art researched and FOUND: ${priors.map((p) => p.who).join('; ')} credited FIRST; THE CAPTAIN COMES NEXT IN PLACE for seal ${seal.id}.`
      : `Prior art researched and MISSING for seal ${seal.id}. THE CAPTAIN CLAIMS BY LAW (first sealed / deposited here) — explicit claim outcome, never silent.`

  const keywords = [
    ...relatedPubs.map((p) => `related:${p.id}`),
    ...priors.filter((p) => p.kind === 'doi').map((p) => p.who.replace(/^DOI /, 'doi:')),
    outcome === 'claim' ? 'captain-claim' : 'prior-art-credited',
  ]

  return {
    id: seal.id,
    researched: true,
    outcome,
    priors,
    creditOrder,
    claim,
    keywords,
    relatedIdentifiers: relatedIds,
    relatedPublications: relatedPubs,
    receipt: toUuid(`pub-prior-art|${seal.id}|${outcome}|${priors.length}|${relatedPubs.length}`),
    honest:
      'Every publication researches prior art offline from DOIs, proving links, lean-file registry binds, and the ' +
      'complete sibling-seal graph. Found → credit first, captain next. Missing → explicit captain claim. Never ' +
      'unresearched; never unclaimed.',
  }
}

/** publicationPriorArtAudit() → every seal has researched:true and outcome credit|claim with consistent creditOrder. */
export function publicationPriorArtAudit(): PublicationPriorArtAudit {
  const gaps: PriorArtGap[] = []
  let credited = 0
  let claimed = 0
  for (const seal of ZENODO_SEALS) {
    const r = researchPublicationPriorArt(seal)
    if (!r.researched) {
      gaps.push({ id: seal.id, what: 'prior-art research step missing', fix: 'call researchPublicationPriorArt — every seal must research' })
      continue
    }
    if (r.outcome !== 'credit' && r.outcome !== 'claim') {
      gaps.push({ id: seal.id, what: `invalid prior-art outcome ${String(r.outcome)}`, fix: 'outcome must be credit or claim' })
    }
    if (r.outcome === 'credit') {
      credited++
      if (r.priors.length === 0) {
        gaps.push({ id: seal.id, what: 'outcome=credit but priors empty', fix: 'credit requires ≥1 prior source' })
      }
      if (r.creditOrder[0]?.who === CAPTAIN_CREDIT.who) {
        gaps.push({ id: seal.id, what: 'captain first when prior art exists', fix: 'creditOrder: priors first, captain next' })
      }
      if (r.creditOrder[r.creditOrder.length - 1]?.who !== CAPTAIN_CREDIT.who) {
        gaps.push({ id: seal.id, what: 'captain missing from creditOrder', fix: 'captain always last among claimants' })
      }
      // When siblings exist, related publications must appear in relatedIdentifiers
      if (r.relatedPublications.length > 0) {
        for (const p of r.relatedPublications) {
          if (!r.relatedIdentifiers.some((x) => x.identifier === p.doi || x.identifier === p.pageUrl)) {
            gaps.push({
              id: seal.id,
              what: `missing related-publication crosslink for ${p.id}`,
              fix: 'researchPublicationPriorArt must emit DOI/page related_identifiers for every sibling seal',
            })
          }
          if (!r.keywords.includes(`related:${p.id}`)) {
            gaps.push({
              id: seal.id,
              what: `missing related:${p.id} keyword`,
              fix: 'keywords must tag every related publication id',
            })
          }
        }
      }
    } else {
      claimed++
      if (r.priors.length !== 0) {
        gaps.push({ id: seal.id, what: 'outcome=claim but priors non-empty', fix: 'claim means researched-and-missing' })
      }
      if (r.creditOrder.length !== 1 || r.creditOrder[0]?.who !== CAPTAIN_CREDIT.who) {
        gaps.push({ id: seal.id, what: 'claim outcome must be captain alone in creditOrder', fix: 'creditOrder = [CAPTAIN_CREDIT]' })
      }
      if (!r.keywords.includes('captain-claim')) {
        gaps.push({ id: seal.id, what: 'claim outcome missing captain-claim keyword', fix: 'tag captain-claim in keywords' })
      }
      // Even on claim, related publication crosslinks (siblings) must still be present when registry has peers
      if (r.relatedPublications.length > 0) {
        for (const p of r.relatedPublications) {
          if (!r.relatedIdentifiers.some((x) => x.identifier === p.doi || x.identifier === p.pageUrl)) {
            gaps.push({
              id: seal.id,
              what: `claim seal missing related-publication crosslink for ${p.id}`,
              fix: 'crosslinks are required even when prior art is a captain claim',
            })
          }
        }
      }
    }
  }
  return {
    ok: gaps.length === 0,
    gaps,
    credited,
    claimed,
    count: ZENODO_SEALS.length,
    receipt: toUuid(`pub-prior-art-audit|${credited}|${claimed}|${gaps.length}`),
    honest:
      'Prior-art research is mandatory and gapless: every seal ends credit (priors first, captain next) or claim ' +
      '(captain alone). Related publications are always crosslinked in related_identifiers and keywords.',
  }
}
