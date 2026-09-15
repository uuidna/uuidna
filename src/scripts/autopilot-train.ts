// autopilot-train — EVERY DECISION THE TRAIN MAKES, PURE, so each stage's pass or stop is testable without a build, a
// forge or a network. autopilot.ts is the boundary that spawns and fetches; it asks these functions what the answers
// mean and never decides anything itself.
//
// The train (the owner, 2026-09-15: "autonomy means building the mechanism, not remembering to continue"): the same
// sequence was hand-driven dozens of times in one session — build, heal to a fixed point, land, ship, ask the forge,
// ask the live door — and every hand-run was a person remembering the order. The order is written here once.
import { toUuid, canonicalJson } from '../address.js'
import { namedLines } from './develop-cures.js'

export interface Gap { what: string; fix: string }

/** the train, in the only order it runs — each stage reads what the one before it made */
export const STAGES = ['build', 'fixed-point', 'land', 'ship', 'live', 'receipt'] as const
export type Stage = (typeof STAGES)[number]

/** stagesToRun(argv) → the stages this run takes, always in train order. `--stage X` runs X alone (the build gate as
 *  develop's cure); `--from X` resumes at X; `--until X` stops after X — and a run that is not a single stage always
 *  ends with its receipt. A name that is not a stage THROWS: a typo must not become a silently shorter train. */
export function stagesToRun(argv: readonly string[]): Stage[] {
  const valueOf = (flag: string): string | null => { const i = argv.indexOf(flag); return i < 0 ? null : (argv[i + 1] ?? '') }
  const check = (s: string | null): Stage | null => {
    if (s === null) return null
    if (!(STAGES as readonly string[]).includes(s)) throw new Error(`autopilot: no stage "${s}" — the train is ${STAGES.join(' → ')}`)
    return s as Stage
  }
  const only = check(valueOf('--stage'))
  if (only) return [only]
  const from = STAGES.indexOf(check(valueOf('--from')) ?? STAGES[0])
  const until = STAGES.indexOf(check(valueOf('--until')) ?? STAGES[STAGES.length - 1])
  if (from > until) throw new Error(`autopilot: --from ${STAGES[from]} comes after --until ${STAGES[until]}`)
  const run = STAGES.slice(from, until + 1)
  return run.includes('receipt') ? [...run] : [...run, 'receipt']
}

// ── A · THE BUILD GATE ──────────────────────────────────────────────────────────────────────────────────────────────

/** typeErrorFiles(out) → every file tsc refused, as tsc names it (`src/x.ts(12,3): error TS2590: …`) */
export function typeErrorFiles(out: string): string[] {
  return [...new Set([...out.matchAll(/^(\S+?\.tsx?)\(\d+,\d+\): error TS\d+/gm)].map((m) => m[1]!.replace(/\\/g, '/')))].sort()
}

/** ownersOf(file, writers, outputs) → the generators that write this file, read from the two declarations the drain
 *  already keeps (DRAIN_WRITERS for the ledger's own emitters, RECONCILE_OUTPUTS for the reconcile chain) — a file no
 *  declaration names is hand-written, and no bootstrap is allowed to paper over a type error in it */
export function ownersOf(file: string, writers: Readonly<Record<string, string>>, outputs: Readonly<Record<string, readonly string[]>>): string[] {
  const owners = new Set<string>()
  if (writers[file]) owners.add(writers[file]!)
  for (const [gen, outs] of Object.entries(outputs)) if (outs.some((o) => o === file || file.startsWith(o.replace(/\/$/, '') + '/'))) owners.add(gen)
  return [...owners].sort()
}

export interface BuildTriage { generated: { file: string; owners: string[] }[]; other: string[] }
export function buildTriage(out: string, writers: Readonly<Record<string, string>>, outputs: Readonly<Record<string, readonly string[]>>): BuildTriage {
  const generated: BuildTriage['generated'] = []
  const other: string[] = []
  for (const file of typeErrorFiles(out)) {
    const owners = ownersOf(file, writers, outputs)
    if (owners.length) generated.push({ file, owners })
    else other.push(file)
  }
  return { generated, other }
}

/** buildDecision(triage) → bootstrap ONCE only when every refused file is generated; anything else stops, named */
export function buildDecision(t: BuildTriage): { bootstrap: true; owners: string[] } | { bootstrap: false; gaps: Gap[] } {
  if (!t.generated.length && !t.other.length) return { bootstrap: false, gaps: [{ what: 'the build failed and tsc named no file', fix: 'read the build output above — a failure with no type error is not the generated-file deadlock, so nothing is bootstrapped' }] }
  if (t.other.length) return { bootstrap: false, gaps: t.other.map((f) => ({ what: `${f}: a type error in a file no generator owns`, fix: 'fix the source — a bootstrap emits what the checker refused, which is sound only for a file its generator rewrites next' })) }
  return { bootstrap: true, owners: [...new Set(t.generated.flatMap((g) => g.owners))].sort() }
}

// ── B · THE FIXED POINT ─────────────────────────────────────────────────────────────────────────────────────────────

/** a wing generator is a lean-*.ts that WRITES a wing — it imports lean-gen's emit; the entry points (lean-one,
 *  lean-all) and the readers (heartbeats, axioms) import other names from lean-gen and are not wings */
export const isWingGenerator = (src: string): boolean => /import\s*\{[^}]*\bemit\b[^}]*\}\s*from\s*'\.\/lean-gen\.js'/.test(src)

/** wingDomains(paths, sourceOf) → the lean-one domain of every changed path that is a wing generator */
export function wingDomains(paths: readonly string[], sourceOf: (path: string) => string | null): string[] {
  return [...new Set(paths
    .filter((p) => /^src\/scripts\/lean-[a-z0-9-]+\.ts$/.test(p))
    .filter((p) => { const s = sourceOf(p); return s !== null && isWingGenerator(s) })
    .map((p) => p.replace(/^src\/scripts\/lean-/, '').replace(/\.ts$/, '')))].sort()
}

/** roundBound(distinct) → how many rounds the fixed point may take: one per distinct cure (each can unlock at most
 *  the next), plus the round that finds the tree clean */
export const roundBound = (distinct: number): number => distinct + 1

/** roundSteps(objected, order, resealFrom) → the steps of the next round. A cure invalidates every step after it in
 *  the order, so the round re-runs the order's tail from the earliest objection; a cure outside the order still writes
 *  derived files, so it runs first and the tail from `resealFrom` (the court and the seal) follows it. */
export function roundSteps(objected: readonly string[], order: readonly string[], resealFrom: string): string[] {
  if (!objected.length) return []
  const extras = [...new Set(objected.filter((o) => !order.includes(o)))]
  const starts = [...objected.map((o) => order.indexOf(o)), ...(extras.length ? [order.indexOf(resealFrom)] : [])].filter((i) => i >= 0)
  const start = starts.reduce((m, i) => (i < m ? i : m), order.length)
  return [...extras, ...order.slice(start)]
}

/** one round of the fixed point: the files each step rewrote, and the objections the verification named after them */
export interface Round { rewrote: Record<string, string[]>; objections: string[] }
export type LoopVerdict =
  | { kind: 'converged' }
  | { kind: 'continue' }
  | { kind: 'stuck'; objections: string[]; rewrote: Record<string, string[]> }
  | { kind: 'two-writers'; sides: [{ objections: string[]; rewrote: Record<string, string[]> }, { objections: string[]; rewrote: Record<string, string[]> }]; shared: string[] }
  | { kind: 'bound'; rounds: number; objections: string[] }

const setKey = (o: readonly string[]): string => [...new Set(o)].sort().join('|')
const filesOf = (r: Record<string, string[]>): string[] => [...new Set(Object.values(r).flat())].sort()

/** loopVerdict(rounds, bound) → whether the fixed point converged, may continue, or must STOP — and when it stops,
 *  the reason is named, never a silent loop:
 *   · stuck        the same objections survived the round that cured them — a cure that does not cure;
 *   · two-writers  objections A, then B, then A again: A's cure re-breaks B and B's cure re-breaks A. Each side is
 *                  named with the files its cures rewrote, and the files BOTH rewrote — the contested writes;
 *   · bound        the round budget ran out without either shape. */
export function loopVerdict(rounds: readonly Round[], bound: number): LoopVerdict {
  const n = rounds.length
  if (!n) return { kind: 'continue' }
  const last = rounds[n - 1]!
  if (!last.objections.length) return { kind: 'converged' }
  if (n >= 3) {
    const a = rounds[n - 3]!, b = rounds[n - 2]!
    if (setKey(last.objections) === setKey(a.objections) && b.objections.length && setKey(b.objections) !== setKey(a.objections)) {
      // A's objections were answered in round n-1 (rounds[n-2].rewrote) and B appeared; B's were answered in round n
      // (last.rewrote) and A came back
      const sideA = { objections: a.objections, rewrote: b.rewrote }
      const sideB = { objections: b.objections, rewrote: last.rewrote }
      const fb = filesOf(sideB.rewrote)
      return { kind: 'two-writers', sides: [sideA, sideB], shared: filesOf(sideA.rewrote).filter((f) => fb.includes(f)) }
    }
  }
  if (n >= 2 && setKey(last.objections) === setKey(rounds[n - 2]!.objections)) return { kind: 'stuck', objections: last.objections, rewrote: last.rewrote }
  if (n >= bound) return { kind: 'bound', rounds: n, objections: last.objections }
  return { kind: 'continue' }
}

const listed = (xs: readonly string[], cap = 12): string => (xs.length ? xs.slice(0, cap).join(', ') + (xs.length > cap ? `, … (${xs.length} in all)` : '') : 'nothing')

/** loopGap(verdict) → the GAP+FIX a stopped fixed point prints */
export function loopGap(v: Exclude<LoopVerdict, { kind: 'converged' } | { kind: 'continue' }>): Gap {
  if (v.kind === 'two-writers') {
    const [a, b] = v.sides
    return {
      what: `TWO WRITERS: "${a.objections.join(' + ')}" is cured by ${listed(Object.keys(a.rewrote))} (rewrites ${listed(filesOf(a.rewrote))}), which brings back "${b.objections.join(' + ')}"; its cure ${listed(Object.keys(b.rewrote))} (rewrites ${listed(filesOf(b.rewrote))}) brings back the first. Both rewrite: ${listed(v.shared)}`,
      fix: 'make one side stop writing the other\'s input, or place the reader after the writer in HEAL_ORDER (src/scripts/develop-cures.ts) — re-running either cure only turns the wheel again',
    }
  }
  if (v.kind === 'stuck') return { what: `the cure(s) for "${v.objections.join(' + ')}" ran (rewriting ${listed(filesOf(v.rewrote))}) and the same objection came back`, fix: 'either a signature matches the wrong cure (order CURES most-specific-first) or the cure is incomplete' }
  return { what: `${v.rounds} rounds spent (the bound: one per distinct cure, plus one) and still objecting: ${v.objections.join(' + ')}`, fix: 'read the rounds above; a chain that neither converges nor alternates is writing something no cure in the order accounts for' }
}

// ── C · LAND ────────────────────────────────────────────────────────────────────────────────────────────────────────

/** a failure marker means something only at the START of a line: `✖` and `not ok` are the suite's, `✗ ` the gates' */
export const isFailureMarker = (l: string): boolean => /^(✖|not ok|✗ |# fail)/.test(l.trim())

/** failingTests(out) → every failure marker WITH the indented reason lines under it, verbatim — the reporter prints
 *  a failure's file and message beneath its name, and a marker without them is a name without a why */
export function failingTests(out: string, cap = 72): string[] {
  const lines = out.split('\n')
  const kept: string[] = []
  lines.forEach((l, i) => {
    if (!isFailureMarker(l) || /^# fail 0\b/.test(l.trim())) return
    kept.push(l.trimEnd())
    for (let j = i + 1; j < lines.length && /^\s{2,}\S/.test(lines[j]!) && !isFailureMarker(lines[j]!); j++) kept.push(lines[j]!.trimEnd())
  })
  return kept.slice(0, cap)
}

/** landVerdict → LANDED iff HEAD is origin/main after the landing, asked of git — never the exit code alone ("Everything
 *  up-to-date" exits 0 too, and six landings once reported success and moved nothing). A landing whose push happened
 *  but whose land still exited non-zero (the forge refused it) is landed and NOT clean: the train stops there. */
export function landVerdict(r: { exitOk: boolean; head: string; origin: string; out: string; proof: string }): { landed: boolean; clean: boolean; gaps: Gap[] } {
  const landed = r.head !== '' && r.head === r.origin
  if (landed && r.exitOk) return { landed, clean: true, gaps: [] }
  if (landed) return { landed, clean: false, gaps: namedLines(r.out, 12).map((l) => ({ what: `landed ${r.head.slice(0, 9)}, and land still objected: ${l.trim()}`, fix: 'the commit is public — cure on top and run the train again; a retry does not recall a push' })) }
  const tests = failingTests(`${r.out}\n${r.proof}`)
  const said = tests.length ? tests : namedLines(r.out, 12)
  return {
    landed, clean: false,
    gaps: [{ what: `HEAD ${r.head.slice(0, 9) || '(unread)'} is not origin/main ${r.origin.slice(0, 9) || '(unread)'} — nothing landed`, fix: 'the lines below are land\'s own words, verbatim' },
      ...said.map((l) => ({ what: l, fix: tests.length ? 'the committed tree failed this — cure it and run the train again' : 'land\'s objection, verbatim' }))],
  }
}

// ── E · LIVE ────────────────────────────────────────────────────────────────────────────────────────────────────────

/** toolsNamed(instructions, listed) → the served tools the connect instructions name, in the order they name them —
 *  derived from the listing, so a word is a tool only when the door serves a tool by that name */
export function toolsNamed(instructions: string, listedNames: readonly string[]): string[] {
  const names = new Set(listedNames)
  const out: string[] = []
  for (const m of instructions.matchAll(/[A-Za-z][A-Za-z0-9_]*/g)) if (names.has(m[0]) && !out.includes(m[0])) out.push(m[0])
  return out
}

/** instructionArgs(instructions, tool) → the argument object the instructions write right after the tool's name
 *  (`uuidna_gate_status {messaging:true}`), keys unquoted as prose writes them; null when there is none or it does
 *  not parse */
export function instructionArgs(instructions: string, tool: string): Record<string, unknown> | null {
  const m = new RegExp(tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*(\\{[^{}]*\\})').exec(instructions)
  if (!m) return null
  try {
    const v: unknown = JSON.parse(m[1]!.replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":').replace(/'([^']*)'/g, '"$1"'))
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : null
  } catch { return null }
}

export interface ToolSchema { properties?: Record<string, { default?: unknown; examples?: unknown[]; description?: string }>; required?: string[] }
/** the first quoted example a property's description gives (`e.g. "apk add nginx", …`) */
export const exampleOf = (description?: string): string | null => /e\.g\.\s*["'`]([^"'`]+)["'`]/.exec(description ?? '')?.[1] ?? null

/** argsFor(tool, instructions, served, local) → the arguments to call a named tool with: what the instructions write,
 *  then for each REQUIRED property still absent a default, an example or a quoted e.g. — from the served schema first,
 *  then the local catalog's (the edge compacts descriptions, the tree keeps them). A property nothing gives is MISSING,
 *  and the caller names it: an invented argument would test the invention, not the door. */
export function argsFor(tool: string, instructions: string, served?: ToolSchema, local?: ToolSchema): { args: Record<string, unknown>; missing: string[] } {
  const args: Record<string, unknown> = { ...(instructionArgs(instructions, tool) ?? {}) }
  const missing: string[] = []
  for (const p of [...new Set([...(served?.required ?? []), ...(local?.required ?? [])])]) {
    if (p in args) continue
    const found = [served, local].flatMap((s) => { const d = s?.properties?.[p]; return d ? [d.default, d.examples?.[0], exampleOf(d.description)] : [] }).find((v) => v !== undefined && v !== null)
    if (found === undefined) missing.push(p)
    else args[p] = found
  }
  return { args, missing }
}

export interface RpcAnswer { error?: { code?: number; message?: string }; result?: { isError?: boolean; content?: { text?: string }[]; instructions?: string; tools?: { name: string; inputSchema?: ToolSchema }[] } }

/** rpcOfBody(text, contentType) → the JSON-RPC answer, whether the door replied with JSON or with an event stream */
export function rpcOfBody(text: string, contentType: string): RpcAnswer | null {
  const data = text.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim()).filter(Boolean)
  const body = /event-stream/.test(contentType) ? (data[data.length - 1] ?? '') : text
  try { return JSON.parse(body) as RpcAnswer } catch { return null }
}

/** liveVerdict(tool, rpc) → the answer's text, and a GAP when the door failed the call: no answer, a JSON-RPC error, a
 *  tool error, or an answer that reports itself false (`allHold: false`, `ok: false`) — a live law down is the edge
 *  disagreeing with the tree that was just shipped */
export function liveVerdict(tool: string, rpc: RpcAnswer | null, why = ''): { ok: boolean; text: string; gap?: Gap } {
  const fix = 'read the answer at its address in the receipt; the edge is serving something the landed tree does not agree with'
  if (!rpc) return { ok: false, text: '', gap: { what: `${tool}: no JSON-RPC answer${why ? ` (${why})` : ''}`, fix } }
  if (rpc.error) return { ok: false, text: JSON.stringify(rpc.error), gap: { what: `${tool}: JSON-RPC error ${rpc.error.code ?? '?'} — ${rpc.error.message ?? ''}`, fix } }
  if (!rpc.result) return { ok: false, text: '', gap: { what: `${tool}: the answer carries no result`, fix } }
  const text = (rpc.result.content ?? []).map((c) => c.text ?? '').join('\n')
  if (rpc.result.isError) return { ok: false, text, gap: { what: `${tool}: the tool answered isError — ${text.slice(0, 300)}`, fix } }
  let parsed: unknown = null
  try { parsed = JSON.parse(text) } catch { /* a prose answer reports nothing about itself */ }
  const o = parsed && typeof parsed === 'object' ? (parsed as { allHold?: unknown; ok?: unknown; laws?: { law?: string; holds?: boolean }[]; why?: unknown }) : null
  if (o && (o.allHold === false || o.ok === false)) {
    const down = Array.isArray(o.laws) ? o.laws.filter((l) => l.holds === false).map((l) => String(l.law ?? '').slice(0, 90)) : []
    return { ok: false, text, gap: { what: `${tool}: answered ${o.allHold === false ? 'allHold' : 'ok'}: false${down.length ? ` — not holding: ${down.join(' | ')}` : o.why ? ` — ${String(o.why).slice(0, 200)}` : ''}`, fix } }
  }
  return { ok: true, text }
}

// ── F · THE RECEIPT ─────────────────────────────────────────────────────────────────────────────────────────────────

export interface StageResult { stage: Stage; verdict: 'pass' | 'stop'; detail: string; gaps: Gap[] }
export interface LiveAnswer { tool: string; args: Record<string, unknown>; address: string; ok: boolean }
/** runReceipt(run) → the run's one receipt, content-addressed over everything it states */
export function runReceipt(run: { stages: StageResult[]; shas: Record<string, string>; live: LiveAnswer[]; rounds: number }): Record<string, unknown> & { address: string } {
  const body = { kind: 'autopilot-run', repo: 'uuidna/uuidna', ...run }
  return { ...body, address: toUuid(canonicalJson(body)) }
}
