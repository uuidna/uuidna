// mcp-bypass — THE BYPASS IS REFUSED AT THE HOOK, WITH THE DOOR IN ITS PLACE. The captain, 2026-09-15: "make sure it is
// easier not to bypass" (after "only mcp use is allowed", "let mcp handle all"). Sessions computed with ad-hoc
// `node -e` / `node --input-type=module -e` scripts importing dist/…, so the door never saw the work. The PreToolUse
// hook (court-hooks.ts) reads each Bash command through this module:
//
//   · an ad-hoc evaluation — node -e/-p/--eval/--print (any --input-type), tsx -e (also via npx), code piped or
//     here-doc'd into node's stdin, or a script file kept OUTSIDE the repository's own trees — whose code imports or
//     requires anything under this repository's dist/ or src/ (a worktree's too, and the @uuidna/* packages from
//     inside the repository) is REFUSED, and the refusal carries the exact `npm run mcp -- <tool> '<json>'` lines
//     that replace it, found by asking the door's search with the words of what the code imported and called;
//   · everything else runs untouched: npm run …, npm test, node dist/scripts/<name>.js …, node --test …, and any
//     node -e that imports nothing from this repository;
//   · the ONE escape states what the door is missing: UUIDNA_MCP_GAP="<what is missing>" in front of the command. It
//     runs, and the gap is recorded as a door request in dist/evidence/mcp-gaps.jsonl — never a silent bypass.
//
// Pure but for the gap's one append: the command is read by a small shell tokenizer (quotes, $'…', here-docs,
// pipes, cd), never executed; the door's search and the file reader are injected.
import { appendFileSync, mkdirSync } from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'

// ── the shell, read ──────────────────────────────────────────────────────────────────────────────────────────────
export interface Tok { w: string; kind: 'word' | 'op' | 'redir' | 'dup' | 'heredoc' }
const OPS = ['&&', '||', ';;', ';', '|&', '|', '&', '(', ')'] as const

/** tokenize(cmd) → the command's words, operators, redirections and here-doc bodies, quotes resolved */
export function tokenize(cmd: string): Tok[] {
  const out: Tok[] = []
  const pending: { delim: string; strip: boolean; tok: Tok }[] = []
  let cur = ''
  let has = false
  const flush = (): void => { if (has) out.push({ w: cur, kind: 'word' }); cur = ''; has = false }
  const readHeredocs = (from: number): number => {
    let i = from
    for (const p of pending) {
      const body: string[] = []
      while (i < cmd.length) {
        const nl = cmd.indexOf('\n', i)
        const line = cmd.slice(i, nl < 0 ? cmd.length : nl)
        i = nl < 0 ? cmd.length : nl + 1
        if ((p.strip ? line.replace(/^\t+/, '') : line) === p.delim) break
        body.push(line)
      }
      p.tok.w = body.join('\n')
    }
    pending.length = 0
    return i
  }
  let i = 0
  while (i < cmd.length) {
    const c = cmd[i]!
    if (c === '\\') { if (cmd[i + 1] !== '\n') { cur += cmd[i + 1] ?? ''; has = true } i += 2; continue }
    if (c === "'") { const end = cmd.indexOf("'", i + 1); const e = end < 0 ? cmd.length : end; cur += cmd.slice(i + 1, e); has = true; i = e + 1; continue }
    if (c === '$' && cmd[i + 1] === "'") {
      let j = i + 2
      const ESC: Record<string, string> = { n: '\n', t: '\t', '\\': '\\', "'": "'", '"': '"' }
      while (j < cmd.length && cmd[j] !== "'") { if (cmd[j] === '\\') { cur += ESC[cmd[j + 1] ?? ''] ?? cmd[j + 1] ?? ''; j += 2 } else { cur += cmd[j]; j++ } }
      has = true; i = j + 1; continue
    }
    if (c === '"') {
      let j = i + 1
      while (j < cmd.length && cmd[j] !== '"') {
        if (cmd[j] === '\\' && '"\\$`\n'.includes(cmd[j + 1] ?? '')) { if (cmd[j + 1] !== '\n') cur += cmd[j + 1]; j += 2; continue }
        cur += cmd[j]; j++
      }
      has = true; i = j + 1; continue
    }
    if (c === '$' && cmd[i + 1] === '(') {
      let depth = 0, j = i + 1
      for (; j < cmd.length; j++) { if (cmd[j] === '(') depth++; else if (cmd[j] === ')' && --depth === 0) break }
      cur += cmd.slice(i, j + 1); has = true; i = j + 1; continue
    }
    if (c === '`') { const end = cmd.indexOf('`', i + 1); const e = end < 0 ? cmd.length : end; cur += cmd.slice(i, e + 1); has = true; i = e + 1; continue }
    if (c === ' ' || c === '\t') { flush(); i++; continue }
    if (c === '#' && !has) { const nl = cmd.indexOf('\n', i); i = nl < 0 ? cmd.length : nl; continue }
    if (c === '\n') { flush(); out.push({ w: '\n', kind: 'op' }); i = pending.length ? readHeredocs(i + 1) : i + 1; continue }
    if (c === '<' && cmd[i + 1] === '<' && cmd[i + 2] === '<') { flush(); out.push({ w: '<<<', kind: 'redir' }); i += 3; continue }
    if (c === '<' && cmd[i + 1] === '<') {
      flush()
      let j = i + 2
      const strip = cmd[j] === '-'
      if (strip) j++
      while (cmd[j] === ' ' || cmd[j] === '\t') j++
      let delim = ''
      while (j < cmd.length && !' \t\n;&|<>()'.includes(cmd[j]!)) { if (cmd[j] !== "'" && cmd[j] !== '"' && cmd[j] !== '\\') delim += cmd[j]; j++ }
      const tok: Tok = { w: '', kind: 'heredoc' }
      out.push(tok); pending.push({ delim, strip, tok }); i = j; continue
    }
    if (c === '>' || c === '<' || (c === '&' && cmd[i + 1] === '>')) {
      if (has && /^\d+$/.test(cur)) { cur = ''; has = false } else flush()
      let j = i + 1
      let op = c
      if (cmd[j] === '>' || cmd[j] === '|' || (c === '&' && cmd[j] === '>')) { op += cmd[j]; j++ }
      if (cmd[j] === '&') { j++; while (j < cmd.length && /[\d-]/.test(cmd[j]!)) j++; out.push({ w: op + '&', kind: 'dup' }); i = j; continue }
      out.push({ w: op, kind: 'redir' }); i = j; continue
    }
    const op = OPS.find((o) => cmd.startsWith(o, i))
    if (op) { flush(); out.push({ w: op, kind: 'op' }); i += op.length; continue }
    cur += c; has = true; i++
  }
  flush()
  if (pending.length) readHeredocs(cmd.length)
  return out
}

/** one place a command hands code to node: the code (with any --import/--require preloads) and the directory it
 *  resolves against, or the script file node runs */
export interface Site { form: string; code: string; file: string | null; cwd: string }

const WRAPPERS = new Set(['time', 'nice', 'nohup', 'command', 'exec', 'sudo', 'env'])
const RUNNERS = new Set(['node', 'nodejs', 'tsx', 'ts-node', 'bun'])
const LAUNCHERS = new Set(['npx', 'bunx', 'pnpx'])
const EVAL = /^(?:-e|-p|-pe|-ep|--eval|--print)$/
const VALUE_FLAGS = new Set(['-r', '--require', '--import', '--loader', '--experimental-loader', '-C', '--conditions', '--input-type', '--env-file', '--title'])
const PRELOAD = new Set(['-r', '--require', '--import', '--loader', '--experimental-loader'])

/** sitesOf(command, cwd) → every place the command evaluates code in node, with the directory each resolves against
 *  (a `cd` earlier in the command moves it) */
export function sitesOf(command: string, cwd0: string): Site[] {
  const toks = tokenize(command)
  const cmds: { words: string[]; stdin: string | null; pipedFrom: string[] | null }[] = []
  let words: string[] = [], stdin: string | null = null, prev: string[] | null = null, piped = false
  const end = (op: string): void => { cmds.push({ words, stdin, pipedFrom: piped ? prev : null }); prev = words; piped = op === '|' || op === '|&'; words = []; stdin = null }
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k]!
    if (t.kind === 'op') end(t.w)
    else if (t.kind === 'heredoc') stdin = t.w
    else if (t.kind === 'redir') { const target = toks[k + 1]; if (target?.kind === 'word') { if (t.w === '<<<') stdin = target.w; k++ } }
    else if (t.kind === 'word') words.push(t.w)
  }
  end(';')
  let cwd = cwd0
  const sites: Site[] = []
  for (const c of cmds) {
    const w = c.words
    let i = 0
    while (i < w.length && (/^[A-Za-z_][A-Za-z0-9_]*=/.test(w[i]!) || WRAPPERS.has(w[i]!) || (i > 0 && WRAPPERS.has(w[i - 1]!) && w[i]!.startsWith('-')))) i++
    const head = w[i]
    if (head === undefined) continue
    if (head === 'cd' || head === 'pushd') { const d = w[i + 1]; if (d && !d.startsWith('-') && !d.startsWith('~') && !d.includes('$')) cwd = resolve(cwd, d); continue }
    let j = i
    let runner = basename(head)
    if (LAUNCHERS.has(runner)) {
      j++
      while (j < w.length && w[j]!.startsWith('-')) j += w[j] === '-p' || w[j] === '--package' ? 2 : 1
      runner = basename(w[j] ?? '')
    }
    if (!RUNNERS.has(runner)) continue
    j++
    let code: string | null = null, flag = '', inputType = ''
    const pre: string[] = []
    while (j < w.length) {
      const a = w[j]!
      if (a === '--') { j++; break }
      if (!a.startsWith('-') || a === '-') break
      if (EVAL.test(a)) { flag = a; code = w[j + 1] ?? ''; j += 2; break }
      const eq = /^(--eval|--print)=([\s\S]*)$/.exec(a)
      if (eq) { flag = eq[1]!; code = eq[2]!; j++; break }
      if (a.startsWith('--input-type')) inputType = a.includes('=') ? a : `${a}=${w[j + 1] ?? ''}`
      if (VALUE_FLAGS.has(a)) { if (PRELOAD.has(a) && w[j + 1]) pre.push(w[j + 1]!); j += 2; continue }
      const pe = /^(--require|--import|--loader|--experimental-loader)=(.+)$/.exec(a)
      if (pe) pre.push(pe[2]!)
      j++
    }
    const preload = pre.map((s) => `import ${JSON.stringify(s)}`)
    const tag = (...xs: string[]): string => [runner, inputType, ...xs].filter(Boolean).join(' ')
    if (code !== null) { sites.push({ form: tag(flag), code: [...preload, code].join('\n'), file: null, cwd }); continue }
    const target = w[j]
    const from = c.pipedFrom
    const fed = c.stdin ?? (from && /^(echo|printf)$/.test(basename(from[0] ?? '')) ? from.slice(1).filter((x) => !/^-[neE]+$/.test(x)).join(' ') : null)
    if ((target === undefined || target === '-') && fed !== null) { sites.push({ form: tag('(stdin)'), code: [...preload, fed].join('\n'), file: null, cwd }); continue }
    if (target !== undefined && target !== '-') sites.push({ form: tag(target), code: preload.join('\n'), file: resolve(cwd, target), cwd })
  }
  return sites
}

// ── what the code reaches ────────────────────────────────────────────────────────────────────────────────────────
/** within(p, root) → whether p is root or lies under it */
export const within = (p: string, root: string): boolean => { const r = relative(root, p); return !r.startsWith('..') && !isAbsolute(r) }
/** a path inside the repository's compiled or source tree (the repository's own, or a worktree's) */
const TREE = /(^|\/)(dist|src)\//
/** the repository's own trees: a script file under one of them is its declared tooling, run untouched */
const TOOLING = /(^|\/)(dist|src|scripts|hooks|tools|packages|node_modules)\//

/** isLocalSpec(spec, cwd, root) → whether an import specifier reaches this repository's dist/ or src/ */
export function isLocalSpec(spec: string, cwd: string, root: string): boolean {
  if (/^@uuidna\//.test(spec)) return within(cwd, root)
  const path = spec.startsWith('file://') ? decodeURIComponent(spec.slice('file://'.length)) : spec
  if (!(isAbsolute(path) || path.startsWith('.') || /^(dist|src)\//.test(path))) return false
  const abs = resolve(cwd, path)
  const rel = relative(root, abs)
  return within(abs, root) && TREE.test(rel) && !rel.includes('node_modules')
}

const LIT = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g
const CALL = /\b(?:import|require(?:\.resolve)?)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g
/** specsOf(code, cwd) → the specifiers the code imports or requires: static imports, and the literal pieces of every
 *  import()/require() argument joined (a template's `${…}` prefix and a `process.cwd() + '…'` prefix read as cwd) */
export function specsOf(code: string, cwd: string): string[] {
  const specs: string[] = []
  for (const m of code.matchAll(/\b(?:import|export)\s+(?:type\s+)?(?:[\w*${}\s,]+?\s+from\s*)?(['"])([^'"\n]+)\1/g)) specs.push(m[2]!)
  for (const m of code.matchAll(CALL)) {
    const inner = m[1]!
    const lits = [...inner.matchAll(LIT)].map((l) => l[2]!)
    if (!lits.length) continue
    let spec = lits.join('').replace(/\$\{[^}]*\}/g, (_s: string, at: number) => (at === 0 ? cwd : ''))
    if (/^[^'"`]*\+\s*['"`]/.test(inner) && spec.startsWith('/')) spec = cwd + spec
    specs.push(spec)
  }
  return specs
}

/** identifiersOf(code, specs) → what the code takes from the repository: named imports, destructured names, members
 *  called on an imported binding, the imported modules' own names — and any tool it names outright */
export function identifiersOf(code: string, specs: readonly string[]): { ids: string[]; tools: string[] } {
  const ids: string[] = []
  const add = (s: string): void => { const n = (s.trim().split(/\s+as\s+|\s*:\s*|\s*=\s*/)[0] ?? '').trim(); if (/^[A-Za-z_$][\w$]*$/.test(n) && n !== 'default' && n !== 'type') ids.push(n) }
  const bindings: string[] = []
  for (const m of code.matchAll(/\bimport\s+(?:type\s+)?([^'"]*?)\s+from\s*['"]/g)) {
    const clause = m[1]!
    const ns = /\*\s*as\s+([\w$]+)/.exec(clause)
    if (ns) bindings.push(ns[1]!)
    const braces = /\{([^}]*)\}/.exec(clause)
    if (braces) braces[1]!.split(',').forEach(add)
    const def = /^\s*([\w$]+)\s*(?:,|$)/.exec(clause)
    if (def) bindings.push(def[1]!)
  }
  for (const m of code.matchAll(/\{([^}]*)\}\s*=\s*(?:await\s+)?(?:import|require)\s*\(/g)) m[1]!.split(',').forEach(add)
  for (const m of code.matchAll(/\b(?:const|let|var)\s+([\w$]+)\s*=\s*(?:await\s+)?(?:import|require)\s*\(/g)) bindings.push(m[1]!)
  for (const m of code.matchAll(/\.then\(\s*\(?\s*([\w$]+)\s*\)?\s*=>/g)) bindings.push(m[1]!)
  for (const m of code.matchAll(/\.then\(\s*\(\s*\{([^}]*)\}\s*\)\s*=>/g)) m[1]!.split(',').forEach(add)
  for (const m of code.matchAll(/\b(?:import|require)\s*\([^()]*(?:\([^()]*\)[^()]*)*\)\s*\)?\s*\.\s*([\w$]+)/g)) if (m[1] !== 'then' && m[1] !== 'href') add(m[1]!)
  for (const b of new Set(bindings)) {
    for (const m of code.matchAll(new RegExp(`(?<![\\w$.])${b.replace(/\$/g, '\\$')}\\s*\\.\\s*([\\w$]+)`, 'g'))) if (m[1] !== 'default') add(m[1]!)
  }
  for (const s of specs) { const b = basename(s).replace(/\.(m?js|ts)$/, ''); if (b && b !== 'index') ids.push(b) }
  const tools = [...new Set([...code.matchAll(/['"`](uuidna_[a-z0-9_]+)['"`]/g)].map((m) => m[1]!))]
  return { ids: [...new Set(ids)], tools }
}

const STOP = new Set(['the', 'and', 'for', 'from', 'with', 'get', 'set', 'has', 'make', 'new', 'run', 'all', 'dist', 'src', 'mjs',
  'index', 'default', 'then', 'await', 'import', 'require', 'main', 'call', 'tool', 'tools', 'uuidna', 'compute', 'mcp', 'log',
  'console', 'json', 'stringify', 'parse', 'value', 'result', 'out'])
/** wordsOf(ids) → the words to ask the door's search: camelCase and snake_case split, lower-cased, a plural's s
 *  dropped, and the words every call shares (of, to, get, dist, mcp …) left out */
export function wordsOf(ids: readonly string[]): string[] {
  const out: string[] = []
  for (const id of ids) {
    for (const raw of id.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').split(/[^A-Za-z0-9]+/)) {
      let w = raw.toLowerCase()
      if (w.length < 3 || STOP.has(w)) continue
      if (w.length > 4 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1)
      out.push(w)
    }
  }
  return [...new Set(out)]
}

/** one refused evaluation: its form, the repository modules it reaches, and what it takes from them */
export interface Bypass { form: string; imports: string[]; ids: string[]; words: string[]; tools: string[] }

/** bypassesOf(command, cwd, root, readFile) → every evaluation in the command that reaches this repository's dist/ or
 *  src/. A script file inside the repository's own trees is its declared tooling and is not read. */
export function bypassesOf(command: string, cwd: string, root: string, readFile: (p: string) => string | null = () => null): Bypass[] {
  const found: Bypass[] = []
  for (const s of sitesOf(command, cwd)) {
    const chunks: { code: string; base: string }[] = [{ code: s.code, base: s.cwd }]
    if (s.file) {
      if (within(s.file, root) && TOOLING.test(relative(root, s.file))) continue
      const text = readFile(s.file)
      if (text !== null) chunks.push({ code: text, base: dirname(s.file) })
    }
    const imports: string[] = [], codes: string[] = [], specs: string[] = []
    for (const ch of chunks) {
      const local = specsOf(ch.code, ch.base).filter((sp) => isLocalSpec(sp, ch.base, root))
      if (!local.length) continue
      codes.push(ch.code)
      specs.push(...local)
      imports.push(...local.map((sp) => (sp.startsWith('@uuidna/') ? sp : relative(root, resolve(ch.base, sp.replace(/^file:\/\//, ''))))))
    }
    if (!imports.length) continue
    const { ids, tools } = identifiersOf(codes.join('\n'), specs)
    found.push({ form: s.form, imports: [...new Set(imports)], ids, words: wordsOf(ids), tools })
  }
  return found
}

// ── the one escape: a gap, stated and recorded ───────────────────────────────────────────────────────────────────
export const GAP_FILE = join('dist', 'evidence', 'mcp-gaps.jsonl')
export const GAP_VAR = 'UUIDNA_MCP_GAP'
const PLACEHOLDER = '<what is missing>'

/** gapOf(command) → the missing capability the command states in UUIDNA_MCP_GAP=…, or null (absent, empty, or the
 *  placeholder copied unfilled) */
/** readsOf(command, root, scripts) → the derived artefacts a command reads OUTSIDE the tree's declared entry points.
 *
 *  THE JUDGE WATCHED A SYNTAX, SO THE LAW HELD FOR ONE SHAPE AND NOTHING ELSE. It refused an ad-hoc `node -e`
 *  importing this repository and let everything else past — its own header said so — while a session computed the
 *  ledger all day with python heredocs, grep -c over generated.ts, `lean` on copied wings and `node --test`, none of
 *  which the door ever saw. "Only mcp use is allowed" was enforced against one way of writing a command rather than
 *  against touching the ledger (measured 2026-09-18: two recorded gaps against dozens of unwatched computations).
 *
 *  NOTHING HERE IS A LIST. The protected set is DRAIN_PATHS, which the drain already declares as every derived
 *  output — read, never copied. The permitted callers are the scripts package.json declares and the dispatch under
 *  dist/scripts, which the runner already exposes. A hand-kept set of "ad-hoc readers" would be the allow list the
 *  captain's law forbids, and it would go stale the first time someone reached for a tool nobody listed.
 *
 *  AND THE REFUSAL CANNOT STRAND A PATH, which is not assumed here but already held elsewhere: drain-owners.test
 *  proves every DRAIN_PATH has a declared writer (it exists because lead b13fd37a found three generators unwired
 *  while their outputs sat on the list). So for every path this refuses ad-hoc access to, a declared generator
 *  demonstrably exists to produce it — the door the refusal names is never a door that isn't there. A second copy
 *  of that check here would be the duplicate this repository keeps finding drifted. */
export function readsOf(command: string, protectedPaths: readonly string[], scripts: readonly string[]): Bypass[] {
  const declared = new RegExp(`(?:^|[\\s;&|(])(?:npm|npx|pnpm|yarn)\\s+(?:run\\s+)?(?:${scripts.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\w:-])`)
  if (declared.test(command)) return []                       // a declared entry point IS the computation path
  if (/(?:^|[\s;&|(])node\s+(?:--\S+\s+)*dist\/scripts\//.test(command)) return []   // the runner's own dispatch
  const named = protectedPaths.filter((p) => command.includes(p))
  if (!named.length) return []
  const form = (/(?:^|[\s;&|(])([\w.\/-]+)/.exec(command.trim())?.[1] ?? 'command').split('/').pop()!
  const words = [...new Set(named.flatMap((p) => p.split(/[\/.\-_]/).filter((w) => w.length > 3)))]
  return [{ form, imports: named, ids: [], words, tools: [] }]
}

export function gapOf(command: string): string | null {
  const m = /(?:^|[\s;&|(])(?:export\s+)?UUIDNA_MCP_GAP=(?:"((?:\\.|[^"\\])*)"|'([^']*)'|([^\s;&|]+))/.exec(command)
  if (!m) return null
  const g = (m[1] ?? m[2] ?? m[3] ?? '').trim()
  return g && g !== PLACEHOLDER ? g : null
}

export interface GapRecord { address: string; gap: string; form: string; imports: string[]; identifiers: string[]; session?: string }
/** recordGap(root, r) → appends the door request to dist/evidence/mcp-gaps.jsonl and returns the file's path */
export function recordGap(root: string, r: GapRecord): string {
  const path = join(root, GAP_FILE)
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(path, JSON.stringify(r) + '\n')
  return path
}

// ── the verdict ──────────────────────────────────────────────────────────────────────────────────────────────────
export interface Suggestion { name: string; command: string }
const brief = (cmd: string): string => { const one = cmd.replace(/\s+/g, ' ').trim(); return one.length > 72 ? one.slice(0, 72) + '…' : one }

/** refusalOf(b, suggestions, searched, command) → the refusal the hook prints: what was refused, the exact door calls
 *  that replace it, and the one escape */
export function refusalOf(b: Bypass, suggestions: readonly Suggestion[], searched: string, command: string): string {
  const head = `Refused: ad-hoc computation over this repository — \`${b.form}\` reaches ${b.imports.join(', ')}` +
    `${b.ids.length ? ` (${b.ids.slice(0, 6).join(', ')})` : ''}. The laws: "only mcp use is allowed", "let mcp handle all".`
  const escape = `  ${GAP_VAR}="${PLACEHOLDER}" ${brief(command)}`
  if (suggestions.length) {
    return [head,
      'Compute it through the door instead — the hosted uuidna.com/mcp, which reaches qpu (append --local to run the same callTool in-process):',
      ...suggestions.map((s) => `  ${s.command}`),
      `Find another by word: npm run mcp -- list ${b.words[0] ?? '<word>'}`,
      `If no tool computes this, the door is missing it. The only allowed escape states the gap; the command then runs and the gap is recorded as a door request in ${GAP_FILE}:`,
      escape].join('\n')
  }
  return [head,
    `No tool in the door matches ${b.words.length ? b.words.join(', ') : 'what it imports'}${searched ? ` (${searched})` : ''}: that is a gap in the door, not a licence to bypass it.`,
    `The only allowed escape states what is missing; the command then runs and the gap is recorded as a door request in ${GAP_FILE}:`,
    escape,
    'Search the door first: npm run mcp -- list <word>'].join('\n')
}

export type Verdict = { kind: 'allow' } | { kind: 'gap'; record: GapRecord } | { kind: 'refuse'; reason: string }
export interface JudgeInput {
  command: string; cwd: string; root: string
  readFile?: (p: string) => string | null
  address: (s: string) => string
  /** every derived output the drain declares — read from DRAIN_PATHS, never listed here */
  protectedPaths?: readonly string[]
  /** the entry points package.json declares; a command running one of them is the computation path itself */
  scripts?: readonly string[]
  suggest: (words: readonly string[], tools: readonly string[]) => Promise<{ via: string; suggestions: readonly Suggestion[] }>
}

/** judge(o) → allow the command, record its stated gap and allow it, or refuse it with the door calls that replace it */
export async function judge(o: JudgeInput): Promise<Verdict> {
  const found = [...bypassesOf(o.command, o.cwd, o.root, o.readFile), ...readsOf(o.command, o.protectedPaths ?? [], o.scripts ?? [])]
  if (!found.length) return { kind: 'allow' }
  const all = <K extends 'imports' | 'ids' | 'words' | 'tools'>(k: K): string[] => [...new Set(found.flatMap((b) => b[k]))]
  const b: Bypass = { form: [...new Set(found.map((f) => f.form))].join('`, `'), imports: all('imports'), ids: all('ids'), words: all('words'), tools: all('tools') }
  const gap = gapOf(o.command)
  if (gap) return { kind: 'gap', record: { address: o.address(o.command), gap, form: b.form, imports: b.imports, identifiers: b.ids } }
  let asked: { via: string; suggestions: readonly Suggestion[] } = { via: '', suggestions: [] }
  try { asked = await o.suggest(b.words, b.tools) } catch (e) { asked = { via: `the door's search could not be asked: ${e instanceof Error ? e.message : String(e)}`, suggestions: [] } }
  return { kind: 'refuse', reason: refusalOf(b, asked.suggestions, asked.via, o.command) }
}
