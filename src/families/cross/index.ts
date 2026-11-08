import { contentUuidOf, uuidReceiptOf, hexRegisterOf, qpuHexUuidOf } from '../../quantum/processing/unit/index.js'
import { chooseOf, mintOf, hexParamMaxOf, latticeNamesOf, tenOf } from '../../quantum/processing/unit/index.js'
import { contextOf, hexDecodeOf, hexFamiliesOf, hexDiscoverOf } from '../../quantum/processing/unit/index.js'
// the lattice names and the three formulas every number here is written in
const L = { ...latticeNamesOf(), mintOf, chooseOf, tenOf }

export interface CrossFormula {
  id: string
  src: string
  dst: string
  formula: string
  value: number
  proof: string
  /** Family mark at the deepest seal (e.g. heat, reactor) — identifiable without prose. */
  kind?: string
  /** Content address of src, dst and formula: the same bridge has the same uuid wherever it is declared. */
  uuid: string
  /** Programmable UUID of this evaluation's quantum receipt (payload + referrer). */
  receipt: string
  /** The inputs lie in the formula's domain and the value is finite (and a safe integer where it counts). */
  holds: boolean
  /** The hex program (RFC 9562 v8) that runs this formula: handle, call/holds/receipt, inputs as params. */
  hex?: string
  /** Whether the hex carries the exact inputs (naturals that fit the params section). */
  hexExact: boolean
}

export interface DomainBridge {
  from: string
  to: string
  transform: (input: unknown) => unknown
  formula: string
}

/**
 * Seal a cross formula: content UUID of {src, dst, formula}, holds (inputs in domain, value finite) and a quantum receipt in the cross stream.
 * @wing fusion
 * @kind builder
 */
// THE FAMILY → DOMAIN BRIDGES, recorded as each formula seals: a family (src) crosses to a domain (dst). The intelligent
// `next` reads this to let the families organise by domain and discover the neighbourhood around each — no hand list, the
// graph fills itself as the families are exercised.
const BRIDGES = new Map<string, string>()
/** Each family's domain, as far as the families have sealed a formula — src → dst. A copy, so a caller cannot mutate it. */
export const crossBridgesOf = (): Map<string, string> => new Map(BRIDGES)

// FIND ALL OF A DOMAIN, AUTOMATICALLY AND TOKEN-FREE. The bridges fill only as a formula seals, so this seals every
// family's first formula once (memoised — a local read on the seed, no MCP tokens, no hand list) then reads the graph.
// domainOf('hardware') is every family that crosses to hardware; relatedOf(f) is f's siblings in its own domain —
// the experts a standardised court convenes from related families.
let sealed = false
const sealAll = (): void => {
  if (sealed) return
  sealed = true
  for (const fs of hexFamiliesOf().values()) {
    const f = fs[0]
    if (!f) continue
    const a = f.arity
    const args = a <= 0 ? [] : a === 1 ? [3n] : a === 2 ? [6n, 3n] : Array.from({ length: a }, () => 3n)
    try { f.run(args) } catch { /* a family that cannot seal on these seeds is simply not bridged yet — a lead, not a block */ }
  }
}
/** The whole family → domain graph in one reading: each domain with the families that cross to it (and so, for any
 *  family, its siblings in its own domain — its experts). The self-filling graph, read token-free, no per-item prefix. */
export const qpuDomainsOf = (): Record<string, string[]> => { sealAll(); const m: Record<string, string[]> = {}; for (const [s, d] of BRIDGES) (m[d] ??= []).push(s); for (const d in m) m[d]!.sort(); return m }

export const crossFormulaOf = (f: Omit<CrossFormula, 'uuid' | 'receipt' | 'holds' | 'hex' | 'hexExact'>, domain = true, call?: { name: string; params: number[] }): CrossFormula => {
  if (f.src && f.dst) BRIDGES.set(f.src, f.dst)
  const uuid = contentUuidOf({ src: f.src, dst: f.dst, formula: f.formula })
  const holds = domain && Number.isFinite(f.value)
  // the formula's hex program: its handle, call then holds then receipt, its inputs as params when they are naturals that fit
  const exact = call !== undefined && call.params.length <= 3 && call.params.every((x) => Number.isSafeInteger(x) && x >= 0 && x < hexParamMaxOf(call.params.length))
  let hex: string | undefined
  try {
    hex = call ? qpuHexUuidOf({ family: call.name.split('.')[0]!, program: [call.name.split('.')[1]!], params: exact ? call.params : [] }) : undefined
  } catch {
    hex = undefined
  }
  return { ...f, uuid, holds, hex, hexExact: Boolean(hex) && exact, receipt: uuidReceiptOf(`cross ${f.id}`, uuid, { value: f.value, holds }).uuid }
}
const nat = (...xs: number[]): boolean => xs.every((x) => Number.isFinite(x) && x >= 0)

/**
 * The ten named cross-domain bridges (each a CrossFormula) and allBridges(), their transforms over plain inputs.
 * @wing fusion
 * @kind class
 */
export class CrossDomainFormulas {
  static bb84ToCompress(keyLen: number): CrossFormula {
    return crossFormulaOf({
      id: 'qsec→compress-1',
      src: 'qsec',
      dst: 'compress',
      formula: 'compression_ratio = 1 / (1 + log2(keyLen))',
      value: 1 / (1 + Math.log2(keyLen)),
      proof: 'Quantum key entropy bounds data compression potential'}, nat(keyLen) && keyLen >= 1, { name: 'cross.bb84ToCompress', params: [keyLen] })
  }

  static observabilityToML(signalCount: number): CrossFormula {
    return crossFormulaOf({
      id: 'obs→ml-1',
      src: 'obs',
      dst: 'ml',
      formula: 'model_accuracy = 1 - (1 / (1 + signalCount/100))',
      value: 1 - (1 / (1 + signalCount / L.tenOf(L.coins))),
      proof: 'Signal quantity improves prediction accuracy logarithmically'}, nat(signalCount), { name: 'cross.observabilityToML', params: [signalCount] })
  }

  static deploymentToObs(buildTime: number, testTime: number): CrossFormula {
    return crossFormulaOf({
      id: 'deployment→obs-1',
      src: 'deployment',
      dst: 'obs',
      formula: 'health_score = max(0, 1 - buildTime/300) * max(0, 1 - testTime/180)',
      value: Math.max(0, 1 - buildTime / (L.n * L.tenOf(L.coins))) * Math.max(0, 1 - testTime / 180),
      proof: 'Build+test speed indicates system health'}, nat(buildTime, testTime), { name: 'cross.deploymentToObs', params: [buildTime, testTime] })
  }

  static quantumToEnterprise(proofCount: number): CrossFormula {
    return crossFormulaOf({
      id: 'quantum→enterprise-1',
      src: 'quantum',
      dst: 'enterprise',
      formula: 'risk_score = 1 / (1 + proofCount)',
      value: 1 / (1 + proofCount),
      proof: 'Proven theorems reduce business risk'}, nat(proofCount), { name: 'cross.quantumToEnterprise', params: [proofCount] })
  }

  static medSecureWithQSec(patientCount: number, keyLen: number): CrossFormula {
    return crossFormulaOf({
      id: 'med+qsec-1',
      src: 'med',
      dst: 'qsec',
      formula: 'keyspace = 2^keyLen * patientCount',
      value: Math.pow(2, keyLen) * patientCount,
      proof: 'Each patient needs separate quantum key for HIPAA compliance'}, nat(patientCount, keyLen) && Number.isSafeInteger(Math.pow(2, keyLen) * patientCount), { name: 'cross.medSecureWithQSec', params: [patientCount, keyLen] })
  }

  static observabilityToUI(anomalies: number, signals: number): CrossFormula {
    return crossFormulaOf({
      id: 'obs→ui-1',
      src: 'obs',
      dst: 'ui',
      formula: 'alert_urgency = anomalies / (signals + 1)',
      value: anomalies / (signals + 1),
      proof: 'Anomaly ratio determines UI alert priority'}, nat(anomalies, signals), { name: 'cross.observabilityToUI', params: [anomalies, signals] })
  }

  static compressQSecSignals(signalLen: number, keyLen: number): CrossFormula {
    return crossFormulaOf({
      id: 'qsec+compress-1',
      src: 'qsec',
      dst: 'compress',
      formula: 'compressed_size = signalLen * (1 - keyLen/(keyLen+signalLen))',
      value: signalLen * (1 - keyLen / (keyLen + signalLen)),
      proof: 'Quantum entropy improves compression ratio'}, nat(signalLen, keyLen) && keyLen + signalLen > 0, { name: 'cross.compressQSecSignals', params: [signalLen, keyLen] })
  }

  static mlOnObsForPrediction(signalDim: number, anomalyCount: number): CrossFormula {
    return crossFormulaOf({
      id: 'obs+ml-1',
      src: 'obs',
      dst: 'ml',
      formula: 'prediction_confidence = 1 - (anomalyCount/(signalDim*signalDim))',
      value: 1 - (anomalyCount / (signalDim * signalDim)),
      proof: 'Low anomaly ratio enables high-confidence prediction'}, nat(signalDim, anomalyCount) && signalDim > 0 && anomalyCount <= signalDim * signalDim, { name: 'cross.mlOnObsForPrediction', params: [signalDim, anomalyCount] })
  }

  static enterpriseMetricsViaObs(complianceScore: number, latency: number): CrossFormula {
    return crossFormulaOf({
      id: 'enterprise→obs-1',
      src: 'enterprise',
      dst: 'obs',
      formula: 'slo_met = (complianceScore > 0.9) AND (latency < 200)',
      value: complianceScore > 0.9 && latency < L.coins * L.tenOf(L.coins) ? 1 : 0,
      proof: 'SLO requires both compliance and performance'}, nat(complianceScore, latency) && complianceScore <= 1, { name: 'cross.enterpriseMetricsViaObs', params: [complianceScore, latency] })
  }

  static testCoverageToQuality(testsPassed: number, totalTests: number): CrossFormula {
    return crossFormulaOf({
      id: 'test→enterprise-1',
      src: 'test',
      dst: 'enterprise',
      formula: 'quality_score = testsPassed / totalTests',
      value: totalTests > 0 ? testsPassed / totalTests : 0,
      proof: 'Test coverage is primary quality metric'}, nat(testsPassed, totalTests) && totalTests > 0 && testsPassed <= totalTests, { name: 'cross.testCoverageToQuality', params: [testsPassed, totalTests] })
  }

  static allBridges(): DomainBridge[] {
    return [
      { from: 'qsec', to: 'compress', formula: 'entropy→ratio', transform: (k: any) => 1 / (1 + Math.log2(k.keyLen || L.mintOf(L.rays))) },
      { from: 'obs', to: 'ml', formula: 'signals→accuracy', transform: (s: any) => 1 - (1 / (1 + (s.count || 0) / L.tenOf(L.coins))) },
      { from: 'deployment', to: 'obs', formula: 'timing→health', transform: (t: any) => Math.max(0, 1 - (t.build ?? 0) / (L.n * L.tenOf(L.coins))) * Math.max(0, 1 - (t.test ?? 0) / 180) },
      { from: 'quantum', to: 'enterprise', formula: 'proofs→risk', transform: (p: any) => 1 / (1 + (p.count || 0)) },
      { from: 'med', to: 'qsec', formula: 'patients→keyspace', transform: (m: any) => Math.pow(2, m.keyLen ?? L.mintOf(L.rays)) * (m.count ?? 0) },
      { from: 'obs', to: 'ui', formula: 'anomalies→urgency', transform: (o: any) => (o.anomalies ?? 0) / ((o.signals ?? 0) + 1) }
    ]
  }
}

/**
 * A CrossDomainFormulas instance.
 * @wing fusion
 * @kind function
 */
export const crossDomainFormulas = new CrossDomainFormulas()

// every bridge is a formula of the hex family `cross`, indexed by name
for (const name of Object.getOwnPropertyNames(CrossDomainFormulas)) {
  const fn = (CrossDomainFormulas as unknown as Record<string, unknown>)[name]
  if (typeof fn === 'function' && name !== 'allBridges') hexRegisterOf('cross', name, (fn as (...x: unknown[]) => unknown).bind(CrossDomainFormulas))
}

/**
 * ORGANISE A FAMILY AS A SCHEMA.ORG SCHEMA, ADDRESSED BY THE FULL UUID PROGRAMMABLE CAPACITY.
 *
 * Every hex family is a controlled vocabulary of formulas; schema.org already has the type for that — a
 * DefinedTermSet whose DefinedTerms are the formulas. Each term is named by its own hex-program UUID (the full
 * programmable address: handle, the formula's nibble, params), so the schema is not a description of the family
 * beside it but the family's own addresses gathered under one @context. The set's @id is the content UUID of its
 * term names, so the same family yields the same schema everywhere. Both UUID kinds carry the crypto-decided
 * version across all eight RFC 9562 versions — nothing here is a literal.
 * @wing fusion
 * @kind builder
 * @evidence crossSchemaHolds
 */
export const crossSchemaOf = (family: string) => {
  const formulas = hexFamiliesOf().get(family) ?? []
  const id = contentUuidOf({ schema: family, terms: formulas.map((t) => t.name) })
  return {
    '@context': contextOf(),
    '@type': 'DefinedTermSet' as const,
    '@id': `urn:uuid:${id}`,
    name: family,
    identifier: id,
    hasDefinedTerm: formulas.map((t) => {
      const hex = qpuHexUuidOf({ family, program: [t.name] })
      return { '@type': 'DefinedTerm' as const, '@id': `urn:uuid:${hex}`, name: `${family}.${t.name}`, termCode: t.name, identifier: hex }
    }),
  }
}

/** The schema is schema.org-shaped and every term is addressed by a hex program that decodes back to this family's formula. */
export const crossSchemaHolds = (family = 'cross'): boolean => {
  const s = crossSchemaOf(family)
  return (
    s['@context'][0] === 'https://schema.org' &&
    s['@type'] === 'DefinedTermSet' &&
    s['@id'] === `urn:uuid:${s.identifier}` &&
    s.hasDefinedTerm.length > 0 &&
    s.hasDefinedTerm.every((term) => {
      const d = hexDecodeOf(term.identifier) as { family?: string | null; program?: string[] }
      return d.family === family && Array.isArray(d.program) && d.program[0] === term.termCode
    })
  )
}

/**
 * ORGANISE ALL FAMILIES AS ONE SCHEMA.ORG CATALOG.
 *
 * Every family's DefinedTermSet gathered under one DataCatalog, so the whole lattice of formulas is one schema.org
 * document whose every term is a hex-program UUID — the full programmable capacity, catalogued. The catalog's @id
 * is the content UUID of its family names, so the same set of families yields the same catalog everywhere.
 * @wing fusion
 * @kind builder
 * @evidence crossSchemasHolds
 */
export const crossSchemasOf = () => {
  const families = [...hexFamiliesOf().keys()].sort()
  const id = contentUuidOf({ catalog: 'families', families })
  return {
    '@context': contextOf(),
    '@type': 'DataCatalog' as const,
    '@id': `urn:uuid:${id}`,
    name: 'uuidna families',
    identifier: id,
    hasPart: families.map((family) => crossSchemaOf(family)),
  }
}

/** The catalog is schema.org-shaped and every part is a family schema that itself holds. */
export const crossSchemasHolds = (): boolean => {
  const c = crossSchemasOf()
  return (
    c['@type'] === 'DataCatalog' &&
    c['@context'][0] === 'https://schema.org' &&
    c['@id'] === `urn:uuid:${c.identifier}` &&
    c.hasPart.length > 0 &&
    c.hasPart.every((s) => s['@type'] === 'DefinedTermSet' && crossSchemaHolds(s.name))
  )
}

/**
 * ORGANISE THE DISCOVERED RELATIONS AS ONE SCHEMA.ORG SCHEMA.
 *
 * The formulas discover each other (hexDiscoverOf): no list is kept, every family's formulas are evaluated over the
 * lattice's own constants and each value two or more families reach is a relation. schema.org already has the type for a
 * vocabulary of addressed terms — a DefinedTermSet whose DefinedTerms are the relations. Each term is addressed by the
 * hex-program UUID of a way that reaches it, so the schema is not written beside the discovery but is the discovery's own
 * addresses under one @context. The set's @id is the content UUID of the values, so the same lattice yields the same
 * schema everywhere, and nothing here is enumerated by hand.
 * @wing fusion
 * @kind builder
 * @evidence crossDiscoverSchemaHolds
 */
export const crossDiscoverSchemaOf = () => {
  // the discoverer covers every hex family (a split walk under the hood when they outgrow one window); here the whole
  // discovery is consolidated as one schema.org set, so the lattice's relations are a standard-schema document too.
  const relations = hexDiscoverOf().relations
  const id = contentUuidOf({ schema: 'discover', values: relations.map((r) => r.value) })
  return {
    '@context': contextOf(),
    '@type': 'DefinedTermSet' as const,
    '@id': `urn:uuid:${id}`,
    name: 'discovered relations',
    identifier: id,
    hasDefinedTerm: relations.map((r) => ({
      '@type': 'DefinedTerm' as const,
      '@id': `urn:uuid:${r.ways[0]!.hex}`,
      name: `${r.families.map((f) => f.replace('Qpu.', '')).join(' = ')} at ${r.value}`,
      termCode: r.value,
      identifier: r.ways[0]!.hex,
    })),
  }
}

/** The schema is schema.org-shaped and each term's address decodes to a way whose family is one the relation joins. */
export const crossDiscoverSchemaHolds = (): boolean => {
  const s = crossDiscoverSchemaOf()
  const byValue = new Map(hexDiscoverOf().relations.map((r) => [r.value, r.families]))
  return (
    s['@context'][0] === 'https://schema.org' &&
    s['@type'] === 'DefinedTermSet' &&
    s['@id'] === `urn:uuid:${s.identifier}` &&
    s.hasDefinedTerm.length > 0 &&
    s.hasDefinedTerm.every((t) => {
      const d = hexDecodeOf(t.identifier) as { family?: string | null; holds?: boolean }
      return d.holds === true && d.family != null && (byValue.get(t.termCode) ?? []).includes(d.family)
    })
  )
}
