import {
  RECEIPTS,
  coins,
  dead,
  found,
  headers,
  hexHref,
  isUnknownTool,
  lost,
  mintOf,
  n,
  networkHref,
  qpuCiteOf,
  foreignReadsOf,
  hexCatalogOf,
  hexRegistryOf,
  hexRunOf,
  hexToolsOf,
  harnessesOf,
  installManifestOf,
  leanOf,
  mcpCallOf,
  mcpOf,
  messageOf,
  qpuMintReceiptOf,
  networkMcpOf,
  networkToolsOf,
  openApiOf,
  proveHolds,
  quantumOf,
  receiptStreamsOf,
  robotsOf,
  routerOf,
  serverMcpOf,
  serverSubmitOf,
  serverToolsOf,
  servedLedgerOf,
  sitemapOf,
  storageListOf,
  storageMaintainOf,
  storageMcpOf,
  storageOf,
  storageToolsOf,
  subRpcOf,
  toolsOf,
  tenantZoneOf,
  qpuPageOf,
  wellKnownOf,
  zoneHostOf,
  rpcCodes,
  rpcErrorOf,
  seed,
  servedOf,
  serverHref,
  serverJobs,
  storageHref,
  ten,
  unauthorized,
  unit,
} from './index.js'
import type { QpuEnv, Served } from './index.js'
import { leanSource } from './lean.js'
import { packageVersion } from './version.js'
import { raySvgOf } from '../../../mcp/ray-animation.js'
import { cybersecurityToolsOf } from './crypto.js'

/** Public doors Payload owns. Paths only — handlers load from the plugin so this module does not cycle with it. */
const PUBLIC_DOORS = {
  '/cite': '/api/qpu/cite',
  '/qpu.css': '/api/qpu/css',
} as const

/** The unit's front door, cooled out of index.ts by the heat family: the Workers fetch that routes every path to
 *  the door that answers it, and hands the rest to Payload. Moved verbatim; index.ts keeps it as its default export.
 * @wing agents
 * @kind function
 */
export const worker = {
  async fetch(request: Request, env?: QpuEnv): Promise<Response> {
    const host = env?.QPU_HOST ?? unit.host
    // THE SEAT RIDES ON THE ANSWER (the captain, 2026-09-13: the unit is a router of referrers). Set once the path
    // is known, below; every response then carries where it was computed and which door answered, so a caller can
    // see the decision instead of taking it on trust. Empty until then, which is the honest reading before a path.
    let routeHeaders: Record<string, string> = {}
    // THE ENVELOPE DECIDES THE MEDIA TYPE, ONCE, FOR EVERY DOOR. An MCP client reads the content type before the body
    // and refuses application/ld+json outright — measured as CLIENT_HTTP_UNEXPECTED_CONTENT, which is why this unit's
    // own door could not be connected to at all. That cure was written by hand inside the POST /mcp branch and nowhere
    // else, so the other doors answering JSON-RPC (/network, /server, and /storage, whose POST takes an envelope
    // although it is declared rest) kept serving the one media type that refuses them. A JSON-RPC answer names itself
    // in its own envelope, so nothing has to be listed: the answer is asked what it is.
    const rpcMedia = { 'content-type': 'application/json; charset=utf-8' } as const
    const isRpc = (body: unknown): boolean => {
      const one = (x: unknown) => x !== null && typeof x === 'object' && (x as { jsonrpc?: unknown }).jsonrpc === '2.0'
      return Array.isArray(body) ? body.length > n - n && body.every(one) : one(body)
    }
    // A RESPONSE WITH NO BODY DECLARES NO MEDIA TYPE. The redirect below already did this and the other three drifted
    // from it, each promising bytes in a content type it then sent none of. On the 405 that promise is what broke the
    // handshake: the client read a media type it refuses and never reached the status telling it to fall back to POST.
    const emptyHeaders = (extra: Record<string, string> = {}) => {
      const out: Record<string, string> = { ...headers, ...routeHeaders, ...extra }
      delete out['content-type']
      return out
    }
    // ALWAYS INVALIDATE WHEN THE ASSET CHANGES. Two policies, chosen by whether the URL is content-addressed.
    // A mutable-URL doc (/, /qpu.css, discovery, robots, sitemap) keeps its URL while its bytes change on a deploy, so
    // `no-cache` makes every browser and the edge revalidate the content-fold ETag before serving: an unchanged asset
    // 304s cheaply (no body), a changed one is served fresh the instant it ships — never the stale copy an s-maxage
    // window would have held for up to an hour. The ETag below is foldOf of the body, so it moves iff the asset does.
    const revalidated = { 'cache-control': 'public, no-cache' } as const
    // A content-addressed URL (a hex-program UUID in the path → its .svg/og picture) names bytes that cannot change under
    // that URL — a changed program is a different URL — so it is safe to cache immutably and never revalidate.
    const immutable = { 'cache-control': 'public, max-age=31536000, immutable' } as const
    const jsonOf = (body: unknown, status = found) =>
      new Response(JSON.stringify(body), { status, headers: { ...headers, ...routeHeaders, ...(isRpc(body) ? rpcMedia : {}) } })
    /** A memoized document: 304 with no body when the client's If-None-Match is its ETag, else the bytes with the ETag. */
    const servedResponse = (row: Served) => {
      if (request.headers.get('if-none-match') === row.etag) return new Response(null, { status: found + ten * ten + mintOf(coins), headers: emptyHeaders({ etag: row.etag, ...revalidated }) })
      return new Response(row.body, { status: found, headers: { ...headers, ...routeHeaders, etag: row.etag, ...revalidated } })
    }
    // THE SELF-PROOF IS A BUILD/BOOT INVARIANT, NOT A PER-REQUEST COST. integrityOf runs quantumOf (the Shor
    // state-vector simulation) and leanOf (all 204 theorem holds) — together ~5.6s on a cold isolate. Running them in
    // this gate on every isolate's FIRST request blew the Worker's CPU budget before any route resolved: 1102 on every
    // door (even static /qpu.css), the response never completed, nothing cached, so every isolate stayed cold — a death
    // spiral. The unit still proves itself end to end — at /, /prove, /ready, /lean, and in CI (boot --prove gates the
    // ship, so a build that does not prove never deploys). The per-request gate keeps only the cheap structural
    // invariant (host + unit.holds, ~0ms), which is all a live isolate needs before it routes.
    if (host !== unit.host || host.includes('*') || !unit.holds) {
      return jsonOf(JSON.parse(dead), lost)
    }
    const url = new URL(request.url)
    const raw = url.pathname.replace(/\/$/, '') || '/'
    const path = raw === '/index.html' ? '/' : raw
    const route = routerOf(request.headers.get('referer') ?? '', path)
    routeHeaders = { 'x-qpu-seat': route.seat, 'x-qpu-door': route.door }
    // QPU SERVES ALL LICENSED SITES (the captain, 2026-09-13). A tenant site lives one level under the zone —
    // <slug>.uuidna.com, the level Cloudflare's free certificate covers — and reaches this unit through a *.<zone> route.
    // It is forwarded whole to Payload over the binding, Host preserved, so Payload's tenancy rules decide what it is. The
    // zone and its reserved labels are tenantZoneOf, the one declaration Payload reads too (payload src/access.ts,
    // tenantSlugOf); www keeps redirecting to the apex.
    // THE CRAWLABLE PAIR IS ANSWERED HERE FOR EVERY FIRST-PARTY HOST, ahead of both the tenant forward and the
    // named gate, and it is the ONLY thing this widening takes over. Everything else on a sibling host continues
    // exactly where it went before — which, measured 2026-09-28, is Payload over the binding: all four of lean,
    // unreal, hardware and school answer with x-powered-by: Next.js, Payload today, while their own workers
    // declare custom domains that are plainly not in effect. That disagreement is a lead for whoever owns those
    // routes; it is not something to settle from here by moving where a live page is served from.
    //
    // Taking the pair costs nothing that was being served: each of those hosts 404ed /robots.txt and
    // /sitemap.xml, so Cloudflare's managed default stood in — a file that names no sitemap at all. Off the
    // seven-path guide like the other discovery doors, so no sealed count moves.
    const zoneHost = zoneHostOf(url.hostname)
    if (url.protocol === 'https:' && zoneHost !== undefined) {
      if (path === '/robots.txt')
        return new Response(robotsOf(zoneHost.host), { status: found, headers: { ...headers, ...routeHeaders, ...revalidated, 'content-type': 'text/plain; charset=utf-8' } })
      if (path === '/sitemap.xml')
        return new Response(sitemapOf(zoneHost.host), { status: found, headers: { ...headers, ...routeHeaders, ...revalidated, 'content-type': 'application/xml; charset=utf-8' } })
      // THE DISCOVERY RECORD IS THE SAME DOCUMENT ON EVERY NAME, because it describes ONE endpoint and that
      // endpoint is this unit's. A sibling serving a copy that named itself would be the duplicate this whole
      // surface exists to avoid; a sibling serving nothing would leave the <loc> its own sitemap carries
      // unanswerable, which is the soft 404 the sitemap law here forbids — and did forbid while this shipped
      // one, measured live at faf8e51 before it was caught.
      if (path === '/.well-known/mcp.json') return servedResponse(servedOf(path, () => wellKnownOf()))
    }
    const { zone, www, reserved } = tenantZoneOf()
    const label = url.hostname.endsWith(`.${zone}`) ? url.hostname.slice(0, url.hostname.length - zone.length - seed) : ''
    if (url.protocol === 'https:' && label === www) {
      return new Response(null, { status: found + ten * ten + seed, headers: { location: `https://${zone}${url.pathname}${url.search}` } })
    }
    // a tenant under the zone, or a tenant's own domain registered as a Cloudflare for SaaS custom hostname (it reaches
    // this unit only through the */* route once Cloudflare has it active); both go whole to Payload, which decides.
    // This unit's own door is unit.host (qpu.uuidna.com). Public reads on that host stay open. A sale on a uuidna.com
    // host pays publishing.royalty on the product.
    const underZone = label && !label.includes('.') && !label.includes('*') && !reserved.includes(label)
    const ownDomain = url.hostname !== zone && !url.hostname.endsWith(`.${zone}`) && !url.hostname.includes('*')
    // ONE HANDOFF. Website pages, /admin, /api, cite, /qpu.css and fused MCP enter only through Payload.
    // A missing binding uses the same publicDoorFetchOf the publicPlugin mounts — not a second stack.
    // uuidna carries no Payload layer: a handoff answers as an unknown path does, with no public door at it.
    const handToPayload = async (): Promise<Response> => jsonOf(JSON.parse(dead), lost)
    // THE UNIT'S OWN PUBLIC DOORS ARE SERVED DIRECTLY, not through the heavy Payload/opennext app (which pays ~44s of
    // cold server init per isolate — measured). publicDoorFetchOf is the SAME handler the publicPlugin mounts at
    // /api/qpu/* (publicMcpOf/publicCiteOf/publicCssOf/publicChatSearchOf/…); it 404s with denied:'payload' the
    // /api/qpu paths it does NOT own (Payload's own endpoints, e.g. permaculture), which then fall through to Payload.
    // So the unit doors (/mcp,/cite,/qpu.css,/api/qpu/chat ask-in-chat,…) answer at unit speed, no Payload cold start.
    if (url.protocol === 'https:' && (underZone || ownDomain)) return handToPayload()
    const named = url.protocol === 'https:' && url.hostname === unit.host
    if (!named) return jsonOf(JSON.parse(dead), lost)
    // The unit's own public doors under /api/qpu/* answer directly (not through the heavy Payload app); OPTIONS
    // preflight still goes to Payload below so CORS is unchanged.
    if (request.method !== 'OPTIONS' && path.startsWith('/api/qpu')) return handToPayload()
    // Payload answers its own preflight, so /admin and /api precede OPTIONS.
    // /api itself is the unit's MCP door (below, once throughOf is in scope); /api/* and /admin were Payload's, now dead.
    if (path === '/admin' || path.startsWith('/admin/') || path.startsWith('/api/')) return handToPayload()
    if (request.method === 'OPTIONS') return new Response(null, { status: found + coins + coins, headers: emptyHeaders() })
    // A crawler (GET text/html) gets the door's reading as qpuPageOf HTML; every other client keeps the JSON-LD on the
    // same path. A path no door answers is the frontend's, probed under a deadline at the end (never handed unbounded).
    const wantsHtml = request.method === 'GET' && /text\/html/.test(request.headers.get('accept') ?? '')
    const canonicalOf = (p: string) => `https://${host}${p === '/' ? '' : p}`
    const pageOrServed = (p: string, build: () => object, meta?: { title?: string; description?: string }) =>
      wantsHtml
        ? new Response(qpuPageOf(build() as Record<string, unknown>, canonicalOf(p), meta), { status: found, headers: { ...headers, ...routeHeaders, 'content-type': 'text/html; charset=utf-8', ...revalidated } })
        : servedResponse(servedOf(p, build))
    // The public-door aliases (/mcp, /cite, /qpu.css) — served directly by the unit, not through Payload.
    if (PUBLIC_DOORS[path as keyof typeof PUBLIC_DOORS]) return handToPayload()
    if (path === '/health') return jsonOf({ status: 'healthy', holds: true })
    if (path === '/ready') return jsonOf({ status: 'ready', version: packageVersion, holds: proveHolds() })
    if (path === '/receipts' || path.startsWith('/receipts/')) {
      const all = receiptStreamsOf()
      const stream = path.slice('/receipts/'.length)
      if (path === '/receipts') return pageOrServed('/receipts', () => ({ ...all, streams: all.streams.map(({ recent, ...head }) => head) }), { title: '@uuidna/qpu — receipts', description: 'Every quantum-receipt stream — head, length, chain and whether it holds.' })
      const row = all.streams.find((s) => s.stream === stream)
      return row ? pageOrServed(path, () => row, { title: `@uuidna/qpu — receipts ${stream}`, description: `The ${stream} quantum-receipt stream and its recent receipts.` }) : jsonOf({ kind: 'receipts' as const, stream, length: n - n, holds: false as const }, lost)
    }
    if (path === '/metrics') return pageOrServed('/metrics', () => ({ mint: qpuMintReceiptOf(), foreign: foreignReadsOf(), receipts: RECEIPTS.length, served: servedLedgerOf().length }), { title: '@uuidna/qpu — metrics', description: 'Mint receipt, foreign reads, and the receipt and served-ledger counts.' })
    if (path === `/${unit.fuse.lean}`) {
      return new Response(leanSource, { status: found, headers: { ...headers, ...revalidated, 'content-type': 'text/plain; charset=utf-8' } })
    }
    if (path === '/') {
      // A crawler or browser gets the landing page as crawlable HTML (qpuPageOf); an API client keeps the quantum JSON.
      const { analyticsOf, publicOf } = await import('./zeropage.js')
      const { combinatoricsWindowOf } = await import('./presentation.js')
      const analytics = analyticsOf()
      const face = publicOf(analytics)
      const readings = await combinatoricsWindowOf()
      return pageOrServed('/', () => ({ ...quantumOf(), analytics, public: face.lines, prize: face.prize, links: qpuCiteOf().links, readings }), {
        title: '@uuidna/qpu — an exact quantum processing unit',
        description: 'Lean-checked theorems, formula families as hex-program UUIDs, live public-data checks and quantum receipts, served over MCP.',
      })
    }
    if (path === `/${unit.path}`) return pageOrServed(`/${unit.path}`, () => leanOf(), { title: '@uuidna/qpu — the Lean proof', description: 'Every theorem recomputed and typeset, each a hex-program UUID.' })
    // DISCOVERY DOORS — extras off the seven-path guide (the README names extras as allowed).
    if (path === '/.well-known/mcp.json') return servedResponse(servedOf(path, () => wellKnownOf()))
    if (path === '/mcp.json') { const to = new URL(request.url); to.pathname = '/api'; return handToPayload() }
    if (path === '/install.json') return servedResponse(servedOf(path, () => installManifestOf()))
    // THE UNIVERSAL CONNECTOR: mount QPU in ANY app, not only Claude — one GET returns the ready-to-paste config for
    // every harness (Claude Code, Cursor, VS Code, Codex, Gemini, the Anthropic/OpenAI APIs, raw HTTP), from the one
    // generated source (harnessesOf), so the wire and the README cannot disagree and nothing is a hand list.
    if (path === '/connector' || path === '/connector.json' || path === '/mount' || path === '/mount.json') return servedResponse(servedOf('/connector', () => harnessesOf()))
    if (path === '/openapi.json') return servedResponse(servedOf(path, () => openApiOf()))
    const rpcBodyOf = async <X extends object>() =>
      (await request.json().catch(() => ({}))) as { method?: string; params?: { name?: string; arguments?: Record<string, unknown> }; id?: unknown } & X
    const authedOf = (x: { holds?: boolean; denied?: unknown } | object) =>
      jsonOf(x, 'holds' in x && x.holds === false && 'denied' in x && x.denied === 'auth' ? unauthorized : found)
    const throughOf = async (body: { method?: string; params?: { name?: string; arguments?: Record<string, unknown> }; id?: unknown }) => {
      if (body.method !== 'tools/call') return undefined
      const args = body.params?.arguments && typeof body.params.arguments === 'object' && !Array.isArray(body.params.arguments) ? body.params.arguments : {}
      const asked = args.doors === true || args.errors === true || typeof args.hex === 'string' || (typeof args.hex === 'object' && args.hex !== null) || typeof args.door === 'string'
      if (!asked) return undefined
      const name = typeof body.params?.name === 'string' ? body.params.name : ''
      const called = await mcpCallOf(name, args, env, request.headers.get('authorization'))
      if (isUnknownTool(called)) return jsonOf(rpcErrorOf(body.id, rpcCodes.params, `Unknown tool: ${name || '(none)'}`, { tools: called.tools }))
      return jsonOf({ jsonrpc: '2.0', id: body.id ?? null, result: called })
    }
    // THE UNIT'S OWN MCP DOOR, SERVED HERE. uuidna carries no Payload layer (handToPayload answers dead), so the JSON-RPC
    // qpu's Payload plugin mounted at /api/mcp is answered by the unit itself at /api and /mcp — the same subRpcOf every
    // sub-catalogue uses, over the sealed main doors. Measured 2026-11-08 in the land's clean worktree: with both paths
    // dead the in-process release suite read every door as 404, and the chat test recorded a Payload hit that never was.
    if (path === '/api' || path === '/mcp') {
      if (request.method === 'POST') {
        const body = await rpcBodyOf()
        const via = await throughOf(body)
        if (via) return via
        // the eight sealed doors first, then the crypto sub-tools — the order tools/list has always answered in
        const rpc = await subRpcOf(body, [...toolsOf(), ...cybersecurityToolsOf()], `https://${host}/api`)
        if (rpc) return jsonOf(rpc)
      }
      return servedResponse(servedOf('/api', () => mcpOf()))
    }
    if (path === '/server' || path.startsWith('/server/')) {
      if (request.method === 'POST') {
        const body = await rpcBodyOf<{ gates?: unknown }>()
        const via = await throughOf(body)
        if (via) return via
        const rpc = await subRpcOf(body, serverToolsOf(), serverHref)
        if (rpc) return jsonOf(rpc)
        return jsonOf(serverSubmitOf(body))
      }
      if (path.startsWith('/server/') && path.length > '/server/'.length) {
        const id = Number(path.slice('/server/'.length))
        const job = serverJobs.find((row) => row.id === id)
        if (job) return jsonOf({ ...job, stored: false as const })
        // grounded: theorem false with theorem only: nothing was supplied, so nothing is computed, and what is not computed is not claimed
        return jsonOf({ kind: 'result' as const, id, holds: false as const, denied: 'job' as const, why: 'jobs are not stored; the result is returned inline with the submit, and an id lives only as long as the isolate that ran it' }, lost)
      }
      // the job-server catalog is static per deploy: ETag + 304 so a free wave re-reading it revalidates instead of re-sending.
      return servedResponse(servedOf('/server', () => serverMcpOf()))
    }
    if (path === '/hex' || path.startsWith('/hex/')) {
      // the hex catalogue and the hex tools enumerate every family, so the registry loads here (lazily, memoized)
      await hexRegistryOf()
      if (request.method === 'POST') {
        const body = await rpcBodyOf()
        const via = await throughOf(body)
        if (via) return via
        const rpc = await subRpcOf(body, hexToolsOf(env), hexHref)
        if (rpc) return jsonOf(rpc)
      }
      const program = path.slice('/hex/'.length)
      // a GET is a read: it never persists (store: false), so an unauthenticated GET /hex/<uuid> cannot write a db/hex
      // row and bypass the storage write bearer (Wave XIII). The value is a deterministic function of the uuid, so a
      // re-read recomputes it; persistence belongs to the authorized write paths, not an anonymous read.
      if (program) return jsonOf(await hexRunOf(program, undefined, env, { store: false }))
      // the hex catalogue enumerates every family and is static per deploy: ETag + 304 so a free wave re-reading the whole
      // catalogue (the biggest static reply) revalidates instead of recomputing and re-sending it every request.
      return servedResponse(servedOf('/hex', () => hexCatalogOf()))
    }
    if (path === '/network' || path.startsWith('/network/')) {
      if (request.method === 'POST') {
        const body = await rpcBodyOf<{ channel?: unknown; body?: unknown }>()
        const via = await throughOf(body)
        if (via) return via
        const rpc = await subRpcOf(body, networkToolsOf(), networkHref)
        if (rpc) return jsonOf(rpc)
        const send = networkToolsOf().find((t) => t.name === 'net_send')
        return jsonOf(send ? await send.run(body) : { holds: false as const })
      }
      return jsonOf(networkMcpOf())
    }
    if (path === '/storage' || path.startsWith('/storage/')) {
      // a malformed percent-escape (e.g. /storage/%) makes decodeURIComponent throw URIError; take the raw slice then
      // rather than let the throw escape worker.fetch and answer nothing (Wave XIII) — a bad key simply misses.
      const raw = path.slice('/storage/'.length)
      let key = ''
      try { key = path === '/storage' ? '' : decodeURIComponent(raw) } catch { key = raw }
      if (request.method === 'POST' && path === '/storage') {
        const body = await rpcBodyOf<{ maintain?: unknown; key?: unknown; value?: unknown }>()
        const via = await throughOf(body)
        if (via) return via
        const auth = request.headers.get('authorization')
        const rpc = await subRpcOf(body, storageToolsOf(env, auth), storageHref)
        if (rpc) return jsonOf(rpc)
        if (body.maintain === true) {
          const kept = await storageMaintainOf(env, auth)
          return authedOf(kept)
        }
        if (typeof body.key === 'string') {
          const put = await storageOf(env, { method: 'PUT', key: body.key, value: body.value, auth })
          return authedOf(put)
        }
      }
      if (request.method === 'PUT' || request.method === 'POST') {
        const value = await request.json().catch(() => null)
        const put = await storageOf(env, { method: 'PUT', key, value, auth: request.headers.get('authorization') })
        return authedOf(put)
      }
      if (request.method === 'DELETE') {
        const del = await storageOf(env, { method: 'DELETE', key, auth: request.headers.get('authorization') })
        return authedOf(del)
      }
      // GET /storage?prefix=…&limit=… — the links under a prefix, ascending, with their documents (uuidna.com/live reads it)
      const listPrefix = new URL(request.url).searchParams.get('prefix')
      if (path === '/storage' && listPrefix !== null) return jsonOf(await storageListOf(env, listPrefix, Number(new URL(request.url).searchParams.get('limit') ?? '')))
      if (path === '/storage') return jsonOf(await storageMcpOf(env))
      return jsonOf(await storageOf(env, { method: 'GET', key }))
    }
    if (path === '/message') {
      if (request.method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as { lane?: unknown; body?: unknown }
        const sent = messageOf(body)
        return jsonOf(sent, 'accepted' in sent && sent.accepted === true ? found + coins : found)
      }
      return servedResponse(servedOf('/message', () => messageOf()))
    }
    // THE UNIT RECOGNISES ANYTHING: a hex-program UUID pattern ANYWHERE in the path is the program, routing itself —
    // no family prefix (not /hex, not /ray). One UUID runs; several in the path are a stream, run in order; a `.svg`
    // (or an image Accept) asks for the animation representation of the same address — the picture an Open Graph crawler
    // and the UI read. The representation is chosen by content type, never by a prefix on the address.
    {
      const wantsSvg = path.endsWith('.svg') || /image\/svg/.test(request.headers.get('accept') ?? '')
      const bare = path.replace(/\.svg$/, '')
      const programs: string[] = bare.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi) ?? []
      // A UUID is the product of four 8-hex handles handling each other: four handles in the path compose the UUID they
      // address (8-4-4-4-12), eight compose two — a stream. The composed seal costs 2^128 to forge (infinite in practice),
      // verify stays O(1) — cool bills. Handles are recognised only when no full UUID already is, so a real UUID wins.
      if (!programs.length) {
        const handles = bare.match(/[0-9a-f]{8}/gi) ?? []
        for (let i = 0; i + 4 <= handles.length; i += 4) {
          const x = handles.slice(i, i + 4).join('').toLowerCase()
          programs.push(`${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20, 32)}`)
        }
      }
      if (programs.length) {
        await hexRegistryOf()
        if (wantsSvg) {
          const run = (await hexRunOf(programs[0]!, undefined, env).catch(() => undefined)) as { holds?: unknown } | undefined
          const holds = !(run && typeof run === 'object' && run.holds === false)
          return new Response(raySvgOf(programs[0]!, { title: unit.host, holds }), { status: found, headers: { ...headers, ...routeHeaders, ...immutable, 'content-type': 'image/svg+xml; charset=utf-8' } })
        }
        const runs = await Promise.all(programs.map((p) => hexRunOf(p, undefined, env)))
        const held = (r: unknown) => !(r && typeof r === 'object' && (r as { holds?: unknown }).holds === false)
        return jsonOf(programs.length === 1 ? runs[0] : { kind: 'stream' as const, programs, runs, holds: runs.every(held) })
      }
    }
    // A path no door answers is the CMS frontend's — probed under a 2s deadline; on the deadline the unit's answer stands.
    if (env?.PAYLOAD) {
      const page = await Promise.race([
        env.PAYLOAD.fetch(request).catch(() => undefined),
        new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), ten * ten * ten * coins)),
      ])
      if (page) return page
      return wantsHtml
        ? new Response(qpuPageOf(JSON.parse(dead) as Record<string, unknown>, canonicalOf(path), { title: '@uuidna/qpu', description: 'No door and no page answer this address.' }), { status: lost, headers: { ...headers, ...routeHeaders, 'content-type': 'text/html; charset=utf-8' } })
        : jsonOf(JSON.parse(dead), lost)
    }
    return handToPayload()
  }}
