// school/laboratory — LABS ENTANGLED TO THEOREMS AND RELATED RESOURCES, sufficient for every admitted domain.
//
// A world domain here is a skill `reviewDomains()` already admits. Every such domain gets a school lab:
//   computation — recompute the sealed arithmetic (classical state-vector for quantum; Layer 1 uuidna_exec for OS)
//   emulator   — the theorem compiled to 32 hexbit states plus the skill-matched shelf
// The lab of one theorem is the order-invariant fold of that theorem AND its related resources (cited sealed
// keys, PORTED benches this theorem names, the skill instrument). Verifying the whole verifies every part;
// altering any member moves the receipt (bell_no_signaling). Only members sealed by decide truly bind —
// Alpine published meaning and a browser shelf are extra SURFACES of the same handle, never extra STATES
// (handle_capacity_invariant_under_entanglement). Entanglement completes one theorem at a time.
//
// this is not a physics-world model. n_qubit_dimension counts the classical state-vector cost.
// A domain the ledger does not admit cannot pass the gates (legal_only_the_proven_is_admitted). The 28k
// Alpine catalogue is the warehouse, not the bench set. Nothing here installs, links, or runs Alpine ELF.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { hexbitDoorOf, UUID_HEXBITS } from '../../hexbit/index.js'
import { theoremByKey, theoremFor, skillGroups, reviewDomains, theorems, type Theorem } from '../../theorems/index.js'
import { defaultInstalls, type InstallSpec } from '../../quantum/os/index.js'
import { shelfForSkill } from '../../quantum/apps/skill-shelf.js'

export const LAB_CITES = [
  'a_spec_compiles_to_hexbits',
  'the_os_is_bootable_quantum',
  'n_qubit_dimension',
  'legal_only_the_proven_is_admitted',
  'handle_capacity_invariant_under_entanglement',
  'entanglement_completes_one_at_a_time',
  'bell_no_signaling',
  'the_terminal_is_the_toolbox',
] as const

const HONEST =
  'School labs are sufficient for every world domain the ledger admits (a skill in reviewDomains): each has a ' +
  'computation (recompute the sealed arithmetic; classical state-vector for quantum; Layer 1 uuidna_exec for OS) ' +
  'and an emulator (32 hexbit states plus the skill shelf). Labs are computationally entangled to the theorem and ' +
  'its related resources — one order-invariant receipt; only sealed members bind; extra surfaces are not extra ' +
  'states. A domain not admitted cannot pass the gates. Not a physics-world model. Integrity, not execution.'

const CITE = /(?:theorem\s+|\/theorem\/)([a-z][a-z0-9_]*)/g

const mentions = (name: string, hay: string): boolean =>
  new RegExp('(^|[^a-z0-9-])' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9-]|$)').test(hay)

export type LabKind = 'theorem' | 'citation' | 'bench' | 'instrument'
export type ComputationKind = 'recompute' | 'state-vector' | 'os-layer1' | 'weather-sample'

export interface LabMember {
  kind: LabKind
  id: string
  route: string
  address: string
  statement: string
  binds: boolean
}

export interface Lab {
  theorem: string
  skill: string
  members: LabMember[]
  verified: number
  receipt: string
  handle: string
  hexbits: number[]
  entangled: boolean
  cites: typeof LAB_CITES
  honest: string
}

export interface Computation {
  kind: ComputationKind
  route: string
  cites: string
}

export interface Emulator {
  route: string
  mount: string
  label: string
  hexbits: number
  cites: string
}

export interface DomainLab {
  domain: string
  sufficient: boolean
  theorems: number
  fold: string
  computation: Computation | null
  emulator: Emulator | null
  lab: Lab | null
  honest: string
}

export interface SchoolLabs {
  domains: number
  sufficient: boolean
  roster: { domain: string; computation: ComputationKind; emulator: string }[]
  receipt: string
  cites: typeof LAB_CITES
  honest: string
}

/** computationKind(skill) → the computation this capability already has. Named existing doors, never a new engine. */
export function computationKind(skill: string): ComputationKind {
  if (skill === 'quantum') return 'state-vector'
  if (skill === 'os' || skill === 'installs' || skill === 'catalogue') return 'os-layer1'
  if (skill === 'sailing') return 'weather-sample'
  return 'recompute'
}

const hayOf = (t: Theorem): string => t.key + ' ' + t.name + ' ' + t.statement

const relatedBenches = (t: Theorem): InstallSpec[] => {
  const hay = hayOf(t)
  return defaultInstalls().specs.filter((s) => s.name.length > 3 && mentions(s.name, hay))
}

const citedTheorems = (t: Theorem): Theorem[] => {
  const byKey = theoremByKey()
  const found: Theorem[] = []
  const seen = new Set<string>([t.key])
  for (const m of hayOf(t).matchAll(CITE)) {
    const key = m[1]!
    if (seen.has(key)) continue
    const hit = byKey.get(key)
    if (!hit) continue
    seen.add(key)
    found.push(hit)
  }
  return found
}

const member = (kind: LabKind, id: string, route: string, address: string, statement: string, binds: boolean): LabMember =>
  ({ kind, id, route, address, statement, binds })

/** labOf(key) → one theorem's lab, entangled with related resources. Unknown key: not sufficient, not entangled. */
export function labOf(key: string): Lab {
  const t = theoremFor(key)
  const empty: Lab = {
    theorem: key, skill: '', members: [], verified: 0, receipt: toUuid('lab|unknown|' + key),
    handle: '', hexbits: [], entangled: false, cites: LAB_CITES, honest: HONEST,
  }
  if (!t) {
    const door = hexbitDoorOf(empty.receipt)
    return { ...empty, handle: door.handle, hexbits: door.hexbits }
  }
  const shelf = shelfForSkill(t.skill)
  const members: LabMember[] = []
  const seen = new Set<string>()
  const add = (m: LabMember): void => {
    if (seen.has(m.address)) return
    seen.add(m.address)
    members.push(m)
  }
  add(member('theorem', 'uuidna/' + t.key, '/theorem/' + t.key, t.address, t.statement, true))
  for (const c of citedTheorems(t))
    add(member('citation', 'uuidna/' + c.key, '/theorem/' + c.key, c.address, c.statement, true))
  for (const s of relatedBenches(t))
    add(member('bench', s.id, s.route, s.address, s.meaning, false))
  add(member('instrument', 'shelf/' + t.skill, shelf.route, toUuid('lab-shelf|' + t.skill + '|' + shelf.route), shelf.label, false))
  const receipt = merkleGravity(members.map((m) => toUuid(m.address + '|' + m.kind + '|' + (m.binds ? 'VERIFIED' : 'UNVERIFIED'))))
  const door = hexbitDoorOf(receipt)
  return {
    theorem: t.key,
    skill: t.skill,
    members,
    verified: members.filter((m) => m.binds).length,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    entangled: members.length >= 2,
    cites: LAB_CITES,
    honest: HONEST,
  }
}

/** domainLab(domain) → the school lab for one admitted world domain. Unknown domain cannot pass the gates. */
export function domainLab(domain: string): DomainLab {
  const group = skillGroups().find((g) => g.skill === domain)
  if (!group) {
    return {
      domain, sufficient: false, theorems: 0, fold: '', computation: null, emulator: null, lab: null,
      honest: HONEST,
    }
  }
  const head = group.theorems[0]!
  const lab = labOf(head.key)
  const shelf = shelfForSkill(domain)
  const compKind = computationKind(domain)
  return {
    domain,
    sufficient: true,
    theorems: group.count,
    fold: group.fold,
    computation: {
      kind: compKind,
      route: compKind === 'os-layer1' ? '/terminal' : '/theorem/' + head.key,
      cites: compKind === 'state-vector' ? 'n_qubit_dimension'
        : compKind === 'os-layer1' ? 'the_os_is_bootable_quantum'
          : 'a_spec_compiles_to_hexbits',
    },
    emulator: {
      route: shelf.route,
      mount: shelf.mount,
      label: shelf.label,
      hexbits: UUID_HEXBITS,
      cites: 'a_spec_compiles_to_hexbits',
    },
    lab,
    honest: HONEST,
  }
}

/** schoolLabs() → one lab per admitted world domain. Sufficient iff every review domain has computation and emulator. */
export function schoolLabs(): SchoolLabs {
  const domains = reviewDomains()
  const labs = domains.map((d) => domainLab(d.domain))
  const roster = labs.map((l) => ({
    domain: l.domain,
    computation: l.computation!.kind,
    emulator: l.emulator!.route,
  }))
  const sufficient = labs.every((l) => l.sufficient && l.computation !== null && l.emulator !== null)
  return {
    domains: domains.length,
    sufficient,
    roster,
    receipt: merkleGravity(labs.map((l) => l.lab!.receipt)),
    cites: LAB_CITES,
    honest: HONEST,
  }
}

// ── ALL DOMAINS, BY FAMILY ───────────────────────────────────────────────────────────────────────────────────────────
//
// The captain, 2026-09-28: "develop all domains by family at school mcp os".
//
// schoolLabs() ALREADY COVERED ALL 131 ADMITTED DOMAINS AND NOTHING SERVED IT. mcp.ts imports labOf and not schoolLabs,
// so the roster existed, was correct, and was unreachable — the failure class this tree keeps meeting. What was missing
// besides a caller is the axis: 131 domains served flat is a list, and a family is the structure the ledger already has.
//
// A DOMAIN'S FAMILY IS ITS WINGS' FAMILY, which is `familyOf` — the same rule the entanglement census uses, borrowed
// rather than restated, because two derivations of "same family" that agree today are the drift this repository keeps
// catching. A domain whose theorems span several wing families is reported with ALL of them rather than assigned to the
// largest: picking one would invent a hierarchy the ledger does not carry.
//
// WHY THE FULL ROSTER IS NOT PUT ON THE WIRE. An open lead records that tools/list already grew past its sealed ceiling
// (168,373 bytes against 167,794), so adding 131 domains to every skill answer would push a measured breach further. The
// completeness belongs in the audit, where it is proven once; the wire carries the family of the skill actually asked
// for and the siblings inside it, which is what a caller can use.
import { familyOf } from '../../entanglement.js'

export interface FamilyLabs {
  family: string
  domains: string[]
  /** every domain in this family whose lab has both a computation and an emulator */
  sufficient: string[]
  receipt: string
}

/** the wing families a domain's sealed theorems live in — all of them, never the largest */
function familiesOf(domain: string): string[] {
  const group = skillGroups().find((g) => g.skill === domain)
  if (!group) return []
  return [...new Set(group.theorems.map((t) => familyOf(String(t.file))))].sort()
}

/**
 * Every admitted world domain, grouped by the wing family its theorems live in.
 *
 * COMPLETE OVER THE ADMITTED SET, and the completeness is asserted rather than assumed: every domain reviewDomains()
 * admits appears under at least one family, or it is returned in `unfamilied` — a domain the ledger admits and cannot
 * place is a fact about the ledger, and dropping it silently would make this roster shorter and cleaner than the truth.
 */
export function labsByFamily(): { families: FamilyLabs[]; domains: number; placed: number; unfamilied: string[]; receipt: string } {
  const domains = reviewDomains().map((d) => d.domain)
  const byFamily = new Map<string, string[]>()
  const unfamilied: string[] = []
  for (const d of domains) {
    const fams = familiesOf(d)
    if (fams.length === 0) { unfamilied.push(d); continue }
    for (const f of fams) byFamily.set(f, [...(byFamily.get(f) ?? []), d])
  }
  const families: FamilyLabs[] = [...byFamily.entries()].sort((a, b) => (b[1].length - a[1].length) || (a[0] < b[0] ? -1 : 1))
    .map(([family, ds]) => {
      const sufficient = ds.filter((d) => { const l = domainLab(d); return l.sufficient && l.computation !== null && l.emulator !== null })
      return { family, domains: ds, sufficient, receipt: merkleGravity(ds.map((d) => toUuid(`family|${family}|${d}`))) }
    })
  // PLACED IS A SET DIFFERENCE, not a sum of group sizes: a domain in two families would be counted twice by a sum and
  // would make `placed` exceed `domains`, which is the kind of total that agrees with arithmetic and not with the set.
  const placed = new Set([...byFamily.values()].flat()).size
  return {
    families, domains: domains.length, placed, unfamilied,
    receipt: merkleGravity(families.map((f) => f.receipt)),
  }
}

/** the family slice a caller can use: this domain's families and the siblings inside them, bounded and small */
function familySiblingsOf(domain: string): { families: string[]; siblings: string[] } {
  const fams = familiesOf(domain)
  const all = labsByFamily().families
  const siblings = [...new Set(fams.flatMap((f) => all.find((x) => x.family === f)?.domains ?? []))]
    .filter((d) => d !== domain).sort()
  return { families: fams, siblings }
}

// ── FAMILIES FROM DIFFERENT DOMAINS PROVE EACH OTHER ─────────────────────────────────────────────────────────────────
//
// The captain, 2026-09-28: "families from different domains prove each other. automate autonomy".
//
// WHAT THE CROSS IS. A domain's theorems live in wing files, and those files belong to families. When one domain's
// theorems sit in two families, those two families are sealed over the same subject by different wings — so each
// carries evidence for the other about that domain, and the shared domain is the link. That is the same shape as the
// quantity bridges in src/entanglement.ts, one level up: there a numeral carried by two wing families is a bridge; here
// a DOMAIN carried by two families is.
//
// IT IS SPARSE, AND THE NUMBER IS THE POINT. Measured 2026-09-28: 20 of 131 domains span more than one family, giving
// 197 linked pairs out of 13,366 possible — 1.5%. A cross census that came back dense would mean the families are not
// families; one that came back empty would mean the axis carries nothing. Reporting the density is what keeps either
// reading from passing unnoticed.
//
// TWO DERIVATIONS THAT MUST AGREE, which is what makes this automatable rather than advisory. The forward map is
// domain → families, read from each theorem's file. The reverse is family → domains, built by inverting it. They are
// inverses or the grouping is wrong, and a check that walks only one direction cannot tell a dropped domain from a
// domain that was never there. `crossesHold` is that agreement, and the finder refuses on it.

export interface FamilyCross {
  /** the two families, sorted, so a pair has one name */
  families: [string, string]
  /** the domains sealed in both — the evidence each family carries for the other */
  shared: string[]
}

export interface FamilyCrossCensus {
  domains: number
  families: number
  /** domains whose theorems live in more than one family — the only ones that can link anything */
  spanning: number
  crosses: FamilyCross[]
  /** linked pairs over pairs possible, in hundredths — an integer, because the determinism scan refuses Math.* */
  density: number
  possible: number
  /** the forward and reverse maps agree exactly: every domain placed is placed under each family it names, and back */
  crossesHold: boolean
  asymmetries: string[]
  receipt: string
}

export function familyCrosses(): FamilyCrossCensus {
  const domains = reviewDomains().map((d) => d.domain)
  // FORWARD walks the SKILL GROUPING: skillGroups() → this domain's theorems → their files → their families.
  const forward = new Map(domains.map((d) => [d, familiesOf(d)]))
  // REVERSE WALKS THE FLAT THEOREM LIST INSTEAD, and that independence is the whole value of the check. The first
  // version built `reverse` by inverting `forward`, so the two agreed BY CONSTRUCTION and `crossesHold` could never be
  // false — a green meaning only that the check never ran, which is the vacuous-success class this repository exists to
  // refuse, written by the hand that wrote the refusal. Now each theorem is read for its own `skill` and its own
  // `file`, so the two maps agree only if skillGroups() is a faithful partition of theorems(): a theorem missing from
  // its group, or a group claiming one the list does not carry, makes them disagree.
  const reverse = new Map<string, string[]>()
  for (const t of theorems()) {
    const fam = familyOf(String(t.file))
    const skill = String(t.skill ?? '')
    if (skill === '') continue
    const have = reverse.get(fam) ?? []
    if (!have.includes(skill)) reverse.set(fam, [...have, skill])
  }

  // THE INVERSE LAW, both directions. A family listing a domain that does not name it back, or a domain naming a family
  // that does not list it, is a grouping that has drifted from the theorems it was read out of.
  const asymmetries: string[] = []
  for (const [f, ds] of reverse) for (const d of ds) {
    if (!(forward.get(d) ?? []).includes(f)) asymmetries.push(`family ${f} lists ${d}, which does not name it`)
  }
  for (const [d, fams] of forward) for (const f of fams) {
    if (!(reverse.get(f) ?? []).includes(d)) asymmetries.push(`domain ${d} names ${f}, which does not list it`)
  }

  const pairs = new Map<string, string[]>()
  for (const [d, fams] of forward) {
    const f = [...fams].sort()
    for (let i = 0; i < f.length; i += 1) {
      for (let j = i + 1; j < f.length; j += 1) pairs.set(`${f[i]!}|${f[j]!}`, [...(pairs.get(`${f[i]!}|${f[j]!}`) ?? []), d])
    }
  }
  const crosses: FamilyCross[] = [...pairs.entries()]
    .sort((a, b) => (b[1].length - a[1].length) || (a[0] < b[0] ? -1 : 1))
    .map(([k, shared]) => ({ families: k.split('|') as [string, string], shared }))
  const families = reverse.size
  const possible = (families * (families - 1)) / 2
  // INTEGER HUNDREDTHS by comparison, never a float: (n*10000 - (n*10000 % possible)) / possible
  const scaled = crosses.length * 10000
  const density = possible > 0 ? (scaled - (scaled % possible)) / possible : 0
  return {
    domains: domains.length, families, spanning: [...forward.values()].filter((f) => f.length > 1).length,
    crosses, density, possible, crossesHold: asymmetries.length === 0, asymmetries: asymmetries.slice(0, 8),
    receipt: merkleGravity(crosses.map((c) => toUuid(`cross|${c.families[0]}|${c.families[1]}|${c.shared.join(',')}`))),
  }
}
