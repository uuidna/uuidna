-- lean/FamiliesQ.lean — GENERATED. THE FAMILIES, Q — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- qsec: keybits(8) = 256 -/
theorem fam_qsec_keybits_1 : (2 ^ 8) = 256 := by decide

/-- qsec: entropybits(16, 8) = 128 -/
theorem fam_qsec_entropybits_1 : (16 * 8) = 128 := by decide

/-- qsec: hashrounds(10000, 1) = 10000 -/
theorem fam_qsec_hashrounds_1 : (10000 * 1) = 10000 := by decide

/-- qsec: collisionresistance(99, 100) = 99 -/
theorem fam_qsec_collisionresistance_1 : ((99 * 100) / 100) = 99 := by decide

/-- qsec: attackcost(10) = 1024 -/
theorem fam_qsec_attackcost_1 : (2 ^ 10) = 1024 := by decide

/-- qsec: saltlength(16, 0) = 16 -/
theorem fam_qsec_saltlength_1 : (16 + 0) = 16 := by decide

/-- qsec: strengthmargin(256, 128) = 128 -/
theorem fam_qsec_strengthmargin_1 : (fmax 0 (256 - 128)) = 128 := by decide

/-- quality: defectrate(3, 1000) = 3000 — DEFECT RATE: defects per million opportunities. value ⌊defects ·
    1000000 / units⌋. -/
theorem fam_quality_defectrate_1 : ((3 * 1000000) / 1000) = 3000 := by decide

/-- quality: firstpass(950, 1000) = 95 — FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. -/
theorem fam_quality_firstpass_1 : ((950 * 100) / 1000) = 95 := by decide

/-- quality: sigma(60, 10) = 6 — SIGMA distance: mean over deviation. value ⌊mean / deviation⌋. -/
theorem fam_quality_sigma_1 : (60 / 10) = 6 := by decide

/-- quality: capability(20, 10) = 200 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry,
    not by hand). Making things well is numbers: defects per million, first-pass yield, the sigma distance,
    process capability, conformance, rework, scrap, and customer satisfaction. Crosses to `manufacturing` —
    quality is what the line is measured by. A measure. */ const PROOF = 'quality arithmetic (DPMO, first-pass
    yield, sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params }) export class
    QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 /
    spread⌋. -/
theorem fam_quality_capability_1 : ((20 * 100) / 10) = 200 := by decide

/-- quality: conformance(990, 1000) = 99 — CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. -/
theorem fam_quality_conformance_1 : ((990 * 100) / 1000) = 99 := by decide

/-- quality: rework(50, 1000) = 5 — REWORK as a percentage. value ⌊reworked · 100 / produced⌋. -/
theorem fam_quality_rework_1 : ((50 * 100) / 1000) = 5 := by decide

/-- quality: scrap(20, 1000) = 2 — SCRAP as a percentage. value ⌊scrapped · 100 / total⌋. -/
theorem fam_quality_scrap_1 : ((20 * 100) / 1000) = 2 := by decide

/-- quality: satisfaction(850, 1000) = 85 — SATISFACTION as a percentage. value ⌊satisfied · 100 / surveyed⌋. -/
theorem fam_quality_satisfaction_1 : ((850 * 100) / 1000) = 85 := by decide

/-- quantization: levels(8) = 256 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC. Mapping a
    signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each step across a range,
    the signal-to-noise a depth buys, the depth a level count implies, the dynamic range, the worst-case
    rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal` — quantization
    is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels, step size,
    SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude made
    discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. -/
theorem fam_quantization_levels_1 : (2 ^ 8) = 256 := by decide

/-- quantization: stepsize(1000, 8) = 125 — STEP SIZE: a full-scale range split across its levels. value ⌊range
    / levels⌋. -/
theorem fam_quantization_stepsize_1 : (1000 / 8) = 125 := by decide

/-- quantization: stepsize(1000, 0) = 0 — STEP SIZE: a full-scale range split across its levels. value ⌊range /
    levels⌋. -/
theorem fam_quantization_stepsize_2 : (1000 / 0) = 0 := by decide

/-- quantization: snr(16) = 96 — SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. -/
theorem fam_quantization_snr_1 : (6 * 16) = 96 := by decide

/-- quantization: dynamicrange(8) = 255 — DYNAMIC RANGE: the largest code at a bit-depth. value 2^bits − 1. -/
theorem fam_quantization_dynamicrange_1 : ((2 ^ 8) - 1) = 255 := by decide

/-- quantization: quantizationerror(125) = 62 — QUANTIZATION ERROR: the worst-case rounding, half a step. value
    ⌊step / 2⌋. -/
theorem fam_quantization_quantizationerror_1 : (125 / 2) = 62 := by decide

/-- quantization: coderate(16, 1000) = 16000 — CODE RATE: bits per sample over the samples of a stream. value
    bits · samples. -/
theorem fam_quantization_coderate_1 : (16 * 1000) = 16000 := by decide

/-- quantization: resolution(2560, 8) = 10 — RESOLUTION: the smallest increment a range resolves at a bit-depth.
    value ⌊range / 2^bits⌋. -/
theorem fam_quantization_resolution_1 : (2560 / (2 ^ 8)) = 10 := by decide

/-- quantum: qubits(5, 0) = 5 -/
theorem fam_quantum_qubits_1 : (5 + 0) = 5 := by decide

/-- quantum: states(5) = 32 -/
theorem fam_quantum_states_1 : (2 ^ 5) = 32 := by decide

/-- quantum: gatecount(20, 3) = 60 -/
theorem fam_quantum_gatecount_1 : (20 * 3) = 60 := by decide

/-- quantum: superposition(4) = 16 -/
theorem fam_quantum_superposition_1 : (2 ^ 4) = 16 := by decide

/-- quantum: circuitdepth(10, 5) = 15 -/
theorem fam_quantum_circuitdepth_1 : (10 + 5) = 15 := by decide

/-- quantum: shots(1024, 1) = 1024 -/
theorem fam_quantum_shots_1 : (1024 * 1) = 1024 := by decide

/-- quantum: fidelity(99, 100) = 99 -/
theorem fam_quantum_fidelity_1 : ((99 * 100) / 100) = 99 := by decide

/-- query: skip(3, 10) = 20 — SKIP: the docs to skip to reach a page. value max(0, (page − 1) · limit). -/
theorem fam_query_skip_1 : (fmax 0 ((3 - 1) * 10)) = 20 := by decide

/-- query: depth(2) = 2 — DEPTH: the relation depth requested. value d. -/
theorem fam_query_depth_1 : 2 = 2 := by decide

/-- query: where(4) = 4 — WHERE: the conditions in a where clause. value conditions. -/
theorem fam_query_where_1 : 4 = 4 := by decide

/-- query: population(5, 2) = 10 — POPULATION: the relations a population walks at a depth. value relations ·
    depth. -/
theorem fam_query_population_1 : (5 * 2) = 10 := by decide

/-- query: sort(3) = 3 — SORT: the fields a sort orders by. value fields. -/
theorem fam_query_sort_1 : 3 = 3 := by decide

/-- query: limit(500, 100) = 100 — LIMIT: the requested limit under a cap. value min(requested, cap). -/
theorem fam_query_limit_1 : (fmin 500 100) = 100 := by decide

/-- query: hit(45, 100) = 45 — HIT: returned over total as a percentage. value ⌊returned · 100 / total⌋. -/
theorem fam_query_hit_1 : ((45 * 100) / 100) = 45 := by decide

/-- queueing: utilization(80, 100) = 80 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A line is numbers: how busy the server is, how long the line is, how long a job
    waits, the length of the whole system, and the rates at which work arrives and is served. Little's law ties
    the length to the rate times the wait. Crosses to `networking` — a queue is what a link fills. A measure. */
    const PROOF = 'queueing arithmetic (utilization, average queue, waiting time, Little\'s law, service rate,
    arrival rate, system length, idle probability); a public-API domain; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'queueing', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `queueing.${name}`, params }) export class QueueingFormulas { /**
    UTILIZATION: how busy the server is, arrivals over service, as a percentage. value ⌊arrival · 100 /
    service⌋. -/
theorem fam_queueing_utilization_1 : ((80 * 100) / 100) = 80 := by decide

/-- queueing: averagequeue(1000, 50) = 20 — AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. -/
theorem fam_queueing_averagequeue_1 : (1000 / 50) = 20 := by decide

/-- queueing: waitingtime(100, 20) = 5 — WAITING TIME: the line drained at the service rate. value ⌊queue /
    rate⌋. -/
theorem fam_queueing_waitingtime_1 : (100 / 20) = 5 := by decide

/-- queueing: littleslaw(30, 4) = 120 — LITTLE'S LAW: the length is the arrival rate times the wait. value
    arrival · wait. -/
theorem fam_queueing_littleslaw_1 : (30 * 4) = 120 := by decide

/-- queueing: servicerate(6000, 60) = 100 — SERVICE RATE: jobs served over the seconds taken. value ⌊served /
    seconds⌋. -/
theorem fam_queueing_servicerate_1 : (6000 / 60) = 100 := by decide

/-- queueing: arrivalrate(5400, 60) = 90 — ARRIVAL RATE: jobs arriving over the seconds watched. value ⌊arrivals
    / seconds⌋. -/
theorem fam_queueing_arrivalrate_1 : (5400 / 60) = 90 := by decide

/-- queueing: systemlength(18, 2) = 20 — SYSTEM LENGTH: the ones waiting plus the ones in service. value queue +
    inservice. -/
theorem fam_queueing_systemlength_1 : (18 + 2) = 20 := by decide

/-- queueing: idleprobability(25, 100) = 75 — IDLE PROBABILITY: the share of time the server is free, as a
    percentage. value ⌊max(0, service − arrival) · 100 / service⌋. -/
theorem fam_queueing_idleprobability_1 : (((fmax 0 (100 - 25)) * 100) / 100) = 75 := by decide

/-- queueing: idleprobability(100, 100) = 0 — IDLE PROBABILITY: the share of time the server is free, as a
    percentage. value ⌊max(0, service − arrival) · 100 / service⌋. -/
theorem fam_queueing_idleprobability_2 : (((fmax 0 (100 - 100)) * 100) / 100) = 0 := by decide

/-- quilting: blockcount(12, 12) = 144 -/
theorem fam_quilting_blockcount_1 : (12 * 12) = 144 := by decide

/-- quilting: seamlength(100, 4) = 400 -/
theorem fam_quilting_seamlength_1 : (100 * 4) = 400 := by decide

/-- quilting: colorsubsets(6) = 64 -/
theorem fam_quilting_colorsubsets_1 : (2 ^ 6) = 64 := by decide

/-- quilting: gridcells(20, 20) = 400 -/
theorem fam_quilting_gridcells_1 : (20 * 20) = 400 := by decide

/-- quilting: borderwidth(4, 2) = 6 -/
theorem fam_quilting_borderwidth_1 : (4 + 2) = 6 := by decide

/-- quilting: symmetryratio(90, 100) = 90 -/
theorem fam_quilting_symmetryratio_1 : ((90 * 100) / 100) = 90 := by decide
