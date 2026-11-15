-- lean/FamiliesU.lean — GENERATED. THE FAMILIES, U — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- ui: clickdepth(3, 2) = 5 -/
theorem fam_ui_clickdepth_1 : (3 + 2) = 5 := by decide

/-- ui: elementcount(20, 4) = 80 -/
theorem fam_ui_elementcount_1 : (20 * 4) = 80 := by decide

/-- ui: responsiveness(90, 100) = 90 -/
theorem fam_ui_responsiveness_1 : ((90 * 100) / 100) = 90 := by decide

/-- ui: gridcells(12, 8) = 96 -/
theorem fam_ui_gridcells_1 : (12 * 8) = 96 := by decide

/-- ui: colorsubsets(4) = 16 -/
theorem fam_ui_colorsubsets_1 : (2 ^ 4) = 16 := by decide

/-- ui: accessibilityscore(85, 100) = 85 -/
theorem fam_ui_accessibilityscore_1 : ((85 * 100) / 100) = 85 := by decide

/-- ultrasonics: timeofflight(7500, 1500) = 10 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are
    numbers: the time a pulse takes there and back, the depth it reaches, its wavelength, how far it is
    attenuated, the Doppler shift off a moving target, the axial resolution, the acoustic impedance of the
    medium, and the near-field length of the probe. Crosses to `acoustics` — ultrasonics is acoustics above 20
    kHz. A measure. */ const PROOF = 'ultrasonics arithmetic (time of flight, depth, wavelength, attenuation,
    Doppler shift, axial resolution, acoustic impedance, near field); sound above hearing; a measure crossed to
    acoustics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ultrasonics', dst: 'acoustics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `ultrasonics.${name}`, params }) export class
    UltrasonicsFormulas { /** TIME OF FLIGHT: a pulse there and back over a distance at the speed of sound.
    value ⌊2 · distance / speed⌋. -/
theorem fam_ultrasonics_timeofflight_1 : ((2 * 7500) / 1500) = 10 := by decide

/-- ultrasonics: depth(1500, 4) = 3000 — DEPTH: the half of the round trip the echo returns from. value ⌊speed ·
    time / 2⌋. -/
theorem fam_ultrasonics_depth_1 : ((1500 * 4) / 2) = 3000 := by decide

/-- ultrasonics: wavelength(1500, 5) = 300 — WAVELENGTH: the speed of sound over the frequency. value ⌊speed /
    freq⌋. -/
theorem fam_ultrasonics_wavelength_1 : (1500 / 5) = 300 := by decide

/-- ultrasonics: attenuation(3, 50) = 150 — ATTENUATION: the loss over a distance at a per-unit coefficient.
    value coeff · distance. -/
theorem fam_ultrasonics_attenuation_1 : (3 * 50) = 150 := by decide

/-- ultrasonics: dopplershift(5000, 3, 1500) = 20 — DOPPLER SHIFT off a moving target. value ⌊2 · freq ·
    velocity / speed⌋. -/
theorem fam_ultrasonics_dopplershift_1 : (((2 * 5000) * 3) / 1500) = 20 := by decide

/-- ultrasonics: axialresolution(300, 2) = 300 — AXIAL RESOLUTION: half the spatial pulse length (cycles of a
    wavelength). value ⌊wavelength · cycles / 2⌋. -/
theorem fam_ultrasonics_axialresolution_1 : ((300 * 2) / 2) = 300 := by decide

/-- ultrasonics: acousticimpedance(1000, 1500) = 1500000 — ACOUSTIC IMPEDANCE: density times the speed of sound
    in the medium. value density · speed. -/
theorem fam_ultrasonics_acousticimpedance_1 : (1000 * 1500) = 1500000 := by decide

/-- underwriting: risk(50, 10) = 500 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Writing a policy is numbers: the risk rate from past claims, the base premium at a
    rate, the loading surcharge, the applicant's score, the accept/decline call, the exposure on the book, the
    reserve still owed, and the loss ratio. Crosses to `insurance` — underwriting is what an insurer does before
    it insures. A measure. */ const PROOF = 'underwriting arithmetic (risk rate, premium, loading, score,
    decline, exposure, reserve, loss ratio); the price of risk before a policy is written; a measure crossed to
    insurance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'underwriting', dst: 'insurance',
    formula, value, proof: PROOF, ...extra }, holds, { name: `underwriting.${name}`, params }) export class
    UnderwritingFormulas { /** RISK RATE: past claims per year, as a rate per hundred. value ⌊claims · 100 /
    years⌋. -/
theorem fam_underwriting_risk_1 : ((50 * 100) / 10) = 500 := by decide

/-- underwriting: premium(1000, 12) = 120 — PREMIUM: a base amount at a percentage rate. value ⌊base · rate /
    100⌋. -/
theorem fam_underwriting_premium_1 : ((1000 * 12) / 100) = 120 := by decide

/-- underwriting: loading(120, 25) = 30 — LOADING: a surcharge, a percentage of the premium. value ⌊premium ·
    pct / 100⌋. -/
theorem fam_underwriting_loading_1 : ((120 * 25) / 100) = 30 := by decide

/-- underwriting: score(850, 5) = 170 — SCORE: total factor points over the factors counted. value ⌊factors /
    count⌋. -/
theorem fam_underwriting_score_1 : (850 / 5) = 170 := by decide

/-- underwriting: exposure(100, 500) = 50000 — EXPOSURE: insured units at a value each. value units · value. -/
theorem fam_underwriting_exposure_1 : (100 * 500) = 50000 := by decide

/-- underwriting: reserve(1000, 400) = 600 — RESERVE: the incurred loss still owed after what is paid. value
    max(0, incurred − paid). -/
theorem fam_underwriting_reserve_1 : (fmax 0 (1000 - 400)) = 600 := by decide

/-- underwriting: ratio(600, 1000) = 60 — LOSS RATIO: losses over premiums, as a percentage. value ⌊losses · 100
    / premiums⌋. -/
theorem fam_underwriting_ratio_1 : ((600 * 100) / 1000) = 60 := by decide

/-- unemployment: ratepct(5, 100) = 5 -/
theorem fam_unemployment_ratepct_1 : ((5 * 100) / 100) = 5 := by decide

/-- unemployment: labourforce(1000, 100) = 100000 -/
theorem fam_unemployment_labourforce_1 : (1000 * 100) = 100000 := by decide

/-- unemployment: unemployed(100000, 20) = 5000 -/
theorem fam_unemployment_unemployed_1 : (100000 / 20) = 5000 := by decide

/-- unemployment: participationrate(63, 100) = 63 -/
theorem fam_unemployment_participationrate_1 : ((63 * 100) / 100) = 63 := by decide

/-- unemployment: naturalrate(4, 100) = 4 -/
theorem fam_unemployment_naturalrate_1 : ((4 * 100) / 100) = 4 := by decide

/-- unemployment: okunsgap(5, 4) = 1 -/
theorem fam_unemployment_okunsgap_1 : (fmax 0 (5 - 4)) = 1 := by decide

/-- unemployment: jobseekers(5000, 1) = 5000 -/
theorem fam_unemployment_jobseekers_1 : (5000 * 1) = 5000 := by decide

/-- unemployment: durationweeks(20, 6) = 26 -/
theorem fam_unemployment_durationweeks_1 : (20 + 6) = 26 := by decide

/-- upload: area(1920, 1080) = 2073600 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded
    image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail
    sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses
    to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic
    (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload
    CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. -/
theorem fam_upload_area_1 : (1920 * 1080) = 2073600 := by decide

/-- upload: aspect(1920, 1080) = 177 — ASPECT ratio, times a hundred. value ⌊width · 100 / height⌋. -/
theorem fam_upload_aspect_1 : ((1920 * 100) / 1080) = 177 := by decide

/-- upload: resize(1920, 50) = 960 — RESIZE a dimension by a percentage. value ⌊dim · pct / 100⌋. -/
theorem fam_upload_resize_1 : ((1920 * 50) / 100) = 960 := by decide

/-- upload: quality(1000000, 80) = 800000 — QUALITY: the bytes left after re-encoding at a percentage. value
    ⌊bytes · pct / 100⌋. -/
theorem fam_upload_quality_1 : ((1000000 * 80) / 100) = 800000 := by decide

/-- upload: thumbnail(150, 12) = 1800 — THUMBNAIL sheet: a square size times the count. value size · count. -/
theorem fam_upload_thumbnail_1 : (150 * 12) = 1800 := by decide

/-- upload: filesize(2073600, 24) = 6220800 — FILESIZE: the bytes a raw bitmap of so many pixels at a bit depth
    takes. value ⌊pixels · depth / 8⌋. -/
theorem fam_upload_filesize_1 : ((2073600 * 24) / 8) = 6220800 := by decide

/-- upload: crop(750, 1000) = 75 — CROP: the percentage of an image kept. value ⌊kept · 100 / total⌋. -/
theorem fam_upload_crop_1 : ((750 * 100) / 1000) = 75 := by decide

/-- urbanism: density(1000, 50) = 20 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the registry,
    not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its uses are,
    block area, intersections per area, floor-area ratio, people per area, and the share of residents a service
    reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure. */ const
    PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size, intersection
    density, floor-area ratio, population density, service coverage); a city measured as integers; a measure
    crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. -/
theorem fam_urbanism_density_1 : (1000 / 50) = 20 := by decide

/-- urbanism: jobshousing(1200, 1000) = 120 — JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. -/
theorem fam_urbanism_jobshousing_1 : ((1200 * 100) / 1000) = 120 := by decide

/-- urbanism: mixeduse(3, 10) = 30 — MIXED USE: the share of parcels carrying a mix, as a percentage. value
    ⌊uses · 100 / parcels⌋. -/
theorem fam_urbanism_mixeduse_1 : ((3 * 100) / 10) = 30 := by decide

/-- urbanism: blocksize(100, 80) = 8000 — BLOCK SIZE: a block's area from its two sides. value length · width. -/
theorem fam_urbanism_blocksize_1 : (100 * 80) = 8000 := by decide

/-- urbanism: intersectiondensity(200, 10) = 20 — INTERSECTION DENSITY: intersections over the area. value
    ⌊intersections / area⌋. -/
theorem fam_urbanism_intersectiondensity_1 : (200 / 10) = 20 := by decide

/-- urbanism: floorarearatio(250, 100) = 250 — FLOOR-AREA RATIO as a percentage of the lot. value ⌊floorarea ·
    100 / lotarea⌋. -/
theorem fam_urbanism_floorarearatio_1 : ((250 * 100) / 100) = 250 := by decide

/-- urbanism: populationdensity(50000, 25) = 2000 — POPULATION DENSITY: people over the area. value ⌊population
    / area⌋. -/
theorem fam_urbanism_populationdensity_1 : (50000 / 25) = 2000 := by decide

/-- urbanism: servicecoverage(950, 1000) = 95 — SERVICE COVERAGE: the share of residents a service reaches, as a
    percentage. value ⌊served · 100 / total⌋. -/
theorem fam_urbanism_servicecoverage_1 : ((950 * 100) / 1000) = 95 := by decide

/-- urology: flowrate(500, 25) = 20 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical
    registry, not by hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly
    output, stone size, voiding frequency, solute concentration, and the continence fraction. Crosses to `med` —
    urology is one of medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual
    fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas {
    /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. -/
theorem fam_urology_flowrate_1 : (500 / 25) = 20 := by decide

/-- urology: residual(50, 400) = 12 — RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value
    ⌊remaining · 100 / capacity⌋. -/
theorem fam_urology_residual_1 : ((50 * 100) / 400) = 12 := by decide

/-- urology: psa(12, 3) = 4 — PSA DENSITY: antigen over prostate volume. value ⌊antigen / volume⌋. -/
theorem fam_urology_psa_1 : (12 / 3) = 4 := by decide

/-- urology: output(1800, 24) = 75 — HOURLY OUTPUT: volume over the hours observed. value ⌊volume / hours⌋. -/
theorem fam_urology_output_1 : (1800 / 24) = 75 := by decide

/-- urology: stone(7) = 7 — STONE SIZE: the stone diameter itself. value diameter. -/
theorem fam_urology_stone_1 : 7 = 7 := by decide

/-- urology: frequency(8, 24) = 33 — VOIDING FREQUENCY: voids per hour, scaled. value ⌊voids · 100 / hours⌋. -/
theorem fam_urology_frequency_1 : ((8 * 100) / 24) = 33 := by decide

/-- urology: concentration(600, 2) = 300 — SOLUTE CONCENTRATION: solutes over volume. value ⌊solutes / volume⌋. -/
theorem fam_urology_concentration_1 : (600 / 2) = 300 := by decide

/-- urology: continence(27, 30) = 90 — CONTINENCE: dry days as a percentage of the total. value ⌊dry · 100 /
    total⌋. -/
theorem fam_urology_continence_1 : ((27 * 100) / 30) = 90 := by decide

/-- usability: success(90, 100) = 90 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC.
    Task success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS proxy, and
    retention. Crosses to `layout` — usability is what the arrangement of the screen earns or loses. A measure.
    */ const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability,
    time on task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to
    layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class
    UsabilityFormulas { /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 /
    attempts⌋. -/
theorem fam_usability_success_1 : ((90 * 100) / 100) = 90 := by decide

/-- usability: efficiency(5, 10) = 50 — EFFICIENCY: tasks finished per unit time, scaled. value ⌊tasks · 100 /
    time⌋. -/
theorem fam_usability_efficiency_1 : ((5 * 100) / 10) = 50 := by decide

/-- usability: errors(3, 100) = 3 — ERROR RATE: mistakes over tasks as a percentage. value ⌊mistakes · 100 /
    tasks⌋. -/
theorem fam_usability_errors_1 : ((3 * 100) / 100) = 3 := by decide

/-- usability: satisfaction(40, 50) = 80 — SATISFACTION: score over the maximum as a percentage. value ⌊score ·
    100 / max⌋. -/
theorem fam_usability_satisfaction_1 : ((40 * 100) / 50) = 80 := by decide

/-- usability: learnability(100, 4) = 25 — LEARNABILITY: improvement averaged over sessions. value ⌊improved /
    sessions⌋. -/
theorem fam_usability_learnability_1 : (100 / 4) = 25 := by decide

/-- usability: timeontask(600, 10) = 60 — TIME ON TASK: seconds averaged over tasks. value ⌊seconds / tasks⌋. -/
theorem fam_usability_timeontask_1 : (600 / 10) = 60 := by decide

/-- usability: sus(32) = 80 — SUS PROXY: a raw score scaled to the familiar 0–100 band. value ⌊raw · 25 / 10⌋. -/
theorem fam_usability_sus_1 : ((32 * 25) / 10) = 80 := by decide

/-- usability: retention(70, 100) = 70 — RETENTION: returning users over all users as a percentage. value
    ⌊returned · 100 / users⌋. -/
theorem fam_usability_retention_1 : ((70 * 100) / 100) = 70 := by decide
