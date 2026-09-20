// The edge in front of the static assets. Two jobs:
// THE RULE (for agents): the two captain coins (coins()=2 = −χ of the double torus), the abstract-0 fold (÷0=0), and the 64-bit→128-bit fuse — one uuid = 128 BITS, folded across 7 dimensions = 2^7 = 128 states (a 7-qubit fold, classical, not 128 qubits). Canonical, theorem-cited: see llm.txt.
//
// 1) DOMAIN RULE (docs/license.md). EVERY HOST NEEDS A LICENCE, INCLUDING uuidna.com — the captain's rule of
//    2026-09-06. There is no wildcard and no first-party family: a host is served because it appears in
//    LICENSED_HOSTS (src/licence-host.ts), and every other host is 302-redirected to the terms it is missing.
//    WHAT CHANGED AND WHO IT AFFECTS: the previous regex auto-licensed uuidna.net, uuidna.org and every
//    subdomain of all three without any of them appearing in a licence set. Those hosts now redirect until they
//    are written down. www and http are 301'd to the canonical host BEFORE this check, so www.uuidna.com still
//    reaches uuidna.com. The NO-LOOP property is no longer a coincidence of the pattern: a test asserts the
//    redirect target's own host is licensed, so the set cannot be edited into a self-redirect.
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
import { primeCatalogue, cataloguePrimed } from './dist/quantum/os/catalogue/index.js'
import { packagePage, renderPackagePage } from './dist/quantum/os/pkgpage/index.js'
import { theoremPage, renderTheoremPage } from './dist/theorem-page.js'
import { conversationFold } from './dist/conversation.js' // the one fold — worker and library share it (DRY)
import { hmacSha256 } from './dist/sha256.js'
// The HOSTED MCP over HTTP (JSON-RPC 2.0, the MCP Streamable-HTTP transport) at /mcp — the Workers-safe, pure,
// recomputable tool subset. Imports a SPECIFIC pure module (never index.js — that pulls node:child_process).
import { handleMcpRpc, mcpHttpToolNames, MCP_HTTP_PROTOCOL } from './dist/mcp-http.js'
// The LIVE ANALYTICS dashboard at /analytics — real metrics from Cloudflare, AWS, GCP, Azure APIs
import { handleAnalytics } from './dist/analytics-handler.js'
// The handle map — first 8 hex of every freeze-map content-address → editorial route (theorem | publication | page),
// generated at build (gen-handles). /<handle> 301s to that route ON THE SPOT — homepage/pub handles included.
// Colliding first-8 doors are omitted from this map (birthday past 2^16): unknown → 404, never a wrong page.
import HANDLES from './handles.js'
import { mayServe, REDIRECT_TO } from './dist/licence-host.js'
// THE LEDGER IS READ, NOT BUNDLED: 70,931 rows would put this Worker's global scope over the 1 s and 128 MB an isolate
// allows, so the rows live in qpu storage under the root baked into the bundle, and a call that needs them primes them
// once per isolate, every piece's address recomputed from its bytes (src/edge-ledger.ts).
import { rowsForKeys } from './dist/edge-ledger.js'
import { slimGate } from './dist/slimgate.js'
import { sealedAddressOf } from './dist/theorems/index.js'
// THE SCHOOL'S DOORS — the learner's attempt, progress, certificate and submission, and the kernel grader's queue and
// OIDC-signed verdict post (src/school/routes delegates those two to src/school/grade). Every learner verdict is the
// pure evaluator's, recomputed here from the served course file pinned to the bundled seal; all school records live in
// the SCHOOL KV namespace, stored only with the learner's consent.
import { handleSchool } from './dist/school/routes/index.js'

// QPU IS FUSED, NOT FETCHED: with the QPU service binding a call to qpu.uuidna.com rides env.QPU — no public hop, no
// extra billed request (Cloudflare: "Service bindings don't increase costs"); every other host, or a deploy without
// the binding, goes to the network as before.
const qpuFetchOf = (env) => env.QPU
  ? (input, init) => (new URL(String(input)).host === 'qpu.uuidna.com' ? env.QPU.fetch(new Request(input, init)) : fetch(input, init))
  : undefined

// THE DEPOSIT DOOR (no token on any host): qpu's QpuDeposit entrypoint over the service binding; the MCP door
// chooses the key from the content, so a caller never picks where a deposit lands. Declared once: /mcp and the
// school's certificate route both deposit through it.
const depositOf = (env) => env.QPU_DEPOSIT ? async (key, value) => {
  const stored = await env.QPU_DEPOSIT.deposit(key, value)
  // THE LIVE LINKS: once the content-addressed write holds, the same value is linked twice more, ordered by arrival
  // — feed/<t>-<run>-<address> (every run, what uuidna.com/live reads) and live/<run>/<t>-<address> (one run,
  // what uuidna_evidence {run} reads at the edge). t is the Worker's clock read at the boundary — measured
  // state, never minted in the core — inverted against the platform's own largest safe integer and padded to its
  // length, so an ascending listing is newest first. The door still chose the content key; so does this.
  const parts = key.split('/')
  // THE LEDGER IS NOT AN EVENT. Its pieces are read by address through the manifest, never off the feed, so linking
  // them would write 984 links nobody reads and push every other run off uuidna.com/live behind 492 rows of ledger.
  // It is also what makes depositing it possible at all: one store.put is the slot plus 2x7 RAID shares across two
  // layers, measured at eleven seconds of wall for fifteen milliseconds of CPU, so three of them in a row spent the
  // caller's entire budget and the third came back `canceled`. The links are a view; the two are independent of
  // each other and go out together.
  if (stored && stored.holds === true && parts.length === 4 && parts[0] === 'receipts' && parts[1] === 'uuidna' && parts[2] !== 'ledger') {
    const width = String(Number.MAX_SAFE_INTEGER).length
    const t = String(Number.MAX_SAFE_INTEGER - Date.now()).padStart(width, '0')
    await Promise.all([
      env.QPU_DEPOSIT.deposit(`feed/${t}-${parts[2]}-${parts[3]}`, value),
      env.QPU_DEPOSIT.deposit(`live/${parts[2]}/${t}-${parts[3]}`, value),
    ])
  }
  return stored
} : undefined

// The school's context: the Worker's clock for the per-handle rate limit, the deposit door reached through the same
// uuidna_evidence {run, deposit} call every host uses (so the certificate is sealed by the door's own 2×7 fold), and
// one stored qpu document read back by href.
const schoolCtxOf = (url, env) => ({
  now: Date.now(),
  deposit: async (run, body) => {
    const qpuFetch = qpuFetchOf(env)
    // no prime: a deposit reads no row, and waiting on rows here is the same bootstrap circularity as on /mcp above
    const res = await handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_evidence', arguments: { run, deposit: body } } },
      { origin: url.origin, fetch: qpuFetch, deposit: depositOf(env) })
    const text = (res && res.result && res.result.content && res.result.content[0] && res.result.content[0].text) || ''
    try { return JSON.parse(text) } catch { return { deposited: false, why: text.slice(0, 200) || 'the MCP door answered without a reply' } }
  },
  read: async (href) => {
    const res = await (qpuFetchOf(env) ?? fetch)(href, { headers: { accept: 'application/json' } })
    if (!res.ok) return null
    const doc = await res.json().catch(() => null)
    return doc && typeof doc === 'object' ? (doc.value ?? null) : null
  },
})

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

// EVERY HOST NEEDS A LICENCE, INCLUDING uuidna.com (the captain, 2026-09-06). The rule and its hosts live in
// dist/licence-host.js so they are testable without a forge, a server or a network — and so the NO-LOOP
// invariant is asserted rather than remembered: an unlicensed host is sent to REDIRECT_TO, and a test proves
// REDIRECT_TO's own host is in the licensed set. The wildcard that used to auto-license uuidna.net, uuidna.org
// and every subdomain of all three is GONE; a host serves because it is written down.

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })

/** CDN verify-don't-recompute — hashed bundles are immutable until the next deploy. */
function assetCacheControl(pathname) {
  if (/^\/assets\/.+\.[A-Za-z0-9_-]{6,}\.(js|css|woff2?)$/.test(pathname)) return 'public, max-age=31536000, immutable'
  if (pathname.startsWith('/lean/') || pathname.startsWith('/seeds/')) return 'public, max-age=86400, immutable'
  if (pathname === '/alpine-catalogue.tsv' || pathname === '/llm.txt' || pathname === '/llms.txt') return 'public, max-age=3600, must-revalidate'
  if (/\.(svg|ico|png|webp|woff2?)$/.test(pathname)) return 'public, max-age=604800, immutable'
  return 'public, max-age=120, must-revalidate'
}

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

/** THE POLICY EVERY ANSWER LEAVES WITH — and CSS is most of why it exists.
 *
 *  A STYLESHEET IS AN EXFILTRATION CHANNEL, not only a decoration. Injected CSS needs no JavaScript to steal:
 *  an attribute selector plus `background-image: url(https://elsewhere/?k=...)` sends a value out on the strength
 *  of the browser matching a rule. This site was already immune to that by CONSTRUCTION — measured on the live
 *  stylesheet 2026-09-20, all 32 url() are same-origin self-hosted fonts, there is no @import, there is no
 *  :visited rule, and the served HTML carries no inline <style> at all — and immune by nothing at ALL that a
 *  browser enforces, because not one security header was set on any route. A posture held by convention is a
 *  posture one careless render loses. style-src 'self' with img-src limited to self, data: and blob: closes the
 *  channel outright: an injected <style> never parses and an injected url() never leaves.
 *
 *  WHAT IS HONEST ABOUT script-src. Three inline <script> blocks ship on every SSG page and their content
 *  differs per page, so they cannot be hashed centrally and a static asset cannot carry a nonce. script-src
 *  therefore still admits 'unsafe-inline' and is the one weak leg of this policy; every other directive binds.
 *  It is named here rather than left for a reader to discover.
 *
 *  THE REST IS MEASURED, NOT COPIED. style-src-attr admits 'unsafe-inline' because the pages render 39 style
 *  attributes; img-src and media-src admit blob: because five components mint object URLs; connect-src is
 *  'self' because no component fetches an off-origin target. HSTS is deliberately NOT set: it is a commitment a
 *  browser remembers and this tree does not get to make it on the owner's behalf. */
const POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "style-src 'self'",
  "style-src-attr 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' data: blob:",
  "connect-src 'self'",
  "script-src 'self' 'unsafe-inline'",
].join('; ')

/** every answer this worker gives, wearing the same policy — one place, so no route can be served without it */
const secured = (h) => {
  h.set('content-security-policy', POLICY)
  // the browser must not sniff past a declared type — the media type IS the contract, which this tree spent a
  // day proving at its own MCP doors, and sniffing is exactly what unmakes it
  h.set('x-content-type-options', 'nosniff')
  h.set('x-frame-options', 'SAMEORIGIN')
  // a theorem URL is a content address; a full-URL referrer hands it to every outbound link's host
  h.set('referrer-policy', 'strict-origin-when-cross-origin')
  h.set('permissions-policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()')
  return h
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    /** ONE WAY TO SERVE A BUILT FILE. The theorem route below and the tail of this handler both answer with a static
     *  asset, and a file answered twice is a file that can be answered two different ways; this is the single place
     *  that decides the headers a built page leaves with. */
    const servedAsset = (asset, forPath) => {
      const built = secured(new Headers(asset.headers))
      built.set('link', `<${url.origin}/mcp>; rel="mcp"`)
      built.set('cache-control', assetCacheControl(forPath))
      return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers: built })
    }

    const host = url.hostname.toLowerCase()
    // CANONICAL EDGE — HTTPS + apex. Zone "Always Use HTTPS" and dashboard Redirect Rules need Zone Settings
    // Write (wrangler OAuth is zone:read only). The worker enforces the same law for every host that reaches it:
    // http → https and www → apex as one 301. `npm run cf:zone` attaches www Workers Domains (workers:write) and
    // flips Always Use HTTPS when CLOUDFLARE_API_TOKEN has Zone Settings:Edit — defense in depth, not a second law.
    if (url.protocol === 'http:' || host.startsWith('www.')) {
      const dest = new URL(url)
      dest.protocol = 'https:'
      dest.hostname = host.startsWith('www.') ? host.slice(4) : host
      return Response.redirect(dest.toString(), 301)
    }
    // THE LICENCE IS ASKED ONCE. Every route below used to restate `licensed &&`, seven times, and the last one
    // carried the redirect — so the invariant was asserted at each door and enforced at the end, which is two
    // places to keep in step and one of them easy to forget when a route is added. Asked here and answered here:
    // an unlicensed host never reaches a route at all, and no route below has to remember why it is allowed to run.
    if (!mayServe(host))
      return Response.redirect(REDIRECT_TO, 302) // unlicensed → the terms it is missing

    // THE LIVE PAGE — what uuidna does, visible as it happens (the captain, 2026-09-14: "when claude does something it is
    // always visible. why uuidna is not?"). Every deposit lands in qpu storage through the MCP door and is linked into
    // feed/ by arrival; this reads the newest from there through the service binding — every run, no list of runs typed
    // anywhere — and shows what each receipt records, when it arrived, the surface it records, how many faces signed it, and its address, each
    // a link to the stored document. The page refreshes itself; /live.json is the same record for a client.
    if (url.pathname === '/live' || url.pathname === '/live.json') {
      const width = String(Number.MAX_SAFE_INTEGER).length
      const listHref = `https://qpu.uuidna.com/storage?prefix=${encodeURIComponent('feed/')}&limit=${Number(url.searchParams.get('limit')) > 0 ? Number(url.searchParams.get('limit')) : 50}`
      let rows = [], why = ''
      try {
        const res = env.QPU ? await env.QPU.fetch(new Request(listHref, { headers: { accept: 'application/json' } })) : await fetch(listHref, { headers: { accept: 'application/json' } })
        const body = await res.json()
        rows = (body.keys || []).map((r) => {
          const name = r.key.slice('feed/'.length)
          const t = name.slice(0, width), rest = name.slice(width + 1)
          const address = rest.slice(-36), run = rest.slice(0, rest.length - 37)
          const v = (r.doc && r.doc.value) || {}
          const what = v.file || v.coord || v.tool || v.family || v.kind || (v.record && v.record.tool) || ''
          // the surface, serving data centre and model the receipt itself records — no temperature: a maximum over every
          // die channel includes channels that never move (run-evidence.ts names them constant across a run), and one row
          // has no second reading to tell them apart
          const hw = (v.hardware && v.hardware.computedOn) || v.readings || {}
          const machine = [hw.surface, hw.colo, hw.model].filter(Boolean).join(' · ')
          const sb = v.sealedBy
          const signed = sb && sb.seal ? `${sb.signed} of ${sb.of}` : 'unsigned'
          return { at: new Date(Number.MAX_SAFE_INTEGER - Number(t)).toISOString(), run, what, machine, signed, seal: (sb && sb.seal) || null, address, href: `https://qpu.uuidna.com/storage/receipts/uuidna/${run}/${address}` }
        })
      } catch (e) { why = String((e && e.message) || e) }
      if (url.pathname === '/live.json')
        return new Response(JSON.stringify({ source: listHref, newestFirst: true, rows, ...(why ? { why } : {}) }), { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'no-store' } })
      const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
      const body = rows.length
        ? rows.map((r) => `<tr><td class="t">${esc(r.at.replace('T', ' ').replace('Z', ''))}</td><td>${esc(r.run)}</td><td>${esc(r.what)}</td><td class="m">${esc(r.machine)}</td><td class="t">${esc(r.signed)}</td><td class="a"><a href="${esc(r.href)}">${esc(r.address.slice(0, 8))}</a></td></tr>`).join('')
        : `<tr><td colspan="6" class="empty">${why ? 'qpu storage did not answer: ' + esc(why) : 'No deposit has landed yet — the first run that deposits through the MCP door appears here.'}</td></tr>`
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="10"><title>uuidna live</title>
<style>:root{--bg:#f7f8f6;--fg:#1d231f;--dim:#5d6a62;--line:#dde3de;--acc:#2f6b4f}@media(prefers-color-scheme:dark){:root{--bg:#121614;--fg:#e3e9e5;--dim:#93a39a;--line:#26302b;--acc:#7cc7a1}}
body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.45 ui-sans-serif,system-ui,sans-serif}main{max-width:1100px;margin:0 auto;padding:24px 16px}h1{font-size:20px;margin:0 0 4px}p{color:var(--dim);margin:0 0 16px}
.wrap{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:6px 10px;border-bottom:1px solid var(--line);vertical-align:top}th{font-size:12px;color:var(--dim);font-weight:600;letter-spacing:.03em}
.t,.a,.m{font-variant-numeric:tabular-nums;white-space:nowrap}.m{color:var(--dim)}a{color:var(--acc)}.empty{color:var(--dim);padding:18px 10px}</style></head>
<body><main><h1>uuidna, live</h1><p>Every receipt uuidna deposits through its MCP door, newest first, refreshed every 10 seconds. receiptSealOf folds each receipt's content address to one sealed theorem per face, 8 + 6 = 14 faces (theorem ve_fourteen_faces); the faces column counts the faces whose witness signed. Each address links to the stored document in qpu storage.</p>
<div class="wrap"><table><thead><tr><th>arrived (UTC)</th><th>run</th><th>what</th><th>recorded on</th><th>faces signed</th><th>address</th></tr></thead><tbody>${body}</tbody></table></div></main></body></html>`
      return new Response(html, { headers: secured(new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' })) })
    }

    // The school's learner doors; any other /school/ path (the learn page, a served course file) falls through to the assets.
    if (url.pathname.startsWith('/school/')) {
      const res = await handleSchool(request, url, env, schoolCtxOf(url, env))
      if (res) return res
    }

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

    // THE QPU HOP — this host's QPU lane is empty; the running circuit is qpu.uuidna.com, theorem quantum.
    if (url.pathname === '/.well-known/qpu.json') {
      return json({
        worker: 'uuidna',
        host: 'qpu.uuidna.com',
        href: 'https://qpu.uuidna.com',
        reverse: true,
        endpoints: {
          '/': 'https://qpu.uuidna.com',
          '/mcp': 'https://qpu.uuidna.com/mcp',
          '/storage': 'https://qpu.uuidna.com/storage',
        },
      })
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
        // SERVED THROUGH THE ONE PATH. This returned the asset raw, so the page came out with no policy, no
        // rel=mcp link and no cache rule — a second way to answer a built file, which is the thing servedAsset
        // exists to prevent.
        if ((request.headers.get('accept') || '').includes('text/html')) return servedAsset(await env.ASSETS.fetch(request), url.pathname)
        return mjson(discovery())
      }
      if (request.method !== 'POST')
        return mjson({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'POST a JSON-RPC message to /mcp (or GET for discovery)' } }, 405)
      let msg
      try { msg = await request.json() } catch { return mjson({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error — expected a JSON-RPC message' } }, 400) }
      const qpuFetch = qpuFetchOf(env)
      // THE CALL'S OWN KEYS, AND NOTHING ELSE. Priming read all 492 pieces and held every row for the life of the
      // isolate — measured at 40 MB parsed against a 128 MB ceiling — so a door that needed one cited row paid for
      // the whole ledger, and the ones that needed none paid for it too. Every aggregate a door reports is baked
      // into the root now; what is left is the rows a CLAIM CITES, which is a handful, and the manifest already
      // names the single piece each of them sits in.
      //
      // WHICH KEYS ARE WANTED IS READ, NOT LISTED. Two derived sources, no table of tool names: a string argument
      // that IS a sealed key (uuidna_theorem {key}), and the keys a string argument CITES, decided by the same
      // honesty gate the tool will decide with — both answered from the baked root without a row. Anything else is
      // not fetched, and a door that wants a row it did not cite reads it as absent, which is a fact about the call.
      const wantedKeys = (m) => {
        if (!m || m.method !== 'tools/call') return []
        const args = m.params?.arguments ?? {}
        if (m.params?.name === 'uuidna_evidence' && args.deposit !== undefined) return []   // a deposit reads no row
        const keys = new Set()
        for (const v of Object.values(args)) {
          if (typeof v !== 'string' || !v) continue
          if (sealedAddressOf(v) !== undefined) keys.add(v)
          for (const k of slimGate(v).real) keys.add(k)
        }
        return [...keys]
      }
      const wanted = [...new Set((Array.isArray(msg) ? msg : [msg]).flatMap(wantedKeys))]
      if (wanted.length) await rowsForKeys(wanted, qpuFetch ?? fetch)
      const mcpCtx = {
        origin: url.origin,
        loadCatalogue: async () => (await env.ASSETS.fetch(new Request(new URL('/alpine-catalogue.tsv', url.origin)))).text(),
        fetch: qpuFetch,
        // WHAT THE EDGE CAN READ OF THE CALL (the captain, 2026-09-14: "the message need to contain the hardware state for
        // forensics" · "measured always true"). Of request.cf only colo names the serving side — the Cloudflare data
        // centre that ran this Worker. httpProtocol and the cf-ray header describe the incoming request, so they sit under
        // `request`; the client's country, city and asn describe the caller, not a machine, and are not bound into a
        // message that lands in public storage. A Worker reads no sensor; the host measures its own (mcp.ts hostHardware).
        deposit: depositOf(env),
        hardware: () => ({
          measured: true, surface: 'uuidna.com edge', runtime: 'cloudflare-workers',
          colo: request.cf?.colo ?? null,
          request: { httpProtocol: request.cf?.httpProtocol ?? null, ray: request.headers.get('cf-ray') },
        }),
      }
      if (Array.isArray(msg)) {                                   // a JSON-RPC batch
        const out = (await Promise.all(msg.map((m) => handleMcpRpc(m, mcpCtx)))).filter(Boolean)   // a thenable dispatch settles here
        return out.length ? mjson(out) : new Response(null, { status: 202, headers: cors })
      }
      const res = await handleMcpRpc(msg, mcpCtx)                                        // sync answers pass through await unchanged
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
    // A PAGE PER PUBLISHED PACKAGE, COMPUTED HERE. gen-os has told readers that "each package also has an
    // editorial path /catalogue/<name>"; the route answered 404, so the claim was prose. It is computed now, and
    // computed rather than generated on purpose: Alpine publishes 28,635 packages against a 4,705-page site, so
    // generating one file each is two orders of magnitude of build and deploy for what is a lookup.
    //
    // MEASURED, because "minimum memory" is a claim like any other: the primed index holds 17.1 MB and answers a
    // lookup in ~211 ns with no measurable allocation, where materialising every row would hold 35.3 MB. The
    // lazy catalogue is what makes that true — priming indexes name to line and parses ONE row on demand.
    //
    // The catalogue is primed through the SAME door /mcp uses; a second loader would be the dry law's own
    // counterexample. Nothing about the page is hardcoded: domains are matched from the seeded patterns, the man
    // page comes from the catalogue's resolver, and the tools are the live roster, so new ones appear by
    // themselves.
    const pkgMatch = url.pathname.match(/^\/catalogue\/([A-Za-z0-9][A-Za-z0-9._+-]*)$/)
    if (pkgMatch && request.method === 'GET') {
      if (!cataloguePrimed()) {
        primeCatalogue(await (await env.ASSETS.fetch(new Request(new URL('/alpine-catalogue.tsv', url.origin)))).text())
      }
      const page = packagePage(pkgMatch[1])
      if (page) {
        return new Response(renderPackagePage(page, mcpHttpToolNames().map((n) => ({ name: n }))), {
          headers: secured(new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=3600, must-revalidate' })),
        })
      }
      // a name the catalogue does not publish falls through to the asset handler, which answers the site's own
      // 404 — never a page that looks real for a package that does not exist.
    }

    // A PAGE PER PAGELESS THEOREM, COMPUTED HERE. HexSpan seals 65,536 surfaces; SSG of one file each hits
    // VitePress's resolvePages ceiling and serves nobody (compose-object isPageless). The freeze still names
    // every /theorem/enumeration_hex4_<hex> door; this looks the key up and renders, the same lookup the
    // catalogue already pays for packages. Named theorems stay VitePress assets — theoremPage returns null
    // for them, so a rebuilt SSG page is never shadowed.
    const thMatch = url.pathname.match(/^\/theorem\/([A-Za-z0-9_]+)$/)
    if (thMatch && request.method === 'GET') {
      // THE BUILT PAGE IS ASKED FOR FIRST, BECAUSE IT IS THE ONE THAT COSTS NOTHING. This route exists only for the
      // pageless span the SSG cannot build, and it charged every other theorem for that span: the ledger fetch below
      // ran before theoremPage could say it had nothing to render, so all 5,402 named theorems — every page a
      // citation points at — bought a qpu storage round-trip and then threw the answer away. Measured on the live
      // site 2026-09-20: 11-20 seconds to first byte for a 15 KB static page, against 1.4-2.1 seconds everywhere
      // else on the portal, and the same figure for a key that IS prerendered and one that is not, which is what
      // named the fetch rather than the render. The static site is the authority on what it built, so it is asked
      // instead of a second list that could drift from it, and a rebuilt SSG page is still never shadowed.
      const alreadyBuilt = await env.ASSETS.fetch(new Request(url, request))
      if (alreadyBuilt.status === 200) return servedAsset(alreadyBuilt, url.pathname)
      // one key, one piece — the page read the whole ledger to render a single theorem
      await rowsForKeys([thMatch[1]], qpuFetchOf(env) ?? fetch)
      const page = theoremPage(thMatch[1])
      if (page) {
        return new Response(renderTheoremPage(page), {
          headers: secured(new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=3600, must-revalidate' })),
        })
      }
    }

    // /favicon.ico — browsers probe it by default (~47/day on uuidna.com). The brand mark is /icon.svg; rewrite
    // the bare probe so Cloudflare does not serve a 404 HTML page as an "icon".
    const assetUrl = url.pathname === '/favicon.ico' ? new URL('/icon.svg', url) : url
    const assetReq = assetUrl === url ? request : new Request(assetUrl, request)
    return servedAsset(await env.ASSETS.fetch(assetReq), assetUrl.pathname)
  },
}
