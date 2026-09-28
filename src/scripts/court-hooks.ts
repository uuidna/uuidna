#!/usr/bin/env node
// @non-harmonic: reads the hook's stdin, the court's records, an exclusive directory lock and dist/evidence, and
// deposits to qpu storage — a named boundary; every verdict it records is computed by the pure court modules.
//
// court-hooks — THE COURT'S ONE HOOK, fused (the captain, 2026-09-14: "fuse all and reuse or no way to handle all at
// once"). Claude Code calls it on two events and it reads which from the event-name field of the hook's own input:
//
//  · PostToolUse — EVERY TOOL CALL AUDITED AS IT HAPPENS ("fuse all law apis as well so legal audit of all agent actions
//    is in realtime"; each receipt carries: "Everything deposited"). It extends the ONE legal-audit chain the MCP doors
//    extend (legal-audit.ts): resume from the last saved link, judge the call with every legal gate (law-audit.ts
//    auditAction), chain the record and save it at once, under an exclusive directory lock (mkdir is atomic) so parallel
//    calls never fork the chain. The receipt — the record (the addresses of the input and output, never their values),
//    the verdict and the hardware readings — is deposited to qpu storage through the MCP door, signed by its 2×7 theorems.
//
//  · Stop — THE COURT LAUNCHES THE INVESTIGATORS ON ANY DISRESPECT ("the court autonomously launches the investigators
//    on any disrespect"; how it wakes: "hooks"). If the court records a disrespect no wave has investigated
//    (trial-refusals courtOrders), the hook refuses the stop and hands the session the order to launch the 2×7 wave on
//    exactly those. A clean court stops and spends nothing; the hook's stop_hook_active field keeps it from blocking twice in a row.
import { mkdirSync, rmdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, DRAIN_PATHS } from './api.js'
import { resumeFromLog, auditCall, saveAudit } from '../legal-audit.js'
import { auditAction } from '../law-audit.js'
import { sealedKeysIn } from '../refusal-trials.js'
import { momentReadings } from './device-readings.js'
import { depositEvidence } from './receipt-deposit.js'
import { courtOrders } from './trial-refusals.js'
import { currentWriter, LOCK_PATH } from './one-writer.js'
import { laws } from '../laws.js'
import { toUuid } from '../address.js'
import { judge, recordGap } from './mcp-bypass.js'

import { statementOf, investigateAudits, transcriptsOf, type InvestigateReport } from './court-investigate.js'

// transcript_path: the Stop hook's court-investigate reads the session's own calls; cwd: the PreToolUse bypass guard
// judges whether a command runs inside this repository
interface HookInput { hook_event_name?: string; session_id?: string; transcript_path?: string; cwd?: string; stop_hook_active?: boolean; tool_name?: string; tool_input?: unknown; tool_response?: unknown }

// statementOf — the statement an action makes — lives in court-investigate.ts: the hook audits a call on it, and the
// investigator must recompute the gate on exactly the same statement, so there is one definition for both.

const LOCK = join(ROOT, 'dist', 'evidence', 'legal-audit.lock')
const withLock = async <T>(fn: () => T): Promise<T> => {
  mkdirSync(join(ROOT, 'dist', 'evidence'), { recursive: true })
  for (let tries = 0; ; tries++) {
    try { mkdirSync(LOCK); break } catch {
      if (tries > 400) throw new Error('court-hooks: the chain lock stayed held — another writer is stuck; nothing was recorded')
      await new Promise((r) => setTimeout(r, 25))
    }
  }
  try { return fn() } finally { rmdirSync(LOCK) }
}

const audit = async (call: HookInput): Promise<void> => {
  const tool = call.tool_name ?? 'unknown'
  const statement = statementOf(call.tool_input)
  const verdict = auditAction({ agent: `claude-code:${call.session_id ?? 'unknown'}`, tool, statement, cited: sealedKeysIn(statement) })
  const gate = { clean: verdict.clean, receipt: verdict.receipt, honesty: (verdict.honesty.binary === 0 ? 1 : 0) as 0 | 1 }
  const record = await withLock(() => {
    resumeFromLog(ROOT)
    const r = auditCall('claude-code', tool, call.tool_input ?? null, call.tool_response ?? null, gate)
    saveAudit(r, ROOT)
    return r
  })
  // qpu storage is read by anyone, so the deposit carries what the chained record carries — the addresses of the
  // input and output, never their values (a tool reads files and runs commands; its output is whatever it touched)
  const receipt = { record, verdict: { clean: verdict.clean, receipt: verdict.receipt, breaches: verdict.breaches.length }, readings: momentReadings() }
  await depositEvidence('legal-audit', receipt as Record<string, unknown>)
  if (!verdict.clean) console.error(`legal-audit — ${tool}: ${verdict.breaches.join('; ')}`)
  await proseOfTheEdit(call)
}

// ── THE ROUND TRIP, REMOVED ─────────────────────────────────────────────────────────────────────────────────────
//
// The captain, 2026-09-28: "why still manual work?!?" — asked after the sixth hand-reword of the same class of comment
// in one session.
//
// THE LOOP THAT WAS THE MANUAL WORK, measured on this session: write a comment that asserts a limit; commit; land;
// the landing runs twenty minutes of gate and refuses on that comment; reword it; land again. Five landings refused
// this way. Every refusal was CORRECT — the guard was right each time — and every repair was the same three-second
// edit arriving twenty minutes late. The cost was never the judgement, it was the distance between writing the
// sentence and being told about it.
//
// SO THE QUESTION IS ASKED WHERE THE SENTENCE IS WRITTEN. This hook already runs after every tool call ("compute all
// through hooks. no direct operations"), and it already had the file in hand — it audited the ACTION and never read
// what the action wrote. Now a Write/Edit to a source file is read back immediately and the finder's own words are
// printed. The refusal is the same refusal; it arrives while the sentence is still in view.
//
// WHY IT REPORTS AND NEVER REWRITES. Naming the cause of a limit is a judgement about what is true, and a hook that
// invented one would be manufacturing justifications — the same fault as a theorem dressed up to satisfy a gate. What
// is automated is the ASKING, which was the part being done by hand.
//
// IT NEVER BLOCKS AND NEVER THROWS. A hook that fails takes the session's next edit with it, so every step here is
// inside one catch and the worst case is silence. It reads ONE file, which is milliseconds against the whole-tree
// sweep the guard runs.
const proseOfTheEdit = async (call: HookInput): Promise<void> => {
  try {
    if (!/^(Edit|Write|MultiEdit)$/.test(call.tool_name ?? '')) return
    const input = (call.tool_input ?? {}) as { file_path?: unknown }
    const abs = typeof input.file_path === 'string' ? input.file_path : ''
    if (!abs.endsWith('.ts') || !abs.startsWith(ROOT)) return
    const rel = abs.slice(ROOT.length).replace(/^\//, '')
    if (!rel.startsWith('src/')) return
    const { impossibilityReading, declaredBaseline } = await import('./impossibility-gaps.js')
    const { gaps } = impossibilityReading([rel], declaredBaseline())
    if (gaps.length === 0) return
    console.error(`prose — ${rel}: ${gaps.length} limit(s) asserted with no cause named, and the gate will refuse them at the landing:`)
    for (const g of gaps.slice(0, 6)) console.error(`  ✗ ${g.what}`)
    console.error('  Name the cause in the same breath: a sealed theorem, "by construction", a host fact, a declared')
    console.error('  boundary, a named decision — or as a plain clause after a colon, "because", "since".')
  } catch { /* a hook that throws costs the session its next edit; silence is the only safe failure */ }
}

// THE COURT INVESTIGATES ITS OWN AUDIT ORDERS FIRST (2026-09-15). Every audit order used to be answered by a session
// running the same recomputation by hand; the investigator (court-investigate.ts) claims the orders for this session,
// classes every drained call from its own input, and records the result when nothing is unexplained. What it cannot
// explain — or a law down, which refuses any record — stays claimed by this session and is handed to it below.
const court = async (call: HookInput): Promise<void> => {
  if (call.stop_hook_active) return
  const inv = await investigateAudits({ claimant: `claude-code:${call.session_id ?? 'unknown'}`, transcripts: transcriptsOf(call.transcript_path), record: true })
    .catch((e: unknown): InvestigateReport => ({ claimed: [], resumed: [], calls: [], unexplained: [], recorded: 0, refused: `the investigator threw: ${e instanceof Error ? e.message : String(e)}` }))
  const open = inv.refused === null ? [] : [...inv.claimed, ...inv.resumed]
  const pending = [...courtOrders().pending, ...open]
  if (pending.length === 0) return
  const kinds = pending.reduce<Record<string, number>>((m, o) => ({ ...m, [o.kind]: (m[o.kind] ?? 0) + 1 }), {})
  const investigated = open.length
    ? ` The court's investigator holds ${open.length} audit order(s) for this session and recorded nothing: ${inv.refused}.` +
      (inv.unexplained.length ? ` Unexplained: ${inv.unexplained.slice(0, 12).map((c) => `${c.seq} ${c.tool} ${c.classes.join('/')} — ${c.context.slice(0, 160)}`).join('; ')}.` : '') +
      ' Read those calls (`npm run x -- court-investigate --claimant claude-code:<this session>` names them again) and append each result once a person has read it.'
    : ''
  console.log(JSON.stringify({
    decision: 'block',
    reason: `The court records ${pending.length} disrespect(s) no wave has investigated (${Object.entries(kinds).map(([k, n]) => `${n} ${k}`).join(', ')}).${investigated} ` +
      'Launch the 2×7 investigators on them now: the pending orders are in `node dist/scripts/trial-refusals.js --orders`; 7 investigators propose only what the kernel can check ' +
      '(a lead closes only as def lead_<handle> : Prop with theorem involution_<handle> : ¬ lead_<handle>), 7 witnesses recompute it and sign, and the VE_FACES signatures ' +
      'go to lean/witness-seals.json. CLAIM FIRST: before launching, append {address, kind, claimedBy: <this session>} per order to dist/evidence/investigations.jsonl, ' +
      'so no other session launches the same order (a claimed address leaves every session\'s pending list); append {address, kind, result} when the wave returns.',
  }))
}

// NO FUTURE AGENT VIOLATIONS (the captain, 2026-09-14: "ensure no future agent violations"). Two of the day's violations
// become impossible here rather than remembered:
//  · SessionStart — every session and agent in this repository begins with the standing laws in the captain's own
//    words (laws(), the same source uuidna_laws serves), before its first action.
//  · PreToolUse (Edit|Write) — the tree a landing holds is not written. An edit made while land certifies moves the tree
//    after it was proven green; the pre-push court then refuses and the whole certification runs again (measured the
//    same day: one agent's mid-landing edit cost a blocked push and a second full suite). The holder is read from the
//    one-writer lock, live only — a dead holder is stale by definition — so a crashed landing blocks nothing.
const brief = (): void => {
  const L = laws()
  const lines = L.laws.map((l) => `- ${l.law}${l.said ? ` — ${l.said}` : ''}${l.holds ? '' : ` [does not hold here${l.unmeasured ? `: ${l.unmeasured}` : ''}]`}`)
  const context = `uuidna's standing laws (uuidna_laws, ${L.laws.length} laws, receipt ${L.receipt}). Every tool call in this repository is audited against them as it happens, and the court refuses a stop while its orders are uninvestigated:\n` +
    lines.join('\n') +
    '\nAnd, enforced by this repository\'s hooks: the tree is never edited while a landing holds it (the edit is refused, and names the holder); quantum results are verified by their receipts through the uuidna-qpu and uuidna MCP doors (.mcp.json), not judged from reading code.'
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: context } }))
}

const guardLanding = (call: HookInput): void => {
  const input = (call.tool_input ?? {}) as { file_path?: unknown; notebook_path?: unknown }
  const file = String(input.file_path ?? input.notebook_path ?? '')
  if (!file.startsWith(ROOT + '/')) return
  const holder = currentWriter(LOCK_PATH)
  if (!holder) return
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny',
    permissionDecisionReason: `The tree is held by a live ${holder.purpose} (pid ${holder.pid}). An edit now moves the tree after it was proven green, so the pre-push court refuses the push and the certification runs again. Queue this edit until the landing pushes, or stop the landing first and certify once with the edit in.` } }))
}

// EASIER NOT TO BYPASS (the captain, 2026-09-15: "make sure it is easier not to bypass"). PreToolUse (Bash): an ad-hoc
// node -e / -p / --eval / tsx -e whose code imports this repository's dist/ or src/ is refused, and the refusal hands
// the session the exact `npm run mcp -- <tool> '<json>'` lines that replace it, found by the door's own search over
// the words of what the code imported (mcp-bypass.ts). The one escape states the gap — UUIDNA_MCP_GAP="…" — and the
// command then runs with the gap appended to dist/evidence/mcp-gaps.jsonl as a door request. The door is asked
// in-process (dist/scripts/mcp-call.js localDoor, the same callTool the hosted door runs), so a refusal needs no network.
const guardBypass = async (call: HookInput): Promise<void> => {
  const command = String((call.tool_input as { command?: unknown } | undefined)?.command ?? '')
  // the two declarations the judge reads instead of a list: what the drain protects, and what package.json declares
  // as an entry point. Both live in the tree already; copying either here is the allow list the law forbids.
  const scripts = ((): string[] => {
    try { return Object.keys((JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts?: Record<string, unknown> }).scripts ?? {}) }
    catch { return [] }
  })()
  const verdict = await judge({
    command, cwd: call.cwd ?? ROOT, root: ROOT, protectedPaths: DRAIN_PATHS, scripts,
    readFile: (p) => { try { return readFileSync(p, 'utf8') } catch { return null } },
    address: toUuid,
    suggest: async (words, tools) => {
      const { localDoor, suggestTools } = await import('./mcp-call.js')
      return suggestTools(await localDoor(), words, tools)
    },
  })
  if (verdict.kind === 'gap') { recordGap(ROOT, { ...verdict.record, ...(call.session_id ? { session: call.session_id } : {}) }); return }
  if (verdict.kind === 'refuse') console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: verdict.reason } }))
}

const main = async (): Promise<void> => {
  const call = ((): HookInput => { try { return JSON.parse(readFileSync(0, 'utf8')) as HookInput } catch { return {} } })()
  if (call.hook_event_name === 'PostToolUse') await audit(call)
  else if (call.hook_event_name === 'Stop') await court(call)
  else if (call.hook_event_name === 'SessionStart') brief()
  else if (call.hook_event_name === 'PreToolUse' && call.tool_name === 'Bash') await guardBypass(call)
  else if (call.hook_event_name === 'PreToolUse') guardLanding(call)
}

main().catch((e) => { console.error(`court-hooks: ${e instanceof Error ? e.message : String(e)}`); process.exitCode = 0 })
