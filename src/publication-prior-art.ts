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
import { isUuidnaUrl } from './handle-permanence.js'
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
  /** THE PARTITION THAT THIS REGISTER WAS MISSING, and it inverted what the field reported.
   *
   *  "Prior art" answers ONE question: did anyone ELSE get here first. Measured 2026-09-05, this register was
   *  answering a different one — what does this work derive from — and 7 of its 9 priors were our own artefacts:
   *  github.com/uuidna/uuidna, our own npm package, our own Zenodo DOIs, and the captain's sibling projects. One
   *  distinct external source existed (a Nature letter), cited twice. The audit reported ok, 0 gaps, while every
   *  publication claimed prior art was "researched and FOUND".
   *
   *  A peer hit the identical fault in their own tree and named it (millennium-solutions, 2026-09-05): "my
   *  register was recording PROVENANCE, 'we derived this ourselves', where the field means PRIOR ART, 'did anyone
   *  else'. Different questions, and the notes had been answering the wrong one for every row."
   *
   *  Self-citation is NOT deleted, because for a derived work its own foundation IS a legitimate related work —
   *  it is simply not prior art. So the two are separated and each is reported as what it is. */
  provenance: readonly PriorArtSource[]
  external: readonly PriorArtSource[]
  /** THE THIRD CATEGORY, and the captain's question is what forced it (2026-09-05: "are their doi provide the
   *  solutions uuidna does and claim?").
   *
   *  An external source is not automatically prior art. Prior art means SOMEBODY ELSE MADE THIS CLAIM FIRST, and
   *  a dataset whose integers this ledger does arithmetic over is making no such claim. Measured: CERN's record
   *  DOI declares resourceTypeGeneral "Dataset" with no subjects and no descriptions, and across all 16,241
   *  CERN Open Data records there are ZERO hits for "formal verification", "Lean theorem prover",
   *  "kernel-verified proof" or "axiom-free". The same holds for the Nature letter — astrophysics, not a claim
   *  about kernel-verified ledgers.
   *
   *  So filing them as prior art would DILUTE this ledger's claim by implying someone arrived first when nobody
   *  did. They are CITED SOURCES: external, credited, essential, and not competitors. Keeping the three apart is
   *  what lets the prior-art count mean something — and an empty prior-art set, honestly arrived at, is the
   *  strongest position a claim can have, not a gap to be filled. */
  citedSources: readonly PriorArtSource[]
  /** external sources that genuinely claim what this ledger claims — prior art in the strict sense */
  priorArt: readonly PriorArtSource[]
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

function isDoiResolverUrl(id: string): boolean {
  try {
    const u = new URL(id)
    return u.hostname === 'doi.org' || u.hostname === 'dx.doi.org'
  } catch {
    return false
  }
}

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
/** THE ROLE OF AN EXTERNAL SOURCE MUST BE DECLARED, NEVER INFERRED FROM ITS SHAPE.
 *
 *  A peer reached the same conclusion in their own tree and it is the only honest design: classifying by the
 *  wording of a source's own note is circular (the notes were written to say what they say), and classifying by
 *  subject is wrong the other way. So the role is a declared field, and an UNDECLARED external source is a GAP
 *  rather than a default — because defaulting either way is the guess this whole distinction exists to remove.
 *
 *  `cited-source`: external work whose data or numbers this ledger operates on. Credited, not a competitor.
 *  `prior-art`:    external work that makes THIS ledger's kind of claim, and made it first. */
export type ExternalRole = 'cited-source' | 'prior-art'

/** DECLARED ROLES, by DOI prefix or host. Each entry states WHY, because a classification with no reason is a
 *  preference. Add a source here when it is registered; an unlisted external source is reported as undeclared. */
export const EXTERNAL_ROLES: readonly { match: string; role: ExternalRole; why: string }[] = [
  {
    match: '10.7483/',
    role: 'cited-source',
    why: 'CERN Open Data record DOIs. Measured 2026-09-05: resourceTypeGeneral is "Dataset", with no subjects and '
      + 'no descriptions, and all 16,241 records return ZERO hits for formal verification, Lean, kernel-verified '
      + 'proof or axiom-free. A dataset this ledger does arithmetic over makes no claim about kernel-verified '
      + 'ledgers, so it is cited and credited, not prior art.',
  },
  {
    match: '10.1038/s41586-026-10846-4',
    role: 'cited-source',
    why: 'A Nature astrophysics letter whose published numbers are sealed as decidable arithmetic in '
      + 'MoMBHStar1.lean. It claims things about a black hole, not about formal ledgers, so it is a cited source '
      + 'and credited as one. Filing it as prior art would imply someone else made this ledger\'s claim first.',
  },
]

/** roleOf(source) → the declared role, or null when nothing declares it. Null is a gap, not a default. */
export function roleOf(source: PriorArtSource): ExternalRole | null {
  const text = `${source.who} ${source.link ?? ''}`.toLowerCase()
  for (const r of EXTERNAL_ROLES) if (text.includes(r.match.toLowerCase())) return r.role
  return null
}

/** RELATIONS THAT DECLARE THE SAME WORK. A record our own seal calls `isIdenticalTo` IS ours — that is what the
 *  relation means — and so is any version of it. These are DataCite's own words for "this is the same work". */
const OWNING_RELATIONS = new Set([
  'isIdenticalTo', 'isVersionOf', 'hasVersion', 'isNewVersionOf', 'isPreviousVersionOf', 'isPartOf', 'hasPart',
])

/** ourOwnIdentifiers() → every identifier this repository DECLARES as its own, read from the registry.
 *
 *  Read rather than listed, and that distinction cost a correction. The first version compared only each owned
 *  seal's standing and concept DOIs, and it mis-sorted 10.5281/zenodo.21970356 as EXTERNAL prior art — the
 *  sync-twin chain, which the registry already declares `isIdenticalTo` on our own seal. Ownership was stated in
 *  the data all along and the test was narrower than the thing it tested, which is this tree's recurring fault
 *  wearing yet another costume. A hand-typed domain list would drift the same way the moment a surface is added. */
export function ourOwnIdentifiers(): Set<string> {
  const out = new Set<string>()
  for (const z of ZENODO_SEALS) {
    if (!z.owned) continue
    for (const d of [z.standingDoi, z.conceptDoi]) if (d) out.add(d.toLowerCase())
    if (z.pageUrl) out.add(z.pageUrl.toLowerCase())
    for (const r of z.related ?? []) {
      if (OWNING_RELATIONS.has(r.relation)) out.add(String(r.identifier).toLowerCase())
    }
  }
  return out
}

/** isOurOwn(source) → is this PROVENANCE rather than prior art? */
export function isOurOwn(source: PriorArtSource): boolean {
  const text = `${source.who} ${source.link ?? ''}`.toLowerCase()
  for (const id of ourOwnIdentifiers()) if (id.length > 6 && text.includes(id)) return true
  // the repository's own hosts and package scope, and the captain's sibling projects — ours in the sense that
  // matters here: they are not somebody else arriving first
  return /uuidna\.com|github\.com\/uuidna|npmjs\.com\/package\/@uuidna|ceccec\.psg\.bg|ceccec\.github\.io|github\.com\/ceccec/.test(text)
}

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
    if (/^10\.\d+\//.test(id) || isDoiResolverUrl(id)) {
      const doi = id.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
      if (selfDois.has(doi)) continue
      pushPrior(
        { who: `DOI ${doi}`, link: `https://doi.org/${doi}`, kind: 'doi' },
        { ...r, identifier: doi.startsWith('10.') ? doi : id },
      )
    } else if (/^https?:\/\//.test(id) && !isUuidnaUrl(id)) {
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

  // THE OUTCOME TURNS ON PRIOR ART, NOT ON HAVING SOURCES — and it did not, which understated the captain's
  // claim on every seal that cites anything.
  //
  // In this repository's credit law 'credit' means PRIOR ART IS CREDITED FIRST AND THE CAPTAIN COMES NEXT. The
  // test was `priors.length > 0`, so citing a dataset or a paper whose numbers this ledger does arithmetic over
  // put somebody else ahead of the captain in the credit order. Measured 2026-09-05, at the captain's own
  // question: across the registry there are 6 cited sources and ZERO genuine prior art. CERN's record DOIs
  // declare resourceTypeGeneral "Dataset" and all 16,241 of their records return zero hits for formal
  // verification, Lean, kernel-verified proof or axiom-free; the Nature letter claims things about a black hole.
  // None of them claims what this ledger claims, so none of them is ahead of it.
  //
  // So 'credit' now requires PRIOR ART. Cited sources are still credited — they appear in the credit order after
  // the captain and in the record's `references` relations, which is what crediting a data source means — but
  // they no longer displace the claim. When nobody arrived first, the captain claims, and the sources are named.
  const genuinePriorArt = priors.filter((x) => !isOurOwn(x) && roleOf(x) === 'prior-art')
  const cited = priors.filter((x) => !isOurOwn(x) && roleOf(x) === 'cited-source')
  const outcome: PriorArtOutcome = genuinePriorArt.length > 0 ? 'credit' : 'claim'
  // THE CREDIT ORDER LISTS CLAIMANTS, AND A CITED SOURCE IS NOT ONE — which is what the tree's own standing law
  // was already saying and my first attempt broke. That law is "prior art credited FIRST, the captain LAST among
  // claimants", and putting cited sources after the captain made the captain no longer last. The resolution is
  // not to reorder anything but to notice that CERN did not claim a theorem: it published data. A claimant is
  // someone asserting the result. So the credit order stays claimants-only — prior art, then the captain — and
  // cited sources are credited where crediting a source actually happens: their own field, and the `references`
  // relations of the deposit record.
  // ONE CREDIT ORDER, ROLES ATTACHED — the captain's correction ("one credit system!"). Prior art leads because
  // it arrived first; the captain is LAST AMONG CLAIMANTS, which is this tree's standing law and is checked by
  // filtering on the role rather than by taking the last element; cited sources follow, credited as sources.
  // A cited dataset is not a claimant, and keeping it in the same list with its role stated is what makes that
  // legible without a second field pretending to be a second kind of credit.
  const creditOrder: Credit[] = [
    ...genuinePriorArt.map((p) => ({ who: p.who, link: p.link ?? '', role: 'prior-art' as const })),
    { ...CAPTAIN_CREDIT, role: 'claimant' as const },
    ...cited.map((p) => ({ who: p.who, link: p.link ?? '', role: 'cited-source' as const })),
  ]

  const claim =
    outcome === 'credit'
      // THE CLAIM NAMES WHICH IS WHICH. It used to list provenance and prior art together under "researched and
      // FOUND", so a record resting on our own repository, our own npm package and our own DOIs read as though
      // somebody else had got there first. Measured: 7 of 9 sources were ours. Both are stated now, separately,
      // and a record whose external set is EMPTY says so outright rather than borrowing the word "found".
      ? `PRIOR ART FOUND: ${genuinePriorArt.map((p) => p.who).join('; ')} credited FIRST; THE CAPTAIN COMES NEXT IN PLACE for seal ${seal.id}.`
      : `PRIOR ART RESEARCHED AND NONE EXISTS: no external work claims what this seal claims, so THE CAPTAIN `
        + `CLAIMS for seal ${seal.id} — explicit, never silent.`
        + (cited.length ? ` CITED SOURCES, credited as sources and not as precedence: ${cited.map((p) => p.who).join('; ')}.` : '')
        + (priors.filter((x) => isOurOwn(x)).length ? ` PROVENANCE (this project's own work): ${priors.filter((x) => isOurOwn(x)).map((p) => p.who).join('; ')}.` : '')

  const keywords = [
    ...relatedPubs.map((p) => `related:${p.id}`),
    ...priors.filter((p) => p.kind === 'doi').map((p) => p.who.replace(/^DOI /, 'doi:')),
    outcome === 'claim' ? 'captain-claim' : 'prior-art-credited',
  ]

  return {
    id: seal.id,
    // THE PARTITION, computed rather than declared: provenance is what we built on, external is who got there
    // first. Only the second is prior art, and reporting them together is what made the audit read clean.
    provenance: priors.filter((x) => isOurOwn(x)),
    external: priors.filter((x) => !isOurOwn(x)),
    citedSources: priors.filter((x) => !isOurOwn(x) && roleOf(x) === 'cited-source'),
    priorArt: priors.filter((x) => !isOurOwn(x) && roleOf(x) === 'prior-art'),
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
      // THE GAP THIS AUDIT WAS MISSING. It checked that a crediting seal had SOME prior, and every seal passed —
      // while 7 of the 9 priors across the registry were this project's own repository, package and DOIs. A
      // register crediting itself with prior art is not crediting anyone. The word "credit" now requires at
      // least one EXTERNAL source, and a seal with none is told to say so plainly rather than borrow the word.
      if (r.external.length === 0) {
        gaps.push({
          id: seal.id,
          what: `outcome is 'credit' but every prior is this project's own (${r.provenance.length} provenance, 0 external) — nobody else is being credited`,
          fix: 'either record a genuinely external source, or set the outcome to claim and say the prior art is '
            + 'MISSING. Provenance belongs in the provenance field; crediting ourselves as prior art overstates '
            + 'the record, and a DOI carries that overstatement permanently.',
        })
      }
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
      // THESE TWO RULES ENCODED THE CONFLATION THIS FILE EXISTS TO REMOVE, so they were corrected with it.
      //
      // They asserted that a 'claim' outcome means NO SOURCES AT ALL — priors empty, the captain alone in the
      // credit order. That was consistent only while "prior" meant any citation whatsoever. It does not: a seal
      // can cite CERN's datasets and a Nature letter, do arithmetic over their published integers, and still be
      // the FIRST to claim what it claims, because none of those sources claims it. Under the old rules,
      // citing anything forfeited the claim — which is precisely backwards.
      //
      // What is checked now is what actually matters: a claim outcome must carry NO genuine prior art (nobody
      // arrived first), and the captain must come FIRST in the credit order, with cited sources named after.
      if (r.priorArt.length !== 0) {
        gaps.push({
          id: seal.id,
          what: `outcome=claim but ${r.priorArt.length} genuine prior-art source(s) exist`,
          fix: 'when external work claims this first, the outcome is credit and prior art leads the credit order',
        })
      }
      // THE LAW IS ABOUT CLAIMANTS, so it is checked on the role. On a claim the captain must be the ONLY
      // claimant — cited sources sit in the same list with role 'cited-source' and do not displace him.
      const claimants = r.creditOrder.filter((c) => (c.role ?? 'claimant') === 'claimant')
      if (claimants.length !== 1 || claimants[0]?.who !== CAPTAIN_CREDIT.who) {
        gaps.push({
          id: seal.id,
          what: `claim outcome but the claimants are ${JSON.stringify(claimants.map((c) => c.who))} rather than the captain alone`,
          fix: 'on a claim the captain is the only CLAIMANT. Cited sources belong in the same credit order with '
            + 'role cited-source — citing a data source is not conceding precedence to it.',
        })
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
