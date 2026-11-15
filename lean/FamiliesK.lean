-- lean/FamiliesK.lean — GENERATED. THE FAMILIES, K — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- kalman: gain(3, 1) = 75 — KALMAN — THE RECURSIVE ESTIMATOR, AS ARITHMETIC. A filter is numbers: the gain
    that weighs a prediction against a measurement, the state carried forward, the estimate corrected, the error
    covariance shrunk, the innovation and the residual, the process noise accrued, and the steady-state gain it
    settles on. Crosses to `cybernetics` — a Kalman filter is feedback control made precise. A measure. */ const
    PROOF = 'kalman arithmetic (gain, predicted state, updated estimate, error covariance, innovation,
    measurement residual, process noise, steady-state gain); the recursive estimator as integers; a measure
    crossed to cybernetics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'kalman', dst:
    'cybernetics', formula, value, proof: PROOF, ...extra }, holds, { name: `kalman.${name}`, params }) export
    class KalmanFormulas { /** THE GAIN: how much of the innovation to trust, from prediction and measurement
    variance. value ⌊p · 100 / (p + r)⌋. -/
theorem fam_kalman_gain_1 : ((3 * 100) / (3 + 1)) = 75 := by decide

/-- kalman: predictedstate(100, 5, 2) = 110 — PREDICTED STATE: the state carried forward by the model. value x +
    u · dt. -/
theorem fam_kalman_predictedstate_1 : (100 + (5 * 2)) = 110 := by decide

/-- kalman: updatedestimate(100, 75, 8) = 106 — UPDATED ESTIMATE: the prediction corrected by a gained
    innovation. value pred + ⌊gain · innov / 100⌋. -/
theorem fam_kalman_updatedestimate_1 : (100 + ((75 * 8) / 100)) = 106 := by decide

/-- kalman: errorcovariance(80, 75) = 20 — ERROR COVARIANCE: the prior covariance shrunk by the gain. value
    ⌊(100 − gain) · p / 100⌋. -/
theorem fam_kalman_errorcovariance_1 : (((100 - 75) * 80) / 100) = 20 := by decide

/-- kalman: innovation(110, 100) = 10 — INNOVATION: the measurement surprise against the prediction. value
    max(0, measured − predicted). -/
theorem fam_kalman_innovation_1 : (fmax 0 (110 - 100)) = 10 := by decide

/-- kalman: measurementresidual(110, 106) = 4 — MEASUREMENT RESIDUAL: the measurement against the corrected
    estimate. value max(0, measured − estimate). -/
theorem fam_kalman_measurementresidual_1 : (fmax 0 (110 - 106)) = 4 := by decide

/-- kalman: processnoise(3, 4) = 12 — PROCESS NOISE: the noise accrued over the step. value q · dt. -/
theorem fam_kalman_processnoise_1 : (3 * 4) = 12 := by decide

/-- kalman: steadygain(2, 6) = 25 — STEADY-STATE GAIN: the gain the filter settles on from process and
    measurement noise. value ⌊q · 100 / (q + r)⌋. -/
theorem fam_kalman_steadygain_1 : ((2 * 100) / (2 + 6)) = 25 := by decide

/-- karst: cavelength(2000, 3) = 6000 -/
theorem fam_karst_cavelength_1 : (2000 * 3) = 6000 := by decide

/-- karst: dissolutionrate(100, 10) = 10 -/
theorem fam_karst_dissolutionrate_1 : (100 / 10) = 10 := by decide

/-- karst: sinkholedensity(500, 50) = 10 -/
theorem fam_karst_sinkholedensity_1 : (500 / 50) = 10 := by decide

/-- karst: porosity(30, 100) = 30 -/
theorem fam_karst_porosity_1 : ((30 * 100) / 100) = 30 := by decide

/-- karst: rechargerate(6000, 60) = 100 -/
theorem fam_karst_rechargerate_1 : (6000 / 60) = 100 := by decide

/-- karst: aquiferdepth(300, 50) = 250 -/
theorem fam_karst_aquiferdepth_1 : (fmax 0 (300 - 50)) = 250 := by decide

/-- kerning: pairadjust(120, 40) = 80 — KERNING — THE SPACING BETWEEN LETTERS, AS ARITHMETIC (in font design
    units, an em divided into 1000). Fitting type is numbers: a pair's adjustment, tracking across a run, a
    value as a per-mille ratio of the em, side bearings, the advance width, the space between words, total units
    for a count of ems, and the optical-size adjustment. Crosses to `typography` — kerning is what typography
    sets. A measure. */ const PROOF = 'kerning arithmetic (pair adjustment, tracking, em ratio, side bearing,
    advance width, word spacing, units, optical size); font design units with the em divided into 1000; a
    measure crossed to typography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'kerning', dst:
    'typography', formula, value, proof: PROOF, ...extra }, holds, { name: `kerning.${name}`, params }) export
    class KerningFormulas { /** PAIR ADJUSTMENT: default spacing pulled in by a kern, never below zero. value
    max(0, space − kern). -/
theorem fam_kerning_pairadjust_1 : (fmax 0 (120 - 40)) = 80 := by decide

/-- kerning: tracking(10, 20) = 200 — TRACKING: a per-glyph unit added across a run of glyphs. value glyphs ·
    units. -/
theorem fam_kerning_tracking_1 : (10 * 20) = 200 := by decide

/-- kerning: emratio(750, 1000) = 750 — EM RATIO: a part of the em as per-mille of the whole em. value ⌊part ·
    1000 / whole⌋. -/
theorem fam_kerning_emratio_1 : ((750 * 1000) / 1000) = 750 := by decide

/-- kerning: sidebearing(80, 80) = 160 — SIDE BEARING: the left and right bearings of a glyph. value left +
    right. -/
theorem fam_kerning_sidebearing_1 : (80 + 80) = 160 := by decide

/-- kerning: advancewidth(500, 80, 80) = 660 — ADVANCE WIDTH: the ink width plus both side bearings. value ink +
    left + right. -/
theorem fam_kerning_advancewidth_1 : ((500 + 80) + 80) = 660 := by decide

/-- kerning: wordspacing(5, 250) = 1000 — WORD SPACING: the gaps between words at a space each (one fewer gap
    than words). value max(0, words − 1) · space. -/
theorem fam_kerning_wordspacing_1 : ((fmax 0 (5 - 1)) * 250) = 1000 := by decide

/-- kerning: units(3, 1000) = 3000 — UNITS: the total design units for a count of ems at a units-per-em. value
    ems · upm. -/
theorem fam_kerning_units_1 : (3 * 1000) = 3000 := by decide

/-- kerning: optical(72, 950) = 68 — OPTICAL SIZE: a size scaled by a per-mille optical adjustment. value ⌊size
    · adjust / 1000⌋. -/
theorem fam_kerning_optical_1 : ((72 * 950) / 1000) = 68 := by decide

/-- kinematics: velocity(100, 20) = 5 — KINEMATICS — MOTION AS ARITHMETIC (chosen by the mechanics registry, not
    by hand). Moving bodies are numbers: speed over a distance, how fast speed itself changes, the ground
    covered, momentum and kinetic energy carried, a projectile's range, the fall under gravity, and the impulse
    of a force. Crosses to `gravity` — motion is what gravity acts on. A measure. */ const PROOF = 'kinematics
    arithmetic (velocity, acceleration, displacement, momentum, kinetic energy, projectile range, free fall,
    impulse); motion as integers; a measure crossed to gravity' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'kinematics', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name:
    `kinematics.${name}`, params }) export class KinematicsFormulas { /** VELOCITY: distance over time. value
    ⌊distance / time⌋. -/
theorem fam_kinematics_velocity_1 : (100 / 20) = 5 := by decide

/-- kinematics: acceleration(60, 12) = 5 — ACCELERATION: change in velocity over time. value ⌊velocity / time⌋. -/
theorem fam_kinematics_acceleration_1 : (60 / 12) = 5 := by decide

/-- kinematics: displacement(5, 20) = 100 — DISPLACEMENT: the ground covered at a velocity over time. value
    velocity · time. -/
theorem fam_kinematics_displacement_1 : (5 * 20) = 100 := by decide

/-- kinematics: momentum(10, 5) = 50 — MOMENTUM: mass carried at a velocity. value mass · velocity. -/
theorem fam_kinematics_momentum_1 : (10 * 5) = 50 := by decide

/-- kinematics: impulse(20, 5) = 100 — IMPULSE: a force applied over time. value force · time. -/
theorem fam_kinematics_impulse_1 : (20 * 5) = 100 := by decide

/-- kinematics: velocity(100, 0) = 0 — KINEMATICS — MOTION AS ARITHMETIC (chosen by the mechanics registry, not
    by hand). Moving bodies are numbers: speed over a distance, how fast speed itself changes, the ground
    covered, momentum and kinetic energy carried, a projectile's range, the fall under gravity, and the impulse
    of a force. Crosses to `gravity` — motion is what gravity acts on. A measure. */ const PROOF = 'kinematics
    arithmetic (velocity, acceleration, displacement, momentum, kinetic energy, projectile range, free fall,
    impulse); motion as integers; a measure crossed to gravity' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'kinematics', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name:
    `kinematics.${name}`, params }) export class KinematicsFormulas { /** VELOCITY: distance over time. value
    ⌊distance / time⌋. -/
theorem fam_kinematics_velocity_2 : (100 / 0) = 0 := by decide

/-- kinesiology: rangeofmotion(150, 20) = 130 — KINESIOLOGY — HUMAN MOVEMENT AS ARITHMETIC (chosen by the
    registry, not by hand). Motion is numbers: the range a joint travels, flexion and extension of an angle, the
    fraction of muscle fibres recruited, the angle at a joint, the torque a muscle makes at its moment arm, how
    far a muscle shortens, and whether sway stays inside a limit. Crosses to `anatomy` — kinesiology is movement
    of the body anatomy describes. A measure. */ const PROOF = 'kinesiology arithmetic (range of motion,
    flexion, extension, muscle activation, joint angle, moment-arm torque, contraction, balance); movement of
    the anatomy; a measure crossed to anatomy' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'kinesiology', dst: 'anatomy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `kinesiology.${name}`, params }) export class KinesiologyFormulas { /** RANGE OF MOTION: the degrees a joint
    travels, extension limit minus flexion limit. value max(0, max − min). -/
theorem fam_kinesiology_rangeofmotion_1 : (fmax 0 (150 - 20)) = 130 := by decide

/-- kinesiology: flexion(30, 60) = 90 — FLEXION: bending adds degrees to a joint angle. value angle + delta. -/
theorem fam_kinesiology_flexion_1 : (30 + 60) = 90 := by decide

/-- kinesiology: extension(90, 30) = 60 — EXTENSION: straightening removes degrees from a joint angle. value
    max(0, angle − delta). -/
theorem fam_kinesiology_extension_1 : (fmax 0 (90 - 30)) = 60 := by decide

/-- kinesiology: muscleactivation(300, 400) = 75 — MUSCLE ACTIVATION: the percentage of fibres recruited. value
    ⌊active · 100 / total⌋. -/
theorem fam_kinesiology_muscleactivation_1 : ((300 * 100) / 400) = 75 := by decide

/-- kinesiology: jointangle(360, 4) = 90 — JOINT ANGLE: a travelled arc shared over its segments. value ⌊total /
    count⌋. -/
theorem fam_kinesiology_jointangle_1 : (360 / 4) = 90 := by decide

/-- kinesiology: momentarm(50, 12) = 600 — MOMENT ARM: the torque a force makes at a lever distance. value force
    · distance. -/
theorem fam_kinesiology_momentarm_1 : (50 * 12) = 600 := by decide

/-- kinesiology: contraction(100, 70) = 30 — CONTRACTION: how far a muscle shortens from rest. value max(0, rest
    − current). -/
theorem fam_kinesiology_contraction_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- kinship: coefficientrelatedness(2) = 250 — KINSHIP — BLOOD RELATION AS ARITHMETIC (the genealogy of a
    pedigree reduced to exact counts). How close two people are is numbers: the coefficient of relatedness that
    halves each generation, the generations between them, the degree a cousin is removed, the coefficient of
    inbreeding over a loop, the descendants a line produces, the ancestors a generation holds, the degree of
    cousinhood, and the depth of a lineage in years. Crosses to `sociology` — kinship is the atom society is
    built on. A measure. */ const PROOF = 'kinship arithmetic (relatedness per-mille, generation distance,
    degree removed, consanguinity, descendants, ancestors, cousin degree, lineage depth); blood relation reduced
    to exact counts; a measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'kinship', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `kinship.${name}`, params }) export class KinshipFormulas { /** COEFFICIENT OF RELATEDNESS in per-mille,
    halving once per meiosis (generation). value ⌊1000 / 2^gen⌋. -/
theorem fam_kinship_coefficientrelatedness_1 : (1000 / (2 ^ 2)) = 250 := by decide

/-- kinship: coefficientrelatedness(1) = 500 — KINSHIP — BLOOD RELATION AS ARITHMETIC (the genealogy of a
    pedigree reduced to exact counts). How close two people are is numbers: the coefficient of relatedness that
    halves each generation, the generations between them, the degree a cousin is removed, the coefficient of
    inbreeding over a loop, the descendants a line produces, the ancestors a generation holds, the degree of
    cousinhood, and the depth of a lineage in years. Crosses to `sociology` — kinship is the atom society is
    built on. A measure. */ const PROOF = 'kinship arithmetic (relatedness per-mille, generation distance,
    degree removed, consanguinity, descendants, ancestors, cousin degree, lineage depth); blood relation reduced
    to exact counts; a measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'kinship', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `kinship.${name}`, params }) export class KinshipFormulas { /** COEFFICIENT OF RELATEDNESS in per-mille,
    halving once per meiosis (generation). value ⌊1000 / 2^gen⌋. -/
theorem fam_kinship_coefficientrelatedness_2 : (1000 / (2 ^ 1)) = 500 := by decide

/-- kinship: generationdistance(2, 6) = 4 — GENERATION DISTANCE: the generations from an ancestor down to a
    descendant. value max(0, descendant − ancestor). -/
theorem fam_kinship_generationdistance_1 : (fmax 0 (6 - 2)) = 4 := by decide

/-- kinship: degreeremoval(3, 5) = 2 — DEGREE OF REMOVAL between two cousins: the gap in their generations from
    the common ancestor. value max − min. -/
theorem fam_kinship_degreeremoval_1 : ((fmax 3 5) - (fmin 3 5)) = 2 := by decide

/-- kinship: consanguinity(3, 2) = 250 — CONSANGUINITY: the coefficient of inbreeding in per-mille over `loops`
    ancestral loops of a path of length `pathlen`. value loops · ⌊1000 / 2^pathlen⌋. -/
theorem fam_kinship_consanguinity_1 : (2 * (1000 / (2 ^ 3))) = 250 := by decide

/-- kinship: descendants(2, 4) = 16 — DESCENDANTS at a generation with a fixed branching factor. value
    children^gens. -/
theorem fam_kinship_descendants_1 : (2 ^ 4) = 16 := by decide

/-- kinship: ancestorcount(5) = 32 — ANCESTORS a generation back: two parents per person, doubling. value 2^gen. -/
theorem fam_kinship_ancestorcount_1 : (2 ^ 5) = 32 := by decide

/-- kinship: cousindegree(4) = 3 — COUSIN DEGREE: first cousins share grandparents (gen 2), so the degree is one
    less than the shared generation. value max(0, gen − 1). -/
theorem fam_kinship_cousindegree_1 : (fmax 0 (4 - 1)) = 3 := by decide

/-- kinship: lineagedepth(1900, 2000, 25) = 4 — LINEAGE DEPTH: the generations a lineage spans in years, at a
    fixed generation span. value ⌊max(0, end − start) / span⌋. -/
theorem fam_kinship_lineagedepth_1 : ((fmax 0 (2000 - 1900)) / 25) = 4 := by decide

/-- knitting: gauge(22, 10) = 22 — KNITTING — FABRIC FORMATION AS ARITHMETIC. A knit is a grid of loops: the
    gauge (stitches per 10 cm), the courses (rows per 10 cm), the wales a width carries, the stitches a piece
    holds, the yarn each loop spends, the tightness of that loop, the loops a machine makes, and the finished
    weight (gsm). Crosses to `materials` — knitting is what a material becomes. A measure. */ const PROOF =
    'knitting arithmetic (gauge, courses, wales, stitch count, loop length, tightness, productivity, gsm); loops
    on a grid of yarn; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'knitting', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `knitting.${name}`, params }) export class KnittingFormulas { /** GAUGE: stitches measured over a width,
    scaled to 10 cm. value ⌊stitches · 10 / cm⌋. -/
theorem fam_knitting_gauge_1 : ((22 * 10) / 10) = 22 := by decide

/-- knitting: courses(30, 10) = 30 — COURSES: rows measured over a length, scaled to 10 cm. value ⌊rows · 10 /
    cm⌋. -/
theorem fam_knitting_courses_1 : ((30 * 10) / 10) = 30 := by decide

/-- knitting: wales(3, 40) = 120 — WALES: the stitch columns a width carries at a per-cm density. value perCm ·
    width. -/
theorem fam_knitting_wales_1 : (3 * 40) = 120 := by decide

/-- knitting: stitch(120, 150) = 18000 — STITCH COUNT: the loops in a rectangular piece, wales by courses. value
    wales · courses. -/
theorem fam_knitting_stitch_1 : (120 * 150) = 18000 := by decide

/-- knitting: looplength(6000, 1000) = 6 — LOOP LENGTH: millimetres of yarn spent per loop. value ⌊yarn /
    stitches⌋. -/
theorem fam_knitting_looplength_1 : (6000 / 1000) = 6 := by decide

/-- knitting: tightness(200, 5) = 40 — TIGHTNESS: the loop's tightness index, yarn fineness over loop length.
    value ⌊tex / looplen⌋. -/
theorem fam_knitting_tightness_1 : (200 / 5) = 40 := by decide

/-- knitting: productivity(84, 20, 60) = 100800 — PRODUCTIVITY: the loops a machine makes, needles turning at an
    rpm for the minutes run. value needles · rpm · minutes. -/
theorem fam_knitting_productivity_1 : ((84 * 20) * 60) = 100800 := by decide

/-- knitting: gsm(50, 2500) = 200 — GSM: finished weight, grams spread over an area (cm²), scaled to a square
    metre. value ⌊mass · 10000 / area⌋. -/
theorem fam_knitting_gsm_1 : ((50 * 10000) / 2500) = 200 := by decide

/-- knot: crossingnumber(3, 2) = 3 — KNOT — KNOT THEORY AS ARITHMETIC (chosen by the registry, not by hand). A
    knot is numbers: the crossings a diagram cannot shed, the genus of its Seifert surface, the bridges, the
    writhe, the moves to the unknot, the link components, the determinant, and the sticks of a polygonal
    realization. Crosses to `topology` — a knot is a topological invariant. A measure. */ const PROOF = 'knot
    arithmetic (crossing number, genus, bridge number, writhe, unknotting number, components, determinant, stick
    count); torus-knot and Seifert invariants; a measure crossed to topology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'knot', dst: 'topology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `knot.${name}`, params }) export class KnotFormulas { /** CROSSING NUMBER of the torus knot T(p, q): the
    crossings no diagram can shed. value min(p·(q−1), q·(p−1)). -/
theorem fam_knot_crossingnumber_1 : (fmin (3 * (2 - 1)) (2 * (3 - 1))) = 3 := by decide

/-- knot: genus(3, 2) = 1 — SEIFERT GENUS from the crossings c and Seifert circles s. value ⌊(c − s + 1) / 2⌋. -/
theorem fam_knot_genus_1 : (((3 - 2) + 1) / 2) = 1 := by decide

/-- knot: bridgenumber(2, 3) = 2 — BRIDGE NUMBER of the torus knot T(p, q): the maximal overpasses. value min(p,
    q). -/
theorem fam_knot_bridgenumber_1 : (fmin 2 3) = 2 := by decide

/-- knot: writhe(5, 2) = 3 — WRITHE: the net sign of the crossings, positive over negative. value max(0, pos −
    neg). -/
theorem fam_knot_writhe_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- knot: writhe(2, 5) = 0 — WRITHE: the net sign of the crossings, positive over negative. value max(0, pos −
    neg). -/
theorem fam_knot_writhe_2 : (fmax 0 (2 - 5)) = 0 := by decide

/-- knot: determinant(1) = 3 — DETERMINANT of the twist knot: an odd invariant of the twists. value 2·twists +
    1. -/
theorem fam_knot_determinant_1 : ((2 * 1) + 1) = 3 := by decide

/-- knot: stickcount(3) = 6 — STICK NUMBER: the sticks of a polygonal realization from the crossings. value
    crossings + 3. -/
theorem fam_knot_stickcount_1 : (3 + 3) = 6 := by decide

/-- kyc: completeness(18, 20) = 90 — KYC — KNOWING A CUSTOMER BEFORE SERVING THEM, AS ARITHMETIC (chosen by the
    registry, not by hand). Due diligence is numbers: how complete the collected record is, how much of it
    screens clean against sanctions and PEP lists, the customer's risk rating, whether a transaction is
    reportable, whether enhanced diligence is required, how much of the beneficial ownership is identified, how
    long until the next periodic review, and the ongoing monitoring cadence. It INVOLVES OTHER FAMILIES:
    completeness is built on what `identity` verified; the risk rating is an `audit` score; the
    reportable-transaction test is an `econ` threshold. Crosses to `law` — KYC is what the law requires before
    service, as the FATF Recommendations and AML/CFT regimes write it. A measure, never a legal conclusion. */
    const PROOF = 'kyc arithmetic (record completeness, sanctions/PEP screening, customer risk rating,
    reportable transaction, enhanced diligence, beneficial ownership coverage, review expiry, monitoring
    cadence); it involves identity (verified record), audit (risk score) and econ (reportable threshold); the
    FATF/AML due-diligence a law requires before service, a measure crossed to law — never a legal conclusion'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'kyc', dst: 'law', formula, value, proof: PROOF,
    ...extra }, holds, { name: `kyc.${name}`, params }) export class KycFormulas { /** COMPLETENESS as a
    percentage: CDD fields verified over fields required (built on what identity verified). value ⌊verified ·
    100 / required⌋. -/
theorem fam_kyc_completeness_1 : ((18 * 100) / 20) = 90 := by decide

/-- kyc: screening(3, 10000) = 3 — SCREENING in basis points: sanctions/PEP list hits over names checked. value
    ⌊hits · 10000 / checks⌋. -/
theorem fam_kyc_screening_1 : ((3 * 10000) / 10000) = 3 := by decide

/-- kyc: risk(7, 10) = 70 — RISK RATING as a percentage: risk flags raised over factors assessed (an audit
    score). value ⌊flags · 100 / factors⌋. -/
theorem fam_kyc_risk_1 : ((7 * 100) / 10) = 70 := by decide

/-- kyc: ubo(4, 5) = 80 — BENEFICIAL OWNERSHIP as a percentage: ultimate owners identified over owners above the
    control threshold. value ⌊identified · 100 / owners⌋. -/
theorem fam_kyc_ubo_1 : ((4 * 100) / 5) = 80 := by decide

/-- kyc: expiry(365, 100) = 265 — REVIEW EXPIRY: days remaining until the next periodic review. value max(0,
    valid − elapsed). -/
theorem fam_kyc_expiry_1 : (fmax 0 (365 - 100)) = 265 := by decide

/-- kyc: expiry(100, 365) = 0 — REVIEW EXPIRY: days remaining until the next periodic review. value max(0, valid
    − elapsed). -/
theorem fam_kyc_expiry_2 : (fmax 0 (100 - 365)) = 0 := by decide

/-- kyc: monitoring(12, 4) = 3 — MONITORING cadence: reviews performed over monitoring periods. value ⌊reviews /
    periods⌋. -/
theorem fam_kyc_monitoring_1 : (12 / 4) = 3 := by decide
