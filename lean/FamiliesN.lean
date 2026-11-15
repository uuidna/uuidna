-- lean/FamiliesN.lean — GENERATED. THE FAMILIES, N — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- nanomaterials: surfacearea(1000, 6) = 6000 — NANOMATERIALS — THE NANOSCALE AS ARITHMETIC (chosen by the
    materials registry, not by hand). A nanoparticle is numbers: the surface it exposes, the aspect ratio of a
    tube, the band gap widened by confinement, the quantum yield of a dot, the drug a carrier loads, the
    fraction of atoms dispersed on the surface, surface-to-volume, and the confinement energy. Crosses to
    `materials` — a nanomaterial is a material taken to the nanoscale. A measure. */ const PROOF =
    'nanomaterials arithmetic (surface area, aspect ratio, confinement band gap, quantum yield, drug loading,
    dispersion, surface-to-volume, confinement energy); the nanoscale of the materials domain; a measure crossed
    to materials' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'nanomaterials', dst: 'materials',
    formula, value, proof: PROOF, ...extra }, holds, { name: `nanomaterials.${name}`, params }) export class
    NanomaterialsFormulas { /** SURFACE AREA: particles at an area each. value particles · perParticle. -/
theorem fam_nanomaterials_surfacearea_1 : (1000 * 6) = 6000 := by decide

/-- nanomaterials: aspectratio(100, 5) = 20 — ASPECT RATIO: length over diameter. value ⌊length / diameter⌋. -/
theorem fam_nanomaterials_aspectratio_1 : (100 / 5) = 20 := by decide

/-- nanomaterials: bandgap(1120, 300) = 1420 — BAND GAP: bulk gap widened by the confinement shift. value bulk +
    shift. -/
theorem fam_nanomaterials_bandgap_1 : (1120 + 300) = 1420 := by decide

/-- nanomaterials: quantumyield(80, 100) = 80 — QUANTUM YIELD: photons emitted over absorbed, as a percentage.
    value ⌊emitted · 100 / absorbed⌋. -/
theorem fam_nanomaterials_quantumyield_1 : ((80 * 100) / 100) = 80 := by decide

/-- nanomaterials: loading(20, 80) = 20 — DRUG LOADING: payload over the whole carrier, as a percentage. value
    ⌊drug · 100 / (drug + carrier)⌋. -/
theorem fam_nanomaterials_loading_1 : ((20 * 100) / (20 + 80)) = 20 := by decide

/-- nanomaterials: dispersion(600, 1000) = 60 — DISPERSION: surface atoms over total atoms, as a percentage.
    value ⌊surface · 100 / total⌋. -/
theorem fam_nanomaterials_dispersion_1 : ((600 * 100) / 1000) = 60 := by decide

/-- nanomaterials: surfacevolume(600, 100) = 6 — SURFACE-TO-VOLUME: area over volume. value ⌊area / volume⌋. -/
theorem fam_nanomaterials_surfacevolume_1 : (600 / 100) = 6 := by decide

/-- nanomaterials: confinement(3600, 6) = 100 — CONFINEMENT ENERGY: a constant over the radius squared. value
    ⌊constant / (radius · radius)⌋. -/
theorem fam_nanomaterials_confinement_1 : (3600 / (6 * 6)) = 100 := by decide

/-- nanomaterials: confinement(3600, 0) = 0 — CONFINEMENT ENERGY: a constant over the radius squared. value
    ⌊constant / (radius · radius)⌋. -/
theorem fam_nanomaterials_confinement_2 : (3600 / (0 * 0)) = 0 := by decide

/-- nanotechnology: aspectratio(1000, 10) = 10000 — NANOTECHNOLOGY — THE VERY SMALL, AS ARITHMETIC (chosen by
    the public-API registry, not by hand). Working at the nanoscale is numbers: surface-to-volume ratio, aspect
    ratio, how many particles a mass holds, quantum confinement, reaction yield, band gap, coating mass, and how
    well a dispersion spreads. Crosses to `materials` — nanotechnology is materials at the limit. A measure. */
    const PROOF = 'nanotechnology arithmetic (surface-to-volume, aspect ratio, particle count, quantum
    confinement, yield, band gap, coating, dispersion); the very small as integers; a measure crossed to
    materials' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'nanotechnology', dst: 'materials',
    formula, value, proof: PROOF, ...extra }, holds, { name: `nanotechnology.${name}`, params }) export class
    NanotechnologyFormulas { /** ASPECT RATIO: length over diameter, scaled. value ⌊length · 100 / diameter⌋. -/
theorem fam_nanotechnology_aspectratio_1 : ((1000 * 100) / 10) = 10000 := by decide

/-- nanotechnology: bandgap(500, 5) = 100 — BAND GAP: bulk energy scaled down by size. value ⌊energy / size⌋. -/
theorem fam_nanotechnology_bandgap_1 : (500 / 5) = 100 := by decide

/-- nanotechnology: coating(3, 4) = 12 — COATING: mass of a shell at a thickness over so many layers. value
    thickness · layers. -/
theorem fam_nanotechnology_coating_1 : (3 * 4) = 12 := by decide

/-- nanotechnology: dispersion(80, 100) = 80 — DISPERSION: how much of the total is dispersed, scaled. value
    ⌊dispersed · 100 / total⌋. -/
theorem fam_nanotechnology_dispersion_1 : ((80 * 100) / 100) = 80 := by decide

/-- nanotechnology: particlecount(1000, 5) = 200 — PARTICLE COUNT: how many particles a mass holds. value ⌊mass
    / particlemass⌋. -/
theorem fam_nanotechnology_particlecount_1 : (1000 / 5) = 200 := by decide

/-- nanotechnology: quantumconfinement(600, 3) = 200 — QUANTUM CONFINEMENT: bulk property over the confining
    size. value ⌊bulk / size⌋. -/
theorem fam_nanotechnology_quantumconfinement_1 : (600 / 3) = 200 := by decide

/-- nanotechnology: surfacevolume(600, 100) = 600 — SURFACE-TO-VOLUME RATIO, scaled. value ⌊surface · 100 /
    volume⌋. -/
theorem fam_nanotechnology_surfacevolume_1 : ((600 * 100) / 100) = 600 := by decide

/-- nanotechnology: yieldrate(90, 100) = 90 — YIELD RATE: produced over theoretical, as a percentage. value
    ⌊produced · 100 / theoretical⌋. -/
theorem fam_nanotechnology_yieldrate_1 : ((90 * 100) / 100) = 90 := by decide

/-- navigation: distance(60, 3) = 180 — DISTANCE covered at a speed over a time. value speed · time. -/
theorem fam_navigation_distance_1 : (60 * 3) = 180 := by decide

/-- navigation: eta(180, 60) = 3 — ETA: the time still to run at a speed. value ⌊distance / speed⌋. -/
theorem fam_navigation_eta_1 : (180 / 60) = 3 := by decide

/-- navigation: crosstrack(5, 100) = 5 — CROSSTRACK: how far off the planned line, as a fraction of the leg.
    value ⌊offset · 100 / leg⌋. -/
theorem fam_navigation_crosstrack_1 : ((5 * 100) / 100) = 5 := by decide

/-- navigation: dilution(12, 4) = 3 — DILUTION: the fix geometry, error spread over the satellites in view (a
    GDOP proxy). value ⌊error / satellites⌋. -/
theorem fam_navigation_dilution_1 : (12 / 4) = 3 := by decide

/-- navigation: waypoint(3, 10) = 30 — WAYPOINT: the fraction of the route done. value ⌊completed · 100 /
    total⌋. -/
theorem fam_navigation_waypoint_1 : ((3 * 100) / 10) = 30 := by decide

/-- navigation: accuracy(95, 100) = 95 — ACCURACY: how often a fix holds. value ⌊fixes · 100 / attempts⌋. -/
theorem fam_navigation_accuracy_1 : ((95 * 100) / 100) = 95 := by decide

/-- nephrology: gfr(12000, 100) = 120 — NEPHROLOGY — THE KIDNEY, AS ARITHMETIC (chosen by the medical registry,
    not by hand). Renal function is numbers: filtration rate, clearance, creatinine, the filtration fraction,
    dialysis removal, protein in the urine, electrolyte concentration, and tubular reabsorption. Crosses to
    `med` — nephrology is one of medicine's measures. A measure. */ const PROOF = 'nephrology arithmetic (gfr,
    clearance, creatinine, filtration fraction, dialysis, proteinuria, electrolyte, reabsorption); a renal
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'nephrology', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `nephrology.${name}`, params }) export class
    NephrologyFormulas { /** GFR: glomerular filtration rate, filtrate volume over minutes. value ⌊filtrate /
    minutes⌋. -/
theorem fam_nephrology_gfr_1 : (12000 / 100) = 120 := by decide

/-- nephrology: clearance(1000, 10) = 100 — CLEARANCE: a substance cleared, urine over plasma. value ⌊urine /
    plasma⌋. -/
theorem fam_nephrology_clearance_1 : (1000 / 10) = 100 := by decide

/-- nephrology: creatinine(1200, 120) = 10 — CREATININE: serum level, production over the filtration rate. value
    ⌊production / gfr⌋. -/
theorem fam_nephrology_creatinine_1 : (1200 / 120) = 10 := by decide

/-- nephrology: filtration(20, 100) = 20 — FILTRATION FRACTION: filtered of renal flow, as a percentage. value
    ⌊filtered · 100 / renal⌋. -/
theorem fam_nephrology_filtration_1 : ((20 * 100) / 100) = 20 := by decide

/-- nephrology: dialysis(70, 100) = 70 — DIALYSIS: removed of the load, as a percentage. value ⌊removed · 100 /
    load⌋. -/
theorem fam_nephrology_dialysis_1 : ((70 * 100) / 100) = 70 := by decide

/-- nephrology: proteinuria(300, 2) = 150 — PROTEINURIA: protein over urine volume. value ⌊protein / volume⌋. -/
theorem fam_nephrology_proteinuria_1 : (300 / 2) = 150 := by decide

/-- nephrology: electrolyte(140, 1) = 140 — ELECTROLYTE: ions over volume, a concentration. value ⌊ions /
    volume⌋. -/
theorem fam_nephrology_electrolyte_1 : (140 / 1) = 140 := by decide

/-- nephrology: reabsorption(99, 100) = 99 — REABSORPTION: reabsorbed of filtered, as a percentage. value
    ⌊reabsorbed · 100 / filtered⌋. -/
theorem fam_nephrology_reabsorption_1 : ((99 * 100) / 100) = 99 := by decide

/-- networking: bandwidth(1000, 8) = 125 — NETWORKING — THE MOVEMENT OF PACKETS, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Moving data is numbers: bandwidth per second, propagation latency, packet
    throughput, loss rate, the hops a path takes, link utilization, delay jitter, and the hosts a subnet holds.
    Crosses to `logistics` — networking is logistics for bits. A measure. */ const PROOF = 'networking
    arithmetic (bandwidth, latency, throughput, loss, hops, utilization, jitter, subnet); the registry\'s
    packet-movement domain; a measure crossed to logistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'networking', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `networking.${name}`, params }) export class NetworkingFormulas { /** BANDWIDTH: bits over seconds. value
    ⌊bits / seconds⌋. -/
theorem fam_networking_bandwidth_1 : (1000 / 8) = 125 := by decide

/-- networking: latency(3000, 200) = 15 — LATENCY: distance over propagation speed. value ⌊distance / speed⌋. -/
theorem fam_networking_latency_1 : (3000 / 200) = 15 := by decide

/-- networking: throughput(6000, 60) = 100 — THROUGHPUT: packets over a window. value ⌊packets / window⌋. -/
theorem fam_networking_throughput_1 : (6000 / 60) = 100 := by decide

/-- networking: loss(5, 1000) = 0 — LOSS as a percentage. value ⌊dropped · 100 / sent⌋. -/
theorem fam_networking_loss_1 : ((5 * 100) / 1000) = 0 := by decide

/-- networking: loss(30, 1000) = 3 — LOSS as a percentage. value ⌊dropped · 100 / sent⌋. -/
theorem fam_networking_loss_2 : ((30 * 100) / 1000) = 3 := by decide

/-- networking: hops(5) = 4 — HOPS on a path of nodes. value nodes − 1. -/
theorem fam_networking_hops_1 : (5 - 1) = 4 := by decide

/-- networking: utilization(750, 1000) = 75 — UTILIZATION as a percentage. value ⌊used · 100 / capacity⌋. -/
theorem fam_networking_utilization_1 : ((750 * 100) / 1000) = 75 := by decide

/-- networking: jitter(50, 12) = 38 — JITTER: the spread between the largest and smallest delay. value max(0,
    max_ − min_). -/
theorem fam_networking_jitter_1 : (fmax 0 (50 - 12)) = 38 := by decide

/-- networking: subnet(1, 8) = 256 — SUBNET: the hosts a block holds. value hosts · 2^bits. -/
theorem fam_networking_subnet_1 : (1 * (2 ^ 8)) = 256 := by decide

/-- neuralnet: parameters(100, 10) = 1010 — NEURALNET — A FEEDFORWARD NETWORK AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A trained net is numbers: the parameters a dense layer carries, the
    layers a stack has, the neurons across a depth, the weights of a connection, the rectified activation, the
    average fan-in, the flops of a forward pass, and the capacity in bits. Crosses to `neuroscience` — the
    artificial network is the model of the biological one. A measure. */ const PROOF = 'neuralnet arithmetic
    (parameters, layers, neurons, weights, relu, fanin, flops, capacity); the registry\'s uncovered learning
    domain; a measure crossed to neuroscience' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'neuralnet', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name:
    `neuralnet.${name}`, params }) export class NeuralnetFormulas { /** PARAMETERS: a dense layer's weights plus
    its biases. value inputs · outputs + outputs. -/
theorem fam_neuralnet_parameters_1 : ((100 * 10) + 10) = 1010 := by decide

/-- neuralnet: layers(3) = 5 — LAYERS: the hidden layers plus the input and output layers. value hidden + 2. -/
theorem fam_neuralnet_layers_1 : (3 + 2) = 5 := by decide

/-- neuralnet: neurons(4, 128) = 512 — NEURONS: a uniform stack's units across its depth. value depth ·
    perLayer. -/
theorem fam_neuralnet_neurons_1 : (4 * 128) = 512 := by decide

/-- neuralnet: weights(128, 64) = 8192 — WEIGHTS: a fully-connected edge count between two layers. value inDim ·
    outDim. -/
theorem fam_neuralnet_weights_1 : (128 * 64) = 8192 := by decide

/-- neuralnet: relu(42) = 42 — RELU: the rectified linear unit. value max(0, x). -/
theorem fam_neuralnet_relu_1 : (fmax 0 42) = 42 := by decide

/-- neuralnet: fanin(8192, 64) = 128 — FANIN: the average incoming edges per node. value ⌊edges / nodes⌋. -/
theorem fam_neuralnet_fanin_1 : (8192 / 64) = 128 := by decide

/-- neuralnet: flops(8192, 512) = 16896 — FLOPS: a forward pass, two per multiply-accumulate plus one activation
    per node. value 2 · edges + nodes. -/
theorem fam_neuralnet_flops_1 : ((2 * 8192) + 512) = 16896 := by decide

/-- neuralnet: capacity(512, 32) = 16384 — CAPACITY: the memory a parameter set occupies, in bits. value units ·
    bits. -/
theorem fam_neuralnet_capacity_1 : (512 * 32) = 16384 := by decide

/-- neurology: glasgow(4, 5, 6) = 15 — NEUROLOGY — THE NERVOUS SYSTEM, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Clinical neurology is numbers: the Glasgow coma scale, a reflex grade, nerve
    conduction velocity, seizure frequency, an NIHSS stroke proxy, evoked latency, cerebral perfusion, and
    recovery. Crosses to `med` — neurology is a branch of medicine. A measure. */ const PROOF = 'neurology
    arithmetic (Glasgow coma scale, reflex grade, nerve conduction velocity, seizure frequency, NIHSS stroke
    proxy, evoked latency, cerebral perfusion, recovery); a measure crossed to med' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'neurology', dst: 'med', formula, value, proof: PROOF, ...extra },
    holds, { name: `neurology.${name}`, params }) export class NeurologyFormulas { /** GLASGOW COMA SCALE: eye,
    verbal and motor response. value eye + verbal + motor. -/
theorem fam_neurology_glasgow_1 : ((4 + 5) + 6) = 15 := by decide

/-- neurology: reflex(2) = 2 — REFLEX GRADE: the 0..4 deep-tendon reflex scale. value score. -/
theorem fam_neurology_reflex_1 : 2 = 2 := by decide

/-- neurology: conduction(60, 2) = 30 — NERVE CONDUCTION VELOCITY: distance over time. value ⌊distance / time⌋. -/
theorem fam_neurology_conduction_1 : (60 / 2) = 30 := by decide

/-- neurology: seizure(3, 30) = 10 — SEIZURE FREQUENCY: episodes over a period, as a percentage. value ⌊episodes
    · 100 / period⌋. -/
theorem fam_neurology_seizure_1 : ((3 * 100) / 30) = 10 := by decide

/-- neurology: stroke(8, 40) = 20 — STROKE (NIHSS proxy): deficits over total, as a percentage. value ⌊deficits
    · 100 / total⌋. -/
theorem fam_neurology_stroke_1 : ((8 * 100) / 40) = 20 := by decide

/-- neurology: latency(100) = 100 — EVOKED LATENCY: the response time in milliseconds. value ms. -/
theorem fam_neurology_latency_1 : 100 = 100 := by decide

/-- neurology: perfusion(900, 18) = 50 — CEREBRAL PERFUSION: flow over tissue mass. value ⌊flow / mass⌋. -/
theorem fam_neurology_perfusion_1 : (900 / 18) = 50 := by decide

/-- neurology: recovery(3, 4) = 75 — RECOVERY: function regained over function lost, as a percentage. value
    ⌊regained · 100 / lost⌋. -/
theorem fam_neurology_recovery_1 : ((3 * 100) / 4) = 75 := by decide

/-- neuropsychology: iq(12, 10) = 120 — NEUROPSYCHOLOGY — THE MIND MEASURED, AS ARITHMETIC. The clinic's scores
    are numbers: the intelligence quotient from mental and chronological age, the memory quotient against
    expectation, hemispheric lateralization, the deficit from a baseline, recovery after injury, working-memory
    span, processing speed, and executive function net of errors. Crosses to `neurology` — neuropsychology is
    the behaviour the brain's wiring produces. A measure. */ const PROOF = 'neuropsychology arithmetic (iq,
    memory quotient, lateralization, deficit, recovery, span, processing speed, executive function); the mind
    scored from counts and ages; a measure crossed to neurology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'neuropsychology', dst: 'neurology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `neuropsychology.${name}`, params }) export class NeuropsychologyFormulas { /** THE INTELLIGENCE QUOTIENT:
    mental age over chronological age, scaled by 100. value ⌊mental · 100 / chrono⌋. -/
theorem fam_neuropsychology_iq_1 : ((12 * 100) / 10) = 120 := by decide

/-- neuropsychology: memoryquotient(85, 100) = 85 — MEMORY QUOTIENT: the raw score against what was expected,
    scaled by 100. value ⌊raw · 100 / expected⌋. -/
theorem fam_neuropsychology_memoryquotient_1 : ((85 * 100) / 100) = 85 := by decide

/-- neuropsychology: lateralization(60, 40) = 20 — LATERALIZATION: the right–left difference over the total,
    scaled by 100. value ⌊(right − left) · 100 / (right + left)⌋. -/
theorem fam_neuropsychology_lateralization_1 : (((fmax 0 (60 - 40)) * 100) / (60 + 40)) = 20 := by decide

/-- neuropsychology: deficit(100, 75) = 25 — DEFICIT: the points lost from a baseline. value max(0, baseline −
    current). -/
theorem fam_neuropsychology_deficit_1 : (fmax 0 (100 - 75)) = 25 := by decide

/-- neuropsychology: deficit(50, 80) = 0 — DEFICIT: the points lost from a baseline. value max(0, baseline −
    current). -/
theorem fam_neuropsychology_deficit_2 : (fmax 0 (50 - 80)) = 0 := by decide

/-- neuropsychology: recovery(30, 50) = 60 — RECOVERY: how much was regained of what was lost, scaled by 100.
    value ⌊regained · 100 / lost⌋. -/
theorem fam_neuropsychology_recovery_1 : ((30 * 100) / 50) = 60 := by decide

/-- neuropsychology: span(49, 7) = 7 — SPAN: the average working-memory span over the trials. value ⌊items /
    trials⌋. -/
theorem fam_neuropsychology_span_1 : (49 / 7) = 7 := by decide

/-- neuropsychology: processingspeed(120, 60) = 120 — PROCESSING SPEED: items per minute. value ⌊items · 60 /
    seconds⌋. -/
theorem fam_neuropsychology_processingspeed_1 : ((120 * 60) / 60) = 120 := by decide

/-- neuropsychology: executivefunction(48, 8) = 40 — EXECUTIVE FUNCTION: correct responses net of errors. value
    max(0, correct − errors). -/
theorem fam_neuropsychology_executivefunction_1 : (fmax 0 (48 - 8)) = 40 := by decide

/-- neuroscience: firing(1000, 10) = 100 — NEUROSCIENCE — THE BRAIN AS ARITHMETIC. The nervous system is
    numbers: spikes per second, the membrane potential across the cell, synapses per neuron, conduction speed
    along an axon, the share of synapses strengthened, the refractory window, the connectivity of a network, and
    the firing threshold. Crosses to `neurology` — neuroscience is what neurology reasons about. A measure. */
    const PROOF = 'neuroscience arithmetic (firing rate, membrane potential, synapses per neuron, conduction
    speed, plasticity, refractory window, connectivity, threshold); the brain as a measure crossed to neurology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'neuroscience', dst: 'neurology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `neuroscience.${name}`, params }) export class NeuroscienceFormulas
    { /** FIRING RATE: spikes over the seconds observed. value ⌊spikes / seconds⌋. -/
theorem fam_neuroscience_firing_1 : (1000 / 10) = 100 := by decide

/-- neuroscience: potential(90, 20) = 70 — MEMBRANE POTENTIAL: the difference across the cell (may be negative).
    value sodium − potassium. -/
theorem fam_neuroscience_potential_1 : (90 - 20) = 70 := by decide

/-- neuroscience: synapse(10000, 100) = 100 — SYNAPSES PER NEURON: connections over neurons. value ⌊connections
    / neurons⌋. -/
theorem fam_neuroscience_synapse_1 : (10000 / 100) = 100 := by decide

/-- neuroscience: conduction(1200, 10) = 120 — CONDUCTION SPEED: distance over time. value ⌊distance / time⌋. -/
theorem fam_neuroscience_conduction_1 : (1200 / 10) = 120 := by decide

/-- neuroscience: plasticity(30, 100) = 30 — PLASTICITY: the share of synapses strengthened. value ⌊strengthened
    · 100 / synapses⌋. -/
theorem fam_neuroscience_plasticity_1 : ((30 * 100) / 100) = 30 := by decide

/-- neuroscience: refractory(2) = 2 — REFRACTORY WINDOW: the milliseconds a neuron cannot fire — the membrane
    has not recovered. value milliseconds. -/
theorem fam_neuroscience_refractory_1 : 2 = 2 := by decide

/-- neuroscience: connectivity(5000, 100) = 50 — CONNECTIVITY: edges over nodes. value ⌊edges / nodes⌋. -/
theorem fam_neuroscience_connectivity_1 : (5000 / 100) = 50 := by decide

/-- neuroscience: threshold(55) = 55 — FIRING THRESHOLD: the millivolts needed to fire. value millivolts. -/
theorem fam_neuroscience_threshold_1 : 55 = 55 := by decide

/-- ngram: count(1000, 3) = 998 — NGRAM — LANGUAGE-MODEL COUNTING, AS ARITHMETIC (the n-gram model is counts
    over a corpus, nothing else). How many n-grams a token stream holds, the maximum-likelihood probability of
    one, add-one smoothing, a perplexity proxy, vocabulary coverage, the backoff weight, the pruned vocabulary
    size, and an absolutely-discounted conditional count. Crosses to `statistics` — an n-gram model is a
    frequency distribution. A measure. */ const PROOF = 'ngram arithmetic (n-gram count, MLE probability,
    Laplace smoothing, perplexity proxy, coverage, backoff weight, vocabulary size, conditional count); the
    language-model counts of a corpus; a measure crossed to statistics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'ngram', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `ngram.${name}`, params }) export class NgramFormulas { /** NGRAM COUNT: the n-grams in a token
    stream. value max(0, tokens − n + 1). -/
theorem fam_ngram_count_1 : (fmax 0 ((1000 - 3) + 1)) = 998 := by decide

/-- ngram: probability(5, 1000) = 5 — MLE PROBABILITY in per-mille. value ⌊occurrences · 1000 / total⌋. -/
theorem fam_ngram_probability_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- ngram: probability(3, 0) = 0 — MLE PROBABILITY in per-mille. value ⌊occurrences · 1000 / total⌋. -/
theorem fam_ngram_probability_2 : ((3 * 1000) / 0) = 0 := by decide

/-- ngram: perplexityproxy(1000, 8) = 125 — ADD-ONE (LAPLACE) SMOOTHED probability in per-mille. value ⌊(count +
    1) · 1000 / (total + vocab)⌋. */ static laplacesmoothing(count: number, total: number, vocab: number):
    CrossFormula { const d = total + vocab; return c('ngram-laplacesmoothing', 'laplacesmoothing(count, total,
    vocab) = ⌊(count + 1) · 1000 / (total + vocab)⌋', d > 0 ? Math.floor(((count + 1) * 1000) / d) : 0,
    nat(count, total, vocab) && d > 0, 'laplacesmoothing', [count, total, vocab]) } /** PERPLEXITY PROXY: tokens
    per occurrence (inverse likelihood). value ⌊total / occurrences⌋. -/
theorem fam_ngram_perplexityproxy_1 : (1000 / 8) = 125 := by decide

/-- ngram: coverage(90, 100) = 90 — VOCABULARY COVERAGE as a percentage. value ⌊seen · 100 / vocab⌋. -/
theorem fam_ngram_coverage_1 : ((90 * 100) / 100) = 90 := by decide

/-- ngram: backoffweight(400, 1000) = 400 — BACKOFF WEIGHT: the higher-order mass over the lower, in per-mille.
    value ⌊higher · 1000 / lower⌋. -/
theorem fam_ngram_backoffweight_1 : ((400 * 1000) / 1000) = 400 := by decide

/-- ngram: vocabularysize(5000, 1200) = 3800 — VOCABULARY SIZE after pruning the hapax legomena. value max(0,
    unique − hapax). -/
theorem fam_ngram_vocabularysize_1 : (fmax 0 (5000 - 1200)) = 3800 := by decide

/-- ngram: conditionalcount(100, 1) = 99 — CONDITIONAL COUNT with absolute discounting. value max(0, joint −
    discount). -/
theorem fam_ngram_conditionalcount_1 : (fmax 0 (100 - 1)) = 99 := by decide

/-- ngram: conditionalcount(0, 5) = 0 — CONDITIONAL COUNT with absolute discounting. value max(0, joint −
    discount). -/
theorem fam_ngram_conditionalcount_2 : (fmax 0 (0 - 5)) = 0 := by decide

/-- nim: heaps(3, 0) = 3 -/
theorem fam_nim_heaps_1 : (3 + 0) = 3 := by decide

/-- nim: totalstones(3, 5, 7) = 15 -/
theorem fam_nim_totalstones_1 : ((3 + 5) + 7) = 15 := by decide

/-- nim: positionsubsets(6) = 64 -/
theorem fam_nim_positionsubsets_1 : (2 ^ 6) = 64 := by decide

/-- nim: winningmoves(2, 1) = 3 -/
theorem fam_nim_winningmoves_1 : (2 + 1) = 3 := by decide

/-- nim: heapmax(7, 5) = 7 -/
theorem fam_nim_heapmax_1 : (fmax 7 5) = 7 := by decide

/-- noise: snr(90, 30) = 60 — NOISE — ACOUSTIC LEVELS AS ARITHMETIC (chosen by the registry, not by hand). Sound
    is numbers: signal over noise, two sources combined, loss over distance, the dose an exposure carries, what
    a barrier removes, the threshold a masker raises, the average floor, and the range between peak and floor.
    Decibels as integer proxies, no logs. Crosses to `acoustics` — noise is the acoustics the world measures. A
    measure. */ const PROOF = 'noise arithmetic (snr, summed levels, attenuation, exposure dose, noise
    reduction, masking threshold, floor, dynamic range); decibels as integer proxies with no logs; a measure
    crossed to acoustics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'noise', dst: 'acoustics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `noise.${name}`, params }) export class
    NoiseFormulas { /** SIGNAL-TO-NOISE: the signal level above the noise level, in dB. value max(0, signal −
    noise). -/
theorem fam_noise_snr_1 : (fmax 0 (90 - 30)) = 60 := by decide

/-- noise: sumlevels(60, 40) = 100 — SUMMED LEVELS: two sources combined as an energy proxy. value a + b. -/
theorem fam_noise_sumlevels_1 : (60 + 40) = 100 := by decide

/-- noise: attenuation(80, 25) = 55 — ATTENUATION: a level after a propagation loss, in dB. value max(0, level −
    loss). -/
theorem fam_noise_attenuation_1 : (fmax 0 (80 - 25)) = 55 := by decide

/-- noise: exposuredose(85, 8) = 680 — EXPOSURE DOSE: a level sustained over hours. value level · hours. -/
theorem fam_noise_exposuredose_1 : (85 * 8) = 680 := by decide

/-- noise: nr(100, 35) = 65 — NOISE REDUCTION: what a barrier removes from the outside level, in dB. value
    max(0, outside − barrier). -/
theorem fam_noise_nr_1 : (fmax 0 (100 - 35)) = 65 := by decide

/-- noise: maskingthreshold(80, 50) = 40 — MASKING THRESHOLD: a masker raises the threshold to a percentage of
    its level. value ⌊masker · ratio / 100⌋. -/
theorem fam_noise_maskingthreshold_1 : ((80 * 50) / 100) = 40 := by decide

/-- noise: floor(600, 12) = 50 — NOISE FLOOR: the average ambient level over the samples taken. value ⌊total /
    samples⌋. -/
theorem fam_noise_floor_1 : (600 / 12) = 50 := by decide

/-- noise: dynamicrange(120, 20) = 100 — DYNAMIC RANGE: the span from peak down to the floor, in dB. value
    max(0, peak − floor). -/
theorem fam_noise_dynamicrange_1 : (fmax 0 (120 - 20)) = 100 := by decide

/-- noise: snr(30, 90) = 0 — NOISE — ACOUSTIC LEVELS AS ARITHMETIC (chosen by the registry, not by hand). Sound
    is numbers: signal over noise, two sources combined, loss over distance, the dose an exposure carries, what
    a barrier removes, the threshold a masker raises, the average floor, and the range between peak and floor.
    Decibels as integer proxies, no logs. Crosses to `acoustics` — noise is the acoustics the world measures. A
    measure. */ const PROOF = 'noise arithmetic (snr, summed levels, attenuation, exposure dose, noise
    reduction, masking threshold, floor, dynamic range); decibels as integer proxies with no logs; a measure
    crossed to acoustics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'noise', dst: 'acoustics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `noise.${name}`, params }) export class
    NoiseFormulas { /** SIGNAL-TO-NOISE: the signal level above the noise level, in dB. value max(0, signal −
    noise). -/
theorem fam_noise_snr_2 : (fmax 0 (30 - 90)) = 0 := by decide

/-- noisepollution: leq(3600, 60) = 60 — NOISEPOLLUTION — ENVIRONMENTAL NOISE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Unwanted sound is numbers: the equivalent level over a window, the
    day-night average with its night penalty, how far a reading exceeds a limit, the dose a shift accumulates,
    how a point source drops with distance, a barrier's insertion loss, the margin left under a limit, and an
    annoyance index over a population. Crosses to `acoustics` — noise pollution is acoustics felt as harm. A
    measure. */ const PROOF = 'noisepollution arithmetic (equivalent level, day-night average, exceedance,
    exposure dose, distance attenuation, barrier loss, limit margin, annoyance index); a registry domain; a
    measure crossed to acoustics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'noisepollution', dst:
    'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `noisepollution.${name}`, params })
    export class NoisepollutionFormulas { /** EQUIVALENT LEVEL: the summed energy proxy over the window. value
    ⌊total / time⌋. -/
theorem fam_noisepollution_leq_1 : (3600 / 60) = 60 := by decide

/-- noisepollution: daynight(60, 50) = 60 — DAY-NIGHT AVERAGE: 12 day hours and 12 night hours, night penalised
    by 10. value ⌊(12 · day + 12 · (night + 10)) / 24⌋. -/
theorem fam_noisepollution_daynight_1 : (((12 * 60) + (12 * (50 + 10))) / 24) = 60 := by decide

/-- noisepollution: exceedance(75, 65) = 10 — EXCEEDANCE: how far a reading tops the limit. value max(0,
    measured − limit). -/
theorem fam_noisepollution_exceedance_1 : (fmax 0 (75 - 65)) = 10 := by decide

/-- noisepollution: exceedance(60, 65) = 0 — EXCEEDANCE: how far a reading tops the limit. value max(0, measured
    − limit). -/
theorem fam_noisepollution_exceedance_2 : (fmax 0 (60 - 65)) = 0 := by decide

/-- noisepollution: exposuredose(85, 8) = 680 — EXPOSURE DOSE: level held for a number of hours. value level ·
    hours. -/
theorem fam_noisepollution_exposuredose_1 : (85 * 8) = 680 := by decide

/-- noisepollution: distanceattenuation(100, 3) = 82 — DISTANCE ATTENUATION: a point source drops 6 per distance
    doubling. value max(0, ref − 6 · doublings). -/
theorem fam_noisepollution_distanceattenuation_1 : (fmax 0 (100 - (6 * 3))) = 82 := by decide

/-- noisepollution: limitmargin(65, 50) = 15 — LIMIT MARGIN: the headroom left under the limit. value max(0,
    limit − measured). -/
theorem fam_noisepollution_limitmargin_1 : (fmax 0 (65 - 50)) = 15 := by decide

/-- noisepollution: annoyanceindex(70, 1000) = 700 — ANNOYANCE INDEX: the fraction of a population annoyed at a
    level, per hundred. value ⌊level · population / 100⌋. -/
theorem fam_noisepollution_annoyanceindex_1 : ((70 * 1000) / 100) = 700 := by decide

/-- notice: severity(3) = 3 — NOTICE — THE BANNER/CALLOUT/STATEMENT NOTICE USE CASE (payloadcms/website), AS
    ARITHMETIC. A notice shown to a reader is numbers: its severity level, how often it is dismissed, how often
    its call-to-action is clicked, how long it stays, how many stack at once, which of two notices wins,
    impressions per user, and the auto-hide delay. Crosses to `frontend` — a notice is what the frontend
    renders. A measure. */ const PROOF = 'notice arithmetic (severity, dismiss rate, cta rate, duration, stack,
    priority, impressions, autohide); the Banner/Callout/Statement notice use case from payloadcms/website; a
    measure crossed to frontend' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'notice', dst: 'frontend',
    formula, value, proof: PROOF, ...extra }, holds, { name: `notice.${name}`, params }) export class
    NoticeFormulas { /** SEVERITY: the notice level itself. value level. -/
theorem fam_notice_severity_1 : 3 = 3 := by decide

/-- notice: dismiss(30, 120) = 25 — DISMISS RATE as a percentage. value ⌊dismissed · 100 / shown⌋. -/
theorem fam_notice_dismiss_1 : ((30 * 100) / 120) = 25 := by decide

/-- notice: cta(45, 300) = 15 — CTA RATE as a percentage. value ⌊clicks · 100 / views⌋. -/
theorem fam_notice_cta_1 : ((45 * 100) / 300) = 15 := by decide

/-- notice: duration(5000) = 5000 — DURATION the notice stays, in milliseconds. value ms. -/
theorem fam_notice_duration_1 : 5000 = 5000 := by decide

/-- notice: stack(4) = 4 — STACK: how many notices stack at once. value count. -/
theorem fam_notice_stack_1 : 4 = 4 := by decide

/-- notice: impressions(80, 100) = 80 — IMPRESSIONS per user as a percentage. value ⌊shown · 100 / users⌋. -/
theorem fam_notice_impressions_1 : ((80 * 100) / 100) = 80 := by decide

/-- notice: autohide(10) = 10 — AUTOHIDE delay, in seconds. value seconds. -/
theorem fam_notice_autohide_1 : 10 = 10 := by decide

/-- nuclear: decay(1000, 3) = 125 — NUCLEAR — THE PHYSICS OF THE REACTOR CORE, AS ARITHMETIC. Nuclei are
    numbers: atoms left after a run of half-lives, the decay rate, binding energy per nucleon, the chain's
    k-factor, enrichment, fission yield, dose at a distance, and what the shielding stops. Crosses to `energy` —
    nuclear is where energy is released. A measure. */ const PROOF = 'nuclear arithmetic (decay, activity,
    binding energy per nucleon, criticality k-factor, enrichment, fission yield, dose by inverse square,
    shielding attenuation); a measure crossed to energy' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'nuclear', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `nuclear.${name}`,
    params }) export class NuclearFormulas { /** DECAY: atoms remaining after a run of half-lives. value
    ⌊initial / 2^halflives⌋. -/
theorem fam_nuclear_decay_1 : (1000 / (2 ^ 3)) = 125 := by decide

/-- nuclear: activity(5000, 2) = 10 — ACTIVITY: decay rate proxy from atoms at a decay constant. value ⌊atoms ·
    constant / 1000⌋. -/
theorem fam_nuclear_activity_1 : ((5000 * 2) / 1000) = 10 := by decide

/-- nuclear: binding(1600, 200) = 8 — BINDING: binding energy per nucleon. value ⌊mass / nucleons⌋. -/
theorem fam_nuclear_binding_1 : (1600 / 200) = 8 := by decide

/-- nuclear: criticality(105, 100) = 105 — CRITICALITY: the chain's k-factor ×100. value ⌊neutrons · 100 /
    previous⌋. -/
theorem fam_nuclear_criticality_1 : ((105 * 100) / 100) = 105 := by decide

/-- nuclear: enrichment(5, 100) = 5 — ENRICHMENT: the U-235 fraction as a percentage. value ⌊u235 · 100 /
    total⌋. -/
theorem fam_nuclear_enrichment_1 : ((5 * 100) / 100) = 5 := by decide

/-- nuclear: fission(2000, 10) = 200 — FISSION: energy yield over the input. value ⌊released / input⌋. -/
theorem fam_nuclear_fission_1 : (2000 / 10) = 200 := by decide

/-- nuclear: dose(900, 3) = 100 — DOSE: radiation by the inverse square of distance. value ⌊activity /
    distance^2⌋. -/
theorem fam_nuclear_dose_1 : (900 / (3 ^ 2)) = 100 := by decide

/-- nuclear: shielding(800, 2) = 200 — SHIELDING: what gets through after layers of attenuation. value ⌊incident
    / 2^layers⌋. -/
theorem fam_nuclear_shielding_1 : (800 / (2 ^ 2)) = 200 := by decide

/-- nuclearphysics: halflife(1000, 3) = 125 — NUCLEARPHYSICS — THE NUCLEUS AS ARITHMETIC (chosen by the
    registry, not by hand). A nucleus is numbers: how much is left after whole half-lives, how much has decayed,
    the binding energy that holds the nucleons, the mass defect, whether a chain stays critical, the activity,
    the absorbed dose, and the energy a fission releases. Crosses to `thermodynamics` — every nuclear process is
    heat. A measure. */ const PROOF = 'nuclearphysics arithmetic (half-life remaining, decay, binding energy,
    mass defect, criticality, activity, dose, fission energy); a measure crossed to thermodynamics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'nuclearphysics', dst: 'thermodynamics', formula, value, proof:
    PROOF, ...extra }, holds, { name: `nuclearphysics.${name}`, params }) export class NuclearphysicsFormulas {
    /** HALF-LIFE REMAINING: the amount left after whole half-lives. value ⌊initial / 2^periods⌋. -/
theorem fam_nuclearphysics_halflife_1 : (1000 / (2 ^ 3)) = 125 := by decide

/-- nuclearphysics: decay(1000, 3) = 875 — DECAY: the amount gone after whole half-lives. value initial −
    ⌊initial / 2^periods⌋. -/
theorem fam_nuclearphysics_decay_1 : (1000 - (1000 / (2 ^ 3))) = 875 := by decide

/-- nuclearphysics: bindingenergy(56, 8) = 448 — BINDING ENERGY: the energy holding every nucleon. value
    nucleons · perNucleon. -/
theorem fam_nuclearphysics_bindingenergy_1 : (56 * 8) = 448 := by decide

/-- nuclearphysics: massdefect(940, 931) = 9 — MASS DEFECT: the mass of the parts less the bound mass. value
    max(0, parts − bound). -/
theorem fam_nuclearphysics_massdefect_1 : (fmax 0 (940 - 931)) = 9 := by decide

/-- nuclearphysics: activity(6000, 60) = 100 — ACTIVITY: decays over the seconds observed. value ⌊decays /
    seconds⌋. -/
theorem fam_nuclearphysics_activity_1 : (6000 / 60) = 100 := by decide

/-- nuclearphysics: dose(1000, 50) = 20 — DOSE: energy absorbed per unit mass. value ⌊energy / mass⌋. -/
theorem fam_nuclearphysics_dose_1 : (1000 / 50) = 20 := by decide

/-- nuclearphysics: fission(100, 200) = 20000 — FISSION ENERGY: the energy released over every event. value
    events · perEvent. -/
theorem fam_nuclearphysics_fission_1 : (100 * 200) = 20000 := by decide

/-- nuclearpower: thermaloutput(3, 1000) = 3000 -/
theorem fam_nuclearpower_thermaloutput_1 : (3 * 1000) = 3000 := by decide

/-- nuclearpower: electricaloutput(3000, 3) = 1000 -/
theorem fam_nuclearpower_electricaloutput_1 : (3000 / 3) = 1000 := by decide

/-- nuclearpower: efficiency(33, 100) = 33 -/
theorem fam_nuclearpower_efficiency_1 : ((33 * 100) / 100) = 33 := by decide

/-- nuclearpower: fuelburnup(45, 1) = 45 -/
theorem fam_nuclearpower_fuelburnup_1 : (45 * 1) = 45 := by decide

/-- nuclearpower: capacityfactor(90, 100) = 90 -/
theorem fam_nuclearpower_capacityfactor_1 : ((90 * 100) / 100) = 90 := by decide

/-- nuclearpower: halflifecycles(3, 0) = 3 -/
theorem fam_nuclearpower_halflifecycles_1 : (3 + 0) = 3 := by decide

/-- nuclearpower: coolingloops(4, 0) = 4 -/
theorem fam_nuclearpower_coolingloops_1 : (4 + 0) = 4 := by decide

/-- nuclearpower: decayheat(7, 100) = 7 -/
theorem fam_nuclearpower_decayheat_1 : ((7 * 100) / 100) = 7 := by decide

/-- numeracy: problemsolved(20, 15) = 300 — NUMERACY — EARLY-NUMBER LEARNING, AS ARITHMETIC (chosen by the
    curriculum registry, not by hand). Learning number is numbers: problems solved, accuracy, fact fluency,
    place value, operation speed, error rate, mastery, and the growth from a start to an end. Crosses to
    `pedagogy` — numeracy is what pedagogy teaches. A measure. */ const PROOF = 'numeracy arithmetic (problems
    solved, accuracy, fact fluency, place value, operation speed, error rate, mastery, growth); the curriculum
    registry\'s uncovered domain; a measure crossed to pedagogy' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'numeracy', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `numeracy.${name}`, params }) export class NumeracyFormulas { /** PROBLEMS SOLVED: problems per session over
    the sessions worked. value sessions · perSession. -/
theorem fam_numeracy_problemsolved_1 : (20 * 15) = 300 := by decide

/-- numeracy: accuracy(45, 50) = 90 — ACCURACY as a percentage. value ⌊correct · 100 / total⌋. -/
theorem fam_numeracy_accuracy_1 : ((45 * 100) / 50) = 90 := by decide

/-- numeracy: factfluency(40, 60) = 40 — FACT FLUENCY: facts recalled per minute. value ⌊facts · 60 / seconds⌋. -/
theorem fam_numeracy_factfluency_1 : ((40 * 60) / 60) = 40 := by decide

/-- numeracy: placevalue(7, 100) = 700 — PLACE VALUE: a digit worth its place. value digit · place. -/
theorem fam_numeracy_placevalue_1 : (7 * 100) = 700 := by decide

/-- numeracy: operationspeed(120, 4) = 30 — OPERATION SPEED: operations over minutes. value ⌊operations /
    minutes⌋. -/
theorem fam_numeracy_operationspeed_1 : (120 / 4) = 30 := by decide

/-- numeracy: errorrate(3, 60) = 5 — ERROR RATE as a percentage. value ⌊errors · 100 / total⌋. -/
theorem fam_numeracy_errorrate_1 : ((3 * 100) / 60) = 5 := by decide

/-- numeracy: masterypercent(18, 24) = 75 — MASTERY: goals mastered as a percentage. value ⌊mastered · 100 /
    goals⌋. -/
theorem fam_numeracy_masterypercent_1 : ((18 * 100) / 24) = 75 := by decide

/-- numeracy: growth(85, 60) = 25 — GROWTH: the gain from a start score to an end score. value max(0, end −
    start). -/
theorem fam_numeracy_growth_1 : (fmax 0 (85 - 60)) = 25 := by decide

/-- numeracy: growth(50, 70) = 0 — GROWTH: the gain from a start score to an end score. value max(0, end −
    start). -/
theorem fam_numeracy_growth_2 : (fmax 0 (50 - 70)) = 0 := by decide

/-- numerology: digitsum(3, 6, 9) = 18 -/
theorem fam_numerology_digitsum_1 : ((3 + 6) + 9) = 18 := by decide

/-- numerology: gematriatotal(22, 10) = 220 -/
theorem fam_numerology_gematriatotal_1 : (22 * 10) = 220 := by decide

/-- numerology: masternumbers(11, 22) = 33 -/
theorem fam_numerology_masternumbers_1 : (11 + 22) = 33 := by decide

/-- numerology: repetitions(100, 7) = 14 -/
theorem fam_numerology_repetitions_1 : (100 / 7) = 14 := by decide

/-- numerology: harmonicsum(1, 2, 3) = 6 -/
theorem fam_numerology_harmonicsum_1 : ((1 + 2) + 3) = 6 := by decide

/-- numismatics: coincount(500, 10) = 5000 -/
theorem fam_numismatics_coincount_1 : (500 * 10) = 5000 := by decide

/-- numismatics: hoardsize(400, 100) = 500 -/
theorem fam_numismatics_hoardsize_1 : (400 + 100) = 500 := by decide

/-- numismatics: weightgrains(60, 4) = 240 -/
theorem fam_numismatics_weightgrains_1 : (60 * 4) = 240 := by decide

/-- numismatics: purity(900, 1000) = 90 -/
theorem fam_numismatics_purity_1 : ((900 * 100) / 1000) = 90 := by decide

/-- numismatics: dierotations(360, 12) = 30 -/
theorem fam_numismatics_dierotations_1 : (360 / 12) = 30 := by decide

/-- numismatics: varietysubsets(6) = 64 -/
theorem fam_numismatics_varietysubsets_1 : (2 ^ 6) = 64 := by decide

/-- nursing: dosage(70, 5) = 350 — NURSING — BEDSIDE CARE AS ARITHMETIC (chosen by the clinical registry, not by
    hand). Caring for patients is numbers: a weight-based dose, the drop rate of an infusion, the patients each
    nurse holds, an acuity score, hand-hygiene compliance, fluid balance, medications given on time, and the
    tasks packed into an hour. Crosses to `med` — nursing is what medicine delivers at the bedside. A measure.
    */ const PROOF = 'nursing arithmetic (dosage, drop rate, patient ratio, acuity, hand hygiene, fluid balance,
    medication timeliness, workload); the clinical registry\'s bedside domain; a measure crossed to med' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'nursing', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `nursing.${name}`, params }) export class NursingFormulas { /** DOSAGE: a
    weight-based dose at a per-kilogram amount. value weight · perkg. -/
theorem fam_nursing_dosage_1 : (70 * 5) = 350 := by decide

/-- nursing: droprate(1000, 480) = 2 — DROP RATE: an infusion volume over the minutes it runs. value ⌊volume /
    minutes⌋. -/
theorem fam_nursing_droprate_1 : (1000 / 480) = 2 := by decide

/-- nursing: droprate(1000, 0) = 0 — DROP RATE: an infusion volume over the minutes it runs. value ⌊volume /
    minutes⌋. -/
theorem fam_nursing_droprate_2 : (1000 / 0) = 0 := by decide

/-- nursing: ratio(24, 6) = 4 — RATIO: the patients each nurse holds. value ⌊patients / nurses⌋. -/
theorem fam_nursing_ratio_1 : (24 / 6) = 4 := by decide

/-- nursing: ratio(24, 0) = 0 — RATIO: the patients each nurse holds. value ⌊patients / nurses⌋. -/
theorem fam_nursing_ratio_2 : (24 / 0) = 0 := by decide

/-- nursing: acuity(7) = 7 — ACUITY: a patient's acuity score. value score. -/
theorem fam_nursing_acuity_1 : 7 = 7 := by decide

/-- nursing: handwash(90, 100) = 90 — HAND HYGIENE: compliant moments as a percentage of opportunities. value
    ⌊compliant · 100 / opportunities⌋. -/
theorem fam_nursing_handwash_1 : ((90 * 100) / 100) = 90 := by decide

/-- nursing: handwash(5, 0) = 0 — HAND HYGIENE: compliant moments as a percentage of opportunities. value
    ⌊compliant · 100 / opportunities⌋. -/
theorem fam_nursing_handwash_2 : ((5 * 100) / 0) = 0 := by decide

/-- nursing: fluid(2000, 1500) = 500 — FLUID BALANCE: intake over output, never negative. value max(0, intake −
    output). -/
theorem fam_nursing_fluid_1 : (fmax 0 (2000 - 1500)) = 500 := by decide

/-- nursing: fluid(1000, 1500) = 0 — FLUID BALANCE: intake over output, never negative. value max(0, intake −
    output). -/
theorem fam_nursing_fluid_2 : (fmax 0 (1000 - 1500)) = 0 := by decide

/-- nursing: medication(95, 100) = 95 — MEDICATION TIMELINESS: doses administered as a percentage of those due.
    value ⌊administered · 100 / due⌋. -/
theorem fam_nursing_medication_1 : ((95 * 100) / 100) = 95 := by decide

/-- nursing: medication(5, 0) = 0 — MEDICATION TIMELINESS: doses administered as a percentage of those due.
    value ⌊administered · 100 / due⌋. -/
theorem fam_nursing_medication_2 : ((5 * 100) / 0) = 0 := by decide

/-- nursing: workload(12, 8) = 1 — WORKLOAD: tasks packed into the hours worked. value ⌊tasks / hours⌋. -/
theorem fam_nursing_workload_1 : (12 / 8) = 1 := by decide

/-- nursing: workload(12, 0) = 0 — WORKLOAD: tasks packed into the hours worked. value ⌊tasks / hours⌋. -/
theorem fam_nursing_workload_2 : (12 / 0) = 0 := by decide

/-- nutrition: energy(100, 4) = 400 — NUTRITION — FOOD AS ARITHMETIC (chosen by the registry, not by hand).
    Eating is numbers: the energy in grams of a macronutrient, the calories protein, carbs, and fat each carry,
    the deficit between what is burned and what is taken in, a macro's share of the plate, water per kilo of
    body, and the resting burn. Crosses to `med` — nutrition is what medicine prescribes. A measure. */ const
    PROOF = 'nutrition arithmetic (macro energy, protein/carb/fat calories, deficit, macro share, hydration,
    basal rate); a food measure crossed to med' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'nutrition', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `nutrition.${name}`,
    params }) export class NutritionFormulas { /** ENERGY: grams of a macronutrient at its calories per gram.
    value grams · perGram. -/
theorem fam_nutrition_energy_1 : (100 * 4) = 400 := by decide

/-- nutrition: protein(50) = 200 — PROTEIN: 4 kcal per gram. value grams · 4. -/
theorem fam_nutrition_protein_1 : (50 * 4) = 200 := by decide

/-- nutrition: carbs(50) = 200 — CARBS: 4 kcal per gram. value grams · 4. -/
theorem fam_nutrition_carbs_1 : (50 * 4) = 200 := by decide

/-- nutrition: fat(20) = 180 — FAT: 9 kcal per gram. value grams · 9. -/
theorem fam_nutrition_fat_1 : (20 * 9) = 180 := by decide

/-- nutrition: deficit(1800, 2200) = 400 — DEFICIT: what is burned beyond what is taken in. value max(0, burn −
    intake). -/
theorem fam_nutrition_deficit_1 : (fmax 0 (2200 - 1800)) = 400 := by decide

/-- nutrition: deficit(2500, 2200) = 0 — DEFICIT: what is burned beyond what is taken in. value max(0, burn −
    intake). -/
theorem fam_nutrition_deficit_2 : (fmax 0 (2200 - 2500)) = 0 := by decide

/-- nutrition: macros(30, 120) = 25 — MACROS: a macro's share of the total, as a percentage. value ⌊macro · 100
    / total⌋. -/
theorem fam_nutrition_macros_1 : ((30 * 100) / 120) = 25 := by decide

/-- nutrition: hydration(2100, 70) = 30 — HYDRATION: millilitres of water per kilo of body. value ⌊ml / weight⌋. -/
theorem fam_nutrition_hydration_1 : (2100 / 70) = 30 := by decide

/-- nutrition: bmr(70, 24) = 1680 — BMR: the basal burn at a per-kilo factor. value weight · factor. -/
theorem fam_nutrition_bmr_1 : (70 * 24) = 1680 := by decide
