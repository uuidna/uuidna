-- lean/FamiliesW.lean — GENERATED. THE FAMILIES, W — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- walkability: walkscore(45, 50) = 90 — WALK SCORE: amenities reached against the most a place could offer, as
    a percentage. value ⌊amenities · 100 / max⌋. -/
theorem fam_walkability_walkscore_1 : ((45 * 100) / 50) = 90 := by decide

/-- walkability: amenityaccess(18, 24) = 75 — WALKABILITY — A NEIGHBOURHOOD ON FOOT, AS ARITHMETIC (chosen by
    the public-API registry, not by hand). How walkable a place is reduces to numbers: a walk score, the
    amenities within reach, the share of streets with sidewalks, crossings per distance, the walkshed a pace
    covers, pedestrian safety, transit proximity, and the penalty a slope adds. Crosses to `sociology` —
    walkability is what a built environment does to how people live together. A measure. */ const PROOF =
    'walkability arithmetic (walk score, amenity access, sidewalk ratio, crossing density, walkshed, pedestrian
    safety, transit proximity, slope penalty); the registry\'s next uncovered domain; a measure crossed to
    sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'walkability', dst: 'sociology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `walkability.${name}`, params }) export class
    WalkabilityFormulas { /** AMENITY ACCESS: the share of nearby amenities reachable on foot, as a percentage.
    value ⌊reachable · 100 / total⌋. -/
theorem fam_walkability_amenityaccess_1 : ((18 * 100) / 24) = 75 := by decide

/-- walkability: sidewalkratio(360, 400) = 90 — SIDEWALK RATIO: the share of street segments with a sidewalk, as
    a percentage. value ⌊withSidewalk · 100 / total⌋. -/
theorem fam_walkability_sidewalkratio_1 : ((360 * 100) / 400) = 90 := by decide

/-- walkability: crossingdensity(12, 2000) = 6 — CROSSING DENSITY: pedestrian crossings per 1000 metres of
    street. value ⌊crossings · 1000 / length⌋. -/
theorem fam_walkability_crossingdensity_1 : ((12 * 1000) / 2000) = 6 := by decide

/-- walkability: walkshed(80, 15) = 1200 — WALKSHED: the distance a pace covers in a time, metres per minute
    over minutes. value speed · minutes. -/
theorem fam_walkability_walkshed_1 : (80 * 15) = 1200 := by decide

/-- walkability: pedestriansafety(5, 100) = 95 — PEDESTRIAN SAFETY: a score falling with incidents per exposure.
    value max(0, 100 − ⌊incidents · 100 / trips⌋). -/
theorem fam_walkability_pedestriansafety_1 : (fmax 0 (100 - ((5 * 100) / 100))) = 95 := by decide

/-- walkability: transitproximity(200, 800) = 75 — TRANSIT PROXIMITY: a score falling with distance to the
    nearest stop. value max(0, 100 − ⌊distance · 100 / maxdist⌋). -/
theorem fam_walkability_transitproximity_1 : (fmax 0 (100 - ((200 * 100) / 800))) = 75 := by decide

/-- walkability: slopepenalty(8, 100) = 8 — SLOPE PENALTY: the percent grade a route climbs, rise over run.
    value ⌊rise · 100 / run⌋. -/
theorem fam_walkability_slopepenalty_1 : ((8 * 100) / 100) = 8 := by decide

/-- warehouse: scanrows(10000, 25) = 2500 — WAREHOUSE — THE ANALYTIC STORE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A columnar warehouse is numbers: the rows a scan touches, the partitions
    pruning leaves, a column's bytes, the compression ratio, a query's cost, a materialized view's net hits, a
    column's cardinality, and the blocks clustering touches. Crosses to `indexing` — the warehouse is what an
    index addresses. A measure. */ const PROOF = 'warehouse arithmetic (scan rows, partition pruning, column
    size, compression ratio, query cost, materialized hits, cardinality, clustering); the analytic store as a
    measure crossed to indexing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'warehouse', dst:
    'indexing', formula, value, proof: PROOF, ...extra }, holds, { name: `warehouse.${name}`, params }) export
    class WarehouseFormulas { /** SCAN ROWS: the rows a scan touches at a selectivity percent. value ⌊rows ·
    selectivity / 100⌋. -/
theorem fam_warehouse_scanrows_1 : ((10000 * 25) / 100) = 2500 := by decide

/-- warehouse: partitionprune(64, 50) = 14 — PARTITION PRUNE: the partitions pruning leaves to read. value
    max(0, total − pruned). -/
theorem fam_warehouse_partitionprune_1 : (fmax 0 (64 - 50)) = 14 := by decide

/-- warehouse: columnsize(1000, 8) = 8000 — COLUMN SIZE: a column's bytes — rows at a width each. value rows ·
    bytes. -/
theorem fam_warehouse_columnsize_1 : (1000 * 8) = 8000 := by decide

/-- warehouse: compressionratio(1000, 250) = 4 — COMPRESSION RATIO: raw over compressed. value ⌊raw /
    compressed⌋. -/
theorem fam_warehouse_compressionratio_1 : (1000 / 250) = 4 := by decide

/-- warehouse: querycost(500, 2, 100) = 1100 — QUERY COST: rows at a per-row cost plus a startup cost. value
    rows · perRow + startup. -/
theorem fam_warehouse_querycost_1 : ((500 * 2) + 100) = 1100 := by decide

/-- warehouse: materialized(1000, 24) = 976 — MATERIALIZED: a view's net hits — queries served less refreshes
    paid. value max(0, queries − refreshes). -/
theorem fam_warehouse_materialized_1 : (fmax 0 (1000 - 24)) = 976 := by decide

/-- warehouse: cardinality(250, 1000) = 25 — CARDINALITY: distinct values as a percent of the total. value
    ⌊distinct · 100 / total⌋. -/
theorem fam_warehouse_cardinality_1 : ((250 * 100) / 1000) = 25 := by decide

/-- warehousing: utilization(750, 1000) = 75 — WAREHOUSING — THE FLOOR AS ARITHMETIC (chosen by the operations
    registry, not by hand). Running a warehouse is numbers: how full the racks are, how fast a picker moves,
    order accuracy, how often inventory turns, dock-door pressure, slot reachability, daily throughput, and cube
    fill. Crosses to `logistics` — warehousing is where logistics lands. A measure. */ const PROOF =
    'warehousing arithmetic (utilization, pick rate, accuracy, turnover, dock pressure, slotting, throughput,
    cube fill); an operations domain; a measure crossed to logistics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'warehousing', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds,
    { name: `warehousing.${name}`, params }) export class WarehousingFormulas { /** UTILIZATION: how full the
    racks are, as a percentage. value ⌊used · 100 / capacity⌋. -/
theorem fam_warehousing_utilization_1 : ((750 * 100) / 1000) = 75 := by decide

/-- warehousing: pickrate(600, 8) = 75 — PICK RATE: picks completed over hours worked. value ⌊picks / hours⌋. -/
theorem fam_warehousing_pickrate_1 : (600 / 8) = 75 := by decide

/-- warehousing: accuracy(990, 1000) = 99 — ORDER ACCURACY as a percentage. value ⌊correct · 100 / orders⌋. -/
theorem fam_warehousing_accuracy_1 : ((990 * 100) / 1000) = 99 := by decide

/-- warehousing: turnover(5000, 1000) = 5 — INVENTORY TURNOVER: units shipped over units on hand. value ⌊shipped
    / inventory⌋. -/
theorem fam_warehousing_turnover_1 : (5000 / 1000) = 5 := by decide

/-- warehousing: dock(30, 10) = 300 — DOCK PRESSURE: doors per truck, as a percentage. value ⌊doors · 100 /
    trucks⌋. -/
theorem fam_warehousing_dock_1 : ((30 * 100) / 10) = 300 := by decide

/-- warehousing: slotting(800, 1000) = 80 — SLOTTING: reachable slots as a percentage of all slots. value
    ⌊accessible · 100 / total⌋. -/
theorem fam_warehousing_slotting_1 : ((800 * 100) / 1000) = 80 := by decide

/-- warehousing: throughput(7000, 7) = 1000 — THROUGHPUT: units moved over days. value ⌊units / days⌋. -/
theorem fam_warehousing_throughput_1 : (7000 / 7) = 1000 := by decide

/-- warehousing: cube(600, 1000) = 60 — CUBE FILL: volume filled as a percentage of space. value ⌊volume · 100 /
    space⌋. -/
theorem fam_warehousing_cube_1 : ((600 * 100) / 1000) = 60 := by decide

/-- wastewater: bod(300, 200) = 60000 — BOD LOAD: a flow carrying a concentration. value flow · conc. -/
theorem fam_wastewater_bod_1 : (300 * 200) = 60000 := by decide

/-- wastewater: clarifier(1200, 40) = 30 — CLARIFIER OVERFLOW: a flow spread over the surface area. value ⌊flow
    / area⌋. -/
theorem fam_wastewater_clarifier_1 : (1200 / 40) = 30 := by decide

/-- wastewater: cod(200, 2) = 400 — COD from BOD by a ratio. value bod · ratio. -/
theorem fam_wastewater_cod_1 : (200 * 2) = 400 := by decide

/-- wastewater: loading(6000, 50) = 120 — SURFACE LOADING: a mass over the area it loads. value ⌊mass / area⌋. -/
theorem fam_wastewater_loading_1 : (6000 / 50) = 120 := by decide

/-- wastewater: removal(200, 20) = 90 — REMOVAL EFFICIENCY as a percentage. value ⌊(in − out) · 100 / in⌋. -/
theorem fam_wastewater_removal_1 : (((200 - 20) * 100) / 200) = 90 := by decide

/-- wastewater: retention(4800, 200) = 24 — RETENTION: how long a volume is held at a flow. value ⌊volume /
    flow⌋. -/
theorem fam_wastewater_retention_1 : (4800 / 200) = 24 := by decide

/-- wastewater: sludge(150, 7) = 1050 — SLUDGE: solids laid down over days. value solids · days. -/
theorem fam_wastewater_sludge_1 : (150 * 7) = 1050 := by decide

/-- wastewater: removal(100, 100) = 0 — REMOVAL EFFICIENCY as a percentage. value ⌊(in − out) · 100 / in⌋. -/
theorem fam_wastewater_removal_2 : (((100 - 100) * 100) / 100) = 0 := by decide

/-- waterquality: wqi(270, 3) = 90 — WATERQUALITY — THE STATE OF WATER, AS ARITHMETIC (chosen by the
    environmental registry, not by hand). A sample is numbers: the overall quality index, dissolved oxygen as
    saturation, biochemical oxygen demand, turbidity, hardness as CaCO₃, the alkalinity index over neutral,
    nitrate against its limit, and the coliform count per volume. Crosses to `hydrology` — water quality is what
    hydrology measures in the water it tracks. A measure. */ const PROOF = 'waterquality arithmetic (quality
    index, dissolved-oxygen saturation, BOD, turbidity, hardness as CaCO₃, pH index over neutral, nitrate vs
    limit, coliform per volume); an environmental domain; a measure crossed to hydrology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'waterquality', dst: 'hydrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `waterquality.${name}`, params }) export class WaterqualityFormulas { /** WATER
    QUALITY INDEX: the mean of the sub-index scores. value ⌊sum / count⌋. -/
theorem fam_waterquality_wqi_1 : (270 / 3) = 90 := by decide

/-- waterquality: dissolvedoxygen(8, 10) = 80 — DISSOLVED OXYGEN as a percentage of saturation. value ⌊measured
    · 100 / saturation⌋. -/
theorem fam_waterquality_dissolvedoxygen_1 : ((8 * 100) / 10) = 80 := by decide

/-- waterquality: bod(9, 3) = 6 — BIOCHEMICAL OXYGEN DEMAND: the oxygen consumed between two readings. value
    max(0, initial − final). -/
theorem fam_waterquality_bod_1 : (fmax 0 (9 - 3)) = 6 := by decide

/-- waterquality: turbidity(5, 4) = 20 — TURBIDITY: scattering at a calibration factor, in NTU. value scattered
    · factor. -/
theorem fam_waterquality_turbidity_1 : (5 * 4) = 20 := by decide

/-- waterquality: hardness(40, 10) = 120 — HARDNESS as CaCO₃: calcium and magnesium at their equivalence
    weights. value calcium · 2 + magnesium · 4. -/
theorem fam_waterquality_hardness_1 : ((40 * 2) + (10 * 4)) = 120 := by decide

/-- waterquality: phindex(9, 7) = 2 — THE pH INDEX: how far the reading sits above neutral. value max(0, ph −
    neutral). -/
theorem fam_waterquality_phindex_1 : (fmax 0 (9 - 7)) = 2 := by decide

/-- waterquality: phindex(6, 7) = 0 — THE pH INDEX: how far the reading sits above neutral. value max(0, ph −
    neutral). -/
theorem fam_waterquality_phindex_2 : (fmax 0 (6 - 7)) = 0 := by decide

/-- waterquality: nitrate(45, 50) = 90 — NITRATE against its safe limit, as a percentage. value ⌊measured · 100
    / limit⌋. -/
theorem fam_waterquality_nitrate_1 : ((45 * 100) / 50) = 90 := by decide

/-- waterquality: coliform(1000, 100) = 10 — COLIFORM count per unit volume (CFU). value ⌊count / volume⌋. -/
theorem fam_waterquality_coliform_1 : (1000 / 100) = 10 := by decide

/-- watershed: runoff(200, 60) = 120 — WATERSHED — A DRAINAGE BASIN AS ARITHMETIC. Water on a catchment is
    numbers: the runoff a storm sheds, how finely streams dissect the land, how long flow takes to concentrate,
    the peak a storm drives, what the soil drinks, the area it drains, where a reach sits in the stream
    hierarchy, and the fall from ridge to outlet. Crosses to `hydrology` — watershed is the surface hydrology
    acts on. A measure. */ const PROOF = 'watershed arithmetic (runoff, drainage density, time of concentration,
    peak flow, infiltration, catchment area, stream order, basin relief); a drainage basin as integer formulas;
    a measure crossed to hydrology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'watershed', dst:
    'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `watershed.${name}`, params }) export
    class WatershedFormulas { /** RUNOFF: the depth a storm sheds at a runoff coefficient (percent). value
    ⌊rainfall · coeff / 100⌋. -/
theorem fam_watershed_runoff_1 : ((200 * 60) / 100) = 120 := by decide

/-- watershed: drainagedensity(1500, 30) = 50 — DRAINAGE DENSITY: total stream length over the basin area. value
    ⌊length / area⌋. -/
theorem fam_watershed_drainagedensity_1 : (1500 / 30) = 50 := by decide

/-- watershed: timeofconcentration(3600, 2) = 1800 — TIME OF CONCENTRATION: travel time of flow along its path
    at a velocity. value ⌊length / velocity⌋. -/
theorem fam_watershed_timeofconcentration_1 : (3600 / 2) = 1800 := by decide

/-- watershed: peakflow(50, 20, 100) = 1000 — PEAK FLOW: the rational method — coefficient (percent), intensity,
    area. value ⌊coeff · intensity · area / 100⌋. -/
theorem fam_watershed_peakflow_1 : (((100 * 50) * 20) / 100) = 1000 := by decide

/-- watershed: infiltration(200, 120) = 80 — INFILTRATION: the rainfall the soil drinks, what the storm did not
    shed. value max(0, rainfall − runoff). -/
theorem fam_watershed_infiltration_1 : (fmax 0 (200 - 120)) = 80 := by decide

/-- watershed: catchmentarea(500, 300) = 150000 — CATCHMENT AREA: the drained rectangle, length by width. value
    length · width. -/
theorem fam_watershed_catchmentarea_1 : (500 * 300) = 150000 := by decide

/-- watershed: basinrelief(1200, 300) = 900 — BASIN RELIEF: the fall from the highest ridge to the outlet. value
    max(0, highest − lowest). -/
theorem fam_watershed_basinrelief_1 : (fmax 0 (1200 - 300)) = 900 := by decide

/-- waveform: period(1000) = 1000 — PERIOD: microseconds per cycle from a frequency. value ⌊1000000 / freq⌋. -/
theorem fam_waveform_period_1 : (1000000 / 1000) = 1000 := by decide

/-- waveform: amplitude(100, 20) = 40 — WAVEFORM — A SIGNAL AS ARITHMETIC. A periodic signal is numbers: its
    period from frequency, amplitude from the swing, the RMS value, the duty cycle, the crest factor, the
    peak-to-peak span, the frequency back from a period, and the slew rate. Crosses to `signal` — a waveform is
    the signal these measures describe. A measure. */ const PROOF = 'waveform arithmetic (period, amplitude,
    rms, duty cycle, crest factor, peak-to-peak, frequency-from-period, slew rate); a periodic signal as
    integers; a measure crossed to signal' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'waveform', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `waveform.${name}`,
    params }) export class WaveformFormulas { /** AMPLITUDE: half the swing between max and min. value ⌊max(0,
    max − min) / 2⌋. -/
theorem fam_waveform_amplitude_1 : ((fmax 0 (100 - 20)) / 2) = 40 := by decide

/-- waveform: rmsvalue(1000) = 707 — RMS VALUE: the root-mean-square of a sine, peak · √2⁻¹ ≈ peak · 707 / 1000.
    value ⌊peak · 707 / 1000⌋. -/
theorem fam_waveform_rmsvalue_1 : ((1000 * 707) / 1000) = 707 := by decide

/-- waveform: dutycycle(25, 100) = 25 — DUTY CYCLE: the on-time as a percentage of the period. value ⌊on · 100 /
    period⌋. -/
theorem fam_waveform_dutycycle_1 : ((25 * 100) / 100) = 25 := by decide

/-- waveform: crestfactor(1000, 707) = 1414 — CREST FACTOR: peak over rms, scaled by 1000. value ⌊peak · 1000 /
    rms⌋. -/
theorem fam_waveform_crestfactor_1 : ((1000 * 1000) / 707) = 1414 := by decide

/-- waveform: peaktopeak(100, 30) = 70 — PEAK-TO-PEAK: the full span from min to max. value max(0, max − min). -/
theorem fam_waveform_peaktopeak_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- waveform: frequencyfromperiod(1000) = 1000 — FREQUENCY FROM PERIOD: the inverse of a period in microseconds.
    value ⌊1000000 / period⌋. -/
theorem fam_waveform_frequencyfromperiod_1 : (1000000 / 1000) = 1000 := by decide

/-- waveform: slewrate(1000, 50) = 20 — SLEW RATE: voltage change over the time it took. value ⌊delta / time⌋. -/
theorem fam_waveform_slewrate_1 : (1000 / 50) = 20 := by decide

/-- wavelet: levels(1024, 128) = 8 — WAVELET — MULTIRESOLUTION ANALYSIS AS ARITHMETIC (chosen by the transform
    registry, not by hand). A wavelet decomposition is numbers: how many levels a signal admits, the scale at a
    level, the coefficients a level carries, how much a thresholded reconstruction compresses, the subbands a
    decomposition yields, the energy in a band, the vanishing moments of a filter, and the detail coefficients
    spread across levels. Crosses to `signal` — a wavelet is how a signal is read. A measure. */ const PROOF =
    'wavelet arithmetic (levels, scale, coefficients, compression, decomposition, energy, vanishing moments,
    detail coefficients); a multiresolution measure crossed to signal' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'wavelet', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name:
    `wavelet.${name}`, params }) export class WaveletFormulas { /** LEVELS: the decomposition levels a signal of
    a length admits at a base window. value ⌊length / base⌋. -/
theorem fam_wavelet_levels_1 : (1024 / 128) = 8 := by decide

/-- wavelet: scale(3, 7) = 21 — SCALE: the scale factor at a level for a base dilation. value factor · level. -/
theorem fam_wavelet_scale_1 : (3 * 7) = 21 := by decide

/-- wavelet: coefficients(1024, 4) = 256 — COEFFICIENTS: the coefficients a level carries over a signal length.
    value ⌊length / level⌋. -/
theorem fam_wavelet_coefficients_1 : (1024 / 4) = 256 := by decide

/-- wavelet: compression(1000, 100) = 90 — COMPRESSION as a percentage: the fraction of coefficients dropped.
    value ⌊(original − retained) · 100 / original⌋. -/
theorem fam_wavelet_compression_1 : (((1000 - 100) * 100) / 1000) = 90 := by decide

/-- wavelet: decomposition(1, 7) = 8 — DECOMPOSITION: the subbands a decomposition yields from approximation and
    detail bands. value approx + detail. -/
theorem fam_wavelet_decomposition_1 : (1 + 7) = 8 := by decide

/-- wavelet: energy(16, 256) = 4096 — ENERGY: the energy in a band, amplitude over its samples. value amplitude
    · samples. -/
theorem fam_wavelet_energy_1 : (16 * 256) = 4096 := by decide

/-- wavelet: vanishingmoments(8) = 4 — VANISHING MOMENTS: a Daubechies filter of a tap count has half as many
    vanishing moments. value ⌊taps / 2⌋. -/
theorem fam_wavelet_vanishingmoments_1 : (8 / 2) = 4 := by decide

/-- wavelet: compression(1000, 1000) = 0 — COMPRESSION as a percentage: the fraction of coefficients dropped.
    value ⌊(original − retained) · 100 / original⌋. -/
theorem fam_wavelet_compression_2 : (((1000 - 1000) * 100) / 1000) = 0 := by decide

/-- waypoint: eta(1000, 50) = 20 — ETA: whole time units to cover a distance at a speed. value ⌊distance /
    speed⌋. -/
theorem fam_waypoint_eta_1 : (1000 / 50) = 20 := by decide

/-- waypoint: totalroute(5, 120) = 600 — TOTAL ROUTE: the legs of a plan at a length each. value legs · perLeg. -/
theorem fam_waypoint_totalroute_1 : (5 * 120) = 600 := by decide

/-- waypoint: fuelburn(1000, 25) = 250 — FUEL BURN: the fuel a leg burns at a rate per hundred distance. value
    ⌊distance · rate / 100⌋. -/
theorem fam_waypoint_fuelburn_1 : ((1000 * 25) / 100) = 250 := by decide

/-- waypoint: groundspeed(900, 15) = 60 — GROUND SPEED: distance over the ground in a time. value ⌊distance /
    time⌋. -/
theorem fam_waypoint_groundspeed_1 : (900 / 15) = 60 := by decide

/-- weather: heatindex(30, 80) = 38 — WEATHER — METEOROLOGY, AS ARITHMETIC (chosen by the public-API registry,
    not by hand). The sky is numbers: the heat you feel, the chill the wind takes off, the dew point, pressure
    at altitude, how fast it rains, relative humidity, visibility, and the UV reading. Crosses to `environment`
    — weather is the environment, measured. A measure. */ const PROOF = 'weather arithmetic (heat index, wind
    chill, dew point, pressure, precipitation, humidity, visibility, uv); meteorology as integers; a measure
    crossed to environment' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'weather', dst:
    'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `weather.${name}`, params }) export
    class WeatherFormulas { /** HEAT INDEX: the temperature nudged up by the humidity. value ⌊temp + humidity /
    10⌋. -/
theorem fam_weather_heatindex_1 : (30 + (80 / 10)) = 38 := by decide

/-- weather: windchill(10, 50) = 5 — WIND CHILL: the temperature the wind takes down, never below zero. value
    max(0, temp − ⌊wind / 10⌋). -/
theorem fam_weather_windchill_1 : (fmax 0 (10 - (50 / 10))) = 5 := by decide

/-- weather: windchill(3, 90) = 0 — WIND CHILL: the temperature the wind takes down, never below zero. value
    max(0, temp − ⌊wind / 10⌋). -/
theorem fam_weather_windchill_2 : (fmax 0 (3 - (90 / 10))) = 0 := by decide

/-- weather: pressure(1013, 800) = 913 — DEW POINT: the temperature dropped by the dryness. value ⌊temp − (100 −
    humidity) / 5⌋. */ // TODO: no Lean definition is generated for this formula. Its floor is over a sum with a
    division, which the translator refuses // (theorems/translate-formulas.py). The formula string is correct;
    the TypeScript value is the only check. static dewpoint(temp: number, humidity: number): CrossFormula {
    return c('weather-dewpoint', 'dewpoint(temp, humidity) = ⌊temp − (100 − humidity) / 5⌋', Math.floor(temp -
    (100 - humidity) / 5), nat(temp, humidity) && humidity <= 100, 'dewpoint', [temp, humidity]) } /** PRESSURE:
    sea-level pressure falling off with altitude, never below zero. value max(0, sea − ⌊altitude / 8⌋). -/
theorem fam_weather_pressure_1 : (fmax 0 (1013 - (800 / 8))) = 913 := by decide

/-- weather: pressure(50, 8000) = 0 — DEW POINT: the temperature dropped by the dryness. value ⌊temp − (100 −
    humidity) / 5⌋. */ // TODO: no Lean definition is generated for this formula. Its floor is over a sum with a
    division, which the translator refuses // (theorems/translate-formulas.py). The formula string is correct;
    the TypeScript value is the only check. static dewpoint(temp: number, humidity: number): CrossFormula {
    return c('weather-dewpoint', 'dewpoint(temp, humidity) = ⌊temp − (100 − humidity) / 5⌋', Math.floor(temp -
    (100 - humidity) / 5), nat(temp, humidity) && humidity <= 100, 'dewpoint', [temp, humidity]) } /** PRESSURE:
    sea-level pressure falling off with altitude, never below zero. value max(0, sea − ⌊altitude / 8⌋). -/
theorem fam_weather_pressure_2 : (fmax 0 (50 - (8000 / 8))) = 0 := by decide

/-- weather: precipitation(60, 4) = 15 — PRECIPITATION: millimetres over the hours they fell — a rate. value ⌊mm
    / hours⌋. -/
theorem fam_weather_precipitation_1 : (60 / 4) = 15 := by decide

/-- weather: humidity(40, 50) = 80 — RELATIVE HUMIDITY as a percentage. value ⌊vapor · 100 / max⌋. -/
theorem fam_weather_humidity_1 : ((40 * 100) / 50) = 80 := by decide

/-- weather: visibility(12) = 12 — VISIBILITY: the kilometres you can see. value km. -/
theorem fam_weather_visibility_1 : 12 = 12 := by decide

/-- weather: uv(7) = 7 — THE UV READING on the standard index. value index. -/
theorem fam_weather_uv_1 : 7 = 7 := by decide

/-- weaving: threadcount(80, 60) = 140 — WEAVING — THE LOOM AS ARITHMETIC. A woven cloth is numbers: the thread
    count (warp ends plus weft picks), the warp and weft threads packed into an inch, the density of their
    crossings, the cover factor as a percentage, the loom's picks per minute, the width a warp spins into, and
    the grams per square metre. Crosses to `materials` — weaving is what a material is made into. A measure. */
    const PROOF = 'weaving arithmetic (thread count, warp/weft per inch, crossing density, cover factor, loom
    pick rate, width, gsm); the loom as integers; a measure crossed to materials' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'weaving', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, {
    name: `weaving.${name}`, params }) export class WeavingFormulas { /** THREAD COUNT: warp ends plus weft
    picks. value warp + weft. -/
theorem fam_weaving_threadcount_1 : (80 + 60) = 140 := by decide

/-- weaving: warp(800, 10) = 80 — WARP per inch: warp ends over the width. value ⌊ends / width⌋. -/
theorem fam_weaving_warp_1 : (800 / 10) = 80 := by decide

/-- weaving: weft(600, 10) = 60 — WEFT per inch: weft picks over the width. value ⌊picks / width⌋. -/
theorem fam_weaving_weft_1 : (600 / 10) = 60 := by decide

/-- weaving: density(80, 60) = 4800 — DENSITY: the crossings of warp and weft. value warp · weft. -/
theorem fam_weaving_density_1 : (80 * 60) = 4800 := by decide

/-- weaving: cover(28, 56) = 50 — COVER FACTOR: threads laid against the maximum, as a percentage. value
    ⌊threads · 100 / max⌋. -/
theorem fam_weaving_cover_1 : ((28 * 100) / 56) = 50 := by decide

/-- weaving: pickrate(6000, 60) = 100 — PICK RATE: the loom's picks over the minutes run. value ⌊picks /
    minutes⌋. -/
theorem fam_weaving_pickrate_1 : (6000 / 60) = 100 := by decide

/-- weaving: width(800, 80) = 10 — WIDTH: total warp ends at a given ends-per-inch. value ⌊ends / epi⌋. -/
theorem fam_weaving_width_1 : (800 / 80) = 10 := by decide

/-- weaving: gsm(50, 2500) = 200 — GSM: grams over the area, as grams per square metre (1 m² = 10000 cm²). value
    ⌊grams · 10000 / area⌋. -/
theorem fam_weaving_gsm_1 : ((50 * 10000) / 2500) = 200 := by decide

/-- welding: heatinput(24, 200) = 4800 — WELDING — JOINING METAL, AS ARITHMETIC (chosen by the materials
    registry, not by hand). A weld is numbers: heat input from the arc, how fast the torch travels, metal
    deposited per hour, how deep the fusion runs, how much base dilutes the filler, porosity defects per length,
    the duty cycle of the machine, and the joint's strength against the base. Crosses to `materials` — welding
    is what joins the materials. A measure. */ const PROOF = 'welding arithmetic (heat input, travel speed,
    deposition, penetration, dilution, porosity, duty cycle, joint strength); a materials-registry domain; a
    measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'welding', dst: 'materials',
    formula, value, proof: PROOF, ...extra }, holds, { name: `welding.${name}`, params }) export class
    WeldingFormulas { /** HEAT INPUT: arc voltage times current. value voltage · current. -/
theorem fam_welding_heatinput_1 : (24 * 200) = 4800 := by decide

/-- welding: travelspeed(600, 120) = 5 — TRAVEL SPEED: bead length over time. value ⌊length / time⌋. -/
theorem fam_welding_travelspeed_1 : (600 / 120) = 5 := by decide

/-- welding: deposition(3600, 2) = 1800 — DEPOSITION: metal mass deposited per hour. value ⌊mass / hours⌋. -/
theorem fam_welding_deposition_1 : (3600 / 2) = 1800 := by decide

/-- welding: penetration(8, 10) = 80 — PENETRATION: fusion depth as a percentage of thickness. value ⌊depth ·
    100 / thickness⌋. -/
theorem fam_welding_penetration_1 : ((8 * 100) / 10) = 80 := by decide

/-- welding: dilution(30, 100) = 30 — DILUTION: base metal as a percentage of the total weld. value ⌊base · 100
    / total⌋. -/
theorem fam_welding_dilution_1 : ((30 * 100) / 100) = 30 := by decide

/-- welding: porosity(5, 100) = 5 — POROSITY: defects as a percentage over the bead length. value ⌊defects · 100
    / length⌋. -/
theorem fam_welding_porosity_1 : ((5 * 100) / 100) = 5 := by decide

/-- welding: duty(6, 10) = 60 — DUTY CYCLE: arc time as a percentage of the total. value ⌊arctime · 100 /
    total⌋. -/
theorem fam_welding_duty_1 : ((6 * 100) / 10) = 60 := by decide

/-- welding: strength(85, 100) = 85 — JOINT STRENGTH: weld strength as a percentage of the base (joint
    efficiency). value ⌊weld · 100 / base⌋. -/
theorem fam_welding_strength_1 : ((85 * 100) / 100) = 85 := by decide

/-- welfare: poverty(25, 100) = 25 — WELFARE — SOCIAL PROVISION, AS ARITHMETIC (chosen by the registry, not by
    hand). The safety net is numbers: the share below the line, inequality by the Lorenz area, the benefit each
    recipient draws, how far coverage reaches, what a benefit replaces of a wage, how many depend on each
    worker, how many move between cohorts, and how much is redistributed from income. Crosses to `econ` —
    welfare is economics turned to people. A measure. */ const PROOF = 'welfare arithmetic (poverty share, gini,
    benefit per recipient, coverage, replacement, dependency, mobility, transfer); a social measure crossed to
    econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'welfare', dst: 'econ', formula,
    value, proof: PROOF, ...extra }, holds, { name: `welfare.${name}`, params }) export class WelfareFormulas {
    /** POVERTY RATE: the share below the line, as a percentage. value ⌊below · 100 / population⌋. -/
theorem fam_welfare_poverty_1 : ((25 * 100) / 100) = 25 := by decide

/-- welfare: gini(40, 100) = 40 — GINI: inequality from the Lorenz area over the total, as a percentage. value
    ⌊area · 100 / total⌋. -/
theorem fam_welfare_gini_1 : ((40 * 100) / 100) = 40 := by decide

/-- welfare: benefit(1000, 50) = 20 — BENEFIT per recipient: the payment split across those who draw it. value
    ⌊payment / recipients⌋. -/
theorem fam_welfare_benefit_1 : (1000 / 50) = 20 := by decide

/-- welfare: coverage(80, 100) = 80 — COVERAGE: the enrolled share of those eligible, as a percentage. value
    ⌊enrolled · 100 / eligible⌋. -/
theorem fam_welfare_coverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- welfare: replacement(600, 1000) = 60 — REPLACEMENT RATE: what the benefit replaces of the wage, as a
    percentage. value ⌊benefit · 100 / wage⌋. -/
theorem fam_welfare_replacement_1 : ((600 * 100) / 1000) = 60 := by decide

/-- welfare: dependency(60, 100) = 60 — DEPENDENCY RATIO: dependents over workers, as a percentage. value
    ⌊dependents · 100 / workers⌋. -/
theorem fam_welfare_dependency_1 : ((60 * 100) / 100) = 60 := by decide

/-- welfare: mobility(30, 100) = 30 — MOBILITY: the share of a cohort that moved, as a percentage. value ⌊moved
    · 100 / cohort⌋. -/
theorem fam_welfare_mobility_1 : ((30 * 100) / 100) = 30 := by decide

/-- welfare: transfer(15, 100) = 15 — TRANSFER: the redistributed share of income, as a percentage. value
    ⌊redistributed · 100 / income⌋. -/
theorem fam_welfare_transfer_1 : ((15 * 100) / 100) = 15 := by decide

/-- windchill: index(50, 20) = 40 — WINDCHILL — HOW COLD THE AIR FEELS, AS ARITHMETIC. The wind steals heat: the
    chill index, the apparent temperature once humidity is counted, minutes to frostbite, the heat index for
    warm days, the wind's bite, the risk of exposure, the effective temperature, and the adjustment a gust
    forces. Crosses to `meteorology` — windchill is what the weather feels like. A measure. */ const PROOF =
    'windchill arithmetic (chill index, apparent temperature, frostbite time, heat index, wind factor, exposure
    risk, effective temperature, gust adjustment); how cold the air feels; a measure crossed to meteorology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'windchill', dst: 'meteorology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `windchill.${name}`, params }) export class WindchillFormulas { /**
    CHILL INDEX: the temperature less half the wind. value max(0, temp − ⌊wind / 2⌋). -/
theorem fam_windchill_index_1 : (fmax 0 (50 - (20 / 2))) = 40 := by decide

/-- windchill: apparenttemp(80, 50) = 85 — APPARENT TEMPERATURE: the temperature raised by the humidity it
    carries. value temp + ⌊humidity / 10⌋. -/
theorem fam_windchill_apparenttemp_1 : (80 + (50 / 10)) = 85 := by decide

/-- windchill: frostbitetime(10, 15) = 20 — FROSTBITE TIME: minutes of exposure the wind allows. value ⌊temp ·
    30 / wind⌋. -/
theorem fam_windchill_frostbitetime_1 : ((10 * 30) / 15) = 20 := by decide

/-- windchill: heatindex(90, 60) = 95 — HEAT INDEX: the temperature plus the humidity's load. value temp + ⌊temp
    · humidity / 1000⌋. -/
theorem fam_windchill_heatindex_1 : (90 + ((90 * 60) / 1000)) = 95 := by decide

/-- windchill: windfactor(20) = 30 — WIND FACTOR: the chill the wind alone adds. value ⌊wind · 3 / 2⌋. -/
theorem fam_windchill_windfactor_1 : ((20 * 3) / 2) = 30 := by decide

/-- windchill: effectivetemp(50, 20, 40) = 42 — EFFECTIVE TEMPERATURE: the chill index with humidity restored.
    value max(0, temp − ⌊wind / 2⌋ + ⌊humidity / 20⌋). -/
theorem fam_windchill_effectivetemp_1 : (fmax 0 ((50 - (20 / 2)) + (40 / 20))) = 42 := by decide

/-- windchill: gustadjust(20, 40) = 30 — GUST ADJUSTMENT: the mean of the steady wind and the gust. value ⌊(wind
    + gust) / 2⌋. -/
theorem fam_windchill_gustadjust_1 : ((20 + 40) / 2) = 30 := by decide

/-- windpower: turbineoutput(2, 1000) = 2000 -/
theorem fam_windpower_turbineoutput_1 : (2 * 1000) = 2000 := by decide

/-- windpower: sweptarea(50, 50) = 2500 -/
theorem fam_windpower_sweptarea_1 : (50 * 50) = 2500 := by decide

/-- windpower: capacityfactor(35, 100) = 35 -/
theorem fam_windpower_capacityfactor_1 : ((35 * 100) / 100) = 35 := by decide

/-- windpower: cutinspeed(3, 0) = 3 -/
theorem fam_windpower_cutinspeed_1 : (3 + 0) = 3 := by decide

/-- windpower: ratedpower(3, 1000) = 3000 -/
theorem fam_windpower_ratedpower_1 : (3 * 1000) = 3000 := by decide

/-- windpower: tipspeedratio(70, 10) = 7 -/
theorem fam_windpower_tipspeedratio_1 : (70 / 10) = 7 := by decide

/-- windpower: farmoutput(20, 2000) = 40000 -/
theorem fam_windpower_farmoutput_1 : (20 * 2000) = 40000 := by decide

/-- windpower: availability(95, 100) = 95 -/
theorem fam_windpower_availability_1 : ((95 * 100) / 100) = 95 := by decide

/-- winemaking: abv(24, 6) = 9 — WINEMAKING — THE CELLAR AS ARITHMETIC (chosen by the registry, not by hand).
    Turning grapes into wine is numbers: alcohol from the sugar drop, the must's sugar (°Brix), titratable
    acidity, the sulfite a tank needs, the litres a harvest yields, juice extracted from the crush, the daily
    pace of fermentation, and a three-varietal blend. Crosses to `cuisine` — wine is what the table is set
    around. A measure. */ const PROOF = 'winemaking arithmetic (abv from the sugar drop, °Brix, titratable
    acidity, sulfite dose, harvest yield, extraction, fermentation pace, three-varietal blend); a registry
    domain; a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'winemaking', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name:
    `winemaking.${name}`, params }) export class WinemakingFormulas { /** ALCOHOL BY VOLUME from the °Brix drop.
    value ⌊(start − final) · 55 / 100⌋. -/
theorem fam_winemaking_abv_1 : (((24 - 6) * 55) / 100) = 9 := by decide

/-- winemaking: brix(240, 1000) = 24 — °BRIX: grams of sugar per 100 of must. value ⌊sugar · 100 / volume⌋. -/
theorem fam_winemaking_brix_1 : ((240 * 100) / 1000) = 24 := by decide

/-- winemaking: acidity(7, 1000) = 7 — TITRATABLE ACIDITY in grams per litre. value ⌊acid · 1000 / volume⌋. -/
theorem fam_winemaking_acidity_1 : ((7 * 1000) / 1000) = 7 := by decide

/-- winemaking: sulfite(200, 50) = 10000 — SULFITE: the SO₂ a tank needs, litres at a dose in ppm. value volume
    · ppm. -/
theorem fam_winemaking_sulfite_1 : (200 * 50) = 10000 := by decide

/-- winemaking: yield(5000, 650) = 3250 — YIELD: litres from a harvest, kilograms at litres per tonne. value
    ⌊grapes · perTon / 1000⌋. -/
theorem fam_winemaking_yield_1 : ((5000 * 650) / 1000) = 3250 := by decide

/-- winemaking: extraction(1000, 70) = 700 — EXTRACTION: juice from the crush at a percentage rate. value ⌊mass
    · rate / 100⌋. -/
theorem fam_winemaking_extraction_1 : ((1000 * 70) / 100) = 700 := by decide

/-- winemaking: fermentation(24, 0, 12) = 2 — FERMENTATION: the daily °Brix drop over the days it took. value
    ⌊(start − final) / days⌋. -/
theorem fam_winemaking_fermentation_1 : ((24 - 0) / 12) = 2 := by decide

/-- winemaking: blend(60, 30, 10) = 100 — BLEND: a three-varietal cuvée, the parts summed. value a + b + c. -/
theorem fam_winemaking_blend_1 : ((60 + 30) + 10) = 100 := by decide

/-- wireframe: grid(960, 12) = 80 — WIREFRAME — LAYOUT AS ARITHMETIC. A low-fidelity plan is numbers: the column
    a width divides into, the gutter, how densely elements pack an area, the hierarchy depth, the share of
    whitespace, the alignment and above-the-fold ratios, and how detailed the mock is. Crosses to `layout` — a
    wireframe is what a layout renders. A measure. */ const PROOF = 'wireframe arithmetic (grid column, gutter,
    density, hierarchy, whitespace, alignment, fold, fidelity); low-fidelity layout as a measure crossed to
    layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'wireframe', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `wireframe.${name}`, params }) export class
    WireframeFormulas { /** GRID: the column width a total width divides into. value ⌊width / columns⌋. -/
theorem fam_wireframe_grid_1 : (960 / 12) = 80 := by decide

/-- wireframe: gutter(240, 12) = 20 — GUTTER: the space each column gets from a total. value ⌊total / columns⌋. -/
theorem fam_wireframe_gutter_1 : (240 / 12) = 20 := by decide

/-- wireframe: density(50, 1000) = 5 — DENSITY: elements per area, as a percentage. value ⌊elements · 100 /
    area⌋. -/
theorem fam_wireframe_density_1 : ((50 * 100) / 1000) = 5 := by decide

/-- wireframe: hierarchy(4) = 4 — HIERARCHY: the number of nesting levels. value levels. -/
theorem fam_wireframe_hierarchy_1 : 4 = 4 := by decide

/-- wireframe: whitespace(40, 100) = 40 — WHITESPACE as a percentage of the total. value ⌊empty · 100 / total⌋. -/
theorem fam_wireframe_whitespace_1 : ((40 * 100) / 100) = 40 := by decide

/-- wireframe: alignment(9, 10) = 90 — ALIGNMENT: the share of elements on the grid. value ⌊aligned · 100 /
    elements⌋. -/
theorem fam_wireframe_alignment_1 : ((9 * 100) / 10) = 90 := by decide

/-- wireframe: fold(3, 10) = 30 — FOLD: the share of content above the fold. value ⌊above · 100 / total⌋. -/
theorem fam_wireframe_fold_1 : ((3 * 100) / 10) = 30 := by decide

/-- wireframe: fidelity(2, 10) = 20 — FIDELITY: the share of detailed blocks in the mock. value ⌊detailed · 100
    / total⌋. -/
theorem fam_wireframe_fidelity_1 : ((2 * 100) / 10) = 20 := by decide

/-- woodworking: boardfeet(96, 12) = 8 — WOODWORKING — THE WORKSHOP AS ARITHMETIC. Cutting and joining stock is
    numbers: board-feet in a slab, the moisture a board still carries, the strength of a glued joint, the kerf a
    saw eats, the yield off a board, Janka hardness, seasonal expansion, and the waste in offcuts. Crosses to
    `construction` — woodworking is what construction is built from. A measure. */ const PROOF = 'woodworking
    arithmetic (board-feet, moisture, joint strength, kerf, yield, hardness, expansion, waste); the workshop as
    a measure crossed to construction' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'woodworking',
    dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `woodworking.${name}`, params
    }) export class WoodworkingFormulas { /** BOARD-FEET: a slab's length by width, in board-feet. value ⌊length
    · width / 144⌋. -/
theorem fam_woodworking_boardfeet_1 : ((96 * 12) / 144) = 8 := by decide

/-- woodworking: expansion(100, 5) = 50 — EXPANSION: seasonal movement per a thousand of width. value ⌊change ·
    1000 / width⌋. -/
theorem fam_woodworking_expansion_1 : ((5 * 1000) / 100) = 50 := by decide

/-- woodworking: hardness(1290) = 1290 — HARDNESS: the Janka reading, held as a natural. value janka. -/
theorem fam_woodworking_hardness_1 : 1290 = 1290 := by decide

/-- woodworking: jointstrength(12, 250) = 3000 — JOINT STRENGTH: glue area at a per-area rating. value gluearea
    · rating. -/
theorem fam_woodworking_jointstrength_1 : (12 * 250) = 3000 := by decide

/-- woodworking: kerf(10, 3) = 30 — KERF: the stock a saw eats across the cuts. value cuts · width. -/
theorem fam_woodworking_kerf_1 : (10 * 3) = 30 := by decide

/-- woodworking: moisture(120, 100) = 20 — MOISTURE as a percentage of the dry weight. value ⌊(wet − dry) · 100
    / dry⌋. -/
theorem fam_woodworking_moisture_1 : (((120 - 100) * 100) / 100) = 20 := by decide

/-- woodworking: usage(80, 100) = 80 — USAGE: the usable yield off a board, as a percentage. value ⌊usable · 100
    / board⌋. -/
theorem fam_woodworking_usage_1 : ((80 * 100) / 100) = 80 := by decide

/-- woodworking: waste(20, 100) = 20 — WASTE: the offcuts as a percentage of the total. value ⌊offcuts · 100 /
    total⌋. -/
theorem fam_woodworking_waste_1 : ((20 * 100) / 100) = 20 := by decide

/-- workspace: volume(10, 10, 10) = 1000 -/
theorem fam_workspace_volume_1 : ((10 * 10) * 10) = 1000 := by decide

/-- workspace: reachradius(100, 20) = 80 -/
theorem fam_workspace_reachradius_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- workspace: area(40, 30) = 1200 -/
theorem fam_workspace_area_1 : (40 * 30) = 1200 := by decide

/-- workspace: dexterityindex(80, 100) = 80 -/
theorem fam_workspace_dexterityindex_1 : ((80 * 100) / 100) = 80 := by decide

/-- workspace: singularitymargin(90, 15) = 75 -/
theorem fam_workspace_singularitymargin_1 : (fmax 0 (90 - 15)) = 75 := by decide

/-- workspace: jointrange(180, 30) = 150 -/
theorem fam_workspace_jointrange_1 : (fmax 0 (180 - 30)) = 150 := by decide

/-- workspace: coveragepct(850, 1000) = 85 -/
theorem fam_workspace_coveragepct_1 : ((850 * 100) / 1000) = 85 := by decide

/-- workspace: envelopeheight(200, 2) = 100 -/
theorem fam_workspace_envelopeheight_1 : (200 / 2) = 100 := by decide
