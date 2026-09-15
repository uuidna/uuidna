#!/usr/bin/env node
// @non-harmonic: reads the session transcripts, dist/evidence and the git history of the ledger and of the gate — a
// NAMED boundary; every class a drained call receives is computed by the pure functions below, from the same gates the
// court runs on every call.
//
// court-investigate — THE COURT'S OWN INVESTIGATOR FOR AUDIT ORDERS. The court orders an investigation for every tool
// the gate drained a call from (trial-refusals courtOrders, kind 'audit'), and until now a session answered each order
// BY HAND: find the drained records, match each to the tool call that made it, recompute the gate on that input, and
// write down why it drained. The same hand-run happened all of 2026-09-15 (scratchpad court-attribute-claimed.mjs); it
// is the court's work, so the court does it — from the Stop hook for a session, and from the autopilot train without
// one. The order of the steps is the law the Stop hook already states:
//
//   1. CLAIM FIRST: append {address, kind, claimedBy} per order to dist/evidence/investigations.jsonl, so no other
//      session launches the same order (a claimed address leaves every session's pending list).
//   2. REFUSE while a law is down: laws().allHold false makes every recomputed call look breached, so nothing recorded
//      then would mean anything (PATCHES §34: 46 calls drained in one heal window with the axiom witness behind).
//   3. RECOMPUTE each drained call after the last seq a recorded result already named for its tool, and CLASS it:
//        declared           the breach is a Lean declaration in the input, read as a citation
//        control            the input is a test asserting the gate or a finder refuses that very fake name
//        test-fixture       the fake key is quoted inside a .test.ts file's own input
//        sealed-since       it cites a theorem sealed after the call — derived from the ledger's git history
//        pre-fix-gate       a gate version in force since then drains it and the current gate does not — found from
//                           the git history of src/slimgate.ts, never a typed sha
//        my-prompt-example  an example inside the claiming session's own Agent prompt
//        law-down           drained by a law that stood broken at the time, which the record itself names
//   4. RECORD only when nothing is unexplained. An OTHER or an UNMATCHED call leaves the order claimed and open, and
//      the investigator says which calls a person must read — it never records a guess.
import { readFileSync, appendFileSync, mkdirSync, readdirSync, writeFileSync, lstatSync } from 'node:fs'
import { join, basename } from 'node:path'
import { homedir } from 'node:os'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { ROOT } from './api.js'
import { toUuid, canonicalJson } from '../address.js'

/** the statement an action makes: every string the tool was handed, each on its own line — the command, the path, the
 *  text written. A line apiece keeps a Lean declaration that opens a written text at the start of its line, where the
 *  honesty gate reads it as a declaration (it defines a name) rather than as a citation of one. The court's hook audits
 *  a call on this statement, and the investigator must recompute on the same one. */
export const statementOf = (input: unknown): string =>
  input && typeof input === 'object'
    ? Object.values(input as Record<string, unknown>).filter((v): v is string => typeof v === 'string').join('\n')
    : String(input ?? '')

/** one line of dist/evidence/investigations.jsonl — a claim carries no result; a recorded result names its calls */
export interface Investigation { address?: string; kind?: string; claimedBy?: string; head?: string; result?: string; calls?: { seq: number; tool: string; classes: string[] }[] }
export interface AuditOrder { kind: string; subject: string; why: string; address: string }
/** the fields of a legal-audit record the investigator reads */
export interface DrainedRecord { seq: number; tool: string; args: string; clean: boolean; gate: string; allHold: boolean; failing?: string[]; signals?: { honesty?: number } }
/** a tool call found in a transcript, by the content address of its input */
export interface CallInput { input: Record<string, unknown>; mine: boolean; who: string }
/** the recomputations a class needs — injected, so the classes are tested against controls without a ledger */
export interface Judges {
  /** the court's breaches for this statement NOW (auditAction) */
  breaches(statement: string): string[]
  /** the sealed keys the statement cites NOW */
  cited(statement: string): string[]
  /** is this key sealed AFTER the baseline the drained calls were judged against */
  sealedSince(key: string): boolean
  /** the names a gate version in force since the baseline fabricates in this statement (empty when none does) */
  oldGate(statement: string): string[]
}
export interface CallVerdict { seq: number; tool: string; who: string; classes: string[]; explained: boolean; context: string }

/** sinceByTool(lines) → per tool, the highest seq a recorded result already named, so no drained call is judged twice
 *  or skipped. Reads the structured `calls` and the prose form the hand-run investigations wrote
 *  ("drained Write call(s) (3601:declared:…, …)") — both are the record. */
export function sinceByTool(lines: readonly Investigation[]): Record<string, number> {
  const since: Record<string, number> = {}
  const see = (tool: string, seq: number): void => { if (seq > (since[tool] ?? 0)) since[tool] = seq }
  for (const l of lines) {
    if (!l.result) continue
    for (const c of l.calls ?? []) see(c.tool, c.seq)
    const m = /drained (\w+) call\(s\) \(([^)]*)\)/.exec(l.result)
    if (m) for (const s of m[2]!.matchAll(/(\d+):/g)) see(m[1]!, Number(s[1]))
  }
  return since
}

/** ordersFor(orders, lines, claimant) → the audit orders to claim now (nobody has) and the ones this claimant claimed
 *  earlier and never recorded (resumed). An order another claimant holds is theirs. */
export function ordersFor(orders: readonly AuditOrder[], lines: readonly Investigation[], claimant: string): { toClaim: AuditOrder[]; resumed: AuditOrder[] } {
  const audit = orders.filter((o) => o.kind === 'audit' && /^tool \S+$/.test(o.subject))
  const done = new Set(lines.filter((l) => l.result).map((l) => l.address))
  const seen = new Set(lines.map((l) => l.address))
  const mine = new Set(lines.filter((l) => !l.result && l.claimedBy === claimant).map((l) => l.address))
  return {
    toClaim: audit.filter((o) => !seen.has(o.address)),
    resumed: audit.filter((o) => !done.has(o.address) && mine.has(o.address)),
  }
}

const EXPLAINED = /^(declared|control|test-fixture|my-prompt-example|sealed-since=|pre-fix-gate=|law-down=)/
const nameOf = (breach: string): string => breach.startsWith('fabricated citation: ') ? breach.slice('fabricated citation: '.length).replace(/[^a-zA-Z0-9_]/g, '') : ''

/** classifyCall(record, match, judges) → the classes of one drained call, recomputed from its own input */
export function classifyCall(r: DrainedRecord, m: CallInput | undefined, j: Judges): CallVerdict {
  const base = { seq: r.seq, tool: r.tool, who: m?.who ?? '' }
  if (!m) return { ...base, classes: ['UNMATCHED'], explained: false, context: `no transcript read holds a call whose input addresses to ${r.args}` }
  if (r.signals?.honesty !== 1) {
    return !r.allHold
      ? { ...base, classes: [`law-down=${(r.failing ?? []).join('+') || 'unnamed'}`], explained: true, context: '' }
      : { ...base, classes: ['OTHER'], explained: false, context: 'drained with honesty clean while every law held — the gate repaired an input or an output' }
  }
  const s = statementOf(m.input)
  const breaches = j.breaches(s)
  let classes: string[]
  if (breaches.length) {
    classes = breaches.map((b) => {
      const n = nameOf(b)
      if (!n) return 'OTHER'
      if (new RegExp(`(theorem|def|structure|abbrev|inductive|lemma)\\s+${n}\\b`).test(s)) return 'declared'
      if (new RegExp(`${n}[^\\n]{0,80}\\)\\.fabricated|Gaps\\([^\\n]{0,200}${n}|fabricated[^\\n]{0,120}${n}`).test(s)) return 'control'
      if (String(m.input.file_path ?? '').endsWith('.test.ts') && new RegExp(`['"\`][^'"\`\\n]*\\b${n}\\b[^'"\`\\n]*['"\`]`).test(s)) return 'test-fixture'
      if (m.mine && r.tool === 'Agent') return 'my-prompt-example'
      return 'OTHER'
    })
  } else {
    const since = j.cited(s).filter((k) => j.sealedSince(k))
    const old = since.length ? [] : j.oldGate(s)
    classes = since.length ? [`sealed-since=${since.join('+')}`] : old.length ? [`pre-fix-gate=${old.join('+')}`] : ['OTHER']
  }
  const explained = classes.length > 0 && classes.every((c) => EXPLAINED.test(c))
  const at = breaches[0] ? s.indexOf(nameOf(breaches[0])) : 0
  return { ...base, classes, explained, context: explained ? '' : `${String(m.input.file_path ?? '')} …${s.slice(at > 140 ? at - 140 : 0, at + 60).replace(/\n/g, ' ⏎ ')}` }
}

/** investigate(records, byArgs, tools, since, judges) → every drained call of the ordered tools after its tool's
 *  `since`, classed, and the ones nothing explains */
export function investigate(records: readonly DrainedRecord[], byArgs: ReadonlyMap<string, CallInput>, tools: ReadonlySet<string>, since: Readonly<Record<string, number>>, j: Judges): { calls: CallVerdict[]; unexplained: CallVerdict[] } {
  const calls = records
    .filter((r) => !r.clean && r.gate !== 'error' && tools.has(r.tool) && r.seq > (since[r.tool] ?? 0))
    .map((r) => classifyCall(r, byArgs.get(r.args), j))
  return { calls, unexplained: calls.filter((c) => !c.explained) }
}

/** mayRecord(inv, allHold, failing) → a result is recorded only while every law holds and every call is explained */
export function mayRecord(inv: { unexplained: readonly CallVerdict[] }, allHold: boolean, failing: readonly string[]): { ok: true } | { ok: false; why: string } {
  if (!allHold) return { ok: false, why: `a law is down (${failing.join('; ') || 'unnamed'}) — every recomputed call would read as breached, so nothing is recorded until the laws hold` }
  if (inv.unexplained.length) return { ok: false, why: `${inv.unexplained.length} drained call(s) fall in no class: ${inv.unexplained.map((c) => `${c.seq} ${c.tool} ${c.classes.join('/')}`).join(', ')}` }
  return { ok: true }
}

/** resultOf(order, claimant, head, calls) → the recorded result line for one order */
export function resultOf(order: AuditOrder, claimant: string, head: string, calls: readonly CallVerdict[]): Investigation {
  const tool = order.subject.replace(/^tool /, '')
  const mine = calls.filter((c) => c.tool === tool)
  return {
    address: order.address, kind: order.kind, claimedBy: claimant, head,
    result: `investigated by recomputation (court-investigate): ${mine.length} new drained ${tool} call(s), each matched by input address to a transcript and classed by the gates recomputed now — ${mine.map((c) => `${c.seq}:${c.classes.join('/')}`).join(', ') || 'none since the last recorded result'}. No call falls outside a class.`,
    calls: mine.map((c) => ({ seq: c.seq, tool: c.tool, classes: c.classes })),
  }
}

// ── THE BOUNDARY: files, transcripts, git ──────────────────────────────────────────────────────────────────────────

const INV = join(ROOT, 'dist', 'evidence', 'investigations.jsonl')
const readLines = <T>(path: string): T[] => {
  try { return readFileSync(path, 'utf8').split('\n').filter(Boolean).flatMap((l) => { try { return [JSON.parse(l) as T] } catch { return [] } }) } catch { return [] }
}
const git = (...args: string[]): string => {
  try { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024 }).trim() } catch { return '' }
}
const walkJsonl = (dir: string): string[] => {
  try {
    return readdirSync(dir).flatMap((e) => {
      const p = join(dir, e)
      const st = lstatSync(p)
      return st.isDirectory() ? walkJsonl(p) : st.isFile() && e.endsWith('.jsonl') ? [p] : []
    })
  } catch { return [] }
}

/** transcriptsOf(transcriptPath) → the transcripts to match calls in: a session's own transcript and its agents' (the
 *  Stop hook hands the path), or — with no session — every transcript of this project's directory */
export function transcriptsOf(transcriptPath?: string): { files: string[]; mine?: string } {
  if (transcriptPath) return { files: [transcriptPath, ...walkJsonl(transcriptPath.replace(/\.jsonl$/, ''))], mine: transcriptPath }
  return { files: walkJsonl(join(homedir(), '.claude', 'projects', ROOT.replace(/[^A-Za-z0-9]/g, '-'))) }
}

/** every tool call the transcripts hold, by the content address of its input — the same address the audit record keeps */
export function callsIn(files: readonly string[], mine?: string): Map<string, CallInput> {
  const by = new Map<string, CallInput>()
  for (const f of files) {
    let text = ''
    try { text = readFileSync(f, 'utf8') } catch { continue }
    for (const l of text.split('\n')) {
      if (!l.includes('"tool_use"')) continue
      let e: { message?: { content?: unknown } }
      try { e = JSON.parse(l) as typeof e } catch { continue }
      const c = e.message?.content
      if (!Array.isArray(c)) continue
      for (const b of c as { type?: string; input?: Record<string, unknown> }[]) {
        if (b.type === 'tool_use' && b.input) by.set(toUuid(canonicalJson(b.input)), { input: b.input, mine: f === mine, who: basename(f).slice(0, 22) })
      }
    }
  }
  return by
}

/** the keys the ledger held at a revision, read from git's copy of the served ledger — null when git has no such revision */
const ledgerKeysAt = (rev: string): Set<string> | null => {
  const text = git('show', `${rev}:src/theorems/generated.ts`)
  return text ? new Set([...text.matchAll(/\{ key: "([^"]+)", name/g)].map((m) => m[1]!)) : null
}

/** the gate versions in force since the baseline, as callable gates: the version AT the baseline and every version a
 *  commit since then wrote, minus the current one. With no recorded baseline, the version before the newest commit that
 *  changed the gate — "the commit before the gate fix", found from the gate's own history. */
const priorGates = async (baseline: string, head: string): Promise<((s: string) => { fabricated: string[] })[]> => {
  const current = readFileSync(join(ROOT, 'src', 'slimgate.ts'), 'utf8')
  const newest = git('log', '-1', '--format=%H', '--', 'src/slimgate.ts')
  const revs = baseline === head
    ? (newest ? [`${newest}^`] : [])
    : [baseline, ...git('log', '--format=%H', `${baseline}..${head}`, '--', 'src/slimgate.ts').split('\n').filter(Boolean)]
  const dist = pathToFileURL(join(ROOT, 'dist')).href + '/'
  const gates: ((s: string) => { fabricated: string[] })[] = []
  const texts = new Set<string>()
  for (const rev of revs) {
    const text = git('show', `${rev}:src/slimgate.ts`)
    if (!text || text === current || texts.has(text)) continue
    texts.add(text)
    // the old source's relative imports are pointed at today's dist, so the old gate judges against today's ledger — the
    // question is whether its CODE drains the input, and only the code differs between the versions
    const file = join(ROOT, 'dist', 'evidence', 'gates', `slimgate-${toUuid(text)}.ts`)
    mkdirSync(join(ROOT, 'dist', 'evidence', 'gates'), { recursive: true })
    writeFileSync(file, text.replace(/from '\.\/([^']+)'/g, (_m, p: string) => `from '${dist}${p}'`))
    try {
      const mod = await import(pathToFileURL(file).href) as { slimGate?: (s: string) => { fabricated: string[] } }
      if (mod.slimGate) gates.push(mod.slimGate)
    } catch { /* a version whose module fails to load judges nothing, and says nothing — its calls stay unexplained */ }
  }
  return gates
}

export interface InvestigateReport { claimed: AuditOrder[]; resumed: AuditOrder[]; calls: CallVerdict[]; unexplained: CallVerdict[]; recorded: number; refused: string | null }

/** investigateAudits(opts) → claim, check the laws, recompute, and record when everything is explained */
export async function investigateAudits(o: { claimant: string; transcripts: { files: string[]; mine?: string }; record: boolean }): Promise<InvestigateReport> {
  const { courtOrders } = await import('./trial-refusals.js')
  const lines = readLines<Investigation>(INV)
  const { toClaim, resumed } = ordersFor(courtOrders().orders, lines, o.claimant)
  const none: InvestigateReport = { claimed: [], resumed: [], calls: [], unexplained: [], recorded: 0, refused: null }
  if (!toClaim.length && !resumed.length) return none
  const head = git('rev-parse', 'HEAD')
  mkdirSync(join(ROOT, 'dist', 'evidence'), { recursive: true })
  if (o.record) for (const ord of toClaim) appendFileSync(INV, JSON.stringify({ address: ord.address, kind: ord.kind, claimedBy: o.claimant, head }) + '\n')
  const orders = [...toClaim, ...resumed]
  const report: InvestigateReport = { ...none, claimed: toClaim, resumed }

  const { laws } = await import('../laws.js')
  const L = laws()
  const lawGate = mayRecord({ unexplained: [] }, L.allHold, L.laws.filter((l) => !l.holds).map((l) => l.enforcedBy))
  if (!lawGate.ok) return { ...report, refused: lawGate.why }

  const { auditAction } = await import('../law-audit.js')
  const { sealedKeysIn } = await import('../refusal-trials.js')
  const baseline = [...lines].reverse().find((l) => l.head)?.head ?? head
  const atBase = ledgerKeysAt(baseline)
  const gates = await priorGates(baseline, head)
  const judges: Judges = {
    breaches: (s) => auditAction({ agent: `court-investigate:${o.claimant}`, tool: 'investigate', statement: s, cited: sealedKeysIn(s) }).breaches,
    cited: (s) => sealedKeysIn(s),
    sealedSince: (k) => atBase !== null && !atBase.has(k),
    oldGate: (s) => [...new Set(gates.flatMap((g) => { try { return g(s).fabricated } catch { return [] } }))],
  }
  const records = readLines<DrainedRecord>(join(ROOT, 'dist', 'evidence', 'legal-audit.jsonl'))
  const tools = new Set(orders.map((x) => x.subject.replace(/^tool /, '')))
  const inv = investigate(records, callsIn(o.transcripts.files, o.transcripts.mine), tools, sinceByTool(lines), judges)
  const may = mayRecord(inv, true, [])
  let recorded = 0
  if (o.record && may.ok) for (const ord of orders) { appendFileSync(INV, JSON.stringify(resultOf(ord, o.claimant, head, inv.calls)) + '\n'); recorded++ }
  return { ...report, calls: inv.calls, unexplained: inv.unexplained, recorded, refused: may.ok ? null : may.why }
}

// ── CLI: `npm run x -- court-investigate [--claimant <id>] [--transcript <file>]… [--dry]` — exit 1 while an order stays
// open (refused or unexplained), so a train reading the exit code stops with the court's GAP
if (process.argv[1]?.endsWith('court-investigate.js')) {
  const argv = process.argv.slice(2)
  const valuesOf = (flag: string): string[] => argv.flatMap((a, i) => (a === flag && argv[i + 1] ? [argv[i + 1]!] : []))
  const claimant = valuesOf('--claimant')[0] ?? 'autopilot'
  const given = valuesOf('--transcript')
  const r = await investigateAudits({ claimant, transcripts: given.length ? { files: given, mine: given[0] } : transcriptsOf(), record: !argv.includes('--dry') })
  if (!r.claimed.length && !r.resumed.length) { console.log('✓ court-investigate — no audit order is open for this claimant'); process.exit(0) }
  console.log(`court-investigate — ${r.claimed.length} order(s) claimed, ${r.resumed.length} resumed, ${r.calls.length} drained call(s) classed (claimant ${claimant})`)
  for (const c of r.calls) console.log(`  ${c.seq} ${c.tool} ${c.who} ${c.classes.join(',')}`)
  if (r.refused === null) { console.log(`✓ court-investigate — ${r.recorded} result(s) recorded to dist/evidence/investigations.jsonl`); process.exit(0) }
  console.error(`✗ court-investigate — nothing recorded; the order(s) stay claimed by ${claimant} and open`)
  console.error(`    GAP ${r.refused}`)
  for (const c of r.unexplained) console.error(`    GAP ${c.seq} ${c.tool} ${c.classes.join('/')} — ${c.context}`)
  console.error('    FIX read each call above at its seq in dist/evidence/legal-audit.jsonl; cure its source, or append the result by hand once a person has read it')
  process.exit(1)
}
