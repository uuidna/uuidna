// run-evidence — THE SAVED RECEIPTS OF A RUN, IN ONE CALL (the captain, 2026-09-14: "always improve mcp to handle all
// possible load with less possible effort and cost"). Every kernel receipt and trial row is saved with its readings the
// moment it is computed (src/scripts/device-readings.ts appendEvidence → dist/evidence/<run>.jsonl). Putting that on a
// screen took several scripts; this answers it in one call — how many are saved, the latest ones with their time and
// temperatures, and the die range across the run — compact, so the answer is cheap to carry.
//
// node:fs and node:path ride LAZILY through the runtime's own registry (the api.ts law, as wave-deposit does): the hosted
// edge has no filesystem, and there the answer says where the run evidence lives instead of reading nothing as clean.
import { toUuid } from './address.js'
import { auditManipulation, type AuditRecord } from './legal-audit.js'

// @non-harmonic: reads the run's saved receipt logs from dist/evidence through the host's filesystem — a named
// boundary, like device-readings; it decides nothing, and on the edge (no filesystem) it answers "not measured".
// investigation-log: every investigator and verifier of a 2×7 wave appends what it did and what the kernel said, as it
// goes, so the court observes the investigation through this door rather than waiting for the last report
export const RUN_LOGS = ['axioms-receipts', 'trial-rows', 'legal-audit', 'trial-evidence', 'investigation-log'] as const

type Temp = { measured?: boolean; millikelvin?: number; source?: string }
type Row = { file?: string; coord?: string; tool?: string; family?: string; readings?: { ns?: string; die?: unknown; battery?: Temp | null } }

const builtin = <T>(id: string): T => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule(id) as T
const hi = (xs: readonly number[]): number | null => (xs.length ? xs.reduce((m, v) => (v > m ? v : m)) : null)
const lo = (xs: readonly number[]): number | null => (xs.length ? xs.reduce((m, v) => (v < m ? v : m)) : null)

/** runEvidence(run, latest?, root?) → the saved receipts of one run log, compact — or measured:false with where they live */
export function runEvidence(run: string, latest = 10, root?: string) {
  if (!(RUN_LOGS as readonly string[]).includes(run)) return { run, measured: false as const, why: `run must be one of ${RUN_LOGS.join(', ')}` }
  let text: string
  try {
    const fs = builtin<typeof import('node:fs')>('node:fs'), path = builtin<typeof import('node:path')>('node:path')
    text = fs.readFileSync(path.join(root ?? process.cwd(), 'dist', 'evidence', `${run}.jsonl`), 'utf8')
  } catch {
    return { run, measured: false as const, why: `no ${run} log is readable here — run evidence is saved on the host that ran it (dist/evidence/${run}.jsonl) and deposited to qpu storage under receipts/uuidna/${run}/<address> once QPU_WRITE_TOKEN is bound` }
  }
  const rows = text.split('\n').filter(Boolean).flatMap((l) => { try { return [JSON.parse(l) as Row] } catch { return [] } })
  // A CHANNEL THAT NEVER CHANGES IS NOT MEASURING THE COMPUTATION (measured 2026-09-14: of 63 channels, PMU tcal ×2 at a
  // fixed 51.85 °C, five gas-gauge values and NAND CH0 did not move between reads, and PMU tcal passed for the hottest
  // die on every receipt). Across the run a channel — its name and its position — whose value never changes is listed as
  // constant, and the range and the hottest channel are computed over the channels that varied. No name list: the
  // readings decide. One receipt has no second value to vary from (by construction), so then every channel counts and the answer says so.
  const tempsOf = (r: Row): Temp[] => (Array.isArray(r.readings?.die) ? r.readings!.die as Temp[] : [])
  const channelOf = (d: Temp, i: number): string => `${d.source ? d.source.replace(/^die sensor /, '').replace(/, IOHIDEventSystem.*$/, '') : 'channel'} #${i}`
  const seen = new Map<string, Set<number>>()
  for (const r of rows) tempsOf(r).forEach((d, i) => {
    if (!d.measured || typeof d.millikelvin !== 'number') return
    const c = channelOf(d, i)
    ;(seen.get(c) ?? seen.set(c, new Set()).get(c)!).add(d.millikelvin)
  })
  const varying = new Set([...seen].filter(([, v]) => v.size > 1).map(([c]) => c))
  const judged = varying.size > 0
  const constant = judged ? [...seen].filter(([c]) => !varying.has(c)).map(([channel, v]) => ({ channel, millikelvin: [...v][0]! })) : []
  const view = (r: Row) => {
    const temps = tempsOf(r).flatMap((d, i) => (d.measured && typeof d.millikelvin === 'number' && (!judged || varying.has(channelOf(d, i))) ? [{ channel: channelOf(d, i), mk: d.millikelvin }] : []))
    const hot = temps.reduce<{ channel: string; mk: number } | null>((m, t) => (m === null || t.mk > m.mk ? t : m), null)
    return { what: r.file ?? r.coord ?? r.tool ?? r.family ?? '', ns: r.readings?.ns ?? null, dieMax: hot?.mk ?? null, dieMaxSensor: hot?.channel ?? null, dieMin: lo(temps.map((t) => t.mk)), battery: r.readings?.battery?.millikelvin ?? null, address: toUuid(JSON.stringify(r)) }
  }
  const all = rows.map(view)
  const maxes = all.flatMap((v) => (v.dieMax === null ? [] : [v.dieMax]))
  return {
    run, measured: true as const, saved: rows.length,
    // the audit log is evidence of every agent action: read back, it measures manipulation (legal-audit.ts)
    ...(run === 'legal-audit' ? { manipulation: auditManipulation(rows as unknown as AuditRecord[]) } : {}),
    dieRange: { coolestMax: lo(maxes), hottestMax: hi(maxes), unit: 'mK', over: judged ? `${varying.size} channel(s) that varied across the run` : 'every channel — a single receipt cannot show variation', constant },
    latest: all.slice(latest > 0 ? -latest : all.length),
    receipt: toUuid(all.map((v) => v.address).join(',')),
  }
}
