// ship-preflight — what `npm run ship` would refuse, asked at guard time instead of after a landing.
//
// Four questions, each a pure function over data it is handed, and each with a host reader beside it:
//   assets  every file the ship serves is under Cloudflare's per-asset limit
//   links   every markdown link to /theorem/<key> or /publications/<slug> has a page, or the edge serves it
//   pages   the page count the SSG renders, beside the pin's recorded measurement — REPORTED, since no sealed
//           per-page budget exists to gate against
//   edge    no module reachable from worker.js imports a Node builtin at module scope (Cloudflare refuses the upload)
// copy-lean-to-site imports this module for LEAN_JSON_SERVE, so it loads the ledger and the page counter too (about
// three seconds measured, after an SSG that takes minutes); the harmonic scan refuses promise-returning code in the
// core, so every import here is static.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { builtinModules } from 'node:module'
import { spawnSync } from 'node:child_process'
import { ROOT } from './boundary.js'
import { CATALOGUE_FILE } from './quantum/os/catalogue/index.js'
import type { Gap } from './scripts/api.js'
import { theorems, isPagelessFile } from './theorems/index.js'
import { publications } from './publish.js'
import { edgeServes } from './edge-served.js'
import { objectPageCount } from './compose-object.js'

// ── assets ───────────────────────────────────────────────────────────────────────────────────────────────────────

/** Cloudflare Workers static assets: an individual asset file may be at most 25 MiB.
 *  https://developers.cloudflare.com/workers/platform/limits/ (Static Assets — "Individual Asset size") */
export const CLOUDFLARE_ASSET_BYTES = 25 * 1024 * 1024

/** lean/*.json the site serves at /lean/<name> — copy-lean-to-site copies exactly these */
export const LEAN_JSON_SERVE = ['unlocks.json'] as const

export interface Sized { readonly path: string; readonly size: number }

/** oversizedAssets(rows, limit) → one gap per served file over the limit. Pure. */
export function oversizedAssets(rows: readonly Sized[], limit: number = CLOUDFLARE_ASSET_BYTES): Gap[] {
  return rows.filter((r) => r.size > limit).map((r) => ({
    what: `${r.path} is ${r.size} bytes, over Cloudflare's ${limit}-byte per-asset limit — wrangler refuses the upload at ship time`,
    fix: `shard or shrink what writes ${r.path} (a paged feed, a split index), or stop serving it as a static asset and read it from qpu storage`,
  }))
}

/** servedFiles(root) → every file the ship uploads from sources: docs/public/** and what copy-lean-to-site copies.
 *  A required source that is absent is named in `missing`: copy-lean-to-site refuses the build without it. */
export function servedFiles(root: string = ROOT): { rows: Sized[]; missing: string[] } {
  const rows: Sized[] = [], missing: string[] = []
  const add = (rel: string, required: boolean): void => {
    const p = join(root, rel)
    if (!existsSync(p)) { if (required) missing.push(rel); return }
    rows.push({ path: rel, size: statSync(p).size })
  }
  const walk = (rel: string): void => {
    for (const e of readdirSync(join(root, rel), { withFileTypes: true })) {
      const r = `${rel}/${e.name}`
      if (e.isDirectory()) walk(r)
      else add(r, false)
    }
  }
  if (existsSync(join(root, 'docs/public'))) walk('docs/public')
  for (const f of readdirSync(join(root, 'lean'))) if (f.endsWith('.lean')) add(`lean/${f}`, false)
  for (const f of LEAN_JSON_SERVE) add(`lean/${f}`, true)
  const seeds = join(root, 'src/seeds')
  if (existsSync(seeds)) {
    for (const d of readdirSync(seeds, { withFileTypes: true })) if (d.isDirectory()) add(`src/seeds/${d.name}/page.json`, false)
    add('src/seeds/payload-sync.json', false)
  }
  add('llm.txt', true)
  add(CATALOGUE_FILE, true)
  return { rows, missing }
}

export function shipAssetGaps(root: string = ROOT): Gap[] {
  const { rows, missing } = servedFiles(root)
  return [
    ...missing.map((m) => ({ what: `${m} is absent, and copy-lean-to-site refuses to ship the page that points at it`, fix: `regenerate ${m} before docs:build` })),
    ...oversizedAssets(rows),
  ]
}

// ── links ────────────────────────────────────────────────────────────────────────────────────────────────────────

/** markdownLinks(md) → every /theorem/… and /publications/… markdown link target, fenced and inline code excluded. Pure. */
export function markdownLinks(md: string): string[] {
  const prose = md
    .replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '')
    .replace(/`[^`\n]*`/g, '')
  return [...prose.matchAll(/\]\(\s*<?(\/(?:theorem|publications)\/[^)\s>]+)/g)].map((m) => m[1]!)
}

/** what resolves a link: a page the SSG builds, a publication slug, a static page, or a route the edge serves */
export interface LinkWorld {
  readonly paged: (key: string) => boolean
  readonly slugs: ReadonlySet<string>
  readonly staticPage: (route: string) => boolean
  readonly edge: (link: string) => boolean
}

const routeOf = (link: string): string => link.replace(/[?#].*$/, '').replace(/\.html$/, '').replace(/\/$/, '')

/** deadShipLinks(files, world) → one gap per unresolved link, naming how many places carry it and the first. Pure. */
export function deadShipLinks(files: readonly { path: string; text: string }[], world: LinkWorld): Gap[] {
  const dead = new Map<string, { first: string; n: number }>()
  for (const f of files) {
    for (const link of markdownLinks(f.text)) {
      const route = routeOf(link)
      const [, kind, id] = /^\/(theorem|publications)\/(.+)$/.exec(route) ?? []
      const live = !!id && (
        (kind === 'theorem' ? world.paged(id) : world.slugs.has(id)) || world.staticPage(route) || world.edge(link))
      if (live) continue
      const d = dead.get(route)
      if (d) d.n += 1
      else dead.set(route, { first: f.path, n: 1 })
    }
  }
  return [...dead].map(([route, d]) => ({
    what: `${route} — linked ${d.n} time(s), first in ${d.first}: no page is built for it, no publication has that slug, and the edge does not serve it, so the SSG's dead-link check refuses the ship`,
    fix: `correct the link to a key or slug the ledger holds, or remove it; a pageless key the Worker renders resolves through edgeServes (src/edge-served.ts)`,
  }))
}

/** docs/**\/*.md as the SSG sees it — .vitepress and dynamic-route templates excluded */
export function docsMarkdown(root: string = ROOT): { path: string; text: string }[] {
  const out: { path: string; text: string }[] = []
  const walk = (rel: string): void => {
    for (const e of readdirSync(join(root, rel), { withFileTypes: true })) {
      const r = `${rel}/${e.name}`
      if (e.isDirectory()) { if (e.name !== '.vitepress' && e.name !== 'node_modules' && !e.name.includes('[')) walk(r); continue }
      if (e.name.endsWith('.md') && !e.name.includes('[')) out.push({ path: r, text: readFileSync(join(root, r), 'utf8') })
    }
  }
  walk('docs')
  return out
}

export function shipLinkGaps(root: string = ROOT): Gap[] {
  const fileOf = new Map(theorems().map((t) => [t.key, t.file]))
  const world: LinkWorld = {
    paged: (key) => { const f = fileOf.get(key); return f !== undefined && !isPagelessFile(f) },
    slugs: new Set(publications().map((p) => p.slug)),
    staticPage: (route) => existsSync(join(root, 'docs', `${route}.md`)) || existsSync(join(root, 'docs', route, 'index.md')),
    edge: edgeServes,
  }
  return deadShipLinks(docsMarkdown(root), world)
}

// ── pages (reported) ─────────────────────────────────────────────────────────────────────────────────────────────

/** the render measurement recorded beside the heap pin */
export const PIN_MEASUREMENT_FILE = 'src/quantum/os/harness/quantum-advantage-theme.test.ts'
export interface PinMeasurement { died: number; object: number; statics: number; cap: number; fit: number; movedTo: number }

/** pinMeasurementOf(text) → the recorded died/fit counts and caps, or null when the text records none. Pure. */
export function pinMeasurementOf(text: string): PinMeasurement | null {
  const flat = text.replace(/\n\s*\/\/\s*/g, ' ')
  const m = /([\d,]+) pages \(([\d,]+) object \+ ([\d,]+) static\) died rendering at the (\d+) cap — past the ([\d,]+) measured to fit — so the pin moved to (\d+)/.exec(flat)
  if (!m) return null
  const n = (s: string): number => Number(s.replace(/,/g, ''))
  return { died: n(m[1]!), object: n(m[2]!), statics: n(m[3]!), cap: n(m[4]!), fit: n(m[5]!), movedTo: n(m[6]!) }
}

/** pageReportOf(live, recorded) → one line: what the SSG will render beside what was measured. Pure. */
export function pageReportOf(live: { object: number; statics: number; pin: number | null }, rec: PinMeasurement | null): string {
  const total = live.object + live.statics
  const here = `the SSG will render ${total} pages (${live.object} object + ${live.statics} static) at the ${live.pin ?? 'UNPINNED'} MB heap pin`
  if (!rec) return `${here}; the pin's measurement is UNMEASURED — ${PIN_MEASUREMENT_FILE} records no died/fit reading`
  const vs = total - rec.died
  return `${here}; recorded: ${rec.fit} fit and ${rec.died} died at the ${rec.cap} cap, pin moved to ${rec.movedTo} — `
    + `${vs < 0 ? -vs : vs} ${vs < 0 ? 'fewer' : 'more'} than the count that died. Reported, not gated: no sealed per-page budget exists`
}

/** the static .md pages the SSG renders (dynamic-route templates excluded) */
export const staticPageCount = (root: string = ROOT): number => docsMarkdown(root).length

export function shipPageReport(root: string = ROOT): string {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
  const pin = /--max-old-space-size=(\d+)[^&]*vitepress/.exec(pkg.scripts?.['docs:build'] ?? '')
  let recorded: PinMeasurement | null = null
  try { recorded = pinMeasurementOf(readFileSync(join(root, PIN_MEASUREMENT_FILE), 'utf8')) } catch { recorded = null }
  return pageReportOf({ object: objectPageCount().total, statics: staticPageCount(root), pin: pin ? Number(pin[1]) : null }, recorded)
}

// ── edge ─────────────────────────────────────────────────────────────────────────────────────────────────────────

/** moduleImports(text) → the specifiers of every static import / export-from at line start; `import type` is erased. Pure. */
export function moduleImports(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(/^\s*import\s+(['"])([^'"]+)\1/gm)) out.push(m[2]!)
  for (const m of text.matchAll(/^\s*import\s+(?!type\s)(?:[\w$]+\s*,?\s*)?(?:\*\s*as\s+[\w$]+|\{[^}]*\})?\s*from\s+(['"])([^'"]+)\1/gm)) out.push(m[2]!)
  for (const m of text.matchAll(/^\s*export\s+(?!type\s)(?:\*(?:\s+as\s+[\w$]+)?|\{[^}]*\})\s*from\s+(['"])([^'"]+)\1/gm)) out.push(m[2]!)
  return out
}

export interface EdgeWalk {
  /** reachable modules importing a builtin at module scope */
  readonly hits: readonly { module: string; spec: string }[]
  /** relative imports that resolve to no file */
  readonly unresolved: readonly { module: string; spec: string }[]
  /** bare package specifiers, not walked */
  readonly external: readonly string[]
  /** every module the walk read, entry included */
  readonly modules: readonly string[]
  readonly reached: number
}

/** edgeImports(entry, read, resolveSpec, isBuiltin) → the static import graph from entry, walked. Pure over its readers. */
export function edgeImports(
  entry: string,
  read: (module: string) => string | null,
  resolveSpec: (from: string, spec: string) => string | null,
  isBuiltin: (spec: string) => boolean,
): EdgeWalk {
  const seen = new Set<string>(), hits: { module: string; spec: string }[] = [], unresolved: { module: string; spec: string }[] = []
  const external = new Set<string>()
  const queue = [entry]
  while (queue.length) {
    const mod = queue.pop()!
    if (seen.has(mod)) continue
    const text = read(mod)
    if (text === null) continue
    seen.add(mod)
    for (const spec of moduleImports(text)) {
      if (isBuiltin(spec)) { hits.push({ module: mod, spec }); continue }
      const next = resolveSpec(mod, spec)
      if (next === null) { if (spec.startsWith('.') || spec.startsWith('#')) unresolved.push({ module: mod, spec }); else external.add(spec); continue }
      queue.push(next)
    }
  }
  return { hits, unresolved, external: [...external].sort(), modules: [...seen].sort(), reached: seen.size }
}

const isNodeBuiltin = (spec: string): boolean => spec.startsWith('node:') || builtinModules.includes(spec)

/** the worker's graph as wrangler bundles it: worker.js → dist/*.js, `#…` through package.json imports (workerd) */
export function workerEdgeWalk(root: string = ROOT): EdgeWalk {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { imports?: Record<string, string | Record<string, string>> }
  const read = (p: string): string | null => { try { return readFileSync(p, 'utf8') } catch { return null } }
  const resolveSpec = (from: string, spec: string): string | null => {
    if (spec.startsWith('#')) {
      const t = pkg.imports?.[spec]
      const target = typeof t === 'string' ? t : t?.workerd ?? t?.default
      return target ? resolve(root, target) : null
    }
    if (!spec.startsWith('.')) return null
    const p = resolve(dirname(from), spec)
    return existsSync(p) ? p : null
  }
  return edgeImports(join(root, 'worker.js'), read, resolveSpec, isNodeBuiltin)
}

/** an unresolved import git ignores is generated at ship (handles.js by gen-handles) — named, not walked */
const gitIgnored = (root: string, rel: string): boolean =>
  spawnSync('git', ['check-ignore', '-q', rel], { cwd: root }).status === 0

export function shipEdgeGaps(root: string = ROOT): Gap[] {
  if (!existsSync(join(root, 'dist'))) return [{ what: 'dist/ is not built, so the worker graph is UNMEASURED — the finder reads what wrangler bundles', fix: 'npm run build, then run the guard again' }]
  const w = workerEdgeWalk(root)
  const rel = (p: string): string => p.startsWith(root) ? p.slice(root.length + 1) : p
  const gaps: Gap[] = w.hits.map((h) => ({
    what: `${rel(h.module)} imports ${h.spec} at module scope and worker.js reaches it — Cloudflare refuses a Node builtin without nodejs_compat`,
    fix: `split ${rel(h.module)} into a pure part and a host part that reads through src/boundary.ts (hostFs / nodeBuiltin), answering Unmeasured at the edge`,
  }))
  for (const u of w.unresolved) {
    const target = rel(resolve(dirname(u.module), u.spec))
    if (gitIgnored(root, target)) continue
    gaps.push({ what: `${rel(u.module)} imports ${u.spec}, which resolves to no file (${target}) — the bundle fails, and the graph past it is UNMEASURED`, fix: `restore ${target} or correct the import` })
  }
  return gaps
}
