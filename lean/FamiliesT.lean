-- lean/FamiliesT.lean — GENERATED. THE FAMILIES, T — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- tanning: offer(15, 100) = 15 — TANNING — TURNING HIDE INTO LEATHER, AS ARITHMETIC. The tannery is numbers:
    the agent offered on hide weight, how much of it the collagen takes up, the float the bath floats the hide
    in, the basicity of the chrome complex, how far the hide shrinks, the thickness a split leaves, the area of
    a hide, and how deep the tan penetrated. Crosses to `chemistry` — tanning is collagen chemistry made to
    hold. A measure. */ const PROOF = 'tanning arithmetic (agent offer, uptake, float, chrome basicity,
    shrinkage, split thickness, hide area, penetration); hide becomes leather by collagen chemistry; a measure
    crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tanning', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `tanning.${name}`, params }) export class
    TanningFormulas { /** OFFER: tanning agent as a percentage of hide weight. value ⌊agent · 100 / weight⌋. -/
theorem fam_tanning_offer_1 : ((15 * 100) / 100) = 15 := by decide

/-- tanning: uptake(15, 3) = 12 — UPTAKE: agent the collagen takes up, offered less what stays in the float.
    value max(0, offered − residual). -/
theorem fam_tanning_uptake_1 : (fmax 0 (15 - 3)) = 12 := by decide

/-- tanning: uptake(3, 15) = 0 — UPTAKE: agent the collagen takes up, offered less what stays in the float.
    value max(0, offered − residual). -/
theorem fam_tanning_uptake_2 : (fmax 0 (3 - 15)) = 0 := by decide

/-- tanning: float(200, 100) = 200 — FLOAT: the bath water as a percentage of hide weight. value ⌊water · 100 /
    weight⌋. -/
theorem fam_tanning_float_1 : ((200 * 100) / 100) = 200 := by decide

/-- tanning: basicity(99, 100) = 33 — BASICITY: hydroxide bound of the three Cr(III) valences, as a percentage.
    value ⌊oh · 100 / (cr · 3)⌋. -/
theorem fam_tanning_basicity_1 : ((99 * 100) / (100 * 3)) = 33 := by decide

/-- tanning: shrinkage(100, 70) = 30 — SHRINKAGE: how far the hide shrank from its raw size. value max(0, before
    − after). -/
theorem fam_tanning_shrinkage_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- tanning: thickness(30, 3) = 10 — THICKNESS: even thickness a split leaves over the layers. value ⌊total /
    layers⌋. -/
theorem fam_tanning_thickness_1 : (30 / 3) = 10 := by decide

/-- tanning: area(200, 150) = 30000 — AREA: the hide area, length by width. value length · width. -/
theorem fam_tanning_area_1 : (200 * 150) = 30000 := by decide

/-- tanning: penetration(80, 100) = 80 — PENETRATION: how far the tan reached into the cross-section, as a
    percentage. value ⌊depth · 100 / total⌋. -/
theorem fam_tanning_penetration_1 : ((80 * 100) / 100) = 80 := by decide

/-- taoism: principles(2, 0) = 2 -/
theorem fam_taoism_principles_1 : (2 + 0) = 2 := by decide

/-- taoism: hexagrams(8, 8) = 64 -/
theorem fam_taoism_hexagrams_1 : (8 * 8) = 64 := by decide

/-- taoism: virtuecount(3, 0) = 3 -/
theorem fam_taoism_virtuecount_1 : (3 + 0) = 3 := by decide

/-- taoism: chaptercount(81, 1) = 81 -/
theorem fam_taoism_chaptercount_1 : (81 * 1) = 81 := by decide

/-- taoism: balanceratio(50, 100) = 50 -/
theorem fam_taoism_balanceratio_1 : ((50 * 100) / 100) = 50 := by decide

/-- tariff: ratepct(25, 100) = 25 -/
theorem fam_tariff_ratepct_1 : ((25 * 100) / 100) = 25 := by decide

/-- tariff: revenue(1000, 25) = 25000 -/
theorem fam_tariff_revenue_1 : (1000 * 25) = 25000 := by decide

/-- tariff: deadweightloss(500, 10) = 50 -/
theorem fam_tariff_deadweightloss_1 : (500 / 10) = 50 := by decide

/-- tariff: importprice(100, 25) = 125 -/
theorem fam_tariff_importprice_1 : (100 + 25) = 125 := by decide

/-- tariff: quotafill(80, 100) = 80 -/
theorem fam_tariff_quotafill_1 : ((80 * 100) / 100) = 80 := by decide

/-- tariff: protectioneffect(125, 100) = 25 -/
theorem fam_tariff_protectioneffect_1 : (fmax 0 (125 - 100)) = 25 := by decide

/-- tariff: schedulesubsets(5) = 32 -/
theorem fam_tariff_schedulesubsets_1 : (2 ^ 5) = 32 := by decide

/-- tariff: tradereduction(15, 100) = 15 -/
theorem fam_tariff_tradereduction_1 : ((15 * 100) / 100) = 15 := by decide

/-- taxation: income(50000, 20) = 10000 — TAXATION — WHAT A TAX SYSTEM OWES, AS ARITHMETIC (chosen by the public
    fiscal registry, not by hand). A tax system is numbers: income tax on earnings, VAT on a sale, the amount in
    a top bracket, taxable income after deductions, the effective rate, per-period withholding, the gain on a
    sale, and the final liability. Crosses to `econ` — taxation is the public side of the economy. A measure. */
    const PROOF = 'taxation arithmetic (income tax, VAT, top-bracket amount, taxable after deductions, effective
    rate, withholding, capital gain, liability); the public fiscal domain; a measure crossed to econ' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'taxation', dst: 'econ', formula, value, proof: PROOF, ...extra },
    holds, { name: `taxation.${name}`, params }) export class TaxationFormulas { /** INCOME TAX: gross earnings
    at a percentage rate. value ⌊gross · rate / 100⌋. -/
theorem fam_taxation_income_1 : ((50000 * 20) / 100) = 10000 := by decide

/-- taxation: vat(1000, 20) = 200 — VAT: value-added tax on a sale amount at a rate. value ⌊amount · rate /
    100⌋. -/
theorem fam_taxation_vat_1 : ((1000 * 20) / 100) = 200 := by decide

/-- taxation: bracket(60000, 50000) = 10000 — TOP BRACKET: income above a threshold. value max(0, income −
    threshold). -/
theorem fam_taxation_bracket_1 : (fmax 0 (60000 - 50000)) = 10000 := by decide

/-- taxation: bracket(40000, 50000) = 0 — TOP BRACKET: income above a threshold. value max(0, income −
    threshold). -/
theorem fam_taxation_bracket_2 : (fmax 0 (40000 - 50000)) = 0 := by decide

/-- taxation: deduction(50000, 12000) = 38000 — DEDUCTION: taxable income after deductions. value max(0, gross −
    deductions). -/
theorem fam_taxation_deduction_1 : (fmax 0 (50000 - 12000)) = 38000 := by decide

/-- taxation: effective(10000, 50000) = 20 — EFFECTIVE RATE as a percentage of income. value ⌊tax · 100 /
    income⌋. -/
theorem fam_taxation_effective_1 : ((10000 * 100) / 50000) = 20 := by decide

/-- taxation: withholding(52000, 12) = 4333 — WITHHOLDING: annual salary split over pay periods. value ⌊salary /
    periods⌋. -/
theorem fam_taxation_withholding_1 : (52000 / 12) = 4333 := by decide

/-- taxation: capitalgains(15000, 10000) = 5000 — CAPITAL GAIN: sale price above the cost basis. value max(0,
    sale − basis). -/
theorem fam_taxation_capitalgains_1 : (fmax 0 (15000 - 10000)) = 5000 := by decide

/-- taxation: liability(38000, 25) = 9500 — LIABILITY: taxable income at a rate. value ⌊taxable · rate / 100⌋. -/
theorem fam_taxation_liability_1 : ((38000 * 25) / 100) = 9500 := by decide

/-- tectonics: spreadingrate(100, 2) = 50 — TECTONICS — PLATE MOTION AS ARITHMETIC (chosen by the registry, not
    by hand). Moving plates are numbers: how fast a ridge spreads, strain accumulated over time, total
    displacement, slip released per event, two plates' convergence, net elevation after erosion, stress on a
    fault, and a plate's velocity. Crosses to `seismology` — tectonics is what seismology records. A measure. */
    const PROOF = 'tectonics arithmetic (spreading rate, strain rate, displacement, slip per event, convergence,
    elevation, fault stress, plate velocity); a plate-motion domain; a measure crossed to seismology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'tectonics', dst: 'seismology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `tectonics.${name}`, params }) export class TectonicsFormulas { /** SPREADING
    RATE: distance opened over the years. value ⌊distance / years⌋. -/
theorem fam_tectonics_spreadingrate_1 : (100 / 2) = 50 := by decide

/-- tectonics: straindrate(5, 50) = 10 — STRAIN RATE: strain accumulated per unit time, scaled by a hundred.
    value ⌊strain · 100 / time⌋. -/
theorem fam_tectonics_straindrate_1 : ((5 * 100) / 50) = 10 := by decide

/-- tectonics: displacement(50, 1000) = 50000 — DISPLACEMENT: a rate held over the years. value rate · years. -/
theorem fam_tectonics_displacement_1 : (50 * 1000) = 50000 := by decide

/-- tectonics: slip(1000, 8) = 125 — SLIP: total displacement released per event. value ⌊total / events⌋. -/
theorem fam_tectonics_slip_1 : (1000 / 8) = 125 := by decide

/-- tectonics: convergence(40, 30) = 70 — CONVERGENCE: two plates closing, their rates summed. value plateA +
    plateB. -/
theorem fam_tectonics_convergence_1 : (40 + 30) = 70 := by decide

/-- tectonics: elevation(100, 40) = 60 — ELEVATION: net uplift after erosion, never below zero. value max(0,
    uplift − erosion). -/
theorem fam_tectonics_elevation_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- tectonics: elevation(40, 100) = 0 — ELEVATION: net uplift after erosion, never below zero. value max(0,
    uplift − erosion). -/
theorem fam_tectonics_elevation_2 : (fmax 0 (40 - 100)) = 0 := by decide

/-- tectonics: stress(1000, 20) = 50 — STRESS: force borne over the fault area. value ⌊force / area⌋. -/
theorem fam_tectonics_stress_1 : (1000 / 20) = 50 := by decide

/-- tectonics: platevelocity(300, 6) = 50 — PLATE VELOCITY: distance travelled over the time taken. value
    ⌊distance / time⌋. -/
theorem fam_tectonics_platevelocity_1 : (300 / 6) = 50 := by decide

/-- telemetry: metrics(50, 30) = 80 -/
theorem fam_telemetry_metrics_1 : (50 + 30) = 80 := by decide

/-- telemetry: samplingrate(10, 100) = 10 -/
theorem fam_telemetry_samplingrate_1 : ((10 * 100) / 100) = 10 := by decide

/-- telemetry: cardinality(1000, 5) = 5000 -/
theorem fam_telemetry_cardinality_1 : (1000 * 5) = 5000 := by decide

/-- telemetry: retentiondays(30, 1) = 30 -/
theorem fam_telemetry_retentiondays_1 : (30 * 1) = 30 := by decide

/-- telemetry: dimensionsubsets(6) = 64 -/
theorem fam_telemetry_dimensionsubsets_1 : (2 ^ 6) = 64 := by decide

/-- telemetry: ingestrate(60000, 60) = 1000 -/
theorem fam_telemetry_ingestrate_1 : (60000 / 60) = 1000 := by decide

/-- teleology: endscount(3, 2) = 5 -/
theorem fam_teleology_endscount_1 : (3 + 2) = 5 := by decide

/-- teleology: causallevels(4, 0) = 4 -/
theorem fam_teleology_causallevels_1 : (4 + 0) = 4 := by decide

/-- teleology: finalcauses(4, 1) = 4 -/
theorem fam_teleology_finalcauses_1 : (4 * 1) = 4 := by decide

/-- teleology: purposesubsets(4) = 16 -/
theorem fam_teleology_purposesubsets_1 : (2 ^ 4) = 16 := by decide

/-- teleology: directednessratio(80, 100) = 80 -/
theorem fam_teleology_directednessratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- tennis: firstserve(60, 100) = 60 — TENNIS — THE MATCH AS ARITHMETIC. A point is numbers: first serves
    landed, aces off serves, break points converted, winners against errors, rally length, sets dominance, serve
    speed, return percentage. Crosses to `sports` — tennis is one game the sports domain scores. A measure. */
    const PROOF = 'tennis arithmetic (first-serve %, ace rate, break points, winner/error, rally length,
    dominance, serve speed, return %); a match as a measure crossed to sports' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'tennis', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name:
    `tennis.${name}`, params }) export class TennisFormulas { /** FIRST SERVE percentage: serves in over serves
    attempted. value ⌊in · 100 / attempted⌋. -/
theorem fam_tennis_firstserve_1 : ((60 * 100) / 100) = 60 := by decide

/-- tennis: acerate(10, 80) = 12 — ACE RATE: aces over serves. value ⌊aces · 100 / serves⌋. -/
theorem fam_tennis_acerate_1 : ((10 * 100) / 80) = 12 := by decide

/-- tennis: breakpoints(3, 8) = 37 — BREAK POINTS: converted over chances. value ⌊converted · 100 / chances⌋. -/
theorem fam_tennis_breakpoints_1 : ((3 * 100) / 8) = 37 := by decide

/-- tennis: winners(40, 20) = 200 — WINNERS against errors. value ⌊winners · 100 / errors⌋. -/
theorem fam_tennis_winners_1 : ((40 * 100) / 20) = 200 := by decide

/-- tennis: rally(400, 100) = 4 — RALLY length: shots over points. value ⌊shots / points⌋. -/
theorem fam_tennis_rally_1 : (400 / 100) = 4 := by decide

/-- tennis: dominance(6, 10) = 60 — DOMINANCE: games won over games played. value ⌊won · 100 / played⌋. -/
theorem fam_tennis_dominance_1 : ((6 * 100) / 10) = 60 := by decide

/-- tennis: servespeed(200) = 200 — SERVE SPEED in km/h. value kmh. -/
theorem fam_tennis_servespeed_1 : 200 = 200 := by decide

/-- tennis: returnpct(30, 50) = 60 — RETURN percentage: returned over faced. value ⌊returned · 100 / faced⌋. -/
theorem fam_tennis_returnpct_1 : ((30 * 100) / 50) = 60 := by decide

/-- teratology: malformationrate(3, 100) = 3 -/
theorem fam_teratology_malformationrate_1 : ((3 * 100) / 100) = 3 := by decide

/-- teratology: criticalwindows(3, 5) = 8 -/
theorem fam_teratology_criticalwindows_1 : (3 + 5) = 8 := by decide

/-- teratology: doseresponse(1000, 10) = 100 -/
theorem fam_teratology_doseresponse_1 : (1000 / 10) = 100 := by decide

/-- teratology: riskindex(5, 4) = 20 -/
theorem fam_teratology_riskindex_1 : (5 * 4) = 20 := by decide

/-- teratology: thresholddose(500, 350) = 150 -/
theorem fam_teratology_thresholddose_1 : (fmax 0 (500 - 350)) = 150 := by decide

/-- teratology: incidence(2, 100) = 2 -/
theorem fam_teratology_incidence_1 : ((2 * 100) / 100) = 2 := by decide

/-- testing: coverage(850, 1000) = 85 — TESTING — THE DISCIPLINE OF VERIFICATION, AS ARITHMETIC. A test suite is
    numbers: how much of the code it covers, how many of its runs pass, how often it flakes, the defect density
    per KLOC, how much a change regresses, assertions per test, the mutants it kills, and how long it takes.
    Crosses to `code` — testing is what proves code. A measure. */ const PROOF = 'testing arithmetic (coverage,
    pass rate, flakiness, defect density, regression, assertions, mutation score, duration); the discipline of
    verification as numbers; a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'testing', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `testing.${name}`,
    params }) export class TestingFormulas { /** COVERAGE: the covered lines as a percentage of the total. value
    ⌊covered · 100 / total⌋. -/
theorem fam_testing_coverage_1 : ((850 * 100) / 1000) = 85 := by decide

/-- testing: passrate(495, 500) = 99 — PASS RATE: the passed runs as a percentage of the total. value ⌊passed ·
    100 / total⌋. -/
theorem fam_testing_passrate_1 : ((495 * 100) / 500) = 99 := by decide

/-- testing: flakiness(3, 100) = 3 — FLAKINESS: the flaky runs as a percentage of all runs. value ⌊flaky · 100 /
    runs⌋. -/
theorem fam_testing_flakiness_1 : ((3 * 100) / 100) = 3 := by decide

/-- testing: defects(12, 8000) = 1 — DEFECT DENSITY: the defects found per KLOC. value ⌊found · 1000 / size⌋. -/
theorem fam_testing_defects_1 : ((12 * 1000) / 8000) = 1 := by decide

/-- testing: regression(2, 40) = 5 — REGRESSION: the broken cases as a percentage of the changed. value ⌊broken
    · 100 / changed⌋. -/
theorem fam_testing_regression_1 : ((2 * 100) / 40) = 5 := by decide

/-- testing: assertions(900, 300) = 3 — ASSERTIONS: the assertions per test. value ⌊count / tests⌋. -/
theorem fam_testing_assertions_1 : (900 / 300) = 3 := by decide

/-- testing: mutation(76, 100) = 76 — MUTATION SCORE: the killed mutants as a percentage of all mutants. value
    ⌊killed · 100 / mutants⌋. -/
theorem fam_testing_mutation_1 : ((76 * 100) / 100) = 76 := by decide

/-- testing: duration(4200) = 4200 — DURATION: the suite's wall-clock milliseconds. value milliseconds. -/
theorem fam_testing_duration_1 : 4200 = 4200 := by decide

/-- textiles: threadcount(80, 60) = 140 — TEXTILES — CLOTH AS ARITHMETIC. Weaving and fabric are numbers:
    threads per inch, weight per area, how hard a cloth pulls before it tears, how far it stretches, the count
    of a yarn, how much it shrinks in the wash, how closely the weave covers, and how it drapes. Crosses to
    `materials` — textiles are what materials are made into. A measure. */ const PROOF = 'textiles arithmetic
    (thread count, GSM weight, tensile, elongation, yarn count, shrinkage, coverage, drape); cloth as a measure
    crossed to materials' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'textiles', dst:
    'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `textiles.${name}`, params }) export
    class TextilesFormulas { /** THREAD COUNT: warp plus weft threads per inch. value warp + weft. -/
theorem fam_textiles_threadcount_1 : (80 + 60) = 140 := by decide

/-- textiles: gsm(500, 2) = 250 — GSM: grams of mass over the area it covers. value ⌊mass / area⌋. -/
theorem fam_textiles_gsm_1 : (500 / 2) = 250 := by decide

/-- textiles: tensile(1000, 50) = 20 — TENSILE strength: breaking force over the width that bore it. value
    ⌊force / width⌋. -/
theorem fam_textiles_tensile_1 : (1000 / 50) = 20 := by decide

/-- textiles: elongation(120, 100) = 20 — ELONGATION as a percentage: how far it stretched past its original
    length. value ⌊(stretched − original) · 100 / original⌋. -/
theorem fam_textiles_elongation_1 : (((120 - 100) * 100) / 100) = 20 := by decide

/-- textiles: yarn(1000, 10) = 100 — YARN count: length over weight, a count proxy. value ⌊length / weight⌋. -/
theorem fam_textiles_yarn_1 : (1000 / 10) = 100 := by decide

/-- textiles: shrinkage(100, 95) = 5 — SHRINKAGE as a percentage: how much it lost in the wash. value ⌊(before −
    after) · 100 / before⌋. -/
theorem fam_textiles_shrinkage_1 : (((100 - 95) * 100) / 100) = 5 := by decide

/-- textiles: coverage(90, 10) = 90 — COVERAGE as a percentage: yarn against the gaps it leaves. value ⌊yarns ·
    100 / (yarns + gaps)⌋. -/
theorem fam_textiles_coverage_1 : ((90 * 100) / (90 + 10)) = 90 := by decide

/-- textiles: drape(50, 100) = 50 — DRAPE: how far it bends against its stiffness. value ⌊bending · 100 /
    stiffness⌋. -/
theorem fam_textiles_drape_1 : ((50 * 100) / 100) = 50 := by decide

/-- theatre: acts(3, 2) = 5 -/
theorem fam_theatre_acts_1 : (3 + 2) = 5 := by decide

/-- theatre: castsize(12, 2) = 24 -/
theorem fam_theatre_castsize_1 : (12 * 2) = 24 := by decide

/-- theatre: runtime(120, 1) = 120 -/
theorem fam_theatre_runtime_1 : (120 * 1) = 120 := by decide

/-- theatre: setsubsets(5) = 32 -/
theorem fam_theatre_setsubsets_1 : (2 ^ 5) = 32 := by decide

/-- theatre: attendanceratio(85, 100) = 85 -/
theorem fam_theatre_attendanceratio_1 : ((85 * 100) / 100) = 85 := by decide

/-- thermochemistry: enthalpy(2, 286) = 572 — THERMOCHEMISTRY — THE HEAT OF REACTIONS, AS ARITHMETIC (the energy
    a reaction gives or takes, counted exactly). Enthalpy scales with moles, entropy is heat over temperature,
    Gibbs is what is left after the temperature claims the entropy, the heat capacity is heat per degree,
    calorimetry is mass · heat · rise, bond energy sums the bonds, Hess's law sums the steps, and the activation
    energy is the hill a reaction climbs. Crosses to `chemistry` — thermochemistry is chemistry's energy. A
    measure. */ const PROOF = 'thermochemistry arithmetic (enthalpy, entropy, Gibbs free energy, heat capacity,
    calorimetry, bond energy, Hess\'s law, activation energy); the heat of reactions as exact integers; a
    measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'thermochemistry', dst:
    'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `thermochemistry.${name}`, params })
    export class ThermochemistryFormulas { /** ENTHALPY: the heat of a reaction over its moles. value moles ·
    deltaH. -/
theorem fam_thermochemistry_enthalpy_1 : (2 * 286) = 572 := by decide

/-- thermochemistry: entropy(900, 300) = 3 — ENTROPY: heat spread over temperature. value ⌊heat / temp⌋. -/
theorem fam_thermochemistry_entropy_1 : (900 / 300) = 3 := by decide

/-- thermochemistry: gibbs(1000, 300, 2) = 400 — GIBBS FREE ENERGY: what the enthalpy keeps after the
    temperature claims the entropy. value max(0, deltaH − temp · deltaS). -/
theorem fam_thermochemistry_gibbs_1 : (fmax 0 (1000 - (300 * 2))) = 400 := by decide

/-- thermochemistry: gibbs(500, 300, 2) = 0 — GIBBS FREE ENERGY: what the enthalpy keeps after the temperature
    claims the entropy. value max(0, deltaH − temp · deltaS). -/
theorem fam_thermochemistry_gibbs_2 : (fmax 0 (500 - (300 * 2))) = 0 := by decide

/-- thermochemistry: heatcapacity(400, 8) = 50 — HEAT CAPACITY: heat per degree of rise. value ⌊heat /
    deltaTemp⌋. -/
theorem fam_thermochemistry_heatcapacity_1 : (400 / 8) = 50 := by decide

/-- thermochemistry: calorimetry(100, 4, 25) = 10000 — CALORIMETRY: the heat a mass takes to rise. value mass ·
    specific · deltaTemp. -/
theorem fam_thermochemistry_calorimetry_1 : ((100 * 4) * 25) = 10000 := by decide

/-- thermochemistry: bondenergy(4, 413) = 1652 — BOND ENERGY: the energy held in equal bonds. value bonds ·
    energy. -/
theorem fam_thermochemistry_bondenergy_1 : (4 * 413) = 1652 := by decide

/-- thermochemistry: hesslaw(100, 200, 300) = 600 — HESS'S LAW: the path's enthalpy is the sum of its steps.
    value step1 + step2 + step3. -/
theorem fam_thermochemistry_hesslaw_1 : ((100 + 200) + 300) = 600 := by decide

/-- thermochemistry: activationenergy(150, 50) = 100 — ACTIVATION ENERGY: the hill from forward over reverse
    barriers. value max(0, forward − reverse). -/
theorem fam_thermochemistry_activationenergy_1 : (fmax 0 (150 - 50)) = 100 := by decide

/-- thermochemistry: activationenergy(50, 150) = 0 — ACTIVATION ENERGY: the hill from forward over reverse
    barriers. value max(0, forward − reverse). -/
theorem fam_thermochemistry_activationenergy_2 : (fmax 0 (50 - 150)) = 0 := by decide

/-- thermocouple: emf(41, 100) = 4100 — THERMOCOUPLE — A SENSOR, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A junction of two metals is a voltage: the Seebeck emf for a temperature difference,
    the temperature read back from that emf, the cold-junction offset, sensitivity, a linear fit, quantiser
    resolution, drift compensation, and the measured span. Crosses to `electronics` — a thermocouple is what an
    electronics front-end reads. A measure. */ const PROOF = 'thermocouple arithmetic (Seebeck emf, temperature,
    cold-junction, sensitivity, linearization, resolution, drift, range span); a sensor chosen by the public-API
    registry; a measure crossed to electronics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'thermocouple', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `thermocouple.${name}`, params }) export class ThermocoupleFormulas { /** SEEBECK EMF: the Seebeck
    coefficient over a temperature difference. value seebeck · deltaT. -/
theorem fam_thermocouple_emf_1 : (41 * 100) = 4100 := by decide

/-- thermocouple: temperature(4100, 41) = 100 — TEMPERATURE: the temperature read back from an emf at a
    coefficient. value ⌊emf / seebeck⌋. -/
theorem fam_thermocouple_temperature_1 : (4100 / 41) = 100 := by decide

/-- thermocouple: coldjunction(250, 25) = 225 — COLD JUNCTION: the hot-minus-cold compensation offset. value
    max(0, hot − cold). -/
theorem fam_thermocouple_coldjunction_1 : (fmax 0 (250 - 25)) = 225 := by decide

/-- thermocouple: sensitivity(4100, 100) = 41 — SENSITIVITY: change in emf over change in temperature. value
    ⌊deltaEmf / deltaT⌋. -/
theorem fam_thermocouple_sensitivity_1 : (4100 / 100) = 41 := by decide

/-- thermocouple: linearization(41, 100, 5) = 4105 — LINEARIZATION: a first-order fit, slope · x plus offset.
    value a · x + b. -/
theorem fam_thermocouple_linearization_1 : ((41 * 100) + 5) = 4105 := by decide

/-- thermocouple: resolution(4096, 16) = 256 — RESOLUTION: the measured range split over the quantiser levels.
    value ⌊range / levels⌋. -/
theorem fam_thermocouple_resolution_1 : (4096 / 16) = 256 := by decide

/-- thermocouple: driftcompensation(4100, 50) = 4050 — DRIFT COMPENSATION: the measured value less its drift.
    value max(0, measured − drift). -/
theorem fam_thermocouple_driftcompensation_1 : (fmax 0 (4100 - 50)) = 4050 := by decide

/-- thermocouple: rangespan(1370, 0) = 1370 — RANGE SPAN: the span between the maximum and minimum of the range.
    value max(0, max − min). -/
theorem fam_thermocouple_rangespan_1 : (fmax 0 (1370 - 0)) = 1370 := by decide

/-- thermocouple: temperature(100, 0) = 0 — TEMPERATURE: the temperature read back from an emf at a coefficient.
    value ⌊emf / seebeck⌋. -/
theorem fam_thermocouple_temperature_2 : (100 / 0) = 0 := by decide

/-- thermodynamics: carnot(400, 300) = 25 — THERMODYNAMICS — RUNNING HEAT AS ARITHMETIC. The physics of engines
    and flow is numbers: Carnot efficiency from the two reservoirs, pressure-volume work, the efficiency of any
    output over its input, entropy as heat over temperature, heat flow by conductivity and gradient, a heat
    pump's coefficient of performance, thermal expansion, and the first law's change in internal energy. Crosses
    to `heat` — the unit that prices erasure by Landauer at the core temperature. A measure. */ const PROOF =
    'thermodynamics arithmetic (carnot efficiency, pv work, efficiency, entropy, heat flow, cop, expansion,
    first-law internal energy, gibbs free energy); a measure crossed to heat' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'thermodynamics', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, {
    name: `thermodynamics.${name}`, params }) export class ThermodynamicsFormulas { /** CARNOT EFFICIENCY: the
    ceiling set by the two reservoirs, as a percentage. value ⌊(hot − cold) · 100 / hot⌋. -/
theorem fam_thermodynamics_carnot_1 : (((400 - 300) * 100) / 400) = 25 := by decide

/-- thermodynamics: work(100, 5) = 500 — WORK: pressure through a volume. value pressure · volume. -/
theorem fam_thermodynamics_work_1 : (100 * 5) = 500 := by decide

/-- thermodynamics: efficiency(40, 100) = 40 — EFFICIENCY: output over input, as a percentage. value ⌊output ·
    100 / input⌋. -/
theorem fam_thermodynamics_efficiency_1 : ((40 * 100) / 100) = 40 := by decide

/-- thermodynamics: entropy(1000, 250) = 4 — ENTROPY: heat over temperature. value ⌊heat / temperature⌋. -/
theorem fam_thermodynamics_entropy_1 : (1000 / 250) = 4 := by decide

/-- thermodynamics: heatflow(50, 8) = 400 — HEAT FLOW: conductivity across a gradient. value conductivity ·
    gradient. -/
theorem fam_thermodynamics_heatflow_1 : (50 * 8) = 400 := by decide

/-- thermodynamics: cop(300, 100) = 300 — COEFFICIENT OF PERFORMANCE: heat moved per unit work, ×100. value
    ⌊heat · 100 / work⌋. -/
theorem fam_thermodynamics_cop_1 : ((300 * 100) / 100) = 300 := by decide

/-- thermodynamics: expansion(1000, 7) = 1007 — THERMAL EXPANSION: an initial length grown by a delta. value
    initial + delta. -/
theorem fam_thermodynamics_expansion_1 : (1000 + 7) = 1007 := by decide

/-- thermodynamics: internal(500, 200) = 300 — FIRST LAW: the change in internal energy, ΔU = Q − W, floored at
    zero. value max(0, heat − work). -/
theorem fam_thermodynamics_internal_1 : (fmax 0 (500 - 200)) = 300 := by decide

/-- thermodynamics: internal(200, 500) = 0 — FIRST LAW: the change in internal energy, ΔU = Q − W, floored at
    zero. value max(0, heat − work). -/
theorem fam_thermodynamics_internal_2 : (fmax 0 (200 - 500)) = 0 := by decide

/-- thermodynamics: gibbs(1000, 300) = 700 — GIBBS FREE ENERGY: the work left once the bound heat is taken from
    the enthalpy, max(0, enthalpy − heat) — the same ledger the recognition keeps, where the enthalpy is the
    document and the heat is the reply it dissipates (gibbsFreeOf). -/
theorem fam_thermodynamics_gibbs_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- thermodynamics: gibbs(300, 1000) = 0 — GIBBS FREE ENERGY: the work left once the bound heat is taken from
    the enthalpy, max(0, enthalpy − heat) — the same ledger the recognition keeps, where the enthalpy is the
    document and the heat is the reply it dissipates (gibbsFreeOf). -/
theorem fam_thermodynamics_gibbs_2 : (fmax 0 (300 - 1000)) = 0 := by decide

/-- throughput: goodput(6000, 60) = 100 — THROUGHPUT — MOVING BITS, AS ARITHMETIC. Carrying a load across a link
    is numbers: the useful bits per second, how much of the pipe is in use, the bandwidth-delay product, the
    rate left after loss, the header overhead, the window a path wants, whether the link is saturated, and how
    efficient the carry is. Crosses to `networking` — throughput is what the network delivers. A measure. */
    const PROOF = 'throughput arithmetic (goodput, utilization, bandwidth-delay, effective rate, overhead,
    window, saturation, efficiency); moving bits across a link; a measure crossed to networking' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'throughput', dst: 'networking', formula, value, proof: PROOF,
    ...extra }, holds, { name: `throughput.${name}`, params }) export class ThroughputFormulas { /** GOODPUT:
    useful payload bits over the time taken. value ⌊payload / time⌋. -/
theorem fam_throughput_goodput_1 : (6000 / 60) = 100 := by decide

/-- throughput: utilization(750, 1000) = 75 — UTILIZATION: how much of the capacity is in use, as a percentage.
    value ⌊used · 100 / capacity⌋. -/
theorem fam_throughput_utilization_1 : ((750 * 100) / 1000) = 75 := by decide

/-- throughput: bandwidthdelay(100, 50) = 5000 — BANDWIDTH-DELAY PRODUCT: the bits in flight on a path. value
    bandwidth · delay. -/
theorem fam_throughput_bandwidthdelay_1 : (100 * 50) = 5000 := by decide

/-- throughput: effectiverate(1000, 50) = 950 — EFFECTIVE RATE: the rate left after loss. value max(0, sent −
    lost). -/
theorem fam_throughput_effectiverate_1 : (fmax 0 (1000 - 50)) = 950 := by decide

/-- throughput: overheadratio(40, 1000) = 4 — OVERHEAD RATIO: header bytes against payload, as a percentage.
    value ⌊header · 100 / payload⌋. -/
theorem fam_throughput_overheadratio_1 : ((40 * 100) / 1000) = 4 := by decide

/-- throughput: efficiency(90, 100) = 90 — EFFICIENCY: goodput against the raw line rate, as a percentage. value
    ⌊good · 100 / raw⌋. -/
theorem fam_throughput_efficiency_1 : ((90 * 100) / 100) = 90 := by decide

/-- throwing: range(20, 15) = 300 -/
theorem fam_throwing_range_1 : (20 * 15) = 300 := by decide

/-- throwing: releasevelocity(600, 30) = 20 -/
theorem fam_throwing_releasevelocity_1 : (600 / 30) = 20 := by decide

/-- throwing: flighttime(100, 10) = 10 -/
theorem fam_throwing_flighttime_1 : (100 / 10) = 10 := by decide

/-- throwing: spin(8, 50) = 400 -/
theorem fam_throwing_spin_1 : (8 * 50) = 400 := by decide

/-- throwing: momentum(2, 30) = 60 -/
theorem fam_throwing_momentum_1 : (2 * 30) = 60 := by decide

/-- throwing: peakheight(900, 4) = 225 -/
theorem fam_throwing_peakheight_1 : (900 / 4) = 225 := by decide

/-- throwing: effortratio(80, 100) = 80 -/
theorem fam_throwing_effortratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- throwing: distancegain(300, 250) = 50 -/
theorem fam_throwing_distancegain_1 : (fmax 0 (300 - 250)) = 50 := by decide

/-- tides: amplitude(264) = 132 — TIDES — THE RISE AND FALL OF THE SEA, AS ARITHMETIC. A tide is numbers: the
    range between high and low water, the spring tide when sun and moon pull together, the neap tide when they
    pull apart, the period of a cycle, the amplitude of the swing, the mean sea level, the flow rate through a
    channel, and a harmonic constituent. Crosses to `oceanography` — tides are what oceanography measures. A
    measure. */ const PROOF = 'tides arithmetic (range, spring tide, neap tide, period, amplitude, mean sea
    level, flow rate, harmonic constituent); the rise and fall of the sea as integers; a measure crossed to
    oceanography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tides', dst: 'oceanography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `tides.${name}`, params }) export class
    TidesFormulas { /** AMPLITUDE: half of a tidal range. value ⌊range / 2⌋. -/
theorem fam_tides_amplitude_1 : (264 / 2) = 132 := by decide

/-- tides: flowrate(12000, 6) = 2000 — FLOW RATE: a volume through a channel over time. value ⌊volume / time⌋. -/
theorem fam_tides_flowrate_1 : (12000 / 6) = 2000 := by decide

/-- tides: harmonic(50, 4) = 200 — HARMONIC: a constituent is an amplitude taken a number of times. value
    amplitude · number. -/
theorem fam_tides_harmonic_1 : (50 * 4) = 200 := by decide

/-- tides: meanlevel(312, 48) = 180 — MEAN SEA LEVEL: the midpoint of high and low water. value ⌊(high + low) /
    2⌋. -/
theorem fam_tides_meanlevel_1 : ((312 + 48) / 2) = 180 := by decide

/-- tides: neaptide(90, 40) = 50 — NEAP TIDE: sun and moon at right angles; the lunar pull less the solar. value
    max(0, lunar − solar). -/
theorem fam_tides_neaptide_1 : (fmax 0 (90 - 40)) = 50 := by decide

/-- tides: period(24, 2) = 12 — PERIOD: the hours in a cycle over the number of cycles. value ⌊hours / cycles⌋. -/
theorem fam_tides_period_1 : (24 / 2) = 12 := by decide

/-- tides: range(312, 48) = 264 — RANGE: high water less low water. value max(0, high − low). -/
theorem fam_tides_range_1 : (fmax 0 (312 - 48)) = 264 := by decide

/-- tides: springtide(40, 90) = 130 — SPRING TIDE: sun and moon aligned; the pulls add. value solar + lunar. -/
theorem fam_tides_springtide_1 : (40 + 90) = 130 := by decide

/-- tides: neaptide(40, 90) = 0 — NEAP TIDE: sun and moon at right angles; the lunar pull less the solar. value
    max(0, lunar − solar). -/
theorem fam_tides_neaptide_2 : (fmax 0 (40 - 90)) = 0 := by decide

/-- tiling: tilecount(100, 50, 10) = 50 — TILING — COVERING THE PLANE, AS ARITHMETIC (how shapes fill a surface
    without gap or overlap). Running a tiling is numbers: the tiles a surface takes, how much it covers, the gap
    left, the interior angle at a vertex, the symmetry order of the pattern, the tiles per row, the offcut
    wasted, and how an aspect fits. Crosses to `geometry` — a tiling is geometry laid down on a surface. A
    measure. */ const PROOF = 'tiling arithmetic (tile count, coverage, gap ratio, vertex angle, symmetry order,
    row tiles, waste, aspect fit); covering the plane without gap or overlap; a measure crossed to geometry'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tiling', dst: 'geometry', formula, value, proof:
    PROOF, ...extra }, holds, { name: `tiling.${name}`, params }) export class TilingFormulas { /** TILE COUNT:
    square tiles of a side that cover a width·height surface. value ⌊width / side⌋ · ⌊height / side⌋. -/
theorem fam_tiling_tilecount_1 : ((100 / 10) * (50 / 10)) = 50 := by decide

/-- tiling: coverage(90, 100) = 90 — COVERAGE as a percentage of the surface. value ⌊covered · 100 / total⌋. -/
theorem fam_tiling_coverage_1 : ((90 * 100) / 100) = 90 := by decide

/-- tiling: gapratio(5, 200) = 2 — GAP RATIO: the uncovered part as a percentage. value ⌊gaps · 100 / total⌋. -/
theorem fam_tiling_gapratio_1 : ((5 * 100) / 200) = 2 := by decide

/-- tiling: vertexconfig(6) = 120 — VERTEX CONFIG: the interior angle of a regular n-gon meeting at a vertex.
    value ⌊(n − 2) · 180 / n⌋. -/
theorem fam_tiling_vertexconfig_1 : (((6 - 2) * 180) / 6) = 120 := by decide

/-- tiling: vertexconfig(4) = 90 — VERTEX CONFIG: the interior angle of a regular n-gon meeting at a vertex.
    value ⌊(n − 2) · 180 / n⌋. -/
theorem fam_tiling_vertexconfig_2 : (((4 - 2) * 180) / 4) = 90 := by decide

/-- tiling: symmetryorder(6) = 12 — SYMMETRY ORDER: the order of the dihedral symmetry group of an n-fold
    pattern. value 2 · n. -/
theorem fam_tiling_symmetryorder_1 : (2 * 6) = 12 := by decide

/-- tiling: rowtiles(1000, 25) = 40 — ROW TILES: tiles of a width that fit across a surface width. value ⌊width
    / tilewidth⌋. -/
theorem fam_tiling_rowtiles_1 : (1000 / 25) = 40 := by decide

/-- tiling: waste(1000, 850) = 150 — WASTE: the offcut left when a used part is taken from the total. value
    max(0, total − used). -/
theorem fam_tiling_waste_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- tiling: aspectfit(1600, 400) = 4 — ASPECT FIT: how many times a height divides a width. value ⌊width /
    height⌋. -/
theorem fam_tiling_aspectfit_1 : (1600 / 400) = 4 := by decide

/-- tillage: depth(3, 100) = 300 — TILLAGE — WORKING THE SOIL, AS ARITHMETIC (a field operation, not a stored
    row). Breaking ground is numbers: the depth worked, the passes to cover a field, residue left on the
    surface, fuel burned per hectare, how much soil is disturbed, the draft force an implement pulls, its
    effective working width, and the hectares an hour it turns over. Crosses to `agronomy` — tillage is what
    agronomy plans and judges. A measure. */ const PROOF = 'tillage arithmetic (worked depth, passes, residue
    cover, fuel per hectare, soil disturbance, draft force, working width, field capacity); a field operation
    measured, crossed to agronomy' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tillage', dst: 'agronomy',
    formula, value, proof: PROOF, ...extra }, holds, { name: `tillage.${name}`, params }) export class
    TillageFormulas { /** WORKED DEPTH: the depth each layer turns, over the layers worked. value layers ·
    perLayer. -/
theorem fam_tillage_depth_1 : (3 * 100) = 300 := by decide

/-- tillage: drafforce(3, 1200) = 3600 — DRAFT FORCE: the force an implement pulls at a per-metre soil
    resistance. value width · resistance. -/
theorem fam_tillage_drafforce_1 : (3 * 1200) = 3600 := by decide

/-- tillage: fieldcapacity(60, 6) = 10 — FIELD CAPACITY: hectares turned over per hour. value ⌊area / hours⌋. -/
theorem fam_tillage_fieldcapacity_1 : (60 / 6) = 10 := by decide

/-- tillage: fuelperhectare(300, 15) = 20 — FUEL PER HECTARE: fuel burned over the area worked. value ⌊fuel /
    area⌋. -/
theorem fam_tillage_fuelperhectare_1 : (300 / 15) = 20 := by decide

/-- tillage: residuecover(30, 100) = 30 — RESIDUE COVER as a percentage of the surface. value ⌊covered · 100 /
    total⌋. -/
theorem fam_tillage_residuecover_1 : ((30 * 100) / 100) = 30 := by decide

/-- tillage: soildisturbance(75, 100) = 75 — SOIL DISTURBANCE as a percentage of the width tilled. value
    ⌊disturbed · 100 / width⌋. -/
theorem fam_tillage_soildisturbance_1 : ((75 * 100) / 100) = 75 := by decide

/-- tillage: workingwidth(6, 1) = 5 — WORKING WIDTH: the effective width after overlap. value max(0, span −
    overlap). -/
theorem fam_tillage_workingwidth_1 : (fmax 0 (6 - 1)) = 5 := by decide

/-- tillage: workingwidth(2, 5) = 0 — WORKING WIDTH: the effective width after overlap. value max(0, span −
    overlap). -/
theorem fam_tillage_workingwidth_2 : (fmax 0 (2 - 5)) = 0 := by decide

/-- timbre: attacktime(441, 44100) = 10 — TIMBRE — THE COLOUR OF A SOUND, AS ARITHMETIC (what the ear hears past
    pitch and loudness). Timbre is numbers: how much energy sits high in the spectrum, how harmonic it is, where
    the spectral centre of mass falls, the odd-to-even balance, the attack in milliseconds, how far partials
    drift from their ideal, where the energy rolls off, and the Q of a formant. Crosses to `acoustics` — timbre
    is the perceived reading of what acoustics measures. A measure. */ const PROOF = 'timbre arithmetic
    (brightness, harmonic ratio, spectral centroid, odd/even balance, attack time, inharmonicity, rolloff,
    formant Q); the colour of a sound past pitch and loudness; a measure crossed to acoustics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'timbre', dst: 'acoustics', formula, value, proof: PROOF, ...extra
    }, holds, { name: `timbre.${name}`, params }) export class TimbreFormulas { /** ATTACK TIME: how long the
    onset takes, in milliseconds, from samples at a sample rate. value ⌊samples · 1000 / rate⌋. -/
theorem fam_timbre_attacktime_1 : ((441 * 1000) / 44100) = 10 := by decide

/-- timbre: brightness(300, 1000) = 30 — BRIGHTNESS: the percentage of spectral energy above the cutoff. value
    ⌊high · 100 / total⌋. -/
theorem fam_timbre_brightness_1 : ((300 * 100) / 1000) = 30 := by decide

/-- timbre: formant(2400, 80) = 30 — FORMANT: the Q of a formant, its centre frequency over its bandwidth. value
    ⌊freq / bandwidth⌋. -/
theorem fam_timbre_formant_1 : (2400 / 80) = 30 := by decide

/-- timbre: harmonicratio(800, 1000) = 80 — HARMONIC RATIO: the percentage of total energy that is harmonic.
    value ⌊harmonic · 100 / total⌋. -/
theorem fam_timbre_harmonicratio_1 : ((800 * 100) / 1000) = 80 := by decide

/-- timbre: inharmonicity(515, 500) = 30 — INHARMONICITY: how far a partial drifts above its ideal harmonic, in
    parts per thousand. value ⌊max(0, partial − ideal) · 1000 / ideal⌋. -/
theorem fam_timbre_inharmonicity_1 : (((fmax 0 (515 - 500)) * 1000) / 500) = 30 := by decide

/-- timbre: oddevenratio(300, 200) = 150 — ODD/EVEN BALANCE: odd-harmonic energy as a percentage of
    even-harmonic energy. value ⌊odd · 100 / even⌋. -/
theorem fam_timbre_oddevenratio_1 : ((300 * 100) / 200) = 150 := by decide

/-- timbre: rolloff(850, 1000) = 85 — ROLLOFF: the percentage of the spectrum below which the cumulative energy
    sits. value ⌊cumulative · 100 / total⌋. -/
theorem fam_timbre_rolloff_1 : ((850 * 100) / 1000) = 85 := by decide

/-- timbre: spectralcentroid(5000, 100) = 50 — SPECTRAL CENTROID: the energy-weighted centre of the spectrum.
    value ⌊weighted / total⌋. -/
theorem fam_timbre_spectralcentroid_1 : (5000 / 100) = 50 := by decide

/-- timeseries: movingaverage(100, 4) = 25 — TIMESERIES — A SEQUENCE OVER TIME, AS ARITHMETIC. A run of readings
    is numbers: the moving average over a window, the trend from first to last, a seasonal index against the
    mean, the autocorrelation at a lag, the lagged point, the exponentially smoothed value, the first
    difference, and the forecast a slope carries ahead. Crosses to `statistics` — a time series is what
    statistics summarises. A measure. */ const PROOF = 'timeseries arithmetic (moving average, trend, seasonal
    index, autocorrelation, lag, smoothing, differencing, forecast); a sequence over time; a measure crossed to
    statistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'timeseries', dst: 'statistics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `timeseries.${name}`, params }) export class
    TimeseriesFormulas { /** MOVING AVERAGE: a window's sum over its width. value ⌊sum / window⌋. -/
theorem fam_timeseries_movingaverage_1 : (100 / 4) = 25 := by decide

/-- timeseries: trend(50, 20) = 30 — TREND: the rise from the first reading to the last. value max(0, last −
    first). -/
theorem fam_timeseries_trend_1 : (fmax 0 (50 - 20)) = 30 := by decide

/-- timeseries: seasonalindex(120, 100) = 120 — SEASONAL INDEX: a reading against the mean, as a percentage.
    value ⌊observed · 100 / average⌋. -/
theorem fam_timeseries_seasonalindex_1 : ((120 * 100) / 100) = 120 := by decide

/-- timeseries: autocorrelation(80, 100) = 80 — AUTOCORRELATION at a lag: covariance over variance, as a
    percentage. value ⌊cov · 100 / variance⌋. -/
theorem fam_timeseries_autocorrelation_1 : ((80 * 100) / 100) = 80 := by decide

/-- timeseries: lag(100, 3) = 97 — LAG: the series shifted back by a number of periods. value max(0, series −
    shift). -/
theorem fam_timeseries_lag_1 : (fmax 0 (100 - 3)) = 97 := by decide

/-- timeseries: smoothing(100, 200, 50) = 150 — SMOOTHING: one exponential step, alpha as a percentage. value
    ⌊(alpha · cur + (100 − alpha) · prev) / 100⌋. -/
theorem fam_timeseries_smoothing_1 : (((50 * 200) + ((100 - 50) * 100)) / 100) = 150 := by decide

/-- timeseries: differencing(150, 100) = 50 — DIFFERENCING: the first difference between consecutive readings.
    value max(0, current − previous). -/
theorem fam_timeseries_differencing_1 : (fmax 0 (150 - 100)) = 50 := by decide

/-- timeseries: forecast(100, 5, 3) = 115 — FORECAST: a last reading carried ahead by a slope over steps. value
    last + slope · steps. -/
theorem fam_timeseries_forecast_1 : (100 + (5 * 3)) = 115 := by decide

/-- titration: equivalence(25, 2, 1) = 50 — TITRATION — VOLUMETRIC ANALYSIS, AS ARITHMETIC. A titration is
    numbers: the titrant volume to the equivalence point, an unknown concentration by dilution, the burette
    endpoint reading, normality from a molarity, the titer, the buffer ratio, the indicator midpoint, and the
    back-titration excess. Crosses to `chemistry` — titration is how a concentration is measured. A measure. */
    const PROOF = 'titration arithmetic (equivalence volume, unknown concentration, endpoint reading, normality,
    titer, buffer ratio, indicator midpoint, back-titration excess); a measure crossed to chemistry' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'titration', dst: 'chemistry', formula, value, proof: PROOF,
    ...extra }, holds, { name: `titration.${name}`, params }) export class TitrationFormulas { /** EQUIVALENCE:
    the titrant volume to neutralise the analyte (Va·Ca = Vb·Cb). value ⌊acidVol · acidConc / baseConc⌋. -/
theorem fam_titration_equivalence_1 : ((25 * 2) / 1) = 50 := by decide

/-- titration: concentration(20, 5, 10) = 10 — CONCENTRATION: an unknown concentration by dilution (C1·V1 =
    C2·V2). value ⌊vol1 · conc1 / vol2⌋. -/
theorem fam_titration_concentration_1 : ((20 * 5) / 10) = 10 := by decide

/-- titration: endpoint(5, 30) = 25 — ENDPOINT: the titrant delivered, from the burette readings. value max(0,
    final − initial). -/
theorem fam_titration_endpoint_1 : (fmax 0 (30 - 5)) = 25 := by decide

/-- titration: normality(2, 3) = 6 — NORMALITY: equivalents per litre, molarity times the n-factor. value
    molarity · nfactor. -/
theorem fam_titration_normality_1 : (2 * 3) = 6 := by decide

/-- titration: titer(1000, 25) = 40 — TITER: the analyte mass equivalent to a unit volume of titrant. value
    ⌊mass / volume⌋. -/
theorem fam_titration_titer_1 : (1000 / 25) = 40 := by decide

/-- titration: buffer(10, 100) = 10 — BUFFER: the conjugate-base to acid ratio (Henderson–Hasselbalch). value
    ⌊salt / acid⌋. -/
theorem fam_titration_buffer_1 : (100 / 10) = 10 := by decide

/-- titration: indicator(3, 11) = 7 — INDICATOR: the colour-change midpoint of the transition range. value ⌊(low
    + high) / 2⌋. -/
theorem fam_titration_indicator_1 : ((3 + 11) / 2) = 7 := by decide

/-- titration: backtitration(50, 12) = 38 — BACK-TITRATION: the unreacted excess reagent. value max(0, added −
    backVol). -/
theorem fam_titration_backtitration_1 : (fmax 0 (50 - 12)) = 38 := by decide

/-- tokenization: tokencount(1000, 4) = 250 — TOKENIZATION — TEXT MADE COUNTABLE, AS ARITHMETIC. Splitting text
    into tokens is numbers: the tokens a string yields, the average token length, the vocabulary a BPE merge
    schedule builds, the subword share, how tightly text compresses, the out-of-vocabulary rate, bytes per
    token, and fertility (tokens per word). Crosses to `linguistics` — tokenization is how language is cut
    before it is counted. A measure. */ const PROOF = 'tokenization arithmetic (token count, avg token length,
    vocab size, subword ratio, compression, OOV rate, bytes/token, fertility); text made countable; a measure
    crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tokenization', dst:
    'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `tokenization.${name}`, params })
    export class TokenizationFormulas { /** TOKEN COUNT: the tokens a string of chars yields at chars-per-token.
    value ⌊chars / perToken⌋. -/
theorem fam_tokenization_tokencount_1 : (1000 / 4) = 250 := by decide

/-- tokenization: avgtokenlength(1000, 250) = 4 — AVERAGE TOKEN LENGTH: chars over the tokens they split into.
    value ⌊chars / tokens⌋. -/
theorem fam_tokenization_avgtokenlength_1 : (1000 / 250) = 4 := by decide

/-- tokenization: vocabsize(256, 50000) = 50256 — VOCAB SIZE: a base alphabet plus the merges a BPE schedule
    adds. value base + merges. -/
theorem fam_tokenization_vocabsize_1 : (256 + 50000) = 50256 := by decide

/-- tokenization: subwordratio(130, 100) = 130 — SUBWORD RATIO: subwords per hundred words. value ⌊subwords ·
    100 / words⌋. -/
theorem fam_tokenization_subwordratio_1 : ((130 * 100) / 100) = 130 := by decide

/-- tokenization: compressionratio(1000, 250) = 400 — COMPRESSION RATIO: chars per token, scaled by a hundred.
    value ⌊chars · 100 / tokens⌋. -/
theorem fam_tokenization_compressionratio_1 : ((1000 * 100) / 250) = 400 := by decide

/-- tokenization: oovrate(50, 1000) = 5 — OOV RATE: out-of-vocabulary tokens per hundred. value ⌊oov · 100 /
    total⌋. -/
theorem fam_tokenization_oovrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- tokenization: charspertoken(1200, 300) = 4 — BYTES PER TOKEN: bytes over the tokens they encode. value
    ⌊bytes / tokens⌋. -/
theorem fam_tokenization_charspertoken_1 : (1200 / 300) = 4 := by decide

/-- tokenization: fertility(130, 100) = 130 — FERTILITY: tokens per word, scaled by a hundred. value ⌊tokens ·
    100 / words⌋. -/
theorem fam_tokenization_fertility_1 : ((130 * 100) / 100) = 130 := by decide

/-- tokenization: tokencount(1000, 0) = 0 — TOKENIZATION — TEXT MADE COUNTABLE, AS ARITHMETIC. Splitting text
    into tokens is numbers: the tokens a string yields, the average token length, the vocabulary a BPE merge
    schedule builds, the subword share, how tightly text compresses, the out-of-vocabulary rate, bytes per
    token, and fertility (tokens per word). Crosses to `linguistics` — tokenization is how language is cut
    before it is counted. A measure. */ const PROOF = 'tokenization arithmetic (token count, avg token length,
    vocab size, subword ratio, compression, OOV rate, bytes/token, fertility); text made countable; a measure
    crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tokenization', dst:
    'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `tokenization.${name}`, params })
    export class TokenizationFormulas { /** TOKEN COUNT: the tokens a string of chars yields at chars-per-token.
    value ⌊chars / perToken⌋. -/
theorem fam_tokenization_tokencount_2 : (1000 / 0) = 0 := by decide

/-- tomography: slices(300, 5) = 60 — TOMOGRAPHY — IMAGING A VOLUME SLICE BY SLICE, AS ARITHMETIC
    (reconstructing a body from its projections). Scanning is numbers: the slices that cover a length, the
    projections taken over the rotation, the voxels in the volume, the backprojection work, the Hounsfield
    density, the helical pitch, the exposure, and the detector coverage. Crosses to `radiology` — tomography is
    what radiology reads. A measure. */ const PROOF = 'tomography arithmetic (slices, projections, voxels,
    reconstruction, Hounsfield units, helical pitch, exposure, coverage); imaging a volume from its projections;
    a measure crossed to radiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tomography', dst:
    'radiology', formula, value, proof: PROOF, ...extra }, holds, { name: `tomography.${name}`, params }) export
    class TomographyFormulas { /** SLICES: how many slices of a thickness cover a scan length. value ⌊length /
    thickness⌋. -/
theorem fam_tomography_slices_1 : (300 / 5) = 60 := by decide

/-- tomography: projections(180, 2) = 360 — PROJECTIONS: angular views taken over the rotations. value angles ·
    rotations. -/
theorem fam_tomography_projections_1 : (180 * 2) = 360 := by decide

/-- tomography: voxels(512, 512, 100) = 26214400 — VOXELS: the elements of the reconstructed volume. value width
    · height · depth. -/
theorem fam_tomography_voxels_1 : ((512 * 512) * 100) = 26214400 := by decide

/-- tomography: reconstruction(360, 512) = 184320 — RECONSTRUCTION: backprojection work, one pass per projection
    over the grid. value projections · size. -/
theorem fam_tomography_reconstruction_1 : (360 * 512) = 184320 := by decide

/-- tomography: hounsfield(2000, 1000) = 1000 — HOUNSFIELD: density on the CT scale relative to water. value
    ⌊(attenuation − water) · 1000 / water⌋. -/
theorem fam_tomography_hounsfield_1 : (((fmax 0 (2000 - 1000)) * 1000) / 1000) = 1000 := by decide

/-- tomography: pitch(15, 10) = 150 — PITCH: helical table travel per rotation over the collimation, as a
    percent. value ⌊travel · 100 / collimation⌋. -/
theorem fam_tomography_pitch_1 : ((15 * 100) / 10) = 150 := by decide

/-- tomography: exposure(200, 3) = 600 — EXPOSURE: tube current over the exposure time, in mAs. value current ·
    time. -/
theorem fam_tomography_exposure_1 : (200 * 3) = 600 := by decide

/-- tomography: coverage(64, 1) = 64 — COVERAGE: detector rows at a row width, the volume per rotation. value
    detectors · width. -/
theorem fam_tomography_coverage_1 : (64 * 1) = 64 := by decide

/-- tomography: hounsfield(1000, 1000) = 0 — HOUNSFIELD: density on the CT scale relative to water. value
    ⌊(attenuation − water) · 1000 / water⌋. -/
theorem fam_tomography_hounsfield_2 : (((fmax 0 (1000 - 1000)) * 1000) / 1000) = 0 := by decide

/-- tooling: life(10000, 250) = 40 — TOOLING — THE MACHINE SHOP AS ARITHMETIC (cutting tools, molds and their
    upkeep). Making parts is numbers: how many parts a tool lives for, the wear it takes, the feed and cutting
    speed of the spindle, the depth per pass, the cavities a mold holds, the maintenance cycles a machine runs,
    and how fully it is used. Crosses to `mechanical` — tooling is what the mechanical domain drives. A measure.
    */ const PROOF = 'tooling arithmetic (tool life, wear, feed, cutting speed, depth per pass, mold cavities,
    maintenance cycles, utilization); the machine shop as a measure crossed to mechanical' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'tooling', dst: 'mechanical', formula, value, proof: PROOF,
    ...extra }, holds, { name: `tooling.${name}`, params }) export class ToolingFormulas { /** TOOL LIFE: parts
    a tool makes before end of life, cutting distance over wear per part. value ⌊distance / perPart⌋. -/
theorem fam_tooling_life_1 : (10000 / 250) = 40 := by decide

/-- tooling: wear(500, 3) = 1500 — WEAR: total wear (microns) over the parts cut at a wear rate each. value
    parts · rate. -/
theorem fam_tooling_wear_1 : (500 * 3) = 1500 := by decide

/-- tooling: feed(2000, 2) = 4000 — FEED: table feed (mm/min) from spindle speed and feed per revolution. value
    rpm · perRev. -/
theorem fam_tooling_feed_1 : (2000 * 2) = 4000 := by decide

/-- tooling: speed(1000, 314) = 314 — CUTTING SPEED: surface speed (m/min) from spindle speed and tool
    circumference (mm). value ⌊rpm · circumference / 1000⌋. -/
theorem fam_tooling_speed_1 : ((1000 * 314) / 1000) = 314 := by decide

/-- tooling: cavities(1200, 150) = 8 — CAVITIES: parts a mold holds, platen area over a part footprint. value
    ⌊platen / footprint⌋. -/
theorem fam_tooling_cavities_1 : (1200 / 150) = 8 := by decide

/-- tooling: maintenance(5000, 500) = 10 — MAINTENANCE: service cycles a machine runs, run hours over a service
    interval. value ⌊hours / interval⌋. -/
theorem fam_tooling_maintenance_1 : (5000 / 500) = 10 := by decide

/-- tooling: utilization(18, 24) = 75 — UTILIZATION as a percentage: run time over available time. value ⌊run ·
    100 / total⌋. -/
theorem fam_tooling_utilization_1 : ((18 * 100) / 24) = 75 := by decide

/-- topology: genus(2) = 0 — GENUS: the handles a surface carries, from its Euler characteristic. value max(0, 2
    − euler). -/
theorem fam_topology_genus_1 : (fmax 0 (2 - 2)) = 0 := by decide

/-- topology: genus(0) = 2 — GENUS: the handles a surface carries, from its Euler characteristic. value max(0, 2
    − euler). -/
theorem fam_topology_genus_2 : (fmax 0 (2 - 0)) = 2 := by decide

/-- topology: connectivity(100, 25) = 4 — CONNECTIVITY: the paths that reach each node. value ⌊paths / nodes⌋. -/
theorem fam_topology_connectivity_1 : (100 / 25) = 4 := by decide

/-- topology: betti(5, 2) = 3 — BETTI NUMBER: cycles that are not boundaries. value max(0, cycles − boundaries). -/
theorem fam_topology_betti_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- topology: dimension(3) = 3 — DIMENSION: the count of coordinates. value coordinates. -/
theorem fam_topology_dimension_1 : 3 = 3 := by decide

/-- topology: homology(7, 4) = 3 — HOMOLOGY: the kernel beyond the image. value max(0, kernel − image). -/
theorem fam_topology_homology_1 : (fmax 0 (7 - 4)) = 3 := by decide

/-- topology: neighborhood(10, 5) = 50 — NEIGHBORHOOD: the points within a radius. value points · radius. -/
theorem fam_topology_neighborhood_1 : (10 * 5) = 50 := by decide

/-- topology: boundary(30, 100) = 30 — BOUNDARY: the interior's share of the closure, per hundred. value
    ⌊interior · 100 / closure⌋. -/
theorem fam_topology_boundary_1 : ((30 * 100) / 100) = 30 := by decide

/-- toponymy: placecount(500, 10) = 5000 -/
theorem fam_toponymy_placecount_1 : (500 * 10) = 5000 := by decide

/-- toponymy: languagelayers(3, 2) = 5 -/
theorem fam_toponymy_languagelayers_1 : (3 + 2) = 5 := by decide

/-- toponymy: distributionsubsets(5) = 32 -/
theorem fam_toponymy_distributionsubsets_1 : (2 ^ 5) = 32 := by decide

/-- toponymy: densityper(5000, 100) = 50 -/
theorem fam_toponymy_densityper_1 : (5000 / 100) = 50 := by decide

/-- toponymy: variantspellings(12, 3) = 36 -/
theorem fam_toponymy_variantspellings_1 : (12 * 3) = 36 := by decide

/-- tornado: efscale(3, 5) = 5 -/
theorem fam_tornado_efscale_1 : (fmax 3 5) = 5 := by decide

/-- tornado: windspeed(200, 1) = 200 -/
theorem fam_tornado_windspeed_1 : (200 * 1) = 200 := by decide

/-- tornado: pathlength(20, 1) = 20 -/
theorem fam_tornado_pathlength_1 : (20 * 1) = 20 := by decide

/-- tornado: width(800, 2) = 400 -/
theorem fam_tornado_width_1 : (800 / 2) = 400 := by decide

/-- tornado: durationmin(60, 2) = 30 -/
theorem fam_tornado_durationmin_1 : (60 / 2) = 30 := by decide

/-- tornado: damageindex(80, 100) = 80 -/
theorem fam_tornado_damageindex_1 : ((80 * 100) / 100) = 80 := by decide

/-- tornado: pressuredeficit(1013, 900) = 113 -/
theorem fam_tornado_pressuredeficit_1 : (fmax 0 (1013 - 900)) = 113 := by decide

/-- tornado: vorticity(30, 3) = 90 -/
theorem fam_tornado_vorticity_1 : (30 * 3) = 90 := by decide

/-- totemism: clans(8, 4) = 12 -/
theorem fam_totemism_clans_1 : (8 + 4) = 12 := by decide

/-- totemism: taboocount(10, 5) = 15 -/
theorem fam_totemism_taboocount_1 : (10 + 5) = 15 := by decide

/-- totemism: kinshipsubsets(5) = 32 -/
theorem fam_totemism_kinshipsubsets_1 : (2 ^ 5) = 32 := by decide

/-- totemism: descentgroups(4, 3) = 12 -/
theorem fam_totemism_descentgroups_1 : (4 * 3) = 12 := by decide

/-- totemism: exogamyratio(60, 100) = 60 -/
theorem fam_totemism_exogamyratio_1 : ((60 * 100) / 100) = 60 := by decide

/-- tourism: occupancy(80, 100) = 80 — TOURISM — TRAVEL & HOSPITALITY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Filling rooms is numbers: occupancy, revenue per room, the average daily rate,
    guest-nights, how peak compares to the off-season, total beds, visitor spend, and the average length of
    stay. Crosses to `econ` — tourism is money through a region. A measure. */ const PROOF = 'tourism arithmetic
    (occupancy, revpar, adr, guest-nights, seasonality, capacity, spend, length of stay); travel & hospitality
    as a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tourism', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `tourism.${name}`, params }) export class
    TourismFormulas { /** OCCUPANCY as a percentage. value ⌊booked · 100 / rooms⌋. -/
theorem fam_tourism_occupancy_1 : ((80 * 100) / 100) = 80 := by decide

/-- tourism: revpar(9000, 100) = 90 — REVPAR: revenue per available room. value ⌊revenue / rooms⌋. -/
theorem fam_tourism_revpar_1 : (9000 / 100) = 90 := by decide

/-- tourism: adr(9000, 80) = 112 — ADR: the average daily rate over the rooms sold. value ⌊revenue / sold⌋. -/
theorem fam_tourism_adr_1 : (9000 / 80) = 112 := by decide

/-- tourism: nights(50, 3) = 150 — GUEST-NIGHTS: guests over the nights they stay. value guests · stay. -/
theorem fam_tourism_nights_1 : (50 * 3) = 150 := by decide

/-- tourism: seasonality(300, 100) = 300 — SEASONALITY: peak against the off-season, as a percentage. value
    ⌊peak · 100 / offpeak⌋. -/
theorem fam_tourism_seasonality_1 : ((300 * 100) / 100) = 300 := by decide

/-- tourism: capacity(100, 2) = 200 — CAPACITY: beds across the rooms. value rooms · beds. -/
theorem fam_tourism_capacity_1 : (100 * 2) = 200 := by decide

/-- tourism: spend(1000, 250) = 250000 — SPEND: visitors at a spend per head. value visitors · perHead. -/
theorem fam_tourism_spend_1 : (1000 * 250) = 250000 := by decide

/-- tourism: length(150, 50) = 3 — LENGTH OF STAY: guest-nights over arrivals. value ⌊nights / arrivals⌋. -/
theorem fam_tourism_length_1 : (150 / 50) = 3 := by decide

/-- toxicology: ld50(5, 70) = 350 — TOXICOLOGY — HOW A DOSE MEETS A BODY, AS ARITHMETIC. Poison is numbers: the
    lethal dose for a body mass, the dose actually administered, the therapeutic index, how fast a body clears a
    compound, its half-life, cumulative exposure, how much a compound concentrates in tissue, and the margin of
    safety. Crosses to `physiology` — toxicology is what a living body does to, and under, a dose. A measure. */
    const PROOF = 'toxicology arithmetic (lethal dose, administered dose, therapeutic index, clearance,
    half-life, exposure, bioaccumulation, margin of safety); a measure crossed to physiology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'toxicology', dst: 'physiology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `toxicology.${name}`, params }) export class ToxicologyFormulas { /** LETHAL
    DOSE: the per-kilogram LD50 scaled to a body mass. value perKg · weight. -/
theorem fam_toxicology_ld50_1 : (5 * 70) = 350 := by decide

/-- toxicology: dose(10, 50) = 500 — ADMINISTERED DOSE: a concentration over a volume. value conc · volume. -/
theorem fam_toxicology_dose_1 : (10 * 50) = 500 := by decide

/-- toxicology: therapeuticindex(1000, 10) = 100 — THERAPEUTIC INDEX: the lethal dose over the effective dose.
    value ⌊ld50 / ed50⌋. -/
theorem fam_toxicology_therapeuticindex_1 : (1000 / 10) = 100 := by decide

/-- toxicology: therapeuticindex(50, 0) = 0 — THERAPEUTIC INDEX: the lethal dose over the effective dose. value
    ⌊ld50 / ed50⌋. -/
theorem fam_toxicology_therapeuticindex_2 : (50 / 0) = 0 := by decide

/-- toxicology: clearance(600, 15) = 40 — CLEARANCE: the elimination rate over the plasma concentration. value
    ⌊rate / conc⌋. -/
theorem fam_toxicology_clearance_1 : (600 / 15) = 40 := by decide

/-- toxicology: halflife(10000, 14) = 495 — HALF-LIFE: 0.693 · volume of distribution over clearance. value ⌊693
    · volume / (1000 · clearance)⌋. -/
theorem fam_toxicology_halflife_1 : ((693 * 10000) / (1000 * 14)) = 495 := by decide

/-- toxicology: exposure(25, 8) = 200 — EXPOSURE: a concentration held over a duration. value conc · duration. -/
theorem fam_toxicology_exposure_1 : (25 * 8) = 200 := by decide

/-- toxicology: bioaccumulation(5000, 25) = 200 — BIOACCUMULATION: the tissue concentration over the water
    concentration (BCF). value ⌊organism / water⌋. -/
theorem fam_toxicology_bioaccumulation_1 : (5000 / 25) = 200 := by decide

/-- toxicology: margin(1000, 4) = 250 — MARGIN OF SAFETY: the no-effect level over the actual exposure. value
    ⌊noael / exposure⌋. -/
theorem fam_toxicology_margin_1 : (1000 / 4) = 250 := by decide

/-- tracing: spancount(50, 12) = 600 — TRACING — DISTRIBUTED REQUEST TRACING, AS ARITHMETIC (chosen by the
    registry, not by hand). A traced request is numbers: the spans it emits, the critical path through them, the
    fraction sampled, the latency budget left, the fan-out to downstream services, the depth of the span tree,
    instrumentation overhead, and whether a slow trace is tail-sampled. Crosses to `observability` — tracing is
    what observability reads. A measure. */ const PROOF = 'tracing arithmetic (span count, critical path, sample
    rate, latency budget, fan-out, trace depth, overhead, tail sampling); a request measured span by span; a
    measure crossed to observability' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'tracing', dst:
    'observability', formula, value, proof: PROOF, ...extra }, holds, { name: `tracing.${name}`, params })
    export class TracingFormulas { /** SPAN COUNT: spans emitted across the services a trace touches. value
    services · spans. -/
theorem fam_tracing_spancount_1 : (50 * 12) = 600 := by decide

/-- tracing: criticalpath(800, 300) = 500 — CRITICAL PATH: the serial duration left after work that ran in
    parallel. value max(0, total − parallel). -/
theorem fam_tracing_criticalpath_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- tracing: samplerate(100, 1000) = 10 — SAMPLE RATE as a percentage of traces kept. value ⌊sampled · 100 /
    total⌋. -/
theorem fam_tracing_samplerate_1 : ((100 * 100) / 1000) = 10 := by decide

/-- tracing: latencybudget(1000, 650) = 350 — LATENCY BUDGET: milliseconds of budget left after what a span
    already used. value max(0, budget − used). -/
theorem fam_tracing_latencybudget_1 : (fmax 0 (1000 - 650)) = 350 := by decide

/-- tracing: fanout(8, 25) = 200 — FAN-OUT: downstream calls a service makes per request. value services ·
    calls. -/
theorem fam_tracing_fanout_1 : (8 * 25) = 200 := by decide

/-- tracing: overhead(10000, 90) = 900 — OVERHEAD: instrumentation bytes (per span) at a rate per thousand.
    value ⌊bytes · rate / 1000⌋. -/
theorem fam_tracing_overhead_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- trajectory: displacement(20, 5) = 100 -/
theorem fam_trajectory_displacement_1 : (20 * 5) = 100 := by decide

/-- trajectory: peakvelocity(1000, 10) = 100 -/
theorem fam_trajectory_peakvelocity_1 : (1000 / 10) = 100 := by decide

/-- trajectory: acceleration(100, 5) = 20 -/
theorem fam_trajectory_acceleration_1 : (100 / 5) = 20 := by decide

/-- trajectory: jerklimit(200, 4) = 50 -/
theorem fam_trajectory_jerklimit_1 : (200 / 4) = 50 := by decide

/-- trajectory: pathlength(300, 200) = 500 -/
theorem fam_trajectory_pathlength_1 : (300 + 200) = 500 := by decide

/-- trajectory: segmenttime(600, 6) = 100 -/
theorem fam_trajectory_segmenttime_1 : (600 / 6) = 100 := by decide

/-- trajectory: blendradius(100, 4) = 25 -/
theorem fam_trajectory_blendradius_1 : (100 / 4) = 25 := by decide

/-- trajectory: traversaltime(1000, 100) = 10 -/
theorem fam_trajectory_traversaltime_1 : (1000 / 100) = 10 := by decide

/-- transcription: codons(300) = 100 — TRANSCRIPTION — READING DNA INTO RNA INTO PROTEIN, AS ARITHMETIC. The
    central dogma is numbers: codons per transcript, elongation time, GC content, mRNA length, promoter
    strength, the alternative splice variants, ribosome readthrough, and the expression level. Crosses to
    `genetics` — transcription is what genetics encodes. A measure. */ const PROOF = 'transcription arithmetic
    (codons, elongation time, GC content, mRNA length, promoter strength, splice variants, readthrough,
    expression level); the central dogma as integers; a measure crossed to genetics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'transcription', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `transcription.${name}`, params }) export class TranscriptionFormulas { /**
    CODONS: a coding sequence is read three bases at a time. value ⌊bases / 3⌋. -/
theorem fam_transcription_codons_1 : (300 / 3) = 100 := by decide

/-- transcription: expressionlevel(6000, 60) = 100 — EXPRESSION LEVEL: transcripts over seconds of observation.
    value ⌊transcripts / seconds⌋. -/
theorem fam_transcription_expressionlevel_1 : (6000 / 60) = 100 := by decide

/-- transcription: gcontent(60, 100) = 60 — GC CONTENT as a percentage of the sequence. value ⌊gc · 100 /
    total⌋. -/
theorem fam_transcription_gcontent_1 : ((60 * 100) / 100) = 60 := by decide

/-- transcription: mrnalength(5, 200) = 1000 — mRNA LENGTH: exons at a size each. value exons · size. -/
theorem fam_transcription_mrnalength_1 : (5 * 200) = 1000 := by decide

/-- transcription: promoterstrength(4, 25) = 100 — PROMOTER STRENGTH: binding sites at an affinity each. value
    sites · affinity. -/
theorem fam_transcription_promoterstrength_1 : (4 * 25) = 100 := by decide

/-- transcription: splicevariants(3, 4) = 12 — SPLICE VARIANTS: exons each with a number of cassette choices.
    value exons · cassettes. -/
theorem fam_transcription_splicevariants_1 : (3 * 4) = 12 := by decide

/-- transformer: ratio(240, 24) = 10 — TRANSFORMER — THE IRON-CORE MACHINE, AS ARITHMETIC. A transformer is a
    ratio: the turns ratio sets how primary and secondary voltages relate, the volt-amperes carried, the
    efficiency of the transfer, the impedance seen, the voltage regulation between no load and full load, and
    the turns a winding needs. Crosses to `electrical` — a transformer is electrical apparatus. A measure. */
    const PROOF = 'transformer arithmetic (turns ratio, secondary/primary voltage, power VA, efficiency,
    impedance, regulation, winding turns); the iron-core machine as a ratio; a measure crossed to electrical'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'transformer', dst: 'electrical', formula, value,
    proof: PROOF, ...extra }, holds, { name: `transformer.${name}`, params }) export class TransformerFormulas {
    /** TURNS RATIO: primary turns over secondary turns. value ⌊np / ns⌋. -/
theorem fam_transformer_ratio_1 : (240 / 24) = 10 := by decide

/-- transformer: secondary(240, 10, 1) = 24 — SECONDARY VOLTAGE: primary voltage scaled by the turns. value ⌊vp
    · ns / np⌋. -/
theorem fam_transformer_secondary_1 : ((240 * 1) / 10) = 24 := by decide

/-- transformer: primary(24, 1, 10) = 240 — PRIMARY VOLTAGE: secondary voltage scaled by the turns. value ⌊vs ·
    np / ns⌋. -/
theorem fam_transformer_primary_1 : ((24 * 10) / 1) = 240 := by decide

/-- transformer: power(240, 5) = 1200 — POWER: volt-amperes carried. value volts · amps. -/
theorem fam_transformer_power_1 : (240 * 5) = 1200 := by decide

/-- transformer: efficiency(950, 1000) = 95 — EFFICIENCY as a percentage: output power over input power. value
    ⌊pout · 100 / pin⌋. -/
theorem fam_transformer_efficiency_1 : ((950 * 100) / 1000) = 95 := by decide

/-- transformer: impedance(240, 6) = 40 — IMPEDANCE: voltage over current. value ⌊volts / amps⌋. -/
theorem fam_transformer_impedance_1 : (240 / 6) = 40 := by decide

/-- transformer: regulation(250, 240) = 4 — VOLTAGE REGULATION as a percentage: the drop from no load to full
    load. value ⌊max(0, vnl − vfl) · 100 / vfl⌋. -/
theorem fam_transformer_regulation_1 : (((fmax 0 (250 - 240)) * 100) / 240) = 4 := by decide

/-- transformer: regulation(240, 240) = 0 — VOLTAGE REGULATION as a percentage: the drop from no load to full
    load. value ⌊max(0, vnl − vfl) · 100 / vfl⌋. -/
theorem fam_transformer_regulation_2 : (((fmax 0 (240 - 240)) * 100) / 240) = 0 := by decide

/-- transformer: turns(240, 2) = 120 — WINDING TURNS: the turns a winding needs at a volts-per-turn. value
    ⌊volts / voltsPerTurn⌋. -/
theorem fam_transformer_turns_1 : (240 / 2) = 120 := by decide

/-- transit: ridership(500, 40) = 20000 — TRANSIT — A TRANSIT NETWORK AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Moving people is numbers: riders carried, departures in a span, how full a vehicle
    runs, how often it is on time, stops per area, the fare a service recovers, minutes between vehicles, and
    the hours a line runs. Crosses to `transport` — transit is transport measured. A measure. */ const PROOF =
    'transit arithmetic (ridership, frequency, load factor, on-time, coverage, farebox recovery, headway,
    service span); a public-registry domain; a measure crossed to transport' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'transit', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, {
    name: `transit.${name}`, params }) export class TransitFormulas { /** RIDERSHIP: riders carried over a day's
    trips at a per-trip average. value trips · perTrip. -/
theorem fam_transit_ridership_1 : (500 * 40) = 20000 := by decide

/-- transit: frequency(5, 15) = 20 — FREQUENCY: departures in a span of hours at a fixed interval (minutes).
    value ⌊hours · 60 / interval⌋. -/
theorem fam_transit_frequency_1 : ((5 * 60) / 15) = 20 := by decide

/-- transit: loadfactor(45, 60) = 75 — LOAD FACTOR: how full a vehicle runs, as a percentage. value ⌊riders ·
    100 / seats⌋. -/
theorem fam_transit_loadfactor_1 : ((45 * 100) / 60) = 75 := by decide

/-- transit: ontime(920, 1000) = 92 — ON-TIME: the share of punctual trips, as a percentage. value ⌊punctual ·
    100 / total⌋. -/
theorem fam_transit_ontime_1 : ((920 * 100) / 1000) = 92 := by decide

/-- transit: coverage(240, 12) = 20 — COVERAGE: stops served per unit of area. value ⌊stops / area⌋. -/
theorem fam_transit_coverage_1 : (240 / 12) = 20 := by decide

/-- transit: farebox(3000, 5000) = 60 — FAREBOX RECOVERY: fare revenue over operating cost, as a percentage.
    value ⌊revenue · 100 / cost⌋. -/
theorem fam_transit_farebox_1 : ((3000 * 100) / 5000) = 60 := by decide

/-- transit: headway(300, 20) = 15 — HEADWAY: minutes between vehicles over a span given the trips run. value
    ⌊span / trips⌋. -/
theorem fam_transit_headway_1 : (300 / 20) = 15 := by decide

/-- transit: span(5, 23) = 18 — SERVICE SPAN: the hours a line runs, from first to last. value max(0, last −
    first). -/
theorem fam_transit_span_1 : (fmax 0 (23 - 5)) = 18 := by decide

/-- transit: span(23, 5) = 0 — SERVICE SPAN: the hours a line runs, from first to last. value max(0, last −
    first). -/
theorem fam_transit_span_2 : (fmax 0 (5 - 23)) = 0 := by decide

/-- translation: bleu(45, 50) = 90 — TRANSLATION — THE LANGUAGE-SERVICE DOMAIN, AS ARITHMETIC (chosen by the
    registry, not by hand). Moving text between languages is numbers: BLEU match, fuzzy-match reuse, words per
    hour, how far the target expands the source, how much of a project is covered, the post-edit distance,
    glossary hits per term, and the share of reviewed segments accepted. Crosses to `linguistics` — translation
    is linguistics put to work. A measure. */ const PROOF = 'translation arithmetic (bleu, fuzzy reuse,
    throughput, expansion, coverage, post-edit distance, glossary, quality); a language-service domain; a
    measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'translation',
    dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `translation.${name}`, params
    }) export class TranslationFormulas { /** BLEU: matched n-grams as a percentage of the total. value ⌊matches
    · 100 / total⌋. -/
theorem fam_translation_bleu_1 : ((45 * 100) / 50) = 90 := by decide

/-- translation: fuzzy(75, 100) = 75 — FUZZY: translation-memory reuse as a percentage of the segments. value
    ⌊matched · 100 / segments⌋. -/
theorem fam_translation_fuzzy_1 : ((75 * 100) / 100) = 75 := by decide

/-- translation: throughput(2500, 5) = 500 — THROUGHPUT: words over the hours worked. value ⌊words / hours⌋. -/
theorem fam_translation_throughput_1 : (2500 / 5) = 500 := by decide

/-- translation: expansion(120, 100) = 120 — EXPANSION: target length against source, as a percentage. value
    ⌊target · 100 / source⌋. -/
theorem fam_translation_expansion_1 : ((120 * 100) / 100) = 120 := by decide

/-- translation: coverage(800, 1000) = 80 — COVERAGE: translated segments as a percentage of the total. value
    ⌊translated · 100 / total⌋. -/
theorem fam_translation_coverage_1 : ((800 * 100) / 1000) = 80 := by decide

/-- translation: edit(20, 100) = 20 — EDIT: post-edit distance as a percentage of the words. value ⌊changes ·
    100 / words⌋. -/
theorem fam_translation_edit_1 : ((20 * 100) / 100) = 20 := by decide

/-- translation: glossary(10, 50) = 5 — GLOSSARY: hits per term. value ⌊hits / terms⌋. -/
theorem fam_translation_glossary_1 : (50 / 10) = 5 := by decide

/-- translation: quality(95, 100) = 95 — QUALITY: accepted segments as a percentage of those reviewed. value
    ⌊accepted · 100 / reviewed⌋. -/
theorem fam_translation_quality_1 : ((95 * 100) / 100) = 95 := by decide

/-- transliteration: mappings(26, 2) = 52 -/
theorem fam_transliteration_mappings_1 : (26 * 2) = 52 := by decide

/-- transliteration: ambiguouschars(4, 2) = 6 -/
theorem fam_transliteration_ambiguouschars_1 : (4 + 2) = 6 := by decide

/-- transliteration: reversibility(95, 100) = 95 -/
theorem fam_transliteration_reversibility_1 : ((95 * 100) / 100) = 95 := by decide

/-- transliteration: diacriticcount(8, 4) = 12 -/
theorem fam_transliteration_diacriticcount_1 : (8 + 4) = 12 := by decide

/-- transliteration: schemesubsets(4) = 16 -/
theorem fam_transliteration_schemesubsets_1 : (2 ^ 4) = 16 := by decide

/-- transliteration: coverage(98, 100) = 98 -/
theorem fam_transliteration_coverage_1 : ((98 * 100) / 100) = 98 := by decide

/-- transport: speed(300, 5) = 60 — TRANSPORT — TRANSPORTATION AND TRAFFIC, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Moving people and freight is numbers: speed over a distance, arrival
    time, fuel burned, the seats a fleet carries, how full it rides, the gap between vehicles, emissions, and
    road congestion. Crosses to `econ` — transport is what the economy moves on. A measure. */ const PROOF =
    'transport arithmetic (speed, eta, fuel, capacity, occupancy, headway, emissions, congestion);
    transportation and traffic as integers; a measure crossed to econ' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'transport', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name:
    `transport.${name}`, params }) export class TransportFormulas { /** SPEED: distance over the time taken.
    value ⌊distance / time⌋. -/
theorem fam_transport_speed_1 : (300 / 5) = 60 := by decide

/-- transport: fuel(500, 25) = 20 — FUEL: distance at a distance-per-unit efficiency. value ⌊distance /
    efficiency⌋. -/
theorem fam_transport_fuel_1 : (500 / 25) = 20 := by decide

/-- transport: capacity(50, 4) = 200 — CAPACITY: seats per vehicle across the fleet. value seats · vehicles. -/
theorem fam_transport_capacity_1 : (50 * 4) = 200 := by decide

/-- transport: occupancy(150, 200) = 75 — OCCUPANCY as a percentage of capacity. value ⌊riders · 100 /
    capacity⌋. -/
theorem fam_transport_occupancy_1 : ((150 * 100) / 200) = 75 := by decide

/-- transport: headway(60, 5) = 12 — HEADWAY: the service period split across the vehicles. value ⌊period /
    vehicles⌋. -/
theorem fam_transport_headway_1 : (60 / 5) = 12 := by decide

/-- transport: emissions(100, 8) = 800 — EMISSIONS: distance at a per-distance factor. value distance · factor. -/
theorem fam_transport_emissions_1 : (100 * 8) = 800 := by decide

/-- transport: congestion(90, 60) = 150 — CONGESTION: actual travel time against free-flow, as a percentage.
    value ⌊actual · 100 / free⌋. -/
theorem fam_transport_congestion_1 : ((90 * 100) / 60) = 150 := by decide

/-- treasury: liquidity(200, 100) = 200 — TREASURY — CORPORATE FINANCE AS ARITHMETIC (chosen by the registry,
    not by hand). Holding money is numbers: the current ratio, working capital, cash flow, interest accrued,
    days to maturity, the hedge ratio, the reserve ratio, and the cash-conversion rate. Crosses to `accounting`
    — treasury is what the books account for. A measure. */ const PROOF = 'treasury arithmetic (liquidity,
    working capital, cash flow, interest, maturity, hedge, reserve, conversion); a corporate-finance measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'treasury', dst:
    'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `treasury.${name}`, params }) export
    class TreasuryFormulas { /** CURRENT RATIO: current assets against liabilities, as a percentage. value
    ⌊current · 100 / liabilities⌋. -/
theorem fam_treasury_liquidity_1 : ((200 * 100) / 100) = 200 := by decide

/-- treasury: workingcapital(500, 300) = 200 — WORKING CAPITAL: assets less liabilities, never below zero. value
    max(0, assets − liabilities). -/
theorem fam_treasury_workingcapital_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- treasury: workingcapital(300, 500) = 0 — WORKING CAPITAL: assets less liabilities, never below zero. value
    max(0, assets − liabilities). -/
theorem fam_treasury_workingcapital_2 : (fmax 0 (300 - 500)) = 0 := by decide

/-- treasury: cashflow(100, 60) = 40 — CASH FLOW: inflow less outflow; may be negative. value inflow − outflow. -/
theorem fam_treasury_cashflow_1 : (100 - 60) = 40 := by decide

/-- treasury: interest(1000, 5) = 50 — INTEREST: principal at a percentage rate. value ⌊principal · rate / 100⌋. -/
theorem fam_treasury_interest_1 : ((1000 * 5) / 100) = 50 := by decide

/-- treasury: maturity(90) = 90 — MATURITY: the days a holding runs. value days. -/
theorem fam_treasury_maturity_1 : 90 = 90 := by decide

/-- treasury: hedge(80, 100) = 80 — HEDGE RATIO: the hedged position against the exposure, as a percentage.
    value ⌊hedged · 100 / exposure⌋. -/
theorem fam_treasury_hedge_1 : ((80 * 100) / 100) = 80 := by decide

/-- treasury: reserve(120, 100) = 120 — RESERVE RATIO: reserves held against those required, as a percentage.
    value ⌊held · 100 / required⌋. -/
theorem fam_treasury_reserve_1 : ((120 * 100) / 100) = 120 := by decide

/-- treasury: conversion(75, 100) = 75 — CASH CONVERSION: receivables converted to cash, as a percentage. value
    ⌊converted · 100 / receivables⌋. -/
theorem fam_treasury_conversion_1 : ((75 * 100) / 100) = 75 := by decide

/-- triangulation: angleclosure(60, 70) = 50 — TRIANGULATION — FIXING POINTS FROM ANGLES AND A KNOWN BASE, AS
    ARITHMETIC (chosen by the public-API registry, not by hand). Locating a station is numbers: the triangle's
    closing angle, the squared base length, where two sightlines meet, a resection's angle sum, the area a
    traverse encloses, a running bearing, the redundancy of a network, and how densely its points fall. Crosses
    to `surveying` — triangulation is the geometry surveying runs on. A measure. */ const PROOF = 'triangulation
    arithmetic (angle closure, squared baseline, intersection, resection, shoelace area, bearing sum, network
    redundancy, point density); the registry\'s uncovered geodesy domain; a measure crossed to surveying' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'triangulation', dst: 'surveying', formula, value,
    proof: PROOF, ...extra }, holds, { name: `triangulation.${name}`, params }) export class
    TriangulationFormulas { /** ANGLE CLOSURE: a triangle's third angle, the two measured angles subtracted from
    180. value max(0, 180 − a − b). -/
theorem fam_triangulation_angleclosure_1 : (fmax 0 ((180 - 60) - 70)) = 50 := by decide

/-- triangulation: angleclosure(100, 100) = 0 — TRIANGULATION — FIXING POINTS FROM ANGLES AND A KNOWN BASE, AS
    ARITHMETIC (chosen by the public-API registry, not by hand). Locating a station is numbers: the triangle's
    closing angle, the squared base length, where two sightlines meet, a resection's angle sum, the area a
    traverse encloses, a running bearing, the redundancy of a network, and how densely its points fall. Crosses
    to `surveying` — triangulation is the geometry surveying runs on. A measure. */ const PROOF = 'triangulation
    arithmetic (angle closure, squared baseline, intersection, resection, shoelace area, bearing sum, network
    redundancy, point density); the registry\'s uncovered geodesy domain; a measure crossed to surveying' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'triangulation', dst: 'surveying', formula, value,
    proof: PROOF, ...extra }, holds, { name: `triangulation.${name}`, params }) export class
    TriangulationFormulas { /** ANGLE CLOSURE: a triangle's third angle, the two measured angles subtracted from
    180. value max(0, 180 − a − b). -/
theorem fam_triangulation_angleclosure_2 : (fmax 0 ((180 - 100) - 100)) = 0 := by decide

/-- triangulation: areacoords(20, 10) = 100 — AREA FROM COORDS: a triangle's area from base and height, the
    shoelace halving. value ⌊base · height / 2⌋. -/
theorem fam_triangulation_areacoords_1 : ((20 * 10) / 2) = 100 := by decide

/-- triangulation: intersection(10, 30) = 20 — INTERSECTION: where two sightlines meet along the base, their
    midpoint coordinate. value ⌊(x1 + x2) / 2⌋. -/
theorem fam_triangulation_intersection_1 : ((10 + 30) / 2) = 20 := by decide

/-- triangulation: networkredundancy(12, 8) = 4 — NETWORK REDUNDANCY: the degrees of freedom, observations
    beyond the unknowns. value max(0, obs − unknowns). -/
theorem fam_triangulation_networkredundancy_1 : (fmax 0 (12 - 8)) = 4 := by decide

/-- triangulation: pointdensity(1000, 4) = 250 — POINT DENSITY: control points per unit area. value ⌊points /
    area⌋. -/
theorem fam_triangulation_pointdensity_1 : (1000 / 4) = 250 := by decide

/-- triangulation: resection(100, 120, 140) = 360 — RESECTION: the sum of the three observed angles at an
    unknown station. value a + b + c. -/
theorem fam_triangulation_resection_1 : ((100 + 120) + 140) = 360 := by decide

/-- tribology: friction(30, 100) = 30 — TRIBOLOGY — THE SCIENCE OF RUBBING SURFACES, AS ARITHMETIC. Friction,
    wear, and lubrication are numbers: the friction coefficient, the wear rate, the lubrication film ratio, the
    contact pressure, the viscosity, the hardness, the traction coefficient, and the fatigue life. Crosses to
    `materials` — tribology is what materials endure in contact. A measure. */ const PROOF = 'tribology
    arithmetic (friction, wear, lubrication, contact pressure, viscosity, hardness, traction, fatigue); the
    physics of rubbing surfaces; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'tribology', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `tribology.${name}`, params }) export class TribologyFormulas { /** FRICTION COEFFICIENT: friction force
    over normal load, ×100. value ⌊force · 100 / normal⌋. -/
theorem fam_tribology_friction_1 : ((30 * 100) / 100) = 30 := by decide

/-- tribology: wear(1000, 50) = 20 — WEAR RATE: worn volume over sliding distance. value ⌊volume / distance⌋. -/
theorem fam_tribology_wear_1 : (1000 / 50) = 20 := by decide

/-- tribology: lubrication(300, 100) = 3 — LUBRICATION FILM RATIO: film thickness over surface roughness. value
    ⌊film / roughness⌋. -/
theorem fam_tribology_lubrication_1 : (300 / 100) = 3 := by decide

/-- tribology: contact(5000, 25) = 200 — CONTACT PRESSURE: load over contact area. value ⌊load / area⌋. -/
theorem fam_tribology_contact_1 : (5000 / 25) = 200 := by decide

/-- tribology: viscosity(900, 30) = 30 — VISCOSITY: shear stress over shear rate. value ⌊stress / rate⌋. -/
theorem fam_tribology_viscosity_1 : (900 / 30) = 30 := by decide

/-- tribology: hardness(1000, 4) = 250 — HARDNESS: load over indentation area. value ⌊load / indentation⌋. -/
theorem fam_tribology_hardness_1 : (1000 / 4) = 250 := by decide

/-- tribology: traction(15, 100) = 15 — TRACTION COEFFICIENT: tangential force over normal load, ×100. value
    ⌊tangential · 100 / normal⌋. -/
theorem fam_tribology_traction_1 : ((15 * 100) / 100) = 15 := by decide

/-- tribology: fatigue(1000000, 500) = 2000 — FATIGUE LIFE: cycles to failure over load. value ⌊cycles / load⌋. -/
theorem fam_tribology_fatigue_1 : (1000000 / 500) = 2000 := by decide

/-- tribology: friction(1, 0) = 0 — TRIBOLOGY — THE SCIENCE OF RUBBING SURFACES, AS ARITHMETIC. Friction, wear,
    and lubrication are numbers: the friction coefficient, the wear rate, the lubrication film ratio, the
    contact pressure, the viscosity, the hardness, the traction coefficient, and the fatigue life. Crosses to
    `materials` — tribology is what materials endure in contact. A measure. */ const PROOF = 'tribology
    arithmetic (friction, wear, lubrication, contact pressure, viscosity, hardness, traction, fatigue); the
    physics of rubbing surfaces; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'tribology', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `tribology.${name}`, params }) export class TribologyFormulas { /** FRICTION COEFFICIENT: friction force
    over normal load, ×100. value ⌊force · 100 / normal⌋. -/
theorem fam_tribology_friction_2 : ((1 * 100) / 0) = 0 := by decide

/-- trigonometry: tangent(100, 100) = 1000 — TANGENT as the opposite over the adjacent, scaled by a thousand.
    value ⌊opposite·1000 / adjacent⌋. -/
theorem fam_trigonometry_tangent_1 : ((100 * 1000) / 100) = 1000 := by decide

/-- trigonometry: tangent(5, 0) = 0 — TANGENT as the opposite over the adjacent, scaled by a thousand. value
    ⌊opposite·1000 / adjacent⌋. -/
theorem fam_trigonometry_tangent_2 : ((5 * 1000) / 0) = 0 := by decide

/-- trigonometry: radians(180) = 3 — RADIANS, degrees to milliradian-ish integers. value ⌊degrees·175 / 10000⌋. -/
theorem fam_trigonometry_radians_1 : ((180 * 175) / 10000) = 3 := by decide

/-- trigonometry: period(100, 4) = 25 — PERIOD: the frequency shared across cycles. value ⌊frequency / cycles⌋. -/
theorem fam_trigonometry_period_1 : (100 / 4) = 25 := by decide

/-- trigonometry: period(100, 0) = 0 — PERIOD: the frequency shared across cycles. value ⌊frequency / cycles⌋. -/
theorem fam_trigonometry_period_2 : (100 / 0) = 0 := by decide

/-- trigonometry: amplitude(10, 2) = 4 — AMPLITUDE: half the peak-to-trough swing. value ⌊(peak − trough) / 2⌋. -/
theorem fam_trigonometry_amplitude_1 : ((10 - 2) / 2) = 4 := by decide

/-- trigonometry: amplitude(2, 10) = 0 — AMPLITUDE: half the peak-to-trough swing. value ⌊(peak − trough) / 2⌋. -/
theorem fam_trigonometry_amplitude_2 : ((2 - 10) / 2) = 0 := by decide

/-- trigonometry: phase(90, 360) = 90 — PHASE: the shift as degrees of the period. value ⌊shift·360 / period⌋. -/
theorem fam_trigonometry_phase_1 : ((90 * 360) / 360) = 90 := by decide

/-- trigonometry: phase(5, 0) = 0 — PHASE: the shift as degrees of the period. value ⌊shift·360 / period⌋. -/
theorem fam_trigonometry_phase_2 : ((5 * 360) / 0) = 0 := by decide

/-- trucking: costpermile(2000, 500) = 4 — TRUCKING — FREIGHT HAULING AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Moving freight is numbers: cost by the mile, fuel burned per gallon, how full the
    load is, the empty miles run, how busy the truck is, the hours a driver has left, the turnaround, and the
    payload share of the gross. Crosses to `transport` — trucking is what moves the goods. A measure. */ const
    PROOF = 'trucking arithmetic (cost per mile, fuel efficiency, load factor, deadhead, utilization, hours of
    service, turnaround, payload); a freight domain; a measure crossed to transport' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'trucking', dst: 'transport', formula, value, proof: PROOF,
    ...extra }, holds, { name: `trucking.${name}`, params }) export class TruckingFormulas { /** COST PER MILE:
    total cost over the miles driven. value ⌊cost / miles⌋. -/
theorem fam_trucking_costpermile_1 : (2000 / 500) = 4 := by decide

/-- trucking: fuelefficiency(700, 100) = 7 — FUEL EFFICIENCY: miles over gallons burned. value ⌊miles /
    gallons⌋. -/
theorem fam_trucking_fuelefficiency_1 : (700 / 100) = 7 := by decide

/-- trucking: loadfactor(40000, 45000) = 88 — LOAD FACTOR: loaded weight against capacity, as a percentage.
    value ⌊loaded · 100 / capacity⌋. -/
theorem fam_trucking_loadfactor_1 : ((40000 * 100) / 45000) = 88 := by decide

/-- trucking: deadhead(100, 500) = 20 — DEADHEAD: empty miles against total miles, as a percentage. value ⌊empty
    · 100 / total⌋. -/
theorem fam_trucking_deadhead_1 : ((100 * 100) / 500) = 20 := by decide

/-- trucking: utilization(600, 800) = 75 — UTILIZATION: miles driven against miles available, as a percentage.
    value ⌊driven · 100 / available⌋. -/
theorem fam_trucking_utilization_1 : ((600 * 100) / 800) = 75 := by decide

/-- trucking: hoursofservice(8, 11) = 3 — HOURS OF SERVICE: the hours a driver has left under the limit. value
    max(0, limit − driven). -/
theorem fam_trucking_hoursofservice_1 : (fmax 0 (11 - 8)) = 3 := by decide

/-- trucking: hoursofservice(14, 11) = 0 — HOURS OF SERVICE: the hours a driver has left under the limit. value
    max(0, limit − driven). -/
theorem fam_trucking_hoursofservice_2 : (fmax 0 (11 - 14)) = 0 := by decide

/-- trucking: turnaround(6) = 6 — TURNAROUND: the hours a load spends in turnaround. value hours. -/
theorem fam_trucking_turnaround_1 : 6 = 6 := by decide

/-- trucking: payload(30000, 80000) = 37 — PAYLOAD: the cargo share of the gross weight, as a percentage. value
    ⌊cargo · 100 / gross⌋. -/
theorem fam_trucking_payload_1 : ((30000 * 100) / 80000) = 37 := by decide

/-- tsunami: wavespeed(40000, 20) = 2000 -/
theorem fam_tsunami_wavespeed_1 : (40000 / 20) = 2000 := by decide

/-- tsunami: wavelength(200, 1) = 200 -/
theorem fam_tsunami_wavelength_1 : (200 * 1) = 200 := by decide

/-- tsunami: runup(10, 3) = 30 -/
theorem fam_tsunami_runup_1 : (10 * 3) = 30 := by decide

/-- tsunami: traveltime(6000, 200) = 30 -/
theorem fam_tsunami_traveltime_1 : (6000 / 200) = 30 := by decide

/-- tsunami: amplitude(500, 50) = 450 -/
theorem fam_tsunami_amplitude_1 : (fmax 0 (500 - 50)) = 450 := by decide

/-- tsunami: inundationdistance(30, 100) = 3000 -/
theorem fam_tsunami_inundationdistance_1 : (30 * 100) = 3000 := by decide

/-- tsunami: energyindex(8, 1000) = 8000 -/
theorem fam_tsunami_energyindex_1 : (8 * 1000) = 8000 := by decide

/-- tsunami: warningtime(3600, 60) = 60 -/
theorem fam_tsunami_warningtime_1 : (3600 / 60) = 60 := by decide

/-- tuning: centsoffset(12) = 1200 — CENTS OFFSET: cents in a span of semitones. value semitones · 100. -/
theorem fam_tuning_centsoffset_1 : (12 * 100) = 1200 := by decide

/-- tuning: equaltempered(3, 12) = 36 — EQUAL TEMPERED: steps when each octave is cut into equal divisions.
    value octaves · divisions. -/
theorem fam_tuning_equaltempered_1 : (3 * 12) = 36 := by decide

/-- tuning: frequencyratio(880, 440) = 2000 — FREQUENCY RATIO: a pitch over a base, in thousandths. value ⌊freq
    · 1000 / base⌋. -/
theorem fam_tuning_frequencyratio_1 : ((880 * 1000) / 440) = 2000 := by decide

/-- tuning: octaveratio(4) = 16 — OCTAVE RATIO: the frequency doubling across octaves. value 2^octaves. -/
theorem fam_tuning_octaveratio_1 : (2 ^ 4) = 16 := by decide

/-- tuning: pythagoreancomma(12) = 84 — PYTHAGOREAN COMMA: semitones from stacking perfect fifths (7 each).
    value fifths · 7. -/
theorem fam_tuning_pythagoreancomma_1 : (12 * 7) = 84 := by decide

/-- tuning: referencepitch(1, 440) = 880 — REFERENCE PITCH: a base pitch doubled by octave. value base ·
    2^octaves. -/
theorem fam_tuning_referencepitch_1 : (440 * (2 ^ 1)) = 880 := by decide

/-- tuning: semitoneratio(1200) = 12 — SEMITONE RATIO: the semitones a cents interval spans. value ⌊cents /
    100⌋. -/
theorem fam_tuning_semitoneratio_1 : (1200 / 100) = 12 := by decide

/-- turbine: power(50, 20) = 1000 — TURBINE — SPINNING MASS AS ARITHMETIC (chosen by the hardware registry, not
    by hand). A turbine is numbers: the power a flow at a head delivers, synchronous rpm from line frequency and
    poles, torque from power and speed, efficiency, the capacity factor, the swept area of the blades, blade tip
    speed, and the energy output over hours. Crosses to `energy` — a turbine is what energy flows through. A
    measure. */ const PROOF = 'turbine arithmetic (shaft power, synchronous rpm, torque, efficiency, capacity
    factor, swept area, tip speed, energy output); a hardware domain; a measure crossed to energy' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'turbine', dst: 'energy', formula, value, proof: PROOF, ...extra
    }, holds, { name: `turbine.${name}`, params }) export class TurbineFormulas { /** SHAFT POWER: a flow at a
    head. value flow · head. -/
theorem fam_turbine_power_1 : (50 * 20) = 1000 := by decide

/-- turbine: rpm(50, 4) = 1500 — SYNCHRONOUS RPM from line frequency and pole count. value ⌊freq · 120 / poles⌋. -/
theorem fam_turbine_rpm_1 : ((50 * 120) / 4) = 1500 := by decide

/-- turbine: torque(1000, 50) = 20 — TORQUE: shaft power over angular speed. value ⌊power / speed⌋. -/
theorem fam_turbine_torque_1 : (1000 / 50) = 20 := by decide

/-- turbine: efficiency(80, 100) = 80 — EFFICIENCY as a percentage of input delivered. value ⌊out · 100 / in⌋. -/
theorem fam_turbine_efficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- turbine: capacity(600, 1000) = 60 — CAPACITY FACTOR: actual output against rated, as a percentage. value
    ⌊actual · 100 / rated⌋. -/
theorem fam_turbine_capacity_1 : ((600 * 100) / 1000) = 60 := by decide

/-- turbine: sweep(10) = 314 — SWEPT AREA of the blades at a radius (π ≈ 314/100). value ⌊radius · radius · 314
    / 100⌋. -/
theorem fam_turbine_sweep_1 : (((10 * 10) * 314) / 100) = 314 := by decide

/-- turbine: tipspeed(1500, 10) = 1570 — BLADE TIP SPEED from rpm and radius (2π ≈ 628/100, per 60 s). value
    ⌊rpm · radius · 628 / 6000⌋. -/
theorem fam_turbine_tipspeed_1 : (((1500 * 10) * 628) / 6000) = 1570 := by decide

/-- turbine: output(1000, 24, 90) = 21600 — ENERGY OUTPUT: power over hours at an availability percentage. value
    ⌊power · hours · avail / 100⌋. -/
theorem fam_turbine_output_1 : (((1000 * 24) * 90) / 100) = 21600 := by decide

/-- turnaround: gatetime(240, 4) = 60 -/
theorem fam_turnaround_gatetime_1 : (240 / 4) = 60 := by decide

/-- turnaround: dockoccupancy(18, 24) = 75 -/
theorem fam_turnaround_dockoccupancy_1 : ((18 * 100) / 24) = 75 := by decide

/-- turnaround: loadtime(30, 20) = 50 -/
theorem fam_turnaround_loadtime_1 : (30 + 20) = 50 := by decide

/-- turnaround: cyclecount(480, 60) = 8 -/
theorem fam_turnaround_cyclecount_1 : (480 / 60) = 8 := by decide

/-- turnaround: delayminutes(90, 60) = 30 -/
theorem fam_turnaround_delayminutes_1 : (fmax 0 (90 - 60)) = 30 := by decide

/-- turnaround: berthutilization(20, 24) = 83 -/
theorem fam_turnaround_berthutilization_1 : ((20 * 100) / 24) = 83 := by decide

/-- turnaround: servicerate(480, 60) = 8 -/
theorem fam_turnaround_servicerate_1 : (480 / 60) = 8 := by decide

/-- turnaround: idlegap(60, 45) = 15 -/
theorem fam_turnaround_idlegap_1 : (fmax 0 (60 - 45)) = 15 := by decide

/-- typography: scale(16, 2) = 25 — MODULAR SCALE: a base sized up a step on the 1.25 (major third) ratio. value
    ⌊base · 5^step / 4^step⌋. -/
theorem fam_typography_scale_1 : ((16 * (5 ^ 2)) / (4 ^ 2)) = 25 := by decide

/-- typography: tracking(32, 25) = 8 — TRACKING: letter-spacing as a percent of the size. value ⌊size · pct /
    100⌋. -/
theorem fam_typography_tracking_1 : ((32 * 25) / 100) = 8 := by decide

/-- typography: leading(16, 150) = 24 — LEADING: line-height as a percent of the size. value ⌊size · pct / 100⌋. -/
theorem fam_typography_leading_1 : ((16 * 150) / 100) = 24 := by decide

/-- typography: words(660, 6) = 110 — WORDS: the words a line holds at an average chars-per-word. value ⌊chars /
    perWord⌋. -/
theorem fam_typography_words_1 : (660 / 6) = 110 := by decide

/-- typography: weight(4) = 400 — WEIGHT: the font-weight of a step (100..900). value step · 100. -/
theorem fam_typography_weight_1 : (4 * 100) = 400 := by decide

/-- typography: rhythm(10, 24) = 240 — RHYTHM: the vertical rhythm of a column, lines on a baseline. value lines
    · baseline. -/
theorem fam_typography_rhythm_1 : (10 * 24) = 240 := by decide

/-- typology: wordorderfreq(600, 1200) = 50 — TYPOLOGY — THE SHAPE OF LANGUAGES, AS ARITHMETIC (how languages
    vary, counted). Word order spread across a sample, morphemes a word carries, the phoneme inventory, the
    consonant-to-vowel ratio, the synthetic index, marked features, the feature count a sample fills, and the
    genetic distance between two languages. Crosses to `linguistics` — typology is the comparative measure
    linguistics builds on. A measure. */ const PROOF = 'typology arithmetic (word-order frequency, morpheme
    complexity, phoneme inventory, consonant/vowel ratio, synthetic index, markedness, feature count, genetic
    distance); a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'typology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `typology.${name}`, params }) export class TypologyFormulas { /** WORD-ORDER FREQUENCY: how often an order
    appears across a sample, as a percentage. value ⌊count · 100 / total⌋. -/
theorem fam_typology_wordorderfreq_1 : ((600 * 100) / 1200) = 50 := by decide

/-- typology: morphemecomplexity(10000, 3) = 30000 — MORPHEME COMPLEXITY: morphemes carried across a text of
    words. value words · morphemesPer. -/
theorem fam_typology_morphemecomplexity_1 : (10000 * 3) = 30000 := by decide

/-- typology: phonemeinventory(22, 5) = 27 — PHONEME INVENTORY: consonants and vowels together. value consonants
    + vowels. -/
theorem fam_typology_phonemeinventory_1 : (22 + 5) = 27 := by decide

/-- typology: consonantvowelratio(22, 5) = 440 — CONSONANT/VOWEL RATIO, scaled by 100. value ⌊consonants · 100 /
    vowels⌋. -/
theorem fam_typology_consonantvowelratio_1 : ((22 * 100) / 5) = 440 := by decide

/-- typology: syntheticindex(2550, 1000) = 255 — SYNTHETIC INDEX: morphemes per word, scaled by 100. value
    ⌊morphemes · 100 / words⌋. -/
theorem fam_typology_syntheticindex_1 : ((2550 * 100) / 1000) = 255 := by decide

/-- typology: markednesscount(30, 12) = 18 — MARKEDNESS: the marked features left once the unmarked are removed.
    value max(0, total − unmarked). -/
theorem fam_typology_markednesscount_1 : (fmax 0 (30 - 12)) = 18 := by decide

/-- typology: markednesscount(10, 15) = 0 — MARKEDNESS: the marked features left once the unmarked are removed.
    value max(0, total − unmarked). -/
theorem fam_typology_markednesscount_2 : (fmax 0 (10 - 15)) = 0 := by decide

/-- typology: featurecount(192, 3) = 576 — FEATURE COUNT: the feature cells a sample fills, parameters at values
    each. value parameters · valuesPer. -/
theorem fam_typology_featurecount_1 : (192 * 3) = 576 := by decide

/-- typology: geneticdistance(144, 100) = 44 — GENETIC DISTANCE: the features two languages do not share. value
    max(0, total − shared). -/
theorem fam_typology_geneticdistance_1 : (fmax 0 (144 - 100)) = 44 := by decide

/-- typology: geneticdistance(100, 144) = 0 — GENETIC DISTANCE: the features two languages do not share. value
    max(0, total − shared). -/
theorem fam_typology_geneticdistance_2 : (fmax 0 (100 - 144)) = 0 := by decide
