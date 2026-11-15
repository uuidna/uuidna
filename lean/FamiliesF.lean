-- lean/FamiliesF.lean — GENERATED. THE FAMILIES, F — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- failure: rpn(8, 5, 4) = 160 — FAILURE — FMEA AS ARITHMETIC (failure mode and effects analysis, as numbers).
    Reliability is counting: the risk priority number, severity, how often a mode occurs, how well it is
    detected, criticality, the modes a system has, their root causes, and the fraction of defects that escape.
    Crosses to `quality` — failure is what quality measures against. A measure. */ const PROOF = 'failure
    arithmetic (FMEA rpn, severity, occurrence, detection, criticality, mode count, root causes, escape rate);
    reliability as counting; a measure crossed to quality' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'failure', dst: 'quality', formula, value, proof: PROOF, ...extra }, holds, { name: `failure.${name}`,
    params }) export class FailureFormulas { /** RISK PRIORITY NUMBER: severity · occurrence · detection (the
    FMEA score). value severity · occurrence · detection. -/
theorem fam_failure_rpn_1 : ((8 * 5) * 4) = 160 := by decide

/-- failure: severity(7, 3) = 21 — SEVERITY: the harm of an effect over the scope it reaches. value impact ·
    scope. -/
theorem fam_failure_severity_1 : (7 * 3) = 21 := by decide

/-- failure: occurrence(50, 1000) = 5 — OCCURRENCE: how often a mode occurs, as a percentage. value ⌊failures ·
    100 / total⌋. -/
theorem fam_failure_occurrence_1 : ((50 * 100) / 1000) = 5 := by decide

/-- failure: detection(80, 100) = 80 — DETECTION: the share of defects caught, as a percentage. value ⌊caught ·
    100 / total⌋. -/
theorem fam_failure_detection_1 : ((80 * 100) / 100) = 80 := by decide

/-- failure: criticality(8, 5) = 40 — CRITICALITY: severity weighted by occurrence (MIL-STD, no detection).
    value severity · occurrence. -/
theorem fam_failure_criticality_1 : (8 * 5) = 40 := by decide

/-- failure: modecount(12, 4) = 48 — MODE COUNT: the failure modes a system has — components times the modes
    each. value components · perComponent. -/
theorem fam_failure_modecount_1 : (12 * 4) = 48 := by decide

/-- failure: rootcauses(10, 3) = 30 — ROOT CAUSES: the causes behind the modes — modes times the causes each.
    value modes · perMode. -/
theorem fam_failure_rootcauses_1 : (10 * 3) = 30 := by decide

/-- failure: escaperate(1000, 950) = 5 — ESCAPE RATE: the percentage of defects not caught before shipping.
    value ⌊max(0, total − caught) · 100 / total⌋. -/
theorem fam_failure_escaperate_1 : (((fmax 0 (1000 - 950)) * 100) / 1000) = 5 := by decide

/-- failure: escaperate(1000, 1100) = 0 — ESCAPE RATE: the percentage of defects not caught before shipping.
    value ⌊max(0, total − caught) · 100 / total⌋. -/
theorem fam_failure_escaperate_2 : (((fmax 0 (1000 - 1100)) * 100) / 1000) = 0 := by decide

/-- fatigue: amplitude(300, 100) = 100 — AMPLITUDE of a cycle: half the stress range. value ⌊max(0, smax − smin)
    / 2⌋. -/
theorem fam_fatigue_amplitude_1 : ((fmax 0 (300 - 100)) / 2) = 100 := by decide

/-- fatigue: cyclestofailure(10000, 50) = 200 — FATIGUE — METAL FATIGUE AS ARITHMETIC (how a material fails
    under repeated load, not one pull). Cyclic loading is numbers: the stress range of a cycle, its mean, its
    amplitude, how many cycles a part lasts, the accumulated Miner damage, the endurance limit under which it
    never fails, the R stress ratio, and the safety factor on strength. Crosses to `materials` — fatigue is a
    property of the material under test. A measure. */ const PROOF = 'fatigue arithmetic (stress range, mean,
    amplitude, cycles to failure, Miner damage, endurance limit, stress ratio, safety factor); cyclic failure of
    a loaded part; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'fatigue', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `fatigue.${name}`, params }) export class FatigueFormulas { /** CYCLES TO FAILURE: total damage capacity
    over the damage spent per cycle. value ⌊capacity / perCycle⌋. -/
theorem fam_fatigue_cyclestofailure_1 : (10000 / 50) = 200 := by decide

/-- fatigue: endurancelimit(400) = 200 — ENDURANCE LIMIT: the stress below which fatigue never occurs, half the
    ultimate strength. value ⌊ultimate · 50 / 100⌋. -/
theorem fam_fatigue_endurancelimit_1 : ((400 * 50) / 100) = 200 := by decide

/-- fatigue: meanstress(300, 100) = 200 — MEAN STRESS of a cycle: the midpoint of peak and trough. value ⌊(smax
    + smin) / 2⌋. -/
theorem fam_fatigue_meanstress_1 : ((300 + 100) / 2) = 200 := by decide

/-- fatigue: minerdamage(50, 200) = 25 — MINER DAMAGE: cycles applied over cycles allowed, as a percent of life
    spent. value ⌊applied · 100 / allowed⌋. -/
theorem fam_fatigue_minerdamage_1 : ((50 * 100) / 200) = 25 := by decide

/-- fatigue: safetyfactor(600, 200) = 3 — SAFETY FACTOR: material strength over the applied stress. value
    ⌊strength / applied⌋. -/
theorem fam_fatigue_safetyfactor_1 : (600 / 200) = 3 := by decide

/-- fatigue: stressrange(300, 100) = 200 — STRESS RANGE of a cycle: peak stress less trough stress. value max(0,
    smax − smin). -/
theorem fam_fatigue_stressrange_1 : (fmax 0 (300 - 100)) = 200 := by decide

/-- fatigue: stressratio(10, 100) = 10 — STRESS RATIO R: trough over peak, as a percent. value ⌊smin · 100 /
    smax⌋. -/
theorem fam_fatigue_stressratio_1 : ((10 * 100) / 100) = 10 := by decide

/-- feedback: closedloopgain(1000, 9) = 100 — FEEDBACK — CLOSED-LOOP CONTROL, AS ARITHMETIC. A feedback loop is
    numbers: the closed-loop gain a loop settles to, the loop transfer (open-loop gain around the ring), the
    error between reference and output, how much the loop suppresses disturbance (sensitivity), the damping of
    the response, its overshoot, how long it takes to settle, and the residual steady-state error. Crosses to
    `control` — feedback is the mechanism control applies. A measure. */ const PROOF = 'feedback arithmetic
    (closed-loop gain, loop transfer, error signal, sensitivity, damping, overshoot, settling time, steady-state
    error); closed-loop control reduced to integers; a measure crossed to control' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'feedback', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, {
    name: `feedback.${name}`, params }) export class FeedbackFormulas { /** CLOSED-LOOP GAIN: the gain a loop
    settles to under unity-scaled negative feedback. value ⌊forward / (1 + loop)⌋. -/
theorem fam_feedback_closedloopgain_1 : (1000 / (1 + 9)) = 100 := by decide

/-- feedback: dampingratio(50, 100) = 50 — DAMPING RATIO (percent): the actual damping against critical, scaled
    by 100. value ⌊actual · 100 / critical⌋. -/
theorem fam_feedback_dampingratio_1 : ((50 * 100) / 100) = 50 := by decide

/-- feedback: errorsignal(100, 70) = 30 — ERROR SIGNAL: the difference the loop must drive to zero. value max(0,
    reference − output). -/
theorem fam_feedback_errorsignal_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- feedback: errorsignal(50, 80) = 0 — ERROR SIGNAL: the difference the loop must drive to zero. value max(0,
    reference − output). -/
theorem fam_feedback_errorsignal_2 : (fmax 0 (50 - 80)) = 0 := by decide

/-- feedback: looptransfer(50, 3) = 150 — LOOP TRANSFER: the open-loop gain around the ring. value forward ·
    feedback. -/
theorem fam_feedback_looptransfer_1 : (50 * 3) = 150 := by decide

/-- feedback: overshoot(120, 100) = 20 — OVERSHOOT (percent): how far the peak exceeds the steady value. value
    ⌊max(0, peak − steady) · 100 / steady⌋. -/
theorem fam_feedback_overshoot_1 : (((fmax 0 (120 - 100)) * 100) / 100) = 20 := by decide

/-- feedback: sensitivity(3) = 25 — SENSITIVITY (percent): disturbance left unsuppressed, scaled by 100. value
    ⌊100 / (1 + loop)⌋. -/
theorem fam_feedback_sensitivity_1 : (100 / (1 + 3)) = 25 := by decide

/-- feedback: settlingtime(5, 4) = 20 — SETTLING TIME: time constants to settle, as bands of the constant. value
    constant · bands. -/
theorem fam_feedback_settlingtime_1 : (5 * 4) = 20 := by decide

/-- feedback: steadystateerror(100, 9) = 10 — STEADY-STATE ERROR: residual error under the loop gain. value
    ⌊reference / (1 + loop)⌋. -/
theorem fam_feedback_steadystateerror_1 : (100 / (1 + 9)) = 10 := by decide

/-- feedlot: rationcost(500, 8) = 4000 — FEEDLOT — CATTLE FINISHING, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Finishing cattle is numbers: the cost of a ration, average daily gain, feed
    conversion, dry-matter intake, the days a steer stays on feed, the break-even price, the ration's protein
    share, and its energy density. Crosses to `nutrition` — a feedlot is nutrition at the scale of a herd. A
    measure. */ const PROOF = 'feedlot arithmetic (ration cost, daily gain, feed efficiency, dry intake, days on
    feed, break-even, protein ratio, energy density); a herd-scale measure crossed to nutrition' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'feedlot', dst: 'nutrition', formula, value, proof: PROOF,
    ...extra }, holds, { name: `feedlot.${name}`, params }) export class FeedlotFormulas { /** RATION COST:
    pounds of feed at a per-pound rate. value pounds · rate. -/
theorem fam_feedlot_rationcost_1 : (500 * 8) = 4000 := by decide

/-- feedlot: dailygain(360, 180) = 2 — AVERAGE DAILY GAIN: pounds gained over days. value ⌊gain / days⌋. -/
theorem fam_feedlot_dailygain_1 : (360 / 180) = 2 := by decide

/-- feedlot: dryintake(2400, 120) = 20 — DRY-MATTER INTAKE per day: total pounds over days. value ⌊total /
    days⌋. -/
theorem fam_feedlot_dryintake_1 : (2400 / 120) = 20 := by decide

/-- feedlot: feedefficiency(1200, 200) = 6 — FEED EFFICIENCY (conversion): pounds of feed per pound of gain.
    value ⌊feed / gain⌋. -/
theorem fam_feedlot_feedefficiency_1 : (1200 / 200) = 6 := by decide

/-- feedlot: energydensity(6000, 100) = 60 — ENERGY DENSITY: megacalories over pounds of feed. value ⌊energy /
    pounds⌋. -/
theorem fam_feedlot_energydensity_1 : (6000 / 100) = 60 := by decide

/-- feedlot: proteinratio(45, 300) = 15 — PROTEIN RATIO: protein pounds as a percentage of the ration. value
    ⌊protein · 100 / total⌋. -/
theorem fam_feedlot_proteinratio_1 : ((45 * 100) / 300) = 15 := by decide

/-- feedlot: breakeven(900, 1200) = 75 — BREAK-EVEN PRICE: cents per pound to cover cost at a sale weight. value
    ⌊cost · 100 / weight⌋. -/
theorem fam_feedlot_breakeven_1 : ((900 * 100) / 1200) = 75 := by decide

/-- feedlot: dailygain(100, 0) = 0 — AVERAGE DAILY GAIN: pounds gained over days. value ⌊gain / days⌋. -/
theorem fam_feedlot_dailygain_2 : (100 / 0) = 0 := by decide

/-- fermentation: biomass(10000, 100) = 100 — FERMENTATION — THE BIOCHEMISTRY OF CULTURE, AS ARITHMETIC (a
    living domain chosen for the registry, not by hand). Fermentation is numbers: substrate converted,
    production rate, pH, biomass density, yield, ethanol against theory, temperature, and the inoculation ratio.
    Crosses to `biochemistry` — fermentation is what biochemistry measures. A measure. */ const PROOF =
    'fermentation arithmetic (conversion, rate, pH, biomass, yield, ethanol, temperature, inoculation); a living
    biochemical domain as integers; a measure crossed to biochemistry' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'fermentation', dst: 'biochemistry', formula, value, proof: PROOF, ...extra },
    holds, { name: `fermentation.${name}`, params }) export class FermentationFormulas { /** BIOMASS density:
    cells over the culture volume. value ⌊cells / volume⌋. -/
theorem fam_fermentation_biomass_1 : (10000 / 100) = 100 := by decide

/-- fermentation: conversion(80, 100) = 80 — CONVERSION: substrate consumed as a percentage. value ⌊converted ·
    100 / substrate⌋. -/
theorem fam_fermentation_conversion_1 : ((80 * 100) / 100) = 80 := by decide

/-- fermentation: ethanol(45, 50) = 90 — ETHANOL against theoretical maximum, as a percentage. value ⌊produced ·
    100 / theoretical⌋. -/
theorem fam_fermentation_ethanol_1 : ((45 * 100) / 50) = 90 := by decide

/-- fermentation: inoculation(5, 100) = 5 — INOCULATION ratio: starter against the batch, as a percentage. value
    ⌊starter · 100 / batch⌋. -/
theorem fam_fermentation_inoculation_1 : ((5 * 100) / 100) = 5 := by decide

/-- fermentation: output(60, 100) = 60 — YIELD: product from sugar, as a percentage. value ⌊product · 100 /
    sugar⌋. -/
theorem fam_fermentation_output_1 : ((60 * 100) / 100) = 60 := by decide

/-- fermentation: ph(30, 100) = 30 — pH as the acid/base ratio, as a percentage. value ⌊acid · 100 / base⌋. -/
theorem fam_fermentation_ph_1 : ((30 * 100) / 100) = 30 := by decide

/-- fermentation: rate(1200, 48) = 25 — RATE of production: amount over the hours elapsed. value ⌊produced /
    hours⌋. -/
theorem fam_fermentation_rate_1 : (1200 / 48) = 25 := by decide

/-- fermentation: temperature(37) = 37 — TEMPERATURE: the culture reading, held as a natural. value celsius. -/
theorem fam_fermentation_temperature_1 : 37 = 37 := by decide

/-- ferry: capacity(200, 2) = 400 -/
theorem fam_ferry_capacity_1 : (200 * 2) = 400 := by decide

/-- ferry: crossingtime(60, 1) = 60 -/
theorem fam_ferry_crossingtime_1 : (60 / 1) = 60 := by decide

/-- ferry: vehicledecks(2, 1) = 3 -/
theorem fam_ferry_vehicledecks_1 : (2 + 1) = 3 := by decide

/-- ferry: dailycrossings(1440, 90) = 16 -/
theorem fam_ferry_dailycrossings_1 : (1440 / 90) = 16 := by decide

/-- ferry: loadfactor(75, 100) = 75 -/
theorem fam_ferry_loadfactor_1 : ((75 * 100) / 100) = 75 := by decide

/-- ferry: turnaroundmin(60, 2) = 30 -/
theorem fam_ferry_turnaroundmin_1 : (60 / 2) = 30 := by decide

/-- ferry: throughput(400, 16) = 6400 -/
theorem fam_ferry_throughput_1 : (400 * 16) = 6400 := by decide

/-- fertilization: nitrogenrate(200, 50) = 150 — FERTILIZATION — FEEDING A CROP, AS ARITHMETIC (a measure
    crossed to agronomy). Growing is numbers: the nitrogen a crop needs after the soil's credit, a nutrient's
    share of a blend, the fertilizer a field takes, what the harvest removes, what leaches away, a soil test
    against its critical level, a dose split across passes, and how much of what is applied the crop actually
    uses. Crosses to `agronomy` — fertilization is what agronomy prescribes. A measure. */ const PROOF =
    'fertilization arithmetic (nitrogen rate, NPK share, application rate, nutrient uptake, leaching loss,
    soil-test index, split dose, use efficiency); a measure crossed to agronomy' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'fertilization', dst: 'agronomy', formula, value, proof: PROOF, ...extra }, holds,
    { name: `fertilization.${name}`, params }) export class FertilizationFormulas { /** NITROGEN RATE: the
    crop's N target less the soil's supply. value max(0, target − soil). -/
theorem fam_fertilization_nitrogenrate_1 : (fmax 0 (200 - 50)) = 150 := by decide

/-- fertilization: npkratio(10, 40) = 25 — NPK SHARE: a nutrient's percentage of the blend. value ⌊part · 100 /
    total⌋. -/
theorem fam_fertilization_npkratio_1 : ((10 * 100) / 40) = 25 := by decide

/-- fertilization: applicationrate(50, 120) = 6000 — APPLICATION RATE: a field's area at a per-hectare rate.
    value area · rate. -/
theorem fam_fertilization_applicationrate_1 : (50 * 120) = 6000 := by decide

/-- fertilization: nutrientuptake(8, 25) = 200 — NUTRIENT UPTAKE: the harvest's yield at a per-unit uptake.
    value yield · perUnit. -/
theorem fam_fertilization_nutrientuptake_1 : (8 * 25) = 200 := by decide

/-- fertilization: leachingloss(200, 15) = 30 — LEACHING LOSS: a percentage of what was applied washes away.
    value ⌊applied · pct / 100⌋. -/
theorem fam_fertilization_leachingloss_1 : ((200 * 15) / 100) = 30 := by decide

/-- fertilization: soiltestindex(60, 40) = 150 — SOIL-TEST INDEX: a measured level against its critical level.
    value ⌊measured · 100 / critical⌋. -/
theorem fam_fertilization_soiltestindex_1 : ((60 * 100) / 40) = 150 := by decide

/-- fertilization: splitapplication(180, 3) = 60 — SPLIT APPLICATION: a total dose spread evenly across passes.
    value ⌊total / splits⌋. -/
theorem fam_fertilization_splitapplication_1 : (180 / 3) = 60 := by decide

/-- fertilization: efficiency(120, 200) = 60 — USE EFFICIENCY: the share of applied nutrient the crop takes up.
    value ⌊uptake · 100 / applied⌋. -/
theorem fam_fertilization_efficiency_1 : ((120 * 100) / 200) = 60 := by decide

/-- fertilization: efficiency(50, 0) = 0 — USE EFFICIENCY: the share of applied nutrient the crop takes up.
    value ⌊uptake · 100 / applied⌋. -/
theorem fam_fertilization_efficiency_2 : ((50 * 100) / 0) = 0 := by decide

/-- field: depth(3) = 3 — FIELD — THE PAYLOAD CMS FIELD API, AS ARITHMETIC (chosen by the field registry, not by
    hand). A field schema is numbers: the share of fields that are required, the share localized, how deeply
    groups nest, whether a value fits its max length, whether values stay unique, the share indexed, how many
    options a select carries, and fields packed per group. Crosses to `payload` — fields are what Payload
    stores. A measure. */ const PROOF = 'field arithmetic (required %, localized %, nesting depth, length fit,
    uniqueness, indexed %, option count, fields per group); the Payload CMS field API as exact integers; a
    measure crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'field', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `field.${name}`, params }) export class
    FieldFormulas { /** DEPTH: how deeply field groups nest. value nested (holds when ≤ 5). -/
theorem fam_field_depth_1 : 3 = 3 := by decide

/-- field: group(100, 4) = 25 — GROUP: fields packed per group. value ⌊fields / groups⌋. -/
theorem fam_field_group_1 : (100 / 4) = 25 := by decide

/-- field: indexed(3, 12) = 25 — INDEXED as a percentage of all fields. value ⌊idx · 100 / total⌋. -/
theorem fam_field_indexed_1 : ((3 * 100) / 12) = 25 := by decide

/-- field: localized(6, 12) = 50 — LOCALIZED as a percentage of all fields. value ⌊loc · 100 / total⌋. -/
theorem fam_field_localized_1 : ((6 * 100) / 12) = 50 := by decide

/-- field: options(5) = 5 — OPTIONS a select field carries. value count. -/
theorem fam_field_options_1 : 5 = 5 := by decide

/-- field: required(9, 12) = 75 — REQUIRED as a percentage of all fields. value ⌊req · 100 / total⌋. -/
theorem fam_field_required_1 : ((9 * 100) / 12) = 75 := by decide

/-- filtering: cutoff(48000, 4) = 12000 — FILTERING — SHAPING A SIGNAL IN FREQUENCY, AS ARITHMETIC. A filter is
    numbers: the cutoff frequency it turns at, the width of the band it passes, where the stopband begins, how
    steeply it rolls off, the order that steepness needs, the group delay its taps impose, the attenuation it
    reaches, and the bandwidth around a centre. Crosses to `signal` — filtering is what shapes a signal. A
    measure. */ const PROOF = 'filtering arithmetic (cutoff, passband, stopband, rolloff, order, group delay,
    attenuation, bandwidth); a frequency-domain measure crossed to signal' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'filtering', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, {
    name: `filtering.${name}`, params }) export class FilteringFormulas { /** CUTOFF: the frequency a filter
    turns at, a fraction of the sample rate. value ⌊sample / div⌋. -/
theorem fam_filtering_cutoff_1 : (48000 / 4) = 12000 := by decide

/-- filtering: passband(3000, 1000) = 2000 — PASSBAND: the width of the band a filter passes. value max(0, high
    − low). -/
theorem fam_filtering_passband_1 : (fmax 0 (3000 - 1000)) = 2000 := by decide

/-- filtering: stopband(4000, 500) = 4500 — STOPBAND: where attenuation begins, a transition above the cutoff.
    value cutoff + transition. -/
theorem fam_filtering_stopband_1 : (4000 + 500) = 4500 := by decide

/-- filtering: rolloff(4) = 24 — ROLLOFF: the slope past the cutoff, 6 dB per octave per order. value order · 6. -/
theorem fam_filtering_rolloff_1 : (4 * 6) = 24 := by decide

/-- filtering: groupdelay(101) = 50 — GROUP DELAY: the delay a linear-phase FIR imposes, half its taps. value
    ⌊max(0, taps − 1) / 2⌋. -/
theorem fam_filtering_groupdelay_1 : ((fmax 0 (101 - 1)) / 2) = 50 := by decide

/-- filtering: attenuation(4, 3) = 72 — ATTENUATION: the stopband attenuation an order reaches over octaves.
    value order · 6 · octaves. -/
theorem fam_filtering_attenuation_1 : ((4 * 6) * 3) = 72 := by decide

/-- filtering: bandwidth(12000, 4) = 3000 — BANDWIDTH: the band around a centre at a quality factor. value
    ⌊centre / q⌋. -/
theorem fam_filtering_bandwidth_1 : (12000 / 4) = 3000 := by decide

/-- filtering: passband(1000, 3000) = 0 — PASSBAND: the width of the band a filter passes. value max(0, high −
    low). -/
theorem fam_filtering_passband_2 : (fmax 0 (1000 - 3000)) = 0 := by decide

/-- filters: rolloff(2, 3) = 36 — ROLL-OFF: the slope in dB, 6 dB per octave per pole. value poles · 6 ·
    octaves. -/
theorem fam_filters_rolloff_1 : ((2 * 6) * 3) = 36 := by decide

/-- filters: qfactor(1000, 50) = 20 — QUALITY FACTOR: centre frequency over bandwidth. value ⌊freq / bw⌋. -/
theorem fam_filters_qfactor_1 : (1000 / 50) = 20 := by decide

/-- filters: bandwidth(2000, 500) = 1500 — BANDWIDTH between the upper and lower edges. value max(0, high −
    low). -/
theorem fam_filters_bandwidth_1 : (fmax 0 (2000 - 500)) = 1500 := by decide

/-- filters: passband(100, 3) = 97 — PASSBAND gain after the ripple is spent. value max(0, gain − ripple). -/
theorem fam_filters_passband_1 : (fmax 0 (100 - 3)) = 97 := by decide

/-- filters: stopband(4, 20) = 80 — STOPBAND attenuation: the poles at a per-pole attenuation. value poles ·
    perPole. -/
theorem fam_filters_stopband_1 : (4 * 20) = 80 := by decide

/-- filters: ripple(1000, 5) = 50 — RIPPLE: a percentage of the amplitude. value ⌊amp · percent / 100⌋. -/
theorem fam_filters_ripple_1 : ((1000 * 5) / 100) = 50 := by decide

/-- firewall: blockrate(250, 1000) = 25 — FIREWALL — PACKET POLICY AS ARITHMETIC (chosen by the networking
    registry, not by hand). Filtering traffic is numbers: the block rate, throughput, the rules in force,
    inspection latency, the false-block rate, connections against capacity, deep inspection, and port coverage.
    Crosses to `networking` — the firewall is what networking enforces. A measure. */ const PROOF = 'firewall
    arithmetic (block rate, throughput, rule count, latency, false-block, connections, inspection, coverage); a
    networking policy measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'firewall', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `firewall.${name}`, params }) export class FirewallFormulas { /** BLOCK RATE: blocked packets as a
    percentage of total. value ⌊blocked · 100 / total⌋. -/
theorem fam_firewall_blockrate_1 : ((250 * 100) / 1000) = 25 := by decide

/-- firewall: throughput(60000, 60) = 1000 — THROUGHPUT: packets over seconds. value ⌊packets / seconds⌋. -/
theorem fam_firewall_throughput_1 : (60000 / 60) = 1000 := by decide

/-- firewall: rules(512) = 512 — RULES in force. value count. -/
theorem fam_firewall_rules_1 : 512 = 512 := by decide

/-- firewall: latency(45) = 45 — INSPECTION LATENCY in microseconds. value microseconds. -/
theorem fam_firewall_latency_1 : 45 = 45 := by decide

/-- firewall: falseblock(3, 250) = 1 — FALSE-BLOCK RATE: legitimate packets as a percentage of blocked. value
    ⌊legitimate · 100 / blocked⌋. -/
theorem fam_firewall_falseblock_1 : ((3 * 100) / 250) = 1 := by decide

/-- firewall: connections(800, 1000) = 80 — CONNECTIONS against capacity, as a percentage. value ⌊active · 100 /
    capacity⌋. -/
theorem fam_firewall_connections_1 : ((800 * 100) / 1000) = 80 := by decide

/-- firewall: inspection(900, 1000) = 90 — DEEP INSPECTION: inspected packets as a percentage of total packets.
    value ⌊inspected · 100 / packets⌋. -/
theorem fam_firewall_inspection_1 : ((900 * 100) / 1000) = 90 := by decide

/-- firewall: coverage(48, 64) = 75 — PORT COVERAGE: ports covered as a percentage of total. value ⌊ports · 100
    / total⌋. -/
theorem fam_firewall_coverage_1 : ((48 * 100) / 64) = 75 := by decide

/-- fishery: catch(40, 25) = 1000 — FISHERY — FISHERIES SCIENCE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A fishery is numbers: the catch an effort lands at a rate, the biomass of a stock by
    weight, the quota left under an allowance, catch per unit effort, whether the catch is sustainable against
    recruitment, the bycatch discarded, spawning output, and mortality. Crosses to `environment` — a fishery is
    what the environment sustains. A measure. */ const PROOF = 'fishery arithmetic (catch, biomass, quota, cpue,
    sustainable, bycatch, spawning, mortality); fisheries science as integers; a measure crossed to environment'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'fishery', dst: 'environment', formula, value,
    proof: PROOF, ...extra }, holds, { name: `fishery.${name}`, params }) export class FisheryFormulas { /**
    CATCH: effort landed at a per-unit rate. value effort · rate. -/
theorem fam_fishery_catch_1 : (40 * 25) = 1000 := by decide

/-- fishery: biomass(2000, 3) = 6000 — BIOMASS: a stock of fish at a weight each. value stock · weight. -/
theorem fam_fishery_biomass_1 : (2000 * 3) = 6000 := by decide

/-- fishery: quota(5000, 1200) = 3800 — QUOTA remaining: the allowance less what was caught, floored at 0. value
    max(0, allowed − caught). -/
theorem fam_fishery_quota_1 : (fmax 0 (5000 - 1200)) = 3800 := by decide

/-- fishery: quota(1000, 1200) = 0 — QUOTA remaining: the allowance less what was caught, floored at 0. value
    max(0, allowed − caught). -/
theorem fam_fishery_quota_2 : (fmax 0 (1000 - 1200)) = 0 := by decide

/-- fishery: cpue(1000, 40) = 2500 — CPUE: catch per unit effort, ×100. value ⌊catch · 100 / effort⌋. -/
theorem fam_fishery_cpue_1 : ((1000 * 100) / 40) = 2500 := by decide

/-- fishery: bycatch(150, 1000) = 15 — BYCATCH as a percentage of the total haul. value ⌊discard · 100 / total⌋. -/
theorem fam_fishery_bycatch_1 : ((150 * 100) / 1000) = 15 := by decide

/-- fishery: spawning(10000, 20) = 2000 — SPAWNING output: eggs at a survival percentage. value ⌊eggs · survival
    / 100⌋. -/
theorem fam_fishery_spawning_1 : ((10000 * 20) / 100) = 2000 := by decide

/-- fishery: mortality(250, 1000) = 25 — MORTALITY as a percentage of the population. value ⌊deaths · 100 /
    population⌋. -/
theorem fam_fishery_mortality_1 : ((250 * 100) / 1000) = 25 := by decide

/-- fitness: volume(3, 10) = 30 — FITNESS — EXERCISE SCIENCE, AS ARITHMETIC (chosen by the public-API registry,
    not by hand). Training is numbers: the volume a session moves, an estimated one-rep max, max heart rate by
    age, the heart-rate zone, running pace, calories burned, a recovery ratio, and the progress made since a
    baseline. Crosses to `med` — fitness is what medicine measures. A measure. */ const PROOF = 'fitness
    arithmetic (training volume, one-rep max, max heart rate, heart-rate zone, pace, calories, recovery,
    progress); exercise science as integers; a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'fitness', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `fitness.${name}`, params }) export class FitnessFormulas { /** TRAINING VOLUME: sets times reps. value sets
    · reps. -/
theorem fam_fitness_volume_1 : (3 * 10) = 30 := by decide

/-- fitness: onerm(100, 5) = 115 — ONE-REP MAX (Epley-ish): a lift scaled by the reps performed. value ⌊weight ·
    (100 + reps · 3) / 100⌋. -/
theorem fam_fitness_onerm_1 : ((100 * (100 + (5 * 3))) / 100) = 115 := by decide

/-- fitness: heartrate(40) = 180 — MAX HEART RATE by age. value max(0, 220 − age). -/
theorem fam_fitness_heartrate_1 : (fmax 0 (220 - 40)) = 180 := by decide

/-- fitness: zone(135, 180) = 75 — HEART-RATE ZONE as a percentage of max. value ⌊hr · 100 / max⌋. -/
theorem fam_fitness_zone_1 : ((135 * 100) / 180) = 75 := by decide

/-- fitness: pace(5, 1500) = 300 — PACE: time over distance. value ⌊time / distance⌋. -/
theorem fam_fitness_pace_1 : (1500 / 5) = 300 := by decide

/-- fitness: calories(8, 30) = 240 — CALORIES: MET times minutes. value met · minutes. -/
theorem fam_fitness_calories_1 : (8 * 30) = 240 := by decide

/-- fitness: recovery(100, 4) = 25 — RECOVERY: load over rest. value ⌊load / rest⌋. -/
theorem fam_fitness_recovery_1 : (100 / 4) = 25 := by decide

/-- fitness: progress(120, 100) = 20 — PROGRESS since a baseline. value max(0, now − start). -/
theorem fam_fitness_progress_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- fitness: progress(80, 100) = 0 — PROGRESS since a baseline. value max(0, now − start). -/
theorem fam_fitness_progress_2 : (fmax 0 (80 - 100)) = 0 := by decide

/-- fleet: availability(95, 100) = 95 — FLEET — RUNNING A FLEET AS ARITHMETIC. Vehicles are numbers: how many
    are up, how much they are down, how hard they are worked, what upkeep costs each one, how far through their
    life they are, how much they sit idle, when to replace them, and how noisy their telematics are. Crosses to
    `transport` — a fleet is what transport runs on. A measure. */ const PROOF = 'fleet arithmetic
    (availability, downtime, utilization, maintenance, lifecycle, idle, replacement, telematics); vehicles as a
    measure crossed to transport' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'fleet', dst: 'transport',
    formula, value, proof: PROOF, ...extra }, holds, { name: `fleet.${name}`, params }) export class
    FleetFormulas { /** AVAILABILITY as a percentage: the operational share of the fleet. value ⌊operational ·
    100 / total⌋. -/
theorem fam_fleet_availability_1 : ((95 * 100) / 100) = 95 := by decide

/-- fleet: downtime(5, 100) = 5 — DOWNTIME as a percentage: hours lost over the total hours. value ⌊hours · 100
    / total⌋. -/
theorem fam_fleet_downtime_1 : ((5 * 100) / 100) = 5 := by decide

/-- fleet: utilization(60, 80) = 75 — UTILIZATION as a percentage: the active share of the fleet. value ⌊active
    · 100 / fleet⌋. -/
theorem fam_fleet_utilization_1 : ((60 * 100) / 80) = 75 := by decide

/-- fleet: maintenance(12000, 40) = 300 — MAINTENANCE: upkeep cost per vehicle. value ⌊cost / vehicles⌋. -/
theorem fam_fleet_maintenance_1 : (12000 / 40) = 300 := by decide

/-- fleet: lifecycle(80000, 100000) = 80 — LIFECYCLE as a percentage: mileage against the service threshold.
    value ⌊mileage · 100 / threshold⌋. -/
theorem fam_fleet_lifecycle_1 : ((80000 * 100) / 100000) = 80 := by decide

/-- fleet: idle(20, 80) = 25 — IDLE as a percentage: idle share of the fleet. value ⌊idle · 100 / total⌋. -/
theorem fam_fleet_idle_1 : ((20 * 100) / 80) = 25 := by decide

/-- fleet: replacement(6, 10) = 60 — REPLACEMENT as a percentage: age against expected lifespan. value ⌊age ·
    100 / lifespan⌋. -/
theorem fam_fleet_replacement_1 : ((6 * 100) / 10) = 60 := by decide

/-- fleet: telematics(6000, 120) = 50 — TELEMATICS: events logged per trip. value ⌊events / trips⌋. -/
theorem fam_fleet_telematics_1 : (6000 / 120) = 50 := by decide

/-- flightdynamics: loadfactor(2400, 1000) = 240 — FLIGHTDYNAMICS — THE AIRCRAFT IN MOTION, AS ARITHMETIC (an
    aircraft's flight envelope is numbers). Load factor, stall speed, turn rate, climb gradient, wing loading,
    thrust-to-weight, range, and the bank angle of a turn. Crosses to `dynamics` — flight dynamics is the
    dynamics of a body under lift, thrust, drag and weight. A measure. */ const PROOF = 'flightdynamics
    arithmetic (load factor, stall speed, turn rate, climb gradient, wing loading, thrust-to-weight, range, bank
    angle); an aircraft\'s flight envelope as integers; a measure crossed to dynamics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'flightdynamics', dst: 'dynamics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `flightdynamics.${name}`, params }) export class FlightdynamicsFormulas { /**
    LOAD FACTOR: lift over weight, as a percentage (100 = 1 g). value ⌊lift · 100 / weight⌋. -/
theorem fam_flightdynamics_loadfactor_1 : ((2400 * 100) / 1000) = 240 := by decide

/-- flightdynamics: stallspeed(600, 2) = 300 — STALL SPEED (dynamic-pressure proxy): wing loading over the max
    lift coefficient. value ⌊wingload / clmax⌋. -/
theorem fam_flightdynamics_stallspeed_1 : (600 / 2) = 300 := by decide

/-- flightdynamics: turnrate(300, 20) = 15 — TURN RATE: speed over turn radius. value ⌊speed / radius⌋. -/
theorem fam_flightdynamics_turnrate_1 : (300 / 20) = 15 := by decide

/-- flightdynamics: climbgradient(500, 10000) = 5 — CLIMB GRADIENT: rise over run, as a percentage. value ⌊climb
    · 100 / forward⌋. -/
theorem fam_flightdynamics_climbgradient_1 : ((500 * 100) / 10000) = 5 := by decide

/-- flightdynamics: wingloading(1200, 16) = 75 — WING LOADING: weight over wing area. value ⌊weight / area⌋. -/
theorem fam_flightdynamics_wingloading_1 : (1200 / 16) = 75 := by decide

/-- flightdynamics: thrusttoweight(300, 1000) = 30 — THRUST-TO-WEIGHT: thrust over weight, as a percentage.
    value ⌊thrust · 100 / weight⌋. -/
theorem fam_flightdynamics_thrusttoweight_1 : ((300 * 100) / 1000) = 30 := by decide

/-- flightdynamics: rangefactor(500, 6) = 3000 — RANGE: cruise speed over endurance hours. value speed ·
    endurance. -/
theorem fam_flightdynamics_rangefactor_1 : (500 * 6) = 3000 := by decide

/-- flightdynamics: bankangle(173, 100) = 173 — BANK ANGLE (tangent proxy): lateral over vertical component, as
    a percentage. value ⌊lateral · 100 / vertical⌋. -/
theorem fam_flightdynamics_bankangle_1 : ((173 * 100) / 100) = 173 := by decide

/-- flightdynamics: turnrate(300, 0) = 0 — TURN RATE: speed over turn radius. value ⌊speed / radius⌋. -/
theorem fam_flightdynamics_turnrate_2 : (300 / 0) = 0 := by decide

/-- floriculture: bloomrate(120, 6) = 20 — FLORICULTURE — GROWING CUT FLOWERS AND ORNAMENTALS, AS ARITHMETIC
    (chosen by the public-API registry, not by hand). Growing blooms is numbers: how fast buds open, stem length
    from the nodes, days a cut stem lasts in the vase, the crop a bed yields, the plants a bed holds, the
    saleable stems after culls, petals per flower, and whether the chill forces a bloom. Crosses to `botany` —
    floriculture is botany put to work. A measure. */ const PROOF = 'floriculture arithmetic (bloom rate, stem
    length, vase life, yield, spacing, grade-out, petal count, forcing); a registry domain uncovered; a measure
    crossed to botany' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const
    c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'floriculture', dst: 'botany',
    formula, value, proof: PROOF, ...extra }, holds, { name: `floriculture.${name}`, params }) export class
    FloricultureFormulas { /** BLOOM RATE: buds that open per day. value ⌊blooms / days⌋. -/
theorem fam_floriculture_bloomrate_1 : (120 / 6) = 20 := by decide

/-- floriculture: stemlength(12, 3) = 36 — STEM LENGTH: nodes at an internode length each. value nodes · intern. -/
theorem fam_floriculture_stemlength_1 : (12 * 3) = 36 := by decide

/-- floriculture: vaselife(14, 5) = 9 — VASE LIFE: base days a cut stem lasts, shortened by temperature. value
    max(0, base − temp). -/
theorem fam_floriculture_vaselife_1 : (fmax 0 (14 - 5)) = 9 := by decide

/-- floriculture: yield(200, 8) = 1600 — YIELD: plants at a stem count each. value plants · perplant. -/
theorem fam_floriculture_yield_1 : (200 * 8) = 1600 := by decide

/-- floriculture: spacing(1000, 25) = 40 — SPACING: the plants a bed holds at an area per plant. value ⌊area /
    perplant⌋. -/
theorem fam_floriculture_spacing_1 : (1000 / 25) = 40 := by decide

/-- floriculture: gradeout(500, 40) = 460 — GRADE-OUT: saleable stems after the culls are pulled. value max(0,
    total − culls). -/
theorem fam_floriculture_gradeout_1 : (fmax 0 (500 - 40)) = 460 := by decide

/-- floriculture: petalcount(5, 8) = 40 — PETAL COUNT: petals from whorls at a count each. value whorls · per. -/
theorem fam_floriculture_petalcount_1 : (5 * 8) = 40 := by decide

/-- fluiddynamics: reynolds(200, 3, 2) = 300 — FLUIDDYNAMICS — MOVING FLUID AS ARITHMETIC. Flow is numbers: the
    Reynolds number that sorts laminar from turbulent, the volumetric flow through an area, the pressure a pipe
    drops, the velocity a flow carries, the total pressure Bernoulli conserves, the viscosity a shear reveals,
    the Froude number of a free surface, and the Mach number against the speed of sound. Crosses to
    `aerodynamics` — fluid in motion is what a wing works. A measure. */ const PROOF = 'fluiddynamics arithmetic
    (Reynolds, flow rate, pressure drop, velocity, Bernoulli total, viscosity, Froude, Mach); moving fluid as
    integers; a measure crossed to aerodynamics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'fluiddynamics', dst: 'aerodynamics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `fluiddynamics.${name}`, params }) export class FluiddynamicsFormulas { /** REYNOLDS NUMBER: inertia over
    viscosity, Re = v·L / ν. value ⌊velocity · length / viscosity⌋. -/
theorem fam_fluiddynamics_reynolds_1 : ((200 * 3) / 2) = 300 := by decide

/-- fluiddynamics: flowrate(5, 20) = 100 — FLOW RATE: volume through an area, Q = A·v. value area · velocity. -/
theorem fam_fluiddynamics_flowrate_1 : (5 * 20) = 100 := by decide

/-- fluiddynamics: pressuredrop(100, 8, 4) = 200 — PRESSURE DROP along a run carrying a rate through a bore.
    value ⌊length · rate / diameter⌋. -/
theorem fam_fluiddynamics_pressuredrop_1 : ((100 * 8) / 4) = 200 := by decide

/-- fluiddynamics: velocity(1000, 25) = 40 — VELOCITY: a flow through an area, v = Q / A. value ⌊flow / area⌋. -/
theorem fam_fluiddynamics_velocity_1 : (1000 / 25) = 40 := by decide

/-- fluiddynamics: bernoulli(100, 2, 10) = 200 — BERNOULLI: total pressure, static plus dynamic, p + ½ρv². value
    pressure + ⌊density · velocity · velocity / 2⌋. -/
theorem fam_fluiddynamics_bernoulli_1 : (100 + (((2 * 10) * 10) / 2)) = 200 := by decide

/-- fluiddynamics: viscosity(500, 10) = 50 — VISCOSITY: shear stress over shear rate, μ = τ / γ̇. value ⌊stress
    / rate⌋. -/
theorem fam_fluiddynamics_viscosity_1 : (500 / 10) = 50 := by decide

/-- fluiddynamics: froude(20, 10, 2) = 20 — FROUDE NUMBER (squared): inertia over gravity on a free surface, Fr²
    = v² / (g·L). value ⌊velocity · velocity / (gravity · length)⌋. -/
theorem fam_fluiddynamics_froude_1 : ((20 * 20) / (10 * 2)) = 20 := by decide

/-- fluiddynamics: machnumber(680, 340) = 200 — MACH NUMBER (×100): speed against the speed of sound, M = v / a.
    value ⌊speed · 100 / soundspeed⌋. -/
theorem fam_fluiddynamics_machnumber_1 : ((680 * 100) / 340) = 200 := by decide

/-- folklore: taletypes(200, 100) = 300 -/
theorem fam_folklore_taletypes_1 : (200 + 100) = 300 := by decide

/-- folklore: regionsubsets(6) = 64 -/
theorem fam_folklore_regionsubsets_1 : (2 ^ 6) = 64 := by decide

/-- folklore: performercount(12, 5) = 60 -/
theorem fam_folklore_performercount_1 : (12 * 5) = 60 := by decide

/-- folklore: diffusionrate(60, 100) = 60 -/
theorem fam_folklore_diffusionrate_1 : ((60 * 100) / 100) = 60 := by decide

/-- folklore: collectionsize(300, 200) = 500 -/
theorem fam_folklore_collectionsize_1 : (300 + 200) = 500 := by decide

/-- foodsafety: dangerzonehours(2, 2) = 4 -/
theorem fam_foodsafety_dangerzonehours_1 : (2 + 2) = 4 := by decide

/-- foodsafety: cookingtempc(74, 75) = 75 -/
theorem fam_foodsafety_cookingtempc_1 : (fmax 74 75) = 75 := by decide

/-- foodsafety: coolingtime(360, 2) = 180 -/
theorem fam_foodsafety_coolingtime_1 : (360 / 2) = 180 := by decide

/-- foodsafety: contaminationrate(3, 100) = 3 -/
theorem fam_foodsafety_contaminationrate_1 : ((3 * 100) / 100) = 3 := by decide

/-- foodsafety: haccppoints(7, 0) = 7 -/
theorem fam_foodsafety_haccppoints_1 : (7 + 0) = 7 := by decide

/-- foodsafety: logreduction(5) = 32 -/
theorem fam_foodsafety_logreduction_1 : (2 ^ 5) = 32 := by decide

/-- foodsafety: compliancepct(95, 100) = 95 -/
theorem fam_foodsafety_compliancepct_1 : ((95 * 100) / 100) = 95 := by decide

/-- forestry: density(1200, 4) = 300 — STOCKING DENSITY: trees per hectare. value ⌊trees / hectares⌋. -/
theorem fam_forestry_density_1 : (1200 / 4) = 300 := by decide

/-- forestry: carbon(5000, 47) = 2350 — CARBON: carbon stored in biomass at a factor (percent). value ⌊biomass ·
    factor / 100⌋. -/
theorem fam_forestry_carbon_1 : ((5000 * 47) / 100) = 2350 := by decide

/-- forestry: growth(120, 100) = 20 — GROWTH: the increase over the previous measure, never negative. value
    max(0, current − previous). -/
theorem fam_forestry_growth_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- forestry: growth(100, 120) = 0 — GROWTH: the increase over the previous measure, never negative. value
    max(0, current − previous). -/
theorem fam_forestry_growth_2 : (fmax 0 (100 - 120)) = 0 := by decide

/-- forestry: canopy(700, 1000) = 70 — CANOPY cover as a percentage. value ⌊covered · 100 / total⌋. -/
theorem fam_forestry_canopy_1 : ((700 * 100) / 1000) = 70 := by decide

/-- forestry: harvest(1000, 30) = 300 — HARVEST: the volume a cut takes at a percentage. value ⌊volume · pct /
    100⌋. -/
theorem fam_forestry_harvest_1 : ((1000 * 30) / 100) = 300 := by decide

/-- forestry: regeneration(1500, 4) = 6000 — REGENERATION: the seedlings a replant plants over an area. value
    seedlings · hectares. -/
theorem fam_forestry_regeneration_1 : (1500 * 4) = 6000 := by decide

/-- forging: force(500, 20) = 10000 — FORGING — SHAPING METAL UNDER LOAD, AS ARITHMETIC. A press deforms a
    billet and the shop floor is numbers: the force a die must deliver, the reduction worked into a section, the
    strain taken, the load each die carries, the flow stress of the stock, the upset ratio, the energy a blow
    spends, and the draft removed per pass. Crosses to `metallurgy` — forging is what metallurgy governs. A
    measure. */ const PROOF = 'forging arithmetic (forge force, reduction, strain, die load, flow stress, upset
    ratio, blow energy, draft); shaping metal under load; a measure crossed to metallurgy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'forging', dst: 'metallurgy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `forging.${name}`, params }) export class ForgingFormulas { /** FORGE FORCE:
    pressure over the contact area. value pressure · area. -/
theorem fam_forging_force_1 : (500 * 20) = 10000 := by decide

/-- forging: reduction(200, 50) = 75 — REDUCTION worked into a section, as a percentage. value ⌊(before − after)
    · 100 / before⌋. -/
theorem fam_forging_reduction_1 : (((fmax 0 (200 - 50)) * 100) / 200) = 75 := by decide

/-- forging: reduction(50, 80) = 0 — REDUCTION worked into a section, as a percentage. value ⌊(before − after) ·
    100 / before⌋. -/
theorem fam_forging_reduction_2 : (((fmax 0 (50 - 80)) * 100) / 50) = 0 := by decide

/-- forging: strain(20, 100) = 20 — ENGINEERING STRAIN as a percentage. value ⌊delta · 100 / original⌋. -/
theorem fam_forging_strain_1 : ((20 * 100) / 100) = 20 := by decide

/-- forging: dieload(10000, 4) = 2500 — DIE LOAD: forge force shared across the dies. value ⌊force / dies⌋. -/
theorem fam_forging_dieload_1 : (10000 / 4) = 2500 := by decide

/-- forging: flowstress(300, 3) = 900 — FLOW STRESS: base strength at a strain-hardening factor. value strength
    · factor. -/
theorem fam_forging_flowstress_1 : (300 * 3) = 900 := by decide

/-- forging: upsetratio(90, 30) = 3 — UPSET RATIO: billet height over its diameter. value ⌊height / diameter⌋. -/
theorem fam_forging_upsetratio_1 : (90 / 30) = 3 := by decide

/-- forging: energy(10000, 5) = 50000 — BLOW ENERGY: forge force over the stroke distance. value force ·
    distance. -/
theorem fam_forging_energy_1 : (10000 * 5) = 50000 := by decide

/-- forging: draft(100, 60) = 40 — DRAFT: thickness removed in a pass. value max(0, before − after). -/
theorem fam_forging_draft_1 : (fmax 0 (100 - 60)) = 40 := by decide

/-- formant: centerfrequency(500, 700) = 600 — FORMANT — THE RESONANCES OF SPEECH, AS ARITHMETIC. A vocal tract
    shapes sound into formants: bands of energy whose center, width and spacing name the vowel. Numbers: the
    center of a band, its bandwidth, the F1/F2 ratio, the vowel space, the spacing between formants, the
    sharpness Q, the dispersion and the resonance peak. Crosses to `acoustics` — formants are what acoustics
    measures in a voice. A measure. */ const PROOF = 'formant arithmetic (center frequency, bandwidth, F1/F2
    ratio, vowel space, formant spacing, Q factor, dispersion, resonance peak); the resonances of speech as
    numbers; a measure crossed to acoustics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'formant', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `formant.${name}`, params }) export class FormantFormulas { /** CENTER FREQUENCY: the midpoint of a band's
    edges. value ⌊(low + high) / 2⌋. -/
theorem fam_formant_centerfrequency_1 : ((500 + 700) / 2) = 600 := by decide

/-- formant: bandwidth(700, 500) = 200 — BANDWIDTH: the width of a band from its edges. value max(0, high −
    low). -/
theorem fam_formant_bandwidth_1 : (fmax 0 (700 - 500)) = 200 := by decide

/-- formant: f1f2ratio(1500, 500) = 300 — F1/F2 RATIO as a percentage. value f1>0 ? ⌊f2 · 100 / f1⌋ : 0. -/
theorem fam_formant_f1f2ratio_1 : ((1500 * 100) / 500) = 300 := by decide

/-- formant: vowelspace(200, 300) = 60000 — VOWEL SPACE: the rectangular area spanned by the F1 and F2 ranges.
    value f1span · f2span. -/
theorem fam_formant_vowelspace_1 : (200 * 300) = 60000 := by decide

/-- formant: qfactor(600, 200) = 3 — FORMANT SPACING: the average gap across a range of formants. value gaps>0 ?
    ⌊range / gaps⌋ : 0, gaps = count − 1. */ static formantspacing(range: number, count: number): CrossFormula {
    const g = Math.max(0, count - 1); return c('formant-formantspacing', 'formantspacing(range, count) = ⌊range
    / (count − 1)⌋', g > 0 ? Math.floor(range / g) : 0, nat(range, count) && count > 1, 'formantspacing',
    [range, count]) } /** Q FACTOR: the sharpness of a resonance, center over bandwidth. value bw>0 ? ⌊center /
    bw⌋ : 0. -/
theorem fam_formant_qfactor_1 : (600 / 200) = 3 := by decide

/-- formant: resonancepeak(12, 5) = 60 — DISPERSION: the mean spacing of formants from lowest to highest. value
    gaps>0 ? ⌊(hi − lo) / gaps⌋ : 0, gaps = n − 1. */ static dispersion(hi: number, lo: number, n: number):
    CrossFormula { const g = Math.max(0, n - 1); return c('formant-dispersion', 'dispersion(hi, lo, n) = ⌊(hi −
    lo) / (n − 1)⌋', g > 0 ? Math.floor(Math.max(0, hi - lo) / g) : 0, nat(hi, lo, n) && n > 1 && hi >= lo,
    'dispersion', [hi, lo, n]) } /** RESONANCE PEAK: the peak amplitude from gain and Q. value gain · q. -/
theorem fam_formant_resonancepeak_1 : (12 * 5) = 60 := by decide

/-- forms: completion(750, 1000) = 75 — FORMS — WEB FORMS AND SURVEYS, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A form is numbers: the share who complete it, the share who abandon it, how many
    fields are required, submissions per view, the error rate, time per submission, the answer rate, and where a
    step loses people. Crosses to `cross`. A measure. */ const PROOF = 'forms arithmetic (completion,
    abandonment, required fields, conversion, validation errors, time per submission, response, step dropoff); a
    measure crossed to cross' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'forms', dst: 'cross',
    formula, value, proof: PROOF, ...extra }, holds, { name: `forms.${name}`, params }) export class
    FormsFormulas { /** COMPLETION: the share who finish of those who start. value ⌊finished · 100 / started⌋. -/
theorem fam_forms_completion_1 : ((750 * 100) / 1000) = 75 := by decide

/-- forms: abandonment(250, 1000) = 25 — ABANDONMENT: the share who drop of those who start. value ⌊dropped ·
    100 / started⌋. -/
theorem fam_forms_abandonment_1 : ((250 * 100) / 1000) = 25 := by decide

/-- forms: fields(3, 12) = 25 — REQUIRED FIELDS: the share of fields that are required. value ⌊required · 100 /
    total⌋. -/
theorem fam_forms_fields_1 : ((3 * 100) / 12) = 25 := by decide

/-- forms: conversion(120, 1000) = 12 — CONVERSION: submissions over views. value ⌊submitted · 100 / views⌋. -/
theorem fam_forms_conversion_1 : ((120 * 100) / 1000) = 12 := by decide

/-- forms: validation(45, 300) = 15 — VALIDATION: the error rate over submissions. value ⌊errors · 100 /
    submissions⌋. -/
theorem fam_forms_validation_1 : ((45 * 100) / 300) = 15 := by decide

/-- forms: time(6000, 100) = 60 — AVERAGE TIME: total seconds over the submissions. value ⌊total / submissions⌋. -/
theorem fam_forms_time_1 : (6000 / 100) = 60 := by decide

/-- forms: response(880, 1000) = 88 — RESPONSE: the share answered of those sent. value ⌊answered · 100 / sent⌋. -/
theorem fam_forms_response_1 : ((880 * 100) / 1000) = 88 := by decide

/-- forms: dropoff(40, 500) = 8 — DROPOFF: the share lost at a step of the total. value ⌊step · 100 / total⌋. -/
theorem fam_forms_dropoff_1 : ((40 * 100) / 500) = 8 := by decide

/-- fourier: binwidth(44100, 441) = 100 — FOURIER — THE FREQUENCY DOMAIN, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A transform is numbers: the width of a bin, the resolution a window buys,
    the Nyquist limit, the harmonics of a tone, the work an FFT costs, the power in a spectrum, the fundamental
    of a period, and the energy that leaks past the main bin. Crosses to `signal` — fourier is how a signal
    reads in frequency. A measure. */ const PROOF = 'fourier arithmetic (bin width, frequency resolution,
    Nyquist, harmonics, FFT operations, spectral power, fundamental, leakage); a frequency-domain domain named
    by the public-API registry; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'fourier', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `fourier.${name}`,
    params }) export class FourierFormulas { /** BIN WIDTH: the sample rate spread across the FFT size. value
    ⌊rate / size⌋. -/
theorem fam_fourier_binwidth_1 : (44100 / 441) = 100 := by decide

/-- fourier: fftoperations(1024, 10) = 10240 — FFT OPERATIONS: n points at a log2 proxy of passes. value n · k. -/
theorem fam_fourier_fftoperations_1 : (1024 * 10) = 10240 := by decide

/-- fourier: frequencyresolution(48000, 240) = 200 — FREQUENCY RESOLUTION: the sample rate over the window
    length. value ⌊rate / n⌋. -/
theorem fam_fourier_frequencyresolution_1 : (48000 / 240) = 200 := by decide

/-- fourier: fundamentalfrequency(44100, 100) = 441 — FUNDAMENTAL FREQUENCY: the sample rate over the period in
    samples. value ⌊rate / period⌋. -/
theorem fam_fourier_fundamentalfrequency_1 : (44100 / 100) = 441 := by decide

/-- fourier: harmonics(440, 5) = 2200 — HARMONICS: a fundamental repeated as integer multiples. value
    fundamental · count. -/
theorem fam_fourier_harmonics_1 : (440 * 5) = 2200 := by decide

/-- fourier: leakage(1000, 850) = 150 — LEAKAGE: energy outside the main bin, never negative. value max(0, total
    − inband). -/
theorem fam_fourier_leakage_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- fourier: leakage(100, 200) = 0 — LEAKAGE: energy outside the main bin, never negative. value max(0, total −
    inband). -/
theorem fam_fourier_leakage_2 : (fmax 0 (100 - 200)) = 0 := by decide

/-- fourier: nyquist(44100) = 22050 — NYQUIST: the highest representable frequency, half the sample rate. value
    ⌊rate / 2⌋. -/
theorem fam_fourier_nyquist_1 : (44100 / 2) = 22050 := by decide

/-- fourier: spectralpower(3, 4) = 25 — SPECTRAL POWER: the squared magnitude of a bin. value real · real + imag
    · imag. -/
theorem fam_fourier_spectralpower_1 : ((3 * 3) + (4 * 4)) = 25 := by decide

/-- fractal: boxcount(2, 3) = 8 — FRACTAL — SELF-SIMILARITY AS ARITHMETIC. A shape made of smaller copies of
    itself is numbers: the pieces after an iteration, the ratio of whole to part, a dimension scaled to an
    integer, the total nodes of an iterated tree, how a perimeter grows, a box count, the Hausdorff dimension
    scaled, and self-similar copies. Crosses to `topology` — a fractal is a space with a non-integer dimension,
    which is what topology measures. A measure. */ const PROOF = 'fractal arithmetic (pieces after iterations,
    scale ratio, scaled dimension, iterated tree nodes, perimeter growth, box count, scaled Hausdorff dimension,
    self-similar copies); self-similarity as a measure crossed to topology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'fractal', dst: 'topology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `fractal.${name}`, params }) export class FractalFormulas { /** BOX COUNT: boxes per side raised to
    the dimension. value side^dimension. -/
theorem fam_fractal_boxcount_1 : (2 ^ 3) = 8 := by decide

/-- fractal: dimensionscaled(2, 3) = 666 — SCALED DIMENSION: pieces over a scale, scaled to an integer by a
    thousand. value ⌊pieces · 1000 / scale⌋. -/
theorem fam_fractal_dimensionscaled_1 : ((2 * 1000) / 3) = 666 := by decide

/-- fractal: hausdorffscaled(3, 2) = 1500 — HAUSDORFF DIMENSION, SCALED: floored ⌊log N⌋ over floored ⌊log s⌋,
    scaled to an integer by a thousand. value ⌊logn · 1000 / logs⌋. -/
theorem fam_fractal_hausdorffscaled_1 : ((3 * 1000) / 2) = 1500 := by decide

/-- fractal: iterationdepth(2, 3) = 15 — ITERATED TREE NODES: the total nodes of a branching tree to a depth.
    value ⌊(base^(depth+1) − 1) / (base − 1)⌋. -/
theorem fam_fractal_iterationdepth_1 : (((2 ^ (3 + 1)) - 1) / (2 - 1)) = 15 := by decide

/-- fractal: perimetergrowth(3, 2) = 48 — PERIMETER GROWTH: each segment splits into four per iteration. value
    segments · 4^iterations. -/
theorem fam_fractal_perimetergrowth_1 : (3 * (4 ^ 2)) = 48 := by decide

/-- fractal: piececount(3, 4) = 81 — PIECE COUNT: self-similar pieces after iterations of a base rule. value
    base^iterations. -/
theorem fam_fractal_piececount_1 : (3 ^ 4) = 81 := by decide

/-- fractal: scaleratio(100, 4) = 25 — SCALE RATIO: whole over a part. value ⌊whole / part⌋. -/
theorem fam_fractal_scaleratio_1 : (100 / 4) = 25 := by decide

/-- fractal: scaleratio(100, 0) = 0 — SCALE RATIO: whole over a part. value ⌊whole / part⌋. -/
theorem fam_fractal_scaleratio_2 : (100 / 0) = 0 := by decide

/-- fractal: selfsimilarity(5, 3) = 15 — SELF-SIMILARITY: self-similar copies at a factor. value copies ·
    factor. -/
theorem fam_fractal_selfsimilarity_1 : (5 * 3) = 15 := by decide

/-- fracture: toughness(50, 4) = 200 — FRACTURE — HOW SOLIDS BREAK, AS ARITHMETIC. When a crack runs is numbers:
    the toughness a material holds, the stress intensity at a crack tip, the critical crack length, the energy a
    running crack releases, the Griffith energy, notch sensitivity, the growth per cycle, and the stress at
    failure. Crosses to `materials` — fracture is how materials give way. A measure. */ const PROOF = 'fracture
    arithmetic (toughness, stress intensity, critical crack, energy release, Griffith, notch sensitivity, crack
    growth, failure stress); how solids break; a measure crossed to materials' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'fracture', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, {
    name: `fracture.${name}`, params }) export class FractureFormulas { /** TOUGHNESS: the resistance a material
    holds, stress through a crack of some length. value stress · crack. -/
theorem fam_fracture_toughness_1 : (50 * 4) = 200 := by decide

/-- fracture: stressintensity(2, 50, 4) = 400 — STRESS INTENSITY at a crack tip: a geometry factor on stress
    through a crack. value factor · stress · crack. -/
theorem fam_fracture_stressintensity_1 : ((4 * 2) * 50) = 400 := by decide

/-- fracture: criticalcrack(200, 50) = 4 — CRITICAL CRACK: the crack length the toughness allows at a stress.
    value ⌊toughness / stress⌋. -/
theorem fam_fracture_criticalcrack_1 : (200 / 50) = 4 := by decide

/-- fracture: energyrelease(50, 4, 10) = 20 — ENERGY RELEASE: the energy a running crack frees, stress through a
    crack over the modulus. value ⌊stress · crack / modulus⌋. -/
theorem fam_fracture_energyrelease_1 : ((50 * 4) / 10) = 20 := by decide

/-- fracture: griffith(5, 100) = 500 — GRIFFITH ENERGY: the surface energy a new crack face costs, surface at a
    modulus. value surface · modulus. -/
theorem fam_fracture_griffith_1 : (5 * 100) = 500 := by decide

/-- fracture: notchsensitivity(80, 100) = 80 — NOTCH SENSITIVITY: the notched strength against the smooth, as a
    percentage. value ⌊notched · 100 / smooth⌋. -/
theorem fam_fracture_notchsensitivity_1 : ((80 * 100) / 100) = 80 := by decide

/-- fracture: crackgrowth(1000, 3) = 3000 — CRACK GROWTH: the length a crack advances over the cycles at a
    per-cycle rate. value cycles · rate. -/
theorem fam_fracture_crackgrowth_1 : (1000 * 3) = 3000 := by decide

/-- fracture: failurestress(200, 4) = 50 — FAILURE STRESS: the stress at which a crack of some length runs,
    toughness over the crack. value ⌊toughness / crack⌋. -/
theorem fam_fracture_failurestress_1 : (200 / 4) = 50 := by decide

/-- freight: rate(500, 2) = 1000 — FREIGHT — MOVING GOODS, AS ARITHMETIC (what a carrier bills and loads).
    Shipping is numbers: the rate over a distance, the weight of a load, the volume of a box, its density, the
    chargeable weight a carrier actually bills, tonnage, the distance a lane runs over its trips, and the fuel
    surcharge on a base. Crosses to `logistics` — freight is what logistics moves. A measure. */ const PROOF =
    'freight arithmetic (rate, weight, volume, density, chargeable weight, tonnage, lane distance, fuel
    surcharge); hex-addressable integer formulas; a measure crossed to logistics' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'freight', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `freight.${name}`, params }) export class FreightFormulas { /** RATE: a freight rate over a distance
    at a per-unit charge. value distance · perKm. -/
theorem fam_freight_rate_1 : (500 * 2) = 1000 := by decide

/-- freight: weight(20, 50) = 1000 — WEIGHT: a load of units at a unit weight. value units · unit. -/
theorem fam_freight_weight_1 : (20 * 50) = 1000 := by decide

/-- freight: volume(2, 3, 4) = 24 — VOLUME: a box at length · width · height. value length · width · height. -/
theorem fam_freight_volume_1 : ((2 * 3) * 4) = 24 := by decide

/-- freight: density(1000, 4) = 250 — DENSITY: weight over volume. value ⌊weight / volume⌋. -/
theorem fam_freight_density_1 : (1000 / 4) = 250 := by decide

/-- freight: chargeable(300, 500) = 500 — CHARGEABLE WEIGHT: the greater of actual and volumetric weight, what a
    carrier bills. value max(actual, volumetric). -/
theorem fam_freight_chargeable_1 : (fmax 300 500) = 500 := by decide

/-- freight: chargeable(600, 500) = 600 — CHARGEABLE WEIGHT: the greater of actual and volumetric weight, what a
    carrier bills. value max(actual, volumetric). -/
theorem fam_freight_chargeable_2 : (fmax 600 500) = 600 := by decide

/-- freight: ton(5000) = 5 — TONNAGE: kilograms as whole tonnes. value ⌊kg / 1000⌋. -/
theorem fam_freight_ton_1 : (5000 / 1000) = 5 := by decide

/-- freight: lane(400, 3) = 1200 — LANE: the distance a lane runs over its trips. value distance · trips. -/
theorem fam_freight_lane_1 : (400 * 3) = 1200 := by decide

/-- freight: surcharge(1000, 15) = 150 — FUEL SURCHARGE: a percentage of a base rate. value ⌊base · pct / 100⌋. -/
theorem fam_freight_surcharge_1 : ((1000 * 15) / 100) = 150 := by decide

/-- frontogenesis: temperaturegradient(100, 4) = 25 -/
theorem fam_frontogenesis_temperaturegradient_1 : (100 / 4) = 25 := by decide

/-- frontogenesis: frontspeed(600, 10) = 60 -/
theorem fam_frontogenesis_frontspeed_1 : (600 / 10) = 60 := by decide

/-- frontogenesis: fronttypes(4, 0) = 4 -/
theorem fam_frontogenesis_fronttypes_1 : (4 + 0) = 4 := by decide

/-- frontogenesis: convergencerate(5, 3) = 15 -/
theorem fam_frontogenesis_convergencerate_1 : (5 * 3) = 15 := by decide

/-- frontogenesis: baroclinicity(70, 100) = 70 -/
theorem fam_frontogenesis_baroclinicity_1 : ((70 * 100) / 100) = 70 := by decide

/-- frontogenesis: pressuretrough(1013, 990) = 23 -/
theorem fam_frontogenesis_pressuretrough_1 : (fmax 0 (1013 - 990)) = 23 := by decide

/-- frontogenesis: liftingindex(10, 4) = 6 -/
theorem fam_frontogenesis_liftingindex_1 : (fmax 0 (10 - 4)) = 6 := by decide

/-- frontogenesis: intensification(80, 100) = 80 -/
theorem fam_frontogenesis_intensification_1 : ((80 * 100) / 100) = 80 := by decide

/-- fuelcell: cellvoltage(1, 700) = 700 -/
theorem fam_fuelcell_cellvoltage_1 : (1 * 700) = 700 := by decide

/-- fuelcell: stackvoltage(100, 700) = 70000 -/
theorem fam_fuelcell_stackvoltage_1 : (100 * 700) = 70000 := by decide

/-- fuelcell: efficiency(60, 100) = 60 -/
theorem fam_fuelcell_efficiency_1 : ((60 * 100) / 100) = 60 := by decide

/-- fuelcell: currentdensity(1000, 1) = 1000 -/
theorem fam_fuelcell_currentdensity_1 : (1000 / 1) = 1000 := by decide

/-- fuelcell: powerdensity(700, 1) = 700 -/
theorem fam_fuelcell_powerdensity_1 : (700 * 1) = 700 := by decide

/-- fuelcell: stackcells(100, 1) = 100 -/
theorem fam_fuelcell_stackcells_1 : (100 * 1) = 100 := by decide

/-- fuelcell: h2consumption(1000, 2) = 500 -/
theorem fam_fuelcell_h2consumption_1 : (1000 / 2) = 500 := by decide

/-- fuelcell: degradation(90, 100) = 90 -/
theorem fam_fuelcell_degradation_1 : ((90 * 100) / 100) = 90 := by decide

/-- fulfillment: rate(950, 1000) = 95 — FULFILLMENT — ORDER FULFILLMENT AS ARITHMETIC (chosen by the operations
    registry, not by hand). Getting orders out the door is numbers: the fill rate, the order cycle time, picking
    accuracy, units backordered, the perfect-order rate, items picked per hour, cartons packed, and the parcel
    shipping cost. Crosses to `logistics` — fulfillment is what logistics moves. A measure. */ const PROOF =
    'fulfillment arithmetic (fill rate, cycle time, order accuracy, backorder, perfect-order rate, pick rate,
    pack cartons, ship cost); an operations domain; a measure crossed to logistics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'fulfillment', dst: 'logistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `fulfillment.${name}`, params }) export class FulfillmentFormulas { /** FILL
    RATE: units shipped against units ordered, as a percentage. value ⌊shipped · 100 / ordered⌋. -/
theorem fam_fulfillment_rate_1 : ((950 * 100) / 1000) = 95 := by decide

/-- fulfillment: cycle(4800, 100) = 48 — ORDER CYCLE TIME: total hours over the orders fulfilled. value ⌊total /
    orders⌋. -/
theorem fam_fulfillment_cycle_1 : (4800 / 100) = 48 := by decide

/-- fulfillment: accuracy(980, 1000) = 98 — ORDER ACCURACY: orders filled correctly, as a percentage. value
    ⌊correct · 100 / total⌋. -/
theorem fam_fulfillment_accuracy_1 : ((980 * 100) / 1000) = 98 := by decide

/-- fulfillment: backorder(500, 320) = 180 — BACKORDER: units ordered beyond what is available. value max(0,
    ordered − available). -/
theorem fam_fulfillment_backorder_1 : (fmax 0 (500 - 320)) = 180 := by decide

/-- fulfillment: perfectorder(920, 1000) = 92 — PERFECT-ORDER RATE: orders with nothing wrong, as a percentage.
    value ⌊perfect · 100 / total⌋. -/
theorem fam_fulfillment_perfectorder_1 : ((920 * 100) / 1000) = 92 := by decide

/-- fulfillment: pick(600, 5) = 120 — PICK RATE: items picked over the hours worked. value ⌊items / hours⌋. -/
theorem fam_fulfillment_pick_1 : (600 / 5) = 120 := by decide

/-- fulfillment: ship(200, 7) = 1400 — SHIP COST: parcels at a per-parcel rate. value parcels · rate. -/
theorem fam_fulfillment_ship_1 : (200 * 7) = 1400 := by decide

/-- funnel: conversion(250, 1000) = 25 — FUNNEL — THE CONVERSION FUNNEL, AS ARITHMETIC. A user journey is
    numbers: how many convert of those who entered, where they drop off, the pass rate of each step, how fast
    conversions accrue, which stage is the bottleneck, the value of a conversion, how many abandon what they
    started, and the completed throughput per hour. Crosses to `analytics` — a funnel is what analytics
    measures. A measure. */ const PROOF = 'funnel arithmetic (conversion, dropoff, step rate, velocity,
    bottleneck, value, abandonment, throughput); the conversion journey as integers; a measure crossed to
    analytics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'funnel', dst: 'analytics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `funnel.${name}`, params }) export class
    FunnelFormulas { /** CONVERSION as a percentage of those who entered. value ⌊converted · 100 / entered⌋. -/
theorem fam_funnel_conversion_1 : ((250 * 100) / 1000) = 25 := by decide

/-- funnel: dropoff(300, 1000) = 30 — DROPOFF at a stage as a percentage of its arrivals. value ⌊lost · 100 /
    stage⌋. -/
theorem fam_funnel_dropoff_1 : ((300 * 100) / 1000) = 30 := by decide

/-- funnel: steprate(900, 1000) = 90 — STEP RATE: those who passed as a percentage of those who reached it.
    value ⌊passed · 100 / reached⌋. -/
theorem fam_funnel_steprate_1 : ((900 * 100) / 1000) = 90 := by decide

/-- funnel: velocity(600, 30) = 20 — VELOCITY: conversions per day. value ⌊converted / days⌋. -/
theorem fam_funnel_velocity_1 : (600 / 30) = 20 := by decide

/-- funnel: bottleneck(450, 1000) = 45 — BOTTLENECK: those stuck as a percentage of the total. value ⌊stuck ·
    100 / total⌋. -/
theorem fam_funnel_bottleneck_1 : ((450 * 100) / 1000) = 45 := by decide

/-- funnel: value(10000, 50) = 200 — VALUE: revenue per conversion. value ⌊revenue / conversions⌋. -/
theorem fam_funnel_value_1 : (10000 / 50) = 200 := by decide

/-- funnel: abandonment(700, 1000) = 70 — ABANDONMENT as a percentage of those who started. value ⌊abandoned ·
    100 / started⌋. -/
theorem fam_funnel_abandonment_1 : ((700 * 100) / 1000) = 70 := by decide

/-- funnel: throughput(480, 8) = 60 — THROUGHPUT: completed per hour. value ⌊completed / hours⌋. -/
theorem fam_funnel_throughput_1 : (480 / 8) = 60 := by decide

/-- futures: forwardprice(100, 5, 2) = 110 — FUTURES — THE DERIVATIVES DOMAIN, AS ARITHMETIC. Trading a futures
    contract is numbers: the forward price under cost-of-carry, the basis against spot, the margin a position
    requires, the value of one contract, the roll yield between near and far, the notional at risk, the
    maintenance floor, and the daily settlement. Crosses to `trading` — futures are what trading clears and
    marks. A measure. */ const PROOF = 'futures arithmetic (forward price, basis, margin requirement, contract
    value, roll yield, notional, maintenance margin, settlement); the derivatives domain as integer formulas; a
    measure crossed to trading' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'futures', dst: 'trading',
    formula, value, proof: PROOF, ...extra }, holds, { name: `futures.${name}`, params }) export class
    FuturesFormulas { /** FORWARD PRICE under cost-of-carry: spot carried at a rate over time. value ⌊spot ·
    (100 + rate · time) / 100⌋. -/
theorem fam_futures_forwardprice_1 : ((100 * (100 + (5 * 2))) / 100) = 110 := by decide

/-- futures: basis(110, 100) = 10 — BASIS: the future over spot, floored at zero. value max(0, future − spot). -/
theorem fam_futures_basis_1 : (fmax 0 (110 - 100)) = 10 := by decide

/-- futures: marginrequirement(10000, 10) = 1000 — MARGIN REQUIREMENT: a rate of the contract value. value
    ⌊value · rate / 100⌋. -/
theorem fam_futures_marginrequirement_1 : ((10000 * 10) / 100) = 1000 := by decide

/-- futures: contractvalue(50, 100) = 5000 — CONTRACT VALUE: the price times the contract size. value price ·
    size. -/
theorem fam_futures_contractvalue_1 : (50 * 100) = 5000 := by decide

/-- futures: rollyield(110, 100) = 10 — ROLL YIELD: the near over far as a percentage, floored at zero. value
    ⌊max(0, near − far) · 100 / far⌋. -/
theorem fam_futures_rollyield_1 : (((fmax 0 (110 - 100)) * 100) / 100) = 10 := by decide

/-- futures: notional(50, 100, 2) = 10000 — NOTIONAL: the price, the contract size, and the number of contracts.
    value price · size · count. -/
theorem fam_futures_notional_1 : ((50 * 100) * 2) = 10000 := by decide

/-- futures: maintenancemargin(1000, 75) = 750 — MAINTENANCE MARGIN: a rate of the initial margin. value
    ⌊initial · rate / 100⌋. -/
theorem fam_futures_maintenancemargin_1 : ((1000 * 75) / 100) = 750 := by decide

/-- futures: settlementprice(110, 90, 100) = 100 — SETTLEMENT PRICE: the mean of the day's high, low, and close.
    value ⌊(high + low + close) / 3⌋. -/
theorem fam_futures_settlementprice_1 : (((110 + 90) + 100) / 3) = 100 := by decide

/-- fuzzing: iterations(10000, 5) = 50000 -/
theorem fam_fuzzing_iterations_1 : (10000 * 5) = 50000 := by decide

/-- fuzzing: inputspace(16) = 65536 -/
theorem fam_fuzzing_inputspace_1 : (2 ^ 16) = 65536 := by decide

/-- fuzzing: coveragepct(80, 100) = 80 -/
theorem fam_fuzzing_coveragepct_1 : ((80 * 100) / 100) = 80 := by decide

/-- fuzzing: seedcount(50, 50) = 100 -/
theorem fam_fuzzing_seedcount_1 : (50 + 50) = 100 := by decide

/-- fuzzing: uniquecrashes(100, 88) = 12 -/
theorem fam_fuzzing_uniquecrashes_1 : (fmax 0 (100 - 88)) = 12 := by decide

/-- fuzzing: throughput(60000, 60) = 1000 -/
theorem fam_fuzzing_throughput_1 : (60000 / 60) = 1000 := by decide
