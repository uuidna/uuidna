import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VERSION — PAYLOAD'S VERSIONS/DRAFTS API, AS ARITHMETIC (chosen by the CMS API registry, not by hand). Keeping document
 *  history is numbers: the versions a doc retains, the ones pruned past the cap, autosaves in a session, the draft and
 *  published share, the wait until a scheduled publish, the steps a restore walks back, and the edit churn per day.
 *  Crosses to `payload` — version history is what the CMS stores. A measure. */

const PROOF = 'version arithmetic (retained versions, prune past cap, autosaves, draft/published share, scheduled wait, restore steps, edit churn); the CMS versions/drafts domain; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'version', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `version.${name}`, params })

export class VersionFormulas {
  /** KEEP: the versions a doc retains, capped at maxPerDoc. value min(versions, max). */
  static keep(versions: number, max: number): CrossFormula { return c('version-keep', 'keep(versions, max) = min(versions, max)', Math.min(versions, max), nat(versions, max), 'keep', [versions, max]) }
  /** PRUNE: the versions trimmed past the cap. value max(0, versions − max). */
  static prune(versions: number, max: number): CrossFormula { return c('version-prune', 'prune(versions, max) = max(0, versions − max)', Math.max(0, versions - max), nat(versions, max), 'prune', [versions, max]) }
  /** AUTOSAVE: the saves in a session at an interval. value ⌊minutes / interval⌋. */
  static autosave(minutes: number, interval: number): CrossFormula { return c('version-autosave', 'autosave(minutes, interval) = ⌊minutes / interval⌋', interval > 0 ? Math.floor(minutes / interval) : 0, nat(minutes, interval) && interval > 0, 'autosave', [minutes, interval]) }
  /** DRAFTS as a percentage of all versions. value ⌊draft · 100 / total⌋. */
  static drafts(draft: number, total: number): CrossFormula { return c('version-drafts', 'drafts(draft, total) = ⌊draft · 100 / total⌋', total > 0 ? Math.floor((draft * 100) / total) : 0, nat(draft, total) && total > 0 && draft <= total, 'drafts', [draft, total]) }
  /** PUBLISHED as a percentage of all versions. value ⌊pub · 100 / total⌋. */
  static published(pub: number, total: number): CrossFormula { return c('version-published', 'published(pub, total) = ⌊pub · 100 / total⌋', total > 0 ? Math.floor((pub * 100) / total) : 0, nat(pub, total) && total > 0 && pub <= total, 'published', [pub, total]) }
  /** SCHEDULED: the wait until a publish fires. value max(0, at − now). */
  static scheduled(now: number, at: number): CrossFormula { return c('version-scheduled', 'scheduled(now, at) = max(0, at − now)', Math.max(0, at - now), nat(now, at), 'scheduled', [now, at]) }
  /** RESTORE: the versions a restore walks back. value max(0, current − from). */
  static restore(from: number, current: number): CrossFormula { return c('version-restore', 'restore(from, current) = max(0, current − from)', Math.max(0, current - from), nat(from, current), 'restore', [from, current]) }
  /** CHURN: the edits per day. value ⌊edits / days⌋. */
  static churn(edits: number, days: number): CrossFormula { return c('version-churn', 'churn(edits, days) = ⌊edits / days⌋', days > 0 ? Math.floor(edits / days) : 0, nat(edits, days) && days > 0, 'churn', [edits, days]) }
}

for (const name of ['autosave', 'churn', 'drafts', 'keep', 'prune', 'published', 'restore', 'scheduled'] as const)
  hexRegisterOf('version', name, (VersionFormulas[name] as (...x: unknown[]) => unknown).bind(VersionFormulas))
