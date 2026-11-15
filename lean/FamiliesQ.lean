-- lean/FamiliesQ.lean — GENERATED. THE FAMILIES, Q — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def fmin (a b : Int) : Int := if a ≤ b then a else b
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)
def flog (b : Nat) : Nat → Nat → Nat
  | 0, _ => 0
  | fuel + 1, n => if n < b then 0 else 1 + flog b fuel (n / b)

/-- qsec: keybits(8) = 256 -/
theorem fam_qsec_keybits_1 : ((2 : Int) ^ (8 : Nat)) = (256 : Int) := by decide

/-- qsec: entropybits(16, 8) = 128 -/
theorem fam_qsec_entropybits_1 : ((16 : Int) * (8 : Int)) = (128 : Int) := by decide

/-- qsec: attemptpairs(10, 2) = 45 -/
theorem fam_qsec_attemptpairs_1 : (Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int) := by decide

/-- qsec: hashrounds(10000, 1) = 10000 -/
theorem fam_qsec_hashrounds_1 : ((10000 : Int) * (1 : Int)) = (10000 : Int) := by decide

/-- qsec: collisionresistance(99, 100) = 99 -/
theorem fam_qsec_collisionresistance_1 : (((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int) := by decide

/-- qsec: attackcost(10) = 1024 -/
theorem fam_qsec_attackcost_1 : ((2 : Int) ^ (10 : Nat)) = (1024 : Int) := by decide

/-- qsec: saltlength(16, 0) = 16 -/
theorem fam_qsec_saltlength_1 : ((16 : Int) + (0 : Int)) = (16 : Int) := by decide

/-- qsec: strengthmargin(256, 128) = 128 -/
theorem fam_qsec_strengthmargin_1 : (fmax (0 : Int) ((256 : Int) - (128 : Int))) = (128 : Int) := by decide

/-- quality: defectrate(3, 1000) = 3000 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry,
    not by hand). Making things well is numbers: defects per million, first-pass yield, the sigma distance,
    process capability, conformance, rework, scrap, and customer satisfaction. Crosses to `manufacturing` —
    quality is what the line is measured by. A measure. */ const PROOF = 'quality arithmetic (DPMO, first-pass
    yield, sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params }) export class
    QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 /
    spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */ static
    conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance',
    'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ?
    Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <=
    inspected, 'conformance', [conforming, inspected]) } /** DEFECT RATE: defects per million opportunities.
    value ⌊defects · 1000000 / units⌋. -/
theorem fam_quality_defectrate_1 : (((3 : Int) * (1000000 : Int)) / (1000 : Int)) = (3000 : Int) := by decide

/-- quality: firstpass(950, 1000) = 95 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry,
    not by hand). Making things well is numbers: defects per million, first-pass yield, the sigma distance,
    process capability, conformance, rework, scrap, and customer satisfaction. Crosses to `manufacturing` —
    quality is what the line is measured by. A measure. */ const PROOF = 'quality arithmetic (DPMO, first-pass
    yield, sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params }) export class
    QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 /
    spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */ static
    conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance',
    'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ?
    Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <=
    inspected, 'conformance', [conforming, inspected]) } /** DEFECT RATE: defects per million opportunities.
    value ⌊defects · 1000000 / units⌋. */ static defectrate(defects: number, units: number): CrossFormula {
    return c('quality-defectrate', 'defectrate(defects, units) = ⌊defects · 1000000 / units⌋', units > 0 ?
    Math.floor((defects * 1000000) / units) : 0, nat(defects, units) && units > 0, 'defectrate', [defects,
    units]) } /** FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. -/
theorem fam_quality_firstpass_1 : (((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int) := by decide

/-- quality: sigma(60, 10) = 6 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry, not by
    hand). Making things well is numbers: defects per million, first-pass yield, the sigma distance, process
    capability, conformance, rework, scrap, and customer satisfaction. Crosses to `manufacturing` — quality is
    what the line is measured by. A measure. */ const PROOF = 'quality arithmetic (DPMO, first-pass yield,
    sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params }) export class
    QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 /
    spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */ static
    conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance',
    'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ?
    Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <=
    inspected, 'conformance', [conforming, inspected]) } /** DEFECT RATE: defects per million opportunities.
    value ⌊defects · 1000000 / units⌋. */ static defectrate(defects: number, units: number): CrossFormula {
    return c('quality-defectrate', 'defectrate(defects, units) = ⌊defects · 1000000 / units⌋', units > 0 ?
    Math.floor((defects * 1000000) / units) : 0, nat(defects, units) && units > 0, 'defectrate', [defects,
    units]) } /** FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. */ static firstpass(good:
    number, total: number): CrossFormula { return c('quality-firstpass', 'firstpass(good, total) = ⌊good · 100 /
    total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total,
    'firstpass', [good, total]) } /** REWORK as a percentage. value ⌊reworked · 100 / produced⌋. */ static
    rework(reworked: number, produced: number): CrossFormula { return c('quality-rework', 'rework(reworked,
    produced) = ⌊reworked · 100 / produced⌋', produced > 0 ? Math.floor((reworked * 100) / produced) : 0,
    nat(reworked, produced) && produced > 0 && reworked <= produced, 'rework', [reworked, produced]) } /**
    SATISFACTION as a percentage. value ⌊satisfied · 100 / surveyed⌋. */ static satisfaction(satisfied: number,
    surveyed: number): CrossFormula { return c('quality-satisfaction', 'satisfaction(satisfied, surveyed) =
    ⌊satisfied · 100 / surveyed⌋', surveyed > 0 ? Math.floor((satisfied * 100) / surveyed) : 0, nat(satisfied,
    surveyed) && surveyed > 0 && satisfied <= surveyed, 'satisfaction', [satisfied, surveyed]) } /** SCRAP as a
    percentage. value ⌊scrapped · 100 / total⌋. */ static scrap(scrapped: number, total: number): CrossFormula {
    return c('quality-scrap', 'scrap(scrapped, total) = ⌊scrapped · 100 / total⌋', total > 0 ?
    Math.floor((scrapped * 100) / total) : 0, nat(scrapped, total) && total > 0 && scrapped <= total, 'scrap',
    [scrapped, total]) } /** SIGMA distance: mean over deviation. value ⌊mean / deviation⌋. -/
theorem fam_quality_sigma_1 : ((60 : Int) / (10 : Int)) = (6 : Int) := by decide

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
theorem fam_quality_capability_1 : (((20 : Int) * (100 : Int)) / (10 : Int)) = (200 : Int) := by decide

/-- quality: conformance(990, 1000) = 99 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the
    registry, not by hand). Making things well is numbers: defects per million, first-pass yield, the sigma
    distance, process capability, conformance, rework, scrap, and customer satisfaction. Crosses to
    `manufacturing` — quality is what the line is measured by. A measure. */ const PROOF = 'quality arithmetic
    (DPMO, first-pass yield, sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing
    measure crossed to manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst:
    'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params })
    export class QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value
    ⌊tolerance · 100 / spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. -/
theorem fam_quality_conformance_1 : (((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int) := by decide

/-- quality: rework(50, 1000) = 5 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry, not
    by hand). Making things well is numbers: defects per million, first-pass yield, the sigma distance, process
    capability, conformance, rework, scrap, and customer satisfaction. Crosses to `manufacturing` — quality is
    what the line is measured by. A measure. */ const PROOF = 'quality arithmetic (DPMO, first-pass yield,
    sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params }) export class
    QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 /
    spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */ static
    conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance',
    'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ?
    Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <=
    inspected, 'conformance', [conforming, inspected]) } /** DEFECT RATE: defects per million opportunities.
    value ⌊defects · 1000000 / units⌋. */ static defectrate(defects: number, units: number): CrossFormula {
    return c('quality-defectrate', 'defectrate(defects, units) = ⌊defects · 1000000 / units⌋', units > 0 ?
    Math.floor((defects * 1000000) / units) : 0, nat(defects, units) && units > 0, 'defectrate', [defects,
    units]) } /** FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. */ static firstpass(good:
    number, total: number): CrossFormula { return c('quality-firstpass', 'firstpass(good, total) = ⌊good · 100 /
    total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total,
    'firstpass', [good, total]) } /** REWORK as a percentage. value ⌊reworked · 100 / produced⌋. -/
theorem fam_quality_rework_1 : (((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int) := by decide

/-- quality: scrap(20, 1000) = 2 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry, not by
    hand). Making things well is numbers: defects per million, first-pass yield, the sigma distance, process
    capability, conformance, rework, scrap, and customer satisfaction. Crosses to `manufacturing` — quality is
    what the line is measured by. A measure. */ const PROOF = 'quality arithmetic (DPMO, first-pass yield,
    sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params }) export class
    QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 /
    spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */ static
    conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance',
    'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ?
    Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <=
    inspected, 'conformance', [conforming, inspected]) } /** DEFECT RATE: defects per million opportunities.
    value ⌊defects · 1000000 / units⌋. */ static defectrate(defects: number, units: number): CrossFormula {
    return c('quality-defectrate', 'defectrate(defects, units) = ⌊defects · 1000000 / units⌋', units > 0 ?
    Math.floor((defects * 1000000) / units) : 0, nat(defects, units) && units > 0, 'defectrate', [defects,
    units]) } /** FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. */ static firstpass(good:
    number, total: number): CrossFormula { return c('quality-firstpass', 'firstpass(good, total) = ⌊good · 100 /
    total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total,
    'firstpass', [good, total]) } /** REWORK as a percentage. value ⌊reworked · 100 / produced⌋. */ static
    rework(reworked: number, produced: number): CrossFormula { return c('quality-rework', 'rework(reworked,
    produced) = ⌊reworked · 100 / produced⌋', produced > 0 ? Math.floor((reworked * 100) / produced) : 0,
    nat(reworked, produced) && produced > 0 && reworked <= produced, 'rework', [reworked, produced]) } /**
    SATISFACTION as a percentage. value ⌊satisfied · 100 / surveyed⌋. */ static satisfaction(satisfied: number,
    surveyed: number): CrossFormula { return c('quality-satisfaction', 'satisfaction(satisfied, surveyed) =
    ⌊satisfied · 100 / surveyed⌋', surveyed > 0 ? Math.floor((satisfied * 100) / surveyed) : 0, nat(satisfied,
    surveyed) && surveyed > 0 && satisfied <= surveyed, 'satisfaction', [satisfied, surveyed]) } /** SCRAP as a
    percentage. value ⌊scrapped · 100 / total⌋. -/
theorem fam_quality_scrap_1 : (((20 : Int) * (100 : Int)) / (1000 : Int)) = (2 : Int) := by decide

/-- quality: satisfaction(850, 1000) = 85 — QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the
    registry, not by hand). Making things well is numbers: defects per million, first-pass yield, the sigma
    distance, process capability, conformance, rework, scrap, and customer satisfaction. Crosses to
    `manufacturing` — quality is what the line is measured by. A measure. */ const PROOF = 'quality arithmetic
    (DPMO, first-pass yield, sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing
    measure crossed to manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'quality', dst:
    'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params })
    export class QualityFormulas { /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value
    ⌊tolerance · 100 / spread⌋. */ static capability(tolerance: number, spread: number): CrossFormula { return
    c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ?
    Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance,
    spread]) } /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */ static
    conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance',
    'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ?
    Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <=
    inspected, 'conformance', [conforming, inspected]) } /** DEFECT RATE: defects per million opportunities.
    value ⌊defects · 1000000 / units⌋. */ static defectrate(defects: number, units: number): CrossFormula {
    return c('quality-defectrate', 'defectrate(defects, units) = ⌊defects · 1000000 / units⌋', units > 0 ?
    Math.floor((defects * 1000000) / units) : 0, nat(defects, units) && units > 0, 'defectrate', [defects,
    units]) } /** FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. */ static firstpass(good:
    number, total: number): CrossFormula { return c('quality-firstpass', 'firstpass(good, total) = ⌊good · 100 /
    total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total,
    'firstpass', [good, total]) } /** REWORK as a percentage. value ⌊reworked · 100 / produced⌋. */ static
    rework(reworked: number, produced: number): CrossFormula { return c('quality-rework', 'rework(reworked,
    produced) = ⌊reworked · 100 / produced⌋', produced > 0 ? Math.floor((reworked * 100) / produced) : 0,
    nat(reworked, produced) && produced > 0 && reworked <= produced, 'rework', [reworked, produced]) } /**
    SATISFACTION as a percentage. value ⌊satisfied · 100 / surveyed⌋. -/
theorem fam_quality_satisfaction_1 : (((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int) := by decide

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
theorem fam_quantization_levels_1 : ((2 : Int) ^ (8 : Nat)) = (256 : Int) := by decide

/-- quantization: stepsize(1000, 8) = 125 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC.
    Mapping a signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each step across
    a range, the signal-to-noise a depth buys, the depth a level count implies, the dynamic range, the
    worst-case rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal` —
    quantization is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels,
    step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude
    made discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. -/
theorem fam_quantization_stepsize_1 : ((1000 : Int) / (8 : Int)) = (125 : Int) := by decide

/-- quantization: stepsize(1000, 0) = 0 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC.
    Mapping a signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each step across
    a range, the signal-to-noise a depth buys, the depth a level count implies, the dynamic range, the
    worst-case rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal` —
    quantization is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels,
    step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude
    made discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. -/
theorem fam_quantization_stepsize_2 : ((1000 : Int) / (0 : Int)) = (0 : Int) := by decide

/-- quantization: snr(16) = 96 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC. Mapping a
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
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. */ static stepsize(range: number, levels: number):
    CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ?
    Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) } /**
    SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. -/
theorem fam_quantization_snr_1 : ((6 : Int) * (16 : Int)) = (96 : Int) := by decide

/-- quantization: bits(1024) = 10 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC. Mapping a
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
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. */ static stepsize(range: number, levels: number):
    CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ?
    Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) } /**
    SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. */ static snr(bits: number):
    CrossFormula { return c('quantization-snr', 'snr(bits) = 6 · bits', 6 * bits, nat(bits) && bits <= 16,
    'snr', [bits]) } /** BIT DEPTH a level count implies. value ⌊log2(levels)⌋. -/
theorem fam_quantization_bits_1 : (Int.ofNat (flog 2 64 (Int.toNat (1024 : Int)))) = (10 : Int) := by decide

/-- quantization: dynamicrange(8) = 255 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC.
    Mapping a signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each step across
    a range, the signal-to-noise a depth buys, the depth a level count implies, the dynamic range, the
    worst-case rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal` —
    quantization is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels,
    step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude
    made discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. */ static stepsize(range: number, levels: number):
    CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ?
    Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) } /**
    SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. */ static snr(bits: number):
    CrossFormula { return c('quantization-snr', 'snr(bits) = 6 · bits', 6 * bits, nat(bits) && bits <= 16,
    'snr', [bits]) } /** BIT DEPTH a level count implies. value ⌊log2(levels)⌋. */ static bits(levels: number):
    CrossFormula { return c('quantization-bits', 'bits(levels) = ⌊log2(levels)⌋', levels > 0 ?
    Math.floor(Math.log2(levels)) : 0, nat(levels) && levels > 0, 'bits', [levels]) } /** DYNAMIC RANGE: the
    largest code at a bit-depth. value 2^bits − 1. -/
theorem fam_quantization_dynamicrange_1 : (((2 : Int) ^ (8 : Nat)) - (1 : Int)) = (255 : Int) := by decide

/-- quantization: quantizationerror(125) = 62 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS
    ARITHMETIC. Mapping a signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each
    step across a range, the signal-to-noise a depth buys, the depth a level count implies, the dynamic range,
    the worst-case rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal`
    — quantization is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels,
    step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude
    made discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. */ static stepsize(range: number, levels: number):
    CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ?
    Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) } /**
    SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. */ static snr(bits: number):
    CrossFormula { return c('quantization-snr', 'snr(bits) = 6 · bits', 6 * bits, nat(bits) && bits <= 16,
    'snr', [bits]) } /** BIT DEPTH a level count implies. value ⌊log2(levels)⌋. */ static bits(levels: number):
    CrossFormula { return c('quantization-bits', 'bits(levels) = ⌊log2(levels)⌋', levels > 0 ?
    Math.floor(Math.log2(levels)) : 0, nat(levels) && levels > 0, 'bits', [levels]) } /** DYNAMIC RANGE: the
    largest code at a bit-depth. value 2^bits − 1. */ static dynamicrange(bits: number): CrossFormula { return
    c('quantization-dynamicrange', 'dynamicrange(bits) = 2^bits − 1', Math.max(0, 2 ** bits - 1), nat(bits) &&
    bits <= 16, 'dynamicrange', [bits]) } /** QUANTIZATION ERROR: the worst-case rounding, half a step. value
    ⌊step / 2⌋. -/
theorem fam_quantization_quantizationerror_1 : ((125 : Int) / (2 : Int)) = (62 : Int) := by decide

/-- quantization: coderate(16, 1000) = 16000 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC.
    Mapping a signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each step across
    a range, the signal-to-noise a depth buys, the depth a level count implies, the dynamic range, the
    worst-case rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal` —
    quantization is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels,
    step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude
    made discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. */ static stepsize(range: number, levels: number):
    CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ?
    Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) } /**
    SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. */ static snr(bits: number):
    CrossFormula { return c('quantization-snr', 'snr(bits) = 6 · bits', 6 * bits, nat(bits) && bits <= 16,
    'snr', [bits]) } /** BIT DEPTH a level count implies. value ⌊log2(levels)⌋. */ static bits(levels: number):
    CrossFormula { return c('quantization-bits', 'bits(levels) = ⌊log2(levels)⌋', levels > 0 ?
    Math.floor(Math.log2(levels)) : 0, nat(levels) && levels > 0, 'bits', [levels]) } /** DYNAMIC RANGE: the
    largest code at a bit-depth. value 2^bits − 1. */ static dynamicrange(bits: number): CrossFormula { return
    c('quantization-dynamicrange', 'dynamicrange(bits) = 2^bits − 1', Math.max(0, 2 ** bits - 1), nat(bits) &&
    bits <= 16, 'dynamicrange', [bits]) } /** QUANTIZATION ERROR: the worst-case rounding, half a step. value
    ⌊step / 2⌋. */ static quantizationerror(step: number): CrossFormula { return
    c('quantization-quantizationerror', 'quantizationerror(step) = ⌊step / 2⌋', Math.floor(step / 2), nat(step),
    'quantizationerror', [step]) } /** CODE RATE: bits per sample over the samples of a stream. value bits ·
    samples. -/
theorem fam_quantization_coderate_1 : ((16 : Int) * (1000 : Int)) = (16000 : Int) := by decide

/-- quantization: resolution(2560, 8) = 10 — QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC.
    Mapping a signal onto a finite ladder is numbers: the levels a bit-depth gives, the size of each step across
    a range, the signal-to-noise a depth buys, the depth a level count implies, the dynamic range, the
    worst-case rounding error, the bit rate a stream costs, and the resolution per step. Crosses to `signal` —
    quantization is what a signal is reduced to. A measure. */ const PROOF = 'quantization arithmetic (levels,
    step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude
    made discrete; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `quantization.${name}`, params }) export class QuantizationFormulas { /** LEVELS: the codes a bit-depth
    gives. value 2^bits. */ static levels(bits: number): CrossFormula { return c('quantization-levels',
    'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) } /** STEP SIZE: a full-scale
    range split across its levels. value ⌊range / levels⌋. */ static stepsize(range: number, levels: number):
    CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ?
    Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) } /**
    SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. */ static snr(bits: number):
    CrossFormula { return c('quantization-snr', 'snr(bits) = 6 · bits', 6 * bits, nat(bits) && bits <= 16,
    'snr', [bits]) } /** BIT DEPTH a level count implies. value ⌊log2(levels)⌋. */ static bits(levels: number):
    CrossFormula { return c('quantization-bits', 'bits(levels) = ⌊log2(levels)⌋', levels > 0 ?
    Math.floor(Math.log2(levels)) : 0, nat(levels) && levels > 0, 'bits', [levels]) } /** DYNAMIC RANGE: the
    largest code at a bit-depth. value 2^bits − 1. */ static dynamicrange(bits: number): CrossFormula { return
    c('quantization-dynamicrange', 'dynamicrange(bits) = 2^bits − 1', Math.max(0, 2 ** bits - 1), nat(bits) &&
    bits <= 16, 'dynamicrange', [bits]) } /** QUANTIZATION ERROR: the worst-case rounding, half a step. value
    ⌊step / 2⌋. */ static quantizationerror(step: number): CrossFormula { return
    c('quantization-quantizationerror', 'quantizationerror(step) = ⌊step / 2⌋', Math.floor(step / 2), nat(step),
    'quantizationerror', [step]) } /** CODE RATE: bits per sample over the samples of a stream. value bits ·
    samples. */ static coderate(bits: number, samples: number): CrossFormula { return c('quantization-coderate',
    'coderate(bits, samples) = bits · samples', bits * samples, nat(bits, samples), 'coderate', [bits, samples])
    } /** RESOLUTION: the smallest increment a range resolves at a bit-depth. value ⌊range / 2^bits⌋. -/
theorem fam_quantization_resolution_1 : ((2560 : Int) / ((2 : Int) ^ (8 : Nat))) = (10 : Int) := by decide

/-- quantum: qubits(5, 0) = 5 -/
theorem fam_quantum_qubits_1 : ((5 : Int) + (0 : Int)) = (5 : Int) := by decide

/-- quantum: states(5) = 32 -/
theorem fam_quantum_states_1 : ((2 : Int) ^ (5 : Nat)) = (32 : Int) := by decide

/-- quantum: gatecount(20, 3) = 60 -/
theorem fam_quantum_gatecount_1 : ((20 : Int) * (3 : Int)) = (60 : Int) := by decide

/-- quantum: entanglementpairs(8, 2) = 28 -/
theorem fam_quantum_entanglementpairs_1 : (Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int) := by decide

/-- quantum: superposition(4) = 16 -/
theorem fam_quantum_superposition_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- quantum: circuitdepth(10, 5) = 15 -/
theorem fam_quantum_circuitdepth_1 : ((10 : Int) + (5 : Int)) = (15 : Int) := by decide

/-- quantum: shots(1024, 1) = 1024 -/
theorem fam_quantum_shots_1 : ((1024 : Int) * (1 : Int)) = (1024 : Int) := by decide

/-- quantum: fidelity(99, 100) = 99 -/
theorem fam_quantum_fidelity_1 : (((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int) := by decide

/-- query: pages(100, 10) = 10 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC
    (find/where/depth/pagination/sort/limit, not by hand). A query is numbers: the pages a result spans, the
    docs to skip, the relation depth, the where-conditions, the relations a population walks, the sort fields,
    the limit under a cap, and the hit rate of returned over total. Crosses to `payload` — query is how Payload
    reads. A measure. */ const PROOF = 'query arithmetic (pages, skip, depth, where, population, sort, limit,
    hit) over the Payload Local API; find/where/depth/pagination/sort/limit as exact integers; a measure crossed
    to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `query.${name}`, params }) export class QueryFormulas { /**
    PAGES: the pages a result spans at a page limit. value ⌈docs / limit⌉. -/
theorem fam_query_pages_1 : (-((-(100 : Int)) / (10 : Int))) = (10 : Int) := by decide

/-- query: skip(3, 10) = 20 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC
    (find/where/depth/pagination/sort/limit, not by hand). A query is numbers: the pages a result spans, the
    docs to skip, the relation depth, the where-conditions, the relations a population walks, the sort fields,
    the limit under a cap, and the hit rate of returned over total. Crosses to `payload` — query is how Payload
    reads. A measure. */ const PROOF = 'query arithmetic (pages, skip, depth, where, population, sort, limit,
    hit) over the Payload Local API; find/where/depth/pagination/sort/limit as exact integers; a measure crossed
    to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `query.${name}`, params }) export class QueryFormulas { /**
    PAGES: the pages a result spans at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit:
    number): CrossFormula { return c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ?
    Math.ceil(docs / limit) : 0, nat(docs, limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to
    skip to reach a page. value max(0, (page − 1) · limit). -/
theorem fam_query_skip_1 : (fmax (0 : Int) (((3 : Int) - (1 : Int)) * (10 : Int))) = (20 : Int) := by decide

/-- query: depth(2) = 2 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC (find/where/depth/pagination/sort/limit,
    not by hand). A query is numbers: the pages a result spans, the docs to skip, the relation depth, the
    where-conditions, the relations a population walks, the sort fields, the limit under a cap, and the hit rate
    of returned over total. Crosses to `payload` — query is how Payload reads. A measure. */ const PROOF =
    'query arithmetic (pages, skip, depth, where, population, sort, limit, hit) over the Payload Local API;
    find/where/depth/pagination/sort/limit as exact integers; a measure crossed to payload' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula, value, proof: PROOF, ...extra },
    holds, { name: `query.${name}`, params }) export class QueryFormulas { /** PAGES: the pages a result spans
    at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit: number): CrossFormula { return
    c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ? Math.ceil(docs / limit) : 0, nat(docs,
    limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to skip to reach a page. value max(0,
    (page − 1) · limit). */ static skip(page: number, limit: number): CrossFormula { return c('query-skip',
    'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page - 1) * limit), nat(page, limit) && page
    >= 1, 'skip', [page, limit]) } /** DEPTH: the relation depth requested. value d. -/
theorem fam_query_depth_1 : (2 : Int) = (2 : Int) := by decide

/-- query: where(4) = 4 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC (find/where/depth/pagination/sort/limit,
    not by hand). A query is numbers: the pages a result spans, the docs to skip, the relation depth, the
    where-conditions, the relations a population walks, the sort fields, the limit under a cap, and the hit rate
    of returned over total. Crosses to `payload` — query is how Payload reads. A measure. */ const PROOF =
    'query arithmetic (pages, skip, depth, where, population, sort, limit, hit) over the Payload Local API;
    find/where/depth/pagination/sort/limit as exact integers; a measure crossed to payload' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula, value, proof: PROOF, ...extra },
    holds, { name: `query.${name}`, params }) export class QueryFormulas { /** PAGES: the pages a result spans
    at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit: number): CrossFormula { return
    c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ? Math.ceil(docs / limit) : 0, nat(docs,
    limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to skip to reach a page. value max(0,
    (page − 1) · limit). */ static skip(page: number, limit: number): CrossFormula { return c('query-skip',
    'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page - 1) * limit), nat(page, limit) && page
    >= 1, 'skip', [page, limit]) } /** DEPTH: the relation depth requested. value d. */ static depth(d: number):
    CrossFormula { return c('query-depth', 'depth(d) = d', d, nat(d) && d <= 10, 'depth', [d]) } /** WHERE: the
    conditions in a where clause. value conditions. -/
theorem fam_query_where_1 : (4 : Int) = (4 : Int) := by decide

/-- query: population(5, 2) = 10 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC
    (find/where/depth/pagination/sort/limit, not by hand). A query is numbers: the pages a result spans, the
    docs to skip, the relation depth, the where-conditions, the relations a population walks, the sort fields,
    the limit under a cap, and the hit rate of returned over total. Crosses to `payload` — query is how Payload
    reads. A measure. */ const PROOF = 'query arithmetic (pages, skip, depth, where, population, sort, limit,
    hit) over the Payload Local API; find/where/depth/pagination/sort/limit as exact integers; a measure crossed
    to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `query.${name}`, params }) export class QueryFormulas { /**
    PAGES: the pages a result spans at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit:
    number): CrossFormula { return c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ?
    Math.ceil(docs / limit) : 0, nat(docs, limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to
    skip to reach a page. value max(0, (page − 1) · limit). */ static skip(page: number, limit: number):
    CrossFormula { return c('query-skip', 'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page -
    1) * limit), nat(page, limit) && page >= 1, 'skip', [page, limit]) } /** DEPTH: the relation depth
    requested. value d. */ static depth(d: number): CrossFormula { return c('query-depth', 'depth(d) = d', d,
    nat(d) && d <= 10, 'depth', [d]) } /** WHERE: the conditions in a where clause. value conditions. */ static
    where(conditions: number): CrossFormula { return c('query-where', 'where(conditions) = conditions',
    conditions, nat(conditions), 'where', [conditions]) } /** POPULATION: the relations a population walks at a
    depth. value relations · depth. -/
theorem fam_query_population_1 : ((5 : Int) * (2 : Int)) = (10 : Int) := by decide

/-- query: sort(3) = 3 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC (find/where/depth/pagination/sort/limit,
    not by hand). A query is numbers: the pages a result spans, the docs to skip, the relation depth, the
    where-conditions, the relations a population walks, the sort fields, the limit under a cap, and the hit rate
    of returned over total. Crosses to `payload` — query is how Payload reads. A measure. */ const PROOF =
    'query arithmetic (pages, skip, depth, where, population, sort, limit, hit) over the Payload Local API;
    find/where/depth/pagination/sort/limit as exact integers; a measure crossed to payload' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula, value, proof: PROOF, ...extra },
    holds, { name: `query.${name}`, params }) export class QueryFormulas { /** PAGES: the pages a result spans
    at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit: number): CrossFormula { return
    c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ? Math.ceil(docs / limit) : 0, nat(docs,
    limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to skip to reach a page. value max(0,
    (page − 1) · limit). */ static skip(page: number, limit: number): CrossFormula { return c('query-skip',
    'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page - 1) * limit), nat(page, limit) && page
    >= 1, 'skip', [page, limit]) } /** DEPTH: the relation depth requested. value d. */ static depth(d: number):
    CrossFormula { return c('query-depth', 'depth(d) = d', d, nat(d) && d <= 10, 'depth', [d]) } /** WHERE: the
    conditions in a where clause. value conditions. */ static where(conditions: number): CrossFormula { return
    c('query-where', 'where(conditions) = conditions', conditions, nat(conditions), 'where', [conditions]) } /**
    POPULATION: the relations a population walks at a depth. value relations · depth. */ static
    population(relations: number, depth: number): CrossFormula { return c('query-population',
    'population(relations, depth) = relations · depth', relations * depth, nat(relations, depth), 'population',
    [relations, depth]) } /** SORT: the fields a sort orders by. value fields. -/
theorem fam_query_sort_1 : (3 : Int) = (3 : Int) := by decide

/-- query: limit(500, 100) = 100 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC
    (find/where/depth/pagination/sort/limit, not by hand). A query is numbers: the pages a result spans, the
    docs to skip, the relation depth, the where-conditions, the relations a population walks, the sort fields,
    the limit under a cap, and the hit rate of returned over total. Crosses to `payload` — query is how Payload
    reads. A measure. */ const PROOF = 'query arithmetic (pages, skip, depth, where, population, sort, limit,
    hit) over the Payload Local API; find/where/depth/pagination/sort/limit as exact integers; a measure crossed
    to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `query.${name}`, params }) export class QueryFormulas { /**
    PAGES: the pages a result spans at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit:
    number): CrossFormula { return c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ?
    Math.ceil(docs / limit) : 0, nat(docs, limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to
    skip to reach a page. value max(0, (page − 1) · limit). */ static skip(page: number, limit: number):
    CrossFormula { return c('query-skip', 'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page -
    1) * limit), nat(page, limit) && page >= 1, 'skip', [page, limit]) } /** DEPTH: the relation depth
    requested. value d. */ static depth(d: number): CrossFormula { return c('query-depth', 'depth(d) = d', d,
    nat(d) && d <= 10, 'depth', [d]) } /** WHERE: the conditions in a where clause. value conditions. */ static
    where(conditions: number): CrossFormula { return c('query-where', 'where(conditions) = conditions',
    conditions, nat(conditions), 'where', [conditions]) } /** POPULATION: the relations a population walks at a
    depth. value relations · depth. */ static population(relations: number, depth: number): CrossFormula {
    return c('query-population', 'population(relations, depth) = relations · depth', relations * depth,
    nat(relations, depth), 'population', [relations, depth]) } /** SORT: the fields a sort orders by. value
    fields. */ static sort(fields: number): CrossFormula { return c('query-sort', 'sort(fields) = fields',
    fields, nat(fields), 'sort', [fields]) } /** LIMIT: the requested limit under a cap. value min(requested,
    cap). -/
theorem fam_query_limit_1 : (fmin (500 : Int) (100 : Int)) = (100 : Int) := by decide

/-- query: hit(45, 100) = 45 — QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC
    (find/where/depth/pagination/sort/limit, not by hand). A query is numbers: the pages a result spans, the
    docs to skip, the relation depth, the where-conditions, the relations a population walks, the sort fields,
    the limit under a cap, and the hit rate of returned over total. Crosses to `payload` — query is how Payload
    reads. A measure. */ const PROOF = 'query arithmetic (pages, skip, depth, where, population, sort, limit,
    hit) over the Payload Local API; find/where/depth/pagination/sort/limit as exact integers; a measure crossed
    to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'query', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `query.${name}`, params }) export class QueryFormulas { /**
    PAGES: the pages a result spans at a page limit. value ⌈docs / limit⌉. */ static pages(docs: number, limit:
    number): CrossFormula { return c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ?
    Math.ceil(docs / limit) : 0, nat(docs, limit) && limit > 0, 'pages', [docs, limit]) } /** SKIP: the docs to
    skip to reach a page. value max(0, (page − 1) · limit). */ static skip(page: number, limit: number):
    CrossFormula { return c('query-skip', 'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page -
    1) * limit), nat(page, limit) && page >= 1, 'skip', [page, limit]) } /** DEPTH: the relation depth
    requested. value d. */ static depth(d: number): CrossFormula { return c('query-depth', 'depth(d) = d', d,
    nat(d) && d <= 10, 'depth', [d]) } /** WHERE: the conditions in a where clause. value conditions. */ static
    where(conditions: number): CrossFormula { return c('query-where', 'where(conditions) = conditions',
    conditions, nat(conditions), 'where', [conditions]) } /** POPULATION: the relations a population walks at a
    depth. value relations · depth. */ static population(relations: number, depth: number): CrossFormula {
    return c('query-population', 'population(relations, depth) = relations · depth', relations * depth,
    nat(relations, depth), 'population', [relations, depth]) } /** SORT: the fields a sort orders by. value
    fields. */ static sort(fields: number): CrossFormula { return c('query-sort', 'sort(fields) = fields',
    fields, nat(fields), 'sort', [fields]) } /** LIMIT: the requested limit under a cap. value min(requested,
    cap). */ static limit(requested: number, cap: number): CrossFormula { return c('query-limit',
    'limit(requested, cap) = min(requested, cap)', Math.min(requested, cap), nat(requested, cap), 'limit',
    [requested, cap]) } /** HIT: returned over total as a percentage. value ⌊returned · 100 / total⌋. -/
theorem fam_query_hit_1 : (((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int) := by decide

/-- queue: throughput(6000, 60) = 100 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a
    hex address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) =
    x / y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) =
    x · y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12)
    return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number):
    number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk;
    i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number =>
    (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. -/
theorem fam_queue_throughput_1 : ((6000 : Int) / (60 : Int)) = (100 : Int) := by decide

/-- queue: latency(1000, 100) = 10 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex
    address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x /
    y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x ·
    y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return
    0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number
    => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v
    = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0
    || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. -/
theorem fam_queue_latency_1 : ((1000 : Int) / (100 : Int)) = (10 : Int) := by decide

/-- queue: depth(64, 0) = 64 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex
    address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x /
    y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x ·
    y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return
    0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number
    => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v
    = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0
    || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. */ static latency(x: number, y: number): CrossFormula {
    return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'latency', [x, y]) } /** depth(x, y) = x + y. -/
theorem fam_queue_depth_1 : ((64 : Int) + (0 : Int)) = (64 : Int) := by decide

/-- queue: waittime(120, 4) = 30 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex
    address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x /
    y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x ·
    y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return
    0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number
    => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v
    = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0
    || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. */ static latency(x: number, y: number): CrossFormula {
    return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'latency', [x, y]) } /** depth(x, y) = x + y. */ static depth(x: number, y: number): CrossFormula { return
    f('queue-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) } /** waittime(x, y) = x / y. -/
theorem fam_queue_waittime_1 : ((120 : Int) / (4 : Int)) = (30 : Int) := by decide

/-- queue: slots(6) = 64 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex address
    crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x / y;
    latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x · y;
    service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return 0;
    let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number =>
    { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v =
    (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 ||
    k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. */ static latency(x: number, y: number): CrossFormula {
    return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'latency', [x, y]) } /** depth(x, y) = x + y. */ static depth(x: number, y: number): CrossFormula { return
    f('queue-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) } /** waittime(x, y) = x / y. */
    static waittime(x: number, y: number): CrossFormula { return f('queue-waittime', 'waittime(x, y) = x / y', y
    > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waittime', [x, y]) } /** slots(x) = 2^x. -/
theorem fam_queue_slots_1 : ((2 : Int) ^ (6 : Nat)) = (64 : Int) := by decide

/-- queue: arrivals(10, 60) = 600 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex
    address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x /
    y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x ·
    y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return
    0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number
    => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v
    = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0
    || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. */ static latency(x: number, y: number): CrossFormula {
    return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'latency', [x, y]) } /** depth(x, y) = x + y. */ static depth(x: number, y: number): CrossFormula { return
    f('queue-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) } /** waittime(x, y) = x / y. */
    static waittime(x: number, y: number): CrossFormula { return f('queue-waittime', 'waittime(x, y) = x / y', y
    > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waittime', [x, y]) } /** slots(x) = 2^x. */ static
    slots(x: number): CrossFormula { return f('queue-slots', 'slots(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x
    <= 30, 'slots', [x]) } /** arrivals(x, y) = x · y. -/
theorem fam_queue_arrivals_1 : ((10 : Int) * (60 : Int)) = (600 : Int) := by decide

/-- queue: service(1000, 10) = 100 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex
    address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x /
    y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x ·
    y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return
    0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number
    => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v
    = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0
    || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. */ static latency(x: number, y: number): CrossFormula {
    return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'latency', [x, y]) } /** depth(x, y) = x + y. */ static depth(x: number, y: number): CrossFormula { return
    f('queue-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) } /** waittime(x, y) = x / y. */
    static waittime(x: number, y: number): CrossFormula { return f('queue-waittime', 'waittime(x, y) = x / y', y
    > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waittime', [x, y]) } /** slots(x) = 2^x. */ static
    slots(x: number): CrossFormula { return f('queue-slots', 'slots(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x
    <= 30, 'slots', [x]) } /** arrivals(x, y) = x · y. */ static arrivals(x: number, y: number): CrossFormula {
    return f('queue-arrivals', 'arrivals(x, y) = x · y', x * y, nat(x, y), 'arrivals', [x, y]) } /** service(x,
    y) = x / y. -/
theorem fam_queue_service_1 : ((1000 : Int) / (10 : Int)) = (100 : Int) := by decide

/-- queue: combos(8, 2) = 28 — QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex
    address crossing to cross; develops the queue leads. */ const PROOF = "queue counts: throughput(x, y) = x /
    y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x ·
    y; service(x, y) = x / y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return
    0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number
    => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v
    = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0
    || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'queue', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `queue.${name}`, params }) export class QueueFormulas { /**
    throughput(x, y) = x / y. */ static throughput(x: number, y: number): CrossFormula { return
    f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'throughput', [x, y]) } /** latency(x, y) = x / y. */ static latency(x: number, y: number): CrossFormula {
    return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'latency', [x, y]) } /** depth(x, y) = x + y. */ static depth(x: number, y: number): CrossFormula { return
    f('queue-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) } /** waittime(x, y) = x / y. */
    static waittime(x: number, y: number): CrossFormula { return f('queue-waittime', 'waittime(x, y) = x / y', y
    > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waittime', [x, y]) } /** slots(x) = 2^x. */ static
    slots(x: number): CrossFormula { return f('queue-slots', 'slots(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x
    <= 30, 'slots', [x]) } /** arrivals(x, y) = x · y. */ static arrivals(x: number, y: number): CrossFormula {
    return f('queue-arrivals', 'arrivals(x, y) = x · y', x * y, nat(x, y), 'arrivals', [x, y]) } /** service(x,
    y) = x / y. */ static service(x: number, y: number): CrossFormula { return f('queue-service', 'service(x, y)
    = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'service', [x, y]) } /** combos(x, y) = C(x,
    y). -/
theorem fam_queue_combos_1 : (Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int) := by decide

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
theorem fam_queueing_utilization_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- queueing: averagequeue(1000, 50) = 20 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. -/
theorem fam_queueing_averagequeue_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- queueing: waitingtime(100, 20) = 5 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. -/
theorem fam_queueing_waitingtime_1 : ((100 : Int) / (20 : Int)) = (5 : Int) := by decide

/-- queueing: littleslaw(30, 4) = 120 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. */ static waitingtime(queue: number, rate: number):
    CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ?
    Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) } /** LITTLE'S
    LAW: the length is the arrival rate times the wait. value arrival · wait. -/
theorem fam_queueing_littleslaw_1 : ((30 : Int) * (4 : Int)) = (120 : Int) := by decide

/-- queueing: servicerate(6000, 60) = 100 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. */ static waitingtime(queue: number, rate: number):
    CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ?
    Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) } /** LITTLE'S
    LAW: the length is the arrival rate times the wait. value arrival · wait. */ static littleslaw(arrival:
    number, wait: number): CrossFormula { return c('queueing-littleslaw', 'littleslaw(arrival, wait) = arrival ·
    wait', arrival * wait, nat(arrival, wait), 'littleslaw', [arrival, wait]) } /** SERVICE RATE: jobs served
    over the seconds taken. value ⌊served / seconds⌋. -/
theorem fam_queueing_servicerate_1 : ((6000 : Int) / (60 : Int)) = (100 : Int) := by decide

/-- queueing: arrivalrate(5400, 60) = 90 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. */ static waitingtime(queue: number, rate: number):
    CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ?
    Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) } /** LITTLE'S
    LAW: the length is the arrival rate times the wait. value arrival · wait. */ static littleslaw(arrival:
    number, wait: number): CrossFormula { return c('queueing-littleslaw', 'littleslaw(arrival, wait) = arrival ·
    wait', arrival * wait, nat(arrival, wait), 'littleslaw', [arrival, wait]) } /** SERVICE RATE: jobs served
    over the seconds taken. value ⌊served / seconds⌋. */ static servicerate(served: number, seconds: number):
    CrossFormula { return c('queueing-servicerate', 'servicerate(served, seconds) = ⌊served / seconds⌋', seconds
    > 0 ? Math.floor(served / seconds) : 0, nat(served, seconds) && seconds > 0, 'servicerate', [served,
    seconds]) } /** ARRIVAL RATE: jobs arriving over the seconds watched. value ⌊arrivals / seconds⌋. -/
theorem fam_queueing_arrivalrate_1 : ((5400 : Int) / (60 : Int)) = (90 : Int) := by decide

/-- queueing: systemlength(18, 2) = 20 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. */ static waitingtime(queue: number, rate: number):
    CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ?
    Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) } /** LITTLE'S
    LAW: the length is the arrival rate times the wait. value arrival · wait. */ static littleslaw(arrival:
    number, wait: number): CrossFormula { return c('queueing-littleslaw', 'littleslaw(arrival, wait) = arrival ·
    wait', arrival * wait, nat(arrival, wait), 'littleslaw', [arrival, wait]) } /** SERVICE RATE: jobs served
    over the seconds taken. value ⌊served / seconds⌋. */ static servicerate(served: number, seconds: number):
    CrossFormula { return c('queueing-servicerate', 'servicerate(served, seconds) = ⌊served / seconds⌋', seconds
    > 0 ? Math.floor(served / seconds) : 0, nat(served, seconds) && seconds > 0, 'servicerate', [served,
    seconds]) } /** ARRIVAL RATE: jobs arriving over the seconds watched. value ⌊arrivals / seconds⌋. */ static
    arrivalrate(arrivals: number, seconds: number): CrossFormula { return c('queueing-arrivalrate',
    'arrivalrate(arrivals, seconds) = ⌊arrivals / seconds⌋', seconds > 0 ? Math.floor(arrivals / seconds) : 0,
    nat(arrivals, seconds) && seconds > 0, 'arrivalrate', [arrivals, seconds]) } /** SYSTEM LENGTH: the ones
    waiting plus the ones in service. value queue + inservice. -/
theorem fam_queueing_systemlength_1 : ((18 : Int) + (2 : Int)) = (20 : Int) := by decide

/-- queueing: idleprobability(25, 100) = 75 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. */ static waitingtime(queue: number, rate: number):
    CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ?
    Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) } /** LITTLE'S
    LAW: the length is the arrival rate times the wait. value arrival · wait. */ static littleslaw(arrival:
    number, wait: number): CrossFormula { return c('queueing-littleslaw', 'littleslaw(arrival, wait) = arrival ·
    wait', arrival * wait, nat(arrival, wait), 'littleslaw', [arrival, wait]) } /** SERVICE RATE: jobs served
    over the seconds taken. value ⌊served / seconds⌋. */ static servicerate(served: number, seconds: number):
    CrossFormula { return c('queueing-servicerate', 'servicerate(served, seconds) = ⌊served / seconds⌋', seconds
    > 0 ? Math.floor(served / seconds) : 0, nat(served, seconds) && seconds > 0, 'servicerate', [served,
    seconds]) } /** ARRIVAL RATE: jobs arriving over the seconds watched. value ⌊arrivals / seconds⌋. */ static
    arrivalrate(arrivals: number, seconds: number): CrossFormula { return c('queueing-arrivalrate',
    'arrivalrate(arrivals, seconds) = ⌊arrivals / seconds⌋', seconds > 0 ? Math.floor(arrivals / seconds) : 0,
    nat(arrivals, seconds) && seconds > 0, 'arrivalrate', [arrivals, seconds]) } /** SYSTEM LENGTH: the ones
    waiting plus the ones in service. value queue + inservice. */ static systemlength(queue: number, inservice:
    number): CrossFormula { return c('queueing-systemlength', 'systemlength(queue, inservice) = queue +
    inservice', queue + inservice, nat(queue, inservice), 'systemlength', [queue, inservice]) } /** IDLE
    PROBABILITY: the share of time the server is free, as a percentage. value ⌊max(0, service − arrival) · 100 /
    service⌋. -/
theorem fam_queueing_idleprobability_1 : (((fmax (0 : Int) ((100 : Int) - (25 : Int))) * (100 : Int)) / (100 : Int)) = (75 : Int) := by decide

/-- queueing: idleprobability(100, 100) = 0 — QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API
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
    service⌋. */ static utilization(arrival: number, service: number): CrossFormula { return
    c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ?
    Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service,
    'utilization', [arrival, service]) } /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items /
    cycles⌋. */ static averagequeue(items: number, cycles: number): CrossFormula { return
    c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items /
    cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) } /** WAITING TIME: the line
    drained at the service rate. value ⌊queue / rate⌋. */ static waitingtime(queue: number, rate: number):
    CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ?
    Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) } /** LITTLE'S
    LAW: the length is the arrival rate times the wait. value arrival · wait. */ static littleslaw(arrival:
    number, wait: number): CrossFormula { return c('queueing-littleslaw', 'littleslaw(arrival, wait) = arrival ·
    wait', arrival * wait, nat(arrival, wait), 'littleslaw', [arrival, wait]) } /** SERVICE RATE: jobs served
    over the seconds taken. value ⌊served / seconds⌋. */ static servicerate(served: number, seconds: number):
    CrossFormula { return c('queueing-servicerate', 'servicerate(served, seconds) = ⌊served / seconds⌋', seconds
    > 0 ? Math.floor(served / seconds) : 0, nat(served, seconds) && seconds > 0, 'servicerate', [served,
    seconds]) } /** ARRIVAL RATE: jobs arriving over the seconds watched. value ⌊arrivals / seconds⌋. */ static
    arrivalrate(arrivals: number, seconds: number): CrossFormula { return c('queueing-arrivalrate',
    'arrivalrate(arrivals, seconds) = ⌊arrivals / seconds⌋', seconds > 0 ? Math.floor(arrivals / seconds) : 0,
    nat(arrivals, seconds) && seconds > 0, 'arrivalrate', [arrivals, seconds]) } /** SYSTEM LENGTH: the ones
    waiting plus the ones in service. value queue + inservice. */ static systemlength(queue: number, inservice:
    number): CrossFormula { return c('queueing-systemlength', 'systemlength(queue, inservice) = queue +
    inservice', queue + inservice, nat(queue, inservice), 'systemlength', [queue, inservice]) } /** IDLE
    PROBABILITY: the share of time the server is free, as a percentage. value ⌊max(0, service − arrival) · 100 /
    service⌋. -/
theorem fam_queueing_idleprobability_2 : (((fmax (0 : Int) ((100 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (0 : Int) := by decide

/-- quilting: blockcount(12, 12) = 144 -/
theorem fam_quilting_blockcount_1 : ((12 : Int) * (12 : Int)) = (144 : Int) := by decide

/-- quilting: patchpairs(16, 2) = 120 -/
theorem fam_quilting_patchpairs_1 : (Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (2 : Int)))) = (120 : Int) := by decide

/-- quilting: seamlength(100, 4) = 400 -/
theorem fam_quilting_seamlength_1 : ((100 : Int) * (4 : Int)) = (400 : Int) := by decide

/-- quilting: patternorderings(5) = 120 -/
theorem fam_quilting_patternorderings_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- quilting: colorsubsets(6) = 64 -/
theorem fam_quilting_colorsubsets_1 : ((2 : Int) ^ (6 : Nat)) = (64 : Int) := by decide

/-- quilting: gridcells(20, 20) = 400 -/
theorem fam_quilting_gridcells_1 : ((20 : Int) * (20 : Int)) = (400 : Int) := by decide

/-- quilting: borderwidth(4, 2) = 6 -/
theorem fam_quilting_borderwidth_1 : ((4 : Int) + (2 : Int)) = (6 : Int) := by decide

/-- quilting: symmetryratio(90, 100) = 90 -/
theorem fam_quilting_symmetryratio_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide
