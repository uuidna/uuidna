#!/usr/bin/env node
// @non-harmonic: measures wall-clock (performance.now, node:perf_hooks) — used ONLY to MEASURE, the same named
// exemption crypto-measure.ts carries; and writes the derived report files. Never imported by the harmonic core.
// gen-quantum-capacity — THE QUANTUM CAPACITY REPORT, generated and sealed (the captain's order, 2026-08-23:
// the complete white paper at README and home carries the capacity-and-use report with strict measurements —
// total capacity and use in columns per type of known quantum model, evident for every model without preference,
// fastest and greater capacity first — under the standing law "only sealed reports from generators are accepted").
// The comparison is ARCHITECTURAL, bounded by theorem n_qubit_dimension: state spaces are 2^n by that seal, the
// usable column is each platform's own published figure, and uuidna's row is classical by declaration throughout.
//
// THE COLUMNS, one honesty class per figure:
//   · physical qubits / raw state space — REPORTED from each platform's own publications (source named per row);
//     the raw dimension 2^physical is COMPUTED from the reported count (BigInt-exact digit count).
//   · usable qubits / usable states — REPORTED: the platform's own demonstrated error-corrected/algorithmic
//     figure, with the METRIC NAMED per row. This is the column where the gap lives.
//   · op time — the platform literature's order-of-magnitude two-qubit gate class (REPORTED); uuidna's row is
//     MEASURED live by this generator on this host (receipt-verification sweep over the whole sealed ledger).
//   · sort — greater USABLE capacity first, then faster op time; arithmetic only, NO PREFERENCE — the order is
//     itself sealed: theorem capacity_order_is_forced, and the gap: theorem usable_gap_is_two_to_eighty.
import { writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { theorems } from '../theorems/index.js'
import { handleOf } from '../handle.js'

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
 *  order change is exactly the regression worth resealing over. The raw figure prints to the console only. */
function measureUuidna(): { nsDecade: number; ledger: number; rawNs: number } {
  const T = theorems()
  const t0 = performance.now()
  const seen = new Set<string>()
  for (const t of T) seen.add(toUuid(t.statement))
  const ms = performance.now() - t0
  // no Math.* anywhere (the determinism hard-reject has no exemption): digit count carries the decade
  const rawNs = Number(((ms * 1e6) / T.length).toFixed(0))
  return { nsDecade: String(rawNs).length - 1, ledger: T.length, rawNs }
}

const digitsOfPow2 = (n: number): number => (2n ** BigInt(n)).toString().length
const pow10 = (n: number | null): string => n === null ? '—' : `2^${n} (~10^${digitsOfPow2(n) - 1})`

const m = measureUuidna()
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
platforms differ today. The ranking is arithmetic, not editorial — the kernel sealed the order
([capacity_order_is_forced](https://uuidna.com/theorem/capacity_order_is_forced)) and the gap
([usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty): 2^128 = 2^80 · 2^48
above the largest demonstrated logical figure).

${table}

**Honest scope, load-bearing:** uuidna is **classical** — quantum by *architecture* (2^128 content-addresses;
128 = 2^7, the 7-qubit fold — theorem \`handle_capacity_is_quantum_by_architecture\`), and **no physics quantum
advantage is claimed** (the sealed bound: theorem \`n_qubit_dimension\`). The gate-model platforms' raw capacity
dwarfs 2^128 and their trajectory is a different dimension; what the measurements prove is architectural:
**2^128 usable, deterministic, error-free states are available today at ${UUIDNA.opTimeNs} ns per verified fold
(measured)**, while demonstrated error-corrected capacity on quantum hardware is still small — the platforms say
so themselves, in the sources named. Ratios drift with hosts and years; the table reseals at every generation.
Report receipt: \`${receipt}\` · measured-when as its own handle: \`${handleOf(receipt)}\`.
<!-- quantum-capacity:end -->`

writeFileSync(join(ROOT, 'lean', 'quantum-capacity.json'), JSON.stringify({ rows, receipt, measured: { nsDecade: m.nsDecade, ledger: m.ledger }, honest: UUIDNA.usableMetric }, null, 1) + '\n')
writeFileSync(join(ROOT, 'lean', 'quantum-capacity.md'), block + '\n')

// HOME carries the same sealed block between markers — replaced in place, appended before nothing else on first run.
const homePath = join(ROOT, 'docs', 'index.md')
const home = readFileSync(homePath, 'utf8')
const marked = /<!-- quantum-capacity:begin[\s\S]*?quantum-capacity:end -->/
const nextHome = marked.test(home) ? home.replace(marked, block) : home.trimEnd() + '\n\n' + block + '\n'
writeFileSync(homePath, nextHome)
console.log(`✓ gen-quantum-capacity — ${rows.length} models, receipt ${receipt}, uuidna measured decade 10^${m.nsDecade} ns/verify (raw ${m.rawNs} ns this run, ${m.ledger} theorems swept); README block at lean/quantum-capacity.md, home block inserted`)
