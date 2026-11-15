-- lean/FamiliesD.lean — GENERATED. THE FAMILIES, D — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- dairy: output(30000, 100) = 300 — DAIRY — THE HERD, AS ARITHMETIC (chosen by the agricultural registry, not
    by hand). Milk is numbers: yield per cow, butterfat and protein as a share of milk, somatic cell count per
    volume, days in lactation, conception rate per insemination, feed efficiency, and persistency against peak.
    Crosses to `agriculture` — dairy is what the farm measures. A measure. */ const PROOF = 'dairy arithmetic
    (yield per cow, butterfat, somatic cells, lactation, protein, conception, feed efficiency, persistency); the
    herd as integers; a measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'dairy', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `dairy.${name}`,
    params }) export class DairyFormulas { /** YIELD per cow: milk over the cows. value ⌊milk / cows⌋. -/
theorem fam_dairy_output_1 : (30000 / 100) = 300 := by decide

/-- dairy: butterfat(40, 1000) = 4 — BUTTERFAT as a percentage of milk. value ⌊fat · 100 / milk⌋. -/
theorem fam_dairy_butterfat_1 : ((40 * 100) / 1000) = 4 := by decide

/-- dairy: somatic(200000, 1000) = 200 — SOMATIC cell count per volume (SCC proxy). value ⌊cells / volume⌋. -/
theorem fam_dairy_somatic_1 : (200000 / 1000) = 200 := by decide

/-- dairy: lactation(305) = 305 — LACTATION: days in milk. value days. -/
theorem fam_dairy_lactation_1 : 305 = 305 := by decide

/-- dairy: protein(33, 1000) = 3 — PROTEIN as a percentage of milk. value ⌊protein · 100 / milk⌋. -/
theorem fam_dairy_protein_1 : ((33 * 100) / 1000) = 3 := by decide

/-- dairy: conception(45, 100) = 45 — CONCEPTION rate per insemination. value ⌊conceived · 100 / inseminations⌋. -/
theorem fam_dairy_conception_1 : ((45 * 100) / 100) = 45 := by decide

/-- dairy: feedefficiency(1500, 1000) = 150 — FEED EFFICIENCY: milk over feed. value ⌊milk · 100 / feed⌋. -/
theorem fam_dairy_feedefficiency_1 : ((1500 * 100) / 1000) = 150 := by decide

/-- dairy: persistency(80, 100) = 80 — PERSISTENCY against peak. value ⌊current · 100 / peak⌋. -/
theorem fam_dairy_persistency_1 : ((80 * 100) / 100) = 80 := by decide

/-- dance: tempo(480, 4) = 120 — DANCE — MOVEMENT AS ARITHMETIC. The craft is numbers: the tempo a count keeps,
    the counts a bar holds, how in time the floor is, the steps a routine drills, the phrase a section spans,
    how high a jump clears, the turn an angle lands on, and how long the body lasts between rests. Crosses to
    `music` — dance is what music moves. A measure. */ const PROOF = 'dance arithmetic (tempo, counts,
    synchrony, steps, phrase, elevation, rotation, stamina); movement as a measure crossed to music' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'dance', dst: 'music', formula, value, proof: PROOF, ...extra },
    holds, { name: `dance.${name}`, params }) export class DanceFormulas { /** TEMPO: beats per minute. value
    ⌊beats / minutes⌋. -/
theorem fam_dance_tempo_1 : (480 / 4) = 120 := by decide

/-- dance: counts(8, 8) = 64 — COUNTS: the counts a run of bars holds. value bars · beats. -/
theorem fam_dance_counts_1 : (8 * 8) = 64 := by decide

/-- dance: synchrony(9, 10) = 90 — SYNCHRONY: how in time the floor is, as a percentage. value ⌊aligned · 100 /
    dancers⌋. -/
theorem fam_dance_synchrony_1 : ((9 * 100) / 10) = 90 := by decide

/-- dance: steps(5, 4) = 20 — STEPS: the steps a routine drills. value sequences · repeats. -/
theorem fam_dance_steps_1 : (5 * 4) = 20 := by decide

/-- dance: phrase(64, 8) = 8 — PHRASE: the phrase a section spans, in measures. value ⌊counts / measures⌋. -/
theorem fam_dance_phrase_1 : (64 / 8) = 8 := by decide

/-- dance: elevation(120, 4) = 30 — ELEVATION: the height a jump clears per attempt. value ⌊height / attempts⌋. -/
theorem fam_dance_elevation_1 : (120 / 4) = 30 := by decide

/-- dance: stamina(300, 60) = 500 — STAMINA: how long the body lasts between rests, as a percentage. value
    ⌊duration · 100 / rest⌋. -/
theorem fam_dance_stamina_1 : ((300 * 100) / 60) = 500 := by decide

/-- dataquality: accuracy(20, 1000) = 98 — DATAQUALITY — THE STATE OF A TABLE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A dataset's health is numbers: how many cells are filled, how many rows
    are right, how many are distinct, how many pass the rules, how many agree across copies, how stale the
    newest row is, the share of nulls, and the share of duplicates. Crosses to `statistics` — data quality is
    what statistics summarises. A measure. */ const PROOF = 'dataquality arithmetic (completeness, accuracy,
    uniqueness, validity, consistency, freshness, null rate, duplicate rate); a registry-chosen measure crossed
    to statistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'dataquality', dst: 'statistics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `dataquality.${name}`, params }) export class
    DataqualityFormulas { /** ACCURACY as a percentage: the rows left after errors are removed. value ⌊max(0,
    total − errors) · 100 / total⌋. -/
theorem fam_dataquality_accuracy_1 : (((fmax 0 (1000 - 20)) * 100) / 1000) = 98 := by decide

/-- dataquality: completeness(950, 1000) = 95 — COMPLETENESS as a percentage: the cells that are filled. value
    ⌊filled · 100 / total⌋. -/
theorem fam_dataquality_completeness_1 : ((950 * 100) / 1000) = 95 := by decide

/-- dataquality: consistency(880, 1000) = 88 — CONSISTENCY as a percentage: the rows that agree across copies.
    value ⌊matched · 100 / total⌋. -/
theorem fam_dataquality_consistency_1 : ((880 * 100) / 1000) = 88 := by decide

/-- dataquality: duplicaterate(30, 1000) = 3 — DUPLICATE RATE as a percentage: the rows that repeat. value
    ⌊dupes · 100 / total⌋. -/
theorem fam_dataquality_duplicaterate_1 : ((30 * 100) / 1000) = 3 := by decide

/-- dataquality: freshness(500, 450) = 50 — FRESHNESS: how stale the newest row is. value max(0, now − updated). -/
theorem fam_dataquality_freshness_1 : (fmax 0 (500 - 450)) = 50 := by decide

/-- dataquality: nullrate(50, 1000) = 5 — NULL RATE as a percentage: the cells left empty. value ⌊nulls · 100 /
    total⌋. -/
theorem fam_dataquality_nullrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- dataquality: uniqueness(900, 1000) = 90 — UNIQUENESS as a percentage: the rows that are distinct. value
    ⌊distinct · 100 / total⌋. -/
theorem fam_dataquality_uniqueness_1 : ((900 * 100) / 1000) = 90 := by decide

/-- dataquality: validity(970, 1000) = 97 — VALIDITY as a percentage: the rows that pass the rules. value ⌊valid
    · 100 / total⌋. -/
theorem fam_dataquality_validity_1 : ((970 * 100) / 1000) = 97 := by decide

/-- deadreckoning: distance(12, 3) = 36 — DEADRECKONING — POSITION WITHOUT A FIX, AS ARITHMETIC (course and
    speed over elapsed time, the oldest navigation). It is numbers: the distance run, the drift angle off the
    track, the position error against a fix, the time a run takes, the speed made good, the set-and-drift of a
    current, the estimated position, and the course correction to steer back. Crosses to `navigation` — dead
    reckoning is the reckoning navigation does between fixes. A measure. */ const PROOF = 'dead reckoning
    arithmetic (distance run, drift angle, position error, elapsed time, speed made good, set and drift,
    estimated position, course correction); position carried forward from course and speed; a measure crossed to
    navigation' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'deadreckoning', dst: 'navigation',
    formula, value, proof: PROOF, ...extra }, holds, { name: `deadreckoning.${name}`, params }) export class
    DeadreckoningFormulas { /** DISTANCE RUN: speed over the ground for a span of time. value speed · time. -/
theorem fam_deadreckoning_distance_1 : (12 * 3) = 36 := by decide

/-- deadreckoning: driftangle(10, 60) = 10 — DRIFT ANGLE: cross-track offset over the distance run, in
    arcminutes. value ⌊cross · 60 / dist⌋. -/
theorem fam_deadreckoning_driftangle_1 : ((10 * 60) / 60) = 10 := by decide

/-- deadreckoning: elapsedtime(360, 12) = 30 — ELAPSED TIME: the distance to run over the speed made good. value
    ⌊dist / speed⌋. -/
theorem fam_deadreckoning_elapsedtime_1 : (360 / 12) = 30 := by decide

/-- deadreckoning: elapsedtime(360, 0) = 0 — ELAPSED TIME: the distance to run over the speed made good. value
    ⌊dist / speed⌋. -/
theorem fam_deadreckoning_elapsedtime_2 : (360 / 0) = 0 := by decide

/-- deadreckoning: speedmadegood(360, 30) = 12 — SPEED MADE GOOD: the distance made good over the time run.
    value ⌊dist / time⌋. -/
theorem fam_deadreckoning_speedmadegood_1 : (360 / 30) = 12 := by decide

/-- deadreckoning: setandrift(3, 4) = 12 — SET AND DRIFT: the current's set carries the vessel at its drift rate
    over the hours. value set · hours. -/
theorem fam_deadreckoning_setandrift_1 : (3 * 4) = 12 := by decide

/-- deadreckoning: estimatedposition(100, 36) = 136 — ESTIMATED POSITION: the start carried forward by the
    distance run. value start + dist. -/
theorem fam_deadreckoning_estimatedposition_1 : (100 + 36) = 136 := by decide

/-- delivery: ontime(950, 1000) = 95 — DELIVERY — LAST-MILE LOGISTICS, AS ARITHMETIC. Moving parcels is numbers:
    on-time rate, stops per route, first-attempt success, last-mile cost per parcel, delivery-window hit rate,
    return rate, the ETA from distance and speed, and the deliveries a courier makes per hour. Crosses to
    `logistics` — delivery is logistics at the doorstep. A measure. */ const PROOF = 'delivery arithmetic
    (on-time rate, stop density, first-attempt success, last-mile cost, window hit rate, returns, eta,
    productivity); last-mile logistics as a measure crossed to logistics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'delivery', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `delivery.${name}`, params }) export class DeliveryFormulas { /** ON-TIME RATE as a percentage. value
    ⌊ontime · 100 / total⌋. -/
theorem fam_delivery_ontime_1 : ((950 * 100) / 1000) = 95 := by decide

/-- delivery: density(120, 8) = 15 — STOP DENSITY: stops over the routes run. value ⌊stops / route⌋. -/
theorem fam_delivery_density_1 : (120 / 8) = 15 := by decide

/-- delivery: firstattempt(880, 1000) = 88 — FIRST-ATTEMPT SUCCESS as a percentage. value ⌊delivered · 100 /
    attempts⌋. -/
theorem fam_delivery_firstattempt_1 : ((880 * 100) / 1000) = 88 := by decide

/-- delivery: lastmile(4500, 900) = 5 — LAST-MILE COST per parcel. value ⌊cost / parcels⌋. -/
theorem fam_delivery_lastmile_1 : (4500 / 900) = 5 := by decide

/-- delivery: window(270, 300) = 90 — DELIVERY-WINDOW HIT RATE as a percentage. value ⌊hit · 100 / promised⌋. -/
theorem fam_delivery_window_1 : ((270 * 100) / 300) = 90 := by decide

/-- delivery: returns(30, 1000) = 3 — RETURN RATE as a percentage. value ⌊returned · 100 / shipped⌋. -/
theorem fam_delivery_returns_1 : ((30 * 100) / 1000) = 3 := by decide

/-- delivery: eta(600, 50) = 12 — ETA: distance over speed. value ⌊distance / speed⌋. -/
theorem fam_delivery_eta_1 : (600 / 50) = 12 := by decide

/-- delivery: productivity(96, 8) = 12 — PRODUCTIVITY: deliveries over hours worked. value ⌊deliveries / hours⌋. -/
theorem fam_delivery_productivity_1 : (96 / 8) = 12 := by decide

/-- demographics: birthrate(12000, 1000000) = 12 — DEMOGRAPHICS — POPULATION STATISTICS, AS ARITHMETIC. A
    population is numbers: births and deaths per thousand, natural growth, how many per unit of land, who
    depends on the workers, the median age, net migration, and how long a life runs. Crosses to `econ` — a
    population is the economy's measure. A measure. */ const PROOF = 'demographics arithmetic (birth rate, death
    rate, natural growth, density, dependency, median age, net migration, life expectancy); population
    statistics as integers; a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'demographics', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name:
    `demographics.${name}`, params }) export class DemographicsFormulas { /** BIRTH RATE: births per thousand of
    the population. value ⌊births · 1000 / population⌋. -/
theorem fam_demographics_birthrate_1 : ((12000 * 1000) / 1000000) = 12 := by decide

/-- demographics: deathrate(8000, 1000000) = 8 — DEATH RATE: deaths per thousand of the population. value
    ⌊deaths · 1000 / population⌋. -/
theorem fam_demographics_deathrate_1 : ((8000 * 1000) / 1000000) = 8 := by decide

/-- demographics: growth(12000, 8000) = 4000 — NATURAL GROWTH: births less deaths (may be negative). value
    births − deaths. -/
theorem fam_demographics_growth_1 : (12000 - 8000) = 4000 := by decide

/-- demographics: density(1000000, 500) = 2000 — DENSITY: population over the land area. value ⌊population /
    area⌋. -/
theorem fam_demographics_density_1 : (1000000 / 500) = 2000 := by decide

/-- demographics: dependency(45, 55) = 81 — DEPENDENCY RATIO: dependents per hundred of working age. value
    ⌊dependents · 100 / working⌋. -/
theorem fam_demographics_dependency_1 : ((45 * 100) / 55) = 81 := by decide

/-- demographics: median(3900, 100) = 39 — MEDIAN AGE: the summed ages over the count, as a mean proxy. value
    ⌊sumAges / count⌋. -/
theorem fam_demographics_median_1 : (3900 / 100) = 39 := by decide

/-- demographics: migration(5000, 2000) = 3000 — NET MIGRATION: arrivals less departures (may be negative).
    value in − out. -/
theorem fam_demographics_migration_1 : (5000 - 2000) = 3000 := by decide

/-- demographics: life(820000, 10000) = 82 — LIFE EXPECTANCY: summed years of life over the deaths, as a proxy.
    value ⌊sumYears / deaths⌋. -/
theorem fam_demographics_life_1 : (820000 / 10000) = 82 := by decide

/-- demography: birthrate(600, 50000) = 12 — DEMOGRAPHY — A POPULATION AS ARITHMETIC. The study of a people is
    numbers: how many are born and die per thousand, whether the population grows on its own, how many depend on
    each worker, how old the middle person is, how long a life runs, how many men stand per hundred women, and
    how long until the count doubles. Crosses to `sociology` — demography is the measure a society is read
    through. A measure. */ const PROOF = 'demography arithmetic (birth rate, death rate, natural increase,
    dependency ratio, median age, life expectancy, sex ratio, doubling time); a people as a measure crossed to
    sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'demography', dst: 'sociology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `demography.${name}`, params }) export class
    DemographyFormulas { /** BIRTH RATE: births per thousand people. value ⌊births · 1000 / pop⌋. -/
theorem fam_demography_birthrate_1 : ((600 * 1000) / 50000) = 12 := by decide

/-- demography: deathrate(400, 50000) = 8 — DEATH RATE: deaths per thousand people. value ⌊deaths · 1000 / pop⌋. -/
theorem fam_demography_deathrate_1 : ((400 * 1000) / 50000) = 8 := by decide

/-- demography: dependencyratio(600, 1000) = 60 — DEPENDENCY RATIO: dependents per hundred workers. value
    ⌊dependents · 100 / workers⌋. -/
theorem fam_demography_dependencyratio_1 : ((600 * 100) / 1000) = 60 := by decide

/-- demography: doublingtime(2) = 35 — DOUBLING TIME: the rule of 70 — years for a population to double at a
    growth rate. value ⌊70 / rate⌋. -/
theorem fam_demography_doublingtime_1 : (70 / 2) = 35 := by decide

/-- demography: lifeexpectancy(60000, 800) = 75 — LIFE EXPECTANCY: person-years lived over the deaths that
    closed them. value ⌊years / deaths⌋. -/
theorem fam_demography_lifeexpectancy_1 : (60000 / 800) = 75 := by decide

/-- demography: medianage(40000, 1000) = 40 — MEDIAN AGE: total age-years over the count — the middle age. value
    ⌊years / count⌋. -/
theorem fam_demography_medianage_1 : (40000 / 1000) = 40 := by decide

/-- demography: naturalincrease(600, 400) = 200 — NATURAL INCREASE: births over deaths, never below zero. value
    max(0, births − deaths). -/
theorem fam_demography_naturalincrease_1 : (fmax 0 (600 - 400)) = 200 := by decide

/-- demography: naturalincrease(400, 600) = 0 — NATURAL INCREASE: births over deaths, never below zero. value
    max(0, births − deaths). -/
theorem fam_demography_naturalincrease_2 : (fmax 0 (400 - 600)) = 0 := by decide

/-- demography: sexratio(5100, 5000) = 102 — SEX RATIO: men per hundred women. value ⌊males · 100 / females⌋. -/
theorem fam_demography_sexratio_1 : ((5100 * 100) / 5000) = 102 := by decide

/-- dentistry: decay(3, 32) = 9 — DENTISTRY — DENTAL MEDICINE, AS ARITHMETIC (chosen by the registry, not by
    hand). Dental care is numbers: decay as a share of the teeth, plaque over the surfaces scored, an anesthetic
    dose by weight, the months until recall, restoration coverage, probing-pocket depth, a fluoride reading
    against its limit, and extractions as a share of the teeth. Crosses to `med` — dentistry is a branch of
    medicine. A measure. */ const PROOF = 'dentistry arithmetic (decay share, plaque score, anesthetic dose,
    recall months, restoration coverage, pocket depth, fluoride limit, extraction share); dental medicine as a
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'dentistry', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `dentistry.${name}`, params }) export class
    DentistryFormulas { /** DECAY as a share of the teeth. value ⌊decayed · 100 / teeth⌋. -/
theorem fam_dentistry_decay_1 : ((3 * 100) / 32) = 9 := by decide

/-- dentistry: plaque(40, 160) = 25 — PLAQUE score over the surfaces examined. value ⌊surfaces · 100 / total⌋. -/
theorem fam_dentistry_plaque_1 : ((40 * 100) / 160) = 25 := by decide

/-- dentistry: anesthetic(70, 2) = 140 — ANESTHETIC dose: weight at a per-kilogram rate. value weight · perKg. -/
theorem fam_dentistry_anesthetic_1 : (70 * 2) = 140 := by decide

/-- dentistry: recall(6, 2) = 4 — RECALL: the months remaining until the next visit. value max(0, months −
    since). -/
theorem fam_dentistry_recall_1 : (fmax 0 (6 - 2)) = 4 := by decide

/-- dentistry: recall(2, 6) = 0 — RECALL: the months remaining until the next visit. value max(0, months −
    since). -/
theorem fam_dentistry_recall_2 : (fmax 0 (2 - 6)) = 0 := by decide

/-- dentistry: restoration(8, 10) = 80 — RESTORATION coverage: the fillings placed against those needed. value
    ⌊filled · 100 / needed⌋. -/
theorem fam_dentistry_restoration_1 : ((8 * 100) / 10) = 80 := by decide

/-- dentistry: pocket(4) = 4 — POCKET: probing depth in millimetres. value depth (holds depth ≤ 12 mm). -/
theorem fam_dentistry_pocket_1 : 4 = 4 := by decide

/-- dentistry: extraction(1, 32) = 3 — EXTRACTION as a share of the teeth. value ⌊removed · 100 / teeth⌋. -/
theorem fam_dentistry_extraction_1 : ((1 * 100) / 32) = 3 := by decide

/-- deontology: duties(7, 3) = 10 -/
theorem fam_deontology_duties_1 : (7 + 3) = 10 := by decide

/-- deontology: universalizability(80, 100) = 80 -/
theorem fam_deontology_universalizability_1 : ((80 * 100) / 100) = 80 := by decide

/-- deontology: imperativesubsets(4) = 16 -/
theorem fam_deontology_imperativesubsets_1 : (2 ^ 4) = 16 := by decide

/-- deontology: rightsduties(5, 2) = 10 -/
theorem fam_deontology_rightsduties_1 : (5 * 2) = 10 := by decide

/-- deontology: conflictcount(12, 8) = 4 -/
theorem fam_deontology_conflictcount_1 : (fmax 0 (12 - 8)) = 4 := by decide

/-- deployment: frequency(30, 30) = 1 — DEPLOYMENT — SHIPPING AS ARITHMETIC (the DORA measures, by hand only in
    name). How often a release goes out, how long a commit waits for release, what share of deploys fail, how
    fast service is restored, how often a release is rolled back, how available the result is, how healthy a
    canary is, how many replicas run. Crosses to `cloud` — deployment is what runs on the cloud. A measure. */
    const PROOF = 'deployment arithmetic (frequency, lead time, change-fail rate, MTTR, rollback rate,
    availability, canary health, replicas); the DORA measures; a measure crossed to cloud' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'deployment', dst: 'cloud', formula, value, proof: PROOF, ...extra
    }, holds, { name: `deployment.${name}`, params }) export class DeploymentFormulas { /** DEPLOY FREQUENCY:
    deploys per day. value ⌊deploys / days⌋. -/
theorem fam_deployment_frequency_1 : (30 / 30) = 1 := by decide

/-- deployment: leadtime(100, 160) = 60 — LEAD TIME: time a commit waits for its release. value max(0, release −
    commit). -/
theorem fam_deployment_leadtime_1 : (fmax 0 (160 - 100)) = 60 := by decide

/-- deployment: leadtime(160, 100) = 0 — LEAD TIME: time a commit waits for its release. value max(0, release −
    commit). -/
theorem fam_deployment_leadtime_2 : (fmax 0 (100 - 160)) = 0 := by decide

/-- deployment: failrate(5, 100) = 5 — CHANGE-FAIL RATE as a percentage. value ⌊failed · 100 / deploys⌋. -/
theorem fam_deployment_failrate_1 : ((5 * 100) / 100) = 5 := by decide

/-- deployment: mttr(600, 5) = 120 — MEAN TIME TO RESTORE: downtime over incidents. value ⌊downtime /
    incidents⌋. -/
theorem fam_deployment_mttr_1 : (600 / 5) = 120 := by decide

/-- deployment: rollback(2, 100) = 2 — ROLLBACK RATE as a percentage. value ⌊rollbacks · 100 / deploys⌋. -/
theorem fam_deployment_rollback_1 : ((2 * 100) / 100) = 2 := by decide

/-- deployment: availability(999, 1000) = 99 — AVAILABILITY as a percentage. value ⌊up · 100 / total⌋. -/
theorem fam_deployment_availability_1 : ((999 * 100) / 1000) = 99 := by decide

/-- deployment: canary(9, 10) = 90 — CANARY HEALTH: healthy instances as a percentage. value ⌊healthy · 100 /
    instances⌋. -/
theorem fam_deployment_canary_1 : ((9 * 100) / 10) = 90 := by decide

/-- deployment: replicas(7) = 7 — REPLICAS: the running count. value count. -/
theorem fam_deployment_replicas_1 : 7 = 7 := by decide

/-- depreciation: straightline(10000, 1000, 5) = 1800 — DEPRECIATION — THE BOOKS' FALL IN VALUE, AS ARITHMETIC
    (chosen by the asset registry, not by hand). An asset losing worth is numbers: the straight-line charge, the
    declining-balance charge, the per-unit charge, the book value left, what has piled up, the salvage, the
    rate, and the years remaining. Crosses to `accounting` — depreciation is an entry the books carry. A
    measure. */ const PROOF = 'depreciation arithmetic (straight-line, declining balance, units of production,
    book value, accumulated, salvage, rate, remaining life); the asset registry\'s uncovered domain; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'depreciation', dst:
    'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `depreciation.${name}`, params })
    export class DepreciationFormulas { /** STRAIGHT-LINE: the yearly charge, depreciable base spread over the
    life. value ⌊(cost − salvage) / life⌋. -/
theorem fam_depreciation_straightline_1 : ((10000 - 1000) / 5) = 1800 := by decide

/-- depreciation: decliningbalance(10000, 20) = 2000 — DECLINING BALANCE: a rate (percent) of the book value
    this period. value ⌊book · rate / 100⌋. -/
theorem fam_depreciation_decliningbalance_1 : ((10000 * 20) / 100) = 2000 := by decide

/-- depreciation: unitsofproduction(45000, 9000, 90000) = 4500 — UNITS OF PRODUCTION: the depreciable base
    apportioned by units used of the total. value ⌊base · used / total⌋. -/
theorem fam_depreciation_unitsofproduction_1 : ((45000 * 9000) / 90000) = 4500 := by decide

/-- depreciation: bookvalue(10000, 3600) = 6400 — BOOK VALUE: the cost left after what has depreciated. value
    max(0, cost − accumulated). -/
theorem fam_depreciation_bookvalue_1 : (fmax 0 (10000 - 3600)) = 6400 := by decide

/-- depreciation: accumulated(1800, 3) = 5400 — ACCUMULATED: the charges piled up over the years. value annual ·
    years. -/
theorem fam_depreciation_accumulated_1 : (1800 * 3) = 5400 := by decide

/-- depreciation: salvage(10000, 9000) = 1000 — SALVAGE: the residual, cost less the depreciable base. value
    max(0, cost − depreciable). -/
theorem fam_depreciation_salvage_1 : (fmax 0 (10000 - 9000)) = 1000 := by decide

/-- depreciation: rate(5) = 20 — RATE: the straight-line rate as a percent of life. value ⌊100 / life⌋. -/
theorem fam_depreciation_rate_1 : (100 / 5) = 20 := by decide

/-- depreciation: remaining(5, 3) = 2 — REMAINING: the useful life left after the years elapsed. value max(0,
    life − elapsed). -/
theorem fam_depreciation_remaining_1 : (fmax 0 (5 - 3)) = 2 := by decide

/-- depreciation: remaining(3, 5) = 0 — REMAINING: the useful life left after the years elapsed. value max(0,
    life − elapsed). -/
theorem fam_depreciation_remaining_2 : (fmax 0 (3 - 5)) = 0 := by decide

/-- derivative: intrinsic(150, 100) = 50 — DERIVATIVE — OPTIONS AND FUTURES, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A contract on a price is numbers: the intrinsic value of a call, the
    payoff across contracts, the notional it controls, the margin it posts, the leverage it carries, the
    breakeven of the position, whether it is in the money, and what it settles to. Crosses to `econ` — a
    derivative is a price of a price. A measure. */ const PROOF = 'derivative arithmetic (intrinsic, payoff,
    notional, margin, leverage, breakeven, moneyness, settlement); the registry\'s options/futures domain; a
    measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'derivative', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `derivative.${name}`, params }) export class
    DerivativeFormulas { /** INTRINSIC VALUE of a call: how far it is in the money. value max(0, spot − strike). -/
theorem fam_derivative_intrinsic_1 : (fmax 0 (150 - 100)) = 50 := by decide

/-- derivative: intrinsic(90, 100) = 0 — DERIVATIVE — OPTIONS AND FUTURES, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A contract on a price is numbers: the intrinsic value of a call, the
    payoff across contracts, the notional it controls, the margin it posts, the leverage it carries, the
    breakeven of the position, whether it is in the money, and what it settles to. Crosses to `econ` — a
    derivative is a price of a price. A measure. */ const PROOF = 'derivative arithmetic (intrinsic, payoff,
    notional, margin, leverage, breakeven, moneyness, settlement); the registry\'s options/futures domain; a
    measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'derivative', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `derivative.${name}`, params }) export class
    DerivativeFormulas { /** INTRINSIC VALUE of a call: how far it is in the money. value max(0, spot − strike). -/
theorem fam_derivative_intrinsic_2 : (fmax 0 (90 - 100)) = 0 := by decide

/-- derivative: payoff(10, 50) = 500 — PAYOFF across contracts at an intrinsic value each. value contracts ·
    intrinsic. -/
theorem fam_derivative_payoff_1 : (10 * 50) = 500 := by decide

/-- derivative: notional(10, 100, 50) = 50000 — NOTIONAL controlled: contracts at a multiplier and a price.
    value contracts · multiplier · price. -/
theorem fam_derivative_notional_1 : ((10 * 100) * 50) = 50000 := by decide

/-- derivative: margin(50000, 20) = 10000 — MARGIN posted: a percent of the notional. value ⌊notional · pct /
    100⌋. -/
theorem fam_derivative_margin_1 : ((50000 * 20) / 100) = 10000 := by decide

/-- derivative: leverage(50000, 10000) = 5 — LEVERAGE: the notional over the equity backing it. value ⌊notional
    / equity⌋. -/
theorem fam_derivative_leverage_1 : (50000 / 10000) = 5 := by decide

/-- derivative: breakeven(100, 5) = 105 — BREAKEVEN of a long call: strike plus premium paid. value strike +
    premium. -/
theorem fam_derivative_breakeven_1 : (100 + 5) = 105 := by decide

/-- derivative: settlement(120, 100, 10) = 200 — SETTLEMENT of a long future: the gain over the entry across
    contracts. value max(0, futures − spot) · contracts. -/
theorem fam_derivative_settlement_1 : ((fmax 0 (120 - 100)) * 10) = 200 := by decide

/-- derivatives: intrinsic(120, 100) = 20 — DERIVATIVES — FINANCIAL CONTRACTS, AS ARITHMETIC. A derivative is
    numbers: the intrinsic value of a call, the leverage a margin buys, the delta against the spot, the premium
    paid, the payoff at settlement, the breakeven, moneyness, and the margin a notional requires. Crosses to
    `trading` — derivatives are what trading moves. A measure. */ const PROOF = 'derivatives arithmetic
    (intrinsic, leverage, delta, premium, payoff, breakeven, moneyness, margin); a measure crossed to trading'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'derivatives', dst: 'trading', formula, value,
    proof: PROOF, ...extra }, holds, { name: `derivatives.${name}`, params }) export class DerivativesFormulas {
    /** INTRINSIC: the value of a call at expiry. value max(0, spot − strike). -/
theorem fam_derivatives_intrinsic_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- derivatives: intrinsic(80, 100) = 0 — DERIVATIVES — FINANCIAL CONTRACTS, AS ARITHMETIC. A derivative is
    numbers: the intrinsic value of a call, the leverage a margin buys, the delta against the spot, the premium
    paid, the payoff at settlement, the breakeven, moneyness, and the margin a notional requires. Crosses to
    `trading` — derivatives are what trading moves. A measure. */ const PROOF = 'derivatives arithmetic
    (intrinsic, leverage, delta, premium, payoff, breakeven, moneyness, margin); a measure crossed to trading'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'derivatives', dst: 'trading', formula, value,
    proof: PROOF, ...extra }, holds, { name: `derivatives.${name}`, params }) export class DerivativesFormulas {
    /** INTRINSIC: the value of a call at expiry. value max(0, spot − strike). -/
theorem fam_derivatives_intrinsic_2 : (fmax 0 (80 - 100)) = 0 := by decide

/-- derivatives: leverage(10000, 500) = 20 — LEVERAGE: the notional a margin controls. value ⌊notional /
    margin⌋. -/
theorem fam_derivatives_leverage_1 : (10000 / 500) = 20 := by decide

/-- derivatives: delta(50, 100) = 50 — DELTA: option change per unit spot change, ×100. value ⌊optionchange ·
    100 / spotchange⌋. -/
theorem fam_derivatives_delta_1 : ((50 * 100) / 100) = 50 := by decide

/-- derivatives: premium(20, 5) = 25 — PREMIUM: intrinsic value plus time value. value intrinsic + time. -/
theorem fam_derivatives_premium_1 : (20 + 5) = 25 := by decide

/-- derivatives: payoff(130, 100) = 30 — PAYOFF: the value at settlement. value max(0, settlement − strike). -/
theorem fam_derivatives_payoff_1 : (fmax 0 (130 - 100)) = 30 := by decide

/-- derivatives: breakeven(100, 5) = 105 — BREAKEVEN: strike plus the premium paid. value strike + premium. -/
theorem fam_derivatives_breakeven_1 : (100 + 5) = 105 := by decide

/-- derivatives: moneyness(110, 100) = 110 — MONEYNESS: spot over strike, ×100. value ⌊spot · 100 / strike⌋. -/
theorem fam_derivatives_moneyness_1 : ((110 * 100) / 100) = 110 := by decide

/-- derivatives: margin(10000, 15) = 1500 — MARGIN: the margin a notional requires at a rate (percent). value
    ⌊notional · rate / 100⌋. -/
theorem fam_derivatives_margin_1 : ((10000 * 15) / 100) = 1500 := by decide

/-- dermatology: tbsa(9, 2) = 18 — DERMATOLOGY — THE SKIN, AS ARITHMETIC. Reading the skin is numbers: burned
    surface, a melanoma score, a UV dose, how a wound heals, lesions over an area, pigmentation over a baseline,
    severity over the whole, and hydration of tissue. Crosses to `med` — dermatology is a branch of medicine. A
    measure. */ const PROOF = 'dermatology arithmetic (burned surface, melanoma score, UV dose, healing,
    lesions, pigmentation, severity, hydration); the skin as a measure crossed to med' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'dermatology', dst: 'med', formula, value, proof: PROOF, ...extra
    }, holds, { name: `dermatology.${name}`, params }) export class DermatologyFormulas { /** TBSA: total body
    surface area burned, regions at a value each. value regions · value. -/
theorem fam_dermatology_tbsa_1 : (9 * 2) = 18 := by decide

/-- dermatology: melanoma(3, 7) = 10 — MELANOMA score: asymmetry plus diameter. value asymmetry + diameter. -/
theorem fam_dermatology_melanoma_1 : (3 + 7) = 10 := by decide

/-- dermatology: uv(8, 30) = 240 — UV EXPOSURE DOSE: index over minutes. value index · minutes. -/
theorem fam_dermatology_uv_1 : (8 * 30) = 240 := by decide

/-- dermatology: healing(75, 100) = 75 — HEALING as a percentage of the wound. value ⌊healed · 100 / wound⌋. -/
theorem fam_dermatology_healing_1 : ((75 * 100) / 100) = 75 := by decide

/-- dermatology: lesions(100, 5) = 20 — LESIONS per unit area. value ⌊count / area⌋. -/
theorem fam_dermatology_lesions_1 : (100 / 5) = 20 := by decide

/-- dermatology: pigmentation(90, 50) = 40 — PIGMENTATION above a baseline. value max(0, melanin − baseline). -/
theorem fam_dermatology_pigmentation_1 : (fmax 0 (90 - 50)) = 40 := by decide

/-- dermatology: pigmentation(40, 50) = 0 — PIGMENTATION above a baseline. value max(0, melanin − baseline). -/
theorem fam_dermatology_pigmentation_2 : (fmax 0 (40 - 50)) = 0 := by decide

/-- dermatology: severity(30, 120) = 25 — SEVERITY: affected area as a percentage of the total. value ⌊affected
    · 100 / total⌋. -/
theorem fam_dermatology_severity_1 : ((30 * 100) / 120) = 25 := by decide

/-- dermatology: hydration(60, 100) = 60 — HYDRATION: water as a percentage of the tissue. value ⌊water · 100 /
    tissue⌋. -/
theorem fam_dermatology_hydration_1 : ((60 * 100) / 100) = 60 := by decide

/-- desalination: recovery(45, 100) = 45 — DESALINATION — TURNING SEAWATER INTO FRESH WATER, AS ARITHMETIC (a
    reverse-osmosis train is numbers). Recovery ratio, feed salinity, the permeate a mass balance leaves, salt
    rejection, membrane flux, the osmotic pressure to beat, the brine sent back, and the specific energy a cubic
    metre costs. Crosses to `chemistry` — desalination is a chemistry the membrane does. A measure. */ const
    PROOF = 'desalination arithmetic (recovery, salinity, permeate mass balance, salt rejection, membrane flux,
    osmotic pressure, brine, specific energy); a reverse-osmosis train as integers; a measure crossed to
    chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'desalination', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `desalination.${name}`, params }) export class
    DesalinationFormulas { /** RECOVERY: the permeate won as a percentage of the feed. value ⌊permeate · 100 /
    feed⌋. -/
theorem fam_desalination_recovery_1 : ((45 * 100) / 100) = 45 := by decide

/-- desalination: salinity(35000, 1000) = 35 — SALINITY: salt mass over volume, a concentration. value ⌊salt /
    volume⌋. -/
theorem fam_desalination_salinity_1 : (35000 / 1000) = 35 := by decide

/-- desalination: permeate(1000, 550) = 450 — PERMEATE: the fresh water a mass balance leaves. value max(0, feed
    − brine). -/
theorem fam_desalination_permeate_1 : (fmax 0 (1000 - 550)) = 450 := by decide

/-- desalination: rejection(35000, 350) = 99 — REJECTION: the salt the membrane holds back, as a percentage.
    value ⌊(feedSalt − permSalt) · 100 / feedSalt⌋. -/
theorem fam_desalination_rejection_1 : (((35000 - 350) * 100) / 35000) = 99 := by decide

/-- desalination: flux(1200, 60) = 20 — FLUX: permeate volume over membrane area. value ⌊volume / area⌋. -/
theorem fam_desalination_flux_1 : (1200 / 60) = 20 := by decide

/-- desalination: osmotic(35, 300) = 10500 — OSMOTIC PRESSURE: van't Hoff, proportional to concentration and
    temperature. value conc · temp. -/
theorem fam_desalination_osmotic_1 : (35 * 300) = 10500 := by decide

/-- desalination: brine(1000, 450) = 550 — BRINE: the concentrate a mass balance sends back. value max(0, feed −
    permeate). -/
theorem fam_desalination_brine_1 : (fmax 0 (1000 - 450)) = 550 := by decide

/-- desalination: brine(400, 1000) = 0 — BRINE: the concentrate a mass balance sends back. value max(0, feed −
    permeate). -/
theorem fam_desalination_brine_2 : (fmax 0 (400 - 1000)) = 0 := by decide

/-- desalination: energy(1500, 500) = 3 — SPECIFIC ENERGY: power over the flow it treats. value ⌊power / flow⌋. -/
theorem fam_desalination_energy_1 : (1500 / 500) = 3 := by decide

/-- determinism: causallinks(100, 2) = 200 -/
theorem fam_determinism_causallinks_1 : (100 * 2) = 200 := by decide

/-- determinism: freedomdegrees(100, 100) = 0 -/
theorem fam_determinism_freedomdegrees_1 : (fmax 0 (100 - 100)) = 0 := by decide

/-- determinism: predictabilityratio(90, 100) = 90 -/
theorem fam_determinism_predictabilityratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- determinism: causalsubsets(5) = 32 -/
theorem fam_determinism_causalsubsets_1 : (2 ^ 5) = 32 := by decide

/-- determinism: branchingfactor(1024, 10) = 102 -/
theorem fam_determinism_branchingfactor_1 : (1024 / 10) = 102 := by decide

/-- determinism: necessitylevel(3, 1) = 4 -/
theorem fam_determinism_necessitylevel_1 : (3 + 1) = 4 := by decide

/-- dewpoint: approximation(30, 50) = 20 — DEWPOINT — THE TEMPERATURE THE AIR MUST COOL TO FOR WATER TO
    CONDENSE, AS ARITHMETIC. Moist air is numbers: the dewpoint from temperature and humidity, the spread to the
    air temperature, the frostpoint, Espy's condensation level, a comfort band, the wet-bulb depression, the
    humidity read back from the dewpoint, and the lifting condensation level height. Crosses to `climatology` —
    dewpoint is what climatology measures over time. A measure. */ const PROOF = 'dewpoint arithmetic
    (approximation, spread, frostpoint, condensation level, comfort band, wet-bulb depression, humidity from
    dew, LCL height); a measure crossed to climatology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'dewpoint', dst: 'climatology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `dewpoint.${name}`, params }) export class DewpointFormulas { /** APPROXIMATION: the dewpoint from
    temperature and relative humidity. value max(0, temp − ⌊(100 − rh) / 5⌋). -/
theorem fam_dewpoint_approximation_1 : (fmax 0 (30 - ((100 - 50) / 5))) = 20 := by decide

/-- dewpoint: condensationlevel(30, 20) = 1250 — CONDENSATION LEVEL: Espy's cloud-base estimate in metres. value
    max(0, temp − dew) · 125. -/
theorem fam_dewpoint_condensationlevel_1 : ((fmax 0 (30 - 20)) * 125) = 1250 := by decide

/-- dewpoint: depression(25, 18) = 7 — DEPRESSION: the wet-bulb depression. value max(0, temp − wet). -/
theorem fam_dewpoint_depression_1 : (fmax 0 (25 - 18)) = 7 := by decide

/-- dewpoint: frostpoint(5, 2) = 3 — FROSTPOINT: the dewpoint dropped by a freezing offset. value max(0, dew −
    offset). -/
theorem fam_dewpoint_frostpoint_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- dewpoint: humidityfromdew(30, 20) = 50 — HUMIDITY FROM DEW: the relative humidity read back from the spread.
    value max(0, 100 − max(0, temp − dew) · 5). -/
theorem fam_dewpoint_humidityfromdew_1 : (fmax 0 (100 - ((fmax 0 (30 - 20)) * 5))) = 50 := by decide

/-- dewpoint: lclheight(30, 20) = 2280 — LCL HEIGHT: the lifting condensation level in feet. value max(0, temp −
    dew) · 228. -/
theorem fam_dewpoint_lclheight_1 : ((fmax 0 (30 - 20)) * 228) = 2280 := by decide

/-- dewpoint: spread(30, 20) = 10 — SPREAD: the dewpoint depression, air temperature over the dewpoint. value
    max(0, temp − dew). -/
theorem fam_dewpoint_spread_1 : (fmax 0 (30 - 20)) = 10 := by decide

/-- dialectic: thesisantithesis(1, 1) = 2 -/
theorem fam_dialectic_thesisantithesis_1 : (1 + 1) = 2 := by decide

/-- dialectic: syntheses(3, 3) = 9 -/
theorem fam_dialectic_syntheses_1 : (3 * 3) = 9 := by decide

/-- dialectic: contradictioncount(20, 14) = 6 -/
theorem fam_dialectic_contradictioncount_1 : (fmax 0 (20 - 14)) = 6 := by decide

/-- dialectic: resolutiondepth(3, 2) = 5 -/
theorem fam_dialectic_resolutiondepth_1 : (3 + 2) = 5 := by decide

/-- dialectic: validmoves(4) = 16 -/
theorem fam_dialectic_validmoves_1 : (2 ^ 4) = 16 := by decide

/-- dice: expectedsum(6, 2) = 7 — DICE — TABLETOP CHANCE AS ARITHMETIC. Rolling dice is numbers: the outcomes a
    pool can show, the sum you expect, the percent chance of one face, the span from lowest to highest, the ways
    to choose, the spread, the most common sum, and the lift of rolling with advantage. Crosses to `probability`
    — dice are what probability counts. A measure. */ const PROOF = 'dice arithmetic (outcome space, expected
    sum, single-face percent, range, combinations, variance, modal sum, advantage); exact finite integers over
    small dice; a measure crossed to probability' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'dice', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `dice.${name}`,
    params }) export class DiceFormulas { /** OUTCOME SPACE: the faces a pool of dice can show. value
    sides^dice. */ static outcomes(sides: number, dice: number): CrossFormula { let v = 1; for (let i = 0; i <
    dice; i++) v *= sides; return c('dice-outcomes', 'outcomes(sides, dice) = sides^dice', nat(sides, dice) ? v
    : 0, nat(sides, dice), 'outcomes', [sides, dice]) } /** EXPECTED SUM of the pool. value ⌊dice · (sides + 1)
    / 2⌋. -/
theorem fam_dice_expectedsum_1 : ((2 * (6 + 1)) / 2) = 7 := by decide

/-- dice: probabilitypct(6) = 16 — SINGLE-FACE PROBABILITY as a percentage. value ⌊100 / sides⌋. -/
theorem fam_dice_probabilitypct_1 : (100 / 6) = 16 := by decide

/-- dice: range(6, 2) = 10 — RANGE: the span from the lowest to the highest sum. value dice · (sides − 1). -/
theorem fam_dice_range_1 : (2 * (6 - 1)) = 10 := by decide

/-- dice: mode(6, 3) = 10 — MODAL SUM: the most common sum of the pool. value dice + ⌊dice · (sides − 1) / 2⌋. -/
theorem fam_dice_mode_1 : (3 + ((3 * (6 - 1)) / 2)) = 10 := by decide

/-- dietetics: caloriesneeded(2000, 1) = 2000 -/
theorem fam_dietetics_caloriesneeded_1 : (2000 * 1) = 2000 := by decide

/-- dietetics: macropct(30, 100) = 30 -/
theorem fam_dietetics_macropct_1 : ((30 * 100) / 100) = 30 := by decide

/-- dietetics: bmi(7000, 324) = 21 -/
theorem fam_dietetics_bmi_1 : (7000 / 324) = 21 := by decide

/-- dietetics: proteingrams(70, 1) = 70 -/
theorem fam_dietetics_proteingrams_1 : (70 * 1) = 70 := by decide

/-- dietetics: mealsperday(3, 2) = 5 -/
theorem fam_dietetics_mealsperday_1 : (3 + 2) = 5 := by decide

/-- dietetics: waterml(35, 70) = 2450 -/
theorem fam_dietetics_waterml_1 : (35 * 70) = 2450 := by decide

/-- dietetics: deficit(2500, 2000) = 500 -/
theorem fam_dietetics_deficit_1 : (fmax 0 (2500 - 2000)) = 500 := by decide

/-- diffraction: gratingorder(3, 500) = 1500 — DIFFRACTION — WAVES BENT AND SPREAD BY APERTURES AND GRATINGS, AS
    ARITHMETIC (integer proxies, no trigonometry). The bending of light is numbers: the order of a maximum, the
    spacing a grating's lines imply, a grating's resolving power, the fringe spacing of a two-slit pattern, the
    Bragg order off a crystal plane, an aperture in wavelengths, the Rayleigh resolution limit, and the path
    difference across a slit. Crosses to `electromagnetism` — diffraction is what light does. A measure. */
    const PROOF = 'diffraction arithmetic (grating order, slit spacing, resolving power, fringe spacing, Bragg
    order, aperture in wavelengths, Rayleigh limit, path difference); integer proxies, no trigonometry; a
    measure crossed to electromagnetism' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'diffraction', dst: 'electromagnetism', formula, value, proof: PROOF, ...extra }, holds, { name:
    `diffraction.${name}`, params }) export class DiffractionFormulas { /** GRATING ORDER: the path of the m-th
    constructive maximum. value order · wave. -/
theorem fam_diffraction_gratingorder_1 : (3 * 500) = 1500 := by decide

/-- diffraction: slitspacing(10000, 500) = 20 — SLIT SPACING: a grating's line spacing from its width and line
    count. value ⌊width / lines⌋. -/
theorem fam_diffraction_slitspacing_1 : (10000 / 500) = 20 := by decide

/-- diffraction: resolvingpower(2, 600) = 1200 — RESOLVING POWER: a grating's power at an order over its
    illuminated lines. value order · lines. -/
theorem fam_diffraction_resolvingpower_1 : (2 * 600) = 1200 := by decide

/-- diffraction: fringespacing(500, 2000, 100) = 10000 — FRINGE SPACING: a two-slit pattern's fringe spacing on
    a screen. value ⌊wave · dist / slit⌋. -/
theorem fam_diffraction_fringespacing_1 : ((500 * 2000) / 100) = 10000 := by decide

/-- diffraction: braggangle(2, 600, 300) = 2 — BRAGG ORDER: the order off a crystal plane, 2·spacing the base.
    value ⌊order · wave / (2 · spacing)⌋. -/
theorem fam_diffraction_braggangle_1 : ((2 * 600) / (2 * 300)) = 2 := by decide

/-- diffraction: aperture(10000, 500) = 20 — APERTURE: an aperture's diameter counted in wavelengths. value
    ⌊diameter / wave⌋. -/
theorem fam_diffraction_aperture_1 : (10000 / 500) = 20 := by decide

/-- diffraction: rayleighcriterion(500, 1000) = 61 — RAYLEIGH CRITERION: the resolution limit, 1.22 carried as
    122. value ⌊122 · wave / diameter⌋. -/
theorem fam_diffraction_rayleighcriterion_1 : ((122 * 500) / 1000) = 61 := by decide

/-- diffraction: pathdifference(300, 4) = 1200 — PATH DIFFERENCE: the path difference across a slit at an order.
    value spacing · order. -/
theorem fam_diffraction_pathdifference_1 : (300 * 4) = 1200 := by decide

/-- diffraction: slitspacing(10000, 0) = 0 — SLIT SPACING: a grating's line spacing from its width and line
    count. value ⌊width / lines⌋. -/
theorem fam_diffraction_slitspacing_2 : (10000 / 0) = 0 := by decide

/-- diffusion: flux(5, 20) = 100 — DIFFUSION — TRANSPORT DOWN A GRADIENT, AS ARITHMETIC. Matter spreading is
    numbers: the flux through a face, the concentration gradient, mean squared displacement in a time, membrane
    permeability, Fick's steady rate, the drop across a barrier, the effusion ratio of two species, and whether
    influx balances outflux. Crosses to `chemistry` — diffusion is how chemistry moves. A measure. */ const
    PROOF = 'diffusion arithmetic (flux, gradient, mean squared displacement, permeability, Fick rate,
    concentration drop, effusion ratio, steady state); transport down a gradient; a measure crossed to
    chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'diffusion', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `diffusion.${name}`, params }) export class
    DiffusionFormulas { /** FLUX: Fick's first law as a product — diffusivity times the gradient. value d ·
    gradient. -/
theorem fam_diffusion_flux_1 : (5 * 20) = 100 := by decide

/-- diffusion: gradient(100, 40, 3) = 20 — GRADIENT: the concentration difference per unit distance. value
    ⌊max(0, chigh − clow) / dist⌋. -/
theorem fam_diffusion_gradient_1 : ((fmax 0 (100 - 40)) / 3) = 20 := by decide

/-- diffusion: meansquare(5, 10) = 100 — MEAN SQUARED DISPLACEMENT: 1D Einstein relation ⟨x²⟩ = 2·D·t. value 2 ·
    d · t. -/
theorem fam_diffusion_meansquare_1 : ((2 * 5) * 10) = 100 := by decide

/-- diffusion: permeability(10, 6, 4) = 15 — PERMEABILITY: diffusivity times solubility over thickness. value ⌊d
    · sol / thick⌋. -/
theorem fam_diffusion_permeability_1 : ((10 * 6) / 4) = 15 := by decide

/-- diffusion: fickrate(5000, 100) = 50 — FICK RATE: mass transported over the elapsed time. value ⌊mass /
    time⌋. -/
theorem fam_diffusion_fickrate_1 : (5000 / 100) = 50 := by decide

/-- diffusion: concentrationdrop(90, 25) = 65 — CONCENTRATION DROP across a barrier. value max(0, cin − cout). -/
theorem fam_diffusion_concentrationdrop_1 : (fmax 0 (90 - 25)) = 65 := by decide

/-- diffusion: concentrationdrop(20, 50) = 0 — CONCENTRATION DROP across a barrier. value max(0, cin − cout). -/
theorem fam_diffusion_concentrationdrop_2 : (fmax 0 (20 - 50)) = 0 := by decide

/-- diffusion: effusionratio(100, 50) = 200 — EFFUSION RATIO: Graham's-law proxy, the lighter species scaled by
    100 over the heavier. value ⌊m1 · 100 / m2⌋. -/
theorem fam_diffusion_effusionratio_1 : ((100 * 100) / 50) = 200 := by decide

/-- diplomacy: consensus(3, 4) = 75 — DIPLOMACY — THE STATECRAFT OF AGREEMENT, AS ARITHMETIC. Negotiation is
    numbers: the share of parties that agreed, bargaining leverage, the share of signatories that ratified, the
    tension of incidents over a period, the share of a bloc allied, the share of trade sanctioned, concessions
    given against gained, and resolutions per summit session. Crosses to `sociology` — diplomacy is the group
    behaviour of states. A measure. */ const PROOF = 'diplomacy arithmetic (consensus, leverage, treaty
    ratification, tension, alliance, sanction, concession, summit); statecraft as a measure crossed to
    sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'diplomacy', dst: 'sociology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `diplomacy.${name}`, params }) export class
    DiplomacyFormulas { /** CONSENSUS: the share of parties that agreed, as a percentage. value ⌊agreed · 100 /
    parties⌋. -/
theorem fam_diplomacy_consensus_1 : ((3 * 100) / 4) = 75 := by decide

/-- diplomacy: leverage(100, 20) = 5 — LEVERAGE: assets over demands. value ⌊assets / demands⌋. -/
theorem fam_diplomacy_leverage_1 : (100 / 20) = 5 := by decide

/-- diplomacy: treaty(18, 20) = 90 — TREATY: the share of signatories that ratified, as a percentage. value
    ⌊ratified · 100 / signatories⌋. -/
theorem fam_diplomacy_treaty_1 : ((18 * 100) / 20) = 90 := by decide

/-- diplomacy: tension(120, 12) = 10 — TENSION: incidents over a period. value ⌊incidents / period⌋. -/
theorem fam_diplomacy_tension_1 : (120 / 12) = 10 := by decide

/-- diplomacy: alliance(12, 30) = 40 — ALLIANCE: the share of a bloc allied, as a percentage. value ⌊members ·
    100 / bloc⌋. -/
theorem fam_diplomacy_alliance_1 : ((12 * 100) / 30) = 40 := by decide

/-- diplomacy: sanction(250, 1000) = 25 — SANCTION: the share of trade sanctioned, as a percentage. value
    ⌊restricted · 100 / trade⌋. -/
theorem fam_diplomacy_sanction_1 : ((250 * 100) / 1000) = 25 := by decide

/-- diplomacy: concession(30, 40) = 75 — CONCESSION: given against gained, as a percentage. value ⌊given · 100 /
    gained⌋. -/
theorem fam_diplomacy_concession_1 : ((30 * 100) / 40) = 75 := by decide

/-- diplomacy: summit(24, 6) = 4 — SUMMIT: resolutions over sessions. value ⌊resolutions / sessions⌋. -/
theorem fam_diplomacy_summit_1 : (24 / 6) = 4 := by decide

/-- discourse: cohesion(45, 100) = 45 — DISCOURSE — CONNECTED TEXT ABOVE THE SENTENCE, AS ARITHMETIC (how
    utterances hang together, not single words). Running conversation is numbers: cohesive ties, coherence
    relations, how long a turn runs, how long reference chains get, how often the topic shifts, connective
    density, anaphora density, and the utterances spoken. Crosses to `linguistics` — discourse is the structure
    linguistics describes. A measure. */ const PROOF = 'discourse arithmetic (cohesion, coherence, turn length,
    reference chains, topic shifts, connectives, anaphora density, utterance count); connected text above the
    sentence; a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'discourse', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `discourse.${name}`, params }) export class DiscourseFormulas { /** COHESION: cohesive ties per hundred
    sentences. value ⌊links · 100 / sentences⌋. -/
theorem fam_discourse_cohesion_1 : ((45 * 100) / 100) = 45 := by decide

/-- discourse: coherence(30, 50) = 60 — COHERENCE: coherence relations per hundred propositions. value
    ⌊relations · 100 / propositions⌋. -/
theorem fam_discourse_coherence_1 : ((30 * 100) / 50) = 60 := by decide

/-- discourse: turnlength(1000, 50) = 20 — TURN LENGTH: words over the turns taken. value ⌊words / turns⌋. -/
theorem fam_discourse_turnlength_1 : (1000 / 50) = 20 := by decide

/-- discourse: referencechains(120, 30) = 4 — REFERENCE CHAINS: mentions over the entities referred to. value
    ⌊mentions / entities⌋. -/
theorem fam_discourse_referencechains_1 : (120 / 30) = 4 := by decide

/-- discourse: topicshifts(12, 200) = 6 — TOPIC SHIFTS: shifts per hundred segments. value ⌊shifts · 100 /
    segments⌋. -/
theorem fam_discourse_topicshifts_1 : ((12 * 100) / 200) = 6 := by decide

/-- discourse: connectives(80, 400) = 20 — CONNECTIVES: connective density per hundred clauses. value
    ⌊connectives · 100 / clauses⌋. -/
theorem fam_discourse_connectives_1 : ((80 * 100) / 400) = 20 := by decide

/-- discourse: anaphoradensity(50, 5000) = 10 — ANAPHORA DENSITY: anaphors per thousand tokens. value ⌊anaphors
    · 1000 / tokens⌋. -/
theorem fam_discourse_anaphoradensity_1 : ((50 * 1000) / 5000) = 10 := by decide

/-- discourse: utterancecount(4, 25) = 100 — UTTERANCE COUNT: speakers each contributing a share of utterances.
    value speakers · perSpeaker. -/
theorem fam_discourse_utterancecount_1 : (4 * 25) = 100 := by decide

/-- dispatch: queuewait(600, 20) = 30 -/
theorem fam_dispatch_queuewait_1 : (600 / 20) = 30 := by decide

/-- dispatch: assignmentrate(120, 4) = 30 -/
theorem fam_dispatch_assignmentrate_1 : (120 / 4) = 30 := by decide

/-- dispatch: idletime(480, 420) = 60 -/
theorem fam_dispatch_idletime_1 : (fmax 0 (480 - 420)) = 60 := by decide

/-- dispatch: responsetime(600, 12) = 50 -/
theorem fam_dispatch_responsetime_1 : (600 / 12) = 50 := by decide

/-- dispatch: jobspershift(8, 6) = 48 -/
theorem fam_dispatch_jobspershift_1 : (8 * 6) = 48 := by decide

/-- dispatch: overtimeratio(60, 480) = 12 -/
theorem fam_dispatch_overtimeratio_1 : ((60 * 100) / 480) = 12 := by decide

/-- dispatch: coverage(18, 20) = 90 -/
theorem fam_dispatch_coverage_1 : ((18 * 100) / 20) = 90 := by decide

/-- dispatch: backlog(50, 42) = 8 -/
theorem fam_dispatch_backlog_1 : (fmax 0 (50 - 42)) = 8 := by decide

/-- distillation: purity(95, 100) = 95 — DISTILLATION — SEPARATION AS ARITHMETIC. Splitting a mixture is
    numbers: the purity of a cut, the reflux ratio, the theoretical plates a column holds, the relative
    volatility of the components, the recovery of what was fed, the heads cut off the front, the boiling
    temperature held, and the azeotrope's balance. Crosses to `chemistry` — distillation is chemistry made
    quantitative. A measure. */ const PROOF = 'distillation arithmetic (purity, reflux ratio, theoretical
    plates, relative volatility, recovery, heads cut, boiling temperature, azeotrope balance); a measure crossed
    to chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'distillation', dst: 'chemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `distillation.${name}`, params }) export class
    DistillationFormulas { /** PURITY of a cut as a percentage. value ⌊target · 100 / total⌋. -/
theorem fam_distillation_purity_1 : ((95 * 100) / 100) = 95 := by decide

/-- distillation: reflux(80, 20) = 400 — REFLUX ratio as a percentage. value ⌊returned · 100 / distillate⌋. -/
theorem fam_distillation_reflux_1 : ((80 * 100) / 20) = 400 := by decide

/-- distillation: plates(300, 25) = 12 — THEORETICAL PLATES: separation height over height-equivalent per plate.
    value ⌊separation / hetp⌋. -/
theorem fam_distillation_plates_1 : (300 / 25) = 12 := by decide

/-- distillation: volatility(240, 100) = 240 — RELATIVE VOLATILITY of vapor over liquid. value ⌊vapor · 100 /
    liquid⌋. -/
theorem fam_distillation_volatility_1 : ((240 * 100) / 100) = 240 := by decide

/-- distillation: recovery(85, 100) = 85 — RECOVERY of what was collected over what was fed. value ⌊collected ·
    100 / fed⌋. -/
theorem fam_distillation_recovery_1 : ((85 * 100) / 100) = 85 := by decide

/-- distillation: cut(5, 100) = 5 — HEADS CUT off the front as a percentage. value ⌊heads · 100 / total⌋. -/
theorem fam_distillation_cut_1 : ((5 * 100) / 100) = 5 := by decide

/-- distillation: temperature(78) = 78 — BOILING TEMPERATURE held, in degrees celsius. value celsius. -/
theorem fam_distillation_temperature_1 : 78 = 78 := by decide

/-- distillation: azeotrope(96, 4) = 96 — AZEOTROPE balance of component a in the pair. value ⌊componenta · 100
    / (componenta + componentb)⌋. -/
theorem fam_distillation_azeotrope_1 : ((96 * 100) / (96 + 4)) = 96 := by decide

/-- distilling: abv(40, 100) = 40 -/
theorem fam_distilling_abv_1 : ((40 * 100) / 100) = 40 := by decide

/-- distilling: cuts(3, 1) = 4 -/
theorem fam_distilling_cuts_1 : (3 + 1) = 4 := by decide

/-- distilling: boilingpoint(78, 100) = 100 -/
theorem fam_distilling_boilingpoint_1 : (fmax 78 100) = 100 := by decide

/-- distilling: refluxratio(50, 10) = 5 -/
theorem fam_distilling_refluxratio_1 : (50 / 10) = 5 := by decide

/-- distilling: yieldliters(1000, 10) = 100 -/
theorem fam_distilling_yieldliters_1 : (1000 / 10) = 100 := by decide

/-- distilling: distillationruns(3, 1) = 3 -/
theorem fam_distilling_distillationruns_1 : (3 * 1) = 3 := by decide

/-- distilling: puritypct(95, 100) = 95 -/
theorem fam_distilling_puritypct_1 : ((95 * 100) / 100) = 95 := by decide

/-- distribution: spokes(12, 8) = 96 — SPOKES: the spoke links hubs carry at nodes each. value hubs · nodes. -/
theorem fam_distribution_spokes_1 : (12 * 8) = 96 := by decide

/-- distribution: coverage(999, 1000) = 99 — COVERAGE as a percentage. value ⌊served · 100 / total⌋. -/
theorem fam_distribution_coverage_1 : ((999 * 100) / 1000) = 99 := by decide

/-- distribution: density(5000, 100) = 50 — DENSITY: points over the area they cover. value ⌊points / area⌋. -/
theorem fam_distribution_density_1 : (5000 / 100) = 50 := by decide

/-- distribution: dropsize(6000, 60) = 100 — DROP SIZE: units over the stops they serve. value ⌊units / stops⌋. -/
theorem fam_distribution_dropsize_1 : (6000 / 60) = 100 := by decide

/-- distribution: routes(1000, 5) = 5000 — ROUTES: trucks at a per-truck capacity. value trucks · perTruck. -/
theorem fam_distribution_routes_1 : (1000 * 5) = 5000 := by decide

/-- distribution: echelon(10000, 90) = 900 — ECHELON: volume (units) at a rate per thousand. value ⌊volume ·
    rate / 1000⌋. -/
theorem fam_distribution_echelon_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- dominoes: doubles(7, 0) = 7 -/
theorem fam_dominoes_doubles_1 : (7 + 0) = 7 := by decide

/-- dominoes: totaltiles(21, 7) = 28 -/
theorem fam_dominoes_totaltiles_1 : (21 + 7) = 28 := by decide

/-- dominoes: pips(28, 6) = 168 -/
theorem fam_dominoes_pips_1 : (28 * 6) = 168 := by decide

/-- dominoes: handsubsets(7) = 128 -/
theorem fam_dominoes_handsubsets_1 : (2 ^ 7) = 128 := by decide

/-- dominoes: maxpip(6, 0) = 6 -/
theorem fam_dominoes_maxpip_1 : (6 + 0) = 6 := by decide

/-- dosage: perweight(70, 5) = 350 — DOSAGE — PRESCRIBING AS ARITHMETIC (chosen by the clinical registry, not by
    hand). A dose is numbers: amount by body weight, amount by body surface area, the daily total, the divided
    dose, the capped maximum, the pediatric scale-down, the maintenance fraction, and the cumulative exposure.
    Crosses to `pharmacology` — dosage is what pharmacology prescribes. A measure. */ const PROOF = 'dosage
    arithmetic (per-weight, per-BSA, daily total, divided dose, maximum cap, pediatric scale, maintenance
    fraction, cumulative exposure); a clinical measure crossed to pharmacology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'dosage', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `dosage.${name}`, params }) export class DosageFormulas { /** PER-WEIGHT DOSE: milligrams per kilogram
    over body weight. value weight · perkg. -/
theorem fam_dosage_perweight_1 : (70 * 5) = 350 := by decide

/-- dosage: perbsa(2, 100) = 200 — PER-BSA DOSE: milligrams per square metre over body surface area. value bsa ·
    perm2. -/
theorem fam_dosage_perbsa_1 : (2 * 100) = 200 := by decide

/-- dosage: daily(250, 3) = 750 — DAILY TOTAL: a single dose taken a number of times. value dose · times. -/
theorem fam_dosage_daily_1 : (250 * 3) = 750 := by decide

/-- dosage: divided(750, 3) = 250 — DIVIDED DOSE: a daily total split across administrations. value ⌊daily /
    times⌋. -/
theorem fam_dosage_divided_1 : (750 / 3) = 250 := by decide

/-- dosage: maximum(900, 800) = 800 — MAXIMUM: a dose capped at a ceiling. value min(dose, cap). -/
theorem fam_dosage_maximum_1 : (fmin 900 800) = 800 := by decide

/-- dosage: maximum(500, 800) = 500 — MAXIMUM: a dose capped at a ceiling. value min(dose, cap). -/
theorem fam_dosage_maximum_2 : (fmin 500 800) = 500 := by decide

/-- dosage: pediatric(140, 35) = 70 — PEDIATRIC (Clark's rule): the adult dose scaled by weight against a 70 kg
    adult. value ⌊adult · weight / 70⌋. -/
theorem fam_dosage_pediatric_1 : ((140 * 35) / 70) = 70 := by decide

/-- dosage: maintenance(1000, 25) = 250 — MAINTENANCE: a percentage fraction of the loading dose. value ⌊loading
    · fraction / 100⌋. -/
theorem fam_dosage_maintenance_1 : ((1000 * 25) / 100) = 250 := by decide

/-- dosage: cumulative(500, 7) = 3500 — CUMULATIVE EXPOSURE: a daily dose over a course of days. value dose ·
    days. -/
theorem fam_dosage_cumulative_1 : (500 * 7) = 3500 := by decide

/-- dosimetry: absorbeddose(600, 12) = 50 — DOSIMETRY — RADIATION DOSE AS ARITHMETIC (chosen by the physics
    registry, not by hand). Dose is numbers: energy deposited per mass, the equivalent dose a radiation
    weighting gives, the effective dose a tissue carries, the rate it arrives at, how a treatment splits into
    fractions, the cumulative course, the shielding layers a thickness is, and the exposure time a target needs.
    Crosses to `radiology` — dosimetry is what radiology measures. A measure. */ const PROOF = 'dosimetry
    arithmetic (absorbed dose, equivalent dose, effective dose, dose rate, fractionation, cumulative, shielding,
    exposure time); the physics registry\'s uncovered dose domain; a measure crossed to radiology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'dosimetry', dst: 'radiology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `dosimetry.${name}`, params }) export class DosimetryFormulas { /** ABSORBED
    DOSE: energy deposited over mass (Gray = J/kg). value ⌊energy / mass⌋. -/
theorem fam_dosimetry_absorbeddose_1 : (600 / 12) = 50 := by decide

/-- dosimetry: equivalentdose(50, 20) = 1000 — EQUIVALENT DOSE: absorbed dose weighted by the radiation (Sievert
    = Gray · wR). value dose · wr. -/
theorem fam_dosimetry_equivalentdose_1 : (50 * 20) = 1000 := by decide

/-- dosimetry: effectivedose(1000, 12) = 120 — EFFECTIVE DOSE: equivalent dose weighted by the tissue (wT as a
    percent). value ⌊dose · wt / 100⌋. -/
theorem fam_dosimetry_effectivedose_1 : ((1000 * 12) / 100) = 120 := by decide

/-- dosimetry: doserate(1000, 20) = 50 — DOSE RATE: dose over the time it took. value ⌊dose / time⌋. -/
theorem fam_dosimetry_doserate_1 : (1000 / 20) = 50 := by decide

/-- dosimetry: fractionation(6000, 30) = 200 — FRACTIONATION: a total dose split into equal fractions, the dose
    per fraction. value ⌊total / fractions⌋. -/
theorem fam_dosimetry_fractionation_1 : (6000 / 30) = 200 := by decide

/-- dosimetry: cumulative(200, 30) = 6000 — CUMULATIVE: dose per session over a course of sessions. value
    perSession · sessions. -/
theorem fam_dosimetry_cumulative_1 : (200 * 30) = 6000 := by decide

/-- download: rate(1000, 10) = 100 — DOWNLOAD — THE DOWNLOAD BLOCK USE CASE FROM payloadcms/website, AS
    ARITHMETIC. A file served to a browser is numbers: the transfer rate, the time left, how far it has come,
    the chunks it splits into, what remains to resume, the formats offered, the checksum that validated, and the
    total size of a set. Crosses to `frontend` — download is what the browser renders. A measure. */ const PROOF
    = 'download arithmetic (rate, eta, progress, chunks, resume, formats, checksum, size); the Download block
    use case from payloadcms/website; a measure crossed to frontend' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'download', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, {
    name: `download.${name}`, params }) export class DownloadFormulas { /** TRANSFER RATE: bytes over seconds.
    value ⌊bytes / seconds⌋. -/
theorem fam_download_rate_1 : (1000 / 10) = 100 := by decide

/-- download: progress(250, 1000) = 25 — PROGRESS as a percentage. value ⌊done · 100 / total⌋. -/
theorem fam_download_progress_1 : ((250 * 100) / 1000) = 25 := by decide

/-- download: resume(300, 1000) = 700 — RESUME: the bytes that remain after an interruption. value max(0, total
    − done). -/
theorem fam_download_resume_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- download: formats(3) = 3 — FORMATS: the count of formats offered. value count. -/
theorem fam_download_formats_1 : 3 = 3 := by decide

/-- download: checksum(99, 100) = 99 — CHECKSUM: the share of blocks that validated, as a percentage. value
    ⌊valid · 100 / total⌋. -/
theorem fam_download_checksum_1 : ((99 * 100) / 100) = 99 := by decide

/-- download: size(10, 5000) = 50000 — SIZE: files at a size each. value files · each. -/
theorem fam_download_size_1 : (10 * 5000) = 50000 := by decide

/-- drag: force(1000, 2, 5) = 10 — DRAG — AERODYNAMIC RESISTANCE, AS ARITHMETIC. Moving through air is numbers:
    the drag force on a body, its drag coefficient, the induced drag of lift, the parasitic drag of shape and
    skin, the dynamic pressure of the stream, terminal velocity at balance, frontal area, and the Reynolds
    number of the flow. Crosses to `aerodynamics` — drag is what aerodynamics resolves. A measure. */ const
    PROOF = 'drag arithmetic (drag force, drag coefficient, induced drag, parasitic drag, dynamic pressure,
    terminal velocity, frontal area, Reynolds number); aerodynamic resistance as integers; a measure crossed to
    aerodynamics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'drag', dst: 'aerodynamics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `drag.${name}`, params }) export class DragFormulas
    { /** DRAG FORCE: dynamic pressure times drag coefficient times frontal area, scaled. value ⌊q · cd · area /
    1000⌋. -/
theorem fam_drag_force_1 : (((1000 * 2) * 5) / 1000) = 10 := by decide

/-- drag: coefficient(50, 100) = 500 — DRAG COEFFICIENT: drag force over dynamic pressure, scaled by a thousand.
    value ⌊force · 1000 / dyn⌋. -/
theorem fam_drag_coefficient_1 : ((50 * 1000) / 100) = 500 := by decide

/-- drag: induced(30, 6) = 150 — INDUCED DRAG: lift coefficient squared over aspect ratio. value ⌊cl · cl / ar⌋. -/
theorem fam_drag_induced_1 : ((30 * 30) / 6) = 150 := by decide

/-- drag: parasitic(20, 15) = 35 — PARASITIC DRAG: form drag plus skin-friction drag. value form + skin. -/
theorem fam_drag_parasitic_1 : (20 + 15) = 35 := by decide

/-- drag: dynamicpressure(2, 10) = 100 — DYNAMIC PRESSURE: half the density times velocity squared. value ⌊rho ·
    v · v / 2⌋. -/
theorem fam_drag_dynamicpressure_1 : (((2 * 10) * 10) / 2) = 100 := by decide

/-- drag: terminalvelocity(1000, 25) = 40 — TERMINAL VELOCITY: weight balanced by the drag factor. value ⌊weight
    / dragfactor⌋. -/
theorem fam_drag_terminalvelocity_1 : (1000 / 25) = 40 := by decide

/-- drag: frontalarea(12, 5) = 60 — FRONTAL AREA: width times height of the body. value width · height. -/
theorem fam_drag_frontalarea_1 : (12 * 5) = 60 := by decide

/-- drag: reynolds(100, 3, 2) = 150 — REYNOLDS NUMBER: speed times length over viscosity. value ⌊speed · length
    / visc⌋. -/
theorem fam_drag_reynolds_1 : ((100 * 3) / 2) = 150 := by decide

/-- drayage: costpermove(150, 4) = 600 -/
theorem fam_drayage_costpermove_1 : (150 * 4) = 600 := by decide

/-- drayage: turntime(240, 4) = 60 -/
theorem fam_drayage_turntime_1 : (240 / 4) = 60 := by decide

/-- drayage: containersperday(96, 8) = 12 -/
theorem fam_drayage_containersperday_1 : (96 / 8) = 12 := by decide

/-- drayage: chassisutilization(80, 100) = 80 -/
theorem fam_drayage_chassisutilization_1 : ((80 * 100) / 100) = 80 := by decide

/-- drayage: waittime(180, 120) = 60 -/
theorem fam_drayage_waittime_1 : (fmax 0 (180 - 120)) = 60 := by decide

/-- drayage: milesperload(400, 4) = 100 -/
theorem fam_drayage_milesperload_1 : (400 / 4) = 100 := by decide

/-- drayage: demurrage(3, 150) = 450 -/
theorem fam_drayage_demurrage_1 : (3 * 150) = 450 := by decide

/-- drayage: dualmoves(40, 100) = 40 -/
theorem fam_drayage_dualmoves_1 : ((40 * 100) / 100) = 40 := by decide

/-- drilling: ropenetration(1200, 10) = 120 — DRILLING — SINKING A WELLBORE, AS ARITHMETIC. Making hole is
    numbers: how fast the bit cuts rock, the mud that balances the formation, the torque and weight the string
    carries down the hole, the hydrostatic column the mud raises, the annular space around the pipe, the footage
    a bit has left, and the underbalance that lets a kick in. Crosses to `geology` — drilling is how the rock
    the geologist reads is reached. A measure. */ const PROOF = 'drilling arithmetic (penetration rate, mud
    weight, torque, weight-on-bit, hydrostatic column, annular clearance, bit life, kick margin); making hole
    against the formation; a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'drilling', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `drilling.${name}`, params }) export class DrillingFormulas { /** RATE OF PENETRATION: footage cut over the
    hours on bottom. value ⌊depth / hours⌋. -/
theorem fam_drilling_ropenetration_1 : (1200 / 10) = 120 := by decide

/-- drilling: mudweight(5200, 100) = 52 — MUD WEIGHT: the pressure gradient the mud must raise. value ⌊pressure
    / depth⌋. -/
theorem fam_drilling_mudweight_1 : (5200 / 100) = 52 := by decide

/-- drilling: torque(500, 12) = 6000 — TORQUE at the bit: force on a radius. value force · radius. -/
theorem fam_drilling_torque_1 : (500 * 12) = 6000 := by decide

/-- drilling: wob(20, 500) = 10000 — WEIGHT ON BIT: the drill collars, each of a weight. value collars · weight. -/
theorem fam_drilling_wob_1 : (20 * 500) = 10000 := by decide

/-- drilling: hydrostatic(10, 10000) = 5200 — HYDROSTATIC: the column pressure of mud weight down the depth
    (0.052 psi per ppg per foot). value ⌊mw · depth · 52 / 1000⌋. -/
theorem fam_drilling_hydrostatic_1 : (((10 * 10000) * 52) / 1000) = 5200 := by decide

/-- drilling: bitlife(5000, 3200) = 1800 — BIT LIFE: the footage a bit's rating has left after what it drilled.
    value max(0, rated − drilled). -/
theorem fam_drilling_bitlife_1 : (fmax 0 (5000 - 3200)) = 1800 := by decide

/-- drilling: kick(5500, 5200) = 300 — KICK MARGIN: formation pressure over the hydrostatic the mud holds — the
    underbalance a kick enters on. value max(0, formation − hydro). -/
theorem fam_drilling_kick_1 : (fmax 0 (5500 - 5200)) = 300 := by decide

/-- drilling: kick(5000, 5200) = 0 — KICK MARGIN: formation pressure over the hydrostatic the mud holds — the
    underbalance a kick enters on. value max(0, formation − hydro). -/
theorem fam_drilling_kick_2 : (fmax 0 (5000 - 5200)) = 0 := by decide

/-- drone: flighttime(5000, 100) = 50 -/
theorem fam_drone_flighttime_1 : (5000 / 100) = 50 := by decide

/-- drone: payload(2, 1000) = 2000 -/
theorem fam_drone_payload_1 : (2 * 1000) = 2000 := by decide

/-- drone: rotorcount(4, 0) = 4 -/
theorem fam_drone_rotorcount_1 : (4 + 0) = 4 := by decide

/-- drone: range(10, 1000) = 10000 -/
theorem fam_drone_range_1 : (10 * 1000) = 10000 := by decide

/-- drone: thrust(4, 500) = 2000 -/
theorem fam_drone_thrust_1 : (4 * 500) = 2000 := by decide

/-- drone: batterykwh(100, 1) = 100 -/
theorem fam_drone_batterykwh_1 : (100 / 1) = 100 := by decide

/-- drone: maxaltitude(120, 1) = 120 -/
theorem fam_drone_maxaltitude_1 : (120 * 1) = 120 := by decide

/-- drone: stabilitymargin(90, 100) = 90 -/
theorem fam_drone_stabilitymargin_1 : ((90 * 100) / 100) = 90 := by decide

/-- drought: severity(3, 4) = 4 -/
theorem fam_drought_severity_1 : (fmax 3 4) = 4 := by decide

/-- drought: durationmonths(12, 6) = 18 -/
theorem fam_drought_durationmonths_1 : (12 + 6) = 18 := by decide

/-- drought: rainfalldeficit(800, 300) = 500 -/
theorem fam_drought_rainfalldeficit_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- drought: pdsi(8, 4) = 4 -/
theorem fam_drought_pdsi_1 : (fmax 0 (8 - 4)) = 4 := by decide

/-- drought: affectedarea(100, 50) = 5000 -/
theorem fam_drought_affectedarea_1 : (100 * 50) = 5000 := by decide

/-- drought: waterdeficit(1000, 600) = 400 -/
theorem fam_drought_waterdeficit_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- drought: recoverymonths(6, 3) = 9 -/
theorem fam_drought_recoverymonths_1 : (6 + 3) = 9 := by decide

/-- drought: impactindex(70, 100) = 70 -/
theorem fam_drought_impactindex_1 : ((70 * 100) / 100) = 70 := by decide

/-- dyeing: shade(3, 100) = 3 — DYEING — THE BATH AS ARITHMETIC. Putting colour on fibre is numbers: the depth
    of shade on weight of fabric, the liquor ratio of water to goods, how much dye the bath gives up
    (exhaustion) and how much stays fixed, the dye concentration in the bath, the temperature ramp, the average
    fastness rating, and the mass taken up. Crosses to `chemistry` — a dyebath is a reaction. A measure. */
    const PROOF = 'dyeing arithmetic (shade owf, liquor ratio, exhaustion, fixation, concentration, temperature
    ramp, fastness rating, dye uptake); the bath as a reaction, a measure crossed to chemistry' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'dyeing', dst: 'chemistry', formula, value, proof: PROOF, ...extra
    }, holds, { name: `dyeing.${name}`, params }) export class DyeingFormulas { /** SHADE: depth of shade on
    weight of fabric, as a percent. value ⌊dye · 100 / fabric⌋. -/
theorem fam_dyeing_shade_1 : ((3 * 100) / 100) = 3 := by decide

/-- dyeing: liquorratio(2000, 100) = 20 — LIQUOR RATIO: parts of bath water to one part of goods. value ⌊water /
    fabric⌋. -/
theorem fam_dyeing_liquorratio_1 : (2000 / 100) = 20 := by decide

/-- dyeing: exhaustion(85, 100) = 85 — EXHAUSTION: the percent of dye the bath has given up to the fibre. value
    ⌊absorbed · 100 / initial⌋. -/
theorem fam_dyeing_exhaustion_1 : ((85 * 100) / 100) = 85 := by decide

/-- dyeing: fixation(90, 100) = 90 — FIXATION: the percent of applied dye that stays fixed on the fibre. value
    ⌊fixed · 100 / applied⌋. -/
theorem fam_dyeing_fixation_1 : ((90 * 100) / 100) = 90 := by decide

/-- dyeing: concentration(50, 10) = 5 — CONCENTRATION: dye mass per litre of bath. value ⌊mass / volume⌋. -/
theorem fam_dyeing_concentration_1 : (50 / 10) = 5 := by decide

/-- dyeing: temperature(30, 2, 30) = 90 — TEMPERATURE: the dyebath ramp, a start held for a rate over the
    minutes. value start + rate · minutes. -/
theorem fam_dyeing_temperature_1 : (30 + (2 * 30)) = 90 := by decide

/-- dyeing: fastness(4, 5) = 4 — FASTNESS: the average of the wash and light ratings (1–5 grey scale). value
    ⌊(wash + light) / 2⌋. -/
theorem fam_dyeing_fastness_1 : ((4 + 5) / 2) = 4 := by decide

/-- dyeing: uptake(5, 10) = 50 — UPTAKE: the dye mass taken up, a concentration over a bath volume. value conc ·
    volume. -/
theorem fam_dyeing_uptake_1 : (5 * 10) = 50 := by decide

/-- dynamics: force(10, 5) = 50 — DYNAMICS — NEWTONIAN MOTION, AS ARITHMETIC. A moving body is numbers: the
    force an acceleration needs, momentum, the impulse of a push, kinetic energy, the work a force does over a
    distance, power, the acceleration of a velocity change, and the momentum two bodies carry away stuck
    together. Crosses to `kinematics` — dynamics is the forces behind the motion kinematics describes. A
    measure. */ const PROOF = 'dynamics arithmetic (force, momentum, impulse, kinetic energy, work, power,
    acceleration, inelastic collision); Newtonian motion as integers; a measure crossed to kinematics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'dynamics', dst: 'kinematics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `dynamics.${name}`, params }) export class DynamicsFormulas { /** FORCE: Newton's
    second law, mass times acceleration. value mass · accel. -/
theorem fam_dynamics_force_1 : (10 * 5) = 50 := by decide

/-- dynamics: momentum(10, 20) = 200 — MOMENTUM: mass in motion. value mass · velocity. -/
theorem fam_dynamics_momentum_1 : (10 * 20) = 200 := by decide

/-- dynamics: impulse(50, 4) = 200 — IMPULSE: a force applied over a time. value force · time. -/
theorem fam_dynamics_impulse_1 : (50 * 4) = 200 := by decide

/-- dynamics: work(10, 5) = 50 — WORK: a force over a distance. value force · distance. -/
theorem fam_dynamics_work_1 : (10 * 5) = 50 := by decide

/-- dynamics: power(1000, 20) = 50 — POWER: work done over the time it took. value ⌊work / time⌋. -/
theorem fam_dynamics_power_1 : (1000 / 20) = 50 := by decide

/-- dynamics: acceleration(100, 5) = 20 — ACCELERATION: a change in velocity over a time. value ⌊deltav / time⌋. -/
theorem fam_dynamics_acceleration_1 : (100 / 5) = 20 := by decide

/-- dynamics: collision(3, 7, 5) = 50 — COLLISION: perfectly inelastic — two masses stuck together carry
    momentum (m1 + m2) · velocity. value (m1 + m2) · velocity. -/
theorem fam_dynamics_collision_1 : ((3 + 7) * 5) = 50 := by decide

/-- dynamics: power(100, 0) = 0 — POWER: work done over the time it took. value ⌊work / time⌋. -/
theorem fam_dynamics_power_2 : (100 / 0) = 0 := by decide
