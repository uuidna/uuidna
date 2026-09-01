// school/laboratory — LABS ENTANGLED TO THEOREMS AND RELATED RESOURCES, sufficient for every admitted domain.
//
// A world domain here is a skill `reviewDomains()` already admits. Every such domain gets a school lab:
//   simulation — recompute the sealed arithmetic (classical state-vector for quantum; Layer 1 uuidna_exec for OS)
//   emulator   — the theorem compiled to 32 hexbit states plus the skill-matched shelf
// The lab of one theorem is the order-invariant fold of that theorem AND its related resources (cited sealed
// keys, PORTED benches this theorem names, the skill instrument). Verifying the whole verifies every part;
// altering any member moves the receipt (bell_no_signaling). Only members sealed by decide truly bind —
// Alpine published meaning and a browser shelf are extra SURFACES of the same handle, never extra STATES
// (handle_capacity_invariant_under_entanglement). Entanglement completes one theorem at a time.
//
// this is not a physics-world simulator. n_qubit_dimension counts classical simulation cost.
// A domain the ledger does not admit cannot pass the gates (legal_only_the_proven_is_admitted). The 28k
// Alpine catalogue is the warehouse, not the bench set. Nothing here installs, links, or runs Alpine ELF.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { hexbitDoorOf, UUID_HEXBITS } from '../../hexbit/index.js'
import { theoremByKey, skillGroups, reviewDomains, type Theorem } from '../../theorems/index.js'
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
  'simulation (recompute the sealed arithmetic; classical state-vector for quantum; Layer 1 uuidna_exec for OS) ' +
  'and an emulator (32 hexbit states plus the skill shelf). Labs are computationally entangled to the theorem and ' +
  'its related resources — one order-invariant receipt; only sealed members bind; extra surfaces are not extra ' +
  'states. A domain not admitted cannot pass the gates. Not a physics-world simulator. Integrity, not execution.'

const CITE = /(?:theorem\s+|\/theorem\/)([a-z][a-z0-9_]*)/g

const mentions = (name: string, hay: string): boolean =>
  new RegExp('(^|[^a-z0-9-])' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9-]|$)').test(hay)

export type LabKind = 'theorem' | 'citation' | 'bench' | 'instrument'
export type SimulationKind = 'recompute' | 'state-vector' | 'os-layer1' | 'weather-sim'

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

export interface Simulation {
  kind: SimulationKind
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
  simulation: Simulation | null
  emulator: Emulator | null
  lab: Lab | null
  honest: string
}

export interface SchoolLabs {
  domains: number
  sufficient: boolean
  roster: { domain: string; simulation: SimulationKind; emulator: string }[]
  receipt: string
  cites: typeof LAB_CITES
  honest: string
}

/** simulationKind(skill) → the simulator this capability already has. Named existing doors, never a new engine. */
export function simulationKind(skill: string): SimulationKind {
  if (skill === 'quantum') return 'state-vector'
  if (skill === 'os' || skill === 'installs' || skill === 'catalogue') return 'os-layer1'
  if (skill === 'sailing') return 'weather-sim'
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
  const t = theoremByKey().get(key)
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
      domain, sufficient: false, theorems: 0, fold: '', simulation: null, emulator: null, lab: null,
      honest: HONEST,
    }
  }
  const head = group.theorems[0]!
  const lab = labOf(head.key)
  const shelf = shelfForSkill(domain)
  const simKind = simulationKind(domain)
  return {
    domain,
    sufficient: true,
    theorems: group.count,
    fold: group.fold,
    simulation: {
      kind: simKind,
      route: simKind === 'os-layer1' ? '/terminal' : '/theorem/' + head.key,
      cites: simKind === 'state-vector' ? 'n_qubit_dimension'
        : simKind === 'os-layer1' ? 'the_os_is_bootable_quantum'
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

/** schoolLabs() → one lab per admitted world domain. Sufficient iff every review domain has simulation and emulator. */
export function schoolLabs(): SchoolLabs {
  const domains = reviewDomains()
  const labs = domains.map((d) => domainLab(d.domain))
  const roster = labs.map((l) => ({
    domain: l.domain,
    simulation: l.simulation!.kind,
    emulator: l.emulator!.route,
  }))
  const sufficient = labs.every((l) => l.sufficient && l.simulation !== null && l.emulator !== null)
  return {
    domains: domains.length,
    sufficient,
    roster,
    receipt: merkleGravity(labs.map((l) => l.lab!.receipt)),
    cites: LAB_CITES,
    honest: HONEST,
  }
}
