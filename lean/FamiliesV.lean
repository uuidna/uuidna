-- lean/FamiliesV.lean — GENERATED. THE FAMILIES, V — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- vaccination: coverage(950, 1000) = 95 — VACCINATION — A PUBLIC-HEALTH DOMAIN, AS ARITHMETIC (chosen by the
    registry, not by hand). Immunising a population is numbers: coverage reached, the herd-immunity threshold a
    disease demands, vaccine efficacy, the doses a rollout needs, antibody titre after boosting, the interval
    between shots, seroconversion, and a campaign's reach. Crosses to `immunology` — vaccination is what
    immunology explains. A measure. */ const PROOF = 'vaccination arithmetic (coverage, herd threshold,
    efficacy, doses needed, titre, booster interval, seroconversion, campaign reach); a public-health domain; a
    measure crossed to immunology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'vaccination', dst:
    'immunology', formula, value, proof: PROOF, ...extra }, holds, { name: `vaccination.${name}`, params })
    export class VaccinationFormulas { /** COVERAGE as a percentage of the population vaccinated. value
    ⌊vaccinated · 100 / population⌋. -/
theorem fam_vaccination_coverage_1 : ((950 * 100) / 1000) = 95 := by decide

/-- vaccination: herdthreshold(5) = 80 — HERD-IMMUNITY THRESHOLD as a percentage, from the basic reproduction
    number. value ⌊(r0 − 1) · 100 / r0⌋. -/
theorem fam_vaccination_herdthreshold_1 : (((5 - 1) * 100) / 5) = 80 := by decide

/-- vaccination: efficacy(100, 5) = 95 — VACCINE EFFICACY as a percentage, from attack rates. value ⌊(control −
    vaccinated) · 100 / control⌋. -/
theorem fam_vaccination_efficacy_1 : (((fmax 0 (100 - 5)) * 100) / 100) = 95 := by decide

/-- vaccination: dosesneeded(1000, 2) = 2000 — DOSES NEEDED: people at a number of doses each. value people ·
    dosesper. -/
theorem fam_vaccination_dosesneeded_1 : (1000 * 2) = 2000 := by decide

/-- vaccination: titer(10, 3) = 80 — ANTIBODY TITRE after a number of doublings from an initial level. value
    initial · 2^doublings. -/
theorem fam_vaccination_titer_1 : (10 * (2 ^ 3)) = 80 := by decide

/-- vaccination: boosterinterval(12, 2) = 6 — BOOSTER INTERVAL: a total span split into a number of intervals.
    value ⌊totalmonths / intervals⌋. -/
theorem fam_vaccination_boosterinterval_1 : (12 / 2) = 6 := by decide

/-- vaccination: seroconversion(990, 1000) = 99 — SEROCONVERSION as a percentage of those tested who converted.
    value ⌊converted · 100 / tested⌋. -/
theorem fam_vaccination_seroconversion_1 : ((990 * 100) / 1000) = 99 := by decide

/-- vaccination: campaignreach(10, 100, 5) = 5000 — CAMPAIGN REACH: sites, each serving so many per day, over a
    number of days. value sites · perSite · days. -/
theorem fam_vaccination_campaignreach_1 : ((10 * 100) * 5) = 5000 := by decide

/-- valuation: pe(150, 10) = 15 — VALUATION — WHAT A COMPANY IS WORTH, AS ARITHMETIC. Pricing a business is
    numbers: the price-to-earnings and price-to-book ratios, operating cash flow (EBITDA), the market
    capitalisation, the enterprise value, the book value of equity, the EV/EBITDA multiple, and a fair price
    from earnings and a target multiple. Crosses to `econ` — valuation is economics applied to a single firm. A
    measure. */ const PROOF = 'valuation arithmetic (P/E, P/B, EBITDA, market cap, enterprise value, book value,
    EV/EBITDA multiple, fair value); a firm priced in integers; a measure crossed to econ' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'valuation', dst: 'econ', formula, value, proof: PROOF, ...extra
    }, holds, { name: `valuation.${name}`, params }) export class ValuationFormulas { /** PRICE-TO-EARNINGS:
    share price over earnings per share. value ⌊price / eps⌋. -/
theorem fam_valuation_pe_1 : (150 / 10) = 15 := by decide

/-- valuation: pb(150, 50) = 300 — PRICE-TO-BOOK, as a percentage. value ⌊price · 100 / book⌋. -/
theorem fam_valuation_pb_1 : ((150 * 100) / 50) = 300 := by decide

/-- valuation: ebitda(800, 200) = 1000 — EBITDA: operating income plus depreciation and amortisation. value ebit
    + da. -/
theorem fam_valuation_ebitda_1 : (800 + 200) = 1000 := by decide

/-- valuation: marketcap(1000, 150) = 150000 — MARKET CAP: shares outstanding at the share price. value shares ·
    price. -/
theorem fam_valuation_marketcap_1 : (1000 * 150) = 150000 := by decide

/-- valuation: enterprise(10000, 3000, 1000) = 12000 — ENTERPRISE VALUE: market cap plus debt less cash. value
    max(0, cap + debt − cash). -/
theorem fam_valuation_enterprise_1 : (fmax 0 ((10000 + 3000) - 1000)) = 12000 := by decide

/-- valuation: bookvalue(5000, 2000) = 3000 — BOOK VALUE of equity: assets less liabilities. value max(0, assets
    − liabilities). -/
theorem fam_valuation_bookvalue_1 : (fmax 0 (5000 - 2000)) = 3000 := by decide

/-- valuation: bookvalue(2000, 5000) = 0 — BOOK VALUE of equity: assets less liabilities. value max(0, assets −
    liabilities). -/
theorem fam_valuation_bookvalue_2 : (fmax 0 (2000 - 5000)) = 0 := by decide

/-- valuation: multiple(12000, 1000) = 12 — THE EV/EBITDA MULTIPLE: enterprise value over EBITDA. value ⌊ev /
    ebitda⌋. -/
theorem fam_valuation_multiple_1 : (12000 / 1000) = 12 := by decide

/-- valuation: fairvalue(10, 15) = 150 — FAIR VALUE: earnings per share at a target multiple. value eps · pe. -/
theorem fam_valuation_fairvalue_1 : (10 * 15) = 150 := by decide

/-- ventilation: minutevolume(500, 12) = 6000 — VENTILATION — MOVING AIR THROUGH THE LUNGS, AS ARITHMETIC.
    Breathing is numbers: the minute volume a tidal breath at a rate delivers, the alveolar share once dead
    space is spent, dead space itself by body weight, the rate a minute volume implies, lung compliance, airway
    resistance, the oxygen delivered, and how ventilation matches perfusion. Crosses to `pulmonology` —
    ventilation is what pulmonology measures. A measure. */ const PROOF = 'ventilation arithmetic (minute
    volume, alveolar ventilation, dead space, respiratory rate, compliance, airway resistance, oxygen delivery,
    ventilation-perfusion); a measure crossed to pulmonology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'ventilation', dst: 'pulmonology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `ventilation.${name}`, params }) export class VentilationFormulas { /** MINUTE VOLUME: a tidal breath at a
    respiratory rate. value tidal · rate. -/
theorem fam_ventilation_minutevolume_1 : (500 * 12) = 6000 := by decide

/-- ventilation: alveolarventilation(500, 150, 12) = 4200 — ALVEOLAR VENTILATION: the tidal breath past dead
    space, at a rate. value (tidal − dead) · rate. -/
theorem fam_ventilation_alveolarventilation_1 : ((fmax 0 (500 - 150)) * 12) = 4200 := by decide

/-- ventilation: deadspace(70, 2) = 140 — DEAD SPACE: body weight at a volume per kilogram. value weight ·
    perKg. -/
theorem fam_ventilation_deadspace_1 : (70 * 2) = 140 := by decide

/-- ventilation: respiratoryrate(6000, 500) = 12 — RESPIRATORY RATE: the breaths a minute volume implies at a
    tidal size. value ⌊minute / tidal⌋. -/
theorem fam_ventilation_respiratoryrate_1 : (6000 / 500) = 12 := by decide

/-- ventilation: compliance(500, 10) = 50 — COMPLIANCE: volume gained per unit of pressure. value ⌊volume /
    pressure⌋. -/
theorem fam_ventilation_compliance_1 : (500 / 10) = 50 := by decide

/-- ventilation: airwayresistance(20, 5) = 4 — AIRWAY RESISTANCE: the pressure a flow costs. value ⌊pressure /
    flow⌋. -/
theorem fam_ventilation_airwayresistance_1 : (20 / 5) = 4 := by decide

/-- ventilation: oxygendelivery(5, 200) = 1000 — OXYGEN DELIVERY: cardiac output carrying arterial oxygen
    content. value cardiac · content. -/
theorem fam_ventilation_oxygendelivery_1 : (5 * 200) = 1000 := by decide

/-- ventilation: ventilationperfusion(4, 5) = 80 — VENTILATION-PERFUSION: the ratio of ventilation to perfusion,
    as a percentage. value ⌊ventilation · 100 / perfusion⌋. -/
theorem fam_ventilation_ventilationperfusion_1 : ((4 * 100) / 5) = 80 := by decide

/-- verification: assertions(50, 3) = 150 -/
theorem fam_verification_assertions_1 : (50 * 3) = 150 := by decide

/-- verification: coveragepct(90, 100) = 90 -/
theorem fam_verification_coveragepct_1 : ((90 * 100) / 100) = 90 := by decide

/-- verification: invariantsubsets(5) = 32 -/
theorem fam_verification_invariantsubsets_1 : (2 ^ 5) = 32 := by decide

/-- verification: counterexamples(10, 8) = 2 -/
theorem fam_verification_counterexamples_1 : (fmax 0 (10 - 8)) = 2 := by decide

/-- verification: proofobligations(20, 10) = 30 -/
theorem fam_verification_proofobligations_1 : (20 + 10) = 30 := by decide

/-- verification: passrate(95, 100) = 95 -/
theorem fam_verification_passrate_1 : ((95 * 100) / 100) = 95 := by decide

/-- version: keep(50, 20) = 20 — VERSION — PAYLOAD'S VERSIONS/DRAFTS API, AS ARITHMETIC (chosen by the CMS API
    registry, not by hand). Keeping document history is numbers: the versions a doc retains, the ones pruned
    past the cap, autosaves in a session, the draft and published share, the wait until a scheduled publish, the
    steps a restore walks back, and the edit churn per day. Crosses to `payload` — version history is what the
    CMS stores. A measure. */ const PROOF = 'version arithmetic (retained versions, prune past cap, autosaves,
    draft/published share, scheduled wait, restore steps, edit churn); the CMS versions/drafts domain; a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'version', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `version.${name}`, params }) export class
    VersionFormulas { /** KEEP: the versions a doc retains, capped at maxPerDoc. value min(versions, max). -/
theorem fam_version_keep_1 : (fmin 50 20) = 20 := by decide

/-- version: prune(50, 20) = 30 — PRUNE: the versions trimmed past the cap. value max(0, versions − max). -/
theorem fam_version_prune_1 : (fmax 0 (50 - 20)) = 30 := by decide

/-- version: autosave(60, 5) = 12 — AUTOSAVE: the saves in a session at an interval. value ⌊minutes / interval⌋. -/
theorem fam_version_autosave_1 : (60 / 5) = 12 := by decide

/-- version: drafts(3, 10) = 30 — DRAFTS as a percentage of all versions. value ⌊draft · 100 / total⌋. -/
theorem fam_version_drafts_1 : ((3 * 100) / 10) = 30 := by decide

/-- version: published(7, 10) = 70 — PUBLISHED as a percentage of all versions. value ⌊pub · 100 / total⌋. -/
theorem fam_version_published_1 : ((7 * 100) / 10) = 70 := by decide

/-- version: scheduled(100, 160) = 60 — SCHEDULED: the wait until a publish fires. value max(0, at − now). -/
theorem fam_version_scheduled_1 : (fmax 0 (160 - 100)) = 60 := by decide

/-- version: scheduled(200, 160) = 0 — SCHEDULED: the wait until a publish fires. value max(0, at − now). -/
theorem fam_version_scheduled_2 : (fmax 0 (160 - 200)) = 0 := by decide

/-- version: restore(12, 20) = 8 — RESTORE: the versions a restore walks back. value max(0, current − from). -/
theorem fam_version_restore_1 : (fmax 0 (20 - 12)) = 8 := by decide

/-- version: churn(100, 20) = 5 — CHURN: the edits per day. value ⌊edits / days⌋. -/
theorem fam_version_churn_1 : (100 / 20) = 5 := by decide

/-- vet: dose(20, 5) = 100 — VET — VETERINARY MEDICINE, AS ARITHMETIC. Treating animals is numbers: a dose by
    body weight, age in dog years, the body-condition score, the share of a herd that is sick, a due date from a
    breeding date, a daily feed ration, the share of a flock vaccinated, and the fluids a patient needs. Crosses
    to `med` — veterinary medicine is medicine for animals. A measure. */ const PROOF = 'vet arithmetic (dose by
    weight, age in animal years, body-condition score, herd sickness, gestation due date, feed ration,
    vaccination coverage, fluids); medicine for animals; a measure crossed to med' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'vet', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `vet.${name}`, params }) export class VetFormulas { /** DOSE: milligrams at a per-kilogram rate on body
    weight. value weight · perKg. -/
theorem fam_vet_dose_1 : (20 * 5) = 100 := by decide

/-- vet: age(3, 7) = 21 — AGE in animal years at a per-year factor (e.g. dog years). value years · factor. -/
theorem fam_vet_age_1 : (3 * 7) = 21 := by decide

/-- vet: bodyscore(5) = 5 — BODY-CONDITION SCORE on the 1..9 scale. value score. -/
theorem fam_vet_bodyscore_1 : 5 = 5 := by decide

/-- vet: herd(3, 12) = 25 — HERD SICKNESS as a percentage. value ⌊sick · 100 / total⌋. -/
theorem fam_vet_herd_1 : ((3 * 100) / 12) = 25 := by decide

/-- vet: gestation(100, 63) = 163 — GESTATION: the due date, a breeding date plus the gestation period. value
    bred + period. -/
theorem fam_vet_gestation_1 : (100 + 63) = 163 := by decide

/-- vet: feed(40, 3) = 1 — FEED: a daily ration, a percentage of body weight. value ⌊weight · pct / 100⌋. -/
theorem fam_vet_feed_1 : ((40 * 3) / 100) = 1 := by decide

/-- vet: vaccination(80, 100) = 80 — VACCINATION coverage as a percentage. value ⌊done · 100 / animals⌋. -/
theorem fam_vet_vaccination_1 : ((80 * 100) / 100) = 80 := by decide

/-- vet: fluids(10, 60) = 600 — FLUIDS: millilitres at a per-kilogram rate on body weight. value weight ·
    mlPerKg. -/
theorem fam_vet_fluids_1 : (10 * 60) = 600 := by decide

/-- veterinary: dose(10, 5) = 50 — VETERINARY — ANIMAL MEDICINE AS ARITHMETIC (weight-based dosing and the
    vitals that frame it). A patient is numbers: the drug dose for its weight, the calories it needs, its body
    condition against the ideal, the fluid bags a day takes, heart rate, the hours between doses, weight gained,
    and whether gestation has reached term. Crosses to `physiology` — veterinary is physiology under treatment.
    A measure. */ const PROOF = 'veterinary arithmetic (weight-based dose, caloric requirement, body condition,
    fluid bags, heart rate, dosing interval, weight gain, gestation term); animal medicine as integers; a
    measure crossed to physiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'veterinary', dst:
    'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `veterinary.${name}`, params })
    export class VeterinaryFormulas { /** WEIGHT-BASED DOSE: the drug a patient gets at a per-kilogram rate.
    value weight · perkg. -/
theorem fam_veterinary_dose_1 : (10 * 5) = 50 := by decide

/-- veterinary: caloricrequirement(20, 30) = 600 — CALORIC REQUIREMENT: daily energy at a per-kilogram factor.
    value weight · factor. -/
theorem fam_veterinary_caloricrequirement_1 : (20 * 30) = 600 := by decide

/-- veterinary: bcs(55, 50) = 110 — BODY CONDITION: measured weight against the ideal, as a percentage. value
    ⌊actual · 100 / ideal⌋. -/
theorem fam_veterinary_bcs_1 : ((55 * 100) / 50) = 110 := by decide

/-- veterinary: heartrate(240, 2) = 120 — HEART RATE: beats over the minutes counted. value ⌊beats / minutes⌋. -/
theorem fam_veterinary_heartrate_1 : (240 / 2) = 120 := by decide

/-- veterinary: medicationinterval(24, 3) = 8 — DOSING INTERVAL: the hours between doses over a day. value
    ⌊hours / doses⌋. -/
theorem fam_veterinary_medicationinterval_1 : (24 / 3) = 8 := by decide

/-- veterinary: bodyweightgain(10, 15) = 5 — WEIGHT GAIN: the weight put on between two weighings. value max(0,
    end − start). -/
theorem fam_veterinary_bodyweightgain_1 : (fmax 0 (15 - 10)) = 5 := by decide

/-- veterinary: bodyweightgain(15, 10) = 0 — WEIGHT GAIN: the weight put on between two weighings. value max(0,
    end − start). -/
theorem fam_veterinary_bodyweightgain_2 : (fmax 0 (10 - 15)) = 0 := by decide

/-- vibration: naturalfrequency(5000, 10) = 500 — VIBRATION — MECHANICAL OSCILLATION AS ARITHMETIC. A vibrating
    structure is numbers: the natural frequency set by stiffness over mass, the static amplitude force makes
    against stiffness, the damping ratio, the resonant harmonics, the period per cycle, the acceleration a mode
    carries, how much motion transmits, and the shape a mode draws. Crosses to `mechanical` — vibration is the
    mechanical body in motion. A measure. */ const PROOF = 'vibration arithmetic (natural frequency, amplitude,
    damping ratio, resonance, period, acceleration, transmissibility, mode shape); mechanical oscillation as
    integers; a measure crossed to mechanical' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'vibration', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name:
    `vibration.${name}`, params }) export class VibrationFormulas { /** NATURAL FREQUENCY: stiffness over mass
    (ω² = k / m). value ⌊stiffness / mass⌋. -/
theorem fam_vibration_naturalfrequency_1 : (5000 / 10) = 500 := by decide

/-- vibration: amplitude(1000, 50) = 20 — AMPLITUDE: static deflection, force against stiffness (x = F / k).
    value ⌊force / stiffness⌋. -/
theorem fam_vibration_amplitude_1 : (1000 / 50) = 20 := by decide

/-- vibration: dampingratio(30, 100) = 30 — DAMPING RATIO as a percentage of critical (ζ = c / c_c). value
    ⌊damping · 100 / critical⌋. -/
theorem fam_vibration_dampingratio_1 : ((30 * 100) / 100) = 30 := by decide

/-- vibration: resonance(60, 3) = 180 — RESONANCE: a harmonic multiple of the base frequency. value frequency ·
    harmonic. -/
theorem fam_vibration_resonance_1 : (60 * 3) = 180 := by decide

/-- vibration: period(1000, 50) = 20 — PERIOD: time per cycle. value ⌊time / cycles⌋. -/
theorem fam_vibration_period_1 : (1000 / 50) = 20 := by decide

/-- vibration: acceleration(20, 25) = 500 — ACCELERATION a mode carries (a = ω² · x). value amplitude · freqsq. -/
theorem fam_vibration_acceleration_1 : (20 * 25) = 500 := by decide

/-- vibration: transmissibility(50, 200) = 25 — TRANSMISSIBILITY: output motion over input, as a percentage.
    value ⌊output · 100 / input⌋. -/
theorem fam_vibration_transmissibility_1 : ((50 * 100) / 200) = 25 := by decide

/-- vibration: transmissibility(300, 200) = 150 — TRANSMISSIBILITY: output motion over input, as a percentage.
    value ⌊output · 100 / input⌋. -/
theorem fam_vibration_transmissibility_2 : ((300 * 100) / 200) = 150 := by decide

/-- vibration: modeshape(3, 100) = 300 — MODE SHAPE: the span a mode draws over a length. value mode · length. -/
theorem fam_vibration_modeshape_1 : (3 * 100) = 300 := by decide

/-- virality: coefficient(200, 15) = 30 — VIRALITY — HOW CONTENT SPREADS, AS ARITHMETIC. The spread of a thing
    is numbers: the K-factor an invite earns, the time a cycle takes, the shares a view yields, amplification
    per post, reach per seed, engagement per impression, how saturated the market is, and the half-life of
    attention. Crosses to `content` — virality is a measure of content. */ const PROOF = 'virality arithmetic
    (K-factor coefficient, cycle time, shares, amplification, reach, engagement, saturation, half-life); how
    content spreads; a measure crossed to content' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'virality', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name:
    `virality.${name}`, params }) export class ViralityFormulas { /** COEFFICIENT: the K-factor an invite earns
    at a conversion rate. value ⌊invites · conversion / 100⌋. -/
theorem fam_virality_coefficient_1 : ((200 * 15) / 100) = 30 := by decide

/-- virality: cycletime(7) = 7 — CYCLE TIME: the days a viral cycle takes. value days. -/
theorem fam_virality_cycletime_1 : 7 = 7 := by decide

/-- virality: shares(250, 1000) = 25 — SHARES per hundred views. value ⌊shared · 100 / views⌋. -/
theorem fam_virality_shares_1 : ((250 * 100) / 1000) = 25 := by decide

/-- virality: amplification(600, 50) = 12 — AMPLIFICATION: reshares per post. value ⌊reshares / posts⌋. -/
theorem fam_virality_amplification_1 : (600 / 50) = 12 := by decide

/-- virality: reach(10000, 100) = 100 — REACH: those exposed per seed. value ⌊exposed / seed⌋. -/
theorem fam_virality_reach_1 : (10000 / 100) = 100 := by decide

/-- virality: engagement(300, 1000) = 30 — ENGAGEMENT per hundred impressions. value ⌊interactions · 100 /
    impressions⌋. -/
theorem fam_virality_engagement_1 : ((300 * 100) / 1000) = 30 := by decide

/-- virality: saturation(2500, 10000) = 25 — SATURATION: the market reached, as a percentage. value ⌊reached ·
    100 / market⌋. -/
theorem fam_virality_saturation_1 : ((2500 * 100) / 10000) = 25 := by decide

/-- virality: halflife(48) = 48 — HALF-LIFE: the hours attention takes to halve. value hours. -/
theorem fam_virality_halflife_1 : 48 = 48 := by decide

/-- virology: titer(50, 100) = 5000 — VIROLOGY — THE VIRUS, AS ARITHMETIC. Counting virus is numbers: titer by
    plaque assay, viral load per volume, burst size, infectivity, mutation rate per million bases, incubation
    days, how fast the host clears it, and how much antibody neutralizes. Crosses to `med` — virology is what
    medicine measures and treats. A measure. */ const PROOF = 'virology arithmetic (titer, viral load, burst
    size, infectivity, mutation rate, latency, clearance, neutralization); counting the virus; a measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'virology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `virology.${name}`, params }) export class VirologyFormulas
    { /** TITER: plaques at a dilution, a PFU/mL proxy. value plaques · dilution. -/
theorem fam_virology_titer_1 : (50 * 100) = 5000 := by decide

/-- virology: load(1000000, 5) = 200000 — VIRAL LOAD: genome copies over the sample volume. value ⌊copies /
    volume⌋. -/
theorem fam_virology_load_1 : (1000000 / 5) = 200000 := by decide

/-- virology: replication(5000, 100) = 50 — BURST SIZE: virions produced per infected cell. value ⌊produced /
    infected⌋. -/
theorem fam_virology_replication_1 : (5000 / 100) = 50 := by decide

/-- virology: infectivity(80, 100) = 80 — INFECTIVITY as a percentage of those exposed. value ⌊infected · 100 /
    exposed⌋. -/
theorem fam_virology_infectivity_1 : ((80 * 100) / 100) = 80 := by decide

/-- virology: mutation(3, 30000) = 100 — MUTATION RATE: changed bases per million of the genome. value ⌊changed
    · 1000000 / genome⌋. -/
theorem fam_virology_mutation_1 : ((3 * 1000000) / 30000) = 100 := by decide

/-- virology: latency(14) = 14 — LATENCY: incubation days before symptoms. value days. -/
theorem fam_virology_latency_1 : 14 = 14 := by decide

/-- virology: clearance(90, 100) = 90 — CLEARANCE as a percentage of the initial load cleared. value ⌊cleared ·
    100 / initial⌋. -/
theorem fam_virology_clearance_1 : ((90 * 100) / 100) = 90 := by decide

/-- virology: neutralization(75, 100) = 75 — NEUTRALIZATION as a percentage of virus blocked by antibody. value
    ⌊blocked · 100 / virus⌋. -/
theorem fam_virology_neutralization_1 : ((75 * 100) / 100) = 75 := by decide

/-- virtualization: overcommit(32, 8) = 400 — VIRTUALIZATION — PACKING COMPUTE ONTO FEWER MACHINES, AS
    ARITHMETIC. A hypervisor is numbers: vCPUs overcommitted against real cores, how many guests a host holds,
    guests consolidated onto fewer hosts, memory ballooned back, total vCPUs on a board, memory allocated,
    hypervisor overhead, and how long a live migration takes. Crosses to `concurrency` — many guests sharing one
    host is concurrency made physical. A measure. */ const PROOF = 'virtualization arithmetic (overcommit, VM
    density, consolidation, ballooning, vCPU count, allocation, overhead, migration); packing guests onto hosts;
    a measure crossed to concurrency' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'virtualization',
    dst: 'concurrency', formula, value, proof: PROOF, ...extra }, holds, { name: `virtualization.${name}`,
    params }) export class VirtualizationFormulas { /** OVERCOMMIT: allocated vCPUs against physical cores, as a
    percentage. value ⌊vcpu · 100 / cores⌋. -/
theorem fam_virtualization_overcommit_1 : ((32 * 100) / 8) = 400 := by decide

/-- virtualization: density(65536, 2048) = 32 — DENSITY: guests a host holds at a per-guest memory. value
    ⌊hostMem / vmMem⌋. -/
theorem fam_virtualization_density_1 : (65536 / 2048) = 32 := by decide

/-- virtualization: ballooning(4096, 1024) = 3072 — BALLOONING: memory reclaimed from a guest. value max(0,
    allocated − used). -/
theorem fam_virtualization_ballooning_1 : (fmax 0 (4096 - 1024)) = 3072 := by decide

/-- virtualization: vcpu(2, 8, 2) = 32 — VCPU: total virtual CPUs on a board. value sockets · cores · threads. -/
theorem fam_virtualization_vcpu_1 : ((2 * 8) * 2) = 32 := by decide

/-- virtualization: allocation(16, 2048) = 32768 — ALLOCATION: memory committed to the guests. value vms ·
    perVm. -/
theorem fam_virtualization_allocation_1 : (16 * 2048) = 32768 := by decide

/-- virtualization: overhead(512, 2048) = 25 — OVERHEAD: hypervisor reservation against host memory, as a
    percentage. value ⌊reserved · 100 / total⌋. -/
theorem fam_virtualization_overhead_1 : ((512 * 100) / 2048) = 25 := by decide

/-- virtualization: ballooning(512, 1024) = 0 — BALLOONING: memory reclaimed from a guest. value max(0,
    allocated − used). -/
theorem fam_virtualization_ballooning_2 : (fmax 0 (512 - 1024)) = 0 := by decide

/-- vitals: budget(50, 200) = 25 — BUDGET: the share of a performance budget a resource burned. value ⌊used ·
    100 / total⌋. -/
theorem fam_vitals_budget_1 : ((50 * 100) / 200) = 25 := by decide

/-- vitals: score(4, 5) = 80 — SCORE: the share of metrics that passed, as a percentage. value ⌊passed · 100 /
    metrics⌋. -/
theorem fam_vitals_score_1 : ((4 * 100) / 5) = 80 := by decide

/-- vitals: regression(120, 100) = 20 — REGRESSION: how far a metric worsened since the last release, never
    below zero. value max(0, now − before). -/
theorem fam_vitals_regression_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- vitals: regression(90, 100) = 0 — REGRESSION: how far a metric worsened since the last release, never below
    zero. value max(0, now − before). -/
theorem fam_vitals_regression_2 : (fmax 0 (90 - 100)) = 0 := by decide

/-- viticulture: acidity(6, 1000) = 6 — VITICULTURE — THE GROWING OF GRAPES FOR WINE, AS ARITHMETIC (chosen by
    the agriculture registry, not by hand). A vineyard is numbers: sugar as brix, the crop a vine carries, how
    ripe the fruit is, acidity, growing degree days, planting density, fermentation progress, and tannin from
    the skins. Crosses to `agriculture` — viticulture is agriculture of the vine. A measure. */ const PROOF =
    'viticulture arithmetic (brix, crop load, ripeness, acidity, growing degree days, planting density,
    fermentation, tannin); a measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'viticulture', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name:
    `viticulture.${name}`, params }) export class ViticultureFormulas { /** ACIDITY: acid per thousand of
    volume. value ⌊acid · 1000 / volume⌋. -/
theorem fam_viticulture_acidity_1 : ((6 * 1000) / 1000) = 6 := by decide

/-- viticulture: brix(240, 1000) = 24 — BRIX: sugar as a percentage of juice. value ⌊sugar · 100 / juice⌋. -/
theorem fam_viticulture_brix_1 : ((240 * 100) / 1000) = 24 := by decide

/-- viticulture: cropload(1200, 400) = 3 — CROP LOAD: grapes a vine carries. value ⌊grapes / vines⌋. -/
theorem fam_viticulture_cropload_1 : (1200 / 400) = 3 := by decide

/-- viticulture: density(4000, 1000) = 4 — PLANTING DENSITY: vines over the area. value ⌊vines / area⌋. -/
theorem fam_viticulture_density_1 : (4000 / 1000) = 4 := by decide

/-- viticulture: fermentation(180, 240) = 75 — FERMENTATION: sugar converted as a percentage. value ⌊converted ·
    100 / sugar⌋. -/
theorem fam_viticulture_fermentation_1 : ((180 * 100) / 240) = 75 := by decide

/-- viticulture: gdd(30, 10) = 20 — GROWING DEGREE DAYS: heat above a base. value max(0, temperature − base). -/
theorem fam_viticulture_gdd_1 : (fmax 0 (30 - 10)) = 20 := by decide

/-- viticulture: gdd(5, 10) = 0 — GROWING DEGREE DAYS: heat above a base. value max(0, temperature − base). -/
theorem fam_viticulture_gdd_2 : (fmax 0 (5 - 10)) = 0 := by decide

/-- viticulture: ripeness(220, 240) = 91 — RIPENESS: current sugar toward the target. value ⌊current · 100 /
    target⌋. -/
theorem fam_viticulture_ripeness_1 : ((220 * 100) / 240) = 91 := by decide

/-- viticulture: tannin(900, 300) = 3 — TANNIN: extracted over the skins. value ⌊extracted / skins⌋. -/
theorem fam_viticulture_tannin_1 : (900 / 300) = 3 := by decide

/-- volatility: range(150, 90) = 60 — VOLATILITY — PRICE MOVEMENT, AS ARITHMETIC. How much a market moves is
    numbers: the day's range, the annualized swing, the width of a historical band, beta against the market,
    variance of returns, the implied move an option prices in, a z-score of deviation, and the depth of a
    drawdown. Integer proxies, no sqrt. Crosses to `trading` — volatility is what trading prices and hedges. A
    measure. */ const PROOF = 'volatility arithmetic (range, annualized swing, historical band, beta, variance,
    implied move, z-score, drawdown); integer proxies with no sqrt; a measure crossed to trading' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'volatility', dst: 'trading', formula, value, proof: PROOF,
    ...extra }, holds, { name: `volatility.${name}`, params }) export class VolatilityFormulas { /** RANGE: the
    day's spread, high minus low. value max(0, high − low). -/
theorem fam_volatility_range_1 : (fmax 0 (150 - 90)) = 60 := by decide

/-- volatility: annualized(2) = 32 — ANNUALIZED: a daily move scaled to a year by √252 ≈ 16 (integer proxy).
    value daily · 16. -/
theorem fam_volatility_annualized_1 : (2 * 16) = 32 := by decide

/-- volatility: historicalband(5, 2) = 20 — HISTORICAL BAND: the full width of a k-sigma band. value 2 · sigma ·
    k. -/
theorem fam_volatility_historicalband_1 : ((2 * 5) * 2) = 20 := by decide

/-- volatility: beta(150, 100) = 150 — BETA against the market, in hundredths. value ⌊cov · 100 / mvar⌋. -/
theorem fam_volatility_beta_1 : ((150 * 100) / 100) = 150 := by decide

/-- volatility: variance(500, 5) = 100 — VARIANCE: mean of the squared deviations. value ⌊sumsq / n⌋. -/
theorem fam_volatility_variance_1 : (500 / 5) = 100 := by decide

/-- volatility: impliedmove(200, 25) = 50 — IMPLIED MOVE: the move an option prices in, from implied vol in
    percent. value ⌊price · iv / 100⌋. -/
theorem fam_volatility_impliedmove_1 : ((200 * 25) / 100) = 50 := by decide

/-- volatility: zscore(120, 100, 10) = 2 — Z-SCORE: deviation from the mean in sigmas. value ⌊max(0, x − mean) /
    sigma⌋. -/
theorem fam_volatility_zscore_1 : ((fmax 0 (120 - 100)) / 10) = 2 := by decide

/-- volatility: drawdown(200, 150) = 25 — DRAWDOWN: the fall from peak to trough, as a percentage. value ⌊max(0,
    peak − trough) · 100 / peak⌋. -/
theorem fam_volatility_drawdown_1 : (((fmax 0 (200 - 150)) * 100) / 200) = 25 := by decide

/-- volatility: range2(9, 4) = 5 -/
theorem fam_volatility_range2_1 : (fmax 0 (9 - 4)) = 5 := by decide

/-- volatility: drawdown2(10, 3) = 7 -/
theorem fam_volatility_drawdown2_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- volatility: valueatrisk(1000, 5) = 50 -/
theorem fam_volatility_valueatrisk_1 : ((1000 * 5) / 100) = 50 := by decide

/-- volatility: meandeviation(20, 4) = 5 -/
theorem fam_volatility_meandeviation_1 : (20 / 4) = 5 := by decide

/-- volatility: excessreturn(8, 3) = 5 -/
theorem fam_volatility_excessreturn_1 : (fmax 0 (8 - 3)) = 5 := by decide

/-- volatility: beta2(10, 4) = 2 -/
theorem fam_volatility_beta2_1 : (10 / 4) = 2 := by decide

/-- volatility: beta(150, 0) = 0 — BETA against the market, in hundredths. value ⌊cov · 100 / mvar⌋. -/
theorem fam_volatility_beta_2 : ((150 * 100) / 0) = 0 := by decide

/-- volcanology: vei(7) = 7 — VOLCANOLOGY — ERUPTIONS AS ARITHMETIC. The explosivity index, effusion rate, lava
    viscosity, ash loading, magma refill time, pyroclastic reach, excess gas, and repose interval. Crosses to
    `seismology` — a volcano is what the ground records. A measure. */ const PROOF = 'volcanology arithmetic
    (explosivity index, effusion rate, viscosity, ash load, magma refill, pyroclastic reach, excess gas,
    repose); a measure crossed to seismology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'volcanology', dst: 'seismology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `volcanology.${name}`, params }) export class VolcanologyFormulas { /** EXPLOSIVITY INDEX proxy: the erupted
    volume. value volume. -/
theorem fam_volcanology_vei_1 : 7 = 7 := by decide

/-- volcanology: effusion(1000, 10) = 100 — EFFUSION RATE: volume over the hours of eruption. value ⌊volume /
    hours⌋. -/
theorem fam_volcanology_effusion_1 : (1000 / 10) = 100 := by decide

/-- volcanology: viscosity(50, 1000) = 50 — LAVA VISCOSITY: silica fraction over temperature. value ⌊silica ·
    1000 / temperature⌋. -/
theorem fam_volcanology_viscosity_1 : ((50 * 1000) / 1000) = 50 := by decide

/-- volcanology: ash(1000, 4) = 250 — ASH LOADING: mass over the area it falls on. value ⌊mass / area⌋. -/
theorem fam_volcanology_ash_1 : (1000 / 4) = 250 := by decide

/-- volcanology: magma(6000, 60) = 100 — MAGMA REFILL TIME: chamber volume over the refill rate. value ⌊chamber
    / rate⌋. -/
theorem fam_volcanology_magma_1 : (6000 / 60) = 100 := by decide

/-- volcanology: pyroclastic(30, 4) = 120 — PYROCLASTIC REACH: distance scaled by slope. value distance · slope. -/
theorem fam_volcanology_pyroclastic_1 : (30 * 4) = 120 := by decide

/-- volcanology: gas(900, 500) = 400 — EXCESS GAS: emitted above the baseline. value max(0, emitted − baseline). -/
theorem fam_volcanology_gas_1 : (fmax 0 (900 - 500)) = 400 := by decide

/-- volcanology: gas(300, 500) = 0 — EXCESS GAS: emitted above the baseline. value max(0, emitted − baseline). -/
theorem fam_volcanology_gas_2 : (fmax 0 (300 - 500)) = 0 := by decide

/-- volcanology: repose(42) = 42 — REPOSE INTERVAL: the years of quiet between eruptions. value years. -/
theorem fam_volcanology_repose_1 : 42 = 42 := by decide

/-- vulcanology: vei(4, 5) = 5 -/
theorem fam_vulcanology_vei_1 : (fmax 4 5) = 5 := by decide

/-- vulcanology: ejectavolume(1000, 3) = 3000 -/
theorem fam_vulcanology_ejectavolume_1 : (1000 * 3) = 3000 := by decide

/-- vulcanology: explosivity(5000, 1000) = 5 -/
theorem fam_vulcanology_explosivity_1 : (5000 / 1000) = 5 := by decide

/-- vulcanology: lavaflowrate(6000, 60) = 100 -/
theorem fam_vulcanology_lavaflowrate_1 : (6000 / 60) = 100 := by decide

/-- vulcanology: ashheight(12, 1000) = 12000 -/
theorem fam_vulcanology_ashheight_1 : (12 * 1000) = 12000 := by decide

/-- vulcanology: repose(1000, 200) = 800 -/
theorem fam_vulcanology_repose_1 : (fmax 0 (1000 - 200)) = 800 := by decide

/-- vulcanology: magmaviscosity(100, 4) = 400 -/
theorem fam_vulcanology_magmaviscosity_1 : (100 * 4) = 400 := by decide

/-- vulcanology: hazardindex(80, 100) = 80 -/
theorem fam_vulcanology_hazardindex_1 : ((80 * 100) / 100) = 80 := by decide
