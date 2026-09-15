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
import { ROOT } from './api.js'
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

interface HookInput { hook_event_name?: string; session_id?: string; cwd?: string; stop_hook_active?: boolean; tool_name?: string; tool_input?: unknown; tool_response?: unknown }

/** the statement an action makes: every string the tool was handed, each on its own line — the command, the path, the
 *  text written. A line apiece keeps a Lean declaration that opens a written text at the start of its line, where the
 *  honesty gate reads it as a declaration (it defines a name) rather than as a citation of one */
const statementOf = (input: unknown): string =>
  input && typeof input === 'object'
    ? Object.values(input as Record<string, unknown>).filter((v): v is string => typeof v === 'string').join('\n')
    : String(input ?? '')

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
}

const court = (call: HookInput): void => {
  if (call.stop_hook_active) return
  const { pending } = courtOrders()
  if (pending.length === 0) return
  const kinds = pending.reduce<Record<string, number>>((m, o) => ({ ...m, [o.kind]: (m[o.kind] ?? 0) + 1 }), {})
  console.log(JSON.stringify({
    decision: 'block',
    reason: `The court records ${pending.length} disrespect(s) no wave has investigated (${Object.entries(kinds).map(([k, n]) => `${n} ${k}`).join(', ')}). ` +
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
  const verdict = await judge({
    command, cwd: call.cwd ?? ROOT, root: ROOT,
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
  else if (call.hook_event_name === 'Stop') court(call)
  else if (call.hook_event_name === 'SessionStart') brief()
  else if (call.hook_event_name === 'PreToolUse' && call.tool_name === 'Bash') await guardBypass(call)
  else if (call.hook_event_name === 'PreToolUse') guardLanding(call)
}

main().catch((e) => { console.error(`court-hooks: ${e instanceof Error ? e.message : String(e)}`); process.exitCode = 0 })
