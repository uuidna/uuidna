// boundary — THE LIBRARY'S NAMED SINGULARITY for what it cannot prove: filesystem reach. The recomputable core
// never touches the disk; the few modules that must (the axiom witness reading lean/axioms.json, the security
// audit reading package.json) import THIS one declared place instead of each re-declaring the ROOT resolution.
// One boundary, visible in review, exempted by name in `one-receipt dry` — everything else in the library is pure.
// (File reads are deterministic given the tree — the harmonic scan ruled no boundary marker is needed here.)
// BROWSER-SAFE BY EVALUATION: no static `node:` imports — the builtins resolve through process.getBuiltinModule,
// which simply does not exist in a browser, so importing this module never throws there (the VitePress dev server
// bundles the whole graph untreeshaken); only CALLING rdRoot outside Node refuses, by name, with the reason.

type Dirent = { name: string; isDirectory(): boolean }
type FsModule = {
  readFileSync: (p: string, enc: 'utf8') => string
  readdirSync: (p: string, opts: { withFileTypes: true }) => Dirent[]
  existsSync: (p: string) => boolean
  writeFileSync: (p: string, data: string) => void
  mkdirSync: (p: string, opts: { recursive: true }) => void
}
type PathModule = { join: (...p: string[]) => string; dirname: (p: string) => string }
type UrlModule = { fileURLToPath: (u: string) => string }

const getBuiltin: (<T>(name: string) => T | undefined) | undefined =
  typeof process !== 'undefined' && typeof (process as { getBuiltinModule?: unknown }).getBuiltinModule === 'function'
    ? (name) => (process as unknown as { getBuiltinModule: (n: string) => unknown }).getBuiltinModule(name) as never
    : undefined

const fs = getBuiltin?.<FsModule>('node:fs')
const path = getBuiltin?.<PathModule>('node:path')
const url = getBuiltin?.<UrlModule>('node:url')

/** nodeBuiltin(name) → a Node builtin, or undefined where there is none (the edge, a browser). THE ONE PLACE
 *  this reach is declared. Cloudflare rejects a static `node:` import in ANY uploaded module (error 10021), and
 *  it rejects at UPLOAD — so `wrangler deploy --dry-run` bundles such a module happily, reports success, and the
 *  deploy simply never appears. Three modules that ride the worker had one each; rather than three copies of the
 *  same shim drifting apart, they ask here. A caller that cannot proceed without the builtin refuses BY NAME
 *  instead of throwing a resolution error nobody can read. */
export const nodeBuiltin = <T,>(name: string): T | undefined => getBuiltin?.<T>(name)

/** the repo root (dist/boundary.js → one level up); '' in a browser, where no path exists to resolve */
export const ROOT = fs && path && url ? path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..') : ''
/** read a repo-relative file as utf8 — the boundary's first verb; Node-only, refuses elsewhere by name */
export const rdRoot = (p: string): string => {
  if (!fs || !path) throw new Error('boundary: filesystem reach is Node-only — a browser bundle must never call rdRoot')
  return fs.readFileSync(path.join(ROOT, p), 'utf8')
}
/** list a repo-relative directory's entries — the boundary's second verb, same refusal-by-name outside Node.
 *  Lets a caller DISCOVER what pages exist (site.ts's static-page walk) instead of a hand-typed list drifting
 *  from the real tree the moment a page is added or removed without updating a copy elsewhere. */
export const lsRoot = (p: string): Dirent[] => {
  if (!fs || !path) throw new Error('boundary: filesystem reach is Node-only — a browser bundle must never call lsRoot')
  return fs.readdirSync(path.join(ROOT, p), { withFileTypes: true })
}
/** does a repo-relative path exist — Node-only, same refusal-by-name outside Node. */
export const existsRoot = (p: string): boolean => {
  if (!fs || !path) throw new Error('boundary: filesystem reach is Node-only — a browser bundle must never call existsRoot')
  return fs.existsSync(path.join(ROOT, p))
}
/** write a repo-relative utf8 file — Node-only, same refusal-by-name outside Node. */
export const wrRoot = (p: string, data: string): void => {
  if (!fs || !path) throw new Error('boundary: filesystem reach is Node-only — a browser bundle must never call wrRoot')
  fs.writeFileSync(path.join(ROOT, p), data)
}
/** mkdir -p a repo-relative directory — Node-only, same refusal-by-name outside Node. */
export const mkdirRoot = (p: string): void => {
  if (!fs || !path) throw new Error('boundary: filesystem reach is Node-only — a browser bundle must never call mkdirRoot')
  fs.mkdirSync(path.join(ROOT, p), { recursive: true })
}
