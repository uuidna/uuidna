#!/usr/bin/env node
// leads-gate — THE RELEASE GATE: no version ships while a lead is open.
//
// (the captain's order, 2026-08-25: "next release only possible if all leads verified. lead is anything not
// verified. automate")
//
// A commit may carry leads; that is what work in progress is, and guard already refuses the classes it can decide
// per commit. A RELEASE is a different act — it is telling the world the tree is what it says it is — so this
// runs on the release path and asks the one question the per-commit gate does not: is anything still unverified?
//
// THE READINGS ARE GATHERED HERE, THE VERDICT IS COMPUTED IN src/leads.ts. Same split the tree keeps everywhere:
// spawning and file reading are the boundary's job, the law is the library's, and the law can therefore be driven
// by a test with no checkout (see tests/leads.test.ts, which feeds it the refusals directly).
//
// EVERY SOURCE REPORTS WHETHER IT WAS READ. A source that throws does NOT contribute an empty list — it reports
// UNREAD and blocks, because an unread source and a clean source return the same empty list, and a gate that
// cannot tell them apart is the instrument theorem no_instrument_narrower_than_its_question forbids. This gate
// exists to refuse unverified claims; shipping on a census nobody managed to take would be one.
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { commitChange, renderPlan } from '../quantum/os/installer/index.js'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { leadCensus, renderCensus, read, unread, type Lead, type SourceReading } from '../leads.js'
import { sealedKeysIn } from '../refusal-trials.js'
import { buildTrialRecord, reopenedBecause } from './trial-refusals.js'
import { coverage } from '../publish.js'
import { gridGaps, pairsGaps } from '../grid.js'
import { theorems, theoremNeighbours } from '../theorems/index.js'

/** A LEAD IS OPEN UNTIL IT IS TRIED (the captain, 2026-09-14: "no version ships while a lead is held — exactly for this
 *  reason all leads go to trial before entering any list"). A lead that has had its trial is not waiting on one, whatever its
 *  verdict: verified, or open with its record and what it owes, both published with the version. So this source reads
 *  the TRIAL RECORD, and it answers only when the committed record is exactly what the court computes now — same seal
 *  over the inputs, the docket and every row. An absent record, or one whose seal differs (stale, or edited by hand),
 *  is UNREAD and blocks: a release never ships on a trial nobody can recompute. */
function ledgerLeads(): SourceReading {
  const p = join(ROOT, 'lean', 'refusal-trials.json')
  try {
    if (!existsSync(p)) return unread('ledger', 'lean/refusal-trials.json is absent — no lead has been tried, so every lead is open')
    const committed = JSON.parse(readFileSync(p, 'utf8')) as { seal?: string; trials?: { lead?: string }[] }
    const computed = buildTrialRecord()
    if (committed.seal !== computed.seal) {
      return unread('ledger', 'the trial record is not what the court computes now (stale, or edited) — run `npm run x -- trial-refusals`')
    }
    const tried = new Set((committed.trials ?? []).map((t) => String(t.lead ?? '').trim()))
    const open: Lead[] = computed.trials.filter((t) => !tried.has(t.lead.trim())).map((t) => ({
      source: 'ledger', what: t.lead,
      owes: 'its trial: npm run x -- trial-refusals — every lead is tried before it enters any list',
    }))
    // REOPENED BY DEFAULT: a refuted lead whose settlement does not recompute is open, and blocks a release like any
    // lead in trial — no one withdraws a settlement, its author can only prove what it meant
    const reopened: Lead[] = computed.trials.flatMap((t) => (t.settlement && !t.settlement.stands ? [{
      source: 'ledger', what: t.lead,
      owes: `the sealed theorem that proves what its settlement meant — ${reopenedBecause(t.settlement)}`,
    }] : []))
    return read('ledger', [...open, ...reopened], tried.size - reopened.length)
  } catch (e) {
    return unread('ledger', `the trial could not be recomputed (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** the coordinates where the ledger's own structure exposes an unsealed seat — a lonely principle, a broken grid
 *  seat, a pair gap. Each is a place the tree ALREADY KNOWS something is missing, which is the definition. */
function exposeLeads(): SourceReading {
  try {
    // the SAME three walks uuidna_expose serves, from the same primitives — one derivation, so the gate and the
    // served surface can never disagree about what is exposed
    const lonely = theorems().filter((t) => theoremNeighbours(t.key).count === 0)
    const open: Lead[] = [
      ...lonely.map((t) => ({ source: 'expose', what: `${t.key} is alone in its principle "${t.principle}" (${t.file})`, owes: 'a second theorem in that principle, or a sealed statement that one is genuinely enough' })),
      ...gridGaps().map((g) => ({ source: 'expose', what: g.what, owes: g.fix })),
      ...pairsGaps().map((g) => ({ source: 'expose', what: g.what, owes: g.fix })),
    ]
    return read('expose', open, theorems().length - lonely.length)
  } catch (e) {
    return unread('expose', `the coordinate walk threw (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** a sealed theorem shown in no monograph is a proof the reader cannot reach — verified in the kernel, unpublished
 *  in the record. coverage's per-theorem check is implied by its per-FILE one (a publication is
 *  composed of every theorem in its file), so this surfaces uncovered FILES as the load-bearing half. */
function coverageLeads(): SourceReading {
  try {
    const c = coverage()
    const open: Lead[] = c.uncoveredFiles.map((f) => ({
      source: 'coverage', what: `${f} carries sealed theorems and has no publication`,
      owes: 'a PRINCIPLE [file, title, blurb] entry in lean-ledger, so the proofs it holds are reachable by a reader',
    }))
    return read('coverage', open, c.covered)
  } catch (e) {
    return unread('coverage', `the coverage census threw (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** research-leads.json — what the support audit found unreachable and handed to R&D */
function researchLeads(): SourceReading {
  const p = join(ROOT, 'research-leads.json')
  try {
    if (!existsSync(p)) return unread('research', `${p} is absent — run npm run x -- support`)
    const j = JSON.parse(readFileSync(p, 'utf8')) as { leads?: { what?: string; fix?: string }[] }
    if (!Array.isArray(j.leads)) return unread('research', 'research-leads.json has no leads[] array — a shape drift')
    return read('research', j.leads.map((l) => ({
      source: 'research', what: String(l.what ?? 'an unreachable module'),
      owes: String(l.fix ?? 'wire it, or retire it — a module nothing reaches is unverified by construction'),
    })), 0)
  } catch (e) {
    return unread('research', `research-leads.json could not be parsed (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** THE DECLARED SOURCES. Adding one is a line here; the census does the rest, and a source that throws blocks
 *  rather than disappears. */
export const LEAD_SOURCES: readonly (() => SourceReading)[] = [ledgerLeads, exposeLeads, coverageLeads, researchLeads]

export function gatherLeads(): SourceReading[] {
  return LEAD_SOURCES.map((s) => {
    // a source that throws OUTSIDE its own try is still a reading, never a silence
    try { return s() } catch (e) { return unread(s.name || 'anonymous', `the source itself threw (${e instanceof Error ? e.message : String(e)})`) }
  })
}

// ── SETTLING IS A COMMAND NOW, NOT JSON SURGERY (the captain: "refusals and refutals do not stand in the way") ──
//
// Every lead settled in this session was settled the same way: a `node -e` that read lean/leads.json, spliced an
// entry from trial[] into refuted[], and wrote it back — followed by three generators run by hand, because
// docs/leads.md, docs/school.md and docs/open-questions.md all derive from that file and go stale the moment it
// moves. Forget one and the suite goes red on a surface nobody edited. measure.ts names this exactly: "a
// one-liner is manual work wearing computation's clothes — it computes, and it is not reusable, sealed, testable
// or citable." It was the most repeated manual act of the session, so it is the one most worth folding.
//
// THE LAW IS ENFORCED HERE RATHER THAN DISCOVERED LATER. A refutation without killed_by is exactly what the school
// test rejects, so this declines it at the door with the reason, instead of writing a record that fails a test three
// steps downstream. There is no refusal to settle into: a lead is proved, refuted by a measurement, or in trial
// (2026-09-14). And it never deletes: a settled lead moves, keeping what was tried, because the record of a dead end
// is the only thing that stops it being walked again.
const settleLead = (argv: readonly string[]): number => {
  const arg = (flag: string): string | null => {
    const i = argv.indexOf(flag)
    return i >= 0 && argv[i + 1] !== undefined ? String(argv[i + 1]) : null
  }
  const match = arg('--refute')
  const because = arg('--because')

  if (!match) {
    console.error('✗ settle — name the lead: --refute "<prefix>" --because "<the measurement that killed it>"')
    return 1
  }
  if (!because) { console.error('✗ settle — a refutation REQUIRES --because: what measurement killed it? An unexplained refutation is a deletion with extra steps.'); return 1 }

  // LEAN DECIDES THE REFUTATION: the measurement must name a sealed theorem as a whole identifier — prose alone
  // settles nothing (the captain, 2026-09-14). The trial reruns after the move, so no old verdict stays on file.
  const evidence = sealedKeysIn(because)
  if (evidence.length === 0) { console.error('✗ settle — --because names no sealed theorem. A lead is refuted by the kernel: cite the `by decide` theorem that decides it.'); return 1 }

  const path = join(ROOT, 'lean/leads.json')
  const record = JSON.parse(readFileSync(path, 'utf8')) as { trial: Record<string, unknown>[]; refuted: Record<string, unknown>[] }
  const before = record.trial.length + record.refuted.length
  // EXACTLY ONE LEAD: an ambiguous prefix would let the wording choose which lead is settled
  const hits = record.trial.flatMap((h, i) => (String(h.lead ?? '').startsWith(match) ? [i] : []))
  if (hits.length !== 1) {
    console.error(`✗ settle — ${hits.length} leads IN TRIAL start with ${JSON.stringify(match.slice(0, 60))}; name exactly one. Leads in trial now:`)
    for (const h of record.trial) console.error('    · ' + String(h.lead ?? '').slice(0, 96))
    return 1
  }
  const idx = hits[0]!
  // THE PLAN IS SHOWN BEFORE THE WRITE, apk-style, because settling REMOVES a lead from trial[] and a removal
  // that nobody sees is how content is lost (a `git checkout` on the conveyor discarded thirty accepted claims
  // the same session, and the ledger dropped 30 theorems with nothing reporting it). Here the removal is the
  // whole point, so it is allowed — but it is allowed EXPLICITLY, with the reason recorded in the call, and the
  // affected key is named rather than folded into a count.
  const trial0 = record.trial.map((h) => ({ key: String(h.lead ?? '').slice(0, 48) }))
  const [lead] = record.trial.splice(idx, 1)
  const trial1 = record.trial.map((h) => ({ key: String(h.lead ?? '').slice(0, 48) }))
  const commit = commitChange(trial0, trial1, { allowRemovals: true, reason: 'refuted with evidence' })
  for (const line of renderPlan(commit.plan, 'lead in trial')) console.log('  ' + line)

  record.refuted.push({ ...lead, killed_by: because, evidence })

  // AND THE TOTAL MUST NOT DROP. A lead moves between arrays; it is never destroyed, so the two lengths must sum to
  // what they summed to BEFORE anything moved — counted before the splice, not re-derived after it.
  const total0 = before
  const total1 = record.trial.length + record.refuted.length
  if (total0 !== total1) {
    console.error(`✗ settle — CONTENT WOULD BE LOST: ${total0} leads before, ${total1} after. A settled lead MOVES; nothing is written.`)
    return 1
  }
  writeFileSync(path, JSON.stringify(record, null, 2) + '\n')

  console.log(`✓ settle — REFUTED: ${String(lead.lead).slice(0, 72)}…`)
  console.log(`  in trial ${record.trial.length} · refuted ${record.refuted.length}`)

  // AND THE SURFACES FOLLOW IN THE SAME BREATH, which is the half that kept being forgotten. leads.json is the
  // source for three generated pages; settling without regenerating leaves a tree that is correct in its record
  // and red in its tests, which reads as a broken suite rather than as an unfinished act.
  for (const gen of ['trial-refusals.js', 'gen-leads.js', 'gen-school.js', 'gen-open-questions.js']) {
    try {
      execFileSync(process.execPath, [join(ROOT, 'dist/scripts', gen)], { cwd: ROOT, stdio: 'pipe' })
      console.log(`  ✓ ${gen}`)
    } catch (e) {
      console.error(`  ✗ ${gen} failed — the record moved but its surfaces did not: ${e instanceof Error ? e.message.slice(0, 120) : String(e)}`)
      return 1
    }
  }
  return 0
}

// THE ARC RUNS ONLY WHEN IT IS THE COMMAND — importing this module gives you the sources, running it renders the
// verdict and exits. Same guard every runner in this tree carries.
if (process.argv[1]?.endsWith('leads-gate.js')) {
  if (process.argv.includes('--settle')) process.exit(settleLead(process.argv.slice(2)))
  const census = leadCensus(gatherLeads())
  console.log('leads — A LEAD IS ANYTHING NOT VERIFIED. No release ships while one is open.\n')
  for (const line of renderCensus(census)) console.log(line)
  console.log(`\n  receipt ${census.receipt}`)
  if (!census.ready) {
    console.log('\n  Settle a lead only by the kernel\'s evidence:')
    console.log('    · seal it: a `by decide` theorem, after which it is not a lead at all')
    console.log('    · or refute it: npm run x -- leads-gate --settle --refute "<exact lead>" --because "<the sealed theorem that decides it>"')
    console.log('  A lead is never settled by deletion or by wording — the record keeps what was tried.')
  }
  process.exit(census.ready ? 0 : 1)
}
