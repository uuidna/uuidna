// Cooled out of index.ts by the heat family (scripts/cool.mjs): quantumOf, qpuQuantumHolds.
import {
  coins,
  cors,
  jsonldHoldsOf,
  mintOf,
  n,
  onceOf,
  capacityHolds,
  capacityOf,
  contextOf,
  cssHolds,
  cssOf,
  cubeOf,
  designHolds,
  designOf,
  evidenceHolds,
  qpuEvidenceOf,
  facesOf,
  genesisHolds,
  genesisOf,
  glossaryOf,
  qpuHandleOf,
  neuroHolds,
  neuroOf,
  purposeHolds,
  purposeOf,
  sequenceHolds,
  qpuSequenceOf,
  shorHolds,
  shorOf,
  speedHolds,
  speedOf,
  schemaOrg,
  seed,
  unit,
} from './index.js'
import { circuitOf, circuitHolds } from './circuit.js'
import { qpuDocsOf, docsHolds } from './readme.js'
import { embeddedConstants } from './embedded.js'

/**
 * The quantum document: circuit, lattice, Shor run, sequence, purpose, evidence, network and design readings in one JSON-LD document.
 * @wing quantum
 * @kind builder
 * @evidence qpuQuantumHolds
 */
/** Runtime reads the drift-checked embed so a cold isolate never JIT-compiles quantumLiveOf; falls back to live.
 *  The gate recomputes live at push via quantumLiveOf (embed-lean regenerates + the drift-guard asserts equality). */
export const quantumOf = onceOf((): ReturnType<typeof quantumLiveOf> => (embeddedConstants.quantum as ReturnType<typeof quantumLiveOf> | undefined) ?? quantumLiveOf())
export const quantumLiveOf = onceOf(() => {
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  const fused = faces.faces * handle.kv.amplitudes
  const docs = qpuDocsOf()
  const capacity = capacityOf()
  const speed = speedOf()
  const circuit = circuitOf()
  const shor = shorOf()
  const sequence = qpuSequenceOf()
  const neuro = neuroOf()
  const design = designOf()
  const genesis = genesisOf()
  const css = cssOf('', genesis)
  const purpose = purposeOf(circuit, shor, sequence, capacity)
  const evidence = qpuEvidenceOf(circuit, shor)
  const holds =
    unit.holds &&
    cube.holds &&
    handle.holds &&
    faces.holds &&
    docs.holds &&
    capacity.holds &&
    speed.holds &&
    circuit.holds &&
    shorHolds(shor) &&
    sequence.holds &&
    purpose.holds &&
    evidence.holds &&
    neuro.holds &&
    design.holds &&
    genesisHolds(genesis) &&
    cssHolds(css) &&
    fused === faces.faces * mintOf(cube.bits + seed) &&
    fused === faces.faces * mintOf(cube.vertices * cube.hexbit + seed) &&
    mintOf(cube.hexbit) === mintOf(n + seed) &&
    mintOf(cube.hexbit) > seed &&
    mintOf(cube.bits + seed) === handle.amplitudes + handle.amplitudes &&
    faces.faces * mintOf(cube.bits + coins) === fused + fused
  return {
    '@context': contextOf(),
    '@type': 'SoftwareApplication' as const,
    '@id': unit.origin,
    kind: 'quantum' as const,
    only: circuit.only,
    lattice: circuit.lattice,
    circuit,
    shor,
    sequence,
    purpose,
    evidence,
    neuro,
    design,
    genesis,
    css,
    host: unit.host,
    href: unit.href,
    cube,
    handle,
    faces,
    fused,
    next: fused + fused,
    capacity,
    speed,
    messaging: {
      when: 'never' as const,
      href: `${unit.origin}/message`,
      lanes: faces.faces,
      hop: 'involution' as const,
      clock_seq: faces.faces,
      await: 'never' !== 'never',
      proxy: cors === '*',
      secure: unit.origin.startsWith('https')},
    docs,
    glossary: glossaryOf(),
    ui: {
      prove: 'prove' as const,
      href: `${unit.origin}/api`},
    cors,
    public: cors === '*',
    auth: cors !== '*',
    isAccessibleForFree: cors === '*',
    url: unit.origin,
    name: `@uuidna/${unit.kind}`,
    holds,
  }
})

export const qpuQuantumHolds = (q = quantumOf()): boolean =>
  q.holds === true &&
  q.kind === 'quantum' &&
  q.only.holds === true &&
  q.lattice.holds === true &&
  q.lattice.occupied === q.faces.faces &&
  q.lattice.vacant === n - n &&
  q.host === unit.host &&
  q.cors === cors &&
  q.ui.prove === 'prove' &&
  docsHolds(q.docs) &&
  capacityHolds(q.capacity) &&
  speedHolds(q.speed) &&
  circuitHolds(q.circuit) &&
  shorHolds(q.shor) &&
  q.shor.factors.p * q.shor.factors.q === q.shor.n &&
  q.shor.rsa.kind === 'rsa' &&
  q.shor.rsa.factored === true &&
  q.shor.rsa.p * q.shor.rsa.q === q.shor.n &&
  sequenceHolds(q.sequence) &&
  purposeHolds(q.purpose) &&
  evidenceHolds(q.evidence) &&
  neuroHolds(q.neuro) &&
  designHolds(q.design) &&
  genesisHolds(q.genesis) &&
  cssHolds(q.css) &&
  q.css.keyframes === seed &&
  q.neuro.test.holds === true &&
  q.sequence.rungs.length === mintOf(n) &&
  q.sequence.rungs[n - n]!.tool === 'quantum' &&
  q.sequence.rungs[mintOf(n) - seed]!.path === '/server' &&
  q.sequence.climb[mintOf(coins) - seed] === 'prove' &&
  q.messaging.when === 'never' &&
  q.messaging.lanes === q.faces.faces &&
  q.messaging.hop === 'involution' &&
  q.messaging.clock_seq === q.faces.faces &&
  q['@context'][n - n] === schemaOrg &&
  q['@type'] === 'SoftwareApplication' &&
  q['@id'] === unit.origin &&
  q.isAccessibleForFree === (cors === '*') &&
  q.url === unit.origin &&
  jsonldHoldsOf(q)
