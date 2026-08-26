// unlocks — EACH THEOREM UNLOCKS what it seals `by decide`. The ledger IS the unlock board.
//
// Automation: never hand-author an unlock list. Census skills/files from theorems(); verify
// ILLUSTRATION keys still seal (examples for prose surfaces, not a closed set); fold to one receipt.
// Integrity — a missing illustration is a gap; an unsealed claim is simply unsealed, not "locked".
import { theorems, theoremByKey, type Theorem } from './theorems/index.js'
import { statementCensus } from './editorial.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

/** Illustration keys — prose may cite these; automation refuses if any vanish from the ledger. */
export const UNLOCK_ILLUSTRATIONS: readonly { key: string; label: string }[] = [
  { key: 'rosette_quantum_doubling_is_two_coins', label: 'coins fuse 64→128' },
  { key: 'euler_characteristic_two', label: 'χ=2' },
  { key: 've_twelve_vertices', label: '1×12 vertices' },
  { key: 'metonic_is_the_intercalation', label: 'calendar 144 (Metonic)' },
  { key: 'fock_window_exceeds_a_monthly_toll', label: 'calendar 144 (Fock months)' },
  { key: 'grover_quadratic_bound', label: 'Shor posture — no asymmetric target' },
  { key: 'sha256_grover_margin_is_the_address', label: 'Grover floor = address' },
  { key: 'handle_capacity_is_quantum_by_architecture', label: 'architectural QA' },
  { key: 'usable_gap_is_two_to_eighty', label: 'usable gap 2^80' },
  { key: 'captain_computes_only_with_two_coins', label: 'gate coins' },
  { key: 'two_coins', label: 'denomination 2' },
  { key: 'the_os_is_bootable_quantum', label: 'Alpine OS provenance' },
  { key: 'a_spec_compiles_to_hexbits', label: 'hexbit compile width' },
  { key: 'key_floor_is_one_uuid', label: 'cipher hexbit floor' },
  { key: 'n_qubit_dimension', label: 'classical simulation cost' },
  { key: 'hexbit_ring_mass_gap', label: 'hexbit ring mass gap' },
  { key: 'message_cap_is_four_hexbits', label: 'message cap = 4 hexbits' },
  { key: 'born_field_mass_gap_on_bell', label: 'Bell Born-field mass gap' },
]

export const UNLOCK_LAW =
  'Each sealed by-decide theorem unlocks exactly what it states — the ledger is the unlock board. ' +
  'No curated exception list; refusing a sealed key is refusing the captain. ' +
  'A claim with no theorem is unsealed, not “still locked.” ' +
  'Sufficient for finite by-decide seals and finite formal windows within climate/pandemic/poverty model-calcs; ' +
  'world solutions stack as waves of automation (deposit→validate→seal→falsify→receipt→next — npm run wave / hexbit-fast). ' +
  'Insufficient for those domains as full problem types, and for unbounded open math, nature-as-model, or justice — ' +
  'see /doctrine (computational claims only; waves do not erase ethics or politics).'

export interface UnlockCount { name: string; n: number }

export interface UnlockIllustration {
  key: string
  label: string
  present: boolean
  name?: string
}

export interface UnlockBoard {
  law: string
  keys: number
  distinct: number
  skills: number
  files: number
  bySkill: UnlockCount[]
  byFile: UnlockCount[]
  illustrations: UnlockIllustration[]
  illustrationsAllPresent: boolean
  missingIllustrations: string[]
  receipt: string
  honest: string
}

const countBy = (T: readonly Theorem[], field: 'skill' | 'file'): UnlockCount[] => {
  const m = new Map<string, number>()
  for (const t of T) {
    const k = String(t[field] ?? '')
    if (!k) continue
    m.set(k, (m.get(k) ?? 0) + 1)
  }
  return [...m.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name))
}

/** unlockBoard() → recomputable census of every sealed unlock. Pure / offline. */
export function unlockBoard(): UnlockBoard {
  const T = theorems()
  const census = statementCensus()
  const byKey = theoremByKey()
  const illustrations: UnlockIllustration[] = UNLOCK_ILLUSTRATIONS.map(({ key, label }) => {
    const t = byKey.get(key)
    return { key, label, present: !!t, name: t?.name }
  })
  const missingIllustrations = illustrations.filter((i) => !i.present).map((i) => i.key)
  const bySkill = countBy(T, 'skill')
  const byFile = countBy(T, 'file')
  const receipt = merkleGravity([
    toUuid(`unlocks|${T.length}|${census.distinct}`),
    ...T.slice(0, 8).map((t) => toUuid(t.key)),
    ...illustrations.map((i) => toUuid(`${i.key}:${i.present ? 1 : 0}`)),
  ])
  return {
    law: UNLOCK_LAW,
    keys: T.length,
    distinct: census.distinct,
    skills: bySkill.length,
    files: byFile.length,
    bySkill,
    byFile,
    illustrations,
    illustrationsAllPresent: missingIllustrations.length === 0,
    missingIllustrations,
    receipt,
    honest:
      'Unlocks are computed from theorems() — every key unlocks its statement. Illustrations are presence checks, not a closed unlock set. Integrity.',
  }
}

/** Markdown block for README / home — derived, never hand-edited. */
export function unlockReadmeBlock(base = 'https://uuidna.com'): string {
  const b = unlockBoard()
  const cites = b.illustrations
    .filter((i) => i.present)
    .map((i) => `[${i.key}](${base}/theorem/${i.key})`)
  const illus = cites.length
    ? `Illustrations (not a closed set; automation verifies each still seals): ${cites.join('; ')}.`
    : 'Illustration keys missing — regenerate after sealing.'
  return [
    `**Each theorem unlocks.** ${UNLOCK_LAW}`,
    `Board: **${b.distinct.toLocaleString('en-US')}** distinct / **${b.keys.toLocaleString('en-US')}** keys · **${b.skills}** skills · **${b.files}** Lean files · receipt \`${b.receipt}\`.`,
    illus,
    `Full census: [${base}/unlocks](${base}/unlocks) · \`lean/unlocks.json\`.`,
  ].join('\n')
}

/** Compact VitePress home fragment (injected between unlocks markers). */
export function unlockHomeFragment(): string {
  const b = unlockBoard()
  const keys = b.illustrations.filter((i) => i.present).slice(0, 8).map((i) => `[\`${i.key}\`](/theorem/${i.key})`)
  return [
    `**Each theorem unlocks.** Every sealed \`by decide\` key unlocks exactly what it states — the ledger is the unlock board (**${b.distinct}** distinct / **${b.keys}** keys). No curated exception list.`,
    `World solutions stack as waves of automation — [/waves](/waves) · [doctrine](/doctrine#world-solutions--waves-of-automation).`,
    `Illustrations: ${keys.join(' · ')}. Full board: [/unlocks](/unlocks). Unsealed ≠ “still locked.”`,
  ].join(' ')
}
