#!/usr/bin/env node
// trial-refusals — EVERY LEAD GOES TO TRIAL, AT ONCE, AND THE RECORD CANNOT BE EDITED WITHOUT BEING SEEN (the captain,
// 2026-09-14: "trial all leads with receipts", "lean decides", "consolidate so there is NO possibility to tamper").
//
// THE DOCKET is every lead the tree holds — lean/leads.json in trial and refuted, and the conveyor's candidates the kernel
// refused in lean/wave-queue.json — each identified by WHERE it is recorded (source, list, position) and a digest of its
// WHOLE row, not by a hash of its wording. Every string field of the row reaches the court. A source that is missing or
// unreadable STOPS the trial: an empty docket with a valid receipt would be a clean-looking record of nothing.
//
// THE VERDICT is the court's (src/refusal-trials.ts): a lead is verified only by the sealed theorems its own text names,
// each VERIFIED against the ledger AND carrying a kernel receipt that is FRESH — its wing's asked key recomputed here
// from the current wing text, the toolchain and the ledger's own key order, equal to what the axiom audit recorded —
// with no axiom named. A stale, missing or axiom-bearing receipt leaves the lead open.
//
// THE RECORD binds its inputs (digests of the docket sources, the served ledger, the axiom audit and the toolchain) and
// a seal over every row's full content. The guard recomputes buildTrialRecord() on every commit and refuses any
// difference, so a hand edit to any field, a stale record, or a skipped lead is refused by name.
// Nothing here removes a lead, mints a key, or moves a row between lists: a trial adds a verdict, it takes nothing.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { deviceReadings, measured, appendEvidence } from './device-readings.js'
import { depositEvidence } from './receipt-deposit.js'
import { researchSweep, RESEARCH_DOORS } from '../quantum/os/research/index.js'
import { collideRefusals, trialRefusal, sealedKeysIn, involutionOf, witnessSealOf, type Witness, type BookLeadInput, type KernelOk } from '../refusal-trials.js'
import { laws } from '../laws.js'
import { auditManipulation, type AuditRecord } from '../legal-audit.js'
import { handleOf } from '../handle.js'
import { wingAskedKey } from '../axiom-report.js'
import { theorems } from '../index.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid } from '../address.js'

/** read a source the trial cannot run without — missing or malformed is a STOP, never an empty list */
const requireJson = <T>(rel: string): T => {
  try { return JSON.parse(readFileSync(join(ROOT, rel), 'utf8')) as T }
  catch (e) { throw new Error(`trial-refusals: ${rel} is missing or unreadable (${e instanceof Error ? e.message : String(e)}) — no trial is taken on an absent source`) }
}
const optionalJson = <T>(rel: string): T | null => {
  try { return JSON.parse(readFileSync(join(ROOT, rel), 'utf8')) as T } catch { return null }
}
const text = (v: unknown): string => (typeof v === 'string' ? v : '')
const digestOf = (rel: string): string => toUuid(readFileSync(join(ROOT, rel), 'utf8'))
/** canonical JSON: keys sorted, so the same row always digests the same */
const canonical = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(canonical).join(',')}]`
    : v && typeof v === 'object' ? `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(',')}}`
      : JSON.stringify(v)
/** every string field of a row, except the ones already passed as lead and boundary, so no field is hidden from the court */
const restOf = (row: Record<string, unknown>, used: readonly string[]): string =>
  Object.keys(row).sort().filter((k) => !used.includes(k)).map((k) => { const v = row[k]; return typeof v === 'string' ? v : JSON.stringify(v) }).join(' ')

export interface DocketRow { lead: string; boundary: string; note: string; from: string; coord: string; digest: string }

/** the docket: every lead from every record that holds one, identified by where it is recorded */
export const docketOf = (): DocketRow[] => {
  const leads = requireJson<{ trial?: Record<string, unknown>[]; refuted?: Record<string, unknown>[] }>('lean/leads.json')
  const queue = requireJson<{ refused?: Record<string, unknown>[] }>('lean/wave-queue.json')
  if (!Array.isArray(leads.trial) || !Array.isArray(leads.refuted)) throw new Error('trial-refusals: lean/leads.json has no trial[]/refuted[] arrays — a shape drift, not an empty record')
  if (!Array.isArray(queue.refused)) throw new Error('trial-refusals: lean/wave-queue.json has no refused[] array — a shape drift, not an empty record')
  const rows: DocketRow[] = []
  const add = (from: string, i: number, row: Record<string, unknown>, lead: string, boundaryFields: readonly string[]): void => {
    const boundary = boundaryFields.map((f) => text(row[f])).filter(Boolean).join(' ')
    rows.push({ lead: lead.trim(), boundary, note: restOf(row, ['lead', ...boundaryFields]), from, coord: `${from}#${i}`, digest: toUuid(canonical(row)) })
  }
  leads.trial.forEach((r, i) => add('lean/leads.json trial', i, r, text(r.lead), ['boundary', 'owes']))
  leads.refuted.forEach((r, i) => add('lean/leads.json refuted', i, r, text(r.lead), ['killed_by', 'replaced_by']))
  queue.refused.forEach((c, i) => add('lean/wave-queue.json refused', i, c, text(c.why).trim() ? `${text(c.key)} — ${text(c.why)}` : text(c.key), ['reason', 'refusedBy']))
  return rows.filter((r) => r.lead.length > 0)
}

/** the kernel check: a theorem passes only when its wing's receipt was taken against the wing as it is NOW and the
 *  kernel named no axiom. Recomputed from the text — never trusted from the audit record's say-so. */
export const kernelCheckOf = (): { ok: KernelOk; receipts: Record<string, { wing: string; asked: string; fresh: boolean; axioms: string[] | null }> } => {
  const axioms = requireJson<{ wings?: Record<string, { asked: string; verdict: Record<string, string[]> }> }>('lean/axioms.json')
  const toolchain = readFileSync(join(ROOT, 'lean-toolchain'), 'utf8').trim()
  const byFile: Record<string, string[]> = {}
  for (const t of theorems()) (byFile[t.file] ||= []).push(t.key)
  const fileOf = new Map(theorems().map((t) => [t.key, t.file]))
  const freshWing = new Map<string, boolean>()
  const receipts: Record<string, { wing: string; asked: string; fresh: boolean; axioms: string[] | null }> = {}
  const ok: KernelOk = (key) => {
    const wing = fileOf.get(key)
    const w = wing ? axioms.wings?.[wing] : undefined
    if (!wing || !w) { receipts[key] = { wing: wing ?? '', asked: '', fresh: false, axioms: null }; return false }
    if (!freshWing.has(wing)) {
      let now = ''
      try { now = wingAskedKey(readFileSync(join(ROOT, 'lean', wing), 'utf8'), byFile[wing] ?? [], toolchain) } catch { now = '' }
      freshWing.set(wing, now !== '' && now === w.asked)
    }
    const fresh = freshWing.get(wing)!
    const found = key in w.verdict ? w.verdict[key]! : null
    receipts[key] = { wing, asked: w.asked, fresh, axioms: found }
    return fresh && Array.isArray(found) && found.length === 0
  }
  return { ok, receipts }
}

// ── REOPENED BY DEFAULT (the captain, 2026-09-14: "reopen by default so no escape for traitors"). A refutation
// stands only while its own evidence recomputes: its settlement names at least one sealed theorem, the kernel accepts
// every theorem it names (a fresh receipt, no axiom), and every file it cites is still in the tree. Anything else —
// prose alone, a stale receipt, a deleted file — reads as OPEN again, with the reason computed on every run. No one
// withdraws a settlement (the captain: "noone can withdraw. only can prove what they meant"): its text stays exactly as
// recorded, and only a sealed theorem that proves what it meant lets it stand again.
// AND IT MUST INVOLUTE INSIDE LEAN (refusal-trials.ts, involutionOf): the lead's claim stated as `lead_<handle> : Prop`
// and the kernel's proof of `involution_<handle> : ¬ lead_<handle>`. What the settlement cites is context, never the
// binding — no reading of a theorem decides a lead.
// AND IT MUST BE SIGNED AND SEALED BY THE 2×7 WITNESS ROSETTAS (the captain: "unless signed and sealed by the 2x7
// withness rosettas nothing is legal"): every one of the VE_FACES witnesses recomputed the involution and signed it,
// read from lean/witness-seals.json and re-signed here (refusal-trials.ts, witnessSealOf).
export interface Settlement { handle: string; cites: string[]; involution: string | null; kernelAccepted: boolean; involuted: boolean; witnesses: { signed: number; of: number; seal: string | null }; missing: string[]; stands: boolean }
type TreeFiles = { paths: Set<string>; names: Set<string> }
/** every file in the tree as it is now — tracked or not yet tracked, never ignored, and only if it exists on disk */
export const treeFiles = (): TreeFiles => {
  const list = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
    .split('\n').filter((p) => p && existsSync(join(ROOT, p)))
  return { paths: new Set(list), names: new Set(list.map((p) => p.slice(p.lastIndexOf('/') + 1))) }
}
const CITED_FILE = /(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_.-]+\.(?:ts|js|mjs|json|lean|md)\b/g
/** missingCited(text, files) → each file a settlement names that is not in the tree; a path is matched whole, a bare
 *  name by any file of that name, and a compiled `.js` name by its `.ts` source */
export const missingCited = (text: string, files: TreeFiles): string[] => {
  const known = (f: string): boolean => (f.includes('/') ? files.paths.has(f) : files.names.has(f))
  return [...new Set(text.match(CITED_FILE) ?? [])].filter((f) => !known(f) && !known(f.replace(/\.js$/, '.ts'))).sort()
}
/** settlementOf(row, kernelOk, files, nameOf) → for a refuted lead, whether its settlement stands: named, kernel-accepted,
 *  involuted back to this lead, every cited file present; null for any other row */
export const settlementOf = (d: DocketRow, ok: KernelOk, files: TreeFiles, sealed: readonly { key: string; statement: string }[], seals: Readonly<Record<string, Witness[]>>): Settlement | null => {
  if (!d.from.endsWith(' refuted')) return null
  const handle = handleOf(toUuid(d.lead))
  const cites = sealedKeysIn(d.boundary)
  const inv = involutionOf(handle, sealed)
  const involuted = inv !== null && inv.refutes
  const kernelAccepted = inv !== null && ok(inv.key)
  const w = inv ? witnessSealOf(inv.key, seals[inv.key] ?? []) : null
  const witnesses = { signed: w?.signed ?? 0, of: w?.of ?? 0, seal: w?.seal ?? null }
  const missing = missingCited(d.boundary, files)
  return { handle, cites, involution: inv?.key ?? null, kernelAccepted, involuted, witnesses, missing, stands: involuted && kernelAccepted && w?.legal === true && missing.length === 0 }
}
/** reopenedBecause(s) → the computed reason a settlement does not stand */
export const reopenedBecause = (s: Settlement): string => [
  !s.involution ? `its claim is not yet stated in Lean and refuted by the kernel (def lead_${s.handle}, theorem involution_${s.handle} : ¬ lead_${s.handle})` : '',
  s.involution && !s.involuted ? `the kernel proves lead_${s.handle} — the lead holds, the refutation was wrong` : '',
  s.involution && !s.kernelAccepted ? `the kernel has no fresh receipt for ${s.involution}` : '',
  s.involution && s.involuted && s.witnesses.seal === null ? `not signed and sealed by the 2×7 witness rosettas (${s.witnesses.signed} of ${s.witnesses.of} faces)` : '',
  s.missing.length ? `its settlement cites ${s.missing.length} file(s) no longer in the tree` : '',
].filter(Boolean).join('; ')

// ── THE COURT NAMES EVERY DISRESPECT AS AN INVESTIGATION ORDER (the captain, 2026-09-14: "the court autonomously
// launches the investigators on any disrespect"), fused into the court itself ("fuse all and reuse"). Each order is read
// from what the court records — a refuted lead whose settlement does not stand, a law whose `holds` is false, a drain
// or a broken link in the legal-audit chain — and content-addressed over what it is about and why, so the same
// disrespect is ordered once: an order whose address has a saved result in dist/evidence/investigations.jsonl is not
// launched again. The court's hook (court-hooks.ts, Stop) hands the pending ones to a 2×7 wave.
export interface Order { kind: 'settlement' | 'law' | 'audit'; subject: string; why: string; address: string }
const readLines = <T>(rel: string): T[] => {
  try { return readFileSync(join(ROOT, rel), 'utf8').split('\n').filter(Boolean).flatMap((l) => { try { return [JSON.parse(l) as T] } catch { return [] } }) } catch { return [] }
}
const orderOf = (kind: Order['kind'], subject: string, why: string): Order => ({ kind, subject, why, address: toUuid(`${kind}|${subject}|${why}`) })
/** courtOrders() → every disrespect the court records now, each once; `pending` drops those already investigated */
export function courtOrders(): { orders: Order[]; pending: Order[]; investigated: number } {
  const orders: Order[] = []
  const record = optionalJson<{ trials?: { coord?: string; lead?: string; settlement?: Settlement | null }[] }>('lean/refusal-trials.json')
  if (!record) orders.push(orderOf('settlement', 'lean/refusal-trials.json', 'the court has no trial record: no settlement has been tried'))
  for (const t of record?.trials ?? [])
    if (t.settlement && !t.settlement.stands) orders.push(orderOf('settlement', `${t.coord} ${t.settlement.handle} — ${String(t.lead ?? '').slice(0, 120)}`, reopenedBecause(t.settlement)))
  for (const l of laws().laws) if (!l.holds) orders.push(orderOf('law', l.law, `${l.enforcedBy} — ${l.detail}`))
  const m = auditManipulation(readLines<AuditRecord>('dist/evidence/legal-audit.jsonl'))
  if (m.chain) orders.push(orderOf('audit', `legal-audit chain at record ${m.chain.at}`, m.chain.why))
  for (const t of m.byTool) orders.push(orderOf('audit', `tool ${t.tool}`, `${t.drained} call(s) drained by the gate`))
  const done = new Set(readLines<{ address?: string }>('dist/evidence/investigations.jsonl').map((r) => r.address))
  return { orders, pending: orders.filter((o) => !done.has(o.address)), investigated: done.size }
}

/** courtSettlements() → the settlement of the refuted lead at position i, as the committed trial record states it — one
 *  reader for every page, so /leads and /school cannot disagree. No record, or a lead it does not name, gives null:
 *  a settlement nobody tried does not stand (reopened by default). */
export const courtSettlements = (): ((i: number) => Settlement | null) => {
  const record = optionalJson<{ trials?: { coord?: string; settlement?: Settlement | null }[] }>('lean/refusal-trials.json')
  const at = new Map((record?.trials ?? []).map((t) => [t.coord, t.settlement ?? null]))
  return (i) => at.get(`lean/leads.json refuted#${i}`) ?? null
}

/** the whole trial record, computed — the same function main writes and the guard recomputes to compare */
export function buildTrialRecord() {
  const docket = docketOf()
  const corpus = optionalJson<{ lead?: BookLeadInput[] }>('book-leads.json')?.lead ?? []
  const kernel = kernelCheckOf()
  const out = collideRefusals(docket, corpus, { kernelOk: kernel.ok })
  if (out.trials.length !== docket.length) throw new Error(`trial-refusals: ${docket.length} leads on the docket and ${out.trials.length} trials — every lead is tried, or nothing is written`)
  const files = treeFiles()
  const sealed = theorems().map((t) => ({ key: t.key, statement: String(t.statement) }))
  const seals = optionalJson<Record<string, Witness[]>>('lean/witness-seals.json') ?? {}
  const trials = out.trials.map((t, i) => ({ ...t, from: docket[i]!.from, coord: docket[i]!.coord, digest: docket[i]!.digest, settlement: settlementOf(docket[i]!, kernel.ok, files, sealed, seals) }))
  const inputs = {
    toolchain: readFileSync(join(ROOT, 'lean-toolchain'), 'utf8').trim(),
    'lean/leads.json': digestOf('lean/leads.json'),
    'lean/wave-queue.json': digestOf('lean/wave-queue.json'),
    'src/theorems/generated.ts': digestOf('src/theorems/generated.ts'),
    'lean/axioms.json': digestOf('lean/axioms.json'),
    'lean-toolchain': digestOf('lean-toolchain'),
  }
  const docketReceipt = merkleGravity(docket.map((d) => toUuid(`${d.coord}|${d.digest}`)))
  const unreceipted = Object.entries(kernel.receipts).filter(([, r]) => !r.fresh || r.axioms === null).map(([k]) => k).sort()
  const seal = merkleGravity([
    toUuid(canonical(inputs)),
    docketReceipt,
    ...trials.map((t) => toUuid(canonical(t))),
    toUuid(canonical(kernel.receipts)),
  ])
  const from: Record<string, number> = {}
  for (const d of docket) from[d.from] = (from[d.from] ?? 0) + 1
  return { ...out, trials, docket: from, docketReceipt, inputs, kernel: kernel.receipts, unreceipted, seal }
}

const main = async (): Promise<void> => {
  // EACH LEAD'S TRIAL IS SAVED THE MOMENT IT IS JUDGED, with the readings of that computation — so a stopped run loses
  // nothing, and every verdict carries the time and temperature it was taken at. The sealed record follows.
  const docket = docketOf()
  const corpus = optionalJson<{ lead?: BookLeadInput[] }>('book-leads.json')?.lead ?? []
  const kernelNow = kernelCheckOf()
  for (const d of docket) {
    const m = await measured(() => trialRefusal(d, corpus, kernelNow.ok))
    appendEvidence('trial-rows', {
      coord: d.coord, digest: d.digest, lead: d.lead, disposition: m.value?.disposition ?? null,
      sealedKeys: m.value?.sealedKeys ?? [], receipt: m.value?.receipt ?? null, readings: m.readings,
    })
  }
  const record = buildTrialRecord()
  writeFileSync(join(ROOT, 'lean', 'refusal-trials.json'), JSON.stringify(record, null, 1) + '\n')

  // LIVE EVIDENCE FOR THE COURT'S INVESTIGATORS (the captain, 2026-09-14: "fuse all related apis on the way to help court
  // with legal live evidence" · "not only law apis. all apis the court investigators need to professionally
  // investigate"). With --live-evidence, every lead on the docket is asked of EVERY research door in one wave — the law
  // publishers, the scholarly archives, the constants, the corpora (RESEARCH_DOORS, no special case) — with the lead's own
  // words as the topic. Each door's answer, reached or not and why, is saved the moment it arrives with the readings of
  // that computation, and deposited like every receipt. EVIDENCE BESIDE THE SEAL, NEVER IN IT: live answers move from
  // minute to minute and the seal must recompute on any machine; evidence informs the investigators, and only an
  // involution inside Lean closes a lead.
  if (process.argv.includes('--live-evidence')) {
    let answered = 0, rows = 0
    for (const d of docket) {
      const m = await measured(() => researchSweep(d.lead))
      const doors = m.value.map((r) => ({ door: r.source, reached: r.reached, why: r.why, evidence: r.evidence }))
      answered += doors.filter((x) => x.reached).length
      rows += doors.reduce((n, x) => n + x.evidence.length, 0)
      appendEvidence('trial-evidence', { coord: d.coord, digest: d.digest, lead: d.lead, seal: record.seal, doors, readings: m.readings })
    }
    console.log(`· live evidence — ${docket.length} lead(s) asked of ${RESEARCH_DOORS.length} door(s) each: ${answered} answer(s), ${rows} evidence row(s), saved to dist/evidence/trial-evidence.jsonl beside the seal`)
  }

  // THE RUN'S EVIDENCE, beside the seal: which machine computed these verdicts, in full, content-addressed, deposited
  // to qpu storage (the evidence store) with a local copy under dist/evidence — never folded into the seal, which must
  // recompute identically on any machine.
  const device = deviceReadings()
  const evidence = {
    kind: 'trial-run', repo: 'uuidna/uuidna', seal: record.seal, docketReceipt: record.docketReceipt, inputs: record.inputs,
    kernel: record.kernel, unreceipted: record.unreceipted, tried: record.trials.length,
    verified: record.trials.filter((t) => t.disposition === 'verified').length, device,
  }
  mkdirSync(join(ROOT, 'dist', 'evidence'), { recursive: true })
  writeFileSync(join(ROOT, 'dist', 'evidence', `trial-${record.seal}.json`), JSON.stringify(evidence, null, 1) + '\n')
  const sent = await depositEvidence('trial', evidence)
  console.log(sent.sent ? `  evidence deposited at ${sent.href} (${sent.status}) · device ${device.address}` : `  evidence UNSENT to qpu storage: ${sent.why} · local copy dist/evidence/trial-${record.seal}.json · device ${device.address}`)
  const n = record.trials.length
  const verified = record.trials.filter((t) => t.disposition === 'verified').length
  console.log(`✓ trial-refusals — ${n} leads tried (${Object.entries(record.docket).map(([k, c]) => `${c} ${k}`).join(' · ')})`)
  console.log(`  ${verified} verified · ${n - verified} open (in trial) · ${record.lean} name sealed theorems · ${record.collisionPairs} collision pairs`)
  console.log(`  kernel receipts: ${Object.keys(record.kernel).length - record.unreceipted.length} of ${Object.keys(record.kernel).length} fresh and axiom-free`)
  if (record.unreceipted.length) console.log(`  ✗ stale, missing or axiom-bearing: ${record.unreceipted.join(', ')}`)
  console.log(`  seal ${record.seal} · docket ${record.docketReceipt} · written to lean/refusal-trials.json`)
}

// --orders prints the court's investigation orders (courtOrders) and tries nothing — what the court's Stop hook hands a
// session; without it the court tries every lead
if (process.argv[1]?.endsWith('trial-refusals.js')) {
  if (process.argv.includes('--orders')) console.log(JSON.stringify(courtOrders()))
  else await main()
}
