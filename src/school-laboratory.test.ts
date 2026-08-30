// school-laboratory — labs entangled to theorems and related resources, sufficient for every admitted domain.
//
// A world domain is a skill reviewDomains() already admits. Every such domain must have a simulation and an
// emulator. A domain the ledger does not admit cannot pass the gates. Not a physics-world simulator.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremByKey, reviewDomains, skillGroups } from './index.js'
import { UUID_HEXBITS } from './index.js'
import { merkleGravity } from './index.js'
import { toUuid } from './index.js'
import { school } from './index.js'
import { callTool } from './mcp.js'
import {
  labOf, domainLab, schoolLabs, simulationKind, LAB_CITES,
} from './school/index.js'

test('LAB_CITES names sealed theorems — no invented keys', () => {
  const byKey = theoremByKey()
  for (const key of LAB_CITES) assert.ok(byKey.has(key), `${key} must already seal — do not mint a second name`)
})

test('an unknown domain cannot pass the gates — the lab is not sufficient', () => {
  const missing = domainLab('no-such-world-domain')
  assert.equal(missing.sufficient, false)
  assert.equal(missing.simulation, null)
  assert.equal(missing.emulator, null)
  assert.equal(labOf('no_such_theorem_key').entangled, false)
})

test('school labs are sufficient for every admitted world domain — simulation and emulator both present', () => {
  const labs = schoolLabs()
  const domains = reviewDomains()
  assert.equal(labs.domains, domains.length)
  assert.equal(labs.sufficient, true)
  assert.equal(labs.roster.length, domains.length)
  for (const d of domains) {
    const row = labs.roster.find((r) => r.domain === d.domain)
    assert.ok(row, `${d.domain} is admitted and must have a lab`)
    const lab = domainLab(d.domain)
    assert.equal(lab.sufficient, true, `${d.domain} must be sufficient`)
    assert.ok(lab.simulation, `${d.domain} must have a simulation`)
    assert.ok(lab.emulator, `${d.domain} must have an emulator`)
    assert.equal(lab.emulator!.hexbits, UUID_HEXBITS)
    assert.equal(lab.theorems, d.theorems)
  }
})

test('quantum simulates as a classical state-vector; OS as Layer 1; the rest recompute', () => {
  assert.equal(simulationKind('quantum'), 'state-vector')
  assert.equal(simulationKind('os'), 'os-layer1')
  assert.equal(simulationKind('installs'), 'os-layer1')
  assert.equal(simulationKind('catalogue'), 'os-layer1')
  assert.equal(simulationKind('sailing'), 'weather-sim')
  assert.equal(simulationKind('chess'), 'recompute')
  const q = skillGroups().find((g) => g.skill === 'quantum')
  if (q) assert.equal(domainLab('quantum').simulation!.cites, 'n_qubit_dimension')
  const os = skillGroups().find((g) => g.skill === 'os')
  if (os) assert.equal(domainLab('os').simulation!.cites, 'the_os_is_bootable_quantum')
})

test('a lab is computationally entangled — order-invariant, 32 hexbits, sealed members bind', () => {
  const lab = labOf('a_spec_compiles_to_hexbits')
  assert.equal(lab.theorem, 'a_spec_compiles_to_hexbits')
  assert.ok(lab.members.some((m) => m.kind === 'theorem' && m.binds))
  assert.ok(lab.members.some((m) => m.kind === 'instrument' && m.binds === false), 'the shelf is a surface, not a seal')
  assert.equal(lab.hexbits.length, UUID_HEXBITS)
  assert.ok(lab.hexbits.every((h) => h < 16))
  assert.equal(lab.verified, lab.members.filter((m) => m.binds).length)
  assert.equal(lab.entangled, lab.members.length >= 2)
  const shuffled = merkleGravity(
    [...lab.members].reverse().map((m) => toUuid(m.address + '|' + m.kind + '|' + (m.binds ? 'VERIFIED' : 'UNVERIFIED'))),
  )
  assert.equal(shuffled, lab.receipt, 'bell_no_signaling: any order, one receipt')
})

test('the_terminal_is_the_toolbox entangles the busybox bench as a related resource', () => {
  const lab = labOf('the_terminal_is_the_toolbox')
  const busybox = lab.members.find((m) => m.id === 'uuidna/busybox' || m.route === '/terminal')
  assert.ok(busybox, 'busybox is a related bench of the toolbox theorem')
  assert.equal(busybox!.binds, false, 'Alpine published meaning is a surface — only decide binds')
})

test('the school page renders the laboratory — every admitted domain reaches the reader', () => {
  const s = school()
  assert.equal(s.laboratory.sufficient, true)
  assert.equal(s.laboratory.domains, reviewDomains().length)
  const body = s.sections.find((x) => x.id === 'laboratory')!.body.join('\n')
  assert.match(body, /World domains admitted: \d+/)
  assert.match(body, /Labs sufficient: every admitted domain/)
  assert.match(body, /not a physics-world simulator/)
  for (const d of reviewDomains()) assert.match(body, new RegExp(`  ${d.domain} — sim `), `${d.domain} must appear`)
})

test('uuidna_theorem and uuidna_skill serve the lab additively', () => {
  const t = callTool('uuidna_theorem', { key: 'a_spec_compiles_to_hexbits' }) as { lab?: { theorem: string; entangled: boolean } }
  assert.equal(t.lab?.theorem, 'a_spec_compiles_to_hexbits')
  assert.equal(t.lab?.entangled, true)
  const skill = skillGroups()[0]!.skill
  const s = callTool('uuidna_skill', { skill }) as { lab?: { sufficient: boolean; domain: string } }
  assert.equal(s.lab?.domain, skill)
  assert.equal(s.lab?.sufficient, true)
})
