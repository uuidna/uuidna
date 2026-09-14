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
//    calls never fork the chain. The full receipt — record, tool input and output, verdict, hardware readings — is
//    deposited to qpu storage under the record's link; without QPU_WRITE_TOKEN the deposit reports UNSENT.
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

interface HookInput { hook_event_name?: string; session_id?: string; stop_hook_active?: boolean; tool_name?: string; tool_input?: unknown; tool_response?: unknown }

/** the statement an action makes: every string the tool was handed, joined — the command, the path, the text written */
const statementOf = (input: unknown): string =>
  input && typeof input === 'object'
    ? Object.values(input as Record<string, unknown>).filter((v): v is string => typeof v === 'string').join(' ')
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
  const receipt = { record, input: call.tool_input ?? null, output: call.tool_response ?? null, verdict, readings: momentReadings() }
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

const main = async (): Promise<void> => {
  const call = ((): HookInput => { try { return JSON.parse(readFileSync(0, 'utf8')) as HookInput } catch { return {} } })()
  if (call.hook_event_name === 'PostToolUse') await audit(call)
  else if (call.hook_event_name === 'Stop') court(call)
}

main().catch((e) => { console.error(`court-hooks: ${e instanceof Error ? e.message : String(e)}`); process.exitCode = 0 })
