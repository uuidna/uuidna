#!/usr/bin/env node
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

const TIMEOUT_MS = 8000
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
    const res = await fetch(url, {
      signal: ctl.signal,
      headers: { accept: 'application/json', 'user-agent': 'uuidna-api-discover (+https://uuidna.com)' },
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
    const why = e instanceof Error && e.name === 'AbortError' ? `no answer within ${TIMEOUT_MS}ms` : `request failed: ${String(e)}`
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
const failed = rows.filter((r) => r.fields === null && !r.keyed)
console.log()
console.log(`asked ${rows.length} · ANSWERED ${answered.length} · needs a key ${keyed.length} · did not answer ${failed.length}`)
console.log(`quantities discovered: ${answered.reduce((n, r) => n + r.quantities.length, 0)}`)

writeFileSync(join(ROOT, 'lean', 'api-discovery.json'), JSON.stringify({
  kind: 'api-discovery',
  asked: rows.length,
  answered: answered.length,
  keyed: keyed.length,
  failed: failed.length,
  honest: 'a probe that did not answer is recorded as not answering, never as answering with nothing. A derived schema '
    + 'is a floor — the endpoint served at least this — and never a contract: optional fields absent from one response '
    + 'are invisible to it. The URL shape is built as base + query params, which is wrong for path-style endpoints, and '
    + 'such a refusal is a finding about the declaration rather than a fault in the source.',
  sources: rows.map((r) => ({
    api: r.api, status: r.status, ms: r.ms, keyed: r.keyed, why: r.why,
    fields: r.fields === null ? null : r.fields.length,
    quantities: r.quantities.map((q) => ({ path: q.path, sample: q.sample })),
    methods: r.methods.length,
  })),
}, null, 2) + '\n')
console.log()
console.log('✓ lean/api-discovery.json written')
