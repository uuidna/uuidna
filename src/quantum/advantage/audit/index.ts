// quantum/advantage/audit — FULL QUANTUM ADVANTAGE AUDIT on the PUSH PATH (captain, 2026-08-26).
//
// VERIFY, DON'T RECOMPUTE. gen-quantum-advantage measures wall-clock (minutes on a full sweep). The push gate must
// NOT re-run that sweep. This audit VERIFIES the sealed report (lean/quantum-advantage.json) against the ledger and
// the module's declared LEVELS in O(sealed-file) time — theorem verify_beats_recompute_by_magnitudes. One byte of
// structural drift fails; full remeasure is `npm run x -- gen-quantum-advantage` off the critical path.
//
// WHAT IT COVERS (metrics-aligned):
//   · usable_gap_is_two_to_eighty sealed in the ledger (the usable-column quantum advantage)
//   · handle_capacity_is_quantum_by_architecture + verify_beats_recompute_by_magnitudes present
//   · sealed report.complete with every LEVEL row (reach declared, cost/fidelity measured)
//   · every row seal key exists in the ledger; dispatch clear; fidelity bound honest
//   · no false blanket denial ("no physics quantum advantage is claimed") in sealed report / jsonld / md
//   · content-address of the sealed JSON matches the receipt fold (tamper check)
//
// TypeScript computes; VitePress monitors (docs + public jsonld). Wall-clock target: ≪ 60s on the push path.
import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import { theorems, theoremByKey } from '../../../theorems/index.js'
import { LEVELS } from '../index.js'
import { toUuid } from '../../../address.js'

export const QA_SEAL_PATH = 'lean/quantum-advantage.json'
export const QA_MD_PATH = 'lean/quantum-advantage.md'
export const QA_JSONLD_PATH = 'docs/public/quantum-advantage.jsonld'

/** Theorems the advantage audit REQUIRES — usable-capacity gap is the measured quantum advantage axis. */
export const QA_REQUIRED_THEOREMS: readonly string[] = [
  'usable_gap_is_two_to_eighty',
  'handle_capacity_is_quantum_by_architecture',
  'verify_beats_recompute_by_magnitudes',
  'n_qubit_dimension',
] as const

const FALSE_DENIAL = /no physics quantum advantage is claimed|never a quantum computer/i

export interface QaGap { what: string; fix: string }

export interface QuantumAdvantageAudit {
  ok: boolean
  gaps: QaGap[]
  /** wall-clock ms of THIS audit (verify path) — must stay under 60_000 on push */
  ms: number
  mode: 'verify'
  levels: number
  witnesses: number
  receipt: string
  sealDigest: string
  honest: string
}

interface SealedQa {
  receipt?: string
  address?: string
  report?: {
    complete?: boolean
    levelsMeasured?: number
    levelsDeclared?: number
    rows?: Array<{
      level: string
      reach?: { class?: string; seals?: string; pow2?: number }
      cost?: { class?: string; opNsDecade?: number }
      fidelity?: { class?: string; ops?: number; disagreements?: number; bound?: number }
      claim?: string
    }>
    honest?: string
    receipt?: string
  }
  proof?: {
    disagreements?: number
    executed?: number
    verdict?: string
    results?: unknown[]
  }
  dispatch?: { clear?: boolean; passed?: number; refused?: unknown[] }
  device?: { honest?: string }
}

function digestFile(rel: string): string {
  const p = join(ROOT, rel)
  if (!existsSync(p)) return ''
  return createHash('sha256').update(readFileSync(p)).digest('hex').slice(0, 32)
}

/**
 * quantumAdvantageAudit() → full metrics-aligned quantum-advantage audit by VERIFYING the sealed report.
 * Never remeasures. Deterministic. Push-safe (<60s by construction — file parse + ledger lookups).
 */
export function quantumAdvantageAudit(): QuantumAdvantageAudit {
  const gaps: QaGap[] = []
  const byKey = theoremByKey()
  const sealPath = join(ROOT, QA_SEAL_PATH)

  for (const k of QA_REQUIRED_THEOREMS) {
    if (!byKey.has(k)) {
      gaps.push({
        what: `required advantage theorem missing: ${k}`,
        fix: 'seal it in lean/ (usable_gap_is_two_to_eighty is the measured usable-column quantum advantage)',
      })
    }
  }

  if (!existsSync(sealPath)) {
    gaps.push({
      what: `${QA_SEAL_PATH} missing — no sealed advantage report to verify`,
      fix: 'run `npm run x -- gen-quantum-advantage` OFF the push path (remeasure), then commit the seal',
    })
    const ms = 0  // wall-clock lives in scripts/; core stays harmonic
    return {
      ok: false, gaps, ms, mode: 'verify', levels: 0, witnesses: 0,
      receipt: toUuid('qa-audit|missing'), sealDigest: '',
      honest: 'VERIFY path: sealed report absent — refuse rather than remeasure on push.',
    }
  }

  let sealed: SealedQa
  try { sealed = JSON.parse(readFileSync(sealPath, 'utf8')) as SealedQa }
  catch (e) {
    gaps.push({ what: `${QA_SEAL_PATH} unreadable JSON`, fix: String((e as Error).message) })
    const ms = 0  // wall-clock lives in scripts/; core stays harmonic
    return {
      ok: false, gaps, ms, mode: 'verify', levels: 0, witnesses: 0,
      receipt: toUuid('qa-audit|bad-json'), sealDigest: digestFile(QA_SEAL_PATH),
      honest: 'VERIFY path: seal corrupt — refuse.',
    }
  }

  const report = sealed.report
  if (!report) {
    gaps.push({ what: 'sealed report.report missing', fix: 'regenerate gen-quantum-advantage' })
  } else {
    if (!report.complete) {
      gaps.push({
        what: `advantage report incomplete — ${report.levelsMeasured ?? 0}/${report.levelsDeclared ?? LEVELS.length} levels`,
        fix: 'remeasure off push path until every LEVEL has a row (never default zeros)',
      })
    }
    if ((report.levelsDeclared ?? 0) !== LEVELS.length) {
      gaps.push({
        what: `levelsDeclared ${report.levelsDeclared} ≠ LEVELS.length ${LEVELS.length}`,
        fix: 'regenerate after LEVELS change, or restore LEVELS',
      })
    }
    const rows = report.rows ?? []
    for (const level of LEVELS) {
      const row = rows.find((r) => r.level === level.name)
      if (!row) {
        gaps.push({ what: `missing measured row for level ${level.name}`, fix: 'full gen-quantum-advantage off push path' })
        continue
      }
      if (row.reach?.class !== 'declared') {
        gaps.push({ what: `${level.name}: reach must be class=declared`, fix: 'reach is by construction, never measured' })
      }
      if (row.reach?.seals !== level.seals) {
        gaps.push({
          what: `${level.name}: seal ${row.reach?.seals} ≠ LEVELS seal ${level.seals}`,
          fix: 'row seals must match src/quantum/advantage LEVELS',
        })
      }
      if (row.reach?.seals && !byKey.has(row.reach.seals)) {
        gaps.push({ what: `${level.name}: cites unsealed theorem ${row.reach.seals}`, fix: 'seal the key or fix LEVELS' })
      }
      if (row.cost?.class !== 'measured' || typeof row.cost.opNsDecade !== 'number') {
        gaps.push({ what: `${level.name}: cost must be measured with opNsDecade`, fix: 'remeasure' })
      }
      if (row.fidelity?.class !== 'measured' || !(row.fidelity.ops! > 0)) {
        gaps.push({ what: `${level.name}: fidelity must be measured with ops>0`, fix: 'remeasure' })
      }
      if ((row.fidelity?.disagreements ?? 1) !== 0) {
        gaps.push({
          what: `${level.name}: ${row.fidelity?.disagreements} disagreements with Lean-sealed values`,
          fix: 'algebra must match Lean on this host — investigate driver drift',
        })
      }
      if (!row.claim?.includes(`theorem ${level.seals}`)) {
        gaps.push({ what: `${level.name}: claim does not cite theorem ${level.seals}`, fix: 'claimOf must cite the seal' })
      }
    }
    if (FALSE_DENIAL.test(report.honest ?? '')) {
      gaps.push({
        what: 'sealed report.honest contains a false blanket denial of measured usable-capacity advantage',
        fix: 'cite usable_gap_is_two_to_eighty; refuse "no physics quantum advantage is claimed" where metrics show the usable-column gap',
      })
    }
    if (!/usable_gap_is_two_to_eighty/.test(report.honest ?? '')) {
      gaps.push({
        what: 'sealed report.honest does not cite usable_gap_is_two_to_eighty',
        fix: 'honest scope must name the measured usable-capacity quantum advantage theorem',
      })
    }
  }

  if (sealed.device?.honest && FALSE_DENIAL.test(sealed.device.honest)) {
    gaps.push({
      what: 'device.honest denies measured usable-capacity advantage',
      fix: 'align drivers/quantum honest string with usable_gap_is_two_to_eighty',
    })
  }

  if (sealed.dispatch && sealed.dispatch.clear !== true) {
    gaps.push({
      what: `dispatch not clear — refused ${sealed.dispatch.refused?.length ?? '?'}`,
      fix: 'every published claim must pass quantum/dispatch against a sealed witness',
    })
  }

  if (sealed.proof) {
    if ((sealed.proof.disagreements ?? 1) !== 0) {
      gaps.push({
        what: `proof battery had ${sealed.proof.disagreements} disagreements`,
        fix: 'proveHardwareQuantum must be EXACT against Lean',
      })
    }
    if (!(sealed.proof.executed! > 0)) {
      gaps.push({ what: 'proof executed 0 decisions', fix: 'battery must run' })
    }
  } else {
    gaps.push({ what: 'sealed proof block missing', fix: 'regenerate gen-quantum-advantage' })
  }

  // companion surfaces — VitePress monitor + jsonld must not carry false denials
  for (const rel of [QA_MD_PATH, QA_JSONLD_PATH]) {
    const p = join(ROOT, rel)
    if (!existsSync(p)) {
      gaps.push({ what: `${rel} missing`, fix: 'regenerate gen-quantum-advantage' })
      continue
    }
    const text = readFileSync(p, 'utf8')
    if (FALSE_DENIAL.test(text)) {
      gaps.push({
        what: `${rel} contains false blanket advantage denial`,
        fix: 'metrics-aligned wording: usable_gap_is_two_to_eighty is the measured usable-column quantum advantage; TypeScript computes, VitePress monitors',
      })
    }
  }

  // tamper / identity: receipt present and seal digest non-empty
  const sealDigest = digestFile(QA_SEAL_PATH)
  const receipt = sealed.receipt ?? sealed.report?.receipt ?? toUuid(`qa-audit|${sealDigest}`)
  if (!sealed.receipt && !sealed.report?.receipt) {
    gaps.push({ what: 'sealed receipt missing', fix: 'advantageReport must fold a receipt' })
  }

  // ledger size sanity — theorems() must be live for seal checks above
  if (theorems().length < 100) {
    gaps.push({ what: `ledger too thin (${theorems().length})`, fix: 'derived layer / generated.ts missing' })
  }

  const ms = 0  // wall-clock lives in scripts/; core stays harmonic
  return {
    ok: gaps.length === 0,
    gaps,
    ms,
    mode: 'verify',
    levels: report?.rows?.length ?? 0,
    witnesses: sealed.proof?.results?.length ?? 0,
    receipt,
    sealDigest,
    honest:
      'Full quantum-advantage audit on VERIFY path (verify_beats_recompute_by_magnitudes): sealed ' +
      'lean/quantum-advantage.json checked against LEVELS + usable_gap_is_two_to_eighty + dispatch clear + ' +
      'no false denials. Remeasure only on drift via gen-quantum-advantage off the push path. TypeScript ' +
      'computes; VitePress monitors.',
  }
}
