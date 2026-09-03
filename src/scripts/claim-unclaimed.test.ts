import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { verdictFor } from './claim-unclaimed.js'

// THE ORDERING DEFECT THIS HOLDS. The first version checked the declines before the evidence, so subjects that
// came back carrying seven, twelve and eighteen prior-art rows were filed UNREAD because one door of ten had
// rate-limited — and the summary printed PRIOR-ART 0 while the run held thirty-seven citable rows. Finding prior
// art takes ONE positive answer and no silence elsewhere removes it; only the claim of ABSENCE rests on every
// door having spoken. Both halves are asserted below, because getting either one alone is how this went wrong.

test('EVIDENCE FIRST — one row is prior art however many doors declined', () => {
  assert.equal(verdictFor({ asked: 10, answering: 8, rows: 18, declined: ['openalex: 429', 'dblp: 503'] }), 'PRIOR-ART')
  assert.equal(verdictFor({ asked: 10, answering: 1, rows: 1, declined: ['nine doors down'] }), 'PRIOR-ART')
})

test('ABSENCE NEEDS FULL COVERAGE — a single decline forbids the claim', () => {
  assert.equal(verdictFor({ asked: 10, answering: 9, rows: 0, declined: ['openalex: 429'] }), 'UNREAD')
  assert.equal(verdictFor({ asked: 10, answering: 9, rows: 0, declined: [] }), 'UNREAD', 'a short count is a decline even unreported')
  assert.equal(verdictFor({ asked: 10, answering: 10, rows: 0, declined: [] }), 'CLAIMED', 'read by all, held by none')
})

test('the recorded verdicts are defended — a PRIOR-ART row names the DOIs that beat it', () => {
  const p = join(ROOT, 'lean', 'doi-unclaimed.json')
  if (!existsSync(p)) return // the record is written by a network run; absent is not a failure
  const rec = JSON.parse(readFileSync(p, 'utf8')) as {
    claims: { subject: string; verdict: string; priorArtDois: string[]; rows: number }[]
    counts: { claimed: number; priorArt: number; unread: number }
  }
  assert.equal(rec.counts.claimed + rec.counts.priorArt + rec.counts.unread, rec.claims.length, 'the counts must partition')
  for (const c of rec.claims) {
    if (c.verdict !== 'PRIOR-ART') continue
    assert.ok(c.rows > 0, `${c.subject}: PRIOR-ART with no rows is a verdict about nothing`)
    for (const doi of c.priorArtDois) assert.match(doi, /^10\.\d{4,9}\//, `${c.subject}: ${doi} is not a DOI`)
  }
  // a CLAIMED subject must carry no prior art at all — that IS the claim
  for (const c of rec.claims) {
    if (c.verdict !== 'CLAIMED') continue
    assert.equal(c.rows, 0, `${c.subject}: claimed while holding prior art`)
    assert.deepEqual(c.priorArtDois, [], `${c.subject}: claimed while naming DOIs`)
  }
})

// ── THE DOOR MUST SAY WHY IT DECLINED, and this is the lead that made it matter. Six sweeps reported
// `openalex-sources: responded 429` and I told the captain it was our own burst. Asked directly, the door said:
// "Insufficient budget. This request costs $0.001 but you only have $0 remaining. Resets at midnight UTC", with
// retry-after 4414. OpenAlex is METERED now — the mailto reaches a pool, not an entitlement — and the door had
// declared itself `mailto-polite`, which told a reader the free pool was reachable. Pacing did fix dblp; it was
// never going to fix a budget. A bare status hid a pricing change behind a word that means "wait a moment".
test('a refusal carries the reason the host gave, in the order a reader can act on', async () => {
  const { declineNote } = await import('../quantum/os/fetch/index.js')
  const openalex = '{"error":"Rate limit exceeded","message":"Insufficient budget. This request costs $0.001 but you only have $0 remaining. Resets at midnight UTC","retryAfter":4414}'
  const note = declineNote(429, openalex, '4414')
  assert.match(note, /Insufficient budget/, 'the actionable sentence must survive')
  assert.match(note, /retry-after 4414s/, 'and when it resets')
  assert.doesNotMatch(note, /^responded 429$/, 'a bare status is the defect this replaced')
  // PRIORITY, not alternation: `error` sits FIRST in that body and is the less useful of the two
  assert.doesNotMatch(note, /Rate limit exceeded/, 'the category must not win over the explanation')
  // and a host that says nothing still gets a truthful, minimal note
  assert.equal(declineNote(503, '', null), 'responded 503')
  assert.equal(declineNote(500, '   \n  ', null), 'responded 500')
  // a non-JSON body is carried as text rather than dropped
  assert.match(declineNote(403, 'Forbidden by policy', null), /responded 403 — Forbidden by policy/)
})

test('the OpenAlex door declares that it is metered, not that it is polite', async () => {
  const { JOURNAL_DOORS } = await import('../quantum/os/journals/index.js')
  const oa = JOURNAL_DOORS.find((d) => d.id === 'openalex-sources')
  assert.ok(oa, 'the door must still be asked — a declined door is a real state, and it forbids a claim of absence')
  assert.equal(oa.access, 'budgeted', 'calling a metered door polite tells a reader the free pool is reachable')
  assert.match(oa.honest, /METERED/, 'the honest line must carry it too, since that is what a caller reads')
})

// ── THE DOMAINS ARE THE RICHER FINDING. Nothing swept came back unclaimed, so the value is not in the claim —
// it is in the 51 publishers the prior art named, of which this tree had 7 on file. Each owner is the AGENCY's
// answer (Crossref, then DataCite), which is the only standard this module accepts for naming a prefix.
test('every prior-art domain is attributed to its agency, or recorded as unnamed', () => {
  const p = join(ROOT, 'lean', 'doi-domains.json')
  if (!existsSync(p)) return // written by a network run; absent is not a failure
  const rec = JSON.parse(readFileSync(p, 'utf8')) as {
    prefixes: number; named: number; alreadyOnFile: number
    domains: { prefix: string; count: number; owner: string; agency: string; note: string }[]
  }
  assert.equal(rec.domains.length, rec.prefixes, 'the count must BE the list')
  assert.equal(rec.named, rec.domains.filter((d) => d.owner).length, 'named must BE the ones carrying an owner')
  assert.ok(rec.alreadyOnFile <= rec.prefixes)
  for (const d of rec.domains) {
    assert.match(d.prefix, /^10\.\d{4,9}$/, `${d.prefix} is not a DOI prefix`)
    assert.ok(d.count > 0, `${d.prefix}: a domain with no DOIs behind it is not a finding`)
    // AN UNNAMED OWNER MUST STAY EMPTY. Filling it with a placeholder — "unknown publisher", the prefix itself —
    // would make the named count a lie while looking more complete, which is the direction that flatters.
    if (!d.owner) assert.match(d.note, /neither agency|unreachable|responded/, `${d.prefix}: unnamed without a reason`)
    else assert.ok(d.agency === 'crossref' || d.agency === 'datacite', `${d.prefix}: owner named by no agency`)
  }
  // the heaviest domains first, so the report opens on the publishers this tree actually sits beside
  for (let i = 1; i < rec.domains.length; i++) assert.ok(rec.domains[i - 1]!.count >= rec.domains[i]!.count, 'ordered by weight')
})
