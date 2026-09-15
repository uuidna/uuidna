// mcp-effects — WHAT EACH TOOL'S RUN REACHES, read from the code it calls, never typed per tool.
//
// For every tool in src/mcp.ts's catalogue: the run expression, the imported functions it calls (its TARGETS), and
// the transitive closure of the functions those call, each resolved through its own module's imports (re-exports
// and `export *` followed; a dynamic `await import('./x.js')` in the run resolves against that module). Every body
// reached is scanned, comments and string literals removed, for four effects:
//   network — fetch( · fetchImpl( · ctx.fetch
//   writes  — writeFileSync / appendFileSync / mkdirSync / renameSync / copyFileSync / writeFile / appendFile · ctx.deposit
//   deletes — rmSync / unlinkSync / rmdirSync
//   spawns  — spawnSync / execSync / execFileSync / spawn / execFile
// Each effect carries the function whose body showed it, so a reading can be checked by opening one file. The scan is
// an over-reading by branch (a run that writes on one branch is a writer) and an under-reading through values it
// cannot follow (a function passed as an argument); gen-mcp-docs adds what the example call is SEEN to do.
// Node-only: it reads the source tree.
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import type { Effects } from '../mcp-names.js'

/** stripCode(s) → the source with comments removed and every string literal emptied, so neither can fire a pattern */
export const stripCode = (s: string): string => {
  let o = '', i = 0
  const n = s.length
  while (i < n) {
    const c = s[i]!, d = s[i + 1]
    if (c === '/' && d === '/') { while (i < n && s[i] !== '\n') i++; continue }
    if (c === '/' && d === '*') { i += 2; while (i < n && !(s[i] === '*' && s[i + 1] === '/')) i++; i += 2; continue }
    if (c === '\'' || c === '"' || c === '`') {
      const q = c; o += q; i++
      while (i < n && s[i] !== q) { if (s[i] === '\\') i++; i++ }
      o += q; i++; continue
    }
    o += c; i++
  }
  return o
}

/** THE FOUR PATTERNS — the calls that leave the process. A body matching one has that effect. */
export const EFFECT_PATTERNS: Readonly<Record<keyof Effects, RegExp>> = {
  network: /\bfetch\s*\(|\bfetchImpl\s*\(|ctx\??\.fetch\b/,
  writes: /\b(?:writeFileSync|appendFileSync|mkdirSync|renameSync|copyFileSync|writeFile|appendFile)\s*\(|ctx\??\.deposit\b/,
  deletes: /\b(?:rmSync|unlinkSync|rmdirSync)\s*\(/,
  spawns: /\b(?:spawnSync|execSync|execFileSync|spawn|execFile)\s*\(/,
}

interface Mod { t: string; imports: Map<string, [string, string]>; reexports: Map<string, [string, string]>; star: string[]; defs: Map<string, number> }
const bindings = (list: string, spec: string, into: Map<string, [string, string]>): void => {
  for (const s of list.split(',')) {
    const [a, b] = s.trim().replace(/^type\s+/, '').split(/\s+as\s+/)
    if (a) into.set((b ?? a).trim(), [spec, a.trim()])
  }
}
/** the calls in a body, generic type arguments allowed (fetchData<T>(…)); member calls read separately */
const callsIn = (body: string): string[] =>
  [...body.matchAll(/(?<![.\w$])([A-Za-z_$][\w$]*)\s*(?:<[^()<>;]*(?:<[^()<>;]*>[^()<>;]*)*>)?\s*\(/g)].map((m) => m[1]!)
const membersIn = (body: string): string[] => [...body.matchAll(/\.([A-Za-z_$][\w$]*)\s*(?:<[^()<>;]*>)?\s*\(/g)].map((m) => m[1]!)

/** bodyOf(t, at) → the declaration starting at `at`, to its closing brace or the end of its one-line expression */
const bodyOf = (t: string, at: number): string => {
  let depth = 0, started = false
  for (let j = at; j < t.length; j++) {
    const c = t[j]!
    if (c === '{' || c === '(' || c === '[') { depth++; started = true }
    else if (c === '}' || c === ')' || c === ']') {
      depth--
      if (started && depth === 0 && c === '}' && !/^\s*[.(]/.test(t.slice(j + 1, j + 4))) return t.slice(at, j + 1)
    } else if (c === '\n' && started && depth === 0) return t.slice(at, j)
  }
  return t.slice(at)
}

/** A reader over one source tree: resolves a name to its body through each module's own imports. */
export const effectReader = (srcRoot: string) => {
  const cache = new Map<string, Mod>()
  const mod = (f: string): Mod => {
    const hit = cache.get(f)
    if (hit) return hit
    const t = stripCode(existsSync(f) ? readFileSync(f, 'utf8') : '')
    const m: Mod = { t, imports: new Map(), reexports: new Map(), star: [], defs: new Map() }
    // specifiers survive stripCode as empty quotes, so imports are read from the raw text
    const raw = existsSync(f) ? readFileSync(f, 'utf8') : ''
    for (const x of raw.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*'(\.[^']+)'/g)) bindings(x[1]!, x[2]!, m.imports)
    for (const x of raw.matchAll(/export\s*\{([^}]*)\}\s*from\s*'(\.[^']+)'/g)) bindings(x[1]!, x[2]!, m.reexports)
    for (const x of raw.matchAll(/export\s*\*\s*from\s*'(\.[^']+)'/g)) m.star.push(x[1]!)
    for (const x of t.matchAll(/(?:^|\n)\s*(?:export\s+)?(?:async\s+)?(?:function\s*\*?\s*|const\s+|let\s+)([A-Za-z_$][\w$]*)/g))
      if (!m.defs.has(x[1]!)) m.defs.set(x[1]!, x.index!)
    cache.set(f, m)
    return m
  }
  const pathOf = (from: string, spec: string): string => {
    const p = resolve(dirname(from), spec).replace(/\.js$/, '.ts')
    return existsSync(p) ? p : p.replace(/\.ts$/, '/index.ts')
  }
  const find = (name: string, f: string, depth = 0): { f: string; at: number } | null => {
    if (depth > 12) return null
    const m = mod(f)
    const at = m.defs.get(name)
    if (at !== undefined) return { f, at }
    const im = m.imports.get(name) ?? m.reexports.get(name)
    if (im) return find(im[1], pathOf(f, im[0]), depth + 1)
    for (const s of m.star) { const r = find(name, pathOf(f, s), depth + 1); if (r) return r }
    return null
  }
  /** effectsOfRun(run, file) → the four effects and, for each, the function whose body showed it */
  const effectsOfRun = (run: string, file: string): { effects: Effects; why: Partial<Record<keyof Effects, string>>; targets: string[] } => {
    const body0 = stripCode(run)
    const why: Partial<Record<keyof Effects, string>> = {}
    for (const k of Object.keys(EFFECT_PATTERNS) as (keyof Effects)[]) if (EFFECT_PATTERNS[k].test(body0)) why[k] = 'run'
    const direct = callsIn(body0).filter((x) => find(x, file) && !mod(file).defs.has(x))
    const queue: [string, string][] = callsIn(body0).map((x) => [x, file])
    const dynamic = [...run.matchAll(/import\(\s*'(\.[^']+)'\s*\)/g)].map((m) => pathOf(file, m[1]!))
    const dynTargets: string[] = []
    for (const f of dynamic) for (const x of [...callsIn(body0), ...membersIn(body0)]) if (find(x, f)) { queue.push([x, f]); dynTargets.push(x) }
    const seen = new Set<string>()
    while (queue.length) {
      const [x, from] = queue.shift()!
      const key = from + '#' + x
      if (seen.has(key)) continue
      seen.add(key)
      const d = find(x, from)
      if (!d) continue
      const body = bodyOf(mod(d.f).t, d.at)
      for (const k of Object.keys(EFFECT_PATTERNS) as (keyof Effects)[])
        if (!why[k] && EFFECT_PATTERNS[k].test(body)) why[k] = `${x} (${d.f.slice(srcRoot.length + 1)})`
      for (const c of callsIn(body)) queue.push([c, d.f])
    }
    const effects: Effects = { network: !!why.network, writes: !!why.writes, deletes: !!why.deletes, spawns: !!why.spawns }
    return { effects, why, targets: [...new Set([...direct, ...dynTargets])] }
  }
  return { mod, find, effectsOfRun }
}

/** toolRunsOf(srcRoot) → every tool literal in src/mcp.ts's catalogue with its run expression, in catalogue order */
export const toolRunsOf = (srcRoot: string): { old: string; run: string }[] => {
  const src = readFileSync(join(srcRoot, 'mcp.ts'), 'utf8')
  const start = src.indexOf('const TOOLS: Tool[] = ([')
  const end = src.indexOf('] as Tool[]).map(sealToolWire)')
  if (start < 0 || end < start) throw new Error('mcp-effects: the TOOLS literal in src/mcp.ts moved — nothing was read')
  const region = src.slice(start, end)
  const heads = [...region.matchAll(/\{ name: '(uuidna_[a-z0-9_]+)'/g)]
  return heads.map((h, i) => {
    const block = region.slice(h.index!, heads[i + 1]?.index ?? region.length)
    const r = block.indexOf('run:')
    return { old: h[1]!, run: r < 0 ? '' : block.slice(r) }
  })
}
