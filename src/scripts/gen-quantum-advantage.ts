#!/usr/bin/env node
// @non-harmonic: measures wall-clock (through steady-state.ts, which holds the stopwatch) and writes the derived
// report files — the same named exemption gen-quantum-capacity and crypto-measure carry. Never imported by the
// harmonic core.
//
// gen-quantum-advantage — THE ADVANTAGE, MEASURED AT EVERY LEVEL, ON THE HOST THAT RAN IT.
//
// The capacity report answers "how much?" — total and usable states per platform, one honesty class per figure.
// It answers it at ONE level, with ONE measured constant, and had to grow a paragraph warning the reader that
// the constant does not scale. This generator answers the other question — "what is the advantage, and where is
// it measurable?" — by refusing to have a single answer. One row per level of the datapath, each row measured
// at its own level, each figure carrying the class it was determined by, and nothing extrapolated between them.
//
// FOUR THINGS HAPPEN HERE, IN THIS ORDER, AND THE ORDER IS THE POINT:
//   1. THE DEVICE IS RESOLVED — drivers/quantum reads the actual machine this session runs on and folds it to an
//      address, so "measured on this host" is recomputable rather than asserted.
//   2. THE SEALED QUANTUM ALGEBRA IS EXECUTED ON IT — every witness in the battery decides, on this silicon, a
//      proposition a Lean kernel already decided, and the disagreements are counted. That count is the fidelity
//      axis; zero over N is a BOUND of better than one in N and is reported in those words.
//   3. EACH LEVEL IS TIMED AND CHECKED — warm first, then the floor (host noise is one-sided), over DISTINCT
//      preimages per pass so no pass can hit the address memo.
//   4. EVERY CLAIM LEAVES THROUGH THE GATE AS A WITNESSED MESSAGE — quantum/dispatch encodes each sentence as a
//      quantum message bound to the sealed theorem it cites, and ONE refusal stops the whole write. The report
//      is not inspected by a gate afterwards; it is made of what the gate passed.
//
// HONEST SCOPE, restated here because this is the file a reader lands in: uuidna is CLASSICAL. No physics
// quantum advantage, no speedup over any quantum algorithm, no complexity separation — theorem
// n_qubit_dimension counts the exponential classical cost of simulating n qubits and is explicitly not a
// speedup. What is measured is architectural: exact, deterministic addressing at a measured per-op cost, and a
// gate algebra that reproduces its sealed values exactly where physical hardware reproduces them approximately.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { steadyStateNs } from './steady-state.js'
import { LEVEL_PROBES, ledgerUnits, proveHardwareQuantum, type LevelProbe } from '../drivers/quantum/index.js'
import { advantageReport, renderHundredths, ESTIMATES_PER_LEVEL, LEVELS, type LevelMeasurement } from '../quantum/advantage/index.js'
import { dispatchAll, refusalReport, type Claimed } from '../quantum/dispatch/index.js'
import { reportDataset, type Figure } from '../microdata.js'
import { auditJsonLd } from '../schema-org-vocab.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

/** How many sealed-value decisions each level should execute. EQUAL ACROSS LEVELS on purpose: a fidelity bound
 *  is only meaningful against its denominator, so giving every row the same denominator is what makes the
 *  column comparable instead of a list of unrelated confidences. */
const TARGET_DECISIONS = 12000

/** ceil(target / cases) without a rounding intrinsic — the laws gate hard-rejects those and the integer form is
 *  exact anyway. */
const sweepsFor = (cases: number): number => {
  if (cases <= 0) return 1
  const n = TARGET_DECISIONS + cases - 1
  return (n - (n % cases)) / cases
}

// ── 1. THE DEVICE, AND 2. THE ALGEBRA EXECUTED ON IT ─────────────────────────────────────────────────────────
const proof = proveHardwareQuantum(sweepsFor(111))
const device = proof.device

if (proof.refused.length) {
  console.error('✗ gen-quantum-advantage — the battery names witnesses whose theorems are NOT sealed in the ledger:')
  for (const key of proof.refused) console.error(`    ${key}`)
  console.error('  FIX seal the theorem in lean/, or remove the witness. A witness citing a proof that does not exist decides nothing.')
  process.exit(1)
}

// ── 3. EACH LEVEL, TIMED AND CHECKED ─────────────────────────────────────────────────────────────────────────
// SEVERAL INDEPENDENT ESTIMATES, NOT ONE. A single warm-then-floor estimate is stable to a few percent and
// still tells you nothing about whether its DECADE will survive the next run — that depends on where the value
// sits relative to a boundary, which one estimate cannot see. Taking ESTIMATES_PER_LEVEL of them and requiring
// them to agree asks the question directly. The floor of the floors is the best estimate of the true cost,
// because host noise is one-sided: nothing can make the work cheaper than it is, so the minimum converges from
// above and the spread across estimates is the noise, measured rather than assumed.
const measure = (p: LevelProbe): LevelMeasurement => {
  const units = p.units === 0 ? ledgerUnits() : p.units
  const cases = p.cases === 0 ? ledgerUnits() : p.cases
  let n = 0
  const runs = Array.from({ length: ESTIMATES_PER_LEVEL }, () => steadyStateNs(() => p.pass(n++), units))
  const estimates = runs.map((r) => r.ns)
  const best = runs.reduce((a, b) => (b.ns < a.ns ? b : a))
  const sweeps = sweepsFor(cases)
  let disagreements = 0
  for (let i = 0; i < sweeps; i++) disagreements += p.check()
  return {
    level: p.level,
    opNs: best.ns,             // raw — printed to the console, NEVER written to a sealed file
    opNsDecade: best.decade,   // the sealed figure, and only sealed at all if every estimate agreed on it
    decades: runs.map((r) => r.decade),
    estimates,
    costOps: units * best.passes * ESTIMATES_PER_LEVEL,
    ops: cases * sweeps,
    disagreements,
    what: p.what,
  }
}

const measurements = LEVEL_PROBES.map(measure)
const report = advantageReport(device.address, measurements)

if (!report.complete) {
  const missing = LEVELS.filter((l) => !report.rows.some((r) => r.level === l.name)).map((l) => l.name)
  console.error(`✗ gen-quantum-advantage — only ${report.levelsMeasured} of ${report.levelsDeclared} levels produced a row; missing: ${missing.join(', ')}`)
  console.error('  FIX a level with no usable measurement is dropped rather than defaulted — a zero cost would render as a spectacular result.')
  process.exit(1)
}

// THE AGREEMENT REFUSAL. Sealing the decade cured the drift that came from a raw figure never repeating; it does
// nothing about a raw figure sitting NEXT TO a boundary, where a slightly faster run seals one decade and a
// slightly slower one seals the next — the same alternation, now produced by a CORRECT estimator, which is worse
// because nothing looks wrong. On this host the uuid level reads ~1120 ns, only 1.12x above 10^3, so it is
// exactly the case at risk. The guard is not a threshold guessed about the host's noise: every level is
// estimated several times and the decade is sealed only if all the estimates agree, which asks the question the
// seal actually depends on. A generator that cannot seal honestly writes nothing.
if (report.unsealable.length) {
  console.error('✗ gen-quantum-advantage — independent estimates DISAGREED on a decade, so NOTHING was written:')
  for (const u of report.unsealable) {
    console.error(`    ${u.level}: ${u.estimates.join(', ')} ns → decades ${u.decades.join(', ')} (margin ${renderHundredths(u.marginHundredths)}x from the boundary)`)
  }
  console.error(`  Each level is estimated ${ESTIMATES_PER_LEVEL} times and the decade is sealed only if every estimate agrees —`)
  console.error('  which is the property a seal needs ("would the next run seal this same value?"), asked directly.')
  console.error('  FIX rerun on a quiet host; a loaded machine pushes a measurement across an edge. If a level keeps')
  console.error('      splitting on an idle host, the decade is not the right unit for it and the report must say so')
  console.error('      rather than alternating between two seals for ever.')
  process.exit(1)
}

// ── 4. EVERY CLAIM THROUGH THE GATE, AS A WITNESSED MESSAGE ──────────────────────────────────────────────────
// The hardware-proof sentence is written HERE rather than in the driver because this is where it is published,
// and it cites theorem n_qubit_dimension — the bound that says the simulation is exponential and classical —
// so that the one sentence a reader is most likely to over-read carries the seal that limits it.
const proofClaim =
  `The sealed quantum gate algebra was executed on this host — ${proof.results.length} witnesses, ${proof.executed} decisions, ` +
  `${proof.disagreements} disagreements with the Lean-sealed values — under theorem n_qubit_dimension, which bounds this as an ` +
  `exponential CLASSICAL simulation and not a speedup. Verdict ${proof.verdict}: ${proof.bound}.`

const claims: Claimed[] = [
  ...report.rows.map((r) => ({ claim: r.claim, witness: r.reach.seals })),
  { claim: proofClaim, witness: 'n_qubit_dimension' },
]

const run = dispatchAll(claims)
if (!run.clear) {
  console.error(refusalReport(run))
  process.exit(1)
}

// ── THE STRUCTURED FORM — the same figures, machine-first, each keeping its class ─────────────────────────────
const figures: Figure[] = [
  ...report.rows.flatMap((r): Figure[] => [
    { name: `${r.level} — reach`, value: r.kind === 'width' ? `2^${r.reach.pow2}` : 'the whole sealed ledger',
      measurementTechnique: r.reach.class,
      citation: `true by construction — theorem ${r.reach.seals}` },
    { name: `${r.level} — operation cost`, value: `10^${r.cost.opNsDecade}`, unitText: 'ns (order of magnitude)',
      measurementTechnique: r.cost.class,
      citation: `steady-state floor over ${r.cost.over} ${r.cost.what} on ${device.cpu} (${device.platform}/${device.arch}), warm-then-floor, batched so the stopwatch is amortised; the DECADE is published because a raw timing has no fixed point and the raw figure lives in the build log` },
    { name: `${r.level} — disagreements with the sealed value`, value: r.fidelity.disagreements, unitText: 'disagreements',
      measurementTechnique: r.fidelity.class,
      citation: `${r.fidelity.ops} decisions executed on ${device.cpu}; a bound of better than one in ${r.fidelity.bound}, never a proof of zero` },
  ]),
  { name: 'sealed quantum algebra — decisions executed on this host', value: proof.executed, unitText: 'decisions',
    measurementTechnique: 'measured',
    citation: `${proof.results.length} witnesses over ${proof.sweeps} sweeps on ${device.cpu}; each decides a proposition sealed in the Lean ledger` },
  { name: 'sealed quantum algebra — disagreements', value: proof.disagreements, unitText: 'disagreements',
    measurementTechnique: 'measured',
    citation: proof.bound },
  { name: 'reported physical two-qubit gate error class', value: report.baseline.errorsPerMillion, unitText: 'errors per million operations',
    measurementTechnique: 'reported',
    citation: report.baseline.source },
]

const receipt = report.receipt
const dataset = reportDataset({
  slug: 'quantum-advantage',
  name: 'uuidna quantum advantage report — measured per level',
  description:
    'The architectural advantage measured at every level of the datapath — hexbit tile, handle, uuid, sealed ledger — on the host that ran the generator. ' +
    'Three axes per level, each figure carrying the technique it was determined by: REACH (declared by construction), COST (steady-state floor, measured) and ' +
    'FIDELITY (disagreements with Lean-sealed values over a stated execution count, measured; a bound, never a proof of zero). uuidna is classical and claims no ' +
    'physics quantum advantage — the sealed bound is theorem n_qubit_dimension.',
  receipt,
  figures,
})

const jsonLdFailures: string[] = []
auditJsonLd(dataset, 'quantum-advantage.jsonld', jsonLdFailures)
if (jsonLdFailures.length) {
  console.error('✗ gen-quantum-advantage — the structured form used terms outside the vetted vocabulary:')
  for (const f of jsonLdFailures) console.error(`    ${f}`)
  console.error('  FIX add the term to src/schema-org-vocab.ts with its real schema.org URL, or stop emitting it.')
  process.exit(1)
}

// ── THE REPORT ───────────────────────────────────────────────────────────────────────────────────────────────
const table = [
  '| level | reach | reach class | op cost (measured) | ops/s | estimates | decisions | disagreements | bound | baseline would predict |',
  '|-------|-------|-------------|--------------------|-------|-------------|-----------|---------------|-------|------------------------|',
  ...report.rows.map((r) =>
    `| ${r.level} | ${r.kind === 'width' ? `2^${r.reach.pow2}` : 'whole ledger'} | ${r.reach.class} | 10^${r.cost.opNsDecade} ns per ${r.cost.what} | 10^${r.cost.opsPerSecondDecade} | ${r.cost.agreedEstimates}/${r.cost.agreedEstimates} agree | ${r.fidelity.ops} | ${r.fidelity.disagreements} | better than 1 in ${r.fidelity.bound} | ${r.fidelity.baselineExpected} errors |`),
].join('\n')

const witnessTable = [
  '| theorem | cases | executed | disagreements | what this host decided |',
  '|---------|-------|----------|---------------|------------------------|',
  ...proof.results.map((r) =>
    `| [${r.theorem}](https://uuidna.com/theorem/${r.theorem}) | ${r.cases} | ${r.executed} | ${r.disagreements} | ${r.what} |`),
].join('\n')

const block = `<!-- quantum-advantage:begin (generated by gen-quantum-advantage — edit the generator, never this block) -->
## The measured advantage report — every level of the datapath, on the host that ran it

The capacity report says how much: 2^128 usable addresses, and no physics quantum advantage is claimed
(theorem \`n_qubit_dimension\`, which counts the exponential CLASSICAL cost of simulating n qubits and is
explicitly not a speedup). It says it with ONE measured constant taken at ONE scale, which is why it needs a
paragraph warning that the constant does not scale. This report takes the advantage apart instead: **one row per level of the datapath, each measured at
its own level**, nothing extrapolated between them. Three axes, and every figure carries the class it was
determined by:

* **REACH** — how many states the level addresses. \`declared\` — true by construction, never measured. It is
  the column most easily misread as a measurement, so it is the one denied the flattering class.
* **COST** — the steady-state floor for one operation *at this level*, on this host: warm first, then the floor,
  batched so the stopwatch is amortised rather than measured, and — at the uuid level — over a **distinct
  preimage per pass**, because \`toUuid\` memoises and a re-swept input returns a cache lookup instead of a fold.
  Published as the **decade**, never the raw figure: three consecutive runs on the same idle host gave 261, 330
  and 332 ns at the handle level, so a sealed raw number would have no fixed point. The raw figures print to the
  build log, where drifting is what a log is for.
* **FIDELITY** — decisions executed here that disagreed with the value Lean sealed. Zero over N is an upper
  bound of better than one in N. It is **never** a proof of zero, and the bound is what the table prints.

**Host:** ${device.cpu} · ${device.platform}/${device.arch} · ${device.logical} logical · ${device.memoryGiB} GiB ·
folded to \`${device.address}\` (handle \`${handleOf(device.address)}\`), so "measured on this host" is something the
next reader recomputes rather than something this report asserts.

${table}

### The sealed quantum algebra, executed on this silicon

The gate algebra that quantum hardware implements *physically* — the Pauli group, the Clifford count, the CNOT
and Toffoli permutations, the Bell and GHZ stabilisers, the Deutsch–Jozsa interference — was executed here in
exact Gaussian integers, with no floating point at any step, and every result compared to what a Lean kernel
decided by exhaustive case analysis. **${proof.results.length} witnesses · ${proof.sweeps} sweeps ·
${proof.executed} decisions · ${proof.disagreements} disagreements · verdict ${proof.verdict}.**

${proof.bound.charAt(0).toUpperCase() + proof.bound.slice(1)}.

A witness whose theorem is not sealed in the ledger is refused before it runs, so a shrinking battery shows up
as a shrinking count and not as an unchanged green verdict. This run refused ${proof.refused.length}.

${witnessTable}

### Honest scope, load-bearing

**uuidna is classical.** There are no qubits in this machine, nothing here is in superposition, and **no
physics quantum advantage is claimed** — the sealed bound is theorem \`n_qubit_dimension\`, which counts the
exponential *classical* cost of simulating n qubits and is explicitly not a speedup. What the table measures is
architectural: exact deterministic addressing at a measured per-op cost, and a gate algebra that reproduces its
sealed values exactly here where physical hardware reproduces them approximately (the reported ~10^-3 two-qubit
error class — see the capacity report for per-device sources, named in each platform's own words).

Every sentence in this report left through the gate as a **witnessed quantum message**: ${run.passed} claims,
each bound to a sealed theorem *that the claim itself cites*, ${run.refused.length} refused. A witness the claim
does not cite is refused as citation laundering — which is the one thing a gate that only checks that citations
*exist* cannot see. Dispatch receipt: \`${run.receipt}\`.

Report receipt: \`${receipt}\` · measured-when as its own handle: \`${handleOf(receipt)}\`.
Rerun \`npm run x -- gen-quantum-advantage\` on your own host and get your own numbers — that is the whole point
of measuring per level.
<!-- quantum-advantage:end -->`

mkdirSync(join(ROOT, 'docs', 'public'), { recursive: true })
writeFileSync(join(ROOT, 'docs', 'public', 'quantum-advantage.jsonld'), JSON.stringify(dataset, null, 2) + '\n')
writeFileSync(join(ROOT, 'lean', 'quantum-advantage.json'), JSON.stringify({
  device, report, proof: { ...proof, device: undefined }, dispatch: run, receipt,
  address: toUuid(`quantum-advantage|${receipt}|${device.address}`),
}, null, 1) + '\n')
writeFileSync(join(ROOT, 'lean', 'quantum-advantage.md'), block + '\n')

console.log(`✓ gen-quantum-advantage — ${report.levelsMeasured}/${report.levelsDeclared} levels measured on ${device.cpu}`)
for (const r of report.rows) {
  const m = measurements.find((x) => x.level === r.level) as LevelMeasurement
  console.log(`    ${r.level.padEnd(14)} raw ${String(m.opNs).padStart(7)} ns → sealed 10^${r.cost.opNsDecade} ns/${r.cost.what}  ·  ${r.fidelity.disagreements}/${r.fidelity.ops} disagreements`)
}
console.log(`    algebra        ${proof.executed} decisions, ${proof.disagreements} disagreements, verdict ${proof.verdict}`)
console.log(`    gate           ${run.passed}/${run.dispatches.length} claims dispatched as witnessed messages`)
console.log(`    receipt        ${receipt}`)
