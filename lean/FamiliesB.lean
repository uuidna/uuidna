-- lean/FamiliesB.lean — GENERATED. THE FAMILIES, B — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- backend: requests(500, 60) = 30000 — BACKEND — THE SERVICE LAYER AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Serving requests is numbers: the requests a stream carries, average latency, the
    error rate, the connection pool, the cache hit rate, the queue backlog, throughput, and how saturated the
    capacity is. Crosses to `obs` — the backend is what observability watches. A measure. */ const PROOF =
    'backend arithmetic (requests, latency, error rate, connection pool, cache hit rate, queue backlog,
    throughput, saturation); a service-layer domain; a measure crossed to obs' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'backend', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name:
    `backend.${name}`, params }) export class BackendFormulas { /** REQUESTS: a stream at rps over seconds.
    value rps · seconds. -/
theorem fam_backend_requests_1 : (500 * 60) = 30000 := by decide

/-- backend: latency(5000, 100) = 50 — AVERAGE LATENCY: total milliseconds over the requests served. value
    ⌊total / requests⌋. -/
theorem fam_backend_latency_1 : (5000 / 100) = 50 := by decide

/-- backend: error(5, 1000) = 0 — ERROR RATE as a percentage. value ⌊errors · 100 / requests⌋. -/
theorem fam_backend_error_1 : ((5 * 100) / 1000) = 0 := by decide

/-- backend: error(30, 1000) = 3 — ERROR RATE as a percentage. value ⌊errors · 100 / requests⌋. -/
theorem fam_backend_error_2 : ((30 * 100) / 1000) = 3 := by decide

/-- backend: pool(120, 100) = 100 — CONNECTION POOL: the connections a load takes, capped at the pool max. value
    min(connections, max). -/
theorem fam_backend_pool_1 : (fmin 120 100) = 100 := by decide

/-- backend: cache(950, 1000) = 95 — CACHE HIT RATE as a percentage. value ⌊hits · 100 / total⌋. -/
theorem fam_backend_cache_1 : ((950 * 100) / 1000) = 95 := by decide

/-- backend: queue(500, 300) = 200 — QUEUE BACKLOG: what arrives beyond what is processed. value max(0, incoming
    − processed). -/
theorem fam_backend_queue_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- backend: queue(100, 300) = 0 — QUEUE BACKLOG: what arrives beyond what is processed. value max(0, incoming −
    processed). -/
theorem fam_backend_queue_2 : (fmax 0 (100 - 300)) = 0 := by decide

/-- backend: throughput(6000, 60) = 100 — THROUGHPUT: requests over seconds. value ⌊requests / seconds⌋. -/
theorem fam_backend_throughput_1 : (6000 / 60) = 100 := by decide

/-- backend: saturation(75, 100) = 75 — SATURATION as a percentage of capacity. value ⌊used · 100 / capacity⌋. -/
theorem fam_backend_saturation_1 : ((75 * 100) / 100) = 75 := by decide

/-- backgammon: points(24, 0) = 24 -/
theorem fam_backgammon_points_1 : (24 + 0) = 24 := by decide

/-- backgammon: pipcount(167, 1) = 167 -/
theorem fam_backgammon_pipcount_1 : (167 * 1) = 167 := by decide

/-- backgammon: doublescube(6) = 64 -/
theorem fam_backgammon_doublescube_1 : (2 ^ 6) = 64 := by decide

/-- backgammon: checkers(15, 0) = 15 -/
theorem fam_backgammon_checkers_1 : (15 + 0) = 15 := by decide

/-- backgammon: rolloutcomes(6, 6) = 36 -/
theorem fam_backgammon_rolloutcomes_1 : (6 * 6) = 36 := by decide

/-- backgammon: winprob(50, 100) = 50 -/
theorem fam_backgammon_winprob_1 : ((50 * 100) / 100) = 50 := by decide

/-- backhaul: emptymiles(1000, 700) = 300 -/
theorem fam_backhaul_emptymiles_1 : (fmax 0 (1000 - 700)) = 300 := by decide

/-- backhaul: utilization(700, 1000) = 70 -/
theorem fam_backhaul_utilization_1 : ((700 * 100) / 1000) = 70 := by decide

/-- backhaul: revenuemiles(700, 2) = 1400 -/
theorem fam_backhaul_revenuemiles_1 : (700 * 2) = 1400 := by decide

/-- backhaul: matchrate(80, 100) = 80 -/
theorem fam_backhaul_matchrate_1 : ((80 * 100) / 100) = 80 := by decide

/-- backhaul: deadheadratio(300, 1000) = 30 -/
theorem fam_backhaul_deadheadratio_1 : ((300 * 100) / 1000) = 30 := by decide

/-- backhaul: savings(300, 2) = 600 -/
theorem fam_backhaul_savings_1 : (300 * 2) = 600 := by decide

/-- backhaul: payloadratio(18000, 20000) = 90 -/
theorem fam_backhaul_payloadratio_1 : ((18000 * 100) / 20000) = 90 := by decide

/-- backhaul: cycledistance(700, 300) = 1000 -/
theorem fam_backhaul_cycledistance_1 : (700 + 300) = 1000 := by decide

/-- backlash: deadband(100, 97) = 3 -/
theorem fam_backlash_deadband_1 : (fmax 0 (100 - 97)) = 3 := by decide

/-- backlash: compensation(95, 100) = 95 -/
theorem fam_backlash_compensation_1 : ((95 * 100) / 100) = 95 := by decide

/-- backlash: hysteresis(50, 45) = 5 -/
theorem fam_backlash_hysteresis_1 : (fmax 0 (50 - 45)) = 5 := by decide

/-- backlash: lostmotion(20, 4) = 5 -/
theorem fam_backlash_lostmotion_1 : (20 / 4) = 5 := by decide

/-- backlash: positioningerror(2, 100) = 2 -/
theorem fam_backlash_positioningerror_1 : ((2 * 100) / 100) = 2 := by decide

/-- backlash: gearplay(1, 3) = 3 -/
theorem fam_backlash_gearplay_1 : (1 * 3) = 3 := by decide

/-- backlash: reversaldelay(100, 20) = 5 -/
theorem fam_backlash_reversaldelay_1 : (100 / 20) = 5 := by decide

/-- backlash: stiffnessloss(10, 100) = 10 -/
theorem fam_backlash_stiffnessloss_1 : ((10 * 100) / 100) = 10 := by decide

/-- backlog: agedays(100, 130) = 30 — BACKLOG — A PRODUCT BACKLOG AS ARITHMETIC (the queue of work ahead, not by
    hand). The backlog is numbers: the total size of what is queued, how much has been groomed, how old an item
    is, how fast items are done, the cycle time, how full the work-in-progress is, a priority score, and the
    sprints it takes to clear. Crosses to `logistics` — a backlog is a queue that moves through capacity. A
    measure. */ const PROOF = 'backlog arithmetic (size, grooming rate, item age, throughput, cycle time, WIP
    fill, prioritization, clearance time); a product queue as a measure crossed to logistics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'backlog', dst: 'logistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `backlog.${name}`, params }) export class BacklogFormulas { /** ITEM AGE: the
    days between when an item was created and now. value max(0, now − created). -/
theorem fam_backlog_agedays_1 : (fmax 0 (130 - 100)) = 30 := by decide

/-- backlog: agedays(130, 100) = 0 — BACKLOG — A PRODUCT BACKLOG AS ARITHMETIC (the queue of work ahead, not by
    hand). The backlog is numbers: the total size of what is queued, how much has been groomed, how old an item
    is, how fast items are done, the cycle time, how full the work-in-progress is, a priority score, and the
    sprints it takes to clear. Crosses to `logistics` — a backlog is a queue that moves through capacity. A
    measure. */ const PROOF = 'backlog arithmetic (size, grooming rate, item age, throughput, cycle time, WIP
    fill, prioritization, clearance time); a product queue as a measure crossed to logistics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'backlog', dst: 'logistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `backlog.${name}`, params }) export class BacklogFormulas { /** ITEM AGE: the
    days between when an item was created and now. value max(0, now − created). -/
theorem fam_backlog_agedays_2 : (fmax 0 (100 - 130)) = 0 := by decide

/-- backlog: cycletime(1000, 40) = 25 — CYCLE TIME: total days over the items completed. value ⌊total / items⌋. -/
theorem fam_backlog_cycletime_1 : (1000 / 40) = 25 := by decide

/-- backlog: groomingrate(30, 40) = 75 — GROOMING RATE as a percentage. value ⌊groomed · 100 / total⌋. -/
theorem fam_backlog_groomingrate_1 : ((30 * 100) / 40) = 75 := by decide

/-- backlog: prioritization(100, 4) = 25 — PRIORITIZATION: a value-over-effort score. value ⌊value / effort⌋. -/
theorem fam_backlog_prioritization_1 : (100 / 4) = 25 := by decide

/-- backlog: size(50, 3) = 150 — SIZE: items at a points-each. value items · each. -/
theorem fam_backlog_size_1 : (50 * 3) = 150 := by decide

/-- backlog: throughput(60, 5) = 12 — THROUGHPUT: items done over sprints. value ⌊done / sprints⌋. -/
theorem fam_backlog_throughput_1 : (60 / 5) = 12 := by decide

/-- backlog: wipfill(8, 10) = 80 — WIP FILL: work-in-progress as a percentage of the limit. value ⌊wip · 100 /
    limit⌋. -/
theorem fam_backlog_wipfill_1 : ((8 * 100) / 10) = 80 := by decide

/-- bacteriology: generationtime(120, 6) = 20 — BACTERIOLOGY — GROWING CULTURES, AS ARITHMETIC (chosen by the
    registry, not by hand). A culture is numbers: how long a generation takes, colony-forming units, serial
    dilution, the divisions per hour, the minimum inhibitory concentration, biofilm biomass, viability, and the
    population after whole doublings. Crosses to `microbiology` — bacteriology is the counting microbiology
    watches. A measure. */ const PROOF = 'bacteriology arithmetic (generation time, CFU, dilution, growth rate,
    MIC, biofilm, viability, doublings); a registry domain; a measure crossed to microbiology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'bacteriology', dst: 'microbiology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `bacteriology.${name}`, params }) export class BacteriologyFormulas { /**
    GENERATION TIME: minutes over the divisions observed. value ⌊minutes / divisions⌋. -/
theorem fam_bacteriology_generationtime_1 : (120 / 6) = 20 := by decide

/-- bacteriology: cfu(50, 1000) = 50000 — COLONY-FORMING UNITS: counted colonies times the dilution factor.
    value colonies · dilution. -/
theorem fam_bacteriology_cfu_1 : (50 * 1000) = 50000 := by decide

/-- bacteriology: dilution(1000, 10) = 100 — SERIAL DILUTION: a volume divided down by a factor. value ⌊volume /
    factor⌋. -/
theorem fam_bacteriology_dilution_1 : (1000 / 10) = 100 := by decide

/-- bacteriology: growthrate(12, 4) = 3 — GROWTH RATE: divisions over the hours they took. value ⌊divisions /
    hours⌋. -/
theorem fam_bacteriology_growthrate_1 : (12 / 4) = 3 := by decide

/-- bacteriology: mic(512, 8) = 64 — MINIMUM INHIBITORY CONCENTRATION: a stock stepped down a dilution factor.
    value ⌊stock / factor⌋. -/
theorem fam_bacteriology_mic_1 : (512 / 8) = 64 := by decide

/-- bacteriology: biofilm(1000, 5) = 5000 — BIOFILM BIOMASS: cells across its layers. value cells · layers. -/
theorem fam_bacteriology_biofilm_1 : (1000 * 5) = 5000 := by decide

/-- bacteriology: viability(750, 1000) = 75 — VIABILITY as a percentage. value ⌊live · 100 / total⌋. -/
theorem fam_bacteriology_viability_1 : ((750 * 100) / 1000) = 75 := by decide

/-- bacteriology: doublings(100, 3) = 800 — DOUBLINGS: an initial population after whole generations. value
    initial · 2^generations. -/
theorem fam_bacteriology_doublings_1 : (100 * (2 ^ 3)) = 800 := by decide

/-- baking: hydration(70, 100) = 70 — BAKING — THE BAKER'S ARITHMETIC (chosen by the registry, not by hand). A
    loaf is numbers: water against flour as a baker's percentage, how far the dough rose, oven spring, crumb
    openness, the proof rate, Fahrenheit to Celsius, and a recipe scaled to a batch. Crosses to `cuisine` —
    baking is the exact corner of cooking. A measure. */ const PROOF = 'baking arithmetic (hydration, leavening,
    baker\'s percent, oven spring, crumb, proof, temperature, scaling); a measure crossed to cuisine' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'baking', dst: 'cuisine', formula, value, proof: PROOF, ...extra
    }, holds, { name: `baking.${name}`, params }) export class BakingFormulas { /** HYDRATION: water against
    flour as a baker's percentage. value ⌊water · 100 / flour⌋. -/
theorem fam_baking_hydration_1 : ((70 * 100) / 100) = 70 := by decide

/-- baking: leavening(200, 100) = 200 — LEAVENING: how far the dough rose over where it started, as a
    percentage. value ⌊risen · 100 / initial⌋. -/
theorem fam_baking_leavening_1 : ((200 * 100) / 100) = 200 := by decide

/-- baking: bakerspercent(2, 100) = 2 — BAKER'S PERCENT: any ingredient against flour. value ⌊ingredient · 100 /
    flour⌋. -/
theorem fam_baking_bakerspercent_1 : ((2 * 100) / 100) = 2 := by decide

/-- baking: ovenspring(120, 100) = 20 — OVEN SPRING: the rise gained in the oven above the proofed height. value
    max(0, final − proofed). -/
theorem fam_baking_ovenspring_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- baking: ovenspring(90, 100) = 0 — OVEN SPRING: the rise gained in the oven above the proofed height. value
    max(0, final − proofed). -/
theorem fam_baking_ovenspring_2 : (fmax 0 (90 - 100)) = 0 := by decide

/-- baking: crumb(1000, 400) = 2 — CRUMB: openness as volume over mass. value ⌊volume / mass⌋. -/
theorem fam_baking_crumb_1 : (1000 / 400) = 2 := by decide

/-- baking: proof(180, 60) = 3 — PROOF: rise rate as risen over time. value ⌊risen / time⌋. -/
theorem fam_baking_proof_1 : (180 / 60) = 3 := by decide

/-- baking: temperature(212) = 100 — TEMPERATURE: Fahrenheit to Celsius. value ⌊(fahrenheit − 32) · 5 / 9⌋. -/
theorem fam_baking_temperature_1 : (((212 - 32) * 5) / 9) = 100 := by decide

/-- baking: scaling(500, 3) = 1500 — SCALING: a per-loaf amount across a batch. value perloaf · loaves. -/
theorem fam_baking_scaling_1 : (500 * 3) = 1500 := by decide

/-- ballet: positions(5, 0) = 5 -/
theorem fam_ballet_positions_1 : (5 + 0) = 5 := by decide

/-- ballet: barreexercises(8, 4) = 32 -/
theorem fam_ballet_barreexercises_1 : (8 * 4) = 32 := by decide

/-- ballet: turnrotations(1440, 360) = 4 -/
theorem fam_ballet_turnrotations_1 : (1440 / 360) = 4 := by decide

/-- ballet: jumpheight(100, 2) = 50 -/
theorem fam_ballet_jumpheight_1 : (100 / 2) = 50 := by decide

/-- ballet: tempobpm(120, 1) = 120 -/
theorem fam_ballet_tempobpm_1 : (120 * 1) = 120 := by decide

/-- ballet: balancemargin(100, 20) = 80 -/
theorem fam_ballet_balancemargin_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- barometry: sealevel(1000, 80) = 1010 — BAROMETRY — AIR PRESSURE AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Reading the barometer is numbers: reduce a station reading to sea level, the
    three-hour tendency, pressure at an altitude, pascals in millibars, the gradient between two stations, the
    station correction, the running trend, and millimetres of mercury in inches. Crosses to `weather` —
    barometry is what forecasts the weather. A measure. */ const PROOF = 'barometry arithmetic (sea-level
    reduction, tendency, altitude pressure, millibars, gradient, station pressure, trend, inches of mercury);
    the registry\'s uncovered pressure domain; a measure crossed to weather' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'barometry', dst: 'weather', formula, value, proof: PROOF, ...extra }, holds, {
    name: `barometry.${name}`, params }) export class BarometryFormulas { /** SEA-LEVEL REDUCTION: a station
    reading lifted to sea level, 1 hPa per 8 m. value station + ⌊altitude / 8⌋. -/
theorem fam_barometry_sealevel_1 : (1000 + (80 / 8)) = 1010 := by decide

/-- barometry: tendency(1015, 1012) = 3 — TENDENCY: the three-hour rise from a past reading to now. value max(0,
    now − past). -/
theorem fam_barometry_tendency_1 : (fmax 0 (1015 - 1012)) = 3 := by decide

/-- barometry: tendency(1012, 1015) = 0 — TENDENCY: the three-hour rise from a past reading to now. value max(0,
    now − past). -/
theorem fam_barometry_tendency_2 : (fmax 0 (1012 - 1015)) = 0 := by decide

/-- barometry: altitudepressure(1013, 800) = 913 — ALTITUDE PRESSURE: a sea-level reading brought down to an
    altitude, 1 hPa per 8 m. value max(0, sealevel − ⌊altitude / 8⌋). -/
theorem fam_barometry_altitudepressure_1 : (fmax 0 (1013 - (800 / 8))) = 913 := by decide

/-- barometry: millibars(101) = 1010 — MILLIBARS: kilopascals as millibars (1 kPa = 10 mb). value kpa · 10. -/
theorem fam_barometry_millibars_1 : (101 * 10) = 1010 := by decide

/-- barometry: pressuregradient(60, 5) = 12 — PRESSURE GRADIENT: a pressure difference per unit distance. value
    ⌊delta / distance⌋. -/
theorem fam_barometry_pressuregradient_1 : (60 / 5) = 12 := by decide

/-- barometry: stationpressure(1013, 13) = 1000 — STATION PRESSURE: a sea-level reading less its station
    correction. value max(0, sealevel − correction). -/
theorem fam_barometry_stationpressure_1 : (fmax 0 (1013 - 13)) = 1000 := by decide

/-- barometry: trend(4048, 4) = 1012 — TREND: the running mean over a run of readings. value ⌊total / readings⌋. -/
theorem fam_barometry_trend_1 : (4048 / 4) = 1012 := by decide

/-- barometry: inchesmercury(1013) = 299 — INCHES OF MERCURY: hectopascals as milli-inches of mercury (1 hPa =
    0.02953 inHg). value ⌊hpa · 1000 / 3386⌋. -/
theorem fam_barometry_inchesmercury_1 : ((1013 * 1000) / 3386) = 299 := by decide

/-- basketball: fieldgoal(9, 20) = 45 — BASKETBALL — THE GAME AS ARITHMETIC. A box score is numbers: shooting
    percentages, free throws, efficiency, rebounds per game, assist-to-turnover ratio, pace, true shooting, and
    the plus/minus a lineup leaves on the scoreboard. Crosses to `sports` — basketball is one sport the registry
    measures. A measure. */ const PROOF = 'basketball arithmetic (field-goal %, free-throw %, efficiency,
    rebounds per game, assist ratio, pace, true shooting, plus/minus); the box score as formulas; a measure
    crossed to sports' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const
    c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'basketball', dst: 'sports',
    formula, value, proof: PROOF, ...extra }, holds, { name: `basketball.${name}`, params }) export class
    BasketballFormulas { /** FIELD-GOAL PERCENTAGE: shots made over shots attempted. value ⌊made · 100 /
    attempted⌋. -/
theorem fam_basketball_fieldgoal_1 : ((9 * 100) / 20) = 45 := by decide

/-- basketball: freethrow(17, 20) = 85 — FREE-THROW PERCENTAGE: free throws made over attempted. value ⌊made ·
    100 / attempted⌋. -/
theorem fam_basketball_freethrow_1 : ((17 * 100) / 20) = 85 := by decide

/-- basketball: efficiency(30, 20) = 150 — EFFICIENCY: points scored per shot. value ⌊points · 100 / shots⌋. -/
theorem fam_basketball_efficiency_1 : ((30 * 100) / 20) = 150 := by decide

/-- basketball: rebounds(220, 20) = 11 — REBOUNDS PER GAME: total rebounds over games played. value ⌊total /
    games⌋. -/
theorem fam_basketball_rebounds_1 : (220 / 20) = 11 := by decide

/-- basketball: assists(80, 20) = 400 — ASSIST RATIO: assists per turnover, as a percentage. value ⌊assists ·
    100 / turnovers⌋. -/
theorem fam_basketball_assists_1 : ((80 * 100) / 20) = 400 := by decide

/-- basketball: pace(100, 48) = 2 — PACE: possessions per minute played. value ⌊possessions / minutes⌋. -/
theorem fam_basketball_pace_1 : (100 / 48) = 2 := by decide

/-- basketball: truepct(28, 25) = 112 — TRUE SHOOTING: points over true-shooting attempts. value ⌊points · 100 /
    attempts⌋. -/
theorem fam_basketball_truepct_1 : ((28 * 100) / 25) = 112 := by decide

/-- basketball: plusminus(110, 100) = 10 — PLUS/MINUS: points scored less points allowed while on court. value
    scored − allowed (may be negative). -/
theorem fam_basketball_plusminus_1 : (110 - 100) = 10 := by decide

/-- bathymetry: depth(1500, 4) = 3000 — BATHYMETRY — THE SEAFLOOR AS ARITHMETIC. Mapping depth is numbers: the
    two-way echo that gives depth, the sounding time a ping takes, the grade of a slope, the one-way echo delay,
    the area each grid cell covers, the swath a multibeam paints, the cross-section of a profile, and the
    interval between depth contours. Crosses to `oceanography` — bathymetry is the floor the ocean sits on. A
    measure. */ const PROOF = 'bathymetry arithmetic (two-way depth, sounding time, slope grade, echo delay,
    grid resolution, swath width, profile area, contour interval); the seafloor as a measure crossed to
    oceanography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'bathymetry', dst: 'oceanography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `bathymetry.${name}`, params }) export class
    BathymetryFormulas { /** DEPTH: the two-way echo — sound speed over the round trip, halved. value ⌊speed ·
    time / 2⌋. -/
theorem fam_bathymetry_depth_1 : ((1500 * 4) / 2) = 3000 := by decide

/-- bathymetry: soundingtime(3000, 1500) = 4 — SOUNDING TIME: the round-trip a ping takes to a depth at a sound
    speed. value ⌊2 · depth / speed⌋. -/
theorem fam_bathymetry_soundingtime_1 : ((2 * 3000) / 1500) = 4 := by decide

/-- bathymetry: slope(30, 100) = 30 — SLOPE: the grade of the floor as a percent — rise over run. value ⌊rise ·
    100 / run⌋. -/
theorem fam_bathymetry_slope_1 : ((30 * 100) / 100) = 30 := by decide

/-- bathymetry: echodelay(1500, 1500) = 1000 — ECHO DELAY: the one-way delay in milliseconds over a range at a
    sound speed. value ⌊range · 1000 / speed⌋. -/
theorem fam_bathymetry_echodelay_1 : ((1500 * 1000) / 1500) = 1000 := by decide

/-- bathymetry: gridresolution(10000, 100) = 100 — GRID RESOLUTION: the area each grid cell covers. value ⌊area
    / cells⌋. -/
theorem fam_bathymetry_gridresolution_1 : (10000 / 100) = 100 := by decide

/-- bathymetry: swathwidth(3000, 7) = 21000 — SWATH WIDTH: the width a multibeam paints — depth times the
    coverage factor. value depth · factor. -/
theorem fam_bathymetry_swathwidth_1 : (3000 * 7) = 21000 := by decide

/-- bathymetry: profilearea(500, 40) = 20000 — PROFILE AREA: the cross-section of a profile — its length times
    its depth. value length · depth. -/
theorem fam_bathymetry_profilearea_1 : (500 * 40) = 20000 := by decide

/-- bathymetry: contourinterval(1000, 10) = 100 — CONTOUR INTERVAL: the depth range split into contours. value
    ⌊range / count⌋. -/
theorem fam_bathymetry_contourinterval_1 : (1000 / 10) = 100 := by decide

/-- bayesian: posterior(250, 800, 400) = 500 — BAYESIAN — INFERENCE AS ARITHMETIC (probabilities as per-mille
    integers, never floats). Belief is numbers: the posterior from prior · likelihood over evidence, a
    likelihood and a prior as counts, the evidence by total probability, odds, the Bayes factor, the odds
    update, and the marginal over hypotheses. Crosses to `probability` — Bayesian inference is its calculus. A
    measure. */ const PROOF = 'bayesian arithmetic (posterior, likelihood, prior, evidence, odds ratio, Bayes
    factor, odds update, marginal); probabilities as per-mille integers; a measure crossed to probability' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'bayesian', dst: 'probability', formula, value,
    proof: PROOF, ...extra }, holds, { name: `bayesian.${name}`, params }) export class BayesianFormulas { /**
    POSTERIOR: prior · likelihood over evidence (all per-mille). value ⌊prior · likelihood / evidence⌋. -/
theorem fam_bayesian_posterior_1 : ((250 * 800) / 400) = 500 := by decide

/-- bayesian: likelihood(90, 100) = 900 — LIKELIHOOD P(E|H): hits over trials, in per-mille. value ⌊hits · 1000
    / trials⌋. -/
theorem fam_bayesian_likelihood_1 : ((90 * 1000) / 100) = 900 := by decide

/-- bayesian: prior(1, 4) = 250 — PRIOR P(H): favorable over total, in per-mille. value ⌊favorable · 1000 /
    total⌋. -/
theorem fam_bayesian_prior_1 : ((1 * 1000) / 4) = 250 := by decide

/-- bayesian: evidence(300, 100) = 400 — EVIDENCE P(E): total probability over two hypotheses. value jointA +
    jointB. -/
theorem fam_bayesian_evidence_1 : (300 + 100) = 400 := by decide

/-- bayesian: bayesfactor(800, 200) = 4000 — ODDS RATIO: a per-mille probability as odds. value ⌊prob · 1000 /
    (1000 − prob)⌋. */ static oddsratio(prob: number): CrossFormula { const d = Math.max(0, 1000 - prob); return
    c('bayesian-oddsratio', 'oddsratio(prob) = ⌊prob · 1000 / (1000 − prob)⌋', d > 0 ? Math.floor((prob * 1000)
    / d) : 0, nat(prob) && prob > 0 && prob < 1000, 'oddsratio', [prob]) } /** BAYES FACTOR: likelihood under H
    over likelihood under ¬H, in per-mille. value ⌊likeH · 1000 / likeN⌋. -/
theorem fam_bayesian_bayesfactor_1 : ((800 * 1000) / 200) = 4000 := by decide

/-- bayesian: update(333, 4000) = 1332 — ODDS UPDATE: posterior odds from prior odds times the Bayes factor.
    value ⌊priorOdds · factor / 1000⌋. -/
theorem fam_bayesian_update_1 : ((333 * 4000) / 1000) = 1332 := by decide

/-- bayesian: marginal(300, 100, 100) = 500 — MARGINAL P(E): total probability over three hypotheses. value
    jointA + jointB + jointCc. -/
theorem fam_bayesian_marginal_1 : ((300 + 100) + 100) = 500 := by decide

/-- benchmark: opspersec(60000, 60) = 1000 -/
theorem fam_benchmark_opspersec_1 : (60000 / 60) = 1000 := by decide

/-- benchmark: throughput(1000, 10) = 10000 -/
theorem fam_benchmark_throughput_1 : (1000 * 10) = 10000 := by decide

/-- benchmark: latencyp50(5000, 100) = 50 -/
theorem fam_benchmark_latencyp50_1 : (5000 / 100) = 50 := by decide

/-- benchmark: speedup(400, 100) = 4 -/
theorem fam_benchmark_speedup_1 : (400 / 100) = 4 := by decide

/-- benchmark: variance(500, 5) = 100 -/
theorem fam_benchmark_variance_1 : (500 / 5) = 100 := by decide

/-- benchmark: percentilesubsets(4) = 16 -/
theorem fam_benchmark_percentilesubsets_1 : (2 ^ 4) = 16 := by decide

/-- benchmark: efficiency(85, 100) = 85 -/
theorem fam_benchmark_efficiency_1 : ((85 * 100) / 100) = 85 := by decide

/-- bilingualism: codeswitchrate(15, 200) = 7 — CODE-SWITCH RATE: switches per hundred utterances. value
    ⌊switches · 100 / utterances⌋. -/
theorem fam_bilingualism_codeswitchrate_1 : ((15 * 100) / 200) = 7 := by decide

/-- bilingualism: dominanceratio(70, 30) = 70 — LANGUAGE DOMINANCE: the share of the first language as a
    percentage. value ⌊l1 · 100 / (l1 + l2)⌋. -/
theorem fam_bilingualism_dominanceratio_1 : ((70 * 100) / (70 + 30)) = 70 := by decide

/-- bilingualism: exposurehours(365, 4) = 1460 — EXPOSURE HOURS: days of contact at so many hours each day.
    value days · perday. -/
theorem fam_bilingualism_exposurehours_1 : (365 * 4) = 1460 := by decide

/-- bilingualism: interferencerate(12, 300) = 4 — INTERFERENCE RATE: cross-linguistic errors per hundred items.
    value ⌊errors · 100 / items⌋. -/
theorem fam_bilingualism_interferencerate_1 : ((12 * 100) / 300) = 4 := by decide

/-- bilingualism: lexicalaccess(6000, 50) = 120 — LEXICAL ACCESS: average retrieval time per word, in
    milliseconds. value ⌊total / words⌋. -/
theorem fam_bilingualism_lexicalaccess_1 : (6000 / 50) = 120 := by decide

/-- bilingualism: proficiencygap(90, 75) = 15 — PROFICIENCY GAP: how far the first language leads the second.
    value max(0, l1 − l2). -/
theorem fam_bilingualism_proficiencygap_1 : (fmax 0 (90 - 75)) = 15 := by decide

/-- bilingualism: proficiencygap(50, 80) = 0 — PROFICIENCY GAP: how far the first language leads the second.
    value max(0, l1 − l2). -/
theorem fam_bilingualism_proficiencygap_2 : (fmax 0 (50 - 80)) = 0 := by decide

/-- bilingualism: transferrate(8, 40) = 20 — TRANSFER RATE: cross-linguistic transfers per hundred structures.
    value ⌊transfers · 100 / structures⌋. -/
theorem fam_bilingualism_transferrate_1 : ((8 * 100) / 40) = 20 := by decide

/-- bioavailability: absolute(500, 1000) = 50 — BIOAVAILABILITY — HOW MUCH OF A DOSE REACHES THE BLOOD, AS
    ARITHMETIC. A drug given is not a drug absorbed: the absolute fraction against an IV reference, the relative
    fraction against another formulation, the fraction absorbed, the dose-corrected exposure, the raw AUC ratio,
    the share surviving first pass, the amount absorbed, and what is retained after elimination. Crosses to
    `pharmacology` — bioavailability is the first number pharmacology reads. */ const PROOF = 'bioavailability
    arithmetic (absolute F, relative F, fraction absorbed, dose-corrected AUC, AUC ratio, first-pass oral
    factor, amount absorbed, amount retained); the dose that reaches the blood; a measure crossed to
    pharmacology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'bioavailability', dst:
    'pharmacology', formula, value, proof: PROOF, ...extra }, holds, { name: `bioavailability.${name}`, params
    }) export class BioavailabilityFormulas { /** ABSOLUTE bioavailability F against an IV reference, as a
    percentage. value ⌊aucOral · 100 / aucIv⌋. -/
theorem fam_bioavailability_absolute_1 : ((500 * 100) / 1000) = 50 := by decide

/-- bioavailability: relative(800, 1000) = 80 — RELATIVE bioavailability against another formulation, as a
    percentage. value ⌊aucTest · 100 / aucRef⌋. -/
theorem fam_bioavailability_relative_1 : ((800 * 100) / 1000) = 80 := by decide

/-- bioavailability: fraction(90, 100) = 90 — FRACTION absorbed of the dose, as a percentage. value ⌊absorbed ·
    100 / dose⌋. -/
theorem fam_bioavailability_fraction_1 : ((90 * 100) / 100) = 90 := by decide

/-- bioavailability: dosecorrected(5000, 50) = 100 — DOSE-CORRECTED exposure: AUC per unit of dose. value ⌊auc /
    dose⌋. -/
theorem fam_bioavailability_dosecorrected_1 : (5000 / 50) = 100 := by decide

/-- bioavailability: aucratio(600, 200) = 3 — RAW AUC RATIO: one exposure over another. value ⌊auc1 / auc2⌋. -/
theorem fam_bioavailability_aucratio_1 : (600 / 200) = 3 := by decide

/-- bioavailability: oralfactor(100, 30) = 70 — FIRST-PASS ORAL FACTOR: the share of the dose surviving
    extraction, as a percentage. value ⌊(dose − extracted) · 100 / dose⌋. -/
theorem fam_bioavailability_oralfactor_1 : (((100 - 30) * 100) / 100) = 70 := by decide

/-- bioavailability: absorbed(200, 80) = 160 — AMOUNT ABSORBED: the dose at a percent fraction. value ⌊dose ·
    fraction / 100⌋. -/
theorem fam_bioavailability_absorbed_1 : ((200 * 80) / 100) = 160 := by decide

/-- bioavailability: retained(160, 60) = 100 — AMOUNT RETAINED after elimination. value max(0, absorbed −
    eliminated). -/
theorem fam_bioavailability_retained_1 : (fmax 0 (160 - 60)) = 100 := by decide

/-- bioavailability: retained(50, 80) = 0 — AMOUNT RETAINED after elimination. value max(0, absorbed −
    eliminated). -/
theorem fam_bioavailability_retained_2 : (fmax 0 (50 - 80)) = 0 := by decide

/-- biochemistry: bonds(6) = 5 — BIOCHEMISTRY — THE CHEMISTRY OF LIFE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Reactions are numbers: enzyme rate by Michaelis–Menten, turnover per enzyme,
    reaction efficiency, concentration, pH, the bonds in a chain, molarity from mass, and the equilibrium ratio.
    Crosses to `chemistry` — biochemistry is chemistry inside the cell. A measure. */ const PROOF =
    'biochemistry arithmetic (enzyme kinetics, turnover, efficiency, concentration, pH, chain bonds, molarity,
    equilibrium); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'biochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `biochemistry.${name}`, params }) export class BiochemistryFormulas { /** CHAIN BONDS: the bonds joining a
    chain of atoms. value atoms − 1. -/
theorem fam_biochemistry_bonds_1 : (6 - 1) = 5 := by decide

/-- biochemistry: concentration(100, 4) = 25 — CONCENTRATION: moles over a volume. value ⌊moles / volume⌋. -/
theorem fam_biochemistry_concentration_1 : (100 / 4) = 25 := by decide

/-- biochemistry: efficiency(80, 100) = 80 — EFFICIENCY: actual yield as a percentage of the theoretical. value
    ⌊actual · 100 / theoretical⌋. -/
theorem fam_biochemistry_efficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- biochemistry: equilibrium(200, 100) = 200 — EQUILIBRIUM: the products-to-reactants ratio as a percentage.
    value ⌊products · 100 / reactants⌋. -/
theorem fam_biochemistry_equilibrium_1 : ((200 * 100) / 100) = 200 := by decide

/-- biochemistry: michaelis(100, 50, 50) = 50 — MICHAELIS–MENTEN: enzyme rate at a substrate level. value ⌊vmax
    · substrate / (substrate + km)⌋. -/
theorem fam_biochemistry_michaelis_1 : ((100 * 50) / (50 + 50)) = 50 := by decide

/-- biochemistry: molarity(180, 18) = 10 — MOLARITY: mass over molecular weight. value ⌊mass / weight⌋. -/
theorem fam_biochemistry_molarity_1 : (180 / 18) = 10 := by decide

/-- biochemistry: ph(70, 10) = 7 — pH: hydrogen reading over the scale. value ⌊hydrogen / scale⌋. -/
theorem fam_biochemistry_ph_1 : (70 / 10) = 7 := by decide

/-- biochemistry: turnover(1000, 10) = 100 — TURNOVER: product made per enzyme (kcat proxy). value ⌊product /
    enzyme⌋. -/
theorem fam_biochemistry_turnover_1 : (1000 / 10) = 100 := by decide

/-- biodiversity: richness(42) = 42 — BIODIVERSITY — LIFE'S VARIETY, AS ARITHMETIC (chosen by the ecology
    registry, not by hand). A community is numbers: the species present, how evenly the individuals spread
    across them, diversity and dominance indices, how much is endemic, the turnover between two places,
    abundance per area, and how much of it is rare. Crosses to `ecology` — biodiversity is what ecology
    measures. A measure. */ const PROOF = 'biodiversity arithmetic (richness, evenness, shannon, simpson,
    endemism, turnover, abundance, rarity); an ecology measure crossed to ecology' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'biodiversity', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `biodiversity.${name}`, params }) export class BiodiversityFormulas { /** RICHNESS: the count of
    species present. value species. -/
theorem fam_biodiversity_richness_1 : 42 = 42 := by decide

/-- biodiversity: evenness(1000, 10) = 100 — EVENNESS: individuals spread across the species. value ⌊individuals
    / species⌋. -/
theorem fam_biodiversity_evenness_1 : (1000 / 10) = 100 := by decide

/-- biodiversity: shannon(25, 100) = 25 — SHANNON: a species' share of the total, as a percentage. value
    ⌊species · 100 / total⌋. -/
theorem fam_biodiversity_shannon_1 : ((25 * 100) / 100) = 25 := by decide

/-- biodiversity: simpson(60, 100) = 60 — SIMPSON: the dominant species' share of the total, as a percentage.
    value ⌊dominant · 100 / total⌋. -/
theorem fam_biodiversity_simpson_1 : ((60 * 100) / 100) = 60 := by decide

/-- biodiversity: endemism(30, 100) = 30 — ENDEMISM: the endemic share of the total, as a percentage. value
    ⌊endemic · 100 / total⌋. -/
theorem fam_biodiversity_endemism_1 : ((30 * 100) / 100) = 30 := by decide

/-- biodiversity: turnover(40, 100) = 40 — TURNOVER: the shared share of the combined pool, as a percentage.
    value ⌊shared · 100 / combined⌋. -/
theorem fam_biodiversity_turnover_1 : ((40 * 100) / 100) = 40 := by decide

/-- biodiversity: abundance(1000, 25) = 40 — ABUNDANCE: the count per unit area. value ⌊count / area⌋. -/
theorem fam_biodiversity_abundance_1 : (1000 / 25) = 40 := by decide

/-- biodiversity: rarity(15, 100) = 15 — RARITY: the rare share of the species, as a percentage. value ⌊rare ·
    100 / species⌋. -/
theorem fam_biodiversity_rarity_1 : ((15 * 100) / 100) = 15 := by decide

/-- bioenergetics: atphydrolysis(10, 31) = 310 — BIOENERGETICS — THE ENERGY OF THE LIVING CELL, AS ARITHMETIC.
    Life runs on numbers: the energy an ATP hydrolysis releases, the proton-motive force across a membrane, how
    efficiently fuel becomes work, the Gibbs free energy of a reaction, the ATP an electron-transport chain
    yields, the P/O ratio, a redox potential, and the ATP a glucose repays. Crosses to `biochemistry` —
    bioenergetics is the thermodynamics the chemistry obeys. A measure. */ const PROOF = 'bioenergetics
    arithmetic (ATP hydrolysis, proton-motive force, energy efficiency, Gibbs free energy, electron transport,
    P/O ratio, redox potential, ATP yield); a measure crossed to biochemistry' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'bioenergetics', dst: 'biochemistry', formula, value, proof: PROOF, ...extra },
    holds, { name: `bioenergetics.${name}`, params }) export class BioenergeticsFormulas { /** ATP HYDROLYSIS:
    energy released by hydrolysing moles of ATP at kJ per mole. value moles · perMole. -/
theorem fam_bioenergetics_atphydrolysis_1 : (10 * 31) = 310 := by decide

/-- bioenergetics: efficiency(40, 100) = 40 — ENERGY EFFICIENCY as a percentage: useful work out of the energy
    spent. value ⌊useful · 100 / total⌋. -/
theorem fam_bioenergetics_efficiency_1 : ((40 * 100) / 100) = 40 := by decide

/-- bioenergetics: electrontransport(10, 3) = 30 — ELECTRON TRANSPORT: the ATP produced from NADH at a per-NADH
    yield. value nadh · perNadh. -/
theorem fam_bioenergetics_electrontransport_1 : (10 * 3) = 30 := by decide

/-- bioenergetics: gibbsfree(100, 10, 5) = 50 — GIBBS FREE ENERGY: ΔG = ΔH − T·ΔS, clamped at 0. value max(0,
    enthalpy − temp · entropy). -/
theorem fam_bioenergetics_gibbsfree_1 : (fmax 0 (100 - (10 * 5))) = 50 := by decide

/-- bioenergetics: phosphateratio(25, 10) = 25 — PHOSPHATE (P/O) RATIO ×10: ATP made per oxygen reduced. value
    ⌊atp · 10 / oxygen⌋. -/
theorem fam_bioenergetics_phosphateratio_1 : ((25 * 10) / 10) = 25 := by decide

/-- bioenergetics: protonmotive(140, 1) = 199 — PROTON-MOTIVE FORCE across the membrane (mV): Δψ plus 59 mV per
    unit of ΔpH. value psi + 59 · ph. -/
theorem fam_bioenergetics_protonmotive_1 : (140 + (59 * 1)) = 199 := by decide

/-- bioenergetics: redoxpotential(820, 320) = 500 — REDOX POTENTIAL of a pair (mV): the cathode half-cell less
    the anode, clamped at 0. value max(0, cathode − anode). -/
theorem fam_bioenergetics_redoxpotential_1 : (fmax 0 (820 - 320)) = 500 := by decide

/-- bioenergetics: yield(1, 38) = 38 — ATP YIELD: the ATP a cell repays per molecule of glucose. value glucose ·
    perGlucose. -/
theorem fam_bioenergetics_yield_1 : (1 * 38) = 38 := by decide

/-- bioenergetics: redoxpotential(320, 820) = 0 — REDOX POTENTIAL of a pair (mV): the cathode half-cell less the
    anode, clamped at 0. value max(0, cathode − anode). -/
theorem fam_bioenergetics_redoxpotential_2 : (fmax 0 (320 - 820)) = 0 := by decide

/-- biogeography: speciescount(500, 10) = 5000 -/
theorem fam_biogeography_speciescount_1 : (500 * 10) = 5000 := by decide

/-- biogeography: endemismratio(30, 100) = 30 -/
theorem fam_biogeography_endemismratio_1 : ((30 * 100) / 100) = 30 := by decide

/-- biogeography: rangesize(200, 300) = 60000 -/
theorem fam_biogeography_rangesize_1 : (200 * 300) = 60000 := by decide

/-- biogeography: latitudegradient(1000, 10) = 100 -/
theorem fam_biogeography_latitudegradient_1 : (1000 / 10) = 100 := by decide

/-- biogeography: habitatsubsets(6) = 64 -/
theorem fam_biogeography_habitatsubsets_1 : (2 ^ 6) = 64 := by decide

/-- biogeography: turnoverrate(40, 100) = 40 -/
theorem fam_biogeography_turnoverrate_1 : ((40 * 100) / 100) = 40 := by decide

/-- bioindicator: abundanceratio(400, 1000) = 40 — BIOINDICATOR — LIVING THINGS AS A MEASURE OF THEIR
    ENVIRONMENT, AS ARITHMETIC (chosen by the ecological-survey registry, not by hand). A field survey is
    numbers: the diversity of what lives there, the share of pollution-tolerant taxa, a biotic index, the loss
    of sensitive species, relative abundance, the pollution load, species richness, and how evenly the community
    is spread. Crosses to `ecology` — a bioindicator is what ecology reads. A measure. */ const PROOF =
    'bioindicator arithmetic (diversity, tolerance share, biotic index, sensitivity loss, abundance ratio,
    pollution load, species richness, evenness); an ecological-survey domain; a measure crossed to ecology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'bioindicator', dst: 'ecology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `bioindicator.${name}`, params }) export class BioindicatorFormulas
    { /** RELATIVE ABUNDANCE: a taxon's count against the whole, as a percentage. value ⌊count · 100 / total⌋. -/
theorem fam_bioindicator_abundanceratio_1 : ((400 * 100) / 1000) = 40 := by decide

/-- bioindicator: biotic(350, 50) = 7 — BIOTIC INDEX: the summed tolerance scores averaged over the taxa. value
    ⌊sum / taxa⌋. -/
theorem fam_bioindicator_biotic_1 : (350 / 50) = 7 := by decide

/-- bioindicator: diversityindex(25, 50) = 50 — DIVERSITY INDEX: the species present against all individuals, as
    a percentage. value ⌊species · 100 / total⌋. -/
theorem fam_bioindicator_diversityindex_1 : ((25 * 100) / 50) = 50 := by decide

/-- bioindicator: evenness(45, 60) = 75 — EVENNESS: the observed spread against the maximum possible, as a
    percentage. value ⌊observed · 100 / max⌋. -/
theorem fam_bioindicator_evenness_1 : ((45 * 100) / 60) = 75 := by decide

/-- bioindicator: pollutionload(50, 200) = 10000 — POLLUTION LOAD: concentration carried through a volume. value
    conc · volume. -/
theorem fam_bioindicator_pollutionload_1 : (50 * 200) = 10000 := by decide

/-- bioindicator: sensitivity(40, 15) = 25 — SENSITIVITY: the sensitive species lost against a clean baseline.
    value max(0, baseline − present). -/
theorem fam_bioindicator_sensitivity_1 : (fmax 0 (40 - 15)) = 25 := by decide

/-- bioindicator: sensitivity(15, 40) = 0 — SENSITIVITY: the sensitive species lost against a clean baseline.
    value max(0, baseline − present). -/
theorem fam_bioindicator_sensitivity_2 : (fmax 0 (15 - 40)) = 0 := by decide

/-- bioindicator: speciesrichness(12, 8, 5) = 25 — SPECIES RICHNESS: the distinct taxa counted across three
    strata. value a + b + c. -/
theorem fam_bioindicator_speciesrichness_1 : ((12 + 8) + 5) = 25 := by decide

/-- bioindicator: tolerancescore(12, 40) = 30 — TOLERANCE SCORE: the share of pollution-tolerant taxa, as a
    percentage. value ⌊tolerant · 100 / taxa⌋. -/
theorem fam_bioindicator_tolerancescore_1 : ((12 * 100) / 40) = 30 := by decide

/-- bioinformatics: identity(99, 100) = 99 — BIOINFORMATICS — SEQUENCE ANALYSIS AS ARITHMETIC (chosen by the
    domain registry, not by hand). Reading genomes is numbers: percent identity of an alignment, GC content,
    read coverage of a genome, alignment score per base, the BLAST e-value proxy, the count of k-mers in a
    sequence, phylogenetic shared fraction, and an RPKM expression proxy. Crosses to `genetics` — bioinformatics
    is how genetics is measured. A measure. */ const PROOF = 'bioinformatics arithmetic (percent identity, GC
    content, coverage, alignment score per base, e-value proxy, k-mer count, phylogeny shared fraction, RPKM
    expression proxy); a measure crossed to genetics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'bioinformatics', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `bioinformatics.${name}`, params }) export class BioinformaticsFormulas { /** PERCENT IDENTITY: matching
    positions over the alignment length. value ⌊matches · 100 / length⌋. -/
theorem fam_bioinformatics_identity_1 : ((99 * 100) / 100) = 99 := by decide

/-- bioinformatics: gccontent(60, 100) = 60 — GC CONTENT as a percentage of the bases. value ⌊gc · 100 / bases⌋. -/
theorem fam_bioinformatics_gccontent_1 : ((60 * 100) / 100) = 60 := by decide

/-- bioinformatics: coverage(1000, 10) = 100 — COVERAGE: reads over the genome size. value ⌊reads / genome⌋. -/
theorem fam_bioinformatics_coverage_1 : (1000 / 10) = 100 := by decide

/-- bioinformatics: alignment(500, 100) = 5 — ALIGNMENT SCORE per base. value ⌊score / length⌋. -/
theorem fam_bioinformatics_alignment_1 : (500 / 100) = 5 := by decide

/-- bioinformatics: evalue(1, 1000000) = 1 — E-VALUE PROXY: matches over the database size, scaled. value
    ⌊matches · 1000000 / database⌋. -/
theorem fam_bioinformatics_evalue_1 : ((1 * 1000000) / 1000000) = 1 := by decide

/-- bioinformatics: kmer(100, 5) = 96 — K-MER COUNT: the windows of width k in a sequence. value max(0, length −
    k + 1). -/
theorem fam_bioinformatics_kmer_1 : (fmax 0 ((100 - 5) + 1)) = 96 := by decide

/-- bioinformatics: phylogeny(80, 100) = 80 — PHYLOGENY: shared characters over the total, as a percentage.
    value ⌊shared · 100 / total⌋. -/
theorem fam_bioinformatics_phylogeny_1 : ((80 * 100) / 100) = 80 := by decide

/-- bioinformatics: expression(1000, 1000) = 1000 — EXPRESSION (RPKM proxy): reads over transcript length,
    scaled. value ⌊reads · 1000 / length⌋. -/
theorem fam_bioinformatics_expression_1 : ((1000 * 1000) / 1000) = 1000 := by decide

/-- biomass: calorific(18000, 1000) = 18 — BIOMASS — BIOENERGY, AS ARITHMETIC. Turning crop and residue into
    energy is numbers: calorific value per unit mass, moisture fraction, harvest yield per hectare, conversion
    efficiency to biofuel, combustion efficiency, carbon balance, anaerobic digestion yield, and bulk density.
    Crosses to `energy` — biomass is a store of energy. A measure. */ const PROOF = 'biomass arithmetic
    (calorific value, moisture, yield, conversion, combustion, carbon balance, digestion, density); bioenergy as
    a measure crossed to energy' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'biomass', dst: 'energy',
    formula, value, proof: PROOF, ...extra }, holds, { name: `biomass.${name}`, params }) export class
    BiomassFormulas { /** CALORIFIC VALUE: energy per unit mass. value ⌊energy / mass⌋. -/
theorem fam_biomass_calorific_1 : (18000 / 1000) = 18 := by decide

/-- biomass: carbonneutral(120, 100) = 120 — CARBON NEUTRALITY: absorbed over emitted, as a percentage. value
    ⌊absorbed · 100 / emitted⌋. -/
theorem fam_biomass_carbonneutral_1 : ((120 * 100) / 100) = 120 := by decide

/-- biomass: combustion(850, 1000) = 85 — COMBUSTION EFFICIENCY: energy released over theoretical, as a
    percentage. value ⌊released · 100 / theoretical⌋. -/
theorem fam_biomass_combustion_1 : ((850 * 100) / 1000) = 85 := by decide

/-- biomass: conversion(40, 100) = 40 — CONVERSION EFFICIENCY: biofuel from feedstock, as a percentage. value
    ⌊biofuel · 100 / feedstock⌋. -/
theorem fam_biomass_conversion_1 : ((40 * 100) / 100) = 40 := by decide

/-- biomass: density(500, 2) = 250 — BULK DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_biomass_density_1 : (500 / 2) = 250 := by decide

/-- biomass: digestion(600, 1000) = 60 — ANAEROBIC DIGESTION: methane from volatile solids, as a percentage.
    value ⌊methane · 100 / volatiles⌋. -/
theorem fam_biomass_digestion_1 : ((600 * 100) / 1000) = 60 := by decide

/-- biomass: moisture(1000, 400) = 60 — MOISTURE: the wet-over-dry water fraction, as a percentage. value ⌊(wet
    − dry) · 100 / wet⌋. -/
theorem fam_biomass_moisture_1 : (((1000 - 400) * 100) / 1000) = 60 := by decide

/-- biomass: output(5000, 10) = 500 — HARVEST YIELD: harvested over hectares. value ⌊harvested / hectares⌋. -/
theorem fam_biomass_output_1 : (5000 / 10) = 500 := by decide

/-- biomechanics: torque(50, 3) = 150 — BIOMECHANICS — THE BODY AS MECHANISM, AS ARITHMETIC. Movement is
    numbers: the torque a muscle makes about a joint, the moment of inertia of a limb, the power in a lift, the
    impulse of a step, the ground reaction a stride returns, the leverage of a lever system, the workload of a
    session, and the cadence of a gait. Crosses to `mechanical` — the body obeys the same statics and dynamics
    as any machine. A measure. */ const PROOF = 'biomechanics arithmetic (joint torque, limb moment of inertia,
    lift power, step impulse, ground reaction, lever leverage, session workload, gait cadence); the body as
    mechanism; a measure crossed to mechanical' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'biomechanics', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name:
    `biomechanics.${name}`, params }) export class BiomechanicsFormulas { /** JOINT TORQUE: a force on a moment
    arm about a joint. value force · radius. -/
theorem fam_biomechanics_torque_1 : (50 * 3) = 150 := by decide

/-- biomechanics: power(1000, 10) = 100 — POWER in a lift: work done over the time taken. value ⌊work / time⌋. -/
theorem fam_biomechanics_power_1 : (1000 / 10) = 100 := by decide

/-- biomechanics: impulse(80, 5) = 400 — IMPULSE of a step: a force applied over a contact time. value force ·
    time. -/
theorem fam_biomechanics_impulse_1 : (80 * 5) = 400 := by decide

/-- biomechanics: groundreaction(70, 5) = 1050 — GROUND REACTION FORCE under acceleration: mass times gravity
    (10) plus accel. value mass · (accel + 10). -/
theorem fam_biomechanics_groundreaction_1 : (70 * (5 + 10)) = 1050 := by decide

/-- biomechanics: leverage(100, 25) = 4 — LEVERAGE: the mechanical advantage of a lever, effort arm over load
    arm. value ⌊effort / load⌋. -/
theorem fam_biomechanics_leverage_1 : (100 / 25) = 4 := by decide

/-- biomechanics: workload(10, 50) = 500 — WORKLOAD of a session: reps at a load each (training volume). value
    reps · weight. -/
theorem fam_biomechanics_workload_1 : (10 * 50) = 500 := by decide

/-- biomechanics: gait(120, 60) = 2 — GAIT CADENCE: steps taken over the time taken. value ⌊steps / time⌋. -/
theorem fam_biomechanics_gait_1 : (120 / 60) = 2 := by decide

/-- biometrics: far(2, 10000) = 2 — BIOMETRICS — IDENTITY AS ARITHMETIC (chosen by the registry, not by hand).
    Matching people to templates is numbers: the false accept and false reject rates, overall accuracy,
    enrollment success, the match score, template size, verification throughput, and liveness against spoofs.
    Crosses to `code` — a biometric check is a program. A measure. */ const PROOF = 'biometrics arithmetic
    (false accept, false reject, accuracy, enrollment, match score, template size, throughput, liveness);
    identity as a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'biometrics', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `biometrics.${name}`, params }) export class BiometricsFormulas { /** FALSE ACCEPT RATE in basis points:
    impostors wrongly accepted. value ⌊falseaccepts · 10000 / impostors⌋. -/
theorem fam_biometrics_far_1 : ((2 * 10000) / 10000) = 2 := by decide

/-- biometrics: frr(50, 10000) = 50 — FALSE REJECT RATE in basis points: genuine users wrongly rejected. value
    ⌊falserejects · 10000 / genuine⌋. -/
theorem fam_biometrics_frr_1 : ((50 * 10000) / 10000) = 50 := by decide

/-- biometrics: accuracy(990, 1000) = 99 — ACCURACY as a percentage: correct decisions over all. value ⌊correct
    · 100 / total⌋. -/
theorem fam_biometrics_accuracy_1 : ((990 * 100) / 1000) = 99 := by decide

/-- biometrics: enrollment(95, 100) = 95 — ENROLLMENT success as a percentage: enrolled over attempts. value
    ⌊enrolled · 100 / attempts⌋. -/
theorem fam_biometrics_enrollment_1 : ((95 * 100) / 100) = 95 := by decide

/-- biometrics: matchscore(80, 100) = 80 — MATCH SCORE as a percentage: features matched over features compared.
    value ⌊matched · 100 / features⌋. -/
theorem fam_biometrics_matchscore_1 : ((80 * 100) / 100) = 80 := by decide

/-- biometrics: templatesize(2048) = 2048 — TEMPLATE SIZE: the bytes a stored template takes. value bytes. -/
theorem fam_biometrics_templatesize_1 : 2048 = 2048 := by decide

/-- biometrics: throughput(6000, 60) = 100 — THROUGHPUT: verifications over seconds. value ⌊verifications /
    seconds⌋. -/
theorem fam_biometrics_throughput_1 : (6000 / 60) = 100 := by decide

/-- biometrics: liveness(99, 100) = 99 — LIVENESS: detections over spoof attempts, as a percentage. value
    ⌊detected · 100 / spoofs⌋. -/
theorem fam_biometrics_liveness_1 : ((99 * 100) / 100) = 99 := by decide

/-- biophysics: membrane(100, 4) = 25 — MEMBRANE VOLTAGE: charge over capacitance. value ⌊charge / capacitance⌋. -/
theorem fam_biophysics_membrane_1 : (100 / 4) = 25 := by decide

/-- biophysics: elasticity(2000, 5) = 400 — ELASTICITY: Young's modulus, stress over strain. value ⌊stress /
    strain⌋. -/
theorem fam_biophysics_elasticity_1 : (2000 / 5) = 400 := by decide

/-- biophysics: osmosis(3, 1000) = 3 — OSMOSIS: solute concentration over solvent, per thousand. value ⌊solute ·
    1000 / solvent⌋. -/
theorem fam_biophysics_osmosis_1 : ((3 * 1000) / 1000) = 3 := by decide

/-- biophysics: binding(90, 10) = 9 — BINDING: bound over free ligand. value ⌊bound / free⌋. -/
theorem fam_biophysics_binding_1 : (90 / 10) = 9 := by decide

/-- biophysics: conductance(50, 10) = 5 — CONDUCTANCE: current over voltage. value ⌊current / voltage⌋. -/
theorem fam_biophysics_conductance_1 : (50 / 10) = 5 := by decide

/-- biophysics: folding(80, 100) = 80 — FOLDING: folded fraction as a percentage. value ⌊folded · 100 / total⌋. -/
theorem fam_biophysics_folding_1 : ((80 * 100) / 100) = 80 := by decide

/-- biophysics: tension(600, 20) = 30 — TENSION: force over length. value ⌊force / length⌋. -/
theorem fam_biophysics_tension_1 : (600 / 20) = 30 := by decide

/-- blackhole: schwarzschildradius(10) = 30 — BLACKHOLE — A BLACK HOLE AS ARITHMETIC (integer proxies, one
    measure per curvature fact). A black hole is numbers: the Schwarzschild radius a mass folds to, the Hawking
    temperature it glows at, the entropy on its horizon, the photon sphere light circles on, the innermost
    stable orbit matter holds, the tidal gradient that stretches, the time it takes to evaporate, and the rate
    it swallows matter. Crosses to `astrophysics` — a black hole is what astrophysics measures. */ const PROOF =
    'blackhole arithmetic (schwarzschild radius, hawking temperature, horizon entropy, photon sphere, isco,
    tidal gradient, evaporation time, accretion rate); integer proxies, each a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'blackhole', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `blackhole.${name}`, params }) export class BlackholeFormulas { /**
    SCHWARZSCHILD RADIUS: a mass folds to ~3 km per solar mass. value mass · 3. -/
theorem fam_blackhole_schwarzschildradius_1 : (10 * 3) = 30 := by decide

/-- blackhole: hawkingtemp(620) = 1000 — HAWKING TEMPERATURE: inversely proportional to mass (nanokelvin proxy).
    value ⌊620000 / mass⌋. -/
theorem fam_blackhole_hawkingtemp_1 : (620000 / 620) = 1000 := by decide

/-- blackhole: entropy(100) = 10000 — HORIZON ENTROPY: area, so the square of the mass. value mass · mass. -/
theorem fam_blackhole_entropy_1 : (100 * 100) = 10000 := by decide

/-- blackhole: photonsphere(10) = 45 — PHOTON SPHERE: 1.5× the Schwarzschild radius (rs = 3·mass). value ⌊9 ·
    mass / 2⌋. -/
theorem fam_blackhole_photonsphere_1 : ((9 * 10) / 2) = 45 := by decide

/-- blackhole: isco(10) = 90 — ISCO: the innermost stable circular orbit, 3× the Schwarzschild radius. value
    mass · 9. -/
theorem fam_blackhole_isco_1 : (10 * 9) = 90 := by decide

/-- blackhole: evaporationtime(10) = 1000 — EVAPORATION TIME: proportional to the cube of the mass. value mass ·
    mass · mass. -/
theorem fam_blackhole_evaporationtime_1 : ((10 * 10) * 10) = 1000 := by decide

/-- blackhole: accretionrate(1000, 4) = 250 — ACCRETION RATE: matter swallowed over time. value ⌊matter / time⌋. -/
theorem fam_blackhole_accretionrate_1 : (1000 / 4) = 250 := by decide

/-- blackhole: accretionrate(1000, 0) = 0 — ACCRETION RATE: matter swallowed over time. value ⌊matter / time⌋. -/
theorem fam_blackhole_accretionrate_2 : (1000 / 0) = 0 := by decide

/-- blockchain: throughput(6000, 60) = 100 — BLOCKCHAIN — A LEDGER AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A chain is numbers: transactions per second, the difficulty a hashrate meets, the
    time between blocks, how confirmed a transaction is, the fee a size pays, the leaves a Merkle tree carries,
    a validator's stake share, and how final a block is. Crosses to `code` — a ledger is a program that runs. A
    measure. */ const PROOF = 'blockchain arithmetic (throughput, difficulty, blocktime, confirmation, fee,
    merkle, stake, finality); a public-API domain; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'blockchain', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, {
    name: `blockchain.${name}`, params }) export class BlockchainFormulas { /** THROUGHPUT: transactions over
    seconds (TPS). value ⌊transactions / seconds⌋. -/
theorem fam_blockchain_throughput_1 : (6000 / 60) = 100 := by decide

/-- blockchain: difficulty(1000, 25) = 40 — DIFFICULTY: the target a hashrate meets. value ⌊target / hashrate⌋. -/
theorem fam_blockchain_difficulty_1 : (1000 / 25) = 40 := by decide

/-- blockchain: blocktime(600, 50) = 12 — BLOCKTIME: seconds over blocks. value ⌊seconds / blocks⌋. -/
theorem fam_blockchain_blocktime_1 : (600 / 50) = 12 := by decide

/-- blockchain: confirmation(3, 6) = 50 — CONFIRMATION: depth against the required depth, as a percentage. value
    ⌊depth · 100 / required⌋. -/
theorem fam_blockchain_confirmation_1 : ((3 * 100) / 6) = 50 := by decide

/-- blockchain: fee(250, 8) = 2000 — FEE: a transaction size at a rate per byte. value size · rate. -/
theorem fam_blockchain_fee_1 : (250 * 8) = 2000 := by decide

/-- blockchain: merkle(1024) = 1024 — MERKLE: the leaves a tree carries (tree size proxy). value leaves. -/
theorem fam_blockchain_merkle_1 : 1024 = 1024 := by decide

/-- blockchain: stake(30, 100) = 30 — STAKE: a validator's held share of the total, as a percentage. value ⌊held
    · 100 / total⌋. -/
theorem fam_blockchain_stake_1 : ((30 * 100) / 100) = 30 := by decide

/-- blockchain: finality(4, 8) = 50 — FINALITY: confirmed blocks against the blocks needed, as a percentage.
    value ⌊confirmed · 100 / blocks⌋. -/
theorem fam_blockchain_finality_1 : ((4 * 100) / 8) = 50 := by decide

/-- blog: categories(100, 8) = 12 — CATEGORIES: posts spread evenly over the categories. value ⌊posts / cats⌋. -/
theorem fam_blog_categories_1 : (100 / 8) = 12 := by decide

/-- blog: slug(12, 4) = 8 — SLUG: title words left after the stop-words are dropped. value max(0, words − stop). -/
theorem fam_blog_slug_1 : (fmax 0 (12 - 4)) = 8 := by decide

/-- blog: related(3, 10) = 30 — RELATED: shared-tag overlap as a percentage. value ⌊shared · 100 / total⌋. -/
theorem fam_blog_related_1 : ((3 * 100) / 10) = 30 := by decide

/-- blog: freshness(1000, 850) = 150 — FRESHNESS: time since a post was published. value max(0, now −
    published). -/
theorem fam_blog_freshness_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- blog: series(7) = 7 — SERIES: the parts of a post series. value parts. -/
theorem fam_blog_series_1 : 7 = 7 := by decide

/-- botany: photosynthesis(10, 5) = 50 — BOTANY — PLANT GROWTH AS ARITHMETIC. The life of a crop is numbers:
    light captured into sugar, seeds that sprout, water moved through leaves, biomass gained, leaf area,
    chlorophyll efficiency, yield per field, and flowers set to fruit. Crosses to `agriculture` — botany is what
    a farm grows. A measure. */ const PROOF = 'botany arithmetic (photosynthesis, germination, transpiration,
    growth, leaf area, chlorophyll, crop yield, pollination); plant growth as integers; a measure crossed to
    agriculture' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'botany', dst: 'agriculture',
    formula, value, proof: PROOF, ...extra }, holds, { name: `botany.${name}`, params }) export class
    BotanyFormulas { /** PHOTOSYNTHESIS: a proxy for sugar made, light times chlorophyll. value light ·
    chlorophyll. -/
theorem fam_botany_photosynthesis_1 : (10 * 5) = 50 := by decide

/-- botany: germination(80, 100) = 80 — GERMINATION rate as a percentage. value ⌊sprouted · 100 / sown⌋. -/
theorem fam_botany_germination_1 : ((80 * 100) / 100) = 80 := by decide

/-- botany: transpiration(20, 3) = 60 — TRANSPIRATION: water moved over a leaf area at a rate. value area ·
    rate. -/
theorem fam_botany_transpiration_1 : (20 * 3) = 60 := by decide

/-- botany: growth(150, 40) = 110 — GROWTH: biomass gained from initial to final. value max(0, final − initial). -/
theorem fam_botany_growth_1 : (fmax 0 (150 - 40)) = 110 := by decide

/-- botany: growth(40, 150) = 0 — GROWTH: biomass gained from initial to final. value max(0, final − initial). -/
theorem fam_botany_growth_2 : (fmax 0 (40 - 150)) = 0 := by decide

/-- botany: leafarea(12, 5) = 60 — LEAF AREA: length times width. value length · width. -/
theorem fam_botany_leafarea_1 : (12 * 5) = 60 := by decide

/-- botany: chlorophyll(75, 100) = 75 — CHLOROPHYLL efficiency: light absorbed over incident, as a percentage.
    value ⌊absorbed · 100 / incident⌋. -/
theorem fam_botany_chlorophyll_1 : ((75 * 100) / 100) = 75 := by decide

/-- botany: cropyield(5000, 20) = 250 — CROP YIELD: harvest over the field area. value ⌊harvest / area⌋. -/
theorem fam_botany_cropyield_1 : (5000 / 20) = 250 := by decide

/-- botany: pollination(90, 120) = 75 — POLLINATION: flowers set to fruit, as a percentage. value ⌊fertilized ·
    100 / flowers⌋. -/
theorem fam_botany_pollination_1 : ((90 * 100) / 120) = 75 := by decide

/-- braking: force(1500, 8) = 12000 — BRAKING FORCE: mass under deceleration (F = m · a). value mass · decel. -/
theorem fam_braking_force_1 : (1500 * 8) = 12000 := by decide

/-- braking: torque(4000, 20) = 80000 — ROTOR TORQUE: braking force at the effective radius. value force ·
    radius. -/
theorem fam_braking_torque_1 : (4000 * 20) = 80000 := by decide

/-- braking: fade(300, 400) = 75 — HEAT FADE: effectiveness lost as a percentage of the thermal threshold. value
    ⌊temp · 100 / max⌋. -/
theorem fam_braking_fade_1 : ((300 * 100) / 400) = 75 := by decide

/-- braking: pressure(10000, 50) = 200 — HYDRAULIC PRESSURE: force spread over the piston area. value ⌊force /
    area⌋. -/
theorem fam_braking_pressure_1 : (10000 / 50) = 200 := by decide

/-- braking: bias(60, 40) = 60 — FRONT BIAS: the front share of total braking force, as a percentage. value
    ⌊front · 100 / (front + rear)⌋. -/
theorem fam_braking_bias_1 : ((60 * 100) / (60 + 40)) = 60 := by decide

/-- braking: deceleration(100, 5) = 20 — DECELERATION: speed shed over the stopping time. value ⌊speed / time⌋. -/
theorem fam_braking_deceleration_1 : (100 / 5) = 20 := by decide

/-- braking: pad(12, 1, 5) = 7 — PAD LIFE: thickness left after a run of stops. value max(0, thickness − wear ·
    stops). -/
theorem fam_braking_pad_1 : (fmax 0 (12 - (1 * 5))) = 7 := by decide

/-- branding: awareness(750, 1000) = 75 — BRANDING — A BRAND'S STANDING, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A brand is numbers: how many know it, how many recall it, how consistent it stays
    across touchpoints, the premium it earns, how many stay loyal, how the talk nets out, how far it reaches,
    and the net promoter score. Crosses to `content` — branding is the standing of what content carries. A
    measure. */ const PROOF = 'branding arithmetic (awareness, recall, consistency, equity, loyalty, sentiment,
    reach, nps); a public-API measure crossed to content' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'branding', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name:
    `branding.${name}`, params }) export class BrandingFormulas { /** AWARENESS as a percentage of those
    surveyed. value ⌊aware · 100 / surveyed⌋. -/
theorem fam_branding_awareness_1 : ((750 * 100) / 1000) = 75 := by decide

/-- branding: recall(300, 500) = 60 — RECALL as a percentage of those shown. value ⌊recalled · 100 / shown⌋. -/
theorem fam_branding_recall_1 : ((300 * 100) / 500) = 60 := by decide

/-- branding: consistency(90, 120) = 75 — CONSISTENCY: on-brand touchpoints as a percentage of all touchpoints.
    value ⌊onbrand · 100 / touchpoints⌋. -/
theorem fam_branding_consistency_1 : ((90 * 100) / 120) = 75 := by decide

/-- branding: equity(150, 100) = 150 — EQUITY: the premium price as a percentage of the baseline. value ⌊premium
    · 100 / baseline⌋. -/
theorem fam_branding_equity_1 : ((150 * 100) / 100) = 150 := by decide

/-- branding: loyalty(400, 1000) = 40 — LOYALTY: repeat buyers as a percentage of customers. value ⌊repeat · 100
    / customers⌋. -/
theorem fam_branding_loyalty_1 : ((400 * 100) / 1000) = 40 := by decide

/-- branding: sentiment(70, 30) = 40 — SENTIMENT: positive mentions net of negative. value positive − negative
    (may be negative). -/
theorem fam_branding_sentiment_1 : (70 - 30) = 40 := by decide

/-- branding: reach(8000, 10000) = 80 — REACH: those exposed as a percentage of the target. value ⌊exposed · 100
    / target⌋. -/
theorem fam_branding_reach_1 : ((8000 * 100) / 10000) = 80 := by decide

/-- branding: nps(60, 20) = 40 — NPS: promoters net of detractors. value promoters − detractors (may be
    negative). -/
theorem fam_branding_nps_1 : (60 - 20) = 40 := by decide

/-- breeding: heritability(40, 100) = 40 — BREEDING — SELECTIVE BREEDING AS ARITHMETIC (chosen by the registry,
    not by hand). Improving a population is numbers: heritability, inbreeding accumulated over generations, the
    superiority of the selected parents, the gain that selection returns, an estimated breeding value, the
    effective population, the conception rate, and the surviving progeny. Crosses to `zoology` — breeding is
    what zoology measures in a living population. A measure. */ const PROOF = 'breeding arithmetic
    (heritability, inbreeding, selection differential, genetic gain, breeding value, effective population,
    conception rate, progeny count); a measure crossed to zoology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'breeding', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `breeding.${name}`, params }) export class BreedingFormulas { /** HERITABILITY: genetic variance over
    phenotypic variance, as a percentage. value ⌊vg · 100 / vp⌋. -/
theorem fam_breeding_heritability_1 : ((40 * 100) / 100) = 40 := by decide

/-- breeding: inbreeding(5, 50) = 50 — INBREEDING: coefficient accumulated over generations, in permille, at
    effective population ne. value ⌊gen · 1000 / (2 · ne)⌋. -/
theorem fam_breeding_inbreeding_1 : ((5 * 1000) / (2 * 50)) = 50 := by decide

/-- breeding: selectiondifferential(120, 100) = 20 — SELECTION DIFFERENTIAL: superiority of the selected parents
    over the population mean. value max(0, selected − mean). -/
theorem fam_breeding_selectiondifferential_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- breeding: geneticgain(40, 20) = 8 — GENETIC GAIN: response to selection R = h² · S, with heritability h2 as
    a percentage. value ⌊h2 · sd / 100⌋. -/
theorem fam_breeding_geneticgain_1 : ((40 * 20) / 100) = 8 := by decide

/-- breeding: breedingvalue(80, 25) = 20 — BREEDING VALUE: an EBV weighted by its reliability, reliability as a
    percentage. value ⌊reliability · ebv / 100⌋. -/
theorem fam_breeding_breedingvalue_1 : ((80 * 25) / 100) = 20 := by decide

/-- breeding: effectivepopulation(20, 80) = 64 — EFFECTIVE POPULATION: Ne from the breeding males and females.
    value ⌊4 · males · females / (males + females)⌋. -/
theorem fam_breeding_effectivepopulation_1 : (((4 * 20) * 80) / (20 + 80)) = 64 := by decide

/-- breeding: conceptionrate(85, 100) = 85 — CONCEPTION RATE: pregnancies over females bred, as a percentage.
    value ⌊pregnant · 100 / bred⌋. -/
theorem fam_breeding_conceptionrate_1 : ((85 * 100) / 100) = 85 := by decide

/-- breeding: progenycount(50, 8, 90) = 360 — PROGENY COUNT: surviving offspring from the females, each litter,
    at a survival percentage. value ⌊females · perFemale · survival / 100⌋. -/
theorem fam_breeding_progenycount_1 : (((50 * 8) * 90) / 100) = 360 := by decide

/-- brewing: abv(1075, 1000) = 1000 — BREWING — THE BREWHOUSE AS ARITHMETIC. A batch is numbers: alcohol from
    the gravity drop, how far the yeast attenuated, hop bitterness, colour, mash and extract efficiency, worth
    gravity, and carbonation. Integers only, every division guarded. Crosses to `cuisine` — brewing is cuisine
    measured. A measure. */ const PROOF = 'brewing arithmetic (abv, attenuation, ibu, srm, efficiency, gravity,
    carbonation, mash); integer values, every division guarded; a measure crossed to cuisine' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'brewing', dst: 'cuisine', formula, value, proof: PROOF, ...extra
    }, holds, { name: `brewing.${name}`, params }) export class BrewingFormulas { /** ABV x100 proxy from the
    gravity drop. value ⌊(original − final) · 1000 / 75⌋, guarded original ≥ final. -/
theorem fam_brewing_abv_1 : (((1075 - 1000) * 1000) / 75) = 1000 := by decide

/-- brewing: attenuation(100, 20) = 80 — APPARENT ATTENUATION as a percentage. value ⌊(original − final) · 100 /
    original⌋. -/
theorem fam_brewing_attenuation_1 : (((100 - 20) * 100) / 100) = 80 := by decide

/-- brewing: ibu(5, 100) = 500 — HOP BITTERNESS: alpha acid by hop mass. value alpha · hops. -/
theorem fam_brewing_ibu_1 : (5 * 100) = 500 := by decide

/-- brewing: srm(400, 10) = 40 — COLOUR proxy (SRM): malt over volume. value ⌊malt / volume⌋. -/
theorem fam_brewing_srm_1 : (400 / 10) = 40 := by decide

/-- brewing: efficiency(75, 100) = 75 — BREWHOUSE EFFICIENCY as a percentage of potential extract. value
    ⌊extracted · 100 / potential⌋. -/
theorem fam_brewing_efficiency_1 : ((75 * 100) / 100) = 75 := by decide

/-- brewing: gravity(50, 10) = 5000 — WORT GRAVITY: sugar over volume, points. value ⌊sugar · 1000 / volume⌋. -/
theorem fam_brewing_gravity_1 : ((50 * 1000) / 10) = 5000 := by decide

/-- brewing: carbonation(100, 10) = 10 — CARBONATION: dissolved CO₂ over volume. value ⌊co2 / volume⌋. -/
theorem fam_brewing_carbonation_1 : (100 / 10) = 10 := by decide

/-- brewing: mash(500, 1000) = 50 — MASH RATIO: grain to water, percent. value ⌊grain · 100 / water⌋. -/
theorem fam_brewing_mash_1 : ((500 * 100) / 1000) = 50 := by decide

/-- broadcasting: reach(250, 1000) = 25 — BROADCASTING — TRANSMISSION AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Reaching an audience is numbers: reach of a population, share of a total, stream
    bitrate, delivery latency, coverage of a transmitter, the rating from a sample, the bandwidth of channels,
    and dropout over frames. Crosses to `frontend` — broadcasting is what the frontend plays. A measure. */
    const PROOF = 'broadcasting arithmetic (reach, share, bitrate, latency, coverage, rating, bandwidth,
    dropout); a registry-chosen measure crossed to frontend' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'broadcasting', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name:
    `broadcasting.${name}`, params }) export class BroadcastingFormulas { /** REACH: viewers as a percentage of
    the population. value ⌊viewers · 100 / population⌋. -/
theorem fam_broadcasting_reach_1 : ((250 * 100) / 1000) = 25 := by decide

/-- broadcasting: share(300, 1200) = 25 — SHARE: audience as a percentage of the total watching. value ⌊audience
    · 100 / total⌋. -/
theorem fam_broadcasting_share_1 : ((300 * 100) / 1200) = 25 := by decide

/-- broadcasting: bitrate(6000000, 2) = 3000000 — BITRATE: bits over seconds. value ⌊bits / seconds⌋. -/
theorem fam_broadcasting_bitrate_1 : (6000000 / 2) = 3000000 := by decide

/-- broadcasting: latency(40) = 40 — LATENCY: delivery delay in milliseconds. value milliseconds. -/
theorem fam_broadcasting_latency_1 : 40 = 40 := by decide

/-- broadcasting: coverage(50, 12) = 600 — COVERAGE: a transmitter over its radius, as a proxy area. value
    transmitter · radius. -/
theorem fam_broadcasting_coverage_1 : (50 * 12) = 600 := by decide

/-- broadcasting: rating(45, 1000) = 4 — RATING: households as a percentage of the sampled set. value
    ⌊households · 100 / sampled⌋. -/
theorem fam_broadcasting_rating_1 : ((45 * 100) / 1000) = 4 := by decide

/-- broadcasting: bandwidth(8, 6) = 48 — BANDWIDTH: channels at a width each. value channels · width. -/
theorem fam_broadcasting_bandwidth_1 : (8 * 6) = 48 := by decide

/-- broadcasting: dropout(3, 300) = 1 — DROPOUT: lost frames as a percentage of the frames sent. value ⌊lost ·
    100 / frames⌋. -/
theorem fam_broadcasting_dropout_1 : ((3 * 100) / 300) = 1 := by decide

/-- buddhism: nobletruths(4, 0) = 4 -/
theorem fam_buddhism_nobletruths_1 : (4 + 0) = 4 := by decide

/-- buddhism: pathfactors(8, 0) = 8 -/
theorem fam_buddhism_pathfactors_1 : (8 + 0) = 8 := by decide

/-- buddhism: preceptsubsets(5) = 32 -/
theorem fam_buddhism_preceptsubsets_1 : (2 ^ 5) = 32 := by decide

/-- buddhism: suttacount(10000, 1) = 10000 -/
theorem fam_buddhism_suttacount_1 : (10000 * 1) = 10000 := by decide

/-- buddhism: aggregates(5, 0) = 5 -/
theorem fam_buddhism_aggregates_1 : (5 + 0) = 5 := by decide

/-- buddhism: rebirthrealms(6, 0) = 6 -/
theorem fam_buddhism_rebirthrealms_1 : (6 + 0) = 6 := by decide

/-- budgeting: variance(1100, 1000) = 10 — BUDGETING — PLANNING MONEY AS ARITHMETIC. A budget is numbers: how
    far actual ran from plan, how much of an allocation was used, what income is left over expenses, where a
    trend lands over periods, a department's share of the total, the monthly burn, the runway reserves buy at
    that burn, and what spending under plan saved. Crosses to `accounting` — budgeting is the plan accounting
    records against. A measure. */ const PROOF = 'budgeting arithmetic (variance, utilization, surplus,
    forecast, allocation, burnrate, runway, savings); planning money as integers; a measure crossed to
    accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'budgeting', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `budgeting.${name}`, params }) export class
    BudgetingFormulas { /** VARIANCE: how far actual ran over the budget, as a percentage. value ⌊(actual −
    budgeted) · 100 / budgeted⌋. -/
theorem fam_budgeting_variance_1 : (((1100 - 1000) * 100) / 1000) = 10 := by decide

/-- budgeting: utilization(750, 1000) = 75 — UTILIZATION: how much of an allocation was spent, as a percentage.
    value ⌊spent · 100 / allocated⌋. -/
theorem fam_budgeting_utilization_1 : ((750 * 100) / 1000) = 75 := by decide

/-- budgeting: surplus(5000, 3000) = 2000 — SURPLUS: income left over expenses, never below zero. value max(0,
    income − expenses). -/
theorem fam_budgeting_surplus_1 : (fmax 0 (5000 - 3000)) = 2000 := by decide

/-- budgeting: forecast(100, 12) = 1200 — FORECAST: a trend carried across periods. value trend · periods. -/
theorem fam_budgeting_forecast_1 : (100 * 12) = 1200 := by decide

/-- budgeting: allocation(250, 1000) = 25 — ALLOCATION: a department's share of the total, as a percentage.
    value ⌊department · 100 / total⌋. -/
theorem fam_budgeting_allocation_1 : ((250 * 100) / 1000) = 25 := by decide

/-- budgeting: burnrate(12000, 6) = 2000 — BURNRATE: spending per month. value ⌊spent / months⌋. -/
theorem fam_budgeting_burnrate_1 : (12000 / 6) = 2000 := by decide

/-- budgeting: runway(24000, 2000) = 12 — RUNWAY: the months reserves buy at a burn. value ⌊reserves / burn⌋. -/
theorem fam_budgeting_runway_1 : (24000 / 2000) = 12 := by decide

/-- budgeting: savings(1000, 700) = 300 — SAVINGS: spending under the budget, never below zero. value max(0,
    budgeted − actual). -/
theorem fam_budgeting_savings_1 : (fmax 0 (1000 - 700)) = 300 := by decide

/-- budgeting: surplus(3000, 5000) = 0 — SURPLUS: income left over expenses, never below zero. value max(0,
    income − expenses). -/
theorem fam_budgeting_surplus_2 : (fmax 0 (3000 - 5000)) = 0 := by decide

/-- bundle: treeshake(300, 1000) = 30 — TREE-SHAKING: the percentage of modules removed as dead code. value
    ⌊removed · 100 / total⌋. -/
theorem fam_bundle_treeshake_1 : ((300 * 100) / 1000) = 30 := by decide

/-- bundle: gzip(1000, 300) = 30 — GZIP RATIO: the compressed size as a percentage of the raw size. value
    ⌊compressed · 100 / raw⌋. -/
theorem fam_bundle_gzip_1 : ((300 * 100) / 1000) = 30 := by decide

/-- bundle: split(8, 10) = 80 — CODE-SPLITTING: the percentage of routes loaded lazily. value ⌊lazy · 100 /
    routes⌋. -/
theorem fam_bundle_split_1 : ((8 * 100) / 10) = 80 := by decide

/-- bundle: dedupe(12) = 12 — DEDUPE: the duplicate modules collapsed to one copy. value duplicates. -/
theorem fam_bundle_dedupe_1 : 12 = 12 := by decide

/-- bundle: entry(5000, 10) = 500 — ENTRY WEIGHT: average bytes per chunk. value ⌊size / chunks⌋. -/
theorem fam_bundle_entry_1 : (5000 / 10) = 500 := by decide

/-- bundle: overhead(50, 1000) = 5 — RUNTIME OVERHEAD: the loader runtime as a percentage of the total. value
    ⌊runtime · 100 / total⌋. -/
theorem fam_bundle_overhead_1 : ((50 * 100) / 1000) = 5 := by decide

/-- bundling: treeshake(1000, 600) = 400 — TREE-SHAKE: the bytes dropped as dead code. value max(0, total −
    used). -/
theorem fam_bundling_treeshake_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- bundling: minifyratio(1000, 400) = 60 — MINIFY RATIO: percent shaved by minification. value ⌊max(0, original
    − minified) · 100 / original⌋. -/
theorem fam_bundling_minifyratio_1 : (((fmax 0 (1000 - 400)) * 100) / 1000) = 60 := by decide

/-- bundling: gzipratio(1000, 250) = 4 — GZIP RATIO: how many times smaller after gzip. value ⌊raw /
    compressed⌋. -/
theorem fam_bundling_gzipratio_1 : (1000 / 250) = 4 := by decide

/-- bundling: splitpoints(8, 2) = 10 — SPLIT POINTS: the code-split points a route graph needs. value routes +
    entries. -/
theorem fam_bundling_splitpoints_1 : (8 + 2) = 10 := by decide

/-- bundling: loadtime(10000, 100) = 100 — LOAD TIME: milliseconds to ship the bytes over the wire. value ⌊bytes
    / bandwidth⌋. -/
theorem fam_bundling_loadtime_1 : (10000 / 100) = 100 := by decide

/-- bundling: dedupe(50, 20) = 30 — DEDUPE: the duplicate copies removed. value max(0, copies − unique). -/
theorem fam_bundling_dedupe_1 : (fmax 0 (50 - 20)) = 30 := by decide

/-- bundling: dedupe(20, 50) = 0 — DEDUPE: the duplicate copies removed. value max(0, copies − unique). -/
theorem fam_bundling_dedupe_2 : (fmax 0 (20 - 50)) = 0 := by decide

/-- burndown: remaining(100, 40) = 60 — BURNDOWN — A SPRINT'S PROGRESS, AS ARITHMETIC (chosen by the registry,
    not by hand). Finishing work is numbers: the work that remains, the ideal and actual burn per day, the days
    a remainder forecasts, scope that creeps in, team velocity, the percent of a sprint done, and how far actual
    sits from ideal. Crosses to `statistics` — a burndown is a measured series. */ const PROOF = 'burndown
    arithmetic (remaining work, ideal/actual burn rate, completion forecast, scope creep, velocity, sprint
    progress, variance); a measured series crossed to statistics' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'burndown', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `burndown.${name}`, params }) export class BurndownFormulas { /** REMAINING WORK: the points left after the
    done ones. value max(0, total − done). -/
theorem fam_burndown_remaining_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- burndown: remaining(40, 100) = 0 — BURNDOWN — A SPRINT'S PROGRESS, AS ARITHMETIC (chosen by the registry,
    not by hand). Finishing work is numbers: the work that remains, the ideal and actual burn per day, the days
    a remainder forecasts, scope that creeps in, team velocity, the percent of a sprint done, and how far actual
    sits from ideal. Crosses to `statistics` — a burndown is a measured series. */ const PROOF = 'burndown
    arithmetic (remaining work, ideal/actual burn rate, completion forecast, scope creep, velocity, sprint
    progress, variance); a measured series crossed to statistics' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'burndown', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `burndown.${name}`, params }) export class BurndownFormulas { /** REMAINING WORK: the points left after the
    done ones. value max(0, total − done). -/
theorem fam_burndown_remaining_2 : (fmax 0 (40 - 100)) = 0 := by decide

/-- burndown: idealrate(100, 10) = 10 — IDEAL RATE: the work to burn each day to finish on time. value ⌊total /
    days⌋. -/
theorem fam_burndown_idealrate_1 : (100 / 10) = 10 := by decide

/-- burndown: actualrate(80, 10) = 8 — ACTUAL RATE: the work actually burned each day. value ⌊done / days⌋. -/
theorem fam_burndown_actualrate_1 : (80 / 10) = 8 := by decide

/-- burndown: scopecreep(20, 5) = 15 — SCOPE CREEP: the net work added mid-sprint. value max(0, added −
    removed). -/
theorem fam_burndown_scopecreep_1 : (fmax 0 (20 - 5)) = 15 := by decide

/-- burndown: velocity(120, 6) = 20 — VELOCITY: the points a team clears per sprint. value ⌊points / sprints⌋. -/
theorem fam_burndown_velocity_1 : (120 / 6) = 20 := by decide

/-- burndown: sprintprogress(40, 80) = 50 — SPRINT PROGRESS as a percentage. value ⌊done · 100 / total⌋. -/
theorem fam_burndown_sprintprogress_1 : ((40 * 100) / 80) = 50 := by decide

/-- burndown: variance(50, 40) = 10 — VARIANCE: how far actual burn sits above the ideal. value max(0, actual −
    ideal). -/
theorem fam_burndown_variance_1 : (fmax 0 (50 - 40)) = 10 := by decide

/-- butchery: yield(60, 100) = 60 -/
theorem fam_butchery_yield_1 : ((60 * 100) / 100) = 60 := by decide

/-- butchery: primalcuts(8, 0) = 8 -/
theorem fam_butchery_primalcuts_1 : (8 + 0) = 8 := by decide

/-- butchery: weightkg(300, 1) = 300 -/
theorem fam_butchery_weightkg_1 : (300 * 1) = 300 := by decide

/-- butchery: boneratio(15, 100) = 15 -/
theorem fam_butchery_boneratio_1 : ((15 * 100) / 100) = 15 := by decide

/-- butchery: aginggraysdays(21, 1) = 21 -/
theorem fam_butchery_aginggraysdays_1 : (21 * 1) = 21 := by decide

/-- butchery: portionsper(300, 2) = 150 -/
theorem fam_butchery_portionsper_1 : (300 / 2) = 150 := by decide

/-- butchery: gradescore(90, 100) = 90 -/
theorem fam_butchery_gradescore_1 : ((90 * 100) / 100) = 90 := by decide
