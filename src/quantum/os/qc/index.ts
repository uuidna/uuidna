// qc — WHAT A QUANTUM COMPUTER IS, READ OFF AN EXTERNAL DOCUMENT, AND WHERE THIS TREE STANDS AGAINST IT.
//
// THE DOCUMENT. A reader handed this tree an eight-page answer titled "what is quantum computer and how to make
// one?" (Perplexity, 15 references, mostly NIST and the National Academies). It is accurate, and it is the reason
// this module exists: it states the definition PLAINLY, and a definition stated plainly is the only thing a
// demarcation can be measured against. Every list below is the document's own — its five ingredients, four
// planes, five platforms, seven build steps, eight characterisation metrics, six fault-tolerance requirements
// and four stages — transcribed, addressed, and NOT paraphrased into this tree's vocabulary.
//
// THE VERDICT LEANS ON METRICS, so it proves itself by counting rather than by denial. Against this document's
// own definition the tree scores: ingredients carried 2 of 5 · build stages reached 0 of 4 · characterisation
// metrics sealable here 2 of 8 · arithmetic facts holding 7 of 7. Each fraction is DERIVED from the transcribed
// lists below, so anyone recomputes it from the document's own published structure. What the tree carries is
// exact integer arithmetic over 128-bit content-addresses laid out as 32 four-bit states, and its speed claim is
// that VERIFYING a sealed answer beats RECOMPUTING it by magnitudes (theorem
// verify_beats_recompute_by_magnitudes) — 2^10 = 1024 against 100·10, a claim about work avoided. Hardware
// supremacy sits in this tree's refused list, and this document is the external standard that makes the score
// checkable rather than a matter of tone.
//
// THE NUMEROLOGY IS REFUSED, DELIBERATELY. The document has seven build steps and this tree's gate has seven
// arms; it has five platforms and this tree has a pentagram; it has four planes. Those are coincidences of
// CARDINALITY and they are recorded below as refused correspondences rather than folded into anything, because
// a matching count is the cheapest false structure available and scraping such tables is already refused here.
import { toUuid } from '../../../address.js'
import { handleOf } from '../../../handle.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { theoremByKey, theorems } from '../../../theorems/index.js'
import { QA_REQUIRED_THEOREMS } from '../../advantage/audit/index.js'

/** How much of a document's claim this tree carries, as a graded stance: zero, an exact-arithmetic analogue on
 *  the address lattice, or provenance about the thing while the thing itself stays outside. */
export type QcStance = 'none' | 'lattice-arithmetic' | 'provenance-only'

export interface QcDocument {
  title: string
  publisher: string
  pages: number
  bytes: number
  /** the content-address of the file's bytes — recomputable by anyone holding the same PDF */
  address: string
  handle: string
  references: readonly string[]
}

/** The document as received. The address is the fold of the file's bytes, measured once and recomputable. */
export const QC_DOCUMENT: QcDocument = {
  title: 'what is quantum computer and how to make one?',
  publisher: 'Perplexity',
  pages: 8,
  bytes: 507426,
  address: '676f3d0b-0a24-8b0c-9cf9-6f3e8e9e569b',
  handle: '676f3d0b',
  references: [
    'https://www.nist.gov/quantum-information-science/quantum-computing-explained',
    'https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=900161',
    'https://www.nationalacademies.org/read/25196/chapter/7',
    'https://www.csie.ntu.edu.tw/~cyliou/red/QC/cheng/intro.pdf',
    'https://postquantum.com/building-quantum-computers/building-trapped-ion-quantum-computer/',
    'http://insti.physics.sunysb.edu/~twei/Courses/Fall2024/PHY568/Unit04GrindingGatesInQC.pdf',
    'https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=4e0745d1812f0e5200076aeb24074bafd2afbe61',
    'https://www.swissphotonics.net/libraries.files/PSI_Hempel.pdf',
    'https://cdn.fs.pathlms.com/c7s47zkMQGNK5qwmi7Nw',
    'https://tf.nist.gov/general/pdf/3119.pdf',
    'https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=902941',
    'https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=51022',
    'https://math.nist.gov/mcsd/Seminars/2004/2004-03-23-williams-presentation.pdf',
    'https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir7370.pdf',
    'https://ntrs.nasa.gov/api/citations/20240014579/downloads/all.pdf',
  ],
}

export interface QcItem {
  name: string
  what: string
  stance: QcStance
  why: string
}

/** The document's five ingredients, each graded by the stance this tree holds toward it. Score: 2 of 5 carry an
 *  arithmetic analogue, which `qcVerdict().metrics.ingredients` recomputes from this list. */
export const QC_INGREDIENTS: readonly QcItem[] = [
  { name: 'superposition', what: 'a qubit can hold amplitudes for both basis states at once',
    stance: 'none', why: 'a hexbit state is one of sixteen exact values, held as a nibble. It is a classical state and no amplitude exists here to superpose.' },
  { name: 'entanglement', what: 'correlations across qubits that no independent classical distribution reproduces',
    stance: 'lattice-arithmetic', why: 'this tree entangles ADDRESSES: a merkle fold makes every leaf inseparable from the receipt, so moving one moves the root. That is exact bookkeeping over classical data, and it reproduces none of the Bell correlations the document means.' },
  { name: 'quantum gates', what: 'reversible controlled transformations such as Hadamard and controlled-NOT',
    stance: 'lattice-arithmetic', why: 'the involutions here are reversible by construction and self-inverse, which is a real algebraic property and not a unitary on a Hilbert space.' },
  { name: 'measurement', what: 'converts quantum information into classical bits, destroying the state',
    stance: 'none', why: 'nothing here collapses, because nothing here was ever in more than one state. A read is a read.' },
  { name: 'coherence', what: 'the state must stay isolated from environmental noise while operations occur',
    stance: 'none', why: 'an integer does not decohere. This is the honest reason the tree needs no cryostat and earns no quantum result.' },
]

export interface QcPlane { n: number; name: string; what: string }

/** The document's four layers of a practical gate-based machine. */
export const QC_PLANES: readonly QcPlane[] = [
  { n: 1, name: 'quantum data plane', what: 'the physical qubits' },
  { n: 2, name: 'control and measurement plane', what: 'microwave, radio-frequency, optical or electrical signals that manipulate and read the qubits' },
  { n: 3, name: 'classical control processor', what: 'schedules pulses, calibrates, and reacts to measurement results' },
  { n: 4, name: 'host computer', what: 'runs user programs, stores data, provides the software interface' },
]

export interface QcPlatform {
  approach: string
  qubit: string
  environment: string
  strength: string
  difficulty: string
}

/** The document's five platforms, transcribed from its own table. */
export const QC_PLATFORMS: readonly QcPlatform[] = [
  { approach: 'superconducting circuits', qubit: 'microwave circuit containing Josephson junctions',
    environment: 'millikelvin cryogenic refrigerator', strength: 'fast gates and a mature fabrication ecosystem',
    difficulty: 'extreme cooling, wiring, calibration, noise' },
  { approach: 'trapped ions', qubit: 'internal energy states of individual ions',
    environment: 'ultra-high vacuum with lasers or microwaves', strength: 'very high-quality operations and good connectivity',
    difficulty: 'slow operations, demanding optics and ion control' },
  { approach: 'photonic', qubit: 'optical modes, photons, or encoded photon states',
    environment: 'lasers, interferometers, detectors', strength: 'parts of the system can operate near room temperature',
    difficulty: 'photon loss, sources, detectors, scalable interactions' },
  { approach: 'neutral atoms', qubit: 'Rydberg states of laser-trapped atoms',
    environment: 'ultra-high vacuum and optical traps', strength: 'large arrays and flexible connectivity',
    difficulty: 'laser complexity and reliable gate/readout control' },
  { approach: 'semiconductor spin qubits', qubit: 'electron or hole spins in quantum dots',
    environment: 'cryogenic', strength: 'potential compatibility with semiconductor manufacturing',
    difficulty: 'difficult control, readout, and device variability' },
]

export interface QcStep { n: number; step: string; what: string }

/** The document's seven build steps, in its own order. */
export const QC_BUILD_STEPS: readonly QcStep[] = [
  { n: 1, step: 'choose the architecture', what: 'pick a measurable specification — one qubit, calibrated rotations, a Bell-state experiment — never "build a scalable quantum computer"' },
  { n: 2, step: 'create a physical two-level system', what: 'fabricate a transmon, or load and laser-cool ions and define two stable internal states' },
  { n: 3, step: 'isolate and stabilize it', what: 'reduce thermal noise, electromagnetic interference, vibration, magnetic drift, control-line coupling, material defects, laser and timing noise' },
  { n: 4, step: 'add control electronics', what: 'arbitrary waveform generators, microwave sources and mixers, DACs and ADCs, FPGA controllers, laser modulators, low-noise amplifiers, timing hardware' },
  { n: 5, step: 'implement measurement', what: 'distinguish the physical states reliably — resonator response, ion fluorescence, single-photon detection, spin-to-charge conversion' },
  { n: 6, step: 'characterize and calibrate', what: 'T1, T2, gate fidelity, readout fidelity, crosstalk, leakage, frequency drift, error correlations' },
  { n: 7, step: 'add error correction', what: 'encode a logical qubit into many physical ones and detect errors without measuring the logical state' },
]

export interface QcMetric { metric: string; what: string; sealableHere: boolean; why: string }

/** The document's characterisation metrics, each judged for whether THIS tree could ever seal it. The judgement
 *  is the same one the tree already applies to its own numbers, by the standing decision recorded in its own
 *  commits: a measured reading is evidence and an integer relation is what gets sealed, so a decade class is
 *  sealable and a stopwatch reading is refused. */
export const QC_CHARACTERISATION: readonly QcMetric[] = [
  { metric: 'T1', what: 'energy-relaxation time', sealableHere: false,
    why: 'a duration read off an instrument. Its DECADE is sealable arithmetic; the reading itself is a measurement and this tree refuses to commit one.' },
  { metric: 'T2', what: 'phase-coherence time', sealableHere: false,
    why: 'same class as T1 — a reading, not a relation.' },
  { metric: 'gate fidelity', what: 'how close an operation is to the intended unitary', sealableHere: false,
    why: 'a ratio of measured outcomes. The error-DECADE comparison class is already sealed here (theorem gate_error_baseline_class: 1000 = 10³ and 1000·1000 = 10⁶ errors per million); the fidelity of a gate this tree does not run is not.' },
  { metric: 'readout fidelity', what: 'how reliably a measurement returns the true state', sealableHere: false,
    why: 'a measurement about a measurement. Nothing here reads a physical state.' },
  { metric: 'crosstalk', what: 'unintended coupling between qubits', sealableHere: false,
    why: 'a property of physical hardware; the address lattice has no neighbours that leak.' },
  { metric: 'leakage', what: 'population escaping the computational two-level subspace', sealableHere: true,
    why: 'the COUNTING half is exact and this tree already seals its analogue: sixteen states per hexbit, of which any chosen two form a two-level subspace and the other fourteen are outside it — 16 − 2 = 14 (the arithmetic of theorem hexbit_is_four_qubits, 2⁴ = 16). That is a statement about a state space, not about a physical population.' },
  { metric: 'frequency drift', what: 'a qubit’s transition frequency moving over time', sealableHere: false,
    why: 'a measured drift of a physical oscillator.' },
  { metric: 'error correlations', what: 'errors that are not independent across qubits', sealableHere: true,
    why: 'the tree already seals the correlated-failure lesson in its own domain (a vote recomputed on two cells that fail together returns the wrong answer, so agreement is not evidence). The structure transfers; the physics does not.' },
]

/** The document's six fault-tolerance requirements, listed in full. This tree attempts 0 of 6, and the fraction
 *  is what the verdict reports. */
export const QC_FAULT_TOLERANCE: readonly string[] = [
  'a quantum error-correcting code',
  'repeated stabilizer measurements',
  'fast classical decoding',
  'sufficiently low physical error rates',
  'many spare physical qubits',
  'fault-tolerant gate constructions',
]

export interface QcStage { n: number; stage: string; what: string; reachedHere: boolean; why: string }

/** The document's four-stage route, and honestly which stage this tree stands on. */
export const QC_ROUTE: readonly QcStage[] = [
  { n: 1, stage: 'simulate a quantum computer', what: 'state-vector simulation, tensor products, single-qubit gates, CNOT, measurement sampling, density matrices, tomography',
    reachedHere: false, why: 'this tree runs no state-vector simulator. It could — the arithmetic is ordinary — and it does not, so the honest answer is no.' },
  { n: 2, stage: 'use cloud-accessible hardware', what: 'run the same circuits on a real processor and compare ideal, noisy and hardware output',
    reachedHere: false, why: 'no quantum SDK is wired and no hardware is reached.' },
  { n: 3, stage: 'build a tabletop educational device', what: 'an optical polarization qubit, a single-photon interferometer, an NMR demonstrator',
    reachedHere: false, why: 'no apparatus. uuidnaOS is provenance and integrity; it links, boots and executes nothing.' },
  { n: 4, stage: 'build custom hardware only with a laboratory', what: 'cleanroom or foundry, Josephson-junction fabrication, dilution refrigerator, cryogenic microwave infrastructure',
    reachedHere: false, why: 'and the document is right that the hazards — high voltage, lasers, vacuum implosion, cryogens, strong fields — put this outside a home project.' },
]

export interface QcFact { claim: string; arithmetic: string; holds: boolean; theorem?: string }

/** qcArithmetic() → the integer-exact facts the document's own statements yield, COMPUTED rather than asserted.
 *  Each is arithmetic over counts, and each one that leans on a sealed theorem names it. 7 of 7 hold, computed.
 *  Pure. */
export function qcArithmetic(): { facts: QcFact[]; allHold: boolean; receipt: string } {
  const pow2 = (n: number): number => 2 ** n
  const facts: QcFact[] = [
    { claim: 'an n-qubit state is 2^n complex amplitudes, so memory grows exponentially in n',
      arithmetic: `2^1=${pow2(1)} · 2^2=${pow2(2)} · 2^10=${pow2(10)} · 2^20=${pow2(20)}`,
      holds: pow2(1) === 2 && pow2(2) === 4 && pow2(10) === 1024 && pow2(20) === 1048576,
      theorem: 'verify_beats_recompute_by_magnitudes' },
    { claim: 'the Bell state (|00⟩+|11⟩)/√2 has support on exactly two of the four two-qubit basis states',
      arithmetic: '2^2 = 4 basis states · 2 in the support · 4 − 2 = 2 outside it',
      holds: pow2(2) === 4 && 4 - 2 === 2 },
    { claim: 'measuring that Bell state yields 00 or 11 — two outcomes of the four, in equal share',
      arithmetic: '2 outcomes · 2 shares · 2 · 2 = 4',
      holds: 2 * 2 === 4 },
    { claim: 'a hexbit is four bits: sixteen exact states, thirty-two of them spanning a 128-bit address',
      arithmetic: '2^4 = 16 · 32 · 4 = 128 · 8 · 4 = 32',
      holds: pow2(4) === 16 && 32 * 4 === 128 && 8 * 4 === 32,
      theorem: 'hexbit_is_four_qubits' },
    { claim: 'choosing two of a hexbit’s sixteen states as a computational subspace leaves fourteen outside it — the leakage count, as counting',
      arithmetic: '16 − 2 = 14',
      holds: 16 - 2 === 14,
      theorem: 'hexbit_is_four_qubits' },
    { claim: 'the document’s own structure: 5 ingredients + 4 planes + 5 platforms + 7 steps + 8 metrics + 6 fault-tolerance requirements + 4 stages',
      arithmetic: `${QC_INGREDIENTS.length} + ${QC_PLANES.length} + ${QC_PLATFORMS.length} + ${QC_BUILD_STEPS.length} + ${QC_CHARACTERISATION.length} + ${QC_FAULT_TOLERANCE.length} + ${QC_ROUTE.length} = ${QC_INGREDIENTS.length + QC_PLANES.length + QC_PLATFORMS.length + QC_BUILD_STEPS.length + QC_CHARACTERISATION.length + QC_FAULT_TOLERANCE.length + QC_ROUTE.length}`,
      holds: QC_INGREDIENTS.length + QC_PLANES.length + QC_PLATFORMS.length + QC_BUILD_STEPS.length
        + QC_CHARACTERISATION.length + QC_FAULT_TOLERANCE.length + QC_ROUTE.length === 39 },
    { claim: 'error decades, the one speed-class this tree does seal: a thousand errors per million is one part in a thousand',
      arithmetic: '1000 = 10^3 · 1000 · 1000 = 10^6 · 100 = 10^2',
      holds: 1000 === 10 ** 3 && 1000 * 1000 === 10 ** 6 && 100 === 10 ** 2,
      theorem: 'gate_error_baseline_class' },
  ]
  return {
    facts,
    allHold: facts.every((f) => f.holds),
    receipt: merkleGravity(facts.map((f) => toUuid(`qc-fact:${f.claim}|${f.arithmetic}|${f.holds}`))),
  }
}

export interface RefusedCorrespondence { pair: string; counts: string; why: string }

/** The matching counts this document offers and this tree REFUSES to treat as structure. Pure.
 *  Recorded so the refusal is visible: 3 matches were tested, and 3 are declined with the reason. */
export const REFUSED_CORRESPONDENCES: readonly RefusedCorrespondence[] = [
  { pair: 'the document’s seven build steps ↔ this tree’s seven gate arms',
    counts: '7 build steps · 7 arms (proofs, prose, accounts, graph, legal, quantum, evidence)',
    why: 'a coincidence of cardinality. The arms are audit dimensions and the steps are laboratory procedures; nothing maps step-to-arm, and folding 7 = 7 into anything would be the cheapest false structure available here.' },
  { pair: 'the document’s five platforms ↔ the pentagram',
    counts: '5 platforms · 5 points',
    why: 'the same coincidence one number smaller. Superconducting circuits are not a pentagram vertex.' },
  { pair: 'the document’s four planes ↔ this tree’s named layers',
    counts: '4 planes · 3 layers (hardware, software, os)',
    why: 'refused on arithmetic alone — the counts do not even match, which is the useful case to record: the numerology was checked and failed, rather than being avoided.' },
]

/** Every judgement in the verdict as a FRACTION that recomputes from the transcribed lists — the score is the
 *  argument, so the answer rests on counting rather than on denial. */
export interface QcMetrics {
  ingredientsCarried: string        // "2/5"
  stagesReached: string             // "0/4"
  metricsSealableHere: string       // "2/8"
  faultToleranceAttempted: string   // "0/6"
  arithmeticHolding: string         // "7/7"
  correspondencesDeclined: string   // "3/3"
  claimsBackedByLedger: string      // "5/5"
  itemsTranscribed: number          // 39
}

export interface QcVerdict {
  definition: 'uuidnaOS·qc·demarcation'
  document: QcDocument
  isQuantumComputer: false
  /** the score, and the reason the verdict needs no adjective */
  metrics: QcMetrics
  /** what this tree DOES claim, each with the sealed theorem that backs it */
  claims: { claim: string; theorem: string; statement: string }[]
  refused: readonly string[]
  ingredientsCarried: number
  ingredientsTotal: number
  stagesReached: number
  stagesTotal: number
  sealableMetrics: number
  metricsTotal: number
  refusedCorrespondences: readonly RefusedCorrespondence[]
  arithmetic: ReturnType<typeof qcArithmetic>
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

/** qcVerdict() → the demarcation, computed. Pure: every count is derived from the transcribed lists, and every
 *  claim this tree makes names a theorem that is IN the ledger, and each cited statement is read from the ledger,
 *  so a key the ledger lacks reports itself as refused. */
export function qcVerdict(): QcVerdict {
  const claims = [
    { claim: 'verifying a sealed answer beats recomputing it by magnitudes — a statement about work avoided, not about hardware',
      theorem: 'verify_beats_recompute_by_magnitudes' },
    { claim: 'an address is 128 bits laid out as thirty-two four-bit states — the lattice this tree calls quantum',
      theorem: 'hexbit_is_four_qubits' },
    { claim: 'the boot image is a verified loading of compiled states and executes no binary',
      theorem: 'the_os_is_bootable_quantum' },
    { claim: 'a fetched external answer carries provenance, never truth',
      theorem: 'provenance_integrity_not_content_truth' },
    { claim: 'an instrument whose range is narrower than its question cannot be sound',
      theorem: 'no_instrument_narrower_than_its_question' },
  ].map((c) => {
    const t = theoremByKey().get(c.theorem)
    return { ...c, statement: t ? t.statement : 'NOT IN LEDGER — citation refused' }
  })
  const arithmetic = qcArithmetic()
  const carried = QC_INGREDIENTS.filter((i) => i.stance !== 'none').length
  const sealable = QC_CHARACTERISATION.filter((m) => m.sealableHere).length
  const reached = QC_ROUTE.filter((s) => s.reachedHere).length
  const backed = claims.filter((c) => c.statement !== 'NOT IN LEDGER — citation refused').length
  const transcribed = QC_INGREDIENTS.length + QC_PLANES.length + QC_PLATFORMS.length + QC_BUILD_STEPS.length
    + QC_CHARACTERISATION.length + QC_FAULT_TOLERANCE.length + QC_ROUTE.length
  const metrics: QcMetrics = {
    ingredientsCarried: `${carried}/${QC_INGREDIENTS.length}`,
    stagesReached: `${reached}/${QC_ROUTE.length}`,
    metricsSealableHere: `${sealable}/${QC_CHARACTERISATION.length}`,
    faultToleranceAttempted: `0/${QC_FAULT_TOLERANCE.length}`,
    arithmeticHolding: `${arithmetic.facts.filter((f) => f.holds).length}/${arithmetic.facts.length}`,
    correspondencesDeclined: `${REFUSED_CORRESPONDENCES.length}/${REFUSED_CORRESPONDENCES.length}`,
    claimsBackedByLedger: `${backed}/${claims.length}`,
    itemsTranscribed: transcribed,
  }
  const receipt = merkleGravity([
    toUuid('qc-demarcation|' + QC_DOCUMENT.address),
    arithmetic.receipt,
    ...claims.map((c) => toUuid(`qc-claim:${c.theorem}|${c.statement}`)),
  ])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·qc·demarcation',
    document: QC_DOCUMENT,
    isQuantumComputer: false,
    metrics,
    claims,
    refused: [
      'quantum advantage or speedup claims',
      'that all quantum threat is gone with uuidna — including Grover, timing, and Bitcoin ECDSA',
      'rewriting IBM or Google hardware figures as this tree’s own',
    ],
    ingredientsCarried: QC_INGREDIENTS.filter((i) => i.stance !== 'none').length,
    ingredientsTotal: QC_INGREDIENTS.length,
    stagesReached: QC_ROUTE.filter((s) => s.reachedHere).length,
    stagesTotal: QC_ROUTE.length,
    sealableMetrics: QC_CHARACTERISATION.filter((m) => m.sealableHere).length,
    metricsTotal: QC_CHARACTERISATION.length,
    refusedCorrespondences: REFUSED_CORRESPONDENCES,
    arithmetic,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    door: door.door,
    honest: `The score against this document's own definition, every fraction derived from its transcribed `
      + `structure: ingredients carried ${metrics.ingredientsCarried} · stages reached ${metrics.stagesReached} · `
      + `metrics sealable here ${metrics.metricsSealableHere} · fault tolerance attempted ${metrics.faultToleranceAttempted} · `
      + `arithmetic holding ${metrics.arithmeticHolding} · claims backed by the ledger ${metrics.claimsBackedByLedger} `
      + `over ${metrics.itemsTranscribed} transcribed items. A machine that scores 5/5, 4/4 and 8/8 is what this `
      + `document calls a quantum computer; this tree scores what it scores, and the numbers are the whole argument.`,
  }
}

/** renderQcVerdict(v) → CLI / exec / MCP summary lines. Pure. */
export function renderQcVerdict(v: QcVerdict): string {
  return [
    `QC DEMARCATION — "${v.document.title}" (${v.document.publisher}, ${v.document.pages}pp, ${v.document.references.length} refs) · ${v.document.handle}`,
    `  is a quantum computer: NO — and the score is the argument`,
    `  ingredients ${v.metrics.ingredientsCarried} · stages ${v.metrics.stagesReached} · sealable metrics ${v.metrics.metricsSealableHere} · fault tolerance ${v.metrics.faultToleranceAttempted}`,
    `  arithmetic ${v.metrics.arithmeticHolding} · claims backed ${v.metrics.claimsBackedByLedger} · correspondences declined ${v.metrics.correspondencesDeclined} · ${v.metrics.itemsTranscribed} items transcribed`,
    ...v.arithmetic.facts.map((f) => `    ${f.holds ? '✓' : '✗'} ${f.arithmetic}${f.theorem ? `  [${f.theorem}]` : ''}`),
    `  claims, each backed:`,
    ...v.claims.map((c) => `    ${c.theorem}: ${c.statement.slice(0, 64)}`),
    `  refused correspondences (matching counts, deliberately not folded):`,
    ...v.refusedCorrespondences.map((r) => `    ${r.counts}`),
    `  receipt ${handleOf(v.receipt)}… · door ${v.door}`,
  ].join('\n')
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE EXTERNAL AUDIT, FOLDED INTO AUTOMATION.
//
// A second document arrived: an outside reader inspected uuidna.com, the /mcp endpoint and the LIVE quantum tools,
// and wrote up what the model is. Its verdict is favourable on the one axis that matters here — "the decisive
// evidence is internal: UUIDNA's homepage and simulator both distinguish its classical computation from quantum
// hardware" — and it lists, theorem by theorem, exactly what each seal proves and where its scope ends.
//
// AN AUDIT THAT IS READ ONCE IS A COMPLIMENT; AN AUDIT THAT RUNS IS A GUARD. So each finding is transcribed with
// the arithmetic it reports, and `auditConformance()` looks the theorem up in the ledger and checks the statement
// still carries that arithmetic. A later rewording that widened a scope fails here, which is the whole point:
// the outside reader's scope reading becomes this tree's regression test.
//
// AND THE AUDIT IS AUDITED BACK. One finding is REFINED by measurement: the document calls it "a decisive
// technical limitation" that the exposed interface offers "only bell and ghz circuits". The schema also accepts
// `ops` — an arbitrary circuit over h, x, y, z, s, sdg, cx, cz, swap, ccx, ccz — so arbitrary circuits DO run.
// What the gate set omits is the phase/rotation family and modular arithmetic, so period finding stays
// inexpressible: the audit's CONCLUSION holds and its REASON is the gate set rather than the circuit menu. That
// is recorded as REFINED rather than quietly agreed with, because agreeing with a wrong reason is how a correct
// conclusion becomes unfalsifiable.

/** the audit document, addressed the same way the definition document is */
export const QC_AUDIT: QcDocument = {
  title: 'https://uuidna.com/mcp — read the readme and homepage carefully and compute to confirm their quantum model',
  publisher: 'Perplexity',
  pages: 8,
  bytes: 634975,
  address: 'a633c464-7d60-8b5d-bb01-dc018825515b',
  handle: 'a633c464',
  references: [
    'https://uuidna.com/',
    'https://uuidna.com/mcp',
    'https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=902941',
    'https://www.nist.gov/quantum-information-science/quantum-computing-explained',
    'https://ntrs.nasa.gov/api/citations/20240014579/downloads/all.pdf',
    'https://quantum.microsoft.com/en-us/insights/blogs/resource-estimation/calculating-resource-estimates-for-cryptanalysis',
  ],
}

/** The gate set the simulator's `ops` path accepts — the measured reason period finding stays out of reach. */
export const EXPOSED_GATE_SET: readonly string[] =
  ['h', 'x', 'y', 'z', 's', 'sdg', 'cx', 'cz', 'swap', 'ccx', 'ccz']

export type AuditVerdict = 'CONFIRMED' | 'REFINED'

export interface AuditFinding {
  id: string
  /** the ledger key the audit read, when it read one */
  theorem?: string
  /** the arithmetic the audit reported finding in that statement — checked against the ledger */
  arithmetic: readonly string[]
  /** what the seal establishes, in the audit's own reading */
  provesExactly: string
  /** the region the audit places outside that seal's reach */
  outsideScope: string
  verdict: AuditVerdict
  /** set on REFINED: what measurement changes about the audit's reasoning */
  refinement?: string
}

/** Every scope finding the audit recorded, transcribed with its arithmetic so the ledger can be checked against it. */
export const EXTERNAL_AUDIT_FINDINGS: readonly AuditFinding[] = [
  { id: 'n-qubit-dimension', theorem: 'n_qubit_dimension', arithmetic: ['[2,4,8,16,32]'],
    provesExactly: 'the finite list of state-vector dimensions for 1..5 qubits — the CLASSICAL simulation cost',
    outsideScope: 'a quantum advantage, which the seal\u2019s own prose already declines',
    verdict: 'CONFIRMED' },
  { id: 'chsh', theorem: 'chsh_beats_classical', arithmetic: ['2^2 < 2^3', '2^3 = 8'],
    provesExactly: 'the integer encoding that 2\u221a2 exceeds 2 once squared — the CHSH/Tsirelson comparison as arithmetic',
    outsideScope: 'running a CHSH experiment, producing correlations, or closing a loophole in a physical Bell test',
    verdict: 'CONFIRMED' },
  { id: 'majority', theorem: 'majority_vote_is_floor_half', arithmetic: ['(0 + 0 + 0) / 2 = 0'],
    provesExactly: 'the two-of-three majority table, which is also the three-bit repetition code\u2019s table',
    outsideScope: 'implementing quantum error correction — the table is classical arithmetic over a finite domain',
    verdict: 'CONFIRMED' },
  { id: 'teleportation', theorem: 'teleportation_costs_two_coins', arithmetic: ['2 ^ 1 < 2 ^ 2', '2 ^ 2 = 4', '2 * 2 = 4'],
    provesExactly: 'the RESOURCE COUNT teleportation uses — two classical bits beside one entangled pair',
    outsideScope: 'teleporting an unknown state; the protocol is the physics and the count is the bookkeeping',
    verdict: 'CONFIRMED' },
  { id: 'handle-capacity', theorem: 'handle_capacity_is_quantum_by_architecture',
    arithmetic: ['16 ^ 8 = 2 ^ 32', '2 ^ 32 * 2 ^ 96 = 2 ^ 128', '2 ^ 7 = 128'],
    provesExactly: 'the address-space layout: powers of two with the shape qubit dimensions also have',
    outsideScope: 'being a quantum processor — the seal\u2019s own prose says classical silicon, and the audit quotes it',
    verdict: 'CONFIRMED' },
  { id: 'usable-gap', theorem: 'usable_gap_is_two_to_eighty', arithmetic: ['48 < 128', '128 - 48 = 80', '2 ^ 128 = 2 ^ 80 * 2 ^ 48'],
    provesExactly: 'that a 128-bit address space factors as 2^80 \u00b7 2^48 against a reported 48-logical-qubit figure',
    outsideScope: 'a standard quantum-computing performance comparison — Hilbert-space dimension and address capacity are different quantities',
    verdict: 'CONFIRMED' },
  { id: 'shor-full-use', arithmetic: ['16 * 65536 = 1048576'],
    provesExactly: 'a COUNT of amplitude-like entries: sixteen GHZ(16) state vectors laid side by side',
    outsideScope: 'a Shor circuit, modular exponentiation, period finding, or factoring any modulus',
    verdict: 'CONFIRMED' },
  { id: 'state-vector-is-classical', arithmetic: ['2^16 = 65536'],
    provesExactly: 'the simulator\u2019s own output labels itself a classical state-vector simulation and names 2^n as the classical bound',
    outsideScope: 'quantum hardware — and the audit calls this the decisive internal evidence',
    verdict: 'CONFIRMED' },
  { id: 'exposed-circuit-menu', arithmetic: ['11 gates'],
    provesExactly: 'that period finding stays inexpressible through the served interface, so the audit\u2019s conclusion holds',
    outsideScope: 'the audit\u2019s stated REASON, which was the circuit menu',
    verdict: 'REFINED',
    refinement: `the schema also accepts \`ops\`, an arbitrary circuit over ${EXPOSED_GATE_SET.length} gates `
      + `(${EXPOSED_GATE_SET.join(', ')}), so arbitrary circuits DO run. The omission is the phase/rotation family `
      + `and modular arithmetic, which is what period finding needs — the gate set, not the circuit menu.` },
]

export interface AuditConformance {
  definition: 'uuidnaOS\u00b7qc\u00b7audit'
  document: QcDocument
  findings: number
  confirmed: number
  refined: number
  /** findings whose theorem key resolved AND whose reported arithmetic is still in the sealed statement */
  arithmeticHeld: number
  arithmeticChecked: number
  /** any finding whose ledger statement stopped carrying the arithmetic the audit read — a widened scope */
  drifted: { id: string; theorem: string; missing: string[] }[]
  metrics: { conformance: string; arithmeticHeld: string; refinedShare: string }
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

/** leanNormalise(s) → a Lean statement with its TYPE ASCRIPTIONS dropped, so `(2:Nat)^2` and `2^2` compare equal.
 *
 *  The first run of this guard reported drift on chsh_beats_classical: the seal reads `((2:Nat)^2 < 2^3)` and the
 *  audit wrote `2^2 < 2^3`, which is the same arithmetic in the spelling an outside reader uses. Copying the seal's
 *  spelling into the finding would have silenced it and made the check self-satisfying — the instrument would then
 *  agree with the ledger by construction. Normalising the ASCRIPTION on both sides keeps the audit's own wording
 *  and leaves the arithmetic load-bearing: a statement that changed 2^3 = 8 to anything else still fails. Pure. */
export const leanNormalise = (s: string): string =>
  s.replace(/\((\d+)\s*:\s*[A-Za-z]+\)/g, '$1').replace(/\s+/g, ' ')

/** auditConformance() → the external audit, run as a guard. For every finding that names a ledger key, the
 *  reported arithmetic is looked up in the SEALED statement (ascriptions normalised on both sides), so a later
 *  rewording that widened the scope shows up as drift. Pure. */
export function auditConformance(): AuditConformance {
  const byKey = theoremByKey()
  const drifted: { id: string; theorem: string; missing: string[] }[] = []
  let checked = 0
  let held = 0
  for (const f of EXTERNAL_AUDIT_FINDINGS) {
    if (!f.theorem) continue
    checked += 1
    const t = byKey.get(f.theorem)
    const sealed = t ? leanNormalise(t.statement) : ''
    const missing = t ? f.arithmetic.filter((a) => !sealed.includes(leanNormalise(a))) : f.arithmetic.slice()
    if (missing.length === 0) held += 1
    else drifted.push({ id: f.id, theorem: f.theorem, missing })
  }
  const confirmed = EXTERNAL_AUDIT_FINDINGS.filter((f) => f.verdict === 'CONFIRMED').length
  const refined = EXTERNAL_AUDIT_FINDINGS.filter((f) => f.verdict === 'REFINED').length
  const receipt = merkleGravity([
    toUuid('qc-audit|' + QC_AUDIT.address),
    ...EXTERNAL_AUDIT_FINDINGS.map((f) => toUuid(`audit:${f.id}|${f.theorem ?? ''}|${f.verdict}|${f.arithmetic.join(',')}`)),
  ])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS\u00b7qc\u00b7audit',
    document: QC_AUDIT,
    findings: EXTERNAL_AUDIT_FINDINGS.length,
    confirmed,
    refined,
    arithmeticHeld: held,
    arithmeticChecked: checked,
    drifted,
    metrics: {
      conformance: `${confirmed}/${EXTERNAL_AUDIT_FINDINGS.length}`,
      arithmeticHeld: `${held}/${checked}`,
      refinedShare: `${refined}/${EXTERNAL_AUDIT_FINDINGS.length}`,
    },
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    door: door.door,
    honest: `${confirmed} of ${EXTERNAL_AUDIT_FINDINGS.length} findings CONFIRMED and ${refined} REFINED by `
      + `measurement, with ${held}/${checked} sealed statements still carrying the arithmetic the audit read. `
      + `A reading that stays a document is a compliment; run as a check it becomes a guard, so the next rewording `
      + `that widens one of these scopes shows up as drift here.`,
  }
}

export interface QuantumClaimCensus {
  definition: 'uuidnaOS\u00b7qc\u00b7census'
  /** every theorem whose key or name speaks the quantum vocabulary */
  quantumFlavoured: number
  ledger: number
  /** those an audit already names: this document's findings plus the standing quantum-advantage requirement set */
  auditNamed: string[]
  /** those whose own SEALED STATEMENT is decidable arithmetic — the scope every one of them actually has */
  decidable: number
  bySkill: { skill: string; count: number }[]
  metrics: { auditNamed: string; decidable: string; skillsTouched: number }
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

/** quantumClaimCensus() → EVERY quantum-flavoured seal in the ledger, counted, so the quantum vocabulary has one
 *  number rather than an impression. Pure: the population is selected from the ledger's own keys and names. */
export function quantumClaimCensus(): QuantumClaimCensus {
  const T = theorems()
  const VOCAB = /quantum|qubit|ghz|bell|shor|grover|entangl|teleport|coheren|chsh|superposition/i
  const q = T.filter((t) => VOCAB.test(t.key + ' ' + t.name))
  const named = new Set<string>(EXTERNAL_AUDIT_FINDINGS.flatMap((f) => (f.theorem ? [f.theorem] : [])))
  for (const k of QA_REQUIRED_THEOREMS) named.add(k)
  const auditNamed = [...named].filter((k) => T.some((t) => t.key === k)).sort()
  const bySkillMap = new Map<string, number>()
  for (const t of q) bySkillMap.set(t.skill, (bySkillMap.get(t.skill) ?? 0) + 1)
  const bySkill = [...bySkillMap].map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count || a.skill.localeCompare(b.skill))
  const decidable = q.filter((t) => t.tactic === 'decide').length
  const receipt = merkleGravity([toUuid('qc-census'), ...q.map((t) => toUuid('qc-q:' + t.key))])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS\u00b7qc\u00b7census',
    quantumFlavoured: q.length,
    ledger: T.length,
    auditNamed,
    decidable,
    bySkill,
    metrics: {
      auditNamed: `${auditNamed.length}/${q.length}`,
      decidable: `${decidable}/${q.length}`,
      skillsTouched: bySkill.length,
    },
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    door: door.door,
    honest: `${q.length} of ${T.length} sealed statements speak the quantum vocabulary, across ${bySkill.length} `
      + `skills, and ${decidable} of them are proven \`by decide\` — decidable finite arithmetic, which is exactly `
      + `the scope the external audit assigned them. ${auditNamed.length} are named by an audit directly; the rest `
      + `inherit the same scope from the same tactic, and the census reports both numbers rather than one.`,
  }
}

/** renderAuditConformance(a) → CLI / exec / MCP summary lines. Pure. */
export function renderAuditConformance(a: AuditConformance): string {
  return [
    `EXTERNAL AUDIT — "${a.document.publisher}, ${a.document.pages}pp" · ${a.document.handle}`,
    `  findings ${a.metrics.conformance} confirmed · ${a.metrics.refinedShare} refined · sealed arithmetic held ${a.metrics.arithmeticHeld}`,
    ...EXTERNAL_AUDIT_FINDINGS.map((f) =>
      `  ${f.verdict === 'CONFIRMED' ? '✓' : '~'} ${f.id.padEnd(26)} ${f.theorem ?? '(surface)'}`),
    ...(a.drifted.length
      ? a.drifted.map((d) => `  DRIFT ${d.theorem}: statement no longer carries ${d.missing.join(', ')}`)
      : []),
    `  receipt ${handleOf(a.receipt)}… · door ${a.door}`,
  ].join('\n')
}

/** renderQuantumClaimCensus(c) → CLI / exec / MCP summary lines. Pure. */
export function renderQuantumClaimCensus(c: QuantumClaimCensus): string {
  return [
    `QUANTUM VOCABULARY — ${c.quantumFlavoured} of ${c.ledger} seals · ${c.metrics.skillsTouched} skills · by decide ${c.metrics.decidable} · audit-named ${c.metrics.auditNamed}`,
    ...c.bySkill.slice(0, 10).map((s) => `  ${s.skill.padEnd(18)} ${s.count}`),
    `  receipt ${handleOf(c.receipt)}… · door ${c.door}`,
  ].join('\n')
}
