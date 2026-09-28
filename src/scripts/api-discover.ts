#!/usr/bin/env node
// @non-harmonic: measures how long a live public API took to answer. The latency IS the reading — a probe that
// reports whether a host answered without reporting how slowly cannot tell a healthy source from one about to
// time out, and TIMEOUT_MS is meaningless without a clock to compare against. Nothing sealed depends on it: the
// ms column is a reading of one host at one moment, like the measured column in the verify-vs-recompute table.
// api-discover — WALK THE CHAIN: the declared APIs, what each answers, its schema, its methods, its quantities.
//
// The captain, 2026-09-28: "discover the apis to discover the schemas to discover the methods to discover the cross
// formulas and prove on the apis as cross applications".
//
// THE PROBE IS THE EVIDENCE AND THE DECLARATION IS NOT. src/life-apis.ts declares twenty-two sources, each with the
// known-good query that checks it, and a declaration is explicitly NOT a claim that the endpoint answers. This is the
// door that finds out. A source that does not answer is recorded as not answering — never as answering with nothing —
// because collapsing those two is how an outage reads as a clean probe.
//
// ONE REQUEST PER SOURCE, SEQUENTIALLY, WITH A TIMEOUT. These are other people's public services and the probe exists
// to check they answer, not to measure them: a parallel fan-out across twenty-two endpoints is a burst nobody asked for,
// and the politeness costs only wall-clock in a door that is receipted anyway.
//
// URL SHAPE IS A GUESS AND ITS FAILURE IS DATA. Every probe here is built as base + query parameters, which is right for
// most of these and wrong for the ones that take a path (PubChem's /compound/name/<n>/property/... for instance). A
// source that refuses the query form is reported with its status, and that is a finding about the declaration rather
// than a fault in the source — the fix is a better probe, recorded where the probe lives.

import { LIFE_APIS, type LifeApi } from '../life-apis.js'
import { discoveryOf, type Discovered } from '../api-discovery.js'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { wrArtifact } from '../artifact.js'

const TIMEOUT_MS = 8000
// A NAMED AGENT WITH A CONTACT URL, because several of these services refuse an unidentified client outright and are
// right to: a probe that hides what it is gives an operator no way to ask it to stop.
const UA = 'uuidna-api-discover/1.0 (+https://uuidna.com; ceccec@psg.bg)'
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith('-'))

const needsKey = (a: LifeApi): boolean =>
  /KEY REQUIRED|REGISTRATION REQUIRED|free key is now required/.test(a.access)

const urlOf = (a: LifeApi): string => {
  const u = new URL(a.base + (a.path ?? ''))
  for (const [k, v] of Object.entries(a.probe)) u.searchParams.set(k, String(v))
  return u.toString()
}

interface Probed extends Discovered { status: number | null; ms: number; url: string; keyed: boolean }

const probe = async (a: LifeApi): Promise<Probed> => {
  const url = urlOf(a)
  if (needsKey(a)) {
    return {
      ...discoveryOf(a.id, null, `a credential is required and none is held: ${a.access}`),
      status: null, ms: 0, url, keyed: true,
    }
  }
  const at = Date.now()
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)
  try {
    // POST WHEN A BODY IS DECLARED, because a GraphQL endpoint answers nothing else. The method is derived from the
    // declaration rather than guessed per host: a source that needs a body says so, and one that does not is a GET.
    const res = await fetch(url, {
      signal: ctl.signal,
      method: a.post ? 'POST' : 'GET',
      headers: a.post
        ? { accept: 'application/json', 'content-type': 'application/json', 'user-agent': UA }
        : { accept: 'application/json', 'user-agent': UA },
      ...(a.post ? { body: JSON.stringify(a.post) } : {}),
    })
    const ms = Date.now() - at
    if (!res.ok) {
      return { ...discoveryOf(a.id, null, `HTTP ${res.status} for the declared probe`), status: res.status, ms, url, keyed: false }
    }
    const text = await res.text()
    let body: unknown
    try { body = JSON.parse(text) } catch {
      return { ...discoveryOf(a.id, null, `answered ${text.length} bytes that are not JSON`), status: res.status, ms, url, keyed: false }
    }
    return { ...discoveryOf(a.id, body, 'answered JSON'), status: res.status, ms, url, keyed: false }
  } catch (e) {
    const ms = Date.now() - at
    // WHY A FAILURE IS CLASSIFIED AND NOT JUST STRINGIFIED. "request failed: TypeError: fetch failed" was reported for
    // wfo, and the census counted it beside a 404 as "did not answer" — but the host DOES answer: curl gets 200, and
    // node's own cause says `unable to verify the first certificate`, an incomplete chain this client will not accept,
    // with the remedy named in the message (--use-system-ca). A dark endpoint and an endpoint this client cannot
    // verify are different facts about different things — one is a claim about the source, the other about the
    // prober's trust store — and folding them made a working source look retired. The cause chain carries the answer,
    // so it is read rather than discarded: `e.cause` is where node puts it and `String(e)` throws it away.
    const cause = e instanceof Error ? String((e as { cause?: { message?: string; code?: string } }).cause?.message ?? (e as { cause?: { code?: string } }).cause?.code ?? '') : ''
    const why = e instanceof Error && e.name === 'AbortError'
      ? `no answer within ${TIMEOUT_MS}ms`
      : /certificate|CERT_|self.signed|chain/i.test(cause)
        ? `THIS CLIENT CANNOT VERIFY THE TLS CHAIN, which is not the source failing to answer: ${cause}. curl reaches the same URL; node ships its own CA store and the remedy it names is --use-system-ca. Re-probe before treating this as a dark endpoint.`
        : /ENOTFOUND|EAI_AGAIN|DNS/i.test(cause)
          ? `the host name did not resolve (${cause}) — a DNS answer, not an HTTP one`
          : /ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ETIMEDOUT/i.test(cause)
            ? `the connection was refused or dropped (${cause}) — reached the network, never reached the application`
            : `request failed: ${String(e)}${cause ? ` (cause: ${cause})` : ''}`
    return { ...discoveryOf(a.id, null, why), status: null, ms, url, keyed: false }
  } finally {
    clearTimeout(timer)
  }
}

const wanted = ONLY.length > 0 ? LIFE_APIS.filter((a) => ONLY.includes(a.id)) : LIFE_APIS
const rows: Probed[] = []
for (const a of wanted) {
  const r = await probe(a)
  rows.push(r)
  const mark = r.fields === null ? (r.keyed ? '·' : '✗') : '✓'
  const shape = r.fields === null ? r.why : `${r.fields.length} fields · ${r.quantities.length} quantities · ${r.methods.length} methods · ${r.ms}ms`
  console.log(`  ${mark} ${a.id.padEnd(16)} ${shape}`)
}

const answered = rows.filter((r) => r.fields !== null)
const keyed = rows.filter((r) => r.keyed)
// THE FOURTH BUCKET, and it exists because naming a cause in the row is not enough if the TALLY still conflates it.
// A source this client cannot make a verified TLS connection to has not been measured at all — the endpoint may be
// perfectly alive, as wfo's is (curl 200, node refusing an incomplete chain) — so counting it beside a 404 reports a
// retired source that is not retired. `unverifiable` is carried separately in the census and in the artifact, which is
// the same three-answer discipline the rows already keep: answered, refused, and never looked at.
// A 4xx IS ABOUT THE DECLARATION; A 5xx, A TIMEOUT AND A BROKEN PATH ARE ABOUT THE MOMENT. Measured across two runs
// eight minutes apart: europepmc answered 44 fields in 7366ms and then 503, and ensembl answered in 339ms and then
// timed out at 8000ms. Neither source changed — the run did. A census that files those beside powo's 403 and duke's
// 404 turns a snapshot into a verdict, and the two 4xx rows are the ones that are genuinely a finding: the source
// answered, and what it said was that the declared request is wrong. So the split is by WHO the failure is about.
const transient = (r: Probed): boolean =>
  /CANNOT VERIFY THE TLS CHAIN|did not resolve|refused or dropped/.test(r.why ?? '')
  || /no answer within/.test(r.why ?? '')
  || (r.status !== null && r.status >= 500)
const notMeasured = rows.filter((r) => r.fields === null && !r.keyed && transient(r))
const failed = rows.filter((r) => r.fields === null && !r.keyed && !transient(r))
console.log()
console.log(`asked ${rows.length} · ANSWERED ${answered.length} · needs a key ${keyed.length} · the DECLARATION is wrong ${failed.length} · NOT MEASURED THIS RUN ${notMeasured.length}`)
console.log(`quantities discovered: ${answered.reduce((n, r) => n + r.quantities.length, 0)}`)

wrArtifact('lean/api-discovery.json', {
  kind: 'api-discovery',
  asked: rows.length,
  answered: answered.length,
  keyed: keyed.length,
  failed: failed.length,
  /** a 5xx, a timeout, or no verified connection: about this run, not about the source — NEVER a dark endpoint */
  notMeasured: notMeasured.length,
  notMeasuredRows: notMeasured.map((r) => ({ api: r.api, why: r.why })),
  honest: 'a probe that did not answer is recorded as not answering, never as answering with nothing. A source with no VERIFIED CONNECTION is counted apart from a source that answered an error: a TLS chain this client rejects, a name that did not resolve and a refused connection are facts about the path, not about the service, and wfo is the measured case — curl reaches it, node refuses its incomplete chain. A derived schema '
    + 'is a floor — the endpoint served at least this — and never a contract: optional fields absent from one response '
    + 'are invisible to it. The URL shape is built as base + query params, which is wrong for path-style endpoints, and '
    + 'such a refusal is a finding about the declaration rather than a fault in the source.',
  sources: rows.map((r) => ({
    api: r.api, status: r.status, ms: r.ms, keyed: r.keyed, why: r.why,
    fields: r.fields === null ? null : r.fields.length,
    quantities: r.quantities.map((q) => ({ path: q.path, sample: q.sample })),
    methods: r.methods.length,
  })),
})
console.log()
console.log('✓ lean/api-discovery.json written')
