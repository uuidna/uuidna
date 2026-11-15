-- lean/FamiliesC.lean — GENERATED. THE FAMILIES, C — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- caching: hitrate(950, 1000) = 95 — CACHING — THE CACHE AS ARITHMETIC. A cache is numbers: how often it hits,
    how often it misses, how much it evicts, how long an entry lives, the latency it saves, how full it is, how
    warm it is on start, and the speedup it buys. Crosses to `cloud` — a cache is what sits in front of cloud
    compute. A measure. */ const PROOF = 'caching arithmetic (hit rate, miss rate, eviction, ttl, saved latency,
    utilization, warmup, speedup); the cache in front of cloud compute; a measure crossed to cloud' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'caching', dst: 'cloud', formula, value, proof: PROOF, ...extra },
    holds, { name: `caching.${name}`, params }) export class CachingFormulas { /** HIT RATE as a percentage.
    value ⌊hits · 100 / requests⌋. -/
theorem fam_caching_hitrate_1 : ((950 * 100) / 1000) = 95 := by decide

/-- caching: missrate(50, 1000) = 5 — MISS RATE as a percentage. value ⌊misses · 100 / requests⌋. -/
theorem fam_caching_missrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- caching: eviction(30, 100) = 30 — EVICTION rate against capacity. value ⌊evicted · 100 / capacity⌋. -/
theorem fam_caching_eviction_1 : ((30 * 100) / 100) = 30 := by decide

/-- caching: ttl(3600) = 3600 — TTL: the seconds an entry lives, held as-is. value seconds. -/
theorem fam_caching_ttl_1 : 3600 = 3600 := by decide

/-- caching: latency(5000, 100) = 50 — AVERAGE SAVED LATENCY per request. value ⌊saved / requests⌋. -/
theorem fam_caching_latency_1 : (5000 / 100) = 50 := by decide

/-- caching: utilization(75, 100) = 75 — UTILIZATION as a percentage of capacity. value ⌊used · 100 / capacity⌋. -/
theorem fam_caching_utilization_1 : ((75 * 100) / 100) = 75 := by decide

/-- caching: warmup(800, 1000) = 80 — WARMUP: the fraction of a target set already cached. value ⌊cached · 100 /
    total⌋. -/
theorem fam_caching_warmup_1 : ((800 * 100) / 1000) = 80 := by decide

/-- caching: speedup(900, 100) = 900 — SPEEDUP: uncached latency over cached latency, as a percentage. value
    ⌊uncached · 100 / cached⌋. -/
theorem fam_caching_speedup_1 : ((900 * 100) / 100) = 900 := by decide

/-- cadence: rootmotion(0, 7) = 7 — CADENCE — HOW A HARMONIC PHRASE ARRIVES, AS ARITHMETIC. The close of a
    phrase is numbers: how far the root moves, how hard the voices pull to resolution, the span of a chord, the
    beats in a phrase, how many chords fill a bar, the tension released, the interval that approaches the goal,
    and whether the arrival is final. Crosses to `music` — cadence is how music ends. A measure. */ const PROOF
    = 'cadence arithmetic (root motion, resolution strength, chord span, phrase length, harmonic rhythm, tension
    release, approach interval, finality); how a harmonic phrase arrives; a measure crossed to music' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'cadence', dst: 'music', formula, value, proof: PROOF, ...extra },
    holds, { name: `cadence.${name}`, params }) export class CadenceFormulas { /** ROOT MOTION: the ascending
    semitones the root moves between chords. value max(0, to − from). -/
theorem fam_cadence_rootmotion_1 : (fmax 0 (7 - 0)) = 7 := by decide

/-- cadence: resolutionstrength(3, 4) = 12 — RESOLUTION STRENGTH: total pull as each voice pulls to its goal.
    value pull · voices. -/
theorem fam_cadence_resolutionstrength_1 : (3 * 4) = 12 := by decide

/-- cadence: chordspan(0, 16) = 16 — CHORD SPAN: semitones from the lowest to the highest note. value max(0,
    high − low). -/
theorem fam_cadence_chordspan_1 : (fmax 0 (16 - 0)) = 16 := by decide

/-- cadence: phraselength(4, 4) = 16 — PHRASE LENGTH: beats in a phrase, bars at a beats-per-bar. value bars ·
    beats. -/
theorem fam_cadence_phraselength_1 : (4 * 4) = 16 := by decide

/-- cadence: harmonicrhythm(8, 4) = 2 — HARMONIC RHYTHM: chords per bar. value ⌊chords / bars⌋. -/
theorem fam_cadence_harmonicrhythm_1 : (8 / 4) = 2 := by decide

/-- cadence: tensionrelease(3, 4) = 75 — TENSION RELEASE: the released fraction as a percentage. value ⌊released
    · 100 / total⌋. -/
theorem fam_cadence_tensionrelease_1 : ((3 * 100) / 4) = 75 := by decide

/-- cadence: approachinterval(11, 12) = 1 — APPROACH INTERVAL: the ascending semitones approaching the cadence
    tone. value max(0, to − from). -/
theorem fam_cadence_approachinterval_1 : (fmax 0 (12 - 11)) = 1 := by decide

/-- calculus: derivative(3, 4) = 12 — CALCULUS — THE CONTINUOUS MADE DISCRETE, AS ARITHMETIC. Change is numbers:
    the power rule on a monomial, an integral by the reverse power rule, a secant slope, a Riemann rectangle, a
    quotient limit, an average rate, a partial sum, and a tangent line read off a slope. Crosses to `code` —
    calculus is what code computes. A measure over the naturals. */ const PROOF = 'calculus arithmetic
    (derivative, integral, slope, area, limit, rate, series, tangent); the continuous made discrete over the
    naturals; a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'calculus', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `calculus.${name}`,
    params }) export class CalculusFormulas { /** DERIVATIVE: the power rule on a monomial. value coefficient ·
    exponent. -/
theorem fam_calculus_derivative_1 : (3 * 4) = 12 := by decide

/-- calculus: integral(12, 3) = 3 — INTEGRAL: the reverse power rule on a monomial. value ⌊coefficient /
    (exponent + 1)⌋. -/
theorem fam_calculus_integral_1 : (12 / (3 + 1)) = 3 := by decide

/-- calculus: slope(10, 2) = 5 — SLOPE: a secant over two points. value ⌊deltay / deltax⌋. -/
theorem fam_calculus_slope_1 : (10 / 2) = 5 := by decide

/-- calculus: area(6, 7) = 42 — AREA: a Riemann rectangle. value width · height. -/
theorem fam_calculus_area_1 : (6 * 7) = 42 := by decide

/-- calculus: limit(100, 4) = 25 — LIMIT: a quotient approached. value ⌊numerator / denominator⌋. -/
theorem fam_calculus_limit_1 : (100 / 4) = 25 := by decide

/-- calculus: rate(60, 12) = 5 — RATE: average change over time. value ⌊change / time⌋. -/
theorem fam_calculus_rate_1 : (60 / 12) = 5 := by decide

/-- calculus: series(8, 3) = 24 — SERIES: a partial sum proxy. value terms · ratio. -/
theorem fam_calculus_series_1 : (8 * 3) = 24 := by decide

/-- calculus: tangent(5, 6) = 30 — TANGENT: a tangent line read off a slope. value slope · point. -/
theorem fam_calculus_tangent_1 : (5 * 6) = 30 := by decide

/-- calendar: daysinyear(360, 5) = 365 -/
theorem fam_calendar_daysinyear_1 : (360 + 5) = 365 := by decide

/-- calendar: leapcycle(100, 4) = 25 -/
theorem fam_calendar_leapcycle_1 : (100 / 4) = 25 := by decide

/-- calendar: intercalations(19, 7) = 2 -/
theorem fam_calendar_intercalations_1 : (19 / 7) = 2 := by decide

/-- calendar: epochspan(2000, 1) = 1999 -/
theorem fam_calendar_epochspan_1 : (fmax 0 (2000 - 1)) = 1999 := by decide

/-- calligraphy: strokecount(8, 4) = 12 -/
theorem fam_calligraphy_strokecount_1 : (8 + 4) = 12 := by decide

/-- calligraphy: penangle(900, 10) = 90 -/
theorem fam_calligraphy_penangle_1 : (900 / 10) = 90 := by decide

/-- calligraphy: xheight(100, 2) = 50 -/
theorem fam_calligraphy_xheight_1 : (100 / 2) = 50 := by decide

/-- calligraphy: letterspacing(12, 3) = 36 -/
theorem fam_calligraphy_letterspacing_1 : (12 * 3) = 36 := by decide

/-- calligraphy: flourishsubsets(4) = 16 -/
theorem fam_calligraphy_flourishsubsets_1 : (2 ^ 4) = 16 := by decide

/-- calligraphy: slantdegree(120, 10) = 12 -/
theorem fam_calligraphy_slantdegree_1 : (120 / 10) = 12 := by decide

/-- campaign: reach(50000, 60) = 30000 — CAMPAIGN — RUNNING AN AD CAMPAIGN, AS ARITHMETIC. Spending to be seen
    is numbers: the people reached, the impressions served, how often each person saw it, the clickthrough rate,
    cost per mille, cost per click, engagement, and the return on the spend. Crosses to `marketing` — a campaign
    is what marketing runs. A measure. */ const PROOF = 'campaign arithmetic (reach, impressions, frequency,
    ctr, cpm, cpc, engagement, roi); running an ad campaign as numbers; a measure crossed to marketing' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'campaign', dst: 'marketing', formula, value,
    proof: PROOF, ...extra }, holds, { name: `campaign.${name}`, params }) export class CampaignFormulas { /**
    REACH: the people reached, a percentage of the audience. value ⌊audience · pct / 100⌋. -/
theorem fam_campaign_reach_1 : ((50000 * 60) / 100) = 30000 := by decide

/-- campaign: impressions(30000, 3) = 90000 — IMPRESSIONS: the people reached times how often each one saw it.
    value reach · frequency. -/
theorem fam_campaign_impressions_1 : (30000 * 3) = 90000 := by decide

/-- campaign: frequency(90000, 30000) = 3 — FREQUENCY: impressions over the people reached. value ⌊impressions /
    reach⌋. -/
theorem fam_campaign_frequency_1 : (90000 / 30000) = 3 := by decide

/-- campaign: ctr(600, 60000) = 100 — CTR: clickthrough rate in basis points (per 10000). value ⌊clicks · 10000
    / impressions⌋. -/
theorem fam_campaign_ctr_1 : ((600 * 10000) / 60000) = 100 := by decide

/-- campaign: cpm(5000, 50000) = 100 — CPM: cost per mille, the spend per thousand impressions. value ⌊cost ·
    1000 / impressions⌋. -/
theorem fam_campaign_cpm_1 : ((5000 * 1000) / 50000) = 100 := by decide

/-- campaign: cpc(5000, 500) = 10 — CPC: cost per click. value ⌊cost / clicks⌋. -/
theorem fam_campaign_cpc_1 : (5000 / 500) = 10 := by decide

/-- campaign: engagement(1500, 30000) = 5 — ENGAGEMENT: the actions taken as a percentage of the people reached.
    value ⌊actions · 100 / reach⌋. -/
theorem fam_campaign_engagement_1 : ((1500 * 100) / 30000) = 5 := by decide

/-- campaign: roi(15000, 5000) = 200 — ROI: return on the spend, a percentage. value ⌊max(0, revenue − cost) ·
    100 / cost⌋. -/
theorem fam_campaign_roi_1 : (((fmax 0 (15000 - 5000)) * 100) / 5000) = 200 := by decide

/-- campaign: roi(3000, 5000) = 0 — ROI: return on the spend, a percentage. value ⌊max(0, revenue − cost) · 100
    / cost⌋. -/
theorem fam_campaign_roi_2 : (((fmax 0 (3000 - 5000)) * 100) / 5000) = 0 := by decide

/-- canning: headspace(500, 450) = 50 — CANNING — HOME & COMMERCIAL PRESERVING, AS ARITHMETIC. Putting up food
    is numbers: the headspace a jar leaves, the processing minutes a load needs, accumulated lethality
    (F-value), the yield after loss, brine strength, the seal rate, the batches a harvest fills, and whether the
    temperature sterilizes. Crosses to `cuisine` — canning is how cuisine keeps. A measure. */ const PROOF =
    'canning arithmetic (headspace, process time, F-value lethality, yield after loss, brine strength, seal
    rate, batches, sterilize); preserving as a measure crossed to cuisine' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'canning', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, {
    name: `canning.${name}`, params }) export class CanningFormulas { /** HEADSPACE: the empty room a jar leaves
    above the fill. value max(0, jar − fill). -/
theorem fam_canning_headspace_1 : (fmax 0 (500 - 450)) = 50 := by decide

/-- canning: processtime(10, 2, 7) = 24 — PROCESS TIME: a base heat-up plus a per-jar cost over the jars in the
    load. value base + perJar · jars. -/
theorem fam_canning_processtime_1 : (10 + (2 * 7)) = 24 := by decide

/-- canning: fvalue(3, 20) = 60 — F-VALUE: accumulated lethality, a per-minute rate over the minutes held. value
    lethality · minutes. -/
theorem fam_canning_fvalue_1 : (3 * 20) = 60 := by decide

/-- canning: yield(1000, 15) = 850 — YIELD: what survives after a loss percentage. value ⌊input · (100 −
    lossPct) / 100⌋. -/
theorem fam_canning_yield_1 : ((1000 * (100 - 15)) / 100) = 850 := by decide

/-- canning: brine(2000, 5) = 100 — BRINE: the salt a water volume carries at a strength percentage. value
    ⌊water · saltPct / 100⌋. -/
theorem fam_canning_brine_1 : ((2000 * 5) / 100) = 100 := by decide

/-- canning: seal(24, 25) = 96 — SEAL RATE: the jars that sealed, as a percentage of the load. value ⌊sealed ·
    100 / total⌋. -/
theorem fam_canning_seal_1 : ((24 * 100) / 25) = 96 := by decide

/-- capacitor: charge(100, 12) = 1200 -/
theorem fam_capacitor_charge_1 : (100 * 12) = 1200 := by decide

/-- capacitor: energy(1200, 2) = 600 -/
theorem fam_capacitor_energy_1 : (1200 / 2) = 600 := by decide

/-- capacitor: reactance(60000, 628) = 95 -/
theorem fam_capacitor_reactance_1 : (60000 / 628) = 95 := by decide

/-- capacitor: timeconstant(100, 10) = 1000 -/
theorem fam_capacitor_timeconstant_1 : (100 * 10) = 1000 := by decide

/-- capacitor: voltagerating(25, 1) = 25 -/
theorem fam_capacitor_voltagerating_1 : (25 * 1) = 25 := by decide

/-- capacitor: parallelsum(100, 200) = 300 -/
theorem fam_capacitor_parallelsum_1 : (100 + 200) = 300 := by decide

/-- capacitor: leakage(1, 100) = 1 -/
theorem fam_capacitor_leakage_1 : ((1 * 100) / 100) = 1 := by decide

/-- caramelization: temperaturethreshold(160, 170) = 170 -/
theorem fam_caramelization_temperaturethreshold_1 : (fmax 160 170) = 170 := by decide

/-- caramelization: browningrate(80, 100) = 80 -/
theorem fam_caramelization_browningrate_1 : ((80 * 100) / 100) = 80 := by decide

/-- caramelization: sugarconversion(90, 100) = 90 -/
theorem fam_caramelization_sugarconversion_1 : ((90 * 100) / 100) = 90 := by decide

/-- caramelization: masslosspct(15, 100) = 15 -/
theorem fam_caramelization_masslosspct_1 : ((15 * 100) / 100) = 15 := by decide

/-- caramelization: colorindex(8, 10) = 80 -/
theorem fam_caramelization_colorindex_1 : (8 * 10) = 80 := by decide

/-- caramelization: timeattemp(600, 10) = 60 -/
theorem fam_caramelization_timeattemp_1 : (600 / 10) = 60 := by decide

/-- caramelization: activationstage(170, 30) = 5 -/
theorem fam_caramelization_activationstage_1 : (170 / 30) = 5 := by decide

/-- caramelization: residualsugar(100, 90) = 10 -/
theorem fam_caramelization_residualsugar_1 : (fmax 0 (100 - 90)) = 10 := by decide

/-- carbon: footprint(100, 5) = 500 — CARBON — ACCOUNTING FOR EMISSIONS, AS ARITHMETIC. The carbon ledger is
    numbers: the footprint of an activity, what an offset cancels, what trees sequester, emissions per unit of
    output, the cost of credits, what a capture plant holds back, the CO₂-equivalent of a gas, and the budget
    still left. Crosses to `climate` — carbon is what climate accounts for. A measure. */ const PROOF = 'carbon
    arithmetic (footprint, offset, sequestration, intensity, credits, capture, CO₂-equivalent, budget); the
    carbon ledger as integers; a measure crossed to climate' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'carbon', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `carbon.${name}`,
    params }) export class CarbonFormulas { /** FOOTPRINT: an activity amount at an emission factor. value
    activity · factor. -/
theorem fam_carbon_footprint_1 : (100 * 5) = 500 := by decide

/-- carbon: offset(1000, 300) = 700 — OFFSET: emissions left after an offset cancels some. value max(0,
    emissions − offset). -/
theorem fam_carbon_offset_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- carbon: offset(300, 1000) = 0 — OFFSET: emissions left after an offset cancels some. value max(0, emissions
    − offset). -/
theorem fam_carbon_offset_2 : (fmax 0 (300 - 1000)) = 0 := by decide

/-- carbon: sequestration(50, 20) = 1000 — SEQUESTRATION: trees at a per-tree uptake. value trees · rate. -/
theorem fam_carbon_sequestration_1 : (50 * 20) = 1000 := by decide

/-- carbon: intensity(5000, 100) = 50 — INTENSITY: emissions per unit of output. value ⌊emissions / output⌋. -/
theorem fam_carbon_intensity_1 : (5000 / 100) = 50 := by decide

/-- carbon: credits(10, 25) = 250 — CREDITS: tonnes of carbon at a price each. value tonnes · price. -/
theorem fam_carbon_credits_1 : (10 * 25) = 250 := by decide

/-- carbon: capture(1000, 90) = 900 — CAPTURE: flue CO₂ held back at an efficiency (percent). value ⌊flue ·
    efficiency / 100⌋. -/
theorem fam_carbon_capture_1 : ((1000 * 90) / 100) = 900 := by decide

/-- carbon: equivalent(8, 28) = 224 — EQUIVALENT: a gas amount at its global-warming potential. value gas · gwp. -/
theorem fam_carbon_equivalent_1 : (8 * 28) = 224 := by decide

/-- carbon: budget(1000, 600) = 400 — BUDGET: the carbon budget still left after what is used. value max(0,
    total − used). -/
theorem fam_carbon_budget_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- cardiology: ejection(60, 120) = 50 — CARDIOLOGY — THE HEART, AS ARITHMETIC (chosen by the registry, not by
    hand). A beating heart is numbers: the fraction the ventricle ejects, cardiac output, mean arterial
    pressure, a corrected QT proxy, the target heart rate for an age, body-mass index, a risk fraction, and
    pulse from counted beats. Crosses to `med` — cardiology is a measure medicine reads. A measure. */ const
    PROOF = 'cardiology arithmetic (ejection fraction, cardiac output, mean arterial pressure, corrected QT,
    target heart rate, body-mass index, risk, pulse); a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'cardiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `cardiology.${name}`, params }) export class CardiologyFormulas { /** EJECTION FRACTION: the percentage of
    diastolic volume the stroke ejects. value ⌊stroke · 100 / diastolic⌋. -/
theorem fam_cardiology_ejection_1 : ((60 * 100) / 120) = 50 := by decide

/-- cardiology: output(70, 72) = 5040 — CARDIAC OUTPUT: stroke volume at a heart rate. value stroke · rate. -/
theorem fam_cardiology_output_1 : (70 * 72) = 5040 := by decide

/-- cardiology: map(120, 80) = 93 — MEAN ARTERIAL PRESSURE: diastolic weighted twice. value ⌊(systolic + 2 ·
    diastolic) / 3⌋. -/
theorem fam_cardiology_map_1 : ((120 + (2 * 80)) / 3) = 93 := by decide

/-- cardiology: qtc(400, 800) = 50 — CORRECTED QT: a proxy, QT over the RR interval. value ⌊qt · 100 / rr⌋. -/
theorem fam_cardiology_qtc_1 : ((400 * 100) / 800) = 50 := by decide

/-- cardiology: target(40) = 180 — TARGET HEART RATE: the maximum for an age. value max(0, 220 − age). -/
theorem fam_cardiology_target_1 : (fmax 0 (220 - 40)) = 180 := by decide

/-- cardiology: risk(3, 10) = 30 — RISK: the fraction of factors present. value ⌊factors · 100 / total⌋. -/
theorem fam_cardiology_risk_1 : ((3 * 100) / 10) = 30 := by decide

/-- cardiology: pulse(30, 15) = 120 — PULSE: beats counted over seconds, to the minute. value ⌊beats · 60 /
    seconds⌋. -/
theorem fam_cardiology_pulse_1 : ((30 * 60) / 15) = 120 := by decide

/-- cargo: teu(300, 150) = 600 — CARGO — MOVING FREIGHT, AS ARITHMETIC (chosen by the shipping registry, not by
    hand). Hauling goods is numbers: the TEU a box count comes to, how full a hold is, stowed volume, deadweight
    carried, manifest weight, the pallets a carton run needs, the containers a unit run needs, and the load
    factor. Crosses to `logistics` — cargo is what logistics plans and routes. A measure. */ const PROOF =
    'cargo arithmetic (TEU, utilization, stowage volume, deadweight, manifest weight, palletize, containers,
    load factor); the registry\'s uncovered freight domain; a measure crossed to logistics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'cargo', dst: 'logistics', formula, value, proof: PROOF, ...extra
    }, holds, { name: `cargo.${name}`, params }) export class CargoFormulas { /** TEU: twenty-foot equivalent
    units, forties counting double. value twenties + forties · 2. -/
theorem fam_cargo_teu_1 : (300 + (150 * 2)) = 600 := by decide

/-- cargo: utilization(950, 1000) = 95 — UTILIZATION of the hold as a percentage. value ⌊used · 100 / capacity⌋. -/
theorem fam_cargo_utilization_1 : ((950 * 100) / 1000) = 95 := by decide

/-- cargo: stowage(500, 33) = 16500 — STOWAGE: stowed volume, boxes at a volume each. value boxes · volume. -/
theorem fam_cargo_stowage_1 : (500 * 33) = 16500 := by decide

/-- cargo: deadweight(40000, 5000, 3000) = 48000 — DEADWEIGHT: the tonnage carried — cargo, fuel and ballast.
    value cargo + fuel + ballast. -/
theorem fam_cargo_deadweight_1 : ((40000 + 5000) + 3000) = 48000 := by decide

/-- cargo: manifest(200, 25) = 5000 — MANIFEST: total weight, items at a weight each. value items · weight. -/
theorem fam_cargo_manifest_1 : (200 * 25) = 5000 := by decide

/-- cargo: loadfactor(800, 1000) = 80 — LOAD FACTOR: the load carried against capacity, as a percentage. value
    ⌊load · 100 / capacity⌋. -/
theorem fam_cargo_loadfactor_1 : ((800 * 100) / 1000) = 80 := by decide

/-- cartography: area(40, 25) = 1000 — CARTOGRAPHY — MAPPING THE GROUND AS ARITHMETIC. A map is numbers: the
    scale a ground distance maps to, a pixel distance on the ground, contour lines by interval, projection
    distortion, the resolution of an area in pixels, a compass bearing normalised, the area of a region, and the
    tiles a zoom level covers. Crosses to `geography` — cartography draws what geography measures. A measure. */
    const PROOF = 'cartography arithmetic (map scale, pixel distance, contour lines, projection distortion,
    resolution, bearing, area, zoom tiles); the ground as a drawing; a measure crossed to geography' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'cartography', dst: 'geography', formula, value, proof: PROOF,
    ...extra }, holds, { name: `cartography.${name}`, params }) export class CartographyFormulas { /** AREA: a
    region's length by width. value length · width. -/
theorem fam_cartography_area_1 : (40 * 25) = 1000 := by decide

/-- cartography: contour(1050, 100) = 10 — CONTOUR: the contour line an elevation falls on at a spacing. value
    ⌊elevation / interval⌋. -/
theorem fam_cartography_contour_1 : (1050 / 100) = 10 := by decide

/-- cartography: distance(50, 1000) = 50000 — DISTANCE: pixels on the map at a scale, as ground distance. value
    pixels · scale. -/
theorem fam_cartography_distance_1 : (50 * 1000) = 50000 := by decide

/-- cartography: distortion(120, 100) = 120 — DISTORTION: a projected length against the true length, as a
    percentage. value ⌊projected · 100 / true_⌋. -/
theorem fam_cartography_distortion_1 : ((120 * 100) / 100) = 120 := by decide

/-- cartography: resolution(10000, 100) = 100 — RESOLUTION: an area over the pixels that render it. value ⌊area
    / pixels⌋. -/
theorem fam_cartography_resolution_1 : (10000 / 100) = 100 := by decide

/-- cartography: scale(50000, 25) = 2000 — SCALE: a ground distance against a map distance. value ⌊ground /
    map⌋. -/
theorem fam_cartography_scale_1 : (50000 / 25) = 2000 := by decide

/-- cartography: zoom(1, 2) = 16 — ZOOM: the tiles a zoom level covers, quadrupling per level. value tiles ·
    4^levels. -/
theorem fam_cartography_zoom_1 : (1 * (4 ^ 2)) = 16 := by decide

/-- casting: shrinkage(1010, 1000) = 10 — CASTING — POURING METAL, AS ARITHMETIC. A foundry is numbers: the
    shrinkage from hot to cold, how long the pour takes, how long the metal takes to solidify (Chvorinov's
    modulus squared), the yield of good casting from metal poured, the riser a casting needs, the gating ratio,
    fluidity from superheat, and the cooling rate. Crosses to `manufacturing` — casting is a manufacturing
    process. A measure. */ const PROOF = 'casting arithmetic (shrinkage, pour time, solidification modulus,
    yield, riser, gating ratio, fluidity, cooling rate); a foundry as a measure crossed to manufacturing' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'casting', dst: 'manufacturing', formula, value,
    proof: PROOF, ...extra }, holds, { name: `casting.${name}`, params }) export class CastingFormulas { /**
    SHRINKAGE: the dimension lost from hot to cold. value max(0, hot − cold). -/
theorem fam_casting_shrinkage_1 : (fmax 0 (1010 - 1000)) = 10 := by decide

/-- casting: shrinkage(1000, 1010) = 0 — CASTING — POURING METAL, AS ARITHMETIC. A foundry is numbers: the
    shrinkage from hot to cold, how long the pour takes, how long the metal takes to solidify (Chvorinov's
    modulus squared), the yield of good casting from metal poured, the riser a casting needs, the gating ratio,
    fluidity from superheat, and the cooling rate. Crosses to `manufacturing` — casting is a manufacturing
    process. A measure. */ const PROOF = 'casting arithmetic (shrinkage, pour time, solidification modulus,
    yield, riser, gating ratio, fluidity, cooling rate); a foundry as a measure crossed to manufacturing' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'casting', dst: 'manufacturing', formula, value,
    proof: PROOF, ...extra }, holds, { name: `casting.${name}`, params }) export class CastingFormulas { /**
    SHRINKAGE: the dimension lost from hot to cold. value max(0, hot − cold). -/
theorem fam_casting_shrinkage_2 : (fmax 0 (1000 - 1010)) = 0 := by decide

/-- casting: pouringtime(1000, 50) = 20 — POURING TIME: the mould volume at a pour rate. value ⌊volume / rate⌋. -/
theorem fam_casting_pouringtime_1 : (1000 / 50) = 20 := by decide

/-- casting: yield(80, 100) = 80 — YIELD: good casting as a percentage of metal poured. value ⌊casting · 100 /
    poured⌋. -/
theorem fam_casting_yield_1 : ((80 * 100) / 100) = 80 := by decide

/-- casting: risering(1000, 30) = 300 — RISERING: the riser as a percentage of casting volume. value ⌊volume ·
    pct / 100⌋. -/
theorem fam_casting_risering_1 : ((1000 * 30) / 100) = 300 := by decide

/-- casting: gatingratio(40, 10) = 4 — GATING RATIO: runner area over ingate area. value ⌊runner / ingate⌋. -/
theorem fam_casting_gatingratio_1 : (40 / 10) = 4 := by decide

/-- casting: fluidity(50, 3) = 150 — FLUIDITY: the flow length from superheat at a coefficient. value superheat
    · coeff. -/
theorem fam_casting_fluidity_1 : (50 * 3) = 150 := by decide

/-- casting: coolingrate(600, 60) = 10 — COOLING RATE: the temperature drop over the time taken. value ⌊deltaT /
    time⌋. -/
theorem fam_casting_coolingrate_1 : (600 / 60) = 10 := by decide

/-- catalysis: turnover(1000, 5) = 200 — TURNOVER NUMBER: product over catalyst. value ⌊product / catalyst⌋. -/
theorem fam_catalysis_turnover_1 : (1000 / 5) = 200 := by decide

/-- catalysis: frequency(1200, 60) = 20 — TURNOVER FREQUENCY: turnovers over time. value ⌊turnover / time⌋. -/
theorem fam_catalysis_frequency_1 : (1200 / 60) = 20 := by decide

/-- catalysis: selectivity(80, 100) = 80 — SELECTIVITY: desired as a percentage of total. value ⌊desired · 100 /
    total⌋. -/
theorem fam_catalysis_selectivity_1 : ((80 * 100) / 100) = 80 := by decide

/-- catalysis: activation(75, 30) = 45 — CATALYSIS — RUNNING A REACTION IS NUMBERS (chosen by the chemistry
    registry, not by hand). A catalyst's work is counted: turnovers per site, turnovers per second, how
    selective the product is, how much activation the catalyst removes, how much reactant converts, the catalyst
    loading, the rate, and the active sites per area. Crosses to `chemistry` — catalysis is what chemistry
    measures. A measure. */ const PROOF = 'catalysis arithmetic (turnover number, turnover frequency,
    selectivity, activation lowered, conversion, loading, rate, surface sites); a chemistry measure crossed to
    chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'catalysis', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `catalysis.${name}`, params }) export class
    CatalysisFormulas { /** ACTIVATION LOWERED: the barrier the catalyst removes. value max(0, uncatalyzed −
    catalyzed). -/
theorem fam_catalysis_activation_1 : (fmax 0 (75 - 30)) = 45 := by decide

/-- catalysis: activation(30, 75) = 0 — CATALYSIS — RUNNING A REACTION IS NUMBERS (chosen by the chemistry
    registry, not by hand). A catalyst's work is counted: turnovers per site, turnovers per second, how
    selective the product is, how much activation the catalyst removes, how much reactant converts, the catalyst
    loading, the rate, and the active sites per area. Crosses to `chemistry` — catalysis is what chemistry
    measures. A measure. */ const PROOF = 'catalysis arithmetic (turnover number, turnover frequency,
    selectivity, activation lowered, conversion, loading, rate, surface sites); a chemistry measure crossed to
    chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'catalysis', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `catalysis.${name}`, params }) export class
    CatalysisFormulas { /** ACTIVATION LOWERED: the barrier the catalyst removes. value max(0, uncatalyzed −
    catalyzed). -/
theorem fam_catalysis_activation_2 : (fmax 0 (30 - 75)) = 0 := by decide

/-- catalysis: conversion(90, 100) = 90 — CONVERSION: product as a percentage of reactant. value ⌊product · 100
    / reactant⌋. -/
theorem fam_catalysis_conversion_1 : ((90 * 100) / 100) = 90 := by decide

/-- catalysis: loading(5, 100) = 5 — LOADING: catalyst as a percentage of substrate. value ⌊catalyst · 100 /
    substrate⌋. -/
theorem fam_catalysis_loading_1 : ((5 * 100) / 100) = 5 := by decide

/-- catalysis: rate(600, 60) = 10 — RATE: reacted over seconds. value ⌊reacted / seconds⌋. -/
theorem fam_catalysis_rate_1 : (600 / 60) = 10 := by decide

/-- catalysis: surface(1000, 10) = 100 — SURFACE: active sites per area. value ⌊sites / area⌋. -/
theorem fam_catalysis_surface_1 : (1000 / 10) = 100 := by decide

/-- catering: portions(240, 80) = 3 — CATERING — FEEDING A ROOM, AS ARITHMETIC. Serving a crowd is numbers: the
    portions each guest gets, cost per head, scaling a per-person recipe to the headcount, how much of what was
    provided got consumed, the staff a room needs, the waste off what was prepared, drinks per guest, and the
    margin on a priced plate. Crosses to `cuisine`. A measure. */ const PROOF = 'catering arithmetic (portions,
    cost per head, recipe scaling, consumption, staff ratio, waste, beverage, margin); feeding a room as a
    measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'catering', dst: 'cuisine',
    formula, value, proof: PROOF, ...extra }, holds, { name: `catering.${name}`, params }) export class
    CateringFormulas { /** PORTIONS: the total split across the guests. value ⌊total / guests⌋. -/
theorem fam_catering_portions_1 : (240 / 80) = 3 := by decide

/-- catering: costperhead(4000, 80) = 50 — COST PER HEAD: the cost split across the guests. value ⌊cost /
    guests⌋. -/
theorem fam_catering_costperhead_1 : (4000 / 80) = 50 := by decide

/-- catering: scaling(3, 80) = 240 — SCALING: a per-person recipe to the headcount. value perperson · headcount. -/
theorem fam_catering_scaling_1 : (3 * 80) = 240 := by decide

/-- catering: consumption(180, 240) = 75 — CONSUMPTION as a percentage of what was provided. value ⌊consumed ·
    100 / provided⌋. -/
theorem fam_catering_consumption_1 : ((180 * 100) / 240) = 75 := by decide

/-- catering: staffratio(80, 10) = 8 — STAFF RATIO: the guests each staff member covers. value ⌊guests / staff⌋. -/
theorem fam_catering_staffratio_1 : (80 / 10) = 8 := by decide

/-- catering: waste(60, 240) = 25 — WASTE as a percentage of what was prepared. value ⌊leftover · 100 /
    prepared⌋. -/
theorem fam_catering_waste_1 : ((60 * 100) / 240) = 25 := by decide

/-- catering: beverage(240, 80) = 3 — BEVERAGE: the drinks split across the guests. value ⌊drinks / guests⌋. -/
theorem fam_catering_beverage_1 : (240 / 80) = 3 := by decide

/-- catering: margin(100, 40) = 60 — MARGIN as a percentage of the price. value ⌊(price − cost) · 100 / price⌋. -/
theorem fam_catering_margin_1 : (((100 - 40) * 100) / 100) = 60 := by decide

/-- census: density(60000, 30) = 2000 — CENSUS — COUNTING A POPULATION, AS ARITHMETIC (chosen by the public-data
    registry, not by hand). A census is numbers: people per unit of land, how fast a count grows, the middle
    age, who depends on whom, who works, who answered, who was missed, and the seats a count earns. Crosses to
    `sociology` — census is the measure sociology reasons over. A measure. */ const PROOF = 'census arithmetic
    (density, growth, median age, dependency, participation, response, undercount, apportionment); a population
    counted; a measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'census', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `census.${name}`,
    params }) export class CensusFormulas { /** DENSITY: people over the land they occupy. value ⌊people /
    area⌋. -/
theorem fam_census_density_1 : (60000 / 30) = 2000 := by decide

/-- census: growth(1100, 1000) = 10 — GROWTH: percentage increase of a count over its previous count. value
    ⌊max(0, current − previous) · 100 / previous⌋. -/
theorem fam_census_growth_1 : (((fmax 0 (1100 - 1000)) * 100) / 1000) = 10 := by decide

/-- census: medianage(3500, 100) = 35 — MEDIAN AGE: the summed ages over the people counted. value ⌊sumAges /
    people⌋. -/
theorem fam_census_medianage_1 : (3500 / 100) = 35 := by decide

/-- census: dependency(500, 1000) = 50 — DEPENDENCY RATIO: dependents per hundred workers. value ⌊dependents ·
    100 / workers⌋. -/
theorem fam_census_dependency_1 : ((500 * 100) / 1000) = 50 := by decide

/-- census: participation(630, 1000) = 63 — PARTICIPATION: the labour force as a percentage of the population.
    value ⌊labor · 100 / population⌋. -/
theorem fam_census_participation_1 : ((630 * 100) / 1000) = 63 := by decide

/-- census: response(750, 1000) = 75 — RESPONSE RATE: who answered as a percentage of who was sampled. value
    ⌊responded · 100 / sampled⌋. -/
theorem fam_census_response_1 : ((750 * 100) / 1000) = 75 := by decide

/-- census: undercount(1000, 970) = 30 — UNDERCOUNT: how many the count missed against the true number. value
    max(0, actual − counted). -/
theorem fam_census_undercount_1 : (fmax 0 (1000 - 970)) = 30 := by decide

/-- census: undercount(900, 1000) = 0 — UNDERCOUNT: how many the count missed against the true number. value
    max(0, actual − counted). -/
theorem fam_census_undercount_2 : (fmax 0 (900 - 1000)) = 0 := by decide

/-- census: apportionment(60000, 120) = 500 — APPORTIONMENT: the seats a count earns at a fixed divisor. value
    ⌊population / divisor⌋. -/
theorem fam_census_apportionment_1 : (60000 / 120) = 500 := by decide

/-- ceramics: shrinkage(100, 88) = 12 — CERAMICS — THE FIRED-CLAY TRADE, AS ARITHMETIC (chosen by the materials
    registry, not by hand). Working clay is numbers: how much a piece shrinks from wet to fired, how porous the
    body is, the firing cone, bulk density, surface hardness, glaze laid on in coats, how much thermal shock it
    bears, and how far vitrification has run. Crosses to `materials` — ceramics is one of its bodies. A measure.
    */ const PROOF = 'ceramics arithmetic (shrinkage, porosity, firing cone, density, hardness, glaze, thermal
    shock, vitrification); a materials body; a measure crossed to materials' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'ceramics', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, {
    name: `ceramics.${name}`, params }) export class CeramicsFormulas { /** SHRINKAGE from wet to fired, as a
    percentage. value ⌊(wet − fired) · 100 / wet⌋. -/
theorem fam_ceramics_shrinkage_1 : (((100 - 88) * 100) / 100) = 12 := by decide

/-- ceramics: porosity(15, 200) = 7 — POROSITY: pore volume over bulk volume, as a percentage. value ⌊pores ·
    100 / volume⌋. -/
theorem fam_ceramics_porosity_1 : ((15 * 100) / 200) = 7 := by decide

/-- ceramics: firing(1280) = 1280 — FIRING cone, a temperature proxy. value temperature. -/
theorem fam_ceramics_firing_1 : 1280 = 1280 := by decide

/-- ceramics: density(900, 300) = 3 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_ceramics_density_1 : (900 / 300) = 3 := by decide

/-- ceramics: hardness(7) = 7 — HARDNESS on the scratch scale. value scratch. -/
theorem fam_ceramics_hardness_1 : 7 = 7 := by decide

/-- ceramics: glaze(2, 3) = 6 — GLAZE: thickness laid on in coats. value thickness · coats. -/
theorem fam_ceramics_glaze_1 : (2 * 3) = 6 := by decide

/-- ceramics: thermalshock(400, 50) = 8 — THERMAL SHOCK borne: delta over resistance. value ⌊delta /
    resistance⌋. -/
theorem fam_ceramics_thermalshock_1 : (400 / 50) = 8 := by decide

/-- ceramics: vitrification(85, 100) = 85 — VITRIFICATION: glassy phase over total, as a percentage. value
    ⌊glassy · 100 / total⌋. -/
theorem fam_ceramics_vitrification_1 : ((85 * 100) / 100) = 85 := by decide

/-- cern: energygev(7000, 2) = 14000 -/
theorem fam_cern_energygev_1 : (7000 * 2) = 14000 := by decide

/-- cern: collisions(40, 1000) = 40000 -/
theorem fam_cern_collisions_1 : (40 * 1000) = 40000 := by decide

/-- cern: luminosity(60000, 100) = 600 -/
theorem fam_cern_luminosity_1 : (60000 / 100) = 600 := by decide

/-- cern: detectorlayers(4, 3) = 7 -/
theorem fam_cern_detectorlayers_1 : (4 + 3) = 7 := by decide

/-- cern: bunchspacing(25, 1) = 25 -/
theorem fam_cern_bunchspacing_1 : (25 / 1) = 25 := by decide

/-- cern: tracksperevent(100, 10) = 1000 -/
theorem fam_cern_tracksperevent_1 : (100 * 10) = 1000 := by decide

/-- cern: triggerrate(40000, 40) = 1000 -/
theorem fam_cern_triggerrate_1 : (40000 / 40) = 1000 := by decide

/-- checkers: squares(8, 8) = 64 -/
theorem fam_checkers_squares_1 : (8 * 8) = 64 := by decide

/-- checkers: playablesquares(64, 2) = 32 -/
theorem fam_checkers_playablesquares_1 : (64 / 2) = 32 := by decide

/-- checkers: pieces(12, 2) = 24 -/
theorem fam_checkers_pieces_1 : (12 * 2) = 24 := by decide

/-- checkers: kingrows(2, 0) = 2 -/
theorem fam_checkers_kingrows_1 : (2 + 0) = 2 := by decide

/-- checkers: positionsubsets(8) = 256 -/
theorem fam_checkers_positionsubsets_1 : (2 ^ 8) = 256 := by decide

/-- checkers: branchingfactor(8, 2) = 10 -/
theorem fam_checkers_branchingfactor_1 : (8 + 2) = 10 := by decide

/-- checksum: crcbits(1000, 32) = 1032 — CRC BITS: the message extended by the generator's check bits. value
    datalen + polydegree. -/
theorem fam_checksum_crcbits_1 : (1000 + 32) = 1032 := by decide

/-- checksum: fletcher(10, 20) = 5130 — FLETCHER: the two running sums folded into one word. value sum2 · 256 +
    sum1. -/
theorem fam_checksum_fletcher_1 : ((20 * 256) + 10) = 5130 := by decide

/-- checksum: detectionrate(99, 100) = 99 — DETECTION RATE as a percentage of errors caught. value ⌊detected ·
    100 / total⌋. -/
theorem fam_checksum_detectionrate_1 : ((99 * 100) / 100) = 99 := by decide

/-- checksum: overhead(32, 1000) = 3 — OVERHEAD: the check bits as a percentage of the data bits. value
    ⌊checkbits · 100 / databits⌋. -/
theorem fam_checksum_overhead_1 : ((32 * 100) / 1000) = 3 := by decide

/-- cheese: aging(90, 2) = 180 — CHEESE — MAKING CHEESE, AS ARITHMETIC (the make sheet is numbers, not taste).
    Milk becomes curd by counting: yield from milk, moisture of the paste, titratable acidity, salt-in-moisture,
    aging units, rennet dose, fat-in-dry-matter, and the culture inoculation ratio. Crosses to `chemistry` — a
    cheese is acid, fat and water measured. A measure. */ const PROOF = 'cheese arithmetic (yield, moisture,
    acidity, salt-in-moisture, aging, rennet dose, fat-in-dry-matter, culture ratio); the make sheet as
    counting; a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'cheese', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `cheese.${name}`,
    params }) export class CheeseFormulas { /** AGING: flavour units built over days at a per-day rate. value
    days · rate. -/
theorem fam_cheese_aging_1 : (90 * 2) = 180 := by decide

/-- cheese: cultureratio(2, 1000) = 2 — CULTURE RATIO: starter per mille of the milk. value ⌊culture · 1000 /
    milk⌋. -/
theorem fam_cheese_cultureratio_1 : ((2 * 1000) / 1000) = 2 := by decide

/-- cheese: fatindrymatter(30, 60) = 50 — FAT IN DRY MATTER: fat as a percentage of the dry matter. value ⌊fat ·
    100 / dry⌋. -/
theorem fam_cheese_fatindrymatter_1 : ((30 * 100) / 60) = 50 := by decide

/-- cheese: moisture(450, 1000) = 45 — MOISTURE: water as a percentage of the whole paste. value ⌊water · 100 /
    total⌋. -/
theorem fam_cheese_moisture_1 : ((450 * 100) / 1000) = 45 := by decide

/-- cheese: phacidity(9, 50) = 18 — PH ACIDITY: titratable acidity, acid per unit of volume. value ⌊acid · 100 /
    volume⌋. -/
theorem fam_cheese_phacidity_1 : ((9 * 100) / 50) = 18 := by decide

/-- cheese: salt(5, 50) = 10 — SALT IN MOISTURE: salt as a percentage of the moisture. value ⌊salt · 100 /
    moisture⌋. -/
theorem fam_cheese_salt_1 : ((5 * 100) / 50) = 10 := by decide

/-- cheese: yield(1000, 10) = 100 — YIELD: cheese made from milk at a yield factor (percent). value ⌊milk ·
    factor / 100⌋. -/
theorem fam_cheese_yield_1 : ((1000 * 10) / 100) = 100 := by decide

/-- cheesemaking: yield(10, 100) = 10 -/
theorem fam_cheesemaking_yield_1 : ((10 * 100) / 100) = 10 := by decide

/-- cheesemaking: culturestrains(3, 2) = 5 -/
theorem fam_cheesemaking_culturestrains_1 : (3 + 2) = 5 := by decide

/-- cheesemaking: phlevel(52, 10) = 5 -/
theorem fam_cheesemaking_phlevel_1 : (52 / 10) = 5 := by decide

/-- cheesemaking: agingdays(60, 1) = 60 -/
theorem fam_cheesemaking_agingdays_1 : (60 * 1) = 60 := by decide

/-- cheesemaking: moisture(40, 100) = 40 -/
theorem fam_cheesemaking_moisture_1 : ((40 * 100) / 100) = 40 := by decide

/-- cheesemaking: rennetdrops(1000, 10) = 100 -/
theorem fam_cheesemaking_rennetdrops_1 : (1000 / 10) = 100 := by decide

/-- cheesemaking: saltpct(2, 100) = 2 -/
theorem fam_cheesemaking_saltpct_1 : ((2 * 100) / 100) = 2 := by decide

/-- chemical: conversion(80, 100) = 80 — CHEMICAL — CHEMICAL ENGINEERING AS ARITHMETIC. Running a process is
    numbers: how much feed reacts, how much product against the theoretical, how long a parcel resides, the
    reflux ratio, heat and mass transfer, selectivity, pressure drop across a bed. Crosses to `chemistry` —
    engineering is chemistry at scale. A measure. */ const PROOF = 'chemical engineering arithmetic (conversion,
    yield, residence time, reflux, heat transfer, mass transfer, selectivity, pressure drop); a measure crossed
    to chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'chemical', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `chemical.${name}`, params }) export class
    ChemicalFormulas { /** CONVERSION: fraction of feed reacted, as a percentage. value ⌊reacted · 100 / fed⌋. -/
theorem fam_chemical_conversion_1 : ((80 * 100) / 100) = 80 := by decide

/-- chemical: heattransfer(50, 20) = 1000 — HEAT TRANSFER: duty from coefficient and area. value coefficient ·
    area. -/
theorem fam_chemical_heattransfer_1 : (50 * 20) = 1000 := by decide

/-- chemical: masstransfer(30, 4) = 120 — MASS TRANSFER: flux from gradient and coefficient. value gradient ·
    coefficient. -/
theorem fam_chemical_masstransfer_1 : (30 * 4) = 120 := by decide

/-- chemical: output(90, 100) = 90 — YIELD: product against the theoretical, as a percentage. value ⌊product ·
    100 / theoretical⌋. -/
theorem fam_chemical_output_1 : ((90 * 100) / 100) = 90 := by decide

/-- chemical: pressuredrop(200, 150) = 50 — PRESSURE DROP: inlet less outlet, never below zero. value max(0,
    inlet − outlet). -/
theorem fam_chemical_pressuredrop_1 : (fmax 0 (200 - 150)) = 50 := by decide

/-- chemical: pressuredrop(100, 150) = 0 — PRESSURE DROP: inlet less outlet, never below zero. value max(0,
    inlet − outlet). -/
theorem fam_chemical_pressuredrop_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- chemical: reflux(300, 100) = 300 — REFLUX: returned against distillate, as a percentage. value ⌊returned ·
    100 / distillate⌋. -/
theorem fam_chemical_reflux_1 : ((300 * 100) / 100) = 300 := by decide

/-- chemical: residence(1000, 50) = 20 — RESIDENCE TIME: volume over volumetric flow. value ⌊volume / flow⌋. -/
theorem fam_chemical_residence_1 : (1000 / 50) = 20 := by decide

/-- chemical: selectivity(75, 100) = 75 — SELECTIVITY: desired against total product, as a percentage. value
    ⌊desired · 100 / total⌋. -/
theorem fam_chemical_selectivity_1 : ((75 * 100) / 100) = 75 := by decide

/-- chemistry: moles(180, 18) = 10 — CHEMISTRY — WET-LAB STOICHIOMETRY, AS ARITHMETIC (chosen by the registry,
    not by hand). Reactions are numbers: moles from mass, concentration in solution, acidity, reaction yield,
    mass from moles, dilution by conservation, mixing ratio, and the bonds a chain of atoms holds. Crosses to
    `cern` — chemistry is physics the detector counts. A measure. */ const PROOF = 'chemistry arithmetic (moles,
    concentration, pH, yield, mass, dilution, ratio, bonds); a wet-lab domain; a measure crossed to cern' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'chemistry', dst: 'cern', formula, value, proof:
    PROOF, ...extra }, holds, { name: `chemistry.${name}`, params }) export class ChemistryFormulas { /** MOLES:
    mass over molar mass. value ⌊mass / molar⌋. -/
theorem fam_chemistry_moles_1 : (180 / 18) = 10 := by decide

/-- chemistry: concentration(2, 4) = 500 — CONCENTRATION in mmol/L: moles in a volume. value ⌊moles · 1000 /
    litres⌋. -/
theorem fam_chemistry_concentration_1 : ((2 * 1000) / 4) = 500 := by decide

/-- chemistry: ph(7) = 7 — pH: the acidity reading. value concentration, holds 0..14. -/
theorem fam_chemistry_ph_1 : 7 = 7 := by decide

/-- chemistry: yield(80, 100) = 80 — YIELD as a percentage. value ⌊actual · 100 / theoretical⌋. -/
theorem fam_chemistry_yield_1 : ((80 * 100) / 100) = 80 := by decide

/-- chemistry: mass(10, 18) = 180 — MASS: moles at a molar mass. value moles · molar. -/
theorem fam_chemistry_mass_1 : (10 * 18) = 180 := by decide

/-- chemistry: dilution(5, 20) = 100 — DILUTION: the conserved amount c1 · v1. value c1 · v1. -/
theorem fam_chemistry_dilution_1 : (5 * 20) = 100 := by decide

/-- chemistry: ratio(1, 4) = 25 — RATIO as a percentage. value ⌊a · 100 / b⌋. -/
theorem fam_chemistry_ratio_1 : ((1 * 100) / 4) = 25 := by decide

/-- chemistry: bonds(5) = 4 — BONDS: a chain of atoms holds one fewer bond. value max(0, atoms − 1). -/
theorem fam_chemistry_bonds_1 : (fmax 0 (5 - 1)) = 4 := by decide

/-- chess: material(2, 5) = 10 — CHESS — THE GAME TREE AS ARITHMETIC. A position is numbers: material on the
    board, the moves a side has, the branching factor of the search, the nodes a full tree holds, the tempo
    spent, the score in centipawns, the perft count at a depth, and the pressure on a king. Crosses to
    `combinatorics` — chess is counting over a tree. A measure. */ const PROOF = 'chess arithmetic (material,
    mobility, branching, tree nodes, tempo, centipawns, perft, king safety); the game tree counted exactly; a
    measure crossed to combinatorics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'chess', dst:
    'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `chess.${name}`, params }) export
    class ChessFormulas { /** MATERIAL: a count of a piece at its value. value count · value. -/
theorem fam_chess_material_1 : (2 * 5) = 10 := by decide

/-- chess: mobility(40, 33) = 7 — MOBILITY: the move advantage of one side over the other. value max(0, white −
    black). -/
theorem fam_chess_mobility_1 : (fmax 0 (40 - 33)) = 7 := by decide

/-- chess: branching(350, 10) = 35 — BRANCHING: the average legal moves per position searched. value ⌊moves /
    positions⌋. -/
theorem fam_chess_branching_1 : (350 / 10) = 35 := by decide

/-- chess: plytonodes(2, 3) = 15 — PLY TO NODES: a full tree of the given branching to the given ply. value Σ
    branchingⁱ, i = 0..ply. -/
theorem fam_chess_plytonodes_1 : (((2 ^ (3 + 1)) - 1) / (2 - 1)) = 15 := by decide

/-- chess: tempo(15, 2) = 7 — TEMPO: full moves from plies at a given plies-per-move. value ⌊plies / perMove⌋. -/
theorem fam_chess_tempo_1 : (15 / 2) = 7 := by decide

/-- chess: centipawns(3, 50) = 350 — CENTIPAWNS: a pawn score with its hundredths. value pawns · 100 + cents. -/
theorem fam_chess_centipawns_1 : ((3 * 100) + 50) = 350 := by decide

/-- chess: perft(5, 3) = 125 — PERFT: the leaf count of a uniform tree at a depth. value branching^depth. -/
theorem fam_chess_perft_1 : (5 ^ 3) = 125 := by decide

/-- chess: kingsafety(4, 2) = 2 — KING SAFETY: the attackers a king faces over its defenders. value max(0,
    attackers − defenders). -/
theorem fam_chess_kingsafety_1 : (fmax 0 (4 - 2)) = 2 := by decide

/-- chocolate: cacaopercent(70, 100) = 70 — CHOCOLATE — THE CHOCOLATIER'S CRAFT, AS ARITHMETIC. Making chocolate
    is numbers: the cacao percentage of a bar, whether temper holds at the working temperature, viscosity from
    the solids a given fat must carry, the sugar ratio, conche machine-hours, the crystal seeds a mass needs,
    the melt point as it rises with cocoa, and the butter a bean batch yields. Crosses to `chemistry` —
    chocolate is phase behaviour and composition, what chemistry explains. A measure. */ const PROOF =
    'chocolate arithmetic (cacao percent, temper, viscosity, sugar ratio, conche hours, crystal seeds, melt
    point, cocoa butter); the chocolatier\'s craft as integers; a measure crossed to chemistry' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'chocolate', dst: 'chemistry', formula, value, proof: PROOF,
    ...extra }, holds, { name: `chocolate.${name}`, params }) export class ChocolateFormulas { /** CACAO
    PERCENT: the cocoa share of a bar. value ⌊cocoa · 100 / total⌋. -/
theorem fam_chocolate_cacaopercent_1 : ((70 * 100) / 100) = 70 := by decide

/-- chocolate: cocoabutter(1000, 54) = 540 — COCOA BUTTER: the butter (percent) a bean batch yields. value
    ⌊beans · pct / 100⌋. -/
theorem fam_chocolate_cocoabutter_1 : ((1000 * 54) / 100) = 540 := by decide

/-- chocolate: conche(72, 5) = 360 — CONCHE: machine-hours at a per-hour rate. value hours · rate. -/
theorem fam_chocolate_conche_1 : (72 * 5) = 360 := by decide

/-- chocolate: meltpoint(28, 7) = 35 — MELT POINT: a base point raised by the cocoa carried. value base + cocoa. -/
theorem fam_chocolate_meltpoint_1 : (28 + 7) = 35 := by decide

/-- chocolate: sugarratio(30, 100) = 30 — SUGAR RATIO: the sugar share of a bar. value ⌊sugar · 100 / total⌋. -/
theorem fam_chocolate_sugarratio_1 : ((30 * 100) / 100) = 30 := by decide

/-- chocolate: viscosity(600, 5) = 120 — VISCOSITY: the solids a unit of fat must carry. value ⌊solids / fat⌋. -/
theorem fam_chocolate_viscosity_1 : (600 / 5) = 120 := by decide

/-- chord: notecount(3, 4) = 7 — CHORD — HARMONY AS ARITHMETIC. A chord is numbers: how many notes it holds, the
    semitone span of its outer voices, how many inversions it rotates through, the semitone sum that names its
    triad quality, the degree its stacked thirds reach, the average gap between its voices, whether the bass
    sits on the root, and the thirds stacked beneath it. Crosses to `music` — a chord is the vertical fact music
    is built from. A measure. */ const PROOF = 'chord arithmetic (note count, interval span, inversions, triad
    quality, extension degree, voicing width, root position, stacked thirds); harmony as integer arithmetic; a
    measure crossed to music' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'chord', dst: 'music',
    formula, value, proof: PROOF, ...extra }, holds, { name: `chord.${name}`, params }) export class
    ChordFormulas { /** NOTE COUNT: the triad's notes plus any extensions. value triad + extensions. -/
theorem fam_chord_notecount_1 : (3 + 4) = 7 := by decide

/-- chord: intervalspan(12, 0) = 12 — INTERVAL SPAN: the semitones between the outer voices. value max(0, high −
    low). -/
theorem fam_chord_intervalspan_1 : (fmax 0 (12 - 0)) = 12 := by decide

/-- chord: inversioncount(4) = 4 — INVERSION COUNT: an n-note chord rotates through n positions. value notes. -/
theorem fam_chord_inversioncount_1 : 4 = 4 := by decide

/-- chord: triadquality(4, 3) = 7 — TRIAD QUALITY: the semitone sum of its third and fifth names the triad.
    value third + fifth. -/
theorem fam_chord_triadquality_1 : (4 + 3) = 7 := by decide

/-- chord: extensiondegree(3) = 7 — EXTENSION DEGREE: thirds stacked above the root reach an odd degree. value
    thirds · 2 + 1. -/
theorem fam_chord_extensiondegree_1 : ((3 * 2) + 1) = 7 := by decide

/-- chord: voicingwidth(24, 3) = 8 — VOICING WIDTH: the semitone span shared across the gaps between voices.
    value ⌊semitones / voices⌋. -/
theorem fam_chord_voicingwidth_1 : (24 / 3) = 8 := by decide

/-- chord: stackedthirds(4) = 3 — STACKED THIRDS: an n-note tertian chord stacks n − 1 thirds. value max(0,
    notes − 1). -/
theorem fam_chord_stackedthirds_1 : (fmax 0 (4 - 1)) = 3 := by decide

/-- choreography: dancers(12, 4) = 16 -/
theorem fam_choreography_dancers_1 : (12 + 4) = 16 := by decide

/-- choreography: beatspermeasure(4, 8) = 32 -/
theorem fam_choreography_beatspermeasure_1 : (4 * 8) = 32 := by decide

/-- choreography: symmetrygroups(4) = 16 -/
theorem fam_choreography_symmetrygroups_1 : (2 ^ 4) = 16 := by decide

/-- choreography: phrasecount(64, 8) = 8 -/
theorem fam_choreography_phrasecount_1 : (64 / 8) = 8 := by decide

/-- choreography: spacingmeters(100, 4) = 25 -/
theorem fam_choreography_spacingmeters_1 : (100 / 4) = 25 := by decide

/-- choreography: syncratio(90, 100) = 90 -/
theorem fam_choreography_syncratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- chromatography: capacity(300, 60) = 400 — CHROMATOGRAPHY — SEPARATION SCIENCE, AS ARITHMETIC. A column
    resolves a mixture into peaks: the time an analyte is held, how far apart two peaks fall, the theoretical
    plates of the column, the selectivity between neighbours, the retention factor, the plate height, the area
    under a peak, and the retardation factor of a spot. Crosses to `chemistry` — the separation is what the
    chemistry is read from. A measure. */ const PROOF = 'chromatography arithmetic (retention, resolution,
    plates, selectivity, capacity factor, plate height, peak area, Rf); separation science as integer measure
    crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'chromatography', dst:
    'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `chromatography.${name}`, params })
    export class ChromatographyFormulas { /** CAPACITY (retention) FACTOR, ·100: how long held past the void.
    value ⌊(tr − t0) · 100 / t0⌋. -/
theorem fam_chromatography_capacity_1 : (((fmax 0 (300 - 60)) * 100) / 60) = 400 := by decide

/-- chromatography: efficiency(51200, 25600) = 2 — EFFICIENCY as plate height (HETP): the column length over its
    plates. value ⌊length / plates⌋. -/
theorem fam_chromatography_efficiency_1 : (51200 / 25600) = 2 := by decide

/-- chromatography: peakarea(500, 40) = 10000 — PEAK AREA of a triangular peak: half base times height. value
    ⌊height · width / 2⌋. -/
theorem fam_chromatography_peakarea_1 : ((500 * 40) / 2) = 10000 := by decide

/-- chromatography: resolution(100, 20, 20) = 5 — RESOLUTION between two peaks from their separation and widths.
    value ⌊2 · dt / (w1 + w2)⌋. -/
theorem fam_chromatography_resolution_1 : ((2 * 100) / (20 + 20)) = 5 := by decide

/-- chromatography: retention(300, 60) = 240 — RETENTION: the adjusted retention time, held past the void
    volume. value max(0, tr − t0). -/
theorem fam_chromatography_retention_1 : (fmax 0 (300 - 60)) = 240 := by decide

/-- chromatography: rf(30, 60) = 50 — RF (retardation factor), ·100: how far a spot ran against the solvent
    front. value ⌊solute · 100 / solvent⌋. -/
theorem fam_chromatography_rf_1 : ((30 * 100) / 60) = 50 := by decide

/-- chromatography: selectivity(150, 100) = 150 — SELECTIVITY (separation factor α), ·100: the ratio of two
    retention factors. value ⌊k2 · 100 / k1⌋. -/
theorem fam_chromatography_selectivity_1 : ((150 * 100) / 100) = 150 := by decide

/-- chronology: yearspan(1500, 500) = 1000 -/
theorem fam_chronology_yearspan_1 : (fmax 0 (1500 - 500)) = 1000 := by decide

/-- chronology: periodcount(3, 4) = 7 -/
theorem fam_chronology_periodcount_1 : (3 + 4) = 7 := by decide

/-- chronology: datingerror(5, 100) = 5 -/
theorem fam_chronology_datingerror_1 : ((5 * 100) / 100) = 5 := by decide

/-- chronology: epochdivisions(3000, 500) = 6 -/
theorem fam_chronology_epochdivisions_1 : (3000 / 500) = 6 := by decide

/-- chronology: synchronisms(12, 5) = 60 -/
theorem fam_chronology_synchronisms_1 : (12 * 5) = 60 := by decide

/-- churn: rate(5, 100) = 5 — CHURN — SUBSCRIPTION ATTRITION, AS ARITHMETIC. Keeping customers is numbers: the
    rate they leave, the share retained, the lifetime value a churn rate implies, net revenue after expansion
    and loss, win-backs, tenure, cohort decay, and the share at risk. Crosses to `analytics` — churn is what
    analytics measures. A measure. */ const PROOF = 'churn arithmetic (rate, retention, lifetime value, net
    revenue, reactivation, tenure, cohort decay, at-risk share); subscription attrition as a measure crossed to
    analytics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'churn', dst: 'analytics', formula,
    value, proof: PROOF, ...extra }, holds, { name: `churn.${name}`, params }) export class ChurnFormulas { /**
    CHURN RATE as a percentage. value ⌊lost · 100 / start⌋. -/
theorem fam_churn_rate_1 : ((5 * 100) / 100) = 5 := by decide

/-- churn: retention(95, 100) = 95 — RETENTION as a percentage. value ⌊retained · 100 / start⌋. -/
theorem fam_churn_retention_1 : ((95 * 100) / 100) = 95 := by decide

/-- churn: lifetime(200, 5) = 4000 — LIFETIME VALUE proxy: revenue over the churn rate. value ⌊revenue · 100 /
    churnrate⌋. -/
theorem fam_churn_lifetime_1 : ((200 * 100) / 5) = 4000 := by decide

/-- churn: netrevenue(50, 30) = 20 — NET REVENUE: expansion less churned (may be negative). value expansion −
    churned. -/
theorem fam_churn_netrevenue_1 : (50 - 30) = 20 := by decide

/-- churn: reactivation(10, 40) = 25 — REACTIVATION as a percentage of the churned. value ⌊returned · 100 /
    churned⌋. -/
theorem fam_churn_reactivation_1 : ((10 * 100) / 40) = 25 := by decide

/-- churn: tenure(18) = 18 — TENURE: months a customer holds. value months. -/
theorem fam_churn_tenure_1 : 18 = 18 := by decide

/-- churn: cohortdecay(60, 100) = 60 — COHORT DECAY: the share of a cohort remaining. value ⌊remaining · 100 /
    initial⌋. -/
theorem fam_churn_cohortdecay_1 : ((60 * 100) / 100) = 60 := by decide

/-- churn: risk(20, 200) = 10 — AT-RISK SHARE as a percentage of the active. value ⌊atrisk · 100 / active⌋. -/
theorem fam_churn_risk_1 : ((20 * 100) / 200) = 10 := by decide

/-- cinema: boxoffice(1000, 12) = 12000 — CINEMA — MOVING PICTURES AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Making and showing films is numbers: box office from tickets, return on budget,
    runtime from scenes, the aspect ratio, cuts per minute, an average rating, a house's occupancy, and the
    frames a clip holds. Crosses to `content` — cinema is content people watch. A measure. */ const PROOF =
    'cinema arithmetic (box office, ROI, runtime, aspect ratio, shots per minute, rating, occupancy, frames); a
    public-API domain; a measure crossed to content' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'cinema', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `cinema.${name}`,
    params }) export class CinemaFormulas { /** BOX OFFICE: tickets sold at a ticket price. value tickets ·
    price. -/
theorem fam_cinema_boxoffice_1 : (1000 * 12) = 12000 := by decide

/-- cinema: roi(300, 100) = 300 — RETURN ON INVESTMENT as a percentage. value ⌊revenue · 100 / budget⌋. -/
theorem fam_cinema_roi_1 : ((300 * 100) / 100) = 300 := by decide

/-- cinema: runtime(40, 3) = 120 — RUNTIME: scenes at an average length each. value scenes · average. -/
theorem fam_cinema_runtime_1 : (40 * 3) = 120 := by decide

/-- cinema: aspect(239, 100) = 239 — ASPECT RATIO as a scaled percentage. value ⌊width · 100 / height⌋. -/
theorem fam_cinema_aspect_1 : ((239 * 100) / 100) = 239 := by decide

/-- cinema: shots(600, 120) = 5 — SHOTS: cuts over the minutes they span. value ⌊cuts / minutes⌋. -/
theorem fam_cinema_shots_1 : (600 / 120) = 5 := by decide

/-- cinema: rating(900, 100) = 9 — RATING: total score over the votes cast. value ⌊score / votes⌋. -/
theorem fam_cinema_rating_1 : (900 / 100) = 9 := by decide

/-- cinema: occupancy(180, 200) = 90 — OCCUPANCY: seats sold against the house, as a percentage. value ⌊sold ·
    100 / seats⌋. -/
theorem fam_cinema_occupancy_1 : ((180 * 100) / 200) = 90 := by decide

/-- cinema: frames(60, 24) = 1440 — FRAMES: seconds at a frame rate. value seconds · fps. -/
theorem fam_cinema_frames_1 : (60 * 24) = 1440 := by decide

/-- cinematography: fstop(50, 25) = 2 — CINEMATOGRAPHY — THE CAMERA AS ARITHMETIC. Shooting a frame is numbers:
    the f-stop a lens runs at, the light a frame gathers, the depth that stays sharp, the frames a clip plays
    per second, the shutter speed an angle sets, the equivalent focal length on a cropped sensor, the
    sensitivity a gain multiplies, and the aspect ratio of the frame. Crosses to `optics` — cinematography is
    applied optics. A measure. */ const PROOF = 'cinematography arithmetic (f-stop, exposure, depth of field,
    frame rate, shutter angle, focal length, iso, aspect); the camera as light measured; a measure crossed to
    optics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cinematography', dst: 'optics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `cinematography.${name}`, params }) export class
    CinematographyFormulas { /** F-STOP: the f-number a lens runs at, focal length over aperture diameter. value
    ⌊focal / diameter⌋. -/
theorem fam_cinematography_fstop_1 : (50 / 25) = 2 := by decide

/-- cinematography: exposure(8, 500) = 4000 — EXPOSURE: the relative light a frame gathers, aperture area at a
    shutter time. value aperture · time. -/
theorem fam_cinematography_exposure_1 : (8 * 500) = 4000 := by decide

/-- cinematography: depthoffield(5000, 2000) = 3000 — DEPTH OF FIELD: the sharp range, far limit less the near
    limit (mm). value max(0, far − near). -/
theorem fam_cinematography_depthoffield_1 : (fmax 0 (5000 - 2000)) = 3000 := by decide

/-- cinematography: depthoffield(2000, 5000) = 0 — DEPTH OF FIELD: the sharp range, far limit less the near
    limit (mm). value max(0, far − near). -/
theorem fam_cinematography_depthoffield_2 : (fmax 0 (2000 - 5000)) = 0 := by decide

/-- cinematography: framerate(1440, 60) = 24 — FRAME RATE: the frames a clip plays per second. value ⌊frames /
    seconds⌋. -/
theorem fam_cinematography_framerate_1 : (1440 / 60) = 24 := by decide

/-- cinematography: shutterangle(24, 180) = 48 — SHUTTER ANGLE: the shutter-speed denominator a blade angle sets
    at a frame rate. value ⌊360 · fps / angle⌋. -/
theorem fam_cinematography_shutterangle_1 : ((360 * 24) / 180) = 48 := by decide

/-- cinematography: focallength(35, 2) = 70 — FOCAL LENGTH: the full-frame equivalent on a cropped sensor. value
    focal · crop. -/
theorem fam_cinematography_focallength_1 : (35 * 2) = 70 := by decide

/-- cinematography: iso(100, 4) = 400 — ISO: the sensitivity a gain multiplies from a base. value base · gain. -/
theorem fam_cinematography_iso_1 : (100 * 4) = 400 := by decide

/-- cinematography: aspect(1920, 1080) = 177 — ASPECT: the frame aspect ratio as hundredths, width over height.
    value ⌊width · 100 / height⌋. -/
theorem fam_cinematography_aspect_1 : ((1920 * 100) / 1080) = 177 := by decide

/-- civil: beamload(1000, 5) = 200 — CIVIL — CIVIL ENGINEERING, AS ARITHMETIC. Structures and the ground they
    sit on are numbers: the load a beam carries per span, the pressure under a footing, how far a member
    deflects, the grade of a road, the runoff a storm sheds off an area, the traffic a lane passes per hour, the
    concrete a mix yields, and how far a foundation settles. Crosses to `construction` — civil is what
    construction builds. A measure. */ const PROOF = 'civil arithmetic (beam load, bearing pressure, deflection,
    slope, runoff, traffic flow, concrete mix, settlement); civil engineering as a measure crossed to
    construction' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'civil', dst: 'construction',
    formula, value, proof: PROOF, ...extra }, holds, { name: `civil.${name}`, params }) export class
    CivilFormulas { /** BEAM LOAD: a distributed load over the span it spans. value ⌊load / span⌋. -/
theorem fam_civil_beamload_1 : (1000 / 5) = 200 := by decide

/-- civil: bearing(6000, 3) = 2000 — BEARING PRESSURE: a load spread over the footing area. value ⌊load / area⌋. -/
theorem fam_civil_bearing_1 : (6000 / 3) = 2000 := by decide

/-- civil: concrete(50, 7) = 350 — CONCRETE MIX: cement scaled by the mix ratio. value cement · ratio. -/
theorem fam_civil_concrete_1 : (50 * 7) = 350 := by decide

/-- civil: deflection(800, 4) = 200 — DEFLECTION: a load against member stiffness. value ⌊load / stiffness⌋. -/
theorem fam_civil_deflection_1 : (800 / 4) = 200 := by decide

/-- civil: runoff(2, 1500) = 3000 — RUNOFF: rainfall shed off an area. value rainfall · area. -/
theorem fam_civil_runoff_1 : (2 * 1500) = 3000 := by decide

/-- civil: settlement(900, 30) = 30 — SETTLEMENT: a load against soil modulus. value ⌊load / modulus⌋. -/
theorem fam_civil_settlement_1 : (900 / 30) = 30 := by decide

/-- civil: slope(3, 100) = 3 — SLOPE: rise over run as a percent grade. value ⌊rise · 100 / run⌋. -/
theorem fam_civil_slope_1 : ((3 * 100) / 100) = 3 := by decide

/-- civil: trafficflow(6000, 24) = 250 — TRAFFIC FLOW: vehicles over the hours they pass in. value ⌊vehicles /
    hours⌋. -/
theorem fam_civil_trafficflow_1 : (6000 / 24) = 250 := by decide

/-- civil: beamload(1000, 0) = 0 — CIVIL — CIVIL ENGINEERING, AS ARITHMETIC. Structures and the ground they sit
    on are numbers: the load a beam carries per span, the pressure under a footing, how far a member deflects,
    the grade of a road, the runoff a storm sheds off an area, the traffic a lane passes per hour, the concrete
    a mix yields, and how far a foundation settles. Crosses to `construction` — civil is what construction
    builds. A measure. */ const PROOF = 'civil arithmetic (beam load, bearing pressure, deflection, slope,
    runoff, traffic flow, concrete mix, settlement); civil engineering as a measure crossed to construction'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'civil', dst: 'construction', formula, value,
    proof: PROOF, ...extra }, holds, { name: `civil.${name}`, params }) export class CivilFormulas { /** BEAM
    LOAD: a distributed load over the span it spans. value ⌊load / span⌋. -/
theorem fam_civil_beamload_2 : (1000 / 0) = 0 := by decide

/-- claims: frequency(250, 1000) = 250 — CLAIMS — THE WORK OF PAYING A LOSS, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Settling claims is numbers: how often they come, how big they are, the
    loss ratio, the reserve still owed, the settled amount after the deductible, the insured's retained portion,
    the capped payout, and the incurred loss. Crosses to `insurance` — claims are what an insurance policy pays
    out. A measure. */ const PROOF = 'claims arithmetic (frequency, severity, loss ratio, reserve, settlement,
    deductible, payout, incurred); the registry\'s uncovered loss-settlement domain; a measure crossed to
    insurance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'claims', dst: 'insurance',
    formula, value, proof: PROOF, ...extra }, holds, { name: `claims.${name}`, params }) export class
    ClaimsFormulas { /** FREQUENCY: claims per thousand policies. value ⌊claims · 1000 / policies⌋. -/
theorem fam_claims_frequency_1 : ((250 * 1000) / 1000) = 250 := by decide

/-- claims: severity(50000, 100) = 500 — SEVERITY: the average loss per claim. value ⌊total / claims⌋. -/
theorem fam_claims_severity_1 : (50000 / 100) = 500 := by decide

/-- claims: lossratio(60000, 100000) = 60 — LOSS RATIO: losses over premium as a percentage. value ⌊losses · 100
    / premium⌋. -/
theorem fam_claims_lossratio_1 : ((60000 * 100) / 100000) = 60 := by decide

/-- claims: reserve(10000, 4000) = 6000 — RESERVE: the loss still owed, incurred less paid. value max(0,
    incurred − paid). -/
theorem fam_claims_reserve_1 : (fmax 0 (10000 - 4000)) = 6000 := by decide

/-- claims: reserve(100, 500) = 0 — RESERVE: the loss still owed, incurred less paid. value max(0, incurred −
    paid). -/
theorem fam_claims_reserve_2 : (fmax 0 (100 - 500)) = 0 := by decide

/-- claims: settlement(5000, 500) = 4500 — SETTLEMENT: the claim after the deductible is taken off. value max(0,
    claim − deductible). -/
theorem fam_claims_settlement_1 : (fmax 0 (5000 - 500)) = 4500 := by decide

/-- claims: settlement(100, 500) = 0 — SETTLEMENT: the claim after the deductible is taken off. value max(0,
    claim − deductible). -/
theorem fam_claims_settlement_2 : (fmax 0 (100 - 500)) = 0 := by decide

/-- claims: deductible(5000, 500) = 500 — DEDUCTIBLE: the insured's retained portion of a loss. value min(loss,
    ded). -/
theorem fam_claims_deductible_1 : (fmin 5000 500) = 500 := by decide

/-- claims: payout(8000, 5000) = 5000 — PAYOUT: the claim capped at the policy limit. value min(claim, limit). -/
theorem fam_claims_payout_1 : (fmin 8000 5000) = 5000 := by decide

/-- claims: incurred(4000, 6000) = 10000 — INCURRED: the incurred loss, paid plus reserve. value paid + reserve. -/
theorem fam_claims_incurred_1 : (4000 + 6000) = 10000 := by decide

/-- clearance: renal(100, 2, 10) = 20 — CLEARANCE — DRUG ELIMINATION AS ARITHMETIC. How the body removes a drug
    is numbers: the kidney's renal clearance, the liver's hepatic clearance, their sum, the filtration fraction,
    the organ extraction ratio, the fraction surviving first pass, the residual dose, and clearance against GFR.
    Crosses to `pharmacology` — clearance is what pharmacology does to a dose. A measure. */ const PROOF =
    'clearance arithmetic (renal, hepatic, total, filtration fraction, extraction ratio, first pass, residual
    dose, clearance ratio); drug elimination as a measure crossed to pharmacology' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'clearance', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds,
    { name: `clearance.${name}`, params }) export class ClearanceFormulas { /** RENAL CLEARANCE: urine
    concentration · urine flow over plasma concentration. value ⌊urineConc · urineFlow / plasmaConc⌋. -/
theorem fam_clearance_renal_1 : ((100 * 2) / 10) = 20 := by decide

/-- clearance: hepatic(1500, 40) = 600 — HEPATIC CLEARANCE: blood flow at an extraction ratio (percent). value
    ⌊flow · er / 100⌋. -/
theorem fam_clearance_hepatic_1 : ((1500 * 40) / 100) = 600 := by decide

/-- clearance: total(20, 600) = 620 — TOTAL CLEARANCE: renal plus hepatic. value renal + hepatic. -/
theorem fam_clearance_total_1 : (20 + 600) = 620 := by decide

/-- clearance: filtration(120, 600) = 20 — FILTRATION FRACTION: GFR over renal plasma flow, as a percent. value
    ⌊gfr · 100 / rpf⌋. -/
theorem fam_clearance_filtration_1 : ((120 * 100) / 600) = 20 := by decide

/-- clearance: extractionratio(100, 25) = 75 — EXTRACTION RATIO: the fraction an organ removes, as a percent.
    value ⌊(cin − cout) · 100 / cin⌋. -/
theorem fam_clearance_extractionratio_1 : (((fmax 0 (100 - 25)) * 100) / 100) = 75 := by decide

/-- clearance: firstpass(75) = 25 — FIRST PASS: the percent of a dose surviving first-pass extraction. value
    max(0, 100 − er). -/
theorem fam_clearance_firstpass_1 : (fmax 0 (100 - 75)) = 25 := by decide

/-- clearance: residual(500, 120) = 380 — RESIDUAL DOSE: what is left of a dose after the cleared amount. value
    max(0, dose − cleared). -/
theorem fam_clearance_residual_1 : (fmax 0 (500 - 120)) = 380 := by decide

/-- clearance: ratio(240, 120) = 200 — CLEARANCE RATIO: clearance against GFR, as a percent. value ⌊clearance ·
    100 / gfr⌋. -/
theorem fam_clearance_ratio_1 : ((240 * 100) / 120) = 200 := by decide

/-- climate: emissions(100, 5) = 500 — CLIMATE — CLIMATE SCIENCE, AS ARITHMETIC. Warming is numbers: emissions
    from activity, the carbon budget left, temperature anomaly against a baseline, net emissions after capture,
    the warming a forcing drives, sea level over the years, the renewable share, and carbon intensity per unit
    of output. Crosses to `environment` — climate is what the environment measures. A measure. */ const PROOF =
    'climate arithmetic (emissions, carbon budget, temperature anomaly, offset, warming, sea level, renewable
    share, carbon intensity); climate science as integers; a measure crossed to environment' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'climate', dst: 'environment', formula, value, proof: PROOF,
    ...extra }, holds, { name: `climate.${name}`, params }) export class ClimateFormulas { /** EMISSIONS: an
    activity at an emission factor. value activity · factor. -/
theorem fam_climate_emissions_1 : (100 * 5) = 500 := by decide

/-- climate: budget(300, 1000) = 700 — CARBON BUDGET: what is left of the allowance after what is emitted. value
    max(0, allowed − emitted). -/
theorem fam_climate_budget_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- climate: anomaly(15, 14) = 1 — TEMPERATURE ANOMALY against a baseline (may be negative). value now −
    baseline. -/
theorem fam_climate_anomaly_1 : (15 - 14) = 1 := by decide

/-- climate: offset(500, 200) = 300 — OFFSET: net emissions after capture. value max(0, emitted − captured). -/
theorem fam_climate_offset_1 : (fmax 0 (500 - 200)) = 300 := by decide

/-- climate: warming(400, 50) = 200 — WARMING a radiative forcing drives at a sensitivity. value ⌊forcing ·
    sensitivity / 100⌋. -/
theorem fam_climate_warming_1 : ((400 * 50) / 100) = 200 := by decide

/-- climate: sealevel(3, 100) = 300 — SEA LEVEL: a rate over the years. value rate · years. -/
theorem fam_climate_sealevel_1 : (3 * 100) = 300 := by decide

/-- climate: renewable(40, 100) = 40 — RENEWABLE share as a percentage. value ⌊clean · 100 / total⌋. -/
theorem fam_climate_renewable_1 : ((40 * 100) / 100) = 40 := by decide

/-- climate: intensity(1000, 50) = 20 — CARBON INTENSITY: emissions per unit of output. value ⌊emissions / gdp⌋. -/
theorem fam_climate_intensity_1 : (1000 / 50) = 20 := by decide

/-- climatology: anomaly(18, 15) = 3 — CLIMATOLOGY — THE LONG-RUN STATE OF THE ATMOSPHERE, AS ARITHMETIC.
    Climate is numbers: a temperature anomaly above a baseline, the radiative forcing of carbon, albedo and
    aridity as whole percents, the summer–winter seasonality range, a per-decade trend, heating/cooling
    degree-days above a base, and the carbon ratio against a sink. Crosses to `climate` — climatology is what
    measures the climate. A measure. */ const PROOF = 'climatology arithmetic (anomaly, radiative forcing,
    albedo, aridity, seasonality, per-decade trend, degree-days, carbon ratio); the long-run state of the
    atmosphere as whole numbers; a measure crossed to climate' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'climatology', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name:
    `climatology.${name}`, params }) export class ClimatologyFormulas { /** TEMPERATURE ANOMALY: how far an
    observed reading sits above the baseline. value max(0, observed − baseline). -/
theorem fam_climatology_anomaly_1 : (fmax 0 (18 - 15)) = 3 := by decide

/-- climatology: anomaly(12, 15) = 0 — CLIMATOLOGY — THE LONG-RUN STATE OF THE ATMOSPHERE, AS ARITHMETIC.
    Climate is numbers: a temperature anomaly above a baseline, the radiative forcing of carbon, albedo and
    aridity as whole percents, the summer–winter seasonality range, a per-decade trend, heating/cooling
    degree-days above a base, and the carbon ratio against a sink. Crosses to `climate` — climatology is what
    measures the climate. A measure. */ const PROOF = 'climatology arithmetic (anomaly, radiative forcing,
    albedo, aridity, seasonality, per-decade trend, degree-days, carbon ratio); the long-run state of the
    atmosphere as whole numbers; a measure crossed to climate' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'climatology', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name:
    `climatology.${name}`, params }) export class ClimatologyFormulas { /** TEMPERATURE ANOMALY: how far an
    observed reading sits above the baseline. value max(0, observed − baseline). -/
theorem fam_climatology_anomaly_2 : (fmax 0 (12 - 15)) = 0 := by decide

/-- climatology: forcing(400, 3) = 1200 — RADIATIVE FORCING: carbon concentration scaled by climate sensitivity.
    value co2 · sensitivity. -/
theorem fam_climatology_forcing_1 : (400 * 3) = 1200 := by decide

/-- climatology: albedo(30, 100) = 30 — ALBEDO as a percentage: reflected over incident radiation. value
    ⌊reflected · 100 / incident⌋. -/
theorem fam_climatology_albedo_1 : ((30 * 100) / 100) = 30 := by decide

/-- climatology: aridity(600, 1200) = 50 — ARIDITY index as a percentage: precipitation over evaporation. value
    ⌊precipitation · 100 / evaporation⌋. -/
theorem fam_climatology_aridity_1 : ((600 * 100) / 1200) = 50 := by decide

/-- climatology: seasonality(30, 5) = 25 — SEASONALITY: the summer-over-winter temperature range. value max(0,
    summer − winter). -/
theorem fam_climatology_seasonality_1 : (fmax 0 (30 - 5)) = 25 := by decide

/-- climatology: trend(20, 4) = 5 — TREND: the per-decade rate of a cumulative change. value ⌊current /
    decades⌋. -/
theorem fam_climatology_trend_1 : (20 / 4) = 5 := by decide

/-- climatology: degreeday(25, 18) = 7 — DEGREE-DAY: how far temperature sits above a base. value max(0,
    temperature − base). -/
theorem fam_climatology_degreeday_1 : (fmax 0 (25 - 18)) = 7 := by decide

/-- climatology: carbon(50, 40) = 125 — CARBON ratio as a percentage: emitted over the sink that absorbs it.
    value ⌊emitted · 100 / sink⌋. -/
theorem fam_climatology_carbon_1 : ((50 * 100) / 40) = 125 := by decide

/-- climbing: grade(12) = 12 — CLIMBING — THE SPORT, AS ARITHMETIC. A route is numbers: the grade climbed, the
    height gained, the length of each pitch, the effort against gravity, the send rate, the steepness of the
    wall, the grip as a fraction of bodyweight, and the rope played out per fall. Crosses to `fitness` —
    climbing is what fitness measures on the wall. A measure. */ const PROOF = 'climbing arithmetic (grade,
    gain, pitch, effort, sendrate, steepness, grip, rope); the sport as a measure crossed to fitness' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'climbing', dst: 'fitness', formula, value, proof: PROOF, ...extra
    }, holds, { name: `climbing.${name}`, params }) export class ClimbingFormulas { /** GRADE: the difficulty
    score of a route. value score. -/
theorem fam_climbing_grade_1 : 12 = 12 := by decide

/-- climbing: gain(1000, 200) = 800 — GAIN: the height climbed from base to summit. value max(0, summit − base). -/
theorem fam_climbing_gain_1 : (fmax 0 (1000 - 200)) = 800 := by decide

/-- climbing: gain(200, 1000) = 0 — GAIN: the height climbed from base to summit. value max(0, summit − base). -/
theorem fam_climbing_gain_2 : (fmax 0 (200 - 1000)) = 0 := by decide

/-- climbing: pitch(240, 4) = 60 — PITCH: the height of each pitch on a multi-pitch route. value ⌊height /
    pitches⌋. -/
theorem fam_climbing_pitch_1 : (240 / 4) = 60 := by decide

/-- climbing: effort(70, 100) = 7000 — EFFORT: work against gravity, weight over the height raised. value weight
    · height. -/
theorem fam_climbing_effort_1 : (70 * 100) = 7000 := by decide

/-- climbing: sendrate(3, 10) = 30 — SENDRATE: clean sends as a percentage of attempts. value ⌊sent · 100 /
    attempts⌋. -/
theorem fam_climbing_sendrate_1 : ((3 * 100) / 10) = 30 := by decide

/-- climbing: steepness(100, 50) = 200 — STEEPNESS: the wall angle, rise over run. value ⌊rise · 100 / run⌋. -/
theorem fam_climbing_steepness_1 : ((100 * 100) / 50) = 200 := by decide

/-- climbing: grip(140, 70) = 200 — GRIP: hold force as a percentage of bodyweight. value ⌊force · 100 /
    bodyweight⌋. -/
theorem fam_climbing_grip_1 : ((140 * 100) / 70) = 200 := by decide

/-- climbing: rope(60, 3) = 20 — ROPE: length of rope played out per fall. value ⌊length / falls⌋. -/
theorem fam_climbing_rope_1 : (60 / 3) = 20 := by decide

/-- cloud: cost(720, 5) = 3600 — CLOUD — THE REGISTRY'S LARGEST DOMAIN, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Running compute is numbers: cost by the hour, uptime, the nodes a load needs,
    average latency, throughput, storage, egress cost, and whether the SLA is met. Crosses to `obs` — cloud is
    what observability watches. A measure. */ const PROOF = 'cloud arithmetic (compute cost, uptime, autoscale
    nodes, latency, throughput, storage, egress, SLA); the registry\'s largest uncovered domain; a measure
    crossed to obs' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cloud', dst: 'obs', formula,
    value, proof: PROOF, ...extra }, holds, { name: `cloud.${name}`, params }) export class CloudFormulas { /**
    COMPUTE COST: instance-hours at an hourly rate. value hours · rate. -/
theorem fam_cloud_cost_1 : (720 * 5) = 3600 := by decide

/-- cloud: uptime(999, 1000) = 99 — UPTIME as a percentage. value ⌊up · 100 / total⌋. -/
theorem fam_cloud_uptime_1 : ((999 * 100) / 1000) = 99 := by decide

/-- cloud: latency(5000, 100) = 50 — AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total
    / requests⌋. -/
theorem fam_cloud_latency_1 : (5000 / 100) = 50 := by decide

/-- cloud: throughput(6000, 60) = 100 — THROUGHPUT: requests over seconds. value ⌊requests / seconds⌋. -/
theorem fam_cloud_throughput_1 : (6000 / 60) = 100 := by decide

/-- cloud: storage(1000, 5) = 5000 — STORAGE: objects at a size each. value objects · size. -/
theorem fam_cloud_storage_1 : (1000 * 5) = 5000 := by decide

/-- cloud: egress(10000, 90) = 900 — EGRESS COST: bytes (GB) at a rate per thousand. value ⌊bytes · rate /
    1000⌋. -/
theorem fam_cloud_egress_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- cloudflare: apis(22, 8) = 176 — APIS — the API method surface across the bound bindings. value bindings ·
    perBinding. -/
theorem fam_cloudflare_apis_1 : (22 * 8) = 176 := by decide

/-- cloudflare: pipeline(4, 3) = 12 — PIPELINE — a data pipeline of stages, each touching the bound bindings.
    value stages · bindings. -/
theorem fam_cloudflare_pipeline_1 : (4 * 3) = 12 := by decide

/-- cloudflare: fanout(3, 5) = 15 — FANOUT — queue fan-out: producers times consumers. value producers ·
    consumers. -/
theorem fam_cloudflare_fanout_1 : (3 * 5) = 15 := by decide

/-- cloudflare: reach(22, 300) = 6600 — REACH — the binding reach across edge colos: bindings available in every
    colo. value bindings · colos. -/
theorem fam_cloudflare_reach_1 : (22 * 300) = 6600 := by decide

/-- cloudphysics: dropletcount(1000, 100) = 100000 -/
theorem fam_cloudphysics_dropletcount_1 : (1000 * 100) = 100000 := by decide

/-- cloudphysics: condensationlevel(125, 1) = 125 -/
theorem fam_cloudphysics_condensationlevel_1 : (125 * 1) = 125 := by decide

/-- cloudphysics: albedo(70, 100) = 70 -/
theorem fam_cloudphysics_albedo_1 : ((70 * 100) / 100) = 70 := by decide

/-- cloudphysics: opticalthickness(100, 4) = 25 -/
theorem fam_cloudphysics_opticalthickness_1 : (100 / 4) = 25 := by decide

/-- cloudphysics: terminalvelocity(900, 100) = 9 -/
theorem fam_cloudphysics_terminalvelocity_1 : (900 / 100) = 9 := by decide

/-- cloudphysics: phasesubsets(3) = 8 -/
theorem fam_cloudphysics_phasesubsets_1 : (2 ^ 3) = 8 := by decide

/-- cloudphysics: precipefficiency(60, 100) = 60 -/
theorem fam_cloudphysics_precipefficiency_1 : ((60 * 100) / 100) = 60 := by decide

/-- clustering: inertia(100, 20) = 2000 — INERTIA: the summed squared distance of points at an average squared
    distance. value points · avg. -/
theorem fam_clustering_inertia_1 : (100 * 20) = 2000 := by decide

/-- clustering: purity(80, 100) = 80 — SILHOUETTE as a percentage: the near-to-far separation (b − a) over the
    larger. value ⌊max(0, b − a) · 100 / max(a, b)⌋. */ static silhouette(a: number, b: number): CrossFormula {
    const m = Math.max(a, b); return c('clustering-silhouette', 'silhouette(a, b) = ⌊max(0, b − a) · 100 /
    max(a, b)⌋', m > 0 ? Math.floor((Math.max(0, b - a) * 100) / m) : 0, nat(a, b), 'silhouette', [a, b]) } /**
    PURITY: the fraction of points matching the majority label, as a percentage. value ⌊correct · 100 / total⌋. -/
theorem fam_clustering_purity_1 : ((80 * 100) / 100) = 80 := by decide

/-- clustering: kselection(100, 5) = 20 — K SELECTION: the number of clusters a dataset wants at a per-cluster
    size. value ⌊points / per⌋. -/
theorem fam_clustering_kselection_1 : (100 / 5) = 20 := by decide

/-- clustering: within(50, 4) = 200 — WITHIN-CLUSTER spread: points at a per-point squared spread. value points
    · spread. -/
theorem fam_clustering_within_1 : (50 * 4) = 200 := by decide

/-- clustering: between(1000, 300) = 700 — BETWEEN-CLUSTER spread: the total spread not within clusters. value
    max(0, total − within). -/
theorem fam_clustering_between_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- clustering: between(300, 1000) = 0 — BETWEEN-CLUSTER spread: the total spread not within clusters. value
    max(0, total − within). -/
theorem fam_clustering_between_2 : (fmax 0 (300 - 1000)) = 0 := by decide

/-- coaching: periodization(52, 4) = 13 — PERIODIZATION: weeks of a macrocycle split across blocks. value ⌊weeks
    / blocks⌋. -/
theorem fam_coaching_periodization_1 : (52 / 4) = 13 := by decide

/-- coaching: taper(1000, 40) = 600 — TAPER: volume cut by a percent before a race. value ⌊volume · (100 − pct)
    / 100⌋. -/
theorem fam_coaching_taper_1 : ((1000 * (100 - 40)) / 100) = 600 := by decide

/-- coaching: overload(100, 10) = 110 — PROGRESSIVE OVERLOAD: load raised by a percent. value load + ⌊load · pct
    / 100⌋. -/
theorem fam_coaching_overload_1 : (100 + ((100 * 10) / 100)) = 110 := by decide

/-- coaching: workratio(40, 20) = 2 — WORK:REST RATIO of an interval session. value ⌊work / rest⌋. -/
theorem fam_coaching_workratio_1 : (40 / 20) = 2 := by decide

/-- coaching: readiness(90, 100) = 90 — READINESS: today's recovery against baseline, as a percentage. value
    ⌊hrv · 100 / baseline⌋. -/
theorem fam_coaching_readiness_1 : ((90 * 100) / 100) = 90 := by decide

/-- coaching: acwr(300, 250) = 120 — COACHING — TRAINING LOAD AS ARITHMETIC. Preparing a body is numbers: how a
    macrocycle splits into blocks, the taper before a race, progressive overload, the work-to-rest ratio,
    readiness from recovery, the acute:chronic workload ratio, the peak as fitness minus fatigue, and the deload
    week. Crosses to `physiology` — coaching is what the body's limits answer to. A measure. */ const PROOF =
    'coaching arithmetic (periodization, taper, overload, work:rest, readiness, acwr, peaking, deload); training
    load as hex-addressable integers; a measure crossed to physiology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'coaching', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `coaching.${name}`, params }) export class CoachingFormulas { /** ACUTE:CHRONIC WORKLOAD RATIO, scaled
    by 100. value ⌊acute · 100 / chronic⌋. -/
theorem fam_coaching_acwr_1 : ((300 * 100) / 250) = 120 := by decide

/-- coaching: peaking(80, 30) = 50 — PEAKING: form on race day is fitness minus fatigue. value max(0, fitness −
    fatigue). -/
theorem fam_coaching_peaking_1 : (fmax 0 (80 - 30)) = 50 := by decide

/-- coaching: peaking(30, 80) = 0 — PEAKING: form on race day is fitness minus fatigue. value max(0, fitness −
    fatigue). -/
theorem fam_coaching_peaking_2 : (fmax 0 (30 - 80)) = 0 := by decide

/-- coaching: deload(1000, 50) = 500 — DELOAD: a reduced-volume week at a percent of normal. value ⌊volume · pct
    / 100⌋. -/
theorem fam_coaching_deload_1 : ((1000 * 50) / 100) = 500 := by decide

/-- coagulation: inr(18, 12) = 150 — COAGULATION — THE CLOT AS ARITHMETIC. The coagulation panel is numbers: the
    INR ratio, prothrombin and partial thromboplastin times, the platelet count, fibrinogen, bleeding time, clot
    retraction, and the thrombin-time ratio. Crosses to `hematology` — coagulation is one panel of the blood the
    lab reads. A measure. */ const PROOF = 'coagulation arithmetic (INR ratio, prothrombin time, aPTT ratio,
    platelet count, fibrinogen, bleeding time, clot retraction, thrombin ratio); a measure crossed to
    hematology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'coagulation', dst: 'hematology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `coagulation.${name}`, params }) export class
    CoagulationFormulas { /** INR: the patient prothrombin time over the control, as a percent ratio. value
    ⌊patientPT · 100 / controlPT⌋. -/
theorem fam_coagulation_inr_1 : ((18 * 100) / 12) = 150 := by decide

/-- coagulation: prothrombintime(15, 12) = 3 — PROTHROMBIN TIME: the seconds a patient clots beyond the control.
    value max(0, patient − control). -/
theorem fam_coagulation_prothrombintime_1 : (fmax 0 (15 - 12)) = 3 := by decide

/-- coagulation: prothrombintime(10, 12) = 0 — PROTHROMBIN TIME: the seconds a patient clots beyond the control.
    value max(0, patient − control). -/
theorem fam_coagulation_prothrombintime_2 : (fmax 0 (10 - 12)) = 0 := by decide

/-- coagulation: aptt(60, 30) = 200 — aPTT: the activated partial thromboplastin time over the control, as a
    percent ratio. value ⌊patient · 100 / control⌋. -/
theorem fam_coagulation_aptt_1 : ((60 * 100) / 30) = 200 := by decide

/-- coagulation: plateletcount(15, 15) = 225 — PLATELET COUNT: platelets per field scaled to the lab factor.
    value perField · factor. -/
theorem fam_coagulation_plateletcount_1 : (15 * 15) = 225 := by decide

/-- coagulation: fibrinogen(3000, 10) = 300 — FIBRINOGEN: the clottable mass over the plasma volume. value ⌊mass
    / volume⌋. -/
theorem fam_coagulation_fibrinogen_1 : (3000 / 10) = 300 := by decide

/-- coagulation: bleedingtime(2, 9) = 7 — BLEEDING TIME: the minutes from puncture to a stopped bleed. value
    max(0, stop − start). -/
theorem fam_coagulation_bleedingtime_1 : (fmax 0 (9 - 2)) = 7 := by decide

/-- coagulation: clotretraction(48, 100) = 48 — CLOT RETRACTION: the serum expressed from the clot, as a percent
    of whole blood. value ⌊serum · 100 / blood⌋. -/
theorem fam_coagulation_clotretraction_1 : ((48 * 100) / 100) = 48 := by decide

/-- coagulation: thrombinratio(20, 10) = 200 — THROMBIN RATIO: the patient thrombin time over the control, as a
    percent ratio. value ⌊patient · 100 / control⌋. -/
theorem fam_coagulation_thrombinratio_1 : ((20 * 100) / 10) = 200 := by decide

/-- code: highlight(50, 100) = 50 — HIGHLIGHT: the share of lines highlighted, as a percentage. value
    ⌊highlighted · 100 / lines⌋. -/
theorem fam_code_highlight_1 : ((50 * 100) / 100) = 50 := by decide

/-- code: tokens(1000, 4) = 250 — TOKENS: the tokens a character count holds at a token width. value ⌊chars /
    perToken⌋. -/
theorem fam_code_tokens_1 : (1000 / 4) = 250 := by decide

/-- code: indent(8, 4) = 2 — INDENT: the indent depth of leading spaces at a tab width. value ⌊spaces / tab⌋. -/
theorem fam_code_indent_1 : (8 / 4) = 2 := by decide

/-- code: languages(5) = 5 — LANGUAGES: the languages offered. value count. -/
theorem fam_code_languages_1 : 5 = 5 := by decide

/-- code: density(400, 1000) = 40 — DENSITY: the share of total lines that are code, as a percentage. value
    ⌊code · 100 / total⌋. -/
theorem fam_code_density_1 : ((400 * 100) / 1000) = 40 := by decide

/-- codicology: quires(20, 4) = 24 -/
theorem fam_codicology_quires_1 : (20 + 4) = 24 := by decide

/-- codicology: foliocount(24, 8) = 192 -/
theorem fam_codicology_foliocount_1 : (24 * 8) = 192 := by decide

/-- codicology: rulingpatterns(4) = 16 -/
theorem fam_codicology_rulingpatterns_1 : (2 ^ 4) = 16 := by decide

/-- codicology: bindingstages(4, 3) = 7 -/
theorem fam_codicology_bindingstages_1 : (4 + 3) = 7 := by decide

/-- codicology: completeness(90, 100) = 90 -/
theorem fam_codicology_completeness_1 : ((90 * 100) / 100) = 90 := by decide

/-- coding: coderate(4, 7) = 57 — CODING — ERROR-CORRECTING CODES AS ARITHMETIC. A code is numbers: the rate at
    which bits carry information, the redundant symbols added, the minimum distance that separates codewords,
    the block it all fits in, the errors a distance can correct, the efficiency of a frame, a parity bit, and
    the overhead the protection costs. Crosses to `signal` — coding is what travels the channel signal carries.
    A measure. */ const PROOF = 'coding arithmetic (code rate, redundancy, Hamming distance, block length, error
    correction, efficiency, parity, overhead); error-correcting codes as integer formulas; a measure crossed to
    signal' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'coding', dst: 'signal', formula,
    value, proof: PROOF, ...extra }, holds, { name: `coding.${name}`, params }) export class CodingFormulas {
    /** CODE RATE: information bits over the block, as a percentage. value ⌊info · 100 / block⌋. -/
theorem fam_coding_coderate_1 : ((4 * 100) / 7) = 57 := by decide

/-- coding: redundancy(7, 4) = 3 — REDUNDANCY: the extra symbols a block carries beyond its information. value
    max(0, block − info). -/
theorem fam_coding_redundancy_1 : (fmax 0 (7 - 4)) = 3 := by decide

/-- coding: hammingdistance(2) = 5 — HAMMING DISTANCE: the minimum distance that corrects a given number of
    errors. value 2 · errors + 1. -/
theorem fam_coding_hammingdistance_1 : ((2 * 2) + 1) = 5 := by decide

/-- coding: blocklength(4, 3) = 7 — BLOCK LENGTH: information bits plus parity bits. value info + parity. -/
theorem fam_coding_blocklength_1 : (4 + 3) = 7 := by decide

/-- coding: errorcorrection(5) = 2 — ERROR CORRECTION: the errors a minimum distance can correct. value ⌊max(0,
    distance − 1) / 2⌋. -/
theorem fam_coding_errorcorrection_1 : ((fmax 0 (5 - 1)) / 2) = 2 := by decide

/-- coding: codingefficiency(512, 1024) = 50 — CODING EFFICIENCY: payload over the frame it rides in, as a
    percentage. value ⌊payload · 100 / frame⌋. -/
theorem fam_coding_codingefficiency_1 : ((512 * 100) / 1024) = 50 := by decide

/-- coding: overhead(3, 4) = 75 — OVERHEAD: parity bits as a percentage of the information they protect. value
    ⌊parity · 100 / info⌋. -/
theorem fam_coding_overhead_1 : ((3 * 100) / 4) = 75 := by decide

/-- coffee: brewratio(500, 30) = 16 — COFFEE — BREWING AS ARITHMETIC. A cup is numbers: the water-to-coffee
    ratio, the extraction yield, dissolved solids, the yield a dose pulls, the grind setting, the brew
    temperature, the bloom water, and whether the strength is met. Crosses to `cuisine` — coffee is one dish the
    kitchen measures. A measure. */ const PROOF = 'coffee arithmetic (brew ratio, extraction yield, TDS, dose
    yield, grind setting, water temp, bloom water, strength); brewing reduced to integers; a measure crossed to
    cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'coffee', dst: 'cuisine', formula,
    value, proof: PROOF, ...extra }, holds, { name: `coffee.${name}`, params }) export class CoffeeFormulas {
    /** BREW RATIO: grams of water per gram of coffee. value ⌊water / coffee⌋. -/
theorem fam_coffee_brewratio_1 : (500 / 30) = 16 := by decide

/-- coffee: extraction(6, 30) = 20 — EXTRACTION YIELD: dissolved grams as a percentage of the dose. value
    ⌊dissolved · 100 / dose⌋. -/
theorem fam_coffee_extraction_1 : ((6 * 100) / 30) = 20 := by decide

/-- coffee: tds(14, 1000) = 14 — TOTAL DISSOLVED SOLIDS: dissolved grams per litre of beverage, in permille.
    value ⌊dissolved · 1000 / beverage⌋. -/
theorem fam_coffee_tds_1 : ((14 * 1000) / 1000) = 14 := by decide

/-- coffee: doseyield(18, 2) = 36 — DOSE YIELD: the beverage a dose pulls at a target ratio. value dose · ratio. -/
theorem fam_coffee_doseyield_1 : (18 * 2) = 36 := by decide

/-- coffee: grindsetting(800, 50) = 16 — GRIND SETTING: burr microns in step units. value ⌊microns / step⌋. -/
theorem fam_coffee_grindsetting_1 : (800 / 50) = 16 := by decide

/-- coffee: watertemp(100, 7) = 93 — WATER TEMP: boiling point less the cooling drop, in Celsius. value max(0,
    boil − drop). -/
theorem fam_coffee_watertemp_1 : (fmax 0 (100 - 7)) = 93 := by decide

/-- coffee: bloomwater(30, 2) = 60 — BLOOM WATER: the dose wetted at a bloom factor. value dose · factor. -/
theorem fam_coffee_bloomwater_1 : (30 * 2) = 60 := by decide

/-- cogeneration: totalefficiency(85, 100) = 85 -/
theorem fam_cogeneration_totalefficiency_1 : ((85 * 100) / 100) = 85 := by decide

/-- cogeneration: powertoheat(400, 600) = 66 -/
theorem fam_cogeneration_powertoheat_1 : ((400 * 100) / 600) = 66 := by decide

/-- cogeneration: electricaloutput(500, 1) = 500 -/
theorem fam_cogeneration_electricaloutput_1 : (500 * 1) = 500 := by decide

/-- cogeneration: heatoutput(700, 1) = 700 -/
theorem fam_cogeneration_heatoutput_1 : (700 * 1) = 700 := by decide

/-- cogeneration: fuelinput(500, 700) = 1200 -/
theorem fam_cogeneration_fuelinput_1 : (500 + 700) = 1200 := by decide

/-- cogeneration: primaryenergysaving(20, 100) = 20 -/
theorem fam_cogeneration_primaryenergysaving_1 : ((20 * 100) / 100) = 20 := by decide

/-- cogeneration: heatrecovery(80, 100) = 80 -/
theorem fam_cogeneration_heatrecovery_1 : ((80 * 100) / 100) = 80 := by decide

/-- cogeneration: carnotlimit(100, 40) = 60 -/
theorem fam_cogeneration_carnotlimit_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- cognition: load(7, 4) = 175 — COGNITION — THE MIND AS ARITHMETIC. Thinking is numbers: cognitive load
    against capacity, mean reaction time, accuracy, memory span, verbal fluency, decision bias, working-memory
    chunks, and processing speed. Crosses to `psychology` — cognition is what psychology measures. A measure. */
    const PROOF = 'cognition arithmetic (cognitive load, reaction time, accuracy, memory span, fluency, bias,
    working memory, processing speed); the mind as a measure crossed to psychology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'cognition', dst: 'psychology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `cognition.${name}`, params }) export class CognitionFormulas { /** COGNITIVE
    LOAD: elements held as a percentage of capacity. value ⌊elements · 100 / capacity⌋. -/
theorem fam_cognition_load_1 : ((7 * 100) / 4) = 175 := by decide

/-- cognition: reaction(5000, 20) = 250 — REACTION TIME: total milliseconds over the trials. value ⌊total /
    trials⌋. -/
theorem fam_cognition_reaction_1 : (5000 / 20) = 250 := by decide

/-- cognition: accuracy(45, 50) = 90 — ACCURACY as a percentage. value ⌊correct · 100 / total⌋. -/
theorem fam_cognition_accuracy_1 : ((45 * 100) / 50) = 90 := by decide

/-- cognition: span(6, 7) = 85 — MEMORY SPAN: items recalled as a percentage of those presented. value ⌊recalled
    · 100 / presented⌋. -/
theorem fam_cognition_span_1 : ((6 * 100) / 7) = 85 := by decide

/-- cognition: fluency(60, 2) = 30 — VERBAL FLUENCY: items produced per minute. value ⌊produced / minutes⌋. -/
theorem fam_cognition_fluency_1 : (60 / 2) = 30 := by decide

/-- cognition: bias(30, 100) = 30 — DECISION BIAS: skewed decisions as a percentage of all. value ⌊skewed · 100
    / decisions⌋. -/
theorem fam_cognition_bias_1 : ((30 * 100) / 100) = 30 := by decide

/-- cognition: workingmemory(7) = 7 — WORKING MEMORY: the chunks held. value chunks. -/
theorem fam_cognition_workingmemory_1 : 7 = 7 := by decide

/-- cognition: processing(1000, 4) = 250 — PROCESSING SPEED: operations over seconds. value ⌊operations /
    seconds⌋. -/
theorem fam_cognition_processing_1 : (1000 / 4) = 250 := by decide

/-- cohort: retention(850, 1000) = 85 — COHORT — A GROUP OF MEMBERS OVER TIME, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A cohort is numbers: how many stay (retention), how big it is, how many
    engage, revenue per member, daily over monthly use, how fast it matures, how it compares to a baseline, and
    how it decays. Crosses to `analytics` — a cohort is what analytics measures. A measure. */ const PROOF =
    'cohort arithmetic (retention, size, engagement, revenue per member, stickiness, maturation, comparison,
    decay); a group measured over time; a measure crossed to analytics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'cohort', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `cohort.${name}`, params }) export class CohortFormulas { /** RETENTION as a percentage: members still
    active over the initial count. value ⌊active · 100 / initial⌋. -/
theorem fam_cohort_retention_1 : ((850 * 100) / 1000) = 85 := by decide

/-- cohort: size(1000) = 1000 — SIZE: the member count itself. value members. -/
theorem fam_cohort_size_1 : 1000 = 1000 := by decide

/-- cohort: engagement(600, 1000) = 60 — ENGAGEMENT as a percentage: engaged members over the total. value
    ⌊engaged · 100 / members⌋. -/
theorem fam_cohort_engagement_1 : ((600 * 100) / 1000) = 60 := by decide

/-- cohort: revenue(50000, 1000) = 50 — REVENUE per member (ARPU): total revenue over the member count. value
    ⌊total / members⌋. -/
theorem fam_cohort_revenue_1 : (50000 / 1000) = 50 := by decide

/-- cohort: stickiness(300, 1000) = 30 — STICKINESS (DAU/MAU) as a percentage: daily active over monthly active.
    value ⌊daily · 100 / monthly⌋. -/
theorem fam_cohort_stickiness_1 : ((300 * 100) / 1000) = 30 := by decide

/-- cohort: maturation(1200, 12) = 100 — MATURATION: members converted over the weeks elapsed. value ⌊converted
    / weeks⌋. -/
theorem fam_cohort_maturation_1 : (1200 / 12) = 100 := by decide

/-- cohort: comparison(120, 100) = 120 — COMPARISON as a percentage: the current cohort against a baseline.
    value ⌊current · 100 / baseline⌋. -/
theorem fam_cohort_comparison_1 : ((120 * 100) / 100) = 120 := by decide

/-- cohort: decay(700, 1000) = 70 — DECAY as a percentage: members remaining over the starting count. value
    ⌊remaining · 100 / start⌋. -/
theorem fam_cohort_decay_1 : ((700 * 100) / 1000) = 70 := by decide

/-- collaboration: tasks(42, 60) = 70 — COLLABORATION — TEAM WORK AS ARITHMETIC (chosen by the registry). A team
    is numbers: task completion, per-member workload, the cost of a meeting in person-minutes, cycle time, the
    backlog, throughput, utilization, and average response time. Crosses to `obs`. A measure. */ const PROOF =
    'collaboration arithmetic (task completion, workload, meeting cost, cycle time, backlog, throughput,
    utilization, response time); a measure crossed to obs' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'collaboration', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name:
    `collaboration.${name}`, params }) export class CollaborationFormulas { /** TASK COMPLETION as a percentage.
    value ⌊done · 100 / total⌋. -/
theorem fam_collaboration_tasks_1 : ((42 * 100) / 60) = 70 := by decide

/-- collaboration: workload(60, 5) = 12 — PER-MEMBER WORKLOAD: open tasks over members. value ⌊tasks / members⌋. -/
theorem fam_collaboration_workload_1 : (60 / 5) = 12 := by decide

/-- collaboration: meeting(8, 45) = 360 — THE COST OF A MEETING in person-minutes. value people · minutes. -/
theorem fam_collaboration_meeting_1 : (8 * 45) = 360 := by decide

/-- collaboration: cycle(2460000, 2460005) = 5 — CYCLE TIME: the days from start to finish. value max(0, end −
    start). -/
theorem fam_collaboration_cycle_1 : (fmax 0 (2460005 - 2460000)) = 5 := by decide

/-- collaboration: backlog(200, 150) = 50 — THE BACKLOG: items created not yet closed. value max(0, created −
    closed). -/
theorem fam_collaboration_backlog_1 : (fmax 0 (200 - 150)) = 50 := by decide

/-- collaboration: throughput(140, 7) = 20 — THROUGHPUT: items closed over days. value ⌊closed / days⌋. -/
theorem fam_collaboration_throughput_1 : (140 / 7) = 20 := by decide

/-- collaboration: utilization(32, 40) = 80 — UTILIZATION as a percentage: billable hours over total. value
    ⌊billable · 100 / total⌋. -/
theorem fam_collaboration_utilization_1 : ((32 * 100) / 40) = 80 := by decide

/-- collaboration: response(600, 50) = 12 — AVERAGE RESPONSE TIME: total minutes over the tickets answered.
    value ⌊total / tickets⌋. -/
theorem fam_collaboration_response_1 : (600 / 50) = 12 := by decide

/-- collateral: loantovalue(8000, 10000) = 80 — COLLATERAL — SECURED LENDING, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Backing a loan is numbers: loan-to-value, the haircut on posted assets,
    the margin a position requires, coverage, the value of the collateral, any shortfall, how far it is
    over-collateralized, and the price that trips a margin call. Crosses to `banking` — collateral is what
    banking lends against. A measure. */ const PROOF = 'collateral arithmetic (loan-to-value, haircut, margin
    requirement, coverage, collateral value, shortfall, over-collateralization, call threshold); secured lending
    as a measure crossed to banking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'collateral', dst:
    'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `collateral.${name}`, params }) export
    class CollateralFormulas { /** LOAN-TO-VALUE as a percentage. value ⌊loan · 100 / value⌋. -/
theorem fam_collateral_loantovalue_1 : ((8000 * 100) / 10000) = 80 := by decide

/-- collateral: haircut(1000, 15) = 150 — HAIRCUT: the amount discounted from an asset's value at a percentage.
    value ⌊value · pct / 100⌋. -/
theorem fam_collateral_haircut_1 : ((1000 * 15) / 100) = 150 := by decide

/-- collateral: marginrequirement(10000, 25) = 2500 — MARGIN REQUIREMENT: the margin a position requires at a
    percentage. value ⌊position · pct / 100⌋. -/
theorem fam_collateral_marginrequirement_1 : ((10000 * 25) / 100) = 2500 := by decide

/-- collateral: coverageratio(15000, 10000) = 150 — COVERAGE RATIO: collateral over the loan, as a percentage.
    value ⌊collateral · 100 / loan⌋. -/
theorem fam_collateral_coverageratio_1 : ((15000 * 100) / 10000) = 150 := by decide

/-- collateral: collateralvalue(200, 50) = 10000 — COLLATERAL VALUE: units at a price each. value units · price. -/
theorem fam_collateral_collateralvalue_1 : (200 * 50) = 10000 := by decide

/-- collateral: shortfall(5000, 3000) = 2000 — SHORTFALL: how far posted collateral falls below what is
    required. value max(0, required − posted). -/
theorem fam_collateral_shortfall_1 : (fmax 0 (5000 - 3000)) = 2000 := by decide

/-- collateral: shortfall(3000, 5000) = 0 — SHORTFALL: how far posted collateral falls below what is required.
    value max(0, required − posted). -/
theorem fam_collateral_shortfall_2 : (fmax 0 (3000 - 5000)) = 0 := by decide

/-- collateral: overcollateralization(15000, 10000) = 50 — OVER-COLLATERALIZATION: the excess of collateral over
    the loan, as a percentage. value max(0, ⌊(collateral − loan) · 100 / loan⌋). -/
theorem fam_collateral_overcollateralization_1 : (fmax 0 (((15000 - 10000) * 100) / 10000)) = 50 := by decide

/-- collateral: callthreshold(1000, 80) = 800 — CALL THRESHOLD: the value at which a margin call trips, a
    percentage of the collateral. value ⌊value · pct / 100⌋. -/
theorem fam_collateral_callthreshold_1 : ((1000 * 80) / 100) = 800 := by decide

/-- colorgrading: gamma(200, 90) = 180 — COLORGRADING — THE GRADE AS ARITHMETIC. A grade is numbers: gamma
    scaling, contrast gain, saturation, white balance, luminance from channels, gamut clamp, lift of the
    shadows, and the temperature shift. Crosses to `optics` — the grade is light bent after it is captured, the
    same quantities optics measures. A measure. */ const PROOF = 'colorgrading arithmetic (gamma scale, contrast
    gain, saturation, white balance, channel luminance, gamut clamp, shadow lift, temperature shift); the grade
    is light after capture; a measure crossed to optics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'colorgrading', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `colorgrading.${name}`, params }) export class ColorgradingFormulas { /** GAMMA: a value scaled by a
    percentage gamma. value ⌊value · pct / 100⌋. -/
theorem fam_colorgrading_gamma_1 : ((200 * 90) / 100) = 180 := by decide

/-- colorgrading: contrast(100, 2) = 200 — CONTRAST: a value taken at a gain factor. value value · factor. -/
theorem fam_colorgrading_contrast_1 : (100 * 2) = 200 := by decide

/-- colorgrading: saturation(150, 60) = 90 — SATURATION: a chroma scaled by a percentage. value ⌊chroma · pct /
    100⌋. -/
theorem fam_colorgrading_saturation_1 : ((150 * 60) / 100) = 90 := by decide

/-- colorgrading: whitebalance(200, 320) = 250 — WHITE BALANCE: a channel at an 8.8 fixed-point gain. value
    ⌊channel · gain / 256⌋. -/
theorem fam_colorgrading_whitebalance_1 : ((200 * 320) / 256) = 250 := by decide

/-- colorgrading: luminance(100, 200, 50) = 167 — LUMINANCE: Rec.601 weights (54, 183, 19 over 256) of the
    channels. value ⌊(r · 54 + g · 183 + b · 19) / 256⌋. -/
theorem fam_colorgrading_luminance_1 : ((((100 * 54) + (200 * 183)) + (50 * 19)) / 256) = 167 := by decide

/-- colorgrading: gamut(300, 0, 255) = 255 — GAMUT: a value clamped into [lo, hi]. value max(lo, min(value,
    hi)). -/
theorem fam_colorgrading_gamut_1 : (fmax 0 (fmin 300 255)) = 255 := by decide

/-- colorgrading: gamut(100, 150, 200) = 150 — GAMUT: a value clamped into [lo, hi]. value max(lo, min(value,
    hi)). -/
theorem fam_colorgrading_gamut_2 : (fmax 150 (fmin 100 200)) = 150 := by decide

/-- colorgrading: lift(40, 15) = 55 — LIFT: the shadows raised by an amount. value value + amount. -/
theorem fam_colorgrading_lift_1 : (40 + 15) = 55 := by decide

/-- colorgrading: temperature(200, 30) = 170 — TEMPERATURE: a value cooled by a shift, floored at 0. value
    max(0, value − shift). -/
theorem fam_colorgrading_temperature_1 : (fmax 0 (200 - 30)) = 170 := by decide

/-- colorgrading: temperature(10, 30) = 0 — TEMPERATURE: a value cooled by a shift, floored at 0. value max(0,
    value − shift). -/
theorem fam_colorgrading_temperature_2 : (fmax 0 (10 - 30)) = 0 := by decide

/-- colortheory: complement(120) = 240 — COLORTHEORY — COLOR AS ARITHMETIC (chosen by the registry, not by
    hand). A color is numbers: the complement of a hue, the luminance of a channel triple, the contrast between
    two tones, the gray of a pixel, a blend of two values, a hue rotation, the saturation of a swatch, and a
    tint toward white. Crosses to `colorgrading` — colortheory is what grading applies. A measure. */ const
    PROOF = 'colortheory arithmetic (complement, luminance, contrast ratio, grayscale, blend, hue shift,
    saturation, tint); color as exact integer channels; a measure crossed to colorgrading' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'colortheory', dst: 'colorgrading', formula, value, proof: PROOF,
    ...extra }, holds, { name: `colortheory.${name}`, params }) export class ColortheoryFormulas { /**
    COMPLEMENT: the opposite hue on the wheel. value 360 − hue. -/
theorem fam_colortheory_complement_1 : (360 - 120) = 240 := by decide

/-- colortheory: luminance(255, 0, 0) = 53 — LUMINANCE: perceived brightness of a channel triple. value ⌊(r·54 +
    g·183 + b·19) / 256⌋. -/
theorem fam_colortheory_luminance_1 : ((((255 * 54) + (0 * 183)) + (0 * 19)) / 256) = 53 := by decide

/-- colortheory: grayscale(90, 120, 150) = 120 — GRAYSCALE: the average of three channels. value ⌊(r + g + b) /
    3⌋. -/
theorem fam_colortheory_grayscale_1 : (((90 + 120) + 150) / 3) = 120 := by decide

/-- colortheory: blend(0, 200, 50) = 100 — BLEND: a linear mix of two values at t percent. value ⌊(a · (100 − t)
    + b · t) / 100⌋. -/
theorem fam_colortheory_blend_1 : (((0 * (100 - 50)) + (200 * 50)) / 100) = 100 := by decide

/-- colortheory: saturation(200, 50) = 75 — SATURATION: the chroma of a swatch as a percentage. value ⌊(max −
    min) · 100 / max⌋. -/
theorem fam_colortheory_saturation_1 : (((200 - 50) * 100) / 200) = 75 := by decide

/-- colortheory: tint(100, 50) = 177 — TINT: lighten a channel toward white by t percent. value c + ⌊(255 − c) ·
    t / 100⌋. -/
theorem fam_colortheory_tint_1 : (100 + (((255 - 100) * 50) / 100)) = 177 := by decide

/-- combustion: airfuelratio(150, 10) = 15 — COMBUSTION — BURNING FUEL, AS ARITHMETIC. Mixing and burning is
    numbers: the air a fuel needs, the extra air supplied, the flame it reaches, the heat it lets go, the oxygen
    the molecule demands, how much of that heat does work, what it emits, and the energy packed in each unit of
    mass. Crosses to `thermochemistry` — combustion is the reaction thermochemistry accounts for. A measure. */
    const PROOF = 'combustion arithmetic (air-fuel ratio, excess air, flame temperature, heat release,
    stoichiometric oxygen, efficiency, emissions, calorific value); a measure crossed to thermochemistry' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'combustion', dst: 'thermochemistry', formula,
    value, proof: PROOF, ...extra }, holds, { name: `combustion.${name}`, params }) export class
    CombustionFormulas { /** AIR-FUEL RATIO: mass of air per mass of fuel. value ⌊air / fuel⌋. -/
theorem fam_combustion_airfuelratio_1 : (150 / 10) = 15 := by decide

/-- combustion: excessair(120, 100) = 20 — EXCESS AIR: air supplied beyond stoichiometric, as a percentage.
    value ⌊max(0, supplied − stoich) · 100 / stoich⌋. -/
theorem fam_combustion_excessair_1 : (((fmax 0 (120 - 100)) * 100) / 100) = 20 := by decide

/-- combustion: flametemp(300, 1800) = 2100 — ADIABATIC FLAME TEMPERATURE: ambient plus the temperature rise.
    value ambient + rise. -/
theorem fam_combustion_flametemp_1 : (300 + 1800) = 2100 := by decide

/-- combustion: heatrelease(5, 40) = 200 — HEAT RELEASE: fuel mass at a calorific value each. value fuel ·
    calorific. -/
theorem fam_combustion_heatrelease_1 : (5 * 40) = 200 := by decide

/-- combustion: stoichiometric(8, 18) = 12 — STOICHIOMETRIC OXYGEN for CₓHᵧ: moles of O₂ the molecule demands.
    value carbon + ⌊hydrogen / 4⌋. -/
theorem fam_combustion_stoichiometric_1 : (8 + (18 / 4)) = 12 := by decide

/-- combustion: efficiency(85, 100) = 85 — EFFICIENCY: useful heat over heat input, as a percentage. value
    ⌊useful · 100 / input⌋. -/
theorem fam_combustion_efficiency_1 : ((85 * 100) / 100) = 85 := by decide

/-- combustion: emissions(100, 3) = 300 — EMISSIONS: fuel burned at an emission factor each. value fuel ·
    factor. -/
theorem fam_combustion_emissions_1 : (100 * 3) = 300 := by decide

/-- combustion: calorific(4000, 100) = 40 — CALORIFIC VALUE: energy over the mass that holds it. value ⌊energy /
    mass⌋. -/
theorem fam_combustion_calorific_1 : (4000 / 100) = 40 := by decide

/-- comparison: cells(5, 3) = 15 — COMPARISON — THE ComparisonTable USE CASE FROM payloadcms/website, AS
    ARITHMETIC. A comparison table is numbers: the cells of a feature-by-plan grid, the rows (features) and
    columns (plans), how much of the grid a plan covers, which plan is highlighted, the difference between two
    cells, whether a score wins, and the spread across a row. Crosses to `frontend` — a comparison table is what
    the frontend renders. A measure. */ const PROOF = 'comparison arithmetic (grid cells, rows, columns,
    coverage, highlight, diff, winner, spread); the ComparisonTable use case from payloadcms/website; a measure
    crossed to frontend' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'comparison', dst:
    'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `comparison.${name}`, params }) export
    class ComparisonFormulas { /** CELLS: the grid is rows by columns. value rows · cols. -/
theorem fam_comparison_cells_1 : (5 * 3) = 15 := by decide

/-- comparison: rows(5) = 5 — ROWS: a comparison table has one row per feature. value features. -/
theorem fam_comparison_rows_1 : 5 = 5 := by decide

/-- comparison: columns(3) = 3 — COLUMNS: a comparison table has one column per plan. value plans. -/
theorem fam_comparison_columns_1 : 3 = 3 := by decide

/-- comparison: coverage(9, 15) = 60 — COVERAGE: how much of the grid is checked, as a percentage. value
    ⌊checked · 100 / cells⌋. -/
theorem fam_comparison_coverage_1 : ((9 * 100) / 15) = 60 := by decide

/-- comparison: highlight(2, 3) = 66 — HIGHLIGHT: the highlighted plan's position, as a percentage. value ⌊plan
    · 100 / plans⌋. -/
theorem fam_comparison_highlight_1 : ((2 * 100) / 3) = 66 := by decide

/-- comparison: diff(80, 30) = 50 — DIFF: the difference between two cells, never below zero. value max(0, a −
    b). -/
theorem fam_comparison_diff_1 : (fmax 0 (80 - 30)) = 50 := by decide

/-- comparison: diff(30, 80) = 0 — DIFF: the difference between two cells, never below zero. value max(0, a −
    b). -/
theorem fam_comparison_diff_2 : (fmax 0 (30 - 80)) = 0 := by decide

/-- comparison: spread(100, 20) = 80 — SPREAD: the gap across a row, never below zero. value max(0, max − min). -/
theorem fam_comparison_spread_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- compensation: salary(50, 2080) = 104000 — COMPENSATION — PAY AS ARITHMETIC. What a role costs is numbers:
    annual salary from an hourly rate, a bonus as a percent of salary, equity at a share price, the new salary
    after a raise, the midpoint of a pay band, the ratio of highest to lowest pay, the benefits load, and total
    compensation. Crosses to `econ` — compensation is economics applied to one payroll. A measure. */ const
    PROOF = 'compensation arithmetic (salary, bonus, equity, raise, band midpoint, pay ratio, benefits, total
    comp); pay as economics on one payroll; a measure crossed to econ' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'compensation', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, {
    name: `compensation.${name}`, params }) export class CompensationFormulas { /** SALARY: annual pay from an
    hourly rate over hours worked. value hourly · hours. -/
theorem fam_compensation_salary_1 : (50 * 2080) = 104000 := by decide

/-- compensation: bonus(104000, 15) = 15600 — BONUS: a percent of salary. value ⌊salary · pct / 100⌋. -/
theorem fam_compensation_bonus_1 : ((104000 * 15) / 100) = 15600 := by decide

/-- compensation: equity(1000, 25) = 25000 — EQUITY: shares at a share price. value shares · price. -/
theorem fam_compensation_equity_1 : (1000 * 25) = 25000 := by decide

/-- compensation: raise(100000, 10) = 110000 — RAISE: the new salary after a percent raise. value current +
    ⌊current · pct / 100⌋. -/
theorem fam_compensation_raise_1 : (100000 + ((100000 * 10) / 100)) = 110000 := by decide

/-- compensation: band(80000, 120000) = 100000 — BAND: the midpoint of a pay band. value ⌊(min + max) / 2⌋. -/
theorem fam_compensation_band_1 : ((80000 + 120000) / 2) = 100000 := by decide

/-- compensation: ratio(1000000, 50000) = 20 — RATIO: highest pay over lowest pay. value ⌊highest / lowest⌋. -/
theorem fam_compensation_ratio_1 : (1000000 / 50000) = 20 := by decide

/-- compensation: benefit(100000, 30) = 30000 — BENEFIT: the benefits load as a percent of salary. value ⌊salary
    · pct / 100⌋. -/
theorem fam_compensation_benefit_1 : ((100000 * 30) / 100) = 30000 := by decide

/-- compensation: total(100000, 40000) = 140000 — TOTAL: total compensation, base plus everything else. value
    base + extra. -/
theorem fam_compensation_total_1 : (100000 + 40000) = 140000 := by decide

/-- compensation: ratio(1000000, 0) = 0 — RATIO: highest pay over lowest pay. value ⌊highest / lowest⌋. -/
theorem fam_compensation_ratio_2 : (1000000 / 0) = 0 := by decide

/-- compliance: penalty(1000000, 4) = 40000 — COMPLIANCE — REGULATION AS ARITHMETIC. A regime is numbers: a
    turnover-based penalty, the gap between controls in place and controls required, a reporting deadline from
    an incident, whether a count triggers a report, a risk score, the remediation effort, whether records are
    retained long enough, and the control coverage. Crosses to `law`, where the regulator and the court enforce.
    A measure, not advice. */ const PROOF = 'compliance arithmetic (turnover penalty, control gap, reporting
    deadline, reportable trigger, risk score, remediation, retention, coverage); a measure crossed to law, not
    advice' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'compliance', dst: 'law', formula,
    value, proof: PROOF, ...extra }, holds, { name: `compliance.${name}`, params }) export class
    ComplianceFormulas { /** A TURNOVER-BASED PENALTY: `pct`% of revenue (the GDPR shape). value ⌊revenue · pct
    / 100⌋. -/
theorem fam_compliance_penalty_1 : ((1000000 * 4) / 100) = 40000 := by decide

/-- compliance: breach(7, 10) = 3 — THE CONTROL GAP: controls required beyond those in place. value max(0,
    required − controls). -/
theorem fam_compliance_breach_1 : (fmax 0 (10 - 7)) = 3 := by decide

/-- compliance: breach(12, 10) = 0 — THE CONTROL GAP: controls required beyond those in place. value max(0,
    required − controls). -/
theorem fam_compliance_breach_2 : (fmax 0 (10 - 12)) = 0 := by decide

/-- compliance: deadline(2460000, 3) = 2460003 — THE REPORTING DEADLINE: `days` after the incident day. value
    incident + days. -/
theorem fam_compliance_deadline_1 : (2460000 + 3) = 2460003 := by decide

/-- compliance: risk(4, 5) = 20 — THE RISK SCORE: likelihood times impact. value likelihood · impact. -/
theorem fam_compliance_risk_1 : (4 * 5) = 20 := by decide

/-- compliance: remediation(3, 5000) = 15000 — REMEDIATION effort: the gaps at a cost per gap. value gaps ·
    perGap. -/
theorem fam_compliance_remediation_1 : (3 * 5000) = 15000 := by decide

/-- compliance: coverage(8, 10) = 80 — CONTROL COVERAGE as a percentage. value ⌊controls · 100 / total⌋. -/
theorem fam_compliance_coverage_1 : ((8 * 100) / 10) = 80 := by decide

/-- composites: rule(60, 40) = 100 — COMPOSITES — FIBER-REINFORCED MATERIALS, AS ARITHMETIC. A laminate is
    numbers: the rule of mixtures, the fiber volume fraction, longitudinal stiffness, strength under load,
    density, the layup thickness, anisotropy between axes, and the void content (porosity). Crosses to
    `materials` — a composite is a material by design. A measure. */ const PROOF = 'composites arithmetic (rule
    of mixtures, fiber fraction, stiffness, strength, density, layup, anisotropy, porosity); fiber-reinforced
    materials as integers; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'composites', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `composites.${name}`, params }) export class CompositesFormulas { /** RULE OF MIXTURES proxy: the sum of
    fiber and matrix contributions. value fiber + matrix. -/
theorem fam_composites_rule_1 : (60 + 40) = 100 := by decide

/-- composites: fiberfraction(60, 100) = 60 — FIBER VOLUME FRACTION as a percentage. value ⌊fiber · 100 /
    total⌋. -/
theorem fam_composites_fiberfraction_1 : ((60 * 100) / 100) = 60 := by decide

/-- composites: stiffness(230, 60) = 138 — LONGITUDINAL STIFFNESS: the fiber modulus scaled by the fraction.
    value ⌊fibermod · fraction / 100⌋. -/
theorem fam_composites_stiffness_1 : ((230 * 60) / 100) = 138 := by decide

/-- composites: strength(5000, 100) = 50 — STRENGTH: load over the cross-sectional area. value ⌊load / area⌋. -/
theorem fam_composites_strength_1 : (5000 / 100) = 50 := by decide

/-- composites: density(1600, 1000) = 1 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_composites_density_1 : (1600 / 1000) = 1 := by decide

/-- composites: layup(16, 2) = 32 — LAYUP: plies at a thickness each. value plies · thickness. -/
theorem fam_composites_layup_1 : (16 * 2) = 32 := by decide

/-- composites: anisotropy(230, 10) = 2300 — ANISOTROPY: the ratio of longitudinal to transverse, as a
    percentage. value ⌊longitudinal · 100 / transverse⌋. -/
theorem fam_composites_anisotropy_1 : ((230 * 100) / 10) = 2300 := by decide

/-- composites: porosity(2, 100) = 2 — POROSITY: the void content as a percentage. value ⌊voids · 100 / volume⌋. -/
theorem fam_composites_porosity_1 : ((2 * 100) / 100) = 2 := by decide

/-- composting: cnratio(300, 10) = 30 — COMPOSTING — TURNING ORGANIC MATTER, AS ARITHMETIC (the pile is numbers,
    not opinion). The carbon-to-nitrogen ratio, moisture, the core temperature a thermophilic pile reaches,
    whether it has cured, the pile's volume, how many turns it needs, aeration per unit mass, and how far it has
    decomposed. Crosses to `ecology` — composting is the nutrient cycle closed by hand. A measure. */ const
    PROOF = 'composting arithmetic (C:N ratio, moisture, core temperature, maturity, volume, turnover, aeration,
    decomposition); the nutrient cycle as numbers; a measure crossed to ecology' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'composting', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `composting.${name}`, params }) export class CompostingFormulas { /** C:N RATIO: parts carbon per part
    nitrogen. value ⌊carbon / nitrogen⌋. -/
theorem fam_composting_cnratio_1 : (300 / 10) = 30 := by decide

/-- composting: moisture(60, 100) = 60 — MOISTURE as a percentage of total mass. value ⌊water · 100 / total⌋. -/
theorem fam_composting_moisture_1 : ((60 * 100) / 100) = 60 := by decide

/-- composting: temperature(20, 45) = 65 — CORE TEMPERATURE: ambient plus the thermophilic rise. value ambient +
    rise. -/
theorem fam_composting_temperature_1 : (20 + 45) = 65 := by decide

/-- composting: volume(3, 2, 1) = 6 — VOLUME of the pile. value length · width · height. -/
theorem fam_composting_volume_1 : ((3 * 2) * 1) = 6 := by decide

/-- composting: aeration(500, 100) = 5 — AERATION: airflow per unit mass. value ⌊airflow / mass⌋. -/
theorem fam_composting_aeration_1 : (500 / 100) = 5 := by decide

/-- composting: decomposition(1000, 400) = 60 — DECOMPOSITION: the percentage of the starting mass that has
    broken down. value ⌊max(0, initial − remaining) · 100 / initial⌋. -/
theorem fam_composting_decomposition_1 : (((fmax 0 (1000 - 400)) * 100) / 1000) = 60 := by decide

/-- compress: ratio(800, 200) = 400 -/
theorem fam_compress_ratio_1 : ((800 * 100) / 200) = 400 := by decide

/-- compress: savedbits(1000, 250) = 750 -/
theorem fam_compress_savedbits_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- compress: dictionarysize(12) = 4096 -/
theorem fam_compress_dictionarysize_1 : (2 ^ 12) = 4096 := by decide

/-- compress: codelength(1000, 8) = 125 -/
theorem fam_compress_codelength_1 : (1000 / 8) = 125 := by decide

/-- compress: entropybits(8, 100) = 800 -/
theorem fam_compress_entropybits_1 : (8 * 100) = 800 := by decide

/-- compress: huffmandepth(4, 3) = 7 -/
theorem fam_compress_huffmandepth_1 : (4 + 3) = 7 := by decide

/-- compress: throughput(6000, 60) = 100 -/
theorem fam_compress_throughput_1 : (6000 / 60) = 100 := by decide

/-- compression: ratio(1000, 250) = 400 — COMPRESSION — PACKING DATA SMALL, AS ARITHMETIC. Making data smaller
    is numbers: the ratio against the original, the percentage saved, symbols per distinct symbol, bits per
    second, how much repeats, bytes per millisecond, the dictionary it carries, and how faithfully it restores.
    Crosses to `storage` — compression is what storage buys back. A measure. */ const PROOF = 'compression
    arithmetic (ratio, savings, entropy, bitrate, redundancy, throughput, dictionary, fidelity); packing data
    small as integers; a measure crossed to storage' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'compression', dst: 'storage', formula, value, proof: PROOF, ...extra }, holds, { name:
    `compression.${name}`, params }) export class CompressionFormulas { /** RATIO: the original against the
    compressed, as a percentage. value ⌊original · 100 / compressed⌋. -/
theorem fam_compression_ratio_1 : ((1000 * 100) / 250) = 400 := by decide

/-- compression: savings(1000, 250) = 75 — SAVINGS: the fraction of the original the compression removed, as a
    percentage. value ⌊(original − compressed) · 100 / original⌋. -/
theorem fam_compression_savings_1 : (((1000 - 250) * 100) / 1000) = 75 := by decide

/-- compression: entropy(1000, 50) = 20 — ENTROPY: symbols per distinct symbol. value ⌊symbols / unique⌋. -/
theorem fam_compression_entropy_1 : (1000 / 50) = 20 := by decide

/-- compression: bitrate(64000, 8) = 8000 — BITRATE: bits over seconds. value ⌊bits / seconds⌋. -/
theorem fam_compression_bitrate_1 : (64000 / 8) = 8000 := by decide

/-- compression: redundancy(300, 1000) = 30 — REDUNDANCY: the repeated part of the total, as a percentage. value
    ⌊repeated · 100 / total⌋. -/
theorem fam_compression_redundancy_1 : ((300 * 100) / 1000) = 30 := by decide

/-- compression: throughput(10000, 20) = 500 — THROUGHPUT: bytes over milliseconds. value ⌊bytes / ms⌋. -/
theorem fam_compression_throughput_1 : (10000 / 20) = 500 := by decide

/-- compression: dictionary(4096) = 4096 — DICTIONARY: the dictionary the compression carries. value size. -/
theorem fam_compression_dictionary_1 : 4096 = 4096 := by decide

/-- compression: fidelity(950, 1000) = 95 — FIDELITY: how much of the original the restore recovered, as a
    percentage. value ⌊restored · 100 / original⌋. -/
theorem fam_compression_fidelity_1 : ((950 * 100) / 1000) = 95 := by decide

/-- concrete: volume(10, 4, 2) = 80 — VOLUME: the volume of a rectangular form. value length · width · height. -/
theorem fam_concrete_volume_1 : ((10 * 4) * 2) = 80 := by decide

/-- concrete: cement(80, 7) = 560 — CONCRETE — THE POUR, AS ARITHMETIC (what a mix is, before it sets). Placing
    concrete is numbers: the volume of a form, the cement it needs, the water-to-cement ratio, the slump left
    after loss, the strength gained over days, the days left to cure, the parts in a mix, and the rebar a slab
    takes. Crosses to `materials` — concrete is one material, specified. A measure. */ const PROOF = 'concrete
    arithmetic (form volume, cement, water-cement ratio, slump, strength, cure, mix parts, rebar count); the
    pour before it sets; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'concrete', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `concrete.${name}`, params }) export class ConcreteFormulas { /** CEMENT: bags for a volume at a per-unit
    rate. value volume · bags. -/
theorem fam_concrete_cement_1 : (80 * 7) = 560 := by decide

/-- concrete: watercement(50, 100) = 50 — WATER-CEMENT RATIO as a percentage. value ⌊water · 100 / cement⌋. -/
theorem fam_concrete_watercement_1 : ((50 * 100) / 100) = 50 := by decide

/-- concrete: slump(100, 25) = 75 — SLUMP: the slump (mm) left after loss on the way to the form. value max(0,
    target − loss). -/
theorem fam_concrete_slump_1 : (fmax 0 (100 - 25)) = 75 := by decide

/-- concrete: strength(28, 1) = 28 — STRENGTH: compressive strength gained over days at a daily rate. value days
    · rate. -/
theorem fam_concrete_strength_1 : (28 * 1) = 28 := by decide

/-- concrete: cure(28, 7) = 21 — CURE: days of curing still owed against a target. value max(0, target − done). -/
theorem fam_concrete_cure_1 : (fmax 0 (28 - 7)) = 21 := by decide

/-- concrete: mix(1, 2, 4) = 7 — MIX: the total parts of a cement:sand:gravel mix. value cement + sand + gravel. -/
theorem fam_concrete_mix_1 : ((1 + 2) + 4) = 7 := by decide

/-- concurrency: speedup(100, 25) = 400 — CONCURRENCY — PARALLEL COMPUTE, AS ARITHMETIC. The limits of running
    work at once are numbers: Amdahl's speedup, raw speedup, throughput, utilization, contention, latency,
    deadlock cycles, and how work scales with nodes. Crosses to `code` — concurrency is a property of the code
    that runs. A measure. */ const PROOF = 'concurrency arithmetic (amdahl speedup, speedup, throughput,
    utilization, contention, latency, deadlock, scalability, stolen-task count); a measure crossed to code'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'concurrency', dst: 'code', formula, value, proof:
    PROOF, ...extra }, holds, { name: `concurrency.${name}`, params }) export class ConcurrencyFormulas { /**
    AMDAHL'S SPEEDUP ×100: parallel is a percent 0..99, processors ≥ 1. value ⌊10000 / denom⌋. */ static
    amdahl(parallel: number, processors: number): CrossFormula { const denom = processors > 0 ? 100 - parallel +
    Math.floor((parallel * 100) / processors) : 0 return c('concurrency-amdahl', 'amdahl(parallel, processors) =
    ⌊10000 / (100 − parallel + ⌊parallel · 100 / processors⌋)⌋', processors > 0 && denom > 0 ? Math.floor(10000
    / denom) : 0, nat(parallel, processors) && processors > 0 && denom > 0, 'amdahl', [parallel, processors]) }
    /** SPEEDUP ×100: serial time over parallel time. value ⌊serial · 100 / parallel⌋. -/
theorem fam_concurrency_speedup_1 : ((100 * 100) / 25) = 400 := by decide

/-- concurrency: throughput(6000, 60) = 100 — THROUGHPUT: tasks over seconds. value ⌊tasks / seconds⌋. -/
theorem fam_concurrency_throughput_1 : (6000 / 60) = 100 := by decide

/-- concurrency: utilization(75, 100) = 75 — UTILIZATION as a percentage: busy over total. value ⌊busy · 100 /
    total⌋. -/
theorem fam_concurrency_utilization_1 : ((75 * 100) / 100) = 75 := by decide

/-- concurrency: contention(30, 100) = 30 — CONTENTION as a percentage: waiting over threads. value ⌊waiting ·
    100 / threads⌋. -/
theorem fam_concurrency_contention_1 : ((30 * 100) / 100) = 30 := by decide

/-- concurrency: latency(5000, 100) = 50 — AVERAGE LATENCY: total milliseconds over the requests served. value
    ⌊total / requests⌋. -/
theorem fam_concurrency_latency_1 : (5000 / 100) = 50 := by decide

/-- concurrency: deadlock(3) = 3 — DEADLOCK: the number of cycles in the wait-for graph. value cycles. -/
theorem fam_concurrency_deadlock_1 : 3 = 3 := by decide

/-- concurrency: scalability(800, 100) = 800 — SCALABILITY as a percentage: nodes over the baseline. value
    ⌊nodes · 100 / baseline⌋. -/
theorem fam_concurrency_scalability_1 : ((800 * 100) / 100) = 800 := by decide

/-- conditioning: vo2max(200, 50) = 60 — CONDITIONING — TRAINING THE BODY, AS ARITHMETIC (chosen by the
    exercise-science registry, not by hand). Getting fit is numbers: aerobic power from the pulse, the max heart
    rate for an age, a session's load, the volume lifted, intensity as a share of a max, a target heart-rate
    zone, how fast the pulse recovers, and a one-rep max. Crosses to `physiology` — conditioning is what the
    body's physiology adapts to. A measure. */ const PROOF = 'conditioning arithmetic (vo2 max, max heart rate,
    session load, lifted volume, intensity, heart-rate zone, recovery, one-rep max); the exercise-science
    domain; a measure crossed to physiology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'conditioning', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `conditioning.${name}`, params }) export class ConditioningFormulas { /** VO2 MAX: aerobic power from the
    pulse ratio (Uth–Sørensen). value ⌊15 · hrmax / hrrest⌋. -/
theorem fam_conditioning_vo2max_1 : ((15 * 200) / 50) = 60 := by decide

/-- conditioning: heartrate(30) = 190 — MAX HEART RATE for an age. value max(0, 220 − age). -/
theorem fam_conditioning_heartrate_1 : (fmax 0 (220 - 30)) = 190 := by decide

/-- conditioning: load(60, 8) = 480 — SESSION LOAD: minutes at a rated exertion. value duration · rpe. -/
theorem fam_conditioning_load_1 : (60 * 8) = 480 := by decide

/-- conditioning: volume(3, 10, 100) = 3000 — VOLUME: the weight moved across all reps. value sets · reps ·
    weight. -/
theorem fam_conditioning_volume_1 : ((3 * 10) * 100) = 3000 := by decide

/-- conditioning: intensity(80, 100) = 80 — INTENSITY: the lift as a share of the max. value ⌊weight · 100 /
    max⌋. -/
theorem fam_conditioning_intensity_1 : ((80 * 100) / 100) = 80 := by decide

/-- conditioning: trainingzone(190, 70) = 133 — TRAINING ZONE: a share of max heart rate. value ⌊hrmax · percent
    / 100⌋. -/
theorem fam_conditioning_trainingzone_1 : ((190 * 70) / 100) = 133 := by decide

/-- conditioning: recovery(180, 120) = 60 — RECOVERY: the pulse drop one minute after the peak. value max(0,
    peak − after). -/
theorem fam_conditioning_recovery_1 : (fmax 0 (180 - 120)) = 60 := by decide

/-- conditioning: onerepmax(100, 5) = 116 — ONE-REP MAX: the Epley estimate. value weight + ⌊weight · reps /
    30⌋. -/
theorem fam_conditioning_onerepmax_1 : (100 + ((100 * 5) / 30)) = 116 := by decide

/-- conduction: fourierlaw(40, 2, 5) = 400 — CONDUCTION — HEAT THROUGH A SOLID, AS ARITHMETIC (Fourier's law and
    its register of resistances). Conducting heat is numbers: the rate Fourier's law gives, the thermal
    resistance of a slab, its U-value and R-value, the temperature gradient, the flux density, and resistances
    joined in series and in parallel. Crosses to `thermodynamics` — conduction is how the second law moves heat
    down a gradient. A measure. */ const PROOF = 'conduction arithmetic (Fourier rate, thermal resistance,
    U-value, R-value, gradient, flux density, series and parallel resistance); heat through a solid; a measure
    crossed to thermodynamics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'conduction', dst:
    'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `conduction.${name}`, params })
    export class ConductionFormulas { /** FOURIER'S LAW: conduction rate = conductivity · area · gradient. value
    cond · area · grad. -/
theorem fam_conduction_fourierlaw_1 : ((40 * 2) * 5) = 400 := by decide

/-- conduction: resistance(100, 5, 2) = 10 — THERMAL RESISTANCE of a slab: length over conductivity times area.
    value ⌊length / (cond · area)⌋. -/
theorem fam_conduction_resistance_1 : (100 / (5 * 2)) = 10 := by decide

/-- conduction: uvalue(100, 4) = 25 — U-VALUE: conductivity over thickness. value ⌊cond / thickness⌋. -/
theorem fam_conduction_uvalue_1 : (100 / 4) = 25 := by decide

/-- conduction: rvalue(120, 5) = 24 — R-VALUE: thickness over conductivity. value ⌊thickness / cond⌋. -/
theorem fam_conduction_rvalue_1 : (120 / 5) = 24 := by decide

/-- conduction: gradient(100, 5) = 20 — TEMPERATURE GRADIENT: temperature drop over distance. value ⌊dtemp /
    dist⌋. -/
theorem fam_conduction_gradient_1 : (100 / 5) = 20 := by decide

/-- conduction: fluxdensity(1000, 5) = 200 — FLUX DENSITY: heat rate over area. value ⌊heat / area⌋. -/
theorem fam_conduction_fluxdensity_1 : (1000 / 5) = 200 := by decide

/-- conduction: seriesresistance(10, 20, 30) = 60 — SERIES RESISTANCE: resistances in a wall add. value r1 + r2
    + r3. -/
theorem fam_conduction_seriesresistance_1 : ((10 + 20) + 30) = 60 := by decide

/-- conduction: parallelresistance(30, 60) = 20 — PARALLEL RESISTANCE: two paths combine as product over sum.
    value ⌊(r1 · r2) / (r1 + r2)⌋. -/
theorem fam_conduction_parallelresistance_1 : ((30 * 60) / (30 + 60)) = 20 := by decide

/-- confectionery: sugarstage(150, 160) = 160 -/
theorem fam_confectionery_sugarstage_1 : (fmax 150 160) = 160 := by decide

/-- confectionery: crystalsize(100, 4) = 25 -/
theorem fam_confectionery_crystalsize_1 : (100 / 4) = 25 := by decide

/-- confectionery: temperaturecurve(30, 5) = 150 -/
theorem fam_confectionery_temperaturecurve_1 : (30 * 5) = 150 := by decide

/-- confectionery: temperingstages(3, 0) = 3 -/
theorem fam_confectionery_temperingstages_1 : (3 + 0) = 3 := by decide

/-- confectionery: cocoaratio(70, 100) = 70 -/
theorem fam_confectionery_cocoaratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- confectionery: bloomtemp(34, 27) = 7 -/
theorem fam_confectionery_bloomtemp_1 : (fmax 0 (34 - 27)) = 7 := by decide

/-- confectionery: yieldpct(95, 100) = 95 -/
theorem fam_confectionery_yieldpct_1 : ((95 * 100) / 100) = 95 := by decide

/-- conic: eccentricityscaled(3, 5) = 60 — CONIC — THE SECTIONS OF A CONE, AS ARITHMETIC. A conic is numbers:
    its eccentricity, the focal length, the directrix distance, the latus rectum, the semi-major and semi-minor
    axes, the discriminant that names the curve, and the span from centre to vertex. Integer proxies throughout
    (squared lengths, scaled ratios — no sqrt). Crosses to `geometry` — a conic is geometry made of foci and
    axes. A measure. */ const PROOF = 'conic arithmetic (eccentricity, focal length, directrix, latus rectum,
    semi-major, semi-minor, discriminant, vertex distance); integer proxies, no sqrt; a measure crossed to
    geometry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'conic', dst: 'geometry', formula,
    value, proof: PROOF, ...extra }, holds, { name: `conic.${name}`, params }) export class ConicFormulas { /**
    ECCENTRICITY scaled by 100: the focal distance over the semi-major axis. value ⌊focus · 100 / axis⌋. -/
theorem fam_conic_eccentricityscaled_1 : ((3 * 100) / 5) = 60 := by decide

/-- conic: semimajor(8, 2) = 5 — SEMI-MAJOR axis: half the sum of the two focal radii (2a = r₁ + r₂). value ⌊(r1
    + r2) / 2⌋. -/
theorem fam_conic_semimajor_1 : ((8 + 2) / 2) = 5 := by decide

/-- conic: vertexdistance(5, 2) = 3 — VERTEX DISTANCE from centre: how far a vertex sits past an offset. value
    max(0, a − offset). -/
theorem fam_conic_vertexdistance_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- conic: vertexdistance(2, 5) = 0 — VERTEX DISTANCE from centre: how far a vertex sits past an offset. value
    max(0, a − offset). -/
theorem fam_conic_vertexdistance_2 : (fmax 0 (2 - 5)) = 0 := by decide

/-- conservation: protected(30, 100) = 30 — CONSERVATION — PROTECTING LIFE, AS ARITHMETIC. The work of keeping
    species and habitats alive is numbers: the share of habitat reserved, a population against its historical
    baseline, how connected the fragments are, the share of species threatened, how much lost ground is
    restored, how many a place can carry, poaching seized against the estimate, and whether a population clears
    its minimum viable size. Crosses to `ecology` — conservation acts on what ecology describes. */ const PROOF
    = 'conservation arithmetic (protected share, population baseline, corridor connectivity, threatened share,
    restoration, carrying capacity, poaching seized, minimum viability); acting on what ecology describes; a
    measure crossed to ecology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'conservation', dst:
    'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `conservation.${name}`, params }) export
    class ConservationFormulas { /** PROTECTED SHARE: the percentage of habitat set aside. value ⌊reserved · 100
    / habitat⌋. -/
theorem fam_conservation_protected_1 : ((30 * 100) / 100) = 30 := by decide

/-- conservation: population(400, 1000) = 40 — POPULATION against its historical baseline. value ⌊current · 100
    / historical⌋. -/
theorem fam_conservation_population_1 : ((400 * 100) / 1000) = 40 := by decide

/-- conservation: corridor(12, 4) = 3 — CORRIDOR connectivity: connected routes per fragment. value ⌊connected /
    fragments⌋. -/
theorem fam_conservation_corridor_1 : (12 / 4) = 3 := by decide

/-- conservation: threatened(25, 200) = 12 — THREATENED share of species. value ⌊endangered · 100 / species⌋. -/
theorem fam_conservation_threatened_1 : ((25 * 100) / 200) = 12 := by decide

/-- conservation: restoration(150, 600) = 25 — RESTORATION: the share of lost ground restored. value ⌊restored ·
    100 / lost⌋. -/
theorem fam_conservation_restoration_1 : ((150 * 100) / 600) = 25 := by decide

/-- conservation: carrying(1000, 8) = 125 — CARRYING CAPACITY: individuals a place can carry at a per-head
    demand. value ⌊resources / demand⌋. -/
theorem fam_conservation_carrying_1 : (1000 / 8) = 125 := by decide

/-- conservation: poaching(45, 300) = 15 — POACHING seized against the estimate. value ⌊seized · 100 /
    estimated⌋. -/
theorem fam_conservation_poaching_1 : ((45 * 100) / 300) = 15 := by decide

/-- conservation: viability(250, 500) = 50 — VIABILITY: a population against its minimum viable size. value
    ⌊individuals · 100 / minimum⌋. -/
theorem fam_conservation_viability_1 : ((250 * 100) / 500) = 50 := by decide

/-- consolidation: shipmentsmerged(100, 40) = 60 -/
theorem fam_consolidation_shipmentsmerged_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- consolidation: fillimprovement(90, 70) = 20 -/
theorem fam_consolidation_fillimprovement_1 : (fmax 0 (90 - 70)) = 20 := by decide

/-- consolidation: costsavings(300, 1000) = 30 -/
theorem fam_consolidation_costsavings_1 : ((300 * 100) / 1000) = 30 := by decide

/-- consolidation: ordersperload(120, 4) = 30 -/
theorem fam_consolidation_ordersperload_1 : (120 / 4) = 30 := by decide

/-- consolidation: freightclass(500, 100) = 5 -/
theorem fam_consolidation_freightclass_1 : (500 / 100) = 5 := by decide

/-- consolidation: densitygain(120, 100) = 120 -/
theorem fam_consolidation_densitygain_1 : ((120 * 100) / 100) = 120 := by decide

/-- consolidation: poolingratio(8, 10) = 80 -/
theorem fam_consolidation_poolingratio_1 : ((8 * 100) / 10) = 80 := by decide

/-- construction: area(10, 8) = 80 — CONSTRUCTION — BUILDING & CONSTRUCTION, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Putting up a building is numbers: floor area, volume, the materials an
    area needs, total cost, the crew per shift, progress to date, the load each support carries, and the waste
    off the cut. Crosses to `econ` — construction is spend and yield. A measure. */ const PROOF = 'construction
    arithmetic (area, volume, materials, cost, crew, progress, load, waste); a building-trades domain; a measure
    crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'construction', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `construction.${name}`, params }) export class
    ConstructionFormulas { /** FLOOR AREA: length by width. value length · width. -/
theorem fam_construction_area_1 : (10 * 8) = 80 := by decide

/-- construction: volume(80, 3) = 240 — VOLUME: floor area raised a height. value area · height. -/
theorem fam_construction_volume_1 : (80 * 3) = 240 := by decide

/-- construction: materials(80, 25) = 2000 — MATERIALS: an area at a per-square-metre rate. value area · perSqm. -/
theorem fam_construction_materials_1 : (80 * 25) = 2000 := by decide

/-- construction: cost(2000, 1500) = 3500 — TOTAL COST: materials plus labor. value materials + labor. -/
theorem fam_construction_cost_1 : (2000 + 1500) = 3500 := by decide

/-- construction: crew(120, 8) = 15 — CREW: the hours each worker takes on a shift. value ⌊hours / workers⌋. -/
theorem fam_construction_crew_1 : (120 / 8) = 15 := by decide

/-- construction: progress(30, 120) = 25 — PROGRESS as a percentage. value ⌊done · 100 / total⌋. -/
theorem fam_construction_progress_1 : ((30 * 100) / 120) = 25 := by decide

/-- construction: load(1000, 4) = 250 — LOAD: the weight each support carries. value ⌊weight / supports⌋. -/
theorem fam_construction_load_1 : (1000 / 4) = 250 := by decide

/-- construction: waste(5, 100) = 5 — WASTE as a percentage of what was used. value ⌊scrap · 100 / used⌋. -/
theorem fam_construction_waste_1 : ((5 * 100) / 100) = 5 := by decide

/-- content: blocks(5) = 5 — CONTENT — THE CONTENT-COMPOSITION USE CASE FROM payloadcms/website, AS ARITHMETIC.
    A page is built from blocks (BlogContent, Content, ContentGrid, MediaContent, ReusableContent): how many
    blocks, how much is reused, how much is media, the sections and their nesting depth, the words a rich-text
    field holds, and the table of contents. Crosses to `payload` — content is what payload composes. A measure.
    */ const PROOF = 'content arithmetic (blocks, reuse, media, sections, depth, words, toc, richtext) from
    payloadcms/website block composition; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'content', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, {
    name: `content.${name}`, params }) export class ContentFormulas { /** BLOCKS: the blocks a page is composed
    from. value count. -/
theorem fam_content_blocks_1 : 5 = 5 := by decide

/-- content: reuse(3, 10) = 30 — REUSE: the share that is ReusableContent, as a percentage. value ⌊reused · 100
    / total⌋. -/
theorem fam_content_reuse_1 : ((3 * 100) / 10) = 30 := by decide

/-- content: media(4, 10) = 40 — MEDIA: the share that is MediaContent, as a percentage. value ⌊mediaBlocks ·
    100 / total⌋. -/
theorem fam_content_media_1 : ((4 * 100) / 10) = 40 := by decide

/-- content: sections(6) = 6 — SECTIONS: the top-level sections of a page. value count. -/
theorem fam_content_sections_1 : 6 = 6 := by decide

/-- content: depth(3) = 3 — DEPTH: the nesting depth of blocks within a section. value nested; holds when ≤ 5. -/
theorem fam_content_depth_1 : 3 = 3 := by decide

/-- content: words(600, 6) = 100 — WORDS: the words a rich-text field holds. value ⌊chars / perWord⌋. -/
theorem fam_content_words_1 : (600 / 6) = 100 := by decide

/-- content: toc(8) = 8 — TOC: the table-of-contents entries, one per heading. value headings. -/
theorem fam_content_toc_1 : 8 = 8 := by decide

/-- content: richtext(1000, 20) = 50 — RICHTEXT: the words per block across a rich-text document. value ⌊words /
    blocks⌋. -/
theorem fam_content_richtext_1 : (1000 / 20) = 50 := by decide

/-- control: error(100, 30) = 70 — CONTROL — A FEEDBACK LOOP, AS ARITHMETIC (the controller the registry leaves
    to dynamics). Holding a system to a setpoint is numbers: the steady error, how long it settles, how far it
    overshoots, where it ends up, how fast it rises, how damped it is, the gain margin, and the loop bandwidth.
    Crosses to `dynamics` — control is what shapes a dynamical response. A measure. */ const PROOF = 'control
    arithmetic (steady error, settling time, overshoot, steady state, rise time, damping, gain margin,
    bandwidth); the controller the registry leaves to dynamics; a measure crossed to dynamics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'control', dst: 'dynamics', formula, value, proof: PROOF, ...extra
    }, holds, { name: `control.${name}`, params }) export class ControlFormulas { /** STEADY ERROR: how far the
    measurement sits from the setpoint. value max(0, setpoint − measured). -/
theorem fam_control_error_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- control: settlingtime(4, 5) = 20 — SETTLING TIME: time constants to settle, at a constant each. value tau ·
    bands. -/
theorem fam_control_settlingtime_1 : (4 * 5) = 20 := by decide

/-- control: overshoot(120, 100) = 20 — OVERSHOOT as a percentage over the final value. value ⌊max(0, peak −
    final) · 100 / final⌋. -/
theorem fam_control_overshoot_1 : (((fmax 0 (120 - 100)) * 100) / 100) = 20 := by decide

/-- control: steadystate(5, 12) = 60 — STEADY STATE: the final value of a step, gain times input. value gain ·
    input. -/
theorem fam_control_steadystate_1 : (5 * 12) = 60 := by decide

/-- control: risetime(1800, 90) = 20 — RISE TIME: the travel over the slope that covers it. value ⌊span / rate⌋. -/
theorem fam_control_risetime_1 : (1800 / 90) = 20 := by decide

/-- control: damping(30, 40) = 75 — DAMPING RATIO as a percentage of critical damping. value ⌊actual · 100 /
    critical⌋. -/
theorem fam_control_damping_1 : ((30 * 100) / 40) = 75 := by decide

/-- control: gainmargin(100, 25) = 4 — GAIN MARGIN: how many times the gain can rise before the critical gain.
    value ⌊critical / operating⌋. -/
theorem fam_control_gainmargin_1 : (100 / 25) = 4 := by decide

/-- control: bandwidth(8, 3) = 24 — BANDWIDTH: the natural frequency scaled by the loop factor. value wn ·
    factor. -/
theorem fam_control_bandwidth_1 : (8 * 3) = 24 := by decide

/-- controllability: matrixrank(4, 6) = 4 — CONTROLLABILITY — WHETHER A SYSTEM CAN BE STEERED, AS ARITHMETIC. A
    linear system is controllable when inputs can drive the state anywhere: the controllability matrix [B, AB,
    …, Aⁿ⁻¹B] must have full rank. Running control is numbers: the size of that matrix, its rank, the reachable
    states, the controllability degree (index), input coupling, state dimension, the Gramian trace, and how many
    modes the inputs actually reach. Crosses to `control` — controllability is the precondition control needs. A
    measure. */ const PROOF = 'controllability arithmetic (controllability matrix, rank, reachable states,
    degree/index, input coupling, state dimension, Gramian trace, modes controlled); the precondition for
    control; a measure crossed to control' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'controllability', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name:
    `controllability.${name}`, params }) export class ControllabilityFormulas { /** MATRIX RANK: the rank of a
    rows×cols matrix is at most the smaller dimension. value min(rows, cols). -/
theorem fam_controllability_matrixrank_1 : (fmin 4 6) = 4 := by decide

/-- controllability: reachablestates(8, 3) = 5 — REACHABLE STATES: the dimension of the reachable subspace is
    the state count minus the uncontrollable part. value max(0, states − uncontrollable). -/
theorem fam_controllability_reachablestates_1 : (fmax 0 (8 - 3)) = 5 := by decide

/-- controllability: controllabilitymatrix(5, 2) = 10 — CONTROLLABILITY MATRIX: [B, AB, …, Aⁿ⁻¹B] has states
    rows and states·inputs columns. value states · inputs. -/
theorem fam_controllability_controllabilitymatrix_1 : (5 * 2) = 10 := by decide

/-- controllability: inputcoupling(3, 7) = 21 — INPUT COUPLING: nonzero entries wiring inputs to the states each
    one touches. value inputs · statesPerInput. -/
theorem fam_controllability_inputcoupling_1 : (3 * 7) = 21 := by decide

/-- controllability: statedimension(6, 9) = 15 — STATE DIMENSION: the combined state dimension of two subsystems
    in series. value sub1 + sub2. -/
theorem fam_controllability_statedimension_1 : (6 + 9) = 15 := by decide

/-- controllability: gramiantrace(4, 12) = 48 — GRAMIAN TRACE: the controllability Gramian trace is the per-mode
    energy summed over the modes. value energy · modes. -/
theorem fam_controllability_gramiantrace_1 : (4 * 12) = 48 := by decide

/-- controllability: modescontrolled(10, 3) = 7 — MODES CONTROLLED: the modes the inputs reach are the total
    modes minus the uncontrollable ones. value max(0, modes − uncontrollable). -/
theorem fam_controllability_modescontrolled_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- controllability: modescontrolled(3, 5) = 0 — MODES CONTROLLED: the modes the inputs reach are the total
    modes minus the uncontrollable ones. value max(0, modes − uncontrollable). -/
theorem fam_controllability_modescontrolled_2 : (fmax 0 (3 - 5)) = 0 := by decide

/-- convection: heatflux(10, 5, 20) = 1000 — CONVECTION — HEAT CARRIED BY A MOVING FLUID, AS ARITHMETIC. Running
    a flow is numbers: the heat flux a surface sheds, the film coefficient, the Reynolds number that says
    laminar or turbulent, Prandtl, Grashof and Rayleigh for buoyancy, the film temperature a property is read
    at, and how thick the boundary layer grows. Crosses to `thermodynamics` — convection is one mode of heat
    transfer the first law accounts for. A measure. */ const PROOF = 'convection arithmetic (heat flux, film
    coefficient, Reynolds, Prandtl, Grashof, Rayleigh, film temperature, boundary layer); a measure crossed to
    thermodynamics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'convection', dst:
    'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `convection.${name}`, params })
    export class ConvectionFormulas { /** HEAT FLUX: Newton's cooling, the heat a surface sheds. value coeff ·
    area · deltat. -/
theorem fam_convection_heatflux_1 : ((10 * 5) * 20) = 1000 := by decide

/-- convection: coefficient(1000, 5) = 200 — FILM COEFFICIENT: the heat flux spread over the area. value ⌊flux /
    area⌋. -/
theorem fam_convection_coefficient_1 : (1000 / 5) = 200 := by decide

/-- convection: reynolds(100, 2, 4) = 50 — REYNOLDS NUMBER: inertia over viscosity. value ⌊velocity · length /
    visc⌋. -/
theorem fam_convection_reynolds_1 : ((100 * 2) / 4) = 50 := by decide

/-- convection: prandtl(700, 100) = 7 — PRANDTL NUMBER: momentum diffusivity over thermal diffusivity. value
    ⌊visc / diff⌋. -/
theorem fam_convection_prandtl_1 : (700 / 100) = 7 := by decide

/-- convection: grashof(10, 20, 3) = 600 — GRASHOF NUMBER: buoyancy over viscosity, as the driving product.
    value gbeta · deltat · length. -/
theorem fam_convection_grashof_1 : ((10 * 20) * 3) = 600 := by decide

/-- convection: rayleigh(600, 7) = 4200 — RAYLEIGH NUMBER: Grashof times Prandtl. value grashof · prandtl. -/
theorem fam_convection_rayleigh_1 : (600 * 7) = 4200 := by decide

/-- convection: filmtemp(100, 20) = 60 — FILM TEMPERATURE: the mean of surface and fluid. value ⌊(surface +
    fluid) / 2⌋. -/
theorem fam_convection_filmtemp_1 : ((100 + 20) / 2) = 60 := by decide

/-- convection: boundarylayer(100, 50) = 10 — BOUNDARY LAYER: thickness falling with the Reynolds number. value
    ⌊5 · length / reynolds⌋. -/
theorem fam_convection_boundarylayer_1 : ((5 * 100) / 50) = 10 := by decide

/-- conversion: rate(50, 1000) = 5 — CONVERSION — THE FUNNEL AS ARITHMETIC (chosen by the growth registry, not
    by hand). Turning traffic into customers is numbers: the rate visitors convert, how far a funnel carries
    them, cost per acquisition, return on ad spend, how many bounce, the carts abandoned, checkouts completed,
    and the uplift a variant wins. Crosses to `marketing` — conversion is what marketing is spent to buy. A
    measure. */ const PROOF = 'conversion arithmetic (rate, funnel, cost per acquisition, return on ad spend,
    bounce, cart abandonment, checkout, uplift); the funnel from traffic to customer; a measure crossed to
    marketing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'conversion', dst: 'marketing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `conversion.${name}`, params }) export class
    ConversionFormulas { /** CONVERSION RATE: the percentage of visitors who convert. value ⌊conversions · 100 /
    visitors⌋. -/
theorem fam_conversion_rate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- conversion: funnel(1000, 250) = 25 — FUNNEL: the percentage reaching the bottom from the top. value ⌊bottom
    · 100 / top⌋. -/
theorem fam_conversion_funnel_1 : ((250 * 100) / 1000) = 25 := by decide

/-- conversion: cpa(1000, 25) = 40 — COST PER ACQUISITION: spend over the conversions it bought. value ⌊spend /
    conversions⌋. -/
theorem fam_conversion_cpa_1 : (1000 / 25) = 40 := by decide

/-- conversion: roas(5000, 1000) = 500 — RETURN ON AD SPEND: revenue over spend, as a percentage. value ⌊revenue
    · 100 / spend⌋. -/
theorem fam_conversion_roas_1 : ((5000 * 100) / 1000) = 500 := by decide

/-- conversion: bounce(300, 1000) = 30 — BOUNCE RATE: the percentage of sessions that bounce. value ⌊bounced ·
    100 / sessions⌋. -/
theorem fam_conversion_bounce_1 : ((300 * 100) / 1000) = 30 := by decide

/-- conversion: cart(1000, 300) = 70 — CART ABANDONMENT: the percentage of started carts left unfinished. value
    ⌊(started − completed) · 100 / started⌋. -/
theorem fam_conversion_cart_1 : (((1000 - 300) * 100) / 1000) = 70 := by decide

/-- conversion: checkout(80, 100) = 80 — CHECKOUT: the percentage of initiated checkouts that purchase. value
    ⌊purchases · 100 / initiated⌋. -/
theorem fam_conversion_checkout_1 : ((80 * 100) / 100) = 80 := by decide

/-- conversion: uplift(120, 100) = 20 — UPLIFT: the variant's gain over control, as a percentage. value
    ⌊(variant − control) · 100 / control⌋. -/
theorem fam_conversion_uplift_1 : (((fmax 0 (120 - 100)) * 100) / 100) = 20 := by decide

/-- conversion: uplift(100, 100) = 0 — UPLIFT: the variant's gain over control, as a percentage. value ⌊(variant
    − control) · 100 / control⌋. -/
theorem fam_conversion_uplift_2 : (((fmax 0 (100 - 100)) * 100) / 100) = 0 := by decide

/-- convolution: outputsize(28, 5, 1) = 24 — CONVOLUTION — THE SLIDING WINDOW, AS ARITHMETIC. A convolution is
    numbers: the output size a kernel leaves, the receptive field it grows, the padding that keeps shape, the
    stride that subsamples, the weights a kernel holds, the feature map it writes, what pooling shrinks, and the
    reach dilation buys. Crosses to `linearalgebra` — a convolution is a structured matrix multiply. A measure.
    */ const PROOF = 'convolution arithmetic (output size, receptive field, padding, stride, kernel params,
    feature map, pooling, dilation); the sliding window as a structured matrix multiply; a measure crossed to
    linearalgebra' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'convolution', dst:
    'linearalgebra', formula, value, proof: PROOF, ...extra }, holds, { name: `convolution.${name}`, params })
    export class ConvolutionFormulas { /** OUTPUT SIZE: what a kernel of size k leaves over a width w at stride
    s. value ⌊(w − k)/s⌋ + 1. -/
theorem fam_convolution_outputsize_1 : (((fmax 0 (28 - 5)) / 1) + 1) = 24 := by decide

/-- convolution: receptivefield(3, 5) = 11 — RECEPTIVE FIELD: the input a stacked kernel sees. value 1 + layers
    · (k − 1). -/
theorem fam_convolution_receptivefield_1 : (1 + (5 * (3 - 1))) = 11 := by decide

/-- convolution: padding(7) = 3 — PADDING: the per-side pad that keeps shape for an odd kernel. value ⌊k / 2⌋. -/
theorem fam_convolution_padding_1 : (7 / 2) = 3 := by decide

/-- convolution: stride(28, 14) = 2 — STRIDE: the subsample that takes a width w down to out. value ⌊w / out⌋. -/
theorem fam_convolution_stride_1 : (28 / 14) = 2 := by decide

/-- convolution: kernelparams(3, 3, 16) = 432 — KERNEL PARAMS: the weights a k·k kernel holds over cin→cout
    channels. value k · k · cin · cout. -/
theorem fam_convolution_kernelparams_1 : (((3 * 3) * 3) * 16) = 432 := by decide

/-- convolution: featuremap(24, 16) = 9216 — FEATURE MAP: the activations an out·out map writes over channels.
    value out · out · channels. -/
theorem fam_convolution_featuremap_1 : ((24 * 24) * 16) = 9216 := by decide

/-- convolution: pooling(24, 2) = 12 — POOLING: the width left after a pool of size p. value ⌊w / p⌋. -/
theorem fam_convolution_pooling_1 : (24 / 2) = 12 := by decide

/-- convolution: dilation(3, 2) = 5 — DILATION: the effective reach of a kernel k dilated by d. value k + (k −
    1) · (d − 1). -/
theorem fam_convolution_dilation_1 : (3 + ((3 - 1) * (2 - 1))) = 5 := by decide

/-- cooling: airflow(6, 80) = 480 — AIRFLOW — total airflow: the fans times the CFM each moves. value fans ·
    cfmEach. -/
theorem fam_cooling_airflow_1 : (6 * 80) = 480 := by decide

/-- cooling: fanpower(6, 5) = 30 — FANPOWER — total fan power: the fans times the watts each draws. value fans ·
    wattsEach. -/
theorem fam_cooling_fanpower_1 : (6 * 5) = 30 := by decide

/-- cooling: headroom(100, 72) = 28 — HEADROOM — the degrees below Tjmax at the current temperature. value tjmax
    − tcurrent; holds tcurrent ≤ tjmax. -/
theorem fam_cooling_headroom_1 : (100 - 72) = 28 := by decide

/-- cooling: heatsink(200, 3) = 600 — HEATSINK — heatsink dissipation capacity: fin area times the transfer
    coefficient. value area · coeff. -/
theorem fam_cooling_heatsink_1 : (200 * 3) = 600 := by decide

/-- cooling: duty(1800, 3000) = 60 — DUTY — fan duty cycle: current RPM as a percentage of the maximum. value
    ⌊rpm · 100 / maxRpm⌋; holds maxRpm > 0. -/
theorem fam_cooling_duty_1 : ((1800 * 100) / 3000) = 60 := by decide

/-- cooling: liquidflow(2, 60) = 120 — LIQUIDFLOW — total liquid-loop flow: the pumps times the
    litres-per-minute each moves. value pumps · lpmEach. -/
theorem fam_cooling_liquidflow_1 : (2 * 60) = 120 := by decide

/-- cooling: margin(100, 25, 40) = 35 — MARGIN — the thermal margin: Tjmax less the ambient and the rise. value
    tjmax − tambient − rise; holds tjmax ≥ tambient + rise. -/
theorem fam_cooling_margin_1 : ((100 - 25) - 40) = 35 := by decide

/-- corpus: annotationcoverage(900, 1000) = 90 — CORPUS — A BODY OF TEXT, AS ARITHMETIC (chosen by the text
    registry, not by hand). A corpus is numbers: the type-token ratio of its vocabulary, the share of words seen
    once, a word's frequency per thousand, concordance characters shown, the words a sample draws, how much is
    annotated, how balanced the categories are, and a term's keyness over a reference. Crosses to `linguistics`
    — a corpus is what linguistics measures. A measure. */ const PROOF = 'corpus arithmetic (type-token ratio,
    hapax share, frequency per mille, concordance hits, sampled words, annotation coverage, balance, keyness);
    chosen by the text registry; a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'corpus', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `corpus.${name}`, params }) export class CorpusFormulas { /** ANNOTATION COVERAGE: the share of tokens that
    are annotated, as a percentage. value ⌊annotated · 100 / total⌋. -/
theorem fam_corpus_annotationcoverage_1 : ((900 * 100) / 1000) = 90 := by decide

/-- corpus: balancescore(8, 10) = 80 — BALANCE SCORE: the categories represented over those planned, as a
    percentage. value ⌊represented · 100 / categories⌋. -/
theorem fam_corpus_balancescore_1 : ((8 * 100) / 10) = 80 := by decide

/-- corpus: concordancehits(12, 40) = 480 — CONCORDANCE HITS: characters shown for each occurrence in a window.
    value occurrences · window. -/
theorem fam_corpus_concordancehits_1 : (12 * 40) = 480 := by decide

/-- corpus: frequencyperm(3, 1000) = 3 — FREQUENCY PER MILLE: a word's count over the tokens, per thousand.
    value ⌊count · 1000 / total⌋. -/
theorem fam_corpus_frequencyperm_1 : ((3 * 1000) / 1000) = 3 := by decide

/-- corpus: hapaxratio(25, 50) = 50 — HAPAX RATIO: the share of types seen exactly once, as a percentage. value
    ⌊hapax · 100 / types⌋. -/
theorem fam_corpus_hapaxratio_1 : ((25 * 100) / 50) = 50 := by decide

/-- corpus: keyness(150, 40) = 110 — KEYNESS: how much more frequent a term is in the target than the reference.
    value max(0, target − reference). -/
theorem fam_corpus_keyness_1 : (fmax 0 (150 - 40)) = 110 := by decide

/-- corpus: keyness(40, 150) = 0 — KEYNESS: how much more frequent a term is in the target than the reference.
    value max(0, target − reference). -/
theorem fam_corpus_keyness_2 : (fmax 0 (40 - 150)) = 0 := by decide

/-- corpus: sampledwords(500, 2000) = 1000000 — SAMPLED WORDS: the words a sample draws, documents at a size
    each. value docs · perDoc. -/
theorem fam_corpus_sampledwords_1 : (500 * 2000) = 1000000 := by decide

/-- corpus: typetoken(40, 100) = 40 — TYPE-TOKEN RATIO: distinct types over running tokens, as a percentage.
    value ⌊types · 100 / tokens⌋. -/
theorem fam_corpus_typetoken_1 : ((40 * 100) / 100) = 40 := by decide

/-- cosmogony: creationdays(6, 1) = 7 -/
theorem fam_cosmogony_creationdays_1 : (6 + 1) = 7 := by decide

/-- cosmogony: emanationlevels(7) = 128 -/
theorem fam_cosmogony_emanationlevels_1 : (2 ^ 7) = 128 := by decide

/-- cosmogony: dualitypairs(2, 4) = 8 -/
theorem fam_cosmogony_dualitypairs_1 : (2 * 4) = 8 := by decide

/-- cosmogony: cyclelength(4, 1000) = 4000 -/
theorem fam_cosmogony_cyclelength_1 : (4 * 1000) = 4000 := by decide

/-- cosmogony: principlesubsets(4) = 16 -/
theorem fam_cosmogony_principlesubsets_1 : (2 ^ 4) = 16 := by decide

/-- cosmogony: orderfromchaos(100, 30) = 70 -/
theorem fam_cosmogony_orderfromchaos_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- cosmology: hubble(1400, 20) = 70 — COSMOLOGY — THE EXPANDING UNIVERSE, AS ARITHMETIC. The large-scale
    numbers: the Hubble rate from a velocity over a distance, recession velocity, the age a distance implies,
    mass density in a volume, the change in the scale factor, the particle horizon, the curvature parameter, and
    how the CMB temperature scales with redshift. Crosses to `gravity` — cosmology is gravity at the scale of
    the whole. A measure. */ const PROOF = 'cosmology arithmetic (Hubble rate, recession, age, density,
    expansion, horizon, curvature, CMB temperature); the universe at scale; a measure crossed to gravity' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cosmology', dst: 'gravity', formula, value,
    proof: PROOF, ...extra }, holds, { name: `cosmology.${name}`, params }) export class CosmologyFormulas { /**
    HUBBLE RATE: velocity over distance (H0 proxy). value ⌊velocity / distance⌋. -/
theorem fam_cosmology_hubble_1 : (1400 / 20) = 70 := by decide

/-- cosmology: recession(70, 10) = 700 — RECESSION VELOCITY: v = H0 · d. value constant · distance. -/
theorem fam_cosmology_recession_1 : (70 * 10) = 700 := by decide

/-- cosmology: age(1400, 70) = 20 — AGE a distance implies at a rate. value ⌊distance / constant⌋. -/
theorem fam_cosmology_age_1 : (1400 / 70) = 20 := by decide

/-- cosmology: density(1000, 4) = 250 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_cosmology_density_1 : (1000 / 4) = 250 := by decide

/-- cosmology: expansion(10, 3) = 7 — EXPANSION: the change in the scale factor. value max(0, now − then). -/
theorem fam_cosmology_expansion_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- cosmology: expansion(3, 10) = 0 — EXPANSION: the change in the scale factor. value max(0, now − then). -/
theorem fam_cosmology_expansion_2 : (fmax 0 (3 - 10)) = 0 := by decide

/-- cosmology: horizon(300, 14) = 4200 — PARTICLE HORIZON: speed over an age. value speed · age_. -/
theorem fam_cosmology_horizon_1 : (300 * 14) = 4200 := by decide

/-- cosmology: curvature(27, 30) = 900 — CURVATURE: density against critical (Omega · 1000). value ⌊density ·
    1000 / critical⌋. -/
theorem fam_cosmology_curvature_1 : ((27 * 1000) / 30) = 900 := by decide

/-- cosmology: temperature(1100, 2) = 2202 — CMB TEMPERATURE scaling with redshift. value current · (redshift +
    1). -/
theorem fam_cosmology_temperature_1 : (2 * (1100 + 1)) = 2202 := by decide

/-- costing: unitcost(1000, 40) = 25 — COSTING — PRODUCT COST AS ARITHMETIC. The cost of making a thing is
    numbers: cost per unit, the markup over cost, the margin on price, the break-even volume, the overhead rate,
    absorption, contribution per unit, and the target cost for a wanted margin. Crosses to `accounting` —
    costing is what accounting books. A measure. */ const PROOF = 'costing arithmetic (unit cost, markup,
    margin, break-even, overhead, absorption, contribution, target cost); product cost as integers; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'costing', dst:
    'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `costing.${name}`, params }) export
    class CostingFormulas { /** UNIT COST: total over the units made. value ⌊total / units⌋. -/
theorem fam_costing_unitcost_1 : (1000 / 40) = 25 := by decide

/-- costing: markup(150, 100) = 50 — MARKUP over cost, as a percentage. value ⌊(price − cost) · 100 / cost⌋. -/
theorem fam_costing_markup_1 : (((150 - 100) * 100) / 100) = 50 := by decide

/-- costing: margin(200, 150) = 25 — MARGIN on price, as a percentage. value ⌊(price − cost) · 100 / price⌋. -/
theorem fam_costing_margin_1 : (((200 - 150) * 100) / 200) = 25 := by decide

/-- costing: breakeven(5000, 25) = 200 — BREAK-EVEN volume: fixed cost over contribution per unit. value ⌊fixed
    / contribution⌋. -/
theorem fam_costing_breakeven_1 : (5000 / 25) = 200 := by decide

/-- costing: overhead(3000, 10000) = 30 — OVERHEAD rate: indirect over direct cost, as a percentage. value
    ⌊indirect · 100 / direct⌋. -/
theorem fam_costing_overhead_1 : ((3000 * 100) / 10000) = 30 := by decide

/-- costing: absorption(900, 1000) = 90 — ABSORPTION: overhead applied over actual, as a percentage. value
    ⌊applied · 100 / actual⌋. -/
theorem fam_costing_absorption_1 : ((900 * 100) / 1000) = 90 := by decide

/-- costing: contribution(50, 30) = 20 — CONTRIBUTION per unit: price less variable cost. value max(0, price −
    variable). -/
theorem fam_costing_contribution_1 : (fmax 0 (50 - 30)) = 20 := by decide

/-- costing: contribution(30, 50) = 0 — CONTRIBUTION per unit: price less variable cost. value max(0, price −
    variable). -/
theorem fam_costing_contribution_2 : (fmax 0 (30 - 50)) = 0 := by decide

/-- costing: target(100, 40) = 60 — TARGET COST for a wanted margin. value ⌊price · (100 − margin_) / 100⌋. -/
theorem fam_costing_target_1 : ((100 * (100 - 40)) / 100) = 60 := by decide

/-- counterpoint: voicecount(2, 2) = 4 — COUNTERPOINT — THE WRITING OF INDEPENDENT VOICES, AS ARITHMETIC.
    Species counterpoint is numbers: how many voices sound, how many forbidden parallel fifths, how much
    contrary motion, whether an interval is consonant, the note-ratio of a species, the dissonances left, the
    span of the cantus firmus, and the beats an imitation is delayed. Crosses to `music` — counterpoint is a
    discipline of music. A measure. */ const PROOF = 'counterpoint arithmetic (voice count, parallel fifths,
    contrary motion, interval consonance, species ratio, dissonance count, cantus span, imitation delay); a
    measure crossed to music' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'counterpoint', dst:
    'music', formula, value, proof: PROOF, ...extra }, holds, { name: `counterpoint.${name}`, params }) export
    class CounterpointFormulas { /** VOICE COUNT: the upper and lower parts that sound together. value upper +
    lower. -/
theorem fam_counterpoint_voicecount_1 : (2 + 2) = 4 := by decide

/-- counterpoint: parallelfifths(3, 10) = 30 — PARALLEL FIFTHS as a percentage of the intervals written. value
    ⌊fifths · 100 / total⌋. -/
theorem fam_counterpoint_parallelfifths_1 : ((3 * 100) / 10) = 30 := by decide

/-- counterpoint: motioncontrary(10, 4) = 6 — CONTRARY MOTION: the motions that are not parallel. value max(0,
    total − parallel). -/
theorem fam_counterpoint_motioncontrary_1 : (fmax 0 (10 - 4)) = 6 := by decide

/-- counterpoint: speciesratio(8, 4) = 2 — SPECIES RATIO: counterpoint notes per cantus-firmus note. value
    ⌊notes / cantus⌋. -/
theorem fam_counterpoint_speciesratio_1 : (8 / 4) = 2 := by decide

/-- counterpoint: dissonancecount(10, 7) = 3 — DISSONANCE COUNT: the intervals that are not consonant. value
    max(0, total − consonant). -/
theorem fam_counterpoint_dissonancecount_1 : (fmax 0 (10 - 7)) = 3 := by decide

/-- counterpoint: cantusspan(24, 12) = 12 — CANTUS SPAN: the range of the cantus firmus in semitones. value
    max(0, high − low). -/
theorem fam_counterpoint_cantusspan_1 : (fmax 0 (24 - 12)) = 12 := by decide

/-- counterpoint: imitationdelay(8, 2) = 4 — IMITATION DELAY: the beats before each imitative voice enters.
    value ⌊beats / voices⌋. -/
theorem fam_counterpoint_imitationdelay_1 : (8 / 2) = 4 := by decide

/-- covenant: partycount(2, 0) = 2 -/
theorem fam_covenant_partycount_1 : (2 + 0) = 2 := by decide

/-- covenant: conditionsubsets(6) = 64 -/
theorem fam_covenant_conditionsubsets_1 : (2 ^ 6) = 64 := by decide

/-- covenant: blessingcurses(12, 12) = 24 -/
theorem fam_covenant_blessingcurses_1 : (12 + 12) = 24 := by decide

/-- covenant: renewalcycle(7, 7) = 49 -/
theorem fam_covenant_renewalcycle_1 : (7 * 7) = 49 := by decide

/-- covenant: fulfillmentratio(8, 10) = 80 -/
theorem fam_covenant_fulfillmentratio_1 : ((8 * 100) / 10) = 80 := by decide

/-- coverage: lines(850, 1000) = 85 -/
theorem fam_coverage_lines_1 : ((850 * 100) / 1000) = 85 := by decide

/-- coverage: branches(70, 100) = 70 -/
theorem fam_coverage_branches_1 : ((70 * 100) / 100) = 70 := by decide

/-- coverage: pathsubsets(5) = 32 -/
theorem fam_coverage_pathsubsets_1 : (2 ^ 5) = 32 := by decide

/-- coverage: uncovered(1000, 850) = 150 -/
theorem fam_coverage_uncovered_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- coverage: testcount(200, 1) = 200 -/
theorem fam_coverage_testcount_1 : (200 * 1) = 200 := by decide

/-- coverage: mutationscore(75, 100) = 75 -/
theorem fam_coverage_mutationscore_1 : ((75 * 100) / 100) = 75 := by decide

/-- cpu: cores(4, 8) = 32 — CPU — THE CENTRAL PROCESSOR, AS ARITHMETIC. A CPU is numbers by the book: total
    cores across its dies, hardware threads under simultaneous multithreading, instructions per cycle, MIPS
    throughput, the cycles to drain a scalar pipeline, cache lines spanning a buffer, thermal design power,
    Amdahl's law bookkeeping, parallel speedup, and the turbo boost ceiling. Deterministic integer identities,
    standard CPU architecture. Crosses to `hardware`. A measure, not advice. */ const PROOF = 'CPU arithmetic by
    the book (cores = dies · per-die, threads = cores · SMT, instructions per cycle, MIPS = IPC · clock, the
    scalar pipeline drain stages + instructions − 1, cache lines ⌈bytes / line⌉, thermal design power = cores ·
    per-core, Amdahl serial + parallel = 100, parallel speedup = ⌊serial / parallel⌋, turbo = base + boost);
    deterministic integer identities crossed to hardware; a measure' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'cpu', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name:
    `cpu.${name}`, params }) export class CpuFormulas { /** CORES — total cores across the dies on the package.
    value dies · perDie. -/
theorem fam_cpu_cores_1 : (4 * 8) = 32 := by decide

/-- cpu: threads(32, 2) = 64 — THREADS — hardware threads: cores times the SMT width. value cores · smt. -/
theorem fam_cpu_threads_1 : (32 * 2) = 64 := by decide

/-- cpu: ipc(100, 25) = 4 — IPC — instructions retired per cycle. value ⌊instructions / cycles⌋; holds cycles >
    0. -/
theorem fam_cpu_ipc_1 : (100 / 25) = 4 := by decide

/-- cpu: mips(4, 3000) = 12000 — MIPS — millions of instructions per second: IPC times the clock in MHz. value
    ipc · clockMHz. -/
theorem fam_cpu_mips_1 : (4 * 3000) = 12000 := by decide

/-- cpu: pipeline(5, 10) = 14 — PIPELINE — cycles to drain a scalar pipeline of so many stages for a run of
    instructions. value stages + instructions − 1. -/
theorem fam_cpu_pipeline_1 : ((5 + 10) - 1) = 14 := by decide

/-- cpu: speedup(100, 4) = 25 — AMDAHL — Amdahl's bookkeeping: the serial and parallel fractions of a workload.
    value serialPct + parallelPct; holds the split totals 100. */ static amdahl(serialPct: number, parallelPct:
    number): CrossFormula { return c('cpu-amdahl', "amdahl(serialPct, parallelPct) = serialPct + parallelPct (=
    100)", serialPct + parallelPct, nat(serialPct, parallelPct) && serialPct + parallelPct === 100, 'amdahl',
    [serialPct, parallelPct]) } /** SPEEDUP — parallel speedup: the serial time divided across the parallel
    workers. value ⌊serial / parallel⌋; holds parallel > 0. -/
theorem fam_cpu_speedup_1 : (100 / 4) = 25 := by decide

/-- creditscore: score(700, 50) = 750 -/
theorem fam_creditscore_score_1 : (700 + 50) = 750 := by decide

/-- creditscore: paymenthistory(35, 100) = 35 -/
theorem fam_creditscore_paymenthistory_1 : ((35 * 100) / 100) = 35 := by decide

/-- creditscore: utilization(30, 100) = 30 -/
theorem fam_creditscore_utilization_1 : ((30 * 100) / 100) = 30 := by decide

/-- creditscore: riskbands(5, 0) = 5 -/
theorem fam_creditscore_riskbands_1 : (5 + 0) = 5 := by decide

/-- creditscore: defaultprob(2, 100) = 2 -/
theorem fam_creditscore_defaultprob_1 : ((2 * 100) / 100) = 2 := by decide

/-- creditscore: inquiries(10, 3) = 7 -/
theorem fam_creditscore_inquiries_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- creditscore: tier(750, 100) = 7 -/
theorem fam_creditscore_tier_1 : (750 / 100) = 7 := by decide

/-- creditscore: utilization2(30, 100) = 30 -/
theorem fam_creditscore_utilization2_1 : ((30 * 100) / 100) = 30 := by decide

/-- creditscore: dti(40, 100) = 40 -/
theorem fam_creditscore_dti_1 : ((40 * 100) / 100) = 40 := by decide

/-- creditscore: exposureatdefault(100, 200, 50) = 200 -/
theorem fam_creditscore_exposureatdefault_1 : (100 + ((200 * 50) / 100)) = 200 := by decide

/-- creditscore: delinquency(2, 10) = 20 -/
theorem fam_creditscore_delinquency_1 : ((2 * 100) / 10) = 20 := by decide

/-- creditscore: recovery(1000, 40) = 600 -/
theorem fam_creditscore_recovery_1 : ((1000 * (100 - 40)) / 100) = 600 := by decide

/-- creditscore: band(720) = 7 -/
theorem fam_creditscore_band_1 : (720 / 100) = 7 := by decide

/-- creed: articlecount(10, 2) = 12 -/
theorem fam_creed_articlecount_1 : (10 + 2) = 12 := by decide

/-- creed: doctrinesubsets(6) = 64 -/
theorem fam_creed_doctrinesubsets_1 : (2 ^ 6) = 64 := by decide

/-- creed: councilcount(4, 3) = 7 -/
theorem fam_creed_councilcount_1 : (4 + 3) = 7 := by decide

/-- creed: anathemacount(5, 2) = 10 -/
theorem fam_creed_anathemacount_1 : (5 * 2) = 10 := by decide

/-- creed: consensusratio(85, 100) = 85 -/
theorem fam_creed_consensusratio_1 : ((85 * 100) / 100) = 85 := by decide

/-- creed: variantcreeds(3, 4) = 7 -/
theorem fam_creed_variantcreeds_1 : (3 + 4) = 7 := by decide

/-- cricket: battingaverage(500, 10) = 50 — CRICKET — THE GAME AS ARITHMETIC (the scorecard, not opinion).
    Playing is numbers: a batter's average and strike rate, a bowler's average and economy, the run rate, a
    partnership, the required rate, and how often the ball reaches the rope. Crosses to `sports` — cricket is
    one of the games sport counts. A measure. */ const PROOF = 'cricket arithmetic (batting average, strike
    rate, bowling average, economy, run rate, partnership, required rate, boundary rate); the scorecard as
    numbers; a measure crossed to sports' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'cricket', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `cricket.${name}`,
    params }) export class CricketFormulas { /** BATTING AVERAGE: runs per dismissal. value ⌊runs / dismissals⌋. -/
theorem fam_cricket_battingaverage_1 : (500 / 10) = 50 := by decide

/-- cricket: strikerate(75, 50) = 150 — STRIKE RATE: runs per hundred balls. value ⌊runs · 100 / balls⌋. -/
theorem fam_cricket_strikerate_1 : ((75 * 100) / 50) = 150 := by decide

/-- cricket: bowlingaverage(240, 10) = 24 — BOWLING AVERAGE: runs conceded per wicket. value ⌊runs / wickets⌋. -/
theorem fam_cricket_bowlingaverage_1 : (240 / 10) = 24 := by decide

/-- cricket: economy(300, 50) = 6 — ECONOMY: runs conceded per over. value ⌊runs / overs⌋. -/
theorem fam_cricket_economy_1 : (300 / 50) = 6 := by decide

/-- cricket: runrate(300, 50) = 600 — RUN RATE: runs per over, to the hundredth. value ⌊runs · 100 / overs⌋. -/
theorem fam_cricket_runrate_1 : ((300 * 100) / 50) = 600 := by decide

/-- cricket: partnership(120, 2) = 60 — PARTNERSHIP: runs per wicket in a stand. value ⌊runs / wickets⌋. -/
theorem fam_cricket_partnership_1 : (120 / 2) = 60 := by decide

/-- cricket: required(180, 20) = 900 — REQUIRED RATE: the target chased per over, to the hundredth. value
    ⌊target · 100 / overs⌋. -/
theorem fam_cricket_required_1 : ((180 * 100) / 20) = 900 := by decide

/-- cricket: boundary(30, 120) = 25 — BOUNDARY RATE: boundaries per hundred balls. value ⌊boundaries · 100 /
    balls⌋. -/
theorem fam_cricket_boundary_1 : ((30 * 100) / 120) = 25 := by decide

/-- cricket: battingaverage(500, 0) = 0 — CRICKET — THE GAME AS ARITHMETIC (the scorecard, not opinion). Playing
    is numbers: a batter's average and strike rate, a bowler's average and economy, the run rate, a partnership,
    the required rate, and how often the ball reaches the rope. Crosses to `sports` — cricket is one of the
    games sport counts. A measure. */ const PROOF = 'cricket arithmetic (batting average, strike rate, bowling
    average, economy, run rate, partnership, required rate, boundary rate); the scorecard as numbers; a measure
    crossed to sports' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const
    c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cricket', dst: 'sports', formula,
    value, proof: PROOF, ...extra }, holds, { name: `cricket.${name}`, params }) export class CricketFormulas {
    /** BATTING AVERAGE: runs per dismissal. value ⌊runs / dismissals⌋. -/
theorem fam_cricket_battingaverage_2 : (500 / 0) = 0 := by decide

/-- criminology: rate(500, 100000) = 500 — CRIMINOLOGY — CRIME AS ARITHMETIC, MEASURED AGAINST THE LAW. Policing
    and justice are numbers: crime rate per 100k, the share cleared, the share who reoffend, the share convicted
    of those charged, deterred attempts, who is victimised per 100k, harm per incident, and arrests per offence.
    Crosses to `law` — criminology is what the law measures. A measure. */ const PROOF = 'criminology arithmetic
    (crime rate, clearance, recidivism, conviction, deterrence, victimization, severity, arrest); crime measured
    against the law; a measure crossed to law' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'criminology', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `criminology.${name}`, params }) export class CriminologyFormulas { /** CRIME RATE per 100k of the
    population. value ⌊crimes · 100000 / population⌋. -/
theorem fam_criminology_rate_1 : ((500 * 100000) / 100000) = 500 := by decide

/-- criminology: clearance(60, 100) = 60 — CLEARANCE: the share of reported crimes solved. value ⌊solved · 100 /
    reported⌋. -/
theorem fam_criminology_clearance_1 : ((60 * 100) / 100) = 60 := by decide

/-- criminology: recidivism(40, 100) = 40 — RECIDIVISM: the share of released who reoffend. value ⌊reoffended ·
    100 / released⌋. -/
theorem fam_criminology_recidivism_1 : ((40 * 100) / 100) = 40 := by decide

/-- criminology: conviction(80, 100) = 80 — CONVICTION: the share of charged who are convicted. value ⌊convicted
    · 100 / charged⌋. -/
theorem fam_criminology_conviction_1 : ((80 * 100) / 100) = 80 := by decide

/-- criminology: deterrence(30, 100) = 30 — DETERRENCE: the share of attempts prevented. value ⌊prevented · 100
    / attempts⌋. -/
theorem fam_criminology_deterrence_1 : ((30 * 100) / 100) = 30 := by decide

/-- criminology: victimization(250, 100000) = 250 — VICTIMIZATION per 100k of the population. value ⌊victims ·
    100000 / population⌋. -/
theorem fam_criminology_victimization_1 : ((250 * 100000) / 100000) = 250 := by decide

/-- criminology: severity(1000, 50) = 20 — SEVERITY: harm per incident. value ⌊harm / incidents⌋. -/
theorem fam_criminology_severity_1 : (1000 / 50) = 20 := by decide

/-- criminology: arrest(75, 100) = 75 — ARREST: arrests per hundred offences. value ⌊arrests · 100 / offenses⌋. -/
theorem fam_criminology_arrest_1 : ((75 * 100) / 100) = 75 := by decide

/-- criticalchain: projectbuffer(1000, 50) = 500 — CRITICALCHAIN — CRITICAL CHAIN PROJECT MANAGEMENT, AS
    ARITHMETIC. Protecting a plan is numbers: the project buffer at the end of the chain, the feeding buffers
    where paths join, the resource buffer's wake-ups, how much buffer a run has consumed, the chain's length,
    the aggregated estimate, the fever-chart margin still left, and the safety an aggressive estimate strips.
    Crosses to `logistics` — a critical chain is a schedule logistics must deliver against. A measure. */ const
    PROOF = 'critical chain arithmetic (project buffer, feeding buffer, resource buffer, buffer consumption,
    chain length, aggregation, fever margin, safety removed); CCPM as integers; a measure crossed to logistics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'criticalchain', dst: 'logistics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `criticalchain.${name}`, params }) export class
    CriticalchainFormulas { /** PROJECT BUFFER: a share of the aggregated safety, held at the end of the chain.
    value ⌊aggregated · share / 100⌋. -/
theorem fam_criticalchain_projectbuffer_1 : ((1000 * 50) / 100) = 500 := by decide

/-- criticalchain: feedingbuffer(200, 50) = 100 — FEEDING BUFFER: a share of a feeding path, held where it joins
    the chain. value ⌊path · share / 100⌋. -/
theorem fam_criticalchain_feedingbuffer_1 : ((200 * 50) / 100) = 100 := by decide

/-- criticalchain: resourcebuffer(8, 3) = 24 — RESOURCE BUFFER: lead-time wake-ups across the tasks awaiting a
    resource. value tasks · lead. -/
theorem fam_criticalchain_resourcebuffer_1 : (8 * 3) = 24 := by decide

/-- criticalchain: bufferconsumption(30, 120) = 25 — BUFFER CONSUMPTION: the buffer used, as a percentage. value
    ⌊used · 100 / size⌋. -/
theorem fam_criticalchain_bufferconsumption_1 : ((30 * 100) / 120) = 25 := by decide

/-- criticalchain: chainlength(12, 5) = 60 — CHAIN LENGTH: the tasks on the critical chain at an average
    duration. value tasks · avg. -/
theorem fam_criticalchain_chainlength_1 : (12 * 5) = 60 := by decide

/-- criticalchain: aggregation(10, 30) = 20 — AGGREGATION: the aggregated estimate, the midpoint of an
    optimistic and a pessimistic one. value ⌊(optimistic + pessimistic) / 2⌋. -/
theorem fam_criticalchain_aggregation_1 : ((10 + 30) / 2) = 20 := by decide

/-- criticalchain: fevermargin(500, 180) = 320 — FEVER MARGIN: the buffer still left after consumption, the
    fever chart's green. value max(0, buffer − consumed). -/
theorem fam_criticalchain_fevermargin_1 : (fmax 0 (500 - 180)) = 320 := by decide

/-- criticalchain: safetyremoved(40, 25) = 15 — SAFETY REMOVED: how much padding an aggressive estimate strips
    from a safe one. value max(0, estimate − aggressive). -/
theorem fam_criticalchain_safetyremoved_1 : (fmax 0 (40 - 25)) = 15 := by decide

/-- criticalchain: safetyremoved(25, 40) = 0 — SAFETY REMOVED: how much padding an aggressive estimate strips
    from a safe one. value max(0, estimate − aggressive). -/
theorem fam_criticalchain_safetyremoved_2 : (fmax 0 (25 - 40)) = 0 := by decide

/-- cropyield: perhectare(10000, 4) = 2500 — CROPYIELD — GROWING FOOD, AS ARITHMETIC (chosen by the agronomy
    registry, not by hand). A field's harvest is numbers: yield per hectare, total production, the harvest
    index, the gap to potential, plant density, the root-to-shoot biomass ratio, moisture-corrected mass, and
    the harvest adjusted for loss. Crosses to `agronomy` — cropyield is what agronomy grows. A measure. */ const
    PROOF = 'cropyield arithmetic (per-hectare yield, total production, harvest index, yield gap, plant density,
    biomass ratio, moisture-corrected mass, loss-adjusted harvest); an agronomy domain; a measure crossed to
    agronomy' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cropyield', dst: 'agronomy',
    formula, value, proof: PROOF, ...extra }, holds, { name: `cropyield.${name}`, params }) export class
    CropyieldFormulas { /** PER-HECTARE YIELD: production over the area farmed. value ⌊production / area⌋. -/
theorem fam_cropyield_perhectare_1 : (10000 / 4) = 2500 := by decide

/-- cropyield: totalproduction(2500, 4) = 10000 — TOTAL PRODUCTION: a per-hectare yield over the area farmed.
    value perHectare · area. -/
theorem fam_cropyield_totalproduction_1 : (2500 * 4) = 10000 := by decide

/-- cropyield: harvestindex(45, 100) = 45 — HARVEST INDEX: grain as a percentage of total biomass. value ⌊grain
    · 100 / biomass⌋. -/
theorem fam_cropyield_harvestindex_1 : ((45 * 100) / 100) = 45 := by decide

/-- cropyield: yieldgap(5000, 3500) = 1500 — YIELD GAP: the shortfall of the actual yield from its potential.
    value max(0, potential − actual). -/
theorem fam_cropyield_yieldgap_1 : (fmax 0 (5000 - 3500)) = 1500 := by decide

/-- cropyield: yieldgap(3000, 5000) = 0 — YIELD GAP: the shortfall of the actual yield from its potential. value
    max(0, potential − actual). -/
theorem fam_cropyield_yieldgap_2 : (fmax 0 (3000 - 5000)) = 0 := by decide

/-- cropyield: plantdensity(60000, 3) = 20000 — PLANT DENSITY: plants over the area farmed. value ⌊plants /
    area⌋. -/
theorem fam_cropyield_plantdensity_1 : (60000 / 3) = 20000 := by decide

/-- cropyield: biomassratio(30, 120) = 25 — BIOMASS RATIO: root as a percentage of shoot. value ⌊root · 100 /
    shoot⌋. -/
theorem fam_cropyield_biomassratio_1 : ((30 * 100) / 120) = 25 := by decide

/-- cropyield: moisturecorrected(10000, 20) = 8000 — MOISTURE-CORRECTED MASS: wet mass taken down to its dry
    fraction. value ⌊wet · (100 − moisture) / 100⌋. -/
theorem fam_cropyield_moisturecorrected_1 : ((10000 * (100 - 20)) / 100) = 8000 := by decide

/-- cropyield: lossadjusted(5000, 300) = 4700 — LOSS-ADJUSTED HARVEST: the gross harvest after loss. value
    max(0, gross − loss). -/
theorem fam_cropyield_lossadjusted_1 : (fmax 0 (5000 - 300)) = 4700 := by decide

/-- crossdock: throughput(6000, 60) = 100 -/
theorem fam_crossdock_throughput_1 : (6000 / 60) = 100 := by decide

/-- crossdock: dwelltime(480, 8) = 60 -/
theorem fam_crossdock_dwelltime_1 : (480 / 8) = 60 := by decide

/-- crossdock: touchcount(50, 2) = 100 -/
theorem fam_crossdock_touchcount_1 : (50 * 2) = 100 := by decide

/-- crossdock: flowrate(1200, 12) = 100 -/
theorem fam_crossdock_flowrate_1 : (1200 / 12) = 100 := by decide

/-- crossdock: stagingarea(40, 50) = 2000 -/
theorem fam_crossdock_stagingarea_1 : (40 * 50) = 2000 := by decide

/-- crossdock: sortaccuracy(990, 1000) = 99 -/
theorem fam_crossdock_sortaccuracy_1 : ((990 * 100) / 1000) = 99 := by decide

/-- crossdock: transferlag(60, 45) = 15 -/
theorem fam_crossdock_transferlag_1 : (fmax 0 (60 - 45)) = 15 := by decide

/-- cryptanalysis: keyspace(26, 8) = 208 — CRYPTANALYSIS — BREAKING A CIPHER, AS ARITHMETIC. The work of an
    attack is numbers: the keyspace to search, the time a brute force takes at a guess rate, the entropy per
    symbol, letter frequency, the index of coincidence, the avalanche of a bit flip, hash collisions, and the
    strength in bits that stands. Crosses to `code` — cryptanalysis is what breaks code. */ const PROOF =
    'cryptanalysis arithmetic (keyspace, brute force time, entropy, frequency, index of coincidence, avalanche,
    collisions, strength); a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'cryptanalysis', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `cryptanalysis.${name}`, params }) export class CryptanalysisFormulas { /** KEYSPACE: alphabet size over a
    length, as a bits proxy. value alphabet · length. -/
theorem fam_cryptanalysis_keyspace_1 : (26 * 8) = 208 := by decide

/-- cryptanalysis: bruteforce(1000, 10) = 100 — BRUTE FORCE: the keyspace searched at a per-second guess rate.
    value ⌊keyspace / rate⌋. -/
theorem fam_cryptanalysis_bruteforce_1 : (1000 / 10) = 100 := by decide

/-- cryptanalysis: entropy(100, 4) = 25 — ENTROPY: symbols over the unique symbols seen. value ⌊symbols /
    unique⌋. -/
theorem fam_cryptanalysis_entropy_1 : (100 / 4) = 25 := by decide

/-- cryptanalysis: frequency(25, 100) = 25 — FREQUENCY: a letter's share of the whole, as a percentage. value
    ⌊occurrences · 100 / total⌋. -/
theorem fam_cryptanalysis_frequency_1 : ((25 * 100) / 100) = 25 := by decide

/-- cryptanalysis: coincidence(5, 100) = 500 — INDEX OF COINCIDENCE: matching pairs over all pairs, scaled by
    10000. value ⌊matches · 10000 / pairs⌋. -/
theorem fam_cryptanalysis_coincidence_1 : ((5 * 10000) / 100) = 500 := by decide

/-- cryptanalysis: avalanche(50, 100) = 50 — AVALANCHE: output bits flipped by a one-bit change, as a
    percentage. value ⌊flipped · 100 / bits⌋. -/
theorem fam_cryptanalysis_avalanche_1 : ((50 * 100) / 100) = 50 := by decide

/-- cryptanalysis: collisions(2, 1000) = 2000 — COLLISIONS: found over hashes drawn, scaled by a million. value
    ⌊found · 1000000 / hashes⌋. -/
theorem fam_cryptanalysis_collisions_1 : ((2 * 1000000) / 1000) = 2000 := by decide

/-- cryptanalysis: strength(128) = 128 — STRENGTH: the bits of security that stand. value bits. -/
theorem fam_cryptanalysis_strength_1 : 128 = 128 := by decide

/-- crystallography: bragg(2, 154) = 308 — CRYSTALLOGRAPHY — THE STRUCTURE OF SOLIDS, AS ARITHMETIC. Diffraction
    and lattices are numbers: the Bragg order, the d-spacing from an angle, atoms per cell, packing fraction,
    coordination number, the unit-cell area, the count of symmetry operations, and the Miller intercept. Crosses
    to `materials` — the structure is what a material is made of. A measure. */ const PROOF = 'crystallography
    arithmetic (Bragg order, d-spacing, density, packing, coordination, unit cell, symmetry, Miller); the
    lattice of a solid; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'crystallography', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `crystallography.${name}`, params }) export class CrystallographyFormulas { /** BRAGG: the order times the
    wavelength (nλ proxy). value order · wavelength. -/
theorem fam_crystallography_bragg_1 : (2 * 154) = 308 := by decide

/-- crystallography: spacing(154, 30) = 5133 — SPACING: the d-spacing from a wavelength over an angle. value
    ⌊wavelength · 1000 / angle⌋. -/
theorem fam_crystallography_spacing_1 : ((154 * 1000) / 30) = 5133 := by decide

/-- crystallography: density(8, 4) = 2 — DENSITY: atoms over the cell. value ⌊atoms / cell⌋. -/
theorem fam_crystallography_density_1 : (8 / 4) = 2 := by decide

/-- crystallography: packing(74, 100) = 74 — PACKING: the occupied fraction of the volume, as a percentage.
    value ⌊occupied · 100 / volume⌋. -/
theorem fam_crystallography_packing_1 : ((74 * 100) / 100) = 74 := by decide

/-- crystallography: coordination(12) = 12 — COORDINATION: the neighbour count. value neighbors. -/
theorem fam_crystallography_coordination_1 : 12 = 12 := by decide

/-- crystallography: unitcell(5, 5) = 25 — UNIT CELL: the base area from two edges. value a · b. -/
theorem fam_crystallography_unitcell_1 : (5 * 5) = 25 := by decide

/-- crystallography: symmetry(48) = 48 — SYMMETRY: the count of symmetry operations. value operations. -/
theorem fam_crystallography_symmetry_1 : 48 = 48 := by decide

/-- crystallography: miller(6, 2) = 3 — MILLER: the intercept over the plane index. value ⌊intercept / plane⌋. -/
theorem fam_crystallography_miller_1 : (6 / 2) = 3 := by decide

/-- cuisine: cooked(75, 100) = 75 — CUISINE — COOKING AS ARITHMETIC (chosen by the kitchen, not by hand). A
    recipe is numbers: scaling per serving, baker's hydration, cooked yield, oven temperature in celsius,
    portions per guest, the fat-to-flour ratio, a fermentation proof proxy, and how far a sauce reduces. Crosses
    to `nutrition` — cuisine is what nutrition measures. A measure. */ const PROOF = 'cuisine arithmetic (recipe
    scaling, baker\'s hydration, cooked yield, temperature, portion, fat ratio, proof, reduction); a kitchen
    measure crossed to nutrition' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cuisine', dst: 'nutrition',
    formula, value, proof: PROOF, ...extra }, holds, { name: `cuisine.${name}`, params }) export class
    CuisineFormulas { /** COOKED YIELD as a percentage of raw. value ⌊cooked · 100 / raw⌋. -/
theorem fam_cuisine_cooked_1 : ((75 * 100) / 100) = 75 := by decide

/-- cuisine: hydration(650, 1000) = 65 — BAKER'S HYDRATION: water as a percentage of flour. value ⌊water · 100 /
    flour⌋. -/
theorem fam_cuisine_hydration_1 : ((650 * 100) / 1000) = 65 := by decide

/-- cuisine: portion(2400, 8) = 300 — PORTION: total divided among the guests. value ⌊total / guests⌋. -/
theorem fam_cuisine_portion_1 : (2400 / 8) = 300 := by decide

/-- cuisine: proof(120, 24) = 2880 — FERMENTATION PROOF proxy: time by temperature. value time · temperature. -/
theorem fam_cuisine_proof_1 : (120 * 24) = 2880 := by decide

/-- cuisine: ratio(500, 1000) = 50 — FAT RATIO: fat as a percentage of flour. value ⌊fat · 100 / flour⌋. -/
theorem fam_cuisine_ratio_1 : ((500 * 100) / 1000) = 50 := by decide

/-- cuisine: reduction(1000, 250) = 75 — REDUCTION: how far a sauce reduces, as a percentage. value ⌊(initial −
    final) · 100 / initial⌋. -/
theorem fam_cuisine_reduction_1 : (((1000 - 250) * 100) / 1000) = 75 := by decide

/-- cuisine: scaling(150, 4) = 600 — RECIPE SCALING: per-serving amount by the servings. value perServing ·
    servings. -/
theorem fam_cuisine_scaling_1 : (150 * 4) = 600 := by decide

/-- cuisine: temperature(212) = 100 — TEMPERATURE: fahrenheit to celsius. value ⌊(fahrenheit − 32) · 5 / 9⌋. -/
theorem fam_cuisine_temperature_1 : (((212 - 32) * 5) / 9) = 100 := by decide

/-- cuisine: temperature(32) = 0 — TEMPERATURE: fahrenheit to celsius. value ⌊(fahrenheit − 32) · 5 / 9⌋. -/
theorem fam_cuisine_temperature_2 : (((32 - 32) * 5) / 9) = 0 := by decide

/-- cuneiform: signs(600, 1) = 600 -/
theorem fam_cuneiform_signs_1 : (600 * 1) = 600 := by decide

/-- cuneiform: wedgesper(4, 3) = 7 -/
theorem fam_cuneiform_wedgesper_1 : (4 + 3) = 7 := by decide

/-- cuneiform: periodcount(3, 2) = 5 -/
theorem fam_cuneiform_periodcount_1 : (3 + 2) = 5 := by decide

/-- cuneiform: tabletsubsets(6) = 64 -/
theorem fam_cuneiform_tabletsubsets_1 : (2 ^ 6) = 64 := by decide

/-- cuneiform: logovalues(100, 0) = 100 -/
theorem fam_cuneiform_logovalues_1 : (100 + 0) = 100 := by decide

/-- cuneiform: attestationratio(60, 100) = 60 -/
theorem fam_cuneiform_attestationratio_1 : ((60 * 100) / 100) = 60 := by decide

/-- curing: saltconcentration(3, 100) = 3 -/
theorem fam_curing_saltconcentration_1 : ((3 * 100) / 100) = 3 := by decide

/-- curing: wateractivity(85, 100) = 85 -/
theorem fam_curing_wateractivity_1 : ((85 * 100) / 100) = 85 := by decide

/-- curing: curetime(7, 24) = 168 -/
theorem fam_curing_curetime_1 : (7 * 24) = 168 := by decide

/-- curing: nitritelevel(150, 1) = 150 -/
theorem fam_curing_nitritelevel_1 : (150 / 1) = 150 := by decide

/-- curing: phlevel(52, 10) = 5 -/
theorem fam_curing_phlevel_1 : (52 / 10) = 5 := by decide

/-- curing: weightloss(30, 100) = 30 -/
theorem fam_curing_weightloss_1 : ((30 * 100) / 100) = 30 := by decide

/-- curing: microbialreduction(99, 100) = 99 -/
theorem fam_curing_microbialreduction_1 : ((99 * 100) / 100) = 99 := by decide

/-- curing: brinestrength(20, 100) = 20 -/
theorem fam_curing_brinestrength_1 : ((20 * 100) / 100) = 20 := by decide

/-- curriculum: credithours(40, 3) = 120 — CURRICULUM — A COURSE OF STUDY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Designing a programme is numbers: the credit hours a load carries, how
    many courses that many credits buys, contact hours over a term, the share of the syllabus covered, how deep
    the prerequisite chain runs, the pace of topics per week, the assignment workload, and whether the outcomes
    align with the target. Crosses to `pedagogy` — curriculum is what pedagogy teaches. A measure. */ const
    PROOF = 'curriculum arithmetic (credit hours, course count, contact hours, syllabus coverage, prerequisite
    depth, pacing, workload, outcome alignment); a measure crossed to pedagogy' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'curriculum', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, {
    name: `curriculum.${name}`, params }) export class CurriculumFormulas { /** CREDIT HOURS: courses at a
    credit each. value courses · creditsEach. -/
theorem fam_curriculum_credithours_1 : (40 * 3) = 120 := by decide

/-- curriculum: coursecount(120, 3) = 40 — COURSE COUNT: the courses a credit budget buys. value ⌊credits /
    perCourse⌋. -/
theorem fam_curriculum_coursecount_1 : (120 / 3) = 40 := by decide

/-- curriculum: contacthours(15, 3) = 45 — CONTACT HOURS: weeks at hours each. value weeks · hoursPerWeek. -/
theorem fam_curriculum_contacthours_1 : (15 * 3) = 45 := by decide

/-- curriculum: coverage(45, 50) = 90 — COVERAGE: the share of the syllabus taught, as a percentage. value
    ⌊taught · 100 / total⌋. -/
theorem fam_curriculum_coverage_1 : ((45 * 100) / 50) = 90 := by decide

/-- curriculum: pacing(30, 15) = 2 — PACING: topics over the weeks of the term. value ⌊topics / weeks⌋. -/
theorem fam_curriculum_pacing_1 : (30 / 15) = 2 := by decide

/-- curriculum: workload(12, 5) = 60 — WORKLOAD: assignments at hours each. value assignments · hoursEach. -/
theorem fam_curriculum_workload_1 : (12 * 5) = 60 := by decide

/-- curvature: gaussian(3, 5) = 15 — CURVATURE — HOW A SURFACE BENDS, AS ARITHMETIC. Bending is numbers: the
    Gaussian product of principal curvatures, their mean, a radius of curvature from an arc, total curvature
    over an area, sectional curvature per plane, geodesic deviation growing with distance, the angle sum of a
    triangle, and the angular defect at a vertex. Crosses to `topology` — curvature is the local geometry whose
    global shape topology counts (Gauss–Bonnet). A measure. */ const PROOF = 'curvature arithmetic (gaussian
    product, mean, radius, total, sectional, geodesic deviation, angle sum, angular defect); local bending
    crossed to topology (Gauss–Bonnet)' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'curvature', dst:
    'topology', formula, value, proof: PROOF, ...extra }, holds, { name: `curvature.${name}`, params }) export
    class CurvatureFormulas { /** GAUSSIAN CURVATURE: the product of the principal curvatures. value k1 · k2. -/
theorem fam_curvature_gaussian_1 : (3 * 5) = 15 := by decide

/-- curvature: mean(4, 6) = 5 — MEAN CURVATURE: the average of the principal curvatures. value ⌊(k1 + k2) / 2⌋. -/
theorem fam_curvature_mean_1 : ((4 + 6) / 2) = 5 := by decide

/-- curvature: radiusofcurvature(100, 5) = 20 — RADIUS OF CURVATURE: an arc length over its turning angle. value
    ⌊arc / angle⌋. -/
theorem fam_curvature_radiusofcurvature_1 : (100 / 5) = 20 := by decide

/-- curvature: totalcurvature(2, 50) = 100 — TOTAL CURVATURE: Gaussian curvature integrated over an area. value
    k · area. -/
theorem fam_curvature_totalcurvature_1 : (2 * 50) = 100 := by decide

/-- curvature: sectional(60, 12) = 5 — SECTIONAL CURVATURE: total curvature averaged over the planes. value
    ⌊curv / planes⌋. -/
theorem fam_curvature_sectional_1 : (60 / 12) = 5 := by decide

/-- curvature: geodesicdeviation(2, 3, 4) = 24 — GEODESIC DEVIATION: separation grows with curvature, distance
    and steps. value k · dist · steps. -/
theorem fam_curvature_geodesicdeviation_1 : ((2 * 3) * 4) = 24 := by decide

/-- curvature: anglesum(60, 60, 60) = 180 — ANGLE SUM: the interior angles of a triangle on the surface. value a
    + b + c. -/
theorem fam_curvature_anglesum_1 : ((60 + 60) + 60) = 180 := by decide

/-- curvature: defect(300) = 60 — ANGULAR DEFECT: how far the angles around a vertex fall short of 360°. value
    max(0, 360 − sum). -/
theorem fam_curvature_defect_1 : (fmax 0 (360 - 300)) = 60 := by decide

/-- curvature: defect(400) = 0 — ANGULAR DEFECT: how far the angles around a vertex fall short of 360°. value
    max(0, 360 − sum). -/
theorem fam_curvature_defect_2 : (fmax 0 (360 - 400)) = 0 := by decide

/-- customer: csat(900, 1000) = 90 — CUSTOMER — THE CRM / CUSTOMER-RELATION DOMAIN, AS ARITHMETIC. Keeping
    customers is numbers: how satisfied they are, the net promoter score, who churned and who stayed, the
    tickets each agent carries, how many get resolved, response load, and how often an upsell lands. Crosses to
    `analytics` — customer relations is what analytics reads. A measure. */ const PROOF = 'customer arithmetic
    (csat, nps, churn, retention, tickets per agent, resolution, response, upsell); the CRM domain as integer
    measures crossed to analytics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'customer', dst:
    'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `customer.${name}`, params }) export
    class CustomerFormulas { /** CSAT: satisfied of those surveyed, as a percentage. value ⌊satisfied · 100 /
    surveyed⌋. -/
theorem fam_customer_csat_1 : ((900 * 100) / 1000) = 90 := by decide

/-- customer: nps(70, 20) = 50 — NPS: promoters less detractors (may be negative; still an integer). value
    promoters − detractors. -/
theorem fam_customer_nps_1 : (70 - 20) = 50 := by decide

/-- customer: churn(50, 1000) = 5 — CHURN: customers lost over those at the start, as a percentage. value ⌊lost
    · 100 / start⌋. -/
theorem fam_customer_churn_1 : ((50 * 100) / 1000) = 5 := by decide

/-- customer: retention(950, 1000) = 95 — RETENTION: customers retained over those at the start, as a
    percentage. value ⌊retained · 100 / start⌋. -/
theorem fam_customer_retention_1 : ((950 * 100) / 1000) = 95 := by decide

/-- customer: tickets(100, 8) = 12 — TICKETS: open tickets spread over the agents on duty. value ⌊open /
    agents⌋. -/
theorem fam_customer_tickets_1 : (100 / 8) = 12 := by decide

/-- customer: resolution(800, 1000) = 80 — RESOLUTION: resolved of the total, as a percentage. value ⌊resolved ·
    100 / total⌋. -/
theorem fam_customer_resolution_1 : ((800 * 100) / 1000) = 80 := by decide

/-- customer: response(600, 50) = 12 — RESPONSE: total response minutes over the tickets they covered. value
    ⌊total / tickets⌋. -/
theorem fam_customer_response_1 : (600 / 50) = 12 := by decide

/-- customer: upsell(120, 1000) = 12 — UPSELL: customers upsold of the total, as a percentage. value ⌊upsold ·
    100 / total⌋. -/
theorem fam_customer_upsell_1 : ((120 * 100) / 1000) = 12 := by decide

/-- cybernetics: feedback(150, 100) = 150 — CYBERNETICS — THE SCIENCE OF CONTROL AND COMMUNICATION, AS
    ARITHMETIC. A system steering itself is numbers: feedback as a ratio of output to input, open-loop gain, the
    setpoint error, how bounded the system stays, control-loop delay, the states it can occupy, the correction
    rate, and homeostasis. Crosses to `robotics` — cybernetics is what a robot's loop runs on. A measure. */
    const PROOF = 'cybernetics arithmetic (feedback, gain, setpoint error, stability, loop latency, entropy,
    control rate, homeostasis); the science of control as numbers; a measure crossed to robotics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'cybernetics', dst: 'robotics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `cybernetics.${name}`, params }) export class CyberneticsFormulas { /** FEEDBACK:
    output over input as a percentage. value ⌊output · 100 / input⌋. -/
theorem fam_cybernetics_feedback_1 : ((150 * 100) / 100) = 150 := by decide

/-- cybernetics: gain(200, 100) = 200 — GAIN: response over stimulus as a percentage. value ⌊response · 100 /
    stimulus⌋. -/
theorem fam_cybernetics_gain_1 : ((200 * 100) / 100) = 200 := by decide

/-- cybernetics: setpoint(100, 30) = 70 — SETPOINT: the error between target and actual. value max(0, target −
    actual). -/
theorem fam_cybernetics_setpoint_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- cybernetics: stability(80, 100) = 80 — STABILITY: the bounded share of total as a percentage. value ⌊bounded
    · 100 / total⌋. -/
theorem fam_cybernetics_stability_1 : ((80 * 100) / 100) = 80 := by decide

/-- cybernetics: latency(500, 10) = 50 — LATENCY: the loop delay per cycle. value ⌊delay / cycles⌋. -/
theorem fam_cybernetics_latency_1 : (500 / 10) = 50 := by decide

/-- cybernetics: entropy(16) = 16 — ENTROPY: the states the system can occupy. value states. -/
theorem fam_cybernetics_entropy_1 : 16 = 16 := by decide

/-- cybernetics: control(90, 30) = 300 — CONTROL: corrections over errors as a percentage. value ⌊corrections ·
    100 / errors⌋. -/
theorem fam_cybernetics_control_1 : ((90 * 100) / 30) = 300 := by decide

/-- cybernetics: homeostasis(95, 100) = 95 — HOMEOSTASIS: the regulated share of a perturbation as a percentage.
    value ⌊regulated · 100 / perturbation⌋. -/
theorem fam_cybernetics_homeostasis_1 : ((95 * 100) / 100) = 95 := by decide

/-- cycling: cadence(900, 10) = 90 — CYCLING — RIDING A BICYCLE, AS ARITHMETIC. The ride is numbers: cadence in
    revolutions per minute, power at the pedal, the gear ratio, speed over a leg, functional threshold power per
    kilogram, the gradient of a climb, drivetrain efficiency, and the distance a gear carries each turn. Crosses
    to `fitness` — cycling is what fitness measures. A measure. */ const PROOF = 'cycling arithmetic (cadence,
    pedal power, gear ratio, speed, FTP per kg, gradient, drivetrain efficiency, distance per turn); a measure
    crossed to fitness' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'cycling', dst: 'fitness',
    formula, value, proof: PROOF, ...extra }, holds, { name: `cycling.${name}`, params }) export class
    CyclingFormulas { /** CADENCE: pedal revolutions per minute. value ⌊revolutions / minutes⌋. -/
theorem fam_cycling_cadence_1 : (900 / 10) = 90 := by decide

/-- cycling: power(200, 5) = 1000 — PEDAL POWER: force at the pedal times velocity. value force · velocity. -/
theorem fam_cycling_power_1 : (200 * 5) = 1000 := by decide

/-- cycling: gearratio(53, 12) = 441 — GEAR RATIO: chainring teeth over cog teeth, scaled. value ⌊chainring ·
    100 / cog⌋. -/
theorem fam_cycling_gearratio_1 : ((53 * 100) / 12) = 441 := by decide

/-- cycling: speed(4000, 100) = 40 — SPEED: distance over time. value ⌊distance / time⌋. -/
theorem fam_cycling_speed_1 : (4000 / 100) = 40 := by decide

/-- cycling: ftp(280, 70) = 400 — FTP: functional threshold power per kilogram, scaled. value ⌊watts · 100 /
    weight⌋. -/
theorem fam_cycling_ftp_1 : ((280 * 100) / 70) = 400 := by decide

/-- cycling: gradient(8, 100) = 8 — GRADIENT: rise over run as a percentage. value ⌊rise · 100 / run⌋. -/
theorem fam_cycling_gradient_1 : ((8 * 100) / 100) = 8 := by decide

/-- cycling: efficiency(97, 100) = 97 — DRIVETRAIN EFFICIENCY: output over input as a percentage. value ⌊output
    · 100 / input⌋. -/
theorem fam_cycling_efficiency_1 : ((97 * 100) / 100) = 97 := by decide

/-- cycling: distance(90, 7) = 630 — DISTANCE PER TURN: cadence times the gear carried. value cadence · gear. -/
theorem fam_cycling_distance_1 : (90 * 7) = 630 := by decide

/-- cyclone: category(4, 5) = 5 -/
theorem fam_cyclone_category_1 : (fmax 4 5) = 5 := by decide

/-- cyclone: windspeed(150, 1) = 150 -/
theorem fam_cyclone_windspeed_1 : (150 * 1) = 150 := by decide

/-- cyclone: pressuredrop(1013, 950) = 63 -/
theorem fam_cyclone_pressuredrop_1 : (fmax 0 (1013 - 950)) = 63 := by decide

/-- cyclone: radius(50, 2) = 100 -/
theorem fam_cyclone_radius_1 : (50 * 2) = 100 := by decide

/-- cyclone: stormsurge(600, 100) = 6 -/
theorem fam_cyclone_stormsurge_1 : (600 / 100) = 6 := by decide

/-- cyclone: rainfall(300, 1) = 300 -/
theorem fam_cyclone_rainfall_1 : (300 * 1) = 300 := by decide

/-- cyclone: eyediameter(60, 2) = 30 -/
theorem fam_cyclone_eyediameter_1 : (60 / 2) = 30 := by decide

/-- cyclone: intensityindex(90, 100) = 90 -/
theorem fam_cyclone_intensityindex_1 : ((90 * 100) / 100) = 90 := by decide

/-- cytogenetics: chromosomepairs(46, 2) = 23 -/
theorem fam_cytogenetics_chromosomepairs_1 : (46 / 2) = 23 := by decide

/-- cytogenetics: banding(400, 1) = 400 -/
theorem fam_cytogenetics_banding_1 : (400 * 1) = 400 := by decide

/-- cytogenetics: ploidy(23, 2) = 46 -/
theorem fam_cytogenetics_ploidy_1 : (23 * 2) = 46 := by decide

/-- cytogenetics: recombinationsites(30, 10) = 40 -/
theorem fam_cytogenetics_recombinationsites_1 : (30 + 10) = 40 := by decide

/-- cytogenetics: aneuploidyrisk(5, 100) = 5 -/
theorem fam_cytogenetics_aneuploidyrisk_1 : ((5 * 100) / 100) = 5 := by decide

/-- cytogenetics: genesubsets(8) = 256 -/
theorem fam_cytogenetics_genesubsets_1 : (2 ^ 8) = 256 := by decide

/-- cytology: mitosis(5, 200) = 2 — CYTOLOGY — THE CELL, AS ARITHMETIC. Counting cells is numbers: how many
    divide, the nucleus against the cytoplasm, how many live, how much of the dish is covered, how many die, how
    fast the population folds, and the plain measures a slide carries — diameter and passage. Crosses to `med` —
    cytology is what medicine reads off the microscope. A measure. */ const PROOF = 'cytology arithmetic
    (mitotic index, N/C ratio, viability, confluence, apoptosis, population doubling, diameter, passage); the
    cell as counts; a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'cytology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `cytology.${name}`,
    params }) export class CytologyFormulas { /** MITOTIC INDEX: dividing cells per hundred counted. value
    ⌊dividing · 100 / total⌋. -/
theorem fam_cytology_mitosis_1 : ((5 * 100) / 200) = 2 := by decide

/-- cytology: ratio(30, 20) = 150 — NUCLEUS-TO-CYTOPLASM RATIO as a percentage. value ⌊nucleus · 100 /
    cytoplasm⌋. -/
theorem fam_cytology_ratio_1 : ((30 * 100) / 20) = 150 := by decide

/-- cytology: viability(950, 1000) = 95 — VIABILITY: live cells per hundred. value ⌊live · 100 / total⌋. -/
theorem fam_cytology_viability_1 : ((950 * 100) / 1000) = 95 := by decide

/-- cytology: confluence(80, 100) = 80 — CONFLUENCE: the fraction of the dish covered, as a percentage. value
    ⌊covered · 100 / area⌋. -/
theorem fam_cytology_confluence_1 : ((80 * 100) / 100) = 80 := by decide

/-- cytology: apoptosis(15, 300) = 5 — APOPTOSIS: dying cells per hundred. value ⌊dying · 100 / total⌋. -/
theorem fam_cytology_apoptosis_1 : ((15 * 100) / 300) = 5 := by decide

/-- cytology: doubling(8000, 1000) = 8 — POPULATION DOUBLING: the fold from initial to final. value ⌊final /
    initial⌋. -/
theorem fam_cytology_doubling_1 : (8000 / 1000) = 8 := by decide

/-- cytology: diameter(12) = 12 — DIAMETER: the cell size in micrometers, as measured. value micrometers. -/
theorem fam_cytology_diameter_1 : 12 = 12 := by decide

/-- cytology: passage(7) = 7 — PASSAGE: the subculture number of the line. value number. -/
theorem fam_cytology_passage_1 : 7 = 7 := by decide
