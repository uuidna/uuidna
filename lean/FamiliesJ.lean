-- lean/FamiliesJ.lean — GENERATED. THE FAMILIES, J — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)
def flog (b : Nat) : Nat → Nat → Nat
  | 0, _ => 0
  | fuel + 1, n => if n < b then 0 else 1 + flog b fuel (n / b)
def fclog (b n : Nat) : Nat := if n ≤ 1 then 0 else flog b 64 (n - 1) + 1

/-- jainism: vows(5, 0) = 5 -/
theorem fam_jainism_vows_1 : ((5 : Int) + (0 : Int)) = (5 : Int) := by decide

/-- jainism: principles(3, 0) = 3 -/
theorem fam_jainism_principles_1 : ((3 : Int) + (0 : Int)) = (3 : Int) := by decide

/-- jainism: tirthankaras(24, 0) = 24 -/
theorem fam_jainism_tirthankaras_1 : ((24 : Int) + (0 : Int)) = (24 : Int) := by decide

/-- jainism: karmatypes(8, 0) = 8 -/
theorem fam_jainism_karmatypes_1 : ((8 : Int) + (0 : Int)) = (8 : Int) := by decide

/-- jainism: substancecombos(6, 2) = 15 -/
theorem fam_jainism_substancecombos_1 : (Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int) := by decide

/-- jainism: stageorderings(5) = 120 -/
theorem fam_jainism_stageorderings_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- jainism: nonviolencelevels(5, 0) = 5 -/
theorem fam_jainism_nonviolencelevels_1 : ((5 : Int) + (0 : Int)) = (5 : Int) := by decide

/-- jainism: liberationpaths(3) = 8 -/
theorem fam_jainism_liberationpaths_1 : ((2 : Int) ^ (3 : Nat)) = (8 : Int) := by decide

/-- jetstream: windspeed(100, 2) = 200 -/
theorem fam_jetstream_windspeed_1 : ((100 : Int) * (2 : Int)) = (200 : Int) := by decide

/-- jetstream: altitude(10, 1000) = 10000 -/
theorem fam_jetstream_altitude_1 : ((10 : Int) * (1000 : Int)) = (10000 : Int) := by decide

/-- jetstream: latitude(50, 10) = 60 -/
theorem fam_jetstream_latitude_1 : ((50 : Int) + (10 : Int)) = (60 : Int) := by decide

/-- jetstream: meandercount(5, 3) = 8 -/
theorem fam_jetstream_meandercount_1 : ((5 : Int) + (3 : Int)) = (8 : Int) := by decide

/-- jetstream: waveamplitude(1000, 4) = 250 -/
theorem fam_jetstream_waveamplitude_1 : ((1000 : Int) / (4 : Int)) = (250 : Int) := by decide

/-- jetstream: rossbynumber(100, 10) = 10 -/
theorem fam_jetstream_rossbynumber_1 : ((100 : Int) / (10 : Int)) = (10 : Int) := by decide

/-- jetstream: coresubsets(4) = 16 -/
theorem fam_jetstream_coresubsets_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- jetstream: shearindex(60, 100) = 60 -/
theorem fam_jetstream_shearindex_1 : (((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int) := by decide

/-- jewelry: caratweight(5, 200) = 1000 -/
theorem fam_jewelry_caratweight_1 : ((5 : Int) * (200 : Int)) = (1000 : Int) := by decide

/-- jewelry: facetcount(57, 1) = 57 -/
theorem fam_jewelry_facetcount_1 : ((57 : Int) * (1 : Int)) = (57 : Int) := by decide

/-- jewelry: karatfineness(18, 24) = 75 -/
theorem fam_jewelry_karatfineness_1 : (((18 : Int) * (100 : Int)) / (24 : Int)) = (75 : Int) := by decide

/-- jewelry: stonecombos(12, 3) = 220 -/
theorem fam_jewelry_stonecombos_1 : (Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int) := by decide

/-- jewelry: settingprongs(4, 2) = 6 -/
theorem fam_jewelry_settingprongs_1 : ((4 : Int) + (2 : Int)) = (6 : Int) := by decide

/-- jewelry: metalgrams(10, 5) = 50 -/
theorem fam_jewelry_metalgrams_1 : ((10 : Int) * (5 : Int)) = (50 : Int) := by decide

/-- jewelry: symmetryorderings(4) = 24 -/
theorem fam_jewelry_symmetryorderings_1 : (Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int) := by decide

/-- jewelry: pricetotal(2000, 3) = 6000 -/
theorem fam_jewelry_pricetotal_1 : ((2000 : Int) * (3 : Int)) = (6000 : Int) := by decide

/-- jitter: meandeviation(400, 8) = 50 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the mean
    deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. -/
theorem fam_jitter_meandeviation_1 : ((400 : Int) / (8 : Int)) = (50 : Int) := by decide

/-- jitter: bufferdepth(20, 3) = 60 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the mean
    deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. */ static meandeviation(total: number, count: number): CrossFormula
    { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ?
    Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) } /** BUFFER
    DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. -/
theorem fam_jitter_bufferdepth_1 : ((20 : Int) * (3 : Int)) = (60 : Int) := by decide

/-- jitter: peaktopeak(120, 40) = 80 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the mean
    deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. */ static meandeviation(total: number, count: number): CrossFormula
    { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ?
    Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) } /** BUFFER
    DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. */ static
    bufferdepth(jitter: number, mult: number): CrossFormula { return c('jitter-bufferdepth',
    'bufferdepth(jitter, mult) = jitter · mult', jitter * mult, nat(jitter, mult), 'bufferdepth', [jitter,
    mult]) } /** PEAK-TO-PEAK: the spread between the largest and smallest delay. value max(0, hi − lo). -/
theorem fam_jitter_peaktopeak_1 : (fmax (0 : Int) ((120 : Int) - (40 : Int))) = (80 : Int) := by decide

/-- jitter: peaktopeak(40, 120) = 0 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the mean
    deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. */ static meandeviation(total: number, count: number): CrossFormula
    { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ?
    Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) } /** BUFFER
    DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. */ static
    bufferdepth(jitter: number, mult: number): CrossFormula { return c('jitter-bufferdepth',
    'bufferdepth(jitter, mult) = jitter · mult', jitter * mult, nat(jitter, mult), 'bufferdepth', [jitter,
    mult]) } /** PEAK-TO-PEAK: the spread between the largest and smallest delay. value max(0, hi − lo). -/
theorem fam_jitter_peaktopeak_2 : (fmax (0 : Int) ((40 : Int) - (120 : Int))) = (0 : Int) := by decide

/-- jitter: playoutdelay(50, 10, 4) = 90 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the
    mean deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. */ static meandeviation(total: number, count: number): CrossFormula
    { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ?
    Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) } /** BUFFER
    DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. */ static
    bufferdepth(jitter: number, mult: number): CrossFormula { return c('jitter-bufferdepth',
    'bufferdepth(jitter, mult) = jitter · mult', jitter * mult, nat(jitter, mult), 'bufferdepth', [jitter,
    mult]) } /** PEAK-TO-PEAK: the spread between the largest and smallest delay. value max(0, hi − lo). */
    static peaktopeak(hi: number, lo: number): CrossFormula { return c('jitter-peaktopeak', 'peaktopeak(hi, lo)
    = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'peaktopeak', [hi, lo]) } /** PLAYOUT DELAY: a fixed
    base plus jitter scaled by a factor. value base + jitter · k. -/
theorem fam_jitter_playoutdelay_1 : ((50 : Int) + ((10 : Int) * (4 : Int))) = (90 : Int) := by decide

/-- jitter: rfc3550estimate(16, 48) = 18 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the
    mean deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. */ static meandeviation(total: number, count: number): CrossFormula
    { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ?
    Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) } /** BUFFER
    DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. */ static
    bufferdepth(jitter: number, mult: number): CrossFormula { return c('jitter-bufferdepth',
    'bufferdepth(jitter, mult) = jitter · mult', jitter * mult, nat(jitter, mult), 'bufferdepth', [jitter,
    mult]) } /** PEAK-TO-PEAK: the spread between the largest and smallest delay. value max(0, hi − lo). */
    static peaktopeak(hi: number, lo: number): CrossFormula { return c('jitter-peaktopeak', 'peaktopeak(hi, lo)
    = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'peaktopeak', [hi, lo]) } /** PLAYOUT DELAY: a fixed
    base plus jitter scaled by a factor. value base + jitter · k. */ static playoutdelay(base: number, jitter:
    number, k: number): CrossFormula { return c('jitter-playoutdelay', 'playoutdelay(base, jitter, k) = base +
    jitter · k', base + jitter * k, nat(base, jitter, k), 'playoutdelay', [base, jitter, k]) } /** RFC 3550
    interarrival estimate: prev + ⌊(|D| − prev) / 16⌋, the gain-1/16 smoother. value prev + ⌊max(0, dabs − prev)
    / 16⌋. -/
theorem fam_jitter_rfc3550estimate_1 : ((16 : Int) + ((fmax (0 : Int) ((48 : Int) - (16 : Int))) / (16 : Int))) = (18 : Int) := by decide

/-- jitter: packetspacing(1000, 50) = 20 — JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Packet timing is numbers: the variation between consecutive delays, the
    mean deviation, the de-jitter buffer a flow needs, the peak-to-peak spread, the playout delay, the RFC 3550
    interarrival estimate, the spacing between packets, and the absolute jitter against a reference clock.
    Crosses to `networking` — jitter is what the network link suffers. A measure. */ const PROOF = 'jitter
    arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival
    estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value,
    proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params }) export class JitterFormulas { /**
    VARIATION: the magnitude between two consecutive delays. value |a − b|. */ static variation(a: number, b:
    number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) +
    Math.max(0, b - a), nat(a, b), 'variation', [a, b]) } /** MEAN DEVIATION: accumulated deviation over the
    samples counted. value ⌊total / count⌋. */ static meandeviation(total: number, count: number): CrossFormula
    { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ?
    Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) } /** BUFFER
    DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. */ static
    bufferdepth(jitter: number, mult: number): CrossFormula { return c('jitter-bufferdepth',
    'bufferdepth(jitter, mult) = jitter · mult', jitter * mult, nat(jitter, mult), 'bufferdepth', [jitter,
    mult]) } /** PEAK-TO-PEAK: the spread between the largest and smallest delay. value max(0, hi − lo). */
    static peaktopeak(hi: number, lo: number): CrossFormula { return c('jitter-peaktopeak', 'peaktopeak(hi, lo)
    = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'peaktopeak', [hi, lo]) } /** PLAYOUT DELAY: a fixed
    base plus jitter scaled by a factor. value base + jitter · k. */ static playoutdelay(base: number, jitter:
    number, k: number): CrossFormula { return c('jitter-playoutdelay', 'playoutdelay(base, jitter, k) = base +
    jitter · k', base + jitter * k, nat(base, jitter, k), 'playoutdelay', [base, jitter, k]) } /** RFC 3550
    interarrival estimate: prev + ⌊(|D| − prev) / 16⌋, the gain-1/16 smoother. value prev + ⌊max(0, dabs − prev)
    / 16⌋. */ static rfc3550estimate(prev: number, dabs: number): CrossFormula { return
    c('jitter-rfc3550estimate', 'rfc3550estimate(prev, dabs) = prev + ⌊max(0, dabs − prev) / 16⌋', prev +
    Math.floor(Math.max(0, dabs - prev) / 16), nat(prev, dabs), 'rfc3550estimate', [prev, dabs]) } /** PACKET
    SPACING: a time span shared out over the packets sent. value ⌊span / packets⌋. -/
theorem fam_jitter_packetspacing_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- job: makespan(10, 3) = 4 — COORDINATED DECENTRALISED INTELLIGENT JOBS. A job of `total` units splits across
    `agents` with no coordinator: each agent computes its own slice from its index alone (the first r agents
    carry one unit more), so the split needs no registry — the chat's lane arithmetic applied to work. The
    agents coordinate their result in ⌈log₂ agents⌉ reduce rounds by doubling, at a cost of 2(agents − 1)
    messages. The intelligence is in the count: too few agents and the work dominates, too many and the
    coordination does; the optimum is the agent count that maximises the speedup, and there — as split.kelvin
    and split.free show — the milliKelvin per unit is least and the free energy most. Every formula is a natural
    of naturals, each a hex program at its address on the one door. */ const PROOF = 'balanced partition
    (⌈total/agents⌉ makespan); the tree all-reduce (⌈log₂ agents⌉ rounds, 2(agents − 1) messages); the speedup
    total / (makespan + rounds) maximised' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'job', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `job.${name}`, params })
    const sliceOf = (total: number, agents: number, i: number): number => { if (agents < 1 || i < 0 || i >=
    agents) return 0; const base = Math.floor(total / agents), r = total % agents; return base + (i < r ? 1 : 0)
    } const makespan = (total: number, agents: number): number => (agents < 1 ? 0 : Math.ceil(total / agents))
    const rounds = (agents: number): number => (agents < 1 ? 0 : Math.ceil(Math.log2(Math.max(1, agents))))
    const speedup = (total: number, agents: number): number => { const cost = makespan(total, agents) +
    rounds(agents); return cost > 0 ? total / cost : 0 } export class JobFormulas { /** The i-th agent's slice
    of `total` units across `agents`, computed from its index with no coordinator: the first (total mod agents)
    agents carry one unit more, so the slices sum to total and differ by at most one. */ static slice(total:
    number, agents: number): CrossFormula { // two params: total, and a packed (agents, i) — split agents and i
    from the second natural's high/low halves const agent = Math.floor(agents / 4096), i = agents % 4096 const s
    = sliceOf(total, agent, i) return f('job-slice', 'slice(total, agents·4096 + i) = the i-th agent’s share,
    from its index alone', s, nat(total, agents) && agent >= 1 && i < agent, 'slice', [total, agents], { agent,
    i, of: agent }) } /** How many agents to split `total` into chunks of at most `per`: ⌈total / per⌉. */
    static agents(total: number, per: number): CrossFormula { return f('job-agents', 'agents(total, per) =
    ⌈total / per⌉', per > 0 ? Math.ceil(total / per) : 0, nat(total, per) && per > 0, 'agents', [total, per]) }
    /** The makespan: the most units any agent carries when `total` is split across `agents` — the job's wall
    length. -/
theorem fam_job_makespan_1 : (-((-(10 : Int)) / (3 : Int))) = (4 : Int) := by decide

/-- job: agents(10, 4) = 3 — COORDINATED DECENTRALISED INTELLIGENT JOBS. A job of `total` units splits across
    `agents` with no coordinator: each agent computes its own slice from its index alone (the first r agents
    carry one unit more), so the split needs no registry — the chat's lane arithmetic applied to work. The
    agents coordinate their result in ⌈log₂ agents⌉ reduce rounds by doubling, at a cost of 2(agents − 1)
    messages. The intelligence is in the count: too few agents and the work dominates, too many and the
    coordination does; the optimum is the agent count that maximises the speedup, and there — as split.kelvin
    and split.free show — the milliKelvin per unit is least and the free energy most. Every formula is a natural
    of naturals, each a hex program at its address on the one door. */ const PROOF = 'balanced partition
    (⌈total/agents⌉ makespan); the tree all-reduce (⌈log₂ agents⌉ rounds, 2(agents − 1) messages); the speedup
    total / (makespan + rounds) maximised' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'job', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `job.${name}`, params })
    const sliceOf = (total: number, agents: number, i: number): number => { if (agents < 1 || i < 0 || i >=
    agents) return 0; const base = Math.floor(total / agents), r = total % agents; return base + (i < r ? 1 : 0)
    } const makespan = (total: number, agents: number): number => (agents < 1 ? 0 : Math.ceil(total / agents))
    const rounds = (agents: number): number => (agents < 1 ? 0 : Math.ceil(Math.log2(Math.max(1, agents))))
    const speedup = (total: number, agents: number): number => { const cost = makespan(total, agents) +
    rounds(agents); return cost > 0 ? total / cost : 0 } export class JobFormulas { /** The i-th agent's slice
    of `total` units across `agents`, computed from its index with no coordinator: the first (total mod agents)
    agents carry one unit more, so the slices sum to total and differ by at most one. */ static slice(total:
    number, agents: number): CrossFormula { // two params: total, and a packed (agents, i) — split agents and i
    from the second natural's high/low halves const agent = Math.floor(agents / 4096), i = agents % 4096 const s
    = sliceOf(total, agent, i) return f('job-slice', 'slice(total, agents·4096 + i) = the i-th agent’s share,
    from its index alone', s, nat(total, agents) && agent >= 1 && i < agent, 'slice', [total, agents], { agent,
    i, of: agent }) } /** How many agents to split `total` into chunks of at most `per`: ⌈total / per⌉. -/
theorem fam_job_agents_1 : (-((-(10 : Int)) / (4 : Int))) = (3 : Int) := by decide

/-- job: rounds(8) = 3 — COORDINATED DECENTRALISED INTELLIGENT JOBS. A job of `total` units splits across
    `agents` with no coordinator: each agent computes its own slice from its index alone (the first r agents
    carry one unit more), so the split needs no registry — the chat's lane arithmetic applied to work. The
    agents coordinate their result in ⌈log₂ agents⌉ reduce rounds by doubling, at a cost of 2(agents − 1)
    messages. The intelligence is in the count: too few agents and the work dominates, too many and the
    coordination does; the optimum is the agent count that maximises the speedup, and there — as split.kelvin
    and split.free show — the milliKelvin per unit is least and the free energy most. Every formula is a natural
    of naturals, each a hex program at its address on the one door. */ const PROOF = 'balanced partition
    (⌈total/agents⌉ makespan); the tree all-reduce (⌈log₂ agents⌉ rounds, 2(agents − 1) messages); the speedup
    total / (makespan + rounds) maximised' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'job', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `job.${name}`, params })
    const sliceOf = (total: number, agents: number, i: number): number => { if (agents < 1 || i < 0 || i >=
    agents) return 0; const base = Math.floor(total / agents), r = total % agents; return base + (i < r ? 1 : 0)
    } const makespan = (total: number, agents: number): number => (agents < 1 ? 0 : Math.ceil(total / agents))
    const rounds = (agents: number): number => (agents < 1 ? 0 : Math.ceil(Math.log2(Math.max(1, agents))))
    const speedup = (total: number, agents: number): number => { const cost = makespan(total, agents) +
    rounds(agents); return cost > 0 ? total / cost : 0 } export class JobFormulas { /** The i-th agent's slice
    of `total` units across `agents`, computed from its index with no coordinator: the first (total mod agents)
    agents carry one unit more, so the slices sum to total and differ by at most one. */ static slice(total:
    number, agents: number): CrossFormula { // two params: total, and a packed (agents, i) — split agents and i
    from the second natural's high/low halves const agent = Math.floor(agents / 4096), i = agents % 4096 const s
    = sliceOf(total, agent, i) return f('job-slice', 'slice(total, agents·4096 + i) = the i-th agent’s share,
    from its index alone', s, nat(total, agents) && agent >= 1 && i < agent, 'slice', [total, agents], { agent,
    i, of: agent }) } /** How many agents to split `total` into chunks of at most `per`: ⌈total / per⌉. */
    static agents(total: number, per: number): CrossFormula { return f('job-agents', 'agents(total, per) =
    ⌈total / per⌉', per > 0 ? Math.ceil(total / per) : 0, nat(total, per) && per > 0, 'agents', [total, per]) }
    /** The makespan: the most units any agent carries when `total` is split across `agents` — the job's wall
    length. */ static makespan(total: number, agents: number): CrossFormula { return f('job-makespan',
    'makespan(total, agents) = ⌈total / agents⌉', makespan(total, agents), nat(total, agents) && agents >= 1,
    'makespan', [total, agents]) } /** The reduce rounds to combine every agent's result by doubling: ⌈log₂
    agents⌉ — the decentralised coordination. -/
theorem fam_job_rounds_1 : (Int.ofNat (fclog 2 (Int.toNat (8 : Int)))) = (3 : Int) := by decide

/-- job: rounds(1) = 0 — COORDINATED DECENTRALISED INTELLIGENT JOBS. A job of `total` units splits across
    `agents` with no coordinator: each agent computes its own slice from its index alone (the first r agents
    carry one unit more), so the split needs no registry — the chat's lane arithmetic applied to work. The
    agents coordinate their result in ⌈log₂ agents⌉ reduce rounds by doubling, at a cost of 2(agents − 1)
    messages. The intelligence is in the count: too few agents and the work dominates, too many and the
    coordination does; the optimum is the agent count that maximises the speedup, and there — as split.kelvin
    and split.free show — the milliKelvin per unit is least and the free energy most. Every formula is a natural
    of naturals, each a hex program at its address on the one door. */ const PROOF = 'balanced partition
    (⌈total/agents⌉ makespan); the tree all-reduce (⌈log₂ agents⌉ rounds, 2(agents − 1) messages); the speedup
    total / (makespan + rounds) maximised' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'job', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `job.${name}`, params })
    const sliceOf = (total: number, agents: number, i: number): number => { if (agents < 1 || i < 0 || i >=
    agents) return 0; const base = Math.floor(total / agents), r = total % agents; return base + (i < r ? 1 : 0)
    } const makespan = (total: number, agents: number): number => (agents < 1 ? 0 : Math.ceil(total / agents))
    const rounds = (agents: number): number => (agents < 1 ? 0 : Math.ceil(Math.log2(Math.max(1, agents))))
    const speedup = (total: number, agents: number): number => { const cost = makespan(total, agents) +
    rounds(agents); return cost > 0 ? total / cost : 0 } export class JobFormulas { /** The i-th agent's slice
    of `total` units across `agents`, computed from its index with no coordinator: the first (total mod agents)
    agents carry one unit more, so the slices sum to total and differ by at most one. */ static slice(total:
    number, agents: number): CrossFormula { // two params: total, and a packed (agents, i) — split agents and i
    from the second natural's high/low halves const agent = Math.floor(agents / 4096), i = agents % 4096 const s
    = sliceOf(total, agent, i) return f('job-slice', 'slice(total, agents·4096 + i) = the i-th agent’s share,
    from its index alone', s, nat(total, agents) && agent >= 1 && i < agent, 'slice', [total, agents], { agent,
    i, of: agent }) } /** How many agents to split `total` into chunks of at most `per`: ⌈total / per⌉. */
    static agents(total: number, per: number): CrossFormula { return f('job-agents', 'agents(total, per) =
    ⌈total / per⌉', per > 0 ? Math.ceil(total / per) : 0, nat(total, per) && per > 0, 'agents', [total, per]) }
    /** The makespan: the most units any agent carries when `total` is split across `agents` — the job's wall
    length. */ static makespan(total: number, agents: number): CrossFormula { return f('job-makespan',
    'makespan(total, agents) = ⌈total / agents⌉', makespan(total, agents), nat(total, agents) && agents >= 1,
    'makespan', [total, agents]) } /** The reduce rounds to combine every agent's result by doubling: ⌈log₂
    agents⌉ — the decentralised coordination. -/
theorem fam_job_rounds_2 : (Int.ofNat (fclog 2 (Int.toNat (1 : Int)))) = (0 : Int) := by decide

/-- job: messages(4) = 6 — COORDINATED DECENTRALISED INTELLIGENT JOBS. A job of `total` units splits across
    `agents` with no coordinator: each agent computes its own slice from its index alone (the first r agents
    carry one unit more), so the split needs no registry — the chat's lane arithmetic applied to work. The
    agents coordinate their result in ⌈log₂ agents⌉ reduce rounds by doubling, at a cost of 2(agents − 1)
    messages. The intelligence is in the count: too few agents and the work dominates, too many and the
    coordination does; the optimum is the agent count that maximises the speedup, and there — as split.kelvin
    and split.free show — the milliKelvin per unit is least and the free energy most. Every formula is a natural
    of naturals, each a hex program at its address on the one door. */ const PROOF = 'balanced partition
    (⌈total/agents⌉ makespan); the tree all-reduce (⌈log₂ agents⌉ rounds, 2(agents − 1) messages); the speedup
    total / (makespan + rounds) maximised' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'job', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `job.${name}`, params })
    const sliceOf = (total: number, agents: number, i: number): number => { if (agents < 1 || i < 0 || i >=
    agents) return 0; const base = Math.floor(total / agents), r = total % agents; return base + (i < r ? 1 : 0)
    } const makespan = (total: number, agents: number): number => (agents < 1 ? 0 : Math.ceil(total / agents))
    const rounds = (agents: number): number => (agents < 1 ? 0 : Math.ceil(Math.log2(Math.max(1, agents))))
    const speedup = (total: number, agents: number): number => { const cost = makespan(total, agents) +
    rounds(agents); return cost > 0 ? total / cost : 0 } export class JobFormulas { /** The i-th agent's slice
    of `total` units across `agents`, computed from its index with no coordinator: the first (total mod agents)
    agents carry one unit more, so the slices sum to total and differ by at most one. */ static slice(total:
    number, agents: number): CrossFormula { // two params: total, and a packed (agents, i) — split agents and i
    from the second natural's high/low halves const agent = Math.floor(agents / 4096), i = agents % 4096 const s
    = sliceOf(total, agent, i) return f('job-slice', 'slice(total, agents·4096 + i) = the i-th agent’s share,
    from its index alone', s, nat(total, agents) && agent >= 1 && i < agent, 'slice', [total, agents], { agent,
    i, of: agent }) } /** How many agents to split `total` into chunks of at most `per`: ⌈total / per⌉. */
    static agents(total: number, per: number): CrossFormula { return f('job-agents', 'agents(total, per) =
    ⌈total / per⌉', per > 0 ? Math.ceil(total / per) : 0, nat(total, per) && per > 0, 'agents', [total, per]) }
    /** The makespan: the most units any agent carries when `total` is split across `agents` — the job's wall
    length. */ static makespan(total: number, agents: number): CrossFormula { return f('job-makespan',
    'makespan(total, agents) = ⌈total / agents⌉', makespan(total, agents), nat(total, agents) && agents >= 1,
    'makespan', [total, agents]) } /** The reduce rounds to combine every agent's result by doubling: ⌈log₂
    agents⌉ — the decentralised coordination. */ static rounds(agents: number): CrossFormula { return
    f('job-rounds', 'rounds(agents) = ⌈log₂ agents⌉', rounds(agents), nat(agents) && agents >= 1, 'rounds',
    [agents]) } /** The messages a tree all-reduce sends among `agents`: 2(agents − 1) — the coordination
    traffic, no coordinator. -/
theorem fam_job_messages_1 : ((2 : Int) * ((4 : Int) - (1 : Int))) = (6 : Int) := by decide

/-- journalism: readability(300, 20) = 15 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words
    per sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. -/
theorem fam_journalism_readability_1 : ((300 : Int) / (20 : Int)) = (15 : Int) := by decide

/-- journalism: inverted(40, 200) = 20 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. -/
theorem fam_journalism_inverted_1 : (((40 : Int) * (100 : Int)) / (200 : Int)) = (20 : Int) := by decide

/-- journalism: sources(8, 10) = 80 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. -/
theorem fam_journalism_sources_1 : (((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int) := by decide

/-- journalism: deadline(14, 18) = 4 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */ static
    sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited,
    claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims)
    && claims > 0 && cited <= claims, 'sources', [cited, claims]) } /** DEADLINE: units left between filing and
    the due time. value max(0, due − filed). -/
theorem fam_journalism_deadline_1 : (fmax (0 : Int) ((18 : Int) - (14 : Int))) = (4 : Int) := by decide

/-- journalism: deadline(20, 18) = 0 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */ static
    sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited,
    claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims)
    && claims > 0 && cited <= claims, 'sources', [cited, claims]) } /** DEADLINE: units left between filing and
    the due time. value max(0, due − filed). -/
theorem fam_journalism_deadline_2 : (fmax (0 : Int) ((18 : Int) - (20 : Int))) = (0 : Int) := by decide

/-- journalism: engagement(50, 1000) = 5 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words
    per sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */ static
    sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited,
    claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims)
    && claims > 0 && cited <= claims, 'sources', [cited, claims]) } /** DEADLINE: units left between filing and
    the due time. value max(0, due − filed). */ static deadline(filed: number, due: number): CrossFormula {
    return c('journalism-deadline', 'deadline(filed, due) = max(0, due − filed)', Math.max(0, due - filed),
    nat(filed, due), 'deadline', [filed, due]) } /** ENGAGEMENT: shares per read, as a percentage. value ⌊shares
    · 100 / reads⌋. -/
theorem fam_journalism_engagement_1 : (((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int) := by decide

/-- journalism: wordcount(12, 80) = 960 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */ static
    sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited,
    claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims)
    && claims > 0 && cited <= claims, 'sources', [cited, claims]) } /** DEADLINE: units left between filing and
    the due time. value max(0, due − filed). */ static deadline(filed: number, due: number): CrossFormula {
    return c('journalism-deadline', 'deadline(filed, due) = max(0, due − filed)', Math.max(0, due - filed),
    nat(filed, due), 'deadline', [filed, due]) } /** ENGAGEMENT: shares per read, as a percentage. value ⌊shares
    · 100 / reads⌋. */ static engagement(shares: number, reads: number): CrossFormula { return
    c('journalism-engagement', 'engagement(shares, reads) = ⌊shares · 100 / reads⌋', reads > 0 ?
    Math.floor((shares * 100) / reads) : 0, nat(shares, reads) && reads > 0, 'engagement', [shares, reads]) }
    /** WORD COUNT: paragraphs at an average length each. value paragraphs · average. -/
theorem fam_journalism_wordcount_1 : ((12 : Int) * (80 : Int)) = (960 : Int) := by decide

/-- journalism: factcheck(9, 10) = 90 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */ static
    sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited,
    claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims)
    && claims > 0 && cited <= claims, 'sources', [cited, claims]) } /** DEADLINE: units left between filing and
    the due time. value max(0, due − filed). */ static deadline(filed: number, due: number): CrossFormula {
    return c('journalism-deadline', 'deadline(filed, due) = max(0, due − filed)', Math.max(0, due - filed),
    nat(filed, due), 'deadline', [filed, due]) } /** ENGAGEMENT: shares per read, as a percentage. value ⌊shares
    · 100 / reads⌋. */ static engagement(shares: number, reads: number): CrossFormula { return
    c('journalism-engagement', 'engagement(shares, reads) = ⌊shares · 100 / reads⌋', reads > 0 ?
    Math.floor((shares * 100) / reads) : 0, nat(shares, reads) && reads > 0, 'engagement', [shares, reads]) }
    /** WORD COUNT: paragraphs at an average length each. value paragraphs · average. */ static
    wordcount(paragraphs: number, average: number): CrossFormula { return c('journalism-wordcount',
    'wordcount(paragraphs, average) = paragraphs · average', paragraphs * average, nat(paragraphs, average),
    'wordcount', [paragraphs, average]) } /** FACT-CHECK: verified of the facts checked, as a percentage. value
    ⌊verified · 100 / checked⌋. -/
theorem fam_journalism_factcheck_1 : (((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int) := by decide

/-- journalism: bias(3, 300) = 1 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per
    sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. */ static
    readability(words: number, sentences: number): CrossFormula { return c('journalism-readability',
    'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0,
    nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) } /** INVERTED PYRAMID: how much
    of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */ static inverted(lead: number,
    total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 /
    total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total,
    'inverted', [lead, total]) } /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */ static
    sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited,
    claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims)
    && claims > 0 && cited <= claims, 'sources', [cited, claims]) } /** DEADLINE: units left between filing and
    the due time. value max(0, due − filed). */ static deadline(filed: number, due: number): CrossFormula {
    return c('journalism-deadline', 'deadline(filed, due) = max(0, due − filed)', Math.max(0, due - filed),
    nat(filed, due), 'deadline', [filed, due]) } /** ENGAGEMENT: shares per read, as a percentage. value ⌊shares
    · 100 / reads⌋. */ static engagement(shares: number, reads: number): CrossFormula { return
    c('journalism-engagement', 'engagement(shares, reads) = ⌊shares · 100 / reads⌋', reads > 0 ?
    Math.floor((shares * 100) / reads) : 0, nat(shares, reads) && reads > 0, 'engagement', [shares, reads]) }
    /** WORD COUNT: paragraphs at an average length each. value paragraphs · average. */ static
    wordcount(paragraphs: number, average: number): CrossFormula { return c('journalism-wordcount',
    'wordcount(paragraphs, average) = paragraphs · average', paragraphs * average, nat(paragraphs, average),
    'wordcount', [paragraphs, average]) } /** FACT-CHECK: verified of the facts checked, as a percentage. value
    ⌊verified · 100 / checked⌋. */ static factcheck(verified: number, checked: number): CrossFormula { return
    c('journalism-factcheck', 'factcheck(verified, checked) = ⌊verified · 100 / checked⌋', checked > 0 ?
    Math.floor((verified * 100) / checked) : 0, nat(verified, checked) && checked > 0 && verified <= checked,
    'factcheck', [verified, checked]) } /** BIAS: loaded words of the total, as a percentage. value ⌊loaded ·
    100 / words⌋. -/
theorem fam_journalism_bias_1 : (((3 : Int) * (100 : Int)) / (300 : Int)) = (1 : Int) := by decide

/-- jumping: height(500, 2) = 250 -/
theorem fam_jumping_height_1 : ((500 : Int) / (2 : Int)) = (250 : Int) := by decide

/-- jumping: hangtime(1000, 10) = 100 -/
theorem fam_jumping_hangtime_1 : ((1000 : Int) / (10 : Int)) = (100 : Int) := by decide

/-- jumping: takeoffvelocity(3, 2) = 6 -/
theorem fam_jumping_takeoffvelocity_1 : ((3 : Int) * (2 : Int)) = (6 : Int) := by decide

/-- jumping: horizontalrange(5, 8) = 40 -/
theorem fam_jumping_horizontalrange_1 : ((5 : Int) * (8 : Int)) = (40 : Int) := by decide

/-- jumping: power(800, 3) = 2400 -/
theorem fam_jumping_power_1 : ((800 : Int) * (3 : Int)) = (2400 : Int) := by decide

/-- jumping: approachspeed(3000, 300) = 10 -/
theorem fam_jumping_approachspeed_1 : ((3000 : Int) / (300 : Int)) = (10 : Int) := by decide

/-- jumping: impulse(70, 5) = 350 -/
theorem fam_jumping_impulse_1 : ((70 : Int) * (5 : Int)) = (350 : Int) := by decide

/-- jumping: netheight(250, 30) = 220 -/
theorem fam_jumping_netheight_1 : (fmax (0 : Int) ((250 : Int) - (30 : Int))) = (220 : Int) := by decide
