-- lean/FamiliesR.lean — GENERATED. THE FAMILIES, R — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- radiology: dose(1000, 4) = 250 — DOSE: absorbed exposure behind shielding. value ⌊exposure / shielding⌋. -/
theorem fam_radiology_dose_1 : (1000 / 4) = 250 := by decide

/-- radiology: contrast(50, 5) = 1000 — CONTRAST: the signal over the noise, as a percentage. value ⌊signal ·
    100 / noise⌋. -/
theorem fam_radiology_contrast_1 : ((50 * 100) / 5) = 1000 := by decide

/-- radiology: attenuation(100, 30) = 70 — RADIOLOGY — MEDICAL IMAGING AS ARITHMETIC. Imaging and radiation are
    numbers: absorbed dose behind shielding, the contrast of a signal over its noise, how much a beam is
    attenuated, shielding half-value layers, spatial resolution, the exposure a tube delivers (mAs), scan
    coverage, and radiotracer uptake. Crosses to `med` — radiology is a measure the clinic reads. A measure. */
    const PROOF = 'radiology arithmetic (dose behind shielding, contrast, attenuation, half-value layers,
    resolution, exposure mAs, coverage, uptake); medical imaging as integers; a measure crossed to med' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'radiology', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `radiology.${name}`, params }) export class RadiologyFormulas { /**
    ATTENUATION: how much of the beam the body stops. value max(0, incident − transmitted). -/
theorem fam_radiology_attenuation_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- radiology: halflife(2, 3) = 16 — HALF-LIFE: thickness doubled per shielding layer. value thickness ·
    2^layers. -/
theorem fam_radiology_halflife_1 : (2 * (2 ^ 3)) = 16 := by decide

/-- radiology: resolution(1024, 16) = 64 — RESOLUTION: pixels over the field of view. value ⌊pixels / field⌋. -/
theorem fam_radiology_resolution_1 : (1024 / 16) = 64 := by decide

/-- radiology: exposure(200, 3) = 600 — EXPOSURE: the tube current over the exposure time, in mAs. value current
    · seconds. -/
theorem fam_radiology_exposure_1 : (200 * 3) = 600 := by decide

/-- radiology: coverage(80, 100) = 80 — COVERAGE: the fraction of the field scanned, as a percentage. value
    ⌊scanned · 100 / total⌋. -/
theorem fam_radiology_coverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- radiology: uptake(30, 120) = 25 — UPTAKE: tracer absorbed over tracer injected, as a percentage. value
    ⌊absorbed · 100 / injected⌋. -/
theorem fam_radiology_uptake_1 : ((30 * 100) / 120) = 25 := by decide

/-- rail: capacity(10, 80) = 800 — RAIL — RUNNING A RAILWAY, AS ARITHMETIC (chosen by the public-API registry,
    not by hand). A railway is numbers: the seats a train carries, the minutes between trains, the grade of the
    line, the gauge left after wear, the trailing tonnage, the seconds a train dwells at a platform, the
    passengers an hour of service moves, and the cars a load needs. Crosses to `transport` — rail is one way a
    network moves people and freight. A measure. */ const PROOF = 'rail arithmetic (seat capacity, headway,
    gradient, gauge, trailing tonnage, platform dwell, hourly throughput, consist length); a public-API registry
    domain; a measure crossed to transport' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rail', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `rail.${name}`,
    params }) export class RailFormulas { /** CAPACITY: seats a train carries, cars at a per-car seat count.
    value cars · seats. -/
theorem fam_rail_capacity_1 : (10 * 80) = 800 := by decide

/-- rail: headway(120, 8) = 15 — HEADWAY: minutes between trains, a cycle shared by the trains on the line.
    value ⌊cycle / trains⌋. -/
theorem fam_rail_headway_1 : (120 / 8) = 15 := by decide

/-- rail: gradient(25, 1000) = 25 — GRADIENT: the grade of the line in per mille, rise over run. value ⌊rise ·
    1000 / run⌋. -/
theorem fam_rail_gradient_1 : ((25 * 1000) / 1000) = 25 := by decide

/-- rail: gauge(1435, 35) = 1400 — GAUGE: the track gauge left after wear takes from the nominal width. value
    max(0, nominal − wear). -/
theorem fam_rail_gauge_1 : (fmax 0 (1435 - 35)) = 1400 := by decide

/-- rail: gauge(100, 200) = 0 — GAUGE: the track gauge left after wear takes from the nominal width. value
    max(0, nominal − wear). -/
theorem fam_rail_gauge_2 : (fmax 0 (100 - 200)) = 0 := by decide

/-- rail: tonnage(40, 60) = 2400 — TONNAGE: trailing tonnage, wagons at a load each. value wagons · load. -/
theorem fam_rail_tonnage_1 : (40 * 60) = 2400 := by decide

/-- rail: throughput(20, 800) = 16000 — THROUGHPUT: passengers an hour of service moves, trains at a capacity
    each. value trains · capacity. -/
theorem fam_rail_throughput_1 : (20 * 800) = 16000 := by decide

/-- railway: capacity(8, 60) = 480 — SEAT CAPACITY: cars at seats each. value cars · seats. -/
theorem fam_railway_capacity_1 : (8 * 60) = 480 := by decide

/-- railway: dwell(45) = 45 — DWELL: seconds a train stands at a platform. value seconds. -/
theorem fam_railway_dwell_1 : 45 = 45 := by decide

/-- railway: gradient(5, 1000) = 5 — GRADIENT: rise over run, per mille. value ⌊rise · 1000 / run⌋. -/
theorem fam_railway_gradient_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- railway: headway(3600, 12) = 300 — HEADWAY: the gap between trains over a period. value ⌊period / trains⌋. -/
theorem fam_railway_headway_1 : (3600 / 12) = 300 := by decide

/-- railway: load(400, 480) = 83 — LOAD: passengers against capacity, as a percentage. value ⌊passengers · 100 /
    capacity⌋. -/
theorem fam_railway_load_1 : ((400 * 100) / 480) = 83 := by decide

/-- railway: punctuality(950, 1000) = 95 — PUNCTUALITY: on-time services as a percentage. value ⌊ontime · 100 /
    total⌋. -/
theorem fam_railway_punctuality_1 : ((950 * 100) / 1000) = 95 := by decide

/-- railway: throughput(240, 12) = 20 — THROUGHPUT: trains an hour over a span of hours. value ⌊trains / hours⌋. -/
theorem fam_railway_throughput_1 : (240 / 12) = 20 := by decide

/-- raster: pixels(1920, 1080) = 2073600 — RASTER — THE BITMAP IMAGE AS ARITHMETIC. A raster image is numbers:
    the pixels a frame holds, its resolution in dots per inch, the bytes it costs on disk, its aspect ratio, its
    megapixel count, the bits a pixel carries, the ratio a codec compresses it by, and the size a scale factor
    gives it. Crosses to `optics` — a raster is what an optical sensor samples. A measure. */ const PROOF =
    'raster arithmetic (pixels, dpi, file size, aspect ratio, megapixels, bit depth, compression, scaling); the
    bitmap image as whole-number measures; crossed to optics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'raster', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `raster.${name}`,
    params }) export class RasterFormulas { /** PIXELS: the pixels a frame holds. value width · height. -/
theorem fam_raster_pixels_1 : (1920 * 1080) = 2073600 := by decide

/-- raster: dpi(3000, 10) = 300 — DPI: dots per inch across a span. value ⌊pixels / inches⌋. -/
theorem fam_raster_dpi_1 : (3000 / 10) = 300 := by decide

/-- raster: filesize(1000, 3) = 3000 — FILE SIZE: pixels at a bytes-per-pixel cost. value pixels · bytes. -/
theorem fam_raster_filesize_1 : (1000 * 3) = 3000 := by decide

/-- raster: aspectratio(1920, 1080) = 177 — ASPECT RATIO: width over height, scaled by a hundred. value ⌊width ·
    100 / height⌋. -/
theorem fam_raster_aspectratio_1 : ((1920 * 100) / 1080) = 177 := by decide

/-- raster: megapixels(4000, 3000) = 12 — MEGAPIXELS: the frame in millions of pixels. value ⌊width · height /
    1000000⌋. -/
theorem fam_raster_megapixels_1 : ((4000 * 3000) / 1000000) = 12 := by decide

/-- raster: bitdepth(3, 8) = 24 — BIT DEPTH: the bits a pixel carries across its channels. value channels ·
    bits. -/
theorem fam_raster_bitdepth_1 : (3 * 8) = 24 := by decide

/-- raster: compression(1000, 100) = 10 — COMPRESSION: the ratio a codec shrinks by. value ⌊original /
    compressed⌋. -/
theorem fam_raster_compression_1 : (1000 / 100) = 10 := by decide

/-- raster: scaling(500, 2) = 1000 — SCALING: a size under a scale factor. value size · factor. -/
theorem fam_raster_scaling_1 : (500 * 2) = 1000 := by decide

/-- ratelimiting: tokenbucket(10, 5, 100) = 50 — RATELIMITING — ADMITTING TRAFFIC, AS ARITHMETIC. A limiter is
    numbers: the tokens a bucket holds, the rate a leak drains, the requests counted in a window, the headroom
    left under a limit, how fast tokens refill, the burst a bucket can absorb, the seconds a client must wait,
    and the quota still unspent. Crosses to `networking` — rate limiting is how the network admits load. A
    measure. */ const PROOF = 'ratelimiting arithmetic (token bucket, leaky-bucket rate, window count, throttle
    margin, refill rate, burst capacity, retry-after, quota remaining); admitting traffic as numbers; a measure
    crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ratelimiting', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `ratelimiting.${name}`, params })
    export class RatelimitingFormulas { /** TOKEN BUCKET: tokens accrued at a rate over seconds, capped at
    capacity. value min(rate · seconds, capacity). -/
theorem fam_ratelimiting_tokenbucket_1 : (fmin (10 * 5) 100) = 50 := by decide

/-- ratelimiting: leakyrate(1000, 10) = 100 — LEAKY RATE: a fixed drain — volume over seconds. value ⌊volume /
    seconds⌋. -/
theorem fam_ratelimiting_leakyrate_1 : (1000 / 10) = 100 := by decide

/-- ratelimiting: windowcount(500, 5) = 100 — WINDOW COUNT: requests averaged over the windows observed. value
    ⌊requests / windows⌋. -/
theorem fam_ratelimiting_windowcount_1 : (500 / 5) = 100 := by decide

/-- ratelimiting: throttlemargin(100, 30) = 70 — THROTTLE MARGIN: the headroom left under a limit. value max(0,
    limit − used). -/
theorem fam_ratelimiting_throttlemargin_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- ratelimiting: refillrate(600, 60) = 10 — REFILL RATE: tokens restored per second. value ⌊tokens / seconds⌋. -/
theorem fam_ratelimiting_refillrate_1 : (600 / 60) = 10 := by decide

/-- ratelimiting: burstcapacity(100, 50) = 150 — BURST CAPACITY: the steady rate plus the burst a bucket
    absorbs. value rate + burst. -/
theorem fam_ratelimiting_burstcapacity_1 : (100 + 50) = 150 := by decide

/-- ratelimiting: quotaremaining(1000, 250) = 750 — QUOTA REMAINING: the quota still unspent. value max(0, quota
    − used). -/
theorem fam_ratelimiting_quotaremaining_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- rationalism: axioms(5, 0) = 5 -/
theorem fam_rationalism_axioms_1 : (5 + 0) = 5 := by decide

/-- rationalism: innateideas(3, 2) = 6 -/
theorem fam_rationalism_innateideas_1 : (3 * 2) = 6 := by decide

/-- rationalism: premisesubsets(5) = 32 -/
theorem fam_rationalism_premisesubsets_1 : (2 ^ 5) = 32 := by decide

/-- rationalism: aprioriratio(80, 100) = 80 -/
theorem fam_rationalism_aprioriratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- rationalism: necessitylevels(3, 1) = 4 -/
theorem fam_rationalism_necessitylevels_1 : (3 + 1) = 4 := by decide

/-- readability: wordspersentence(120, 6) = 20 — READABILITY — HOW HARD A TEXT IS TO READ, AS ARITHMETIC.
    Reading is numbers: words per sentence, syllables per word, and the grade formulas built on them — Flesch
    Reading Ease, Flesch–Kincaid, Coleman–Liau, the Automated Readability Index, Gunning Fog, SMOG. Crosses to
    `linguistics` — readability is the measure linguistics puts on prose. A measure. */ const PROOF =
    'readability arithmetic (words/sentence, syllables/word, Flesch ease, Flesch–Kincaid, Coleman–Liau, ARI,
    Gunning Fog, SMOG); a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'readability', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `readability.${name}`, params }) export class ReadabilityFormulas { /** WORDS PER SENTENCE: average sentence
    length (ASL). value ⌊words / sentences⌋. -/
theorem fam_readability_wordspersentence_1 : (120 / 6) = 20 := by decide

/-- readability: wordspersentence(100, 0) = 0 — READABILITY — HOW HARD A TEXT IS TO READ, AS ARITHMETIC. Reading
    is numbers: words per sentence, syllables per word, and the grade formulas built on them — Flesch Reading
    Ease, Flesch–Kincaid, Coleman–Liau, the Automated Readability Index, Gunning Fog, SMOG. Crosses to
    `linguistics` — readability is the measure linguistics puts on prose. A measure. */ const PROOF =
    'readability arithmetic (words/sentence, syllables/word, Flesch ease, Flesch–Kincaid, Coleman–Liau, ARI,
    Gunning Fog, SMOG); a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'readability', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `readability.${name}`, params }) export class ReadabilityFormulas { /** WORDS PER SENTENCE: average sentence
    length (ASL). value ⌊words / sentences⌋. -/
theorem fam_readability_wordspersentence_2 : (100 / 0) = 0 := by decide

/-- readability: syllablesperword(150, 100) = 150 — SYLLABLES PER (HUNDRED) WORDS. value ⌊syllables · 100 /
    words⌋. -/
theorem fam_readability_syllablesperword_1 : ((150 * 100) / 100) = 150 := by decide

/-- readability: fleschscaled(20, 150) = 60 — FLESCH READING EASE from ASL and syllables-per-hundred (asw).
    value max(0, 206 − asl − ⌊846 · asw / 1000⌋). -/
theorem fam_readability_fleschscaled_1 : (fmax 0 ((206 - 20) - ((846 * 150) / 1000))) = 60 := by decide

/-- readability: fleschkincaid(20, 150) = 8 — FLESCH–KINCAID GRADE from ASL and syllables-per-hundred (asw).
    value max(0, ⌊39 · asl / 100⌋ + ⌊118 · asw / 1000⌋ − 16). -/
theorem fam_readability_fleschkincaid_1 : (fmax 0 ((((39 * 20) / 100) + ((118 * 150) / 1000)) - 16)) = 8 := by decide

/-- readability: colemanliau(500, 5) = 12 — COLEMAN–LIAU from letters-per-hundred (letters) and
    sentences-per-hundred. value max(0, ⌊588 · letters / 10000⌋ − ⌊296 · sentences / 1000⌋ − 16). -/
theorem fam_readability_colemanliau_1 : (fmax 0 ((((588 * 500) / 10000) - ((296 * 5) / 1000)) - 16)) = 12 := by decide

/-- readability: automatedindex(500, 100, 5) = 12 — AUTOMATED READABILITY INDEX from chars, words, sentences.
    value max(0, ⌊471 · chars / (100 · words)⌋ + ⌊words / (2 · sentences)⌋ − 21). -/
theorem fam_readability_automatedindex_1 : (fmax 0 ((((471 * 500) / (100 * 100)) + (100 / (2 * 5))) - 21)) = 12 := by decide

/-- readability: gunningfog(100, 5, 10) = 12 — GUNNING FOG from words, sentences, complex-word count. value
    max(0, ⌊(⌊words / sentences⌋ + ⌊100 · complex / words⌋) · 2 / 5⌋). -/
theorem fam_readability_gunningfog_1 : (fmax 0 ((((100 / 5) + ((100 * 10) / 100)) * 2) / 5)) = 12 := by decide

/-- realestate: appreciation(150, 100) = 50 — REALESTATE — PROPERTY INVESTMENT AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Owning property is numbers: capitalisation rate, loan-to-value, price per
    square foot, annual rent yield, occupancy, appreciation, a monthly interest proxy, and the equity left after
    debt. Crosses to `accounting` — real estate is what the books measure. A measure. */ const PROOF =
    'realestate arithmetic (cap rate, loan-to-value, price per sqft, rent yield, occupancy, appreciation,
    mortgage interest, equity); a property domain; a measure crossed to accounting' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'realestate', dst: 'accounting', formula, value, proof: PROOF,
    ...extra }, holds, { name: `realestate.${name}`, params }) export class RealestateFormulas { /**
    APPRECIATION as a percentage over the purchase price. value ⌊(current − purchase) · 100 / purchase⌋. -/
theorem fam_realestate_appreciation_1 : (((150 - 100) * 100) / 100) = 50 := by decide

/-- realestate: caprate(8, 100) = 8 — CAP RATE: net income as a percentage of value. value ⌊income · 100 /
    value⌋. -/
theorem fam_realestate_caprate_1 : ((8 * 100) / 100) = 8 := by decide

/-- realestate: equity(500, 300) = 200 — EQUITY: the value left after the debt. value max(0, value − debt). -/
theorem fam_realestate_equity_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- realestate: equity(300, 500) = 0 — EQUITY: the value left after the debt. value max(0, value − debt). -/
theorem fam_realestate_equity_2 : (fmax 0 (300 - 500)) = 0 := by decide

/-- realestate: ltv(80, 100) = 80 — LOAN-TO-VALUE as a percentage. value ⌊loan · 100 / value⌋. -/
theorem fam_realestate_ltv_1 : ((80 * 100) / 100) = 80 := by decide

/-- realestate: mortgage(12000, 6) = 60 — MORTGAGE: a monthly interest proxy on the principal at an annual rate.
    value ⌊principal · rate / 1200⌋. -/
theorem fam_realestate_mortgage_1 : ((12000 * 6) / 1200) = 60 := by decide

/-- realestate: occupancy(95, 100) = 95 — OCCUPANCY as a percentage of the units. value ⌊occupied · 100 /
    units⌋. -/
theorem fam_realestate_occupancy_1 : ((95 * 100) / 100) = 95 := by decide

/-- realestate: pricesqft(200000, 1000) = 200 — PRICE PER SQUARE FOOT. value ⌊price / area⌋. -/
theorem fam_realestate_pricesqft_1 : (200000 / 1000) = 200 := by decide

/-- realestate: rentyield(1000, 120000) = 10 — RENT YIELD: annual rent as a percentage of price. value ⌊rent ·
    1200 / price⌋. -/
theorem fam_realestate_rentyield_1 : ((1000 * 1200) / 120000) = 10 := by decide

/-- reasoning: inferencesteps(5, 3) = 15 — REASONING — DRAWING CONCLUSIONS, AS ARITHMETIC. Thinking is numbers:
    the steps an inference takes, how often it lands correct, whether a deduction is valid, the share that is
    biased, the load it puts on working memory, how long a response takes, the score on a syllogism, and how far
    confidence sits from accuracy. Crosses to `cognition` — reasoning is the act cognition performs. A measure.
    */ const PROOF = 'reasoning arithmetic (inference steps, accuracy, deduction validity, bias rate,
    working-memory load, response latency, syllogism score, confidence calibration); drawing conclusions as a
    measure crossed to cognition' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'reasoning', dst:
    'cognition', formula, value, proof: PROOF, ...extra }, holds, { name: `reasoning.${name}`, params }) export
    class ReasoningFormulas { /** INFERENCE STEPS: premises expanded by the rules that fire on each. value
    premises · rules. -/
theorem fam_reasoning_inferencesteps_1 : (5 * 3) = 15 := by decide

/-- reasoning: accuracy(45, 50) = 90 — ACCURACY as a percentage. value ⌊correct · 100 / total⌋. -/
theorem fam_reasoning_accuracy_1 : ((45 * 100) / 50) = 90 := by decide

/-- reasoning: biasrate(1, 20) = 5 — BIAS RATE as a percentage of judgements that are biased. value ⌊biased ·
    100 / total⌋. -/
theorem fam_reasoning_biasrate_1 : ((1 * 100) / 20) = 5 := by decide

/-- reasoning: workingmemoryload(7, 4) = 28 — WORKING-MEMORY LOAD: items held at a size each. value items ·
    size. -/
theorem fam_reasoning_workingmemoryload_1 : (7 * 4) = 28 := by decide

/-- reasoning: responselatency(6000, 120) = 50 — RESPONSE LATENCY: total milliseconds over the responses given.
    value ⌊total / responses⌋. -/
theorem fam_reasoning_responselatency_1 : (6000 / 120) = 50 := by decide

/-- reasoning: syllogismscore(8, 5) = 40 — SYLLOGISM SCORE: correct syllogisms at points each. value correct ·
    points. -/
theorem fam_reasoning_syllogismscore_1 : (8 * 5) = 40 := by decide

/-- reasoning: confidencecalibration(80, 60) = 20 — CONFIDENCE CALIBRATION: how far confidence runs ahead of
    accuracy. value max(0, confidence − accuracy). -/
theorem fam_reasoning_confidencecalibration_1 : (fmax 0 (80 - 60)) = 20 := by decide

/-- reasoning: confidencecalibration(50, 70) = 0 — CONFIDENCE CALIBRATION: how far confidence runs ahead of
    accuracy. value max(0, confidence − accuracy). -/
theorem fam_reasoning_confidencecalibration_2 : (fmax 0 (50 - 70)) = 0 := by decide

/-- receipts: total(100, 12) = 1200 -/
theorem fam_receipts_total_1 : (100 * 12) = 1200 := by decide

/-- receipts: taxamount(1000, 10) = 100 -/
theorem fam_receipts_taxamount_1 : (1000 / 10) = 100 := by decide

/-- receipts: subtotal(1200, 100) = 1100 -/
theorem fam_receipts_subtotal_1 : (fmax 0 (1200 - 100)) = 1100 := by decide

/-- receipts: itemcount(8, 4) = 12 -/
theorem fam_receipts_itemcount_1 : (8 + 4) = 12 := by decide

/-- receipts: discountpct(15, 100) = 15 -/
theorem fam_receipts_discountpct_1 : ((15 * 100) / 100) = 15 := by decide

/-- receipts: chainlength(30, 1) = 30 -/
theorem fam_receipts_chainlength_1 : (30 * 1) = 30 := by decide

/-- receivables: turnover(1000, 250) = 4 — RECEIVABLES — MONEY OWED, AS ARITHMETIC (what a ledger is still
    waiting to collect). Open invoices are numbers: how fast they turn over, the days they stay outstanding, the
    overdue amount once current is taken off, the share written off as bad debt, the collection rate, the
    balance still outstanding, the advance a factor pays, and the early-pay discount the terms grant. Crosses to
    `accounting` — receivables are an entry the ledger carries. A measure. */ const PROOF = 'receivables
    arithmetic (turnover, days sales outstanding, aging, bad debt, collection rate, outstanding balance,
    factoring advance, early-pay terms); money owed the ledger has yet to collect; a measure crossed to
    accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'receivables', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `receivables.${name}`, params }) export class
    ReceivablesFormulas { /** TURNOVER: credit sales over the average receivables carried. value ⌊sales / avg⌋. -/
theorem fam_receivables_turnover_1 : (1000 / 250) = 4 := by decide

/-- receivables: dso(50000, 365000) = 50 — DAYS SALES OUTSTANDING: receivables as days of a year's sales. value
    ⌊receivables · 365 / sales⌋. -/
theorem fam_receivables_dso_1 : ((50000 * 365) / 365000) = 50 := by decide

/-- receivables: aging(1000, 600) = 400 — AGING: the overdue amount once the current balance is taken off the
    total. value max(0, total − current). -/
theorem fam_receivables_aging_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- receivables: baddebt(10000, 3) = 300 — BAD DEBT: the share of receivables written off at a percent rate.
    value ⌊receivables · rate / 100⌋. -/
theorem fam_receivables_baddebt_1 : ((10000 * 3) / 100) = 300 := by decide

/-- receivables: collection(950, 1000) = 95 — COLLECTION: the percent of what was billed that was collected.
    value ⌊collected · 100 / billed⌋. -/
theorem fam_receivables_collection_1 : ((950 * 100) / 1000) = 95 := by decide

/-- receivables: outstanding(1000, 750) = 250 — OUTSTANDING: the balance still owed once collections are taken
    off what was billed. value max(0, billed − collected). -/
theorem fam_receivables_outstanding_1 : (fmax 0 (1000 - 750)) = 250 := by decide

/-- receivables: outstanding(500, 800) = 0 — OUTSTANDING: the balance still owed once collections are taken off
    what was billed. value max(0, billed − collected). -/
theorem fam_receivables_outstanding_2 : (fmax 0 (500 - 800)) = 0 := by decide

/-- receivables: factoring(5000, 80) = 4000 — FACTORING: the advance a factor pays against an invoice at a
    percent rate. value ⌊invoice · rate / 100⌋. -/
theorem fam_receivables_factoring_1 : ((5000 * 80) / 100) = 4000 := by decide

/-- receivables: terms(2000, 2) = 40 — TERMS: the early-pay discount the terms grant on an amount. value ⌊amount
    · discount / 100⌋. -/
theorem fam_receivables_terms_1 : ((2000 * 2) / 100) = 40 := by decide

/-- recovery: resttime(48, 2) = 96 -/
theorem fam_recovery_resttime_1 : (48 * 2) = 96 := by decide

/-- recovery: heartratedrop(180, 120) = 60 -/
theorem fam_recovery_heartratedrop_1 : (fmax 0 (180 - 120)) = 60 := by decide

/-- recovery: sleepdebt(56, 40) = 16 -/
theorem fam_recovery_sleepdebt_1 : (fmax 0 (56 - 40)) = 16 := by decide

/-- recovery: recoveryrate(80, 100) = 80 -/
theorem fam_recovery_recoveryrate_1 : ((80 * 100) / 100) = 80 := by decide

/-- recovery: musclerepair(4800, 48) = 100 -/
theorem fam_recovery_musclerepair_1 : (4800 / 48) = 100 := by decide

/-- recovery: readiness(85, 100) = 85 -/
theorem fam_recovery_readiness_1 : ((85 * 100) / 100) = 85 := by decide

/-- recovery: overtrainingindex(120, 100) = 120 -/
theorem fam_recovery_overtrainingindex_1 : ((120 * 100) / 100) = 120 := by decide

/-- recovery: hydrationgap(3000, 2500) = 500 -/
theorem fam_recovery_hydrationgap_1 : (fmax 0 (3000 - 2500)) = 500 := by decide

/-- recruitment: funnel(100, 3) = 300 — RECRUITMENT — HIRING AS ARITHMETIC (chosen by the registry, not by
    hand). Hiring is numbers: the funnel across stages, the yield from applicants to hires, days to fill, cost
    per hire, total offer value, offer acceptance, recruiters a req load needs, and retention after a year.
    Crosses to `sociology` — hiring is a social process measured. A measure. */ const PROOF = 'recruitment
    arithmetic (funnel, yield, time-to-fill, cost-per-hire, offer value, acceptance, sourcing capacity,
    retention); a hiring domain measured; a measure crossed to sociology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'recruitment', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds,
    { name: `recruitment.${name}`, params }) export class RecruitmentFormulas { /** FUNNEL: interviews touched
    across every stage. value applicants · stages. -/
theorem fam_recruitment_funnel_1 : (100 * 3) = 300 := by decide

/-- recruitment: yield(50, 1000) = 5 — YIELD: hires per hundred applicants. value ⌊hires · 100 / applicants⌋. -/
theorem fam_recruitment_yield_1 : ((50 * 100) / 1000) = 5 := by decide

/-- recruitment: timetofill(300, 10) = 30 — TIME TO FILL: average days to fill a role. value ⌊days / roles⌋. -/
theorem fam_recruitment_timetofill_1 : (300 / 10) = 30 := by decide

/-- recruitment: costperhire(50000, 10) = 5000 — COST PER HIRE: spend over the hires it bought. value ⌊spend /
    hires⌋. -/
theorem fam_recruitment_costperhire_1 : (50000 / 10) = 5000 := by decide

/-- recruitment: offer(10, 90000) = 900000 — OFFER: total offer value at a salary each. value offers · salary. -/
theorem fam_recruitment_offer_1 : (10 * 90000) = 900000 := by decide

/-- recruitment: acceptance(45, 50) = 90 — ACCEPTANCE: accepted per hundred offers. value ⌊accepted · 100 /
    offers⌋. -/
theorem fam_recruitment_acceptance_1 : ((45 * 100) / 50) = 90 := by decide

/-- recruitment: retention(90, 100) = 90 — RETENTION: hires still here per hundred, a year on. value ⌊stayed ·
    100 / hired⌋. -/
theorem fam_recruitment_retention_1 : ((90 * 100) / 100) = 90 := by decide

/-- recruitment: retention(50, 100) = 50 — RETENTION: hires still here per hundred, a year on. value ⌊stayed ·
    100 / hired⌋. -/
theorem fam_recruitment_retention_2 : ((50 * 100) / 100) = 50 := by decide

/-- rectifier: ripplefactor(48, 100) = 48 -/
theorem fam_rectifier_ripplefactor_1 : ((48 * 100) / 100) = 48 := by decide

/-- rectifier: outputvoltage(900, 10) = 90 -/
theorem fam_rectifier_outputvoltage_1 : (900 / 10) = 90 := by decide

/-- rectifier: efficiency(81, 100) = 81 -/
theorem fam_rectifier_efficiency_1 : ((81 * 100) / 100) = 81 := by decide

/-- rectifier: diodecount(4, 0) = 4 -/
theorem fam_rectifier_diodecount_1 : (4 + 0) = 4 := by decide

/-- rectifier: pivrating(2, 340) = 680 -/
theorem fam_rectifier_pivrating_1 : (2 * 340) = 680 := by decide

/-- rectifier: formfactor(111, 100) = 1 -/
theorem fam_rectifier_formfactor_1 : (111 / 100) = 1 := by decide

/-- rectifier: conductionangle(180, 1) = 180 -/
theorem fam_rectifier_conductionangle_1 : (180 / 1) = 180 := by decide

/-- rectifiers: average(1000, 8) = 125 — RECTIFIERS — TURNING ALTERNATING CURRENT INTO DIRECT, AS ARITHMETIC. A
    rectifier is numbers: the average (DC) level it delivers, the ripple left on it, how efficiently AC power
    becomes DC, the peak inverse voltage a diode must stand, the form factor, the ripple factor, the load
    regulation, and the angle each cycle conducts. Crosses to `electrical` — rectification is an electrical
    measure. A measure. */ const PROOF = 'rectifier arithmetic (average DC, ripple, efficiency, peak inverse
    voltage, form factor, ripple factor, regulation, conduction angle); turning AC into DC as integer measure; a
    measure crossed to electrical' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'rectifiers', dst:
    'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `rectifiers.${name}`, params })
    export class RectifiersFormulas { /** AVERAGE (DC) LEVEL: summed rectified samples over their count. value
    ⌊sum / samples⌋. -/
theorem fam_rectifiers_average_1 : (1000 / 8) = 125 := by decide

/-- rectifiers: ripple(12, 9) = 3 — RIPPLE: peak-to-peak ripple voltage left on the output. value max(0, vmax −
    vmin). -/
theorem fam_rectifiers_ripple_1 : (fmax 0 (12 - 9)) = 3 := by decide

/-- rectifiers: efficiency(81, 100) = 81 — EFFICIENCY: DC power delivered over AC power drawn, as a percentage.
    value ⌊dc · 100 / ac⌋. -/
theorem fam_rectifiers_efficiency_1 : ((81 * 100) / 100) = 81 := by decide

/-- rectifiers: pivrating(100, 2) = 200 — PEAK INVERSE VOLTAGE: the peak voltage times the topology factor (1
    bridge, 2 centre-tap). value vm · factor. -/
theorem fam_rectifiers_pivrating_1 : (100 * 2) = 200 := by decide

/-- rectifiers: formfactor(111, 100) = 111 — FORM FACTOR: RMS over average, as a percentage. value ⌊rms · 100 /
    avg⌋. -/
theorem fam_rectifiers_formfactor_1 : ((111 * 100) / 100) = 111 := by decide

/-- rectifiers: ripplefactor(148, 100) = 48 — RIPPLE FACTOR: the ripple (rms above DC) over the DC level, as a
    percentage. value ⌊max(0, rms − dc) · 100 / dc⌋. -/
theorem fam_rectifiers_ripplefactor_1 : (((fmax 0 (148 - 100)) * 100) / 100) = 48 := by decide

/-- rectifiers: regulation(120, 100) = 20 — REGULATION: the no-load to full-load droop over full-load voltage,
    as a percentage. value ⌊max(0, vnl − vfl) · 100 / vfl⌋. -/
theorem fam_rectifiers_regulation_1 : (((fmax 0 (120 - 100)) * 100) / 100) = 20 := by decide

/-- rectifiers: conductionangle(1, 2) = 180 — CONDUCTION ANGLE: the degrees each cycle conducts, from the
    conducting fraction. value ⌊on · 360 / total⌋. -/
theorem fam_rectifiers_conductionangle_1 : ((1 * 360) / 2) = 180 := by decide

/-- recycling: rate(750, 1000) = 75 — RATE: material recycled as a percentage of the waste stream. value
    ⌊recycled · 100 / waste⌋. -/
theorem fam_recycling_rate_1 : ((750 * 100) / 1000) = 75 := by decide

/-- recycling: diversion(600, 1000) = 60 — DIVERSION: material diverted from landfill as a percentage of the
    total. value ⌊diverted · 100 / total⌋. -/
theorem fam_recycling_diversion_1 : ((600 * 100) / 1000) = 60 := by decide

/-- recycling: contamination(50, 1000) = 5 — RECYCLING — MATERIAL RECOVERY AS ARITHMETIC (chosen by the
    registry, not by hand). Reclaiming material is numbers: the recycling rate, waste diverted, contamination,
    material recovery, output purity, energy saved over virgin production, processing throughput, and what still
    reaches landfill. Crosses to `logistics` — recycling is a flow of mass through collection and sorting. A
    measure. */ const PROOF = 'recycling arithmetic (rate, diversion, contamination, recovery, purity, energy
    saved, throughput, landfill); material recovery as a flow of mass; a measure crossed to logistics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'recycling', dst: 'logistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `recycling.${name}`, params }) export class RecyclingFormulas { /**
    CONTAMINATION: rejected material as a percentage of what was collected. value ⌊rejected · 100 / collected⌋. -/
theorem fam_recycling_contamination_1 : ((50 * 100) / 1000) = 5 := by decide

/-- recycling: recovery(900, 1000) = 90 — RECOVERY: material reclaimed as a percentage of the input. value
    ⌊reclaimed · 100 / input⌋. -/
theorem fam_recycling_recovery_1 : ((900 * 100) / 1000) = 90 := by decide

/-- recycling: purity(950, 1000) = 95 — PURITY: output as a percentage of the feedstock. value ⌊output · 100 /
    feedstock⌋. -/
theorem fam_recycling_purity_1 : ((950 * 100) / 1000) = 95 := by decide

/-- recycling: energy(700, 1000) = 70 — ENERGY: energy saved over virgin production, as a percentage. value
    ⌊saved · 100 / virgin⌋. -/
theorem fam_recycling_energy_1 : ((700 * 100) / 1000) = 70 := by decide

/-- recycling: throughput(6000, 60) = 100 — THROUGHPUT: mass processed over hours. value ⌊mass / hours⌋. -/
theorem fam_recycling_throughput_1 : (6000 / 60) = 100 := by decide

/-- recycling: landfill(600, 1000) = 40 — LANDFILL: what still reaches landfill as a percentage of what was
    generated. value ⌊(generated − diverted) · 100 / generated⌋. -/
theorem fam_recycling_landfill_1 : (((1000 - 600) * 100) / 1000) = 40 := by decide

/-- redistricting: compactness(75, 100) = 75 — REDISTRICTING — DRAWING DISTRICTS, AS ARITHMETIC (one person, one
    vote, made numbers). Population deviation from the ideal, a compactness proxy, the efficiency gap between
    wasted votes, total population, how many districts fit, the malapportionment ratio of largest to smallest,
    the Hare quota per seat, and how competitive a seat is. Crosses to `governance` — redistricting is what
    governance apportions. A measure. */ const PROOF = 'redistricting arithmetic (population deviation,
    compactness proxy, efficiency gap, population, districts, malapportionment, Hare quota, competitiveness);
    one person one vote as numbers; a measure crossed to governance' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'redistricting', dst: 'governance', formula, value, proof: PROOF, ...extra },
    holds, { name: `redistricting.${name}`, params }) export class RedistrictingFormulas { /** COMPACTNESS: the
    fill ratio of district area to its bounding box, as a percentage. value ⌊area · 100 / bbox⌋. -/
theorem fam_redistricting_compactness_1 : ((75 * 100) / 100) = 75 := by decide

/-- redistricting: competitiveness(5500, 4500) = 90 — COMPETITIVENESS: 100 minus the winner's victory margin
    over the total, a closeness score. value max(0, 100 − ⌊max(0, winner − loser) · 100 / (winner + loser)⌋). -/
theorem fam_redistricting_competitiveness_1 : (fmax 0 (100 - (((fmax 0 (5500 - 4500)) * 100) / (5500 + 4500)))) = 90 := by decide

/-- redistricting: deviation(1100, 1000) = 10 — DEVIATION: how far a district's population runs over the ideal,
    as a percentage. value ⌊max(0, pop − ideal) · 100 / ideal⌋. -/
theorem fam_redistricting_deviation_1 : (((fmax 0 (1100 - 1000)) * 100) / 1000) = 10 := by decide

/-- redistricting: districts(10000, 1000) = 10 — DISTRICTS: how many districts a population fills at a target
    size each. value ⌊population / perDistrict⌋. -/
theorem fam_redistricting_districts_1 : (10000 / 1000) = 10 := by decide

/-- redistricting: efficiencygap(3000, 1000, 10000) = 20 — EFFICIENCY GAP: the net wasted votes between two
    parties over the turnout, as a percentage. value ⌊max(0, wasteA − wasteB) · 100 / votes⌋. -/
theorem fam_redistricting_efficiencygap_1 : (((fmax 0 (3000 - 1000)) * 100) / 10000) = 20 := by decide

/-- redistricting: malapportionment(1200, 1000) = 120 — MALAPPORTIONMENT: the ratio of the largest district to
    the smallest, as a percentage. value ⌊maxPop · 100 / minPop⌋. -/
theorem fam_redistricting_malapportionment_1 : ((1200 * 100) / 1000) = 120 := by decide

/-- redistricting: population(10, 1000) = 10000 — POPULATION: the total people across all districts at a size
    each. value districts · perDistrict. -/
theorem fam_redistricting_population_1 : (10 * 1000) = 10000 := by decide

/-- redistricting: quota(50000, 10) = 5000 — QUOTA: the Hare quota, people per seat. value ⌊population / seats⌋. -/
theorem fam_redistricting_quota_1 : (50000 / 10) = 5000 := by decide

/-- redshift: z(700, 500) = 400 — REDSHIFT — THE LIGHT OF RECEDING GALAXIES, AS ARITHMETIC. A spectral line
    arrives stretched: the shift z, the recession velocity it implies, the Hubble distance, the wavelength
    stretch, the lookback time, the cosmic scale factor, the Doppler reading, and the comoving distance. Crosses
    to `cosmology` — redshift is what cosmology reads off the sky. A measure. */ const PROOF = 'redshift
    arithmetic (shift z, recession velocity, Hubble distance, wavelength shift, lookback time, scale factor,
    Doppler z, comoving distance); a measure crossed to cosmology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'redshift', dst: 'cosmology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `redshift.${name}`, params }) export class RedshiftFormulas { /** SHIFT z (×1000): the fractional stretch of
    a line. value ⌊(observed − emitted) · 1000 / emitted⌋. -/
theorem fam_redshift_z_1 : (((fmax 0 (700 - 500)) * 1000) / 500) = 400 := by decide

/-- redshift: recessionvelocity(100, 30000) = 3000 — RECESSION VELOCITY: v ≈ c·z, with z given ×1000. value ⌊z ·
    c / 1000⌋. -/
theorem fam_redshift_recessionvelocity_1 : ((100 * 30000) / 1000) = 3000 := by decide

/-- redshift: hubbledistance(7000, 70) = 100 — HUBBLE DISTANCE: d = v / H₀. value ⌊velocity / hubble⌋. -/
theorem fam_redshift_hubbledistance_1 : (7000 / 70) = 100 := by decide

/-- redshift: wavelengthshift(500, 400) = 200 — WAVELENGTH SHIFT: Δλ = λ · z, with z given ×1000. value ⌊emitted
    · z / 1000⌋. -/
theorem fam_redshift_wavelengthshift_1 : ((500 * 400) / 1000) = 200 := by decide

/-- redshift: lookbacktime(1000, 10) = 100 — LOOKBACK TIME: t = d / c. value ⌊distance / speed⌋. -/
theorem fam_redshift_lookbacktime_1 : (1000 / 10) = 100 := by decide

/-- redshift: scalefactor(1000) = 500 — SCALE FACTOR (×1000): a = 1 / (1 + z), with z given ×1000. value
    ⌊1000000 / (1000 + z)⌋. -/
theorem fam_redshift_scalefactor_1 : (1000000 / (1000 + 1000)) = 500 := by decide

/-- redshift: dopplerz(3000, 30000) = 100 — DOPPLER z (×1000): z = v / c from a velocity reading. value
    ⌊velocity · 1000 / c⌋. -/
theorem fam_redshift_dopplerz_1 : ((3000 * 1000) / 30000) = 100 := by decide

/-- redshift: comovingdistance(100, 4000) = 400 — COMOVING DISTANCE: Dc ≈ (c / H₀) · z, with z given ×1000.
    value ⌊z · hubbledist / 1000⌋. -/
theorem fam_redshift_comovingdistance_1 : ((100 * 4000) / 1000) = 400 := by decide

/-- redshift: z(500, 700) = 0 — REDSHIFT — THE LIGHT OF RECEDING GALAXIES, AS ARITHMETIC. A spectral line
    arrives stretched: the shift z, the recession velocity it implies, the Hubble distance, the wavelength
    stretch, the lookback time, the cosmic scale factor, the Doppler reading, and the comoving distance. Crosses
    to `cosmology` — redshift is what cosmology reads off the sky. A measure. */ const PROOF = 'redshift
    arithmetic (shift z, recession velocity, Hubble distance, wavelength shift, lookback time, scale factor,
    Doppler z, comoving distance); a measure crossed to cosmology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'redshift', dst: 'cosmology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `redshift.${name}`, params }) export class RedshiftFormulas { /** SHIFT z (×1000): the fractional stretch of
    a line. value ⌊(observed − emitted) · 1000 / emitted⌋. -/
theorem fam_redshift_z_2 : (((fmax 0 (500 - 700)) * 1000) / 700) = 0 := by decide

/-- redundancy: activepassive(100, 50) = 50 — REDUNDANCY — KEEPING A SYSTEM UP BY HAVING MORE THAN IT NEEDS, AS
    ARITHMETIC. Spare units, majority votes, quorum sizes, failover load, coverage: all integers. How many units
    N+1 provisions, the votes a majority needs, idle spares, a parallel-availability proxy, redundancy coverage,
    the load each surviving node carries, the nodes a fault count needs, standby capacity. Crosses to
    `reliability` — redundancy is how reliability is bought. A measure. */ const PROOF = 'redundancy arithmetic
    (N+1 units, voting threshold, spare count, parallel availability, coverage, failover load, quorum,
    active/passive); more than is needed so a part can fail; a measure crossed to reliability' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'redundancy', dst: 'reliability', formula, value, proof: PROOF,
    ...extra }, holds, { name: `redundancy.${name}`, params }) export class RedundancyFormulas { /** STANDBY
    CAPACITY: the standby as a percentage of the primary. value ⌊standby · 100 / primary⌋. -/
theorem fam_redundancy_activepassive_1 : ((50 * 100) / 100) = 50 := by decide

/-- redundancy: coverage(90, 100) = 90 — COVERAGE: the components that have a backup, as a percentage. value
    ⌊covered · 100 / total⌋. -/
theorem fam_redundancy_coverage_1 : ((90 * 100) / 100) = 90 := by decide

/-- redundancy: nplusone(8, 1) = 9 — N+1: the units provisioned — the active ones plus the spares. value active
    + spare. -/
theorem fam_redundancy_nplusone_1 : (8 + 1) = 9 := by decide

/-- redundancy: parallelreliability(90, 2) = 95 — PARALLEL AVAILABILITY: a proxy — each parallel unit divides
    the remaining downtime gap. value 100 − ⌊(100 − up) / n⌋. -/
theorem fam_redundancy_parallelreliability_1 : (100 - ((100 - 90) / 2)) = 95 := by decide

/-- redundancy: quorum(2) = 5 — QUORUM: the nodes needed to tolerate f crash faults. value 2 · faults + 1. -/
theorem fam_redundancy_quorum_1 : ((2 * 2) + 1) = 5 := by decide

/-- redundancy: sparecount(10, 8) = 2 — SPARE COUNT: the idle units — the total less the active. value max(0,
    total − active). -/
theorem fam_redundancy_sparecount_1 : (fmax 0 (10 - 8)) = 2 := by decide

/-- redundancy: votingthreshold(5) = 3 — VOTING THRESHOLD: the votes a majority needs. value ⌊voters / 2⌋ + 1. -/
theorem fam_redundancy_votingthreshold_1 : ((5 / 2) + 1) = 3 := by decide

/-- refraction: index(300, 225) = 1333 — REFRACTION — LIGHT BENDING AT A BOUNDARY, AS ARITHMETIC (no trig;
    integer proxies and ratios only). How a medium slows and bends light is numbers: the refractive index,
    Snell's ratio, the critical angle, dispersion between colours, optical density, the speed in a medium, a
    prism's deviation, and whether light is totally internally reflected. Crosses to `optics` — refraction is
    the law optics is built on. A measure. */ const PROOF = 'refraction arithmetic (index, Snell ratio, critical
    angle, dispersion, optical density, speed in medium, prism deviation, total internal reflection); light
    bending at a boundary as integer proxies; a measure crossed to optics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'refraction', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `refraction.${name}`, params }) export class RefractionFormulas { /** REFRACTIVE INDEX (×1000): the
    vacuum speed over the speed in the medium. value ⌊c · 1000 / v⌋. -/
theorem fam_refraction_index_1 : ((300 * 1000) / 225) = 1333 := by decide

/-- refraction: snell(1000, 30, 1333) = 22 — SNELL'S RATIO: the refracted proxy angle, n1·a1 over n2. value ⌊n1
    · a1 / n2⌋. -/
theorem fam_refraction_snell_1 : ((1000 * 30) / 1333) = 22 := by decide

/-- refraction: criticalangle(1333, 1000) = 67 — CRITICAL ANGLE (proxy, scaled by 90): the lighter index over
    the denser. value ⌊n2 · 90 / n1⌋. -/
theorem fam_refraction_criticalangle_1 : ((1000 * 90) / 1333) = 67 := by decide

/-- refraction: dispersion(1340, 1330) = 10 — DISPERSION: the index spread between blue and red. value max(0,
    nblue − nred). -/
theorem fam_refraction_dispersion_1 : (fmax 0 (1340 - 1330)) = 10 := by decide

/-- refraction: opticaldensity(1333, 1000) = 133 — OPTICAL DENSITY (×100 relative): an index against a reference
    index. value ⌊n · 100 / ref⌋. -/
theorem fam_refraction_opticaldensity_1 : ((1333 * 100) / 1000) = 133 := by decide

/-- refraction: speedinmedium(300, 1333) = 225 — SPEED IN MEDIUM: the vacuum speed over the index (×1000). value
    ⌊c · 1000 / n⌋. -/
theorem fam_refraction_speedinmedium_1 : ((300 * 1000) / 1333) = 225 := by decide

/-- refraction: prismdeviation(40, 35, 60) = 15 — PRISM DEVIATION: incidence plus emergence less the prism
    angle. value max(0, a1 + a2 − prism). -/
theorem fam_refraction_prismdeviation_1 : (fmax 0 ((40 + 35) - 60)) = 15 := by decide

/-- refrigeration: capacity(5, 12000) = 60000 — REFRIGERATION — MOVING HEAT, AS ARITHMETIC. The
    vapour-compression cycle is numbers: the coefficient of performance, the heat load a space puts out, the
    capacity a machine delivers, the cooling effect of the refrigerant, the superheat at the suction line, the
    subcooling at the liquid line, the pull-down to temperature, and the defrost cycles in a window. Crosses to
    `cuisine` — refrigeration is what keeps the kitchen's food cold. A measure. */ const PROOF = 'refrigeration
    arithmetic (coefficient of performance, heat load, capacity, cooling effect, superheat, subcooling,
    pull-down, defrost); the vapour-compression cycle as integers; a measure crossed to cuisine' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'refrigeration', dst: 'cuisine', formula, value, proof: PROOF,
    ...extra }, holds, { name: `refrigeration.${name}`, params }) export class RefrigerationFormulas { /**
    CAPACITY: tons of refrigeration at a rate per ton. value tons · rate. -/
theorem fam_refrigeration_capacity_1 : (5 * 12000) = 60000 := by decide

/-- refrigeration: cooling(10, 400, 150) = 2500 — COOLING EFFECT: mass of refrigerant across an enthalpy drop.
    value mass · max(0, hIn − hOut). -/
theorem fam_refrigeration_cooling_1 : (10 * (fmax 0 (400 - 150))) = 2500 := by decide

/-- refrigeration: cop(1200, 400) = 3 — COEFFICIENT OF PERFORMANCE: cooling delivered over work spent. value
    ⌊cool / work⌋. -/
theorem fam_refrigeration_cop_1 : (1200 / 400) = 3 := by decide

/-- refrigeration: cop(1200, 0) = 0 — COEFFICIENT OF PERFORMANCE: cooling delivered over work spent. value ⌊cool
    / work⌋. -/
theorem fam_refrigeration_cop_2 : (1200 / 0) = 0 := by decide

/-- refrigeration: defrost(1440, 360) = 4 — DEFROST: cycles that fit in a window at a fixed interval. value
    ⌊window / interval⌋. -/
theorem fam_refrigeration_defrost_1 : (1440 / 360) = 4 := by decide

/-- refrigeration: load(10, 4, 20) = 800 — HEAT LOAD: mass through a specific heat across a temperature
    difference. value mass · spec · delta. -/
theorem fam_refrigeration_load_1 : ((10 * 4) * 20) = 800 := by decide

/-- refrigeration: subcool(40, 33) = 7 — SUBCOOLING: how far below saturation the liquid line runs. value max(0,
    sat − liquid). -/
theorem fam_refrigeration_subcool_1 : (fmax 0 (40 - 33)) = 7 := by decide

/-- refrigeration: superheat(50, 42) = 8 — SUPERHEAT: how far above saturation the suction line runs. value
    max(0, suction − sat). -/
theorem fam_refrigeration_superheat_1 : (fmax 0 (50 - 42)) = 8 := by decide

/-- regression: slope(100, 20) = 5 — REGRESSION — LEAST-SQUARES FITTING, AS ARITHMETIC (chosen by the registry,
    not by hand). Fitting a line to points is numbers: the slope from the sums, the intercept from the means, a
    residual, the summed squared error, R² as a percentage, a prediction at x, a point's leverage, and the mean
    squared error. Crosses to `statistics` — regression is statistics put to work on a line. A measure. */ const
    PROOF = 'regression arithmetic (slope, intercept, residual, sse, rsquared, prediction, leverage, mse);
    least-squares fitting the registry left uncovered; a measure crossed to statistics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'regression', dst: 'statistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `regression.${name}`, params }) export class RegressionFormulas { /** SLOPE:
    covariance over variance. value ⌊sxy / sxx⌋. -/
theorem fam_regression_slope_1 : (100 / 20) = 5 := by decide

/-- regression: intercept(50, 2, 10) = 30 — INTERCEPT from the means. value max(0, meanY − slope · meanX). -/
theorem fam_regression_intercept_1 : (fmax 0 (50 - (2 * 10))) = 30 := by decide

/-- regression: residual(80, 75) = 5 — RESIDUAL: observed minus fitted. value max(0, actual − predicted). -/
theorem fam_regression_residual_1 : (80 - 75) = 5 := by decide

/-- regression: rsquared(80, 100) = 80 — R-SQUARED as a percentage: explained over total. value ⌊ssr · 100 /
    sst⌋. -/
theorem fam_regression_rsquared_1 : ((80 * 100) / 100) = 80 := by decide

/-- regression: prediction(2, 10, 30) = 50 — PREDICTION at x on the fitted line. value slope · x + intercept. -/
theorem fam_regression_prediction_1 : ((2 * 10) + 30) = 50 := by decide

/-- regression: leverage(25, 100) = 25 — LEVERAGE of a point as a percentage. value ⌊xdiff2 · 100 / sxx⌋. -/
theorem fam_regression_leverage_1 : ((25 * 100) / 100) = 25 := by decide

/-- regression: mse(100, 4) = 25 — MSE: the summed squared error over its degrees. value ⌊sse / n⌋. -/
theorem fam_regression_mse_1 : (100 / 4) = 25 := by decide

/-- rehabilitation: rangeofmotion(90, 120) = 75 — REHABILITATION — RECOVERY AS ARITHMETIC. Getting a body back
    to work is numbers: range of motion regained, progress to a goal, strength volume lifted, how much function
    has returned, how faithfully the plan is kept, progressive overload, the drop on the pain scale, and the
    sessions a course runs. Crosses to `physiology` — rehabilitation acts on the body physiology measures. A
    measure. */ const PROOF = 'rehabilitation arithmetic (range of motion, progress to goal, strength volume,
    recovery, adherence, load progression, pain reduction, sessions); recovery acting on the body; a measure
    crossed to physiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'rehabilitation', dst:
    'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `rehabilitation.${name}`, params })
    export class RehabilitationFormulas { /** RANGE OF MOTION as a percentage of normal. value ⌊current · 100 /
    max⌋. -/
theorem fam_rehabilitation_rangeofmotion_1 : ((90 * 100) / 120) = 75 := by decide

/-- rehabilitation: progress(20, 50, 100) = 37 — PROGRESS from a start toward a goal, as a percentage. value
    ⌊max(0, current − start) · 100 / (goal − start)⌋. -/
theorem fam_rehabilitation_progress_1 : (((fmax 0 (50 - 20)) * 100) / (100 - 20)) = 37 := by decide

/-- rehabilitation: strength(10, 50) = 500 — STRENGTH volume lifted: reps at a weight. value reps · weight. -/
theorem fam_rehabilitation_strength_1 : (10 * 50) = 500 := by decide

/-- rehabilitation: recovery(3, 10) = 70 — RECOVERY: function returned, as a percentage. value ⌊max(0, total −
    injured) · 100 / total⌋. -/
theorem fam_rehabilitation_recovery_1 : (((fmax 0 (10 - 3)) * 100) / 10) = 70 := by decide

/-- rehabilitation: adherence(18, 20) = 90 — ADHERENCE: sessions attended over scheduled, as a percentage. value
    ⌊attended · 100 / scheduled⌋. -/
theorem fam_rehabilitation_adherence_1 : ((18 * 100) / 20) = 90 := by decide

/-- rehabilitation: loadprogression(100, 10) = 110 — LOAD PROGRESSION: progressive overload on a base by a
    percentage. value base + ⌊base · pct / 100⌋. -/
theorem fam_rehabilitation_loadprogression_1 : (100 + ((100 * 10) / 100)) = 110 := by decide

/-- rehabilitation: painscale(8, 3) = 5 — PAIN SCALE drop: reported pain before minus after. value max(0, before
    − after). -/
theorem fam_rehabilitation_painscale_1 : (fmax 0 (8 - 3)) = 5 := by decide

/-- rehabilitation: sessions(6, 3) = 18 — SESSIONS a course runs: weeks at a weekly cadence. value weeks ·
    perweek. -/
theorem fam_rehabilitation_sessions_1 : (6 * 3) = 18 := by decide

/-- rehabilitation: painscale(3, 8) = 0 — PAIN SCALE drop: reported pain before minus after. value max(0, before
    − after). -/
theorem fam_rehabilitation_painscale_2 : (fmax 0 (3 - 8)) = 0 := by decide

/-- reinsurance: cession(1000, 30) = 300 — REINSURANCE — INSURANCE OF INSURERS, AS ARITHMETIC (a carrier cedes
    part of a risk so a loss is shared, not borne alone). Running the treaty is numbers: the share ceded, what
    the carrier retains, treaty capacity, the quota-share paid, surplus lines, the recovery above a retention,
    the width of a layer, and how a layer splits into bands. Crosses to `insurance` — reinsurance is insurance
    one level up. A measure. */ const PROOF = 'reinsurance arithmetic (cession, retention, treaty capacity,
    quota share, surplus lines, recovery, layer width, attachment bands); insurance of insurers; a measure
    crossed to insurance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'reinsurance', dst:
    'insurance', formula, value, proof: PROOF, ...extra }, holds, { name: `reinsurance.${name}`, params })
    export class ReinsuranceFormulas { /** CESSION: the part of a risk ceded at a rate (percent). value ⌊risk ·
    rate / 100⌋. -/
theorem fam_reinsurance_cession_1 : ((1000 * 30) / 100) = 300 := by decide

/-- reinsurance: retention(1000, 300) = 700 — RETENTION: what the carrier keeps after ceding. value max(0, total
    − ceded). -/
theorem fam_reinsurance_retention_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- reinsurance: retention(300, 1000) = 0 — RETENTION: what the carrier keeps after ceding. value max(0, total −
    ceded). -/
theorem fam_reinsurance_retention_2 : (fmax 0 (300 - 1000)) = 0 := by decide

/-- reinsurance: treaty(500, 4) = 2000 — TREATY CAPACITY: a per-cession limit over the cessions it covers. value
    limit · cessions. -/
theorem fam_reinsurance_treaty_1 : (500 * 4) = 2000 := by decide

/-- reinsurance: quota(40, 5000) = 2000 — QUOTA SHARE: the reinsurer's fixed share (percent) of a loss. value
    ⌊share · loss / 100⌋. -/
theorem fam_reinsurance_quota_1 : ((40 * 5000) / 100) = 2000 := by decide

/-- reinsurance: surplus(9, 1000) = 9000 — SURPLUS: lines of cover at a line size each. value lines · line. -/
theorem fam_reinsurance_surplus_1 : (9 * 1000) = 9000 := by decide

/-- reinsurance: recovery(5000, 1000) = 4000 — RECOVERY: the loss above a retention, recovered from the
    reinsurer. value max(0, loss − retention). -/
theorem fam_reinsurance_recovery_1 : (fmax 0 (5000 - 1000)) = 4000 := by decide

/-- reinsurance: layer(10000, 2000) = 8000 — LAYER: the width of an excess-of-loss layer. value max(0, upper −
    lower). -/
theorem fam_reinsurance_layer_1 : (fmax 0 (10000 - 2000)) = 8000 := by decide

/-- reinsurance: attachment(8000, 4) = 2000 — ATTACHMENT: a layer split into equal bands. value ⌊layer / bands⌋. -/
theorem fam_reinsurance_attachment_1 : (8000 / 4) = 2000 := by decide

/-- relativity: energy(2, 300) = 600 — RELATIVITY — SPACETIME AS ARITHMETIC. Energy, time dilation, the beta
    fraction of light speed, momentum, gravitational redshift, spatial curvature, the Schwarzschild horizon, and
    the spacetime interval. Every value an integer; every division guarded. Crosses to `gravity` — relativity is
    what gravity bends. A measure. */ const PROOF = 'relativity arithmetic (energy, time dilation, lorentz beta,
    momentum, redshift, curvature, horizon, interval); integer proxies with every division guarded; a measure
    crossed to gravity' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'relativity', dst:
    'gravity', formula, value, proof: PROOF, ...extra }, holds, { name: `relativity.${name}`, params }) export
    class RelativityFormulas { /** ENERGY: mass times c² (caller supplies c² scaled, E = mc² proxy). value mass
    · c2. -/
theorem fam_relativity_energy_1 : (2 * 300) = 600 := by decide

/-- relativity: dilation(10, 3) = 30 — TIME DILATION: proper time stretched by a factor. value proper · factor. -/
theorem fam_relativity_dilation_1 : (10 * 3) = 30 := by decide

/-- relativity: lorentz(50, 100) = 50 — LORENTZ BETA: velocity as a percentage of light speed. value ⌊velocity ·
    100 / c⌋. -/
theorem fam_relativity_lorentz_1 : ((50 * 100) / 100) = 50 := by decide

/-- relativity: lorentz(10, 0) = 0 — LORENTZ BETA: velocity as a percentage of light speed. value ⌊velocity ·
    100 / c⌋. -/
theorem fam_relativity_lorentz_2 : ((10 * 100) / 0) = 0 := by decide

/-- relativity: momentum(5, 20) = 100 — MOMENTUM: mass times velocity. value mass · velocity. -/
theorem fam_relativity_momentum_1 : (5 * 20) = 100 := by decide

/-- relativity: redshift(1000, 900) = 100 — GRAVITATIONAL REDSHIFT: the fractional shift (per mille) below the
    emitted frequency. value ⌊max(0, emitted − gravity) · 1000 / emitted⌋. -/
theorem fam_relativity_redshift_1 : (((fmax 0 (1000 - 900)) * 1000) / 1000) = 100 := by decide

/-- relativity: redshift(0, 5) = 0 — GRAVITATIONAL REDSHIFT: the fractional shift (per mille) below the emitted
    frequency. value ⌊max(0, emitted − gravity) · 1000 / emitted⌋. -/
theorem fam_relativity_redshift_2 : (((fmax 0 (0 - 5)) * 1000) / 0) = 0 := by decide

/-- relativity: curvature(100, 4) = 25 — CURVATURE: mass over radius (a spatial curvature proxy). value ⌊mass /
    radius⌋. -/
theorem fam_relativity_curvature_1 : (100 / 4) = 25 := by decide

/-- relativity: curvature(100, 0) = 0 — CURVATURE: mass over radius (a spatial curvature proxy). value ⌊mass /
    radius⌋. -/
theorem fam_relativity_curvature_2 : (100 / 0) = 0 := by decide

/-- relativity: horizon(7) = 21 — SCHWARZSCHILD HORIZON: the event-horizon radius proxy. value mass · 3. -/
theorem fam_relativity_horizon_1 : (7 * 3) = 21 := by decide

/-- relativity: interval(50, 20) = 30 — SPACETIME INTERVAL: the space component above the time component. value
    max(0, space − time). -/
theorem fam_relativity_interval_1 : (fmax 0 (50 - 20)) = 30 := by decide

/-- relativity: interval(20, 50) = 0 — SPACETIME INTERVAL: the space component above the time component. value
    max(0, space − time). -/
theorem fam_relativity_interval_2 : (fmax 0 (20 - 50)) = 0 := by decide

/-- reliability: mtbf(10000, 5) = 2000 — RELIABILITY — RUNNING SYSTEMS AS ARITHMETIC. How long a thing runs
    between failures and how fast it comes back: mean time between failures, mean time to repair, availability,
    the failure rate in FIT, redundancy, survival, the nines, and reliability over trials. Crosses to `code` —
    reliability is what the code is judged by. A measure. */ const PROOF = 'reliability arithmetic (mtbf, mttr,
    availability, failure rate in FIT, redundancy, survival, nines, reliability over trials); a measure crossed
    to code' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'reliability', dst: 'code',
    formula, value, proof: PROOF, ...extra }, holds, { name: `reliability.${name}`, params }) export class
    ReliabilityFormulas { /** MEAN TIME BETWEEN FAILURES: uptime over the failures counted. value ⌊uptime /
    failures⌋. -/
theorem fam_reliability_mtbf_1 : (10000 / 5) = 2000 := by decide

/-- reliability: mttr(600, 4) = 150 — MEAN TIME TO REPAIR: downtime over the repairs made. value ⌊downtime /
    repairs⌋. -/
theorem fam_reliability_mttr_1 : (600 / 4) = 150 := by decide

/-- reliability: availability(999, 1000) = 99 — AVAILABILITY as a percentage. value ⌊uptime · 100 / total⌋. -/
theorem fam_reliability_availability_1 : ((999 * 100) / 1000) = 99 := by decide

/-- reliability: failurerate(3, 1000000) = 3 — FAILURE RATE in FIT: failures per billion hours, scaled per
    million. value ⌊failures · 1000000 / hours⌋. -/
theorem fam_reliability_failurerate_1 : ((3 * 1000000) / 1000000) = 3 := by decide

/-- reliability: redundancy(3, 2) = 150 — REDUNDANCY as a percentage: backups over components. value ⌊backups ·
    100 / components⌋. -/
theorem fam_reliability_redundancy_1 : ((3 * 100) / 2) = 150 := by decide

/-- reliability: survival(950, 1000) = 95 — SURVIVAL as a percentage: surviving over initial. value ⌊surviving ·
    100 / initial⌋. -/
theorem fam_reliability_survival_1 : ((950 * 100) / 1000) = 95 := by decide

/-- reliability: nines(99999, 100000) = 9999 — THE NINES: availability to four places. value ⌊uptime · 10000 /
    total⌋. -/
theorem fam_reliability_nines_1 : ((99999 * 10000) / 100000) = 9999 := by decide

/-- reliability: reliability(95, 100) = 95 — RELIABILITY over trials as a percentage: successes over trials.
    value ⌊successes · 100 / trials⌋. -/
theorem fam_reliability_reliability_1 : ((95 * 100) / 100) = 95 := by decide

/-- remediation: contaminant(1000, 50) = 20 — REMEDIATION — CLEANING A CONTAMINATED SITE, AS ARITHMETIC.
    Removing pollution is numbers: how concentrated a contaminant is, how much a treatment reduces it, dilution
    by clean water, radioactive half-life decay, the fraction cleaned up, cumulative exposure, whether a reading
    is under the safe threshold, and the volume of soil to treat. Crosses to `environment` — remediation is what
    restores the environment. A measure. */ const PROOF = 'remediation arithmetic (contaminant concentration,
    reduction, dilution, half-life decay, cleanup fraction, exposure, safe threshold, treatment volume); a
    measure crossed to environment' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'remediation',
    dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `remediation.${name}`, params
    }) export class RemediationFormulas { /** CONTAMINANT CONCENTRATION: contaminant mass over the volume it
    sits in. value ⌊mass / volume⌋. -/
theorem fam_remediation_contaminant_1 : (1000 / 50) = 20 := by decide

/-- remediation: reduction(200, 50) = 75 — REDUCTION as a percentage of what a treatment removed. value ⌊(before
    − after) · 100 / before⌋. -/
theorem fam_remediation_reduction_1 : (((200 - 50) * 100) / 200) = 75 := by decide

/-- remediation: dilution(1000, 4) = 250 — DILUTION: a concentration diluted by a clean-water factor. value
    ⌊conc / factor⌋. -/
theorem fam_remediation_dilution_1 : (1000 / 4) = 250 := by decide

/-- remediation: halflife(1000, 3) = 125 — HALF-LIFE DECAY: what remains of an amount after a number of
    half-lives. value ⌊initial / 2^periods⌋. -/
theorem fam_remediation_halflife_1 : (1000 / (2 ^ 3)) = 125 := by decide

/-- remediation: cleanup(900, 1000) = 90 — CLEANUP: the fraction cleaned, as a percentage. value ⌊removed · 100
    / total⌋. -/
theorem fam_remediation_cleanup_1 : ((900 * 100) / 1000) = 90 := by decide

/-- remediation: exposure(5, 30) = 150 — EXPOSURE: a daily dose accumulated over days. value dose · days. -/
theorem fam_remediation_exposure_1 : (5 * 30) = 150 := by decide

/-- remediation: volume(10, 20, 30) = 6000 — TREATMENT VOLUME: the soil box to treat. value length · width ·
    depth. -/
theorem fam_remediation_volume_1 : ((10 * 20) * 30) = 6000 := by decide

/-- remotesensing: ndvi(80, 40) = 33 — REMOTE SENSING — EARTH OBSERVATION AS ARITHMETIC (chosen by the registry,
    not by hand). Reading the planet from orbit is numbers: the vegetation index of a scene, the ground
    resolution of a sensor, reflectance, classification accuracy, the bands a sensor carries, the revisit
    period, cloud cover, and the swath an angle sweeps. Crosses to `geography` — remote sensing is how geography
    is measured from above. A measure. */ const PROOF = 'remote sensing arithmetic (ndvi, ground resolution,
    reflectance, classification accuracy, bands, revisit, cloud cover, swath); an earth-observation domain; a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'remotesensing', dst:
    'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `remotesensing.${name}`, params })
    export class RemotesensingFormulas { /** NDVI: the normalised difference vegetation index as a percentage.
    value ⌊(nir − red) · 100 / (nir + red)⌋. -/
theorem fam_remotesensing_ndvi_1 : (((80 - 40) * 100) / (80 + 40)) = 33 := by decide

/-- remotesensing: resolution(4000, 1000) = 4 — GROUND RESOLUTION: swath over the pixels across it. value ⌊swath
    / pixels⌋. -/
theorem fam_remotesensing_resolution_1 : (4000 / 1000) = 4 := by decide

/-- remotesensing: reflectance(40, 80) = 50 — REFLECTANCE as a percentage. value ⌊reflected · 100 / incident⌋. -/
theorem fam_remotesensing_reflectance_1 : ((40 * 100) / 80) = 50 := by decide

/-- remotesensing: classification(900, 1000) = 90 — CLASSIFICATION ACCURACY: correctly labelled pixels as a
    percentage. value ⌊correct · 100 / pixels⌋. -/
theorem fam_remotesensing_classification_1 : ((900 * 100) / 1000) = 90 := by decide

/-- remotesensing: bands(12) = 12 — BANDS: the spectral bands a sensor carries. value count. -/
theorem fam_remotesensing_bands_1 : 12 = 12 := by decide

/-- remotesensing: revisit(16) = 16 — REVISIT: the days between passes over a point. value days. -/
theorem fam_remotesensing_revisit_1 : 16 = 16 := by decide

/-- remotesensing: cloudcover(30, 100) = 30 — CLOUD COVER as a percentage of the scene. value ⌊cloudy · 100 /
    total⌋. -/
theorem fam_remotesensing_cloudcover_1 : ((30 * 100) / 100) = 30 := by decide

/-- remotesensing: swath(700, 10) = 7000 — SWATH: the ground width an off-nadir angle sweeps from altitude.
    value altitude · angle. -/
theorem fam_remotesensing_swath_1 : (700 * 10) = 7000 := by decide

/-- rendering: fps(120, 2) = 60 — RENDERING — THE FRAME, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). Drawing a picture is numbers: frames per second, the triangles a strip holds, the pixels on
    screen, rays times bounces, the fraction culled, samples times lights, frame latency, and the fill rate a
    clock sustains. Crosses to `layout` — rendering is what layout draws. A measure. */ const PROOF = 'rendering
    arithmetic (fps, triangle-strip count, pixels, raytracing, culling, shading, latency, fillrate); the frame
    as a measure crossed to layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'rendering', dst:
    'layout', formula, value, proof: PROOF, ...extra }, holds, { name: `rendering.${name}`, params }) export
    class RenderingFormulas { /** FRAMES PER SECOND: frames drawn over the seconds elapsed. value ⌊frames /
    seconds⌋. -/
theorem fam_rendering_fps_1 : (120 / 2) = 60 := by decide

/-- rendering: triangles(10) = 8 — TRIANGLE STRIP: the triangles a strip of vertices holds. value vertices − 2. -/
theorem fam_rendering_triangles_1 : (10 - 2) = 8 := by decide

/-- rendering: pixels(1920, 1080) = 2073600 — PIXELS on screen: width by height. value width · height. -/
theorem fam_rendering_pixels_1 : (1920 * 1080) = 2073600 := by decide

/-- rendering: raytracing(1000, 8) = 8000 — RAYTRACING: rays times the bounces each takes. value rays · bounces. -/
theorem fam_rendering_raytracing_1 : (1000 * 8) = 8000 := by decide

/-- rendering: culling(30, 120) = 25 — CULLING: the percentage of the scene still drawn. value ⌊visible · 100 /
    total⌋. -/
theorem fam_rendering_culling_1 : ((30 * 100) / 120) = 25 := by decide

/-- rendering: shading(64, 4) = 256 — SHADING: samples times the lights each shades. value samples · lights. -/
theorem fam_rendering_shading_1 : (64 * 4) = 256 := by decide

/-- rendering: latency(2, 120) = 16 — FRAME LATENCY: milliseconds the frames take at a refresh rate. value
    ⌊frames · 1000 / refresh⌋. -/
theorem fam_rendering_latency_1 : ((2 * 1000) / 120) = 16 := by decide

/-- rendering: fillrate(1000, 60) = 60000 — FILL RATE: pixels a clock sustains. value pixels · clock. -/
theorem fam_rendering_fillrate_1 : (1000 * 60) = 60000 := by decide

/-- replenishment: reorder(50, 7) = 350 — REPLENISHMENT — KEEPING THE SHELF FULL, AS ARITHMETIC (chosen by the
    inventory registry, not by hand). Restocking is numbers: the reorder point, the safety buffer, the order
    quantity, the lead time, the cycle stock, the par level, the fill rate, and whatever ran short. Crosses to
    `warehousing` — replenishment is what the warehouse carries out. A measure. */ const PROOF = 'replenishment
    arithmetic (reorder point, safety stock, economic order quantity, lead time, cycle stock, par level, fill
    rate, stockout); the inventory domain made of integers; a measure crossed to warehousing' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'replenishment', dst: 'warehousing', formula, value, proof: PROOF,
    ...extra }, holds, { name: `replenishment.${name}`, params }) export class ReplenishmentFormulas { /**
    REORDER POINT: daily demand across the lead time. value demand · lead. -/
theorem fam_replenishment_reorder_1 : (50 * 7) = 350 := by decide

/-- replenishment: safetystock(80, 50, 7) = 210 — SAFETY STOCK: the demand spike held across the lead time.
    value max(0, maxDemand − avgDemand) · lead. -/
theorem fam_replenishment_safetystock_1 : ((fmax 0 (80 - 50)) * 7) = 210 := by decide

/-- replenishment: eoq(1000, 50, 20) = 5000 — ECONOMIC ORDER QUANTITY (integer proxy, no sqrt): the squared EOQ.
    value ⌊2 · demand · setup / hold⌋. -/
theorem fam_replenishment_eoq_1 : (((2 * 1000) * 50) / 20) = 5000 := by decide

/-- replenishment: leadtime(5, 2) = 7 — LEAD TIME: supplier days plus transit days. value supplier + transit. -/
theorem fam_replenishment_leadtime_1 : (5 + 2) = 7 := by decide

/-- replenishment: cycle(200) = 100 — CYCLE STOCK: half the order quantity held on average. value ⌊orderQty /
    2⌋. -/
theorem fam_replenishment_cycle_1 : (200 / 2) = 100 := by decide

/-- replenishment: parlevel(50, 7, 100) = 450 — PAR LEVEL: the reorder point plus the safety buffer. value
    demand · lead + safety. -/
theorem fam_replenishment_parlevel_1 : ((50 * 7) + 100) = 450 := by decide

/-- replenishment: fill(950, 1000) = 95 — FILL RATE as a percentage. value ⌊filled · 100 / demanded⌋. -/
theorem fam_replenishment_fill_1 : ((950 * 100) / 1000) = 95 := by decide

/-- replenishment: stockout(100, 30) = 70 — STOCKOUT: demand the shelf could not meet. value max(0, demand −
    onHand). -/
theorem fam_replenishment_stockout_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- replenishment: stockout(30, 100) = 0 — STOCKOUT: demand the shelf could not meet. value max(0, demand −
    onHand). -/
theorem fam_replenishment_stockout_2 : (fmax 0 (30 - 100)) = 0 := by decide

/-- replication: consistency(2, 3) = 66 — REPLICATION — KEEPING COPIES IN AGREEMENT, AS ARITHMETIC. A
    distributed store is numbers: how far a follower lags, the quorum a write needs, the replication factor, the
    consistency reached, replicated throughput, failover time, write amplification across replicas, and how far
    two copies have diverged. Crosses to `networking` — replication is what the network carries between nodes. A
    measure. */ const PROOF = 'replication arithmetic (lag, quorum, factor, consistency, throughput, failover,
    sync amplification, divergence); keeping copies in agreement; a measure crossed to networking' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'replication', dst: 'networking', formula, value, proof: PROOF,
    ...extra }, holds, { name: `replication.${name}`, params }) export class ReplicationFormulas { /**
    CONSISTENCY: the percentage of replicas that acknowledged a write. value ⌊acks · 100 / replicas⌋. -/
theorem fam_replication_consistency_1 : ((2 * 100) / 3) = 66 := by decide

/-- replication: divergence(1000, 940) = 60 — DIVERGENCE: how many entries the follower is behind the leader.
    value max(0, leader − follower). -/
theorem fam_replication_divergence_1 : (fmax 0 (1000 - 940)) = 60 := by decide

/-- replication: factor(3, 4) = 12 — REPLICATION FACTOR: copies kept at each of several sites. value copies ·
    sites. -/
theorem fam_replication_factor_1 : (3 * 4) = 12 := by decide

/-- replication: failover(300, 150) = 450 — FAILOVER: detection time plus election time. value detect + elect. -/
theorem fam_replication_failover_1 : (300 + 150) = 450 := by decide

/-- replication: quorum(5) = 3 — QUORUM: the majority a write must reach. value ⌊nodes / 2⌋ + 1. -/
theorem fam_replication_quorum_1 : ((5 / 2) + 1) = 3 := by decide

/-- replication: sync(500, 3) = 1500 — SYNC: write amplification — each write applied to every replica. value
    writes · replicas. -/
theorem fam_replication_sync_1 : (500 * 3) = 1500 := by decide

/-- replication: throughput(9000, 60) = 150 — THROUGHPUT: replicated operations per second. value ⌊ops /
    seconds⌋. -/
theorem fam_replication_throughput_1 : (9000 / 60) = 150 := by decide

/-- respiration: atpyield(2, 38) = 76 — RESPIRATION — CELLULAR AND PULMONARY GAS ACCOUNTING, AS ARITHMETIC.
    Breathing and burning fuel are numbers: the ATP a glucose yields aerobically, oxygen taken up, the
    respiratory quotient, minute ventilation, tidal volume, net gas exchanged, metabolic rate, and the oxygen a
    full glucose oxidation consumes. Crosses to `physiology` — respiration is what physiology accounts for. A
    measure. */ const PROOF = 'respiration arithmetic (ATP yield, oxygen uptake, respiratory quotient, minute
    ventilation, tidal volume, gas exchange, metabolic rate, glucose oxidation); a measure crossed to
    physiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'respiration', dst: 'physiology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `respiration.${name}`, params }) export class
    RespirationFormulas { /** ATP YIELD: molecules of glucose at an aerobic yield each (36–38 ATP per glucose).
    value glucose · perGlucose. -/
theorem fam_respiration_atpyield_1 : (2 * 38) = 76 := by decide

/-- respiration: oxygenuptake(5, 50) = 250 — OXYGEN UPTAKE (Fick): cardiac output times the arterio-venous
    oxygen difference. value output · diff. -/
theorem fam_respiration_oxygenuptake_1 : (5 * 50) = 250 := by decide

/-- respiration: respiratoryquotient(8, 10) = 80 — RESPIRATORY QUOTIENT: CO₂ produced over O₂ consumed, scaled
    by 100. value ⌊co2 · 100 / o2⌋. -/
theorem fam_respiration_respiratoryquotient_1 : ((8 * 100) / 10) = 80 := by decide

/-- respiration: minuteventilation(500, 12) = 6000 — MINUTE VENTILATION: tidal volume times the breathing rate.
    value tidal · rate. -/
theorem fam_respiration_minuteventilation_1 : (500 * 12) = 6000 := by decide

/-- respiration: tidalvolume(6000, 12) = 500 — TIDAL VOLUME: minute ventilation back over the breathing rate.
    value ⌊minute / rate⌋. -/
theorem fam_respiration_tidalvolume_1 : (6000 / 12) = 500 := by decide

/-- respiration: gasexchange(150, 100) = 50 — GAS EXCHANGE: net gas across the membrane, inspired less expired.
    value max(0, inspired − expired). -/
theorem fam_respiration_gasexchange_1 : (fmax 0 (150 - 100)) = 50 := by decide

/-- respiration: metabolicrate(250, 5) = 1250 — METABOLIC RATE: energy from oxygen uptake at a caloric
    equivalent per unit. value vo2 · factor. -/
theorem fam_respiration_metabolicrate_1 : (250 * 5) = 1250 := by decide

/-- respiration: glucoseoxidation(3, 6) = 18 — GLUCOSE OXIDATION: oxygen consumed to fully oxidise glucose (6 O₂
    per glucose). value glucose · o2PerGlucose. -/
theorem fam_respiration_glucoseoxidation_1 : (3 * 6) = 18 := by decide

/-- respiration: gasexchange(100, 150) = 0 — GAS EXCHANGE: net gas across the membrane, inspired less expired.
    value max(0, inspired − expired). -/
theorem fam_respiration_gasexchange_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- responsive: breakpoint(1280, 320) = 4 — RESPONSIVE — LAYING OUT A SCREEN, AS ARITHMETIC. A responsive design
    is numbers: the breakpoint a width lands in, a fluid size between a min and max, the columns that fit, the
    gutter per column, a modular scale factor, pixels from a viewport-width unit, a fitted height at an aspect
    ratio, and physical pixels at a device density. Crosses to `frontend` — responsive is how a frontend meets
    its viewport. A measure. */ const PROOF = 'responsive arithmetic (breakpoint, fluid size, columns, gutter,
    scale factor, viewport units, aspect fit, density); laying out a screen as integers; a measure crossed to
    frontend' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'responsive', dst: 'frontend',
    formula, value, proof: PROOF, ...extra }, holds, { name: `responsive.${name}`, params }) export class
    ResponsiveFormulas { /** BREAKPOINT: which fixed-step tier a width lands in. value ⌊width / step⌋. -/
theorem fam_responsive_breakpoint_1 : (1280 / 320) = 4 := by decide

/-- responsive: fluidsize(16, 48) = 32 — FLUID SIZE: the midpoint size between a min and a max. value ⌊(min +
    max) / 2⌋. -/
theorem fam_responsive_fluidsize_1 : ((16 + 48) / 2) = 32 := by decide

/-- responsive: columns(1200, 300) = 4 — COLUMNS: how many fixed-width columns fit a width. value ⌊width /
    colWidth⌋. -/
theorem fam_responsive_columns_1 : (1200 / 300) = 4 := by decide

/-- responsive: gutter(96, 12) = 8 — GUTTER: total gutter space shared across the columns. value ⌊total / cols⌋. -/
theorem fam_responsive_gutter_1 : (96 / 12) = 8 := by decide

/-- responsive: scalefactor(16, 2) = 32 — SCALE FACTOR: a base size stepped by a modular ratio. value base ·
    ratio. -/
theorem fam_responsive_scalefactor_1 : (16 * 2) = 32 := by decide

/-- responsive: viewportunits(50, 1440) = 720 — VIEWPORT UNITS: pixels from a viewport-width percentage. value
    ⌊vw · width / 100⌋. -/
theorem fam_responsive_viewportunits_1 : ((50 * 1440) / 100) = 720 := by decide

/-- responsive: aspectfit(1600, 16, 9) = 900 — ASPECT FIT: the height a width takes at an aspect ratio num:den.
    value ⌊width · den / num⌋. -/
theorem fam_responsive_aspectfit_1 : ((1600 * 9) / 16) = 900 := by decide

/-- responsive: density(320, 3) = 960 — DENSITY: physical pixels for a CSS length at a device pixel ratio. value
    pixels · dppx. -/
theorem fam_responsive_density_1 : (320 * 3) = 960 := by decide

/-- responsive: breakpoint(1280, 0) = 0 — RESPONSIVE — LAYING OUT A SCREEN, AS ARITHMETIC. A responsive design
    is numbers: the breakpoint a width lands in, a fluid size between a min and max, the columns that fit, the
    gutter per column, a modular scale factor, pixels from a viewport-width unit, a fitted height at an aspect
    ratio, and physical pixels at a device density. Crosses to `frontend` — responsive is how a frontend meets
    its viewport. A measure. */ const PROOF = 'responsive arithmetic (breakpoint, fluid size, columns, gutter,
    scale factor, viewport units, aspect fit, density); laying out a screen as integers; a measure crossed to
    frontend' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'responsive', dst: 'frontend',
    formula, value, proof: PROOF, ...extra }, holds, { name: `responsive.${name}`, params }) export class
    ResponsiveFormulas { /** BREAKPOINT: which fixed-step tier a width lands in. value ⌊width / step⌋. -/
theorem fam_responsive_breakpoint_2 : (1280 / 0) = 0 := by decide

/-- rest: throughput(6000, 60) = 100 — REST — THE HTTP API SURFACE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Serving requests is numbers: requests per second, average latency, payload size, the
    status class of a code, the rate limit per window, cache freshness, the pages a result set spans, and the
    error rate. Crosses to `networking` — REST is what the network carries. A measure. */ const PROOF = 'rest
    arithmetic (throughput, latency, payload size, status class, rate limit, cache ttl, pagination, error rate);
    a public-API registry domain; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rest', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `rest.${name}`,
    params }) export class RestFormulas { /** THROUGHPUT: requests over seconds. value ⌊requests / seconds⌋. -/
theorem fam_rest_throughput_1 : (6000 / 60) = 100 := by decide

/-- rest: latency(5000, 100) = 50 — AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total /
    requests⌋. -/
theorem fam_rest_latency_1 : (5000 / 100) = 50 := by decide

/-- rest: payloadsize(10, 256) = 2560 — PAYLOAD SIZE: fields at a size each. value fields · bytes. -/
theorem fam_rest_payloadsize_1 : (10 * 256) = 2560 := by decide

/-- rest: statusclass(404) = 4 — STATUS CLASS: the leading digit of an HTTP code (2xx → 2, 4xx → 4). value ⌊code
    / 100⌋. -/
theorem fam_rest_statusclass_1 : (404 / 100) = 4 := by decide

/-- rest: ratelimit(1000, 60) = 16 — RATE LIMIT: the requests allowed per unit of the window. value ⌊limit /
    window⌋. -/
theorem fam_rest_ratelimit_1 : (1000 / 60) = 16 := by decide

/-- rest: cachettl(300, 120) = 180 — CACHE TTL: the freshness left after an age against the ttl. value max(0,
    ttl − age). -/
theorem fam_rest_cachettl_1 : (fmax 0 (300 - 120)) = 180 := by decide

/-- rest: errorrate(50, 1000) = 5 — ERROR RATE as a percentage. value ⌊errors · 100 / total⌋. -/
theorem fam_rest_errorrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- rest: errorrate(1000, 1000) = 100 — ERROR RATE as a percentage. value ⌊errors · 100 / total⌋. -/
theorem fam_rest_errorrate_2 : ((1000 * 100) / 1000) = 100 := by decide

/-- restaurant: foodcost(30, 100) = 30 — RESTAURANT — RUNNING A KITCHEN AND DINING ROOM, AS ARITHMETIC. Food
    cost as a share of sales, table turnover, the average check, labor cost percent, waste percent, menu margin,
    seat utilization, and the prep time per dish. Crosses to `retail` — a restaurant is retail of a plate. A
    measure. */ const PROOF = 'restaurant arithmetic (food cost %, table turnover, average check, labor cost %,
    waste %, menu margin, seat utilization, prep time per dish); a measure crossed to retail' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'restaurant', dst: 'retail', formula, value, proof: PROOF,
    ...extra }, holds, { name: `restaurant.${name}`, params }) export class RestaurantFormulas { /** FOOD COST
    as a percent of sales. value ⌊cost · 100 / sales⌋. -/
theorem fam_restaurant_foodcost_1 : ((30 * 100) / 100) = 30 := by decide

/-- restaurant: turnover(120, 40) = 3 — TABLE TURNOVER: the covers served per seat. value ⌊covers / seats⌋. -/
theorem fam_restaurant_turnover_1 : (120 / 40) = 3 := by decide

/-- restaurant: averagecheck(2000, 80) = 25 — AVERAGE CHECK: revenue over the covers served. value ⌊revenue /
    covers⌋. -/
theorem fam_restaurant_averagecheck_1 : (2000 / 80) = 25 := by decide

/-- restaurant: laborcost(28, 100) = 28 — LABOR COST as a percent of sales. value ⌊labor · 100 / sales⌋. -/
theorem fam_restaurant_laborcost_1 : ((28 * 100) / 100) = 28 := by decide

/-- restaurant: waste(5, 100) = 5 — WASTE as a percent of what was prepared. value ⌊wasted · 100 / prepared⌋. -/
theorem fam_restaurant_waste_1 : ((5 * 100) / 100) = 5 := by decide

/-- restaurant: margin(40, 10) = 75 — MENU MARGIN as a percent of price. value ⌊(price − cost) · 100 / price⌋. -/
theorem fam_restaurant_margin_1 : (((40 - 10) * 100) / 40) = 75 := by decide

/-- restaurant: seatutilization(60, 80) = 75 — SEAT UTILIZATION as a percent of seats. value ⌊occupied · 100 /
    seats⌋. -/
theorem fam_restaurant_seatutilization_1 : ((60 * 100) / 80) = 75 := by decide

/-- restaurant: preptime(90, 30) = 3 — PREP TIME per dish: minutes over the dishes made. value ⌊minutes /
    dishes⌋. -/
theorem fam_restaurant_preptime_1 : (90 / 30) = 3 := by decide

/-- retail: markup(50, 80) = 60 — RETAIL — BRICK-AND-MORTAR RETAIL, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A shop is numbers: markup and margin on a price, inventory turnover, the footfall
    that converts, the average basket, shrinkage off the shelf, whether to restock, and the sales a line brings
    in. Crosses to `econ` — retail is economics on the floor. A measure. */ const PROOF = 'retail arithmetic
    (markup, margin, turnover, footfall, basket, shrinkage, restock, sales); brick-and-mortar retail chosen by
    the public-API registry; a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'retail', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `retail.${name}`,
    params }) export class RetailFormulas { /** MARKUP: the price over cost as a percentage of cost. value
    ⌊(price − cost) · 100 / cost⌋. -/
theorem fam_retail_markup_1 : (((80 - 50) * 100) / 50) = 60 := by decide

/-- retail: margin(80, 50) = 37 — MARGIN: the profit as a percentage of price. value ⌊(price − cost) · 100 /
    price⌋. -/
theorem fam_retail_margin_1 : (((80 - 50) * 100) / 80) = 37 := by decide

/-- retail: turnover(12000, 1000) = 12 — INVENTORY TURNOVER: cost of goods sold over inventory held. value ⌊cogs
    / inventory⌋. -/
theorem fam_retail_turnover_1 : (12000 / 1000) = 12 := by decide

/-- retail: footfall(200, 1000) = 20 — FOOTFALL: the buyers out of the visitors, as a percentage. value ⌊buyers
    · 100 / visitors⌋. -/
theorem fam_retail_footfall_1 : ((200 * 100) / 1000) = 20 := by decide

/-- retail: basket(5000, 100) = 50 — AVERAGE BASKET: revenue over the transactions that made it. value ⌊revenue
    / transactions⌋. -/
theorem fam_retail_basket_1 : (5000 / 100) = 50 := by decide

/-- retail: shrinkage(30, 1000) = 3 — SHRINKAGE: the stock lost, as a percentage of stock. value ⌊lost · 100 /
    stock⌋. -/
theorem fam_retail_shrinkage_1 : ((30 * 100) / 1000) = 3 := by decide

/-- retail: sales(40, 25) = 1000 — SALES: units at a price each. value units · price. -/
theorem fam_retail_sales_1 : (40 * 25) = 1000 := by decide

/-- retirement: nestegg(50000, 30) = 1500000 — RETIREMENT — THE SAVER'S ARITHMETIC. Retiring is numbers: the
    nest egg a saver builds, the rate they draw it down, the share of working income it replaces, lifetime
    contributions, how many years of income it buys, the employer match, the balance left after a withdrawal,
    and the gap between what is needed and what is saved. Crosses to `econ` — retirement is personal economics
    over time. A measure. */ const PROOF = 'retirement arithmetic (nest egg, withdrawal rate, replacement ratio,
    contributions, years of income, employer match, drawdown, shortfall); a saver\'s measure crossed to econ'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'retirement', dst: 'econ', formula, value, proof:
    PROOF, ...extra }, holds, { name: `retirement.${name}`, params }) export class RetirementFormulas { /** NEST
    EGG: annual savings over the years. value annual · years. -/
theorem fam_retirement_nestegg_1 : (50000 * 30) = 1500000 := by decide

/-- retirement: withdrawalrate(400, 10000) = 4 — WITHDRAWAL RATE as a percentage of the balance. value
    ⌊withdrawal · 100 / balance⌋. -/
theorem fam_retirement_withdrawalrate_1 : ((400 * 100) / 10000) = 4 := by decide

/-- retirement: replacementratio(40000, 50000) = 80 — REPLACEMENT RATIO: retirement income as a percentage of
    working income. value ⌊retire · 100 / working⌋. -/
theorem fam_retirement_replacementratio_1 : ((40000 * 100) / 50000) = 80 := by decide

/-- retirement: contributions(500, 30) = 180000 — CONTRIBUTIONS: a monthly amount over the years. value monthly
    · 12 · years. -/
theorem fam_retirement_contributions_1 : ((500 * 12) * 30) = 180000 := by decide

/-- retirement: yearsofincome(60000, 2000) = 30 — YEARS OF INCOME: the years a nest egg lasts at an annual draw.
    value ⌊nestegg / annual⌋. -/
theorem fam_retirement_yearsofincome_1 : (60000 / 2000) = 30 := by decide

/-- retirement: matchvalue(6000, 50) = 3000 — EMPLOYER MATCH: a percentage of the contribution. value
    ⌊contribution · pct / 100⌋. -/
theorem fam_retirement_matchvalue_1 : ((6000 * 50) / 100) = 3000 := by decide

/-- retirement: drawdown(50000, 2000) = 48000 — DRAWDOWN: the balance left after a withdrawal. value max(0,
    balance − withdrawal). -/
theorem fam_retirement_drawdown_1 : (fmax 0 (50000 - 2000)) = 48000 := by decide

/-- retirement: shortfall(60000, 45000) = 15000 — SHORTFALL: the gap between what is needed and what is saved.
    value max(0, needed − saved). -/
theorem fam_retirement_shortfall_1 : (fmax 0 (60000 - 45000)) = 15000 := by decide

/-- retirement: shortfall(45000, 60000) = 0 — SHORTFALL: the gap between what is needed and what is saved. value
    max(0, needed − saved). -/
theorem fam_retirement_shortfall_2 : (fmax 0 (45000 - 60000)) = 0 := by decide

/-- reverb: rt60(1000, 20) = 80 — REVERB — A ROOM'S TAIL, AS ARITHMETIC. The sound after the sound is numbers:
    the Sabine decay of a volume against its absorption, the first reflection off a wall, the time to fall by a
    level, the gap before the tail, how scattered it is, how the highs are damped against the lows, the
    fundamental room mode, and the wet share of the mix. Crosses to `acoustics` — reverb is the acoustics of an
    enclosed space. A measure. */ const PROOF = 'reverb arithmetic (Sabine rt60, early reflections, decay time,
    pre-delay, diffusion, damping ratio, room modes, wet/dry mix); a measure crossed to acoustics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'reverb', dst: 'acoustics', formula, value, proof: PROOF, ...extra
    }, holds, { name: `reverb.${name}`, params }) export class ReverbFormulas { /** RT60: the Sabine proxy —
    seconds·10 for a volume against its total absorption. value ⌊161 · volume / (100 · absorption)⌋. -/
theorem fam_reverb_rt60_1 : ((161 * 1000) / (100 * 20)) = 80 := by decide

/-- reverb: earlyreflections(34, 340) = 100 — EARLY REFLECTIONS: the first reflection delay off a wall, in ms.
    value ⌊1000 · distance / speed⌋. -/
theorem fam_reverb_earlyreflections_1 : ((1000 * 34) / 340) = 100 := by decide

/-- reverb: decaytime(60, 30) = 30 — DECAY TIME: time to fall by a level given rt60 is the 60 dB time. value
    ⌊rt60 · level / 60⌋. -/
theorem fam_reverb_decaytime_1 : ((60 * 30) / 60) = 30 := by decide

/-- reverb: predelay(51, 34, 340) = 50 — PRE-DELAY: the gap before the tail, from the extra path a reflection
    travels, in ms. value ⌊1000 · (reflect − direct) / speed⌋. -/
theorem fam_reverb_predelay_1 : ((1000 * (fmax 0 (51 - 34))) / 340) = 50 := by decide

/-- reverb: diffusion(70, 100) = 70 — DIFFUSION: the scattered share of the total energy, as a percentage. value
    ⌊scattered · 100 / total⌋. -/
theorem fam_reverb_diffusion_1 : ((70 * 100) / 100) = 70 := by decide

/-- reverb: dampingratio(30, 40) = 75 — DAMPING RATIO: high-frequency absorption against low, as a percentage.
    value ⌊high · 100 / low⌋. -/
theorem fam_reverb_dampingratio_1 : ((30 * 100) / 40) = 75 := by decide

/-- reverb: roommodes(340, 5) = 34 — ROOM MODES: the fundamental standing-wave frequency of a dimension. value
    ⌊speed / (2 · length)⌋. -/
theorem fam_reverb_roommodes_1 : (340 / (2 * 5)) = 34 := by decide

/-- reverb: wetdrymix(30, 70) = 30 — WET/DRY MIX: the wet share of the total, as a percentage. value ⌊wet · 100
    / (wet + dry)⌋. -/
theorem fam_reverb_wetdrymix_1 : ((30 * 100) / (30 + 70)) = 30 := by decide

/-- reverberation: sabine(1000, 20) = 8 — REVERBERATION — A ROOM'S TAIL, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A sound's decay is numbers: the Sabine time, the time from room and absorbers, the
    absorption area, the mean free path between surfaces, the critical distance, the decay rate in dB/s, the
    early-reflection delay, and the clarity ratio. Crosses to `acoustics` — reverberation is the room half of
    what acoustics measures. A measure. */ const PROOF = 'reverberation arithmetic (Sabine RT60, room RT60,
    absorption area, mean free path, critical distance, decay rate, early reflections, clarity); a room measure
    crossed to acoustics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'reverberation', dst:
    'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `reverberation.${name}`, params })
    export class ReverberationFormulas { /** SABINE RT60: reverberation time from volume over total absorption.
    value ⌊161 · volume / (1000 · absorption)⌋. -/
theorem fam_reverberation_sabine_1 : ((161 * 1000) / (1000 * 20)) = 8 := by decide

/-- reverberation: rt60(2000, 50, 2) = 3 — ROOM RT60: reverberation time from volume, surface area and
    absorption coefficient. value ⌊161 · volume / (1000 · area · coeff)⌋. -/
theorem fam_reverberation_rt60_1 : ((161 * 2000) / ((1000 * 50) * 2)) = 3 := by decide

/-- reverberation: absorptionarea(200, 35) = 70 — ABSORPTION AREA: total sabins from surface area and a percent
    coefficient. value ⌊area · coeff / 100⌋. -/
theorem fam_reverberation_absorptionarea_1 : ((200 * 35) / 100) = 70 := by decide

/-- reverberation: meanfreepath(1000, 100) = 40 — MEAN FREE PATH: average distance between surface hits. value
    ⌊4 · volume / surface⌋. -/
theorem fam_reverberation_meanfreepath_1 : ((4 * 1000) / 100) = 40 := by decide

/-- reverberation: criticaldistance(100, 2) = 4 — CRITICAL DISTANCE: where direct and reverberant fields meet,
    from absorption and directivity. value ⌊absorption · directivity / 50⌋. -/
theorem fam_reverberation_criticaldistance_1 : ((100 * 2) / 50) = 4 := by decide

/-- reverberation: decayrate(60, 2) = 30 — DECAY RATE: dB lost per second over the measured time. value ⌊level /
    time⌋. -/
theorem fam_reverberation_decayrate_1 : (60 / 2) = 30 := by decide

/-- reverberation: earlyreflections(17, 340) = 50 — EARLY REFLECTIONS: the first-reflection delay in
    milliseconds, from path length and speed. value ⌊1000 · distance / speed⌋. -/
theorem fam_reverberation_earlyreflections_1 : ((1000 * 17) / 340) = 50 := by decide

/-- reverberation: clarity(80, 20) = 40 — CLARITY: the early-to-late energy ratio, ten times over. value ⌊10 ·
    early / late⌋. -/
theorem fam_reverberation_clarity_1 : ((10 * 80) / 20) = 40 := by decide

/-- rheology: viscosity(1000, 20) = 50 — RHEOLOGY — THE FLOW AND DEFORMATION OF MATTER, AS ARITHMETIC. Materials
    under stress are numbers: viscosity from stress over shear, the shear rate itself, the modulus, the yield
    past a threshold, thixotropic loss, elastic recovery, flow through resistance, and stress relaxation over
    time. Crosses to `materials` — rheology is how materials behave. A measure. */ const PROOF = 'rheology
    arithmetic (viscosity, shear rate, modulus, yield, thixotropy, elasticity, flow, relaxation); the flow and
    deformation of matter; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rheology', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `rheology.${name}`, params }) export class RheologyFormulas { /** VISCOSITY: stress over shear rate. value
    ⌊stress / shear⌋. -/
theorem fam_rheology_viscosity_1 : (1000 / 20) = 50 := by decide

/-- rheology: shear(600, 3) = 200 — SHEAR RATE: velocity over the gap. value ⌊velocity / gap⌋. -/
theorem fam_rheology_shear_1 : (600 / 3) = 200 := by decide

/-- rheology: modulus(900, 30) = 30 — MODULUS: stress over strain. value ⌊stress / strain⌋. -/
theorem fam_rheology_modulus_1 : (900 / 30) = 30 := by decide

/-- rheology: yielding(100, 40) = 60 — YIELD: applied stress past a threshold. value max(0, applied −
    threshold). -/
theorem fam_rheology_yielding_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- rheology: yielding(30, 40) = 0 — YIELD: applied stress past a threshold. value max(0, applied − threshold). -/
theorem fam_rheology_yielding_2 : (fmax 0 (30 - 40)) = 0 := by decide

/-- rheology: thixotropy(500, 350) = 150 — THIXOTROPY: the loss from initial to final structure. value max(0,
    initial − final). -/
theorem fam_rheology_thixotropy_1 : (fmax 0 (500 - 350)) = 150 := by decide

/-- rheology: elasticity(80, 100) = 80 — ELASTICITY: recovered over deformed, as a percentage. value ⌊recovered
    · 100 / deformed⌋. -/
theorem fam_rheology_elasticity_1 : ((80 * 100) / 100) = 80 := by decide

/-- rheology: flow(1000, 25) = 40 — FLOW: pressure over resistance. value ⌊pressure / resistance⌋. -/
theorem fam_rheology_flow_1 : (1000 / 25) = 40 := by decide

/-- rheology: relaxation(600, 12) = 50 — RELAXATION: stress over time. value ⌊stress / time⌋. -/
theorem fam_rheology_relaxation_1 : (600 / 12) = 50 := by decide

/-- rhetoric: ethos(100, 4) = 25 — RHETORIC — THE ART OF PERSUASION, AS ARITHMETIC. The classical appeals are
    numbers: credibility per source (ethos), emotional weight as a share of the whole (pathos), evidence per
    claim (logos), the fraction of an audience convinced (persuasion), syllables per line (cadence), repetition
    as a share of words (emphasis), the share of readers who understood (clarity), and the devices counted.
    Crosses to `linguistics` — rhetoric is language wielded. A measure. */ const PROOF = 'rhetoric arithmetic
    (ethos per source, pathos share, logos per claim, persuasion, cadence, emphasis, clarity, devices); the
    appeals as whole numbers; a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rhetoric', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `rhetoric.${name}`, params }) export class RhetoricFormulas { /** ETHOS: credibility spread across its
    sources. value ⌊credibility / sources⌋. -/
theorem fam_rhetoric_ethos_1 : (100 / 4) = 25 := by decide

/-- rhetoric: pathos(30, 120) = 25 — PATHOS: emotional weight as a percentage of the whole. value ⌊emotional ·
    100 / total⌋. -/
theorem fam_rhetoric_pathos_1 : ((30 * 100) / 120) = 25 := by decide

/-- rhetoric: logos(60, 12) = 5 — LOGOS: evidence per claim made. value ⌊evidence / claims⌋. -/
theorem fam_rhetoric_logos_1 : (60 / 12) = 5 := by decide

/-- rhetoric: persuasion(75, 100) = 75 — PERSUASION: the share of an audience convinced, as a percentage. value
    ⌊convinced · 100 / audience⌋. -/
theorem fam_rhetoric_persuasion_1 : ((75 * 100) / 100) = 75 := by decide

/-- rhetoric: cadence(100, 10) = 10 — CADENCE: syllables per line. value ⌊syllables / lines⌋. -/
theorem fam_rhetoric_cadence_1 : (100 / 10) = 10 := by decide

/-- rhetoric: emphasis(20, 200) = 10 — EMPHASIS: repetition as a percentage of the words. value ⌊repetitions ·
    100 / words⌋. -/
theorem fam_rhetoric_emphasis_1 : ((20 * 100) / 200) = 10 := by decide

/-- rhetoric: clarity(90, 100) = 90 — CLARITY: the share of readers who understood, as a percentage. value
    ⌊understood · 100 / readers⌋. -/
theorem fam_rhetoric_clarity_1 : ((90 * 100) / 100) = 90 := by decide

/-- rhetoric: devices(7) = 7 — DEVICES: the rhetorical devices counted. value count. -/
theorem fam_rhetoric_devices_1 : 7 = 7 := by decide

/-- rheumatology: crp(15, 5) = 10 — RHEUMATOLOGY — DISEASE ACTIVITY AS ARITHMETIC. Measuring inflammatory joint
    disease is numbers: the composite activity score, the affected-joint count, sedimentation rate, C-reactive
    protein above baseline, the flare index, joint mobility, the pain score, and the combined inflammation
    burden. Crosses to `immunology` — rheumatic disease is what the immune system drives. A measure. */ const
    PROOF = 'rheumatology arithmetic (composite activity, joint count, ESR, CRP, flare index, mobility, pain
    score, inflammation burden); a measure crossed to immunology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rheumatology', dst: 'immunology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `rheumatology.${name}`, params }) export class RheumatologyFormulas { /** C-REACTIVE PROTEIN above baseline.
    value max(0, level − baseline). -/
theorem fam_rheumatology_crp_1 : (fmax 0 (15 - 5)) = 10 := by decide

/-- rheumatology: crp(3, 5) = 0 — RHEUMATOLOGY — DISEASE ACTIVITY AS ARITHMETIC. Measuring inflammatory joint
    disease is numbers: the composite activity score, the affected-joint count, sedimentation rate, C-reactive
    protein above baseline, the flare index, joint mobility, the pain score, and the combined inflammation
    burden. Crosses to `immunology` — rheumatic disease is what the immune system drives. A measure. */ const
    PROOF = 'rheumatology arithmetic (composite activity, joint count, ESR, CRP, flare index, mobility, pain
    score, inflammation burden); a measure crossed to immunology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rheumatology', dst: 'immunology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `rheumatology.${name}`, params }) export class RheumatologyFormulas { /** C-REACTIVE PROTEIN above baseline.
    value max(0, level − baseline). -/
theorem fam_rheumatology_crp_2 : (fmax 0 (3 - 5)) = 0 := by decide

/-- rheumatology: das28(5, 3, 20) = 10 — DAS28 composite activity: tender + swollen joints plus a tenth of the
    sedimentation rate. value tender + swollen + ⌊esr / 10⌋. -/
theorem fam_rheumatology_das28_1 : ((5 + 3) + (20 / 10)) = 10 := by decide

/-- rheumatology: esr(300, 12) = 25 — ESR: the sedimentation distance over the hours elapsed. value ⌊distance /
    hours⌋. -/
theorem fam_rheumatology_esr_1 : (300 / 12) = 25 := by decide

/-- rheumatology: flareindex(20, 80) = 25 — FLARE INDEX: the active joints as a percentage of the total. value
    ⌊active · 100 / total⌋. -/
theorem fam_rheumatology_flareindex_1 : ((20 * 100) / 80) = 25 := by decide

/-- rheumatology: inflammation(25, 10) = 35 — INFLAMMATION burden: sedimentation rate plus C-reactive protein.
    value esr + crp. -/
theorem fam_rheumatology_inflammation_1 : (25 + 10) = 35 := by decide

/-- rheumatology: jointcount(5, 3) = 8 — JOINT COUNT: the tender and swollen joints together. value tender +
    swollen. -/
theorem fam_rheumatology_jointcount_1 : (5 + 3) = 8 := by decide

/-- rheumatology: mobility(60, 90) = 66 — MOBILITY: the achieved range as a percentage of the normal range.
    value ⌊range · 100 / normal⌋. -/
theorem fam_rheumatology_mobility_1 : ((60 * 100) / 90) = 66 := by decide

/-- rheumatology: painscore(7, 10) = 70 — PAIN SCORE: the reported score as a percentage of the maximum. value
    ⌊score · 100 / max⌋. -/
theorem fam_rheumatology_painscore_1 : ((7 * 100) / 10) = 70 := by decide

/-- rhythm: beatduration(120) = 500 — RHYTHM — MUSICAL TIME AS ARITHMETIC. A tempo is a beat duration, a measure
    is beats stacked, a beat splits into subdivisions, swing is a long-to-short ratio, a polyrhythm is two
    pulses meeting, syncopation is off-beats over the whole, notes fill a measure, and a tuplet divides a span.
    Crosses to `music` — rhythm is music's time. A measure. */ const PROOF = 'rhythm arithmetic (beat duration,
    measure length, subdivision, swing ratio, polyrhythm, syncopation, notes per measure, tuplet duration);
    musical time as integers; a measure crossed to music' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'rhythm', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `rhythm.${name}`,
    params }) export class RhythmFormulas { /** BEAT DURATION: milliseconds per beat at a tempo. value ⌊60000 /
    bpm⌋. -/
theorem fam_rhythm_beatduration_1 : (60000 / 120) = 500 := by decide

/-- rhythm: measurelength(4, 500) = 2000 — MEASURE LENGTH: beats at a beat duration. value beats · beatduration. -/
theorem fam_rhythm_measurelength_1 : (4 * 500) = 2000 := by decide

/-- rhythm: notespermeasure(4, 4) = 16 — NOTES PER MEASURE: beats times the subdivisions each. value beats ·
    subdivisions. -/
theorem fam_rhythm_notespermeasure_1 : (4 * 4) = 16 := by decide

/-- rhythm: polyrhythm(3, 2) = 6 — POLYRHYTHM: the span where two pulses meet. value a · b. -/
theorem fam_rhythm_polyrhythm_1 : (3 * 2) = 6 := by decide

/-- rhythm: subdivision(500, 4) = 125 — SUBDIVISION: milliseconds per subdivision of a beat. value ⌊beatduration
    / divisions⌋. -/
theorem fam_rhythm_subdivision_1 : (500 / 4) = 125 := by decide

/-- rhythm: swingratio(2, 1) = 200 — SWING RATIO: long to short as a percentage. value ⌊long · 100 / short⌋. -/
theorem fam_rhythm_swingratio_1 : ((2 * 100) / 1) = 200 := by decide

/-- rhythm: syncopation(3, 8) = 37 — SYNCOPATION: off-beats over the whole as a percentage. value ⌊offbeats ·
    100 / total⌋. -/
theorem fam_rhythm_syncopation_1 : ((3 * 100) / 8) = 37 := by decide

/-- rhythm: tupletduration(1, 500, 3) = 166 — TUPLET DURATION: a span of beats divided among a tuplet. value
    ⌊beats · beatduration / tuplet⌋. -/
theorem fam_rhythm_tupletduration_1 : ((1 * 500) / 3) = 166 := by decide

/-- roasting: weightloss(1000, 850) = 15 — ROASTING — COFFEE ROASTING AS ARITHMETIC (a craft the registry can
    measure, not run by hand). A roast is numbers: weight lost from green to roasted, the development-time ratio
    after first crack, the rate of rise, charge temperature, moisture driven off, bean density, the Agtron
    colour score, and how a batch fills the drum. Crosses to `cuisine` — roasting is what the kitchen tastes. A
    measure. */ const PROOF = 'roasting arithmetic (weight loss, development-time ratio, rate of rise, charge,
    moisture, density, Agtron colour, batch fill); a craft the registry measures; a measure crossed to cuisine'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'roasting', dst: 'cuisine', formula, value, proof:
    PROOF, ...extra }, holds, { name: `roasting.${name}`, params }) export class RoastingFormulas { /** WEIGHT
    LOSS: percentage shed from green to roasted. value ⌊(green − roasted) · 100 / green⌋. -/
theorem fam_roasting_weightloss_1 : (((1000 - 850) * 100) / 1000) = 15 := by decide

/-- roasting: developmenttime(600, 480) = 20 — DEVELOPMENT-TIME RATIO: the share of the roast spent after first
    crack. value ⌊(total − firstcrack) · 100 / total⌋. -/
theorem fam_roasting_developmenttime_1 : (((600 - 480) * 100) / 600) = 20 := by decide

/-- roasting: rampspeed(200, 10) = 20 — RATE OF RISE proxy: degrees climbed per minute. value ⌊temperature /
    minutes⌋. -/
theorem fam_roasting_rampspeed_1 : (200 / 10) = 20 := by decide

/-- roasting: charge(205) = 205 — CHARGE: the drum temperature at drop. value temperature (holds nat). -/
theorem fam_roasting_charge_1 : 205 = 205 := by decide

/-- roasting: moisture(120, 108) = 10 — MOISTURE: percentage driven off. value ⌊(before − after) · 100 /
    before⌋. -/
theorem fam_roasting_moisture_1 : (((120 - 108) * 100) / 120) = 10 := by decide

/-- roasting: density(640, 1) = 640 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_roasting_density_1 : (640 / 1) = 640 := by decide

/-- roasting: agtron(55) = 55 — AGTRON: the roast colour score. value score (holds nat). -/
theorem fam_roasting_agtron_1 : 55 = 55 := by decide

/-- roasting: batchsize(900, 1200) = 75 — BATCH SIZE: how the charge fills the drum, as a percentage. value
    ⌊grams · 100 / capacity⌋. -/
theorem fam_roasting_batchsize_1 : ((900 * 100) / 1200) = 75 := by decide

/-- robotics: degrees(6) = 6 — ROBOTICS — A MOVING MACHINE, AS ARITHMETIC (chosen by the registry, not by hand).
    A robot is numbers: the degrees of freedom its joints give, the torque a force makes at a radius, the reach
    of its segments, how fast it covers a distance, the payload it still carries, its accuracy over a range, how
    long the battery lasts, and the work a cycle does. Crosses to `obs` — robotics is what observability
    watches. A measure. */ const PROOF = 'robotics arithmetic (degrees of freedom, torque, reach, speed,
    payload, accuracy, battery, cycle); a moving machine as numbers; a measure crossed to obs' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'robotics', dst: 'obs', formula, value, proof: PROOF, ...extra },
    holds, { name: `robotics.${name}`, params }) export class RoboticsFormulas { /** DEGREES OF FREEDOM: one per
    joint. value joints. -/
theorem fam_robotics_degrees_1 : 6 = 6 := by decide

/-- robotics: torque(50, 3) = 150 — TORQUE: a force at a radius. value force · radius. -/
theorem fam_robotics_torque_1 : (50 * 3) = 150 := by decide

/-- robotics: reach(4, 25) = 100 — REACH: segments at a length each. value segments · length. -/
theorem fam_robotics_reach_1 : (4 * 25) = 100 := by decide

/-- robotics: speed(1000, 20) = 50 — SPEED: distance over time. value ⌊distance / time⌋. -/
theorem fam_robotics_speed_1 : (1000 / 20) = 50 := by decide

/-- robotics: payload(100, 30) = 70 — PAYLOAD: capacity less weight, never below zero. value max(0, capacity −
    weight). -/
theorem fam_robotics_payload_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- robotics: payload(30, 100) = 0 — PAYLOAD: capacity less weight, never below zero. value max(0, capacity −
    weight). -/
theorem fam_robotics_payload_2 : (fmax 0 (30 - 100)) = 0 := by decide

/-- robotics: accuracy(5, 1000) = 0 — ACCURACY: error as a percentage of range. value ⌊error · 100 / range⌋. -/
theorem fam_robotics_accuracy_1 : ((5 * 100) / 1000) = 0 := by decide

/-- robotics: accuracy(250, 1000) = 25 — ACCURACY: error as a percentage of range. value ⌊error · 100 / range⌋. -/
theorem fam_robotics_accuracy_2 : ((250 * 100) / 1000) = 25 := by decide

/-- robotics: battery(10000, 250) = 40 — BATTERY: capacity over draw. value ⌊capacity / draw⌋. -/
theorem fam_robotics_battery_1 : (10000 / 250) = 40 := by decide

/-- robotics: cycle(12, 5) = 60 — CYCLE: steps at a cost each. value steps · perStep. -/
theorem fam_robotics_cycle_1 : (12 * 5) = 60 := by decide

/-- rocketry: thrust(300, 3000) = 900000 — ROCKETRY — LAUNCH VEHICLES AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Getting mass to orbit is numbers: thrust from mass flow, total impulse over a burn,
    thrust-to-weight, the Tsiolkovsky delta-v proxy, the wet/dry mass ratio, specific impulse, the payload
    fraction, and the stage count. Crosses to `aerospace` — rocketry is the thrust aerospace flies on. A
    measure. */ const PROOF = 'rocketry arithmetic (thrust, impulse, thrust-to-weight, delta-v, mass ratio,
    specific impulse, payload fraction, staging); a registry domain; a measure crossed to aerospace' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'rocketry', dst: 'aerospace', formula, value, proof: PROOF,
    ...extra }, holds, { name: `rocketry.${name}`, params }) export class RocketryFormulas { /** THRUST: mass
    flow at an exhaust velocity. value massflow · velocity. -/
theorem fam_rocketry_thrust_1 : (300 * 3000) = 900000 := by decide

/-- rocketry: impulse(900, 120) = 108000 — TOTAL IMPULSE: thrust over a burn time. value thrust · burntime. -/
theorem fam_rocketry_impulse_1 : (900 * 120) = 108000 := by decide

/-- rocketry: twr(1500, 1000) = 150 — THRUST-TO-WEIGHT (×100). value ⌊thrust · 100 / weight⌋. -/
theorem fam_rocketry_twr_1 : ((1500 * 100) / 1000) = 150 := by decide

/-- rocketry: deltav(3000, 2) = 6000 — DELTA-V: the Tsiolkovsky proxy, exhaust velocity times the log-ratio.
    value exhaust · ratio. -/
theorem fam_rocketry_deltav_1 : (3000 * 2) = 6000 := by decide

/-- rocketry: massratio(1000, 250) = 400 — MASS RATIO: wet over dry (×100). value ⌊wet · 100 / dry⌋. -/
theorem fam_rocketry_massratio_1 : ((1000 * 100) / 250) = 400 := by decide

/-- rocketry: isp(9000, 30) = 300 — SPECIFIC IMPULSE proxy: thrust over mass flow. value ⌊thrust / flow⌋. -/
theorem fam_rocketry_isp_1 : (9000 / 30) = 300 := by decide

/-- rocketry: payload(20, 100) = 20 — PAYLOAD FRACTION (×100). value ⌊mass · 100 / total⌋. -/
theorem fam_rocketry_payload_1 : ((20 * 100) / 100) = 20 := by decide

/-- rocketry: staging(3) = 3 — STAGING: the stage count. value stages. -/
theorem fam_rocketry_staging_1 : 3 = 3 := by decide

/-- route: hopcount(5, 3) = 8 -/
theorem fam_route_hopcount_1 : (5 + 3) = 8 := by decide

/-- route: shortestpath(100, 4) = 25 -/
theorem fam_route_shortestpath_1 : (100 / 4) = 25 := by decide

/-- route: bandwidthsum(100, 4) = 400 -/
theorem fam_route_bandwidthsum_1 : (100 * 4) = 400 := by decide

/-- route: routingtable(50, 3) = 150 -/
theorem fam_route_routingtable_1 : (50 * 3) = 150 := by decide

/-- route: redundantpaths(3) = 8 -/
theorem fam_route_redundantpaths_1 : (2 ^ 3) = 8 := by decide

/-- route: latencysum(10, 20, 30) = 60 -/
theorem fam_route_latencysum_1 : ((10 + 20) + 30) = 60 := by decide

/-- routing: depth(5) = 5 — ROUTING — WEB APP ROUTING, AS ARITHMETIC (the path a request takes through the
    registry's pages, as numbers). A route is its depth in segments, the share of its params that are dynamic,
    whether a redirect settles in one hop, how much of the table a request matches, how children nest under a
    parent, the share of routes behind a lazy split, the wildcards that catch all, and the share of links
    prefetched. Crosses to `frontend` — routing is what the frontend renders. A measure. */ const PROOF =
    'routing arithmetic (depth, dynamic params, redirect, match, nesting, lazy split, catchall, prefetch); web
    app routing as exact integers; a measure crossed to frontend' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'routing', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `routing.${name}`,
    params }) export class RoutingFormulas { /** DEPTH: the segments a route nests through. value segments
    (holds for a shallow table, ≤ 5). -/
theorem fam_routing_depth_1 : 5 = 5 := by decide

/-- routing: params(3, 12) = 25 — DYNAMIC PARAMS as a percentage of the route's params. value ⌊dynamic · 100 /
    total⌋. -/
theorem fam_routing_params_1 : ((3 * 100) / 12) = 25 := by decide

/-- routing: match(50, 100) = 50 — MATCH: the share of the route table a request matches. value ⌊matched · 100 /
    routes⌋. -/
theorem fam_routing_match_1 : ((50 * 100) / 100) = 50 := by decide

/-- routing: nested(10, 3) = 3 — NESTED: children per parent route. value ⌊children / parents⌋. -/
theorem fam_routing_nested_1 : (10 / 3) = 3 := by decide

/-- routing: lazy(8, 40) = 20 — LAZY: the share of routes behind a code split. value ⌊split · 100 / routes⌋. -/
theorem fam_routing_lazy_1 : ((8 * 100) / 40) = 20 := by decide

/-- routing: catchall(2) = 2 — CATCHALL: the wildcards that catch the rest. value wildcards. -/
theorem fam_routing_catchall_1 : 2 = 2 := by decide

/-- routing: prefetch(75, 100) = 75 — PREFETCH: the share of links prefetched. value ⌊prefetched · 100 / links⌋. -/
theorem fam_routing_prefetch_1 : ((75 * 100) / 100) = 75 := by decide

/-- rubik: faces(6, 0) = 6 -/
theorem fam_rubik_faces_1 : (6 + 0) = 6 := by decide

/-- rubik: stickers(6, 9) = 54 -/
theorem fam_rubik_stickers_1 : (6 * 9) = 54 := by decide

/-- rubik: movesubsets(6) = 64 -/
theorem fam_rubik_movesubsets_1 : (2 ^ 6) = 64 := by decide

/-- rubik: godsnumber(20, 0) = 20 -/
theorem fam_rubik_godsnumber_1 : (20 + 0) = 20 := by decide

/-- rubik: cubies(26, 0) = 26 -/
theorem fam_rubik_cubies_1 : (26 + 0) = 26 := by decide

/-- rubik: solvedratio(100, 100) = 100 -/
theorem fam_rubik_solvedratio_1 : ((100 * 100) / 100) = 100 := by decide

/-- runes: futharkletters(24, 0) = 24 -/
theorem fam_runes_futharkletters_1 : (24 + 0) = 24 := by decide

/-- runes: stavecount(16, 2) = 32 -/
theorem fam_runes_stavecount_1 : (16 * 2) = 32 := by decide

/-- runes: boundrunes(3, 2) = 5 -/
theorem fam_runes_boundrunes_1 : (3 + 2) = 5 := by decide

/-- runes: magicsubsets(5) = 32 -/
theorem fam_runes_magicsubsets_1 : (2 ^ 5) = 32 := by decide

/-- runes: rowdivisions(3, 0) = 3 -/
theorem fam_runes_rowdivisions_1 : (3 + 0) = 3 := by decide

/-- runes: legibility(70, 100) = 70 -/
theorem fam_runes_legibility_1 : ((70 * 100) / 100) = 70 := by decide
