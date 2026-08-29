// theorem-demos — every sealed theorem gets a browser demo: drill (proof of work) + skill shelf + Alpine witness.
// FREE MINT meets USE: the drill records recompute attempts (minting_is_two_per_theorem); Alpine apps harmonise
// by skill (integrity, not execution). Pure — no network.
import { drillOf, type TheoremLike } from './categories/practice/drill.js'
import { shelfForSkill } from './skill-shelf.js'
export { shelfForSkill } from './skill-shelf.js'

export interface TheoremDemo {
  key: string
  skill: string
  /** always present — recompute challenge on this page */
  drill: { route: string; mount: string; label: string }
  /** skill-matched store shelf */
  shelf: { route: string; mount: string; label: string }
  /** Alpine catalogue witness count — every theorem of a harmonised skill, plus cipher occupancy on the crypto tally */
  alpineApps: number
  /** Skill the catalogue door opens — cipher occupancy keys (even models/byte) search ssl */
  catalogueSkill: string
  honest: string
}

const HONEST =
  'Proof of work = recompute the sealed statement in the practice drill (recorded, order-invariant, never auto-sealed). ' +
  'Concept = the skill-matched browser shelf + harmonised Alpine packages (integrity, not execution). ' +
  'The drill presents; the student recomputes; minting follows only when the kernel seals.'

/** theoremDemoOf(key, skill[, alpineApps]) → drill + shelf routes for UI crosslinks. Pure. */
export function theoremDemoOf(key: string, skill: string, alpineApps = 0): TheoremDemo {
  const shelf = shelfForSkill(skill)
  return {
    key,
    skill,
    drill: { route: `/theorem/${key}`, mount: 'TheoremUse', label: 'In-page drill' },
    shelf,
    alpineApps,
    catalogueSkill: catalogueSkillOf(skill, key),
    honest: HONEST,
  }
}

export interface TheoremDemoCoverage {
  total: number
  drillable: number
  gaps: string[]
  ok: boolean
  honest: string
}

/** theoremDemoCoverage(ledger) → every sealed theorem must drill (drillOf must not throw). Pure. */
export function theoremDemoCoverage(ledger: readonly TheoremLike[]): TheoremDemoCoverage {
  const gaps: string[] = []
  for (const t of ledger) {
    try { drillOf(t.key, ledger) }
    catch { gaps.push(t.key) }
  }
  return {
    total: ledger.length,
    drillable: ledger.length - gaps.length,
    gaps,
    ok: gaps.length === 0,
    honest: HONEST,
  }
}

/** Cipher occupancy powers the Alpine crypto apps (those packages harmonise as skill `security`). */
const CRYPTO_POWER: readonly string[] = ['cipher', 'crypt-salt']

/** Occupancy census keys whose statements are the cipher widths — they power the same tally even when skill is models or byte. */
const CRYPTO_OCCUPANCY: readonly string[] = [
  'crypto_widths_are_fixed_not_sampled',
  'aead_nonce_and_salt_bits',
  'key_floor_is_one_uuid',
  'onion_layers_power_of_two',
  'digest_doubles_the_address',
  'sha256_is_four_sixtyfours',
]

function powersCrypto(skill: string, key: string): boolean {
  return CRYPTO_POWER.includes(skill) || CRYPTO_OCCUPANCY.includes(key)
}

function catalogueSkillOf(skill: string, key: string): string {
  return powersCrypto(skill, key) || skill === 'security' ? 'cipher' : skill
}

export interface AlpineSkillRow { skill?: string; theorem?: string; apps?: number }

/** alpineWitnessByTheorem(bySkill[, ledger]) → theorem key → harmonised app count.
 *  The heaviest witness still maps; when a ledger is given, every theorem of that skill does too, and
 *  cipher / crypt-salt theorems carry the security tally — occupancy that powers those apps. */
export function alpineWitnessByTheorem(
  bySkill: readonly AlpineSkillRow[],
  ledger: readonly { key: string; skill: string }[] = [],
): Map<string, number> {
  const appsBySkill = new Map<string, number>()
  const m = new Map<string, number>()
  for (const row of bySkill) {
    if (row.skill && row.apps) appsBySkill.set(row.skill, row.apps)
    if (row.theorem && row.apps) m.set(row.theorem, row.apps)
  }
  const cryptoApps = appsBySkill.get('security') ?? 0
  for (const t of ledger) {
    const n = appsBySkill.get(t.skill) ?? 0
    const extra = powersCrypto(t.skill, t.key) ? cryptoApps : 0
    const total = n + extra
    if (total) m.set(t.key, total)
  }
  return m
}

/** catalogueNeedleOf(skill[, key]) → the catalogue search that skill (or occupancy key) opens. Crypto occupancy searches ssl. */
export function catalogueNeedleOf(skill: string, key = ''): string {
  if (powersCrypto(skill, key) || skill === 'security') return 'ssl'
  if (skill === 'typesetting') return 'font'
  if (skill === 'codes') return 'checksum'
  if (skill === 'music-production') return 'audio'
  if (skill === 'editing') return 'video'
  if (skill === 'photography') return 'camera'
  if (skill === 'colour') return 'colour'
  if (skill === 'identifiers') return 'isbn'
  if (skill === 'calendar') return 'timezone'
  return skill
}
