#!/usr/bin/env node
// @non-harmonic: sweeps the public journal doors over the network — the declared boundary, like gen-alpine-apps
// and refused-robots. Never imported by the core.
//
// claim-unclaimed — THE CAPTAIN CLAIMS WHAT NOBODY ELSE HAS PUBLISHED, and nothing else.
//
// THE CREDIT LAW is that the captain claims the unclaimed. Turning that into an act needs one question answered
// per subject: does prior art exist? The doors answer it — DOAJ, Crossref, OpenAlex, DataCite, HAL, EuropePMC,
// PubMed, DBLP, INSPIRE-HEP, PLOS, bioRxiv — and a DOI coming back is prior art by the only definition this
// tree can check.
//
// EVIDENCE OUTRANKS A DECLINE, and the first version of this got it backwards. It checked the declines first,
// so subjects that came back with SEVEN, TWELVE and EIGHTEEN prior-art rows were filed UNREAD because one door
// of ten had rate-limited — and the report said PRIOR-ART 0 while holding thirty-seven citable rows. Finding
// prior art takes ONE positive answer and no amount of silence elsewhere removes it; only the claim of ABSENCE
// needs every door to have spoken. The order below is therefore: evidence, then coverage.
//
// AND THE WHOLE DIFFICULTY IS THE THIRD ANSWER. A door that returns nothing and a door that REFUSES to answer
// look identical in a row count, and they mean opposite things: one is evidence of absence, the other is the
// absence of evidence. The polite-pool APIs rate-limit a shared egress — measured 9 of 10 answering from the
// edge against 10 of 10 locally — so on any real run some doors decline. Claiming on that silence would mint
// the captain's name onto subjects somebody else may well have published, which is the one outcome this whole
// discipline exists to prevent. So a subject is CLAIMABLE only when every asked door answered and all of them
// came back empty; a single decline sends it to `unread`, which is a state, not a failure.
//
// AND THE DOMAINS COME WITH IT, in this script rather than a second one. The prior art's DOIs name PUBLISHERS —
// 51 distinct prefixes across the first record, of which this tree had 7 on file — and that is the richer
// finding, because nothing swept came back unclaimed. Resolving them was briefly its own gen-* script, which a
// finder immediately caught as a generator no chain invokes: the way off that list is to be wired into
// generate.ts, and a reconcile has no business making fifty-one network calls. The owners are derived from the
// same sweep as the DOIs, so they belong to the same act. One script, one network trip, two records.
//
//   npm run x -- claim-unclaimed              report the partition over the default batch
//   npm run x -- claim-unclaimed --write      record the claims that were EARNED
//   npm run x -- claim-unclaimed --limit 20   widen the batch (each subject is one sweep over eleven doors)
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { PRINCIPLES } from '../theorems/index.js'
import { journalSweep } from '../quantum/os/journals/index.js'
import { doiPrefixOf, doiPrefixTag, resolveDoiPrefix } from '../quantum/os/doi/index.js'
import { toUuid } from '../address.js'
import { merkleGravity } from '../gravity/index.js'
import { handleOf } from '../handle.js'

const OUT = join(ROOT, 'lean', 'doi-unclaimed.json')
const DOMAINS_OUT = join(ROOT, 'lean', 'doi-domains.json')
const WRITE = process.argv.includes('--write')
const limitArg = process.argv.indexOf('--limit')
const BATCH = limitArg > 0 ? Number(process.argv[limitArg + 1] ?? 6) : 6

export interface ClaimVerdict {
  subject: string
  asked: number
  answering: number
  rows: number
  /** CLAIMED = read by every door and empty · PRIOR-ART = somebody published it · UNREAD = a door declined */
  verdict: 'CLAIMED' | 'PRIOR-ART' | 'UNREAD'
  declined: string[]
  /** THE DEFENCE. A PRIOR-ART verdict is only as good as the DOIs it can name, so they ride with it: this is
   *  what the credit order cites ahead of the captain, and what anyone checking the verdict resolves. */
  priorArtDois: string[]
}

/** verdictFor(sweep) → the three-way answer. EVIDENCE FIRST: one row is prior art whatever else declined; a
 *  decline only matters when the count is zero, because that is the only verdict resting on absence. */
export function verdictFor(s: { asked: number; answering: number; rows: number; declined: readonly string[] }): ClaimVerdict['verdict'] {
  if (s.rows > 0) return 'PRIOR-ART'
  if (s.declined.length > 0 || s.answering < s.asked) return 'UNREAD'
  return 'CLAIMED'
}

// MAIN-GUARDED, because a test that imports this module must not go to the network. The finder for verdictFor
// imported it and paid a 35-second sweep before its first assertion ran — the same defect that once collapsed a
// dispatcher test to one assertion. An entry point's work belongs behind the guard; its RULES stay importable.
const isMain = process.argv[1]?.endsWith('claim-unclaimed.js') ?? false
if (isMain) {
  const subjects = [...new Set(PRINCIPLES.map((p) => p[1]))].slice(0, BATCH)
  console.log(`claim-unclaimed — sweeping ${subjects.length} subject(s) over the journal doors …`)

  // PACED, because the rate limiting was self-inflicted. Six subjects went out back to back and each asks ten
  // doors at once — sixty requests in a few seconds against pools documented at ten per second. The mailto is
  // already configured, so the polite pool was never the problem; the burst was. One sweep at a time, with a gap
  // between them, turns a 429 into an answer.
  const PAUSE_MS = 2_000
  const verdicts: ClaimVerdict[] = []
  for (const subject of subjects) {
    const s = await journalSweep(subject, { limit: 3 })
    const verdict = verdictFor(s)
    const dois = [...s.journalLevel, ...s.articleLevel].flatMap((r) => r.rows).flatMap((r) => (r.doi ? [r.doi] : []))
    verdicts.push({ subject, asked: s.asked, answering: s.answering, rows: s.rows, verdict, declined: s.declined, priorArtDois: [...new Set(dois)] })
    console.log(`  ${verdict.padEnd(9)} ${s.answering}/${s.asked} doors · ${s.rows} row(s) · ${[...new Set(dois)].length} DOI(s) · ${subject.slice(0, 48)}`)
    for (const d of s.declined.slice(0, 2)) console.log(`             declined — ${d.slice(0, 90)}`)
    if (subject !== subjects[subjects.length - 1]) await new Promise((r) => setTimeout(r, PAUSE_MS))
  }

  const claimed = verdicts.filter((v) => v.verdict === 'CLAIMED')
  const priorArt = verdicts.filter((v) => v.verdict === 'PRIOR-ART')
  const unread = verdicts.filter((v) => v.verdict === 'UNREAD')

  console.log(`\n  CLAIMED   ${claimed.length}  — every door answered and none held prior art; the captain's by the credit law`)
  console.log(`  PRIOR-ART ${priorArt.length}  — DEFENDED by ${priorArt.reduce((n, v) => n + v.priorArtDois.length, 0)} citable DOI(s); the credit order names them ahead of the captain`)
  console.log(`  UNREAD    ${unread.length}  — a door declined, so absence was never established and NOTHING is claimed`)

  if (!WRITE) {
    console.log('\n  record the earned claims:  npm run x -- claim-unclaimed --write')
  } else {
    const prior = existsSync(OUT) ? (JSON.parse(readFileSync(OUT, 'utf8')) as { claims?: ClaimVerdict[] }).claims ?? [] : []
    // a subject already recorded keeps its earlier verdict unless this run EARNED a claim for it: the record only
    // ever gains established absences, and an UNREAD run never overwrites a CLAIMED one with a weaker answer
    const bySubject = new Map(prior.map((c) => [c.subject, c]))
    for (const c of claimed) bySubject.set(c.subject, c)
    for (const c of [...priorArt, ...unread]) if (!bySubject.has(c.subject)) bySubject.set(c.subject, c)
    const claims = [...bySubject.values()].sort((a, b) => (a.subject < b.subject ? -1 : 1))
    const receipt = merkleGravity([toUuid('doi-unclaimed'), ...claims.map((c) => toUuid(`${c.verdict}|${c.subject}`))])
    writeFileSync(OUT, JSON.stringify({
      definition: 'uuidnaOS·doi·unclaimed',
      note: 'A subject is CLAIMED only when every asked door ANSWERED and none returned a DOI. A declined door makes the subject UNREAD — the absence of evidence is not evidence of absence, and claiming on a rate-limited silence would put the captain\'s name on somebody else\'s work.',
      claims,
      counts: { claimed: claims.filter((c) => c.verdict === 'CLAIMED').length, priorArt: claims.filter((c) => c.verdict === 'PRIOR-ART').length, unread: claims.filter((c) => c.verdict === 'UNREAD').length },
      receipt,
      handle: handleOf(receipt),
    }, null, 2) + '\n')
    console.log(`\n✓ claim-unclaimed — ${claims.length} subject(s) recorded to lean/doi-unclaimed.json · receipt ${handleOf(receipt)}`)

  // ── WHO PUBLISHED IT. The owner is the AGENCY's answer — Crossref first, then DataCite — which is the only
  // standard this module accepts for naming a prefix, so `10.1007` becomes "Springer Science and Business Media
  // LLC" on the registry's authority and not on anybody's recollection. A prefix neither agency names keeps an
  // EMPTY owner: filling it with a placeholder would make the named count a lie while looking more complete.
  const doiCounts = new Map<string, number>()
  for (const doi of claims.flatMap((c) => c.priorArtDois)) {
    const prefix = doiPrefixOf(doi)
    if (prefix) doiCounts.set(prefix, (doiCounts.get(prefix) ?? 0) + 1)
  }
  const ordered = [...doiCounts.entries()].sort((a, b) => (b[1] - a[1]) || (a[0] < b[0] ? -1 : 1))
  console.log(`\nclaim-unclaimed — attributing ${ordered.length} prior-art domain(s) to their agency …`)
  const domains: { prefix: string; count: number; owner: string; agency: string; note: string }[] = []
  for (const [prefix, count] of ordered) {
    const r = await resolveDoiPrefix(prefix)
    domains.push({ prefix, count, owner: r.owner, agency: r.agency, note: r.note })
    console.log(`  ${prefix.padEnd(9)} ×${String(count).padStart(2)}  ${r.agency.padEnd(9)} ${r.owner.slice(0, 58) || '(neither agency named an owner)'}`)
    await new Promise((res) => setTimeout(res, 400))
  }
  const named = domains.filter((d) => d.owner)
  const onFile = domains.filter((d) => doiPrefixTag(d.prefix))
  const domainReceipt = merkleGravity([toUuid('doi-domains'), ...domains.map((d) => toUuid(`${d.prefix}|${d.owner}`))])
  writeFileSync(DOMAINS_OUT, JSON.stringify({
    definition: 'uuidnaOS·doi·domains',
    note: 'Every DOI domain the prior-art sweep met, with the owner as its AGENCY names it — Crossref first, then DataCite. A prefix neither agency names keeps an empty owner rather than a placeholder. Derived from the same sweep as lean/doi-unclaimed.json; DOI_PREFIXES stays the hand-verified core the code reasons about.',
    prefixes: domains.length,
    named: named.length,
    alreadyOnFile: onFile.length,
    priorArtDois: claims.flatMap((c) => c.priorArtDois).length,
    domains,
    receipt: domainReceipt,
    handle: handleOf(domainReceipt),
  }, null, 2) + '\n')
  console.log(`\n✓ claim-unclaimed — ${domains.length} domain(s), ${named.length} named by their agency, ${onFile.length} already on file`)
  console.log(`  lean/doi-domains.json · receipt ${handleOf(domainReceipt)}`)

  // THE VERDICTS EXIST TO BE ACTED ON, so the sweep hands them straight to the publisher — report-only, because
  // writing a deposit artefact is a separate decision and minting its DOI is a third. This is the pipeline the
  // captain asked for end to end (no prior art → publication → Zenodo gives the DOI), and it is also why
  // publish-novelty is not a dormant script: establishing novelty and acting on it are one act in two halves.
  console.log('')
  const { spawnSync } = await import('node:child_process')
  spawnSync('node', [join(ROOT, 'dist', 'scripts', 'publish-novelty.js')], { stdio: 'inherit' })
  }
}
