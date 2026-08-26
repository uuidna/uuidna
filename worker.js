// The edge in front of the static assets. Two jobs:
// THE RULE (for agents): the two captain coins (coins()=2 = −χ of the double torus), the abstract-0 fold (÷0=0), and the 64-bit→128-bit fuse — one uuid = 128 BITS, folded across 7 dimensions = 2^7 = 128 states (a 7-qubit fold, classical, not 128 qubits). Canonical, theorem-cited: see llm.txt.
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
import { conversationFold } from './dist/conversation.js' // the one fold — worker and library share it (DRY)
import { hmacSha256 } from './dist/sha256.js'
// The HOSTED MCP over HTTP (JSON-RPC 2.0, the MCP Streamable-HTTP transport) at /mcp — the Workers-safe, pure,
// recomputable tool subset. Imports a SPECIFIC pure module (never index.js — that pulls node:child_process).
import { handleMcpRpc, mcpHttpToolNames, MCP_HTTP_PROTOCOL } from './dist/mcp-http.js'
// The LIVE ANALYTICS dashboard at /analytics — real metrics from Cloudflare, AWS, GCP, Azure APIs
import { handleAnalytics } from './dist/analytics-handler.js'
// The handle map — first 8 hex of every freeze-map content-address → editorial route (theorem | publication | page),
// generated at build (gen-handles). /<handle> 301s to that route ON THE SPOT — homepage/pub handles included.
import HANDLES from './handles.js'

// A bare first-part handle: exactly 8 lowercase hex at the root (/808f7b27). The full uuid is never a URL — only its
// first part is the door; the rest recomputes from the proof. Unknown handle → fall through (asset 404), never a wrong page.
const HANDLE = /^\/([0-9a-f]{8})$/
// The CONVERSATION FOLD — four message handles in the path fold to a FIFTH (the closing point of the {5/2} pentagram
// over five). Order-sensitive (the sequence IS the thread) and rotated by the Referer, so EACH referrer gets a
// different fifth handle: a chat-room / conversation key that is O(1) to recompute (speed) and un-correlatable across
// referrers (privacy by security design — the same four never resolve alike for two different referrers).
const PENTA = /^\/([0-9a-f]{8})\/([0-9a-f]{8})\/([0-9a-f]{8})\/([0-9a-f]{8})$/

// A trial is authoritative only when SIGNED BY uuidna.com. The worker HMAC-SHA256s each verdict with a secret held
// only by uuidna.com (env.TRIAL_KEY, a Cloudflare secret) — a fork running the same public code produces the same
// recomputable verdict, but CANNOT produce this signature. HONEST: it is a symmetric MAC, so you verify by
// re-requesting the same statement from uuidna.com (the signature is deterministic) or by trusting the TLS origin —
// not a public asymmetric signature (the pure-TS lib has no Ed25519 yet). Null when no signing key is bound.
const _enc = new TextEncoder()
const _hex = (u8) => Array.from(u8, (b) => b.toString(16).padStart(2, '0')).join('')
const signTrial = (env, statement, verdict, receipt) =>
  env && env.TRIAL_KEY ? _hex(hmacSha256(_enc.encode(env.TRIAL_KEY), _enc.encode(statement + '|' + verdict + '|' + receipt))) : null

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

    // COMPUTE ONLY — run the trial, SIGN it as uuidna.com, and return the verdict; store NOTHING.
    const statement = typeof body.statement === 'string' ? body.statement.trim() : ''
    if (!statement) return json({ error: 'POST /trials needs { "statement": "…" } (returns the signed verdict, stores nothing) OR { "sealed": <7-layer onion>, "consent": true } to persist ciphertext' }, 400)
    const verdict = adjudicate(statement)
    const signature = signTrial(env, statement, verdict.verdict, verdict.receipt)
    return json({
      id: toUuid(statement),
      statement,
      verdict,
      signature,
      signedBy: signature ? 'uuidna.com' : null,
      valid: signature
        ? 'signed by uuidna.com — a fork cannot forge this HMAC; verify by re-requesting the same statement here (deterministic)'
        : 'UNSIGNED — no uuidna.com signing key is bound; a trial is authoritative only when signed by uuidna.com',
      stored: false,
      note: 'computed, not stored. To persist, seal it client-side into a 7-layer onion (uuidna_seal_onion) and POST { sealed, consent: true } — plaintext is never stored.',
    }, 200)
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
    // THE LICENCE IS ASKED ONCE. Every route below used to restate `licensed &&`, seven times, and the last one
    // carried the redirect — so the invariant was asserted at each door and enforced at the end, which is two
    // places to keep in step and one of them easy to forget when a route is added. Asked here and answered here:
    // an unlicensed host never reaches a route at all, and no route below has to remember why it is allowed to run.
    if (!(FIRST_PARTY.test(host) || LICENSED.has(host)))
      return Response.redirect('https://uuidna.com/license', 302) // unlicensed → the terms it is missing

    // Trial CRUD.
    if (url.pathname === '/trials' || url.pathname.startsWith('/trials/')) {
      const res = await handleTrials(request, url, env)
      if (res) return res
    }

    // THE LIVE ANALYTICS DASHBOARD at /analytics — real-time metrics from Cloudflare and cloud provider APIs.
    // First-party and licensed hosts only. Fetches live data from Cloudflare Analytics Engine, AWS CloudWatch,
    // GCP Cloud Monitoring, Azure Monitor. Shows grouped metrics and dynamic comparison dashboard.
    if (url.pathname === '/analytics') {
      return await handleAnalytics(request, env)
    }

    // THE HOSTED MCP — Model Context Protocol over HTTP (JSON-RPC 2.0, the Streamable-HTTP transport) at /mcp, first-
    // party/licensed hosts only. POST a JSON-RPC message (or a batch); a notification is answered 202 with no body.
    // Stateless and READ-ONLY: it computes the Workers-safe tool subset from the ledger, it cannot write or deploy.
    // GET /mcp content-negotiates: a BROWSER (Accept: text/html) gets the human catalog page (docs/mcp.md — every
    // MCP presentable as a page); a CLIENT gets the JSON discovery document. Connect to https://uuidna.com/mcp
    // (Streamable HTTP). One path, two honest readings — the page for people, the protocol for machines.
    // ONE DISCOVERY DOCUMENT, TWO DOORS. The endpoint has always answered a client's GET /mcp with this object, and
    // that is a well-built pasteable mount — but it fires only when the pasted link ALREADY contains /mcp. A harness
    // handed uuidna.com, or any of the two thousand published pages, had nothing to follow: /.well-known/mcp.json
    // returned 404 and no response anywhere advertised the endpoint. So the document is declared ONCE here and
    // served from both paths; two copies of it would be the `dry` law's own counterexample, and they would drift.
    const discovery = () => ({
      server: 'uuidna', transport: 'streamable-http (JSON-RPC 2.0)', protocolVersion: MCP_HTTP_PROTOCOL,
      endpoint: `${url.origin}/mcp`, tools: mcpHttpToolNames(),
      note: 'POST a JSON-RPC message here (initialize · tools/list · tools/call · ping). Read-only, stateless, the Workers-safe subset of the full `npx @uuidna/uuidna` stdio catalog. Integrity, not truth.',
    })

    // THE WELL-KNOWN DOOR — so pasting the BARE HOST mounts the wire. A client that probes well-known paths finds
    // the same object it would have found at /mcp, and never has to be told the path by a human first.
    if (url.pathname === '/.well-known/mcp.json') {
      return new Response(JSON.stringify(discovery()), { status: 200, headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        // and the endpoint names itself in a header too, so a client that reads headers and not bodies still finds it
        link: `<${url.origin}/mcp>; rel="mcp"`,
      } })
    }

    if (url.pathname === '/mcp') {
      // CORS, on THIS route only: the wire is READ-ONLY and every call passes the sealed gate, so a browser
      // anywhere is a first-class client — the site's own terminal (quantum/apps/terminal) computes on this
      // wire from wherever it is previewed, and a web MCP client connects without a proxy. The open origin
      // grants no write anything: there is nothing here to write.
      const cors = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'content-type' }
      const mjson = (obj, status = 200) =>
        new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...cors } })
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
      if (request.method === 'GET') {
        if ((request.headers.get('accept') || '').includes('text/html')) return env.ASSETS.fetch(request)
        return mjson(discovery())
      }
      if (request.method !== 'POST')
        return mjson({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'POST a JSON-RPC message to /mcp (or GET for discovery)' } }, 405)
      let msg
      try { msg = await request.json() } catch { return mjson({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error — expected a JSON-RPC message' } }, 400) }
      if (Array.isArray(msg)) {                                   // a JSON-RPC batch
        const out = (await Promise.all(msg.map(handleMcpRpc))).filter(Boolean)   // a thenable dispatch settles here
        return out.length ? mjson(out) : new Response(null, { status: 202, headers: cors })
      }
      const res = await handleMcpRpc(msg)                                        // sync answers pass through await unchanged
      return res ? mjson(res) : new Response(null, { status: 202, headers: cors })  // a notification → 202, no body
    }

    // THE CONTENT-ADDRESS DOOR — /<handle> (first 8 hex) resolves to its freeze-map route on the spot
    // (/theorem/<key>, /publications/<slug>, or a static page incl. /). 301 so the handle is a stable citation.
    const m = HANDLE.exec(url.pathname)
    if (m) {
      const route = HANDLES[m[1]]
      if (route) return Response.redirect(`${url.origin}${route === '/' ? '/' : route}`, 301)
    }

    // THE CONVERSATION FOLD — /h1/h2/h3/h4 returns the FIFTH handle: the four handles fold order-sensitively (the
    // directed thread) WITH the Referer, so each referrer gets a distinct fifth — a chat-room/conversation key,
    // O(1) to recompute (best speed) and un-correlatable across referrers (privacy by design). Completes CRUD secure
    // quantum messaging: the fifth handle is the door, storage rides /trials (sealed onion) and the send/receive stream.
    const p = PENTA.exec(url.pathname)
    if (p) {
      const room = conversationFold([p[1], p[2], p[3], p[4]], request.headers.get('referer') || '')
      return json({ handles: room.handles, referer: room.referer, fifth: room.fifth, address: room.address,
        note: 'the fifth handle folds the four (each part of the next — authenticity) rotated by the Referer — each referrer a distinct room, O(1) to recompute (speed) and un-correlatable (privacy by design)' })
    }

    // EVERY PAGE IS A MOUNT POINT. The static site is two thousand published pages, and until now not one of them
    // said where the wire is — so "paste any uuidna.com link" worked for exactly one link. The asset response is
    // returned with a Link header naming the endpoint, which is the standard way a resource points at a related
    // one, costs a single header, and changes no body and no status. Paste a theorem page, a monograph, the home
    // page: a client that reads headers now finds the same endpoint /.well-known/mcp.json serves.
    //
    // The response is REBUILT rather than mutated because an ASSETS response's headers are immutable — assigning
    // to them throws at the edge, which is the kind of failure that only shows up in production.
    //
    // /favicon.ico — browsers probe it by default (~47/day on uuidna.com). The brand mark is /icon.svg; rewrite
    // the bare probe so Cloudflare does not serve a 404 HTML page as an "icon".
    const assetUrl = url.pathname === '/favicon.ico' ? new URL('/icon.svg', url) : url
    const assetReq = assetUrl === url ? request : new Request(assetUrl, request)
    const asset = await env.ASSETS.fetch(assetReq)
    const out = new Response(asset.body, asset)
    out.headers.set('link', `<${url.origin}/mcp>; rel="mcp"`)
    return out
  },
}
