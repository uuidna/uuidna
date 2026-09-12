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
  /** single source files this module reads by literal path ('src/x.ts'): a dependency on THAT file only */
  readsFiles: string[]
  /** walks the source tree by a bare directory literal ('src', 'src/tests'): depends on every compiled source */
  readsSourceTree: boolean
  /** imports by a computed specifier: can load any COMPILED module, and so depends on those - never on data */
  importsUnknown: boolean
  /** derived, kept for the plan's `why`: reads the source tree or imports by a computed specifier */
  readsEverything: boolean
  test: boolean
}

export type TestGraph = { modules: Map<string, GraphModule>; importers: Map<string, Set<string>> }

const SKIP = /^dist\/(seeds|chunks|handles)\//
const IMPORT_RE = /(?:^|[^\w$])(?:import|export)\s*(?:[\w${},*\s]+from\s*)?['"](\.{1,2}\/[^'"]+)['"]/g
const DYNAMIC_LITERAL_RE = /import\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g
const DYNAMIC_OPEN_RE = /import\(\s*(?!['"])/
const FS_READ_RE = /\b(?:readFileSync|readdirSync|readFile|readdir|statSync|existsSync|createReadStream|opendirSync)\b/
/** a quoted literal that IS a source path: 'src' or 'src/...' at the start of the string, nothing before it */
const SRC_LITERAL_RE = /['"](src(?:\/[^'"\s]*)?)['"]/g
/** a quoted literal that IS a data path: 'lean', 'lean/', 'lean/x.json', 'src/handles', 'src/handles/ab/index.json' */
const DATA_LITERAL_RE = /['"]((?:lean|src\/handles)(?:\/[^'"\s]*)?)['"]/g
const d0 = (dir: string): string => dir.slice(0, -1)
/** does the LINE holding a literal read the filesystem? A literal in a table of paths is data; one handed to a read is a
 *  dependency. Measured: api.ts lists 26 drain outputs by path and reads none of them on those lines. */
const readsOnLine = (text: string, at: number): boolean => {
  const from = text.lastIndexOf('\n', at) + 1
  const to = text.indexOf('\n', at)
  return FS_READ_RE.test(text.slice(from, to < 0 ? text.length : to))
}
/** join(root, 'src', 'handles') - the handles data dir named one segment at a time */
const JOIN_SRC_HANDLES_RE = /['"]src['"]\s*,\s*['"]handles['"]/
/** comments are prose; a path or an import( inside one is not a dependency. Strings are left intact. */
export const stripComments = (text: string): string =>
  text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/[^\n]*/g, '$1')

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
  // THE GRAPH READS CODE, NOT PROSE (2026-09-12). Measured: of the 12 modules that reached 100+ tests as
  // "reads everything", 5 were flagged by a `src/` in a HEADER COMMENT and api.js by an `import(` in a doc comment;
  // of the rest, census read ONE named file, rosetta printed `src/` in a MESSAGE, predict-and-fill held it in a
  // data record, and handle-store-census walked join(root,'src','handles') - the handles dir - unrecognised. One
  // lexical rule turned prose and single files into "the whole tree", and a stale receipt into 372 of 402 files.
  const text = stripComments(readFileSync(join(root, file), 'utf8'))
  const imports = new Set<string>()
  for (const m of text.matchAll(IMPORT_RE)) imports.add(resolveImport(file, m[1]!))
  for (const m of text.matchAll(DYNAMIC_LITERAL_RE)) imports.add(resolveImport(file, m[1]!))
  const readsFs = FS_READ_RE.test(text)
  // A DATA LITERAL WITH AN EXTENSION NAMES ONE FILE ('lean/heartbeats.json'): a dependency on that file. Only a
  // bare directory literal ('lean/', 'lean', join(root,'src','handles')) depends on the whole directory. Measured
  // before this line: one moved derived json reached 272 of 402 files, because every module naming any lean file
  // was a dependency on all of lean/.
  const reads = new Set<string>()
  const dataFiles = new Set<string>()
  if (readsFs) {
    for (const m of text.matchAll(DATA_LITERAL_RE)) {
      const lit = m[1]!
      if (/\.[a-z]+$/i.test(lit) && !readsOnLine(text, m.index ?? 0)) continue   // a path in a table, not a read
      const dir = DATA_DIRS.find((d) => lit === d || lit === d.slice(0, -1) || lit.startsWith(d))!
      if (lit === d0(dir) || lit === dir || !/\.[a-z]+$/i.test(lit)) reads.add(dir); else dataFiles.add(lit)
    }
  }
  // join(root, 'src', 'handles') names the handles dir one segment at a time
  const joinsHandles = readsFs && JOIN_SRC_HANDLES_RE.test(text)
  if (joinsHandles) reads.add('src/handles/')
  const readsFiles = new Set<string>()
  let readsSourceTree = false
  if (readsFs) {
    for (const m of text.matchAll(SRC_LITERAL_RE)) {
      const lit = m[1]!
      if (/\.[a-z]+$/i.test(lit) && !readsOnLine(text, m.index ?? 0)) continue   // a path in a table, not a read
      if (lit === 'src' && joinsHandles) continue   // the 'src' segment of join(root,'src','handles') is the handles dir
      if (lit.startsWith('src/handles')) continue    // owned by DATA_LITERAL_RE above
      if (/^src\/(seeds|chunks)(\/|$)/.test(lit)) continue   // EXCLUDED data (gate-receipt-index EXCLUDED): tsc never compiles it, no walk of sources observes it
      if (lit === 'src' || lit === 'src/' || !/\.[a-z]+$/i.test(lit)) { if (!DATA_DIRS.some((d) => `${lit}/`.startsWith(d))) readsSourceTree = true }
      else readsFiles.add(lit)
    }
  }
  const importsUnknown = DYNAMIC_OPEN_RE.test(text)
  const readsEverything = importsUnknown || readsSourceTree
  return { file, imports: [...imports], reads: [...reads], readsFiles: [...readsFiles, ...dataFiles], readsSourceTree, importsUnknown, readsEverything, test: file.endsWith('.test.js') }
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
  const movedSet = new Set(moved)
  let sourceMoved = false   // a COMPILED source moved (distOf resolves): the only thing a source-tree walk can observe
  const unreached: string[] = []
  for (const f of moved) {
    const dist = distOf(f)
    if (dist && graph.modules.has(dist)) { seeds.add(dist); sourceMoved = true; continue }
    if (dist) { sourceMoved = true; unreached.push(f); continue }
    const dir = DATA_DIRS.find((d) => f.startsWith(d))
    if (dir) { dataMoved.add(dir); continue }
    // an unreached src/ path that tsc never compiles (seeds, json, .d.ts) is data no walk of sources observes
    unreached.push(f)
  }
  // readers: a moved data dir, a moved named file, a source-tree walk when a source moved, a computed import when a module moved
  for (const m of graph.modules.values()) {
    if (m.reads.some((d) => dataMoved.has(d))) seeds.add(m.file)
    if (m.readsFiles.some((f) => movedSet.has(f))) seeds.add(m.file)
    if (m.readsSourceTree && sourceMoved) seeds.add(m.file)
  }
  // A COMPUTED IMPORT IS AN INVISIBLE DEPENDENCY: it may load any module, including one just seeded, so it runs
  // whenever anything at all was seeded — and not otherwise. Prose, a message, excluded data: no seed, no run.
  if (seeds.size > 0 || sourceMoved) for (const m of graph.modules.values()) if (m.importsUnknown) seeds.add(m.file)
  const reached = reverseClosure(graph, seeds)
  const files = [...reached].filter((f) => graph.modules.get(f)?.test).sort()
  const everything = [...graph.modules.values()].filter((m) => (m.readsSourceTree && sourceMoved) || (m.importsUnknown && (seeds.size > 0 || sourceMoved))).length
  const why = `${files.length} test file(s) reach ${seeds.size} moved or reading module(s)` +
    (dataMoved.size ? `; data moved under ${[...dataMoved].join(' ')}` : '') +
    (everything ? `; ${everything} module(s) read the whole tree` : '') +
    (unreached.length ? `; ${unreached.length} moved path(s) no test imports or reads` : '')
  return { mode: 'delta', files, unreached, why }
}
