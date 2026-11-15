-- lean/FamiliesA.lean — GENERATED. THE FAMILIES, A — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- absorption: coefficient(80, 100) = 80 — ABSORPTION — SOUND SWALLOWED BY A MATERIAL, AS ARITHMETIC. How much
    of a sound a surface takes in rather than returns: the absorption coefficient, the noise reduction
    coefficient, total sabins, loss on transmission, open porosity, the sound reduction index, a panel
    resonator's frequency, and characteristic acoustic impedance. Crosses to `acoustics` — absorption is what
    acoustics measures a room by. A measure. */ const PROOF = 'absorption arithmetic (coefficient, NRC, sabins,
    transmission loss, porosity, reduction index, panel resonance, impedance); sound taken in rather than
    returned; a measure crossed to acoustics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'absorption', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `absorption.${name}`, params }) export class AbsorptionFormulas { /** ABSORPTION COEFFICIENT: the fraction
    absorbed, as a percentage. value ⌊absorbed · 100 / incident⌋. -/
theorem fam_absorption_coefficient_1 : ((80 * 100) / 100) = 80 := by decide

/-- absorption: nrc(60, 80) = 70 — NOISE REDUCTION COEFFICIENT: the mean of a low- and high-band coefficient.
    value ⌊(low + high) / 2⌋. -/
theorem fam_absorption_nrc_1 : ((60 + 80) / 2) = 70 := by decide

/-- absorption: sabins(200, 75) = 15000 — SABINS: total absorption of a surface at a coefficient. value area ·
    coefficient. -/
theorem fam_absorption_sabins_1 : (200 * 75) = 15000 := by decide

/-- absorption: transmissionloss(1000, 100) = 90 — TRANSMISSION LOSS: the fraction not transmitted, as a
    percentage. value ⌊max(0, incident − transmitted) · 100 / incident⌋. -/
theorem fam_absorption_transmissionloss_1 : (((fmax 0 (1000 - 100)) * 100) / 1000) = 90 := by decide

/-- absorption: porosity(30, 120) = 25 — POROSITY: open voids over total volume, as a percentage. value ⌊voids ·
    100 / total⌋. -/
theorem fam_absorption_porosity_1 : ((30 * 100) / 120) = 25 := by decide

/-- absorption: reductionindex(95, 50) = 45 — SOUND REDUCTION INDEX: the level dropped across a partition. value
    max(0, level1 − level2). -/
theorem fam_absorption_reductionindex_1 : (fmax 0 (95 - 50)) = 45 := by decide

/-- absorption: reductionindex(50, 95) = 0 — SOUND REDUCTION INDEX: the level dropped across a partition. value
    max(0, level1 − level2). -/
theorem fam_absorption_reductionindex_2 : (fmax 0 (50 - 95)) = 0 := by decide

/-- absorption: panelresonance(6000, 40) = 150 — PANEL RESONANCE: a panel resonator's frequency, inverse to its
    mass-depth. value ⌊k / massDepth⌋. -/
theorem fam_absorption_panelresonance_1 : (6000 / 40) = 150 := by decide

/-- absorption: impedance(1, 340) = 340 — CHARACTERISTIC ACOUSTIC IMPEDANCE: density times the speed of sound.
    value density · speed. -/
theorem fam_absorption_impedance_1 : (1 * 340) = 340 := by decide

/-- accelerometer: gforce(2000, 1000) = 2 — ACCELEROMETER — A MOTION SENSOR, AS ARITHMETIC (chosen by the sensor
    registry, not by hand). Reading motion is numbers: the g-force a raw count means, sensitivity in output per
    g, the Nyquist bandwidth, the tilt angle off an axis, the RMS of a vibration, the zero-g offset, the
    full-scale span, and the sample rate over time. Crosses to `mechanical` — an accelerometer is what measures
    mechanical motion. A measure. */ const PROOF = 'accelerometer arithmetic (g-force, sensitivity, bandwidth,
    tilt, vibration RMS, zero-g offset, full-scale span, sample rate); a motion sensor read as a measure crossed
    to mechanical' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'accelerometer', dst: 'mechanical',
    formula, value, proof: PROOF, ...extra }, holds, { name: `accelerometer.${name}`, params }) export class
    AccelerometerFormulas { /** G-FORCE: a raw acceleration count in units of the gravity count. value ⌊accel /
    g⌋. -/
theorem fam_accelerometer_gforce_1 : (2000 / 1000) = 2 := by decide

/-- accelerometer: sensitivity(1000, 4) = 250 — SENSITIVITY: output millivolts over the g-range. value ⌊mv /
    grange⌋. -/
theorem fam_accelerometer_sensitivity_1 : (1000 / 4) = 250 := by decide

/-- accelerometer: bandwidth(1000) = 500 — BANDWIDTH: the Nyquist limit of a sample rate. value ⌊rate / 2⌋. -/
theorem fam_accelerometer_bandwidth_1 : (1000 / 2) = 500 := by decide

/-- accelerometer: tilt(500, 1000) = 45 — TILT: the degrees an axis reads of a full-scale quarter turn. value
    ⌊axis · 90 / full⌋. -/
theorem fam_accelerometer_tilt_1 : ((500 * 90) / 1000) = 45 := by decide

/-- accelerometer: vibrationrms(1000) = 707 — VIBRATION RMS: the RMS of a sinusoid at a peak (0.707 · peak).
    value ⌊peak · 707 / 1000⌋. -/
theorem fam_accelerometer_vibrationrms_1 : ((1000 * 707) / 1000) = 707 := by decide

/-- accelerometer: offset(2050, 2048) = 2 — ZERO-G OFFSET: how far a measured count sits above its reference.
    value max(0, measured − reference). -/
theorem fam_accelerometer_offset_1 : (fmax 0 (2050 - 2048)) = 2 := by decide

/-- accelerometer: offset(2048, 2050) = 0 — ZERO-G OFFSET: how far a measured count sits above its reference.
    value max(0, measured − reference). -/
theorem fam_accelerometer_offset_2 : (fmax 0 (2048 - 2050)) = 0 := by decide

/-- accelerometer: fullscale(8) = 16 — FULL-SCALE: the ±range span of a g-range. value range · 2. -/
theorem fam_accelerometer_fullscale_1 : (8 * 2) = 16 := by decide

/-- accelerometer: samplerate(6000, 60) = 100 — SAMPLE RATE: samples over seconds. value ⌊samples / seconds⌋. -/
theorem fam_accelerometer_samplerate_1 : (6000 / 60) = 100 := by decide

/-- accessibility: contrastratio(95, 5) = 1000 — ACCESSIBILITY — WHAT A FRONTEND OWES EVERY READER, AS
    ARITHMETIC. Reading a page is numbers: the contrast between ink and paper, whether a tap target is big
    enough for a thumb, text scaled to a reader's setting, the WCAG pass rate, how many images carry alt text,
    the rows a focus order walks, the share of elements that are labelled, and the grade a passage reads at.
    Crosses to `frontend` — accessibility is the frontend judged by who it leaves out. A measure. */ const PROOF
    = 'accessibility arithmetic (contrast ratio, tap target, text scale, WCAG score, alt coverage, focus order,
    aria labelling, reading level); the frontend judged by who it leaves out; a measure crossed to frontend'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'accessibility', dst: 'frontend', formula, value,
    proof: PROOF, ...extra }, holds, { name: `accessibility.${name}`, params }) export class
    AccessibilityFormulas { /** CONTRAST RATIO ·100: ink against paper, the two luminances offset by 5. value
    ⌊(light + 5) · 100 / (dark + 5)⌋. -/
theorem fam_accessibility_contrastratio_1 : (((95 + 5) * 100) / (5 + 5)) = 1000 := by decide

/-- accessibility: textscale(16, 150) = 24 — TEXT SCALE: base size at a reader's percent. value ⌊base · scale /
    100⌋. -/
theorem fam_accessibility_textscale_1 : ((16 * 150) / 100) = 24 := by decide

/-- accessibility: wcagscore(45, 50) = 90 — WCAG SCORE: checks passed over checks total, as a percentage. value
    ⌊passed · 100 / total⌋. -/
theorem fam_accessibility_wcagscore_1 : ((45 * 100) / 50) = 90 := by decide

/-- accessibility: altcoverage(80, 100) = 80 — ALT COVERAGE: images with alt text over all images. value
    ⌊withAlt · 100 / images⌋. -/
theorem fam_accessibility_altcoverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- accessibility: aria(90, 120) = 75 — ARIA: the share of elements carrying a label. value ⌊labelled · 100 /
    elements⌋. -/
theorem fam_accessibility_aria_1 : ((90 * 100) / 120) = 75 := by decide

/-- accessibility: readinglevel(1200, 100) = 12 — READING LEVEL: the grade a passage reads at, words over
    sentences. value ⌊words / sentences⌋. -/
theorem fam_accessibility_readinglevel_1 : (1200 / 100) = 12 := by decide

/-- acoustics: wavelength(343, 7) = 49 — ACOUSTICS — SOUND AS ARITHMETIC (chosen by the public-API registry, not
    by hand). A travelling wave is numbers: wavelength from speed and frequency, frequency from speed and
    wavelength, loudness in decibels, the Doppler shift, reverberation time by Sabine, attenuation with
    distance, acoustic impedance, and the resonance of a stretched string. Crosses to `seismology` — acoustics
    is the wave the ground also carries. A measure. */ const PROOF = 'acoustics arithmetic (wavelength,
    frequency, decibel, doppler, reverb, attenuation, impedance, resonance); sound as a travelling wave; a
    measure crossed to seismology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'acoustics', dst:
    'seismology', formula, value, proof: PROOF, ...extra }, holds, { name: `acoustics.${name}`, params }) export
    class AcousticsFormulas { /** WAVELENGTH: the speed of sound over its frequency. value ⌊speed / frequency⌋. -/
theorem fam_acoustics_wavelength_1 : (343 / 7) = 49 := by decide

/-- acoustics: frequency(343, 7) = 49 — FREQUENCY: the speed of sound over its wavelength. value ⌊speed /
    wavelength⌋. -/
theorem fam_acoustics_frequency_1 : (343 / 7) = 49 := by decide

/-- acoustics: doppler(440, 10) = 450 — DOPPLER: the shifted signal, emitted plus the velocity proxy. value
    emitted + velocity. -/
theorem fam_acoustics_doppler_1 : (440 + 10) = 450 := by decide

/-- acoustics: reverb(1000, 1) = 161 — REVERB: Sabine reverberation proxy, the room volume over its absorption.
    value ⌊volume · 161 / (absorption · 1000)⌋. -/
theorem fam_acoustics_reverb_1 : ((1000 * 161) / (1 * 1000)) = 161 := by decide

/-- acoustics: attenuation(100, 40) = 60 — ATTENUATION: the source level less the distance travelled, never
    below zero. value max(0, source − distance). -/
theorem fam_acoustics_attenuation_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- acoustics: impedance(1000, 343) = 343000 — IMPEDANCE: acoustic impedance, density times the speed of sound.
    value density · speed. -/
theorem fam_acoustics_impedance_1 : (1000 * 343) = 343000 := by decide

/-- acoustics: resonance(100, 4) = 25 — RESONANCE: a stretched string's resonance, tension over mass. value
    ⌊tension / mass⌋. -/
theorem fam_acoustics_resonance_1 : (100 / 4) = 25 := by decide

/-- acquisition: cac(10000, 50) = 200 — ACQUISITION — GROWTH AS ARITHMETIC (chosen by the registry, not by
    hand). Getting customers is numbers: what each one costs to win, the lifetime value over that cost, the
    months to pay the cost back, the lead-to-customer rate, a channel's share, the organic share, the signups a
    day, and the return on spend. Crosses to `analytics` — acquisition is what the numbers measure. A measure.
    */ const PROOF = 'acquisition arithmetic (CAC, LTV ratio, payback, conversion, channel share, organic share,
    velocity, ROI); a growth domain; a measure crossed to analytics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'acquisition', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds,
    { name: `acquisition.${name}`, params }) export class AcquisitionFormulas { /** CAC: acquisition spend over
    the customers won. value ⌊spend / customers⌋. -/
theorem fam_acquisition_cac_1 : (10000 / 50) = 200 := by decide

/-- acquisition: ltvratio(600, 200) = 300 — LTV RATIO: lifetime value over acquisition cost, as a percentage.
    value ⌊ltv · 100 / cac⌋. -/
theorem fam_acquisition_ltvratio_1 : ((600 * 100) / 200) = 300 := by decide

/-- acquisition: payback(200, 50) = 4 — PAYBACK: months to recover the acquisition cost at a monthly
    contribution. value ⌊cac / monthly⌋. -/
theorem fam_acquisition_payback_1 : (200 / 50) = 4 := by decide

/-- acquisition: conversion(25, 100) = 25 — CONVERSION: leads that became customers, as a percentage. value
    ⌊customers · 100 / leads⌋. -/
theorem fam_acquisition_conversion_1 : ((25 * 100) / 100) = 25 := by decide

/-- acquisition: channel(30, 120) = 25 — CHANNEL SHARE: a channel's acquired of the total, as a percentage.
    value ⌊acquired · 100 / total⌋. -/
theorem fam_acquisition_channel_1 : ((30 * 100) / 120) = 25 := by decide

/-- acquisition: organic(80, 200) = 40 — ORGANIC SHARE: organic of the total acquired, as a percentage. value
    ⌊organic · 100 / total⌋. -/
theorem fam_acquisition_organic_1 : ((80 * 100) / 200) = 40 := by decide

/-- acquisition: velocity(3000, 30) = 100 — VELOCITY: signups over the days. value ⌊signups / days⌋. -/
theorem fam_acquisition_velocity_1 : (3000 / 30) = 100 := by decide

/-- acquisition: roi(5000, 1000) = 500 — ROI: revenue over acquisition spend, as a percentage. value ⌊revenue ·
    100 / spend⌋. -/
theorem fam_acquisition_roi_1 : ((5000 * 100) / 1000) = 500 := by decide

/-- actionpotential: amplitude(100, 30) = 70 — ACTIONPOTENTIAL — THE NERVE IMPULSE, AS ARITHMETIC. The spike a
    neuron fires is numbers: how fast it conducts, how far the membrane swings when it depolarizes, how long it
    cannot fire again — the refractory period of the membrane, the voltage it must reach to trigger, the peak
    swing, how often it fires, how long it takes to travel, and how far past threshold it overshoots. Crosses to
    `neurology` — the action potential is what neurology measures. A measure. */ const PROOF = 'action-potential
    arithmetic (conduction velocity, depolarization, refractory period, threshold, amplitude, firing frequency,
    propagation time, overshoot); the nerve impulse as integers; a measure crossed to neurology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'actionpotential', dst: 'neurology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `actionpotential.${name}`, params }) export class ActionpotentialFormulas { /**
    AMPLITUDE: the full swing from trough to peak. value max(0, peak − trough). -/
theorem fam_actionpotential_amplitude_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- actionpotential: conductionvelocity(120, 2) = 60 — CONDUCTION VELOCITY: distance over the time it took.
    value ⌊distance / time⌋. -/
theorem fam_actionpotential_conductionvelocity_1 : (120 / 2) = 60 := by decide

/-- actionpotential: depolarization(55, 30) = 25 — DEPOLARIZATION: the rise from rest to peak. value max(0, peak
    − rest). -/
theorem fam_actionpotential_depolarization_1 : (fmax 0 (55 - 30)) = 25 := by decide

/-- actionpotential: frequency(200, 4) = 50 — FIRING FREQUENCY: spikes over seconds. value ⌊spikes / seconds⌋. -/
theorem fam_actionpotential_frequency_1 : (200 / 4) = 50 := by decide

/-- actionpotential: overshoot(100, 85) = 15 — OVERSHOOT: how far the peak rises past threshold. value max(0,
    peak − threshold). -/
theorem fam_actionpotential_overshoot_1 : (fmax 0 (100 - 85)) = 15 := by decide

/-- actionpotential: propagationtime(100, 50) = 2 — PROPAGATION TIME: distance at a conduction velocity. value
    ⌊distance / velocity⌋. -/
theorem fam_actionpotential_propagationtime_1 : (100 / 50) = 2 := by decide

/-- actionpotential: refractoryperiod(1, 3) = 4 — REFRACTORY PERIOD: absolute plus relative. value absolute +
    relative. -/
theorem fam_actionpotential_refractoryperiod_1 : (1 + 3) = 4 := by decide

/-- actionpotential: threshold(70, 15) = 85 — THRESHOLD: rest plus the voltage delta needed to trigger. value
    rest + delta. -/
theorem fam_actionpotential_threshold_1 : (70 + 15) = 85 := by decide

/-- activation: relu(10, 3) = 7 — ACTIVATION — THE NONLINEARITIES OF A NEURON, AS ARITHMETIC (what fires and how
    hard). A pre-activation is a number; the activation is what the unit passes on: rectified, leaked, stepped,
    a hard sigmoid ramp, saturated, thresholded, clamped to a band, or passed only outside a dead zone. Crosses
    to `neuroscience` — activation is how a neuron answers. A map. */ const PROOF = 'activation arithmetic
    (relu, leaky relu, step, hard sigmoid, saturate, threshold, clamp, dead zone); the nonlinearity a unit
    applies to its pre-activation; a map crossed to neuroscience' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'activation', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name:
    `activation.${name}`, params }) export class ActivationFormulas { /** RELU: the rectified pre-activation
    above a bias. value max(0, x − bias). -/
theorem fam_activation_relu_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- activation: relu(3, 10) = 0 — ACTIVATION — THE NONLINEARITIES OF A NEURON, AS ARITHMETIC (what fires and how
    hard). A pre-activation is a number; the activation is what the unit passes on: rectified, leaked, stepped,
    a hard sigmoid ramp, saturated, thresholded, clamped to a band, or passed only outside a dead zone. Crosses
    to `neuroscience` — activation is how a neuron answers. A map. */ const PROOF = 'activation arithmetic
    (relu, leaky relu, step, hard sigmoid, saturate, threshold, clamp, dead zone); the nonlinearity a unit
    applies to its pre-activation; a map crossed to neuroscience' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'activation', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name:
    `activation.${name}`, params }) export class ActivationFormulas { /** RELU: the rectified pre-activation
    above a bias. value max(0, x − bias). -/
theorem fam_activation_relu_2 : (fmax 0 (3 - 10)) = 0 := by decide

/-- activation: saturate(120, 100) = 100 — SATURATE: the pre-activation capped from above. value min(x, cap). -/
theorem fam_activation_saturate_1 : (fmin 120 100) = 100 := by decide

/-- activation: saturate(50, 100) = 50 — SATURATE: the pre-activation capped from above. value min(x, cap). -/
theorem fam_activation_saturate_2 : (fmin 50 100) = 50 := by decide

/-- activation: clamp(150, 10, 100) = 100 — CLAMP: the pre-activation held inside a band. value min(max(x, lo),
    hi). -/
theorem fam_activation_clamp_1 : (fmin (fmax 150 10) 100) = 100 := by decide

/-- activation: clamp(5, 10, 100) = 10 — CLAMP: the pre-activation held inside a band. value min(max(x, lo),
    hi). -/
theorem fam_activation_clamp_2 : (fmin (fmax 5 10) 100) = 10 := by decide

/-- actuarial: mortality(5, 1000) = 5 — ACTUARIAL — RISK AS ARITHMETIC (chosen by the registry, not by hand).
    Insurance is numbers: mortality per mille, the loss ratio, reserves held, the annuity, the premium at a
    load, life expectancy, the discount to present value, and the solvency margin. Crosses to `accounting` —
    risk is what the books reserve against. A measure. */ const PROOF = 'actuarial arithmetic (mortality, loss
    ratio, reserve, annuity, premium, life expectancy, discount, solvency); risk priced for the books; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'actuarial', dst:
    'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `actuarial.${name}`, params }) export
    class ActuarialFormulas { /** MORTALITY: deaths over exposed, per mille. value ⌊deaths · 1000 / exposed⌋. -/
theorem fam_actuarial_mortality_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- actuarial: lossratio(70, 100) = 70 — LOSS RATIO: claims over premiums, as a percentage. value ⌊claims · 100
    / premiums⌋. -/
theorem fam_actuarial_lossratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- actuarial: reserve(1000, 2) = 2000 — RESERVE: claims scaled by a development factor. value claims · factor. -/
theorem fam_actuarial_reserve_1 : (1000 * 2) = 2000 := by decide

/-- actuarial: annuity(100, 12) = 1200 — ANNUITY: a level payment over periods. value payment · periods. -/
theorem fam_actuarial_annuity_1 : (100 * 12) = 1200 := by decide

/-- actuarial: premium(1000, 20) = 1200 — PREMIUM: risk at a percentage load. value ⌊risk · (100 + load) / 100⌋. -/
theorem fam_actuarial_premium_1 : ((1000 * (100 + 20)) / 100) = 1200 := by decide

/-- actuarial: lifeexpectancy(80) = 80 — LIFE EXPECTANCY: the years, held. value years. -/
theorem fam_actuarial_lifeexpectancy_1 : 80 = 80 := by decide

/-- actuarial: discount(1100, 10) = 1000 — DISCOUNT: a future amount to present value at a rate. value ⌊future ·
    100 / (100 + rate)⌋. -/
theorem fam_actuarial_discount_1 : ((1100 * 100) / (100 + 10)) = 1000 := by decide

/-- actuarial: solvency(150, 100) = 150 — SOLVENCY: assets over liabilities, as a percentage. value ⌊assets ·
    100 / liabilities⌋. -/
theorem fam_actuarial_solvency_1 : ((150 * 100) / 100) = 150 := by decide

/-- actuarial: expectedclaims(3, 4) = 12 — EXPECTED CLAIMS: frequency times severity. value freq · severity. -/
theorem fam_actuarial_expectedclaims_1 : (3 * 4) = 12 := by decide

/-- actuarial: lossratio2(60, 100) = 60 — LOSS RATIO (losses over premiums): a percentage. value
    ⌊losses·100/premiums⌋. -/
theorem fam_actuarial_lossratio2_1 : ((60 * 100) / 100) = 60 := by decide

/-- actuarial: reserve2(100, 30) = 70 — RESERVE (incurred net of paid). value max(0, incurred − paid). -/
theorem fam_actuarial_reserve2_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- actuarial: exposure(5, 3) = 15 — EXPOSURE: policies times years. value policies · years. -/
theorem fam_actuarial_exposure_1 : (5 * 3) = 15 := by decide

/-- actuarial: purepremium(100, 5) = 20 — PURE PREMIUM: losses over exposure. value ⌊losses/exposure⌋. -/
theorem fam_actuarial_purepremium_1 : (100 / 5) = 20 := by decide

/-- actuarial: combinedratio(60, 30, 100) = 90 — COMBINED RATIO: losses plus expenses over premium, as a
    percentage. value ⌊(losses+expenses)·100/premium⌋. -/
theorem fam_actuarial_combinedratio_1 : (((60 + 30) * 100) / 100) = 90 := by decide

/-- actuarial: survival(100, 7) = 93 — SURVIVAL: lives net of deaths. value max(0, lives − deaths). -/
theorem fam_actuarial_survival_1 : (fmax 0 (100 - 7)) = 93 := by decide

/-- actuation: force(50, 20) = 1000 — ACTUATION — MOVING THE WORLD, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Driving a load is numbers: the force a cylinder makes, the stroke a lead screw
    travels, a motor's holding torque, the duty cycle it can sustain, how long it takes to respond, the backlash
    a gear train accumulates, a joint's stiffness, and the thrust a screw converts torque into. Crosses to
    `mechanical` — actuation is what mechanics moves. A measure. */ const PROOF = 'actuation arithmetic (force,
    stroke, holding torque, duty cycle, response time, backlash, stiffness, thrust); a driven-motion domain
    chosen by the public-API registry; a measure crossed to mechanical' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'actuation', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, {
    name: `actuation.${name}`, params }) export class ActuationFormulas { /** FORCE: a cylinder's pressure over
    its area. value pressure · area. -/
theorem fam_actuation_force_1 : (50 * 20) = 1000 := by decide

/-- actuation: stroke(5, 100) = 500 — STROKE: a lead screw's travel, pitch per turn over the turns. value pitch
    · turns. -/
theorem fam_actuation_stroke_1 : (5 * 100) = 500 := by decide

/-- actuation: holdingtorque(3, 50) = 150 — HOLDING TORQUE: current at the motor's torque constant. value
    current · kt. -/
theorem fam_actuation_holdingtorque_1 : (3 * 50) = 150 := by decide

/-- actuation: dutycycle(30, 120) = 25 — DUTY CYCLE as a percentage: on-time over the full period. value ⌊on ·
    100 / total⌋. -/
theorem fam_actuation_dutycycle_1 : ((30 * 100) / 120) = 25 := by decide

/-- actuation: responsetime(1000, 50) = 20 — RESPONSE TIME: the distance to cover at a slew speed. value
    ⌊distance / speed⌋. -/
theorem fam_actuation_responsetime_1 : (1000 / 50) = 20 := by decide

/-- actuation: backlash(10, 3) = 30 — BACKLASH: lost motion per stage, accumulated over a gear train. value
    clearance · stages. -/
theorem fam_actuation_backlash_1 : (10 * 3) = 30 := by decide

/-- actuation: stiffness(1000, 4) = 250 — STIFFNESS: the force a joint resists per unit of deflection. value
    ⌊force / deflection⌋. -/
theorem fam_actuation_stiffness_1 : (1000 / 4) = 250 := by decide

/-- actuation: thrust(100, 10) = 6280 — THRUST: a lead screw converting torque, 2π scaled by 100, over the
    pitch. value ⌊torque · 628 / pitch⌋. -/
theorem fam_actuation_thrust_1 : ((100 * 628) / 10) = 6280 := by decide

/-- admin: columns(3, 5) = 60 — ADMIN — THE PAYLOAD CMS ADMIN UI, AS ARITHMETIC (its config chosen by the
    registry, not by hand). The dashboard is numbers: the columns a list shows, how collections fan out into nav
    groups, the share of fields a component overrides, which collections carry a live preview, the density of a
    list, how long custom components take to load, and what stays hidden. Crosses to `payload` — admin is the
    face payload wears. A measure. */ const PROOF = 'admin arithmetic (list columns, collection groups, custom
    components, live preview, nav density, load cost, hidden fields); the payload admin UI as exact integers; a
    measure crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'admin', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `admin.${name}`, params }) export class
    AdminFormulas { /** LIST COLUMNS: the share of columns a list shows. value ⌊shown · 100 / total⌋. -/
theorem fam_admin_columns_1 : ((3 * 100) / 5) = 60 := by decide

/-- admin: components(2, 10) = 20 — CUSTOM COMPONENTS: the share of UI a component overrides. value ⌊custom ·
    100 / total⌋. -/
theorem fam_admin_components_1 : ((2 * 100) / 10) = 20 := by decide

/-- admin: density(20, 4) = 5 — LIST DENSITY: the fields packed into each row. value ⌊fields / rows⌋. -/
theorem fam_admin_density_1 : (20 / 4) = 5 := by decide

/-- admin: groups(12, 4) = 3 — NAV GROUPS: the collections gathered into each group. value ⌊collections /
    groups⌋. -/
theorem fam_admin_groups_1 : (12 / 4) = 3 := by decide

/-- admin: hidden(2, 20) = 10 — HIDDEN FIELDS: the share of fields kept out of the admin. value ⌊hidden · 100 /
    total⌋. -/
theorem fam_admin_hidden_1 : ((2 * 100) / 20) = 10 := by decide

/-- admin: load(8, 100) = 800 — LOAD COST: the custom components at a cost of milliseconds each. value
    components · ms. -/
theorem fam_admin_load_1 : (8 * 100) = 800 := by decide

/-- admin: nav(10, 5) = 2 — NAV ITEMS: the nav items carried by each group. value ⌊items / groups⌋. -/
theorem fam_admin_nav_1 : (10 / 5) = 2 := by decide

/-- admin: preview(3, 6) = 50 — LIVE PREVIEW: the share of collections with a live preview. value ⌊enabled · 100
    / collections⌋. -/
theorem fam_admin_preview_1 : ((3 * 100) / 6) = 50 := by decide

/-- advertising: ctr(50, 10000) = 50 — ADVERTISING — A CAMPAIGN AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Running ads is numbers: click-through in basis points, cost per mille, cost per
    click, conversion rate, return on ad spend, reach at a frequency, cost per acquisition, and engagement over
    reach. Crosses to `content` — advertising is what content carries. A measure. */ const PROOF = 'advertising
    arithmetic (ctr, cpm, cpc, conversion, roas, reach, cpa, engagement); a public-API domain; a measure crossed
    to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'advertising', dst: 'content',
    formula, value, proof: PROOF, ...extra }, holds, { name: `advertising.${name}`, params }) export class
    AdvertisingFormulas { /** CLICK-THROUGH RATE in basis points. value ⌊clicks · 10000 / impressions⌋. -/
theorem fam_advertising_ctr_1 : ((50 * 10000) / 10000) = 50 := by decide

/-- advertising: cpm(2000, 10000) = 200 — COST PER MILLE: cost per thousand impressions. value ⌊cost · 1000 /
    impressions⌋. -/
theorem fam_advertising_cpm_1 : ((2000 * 1000) / 10000) = 200 := by decide

/-- advertising: cpc(1000, 50) = 20 — COST PER CLICK: cost over the clicks. value ⌊cost / clicks⌋. -/
theorem fam_advertising_cpc_1 : (1000 / 50) = 20 := by decide

/-- advertising: conversion(10, 50) = 20 — CONVERSION RATE as a percentage. value ⌊converted · 100 / clicks⌋. -/
theorem fam_advertising_conversion_1 : ((10 * 100) / 50) = 20 := by decide

/-- advertising: roas(5000, 1000) = 500 — RETURN ON AD SPEND as a percentage. value ⌊revenue · 100 / spend⌋. -/
theorem fam_advertising_roas_1 : ((5000 * 100) / 1000) = 500 := by decide

/-- advertising: reach(10000, 4) = 2500 — REACH: unique people behind impressions at a frequency. value
    ⌊impressions / frequency⌋. -/
theorem fam_advertising_reach_1 : (10000 / 4) = 2500 := by decide

/-- advertising: cpa(1000, 20) = 50 — COST PER ACQUISITION: cost over the acquisitions. value ⌊cost /
    acquisitions⌋. -/
theorem fam_advertising_cpa_1 : (1000 / 20) = 50 := by decide

/-- advertising: engagement(25, 100) = 25 — ENGAGEMENT RATE as a percentage. value ⌊interactions · 100 / reach⌋. -/
theorem fam_advertising_engagement_1 : ((25 * 100) / 100) = 25 := by decide

/-- aerodynamics: lift(12, 50) = 600 — AERODYNAMICS — FLIGHT AS ARITHMETIC. The forces a wing meets are numbers:
    lift and drag from a coefficient over an area, their ratio, the Reynolds number of the flow, the Mach number
    against the speed of sound, the thrust an engine makes, the pressure a force spreads over an area, and the
    wing loading that sets the stall. Crosses to `transport` — aerodynamics is what moves the vehicle. A
    measure. */ const PROOF = 'aerodynamics arithmetic (lift, drag, lift-to-drag ratio, Reynolds, Mach, thrust,
    pressure, stall wing-loading); flight as integer force; a measure crossed to transport' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'aerodynamics', dst: 'transport', formula, value, proof: PROOF,
    ...extra }, holds, { name: `aerodynamics.${name}`, params }) export class AerodynamicsFormulas { /** LIFT: a
    coefficient over an area (proxy). value coefficient · area. -/
theorem fam_aerodynamics_lift_1 : (12 * 50) = 600 := by decide

/-- aerodynamics: drag(3, 50) = 150 — DRAG: a coefficient over an area. value coefficient · area. -/
theorem fam_aerodynamics_drag_1 : (3 * 50) = 150 := by decide

/-- aerodynamics: ratio(600, 150) = 400 — LIFT-TO-DRAG RATIO ×100. value ⌊lift · 100 / drag⌋. -/
theorem fam_aerodynamics_ratio_1 : ((600 * 100) / 150) = 400 := by decide

/-- aerodynamics: reynolds(200, 3) = 600 — REYNOLDS NUMBER: velocity over a length (proxy). value velocity ·
    length. -/
theorem fam_aerodynamics_reynolds_1 : (200 * 3) = 600 := by decide

/-- aerodynamics: mach(680, 340) = 200 — MACH NUMBER ×100 against the speed of sound. value ⌊velocity · 100 /
    sound⌋. -/
theorem fam_aerodynamics_mach_1 : ((680 * 100) / 340) = 200 := by decide

/-- aerodynamics: thrust(1000, 9) = 9000 — THRUST: mass under acceleration. value mass · acceleration. -/
theorem fam_aerodynamics_thrust_1 : (1000 * 9) = 9000 := by decide

/-- aerodynamics: pressure(1000, 50) = 20 — PRESSURE: a force spread over an area. value ⌊force / area⌋. -/
theorem fam_aerodynamics_pressure_1 : (1000 / 50) = 20 := by decide

/-- aerodynamics: stall(3000, 50) = 60 — STALL: wing loading, weight over the lifting area. value ⌊weight /
    liftarea⌋. -/
theorem fam_aerodynamics_stall_1 : (3000 / 50) = 60 := by decide

/-- aerospace: thrust(1000, 9) = 9000 — AEROSPACE — FLIGHT & ORBITAL MECHANICS, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Flight is numbers: thrust from mass and acceleration, lift from a
    coefficient over an area, the range a fuel load buys at a burn rate, the Mach number against the speed of
    sound, the orbital period a radius and mass imply, escape as a mass-to-radius ratio, usable payload, and the
    apogee an energy budget reaches. Crosses to `cern` — flight is physics measured. A measure. */ const PROOF =
    'aerospace arithmetic (thrust, lift, range, mach, orbit, escape, payload, apogee); flight & orbital
    mechanics from the public-API registry; a measure crossed to cern' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'aerospace', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name:
    `aerospace.${name}`, params }) export class AerospaceFormulas { /** THRUST: mass under an acceleration
    (Newton's second law). value mass · accel. -/
theorem fam_aerospace_thrust_1 : (1000 * 9) = 9000 := by decide

/-- aerospace: lift(120, 500) = 600 — LIFT: a lift coefficient over a wing area (coefficient scaled by 100).
    value ⌊coeff · area / 100⌋. -/
theorem fam_aerospace_lift_1 : ((120 * 500) / 100) = 600 := by decide

/-- aerospace: range(8000, 20) = 400 — RANGE: the distance a fuel load buys at a burn rate. value ⌊fuel / burn⌋. -/
theorem fam_aerospace_range_1 : (8000 / 20) = 400 := by decide

/-- aerospace: mach(680, 340) = 200 — MACH: speed against the speed of sound (Mach × 100). value ⌊speed · 100 /
    sound⌋. -/
theorem fam_aerospace_mach_1 : ((680 * 100) / 340) = 200 := by decide

/-- aerospace: escape(1000, 8) = 125 — ESCAPE: escape proxy as mass over radius. value ⌊mass / radius⌋. -/
theorem fam_aerospace_escape_1 : (1000 / 8) = 125 := by decide

/-- aerospace: payload(5000, 3200) = 1800 — PAYLOAD: gross mass less dry mass, never below zero. value max(0,
    gross − dry). -/
theorem fam_aerospace_payload_1 : (fmax 0 (5000 - 3200)) = 1800 := by decide

/-- aerospace: payload(3000, 4000) = 0 — PAYLOAD: gross mass less dry mass, never below zero. value max(0, gross
    − dry). -/
theorem fam_aerospace_payload_2 : (fmax 0 (3000 - 4000)) = 0 := by decide

/-- aerospace: apogee(60000, 300) = 200 — APOGEE: the height an energy budget reaches against a mass. value
    ⌊energy / mass⌋. -/
theorem fam_aerospace_apogee_1 : (60000 / 300) = 200 := by decide

/-- aesthetics: golden(1618) = 1000 — AESTHETICS — VISUAL JUDGEMENT AS ARITHMETIC (chosen by the design
    registry, not by hand). Beauty is numbers: the golden-ratio partner of a width, how symmetric a composition
    is, how balanced two sides are, the contrast of light over dark, tonal harmony, the rhythm of repeated
    elements, part-to-whole proportion, and overall unity. Crosses to `layout` — aesthetics is what layout
    arranges. A measure. */ const PROOF = 'aesthetics arithmetic (golden ratio, symmetry, balance, contrast,
    harmony, rhythm, proportion, unity); visual judgement as integers; a measure crossed to layout' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'aesthetics', dst: 'layout', formula, value, proof: PROOF,
    ...extra }, holds, { name: `aesthetics.${name}`, params }) export class AestheticsFormulas { /** GOLDEN
    RATIO PARTNER: a width divided by φ. value ⌊width · 1000 / 1618⌋. -/
theorem fam_aesthetics_golden_1 : ((1618 * 1000) / 1618) = 1000 := by decide

/-- aesthetics: symmetry(45, 50) = 90 — SYMMETRY as a percentage of matched points. value ⌊matched · 100 /
    total⌋. -/
theorem fam_aesthetics_symmetry_1 : ((45 * 100) / 50) = 90 := by decide

/-- aesthetics: contrast(21, 3) = 7 — CONTRAST: light over dark. value ⌊light / dark⌋. -/
theorem fam_aesthetics_contrast_1 : (21 / 3) = 7 := by decide

/-- aesthetics: harmony(3, 4) = 75 — HARMONY: consonant intervals as a percentage. value ⌊consonant · 100 /
    total⌋. -/
theorem fam_aesthetics_harmony_1 : ((3 * 100) / 4) = 75 := by decide

/-- aesthetics: rhythm(12, 4) = 3 — RHYTHM: elements per interval. value ⌊elements / interval⌋. -/
theorem fam_aesthetics_rhythm_1 : (12 / 4) = 3 := by decide

/-- aesthetics: proportion(1, 4) = 25 — PROPORTION: part over whole as a percentage. value ⌊part · 100 / whole⌋. -/
theorem fam_aesthetics_proportion_1 : ((1 * 100) / 4) = 25 := by decide

/-- aesthetics: unity(8, 10) = 80 — UNITY: related elements as a percentage of the whole. value ⌊related · 100 /
    total⌋. -/
theorem fam_aesthetics_unity_1 : ((8 * 100) / 10) = 80 := by decide

/-- agriculture: yield(9000, 3) = 3000 — AGRICULTURE — FARMING & AGRONOMY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A farm is numbers: yield per hectare, seed and water and fertilizer a
    field needs, germination and moisture as percentages, the fields a rotation can run, and the harvest a yield
    returns over an area. Crosses to `econ` — a farm is an economy of land. A measure. */ const PROOF =
    'agriculture arithmetic (yield per area, seed, water, fertilizer, germination, rotation, moisture, harvest);
    farming & agronomy as integers; a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'agriculture', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name:
    `agriculture.${name}`, params }) export class AgricultureFormulas { /** YIELD: harvest over the area it came
    from. value ⌊harvest / area⌋. -/
theorem fam_agriculture_yield_1 : (9000 / 3) = 3000 := by decide

/-- agriculture: seed(40, 120) = 4800 — SEED: an area at a sowing rate. value area · rate. -/
theorem fam_agriculture_seed_1 : (40 * 120) = 4800 := by decide

/-- agriculture: water(40, 25) = 1000 — WATER: an area at millimetres of irrigation. value area · mm. -/
theorem fam_agriculture_water_1 : (40 * 25) = 1000 := by decide

/-- agriculture: fertilizer(40, 150) = 6000 — FERTILIZER: an area at an amount per hectare. value area · perHa. -/
theorem fam_agriculture_fertilizer_1 : (40 * 150) = 6000 := by decide

/-- agriculture: germination(950, 1000) = 95 — GERMINATION as a percentage. value ⌊sprouted · 100 / sown⌋. -/
theorem fam_agriculture_germination_1 : ((950 * 100) / 1000) = 95 := by decide

/-- agriculture: rotation(12, 4) = 3 — ROTATION: the fields a rotation of so many years can run. value ⌊fields /
    years⌋. -/
theorem fam_agriculture_rotation_1 : (12 / 4) = 3 := by decide

/-- agriculture: moisture(130, 100) = 130 — MOISTURE as a percentage of wet over dry. value ⌊wet · 100 / dry⌋. -/
theorem fam_agriculture_moisture_1 : ((130 * 100) / 100) = 130 := by decide

/-- agriculture: harvest(3000, 3) = 9000 — HARVEST: a yield per area over an area. value perArea · area. -/
theorem fam_agriculture_harvest_1 : (3000 * 3) = 9000 := by decide

/-- agronomy: output(10000, 100) = 100 — AGRONOMY — THE SCIENCE OF THE FIELD, AS ARITHMETIC. Growing a crop is
    numbers: yield per area, the seeds a field takes, how a rotation divides over years, soil moisture, nitrogen
    against uptake, tillage work, harvest against the expectation, and planting density. Crosses to
    `agriculture` — agronomy is the measure the farm is run by. A measure. */ const PROOF = 'agronomy arithmetic
    (yield, seed rate, rotation, moisture, nitrogen, tillage, harvest, density); the field as integers; a
    measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'agronomy', dst:
    'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `agronomy.${name}`, params }) export
    class AgronomyFormulas { /** YIELD: harvest over the area it came from. value ⌊harvest / area⌋. -/
theorem fam_agronomy_output_1 : (10000 / 100) = 100 := by decide

/-- agronomy: seedrate(5000, 100) = 50 — SEED RATE: seeds over the area sown. value ⌊seeds / area⌋. -/
theorem fam_agronomy_seedrate_1 : (5000 / 100) = 50 := by decide

/-- agronomy: rotation(12, 4) = 3 — ROTATION: crops divided over the years of the cycle. value ⌊crops / years⌋. -/
theorem fam_agronomy_rotation_1 : (12 / 4) = 3 := by decide

/-- agronomy: moisture(30, 100) = 30 — MOISTURE: water as a percentage of the soil's capacity. value ⌊water ·
    100 / soil⌋. -/
theorem fam_agronomy_moisture_1 : ((30 * 100) / 100) = 30 := by decide

/-- agronomy: nitrogen(120, 100) = 120 — NITROGEN: applied as a percentage of crop uptake. value ⌊applied · 100
    / uptake⌋. -/
theorem fam_agronomy_nitrogen_1 : ((120 * 100) / 100) = 120 := by decide

/-- agronomy: tillage(15, 3) = 45 — TILLAGE: the work of a depth over its passes. value depth · passes. -/
theorem fam_agronomy_tillage_1 : (15 * 3) = 45 := by decide

/-- agronomy: harvest(90, 100) = 90 — HARVEST: what was taken against what was expected. value ⌊yielded · 100 /
    expected⌋. -/
theorem fam_agronomy_harvest_1 : ((90 * 100) / 100) = 90 := by decide

/-- agronomy: density(300, 5) = 60 — DENSITY: plants over the area they stand in. value ⌊plants / area⌋. -/
theorem fam_agronomy_density_1 : (300 / 5) = 60 := by decide

/-- airquality: aqi(50, 2) = 100 — AIRQUALITY — BREATHING ROOM, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). What is in the air is numbers: the index for a concentration, the PM2.5 reading
    against a threshold, the 8-hour ozone load, how far a reading is over the limit, mass over volume,
    concentration-time exposure, air changes a room gets, and how a plume thins with distance. Crosses to
    `environment` — air quality is one reading the environment keeps. A measure. */ const PROOF = 'airquality
    arithmetic (aqi, pm2.5 index, 8-hour ozone, exceedance, concentration, exposure, ventilation, dispersion); a
    public-API domain; a measure crossed to environment' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'airquality', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name:
    `airquality.${name}`, params }) export class AirqualityFormulas { /** AQI: index points for a concentration
    at a per-unit slope. value conc · slope. -/
theorem fam_airquality_aqi_1 : (50 * 2) = 100 := by decide

/-- airquality: pm25index(70, 35) = 200 — PM2.5 INDEX: a reading as a percentage of a threshold. value ⌊conc ·
    100 / base⌋. -/
theorem fam_airquality_pm25index_1 : ((70 * 100) / 35) = 200 := by decide

/-- airquality: ozone(80, 8) = 80 — OZONE: the 8-hour ozone load from ppb over the hours measured. value ⌊ppb ·
    hours / 8⌋. -/
theorem fam_airquality_ozone_1 : ((80 * 8) / 8) = 80 := by decide

/-- airquality: exceedance(120, 100) = 20 — EXCEEDANCE: how far a reading is over the limit. value max(0,
    measured − limit). -/
theorem fam_airquality_exceedance_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- airquality: exceedance(90, 100) = 0 — EXCEEDANCE: how far a reading is over the limit. value max(0, measured
    − limit). -/
theorem fam_airquality_exceedance_2 : (fmax 0 (90 - 100)) = 0 := by decide

/-- airquality: concentration(5000, 100) = 50 — CONCENTRATION: mass over the volume it fills. value ⌊mass /
    volume⌋. -/
theorem fam_airquality_concentration_1 : (5000 / 100) = 50 := by decide

/-- airquality: exposureindex(50, 24) = 1200 — EXPOSURE INDEX: concentration-time over the hours breathed. value
    conc · hours. -/
theorem fam_airquality_exposureindex_1 : (50 * 24) = 1200 := by decide

/-- airquality: ventilation(100, 60) = 100 — VENTILATION: air changes an hour a flow gives a room. value ⌊flow ·
    60 / volume⌋. -/
theorem fam_airquality_ventilation_1 : ((100 * 60) / 60) = 100 := by decide

/-- airquality: dispersion(900, 9) = 100 — DISPERSION: how a plume thins with distance from the source. value
    ⌊source / distance⌋. -/
theorem fam_airquality_dispersion_1 : (900 / 9) = 100 := by decide

/-- airship: lift(1000, 1) = 1000 -/
theorem fam_airship_lift_1 : (1000 * 1) = 1000 := by decide

/-- airship: volume(50, 20, 20) = 20000 -/
theorem fam_airship_volume_1 : ((50 * 20) * 20) = 20000 := by decide

/-- airship: heliumfraction(95, 100) = 95 -/
theorem fam_airship_heliumfraction_1 : ((95 * 100) / 100) = 95 := by decide

/-- airship: maxspeed(100, 1) = 100 -/
theorem fam_airship_maxspeed_1 : (100 * 1) = 100 := by decide

/-- airship: payload(10000, 8000) = 2000 -/
theorem fam_airship_payload_1 : (fmax 0 (10000 - 8000)) = 2000 := by decide

/-- airship: ballastratio(10, 100) = 10 -/
theorem fam_airship_ballastratio_1 : ((10 * 100) / 100) = 10 := by decide

/-- airship: lengthm(200, 1) = 200 -/
theorem fam_airship_lengthm_1 : (200 * 1) = 200 := by decide

/-- airship: buoyancymargin(100, 20) = 80 -/
theorem fam_airship_buoyancymargin_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- alerting: falsepositiverate(30, 200) = 15 — FALSE-POSITIVE RATE: the share of alerts that were false, as a
    percentage. value ⌊false · 100 / total⌋. -/
theorem fam_alerting_falsepositiverate_1 : ((30 * 100) / 200) = 15 := by decide

/-- alerting: mttd(600, 20) = 30 — MEAN TIME TO DETECT: total detection minutes over the incidents seen. value
    ⌊total / incidents⌋. -/
theorem fam_alerting_mttd_1 : (600 / 20) = 30 := by decide

/-- alerting: escalation(3, 5) = 15 — ESCALATION: the wait before the next tier, a level at a per-level step.
    value level · step. -/
theorem fam_alerting_escalation_1 : (3 * 5) = 15 := by decide

/-- alerting: noiseratio(40, 50) = 80 — NOISE RATIO: the share of the stream that was noise, as a percentage.
    value ⌊noise · 100 / total⌋. -/
theorem fam_alerting_noiseratio_1 : ((40 * 100) / 50) = 80 := by decide

/-- alerting: deduplication(1000, 150) = 850 — DEDUPLICATION: the duplicate alerts collapsed away. value max(0,
    raw − unique). -/
theorem fam_alerting_deduplication_1 : (fmax 0 (1000 - 150)) = 850 := by decide

/-- alerting: severityscore(4, 5) = 20 — SEVERITY SCORE: impact weighted by urgency. value impact · urgency. -/
theorem fam_alerting_severityscore_1 : (4 * 5) = 20 := by decide

/-- alerting: flappingindex(12, 60) = 20 — FLAPPING INDEX: state transitions over a window, as a per-window
    index. value ⌊transitions · 100 / window⌋. -/
theorem fam_alerting_flappingindex_1 : ((12 * 100) / 60) = 20 := by decide

/-- algebra: linear(3, 7) = 21 — ALGEBRA — THE SCHOOL FORMULAS AS INTEGER ARITHMETIC. A line, a parabola, a
    discriminant, a slope, a factorial, the greatest common divisor, a power, and the roots' discriminant from
    sum and product. Every value an integer; every division guarded; the discriminant and the roots may be
    negative. Crosses to `code` — algebra is what code runs. */ const PROOF = 'algebra arithmetic (linear,
    quadratic, discriminant, slope, factorial, gcd, power, roots); integer values, guarded division; crossed to
    code' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'algebra', dst: 'code', formula,
    value, proof: PROOF, ...extra }, holds, { name: `algebra.${name}`, params }) export class AlgebraFormulas {
    /** LINEAR: a line through the origin. value slope · x. -/
theorem fam_algebra_linear_1 : (3 * 7) = 21 := by decide

/-- algebra: slope(10, 4) = 250 — SLOPE: rise over run, scaled by 100 (guard run > 0). value ⌊rise · 100 / run⌋. -/
theorem fam_algebra_slope_1 : ((10 * 100) / 4) = 250 := by decide

/-- alloys: carbonequivalent(20, 60, 50) = 40 — ALLOYS — METALLURGY AS ARITHMETIC (chosen by the materials
    registry, not by hand). A mixed metal is numbers: the percent of a base metal, hardness under a load, the
    melting point of a mix, tensile strength, the carbon equivalent of a steel, a phase fraction, density and
    conductance. Crosses to `materials` — an alloy is a material. A measure. */ const PROOF = 'alloys arithmetic
    (composition, hardness, melting point, tensile strength, carbon equivalent, phase fraction, density,
    conductivity); the metallurgy domain of the materials registry; a measure crossed to materials' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'alloys', dst: 'materials', formula, value, proof: PROOF, ...extra
    }, holds, { name: `alloys.${name}`, params }) export class AlloysFormulas { /** CARBON EQUIVALENT of a steel
    (inputs in hundredths of a percent). value carbon + ⌊mn / 6⌋ + ⌊cr / 5⌋. -/
theorem fam_alloys_carbonequivalent_1 : ((20 + (60 / 6)) + (50 / 5)) = 40 := by decide

/-- alloys: composition(88, 100) = 88 — COMPOSITION: the percent a base metal is of the whole. value ⌊base · 100
    / total⌋. -/
theorem fam_alloys_composition_1 : ((88 * 100) / 100) = 88 := by decide

/-- alloys: conductivity(580, 2, 4) = 290 — CONDUCTANCE: conductivity over a cross-section at a length. value
    ⌊sigma · area / length⌋. -/
theorem fam_alloys_conductivity_1 : ((580 * 2) / 4) = 290 := by decide

/-- alloys: density(16000, 2) = 8000 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_alloys_density_1 : (16000 / 2) = 8000 := by decide

/-- alloys: hardness(600, 3) = 200 — HARDNESS: an indentation load over the indent area. value ⌊load / area⌋. -/
theorem fam_alloys_hardness_1 : (600 / 3) = 200 := by decide

/-- alloys: meltingpoint(1538, 1085) = 1311 — MELTING POINT of a two-component mix, by the mean of its
    components. value ⌊(tempA + tempB) / 2⌋. -/
theorem fam_alloys_meltingpoint_1 : ((1538 + 1085) / 2) = 1311 := by decide

/-- alloys: phasefraction(3, 4) = 75 — PHASE FRACTION: the percent one phase is of the whole. value ⌊phase · 100
    / total⌋. -/
theorem fam_alloys_phasefraction_1 : ((3 * 100) / 4) = 75 := by decide

/-- alloys: tensile(40000, 80) = 500 — TENSILE STRENGTH: a breaking force over the cross-section. value ⌊force /
    area⌋. -/
theorem fam_alloys_tensile_1 : (40000 / 80) = 500 := by decide

/-- altimetry: pressurealtitude(500, 1003) = 770 — ALTIMETRY — HEIGHT AS ARITHMETIC (chosen by the elevation
    registry, not by hand). Measuring the vertical is numbers: pressure altitude from a setting, density
    altitude from the temperature, the gain over a climb, the slope and grade of a run, the interval between
    contours, the vertical speed of an ascent, and the hypsometric thickness of a layer. Crosses to
    `cartography` — altimetry is the height the map draws. A measure. */ const PROOF = 'altimetry arithmetic
    (pressure altitude, density altitude, elevation gain, slope, contour interval, vertical speed, hypsometric
    thickness, grade); the elevation registry\'s uncovered domain; a measure crossed to cartography' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'altimetry', dst: 'cartography', formula, value, proof: PROOF,
    ...extra }, holds, { name: `altimetry.${name}`, params }) export class AltimetryFormulas { /** PRESSURE
    ALTITUDE: field elevation corrected off standard pressure. value elevation + max(0, 1013 − pressure) · 27. -/
theorem fam_altimetry_pressurealtitude_1 : (500 + ((fmax 0 (1013 - 1003)) * 27)) = 770 := by decide

/-- altimetry: densityaltitude(5000, 25) = 6200 — DENSITY ALTITUDE: pressure altitude corrected off standard
    temperature. value pressureAlt + 120 · max(0, temp − 15). -/
theorem fam_altimetry_densityaltitude_1 : (5000 + (120 * (fmax 0 (25 - 15)))) = 6200 := by decide

/-- altimetry: elevationgain(1200, 1850) = 650 — ELEVATION GAIN over a climb. value max(0, end − start). -/
theorem fam_altimetry_elevationgain_1 : (fmax 0 (1850 - 1200)) = 650 := by decide

/-- altimetry: slope(150, 2000) = 7 — SLOPE as a percent grade. value ⌊rise · 100 / run⌋. -/
theorem fam_altimetry_slope_1 : ((150 * 100) / 2000) = 7 := by decide

/-- altimetry: contourinterval(1000, 400, 6) = 100 — CONTOUR INTERVAL: the span split into equal lines. value
    ⌊max(0, high − low) / count⌋. -/
theorem fam_altimetry_contourinterval_1 : ((fmax 0 (1000 - 400)) / 6) = 100 := by decide

/-- altimetry: verticalspeed(3600, 3) = 1200 — VERTICAL SPEED: altitude change over the minutes taken. value
    ⌊altChange / minutes⌋. -/
theorem fam_altimetry_verticalspeed_1 : (3600 / 3) = 1200 := by decide

/-- altimetry: hypsometric(250, 2) = 14500 — HYPSOMETRIC THICKNESS of a layer by mean temperature. value 29 ·
    temp · factor. -/
theorem fam_altimetry_hypsometric_1 : ((29 * 250) * 2) = 14500 := by decide

/-- altimetry: grade(30, 400) = 75 — GRADE as a per-mille slope. value ⌊rise · 1000 / run⌋. -/
theorem fam_altimetry_grade_1 : ((30 * 1000) / 400) = 75 := by decide

/-- amortization: schedulepayment(24000, 24) = 1000 — AMORTIZATION — A LOAN (OR AN INTANGIBLE) SPREAD OVER TIME,
    AS ARITHMETIC. Paying a principal down is numbers: the level payment, the split of a payment into principal
    and interest, the balance left, the months to payoff, the total paid, the effect of paying extra, and the
    straight-line write-down of an intangible asset. Crosses to `accounting` — amortization is what the ledger
    records. A measure. */ const PROOF = 'amortization arithmetic (level payment, principal/interest split,
    remaining balance, payoff months, total cost, extra payment, intangible write-down); a measure crossed to
    accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'amortization', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `amortization.${name}`, params }) export class
    AmortizationFormulas { /** LEVEL PAYMENT: a principal split evenly over the term (interest aside). value
    ⌊principal / months⌋. -/
theorem fam_amortization_schedulepayment_1 : (24000 / 24) = 1000 := by decide

/-- amortization: principalportion(1000, 150) = 850 — PRINCIPAL PORTION: the part of a payment that is not
    interest. value max(0, payment − interest). -/
theorem fam_amortization_principalportion_1 : (fmax 0 (1000 - 150)) = 850 := by decide

/-- amortization: principalportion(100, 150) = 0 — PRINCIPAL PORTION: the part of a payment that is not
    interest. value max(0, payment − interest). -/
theorem fam_amortization_principalportion_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- amortization: interestportion(60000, 6) = 300 — INTEREST PORTION: a month's interest on the balance at an
    annual percent. value ⌊balance · rate / 1200⌋. -/
theorem fam_amortization_interestportion_1 : ((60000 * 6) / 1200) = 300 := by decide

/-- amortization: remainingbalance(60000, 18000) = 42000 — REMAINING BALANCE: the principal still owed after
    what is paid. value max(0, principal − paid). -/
theorem fam_amortization_remainingbalance_1 : (fmax 0 (60000 - 18000)) = 42000 := by decide

/-- amortization: totalcost(1000, 360) = 360000 — TOTAL COST: every payment over the term. value payment ·
    months. -/
theorem fam_amortization_totalcost_1 : (1000 * 360) = 360000 := by decide

/-- amortization: intangible(50000, 10) = 5000 — INTANGIBLE: a straight-line write-down of an intangible asset
    over its life. value ⌊cost / life⌋. -/
theorem fam_amortization_intangible_1 : (50000 / 10) = 5000 := by decide

/-- amplifiers: gain(1000, 5) = 200 — AMPLIFIERS — SIGNAL AMPLIFICATION AS ARITHMETIC (chosen by the component
    registry, not by hand). An amplifier is numbers: the gain it applies, its ratio in decibels (an integer
    proxy, not a log), the bandwidth it passes, how fast it slews, the input impedance it presents, the output
    power it delivers, its efficiency, and its common-mode rejection. Crosses to `electronics` — an amplifier is
    an electronic circuit measured by these. A measure. */ const PROOF = 'amplifiers arithmetic (voltage gain,
    decibel ratio proxy, bandwidth, slew rate, input impedance, output power, efficiency, CMRR); a signal-chain
    domain; a measure crossed to electronics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'amplifiers', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `amplifiers.${name}`, params }) export class AmplifiersFormulas { /** VOLTAGE GAIN: output over input. value
    ⌊vout / vin⌋. -/
theorem fam_amplifiers_gain_1 : (1000 / 5) = 200 := by decide

/-- amplifiers: decibels(50, 5) = 100 — DECIBELS as an integer ratio proxy (ten times the power ratio, not a
    log). value ⌊pout · 10 / pin⌋. -/
theorem fam_amplifiers_decibels_1 : ((50 * 10) / 5) = 100 := by decide

/-- amplifiers: bandwidth(20000, 20) = 19980 — BANDWIDTH: the span between upper and lower cutoff. value max(0,
    fhigh − flow). -/
theorem fam_amplifiers_bandwidth_1 : (fmax 0 (20000 - 20)) = 19980 := by decide

/-- amplifiers: slewrate(1000, 20) = 50 — SLEW RATE: volts of swing per unit time. value ⌊voltage / time⌋. -/
theorem fam_amplifiers_slewrate_1 : (1000 / 20) = 50 := by decide

/-- amplifiers: inputimpedance(10000, 2) = 5000 — INPUT IMPEDANCE: the resistance the input presents, voltage
    over current. value ⌊voltage / current⌋. -/
theorem fam_amplifiers_inputimpedance_1 : (10000 / 2) = 5000 := by decide

/-- amplifiers: outputpower(120, 5) = 600 — OUTPUT POWER: voltage times current at the load. value voltage ·
    current. -/
theorem fam_amplifiers_outputpower_1 : (120 * 5) = 600 := by decide

/-- amplifiers: efficiency(80, 100) = 80 — EFFICIENCY: output power as a percentage of input power. value
    ⌊output · 100 / input⌋. -/
theorem fam_amplifiers_efficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- amplifiers: efficiency(50, 0) = 0 — EFFICIENCY: output power as a percentage of input power. value ⌊output ·
    100 / input⌋. -/
theorem fam_amplifiers_efficiency_2 : ((50 * 100) / 0) = 0 := by decide

/-- amplifiers: cmrr(10000, 10) = 1000 — CMRR: common-mode rejection, differential gain over common-mode gain.
    value ⌊differential / commonmode⌋. -/
theorem fam_amplifiers_cmrr_1 : (10000 / 10) = 1000 := by decide

/-- anatomy: surface(170, 70) = 11900 — ANATOMY — THE BODY AS ARITHMETIC (chosen by the registry, not by hand).
    Form is numbers: a body-surface proxy, the waist-to-hip ratio, left/right symmetry, a part against the
    whole, the span of a segment, a volume, a mass, and the girth of a limb. Crosses to `med` — anatomy is what
    medicine measures. A measure. */ const PROOF = 'anatomy arithmetic (surface proxy, waist-hip ratio,
    symmetry, proportion, span, volume, mass, girth); a registry domain; a measure crossed to med' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'anatomy', dst: 'med', formula, value, proof: PROOF, ...extra },
    holds, { name: `anatomy.${name}`, params }) export class AnatomyFormulas { /** SURFACE: a body-surface
    proxy, height by weight. value height · weight. -/
theorem fam_anatomy_surface_1 : (170 * 70) = 11900 := by decide

/-- anatomy: ratio(80, 100) = 80 — WAIST-TO-HIP RATIO as a percentage. value ⌊waist · 100 / hip⌋. -/
theorem fam_anatomy_ratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- anatomy: proportion(25, 100) = 25 — PROPORTION: a part against the whole, as a percentage. value ⌊part · 100
    / whole⌋. -/
theorem fam_anatomy_proportion_1 : ((25 * 100) / 100) = 25 := by decide

/-- anatomy: span(100, 5) = 20 — SPAN: a length divided into segments. value ⌊length / segments⌋. -/
theorem fam_anatomy_span_1 : (100 / 5) = 20 := by decide

/-- anatomy: volume(50, 12) = 600 — VOLUME: a length at a cross-sectional area. value length · area. -/
theorem fam_anatomy_volume_1 : (50 * 12) = 600 := by decide

/-- anatomy: mass(600, 2) = 1200 — MASS: a volume at a density. value volume · density. -/
theorem fam_anatomy_mass_1 : (600 * 2) = 1200 := by decide

/-- anatomy: girth(10) = 60 — GIRTH: a circumference proxy, about 2πr ≈ 6r. value radius · 6. -/
theorem fam_anatomy_girth_1 : (10 * 6) = 60 := by decide

/-- anesthesiology: mac(70, 50) = 120 — ANESTHESIOLOGY — THE OPERATING ROOM AS ARITHMETIC. Keeping a patient
    under is numbers: the minimum alveolar concentration of the agents, the dose by weight, the infusion rate,
    the mean arterial pressure, the blood a case may lose, oxygenation, the reversal dose, and whether the depth
    is adequate. Crosses to `physiology` — anesthesia is applied physiology. A measure. */ const PROOF =
    'anesthesiology arithmetic (MAC, weight dose, infusion rate, mean arterial pressure, allowable blood loss,
    oxygenation, reversal dose, depth); a measure crossed to physiology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'anesthesiology', dst: 'physiology', formula, value, proof: PROOF, ...extra },
    holds, { name: `anesthesiology.${name}`, params }) export class AnesthesiologyFormulas { /** MAC: the summed
    minimum-alveolar-concentration fractions of the agents (volatile + nitrous), as percent of 1 MAC. value
    agent + nitrous. -/
theorem fam_anesthesiology_mac_1 : (70 + 50) = 120 := by decide

/-- anesthesiology: dosage(70, 2) = 140 — DOSAGE: a weight-based dose. value weight · perKg. -/
theorem fam_anesthesiology_dosage_1 : (70 * 2) = 140 := by decide

/-- anesthesiology: infusionrate(1200, 24) = 50 — INFUSION RATE: a total volume delivered over the hours of a
    case. value ⌊total / hours⌋. -/
theorem fam_anesthesiology_infusionrate_1 : (1200 / 24) = 50 := by decide

/-- anesthesiology: mapp(120, 60) = 80 — MEAN ARTERIAL PRESSURE: a diastole-weighted mean of the cuff reading.
    value ⌊(systolic + 2 · diastolic) / 3⌋. -/
theorem fam_anesthesiology_mapp_1 : ((120 + (2 * 60)) / 3) = 80 := by decide

/-- anesthesiology: bloodloss(5000, 45, 30) = 1666 — ALLOWABLE BLOOD LOSS: estimated blood volume times the
    hematocrit a case may spend. value ⌊ebv · max(0, hi − hf) / hi⌋. -/
theorem fam_anesthesiology_bloodloss_1 : ((5000 * (fmax 0 (45 - 30))) / 45) = 1666 := by decide

/-- anesthesiology: oxygenation(100, 50) = 200 — OXYGENATION: the P/F ratio, arterial oxygen over the inspired
    fraction. value ⌊pao2 · 100 / fio2⌋. -/
theorem fam_anesthesiology_oxygenation_1 : ((100 * 100) / 50) = 200 := by decide

/-- anesthesiology: reversal(70, 50) = 3500 — REVERSAL: a weight-based reversal-agent dose. value weight ·
    perKg. -/
theorem fam_anesthesiology_reversal_1 : (70 * 50) = 3500 := by decide

/-- animation: cel(5, 12) = 60 — ANIMATION — MOTION AS ARITHMETIC (chosen by the registry, not by hand). Making
    things move is numbers: the frames a shot holds, the in-betweens a tween spans, the keyframes dropped along
    a timeline, how long a clip plays, the onion skins shown around the current frame, the cels stacked across
    layers, the eased progress, and the clip's duration in milliseconds. Crosses to `media` — animation is the
    moving picture media carries. A measure. */ const PROOF = 'animation arithmetic (frames, tweening
    in-betweens, keyframes, playback seconds, onion skins, cels, eased progress, duration ms); a registry
    domain; a measure crossed to media' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'animation', dst:
    'media', formula, value, proof: PROOF, ...extra }, holds, { name: `animation.${name}`, params }) export
    class AnimationFormulas { /** CELS: cels stacked across every layer. value layers · cels. -/
theorem fam_animation_cel_1 : (5 * 12) = 60 := by decide

/-- animation: duration(48, 24) = 2000 — DURATION in milliseconds for a frame count at a frame rate. value
    ⌊frames · 1000 / fps⌋. -/
theorem fam_animation_duration_1 : ((48 * 1000) / 24) = 2000 := by decide

/-- animation: easing(50, 200) = 25 — EASING: eased progress as a percentage of the duration. value ⌊t · 100 /
    duration⌋. -/
theorem fam_animation_easing_1 : ((50 * 100) / 200) = 25 := by decide

/-- animation: frames(24, 30) = 720 — FRAMES: the frames a shot holds at a frame rate. value seconds · fps. -/
theorem fam_animation_frames_1 : (24 * 30) = 720 := by decide

/-- animation: onionskin(2, 2) = 5 — ONIONSKIN: skins shown around the current frame (neighbours plus the frame
    itself). value before + after + 1. -/
theorem fam_animation_onionskin_1 : ((2 + 2) + 1) = 5 := by decide

/-- animation: playback(720, 24) = 30 — PLAYBACK: how long a frame count plays in whole seconds. value ⌊frames /
    fps⌋. -/
theorem fam_animation_playback_1 : (720 / 24) = 30 := by decide

/-- animation: tweening(0, 100, 5) = 20 — TWEENING: the per-step delta spanned between two keyframe values.
    value ⌊(end − start) / steps⌋. -/
theorem fam_animation_tweening_1 : ((fmax 0 (100 - 0)) / 5) = 20 := by decide

/-- animism: spiritcount(100, 10) = 1000 -/
theorem fam_animism_spiritcount_1 : (100 * 10) = 1000 := by decide

/-- animism: ritualtypes(5, 3) = 8 -/
theorem fam_animism_ritualtypes_1 : (5 + 3) = 8 := by decide

/-- animism: totemsubsets(5) = 32 -/
theorem fam_animism_totemsubsets_1 : (2 ^ 5) = 32 := by decide

/-- animism: seasonalcycles(4, 1) = 4 -/
theorem fam_animism_seasonalcycles_1 : (4 * 1) = 4 := by decide

/-- animism: ancestorlayers(5, 0) = 5 -/
theorem fam_animism_ancestorlayers_1 : (5 + 0) = 5 := by decide

/-- animism: animacyratio(70, 100) = 70 -/
theorem fam_animism_animacyratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- annuity: futurevalue(100, 12) = 1200 — ANNUITY — A STREAM OF LEVEL PAYMENTS, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A loan or a savings plan is numbers: what the payments grow to, what they
    are worth now, the level payment, the total paid, the interest and principal in a payment, how many periods
    remain, and the balance still owed. Crosses to `accounting` — an annuity is what the ledger records. A
    measure. */ const PROOF = 'annuity arithmetic (future value, present value, level payment, total paid,
    interest portion, principal portion, periods, balance); a payment stream the ledger records; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'annuity', dst:
    'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `annuity.${name}`, params }) export
    class AnnuityFormulas { /** FUTURE VALUE: level payments summed over the term (an ordinary-annuity proxy).
    value payment · periods. -/
theorem fam_annuity_futurevalue_1 : (100 * 12) = 1200 := by decide

/-- annuity: presentvalue(100, 12, 10) = 1080 — PRESENT VALUE: the payment stream less a simple discount at a
    percent rate. value payment · periods − ⌊payment · periods · rate / 100⌋. -/
theorem fam_annuity_presentvalue_1 : ((100 * 12) - (((100 * 12) * 10) / 100)) = 1080 := by decide

/-- annuity: payment(1200, 12) = 100 — LEVEL PAYMENT: a principal spread evenly over the periods. value
    ⌊principal / periods⌋. -/
theorem fam_annuity_payment_1 : (1200 / 12) = 100 := by decide

/-- annuity: totalpaid(100, 12) = 1200 — TOTAL PAID: every payment over the term. value payment · periods. -/
theorem fam_annuity_totalpaid_1 : (100 * 12) = 1200 := by decide

/-- annuity: interestportion(1000, 5) = 50 — INTEREST PORTION: the interest on the outstanding balance at a
    percent rate. value ⌊balance · rate / 100⌋. -/
theorem fam_annuity_interestportion_1 : ((1000 * 5) / 100) = 50 := by decide

/-- annuity: principalportion(100, 50) = 50 — PRINCIPAL PORTION: the part of a payment that reduces the balance.
    value max(0, payment − interest). -/
theorem fam_annuity_principalportion_1 : (fmax 0 (100 - 50)) = 50 := by decide

/-- annuity: principalportion(50, 100) = 0 — PRINCIPAL PORTION: the part of a payment that reduces the balance.
    value max(0, payment − interest). -/
theorem fam_annuity_principalportion_2 : (fmax 0 (50 - 100)) = 0 := by decide

/-- annuity: periods(1200, 100) = 12 — PERIODS: how many level payments clear a total. value ⌊total / payment⌋. -/
theorem fam_annuity_periods_1 : (1200 / 100) = 12 := by decide

/-- annuity: balance(1000, 300) = 700 — BALANCE: the principal still owed after what has been paid down. value
    max(0, principal − paid). -/
theorem fam_annuity_balance_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- anthropology: kinship(120, 4) = 30 — ANTHROPOLOGY — THE STUDY OF PEOPLES, AS ARITHMETIC. Kin per generation,
    how far a trait diffuses, lineage per founder, artifacts per dig, strata depth, cognate share of a
    vocabulary, migration per generation, and how often a rite is kept. Crosses to `sociology` — anthropology is
    the long view of what sociology measures now. A measure. */ const PROOF = 'anthropology arithmetic (kinship,
    diffusion, lineage, artifacts, stratigraphy, language, migration, ritual); the study of peoples as integers;
    a measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'anthropology',
    dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `anthropology.${name}`, params })
    export class AnthropologyFormulas { /** KINSHIP: relatives spread over the generations that bore them. value
    ⌊relatives / generations⌋. -/
theorem fam_anthropology_kinship_1 : (120 / 4) = 30 := by decide

/-- anthropology: diffusion(30, 120) = 25 — DIFFUSION: the share of contacts that adopted a trait, as a
    percentage. value ⌊adopted · 100 / contacts⌋. -/
theorem fam_anthropology_diffusion_1 : ((30 * 100) / 120) = 25 := by decide

/-- anthropology: lineage(900, 3) = 300 — LINEAGE: descendants per founding line. value ⌊descendants /
    founders⌋. -/
theorem fam_anthropology_lineage_1 : (900 / 3) = 300 := by decide

/-- anthropology: artifacts(500, 10) = 50 — ARTIFACTS: finds per unit excavated. value ⌊found / excavated⌋. -/
theorem fam_anthropology_artifacts_1 : (500 / 10) = 50 := by decide

/-- anthropology: stratigraphy(240, 8) = 30 — STRATIGRAPHY: depth per layer. value ⌊depth / layers⌋. -/
theorem fam_anthropology_stratigraphy_1 : (240 / 8) = 30 := by decide

/-- anthropology: language(60, 200) = 30 — LANGUAGE: cognate share of a vocabulary, as a percentage. value
    ⌊shared · 100 / words⌋. -/
theorem fam_anthropology_language_1 : ((60 * 100) / 200) = 30 := by decide

/-- anthropology: migration(1000, 25) = 40 — MIGRATION: distance covered per generation. value ⌊distance /
    generations⌋. -/
theorem fam_anthropology_migration_1 : (1000 / 25) = 40 := by decide

/-- anthropology: ritual(9, 12) = 75 — RITUAL: how often a rite is observed across its occasions, as a
    percentage. value ⌊observed · 100 / occasions⌋. -/
theorem fam_anthropology_ritual_1 : ((9 * 100) / 12) = 75 := by decide

/-- apiculture: honey(10, 3) = 30 — APICULTURE — BEEKEEPING, AS ARITHMETIC (chosen by the registry, not by
    hand). Running an apiary is numbers: honey off the frames, the colony's population, foraging trips per bee,
    flowers pollinated, the mite load, the swarming rate, overwinter survival, and the queen's daily lay.
    Crosses to `entomology` — apiculture is the insects entomology studies. A measure. */ const PROOF =
    'apiculture arithmetic (honey yield, population, foraging, pollination, mite load, swarming, overwinter
    survival, queen lay); a beekeeping measure crossed to entomology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'apiculture', dst: 'entomology', formula, value, proof: PROOF, ...extra }, holds,
    { name: `apiculture.${name}`, params }) export class ApicultureFormulas { /** HONEY YIELD: frames at a
    weight each. value frames · perframe. -/
theorem fam_apiculture_honey_1 : (10 * 3) = 30 := by decide

/-- apiculture: population(2000, 3) = 6000 — POPULATION: brood scaled by a workers-per-brood ratio. value brood
    · ratio. -/
theorem fam_apiculture_population_1 : (2000 * 3) = 6000 := by decide

/-- apiculture: foraging(5000, 1000) = 5 — FORAGING: trips per bee. value ⌊trips / bees⌋. -/
theorem fam_apiculture_foraging_1 : (5000 / 1000) = 5 := by decide

/-- apiculture: pollination(100, 50) = 5000 — POLLINATION: flowers visited across the foragers. value flowers ·
    bees. -/
theorem fam_apiculture_pollination_1 : (100 * 50) = 5000 := by decide

/-- apiculture: mite(30, 1000) = 3 — MITE LOAD per hundred bees. value ⌊mites · 100 / bees⌋. -/
theorem fam_apiculture_mite_1 : ((30 * 100) / 1000) = 3 := by decide

/-- apiculture: swarming(2, 10) = 20 — SWARMING rate as a percentage of colonies. value ⌊swarmed · 100 /
    colonies⌋. -/
theorem fam_apiculture_swarming_1 : ((2 * 100) / 10) = 20 := by decide

/-- apiculture: overwinter(8, 10) = 80 — OVERWINTER survival as a percentage of hives. value ⌊survived · 100 /
    hives⌋. -/
theorem fam_apiculture_overwinter_1 : ((8 * 100) / 10) = 80 := by decide

/-- apiculture: queen(30000, 20) = 1500 — QUEEN LAY: eggs per day. value ⌊eggs / days⌋. -/
theorem fam_apiculture_queen_1 : (30000 / 20) = 1500 := by decide

/-- apiology: hivepopulation(50000, 1) = 50000 -/
theorem fam_apiology_hivepopulation_1 : (50000 * 1) = 50000 := by decide

/-- apiology: combcells(6000, 8) = 48000 -/
theorem fam_apiology_combcells_1 : (6000 * 8) = 48000 := by decide

/-- apiology: foragerange(5, 1000) = 5000 -/
theorem fam_apiology_foragerange_1 : (5 * 1000) = 5000 := by decide

/-- apiology: pollenloads(60000, 100) = 600 -/
theorem fam_apiology_pollenloads_1 : (60000 / 100) = 600 := by decide

/-- apiology: honeyyield(30, 1) = 30 -/
theorem fam_apiology_honeyyield_1 : (30 * 1) = 30 := by decide

/-- apiology: broodcycle(16, 5) = 21 -/
theorem fam_apiology_broodcycle_1 : (16 + 5) = 21 := by decide

/-- apiology: swarmthreshold(60, 100) = 60 -/
theorem fam_apiology_swarmthreshold_1 : ((60 * 100) / 100) = 60 := by decide

/-- apocrypha: bookcount(15, 7) = 22 -/
theorem fam_apocrypha_bookcount_1 : (15 + 7) = 22 := by decide

/-- apocrypha: inclusionsubsets(15) = 32768 -/
theorem fam_apocrypha_inclusionsubsets_1 : (2 ^ 15) = 32768 := by decide

/-- apocrypha: disputedratio(7, 22) = 31 -/
theorem fam_apocrypha_disputedratio_1 : ((7 * 100) / 22) = 31 := by decide

/-- apocrypha: versetotal(183, 10) = 1830 -/
theorem fam_apocrypha_versetotal_1 : (183 * 10) = 1830 := by decide

/-- apoptosis: deathrate(250, 1000) = 25 — APOPTOSIS — PROGRAMMED CELL DEATH, AS ARITHMETIC. The orderly removal
    of cells is numbers: the fraction that die, the fraction that survive, how active the caspases are, how fast
    a tissue turns over, how quickly apoptotic bodies are cleared, the net growth left behind, the apoptotic
    index a pathologist counts, and the half-life of a population. Crosses to `physiology` — apoptosis is what
    the living system regulates. A measure. */ const PROOF = 'apoptosis arithmetic (death rate, survival
    fraction, caspase activity, tissue turnover, clearance, net growth, apoptotic index, half-life); a measure
    crossed to physiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'apoptosis', dst:
    'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `apoptosis.${name}`, params }) export
    class ApoptosisFormulas { /** DEATH RATE: dead cells as a percentage of the total. value ⌊dead · 100 /
    total⌋. -/
theorem fam_apoptosis_deathrate_1 : ((250 * 100) / 1000) = 25 := by decide

/-- apoptosis: survivalfraction(250, 1000) = 75 — SURVIVAL FRACTION: survivors as a percentage of the total.
    value ⌊(total − dead) · 100 / total⌋. -/
theorem fam_apoptosis_survivalfraction_1 : (((1000 - 250) * 100) / 1000) = 75 := by decide

/-- apoptosis: caspaseactivity(500, 4) = 2000 — CASPASE ACTIVITY: substrate molecules cleaved at a per-substrate
    rate. value substrate · rate. -/
theorem fam_apoptosis_caspaseactivity_1 : (500 * 4) = 2000 := by decide

/-- apoptosis: turnover(10000, 50) = 200 — TURNOVER: cells replaced per day across the span. value ⌊cells /
    days⌋. -/
theorem fam_apoptosis_turnover_1 : (10000 / 50) = 200 := by decide

/-- apoptosis: netgrowth(800, 300) = 500 — NET GROWTH: births over deaths, never below zero. value max(0, births
    − deaths). -/
theorem fam_apoptosis_netgrowth_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- apoptosis: netgrowth(300, 800) = 0 — NET GROWTH: births over deaths, never below zero. value max(0, births −
    deaths). -/
theorem fam_apoptosis_netgrowth_2 : (fmax 0 (300 - 800)) = 0 := by decide

/-- apoptosis: apoptoticindex(15, 1000) = 15 — APOPTOTIC INDEX: apoptotic cells per thousand counted. value
    ⌊apoptotic · 1000 / total⌋. -/
theorem fam_apoptosis_apoptoticindex_1 : ((15 * 1000) / 1000) = 15 := by decide

/-- apoptosis: halflife(240, 4) = 60 — HALF-LIFE: elapsed time per halving of the population. value ⌊elapsed /
    halvings⌋. -/
theorem fam_apoptosis_halflife_1 : (240 / 4) = 60 := by decide

/-- aquaculture: fcr(150, 100) = 150 — AQUACULTURE — RAISING FISH, AS ARITHMETIC (chosen by the farm registry,
    not by hand). A fish farm is numbers: feed conversion ratio, stocking density, dissolved oxygen against
    demand, growth over a cycle, survival to harvest, standing biomass, the daily feeding rate, and ammonia
    concentration. Crosses to `fishery` — aquaculture feeds the catch. A measure. */ const PROOF = 'aquaculture
    arithmetic (feed conversion, density, oxygen, growth, survival, biomass, feeding rate, ammonia); a farm
    registry domain; a measure crossed to fishery' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'aquaculture', dst: 'fishery', formula, value, proof: PROOF, ...extra }, holds, { name:
    `aquaculture.${name}`, params }) export class AquacultureFormulas { /** FEED CONVERSION RATIO: feed given
    per unit of gain, ·100. value ⌊feed · 100 / gain⌋. -/
theorem fam_aquaculture_fcr_1 : ((150 * 100) / 100) = 150 := by decide

/-- aquaculture: density(1000, 50) = 20 — STOCKING DENSITY: fish per unit of volume. value ⌊fish / volume⌋. -/
theorem fam_aquaculture_density_1 : (1000 / 50) = 20 := by decide

/-- aquaculture: oxygen(8, 5) = 160 — OXYGEN: dissolved against demand, as a percentage. value ⌊dissolved · 100
    / demand⌋. -/
theorem fam_aquaculture_oxygen_1 : ((8 * 100) / 5) = 160 := by decide

/-- aquaculture: growth(500, 50) = 450 — GROWTH: weight gained over the cycle. value max(0, final − initial). -/
theorem fam_aquaculture_growth_1 : (fmax 0 (500 - 50)) = 450 := by decide

/-- aquaculture: survival(900, 1000) = 90 — SURVIVAL: harvested of stocked, as a percentage. value ⌊harvested ·
    100 / stocked⌋. -/
theorem fam_aquaculture_survival_1 : ((900 * 100) / 1000) = 90 := by decide

/-- aquaculture: biomass(1000, 2) = 2000 — BIOMASS: count at a weight each. value count · weight. -/
theorem fam_aquaculture_biomass_1 : (1000 * 2) = 2000 := by decide

/-- aquaculture: feeding(60, 2000) = 3 — FEEDING RATE: ration against biomass, as a percentage. value ⌊ration ·
    100 / biomass⌋. -/
theorem fam_aquaculture_feeding_1 : ((60 * 100) / 2000) = 3 := by decide

/-- aquaculture: ammonia(1000, 50) = 20 — AMMONIA: produced over the volume it dilutes into. value ⌊produced /
    volume⌋. -/
theorem fam_aquaculture_ammonia_1 : (1000 / 50) = 20 := by decide

/-- aquafarming: stockingdensity(1000, 20) = 50 — AQUAFARMING — RAISING FISH IN TANKS AND PONDS, AS ARITHMETIC.
    Running a farm is numbers: how densely a tank is stocked, the standing biomass, the daily feed, the oxygen
    the stock demands, how many survive to harvest, the water a system turns over, how fast fish grow, and the
    weight pulled at harvest. Crosses to `ichthyology` — aquafarming is the fish science applied. A measure. */
    const PROOF = 'aquafarming arithmetic (stocking density, biomass, feed rate, oxygen demand, survival, water
    exchange, growth, harvest weight); fish husbandry as integers; a measure crossed to ichthyology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'aquafarming', dst: 'ichthyology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `aquafarming.${name}`, params }) export class AquafarmingFormulas { /** STOCKING
    DENSITY: fish per unit of water volume. value ⌊fish / volume⌋. -/
theorem fam_aquafarming_stockingdensity_1 : (1000 / 20) = 50 := by decide

/-- aquafarming: biomass(500, 200) = 100000 — BIOMASS: the standing weight of the stock. value count · weight. -/
theorem fam_aquafarming_biomass_1 : (500 * 200) = 100000 := by decide

/-- aquafarming: feedrate(50000, 3) = 1500 — FEED RATE: a percentage of biomass fed each day. value ⌊biomass ·
    percent / 100⌋. -/
theorem fam_aquafarming_feedrate_1 : ((50000 * 3) / 100) = 1500 := by decide

/-- aquafarming: oxygendemand(50000, 5) = 250 — OXYGEN DEMAND: the stock's draw at a per-kg rate. value ⌊biomass
    · rate / 1000⌋. -/
theorem fam_aquafarming_oxygendemand_1 : ((50000 * 5) / 1000) = 250 := by decide

/-- aquafarming: survivalrate(1000, 900) = 90 — SURVIVAL RATE as a percentage. value ⌊harvested · 100 /
    stocked⌋. -/
theorem fam_aquafarming_survivalrate_1 : ((900 * 100) / 1000) = 90 := by decide

/-- aquafarming: survivalrate(1000, 500) = 50 — SURVIVAL RATE as a percentage. value ⌊harvested · 100 /
    stocked⌋. -/
theorem fam_aquafarming_survivalrate_2 : ((500 * 100) / 1000) = 50 := by decide

/-- aquafarming: waterexchange(20, 6) = 120 — WATER EXCHANGE: volume turned over per day. value volume ·
    turnovers. -/
theorem fam_aquafarming_waterexchange_1 : (20 * 6) = 120 := by decide

/-- aquafarming: growthrate(500, 50, 90) = 5 — GROWTH RATE: weight gained per day over a period. value ⌊(final −
    initial) / days⌋. -/
theorem fam_aquafarming_growthrate_1 : ((500 - 50) / 90) = 5 := by decide

/-- aquafarming: harvestweight(900, 250) = 225000 — HARVEST WEIGHT: the total weight pulled at harvest. value
    count · avgweight. -/
theorem fam_aquafarming_harvestweight_1 : (900 * 250) = 225000 := by decide

/-- aquaponics: fishdensity(50, 1) = 50 -/
theorem fam_aquaponics_fishdensity_1 : (50 / 1) = 50 := by decide

/-- aquaponics: plantgrowbeds(4, 2) = 8 -/
theorem fam_aquaponics_plantgrowbeds_1 : (4 * 2) = 8 := by decide

/-- aquaponics: nitrogencycle(3, 0) = 3 -/
theorem fam_aquaponics_nitrogencycle_1 : (3 + 0) = 3 := by decide

/-- aquaponics: feedratio(2, 100) = 2 -/
theorem fam_aquaponics_feedratio_1 : ((2 * 100) / 100) = 2 := by decide

/-- aquaponics: watervolume(1000, 4) = 4000 -/
theorem fam_aquaponics_watervolume_1 : (1000 * 4) = 4000 := by decide

/-- aquaponics: bacteriastrains(2, 1) = 3 -/
theorem fam_aquaponics_bacteriastrains_1 : (2 + 1) = 3 := by decide

/-- aquaponics: phbalance(68, 10) = 6 -/
theorem fam_aquaponics_phbalance_1 : (68 / 10) = 6 := by decide

/-- aquaponics: yieldratio(90, 100) = 90 -/
theorem fam_aquaponics_yieldratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- aquifer: transmissivity(50, 20) = 1000 — AQUIFER — GROUNDWATER AS ARITHMETIC. The subsurface is numbers: how
    fast a formation transmits water, how much it stores, how far the water table falls under pumping, how
    permeable the rock is, how much of it is pore, how much water it will yield, how fast it recharges, and what
    a well delivers. Crosses to `hydrology` — the aquifer is what hydrology measures. A measure. */ const PROOF
    = 'aquifer arithmetic (transmissivity, storativity, drawdown, hydraulic conductivity, porosity, specific
    yield, recharge rate, well yield); groundwater as integer measure crossed to hydrology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'aquifer', dst: 'hydrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `aquifer.${name}`, params }) export class AquiferFormulas { /** TRANSMISSIVITY:
    hydraulic conductivity over the saturated thickness. value k · thickness. -/
theorem fam_aquifer_transmissivity_1 : (50 * 20) = 1000 := by decide

/-- aquifer: storativity(3, 10) = 30 — STORATIVITY: specific storage over the saturated thickness. value
    specific · thickness. -/
theorem fam_aquifer_storativity_1 : (3 * 10) = 30 := by decide

/-- aquifer: drawdown(1000, 50) = 20 — DRAWDOWN: the pumping rate felt against transmissivity. value ⌊rate /
    trans⌋. -/
theorem fam_aquifer_drawdown_1 : (1000 / 50) = 20 := by decide

/-- aquifer: hydraulicconductivity(600, 3) = 200 — HYDRAULIC CONDUCTIVITY: flow over the hydraulic gradient.
    value ⌊flow / gradient⌋. -/
theorem fam_aquifer_hydraulicconductivity_1 : (600 / 3) = 200 := by decide

/-- aquifer: porosity(30, 100) = 30 — POROSITY as a percentage: void volume over total. value ⌊voids · 100 /
    total⌋. -/
theorem fam_aquifer_porosity_1 : ((30 * 100) / 100) = 30 := by decide

/-- aquifer: specificyield(18, 100) = 18 — SPECIFIC YIELD as a percentage: drainable volume over total. value
    ⌊drained · 100 / total⌋. -/
theorem fam_aquifer_specificyield_1 : ((18 * 100) / 100) = 18 := by decide

/-- aquifer: rechargerate(5000, 10) = 500 — RECHARGE RATE: the recharge volume over the years it accrued. value
    ⌊volume / years⌋. -/
theorem fam_aquifer_rechargerate_1 : (5000 / 10) = 500 := by decide

/-- aquifer: wellyield(20, 5) = 100 — WELL YIELD: specific capacity delivered over the available drawdown. value
    drawdown · capacity. -/
theorem fam_aquifer_wellyield_1 : (20 * 5) = 100 := by decide

/-- arachnology: legcount(8, 0) = 8 -/
theorem fam_arachnology_legcount_1 : (8 + 0) = 8 := by decide

/-- arachnology: silkglands(6, 1) = 6 -/
theorem fam_arachnology_silkglands_1 : (6 * 1) = 6 := by decide

/-- arachnology: speciescount(500, 10) = 5000 -/
theorem fam_arachnology_speciescount_1 : (500 * 10) = 5000 := by decide

/-- arachnology: webradials(20, 10) = 30 -/
theorem fam_arachnology_webradials_1 : (20 + 10) = 30 := by decide

/-- arachnology: moltstages(5, 2) = 7 -/
theorem fam_arachnology_moltstages_1 : (5 + 2) = 7 := by decide

/-- arbitrage: spread(10050, 10000) = 50 — ARBITRAGE — RISKLESS PRICE GAPS, AS ARITHMETIC. Trading is numbers:
    the bid-ask spread, net profit after fees, the rate implied across three markets, the percentage gap between
    venues, return on principal, the cost of a transaction in basis points, the units to break even, and the
    edge left after every cost. Crosses to `trading` — arbitrage is a trade with no exposure. A measure. */
    const PROOF = 'arbitrage arithmetic (bid-ask spread, net profit, triangular rate, price difference, return
    rate, transaction cost, breakeven, edge); riskless price gaps as a measure crossed to trading' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'arbitrage', dst: 'trading', formula, value, proof: PROOF,
    ...extra }, holds, { name: `arbitrage.${name}`, params }) export class ArbitrageFormulas { /** THE SPREAD:
    ask over bid. value max(0, ask − bid). -/
theorem fam_arbitrage_spread_1 : (fmax 0 (10050 - 10000)) = 50 := by decide

/-- arbitrage: netprofit(5000, 300) = 4700 — NET PROFIT: gross less fees. value max(0, gross − fees). -/
theorem fam_arbitrage_netprofit_1 : (fmax 0 (5000 - 300)) = 4700 := by decide

/-- arbitrage: triangularrate(120, 110, 100) = 132 — TRIANGULAR RATE: two legs scaled back. value ⌊rate1 · rate2
    / scale⌋. -/
theorem fam_arbitrage_triangularrate_1 : ((120 * 110) / 100) = 132 := by decide

/-- arbitrage: pricedifference(110, 100) = 10 — PRICE DIFFERENCE as a percentage of the low. value ⌊max(0, high
    − low) · 100 / low⌋. -/
theorem fam_arbitrage_pricedifference_1 : (((fmax 0 (110 - 100)) * 100) / 100) = 10 := by decide

/-- arbitrage: returnrate(250, 1000) = 25 — RETURN RATE: profit on principal, as a percentage. value ⌊profit ·
    100 / principal⌋. -/
theorem fam_arbitrage_returnrate_1 : ((250 * 100) / 1000) = 25 := by decide

/-- arbitrage: transactioncost(50000, 25) = 125 — TRANSACTION COST: amount at a rate in basis points. value
    ⌊amount · bps / 10000⌋. -/
theorem fam_arbitrage_transactioncost_1 : ((50000 * 25) / 10000) = 125 := by decide

/-- arbitrage: edge(1000, 600, 100) = 300 — THE EDGE: gross less cost less fees. value max(0, gross − cost −
    fees). -/
theorem fam_arbitrage_edge_1 : (fmax 0 ((1000 - 600) - 100)) = 300 := by decide

/-- arbitrage: pricedifference(100, 110) = 0 — PRICE DIFFERENCE as a percentage of the low. value ⌊max(0, high −
    low) · 100 / low⌋. -/
theorem fam_arbitrage_pricedifference_2 : (((fmax 0 (100 - 110)) * 100) / 110) = 0 := by decide

/-- archaeology: carbon(3) = 17190 — ARCHAEOLOGY — DIGGING THE PAST, AS ARITHMETIC. The record is numbers:
    radiocarbon age from half-lives, the depth of stacked strata, how old a find is against a reference, finds
    per area, the span a seriation covers, the share of a typology matched, the days an excavation takes, and
    the decay a dating reads. Crosses to `cern` — the same decay the particle lab measures. A measure. */ const
    PROOF = 'archaeology arithmetic (radiocarbon age, stratum depth, find age, artifact density, seriation span,
    typology share, excavation days, radiometric dating); a measure crossed to cern' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'archaeology', dst: 'cern', formula, value, proof: PROOF, ...extra
    }, holds, { name: `archaeology.${name}`, params }) export class ArchaeologyFormulas { /** RADIOCARBON AGE:
    half-lives at the carbon-14 half-life. value ⌊5730 · halflives⌋ years. -/
theorem fam_archaeology_carbon_1 : (5730 * 3) = 17190 := by decide

/-- archaeology: stratum(5, 20) = 100 — STRATUM DEPTH: layers at a thickness each. value layers · each. -/
theorem fam_archaeology_stratum_1 : (5 * 20) = 100 := by decide

/-- archaeology: age(1200, 2024) = 824 — FIND AGE: a found date against a reference. value max(0, reference −
    found). -/
theorem fam_archaeology_age_1 : (fmax 0 (2024 - 1200)) = 824 := by decide

/-- archaeology: artifacts(150, 5) = 30 — ARTIFACT DENSITY: finds over the area dug. value ⌊finds / area⌋. -/
theorem fam_archaeology_artifacts_1 : (150 / 5) = 30 := by decide

/-- archaeology: seriation(100, 450) = 350 — SERIATION SPAN: earliest to latest. value max(0, late − early). -/
theorem fam_archaeology_seriation_1 : (fmax 0 (450 - 100)) = 350 := by decide

/-- archaeology: typology(30, 120) = 25 — TYPOLOGY SHARE: matched of total, as a percentage. value ⌊matched ·
    100 / total⌋. -/
theorem fam_archaeology_typology_1 : ((30 * 100) / 120) = 25 := by decide

/-- archaeology: excavation(1000, 50) = 20 — EXCAVATION DAYS: volume at a per-day rate. value ⌊volume / rate⌋. -/
theorem fam_archaeology_excavation_1 : (1000 / 50) = 20 := by decide

/-- archaeology: dating(25, 100) = 25 — RADIOMETRIC DATING: decayed of original, as a percentage. value ⌊decayed
    · 100 / original⌋. -/
theorem fam_archaeology_dating_1 : ((25 * 100) / 100) = 25 := by decide

/-- arpeggio: notespan(60, 72) = 12 — ARPEGGIO — A BROKEN CHORD, AS ARITHMETIC. Playing a chord one note at a
    time is numbers: the span between lowest and highest note, the length of one cycle, how long each note
    lasts, how many times the pattern repeats, the octave range, the velocity ramp across the sweep, the sweep
    rate, and the total notes played. Crosses to `music`. A measure. */ const PROOF = 'arpeggio arithmetic (note
    span, cycle length, note duration, pattern repeats, octave range, velocity curve, sweep rate, total notes);
    a broken chord as a measure crossed to music' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0 && x <= 65535) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'arpeggio', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name:
    `arpeggio.${name}`, params }) export class ArpeggioFormulas { /** NOTE SPAN: semitones between the lowest
    and highest note. value max(0, high − low). -/
theorem fam_arpeggio_notespan_1 : (fmax 0 (72 - 60)) = 12 := by decide

/-- arpeggio: cyclelength(4, 3) = 12 — CYCLE LENGTH: notes in one cycle across the octaves it covers. value
    notes · octaves. -/
theorem fam_arpeggio_cyclelength_1 : (4 * 3) = 12 := by decide

/-- arpeggio: noteduration(1000, 8) = 125 — NOTE DURATION: milliseconds each note gets of the total. value
    ⌊total / notes⌋. -/
theorem fam_arpeggio_noteduration_1 : (1000 / 8) = 125 := by decide

/-- arpeggio: patternrepeats(8, 2) = 16 — PATTERN REPEATS: how many times the pattern plays over the bars. value
    bars · perBar. -/
theorem fam_arpeggio_patternrepeats_1 : (8 * 2) = 16 := by decide

/-- arpeggio: rangeoctaves(36) = 3 — RANGE OCTAVES: whole octaves spanned by a semitone span. value ⌊span / 12⌋. -/
theorem fam_arpeggio_rangeoctaves_1 : (36 / 12) = 3 := by decide

/-- arpeggio: velocitycurve(64, 4, 3) = 76 — VELOCITY CURVE: velocity at a step of a linear ramp. value start +
    step · index. -/
theorem fam_arpeggio_velocitycurve_1 : (64 + (4 * 3)) = 76 := by decide

/-- arpeggio: sweeprate(120, 4) = 30 — SWEEP RATE: notes per second across the sweep. value ⌊notes / seconds⌋. -/
theorem fam_arpeggio_sweeprate_1 : (120 / 4) = 30 := by decide

/-- arpeggio: totalnotes(4, 8) = 32 — TOTAL NOTES: notes per cycle over the cycles played. value cycleNotes ·
    cycles. -/
theorem fam_arpeggio_totalnotes_1 : (4 * 8) = 32 := by decide

/-- assay: concentration(1000, 50) = 20 — ASSAY — THE BENCH, AS ARITHMETIC (chosen by the registry, not by
    hand). A quantitative assay is numbers: concentration from mass and volume, dilution by the C1V1 rule,
    percent recovery, a limit of detection, a point on the standard curve, purity, reaction yield, and the mean
    of replicates. Crosses to `chemistry` — assay is what chemistry measures. A measure. */ const PROOF = 'assay
    arithmetic (concentration, dilution, recovery, limit of detection, standard curve, purity, yield, replicate
    mean); a quantitative measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'assay', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `assay.${name}`,
    params }) export class AssayFormulas { /** CONCENTRATION: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_assay_concentration_1 : (1000 / 50) = 20 := by decide

/-- assay: dilution(100, 10, 50) = 20 — DILUTION by the C1V1 = C2V2 rule: concentration after diluting a sample
    into a total. value ⌊conc · vol / total⌋. -/
theorem fam_assay_dilution_1 : ((100 * 10) / 50) = 20 := by decide

/-- assay: recovery(95, 100) = 95 — RECOVERY as a percentage. value ⌊found · 100 / expected⌋. -/
theorem fam_assay_recovery_1 : ((95 * 100) / 100) = 95 := by decide

/-- assay: limitofdetection(10, 3, 2) = 16 — LIMIT OF DETECTION: the blank plus k standard deviations. value
    blank + k · sd. -/
theorem fam_assay_limitofdetection_1 : (10 + (3 * 2)) = 16 := by decide

/-- assay: standardcurve(5, 20, 3) = 103 — STANDARD CURVE: a point on the line y = slope · x + intercept. value
    slope · x + intercept. -/
theorem fam_assay_standardcurve_1 : ((5 * 20) + 3) = 103 := by decide

/-- assay: purity(990, 1000) = 99 — PURITY as a percentage. value ⌊pure · 100 / total⌋. -/
theorem fam_assay_purity_1 : ((990 * 100) / 1000) = 99 := by decide

/-- assay: yield(80, 100) = 80 — YIELD: actual over theoretical, as a percentage. value ⌊actual · 100 /
    theoretical⌋. -/
theorem fam_assay_yield_1 : ((80 * 100) / 100) = 80 := by decide

/-- assay: replicates(300, 3) = 100 — REPLICATES: the mean of a summed set of replicate readings. value ⌊sum /
    n⌋. -/
theorem fam_assay_replicates_1 : (300 / 3) = 100 := by decide

/-- assay: concentration(1000, 0) = 0 — ASSAY — THE BENCH, AS ARITHMETIC (chosen by the registry, not by hand).
    A quantitative assay is numbers: concentration from mass and volume, dilution by the C1V1 rule, percent
    recovery, a limit of detection, a point on the standard curve, purity, reaction yield, and the mean of
    replicates. Crosses to `chemistry` — assay is what chemistry measures. A measure. */ const PROOF = 'assay
    arithmetic (concentration, dilution, recovery, limit of detection, standard curve, purity, yield, replicate
    mean); a quantitative measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'assay', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `assay.${name}`,
    params }) export class AssayFormulas { /** CONCENTRATION: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_assay_concentration_2 : (1000 / 0) = 0 := by decide

/-- assembly: takt(480, 60) = 8 — ASSEMBLY — THE PRODUCTION LINE AS ARITHMETIC (chosen by the manufacturing
    registry, not by hand). Building a product is numbers: the takt the demand sets, the cycle a unit takes, the
    stations the work content needs, how balanced the line is, units per hour, the work in progress Little's law
    carries, line efficiency, and first-pass yield. Crosses to `manufacturing` — assembly is what a plant runs.
    A measure. */ const PROOF = 'assembly arithmetic (takt, cycle, line balance, workstations, throughput, work
    in progress, efficiency, yield); the manufacturing registry\'s uncovered line domain; a measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'assembly', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `assembly.${name}`, params }) export class
    AssemblyFormulas { /** TAKT: the available time one unit of demand is allowed. value ⌊time / demand⌋. -/
theorem fam_assembly_takt_1 : (480 / 60) = 8 := by decide

/-- assembly: cycle(600, 120) = 5 — CYCLE: the average time a unit takes over a run. value ⌊total / units⌋. -/
theorem fam_assembly_cycle_1 : (600 / 120) = 5 := by decide

/-- assembly: throughput(960, 8) = 120 — THROUGHPUT: units produced over the hours run. value ⌊units / hours⌋. -/
theorem fam_assembly_throughput_1 : (960 / 8) = 120 := by decide

/-- assembly: wip(120, 5) = 600 — WORK IN PROGRESS: Little's law, throughput held over a cycle. value rate ·
    cycle. -/
theorem fam_assembly_wip_1 : (120 * 5) = 600 := by decide

/-- assembly: efficiency(90, 10) = 90 — EFFICIENCY: useful work over the worked time, as a percentage. value
    ⌊task · 100 / (task + idle)⌋. -/
theorem fam_assembly_efficiency_1 : ((90 * 100) / (90 + 10)) = 90 := by decide

/-- assembly: yield(980, 1000) = 98 — YIELD: the good units off the line, as a percentage. value ⌊good · 100 /
    total⌋. -/
theorem fam_assembly_yield_1 : ((980 * 100) / 1000) = 98 := by decide

/-- assembly: takt(480, 0) = 0 — ASSEMBLY — THE PRODUCTION LINE AS ARITHMETIC (chosen by the manufacturing
    registry, not by hand). Building a product is numbers: the takt the demand sets, the cycle a unit takes, the
    stations the work content needs, how balanced the line is, units per hour, the work in progress Little's law
    carries, line efficiency, and first-pass yield. Crosses to `manufacturing` — assembly is what a plant runs.
    A measure. */ const PROOF = 'assembly arithmetic (takt, cycle, line balance, workstations, throughput, work
    in progress, efficiency, yield); the manufacturing registry\'s uncovered line domain; a measure crossed to
    manufacturing' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'assembly', dst: 'manufacturing',
    formula, value, proof: PROOF, ...extra }, holds, { name: `assembly.${name}`, params }) export class
    AssemblyFormulas { /** TAKT: the available time one unit of demand is allowed. value ⌊time / demand⌋. -/
theorem fam_assembly_takt_2 : (480 / 0) = 0 := by decide

/-- assessment: score(45, 50) = 90 — ASSESSMENT — MEASURING WHAT A LEARNER KNOWS, AS ARITHMETIC. Grading is
    numbers: a raw score as a percentage, a percentile rank, a curved grade, the pass rate of a cohort, a
    weighted mean of parts, total rubric points, the mastery level reached, and the improvement between two
    sittings. Crosses to `pedagogy` — assessment is what teaching is judged by. A measure. */ const PROOF =
    'assessment arithmetic (score percentage, percentile rank, curved grade, pass rate, weighted mean, rubric
    points, mastery level, improvement); a measure crossed to pedagogy' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'assessment', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, {
    name: `assessment.${name}`, params }) export class AssessmentFormulas { /** SCORE: correct answers as a
    percentage of the total. value ⌊correct · 100 / total⌋. -/
theorem fam_assessment_score_1 : ((45 * 100) / 50) = 90 := by decide

/-- assessment: percentile(80, 100) = 80 — PERCENTILE: the share of a cohort scoring at or below, as a
    percentage. value ⌊below · 100 / total⌋. -/
theorem fam_assessment_percentile_1 : ((80 * 100) / 100) = 80 := by decide

/-- assessment: gradecurve(72, 8) = 80 — GRADE CURVE: a raw grade lifted by a bonus. value raw + bonus. -/
theorem fam_assessment_gradecurve_1 : (72 + 8) = 80 := by decide

/-- assessment: passrate(18, 20) = 90 — PASS RATE: those who passed as a percentage of those who sat. value
    ⌊passed · 100 / total⌋. -/
theorem fam_assessment_passrate_1 : ((18 * 100) / 20) = 90 := by decide

/-- assessment: weightedmean(350, 4) = 87 — WEIGHTED MEAN: the weighted total over the total weight. value ⌊sum
    / weight⌋. -/
theorem fam_assessment_weightedmean_1 : (350 / 4) = 87 := by decide

/-- assessment: rubricscore(5, 4) = 20 — RUBRIC SCORE: points awarded per criterion across the criteria. value
    points · criteria. -/
theorem fam_assessment_rubricscore_1 : (5 * 4) = 20 := by decide

/-- assessment: masterylevel(7, 10) = 70 — MASTERY LEVEL: objectives mastered as a percentage of the total.
    value ⌊mastered · 100 / total⌋. -/
theorem fam_assessment_masterylevel_1 : ((7 * 100) / 10) = 70 := by decide

/-- assessment: improvement(85, 60) = 25 — IMPROVEMENT: the gain from a prior sitting to a later one. value
    max(0, post − pre). -/
theorem fam_assessment_improvement_1 : (fmax 0 (85 - 60)) = 25 := by decide

/-- assessment: improvement(50, 70) = 0 — IMPROVEMENT: the gain from a prior sitting to a later one. value
    max(0, post − pre). -/
theorem fam_assessment_improvement_2 : (fmax 0 (50 - 70)) = 0 := by decide

/-- astrobiology: habitablezone(4, 25) = 100 — ASTROBIOLOGY — THE SEARCH FOR LIFE, AS ARITHMETIC. Where life can
    sit (the habitable zone), how many worlds might host it (Drake), how clear its traces are (biosignatures),
    how a cell spends energy (metabolism), how far past the edge it survives (extremophiles), how it rides
    between worlds (panspermia), how an atmosphere fills with oxygen, and how often the first chemistry runs
    (abiogenesis). Crosses to `chemistry` — life is chemistry that persists. A measure. */ const PROOF =
    'astrobiology arithmetic (habitable zone, Drake, biosignature, metabolism, extremophile, panspermia,
    oxygenation, abiogenesis); integer proxies for the search for life; a measure crossed to chemistry' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'astrobiology', dst: 'chemistry', formula, value,
    proof: PROOF, ...extra }, holds, { name: `astrobiology.${name}`, params }) export class AstrobiologyFormulas
    { /** HABITABLE ZONE: the orbital radius proxy at a stellar luminosity and scale factor. value luminosity ·
    factor. -/
theorem fam_astrobiology_habitablezone_1 : (4 * 25) = 100 := by decide

/-- astrobiology: drake(7, 2, 100) = 1400 — DRAKE: communicating civilisations as a product of rate,
    life-fraction, and lifetime. value rate · fraction · lifetime. -/
theorem fam_astrobiology_drake_1 : ((7 * 2) * 100) = 1400 := by decide

/-- astrobiology: biosignature(3, 4) = 75 — BIOSIGNATURE: markers detected out of those sought, as a percentage.
    value ⌊detected · 100 / total⌋. -/
theorem fam_astrobiology_biosignature_1 : ((3 * 100) / 4) = 75 := by decide

/-- astrobiology: metabolism(1000, 8) = 125 — METABOLISM: energy budget spread over the cells it feeds. value
    ⌊energy / cells⌋. -/
theorem fam_astrobiology_metabolism_1 : (1000 / 8) = 125 := by decide

/-- astrobiology: extremophile(80, 122) = 42 — EXTREMOPHILE: the survival margin below a thermal limit. value
    max(0, limit − temp). -/
theorem fam_astrobiology_extremophile_1 : (fmax 0 (122 - 80)) = 42 := by decide

/-- astrobiology: panspermia(1000, 60, 100) = 600 — PANSPERMIA: seeds surviving a transit, scaled by survival
    rate over distance. value ⌊seeds · survival / distance⌋. -/
theorem fam_astrobiology_panspermia_1 : ((1000 * 60) / 100) = 600 := by decide

/-- astrobiology: oxygenation(21, 100) = 21 — OXYGENATION: atmospheric oxygen as a percentage of the whole.
    value ⌊oxygen · 100 / total⌋. -/
theorem fam_astrobiology_oxygenation_1 : ((21 * 100) / 100) = 21 := by decide

/-- astrobiology: abiogenesis(50, 1000) = 50000 — ABIOGENESIS: cumulative prebiotic reactions over elapsed time.
    value reactions · time. -/
theorem fam_astrobiology_abiogenesis_1 : (50 * 1000) = 50000 := by decide

/-- astrobiology: extremophile(200, 122) = 0 — EXTREMOPHILE: the survival margin below a thermal limit. value
    max(0, limit − temp). -/
theorem fam_astrobiology_extremophile_2 : (fmax 0 (122 - 200)) = 0 := by decide

/-- astrometry: parallax(1000, 50) = 20 — ASTROMETRY — MEASURING WHERE THE STARS ARE, AS ARITHMETIC (positions,
    motions and the optics that read them, not by hand). Measuring the sky is numbers: the parallax of a
    baseline, the distance it implies, proper motion per year, magnitude against a reference, the airmass looked
    through, angular resolution, field of view and the pixel scale that samples it. Crosses to `astronomy` —
    astrometry is the measurement astronomy is built on. A measure. */ const PROOF = 'astrometry arithmetic
    (parallax, distance, proper motion, magnitude, airmass, resolution, field of view, pixel scale); positions
    and motions of the stars and the optics that read them; a measure crossed to astronomy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'astrometry', dst: 'astronomy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `astrometry.${name}`, params }) export class AstrometryFormulas { /** PARALLAX:
    the angle a baseline subtends at a distance. value ⌊baseline / distance⌋. -/
theorem fam_astrometry_parallax_1 : (1000 / 50) = 20 := by decide

/-- astrometry: distance(10) = 100 — DISTANCE: parsecs from a parallax (the 1000/p law). value ⌊1000 /
    parallax⌋. -/
theorem fam_astrometry_distance_1 : (1000 / 10) = 100 := by decide

/-- astrometry: propermotion(360, 4) = 90 — PROPER MOTION: the arc a star crosses per year. value ⌊shift /
    years⌋. -/
theorem fam_astrometry_propermotion_1 : (360 / 4) = 90 := by decide

/-- astrometry: magnitude(100, 250) = 150 — MAGNITUDE: how much fainter than a reference. value max(0, ref −
    flux). -/
theorem fam_astrometry_magnitude_1 : (fmax 0 (250 - 100)) = 150 := by decide

/-- astrometry: magnitude(300, 100) = 0 — MAGNITUDE: how much fainter than a reference. value max(0, ref −
    flux). -/
theorem fam_astrometry_magnitude_2 : (fmax 0 (100 - 300)) = 0 := by decide

/-- astrometry: resolution(50, 10) = 500 — RESOLUTION: the angle an aperture resolves at a wavelength. value
    ⌊wavelength · 100 / aperture⌋. -/
theorem fam_astrometry_resolution_1 : ((50 * 100) / 10) = 500 := by decide

/-- astrometry: fieldofview(36, 50) = 720 — FIELD OF VIEW: the sky a sensor spans at a focal length. value
    ⌊sensor · 1000 / focal⌋. -/
theorem fam_astrometry_fieldofview_1 : ((36 * 1000) / 50) = 720 := by decide

/-- astrometry: pixelscale(3600, 1800) = 2 — PIXEL SCALE: the sky one pixel samples across a field. value ⌊fov /
    pixels⌋. -/
theorem fam_astrometry_pixelscale_1 : (3600 / 1800) = 2 := by decide

/-- astronomy: magnitude(2, 6) = 4 — ASTRONOMY — THE SKY AS ARITHMETIC. Measuring the heavens is integers: how
    much brighter one star is than another, a luminosity proxy from radius and temperature, distance by
    parallax, redshift of a line, the pull of a body (escape), an orbit split across bodies, bulk density, and
    how much light a surface throws back (albedo). Crosses to `gravity` — astronomy is what gravity shapes. A
    measure. */ const PROOF = 'astronomy arithmetic (magnitude, luminosity proxy, parallax, redshift, escape,
    orbital, density, albedo); the sky as integers; a measure crossed to gravity' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'astronomy', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, {
    name: `astronomy.${name}`, params }) export class AstronomyFormulas { /** MAGNITUDE DIFFERENCE: how many
    magnitudes brighter (clamped at 0). value max(0, fainter − brighter). -/
theorem fam_astronomy_magnitude_1 : (fmax 0 (6 - 2)) = 4 := by decide

/-- astronomy: magnitude(6, 2) = 0 — ASTRONOMY — THE SKY AS ARITHMETIC. Measuring the heavens is integers: how
    much brighter one star is than another, a luminosity proxy from radius and temperature, distance by
    parallax, redshift of a line, the pull of a body (escape), an orbit split across bodies, bulk density, and
    how much light a surface throws back (albedo). Crosses to `gravity` — astronomy is what gravity shapes. A
    measure. */ const PROOF = 'astronomy arithmetic (magnitude, luminosity proxy, parallax, redshift, escape,
    orbital, density, albedo); the sky as integers; a measure crossed to gravity' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'astronomy', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, {
    name: `astronomy.${name}`, params }) export class AstronomyFormulas { /** MAGNITUDE DIFFERENCE: how many
    magnitudes brighter (clamped at 0). value max(0, fainter − brighter). -/
theorem fam_astronomy_magnitude_2 : (fmax 0 (2 - 6)) = 0 := by decide

/-- astronomy: parallax(100, 50) = 2000 — PARALLAX: arcsec ×1000 from a baseline over a distance. value
    ⌊baseline · 1000 / distance⌋. -/
theorem fam_astronomy_parallax_1 : ((100 * 1000) / 50) = 2000 := by decide

/-- astronomy: redshift(1100, 1000) = 100 — REDSHIFT: z ×1000 from an observed over a rest wavelength. value
    ⌊(observed − rest) · 1000 / rest⌋. -/
theorem fam_astronomy_redshift_1 : (((1100 - 1000) * 1000) / 1000) = 100 := by decide

/-- astronomy: escape(1000, 10) = 100 — ESCAPE proxy: mass over radius. value ⌊mass / radius⌋. -/
theorem fam_astronomy_escape_1 : (1000 / 10) = 100 := by decide

/-- astronomy: orbital(365, 5) = 73 — ORBITAL: a period split across bodies. value ⌊period / count⌋. -/
theorem fam_astronomy_orbital_1 : (365 / 5) = 73 := by decide

/-- astronomy: density(1000, 8) = 125 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_astronomy_density_1 : (1000 / 8) = 125 := by decide

/-- astronomy: albedo(30, 100) = 30 — ALBEDO as a percentage: reflected over incident. value ⌊reflected · 100 /
    incident⌋. -/
theorem fam_astronomy_albedo_1 : ((30 * 100) / 100) = 30 := by decide

/-- astrophysics: schwarzschild(10) = 30 — ASTROPHYSICS — THE SKY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A star's reach is numbers: its Schwarzschild radius by mass, the Chandrasekhar
    fraction, surface luminosity, the redshift of a line, the Jeans balance of a cloud, the Eddington limit, the
    tidal pull at a distance, and the nuclear timescale. Crosses to `gravity` — the sky is what gravity shapes.
    A measure. */ const PROOF = 'astrophysics arithmetic (Schwarzschild radius, Chandrasekhar fraction,
    luminosity, redshift, Jeans balance, Eddington limit, tidal pull, nuclear timescale); a measure crossed to
    gravity' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'astrophysics', dst: 'gravity',
    formula, value, proof: PROOF, ...extra }, holds, { name: `astrophysics.${name}`, params }) export class
    AstrophysicsFormulas { /** SCHWARZSCHILD RADIUS: km per solar mass (~2.95, rounded to 3). value mass · 3. -/
theorem fam_astrophysics_schwarzschild_1 : (10 * 3) = 30 := by decide

/-- astrophysics: chandrasekhar(144) = 100 — CHANDRASEKHAR: the fraction of the 1.44 solar-mass limit, ×100.
    value ⌊mass · 100 / 144⌋. -/
theorem fam_astrophysics_chandrasekhar_1 : ((144 * 100) / 144) = 100 := by decide

/-- astrophysics: redshift(1100, 1000) = 100 — REDSHIFT: z of a line, ×1000. value ⌊(observed − emitted) · 1000
    / emitted⌋. -/
theorem fam_astrophysics_redshift_1 : (((1100 - 1000) * 1000) / 1000) = 100 := by decide

/-- astrophysics: jeans(1000, 10) = 100 — JEANS: the temperature-density balance of a cloud. value ⌊temperature
    / density⌋. -/
theorem fam_astrophysics_jeans_1 : (1000 / 10) = 100 := by decide

/-- astrophysics: eddington(5) = 165000 — EDDINGTON: the luminosity limit proxy by mass. value mass · 33000. -/
theorem fam_astrophysics_eddington_1 : (5 * 33000) = 165000 := by decide

/-- astrophysics: timescale(10, 1000) = 100 — TIMESCALE: the nuclear timescale, mass over luminosity. value
    ⌊mass · 10000 / luminosity⌋. -/
theorem fam_astrophysics_timescale_1 : ((10 * 10000) / 1000) = 100 := by decide

/-- astrophysics: chandrasekhar(0) = 0 — CHANDRASEKHAR: the fraction of the 1.44 solar-mass limit, ×100. value
    ⌊mass · 100 / 144⌋. -/
theorem fam_astrophysics_chandrasekhar_2 : ((0 * 100) / 144) = 0 := by decide

/-- athletics: pace(300, 5) = 60 — ATHLETICS — PERFORMANCE AS ARITHMETIC. Sport is numbers: pace per unit of
    distance, speed over time, stride per step, the even split across laps, an estimated VO2 max, mechanical
    power, the height of a jump, and a scoring-table points total against a standard. Crosses to `sports` —
    athletics is the measured side of the game. A measure. */ const PROOF = 'athletics arithmetic (pace, speed,
    stride, split, vo2max, power, jump, points); performance as integer measures crossed to sports' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'athletics', dst: 'sports', formula, value, proof: PROOF, ...extra
    }, holds, { name: `athletics.${name}`, params }) export class AthleticsFormulas { /** PACE: seconds per unit
    of distance. value ⌊seconds / distance⌋. -/
theorem fam_athletics_pace_1 : (300 / 5) = 60 := by decide

/-- athletics: speed(1000, 125) = 8 — SPEED: distance over seconds. value ⌊distance / seconds⌋. -/
theorem fam_athletics_speed_1 : (1000 / 125) = 8 := by decide

/-- athletics: stride(1000, 500) = 2 — STRIDE: distance per step. value ⌊distance / steps⌋. -/
theorem fam_athletics_stride_1 : (1000 / 500) = 2 := by decide

/-- athletics: split(400, 4) = 100 — SPLIT: an even share of the total across the laps. value ⌊total / laps⌋. -/
theorem fam_athletics_split_1 : (400 / 4) = 100 := by decide

/-- athletics: vo2max(12, 30) = 400 — VO2 MAX: a speed-over-age estimate. value ⌊speed · 1000 / age⌋. -/
theorem fam_athletics_vo2max_1 : ((12 * 1000) / 30) = 400 := by decide

/-- athletics: power(1000, 10) = 100 — POWER: work over time. value ⌊work / time⌋. -/
theorem fam_athletics_power_1 : (1000 / 10) = 100 := by decide

/-- athletics: points(950, 1000) = 950 — POINTS: a scoring-table total against a standard. value ⌊performance ·
    1000 / standard⌋. -/
theorem fam_athletics_points_1 : ((950 * 1000) / 1000) = 950 := by decide

/-- atmospheric: pressure(1013, 300) = 713 — ATMOSPHERIC — THE AIR ABOVE THE GROUND, AS ARITHMETIC (chosen by
    the registry, not by hand). The atmosphere is numbers: pressure falling with altitude, the lapse rate,
    relative humidity, column ozone, wind shear, parcel stability, the Coriolis turn, and aerosol density.
    Crosses to `climate` — the atmosphere is what climate integrates. A measure. */ const PROOF = 'atmospheric
    arithmetic (pressure, lapse rate, humidity, ozone, wind shear, stability, Coriolis, aerosol); the
    registry\'s air domain; a measure crossed to climate' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'atmospheric', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name:
    `atmospheric.${name}`, params }) export class AtmosphericFormulas { /** PRESSURE at altitude: sea-level
    pressure less the altitude drop. value max(0, sealevel − altitude). -/
theorem fam_atmospheric_pressure_1 : (fmax 0 (1013 - 300)) = 713 := by decide

/-- atmospheric: lapserate(60, 10) = 6 — LAPSE RATE: surface temperature over the height it falls across. value
    ⌊surface / height⌋. -/
theorem fam_atmospheric_lapserate_1 : (60 / 10) = 6 := by decide

/-- atmospheric: humidity(15, 20) = 75 — RELATIVE HUMIDITY as a percentage. value ⌊vapor · 100 / saturation⌋. -/
theorem fam_atmospheric_humidity_1 : ((15 * 100) / 20) = 75 := by decide

/-- atmospheric: ozone(300) = 300 — COLUMN OZONE in Dobson units. value dobson. -/
theorem fam_atmospheric_ozone_1 : 300 = 300 := by decide

/-- atmospheric: windshear(80, 20) = 60 — WIND SHEAR: the speed difference between upper and lower layers. value
    max(0, upper − lower). -/
theorem fam_atmospheric_windshear_1 : (fmax 0 (80 - 20)) = 60 := by decide

/-- atmospheric: stability(15, 25) = 10 — STABILITY: how much the environment exceeds the parcel. value max(0,
    environment − parcel). -/
theorem fam_atmospheric_stability_1 : (fmax 0 (25 - 15)) = 10 := by decide

/-- atmospheric: coriolis(100, 45) = 50 — CORIOLIS turn: velocity scaled by latitude over the pole. value
    ⌊velocity · latitude / 90⌋. -/
theorem fam_atmospheric_coriolis_1 : ((100 * 45) / 90) = 50 := by decide

/-- atmospheric: aerosol(1000, 4) = 250 — AEROSOL density: particles per unit volume. value ⌊particles /
    volume⌋. -/
theorem fam_atmospheric_aerosol_1 : (1000 / 4) = 250 := by decide

/-- attention: focus(45, 60) = 75 — ATTENTION — THE MIND'S COMPUTE BUDGET, AS ARITHMETIC. What a focused mind
    spends is numbers: time on task, targets caught, interruptions per hour, the span held, task switches,
    relevant stimuli selected, effort sustained, and the workload against capacity. Crosses to `psychology` —
    attention is what cognition allocates. A measure. */ const PROOF = 'attention arithmetic (focus, vigilance,
    distraction, span, switching, selective, sustained, workload); the mind\'s compute budget; a measure crossed
    to psychology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'attention', dst: 'psychology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `attention.${name}`, params }) export class
    AttentionFormulas { /** FOCUS: the share of time spent on task, as a percentage. value ⌊ontask · 100 /
    total⌋. -/
theorem fam_attention_focus_1 : ((45 * 100) / 60) = 75 := by decide

/-- attention: vigilance(8, 10) = 80 — VIGILANCE: targets detected over targets present, as a percentage. value
    ⌊detected · 100 / targets⌋. -/
theorem fam_attention_vigilance_1 : ((8 * 100) / 10) = 80 := by decide

/-- attention: distraction(12, 4) = 3 — DISTRACTION: interruptions per hour. value ⌊interruptions / hours⌋. -/
theorem fam_attention_distraction_1 : (12 / 4) = 3 := by decide

/-- attention: span(25) = 25 — SPAN: the attention span in minutes. value minutes. -/
theorem fam_attention_span_1 : 25 = 25 := by decide

/-- attention: switching(20, 5) = 4 — SWITCHING: task switches per task. value ⌊switches / tasks⌋. -/
theorem fam_attention_switching_1 : (20 / 5) = 4 := by decide

/-- attention: selective(30, 100) = 30 — SELECTIVE: relevant stimuli over all stimuli, as a percentage. value
    ⌊relevant · 100 / stimuli⌋. -/
theorem fam_attention_selective_1 : ((30 * 100) / 100) = 30 := by decide

/-- attention: sustained(90, 120) = 75 — SUSTAINED: effort maintained over effort required, as a percentage.
    value ⌊maintained · 100 / required⌋. -/
theorem fam_attention_sustained_1 : ((90 * 100) / 120) = 75 := by decide

/-- attention: workload(80, 100) = 80 — WORKLOAD: cognitive demands over capacity, as a percentage. value
    ⌊demands · 100 / capacity⌋. -/
theorem fam_attention_workload_1 : ((80 * 100) / 100) = 80 := by decide

/-- auction: clearing(150, 100) = 150 — AUCTION — THE MARKET, AS ARITHMETIC (chosen by the public-API registry,
    not by hand). A sale is numbers: the next bid increment, the buyer's premium on the hammer, the reserve a
    bid clears, how many bidders chase each lot, the sell-through of a sale, how a hammer lands against the low
    estimate, the headroom left on a proxy bid, and the clearing of demand over supply. Crosses to `trading` —
    an auction is a market that settles. A measure. */ const PROOF = 'auction arithmetic (bid increment,
    buyer\'s premium, reserve, competition, sell-through, estimate, proxy headroom, clearing); a measure crossed
    to trading' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'auction', dst: 'trading', formula,
    value, proof: PROOF, ...extra }, holds, { name: `auction.${name}`, params }) export class AuctionFormulas {
    /** CLEARING: demand as a percentage of supply. value ⌊demand · 100 / supply⌋. -/
theorem fam_auction_clearing_1 : ((150 * 100) / 100) = 150 := by decide

/-- auction: competition(90, 30) = 3 — COMPETITION: bidders per lot. value ⌊bidders / lots⌋. -/
theorem fam_auction_competition_1 : (90 / 30) = 3 := by decide

/-- auction: estimate(1200, 1000) = 120 — ESTIMATE: the hammer as a percentage of the low estimate. value
    ⌊hammer · 100 / low⌋. -/
theorem fam_auction_estimate_1 : ((1200 * 100) / 1000) = 120 := by decide

/-- auction: increment(1000, 10) = 100 — INCREMENT: the next bid step at a rate on the current bid. value
    ⌊current · rate / 100⌋. -/
theorem fam_auction_increment_1 : ((1000 * 10) / 100) = 100 := by decide

/-- auction: premium(1000, 25) = 250 — PREMIUM: the buyer's premium at a rate on the hammer. value ⌊hammer ·
    rate / 100⌋. -/
theorem fam_auction_premium_1 : ((1000 * 25) / 100) = 250 := by decide

/-- auction: proxy(500, 300) = 200 — PROXY: the headroom left on a maximum proxy bid above the current. value
    max(0, maximum − current). -/
theorem fam_auction_proxy_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- auction: reserve(800, 500) = 300 — RESERVE: the amount a bid clears over the floor. value max(0, bid −
    floor). -/
theorem fam_auction_reserve_1 : (fmax 0 (800 - 500)) = 300 := by decide

/-- auction: reserve(400, 500) = 0 — RESERVE: the amount a bid clears over the floor. value max(0, bid − floor). -/
theorem fam_auction_reserve_2 : (fmax 0 (400 - 500)) = 0 := by decide

/-- auction: selltrough(80, 100) = 80 — SELL-THROUGH: lots sold as a percentage of lots offered. value ⌊sold ·
    100 / offered⌋. -/
theorem fam_auction_selltrough_1 : ((80 * 100) / 100) = 80 := by decide

/-- audiology: threshold(40) = 40 — THRESHOLD: the hearing threshold in decibels. value decibels. -/
theorem fam_audiology_threshold_1 : 40 = 40 := by decide

/-- audiology: loss(60, 25) = 240 — HEARING LOSS: the impaired threshold against the normal reference, as a
    percentage. value ⌊impaired · 100 / normal⌋. -/
theorem fam_audiology_loss_1 : ((60 * 100) / 25) = 240 := by decide

/-- audiology: discrimination(45, 50) = 90 — AUDIOLOGY — HEARING AS ARITHMETIC (a clinical measure, not advice).
    The audiogram is numbers: the threshold in decibels, hearing loss against the normal reference, speech
    discrimination, hearing-aid gain, a frequency in hertz, masking of a signal, room reverberation, and a
    tinnitus match. Crosses to `med` — audiology is a measure medicine reads. A measure. */ const PROOF =
    'audiology arithmetic (threshold, loss, speech discrimination, hearing-aid gain, frequency, masking,
    reverberation, tinnitus match); a clinical measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'audiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `audiology.${name}`, params }) export class AudiologyFormulas { /** SPEECH DISCRIMINATION: words heard
    correctly as a percentage. value ⌊correct · 100 / words⌋. -/
theorem fam_audiology_discrimination_1 : ((45 * 100) / 50) = 90 := by decide

/-- audiology: gain(120, 40) = 300 — HEARING-AID GAIN: output against input as a percentage. value ⌊output · 100
    / input⌋. -/
theorem fam_audiology_gain_1 : ((120 * 100) / 40) = 300 := by decide

/-- audiology: frequency(8000, 2) = 4000 — FREQUENCY: cycles over seconds, in hertz. value ⌊cycles / seconds⌋. -/
theorem fam_audiology_frequency_1 : (8000 / 2) = 4000 := by decide

/-- audiology: masking(80, 20) = 400 — MASKING: a masker level against the signal, as a percentage. value ⌊level
    · 100 / signal⌋. -/
theorem fam_audiology_masking_1 : ((80 * 100) / 20) = 400 := by decide

/-- audiology: reverberation(600, 120) = 5 — REVERBERATION: room volume over absorption. value ⌊volume /
    absorption⌋. -/
theorem fam_audiology_reverberation_1 : (600 / 120) = 5 := by decide

/-- audiology: tinnitus(6000, 4000) = 150 — TINNITUS MATCH: the matched tone against a reference, as a
    percentage. value ⌊matched · 100 / reference⌋. -/
theorem fam_audiology_tinnitus_1 : ((6000 * 100) / 4000) = 150 := by decide

/-- audiology: loss(10, 0) = 0 — HEARING LOSS: the impaired threshold against the normal reference, as a
    percentage. value ⌊impaired · 100 / normal⌋. -/
theorem fam_audiology_loss_2 : ((10 * 100) / 0) = 0 := by decide

/-- auditing: materiality(5, 1000) = 0 — AUDITING — THE AUDIT AS ARITHMETIC. An audit is numbers: the
    materiality threshold against the total, the sample a population needs at a confidence, the error rate found
    in a sample, account coverage, findings per control, the variance of actual against expected, the risk of a
    likelihood times an impact, and the compliance rate. Crosses to `accounting` — auditing is what verifies the
    books. A measure. */ const PROOF = 'auditing arithmetic (materiality, sample size, error rate, coverage,
    findings, variance, risk, compliance); the audit as arithmetic; a measure crossed to accounting' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'auditing', dst: 'accounting', formula, value, proof: PROOF,
    ...extra }, holds, { name: `auditing.${name}`, params }) export class AuditingFormulas { /** MATERIALITY: a
    threshold as a percentage of the total. value ⌊threshold · 100 / total⌋. -/
theorem fam_auditing_materiality_1 : ((5 * 100) / 1000) = 0 := by decide

/-- auditing: samplesize(1000, 20) = 50 — SAMPLE SIZE: the population divided by the confidence divisor. value
    ⌊population / confidence⌋. -/
theorem fam_auditing_samplesize_1 : (1000 / 20) = 50 := by decide

/-- auditing: errorrate(3, 50) = 6 — ERROR RATE: errors as a percentage of the sampled items. value ⌊errors ·
    100 / sampled⌋. -/
theorem fam_auditing_errorrate_1 : ((3 * 100) / 50) = 6 := by decide

/-- auditing: coverage(80, 100) = 80 — COVERAGE: audited accounts as a percentage of all accounts. value
    ⌊audited · 100 / accounts⌋. -/
theorem fam_auditing_coverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- auditing: findings(2, 40) = 5 — FINDINGS: issues as a percentage of the controls tested. value ⌊issues · 100
    / controls⌋. -/
theorem fam_auditing_findings_1 : ((2 * 100) / 40) = 5 := by decide

/-- auditing: variance(110, 100) = 110 — VARIANCE: actual as a percentage of expected. value ⌊actual · 100 /
    expected⌋. -/
theorem fam_auditing_variance_1 : ((110 * 100) / 100) = 110 := by decide

/-- auditing: risk(3, 4) = 12 — RISK: likelihood times impact. value likelihood · impact. -/
theorem fam_auditing_risk_1 : (3 * 4) = 12 := by decide

/-- auditing: compliance(95, 100) = 95 — COMPLIANCE: compliant items as a percentage of all requirements. value
    ⌊compliant · 100 / requirements⌋. -/
theorem fam_auditing_compliance_1 : ((95 * 100) / 100) = 95 := by decide

/-- auth: token(1000, 4600) = 3600 — TOKEN LIFE: seconds left on a JWT. value max(0, expiry − issued). -/
theorem fam_auth_token_1 : (fmax 0 (4600 - 1000)) = 3600 := by decide

/-- auth: apikeys(3, 4) = 75 — API KEYS: the share active, as a percentage. value ⌊active · 100 / total⌋. -/
theorem fam_auth_apikeys_1 : ((3 * 100) / 4) = 75 := by decide

/-- auth: verified(900, 1000) = 90 — VERIFIED: the share of users verified, as a percentage. value ⌊verified ·
    100 / users⌋. -/
theorem fam_auth_verified_1 : ((900 * 100) / 1000) = 90 := by decide

/-- auth: strength(12, 4) = 48 — PASSWORD STRENGTH: length times character classes. value length · classes. -/
theorem fam_auth_strength_1 : (12 * 4) = 48 := by decide

/-- auth: sessions(10, 3) = 3 — SESSIONS: concurrent sessions capped at the max. value min(active, max). -/
theorem fam_auth_sessions_1 : (fmin 10 3) = 3 := by decide

/-- auth: expiry(1000, 4600) = 3600 — EXPIRY: seconds until a token expires. value max(0, exp − now). -/
theorem fam_auth_expiry_1 : (fmax 0 (4600 - 1000)) = 3600 := by decide

/-- auth: failratio(25, 100) = 25 — FAIL RATIO: the share of attempts that failed, as a percentage. value
    ⌊failed · 100 / attempts⌋. -/
theorem fam_auth_failratio_1 : ((25 * 100) / 100) = 25 := by decide

/-- authentication: entropy(62, 8) = 496 — AUTHENTICATION — PROVING WHO IS THERE, AS ARITHMETIC (chosen by the
    identity registry, not by hand). Access is numbers: the entropy of a secret, the false-reject and
    false-accept rates of a biometric, the sessions per user, the lockout after too many attempts, how long a
    token lives, the strength of a password, and how many factors are required. Crosses to `code` —
    authentication is what the code enforces. A measure. */ const PROOF = 'authentication arithmetic (secret
    entropy, false-reject, false-accept, sessions, lockout, token life, password strength, factors); an
    identity-registry domain; a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'authentication', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `authentication.${name}`, params }) export class AuthenticationFormulas { /** ENTROPY: a bits proxy for a
    secret over a charset of a given length. value charset · length. -/
theorem fam_authentication_entropy_1 : (62 * 8) = 496 := by decide

/-- authentication: falsereject(2, 100) = 2 — FALSE REJECT: genuine attempts wrongly refused, as a percentage.
    value ⌊rejected · 100 / genuine⌋. -/
theorem fam_authentication_falsereject_1 : ((2 * 100) / 100) = 2 := by decide

/-- authentication: falseaccept(1, 100) = 1 — FALSE ACCEPT: impostors wrongly admitted, as a percentage. value
    ⌊accepted · 100 / impostors⌋. -/
theorem fam_authentication_falseaccept_1 : ((1 * 100) / 100) = 1 := by decide

/-- authentication: sessions(100, 25) = 4 — SESSIONS per user: active sessions over the users holding them.
    value ⌊active / users⌋. -/
theorem fam_authentication_sessions_1 : (100 / 25) = 4 := by decide

/-- authentication: lockout(8, 5) = 3 — LOCKOUT: attempts beyond the threshold trigger the lock. value max(0,
    attempts − threshold). -/
theorem fam_authentication_lockout_1 : (fmax 0 (8 - 5)) = 3 := by decide

/-- authentication: lockout(3, 5) = 0 — LOCKOUT: attempts beyond the threshold trigger the lock. value max(0,
    attempts − threshold). -/
theorem fam_authentication_lockout_2 : (fmax 0 (3 - 5)) = 0 := by decide

/-- authentication: tokenlife(3600) = 3600 — TOKEN LIFE: the seconds a token stays valid. value seconds. -/
theorem fam_authentication_tokenlife_1 : 3600 = 3600 := by decide

/-- authentication: strength(4, 12) = 48 — STRENGTH: a password over a count of character classes at a length.
    value classes · length. -/
theorem fam_authentication_strength_1 : (4 * 12) = 48 := by decide

/-- authentication: mfa(3) = 3 — FACTORS: how many factors multi-factor requires. value factors. -/
theorem fam_authentication_mfa_1 : 3 = 3 := by decide

/-- authorization: rolecount(50, 4) = 200 — AUTHORIZATION — DEFENSIVE ACCESS-CONTROL AS ARITHMETIC. Who may do
    what is numbers: the roles a user base carries, the cells of a subject×object permission matrix, the
    permissions granted beyond what is needed, whether a policy allows more than it denies, the share of grants
    a request stream wins, the breadth of a scope set, the share of duty pairs in conflict, and the access
    reviews left overdue. Crosses to `networking` — authorization is what the network perimeter enforces. A
    measure. */ const PROOF = 'authorization arithmetic (role count, permission matrix, least privilege, policy
    eval, grant ratio, scope breadth, separation of duty, access review lag); defensive access-control metrics;
    a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'authorization',
    dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `authorization.${name}`, params
    }) export class AuthorizationFormulas { /** ROLE COUNT: the roles a user base carries at roles-per-user.
    value users · rolesPer. -/
theorem fam_authorization_rolecount_1 : (50 * 4) = 200 := by decide

/-- authorization: permissionmatrix(20, 30) = 600 — PERMISSION MATRIX: the cells of a subject×object grid. value
    subjects · objects. -/
theorem fam_authorization_permissionmatrix_1 : (20 * 30) = 600 := by decide

/-- authorization: leastprivilege(10, 7) = 3 — LEAST PRIVILEGE: permissions granted beyond what is needed. value
    max(0, granted − needed). -/
theorem fam_authorization_leastprivilege_1 : (fmax 0 (10 - 7)) = 3 := by decide

/-- authorization: leastprivilege(5, 8) = 0 — LEAST PRIVILEGE: permissions granted beyond what is needed. value
    max(0, granted − needed). -/
theorem fam_authorization_leastprivilege_2 : (fmax 0 (5 - 8)) = 0 := by decide

/-- authorization: grantratio(450, 500) = 90 — GRANT RATIO: the share of requests granted, as a percentage.
    value ⌊grants · 100 / requests⌋. -/
theorem fam_authorization_grantratio_1 : ((450 * 100) / 500) = 90 := by decide

/-- authorization: scopebreadth(12, 8) = 96 — SCOPE BREADTH: the entries across a scope set at per-scope size.
    value scopes · perScope. -/
theorem fam_authorization_scopebreadth_1 : (12 * 8) = 96 := by decide

/-- authorization: separationofduty(3, 60) = 5 — SEPARATION OF DUTY: the share of duty pairs in conflict, as a
    percentage. value ⌊conflicts · 100 / pairs⌋. -/
theorem fam_authorization_separationofduty_1 : ((3 * 100) / 60) = 5 := by decide

/-- authorization: accessreviewlag(100, 40) = 60 — ACCESS REVIEW LAG: the reviews left overdue. value max(0, due
    − reviewed). -/
theorem fam_authorization_accessreviewlag_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- authorization: accessreviewlag(30, 50) = 0 — ACCESS REVIEW LAG: the reviews left overdue. value max(0, due −
    reviewed). -/
theorem fam_authorization_accessreviewlag_2 : (fmax 0 (30 - 50)) = 0 := by decide

/-- automation: throughput(600, 8) = 75 — AUTOMATION — THE WORK A ROBOT DOES, AS ARITHMETIC. A line of machines
    is numbers: tasks an hour, the share of time running, how long a cycle takes, the share of runs that err,
    the hours a robot saves over a hand, overall equipment effectiveness, the runs that pay a robot back, and
    the share of work it covers. Crosses to `robotics` — automation is what the robots carry out. A measure. */
    const PROOF = 'automation arithmetic (throughput, uptime, cycle time, error rate, savings, OEE, payback,
    coverage); the work a robot does, a measure crossed to robotics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'automation', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `automation.${name}`, params }) export class AutomationFormulas { /** THROUGHPUT: tasks over the hours
    worked. value ⌊tasks / hours⌋. -/
theorem fam_automation_throughput_1 : (600 / 8) = 75 := by decide

/-- automation: uptime(990, 1000) = 99 — UPTIME as a percentage of time running. value ⌊running · 100 / total⌋. -/
theorem fam_automation_uptime_1 : ((990 * 100) / 1000) = 99 := by decide

/-- automation: cycletime(100, 160) = 60 — CYCLE TIME: the span from start to end. value max(0, end − start). -/
theorem fam_automation_cycletime_1 : (fmax 0 (160 - 100)) = 60 := by decide

/-- automation: errorrate(3, 1000) = 0 — ERROR RATE as a percentage of the runs. value ⌊errors · 100 / runs⌋. -/
theorem fam_automation_errorrate_1 : ((3 * 100) / 1000) = 0 := by decide

/-- automation: savings(40, 8) = 32 — SAVINGS: the hours a robot saves over the hand it replaces. value max(0,
    manual − automated). -/
theorem fam_automation_savings_1 : (fmax 0 (40 - 8)) = 32 := by decide

/-- automation: oee(90, 80) = 72 — OEE: overall equipment effectiveness, availability times performance. value
    ⌊availability · performance / 100⌋. -/
theorem fam_automation_oee_1 : ((90 * 80) / 100) = 72 := by decide

/-- automation: payback(10000, 500) = 20 — PAYBACK: the runs a cost takes to pay back at a per-run saving. value
    ⌊cost / savings⌋. -/
theorem fam_automation_payback_1 : (10000 / 500) = 20 := by decide

/-- automation: coverage(750, 1000) = 75 — COVERAGE: the share of work automated. value ⌊automated · 100 /
    total⌋. -/
theorem fam_automation_coverage_1 : ((750 * 100) / 1000) = 75 := by decide

/-- automotive: power(300, 5252) = 300 — AUTOMOTIVE — THE MOVING MACHINE, AS ARITHMETIC. A vehicle is numbers:
    horsepower from torque and rpm, fuel economy, acceleration, braking distance, engine displacement, emissions
    per distance, gear ratio, and the range a charge or tank affords. Crosses to `transport` — automotive is
    what transport is built from. A measure. */ const PROOF = 'automotive arithmetic (power, economy,
    acceleration, braking, displacement, emissions, gear ratio, range); the moving machine as integers; a
    measure crossed to transport' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'automotive', dst:
    'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `automotive.${name}`, params }) export
    class AutomotiveFormulas { /** POWER: a horsepower proxy from torque and rpm. value ⌊torque · rpm / 5252⌋. -/
theorem fam_automotive_power_1 : ((300 * 5252) / 5252) = 300 := by decide

/-- automotive: economy(400, 10) = 40 — FUEL ECONOMY: distance over fuel used. value ⌊distance / fuel⌋. -/
theorem fam_automotive_economy_1 : (400 / 10) = 40 := by decide

/-- automotive: economy(400, 0) = 0 — FUEL ECONOMY: distance over fuel used. value ⌊distance / fuel⌋. -/
theorem fam_automotive_economy_2 : (400 / 0) = 0 := by decide

/-- automotive: acceleration(100, 4) = 25 — ACCELERATION: velocity gained over time. value ⌊velocity / time⌋. -/
theorem fam_automotive_acceleration_1 : (100 / 4) = 25 := by decide

/-- automotive: acceleration(100, 0) = 0 — ACCELERATION: velocity gained over time. value ⌊velocity / time⌋. -/
theorem fam_automotive_acceleration_2 : (100 / 0) = 0 := by decide

/-- automotive: displacement(8, 9) = 72 — DISPLACEMENT: a swept-volume proxy from bore and stroke. value bore ·
    stroke. -/
theorem fam_automotive_displacement_1 : (8 * 9) = 72 := by decide

/-- automotive: emissions(1000, 50) = 20 — EMISSIONS: grams of output per unit distance. value ⌊grams /
    distance⌋. -/
theorem fam_automotive_emissions_1 : (1000 / 50) = 20 := by decide

/-- automotive: emissions(1000, 0) = 0 — EMISSIONS: grams of output per unit distance. value ⌊grams / distance⌋. -/
theorem fam_automotive_emissions_2 : (1000 / 0) = 0 := by decide

/-- automotive: ratio(39, 10) = 390 — GEAR RATIO: driven over drive, scaled by a hundred. value ⌊driven · 100 /
    drive⌋. -/
theorem fam_automotive_ratio_1 : ((39 * 100) / 10) = 390 := by decide

/-- automotive: ratio(39, 0) = 0 — GEAR RATIO: driven over drive, scaled by a hundred. value ⌊driven · 100 /
    drive⌋. -/
theorem fam_automotive_ratio_2 : ((39 * 100) / 0) = 0 := by decide

/-- automotive: range(600, 20) = 30 — RANGE: the distance a capacity affords at a consumption rate. value
    ⌊capacity / consumption⌋. -/
theorem fam_automotive_range_1 : (600 / 20) = 30 := by decide

/-- automotive: range(600, 0) = 0 — RANGE: the distance a capacity affords at a consumption rate. value
    ⌊capacity / consumption⌋. -/
theorem fam_automotive_range_2 : (600 / 0) = 0 := by decide

/-- autoscaling: targetutilization(140, 200) = 70 — TARGET UTILIZATION as a percentage. value ⌊used · 100 /
    capacity⌋. -/
theorem fam_autoscaling_targetutilization_1 : ((140 * 100) / 200) = 70 := by decide

/-- autoscaling: scaleout(4, 2) = 6 — SCALE-OUT: the current replicas plus a step. value current + step. -/
theorem fam_autoscaling_scaleout_1 : (4 + 2) = 6 := by decide

/-- autoscaling: cooldown(300, 5) = 60 — COOLDOWN: total seconds over the scaling events. value ⌊seconds /
    events⌋. -/
theorem fam_autoscaling_cooldown_1 : (300 / 5) = 60 := by decide

/-- autoscaling: headroom(100, 60) = 40 — HEADROOM: spare capacity over what is used. value max(0, capacity −
    used). -/
theorem fam_autoscaling_headroom_1 : (fmax 0 (100 - 60)) = 40 := by decide

/-- autoscaling: queuebacklog(1000, 900) = 100 — QUEUE BACKLOG: requests arrived over those served. value max(0,
    arrived − served). -/
theorem fam_autoscaling_queuebacklog_1 : (fmax 0 (1000 - 900)) = 100 := by decide

/-- autoscaling: queuebacklog(900, 1000) = 0 — QUEUE BACKLOG: requests arrived over those served. value max(0,
    arrived − served). -/
theorem fam_autoscaling_queuebacklog_2 : (fmax 0 (900 - 1000)) = 0 := by decide

/-- autoscaling: costperreplica(1000, 5) = 200 — COST PER REPLICA: total cost over the replicas. value ⌊total /
    replicas⌋. -/
theorem fam_autoscaling_costperreplica_1 : (1000 / 5) = 200 := by decide

/-- autoscaling: burst(10, 3) = 30 — BURST: a base capacity at a burst factor. value base · factor. -/
theorem fam_autoscaling_burst_1 : (10 * 3) = 30 := by decide

/-- availability: uptimepercent(999, 1000) = 99 — AVAILABILITY — SERVICE RELIABILITY AS ARITHMETIC (chosen by
    the public-API registry, not by hand). Keeping a service up is numbers: uptime as a percentage, downtime
    left, the nines of availability, the SLA error budget, mean time to repair, mean time between failures, the
    steady-state availability of a repairable system, and what an outage costs. Crosses to `statistics` —
    availability is a reliability statistic. A measure. */ const PROOF = 'availability arithmetic (uptime
    percent, downtime, nines, SLA error budget, MTTR, MTBF, steady-state availability, outage cost); a
    reliability measure crossed to statistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'availability', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `availability.${name}`, params }) export class AvailabilityFormulas { /** UPTIME as a percentage. value ⌊up
    · 100 / total⌋. -/
theorem fam_availability_uptimepercent_1 : ((999 * 100) / 1000) = 99 := by decide

/-- availability: downtime(1000, 999) = 1 — DOWNTIME: the minutes left once the up minutes are taken from the
    total. value max(0, total − up). -/
theorem fam_availability_downtime_1 : (fmax 0 (1000 - 999)) = 1 := by decide

/-- availability: nines(999, 1000) = 999 — NINES: availability in parts per thousand (999 ‰ is the three-nines
    line). value ⌊up · 1000 / total⌋. -/
theorem fam_availability_nines_1 : ((999 * 1000) / 1000) = 999 := by decide

/-- availability: slabudget(99, 1000) = 10 — SLA ERROR BUDGET: the downtime a target allows over a window. value
    ⌊total · (100 − target) / 100⌋. -/
theorem fam_availability_slabudget_1 : ((1000 * (100 - 99)) / 100) = 10 := by decide

/-- availability: mttr(120, 4) = 30 — MTTR: mean time to repair, downtime over the incidents that caused it.
    value ⌊downtime / incidents⌋. -/
theorem fam_availability_mttr_1 : (120 / 4) = 30 := by decide

/-- availability: mtbf(8000, 4) = 2000 — MTBF: mean time between failures, uptime over the failures seen. value
    ⌊uptime / failures⌋. -/
theorem fam_availability_mtbf_1 : (8000 / 4) = 2000 := by decide

/-- availability: steadystate(99, 1) = 99 — STEADY-STATE availability of a repairable system as a percentage.
    value ⌊mtbf · 100 / (mtbf + mttr)⌋. -/
theorem fam_availability_steadystate_1 : ((99 * 100) / (99 + 1)) = 99 := by decide

/-- availability: outagecost(30, 500) = 15000 — OUTAGE COST: downtime minutes at a cost per minute. value
    minutes · rate. -/
theorem fam_availability_outagecost_1 : (30 * 500) = 15000 := by decide

/-- avionics: airspeed(4500, 9) = 500 — AVIONICS — FLIGHT INSTRUMENTS AS ARITHMETIC. The numbers a cockpit
    reads: airspeed from distance over time, altitude-hold deviation, heading error wrapped to the shortest
    turn, the glide ratio, fuel burn, climb rate, a transponder squawk's octal validity, and whether a nav
    deviation stays within tolerance. Crosses to `aerodynamics` — the instruments read the flow the airframe
    meets. A measure. */ const PROOF = 'avionics arithmetic (airspeed, altitude-hold deviation, heading error,
    glide ratio, fuel burn, climb rate, transponder squawk validity, nav tolerance); the cockpit\'s instruments
    as numbers; a measure crossed to aerodynamics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'avionics', dst: 'aerodynamics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `avionics.${name}`, params }) export class AvionicsFormulas { /** AIRSPEED: distance over time. value
    ⌊distance / time⌋. -/
theorem fam_avionics_airspeed_1 : (4500 / 9) = 500 := by decide

/-- avionics: glidepath(15000, 1000) = 15 — HEADING ERROR: the shortest turn to the target heading. value min(m,
    360 − m), m = |target − actual| mod 360. */ static headingerror(target: number, actual: number):
    CrossFormula { const m = Math.abs(target - actual) % fullTurn; return c('avionics-headingerror',
    'headingerror(target, actual) = min(m, 360 − m), m = |target − actual| mod 360', Math.min(m, Math.max(0, 360
    - m)), nat(target, actual), 'headingerror', [target, actual]) } /** GLIDE PATH: the glide ratio, horizontal
    distance over altitude lost. value ⌊distance / drop⌋. -/
theorem fam_avionics_glidepath_1 : (15000 / 1000) = 15 := by decide

/-- avionics: fuelflow(600, 3) = 1800 — FUEL FLOW: fuel burned at a rate over time. value rate · time. -/
theorem fam_avionics_fuelflow_1 : (600 * 3) = 1800 := by decide

/-- avionics: climbrate(3000, 2) = 1500 — CLIMB RATE: altitude gained over time. value ⌊gain / time⌋. -/
theorem fam_avionics_climbrate_1 : (3000 / 2) = 1500 := by decide

/-- axiology: valuetypes(2, 1) = 3 -/
theorem fam_axiology_valuetypes_1 : (2 + 1) = 3 := by decide

/-- axiology: hierarchydepth(3, 2) = 5 -/
theorem fam_axiology_hierarchydepth_1 : (3 + 2) = 5 := by decide

/-- axiology: intrinsicextrinsic(2, 3) = 6 -/
theorem fam_axiology_intrinsicextrinsic_1 : (2 * 3) = 6 := by decide

/-- axiology: normsubsets(5) = 32 -/
theorem fam_axiology_normsubsets_1 : (2 ^ 5) = 32 := by decide

/-- axiology: commensurability(60, 100) = 60 -/
theorem fam_axiology_commensurability_1 : ((60 * 100) / 100) = 60 := by decide
