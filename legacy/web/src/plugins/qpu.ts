// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The QPU as Payload plugins, one per capability, each by Payload's plugin guide (definePlugin: a slug, typed options, enabled, arrays spread),
// composed by the umbrella qpuPlugin: qpu (the core), qpu-agents, qpu-machine, qpu-google, qpu-apis, qpu-imagine, qpu-mcps, qpu-raid and qpu-hooks. The one implementation: this file is the source, no generator holds a copy.
import { APIError, addDataAndFileToRequest, definePlugin } from 'payload'
import type { Block, CollectionAfterChangeHook, CollectionAfterReadHook, CollectionConfig, Config, Endpoint, Field, Plugin, PayloadRequest, RequestContext, TaskConfig, Where } from 'payload'
import { existsSync, readFileSync, readdirSync, renameSync, mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'
import { createSign } from 'node:crypto'
import { call, caller, redact } from '@uuidna/qpu/mcp'
import { manageApi } from '@uuidna/qpu/payload-api'
import { canonicalText, qpuHooks as qpuHooksOf, uuid } from '@uuidna/qpu/blocks'
import { feeds, googleChallenges, type FeedRates } from '@uuidna/qpu/feeds'
import { apisCost, apisDoors, readingsOf, zoneReadingsOf, OBSERVE_QUERY, OBSERVE_ZONE_QUERY } from '@uuidna/qpu/apis'
import { Qpu } from '../blocks/Qpu/config'
import { qpuMcpDescribeEndpoint } from './qpuMcp'
import { Entries } from '../collections/Entries'
import { Tenants } from '../collections/Tenants'
import { QpuGlobal } from '../globals/Qpu'
import { qpuPlugins } from '../payload.qpu.config'
import { collisionGuard } from '../collections/pages.qpu.hooks'
import { firstUserBootstrap } from '../collections/users.qpu.hooks'
import { appRequest } from '../collections/form-submissions.qpu.hooks'
import { deployAfterSeed } from '../collections/orders.qpu.hooks'
import { appCall, qpuMachineTask, qpuMachineTool } from '../payload.qpu.mcp'

// the block added wherever a layout takes blocks, unless the layout names it already by object or by slug
const withBlock = (fields: Field[], block: Block): Field[] => fields.map((f): Field => {
  if (f.type === 'blocks' && f.name === 'layout') {
    return { ...f, blocks: f.blocks.some((b) => (typeof b === 'string' ? b : b.slug) === block.slug) ? f.blocks : [...f.blocks, block] }
  }
  if (f.type === 'tabs') return { ...f, tabs: f.tabs.map((t) => ({ ...t, fields: withBlock(t.fields, block) })) }
  if ('fields' in f && Array.isArray(f.fields)) return { ...f, fields: withBlock(f.fields, block) } as Field
  return f
})
// a hook put first on a collection unless it is there already, so applying a plugin twice is applying it once
const first = (c: CollectionConfig, on: 'beforeChange' | 'afterChange' | 'afterRead', fn: never): CollectionConfig => ({ ...c, hooks: { ...c.hooks, [on]: (c.hooks?.[on] ?? []).includes(fn) ? c.hooks?.[on] : [fn, ...(c.hooks?.[on] ?? [])] } })
const withTask = (config: Config, t: { slug: string }) => ({ ...config.jobs, tasks: [...(config.jobs?.tasks ?? []).filter((x) => x.slug !== t.slug), t as never] })
const pages = (c: CollectionConfig): CollectionConfig => first({
  ...c,
  fields: [...withBlock(c.fields, Qpu), ...(c.fields.some((f) => 'name' in f && f.name === 'editBase') ? [] : [{ name: 'editBase', type: 'text', virtual: true, admin: { hidden: true } } as Field])],
  lockDocuments: c.lockDocuments ?? { duration: 300 },
  versions: { ...(typeof c.versions === 'object' ? c.versions : {}), drafts: { ...(typeof c.versions === 'object' && typeof c.versions.drafts === 'object' ? c.versions.drafts : {}), autosave: { interval: 800 } } },
}, 'beforeChange', collisionGuard as never)
const users = (c: CollectionConfig): CollectionConfig => first({ ...c, auth: { ...(typeof c.auth === 'object' ? c.auth : {}), useAPIKey: true } }, 'beforeChange', firstUserBootstrap as never)
const submissions = (c: CollectionConfig): CollectionConfig => first(c, 'afterChange', appRequest as never)
const ordersHook = (c: CollectionConfig): CollectionConfig => first(c, 'afterChange', deployAfterSeed as never)
const hooked = (config: Config, by: Record<string, (c: CollectionConfig) => CollectionConfig>): Config => ({ ...config, collections: (config.collections ?? []).map((c) => by[c.slug]?.(c) ?? c) })
export type QpuPluginOptions = { enabled?: boolean; branding?: boolean; feeds?: boolean; plugins?: Plugin[] }
const feedRates = (): FeedRates | null => {
  const raw = process.env.QPU_RATES
  if (!raw) return null
  try { return JSON.parse(raw) as FeedRates } catch { return null }
}
const qpuFeedsEndpoint: Endpoint = {
  path: '/qpu/feeds',
  method: 'get',
  handler: async (req) => {
    const url = req.url ? new URL(req.url, 'http://local') : null
    const combinations = url?.searchParams.get('combinations') === '1'
    const google = url?.searchParams.get('google') === '1'
    const limitRaw = url?.searchParams.get('combinationLimit')
    const combinationLimit = limitRaw ? Math.min(512, Math.max(0, Number(limitRaw) || 0)) : 32
    return Response.json(feeds({ rates: feedRates(), combinations, combinationLimit: combinations ? combinationLimit : 0, google }), {
      headers: { 'cache-control': 'public, max-age=60', 'x-qpu-feed': 'products-variants' },
    })
  },
}
/** qpu: the core plugin — the block, the global, the tenants, the docket, the pages' guard and lock, the app request, the branding, the adapters */
// a glTF uploaded to media read as Unreal Engine reads it (seal { gltf }): what the scene holds kept on the document; an asset that requires an
// extension the GLTF_EXTENSIONS table Payload holds does not list is refused, as Unreal cannot load it
const readGltfUpload = (async ({ data, req }: { data: Record<string, unknown>; req: PayloadRequest }) => {
  const file = req.file as { data?: Buffer; name?: string } | undefined, name = (file?.name ?? '').toLowerCase()
  if (!file?.data || !(name.endsWith('.glb') || name.endsWith('.gltf'))) return data
  const r = call('seal', { text: file.name, gltf: name.endsWith('.glb') ? { glb64: file.data.toString('base64') } : { json: JSON.parse(file.data.toString('utf8')) } }) as { result?: { structuredContent?: { loadable?: boolean; why?: string | null } }; error?: { message: string } }, answer = r.result?.structuredContent
  if (!answer?.loadable) throw new APIError('this glTF cannot be loaded: ' + (answer?.why ?? r.error?.message ?? 'unread'), 400)
  return { ...data, gltf: answer }
}) as never
const gltfMedia = (c: CollectionConfig): CollectionConfig => first({ ...c, fields: [...c.fields.filter((f) => !('name' in f) || f.name !== 'gltf'), { name: 'gltf', type: 'json', admin: { readOnly: true, description: 'a glTF 2.0 asset as Unreal Engine reads it: what the scene holds and its extensions by prefix (seal { gltf })' } }] }, 'beforeChange', readGltfUpload)
// a blocks field that names its blocks by slug (the config's blocks) resolved to the block configs themselves: the Mongo adapter of Payload
// 4.0.0-beta.7 builds its schemas from block configs alone and drops every row named by slug on read (91 pages read back empty), while the D1
// adapter stores blocks as JSON; resolved once here, both adapters hold the same rows (payloadcms.com/docs/fields/blocks)
const resolveBlockReferences = (fields: Field[], blocks: readonly Block[]): Field[] => fields.map((f): Field => {
  if (f.type === 'blocks') {
    const named = (r: Block | string): Block | undefined => (typeof r === 'string' ? blocks.find((b) => b.slug === r) : r)
    const seen = new Set<string>()
    return { ...f, blocks: f.blocks.map(named).filter((b): b is Block => !!b).filter((b) => (seen.has(b.slug) ? false : (seen.add(b.slug), true))).map((b) => ({ ...b, fields: resolveBlockReferences(b.fields, blocks) })) }
  }
  if (f.type === 'tabs') return { ...f, tabs: f.tabs.map((t) => ({ ...t, fields: resolveBlockReferences(t.fields, blocks) })) }
  if ('fields' in f && Array.isArray(f.fields)) return { ...f, fields: resolveBlockReferences(f.fields, blocks) } as Field
  return { ...f } as Field // a copy per field object: a leaf shared with the config's own block would be sanitized twice (its editor wrapped twice: editor.validate is not a function)
})
export const qpuCore = definePlugin<QpuPluginOptions>({ slug: 'qpu', plugin: ({ config: incoming, options }) => (options?.enabled === false ? incoming : withResolvedBlocks(hooked({
  ...incoming,
  // the MCP door described first (GET /api/mcp answers 200, not the plugin's 405 that a connector check reads as a sign-in demand), then the rest
  endpoints: [qpuMcpDescribeEndpoint, ...(incoming.endpoints ?? []).filter((e) => !(e.path === '/qpu/feeds' && e.method === 'get') && !(e.path === '/mcp' && e.method === 'get')), ...(options?.feeds === false ? [] : [qpuFeedsEndpoint])],
  admin: options?.branding === false ? incoming.admin : { ...incoming.admin, meta: { ...incoming.admin?.meta, titleSuffix: incoming.admin?.meta?.titleSuffix ?? ' · QPU' }, components: { ...incoming.admin?.components, beforeDashboard: [...(incoming.admin?.components?.beforeDashboard ?? []), ...[{ tool: 'clay', args: { technique: 'reflection' } }, { tool: 'dashboard', args: {} }, { tool: 'leads', args: {} }, { tool: 'metrics', args: {} }, { tool: 'apis', args: {} }, { tool: 'imagine', args: { open: 4 } }, { tool: 'match', args: {} }, { tool: 'repository', args: { machine: { actions: true } } }].map((p) => ({ path: '@root/components/blocks/Qpu/App#QpuApp', clientProps: p }))], graphics: { Logo: '@root/components/blocks/Qpu/Branding#QpuLogo', Icon: '@root/components/blocks/Qpu/Branding#QpuIcon', ...incoming.admin?.components?.graphics } } },
  collections: [...(incoming.collections ?? []).filter((c) => c.slug !== Tenants.slug && c.slug !== Entries.slug), Tenants, Entries],
  globals: [...(incoming.globals ?? []).filter((g) => g.slug !== QpuGlobal.slug), QpuGlobal],
  blocks: [...(incoming.blocks ?? []).filter((b) => b.slug !== Qpu.slug), Qpu],
}, { pages, 'form-submissions': submissions, media: gltfMedia, orders: ordersHook }))) })
// every collection's and global's blocks named by slug resolved against the blocks the config holds once the qpu block is among them
const withResolvedBlocks = (config: Config): Config => ({ ...config, collections: (config.collections ?? []).map((c) => ({ ...c, fields: resolveBlockReferences(c.fields, config.blocks ?? []) })), globals: (config.globals ?? []).map((g) => ({ ...g, fields: resolveBlockReferences(g.fields, config.blocks ?? []) })) })
/** qpu-agents: an API key per user (an agent's key to the MCP), the first user from the deploy */
export const qpuAgents = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-agents', plugin: ({ config, options }) => (options?.enabled === false ? config : hooked(config, { users })) })
const entry = async (req: PayloadRequest, data: object, context?: RequestContext) => String(((await req.payload.create({ collection: 'entries' as never, data: data as never, overrideAccess: true, context })) as { id: string }).id)
const readPages = async (req: PayloadRequest, spec: { collection: string; where?: Record<string, unknown> }) => {
  const docs: unknown[] = []
  let page = 1
  for (;;) {
    const found = await req.payload.find(manageApi({ ...spec, action: 'find', page }).args as never) as { docs: unknown[]; hasNextPage?: boolean; nextPage?: number | null }
    docs.push(...found.docs)
    if (!found.hasNextPage || typeof found.nextPage !== 'number') return docs
    page = found.nextPage
  }
}
const all = (req: PayloadRequest, c: string) => readPages(req, { collection: c })
// the Google integration measured once a burst of changes settles, never holding a change, and kept on the qpu global
let googleTimer: ReturnType<typeof setTimeout> | undefined
const measureGoogle: CollectionAfterChangeHook = ({ doc, req, context }) => {
  if (context.qpuGoogle) return doc
  clearTimeout(googleTimer)
  googleTimer = setTimeout(() => void (async () => {
    const google = caller('payload')({ google: { pages: await all(req, 'pages'), tenants: await all(req, 'tenants'), entries: await all(req, 'entries'), keys: await all(req, 'payload-mcp-api-keys') } })
    await req.payload.updateGlobal({ slug: 'qpu', data: { google } as never, context: { qpuGoogle: true }, overrideAccess: true })
  })().catch((e: Error) => req.payload.logger.warn('google: ' + e.message)), 2000)
  return doc
}
// every Google call one job on the server, qpu-google-call, asked by an entry of kind call from qpu-google-call (createEntries through the MCP):
// the job reads the API's Discovery document keyless, the door validates the call against it, the credential is the server's (an API key the
// tenant's bindings name or the secret a named endpoint takes, else a service account or ADC exchanged at the token endpoint, else keyless) and the
// answer is an entry of kind call, the secret never in it
const googleAuth = async (req: PayloadRequest, tenant: unknown, token?: string, scopes: string[] = [], secret?: { param: string; named: string }): Promise<{ by: string; query?: Record<string, string>; bearer?: string }> => {
  const t = tenant ? await req.payload.findByID({ collection: 'tenants' as never, id: String(tenant), depth: 0, overrideAccess: true }).catch(() => null) : null
  const named = ((t as { bindings?: { variables?: { name: string }[] } } | null)?.bindings?.variables ?? []).map((v) => v.name).filter((n) => process.env[n]), key = named.find((n) => /^GOOGLE_[A-Z_]*KEY$/.test(n)), held = named.find((n) => /CREDENTIALS$/.test(n))
  const given = secret ? named.find((n) => n.includes(secret.named)) : key
  if (secret || key) return given ? { by: given, query: { [secret?.param ?? 'key']: process.env[given]! } } : { by: 'keyless' }
  const file = process.env.GOOGLE_APPLICATION_CREDENTIALS ?? path.join(homedir(), '.config', 'gcloud', 'application_default_credentials.json')
  const raw = !token ? null : held ? process.env[held]!.trim() : existsSync(file) ? readFileSync(file, 'utf8') : null, c = raw ? JSON.parse(raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8')) : null
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url'), now = Math.floor(Date.now() / 1000), claims = enc({ alg: 'RS256', typ: 'JWT' }) + '.' + enc({ iss: c?.client_email, scope: scopes.join(' '), aud: token, iat: now, exp: now + 3600 })
  const grant: Record<string, string> | null = c?.type === 'service_account' ? { grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: claims + '.' + createSign('RSA-SHA256').update(claims).sign(c.private_key, 'base64url') } : c?.type === 'authorized_user' ? { grant_type: 'refresh_token', client_id: c.client_id, client_secret: c.client_secret, refresh_token: c.refresh_token } : null
  const bearer = grant ? ((await (await fetch(token!, { method: 'POST', body: new URLSearchParams(grant) })).json()) as { access_token?: string }).access_token : undefined
  return bearer ? { by: held ?? 'adc', bearer } : { by: 'keyless' }
}
const googleCallTask: TaskConfig<{ input: Record<string, any>; output: { entry: string } }> = {
  slug: 'qpu-google-call', retries: 0,
  inputSchema: [...['api', 'version', 'method', 'url', 'httpMethod', 'endpoint', 'request', 'tenant'].map((name) => ({ name, type: 'text' }) as Field), { name: 'params', type: 'json' }, { name: 'body', type: 'json' }],
  outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const ask = (x: object) => caller('payload')({ googleCall: x }), asked = ask(input)
    const plan = asked.discovery ? ask({ ...input, discovery: await fetch(asked.discovery, { signal: AbortSignal.timeout(20000) }).then((r) => r.json(), () => null) }) : asked
    const auth = plan.allowed ? await googleAuth(req, input.tenant, plan.token, plan.request.scopes, plan.secret) : null, url = plan.allowed ? new URL(plan.request.url) : null, body = plan.request?.body
    for (const [k, v] of Object.entries(auth?.query ?? {})) url?.searchParams.set(k, v)
    const res = url ? await fetch(url, { method: plan.request.httpMethod, headers: { ...(auth?.bearer ? { authorization: 'Bearer ' + auth.bearer } : {}), ...(body != null ? { 'content-type': 'application/json' } : {}) }, body: body != null ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000) }).then(async (r) => ({ status: r.status, text: await r.text() }), (e: Error) => ({ status: 0, text: e.message })) : null
    return { output: { entry: await entry(req, { kind: 'call', from: 'qpu-google-call', ...tenantOf(input.tenant), body: { request: input.request ?? null, method: plan.method ?? null, allowed: plan.allowed === true, why: plan.why ?? (plan.allowed ? null : 'the Discovery document was not read'), by: auth?.by ?? null, status: res?.status ?? null, answer: res?.text == null ? null : redact(res.text) } }, { qpuGoogle: true }) } }
  },
}
// a call asked of a job (qpu-google-call, qpu-raid-verify) is queued and run at once, so its answer entry stands when createEntries answers
const queueGoogleCall: CollectionAfterChangeHook = async ({ doc, req, operation, context }) => {
  if (operation !== 'create' || context.qpuGoogle || doc.kind !== 'call' || !['qpu-google-call', 'qpu-raid-verify', 'qpu-lead-run', 'qpu-cloudflare-call', 'qpu-cloudflare-observe', 'qpu-imagine', 'qpu-mcp-call'].includes(doc.from) || !doc.body || 'allowed' in doc.body) return doc
  const job = (await req.payload.jobs.queue({ task: doc.from as never, input: { ...doc.body, request: doc.id, tenant: typeof doc.tenant === 'object' ? doc.tenant?.id : doc.tenant } as never, req })) as { id: string }
  await req.payload.jobs.runByID({ id: job.id, req })
  return doc
}
const qpuGoogleEndpoints: Endpoint[] = [
  {
    path: '/qpu/google',
    method: 'get',
    handler: async (req) => {
      const url = req.url ? new URL(req.url, 'http://local') : null
      const challenge = url?.searchParams.get('challenge') ?? url?.searchParams.get('id') ?? undefined
      return Response.json(googleChallenges({ challenge }), {
        headers: { 'cache-control': 'public, max-age=60', 'x-qpu-google': 'challenges-solved' },
      })
    },
  },
  {
    path: '/qpu/google',
    method: 'post',
    handler: async (req) => {
      const body = (typeof req.json === 'function' ? await req.json().catch(() => ({})) : (req.data ?? {})) as {
        challenge?: string
        challenges?: string[] | boolean
        persist?: boolean
        googleCall?: Record<string, unknown>
        tenant?: string
      }
      const report = googleChallenges({ challenge: body.challenge, challenges: body.challenges })
      const entries: string[] = []
      if (body.persist && Boolean(req.payload)) {
        for (const c of report.challenges) {
          const id = await entry(req, { kind: 'call', from: 'qpu-google', ...(body.tenant ? { tenant: body.tenant } : {}), body: c.entry.body }, { qpuGoogle: true }).catch(() => c.entry.id)
          entries.push(id)
        }
      }
      const callPlan = body.googleCall ? caller('payload')({ googleCall: body.googleCall }) : undefined
      return Response.json({ ...report, ...(entries.length ? { persistedEntries: entries } : {}), ...(callPlan ? { googleCall: callPlan } : {}) }, {
        headers: { 'x-qpu-google': 'challenges-solved' },
      })
    },
  },
]
/** qpu-google: the Google integration measured on the qpu global and every Google call the qpu-google-call job; order 20, after the MCP plugin made its keys */
export const qpuGoogle = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-google', order: 20, plugin: ({ config, options }) => (options?.enabled === false ? config : {
  ...hooked(config, Object.fromEntries(['pages', 'tenants', 'entries', 'payload-mcp-api-keys'].map((s) => [s, (c: CollectionConfig) => first(s === 'entries' ? first(c, 'afterChange', queueGoogleCall as never) : c, 'afterChange', measureGoogle as never)]))),
  endpoints: [...(config.endpoints ?? []).filter((e) => e.path !== '/qpu/google'), ...qpuGoogleEndpoints],
  jobs: withTask(config, googleCallTask),
  globals: (config.globals ?? []).map((g) => (g.slug !== 'qpu' || g.fields.some((f) => 'name' in f && f.name === 'google') ? g : { ...g, fields: [...g.fields, { name: 'google', type: 'json', admin: { readOnly: true } } as Field] })),
}) })
/** qpu-machine: the machine tool written into the MCP plugin's options through the plugins map before it runs (its order 10) */
// a lead that names its door runs as a job (payloadcms.com/docs/jobs-queue/tasks), asked by an entry of kind call from qpu-lead-run: the door
// called here (a QPU tool, or the machine tool for an action of its allow-list), its answer an entry linked to the request, the lead served once it answered
type LeadBlock = { tool?: string; arguments?: { lead?: { id?: string; status?: string; reason?: string; run?: { tool: string; arguments?: Record<string, unknown> } } } }
// the pages carrying a tool's block; a page's layout rewritten, nothing revalidated
const pagesWith = (req: PayloadRequest, tool: string) => readPages(req, { collection: 'pages', where: { 'layout.tool': { equals: tool } } }) as Promise<{ id: string; layout: LeadBlock[] }[]>
const relayout = (req: PayloadRequest, id: string, layout: unknown[]) => req.payload.update({ collection: 'pages', id, data: { layout } as never, overrideAccess: true, context: { disableRevalidate: true } })
const leadRunTask: TaskConfig<{ input: { lead?: string; request?: string }; output: { entry: string } }> = {
  slug: 'qpu-lead-run', retries: 0, inputSchema: [{ name: 'lead', type: 'text' }, { name: 'request', type: 'text' }], outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const pages = await pagesWith(req, 'leads')
    const page = pages.find((p) => p.layout.some((b) => b.arguments?.lead?.id === input.lead)), block = page?.layout.find((b) => b.arguments?.lead?.id === input.lead), run = block?.arguments?.lead?.run
    const answer: { result?: unknown; error?: string } = !run ? { error: 'the lead names no door' } : run.tool === 'machine' ? await qpuMachineTool.handler({ input: run.arguments ?? {}, req } as never).then((r) => ({ result: r }), (e: Error) => ({ error: e.message })) : ((r) => (r.error ? { error: r.error.message } : { result: r.result?.structuredContent ?? null }))(call(run.tool, run.arguments ?? {}) as { result?: { structuredContent?: unknown }; error?: { message: string } })
    const written = await entry(req, { kind: 'lead-run', from: 'qpu-lead-run', body: { lead: input.lead ?? null, tool: run?.tool ?? null, ok: !answer.error, answer }, links: input.request ? [input.request] : [] })
    // a run whose answer carries its continuation adds that lead as the next block of the page: served and open are one involution, nothing stops the chain
    const next = (answer.result as { continue?: { lead?: { id?: string } } } | null | undefined)?.continue?.lead
    const chained = next?.id && !page?.layout.some((b) => b.arguments?.lead?.id === next.id) ? [{ blockType: 'qpu', tool: 'leads', arguments: { lead: next } }] : []
    if (page && block && !answer.error) await relayout(req, page.id, [...page.layout.map((b) => (b === block ? { ...b, arguments: { ...b.arguments, lead: { ...b.arguments!.lead, status: 'served', reason: 'served by ' + run!.tool + ' (entry ' + written + ')' } } } : b)), ...chained])
    return { output: { entry: written } }
  },
}
// the daily editorial loop as a Payload job (payloadcms.com/docs/jobs-queue/tasks, scheduled daily, never a deploy): a tenant's news read as problems,
// the served ones solved and written as draft blog posts (Payload publishing — the tenant's editor publishes each at will), the unknown ones the editorial
// backlog, monetised on the tenant's own catalogue. editorial (the match tool) writes the posts from the verified combinatorics; Payload's validations verify them.
export const newsSolveTask: TaskConfig<{ input: { tenant?: string; news?: unknown }; output: { entry: string; posts: number } }> = {
  slug: 'qpu-news-solve', retries: 0, inputSchema: [{ name: 'tenant', type: 'text' }, { name: 'news', type: 'json' }], outputSchema: [{ name: 'entry', type: 'text' }, { name: 'posts', type: 'number' }],
  handler: async ({ input, req }) => {
    const tenantSlug = input.tenant ?? 'uuidna', items = Array.isArray(input.news) ? input.news : typeof input.news === 'string' ? (JSON.parse(input.news) as unknown[]) : []
    const r = call('match', { tenant: tenantSlug, news: items }) as { result?: { structuredContent?: { drafts?: { title: string; content?: unknown[] }[]; apps?: unknown[] } }; error?: { message: string } }
    const ed = r.result?.structuredContent, drafts = ed?.drafts ?? [], apps = ed?.apps ?? []
    // the tenant relationship: the tenant doc by its slug, so each post belongs to its tenant's blog (newsSolveTask writes the solution as the content body)
    const tenantDoc = (await req.payload.find({ collection: 'tenants' as never, where: { slug: { equals: tenantSlug } }, depth: 0, pagination: false, overrideAccess: true }).then((x) => x, () => ({ docs: [] }))).docs?.[0] as { id?: string } | undefined
    let posts = 0
    for (const d of drafts) { try { await req.payload.create({ collection: 'posts' as never, data: { title: d.title, content: d.content, ...(tenantDoc?.id ? { tenant: tenantDoc.id } : {}), _status: 'draft' } as never, draft: true, overrideAccess: true }); posts++ } catch { /* a post the editor's backlog keeps until its fields are complete */ } }
    return { output: { entry: await entry(req, { kind: 'editorial', from: 'qpu-news-solve', body: { tenant: tenantSlug, items: items.length, posts, apps: apps.length } }), posts } }
  },
}
export const qpuMachine = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-machine', order: 5, plugin: ({ config, options, plugins }) => {
  const o = plugins['@payloadcms/plugin-mcp']?.options
  if (o && options?.enabled !== false) o.tools = { ...(o.tools ?? {}), machine: qpuMachineTool as never }
  return options?.enabled === false ? config : { ...config, jobs: withTask({ ...config, jobs: withTask({ ...config, jobs: withTask(config, leadRunTask) }, newsSolveTask) }, qpuMachineTask) }
} })
// binding 0 (payloadcms.com/docs/hooks/collections): every document a collection changes or reads, at its content address in hex folders by the UUID's
// middle beside the repository (its R2 key, its GCS object) with a pointer to its latest version, the copy the RAID reads back verified when no other binding answers
const BINDING0 = process.env.QPU_BINDING0 ?? path.resolve(process.cwd(), '..', '.qpu'), mongo = caller('mongo')
const write = (files: { path: string; text: string }[]) => { for (const f of files) { const at = path.join(BINDING0, f.path); if (!existsSync(at) || (f.path.endsWith('.latest') && readFileSync(at, 'utf8') !== f.text)) { mkdirSync(path.dirname(at), { recursive: true }); writeFileSync(at, f.text) } } }
const mirror = ({ doc, collection }: { doc: Record<string, unknown>; collection: { slug: string } }) => {
  try { write(mongo({ op: 'mirror', collection: collection.slug, docs: [doc] }).files) } catch { /* binding 0 unwritable: the other bindings stand */ }
  return doc
}
// a call heals at each read by address (payloadcms.com/docs/hooks/collections#afterread), before binding 0 copies it: recomputed as the app answers it (appCall), compared without _meta (its clock);
// a difference a second recompute repeats is a drift (served fresh, a correction with the syndrome, the tool's lead filed), else a reading (served fresh)
const heal: CollectionAfterReadHook = async ({ doc, req, collection, findMany }) => {
  const { tool, arguments: args = {} } = doc.body ?? {}, stored = doc.result
  if (collection.slug !== 'entries' || findMany || doc.kind !== 'call' || !tool || !stored) return doc
  const run = () => { const r = appCall(tool, args); return { ...(r.result ?? { error: r.error }), ...(stored.corrected ? { corrected: stored.corrected } : {}) } }
  const of = (r: object) => uuid(canonicalText({ ...r, _meta: undefined })), result = run(), syndrome = { stale: of(stored), fresh: of(result) }
  if (syndrome.stale === syndrome.fresh) return doc
  if (of(run()) === syndrome.fresh) {
    const lead = { id: 'heal-' + syndrome.fresh, source: 'qpu-heal', status: 'open', tool, statement: tool + ' drifted from ' + syndrome.stale, run: { tool, arguments: args } }
    await entry(req, { kind: 'correction', from: 'qpu-heal', tenant: doc.tenant?.id ?? doc.tenant, body: { tool, syndrome }, links: [doc.id] }).catch(() => null)
    for (const p of await pagesWith(req, tool).then((p) => (p.length ? p : pagesWith(req, 'leads')))) if (!p.layout.some((b) => b.arguments?.lead?.id === lead.id)) await relayout(req, p.id, [...p.layout, { blockType: 'qpu', tool: 'leads', arguments: { lead } }])
  }
  return { ...doc, result }
}
// the batch (payloadcms.com/docs/jobs-queue/tasks), asked by an entry of kind call from qpu-raid-verify: binding 0 and Payload's copy of the collection named
// (else every one) verified against bit 0 by the mongo door; the rebuilds written, the files moved to their middle-part folders, one entry
const verifyTask: TaskConfig<{ input: { collection?: string }; output: { entry: string } }> = {
  slug: 'qpu-raid-verify', retries: 0, inputSchema: [{ name: 'collection', type: 'text' }], outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const files = existsSync(BINDING0) ? Object.fromEntries(readdirSync(BINDING0, { recursive: true }).map(String).filter((p) => /[\da-f-]{36}(\.latest)?$/.test(p)).map((p) => [p, readFileSync(path.join(BINDING0, p), 'utf8')])) : {}
    const payload = await Promise.all(req.payload.config.collections.filter((c) => !input.collection || c.slug === input.collection).map(async (c) => mongo({ op: 'mirror', collection: c.slug, docs: await all(req, c.slug) }).files as { path: string; text: string }[]))
    const { rebuild, ...v } = mongo({ op: 'verify', copies: { filesystem: files, payload: Object.fromEntries(payload.flat().map((f) => [f.path, f.text])) } })
    for (const m of v.moves) if (m.binding === 'filesystem') { mkdirSync(path.dirname(path.join(BINDING0, m.to)), { recursive: true }); renameSync(path.join(BINDING0, m.from), path.join(BINDING0, m.to)) }
    write(rebuild.filter((r: { binding: string }) => r.binding === 'filesystem'))
    return { output: { entry: await entry(req, { kind: 'verification', from: 'qpu-raid-verify', body: { ...v, rebuilt: rebuild.length } }) } }
  },
}
/** qpu-raid: binding 0 under every collection, by its afterChange and afterRead hooks, and its verification against bit 0 as a batch */
export const qpuRaid = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-raid', plugin: ({ config, options }) => (options?.enabled === false ? config : { ...config, collections: (config.collections ?? []).map((c) => first(first(first(c, 'afterChange', mirror as never), 'afterRead', mirror as never), 'afterRead', heal as never)), jobs: withTask(config, verifyTask) }) })
/** qpu-hooks: the witnesses on the final config, every rich text field and Lexical block node; ordered last, any config mounts it with one line */
// every Cloudflare call one job on the server, qpu-cloudflare-call: a method and path are allowed only when an entry of kind openapi-operation held
// in Payload names them (Cloudflare's OpenAPI read into entries) or they are the GraphQL Analytics endpoint; the token is the variable the tenant's
// bindings name (CLOUDFLARE_API_TOKEN when none is named), never in the entry; the answer is an entry of kind call from qpu-cloudflare-call
const qpuOf = async (req: PayloadRequest) => (await req.payload.findGlobal({ slug: 'qpu' as never, depth: 0, overrideAccess: true }).catch(() => ({}))) as { apis?: Record<string, unknown>; imagination?: unknown }
const tenantOf = (tenant?: string) => (tenant ? { tenant } : {})
const cloudflareToken = async (req: PayloadRequest, tenant: unknown): Promise<{ by: string; bearer?: string; account?: string; zone?: string }> => {
  const t = tenant ? await req.payload.findByID({ collection: 'tenants' as never, id: String(tenant), depth: 0, overrideAccess: true }).catch(() => null) : null
  const named = ((t as { bindings?: { variables?: { name: string }[] } } | null)?.bindings?.variables ?? []).map((v) => v.name).filter((n) => process.env[n])
  const by = named.find((n) => /^CLOUDFLARE_[A-Z_]*TOKEN$/.test(n)) ?? (process.env.CLOUDFLARE_API_TOKEN ? 'CLOUDFLARE_API_TOKEN' : null)
  const zone = process.env[named.find((n) => /^CLOUDFLARE_[A-Z_]*ZONE_ID$/.test(n)) ?? 'CLOUDFLARE_ZONE_ID']
  return by ? { by, bearer: process.env[by], account: process.env.CLOUDFLARE_ACCOUNT_ID, zone } : { by: 'unnamed' }
}
type HeldOperation = { method: string; server: string; path: string; id: string; tags: string[] }
const heldCloudflareOperations = async (req: PayloadRequest): Promise<HeldOperation[]> => {
  const ops: HeldOperation[] = []
  for (let page = 1; ; page++) {
    const found = (await req.payload.find({ collection: 'entries' as never, where: { kind: { equals: 'openapi-operation' } }, depth: 0, page, pagination: false, overrideAccess: true })) as { docs: { body?: { server?: string; path?: string; method?: string; operationId?: string; tags?: string[] } }[]; hasNextPage: boolean }
    for (const d of found.docs) if (d.body?.path && /api\.cloudflare\.com/.test(d.body.server ?? '')) ops.push({ method: (d.body.method ?? 'GET').toUpperCase(), server: d.body.server!, path: d.body.path, id: d.body.operationId ?? d.body.path, tags: d.body.tags ?? [] })
    if (!found.hasNextPage) break
  }
  return ops
}
const cloudflareCallTask: TaskConfig<{ input: Record<string, any>; output: { entry: string } }> = {
  slug: 'qpu-cloudflare-call', retries: 0,
  inputSchema: [...['method', 'path', 'request', 'tenant'].map((name) => ({ name, type: 'text' }) as Field), { name: 'body', type: 'json' }],
  outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const held = await heldCloudflareOperations(req), method = String(input.method ?? 'GET').toUpperCase(), path = String(input.path ?? '')
    const op = held.find((o) => o.method === method && new RegExp('^' + o.path.replace(/\{[^}]+\}/g, '[^/]+') + '$').test(path)) ?? (path === '/graphql' && method === 'POST' ? { id: 'graphql-analytics', server: 'https://api.cloudflare.com/client/v4', path, method, tags: ['analytics'] } : null)
    const auth = op ? await cloudflareToken(req, input.tenant) : null
    const allowed = Boolean(op && auth?.bearer), why = !op ? 'no held openapi-operation names this method and path' : !auth?.bearer ? 'no tenant binding names a Cloudflare token' : null
    const url = allowed ? op!.server + path.split('{account_id}').join(auth!.account ?? '') : null
    const res = url ? await fetch(url, { method, headers: { authorization: 'Bearer ' + auth!.bearer, ...(input.body != null ? { 'content-type': 'application/json' } : {}) }, body: input.body != null ? JSON.stringify(input.body) : undefined, signal: AbortSignal.timeout(20000) }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }), (e: Error) => ({ status: 0, body: { error: e.message } })) : null
    return { output: { entry: await entry(req, { kind: 'call', from: 'qpu-cloudflare-call', ...tenantOf(input.tenant), body: { request: input.request ?? null, method, path, operation: op?.id ?? null, allowed, why, by: auth?.by ?? null, status: res?.status ?? null, answer: res?.body ?? null } }, { qpuApis: true }) } }
  },
}
// the meters read once a run, qpu-cloudflare-observe: one GraphQL query month-to-date, the readings priced by the program (zero inside every
// allowance), the bill and its meters written on the qpu global as apis.cloudflare, a lead entry per meter past 80% with its remedy
const cloudflareObserveTask: TaskConfig<{ input: Record<string, any>; output: { entry: string } }> = {
  slug: 'qpu-cloudflare-observe', retries: 0,
  inputSchema: [{ name: 'request', type: 'text' }, { name: 'tenant', type: 'text' }, { name: 'zone', type: 'text' }],
  outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const auth = await cloudflareToken(req, input.tenant), now = new Date(), since = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString()
    const post = (query: string, variables: Record<string, string>) => fetch('https://api.cloudflare.com/client/v4/graphql', { method: 'POST', headers: { authorization: 'Bearer ' + auth.bearer, 'content-type': 'application/json' }, body: JSON.stringify({ query, variables: { ...variables, since, until: now.toISOString() } }), signal: AbortSignal.timeout(20000) }).then((r) => r.json(), (e: Error) => ({ errors: [{ message: e.message }] }))
    const answer = auth.bearer && auth.account ? await post(OBSERVE_QUERY, { accountTag: auth.account }) : { errors: [{ message: auth.account ? 'no tenant binding names a Cloudflare token' : 'CLOUDFLARE_ACCOUNT_ID is not named' }] }
    const readings = readingsOf(answer as never), cost = apisCost(readings)
    const zoneTag = typeof input.zone === 'string' && input.zone ? input.zone : auth.zone
    const zone = zoneReadingsOf((auth.bearer && zoneTag ? await post(OBSERVE_ZONE_QUERY, { zoneTag }) : { errors: [{ message: zoneTag ? 'no tenant binding names a Cloudflare token' : 'no zone tag is named: the input zone, a tenant binding CLOUDFLARE_*ZONE_ID or CLOUDFLARE_ZONE_ID' }] }) as never)
    const observed = { at: now.toISOString(), since, by: auth.by, readings, cost: { usd: cost.usd, microUsd: cost.microUsd, covered: cost.covered }, meters: cost.rows.map((r) => ({ meter: r.meter, used: r.used, included: r.included, share: r.share, usd: r.microUsd / 1_000_000, remedy: r.remedy })), leads: cost.leads, zone: { tag: zoneTag ?? null, ...zone }, errors: (answer as { errors?: { message: string }[] }).errors ?? [] }
    const current = await qpuOf(req)
    await req.payload.updateGlobal({ slug: 'qpu' as never, data: { apis: { ...(current.apis ?? {}), cloudflare: observed } } as never, context: { qpuApis: true }, overrideAccess: true })
    for (const lead of cost.leads) await entry(req, { kind: 'lead', from: 'qpu-cloudflare-observe', ...tenantOf(input.tenant), body: lead }, { qpuApis: true }).catch(() => null)
    return { output: { entry: await entry(req, { kind: 'call', from: 'qpu-cloudflare-observe', ...tenantOf(input.tenant), body: { request: input.request ?? null, allowed: Boolean(auth.bearer), by: auth.by, observed } }, { qpuApis: true }) } }
  },
}
// the merged index kept in sync: after any change of pages, tenants, entries or keys the three providers' operations are re-read (Payload from
// its config, Cloudflare from the held contract, Google from the endpoints table, shadcn from the registry contract), addressed by the program with the doors and the coverage of
// Payload's own packages, templates, examples and plugins, and written on the qpu global as apis
const apisOf = async (req: PayloadRequest) => {
  const origin = (req.payload.config.serverURL || 'https://qpu.uuidna.com').replace(/\/$/, '')
  const held = await heldCloudflareOperations(req)
  const paths: Record<string, Record<string, { operationId: string; tags: string[] }>> = {}
  for (const o of held) (paths[o.path] ??= {})[o.method.toLowerCase()] = { operationId: o.id, tags: o.tags }
  const index = caller('apis')({ index: { payload: { collections: req.payload.config.collections.map((c) => ({ slug: c.slug })), globals: req.payload.config.globals.map((g) => ({ slug: g.slug })), server: origin }, cloudflare: { servers: [{ url: 'https://api.cloudflare.com/client/v4' }], paths }, google: true, shadcn: true } })
  const doors = apisDoors(origin), coverage = caller('apis')({ coverage: true })
  return { syncedAt: new Date().toISOString(), doors: { total: doors.total, byProvider: doors.byProvider, holds: doors.holds, rows: doors.rows }, index: { total: index.total, distinct: index.distinct, byProvider: index.byProvider, byTag: index.byTag, holds: index.holds, held: held.length }, coverage: { total: coverage.total, covered: coverage.covered, gaps: coverage.gaps, byKind: coverage.byKind, next: coverage.next ? { kind: coverage.next.kind, name: coverage.next.name, address: coverage.next.address, step: coverage.next.step } : null, holds: coverage.holds } }
}
let apisTimer: ReturnType<typeof setTimeout> | undefined
const syncApis = async (req: PayloadRequest) => {
  const current = await qpuOf(req)
  await req.payload.updateGlobal({ slug: 'qpu' as never, data: { apis: { ...(current.apis ?? {}), ...(await apisOf(req)) } } as never, context: { qpuApis: true }, overrideAccess: true })
}
const measureApis: CollectionAfterChangeHook = async ({ doc, req, context }) => {
  if (context.qpuApis || context.qpuGoogle) return doc
  clearTimeout(apisTimer)
  apisTimer = setTimeout(() => void syncApis(req).catch((e: Error) => req.payload.logger.warn('apis: ' + e.message)), 2000)
  return doc
}
const runApisJob = async (req: PayloadRequest, task: 'qpu-cloudflare-call' | 'qpu-cloudflare-observe', input: Record<string, unknown>) => {
  const job = (await req.payload.jobs.queue({ task: task as never, input: input as never, req })) as { id: string }
  await req.payload.jobs.runByID({ id: job.id, req })
  return job.id
}
const qpuApisEndpoints: Endpoint[] = [
  {
    path: '/qpu/apis',
    method: 'get',
    handler: async (req) => {
      const current = await qpuOf(req)
      return Response.json({ ...(await apisOf(req)), cloudflare: current.apis?.cloudflare ?? null }, { headers: { 'cache-control': 'public, max-age=60', 'x-qpu-apis': 'payload-cloudflare-google' } })
    },
  },
  {
    path: '/qpu/apis',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'a signed-in user or an MCP key asks the jobs' }, { status: 401 })
      const body = (typeof req.json === 'function' ? await req.json().catch(() => ({})) : (req.data ?? {})) as { observe?: boolean; sync?: boolean; call?: { method?: string; path?: string; body?: unknown }; tenant?: string }
      const jobs: Record<string, string> = {}
      if (body.observe) jobs.observe = await runApisJob(req, 'qpu-cloudflare-observe', { ...(body.tenant ? { tenant: body.tenant } : {}) })
      if (body.call) jobs.call = await runApisJob(req, 'qpu-cloudflare-call', { method: body.call.method ?? 'GET', path: body.call.path ?? '', body: body.call.body ?? null, ...(body.tenant ? { tenant: body.tenant } : {}) })
      if (body.sync || body.observe || body.call) await syncApis(req)
      const current = await qpuOf(req)
      return Response.json({ jobs, apis: current.apis ?? null }, { headers: { 'x-qpu-apis': 'payload-cloudflare-google' } })
    },
  },
]
/** qpu-apis: Payload's, Cloudflare's and Google's admin APIs as one UUID program on the qpu global, the Cloudflare call and observe jobs, the merged index kept in sync; order 21, after qpu-google */
export const qpuApis = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-apis', order: 21, plugin: ({ config, options }) => (options?.enabled === false ? config : {
  ...hooked(config, Object.fromEntries(['pages', 'tenants', 'entries', 'payload-mcp-api-keys'].map((s) => [s, (c: CollectionConfig) => first(c, 'afterChange', measureApis as never)]))),
  endpoints: [...(config.endpoints ?? []).filter((e) => e.path !== '/qpu/apis'), ...qpuApisEndpoints],
  jobs: withTask({ ...config, jobs: withTask(config, cloudflareCallTask) as never }, cloudflareObserveTask),
  globals: (config.globals ?? []).map((g) => (g.slug !== 'qpu' || g.fields.some((f) => 'name' in f && f.name === 'apis') ? g : { ...g, fields: [...g.fields, { name: 'apis', type: 'json', admin: { readOnly: true, description: 'Payload, Cloudflare, Google and shadcn admin APIs as one UUID program: the doors, the merged operation index, the coverage of Payload\'s own surface with the next gap, the Cloudflare meters and their bill' } } as Field] })),
}) })
// imagination through Payload, qpu-imagine: one job imagines a slice of the open leads (the first n, or the ids named, or statements as
// strings), every imagined lead lands as an entry of kind lead from qpu-imagine (one per address, never twice), the run as an entry of kind
// call, and the qpu global keeps the latest imagination; a lead-run entry queues the imagination of the lead it ran, so the loop
// imagine → leads → qpu-lead-run → imagine closes through the docket, each step an entry a hook answers
const imagineTask: TaskConfig<{ input: Record<string, any>; output: { entry: string } }> = {
  slug: 'qpu-imagine', retries: 0,
  inputSchema: [{ name: 'open', type: 'number' }, { name: 'request', type: 'text' }, { name: 'tenant', type: 'text' }, { name: 'leads', type: 'json' }, { name: 'statements', type: 'json' }],
  outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const ask: Record<string, unknown> = { ...(Array.isArray(input.leads) && input.leads.length ? { leads: input.leads } : {}), ...(Array.isArray(input.statements) && input.statements.length ? { statements: input.statements } : {}), ...(typeof input.open === 'number' ? { open: input.open } : Array.isArray(input.leads) || Array.isArray(input.statements) ? {} : { open: 4 }) }
    const im = caller('imagine')(ask) as { leads: number; served: number; impossible: number; unknown: number; verifyRequests: number; imaginedLeads: number; ms: number; imagination: { rows: unknown[]; imagined: { id: string; statement: string; source: string; status: string }[] } }
    const written: string[] = []
    for (const lead of im.imagination.imagined) {
      const address = uuid('lead\n' + lead.id + '\n' + lead.statement)
      const held = (await req.payload.find({ collection: 'entries' as never, where: { and: [{ kind: { equals: 'lead' } }, { 'body.address': { equals: address } }] }, pagination: false, depth: 0, overrideAccess: true })) as { totalDocs: number }
      if (held.totalDocs > 0) continue
      written.push(await entry(req, { kind: 'lead', from: 'qpu-imagine', ...tenantOf(input.tenant), body: { ...lead, address, tool: 'imagine' } }, { qpuImagine: true }))
    }
    const imagination = { at: new Date().toISOString(), asked: ask, leads: im.leads, verdicts: { served: im.served, impossible: im.impossible, unknown: im.unknown }, verifyRequests: im.verifyRequests, imaginedLeads: im.imaginedLeads, written: written.length, ms: im.ms, rows: im.imagination.rows }
    const current = await qpuOf(req)
    await req.payload.updateGlobal({ slug: 'qpu' as never, data: { imagination } as never, context: { qpuImagine: true }, overrideAccess: true }).catch(() => current)
    return { output: { entry: await entry(req, { kind: 'call', from: 'qpu-imagine', ...tenantOf(input.tenant), body: { request: input.request ?? null, imagination, entries: written } }, { qpuImagine: true }) } }
  },
}
const imagineAfterRun: CollectionAfterChangeHook = async ({ doc, req, operation, context }) => {
  if (operation !== 'create' || context.qpuImagine || doc.kind !== 'lead-run' || !doc.body?.lead) return doc
  const job = (await req.payload.jobs.queue({ task: 'qpu-imagine' as never, input: { leads: [String(doc.body.lead)], request: doc.id } as never, req })) as { id: string }
  await req.payload.jobs.runByID({ id: job.id, req })
  return doc
}
const qpuImagineEndpoints: Endpoint[] = [
  {
    path: '/qpu/imagine',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'a signed-in user or an MCP key asks the imagination' }, { status: 401 })
      const body = (typeof req.json === 'function' ? await req.json().catch(() => ({})) : (req.data ?? {})) as { open?: number; leads?: string[]; statements?: (string | { id: string; statement: string })[]; tenant?: string }
      const job = (await req.payload.jobs.queue({ task: 'qpu-imagine' as never, input: { ...(typeof body.open === 'number' ? { open: body.open } : {}), ...(body.leads ? { leads: body.leads } : {}), ...(body.statements ? { statements: body.statements } : {}), ...(body.tenant ? { tenant: body.tenant } : {}) } as never, req })) as { id: string }
      await req.payload.jobs.runByID({ id: job.id, req })
      const current = await qpuOf(req)
      return Response.json({ job: job.id, imagination: current.imagination ?? null }, { headers: { 'x-qpu-imagine': 'leads' } })
    },
  },
]
/** qpu-imagine: the imagination through Payload — the job, the lead-run hook that queues it, the endpoint, the global's latest imagination; order 22 */
export const qpuImagine = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-imagine', order: 22, plugin: ({ config, options }) => (options?.enabled === false ? config : {
  ...hooked(config, { entries: (c: CollectionConfig) => first(c, 'afterChange', imagineAfterRun as never) }),
  endpoints: [...(config.endpoints ?? []).filter((e) => e.path !== '/qpu/imagine'), ...qpuImagineEndpoints],
  jobs: withTask(config, imagineTask),
  globals: (config.globals ?? []).map((g) => (g.slug !== 'qpu' || g.fields.some((f) => 'name' in f && f.name === 'imagination') ? g : { ...g, fields: [...g.fields, { name: 'imagination', type: 'json', admin: { readOnly: true, description: 'the latest imagination: the open leads imagined, their verdicts, the verify requests and the leads it opened, each written once as an entry of kind lead from qpu-imagine' } } as Field] })),
}) })
// MCPs at will, qpu-mcps: the official registry searched from the app (POST /qpu/mcp/search { query, limit? }), a server the user chose
// installed as one row of the tenant's mcps (POST /qpu/mcp/install { name, url, auth? }: a tenant-admin's or the super admin's act), and every
// fetch of a foreign MCP or of the registry one job, qpu-mcp-call, asked by an entry of kind call from qpu-mcp-call; a token travels from the
// environment by the name the row holds, never its value. The pure core plans the request and reads the answer (discover { search }, extend
// { install }); the app fetches and writes; the page of the answering entry is the UI, its widget carrying the search and install forms
type McpRow = { name: string; url: string; auth?: string; token?: string | null }
const mcpsField: Field = { name: 'mcps', type: 'array', admin: { description: 'the MCP servers this tenant installed from the registry: a name, an https url, and for a bearer host the binding name of its token, never a value' }, fields: [
  { name: 'name', type: 'text', required: true },
  { name: 'url', type: 'text', required: true, validate: (v: unknown) => String(v).startsWith('https://') || 'an https url' },
  { name: 'auth', type: 'select', defaultValue: 'none', options: ['none', 'bearer'] },
  { name: 'token', type: 'text', validate: (v: unknown) => v == null || v === '' || /^[A-Z][A-Z0-9_]*$/.test(String(v)) || 'a binding name: upper-case letters, digits and underscores, never a value' },
] }
const mcpRows = async (req: PayloadRequest, tenant: unknown): Promise<McpRow[]> => { const t = tenant ? await req.payload.findByID({ collection: 'tenants' as never, id: String(tenant), depth: 0, overrideAccess: true }).catch(() => null) : null; return ((t as { mcps?: McpRow[] } | null)?.mcps ?? []) }
// the same call is the same entry (its id the content address): asked again, the held entry answers instead of a second create
const entryOnce = async (req: PayloadRequest, data: { kind: string; from: string; tenant?: string; body: Record<string, unknown>; links?: string[] }, where: Where) => {
  try { return await entry(req, data, { qpuMcps: true }) } catch (e) {
    const held = (await req.payload.find({ collection: 'entries' as never, where: { and: [{ kind: { equals: data.kind } }, { from: { equals: data.from } }, where] }, sort: '-createdAt', pagination: false, depth: 0, overrideAccess: true })) as { docs: { id: string }[] }
    if (held.docs[0]) return String(held.docs[0].id)
    throw e
  }
}
const mcpFetch = async (url: string, method: string, params: unknown, row?: McpRow) => {
  const headers: Record<string, string> = method === 'registry' ? { accept: 'application/json' } : { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }
  if (method !== 'registry' && row?.auth === 'bearer' && row.token && process.env[row.token]) headers.authorization = 'Bearer ' + process.env[row.token]
  const init: RequestInit = method === 'registry' ? { headers } : { method: 'POST', headers, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params: params ?? {} }) }
  return fetch(url, { ...init, signal: AbortSignal.timeout(20000) }).then(async (r) => ({ status: r.status, text: await r.text() }), (e: Error) => ({ status: 0, text: e.message }))
}
const mcpCallTask: TaskConfig<{ input: Record<string, any>; output: { entry: string } }> = {
  slug: 'qpu-mcp-call', retries: 0,
  inputSchema: [{ name: 'url', type: 'text' }, { name: 'method', type: 'text' }, { name: 'params', type: 'json' }, { name: 'request', type: 'text' }, { name: 'tenant', type: 'text' }],
  outputSchema: [{ name: 'entry', type: 'text' }],
  handler: async ({ input, req }) => {
    const url = String(input.url ?? ''), method = String(input.method ?? 'tools/list')
    const row = (await mcpRows(req, input.tenant)).find((m) => m.url === url)
    const res = url.startsWith('https://') ? await mcpFetch(url, method, input.params, row) : { status: 0, text: 'an https url is fetched, nothing else' }
    return { output: { entry: await entryOnce(req, { kind: 'call', from: 'qpu-mcp-call', ...tenantOf(input.tenant), body: { request: input.request ?? null, url, method, allowed: url.startsWith('https://'), by: row?.token ?? null, status: res.status, answer: res.text } }, { 'body.url': { equals: url }, 'body.method': { equals: method } }) } }
  },
}
// the body as Payload's own REST reads it (addDataAndFileToRequest: JSON, or multipart with the _payload field a form carries), nothing parsed here
const mcpBody = async (req: PayloadRequest): Promise<Record<string, string>> => { await addDataAndFileToRequest(req); return Object.fromEntries(Object.entries((req.data ?? {}) as Record<string, unknown>).map(([k, v]) => [k, String(v ?? '')])) }
const mcpTenant = async (req: PayloadRequest, asked: string): Promise<string | null> => {
  if (asked) return asked
  const host = (req.headers.get('host') ?? '').split(':')[0] || 'localhost'
  const byHost = (await req.payload.find({ collection: 'tenants' as never, where: { 'domains.domain': { equals: host } }, pagination: false, depth: 0, overrideAccess: true })) as { docs: { id: string }[] }
  const one = byHost.docs[0] ?? ((await req.payload.find({ collection: 'tenants' as never, pagination: false, depth: 0, overrideAccess: true })) as { docs: { id: string }[] }).docs[0]
  return one ? String(one.id) : null
}
// a form post from the page goes back to the page of the entry that answers it; a JSON client reads the entry and the result
const mcpAnswer = (req: PayloadRequest, id: string, result: unknown) => ((req.headers.get('accept') ?? '').includes('text/html') ? Response.redirect(new URL('/' + id, req.payload.config.serverURL || ('http://' + (req.headers.get('host') ?? 'localhost'))).toString(), 303) : Response.json({ entry: id, result }, { headers: { 'x-qpu-mcps': 'entry' } }))
const mcpRun = async (req: PayloadRequest, input: Record<string, unknown>) => {
  const job = (await req.payload.jobs.queue({ task: 'qpu-mcp-call' as never, input: input as never, req })) as { id: string }
  await req.payload.jobs.runByID({ id: job.id, req })
  const found = (await req.payload.find({ collection: 'entries' as never, where: { and: [{ kind: { equals: 'call' } }, { from: { equals: 'qpu-mcp-call' } }, { 'body.url': { equals: input.url } }] }, sort: '-createdAt', pagination: false, depth: 0, overrideAccess: true })) as { docs: { id: string; body: { status: number; answer: string } }[] }
  return found.docs[0] ?? null
}
// the search as a GET (a plain form, req.query) or a POST (JSON, or a form's _payload); the install a POST alone
const mcpSearch = async (req: PayloadRequest) => {
      const b = req.method?.toUpperCase() === 'GET' ? Object.fromEntries(Object.entries((req.query ?? {}) as Record<string, unknown>).map(([k, v]) => [k, String(v ?? '')])) : await mcpBody(req), query = (b.query ?? '').trim()
      if (!query) return Response.json({ error: 'search takes query: the words asked of the registry' }, { status: 400 })
      const search = { query, ...(b.limit ? { limit: Number(b.limit) } : {}) }
      const plan = caller('discover')({ search }) as { requestList: { id: string; url: string }[] }
      const tenant = await mcpTenant(req, b.tenant ?? '')
      const fetched = await mcpRun(req, { url: plan.requestList[0]!.url, method: 'registry', ...(tenant ? { tenant } : {}) })
      const answers = fetched ? [{ id: plan.requestList[0]!.id, status: fetched.body.status, text: fetched.body.answer }] : []
      const id = await entryOnce(req, { kind: 'call', from: 'qpu-mcp-search', ...(tenant ? { tenant } : {}), body: { tool: 'discover', arguments: { search, answers } }, links: fetched ? [fetched.id] : [] }, { 'body.arguments.search.query': { equals: query } })
      return mcpAnswer(req, id, caller('discover')({ search, answers }))
}
const qpuMcpsEndpoints: Endpoint[] = [
  { path: '/qpu/mcp/search', method: 'get', handler: mcpSearch },
  { path: '/qpu/mcp/search', method: 'post', handler: mcpSearch },
  {
    path: '/qpu/mcp/install',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'a signed-in tenant admin installs' }, { status: 401 })
      const b = await mcpBody(req), name = (b.name ?? '').trim(), url = (b.url ?? '').trim()
      if (!name || !url.startsWith('https://')) return Response.json({ error: 'install takes name and an https url' }, { status: 400 })
      const tenant = await mcpTenant(req, b.tenant ?? '')
      if (!tenant) return Response.json({ error: 'no tenant answers this host' }, { status: 400 })
      const u = req.user as { roles?: string[]; tenants?: { tenant?: { id?: string } | string; roles?: string[] }[] }
      const admin = (u.roles ?? []).includes('admin') || (u.tenants ?? []).some((r) => String(typeof r.tenant === 'object' ? r.tenant?.id : r.tenant) === tenant && (r.roles ?? []).includes('tenant-admin'))
      if (!admin) return Response.json({ error: 'the super admin or a tenant-admin of this tenant installs' }, { status: 403 })
      const held = await mcpRows(req, tenant)
      const plan = caller('extend')({ install: { name, url, auth: b.auth === 'bearer' ? 'bearer' : 'none', held } }) as { row: McpRow; duplicate: boolean; then: { body: { method: string; params?: unknown } } }
      if (!plan.duplicate) await req.payload.update({ collection: 'tenants' as never, id: tenant, data: { mcps: [...held, plan.row] } as never, overrideAccess: true, context: { qpuMcps: true } })
      const read = await mcpRun(req, { url, method: plan.then.body.method, params: plan.then.body.params ?? {}, tenant })
      const id = await entryOnce(req, { kind: 'call', from: 'qpu-mcp-install', tenant, body: { tool: 'extend', arguments: { host: url, direction: 'in', tools: read?.body.answer ?? '[]' } }, links: read ? [read.id] : [] }, { 'body.arguments.host': { equals: url } })
      return mcpAnswer(req, id, { installed: !plan.duplicate, row: plan.row, rows: plan.duplicate ? held.length : held.length + 1, read: read ? { status: read.body.status } : null })
    },
  },
]
/** qpu-mcps: MCPs at will — the registry searched, a chosen server one tenant row, every foreign fetch one job; order 23 */
export const qpuMcps = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-mcps', order: 23, plugin: ({ config, options }) => (options?.enabled === false ? config : {
  ...config,
  collections: (config.collections ?? []).map((c) => (c.slug !== 'tenants' || c.fields.some((f) => 'name' in f && f.name === 'mcps') ? c : { ...c, fields: [...c.fields, mcpsField] })),
  endpoints: [...(config.endpoints ?? []).filter((e) => e.path !== '/qpu/mcp/search' && e.path !== '/qpu/mcp/install'), ...qpuMcpsEndpoints],
  jobs: withTask(config, mcpCallTask),
}) })
export const qpuHooks = definePlugin<{ enabled?: boolean }>({ slug: 'qpu-hooks', order: Number.MAX_SAFE_INTEGER, plugin: ({ config, options }) => (options?.enabled === false ? config : qpuHooksOf(config).config) })
/** The umbrella: the capabilities, the storage, the plugins the configs order and the tenant's own, each seeing the others in the plugins map */
export const qpuPlugin = (options: QpuPluginOptions = {}): Plugin => async (incoming: Config): Promise<Config> => {
  const inner = [qpuCore(options), qpuAgents({}), qpuMachine({}), ...qpuPlugins, qpuGoogle({}), qpuApis({}), qpuImagine({}), qpuMcps({}), ...(options.plugins ?? []), qpuRaid({}), qpuHooks({})]
  let config: Config = { ...incoming, plugins: [...(incoming.plugins ?? []), ...inner] }
  for (const plugin of inner) config = await plugin(config)
  // the inner plugins stay listed: Payload's buildConfig runs only the list it started with, so nothing runs twice, and a plugin that looks itself
  // up later by slug (plugin-mcp's getPluginConfig reads its sanitized options from config.plugins at every request) still finds itself
  return { ...config, plugins: [...(incoming.plugins ?? []), ...inner] }
}
