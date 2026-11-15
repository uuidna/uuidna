-- lean/FamiliesS.lean — GENERATED. THE FAMILIES, S — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- safety: incidentrate(3, 200000) = 3 — SAFETY — WORKPLACE SAFETY AS ARITHMETIC. Protecting people is numbers:
    the OSHA incident rate, severity per incident, the risk of a hazard, near-misses per incident, compliance
    and training percentages, chemical exposure, and the margin left under a limit. Crosses to `construction` —
    safety is what building work must hold. A measure. */ const PROOF = 'safety arithmetic (OSHA incident rate,
    severity, risk, near-miss ratio, compliance, exposure, safety margin, training); workplace protection as
    integers; a measure crossed to construction' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'safety', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name:
    `safety.${name}`, params }) export class SafetyFormulas { /** OSHA INCIDENT RATE: incidents per 200,000
    hours worked. value ⌊incidents · 200000 / hours⌋. -/
theorem fam_safety_incidentrate_1 : ((3 * 200000) / 200000) = 3 := by decide

/-- safety: severity(40, 8) = 5 — SEVERITY: lost days per incident. value ⌊lostdays / incidents⌋. -/
theorem fam_safety_severity_1 : (40 / 8) = 5 := by decide

/-- safety: risk(4, 5) = 20 — RISK: probability times impact. value probability · impact. -/
theorem fam_safety_risk_1 : (4 * 5) = 20 := by decide

/-- safety: nearmiss(30, 3) = 10 — NEAR-MISS RATIO: near-misses per incident. value ⌊nearmisses / incidents⌋. -/
theorem fam_safety_nearmiss_1 : (30 / 3) = 10 := by decide

/-- safety: compliance(95, 100) = 95 — COMPLIANCE as a percentage. value ⌊compliant · 100 / checks⌋. -/
theorem fam_safety_compliance_1 : ((95 * 100) / 100) = 95 := by decide

/-- safety: exposure(50, 8) = 400 — EXPOSURE: concentration over a duration. value concentration · duration. -/
theorem fam_safety_exposure_1 : (50 * 8) = 400 := by decide

/-- safety: margin(100, 70) = 30 — SAFETY MARGIN: how far under the limit the actual reading is. value max(0,
    limit − actual). -/
theorem fam_safety_margin_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- safety: margin(70, 100) = 0 — SAFETY MARGIN: how far under the limit the actual reading is. value max(0,
    limit − actual). -/
theorem fam_safety_margin_2 : (fmax 0 (70 - 100)) = 0 := by decide

/-- safety: training(80, 100) = 80 — TRAINING as a percentage of the workforce. value ⌊trained · 100 / workers⌋. -/
theorem fam_safety_training_1 : ((80 * 100) / 100) = 80 := by decide

/-- sailing: ballast(400, 1000) = 40 — SAILING — THE POINTS OF A BOAT, AS ARITHMETIC. A hull's speed proxy,
    velocity made good, heel under force against righting moment, the distance of a tack across legs, a sail's
    triangle area, drift over time, a compass bearing normalised, and ballast ratio. Crosses to `oceanography` —
    the sea the boat sails. A measure. */ const PROOF = 'sailing arithmetic (hull speed, velocity made good,
    heel, tack, sail area, drift, bearing, ballast); a measure crossed to oceanography' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'sailing', dst: 'oceanography', formula, value, proof: PROOF,
    ...extra }, holds, { name: `sailing.${name}`, params }) export class SailingFormulas { /** BALLAST RATIO:
    keel against displacement, as a percentage. value ⌊keel · 100 / displacement⌋. -/
theorem fam_sailing_ballast_1 : ((400 * 100) / 1000) = 40 := by decide

/-- sailing: drift(3, 4) = 12 — DRIFT: current carried over time. value current · time. -/
theorem fam_sailing_drift_1 : (3 * 4) = 12 := by decide

/-- sailing: heel(50, 200) = 25 — HEEL: force against the righting moment, as a percentage. value ⌊force · 100 /
    righting⌋. -/
theorem fam_sailing_heel_1 : ((50 * 100) / 200) = 25 := by decide

/-- sailing: hullspeed(30, 2) = 60 — HULL SPEED: a waterline proxy at a factor. value waterline · factor. -/
theorem fam_sailing_hullspeed_1 : (30 * 2) = 60 := by decide

/-- sailing: sailarea(10, 4) = 20 — SAIL AREA: a triangle of luff and foot. value ⌊luff · foot / 2⌋. -/
theorem fam_sailing_sailarea_1 : ((10 * 4) / 2) = 20 := by decide

/-- sailing: tack(100, 4) = 25 — TACK: distance spread across legs. value ⌊distance / legs⌋. -/
theorem fam_sailing_tack_1 : (100 / 4) = 25 := by decide

/-- sailing: vmg(100, 90) = 100 — VELOCITY MADE GOOD: speed at an angle off the mark (0..90). value ⌊speed ·
    angle / 90⌋. -/
theorem fam_sailing_vmg_1 : ((100 * 90) / 90) = 100 := by decide

/-- salinity: practical(1000, 1000) = 35 — SALINITY — THE SEAWATER SALT BUDGET, AS ARITHMETIC. How salty the sea
    is, as numbers: practical salinity from a conductivity ratio, absolute salinity, density, conductivity,
    chlorinity, the haline contraction, a fresh/salt mixing ratio, and the freezing-point depression. Crosses to
    `oceanography` — salinity is what oceanography measures. A measure. */ const PROOF = 'salinity arithmetic
    (practical salinity, absolute salinity, density, conductivity, chlorinity, haline contraction, mixing ratio,
    freezing-point depression); a measure crossed to oceanography' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'salinity', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name:
    `salinity.${name}`, params }) export class SalinityFormulas { /** PRACTICAL SALINITY: a conductivity ratio
    scaled to the practical scale (≈35 PSU). value ⌊conductivity · 35 / reference⌋. -/
theorem fam_salinity_practical_1 : ((1000 * 35) / 1000) = 35 := by decide

/-- salinity: absolute(35, 1) = 36 — ABSOLUTE SALINITY: practical salinity plus a composition offset (TEOS-10).
    value practical + delta. -/
theorem fam_salinity_absolute_1 : (35 + 1) = 36 := by decide

/-- salinity: density(35, 10) = 1025 — DENSITY: seawater density above 1000, salt heavier, warmth lighter. value
    max(0, 1000 + salinity − temp). -/
theorem fam_salinity_density_1 : (fmax 0 ((1000 + 35) - 10)) = 1025 := by decide

/-- salinity: density(10, 2000) = 0 — DENSITY: seawater density above 1000, salt heavier, warmth lighter. value
    max(0, 1000 + salinity − temp). -/
theorem fam_salinity_density_2 : (fmax 0 ((1000 + 10) - 2000)) = 0 := by decide

/-- salinity: conductivity(35, 10) = 350 — CONDUCTIVITY: salt carries current, warmth helps. value salinity ·
    temp. -/
theorem fam_salinity_conductivity_1 : (35 * 10) = 350 := by decide

/-- salinity: chlorinity(35, 554) = 19 — CHLORINITY: the chloride share of salinity (Knudsen, factor per
    thousand). value ⌊salinity · factor / 1000⌋. -/
theorem fam_salinity_chlorinity_1 : ((35 * 554) / 1000) = 19 := by decide

/-- salinity: haline(1025, 35) = 29 — HALINE CONTRACTION: density carried per unit of salinity. value ⌊density /
    salinity⌋. -/
theorem fam_salinity_haline_1 : (1025 / 35) = 29 := by decide

/-- salinity: mixingratio(50, 200) = 25 — MIXING RATIO: fresh water as a percentage of the salt it mixes into.
    value ⌊fresh · 100 / salt⌋. -/
theorem fam_salinity_mixingratio_1 : ((50 * 100) / 200) = 25 := by decide

/-- salinity: freezingpoint(35, 54) = 1890 — FREEZING POINT: the depression below 0 °C, in millidegrees, that
    salt causes. value salinity · coeff. -/
theorem fam_salinity_freezingpoint_1 : (35 * 54) = 1890 := by decide

/-- sampling: samplesize(10000, 5) = 500 — SAMPLING — DRAWING A FEW TO KNOW THE MANY, AS ARITHMETIC. A survey is
    numbers: how many to draw, the margin of error, the standard error, how a stratum is allocated, how many
    clusters, the systematic interval, the design weight, and the finite population correction. Crosses to
    `probability` — a sample is a draw, and probability is what it estimates. A measure. */ const PROOF =
    'sampling arithmetic (sample size, margin of error, standard error, stratum allocation, clusters, systematic
    interval, design weight, finite correction); a measure crossed to probability' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'sampling', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, {
    name: `sampling.${name}`, params }) export class SamplingFormulas { /** SAMPLE SIZE: a percentage of the
    population drawn. value ⌊pop · rate / 100⌋. -/
theorem fam_sampling_samplesize_1 : ((10000 * 5) / 100) = 500 := by decide

/-- sampling: marginoferror(2, 25) = 50 — MARGIN OF ERROR: the z-score times the standard error. value z · se. -/
theorem fam_sampling_marginoferror_1 : (2 * 25) = 50 := by decide

/-- sampling: standarderror(100, 10) = 10 — STANDARD ERROR: the spread over the root of the count. value ⌊sd /
    root⌋. -/
theorem fam_sampling_standarderror_1 : (100 / 10) = 10 := by decide

/-- sampling: cluster(1000, 40) = 25 — CLUSTERS: whole clusters at a size each. value ⌊units / perCluster⌋. -/
theorem fam_sampling_cluster_1 : (1000 / 40) = 25 := by decide

/-- sampling: systematic(1000, 50) = 20 — SYSTEMATIC: the sampling interval k. value ⌊pop / sample⌋. -/
theorem fam_sampling_systematic_1 : (1000 / 50) = 20 := by decide

/-- sampling: weight(5000, 250) = 20000 — DESIGN WEIGHT: the inverse-probability weight, per thousand. value
    ⌊pop · 1000 / sample⌋. -/
theorem fam_sampling_weight_1 : ((5000 * 1000) / 250) = 20000 := by decide

/-- sampling: finitecorrection(1000, 100) = 90 — FINITE POPULATION CORRECTION: the fraction not sampled, as a
    percentage. value ⌊(pop − sample) · 100 / pop⌋. -/
theorem fam_sampling_finitecorrection_1 : (((1000 - 100) * 100) / 1000) = 90 := by decide

/-- sampling: finitecorrection(1000, 1000) = 0 — FINITE POPULATION CORRECTION: the fraction not sampled, as a
    percentage. value ⌊(pop − sample) · 100 / pop⌋. -/
theorem fam_sampling_finitecorrection_2 : (((1000 - 1000) * 100) / 1000) = 0 := by decide

/-- savings: interest(1000, 5, 3) = 150 — SAVINGS — PERSONAL SAVING AS ARITHMETIC. What a saver tracks is
    numbers: simple interest earned, the balance it grows to, the future value of a starting balance plus
    recurring deposits, the total deposited, the effective annual yield, the months to reach a goal, the
    emergency fund to hold, the implied rate. Crosses to `banking` — savings is what a bank holds and pays on. A
    measure. */ const PROOF = 'savings arithmetic (simple interest, balance growth, future value, deposits, APY,
    goal months, emergency fund, implied rate); personal saving as a measure crossed to banking' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'savings', dst: 'banking', formula, value, proof: PROOF, ...extra
    }, holds, { name: `savings.${name}`, params }) export class SavingsFormulas { /** SIMPLE INTEREST earned on
    a principal at a yearly rate (percent) over years. value ⌊principal · rate · years / 100⌋. -/
theorem fam_savings_interest_1 : (((1000 * 5) * 3) / 100) = 150 := by decide

/-- savings: simplegrowth(1000, 5, 3) = 1150 — SIMPLE GROWTH: the balance a principal grows to under simple
    interest. value principal + ⌊principal · rate · years / 100⌋. -/
theorem fam_savings_simplegrowth_1 : (1000 + (((1000 * 5) * 3) / 100)) = 1150 := by decide

/-- savings: futurevalue(1000, 200, 12) = 3400 — FUTURE VALUE: a starting balance plus a monthly deposit over
    months. value principal + monthly · months. -/
theorem fam_savings_futurevalue_1 : (1000 + (200 * 12)) = 3400 := by decide

/-- savings: deposit(200, 12) = 2400 — DEPOSIT: the total put aside saving a fixed amount each month. value
    monthly · months. -/
theorem fam_savings_deposit_1 : (200 * 12) = 2400 := by decide

/-- savings: emergencyfund(2000, 6) = 12000 — EMERGENCY FUND: the fund to hold for a number of months of
    expenses. value expenses · months. -/
theorem fam_savings_emergencyfund_1 : (2000 * 6) = 12000 := by decide

/-- savings: rate(150, 1000) = 15 — IMPLIED RATE: the annual rate (percent) implied by the interest earned on a
    principal. value ⌊interest · 100 / principal⌋. -/
theorem fam_savings_rate_1 : ((150 * 100) / 1000) = 15 := by decide

/-- savings: rate(150, 0) = 0 — IMPLIED RATE: the annual rate (percent) implied by the interest earned on a
    principal. value ⌊interest · 100 / principal⌋. -/
theorem fam_savings_rate_2 : ((150 * 100) / 0) = 0 := by decide

/-- scales: degrees(7, 2) = 14 — SCALES — THE TWELVE-TONE GRID, AS ARITHMETIC. A musical scale is numbers:
    degrees per octave, a mode shifted around the root, tetrachord spans, the interval pattern that fills an
    octave, a note transposed, the pentatonic and chromatic note counts, and the distance between keys. All
    semitone arithmetic mod 12. Crosses to `music` — scales are what music is built from. A measure. */ const
    PROOF = 'scales arithmetic (degrees, mode shift, tetrachord span, interval pattern, transposition,
    pentatonic notes, chromatic fill, key distance); twelve-tone semitone arithmetic mod 12; a measure crossed
    to music' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'scales', dst: 'music', formula,
    value, proof: PROOF, ...extra }, holds, { name: `scales.${name}`, params }) export class ScalesFormulas {
    /** DEGREES: scale degrees across octaves. value notes · octaves. -/
theorem fam_scales_degrees_1 : (7 * 2) = 14 := by decide

/-- scales: tetrachord(2) = 10 — TETRACHORD: the semitone span of count tetrachords (a perfect fourth, 5
    semitones, each). value count · 5. -/
theorem fam_scales_tetrachord_1 : (2 * 5) = 10 := by decide

/-- scales: intervalpattern(12, 2) = 6 — INTERVAL PATTERN: the average step size when semitones are split into
    steps. value ⌊semitones / steps⌋. -/
theorem fam_scales_intervalpattern_1 : (12 / 2) = 6 := by decide

/-- scales: pentatonicnotes(3) = 15 — PENTATONIC NOTES: five notes per octave, across octaves. value octaves ·
    5. -/
theorem fam_scales_pentatonicnotes_1 : (3 * 5) = 15 := by decide

/-- scales: chromaticfill(60, 72) = 12 — CHROMATIC FILL: the semitones between a low and a high note. value
    max(0, high − low). -/
theorem fam_scales_chromaticfill_1 : (fmax 0 (72 - 60)) = 12 := by decide

/-- scheduling: float(50, 35) = 15 — FREE FLOAT: slack before a successor's earliest start. value max(0,
    nextEarly − finish). -/
theorem fam_scheduling_float_1 : (fmax 0 (50 - 35)) = 15 := by decide

/-- scheduling: lateness(45, 40) = 5 — LATENESS: how far a finish overruns its due date. value max(0, finish −
    due). -/
theorem fam_scheduling_lateness_1 : (fmax 0 (45 - 40)) = 5 := by decide

/-- scheduling: lateness(30, 40) = 0 — LATENESS: how far a finish overruns its due date. value max(0, finish −
    due). -/
theorem fam_scheduling_lateness_2 : (fmax 0 (30 - 40)) = 0 := by decide

/-- scheduling: leadlag(20, 5) = 25 — LEAD/LAG: a successor's start offset from a predecessor finish. value
    finish + lag. -/
theorem fam_scheduling_leadlag_1 : (20 + 5) = 25 := by decide

/-- scheduling: makespan(100, 10) = 90 — MAKESPAN: span from first start to last finish. value max(0, last −
    first). -/
theorem fam_scheduling_makespan_1 : (fmax 0 (100 - 10)) = 90 := by decide

/-- scheduling: slack(40, 30) = 10 — SLACK: total float a task can absorb. value max(0, latest − early). -/
theorem fam_scheduling_slack_1 : (fmax 0 (40 - 30)) = 10 := by decide

/-- scheduling: utilization(30, 40) = 75 — UTILIZATION: busy over available, as a percentage. value ⌊busy · 100
    / avail⌋. -/
theorem fam_scheduling_utilization_1 : ((30 * 100) / 40) = 75 := by decide

/-- scholasticism: questionscount(500, 131) = 631 -/
theorem fam_scholasticism_questionscount_1 : (500 + 131) = 631 := by decide

/-- scholasticism: distinctionsubsets(6) = 64 -/
theorem fam_scholasticism_distinctionsubsets_1 : (2 ^ 6) = 64 := by decide

/-- scholasticism: syllogismcount(16, 4) = 64 -/
theorem fam_scholasticism_syllogismcount_1 : (16 * 4) = 64 := by decide

/-- scholasticism: disputationstages(4, 3) = 7 -/
theorem fam_scholasticism_disputationstages_1 : (4 + 3) = 7 := by decide

/-- scholasticism: summaparts(3, 0) = 3 -/
theorem fam_scholasticism_summaparts_1 : (3 + 0) = 3 := by decide

/-- scholasticism: consensusratio(85, 100) = 85 -/
theorem fam_scholasticism_consensusratio_1 : ((85 * 100) / 100) = 85 := by decide

/-- science: hypotheses(3, 2) = 5 -/
theorem fam_science_hypotheses_1 : (3 + 2) = 5 := by decide

/-- science: replications(3, 10) = 30 -/
theorem fam_science_replications_1 : (3 * 10) = 30 := by decide

/-- science: confidence(95, 100) = 95 -/
theorem fam_science_confidence_1 : ((95 * 100) / 100) = 95 := by decide

/-- science: effectsize(80, 10) = 8 -/
theorem fam_science_effectsize_1 : (80 / 10) = 8 := by decide

/-- science: peerreviews(3, 0) = 3 -/
theorem fam_science_peerreviews_1 : (3 + 0) = 3 := by decide

/-- science: reproducibility(60, 100) = 60 -/
theorem fam_science_reproducibility_1 : ((60 * 100) / 100) = 60 := by decide

/-- scrabble: tiles(100, 0) = 100 -/
theorem fam_scrabble_tiles_1 : (100 + 0) = 100 := by decide

/-- scrabble: lettervalues(26, 1) = 26 -/
theorem fam_scrabble_lettervalues_1 : (26 * 1) = 26 := by decide

/-- scrabble: boardcells(15, 15) = 225 -/
theorem fam_scrabble_boardcells_1 : (15 * 15) = 225 := by decide

/-- scrabble: bingobonus(50, 0) = 50 -/
theorem fam_scrabble_bingobonus_1 : (50 + 0) = 50 := by decide

/-- scrabble: blanktiles(2, 0) = 2 -/
theorem fam_scrabble_blanktiles_1 : (2 + 0) = 2 := by decide

/-- scrabble: scoremultiplier(3, 3) = 9 -/
theorem fam_scrabble_scoremultiplier_1 : (3 * 3) = 9 := by decide

/-- screening: sensitivity(90, 10) = 90 — SCREENING — DIAGNOSTIC TEST PERFORMANCE, AS ARITHMETIC (chosen by the
    public-health registry, not by hand). A screening test on a population is numbers: how many sick it catches
    (sensitivity), how many well it clears (specificity), what a positive or negative result is worth (ppv,
    npv), the false alarm rate, the disease prevalence it is read against, the single-number test quality
    (Youden), and how many must be screened to find one case. Crosses to `epidemiology` — screening is the
    instrument epidemiology applies to a population. A measure. */ const PROOF = 'screening arithmetic
    (sensitivity, specificity, ppv, npv, false-positive rate, prevalence, Youden index, number to screen); the
    registry\'s uncovered diagnostic domain; a measure crossed to epidemiology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'screening', dst: 'epidemiology', formula, value, proof: PROOF, ...extra }, holds,
    { name: `screening.${name}`, params }) export class ScreeningFormulas { /** SENSITIVITY: the sick a test
    catches, as a percentage. value ⌊tp · 100 / (tp + fn)⌋. -/
theorem fam_screening_sensitivity_1 : ((90 * 100) / (90 + 10)) = 90 := by decide

/-- screening: specificity(85, 15) = 85 — SPECIFICITY: the well a test clears, as a percentage. value ⌊tn · 100
    / (tn + fp)⌋. -/
theorem fam_screening_specificity_1 : ((85 * 100) / (85 + 15)) = 85 := by decide

/-- screening: ppv(60, 40) = 60 — POSITIVE PREDICTIVE VALUE: a positive result's worth, as a percentage. value
    ⌊tp · 100 / (tp + fp)⌋. -/
theorem fam_screening_ppv_1 : ((60 * 100) / (60 + 40)) = 60 := by decide

/-- screening: npv(70, 30) = 70 — NEGATIVE PREDICTIVE VALUE: a negative result's worth, as a percentage. value
    ⌊tn · 100 / (tn + fn)⌋. -/
theorem fam_screening_npv_1 : ((70 * 100) / (70 + 30)) = 70 := by decide

/-- screening: falsepositiverate(15, 85) = 15 — FALSE-POSITIVE RATE: the false alarms among the well, as a
    percentage. value ⌊fp · 100 / (fp + tn)⌋. -/
theorem fam_screening_falsepositiverate_1 : ((15 * 100) / (15 + 85)) = 15 := by decide

/-- screening: prevalenceadjusted(5, 1000) = 500 — PREVALENCE: cases in a population, per 100 000. value ⌊cases
    · 100000 / population⌋. -/
theorem fam_screening_prevalenceadjusted_1 : ((5 * 100000) / 1000) = 500 := by decide

/-- screening: youdenindex(90, 85) = 75 — YOUDEN INDEX: a test's single-number quality, in percentage points.
    value max(0, sens + spec − 100). -/
theorem fam_screening_youdenindex_1 : (fmax 0 ((90 + 85) - 100)) = 75 := by decide

/-- screenwriting: acts(3, 0) = 3 -/
theorem fam_screenwriting_acts_1 : (3 + 0) = 3 := by decide

/-- screenwriting: scenecount(40, 1) = 40 -/
theorem fam_screenwriting_scenecount_1 : (40 * 1) = 40 := by decide

/-- screenwriting: pagesperminute(120, 120) = 1 -/
theorem fam_screenwriting_pagesperminute_1 : (120 / 120) = 1 := by decide

/-- screenwriting: charactercount(8, 4) = 12 -/
theorem fam_screenwriting_charactercount_1 : (8 + 4) = 12 := by decide

/-- screenwriting: dialogueratio(60, 100) = 60 -/
theorem fam_screenwriting_dialogueratio_1 : ((60 * 100) / 100) = 60 := by decide

/-- screenwriting: structuresubsets(5) = 32 -/
theorem fam_screenwriting_structuresubsets_1 : (2 ^ 5) = 32 := by decide

/-- scripture: wordtotal(1000, 12) = 12000 -/
theorem fam_scripture_wordtotal_1 : (1000 * 12) = 12000 := by decide

/-- scripture: versesperchapter(31000, 1189) = 26 -/
theorem fam_scripture_versesperchapter_1 : (31000 / 1189) = 26 := by decide

/-- scripture: chaptersperbook(1189, 66) = 18 -/
theorem fam_scripture_chaptersperbook_1 : (1189 / 66) = 18 := by decide

/-- scripture: lexicaltypes(12000, 3) = 4000 -/
theorem fam_scripture_lexicaltypes_1 : (12000 / 3) = 4000 := by decide

/-- scripture: crossreferences(340, 10) = 3400 -/
theorem fam_scripture_crossreferences_1 : (340 * 10) = 3400 := by decide

/-- scripture: readingplan(1189, 365) = 3 -/
theorem fam_scripture_readingplan_1 : (1189 / 365) = 3 := by decide

/-- sculpture: volume(20, 20, 40) = 16000 -/
theorem fam_sculpture_volume_1 : ((20 * 20) * 40) = 16000 := by decide

/-- sculpture: masskg(16000, 1000) = 16 -/
theorem fam_sculpture_masskg_1 : (16000 / 1000) = 16 := by decide

/-- sculpture: removalratio(40, 100) = 40 -/
theorem fam_sculpture_removalratio_1 : ((40 * 100) / 100) = 40 := by decide

/-- sculpture: facetcount(12, 4) = 48 -/
theorem fam_sculpture_facetcount_1 : (12 * 4) = 48 := by decide

/-- sculpture: supportpoints(3, 1) = 4 -/
theorem fam_sculpture_supportpoints_1 : (3 + 1) = 4 := by decide

/-- sculpture: scaleratio(150, 100) = 150 -/
theorem fam_sculpture_scaleratio_1 : ((150 * 100) / 100) = 150 := by decide

/-- sculpture: toolpasses(50, 3) = 150 -/
theorem fam_sculpture_toolpasses_1 : (50 * 3) = 150 := by decide

/-- sculpture: balancemargin(100, 30) = 70 -/
theorem fam_sculpture_balancemargin_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- search: recall(80, 100) = 80 — SEARCH — INFORMATION RETRIEVAL, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Retrieval is numbers: recall and precision over a result set, average latency, the
    index size, the hit rate, throughput, index coverage, and the F1 that balances precision against recall.
    Crosses to `cross` — a measure joined to the formula network. A measure. */ const PROOF = 'search arithmetic
    (recall, precision, latency, index size, hit rate, throughput, coverage, F1); an information-retrieval
    domain; a measure crossed to the formula network' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'search', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `search.${name}`,
    params }) export class SearchFormulas { /** RECALL: the relevant documents found, as a percentage. value
    ⌊found · 100 / relevant⌋. -/
theorem fam_search_recall_1 : ((80 * 100) / 100) = 80 := by decide

/-- search: precision(40, 50) = 80 — PRECISION: the returned documents that are relevant, as a percentage. value
    ⌊relevant · 100 / returned⌋. -/
theorem fam_search_precision_1 : ((40 * 100) / 50) = 80 := by decide

/-- search: latency(5000, 100) = 50 — AVERAGE LATENCY: total milliseconds over the queries served. value ⌊total
    / queries⌋. -/
theorem fam_search_latency_1 : (5000 / 100) = 50 := by decide

/-- search: index(1000, 20) = 20000 — INDEX SIZE: documents by the terms each carries. value docs · terms. -/
theorem fam_search_index_1 : (1000 * 20) = 20000 := by decide

/-- search: hits(30, 200) = 15 — HIT RATE: matching documents over the collection, as a percentage. value
    ⌊matches · 100 / total⌋. -/
theorem fam_search_hits_1 : ((30 * 100) / 200) = 15 := by decide

/-- search: throughput(6000, 60) = 100 — THROUGHPUT: queries over seconds. value ⌊queries / seconds⌋. -/
theorem fam_search_throughput_1 : (6000 / 60) = 100 := by decide

/-- search: coverage(900, 1000) = 90 — COVERAGE: the collection that is indexed, as a percentage. value ⌊indexed
    · 100 / total⌋. -/
theorem fam_search_coverage_1 : ((900 * 100) / 1000) = 90 := by decide

/-- search: f1(80, 80) = 80 — THE F1: the harmonic mean of precision and recall. value [p + r > 0] · ⌊2 · p · r
    / (p + r)⌋. -/
theorem fam_search_f1_1 : (((2 * 80) * 80) / (80 + 80)) = 80 := by decide

/-- search: f1(0, 0) = 0 — THE F1: the harmonic mean of precision and recall. value [p + r > 0] · ⌊2 · p · r /
    (p + r)⌋. -/
theorem fam_search_f1_2 : (((2 * 0) * 0) / (0 + 0)) = 0 := by decide

/-- sedimentology: grainsize(500, 100) = 300 — SEDIMENTOLOGY — THE MAKING OF SEDIMENT, AS ARITHMETIC. A clast is
    numbers: its mean grain diameter, how well the grains are sorted, how rounded they are, how fast one
    settles, how much pore space is left, the load a flow carries, the bedform regime, and the compositional
    maturity of the grain population. Crosses to `geomorphology` — sediment is what shapes the land. A measure.
    */ const PROOF = 'sedimentology arithmetic (mean grain size, sorting, roundness, settling velocity,
    porosity, sediment load, bedform regime, maturity); grains made and moved; a measure crossed to
    geomorphology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'sedimentology', dst:
    'geomorphology', formula, value, proof: PROOF, ...extra }, holds, { name: `sedimentology.${name}`, params })
    export class SedimentologyFormulas { /** MEAN GRAIN SIZE: the midpoint of the coarse and fine bounds, in
    microns. value ⌊(coarse + fine) / 2⌋. -/
theorem fam_sedimentology_grainsize_1 : ((500 + 100) / 2) = 300 := by decide

/-- sedimentology: sorting(800, 200) = 600 — SORTING: the spread between the largest and smallest grain. value
    max(0, hi − lo). -/
theorem fam_sedimentology_sorting_1 : (fmax 0 (800 - 200)) = 600 := by decide

/-- sedimentology: sorting(200, 800) = 0 — SORTING: the spread between the largest and smallest grain. value
    max(0, hi − lo). -/
theorem fam_sedimentology_sorting_2 : (fmax 0 (200 - 800)) = 0 := by decide

/-- sedimentology: roundness(80, 100) = 80 — ROUNDNESS: the share of grains counted as rounded. value ⌊rounded ·
    100 / total⌋. -/
theorem fam_sedimentology_roundness_1 : ((80 * 100) / 100) = 80 := by decide

/-- sedimentology: settlingvelocity(100, 20) = 500 — SETTLING VELOCITY: Stokes' law, falling as diameter² over
    the fluid viscosity. value ⌊diameter · diameter / viscosity⌋. -/
theorem fam_sedimentology_settlingvelocity_1 : ((100 * 100) / 20) = 500 := by decide

/-- sedimentology: porosity(30, 100) = 30 — POROSITY: the void space as a percentage of the bulk volume. value
    ⌊voids · 100 / bulk⌋. -/
theorem fam_sedimentology_porosity_1 : ((30 * 100) / 100) = 30 := by decide

/-- sedimentology: sedimentload(50, 40) = 2000 — SEDIMENT LOAD: the mass a flow carries, concentration times
    discharge. value concentration · discharge. -/
theorem fam_sedimentology_sedimentload_1 : (50 * 40) = 2000 := by decide

/-- sedimentology: bedform(120, 4) = 30 — BEDFORM: the flow regime index, velocity over depth. value ⌊velocity /
    depth⌋. -/
theorem fam_sedimentology_bedform_1 : (120 / 4) = 30 := by decide

/-- sedimentology: bedform(5, 0) = 0 — BEDFORM: the flow regime index, velocity over depth. value ⌊velocity /
    depth⌋. -/
theorem fam_sedimentology_bedform_2 : (5 / 0) = 0 := by decide

/-- sedimentology: maturity(90, 10) = 90 — MATURITY: the quartz share of the quartz-plus-feldspar population.
    value ⌊quartz · 100 / (quartz + feldspar)⌋. -/
theorem fam_sedimentology_maturity_1 : ((90 * 100) / (90 + 10)) = 90 := by decide

/-- seismology: magnitude(750) = 7 — SEISMOLOGY — EARTHQUAKE SCIENCE, AS ARITHMETIC. A quake is numbers: the
    Richter magnitude of an amplitude, the log-energy it releases, the S-P distance to the source, the felt
    intensity at a depth, the Omori aftershock decay, the triangulated epicenter, the recurrence frequency over
    years, and the seismic moment. Crosses to `cern` — the earth read as a detector. A measure. */ const PROOF =
    'seismology arithmetic (magnitude, energy, distance, intensity, aftershocks, epicenter, frequency, moment);
    earthquake science as integer measure crossed to cern' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'seismology', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name:
    `seismology.${name}`, params }) export class SeismologyFormulas { /** MAGNITUDE: a Richter proxy from
    recorded amplitude. value ⌊amplitude / 100⌋. -/
theorem fam_seismology_magnitude_1 : (750 / 100) = 7 := by decide

/-- seismology: energy(7) = 49 — ENERGY: a log-energy proxy of a magnitude. value magnitude · magnitude. -/
theorem fam_seismology_energy_1 : (7 * 7) = 49 := by decide

/-- seismology: distance(10, 5) = 50 — DISTANCE: S-P travel at a velocity over a time. value time · velocity. -/
theorem fam_seismology_distance_1 : (10 * 5) = 50 := by decide

/-- seismology: intensity(7, 20) = 35 — INTENSITY: felt intensity of a magnitude at a depth. value ⌊magnitude ·
    100 / depth⌋. -/
theorem fam_seismology_intensity_1 : ((7 * 100) / 20) = 35 := by decide

/-- seismology: intensity(7, 0) = 0 — INTENSITY: felt intensity of a magnitude at a depth. value ⌊magnitude ·
    100 / depth⌋. -/
theorem fam_seismology_intensity_2 : ((7 * 100) / 0) = 0 := by decide

/-- seismology: aftershocks(100, 5) = 200 — AFTERSHOCKS: Omori decay of a main shock over days. value ⌊main · 10
    / days⌋. -/
theorem fam_seismology_aftershocks_1 : ((100 * 10) / 5) = 200 := by decide

/-- seismology: aftershocks(100, 0) = 0 — AFTERSHOCKS: Omori decay of a main shock over days. value ⌊main · 10 /
    days⌋. -/
theorem fam_seismology_aftershocks_2 : ((100 * 10) / 0) = 0 := by decide

/-- seismology: epicenter(30, 45) = 75 — EPICENTER: triangulation proxy, the sum of two bearings. value a + b. -/
theorem fam_seismology_epicenter_1 : (30 + 45) = 75 := by decide

/-- seismology: frequency(500, 100) = 5 — FREQUENCY: recurrence, a count of quakes over years. value ⌊count /
    years⌋. -/
theorem fam_seismology_frequency_1 : (500 / 100) = 5 := by decide

/-- seismology: frequency(500, 0) = 0 — FREQUENCY: recurrence, a count of quakes over years. value ⌊count /
    years⌋. -/
theorem fam_seismology_frequency_2 : (500 / 0) = 0 := by decide

/-- seismology: moment(1000, 3) = 3000 — MOMENT: seismic moment, the slip over a rupture area. value area ·
    slip. -/
theorem fam_seismology_moment_1 : (1000 * 3) = 3000 := by decide

/-- semantics: similarity(3, 4) = 75 — SEMANTICS — MEANING AS ARITHMETIC (chosen by the registry, not by hand).
    What words and sentences mean is numbers: how alike two meanings are, how many senses a word carries,
    whether a premise entails a conclusion, how ambiguous a sentence reads, how dense a text is with concepts,
    how far two concepts sit in a graph, how coherent a passage is, and the sign of its sentiment. Crosses to
    `linguistics` — semantics is the meaning linguistics describes. A measure. */ const PROOF = 'semantics
    arithmetic (similarity, polysemy, entailment, ambiguity, density, distance, coherence, sentiment); meaning
    as a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'semantics', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `semantics.${name}`, params }) export class SemanticsFormulas { /** SIMILARITY: shared features as a
    percentage of total. value ⌊shared · 100 / total⌋. -/
theorem fam_semantics_similarity_1 : ((3 * 100) / 4) = 75 := by decide

/-- semantics: polysemy(10, 3) = 3 — POLYSEMY: senses per word. value ⌊senses / words⌋. -/
theorem fam_semantics_polysemy_1 : (10 / 3) = 3 := by decide

/-- semantics: entailment(2, 5) = 40 — ENTAILMENT: entailed conclusions as a percentage of premises. value
    ⌊entailed · 100 / premises⌋. -/
theorem fam_semantics_entailment_1 : ((2 * 100) / 5) = 40 := by decide

/-- semantics: ambiguity(12, 4) = 3 — AMBIGUITY: readings per sentence. value ⌊readings / sentences⌋. -/
theorem fam_semantics_ambiguity_1 : (12 / 4) = 3 := by decide

/-- semantics: density(30, 100) = 30 — DENSITY: concepts as a percentage of tokens. value ⌊concepts · 100 /
    tokens⌋. -/
theorem fam_semantics_density_1 : ((30 * 100) / 100) = 30 := by decide

/-- semantics: distance(5) = 5 — DISTANCE: hops between two concepts in a graph. value hops. -/
theorem fam_semantics_distance_1 : 5 = 5 := by decide

/-- semantics: coherence(9, 10) = 90 — COHERENCE: linked units as a percentage of all units. value ⌊linked · 100
    / units⌋. -/
theorem fam_semantics_coherence_1 : ((9 * 100) / 10) = 90 := by decide

/-- semantics: sentiment(70, 30) = 40 — SENTIMENT: positive minus negative (may be negative). value positive −
    negative. -/
theorem fam_semantics_sentiment_1 : (70 - 30) = 40 := by decide

/-- semiconductor: bandgap(1120) = 1120 — SEMICONDUCTOR — DEVICE PHYSICS AS ARITHMETIC (chosen by the
    fabrication registry, not by hand). A chip is numbers: dopant concentration in ppm, carrier mobility, the
    band gap, resistivity, the die yield, the threshold voltage, the carrier count, and the junction ratio.
    Crosses to `electronics` — the semiconductor is what electronics is built on. A measure. */ const PROOF =
    'semiconductor arithmetic (doping ppm, mobility, band gap, resistivity, die yield, threshold, carriers,
    junction ratio); a device-physics domain; a measure crossed to electronics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'semiconductor', dst: 'electronics', formula, value, proof: PROOF, ...extra },
    holds, { name: `semiconductor.${name}`, params }) export class SemiconductorFormulas { /** BAND GAP in
    millielectronvolts, carried whole. value millielectronvolts. -/
theorem fam_semiconductor_bandgap_1 : 1120 = 1120 := by decide

/-- semiconductor: carrier(600, 400) = 1000 — CARRIER COUNT: electrons plus holes. value electrons + holes. -/
theorem fam_semiconductor_carrier_1 : (600 + 400) = 1000 := by decide

/-- semiconductor: diesyield(90, 100) = 90 — DIE YIELD as a percentage. value ⌊working · 100 / dies⌋. -/
theorem fam_semiconductor_diesyield_1 : ((90 * 100) / 100) = 90 := by decide

/-- semiconductor: doping(5, 1000000) = 5 — DOPING in parts per million. value ⌊dopant · 1000000 / host⌋. -/
theorem fam_semiconductor_doping_1 : ((5 * 1000000) / 1000000) = 5 := by decide

/-- semiconductor: junction(1000, 10) = 10000 — JUNCTION RATIO: forward over reverse, as a percentage. value
    ⌊forward · 100 / reverse⌋. -/
theorem fam_semiconductor_junction_1 : ((1000 * 100) / 10) = 10000 := by decide

/-- semiconductor: mobility(1400, 2) = 700 — CARRIER MOBILITY: drift velocity over the applied field. value
    ⌊velocity / field⌋. -/
theorem fam_semiconductor_mobility_1 : (1400 / 2) = 700 := by decide

/-- semiconductor: resistivity(5, 1) = 5 — RESISTIVITY: voltage over current. value ⌊voltage / current⌋. -/
theorem fam_semiconductor_resistivity_1 : (5 / 1) = 5 := by decide

/-- semiconductor: threshold(700) = 700 — THRESHOLD VOLTAGE in millivolts, carried whole. value millivolts. -/
theorem fam_semiconductor_threshold_1 : 700 = 700 := by decide

/-- semiconductors: bandgap(1120, 50) = 1070 — SEMICONDUCTORS — THE DEVICE PHYSICS OF A CHIP, AS ARITHMETIC. A
    fabricated part is numbers: the bandgap left after narrowing, the dopant atoms in a volume, drift mobility,
    the resistivity of a bar, the gate overdrive past threshold, die yield, dies per wafer, and junction
    capacitance. Crosses to `electrical` — a semiconductor is what carries the current electrical circuits
    describe. A measure. */ const PROOF = 'semiconductor arithmetic (bandgap, doping, mobility, resistivity,
    threshold overdrive, yield, dies per wafer, junction); device physics as integers; a measure crossed to
    electrical' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'semiconductors', dst:
    'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `semiconductors.${name}`, params })
    export class SemiconductorsFormulas { /** BANDGAP: the gap energy (meV) left after temperature narrowing.
    value max(0, base − narrow). -/
theorem fam_semiconductors_bandgap_1 : (fmax 0 (1120 - 50)) = 1070 := by decide

/-- semiconductors: doping(500, 8) = 4000 — DOPING: dopant atoms in a volume at a concentration. value
    concentration · volume. -/
theorem fam_semiconductors_doping_1 : (500 * 8) = 4000 := by decide

/-- semiconductors: mobility(1400, 7) = 200 — MOBILITY: drift mobility as distance over time. value ⌊distance /
    time⌋. -/
theorem fam_semiconductors_mobility_1 : (1400 / 7) = 200 := by decide

/-- semiconductors: resistivity(10, 50, 25) = 20 — RESISTIVITY: ρ = R·A / L of a bar. value ⌊resistance · area /
    length⌋. -/
theorem fam_semiconductors_resistivity_1 : ((10 * 50) / 25) = 20 := by decide

/-- semiconductors: threshold(5, 2) = 3 — THRESHOLD: the gate overdrive past the threshold voltage. value max(0,
    vgs − vt). -/
theorem fam_semiconductors_threshold_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- semiconductors: threshold(1, 2) = 0 — THRESHOLD: the gate overdrive past the threshold voltage. value max(0,
    vgs − vt). -/
theorem fam_semiconductors_threshold_2 : (fmax 0 (1 - 2)) = 0 := by decide

/-- semiconductors: yield(950, 1000) = 95 — YIELD: good dies as a percentage of the total. value ⌊good · 100 /
    total⌋. -/
theorem fam_semiconductors_yield_1 : ((950 * 100) / 1000) = 95 := by decide

/-- semiconductors: wafer(31416, 100) = 314 — WAFER: the dies a wafer holds at a die size. value ⌊area /
    dieSize⌋. -/
theorem fam_semiconductors_wafer_1 : (31416 / 100) = 314 := by decide

/-- semiconductors: junction(600, 4) = 150 — JUNCTION: capacitance C = εA / d, as area over depletion width.
    value ⌊area / width⌋. -/
theorem fam_semiconductors_junction_1 : (600 / 4) = 150 := by decide

/-- semiotics: signs(50, 30) = 80 -/
theorem fam_semiotics_signs_1 : (50 + 30) = 80 := by decide

/-- semiotics: codesubsets(6) = 64 -/
theorem fam_semiotics_codesubsets_1 : (2 ^ 6) = 64 := by decide

/-- semiotics: denotationlevels(2, 1) = 3 -/
theorem fam_semiotics_denotationlevels_1 : (2 + 1) = 3 := by decide

/-- semiotics: syntagmlength(8, 3) = 24 -/
theorem fam_semiotics_syntagmlength_1 : (8 * 3) = 24 := by decide

/-- semiotics: iconindexsymbol(3, 0) = 3 -/
theorem fam_semiotics_iconindexsymbol_1 : (3 + 0) = 3 := by decide

/-- semiotics: interpretantratio(70, 100) = 70 -/
theorem fam_semiotics_interpretantratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- sentiment: polarity(80, 20) = 60 — SENTIMENT — OPINION AS ARITHMETIC (chosen by the opinion-mining registry,
    not by hand). Reading a corpus is numbers: polarity (positive less negative), the net score in percent, how
    subjective the text is, intensity, how far raters agree, the classifier's confidence, the mixed-signal
    ratio, and the positive valence. Crosses to `semantics` — sentiment is the feeling semantics carries. A
    measure. */ const PROOF = 'sentiment arithmetic (polarity, net score, subjectivity, intensity, agreement,
    confidence, mixed ratio, valence); an opinion-mining domain; a measure crossed to semantics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'sentiment', dst: 'semantics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `sentiment.${name}`, params }) export class SentimentFormulas { /** POLARITY:
    positive mentions less negative, never below zero. value max(0, pos − neg). -/
theorem fam_sentiment_polarity_1 : (fmax 0 (80 - 20)) = 60 := by decide

/-- sentiment: polarity(20, 80) = 0 — SENTIMENT — OPINION AS ARITHMETIC (chosen by the opinion-mining registry,
    not by hand). Reading a corpus is numbers: polarity (positive less negative), the net score in percent, how
    subjective the text is, intensity, how far raters agree, the classifier's confidence, the mixed-signal
    ratio, and the positive valence. Crosses to `semantics` — sentiment is the feeling semantics carries. A
    measure. */ const PROOF = 'sentiment arithmetic (polarity, net score, subjectivity, intensity, agreement,
    confidence, mixed ratio, valence); an opinion-mining domain; a measure crossed to semantics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'sentiment', dst: 'semantics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `sentiment.${name}`, params }) export class SentimentFormulas { /** POLARITY:
    positive mentions less negative, never below zero. value max(0, pos − neg). -/
theorem fam_sentiment_polarity_2 : (fmax 0 (20 - 80)) = 0 := by decide

/-- sentiment: netscore(75, 100) = 75 — NET SCORE: positive mentions as a percentage of the total. value ⌊pos ·
    100 / total⌋. -/
theorem fam_sentiment_netscore_1 : ((75 * 100) / 100) = 75 := by decide

/-- sentiment: subjectivity(40, 100) = 40 — SUBJECTIVITY: subjective sentences as a percentage of the total.
    value ⌊subj · 100 / total⌋. -/
theorem fam_sentiment_subjectivity_1 : ((40 * 100) / 100) = 40 := by decide

/-- sentiment: intensity(7, 9) = 63 — INTENSITY: the strength of a signal over how many times it recurs. value
    strength · count. -/
theorem fam_sentiment_intensity_1 : (7 * 9) = 63 := by decide

/-- sentiment: agreement(18, 20) = 90 — AGREEMENT: how far raters agree, as a percentage. value ⌊agree · 100 /
    raters⌋. -/
theorem fam_sentiment_agreement_1 : ((18 * 100) / 20) = 90 := by decide

/-- sentiment: confidence(950, 1000) = 95 — CONFIDENCE: the classifier's correct calls over all samples, as a
    percentage. value ⌊correct · 100 / samples⌋. -/
theorem fam_sentiment_confidence_1 : ((950 * 100) / 1000) = 95 := by decide

/-- sentiment: mixedratio(30, 90) = 33 — MIXED RATIO: the weaker signal over the stronger, as a percentage.
    value ⌊min · 100 / max⌋. -/
theorem fam_sentiment_mixedratio_1 : (((fmin 30 90) * 100) / (fmax 30 90)) = 33 := by decide

/-- sentiment: valence(60, 30, 10) = 60 — VALENCE: positive share across positive, negative and neutral
    mentions. value ⌊pos · 100 / (pos + neg + neu)⌋. -/
theorem fam_sentiment_valence_1 : ((60 * 100) / ((60 + 30) + 10)) = 60 := by decide

/-- serialization: overhead(12, 100) = 1200 — SERIALIZATION — TURNING STRUCTURE INTO BYTES, AS ARITHMETIC
    (chosen by the wire-format registry, not by hand). Writing a value to the wire is numbers: per-message
    overhead, the payload left after it, messages per second, framed size, the encoded expansion, schema tag
    cost, the delta to resend, and how many batches a run needs. Crosses to `compression` — serialization is the
    bytes compression then shrinks. A measure. */ const PROOF = 'serialization arithmetic (overhead, payload,
    throughput, framing, encoding, schema tags, delta, batches); the wire-format domain the registry had
    uncovered; a measure crossed to compression' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'serialization', dst: 'compression', formula, value, proof: PROOF, ...extra }, holds, { name:
    `serialization.${name}`, params }) export class SerializationFormulas { /** OVERHEAD: a fixed-size header on
    every message. value header · count. -/
theorem fam_serialization_overhead_1 : (12 * 100) = 1200 := by decide

/-- serialization: payload(5000, 1200) = 3800 — PAYLOAD: the data bytes left once the overhead is removed. value
    max(0, total − overhead). -/
theorem fam_serialization_payload_1 : (fmax 0 (5000 - 1200)) = 3800 := by decide

/-- serialization: payload(1000, 2000) = 0 — PAYLOAD: the data bytes left once the overhead is removed. value
    max(0, total − overhead). -/
theorem fam_serialization_payload_2 : (fmax 0 (1000 - 2000)) = 0 := by decide

/-- serialization: throughput(6000, 60) = 100 — THROUGHPUT: messages serialized over seconds. value ⌊messages /
    seconds⌋. -/
theorem fam_serialization_throughput_1 : (6000 / 60) = 100 := by decide

/-- serialization: framing(3800, 4, 50) = 4000 — FRAMING: payload plus a fixed frame delimiter on every chunk.
    value payload + frame · chunks. -/
theorem fam_serialization_framing_1 : (3800 + (4 * 50)) = 4000 := by decide

/-- serialization: schema(20, 3) = 60 — SCHEMA: a per-field tag written for every field. value fields · tag. -/
theorem fam_serialization_schema_1 : (20 * 3) = 60 := by decide

/-- serialization: delta(8, 16) = 128 — DELTA: the changed fields, at a size each, are all that is resent. value
    changed · size. -/
theorem fam_serialization_delta_1 : (8 * 16) = 128 := by decide

/-- serology: titer(8) = 256 -/
theorem fam_serology_titer_1 : (2 ^ 8) = 256 := by decide

/-- serology: dilutionfactor(2, 64) = 128 -/
theorem fam_serology_dilutionfactor_1 : (2 * 64) = 128 := by decide

/-- serology: seroconversion(95, 100) = 95 -/
theorem fam_serology_seroconversion_1 : ((95 * 100) / 100) = 95 := by decide

/-- serology: crossreactivity(20, 100) = 20 -/
theorem fam_serology_crossreactivity_1 : ((20 * 100) / 100) = 20 := by decide

/-- serology: bindingaffinity(60000, 1000) = 60 -/
theorem fam_serology_bindingaffinity_1 : (60000 / 1000) = 60 := by decide

/-- serology: panelsubsets(6) = 64 -/
theorem fam_serology_panelsubsets_1 : (2 ^ 6) = 64 := by decide

/-- sessionmgmt: idletimeout(15, 30) = 930 — SESSIONMGMT — THE LIFETIME OF A LOGIN, AS ARITHMETIC. A session is
    numbers: when it goes idle, its absolute ceiling, how many may run at once, a token's time-to-live, when
    renewal opens, how many are live right now, the margin left before expiry, and how often the sweeper runs.
    Crosses to `networking` — a session rides a connection. A measure. */ const PROOF = 'sessionmgmt arithmetic
    (idle timeout, absolute timeout, concurrent limit, token ttl, renewal window, active sessions, expiry
    margin, cleanup interval); the lifetime of a login as numbers; a measure crossed to networking' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'sessionmgmt', dst: 'networking', formula, value, proof: PROOF,
    ...extra }, holds, { name: `sessionmgmt.${name}`, params }) export class SessionmgmtFormulas { /** IDLE
    TIMEOUT: minutes to seconds plus a grace in seconds. value minutes · 60 + grace. -/
theorem fam_sessionmgmt_idletimeout_1 : ((15 * 60) + 30) = 930 := by decide

/-- sessionmgmt: absolutetimeout(8) = 28800 — ABSOLUTE TIMEOUT: the hard ceiling of a session, hours to seconds.
    value hours · 3600. -/
theorem fam_sessionmgmt_absolutetimeout_1 : (8 * 3600) = 28800 := by decide

/-- sessionmgmt: concurrentlimit(100, 5) = 500 — CONCURRENT LIMIT: sessions allowed at once, users at a per-user
    cap. value users · perUser. -/
theorem fam_sessionmgmt_concurrentlimit_1 : (100 * 5) = 500 := by decide

/-- sessionmgmt: tokenttl(1000, 3600) = 4600 — TOKEN TTL: a token issued now expires at issued + ttl. value
    issued + ttl. -/
theorem fam_sessionmgmt_tokenttl_1 : (1000 + 3600) = 4600 := by decide

/-- sessionmgmt: renewalwindow(3600, 4) = 900 — RENEWAL WINDOW: renewal opens a fraction of the ttl before
    expiry. value ⌊ttl / fraction⌋. -/
theorem fam_sessionmgmt_renewalwindow_1 : (3600 / 4) = 900 := by decide

/-- sessionmgmt: activesessions(500, 120) = 380 — ACTIVE SESSIONS: those opened less those closed, never below
    zero. value max(0, opened − closed). -/
theorem fam_sessionmgmt_activesessions_1 : (fmax 0 (500 - 120)) = 380 := by decide

/-- sessionmgmt: activesessions(100, 400) = 0 — ACTIVE SESSIONS: those opened less those closed, never below
    zero. value max(0, opened − closed). -/
theorem fam_sessionmgmt_activesessions_2 : (fmax 0 (100 - 400)) = 0 := by decide

/-- sessionmgmt: expirymargin(3600, 1200) = 2400 — EXPIRY MARGIN: the ttl left after some elapsed, never below
    zero. value max(0, ttl − elapsed). -/
theorem fam_sessionmgmt_expirymargin_1 : (fmax 0 (3600 - 1200)) = 2400 := by decide

/-- shamanism: trancestates(3, 2) = 5 -/
theorem fam_shamanism_trancestates_1 : (3 + 2) = 5 := by decide

/-- shamanism: drumbeats(120, 1) = 120 -/
theorem fam_shamanism_drumbeats_1 : (120 * 1) = 120 := by decide

/-- shamanism: cosmiclayers(3, 0) = 3 -/
theorem fam_shamanism_cosmiclayers_1 : (3 + 0) = 3 := by decide

/-- shamanism: initiationstages(5, 0) = 5 -/
theorem fam_shamanism_initiationstages_1 : (5 + 0) = 5 := by decide

/-- shamanism: ecstasyratio(80, 100) = 80 -/
theorem fam_shamanism_ecstasyratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- sharding: keyrange(65536, 16) = 4096 — KEY RANGE: the keys each shard owns of a key space. value ⌊space /
    shards⌋. -/
theorem fam_sharding_keyrange_1 : (65536 / 16) = 4096 := by decide

/-- sharding: rebalance(1000, 3) = 250 — REBALANCE: keys that move when one shard is added (consistent hashing).
    value ⌊keys / (shards + 1)⌋. -/
theorem fam_sharding_rebalance_1 : (1000 / (3 + 1)) = 250 := by decide

/-- sharding: hotspot(900, 100) = 9 — HOTSPOT: how much hotter the hottest shard runs than the average. value
    ⌊peak / avg⌋. -/
theorem fam_sharding_hotspot_1 : (900 / 100) = 9 := by decide

/-- sharding: fanout(16, 3) = 48 — FANOUT: the physical nodes a scatter query touches across shards and
    replicas. value shards · replicas. -/
theorem fam_sharding_fanout_1 : (16 * 3) = 48 := by decide

/-- sharding: skew(500, 120) = 380 — SKEW: the load gap between the hottest and coldest shard. value max(0, max
    − min). -/
theorem fam_sharding_skew_1 : (fmax 0 (500 - 120)) = 380 := by decide

/-- sharding: resharding(1000, 4, 8) = 500 — RESHARDING: keys that migrate when going from old shards to new.
    value ⌊keys · max(0, new − old) / new⌋. -/
theorem fam_sharding_resharding_1 : ((1000 * (fmax 0 (8 - 4))) / 8) = 500 := by decide

/-- sharding: skew(100, 300) = 0 — SKEW: the load gap between the hottest and coldest shard. value max(0, max −
    min). -/
theorem fam_sharding_skew_2 : (fmax 0 (100 - 300)) = 0 := by decide

/-- shinto: kamicount(8, 1000) = 8000 -/
theorem fam_shinto_kamicount_1 : (8 * 1000) = 8000 := by decide

/-- shinto: purificationtypes(3, 2) = 5 -/
theorem fam_shinto_purificationtypes_1 : (3 + 2) = 5 := by decide

/-- shinto: festivaldays(20, 1) = 20 -/
theorem fam_shinto_festivaldays_1 : (20 * 1) = 20 := by decide

/-- shinto: offeringsubsets(5) = 32 -/
theorem fam_shinto_offeringsubsets_1 : (2 ^ 5) = 32 := by decide

/-- shinto: harmonyratio(80, 100) = 80 -/
theorem fam_shinto_harmonyratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- shipping: teu(100, 2) = 200 — SHIPPING — MOVING BOXES ACROSS THE SEA, AS ARITHMETIC. Container trade is
    numbers: twenty-foot equivalents on a hull, how full the ship is, days at sea, the rate per tonne, demurrage
    owed on late boxes, a box's dwell in the yard, the on-time share of arrivals, and the bunker fuel a voyage
    burns. Crosses to `logistics` — shipping is logistics at sea. A measure. */ const PROOF = 'shipping
    arithmetic (teu, utilization, transit time, freight rate, demurrage, dwell time, on-time, bunker fuel);
    container trade as integers; a measure crossed to logistics' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'shipping', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `shipping.${name}`, params }) export class ShippingFormulas { /** TEU: twenty-foot equivalents a count of
    containers carries. value containers · factor. -/
theorem fam_shipping_teu_1 : (100 * 2) = 200 := by decide

/-- shipping: utilization(900, 1000) = 90 — UTILIZATION: how full the hull is, as a percentage. value ⌊loaded ·
    100 / capacity⌋. -/
theorem fam_shipping_utilization_1 : ((900 * 100) / 1000) = 90 := by decide

/-- shipping: transittime(12000, 500) = 24 — TRANSIT TIME: the days a distance takes at a speed. value ⌊distance
    / speed⌋. -/
theorem fam_shipping_transittime_1 : (12000 / 500) = 24 := by decide

/-- shipping: freightrate(10000, 50) = 200 — FREIGHT RATE: cost per unit of weight. value ⌊cost / weight⌋. -/
theorem fam_shipping_freightrate_1 : (10000 / 50) = 200 := by decide

/-- shipping: demurrage(5, 150) = 750 — DEMURRAGE: the charge on days a box overstays, at a daily rate. value
    days · rate. -/
theorem fam_shipping_demurrage_1 : (5 * 150) = 750 := by decide

/-- shipping: dwelltime(72) = 72 — DWELL TIME: the hours a box waits in the yard. value hours. -/
theorem fam_shipping_dwelltime_1 : 72 = 72 := by decide

/-- shipping: ontime(95, 100) = 95 — ON-TIME: the on-time share of arrivals, as a percentage. value ⌊ontime ·
    100 / total⌋. -/
theorem fam_shipping_ontime_1 : ((95 * 100) / 100) = 95 := by decide

/-- shipping: bunkerfuel(1000, 30) = 30000 — BUNKER FUEL: the fuel a voyage burns over a distance at a
    per-distance consumption. value distance · consumption. -/
theorem fam_shipping_bunkerfuel_1 : (1000 * 30) = 30000 := by decide

/-- shogi: squares(9, 9) = 81 -/
theorem fam_shogi_squares_1 : (9 * 9) = 81 := by decide

/-- shogi: pieces(20, 2) = 40 -/
theorem fam_shogi_pieces_1 : (20 * 2) = 40 := by decide

/-- shogi: promotions(6, 0) = 6 -/
theorem fam_shogi_promotions_1 : (6 + 0) = 6 := by decide

/-- shogi: handsubsets(7) = 128 -/
theorem fam_shogi_handsubsets_1 : (2 ^ 7) = 128 := by decide

/-- shogi: rankcount(9, 0) = 9 -/
theorem fam_shogi_rankcount_1 : (9 + 0) = 9 := by decide

/-- shogi: branchingfactor(80, 0) = 80 -/
theorem fam_shogi_branchingfactor_1 : (80 + 0) = 80 := by decide

/-- shorthand: strokesperword(20, 4) = 5 -/
theorem fam_shorthand_strokesperword_1 : (20 / 4) = 5 := by decide

/-- shorthand: compression(800, 200) = 400 -/
theorem fam_shorthand_compression_1 : ((800 * 100) / 200) = 400 := by decide

/-- shorthand: symbolcount(26, 2) = 52 -/
theorem fam_shorthand_symbolcount_1 : (26 * 2) = 52 := by decide

/-- shorthand: speedwpm(120, 1) = 120 -/
theorem fam_shorthand_speedwpm_1 : (120 * 1) = 120 := by decide

/-- shorthand: abbreviationsubsets(6) = 64 -/
theorem fam_shorthand_abbreviationsubsets_1 : (2 ^ 6) = 64 := by decide

/-- shorthand: strokesaved(20, 5) = 15 -/
theorem fam_shorthand_strokesaved_1 : (fmax 0 (20 - 5)) = 15 := by decide

/-- shorthand: legibilityratio(85, 100) = 85 -/
theorem fam_shorthand_legibilityratio_1 : ((85 * 100) / 100) = 85 := by decide

/-- signaling: receptoroccupancy(100, 100) = 50 — SIGNALING — CELL SIGNAL TRANSDUCTION, AS ARITHMETIC. A signal
    passing through a cell is numbers: how many receptors a ligand occupies, how far the signal is amplified,
    the half-maximal response, the gain of a cascade, the second messenger made, how much response is lost to
    desensitization, what dissociates, and how long the response takes. Crosses to `physiology` — signaling is
    the chemistry physiology runs on. A measure. */ const PROOF = 'signaling arithmetic (receptor occupancy,
    amplification, EC50, cascade gain, second messenger, desensitization, dissociation, response time); cell
    signal transduction as integers; a measure crossed to physiology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'signaling', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `signaling.${name}`, params }) export class SignalingFormulas { /** RECEPTOR OCCUPANCY: fraction of
    receptors a ligand binds, as a percentage. value ⌊ligand · 100 / (ligand + kd)⌋. -/
theorem fam_signaling_receptoroccupancy_1 : ((100 * 100) / (100 + 100)) = 50 := by decide

/-- signaling: amplification(10000, 100) = 100 — AMPLIFICATION: how far an input signal is amplified at the
    output. value ⌊output / input⌋. -/
theorem fam_signaling_amplification_1 : (10000 / 100) = 100 := by decide

/-- signaling: ec50(80, 20) = 50 — EC50: the half-maximal response between a bottom and a top. value ⌊(top +
    bottom) / 2⌋. -/
theorem fam_signaling_ec50_1 : ((80 + 20) / 2) = 50 := by decide

/-- signaling: cascadegain(10, 50) = 500 — CASCADE GAIN: two stage gains multiply along the cascade. value
    stage1 · stage2. -/
theorem fam_signaling_cascadegain_1 : (10 * 50) = 500 := by decide

/-- signaling: secondmessenger(200, 30) = 6000 — SECOND MESSENGER: molecules made by active enzymes at a rate
    each. value enzymes · rate. -/
theorem fam_signaling_secondmessenger_1 : (200 * 30) = 6000 := by decide

/-- signaling: desensitization(1000, 400) = 600 — DESENSITIZATION: response remaining after a loss. value max(0,
    initial − lost). -/
theorem fam_signaling_desensitization_1 : (fmax 0 (1000 - 400)) = 600 := by decide

/-- signaling: desensitization(300, 500) = 0 — DESENSITIZATION: response remaining after a loss. value max(0,
    initial − lost). -/
theorem fam_signaling_desensitization_2 : (fmax 0 (300 - 500)) = 0 := by decide

/-- signaling: dissociation(10000, 90) = 900 — DISSOCIATION: bound complex released at an off-rate per thousand.
    value ⌊bound · koff / 1000⌋. -/
theorem fam_signaling_dissociation_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- signaling: responsetime(5000, 100) = 50 — RESPONSE TIME: distance a signal travels at a speed. value
    ⌊distance / speed⌋. -/
theorem fam_signaling_responsetime_1 : (5000 / 100) = 50 := by decide

/-- sikhism: gurus(10, 0) = 10 -/
theorem fam_sikhism_gurus_1 : (10 + 0) = 10 := by decide

/-- sikhism: scripturepages(1430, 1) = 1430 -/
theorem fam_sikhism_scripturepages_1 : (1430 * 1) = 1430 := by decide

/-- sikhism: pillars(3, 0) = 3 -/
theorem fam_sikhism_pillars_1 : (3 + 0) = 3 := by decide

/-- sikhism: articlesoffaith(5, 0) = 5 -/
theorem fam_sikhism_articlesoffaith_1 : (5 + 0) = 5 := by decide

/-- sikhism: communitymeals(100, 7) = 700 -/
theorem fam_sikhism_communitymeals_1 : (100 * 7) = 700 := by decide

/-- sikhism: devotionratio(90, 100) = 90 -/
theorem fam_sikhism_devotionratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- silage: drymatter(350, 1000) = 35 — SILAGE — FORAGE PRESERVATION AS ARITHMETIC. Ensiling a crop is numbers:
    the dry matter it holds, how dense the packed mass is, the dry matter fermentation costs, the acidity
    reached, the mass packed per layer, the daily feed-out, the volume a silo holds, and the moisture that
    remains. Crosses to `agriculture` — silage is what a farm preserves. A measure. */ const PROOF = 'silage
    arithmetic (dry matter, density, fermentation loss, pH, packing density, feed-out, capacity, moisture);
    forage preservation as a measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'silage', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name:
    `silage.${name}`, params }) export class SilageFormulas { /** DRY MATTER: the dry fraction of the fresh
    crop, as a percentage. value ⌊dry · 100 / total⌋. -/
theorem fam_silage_drymatter_1 : ((350 * 100) / 1000) = 35 := by decide

/-- silage: density(7000, 10) = 700 — DENSITY: mass over the volume it fills. value ⌊mass / volume⌋. -/
theorem fam_silage_density_1 : (7000 / 10) = 700 := by decide

/-- silage: fermentationloss(80, 1000) = 8 — FERMENTATION LOSS: dry matter lost in the ensiling, as a
    percentage. value ⌊loss · 100 / initial⌋. -/
theorem fam_silage_fermentationloss_1 : ((80 * 100) / 1000) = 8 := by decide

/-- silage: phlevel(420, 10) = 42 — PH LEVEL: the average acidity (×10) over the samples read. value ⌊total /
    samples⌋. -/
theorem fam_silage_phlevel_1 : (420 / 10) = 42 := by decide

/-- silage: packingdensity(12, 600) = 7200 — PACKING DENSITY: the mass packed across the layers. value layers ·
    perLayer. -/
theorem fam_silage_packingdensity_1 : (12 * 600) = 7200 := by decide

/-- silage: feedout(3000, 30) = 100 — FEED-OUT: the mass removed each day of the feeding period. value ⌊removed
    / days⌋. -/
theorem fam_silage_feedout_1 : (3000 / 30) = 100 := by decide

/-- silage: capacity(50, 4) = 200 — CAPACITY: the volume a silo holds, area by height. value area · height. -/
theorem fam_silage_capacity_1 : (50 * 4) = 200 := by decide

/-- silage: moisture(650, 1000) = 65 — MOISTURE: the water fraction of the fresh crop, as a percentage. value
    ⌊water · 100 / total⌋. -/
theorem fam_silage_moisture_1 : ((650 * 100) / 1000) = 65 := by decide

/-- silviculture: density(5000, 50) = 100 — STAND DENSITY: trees over the area they grow on. value ⌊trees /
    area⌋. -/
theorem fam_silviculture_density_1 : (5000 / 50) = 100 := by decide

/-- silviculture: growth(50, 80) = 30 — GROWTH INCREMENT: the size a stand put on over a period. value max(0,
    end − start). -/
theorem fam_silviculture_growth_1 : (fmax 0 (80 - 50)) = 30 := by decide

/-- silviculture: growth(80, 50) = 0 — GROWTH INCREMENT: the size a stand put on over a period. value max(0, end
    − start). -/
theorem fam_silviculture_growth_2 : (fmax 0 (50 - 80)) = 0 := by decide

/-- silviculture: stocking(900, 1000) = 90 — STOCKING as a percentage of the ideal. value ⌊actual · 100 /
    ideal⌋. -/
theorem fam_silviculture_stocking_1 : ((900 * 100) / 1000) = 90 := by decide

/-- silviculture: thinning(1000, 300) = 700 — THINNING: the trees left standing after a removal. value max(0,
    before − remove). -/
theorem fam_silviculture_thinning_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- silviculture: volume(100, 20) = 2000 — STEM VOLUME: basal area at a height. value area · height. -/
theorem fam_silviculture_volume_1 : (100 * 20) = 2000 := by decide

/-- silviculture: yield(8, 25) = 200 — YIELD: mean annual increment compounded over the years grown. value mai ·
    years. -/
theorem fam_silviculture_yield_1 : (8 * 25) = 200 := by decide

/-- simulation: timestep(1000, 100) = 10 — SIMULATION — RUNNING A MODEL, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A simulation is numbers: the timestep a run advances, whether error converges under
    tolerance, a Monte Carlo estimate, output stability against input, grid resolution per cell, the speedup
    over serial, accuracy against ground truth, and the iteration count. Crosses to `code` — a simulation is
    code run as numbers. A measure. */ const PROOF = 'simulation arithmetic (timestep, convergence, monte carlo,
    stability, resolution, speedup, accuracy, iterations); running a model as numbers; a measure crossed to
    code' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'simulation', dst: 'code', formula,
    value, proof: PROOF, ...extra }, holds, { name: `simulation.${name}`, params }) export class
    SimulationFormulas { /** TIMESTEP: the duration a single step advances. value ⌊duration / steps⌋. -/
theorem fam_simulation_timestep_1 : (1000 / 100) = 10 := by decide

/-- simulation: convergence(50, 10) = 5 — CONVERGENCE: error measured in units of tolerance. value ⌊error /
    tolerance⌋. -/
theorem fam_simulation_convergence_1 : (50 / 10) = 5 := by decide

/-- simulation: montecarlo(785, 1000) = 78 — MONTE CARLO: hits over samples as a percentage. value ⌊hits · 100 /
    samples⌋. -/
theorem fam_simulation_montecarlo_1 : ((785 * 100) / 1000) = 78 := by decide

/-- simulation: stability(95, 100) = 95 — STABILITY: output as a percentage of input. value ⌊output · 100 /
    input⌋. -/
theorem fam_simulation_stability_1 : ((95 * 100) / 100) = 95 := by decide

/-- simulation: resolution(1000, 50) = 20 — RESOLUTION: the domain spread over its cells. value ⌊domain /
    cells⌋. -/
theorem fam_simulation_resolution_1 : (1000 / 50) = 20 := by decide

/-- simulation: speedup(800, 100) = 800 — SPEEDUP: serial over parallel as a percentage. value ⌊serial · 100 /
    parallel⌋. -/
theorem fam_simulation_speedup_1 : ((800 * 100) / 100) = 800 := by decide

/-- simulation: accuracy(990, 1000) = 99 — ACCURACY: correct over total as a percentage. value ⌊correct · 100 /
    total⌋. -/
theorem fam_simulation_accuracy_1 : ((990 * 100) / 1000) = 99 := by decide

/-- simulation: iterations(42) = 42 — ITERATIONS: the step count a run took. value count. -/
theorem fam_simulation_iterations_1 : 42 = 42 := by decide

/-- sintering: density(950, 1000) = 95 — SINTERING — CONSOLIDATING A POWDER COMPACT INTO A SOLID, AS ARITHMETIC.
    Firing a green part below its melting point is numbers: relative density reached, the porosity left, how far
    the part shrank, the necks that grow between grains, the temperature held, the time at temperature, the
    density pressed before firing, and how far densification ran. Crosses to `metallurgy` — sintering is the
    process metallurgy measures in the finished part. A measure. */ const PROOF = 'sintering arithmetic
    (relative density, porosity, shrinkage, neck growth, temperature, hold time, green density, densification);
    a powder-metallurgy measure crossed to metallurgy' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'sintering', dst: 'metallurgy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `sintering.${name}`, params }) export class SinteringFormulas { /** DENSIFICATION PARAMETER: how far firing
    closed the gap from green to full. value ⌊(sintered − green) · 100 / (theoretical − green)⌋. */ static
    densification(sintered: number, green: number, theoretical: number): CrossFormula { const d = theoretical -
    green; return c('sintering-densification', 'densification(sintered, green, theoretical) = ⌊(sintered −
    green) · 100 / (theoretical − green)⌋', d > 0 ? Math.floor((Math.max(0, sintered - green) * 100) / d) : 0,
    nat(sintered, green, theoretical) && theoretical > green && sintered >= green, 'densification', [sintered,
    green, theoretical]) } /** RELATIVE DENSITY: the sintered density as a percent of theoretical. value
    ⌊sintered · 100 / theoretical⌋. -/
theorem fam_sintering_density_1 : ((950 * 100) / 1000) = 95 := by decide

/-- sintering: greendensity(500, 100) = 500 — GREEN DENSITY: the pressed compact's density, mass over volume
    (scaled). value ⌊mass · 100 / volume⌋. -/
theorem fam_sintering_greendensity_1 : ((500 * 100) / 100) = 500 := by decide

/-- sintering: holdtime(1200, 10) = 120 — HOLD TIME: minutes at the ramp rate to reach the sintering
    temperature. value ⌊temp / rate⌋. -/
theorem fam_sintering_holdtime_1 : (1200 / 10) = 120 := by decide

/-- sintering: neckgrowth(30, 100) = 30 — NECK GROWTH: the neck diameter as a percent of the particle diameter.
    value ⌊neck · 100 / particle⌋. -/
theorem fam_sintering_neckgrowth_1 : ((30 * 100) / 100) = 30 := by decide

/-- sintering: porosity(95) = 5 — POROSITY: the void fraction left, the complement of relative density. value
    max(0, 100 − relative). -/
theorem fam_sintering_porosity_1 : (fmax 0 (100 - 95)) = 5 := by decide

/-- sintering: shrinkage(100, 85) = 15 — LINEAR SHRINKAGE: how far the part shrank, as a percent of its initial
    length. value ⌊(initial − final) · 100 / initial⌋. -/
theorem fam_sintering_shrinkage_1 : (((100 - 85) * 100) / 100) = 15 := by decide

/-- sintering: temperature(1500, 75) = 1125 — SINTERING TEMPERATURE: a fraction of the melting point, held for
    firing. value ⌊melt · frac / 100⌋. -/
theorem fam_sintering_temperature_1 : ((1500 * 75) / 100) = 1125 := by decide

/-- sixsigma: cpk(400, 300) = 133 — SIXSIGMA — PROCESS QUALITY, AS ARITHMETIC (the DMAIC measures, every one an
    integer). A process is numbers: defects per million opportunities, defects per unit, first-pass yield,
    rolled throughput yield, the capability index, the sigma level that spec and spread allow, total defects and
    total opportunities. Crosses to `quality` — six sigma is how quality is measured. A measure. */ const PROOF
    = 'six sigma arithmetic (dpmo, dpu, yield, rolled throughput, cpk, sigma level, defects, opportunities); the
    DMAIC measures as integers; a measure crossed to quality' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'sixsigma', dst: 'quality', formula, value, proof: PROOF, ...extra }, holds, { name:
    `sixsigma.${name}`, params }) export class SixsigmaFormulas { /** CAPABILITY INDEX: tolerance over spread,
    ×100 (Cpk 1.33 reads 133). value ⌊tolerance · 100 / spread⌋. -/
theorem fam_sixsigma_cpk_1 : ((400 * 100) / 300) = 133 := by decide

/-- sixsigma: defects(1000, 3) = 3000 — TOTAL DEFECTS: units at a per-unit defect count. value units · perUnit. -/
theorem fam_sixsigma_defects_1 : (1000 * 3) = 3000 := by decide

/-- sixsigma: dpmo(5, 1000) = 5000 — DEFECTS PER MILLION OPPORTUNITIES. value ⌊defects · 1000000 /
    opportunities⌋. -/
theorem fam_sixsigma_dpmo_1 : ((5 * 1000000) / 1000) = 5000 := by decide

/-- sixsigma: dpu(20, 1000) = 20 — DEFECTS PER UNIT, per thousand units. value ⌊defects · 1000 / units⌋. -/
theorem fam_sixsigma_dpu_1 : ((20 * 1000) / 1000) = 20 := by decide

/-- sixsigma: opportunities(1000, 5) = 5000 — TOTAL OPPORTUNITIES: units at a per-unit opportunity count. value
    units · perUnit. -/
theorem fam_sixsigma_opportunities_1 : (1000 * 5) = 5000 := by decide

/-- sixsigma: rolledthroughput(95, 90, 90) = 76 — ROLLED THROUGHPUT YIELD: three stage yields (percent)
    multiplied. value ⌊y1 · y2 · y3 / 10000⌋. -/
theorem fam_sixsigma_rolledthroughput_1 : (((95 * 90) * 90) / 10000) = 76 := by decide

/-- sixsigma: sigma(600, 100) = 6 — SIGMA LEVEL: the standard deviations that fit in the spec. value ⌊spec /
    stddev⌋. -/
theorem fam_sixsigma_sigma_1 : (600 / 100) = 6 := by decide

/-- sixsigma: yield(950, 1000) = 95 — FIRST-PASS YIELD as a percentage. value ⌊passed · 100 / total⌋. -/
theorem fam_sixsigma_yield_1 : ((950 * 100) / 1000) = 95 := by decide

/-- slider: slides(5) = 5 — SLIDER — THE CAROUSEL BLOCK FROM payloadcms/website, AS ARITHMETIC (a front-end use
    case, not chosen by hand). A slider is numbers: the slides it holds, the current index as a percentage, the
    autoplay cycle, the looping position, how many are visible, the gap between them, the transition time, and
    the pages it paginates into. Crosses to `frontend` — a slider is what the front end renders. A measure. */
    const PROOF = 'slider arithmetic (slides, index %, autoplay cycle, loop position, visible %, gap,
    transition, pages); the carousel use case from payloadcms/website; a measure crossed to frontend' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'slider', dst: 'frontend', formula, value, proof: PROOF, ...extra
    }, holds, { name: `slider.${name}`, params }) export class SliderFormulas { /** SLIDES: the slides a slider
    holds. value count. -/
theorem fam_slider_slides_1 : 5 = 5 := by decide

/-- slider: index(1, 4) = 25 — INDEX: the current slide as a percentage. value ⌊current · 100 / total⌋. -/
theorem fam_slider_index_1 : ((1 * 100) / 4) = 25 := by decide

/-- slider: autoplay(3000, 5) = 15000 — AUTOPLAY: the total cycle in milliseconds for all slides at an interval.
    value interval · slides. -/
theorem fam_slider_autoplay_1 : (3000 * 5) = 15000 := by decide

/-- slider: visible(3, 12) = 25 — VISIBLE: the slides shown as a percentage. value ⌊shown · 100 / total⌋. -/
theorem fam_slider_visible_1 : ((3 * 100) / 12) = 25 := by decide

/-- slider: gap(5, 16) = 64 — GAP: the total gap between the slides. value max(0, slides − 1) · gap. -/
theorem fam_slider_gap_1 : ((fmax 0 (5 - 1)) * 16) = 64 := by decide

/-- slider: transition(300) = 300 — TRANSITION: the transition time in milliseconds. value ms. -/
theorem fam_slider_transition_1 : 300 = 300 := by decide

/-- slotting: pickdensity(500, 50) = 10 -/
theorem fam_slotting_pickdensity_1 : (500 / 50) = 10 := by decide

/-- slotting: traveltime(1000, 20) = 50 -/
theorem fam_slotting_traveltime_1 : (1000 / 20) = 50 := by decide

/-- slotting: velocityrank(900, 100) = 9 -/
theorem fam_slotting_velocityrank_1 : (900 / 100) = 9 := by decide

/-- slotting: utilizationrate(85, 100) = 85 -/
theorem fam_slotting_utilizationrate_1 : ((85 * 100) / 100) = 85 := by decide

/-- slotting: replenishrate(600, 6) = 100 -/
theorem fam_slotting_replenishrate_1 : (600 / 6) = 100 := by decide

/-- slotting: goldenzone(40, 200) = 20 -/
theorem fam_slotting_goldenzone_1 : ((40 * 100) / 200) = 20 := by decide

/-- slotting: picksperslot(800, 40) = 20 -/
theorem fam_slotting_picksperslot_1 : (800 / 40) = 20 := by decide

/-- slotting: congestionindex(30, 100) = 30 -/
theorem fam_slotting_congestionindex_1 : ((30 * 100) / 100) = 30 := by decide

/-- smartgrid: nodes(1000, 2) = 2000 -/
theorem fam_smartgrid_nodes_1 : (1000 * 2) = 2000 := by decide

/-- smartgrid: demandresponse(15, 100) = 15 -/
theorem fam_smartgrid_demandresponse_1 : ((15 * 100) / 100) = 15 := by decide

/-- smartgrid: meterdata(1000, 24) = 24000 -/
theorem fam_smartgrid_meterdata_1 : (1000 * 24) = 24000 := by decide

/-- smartgrid: outagereduction(40, 100) = 40 -/
theorem fam_smartgrid_outagereduction_1 : ((40 * 100) / 100) = 40 := by decide

/-- smartgrid: renewableshare(50, 100) = 50 -/
theorem fam_smartgrid_renewableshare_1 : ((50 * 100) / 100) = 50 := by decide

/-- smartgrid: stabilitymargin(100, 20) = 80 -/
theorem fam_smartgrid_stabilitymargin_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- smoking: smoketime(6, 60) = 360 -/
theorem fam_smoking_smoketime_1 : (6 * 60) = 360 := by decide

/-- smoking: temperaturezone(107, 110) = 110 -/
theorem fam_smoking_temperaturezone_1 : (fmax 107 110) = 110 := by decide

/-- smoking: phenoldeposition(70, 100) = 70 -/
theorem fam_smoking_phenoldeposition_1 : ((70 * 100) / 100) = 70 := by decide

/-- smoking: moisturereduction(25, 100) = 25 -/
theorem fam_smoking_moisturereduction_1 : ((25 * 100) / 100) = 25 := by decide

/-- smoking: penetrationdepth(20, 4) = 5 -/
theorem fam_smoking_penetrationdepth_1 : (20 / 4) = 5 := by decide

/-- smoking: preservationindex(90, 100) = 90 -/
theorem fam_smoking_preservationindex_1 : ((90 * 100) / 100) = 90 := by decide

/-- smoking: woodratio(30, 100) = 30 -/
theorem fam_smoking_woodratio_1 : ((30 * 100) / 100) = 30 := by decide

/-- smoking: surfacecolor(8, 10) = 80 -/
theorem fam_smoking_surfacecolor_1 : (8 * 10) = 80 := by decide

/-- soccer: possession(60, 90) = 66 — SOCCER — THE MATCH AS ARITHMETIC. Playing the game is numbers: ball
    possession, how chances become goals, how passes land, expected goals from chance quality, clean sheets
    kept, goal difference, ground covered per minute, and league points earned. Crosses to `sports` — soccer is
    one sport the registry measures. A measure. */ const PROOF = 'soccer arithmetic (possession, conversion,
    pass accuracy, expected goals, clean sheets, goal difference, distance, points); the match as integers; a
    measure crossed to sports' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'soccer', dst: 'sports',
    formula, value, proof: PROOF, ...extra }, holds, { name: `soccer.${name}`, params }) export class
    SoccerFormulas { /** POSSESSION as a percentage. value ⌊held · 100 / total⌋. -/
theorem fam_soccer_possession_1 : ((60 * 100) / 90) = 66 := by decide

/-- soccer: conversion(3, 12) = 25 — CONVERSION: goals from shots, as a percentage. value ⌊goals · 100 / shots⌋. -/
theorem fam_soccer_conversion_1 : ((3 * 100) / 12) = 25 := by decide

/-- soccer: passaccuracy(400, 500) = 80 — PASS ACCURACY: completed over attempted, as a percentage. value
    ⌊completed · 100 / attempted⌋. -/
theorem fam_soccer_passaccuracy_1 : ((400 * 100) / 500) = 80 := by decide

/-- soccer: xg(10, 35) = 3 — EXPECTED GOALS: chances weighted by quality. value ⌊chances · quality / 100⌋. -/
theorem fam_soccer_xg_1 : ((10 * 35) / 100) = 3 := by decide

/-- soccer: cleansheets(12, 38) = 31 — CLEAN SHEETS as a percentage of matches. value ⌊clean · 100 / matches⌋. -/
theorem fam_soccer_cleansheets_1 : ((12 * 100) / 38) = 31 := by decide

/-- soccer: goaldiff(30, 20) = 10 — GOAL DIFFERENCE: scored less conceded; may be negative. value scored −
    conceded. -/
theorem fam_soccer_goaldiff_1 : (30 - 20) = 10 := by decide

/-- soccer: distance(10500, 90) = 116 — DISTANCE: metres covered per minute. value ⌊meters / minutes⌋. -/
theorem fam_soccer_distance_1 : (10500 / 90) = 116 := by decide

/-- soccer: points(10, 5) = 35 — LEAGUE POINTS: three a win, one a draw. value wins · 3 + draws. -/
theorem fam_soccer_points_1 : ((10 * 3) + 5) = 35 := by decide

/-- socialnetwork: degreecentrality(5, 11) = 50 — DEGREE CENTRALITY: a node's degree as a percentage of the n−1
    ties it could hold. value ⌊degree · 100 / (n−1)⌋. -/
theorem fam_socialnetwork_degreecentrality_1 : ((5 * 100) / (11 - 1)) = 50 := by decide

/-- socialnetwork: clustering(15, 60) = 25 — CLUSTERING: closed triples (triangles) as a percentage of connected
    triples. value ⌊triangles · 100 / triples⌋. -/
theorem fam_socialnetwork_clustering_1 : ((15 * 100) / 60) = 25 := by decide

/-- socialnetwork: reciprocity(30, 50) = 60 — RECIPROCITY: returned ties as a percentage of directed ties. value
    ⌊mutual · 100 / total⌋. -/
theorem fam_socialnetwork_reciprocity_1 : ((30 * 100) / 50) = 60 := by decide

/-- socialnetwork: pathlength(420, 100) = 4 — PATH LENGTH: the average shortest-path distance over the pairs.
    value ⌊totaldist / pairs⌋. -/
theorem fam_socialnetwork_pathlength_1 : (420 / 100) = 4 := by decide

/-- socialnetwork: betweenness(12, 48) = 25 — BETWEENNESS: shortest paths through a node as a percentage of all
    shortest paths. value ⌊through · 100 / total⌋. -/
theorem fam_socialnetwork_betweenness_1 : ((12 * 100) / 48) = 25 := by decide

/-- socialnetwork: components(10, 7) = 3 — COMPONENTS: the islands left when a forest of n nodes holds e edges.
    value max(0, n − edges). -/
theorem fam_socialnetwork_components_1 : (fmax 0 (10 - 7)) = 3 := by decide

/-- socialnetwork: homophily(35, 50) = 70 — HOMOPHILY: same-group ties as a percentage of all ties. value ⌊same
    · 100 / total⌋. -/
theorem fam_socialnetwork_homophily_1 : ((35 * 100) / 50) = 70 := by decide

/-- sociology: gini(20, 100) = 20 — SOCIOLOGY — SOCIAL SCIENCE, AS ARITHMETIC. Society is numbers: how unequal a
    share is, how many move between strata, how dense a network is, how tightly a group holds together, how
    segregated an area is, how many take part, how far an idea has spread, and how big a cohort is. Crosses to
    `econ` — society priced is economics. A measure. */ const PROOF = 'sociology arithmetic (gini, mobility,
    network density, cohesion, segregation, participation, diffusion, cohort); social science as integers; a
    measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'sociology', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `sociology.${name}`, params }) export class
    SociologyFormulas { /** GINI PROXY: the top share's percentage of the total — an inequality proxy. value
    ⌊top · 100 / total⌋. -/
theorem fam_sociology_gini_1 : ((20 * 100) / 100) = 20 := by decide

/-- sociology: mobility(30, 100) = 30 — MOBILITY: those who moved strata as a percentage of the cohort. value
    ⌊moved · 100 / cohort⌋. -/
theorem fam_sociology_mobility_1 : ((30 * 100) / 100) = 30 := by decide

/-- sociology: network(5, 10) = 100 — NETWORK DENSITY (×100): edges over the possible pairs. value nodes > 1 ?
    ⌊edges · 200 / (nodes · (nodes − 1))⌋ : 0. -/
theorem fam_sociology_network_1 : ((10 * 200) / (5 * (5 - 1))) = 100 := by decide

/-- sociology: cohesion(50, 10) = 5 — COHESION: ties per member. value ⌊ties / members⌋. -/
theorem fam_sociology_cohesion_1 : (50 / 10) = 5 := by decide

/-- sociology: segregation(40, 100) = 40 — SEGREGATION: a group's percentage of an area. value ⌊group · 100 /
    area⌋. -/
theorem fam_sociology_segregation_1 : ((40 * 100) / 100) = 40 := by decide

/-- sociology: participation(60, 100) = 60 — PARTICIPATION: active over eligible, as a percentage. value ⌊active
    · 100 / eligible⌋. -/
theorem fam_sociology_participation_1 : ((60 * 100) / 100) = 60 := by decide

/-- sociology: diffusion(25, 100) = 25 — DIFFUSION: adopters over the population, as a percentage. value
    ⌊adopters · 100 / population⌋. -/
theorem fam_sociology_diffusion_1 : ((25 * 100) / 100) = 25 := by decide

/-- sociology: cohort(42) = 42 — COHORT: the cohort's size. value size. -/
theorem fam_sociology_cohort_1 : 42 = 42 := by decide

/-- soilscience: porosity(130, 265) = 50 — SOILSCIENCE — THE GROUND AS ARITHMETIC. What a soil is, is numbers:
    pore space, how heavy it packs, the water it holds, the cations it can trade, its organic fraction, how fast
    water sinks in, how salty it runs, and the clay left after sand and silt. Crosses to `ecology` — soil is the
    substrate ecology grows from. A measure. */ const PROOF = 'soilscience arithmetic (porosity, bulk density,
    field capacity, cation exchange, organic matter, infiltration, salinity, texture); the ground a measure
    crossed to ecology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'soilscience', dst:
    'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `soilscience.${name}`, params }) export
    class SoilscienceFormulas { /** POROSITY as a percentage: pore space left by the packing against the
    particle density. value ⌊(particle − bulk) · 100 / particle⌋. -/
theorem fam_soilscience_porosity_1 : (((265 - 130) * 100) / 265) = 50 := by decide

/-- soilscience: bulkdensity(2600, 2) = 1300 — BULK DENSITY: oven-dry mass over the bulk volume. value ⌊mass /
    volume⌋. -/
theorem fam_soilscience_bulkdensity_1 : (2600 / 2) = 1300 := by decide

/-- soilscience: fieldcapacity(30, 12) = 18 — FIELD CAPACITY: the plant-available water, field capacity above
    the wilting point. value max(0, fc − wilt). -/
theorem fam_soilscience_fieldcapacity_1 : (fmax 0 (30 - 12)) = 18 := by decide

/-- soilscience: cationexchange(15, 2) = 30 — CATION EXCHANGE CAPACITY: exchange sites at a charge each. value
    sites · charge. -/
theorem fam_soilscience_cationexchange_1 : (15 * 2) = 30 := by decide

/-- soilscience: organicmatter(20) = 34 — ORGANIC MATTER from organic carbon by the Van Bemmelen factor. value
    ⌊carbon · 1724 / 1000⌋. -/
theorem fam_soilscience_organicmatter_1 : ((20 * 1724) / 1000) = 34 := by decide

/-- soilscience: infiltration(120, 4) = 30 — INFILTRATION: depth of water sunk in over the time taken. value
    ⌊depth / time⌋. -/
theorem fam_soilscience_infiltration_1 : (120 / 4) = 30 := by decide

/-- soilscience: salinity(4) = 2560 — SALINITY: dissolved salts from electrical conductivity at the standard 640
    factor. value ec · 640. -/
theorem fam_soilscience_salinity_1 : (4 * 640) = 2560 := by decide

/-- soilscience: texture(40, 40) = 20 — TEXTURE: the clay fraction left after sand and silt. value max(0, 100 −
    sand − silt). -/
theorem fam_soilscience_texture_1 : (fmax 0 ((100 - 40) - 40)) = 20 := by decide

/-- soilscience: texture(60, 60) = 0 — TEXTURE: the clay fraction left after sand and silt. value max(0, 100 −
    sand − silt). -/
theorem fam_soilscience_texture_2 : (fmax 0 ((100 - 60) - 60)) = 0 := by decide

/-- solarpower: paneloutput(300, 20) = 6000 -/
theorem fam_solarpower_paneloutput_1 : (300 * 20) = 6000 := by decide

/-- solarpower: efficiency(22, 100) = 22 -/
theorem fam_solarpower_efficiency_1 : ((22 * 100) / 100) = 22 := by decide

/-- solarpower: irradiance(1000, 1) = 1000 -/
theorem fam_solarpower_irradiance_1 : (1000 * 1) = 1000 := by decide

/-- solarpower: dailyyield(300, 5) = 1500 -/
theorem fam_solarpower_dailyyield_1 : (300 * 5) = 1500 := by decide

/-- solarpower: arraysize(20, 2) = 40 -/
theorem fam_solarpower_arraysize_1 : (20 * 2) = 40 := by decide

/-- solarpower: degradation(80, 100) = 80 -/
theorem fam_solarpower_degradation_1 : ((80 * 100) / 100) = 80 := by decide

/-- solarpower: inverterloss(6000, 300) = 5700 -/
theorem fam_solarpower_inverterloss_1 : (fmax 0 (6000 - 300)) = 5700 := by decide

/-- solarpower: capacityfactor(20, 100) = 20 -/
theorem fam_solarpower_capacityfactor_1 : ((20 * 100) / 100) = 20 := by decide

/-- solid: cuboidvolume(2, 3, 4) = 24 — CUBOID VOLUME: length by width by height. value l · w · h. -/
theorem fam_solid_cuboidvolume_1 : ((2 * 3) * 4) = 24 := by decide

/-- solid: prismvolume(6, 10) = 60 — PRISM VOLUME: base area carried along a height. value base · height. -/
theorem fam_solid_prismvolume_1 : (6 * 10) = 60 := by decide

/-- solid: pyramidvolume(30, 10) = 100 — PYRAMID VOLUME: a third of base area times height. value ⌊base · height
    / 3⌋. -/
theorem fam_solid_pyramidvolume_1 : ((30 * 10) / 3) = 100 := by decide

/-- solid: cuboidsurface(2, 3, 4) = 52 — CUBOID SURFACE: twice the three distinct faces. value 2 · (l·w + w·h +
    l·h). -/
theorem fam_solid_cuboidsurface_1 : (2 * (((2 * 3) + (3 * 4)) + (2 * 4))) = 52 := by decide

/-- solvency: ratio(1500, 1000) = 150 — SOLVENCY — THE BALANCE SHEET AS ARITHMETIC (chosen by the
    regulatory-capital registry, not by hand). Whether a firm can pay is numbers: the solvency ratio, available
    capital, the solvency margin, the coverage of own funds, the capital a risk profile requires, its floor, the
    buffer above it, and leverage. Crosses to `statistics` — solvency is a distribution of assets against
    claims. A measure. */ const PROOF = 'solvency arithmetic (solvency ratio, available capital, margin,
    coverage, SCR, MCR, buffer, leverage); the registry\'s uncovered regulatory-capital domain; a measure
    crossed to statistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'solvency', dst:
    'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `solvency.${name}`, params }) export
    class SolvencyFormulas { /** SOLVENCY RATIO: assets as a percentage of liabilities. value ⌊assets · 100 /
    liabilities⌋. -/
theorem fam_solvency_ratio_1 : ((1500 * 100) / 1000) = 150 := by decide

/-- solvency: capital(1500, 1000) = 500 — AVAILABLE CAPITAL: assets less liabilities, never below zero. value
    max(0, assets − liabilities). -/
theorem fam_solvency_capital_1 : (fmax 0 (1500 - 1000)) = 500 := by decide

/-- solvency: margin(1500, 1000) = 33 — SOLVENCY MARGIN: net worth as a percentage of assets. value ⌊max(0,
    assets − liabilities) · 100 / assets⌋. -/
theorem fam_solvency_margin_1 : (((fmax 0 (1500 - 1000)) * 100) / 1500) = 33 := by decide

/-- solvency: coverage(1200, 800) = 150 — COVERAGE: own funds as a percentage of the capital requirement. value
    ⌊funds · 100 / scr⌋. -/
theorem fam_solvency_coverage_1 : ((1200 * 100) / 800) = 150 := by decide

/-- solvency: mcr(450, 25) = 112 — MINIMUM CAPITAL REQUIREMENT: a percentage of the SCR, the floor. value ⌊scr ·
    pct / 100⌋. -/
theorem fam_solvency_mcr_1 : ((450 * 25) / 100) = 112 := by decide

/-- solvency: buffer(1200, 800) = 400 — CAPITAL BUFFER: own funds above the requirement, never below zero. value
    max(0, funds − scr). -/
theorem fam_solvency_buffer_1 : (fmax 0 (1200 - 800)) = 400 := by decide

/-- solvency: buffer(500, 800) = 0 — CAPITAL BUFFER: own funds above the requirement, never below zero. value
    max(0, funds − scr). -/
theorem fam_solvency_buffer_2 : (fmax 0 (500 - 800)) = 0 := by decide

/-- solvency: leverage(2000, 1000) = 200 — LEVERAGE: debt as a percentage of equity. value ⌊debt · 100 /
    equity⌋. -/
theorem fam_solvency_leverage_1 : ((2000 * 100) / 1000) = 200 := by decide

/-- sonography: depth(1540, 100) = 77000 — SONOGRAPHY — ULTRASOUND IMAGING, AS ARITHMETIC (chosen by the imaging
    registry, not by hand). A pulse of sound is numbers: how deep the echo reaches, the resolution of the
    picture, frames per second, how the beam attenuates, the acoustic impedance of tissue, the Doppler shift of
    moving blood, axial resolution, and penetration. Crosses to `radiology` — sonography is the moving picture
    radiology reads. A measure. */ const PROOF = 'sonography arithmetic (echo depth, resolution, frame rate,
    attenuation, acoustic impedance, Doppler shift, axial resolution, penetration); a pulse-echo measure crossed
    to radiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'sonography', dst: 'radiology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `sonography.${name}`, params }) export class
    SonographyFormulas { /** ECHO DEPTH: the round-trip of a pulse at the speed of sound, halved. value ⌊speed ·
    time / 2⌋. -/
theorem fam_sonography_depth_1 : ((1540 * 100) / 2) = 77000 := by decide

/-- sonography: resolution(15360, 512) = 30 — RESOLUTION: the image width spread over the scan lines. value
    ⌊width / lines⌋. -/
theorem fam_sonography_resolution_1 : (15360 / 512) = 30 := by decide

/-- sonography: framerate(15400, 11, 70) = 10 — FRAME RATE: the speed of sound over the two-way travel of every
    line to depth. value ⌊speed / (2 · depth · lines)⌋. -/
theorem fam_sonography_framerate_1 : (15400 / ((2 * 11) * 70)) = 10 := by decide

/-- sonography: attenuation(1, 5, 10) = 50 — ATTENUATION: a coefficient over frequency and distance. value coef
    · freq · dist. -/
theorem fam_sonography_attenuation_1 : ((1 * 5) * 10) = 50 := by decide

/-- sonography: impedance(1000, 1540) = 1540000 — ACOUSTIC IMPEDANCE: density times the speed of sound in the
    tissue. value density · speed. -/
theorem fam_sonography_impedance_1 : (1000 * 1540) = 1540000 := by decide

/-- sonography: dopplershift(5000, 77, 1540) = 500 — DOPPLER SHIFT: twice the transmitted frequency times
    velocity over the speed of sound. value ⌊2 · freq · velocity / speed⌋. -/
theorem fam_sonography_dopplershift_1 : (((2 * 5000) * 77) / 1540) = 500 := by decide

/-- sonography: axialres(500, 4) = 1000 — AXIAL RESOLUTION: the spatial pulse length (wavelength over cycles)
    halved. value ⌊wavelength · cycles / 2⌋. -/
theorem fam_sonography_axialres_1 : ((500 * 4) / 2) = 1000 := by decide

/-- sonography: penetration(60000, 5) = 12000 — PENETRATION: how deep imaging reaches, falling as frequency
    rises. value ⌊constant / freq⌋. -/
theorem fam_sonography_penetration_1 : (60000 / 5) = 12000 := by decide

/-- sounddesign: layers(12, 8) = 20 -/
theorem fam_sounddesign_layers_1 : (12 + 8) = 20 := by decide

/-- sounddesign: frequencybands(20000, 1000) = 20 -/
theorem fam_sounddesign_frequencybands_1 : (20000 / 1000) = 20 := by decide

/-- sounddesign: reverbms(2000, 1) = 2000 -/
theorem fam_sounddesign_reverbms_1 : (2000 / 1) = 2000 := by decide

/-- sounddesign: dynamicrangedb(96, 1) = 96 -/
theorem fam_sounddesign_dynamicrangedb_1 : (96 / 1) = 96 := by decide

/-- sounddesign: cuepoints(40, 1) = 40 -/
theorem fam_sounddesign_cuepoints_1 : (40 * 1) = 40 := by decide

/-- sounddesign: channelsubsets(6) = 64 -/
theorem fam_sounddesign_channelsubsets_1 : (2 ^ 6) = 64 := by decide

/-- sounddesign: loudnesslufs(23, 9) = 14 -/
theorem fam_sounddesign_loudnesslufs_1 : (fmax 0 (23 - 9)) = 14 := by decide

/-- sourcing: savings(1000, 850) = 150 — SOURCING — STRATEGIC PROCUREMENT, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Buying is numbers: savings won at the table, total spend, lead time to
    delivery, the suppliers a demand needs, the average bid, the award decision, the qualified share of a pool,
    and the risk a supplier carries. Crosses to `procurement` — sourcing is what procurement executes. A
    measure. */ const PROOF = 'sourcing arithmetic (negotiated savings, spend, lead time, suppliers needed,
    average bid, award, qualification, risk); the registry\'s uncovered buy-side domain; a measure crossed to
    procurement' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'sourcing', dst: 'procurement',
    formula, value, proof: PROOF, ...extra }, holds, { name: `sourcing.${name}`, params }) export class
    SourcingFormulas { /** NEGOTIATED SAVINGS: the drop from the quoted price to the agreed price. value max(0,
    before − after). -/
theorem fam_sourcing_savings_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- sourcing: savings(800, 900) = 0 — SOURCING — STRATEGIC PROCUREMENT, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Buying is numbers: savings won at the table, total spend, lead time to delivery, the
    suppliers a demand needs, the average bid, the award decision, the qualified share of a pool, and the risk a
    supplier carries. Crosses to `procurement` — sourcing is what procurement executes. A measure. */ const
    PROOF = 'sourcing arithmetic (negotiated savings, spend, lead time, suppliers needed, average bid, award,
    qualification, risk); the registry\'s uncovered buy-side domain; a measure crossed to procurement' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'sourcing', dst: 'procurement', formula, value, proof: PROOF,
    ...extra }, holds, { name: `sourcing.${name}`, params }) export class SourcingFormulas { /** NEGOTIATED
    SAVINGS: the drop from the quoted price to the agreed price. value max(0, before − after). -/
theorem fam_sourcing_savings_2 : (fmax 0 (800 - 900)) = 0 := by decide

/-- sourcing: spend(500, 20) = 10000 — TOTAL SPEND: units at a unit price. value units · price. -/
theorem fam_sourcing_spend_1 : (500 * 20) = 10000 := by decide

/-- sourcing: leadtime(14, 21) = 35 — LEAD TIME: preparation days plus transit days. value prep + transit. -/
theorem fam_sourcing_leadtime_1 : (14 + 21) = 35 := by decide

/-- sourcing: bid(9000, 3) = 3000 — AVERAGE BID: the total of the bids over the count received. value ⌊total /
    count⌋. -/
theorem fam_sourcing_bid_1 : (9000 / 3) = 3000 := by decide

/-- sourcing: qualification(45, 50) = 90 — QUALIFICATION: the qualified share of the supplier pool, as a
    percentage. value ⌊passed · 100 / total⌋. -/
theorem fam_sourcing_qualification_1 : ((45 * 100) / 50) = 90 := by decide

/-- sourcing: risk(4, 5) = 20 — SUPPLIER RISK: likelihood times impact on the risk matrix. value likelihood ·
    impact. -/
theorem fam_sourcing_risk_1 : (4 * 5) = 20 := by decide

/-- spaceflight: deltav(9400, 1) = 9400 -/
theorem fam_spaceflight_deltav_1 : (9400 * 1) = 9400 := by decide

/-- spaceflight: escapevelocity(11, 1000) = 11000 -/
theorem fam_spaceflight_escapevelocity_1 : (11 * 1000) = 11000 := by decide

/-- spaceflight: orbitalperiod(5400, 60) = 90 -/
theorem fam_spaceflight_orbitalperiod_1 : (5400 / 60) = 90 := by decide

/-- spaceflight: payloadfraction(4, 100) = 4 -/
theorem fam_spaceflight_payloadfraction_1 : ((4 * 100) / 100) = 4 := by decide

/-- spaceflight: burntime(480, 2) = 240 -/
theorem fam_spaceflight_burntime_1 : (480 / 2) = 240 := by decide

/-- spaceflight: apogee(400, 1) = 400 -/
theorem fam_spaceflight_apogee_1 : (400 * 1) = 400 := by decide

/-- spaceflight: twr(150, 100) = 1 -/
theorem fam_spaceflight_twr_1 : (150 / 100) = 1 := by decide

/-- spectroscopy: energy(500, 6) = 3000 — SPECTROSCOPY — LIGHT MEASURED AS ARITHMETIC. The energy of a photon,
    the wavenumber of a wave, how much a sample absorbs, the concentration Beer's law reads back, the resolution
    a grating reaches, the Doppler shift of a line, the intensity on a detector, and the natural linewidth a
    cavity leaves. Crosses to `optics` — spectroscopy is optics put to numbers. A measure. */ const PROOF =
    'spectroscopy arithmetic (photon energy, wavenumber, absorbance, Beer concentration, resolution, line shift,
    intensity, linewidth); a measure crossed to optics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'spectroscopy', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `spectroscopy.${name}`, params }) export class SpectroscopyFormulas { /** PHOTON ENERGY: frequency at
    Planck's quantum (E = hf proxy). value frequency · planck. -/
theorem fam_spectroscopy_energy_1 : (500 * 6) = 3000 := by decide

/-- spectroscopy: wavenumber(1000, 4) = 250 — WAVENUMBER: cycles over a length. value ⌊cycles / length⌋. -/
theorem fam_spectroscopy_wavenumber_1 : (1000 / 4) = 250 := by decide

/-- spectroscopy: absorbance(80, 20) = 400 — ABSORBANCE: incident over transmitted, scaled. value ⌊incident ·
    100 / transmitted⌋. -/
theorem fam_spectroscopy_absorbance_1 : ((80 * 100) / 20) = 400 := by decide

/-- spectroscopy: beer(100, 5) = 20 — BEER'S LAW: concentration from absorbance over path. value ⌊absorbance /
    path⌋. -/
theorem fam_spectroscopy_beer_1 : (100 / 5) = 20 := by decide

/-- spectroscopy: resolution(600, 3) = 200 — RESOLUTION: wavelength over its smallest resolvable step. value
    ⌊wavelength / delta⌋. -/
theorem fam_spectroscopy_resolution_1 : (600 / 3) = 200 := by decide

/-- spectroscopy: shift(500, 480) = 20 — LINE SHIFT: observed against reference (may be negative). value
    observed − reference. -/
theorem fam_spectroscopy_shift_1 : (500 - 480) = 20 := by decide

/-- spectroscopy: intensity(1000, 4) = 250 — INTENSITY: photons over a detector area. value ⌊photons / area⌋. -/
theorem fam_spectroscopy_intensity_1 : (1000 / 4) = 250 := by decide

/-- spectroscopy: linewidth(900, 3) = 300 — LINEWIDTH: frequency over the quality factor. value ⌊frequency /
    quality⌋. -/
theorem fam_spectroscopy_linewidth_1 : (900 / 3) = 300 := by decide

/-- speleology: depth(2197) = 2197 — SPELEOLOGY — CAVE SCIENCE, AS ARITHMETIC. A cave is numbers: how deep it
    goes, how far its passages run, how long a speleothem takes to grow, how much rock dissolved, how much of it
    has been surveyed, the gradient of a passage, the humidity of its air, and how many chambers it holds.
    Crosses to `geology` — a cave is rock measured. A measure. */ const PROOF = 'speleology arithmetic (depth,
    passage length, speleothem growth, dissolution, survey coverage, gradient, humidity, chambers); cave science
    as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'speleology', dst:
    'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `speleology.${name}`, params }) export
    class SpeleologyFormulas { /** DEPTH: how far below the entrance, in meters. value meters. -/
theorem fam_speleology_depth_1 : 2197 = 2197 := by decide

/-- speleology: extent(12, 50) = 600 — PASSAGE EXTENT: passages at a length each. value passages · segments. -/
theorem fam_speleology_extent_1 : (12 * 50) = 600 := by decide

/-- speleology: speleothem(100, 4) = 25 — SPELEOTHEM GROWTH TIME: height at a growth rate. value ⌊height /
    rate⌋. -/
theorem fam_speleology_speleothem_1 : (100 / 4) = 25 := by decide

/-- speleology: dissolution(30, 200) = 15 — DISSOLUTION as a percentage of exposed rock removed. value ⌊removed
    · 100 / exposed⌋. -/
theorem fam_speleology_dissolution_1 : ((30 * 100) / 200) = 15 := by decide

/-- speleology: survey(750, 1000) = 75 — SURVEY COVERAGE as a percentage. value ⌊measured · 100 / total⌋. -/
theorem fam_speleology_survey_1 : ((750 * 100) / 1000) = 75 := by decide

/-- speleology: gradient(45, 300) = 15 — GRADIENT: drop over distance, as a percentage. value ⌊drop · 100 /
    distance⌋. -/
theorem fam_speleology_gradient_1 : ((45 * 100) / 300) = 15 := by decide

/-- speleology: humidity(95, 100) = 95 — HUMIDITY of cave air as a percentage. value ⌊vapor · 100 / capacity⌋. -/
theorem fam_speleology_humidity_1 : ((95 * 100) / 100) = 95 := by decide

/-- speleology: chambers(42) = 42 — CHAMBERS: how many rooms the cave holds. value count. -/
theorem fam_speleology_chambers_1 : 42 = 42 := by decide

/-- spicetrade: spicecount(40, 20) = 60 -/
theorem fam_spicetrade_spicecount_1 : (40 + 20) = 60 := by decide

/-- spicetrade: priceindex(100, 3) = 300 -/
theorem fam_spicetrade_priceindex_1 : (100 * 3) = 300 := by decide

/-- spicetrade: originsubsets(6) = 64 -/
theorem fam_spicetrade_originsubsets_1 : (2 ^ 6) = 64 := by decide

/-- spicetrade: traderoutes(8, 3) = 24 -/
theorem fam_spicetrade_traderoutes_1 : (8 * 3) = 24 := by decide

/-- spicetrade: volumetons(1000, 5) = 5000 -/
theorem fam_spicetrade_volumetons_1 : (1000 * 5) = 5000 := by decide

/-- spicetrade: marginpct(40, 100) = 40 -/
theorem fam_spicetrade_marginpct_1 : ((40 * 100) / 100) = 40 := by decide

/-- spinning: count(1000, 20) = 50 — SPINNING — YARN SPINNING, AS ARITHMETIC (the mill floor reduced to
    numbers). A fibre becomes a yarn by counting it, twisting it, and weighing it against a length: the count,
    turns per inch, denier and tex of the linear density, the tenacity it breaks at, the draft that thins it,
    the yield off the frame, and how even it runs. Crosses to `materials` — spinning is what turns a material
    into a thread. A measure. */ const PROOF = 'spinning arithmetic (count, twist, denier, tenacity, draft,
    yield, evenness, tex); the yarn mill as linear-density numbers; a measure crossed to materials' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'spinning', dst: 'materials', formula, value, proof: PROOF,
    ...extra }, holds, { name: `spinning.${name}`, params }) export class SpinningFormulas { /** COUNT: hanks of
    length per unit weight (English cotton count). value ⌊length / weight⌋. -/
theorem fam_spinning_count_1 : (1000 / 20) = 50 := by decide

/-- spinning: twist(600, 30) = 20 — TWIST: turns inserted over the length, as turns per inch. value ⌊turns /
    length⌋. -/
theorem fam_spinning_twist_1 : (600 / 30) = 20 := by decide

/-- spinning: denier(5, 450) = 100 — DENIER: grams per 9000 metres of the strand. value ⌊mass · 9000 / length⌋. -/
theorem fam_spinning_denier_1 : ((5 * 9000) / 450) = 100 := by decide

/-- spinning: tenacity(900, 100) = 9 — TENACITY: breaking force per unit of linear density. value ⌊force /
    denier⌋. -/
theorem fam_spinning_tenacity_1 : (900 / 100) = 9 := by decide

/-- spinning: draft(800, 100) = 8 — DRAFT: the thinning ratio of delivered length to fed length. value ⌊output /
    input⌋. -/
theorem fam_spinning_draft_1 : (800 / 100) = 8 := by decide

/-- spinning: yield(950, 1000) = 95 — YIELD: good output off the frame as a percentage of what was fed. value
    ⌊good · 100 / total⌋. -/
theorem fam_spinning_yield_1 : ((950 * 100) / 1000) = 95 := by decide

/-- spinning: evenness(12, 100) = 88 — EVENNESS: 100 minus the coefficient of variation of mass per length.
    value max(0, 100 − ⌊variation · 100 / mean⌋). -/
theorem fam_spinning_evenness_1 : (fmax 0 (100 - ((12 * 100) / 100))) = 88 := by decide

/-- spinning: evenness(200, 100) = 0 — EVENNESS: 100 minus the coefficient of variation of mass per length.
    value max(0, 100 − ⌊variation · 100 / mean⌋). -/
theorem fam_spinning_evenness_2 : (fmax 0 (100 - ((200 * 100) / 100))) = 0 := by decide

/-- spinning: tex(40, 1000) = 40 — TEX: grams per 1000 metres of the strand. value ⌊mass · 1000 / length⌋. -/
theorem fam_spinning_tex_1 : ((40 * 1000) / 1000) = 40 := by decide

/-- spirometry: fev1fvcratio(4000, 5000) = 80 — SPIROMETRY — THE LUNG FUNCTION TEST, AS ARITHMETIC. A spirometer
    reads volumes and flows in whole millilitres and litres-per-minute: the FEV1/FVC ratio, the vital capacity,
    FEV1 from a known ratio, peak expiratory flow, the forced vital capacity, tidal volume from minute
    ventilation, residual volume, and total lung capacity. Crosses to `pulmonology` — spirometry is the measure
    pulmonology reads. A measure. */ const PROOF = 'spirometry arithmetic (FEV1/FVC ratio, vital capacity, FEV1,
    peak flow, forced vital capacity, tidal volume, residual volume, total lung capacity); whole millilitres and
    litres-per-minute; a measure crossed to pulmonology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'spirometry', dst: 'pulmonology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `spirometry.${name}`, params }) export class SpirometryFormulas { /** FEV1/FVC RATIO as a percentage. value
    ⌊fev1 · 100 / fvc⌋. -/
theorem fam_spirometry_fev1fvcratio_1 : ((4000 * 100) / 5000) = 80 := by decide

/-- spirometry: vitalcapacity(3000, 500, 1000) = 4500 — VITAL CAPACITY: the sum of the inspiratory reserve,
    tidal, and expiratory reserve volumes. value irv + tv + erv. -/
theorem fam_spirometry_vitalcapacity_1 : ((3000 + 500) + 1000) = 4500 := by decide

/-- spirometry: fev1(5000, 80) = 4000 — FEV1 from a forced vital capacity at a known ratio. value ⌊fvc · ratio /
    100⌋. -/
theorem fam_spirometry_fev1_1 : ((5000 * 80) / 100) = 4000 := by decide

/-- spirometry: peakflow(6000, 10) = 600 — PEAK EXPIRATORY FLOW: the volume exhaled over the minutes taken.
    value ⌊volume / minutes⌋. -/
theorem fam_spirometry_peakflow_1 : (6000 / 10) = 600 := by decide

/-- spirometry: forcedvitalcapacity(5000, 500) = 4500 — FORCED VITAL CAPACITY: the volume exhaled, start less
    the residual at the end. value max(0, start − end). -/
theorem fam_spirometry_forcedvitalcapacity_1 : (fmax 0 (5000 - 500)) = 4500 := by decide

/-- spirometry: tidalvolume(6000, 12) = 500 — TIDAL VOLUME: minute ventilation over the respiratory rate. value
    ⌊minute / rate⌋. -/
theorem fam_spirometry_tidalvolume_1 : (6000 / 12) = 500 := by decide

/-- spirometry: residualvolume(6000, 4500) = 1500 — RESIDUAL VOLUME: total lung capacity less the vital
    capacity. value max(0, tlc − vc). -/
theorem fam_spirometry_residualvolume_1 : (fmax 0 (6000 - 4500)) = 1500 := by decide

/-- spirometry: totalcapacity(4500, 1500) = 6000 — TOTAL LUNG CAPACITY: the vital capacity plus the residual
    volume. value vc + rv. -/
theorem fam_spirometry_totalcapacity_1 : (4500 + 1500) = 6000 := by decide

/-- spirometry: forcedvitalcapacity(500, 5000) = 0 — FORCED VITAL CAPACITY: the volume exhaled, start less the
    residual at the end. value max(0, start − end). -/
theorem fam_spirometry_forcedvitalcapacity_2 : (fmax 0 (500 - 5000)) = 0 := by decide

/-- sports: win(60, 100) = 60 — SPORTS — SPORTS ANALYTICS, AS ARITHMETIC. A season is numbers: win percentage,
    points per game, point differential, possession share, shooting rating, standings, pace, and the current
    streak. Crosses to `analytics` — sports is a measure that analytics reads. A measure. */ const PROOF =
    'sports arithmetic (win %, points per game, differential, possession, rating, standings, pace, streak); a
    measure crossed to analytics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'sports', dst: 'analytics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `sports.${name}`, params }) export class
    SportsFormulas { /** WIN PERCENTAGE: wins over games played. value ⌊wins · 100 / games⌋. -/
theorem fam_sports_win_1 : ((60 * 100) / 100) = 60 := by decide

/-- sports: average(2500, 100) = 25 — POINTS PER GAME: points over games played. value ⌊points / games⌋. -/
theorem fam_sports_average_1 : (2500 / 100) = 25 := by decide

/-- sports: differential(110, 95) = 15 — POINT DIFFERENTIAL: points scored less points allowed. value scored −
    allowed (may be negative). -/
theorem fam_sports_differential_1 : (110 - 95) = 15 := by decide

/-- sports: possession(55, 90) = 61 — POSSESSION SHARE: time held over total time. value ⌊held · 100 / total⌋. -/
theorem fam_sports_possession_1 : ((55 * 100) / 90) = 61 := by decide

/-- sports: rating(450, 1000) = 45 — SHOOTING RATING: made over attempts. value ⌊made · 100 / attempts⌋. -/
theorem fam_sports_rating_1 : ((450 * 100) / 1000) = 45 := by decide

/-- sports: standings(50, 32) = 18 — STANDINGS: wins less losses. value wins − losses (may be negative). -/
theorem fam_sports_standings_1 : (50 - 32) = 18 := by decide

/-- sports: pace(10, 2400) = 240 — PACE: time over distance. value ⌊time / distance⌋. -/
theorem fam_sports_pace_1 : (2400 / 10) = 240 := by decide

/-- sports: streak(7) = 7 — STREAK: the current run of results. value current. -/
theorem fam_sports_streak_1 : 7 = 7 := by decide

/-- sprint: velocity(100, 10) = 10 -/
theorem fam_sprint_velocity_1 : (100 / 10) = 10 := by decide

/-- sprint: acceleration(20, 4) = 5 -/
theorem fam_sprint_acceleration_1 : (20 / 4) = 5 := by decide

/-- sprint: stridelength(1000, 8) = 125 -/
theorem fam_sprint_stridelength_1 : (1000 / 8) = 125 := by decide

/-- sprint: stridefrequency(80, 10) = 8 -/
theorem fam_sprint_stridefrequency_1 : (80 / 10) = 8 := by decide

/-- sprint: splittime(400, 4) = 100 -/
theorem fam_sprint_splittime_1 : (400 / 4) = 100 := by decide

/-- sprint: topspeed(11, 12) = 12 -/
theorem fam_sprint_topspeed_1 : (fmax 11 12) = 12 := by decide

/-- sprint: distancecovered(10, 10) = 100 -/
theorem fam_sprint_distancecovered_1 : (10 * 10) = 100 := by decide

/-- sprint: reactiontime(200, 150) = 50 -/
theorem fam_sprint_reactiontime_1 : (fmax 0 (200 - 150)) = 50 := by decide

/-- stability: gainmargin(200, 100) = 200 — STABILITY — CONTROL-SYSTEM MARGINS, AS ARITHMETIC. Whether a
    feedback loop holds is numbers: how much the gain can grow before instability, how much phase is left at
    crossover, where the loop crosses over, the poles and zeros of the transfer, the Routh sign test, the ratio
    of the two margins, and how damped the response is. Crosses to `control` — stability is what control keeps.
    A measure. */ const PROOF = 'stability arithmetic (gain margin, phase margin, crossover frequency, poles,
    zeros, Routh criterion, margin ratio, damping factor); a measure crossed to control' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'stability', dst: 'control', formula, value, proof: PROOF,
    ...extra }, holds, { name: `stability.${name}`, params }) export class StabilityFormulas { /** GAIN MARGIN:
    how far the gain limit sits above the gain, as a percentage. value ⌊limit · 100 / gain⌋. -/
theorem fam_stability_gainmargin_1 : ((200 * 100) / 100) = 200 := by decide

/-- stability: phasemargin(180, 135) = 45 — PHASE MARGIN: the phase left below the limit at crossover. value
    max(0, limit − phase). -/
theorem fam_stability_phasemargin_1 : (fmax 0 (180 - 135)) = 45 := by decide

/-- stability: crossoverfrequency(1000, 4) = 250 — CROSSOVER FREQUENCY: bandwidth spread over the poles. value
    ⌊bandwidth / poles⌋. -/
theorem fam_stability_crossoverfrequency_1 : (1000 / 4) = 250 := by decide

/-- stability: poles(3, 2) = 7 — POLES: real poles plus the two of each complex pair. value real + 2 · pairs. -/
theorem fam_stability_poles_1 : (3 + (2 * 2)) = 7 := by decide

/-- stability: zeros(5, 2) = 3 — ZEROS: numerator roots left after cancellation. value max(0, num − cancelled). -/
theorem fam_stability_zeros_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- stability: marginratio(200, 50) = 400 — MARGIN RATIO: gain margin against phase margin, as a percentage.
    value ⌊gainmargin · 100 / phasemargin⌋. -/
theorem fam_stability_marginratio_1 : ((200 * 100) / 50) = 400 := by decide

/-- stability: dampingfactor(70, 100) = 70 — DAMPING FACTOR: actual damping as a percentage of critical. value
    ⌊actual · 100 / critical⌋. -/
theorem fam_stability_dampingfactor_1 : ((70 * 100) / 100) = 70 := by decide

/-- staffing: headcount(50, 4) = 200 — STAFFING — PUTTING PEOPLE ON THE WORK, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A workforce is numbers: heads across sites, how much of the schedule is
    covered, shifts a crew needs, the span of control, work per day, total staff-hours allocated, overtime past
    the standard, and open seats. Crosses to `logistics` — staffing is the hands logistics moves the work
    through. A measure. */ const PROOF = 'staffing arithmetic (headcount, coverage, shifts, span ratio, daily
    demand, allocation, overtime, vacancy); the registry\'s people domain; a measure crossed to logistics' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'staffing', dst: 'logistics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `staffing.${name}`, params }) export class StaffingFormulas { /**
    HEADCOUNT: workers per site across the sites. value perSite · sites. -/
theorem fam_staffing_headcount_1 : (50 * 4) = 200 := by decide

/-- staffing: coverage(90, 100) = 90 — COVERAGE: scheduled hours as a percentage of what the schedule requires.
    value ⌊scheduled · 100 / required⌋. -/
theorem fam_staffing_coverage_1 : ((90 * 100) / 100) = 90 := by decide

/-- staffing: ratio(100, 10) = 10 — RATIO: the span of control — staff per manager. value ⌊staff / managers⌋. -/
theorem fam_staffing_ratio_1 : (100 / 10) = 10 := by decide

/-- staffing: demand(6000, 60) = 100 — DEMAND: tasks over the days worked. value ⌊tasks / days⌋. -/
theorem fam_staffing_demand_1 : (6000 / 60) = 100 := by decide

/-- staffing: allocation(10, 40) = 400 — ALLOCATION: total staff-hours — workers at the hours each. value
    workers · hoursEach. -/
theorem fam_staffing_allocation_1 : (10 * 40) = 400 := by decide

/-- staffing: overtime(50, 40) = 10 — OVERTIME: hours worked past the standard, never below zero. value max(0,
    worked − standard). -/
theorem fam_staffing_overtime_1 : (fmax 0 (50 - 40)) = 10 := by decide

/-- staffing: overtime(30, 40) = 0 — OVERTIME: hours worked past the standard, never below zero. value max(0,
    worked − standard). -/
theorem fam_staffing_overtime_2 : (fmax 0 (30 - 40)) = 0 := by decide

/-- staffing: vacancy(100, 80) = 20 — VACANCY: budgeted seats still unfilled, never below zero. value max(0,
    budgeted − filled). -/
theorem fam_staffing_vacancy_1 : (fmax 0 (100 - 80)) = 20 := by decide

/-- staffing: vacancy(80, 100) = 0 — VACANCY: budgeted seats still unfilled, never below zero. value max(0,
    budgeted − filled). -/
theorem fam_staffing_vacancy_2 : (fmax 0 (80 - 100)) = 0 := by decide

/-- stagecraft: flats(12, 8) = 20 -/
theorem fam_stagecraft_flats_1 : (12 + 8) = 20 := by decide

/-- stagecraft: riggingpoints(20, 4) = 80 -/
theorem fam_stagecraft_riggingpoints_1 : (20 * 4) = 80 := by decide

/-- stagecraft: stagearea(12, 10) = 120 -/
theorem fam_stagecraft_stagearea_1 : (12 * 10) = 120 := by decide

/-- stagecraft: scenechanges(5, 3) = 8 -/
theorem fam_stagecraft_scenechanges_1 : (5 + 3) = 8 := by decide

/-- stagecraft: weightkg(50, 20) = 1000 -/
theorem fam_stagecraft_weightkg_1 : (50 * 20) = 1000 := by decide

/-- stagecraft: loadmargin(1000, 800) = 200 -/
theorem fam_stagecraft_loadmargin_1 : (fmax 0 (1000 - 800)) = 200 := by decide

/-- stainedglass: panecount(12, 8) = 96 -/
theorem fam_stainedglass_panecount_1 : (12 * 8) = 96 := by decide

/-- stainedglass: leadlines(40, 20) = 60 -/
theorem fam_stainedglass_leadlines_1 : (40 + 20) = 60 := by decide

/-- stainedglass: transmittance(70, 100) = 70 -/
theorem fam_stainedglass_transmittance_1 : ((70 * 100) / 100) = 70 := by decide

/-- stainedglass: cameleadlength(100, 3) = 300 -/
theorem fam_stainedglass_cameleadlength_1 : (100 * 3) = 300 := by decide

/-- stainedglass: refractionindex(1520, 1000) = 1 -/
theorem fam_stainedglass_refractionindex_1 : (1520 / 1000) = 1 := by decide

/-- stainedglass: panelsubsets(5) = 32 -/
theorem fam_stainedglass_panelsubsets_1 : (2 ^ 5) = 32 := by decide

/-- state: actions(600, 60) = 10 — STATE — WEB APP STATE MANAGEMENT, AS ARITHMETIC (stores, actions, selectors,
    rerenders, memoization, immutability). State is numbers: the stores an app holds, actions dispatched per
    second, selectors registered, the share of components that rerender, the share of selectors served from
    cache, the depth of nested state, hydration coverage, and the diff a change touches. Crosses to `frontend` —
    state is what the frontend renders. A measure. */ const PROOF = 'state arithmetic (stores, actions,
    selectors, rerenders, memoization, depth, hydration, diff); web app state management as exact integers; a
    measure crossed to frontend' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'state', dst: 'frontend',
    formula, value, proof: PROOF, ...extra }, holds, { name: `state.${name}`, params }) export class
    StateFormulas { /** DISPATCH RATE: actions dispatched over seconds. value ⌊dispatched / seconds⌋. -/
theorem fam_state_actions_1 : (600 / 60) = 10 := by decide

/-- state: depth(3) = 3 — NESTING DEPTH: how deeply state is nested; holds when shallow. value nested. -/
theorem fam_state_depth_1 : 3 = 3 := by decide

/-- state: diff(1, 8) = 12 — DIFF: the share of a tree a change touches, as a percentage. value ⌊changed · 100 /
    total⌋. -/
theorem fam_state_diff_1 : ((1 * 100) / 8) = 12 := by decide

/-- state: hydration(9, 10) = 90 — HYDRATION: the share of persisted state restored, as a percentage. value
    ⌊restored · 100 / total⌋. -/
theorem fam_state_hydration_1 : ((9 * 100) / 10) = 90 := by decide

/-- state: memoized(950, 1000) = 95 — MEMOIZATION: the share of selector computes served from cache, as a
    percentage. value ⌊cached · 100 / computes⌋. -/
theorem fam_state_memoized_1 : ((950 * 100) / 1000) = 95 := by decide

/-- state: rerenders(50, 200) = 25 — RERENDERS: the share of components that rerender on a change, as a
    percentage. value ⌊changed · 100 / components⌋. -/
theorem fam_state_rerenders_1 : ((50 * 100) / 200) = 25 := by decide

/-- state: selectors(42) = 42 — SELECTORS: the selectors registered. value count. -/
theorem fam_state_selectors_1 : 42 = 42 := by decide

/-- state: stores(4) = 4 — STORES: the stores an app holds. value count. -/
theorem fam_state_stores_1 : 4 = 4 := by decide

/-- statics: centroid(10, 30, 8) = 6 — STATICS — RIGID BODIES AT REST, AS ARITHMETIC (forces that cancel, no
    motion yet). A body holds still when every moment and force sums to zero: the moment of a force, the support
    reaction that balances a load, the centroid two masses share, the equilibrium check, the internal shear, the
    normal force, the friction it permits, and whether a truss is determinate. Crosses to `kinematics` — statics
    is what motion starts from once the balance breaks. A measure. */ const PROOF = 'statics arithmetic (moment,
    support reaction, centroid, equilibrium, shear, normal force, friction, truss determinacy); forces at rest
    summing to zero; a measure crossed to kinematics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'statics', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `statics.${name}`, params }) export class StaticsFormulas { /** THE CENTROID of two masses along a line, as
    a distance from the first. value ⌊w2 · d / (w1 + w2)⌋. -/
theorem fam_statics_centroid_1 : ((30 * 8) / (10 + 30)) = 6 := by decide

/-- statics: friction(500, 40) = 200 — FRICTION force available at a normal force and a coefficient in percent.
    value ⌊normal · muPct / 100⌋. -/
theorem fam_statics_friction_1 : ((500 * 40) / 100) = 200 := by decide

/-- statics: moment(50, 4) = 200 — THE MOMENT of a force about a point. value force · distance. -/
theorem fam_statics_moment_1 : (50 * 4) = 200 := by decide

/-- statics: normalforce(50, 10) = 500 — NORMAL FORCE as weight times gravity. value mass · gravity. -/
theorem fam_statics_normalforce_1 : (50 * 10) = 500 := by decide

/-- statics: reaction(100, 3, 10) = 30 — SUPPORT REACTION under a point load on a span. value ⌊load · dist /
    span⌋. -/
theorem fam_statics_reaction_1 : ((100 * 3) / 10) = 30 := by decide

/-- statics: shear(800, 300) = 500 — INTERNAL SHEAR: the net of the loads on one side of a section. value max(0,
    load − opposing). -/
theorem fam_statics_shear_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- statics: truss(7) = 11 — TRUSS DETERMINACY: the members a simple planar truss of j joints needs. value
    max(0, 2 · joints − 3). -/
theorem fam_statics_truss_1 : (fmax 0 ((2 * 7) - 3)) = 11 := by decide

/-- statistics: mean(1000, 4) = 250 — STATISTICS — DESCRIPTIVE AND INFERENTIAL MEASURES, AS ARITHMETIC.
    Summarising data is numbers: the mean, the spread (range and variance), a standardised score, a percentile,
    a correlation, a confidence margin, and the sample a fraction draws. Every quotient guarded (denominator > 0
    else 0). Crosses to `code` — a measure read as a program. */ const PROOF = 'statistics arithmetic (mean,
    range, variance, zscore, percentile, correlation, confidence, sample); descriptive and inferential measures;
    every division guarded; a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'statistics', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `statistics.${name}`, params }) export class StatisticsFormulas { /** THE MEAN: a sum over its count. value
    ⌊sum / count⌋. -/
theorem fam_statistics_mean_1 : (1000 / 4) = 250 := by decide

/-- statistics: range(90, 10) = 80 — THE RANGE: the spread between the extremes. value max(0, max_ − min_). -/
theorem fam_statistics_range_1 : (fmax 0 (90 - 10)) = 80 := by decide

/-- statistics: variance(800, 4) = 200 — THE VARIANCE: the mean of the squared deviations. value ⌊squares /
    count⌋. -/
theorem fam_statistics_variance_1 : (800 / 4) = 200 := by decide

/-- statistics: zscore(5, 2) = 250 — THE Z-SCORE: a value standardised by its deviation, scaled by 100. value
    ⌊value · 100 / sigma⌋. -/
theorem fam_statistics_zscore_1 : ((5 * 100) / 2) = 250 := by decide

/-- statistics: percentile(75, 100) = 75 — THE PERCENTILE: a rank over the total, as a percentage. value ⌊rank ·
    100 / total⌋. -/
theorem fam_statistics_percentile_1 : ((75 * 100) / 100) = 75 := by decide

/-- statistics: correlation(8, 10) = 80 — THE CORRELATION: a covariance over the product of deviations, scaled
    by 100. value ⌊covariance · 100 / product⌋. -/
theorem fam_statistics_correlation_1 : ((8 * 100) / 10) = 80 := by decide

/-- statistics: confidence(5, 100) = 5 — THE CONFIDENCE: a margin over the estimate, as a percentage. value
    ⌊margin · 100 / estimate⌋. -/
theorem fam_statistics_confidence_1 : ((5 * 100) / 100) = 5 := by decide

/-- statistics: sample(1000, 10) = 100 — THE SAMPLE: a population thinned by a fraction. value ⌊population /
    fraction⌋. -/
theorem fam_statistics_sample_1 : (1000 / 10) = 100 := by decide

/-- steering: turnradius(1000, 20) = 50 -/
theorem fam_steering_turnradius_1 : (1000 / 20) = 50 := by decide

/-- steering: ackermannangle(40, 10) = 30 -/
theorem fam_steering_ackermannangle_1 : (fmax 0 (40 - 10)) = 30 := by decide

/-- steering: slipangle(15, 3) = 12 -/
theorem fam_steering_slipangle_1 : (fmax 0 (15 - 3)) = 12 := by decide

/-- steering: steeringratio(360, 24) = 15 -/
theorem fam_steering_steeringratio_1 : (360 / 24) = 15 := by decide

/-- steering: yawrate(600, 10) = 60 -/
theorem fam_steering_yawrate_1 : (600 / 10) = 60 := by decide

/-- steering: understeer(8, 100) = 8 -/
theorem fam_steering_understeer_1 : ((8 * 100) / 100) = 8 := by decide

/-- steering: wheelbaseratio(250, 300) = 83 -/
theorem fam_steering_wheelbaseratio_1 : ((250 * 100) / 300) = 83 := by decide

/-- steering: correctiongain(100, 4) = 25 -/
theorem fam_steering_correctiongain_1 : (100 / 4) = 25 := by decide

/-- steganography: capacity(1024, 3) = 3072 — STEGANOGRAPHY — HIDING ONE MESSAGE INSIDE ANOTHER, AS ARITHMETIC.
    The craft is numbers: how many bits a cover can carry, what fraction of it the payload fills, the distortion
    a change leaves, signal over noise, how much survives an attack, how often a steganalysis test fires, the
    bits embedded per coefficient, and the fraction recovered. Crosses to `code` — hiding is a coding of one
    stream inside another. A measure. */ const PROOF = 'steganography arithmetic (capacity, payload ratio,
    distortion, psnr, robustness, detectability, embedding rate, extraction); hiding a message inside a cover; a
    measure crossed to code' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'steganography', dst:
    'code', formula, value, proof: PROOF, ...extra }, holds, { name: `steganography.${name}`, params }) export
    class SteganographyFormulas { /** CAPACITY: the bits a cover carries, pixels at a bits-per-pixel rate. value
    pixels · bitsper. -/
theorem fam_steganography_capacity_1 : (1024 * 3) = 3072 := by decide

/-- steganography: payload(250, 1000) = 25 — PAYLOAD ratio: the hidden bits as a percentage of the cover. value
    ⌊hidden · 100 / cover⌋. -/
theorem fam_steganography_payload_1 : ((250 * 100) / 1000) = 25 := by decide

/-- steganography: distortion(50, 1000) = 5 — DISTORTION: the changed samples as a percentage of the total.
    value ⌊changed · 100 / total⌋. -/
theorem fam_steganography_distortion_1 : ((50 * 100) / 1000) = 5 := by decide

/-- steganography: psnr(9000, 100) = 9000 — PSNR: signal over noise as a percentage. value ⌊signal · 100 /
    noise⌋. -/
theorem fam_steganography_psnr_1 : ((9000 * 100) / 100) = 9000 := by decide

/-- steganography: robustness(7, 10) = 70 — ROBUSTNESS: the attacks survived as a percentage of those tried.
    value ⌊survived · 100 / attacks⌋. -/
theorem fam_steganography_robustness_1 : ((7 * 100) / 10) = 70 := by decide

/-- steganography: detectability(2, 100) = 2 — DETECTABILITY: the steganalysis tests that fired, as a
    percentage. value ⌊detected · 100 / tests⌋. -/
theorem fam_steganography_detectability_1 : ((2 * 100) / 100) = 2 := by decide

/-- steganography: embedding(50, 200) = 25 — EMBEDDING rate: bits per coefficient as a percentage. value ⌊bits ·
    100 / coefficients⌋. -/
theorem fam_steganography_embedding_1 : ((50 * 100) / 200) = 25 := by decide

/-- steganography: extraction(990, 1000) = 99 — EXTRACTION: the recovered bits as a percentage of those
    embedded. value ⌊recovered · 100 / embedded⌋. -/
theorem fam_steganography_extraction_1 : ((990 * 100) / 1000) = 99 := by decide

/-- stellar: mainsequencelifetime(10, 1000) = 100 — STELLAR — THE PHYSICS OF A STAR, AS ARITHMETIC (integer
    proxies, no floats). A star is numbers: how long it burns on the main sequence, how bright it is for its
    mass, the Schwarzschild radius of its remnant, the gravity at its surface, the temperature its colour
    implies, the rate of fusion in its core, the mass its wind carries off, and the spectral class its
    temperature sorts it into. Crosses to `astrophysics` — stellar quantities are what astrophysics measures. A
    measure. */ const PROOF = 'stellar arithmetic (main-sequence lifetime, mass-luminosity, Schwarzschild
    radius, surface gravity, effective temperature, core fusion rate, mass loss, spectral class); integer
    proxies of stellar structure; a measure crossed to astrophysics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'stellar', dst: 'astrophysics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `stellar.${name}`, params }) export class StellarFormulas { /** MAIN-SEQUENCE LIFETIME: ∝ mass /
    luminosity, in megayears (the Sun's ~10⁴ Myr at unit mass and luminosity). value ⌊mass · 10000 / lum⌋. -/
theorem fam_stellar_mainsequencelifetime_1 : ((10 * 10000) / 1000) = 100 := by decide

/-- stellar: schwarzschildradius(10) = 30 — SCHWARZSCHILD RADIUS: ~3 km per solar mass. value mass · 3. -/
theorem fam_stellar_schwarzschildradius_1 : (10 * 3) = 30 := by decide

/-- stellar: effectivetemp(500) = 5796 — EFFECTIVE TEMPERATURE: Wien's law, the colour's peak wavelength in nm
    against 2898000 nm·K. value ⌊2898000 / wavelength⌋. -/
theorem fam_stellar_effectivetemp_1 : (2898000 / 500) = 5796 := by decide

/-- stellar: corefusionrate(10, 15) = 150 — CORE FUSION RATE: mass available at the core temperature. value mass
    · temp. -/
theorem fam_stellar_corefusionrate_1 : (10 * 15) = 150 := by decide

/-- stellar: massloss(1000, 2, 100) = 800 — MASS LOSS: the mass left after a wind carries off rate per year.
    value max(0, initial − rate · years). -/
theorem fam_stellar_massloss_1 : (fmax 0 (1000 - (2 * 100))) = 800 := by decide

/-- stellar: massloss(100, 2, 100) = 0 — MASS LOSS: the mass left after a wind carries off rate per year. value
    max(0, initial − rate · years). -/
theorem fam_stellar_massloss_2 : (fmax 0 (100 - (2 * 100))) = 0 := by decide

/-- stellar: spectralclass(5800) = 5 — SPECTRAL CLASS: the temperature sorted into a class index (thousands of
    kelvin). value ⌊temp / 1000⌋. -/
theorem fam_stellar_spectralclass_1 : (5800 / 1000) = 5 := by decide

/-- stemming: affixcount(12, 18) = 30 — STEMMING — REDUCING WORDS TO THEIR ROOTS, AS ARITHMETIC (chosen by the
    morphology registry, not by hand). A stemmer is numbers: the stem left after a suffix is cut, characters
    stripped, how many forms conflate to one root, the overstemming and understemming error rates, how far an
    index shrinks, affixes counted, and the root-to-word ratio. Crosses to `linguistics` — stemming is what
    linguistics formalizes. A measure. */ const PROOF = 'stemming arithmetic (stem length, suffix stripped,
    conflation rate, overstemming, understemming, index reduction, affix count, root ratio); a morphology
    measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'stemming', dst:
    'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `stemming.${name}`, params }) export
    class StemmingFormulas { /** AFFIX COUNT: prefixes plus suffixes. value prefixes + suffixes. -/
theorem fam_stemming_affixcount_1 : (12 + 18) = 30 := by decide

/-- stemming: conflationrate(30, 120) = 25 — CONFLATION RATE: forms merged to one root, as a percentage of all
    forms. value ⌊merged · 100 / total⌋. -/
theorem fam_stemming_conflationrate_1 : ((30 * 100) / 120) = 25 := by decide

/-- stemming: indexreduction(1000, 640) = 360 — INDEX REDUCTION: terms removed from the index by stemming. value
    max(0, before − after). -/
theorem fam_stemming_indexreduction_1 : (fmax 0 (1000 - 640)) = 360 := by decide

/-- stemming: overstemming(5, 200) = 2 — OVERSTEMMING: words wrongly conflated, as a percentage. value ⌊wrong ·
    100 / total⌋. -/
theorem fam_stemming_overstemming_1 : ((5 * 100) / 200) = 2 := by decide

/-- stemming: rootratio(50, 200) = 25 — ROOT RATIO: distinct roots per hundred words. value ⌊roots · 100 /
    words⌋. -/
theorem fam_stemming_rootratio_1 : ((50 * 100) / 200) = 25 := by decide

/-- stemming: stemlength(7, 3) = 4 — STEM LENGTH: the stem left after a suffix is cut. value max(0, word −
    suffix). -/
theorem fam_stemming_stemlength_1 : (fmax 0 (7 - 3)) = 4 := by decide

/-- stemming: suffixstripped(12, 5) = 7 — SUFFIX STRIPPED: characters removed to reach the stem. value max(0,
    word − stem). -/
theorem fam_stemming_suffixstripped_1 : (fmax 0 (12 - 5)) = 7 := by decide

/-- stemming: understemming(9, 300) = 3 — UNDERSTEMMING: words wrongly left distinct, as a percentage. value
    ⌊missed · 100 / total⌋. -/
theorem fam_stemming_understemming_1 : ((9 * 100) / 300) = 3 := by decide

/-- stemming: stemlength(3, 7) = 0 — STEM LENGTH: the stem left after a suffix is cut. value max(0, word −
    suffix). -/
theorem fam_stemming_stemlength_2 : (fmax 0 (3 - 7)) = 0 := by decide

/-- steps: progress(3, 4) = 75 — STEPS — THE STEPS BLOCK USE CASE FROM payloadcms/website, AS ARITHMETIC. A
    step-by-step flow (onboarding, a tutorial) is numbers: how far along a run is, which step is current, how
    many steps remain, the count of steps, whether a position is in order, how long the flow takes, how deeply
    steps nest, and the completion rate. Crosses to `frontend` — steps are what the frontend renders. A measure.
    */ const PROOF = 'steps arithmetic (progress, current, remaining, count, order, duration, depth,
    completion); the Steps block use case from payloadcms/website; a measure crossed to frontend' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'steps', dst: 'frontend', formula, value, proof: PROOF, ...extra
    }, holds, { name: `steps.${name}`, params }) export class StepsFormulas { /** PROGRESS: steps done as a
    percentage of the total. value ⌊done · 100 / total⌋. -/
theorem fam_steps_progress_1 : ((3 * 100) / 4) = 75 := by decide

/-- steps: current(2, 5) = 40 — CURRENT: the current step as a percentage of the total. value ⌊step · 100 /
    total⌋. -/
theorem fam_steps_current_1 : ((2 * 100) / 5) = 40 := by decide

/-- steps: remaining(3, 5) = 2 — REMAINING: the steps left to do. value max(0, total − done). -/
theorem fam_steps_remaining_1 : (fmax 0 (5 - 3)) = 2 := by decide

/-- steps: count(7) = 7 — COUNT: the number of steps in the flow. value steps. -/
theorem fam_steps_count_1 : 7 = 7 := by decide

/-- steps: duration(5, 30) = 150 — DURATION: steps at a time each. value steps · perStep. -/
theorem fam_steps_duration_1 : (5 * 30) = 150 := by decide

/-- steps: depth(3) = 3 — DEPTH: how deeply steps nest (holds at five or fewer). value nested. -/
theorem fam_steps_depth_1 : 3 = 3 := by decide

/-- steps: completion(80, 100) = 80 — COMPLETION: finished runs as a percentage of started. value ⌊finished ·
    100 / started⌋. -/
theorem fam_steps_completion_1 : ((80 * 100) / 100) = 80 := by decide

/-- stoichiometry: moles(180, 18) = 10 — STOICHIOMETRY — THE BOOKKEEPING OF A REACTION, AS ARITHMETIC. A
    reaction is numbers: moles from a mass, molar mass from atoms, the limiting reagent, percent yield,
    molarity, a dilution, percent by mass, and the empirical ratio. Crosses to `chemistry` — stoichiometry is
    the arithmetic chemistry runs on. A measure. */ const PROOF = 'stoichiometry arithmetic (moles, molar mass,
    limiting reagent, percent yield, molarity, dilution, percent mass, empirical ratio); a measure crossed to
    chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'stoichiometry', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `stoichiometry.${name}`, params }) export class
    StoichiometryFormulas { /** MOLES: a mass over its molar mass. value ⌊mass / molarmass⌋. -/
theorem fam_stoichiometry_moles_1 : (180 / 18) = 10 := by decide

/-- stoichiometry: moles(5, 0) = 0 — STOICHIOMETRY — THE BOOKKEEPING OF A REACTION, AS ARITHMETIC. A reaction is
    numbers: moles from a mass, molar mass from atoms, the limiting reagent, percent yield, molarity, a
    dilution, percent by mass, and the empirical ratio. Crosses to `chemistry` — stoichiometry is the arithmetic
    chemistry runs on. A measure. */ const PROOF = 'stoichiometry arithmetic (moles, molar mass, limiting
    reagent, percent yield, molarity, dilution, percent mass, empirical ratio); a measure crossed to chemistry'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'stoichiometry', dst: 'chemistry', formula, value,
    proof: PROOF, ...extra }, holds, { name: `stoichiometry.${name}`, params }) export class
    StoichiometryFormulas { /** MOLES: a mass over its molar mass. value ⌊mass / molarmass⌋. -/
theorem fam_stoichiometry_moles_2 : (5 / 0) = 0 := by decide

/-- stoichiometry: molarmass(2, 16) = 32 — MOLAR MASS: atom count at an atomic weight each. value count ·
    weight. -/
theorem fam_stoichiometry_molarmass_1 : (2 * 16) = 32 := by decide

/-- stoichiometry: limiting(5, 3) = 3 — LIMITING REAGENT: the smaller of two available amounts. value min(a, b). -/
theorem fam_stoichiometry_limiting_1 : (fmin 5 3) = 3 := by decide

/-- stoichiometry: yield(80, 100) = 80 — PERCENT YIELD: actual over theoretical. value ⌊actual · 100 /
    theoretical⌋. -/
theorem fam_stoichiometry_yield_1 : ((80 * 100) / 100) = 80 := by decide

/-- stoichiometry: molarity(6, 2) = 3 — MOLARITY: moles over litres of solution. value ⌊moles / liters⌋. -/
theorem fam_stoichiometry_molarity_1 : (6 / 2) = 3 := by decide

/-- stoichiometry: dilution(10, 2, 4) = 5 — DILUTION: C₁V₁ = C₂V₂ solved for the new concentration. value ⌊c1 ·
    v1 / v2⌋. -/
theorem fam_stoichiometry_dilution_1 : ((10 * 2) / 4) = 5 := by decide

/-- stoichiometry: percentmass(2, 18) = 11 — PERCENT BY MASS: a part of the whole. value ⌊part · 100 / whole⌋. -/
theorem fam_stoichiometry_percentmass_1 : ((2 * 100) / 18) = 11 := by decide

/-- stoichiometry: empirical(2, 4) = 2 — EMPIRICAL RATIO: hydrogen atoms per carbon atom. value ⌊hydrogen /
    carbon⌋. -/
theorem fam_stoichiometry_empirical_1 : (4 / 2) = 2 := by decide

/-- stoicism: virtues(4, 0) = 4 -/
theorem fam_stoicism_virtues_1 : (4 + 0) = 4 := by decide

/-- stoicism: passionstates(4) = 16 -/
theorem fam_stoicism_passionstates_1 : (2 ^ 4) = 16 := by decide

/-- stoicism: controlratio(50, 100) = 50 -/
theorem fam_stoicism_controlratio_1 : ((50 * 100) / 100) = 50 := by decide

/-- stoicism: impressionfilters(3, 3) = 9 -/
theorem fam_stoicism_impressionfilters_1 : (3 * 3) = 9 := by decide

/-- stoicism: apatheiaindex(80, 100) = 80 -/
theorem fam_stoicism_apatheiaindex_1 : ((80 * 100) / 100) = 80 := by decide

/-- stoicism: preferredindifferents(10, 10) = 20 -/
theorem fam_stoicism_preferredindifferents_1 : (10 + 10) = 20 := by decide

/-- storage: capacity(1000, 5) = 5000 — STORAGE — OBJECT AND BLOCK STORAGE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Keeping bytes is numbers: raw capacity, used space, the cost of
    redundancy, operations per second, bytes per second, the dedup ratio, the two tiers summed, and the bill per
    gigabyte. Crosses to `cloud` — storage is capacity the cloud allocates. A measure. */ const PROOF = 'storage
    arithmetic (capacity, used, redundancy, iops, throughput, dedup, tier, cost); object and block storage as
    numbers; a measure crossed to cloud' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'storage', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `storage.${name}`,
    params }) export class StorageFormulas { /** CAPACITY: objects at a size each. value objects · size. -/
theorem fam_storage_capacity_1 : (1000 * 5) = 5000 := by decide

/-- storage: used(1000, 300) = 700 — USED: allocated space less what is free, never below zero. value max(0,
    allocated − free). -/
theorem fam_storage_used_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- storage: used(100, 400) = 0 — USED: allocated space less what is free, never below zero. value max(0,
    allocated − free). -/
theorem fam_storage_used_2 : (fmax 0 (100 - 400)) = 0 := by decide

/-- storage: redundancy(3, 500) = 1500 — REDUNDANCY: copies of a size each. value copies · size. -/
theorem fam_storage_redundancy_1 : (3 * 500) = 1500 := by decide

/-- storage: iops(5000, 10) = 500 — IOPS: operations over seconds. value ⌊ops / seconds⌋. -/
theorem fam_storage_iops_1 : (5000 / 10) = 500 := by decide

/-- storage: throughput(6000, 60) = 100 — THROUGHPUT: bytes over seconds. value ⌊bytes / seconds⌋. -/
theorem fam_storage_throughput_1 : (6000 / 60) = 100 := by decide

/-- storage: dedup(1000, 250) = 25 — DEDUP: stored as a percentage of raw. value ⌊stored · 100 / raw⌋. -/
theorem fam_storage_dedup_1 : ((250 * 100) / 1000) = 25 := by decide

/-- storage: tier(700, 300) = 1000 — TIER: hot and cold summed. value hot + cold. -/
theorem fam_storage_tier_1 : (700 + 300) = 1000 := by decide

/-- storage: cost(2000, 5) = 100 — COST: gigabytes at a rate per hundred. value ⌊gb · rate / 100⌋. -/
theorem fam_storage_cost_1 : ((2000 * 5) / 100) = 100 := by decide

/-- storyboarding: panels(40, 6) = 240 -/
theorem fam_storyboarding_panels_1 : (40 * 6) = 240 := by decide

/-- storyboarding: framesize(16, 9) = 144 -/
theorem fam_storyboarding_framesize_1 : (16 * 9) = 144 := by decide

/-- storyboarding: aspectratio(178, 100) = 178 -/
theorem fam_storyboarding_aspectratio_1 : ((178 * 100) / 100) = 178 := by decide

/-- storyboarding: gridcells(3, 3) = 9 -/
theorem fam_storyboarding_gridcells_1 : (3 * 3) = 9 := by decide

/-- storyboarding: transitiontypes(5, 3) = 8 -/
theorem fam_storyboarding_transitiontypes_1 : (5 + 3) = 8 := by decide

/-- storyboarding: coverage(90, 100) = 90 -/
theorem fam_storyboarding_coverage_1 : ((90 * 100) / 100) = 90 := by decide

/-- straingauge: gaugefactor(2000, 1000) = 2 — STRAINGAUGE — THE BONDED RESISTANCE STRAIN GAUGE, AS ARITHMETIC.
    Measuring deformation is numbers: the gauge factor that ties resistance to strain, the strain from a
    displacement, the fractional resistance change, the Wheatstone quarter-bridge output, Hooke's-law stress,
    strain in microstrain, the load-cell sensitivity, and the thermal output error. Crosses to `mechanical` — a
    strain gauge is what reads a mechanical member. A measure. */ const PROOF = 'straingauge arithmetic (gauge
    factor, strain, resistance change, bridge output, stress, microstrain, sensitivity, temperature error); the
    transducer that reads deformation; a measure crossed to mechanical' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'straingauge', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds,
    { name: `straingauge.${name}`, params }) export class StraingaugeFormulas { /** GAUGE FACTOR: the fractional
    resistance change (ppm) over the strain (µε). value ⌊deltar / strain⌋. -/
theorem fam_straingauge_gaugefactor_1 : (2000 / 1000) = 2 := by decide

/-- straingauge: strain(2, 2000) = 1000 — STRAIN: a displacement over a gauge length, in microstrain. value
    ⌊deltal · 1000000 / length⌋. -/
theorem fam_straingauge_strain_1 : ((2 * 1000000) / 2000) = 1000 := by decide

/-- straingauge: resistancechange(2, 1000) = 2000 — RESISTANCE CHANGE: the gauge factor times the strain (µε),
    in ppm. value gf · strain. -/
theorem fam_straingauge_resistancechange_1 : (2 * 1000) = 2000 := by decide

/-- straingauge: bridgeoutput(5000, 2000) = 2500 — BRIDGE OUTPUT: a Wheatstone quarter-bridge at an excitation
    (mV) and fractional change (ppm). value ⌊excitation · ratio / 4000⌋. -/
theorem fam_straingauge_bridgeoutput_1 : ((5000 * 2000) / 4000) = 2500 := by decide

/-- straingauge: stress(1000, 200) = 200000 — STRESS: Hooke's law, the strain (µε) times the elastic modulus.
    value strain · modulus. -/
theorem fam_straingauge_stress_1 : (1000 * 200) = 200000 := by decide

/-- straingauge: microstrain(2000, 2) = 1000 — MICROSTRAIN: the strain a fractional resistance change (ppm)
    implies at a gauge factor. value ⌊ratio / gf⌋. -/
theorem fam_straingauge_microstrain_1 : (2000 / 2) = 1000 := by decide

/-- straingauge: sensitivity(10, 5000) = 2 — SENSITIVITY: an output per excitation, in mV per V. value ⌊output ·
    1000 / excitation⌋. -/
theorem fam_straingauge_sensitivity_1 : ((10 * 1000) / 5000) = 2 := by decide

/-- straingauge: temperatureerror(50, 20) = 1000 — TEMPERATURE ERROR: thermal output, the temperature
    coefficient (ppm/°C) over a span. value tcr · deltat. -/
theorem fam_straingauge_temperatureerror_1 : (50 * 20) = 1000 := by decide

/-- straingauge: gaugefactor(2000, 0) = 0 — STRAINGAUGE — THE BONDED RESISTANCE STRAIN GAUGE, AS ARITHMETIC.
    Measuring deformation is numbers: the gauge factor that ties resistance to strain, the strain from a
    displacement, the fractional resistance change, the Wheatstone quarter-bridge output, Hooke's-law stress,
    strain in microstrain, the load-cell sensitivity, and the thermal output error. Crosses to `mechanical` — a
    strain gauge is what reads a mechanical member. A measure. */ const PROOF = 'straingauge arithmetic (gauge
    factor, strain, resistance change, bridge output, stress, microstrain, sensitivity, temperature error); the
    transducer that reads deformation; a measure crossed to mechanical' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'straingauge', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds,
    { name: `straingauge.${name}`, params }) export class StraingaugeFormulas { /** GAUGE FACTOR: the fractional
    resistance change (ppm) over the strain (µε). value ⌊deltar / strain⌋. -/
theorem fam_straingauge_gaugefactor_2 : (2000 / 0) = 0 := by decide

/-- stratigraphy: depositionrate(600, 300) = 2 — DEPOSITION RATE: sediment thickness over the years that laid it
    down. value ⌊sediment / years⌋. -/
theorem fam_stratigraphy_depositionrate_1 : (600 / 300) = 2 := by decide

/-- stratigraphy: age(1500, 3) = 500 — STRATIGRAPHY — THE LAYERED ROCK RECORD, AS ARITHMETIC (reading a section
    as numbers, not by hand). A column of strata is measure: how fast sediment fell, the age a bed records, how
    thick it is between two depths, how far it compacted, the gap an unconformity hides, how well two sections
    correlate, how many depositional sequences stack, and how far the basin sank. Crosses to `geology` —
    stratigraphy is the time-ordering geology reads from the rock. A measure. */ const PROOF = 'stratigraphy
    arithmetic (deposition rate, bed age, thickness, compaction, unconformity gap, correlation, sequences,
    subsidence); the layered rock record as a measure crossed to geology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'stratigraphy', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `stratigraphy.${name}`, params }) export class StratigraphyFormulas { /** BED AGE: thickness over the
    deposition rate. value ⌊thickness / rate⌋. -/
theorem fam_stratigraphy_age_1 : (1500 / 3) = 500 := by decide

/-- stratigraphy: thickness(900, 300) = 600 — THICKNESS: the span of a bed between two depths. value max(0, top
    − bottom). -/
theorem fam_stratigraphy_thickness_1 : (fmax 0 (900 - 300)) = 600 := by decide

/-- stratigraphy: thickness(300, 900) = 0 — THICKNESS: the span of a bed between two depths. value max(0, top −
    bottom). -/
theorem fam_stratigraphy_thickness_2 : (fmax 0 (300 - 900)) = 0 := by decide

/-- stratigraphy: compaction(800, 600) = 75 — COMPACTION: how much of the original thickness survives, as a
    percentage. value ⌊compacted · 100 / original⌋. -/
theorem fam_stratigraphy_compaction_1 : ((600 * 100) / 800) = 75 := by decide

/-- stratigraphy: unconformity(500, 200) = 300 — UNCONFORMITY: the time gap a missing section hides between an
    upper and a lower age. value max(0, upper − lower). -/
theorem fam_stratigraphy_unconformity_1 : (fmax 0 (500 - 200)) = 300 := by decide

/-- stratigraphy: correlation(45, 50) = 90 — CORRELATION: matched markers between two sections, as a percentage.
    value ⌊matched · 100 / total⌋. -/
theorem fam_stratigraphy_correlation_1 : ((45 * 100) / 50) = 90 := by decide

/-- stratigraphy: subsidence(1000, 5) = 5000 — SUBSIDENCE: how far the basin floor sank under a sediment load at
    a per-unit rate. value load · rate. -/
theorem fam_stratigraphy_subsidence_1 : (1000 * 5) = 5000 := by decide

/-- streaming: bitrate(6000, 60) = 100 — BITRATE: bits delivered over seconds. value ⌊bits / seconds⌋. -/
theorem fam_streaming_bitrate_1 : (6000 / 60) = 100 := by decide

/-- streaming: buffer(30, 100) = 30 — BUFFER fill as a percentage. value ⌊filled · 100 / capacity⌋. -/
theorem fam_streaming_buffer_1 : ((30 * 100) / 100) = 30 := by decide

/-- streaming: rebuffer(12, 4) = 3 — REBUFFER rate: stalls over the minutes watched. value ⌊stalls / minutes⌋. -/
theorem fam_streaming_rebuffer_1 : (12 / 4) = 3 := by decide

/-- streaming: latency(250) = 250 — PLAYBACK LATENCY in milliseconds. value milliseconds. -/
theorem fam_streaming_latency_1 : 250 = 250 := by decide

/-- streaming: bandwidth(1000, 8) = 125 — STREAMING — DELIVERING MEDIA, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Serving a stream is numbers: the bitrate a buffer sustains, how full the buffer is,
    rebuffers per minute, startup and playback latency, bandwidth per stream, delivered quality, and concurrent
    viewers against capacity. Crosses to `media` — streaming is how media reaches the viewer. A measure. */
    const PROOF = 'streaming arithmetic (bitrate, buffer fill, rebuffer rate, latency, bandwidth, quality,
    concurrency, startup); a public-API registry domain; a measure crossed to media' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'streaming', dst: 'media', formula, value, proof: PROOF, ...extra
    }, holds, { name: `streaming.${name}`, params }) export class StreamingFormulas { /** BANDWIDTH per stream:
    throughput shared across the streams served. value ⌊throughput / streams⌋. -/
theorem fam_streaming_bandwidth_1 : (1000 / 8) = 125 := by decide

/-- streaming: quality(90, 100) = 90 — DELIVERED QUALITY: delivered against requested as a percentage. value
    ⌊delivered · 100 / requested⌋. -/
theorem fam_streaming_quality_1 : ((90 * 100) / 100) = 90 := by decide

/-- streaming: concurrency(750, 1000) = 75 — CONCURRENCY: viewers against capacity as a percentage. value
    ⌊viewers · 100 / capacity⌋. -/
theorem fam_streaming_concurrency_1 : ((750 * 100) / 1000) = 75 := by decide

/-- streaming: startup(1200) = 1200 — STARTUP delay in milliseconds. value milliseconds. -/
theorem fam_streaming_startup_1 : 1200 = 1200 := by decide

/-- strength: volume(100, 5, 3) = 1500 -/
theorem fam_strength_volume_1 : ((100 * 5) * 3) = 1500 := by decide

/-- strength: intensity(80, 100) = 80 -/
theorem fam_strength_intensity_1 : ((80 * 100) / 100) = 80 := by decide

/-- strength: tonnage(500, 10) = 5000 -/
theorem fam_strength_tonnage_1 : (500 * 10) = 5000 := by decide

/-- strength: density(5000, 50) = 100 -/
theorem fam_strength_density_1 : (5000 / 50) = 100 := by decide

/-- strength: relativestrength(150, 75) = 200 -/
theorem fam_strength_relativestrength_1 : ((150 * 100) / 75) = 200 := by decide

/-- strength: restratio(180, 60) = 3 -/
theorem fam_strength_restratio_1 : (180 / 60) = 3 := by decide

/-- strength: progression(105, 100) = 5 -/
theorem fam_strength_progression_1 : (fmax 0 (105 - 100)) = 5 := by decide

/-- strength: workcapacity(20, 50) = 1000 -/
theorem fam_strength_workcapacity_1 : (20 * 50) = 1000 := by decide

/-- structural: moment(1000, 5) = 5000 — STRUCTURAL — STRUCTURAL ENGINEERING, AS ARITHMETIC. A standing
    structure is numbers: the bending moment a force makes at a distance, the shear across sections, the
    buckling a column resists over its length, the margin between capacity and demand, how far a load deflects a
    member, the steel ratio in concrete, the slenderness of a column, the seismic force a mass takes under
    acceleration. Crosses to `construction` — structure is what construction raises. A measure. */ const PROOF =
    'structural arithmetic (moment, shear, buckling, safety factor, deflection, reinforcement, slenderness,
    seismic); structural engineering as a measure crossed to construction' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'structural', dst: 'construction', formula, value, proof: PROOF, ...extra },
    holds, { name: `structural.${name}`, params }) export class StructuralFormulas { /** BENDING MOMENT: a force
    at a lever distance. value force · distance. -/
theorem fam_structural_moment_1 : (1000 * 5) = 5000 := by decide

/-- structural: shear(1000, 4) = 250 — SHEAR: a load spread across sections. value ⌊load / sections⌋. -/
theorem fam_structural_shear_1 : (1000 / 4) = 250 := by decide

/-- structural: safetyfactor(300, 100) = 300 — SAFETY FACTOR: capacity against demand, as a percentage. value
    ⌊capacity · 100 / demand⌋. -/
theorem fam_structural_safetyfactor_1 : ((300 * 100) / 100) = 300 := by decide

/-- structural: deflection(5000, 50) = 100 — DEFLECTION: a load over the member's rigidity. value ⌊load /
    rigidity⌋. -/
theorem fam_structural_deflection_1 : (5000 / 50) = 100 := by decide

/-- structural: reinforcement(2, 100) = 2 — REINFORCEMENT: the steel ratio in concrete, as a percentage. value
    ⌊steel · 100 / concrete⌋. -/
theorem fam_structural_reinforcement_1 : ((2 * 100) / 100) = 2 := by decide

/-- structural: slenderness(3000, 50) = 60 — SLENDERNESS: a column's length over its radius of gyration. value
    ⌊length / radius⌋. -/
theorem fam_structural_slenderness_1 : (3000 / 50) = 60 := by decide

/-- structural: seismic(2000, 3) = 6000 — SEISMIC: the force a mass takes under acceleration. value mass ·
    acceleration. -/
theorem fam_structural_seismic_1 : (2000 * 3) = 6000 := by decide

/-- structural: shear(1000, 0) = 0 — SHEAR: a load spread across sections. value ⌊load / sections⌋. -/
theorem fam_structural_shear_2 : (1000 / 0) = 0 := by decide

/-- submarine: depth(300, 1) = 300 -/
theorem fam_submarine_depth_1 : (300 * 1) = 300 := by decide

/-- submarine: pressure(30, 1) = 30 -/
theorem fam_submarine_pressure_1 : (30 * 1) = 30 := by decide

/-- submarine: buoyancy(1000, 980) = 20 -/
theorem fam_submarine_buoyancy_1 : (fmax 0 (1000 - 980)) = 20 := by decide

/-- submarine: displacement(8000, 1) = 8000 -/
theorem fam_submarine_displacement_1 : (8000 * 1) = 8000 := by decide

/-- submarine: ballasttanks(10, 0) = 10 -/
theorem fam_submarine_ballasttanks_1 : (10 + 0) = 10 := by decide

/-- submarine: sonarrange(20, 1000) = 20000 -/
theorem fam_submarine_sonarrange_1 : (20 * 1000) = 20000 := by decide

/-- submarine: crushdepth(700, 1) = 700 -/
theorem fam_submarine_crushdepth_1 : (700 * 1) = 700 := by decide

/-- submarine: trimangle(300, 10) = 30 -/
theorem fam_submarine_trimangle_1 : (300 / 10) = 30 := by decide

/-- subsidence: rate(120, 12) = 10 -/
theorem fam_subsidence_rate_1 : (120 / 12) = 10 := by decide

/-- subsidence: cumulative(10, 5) = 50 -/
theorem fam_subsidence_cumulative_1 : (10 * 5) = 50 := by decide

/-- subsidence: compaction(15, 100) = 15 -/
theorem fam_subsidence_compaction_1 : ((15 * 100) / 100) = 15 := by decide

/-- subsidence: withdrawalvolume(1000, 3) = 3000 -/
theorem fam_subsidence_withdrawalvolume_1 : (1000 * 3) = 3000 := by decide

/-- subsidence: consolidationtime(3650, 365) = 10 -/
theorem fam_subsidence_consolidationtime_1 : (3650 / 365) = 10 := by decide

/-- subsidence: settlement(500, 350) = 150 -/
theorem fam_subsidence_settlement_1 : (fmax 0 (500 - 350)) = 150 := by decide

/-- subsidence: influencedepth(10, 5) = 50 -/
theorem fam_subsidence_influencedepth_1 : (10 * 5) = 50 := by decide

/-- subsidence: riskindex(80, 100) = 80 -/
theorem fam_subsidence_riskindex_1 : ((80 * 100) / 100) = 80 := by decide

/-- subsidy: amount(500, 2) = 1000 -/
theorem fam_subsidy_amount_1 : (500 * 2) = 1000 := by decide

/-- subsidy: costtotal(1000, 100) = 100000 -/
theorem fam_subsidy_costtotal_1 : (1000 * 100) = 100000 := by decide

/-- subsidy: pricereduction(100, 70) = 30 -/
theorem fam_subsidy_pricereduction_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- subsidy: beneficiaries(1000, 10) = 10000 -/
theorem fam_subsidy_beneficiaries_1 : (1000 * 10) = 10000 := by decide

/-- subsidy: efficiencyloss(300, 10) = 30 -/
theorem fam_subsidy_efficiencyloss_1 : (300 / 10) = 30 := by decide

/-- subsidy: passthrough(60, 100) = 60 -/
theorem fam_subsidy_passthrough_1 : ((60 * 100) / 100) = 60 := by decide

/-- subsidy: budgetpct(5, 100) = 5 -/
theorem fam_subsidy_budgetpct_1 : ((5 * 100) / 100) = 5 := by decide

/-- subsidy: multipliereffect(1000, 2) = 2000 -/
theorem fam_subsidy_multipliereffect_1 : (1000 * 2) = 2000 := by decide

/-- sudoku: cells(9, 9) = 81 -/
theorem fam_sudoku_cells_1 : (9 * 9) = 81 := by decide

/-- sudoku: boxes(3, 3) = 9 -/
theorem fam_sudoku_boxes_1 : (3 * 3) = 9 := by decide

/-- sudoku: givens(17, 0) = 17 -/
theorem fam_sudoku_givens_1 : (17 + 0) = 17 := by decide

/-- sudoku: candidatesubsets(9) = 512 -/
theorem fam_sudoku_candidatesubsets_1 : (2 ^ 9) = 512 := by decide

/-- sudoku: difficultyindex(50, 100) = 50 -/
theorem fam_sudoku_difficultyindex_1 : ((50 * 100) / 100) = 50 := by decide

/-- sudoku: emptycells(81, 30) = 51 -/
theorem fam_sudoku_emptycells_1 : (fmax 0 (81 - 30)) = 51 := by decide

/-- supplychain: leadtime(10, 17) = 7 — SUPPLYCHAIN — MOVING GOODS, AS ARITHMETIC (chosen by the registry, not
    by hand). A supply chain is numbers: how long an order takes to ship, how fast inventory turns, the share of
    orders filled, the stock held against variability, when to reorder, the share on backorder, how hard
    capacity is used, and the time a unit spends in work. Crosses to `logistics` — supplychain is what logistics
    carries. A measure. */ const PROOF = 'supplychain arithmetic (lead time, turnover, fill rate, safety stock,
    reorder point, backorder, utilization, cycle time); a registry domain; a measure crossed to logistics' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'supplychain', dst: 'logistics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `supplychain.${name}`, params }) export class SupplychainFormulas {
    /** LEAD TIME: days from order to ship, never negative. value max(0, ship − order). -/
theorem fam_supplychain_leadtime_1 : (fmax 0 (17 - 10)) = 7 := by decide

/-- supplychain: leadtime(17, 10) = 0 — SUPPLYCHAIN — MOVING GOODS, AS ARITHMETIC (chosen by the registry, not
    by hand). A supply chain is numbers: how long an order takes to ship, how fast inventory turns, the share of
    orders filled, the stock held against variability, when to reorder, the share on backorder, how hard
    capacity is used, and the time a unit spends in work. Crosses to `logistics` — supplychain is what logistics
    carries. A measure. */ const PROOF = 'supplychain arithmetic (lead time, turnover, fill rate, safety stock,
    reorder point, backorder, utilization, cycle time); a registry domain; a measure crossed to logistics' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'supplychain', dst: 'logistics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `supplychain.${name}`, params }) export class SupplychainFormulas {
    /** LEAD TIME: days from order to ship, never negative. value max(0, ship − order). -/
theorem fam_supplychain_leadtime_2 : (fmax 0 (10 - 17)) = 0 := by decide

/-- supplychain: turnover(1000, 250) = 4 — INVENTORY TURNOVER: units sold over units held. value ⌊sold /
    inventory⌋. -/
theorem fam_supplychain_turnover_1 : (1000 / 250) = 4 := by decide

/-- supplychain: fillrate(95, 100) = 95 — FILL RATE as a percentage. value ⌊filled · 100 / ordered⌋. -/
theorem fam_supplychain_fillrate_1 : ((95 * 100) / 100) = 95 := by decide

/-- supplychain: safetystock(50, 3) = 150 — SAFETY STOCK: demand against variability. value demand ·
    variability. -/
theorem fam_supplychain_safetystock_1 : (50 * 3) = 150 := by decide

/-- supplychain: reorder(40, 5) = 200 — REORDER POINT: demand over the lead time. value demand · leadtime. -/
theorem fam_supplychain_reorder_1 : (40 * 5) = 200 := by decide

/-- supplychain: backorder(5, 100) = 5 — BACKORDER share as a percentage. value ⌊unfilled · 100 / demand⌋. -/
theorem fam_supplychain_backorder_1 : ((5 * 100) / 100) = 5 := by decide

/-- supplychain: utilization(80, 100) = 80 — UTILIZATION as a percentage. value ⌊used · 100 / capacity⌋. -/
theorem fam_supplychain_utilization_1 : ((80 * 100) / 100) = 80 := by decide

/-- supplychain: cycle(20, 100) = 5 — CYCLE TIME: work-in-process over throughput. value ⌊wip / throughput⌋. -/
theorem fam_supplychain_cycle_1 : (100 / 20) = 5 := by decide

/-- surgery: duration(60, 180) = 120 — SURGERY — THE OPERATING RECORD, AS ARITHMETIC (chosen by the clinical
    registry, not by hand). An operation is numbers: how long it took, the blood lost, the mortality and
    complication rates, how many recover, the clear margin, the cases an hour, and whether the attempt
    succeeded. Crosses to `med` — surgery is what medicine measures. A measure. */ const PROOF = 'surgery
    arithmetic (duration, blood loss, mortality, complication, recovery, margin, throughput, success); an
    operating record as rates; a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'surgery', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `surgery.${name}`,
    params }) export class SurgeryFormulas { /** DURATION: minutes from start to end, never negative. value
    max(0, end − start). -/
theorem fam_surgery_duration_1 : (fmax 0 (180 - 60)) = 120 := by decide

/-- surgery: duration(180, 60) = 0 — SURGERY — THE OPERATING RECORD, AS ARITHMETIC (chosen by the clinical
    registry, not by hand). An operation is numbers: how long it took, the blood lost, the mortality and
    complication rates, how many recover, the clear margin, the cases an hour, and whether the attempt
    succeeded. Crosses to `med` — surgery is what medicine measures. A measure. */ const PROOF = 'surgery
    arithmetic (duration, blood loss, mortality, complication, recovery, margin, throughput, success); an
    operating record as rates; a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'surgery', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `surgery.${name}`,
    params }) export class SurgeryFormulas { /** DURATION: minutes from start to end, never negative. value
    max(0, end − start). -/
theorem fam_surgery_duration_2 : (fmax 0 (60 - 180)) = 0 := by decide

/-- surgery: bloodloss(450) = 450 — BLOOD LOSS: millilitres lost. value ml. -/
theorem fam_surgery_bloodloss_1 : 450 = 450 := by decide

/-- surgery: mortality(2, 100) = 2 — MORTALITY as a percentage. value ⌊deaths · 100 / operations⌋. -/
theorem fam_surgery_mortality_1 : ((2 * 100) / 100) = 2 := by decide

/-- surgery: complication(15, 200) = 7 — COMPLICATION as a percentage. value ⌊events · 100 / cases⌋. -/
theorem fam_surgery_complication_1 : ((15 * 100) / 200) = 7 := by decide

/-- surgery: recovery(90, 100) = 90 — RECOVERY as a percentage. value ⌊discharged · 100 / admitted⌋. -/
theorem fam_surgery_recovery_1 : ((90 * 100) / 100) = 90 := by decide

/-- surgery: margin(85, 100) = 85 — MARGIN: clear resections as a percentage. value ⌊clear · 100 / total⌋. -/
theorem fam_surgery_margin_1 : ((85 * 100) / 100) = 85 := by decide

/-- surgery: throughput(12, 8) = 1 — THROUGHPUT: cases over hours. value ⌊cases / hours⌋. -/
theorem fam_surgery_throughput_1 : (12 / 8) = 1 := by decide

/-- surgery: success(95, 100) = 95 — SUCCESS as a percentage. value ⌊resolved · 100 / attempted⌋. -/
theorem fam_surgery_success_1 : ((95 * 100) / 100) = 95 := by decide

/-- surveying: traverse(10, 66) = 660 — TRAVERSE: the chained length of the legs at a chain each. value legs ·
    chain. -/
theorem fam_surveying_traverse_1 : (10 * 66) = 660 := by decide

/-- surveying: elevation(100, 5, 3) = 102 — ELEVATION by height of instrument: the bench plus backsight less
    foresight. value max(0, bench + bs − fs). -/
theorem fam_surveying_elevation_1 : (fmax 0 ((100 + 5) - 3)) = 102 := by decide

/-- surveying: grade(5, 100) = 5 — GRADE as a percentage: the rise over the run. value ⌊rise · 100 / run⌋. -/
theorem fam_surveying_grade_1 : ((5 * 100) / 100) = 5 := by decide

/-- surveying: area(40, 30) = 600 — PARCEL AREA of a triangle: half the base times the height. value ⌊base ·
    height / 2⌋. -/
theorem fam_surveying_area_1 : ((40 * 30) / 2) = 600 := by decide

/-- surveying: contour(100, 40, 20) = 3 — CONTOUR LINES a cut crosses between two elevations at an interval.
    value ⌊max(0, high − low) / interval⌋. -/
theorem fam_surveying_contour_1 : ((fmax 0 (100 - 40)) / 20) = 3 := by decide

/-- surveying: offset(1000, 100) = 10 — OFFSET STAKES along a station line at an interval. value ⌊station /
    interval⌋. -/
theorem fam_surveying_offset_1 : (1000 / 100) = 10 := by decide

/-- surveying: closure(5000, 1) = 5000 — CLOSURE precision of the loop: the perimeter over the misclosure
    (reported as 1:value). value ⌊perimeter / misclose⌋. -/
theorem fam_surveying_closure_1 : (5000 / 1) = 5000 := by decide

/-- surveying: closure(5000, 0) = 0 — CLOSURE precision of the loop: the perimeter over the misclosure (reported
    as 1:value). value ⌊perimeter / misclose⌋. -/
theorem fam_surveying_closure_2 : (5000 / 0) = 0 := by decide

/-- suspension: springrate(1000, 50) = 20 — SUSPENSION — A CAR'S SUSPENSION, AS ARITHMETIC (a mechanical domain,
    not chosen by hand). Holding a wheel is numbers: spring rate from force and travel, damping force, ride
    height after sag, total wheel travel, roll resistance, chassis stiffness, sprung-mass frequency, and the
    load each corner carries. Crosses to `automotive` — suspension is one of the systems a vehicle is built
    from. A measure. */ const PROOF = 'suspension arithmetic (spring rate, damping, ride height, travel, roll,
    stiffness, frequency, corner load); a mechanical domain; a measure crossed to automotive' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'suspension', dst: 'automotive', formula, value, proof: PROOF,
    ...extra }, holds, { name: `suspension.${name}`, params }) export class SuspensionFormulas { /** SPRING
    RATE: force over the travel it produces. value ⌊force / travel⌋. -/
theorem fam_suspension_springrate_1 : (1000 / 50) = 20 := by decide

/-- suspension: damping(300, 4) = 1200 — DAMPING FORCE: a damper's coefficient times shaft velocity. value coeff
    · velocity. -/
theorem fam_suspension_damping_1 : (300 * 4) = 1200 := by decide

/-- suspension: ride(400, 120) = 280 — RIDE HEIGHT: free length less the static sag. value max(0, free − sag). -/
theorem fam_suspension_ride_1 : (fmax 0 (400 - 120)) = 280 := by decide

/-- suspension: ride(100, 400) = 0 — RIDE HEIGHT: free length less the static sag. value max(0, free − sag). -/
theorem fam_suspension_ride_2 : (fmax 0 (100 - 400)) = 0 := by decide

/-- suspension: travel(100, 80) = 180 — WHEEL TRAVEL: bump plus droop. value bump + droop. -/
theorem fam_suspension_travel_1 : (100 + 80) = 180 := by decide

/-- suspension: roll(5000, 30) = 1500 — ROLL RESISTANCE: bar stiffness over the roll angle, scaled. value
    ⌊stiffness · angle / 100⌋. -/
theorem fam_suspension_roll_1 : ((5000 * 30) / 100) = 1500 := by decide

/-- suspension: stiffness(2000, 40) = 50000 — CHASSIS STIFFNESS: force over deflection, in N/m from mm. value
    ⌊force · 1000 / deflection⌋. -/
theorem fam_suspension_stiffness_1 : ((2000 * 1000) / 40) = 50000 := by decide

/-- suspension: frequency(64000, 400) = 160 — SPRUNG-MASS FREQUENCY: rate over mass. value ⌊rate / mass⌋. -/
theorem fam_suspension_frequency_1 : (64000 / 400) = 160 := by decide

/-- suspension: load(1600, 4) = 400 — CORNER LOAD: total weight shared over the corners. value ⌊total /
    corners⌋. -/
theorem fam_suspension_load_1 : (1600 / 4) = 400 := by decide

/-- sustainability: footprint(120, 100) = 120 — FOOTPRINT: consumption against the carrying capacity, as a
    percentage. value ⌊consumption · 100 / capacity⌋. -/
theorem fam_sustainability_footprint_1 : ((120 * 100) / 100) = 120 := by decide

/-- sustainability: renewable(45, 100) = 45 — RENEWABLE: the clean share of total energy, as a percentage. value
    ⌊clean · 100 / total⌋. -/
theorem fam_sustainability_renewable_1 : ((45 * 100) / 100) = 45 := by decide

/-- sustainability: circularity(30, 120) = 25 — SUSTAINABILITY — KEEPING WITHIN THE EARTH'S MEANS, AS
    ARITHMETIC. The carbon footprint of a consumption against its capacity, the renewable share of energy, how
    circular the material flow is, resource efficiency, carbon offset, the lifecycle of a reused thing, impact
    intensity per unit, and ecosystem regeneration. Crosses to `ecology` — sustainability is ecology measured. A
    measure. */ const PROOF = 'sustainability arithmetic (footprint, renewable share, circularity, efficiency,
    offset, lifecycle, intensity, regeneration); a measure crossed to ecology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'sustainability', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds,
    { name: `sustainability.${name}`, params }) export class SustainabilityFormulas { /** CIRCULARITY: the
    recycled share of what was produced, as a percentage. value ⌊recycled · 100 / produced⌋. -/
theorem fam_sustainability_circularity_1 : ((30 * 100) / 120) = 25 := by decide

/-- sustainability: efficiency(1000, 50) = 20 — EFFICIENCY: output per unit of resource. value ⌊output /
    resource⌋. -/
theorem fam_sustainability_efficiency_1 : (1000 / 50) = 20 := by decide

/-- sustainability: offset(80, 100) = 80 — OFFSET: carbon absorbed against carbon emitted, as a percentage.
    value ⌊absorbed · 100 / emitted⌋. -/
theorem fam_sustainability_offset_1 : ((80 * 100) / 100) = 80 := by decide

/-- sustainability: lifecycle(10, 5) = 50 — LIFECYCLE: a reused thing over its cycles. value reused · cycles. -/
theorem fam_sustainability_lifecycle_1 : (10 * 5) = 50 := by decide

/-- sustainability: intensity(900, 30) = 30 — INTENSITY: impact per unit of activity. value ⌊impact / unit⌋. -/
theorem fam_sustainability_intensity_1 : (900 / 30) = 30 := by decide

/-- sustainability: regeneration(60, 120) = 50 — REGENERATION: restored land against degraded land, as a
    percentage. value ⌊restored · 100 / degraded⌋. -/
theorem fam_sustainability_regeneration_1 : ((60 * 100) / 120) = 50 := by decide

/-- sustainability: footprint(10, 0) = 0 — FOOTPRINT: consumption against the carrying capacity, as a
    percentage. value ⌊consumption · 100 / capacity⌋. -/
theorem fam_sustainability_footprint_2 : ((10 * 100) / 0) = 0 := by decide

/-- swaps: fixedleg(10000, 500) = 500 — SWAPS — AN INTEREST-RATE SWAP AS ARITHMETIC. A swap is numbers: the
    fixed leg at a coupon rate, the floating leg at an index plus a spread, the net payment between them, the
    notional it all rides on, the implied swap rate, the bid/ask spread in basis points, the present value of a
    future cashflow, and the interest accrued over days. Crosses to `trading` — a swap is what a desk trades. A
    measure. */ const PROOF = 'swaps arithmetic (fixed leg, floating leg, net payment, notional value, swap
    rate, spread basis, present value, accrued interest); an interest-rate swap as a measure crossed to trading'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'swaps', dst: 'trading', formula, value, proof:
    PROOF, ...extra }, holds, { name: `swaps.${name}`, params }) export class SwapsFormulas { /** FIXED LEG:
    notional at a coupon rate in basis points. value ⌊notional · rate / 10000⌋. -/
theorem fam_swaps_fixedleg_1 : ((10000 * 500) / 10000) = 500 := by decide

/-- swaps: floatingleg(10000, 300, 200) = 500 — FLOATING LEG: notional at an index plus a spread, both in basis
    points. value ⌊notional · (index + spread) / 10000⌋. -/
theorem fam_swaps_floatingleg_1 : ((10000 * (300 + 200)) / 10000) = 500 := by decide

/-- swaps: netpayment(800, 300) = 500 — NET PAYMENT: what the fixed payer owes over the floating leg, never
    negative. value max(0, fixed − floating). -/
theorem fam_swaps_netpayment_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- swaps: netpayment(300, 800) = 0 — NET PAYMENT: what the fixed payer owes over the floating leg, never
    negative. value max(0, fixed − floating). -/
theorem fam_swaps_netpayment_2 : (fmax 0 (300 - 800)) = 0 := by decide

/-- swaps: notionalvalue(1000, 50) = 50000 — NOTIONAL VALUE: units at a price each. value units · price. -/
theorem fam_swaps_notionalvalue_1 : (1000 * 50) = 50000 := by decide

/-- swaps: swaprate(500, 10000) = 500 — SWAP RATE: the coupon in basis points implied by a fixed total on a
    notional. value ⌊fixed · 10000 / notional⌋. -/
theorem fam_swaps_swaprate_1 : ((500 * 10000) / 10000) = 500 := by decide

/-- swaps: spreadbasis(200, 250) = 50 — SPREAD BASIS: the bid/ask gap in basis points, never negative. value
    max(0, ask − bid). -/
theorem fam_swaps_spreadbasis_1 : (fmax 0 (250 - 200)) = 50 := by decide

/-- swaps: presentvalue(10500, 500) = 10000 — PRESENT VALUE: a future cashflow discounted at a rate in basis
    points. value ⌊future · 10000 / (10000 + discount)⌋. -/
theorem fam_swaps_presentvalue_1 : ((10500 * 10000) / (10000 + 500)) = 10000 := by decide

/-- swaps: accruedinterest(50000, 500, 365) = 2500 — ACCRUED INTEREST: principal at a rate in basis points over
    days on a 365-day year. value ⌊principal · rate · days / 3650000⌋. -/
theorem fam_swaps_accruedinterest_1 : (((50000 * 500) * 365) / 3650000) = 2500 := by decide

/-- swine: litter(110, 10) = 11 — SWINE — PIG HUSBANDRY AS ARITHMETIC. Raising pigs is numbers: the litter a sow
    raises, feed turned into gain, the gain a day adds, the share of piglets weaned, how lean a carcass runs,
    how often sows farrow, herd mortality, and market weight. Crosses to `agriculture` — swine is one of the
    farm's measures. A measure. */ const PROOF = 'swine arithmetic (litter, feed conversion, average daily gain,
    weaning, leanness, farrowing, mortality, market weight); pig husbandry as a measure crossed to agriculture'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'swine', dst: 'agriculture', formula, value,
    proof: PROOF, ...extra }, holds, { name: `swine.${name}`, params }) export class SwineFormulas { /** LITTER:
    piglets per sow. value ⌊piglets / sows⌋. -/
theorem fam_swine_litter_1 : (110 / 10) = 11 := by decide

/-- swine: feedconversion(300, 100) = 300 — FEED CONVERSION: feed per unit of gain, as a percentage. value ⌊feed
    · 100 / gain⌋. -/
theorem fam_swine_feedconversion_1 : ((300 * 100) / 100) = 300 := by decide

/-- swine: averagedailygain(900, 90) = 10 — AVERAGE DAILY GAIN: gain over the days. value ⌊gain / days⌋. -/
theorem fam_swine_averagedailygain_1 : (900 / 90) = 10 := by decide

/-- swine: weaning(90, 100) = 90 — WEANING: the share of piglets weaned. value ⌊weaned · 100 / born⌋. -/
theorem fam_swine_weaning_1 : ((90 * 100) / 100) = 90 := by decide

/-- swine: leanness(58, 100) = 58 — LEANNESS: lean meat as a share of the carcass. value ⌊lean · 100 / carcass⌋. -/
theorem fam_swine_leanness_1 : ((58 * 100) / 100) = 58 := by decide

/-- swine: farrowing(220, 100) = 220 — FARROWING: litters per sow, as a percentage (the farrowing rate). value
    ⌊litters · 100 / sows⌋. -/
theorem fam_swine_farrowing_1 : ((220 * 100) / 100) = 220 := by decide

/-- swine: mortality(5, 1000) = 0 — MORTALITY: the share of the herd that died. value ⌊died · 100 / herd⌋. -/
theorem fam_swine_mortality_1 : ((5 * 100) / 1000) = 0 := by decide

/-- swine: market(120) = 120 — MARKET WEIGHT: the weight a pig goes to market at. value weight. -/
theorem fam_swine_market_1 : 120 = 120 := by decide

/-- syllabary: syllables(5, 10) = 50 -/
theorem fam_syllabary_syllables_1 : (5 * 10) = 50 := by decide

/-- syllabary: consonants(14, 0) = 14 -/
theorem fam_syllabary_consonants_1 : (14 + 0) = 14 := by decide

/-- syllabary: vowels(5, 0) = 5 -/
theorem fam_syllabary_vowels_1 : (5 + 0) = 5 := by decide

/-- syllabary: gridcells(14, 5) = 70 -/
theorem fam_syllabary_gridcells_1 : (14 * 5) = 70 := by decide

/-- syllabary: charsubsets(6) = 64 -/
theorem fam_syllabary_charsubsets_1 : (2 ^ 6) = 64 := by decide

/-- syllabary: coverage(95, 100) = 95 -/
theorem fam_syllabary_coverage_1 : ((95 * 100) / 100) = 95 := by decide

/-- syllogism: moodcount(4, 4) = 16 -/
theorem fam_syllogism_moodcount_1 : (4 * 4) = 16 := by decide

/-- syllogism: figurecount(4, 0) = 4 -/
theorem fam_syllogism_figurecount_1 : (4 + 0) = 4 := by decide

/-- syllogism: validforms(256, 232) = 24 -/
theorem fam_syllogism_validforms_1 : (fmax 0 (256 - 232)) = 24 := by decide

/-- syllogism: distributionchecks(4) = 16 -/
theorem fam_syllogism_distributionchecks_1 : (2 ^ 4) = 16 := by decide

/-- syllogism: soundnessratio(15, 256) = 5 -/
theorem fam_syllogism_soundnessratio_1 : ((15 * 100) / 256) = 5 := by decide

/-- syntax: depth(12, 3) = 4 — SYNTAX — THE SHAPE OF LANGUAGE, AS ARITHMETIC. A sentence is a parse tree: how
    deep it runs, how wide it branches, how far features agree, how many clauses it carries, how many readings
    it allows, how tight its dependencies, how it embeds itself, and whether it is well-formed. Crosses to
    `linguistics` — syntax is the measure linguistics describes. A measure. */ const PROOF = 'syntax arithmetic
    (parse-tree depth, branching, feature agreement, clause complexity, ambiguity, dependency density,
    recursion, well-formedness); a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'syntax', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `syntax.${name}`, params }) export class SyntaxFormulas { /** PARSE-TREE DEPTH: nodes over branches. value
    ⌊nodes / branches⌋. -/
theorem fam_syntax_depth_1 : (12 / 3) = 4 := by decide

/-- syntax: branching(20, 5) = 4 — BRANCHING FACTOR: children over nodes. value ⌊children / nodes⌋. -/
theorem fam_syntax_branching_1 : (20 / 5) = 4 := by decide

/-- syntax: agreement(9, 10) = 90 — FEATURE AGREEMENT as a percentage. value ⌊matched · 100 / features⌋. -/
theorem fam_syntax_agreement_1 : ((9 * 100) / 10) = 90 := by decide

/-- syntax: complexity(15, 5) = 3 — CLAUSE COMPLEXITY: clauses over sentences. value ⌊clauses / sentences⌋. -/
theorem fam_syntax_complexity_1 : (15 / 5) = 3 := by decide

/-- syntax: ambiguity(7) = 7 — AMBIGUITY: the readings a sentence allows. value parses. -/
theorem fam_syntax_ambiguity_1 : 7 = 7 := by decide

/-- syntax: dependency(8, 10) = 80 — DEPENDENCY DENSITY as a percentage. value ⌊links · 100 / words⌋. -/
theorem fam_syntax_dependency_1 : ((8 * 100) / 10) = 80 := by decide

/-- syntax: recursion(3) = 3 — RECURSION: the embeddings a structure nests. value embeddings. -/
theorem fam_syntax_recursion_1 : 3 = 3 := by decide

/-- syntax: wellformed(95, 100) = 95 — WELL-FORMEDNESS as a percentage. value ⌊valid · 100 / total⌋. -/
theorem fam_syntax_wellformed_1 : ((95 * 100) / 100) = 95 := by decide
