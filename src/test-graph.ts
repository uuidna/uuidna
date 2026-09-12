// test-graph — WHICH TESTS READ WHAT MOVED (verify_beats_recompute_by_magnitudes, applied to the suite itself).
//
// THE MEASURED CASE (2026-09-11). A receipt 49 commits stale named 66,170 moved files, and the planner's only answer
// to a moved non-test source was "full suite": 3,289 tests in one process, two hours of CPU on a shared host, and
// the captain's verdict — "cure is not quantum and cannot cure like this". Of those 66,170 moves, 66,115 were
// src/handles, a generated data wing that tsc never compiles and exactly one test reads; the rest were 36 sources,
// 18 tests, and one lean json. The suite that needed re-proving was a fraction of the suite that ran.
//
// SO THE PLANNER ASKS THE GRAPH. Two kinds of dependency, both read from the built tree, never typed:
//   IMPORTS — every compiled module's relative import, export-from, and literal dynamic import, reversed, so a moved
//             source reaches every test that transitively imports it.
//   READS   — a module that calls a filesystem read and names a covered data directory (lean/, src/handles/, or the
//             source tree itself) depends on every file under it; a module that reads the repository root without
//             naming a directory depends on everything, and so does a dynamic import whose specifier is not a
//             literal. Conservative by construction: a dependency the graph cannot see is a full suite, not a skip.
// A moved file that no test imports or reads changes nothing a test can observe; it is listed as unreached so the
// plan's `why` says so, and the guard — a separate arm — still reads it.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { ROOT } from './scripts/api.js'

/** Covered data directories a module may name; a read of one is a dependency on every file under it. */
export const DATA_DIRS = ['lean/', 'src/handles/'] as const

export type GraphModule = {
  /** dist-relative path, e.g. dist/address.js */
  file: string
  imports: string[]
  /** data dirs this module reads by name */
  reads: string[]
  /** reads the repository root or the source tree without naming a data dir, or imports by a non-literal specifier */
  readsEverything: boolean
  test: boolean
}

export type TestGraph = { modules: Map<string, GraphModule>; importers: Map<string, Set<string>> }

const SKIP = /^dist\/(seeds|chunks|handles)\//
const IMPORT_RE = /(?:^|[^\w$])(?:import|export)\s*(?:[\w${},*\s]+from\s*)?['"](\.{1,2}\/[^'"]+)['"]/g
const DYNAMIC_LITERAL_RE = /import\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g
const DYNAMIC_OPEN_RE = /import\(\s*(?!['"])/
const FS_READ_RE = /\b(?:readFileSync|readdirSync|readFile|readdir|statSync|existsSync|createReadStream|opendirSync)\b/

const walkDist = (root: string, dir: string): string[] => {
  const abs = join(root, dir)
  if (!existsSync(abs)) return []
  const out: string[] = []
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (SKIP.test(`${rel}/`) || SKIP.test(rel)) continue
    if (e.isDirectory()) out.push(...walkDist(root, rel))
    else if (e.name.endsWith('.js')) out.push(rel)
  }
  return out
}

const resolveImport = (from: string, spec: string): string => {
  const abs = resolve('/', dirname(from), spec)
  return abs.replace(/^\//, '')
}

export const moduleOf = (root: string, file: string): GraphModule => {
  const text = readFileSync(join(root, file), 'utf8')
  const imports = new Set<string>()
  for (const m of text.matchAll(IMPORT_RE)) imports.add(resolveImport(file, m[1]!))
  for (const m of text.matchAll(DYNAMIC_LITERAL_RE)) imports.add(resolveImport(file, m[1]!))
  const readsFs = FS_READ_RE.test(text)
  const reads = readsFs ? DATA_DIRS.filter((d) => text.includes(d) || text.includes(`'${d.slice(0, -1)}'`) || text.includes(`"${d.slice(0, -1)}"`)) : []
  const namesSource = readsFs && (text.includes("'src'") || text.includes('"src"') || text.includes("'src/") || text.includes('src/'))
  // reads everything: a non-literal import, or a filesystem read that names the source tree itself. A module that
  // reads the disk for its own fixtures or the repo's manifests names no covered directory and depends on none.
  const readsEverything = DYNAMIC_OPEN_RE.test(text) || namesSource
  return { file, imports: [...imports], reads: [...reads], readsEverything, test: file.endsWith('.test.js') }
}

/** Build the graph over dist/. Pure over disk. */
export const testGraphOf = (root: string = ROOT): TestGraph => {
  const modules = new Map<string, GraphModule>()
  for (const f of walkDist(root, 'dist')) modules.set(f, moduleOf(root, f))
  const importers = new Map<string, Set<string>>()
  for (const m of modules.values()) {
    for (const dep of m.imports) {
      const set = importers.get(dep) ?? new Set<string>()
      set.add(m.file)
      importers.set(dep, set)
    }
  }
  return { modules, importers }
}

/** src path → dist module path, or null when tsc does not compile it (data, .d.ts, non-ts). */
export const distOf = (srcPath: string): string | null => {
  if (!srcPath.startsWith('src/') || !srcPath.endsWith('.ts') || srcPath.endsWith('.d.ts')) return null
  if (srcPath.startsWith('src/handles/') || srcPath.startsWith('src/seeds/') || srcPath.startsWith('src/chunks/')) return null
  return `dist/${srcPath.slice('src/'.length, -'.ts'.length)}.js`
}

/** Every test that transitively imports any of the given modules. */
const reverseClosure = (graph: TestGraph, seeds: Iterable<string>): Set<string> => {
  const seen = new Set<string>()
  const queue = [...seeds]
  while (queue.length) {
    const cur = queue.pop()!
    if (seen.has(cur)) continue
    seen.add(cur)
    for (const up of graph.importers.get(cur) ?? []) if (!seen.has(up)) queue.push(up)
  }
  return seen
}

export type GraphPlan =
  | { mode: 'full'; why: string }
  | { mode: 'delta'; files: string[]; unreached: string[]; why: string }

/** graphPlanOf(moved) → the tests that import or read what moved; full when a dependency is invisible. */
export const graphPlanOf = (moved: readonly string[], graph: TestGraph = testGraphOf()): GraphPlan => {
  const seeds = new Set<string>()
  const dataMoved = new Set<string>()
  let sourceMoved = false
  const unreached: string[] = []
  for (const f of moved) {
    const dist = distOf(f)
    if (dist && graph.modules.has(dist)) { seeds.add(dist); sourceMoved = true; continue }
    const dir = DATA_DIRS.find((d) => f.startsWith(d))
    if (dir) { dataMoved.add(dir); continue }
    if (f.startsWith('src/')) { sourceMoved = true; unreached.push(f); continue }
    unreached.push(f)
  }
  // readers: modules that read a moved data dir, or read everything
  for (const m of graph.modules.values()) {
    if (m.reads.some((d) => dataMoved.has(d))) seeds.add(m.file)
    if (m.readsEverything && (sourceMoved || dataMoved.size > 0)) seeds.add(m.file)
  }
  const reached = reverseClosure(graph, seeds)
  const files = [...reached].filter((f) => graph.modules.get(f)?.test).sort()
  const everything = [...graph.modules.values()].filter((m) => m.readsEverything && (sourceMoved || dataMoved.size > 0)).length
  const why = `${files.length} test file(s) reach ${seeds.size} moved or reading module(s)` +
    (dataMoved.size ? `; data moved under ${[...dataMoved].join(' ')}` : '') +
    (everything ? `; ${everything} module(s) read the whole tree` : '') +
    (unreached.length ? `; ${unreached.length} moved path(s) no test imports or reads` : '')
  return { mode: 'delta', files, unreached, why }
}
