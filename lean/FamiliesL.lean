-- lean/FamiliesL.lean — GENERATED. THE FAMILIES, L — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- landslide: slopeangle(450, 10) = 45 -/
theorem fam_landslide_slopeangle_1 : (450 / 10) = 45 := by decide

/-- landslide: factorofsafety(120, 100) = 120 -/
theorem fam_landslide_factorofsafety_1 : ((120 * 100) / 100) = 120 := by decide

/-- landslide: runoutdistance(30, 20) = 600 -/
theorem fam_landslide_runoutdistance_1 : (30 * 20) = 600 := by decide

/-- landslide: volume(50, 40, 10) = 20000 -/
theorem fam_landslide_volume_1 : ((50 * 40) * 10) = 20000 := by decide

/-- landslide: velocity(600, 60) = 10 -/
theorem fam_landslide_velocity_1 : (600 / 60) = 10 := by decide

/-- landslide: rainfallthreshold(200, 120) = 80 -/
theorem fam_landslide_rainfallthreshold_1 : (fmax 0 (200 - 120)) = 80 := by decide

/-- landslide: susceptibility(70, 100) = 70 -/
theorem fam_landslide_susceptibility_1 : ((70 * 100) / 100) = 70 := by decide

/-- landslide: debrisfraction(60, 100) = 60 -/
theorem fam_landslide_debrisfraction_1 : ((60 * 100) / 100) = 60 := by decide

/-- landuse: buildableratio(650, 1000) = 65 — LANDUSE — PLANNING A PARCEL AS ARITHMETIC. How land is allotted is
    numbers: the residential share of a site, how much is paved over, the mix of zones, the land left to
    develop, the parcels a tract divides into, the area a setback takes, the buildable fraction of a lot, and
    the open space kept back. Crosses to `geography` — land use is geography made a plan. A measure. */ const
    PROOF = 'landuse arithmetic (residential share, impervious cover, zoning mix, developable land, parcel
    count, setback area, buildable ratio, open-space ratio); a parcel planned as numbers; a measure crossed to
    geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'landuse', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `landuse.${name}`, params }) export class
    LanduseFormulas { /** BUILDABLE RATIO: the buildable area of a lot as a percentage. value ⌊buildable · 100 /
    lot⌋. -/
theorem fam_landuse_buildableratio_1 : ((650 * 100) / 1000) = 65 := by decide

/-- landuse: developable(1000, 300) = 700 — DEVELOPABLE LAND: the total less what is protected. value max(0,
    total − protected). -/
theorem fam_landuse_developable_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- landuse: developable(100, 300) = 0 — DEVELOPABLE LAND: the total less what is protected. value max(0, total
    − protected). -/
theorem fam_landuse_developable_2 : (fmax 0 (100 - 300)) = 0 := by decide

/-- landuse: impervious(350, 1000) = 35 — IMPERVIOUS COVER: paved area as a percentage of the site. value ⌊paved
    · 100 / total⌋. -/
theorem fam_landuse_impervious_1 : ((350 * 100) / 1000) = 35 := by decide

/-- landuse: openspaceratio(250, 1000) = 25 — OPEN-SPACE RATIO: open land as a percentage of the site. value
    ⌊open · 100 / total⌋. -/
theorem fam_landuse_openspaceratio_1 : ((250 * 100) / 1000) = 25 := by decide

/-- landuse: parcelcount(10000, 500) = 20 — PARCEL COUNT: the parcels a tract divides into at a parcel size.
    value ⌊area / parcelsize⌋. -/
theorem fam_landuse_parcelcount_1 : (10000 / 500) = 20 := by decide

/-- landuse: residentialshare(600, 1000) = 60 — RESIDENTIAL SHARE: residential land as a percentage of the site.
    value ⌊residential · 100 / total⌋. -/
theorem fam_landuse_residentialshare_1 : ((600 * 100) / 1000) = 60 := by decide

/-- landuse: setbackarea(50, 20) = 1000 — SETBACK AREA: a frontage held back by a setback depth. value frontage
    · setback. -/
theorem fam_landuse_setbackarea_1 : (50 * 20) = 1000 := by decide

/-- landuse: zoningmix(1200, 4) = 300 — ZONING MIX: the parcels per zone across a plan. value ⌊parcels / zones⌋. -/
theorem fam_landuse_zoningmix_1 : (1200 / 4) = 300 := by decide

/-- lasers: gain(1000, 10) = 100 — LASERS — COHERENT LIGHT, AS ARITHMETIC. A laser is numbers: the amplifier
    gain, the average power from the pulse train, the energy carried by one pulse, how often it fires, how fast
    the beam spreads, how far it stays coherent, the energy dumped on an area, and the colour it emits. Crosses
    to `optics` — a laser is what optics shapes. A measure. */ const PROOF = 'lasers arithmetic (gain, average
    power, pulse energy, repetition rate, beam divergence, coherence length, fluence, wavelength); coherent
    light as a measure crossed to optics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'lasers', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `lasers.${name}`,
    params }) export class LasersFormulas { /** GAIN: the amplifier ratio of output power to input power. value
    ⌊pout / pin⌋. -/
theorem fam_lasers_gain_1 : (1000 / 10) = 100 := by decide

/-- lasers: power(5, 1000) = 5000 — AVERAGE POWER: pulse energy times how often it fires. value energy · rate. -/
theorem fam_lasers_power_1 : (5 * 1000) = 5000 := by decide

/-- lasers: pulseenergy(5000, 1000) = 5 — PULSE ENERGY: average power shared across the pulses per second. value
    ⌊power / rate⌋. -/
theorem fam_lasers_pulseenergy_1 : (5000 / 1000) = 5 := by decide

/-- lasers: repetitionrate(6000, 60) = 100 — REPETITION RATE: pulses over seconds. value ⌊pulses / seconds⌋. -/
theorem fam_lasers_repetitionrate_1 : (6000 / 60) = 100 := by decide

/-- lasers: beamdivergence(5, 1000) = 5 — BEAM DIVERGENCE: the spread per distance, in milliradians. value
    ⌊spread · 1000 / distance⌋. -/
theorem fam_lasers_beamdivergence_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- lasers: coherencelength(300000, 1000) = 300 — COHERENCE LENGTH: how far the wave stays in step, speed over
    bandwidth. value ⌊speed / bandwidth⌋. -/
theorem fam_lasers_coherencelength_1 : (300000 / 1000) = 300 := by decide

/-- lasers: fluence(1000, 5) = 200 — FLUENCE: pulse energy spread over the spot area. value ⌊energy / area⌋. -/
theorem fam_lasers_fluence_1 : (1000 / 5) = 200 := by decide

/-- lasers: wavelength(60000, 100) = 600 — WAVELENGTH: the colour emitted, speed over frequency. value ⌊speed /
    frequency⌋. -/
theorem fam_lasers_wavelength_1 : (60000 / 100) = 600 := by decide

/-- lastmile: stopspermile(40, 10) = 4 -/
theorem fam_lastmile_stopspermile_1 : (40 / 10) = 4 := by decide

/-- lastmile: deliverydensity(200, 50) = 4 -/
theorem fam_lastmile_deliverydensity_1 : (200 / 50) = 4 := by decide

/-- lastmile: costperstop(1000, 40) = 25 -/
theorem fam_lastmile_costperstop_1 : (1000 / 40) = 25 := by decide

/-- lastmile: successrate(95, 100) = 95 -/
theorem fam_lastmile_successrate_1 : ((95 * 100) / 100) = 95 := by decide

/-- lastmile: routetime(40, 6) = 240 -/
theorem fam_lastmile_routetime_1 : (40 * 6) = 240 := by decide

/-- lastmile: failedratio(5, 100) = 5 -/
theorem fam_lastmile_failedratio_1 : ((5 * 100) / 100) = 5 := by decide

/-- lastmile: packagespervehicle(600, 10) = 60 -/
theorem fam_lastmile_packagespervehicle_1 : (600 / 10) = 60 := by decide

/-- lastmile: detourfactor(120, 100) = 120 -/
theorem fam_lastmile_detourfactor_1 : ((120 * 100) / 100) = 120 := by decide

/-- latency: oneway(15, 8, 2) = 25 — LATENCY — WHERE THE TIME GOES, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Moving a packet is numbers: the signal's time on the wire, the bits clocked out, the
    wait in a queue, the work at each node, the one-way sum, the whole round trip, the serialization of a frame,
    and the end-to-end total across hops. Crosses to `networking` — latency is what the network costs in time. A
    measure. */ const PROOF = 'latency arithmetic (propagation, transmission, queuing, processing,
    serialization, one-way, round-trip, end-to-end total); a measure crossed to networking' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'latency', dst: 'networking', formula, value, proof: PROOF,
    ...extra }, holds, { name: `latency.${name}`, params }) export class LatencyFormulas { /** ONE-WAY: the
    delays on a single trip summed. value prop + trans + queue. -/
theorem fam_latency_oneway_1 : ((15 + 8) + 2) = 25 := by decide

/-- latency: processing(100, 2) = 200 — PROCESSING: the work a node spends per packet. value ops · perOp. -/
theorem fam_latency_processing_1 : (100 * 2) = 200 := by decide

/-- latency: propagation(3000, 200) = 15 — PROPAGATION: distance over signal speed. value ⌊distance / speed⌋. -/
theorem fam_latency_propagation_1 : (3000 / 200) = 15 := by decide

/-- latency: queuing(10, 5) = 50 — QUEUING: packets waiting at a service time each. value packets · service. -/
theorem fam_latency_queuing_1 : (10 * 5) = 50 := by decide

/-- latency: roundtrip(25) = 50 — ROUND-TRIP: twice the one-way time. value 2 · oneway. -/
theorem fam_latency_roundtrip_1 : (2 * 25) = 50 := by decide

/-- latency: serialization(1500, 1000) = 12 — SERIALIZATION: a frame's bytes clocked out as bits over the rate.
    value ⌊bytes · 8 / rate⌋. -/
theorem fam_latency_serialization_1 : ((1500 * 8) / 1000) = 12 := by decide

/-- latency: total(20, 3) = 60 — TOTAL: the one-way time across every hop. value oneway · hops. -/
theorem fam_latency_total_1 : (20 * 3) = 60 := by decide

/-- latency: transmission(8000, 1000) = 8 — TRANSMISSION: bits clocked out over the link rate. value ⌊bits /
    rate⌋. -/
theorem fam_latency_transmission_1 : (8000 / 1000) = 8 := by decide

/-- lattice: points(10, 10, 10) = 1000 -/
theorem fam_lattice_points_1 : ((10 * 10) * 10) = 1000 := by decide

/-- lattice: unitcells(100, 8) = 800 -/
theorem fam_lattice_unitcells_1 : (100 * 8) = 800 := by decide

/-- lattice: coordinationnumber(6, 6) = 12 -/
theorem fam_lattice_coordinationnumber_1 : (6 + 6) = 12 := by decide

/-- lattice: packingfraction(74, 100) = 74 -/
theorem fam_lattice_packingfraction_1 : ((74 * 100) / 100) = 74 := by decide

/-- lattice: latticevectors(3, 0) = 3 -/
theorem fam_lattice_latticevectors_1 : (3 + 0) = 3 := by decide

/-- lattice: millerindices(3) = 8 -/
theorem fam_lattice_millerindices_1 : (2 ^ 3) = 8 := by decide

/-- layout: span(6, 12) = 50 — LAYOUT — CSS FLEXBOX/GRID, LEARNED FROM TAILWIND, AS ARITHMETIC. A page's shape
    is numbers: the width a column span takes of a 12-column grid, the columns themselves, an aspect ratio, a
    flex basis, how growth divides free space, the gap between cells, the order of an item, and the width a
    track gets in a container. Crosses to `css`. A measure. */ const PROOF = 'layout arithmetic (span width,
    columns, aspect ratio, flex basis, grow share, gap, order, track width) learned from Tailwind\'s 12-column
    grid and flexbox; a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'layout', dst: 'css', formula, value, proof: PROOF, ...extra }, holds, { name: `layout.${name}`, params
    }) export class LayoutFormulas { /** SPAN: the width a column span takes, as a percentage of the grid. value
    ⌊cols · 100 / of⌋. -/
theorem fam_layout_span_1 : ((6 * 100) / 12) = 50 := by decide

/-- layout: columns(12) = 12 — COLUMNS: a grid of n columns. value n. -/
theorem fam_layout_columns_1 : 12 = 12 := by decide

/-- layout: aspect(16, 9) = 177 — ASPECT RATIO: width over height, as a percentage. value ⌊width · 100 /
    height⌋. -/
theorem fam_layout_aspect_1 : ((16 * 100) / 9) = 177 := by decide

/-- layout: basis(50) = 50 — FLEX BASIS: a percentage basis. value pct. -/
theorem fam_layout_basis_1 : 50 = 50 := by decide

/-- layout: grow(1, 4) = 25 — GROW: the share of free space a flex item takes. value ⌊flex · 100 / total⌋. -/
theorem fam_layout_grow_1 : ((1 * 100) / 4) = 25 := by decide

/-- layout: gap(4, 8) = 24 — GAP: the total gap across cols cells at a per-gap size. value max(0, cols − 1) ·
    gap. -/
theorem fam_layout_gap_1 : ((fmax 0 (4 - 1)) * 8) = 24 := by decide

/-- layout: track(1200, 12) = 100 — TRACK: the width a column gets in a container. value ⌊container / cols⌋. -/
theorem fam_layout_track_1 : (1200 / 12) = 100 := by decide

/-- lean: valueadd(30, 120) = 25 — LEAN — MANUFACTURING FLOW AS ARITHMETIC (the shop floor measured, not
    narrated). Lean production is numbers: the share of time that adds value, the waste left over, flow rate,
    what a pull signal must replenish, the kanban cards a cell needs, changeover time, overall equipment
    effectiveness, and the lead time a part sees. Crosses to `manufacturing` — lean is the discipline
    manufacturing runs by. A measure. */ const PROOF = 'lean arithmetic (value-add share, waste, flow rate, pull
    replenishment, kanban cards, changeover, OEE, lead time); the shop floor as integers; a measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'lean', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `lean.${name}`, params }) export class LeanFormulas
    { /** VALUE-ADD SHARE as a percentage of total cycle time. value ⌊valueTime · 100 / totalTime⌋. -/
theorem fam_lean_valueadd_1 : ((30 * 100) / 120) = 25 := by decide

/-- lean: waste(120, 30) = 90 — WASTE: the non-value time left in a cycle. value max(0, total − value). -/
theorem fam_lean_waste_1 : (fmax 0 (120 - 30)) = 90 := by decide

/-- lean: flow(1000, 20) = 50 — FLOW RATE: units cleared per day. value ⌊units / days⌋. -/
theorem fam_lean_flow_1 : (1000 / 20) = 50 := by decide

/-- lean: pull(100, 40) = 60 — PULL: the units a pull signal must replenish against on-hand stock. value max(0,
    demand − onhand). -/
theorem fam_lean_pull_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- lean: changeover(8, 15) = 120 — CHANGEOVER: total setup time across the setups in a shift. value setups ·
    minutes. -/
theorem fam_lean_changeover_1 : (8 * 15) = 120 := by decide

/-- lean: oee(90, 95, 99) = 84 — OEE: availability · performance · quality, each a percentage. value ⌊avail ·
    perf · qual / 10000⌋. -/
theorem fam_lean_oee_1 : (((90 * 95) * 99) / 10000) = 84 := by decide

/-- lean: leadtime(10, 30, 5) = 45 — LEAD TIME: queue, process and move time summed. value queue + process +
    move. -/
theorem fam_lean_leadtime_1 : ((10 + 30) + 5) = 45 := by decide

/-- learning: epochs(60000, 32) = 1875 — LEARNING — MACHINE-LEARNING TRAINING, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Training a model is numbers: the epochs a dataset yields at a batch size,
    accuracy and loss as percentages, the train/test split, the parameter count, the F1 of precision and recall,
    the overfit gap, and training throughput. Crosses to `ml` — learning is what the model layer consumes. A
    measure. */ const PROOF = 'learning arithmetic (epochs, accuracy, loss, split, params, f1, overfit,
    throughput); a machine-learning training domain from the public-API registry; a measure crossed to ml' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'learning', dst: 'ml', formula, value, proof:
    PROOF, ...extra }, holds, { name: `learning.${name}`, params }) export class LearningFormulas { /** EPOCHS:
    the batches a dataset yields at a batch size. value ⌊samples / batch⌋. -/
theorem fam_learning_epochs_1 : (60000 / 32) = 1875 := by decide

/-- learning: accuracy(950, 1000) = 95 — ACCURACY as a percentage. value ⌊correct · 100 / total⌋. -/
theorem fam_learning_accuracy_1 : ((950 * 100) / 1000) = 95 := by decide

/-- learning: loss(50, 1000) = 5 — LOSS as a percentage. value ⌊errors · 100 / total⌋. -/
theorem fam_learning_loss_1 : ((50 * 100) / 1000) = 5 := by decide

/-- learning: split(1000, 80) = 800 — SPLIT: a percentage of the data. value ⌊data · pct / 100⌋. -/
theorem fam_learning_split_1 : ((1000 * 80) / 100) = 800 := by decide

/-- learning: params(10, 100) = 1000 — PARAMS: layers at a per-layer count. value layers · perLayer. -/
theorem fam_learning_params_1 : (10 * 100) = 1000 := by decide

/-- learning: f1(80, 60) = 68 — F1: the harmonic mean of precision and recall. value [p + r > 0] ⌊2 · p · r / (p
    + r)⌋. -/
theorem fam_learning_f1_1 : (((2 * 80) * 60) / (80 + 60)) = 68 := by decide

/-- learning: f1(0, 0) = 0 — F1: the harmonic mean of precision and recall. value [p + r > 0] ⌊2 · p · r / (p +
    r)⌋. -/
theorem fam_learning_f1_2 : (((2 * 0) * 0) / (0 + 0)) = 0 := by decide

/-- learning: overfit(98, 90) = 8 — OVERFIT: the train-over-val gap, never negative. value max(0, train − val). -/
theorem fam_learning_overfit_1 : (fmax 0 (98 - 90)) = 8 := by decide

/-- learning: overfit(90, 98) = 0 — OVERFIT: the train-over-val gap, never negative. value max(0, train − val). -/
theorem fam_learning_overfit_2 : (fmax 0 (90 - 98)) = 0 := by decide

/-- learning: throughput(6000, 60) = 100 — THROUGHPUT: samples over seconds. value ⌊samples / seconds⌋. -/
theorem fam_learning_throughput_1 : (6000 / 60) = 100 := by decide

/-- leavening: riseratio(200, 100) = 200 -/
theorem fam_leavening_riseratio_1 : ((200 * 100) / 100) = 200 := by decide

/-- leavening: co2volume(5, 40) = 200 -/
theorem fam_leavening_co2volume_1 : (5 * 40) = 200 := by decide

/-- leavening: fermentationrate(600, 30) = 20 -/
theorem fam_leavening_fermentationrate_1 : (600 / 30) = 20 := by decide

/-- leavening: yeastactivity(90, 100) = 90 -/
theorem fam_leavening_yeastactivity_1 : ((90 * 100) / 100) = 90 := by decide

/-- leavening: doublingtime(120, 2) = 60 -/
theorem fam_leavening_doublingtime_1 : (120 / 2) = 60 := by decide

/-- leavening: gasretention(80, 100) = 80 -/
theorem fam_leavening_gasretention_1 : ((80 * 100) / 100) = 80 := by decide

/-- leavening: acidityph(50, 10) = 5 -/
theorem fam_leavening_acidityph_1 : (50 / 10) = 5 := by decide

/-- leavening: ovenspring(120, 100) = 20 -/
theorem fam_leavening_ovenspring_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- lemmatization: lemmacount(1000, 5) = 200 — LEMMATIZATION — REDUCING WORD FORMS TO THEIR LEMMA, AS
    ARITHMETIC. Normalizing text is numbers: how many lemmas a form set holds, inflections per lemma, forms per
    lemma, tagging accuracy, how often a form is ambiguous, how much the token stream shrinks, part-of-speech
    agreement, and vocabulary coverage. Crosses to `linguistics` — lemmatization is a linguistic operation. A
    measure. */ const PROOF = 'lemmatization arithmetic (lemma count, inflection ratio, forms per lemma,
    accuracy, ambiguity rate, reduction ratio, pos match, coverage); a measure crossed to linguistics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'lemmatization', dst: 'linguistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `lemmatization.${name}`, params }) export class LemmatizationFormulas { /** LEMMA
    COUNT: distinct lemmas from a form set at a fixed forms-per-lemma. value ⌊forms / perLemma⌋. -/
theorem fam_lemmatization_lemmacount_1 : (1000 / 5) = 200 := by decide

/-- lemmatization: inflectionratio(300, 100) = 300 — INFLECTION RATIO: inflected forms per lemma, scaled by 100.
    value ⌊forms · 100 / lemmas⌋. -/
theorem fam_lemmatization_inflectionratio_1 : ((300 * 100) / 100) = 300 := by decide

/-- lemmatization: formsperlemma(500, 100) = 5 — FORMS PER LEMMA: surface forms over the lemmas they reduce to.
    value ⌊forms / lemmas⌋. -/
theorem fam_lemmatization_formsperlemma_1 : (500 / 100) = 5 := by decide

/-- lemmatization: accuracy(950, 1000) = 95 — ACCURACY: correctly lemmatized tokens as a percentage. value
    ⌊correct · 100 / total⌋. -/
theorem fam_lemmatization_accuracy_1 : ((950 * 100) / 1000) = 95 := by decide

/-- lemmatization: ambiguityrate(50, 1000) = 5 — AMBIGUITY RATE: ambiguous forms as a percentage of all forms.
    value ⌊ambiguous · 100 / total⌋. -/
theorem fam_lemmatization_ambiguityrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- lemmatization: reductionratio(1000, 200) = 80 — REDUCTION RATIO: how much the token stream shrinks to
    lemmas, as a percentage. value ⌊(tokens − lemmas) · 100 / tokens⌋. -/
theorem fam_lemmatization_reductionratio_1 : (((fmax 0 (1000 - 200)) * 100) / 1000) = 80 := by decide

/-- lemmatization: posmatch(900, 1000) = 90 — POS MATCH: part-of-speech tags agreeing with the gold set, as a
    percentage. value ⌊matched · 100 / total⌋. -/
theorem fam_lemmatization_posmatch_1 : ((900 * 100) / 1000) = 90 := by decide

/-- lemmatization: coverage(8000, 10000) = 80 — COVERAGE: vocabulary entries the lexicon resolves, as a
    percentage. value ⌊found · 100 / vocab⌋. -/
theorem fam_lemmatization_coverage_1 : ((8000 * 100) / 10000) = 80 := by decide

/-- lenses: magnification(100, 25) = 4 — FOCAL LENGTH from an object and image distance (thin lens). value ⌊obj
    · img / (obj + img)⌋. */ static focallength(obj: number, img: number): CrossFormula { const s = obj + img;
    return c('lenses-focallength', 'focallength(obj, img) = ⌊obj · img / (obj + img)⌋', s > 0 ? Math.floor((obj
    * img) / s) : 0, nat(obj, img) && s > 0, 'focallength', [obj, img]) } /** IMAGE DISTANCE from object
    distance and focal length (thin lens). value ⌊obj · f / (obj − f)⌋. */ static imagedistance(obj: number, f:
    number): CrossFormula { const d = Math.max(0, obj - f); return c('lenses-imagedistance', 'imagedistance(obj,
    f) = ⌊obj · f / (obj − f)⌋', d > 0 ? Math.floor((obj * f) / d) : 0, nat(obj, f) && d > 0, 'imagedistance',
    [obj, f]) } /** MAGNIFICATION: image distance over object distance. value ⌊img / obj⌋. -/
theorem fam_lenses_magnification_1 : (100 / 25) = 4 := by decide

/-- lenses: fnumber(50, 25) = 2 — F-NUMBER: focal length over aperture diameter. value ⌊f / D⌋. -/
theorem fam_lenses_fnumber_1 : (50 / 25) = 2 := by decide

/-- lenses: power(50) = 20 — OPTICAL POWER in diopters: a thousand over the focal length (mm). value ⌊1000 / f⌋. -/
theorem fam_lenses_power_1 : (1000 / 50) = 20 := by decide

/-- lenses: fieldofview(1000, 36, 50) = 720 — LENSES — GEOMETRIC OPTICS AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A lens is numbers: the focal length an object and image fix, magnification, the
    f-number, optical power, the image distance the thin-lens law gives, field of view, numerical aperture, and
    hyperfocal depth of field. Crosses to `optics` — a lens is what optics describes. A measure. */ const PROOF
    = 'lenses arithmetic (focal length, magnification, f-number, optical power, image distance, field of view,
    numerical aperture, depth of field); the thin-lens law as integers; a measure crossed to optics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'lenses', dst: 'optics', formula, value, proof: PROOF, ...extra },
    holds, { name: `lenses.${name}`, params }) export class LensesFormulas { /** DEPTH OF FIELD (hyperfocal
    distance): focal length squared over f-number times circle of confusion. value ⌊f² / (N · coc)⌋. */ static
    depthoffield(f: number, N: number, coc: number): CrossFormula { const d = N * coc; return
    c('lenses-depthoffield', 'depthoffield(f, N, coc) = ⌊f² / (N · coc)⌋', d > 0 ? Math.floor((f * f) / d) : 0,
    nat(f, N, coc) && N > 0 && coc > 0, 'depthoffield', [f, N, coc]) } /** FIELD OF VIEW: the width a sensor
    sees at a distance through a lens. value ⌊distance · sensor / f⌋. -/
theorem fam_lenses_fieldofview_1 : ((1000 * 36) / 50) = 720 := by decide

/-- lenses: numericalaperture(50, 50) = 500 — NUMERICAL APERTURE (scaled ×1000): half the aperture over focal
    length. value ⌊500 · D / f⌋. -/
theorem fam_lenses_numericalaperture_1 : ((500 * 50) / 50) = 500 := by decide

/-- leverage: debttoequity(60, 40) = 150 — LEVERAGE — HOW A BALANCE SHEET IS FINANCED, AS ARITHMETIC (chosen by
    the public-API registry, not by hand). Borrowing is numbers: debt against equity, debt against assets, the
    equity multiplier, how many times earnings cover interest, the capital held against assets, operating
    leverage, the margin kept, and the gearing of debt against the whole capital base. Crosses to `banking` —
    leverage is what a lender underwrites. A measure. */ const PROOF = 'leverage arithmetic (debt-to-equity,
    debt ratio, equity multiplier, interest coverage, capital ratio, operating leverage, margin, gearing); a
    public-API domain; a measure crossed to banking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'leverage', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `leverage.${name}`, params }) export class LeverageFormulas { /** DEBT-TO-EQUITY as a percentage. value
    ⌊debt · 100 / equity⌋. -/
theorem fam_leverage_debttoequity_1 : ((60 * 100) / 40) = 150 := by decide

/-- leverage: debtratio(40, 100) = 40 — DEBT RATIO: debt against assets, as a percentage. value ⌊debt · 100 /
    assets⌋. -/
theorem fam_leverage_debtratio_1 : ((40 * 100) / 100) = 40 := by decide

/-- leverage: equitymultiplier(200, 50) = 400 — EQUITY MULTIPLIER: assets financed per unit of equity, as a
    percentage. value ⌊assets · 100 / equity⌋. -/
theorem fam_leverage_equitymultiplier_1 : ((200 * 100) / 50) = 400 := by decide

/-- leverage: interestcoverage(5000, 1000) = 5 — INTEREST COVERAGE: times earnings cover the interest due. value
    ⌊ebit / interest⌋. -/
theorem fam_leverage_interestcoverage_1 : (5000 / 1000) = 5 := by decide

/-- leverage: capitalratio(12, 150) = 8 — CAPITAL RATIO: capital held against assets, as a percentage. value
    ⌊capital · 100 / assets⌋. -/
theorem fam_leverage_capitalratio_1 : ((12 * 100) / 150) = 8 := by decide

/-- leverage: degreeofleverage(300, 120) = 250 — DEGREE OF OPERATING LEVERAGE: contribution margin over
    operating income, as a percentage. value ⌊contribution · 100 / ebit⌋. -/
theorem fam_leverage_degreeofleverage_1 : ((300 * 100) / 120) = 250 := by decide

/-- leverage: marginratio(25, 200) = 12 — MARGIN RATIO: margin kept out of revenue, as a percentage. value
    ⌊margin · 100 / revenue⌋. -/
theorem fam_leverage_marginratio_1 : ((25 * 100) / 200) = 12 := by decide

/-- leverage: gearingratio(60, 40) = 60 — GEARING RATIO: debt against the whole capital base, as a percentage.
    value ⌊debt · 100 / (debt + capital)⌋. -/
theorem fam_leverage_gearingratio_1 : ((60 * 100) / (60 + 40)) = 60 := by decide

/-- leverage: gearingratio(0, 0) = 0 — GEARING RATIO: debt against the whole capital base, as a percentage.
    value ⌊debt · 100 / (debt + capital)⌋. -/
theorem fam_leverage_gearingratio_2 : ((0 * 100) / (0 + 0)) = 0 := by decide

/-- lexicography: headwords(500, 40) = 20000 — LEXICOGRAPHY — THE MAKING OF DICTIONARIES, AS ARITHMETIC. A
    dictionary is numbers: how many headwords it holds, how many senses those headwords carry, how much of the
    language it covers, the polysemy per entry, the length of a definition, the cross-references between
    entries, the frequency band a word falls in, and inflected forms per lemma. Crosses to `linguistics` —
    lexicography is the measured record of what linguistics describes. A measure. */ const PROOF = 'lexicography
    arithmetic (headwords, senses, coverage, polysemy, definition length, cross-references, frequency rank,
    lemma ratio); the dictionary as a measure crossed to linguistics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'lexicography', dst: 'linguistics', formula, value, proof: PROOF, ...extra },
    holds, { name: `lexicography.${name}`, params }) export class LexicographyFormulas { /** HEADWORDS: entries
    across the pages at a count per page. value pages · perPage. -/
theorem fam_lexicography_headwords_1 : (500 * 40) = 20000 := by decide

/-- lexicography: senses(1000, 3) = 3000 — SENSES: the senses the headwords carry at an average each. value
    headwords · avgSenses. -/
theorem fam_lexicography_senses_1 : (1000 * 3) = 3000 := by decide

/-- lexicography: coverage(950, 1000) = 95 — COVERAGE: the share of the lexicon defined, as a percentage. value
    ⌊defined · 100 / total⌋. -/
theorem fam_lexicography_coverage_1 : ((950 * 100) / 1000) = 95 := by decide

/-- lexicography: coverage(0, 0) = 0 — COVERAGE: the share of the lexicon defined, as a percentage. value
    ⌊defined · 100 / total⌋. -/
theorem fam_lexicography_coverage_2 : ((0 * 100) / 0) = 0 := by decide

/-- lexicography: polysemy(3000, 1000) = 3 — POLYSEMY: senses per headword. value ⌊senses / headwords⌋. -/
theorem fam_lexicography_polysemy_1 : (3000 / 1000) = 3 := by decide

/-- lexicography: definitionlength(10000, 500) = 20 — DEFINITION LENGTH: average words per definition. value
    ⌊words / entries⌋. -/
theorem fam_lexicography_definitionlength_1 : (10000 / 500) = 20 := by decide

/-- lexicography: crossref(1000, 4) = 4000 — CROSS-REFERENCES: the links between entries at a count each. value
    entries · refsEach. -/
theorem fam_lexicography_crossref_1 : (1000 * 4) = 4000 := by decide

/-- lexicography: frequencyrank(5000, 1000) = 5 — FREQUENCY RANK: the band a word of a given rank falls in.
    value ⌊rank / band⌋. -/
theorem fam_lexicography_frequencyrank_1 : (5000 / 1000) = 5 := by decide

/-- lexicography: lemmaratio(6000, 1500) = 4 — LEMMA RATIO: inflected forms per lemma. value ⌊forms / lemmas⌋. -/
theorem fam_lexicography_lemmaratio_1 : (6000 / 1500) = 4 := by decide

/-- lexicon: typetokenratio(400, 1000) = 40 — LEXICON — A VOCABULARY, AS ARITHMETIC. Words are numbers: the
    type-token ratio of a text, the size of a vocabulary, the words that appear exactly once, how dense the
    content words are, a word's rank by frequency, the frequency Zipf's law predicts for a rank, how much of a
    corpus a word list covers, and how fast new types arrive. Crosses to `linguistics` — a lexicon is what
    linguistics measures. A measure. */ const PROOF = 'lexicon arithmetic (type-token ratio, vocabulary size,
    hapax legomena, lexical density, frequency rank, Zipf-scaled frequency, coverage, growth rate); words
    counted as numbers; a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'lexicon', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `lexicon.${name}`, params }) export class LexiconFormulas { /** TYPE-TOKEN RATIO as a percentage: distinct
    words over total words. value ⌊types · 100 / tokens⌋. -/
theorem fam_lexicon_typetokenratio_1 : ((400 * 100) / 1000) = 40 := by decide

/-- lexicon: vocabularysize(5000, 1200) = 6200 — VOCABULARY SIZE: known words plus newly learned words. value
    known + learned. -/
theorem fam_lexicon_vocabularysize_1 : (5000 + 1200) = 6200 := by decide

/-- lexicon: hapaxlegomena(400, 150) = 250 — HAPAX LEGOMENA: words appearing exactly once — types minus the
    repeated ones. value max(0, types − repeated). -/
theorem fam_lexicon_hapaxlegomena_1 : (fmax 0 (400 - 150)) = 250 := by decide

/-- lexicon: lexicaldensity(240, 600) = 40 — LEXICAL DENSITY as a percentage: content words over all words.
    value ⌊content · 100 / total⌋. -/
theorem fam_lexicon_lexicaldensity_1 : ((240 * 100) / 600) = 40 := by decide

/-- lexicon: frequencyrank(100, 5) = 500 — FREQUENCY RANK: Zipf's product of a word's frequency and its rank.
    value occurrences · rank. -/
theorem fam_lexicon_frequencyrank_1 : (100 * 5) = 500 := by decide

/-- lexicon: zipfscaled(1000, 4) = 250 — ZIPF-SCALED FREQUENCY: the frequency Zipf's law predicts at a rank from
    a constant. value ⌊constant / rank⌋. -/
theorem fam_lexicon_zipfscaled_1 : (1000 / 4) = 250 := by decide

/-- lexicon: coverage(950, 1000) = 95 — COVERAGE as a percentage: corpus tokens a word list covers. value
    ⌊covered · 100 / corpus⌋. -/
theorem fam_lexicon_coverage_1 : ((950 * 100) / 1000) = 95 := by decide

/-- lexicon: growthrate(50, 1000) = 50 — GROWTH RATE: new types per thousand tokens read. value ⌊newtypes · 1000
    / tokens⌋. -/
theorem fam_lexicon_growthrate_1 : ((50 * 1000) / 1000) = 50 := by decide

/-- licensing: utilization(45, 50) = 90 — UTILIZATION of a seat pool, as a percentage. value ⌊active · 100 /
    total⌋. -/
theorem fam_licensing_utilization_1 : ((45 * 100) / 50) = 90 := by decide

/-- licensing: renewal(12, 100) = 1200 — RENEWAL cost over a term of months at a monthly rate. value months ·
    rate. -/
theorem fam_licensing_renewal_1 : (12 * 100) = 1200 := by decide

/-- licensing: truecost(20, 50) = 1000 — TRUE COST: seats at a price each. value seats · price. -/
theorem fam_licensing_truecost_1 : (20 * 50) = 1000 := by decide

/-- licensing: overage(120, 100) = 20 — OVERAGE: the seats used over the licensed count. value max(0, used −
    licensed). -/
theorem fam_licensing_overage_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- licensing: term(2024, 3) = 2027 — TERM: the period a term ends, from a start and a length. value start +
    length. -/
theorem fam_licensing_term_1 : (2024 + 3) = 2027 := by decide

/-- licensing: entitlement(1000, 250) = 750 — ENTITLEMENT left: the grant less what is consumed. value max(0,
    total − consumed). -/
theorem fam_licensing_entitlement_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- lidar: range(300, 1000) = 150000 — LIDAR — LIGHT DETECTION AND RANGING, AS ARITHMETIC. A pulse of light goes
    out and comes back: the range is the round-trip time at the speed of light, halved. The point cloud is
    numbers — density over area, accuracy in ppm, how many pulses returned, how far the beam penetrated to the
    ground, the swath a scan sweeps, the ground sample spacing, the noise. Crosses to `geophysics` — lidar is
    how the Earth's surface is measured from above. A measure. */ const PROOF = 'lidar arithmetic (range by
    time-of-flight, point density, accuracy ppm, returns, ground penetration, swath, resolution, noise); light
    detection and ranging as a point cloud; a measure crossed to geophysics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'lidar', dst: 'geophysics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `lidar.${name}`, params }) export class LidarFormulas { /** RANGE: time-of-flight, round trip halved.
    value ⌊speed · time / 2⌋. -/
theorem fam_lidar_range_1 : ((300 * 1000) / 2) = 150000 := by decide

/-- lidar: pointdensity(10000, 50) = 200 — POINT DENSITY: points over area. value ⌊points / area⌋. -/
theorem fam_lidar_pointdensity_1 : (10000 / 50) = 200 := by decide

/-- lidar: accuracy(5, 1000) = 50 — ACCURACY in parts per million. value ⌊error · 10000 / range⌋. -/
theorem fam_lidar_accuracy_1 : ((5 * 10000) / 1000) = 50 := by decide

/-- lidar: returns(950, 1000) = 95 — RETURNS as a percentage of pulses. value ⌊detected · 100 / pulses⌋. -/
theorem fam_lidar_returns_1 : ((950 * 100) / 1000) = 95 := by decide

/-- lidar: penetration(300, 1000) = 30 — GROUND PENETRATION as a percentage of total returns. value ⌊ground ·
    100 / total⌋. -/
theorem fam_lidar_penetration_1 : ((300 * 100) / 1000) = 30 := by decide

/-- lidar: swath(500, 60) = 30000 — SWATH: altitude at a scan angle. value altitude · angle. -/
theorem fam_lidar_swath_1 : (500 * 60) = 30000 := by decide

/-- lidar: resolution(25) = 25 — RESOLUTION: the ground sample spacing itself. value spacing. -/
theorem fam_lidar_resolution_1 : 25 = 25 := by decide

/-- lidar: noise(20, 1000) = 2 — NOISE: outliers as a percentage of points. value ⌊outliers · 100 / points⌋. -/
theorem fam_lidar_noise_1 : ((20 * 100) / 1000) = 2 := by decide

/-- lift: force(50, 20) = 1000 — LIFT — HOW A WING HOLDS THE AIR UP, AS ARITHMETIC (the forces a finite wing
    trades for altitude). Flying is numbers: the lift force a wing makes, its lift coefficient, its aspect
    ratio, the effective angle of attack, the lift-to-drag ratio, the bound circulation, the margin before
    stall, and the wing loading. Crosses to `aerodynamics` — lift is the one force aerodynamics is spent to
    earn. A measure. */ const PROOF = 'lift arithmetic (lift force, lift coefficient, aspect ratio, effective
    angle of attack, lift/drag, circulation, stall margin, wing loading); a measure crossed to aerodynamics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'lift', dst: 'aerodynamics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `lift.${name}`, params }) export class LiftFormulas { /** LIFT
    FORCE: dynamic pressure over the wing area. value pressure · area. -/
theorem fam_lift_force_1 : (50 * 20) = 1000 := by decide

/-- lift: coefficient(600, 1000) = 60 — LIFT COEFFICIENT (×100): the lift a wing makes per unit of
    dynamic-pressure-area. value ⌊lift · 100 / qs⌋. -/
theorem fam_lift_coefficient_1 : ((600 * 100) / 1000) = 60 := by decide

/-- lift: aspectratio(30, 90) = 10 — ASPECT RATIO: span squared over the planform area. value ⌊span · span /
    area⌋. -/
theorem fam_lift_aspectratio_1 : ((30 * 30) / 90) = 10 := by decide

/-- lift: angleofattack(12, 4) = 8 — EFFECTIVE ANGLE OF ATTACK: the geometric angle less the induced angle.
    value max(0, geometric − induced). -/
theorem fam_lift_angleofattack_1 : (fmax 0 (12 - 4)) = 8 := by decide

/-- lift: liftdragratio(1800, 100) = 18 — LIFT-TO-DRAG RATIO: the glide number. value ⌊lift / drag⌋. -/
theorem fam_lift_liftdragratio_1 : (1800 / 100) = 18 := by decide

/-- lift: circulation(5000, 100) = 50 — BOUND CIRCULATION: lift over the density-speed product
    (Kutta–Joukowski). value ⌊lift / rhov⌋. -/
theorem fam_lift_circulation_1 : (5000 / 100) = 50 := by decide

/-- lift: stallmargin(15, 12) = 3 — STALL MARGIN: the angle left before the stall angle. value max(0, stall −
    current). -/
theorem fam_lift_stallmargin_1 : (fmax 0 (15 - 12)) = 3 := by decide

/-- lift: stallmargin(10, 15) = 0 — STALL MARGIN: the angle left before the stall angle. value max(0, stall −
    current). -/
theorem fam_lift_stallmargin_2 : (fmax 0 (10 - 15)) = 0 := by decide

/-- lift: loading(24000, 30) = 800 — WING LOADING: weight carried per unit of wing area. value ⌊weight / area⌋. -/
theorem fam_lift_loading_1 : (24000 / 30) = 800 := by decide

/-- limnology: oxygen(8, 10) = 80 — LIMNOLOGY — INLAND WATERS AS ARITHMETIC (lakes, ponds, reservoirs). The
    state of a body of water is numbers: dissolved oxygen against saturation, Secchi clarity, trophic load,
    residence time, thermal stratification, primary productivity, acidity, and turbidity. Crosses to `hydrology`
    — limnology is the still water hydrology moves. A measure. */ const PROOF = 'limnology arithmetic (dissolved
    oxygen, Secchi clarity, trophic load, residence time, stratification, productivity, pH, turbidity); a
    measure crossed to hydrology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'limnology', dst:
    'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `limnology.${name}`, params }) export
    class LimnologyFormulas { /** DISSOLVED OXYGEN as a percentage of saturation. value ⌊dissolved · 100 /
    saturation⌋. -/
theorem fam_limnology_oxygen_1 : ((8 * 100) / 10) = 80 := by decide

/-- limnology: clarity(4) = 4 — CLARITY: the Secchi depth. value depth. -/
theorem fam_limnology_clarity_1 : 4 = 4 := by decide

/-- limnology: trophic(1000, 50) = 20 — TROPHIC load: nutrients per unit volume. value ⌊nutrients / volume⌋. -/
theorem fam_limnology_trophic_1 : (1000 / 50) = 20 := by decide

/-- limnology: residence(10000, 100) = 100 — RESIDENCE time: volume over outflow. value ⌊volume / outflow⌋. -/
theorem fam_limnology_residence_1 : (10000 / 100) = 100 := by decide

/-- limnology: stratification(22, 7) = 15 — STRATIFICATION: surface minus bottom, floored at zero. value max(0,
    surface − bottom). -/
theorem fam_limnology_stratification_1 : (fmax 0 (22 - 7)) = 15 := by decide

/-- limnology: stratification(7, 22) = 0 — STRATIFICATION: surface minus bottom, floored at zero. value max(0,
    surface − bottom). -/
theorem fam_limnology_stratification_2 : (fmax 0 (7 - 22)) = 0 := by decide

/-- limnology: productivity(6000, 60) = 100 — PRODUCTIVITY: fixed carbon per unit area. value ⌊carbon / area⌋. -/
theorem fam_limnology_productivity_1 : (6000 / 60) = 100 := by decide

/-- limnology: ph(50, 100) = 50 — PH as an acid-to-base ratio, scaled. value ⌊acid · 100 / base⌋. -/
theorem fam_limnology_ph_1 : ((50 * 100) / 100) = 50 := by decide

/-- limnology: turbidity(3, 10) = 30 — TURBIDITY: scattered light as a fraction of incident. value ⌊scattered ·
    100 / incident⌋. -/
theorem fam_limnology_turbidity_1 : ((3 * 100) / 10) = 30 := by decide

/-- linearalgebra: dot2(3, 4, 5) = 32 — LINEARALGEBRA — THE SMALL-DIMENSION LINEAR OPERATIONS, AS ARITHMETIC.
    Vectors and 2x2 matrices are numbers: the dot of two 2-vectors, the determinant and trace of a 2x2, how many
    entries a matrix holds, the rank of a diagonal, an L1 norm, the 2D cross magnitude, and a scalar times a
    vector. Crosses to `algebra` — linear algebra is algebra over a space. A measure, every output an exact
    finite nonnegative integer. */ const PROOF = 'linear-algebra arithmetic (dot, 2x2 determinant & trace,
    matrix elements, diagonal rank, L1 norm, 2D cross, scalar multiply); small-dimension hex-addressable
    entries; a measure crossed to algebra' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'linearalgebra', dst: 'algebra', formula, value, proof: PROOF, ...extra }, holds, { name:
    `linearalgebra.${name}`, params }) export class LinearalgebraFormulas { /** DOT of two 2-vectors (a, b) and
    (b, c). value a·b + b·c. -/
theorem fam_linearalgebra_dot2_1 : ((3 * 4) + (4 * 5)) = 32 := by decide

/-- linearalgebra: trace2(7, 9) = 16 — TRACE of a 2x2 with diagonal (a, b). value a + b. -/
theorem fam_linearalgebra_trace2_1 : (7 + 9) = 16 := by decide

/-- linearalgebra: matrixelements(3, 4) = 12 — MATRIX ELEMENTS: the entries of an r×c matrix. value r · c. -/
theorem fam_linearalgebra_matrixelements_1 : (3 * 4) = 12 := by decide

/-- linearalgebra: cross(5, 2, 4) = 12 — CROSS: the 2D cross magnitude of (a, b) and (c, c). value max(0, a·c −
    b·c). -/
theorem fam_linearalgebra_cross_1 : (fmax 0 ((5 * 4) - (2 * 4))) = 12 := by decide

/-- linearalgebra: scalarmul(3, 4, 5) = 27 — SCALAR MULTIPLY: k · (a, b), returned as the L1 norm of the scaled
    vector. value k·a + k·b. -/
theorem fam_linearalgebra_scalarmul_1 : ((3 * 4) + (3 * 5)) = 27 := by decide

/-- linearalgebra: nullity(4, 1) = 3 — NULLITY: the kernel dimension, cols − rank. value max(0, cols − rank). -/
theorem fam_linearalgebra_nullity_1 : (fmax 0 (4 - 1)) = 3 := by decide

/-- linearalgebra: projection(3, 4, 5) = 15 — PROJECTION of (a, b) onto the first axis (c, 0): the scalar a·c.
    value a·c. -/
theorem fam_linearalgebra_projection_1 : (3 * 5) = 15 := by decide

/-- linearalgebra: span(3, 5) = 3 — SPAN dimension: min of the ambient dimension and the independent-vector
    count. value min(dim, indep). -/
theorem fam_linearalgebra_span_1 : (fmin 3 5) = 3 := by decide

/-- linehaul: transittime(1200, 60) = 20 -/
theorem fam_linehaul_transittime_1 : (1200 / 60) = 20 := by decide

/-- linehaul: costpermile(1000, 2) = 2000 -/
theorem fam_linehaul_costpermile_1 : (1000 * 2) = 2000 := by decide

/-- linehaul: avgspeed(1200, 20) = 60 -/
theorem fam_linehaul_avgspeed_1 : (1200 / 20) = 60 := by decide

/-- linehaul: fuelburn(1200, 6) = 200 -/
theorem fam_linehaul_fuelburn_1 : (1200 / 6) = 200 := by decide

/-- linehaul: payloadmiles(20000, 1200) = 24000000 -/
theorem fam_linehaul_payloadmiles_1 : (20000 * 1200) = 24000000 := by decide

/-- linehaul: driverhours(600, 60) = 10 -/
theorem fam_linehaul_driverhours_1 : (600 / 60) = 10 := by decide

/-- linehaul: teamutilization(20, 24) = 83 -/
theorem fam_linehaul_teamutilization_1 : ((20 * 100) / 24) = 83 := by decide

/-- linehaul: laneprofit(3000, 2000) = 1000 -/
theorem fam_linehaul_laneprofit_1 : (fmax 0 (3000 - 2000)) = 1000 := by decide

/-- linguistics: syllables(100, 2) = 200 — LINGUISTICS — LANGUAGE ANALYSIS, AS ARITHMETIC (chosen by the
    registry, not by hand). Reading a corpus is numbers: the syllables a text carries, how varied its vocabulary
    is, how long its sentences run, how many words two languages share, its phoneme inventory, how often a word
    occurs per million, the morphemes per word, and the edit distance between two strings. Crosses to `ml` —
    language analysis is what a model learns from. A measure. */ const PROOF = 'linguistics arithmetic
    (syllables, lexical diversity, readability, cognates, phonemes, word frequency, morphemes, edit distance); a
    language-analysis domain; a measure crossed to ml' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'linguistics', dst: 'ml', formula, value, proof: PROOF, ...extra }, holds, { name:
    `linguistics.${name}`, params }) export class LinguisticsFormulas { /** SYLLABLES: words at an average
    syllable count each. value words · avg. -/
theorem fam_linguistics_syllables_1 : (100 * 2) = 200 := by decide

/-- linguistics: lexical(400, 1000) = 40 — LEXICAL DIVERSITY: type-token ratio as a percentage. value ⌊unique ·
    100 / total⌋. -/
theorem fam_linguistics_lexical_1 : ((400 * 100) / 1000) = 40 := by decide

/-- linguistics: readability(500, 25) = 20 — READABILITY: average sentence length in words. value ⌊words /
    sentences⌋. -/
theorem fam_linguistics_readability_1 : (500 / 25) = 20 := by decide

/-- linguistics: cognates(300, 1000) = 30 — COGNATES: shared vocabulary between two languages as a percentage.
    value ⌊shared · 100 / total⌋. -/
theorem fam_linguistics_cognates_1 : ((300 * 100) / 1000) = 30 := by decide

/-- linguistics: phonemes(44) = 44 — PHONEMES: the phoneme inventory. value count. -/
theorem fam_linguistics_phonemes_1 : 44 = 44 := by decide

/-- linguistics: frequency(50, 1000000) = 50 — WORD FREQUENCY: occurrences per million of a corpus. value
    ⌊occurrences · 1000000 / corpus⌋. -/
theorem fam_linguistics_frequency_1 : ((50 * 1000000) / 1000000) = 50 := by decide

/-- linguistics: morphemes(200, 3) = 600 — MORPHEMES: words at a morpheme count each. value words · perWord. -/
theorem fam_linguistics_morphemes_1 : (200 * 3) = 600 := by decide

/-- linguistics: distance(5, 20) = 25 — EDIT DISTANCE: edits over a string length as a percentage. value ⌊edits
    · 100 / length⌋. -/
theorem fam_linguistics_distance_1 : ((5 * 100) / 20) = 25 := by decide

/-- linkage: degreesoffreedom(6, 2) = 4 -/
theorem fam_linkage_degreesoffreedom_1 : (fmax 0 (6 - 2)) = 4 := by decide

/-- linkage: linkcount(4, 1) = 5 -/
theorem fam_linkage_linkcount_1 : (4 + 1) = 5 := by decide

/-- linkage: jointcount(5, 1) = 4 -/
theorem fam_linkage_jointcount_1 : (fmax 0 (5 - 1)) = 4 := by decide

/-- linkage: reach(30, 4) = 120 -/
theorem fam_linkage_reach_1 : (30 * 4) = 120 := by decide

/-- linkage: transmissionangle(90, 30) = 60 -/
theorem fam_linkage_transmissionangle_1 : (fmax 0 (90 - 30)) = 60 := by decide

/-- linkage: mechanicaladvantage(100, 25) = 4 -/
theorem fam_linkage_mechanicaladvantage_1 : (100 / 25) = 4 := by decide

/-- linkage: couplercurve(12, 3) = 36 -/
theorem fam_linkage_couplercurve_1 : (12 * 3) = 36 := by decide

/-- liquidity: currentratio(300, 150) = 200 — LIQUIDITY — SOLVENCY AND SURVIVAL, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A balance sheet is numbers: the current ratio, the quick ratio, interest
    coverage, the cash ratio, working capital, the regulator's LCR, net stable funding, and how long the cash
    lasts. Crosses to `banking` — liquidity is what banking underwrites. A measure. */ const PROOF = 'liquidity
    arithmetic (current ratio, quick ratio, coverage, cash ratio, working capital, LCR, net stable funding, burn
    rate); a measure crossed to banking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'liquidity', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `liquidity.${name}`, params }) export class LiquidityFormulas { /** CURRENT RATIO as a percentage: current
    assets over current liabilities. value ⌊assets · 100 / liabilities⌋. -/
theorem fam_liquidity_currentratio_1 : ((300 * 100) / 150) = 200 := by decide

/-- liquidity: quickratio(250, 100) = 250 — QUICK RATIO as a percentage: liquid assets over current liabilities.
    value ⌊liquid · 100 / liabilities⌋. -/
theorem fam_liquidity_quickratio_1 : ((250 * 100) / 100) = 250 := by decide

/-- liquidity: coverageratio(800, 100) = 8 — INTEREST COVERAGE: operating income over the interest due. value
    ⌊income / interest⌋. -/
theorem fam_liquidity_coverageratio_1 : (800 / 100) = 8 := by decide

/-- liquidity: cashratio(50, 200) = 25 — CASH RATIO as a percentage: cash on hand over current liabilities.
    value ⌊cash · 100 / liabilities⌋. -/
theorem fam_liquidity_cashratio_1 : ((50 * 100) / 200) = 25 := by decide

/-- liquidity: workingcapital(500, 300) = 200 — WORKING CAPITAL: current assets less current liabilities,
    floored at zero. value max(0, assets − liabilities). -/
theorem fam_liquidity_workingcapital_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- liquidity: lcr(1200, 1000) = 120 — LIQUIDITY COVERAGE RATIO as a percentage: high-quality liquid assets over
    net outflows. value ⌊hqla · 100 / outflows⌋. -/
theorem fam_liquidity_lcr_1 : ((1200 * 100) / 1000) = 120 := by decide

/-- liquidity: netstablefunding(1100, 1000) = 110 — NET STABLE FUNDING RATIO as a percentage: available stable
    funding over required. value ⌊available · 100 / required⌋. -/
theorem fam_liquidity_netstablefunding_1 : ((1100 * 100) / 1000) = 110 := by decide

/-- liquidity: burnrate(1200, 12) = 100 — BURN RATE: cash on hand spread over the months it lasts. value ⌊cash /
    months⌋. -/
theorem fam_liquidity_burnrate_1 : (1200 / 12) = 100 := by decide

/-- liquidity: workingcapital(300, 500) = 0 — WORKING CAPITAL: current assets less current liabilities, floored
    at zero. value max(0, assets − liabilities). -/
theorem fam_liquidity_workingcapital_2 : (fmax 0 (300 - 500)) = 0 := by decide

/-- literacy: wordsperminute(300, 60) = 300 — LITERACY — READING, AS ARITHMETIC (chosen by the registry, not by
    hand). How a reader meets a text is numbers: words a minute, how much is understood, fluency, the grade a
    passage sits at, vocabulary coverage, decoding accuracy, the Lexile gap to close, and the fog a sentence
    carries. Crosses to `pedagogy` — literacy is what teaching builds. A measure. */ const PROOF = 'literacy
    arithmetic (words per minute, comprehension, fluency, reading level, vocabulary, accuracy, lexile delta, fog
    index); a reading measure crossed to pedagogy' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'literacy', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `literacy.${name}`, params }) export class LiteracyFormulas { /** WORDS PER MINUTE: words read over the
    seconds taken. value ⌊words · 60 / seconds⌋. -/
theorem fam_literacy_wordsperminute_1 : ((300 * 60) / 60) = 300 := by decide

/-- literacy: comprehension(8, 10) = 80 — COMPREHENSION as a percentage of questions answered. value ⌊correct ·
    100 / total⌋. -/
theorem fam_literacy_comprehension_1 : ((8 * 100) / 10) = 80 := by decide

/-- literacy: fluency(300, 80) = 240 — FLUENCY: words per minute scaled by comprehension. value ⌊wpm · comp /
    100⌋. -/
theorem fam_literacy_fluency_1 : ((300 * 80) / 100) = 240 := by decide

/-- literacy: readinglevel(120, 8) = 15 — READING LEVEL: average sentence length as a grade proxy. value ⌊words
    / sentences⌋. -/
theorem fam_literacy_readinglevel_1 : (120 / 8) = 15 := by decide

/-- literacy: vocabulary(4500, 5000) = 90 — VOCABULARY coverage as a percentage. value ⌊known · 100 / total⌋. -/
theorem fam_literacy_vocabulary_1 : ((4500 * 100) / 5000) = 90 := by decide

/-- literacy: accuracy(95, 100) = 95 — ACCURACY: words decoded correctly over the words attempted. value
    ⌊correct · 100 / attempts⌋. -/
theorem fam_literacy_accuracy_1 : ((95 * 100) / 100) = 95 := by decide

/-- literacy: lexiledelta(1000, 850) = 150 — LEXILE DELTA: the gap from reader to text, never below zero. value
    max(0, reader − text). -/
theorem fam_literacy_lexiledelta_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- literacy: lexiledelta(800, 850) = 0 — LEXILE DELTA: the gap from reader to text, never below zero. value
    max(0, reader − text). -/
theorem fam_literacy_lexiledelta_2 : (fmax 0 (800 - 850)) = 0 := by decide

/-- literacy: fogindex(100, 5, 10) = 12 — FOG INDEX: Gunning fog over sentence length and complex words. value
    ⌊(⌊words / sentences⌋ + ⌊complex · 100 / words⌋) · 2 / 5⌋. -/
theorem fam_literacy_fogindex_1 : ((((100 / 5) + ((10 * 100) / 100)) * 2) / 5) = 12 := by decide

/-- liturgy: feastdays(40, 12) = 52 -/
theorem fam_liturgy_feastdays_1 : (40 + 12) = 52 := by decide

/-- liturgy: cyclelength(7, 52) = 364 -/
theorem fam_liturgy_cyclelength_1 : (7 * 52) = 364 := by decide

/-- liturgy: seasons(4, 2) = 6 -/
theorem fam_liturgy_seasons_1 : (4 + 2) = 6 := by decide

/-- liturgy: chantmodes(8, 1) = 8 -/
theorem fam_liturgy_chantmodes_1 : (8 * 1) = 8 := by decide

/-- liturgy: vestmentsubsets(5) = 32 -/
theorem fam_liturgy_vestmentsubsets_1 : (2 ^ 5) = 32 := by decide

/-- livestock: feedconversion(600, 100) = 600 — LIVESTOCK — HERD AND PASTURE MANAGEMENT, AS ARITHMETIC. Running
    a herd is numbers: how many animals a pasture carries, the feed to put on weight, the weight gained, how
    many are lost, how many breed and are born, whether forage meets demand, how many are weaned, and the
    product each animal yields. Crosses to `agriculture` — livestock is what the land feeds. A measure. */ const
    PROOF = 'livestock arithmetic (stocking density, feed conversion, weight gain, mortality, fertility, forage
    balance, weaning, output per head); a measure crossed to agriculture' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'livestock', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds,
    { name: `livestock.${name}`, params }) export class LivestockFormulas { /** FEED CONVERSION RATIO (×100):
    feed per unit of gain. value ⌊feed · 100 / gain⌋. -/
theorem fam_livestock_feedconversion_1 : ((600 * 100) / 100) = 600 := by decide

/-- livestock: fertility(90, 100) = 90 — FERTILITY as a percentage: births per breeding female. value ⌊births ·
    100 / females⌋. -/
theorem fam_livestock_fertility_1 : ((90 * 100) / 100) = 90 := by decide

/-- livestock: forage(1200, 1000) = 120 — FORAGE BALANCE as a percentage: available over demand. value
    ⌊available · 100 / demand⌋. -/
theorem fam_livestock_forage_1 : ((1200 * 100) / 1000) = 120 := by decide

/-- livestock: mortality(3, 100) = 3 — MORTALITY as a percentage: lost from the herd. value ⌊died · 100 / herd⌋. -/
theorem fam_livestock_mortality_1 : ((3 * 100) / 100) = 3 := by decide

/-- livestock: output(5000, 100) = 50 — OUTPUT per head: product over the animals producing it. value ⌊product /
    animals⌋. -/
theorem fam_livestock_output_1 : (5000 / 100) = 50 := by decide

/-- livestock: stocking(100, 40) = 2 — STOCKING DENSITY: animals per hectare of pasture. value ⌊animals /
    hectares⌋. -/
theorem fam_livestock_stocking_1 : (100 / 40) = 2 := by decide

/-- livestock: weaning(85, 100) = 85 — WEANING RATE as a percentage: weaned of those born. value ⌊weaned · 100 /
    born⌋. -/
theorem fam_livestock_weaning_1 : ((85 * 100) / 100) = 85 := by decide

/-- livestock: weightgain(450, 120) = 330 — WEIGHT GAIN: final weight less the initial. value max(0, final −
    initial). -/
theorem fam_livestock_weightgain_1 : (fmax 0 (450 - 120)) = 330 := by decide

/-- livestock: weightgain(100, 150) = 0 — WEIGHT GAIN: final weight less the initial. value max(0, final −
    initial). -/
theorem fam_livestock_weightgain_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- loadplanning: utilization(900, 1000) = 90 -/
theorem fam_loadplanning_utilization_1 : ((900 * 100) / 1000) = 90 := by decide

/-- loadplanning: cubicfill(48, 60) = 80 -/
theorem fam_loadplanning_cubicfill_1 : ((48 * 100) / 60) = 80 := by decide

/-- loadplanning: weightlimit(20000, 18000) = 2000 -/
theorem fam_loadplanning_weightlimit_1 : (fmax 0 (20000 - 18000)) = 2000 := by decide

/-- loadplanning: stackheight(240, 40) = 6 -/
theorem fam_loadplanning_stackheight_1 : (240 / 40) = 6 := by decide

/-- loadplanning: palletspertruck(52, 2) = 26 -/
theorem fam_loadplanning_palletspertruck_1 : (52 / 2) = 26 := by decide

/-- loadplanning: axleload(36000, 3) = 12000 -/
theorem fam_loadplanning_axleload_1 : (36000 / 3) = 12000 := by decide

/-- loadplanning: voidspace(60, 48) = 12 -/
theorem fam_loadplanning_voidspace_1 : (fmax 0 (60 - 48)) = 12 := by decide

/-- loadplanning: loadbalance(50, 50) = 100 -/
theorem fam_loadplanning_loadbalance_1 : ((50 * 100) / 50) = 100 := by decide

/-- locale: coverage(750, 1000) = 75 — LOCALE — THE PAYLOAD CMS LOCALIZATION API, AS ARITHMETIC (locales,
    fallback, translated content). Localizing content is numbers: translation coverage, fallback reliance, the
    locales configured, which fields carry translations, words still to translate, right-to-left share,
    completion per locale, and the storage a localized field set costs. Crosses to `payload` — locale is the
    localization layer payload runs. A measure. */ const PROOF = 'locale arithmetic (coverage, fallback,
    locales, fields, words, rtl, complete, storage); the Payload CMS localization API; a measure crossed to
    payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'locale', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `locale.${name}`, params }) export class LocaleFormulas {
    /** COVERAGE: translated documents as a percentage of the total. value ⌊translated · 100 / total⌋. -/
theorem fam_locale_coverage_1 : ((750 * 100) / 1000) = 75 := by decide

/-- locale: fallback(250, 1000) = 25 — FALLBACK: documents served from the fallback locale as a percentage.
    value ⌊missing · 100 / total⌋. -/
theorem fam_locale_fallback_1 : ((250 * 100) / 1000) = 25 := by decide

/-- locale: locales(7) = 7 — LOCALES: the locales configured. value count. -/
theorem fam_locale_locales_1 : 7 = 7 := by decide

/-- locale: fields(12, 40) = 30 — FIELDS: localized fields as a percentage of all fields. value ⌊localized · 100
    / total⌋. -/
theorem fam_locale_fields_1 : ((12 * 100) / 40) = 30 := by decide

/-- locale: words(5000, 1200) = 3800 — WORDS: words still to translate, source over what the target already
    holds. value max(0, source − target). -/
theorem fam_locale_words_1 : (fmax 0 (5000 - 1200)) = 3800 := by decide

/-- locale: words(1200, 5000) = 0 — WORDS: words still to translate, source over what the target already holds.
    value max(0, source − target). -/
theorem fam_locale_words_2 : (fmax 0 (1200 - 5000)) = 0 := by decide

/-- locale: rtl(2, 8) = 25 — RTL: right-to-left locales as a percentage of all locales. value ⌊rtl · 100 /
    total⌋. -/
theorem fam_locale_rtl_1 : ((2 * 100) / 8) = 25 := by decide

/-- locale: complete(6, 8) = 75 — COMPLETE: documents fully translated across every locale, as a percentage.
    value ⌊done · 100 / locales⌋. -/
theorem fam_locale_complete_1 : ((6 * 100) / 8) = 75 := by decide

/-- locale: storage(40, 7) = 280 — STORAGE: localized field values are a field per locale. value fields ·
    locales. -/
theorem fam_locale_storage_1 : (40 * 7) = 280 := by decide

/-- localization: covariance(4, 4) = 16 -/
theorem fam_localization_covariance_1 : (4 * 4) = 16 := by decide

/-- localization: gain(30, 100) = 30 -/
theorem fam_localization_gain_1 : ((30 * 100) / 100) = 30 := by decide

/-- localization: innovation(120, 100) = 20 -/
theorem fam_localization_innovation_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- localization: confidence(90, 100) = 90 -/
theorem fam_localization_confidence_1 : ((90 * 100) / 100) = 90 := by decide

/-- localization: gridresolution(1000, 50) = 20 -/
theorem fam_localization_gridresolution_1 : (1000 / 50) = 20 := by decide

/-- localization: particlecount(100, 5) = 500 -/
theorem fam_localization_particlecount_1 : (100 * 5) = 500 := by decide

/-- localization: updaterate(1000, 20) = 50 -/
theorem fam_localization_updaterate_1 : (1000 / 20) = 50 := by decide

/-- localization: positionvariance(400, 4) = 100 -/
theorem fam_localization_positionvariance_1 : (400 / 4) = 100 := by decide

/-- lodging: occupancy(85, 100) = 85 — LODGING — HOSPITALITY AS ARITHMETIC (chosen by the public-API registry,
    not by hand). A place to stay is numbers: rooms filled, the nightly rate earned, turnovers cleaned, bookings
    cancelled, how far ahead guests book, the rating reviews settle on, amenities used, and the peak season
    against the off. Crosses to `tourism` — lodging is where tourism rests. A measure. */ const PROOF = 'lodging
    arithmetic (occupancy, nightly rate, cleaning, cancellation, lead time, rating, amenity use, seasonality); a
    hospitality domain from the public-API registry; a measure crossed to tourism' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'lodging', dst: 'tourism', formula, value, proof: PROOF, ...extra }, holds, {
    name: `lodging.${name}`, params }) export class LodgingFormulas { /** OCCUPANCY as a percentage of units
    booked. value ⌊booked · 100 / units⌋. -/
theorem fam_lodging_occupancy_1 : ((85 * 100) / 100) = 85 := by decide

/-- lodging: nightlyrate(9000, 60) = 150 — NIGHTLY RATE: revenue over the nights sold. value ⌊revenue / nights⌋. -/
theorem fam_lodging_nightlyrate_1 : (9000 / 60) = 150 := by decide

/-- lodging: cleaning(120, 40) = 3 — CLEANING: rooms cleaned per turnover. value ⌊cleaned / turnovers⌋. -/
theorem fam_lodging_cleaning_1 : (120 / 40) = 3 := by decide

/-- lodging: cancellation(15, 100) = 15 — CANCELLATION as a percentage of bookings. value ⌊cancelled · 100 /
    bookings⌋. -/
theorem fam_lodging_cancellation_1 : ((15 * 100) / 100) = 15 := by decide

/-- lodging: leadtime(10, 45) = 35 — LEAD TIME: nights between booking and stay. value max(0, stay − booked). -/
theorem fam_lodging_leadtime_1 : (fmax 0 (45 - 10)) = 35 := by decide

/-- lodging: leadtime(50, 45) = 0 — LEAD TIME: nights between booking and stay. value max(0, stay − booked). -/
theorem fam_lodging_leadtime_2 : (fmax 0 (45 - 50)) = 0 := by decide

/-- lodging: rating(480, 100) = 4 — RATING: the score averaged over the reviews. value ⌊score / reviews⌋. -/
theorem fam_lodging_rating_1 : (480 / 100) = 4 := by decide

/-- lodging: amenity(18, 24) = 75 — AMENITY: amenities used as a percentage of those offered. value ⌊used · 100
    / offered⌋. -/
theorem fam_lodging_amenity_1 : ((18 * 100) / 24) = 75 := by decide

/-- lodging: seasonality(300, 100) = 300 — SEASONALITY: peak demand against the off-peak, as a percentage. value
    ⌊peak · 100 / offpeak⌋. -/
theorem fam_lodging_seasonality_1 : ((300 * 100) / 100) = 300 := by decide

/-- logging: ingestrate(60000, 60) = 1000 — LOGGING — RUNNING COMPUTE WRITES A RECORD, AS ARITHMETIC (chosen by
    the public-API registry, not by hand). A log stream is numbers: events ingested per second, how long records
    are kept, the fraction sampled, what the bytes cost, the error share of a window, an index's size, how many
    times a file rotates, and the bytes compression saves. Crosses to `observability` — logging is the raw
    record observability reads. A measure. */ const PROOF = 'logging arithmetic (ingest rate, retention,
    sampling, storage cost, error ratio, index size, rotations, compression savings); a stream chosen by the
    public-API registry; a measure crossed to observability' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'logging', dst: 'observability', formula, value, proof: PROOF, ...extra }, holds, { name:
    `logging.${name}`, params }) export class LoggingFormulas { /** INGEST RATE: events over the seconds they
    arrived in. value ⌊events / seconds⌋. -/
theorem fam_logging_ingestrate_1 : (60000 / 60) = 1000 := by decide

/-- logging: retention(500, 30) = 15000 — RETENTION: daily bytes kept for a number of days. value dailyBytes ·
    days. -/
theorem fam_logging_retention_1 : (500 * 30) = 15000 := by decide

/-- logging: samplingrate(10, 100) = 10 — SAMPLING RATE: the percentage of events kept. value ⌊sampled · 100 /
    total⌋. -/
theorem fam_logging_samplingrate_1 : ((10 * 100) / 100) = 10 := by decide

/-- logging: storagecost(1000, 5) = 5000 — STORAGE COST: gigabytes kept at a rate each. value gb · rate. -/
theorem fam_logging_storagecost_1 : (1000 * 5) = 5000 := by decide

/-- logging: errorratio(50, 1000) = 5 — ERROR RATIO: the error percentage of a window. value ⌊errors · 100 /
    total⌋. -/
theorem fam_logging_errorratio_1 : ((50 * 100) / 1000) = 5 := by decide

/-- logging: indexsize(1000, 50) = 50000 — INDEX SIZE: documents at a size each. value docs · bytesPer. -/
theorem fam_logging_indexsize_1 : (1000 * 50) = 50000 := by decide

/-- logging: compressionsavings(1000, 400) = 600 — COMPRESSION SAVINGS: the bytes compression removes. value
    max(0, original − compressed). -/
theorem fam_logging_compressionsavings_1 : (fmax 0 (1000 - 400)) = 600 := by decide

/-- logging: compressionsavings(400, 1000) = 0 — COMPRESSION SAVINGS: the bytes compression removes. value
    max(0, original − compressed). -/
theorem fam_logging_compressionsavings_2 : (fmax 0 (400 - 1000)) = 0 := by decide

/-- logic: truthtable(3) = 8 — LOGIC — PROPOSITIONAL REASONING AS ARITHMETIC. Truth is numbers: the rows of a
    truth table, AND and OR over 0/1 (or counts), material implication and equivalence as indicators, the share
    of satisfying models, the share of true cases, and proof steps per axiom. Crosses to `code` — logic is what
    code is built from. A measure. */ const PROOF = 'logic arithmetic (truth-table rows, conjunction,
    disjunction, implication, equivalence, satisfiable share, entropy share, proof steps per axiom);
    propositional reasoning as integers; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'logic', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `logic.${name}`, params }) export class LogicFormulas { /** TRUTH TABLE: the rows over a number of
    variables. value 2^variables. -/
theorem fam_logic_truthtable_1 : (2 ^ 3) = 8 := by decide

/-- logic: conjunction(1, 0) = 0 — CONJUNCTION: AND over 0/1 or counts. value min(a, b). -/
theorem fam_logic_conjunction_1 : (fmin 1 0) = 0 := by decide

/-- logic: disjunction(1, 0) = 1 — DISJUNCTION: OR over 0/1 or counts. value max(a, b). -/
theorem fam_logic_disjunction_1 : (fmax 1 0) = 1 := by decide

/-- logic: satisfiable(3, 8) = 37 — SATISFIABLE: the share of satisfying models as a percentage. value ⌊models ·
    100 / total⌋. -/
theorem fam_logic_satisfiable_1 : ((3 * 100) / 8) = 37 := by decide

/-- logic: entropy(1, 4) = 25 — ENTROPY: the share of true cases as a percentage. value ⌊cases · 100 / total⌋. -/
theorem fam_logic_entropy_1 : ((1 * 100) / 4) = 25 := by decide

/-- logic: proof(10, 2) = 5 — PROOF: steps per axiom. value ⌊steps / axioms⌋. -/
theorem fam_logic_proof_1 : (10 / 2) = 5 := by decide

/-- logicgates: fanout(4, 8) = 32 — FANOUT: inputs driven = gates each driving loads. value gates · loads. -/
theorem fam_logicgates_fanout_1 : (4 * 8) = 32 := by decide

/-- logicgates: propagation(10, 2) = 20 — PROPAGATION: delay down a chain of gates. value gates · delay. -/
theorem fam_logicgates_propagation_1 : (10 * 2) = 20 := by decide

/-- logistics: capacity(1000, 40) = 25 — CAPACITY: the units a volume holds at a per-unit size. value ⌊volume /
    perUnit⌋. -/
theorem fam_logistics_capacity_1 : (1000 / 40) = 25 := by decide

/-- logistics: utilization(30, 40) = 75 — UTILIZATION as a percentage. value ⌊used · 100 / total⌋. -/
theorem fam_logistics_utilization_1 : ((30 * 100) / 40) = 75 := by decide

/-- logistics: cost(1000, 2) = 2000 — COST: distance at a rate. value distance · rate. -/
theorem fam_logistics_cost_1 : (1000 * 2) = 2000 := by decide

/-- logistics: inventory(500, 120) = 380 — INVENTORY left after demand. value max(0, stock − demand). -/
theorem fam_logistics_inventory_1 : (fmax 0 (500 - 120)) = 380 := by decide

/-- logistics: inventory(100, 150) = 0 — INVENTORY left after demand. value max(0, stock − demand). -/
theorem fam_logistics_inventory_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- logistics: leadtime(10, 17) = 7 — LEAD TIME: from ordered to received. value max(0, received − ordered). -/
theorem fam_logistics_leadtime_1 : (fmax 0 (17 - 10)) = 7 := by decide

/-- logistics: fillrate(90, 100) = 90 — FILL RATE: the share of an order shipped, as a percentage. value
    ⌊shipped · 100 / ordered⌋. -/
theorem fam_logistics_fillrate_1 : ((90 * 100) / 100) = 90 := by decide

/-- logistics: route(12, 50) = 600 — ROUTE: the distance of stops at a per-stop leg. value stops · perStop. -/
theorem fam_logistics_route_1 : (12 * 50) = 600 := by decide

/-- logogram: symbols(2000, 1) = 2000 -/
theorem fam_logogram_symbols_1 : (2000 * 1) = 2000 := by decide

/-- logogram: radicals(214, 0) = 214 -/
theorem fam_logogram_radicals_1 : (214 + 0) = 214 := by decide

/-- logogram: semanticsubsets(6) = 64 -/
theorem fam_logogram_semanticsubsets_1 : (2 ^ 6) = 64 := by decide

/-- logogram: readingsper(3, 2) = 5 -/
theorem fam_logogram_readingsper_1 : (3 + 2) = 5 := by decide

/-- logogram: frequencyrank(2000, 10) = 200 -/
theorem fam_logogram_frequencyrank_1 : (2000 / 10) = 200 := by decide

/-- logogram: literacyratio(95, 100) = 95 -/
theorem fam_logogram_literacyratio_1 : ((95 * 100) / 100) = 95 := by decide

/-- lottery: coverage(250, 1000) = 25 — COVERAGE: the percent of all lines a batch of tickets covers. value
    ⌊tickets · 100 / total⌋. -/
theorem fam_lottery_coverage_1 : ((250 * 100) / 1000) = 25 := by decide

/-- lottery: expectedvalue(50000, 10000) = 5 — EXPECTED VALUE: the jackpot spread over the one-in-N odds. value
    ⌊jackpot / odds⌋. -/
theorem fam_lottery_expectedvalue_1 : (50000 / 10000) = 5 := by decide

/-- lottery: houseedge(1000, 500) = 50 — HOUSE EDGE: the percent of revenue the house keeps after payout. value
    ⌊(revenue − payout) · 100 / revenue⌋. -/
theorem fam_lottery_houseedge_1 : (((1000 - 500) * 100) / 1000) = 50 := by decide

/-- lottery: jackpotshare(60000, 4) = 15000 — JACKPOT SHARE: the jackpot split among the winners. value ⌊jackpot
    / winners⌋. -/
theorem fam_lottery_jackpotshare_1 : (60000 / 4) = 15000 := by decide

/-- lottery: rollover(50000, 15000) = 65000 — ROLLOVER: the jackpot carried into the next draw plus the added
    pool. value jackpot + add. -/
theorem fam_lottery_rollover_1 : (50000 + 15000) = 65000 := by decide

/-- lottery: ticketcost(1000, 2) = 2000 — TICKET COST: tickets at a price each. value tickets · price. -/
theorem fam_lottery_ticketcost_1 : (1000 * 2) = 2000 := by decide

/-- loyalty: points(100, 3) = 300 — LOYALTY — A RETAIL LOYALTY PROGRAM, AS ARITHMETIC. A member's standing is
    numbers: points earned on spend, the tier those points buy, points redeemed back into value, the share of
    members retained, repeat purchases per member, lifetime value, the churn share, and whether a reward
    threshold is met. Crosses to `retail` — loyalty is what a store runs on its buyers. A measure. */ const
    PROOF = 'loyalty arithmetic (points earned, tier, redemption, retention, repeat rate, lifetime value, churn,
    reward threshold); a measure crossed to retail' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'loyalty', dst: 'retail', formula, value, proof: PROOF, ...extra }, holds, { name: `loyalty.${name}`,
    params }) export class LoyaltyFormulas { /** POINTS EARNED: spend at a points-per-unit rate. value spend ·
    rate. -/
theorem fam_loyalty_points_1 : (100 * 3) = 300 := by decide

/-- loyalty: tier(2500, 1000) = 2 — TIER: the whole tiers points buy at a per-tier threshold. value ⌊points /
    perTier⌋. -/
theorem fam_loyalty_tier_1 : (2500 / 1000) = 2 := by decide

/-- loyalty: redemption(1000, 100) = 10 — REDEMPTION: units of value points redeem into at a points-per-unit
    cost. value ⌊points / perUnit⌋. -/
theorem fam_loyalty_redemption_1 : (1000 / 100) = 10 := by decide

/-- loyalty: retention(950, 1000) = 95 — RETENTION as a percentage. value ⌊retained · 100 / total⌋. -/
theorem fam_loyalty_retention_1 : ((950 * 100) / 1000) = 95 := by decide

/-- loyalty: repeat(500, 100) = 5 — REPEAT RATE: purchases over members. value ⌊purchases / members⌋. -/
theorem fam_loyalty_repeat_1 : (500 / 100) = 5 := by decide

/-- loyalty: lifetime(50, 12) = 600 — LIFETIME VALUE: average order over a member's orders. value avgOrder ·
    orders. -/
theorem fam_loyalty_lifetime_1 : (50 * 12) = 600 := by decide

/-- loyalty: churn(50, 1000) = 5 — CHURN as a percentage. value ⌊lost · 100 / total⌋. -/
theorem fam_loyalty_churn_1 : ((50 * 100) / 1000) = 5 := by decide

/-- luminosity: bolometric(100, 200, 300) = 600 — BOLOMETRIC luminosity: the sum of output across bands. value
    band1 + band2 + band3. -/
theorem fam_luminosity_bolometric_1 : ((100 + 200) + 300) = 600 := by decide

/-- luminosity: eddingtonlimit(10) = 320000 — EDDINGTON LIMIT: the luminosity ceiling a mass can sustain. value
    mass · 32000. -/
theorem fam_luminosity_eddingtonlimit_1 : (10 * 32000) = 320000 := by decide

/-- luminosity: fluxratio(1000, 50) = 20 — FLUX RATIO: one flux over another. value ⌊flux1 / flux2⌋. -/
theorem fam_luminosity_fluxratio_1 : (1000 / 50) = 20 := by decide
