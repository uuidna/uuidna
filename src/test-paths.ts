// test-paths — where tests live: index.test.ts beside index.ts, or {module}.test.ts beside {module}.ts.
// NO STATIC `node:` IMPORT. This module rides the worker through gate-receipt-index, and Cloudflare rejects
// node: in any uploaded module — at UPLOAD, which is why --dry-run bundled it without complaint while the deploy
// never appeared. The reach is asked of boundary, the one declared place, rather than re-shimmed here.
import { ROOT, nodeBuiltin } from './boundary.js'

type Stat = { isDirectory(): boolean }
type FsModule = { existsSync: (p: string) => boolean; readdirSync: (p: string) => string[]; statSync: (p: string) => Stat; readFileSync: (p: string, enc: 'utf8') => string }
type PathModule = { join: (...p: string[]) => string; dirname: (p: string) => string; relative: (a: string, b: string) => string }
const fsm = (): FsModule => {
  const fs = nodeBuiltin<FsModule>('node:fs')
  if (!fs) throw new Error('test-paths: walking the test tree reads the disk — Node only, and this is not Node')
  return fs
}
const pathm = (): PathModule => {
  const p = nodeBuiltin<PathModule>('node:path')
  if (!p) throw new Error('test-paths: resolving a test path needs node:path — Node only, and this is not Node')
  return p
}
const existsSync = (p: string): boolean => fsm().existsSync(p)
const readdirSync = (p: string): string[] => fsm().readdirSync(p)
const statSync = (p: string): Stat => fsm().statSync(p)
const join = (...p: string[]): string => pathm().join(...p)
const dirname = (p: string): string => pathm().dirname(p)
const relative = (a: string, b: string): string => pathm().relative(a, b)

export const LEGACY_TEST_DIR = 'src/tests'

export function isTestSource(rel: string): boolean {
  if (!rel.startsWith('src/') || !rel.endsWith('.ts')) return false
  if (rel.startsWith(`${LEGACY_TEST_DIR}/`) && rel.endsWith('.test.ts')) return true
  if (rel.endsWith('.test.ts')) return true
  return rel === 'src/test-api.ts'
}

export function testDistForSource(srcPath: string): string | null {
  if (!isTestSource(srcPath)) return null
  return `dist/${srcPath.replace(/^src\//, '').replace(/\.ts$/, '')}.js`
}

function walkTestSources(dir: string, root: string = ROOT): string[] {
  const abs = join(root, dir)
  if (!existsSync(abs)) return []
  const out: string[] = []
  for (const n of readdirSync(abs)) {
    const rel = `${dir}/${n}`
    const p = join(root, rel)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (n === 'node_modules') continue
      out.push(...walkTestSources(rel, root))
    } else if (isTestSource(rel)) out.push(rel)
  }
  return out
}

export function listTestSources(root: string = ROOT): string[] {
  return walkTestSources('src', root).sort()
}

export function testDistForModule(srcPath: string): string | null {
  if (!srcPath.startsWith('src/') || isTestSource(srcPath)) return null
  if (srcPath.endsWith('/index.ts')) {
    const co = `${srcPath.slice(0, -'/index.ts'.length)}/index.test.ts`
    if (existsSync(join(ROOT, co))) return testDistForSource(co)
  }
  const sibling = srcPath.replace(/\.ts$/, '.test.ts')
  if (existsSync(join(ROOT, sibling))) return testDistForSource(sibling)
  return null
}

export function deltaTestFiles(changed: readonly string[]): string[] {
  const tests = new Set<string>()
  for (const f of changed) {
    const direct = testDistForSource(f)
    if (direct) tests.add(direct)
    const mod = testDistForModule(f)
    if (mod) tests.add(mod)
  }
  return [...tests].filter((t) => existsSync(join(ROOT, t))).sort()
}

export function testRunGlobs(): string[] {
  return ["dist/**/*.test.js"]
}

export function rewriteTestImports(content: string, fromRel: string, toRel: string): string {
  const fix = (imp: string): string => {
    const abs = join(dirname(fromRel), imp).replace(/\\/g, '/')
    let rel = relative(dirname(toRel), abs).replace(/\\/g, '/')
    if (!rel.startsWith('.')) rel = './' + rel
    return rel
  }
  return content
    .replace(/from ['"](\.[^'"]+)['"]/g, (_m, imp: string) => `from '${fix(imp)}'`)
    .replace(/import\(['"](\.[^'"]+)['"]\)/g, (_m, imp: string) => `import('${fix(imp)}')`)
}

export function allTestFiles(root: string = ROOT): string[] {
  return listTestSources(root)
}

// ── DEPENDENT-AWARE DELTA — fast AND safe, because the fast one alone was not ────────────────────────────────
// deltaTestFiles maps a changed file to ITS OWN colocated test and stops. Measured against a real regression
// from 2026-08-31: a change to quantum/os/catalogue/index.ts selects catalogue/index.test.js and MISSES
// quantum/os/harness/os-catalogue.test.js — which is the test that actually caught it (cataloguePrimed read
// LOADED !== null, so a fully primed browser reported itself crippled). A delta that cannot see dependents is
// not a faster full suite, it is a different and weaker check wearing the same name.
//
// This walks the reverse import graph: every module that transitively imports a changed file is itself changed
// for testing purposes, and its colocated test comes too. The graph is built from the source text once.
const IMPORT_RE = /(?:from|import)\s*\(?\s*['"](\.[^'"]+)['"]\)?/g

/** sourceGraph() → { importer → [imported] } over src, as repo-relative .ts paths. */
export function sourceGraph(root: string = ROOT): Map<string, string[]> {
  const files = walkAllSources('src', root)
  const g = new Map<string, string[]>()
  for (const rel of files) {
    const body = fsm().readFileSync(join(root, rel), 'utf8')
    const out: string[] = []
    for (const m of body.matchAll(IMPORT_RE)) {
      const spec = m[1]!.replace(/\.js$/, '.ts')
      const abs = pathm().join(pathm().dirname(rel), spec).replace(/\\/g, '/')
      for (const cand of [abs, abs.replace(/\.ts$/, '/index.ts')]) {
        if (files.includes(cand)) { out.push(cand); break }
      }
    }
    g.set(rel, out)
  }
  return g
}

function walkAllSources(dir: string, root: string, out: string[] = []): string[] {
  const abs = join(root, dir)
  if (!existsSync(abs)) return out
  for (const n of readdirSync(abs)) {
    const rel = `${dir}/${n}`
    if (n === 'node_modules') continue
    if (statSync(join(root, rel)).isDirectory()) walkAllSources(rel, root, out)
    else if (rel.endsWith('.ts')) out.push(rel)
  }
  return out
}

/** dependentTestFiles(changed) → the delta tests PLUS the tests of every module that transitively imports a
 *  changed file. Bounded by the graph; a cycle cannot loop it because `seen` only ever grows. */
export function dependentTestFiles(changed: readonly string[], root: string = ROOT): string[] {
  const g = sourceGraph(root)
  // A SELECTOR THAT ANSWERS "NOTHING" FOR INPUT IT COULD NOT READ IS THE DEFECT IT EXISTS TO PREVENT. Called
  // with a mangled path — `ocs/...` for `docs/...`, off by the width of a git-status prefix — this returned an
  // empty set, which reads exactly like "your change needs no tests" and would wave anything through. The whole
  // point of this file is that a fast check must not be a weaker one wearing the same name, so an unresolvable
  // path is REFUSED by name rather than silently contributing nothing.
  const unknown = changed.filter((c) => c.endsWith('.ts') && !g.has(c))
  if (unknown.length) {
    throw new Error(`test-paths: ${unknown.length} path(s) are not in the source graph and cannot be resolved to tests — ${unknown.slice(0, 3).join(', ')}. Refusing rather than selecting nothing, which would read as "no tests needed".`)
  }
  const reverse = new Map<string, string[]>()
  for (const [importer, imported] of g) for (const dep of imported) {
    const list = reverse.get(dep) ?? []; list.push(importer); reverse.set(dep, list)
  }
  const seen = new Set<string>(changed.filter((c) => c.endsWith('.ts')))
  const queue = [...seen]
  while (queue.length) {
    const cur = queue.pop()!
    for (const importer of reverse.get(cur) ?? []) {
      if (!seen.has(importer)) { seen.add(importer); queue.push(importer) }
    }
  }
  const tests = new Set<string>(deltaTestFiles(changed))
  for (const rel of seen) {
    const direct = testDistForSource(rel); if (direct) tests.add(direct)
    const mod = testDistForModule(rel); if (mod) tests.add(mod)
  }
  return [...tests].filter((t) => existsSync(join(ROOT, t))).sort()
}
