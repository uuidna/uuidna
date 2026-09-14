// legal-audit — EVERY AGENT ACTION AUDITED AGAINST THE LAWS, AS IT HAPPENS (the captain, 2026-09-14: "fuse all law apis
// as well so legal audit of all agent actions is in realtime").
//
// Both MCP surfaces run every tools/call through one dispatch (stdio handle() in mcp.ts, the edge's handleMcpRpc in
// mcp-http.ts). Each hands the settled call here the moment the gate has judged it, and gets back one audit record:
// which tool ran, the content address of its arguments and of its output (addresses only — no argument value is ever
// kept, so no secret an agent passes can leak into the record), the gate's verdict, the laws' receipt and whether
// every law holds, and a link chained to the previous record, so a removed, reordered or altered entry breaks the chain
// at a named link. The record rides in the response envelope (_meta.audit) on both surfaces, and the host that has a
// disk saves it at once to dist/evidence/legal-audit.jsonl, read back through uuidna_evidence {run: "legal-audit"}.
//
// THE LAWS ARE COMPUTED ONCE PER PROCESS: every law's `holds` is a pure function of the shipped code and ledger, which
// do not change while a process serves, so recomputing them per call would pay the same answer again (the captain's
// cache law). The per-call part — the call's own addresses, verdict and link — is computed on every call.
//
// PURE except saveAudit, whose node:fs rides lazily through the runtime's registry (the api.ts law): the edge imports
// this module and never reaches for a filesystem it does not have.
// @non-harmonic: saveAudit and resumeFromLog reach the host's filesystem (node:fs through process.getBuiltinModule) to
// save and read back dist/evidence/legal-audit.jsonl — a named boundary; the records themselves are pure.
import { toUuid } from './address.js'
import { laws } from './laws.js'

/** canonical JSON: keys sorted, so the same arguments always address the same */
const canonical = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(canonical).join(',')}]`
    : v && typeof v === 'object' ? `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(',')}}`
      : JSON.stringify(v) ?? 'undefined'

export interface LawsState { receipt: string; allHold: boolean; failing: string[] }
let lawsNow: LawsState | null = null
/** lawsState() → the laws' receipt, whether all hold, and the gates of any that do not — computed once per process */
export const lawsState = (): LawsState => {
  if (lawsNow) return lawsNow
  const l = laws()
  lawsNow = { receipt: l.receipt, allHold: l.allHold, failing: l.laws.filter((x) => !x.holds).map((x) => x.enforcedBy) }
  return lawsNow
}

/** the gate's own three signals for one call (gate-engine GateVerdict): input sanitized — an adversarial argument shape;
 *  output sanitized — the tool's answer had to be repaired; honesty — the answer fabricates a theorem citation */
export interface AuditSignals { input: 0 | 1; output: 0 | 1; honesty: 0 | 1 }
export interface AuditRecord {
  seq: number; surface: string; tool: string; args: string; output: string
  clean: boolean; gate: string; signals: AuditSignals; laws: string; allHold: boolean; failing: string[]; prev: string; link: string
}
/** what a dispatch door hands in: the gate verdict as it judged the call (an errored call carries no signals) */
export type GateSeen = { clean: boolean; receipt: string } & Partial<AuditSignals>
/** auditRecordOf(seq, prev, surface, tool, args, output, gate, laws) → one audit record, pure: the call's addresses, its
 *  verdict, the laws' state handed in, and the link that chains it to prev. The live chain and the law that checks it
 *  both build records here, so they cannot disagree about what a record is. */
export function auditRecordOf(seq: number, prev: string, surface: string, tool: string, args: unknown, output: unknown, gate: GateSeen, s: LawsState): AuditRecord {
  const signals: AuditSignals = { input: gate.input ?? 0, output: gate.output ?? 0, honesty: gate.honesty ?? 0 }
  const body = { seq, surface, tool, args: toUuid(canonical(args)), output: toUuid(canonical(output)), clean: gate.clean, gate: gate.receipt, signals, laws: s.receipt, allHold: s.allHold, failing: s.failing, prev }
  return { ...body, link: toUuid(canonical(body)) }
}

let tip = 'genesis', seq = 0
/** auditCall(surface, tool, args, output, gate) → the audit record of one call, chained to the one before */
export function auditCall(surface: string, tool: string, args: unknown, output: unknown, gate: GateSeen): AuditRecord {
  const record = auditRecordOf(++seq, tip, surface, tool, args, output, gate, lawsState())
  tip = record.link
  return record
}

/** resumeChain(last) → continue the chain after a record already saved, so a host that serves each call in a fresh
 *  process (a hook) extends ONE chain instead of restarting at genesis. Only a record whose link recomputes is resumed
 *  from — a forged tail is refused, never continued. */
export function resumeChain(last: AuditRecord): boolean {
  if (auditChainBreaks([last]) !== null) return false
  tip = last.link
  seq = last.seq
  return true
}

/** resumeFromLog(root?) → resume from the last saved record of dist/evidence/legal-audit.jsonl; false when there is no
 *  log here (the edge) or its tail does not recompute */
export function resumeFromLog(root?: string): boolean {
  try {
    const fs = builtin<typeof import('node:fs')>('node:fs'), path = builtin<typeof import('node:path')>('node:path')
    const lines = fs.readFileSync(path.join(root ?? process.cwd(), 'dist', 'evidence', 'legal-audit.jsonl'), 'utf8').split('\n').filter(Boolean)
    const last = lines[lines.length - 1]
    return last ? resumeChain(JSON.parse(last) as AuditRecord) : false
  } catch { return false }
}

/** auditState() → how many calls this process has audited and the chain's tip, for the fused law door */
export const auditState = (): { audited: number; tip: string; laws: LawsState } => ({ audited: seq, tip, laws: lawsState() })

/** auditChainBreaks(records) → the first link that does not recompute, or null when the whole chain holds — anyone
 *  holding the log can check it without trusting the host that wrote it */
export function auditChainBreaks(records: readonly AuditRecord[]): { at: number; why: string } | null {
  let prev = records[0]?.prev ?? 'genesis'
  for (let i = 0; i < records.length; i++) {
    const { link, ...body } = records[i]!
    // a new serving process starts its own chain at genesis with seq 1 — a run boundary, counted, not a break
    if (body.prev === 'genesis' && body.seq === 1) prev = 'genesis'
    if (body.prev !== prev) return { at: i, why: `record ${body.seq} names prev ${body.prev}, the chain carried ${prev}` }
    if (toUuid(canonical(body)) !== link) return { at: i, why: `record ${body.seq} does not recompute to its link — altered after it was written` }
    prev = link
  }
  return null
}

// ── MANIPULATION, MEASURED FROM THE EVIDENCE (the captain, 2026-09-14: "keep the audits as evidence in the receipts to
// measure manipulation"). Every record keeps the gate's three signals and is bound into its call's receipt, so the log is
// evidence, and this reads it: how many calls were audited and clean, how many the gate drained and by which signal —
// an adversarial input, a repaired output, a fabricated citation — which tools they reached, whether any law stood
// broken while they ran, and whether the chain itself was tampered with. Pure over the records; anyone holding the log
// recomputes the same measure.
export interface Manipulation {
  audited: number; clean: number; drained: number; errors: number; runs: number
  signals: { input: number; output: number; honesty: number }
  lawsBroken: number
  byTool: { tool: string; drained: number }[]
  chain: { at: number; why: string } | null
  receipt: string
}
/** auditManipulation(records) → the manipulation measure over a saved audit log */
export function auditManipulation(records: readonly AuditRecord[]): Manipulation {
  const drainedRows = records.filter((r) => !r.clean && r.gate !== 'error')
  const perTool = new Map<string, number>()
  for (const r of drainedRows) perTool.set(r.tool, (perTool.get(r.tool) ?? 0) + 1)
  const signal = (k: keyof AuditSignals): number => records.filter((r) => r.signals?.[k] === 1).length
  return {
    audited: records.length,
    clean: records.filter((r) => r.clean).length,
    drained: drainedRows.length,
    errors: records.filter((r) => r.gate === 'error').length,
    runs: records.filter((r) => r.prev === 'genesis' && r.seq === 1).length,
    signals: { input: signal('input'), output: signal('output'), honesty: signal('honesty') },
    lawsBroken: records.filter((r) => !r.allHold).length,
    byTool: [...perTool].map(([tool, drained]) => ({ tool, drained })).sort((a, b) => b.drained - a.drained || (a.tool < b.tool ? -1 : 1)),
    chain: auditChainBreaks(records),
    receipt: toUuid(records.map((r) => r.link).join(',')),
  }
}

const builtin = <T>(id: string): T => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule(id) as T
/** saveAudit(record) → appended to dist/evidence/legal-audit.jsonl the moment the call completes; false where there is
 *  no filesystem (the edge), which returns the record in the envelope instead */
export function saveAudit(record: AuditRecord, root?: string): boolean {
  try {
    const fs = builtin<typeof import('node:fs')>('node:fs'), path = builtin<typeof import('node:path')>('node:path')
    const dir = path.join(root ?? process.cwd(), 'dist', 'evidence')
    fs.mkdirSync(dir, { recursive: true })
    fs.appendFileSync(path.join(dir, 'legal-audit.jsonl'), JSON.stringify(record) + '\n')
    return true
  } catch { return false }
}
