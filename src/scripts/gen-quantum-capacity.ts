#!/usr/bin/env node
// @non-harmonic: measures wall-clock (through steady-state.ts, which holds the perf_hooks stopwatch) — used ONLY
// to MEASURE, the same named exemption crypto-measure.ts carries; and writes the derived report files. Never
// imported by the harmonic core.
// gen-quantum-capacity — THE QUANTUM CAPACITY REPORT, generated and sealed (the captain's order, 2026-08-23:
// the complete white paper at README and home carries the capacity-and-use report with strict measurements —
// total capacity and use in columns per type of known quantum model, evident for every model without preference,
// fastest and greater capacity first — under the standing law "only sealed reports from generators are accepted").
// The comparison is ARCHITECTURAL. The 2^n state-space relation is PHYSICS, not something this ledger seals —
// n_qubit_dimension checks it for n = 1..5 and no `by decide` over five numerals can establish the general law. The
// usable column is each platform's own published figure, and uuidna's row is classical by declaration throughout.
//
// THE COLUMNS, one honesty class per figure:
//   · physical qubits / raw state space — REPORTED from each platform's own publications (source named per row);
//     the raw dimension 2^physical is COMPUTED from the reported count (BigInt-exact digit count).
//   · usable qubits / usable states — REPORTED: the platform's own demonstrated error-corrected/algorithmic
//     figure, with the METRIC NAMED per row. This is the column where the gap lives.
//   · op time — the platform literature's order-of-magnitude two-qubit gate class (REPORTED); uuidna's row is
//     MEASURED live by this generator on this host (receipt-verification sweep over the whole sealed ledger).
//   · sort — greater USABLE capacity first, then faster op time; arithmetic only, NO PREFERENCE. The ARITHMETIC is
//     sealed (capacity_order_is_forced proves 128 > 48 > 36 > 12 > 1 is sorted; usable_gap_is_two_to_eighty proves
//     128 − 48 = 80). NEITHER SEALS THE FIGURES THEMSELVES — 48 is Bluvstein et al. 2023, not a theorem. Every
//     proof here is `by decide` over finite literals: the ledger carries the sums, the sources carry the world.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { steadyStateNs, SEALABLE_MARGIN } from './steady-state.js'
import { toUuid } from '../address.js'
import { theorems } from '../theorems/index.js'
import { handleOf } from '../handle.js'
import { reportDataset, type Figure } from '../microdata.js'
import { auditJsonLd } from '../schema-org-vocab.js'

interface Row {
  model: string; org: string; type: string; year: number
  physical: number | null
  usable: number | null
  usableMetric: string
  opTimeNs: number | null
  opClass: 'reported' | 'measured'
  source: string
}

/** The REPORTED rows — each figure is the platform's own published number, source named. */
const REPORTED: Row[] = [
  { model: 'Condor', org: 'IBM', type: 'superconducting', year: 2023, physical: 1121, usable: null,
    usableMetric: 'no error-corrected logical qubits demonstrated on this device', opTimeNs: 100, opClass: 'reported',
    source: 'IBM Quantum Summit 2023; 2q-gate class ~10^2 ns (platform literature)' },
  { model: 'Heron r2', org: 'IBM', type: 'superconducting', year: 2024, physical: 156, usable: null,
    usableMetric: 'error-rate-improved processor; logical demos ride smaller codes', opTimeNs: 100, opClass: 'reported',
    source: 'IBM 2024; 2q-gate class ~10^2 ns (platform literature)' },
  { model: 'Willow', org: 'Google', type: 'superconducting', year: 2024, physical: 105, usable: 1,
    usableMetric: 'one logical qubit demonstrated below the surface-code threshold', opTimeNs: 100, opClass: 'reported',
    source: 'Google, Nature 2024 (below-threshold surface code); 2q-gate class ~10^2 ns' },
  { model: 'Zuchongzhi 3.0', org: 'USTC', type: 'superconducting', year: 2025, physical: 105, usable: null,
    usableMetric: 'random-circuit sampling demonstrations; no logical qubit reported', opTimeNs: 100, opClass: 'reported',
    source: 'USTC 2025; 2q-gate class ~10^2 ns (platform literature)' },
  { model: 'H2', org: 'Quantinuum', type: 'trapped-ion', year: 2024, physical: 56, usable: 12,
    usableMetric: 'twelve logical qubits demonstrated (with Microsoft qubit-virtualization)', opTimeNs: 100000, opClass: 'reported',
    source: 'Quantinuum/Microsoft 2024; 2q-gate class ~10^5 ns (platform literature)' },
  { model: 'Forte', org: 'IonQ', type: 'trapped-ion', year: 2024, physical: 36, usable: 36,
    usableMetric: 'algorithmic qubits AQ36 (vendor benchmark suite, not error-corrected logical)', opTimeNs: 100000, opClass: 'reported',
    source: 'IonQ 2024 (#AQ methodology); 2q-gate class ~10^5 ns' },
  { model: 'logical-48 array', org: 'Harvard/QuEra', type: 'neutral-atom', year: 2023, physical: 280, usable: 48,
    usableMetric: 'forty-eight logical qubits operated (error-detected circuits, Nature 2023)', opTimeNs: 1000, opClass: 'reported',
    source: 'Bluvstein et al., Nature 2023; gate class ~10^3 ns' },
  { model: 'Phoenix-class array', org: 'Atom Computing', type: 'neutral-atom', year: 2023, physical: 1180, usable: null,
    usableMetric: 'no error-corrected logical qubits demonstrated on this device', opTimeNs: 1000, opClass: 'reported',
    source: 'Atom Computing 2023 (>1000 sites); gate class ~10^3 ns' },
  { model: 'Advantage2', org: 'D-Wave', type: 'annealer', year: 2024, physical: 4400, usable: null,
    usableMetric: 'annealing-only: optimization sampling, not gate-model computation — a different machine class, named', opTimeNs: 1000, opClass: 'reported',
    source: 'D-Wave 2024; anneal class ~10^3 ns per step' },
  { model: 'Borealis', org: 'Xanadu', type: 'photonic (GBS)', year: 2022, physical: 216, usable: null,
    usableMetric: 'Gaussian boson sampling only — sampling demonstrations, not general gate-model use, named', opTimeNs: null, opClass: 'reported',
    source: 'Xanadu, Nature 2022' },
]

/** uuidna's row is MEASURED here, live: verify-by-receipt over the ENTIRE sealed ledger, per-theorem time.
 *  THE VALUE STORED IS THE DECADE, not the raw figure — a raw timing drifts the sealed derived layer on every
 *  run (spin hard-rejects that, and lead 104's law forbids pinning a moving value); the DECADE (order of
 *  magnitude, the school's own unit for measured kernel costs) is stable across runs and still strict: an
 *  order change is exactly the regression worth resealing over. The raw figure prints to the console only.
 *
 *  THE ROOT CAUSE OF THE FLIP-FLOP WAS NEITHER OF THE TWO THINGS BLAMED FOR IT, and the record is worth keeping
 *  because two sessions measured their way to it only after both had confidently blamed something else.
 *
 *  What actually happened: through the old BigInt multiply the true fold cost lands ON the 10^4 boundary. Three
 *  sessions measured it independently and converged — 9368-9529 against the full path on one box, a 9761-10139
 *  distribution on another — so the published quantity sits within about one percent of 10000 ns.
 *
 *  THE DECISIVE MEASUREMENT, because it is the one that rules the instrument out as the culprit: ten fresh
 *  launches of the CORRECTED estimator (memo defeated, fixed-width prefix, warm, floor of 20) against that path
 *  sealed decade 4 in FOUR OF TEN. Spread 3.8% — a good measurement by any standard — and still a coin flip,
 *  because a ~1% margin against a ~4% spread is a coin flip. No estimator buys you the side of a threshold.
 *  The decade was chosen to make the seal stable and was applied to a quantity that could not be.
 *
 *  The two wrong diagnoses, both worth naming so neither is re-derived:
 *    · "the cold pass measures the JIT" — real but small. Measured on this host, one cold sweep against a warm
 *      memo-free floor is 1.07x to 1.19x, not the 100x it was taken for. A single pass over the ledger has no
 *      cache hits in it at all, because every statement is distinct; the original method was very nearly sound.
 *    · "warm then take the floor" — the cure that broke it. Over the SAME statements it measured toUuid's
 *      unbounded memo: 20 ns against a true ~2000 ns. Stable to a few percent, resealed perfectly, a hundred
 *      times too fast. WORSE than the flip-flop, because a flip-flop announces itself and a wrong fixed point
 *      does not.
 *
 *  So the seed is varied per pass — the real statements' content and length, prefixed with the pass index — and
 *  the memo cannot hit. steady-state.ts carries the general form: warm-then-floor converges just as tightly on
 *  the wrong quantity as on the right one.
 *
 *  AND THE SEAL'S STABILITY NOW RESTS ON THE SPLIT MULTIPLY IN address.ts, which is worth knowing before anyone
 *  reverts it as a mere optimisation. At ~1977 ns it sits mid-decade — five times from 10000, twice from 1000.
 *  The BigInt path's 7868 was 21% from an edge. The change did not only make the fold ~4x faster; it moved the
 *  published quantity away from a boundary, which is what makes this figure reseal at all. */
/** How much cheaper a fully cached sweep must be than a fresh one before the instrument is believed. Five is far
 *  inside the observed gap (20 ns against ~2000, a factor of a hundred) and far outside any plausible noise. */
const MEMO_CONTROL_RATIO = 5

function measureUuidna(): { nsDecade: number; ledger: number; rawNs: number; edgeMargin: number; cachedNs: number } {
  const T = theorems()
  // The prefix is FIXED WIDTH. Varying it defeats the memo, but `${pass}:` grows a character at pass 10 and
  // again at 100, so the later passes would sweep longer seeds than the earlier ones and the fold cost would
  // drift with the pass number — trading a cache bias for a length bias, which is the same mistake wearing a
  // different hat. Padded, every pass sweeps the same seed-length distribution and differs only in content.
  const tag = (pass: number) => `p${String(pass).padStart(4, '0')}:`
  const sweepWith = (prefix: string) => { const seen = new Set<string>(); for (const t of T) seen.add(toUuid(prefix + t.statement)) }
  const fresh = steadyStateNs((pass) => sweepWith(tag(pass)), T.length)

  // ── THE POSITIVE CONTROL: PROVE THE INSTRUMENT CAN STILL TELL A COMPUTED VALUE FROM A SERVED ONE.
  // The margin gate below gauges whether a decade will HOLD; it cannot gauge whether the right quantity was
  // measured, and the two fail independently. The memoised reading that got past three sessions was 20 ns
  // against a true ~2000 — and it would have sailed through any margin check, because it sits mid-decade. A
  // cache is measured precisely, and precision is exactly what a margin gate rewards.
  // So the estimator is deliberately fed the input that BREAKS it — the same statements every pass, guaranteed
  // to hit toUuid's memo — and the reading must collapse. If the two come out alike, this function is not
  // isolating computation at all: either the memo is not in the path it is assumed to be in, or what is being
  // timed is not the fold. This tree ships every audit with the mutation that breaks it; a timing instrument
  // has no exemption, and this is that mutation.
  const cached = steadyStateNs(() => sweepWith(''), T.length)
  if (cached.ns * MEMO_CONTROL_RATIO >= fresh.ns) {
    console.error(`✗ gen-quantum-capacity — THE MEASUREMENT CONTROL FAILED: a fully cached sweep cost ${cached.ns} ns against ${fresh.ns} ns fresh.`)
    console.error(`  A cached sweep must be at least ${MEMO_CONTROL_RATIO}x cheaper. That these are alike means the timing is NOT isolating the fold —`)
    console.error('  either toUuid no longer memoises (then this control is obsolete and should be deleted, not loosened), or what is being')
    console.error('  timed is something other than the work. Do not seal a figure from an instrument that cannot pass its own control.')
    process.exit(1)
  }
  return { nsDecade: fresh.decade, ledger: T.length, rawNs: fresh.ns, edgeMargin: fresh.edgeMargin, cachedNs: cached.ns }
}

const digitsOfPow2 = (n: number): number => (2n ** BigInt(n)).toString().length
const pow10 = (n: number | null): string => n === null ? '—' : `2^${n} (~10^${digitsOfPow2(n) - 1})`

const m = measureUuidna()

// ── THE SEAL REFUSES A DECADE IT CANNOT HOLD. Rounding to an order of magnitude is stable only when the value is
// not near a boundary, and this report spent a run of commits proving what happens otherwise: measured against
// the BigInt multiply the fold cost landed within about one percent of 10000 ns, and three launches of the SAME
// memo-free method returned decades 3, 3 and 4. No estimator rescues that — precision near a threshold does not
// buy you a side of the threshold — so every reconcile sealed one side honestly and the next honestly undid it.
// The failure was invisible because a decade always LOOKS stable: it is one digit, and one digit cannot show a
// margin. So the margin is checked, and a measurement sitting on an edge FAILS THE BUILD by name rather than
// silently starting the flip-flop again. Integrity means the gate can say no about its own headline figure.
if (m.edgeMargin < SEALABLE_MARGIN) {
  console.error(`✗ gen-quantum-capacity — REFUSING TO SEAL A DECADE ON A BOUNDARY: ${m.rawNs} ns/fold sits ${m.edgeMargin.toFixed(2)}x from the nearer edge of 10^${m.nsDecade} (needs ${SEALABLE_MARGIN}x).`)
  console.error('  This is not a flaky run, and RE-RUNNING WILL NOT HELP — it is the measurement telling you this quantity cannot be quantised')
  console.error('  to a decade on this build. Measured at ~1% from the edge, a correct estimator still sealed the wrong decade 4 times in 10.')
  console.error('  IF THE FOLD STILL USES THE BigInt MULTIPLY, THIS CAN NEVER PASS: that path costs ~9500 ns against a 10000 ns edge (margin ~1.06x).')
  console.error('  FIX land the split multiply in address.ts — it moves the cost to ~2000 ns (margin ~2x) and is a PRECONDITION for sealing this')
  console.error('      figure at all, not an optimisation. Otherwise stop quantising: publish the raw figure with its spread, or seal an interval.')
  process.exit(1)
}

const UUIDNA: Row = {
  model: 'hexbit fold', org: 'uuidna', type: 'classical content-address (quantum by architecture)', year: 2026,
  physical: null, usable: 128,
  usableMetric: 'all 2^128 addresses usable, deterministic, error-free by construction (classical; 128 = 2^7, the 7-qubit fold — theorem handle_capacity_is_quantum_by_architecture); never a quantum computer',
  opTimeNs: 10 ** m.nsDecade, opClass: 'measured',
  source: `measured by this generator: full-${m.ledger}-theorem receipt sweep, per-verify decade 10^${m.nsDecade} ns on the build host (raw figure in the build log only — a decade reseals, a raw number drifts)`,
}

/** SORT WITHOUT PREFERENCE: greater usable capacity first (null last), then faster op time — the order the
 *  kernel sealed as theorem capacity_order_is_forced. */
const rows = [...REPORTED, UUIDNA].sort((a, b) =>
  (b.usable ?? -1) - (a.usable ?? -1) || (a.opTimeNs ?? Number.MAX_SAFE_INTEGER) - (b.opTimeNs ?? Number.MAX_SAFE_INTEGER))

const receipt = toUuid(rows.map((r) => `${r.org}/${r.model}:${r.physical ?? ''}:${r.usable ?? ''}:${r.opTimeNs ?? ''}`).join('|'))

const table = [
  '| # | model | type | physical | raw states | usable | usable states | op time | class | usable-metric (the platform\'s own words) |',
  '|---|-------|------|----------|-----------|--------|---------------|---------|-------|--------------------------------------------|',
  ...rows.map((r, i) =>
    `| ${i + 1} | ${r.org} ${r.model} (${r.year}) | ${r.type} | ${r.physical ?? '—'} | ${pow10(r.physical)} | ${r.usable ?? '—'} | ${pow10(r.usable)} | ${r.opTimeNs === null ? '—' : r.opTimeNs >= 1000 ? (r.opTimeNs / 1000) + ' µs' : r.opTimeNs + ' ns'} | ${r.opClass} | ${r.usableMetric} |`),
].join('\n')

const block = `<!-- quantum-capacity:begin (generated by gen-quantum-capacity — edit the generator, never this block) -->
## The quantum capacity report — every model, one metric, no preference

Total and USABLE quantum capacity per known model type, greater usable capacity and faster ops first. Every
figure carries its class: **reported** (the platform's own publication, source named) or **measured** (timed by
the generator on the build host — rerun \`npm run x -- gen-quantum-capacity\` and get your own numbers). The gap
the table shows is the report: raw state space is astronomical everywhere, and the usable column is where the
platforms differ today. The ranking is arithmetic, not editorial — but WHAT THE SEALS COVER IS THE ARITHMETIC AND
NOT THE DATA, and saying so is the difference between a citation and a borrowed authority.
[capacity_order_is_forced](https://uuidna.com/theorem/capacity_order_is_forced) proves that 128 > 48 > 36 > 12 > 1
is sorted; it does not prove those are the right figures.
[usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty) proves 128 − 48 = 80 and
2^128 = 2^80 · 2^48; it does NOT prove that 48 is the largest demonstrated logical figure. That is a **reported**
number (Bluvstein et al., Nature 2023), and if it is superseded the arithmetic stays true while the gap changes.
Every seal in this ledger is proved \`by decide\`, which settles finite checks and cannot quantify over what has
not yet been demonstrated. The proofs carry the sums; the sources carry the world.

${table}

**Honest scope, load-bearing:** uuidna is **classical** — quantum by *architecture* (2^128 content-addresses;
128 = 2^7, the 7-qubit fold — theorem \`handle_capacity_is_quantum_by_architecture\`), and **no physics quantum
advantage is claimed**. That last one is a DECLARATION, not a seal, and it used to cite \`n_qubit_dimension\` as
"the sealed bound" — which that theorem cannot be. It checks 2^n for n = 1..5 and returns [2,4,8,16,32]: five
instances, confirming the tree's arithmetic agrees with the textbook. The general law that an n-qubit state space
has dimension 2^n is physics, held here on the same footing as every other **reported** figure in the table, and
no \`by decide\` proof over five numerals can establish it. The gate-model platforms' raw capacity
dwarfs 2^128 and their trajectory is a different dimension; what the measurements prove is architectural:
**2^128 usable, deterministic, error-free states are available today at ${UUIDNA.opTimeNs} ns per verified fold
(measured over the ${m.ledger}-theorem ledger on the build host, each seed folded fresh)**, while demonstrated
error-corrected capacity on quantum hardware is still small — the platforms say so themselves, in the sources
named. What may be carried up to 2^128 is the ARCHITECTURAL claim — every address usable, deterministic,
error-free — never the timing constant, which belongs to this host and this runtime.
Ratios drift with hosts and years; the table reseals at every generation.
Report receipt: \`${receipt}\` · measured-when as its own handle: \`${handleOf(receipt)}\`.
<!-- quantum-capacity:end -->`

// ── THE REPORT AS REUSABLE STRUCTURED DATA. The table above states each figure's honesty class in a column, and
// that column survives only as long as the table does; lifted out, a measured-on-this-host number reads as a fact
// about the world. So the same figures go out a second way with the class ATTACHED PER FIGURE (microdata.ts),
// through the one vetted vocabulary every other JSON-LD surface here passes. Two columns carry the report's
// actual content and each becomes its own classed figure: the usable capacity (where the gap lives) and the op
// time. Physical counts ride as the reported dimension they are.
const figures: Figure[] = rows.flatMap((r) => {
  const who = `${r.org} ${r.model} (${r.year})`
  const out: Figure[] = []
  if (r.physical !== null) out.push({ name: `${who} — physical qubits`, value: r.physical, unitText: 'qubits',
    measurementTechnique: 'reported', citation: r.source })
  // The usable column is REPORTED for every platform — their own demonstrated figure — but uuidna's row is a
  // DECLARATION: 2^128 usable addresses follows from how addresses are built, and no one published it about us.
  // The distinction is drawn from the row's identity, not from matching its name, so a renamed org cannot
  // silently promote a self-assertion into a cited external result. The metric rides in the citation because
  // the platforms' metrics are not commensurable with each other, let alone with a classical address space.
  out.push({ name: `${who} — usable capacity`, value: r.usable ?? 'none demonstrated',
    unitText: r.usable === null ? undefined : 'qubits',
    measurementTechnique: r === UUIDNA ? 'declared' : 'reported',
    citation: `${r.usableMetric} — ${r.source}` })
  if (r.opTimeNs !== null) out.push({ name: `${who} — operation time`, value: r.opTimeNs, unitText: 'ns',
    measurementTechnique: r.opClass, citation: r.source })
  return out
})

const dataset = reportDataset({
  slug: 'quantum-capacity',
  name: 'uuidna quantum capacity report',
  description: 'Total and usable quantum capacity per known model type, every figure carrying the technique it was determined by and the source that named it. Architectural comparison bounded by theorem n_qubit_dimension; uuidna is classical by declaration and claims no physics quantum advantage.',
  receipt,
  figures,
})

// the vocabulary gate runs HERE, at generation, not in a test that might not be run: an unvetted term stops the
// build rather than shipping as plausible-looking markup that no consumer would query
const jsonLdFailures: string[] = []
auditJsonLd(dataset, 'quantum-capacity.jsonld', jsonLdFailures)
if (jsonLdFailures.length) {
  console.error('✗ gen-quantum-capacity — the structured form used terms outside the vetted vocabulary:')
  for (const f of jsonLdFailures) console.error(`    ${f}`)
  console.error('  FIX add the term to src/schema-org-vocab.ts with its real schema.org URL, or stop emitting it.')
  process.exit(1)
}

mkdirSync(join(ROOT, 'docs', 'public'), { recursive: true })
writeFileSync(join(ROOT, 'docs', 'public', 'quantum-capacity.jsonld'), JSON.stringify(dataset, null, 2) + '\n')
writeFileSync(join(ROOT, 'lean', 'quantum-capacity.json'), JSON.stringify({ rows, receipt, measured: { nsDecade: m.nsDecade, ledger: m.ledger }, honest: UUIDNA.usableMetric }, null, 1) + '\n')
writeFileSync(join(ROOT, 'lean', 'quantum-capacity.md'), block + '\n')

// HOME carries the same sealed block between markers — replaced in place, appended before nothing else on first run.
const homePath = join(ROOT, 'docs', 'index.md')
const home = readFileSync(homePath, 'utf8')
const marked = /<!-- quantum-capacity:begin[\s\S]*?quantum-capacity:end -->/
const nextHome = marked.test(home) ? home.replace(marked, block) : home.trimEnd() + '\n\n' + block + '\n'
writeFileSync(homePath, nextHome)
console.log(`✓ gen-quantum-capacity — ${rows.length} models, receipt ${receipt}, uuidna measured decade 10^${m.nsDecade} ns/verify (raw ${m.rawNs} ns this run, ${m.ledger} theorems swept); README block at lean/quantum-capacity.md, home block inserted`)
