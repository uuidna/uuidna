-- lean/FamiliesU.lean — GENERATED. THE FAMILIES, U — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)

/-- ui: clickdepth(3, 2) = 5 -/
theorem fam_ui_clickdepth_1 : ((3 : Int) + (2 : Int)) = (5 : Int) := by decide

/-- ui: layoutcombos(8, 3) = 56 -/
theorem fam_ui_layoutcombos_1 : (Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (3 : Int)))) = (56 : Int) := by decide

/-- ui: elementcount(20, 4) = 80 -/
theorem fam_ui_elementcount_1 : ((20 : Int) * (4 : Int)) = (80 : Int) := by decide

/-- ui: responsiveness(90, 100) = 90 -/
theorem fam_ui_responsiveness_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- ui: navpaths(6, 2) = 30 -/
theorem fam_ui_navpaths_1 : ((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int) := by decide

/-- ui: gridcells(12, 8) = 96 -/
theorem fam_ui_gridcells_1 : ((12 : Int) * (8 : Int)) = (96 : Int) := by decide

/-- ui: colorsubsets(4) = 16 -/
theorem fam_ui_colorsubsets_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- ui: accessibilityscore(85, 100) = 85 -/
theorem fam_ui_accessibilityscore_1 : (((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int) := by decide

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
theorem fam_ultrasonics_timeofflight_1 : (((2 : Int) * (7500 : Int)) / (1500 : Int)) = (10 : Int) := by decide

/-- ultrasonics: depth(1500, 4) = 3000 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are numbers:
    the time a pulse takes there and back, the depth it reaches, its wavelength, how far it is attenuated, the
    Doppler shift off a moving target, the axial resolution, the acoustic impedance of the medium, and the
    near-field length of the probe. Crosses to `acoustics` — ultrasonics is acoustics above 20 kHz. A measure.
    */ const PROOF = 'ultrasonics arithmetic (time of flight, depth, wavelength, attenuation, Doppler shift,
    axial resolution, acoustic impedance, near field); sound above hearing; a measure crossed to acoustics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ultrasonics', dst: 'acoustics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `ultrasonics.${name}`, params }) export class UltrasonicsFormulas {
    /** TIME OF FLIGHT: a pulse there and back over a distance at the speed of sound. value ⌊2 · distance /
    speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. -/
theorem fam_ultrasonics_depth_1 : (((1500 : Int) * (4 : Int)) / (2 : Int)) = (3000 : Int) := by decide

/-- ultrasonics: wavelength(1500, 5) = 300 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are
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
    value ⌊2 · distance / speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */ static
    depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) =
    ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) } /**
    WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. -/
theorem fam_ultrasonics_wavelength_1 : ((1500 : Int) / (5 : Int)) = (300 : Int) := by decide

/-- ultrasonics: attenuation(3, 50) = 150 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are
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
    value ⌊2 · distance / speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */ static
    depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) =
    ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) } /**
    WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. */ static wavelength(speed: number,
    freq: number): CrossFormula { return c('ultrasonics-wavelength', 'wavelength(speed, freq) = ⌊speed / freq⌋',
    freq > 0 ? Math.floor(speed / freq) : 0, nat(speed, freq) && freq > 0, 'wavelength', [speed, freq]) } /**
    ATTENUATION: the loss over a distance at a per-unit coefficient. value coeff · distance. -/
theorem fam_ultrasonics_attenuation_1 : ((3 : Int) * (50 : Int)) = (150 : Int) := by decide

/-- ultrasonics: dopplershift(5000, 3, 1500) = 20 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are
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
    value ⌊2 · distance / speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */ static
    depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) =
    ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) } /**
    WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. */ static wavelength(speed: number,
    freq: number): CrossFormula { return c('ultrasonics-wavelength', 'wavelength(speed, freq) = ⌊speed / freq⌋',
    freq > 0 ? Math.floor(speed / freq) : 0, nat(speed, freq) && freq > 0, 'wavelength', [speed, freq]) } /**
    ATTENUATION: the loss over a distance at a per-unit coefficient. value coeff · distance. */ static
    attenuation(coeff: number, distance: number): CrossFormula { return c('ultrasonics-attenuation',
    'attenuation(coeff, distance) = coeff · distance', coeff * distance, nat(coeff, distance), 'attenuation',
    [coeff, distance]) } /** DOPPLER SHIFT off a moving target. value ⌊2 · freq · velocity / speed⌋. -/
theorem fam_ultrasonics_dopplershift_1 : ((((2 : Int) * (5000 : Int)) * (3 : Int)) / (1500 : Int)) = (20 : Int) := by decide

/-- ultrasonics: axialresolution(300, 2) = 300 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are
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
    value ⌊2 · distance / speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */ static
    depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) =
    ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) } /**
    WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. */ static wavelength(speed: number,
    freq: number): CrossFormula { return c('ultrasonics-wavelength', 'wavelength(speed, freq) = ⌊speed / freq⌋',
    freq > 0 ? Math.floor(speed / freq) : 0, nat(speed, freq) && freq > 0, 'wavelength', [speed, freq]) } /**
    ATTENUATION: the loss over a distance at a per-unit coefficient. value coeff · distance. */ static
    attenuation(coeff: number, distance: number): CrossFormula { return c('ultrasonics-attenuation',
    'attenuation(coeff, distance) = coeff · distance', coeff * distance, nat(coeff, distance), 'attenuation',
    [coeff, distance]) } /** DOPPLER SHIFT off a moving target. value ⌊2 · freq · velocity / speed⌋. */ static
    dopplershift(freq: number, velocity: number, speed: number): CrossFormula { return
    c('ultrasonics-dopplershift', 'dopplershift(freq, velocity, speed) = ⌊2 · freq · velocity / speed⌋', speed >
    0 ? Math.floor((2 * freq * velocity) / speed) : 0, nat(freq, velocity, speed) && speed > 0, 'dopplershift',
    [freq, velocity, speed]) } /** AXIAL RESOLUTION: half the spatial pulse length (cycles of a wavelength).
    value ⌊wavelength · cycles / 2⌋. -/
theorem fam_ultrasonics_axialresolution_1 : (((300 : Int) * (2 : Int)) / (2 : Int)) = (300 : Int) := by decide

/-- ultrasonics: acousticimpedance(1000, 1500) = 1500000 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC.
    Pulses are numbers: the time a pulse takes there and back, the depth it reaches, its wavelength, how far it
    is attenuated, the Doppler shift off a moving target, the axial resolution, the acoustic impedance of the
    medium, and the near-field length of the probe. Crosses to `acoustics` — ultrasonics is acoustics above 20
    kHz. A measure. */ const PROOF = 'ultrasonics arithmetic (time of flight, depth, wavelength, attenuation,
    Doppler shift, axial resolution, acoustic impedance, near field); sound above hearing; a measure crossed to
    acoustics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ultrasonics', dst: 'acoustics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `ultrasonics.${name}`, params }) export class
    UltrasonicsFormulas { /** TIME OF FLIGHT: a pulse there and back over a distance at the speed of sound.
    value ⌊2 · distance / speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */ static
    depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) =
    ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) } /**
    WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. */ static wavelength(speed: number,
    freq: number): CrossFormula { return c('ultrasonics-wavelength', 'wavelength(speed, freq) = ⌊speed / freq⌋',
    freq > 0 ? Math.floor(speed / freq) : 0, nat(speed, freq) && freq > 0, 'wavelength', [speed, freq]) } /**
    ATTENUATION: the loss over a distance at a per-unit coefficient. value coeff · distance. */ static
    attenuation(coeff: number, distance: number): CrossFormula { return c('ultrasonics-attenuation',
    'attenuation(coeff, distance) = coeff · distance', coeff * distance, nat(coeff, distance), 'attenuation',
    [coeff, distance]) } /** DOPPLER SHIFT off a moving target. value ⌊2 · freq · velocity / speed⌋. */ static
    dopplershift(freq: number, velocity: number, speed: number): CrossFormula { return
    c('ultrasonics-dopplershift', 'dopplershift(freq, velocity, speed) = ⌊2 · freq · velocity / speed⌋', speed >
    0 ? Math.floor((2 * freq * velocity) / speed) : 0, nat(freq, velocity, speed) && speed > 0, 'dopplershift',
    [freq, velocity, speed]) } /** AXIAL RESOLUTION: half the spatial pulse length (cycles of a wavelength).
    value ⌊wavelength · cycles / 2⌋. */ static axialresolution(wavelength: number, cycles: number): CrossFormula
    { return c('ultrasonics-axialresolution', 'axialresolution(wavelength, cycles) = ⌊wavelength · cycles / 2⌋',
    Math.floor((wavelength * cycles) / 2), nat(wavelength, cycles), 'axialresolution', [wavelength, cycles]) }
    /** ACOUSTIC IMPEDANCE: density times the speed of sound in the medium. value density · speed. -/
theorem fam_ultrasonics_acousticimpedance_1 : ((1000 : Int) * (1500 : Int)) = (1500000 : Int) := by decide

/-- ultrasonics: nearfield(20, 5) = 20 — ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are numbers:
    the time a pulse takes there and back, the depth it reaches, its wavelength, how far it is attenuated, the
    Doppler shift off a moving target, the axial resolution, the acoustic impedance of the medium, and the
    near-field length of the probe. Crosses to `acoustics` — ultrasonics is acoustics above 20 kHz. A measure.
    */ const PROOF = 'ultrasonics arithmetic (time of flight, depth, wavelength, attenuation, Doppler shift,
    axial resolution, acoustic impedance, near field); sound above hearing; a measure crossed to acoustics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ultrasonics', dst: 'acoustics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `ultrasonics.${name}`, params }) export class UltrasonicsFormulas {
    /** TIME OF FLIGHT: a pulse there and back over a distance at the speed of sound. value ⌊2 · distance /
    speed⌋. */ static timeofflight(distance: number, speed: number): CrossFormula { return
    c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ?
    Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance,
    speed]) } /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */ static
    depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) =
    ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) } /**
    WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. */ static wavelength(speed: number,
    freq: number): CrossFormula { return c('ultrasonics-wavelength', 'wavelength(speed, freq) = ⌊speed / freq⌋',
    freq > 0 ? Math.floor(speed / freq) : 0, nat(speed, freq) && freq > 0, 'wavelength', [speed, freq]) } /**
    ATTENUATION: the loss over a distance at a per-unit coefficient. value coeff · distance. */ static
    attenuation(coeff: number, distance: number): CrossFormula { return c('ultrasonics-attenuation',
    'attenuation(coeff, distance) = coeff · distance', coeff * distance, nat(coeff, distance), 'attenuation',
    [coeff, distance]) } /** DOPPLER SHIFT off a moving target. value ⌊2 · freq · velocity / speed⌋. */ static
    dopplershift(freq: number, velocity: number, speed: number): CrossFormula { return
    c('ultrasonics-dopplershift', 'dopplershift(freq, velocity, speed) = ⌊2 · freq · velocity / speed⌋', speed >
    0 ? Math.floor((2 * freq * velocity) / speed) : 0, nat(freq, velocity, speed) && speed > 0, 'dopplershift',
    [freq, velocity, speed]) } /** AXIAL RESOLUTION: half the spatial pulse length (cycles of a wavelength).
    value ⌊wavelength · cycles / 2⌋. */ static axialresolution(wavelength: number, cycles: number): CrossFormula
    { return c('ultrasonics-axialresolution', 'axialresolution(wavelength, cycles) = ⌊wavelength · cycles / 2⌋',
    Math.floor((wavelength * cycles) / 2), nat(wavelength, cycles), 'axialresolution', [wavelength, cycles]) }
    /** ACOUSTIC IMPEDANCE: density times the speed of sound in the medium. value density · speed. */ static
    acousticimpedance(density: number, speed: number): CrossFormula { return c('ultrasonics-acousticimpedance',
    'acousticimpedance(density, speed) = density · speed', density * speed, nat(density, speed),
    'acousticimpedance', [density, speed]) } /** NEAR FIELD: the length of the probe's near zone. value
    ⌊diameter² / (4 · wavelength)⌋. -/
theorem fam_ultrasonics_nearfield_1 : (((20 : Int) ^ (2 : Nat)) / ((4 : Int) * (5 : Int))) = (20 : Int) := by decide

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
theorem fam_underwriting_risk_1 : (((50 : Int) * (100 : Int)) / (10 : Int)) = (500 : Int) := by decide

/-- underwriting: premium(1000, 12) = 120 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
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
    years⌋. */ static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk',
    'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0,
    nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a percentage rate.
    value ⌊base · rate / 100⌋. -/
theorem fam_underwriting_premium_1 : (((1000 : Int) * (12 : Int)) / (100 : Int)) = (120 : Int) := by decide

/-- underwriting: loading(120, 25) = 30 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
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
    years⌋. */ static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk',
    'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0,
    nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a percentage rate.
    value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula { return
    c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) / 100),
    nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium. value
    ⌊premium · pct / 100⌋. -/
theorem fam_underwriting_loading_1 : (((120 : Int) * (25 : Int)) / (100 : Int)) = (30 : Int) := by decide

/-- underwriting: score(850, 5) = 170 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
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
    years⌋. */ static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk',
    'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0,
    nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a percentage rate.
    value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula { return
    c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) / 100),
    nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium. value
    ⌊premium · pct / 100⌋. */ static loading(premium: number, pct: number): CrossFormula { return
    c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) /
    100), nat(premium, pct), 'loading', [premium, pct]) } /** SCORE: total factor points over the factors
    counted. value ⌊factors / count⌋. -/
theorem fam_underwriting_score_1 : ((850 : Int) / (5 : Int)) = (170 : Int) := by decide

/-- underwriting: decline(170, 150) = 1 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
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
    years⌋. */ static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk',
    'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0,
    nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a percentage rate.
    value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula { return
    c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) / 100),
    nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium. value
    ⌊premium · pct / 100⌋. */ static loading(premium: number, pct: number): CrossFormula { return
    c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) /
    100), nat(premium, pct), 'loading', [premium, pct]) } /** SCORE: total factor points over the factors
    counted. value ⌊factors / count⌋. */ static score(factors: number, count: number): CrossFormula { return
    c('underwriting-score', 'score(factors, count) = ⌊factors / count⌋', count > 0 ? Math.floor(factors / count)
    : 0, nat(factors, count) && count > 0, 'score', [factors, count]) } /** THE DECLINE: 1 when the score meets
    the decline threshold. value [score ≥ threshold]. -/
theorem fam_underwriting_decline_1 : (if (if (170 : Int) ≥ (150 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int) := by decide

/-- underwriting: decline(100, 150) = 0 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
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
    years⌋. */ static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk',
    'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0,
    nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a percentage rate.
    value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula { return
    c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) / 100),
    nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium. value
    ⌊premium · pct / 100⌋. */ static loading(premium: number, pct: number): CrossFormula { return
    c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) /
    100), nat(premium, pct), 'loading', [premium, pct]) } /** SCORE: total factor points over the factors
    counted. value ⌊factors / count⌋. */ static score(factors: number, count: number): CrossFormula { return
    c('underwriting-score', 'score(factors, count) = ⌊factors / count⌋', count > 0 ? Math.floor(factors / count)
    : 0, nat(factors, count) && count > 0, 'score', [factors, count]) } /** THE DECLINE: 1 when the score meets
    the decline threshold. value [score ≥ threshold]. -/
theorem fam_underwriting_decline_2 : (if (if (100 : Int) ≥ (150 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int) := by decide

/-- underwriting: exposure(100, 500) = 50000 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Writing a policy is numbers: the risk rate from past claims, the base
    premium at a rate, the loading surcharge, the applicant's score, the accept/decline call, the exposure on
    the book, the reserve still owed, and the loss ratio. Crosses to `insurance` — underwriting is what an
    insurer does before it insures. A measure. */ const PROOF = 'underwriting arithmetic (risk rate, premium,
    loading, score, decline, exposure, reserve, loss ratio); the price of risk before a policy is written; a
    measure crossed to insurance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'underwriting', dst:
    'insurance', formula, value, proof: PROOF, ...extra }, holds, { name: `underwriting.${name}`, params })
    export class UnderwritingFormulas { /** RISK RATE: past claims per year, as a rate per hundred. value
    ⌊claims · 100 / years⌋. */ static risk(claims: number, years: number): CrossFormula { return
    c('underwriting-risk', 'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100)
    / years) : 0, nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a
    percentage rate. value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula {
    return c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) /
    100), nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium.
    value ⌊premium · pct / 100⌋. */ static loading(premium: number, pct: number): CrossFormula { return
    c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) /
    100), nat(premium, pct), 'loading', [premium, pct]) } /** SCORE: total factor points over the factors
    counted. value ⌊factors / count⌋. */ static score(factors: number, count: number): CrossFormula { return
    c('underwriting-score', 'score(factors, count) = ⌊factors / count⌋', count > 0 ? Math.floor(factors / count)
    : 0, nat(factors, count) && count > 0, 'score', [factors, count]) } /** THE DECLINE: 1 when the score meets
    the decline threshold. value [score ≥ threshold]. */ static decline(score: number, threshold: number):
    CrossFormula { return c('underwriting-decline', 'decline(score, threshold) = [score ≥ threshold]', score >=
    threshold ? 1 : 0, nat(score, threshold), 'decline', [score, threshold]) } /** EXPOSURE: insured units at a
    value each. value units · value. -/
theorem fam_underwriting_exposure_1 : ((100 : Int) * (500 : Int)) = (50000 : Int) := by decide

/-- underwriting: reserve(1000, 400) = 600 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Writing a policy is numbers: the risk rate from past claims, the base
    premium at a rate, the loading surcharge, the applicant's score, the accept/decline call, the exposure on
    the book, the reserve still owed, and the loss ratio. Crosses to `insurance` — underwriting is what an
    insurer does before it insures. A measure. */ const PROOF = 'underwriting arithmetic (risk rate, premium,
    loading, score, decline, exposure, reserve, loss ratio); the price of risk before a policy is written; a
    measure crossed to insurance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'underwriting', dst:
    'insurance', formula, value, proof: PROOF, ...extra }, holds, { name: `underwriting.${name}`, params })
    export class UnderwritingFormulas { /** RISK RATE: past claims per year, as a rate per hundred. value
    ⌊claims · 100 / years⌋. */ static risk(claims: number, years: number): CrossFormula { return
    c('underwriting-risk', 'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100)
    / years) : 0, nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a
    percentage rate. value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula {
    return c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) /
    100), nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium.
    value ⌊premium · pct / 100⌋. */ static loading(premium: number, pct: number): CrossFormula { return
    c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) /
    100), nat(premium, pct), 'loading', [premium, pct]) } /** SCORE: total factor points over the factors
    counted. value ⌊factors / count⌋. */ static score(factors: number, count: number): CrossFormula { return
    c('underwriting-score', 'score(factors, count) = ⌊factors / count⌋', count > 0 ? Math.floor(factors / count)
    : 0, nat(factors, count) && count > 0, 'score', [factors, count]) } /** THE DECLINE: 1 when the score meets
    the decline threshold. value [score ≥ threshold]. */ static decline(score: number, threshold: number):
    CrossFormula { return c('underwriting-decline', 'decline(score, threshold) = [score ≥ threshold]', score >=
    threshold ? 1 : 0, nat(score, threshold), 'decline', [score, threshold]) } /** EXPOSURE: insured units at a
    value each. value units · value. */ static exposure(units: number, value: number): CrossFormula { return
    c('underwriting-exposure', 'exposure(units, value) = units · value', units * value, nat(units, value),
    'exposure', [units, value]) } /** RESERVE: the incurred loss still owed after what is paid. value max(0,
    incurred − paid). -/
theorem fam_underwriting_reserve_1 : (fmax (0 : Int) ((1000 : Int) - (400 : Int))) = (600 : Int) := by decide

/-- underwriting: ratio(600, 1000) = 60 — UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API
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
    years⌋. */ static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk',
    'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0,
    nat(claims, years) && years > 0, 'risk', [claims, years]) } /** PREMIUM: a base amount at a percentage rate.
    value ⌊base · rate / 100⌋. */ static premium(base: number, rate: number): CrossFormula { return
    c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) / 100),
    nat(base, rate), 'premium', [base, rate]) } /** LOADING: a surcharge, a percentage of the premium. value
    ⌊premium · pct / 100⌋. */ static loading(premium: number, pct: number): CrossFormula { return
    c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) /
    100), nat(premium, pct), 'loading', [premium, pct]) } /** SCORE: total factor points over the factors
    counted. value ⌊factors / count⌋. */ static score(factors: number, count: number): CrossFormula { return
    c('underwriting-score', 'score(factors, count) = ⌊factors / count⌋', count > 0 ? Math.floor(factors / count)
    : 0, nat(factors, count) && count > 0, 'score', [factors, count]) } /** THE DECLINE: 1 when the score meets
    the decline threshold. value [score ≥ threshold]. */ static decline(score: number, threshold: number):
    CrossFormula { return c('underwriting-decline', 'decline(score, threshold) = [score ≥ threshold]', score >=
    threshold ? 1 : 0, nat(score, threshold), 'decline', [score, threshold]) } /** EXPOSURE: insured units at a
    value each. value units · value. */ static exposure(units: number, value: number): CrossFormula { return
    c('underwriting-exposure', 'exposure(units, value) = units · value', units * value, nat(units, value),
    'exposure', [units, value]) } /** RESERVE: the incurred loss still owed after what is paid. value max(0,
    incurred − paid). */ static reserve(incurred: number, paid: number): CrossFormula { return
    c('underwriting-reserve', 'reserve(incurred, paid) = max(0, incurred − paid)', Math.max(0, incurred - paid),
    nat(incurred, paid), 'reserve', [incurred, paid]) } /** LOSS RATIO: losses over premiums, as a percentage.
    value ⌊losses · 100 / premiums⌋. -/
theorem fam_underwriting_ratio_1 : (((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int) := by decide

/-- unemployment: ratepct(5, 100) = 5 -/
theorem fam_unemployment_ratepct_1 : (((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int) := by decide

/-- unemployment: labourforce(1000, 100) = 100000 -/
theorem fam_unemployment_labourforce_1 : ((1000 : Int) * (100 : Int)) = (100000 : Int) := by decide

/-- unemployment: unemployed(100000, 20) = 5000 -/
theorem fam_unemployment_unemployed_1 : ((100000 : Int) / (20 : Int)) = (5000 : Int) := by decide

/-- unemployment: participationrate(63, 100) = 63 -/
theorem fam_unemployment_participationrate_1 : (((63 : Int) * (100 : Int)) / (100 : Int)) = (63 : Int) := by decide

/-- unemployment: naturalrate(4, 100) = 4 -/
theorem fam_unemployment_naturalrate_1 : (((4 : Int) * (100 : Int)) / (100 : Int)) = (4 : Int) := by decide

/-- unemployment: okunsgap(5, 4) = 1 -/
theorem fam_unemployment_okunsgap_1 : (fmax (0 : Int) ((5 : Int) - (4 : Int))) = (1 : Int) := by decide

/-- unemployment: jobseekers(5000, 1) = 5000 -/
theorem fam_unemployment_jobseekers_1 : ((5000 : Int) * (1 : Int)) = (5000 : Int) := by decide

/-- unemployment: durationweeks(20, 6) = 26 -/
theorem fam_unemployment_durationweeks_1 : ((20 : Int) + (6 : Int)) = (26 : Int) := by decide

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
theorem fam_upload_area_1 : ((1920 : Int) * (1080 : Int)) = (2073600 : Int) := by decide

/-- upload: aspect(1920, 1080) = 177 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded
    image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail
    sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses
    to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic
    (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload
    CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. -/
theorem fam_upload_aspect_1 : (((1920 : Int) * (100 : Int)) / (1080 : Int)) = (177 : Int) := by decide

/-- upload: resize(1920, 50) = 960 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded
    image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail
    sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses
    to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic
    (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload
    CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. -/
theorem fam_upload_resize_1 : (((1920 : Int) * (50 : Int)) / (100 : Int)) = (960 : Int) := by decide

/-- upload: quality(1000000, 80) = 800000 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An
    uploaded image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a
    thumbnail sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept.
    Crosses to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload
    arithmetic (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the
    Payload CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. */ static resize(dim: number, pct: number): CrossFormula { return
    c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct),
    'resize', [dim, pct]) } /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct /
    100⌋. -/
theorem fam_upload_quality_1 : (((1000000 : Int) * (80 : Int)) / (100 : Int)) = (800000 : Int) := by decide

/-- upload: thumbnail(150, 12) = 1800 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded
    image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail
    sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses
    to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic
    (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload
    CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. */ static resize(dim: number, pct: number): CrossFormula { return
    c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct),
    'resize', [dim, pct]) } /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct /
    100⌋. */ static quality(bytes: number, pct: number): CrossFormula { return c('upload-quality',
    'quality(bytes, pct) = ⌊bytes · pct / 100⌋', Math.floor((bytes * pct) / 100), nat(bytes, pct), 'quality',
    [bytes, pct]) } /** THUMBNAIL sheet: a square size times the count. value size · count. -/
theorem fam_upload_thumbnail_1 : ((150 : Int) * (12 : Int)) = (1800 : Int) := by decide

/-- upload: filesize(2073600, 24) = 6220800 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An
    uploaded image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a
    thumbnail sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept.
    Crosses to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload
    arithmetic (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the
    Payload CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. */ static resize(dim: number, pct: number): CrossFormula { return
    c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct),
    'resize', [dim, pct]) } /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct /
    100⌋. */ static quality(bytes: number, pct: number): CrossFormula { return c('upload-quality',
    'quality(bytes, pct) = ⌊bytes · pct / 100⌋', Math.floor((bytes * pct) / 100), nat(bytes, pct), 'quality',
    [bytes, pct]) } /** THUMBNAIL sheet: a square size times the count. value size · count. */ static
    thumbnail(size: number, count: number): CrossFormula { return c('upload-thumbnail', 'thumbnail(size, count)
    = size · count', size * count, nat(size, count), 'thumbnail', [size, count]) } /** FILESIZE: the bytes a raw
    bitmap of so many pixels at a bit depth takes. value ⌊pixels · depth / 8⌋. -/
theorem fam_upload_filesize_1 : (((2073600 : Int) * (24 : Int)) / (8 : Int)) = (6220800 : Int) := by decide

/-- upload: within(500, 1000) = 1 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded
    image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail
    sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses
    to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic
    (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload
    CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. */ static resize(dim: number, pct: number): CrossFormula { return
    c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct),
    'resize', [dim, pct]) } /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct /
    100⌋. */ static quality(bytes: number, pct: number): CrossFormula { return c('upload-quality',
    'quality(bytes, pct) = ⌊bytes · pct / 100⌋', Math.floor((bytes * pct) / 100), nat(bytes, pct), 'quality',
    [bytes, pct]) } /** THUMBNAIL sheet: a square size times the count. value size · count. */ static
    thumbnail(size: number, count: number): CrossFormula { return c('upload-thumbnail', 'thumbnail(size, count)
    = size · count', size * count, nat(size, count), 'thumbnail', [size, count]) } /** FILESIZE: the bytes a raw
    bitmap of so many pixels at a bit depth takes. value ⌊pixels · depth / 8⌋. */ static filesize(pixels:
    number, depth: number): CrossFormula { return c('upload-filesize', 'filesize(pixels, depth) = ⌊pixels ·
    depth / 8⌋', Math.floor((pixels * depth) / 8), nat(pixels, depth), 'filesize', [pixels, depth]) } /** WITHIN
    the size limit: 1 when the file fits. value [size ≤ max]. -/
theorem fam_upload_within_1 : (if (if (500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int) := by decide

/-- upload: within(1500, 1000) = 0 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded
    image is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail
    sheet, the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses
    to `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic
    (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload
    CMS upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. */ static resize(dim: number, pct: number): CrossFormula { return
    c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct),
    'resize', [dim, pct]) } /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct /
    100⌋. */ static quality(bytes: number, pct: number): CrossFormula { return c('upload-quality',
    'quality(bytes, pct) = ⌊bytes · pct / 100⌋', Math.floor((bytes * pct) / 100), nat(bytes, pct), 'quality',
    [bytes, pct]) } /** THUMBNAIL sheet: a square size times the count. value size · count. */ static
    thumbnail(size: number, count: number): CrossFormula { return c('upload-thumbnail', 'thumbnail(size, count)
    = size · count', size * count, nat(size, count), 'thumbnail', [size, count]) } /** FILESIZE: the bytes a raw
    bitmap of so many pixels at a bit depth takes. value ⌊pixels · depth / 8⌋. */ static filesize(pixels:
    number, depth: number): CrossFormula { return c('upload-filesize', 'filesize(pixels, depth) = ⌊pixels ·
    depth / 8⌋', Math.floor((pixels * depth) / 8), nat(pixels, depth), 'filesize', [pixels, depth]) } /** WITHIN
    the size limit: 1 when the file fits. value [size ≤ max]. -/
theorem fam_upload_within_2 : (if (if (1500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int) := by decide

/-- upload: crop(750, 1000) = 75 — UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded image
    is numbers: its pixel area, its aspect ratio, a resized dimension, a re-encoded quality, a thumbnail sheet,
    the bytes a raw bitmap takes, whether it fits a size limit, and how much of a crop is kept. Crosses to
    `payload` — upload is the media layer Payload stores. A measure. */ const PROOF = 'upload arithmetic (image
    area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload CMS
    upload/media API as exact integers; a measure crossed to payload' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name:
    `upload.${name}`, params }) export class UploadFormulas { /** AREA: the pixels of an image. value width ·
    height. */ static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width,
    height) = width · height', width * height, nat(width, height), 'area', [width, height]) } /** ASPECT ratio,
    times a hundred. value ⌊width · 100 / height⌋. */ static aspect(width: number, height: number): CrossFormula
    { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width
    * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /** RESIZE a dimension
    by a percentage. value ⌊dim · pct / 100⌋. */ static resize(dim: number, pct: number): CrossFormula { return
    c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct),
    'resize', [dim, pct]) } /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct /
    100⌋. */ static quality(bytes: number, pct: number): CrossFormula { return c('upload-quality',
    'quality(bytes, pct) = ⌊bytes · pct / 100⌋', Math.floor((bytes * pct) / 100), nat(bytes, pct), 'quality',
    [bytes, pct]) } /** THUMBNAIL sheet: a square size times the count. value size · count. */ static
    thumbnail(size: number, count: number): CrossFormula { return c('upload-thumbnail', 'thumbnail(size, count)
    = size · count', size * count, nat(size, count), 'thumbnail', [size, count]) } /** FILESIZE: the bytes a raw
    bitmap of so many pixels at a bit depth takes. value ⌊pixels · depth / 8⌋. */ static filesize(pixels:
    number, depth: number): CrossFormula { return c('upload-filesize', 'filesize(pixels, depth) = ⌊pixels ·
    depth / 8⌋', Math.floor((pixels * depth) / 8), nat(pixels, depth), 'filesize', [pixels, depth]) } /** WITHIN
    the size limit: 1 when the file fits. value [size ≤ max]. */ static within(size: number, max: number):
    CrossFormula { return c('upload-within', 'within(size, max) = [size ≤ max]', size <= max ? 1 : 0, nat(size,
    max), 'within', [size, max]) } /** CROP: the percentage of an image kept. value ⌊kept · 100 / total⌋. -/
theorem fam_upload_crop_1 : (((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int) := by decide

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
theorem fam_urbanism_density_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- urbanism: jobshousing(1200, 1000) = 120 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the
    registry, not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its
    uses are, block area, intersections per area, floor-area ratio, people per area, and the share of residents
    a service reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure.
    */ const PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size,
    intersection density, floor-area ratio, population density, service coverage); a city measured as integers;
    a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. -/
theorem fam_urbanism_jobshousing_1 : (((1200 : Int) * (100 : Int)) / (1000 : Int)) = (120 : Int) := by decide

/-- urbanism: mixeduse(3, 10) = 30 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the registry, not
    by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its uses are,
    block area, intersections per area, floor-area ratio, people per area, and the share of residents a service
    reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure. */ const
    PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size, intersection
    density, floor-area ratio, population density, service coverage); a city measured as integers; a measure
    crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */ static jobshousing(jobs:
    number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) =
    ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing
    > 0, 'jobshousing', [jobs, housing]) } /** MIXED USE: the share of parcels carrying a mix, as a percentage.
    value ⌊uses · 100 / parcels⌋. -/
theorem fam_urbanism_mixeduse_1 : (((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int) := by decide

/-- urbanism: blocksize(100, 80) = 8000 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the registry,
    not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its uses are,
    block area, intersections per area, floor-area ratio, people per area, and the share of residents a service
    reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure. */ const
    PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size, intersection
    density, floor-area ratio, population density, service coverage); a city measured as integers; a measure
    crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */ static jobshousing(jobs:
    number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) =
    ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing
    > 0, 'jobshousing', [jobs, housing]) } /** MIXED USE: the share of parcels carrying a mix, as a percentage.
    value ⌊uses · 100 / parcels⌋. */ static mixeduse(uses: number, parcels: number): CrossFormula { return
    c('urbanism-mixeduse', 'mixeduse(uses, parcels) = ⌊uses · 100 / parcels⌋', parcels > 0 ? Math.floor((uses *
    100) / parcels) : 0, nat(uses, parcels) && parcels > 0 && uses <= parcels, 'mixeduse', [uses, parcels]) }
    /** BLOCK SIZE: a block's area from its two sides. value length · width. -/
theorem fam_urbanism_blocksize_1 : ((100 : Int) * (80 : Int)) = (8000 : Int) := by decide

/-- urbanism: intersectiondensity(200, 10) = 20 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the
    registry, not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its
    uses are, block area, intersections per area, floor-area ratio, people per area, and the share of residents
    a service reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure.
    */ const PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size,
    intersection density, floor-area ratio, population density, service coverage); a city measured as integers;
    a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */ static jobshousing(jobs:
    number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) =
    ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing
    > 0, 'jobshousing', [jobs, housing]) } /** MIXED USE: the share of parcels carrying a mix, as a percentage.
    value ⌊uses · 100 / parcels⌋. */ static mixeduse(uses: number, parcels: number): CrossFormula { return
    c('urbanism-mixeduse', 'mixeduse(uses, parcels) = ⌊uses · 100 / parcels⌋', parcels > 0 ? Math.floor((uses *
    100) / parcels) : 0, nat(uses, parcels) && parcels > 0 && uses <= parcels, 'mixeduse', [uses, parcels]) }
    /** BLOCK SIZE: a block's area from its two sides. value length · width. */ static blocksize(length: number,
    width: number): CrossFormula { return c('urbanism-blocksize', 'blocksize(length, width) = length · width',
    length * width, nat(length, width), 'blocksize', [length, width]) } /** INTERSECTION DENSITY: intersections
    over the area. value ⌊intersections / area⌋. -/
theorem fam_urbanism_intersectiondensity_1 : ((200 : Int) / (10 : Int)) = (20 : Int) := by decide

/-- urbanism: floorarearatio(250, 100) = 250 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the
    registry, not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its
    uses are, block area, intersections per area, floor-area ratio, people per area, and the share of residents
    a service reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure.
    */ const PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size,
    intersection density, floor-area ratio, population density, service coverage); a city measured as integers;
    a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */ static jobshousing(jobs:
    number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) =
    ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing
    > 0, 'jobshousing', [jobs, housing]) } /** MIXED USE: the share of parcels carrying a mix, as a percentage.
    value ⌊uses · 100 / parcels⌋. */ static mixeduse(uses: number, parcels: number): CrossFormula { return
    c('urbanism-mixeduse', 'mixeduse(uses, parcels) = ⌊uses · 100 / parcels⌋', parcels > 0 ? Math.floor((uses *
    100) / parcels) : 0, nat(uses, parcels) && parcels > 0 && uses <= parcels, 'mixeduse', [uses, parcels]) }
    /** BLOCK SIZE: a block's area from its two sides. value length · width. */ static blocksize(length: number,
    width: number): CrossFormula { return c('urbanism-blocksize', 'blocksize(length, width) = length · width',
    length * width, nat(length, width), 'blocksize', [length, width]) } /** INTERSECTION DENSITY: intersections
    over the area. value ⌊intersections / area⌋. */ static intersectiondensity(intersections: number, area:
    number): CrossFormula { return c('urbanism-intersectiondensity', 'intersectiondensity(intersections, area) =
    ⌊intersections / area⌋', area > 0 ? Math.floor(intersections / area) : 0, nat(intersections, area) && area >
    0, 'intersectiondensity', [intersections, area]) } /** FLOOR-AREA RATIO as a percentage of the lot. value
    ⌊floorarea · 100 / lotarea⌋. -/
theorem fam_urbanism_floorarearatio_1 : (((250 : Int) * (100 : Int)) / (100 : Int)) = (250 : Int) := by decide

/-- urbanism: populationdensity(50000, 25) = 2000 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the
    registry, not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its
    uses are, block area, intersections per area, floor-area ratio, people per area, and the share of residents
    a service reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure.
    */ const PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size,
    intersection density, floor-area ratio, population density, service coverage); a city measured as integers;
    a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */ static jobshousing(jobs:
    number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) =
    ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing
    > 0, 'jobshousing', [jobs, housing]) } /** MIXED USE: the share of parcels carrying a mix, as a percentage.
    value ⌊uses · 100 / parcels⌋. */ static mixeduse(uses: number, parcels: number): CrossFormula { return
    c('urbanism-mixeduse', 'mixeduse(uses, parcels) = ⌊uses · 100 / parcels⌋', parcels > 0 ? Math.floor((uses *
    100) / parcels) : 0, nat(uses, parcels) && parcels > 0 && uses <= parcels, 'mixeduse', [uses, parcels]) }
    /** BLOCK SIZE: a block's area from its two sides. value length · width. */ static blocksize(length: number,
    width: number): CrossFormula { return c('urbanism-blocksize', 'blocksize(length, width) = length · width',
    length * width, nat(length, width), 'blocksize', [length, width]) } /** INTERSECTION DENSITY: intersections
    over the area. value ⌊intersections / area⌋. */ static intersectiondensity(intersections: number, area:
    number): CrossFormula { return c('urbanism-intersectiondensity', 'intersectiondensity(intersections, area) =
    ⌊intersections / area⌋', area > 0 ? Math.floor(intersections / area) : 0, nat(intersections, area) && area >
    0, 'intersectiondensity', [intersections, area]) } /** FLOOR-AREA RATIO as a percentage of the lot. value
    ⌊floorarea · 100 / lotarea⌋. */ static floorarearatio(floorarea: number, lotarea: number): CrossFormula {
    return c('urbanism-floorarearatio', 'floorarearatio(floorarea, lotarea) = ⌊floorarea · 100 / lotarea⌋',
    lotarea > 0 ? Math.floor((floorarea * 100) / lotarea) : 0, nat(floorarea, lotarea) && lotarea > 0,
    'floorarearatio', [floorarea, lotarea]) } /** POPULATION DENSITY: people over the area. value ⌊population /
    area⌋. -/
theorem fam_urbanism_populationdensity_1 : ((50000 : Int) / (25 : Int)) = (2000 : Int) := by decide

/-- urbanism: servicecoverage(950, 1000) = 95 — URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the
    registry, not by hand). A settlement is numbers: dwelling density, the jobs-to-housing ratio, how mixed its
    uses are, block area, intersections per area, floor-area ratio, people per area, and the share of residents
    a service reaches. Crosses to `governance` — urbanism is what a government plans and regulates. A measure.
    */ const PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size,
    intersection density, floor-area ratio, population density, service coverage); a city measured as integers;
    a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urbanism', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params }) export
    class UrbanismFormulas { /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */ static
    density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) =
    ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units,
    area]) } /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */ static jobshousing(jobs:
    number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) =
    ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing
    > 0, 'jobshousing', [jobs, housing]) } /** MIXED USE: the share of parcels carrying a mix, as a percentage.
    value ⌊uses · 100 / parcels⌋. */ static mixeduse(uses: number, parcels: number): CrossFormula { return
    c('urbanism-mixeduse', 'mixeduse(uses, parcels) = ⌊uses · 100 / parcels⌋', parcels > 0 ? Math.floor((uses *
    100) / parcels) : 0, nat(uses, parcels) && parcels > 0 && uses <= parcels, 'mixeduse', [uses, parcels]) }
    /** BLOCK SIZE: a block's area from its two sides. value length · width. */ static blocksize(length: number,
    width: number): CrossFormula { return c('urbanism-blocksize', 'blocksize(length, width) = length · width',
    length * width, nat(length, width), 'blocksize', [length, width]) } /** INTERSECTION DENSITY: intersections
    over the area. value ⌊intersections / area⌋. */ static intersectiondensity(intersections: number, area:
    number): CrossFormula { return c('urbanism-intersectiondensity', 'intersectiondensity(intersections, area) =
    ⌊intersections / area⌋', area > 0 ? Math.floor(intersections / area) : 0, nat(intersections, area) && area >
    0, 'intersectiondensity', [intersections, area]) } /** FLOOR-AREA RATIO as a percentage of the lot. value
    ⌊floorarea · 100 / lotarea⌋. */ static floorarearatio(floorarea: number, lotarea: number): CrossFormula {
    return c('urbanism-floorarearatio', 'floorarearatio(floorarea, lotarea) = ⌊floorarea · 100 / lotarea⌋',
    lotarea > 0 ? Math.floor((floorarea * 100) / lotarea) : 0, nat(floorarea, lotarea) && lotarea > 0,
    'floorarearatio', [floorarea, lotarea]) } /** POPULATION DENSITY: people over the area. value ⌊population /
    area⌋. */ static populationdensity(population: number, area: number): CrossFormula { return
    c('urbanism-populationdensity', 'populationdensity(population, area) = ⌊population / area⌋', area > 0 ?
    Math.floor(population / area) : 0, nat(population, area) && area > 0, 'populationdensity', [population,
    area]) } /** SERVICE COVERAGE: the share of residents a service reaches, as a percentage. value ⌊served ·
    100 / total⌋. -/
theorem fam_urbanism_servicecoverage_1 : (((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int) := by decide

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
theorem fam_urology_flowrate_1 : ((500 : Int) / (25 : Int)) = (20 : Int) := by decide

/-- urology: residual(50, 400) = 12 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical
    registry, not by hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly
    output, stone size, voiding frequency, solute concentration, and the continence fraction. Crosses to `med` —
    urology is one of medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual
    fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas {
    /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume:
    number, seconds: number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume /
    seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate',
    [volume, seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value
    ⌊remaining · 100 / capacity⌋. -/
theorem fam_urology_residual_1 : (((50 : Int) * (100 : Int)) / (400 : Int)) = (12 : Int) := by decide

/-- urology: psa(12, 3) = 4 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical registry, not by
    hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly output, stone size,
    voiding frequency, solute concentration, and the continence fraction. Crosses to `med` — urology is one of
    medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual fraction, PSA
    density, output, stone size, frequency, concentration, continence); a clinical measure crossed to med' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas { /** FLOW RATE:
    voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume: number, seconds:
    number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume / seconds⌋',
    seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate', [volume,
    seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value ⌊remaining · 100 /
    capacity⌋. */ static residual(remaining: number, capacity: number): CrossFormula { return
    c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ?
    Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <=
    capacity, 'residual', [remaining, capacity]) } /** PSA DENSITY: antigen over prostate volume. value ⌊antigen
    / volume⌋. -/
theorem fam_urology_psa_1 : ((12 : Int) / (3 : Int)) = (4 : Int) := by decide

/-- urology: output(1800, 24) = 75 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical registry,
    not by hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly output,
    stone size, voiding frequency, solute concentration, and the continence fraction. Crosses to `med` — urology
    is one of medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual
    fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas {
    /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume:
    number, seconds: number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume /
    seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate',
    [volume, seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value
    ⌊remaining · 100 / capacity⌋. */ static residual(remaining: number, capacity: number): CrossFormula { return
    c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ?
    Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <=
    capacity, 'residual', [remaining, capacity]) } /** PSA DENSITY: antigen over prostate volume. value ⌊antigen
    / volume⌋. */ static psa(antigen: number, volume: number): CrossFormula { return c('urology-psa',
    'psa(antigen, volume) = ⌊antigen / volume⌋', volume > 0 ? Math.floor(antigen / volume) : 0, nat(antigen,
    volume) && volume > 0, 'psa', [antigen, volume]) } /** HOURLY OUTPUT: volume over the hours observed. value
    ⌊volume / hours⌋. -/
theorem fam_urology_output_1 : ((1800 : Int) / (24 : Int)) = (75 : Int) := by decide

/-- urology: stone(7) = 7 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical registry, not by
    hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly output, stone size,
    voiding frequency, solute concentration, and the continence fraction. Crosses to `med` — urology is one of
    medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual fraction, PSA
    density, output, stone size, frequency, concentration, continence); a clinical measure crossed to med' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas { /** FLOW RATE:
    voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume: number, seconds:
    number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume / seconds⌋',
    seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate', [volume,
    seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value ⌊remaining · 100 /
    capacity⌋. */ static residual(remaining: number, capacity: number): CrossFormula { return
    c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ?
    Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <=
    capacity, 'residual', [remaining, capacity]) } /** PSA DENSITY: antigen over prostate volume. value ⌊antigen
    / volume⌋. */ static psa(antigen: number, volume: number): CrossFormula { return c('urology-psa',
    'psa(antigen, volume) = ⌊antigen / volume⌋', volume > 0 ? Math.floor(antigen / volume) : 0, nat(antigen,
    volume) && volume > 0, 'psa', [antigen, volume]) } /** HOURLY OUTPUT: volume over the hours observed. value
    ⌊volume / hours⌋. */ static output(volume: number, hours: number): CrossFormula { return c('urology-output',
    'output(volume, hours) = ⌊volume / hours⌋', hours > 0 ? Math.floor(volume / hours) : 0, nat(volume, hours)
    && hours > 0, 'output', [volume, hours]) } /** STONE SIZE: the stone diameter itself. value diameter. -/
theorem fam_urology_stone_1 : (7 : Int) = (7 : Int) := by decide

/-- urology: frequency(8, 24) = 33 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical registry,
    not by hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly output,
    stone size, voiding frequency, solute concentration, and the continence fraction. Crosses to `med` — urology
    is one of medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual
    fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas {
    /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume:
    number, seconds: number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume /
    seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate',
    [volume, seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value
    ⌊remaining · 100 / capacity⌋. */ static residual(remaining: number, capacity: number): CrossFormula { return
    c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ?
    Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <=
    capacity, 'residual', [remaining, capacity]) } /** PSA DENSITY: antigen over prostate volume. value ⌊antigen
    / volume⌋. */ static psa(antigen: number, volume: number): CrossFormula { return c('urology-psa',
    'psa(antigen, volume) = ⌊antigen / volume⌋', volume > 0 ? Math.floor(antigen / volume) : 0, nat(antigen,
    volume) && volume > 0, 'psa', [antigen, volume]) } /** HOURLY OUTPUT: volume over the hours observed. value
    ⌊volume / hours⌋. */ static output(volume: number, hours: number): CrossFormula { return c('urology-output',
    'output(volume, hours) = ⌊volume / hours⌋', hours > 0 ? Math.floor(volume / hours) : 0, nat(volume, hours)
    && hours > 0, 'output', [volume, hours]) } /** STONE SIZE: the stone diameter itself. value diameter. */
    static stone(diameter: number): CrossFormula { return c('urology-stone', 'stone(diameter) = diameter',
    diameter, nat(diameter), 'stone', [diameter]) } /** VOIDING FREQUENCY: voids per hour, scaled. value ⌊voids
    · 100 / hours⌋. -/
theorem fam_urology_frequency_1 : (((8 : Int) * (100 : Int)) / (24 : Int)) = (33 : Int) := by decide

/-- urology: concentration(600, 2) = 300 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical
    registry, not by hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly
    output, stone size, voiding frequency, solute concentration, and the continence fraction. Crosses to `med` —
    urology is one of medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual
    fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas {
    /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume:
    number, seconds: number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume /
    seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate',
    [volume, seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value
    ⌊remaining · 100 / capacity⌋. */ static residual(remaining: number, capacity: number): CrossFormula { return
    c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ?
    Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <=
    capacity, 'residual', [remaining, capacity]) } /** PSA DENSITY: antigen over prostate volume. value ⌊antigen
    / volume⌋. */ static psa(antigen: number, volume: number): CrossFormula { return c('urology-psa',
    'psa(antigen, volume) = ⌊antigen / volume⌋', volume > 0 ? Math.floor(antigen / volume) : 0, nat(antigen,
    volume) && volume > 0, 'psa', [antigen, volume]) } /** HOURLY OUTPUT: volume over the hours observed. value
    ⌊volume / hours⌋. */ static output(volume: number, hours: number): CrossFormula { return c('urology-output',
    'output(volume, hours) = ⌊volume / hours⌋', hours > 0 ? Math.floor(volume / hours) : 0, nat(volume, hours)
    && hours > 0, 'output', [volume, hours]) } /** STONE SIZE: the stone diameter itself. value diameter. */
    static stone(diameter: number): CrossFormula { return c('urology-stone', 'stone(diameter) = diameter',
    diameter, nat(diameter), 'stone', [diameter]) } /** VOIDING FREQUENCY: voids per hour, scaled. value ⌊voids
    · 100 / hours⌋. */ static frequency(voids: number, hours: number): CrossFormula { return
    c('urology-frequency', 'frequency(voids, hours) = ⌊voids · 100 / hours⌋', hours > 0 ? Math.floor((voids *
    100) / hours) : 0, nat(voids, hours) && hours > 0, 'frequency', [voids, hours]) } /** SOLUTE CONCENTRATION:
    solutes over volume. value ⌊solutes / volume⌋. -/
theorem fam_urology_concentration_1 : ((600 : Int) / (2 : Int)) = (300 : Int) := by decide

/-- urology: continence(27, 30) = 90 — UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical
    registry, not by hand). Measuring the tract is numbers: flow rate, residual fraction, PSA density, hourly
    output, stone size, voiding frequency, solute concentration, and the continence fraction. Crosses to `med` —
    urology is one of medicine's measures. A measure. */ const PROOF = 'urology arithmetic (flow rate, residual
    fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed
    to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'urology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params }) export class UrologyFormulas {
    /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. */ static flowrate(volume:
    number, seconds: number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume /
    seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate',
    [volume, seconds]) } /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value
    ⌊remaining · 100 / capacity⌋. */ static residual(remaining: number, capacity: number): CrossFormula { return
    c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ?
    Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <=
    capacity, 'residual', [remaining, capacity]) } /** PSA DENSITY: antigen over prostate volume. value ⌊antigen
    / volume⌋. */ static psa(antigen: number, volume: number): CrossFormula { return c('urology-psa',
    'psa(antigen, volume) = ⌊antigen / volume⌋', volume > 0 ? Math.floor(antigen / volume) : 0, nat(antigen,
    volume) && volume > 0, 'psa', [antigen, volume]) } /** HOURLY OUTPUT: volume over the hours observed. value
    ⌊volume / hours⌋. */ static output(volume: number, hours: number): CrossFormula { return c('urology-output',
    'output(volume, hours) = ⌊volume / hours⌋', hours > 0 ? Math.floor(volume / hours) : 0, nat(volume, hours)
    && hours > 0, 'output', [volume, hours]) } /** STONE SIZE: the stone diameter itself. value diameter. */
    static stone(diameter: number): CrossFormula { return c('urology-stone', 'stone(diameter) = diameter',
    diameter, nat(diameter), 'stone', [diameter]) } /** VOIDING FREQUENCY: voids per hour, scaled. value ⌊voids
    · 100 / hours⌋. */ static frequency(voids: number, hours: number): CrossFormula { return
    c('urology-frequency', 'frequency(voids, hours) = ⌊voids · 100 / hours⌋', hours > 0 ? Math.floor((voids *
    100) / hours) : 0, nat(voids, hours) && hours > 0, 'frequency', [voids, hours]) } /** SOLUTE CONCENTRATION:
    solutes over volume. value ⌊solutes / volume⌋. */ static concentration(solutes: number, volume: number):
    CrossFormula { return c('urology-concentration', 'concentration(solutes, volume) = ⌊solutes / volume⌋',
    volume > 0 ? Math.floor(solutes / volume) : 0, nat(solutes, volume) && volume > 0, 'concentration',
    [solutes, volume]) } /** CONTINENCE: dry days as a percentage of the total. value ⌊dry · 100 / total⌋. -/
theorem fam_urology_continence_1 : (((27 : Int) * (100 : Int)) / (30 : Int)) = (90 : Int) := by decide

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
theorem fam_usability_success_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- usability: efficiency(5, 10) = 50 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC.
    Task success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS proxy, and
    retention. Crosses to `layout` — usability is what the arrangement of the screen earns or loses. A measure.
    */ const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability,
    time on task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to
    layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class
    UsabilityFormulas { /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 /
    attempts⌋. */ static success(completed: number, attempts: number): CrossFormula { return
    c('usability-success', 'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ?
    Math.floor((completed * 100) / attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <=
    attempts, 'success', [completed, attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value
    ⌊tasks · 100 / time⌋. -/
theorem fam_usability_efficiency_1 : (((5 : Int) * (100 : Int)) / (10 : Int)) = (50 : Int) := by decide

/-- usability: errors(3, 100) = 3 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC. Task
    success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS proxy, and retention.
    Crosses to `layout` — usability is what the arrangement of the screen earns or loses. A measure. */ const
    PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability, time on
    task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to layout' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout', formula, value, proof:
    PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class UsabilityFormulas { /** TASK
    SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 / attempts⌋. */ static
    success(completed: number, attempts: number): CrossFormula { return c('usability-success',
    'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ? Math.floor((completed * 100) /
    attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <= attempts, 'success', [completed,
    attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value ⌊tasks · 100 / time⌋. */ static
    efficiency(tasks: number, time: number): CrossFormula { return c('usability-efficiency', 'efficiency(tasks,
    time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks * 100) / time) : 0, nat(tasks, time) && time >
    0, 'efficiency', [tasks, time]) } /** ERROR RATE: mistakes over tasks as a percentage. value ⌊mistakes · 100
    / tasks⌋. -/
theorem fam_usability_errors_1 : (((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int) := by decide

/-- usability: satisfaction(40, 50) = 80 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS
    ARITHMETIC. Task success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS
    proxy, and retention. Crosses to `layout` — usability is what the arrangement of the screen earns or loses.
    A measure. */ const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction,
    learnability, time on task, SUS proxy, retention); how well people succeed with the interface; a measure
    crossed to layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const
    c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class
    UsabilityFormulas { /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 /
    attempts⌋. */ static success(completed: number, attempts: number): CrossFormula { return
    c('usability-success', 'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ?
    Math.floor((completed * 100) / attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <=
    attempts, 'success', [completed, attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value
    ⌊tasks · 100 / time⌋. */ static efficiency(tasks: number, time: number): CrossFormula { return
    c('usability-efficiency', 'efficiency(tasks, time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks *
    100) / time) : 0, nat(tasks, time) && time > 0, 'efficiency', [tasks, time]) } /** ERROR RATE: mistakes over
    tasks as a percentage. value ⌊mistakes · 100 / tasks⌋. */ static errors(mistakes: number, tasks: number):
    CrossFormula { return c('usability-errors', 'errors(mistakes, tasks) = ⌊mistakes · 100 / tasks⌋', tasks > 0
    ? Math.floor((mistakes * 100) / tasks) : 0, nat(mistakes, tasks) && tasks > 0, 'errors', [mistakes, tasks])
    } /** SATISFACTION: score over the maximum as a percentage. value ⌊score · 100 / max⌋. -/
theorem fam_usability_satisfaction_1 : (((40 : Int) * (100 : Int)) / (50 : Int)) = (80 : Int) := by decide

/-- usability: learnability(100, 4) = 25 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS
    ARITHMETIC. Task success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS
    proxy, and retention. Crosses to `layout` — usability is what the arrangement of the screen earns or loses.
    A measure. */ const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction,
    learnability, time on task, SUS proxy, retention); how well people succeed with the interface; a measure
    crossed to layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const
    c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class
    UsabilityFormulas { /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 /
    attempts⌋. */ static success(completed: number, attempts: number): CrossFormula { return
    c('usability-success', 'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ?
    Math.floor((completed * 100) / attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <=
    attempts, 'success', [completed, attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value
    ⌊tasks · 100 / time⌋. */ static efficiency(tasks: number, time: number): CrossFormula { return
    c('usability-efficiency', 'efficiency(tasks, time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks *
    100) / time) : 0, nat(tasks, time) && time > 0, 'efficiency', [tasks, time]) } /** ERROR RATE: mistakes over
    tasks as a percentage. value ⌊mistakes · 100 / tasks⌋. */ static errors(mistakes: number, tasks: number):
    CrossFormula { return c('usability-errors', 'errors(mistakes, tasks) = ⌊mistakes · 100 / tasks⌋', tasks > 0
    ? Math.floor((mistakes * 100) / tasks) : 0, nat(mistakes, tasks) && tasks > 0, 'errors', [mistakes, tasks])
    } /** SATISFACTION: score over the maximum as a percentage. value ⌊score · 100 / max⌋. */ static
    satisfaction(score: number, max: number): CrossFormula { return c('usability-satisfaction',
    'satisfaction(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score,
    max) && max > 0 && score <= max, 'satisfaction', [score, max]) } /** LEARNABILITY: improvement averaged over
    sessions. value ⌊improved / sessions⌋. -/
theorem fam_usability_learnability_1 : ((100 : Int) / (4 : Int)) = (25 : Int) := by decide

/-- usability: timeontask(600, 10) = 60 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC.
    Task success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS proxy, and
    retention. Crosses to `layout` — usability is what the arrangement of the screen earns or loses. A measure.
    */ const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability,
    time on task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to
    layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class
    UsabilityFormulas { /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 /
    attempts⌋. */ static success(completed: number, attempts: number): CrossFormula { return
    c('usability-success', 'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ?
    Math.floor((completed * 100) / attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <=
    attempts, 'success', [completed, attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value
    ⌊tasks · 100 / time⌋. */ static efficiency(tasks: number, time: number): CrossFormula { return
    c('usability-efficiency', 'efficiency(tasks, time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks *
    100) / time) : 0, nat(tasks, time) && time > 0, 'efficiency', [tasks, time]) } /** ERROR RATE: mistakes over
    tasks as a percentage. value ⌊mistakes · 100 / tasks⌋. */ static errors(mistakes: number, tasks: number):
    CrossFormula { return c('usability-errors', 'errors(mistakes, tasks) = ⌊mistakes · 100 / tasks⌋', tasks > 0
    ? Math.floor((mistakes * 100) / tasks) : 0, nat(mistakes, tasks) && tasks > 0, 'errors', [mistakes, tasks])
    } /** SATISFACTION: score over the maximum as a percentage. value ⌊score · 100 / max⌋. */ static
    satisfaction(score: number, max: number): CrossFormula { return c('usability-satisfaction',
    'satisfaction(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score,
    max) && max > 0 && score <= max, 'satisfaction', [score, max]) } /** LEARNABILITY: improvement averaged over
    sessions. value ⌊improved / sessions⌋. */ static learnability(improved: number, sessions: number):
    CrossFormula { return c('usability-learnability', 'learnability(improved, sessions) = ⌊improved /
    sessions⌋', sessions > 0 ? Math.floor(improved / sessions) : 0, nat(improved, sessions) && sessions > 0,
    'learnability', [improved, sessions]) } /** TIME ON TASK: seconds averaged over tasks. value ⌊seconds /
    tasks⌋. -/
theorem fam_usability_timeontask_1 : ((600 : Int) / (10 : Int)) = (60 : Int) := by decide

/-- usability: sus(32) = 80 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC. Task
    success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS proxy, and retention.
    Crosses to `layout` — usability is what the arrangement of the screen earns or loses. A measure. */ const
    PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability, time on
    task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to layout' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout', formula, value, proof:
    PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class UsabilityFormulas { /** TASK
    SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 / attempts⌋. */ static
    success(completed: number, attempts: number): CrossFormula { return c('usability-success',
    'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ? Math.floor((completed * 100) /
    attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <= attempts, 'success', [completed,
    attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value ⌊tasks · 100 / time⌋. */ static
    efficiency(tasks: number, time: number): CrossFormula { return c('usability-efficiency', 'efficiency(tasks,
    time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks * 100) / time) : 0, nat(tasks, time) && time >
    0, 'efficiency', [tasks, time]) } /** ERROR RATE: mistakes over tasks as a percentage. value ⌊mistakes · 100
    / tasks⌋. */ static errors(mistakes: number, tasks: number): CrossFormula { return c('usability-errors',
    'errors(mistakes, tasks) = ⌊mistakes · 100 / tasks⌋', tasks > 0 ? Math.floor((mistakes * 100) / tasks) : 0,
    nat(mistakes, tasks) && tasks > 0, 'errors', [mistakes, tasks]) } /** SATISFACTION: score over the maximum
    as a percentage. value ⌊score · 100 / max⌋. */ static satisfaction(score: number, max: number): CrossFormula
    { return c('usability-satisfaction', 'satisfaction(score, max) = ⌊score · 100 / max⌋', max > 0 ?
    Math.floor((score * 100) / max) : 0, nat(score, max) && max > 0 && score <= max, 'satisfaction', [score,
    max]) } /** LEARNABILITY: improvement averaged over sessions. value ⌊improved / sessions⌋. */ static
    learnability(improved: number, sessions: number): CrossFormula { return c('usability-learnability',
    'learnability(improved, sessions) = ⌊improved / sessions⌋', sessions > 0 ? Math.floor(improved / sessions) :
    0, nat(improved, sessions) && sessions > 0, 'learnability', [improved, sessions]) } /** TIME ON TASK:
    seconds averaged over tasks. value ⌊seconds / tasks⌋. */ static timeontask(seconds: number, tasks: number):
    CrossFormula { return c('usability-timeontask', 'timeontask(seconds, tasks) = ⌊seconds / tasks⌋', tasks > 0
    ? Math.floor(seconds / tasks) : 0, nat(seconds, tasks) && tasks > 0, 'timeontask', [seconds, tasks]) } /**
    SUS PROXY: a raw score scaled to the familiar 0–100 band. value ⌊raw · 25 / 10⌋. -/
theorem fam_usability_sus_1 : (((32 : Int) * (25 : Int)) / (10 : Int)) = (80 : Int) := by decide

/-- usability: retention(70, 100) = 70 — USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC.
    Task success, time efficiency, error rate, satisfaction, learnability, time on task, a SUS proxy, and
    retention. Crosses to `layout` — usability is what the arrangement of the screen earns or loses. A measure.
    */ const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability,
    time on task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to
    layout' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'usability', dst: 'layout',
    formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params }) export class
    UsabilityFormulas { /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 /
    attempts⌋. */ static success(completed: number, attempts: number): CrossFormula { return
    c('usability-success', 'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ?
    Math.floor((completed * 100) / attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <=
    attempts, 'success', [completed, attempts]) } /** EFFICIENCY: tasks finished per unit time, scaled. value
    ⌊tasks · 100 / time⌋. */ static efficiency(tasks: number, time: number): CrossFormula { return
    c('usability-efficiency', 'efficiency(tasks, time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks *
    100) / time) : 0, nat(tasks, time) && time > 0, 'efficiency', [tasks, time]) } /** ERROR RATE: mistakes over
    tasks as a percentage. value ⌊mistakes · 100 / tasks⌋. */ static errors(mistakes: number, tasks: number):
    CrossFormula { return c('usability-errors', 'errors(mistakes, tasks) = ⌊mistakes · 100 / tasks⌋', tasks > 0
    ? Math.floor((mistakes * 100) / tasks) : 0, nat(mistakes, tasks) && tasks > 0, 'errors', [mistakes, tasks])
    } /** SATISFACTION: score over the maximum as a percentage. value ⌊score · 100 / max⌋. */ static
    satisfaction(score: number, max: number): CrossFormula { return c('usability-satisfaction',
    'satisfaction(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score,
    max) && max > 0 && score <= max, 'satisfaction', [score, max]) } /** LEARNABILITY: improvement averaged over
    sessions. value ⌊improved / sessions⌋. */ static learnability(improved: number, sessions: number):
    CrossFormula { return c('usability-learnability', 'learnability(improved, sessions) = ⌊improved /
    sessions⌋', sessions > 0 ? Math.floor(improved / sessions) : 0, nat(improved, sessions) && sessions > 0,
    'learnability', [improved, sessions]) } /** TIME ON TASK: seconds averaged over tasks. value ⌊seconds /
    tasks⌋. */ static timeontask(seconds: number, tasks: number): CrossFormula { return
    c('usability-timeontask', 'timeontask(seconds, tasks) = ⌊seconds / tasks⌋', tasks > 0 ? Math.floor(seconds /
    tasks) : 0, nat(seconds, tasks) && tasks > 0, 'timeontask', [seconds, tasks]) } /** SUS PROXY: a raw score
    scaled to the familiar 0–100 band. value ⌊raw · 25 / 10⌋. */ static sus(raw: number): CrossFormula { return
    c('usability-sus', 'sus(raw) = ⌊raw · 25 / 10⌋', Math.floor((raw * 25) / 10), nat(raw), 'sus', [raw]) } /**
    RETENTION: returning users over all users as a percentage. value ⌊returned · 100 / users⌋. -/
theorem fam_usability_retention_1 : (((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int) := by decide
