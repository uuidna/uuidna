-- lean/FamiliesO.lean — GENERATED. THE FAMILIES, O — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- obs: uptime(999, 1000) = 99 -/
theorem fam_obs_uptime_1 : ((999 * 100) / 1000) = 99 := by decide

/-- obs: errorrate(50, 1000) = 5 -/
theorem fam_obs_errorrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- obs: latencyp99(5000, 100) = 50 -/
theorem fam_obs_latencyp99_1 : (5000 / 100) = 50 := by decide

/-- obs: throughput(6000, 60) = 100 -/
theorem fam_obs_throughput_1 : (6000 / 60) = 100 := by decide

/-- obs: sloburn(100, 95) = 5 -/
theorem fam_obs_sloburn_1 : (fmax 0 (100 - 95)) = 5 := by decide

/-- obs: samplingrate(10, 100) = 10 -/
theorem fam_obs_samplingrate_1 : ((10 * 100) / 100) = 10 := by decide

/-- obs: dashboardsubsets(5) = 32 -/
theorem fam_obs_dashboardsubsets_1 : (2 ^ 5) = 32 := by decide

/-- observability: errorbudget(1000, 250) = 750 — OBSERVABILITY — WATCHING THE CLOUD, AS ARITHMETIC. What the
    signals say: the error budget left, the SLO met, the Apdex score, a percentile, metric cardinality, the
    sampling rate, saturation, and signal over noise. Each one is numbers over numbers, floored to an integer.
    Crosses to `cloud` — observability is what watches the compute. A measure. */ const PROOF = 'observability
    arithmetic (error budget, SLO, Apdex, percentile, cardinality, sampling, saturation, signal/noise); the
    signals that watch the cloud; a measure crossed to cloud' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'observability', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name:
    `observability.${name}`, params }) export class ObservabilityFormulas { /** ERROR BUDGET: errors still
    allowed after what is consumed. value max(0, allowed − consumed). -/
theorem fam_observability_errorbudget_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- observability: errorbudget(100, 250) = 0 — OBSERVABILITY — WATCHING THE CLOUD, AS ARITHMETIC. What the
    signals say: the error budget left, the SLO met, the Apdex score, a percentile, metric cardinality, the
    sampling rate, saturation, and signal over noise. Each one is numbers over numbers, floored to an integer.
    Crosses to `cloud` — observability is what watches the compute. A measure. */ const PROOF = 'observability
    arithmetic (error budget, SLO, Apdex, percentile, cardinality, sampling, saturation, signal/noise); the
    signals that watch the cloud; a measure crossed to cloud' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'observability', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name:
    `observability.${name}`, params }) export class ObservabilityFormulas { /** ERROR BUDGET: errors still
    allowed after what is consumed. value max(0, allowed − consumed). -/
theorem fam_observability_errorbudget_2 : (fmax 0 (100 - 250)) = 0 := by decide

/-- observability: slo(999, 1000) = 99 — SLO: good events over total as a percentage. value ⌊good · 100 /
    total⌋. -/
theorem fam_observability_slo_1 : ((999 * 100) / 1000) = 99 := by decide

/-- observability: apdex(950, 1000) = 95 — APDEX: satisfied requests over total as a percentage. value
    ⌊satisfied · 100 / total⌋. -/
theorem fam_observability_apdex_1 : ((950 * 100) / 1000) = 95 := by decide

/-- observability: percentile(99, 100) = 99 — PERCENTILE: rank over total as a percentage. value ⌊rank · 100 /
    total⌋. -/
theorem fam_observability_percentile_1 : ((99 * 100) / 100) = 99 := by decide

/-- observability: cardinality(5000, 50) = 100 — CARDINALITY: time series per metric. value ⌊series / metrics⌋. -/
theorem fam_observability_cardinality_1 : (5000 / 50) = 100 := by decide

/-- observability: sampling(10, 100) = 10 — SAMPLING: sampled over total as a percentage. value ⌊sampled · 100 /
    total⌋. -/
theorem fam_observability_sampling_1 : ((10 * 100) / 100) = 10 := by decide

/-- observability: saturation(80, 100) = 80 — SATURATION: used over capacity as a percentage. value ⌊used · 100
    / capacity⌋. -/
theorem fam_observability_saturation_1 : ((80 * 100) / 100) = 80 := by decide

/-- observability: signal(900, 100) = 900 — SIGNAL over noise as a percentage. value ⌊events · 100 / noise⌋. -/
theorem fam_observability_signal_1 : ((900 * 100) / 100) = 900 := by decide

/-- oceanography: pressure(1000) = 100 — OCEANOGRAPHY — OCEAN SCIENCE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). The sea is numbers: pressure with depth, salinity, density, the tide's range, a
    current's speed, the thermocline's drop, a wave's run, and upwelling intensity. Crosses to `environment` —
    the ocean is a measure the environment reads. A measure. */ const PROOF = 'oceanography arithmetic
    (pressure, salinity, density, tide, current, thermocline, wave, upwelling); ocean science as integers; a
    measure crossed to environment' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'oceanography',
    dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `oceanography.${name}`, params
    }) export class OceanographyFormulas { /** PRESSURE: roughly one bar per ten metres of depth. value ⌊depth /
    10⌋. -/
theorem fam_oceanography_pressure_1 : (1000 / 10) = 100 := by decide

/-- oceanography: salinity(35, 1000) = 35 — SALINITY: dissolved salt per thousand parts of water (PSU/ppt).
    value ⌊salt · 1000 / water⌋. -/
theorem fam_oceanography_salinity_1 : ((35 * 1000) / 1000) = 35 := by decide

/-- oceanography: density(1025, 1) = 1025 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_oceanography_density_1 : (1025 / 1) = 1025 := by decide

/-- oceanography: tide(8, 2) = 6 — TIDE: the range between high and low water. value max(0, high − low). -/
theorem fam_oceanography_tide_1 : (fmax 0 (8 - 2)) = 6 := by decide

/-- oceanography: tide(2, 8) = 0 — TIDE: the range between high and low water. value max(0, high − low). -/
theorem fam_oceanography_tide_2 : (fmax 0 (2 - 8)) = 0 := by decide

/-- oceanography: current(100, 25) = 4 — CURRENT: distance over time. value ⌊distance / time⌋. -/
theorem fam_oceanography_current_1 : (100 / 25) = 4 := by decide

/-- oceanography: thermocline(25, 4) = 21 — THERMOCLINE: the drop from surface to deep temperature. value max(0,
    surface − deep). -/
theorem fam_oceanography_thermocline_1 : (fmax 0 (25 - 4)) = 21 := by decide

/-- oceanography: thermocline(4, 25) = 0 — THERMOCLINE: the drop from surface to deep temperature. value max(0,
    surface − deep). -/
theorem fam_oceanography_thermocline_2 : (fmax 0 (4 - 25)) = 0 := by decide

/-- oceanography: wave(3, 8) = 12 — WAVE: a wave's run from height and period. value ⌊height · period / 2⌋. -/
theorem fam_oceanography_wave_1 : ((3 * 8) / 2) = 12 := by decide

/-- oceanography: upwelling(1000, 50) = 20 — UPWELLING: flux over area. value ⌊flux / area⌋. -/
theorem fam_oceanography_upwelling_1 : (1000 / 50) = 20 := by decide

/-- odometry: distance(360, 2) = 720 -/
theorem fam_odometry_distance_1 : (360 * 2) = 720 := by decide

/-- odometry: wheelrevolutions(1000, 314) = 3 -/
theorem fam_odometry_wheelrevolutions_1 : (1000 / 314) = 3 := by decide

/-- odometry: headingchange(90, 30) = 60 -/
theorem fam_odometry_headingchange_1 : (fmax 0 (90 - 30)) = 60 := by decide

/-- odometry: positionerror(2, 100) = 2 -/
theorem fam_odometry_positionerror_1 : ((2 * 100) / 100) = 2 := by decide

/-- odometry: ticksperrev(360, 4) = 1440 -/
theorem fam_odometry_ticksperrev_1 : (360 * 4) = 1440 := by decide

/-- odometry: driftrate(50, 10) = 5 -/
theorem fam_odometry_driftrate_1 : (50 / 10) = 5 := by decide

/-- odometry: slipcompensation(100, 95) = 5 -/
theorem fam_odometry_slipcompensation_1 : (fmax 0 (100 - 95)) = 5 := by decide

/-- odometry: pathdistance(500, 220) = 720 -/
theorem fam_odometry_pathdistance_1 : (500 + 220) = 720 := by decide

/-- oligopoly: firms(4, 0) = 4 -/
theorem fam_oligopoly_firms_1 : (4 + 0) = 4 := by decide

/-- oligopoly: concentration(80, 100) = 80 -/
theorem fam_oligopoly_concentration_1 : ((80 * 100) / 100) = 80 := by decide

/-- oligopoly: hhindex(25, 4) = 100 -/
theorem fam_oligopoly_hhindex_1 : (25 * 4) = 100 := by decide

/-- oligopoly: collusiongain(1000, 2) = 2000 -/
theorem fam_oligopoly_collusiongain_1 : (1000 * 2) = 2000 := by decide

/-- oligopoly: cournotoutput(1000, 5) = 200 -/
theorem fam_oligopoly_cournotoutput_1 : (1000 / 5) = 200 := by decide

/-- oligopoly: marketsharesubsets(4) = 16 -/
theorem fam_oligopoly_marketsharesubsets_1 : (2 ^ 4) = 16 := by decide

/-- oligopoly: stabilityindex(70, 100) = 70 -/
theorem fam_oligopoly_stabilityindex_1 : ((70 * 100) / 100) = 70 := by decide

/-- onboarding: rampup(30, 2) = 60 — ONBOARDING — BRINGING A NEW HIRE UP TO SPEED, AS ARITHMETIC. Getting
    someone productive is numbers: the ramp a plan earns, how much of it is done, the stages crossed, the cost
    of enablement, the days to productive, the checklist pace, mentoring hours spent, and whether satisfaction
    meets the bar. Crosses to `pedagogy` — onboarding is teaching a person the job. A measure. */ const PROOF =
    'onboarding arithmetic (rampup, completion, milestone, enablement cost, time-to-productive, checklist pace,
    mentoring hours, satisfaction); a measure crossed to pedagogy' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'onboarding', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `onboarding.${name}`, params }) export class OnboardingFormulas { /** RAMPUP: productivity earned over days
    at a per-day gain. value days · perDay. -/
theorem fam_onboarding_rampup_1 : (30 * 2) = 60 := by decide

/-- onboarding: completion(8, 10) = 80 — COMPLETION of the plan as a percentage. value ⌊done · 100 / total⌋. -/
theorem fam_onboarding_completion_1 : ((8 * 100) / 10) = 80 := by decide

/-- onboarding: enablement(10000, 90) = 900 — ENABLEMENT COST: training hours at a rate per thousand. value
    ⌊hours · rate / 1000⌋. -/
theorem fam_onboarding_enablement_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- onboarding: timetoproductive(300, 10) = 30 — TIME-TO-PRODUCTIVE: total ramp days over the hires. value
    ⌊totalDays / hires⌋. -/
theorem fam_onboarding_timetoproductive_1 : (300 / 10) = 30 := by decide

/-- onboarding: checklist(60, 6) = 10 — CHECKLIST PACE: items cleared per day. value ⌊items / days⌋. -/
theorem fam_onboarding_checklist_1 : (60 / 6) = 10 := by decide

/-- onboarding: mentoring(12, 5) = 60 — MENTORING: sessions at hours each. value sessions · hours. -/
theorem fam_onboarding_mentoring_1 : (12 * 5) = 60 := by decide

/-- oncology: staging(3, 2, 1) = 6 — ONCOLOGY — THE MEASURE OF A TUMOUR, AS ARITHMETIC (chosen by the clinical
    registry, not by hand). Cancer is numbers: the TNM stage, the grade, survival, how fast it doubles, how far
    it shrank under treatment, the burden per volume, the remission rate, and the total radiation dose. Crosses
    to `med` — oncology is a branch of medicine. A measure. */ const PROOF = 'oncology arithmetic (TNM staging,
    grade, survival, doubling, response, burden, remission, radiation dose); a clinical measure crossed to med'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'oncology', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `oncology.${name}`, params }) export class OncologyFormulas { /** TNM
    STAGING: the sum of the tumour, node and metastasis scores. value tumor + nodes + metastasis. -/
theorem fam_oncology_staging_1 : ((3 + 2) + 1) = 6 := by decide

/-- oncology: grade(3) = 3 — GRADE: the histological grade, a natural as given. value score. -/
theorem fam_oncology_grade_1 : 3 = 3 := by decide

/-- oncology: survival(80, 100) = 80 — SURVIVAL as a percentage. value ⌊alive · 100 / total⌋. -/
theorem fam_oncology_survival_1 : ((80 * 100) / 100) = 80 := by decide

/-- oncology: doubling(200, 50) = 150 — DOUBLING: the growth over the previous count, never negative. value
    max(0, current − previous). -/
theorem fam_oncology_doubling_1 : (fmax 0 (200 - 50)) = 150 := by decide

/-- oncology: response(1000, 250) = 75 — RESPONSE: the shrinkage under treatment, as a percentage. value
    ⌊(before − after) · 100 / before⌋. -/
theorem fam_oncology_response_1 : (((1000 - 250) * 100) / 1000) = 75 := by decide

/-- oncology: burden(10000, 5) = 2000 — BURDEN: cells over the volume they occupy. value ⌊cells / volume⌋. -/
theorem fam_oncology_burden_1 : (10000 / 5) = 2000 := by decide

/-- oncology: remission(60, 100) = 60 — REMISSION: the cleared fraction of those treated, as a percentage. value
    ⌊clear · 100 / treated⌋. -/
theorem fam_oncology_remission_1 : ((60 * 100) / 100) = 60 := by decide

/-- oncology: dose(30, 2) = 60 — DOSE: the total radiation over the fractions delivered. value fractions · gray. -/
theorem fam_oncology_dose_1 : (30 * 2) = 60 := by decide

/-- onomastics: namecount(1000, 2) = 2000 -/
theorem fam_onomastics_namecount_1 : (1000 * 2) = 2000 := by decide

/-- onomastics: frequencyrank(1000, 10) = 100 -/
theorem fam_onomastics_frequencyrank_1 : (1000 / 10) = 100 := by decide

/-- onomastics: patronymiclayers(3, 1) = 4 -/
theorem fam_onomastics_patronymiclayers_1 : (3 + 1) = 4 := by decide

/-- onomastics: etymsubsets(5) = 32 -/
theorem fam_onomastics_etymsubsets_1 : (2 ^ 5) = 32 := by decide

/-- onomastics: variantspellings(20, 3) = 60 -/
theorem fam_onomastics_variantspellings_1 : (20 * 3) = 60 := by decide

/-- onomastics: distributionratio(40, 100) = 40 -/
theorem fam_onomastics_distributionratio_1 : ((40 * 100) / 100) = 40 := by decide

/-- ontology: categories(10, 0) = 10 -/
theorem fam_ontology_categories_1 : (10 + 0) = 10 := by decide

/-- ontology: entitysubsets(6) = 64 -/
theorem fam_ontology_entitysubsets_1 : (2 ^ 6) = 64 := by decide

/-- ontology: hierarchydepth(100, 20) = 5 -/
theorem fam_ontology_hierarchydepth_1 : (100 / 20) = 5 := by decide

/-- ontology: modalstates(3, 4) = 12 -/
theorem fam_ontology_modalstates_1 : (3 * 4) = 12 := by decide

/-- ontology: partonomylinks(10, 3) = 30 -/
theorem fam_ontology_partonomylinks_1 : (10 * 3) = 30 := by decide

/-- opera: acts(3, 1) = 4 -/
theorem fam_opera_acts_1 : (3 + 1) = 4 := by decide

/-- opera: arias(8, 2) = 16 -/
theorem fam_opera_arias_1 : (8 * 2) = 16 := by decide

/-- opera: voicetypes(6, 0) = 6 -/
theorem fam_opera_voicetypes_1 : (6 + 0) = 6 := by decide

/-- opera: orchestrasize(60, 1) = 60 -/
theorem fam_opera_orchestrasize_1 : (60 * 1) = 60 := by decide

/-- opera: rangeoctaves(48, 12) = 4 -/
theorem fam_opera_rangeoctaves_1 : (48 / 12) = 4 := by decide

/-- opera: dynamicspan(100, 20) = 80 -/
theorem fam_opera_dynamicspan_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- ophthalmology: accommodation(10, 100) = 9 — OPHTHALMOLOGY — THE EYE AS ARITHMETIC. Correcting sight is
    numbers: lens power in diopters, Snellen acuity, intraocular pressure, the spherical equivalent of a
    refraction, pupillary distance, corneal astigmatism, the amplitude of accommodation, and the cylinder of a
    spherocylindrical lens. Crosses to `optics` — the eye is an optical system. A measure. */ const PROOF =
    'ophthalmology arithmetic (diopter, visual acuity, intraocular pressure, refractive error, pupil distance,
    astigmatism, accommodation, cylinder power); the eye as an optical system crossed to optics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'ophthalmology', dst: 'optics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `ophthalmology.${name}`, params }) export class OphthalmologyFormulas { /**
    AMPLITUDE OF ACCOMMODATION: near-point diopters less far-point diopters (100 cm basis). value max(0, ⌊100 /
    near⌋ − ⌊100 / far⌋). -/
theorem fam_ophthalmology_accommodation_1 : (fmax 0 ((100 / 10) - (100 / 100))) = 9 := by decide

/-- ophthalmology: astigmatism(44, 46) = 2 — CORNEAL ASTIGMATISM: the steep keratometry reading less the flat
    one. value max(0, steep − flat). -/
theorem fam_ophthalmology_astigmatism_1 : (fmax 0 (46 - 44)) = 2 := by decide

/-- ophthalmology: cylinderpower(3, 2) = 5 — CYLINDER POWER: the meridian power of a spherocylinder, sphere plus
    cylinder. value sphere + cyl. -/
theorem fam_ophthalmology_cylinderpower_1 : (3 + 2) = 5 := by decide

/-- ophthalmology: diopter(500) = 2 — LENS POWER in diopters at a focal length in millimetres. value ⌊1000 /
    focal⌋. -/
theorem fam_ophthalmology_diopter_1 : (1000 / 500) = 2 := by decide

/-- ophthalmology: iop(48, 3) = 16 — INTRAOCULAR PRESSURE: the mean of readings in mmHg. value ⌊sum / count⌋. -/
theorem fam_ophthalmology_iop_1 : (48 / 3) = 16 := by decide

/-- ophthalmology: pupildistance(31, 32) = 63 — PUPILLARY DISTANCE: the binocular PD, two monocular distances
    summed. value right + left. -/
theorem fam_ophthalmology_pupildistance_1 : (31 + 32) = 63 := by decide

/-- ophthalmology: refractiveerror(2, 4) = 4 — SPHERICAL EQUIVALENT: sphere plus half the cylinder. value sphere
    + ⌊cyl / 2⌋. -/
theorem fam_ophthalmology_refractiveerror_1 : (2 + (4 / 2)) = 4 := by decide

/-- ophthalmology: visualacuity(20, 40) = 50 — VISUAL ACUITY: the Snellen fraction as a percentage. value ⌊top ·
    100 / bottom⌋. -/
theorem fam_ophthalmology_visualacuity_1 : ((20 * 100) / 40) = 50 := by decide

/-- ophthalmology: visualacuity(20, 20) = 100 — VISUAL ACUITY: the Snellen fraction as a percentage. value ⌊top
    · 100 / bottom⌋. -/
theorem fam_ophthalmology_visualacuity_2 : ((20 * 100) / 20) = 100 := by decide

/-- optometry: acuity(20, 40) = 10 — OPTOMETRY — SEEING, AS ARITHMETIC. The eye measured: visual acuity on the
    Snellen 20/x scale, lens power in diopters, astigmatism from cylinder over axis, the accommodation range
    from near to far, pupil diameter, contrast as a percentage, refraction from incidence over the medium's
    index, and the field of view in degrees. Crosses to `med` — optometry is a medical measure. A measure. */
    const PROOF = 'optometry arithmetic (acuity, diopter, astigmatism, accommodation, pupil, contrast,
    refraction, field); the eye as integers; a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'optometry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `optometry.${name}`, params }) export class OptometryFormulas { /** VISUAL ACUITY: the Snellen 20/x proxy
    from the test and letter distances. value ⌊testdistance · 20 / letterdistance⌋. -/
theorem fam_optometry_acuity_1 : ((20 * 20) / 40) = 10 := by decide

/-- optometry: acuity(20, 0) = 0 — OPTOMETRY — SEEING, AS ARITHMETIC. The eye measured: visual acuity on the
    Snellen 20/x scale, lens power in diopters, astigmatism from cylinder over axis, the accommodation range
    from near to far, pupil diameter, contrast as a percentage, refraction from incidence over the medium's
    index, and the field of view in degrees. Crosses to `med` — optometry is a medical measure. A measure. */
    const PROOF = 'optometry arithmetic (acuity, diopter, astigmatism, accommodation, pupil, contrast,
    refraction, field); the eye as integers; a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'optometry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `optometry.${name}`, params }) export class OptometryFormulas { /** VISUAL ACUITY: the Snellen 20/x proxy
    from the test and letter distances. value ⌊testdistance · 20 / letterdistance⌋. -/
theorem fam_optometry_acuity_2 : ((20 * 20) / 0) = 0 := by decide

/-- optometry: diopter(50) = 20000 — DIOPTER: lens power from focal length in millimetres (×1000). value
    ⌊1000000 / focalmm⌋. -/
theorem fam_optometry_diopter_1 : (1000000 / 50) = 20000 := by decide

/-- optometry: diopter(0) = 0 — DIOPTER: lens power from focal length in millimetres (×1000). value ⌊1000000 /
    focalmm⌋. -/
theorem fam_optometry_diopter_2 : (1000000 / 0) = 0 := by decide

/-- optometry: astigmatism(90, 45) = 200 — ASTIGMATISM: cylinder over axis. value ⌊cylinder · 100 / axis⌋. -/
theorem fam_optometry_astigmatism_1 : ((90 * 100) / 45) = 200 := by decide

/-- optometry: astigmatism(90, 0) = 0 — ASTIGMATISM: cylinder over axis. value ⌊cylinder · 100 / axis⌋. -/
theorem fam_optometry_astigmatism_2 : ((90 * 100) / 0) = 0 := by decide

/-- optometry: accommodation(250, 25) = 225 — ACCOMMODATION: the range from near to far. value max(0, near −
    far). -/
theorem fam_optometry_accommodation_1 : (fmax 0 (250 - 25)) = 225 := by decide

/-- optometry: accommodation(25, 250) = 0 — ACCOMMODATION: the range from near to far. value max(0, near − far). -/
theorem fam_optometry_accommodation_2 : (fmax 0 (25 - 250)) = 0 := by decide

/-- optometry: pupil(5) = 5 — PUPIL: diameter, held as a natural. value diameter. -/
theorem fam_optometry_pupil_1 : 5 = 5 := by decide

/-- optometry: contrast(80, 100) = 80 — CONTRAST as a percentage: visible over total. value ⌊visible · 100 /
    total⌋. -/
theorem fam_optometry_contrast_1 : ((80 * 100) / 100) = 80 := by decide

/-- optometry: contrast(1, 0) = 0 — CONTRAST as a percentage: visible over total. value ⌊visible · 100 / total⌋. -/
theorem fam_optometry_contrast_2 : ((1 * 100) / 0) = 0 := by decide

/-- optometry: refraction(1500, 1000) = 1500 — REFRACTION: incidence over the medium's index (×1000). value
    ⌊incident · 1000 / index⌋. -/
theorem fam_optometry_refraction_1 : ((1500 * 1000) / 1000) = 1500 := by decide

/-- optometry: refraction(1500, 0) = 0 — REFRACTION: incidence over the medium's index (×1000). value ⌊incident
    · 1000 / index⌋. -/
theorem fam_optometry_refraction_2 : ((1500 * 1000) / 0) = 0 := by decide

/-- optometry: field(120) = 120 — FIELD of view, in degrees, held as a natural. value degrees. -/
theorem fam_optometry_field_1 : 120 = 120 := by decide

/-- orbit: period(62800, 8) = 7850 — ORBIT — A BODY AROUND A PRIMARY, AS ARITHMETIC. A trajectory is numbers:
    the period to come round, the semi-major axis of the ellipse, how eccentric it is, the far and near points,
    the speed along the path, the plane's tilt, and how far round it has swept. Crosses to `astronomy` — an
    orbit is what astronomy measures. A measure (integer proxies, no sqrt). */ const PROOF = 'orbit arithmetic
    (period, semi-major axis, eccentricity, apoapsis, periapsis, velocity, inclination, mean anomaly); a
    two-body trajectory as integers; a measure crossed to astronomy' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'orbit', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, {
    name: `orbit.${name}`, params }) export class OrbitFormulas { /** PERIOD: the time to traverse the path at a
    speed. value ⌊circumference / velocity⌋. -/
theorem fam_orbit_period_1 : (62800 / 8) = 7850 := by decide

/-- orbit: semimajoraxis(500, 300) = 400 — SEMI-MAJOR AXIS: the mean of apoapsis and periapsis. value ⌊(apoapsis
    + periapsis) / 2⌋. -/
theorem fam_orbit_semimajoraxis_1 : ((500 + 300) / 2) = 400 := by decide

/-- orbit: eccentricity(500, 300) = 250 — ECCENTRICITY as per-thousand. value ⌊(apoapsis − periapsis) · 1000 /
    (apoapsis + periapsis)⌋. -/
theorem fam_orbit_eccentricity_1 : (((500 - 300) * 1000) / (500 + 300)) = 250 := by decide

/-- orbit: eccentricity(300, 500) = 0 — ECCENTRICITY as per-thousand. value ⌊(apoapsis − periapsis) · 1000 /
    (apoapsis + periapsis)⌋. -/
theorem fam_orbit_eccentricity_2 : (((300 - 500) * 1000) / (300 + 500)) = 0 := by decide

/-- orbit: apoapsis(400, 250) = 500 — APOAPSIS: the far point from semi-major axis and per-thousand
    eccentricity. value ⌊semimajor · (1000 + ecc) / 1000⌋. -/
theorem fam_orbit_apoapsis_1 : ((400 * (1000 + 250)) / 1000) = 500 := by decide

/-- orbit: periapsis(400, 250) = 300 — PERIAPSIS: the near point from semi-major axis and per-thousand
    eccentricity. value ⌊semimajor · (1000 − ecc) / 1000⌋. -/
theorem fam_orbit_periapsis_1 : ((400 * (1000 - 250)) / 1000) = 300 := by decide

/-- orbit: velocity(60000, 60) = 1000 — VELOCITY: distance over the time taken. value ⌊distance / time⌋. -/
theorem fam_orbit_velocity_1 : (60000 / 60) = 1000 := by decide

/-- orbit: inclination(30, 60) = 45 — INCLINATION: the plane's tilt in degrees from rise over run. value ⌊rise ·
    90 / run⌋. -/
theorem fam_orbit_inclination_1 : ((30 * 90) / 60) = 45 := by decide

/-- orbital: period(1000, 6) = 1000 — ORBITAL — KEPLERIAN MECHANICS AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A closed orbit is numbers: the period a body takes, its farthest and nearest points,
    how oval it is, the mean radius, how fast it moves, the tilt of its plane, and the burn budget to change it.
    Integer proxies only (no sqrt, no ln). Crosses to `astronomy` — an orbit is what astronomy measures. A
    measure. */ const PROOF = 'orbital arithmetic (period, apoapsis, periapsis, eccentricity, semimajor,
    velocity, inclination, delta-v); Keplerian mechanics as integer proxies; a measure crossed to astronomy'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'orbital', dst: 'astronomy', formula, value,
    proof: PROOF, ...extra }, holds, { name: `orbital.${name}`, params }) export class OrbitalFormulas { /**
    PERIOD: time once around, path over speed (perimeter proxy 6·radius for 2πr). value ⌊6 · radius / speed⌋. -/
theorem fam_orbital_period_1 : ((6 * 1000) / 6) = 1000 := by decide

/-- orbital: apoapsis(500, 100) = 600 — APOAPSIS: farthest point, mean radius plus focal distance. value
    semimajor + focal. -/
theorem fam_orbital_apoapsis_1 : (500 + 100) = 600 := by decide

/-- orbital: periapsis(500, 100) = 400 — PERIAPSIS: nearest point, mean radius minus focal distance. value
    max(0, semimajor − focal). -/
theorem fam_orbital_periapsis_1 : (fmax 0 (500 - 100)) = 400 := by decide

/-- orbital: eccentricity(100, 500) = 200 — ECCENTRICITY: how oval, focal over mean radius scaled by 1000. value
    ⌊focal · 1000 / semimajor⌋. -/
theorem fam_orbital_eccentricity_1 : ((100 * 1000) / 500) = 200 := by decide

/-- orbital: semimajor(600, 400) = 500 — SEMIMAJOR: mean radius, half of apoapsis and periapsis. value
    ⌊(apoapsis + periapsis) / 2⌋. -/
theorem fam_orbital_semimajor_1 : ((600 + 400) / 2) = 500 := by decide

/-- orbital: velocity(6000, 6) = 1000 — VELOCITY: speed along the path, distance over time. value ⌊distance /
    time⌋. -/
theorem fam_orbital_velocity_1 : (6000 / 6) = 1000 := by decide

/-- orbital: inclination(50, 100) = 45 — INCLINATION: plane tilt in degrees, rise over run scaled to a quarter
    turn. value ⌊rise · 90 / run⌋. -/
theorem fam_orbital_inclination_1 : ((50 * 90) / 100) = 45 := by decide

/-- orbital: deltav(3000, 2000) = 5000 — DELTA-V: the burn budget, two burns summed (a Hohmann transfer). value
    burn1 + burn2. -/
theorem fam_orbital_deltav_1 : (3000 + 2000) = 5000 := by decide

/-- orbital: periapsis(100, 500) = 0 — PERIAPSIS: nearest point, mean radius minus focal distance. value max(0,
    semimajor − focal). -/
theorem fam_orbital_periapsis_2 : (fmax 0 (100 - 500)) = 0 := by decide

/-- origami: creasecount(20, 12) = 32 -/
theorem fam_origami_creasecount_1 : (20 + 12) = 32 := by decide

/-- origami: mountainvalley(16, 2) = 32 -/
theorem fam_origami_mountainvalley_1 : (16 * 2) = 32 := by decide

/-- origami: flatfoldability(100, 100) = 100 -/
theorem fam_origami_flatfoldability_1 : ((100 * 100) / 100) = 100 := by decide

/-- origami: layersubsets(5) = 32 -/
theorem fam_origami_layersubsets_1 : (2 ^ 5) = 32 := by decide

/-- origami: crimpangle(180, 4) = 45 -/
theorem fam_origami_crimpangle_1 : (180 / 4) = 45 := by decide

/-- origami: panelcount(8, 4) = 32 -/
theorem fam_origami_panelcount_1 : (8 * 4) = 32 := by decide

/-- ornithology: wingload(1200, 40) = 30 — ORNITHOLOGY — THE STUDY OF BIRDS, AS ARITHMETIC. A bird's flight and
    life are numbers: wing loading, clutch per nest, migration pace, fledging success, wing aspect ratio, flock
    density, song rate, and banded-return survival. Crosses to `zoology` — ornithology is the branch of zoology
    that watches birds. A measure. */ const PROOF = 'ornithology arithmetic (wing loading, clutch, migration
    pace, fledging, aspect ratio, flock density, song rate, survival); the study of birds as a measure crossed
    to zoology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ornithology', dst: 'zoology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `ornithology.${name}`, params }) export class
    OrnithologyFormulas { /** WING LOADING: body mass over wing area. value ⌊mass / area⌋. -/
theorem fam_ornithology_wingload_1 : (1200 / 40) = 30 := by decide

/-- ornithology: clutch(48, 12) = 4 — CLUTCH: eggs per nest. value ⌊eggs / nests⌋. -/
theorem fam_ornithology_clutch_1 : (48 / 12) = 4 := by decide

/-- ornithology: migration(8000, 40) = 200 — MIGRATION: distance over days. value ⌊distance / days⌋. -/
theorem fam_ornithology_migration_1 : (8000 / 40) = 200 := by decide

/-- ornithology: fledging(3, 4) = 75 — FLEDGING: fledged of hatched, as a percentage. value ⌊fledged · 100 /
    hatched⌋. -/
theorem fam_ornithology_fledging_1 : ((3 * 100) / 4) = 75 := by decide

/-- ornithology: aspect(600, 50) = 1200 — WING ASPECT RATIO: span over chord. value ⌊span · 100 / chord⌋. -/
theorem fam_ornithology_aspect_1 : ((600 * 100) / 50) = 1200 := by decide

/-- ornithology: flock(1000, 50) = 20 — FLOCK DENSITY: birds over area. value ⌊birds / area⌋. -/
theorem fam_ornithology_flock_1 : (1000 / 50) = 20 := by decide

/-- ornithology: song(240, 60) = 4 — SONG RATE: notes over seconds. value ⌊notes / seconds⌋. -/
theorem fam_ornithology_song_1 : (240 / 60) = 4 := by decide

/-- ornithology: survival(45, 100) = 45 — SURVIVAL: returned of banded, as a percentage. value ⌊returned · 100 /
    banded⌋. -/
theorem fam_ornithology_survival_1 : ((45 * 100) / 100) = 45 := by decide

/-- orthography: transparency(900, 1000) = 90 — ORTHOGRAPHY — WRITING SYSTEMS, AS ARITHMETIC. How a script
    spells its language is numbers: how regular the spelling is, how many symbols per sound, how often words are
    misspelled, letters per word, how much is capitalised, how many diacritics are carried, how legible the
    glyphs are, and the syllables a form holds. Crosses to `linguistics` — a script is what linguistics reads. A
    measure. */ const PROOF = 'orthography arithmetic (spelling transparency, graphemes per phoneme, error rate,
    letter density, capitalisation, diacritics, legibility, syllables); a measure crossed to linguistics' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'orthography', dst: 'linguistics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `orthography.${name}`, params }) export class OrthographyFormulas {
    /** SPELLING TRANSPARENCY: the share of words spelled regularly. value ⌊regular · 100 / words⌋. -/
theorem fam_orthography_transparency_1 : ((900 * 100) / 1000) = 90 := by decide

/-- orthography: graphemes(130, 100) = 130 — GRAPHEMES per phoneme, as a percentage. value ⌊symbols · 100 /
    phonemes⌋. -/
theorem fam_orthography_graphemes_1 : ((130 * 100) / 100) = 130 := by decide

/-- orthography: errors(5, 100) = 5 — ERROR RATE: the share of written words misspelled. value ⌊misspelled · 100
    / written⌋. -/
theorem fam_orthography_errors_1 : ((5 * 100) / 100) = 5 := by decide

/-- orthography: density(5000, 1000) = 5 — LETTER DENSITY: letters per word. value ⌊letters / words⌋. -/
theorem fam_orthography_density_1 : (5000 / 1000) = 5 := by decide

/-- orthography: capitals(3, 100) = 3 — CAPITALISATION: the share of characters in upper case. value ⌊uppercase
    · 100 / total⌋. -/
theorem fam_orthography_capitals_1 : ((3 * 100) / 100) = 3 := by decide

/-- orthography: diacritics(40, 200) = 20 — DIACRITICS: the share of characters carrying a mark. value ⌊marked ·
    100 / characters⌋. -/
theorem fam_orthography_diacritics_1 : ((40 * 100) / 200) = 20 := by decide

/-- orthography: legibility(980, 1000) = 98 — LEGIBILITY: the share of shown glyphs recognised. value
    ⌊recognized · 100 / shown⌋. -/
theorem fam_orthography_legibility_1 : ((980 * 100) / 1000) = 98 := by decide

/-- orthography: syllables(4) = 4 — SYLLABLES a form holds. value count. -/
theorem fam_orthography_syllables_1 : 4 = 4 := by decide

/-- orthopedics: rangeofmotion(120, 150) = 80 — ORTHOPEDICS — THE MUSCULOSKELETAL CLINIC, AS ARITHMETIC. Bones
    and joints are numbers: the range a joint moves through, bone density against a young reference, the load a
    fracture bears, a leg-length discrepancy, the Cobb angle of a curve, gait cadence, limb alignment, and the
    implant size a canal needs. Crosses to `anatomy` — orthopedics is anatomy under load. A measure. */ const
    PROOF = 'orthopedics arithmetic (range of motion, bone density, fracture load, leg discrepancy, Cobb angle,
    gait cadence, alignment, implant size); the musculoskeletal clinic as integers; a measure crossed to
    anatomy' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'orthopedics', dst: 'anatomy',
    formula, value, proof: PROOF, ...extra }, holds, { name: `orthopedics.${name}`, params }) export class
    OrthopedicsFormulas { /** RANGE OF MOTION: active degrees as a percentage of passive. value ⌊active · 100 /
    passive⌋. -/
theorem fam_orthopedics_rangeofmotion_1 : ((120 * 100) / 150) = 80 := by decide

/-- orthopedics: bonedensity(80, 100) = 80 — BONE DENSITY: measured BMD as a percentage of the young-adult
    reference. value ⌊bmd · 100 / young⌋. -/
theorem fam_orthopedics_bonedensity_1 : ((80 * 100) / 100) = 80 := by decide

/-- orthopedics: fractureload(50, 80) = 4000 — FRACTURE LOAD: cross-sectional area at a material strength. value
    area · strength. -/
theorem fam_orthopedics_fractureload_1 : (50 * 80) = 4000 := by decide

/-- orthopedics: legdiscrepancy(920, 905) = 15 — LEG DISCREPANCY: how much the left leg exceeds the right, never
    below zero. value max(0, left − right). -/
theorem fam_orthopedics_legdiscrepancy_1 : (fmax 0 (920 - 905)) = 15 := by decide

/-- orthopedics: cobbangle(22, 18) = 40 — COBB ANGLE: the curve as the sum of the upper and lower end-vertebra
    tilts. value upper + lower. -/
theorem fam_orthopedics_cobbangle_1 : (22 + 18) = 40 := by decide

/-- orthopedics: gait(100, 60) = 100 — GAIT CADENCE: steps per minute from steps over seconds. value ⌊steps · 60
    / seconds⌋. -/
theorem fam_orthopedics_gait_1 : ((100 * 60) / 60) = 100 := by decide

/-- orthopedics: alignment(185, 180) = 5 — ALIGNMENT: varus/valgus deviation of the femoral axis past the tibial
    axis. value max(0, femoral − tibial). -/
theorem fam_orthopedics_alignment_1 : (fmax 0 (185 - 180)) = 5 := by decide

/-- oscillators: frequency(1000, 5) = 200 — OSCILLATORS — PERIODIC SIGNALS AS ARITHMETIC. A running oscillator
    is numbers: its frequency from the cycles it turns in a span, the period of one cycle, the duty a square
    wave holds high, the phase a shift lands at, the resonant point of an LC tank, the nth harmonic of a
    fundamental, the jitter averaged over samples, and the stability drift in ppm. Crosses to `electronics` — an
    oscillator is the clock electronics runs on. A measure. */ const PROOF = 'oscillators arithmetic (frequency,
    period, duty cycle, phase, LC resonance, harmonics, jitter, stability ppm); periodic signals as integers; a
    measure crossed to electronics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'oscillators',
    dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `oscillators.${name}`, params
    }) export class OscillatorsFormulas { /** FREQUENCY: cycles turned over a span of seconds. value ⌊cycles /
    seconds⌋ (Hz). -/
theorem fam_oscillators_frequency_1 : (1000 / 5) = 200 := by decide

/-- oscillators: frequency(1000, 0) = 0 — OSCILLATORS — PERIODIC SIGNALS AS ARITHMETIC. A running oscillator is
    numbers: its frequency from the cycles it turns in a span, the period of one cycle, the duty a square wave
    holds high, the phase a shift lands at, the resonant point of an LC tank, the nth harmonic of a fundamental,
    the jitter averaged over samples, and the stability drift in ppm. Crosses to `electronics` — an oscillator
    is the clock electronics runs on. A measure. */ const PROOF = 'oscillators arithmetic (frequency, period,
    duty cycle, phase, LC resonance, harmonics, jitter, stability ppm); periodic signals as integers; a measure
    crossed to electronics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'oscillators', dst:
    'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `oscillators.${name}`, params })
    export class OscillatorsFormulas { /** FREQUENCY: cycles turned over a span of seconds. value ⌊cycles /
    seconds⌋ (Hz). -/
theorem fam_oscillators_frequency_2 : (1000 / 0) = 0 := by decide

/-- oscillators: period(10000, 1000) = 10 — PERIOD: time of one cycle from a total span. value ⌊total / cycles⌋. -/
theorem fam_oscillators_period_1 : (10000 / 1000) = 10 := by decide

/-- oscillators: dutycycle(30, 40) = 75 — DUTY CYCLE: fraction a wave is held high, as a percentage. value ⌊on ·
    100 / total⌋. -/
theorem fam_oscillators_dutycycle_1 : ((30 * 100) / 40) = 75 := by decide

/-- oscillators: phase(1, 4) = 90 — PHASE: a shift of the period, in degrees. value ⌊shift · 360 / period⌋. -/
theorem fam_oscillators_phase_1 : ((1 * 360) / 4) = 90 := by decide

/-- oscillators: resonance(100, 10) = 1000 — RESONANCE: the resonant point of an LC tank. value ⌊1000000 / (l ·
    cc)⌋. -/
theorem fam_oscillators_resonance_1 : (1000000 / (100 * 10)) = 1000 := by decide

/-- oscillators: harmonics(440, 3) = 1320 — HARMONICS: the nth harmonic of a fundamental. value fundamental · n. -/
theorem fam_oscillators_harmonics_1 : (440 * 3) = 1320 := by decide

/-- oscillators: jitter(5000, 100) = 50 — JITTER: timing error averaged over the samples taken. value ⌊total /
    samples⌋. -/
theorem fam_oscillators_jitter_1 : (5000 / 100) = 50 := by decide

/-- oscillators: stability(5, 10000) = 500 — STABILITY: drift against a nominal, in parts per million. value
    ⌊drift · 1000000 / nominal⌋. -/
theorem fam_oscillators_stability_1 : ((5 * 1000000) / 10000) = 500 := by decide

/-- osmosis: osmoticpressure(2, 300, 310) = 186000 — OSMOSIS — THE MOVEMENT OF WATER ACROSS A MEMBRANE, AS
    ARITHMETIC. Osmosis is numbers: the pressure a solute exerts, the osmolarity of a solution, whether a cell
    is hyper- or hypotonic, the water potential that drives flow, the net flux through a membrane, how much a
    membrane reflects a solute, the concentration gradient, and whether two sides sit at equilibrium. Crosses to
    `biochemistry` — osmosis is the physical chemistry the cell runs on. A measure. */ const PROOF = 'osmosis
    arithmetic (osmotic pressure, osmolarity, tonicity, water potential, net flux, reflection coefficient,
    gradient, equilibrium); water across a membrane as number; a measure crossed to biochemistry' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'osmosis', dst: 'biochemistry', formula, value, proof: PROOF,
    ...extra }, holds, { name: `osmosis.${name}`, params }) export class OsmosisFormulas { /** OSMOTIC PRESSURE:
    van't Hoff — the dissociation factor, the concentration, the temperature. value i · conc · temp. -/
theorem fam_osmosis_osmoticpressure_1 : ((2 * 300) * 310) = 186000 := by decide

/-- osmosis: osmolarity(600, 2) = 300 — OSMOLARITY: osmotically active particles per unit volume. value
    ⌊particles / volume⌋. -/
theorem fam_osmosis_osmolarity_1 : (600 / 2) = 300 := by decide

/-- osmosis: waterpotential(200, 500) = 300 — WATER POTENTIAL: pressure potential minus solute potential. value
    max(0, pressure − solute). -/
theorem fam_osmosis_waterpotential_1 : (fmax 0 (500 - 200)) = 300 := by decide

/-- osmosis: netflux(5, 10, 20) = 1000 — NET FLUX: the permeability coefficient over the area over the gradient.
    value coeff · area · gradient. -/
theorem fam_osmosis_netflux_1 : ((5 * 10) * 20) = 1000 := by decide

/-- osmosis: reflectioncoeff(90, 100) = 90 — REFLECTION COEFFICIENT: the fraction of solutes a membrane
    reflects, as a percentage. value ⌊solutes · 100 / pores⌋. -/
theorem fam_osmosis_reflectioncoeff_1 : ((90 * 100) / 100) = 90 := by decide

/-- osmosis: gradient(500, 200) = 300 — GRADIENT: the concentration difference that drives flow. value max(0,
    high − low). -/
theorem fam_osmosis_gradient_1 : (fmax 0 (500 - 200)) = 300 := by decide

/-- outbreak: reproduction(6, 2) = 3 — OUTBREAK — THE SHAPE OF AN EPIDEMIC, AS ARITHMETIC (an outbreak is the
    counts it leaves behind, nothing more). Spread is numbers: how many each case infects, the share of a
    population struck, how fast the count doubles, how deadly it runs, the days between generations, the running
    total, the wall at which transmission stalls, and whether it is still growing. Crosses to `epidemiology` —
    an outbreak is the event epidemiology measures. A measure. */ const PROOF = 'outbreak arithmetic
    (reproduction, attack rate, doubling time, case fatality, generation interval, cumulative cases, herd
    immunity, growth factor); the shape of an epidemic as counts; a measure crossed to epidemiology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'outbreak', dst: 'epidemiology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `outbreak.${name}`, params }) export class OutbreakFormulas { /** REPRODUCTION:
    secondary cases per primary case. value ⌊secondary / primary⌋. -/
theorem fam_outbreak_reproduction_1 : (6 / 2) = 3 := by decide

/-- outbreak: attackrate(250, 1000) = 25 — ATTACK RATE: the share of a population struck, as a percentage. value
    ⌊cases · 100 / population⌋. -/
theorem fam_outbreak_attackrate_1 : ((250 * 100) / 1000) = 25 := by decide

/-- outbreak: doublingtime(30, 5) = 6 — DOUBLING TIME: days over the number of doublings that span them. value
    ⌊period / generations⌋. -/
theorem fam_outbreak_doublingtime_1 : (30 / 5) = 6 := by decide

/-- outbreak: casefatality(20, 1000) = 2 — CASE FATALITY: deaths among cases, as a percentage. value ⌊deaths ·
    100 / cases⌋. -/
theorem fam_outbreak_casefatality_1 : ((20 * 100) / 1000) = 2 := by decide

/-- outbreak: generationinterval(140, 20) = 7 — GENERATION INTERVAL: total days over the intervals they contain.
    value ⌊total / intervals⌋. -/
theorem fam_outbreak_generationinterval_1 : (140 / 20) = 7 := by decide

/-- outbreak: cumulativecases(100, 14) = 1400 — CUMULATIVE CASES: a steady daily count over the days it runs.
    value daily · days. -/
theorem fam_outbreak_cumulativecases_1 : (100 * 14) = 1400 := by decide

/-- outbreak: herdimmunity(4) = 75 — HERD IMMUNITY: the immune share at which transmission stalls, as a
    percentage. value ⌊(r0 − 1) · 100 / r0⌋. -/
theorem fam_outbreak_herdimmunity_1 : (((4 - 1) * 100) / 4) = 75 := by decide

/-- outbreak: growthfactor(800, 100) = 8 — GROWTH FACTOR: this period's cases over the previous period's. value
    ⌊current / previous⌋. -/
theorem fam_outbreak_growthfactor_1 : (800 / 100) = 8 := by decide

/-- overtone: harmonicfreq(440, 3) = 1320 — OVERTONE — THE HARMONIC SERIES AS ARITHMETIC. A plucked string or
    blown pipe sounds a fundamental and its overtones: the nth harmonic frequency, which harmonic a frequency
    is, a partial's amplitude, how far a stiff string's partial strays from the ideal, the sum of a run of
    harmonics, the fundamental read back from a harmonic, the spectral centroid, and how many harmonics fit a
    bandwidth. Crosses to `acoustics` — overtones are what acoustics hears. A measure. */ const PROOF =
    'overtone arithmetic (harmonic frequency, harmonic number, partial amplitude, inharmonicity, series sum,
    fundamental, spectral centroid, harmonic count); the harmonic series as a measure crossed to acoustics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'overtone', dst: 'acoustics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `overtone.${name}`, params }) export class OvertoneFormulas { /**
    HARMONIC FREQUENCY: the nth harmonic of a fundamental. value fundamental · n. -/
theorem fam_overtone_harmonicfreq_1 : (440 * 3) = 1320 := by decide

/-- overtone: harmonicnumber(1320, 440) = 3 — HARMONIC NUMBER: which harmonic a frequency is. value ⌊freq /
    fundamental⌋. -/
theorem fam_overtone_harmonicnumber_1 : (1320 / 440) = 3 := by decide

/-- overtone: partialamplitude(1000, 4) = 250 — PARTIAL AMPLITUDE: the nth partial of a 1/n spectrum. value ⌊a1
    / n⌋. -/
theorem fam_overtone_partialamplitude_1 : (1000 / 4) = 250 := by decide

/-- overtone: inharmonicity(1330, 1320) = 10 — INHARMONICITY: how far a stiff string's partial strays above the
    ideal. value max(0, actual − ideal). -/
theorem fam_overtone_inharmonicity_1 : (fmax 0 (1330 - 1320)) = 10 := by decide

/-- overtone: seriessum(100, 4) = 1000 — SERIES SUM: the summed frequency of the first n harmonics. value
    fundamental · n · (n + 1) / 2. -/
theorem fam_overtone_seriessum_1 : (((100 * 4) * (4 + 1)) / 2) = 1000 := by decide

/-- overtone: fundamentalfrom(1320, 3) = 440 — FUNDAMENTAL: read back from a known nth harmonic. value ⌊freq /
    n⌋. -/
theorem fam_overtone_fundamentalfrom_1 : (1320 / 3) = 440 := by decide

/-- overtone: spectralcentroid(12000, 100) = 120 — SPECTRAL CENTROID: the amplitude-weighted mean frequency.
    value ⌊sumFreqAmp / sumAmp⌋. -/
theorem fam_overtone_spectralcentroid_1 : (12000 / 100) = 120 := by decide

/-- overtone: harmoniccount(20000, 440) = 45 — HARMONIC COUNT: how many harmonics of a fundamental fit a
    bandwidth. value ⌊bandwidth / fundamental⌋. -/
theorem fam_overtone_harmoniccount_1 : (20000 / 440) = 45 := by decide

/-- oxygenation: saturation(97, 100) = 97 — OXYGENATION — GETTING OXYGEN FROM AIR TO BLOOD, AS ARITHMETIC. The
    breath is numbers: how saturated the blood is, the oxygen a decilitre carries, the P/F ratio that stages
    lung injury, the alveolar-arterial gap, the rate oxygen is delivered, the fraction tissues extract, the
    blood's carrying capacity, and the shunt that bypasses the exchange. Crosses to `pulmonology` — oxygenation
    is what the lung physician reads. A measure. */ const PROOF = 'oxygenation arithmetic (saturation, oxygen
    content, P/F ratio, A-a gradient, delivery, extraction, carrying capacity, shunt); a measure crossed to
    pulmonology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'oxygenation', dst: 'pulmonology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `oxygenation.${name}`, params }) export class
    OxygenationFormulas { /** SATURATION: bound haemoglobin as a percentage of the total. value ⌊bound · 100 /
    total⌋. -/
theorem fam_oxygenation_saturation_1 : ((97 * 100) / 100) = 97 := by decide

/-- oxygenation: oxygencontent(15, 97) = 1455 — OXYGEN CONTENT: haemoglobin carried at a saturation. value hb ·
    sat. -/
theorem fam_oxygenation_oxygencontent_1 : (15 * 97) = 1455 := by decide

/-- oxygenation: pao2fio2ratio(100, 50) = 200 — P/F RATIO: arterial oxygen over inspired fraction (percent).
    value ⌊pao2 · 100 / fio2⌋. -/
theorem fam_oxygenation_pao2fio2ratio_1 : ((100 * 100) / 50) = 200 := by decide

/-- oxygenation: alveolararterial(100, 90) = 10 — ALVEOLAR-ARTERIAL GRADIENT: the gap between alveolar and
    arterial oxygen. value max(0, pAO2 − paO2). -/
theorem fam_oxygenation_alveolararterial_1 : (fmax 0 (100 - 90)) = 10 := by decide

/-- oxygenation: deliveryrate(5, 200) = 1000 — DELIVERY RATE: cardiac output times oxygen content. value output
    · content. -/
theorem fam_oxygenation_deliveryrate_1 : (5 * 200) = 1000 := by decide

/-- oxygenation: extractionratio(250, 1000) = 25 — EXTRACTION RATIO: consumption as a percentage of delivery.
    value ⌊consumption · 100 / delivery⌋. -/
theorem fam_oxygenation_extractionratio_1 : ((250 * 100) / 1000) = 25 := by decide

/-- oxygenation: carryingcapacity(15) = 20 — CARRYING CAPACITY: the oxygen a haemoglobin level can bind (1.34
    ml/g). value ⌊hb · 134 / 100⌋. -/
theorem fam_oxygenation_carryingcapacity_1 : ((15 * 134) / 100) = 20 := by decide

/-- oxygenation: shuntfraction(20, 19, 15) = 20 — SHUNT FRACTION: blood bypassing exchange as a percentage.
    value ⌊max(0, cc − ca) · 100 / max(0, cc − cv)⌋. -/
theorem fam_oxygenation_shuntfraction_1 : (((fmax 0 (20 - 19)) * 100) / (fmax 0 (20 - 15))) = 20 := by decide
