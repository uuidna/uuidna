// The edge in front of the static assets. Two jobs:
//
// 1) DOMAIN RULE (docs/license.md). uuidna.com licenses ITSELF and AUTO-LICENSES the first-party wildcard
//    *.uuidna.com | *.uuidna.net | *.uuidna.org — those are served. Any OTHER host is 302-redirected to
//    uuidna.com/LICENSE (the terms it is missing), UNLESS it holds a licence (a commercial CNAME in LICENSED). The
//    FIRST_PARTY regex anchors the TLD at $ with a (^|.) boundary, so uuidna.com.attacker.net and notuuidna.org
//    redirect, not serve; uuidna.com (and its /license) is first-party, so it serves and never loops.
//
// 2) TRIAL CRUD at /trials (first-party hosts only). POST /trials runs the trial (adjudicate → verdict + receipt)
//    and returns it; it is PERSISTED only with EXPLICIT consent (body { consent: true }) — "without consent data is
//    not stored" (docs/captain/config.md). GET /trials/:id reads a stored trial, DELETE /trials/:id removes it.
//    Storage is Cloudflare KV bound as env.TRIALS; if no namespace is bound, the trial still computes and returns,
//    it just cannot persist (storage unavailable). The trial id IS the statement's content-address — recomputable,
//    so the same statement always addresses to the same trial. GET /trials (the page) falls through to the assets.
//
// The trial logic is imported from the built library's SPECIFIC modules (not index.js — that graph pulls a
// node:child_process helper unavailable in the Workers runtime); adjudicate/address and their deps are pure.
import { adjudicate } from './dist/adjudicate.js'
import { toUuid } from './dist/address.js'

const FIRST_PARTY = /(^|\.)uuidna\.(com|net|org)$/i

// Licensed external domains (commercial CNAMEs), each explicitly licensed via uuidna.com/license. The first-party
// wildcard above is auto-licensed and needs no entry. Hosts are compared lowercase.
const LICENSED = new Set([])

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })

// The trial CRUD. Returns a Response for an API request, or null to fall through (e.g. GET /trials → the page).
async function handleTrials(request, url, env) {
  const idMatch = url.pathname.match(/^\/trials\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/)

  // Create — run the trial; persist ONLY with explicit consent.
  if (url.pathname === '/trials' && request.method === 'POST') {
    let body = {}
    try { body = await request.json() } catch { /* empty / invalid body → treated as no statement */ }
    const statement = typeof body.statement === 'string' ? body.statement.trim() : ''
    if (!statement) return json({ error: 'POST /trials needs a JSON body { "statement": "…" } (add "consent": true to persist)' }, 400)
    const verdict = adjudicate(statement)
    const record = { id: toUuid(statement), statement, verdict }
    if (body.consent !== true)
      return json({ ...record, stored: false, note: 'not stored — no consent. Send { "consent": true } to persist. Without consent the trial is computed and returned, never saved.' }, 200)
    if (!env.TRIALS)
      return json({ ...record, stored: false, note: 'consent given, but storage is unavailable (no KV namespace bound). The trial still computed.' }, 200)
    await env.TRIALS.put(record.id, JSON.stringify(record))
    return json({ ...record, stored: true }, 201)
  }

  // Read a stored trial.
  if (idMatch && request.method === 'GET') {
    if (!env.TRIALS) return json({ error: 'storage unavailable (no KV namespace bound)' }, 503)
    const stored = await env.TRIALS.get(idMatch[1])
    return stored ? new Response(stored, { headers: { 'content-type': 'application/json; charset=utf-8' } }) : json({ error: 'no stored trial for that id (it may never have been consented to storage)' }, 404)
  }

  // Delete a stored trial.
  if (idMatch && request.method === 'DELETE') {
    if (!env.TRIALS) return json({ error: 'storage unavailable (no KV namespace bound)' }, 503)
    await env.TRIALS.delete(idMatch[1])
    return json({ id: idMatch[1], deleted: true }, 200)
  }

  return null // GET /trials (the page) or anything else → fall through to the assets
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const host = url.hostname.toLowerCase()
    const licensed = FIRST_PARTY.test(host) || LICENSED.has(host)

    // Trial CRUD — first-party/licensed hosts only (an unlicensed host is redirected below, API included).
    if (licensed && (url.pathname === '/trials' || url.pathname.startsWith('/trials/'))) {
      const res = await handleTrials(request, url, env)
      if (res) return res
    }

    if (licensed) return env.ASSETS.fetch(request) // serve the static site
    return Response.redirect('https://uuidna.com/license', 302) // unlicensed → the terms it is missing
  },
}
