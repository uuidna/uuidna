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
//
// STORAGE IS ENCRYPTED END-TO-END. Plaintext is NEVER persisted. To store, the owner seals the trial CLIENT-SIDE
// into a 7-layer onion (uuidna_seal_onion / sealStream with seven passphrases — each a real ChaCha20-Poly1305 layer,
// carried as a uuid chain) and POSTs the CIPHERTEXT. The worker stores only that opaque blob, keyed by its own
// content-address (receipt); it never sees the key or the plaintext, so neither the worker nor the provider
// (Cloudflare, whose at-rest encryption is a SEPARATE, additional layer) can read it. Only the owner's keys open it,
// client-side. Confidentiality is exactly the secrecy and entropy of those seven keys.
async function handleTrials(request, url, env) {
  const idMatch = url.pathname.match(/^\/trials\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/)

  if (url.pathname === '/trials' && request.method === 'POST') {
    let body = {}
    try { body = await request.json() } catch { /* empty / invalid body */ }

    // ENCRYPTED STORAGE — store a client-sealed onion the worker cannot read. Persisted only with explicit consent.
    if (body.sealed) {
      const s = body.sealed
      if (!s || !Array.isArray(s.uuids) || typeof s.receipt !== 'string')
        return json({ error: 'sealed must be a { uuids, layers, receipt } onion from uuidna_seal_onion — seal client-side so the keys never leave you' }, 400)
      const id = s.receipt // the ciphertext's own content-address
      if (body.consent !== true)
        return json({ id, layers: s.layers, stored: false, note: 'not stored — no consent. Send "consent": true to persist the ciphertext.' }, 200)
      if (!env.TRIALS)
        return json({ id, layers: s.layers, stored: false, note: 'consent given, but storage is unavailable (no KV namespace bound).' }, 200)
      await env.TRIALS.put(id, JSON.stringify(s))
      return json({ id, layers: s.layers, stored: true, encrypted: true, note: 'stored as ciphertext — neither the worker nor the provider can read it; open it client-side with your keys. Recommended depth: 7 layers.' }, 201)
    }

    // COMPUTE ONLY — run the trial and return the verdict; store NOTHING (plaintext is never persisted).
    const statement = typeof body.statement === 'string' ? body.statement.trim() : ''
    if (!statement) return json({ error: 'POST /trials needs { "statement": "…" } (returns the verdict, stores nothing) OR { "sealed": <7-layer onion>, "consent": true } to persist ciphertext' }, 400)
    return json({ id: toUuid(statement), statement, verdict: adjudicate(statement), stored: false, note: 'computed, not stored. To persist, seal it client-side into a 7-layer onion (uuidna_seal_onion) and POST { sealed, consent: true } — plaintext is never stored.' }, 200)
  }

  // Read a stored trial — returns the OPAQUE ciphertext (the owner decrypts client-side).
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
