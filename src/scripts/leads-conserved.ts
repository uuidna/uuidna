// leads-conserved — NO LEAD VANISHES, NONE ESCAPES ITS TRIAL, AND THE TRIAL RECORD CANNOT BE EDITED UNSEEN (the captain,
// 2026-09-14: "if you remove even a single lead without proper trial…", "consolidate so there is NO possibility to
// tamper").
//
// THE DAMAGE, INVOLUTED. The same night a session was asked to remove the refused CATEGORY and deleted its 21 leads
// outright; nothing in the gate noticed, and they came back only because git still held them. This is that act turned
// into the checks that refuse it, on every commit:
//   · every lead at HEAD is still in lean/leads.json — any list, same text — so a lead can MOVE and never vanish;
//   · every candidate the kernel refused at HEAD is still refused or has since been accepted;
//   · the committed trial record is EXACTLY what buildTrialRecord() computes now — its seal binds the inputs, the
//     docket and every field of every row, so a hand edit, a stale record or a skipped lead is refused by name.
//
// UNREAD IS NOT CLEAN. A HEAD that cannot be read reports conservation UNMEASURED as a gap, never an empty list.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { ROOT } from './api.js'
import type { Gap } from './landing-gaps.js'
import { buildTrialRecord } from './trial-refusals.js'

type LeadList = { lead?: unknown }[]
// `held` is the name the trial list carried until 2026-09-14; a HEAD from before the rename still spells it so, and
// a lead is conserved across the rename only if both spellings are read
export type LeadsRecordShape = { trial?: LeadList; held?: LeadList; refuted?: LeadList; refused?: LeadList }
type QueueShape = { refused?: { key?: unknown }[]; accepted?: { key?: unknown }[] }

const leadsOf = (r: LeadsRecordShape | null): string[] =>
  [...(r?.trial ?? []), ...(r?.held ?? []), ...(r?.refuted ?? []), ...(r?.refused ?? [])]
    .map((x) => (typeof x?.lead === 'string' ? x.lead : ''))
    .filter((l) => l.length > 0)

/** leadsMissingFrom(head, now) → one gap per lead at HEAD that the working record no longer holds. Pure. */
export function leadsMissingFrom(head: LeadsRecordShape, now: LeadsRecordShape | null): Gap[] {
  const present = new Set(leadsOf(now))
  return leadsOf(head).filter((l) => !present.has(l)).map((l) => ({
    what: `lean/leads.json: the lead "${l.slice(0, 90)}" is at HEAD and gone from the record — a lead leaves only by a verdict`,
    fix: 'restore it from HEAD (git show HEAD:lean/leads.json); to settle it, refute it with the sealed theorem that decides it (npm run x -- leads-gate --settle --refute "<exact lead>" --because "<theorem key>") — never delete it',
  }))
}

/** candidatesMissingFrom(head, now) → one gap per candidate the kernel refused at HEAD that is now neither refused
 *  nor accepted — a refused candidate may be re-probed and accepted, never dropped. Pure. */
export function candidatesMissingFrom(head: QueueShape, now: QueueShape | null): Gap[] {
  const keysOf = (xs: { key?: unknown }[] | undefined): string[] => (xs ?? []).map((x) => (typeof x.key === 'string' ? x.key : '')).filter(Boolean)
  const present = new Set([...keysOf(now?.refused), ...keysOf(now?.accepted)])
  return keysOf(head.refused).filter((k) => !present.has(k)).map((k) => ({
    what: `lean/wave-queue.json: the kernel-refused candidate ${k} is at HEAD and gone from the queue — it leaves only by being accepted`,
    fix: 'restore it from HEAD (git show HEAD:lean/wave-queue.json) — re-probe it through the conveyor to settle it, never delete it',
  }))
}

/** untriedLeads(trials, docket) → a gap when the trial record does not try every lead on the docket. Pure. */
export function untriedLeads(trials: { trials?: { lead?: unknown }[] } | null, docket: readonly string[]): Gap[] {
  if (!trials) return [{ what: 'lean/refusal-trials.json is absent — no lead has been tried', fix: 'npm run x -- trial-refusals — every lead is tried at once' }]
  // both sides trimmed, as the court trims a lead before its trial — the same lead, compared as the same text
  const tried = new Set((trials.trials ?? []).map((t) => (typeof t.lead === 'string' ? t.lead.trim() : '')))
  const missing = docket.filter((l) => !tried.has(l.trim()))
  return missing.length
    ? [{ what: `${missing.length} lead(s) on the docket have no trial — the first: "${missing[0]!.slice(0, 80)}"`, fix: 'npm run x -- trial-refusals — every lead is tried at once, with its receipts' }]
    : []
}

/** sealMismatch(committed, computed) → a gap when the committed trial record is not what the court computes now. Pure. */
export function sealMismatch(committed: { seal?: unknown } | null, computed: { seal: string }): Gap[] {
  if (!committed) return [{ what: 'lean/refusal-trials.json is absent — no lead has been tried', fix: 'npm run x -- trial-refusals' }]
  return committed.seal === computed.seal ? [] : [{
    what: `lean/refusal-trials.json is not what the court computes now (seal ${String(committed.seal ?? 'none').slice(0, 13)}… ≠ ${computed.seal.slice(0, 13)}…) — edited by hand, or stale against its inputs`,
    fix: 'npm run x -- trial-refusals — the record is recomputed from the leads, the ledger and the kernel\'s receipts, never edited',
  }]
}

const readJson = <T>(p: string): T | null => {
  try { return JSON.parse(readFileSync(p, 'utf8')) as T } catch { return null }
}
const atHead = <T>(rel: string): T => JSON.parse(execFileSync('git', ['show', `HEAD:${rel}`], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024 })) as T

/** the guard's reading: conservation against HEAD for both records, then the trial record against its recomputation */
export function leadsGuardGaps(): Gap[] {
  let headLeads: LeadsRecordShape, headQueue: QueueShape
  try { headLeads = atHead<LeadsRecordShape>('lean/leads.json'); headQueue = atHead<QueueShape>('lean/wave-queue.json') }
  catch {
    return [{ what: 'lean/leads.json or lean/wave-queue.json at HEAD could not be read — lead conservation is UNMEASURED, not clean', fix: 'run the guard inside the repository, with git available and both records committed' }]
  }
  const gaps = [
    ...leadsMissingFrom(headLeads, readJson<LeadsRecordShape>(join(ROOT, 'lean', 'leads.json'))),
    ...candidatesMissingFrom(headQueue, readJson<QueueShape>(join(ROOT, 'lean', 'wave-queue.json'))),
  ]
  let computed: ReturnType<typeof buildTrialRecord>
  try { computed = buildTrialRecord() }
  catch (e) { return [...gaps, { what: `the trial cannot be recomputed: ${e instanceof Error ? e.message : String(e)}`, fix: 'restore the missing source; no trial is taken on an absent one' }] }
  const committed = readJson<{ seal?: unknown; trials?: { lead?: unknown }[] }>(join(ROOT, 'lean', 'refusal-trials.json'))
  return [
    ...gaps,
    ...untriedLeads(committed, computed.trials.map((t) => t.lead)),
    ...sealMismatch(committed, computed),
  ]
}
