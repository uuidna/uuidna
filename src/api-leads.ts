// api-leads — EVERY EXTERNAL API IS A SOURCE OF LEADS, AND A LEAD HOLDS A RELEASE.
//
// (the captain, 2026-08-25: "next release only possible if all leads verified. lead is anything not verified.
// automate" — and 2026-09-25: "automate so all apis are source of new leads to base new releases on")
//
// THE GAP THIS CLOSES, MEASURED BEFORE IT WAS WRITTEN. The tree already asks the outside world constantly:
// research.yml runs gen-search-feed --online on a daily cron, and its answers land in lean/search-feed.json with
// eight open leads in exactly the {what, owes} shape a lead has. lean/wave-queue.json holds the candidates the
// kernel has not yet decided. lean/doi-harvest.json holds the verdict of the Zenodo, Crossref and DataCite APIs on
// this repository's own archive claims — with one record DISAGREEING. And leads-gate.ts, which is THE RELEASE GATE
// ("no version ships while a lead is open"), read none of them. Its five sources all read the repository. So an
// API could contradict this tree every day and no release would ever notice: the answers arrived, were written
// down, and stopped. That is not a missing mechanism — it is a mechanism wired to nothing.
//
// A PURE EVALUATOR PER ARTEFACT, because leads-gate keeps readings at the boundary and verdicts in the library
// (its own words: "spawning and file reading are the boundary's job, the law is the library's"). Each function
// here takes already-parsed JSON, or null for absent, and returns the same SourceReading the gate's own sources
// return. `null` is UNREAD, never clean — an API whose artefact was never written has told us nothing, and a gate
// that ships on that has confused silence for consent.
//
// NO TIMESTAMP LIVES IN THESE ARTEFACTS, and that is deliberate rather than an omission. Dimension 5 of the
// release audit regenerates every derived file and requires `git diff --exit-code` to be clean, so a wall-clock
// field would make the tree dirty on every run and the determinism gate would have to be weakened to accommodate
// it. Freshness is therefore the WORKFLOW's guarantee — the harvesters run on the release path, so the artefact is
// current by construction — and never a field this code could check. lean/doi-harvest.json carries no timestamp
// for the same reason, which is why that pattern is followed rather than re-litigated here.
import { read, unread, type Lead, type SourceReading } from './leads.js'

const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])
const str = (v: unknown, fallback: string): string => {
  const s = typeof v === 'string' ? v.trim() : ''
  return s.length > 0 ? s : fallback
}

/**
 * ZENODO · CROSSREF · DATACITE — do our own permanent records say what this repository claims they say?
 *
 * This is the API answer that has already cost the corpus once: src/zenodo-seals.ts records that the declared
 * archive resolved to a different author's paper, and that "NOTHING ON THIS FILESYSTEM COULD SEE IT". mint-gate
 * reads this artefact so a MINT cannot proceed on an unverified claim. A RELEASE could, until now.
 */
/**
 * The MISSING DOORS the tree has asked for more than once — MCP self-sufficiency as a release condition.
 *
 * The captain, 2026-09-28: "cross all leads adding more leads on the way of improving self sufficiency of mcp".
 *
 * mcp-bypass already records every escape from the MCP-only rule as a door request, and 1,139 distinct requests had
 * accumulated without a single one reaching leads-gate. The release gate had therefore never been held by a missing
 * door, which made "only mcp use is allowed" a rule with no consequence. This is the reader that gives it one.
 *
 * ONLY THE REPEATED GAPS OPEN A LEAD. A gap recorded once is an escape nobody needed again; recorded twice or more, the
 * tree has stated the door is load-bearing. The criterion is the record's own repetition, not a number chosen here, and
 * the single escapes stay in the census as evidence without holding a release — because a gate that can never be
 * satisfied stops being read, which would cost more than it collects.
 */
export function mcpGapLeads(json: unknown | null): SourceReading {
  if (json === null) {
    return unread('mcp-self-sufficiency', 'lean/mcp-gaps.json is absent — run `npm run x -- gen-mcp-gaps`; the door requests live in dist/evidence/mcp-gaps.jsonl, which a clean checkout does not carry, and unread is not zero gaps')
  }
  const c = json as { records?: unknown; distinct?: unknown; gaps?: unknown }
  const gaps = arr(c.gaps) as { gap?: unknown; hits?: unknown }[]
  if (gaps.length === 0) {
    return unread('mcp-self-sufficiency', 'the census declares no gaps at all — for a tree whose hook records every escape that is a reader failure, not a clean bill')
  }
  const open: Lead[] = gaps
    .filter((g) => Number(g.hits ?? 0) > 1)
    .map((g) => ({
      source: 'mcp-self-sufficiency',
      what: `the tree escaped the MCP door ${Number(g.hits ?? 0)} times for the same missing capability: ${str(g.gap, '(unnamed)')}`,
      owes: 'build the door and call it through `npm run mcp -- <tool>`, or seal a theorem showing the capability is out of scope for the edge — the escape hatch is not the answer twice',
    }))
  return read('mcp-self-sufficiency', open, gaps.length - open.length,
      // EVERY ROW OF lean/mcp-gaps.json IS A RECORDED ESCAPE: a session needed a capability, no door served it, and the
      // hook wrote the request down. So every lead this census makes owes a DOOR, never a theorem, and it says so here
      // rather than leaving a prose rule in leads.ts to infer it from the sentence — which it did wrongly for 111 of
      // them, twice, on two different spellings.
      false)
}

export function doiHarvestLeads(json: unknown | null): SourceReading {
  if (json === null) return unread('api-doi-harvest', 'lean/doi-harvest.json is absent — the public record has not been read, and unread is not agreement')
  const h = json as { owned?: unknown; readCount?: unknown; agreeing?: unknown; disagreeing?: unknown; rows?: unknown }
  const owned = Number(h.owned ?? 0)
  const readCount = Number(h.readCount ?? 0)
  const disagreeing = arr(h.disagreeing)
  if (owned === 0) return unread('api-doi-harvest', 'the harvest declares zero owned records — an empty census cannot clear a claim')
  // A RECORD NOBODY MANAGED TO READ IS ITS OWN LEAD. Reporting only the disagreements would let an outage clear
  // every claim at once, which is the precise shape of the vacuous pass this file exists to refuse.
  const unreadRows = arr(h.rows).filter((r) => (r as { read?: unknown }).read !== true)
  const open: Lead[] = [
    ...disagreeing.map((r) => {
      const row = r as { id?: unknown; declaredDoi?: unknown; liveRecordId?: unknown; liveTitle?: unknown }
      return {
        source: 'api-doi-harvest',
        what: `this repository cites ${str(row.declaredDoi, '(no doi)')} as ${str(row.id, 'an owned record')}, and the public record does not support it (resolves to ${str(row.liveRecordId, '?')}, "${str(row.liveTitle, '').slice(0, 60)}")`,
        owes: 'correct src/zenodo-seals.ts to the identifier that IS this work, verified by resolution — or, for a twin chain, cross-declare isIdenticalTo on the next deposit',
      }
    }),
    ...unreadRows.map((r) => {
      const row = r as { id?: unknown; declaredDoi?: unknown; reason?: unknown }
      return {
        source: 'api-doi-harvest',
        what: `the archive claim ${str(row.declaredDoi, '(no doi)')} (${str(row.id, 'record')}) could not be read back`,
        owes: `re-run audit-doi-harvest with network access — ${str(row.reason, 'no reason recorded')}`,
      }
    }),
  ]
  // SATURATING SUBTRACTION IS ℕ'S OWN MINUS, and writing it as Math.max(0, a - b) borrowed float arithmetic to
  // express a fact about counts. This ledger's evaluator already draws exactly this distinction — "Nat.sub saturates
  // at 0; Int.sub is true minus" — so the ternary is not a workaround for the scanner, it is the right ring.
  const confirmed = readCount > disagreeing.length ? readCount - disagreeing.length : 0
  return read('api-doi-harvest', open, confirmed)
}

/**
 * NPM · ZENODO · DOI.ORG — is the release this tree describes actually THERE?
 *
 * Measured 2026-09-25: package.json 0.3.1, npm latest 0.3.0, Zenodo newest versioned record 0.3.0, no v0.3.1 tag
 * anywhere. A version bumped, a release never cut, every repository gate green. A release gate cannot see that BY
 * CONSTRUCTION — every gate in this tree reads this filesystem, and a release is a state of two public services, so
 * the fact that contradicts it lives where no local read reaches. A gate blind by construction is one in name only, so each failed outward check becomes a lead the next release must clear.
 */
export function releaseLiveLeads(json: unknown | null): SourceReading {
  if (json === null) return unread('api-release-live', 'lean/release-live.json is absent — npm and Zenodo have not been asked whether the release exists')
  const r = json as { version?: unknown; checks?: unknown; failed?: unknown; passed?: unknown }
  const checks = arr(r.checks)
  if (checks.length === 0) return unread('api-release-live', 'the report holds no checks — an empty battery passes everything, which is the vacuous case')
  // A PENDING CHECK IS NOT A LEAD. release-live marks the cut-sensitive checks `pending` when no tag exists for the
  // version, because publish.yml runs leads-gate BEFORE publishing: treating "this version is not on npm yet" as a
  // lead would block the release that puts it there, permanently, on a true statement. Tagged-and-absent is still a
  // lead — that is a release which was cut and did not land.
  const failed = checks.filter((c) => (c as { ok?: unknown; pending?: unknown }).ok !== true && (c as { pending?: unknown }).pending !== true)
  const open: Lead[] = failed.map((c) => {
    const k = c as { name?: unknown; measured?: unknown; why?: unknown; unread?: unknown }
    const isUnread = k.unread === true
    return {
      source: 'api-release-live',
      what: `${str(k.name, 'an outward check')} does not hold for ${str(r.version, 'this version')}: ${str(k.measured, 'no measurement recorded')}`,
      owes: isUnread
        ? 'the public service did not answer, so nothing was learned — re-run release-live with network access; unread is not live'
        : str(k.why, 'settle the check, or record why the release may ship without it'),
    }
  })
  return read('api-release-live', open, checks.length - failed.length)
}

/**
 * THE PUBLIC SEARCH AND RESEARCH APIS — what the world asks that this ledger cannot answer, and it cannot BY
 * CONSTRUCTION: what it seals is closed finite propositions a kernel decides, and an open research question is not
 * one. That is a boundary, not a shortfall — and an unanswerable question is exactly what a lead is for.
 *
 * lean/search-feed.json is written by gen-search-feed --online on a daily cron and already carries its findings
 * as {what, owes}. They were never read by the release gate, so the daily question "what does the world ask that
 * we cannot answer?" had no consequence — unanswerable by construction, in the sense above. A silent query — one that rings no sealed theorem — is a lead by the
 * captain's own definition: anything not verified.
 */
export function searchFeedLeads(json: unknown | null): SourceReading {
  if (json === null) return unread('api-search-feed', 'lean/search-feed.json is absent — run gen-search-feed (research.yml does it on a cron)')
  const f = json as { leads?: unknown; results?: unknown; online?: unknown; queries?: unknown }
  const queries = arr(f.queries)
  if (queries.length === 0) return unread('api-search-feed', 'the feed asked nothing — a census of zero queries clears every query')
  // AN OFFLINE FEED IS STALE, NOT EMPTY — and the difference matters in both directions.
  //
  // The first draft of this reader returned `unread` for a feed generated without network, on the reasoning that its
  // silence is a fact about the network rather than about the ledger. That reasoning is right and the conclusion was
  // wrong: `unread` DISCARDS the leads the artefact does contain, and they are real whatever the feed's freshness —
  // a query that rang no sealed theorem yesterday still rings none today. This file warns two functions above that
  // an outage must not clear every claim at once; throwing away eight known leads because the ninth could not be
  // taken is the same error pointing the other way.
  //
  // So the staleness becomes its OWN lead and the rest are reported. Measured when this was written: the committed
  // lean/search-feed.json carries online:false and research.yml — the daily job that regenerates it with --online
  // and commits it — was failing. The online feed was not reaching the tree at all, which is precisely the kind of
  // fact a lead is for, and precisely what returning `unread` would have buried under a network excuse.
  const stale: Lead[] = f.online === true ? [] : [{
    source: 'api-search-feed',
    what: 'the search feed was generated OFFLINE, so no public API was asked what the world is searching for',
    owes: 'research.yml runs gen-search-feed --online on a daily cron and commits the result — check that job is green, or run it by hand; the leads below stand meanwhile, they are simply not fresh',
  }]
  const open: Lead[] = [...stale, ...arr(f.leads).map((l) => {
    const row = l as { query?: unknown; what?: unknown; owes?: unknown; source?: unknown }
    return {
      source: 'api-search-feed',
      what: str(row.what, `the query "${str(row.query, '?')}" rings no sealed theorem`),
      owes: str(row.owes, 'a `by decide` wing whose key or gloss names that query, or a named boundary saying why the ledger is silent'),
    }
  })]
  return read('api-search-feed', open, arr(f.results).length)
}

/**
 * THE CONVEYOR — candidates the APIs minted that the kernel has not yet decided.
 *
 * `pending` is the honest middle: a fragment the outside world suggested, not yet proved and not yet refused.
 * `accepted` and `refused` are both settled — a refusal with a recorded reason is a verdict, not an open question.
 */
export function waveQueueLeads(json: unknown | null): SourceReading {
  if (json === null) return unread('api-wave-queue', 'lean/wave-queue.json is absent — the conveyor has no record, so nothing can be said about what is pending')
  const q = json as { pending?: unknown; accepted?: unknown; refused?: unknown }
  const open: Lead[] = arr(q.pending).map((p) => {
    const row = p as { key?: unknown; why?: unknown; lean?: unknown }
    return {
      source: 'api-wave-queue',
      what: `conveyor candidate ${str(row.key, '(unnamed)')} is pending: ${str(row.why, 'no rationale recorded').slice(0, 120)}`,
      owes: str(row.lean, '') !== ''
        ? 'run the kernel probe — the statement is written, so `by decide` either closes it or refuses it by name'
        : 'a decidable statement, or a refusal recorded with the reason it cannot be one',
    }
  })
  return read('api-wave-queue', open, arr(q.accepted).length + arr(q.refused).length)
}

/**
 * OUR OWN EDGE, ASKED FROM OUTSIDE — a production route that cannot serve is a lead, and only an outside ask can
 * tell: reading the route's source here proves it exists, never that it answers.
 *
 * The 503 that had failed school-grade six times running came from uuidna.com itself, not a third party: the SCHOOL
 * KV namespace has never been bound, which wrangler.toml states as the intended state until the owner creates it.
 * That is an owner act rather than a defect, and it is still an unverified claim — the site advertises a school
 * whose store does not exist. `unprovisioned` is therefore OPEN, not clean and not broken: the release that ships
 * while it stands is shipping a route that answers 503, and somebody should have to decide that on purpose.
 */
export function schoolQueueLeads(json: unknown | null): SourceReading {
  if (json === null) return unread('api-school-queue', 'lean/school-queue.json is absent — the public queue has not been asked whether it can serve')
  const q = json as { state?: unknown; why?: unknown; queue?: unknown; graded?: unknown; void?: unknown }
  const state = str(q.state, '')
  const where = str(q.queue, 'the public queue')
  if (state === 'graded') {
    // A VOID SUBMISSION IS ITS OWN LEAD: it stays queued because this tree could not resolve its lesson.
    const voided = Number(q.void ?? 0)
    const open: Lead[] = voided > 0
      ? [{ source: 'api-school-queue', what: `${voided} queued submission(s) are VOID — their lesson does not resolve in this tree`, owes: 'serve the lesson the submission names (gen-school-lessons), or retire the course by name' }]
      : []
    return read('api-school-queue', open, Number(q.graded ?? 0))
  }
  if (state === 'unprovisioned') {
    return read('api-school-queue', [{
      source: 'api-school-queue',
      what: `${where} answers 503 — ${str(q.why, 'the store is not bound')}`,
      owes: 'the owner runs `wrangler kv namespace create SCHOOL` and uncomments [[kv_namespaces]] SCHOOL in wrangler.toml — or the route is retired, so the site stops advertising a store that does not exist',
    }], 0)
  }
  // UNGRADED: the queue served, and the host that asked could not judge. Waiting work is a lead; an empty queue is
  // simply an empty queue, and inventing a lead for it would be the mirror of the vacuous pass.
  if (state === 'ungraded') {
    const waiting = Number(q.void ?? 0)
    return waiting > 0
      ? read('api-school-queue', [{
          source: 'api-school-queue',
          what: `${waiting} submission(s) are queued and unjudged — ${str(q.why, 'the probing host could not run the kernel')}`,
          owes: 'school-grade.yml installs Lean and grades them on its schedule — check that job is green',
        }], 0)
      : read('api-school-queue', [], 0)
  }
  if (state === 'broken') {
    return read('api-school-queue', [{
      source: 'api-school-queue',
      what: `${where} is failing — ${str(q.why, 'no reason recorded')}`,
      owes: 'repair the route, or record why a release may ship while it answers an error',
    }], 0)
  }
  return unread('api-school-queue', `the report names no state I can act on (${state || 'empty'}) — a shape drift`)
}

/** Every API source, in one place, so a new artefact is added here rather than remembered in a workflow. */
export const API_LEAD_READERS = [
  { source: 'api-doi-harvest', path: 'lean/doi-harvest.json', of: doiHarvestLeads },
  { source: 'api-release-live', path: 'lean/release-live.json', of: releaseLiveLeads },
  { source: 'api-search-feed', path: 'lean/search-feed.json', of: searchFeedLeads },
  { source: 'api-wave-queue', path: 'lean/wave-queue.json', of: waveQueueLeads },
  { source: 'api-school-queue', path: 'lean/school-queue.json', of: schoolQueueLeads },
  // THE TOOL SURFACE IS A SOURCE TOO. Every other entry here is an external API; this one is the tree asking itself
  // whether its own doors exist, which is the condition "only mcp use is allowed" needs in order to mean anything.
  { source: 'mcp-self-sufficiency', path: 'lean/mcp-gaps.json', of: mcpGapLeads },
] as const
