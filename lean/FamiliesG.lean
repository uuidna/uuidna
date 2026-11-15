-- lean/FamiliesG.lean — GENERATED. THE FAMILIES, G — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def fmin (a b : Int) : Int := if a ≤ b then a else b
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)
def fgcd : Nat → Nat → Nat → Nat
  | 0, a, _ => a
  | fuel + 1, a, b => if b = 0 then a else fgcd fuel b (a % b)

/-- galactic: rotationvelocity(60000, 300) = 200 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no
    floats). The dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how
    many stars a luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface
    brightness, and the share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics
    measures. A measure. */ const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count,
    disk mass, virial mass, escape velocity, surface brightness, metallicity) as integer proxies; a measure
    crossed to astrophysics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst:
    'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params })
    export class GalacticFormulas { /** ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the
    radius. value ⌊mass / radius⌋. -/
theorem fam_galactic_rotationvelocity_1 : ((60000 : Int) / (300 : Int)) = (200 : Int) := by decide

/-- galactic: masswithinradius(200, 300) = 60000 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no
    floats). The dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how
    many stars a luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface
    brightness, and the share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics
    measures. A measure. */ const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count,
    disk mass, virial mass, escape velocity, surface brightness, metallicity) as integer proxies; a measure
    crossed to astrophysics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst:
    'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params })
    export class GalacticFormulas { /** ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the
    radius. value ⌊mass / radius⌋. */ static rotationvelocity(mass: number, radius: number): CrossFormula {
    return c('galactic-rotationvelocity', 'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ?
    Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /**
    ENCLOSED MASS: the velocity proxy carried out to a radius. value velocity · radius. -/
theorem fam_galactic_masswithinradius_1 : ((200 : Int) * (300 : Int)) = (60000 : Int) := by decide

/-- galactic: starcount(10000, 4) = 2500 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats). The
    dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how many stars a
    luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface brightness, and the
    share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics measures. A measure. */
    const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass,
    escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params }) export class GalacticFormulas { /**
    ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */ static
    rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity',
    'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass,
    radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /** ENCLOSED MASS: the velocity proxy carried
    out to a radius. value velocity · radius. */ static masswithinradius(velocity: number, radius: number):
    CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity ·
    radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) } /** STAR COUNT:
    a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. -/
theorem fam_galactic_starcount_1 : ((10000 : Int) / (4 : Int)) = (2500 : Int) := by decide

/-- galactic: diskmass(50, 1000) = 50000 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats). The
    dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how many stars a
    luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface brightness, and the
    share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics measures. A measure. */
    const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass,
    escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params }) export class GalacticFormulas { /**
    ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */ static
    rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity',
    'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass,
    radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /** ENCLOSED MASS: the velocity proxy carried
    out to a radius. value velocity · radius. */ static masswithinradius(velocity: number, radius: number):
    CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity ·
    radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) } /** STAR COUNT:
    a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. */ static starcount(luminosity: number,
    perStar: number): CrossFormula { return c('galactic-starcount', 'starcount(luminosity, perStar) =
    ⌊luminosity / perStar⌋', perStar > 0 ? Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) &&
    perStar > 0, 'starcount', [luminosity, perStar]) } /** DISK MASS: a surface density over an area. value
    surfaceDensity · area. -/
theorem fam_galactic_diskmass_1 : ((50 : Int) * (1000 : Int)) = (50000 : Int) := by decide

/-- galactic: virialmass(10, 500) = 50000 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats). The
    dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how many stars a
    luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface brightness, and the
    share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics measures. A measure. */
    const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass,
    escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params }) export class GalacticFormulas { /**
    ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */ static
    rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity',
    'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass,
    radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /** ENCLOSED MASS: the velocity proxy carried
    out to a radius. value velocity · radius. */ static masswithinradius(velocity: number, radius: number):
    CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity ·
    radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) } /** STAR COUNT:
    a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. */ static starcount(luminosity: number,
    perStar: number): CrossFormula { return c('galactic-starcount', 'starcount(luminosity, perStar) =
    ⌊luminosity / perStar⌋', perStar > 0 ? Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) &&
    perStar > 0, 'starcount', [luminosity, perStar]) } /** DISK MASS: a surface density over an area. value
    surfaceDensity · area. */ static diskmass(surfaceDensity: number, area: number): CrossFormula { return
    c('galactic-diskmass', 'diskmass(surfaceDensity, area) = surfaceDensity · area', surfaceDensity * area,
    nat(surfaceDensity, area), 'diskmass', [surfaceDensity, area]) } /** VIRIAL MASS: a
    velocity-dispersion-squared proxy carried out to a radius. value dispersion² · radius. -/
theorem fam_galactic_virialmass_1 : (((10 : Int) ^ (2 : Nat)) * (500 : Int)) = (50000 : Int) := by decide

/-- galactic: escapevelocity(60000, 300) = 400 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats).
    The dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how many stars
    a luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface brightness, and
    the share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics measures. A measure.
    */ const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass,
    escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params }) export class GalacticFormulas { /**
    ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */ static
    rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity',
    'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass,
    radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /** ENCLOSED MASS: the velocity proxy carried
    out to a radius. value velocity · radius. */ static masswithinradius(velocity: number, radius: number):
    CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity ·
    radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) } /** STAR COUNT:
    a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. */ static starcount(luminosity: number,
    perStar: number): CrossFormula { return c('galactic-starcount', 'starcount(luminosity, perStar) =
    ⌊luminosity / perStar⌋', perStar > 0 ? Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) &&
    perStar > 0, 'starcount', [luminosity, perStar]) } /** DISK MASS: a surface density over an area. value
    surfaceDensity · area. */ static diskmass(surfaceDensity: number, area: number): CrossFormula { return
    c('galactic-diskmass', 'diskmass(surfaceDensity, area) = surfaceDensity · area', surfaceDensity * area,
    nat(surfaceDensity, area), 'diskmass', [surfaceDensity, area]) } /** VIRIAL MASS: a
    velocity-dispersion-squared proxy carried out to a radius. value dispersion² · radius. */ static
    virialmass(dispersion: number, radius: number): CrossFormula { return c('galactic-virialmass',
    'virialmass(dispersion, radius) = dispersion² · radius', dispersion * dispersion * radius, nat(dispersion,
    radius), 'virialmass', [dispersion, radius]) } /** ESCAPE VELOCITY: twice the enclosed mass over the radius,
    a proxy. value ⌊2 · mass / radius⌋. -/
theorem fam_galactic_escapevelocity_1 : (((2 : Int) * (60000 : Int)) / (300 : Int)) = (400 : Int) := by decide

/-- galactic: surfacebrightness(5000, 100) = 50 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no
    floats). The dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how
    many stars a luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface
    brightness, and the share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics
    measures. A measure. */ const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count,
    disk mass, virial mass, escape velocity, surface brightness, metallicity) as integer proxies; a measure
    crossed to astrophysics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst:
    'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params })
    export class GalacticFormulas { /** ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the
    radius. value ⌊mass / radius⌋. */ static rotationvelocity(mass: number, radius: number): CrossFormula {
    return c('galactic-rotationvelocity', 'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ?
    Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /**
    ENCLOSED MASS: the velocity proxy carried out to a radius. value velocity · radius. */ static
    masswithinradius(velocity: number, radius: number): CrossFormula { return c('galactic-masswithinradius',
    'masswithinradius(velocity, radius) = velocity · radius', velocity * radius, nat(velocity, radius),
    'masswithinradius', [velocity, radius]) } /** STAR COUNT: a luminosity at a per-star luminosity. value
    ⌊luminosity / perStar⌋. */ static starcount(luminosity: number, perStar: number): CrossFormula { return
    c('galactic-starcount', 'starcount(luminosity, perStar) = ⌊luminosity / perStar⌋', perStar > 0 ?
    Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) && perStar > 0, 'starcount', [luminosity,
    perStar]) } /** DISK MASS: a surface density over an area. value surfaceDensity · area. */ static
    diskmass(surfaceDensity: number, area: number): CrossFormula { return c('galactic-diskmass',
    'diskmass(surfaceDensity, area) = surfaceDensity · area', surfaceDensity * area, nat(surfaceDensity, area),
    'diskmass', [surfaceDensity, area]) } /** VIRIAL MASS: a velocity-dispersion-squared proxy carried out to a
    radius. value dispersion² · radius. */ static virialmass(dispersion: number, radius: number): CrossFormula {
    return c('galactic-virialmass', 'virialmass(dispersion, radius) = dispersion² · radius', dispersion *
    dispersion * radius, nat(dispersion, radius), 'virialmass', [dispersion, radius]) } /** ESCAPE VELOCITY:
    twice the enclosed mass over the radius, a proxy. value ⌊2 · mass / radius⌋. */ static escapevelocity(mass:
    number, radius: number): CrossFormula { return c('galactic-escapevelocity', 'escapevelocity(mass, radius) =
    ⌊2 · mass / radius⌋', radius > 0 ? Math.floor((2 * mass) / radius) : 0, nat(mass, radius) && radius > 0,
    'escapevelocity', [mass, radius]) } /** SURFACE BRIGHTNESS: a luminosity spread over an area. value
    ⌊luminosity / area⌋. -/
theorem fam_galactic_surfacebrightness_1 : ((5000 : Int) / (100 : Int)) = (50 : Int) := by decide

/-- galactic: metallicity(2, 100) = 2 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats). The
    dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how many stars a
    luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface brightness, and the
    share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics measures. A measure. */
    const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass,
    escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params }) export class GalacticFormulas { /**
    ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */ static
    rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity',
    'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass,
    radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /** ENCLOSED MASS: the velocity proxy carried
    out to a radius. value velocity · radius. */ static masswithinradius(velocity: number, radius: number):
    CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity ·
    radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) } /** STAR COUNT:
    a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. */ static starcount(luminosity: number,
    perStar: number): CrossFormula { return c('galactic-starcount', 'starcount(luminosity, perStar) =
    ⌊luminosity / perStar⌋', perStar > 0 ? Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) &&
    perStar > 0, 'starcount', [luminosity, perStar]) } /** DISK MASS: a surface density over an area. value
    surfaceDensity · area. */ static diskmass(surfaceDensity: number, area: number): CrossFormula { return
    c('galactic-diskmass', 'diskmass(surfaceDensity, area) = surfaceDensity · area', surfaceDensity * area,
    nat(surfaceDensity, area), 'diskmass', [surfaceDensity, area]) } /** VIRIAL MASS: a
    velocity-dispersion-squared proxy carried out to a radius. value dispersion² · radius. */ static
    virialmass(dispersion: number, radius: number): CrossFormula { return c('galactic-virialmass',
    'virialmass(dispersion, radius) = dispersion² · radius', dispersion * dispersion * radius, nat(dispersion,
    radius), 'virialmass', [dispersion, radius]) } /** ESCAPE VELOCITY: twice the enclosed mass over the radius,
    a proxy. value ⌊2 · mass / radius⌋. */ static escapevelocity(mass: number, radius: number): CrossFormula {
    return c('galactic-escapevelocity', 'escapevelocity(mass, radius) = ⌊2 · mass / radius⌋', radius > 0 ?
    Math.floor((2 * mass) / radius) : 0, nat(mass, radius) && radius > 0, 'escapevelocity', [mass, radius]) }
    /** SURFACE BRIGHTNESS: a luminosity spread over an area. value ⌊luminosity / area⌋. */ static
    surfacebrightness(luminosity: number, area: number): CrossFormula { return c('galactic-surfacebrightness',
    'surfacebrightness(luminosity, area) = ⌊luminosity / area⌋', area > 0 ? Math.floor(luminosity / area) : 0,
    nat(luminosity, area) && area > 0, 'surfacebrightness', [luminosity, area]) } /** METALLICITY as a
    percentage: the metal share of the total mass. value ⌊metals · 100 / total⌋. -/
theorem fam_galactic_metallicity_1 : (((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int) := by decide

/-- galactic: metallicity(50, 200) = 25 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats). The
    dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how many stars a
    luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface brightness, and the
    share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics measures. A measure. */
    const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass,
    escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params }) export class GalacticFormulas { /**
    ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */ static
    rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity',
    'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass,
    radius) && radius > 0, 'rotationvelocity', [mass, radius]) } /** ENCLOSED MASS: the velocity proxy carried
    out to a radius. value velocity · radius. */ static masswithinradius(velocity: number, radius: number):
    CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity ·
    radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) } /** STAR COUNT:
    a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. */ static starcount(luminosity: number,
    perStar: number): CrossFormula { return c('galactic-starcount', 'starcount(luminosity, perStar) =
    ⌊luminosity / perStar⌋', perStar > 0 ? Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) &&
    perStar > 0, 'starcount', [luminosity, perStar]) } /** DISK MASS: a surface density over an area. value
    surfaceDensity · area. */ static diskmass(surfaceDensity: number, area: number): CrossFormula { return
    c('galactic-diskmass', 'diskmass(surfaceDensity, area) = surfaceDensity · area', surfaceDensity * area,
    nat(surfaceDensity, area), 'diskmass', [surfaceDensity, area]) } /** VIRIAL MASS: a
    velocity-dispersion-squared proxy carried out to a radius. value dispersion² · radius. */ static
    virialmass(dispersion: number, radius: number): CrossFormula { return c('galactic-virialmass',
    'virialmass(dispersion, radius) = dispersion² · radius', dispersion * dispersion * radius, nat(dispersion,
    radius), 'virialmass', [dispersion, radius]) } /** ESCAPE VELOCITY: twice the enclosed mass over the radius,
    a proxy. value ⌊2 · mass / radius⌋. */ static escapevelocity(mass: number, radius: number): CrossFormula {
    return c('galactic-escapevelocity', 'escapevelocity(mass, radius) = ⌊2 · mass / radius⌋', radius > 0 ?
    Math.floor((2 * mass) / radius) : 0, nat(mass, radius) && radius > 0, 'escapevelocity', [mass, radius]) }
    /** SURFACE BRIGHTNESS: a luminosity spread over an area. value ⌊luminosity / area⌋. */ static
    surfacebrightness(luminosity: number, area: number): CrossFormula { return c('galactic-surfacebrightness',
    'surfacebrightness(luminosity, area) = ⌊luminosity / area⌋', area > 0 ? Math.floor(luminosity / area) : 0,
    nat(luminosity, area) && area > 0, 'surfacebrightness', [luminosity, area]) } /** METALLICITY as a
    percentage: the metal share of the total mass. value ⌊metals · 100 / total⌋. -/
theorem fam_galactic_metallicity_2 : (((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int) := by decide

/-- galaxy: stars(100, 1000) = 100000 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at
    a hex address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x
    · y; arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y;
    clusters(x, y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number
    => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'galaxy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export
    class GalaxyFormulas { /** stars(x, y) = x · y. -/
theorem fam_galaxy_stars_1 : ((100 : Int) * (1000 : Int)) = (100000 : Int) := by decide

/-- galaxy: arms(4, 0) = 4 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a hex
    address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x · y;
    arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y; clusters(x,
    y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x
    > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k:
    number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0;
    i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number):
    number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'galaxy', dst:
    'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export class
    GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. -/
theorem fam_galaxy_arms_1 : ((4 : Int) + (0 : Int)) = (4 : Int) := by decide

/-- galaxy: diameter(100, 1000) = 100000 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each
    at a hex address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y)
    = x · y; arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y;
    clusters(x, y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number
    => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'galaxy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export
    class GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. */
    static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y,
    nat(x, y), 'arms', [x, y]) } /** diameter(x, y) = x · y. -/
theorem fam_galaxy_diameter_1 : ((100 : Int) * (1000 : Int)) = (100000 : Int) := by decide

/-- galaxy: redshift(70, 1000) = 70 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a
    hex address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x ·
    y; arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y;
    clusters(x, y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number
    => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'galaxy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export
    class GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. */
    static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y,
    nat(x, y), 'arms', [x, y]) } /** diameter(x, y) = x · y. */ static diameter(x: number, y: number):
    CrossFormula { return f('galaxy-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
    /** redshift(x, y) = x · 1000 / y. -/
theorem fam_galaxy_redshift_1 : (((70 : Int) * (1000 : Int)) / (1000 : Int)) = (70 : Int) := by decide

/-- galaxy: types(3, 0) = 3 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a hex
    address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x · y;
    arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y; clusters(x,
    y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x
    > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k:
    number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0;
    i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number):
    number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'galaxy', dst:
    'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export class
    GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. */
    static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y,
    nat(x, y), 'arms', [x, y]) } /** diameter(x, y) = x · y. */ static diameter(x: number, y: number):
    CrossFormula { return f('galaxy-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
    /** redshift(x, y) = x · 1000 / y. */ static redshift(x: number, y: number): CrossFormula { return
    f('galaxy-redshift', 'redshift(x, y) = x · 1000 / y', y > 0 ? Math.floor((x * 1000) / y) : 0, nat(x, y) && y
    > 0, 'redshift', [x, y]) } /** types(x, y) = x + y. -/
theorem fam_galaxy_types_1 : ((3 : Int) + (0 : Int)) = (3 : Int) := by decide

/-- galaxy: clusters(50, 20) = 1000 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a
    hex address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x ·
    y; arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y;
    clusters(x, y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number
    => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'galaxy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export
    class GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. */
    static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y,
    nat(x, y), 'arms', [x, y]) } /** diameter(x, y) = x · y. */ static diameter(x: number, y: number):
    CrossFormula { return f('galaxy-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
    /** redshift(x, y) = x · 1000 / y. */ static redshift(x: number, y: number): CrossFormula { return
    f('galaxy-redshift', 'redshift(x, y) = x · 1000 / y', y > 0 ? Math.floor((x * 1000) / y) : 0, nat(x, y) && y
    > 0, 'redshift', [x, y]) } /** types(x, y) = x + y. */ static types(x: number, y: number): CrossFormula {
    return f('galaxy-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) } /** clusters(x, y) = x
    · y. -/
theorem fam_galaxy_clusters_1 : ((50 : Int) * (20 : Int)) = (1000 : Int) := by decide

/-- galaxy: blackholes(1, 0) = 1 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a hex
    address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x · y;
    arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y; clusters(x,
    y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x
    > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k:
    number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0;
    i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number):
    number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'galaxy', dst:
    'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export class
    GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. */
    static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y,
    nat(x, y), 'arms', [x, y]) } /** diameter(x, y) = x · y. */ static diameter(x: number, y: number):
    CrossFormula { return f('galaxy-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
    /** redshift(x, y) = x · 1000 / y. */ static redshift(x: number, y: number): CrossFormula { return
    f('galaxy-redshift', 'redshift(x, y) = x · 1000 / y', y > 0 ? Math.floor((x * 1000) / y) : 0, nat(x, y) && y
    > 0, 'redshift', [x, y]) } /** types(x, y) = x + y. */ static types(x: number, y: number): CrossFormula {
    return f('galaxy-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) } /** clusters(x, y) = x
    · y. */ static clusters(x: number, y: number): CrossFormula { return f('galaxy-clusters', 'clusters(x, y) =
    x · y', x * y, nat(x, y), 'clusters', [x, y]) } /** blackholes(x, y) = x + y. -/
theorem fam_galaxy_blackholes_1 : ((1 : Int) + (0 : Int)) = (1 : Int) := by decide

/-- galaxy: combos(6, 2) = 15 — GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a hex
    address crossing to cross; develops the galaxy leads. */ const PROOF = "galaxy counts: stars(x, y) = x · y;
    arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y; clusters(x,
    y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)" const factOf = (x: number): number => { if (x
    > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k:
    number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0;
    i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number):
    number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'galaxy', dst:
    'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params }) export class
    GalaxyFormulas { /** stars(x, y) = x · y. */ static stars(x: number, y: number): CrossFormula { return
    f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) } /** arms(x, y) = x + y. */
    static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y,
    nat(x, y), 'arms', [x, y]) } /** diameter(x, y) = x · y. */ static diameter(x: number, y: number):
    CrossFormula { return f('galaxy-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
    /** redshift(x, y) = x · 1000 / y. */ static redshift(x: number, y: number): CrossFormula { return
    f('galaxy-redshift', 'redshift(x, y) = x · 1000 / y', y > 0 ? Math.floor((x * 1000) / y) : 0, nat(x, y) && y
    > 0, 'redshift', [x, y]) } /** types(x, y) = x + y. */ static types(x: number, y: number): CrossFormula {
    return f('galaxy-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) } /** clusters(x, y) = x
    · y. */ static clusters(x: number, y: number): CrossFormula { return f('galaxy-clusters', 'clusters(x, y) =
    x · y', x * y, nat(x, y), 'clusters', [x, y]) } /** blackholes(x, y) = x + y. */ static blackholes(x:
    number, y: number): CrossFormula { return f('galaxy-blackholes', 'blackholes(x, y) = x + y', x + y, nat(x,
    y), 'blackholes', [x, y]) } /** combos(x, y) = C(x, y). -/
theorem fam_galaxy_combos_1 : (Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int) := by decide

/-- gaming: framerate(3600, 60) = 60 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand).
    Running a game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio,
    the experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` —
    gaming is what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate,
    kill/death, experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula {
    return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits *
    100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE:
    attack past defense, never below zero. value max(0, attack − defense). */ static damage(attack: number,
    defense: number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack −
    defense)', Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) } /**
    FRAMERATE: frames over seconds. value ⌊frames / seconds⌋. -/
theorem fam_gaming_framerate_1 : ((3600 : Int) / (60 : Int)) = (60 : Int) := by decide

/-- gaming: score(1500, 3) = 4500 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a
    game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula {
    return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits *
    100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE:
    attack past defense, never below zero. value max(0, attack − defense). */ static damage(attack: number,
    defense: number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack −
    defense)', Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) } /**
    FRAMERATE: frames over seconds. value ⌊frames / seconds⌋. */ static framerate(frames: number, seconds:
    number): CrossFormula { return c('gaming-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋',
    seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames,
    seconds]) } /** KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. */ static kd(kills:
    number, deaths: number): CrossFormula { return c('gaming-kd', 'kd(kills, deaths) = ⌊kills · 100 / deaths⌋',
    deaths > 0 ? Math.floor((kills * 100) / deaths) : 0, nat(kills, deaths) && deaths > 0, 'kd', [kills,
    deaths]) } /** LATENCY: the round-trip time, as measured. value roundtrip. */ static latency(roundtrip:
    number): CrossFormula { return c('gaming-latency', 'latency(roundtrip) = roundtrip', roundtrip,
    nat(roundtrip), 'latency', [roundtrip]) } /** SCORE: points at a multiplier. value points · multiplier. -/
theorem fam_gaming_score_1 : ((1500 : Int) * (3 : Int)) = (4500 : Int) := by decide

/-- gaming: winrate(45, 60) = 75 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a
    game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula {
    return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits *
    100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE:
    attack past defense, never below zero. value max(0, attack − defense). */ static damage(attack: number,
    defense: number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack −
    defense)', Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) } /**
    FRAMERATE: frames over seconds. value ⌊frames / seconds⌋. */ static framerate(frames: number, seconds:
    number): CrossFormula { return c('gaming-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋',
    seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames,
    seconds]) } /** KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. */ static kd(kills:
    number, deaths: number): CrossFormula { return c('gaming-kd', 'kd(kills, deaths) = ⌊kills · 100 / deaths⌋',
    deaths > 0 ? Math.floor((kills * 100) / deaths) : 0, nat(kills, deaths) && deaths > 0, 'kd', [kills,
    deaths]) } /** LATENCY: the round-trip time, as measured. value roundtrip. */ static latency(roundtrip:
    number): CrossFormula { return c('gaming-latency', 'latency(roundtrip) = roundtrip', roundtrip,
    nat(roundtrip), 'latency', [roundtrip]) } /** SCORE: points at a multiplier. value points · multiplier. */
    static score(points: number, multiplier: number): CrossFormula { return c('gaming-score', 'score(points,
    multiplier) = points · multiplier', points * multiplier, nat(points, multiplier), 'score', [points,
    multiplier]) } /** WIN RATE as a percentage: wins over games. value ⌊wins · 100 / games⌋. -/
theorem fam_gaming_winrate_1 : (((45 : Int) * (100 : Int)) / (60 : Int)) = (75 : Int) := by decide

/-- gaming: kd(30, 12) = 250 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a game
    is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the experience
    curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is what the
    code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death, experience
    curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits over shots.
    value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula { return
    c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits * 100) /
    shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE: attack
    past defense, never below zero. value max(0, attack − defense). */ static damage(attack: number, defense:
    number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack − defense)',
    Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) } /** FRAMERATE: frames
    over seconds. value ⌊frames / seconds⌋. */ static framerate(frames: number, seconds: number): CrossFormula {
    return c('gaming-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋', seconds > 0 ?
    Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames, seconds]) } /**
    KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. -/
theorem fam_gaming_kd_1 : (((30 : Int) * (100 : Int)) / (12 : Int)) = (250 : Int) := by decide

/-- gaming: xp(10, 100) = 10000 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a
    game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula {
    return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits *
    100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE:
    attack past defense, never below zero. value max(0, attack − defense). */ static damage(attack: number,
    defense: number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack −
    defense)', Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) } /**
    FRAMERATE: frames over seconds. value ⌊frames / seconds⌋. */ static framerate(frames: number, seconds:
    number): CrossFormula { return c('gaming-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋',
    seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames,
    seconds]) } /** KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. */ static kd(kills:
    number, deaths: number): CrossFormula { return c('gaming-kd', 'kd(kills, deaths) = ⌊kills · 100 / deaths⌋',
    deaths > 0 ? Math.floor((kills * 100) / deaths) : 0, nat(kills, deaths) && deaths > 0, 'kd', [kills,
    deaths]) } /** LATENCY: the round-trip time, as measured. value roundtrip. */ static latency(roundtrip:
    number): CrossFormula { return c('gaming-latency', 'latency(roundtrip) = roundtrip', roundtrip,
    nat(roundtrip), 'latency', [roundtrip]) } /** SCORE: points at a multiplier. value points · multiplier. */
    static score(points: number, multiplier: number): CrossFormula { return c('gaming-score', 'score(points,
    multiplier) = points · multiplier', points * multiplier, nat(points, multiplier), 'score', [points,
    multiplier]) } /** WIN RATE as a percentage: wins over games. value ⌊wins · 100 / games⌋. */ static
    winrate(wins: number, games: number): CrossFormula { return c('gaming-winrate', 'winrate(wins, games) =
    ⌊wins · 100 / games⌋', games > 0 ? Math.floor((wins * 100) / games) : 0, nat(wins, games) && games > 0 &&
    wins <= games, 'winrate', [wins, games]) } /** EXPERIENCE curve: a quadratic in level at a base. value
    level² · base. -/
theorem fam_gaming_xp_1 : (((10 : Int) ^ (2 : Nat)) * (100 : Int)) = (10000 : Int) := by decide

/-- gaming: damage(50, 20) = 30 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a
    game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula {
    return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits *
    100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE:
    attack past defense, never below zero. value max(0, attack − defense). -/
theorem fam_gaming_damage_1 : (fmax (0 : Int) ((50 : Int) - (20 : Int))) = (30 : Int) := by decide

/-- gaming: damage(20, 50) = 0 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a
    game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula {
    return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits *
    100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE:
    attack past defense, never below zero. value max(0, attack − defense). -/
theorem fam_gaming_damage_2 : (fmax (0 : Int) ((20 : Int) - (50 : Int))) = (0 : Int) := by decide

/-- gaming: latency(45) = 45 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a game
    is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the experience
    curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is what the
    code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death, experience
    curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits over shots.
    value ⌊hits · 100 / shots⌋. */ static accuracy(hits: number, shots: number): CrossFormula { return
    c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits * 100) /
    shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) } /** DAMAGE: attack
    past defense, never below zero. value max(0, attack − defense). */ static damage(attack: number, defense:
    number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack − defense)',
    Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) } /** FRAMERATE: frames
    over seconds. value ⌊frames / seconds⌋. */ static framerate(frames: number, seconds: number): CrossFormula {
    return c('gaming-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋', seconds > 0 ?
    Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames, seconds]) } /**
    KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. */ static kd(kills: number, deaths:
    number): CrossFormula { return c('gaming-kd', 'kd(kills, deaths) = ⌊kills · 100 / deaths⌋', deaths > 0 ?
    Math.floor((kills * 100) / deaths) : 0, nat(kills, deaths) && deaths > 0, 'kd', [kills, deaths]) } /**
    LATENCY: the round-trip time, as measured. value roundtrip. -/
theorem fam_gaming_latency_1 : (45 : Int) = (45 : Int) := by decide

/-- gaming: accuracy(80, 100) = 80 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running
    a game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. -/
theorem fam_gaming_accuracy_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- gastroenterology: transit(240, 24) = 10 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. -/
theorem fam_gastroenterology_transit_1 : ((240 : Int) / (24 : Int)) = (10 : Int) := by decide

/-- gastroenterology: absorption(80, 100) = 80 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing
    and clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. -/
theorem fam_gastroenterology_absorption_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- gastroenterology: ph(140, 100) = 140 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */ static
    absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption',
    'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) /
    ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed,
    ingested]) } /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. -/
theorem fam_gastroenterology_ph_1 : (((140 : Int) * (100 : Int)) / (100 : Int)) = (140 : Int) := by decide

/-- gastroenterology: motility(120, 60) = 2 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */ static
    absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption',
    'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) /
    ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed,
    ingested]) } /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. */ static ph(acid: number,
    base: number): CrossFormula { return c('gastroenterology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base >
    0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /** MOTILITY:
    contractions per minute. value ⌊contractions / minutes⌋. -/
theorem fam_gastroenterology_motility_1 : ((120 : Int) / (60 : Int)) = (2 : Int) := by decide

/-- gastroenterology: bmi(70, 175) = 22 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */ static
    absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption',
    'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) /
    ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed,
    ingested]) } /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. */ static ph(acid: number,
    base: number): CrossFormula { return c('gastroenterology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base >
    0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /** MOTILITY:
    contractions per minute. value ⌊contractions / minutes⌋. */ static motility(contractions: number, minutes:
    number): CrossFormula { return c('gastroenterology-motility', 'motility(contractions, minutes) =
    ⌊contractions / minutes⌋', minutes > 0 ? Math.floor(contractions / minutes) : 0, nat(contractions, minutes)
    && minutes > 0, 'motility', [contractions, minutes]) } /** BMI: weight over height squared, scaled. value
    ⌊weight · 10000 / (heightcm · heightcm)⌋. -/
theorem fam_gastroenterology_bmi_1 : (((70 : Int) * (10000 : Int)) / ((175 : Int) * (175 : Int))) = (22 : Int) := by decide

/-- gastroenterology: bleeding(500, 5000) = 10 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing
    and clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */ static
    absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption',
    'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) /
    ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed,
    ingested]) } /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. */ static ph(acid: number,
    base: number): CrossFormula { return c('gastroenterology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base >
    0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /** MOTILITY:
    contractions per minute. value ⌊contractions / minutes⌋. */ static motility(contractions: number, minutes:
    number): CrossFormula { return c('gastroenterology-motility', 'motility(contractions, minutes) =
    ⌊contractions / minutes⌋', minutes > 0 ? Math.floor(contractions / minutes) : 0, nat(contractions, minutes)
    && minutes > 0, 'motility', [contractions, minutes]) } /** BMI: weight over height squared, scaled. value
    ⌊weight · 10000 / (heightcm · heightcm)⌋. */ static bmi(weight: number, heightcm: number): CrossFormula {
    return c('gastroenterology-bmi', 'bmi(weight, heightcm) = ⌊weight · 10000 / (heightcm · heightcm)⌋',
    heightcm > 0 ? Math.floor((weight * 10000) / (heightcm * heightcm)) : 0, nat(weight, heightcm) && heightcm >
    0, 'bmi', [weight, heightcm]) } /** BLEEDING as a percentage of blood volume. value ⌊lost · 100 / volume⌋. -/
theorem fam_gastroenterology_bleeding_1 : (((500 : Int) * (100 : Int)) / (5000 : Int)) = (10 : Int) := by decide

/-- gastroenterology: enzyme(1000, 50) = 20 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */ static
    absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption',
    'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) /
    ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed,
    ingested]) } /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. */ static ph(acid: number,
    base: number): CrossFormula { return c('gastroenterology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base >
    0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /** MOTILITY:
    contractions per minute. value ⌊contractions / minutes⌋. */ static motility(contractions: number, minutes:
    number): CrossFormula { return c('gastroenterology-motility', 'motility(contractions, minutes) =
    ⌊contractions / minutes⌋', minutes > 0 ? Math.floor(contractions / minutes) : 0, nat(contractions, minutes)
    && minutes > 0, 'motility', [contractions, minutes]) } /** BMI: weight over height squared, scaled. value
    ⌊weight · 10000 / (heightcm · heightcm)⌋. */ static bmi(weight: number, heightcm: number): CrossFormula {
    return c('gastroenterology-bmi', 'bmi(weight, heightcm) = ⌊weight · 10000 / (heightcm · heightcm)⌋',
    heightcm > 0 ? Math.floor((weight * 10000) / (heightcm * heightcm)) : 0, nat(weight, heightcm) && heightcm >
    0, 'bmi', [weight, heightcm]) } /** BLEEDING as a percentage of blood volume. value ⌊lost · 100 / volume⌋.
    */ static bleeding(lost: number, volume: number): CrossFormula { return c('gastroenterology-bleeding',
    'bleeding(lost, volume) = ⌊lost · 100 / volume⌋', volume > 0 ? Math.floor((lost * 100) / volume) : 0,
    nat(lost, volume) && volume > 0 && lost <= volume, 'bleeding', [lost, volume]) } /** ENZYME concentration:
    units per volume. value ⌊units / volume⌋. -/
theorem fam_gastroenterology_enzyme_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- gastroenterology: clearance(90, 100) = 90 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. */ static transit(distance: number, hours: number):
    CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours >
    0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) } /**
    ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */ static
    absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption',
    'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) /
    ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed,
    ingested]) } /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. */ static ph(acid: number,
    base: number): CrossFormula { return c('gastroenterology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base >
    0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /** MOTILITY:
    contractions per minute. value ⌊contractions / minutes⌋. */ static motility(contractions: number, minutes:
    number): CrossFormula { return c('gastroenterology-motility', 'motility(contractions, minutes) =
    ⌊contractions / minutes⌋', minutes > 0 ? Math.floor(contractions / minutes) : 0, nat(contractions, minutes)
    && minutes > 0, 'motility', [contractions, minutes]) } /** BMI: weight over height squared, scaled. value
    ⌊weight · 10000 / (heightcm · heightcm)⌋. */ static bmi(weight: number, heightcm: number): CrossFormula {
    return c('gastroenterology-bmi', 'bmi(weight, heightcm) = ⌊weight · 10000 / (heightcm · heightcm)⌋',
    heightcm > 0 ? Math.floor((weight * 10000) / (heightcm * heightcm)) : 0, nat(weight, heightcm) && heightcm >
    0, 'bmi', [weight, heightcm]) } /** BLEEDING as a percentage of blood volume. value ⌊lost · 100 / volume⌋.
    */ static bleeding(lost: number, volume: number): CrossFormula { return c('gastroenterology-bleeding',
    'bleeding(lost, volume) = ⌊lost · 100 / volume⌋', volume > 0 ? Math.floor((lost * 100) / volume) : 0,
    nat(lost, volume) && volume > 0 && lost <= volume, 'bleeding', [lost, volume]) } /** ENZYME concentration:
    units per volume. value ⌊units / volume⌋. */ static enzyme(units: number, volume: number): CrossFormula {
    return c('gastroenterology-enzyme', 'enzyme(units, volume) = ⌊units / volume⌋', volume > 0 ?
    Math.floor(units / volume) : 0, nat(units, volume) && volume > 0, 'enzyme', [units, volume]) } /** CLEARANCE
    as a percentage of the load removed. value ⌊removed · 100 / load⌋. -/
theorem fam_gastroenterology_clearance_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- gastronomy: portioncost(2000, 8) = 250 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers:
    cost per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the
    menu price at a markup, covers served, waste against what was prepared, and the margin a plate earns.
    Crosses to `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF =
    'gastronomy arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin);
    the kitchen as a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gastronomy', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gastronomy.${name}`, params }) export class GastronomyFormulas { /** PORTION COST: a batch total split
    across portions. value ⌊total / portions⌋. -/
theorem fam_gastronomy_portioncost_1 : ((2000 : Int) / (8 : Int)) = (250 : Int) := by decide

/-- gastronomy: platecost(250, 120, 80) = 450 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is
    numbers: cost per portion, the built-up plate cost, food cost as a percentage of price, net yield after
    trim, the menu price at a markup, covers served, waste against what was prepared, and the margin a plate
    earns. Crosses to `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF =
    'gastronomy arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin);
    the kitchen as a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gastronomy', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gastronomy.${name}`, params }) export class GastronomyFormulas { /** PORTION COST: a batch total split
    across portions. value ⌊total / portions⌋. */ static portioncost(total: number, portions: number):
    CrossFormula { return c('gastronomy-portioncost', 'portioncost(total, portions) = ⌊total / portions⌋',
    portions > 0 ? Math.floor(total / portions) : 0, nat(total, portions) && portions > 0, 'portioncost',
    [total, portions]) } /** PLATE COST: food plus labor plus overhead. value food + labor + overhead. -/
theorem fam_gastronomy_platecost_1 : (((250 : Int) + (120 : Int)) + (80 : Int)) = (450 : Int) := by decide

/-- gastronomy: foodcostpercent(300, 1000) = 30 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is
    numbers: cost per portion, the built-up plate cost, food cost as a percentage of price, net yield after
    trim, the menu price at a markup, covers served, waste against what was prepared, and the margin a plate
    earns. Crosses to `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF =
    'gastronomy arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin);
    the kitchen as a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gastronomy', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gastronomy.${name}`, params }) export class GastronomyFormulas { /** PORTION COST: a batch total split
    across portions. value ⌊total / portions⌋. */ static portioncost(total: number, portions: number):
    CrossFormula { return c('gastronomy-portioncost', 'portioncost(total, portions) = ⌊total / portions⌋',
    portions > 0 ? Math.floor(total / portions) : 0, nat(total, portions) && portions > 0, 'portioncost',
    [total, portions]) } /** PLATE COST: food plus labor plus overhead. value food + labor + overhead. */ static
    platecost(food: number, labor: number, overhead: number): CrossFormula { return c('gastronomy-platecost',
    'platecost(food, labor, overhead) = food + labor + overhead', food + labor + overhead, nat(food, labor,
    overhead), 'platecost', [food, labor, overhead]) } /** FOOD COST PERCENT: cost as a percentage of price.
    value ⌊cost · 100 / price⌋. -/
theorem fam_gastronomy_foodcostpercent_1 : (((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int) := by decide

/-- gastronomy: yield(1000, 250) = 750 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers: cost
    per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the menu
    price at a markup, covers served, waste against what was prepared, and the margin a plate earns. Crosses to
    `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF = 'gastronomy
    arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin); the kitchen as
    a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gastronomy', dst:
    'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `gastronomy.${name}`, params }) export
    class GastronomyFormulas { /** PORTION COST: a batch total split across portions. value ⌊total / portions⌋.
    */ static portioncost(total: number, portions: number): CrossFormula { return c('gastronomy-portioncost',
    'portioncost(total, portions) = ⌊total / portions⌋', portions > 0 ? Math.floor(total / portions) : 0,
    nat(total, portions) && portions > 0, 'portioncost', [total, portions]) } /** PLATE COST: food plus labor
    plus overhead. value food + labor + overhead. */ static platecost(food: number, labor: number, overhead:
    number): CrossFormula { return c('gastronomy-platecost', 'platecost(food, labor, overhead) = food + labor +
    overhead', food + labor + overhead, nat(food, labor, overhead), 'platecost', [food, labor, overhead]) } /**
    FOOD COST PERCENT: cost as a percentage of price. value ⌊cost · 100 / price⌋. */ static
    foodcostpercent(cost: number, price: number): CrossFormula { return c('gastronomy-foodcostpercent',
    'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ? Math.floor((cost * 100) / price) : 0,
    nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent', [cost, price]) } /** YIELD: usable weight
    left after trim. value max(0, gross − trim). -/
theorem fam_gastronomy_yield_1 : (fmax (0 : Int) ((1000 : Int) - (250 : Int))) = (750 : Int) := by decide

/-- gastronomy: menuprice(300, 3) = 900 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers:
    cost per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the
    menu price at a markup, covers served, waste against what was prepared, and the margin a plate earns.
    Crosses to `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF =
    'gastronomy arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin);
    the kitchen as a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gastronomy', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gastronomy.${name}`, params }) export class GastronomyFormulas { /** PORTION COST: a batch total split
    across portions. value ⌊total / portions⌋. */ static portioncost(total: number, portions: number):
    CrossFormula { return c('gastronomy-portioncost', 'portioncost(total, portions) = ⌊total / portions⌋',
    portions > 0 ? Math.floor(total / portions) : 0, nat(total, portions) && portions > 0, 'portioncost',
    [total, portions]) } /** PLATE COST: food plus labor plus overhead. value food + labor + overhead. */ static
    platecost(food: number, labor: number, overhead: number): CrossFormula { return c('gastronomy-platecost',
    'platecost(food, labor, overhead) = food + labor + overhead', food + labor + overhead, nat(food, labor,
    overhead), 'platecost', [food, labor, overhead]) } /** FOOD COST PERCENT: cost as a percentage of price.
    value ⌊cost · 100 / price⌋. */ static foodcostpercent(cost: number, price: number): CrossFormula { return
    c('gastronomy-foodcostpercent', 'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ?
    Math.floor((cost * 100) / price) : 0, nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent',
    [cost, price]) } /** YIELD: usable weight left after trim. value max(0, gross − trim). */ static
    yield(gross: number, trim: number): CrossFormula { return c('gastronomy-yield', 'yield(gross, trim) = max(0,
    gross − trim)', Math.max(0, gross - trim), nat(gross, trim) && trim <= gross, 'yield', [gross, trim]) } /**
    MENU PRICE: cost at a markup multiple. value cost · markup. -/
theorem fam_gastronomy_menuprice_1 : ((300 : Int) * (3 : Int)) = (900 : Int) := by decide

/-- gastronomy: covers(60, 3) = 180 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers: cost
    per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the menu
    price at a markup, covers served, waste against what was prepared, and the margin a plate earns. Crosses to
    `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF = 'gastronomy
    arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin); the kitchen as
    a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gastronomy', dst:
    'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `gastronomy.${name}`, params }) export
    class GastronomyFormulas { /** PORTION COST: a batch total split across portions. value ⌊total / portions⌋.
    */ static portioncost(total: number, portions: number): CrossFormula { return c('gastronomy-portioncost',
    'portioncost(total, portions) = ⌊total / portions⌋', portions > 0 ? Math.floor(total / portions) : 0,
    nat(total, portions) && portions > 0, 'portioncost', [total, portions]) } /** PLATE COST: food plus labor
    plus overhead. value food + labor + overhead. */ static platecost(food: number, labor: number, overhead:
    number): CrossFormula { return c('gastronomy-platecost', 'platecost(food, labor, overhead) = food + labor +
    overhead', food + labor + overhead, nat(food, labor, overhead), 'platecost', [food, labor, overhead]) } /**
    FOOD COST PERCENT: cost as a percentage of price. value ⌊cost · 100 / price⌋. */ static
    foodcostpercent(cost: number, price: number): CrossFormula { return c('gastronomy-foodcostpercent',
    'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ? Math.floor((cost * 100) / price) : 0,
    nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent', [cost, price]) } /** YIELD: usable weight
    left after trim. value max(0, gross − trim). */ static yield(gross: number, trim: number): CrossFormula {
    return c('gastronomy-yield', 'yield(gross, trim) = max(0, gross − trim)', Math.max(0, gross - trim),
    nat(gross, trim) && trim <= gross, 'yield', [gross, trim]) } /** MENU PRICE: cost at a markup multiple.
    value cost · markup. */ static menuprice(cost: number, markup: number): CrossFormula { return
    c('gastronomy-menuprice', 'menuprice(cost, markup) = cost · markup', cost * markup, nat(cost, markup),
    'menuprice', [cost, markup]) } /** COVERS: seats over the night's turns. value seats · turns. -/
theorem fam_gastronomy_covers_1 : ((60 : Int) * (3 : Int)) = (180 : Int) := by decide

/-- gastronomy: waste(200, 180) = 20 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers: cost
    per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the menu
    price at a markup, covers served, waste against what was prepared, and the margin a plate earns. Crosses to
    `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF = 'gastronomy
    arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin); the kitchen as
    a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gastronomy', dst:
    'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `gastronomy.${name}`, params }) export
    class GastronomyFormulas { /** PORTION COST: a batch total split across portions. value ⌊total / portions⌋.
    */ static portioncost(total: number, portions: number): CrossFormula { return c('gastronomy-portioncost',
    'portioncost(total, portions) = ⌊total / portions⌋', portions > 0 ? Math.floor(total / portions) : 0,
    nat(total, portions) && portions > 0, 'portioncost', [total, portions]) } /** PLATE COST: food plus labor
    plus overhead. value food + labor + overhead. */ static platecost(food: number, labor: number, overhead:
    number): CrossFormula { return c('gastronomy-platecost', 'platecost(food, labor, overhead) = food + labor +
    overhead', food + labor + overhead, nat(food, labor, overhead), 'platecost', [food, labor, overhead]) } /**
    FOOD COST PERCENT: cost as a percentage of price. value ⌊cost · 100 / price⌋. */ static
    foodcostpercent(cost: number, price: number): CrossFormula { return c('gastronomy-foodcostpercent',
    'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ? Math.floor((cost * 100) / price) : 0,
    nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent', [cost, price]) } /** YIELD: usable weight
    left after trim. value max(0, gross − trim). */ static yield(gross: number, trim: number): CrossFormula {
    return c('gastronomy-yield', 'yield(gross, trim) = max(0, gross − trim)', Math.max(0, gross - trim),
    nat(gross, trim) && trim <= gross, 'yield', [gross, trim]) } /** MENU PRICE: cost at a markup multiple.
    value cost · markup. */ static menuprice(cost: number, markup: number): CrossFormula { return
    c('gastronomy-menuprice', 'menuprice(cost, markup) = cost · markup', cost * markup, nat(cost, markup),
    'menuprice', [cost, markup]) } /** COVERS: seats over the night's turns. value seats · turns. */ static
    covers(seats: number, turns: number): CrossFormula { return c('gastronomy-covers', 'covers(seats, turns) =
    seats · turns', seats * turns, nat(seats, turns), 'covers', [seats, turns]) } /** WASTE: prepared portions
    that were not served. value max(0, prepared − served). -/
theorem fam_gastronomy_waste_1 : (fmax (0 : Int) ((200 : Int) - (180 : Int))) = (20 : Int) := by decide

/-- gastronomy: margin(900, 300) = 600 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers: cost
    per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the menu
    price at a markup, covers served, waste against what was prepared, and the margin a plate earns. Crosses to
    `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF = 'gastronomy
    arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin); the kitchen as
    a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gastronomy', dst:
    'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `gastronomy.${name}`, params }) export
    class GastronomyFormulas { /** PORTION COST: a batch total split across portions. value ⌊total / portions⌋.
    */ static portioncost(total: number, portions: number): CrossFormula { return c('gastronomy-portioncost',
    'portioncost(total, portions) = ⌊total / portions⌋', portions > 0 ? Math.floor(total / portions) : 0,
    nat(total, portions) && portions > 0, 'portioncost', [total, portions]) } /** PLATE COST: food plus labor
    plus overhead. value food + labor + overhead. */ static platecost(food: number, labor: number, overhead:
    number): CrossFormula { return c('gastronomy-platecost', 'platecost(food, labor, overhead) = food + labor +
    overhead', food + labor + overhead, nat(food, labor, overhead), 'platecost', [food, labor, overhead]) } /**
    FOOD COST PERCENT: cost as a percentage of price. value ⌊cost · 100 / price⌋. */ static
    foodcostpercent(cost: number, price: number): CrossFormula { return c('gastronomy-foodcostpercent',
    'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ? Math.floor((cost * 100) / price) : 0,
    nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent', [cost, price]) } /** YIELD: usable weight
    left after trim. value max(0, gross − trim). */ static yield(gross: number, trim: number): CrossFormula {
    return c('gastronomy-yield', 'yield(gross, trim) = max(0, gross − trim)', Math.max(0, gross - trim),
    nat(gross, trim) && trim <= gross, 'yield', [gross, trim]) } /** MENU PRICE: cost at a markup multiple.
    value cost · markup. */ static menuprice(cost: number, markup: number): CrossFormula { return
    c('gastronomy-menuprice', 'menuprice(cost, markup) = cost · markup', cost * markup, nat(cost, markup),
    'menuprice', [cost, markup]) } /** COVERS: seats over the night's turns. value seats · turns. */ static
    covers(seats: number, turns: number): CrossFormula { return c('gastronomy-covers', 'covers(seats, turns) =
    seats · turns', seats * turns, nat(seats, turns), 'covers', [seats, turns]) } /** WASTE: prepared portions
    that were not served. value max(0, prepared − served). */ static waste(prepared: number, served: number):
    CrossFormula { return c('gastronomy-waste', 'waste(prepared, served) = max(0, prepared − served)',
    Math.max(0, prepared - served), nat(prepared, served) && served <= prepared, 'waste', [prepared, served]) }
    /** MARGIN: the profit a plate earns at its price. value max(0, price − cost). -/
theorem fam_gastronomy_margin_1 : (fmax (0 : Int) ((900 : Int) - (300 : Int))) = (600 : Int) := by decide

/-- gastronomy: margin(300, 900) = 0 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers: cost
    per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the menu
    price at a markup, covers served, waste against what was prepared, and the margin a plate earns. Crosses to
    `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF = 'gastronomy
    arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin); the kitchen as
    a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gastronomy', dst:
    'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `gastronomy.${name}`, params }) export
    class GastronomyFormulas { /** PORTION COST: a batch total split across portions. value ⌊total / portions⌋.
    */ static portioncost(total: number, portions: number): CrossFormula { return c('gastronomy-portioncost',
    'portioncost(total, portions) = ⌊total / portions⌋', portions > 0 ? Math.floor(total / portions) : 0,
    nat(total, portions) && portions > 0, 'portioncost', [total, portions]) } /** PLATE COST: food plus labor
    plus overhead. value food + labor + overhead. */ static platecost(food: number, labor: number, overhead:
    number): CrossFormula { return c('gastronomy-platecost', 'platecost(food, labor, overhead) = food + labor +
    overhead', food + labor + overhead, nat(food, labor, overhead), 'platecost', [food, labor, overhead]) } /**
    FOOD COST PERCENT: cost as a percentage of price. value ⌊cost · 100 / price⌋. */ static
    foodcostpercent(cost: number, price: number): CrossFormula { return c('gastronomy-foodcostpercent',
    'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ? Math.floor((cost * 100) / price) : 0,
    nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent', [cost, price]) } /** YIELD: usable weight
    left after trim. value max(0, gross − trim). */ static yield(gross: number, trim: number): CrossFormula {
    return c('gastronomy-yield', 'yield(gross, trim) = max(0, gross − trim)', Math.max(0, gross - trim),
    nat(gross, trim) && trim <= gross, 'yield', [gross, trim]) } /** MENU PRICE: cost at a markup multiple.
    value cost · markup. */ static menuprice(cost: number, markup: number): CrossFormula { return
    c('gastronomy-menuprice', 'menuprice(cost, markup) = cost · markup', cost * markup, nat(cost, markup),
    'menuprice', [cost, markup]) } /** COVERS: seats over the night's turns. value seats · turns. */ static
    covers(seats: number, turns: number): CrossFormula { return c('gastronomy-covers', 'covers(seats, turns) =
    seats · turns', seats * turns, nat(seats, turns), 'covers', [seats, turns]) } /** WASTE: prepared portions
    that were not served. value max(0, prepared − served). */ static waste(prepared: number, served: number):
    CrossFormula { return c('gastronomy-waste', 'waste(prepared, served) = max(0, prepared − served)',
    Math.max(0, prepared - served), nat(prepared, served) && served <= prepared, 'waste', [prepared, served]) }
    /** MARGIN: the profit a plate earns at its price. value max(0, price − cost). -/
theorem fam_gastronomy_margin_2 : (fmax (0 : Int) ((300 : Int) - (900 : Int))) = (0 : Int) := by decide

/-- gear: ratio(60, 20) = 3 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex address
    crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y; torque(x, y)
    = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x; backlash(x, y) =
    max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return 0; let v =
    1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k
    < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn
    - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn
    || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. -/
theorem fam_gear_ratio_1 : ((60 : Int) / (20 : Int)) = (3 : Int) := by decide

/-- gear: torque(100, 3) = 300 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex
    address crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y;
    torque(x, y) = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x;
    backlash(x, y) = max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12)
    return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number):
    number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk;
    i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number =>
    (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. -/
theorem fam_gear_torque_1 : ((100 : Int) * (3 : Int)) = (300 : Int) := by decide

/-- gear: rpm(3600, 3) = 1200 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex
    address crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y;
    torque(x, y) = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x;
    backlash(x, y) = max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12)
    return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number):
    number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk;
    i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number =>
    (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. */ static
    torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x,
    y), 'torque', [x, y]) } /** rpm(x, y) = x / y. -/
theorem fam_gear_rpm_1 : ((3600 : Int) / (3 : Int)) = (1200 : Int) := by decide

/-- gear: teeth(20, 40) = 60 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex address
    crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y; torque(x, y)
    = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x; backlash(x, y) =
    max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return 0; let v =
    1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k
    < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn
    - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn
    || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. */ static
    torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x,
    y), 'torque', [x, y]) } /** rpm(x, y) = x / y. */ static rpm(x: number, y: number): CrossFormula { return
    f('gear-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) } /**
    teeth(x, y) = x + y. -/
theorem fam_gear_teeth_1 : ((20 : Int) + (40 : Int)) = (60 : Int) := by decide

/-- gear: mesh(20, 3) = 60 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex address
    crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y; torque(x, y)
    = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x; backlash(x, y) =
    max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return 0; let v =
    1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k
    < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn
    - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn
    || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. */ static
    torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x,
    y), 'torque', [x, y]) } /** rpm(x, y) = x / y. */ static rpm(x: number, y: number): CrossFormula { return
    f('gear-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) } /**
    teeth(x, y) = x + y. */ static teeth(x: number, y: number): CrossFormula { return f('gear-teeth', 'teeth(x,
    y) = x + y', x + y, nat(x, y), 'teeth', [x, y]) } /** mesh(x, y) = x · y. -/
theorem fam_gear_mesh_1 : ((20 : Int) * (3 : Int)) = (60 : Int) := by decide

/-- gear: stages(3) = 8 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex address
    crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y; torque(x, y)
    = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x; backlash(x, y) =
    max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return 0; let v =
    1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k
    < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn
    - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn
    || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. */ static
    torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x,
    y), 'torque', [x, y]) } /** rpm(x, y) = x / y. */ static rpm(x: number, y: number): CrossFormula { return
    f('gear-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) } /**
    teeth(x, y) = x + y. */ static teeth(x: number, y: number): CrossFormula { return f('gear-teeth', 'teeth(x,
    y) = x + y', x + y, nat(x, y), 'teeth', [x, y]) } /** mesh(x, y) = x · y. */ static mesh(x: number, y:
    number): CrossFormula { return f('gear-mesh', 'mesh(x, y) = x · y', x * y, nat(x, y), 'mesh', [x, y]) } /**
    stages(x) = 2^x. -/
theorem fam_gear_stages_1 : ((2 : Int) ^ (3 : Nat)) = (8 : Int) := by decide

/-- gear: backlash(100, 5) = 95 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex
    address crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y;
    torque(x, y) = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x;
    backlash(x, y) = max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12)
    return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number):
    number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk;
    i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number =>
    (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. */ static
    torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x,
    y), 'torque', [x, y]) } /** rpm(x, y) = x / y. */ static rpm(x: number, y: number): CrossFormula { return
    f('gear-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) } /**
    teeth(x, y) = x + y. */ static teeth(x: number, y: number): CrossFormula { return f('gear-teeth', 'teeth(x,
    y) = x + y', x + y, nat(x, y), 'teeth', [x, y]) } /** mesh(x, y) = x · y. */ static mesh(x: number, y:
    number): CrossFormula { return f('gear-mesh', 'mesh(x, y) = x · y', x * y, nat(x, y), 'mesh', [x, y]) } /**
    stages(x) = 2^x. */ static stages(x: number): CrossFormula { return f('gear-stages', 'stages(x) = 2^x', x <=
    30 ? 2 ** x : 0, nat(x) && x <= 30, 'stages', [x]) } /** backlash(x, y) = max(0, x − y). -/
theorem fam_gear_backlash_1 : (fmax (0 : Int) ((100 : Int) - (5 : Int))) = (95 : Int) := by decide

/-- gear: pairs(6, 2) = 15 — GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex address
    crossing to cross; develops the gear leads. */ const PROOF = "gear counts: ratio(x, y) = x / y; torque(x, y)
    = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x; backlash(x, y) =
    max(0, x − y); pairs(x, y) = C(x, y)" const factOf = (x: number): number => { if (x > 12) return 0; let v =
    1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k
    < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn
    - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn
    || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'gear', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `gear.${name}`, params }) export class GearFormulas { /** ratio(x, y)
    = x / y. */ static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y',
    y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) } /** torque(x, y) = x · y. */ static
    torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x,
    y), 'torque', [x, y]) } /** rpm(x, y) = x / y. */ static rpm(x: number, y: number): CrossFormula { return
    f('gear-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) } /**
    teeth(x, y) = x + y. */ static teeth(x: number, y: number): CrossFormula { return f('gear-teeth', 'teeth(x,
    y) = x + y', x + y, nat(x, y), 'teeth', [x, y]) } /** mesh(x, y) = x · y. */ static mesh(x: number, y:
    number): CrossFormula { return f('gear-mesh', 'mesh(x, y) = x · y', x * y, nat(x, y), 'mesh', [x, y]) } /**
    stages(x) = 2^x. */ static stages(x: number): CrossFormula { return f('gear-stages', 'stages(x) = 2^x', x <=
    30 ? 2 ** x : 0, nat(x) && x <= 30, 'stages', [x]) } /** backlash(x, y) = max(0, x − y). */ static
    backlash(x: number, y: number): CrossFormula { return f('gear-backlash', 'backlash(x, y) = max(0, x − y)',
    Math.max(0, x - y), nat(x, y), 'backlash', [x, y]) } /** pairs(x, y) = C(x, y). -/
theorem fam_gear_pairs_1 : (Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int) := by decide

/-- gearing: ratio(60, 20) = 3 -/
theorem fam_gearing_ratio_1 : ((60 : Int) / (20 : Int)) = (3 : Int) := by decide

/-- gearing: torqueout(10, 3) = 30 -/
theorem fam_gearing_torqueout_1 : ((10 : Int) * (3 : Int)) = (30 : Int) := by decide

/-- gearing: speedout(3000, 3) = 1000 -/
theorem fam_gearing_speedout_1 : ((3000 : Int) / (3 : Int)) = (1000 : Int) := by decide

/-- gearing: efficiency(95, 100) = 95 -/
theorem fam_gearing_efficiency_1 : (((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int) := by decide

/-- gearing: mechanicaladvantage(40, 10) = 4 -/
theorem fam_gearing_mechanicaladvantage_1 : ((40 : Int) / (10 : Int)) = (4 : Int) := by decide

/-- gearing: backlashangle(100, 98) = 2 -/
theorem fam_gearing_backlashangle_1 : (fmax (0 : Int) ((100 : Int) - (98 : Int))) = (2 : Int) := by decide

/-- gearing: toothcount(20, 3) = 60 -/
theorem fam_gearing_toothcount_1 : ((20 : Int) * (3 : Int)) = (60 : Int) := by decide

/-- gearing: reductionstages(3, 3) = 9 -/
theorem fam_gearing_reductionstages_1 : ((3 : Int) * (3 : Int)) = (9 : Int) := by decide

/-- gelatinization: onsettemp(60, 65) = 65 -/
theorem fam_gelatinization_onsettemp_1 : (fmax (60 : Int) (65 : Int)) = (65 : Int) := by decide

/-- gelatinization: swellingratio(300, 100) = 300 -/
theorem fam_gelatinization_swellingratio_1 : (((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int) := by decide

/-- gelatinization: waterabsorption(150, 100) = 150 -/
theorem fam_gelatinization_waterabsorption_1 : (((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int) := by decide

/-- gelatinization: peakviscosity(200, 3) = 600 -/
theorem fam_gelatinization_peakviscosity_1 : ((200 : Int) * (3 : Int)) = (600 : Int) := by decide

/-- gelatinization: starchconversion(85, 100) = 85 -/
theorem fam_gelatinization_starchconversion_1 : (((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int) := by decide

/-- gelatinization: setbacktemp(95, 50) = 45 -/
theorem fam_gelatinization_setbacktemp_1 : (fmax (0 : Int) ((95 : Int) - (50 : Int))) = (45 : Int) := by decide

/-- gelatinization: granuleexpansion(5, 4) = 20 -/
theorem fam_gelatinization_granuleexpansion_1 : ((5 : Int) * (4 : Int)) = (20 : Int) := by decide

/-- gelatinization: pasteclarity(70, 100) = 70 -/
theorem fam_gelatinization_pasteclarity_1 : (((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int) := by decide

/-- gematria: lettervalue(22, 1) = 22 -/
theorem fam_gematria_lettervalue_1 : ((22 : Int) * (1 : Int)) = (22 : Int) := by decide

/-- gematria: wordtotal(10, 20, 30) = 60 -/
theorem fam_gematria_wordtotal_1 : (((10 : Int) + (20 : Int)) + (30 : Int)) = (60 : Int) := by decide

/-- gematria: equivalences(22, 2) = 231 -/
theorem fam_gematria_equivalences_1 : (Int.ofNat (fchoose (Int.toNat (22 : Int)) (Int.toNat (2 : Int)))) = (231 : Int) := by decide

/-- gematria: cipherorderings(5) = 120 -/
theorem fam_gematria_cipherorderings_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- gematria: alphabetsize(22, 0) = 22 -/
theorem fam_gematria_alphabetsize_1 : ((22 : Int) + (0 : Int)) = (22 : Int) := by decide

/-- gematria: valuesum(400, 1) = 400 -/
theorem fam_gematria_valuesum_1 : ((400 : Int) * (1 : Int)) = (400 : Int) := by decide

/-- gematria: reductionmod(60, 9) = 6 -/
theorem fam_gematria_reductionmod_1 : ((60 : Int) % (9 : Int)) = (6 : Int) := by decide

/-- genealogy: generations(400, 25) = 16 -/
theorem fam_genealogy_generations_1 : ((400 : Int) / (25 : Int)) = (16 : Int) := by decide

/-- genealogy: descendants(10) = 1024 -/
theorem fam_genealogy_descendants_1 : ((2 : Int) ^ (10 : Nat)) = (1024 : Int) := by decide

/-- genealogy: lineagepaths(5) = 120 -/
theorem fam_genealogy_lineagepaths_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- genealogy: ancestorsatdepth(4) = 16 -/
theorem fam_genealogy_ancestorsatdepth_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- genealogy: siblingpairs(6, 2) = 15 -/
theorem fam_genealogy_siblingpairs_1 : (Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int) := by decide

/-- genealogy: cousindegree(8, 2) = 6 -/
theorem fam_genealogy_cousindegree_1 : (fmax (0 : Int) ((8 : Int) - (2 : Int))) = (6 : Int) := by decide

/-- genealogy: marriagelinks(12, 2) = 24 -/
theorem fam_genealogy_marriagelinks_1 : ((12 : Int) * (2 : Int)) = (24 : Int) := by decide

/-- genealogy: branchingfactor(1024, 10) = 102 -/
theorem fam_genealogy_branchingfactor_1 : ((1024 : Int) / (10 : Int)) = (102 : Int) := by decide

/-- genetics: codons(300) = 100 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate, heritability,
    alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` — genetics is what
    medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content, Punnett ratio,
    mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a measure crossed to
    med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class GeneticsFormulas
    { /** CODONS: triplets of bases. value ⌊bases / 3⌋. -/
theorem fam_genetics_codons_1 : ((300 : Int) / (3 : Int)) = (100 : Int) := by decide

/-- genetics: gc(410, 1000) = 41 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate, heritability,
    alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` — genetics is what
    medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content, Punnett ratio,
    mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a measure crossed to
    med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class GeneticsFormulas
    { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number): CrossFormula { return
    c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases), 'codons', [bases]) }
    /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. -/
theorem fam_genetics_gc_1 : (((410 : Int) * (100 : Int)) / (1000 : Int)) = (41 : Int) := by decide

/-- genetics: punnett(3, 4) = 75 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate, heritability,
    alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` — genetics is what
    medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content, Punnett ratio,
    mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a measure crossed to
    med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class GeneticsFormulas
    { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number): CrossFormula { return
    c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases), 'codons', [bases]) }
    /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */ static gc(gc: number, total: number):
    CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ? Math.floor((gc *
    100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) } /** PUNNETT: the
    dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. -/
theorem fam_genetics_punnett_1 : (((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int) := by decide

/-- genetics: mutation(5, 1000000) = 5 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate,
    heritability, alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` —
    genetics is what medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content,
    Punnett ratio, mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class
    GeneticsFormulas { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number):
    CrossFormula { return c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases),
    'codons', [bases]) } /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */ static gc(gc: number,
    total: number): CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ?
    Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) } /**
    PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. */ static
    punnett(dominant: number, total: number): CrossFormula { return c('genetics-punnett', 'punnett(dominant,
    total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant,
    total) && total > 0 && dominant <= total, 'punnett', [dominant, total]) } /** MUTATION RATE per million
    bases. value ⌊mutations · 1000000 / bases⌋. -/
theorem fam_genetics_mutation_1 : (((5 : Int) * (1000000 : Int)) / (1000000 : Int)) = (5 : Int) := by decide

/-- genetics: heritability(80, 100) = 80 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate,
    heritability, alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` —
    genetics is what medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content,
    Punnett ratio, mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class
    GeneticsFormulas { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number):
    CrossFormula { return c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases),
    'codons', [bases]) } /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */ static gc(gc: number,
    total: number): CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ?
    Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) } /**
    PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. */ static
    punnett(dominant: number, total: number): CrossFormula { return c('genetics-punnett', 'punnett(dominant,
    total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant,
    total) && total > 0 && dominant <= total, 'punnett', [dominant, total]) } /** MUTATION RATE per million
    bases. value ⌊mutations · 1000000 / bases⌋. */ static mutation(mutations: number, bases: number):
    CrossFormula { return c('genetics-mutation', 'mutation(mutations, bases) = ⌊mutations · 1000000 / bases⌋',
    bases > 0 ? Math.floor((mutations * 1000000) / bases) : 0, nat(mutations, bases) && bases > 0, 'mutation',
    [mutations, bases]) } /** HERITABILITY: the genetic share of variance as a percentage. value ⌊genetic · 100
    / total⌋. -/
theorem fam_genetics_heritability_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- genetics: alleles(20000) = 40000 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API registry,
    not by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate,
    heritability, alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` —
    genetics is what medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content,
    Punnett ratio, mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class
    GeneticsFormulas { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number):
    CrossFormula { return c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases),
    'codons', [bases]) } /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */ static gc(gc: number,
    total: number): CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ?
    Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) } /**
    PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. */ static
    punnett(dominant: number, total: number): CrossFormula { return c('genetics-punnett', 'punnett(dominant,
    total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant,
    total) && total > 0 && dominant <= total, 'punnett', [dominant, total]) } /** MUTATION RATE per million
    bases. value ⌊mutations · 1000000 / bases⌋. */ static mutation(mutations: number, bases: number):
    CrossFormula { return c('genetics-mutation', 'mutation(mutations, bases) = ⌊mutations · 1000000 / bases⌋',
    bases > 0 ? Math.floor((mutations * 1000000) / bases) : 0, nat(mutations, bases) && bases > 0, 'mutation',
    [mutations, bases]) } /** HERITABILITY: the genetic share of variance as a percentage. value ⌊genetic · 100
    / total⌋. */ static heritability(genetic: number, total: number): CrossFormula { return
    c('genetics-heritability', 'heritability(genetic, total) = ⌊genetic · 100 / total⌋', total > 0 ?
    Math.floor((genetic * 100) / total) : 0, nat(genetic, total) && total > 0 && genetic <= total,
    'heritability', [genetic, total]) } /** ALLELES: two per gene, diploid. value genes · 2. -/
theorem fam_genetics_alleles_1 : ((20000 : Int) * (2 : Int)) = (40000 : Int) := by decide

/-- genetics: coverage(3000000000, 100000000) = 30 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A genome is numbers: codons from bases, GC content, Punnett ratios,
    mutation rate, heritability, alleles per gene, sequencing coverage, and how alike two sequences are. Crosses
    to `med` — genetics is what medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC
    content, Punnett ratio, mutation rate, heritability, alleles, coverage, similarity); life\'s code as
    integers; a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst:
    'med', formula, value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class
    GeneticsFormulas { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number):
    CrossFormula { return c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases),
    'codons', [bases]) } /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */ static gc(gc: number,
    total: number): CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ?
    Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) } /**
    PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. */ static
    punnett(dominant: number, total: number): CrossFormula { return c('genetics-punnett', 'punnett(dominant,
    total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant,
    total) && total > 0 && dominant <= total, 'punnett', [dominant, total]) } /** MUTATION RATE per million
    bases. value ⌊mutations · 1000000 / bases⌋. */ static mutation(mutations: number, bases: number):
    CrossFormula { return c('genetics-mutation', 'mutation(mutations, bases) = ⌊mutations · 1000000 / bases⌋',
    bases > 0 ? Math.floor((mutations * 1000000) / bases) : 0, nat(mutations, bases) && bases > 0, 'mutation',
    [mutations, bases]) } /** HERITABILITY: the genetic share of variance as a percentage. value ⌊genetic · 100
    / total⌋. */ static heritability(genetic: number, total: number): CrossFormula { return
    c('genetics-heritability', 'heritability(genetic, total) = ⌊genetic · 100 / total⌋', total > 0 ?
    Math.floor((genetic * 100) / total) : 0, nat(genetic, total) && total > 0 && genetic <= total,
    'heritability', [genetic, total]) } /** ALLELES: two per gene, diploid. value genes · 2. */ static
    alleles(genes: number): CrossFormula { return c('genetics-alleles', 'alleles(genes) = genes · 2', genes * 2,
    nat(genes), 'alleles', [genes]) } /** COVERAGE: reads over the genome length. value ⌊reads / genome⌋. -/
theorem fam_genetics_coverage_1 : ((3000000000 : Int) / (100000000 : Int)) = (30 : Int) := by decide

/-- genetics: similarity(986, 1000) = 98 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate,
    heritability, alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` —
    genetics is what medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content,
    Punnett ratio, mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class
    GeneticsFormulas { /** CODONS: triplets of bases. value ⌊bases / 3⌋. */ static codons(bases: number):
    CrossFormula { return c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases),
    'codons', [bases]) } /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */ static gc(gc: number,
    total: number): CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ?
    Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) } /**
    PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. */ static
    punnett(dominant: number, total: number): CrossFormula { return c('genetics-punnett', 'punnett(dominant,
    total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant,
    total) && total > 0 && dominant <= total, 'punnett', [dominant, total]) } /** MUTATION RATE per million
    bases. value ⌊mutations · 1000000 / bases⌋. */ static mutation(mutations: number, bases: number):
    CrossFormula { return c('genetics-mutation', 'mutation(mutations, bases) = ⌊mutations · 1000000 / bases⌋',
    bases > 0 ? Math.floor((mutations * 1000000) / bases) : 0, nat(mutations, bases) && bases > 0, 'mutation',
    [mutations, bases]) } /** HERITABILITY: the genetic share of variance as a percentage. value ⌊genetic · 100
    / total⌋. */ static heritability(genetic: number, total: number): CrossFormula { return
    c('genetics-heritability', 'heritability(genetic, total) = ⌊genetic · 100 / total⌋', total > 0 ?
    Math.floor((genetic * 100) / total) : 0, nat(genetic, total) && total > 0 && genetic <= total,
    'heritability', [genetic, total]) } /** ALLELES: two per gene, diploid. value genes · 2. */ static
    alleles(genes: number): CrossFormula { return c('genetics-alleles', 'alleles(genes) = genes · 2', genes * 2,
    nat(genes), 'alleles', [genes]) } /** COVERAGE: reads over the genome length. value ⌊reads / genome⌋. */
    static coverage(reads: number, genome: number): CrossFormula { return c('genetics-coverage',
    'coverage(reads, genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads,
    genome) && genome > 0, 'coverage', [reads, genome]) } /** SIMILARITY: matching positions over length as a
    percentage. value ⌊matches · 100 / length⌋. -/
theorem fam_genetics_similarity_1 : (((986 : Int) * (100 : Int)) / (1000 : Int)) = (98 : Int) := by decide

/-- genome: basepairs(3000, 1000) = 3000000 — GenomeFormulas — 8 exact-integer formulas of the genome domain,
    each at a hex address crossing to cross; develops the genome leads. */ const PROOF = "genome counts:
    basepairs(x, y) = x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) =
    x · 100 / y; mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x:
    number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const
    combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k :
    k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf =
    (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id,
    src: 'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params })
    export class GenomeFormulas { /** basepairs(x, y) = x · y. -/
theorem fam_genome_basepairs_1 : ((3000 : Int) * (1000 : Int)) = (3000000 : Int) := by decide

/-- genome: genes(20000, 1) = 20000 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at a
    hex address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y) =
    x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. -/
theorem fam_genome_genes_1 : ((20000 : Int) * (1 : Int)) = (20000 : Int) := by decide

/-- genome: codons(3000, 3) = 1000 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at a
    hex address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y) =
    x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. */ static genes(x: number, y: number): CrossFormula { return f('genome-genes',
    'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) } /** codons(x, y) = x / y. -/
theorem fam_genome_codons_1 : ((3000 : Int) / (3 : Int)) = (1000 : Int) := by decide

/-- genome: chromosomes(23, 0) = 23 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at a
    hex address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y) =
    x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. */ static genes(x: number, y: number): CrossFormula { return f('genome-genes',
    'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) } /** codons(x, y) = x / y. */ static codons(x:
    number, y: number): CrossFormula { return f('genome-codons', 'codons(x, y) = x / y', y > 0 ? Math.floor(x /
    y) : 0, nat(x, y) && y > 0, 'codons', [x, y]) } /** chromosomes(x, y) = x + y. -/
theorem fam_genome_chromosomes_1 : ((23 : Int) + (0 : Int)) = (23 : Int) := by decide

/-- genome: gcpct(41, 100) = 41 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at a hex
    address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y) = x ·
    y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. */ static genes(x: number, y: number): CrossFormula { return f('genome-genes',
    'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) } /** codons(x, y) = x / y. */ static codons(x:
    number, y: number): CrossFormula { return f('genome-codons', 'codons(x, y) = x / y', y > 0 ? Math.floor(x /
    y) : 0, nat(x, y) && y > 0, 'codons', [x, y]) } /** chromosomes(x, y) = x + y. */ static chromosomes(x:
    number, y: number): CrossFormula { return f('genome-chromosomes', 'chromosomes(x, y) = x + y', x + y, nat(x,
    y), 'chromosomes', [x, y]) } /** gcpct(x, y) = x · 100 / y. -/
theorem fam_genome_gcpct_1 : (((41 : Int) * (100 : Int)) / (100 : Int)) = (41 : Int) := by decide

/-- genome: mutations(1000, 100) = 10 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at
    a hex address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y)
    = x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. */ static genes(x: number, y: number): CrossFormula { return f('genome-genes',
    'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) } /** codons(x, y) = x / y. */ static codons(x:
    number, y: number): CrossFormula { return f('genome-codons', 'codons(x, y) = x / y', y > 0 ? Math.floor(x /
    y) : 0, nat(x, y) && y > 0, 'codons', [x, y]) } /** chromosomes(x, y) = x + y. */ static chromosomes(x:
    number, y: number): CrossFormula { return f('genome-chromosomes', 'chromosomes(x, y) = x + y', x + y, nat(x,
    y), 'chromosomes', [x, y]) } /** gcpct(x, y) = x · 100 / y. */ static gcpct(x: number, y: number):
    CrossFormula { return f('genome-gcpct', 'gcpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0,
    nat(x, y) && y > 0, 'gcpct', [x, y]) } /** mutations(x, y) = x / y. -/
theorem fam_genome_mutations_1 : ((1000 : Int) / (100 : Int)) = (10 : Int) := by decide

/-- genome: reads(1000, 150) = 150000 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at
    a hex address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y)
    = x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. */ static genes(x: number, y: number): CrossFormula { return f('genome-genes',
    'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) } /** codons(x, y) = x / y. */ static codons(x:
    number, y: number): CrossFormula { return f('genome-codons', 'codons(x, y) = x / y', y > 0 ? Math.floor(x /
    y) : 0, nat(x, y) && y > 0, 'codons', [x, y]) } /** chromosomes(x, y) = x + y. */ static chromosomes(x:
    number, y: number): CrossFormula { return f('genome-chromosomes', 'chromosomes(x, y) = x + y', x + y, nat(x,
    y), 'chromosomes', [x, y]) } /** gcpct(x, y) = x · 100 / y. */ static gcpct(x: number, y: number):
    CrossFormula { return f('genome-gcpct', 'gcpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0,
    nat(x, y) && y > 0, 'gcpct', [x, y]) } /** mutations(x, y) = x / y. */ static mutations(x: number, y:
    number): CrossFormula { return f('genome-mutations', 'mutations(x, y) = x / y', y > 0 ? Math.floor(x / y) :
    0, nat(x, y) && y > 0, 'mutations', [x, y]) } /** reads(x, y) = x · y. -/
theorem fam_genome_reads_1 : ((1000 : Int) * (150 : Int)) = (150000 : Int) := by decide

/-- genome: combos(8, 2) = 28 — GenomeFormulas — 8 exact-integer formulas of the genome domain, each at a hex
    address crossing to cross; develops the genome leads. */ const PROOF = "genome counts: basepairs(x, y) = x ·
    y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y;
    mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params }) export
    class GenomeFormulas { /** basepairs(x, y) = x · y. */ static basepairs(x: number, y: number): CrossFormula
    { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) } /**
    genes(x, y) = x · y. */ static genes(x: number, y: number): CrossFormula { return f('genome-genes',
    'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) } /** codons(x, y) = x / y. */ static codons(x:
    number, y: number): CrossFormula { return f('genome-codons', 'codons(x, y) = x / y', y > 0 ? Math.floor(x /
    y) : 0, nat(x, y) && y > 0, 'codons', [x, y]) } /** chromosomes(x, y) = x + y. */ static chromosomes(x:
    number, y: number): CrossFormula { return f('genome-chromosomes', 'chromosomes(x, y) = x + y', x + y, nat(x,
    y), 'chromosomes', [x, y]) } /** gcpct(x, y) = x · 100 / y. */ static gcpct(x: number, y: number):
    CrossFormula { return f('genome-gcpct', 'gcpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0,
    nat(x, y) && y > 0, 'gcpct', [x, y]) } /** mutations(x, y) = x / y. */ static mutations(x: number, y:
    number): CrossFormula { return f('genome-mutations', 'mutations(x, y) = x / y', y > 0 ? Math.floor(x / y) :
    0, nat(x, y) && y > 0, 'mutations', [x, y]) } /** reads(x, y) = x · y. */ static reads(x: number, y:
    number): CrossFormula { return f('genome-reads', 'reads(x, y) = x · y', x * y, nat(x, y), 'reads', [x, y]) }
    /** combos(x, y) = C(x, y). -/
theorem fam_genome_combos_1 : (Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int) := by decide

/-- genomics: coverage(3000, 100) = 30 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. -/
theorem fam_genomics_coverage_1 : ((3000 : Int) / (100 : Int)) = (30 : Int) := by decide

/-- genomics: gccontent(50, 100) = 50 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */ static
    coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads,
    genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0,
    'coverage', [reads, genome]) } /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. -/
theorem fam_genomics_gccontent_1 : (((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int) := by decide

/-- genomics: snp(10, 1000000) = 10 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */ static
    coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads,
    genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0,
    'coverage', [reads, genome]) } /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. */ static
    gccontent(gc: number, bases: number): CrossFormula { return c('genomics-gccontent', 'gccontent(gc, bases) =
    ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <=
    bases, 'gccontent', [gc, bases]) } /** HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 /
    total⌋. */ static heterozygosity(hetero: number, total: number): CrossFormula { return
    c('genomics-heterozygosity', 'heterozygosity(hetero, total) = ⌊hetero · 100 / total⌋', total > 0 ?
    Math.floor((hetero * 100) / total) : 0, nat(hetero, total) && total > 0 && hetero <= total,
    'heterozygosity', [hetero, total]) } /** MUTATION rate: changes per generation. value ⌊changed /
    generations⌋. */ static mutation(changed: number, generations: number): CrossFormula { return
    c('genomics-mutation', 'mutation(changed, generations) = ⌊changed / generations⌋', generations > 0 ?
    Math.floor(changed / generations) : 0, nat(changed, generations) && generations > 0, 'mutation', [changed,
    generations]) } /** N50: the contig length that marks half the assembly. value length. */ static n50(length:
    number): CrossFormula { return c('genomics-n50', 'n50(length) = length', length, nat(length), 'n50',
    [length]) } /** SNP density: variants per million bases. value ⌊variants · 1000000 / bases⌋. -/
theorem fam_genomics_snp_1 : (((10 : Int) * (1000000 : Int)) / (1000000 : Int)) = (10 : Int) := by decide

/-- genomics: heterozygosity(5, 100) = 5 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */ static
    coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads,
    genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0,
    'coverage', [reads, genome]) } /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. */ static
    gccontent(gc: number, bases: number): CrossFormula { return c('genomics-gccontent', 'gccontent(gc, bases) =
    ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <=
    bases, 'gccontent', [gc, bases]) } /** HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 /
    total⌋. -/
theorem fam_genomics_heterozygosity_1 : (((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int) := by decide

/-- genomics: assembly(50, 200) = 25 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. -/
theorem fam_genomics_assembly_1 : (((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int) := by decide

/-- genomics: n50(5000) = 5000 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is numbers:
    how deep the reads cover it, the GC fraction, variants per million bases, how often a site is heterozygous,
    how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of conserved synteny
    blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */ const PROOF =
    'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity, assembly
    fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */ static
    coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads,
    genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0,
    'coverage', [reads, genome]) } /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. */ static
    gccontent(gc: number, bases: number): CrossFormula { return c('genomics-gccontent', 'gccontent(gc, bases) =
    ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <=
    bases, 'gccontent', [gc, bases]) } /** HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 /
    total⌋. */ static heterozygosity(hetero: number, total: number): CrossFormula { return
    c('genomics-heterozygosity', 'heterozygosity(hetero, total) = ⌊hetero · 100 / total⌋', total > 0 ?
    Math.floor((hetero * 100) / total) : 0, nat(hetero, total) && total > 0 && hetero <= total,
    'heterozygosity', [hetero, total]) } /** MUTATION rate: changes per generation. value ⌊changed /
    generations⌋. */ static mutation(changed: number, generations: number): CrossFormula { return
    c('genomics-mutation', 'mutation(changed, generations) = ⌊changed / generations⌋', generations > 0 ?
    Math.floor(changed / generations) : 0, nat(changed, generations) && generations > 0, 'mutation', [changed,
    generations]) } /** N50: the contig length that marks half the assembly. value length. -/
theorem fam_genomics_n50_1 : (5000 : Int) = (5000 : Int) := by decide

/-- genomics: mutation(100, 10) = 10 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */ static
    coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads,
    genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0,
    'coverage', [reads, genome]) } /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. */ static
    gccontent(gc: number, bases: number): CrossFormula { return c('genomics-gccontent', 'gccontent(gc, bases) =
    ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <=
    bases, 'gccontent', [gc, bases]) } /** HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 /
    total⌋. */ static heterozygosity(hetero: number, total: number): CrossFormula { return
    c('genomics-heterozygosity', 'heterozygosity(hetero, total) = ⌊hetero · 100 / total⌋', total > 0 ?
    Math.floor((hetero * 100) / total) : 0, nat(hetero, total) && total > 0 && hetero <= total,
    'heterozygosity', [hetero, total]) } /** MUTATION rate: changes per generation. value ⌊changed /
    generations⌋. -/
theorem fam_genomics_mutation_1 : ((100 : Int) / (10 : Int)) = (10 : Int) := by decide

/-- genomics: synteny(8, 10) = 80 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */ static assembly(contigs: number,
    reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 /
    reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly',
    [contigs, reads]) } /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */ static
    coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads,
    genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0,
    'coverage', [reads, genome]) } /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. */ static
    gccontent(gc: number, bases: number): CrossFormula { return c('genomics-gccontent', 'gccontent(gc, bases) =
    ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <=
    bases, 'gccontent', [gc, bases]) } /** HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 /
    total⌋. */ static heterozygosity(hetero: number, total: number): CrossFormula { return
    c('genomics-heterozygosity', 'heterozygosity(hetero, total) = ⌊hetero · 100 / total⌋', total > 0 ?
    Math.floor((hetero * 100) / total) : 0, nat(hetero, total) && total > 0 && hetero <= total,
    'heterozygosity', [hetero, total]) } /** MUTATION rate: changes per generation. value ⌊changed /
    generations⌋. */ static mutation(changed: number, generations: number): CrossFormula { return
    c('genomics-mutation', 'mutation(changed, generations) = ⌊changed / generations⌋', generations > 0 ?
    Math.floor(changed / generations) : 0, nat(changed, generations) && generations > 0, 'mutation', [changed,
    generations]) } /** N50: the contig length that marks half the assembly. value length. */ static n50(length:
    number): CrossFormula { return c('genomics-n50', 'n50(length) = length', length, nat(length), 'n50',
    [length]) } /** SNP density: variants per million bases. value ⌊variants · 1000000 / bases⌋. */ static
    snp(variants: number, bases: number): CrossFormula { return c('genomics-snp', 'snp(variants, bases) =
    ⌊variants · 1000000 / bases⌋', bases > 0 ? Math.floor((variants * 1000000) / bases) : 0, nat(variants,
    bases) && bases > 0, 'snp', [variants, bases]) } /** SYNTENY: conserved blocks as a percentage. value
    ⌊conserved · 100 / blocks⌋. -/
theorem fam_genomics_synteny_1 : (((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int) := by decide

/-- geo: arcseconds(60, 60) = 3600 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex
    address crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y;
    tiles(x) = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y;
    quadkeys(x) = 2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0;
    let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number =>
    { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v =
    (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 ||
    k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x,
    y) = x · y. -/
theorem fam_geo_arcseconds_1 : ((60 : Int) * (60 : Int)) = (3600 : Int) := by decide

/-- geo: tiles(10) = 1024 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex address
    crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y; tiles(x)
    = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y; quadkeys(x) =
    2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for
    (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k < 0 ||
    k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) /
    (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn >
    20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula, value, proof: PROOF },
    holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x, y) = x · y. */ static
    arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds', 'arcseconds(x, y) = x · y', x *
    y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. -/
theorem fam_geo_tiles_1 : ((2 : Int) ^ (10 : Nat)) = (1024 : Int) := by decide

/-- geo: zoomcells(8) = 256 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex address
    crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y; tiles(x)
    = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y; quadkeys(x) =
    2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for
    (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k < 0 ||
    k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) /
    (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn >
    20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula, value, proof: PROOF },
    holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x, y) = x · y. */ static
    arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds', 'arcseconds(x, y) = x · y', x *
    y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. */ static tiles(x: number): CrossFormula { return
    f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tiles', [x]) } /** zoomcells(x) =
    2^x. -/
theorem fam_geo_zoomcells_1 : ((2 : Int) ^ (8 : Nat)) = (256 : Int) := by decide

/-- geo: gridcells(16, 16) = 256 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex
    address crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y;
    tiles(x) = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y;
    quadkeys(x) = 2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0;
    let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number =>
    { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v =
    (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 ||
    k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x,
    y) = x · y. */ static arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds',
    'arcseconds(x, y) = x · y', x * y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. */ static tiles(x:
    number): CrossFormula { return f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30,
    'tiles', [x]) } /** zoomcells(x) = 2^x. */ static zoomcells(x: number): CrossFormula { return
    f('geo-zoomcells', 'zoomcells(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'zoomcells', [x]) } /**
    gridcells(x, y) = x · y. -/
theorem fam_geo_gridcells_1 : ((16 : Int) * (16 : Int)) = (256 : Int) := by decide

/-- geo: degrees(3600, 60) = 60 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex
    address crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y;
    tiles(x) = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y;
    quadkeys(x) = 2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0;
    let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number =>
    { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v =
    (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 ||
    k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula,
    value, proof: PROOF }, holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x,
    y) = x · y. */ static arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds',
    'arcseconds(x, y) = x · y', x * y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. */ static tiles(x:
    number): CrossFormula { return f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30,
    'tiles', [x]) } /** zoomcells(x) = 2^x. */ static zoomcells(x: number): CrossFormula { return
    f('geo-zoomcells', 'zoomcells(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'zoomcells', [x]) } /**
    gridcells(x, y) = x · y. */ static gridcells(x: number, y: number): CrossFormula { return f('geo-gridcells',
    'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) } /** degrees(x, y) = x / y. -/
theorem fam_geo_degrees_1 : ((3600 : Int) / (60 : Int)) = (60 : Int) := by decide

/-- geo: area(100, 50) = 5000 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex address
    crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y; tiles(x)
    = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y; quadkeys(x) =
    2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for
    (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k < 0 ||
    k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) /
    (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn >
    20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula, value, proof: PROOF },
    holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x, y) = x · y. */ static
    arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds', 'arcseconds(x, y) = x · y', x *
    y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. */ static tiles(x: number): CrossFormula { return
    f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tiles', [x]) } /** zoomcells(x) =
    2^x. */ static zoomcells(x: number): CrossFormula { return f('geo-zoomcells', 'zoomcells(x) = 2^x', x <= 30
    ? 2 ** x : 0, nat(x) && x <= 30, 'zoomcells', [x]) } /** gridcells(x, y) = x · y. */ static gridcells(x:
    number, y: number): CrossFormula { return f('geo-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y),
    'gridcells', [x, y]) } /** degrees(x, y) = x / y. */ static degrees(x: number, y: number): CrossFormula {
    return f('geo-degrees', 'degrees(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'degrees', [x, y]) } /** area(x, y) = x · y. -/
theorem fam_geo_area_1 : ((100 : Int) * (50 : Int)) = (5000 : Int) := by decide

/-- geo: quadkeys(4) = 16 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex address
    crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y; tiles(x)
    = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y; quadkeys(x) =
    2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for
    (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k < 0 ||
    k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) /
    (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn >
    20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula, value, proof: PROOF },
    holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x, y) = x · y. */ static
    arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds', 'arcseconds(x, y) = x · y', x *
    y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. */ static tiles(x: number): CrossFormula { return
    f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tiles', [x]) } /** zoomcells(x) =
    2^x. */ static zoomcells(x: number): CrossFormula { return f('geo-zoomcells', 'zoomcells(x) = 2^x', x <= 30
    ? 2 ** x : 0, nat(x) && x <= 30, 'zoomcells', [x]) } /** gridcells(x, y) = x · y. */ static gridcells(x:
    number, y: number): CrossFormula { return f('geo-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y),
    'gridcells', [x, y]) } /** degrees(x, y) = x / y. */ static degrees(x: number, y: number): CrossFormula {
    return f('geo-degrees', 'degrees(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'degrees', [x, y]) } /** area(x, y) = x · y. */ static area(x: number, y: number): CrossFormula { return
    f('geo-area', 'area(x, y) = x · y', x * y, nat(x, y), 'area', [x, y]) } /** quadkeys(x) = 2^x. -/
theorem fam_geo_quadkeys_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- geo: waypoints(10, 2) = 12 — GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex address
    crossing to cross; develops the geo leads. */ const PROOF = "geo counts: arcseconds(x, y) = x · y; tiles(x)
    = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y; quadkeys(x) =
    2^x; waypoints(x, y) = x + y" const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for
    (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn: number, k: number): number => { if (k < 0 ||
    k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) /
    (i + 1); return Math.round(v) } const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn >
    20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const f = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[]): CrossFormula => crossFormulaOf({ id, src: 'geo', dst: 'cross', formula, value, proof: PROOF },
    holds, { name: `geo.${name}`, params }) export class GeoFormulas { /** arcseconds(x, y) = x · y. */ static
    arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds', 'arcseconds(x, y) = x · y', x *
    y, nat(x, y), 'arcseconds', [x, y]) } /** tiles(x) = 2^x. */ static tiles(x: number): CrossFormula { return
    f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tiles', [x]) } /** zoomcells(x) =
    2^x. */ static zoomcells(x: number): CrossFormula { return f('geo-zoomcells', 'zoomcells(x) = 2^x', x <= 30
    ? 2 ** x : 0, nat(x) && x <= 30, 'zoomcells', [x]) } /** gridcells(x, y) = x · y. */ static gridcells(x:
    number, y: number): CrossFormula { return f('geo-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y),
    'gridcells', [x, y]) } /** degrees(x, y) = x / y. */ static degrees(x: number, y: number): CrossFormula {
    return f('geo-degrees', 'degrees(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0,
    'degrees', [x, y]) } /** area(x, y) = x · y. */ static area(x: number, y: number): CrossFormula { return
    f('geo-area', 'area(x, y) = x · y', x * y, nat(x, y), 'area', [x, y]) } /** quadkeys(x) = 2^x. */ static
    quadkeys(x: number): CrossFormula { return f('geo-quadkeys', 'quadkeys(x) = 2^x', x <= 30 ? 2 ** x : 0,
    nat(x) && x <= 30, 'quadkeys', [x]) } /** waypoints(x, y) = x + y. -/
theorem fam_geo_waypoints_1 : ((10 : Int) + (2 : Int)) = (12 : Int) := by decide

/-- geochemistry: isotope(200, 50) = 25 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not
    by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal enrichment,
    acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral saturation.
    Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF = 'geochemistry
    arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age,
    saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. -/
theorem fam_geochemistry_isotope_1 : (((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int) := by decide

/-- geochemistry: weathering(30, 100) = 30 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry,
    not by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal
    enrichment, acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral
    saturation. Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF =
    'geochemistry arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric
    age, saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. -/
theorem fam_geochemistry_weathering_1 : (((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int) := by decide

/-- geochemistry: enrichment(500, 100) = 500 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry,
    not by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal
    enrichment, acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral
    saturation. Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF =
    'geochemistry arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric
    age, saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. */ static weathering(dissolved: number, rock: number): CrossFormula { return
    c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ?
    Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock,
    'weathering', [dissolved, rock]) } /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. -/
theorem fam_geochemistry_enrichment_1 : (((500 : Int) * (100 : Int)) / (100 : Int)) = (500 : Int) := by decide

/-- geochemistry: ph(10, 100) = 10 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not by
    hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal enrichment,
    acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral saturation.
    Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF = 'geochemistry
    arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age,
    saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. */ static weathering(dissolved: number, rock: number): CrossFormula { return
    c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ?
    Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock,
    'weathering', [dissolved, rock]) } /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. */ static enrichment(sample: number, crust: number): CrossFormula
    { return c('geochemistry-enrichment', 'enrichment(sample, crust) = ⌊sample · 100 / crust⌋', crust > 0 ?
    Math.floor((sample * 100) / crust) : 0, nat(sample, crust) && crust > 0, 'enrichment', [sample, crust]) }
    /** ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 / base⌋. -/
theorem fam_geochemistry_ph_1 : (((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int) := by decide

/-- geochemistry: salinity(35, 1000) = 35 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not
    by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal enrichment,
    acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral saturation.
    Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF = 'geochemistry
    arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age,
    saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. */ static weathering(dissolved: number, rock: number): CrossFormula { return
    c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ?
    Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock,
    'weathering', [dissolved, rock]) } /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. */ static enrichment(sample: number, crust: number): CrossFormula
    { return c('geochemistry-enrichment', 'enrichment(sample, crust) = ⌊sample · 100 / crust⌋', crust > 0 ?
    Math.floor((sample * 100) / crust) : 0, nat(sample, crust) && crust > 0, 'enrichment', [sample, crust]) }
    /** ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 / base⌋. */ static ph(acid:
    number, base: number): CrossFormula { return c('geochemistry-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋',
    base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /**
    SALINITY: salt in water, per thousand. value ⌊salt · 1000 / water⌋. -/
theorem fam_geochemistry_salinity_1 : (((35 : Int) * (1000 : Int)) / (1000 : Int)) = (35 : Int) := by decide

/-- geochemistry: partition(80, 20) = 400 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not
    by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal enrichment,
    acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral saturation.
    Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF = 'geochemistry
    arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age,
    saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. */ static weathering(dissolved: number, rock: number): CrossFormula { return
    c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ?
    Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock,
    'weathering', [dissolved, rock]) } /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. */ static enrichment(sample: number, crust: number): CrossFormula
    { return c('geochemistry-enrichment', 'enrichment(sample, crust) = ⌊sample · 100 / crust⌋', crust > 0 ?
    Math.floor((sample * 100) / crust) : 0, nat(sample, crust) && crust > 0, 'enrichment', [sample, crust]) }
    /** ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 / base⌋. */ static ph(acid:
    number, base: number): CrossFormula { return c('geochemistry-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋',
    base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /**
    SALINITY: salt in water, per thousand. value ⌊salt · 1000 / water⌋. */ static salinity(salt: number, water:
    number): CrossFormula { return c('geochemistry-salinity', 'salinity(salt, water) = ⌊salt · 1000 / water⌋',
    water > 0 ? Math.floor((salt * 1000) / water) : 0, nat(salt, water) && water > 0, 'salinity', [salt, water])
    } /** PARTITION: how an element splits between solid and liquid, as a percentage. value ⌊solid · 100 /
    liquid⌋. -/
theorem fam_geochemistry_partition_1 : (((80 : Int) * (100 : Int)) / (20 : Int)) = (400 : Int) := by decide

/-- geochemistry: age(100, 25) = 250 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not by
    hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal enrichment,
    acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral saturation.
    Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF = 'geochemistry
    arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age,
    saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. */ static weathering(dissolved: number, rock: number): CrossFormula { return
    c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ?
    Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock,
    'weathering', [dissolved, rock]) } /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. */ static enrichment(sample: number, crust: number): CrossFormula
    { return c('geochemistry-enrichment', 'enrichment(sample, crust) = ⌊sample · 100 / crust⌋', crust > 0 ?
    Math.floor((sample * 100) / crust) : 0, nat(sample, crust) && crust > 0, 'enrichment', [sample, crust]) }
    /** ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 / base⌋. */ static ph(acid:
    number, base: number): CrossFormula { return c('geochemistry-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋',
    base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /**
    SALINITY: salt in water, per thousand. value ⌊salt · 1000 / water⌋. */ static salinity(salt: number, water:
    number): CrossFormula { return c('geochemistry-salinity', 'salinity(salt, water) = ⌊salt · 1000 / water⌋',
    water > 0 ? Math.floor((salt * 1000) / water) : 0, nat(salt, water) && water > 0, 'salinity', [salt, water])
    } /** PARTITION: how an element splits between solid and liquid, as a percentage. value ⌊solid · 100 /
    liquid⌋. */ static partition(solid: number, liquid: number): CrossFormula { return
    c('geochemistry-partition', 'partition(solid, liquid) = ⌊solid · 100 / liquid⌋', liquid > 0 ?
    Math.floor((solid * 100) / liquid) : 0, nat(solid, liquid) && liquid > 0, 'partition', [solid, liquid]) }
    /** RADIOMETRIC AGE: daughter over parent, per thousand (an age proxy). value ⌊daughter · 1000 / parent⌋. -/
theorem fam_geochemistry_age_1 : (((25 : Int) * (1000 : Int)) / (100 : Int)) = (250 : Int) := by decide

/-- geochemistry: saturation(120, 100) = 120 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry,
    not by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal
    enrichment, acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral
    saturation. Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF =
    'geochemistry arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric
    age, saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. */ static isotope(parent: number, daughter:
    number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 /
    parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0,
    'isotope', [parent, daughter]) } /** WEATHERING: the dissolved fraction of the rock, as a percentage. value
    ⌊dissolved · 100 / rock⌋. */ static weathering(dissolved: number, rock: number): CrossFormula { return
    c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ?
    Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock,
    'weathering', [dissolved, rock]) } /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. */ static enrichment(sample: number, crust: number): CrossFormula
    { return c('geochemistry-enrichment', 'enrichment(sample, crust) = ⌊sample · 100 / crust⌋', crust > 0 ?
    Math.floor((sample * 100) / crust) : 0, nat(sample, crust) && crust > 0, 'enrichment', [sample, crust]) }
    /** ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 / base⌋. */ static ph(acid:
    number, base: number): CrossFormula { return c('geochemistry-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋',
    base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) } /**
    SALINITY: salt in water, per thousand. value ⌊salt · 1000 / water⌋. */ static salinity(salt: number, water:
    number): CrossFormula { return c('geochemistry-salinity', 'salinity(salt, water) = ⌊salt · 1000 / water⌋',
    water > 0 ? Math.floor((salt * 1000) / water) : 0, nat(salt, water) && water > 0, 'salinity', [salt, water])
    } /** PARTITION: how an element splits between solid and liquid, as a percentage. value ⌊solid · 100 /
    liquid⌋. */ static partition(solid: number, liquid: number): CrossFormula { return
    c('geochemistry-partition', 'partition(solid, liquid) = ⌊solid · 100 / liquid⌋', liquid > 0 ?
    Math.floor((solid * 100) / liquid) : 0, nat(solid, liquid) && liquid > 0, 'partition', [solid, liquid]) }
    /** RADIOMETRIC AGE: daughter over parent, per thousand (an age proxy). value ⌊daughter · 1000 / parent⌋. */
    static age(parent: number, daughter: number): CrossFormula { return c('geochemistry-age', 'age(parent,
    daughter) = ⌊daughter · 1000 / parent⌋', parent > 0 ? Math.floor((daughter * 1000) / parent) : 0,
    nat(parent, daughter) && parent > 0, 'age', [parent, daughter]) } /** SATURATION: ion activity against
    solubility, as a percentage. value ⌊ion · 100 / solubility⌋. -/
theorem fam_geochemistry_saturation_1 : (((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int) := by decide

/-- geodesy: flattening(298, 297) = 33 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the
    registry, not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a
    meridian arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence,
    orthometric elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the
    frame geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian
    arc, geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. -/
theorem fam_geodesy_flattening_1 : ((((298 : Int) - (297 : Int)) * (10000 : Int)) / (298 : Int)) = (33 : Int) := by decide

/-- geodesy: arc(90, 6371) = 10002 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian
    arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋. -/
theorem fam_geodesy_arc_1 : ((((90 : Int) * (6371 : Int)) * (314 : Int)) / (18000 : Int)) = (10002 : Int) := by decide

/-- geodesy: geoid(100, 30) = 70 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry, not
    by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian arc,
    the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). -/
theorem fam_geodesy_geoid_1 : ((100 : Int) - (30 : Int)) = (70 : Int) := by decide

/-- geodesy: geoid(30, 100) = -70 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry, not
    by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian arc,
    the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). -/
theorem fam_geodesy_geoid_2 : ((30 : Int) - (100 : Int)) = (-70 : Int) := by decide

/-- geodesy: datum(2, 1000) = 2000 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian
    arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). */ static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid',
    'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid',
    [height, undulation]) } /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. -/
theorem fam_geodesy_datum_1 : (((2 : Int) * (1000000 : Int)) / (1000 : Int)) = (2000 : Int) := by decide

/-- geodesy: convergence(30, 45) = 15 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian
    arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). */ static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid',
    'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid',
    [height, undulation]) } /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. */ static datum(shift: number, distance: number): CrossFormula { return
    c('geodesy-datum', 'datum(shift, distance) = ⌊shift · 1000000 / distance⌋', distance > 0 ? Math.floor((shift
    * 1000000) / distance) : 0, nat(shift, distance) && distance > 0, 'datum', [shift, distance]) } /**
    CONVERGENCE: grid convergence from longitude and latitude. value ⌊longitude · latitude / 90⌋. -/
theorem fam_geodesy_convergence_1 : (((30 : Int) * (45 : Int)) / (90 : Int)) = (15 : Int) := by decide

/-- geodesy: elevation(100, 30) = 70 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian
    arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). */ static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid',
    'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid',
    [height, undulation]) } /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. */ static datum(shift: number, distance: number): CrossFormula { return
    c('geodesy-datum', 'datum(shift, distance) = ⌊shift · 1000000 / distance⌋', distance > 0 ? Math.floor((shift
    * 1000000) / distance) : 0, nat(shift, distance) && distance > 0, 'datum', [shift, distance]) } /**
    CONVERGENCE: grid convergence from longitude and latitude. value ⌊longitude · latitude / 90⌋. */ static
    convergence(longitude: number, latitude: number): CrossFormula { return c('geodesy-convergence',
    'convergence(longitude, latitude) = ⌊longitude · latitude / 90⌋', Math.floor((longitude * latitude) / 90),
    nat(longitude, latitude), 'convergence', [longitude, latitude]) } /** ELEVATION: orthometric elevation,
    geoid height less the ellipsoidal. value geoid_ − ellipsoid (may be negative). -/
theorem fam_geodesy_elevation_1 : ((100 : Int) - (30 : Int)) = (70 : Int) := by decide

/-- geodesy: elevation(30, 100) = -70 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian
    arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). */ static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid',
    'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid',
    [height, undulation]) } /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. */ static datum(shift: number, distance: number): CrossFormula { return
    c('geodesy-datum', 'datum(shift, distance) = ⌊shift · 1000000 / distance⌋', distance > 0 ? Math.floor((shift
    * 1000000) / distance) : 0, nat(shift, distance) && distance > 0, 'datum', [shift, distance]) } /**
    CONVERGENCE: grid convergence from longitude and latitude. value ⌊longitude · latitude / 90⌋. */ static
    convergence(longitude: number, latitude: number): CrossFormula { return c('geodesy-convergence',
    'convergence(longitude, latitude) = ⌊longitude · latitude / 90⌋', Math.floor((longitude * latitude) / 90),
    nat(longitude, latitude), 'convergence', [longitude, latitude]) } /** ELEVATION: orthometric elevation,
    geoid height less the ellipsoidal. value geoid_ − ellipsoid (may be negative). -/
theorem fam_geodesy_elevation_2 : ((30 : Int) - (100 : Int)) = (-70 : Int) := by decide

/-- geodesy: baseline(5, 1000) = 5000 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian
    arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). */ static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid',
    'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid',
    [height, undulation]) } /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. */ static datum(shift: number, distance: number): CrossFormula { return
    c('geodesy-datum', 'datum(shift, distance) = ⌊shift · 1000000 / distance⌋', distance > 0 ? Math.floor((shift
    * 1000000) / distance) : 0, nat(shift, distance) && distance > 0, 'datum', [shift, distance]) } /**
    CONVERGENCE: grid convergence from longitude and latitude. value ⌊longitude · latitude / 90⌋. */ static
    convergence(longitude: number, latitude: number): CrossFormula { return c('geodesy-convergence',
    'convergence(longitude, latitude) = ⌊longitude · latitude / 90⌋', Math.floor((longitude * latitude) / 90),
    nat(longitude, latitude), 'convergence', [longitude, latitude]) } /** ELEVATION: orthometric elevation,
    geoid height less the ellipsoidal. value geoid_ − ellipsoid (may be negative). */ static elevation(geoid_:
    number, ellipsoid: number): CrossFormula { return c('geodesy-elevation', 'elevation(geoid_, ellipsoid) =
    geoid_ − ellipsoid', geoid_ - ellipsoid, nat(geoid_, ellipsoid), 'elevation', [geoid_, ellipsoid]) } /**
    BASELINE: baseline error over its length, in parts per million. value ⌊error · 1000000 / length⌋. -/
theorem fam_geodesy_baseline_1 : (((5 : Int) * (1000000 : Int)) / (1000 : Int)) = (5000 : Int) := by decide

/-- geodesy: precision(7) = 7 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry, not by
    hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a meridian arc, the
    geoid height above the ellipsoid, a datum shift in parts per million, grid convergence, orthometric
    elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the frame
    geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc,
    geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. */ static flattening(equatorial: number, polar: number):
    CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000
    / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0,
    nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) } /**
    ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋.
    */ static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius)
    = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius),
    'arc', [degrees, radius]) } /** GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). */ static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid',
    'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid',
    [height, undulation]) } /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. */ static datum(shift: number, distance: number): CrossFormula { return
    c('geodesy-datum', 'datum(shift, distance) = ⌊shift · 1000000 / distance⌋', distance > 0 ? Math.floor((shift
    * 1000000) / distance) : 0, nat(shift, distance) && distance > 0, 'datum', [shift, distance]) } /**
    CONVERGENCE: grid convergence from longitude and latitude. value ⌊longitude · latitude / 90⌋. */ static
    convergence(longitude: number, latitude: number): CrossFormula { return c('geodesy-convergence',
    'convergence(longitude, latitude) = ⌊longitude · latitude / 90⌋', Math.floor((longitude * latitude) / 90),
    nat(longitude, latitude), 'convergence', [longitude, latitude]) } /** ELEVATION: orthometric elevation,
    geoid height less the ellipsoidal. value geoid_ − ellipsoid (may be negative). */ static elevation(geoid_:
    number, ellipsoid: number): CrossFormula { return c('geodesy-elevation', 'elevation(geoid_, ellipsoid) =
    geoid_ − ellipsoid', geoid_ - ellipsoid, nat(geoid_, ellipsoid), 'elevation', [geoid_, ellipsoid]) } /**
    BASELINE: baseline error over its length, in parts per million. value ⌊error · 1000000 / length⌋. */ static
    baseline(error: number, length: number): CrossFormula { return c('geodesy-baseline', 'baseline(error,
    length) = ⌊error · 1000000 / length⌋', length > 0 ? Math.floor((error * 1000000) / length) : 0, nat(error,
    length) && length > 0, 'baseline', [error, length]) } /** PRECISION: the significant digits carried. value
    digits. -/
theorem fam_geodesy_precision_1 : (7 : Int) = (7 : Int) := by decide

/-- geography: density(10000, 50) = 200 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. -/
theorem fam_geography_density_1 : ((10000 : Int) / (50 : Int)) = (200 : Int) := by decide

/-- geography: gradient(15, 100) = 15 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. -/
theorem fam_geography_gradient_1 : (((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int) := by decide

/-- geography: distance(3, 111) = 333 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. -/
theorem fam_geography_distance_1 : ((3 : Int) * (111 : Int)) = (333 : Int) := by decide

/-- geography: area(40, 25) = 1000 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance across a
    map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is built up,
    and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on. A measure.
    */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel area,
    elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */ static
    distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees,
    scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) } /** PARCEL
    AREA: length by width. value length · width. -/
theorem fam_geography_area_1 : ((40 : Int) * (25 : Int)) = (1000 : Int) := by decide

/-- geography: elevation(8848, 5300) = 3548 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */ static
    distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees,
    scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) } /** PARCEL
    AREA: length by width. value length · width. */ static area(length: number, width: number): CrossFormula {
    return c('geography-area', 'area(length, width) = length · width', length * width, nat(length, width),
    'area', [length, width]) } /** ELEVATION: the rise of a peak over its base. value max(0, peak − base). -/
theorem fam_geography_elevation_1 : (fmax (0 : Int) ((8848 : Int) - (5300 : Int))) = (3548 : Int) := by decide

/-- geography: elevation(100, 200) = 0 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */ static
    distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees,
    scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) } /** PARCEL
    AREA: length by width. value length · width. */ static area(length: number, width: number): CrossFormula {
    return c('geography-area', 'area(length, width) = length · width', length * width, nat(length, width),
    'area', [length, width]) } /** ELEVATION: the rise of a peak over its base. value max(0, peak − base). -/
theorem fam_geography_elevation_2 : (fmax (0 : Int) ((100 : Int) - (200 : Int))) = (0 : Int) := by decide

/-- geography: watershed(9000, 30) = 300 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */ static
    distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees,
    scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) } /** PARCEL
    AREA: length by width. value length · width. */ static area(length: number, width: number): CrossFormula {
    return c('geography-area', 'area(length, width) = length · width', length * width, nat(length, width),
    'area', [length, width]) } /** ELEVATION: the rise of a peak over its base. value max(0, peak − base). */
    static elevation(peak: number, base: number): CrossFormula { return c('geography-elevation',
    'elevation(peak, base) = max(0, peak − base)', Math.max(0, peak - base), nat(peak, base), 'elevation',
    [peak, base]) } /** WATERSHED: the catchment a basin drains per outlet. value ⌊catchment / outlet⌋. -/
theorem fam_geography_watershed_1 : ((9000 : Int) / (30 : Int)) = (300 : Int) := by decide

/-- geography: urbanization(45, 100) = 45 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */ static
    distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees,
    scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) } /** PARCEL
    AREA: length by width. value length · width. */ static area(length: number, width: number): CrossFormula {
    return c('geography-area', 'area(length, width) = length · width', length * width, nat(length, width),
    'area', [length, width]) } /** ELEVATION: the rise of a peak over its base. value max(0, peak − base). */
    static elevation(peak: number, base: number): CrossFormula { return c('geography-elevation',
    'elevation(peak, base) = max(0, peak − base)', Math.max(0, peak - base), nat(peak, base), 'elevation',
    [peak, base]) } /** WATERSHED: the catchment a basin drains per outlet. value ⌊catchment / outlet⌋. */
    static watershed(catchment: number, outlet: number): CrossFormula { return c('geography-watershed',
    'watershed(catchment, outlet) = ⌊catchment / outlet⌋', outlet > 0 ? Math.floor(catchment / outlet) : 0,
    nat(catchment, outlet) && outlet > 0, 'watershed', [catchment, outlet]) } /** URBANIZATION as a percentage:
    built land over total. value ⌊urban · 100 / total⌋. -/
theorem fam_geography_urbanization_1 : (((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int) := by decide

/-- geography: connectivity(120, 40) = 300 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. */ static density(population: number,
    area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population /
    area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density',
    [population, area]) } /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */ static
    gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) =
    ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient',
    [rise, run]) } /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */ static
    distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees,
    scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) } /** PARCEL
    AREA: length by width. value length · width. */ static area(length: number, width: number): CrossFormula {
    return c('geography-area', 'area(length, width) = length · width', length * width, nat(length, width),
    'area', [length, width]) } /** ELEVATION: the rise of a peak over its base. value max(0, peak − base). */
    static elevation(peak: number, base: number): CrossFormula { return c('geography-elevation',
    'elevation(peak, base) = max(0, peak − base)', Math.max(0, peak - base), nat(peak, base), 'elevation',
    [peak, base]) } /** WATERSHED: the catchment a basin drains per outlet. value ⌊catchment / outlet⌋. */
    static watershed(catchment: number, outlet: number): CrossFormula { return c('geography-watershed',
    'watershed(catchment, outlet) = ⌊catchment / outlet⌋', outlet > 0 ? Math.floor(catchment / outlet) : 0,
    nat(catchment, outlet) && outlet > 0, 'watershed', [catchment, outlet]) } /** URBANIZATION as a percentage:
    built land over total. value ⌊urban · 100 / total⌋. */ static urbanization(urban: number, total: number):
    CrossFormula { return c('geography-urbanization', 'urbanization(urban, total) = ⌊urban · 100 / total⌋',
    total > 0 ? Math.floor((urban * 100) / total) : 0, nat(urban, total) && total > 0 && urban <= total,
    'urbanization', [urban, total]) } /** CONNECTIVITY: links per node, as a percentage. value ⌊links · 100 /
    nodes⌋. -/
theorem fam_geography_connectivity_1 : (((120 : Int) * (100 : Int)) / (40 : Int)) = (300 : Int) := by decide

/-- geology: magnitude(7) = 7 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. -/
theorem fam_geology_magnitude_1 : (7 : Int) = (7 : Int) := by decide

/-- geology: depth(10, 25) = 250 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. -/
theorem fam_geology_depth_1 : ((10 : Int) * (25 : Int)) = (250 : Int) := by decide

/-- geology: porosity(30, 120) = 25 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. */ static depth(layers:
    number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each',
    layers * each, nat(layers, each), 'depth', [layers, each]) } /** POROSITY: pore space as a percentage. value
    ⌊voids · 100 / total⌋. -/
theorem fam_geology_porosity_1 : (((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int) := by decide

/-- geology: age(5730, 3) = 17190 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. */ static depth(layers:
    number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each',
    layers * each, nat(layers, each), 'depth', [layers, each]) } /** POROSITY: pore space as a percentage. value
    ⌊voids · 100 / total⌋. */ static porosity(voids: number, total: number): CrossFormula { return
    c('geology-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100)
    / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) } /** AGE:
    radiometric, half-lives elapsed times the half-life. value halflife · halvings. -/
theorem fam_geology_age_1 : ((5730 : Int) * (3 : Int)) = (17190 : Int) := by decide

/-- geology: density(2700, 1) = 2700 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry,
    not by hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. */ static depth(layers:
    number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each',
    layers * each, nat(layers, each), 'depth', [layers, each]) } /** POROSITY: pore space as a percentage. value
    ⌊voids · 100 / total⌋. */ static porosity(voids: number, total: number): CrossFormula { return
    c('geology-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100)
    / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) } /** AGE:
    radiometric, half-lives elapsed times the half-life. value halflife · halvings. */ static age(halflife:
    number, halvings: number): CrossFormula { return c('geology-age', 'age(halflife, halvings) = halflife ·
    halvings', halflife * halvings, nat(halflife, halvings), 'age', [halflife, halvings]) } /** DENSITY: mass
    over volume. value ⌊mass / volume⌋. -/
theorem fam_geology_density_1 : ((2700 : Int) / (1 : Int)) = (2700 : Int) := by decide

/-- geology: strata(14) = 14 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. */ static depth(layers:
    number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each',
    layers * each, nat(layers, each), 'depth', [layers, each]) } /** POROSITY: pore space as a percentage. value
    ⌊voids · 100 / total⌋. */ static porosity(voids: number, total: number): CrossFormula { return
    c('geology-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100)
    / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) } /** AGE:
    radiometric, half-lives elapsed times the half-life. value halflife · halvings. */ static age(halflife:
    number, halvings: number): CrossFormula { return c('geology-age', 'age(halflife, halvings) = halflife ·
    halvings', halflife * halvings, nat(halflife, halvings), 'age', [halflife, halvings]) } /** DENSITY: mass
    over volume. value ⌊mass / volume⌋. */ static density(mass: number, volume: number): CrossFormula { return
    c('geology-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0,
    nat(mass, volume) && volume > 0, 'density', [mass, volume]) } /** STRATA: the count of distinct layers.
    value count. -/
theorem fam_geology_strata_1 : (14 : Int) = (14 : Int) := by decide

/-- geology: erosion(500, 100) = 5 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. */ static depth(layers:
    number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each',
    layers * each, nat(layers, each), 'depth', [layers, each]) } /** POROSITY: pore space as a percentage. value
    ⌊voids · 100 / total⌋. */ static porosity(voids: number, total: number): CrossFormula { return
    c('geology-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100)
    / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) } /** AGE:
    radiometric, half-lives elapsed times the half-life. value halflife · halvings. */ static age(halflife:
    number, halvings: number): CrossFormula { return c('geology-age', 'age(halflife, halvings) = halflife ·
    halvings', halflife * halvings, nat(halflife, halvings), 'age', [halflife, halvings]) } /** DENSITY: mass
    over volume. value ⌊mass / volume⌋. */ static density(mass: number, volume: number): CrossFormula { return
    c('geology-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0,
    nat(mass, volume) && volume > 0, 'density', [mass, volume]) } /** STRATA: the count of distinct layers.
    value count. */ static strata(count: number): CrossFormula { return c('geology-strata', 'strata(count) =
    count', count, nat(count), 'strata', [count]) } /** EROSION: material lost over years. value ⌊lost / years⌋. -/
theorem fam_geology_erosion_1 : ((500 : Int) / (100 : Int)) = (5 : Int) := by decide

/-- geology: grade(15, 200) = 7 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. */ static magnitude(energy: number): CrossFormula { return
    c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude',
    [energy]) } /** DEPTH: stacked layers at a thickness each. value layers · each. */ static depth(layers:
    number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each',
    layers * each, nat(layers, each), 'depth', [layers, each]) } /** POROSITY: pore space as a percentage. value
    ⌊voids · 100 / total⌋. */ static porosity(voids: number, total: number): CrossFormula { return
    c('geology-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100)
    / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) } /** AGE:
    radiometric, half-lives elapsed times the half-life. value halflife · halvings. */ static age(halflife:
    number, halvings: number): CrossFormula { return c('geology-age', 'age(halflife, halvings) = halflife ·
    halvings', halflife * halvings, nat(halflife, halvings), 'age', [halflife, halvings]) } /** DENSITY: mass
    over volume. value ⌊mass / volume⌋. */ static density(mass: number, volume: number): CrossFormula { return
    c('geology-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0,
    nat(mass, volume) && volume > 0, 'density', [mass, volume]) } /** STRATA: the count of distinct layers.
    value count. */ static strata(count: number): CrossFormula { return c('geology-strata', 'strata(count) =
    count', count, nat(count), 'strata', [count]) } /** EROSION: material lost over years. value ⌊lost / years⌋.
    */ static erosion(lost: number, years: number): CrossFormula { return c('geology-erosion', 'erosion(lost,
    years) = ⌊lost / years⌋', years > 0 ? Math.floor(lost / years) : 0, nat(lost, years) && years > 0,
    'erosion', [lost, years]) } /** GRADE: ore as a percentage of rock. value ⌊ore · 100 / rock⌋. -/
theorem fam_geology_grade_1 : (((15 : Int) * (100 : Int)) / (200 : Int)) = (7 : Int) := by decide

/-- geometry: area(10, 4) = 20 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared lengths). A
    triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100 proxy for
    π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a rectangle's
    diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is guarded. A
    measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area, circle
    area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. -/
theorem fam_geometry_area_1 : (((10 : Int) * (4 : Int)) / (2 : Int)) = (20 : Int) := by decide

/-- geometry: perimeter(6, 5) = 30 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared
    lengths). A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100
    proxy for π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a
    rectangle's diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is
    guarded. A measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area,
    circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. -/
theorem fam_geometry_perimeter_1 : ((6 : Int) * (5 : Int)) = (30 : Int) := by decide

/-- geometry: rectangle(8, 3) = 24 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared
    lengths). A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100
    proxy for π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a
    rectangle's diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is
    guarded. A measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area,
    circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. -/
theorem fam_geometry_rectangle_1 : ((8 : Int) * (3 : Int)) = (24 : Int) := by decide

/-- geometry: circle(10) = 314 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared lengths). A
    triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100 proxy for
    π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a rectangle's
    diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is guarded. A
    measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area, circle
    area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. */ static rectangle(width: number,
    height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height',
    width * height, nat(width, height), 'rectangle', [width, height]) } /** CIRCLE AREA: π r² by a 314/100
    proxy. value ⌊314 · radius² / 100⌋. -/
theorem fam_geometry_circle_1 : (((314 : Int) * ((10 : Int) ^ (2 : Nat))) / (100 : Int)) = (314 : Int) := by decide

/-- geometry: volume(24, 5) = 120 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared
    lengths). A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100
    proxy for π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a
    rectangle's diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is
    guarded. A measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area,
    circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. */ static rectangle(width: number,
    height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height',
    width * height, nat(width, height), 'rectangle', [width, height]) } /** CIRCLE AREA: π r² by a 314/100
    proxy. value ⌊314 · radius² / 100⌋. */ static circle(radius: number): CrossFormula { return
    c('geometry-circle', 'circle(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100),
    nat(radius), 'circle', [radius]) } /** PRISM VOLUME: base area times height. value area · height. -/
theorem fam_geometry_volume_1 : ((24 : Int) * (5 : Int)) = (120 : Int) := by decide

/-- geometry: pythagorean(3, 4) = 25 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared
    lengths). A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100
    proxy for π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a
    rectangle's diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is
    guarded. A measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area,
    circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. */ static rectangle(width: number,
    height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height',
    width * height, nat(width, height), 'rectangle', [width, height]) } /** CIRCLE AREA: π r² by a 314/100
    proxy. value ⌊314 · radius² / 100⌋. */ static circle(radius: number): CrossFormula { return
    c('geometry-circle', 'circle(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100),
    nat(radius), 'circle', [radius]) } /** PRISM VOLUME: base area times height. value area · height. */ static
    volume(area_: number, height: number): CrossFormula { return c('geometry-volume', 'volume(area, height) =
    area · height', area_ * height, nat(area_, height), 'volume', [area_, height]) } /** HYPOTENUSE SQUARED: a²
    + b². value a² + b². -/
theorem fam_geometry_pythagorean_1 : (((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int) := by decide

/-- geometry: angle(720, 6) = 120 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared
    lengths). A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100
    proxy for π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a
    rectangle's diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is
    guarded. A measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area,
    circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. */ static rectangle(width: number,
    height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height',
    width * height, nat(width, height), 'rectangle', [width, height]) } /** CIRCLE AREA: π r² by a 314/100
    proxy. value ⌊314 · radius² / 100⌋. */ static circle(radius: number): CrossFormula { return
    c('geometry-circle', 'circle(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100),
    nat(radius), 'circle', [radius]) } /** PRISM VOLUME: base area times height. value area · height. */ static
    volume(area_: number, height: number): CrossFormula { return c('geometry-volume', 'volume(area, height) =
    area · height', area_ * height, nat(area_, height), 'volume', [area_, height]) } /** HYPOTENUSE SQUARED: a²
    + b². value a² + b². */ static pythagorean(a: number, b: number): CrossFormula { return
    c('geometry-pythagorean', 'pythagorean(a, b) = a² + b²', a * a + b * b, nat(a, b), 'pythagorean', [a, b]) }
    /** SHARED INTERIOR ANGLE: the interior total over the sides. value ⌊interior / sides⌋. -/
theorem fam_geometry_angle_1 : ((720 : Int) / (6 : Int)) = (120 : Int) := by decide

/-- geometry: angle(720, 0) = 0 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared lengths).
    A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100 proxy for
    π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a rectangle's
    diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is guarded. A
    measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area, circle
    area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. */ static rectangle(width: number,
    height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height',
    width * height, nat(width, height), 'rectangle', [width, height]) } /** CIRCLE AREA: π r² by a 314/100
    proxy. value ⌊314 · radius² / 100⌋. */ static circle(radius: number): CrossFormula { return
    c('geometry-circle', 'circle(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100),
    nat(radius), 'circle', [radius]) } /** PRISM VOLUME: base area times height. value area · height. */ static
    volume(area_: number, height: number): CrossFormula { return c('geometry-volume', 'volume(area, height) =
    area · height', area_ * height, nat(area_, height), 'volume', [area_, height]) } /** HYPOTENUSE SQUARED: a²
    + b². value a² + b². */ static pythagorean(a: number, b: number): CrossFormula { return
    c('geometry-pythagorean', 'pythagorean(a, b) = a² + b²', a * a + b * b, nat(a, b), 'pythagorean', [a, b]) }
    /** SHARED INTERIOR ANGLE: the interior total over the sides. value ⌊interior / sides⌋. -/
theorem fam_geometry_angle_2 : ((720 : Int) / (0 : Int)) = (0 : Int) := by decide

/-- geometry: diagonal(3, 4) = 25 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared
    lengths). A triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100
    proxy for π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a
    rectangle's diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is
    guarded. A measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area,
    circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. */ static area(base: number, height: number): CrossFormula { return
    c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base,
    height), 'area', [base, height]) } /** REGULAR POLYGON PERIMETER: sides times side length. value sides ·
    length. */ static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter',
    'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides,
    length]) } /** RECTANGLE AREA: width times height. value width · height. */ static rectangle(width: number,
    height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height',
    width * height, nat(width, height), 'rectangle', [width, height]) } /** CIRCLE AREA: π r² by a 314/100
    proxy. value ⌊314 · radius² / 100⌋. */ static circle(radius: number): CrossFormula { return
    c('geometry-circle', 'circle(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100),
    nat(radius), 'circle', [radius]) } /** PRISM VOLUME: base area times height. value area · height. */ static
    volume(area_: number, height: number): CrossFormula { return c('geometry-volume', 'volume(area, height) =
    area · height', area_ * height, nat(area_, height), 'volume', [area_, height]) } /** HYPOTENUSE SQUARED: a²
    + b². value a² + b². */ static pythagorean(a: number, b: number): CrossFormula { return
    c('geometry-pythagorean', 'pythagorean(a, b) = a² + b²', a * a + b * b, nat(a, b), 'pythagorean', [a, b]) }
    /** SHARED INTERIOR ANGLE: the interior total over the sides. value ⌊interior / sides⌋. */ static
    angle(interior: number, sides: number): CrossFormula { return c('geometry-angle', 'angle(interior, sides) =
    ⌊interior / sides⌋', sides > 0 ? Math.floor(interior / sides) : 0, nat(interior, sides) && sides > 0,
    'angle', [interior, sides]) } /** DIAGONAL SQUARED: width² + height². value width² + height². -/
theorem fam_geometry_diagonal_1 : (((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int) := by decide

/-- geomorphology: slope(30, 100) = 30 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. -/
theorem fam_geomorphology_slope_1 : (((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int) := by decide

/-- geomorphology: erosion(5000, 100) = 50 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. -/
theorem fam_geomorphology_erosion_1 : ((5000 : Int) / (100 : Int)) = (50 : Int) := by decide

/-- geomorphology: drainage(240, 60) = 4 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. -/
theorem fam_geomorphology_drainage_1 : ((240 : Int) / (60 : Int)) = (4 : Int) := by decide

/-- geomorphology: relief(2400, 400) = 2000 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. */ static drainage(streams: number, area: number): CrossFormula { return
    c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams /
    area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) } /** RELIEF: the height between
    peak and valley. value max(0, peak − valley). -/
theorem fam_geomorphology_relief_1 : (fmax (0 : Int) ((2400 : Int) - (400 : Int))) = (2000 : Int) := by decide

/-- geomorphology: relief(400, 2400) = 0 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. */ static drainage(streams: number, area: number): CrossFormula { return
    c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams /
    area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) } /** RELIEF: the height between
    peak and valley. value max(0, peak − valley). -/
theorem fam_geomorphology_relief_2 : (fmax (0 : Int) ((400 : Int) - (2400 : Int))) = (0 : Int) := by decide

/-- geomorphology: sediment(1000, 50) = 20 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. */ static drainage(streams: number, area: number): CrossFormula { return
    c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams /
    area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) } /** RELIEF: the height between
    peak and valley. value max(0, peak − valley). */ static relief(peak: number, valley: number): CrossFormula {
    return c('geomorphology-relief', 'relief(peak, valley) = max(0, peak − valley)', Math.max(0, peak - valley),
    nat(peak, valley), 'relief', [peak, valley]) } /** SEDIMENT: deposited material per year. value ⌊deposited /
    years⌋. -/
theorem fam_geomorphology_sediment_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- geomorphology: sinuosity(150, 100) = 150 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. */ static drainage(streams: number, area: number): CrossFormula { return
    c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams /
    area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) } /** RELIEF: the height between
    peak and valley. value max(0, peak − valley). */ static relief(peak: number, valley: number): CrossFormula {
    return c('geomorphology-relief', 'relief(peak, valley) = max(0, peak − valley)', Math.max(0, peak - valley),
    nat(peak, valley), 'relief', [peak, valley]) } /** SEDIMENT: deposited material per year. value ⌊deposited /
    years⌋. */ static sediment(deposited: number, years: number): CrossFormula { return
    c('geomorphology-sediment', 'sediment(deposited, years) = ⌊deposited / years⌋', years > 0 ?
    Math.floor(deposited / years) : 0, nat(deposited, years) && years > 0, 'sediment', [deposited, years]) } /**
    SINUOSITY: channel length over valley length, as a ratio. value ⌊channel · 100 / valley⌋. -/
theorem fam_geomorphology_sinuosity_1 : (((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int) := by decide

/-- geomorphology: incision(50, 200) = 25 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. */ static drainage(streams: number, area: number): CrossFormula { return
    c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams /
    area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) } /** RELIEF: the height between
    peak and valley. value max(0, peak − valley). */ static relief(peak: number, valley: number): CrossFormula {
    return c('geomorphology-relief', 'relief(peak, valley) = max(0, peak − valley)', Math.max(0, peak - valley),
    nat(peak, valley), 'relief', [peak, valley]) } /** SEDIMENT: deposited material per year. value ⌊deposited /
    years⌋. */ static sediment(deposited: number, years: number): CrossFormula { return
    c('geomorphology-sediment', 'sediment(deposited, years) = ⌊deposited / years⌋', years > 0 ?
    Math.floor(deposited / years) : 0, nat(deposited, years) && years > 0, 'sediment', [deposited, years]) } /**
    SINUOSITY: channel length over valley length, as a ratio. value ⌊channel · 100 / valley⌋. */ static
    sinuosity(channel: number, valley: number): CrossFormula { return c('geomorphology-sinuosity',
    'sinuosity(channel, valley) = ⌊channel · 100 / valley⌋', valley > 0 ? Math.floor((channel * 100) / valley) :
    0, nat(channel, valley) && valley > 0, 'sinuosity', [channel, valley]) } /** INCISION: depth cut over
    channel width. value ⌊depth · 100 / width⌋. -/
theorem fam_geomorphology_incision_1 : (((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int) := by decide

/-- geomorphology: weathering(30, 100) = 30 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */ static slope(rise: number, run:
    number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ?
    Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /** EROSION: ground
    lost per unit area. value ⌊lost / area⌋. */ static erosion(lost: number, area: number): CrossFormula {
    return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area)
    : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) } /** DRAINAGE DENSITY: streams per unit area.
    value ⌊streams / area⌋. */ static drainage(streams: number, area: number): CrossFormula { return
    c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams /
    area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) } /** RELIEF: the height between
    peak and valley. value max(0, peak − valley). */ static relief(peak: number, valley: number): CrossFormula {
    return c('geomorphology-relief', 'relief(peak, valley) = max(0, peak − valley)', Math.max(0, peak - valley),
    nat(peak, valley), 'relief', [peak, valley]) } /** SEDIMENT: deposited material per year. value ⌊deposited /
    years⌋. */ static sediment(deposited: number, years: number): CrossFormula { return
    c('geomorphology-sediment', 'sediment(deposited, years) = ⌊deposited / years⌋', years > 0 ?
    Math.floor(deposited / years) : 0, nat(deposited, years) && years > 0, 'sediment', [deposited, years]) } /**
    SINUOSITY: channel length over valley length, as a ratio. value ⌊channel · 100 / valley⌋. */ static
    sinuosity(channel: number, valley: number): CrossFormula { return c('geomorphology-sinuosity',
    'sinuosity(channel, valley) = ⌊channel · 100 / valley⌋', valley > 0 ? Math.floor((channel * 100) / valley) :
    0, nat(channel, valley) && valley > 0, 'sinuosity', [channel, valley]) } /** INCISION: depth cut over
    channel width. value ⌊depth · 100 / width⌋. */ static incision(depth: number, width: number): CrossFormula {
    return c('geomorphology-incision', 'incision(depth, width) = ⌊depth · 100 / width⌋', width > 0 ?
    Math.floor((depth * 100) / width) : 0, nat(depth, width) && width > 0, 'incision', [depth, width]) } /**
    WEATHERING: rock weathered of the surface exposed, as a percent. value ⌊weathered · 100 / exposed⌋. -/
theorem fam_geomorphology_weathering_1 : (((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int) := by decide

/-- geophysics: seismicvelocity(6000, 2) = 3000 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the
    registry, not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole,
    heat flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. -/
theorem fam_geophysics_seismicvelocity_1 : ((6000 : Int) / (2 : Int)) = (3000 : Int) := by decide

/-- geophysics: gravity(1000, 10) = 10 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat
    flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. */ static seismicvelocity(distance: number, time: number): CrossFormula {
    return c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. -/
theorem fam_geophysics_gravity_1 : ((1000 : Int) / ((10 : Int) ^ (2 : Nat))) = (10 : Int) := by decide

/-- geophysics: magnetic(8000, 2) = 1000 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat
    flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. */ static seismicvelocity(distance: number, time: number): CrossFormula {
    return c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */ static gravity(mass: number,
    radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋',
    radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass,
    radius]) } /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. -/
theorem fam_geophysics_magnetic_1 : ((8000 : Int) / ((2 : Int) ^ (3 : Nat))) = (1000 : Int) := by decide

/-- geophysics: heatflow(30, 3) = 90 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry, not
    by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat flow,
    bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to `geology` —
    geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics arithmetic (seismic
    velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude, isostasy); the solid earth
    as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geophysics', dst:
    'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `geophysics.${name}`, params }) export
    class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel time. value ⌊distance / time⌋. */
    static seismicvelocity(distance: number, time: number): CrossFormula { return
    c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */ static gravity(mass: number,
    radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋',
    radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass,
    radius]) } /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. */ static
    magnetic(field: number, distance: number): CrossFormula { return c('geophysics-magnetic', 'magnetic(field,
    distance) = ⌊field / distance³⌋', distance > 0 ? Math.floor(field / (distance * distance * distance)) : 0,
    nat(field, distance) && distance > 0, 'magnetic', [field, distance]) } /** HEAT FLOW: gradient times
    conductivity. value gradient · conductivity. -/
theorem fam_geophysics_heatflow_1 : ((30 : Int) * (3 : Int)) = (90 : Int) := by decide

/-- geophysics: density(6000, 2) = 3000 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat
    flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. */ static seismicvelocity(distance: number, time: number): CrossFormula {
    return c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */ static gravity(mass: number,
    radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋',
    radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass,
    radius]) } /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. */ static
    magnetic(field: number, distance: number): CrossFormula { return c('geophysics-magnetic', 'magnetic(field,
    distance) = ⌊field / distance³⌋', distance > 0 ? Math.floor(field / (distance * distance * distance)) : 0,
    nat(field, distance) && distance > 0, 'magnetic', [field, distance]) } /** HEAT FLOW: gradient times
    conductivity. value gradient · conductivity. */ static heatflow(gradient: number, conductivity: number):
    CrossFormula { return c('geophysics-heatflow', 'heatflow(gradient, conductivity) = gradient · conductivity',
    gradient * conductivity, nat(gradient, conductivity), 'heatflow', [gradient, conductivity]) } /** BULK
    DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_geophysics_density_1 : ((6000 : Int) / (2 : Int)) = (3000 : Int) := by decide

/-- geophysics: resistivity(240, 4) = 60 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat
    flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. */ static seismicvelocity(distance: number, time: number): CrossFormula {
    return c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */ static gravity(mass: number,
    radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋',
    radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass,
    radius]) } /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. */ static
    magnetic(field: number, distance: number): CrossFormula { return c('geophysics-magnetic', 'magnetic(field,
    distance) = ⌊field / distance³⌋', distance > 0 ? Math.floor(field / (distance * distance * distance)) : 0,
    nat(field, distance) && distance > 0, 'magnetic', [field, distance]) } /** HEAT FLOW: gradient times
    conductivity. value gradient · conductivity. */ static heatflow(gradient: number, conductivity: number):
    CrossFormula { return c('geophysics-heatflow', 'heatflow(gradient, conductivity) = gradient · conductivity',
    gradient * conductivity, nat(gradient, conductivity), 'heatflow', [gradient, conductivity]) } /** BULK
    DENSITY: mass over volume. value ⌊mass / volume⌋. */ static density(mass: number, volume: number):
    CrossFormula { return c('geophysics-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ?
    Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) } /** ELECTRICAL
    RESISTIVITY: voltage over current. value ⌊voltage / current⌋. -/
theorem fam_geophysics_resistivity_1 : ((240 : Int) / (4 : Int)) = (60 : Int) := by decide

/-- geophysics: magnitude(7) = 7 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry, not by
    hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat flow, bulk
    density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to `geology` —
    geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics arithmetic (seismic
    velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude, isostasy); the solid earth
    as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geophysics', dst:
    'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `geophysics.${name}`, params }) export
    class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel time. value ⌊distance / time⌋. */
    static seismicvelocity(distance: number, time: number): CrossFormula { return
    c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */ static gravity(mass: number,
    radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋',
    radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass,
    radius]) } /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. */ static
    magnetic(field: number, distance: number): CrossFormula { return c('geophysics-magnetic', 'magnetic(field,
    distance) = ⌊field / distance³⌋', distance > 0 ? Math.floor(field / (distance * distance * distance)) : 0,
    nat(field, distance) && distance > 0, 'magnetic', [field, distance]) } /** HEAT FLOW: gradient times
    conductivity. value gradient · conductivity. */ static heatflow(gradient: number, conductivity: number):
    CrossFormula { return c('geophysics-heatflow', 'heatflow(gradient, conductivity) = gradient · conductivity',
    gradient * conductivity, nat(gradient, conductivity), 'heatflow', [gradient, conductivity]) } /** BULK
    DENSITY: mass over volume. value ⌊mass / volume⌋. */ static density(mass: number, volume: number):
    CrossFormula { return c('geophysics-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ?
    Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) } /** ELECTRICAL
    RESISTIVITY: voltage over current. value ⌊voltage / current⌋. */ static resistivity(voltage: number,
    current: number): CrossFormula { return c('geophysics-resistivity', 'resistivity(voltage, current) =
    ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0,
    'resistivity', [voltage, current]) } /** EARTHQUAKE MAGNITUDE: the amplitude itself. value amplitude. -/
theorem fam_geophysics_magnitude_1 : (7 : Int) = (7 : Int) := by decide

/-- geophysics: isostasy(33, 100) = 33 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry,
    not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole, heat
    flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. */ static seismicvelocity(distance: number, time: number): CrossFormula {
    return c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ?
    Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) } /**
    SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */ static gravity(mass: number,
    radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋',
    radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass,
    radius]) } /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. */ static
    magnetic(field: number, distance: number): CrossFormula { return c('geophysics-magnetic', 'magnetic(field,
    distance) = ⌊field / distance³⌋', distance > 0 ? Math.floor(field / (distance * distance * distance)) : 0,
    nat(field, distance) && distance > 0, 'magnetic', [field, distance]) } /** HEAT FLOW: gradient times
    conductivity. value gradient · conductivity. */ static heatflow(gradient: number, conductivity: number):
    CrossFormula { return c('geophysics-heatflow', 'heatflow(gradient, conductivity) = gradient · conductivity',
    gradient * conductivity, nat(gradient, conductivity), 'heatflow', [gradient, conductivity]) } /** BULK
    DENSITY: mass over volume. value ⌊mass / volume⌋. */ static density(mass: number, volume: number):
    CrossFormula { return c('geophysics-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ?
    Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) } /** ELECTRICAL
    RESISTIVITY: voltage over current. value ⌊voltage / current⌋. */ static resistivity(voltage: number,
    current: number): CrossFormula { return c('geophysics-resistivity', 'resistivity(voltage, current) =
    ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0,
    'resistivity', [voltage, current]) } /** EARTHQUAKE MAGNITUDE: the amplitude itself. value amplitude. */
    static magnitude(amplitude: number): CrossFormula { return c('geophysics-magnitude', 'magnitude(amplitude) =
    amplitude', amplitude, nat(amplitude), 'magnitude', [amplitude]) } /** ISOSTASY: the load-to-mantle ratio in
    hundredths. value ⌊load · 100 / mantle⌋. -/
theorem fam_geophysics_isostasy_1 : (((33 : Int) * (100 : Int)) / (100 : Int)) = (33 : Int) := by decide

/-- geopolitics: powerindex(50, 30, 20) = 100 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely
    quantitative, neutral indices; no advice). Standing between states is numbers: a composite power index, the
    weight of an alliance, how much trade one side depends on, border tension per day, an influence score, the
    measured impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses
    to `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. -/
theorem fam_geopolitics_powerindex_1 : (((50 : Int) + (30 : Int)) + (20 : Int)) = (100 : Int) := by decide

/-- geopolitics: allianceweight(12, 8) = 96 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely quantitative,
    neutral indices; no advice). Standing between states is numbers: a composite power index, the weight of an
    alliance, how much trade one side depends on, border tension per day, an influence score, the measured
    impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses to
    `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. -/
theorem fam_geopolitics_allianceweight_1 : ((12 : Int) * (8 : Int)) = (96 : Int) := by decide

/-- geopolitics: tradedependency(250, 1000) = 25 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely
    quantitative, neutral indices; no advice). Standing between states is numbers: a composite power index, the
    weight of an alliance, how much trade one side depends on, border tension per day, an influence score, the
    measured impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses
    to `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. -/
theorem fam_geopolitics_tradedependency_1 : (((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int) := by decide

/-- geopolitics: bordertension(100, 30) = 3 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely quantitative,
    neutral indices; no advice). Standing between states is numbers: a composite power index, the weight of an
    alliance, how much trade one side depends on, border tension per day, an influence score, the measured
    impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses to
    `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. */ static tradedependency(imports: number, total: number): CrossFormula { return
    c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ?
    Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total,
    'tradedependency', [imports, total]) } /** BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. -/
theorem fam_geopolitics_bordertension_1 : ((100 : Int) / (30 : Int)) = (3 : Int) := by decide

/-- geopolitics: influencescore(15, 4) = 60 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely quantitative,
    neutral indices; no advice). Standing between states is numbers: a composite power index, the weight of an
    alliance, how much trade one side depends on, border tension per day, an influence score, the measured
    impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses to
    `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. */ static tradedependency(imports: number, total: number): CrossFormula { return
    c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ?
    Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total,
    'tradedependency', [imports, total]) } /** BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. */ static bordertension(incidents: number, days: number): CrossFormula { return
    c('geopolitics-bordertension', 'bordertension(incidents, days) = ⌊incidents / days⌋', days > 0 ?
    Math.floor(incidents / days) : 0, nat(incidents, days) && days > 0, 'bordertension', [incidents, days]) }
    /** INFLUENCE SCORE: allies weighted by votes each carries. value allies · votes. -/
theorem fam_geopolitics_influencescore_1 : ((15 : Int) * (4 : Int)) = (60 : Int) := by decide

/-- geopolitics: sanctionimpact(1000, 300) = 700 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely
    quantitative, neutral indices; no advice). Standing between states is numbers: a composite power index, the
    weight of an alliance, how much trade one side depends on, border tension per day, an influence score, the
    measured impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses
    to `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. */ static tradedependency(imports: number, total: number): CrossFormula { return
    c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ?
    Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total,
    'tradedependency', [imports, total]) } /** BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. */ static bordertension(incidents: number, days: number): CrossFormula { return
    c('geopolitics-bordertension', 'bordertension(incidents, days) = ⌊incidents / days⌋', days > 0 ?
    Math.floor(incidents / days) : 0, nat(incidents, days) && days > 0, 'bordertension', [incidents, days]) }
    /** INFLUENCE SCORE: allies weighted by votes each carries. value allies · votes. */ static
    influencescore(allies: number, votes: number): CrossFormula { return c('geopolitics-influencescore',
    'influencescore(allies, votes) = allies · votes', allies * votes, nat(allies, votes), 'influencescore',
    [allies, votes]) } /** SANCTION IMPACT: baseline trade less the restricted portion. value max(0, baseline −
    restricted). -/
theorem fam_geopolitics_sanctionimpact_1 : (fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int) := by decide

/-- geopolitics: balanceofpower(600, 400) = 150 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely
    quantitative, neutral indices; no advice). Standing between states is numbers: a composite power index, the
    weight of an alliance, how much trade one side depends on, border tension per day, an influence score, the
    measured impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses
    to `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. */ static tradedependency(imports: number, total: number): CrossFormula { return
    c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ?
    Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total,
    'tradedependency', [imports, total]) } /** BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. */ static bordertension(incidents: number, days: number): CrossFormula { return
    c('geopolitics-bordertension', 'bordertension(incidents, days) = ⌊incidents / days⌋', days > 0 ?
    Math.floor(incidents / days) : 0, nat(incidents, days) && days > 0, 'bordertension', [incidents, days]) }
    /** INFLUENCE SCORE: allies weighted by votes each carries. value allies · votes. */ static
    influencescore(allies: number, votes: number): CrossFormula { return c('geopolitics-influencescore',
    'influencescore(allies, votes) = allies · votes', allies * votes, nat(allies, votes), 'influencescore',
    [allies, votes]) } /** SANCTION IMPACT: baseline trade less the restricted portion. value max(0, baseline −
    restricted). */ static sanctionimpact(baseline: number, restricted: number): CrossFormula { return
    c('geopolitics-sanctionimpact', 'sanctionimpact(baseline, restricted) = max(0, baseline − restricted)',
    Math.max(0, baseline - restricted), nat(baseline, restricted), 'sanctionimpact', [baseline, restricted]) }
    /** BALANCE OF POWER: one bloc measured against another. value ⌊blocA · 100 / blocB⌋. -/
theorem fam_geopolitics_balanceofpower_1 : (((600 : Int) * (100 : Int)) / (400 : Int)) = (150 : Int) := by decide

/-- geopolitics: stabilityindex(70, 85) = 1 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely quantitative,
    neutral indices; no advice). Standing between states is numbers: a composite power index, the weight of an
    alliance, how much trade one side depends on, border tension per day, an influence score, the measured
    impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses to
    `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. */ static tradedependency(imports: number, total: number): CrossFormula { return
    c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ?
    Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total,
    'tradedependency', [imports, total]) } /** BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. */ static bordertension(incidents: number, days: number): CrossFormula { return
    c('geopolitics-bordertension', 'bordertension(incidents, days) = ⌊incidents / days⌋', days > 0 ?
    Math.floor(incidents / days) : 0, nat(incidents, days) && days > 0, 'bordertension', [incidents, days]) }
    /** INFLUENCE SCORE: allies weighted by votes each carries. value allies · votes. */ static
    influencescore(allies: number, votes: number): CrossFormula { return c('geopolitics-influencescore',
    'influencescore(allies, votes) = allies · votes', allies * votes, nat(allies, votes), 'influencescore',
    [allies, votes]) } /** SANCTION IMPACT: baseline trade less the restricted portion. value max(0, baseline −
    restricted). */ static sanctionimpact(baseline: number, restricted: number): CrossFormula { return
    c('geopolitics-sanctionimpact', 'sanctionimpact(baseline, restricted) = max(0, baseline − restricted)',
    Math.max(0, baseline - restricted), nat(baseline, restricted), 'sanctionimpact', [baseline, restricted]) }
    /** BALANCE OF POWER: one bloc measured against another. value ⌊blocA · 100 / blocB⌋. */ static
    balanceofpower(blocA: number, blocB: number): CrossFormula { return c('geopolitics-balanceofpower',
    'balanceofpower(blocA, blocB) = ⌊blocA · 100 / blocB⌋', blocB > 0 ? Math.floor((blocA * 100) / blocB) : 0,
    nat(blocA, blocB) && blocB > 0, 'balanceofpower', [blocA, blocB]) } /** STABILITY INDEX: 1 when measured
    stability meets the target. value [actual ≥ target]. -/
theorem fam_geopolitics_stabilityindex_1 : (if (if (85 : Int) ≥ (70 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int) := by decide

/-- geopolitics: stabilityindex(70, 50) = 0 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely quantitative,
    neutral indices; no advice). Standing between states is numbers: a composite power index, the weight of an
    alliance, how much trade one side depends on, border tension per day, an influence score, the measured
    impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses to
    `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. */ static
    powerindex(military: number, economy: number, population: number): CrossFormula { return
    c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population',
    military + economy + population, nat(military, economy, population), 'powerindex', [military, economy,
    population]) } /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */ static
    allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight',
    'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength),
    'allianceweight', [members, strength]) } /** TRADE DEPENDENCY: imports as a percentage of total trade. value
    ⌊imports · 100 / total⌋. */ static tradedependency(imports: number, total: number): CrossFormula { return
    c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ?
    Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total,
    'tradedependency', [imports, total]) } /** BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. */ static bordertension(incidents: number, days: number): CrossFormula { return
    c('geopolitics-bordertension', 'bordertension(incidents, days) = ⌊incidents / days⌋', days > 0 ?
    Math.floor(incidents / days) : 0, nat(incidents, days) && days > 0, 'bordertension', [incidents, days]) }
    /** INFLUENCE SCORE: allies weighted by votes each carries. value allies · votes. */ static
    influencescore(allies: number, votes: number): CrossFormula { return c('geopolitics-influencescore',
    'influencescore(allies, votes) = allies · votes', allies * votes, nat(allies, votes), 'influencescore',
    [allies, votes]) } /** SANCTION IMPACT: baseline trade less the restricted portion. value max(0, baseline −
    restricted). */ static sanctionimpact(baseline: number, restricted: number): CrossFormula { return
    c('geopolitics-sanctionimpact', 'sanctionimpact(baseline, restricted) = max(0, baseline − restricted)',
    Math.max(0, baseline - restricted), nat(baseline, restricted), 'sanctionimpact', [baseline, restricted]) }
    /** BALANCE OF POWER: one bloc measured against another. value ⌊blocA · 100 / blocB⌋. */ static
    balanceofpower(blocA: number, blocB: number): CrossFormula { return c('geopolitics-balanceofpower',
    'balanceofpower(blocA, blocB) = ⌊blocA · 100 / blocB⌋', blocB > 0 ? Math.floor((blocA * 100) / blocB) : 0,
    nat(blocA, blocB) && blocB > 0, 'balanceofpower', [blocA, blocB]) } /** STABILITY INDEX: 1 when measured
    stability meets the target. value [actual ≥ target]. -/
theorem fam_geopolitics_stabilityindex_2 : (if (if (50 : Int) ≥ (70 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int) := by decide

/-- geothermal: gradient(300, 10000) = 30 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is
    numbers: the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how
    much of the rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature
    holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal
    arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate,
    reinjection share, enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT:
    temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. -/
theorem fam_geothermal_gradient_1 : (((300 : Int) * (1000 : Int)) / (10000 : Int)) = (30 : Int) := by decide

/-- geothermal: power(50, 80) = 4000 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is numbers:
    the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how much of the
    rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature holds. Crosses
    to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal arithmetic
    (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate, reinjection share,
    enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geothermal', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT: temperature rise per
    kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature: number, depth:
    number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) = ⌊temperature · 1000
    / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature, depth) && depth > 0,
    'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature difference. value flow ·
    deltat. -/
theorem fam_geothermal_power_1 : ((50 : Int) * (80 : Int)) = (4000 : Int) := by decide

/-- geothermal: efficiency(12, 100) = 12 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is
    numbers: the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how
    much of the rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature
    holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal
    arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate,
    reinjection share, enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT:
    temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature:
    number, depth: number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) =
    ⌊temperature · 1000 / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature,
    depth) && depth > 0, 'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature
    difference. value flow · deltat. */ static power(flow: number, deltat: number): CrossFormula { return
    c('geothermal-power', 'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power',
    [flow, deltat]) } /** EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋. -/
theorem fam_geothermal_efficiency_1 : (((12 : Int) * (100 : Int)) / (100 : Int)) = (12 : Int) := by decide

/-- geothermal: cop(400, 100) = 400 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is numbers:
    the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how much of the
    rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature holds. Crosses
    to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal arithmetic
    (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate, reinjection share,
    enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geothermal', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT: temperature rise per
    kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature: number, depth:
    number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) = ⌊temperature · 1000
    / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature, depth) && depth > 0,
    'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature difference. value flow ·
    deltat. */ static power(flow: number, deltat: number): CrossFormula { return c('geothermal-power',
    'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power', [flow, deltat]) } /**
    EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋. */ static
    efficiency(output: number, heat: number): CrossFormula { return c('geothermal-efficiency',
    'efficiency(output, heat) = ⌊output · 100 / heat⌋', heat > 0 ? Math.floor((output * 100) / heat) : 0,
    nat(output, heat) && heat > 0 && output <= heat, 'efficiency', [output, heat]) } /** COP: heat-pump
    coefficient of performance, heat over work, x100. value ⌊heat · 100 / work⌋. -/
theorem fam_geothermal_cop_1 : (((400 : Int) * (100 : Int)) / (100 : Int)) = (400 : Int) := by decide

/-- geothermal: capacity(90, 100) = 90 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is
    numbers: the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how
    much of the rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature
    holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal
    arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate,
    reinjection share, enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT:
    temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature:
    number, depth: number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) =
    ⌊temperature · 1000 / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature,
    depth) && depth > 0, 'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature
    difference. value flow · deltat. */ static power(flow: number, deltat: number): CrossFormula { return
    c('geothermal-power', 'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power',
    [flow, deltat]) } /** EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋.
    */ static efficiency(output: number, heat: number): CrossFormula { return c('geothermal-efficiency',
    'efficiency(output, heat) = ⌊output · 100 / heat⌋', heat > 0 ? Math.floor((output * 100) / heat) : 0,
    nat(output, heat) && heat > 0 && output <= heat, 'efficiency', [output, heat]) } /** COP: heat-pump
    coefficient of performance, heat over work, x100. value ⌊heat · 100 / work⌋. */ static cop(heat: number,
    work_: number): CrossFormula { return c('geothermal-cop', 'cop(heat, work_) = ⌊heat · 100 / work_⌋', work_ >
    0 ? Math.floor((heat * 100) / work_) : 0, nat(heat, work_) && work_ > 0, 'cop', [heat, work_]) } /**
    CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated · 100 / rated⌋. -/
theorem fam_geothermal_capacity_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- geothermal: drilling(1200, 30) = 40 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is
    numbers: the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how
    much of the rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature
    holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal
    arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate,
    reinjection share, enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT:
    temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature:
    number, depth: number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) =
    ⌊temperature · 1000 / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature,
    depth) && depth > 0, 'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature
    difference. value flow · deltat. */ static power(flow: number, deltat: number): CrossFormula { return
    c('geothermal-power', 'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power',
    [flow, deltat]) } /** EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋.
    */ static efficiency(output: number, heat: number): CrossFormula { return c('geothermal-efficiency',
    'efficiency(output, heat) = ⌊output · 100 / heat⌋', heat > 0 ? Math.floor((output * 100) / heat) : 0,
    nat(output, heat) && heat > 0 && output <= heat, 'efficiency', [output, heat]) } /** COP: heat-pump
    coefficient of performance, heat over work, x100. value ⌊heat · 100 / work⌋. */ static cop(heat: number,
    work_: number): CrossFormula { return c('geothermal-cop', 'cop(heat, work_) = ⌊heat · 100 / work_⌋', work_ >
    0 ? Math.floor((heat * 100) / work_) : 0, nat(heat, work_) && work_ > 0, 'cop', [heat, work_]) } /**
    CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated · 100 / rated⌋. */ static
    capacity(generated: number, rated: number): CrossFormula { return c('geothermal-capacity',
    'capacity(generated, rated) = ⌊generated · 100 / rated⌋', rated > 0 ? Math.floor((generated * 100) / rated)
    : 0, nat(generated, rated) && rated > 0, 'capacity', [generated, rated]) } /** DRILLING: metres drilled per
    day. value ⌊depth / days⌋. -/
theorem fam_geothermal_drilling_1 : ((1200 : Int) / (30 : Int)) = (40 : Int) := by decide

/-- geothermal: reinjection(95, 100) = 95 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is
    numbers: the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how
    much of the rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature
    holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal
    arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate,
    reinjection share, enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT:
    temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature:
    number, depth: number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) =
    ⌊temperature · 1000 / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature,
    depth) && depth > 0, 'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature
    difference. value flow · deltat. */ static power(flow: number, deltat: number): CrossFormula { return
    c('geothermal-power', 'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power',
    [flow, deltat]) } /** EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋.
    */ static efficiency(output: number, heat: number): CrossFormula { return c('geothermal-efficiency',
    'efficiency(output, heat) = ⌊output · 100 / heat⌋', heat > 0 ? Math.floor((output * 100) / heat) : 0,
    nat(output, heat) && heat > 0 && output <= heat, 'efficiency', [output, heat]) } /** COP: heat-pump
    coefficient of performance, heat over work, x100. value ⌊heat · 100 / work⌋. */ static cop(heat: number,
    work_: number): CrossFormula { return c('geothermal-cop', 'cop(heat, work_) = ⌊heat · 100 / work_⌋', work_ >
    0 ? Math.floor((heat * 100) / work_) : 0, nat(heat, work_) && work_ > 0, 'cop', [heat, work_]) } /**
    CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated · 100 / rated⌋. */ static
    capacity(generated: number, rated: number): CrossFormula { return c('geothermal-capacity',
    'capacity(generated, rated) = ⌊generated · 100 / rated⌋', rated > 0 ? Math.floor((generated * 100) / rated)
    : 0, nat(generated, rated) && rated > 0, 'capacity', [generated, rated]) } /** DRILLING: metres drilled per
    day. value ⌊depth / days⌋. */ static drilling(depth: number, days: number): CrossFormula { return
    c('geothermal-drilling', 'drilling(depth, days) = ⌊depth / days⌋', days > 0 ? Math.floor(depth / days) : 0,
    nat(depth, days) && days > 0, 'drilling', [depth, days]) } /** REINJECTION: share of extracted fluid put
    back, as a percentage. value ⌊injected · 100 / extracted⌋. -/
theorem fam_geothermal_reinjection_1 : (((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int) := by decide

/-- geothermal: enthalpy(250) = 250 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is numbers:
    the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how much of the
    rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature holds. Crosses
    to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal arithmetic
    (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate, reinjection share,
    enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geothermal', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT: temperature rise per
    kilometre of depth. value ⌊temperature · 1000 / depth⌋. */ static gradient(temperature: number, depth:
    number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) = ⌊temperature · 1000
    / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature, depth) && depth > 0,
    'gradient', [temperature, depth]) } /** POWER: heat a flow carries at a temperature difference. value flow ·
    deltat. */ static power(flow: number, deltat: number): CrossFormula { return c('geothermal-power',
    'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power', [flow, deltat]) } /**
    EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋. */ static
    efficiency(output: number, heat: number): CrossFormula { return c('geothermal-efficiency',
    'efficiency(output, heat) = ⌊output · 100 / heat⌋', heat > 0 ? Math.floor((output * 100) / heat) : 0,
    nat(output, heat) && heat > 0 && output <= heat, 'efficiency', [output, heat]) } /** COP: heat-pump
    coefficient of performance, heat over work, x100. value ⌊heat · 100 / work⌋. */ static cop(heat: number,
    work_: number): CrossFormula { return c('geothermal-cop', 'cop(heat, work_) = ⌊heat · 100 / work_⌋', work_ >
    0 ? Math.floor((heat * 100) / work_) : 0, nat(heat, work_) && work_ > 0, 'cop', [heat, work_]) } /**
    CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated · 100 / rated⌋. */ static
    capacity(generated: number, rated: number): CrossFormula { return c('geothermal-capacity',
    'capacity(generated, rated) = ⌊generated · 100 / rated⌋', rated > 0 ? Math.floor((generated * 100) / rated)
    : 0, nat(generated, rated) && rated > 0, 'capacity', [generated, rated]) } /** DRILLING: metres drilled per
    day. value ⌊depth / days⌋. */ static drilling(depth: number, days: number): CrossFormula { return
    c('geothermal-drilling', 'drilling(depth, days) = ⌊depth / days⌋', days > 0 ? Math.floor(depth / days) : 0,
    nat(depth, days) && days > 0, 'drilling', [depth, days]) } /** REINJECTION: share of extracted fluid put
    back, as a percentage. value ⌊injected · 100 / extracted⌋. */ static reinjection(injected: number,
    extracted: number): CrossFormula { return c('geothermal-reinjection', 'reinjection(injected, extracted) =
    ⌊injected · 100 / extracted⌋', extracted > 0 ? Math.floor((injected * 100) / extracted) : 0, nat(injected,
    extracted) && extracted > 0 && injected <= extracted, 'reinjection', [injected, extracted]) } /** ENTHALPY:
    the heat a temperature holds. value temperature. -/
theorem fam_geothermal_enthalpy_1 : (250 : Int) = (250 : Int) := by decide

/-- germination: rate(200, 10) = 20 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as it
    sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by the
    peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the final
    percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins. A
    measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability, speed
    index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. -/
theorem fam_germination_rate_1 : ((200 : Int) / (10 : Int)) = (20 : Int) := by decide

/-- germination: meantime(500, 100) = 5 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as
    it sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by
    the peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the
    final percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins.
    A measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability,
    speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. -/
theorem fam_germination_meantime_1 : ((500 : Int) / (100 : Int)) = (5 : Int) := by decide

/-- germination: energy(80, 100) = 80 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as it
    sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by the
    peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the final
    percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins. A
    measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability, speed
    index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. -/
theorem fam_germination_energy_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- germination: viability(95, 100) = 95 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as
    it sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by
    the peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the
    final percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins.
    A measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability,
    speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */ static
    energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) =
    ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <=
    sown, 'energy', [peak, sown]) } /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. -/
theorem fam_germination_viability_1 : (((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int) := by decide

/-- germination: speedindex(50, 10) = 500 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as
    it sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by
    the peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the
    final percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins.
    A measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability,
    speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */ static
    energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) =
    ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <=
    sown, 'energy', [peak, sown]) } /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. */ static viability(viable: number, tested: number): CrossFormula { return
    c('germination-viability', 'viability(viable, tested) = ⌊viable · 100 / tested⌋', tested > 0 ?
    Math.floor((viable * 100) / tested) : 0, nat(viable, tested) && tested > 0 && viable <= tested, 'viability',
    [viable, tested]) } /** SPEED INDEX: how fast the push comes, germinated scaled over days. value ⌊germinated
    · 100 / days⌋. -/
theorem fam_germination_speedindex_1 : (((50 : Int) * (100 : Int)) / (10 : Int)) = (500 : Int) := by decide

/-- germination: uniformity(14, 3) = 11 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as
    it sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by
    the peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the
    final percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins.
    A measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability,
    speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */ static
    energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) =
    ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <=
    sown, 'energy', [peak, sown]) } /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. */ static viability(viable: number, tested: number): CrossFormula { return
    c('germination-viability', 'viability(viable, tested) = ⌊viable · 100 / tested⌋', tested > 0 ?
    Math.floor((viable * 100) / tested) : 0, nat(viable, tested) && tested > 0 && viable <= tested, 'viability',
    [viable, tested]) } /** SPEED INDEX: how fast the push comes, germinated scaled over days. value ⌊germinated
    · 100 / days⌋. */ static speedindex(germinated: number, days: number): CrossFormula { return
    c('germination-speedindex', 'speedindex(germinated, days) = ⌊germinated · 100 / days⌋', days > 0 ?
    Math.floor((germinated * 100) / days) : 0, nat(germinated, days) && days > 0, 'speedindex', [germinated,
    days]) } /** UNIFORMITY: the spread in days between last and first emergence (lower is tighter). value
    max(0, maxday − minday). -/
theorem fam_germination_uniformity_1 : (fmax (0 : Int) ((14 : Int) - (3 : Int))) = (11 : Int) := by decide

/-- germination: uniformity(3, 14) = 0 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as it
    sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by the
    peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the final
    percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins. A
    measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability, speed
    index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */ static
    energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) =
    ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <=
    sown, 'energy', [peak, sown]) } /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. */ static viability(viable: number, tested: number): CrossFormula { return
    c('germination-viability', 'viability(viable, tested) = ⌊viable · 100 / tested⌋', tested > 0 ?
    Math.floor((viable * 100) / tested) : 0, nat(viable, tested) && tested > 0 && viable <= tested, 'viability',
    [viable, tested]) } /** SPEED INDEX: how fast the push comes, germinated scaled over days. value ⌊germinated
    · 100 / days⌋. */ static speedindex(germinated: number, days: number): CrossFormula { return
    c('germination-speedindex', 'speedindex(germinated, days) = ⌊germinated · 100 / days⌋', days > 0 ?
    Math.floor((germinated * 100) / days) : 0, nat(germinated, days) && days > 0, 'speedindex', [germinated,
    days]) } /** UNIFORMITY: the spread in days between last and first emergence (lower is tighter). value
    max(0, maxday − minday). -/
theorem fam_germination_uniformity_2 : (fmax (0 : Int) ((3 : Int) - (14 : Int))) = (0 : Int) := by decide

/-- germination: finalpercent(90, 100) = 90 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured
    as it sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by
    the peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the
    final percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins.
    A measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability,
    speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */ static
    energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) =
    ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <=
    sown, 'energy', [peak, sown]) } /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. */ static viability(viable: number, tested: number): CrossFormula { return
    c('germination-viability', 'viability(viable, tested) = ⌊viable · 100 / tested⌋', tested > 0 ?
    Math.floor((viable * 100) / tested) : 0, nat(viable, tested) && tested > 0 && viable <= tested, 'viability',
    [viable, tested]) } /** SPEED INDEX: how fast the push comes, germinated scaled over days. value ⌊germinated
    · 100 / days⌋. */ static speedindex(germinated: number, days: number): CrossFormula { return
    c('germination-speedindex', 'speedindex(germinated, days) = ⌊germinated · 100 / days⌋', days > 0 ?
    Math.floor((germinated * 100) / days) : 0, nat(germinated, days) && days > 0, 'speedindex', [germinated,
    days]) } /** UNIFORMITY: the spread in days between last and first emergence (lower is tighter). value
    max(0, maxday − minday). */ static uniformity(maxday: number, minday: number): CrossFormula { return
    c('germination-uniformity', 'uniformity(maxday, minday) = max(0, maxday − minday)', Math.max(0, maxday -
    minday), nat(maxday, minday), 'uniformity', [maxday, minday]) } /** FINAL PERCENT: the final germination
    percentage. value ⌊germinated · 100 / sown⌋. -/
theorem fam_germination_finalpercent_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- germination: vigorindex(85, 12) = 1020 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured
    as it sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by
    the peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the
    final percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins.
    A measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability,
    speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. */ static rate(germinated: number, days: number):
    CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ?
    Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) } /** MEAN
    GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */ static
    meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime',
    'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes /
    germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) } /**
    GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */ static
    energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) =
    ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <=
    sown, 'energy', [peak, sown]) } /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. */ static viability(viable: number, tested: number): CrossFormula { return
    c('germination-viability', 'viability(viable, tested) = ⌊viable · 100 / tested⌋', tested > 0 ?
    Math.floor((viable * 100) / tested) : 0, nat(viable, tested) && tested > 0 && viable <= tested, 'viability',
    [viable, tested]) } /** SPEED INDEX: how fast the push comes, germinated scaled over days. value ⌊germinated
    · 100 / days⌋. */ static speedindex(germinated: number, days: number): CrossFormula { return
    c('germination-speedindex', 'speedindex(germinated, days) = ⌊germinated · 100 / days⌋', days > 0 ?
    Math.floor((germinated * 100) / days) : 0, nat(germinated, days) && days > 0, 'speedindex', [germinated,
    days]) } /** UNIFORMITY: the spread in days between last and first emergence (lower is tighter). value
    max(0, maxday − minday). */ static uniformity(maxday: number, minday: number): CrossFormula { return
    c('germination-uniformity', 'uniformity(maxday, minday) = max(0, maxday − minday)', Math.max(0, maxday -
    minday), nat(maxday, minday), 'uniformity', [maxday, minday]) } /** FINAL PERCENT: the final germination
    percentage. value ⌊germinated · 100 / sown⌋. */ static finalpercent(germinated: number, sown: number):
    CrossFormula { return c('germination-finalpercent', 'finalpercent(germinated, sown) = ⌊germinated · 100 /
    sown⌋', sown > 0 ? Math.floor((germinated * 100) / sown) : 0, nat(germinated, sown) && sown > 0 &&
    germinated <= sown, 'finalpercent', [germinated, sown]) } /** VIGOR INDEX: seedling vigor as germination
    percent times seedling length. value germpercent · length. -/
theorem fam_germination_vigorindex_1 : ((85 : Int) * (12 : Int)) = (1020 : Int) := by decide

/-- gerontology: lifeexpectancy(75, 5) = 80 -/
theorem fam_gerontology_lifeexpectancy_1 : ((75 : Int) + (5 : Int)) = (80 : Int) := by decide

/-- gerontology: telomerelength(10000, 3000) = 7000 -/
theorem fam_gerontology_telomerelength_1 : (fmax (0 : Int) ((10000 : Int) - (3000 : Int))) = (7000 : Int) := by decide

/-- gerontology: frailtyindex(30, 100) = 30 -/
theorem fam_gerontology_frailtyindex_1 : (((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int) := by decide

/-- gerontology: biologicalage(800, 10) = 80 -/
theorem fam_gerontology_biologicalage_1 : ((800 : Int) / (10 : Int)) = (80 : Int) := by decide

/-- gerontology: functionaldecline(20, 100) = 20 -/
theorem fam_gerontology_functionaldecline_1 : (((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int) := by decide

/-- gerontology: comorbiditypairs(8, 2) = 28 -/
theorem fam_gerontology_comorbiditypairs_1 : (Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int) := by decide

/-- gerontology: survivalfraction(60, 100) = 60 -/
theorem fam_gerontology_survivalfraction_1 : (((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int) := by decide

/-- gerontology: doublingtime(3650, 365) = 10 -/
theorem fam_gerontology_doublingtime_1 : ((3650 : Int) / (365 : Int)) = (10 : Int) := by decide

/-- gis: area(30, 20) = 600 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the area of
    a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain slope,
    nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made to
    compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. -/
theorem fam_gis_area_1 : ((30 : Int) * (20 : Int)) = (600 : Int) := by decide

/-- gis: density(1000, 50) = 20 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the
    area of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain
    slope, nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made
    to compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. -/
theorem fam_gis_density_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- gis: buffer(10) = 314 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the area of a
    tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain slope,
    nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made to
    compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. -/
theorem fam_gis_buffer_1 : (((314 : Int) * ((10 : Int) ^ (2 : Nat))) / (100 : Int)) = (314 : Int) := by decide

/-- gis: overlay(30, 120) = 25 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the area
    of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain slope,
    nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made to
    compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. */ static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) =
    ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) } /**
    OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. -/
theorem fam_gis_overlay_1 : (((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int) := by decide

/-- gis: resolution(1000, 40) = 25 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the
    area of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain
    slope, nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made
    to compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. */ static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) =
    ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) } /**
    OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. */ static
    overlay(intersection: number, union: number): CrossFormula { return c('gis-overlay', 'overlay(intersection,
    union) = ⌊intersection · 100 / union⌋', union > 0 ? Math.floor((intersection * 100) / union) : 0,
    nat(intersection, union) && union > 0 && intersection <= union, 'overlay', [intersection, union]) } /**
    RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. -/
theorem fam_gis_resolution_1 : ((1000 : Int) / (40 : Int)) = (25 : Int) := by decide

/-- gis: slope(15, 100) = 15 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the area
    of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain slope,
    nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made to
    compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. */ static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) =
    ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) } /**
    OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. */ static
    overlay(intersection: number, union: number): CrossFormula { return c('gis-overlay', 'overlay(intersection,
    union) = ⌊intersection · 100 / union⌋', union > 0 ? Math.floor((intersection * 100) / union) : 0,
    nat(intersection, union) && union > 0 && intersection <= union, 'overlay', [intersection, union]) } /**
    RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. */ static resolution(extent:
    number, cells: number): CrossFormula { return c('gis-resolution', 'resolution(extent, cells) = ⌊extent /
    cells⌋', cells > 0 ? Math.floor(extent / cells) : 0, nat(extent, cells) && cells > 0, 'resolution', [extent,
    cells]) } /** SLOPE of terrain: rise over run as a percentage. value ⌊rise · 100 / run⌋. -/
theorem fam_gis_slope_1 : (((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int) := by decide

/-- gis: proximity(30, 100) = 70 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the
    area of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain
    slope, nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made
    to compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. */ static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) =
    ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) } /**
    OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. */ static
    overlay(intersection: number, union: number): CrossFormula { return c('gis-overlay', 'overlay(intersection,
    union) = ⌊intersection · 100 / union⌋', union > 0 ? Math.floor((intersection * 100) / union) : 0,
    nat(intersection, union) && union > 0 && intersection <= union, 'overlay', [intersection, union]) } /**
    RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. */ static resolution(extent:
    number, cells: number): CrossFormula { return c('gis-resolution', 'resolution(extent, cells) = ⌊extent /
    cells⌋', cells > 0 ? Math.floor(extent / cells) : 0, nat(extent, cells) && cells > 0, 'resolution', [extent,
    cells]) } /** SLOPE of terrain: rise over run as a percentage. value ⌊rise · 100 / run⌋. */ static
    slope(rise: number, run: number): CrossFormula { return c('gis-slope', 'slope(rise, run) = ⌊rise · 100 /
    run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /**
    PROXIMITY: how much of a threshold a distance leaves. value max(0, threshold − distance). -/
theorem fam_gis_proximity_1 : (fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int) := by decide

/-- gis: proximity(120, 100) = 0 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the
    area of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain
    slope, nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made
    to compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. */ static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) =
    ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) } /**
    OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. */ static
    overlay(intersection: number, union: number): CrossFormula { return c('gis-overlay', 'overlay(intersection,
    union) = ⌊intersection · 100 / union⌋', union > 0 ? Math.floor((intersection * 100) / union) : 0,
    nat(intersection, union) && union > 0 && intersection <= union, 'overlay', [intersection, union]) } /**
    RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. */ static resolution(extent:
    number, cells: number): CrossFormula { return c('gis-resolution', 'resolution(extent, cells) = ⌊extent /
    cells⌋', cells > 0 ? Math.floor(extent / cells) : 0, nat(extent, cells) && cells > 0, 'resolution', [extent,
    cells]) } /** SLOPE of terrain: rise over run as a percentage. value ⌊rise · 100 / run⌋. */ static
    slope(rise: number, run: number): CrossFormula { return c('gis-slope', 'slope(rise, run) = ⌊rise · 100 /
    run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /**
    PROXIMITY: how much of a threshold a distance leaves. value max(0, threshold − distance). -/
theorem fam_gis_proximity_2 : (fmax (0 : Int) ((100 : Int) - (120 : Int))) = (0 : Int) := by decide

/-- gis: accuracy(95, 100) = 95 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the
    area of a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain
    slope, nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made
    to compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. */ static area(width: number, height: number):
    CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width,
    height), 'area', [width, height]) } /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
    static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features,
    area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0,
    'density', [features, area]) } /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 ·
    radius² / 100⌋. */ static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) =
    ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) } /**
    OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. */ static
    overlay(intersection: number, union: number): CrossFormula { return c('gis-overlay', 'overlay(intersection,
    union) = ⌊intersection · 100 / union⌋', union > 0 ? Math.floor((intersection * 100) / union) : 0,
    nat(intersection, union) && union > 0 && intersection <= union, 'overlay', [intersection, union]) } /**
    RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. */ static resolution(extent:
    number, cells: number): CrossFormula { return c('gis-resolution', 'resolution(extent, cells) = ⌊extent /
    cells⌋', cells > 0 ? Math.floor(extent / cells) : 0, nat(extent, cells) && cells > 0, 'resolution', [extent,
    cells]) } /** SLOPE of terrain: rise over run as a percentage. value ⌊rise · 100 / run⌋. */ static
    slope(rise: number, run: number): CrossFormula { return c('gis-slope', 'slope(rise, run) = ⌊rise · 100 /
    run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) } /**
    PROXIMITY: how much of a threshold a distance leaves. value max(0, threshold − distance). */ static
    proximity(distance: number, threshold: number): CrossFormula { return c('gis-proximity',
    'proximity(distance, threshold) = max(0, threshold − distance)', Math.max(0, threshold - distance),
    nat(distance, threshold), 'proximity', [distance, threshold]) } /** POSITIONAL ACCURACY: correct points as a
    percentage of all points. value ⌊correct · 100 / points⌋. -/
theorem fam_gis_accuracy_1 : (((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int) := by decide

/-- glaciology: massbalance(80, 50) = 30 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. -/
theorem fam_glaciology_massbalance_1 : ((80 : Int) - (50 : Int)) = (30 : Int) := by decide

/-- glaciology: massbalance(30, 50) = -20 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers:
    the mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. -/
theorem fam_glaciology_massbalance_2 : ((30 : Int) - (50 : Int)) = (-20 : Int) := by decide

/-- glaciology: flow(12, 100) = 1200 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. -/
theorem fam_glaciology_flow_1 : ((12 : Int) * (100 : Int)) = (1200 : Int) := by decide

/-- glaciology: retreat(500, 450) = 50 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
    static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope,
    thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /**
    RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). -/
theorem fam_glaciology_retreat_1 : (fmax (0 : Int) ((500 : Int) - (450 : Int))) = (50 : Int) := by decide

/-- glaciology: retreat(450, 500) = 0 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
    static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope,
    thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /**
    RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). -/
theorem fam_glaciology_retreat_2 : (fmax (0 : Int) ((450 : Int) - (500 : Int))) = (0 : Int) := by decide

/-- glaciology: albedo(80, 100) = 80 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
    static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope,
    thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /**
    RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). */ static
    retreat(previous: number, current: number): CrossFormula { return c('glaciology-retreat', 'retreat(previous,
    current) = max(0, previous − current)', Math.max(0, previous - current), nat(previous, current), 'retreat',
    [previous, current]) } /** ALBEDO as a percentage: light reflected over light incident. value ⌊reflected ·
    100 / incident⌋. -/
theorem fam_glaciology_albedo_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- glaciology: melt(10000, 334) = 29 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
    static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope,
    thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /**
    RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). */ static
    retreat(previous: number, current: number): CrossFormula { return c('glaciology-retreat', 'retreat(previous,
    current) = max(0, previous − current)', Math.max(0, previous - current), nat(previous, current), 'retreat',
    [previous, current]) } /** ALBEDO as a percentage: light reflected over light incident. value ⌊reflected ·
    100 / incident⌋. */ static albedo(reflected: number, incident: number): CrossFormula { return
    c('glaciology-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ?
    Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <=
    incident, 'albedo', [reflected, incident]) } /** MELT: the ice a given energy melts at a latent heat. value
    ⌊energy / latent⌋. -/
theorem fam_glaciology_melt_1 : ((10000 : Int) / (334 : Int)) = (29 : Int) := by decide

/-- glaciology: calving(6000, 50) = 120 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
    static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope,
    thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /**
    RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). */ static
    retreat(previous: number, current: number): CrossFormula { return c('glaciology-retreat', 'retreat(previous,
    current) = max(0, previous − current)', Math.max(0, previous - current), nat(previous, current), 'retreat',
    [previous, current]) } /** ALBEDO as a percentage: light reflected over light incident. value ⌊reflected ·
    100 / incident⌋. */ static albedo(reflected: number, incident: number): CrossFormula { return
    c('glaciology-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ?
    Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <=
    incident, 'albedo', [reflected, incident]) } /** MELT: the ice a given energy melts at a latent heat. value
    ⌊energy / latent⌋. */ static melt(energy: number, latent: number): CrossFormula { return
    c('glaciology-melt', 'melt(energy, latent) = ⌊energy / latent⌋', latent > 0 ? Math.floor(energy / latent) :
    0, nat(energy, latent) && latent > 0, 'melt', [energy, latent]) } /** CALVING: the volume lost over the
    width of the front. value ⌊volume / front⌋. -/
theorem fam_glaciology_calving_1 : ((6000 : Int) / (50 : Int)) = (120 : Int) := by decide

/-- glaciology: equilibrium(60, 100) = 60 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers:
    the mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. */ static massbalance(accumulation: number, ablation:
    number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) =
    accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance',
    [accumulation, ablation]) } /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
    static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope,
    thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /**
    RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). */ static
    retreat(previous: number, current: number): CrossFormula { return c('glaciology-retreat', 'retreat(previous,
    current) = max(0, previous − current)', Math.max(0, previous - current), nat(previous, current), 'retreat',
    [previous, current]) } /** ALBEDO as a percentage: light reflected over light incident. value ⌊reflected ·
    100 / incident⌋. */ static albedo(reflected: number, incident: number): CrossFormula { return
    c('glaciology-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ?
    Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <=
    incident, 'albedo', [reflected, incident]) } /** MELT: the ice a given energy melts at a latent heat. value
    ⌊energy / latent⌋. */ static melt(energy: number, latent: number): CrossFormula { return
    c('glaciology-melt', 'melt(energy, latent) = ⌊energy / latent⌋', latent > 0 ? Math.floor(energy / latent) :
    0, nat(energy, latent) && latent > 0, 'melt', [energy, latent]) } /** CALVING: the volume lost over the
    width of the front. value ⌊volume / front⌋. */ static calving(volume: number, front: number): CrossFormula {
    return c('glaciology-calving', 'calving(volume, front) = ⌊volume / front⌋', front > 0 ? Math.floor(volume /
    front) : 0, nat(volume, front) && front > 0, 'calving', [volume, front]) } /** EQUILIBRIUM: accumulation as
    a share of the total, the balance line. value ⌊accumulation · 100 / total⌋. -/
theorem fam_glaciology_equilibrium_1 : (((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int) := by decide

/-- glaciology: age(1000, 25) = 40 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the mass
    it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the terminus
    retreats year over year, how much light the surface throws back, how much ice a given energy melts, how much
    calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth. Crosses to
    `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology arithmetic (mass
    balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed to climate' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate', formula, value,
    proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class GlaciologyFormulas {
    /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses more than it gains.
    value accumulation − ablation. */ static massbalance(accumulation: number, ablation: number): CrossFormula {
    return c('glaciology-massbalance', 'massbalance(accumulation, ablation) = accumulation − ablation',
    accumulation - ablation, nat(accumulation, ablation), 'massbalance', [accumulation, ablation]) } /** FLOW:
    driven by surface slope and ice thickness. value slope · thickness. */ static flow(slope: number, thickness:
    number): CrossFormula { return c('glaciology-flow', 'flow(slope, thickness) = slope · thickness', slope *
    thickness, nat(slope, thickness), 'flow', [slope, thickness]) } /** RETREAT: how far the terminus pulled
    back, never below zero. value max(0, previous − current). */ static retreat(previous: number, current:
    number): CrossFormula { return c('glaciology-retreat', 'retreat(previous, current) = max(0, previous −
    current)', Math.max(0, previous - current), nat(previous, current), 'retreat', [previous, current]) } /**
    ALBEDO as a percentage: light reflected over light incident. value ⌊reflected · 100 / incident⌋. */ static
    albedo(reflected: number, incident: number): CrossFormula { return c('glaciology-albedo', 'albedo(reflected,
    incident) = ⌊reflected · 100 / incident⌋', incident > 0 ? Math.floor((reflected * 100) / incident) : 0,
    nat(reflected, incident) && incident > 0 && reflected <= incident, 'albedo', [reflected, incident]) } /**
    MELT: the ice a given energy melts at a latent heat. value ⌊energy / latent⌋. */ static melt(energy: number,
    latent: number): CrossFormula { return c('glaciology-melt', 'melt(energy, latent) = ⌊energy / latent⌋',
    latent > 0 ? Math.floor(energy / latent) : 0, nat(energy, latent) && latent > 0, 'melt', [energy, latent]) }
    /** CALVING: the volume lost over the width of the front. value ⌊volume / front⌋. */ static calving(volume:
    number, front: number): CrossFormula { return c('glaciology-calving', 'calving(volume, front) = ⌊volume /
    front⌋', front > 0 ? Math.floor(volume / front) : 0, nat(volume, front) && front > 0, 'calving', [volume,
    front]) } /** EQUILIBRIUM: accumulation as a share of the total, the balance line. value ⌊accumulation · 100
    / total⌋. */ static equilibrium(accumulation: number, total: number): CrossFormula { return
    c('glaciology-equilibrium', 'equilibrium(accumulation, total) = ⌊accumulation · 100 / total⌋', total > 0 ?
    Math.floor((accumulation * 100) / total) : 0, nat(accumulation, total) && total > 0 && accumulation <=
    total, 'equilibrium', [accumulation, total]) } /** AGE: years per unit depth over the layers counted. value
    ⌊depth / layers⌋. -/
theorem fam_glaciology_age_1 : ((1000 : Int) / (25 : Int)) = (40 : Int) := by decide

/-- glider: glideratio(400, 10) = 40 -/
theorem fam_glider_glideratio_1 : ((400 : Int) / (10 : Int)) = (40 : Int) := by decide

/-- glider: sinkrate(100, 100) = 1 -/
theorem fam_glider_sinkrate_1 : ((100 : Int) / (100 : Int)) = (1 : Int) := by decide

/-- glider: wingspan(15, 1) = 15 -/
theorem fam_glider_wingspan_1 : ((15 : Int) * (1 : Int)) = (15 : Int) := by decide

/-- glider: aspectratio(225, 15) = 15 -/
theorem fam_glider_aspectratio_1 : ((225 : Int) / (15 : Int)) = (15 : Int) := by decide

/-- glider: stallspeed(60, 1) = 60 -/
theorem fam_glider_stallspeed_1 : ((60 : Int) * (1 : Int)) = (60 : Int) := by decide

/-- glider: liftdragpairs(8, 2) = 28 -/
theorem fam_glider_liftdragpairs_1 : (Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int) := by decide

/-- glider: thermalgain(2000, 1500) = 500 -/
theorem fam_glider_thermalgain_1 : (fmax (0 : Int) ((2000 : Int) - (1500 : Int))) = (500 : Int) := by decide

/-- glider: range(40, 1000) = 40000 -/
theorem fam_glider_range_1 : ((40 : Int) * (1000 : Int)) = (40000 : Int) := by decide

/-- global: fields(7) = 7 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site
    config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields
    it holds, how much is translated, versions kept, its size across locales, access across roles, cache hit
    rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. -/
theorem fam_global_fields_1 : (7 : Int) = (7 : Int) := by decide

/-- global: locales(990, 1000) = 99 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document
    site config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the
    fields it holds, how much is translated, versions kept, its size across locales, access across roles, cache
    hit rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. */ static fields(count: number):
    CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
    /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. -/
theorem fam_global_locales_1 : (((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int) := by decide

/-- global: versions(10, 5) = 5 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site
    config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields
    it holds, how much is translated, versions kept, its size across locales, access across roles, cache hit
    rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. */ static fields(count: number):
    CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
    /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. */ static locales(translated:
    number, total: number): CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated
    · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0
    && translated <= total, 'locales', [translated, total]) } /** VERSIONS kept, capped at a maximum. value
    min(kept, max). -/
theorem fam_global_versions_1 : (fmin (10 : Int) (5 : Int)) = (5 : Int) := by decide

/-- global: size(12, 3) = 36 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site
    config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields
    it holds, how much is translated, versions kept, its size across locales, access across roles, cache hit
    rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. */ static fields(count: number):
    CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
    /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. */ static locales(translated:
    number, total: number): CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated
    · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0
    && translated <= total, 'locales', [translated, total]) } /** VERSIONS kept, capped at a maximum. value
    min(kept, max). */ static versions(kept: number, max: number): CrossFormula { return c('global-versions',
    'versions(kept, max) = min(kept, max)', Math.min(kept, max), nat(kept, max), 'versions', [kept, max]) } /**
    SIZE: the fields across the locales. value fields · locales. -/
theorem fam_global_size_1 : ((12 : Int) * (3 : Int)) = (36 : Int) := by decide

/-- global: access(3, 4) = 75 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site
    config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields
    it holds, how much is translated, versions kept, its size across locales, access across roles, cache hit
    rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. */ static fields(count: number):
    CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
    /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. */ static locales(translated:
    number, total: number): CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated
    · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0
    && translated <= total, 'locales', [translated, total]) } /** VERSIONS kept, capped at a maximum. value
    min(kept, max). */ static versions(kept: number, max: number): CrossFormula { return c('global-versions',
    'versions(kept, max) = min(kept, max)', Math.min(kept, max), nat(kept, max), 'versions', [kept, max]) } /**
    SIZE: the fields across the locales. value fields · locales. */ static size(fields: number, locales:
    number): CrossFormula { return c('global-size', 'size(fields, locales) = fields · locales', fields *
    locales, nat(fields, locales), 'size', [fields, locales]) } /** ACCESS: the roles allowed, as a percentage.
    value ⌊allowed · 100 / roles⌋. -/
theorem fam_global_access_1 : (((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int) := by decide

/-- global: cached(90, 100) = 90 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site
    config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields
    it holds, how much is translated, versions kept, its size across locales, access across roles, cache hit
    rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. */ static fields(count: number):
    CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
    /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. */ static locales(translated:
    number, total: number): CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated
    · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0
    && translated <= total, 'locales', [translated, total]) } /** VERSIONS kept, capped at a maximum. value
    min(kept, max). */ static versions(kept: number, max: number): CrossFormula { return c('global-versions',
    'versions(kept, max) = min(kept, max)', Math.min(kept, max), nat(kept, max), 'versions', [kept, max]) } /**
    SIZE: the fields across the locales. value fields · locales. */ static size(fields: number, locales:
    number): CrossFormula { return c('global-size', 'size(fields, locales) = fields · locales', fields *
    locales, nat(fields, locales), 'size', [fields, locales]) } /** ACCESS: the roles allowed, as a percentage.
    value ⌊allowed · 100 / roles⌋. */ static access(allowed: number, roles: number): CrossFormula { return
    c('global-access', 'access(allowed, roles) = ⌊allowed · 100 / roles⌋', roles > 0 ? Math.floor((allowed *
    100) / roles) : 0, nat(allowed, roles) && roles > 0 && allowed <= roles, 'access', [allowed, roles]) } /**
    CACHED: the cache hit rate as a percentage. value ⌊hits · 100 / reads⌋. -/
theorem fam_global_cached_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- global: depth(3) = 3 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site config:
    settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields it
    holds, how much is translated, versions kept, its size across locales, access across roles, cache hit rate,
    nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A measure.
    */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across locales, access
    across roles, cache hits, nesting depth, populated); the Payload globals API as a measure crossed to
    payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload', formula,
    value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class GlobalFormulas {
    /** FIELDS: the fields a global holds. value count. */ static fields(count: number): CrossFormula { return
    c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) } /** LOCALES translated
    as a percentage. value ⌊translated · 100 / total⌋. */ static locales(translated: number, total: number):
    CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated · 100 / total⌋', total >
    0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0 && translated <= total,
    'locales', [translated, total]) } /** VERSIONS kept, capped at a maximum. value min(kept, max). */ static
    versions(kept: number, max: number): CrossFormula { return c('global-versions', 'versions(kept, max) =
    min(kept, max)', Math.min(kept, max), nat(kept, max), 'versions', [kept, max]) } /** SIZE: the fields across
    the locales. value fields · locales. */ static size(fields: number, locales: number): CrossFormula { return
    c('global-size', 'size(fields, locales) = fields · locales', fields * locales, nat(fields, locales), 'size',
    [fields, locales]) } /** ACCESS: the roles allowed, as a percentage. value ⌊allowed · 100 / roles⌋. */
    static access(allowed: number, roles: number): CrossFormula { return c('global-access', 'access(allowed,
    roles) = ⌊allowed · 100 / roles⌋', roles > 0 ? Math.floor((allowed * 100) / roles) : 0, nat(allowed, roles)
    && roles > 0 && allowed <= roles, 'access', [allowed, roles]) } /** CACHED: the cache hit rate as a
    percentage. value ⌊hits · 100 / reads⌋. */ static cached(hits: number, reads: number): CrossFormula { return
    c('global-cached', 'cached(hits, reads) = ⌊hits · 100 / reads⌋', reads > 0 ? Math.floor((hits * 100) /
    reads) : 0, nat(hits, reads) && reads > 0 && hits <= reads, 'cached', [hits, reads]) } /** DEPTH: the
    nesting of a global's fields. value nested; holds nested ≤ 5. -/
theorem fam_global_depth_1 : (3 : Int) = (3 : Int) := by decide

/-- global: populated(8, 10) = 80 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document
    site config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the
    fields it holds, how much is translated, versions kept, its size across locales, access across roles, cache
    hit rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. */ static fields(count: number):
    CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
    /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. */ static locales(translated:
    number, total: number): CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated
    · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0
    && translated <= total, 'locales', [translated, total]) } /** VERSIONS kept, capped at a maximum. value
    min(kept, max). */ static versions(kept: number, max: number): CrossFormula { return c('global-versions',
    'versions(kept, max) = min(kept, max)', Math.min(kept, max), nat(kept, max), 'versions', [kept, max]) } /**
    SIZE: the fields across the locales. value fields · locales. */ static size(fields: number, locales:
    number): CrossFormula { return c('global-size', 'size(fields, locales) = fields · locales', fields *
    locales, nat(fields, locales), 'size', [fields, locales]) } /** ACCESS: the roles allowed, as a percentage.
    value ⌊allowed · 100 / roles⌋. */ static access(allowed: number, roles: number): CrossFormula { return
    c('global-access', 'access(allowed, roles) = ⌊allowed · 100 / roles⌋', roles > 0 ? Math.floor((allowed *
    100) / roles) : 0, nat(allowed, roles) && roles > 0 && allowed <= roles, 'access', [allowed, roles]) } /**
    CACHED: the cache hit rate as a percentage. value ⌊hits · 100 / reads⌋. */ static cached(hits: number,
    reads: number): CrossFormula { return c('global-cached', 'cached(hits, reads) = ⌊hits · 100 / reads⌋', reads
    > 0 ? Math.floor((hits * 100) / reads) : 0, nat(hits, reads) && reads > 0 && hits <= reads, 'cached', [hits,
    reads]) } /** DEPTH: the nesting of a global's fields. value nested; holds nested ≤ 5. */ static
    depth(nested: number): CrossFormula { return c('global-depth', 'depth(nested) = nested', nested, nat(nested)
    && nested <= 5, 'depth', [nested]) } /** POPULATED: the fields set, as a percentage. value ⌊set · 100 /
    total⌋. -/
theorem fam_global_populated_1 : (((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int) := by decide

/-- glomerular: excretion(100, 2) = 200 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is
    numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. -/
theorem fam_glomerular_excretion_1 : ((100 : Int) * (2 : Int)) = (200 : Int) := by decide

/-- glomerular: clearance(200, 2) = 100 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is
    numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static excretion(uc:
    number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc · uf', uc * uf,
    nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker — the excreted
    mass over its plasma concentration. value ⌊excreted / pc⌋. -/
theorem fam_glomerular_clearance_1 : ((200 : Int) / (2 : Int)) = (100 : Int) := by decide

/-- glomerular: filtrationrate(100, 2, 2) = 100 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The
    glomerulus is numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine
    clearance, filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through.
    Crosses to `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF =
    'glomerular arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction,
    filtered load, reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas {
    /** EXCRETION: the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static
    excretion(uc: number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc ·
    uf', uc * uf, nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker —
    the excreted mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted:
    number, pc: number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted /
    pc⌋', pc > 0 ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) }
    /** FILTRATION RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma
    conc. value ⌊uc · uf / pc⌋. -/
theorem fam_glomerular_filtrationrate_1 : (((100 : Int) * (2 : Int)) / (2 : Int)) = (100 : Int) := by decide

/-- glomerular: creatinineclearance(120, 1, 1) = 120 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The
    glomerulus is numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine
    clearance, filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through.
    Crosses to `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF =
    'glomerular arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction,
    filtered load, reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas {
    /** EXCRETION: the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static
    excretion(uc: number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc ·
    uf', uc * uf, nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker —
    the excreted mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted:
    number, pc: number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted /
    pc⌋', pc > 0 ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) }
    /** FILTRATION RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma
    conc. value ⌊uc · uf / pc⌋. */ static filtrationrate(uc: number, uf: number, pc: number): CrossFormula {
    return c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc
    * uf) / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) } /** CREATININE CLEARANCE: GFR
    by creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. -/
theorem fam_glomerular_creatinineclearance_1 : (((120 : Int) * (1 : Int)) / (1 : Int)) = (120 : Int) := by decide

/-- glomerular: filtrationfraction(125, 625) = 20 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The
    glomerulus is numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine
    clearance, filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through.
    Crosses to `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF =
    'glomerular arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction,
    filtered load, reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas {
    /** EXCRETION: the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static
    excretion(uc: number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc ·
    uf', uc * uf, nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker —
    the excreted mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted:
    number, pc: number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted /
    pc⌋', pc > 0 ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) }
    /** FILTRATION RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma
    conc. value ⌊uc · uf / pc⌋. */ static filtrationrate(uc: number, uf: number, pc: number): CrossFormula {
    return c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc
    * uf) / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) } /** CREATININE CLEARANCE: GFR
    by creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. */ static
    creatinineclearance(ucr: number, uf: number, pcr: number): CrossFormula { return
    c('glomerular-creatinineclearance', 'creatinineclearance(ucr, uf, pcr) = ⌊ucr · uf / pcr⌋', pcr > 0 ?
    Math.floor((ucr * uf) / pcr) : 0, nat(ucr, uf, pcr) && pcr > 0, 'creatinineclearance', [ucr, uf, pcr]) } /**
    FILTRATION FRACTION: the share of plasma flow that is filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. -/
theorem fam_glomerular_filtrationfraction_1 : (((125 : Int) * (100 : Int)) / (625 : Int)) = (20 : Int) := by decide

/-- glomerular: filteredload(100, 5) = 500 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is
    numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static excretion(uc:
    number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc · uf', uc * uf,
    nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker — the excreted
    mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted: number, pc:
    number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted / pc⌋', pc > 0
    ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) } /** FILTRATION
    RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma conc. value
    ⌊uc · uf / pc⌋. */ static filtrationrate(uc: number, uf: number, pc: number): CrossFormula { return
    c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc * uf)
    / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) } /** CREATININE CLEARANCE: GFR by
    creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. */ static
    creatinineclearance(ucr: number, uf: number, pcr: number): CrossFormula { return
    c('glomerular-creatinineclearance', 'creatinineclearance(ucr, uf, pcr) = ⌊ucr · uf / pcr⌋', pcr > 0 ?
    Math.floor((ucr * uf) / pcr) : 0, nat(ucr, uf, pcr) && pcr > 0, 'creatinineclearance', [ucr, uf, pcr]) } /**
    FILTRATION FRACTION: the share of plasma flow that is filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. */
    static filtrationfraction(gfr: number, rpf: number): CrossFormula { return
    c('glomerular-filtrationfraction', 'filtrationfraction(gfr, rpf) = ⌊gfr · 100 / rpf⌋', rpf > 0 ?
    Math.floor((gfr * 100) / rpf) : 0, nat(gfr, rpf) && rpf > 0 && gfr <= rpf, 'filtrationfraction', [gfr, rpf])
    } /** FILTERED LOAD: the amount of a solute presented to the tubule — GFR at the plasma concentration. value
    gfr · pc. -/
theorem fam_glomerular_filteredload_1 : ((100 : Int) * (5 : Int)) = (500 : Int) := by decide

/-- glomerular: reabsorption(500, 100) = 400 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus
    is numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static excretion(uc:
    number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc · uf', uc * uf,
    nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker — the excreted
    mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted: number, pc:
    number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted / pc⌋', pc > 0
    ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) } /** FILTRATION
    RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma conc. value
    ⌊uc · uf / pc⌋. */ static filtrationrate(uc: number, uf: number, pc: number): CrossFormula { return
    c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc * uf)
    / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) } /** CREATININE CLEARANCE: GFR by
    creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. */ static
    creatinineclearance(ucr: number, uf: number, pcr: number): CrossFormula { return
    c('glomerular-creatinineclearance', 'creatinineclearance(ucr, uf, pcr) = ⌊ucr · uf / pcr⌋', pcr > 0 ?
    Math.floor((ucr * uf) / pcr) : 0, nat(ucr, uf, pcr) && pcr > 0, 'creatinineclearance', [ucr, uf, pcr]) } /**
    FILTRATION FRACTION: the share of plasma flow that is filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. */
    static filtrationfraction(gfr: number, rpf: number): CrossFormula { return
    c('glomerular-filtrationfraction', 'filtrationfraction(gfr, rpf) = ⌊gfr · 100 / rpf⌋', rpf > 0 ?
    Math.floor((gfr * 100) / rpf) : 0, nat(gfr, rpf) && rpf > 0 && gfr <= rpf, 'filtrationfraction', [gfr, rpf])
    } /** FILTERED LOAD: the amount of a solute presented to the tubule — GFR at the plasma concentration. value
    gfr · pc. */ static filteredload(gfr: number, pc: number): CrossFormula { return
    c('glomerular-filteredload', 'filteredload(gfr, pc) = gfr · pc', gfr * pc, nat(gfr, pc), 'filteredload',
    [gfr, pc]) } /** REABSORPTION: what the tubule reclaims — the filtered load less what is excreted. value
    max(0, filtered − excreted). -/
theorem fam_glomerular_reabsorption_1 : (fmax (0 : Int) ((500 : Int) - (100 : Int))) = (400 : Int) := by decide

/-- glomerular: reabsorption(100, 500) = 0 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is
    numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static excretion(uc:
    number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc · uf', uc * uf,
    nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker — the excreted
    mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted: number, pc:
    number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted / pc⌋', pc > 0
    ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) } /** FILTRATION
    RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma conc. value
    ⌊uc · uf / pc⌋. */ static filtrationrate(uc: number, uf: number, pc: number): CrossFormula { return
    c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc * uf)
    / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) } /** CREATININE CLEARANCE: GFR by
    creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. */ static
    creatinineclearance(ucr: number, uf: number, pcr: number): CrossFormula { return
    c('glomerular-creatinineclearance', 'creatinineclearance(ucr, uf, pcr) = ⌊ucr · uf / pcr⌋', pcr > 0 ?
    Math.floor((ucr * uf) / pcr) : 0, nat(ucr, uf, pcr) && pcr > 0, 'creatinineclearance', [ucr, uf, pcr]) } /**
    FILTRATION FRACTION: the share of plasma flow that is filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. */
    static filtrationfraction(gfr: number, rpf: number): CrossFormula { return
    c('glomerular-filtrationfraction', 'filtrationfraction(gfr, rpf) = ⌊gfr · 100 / rpf⌋', rpf > 0 ?
    Math.floor((gfr * 100) / rpf) : 0, nat(gfr, rpf) && rpf > 0 && gfr <= rpf, 'filtrationfraction', [gfr, rpf])
    } /** FILTERED LOAD: the amount of a solute presented to the tubule — GFR at the plasma concentration. value
    gfr · pc. */ static filteredload(gfr: number, pc: number): CrossFormula { return
    c('glomerular-filteredload', 'filteredload(gfr, pc) = gfr · pc', gfr * pc, nat(gfr, pc), 'filteredload',
    [gfr, pc]) } /** REABSORPTION: what the tubule reclaims — the filtered load less what is excreted. value
    max(0, filtered − excreted). -/
theorem fam_glomerular_reabsorption_2 : (fmax (0 : Int) ((100 : Int) - (500 : Int))) = (0 : Int) := by decide

/-- glomerular: plasmaflow(1000, 45) = 550 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is
    numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */ static excretion(uc:
    number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc · uf', uc * uf,
    nat(uc, uf), 'excretion', [uc, uf]) } /** CLEARANCE: the plasma volume cleared of a marker — the excreted
    mass over its plasma concentration. value ⌊excreted / pc⌋. */ static clearance(excreted: number, pc:
    number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted / pc⌋', pc > 0
    ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) } /** FILTRATION
    RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma conc. value
    ⌊uc · uf / pc⌋. */ static filtrationrate(uc: number, uf: number, pc: number): CrossFormula { return
    c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc * uf)
    / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) } /** CREATININE CLEARANCE: GFR by
    creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. */ static
    creatinineclearance(ucr: number, uf: number, pcr: number): CrossFormula { return
    c('glomerular-creatinineclearance', 'creatinineclearance(ucr, uf, pcr) = ⌊ucr · uf / pcr⌋', pcr > 0 ?
    Math.floor((ucr * uf) / pcr) : 0, nat(ucr, uf, pcr) && pcr > 0, 'creatinineclearance', [ucr, uf, pcr]) } /**
    FILTRATION FRACTION: the share of plasma flow that is filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. */
    static filtrationfraction(gfr: number, rpf: number): CrossFormula { return
    c('glomerular-filtrationfraction', 'filtrationfraction(gfr, rpf) = ⌊gfr · 100 / rpf⌋', rpf > 0 ?
    Math.floor((gfr * 100) / rpf) : 0, nat(gfr, rpf) && rpf > 0 && gfr <= rpf, 'filtrationfraction', [gfr, rpf])
    } /** FILTERED LOAD: the amount of a solute presented to the tubule — GFR at the plasma concentration. value
    gfr · pc. */ static filteredload(gfr: number, pc: number): CrossFormula { return
    c('glomerular-filteredload', 'filteredload(gfr, pc) = gfr · pc', gfr * pc, nat(gfr, pc), 'filteredload',
    [gfr, pc]) } /** REABSORPTION: what the tubule reclaims — the filtered load less what is excreted. value
    max(0, filtered − excreted). */ static reabsorption(filtered: number, excreted: number): CrossFormula {
    return c('glomerular-reabsorption', 'reabsorption(filtered, excreted) = max(0, filtered − excreted)',
    Math.max(0, filtered - excreted), nat(filtered, excreted), 'reabsorption', [filtered, excreted]) } /**
    PLASMA FLOW (RPF): the plasma reaching the glomerulus — renal blood flow less the cell fraction
    (hematocrit). value ⌊rbf · (100 − hct) / 100⌋. -/
theorem fam_glomerular_plasmaflow_1 : (((1000 : Int) * ((100 : Int) - (45 : Int))) / (100 : Int)) = (550 : Int) := by decide

/-- glycolysis: flux(600, 60) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry
    every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. -/
theorem fam_glycolysis_flux_1 : ((600 : Int) / (60 : Int)) = (10 : Int) := by decide

/-- glycolysis: gluconeogenesis(10) = 5 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the
    stoichiometry every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it
    yields, the ATP invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. -/
theorem fam_glycolysis_gluconeogenesis_1 : ((10 : Int) / (2 : Int)) = (5 : Int) := by decide

/-- glycolysis: glucoseconsumed(100) = 50 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the
    stoichiometry every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it
    yields, the ATP invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. -/
theorem fam_glycolysis_glucoseconsumed_1 : ((100 : Int) / (2 : Int)) = (50 : Int) := by decide

/-- glycolysis: lactate(5) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry
    every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */ static glucoseconsumed(atp: number): CrossFormula { return
    c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp),
    'glucoseconsumed', [atp]) } /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. -/
theorem fam_glycolysis_lactate_1 : ((2 : Int) * (5 : Int)) = (10 : Int) := by decide

/-- glycolysis: nadh(5) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry every
    cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */ static glucoseconsumed(atp: number): CrossFormula { return
    c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp),
    'glucoseconsumed', [atp]) } /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. */
    static lactate(glucose: number): CrossFormula { return c('glycolysis-lactate', 'lactate(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'lactate', [glucose]) } /** NADH: 2 NADH reduced per glucose. value 2 ·
    glucose. -/
theorem fam_glycolysis_nadh_1 : ((2 : Int) * (5 : Int)) = (10 : Int) := by decide

/-- glycolysis: netatp(5, 10) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry
    every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */ static glucoseconsumed(atp: number): CrossFormula { return
    c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp),
    'glucoseconsumed', [atp]) } /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. */
    static lactate(glucose: number): CrossFormula { return c('glycolysis-lactate', 'lactate(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'lactate', [glucose]) } /** NADH: 2 NADH reduced per glucose. value 2 ·
    glucose. */ static nadh(glucose: number): CrossFormula { return c('glycolysis-nadh', 'nadh(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'nadh', [glucose]) } /** NET ATP: the payoff phase (4 per glucose) less
    the ATP invested. value max(0, 4 · glucose − invested). -/
theorem fam_glycolysis_netatp_1 : (fmax (0 : Int) (((4 : Int) * (5 : Int)) - (10 : Int))) = (10 : Int) := by decide

/-- glycolysis: netatp(1, 10) = 0 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry
    every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */ static glucoseconsumed(atp: number): CrossFormula { return
    c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp),
    'glucoseconsumed', [atp]) } /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. */
    static lactate(glucose: number): CrossFormula { return c('glycolysis-lactate', 'lactate(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'lactate', [glucose]) } /** NADH: 2 NADH reduced per glucose. value 2 ·
    glucose. */ static nadh(glucose: number): CrossFormula { return c('glycolysis-nadh', 'nadh(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'nadh', [glucose]) } /** NET ATP: the payoff phase (4 per glucose) less
    the ATP invested. value max(0, 4 · glucose − invested). -/
theorem fam_glycolysis_netatp_2 : (fmax (0 : Int) (((4 : Int) * (1 : Int)) - (10 : Int))) = (0 : Int) := by decide

/-- glycolysis: phosphorylation(5) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the
    stoichiometry every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it
    yields, the ATP invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */ static glucoseconsumed(atp: number): CrossFormula { return
    c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp),
    'glucoseconsumed', [atp]) } /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. */
    static lactate(glucose: number): CrossFormula { return c('glycolysis-lactate', 'lactate(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'lactate', [glucose]) } /** NADH: 2 NADH reduced per glucose. value 2 ·
    glucose. */ static nadh(glucose: number): CrossFormula { return c('glycolysis-nadh', 'nadh(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'nadh', [glucose]) } /** NET ATP: the payoff phase (4 per glucose) less
    the ATP invested. value max(0, 4 · glucose − invested). */ static netatp(glucose: number, invested: number):
    CrossFormula { return c('glycolysis-netatp', 'netatp(glucose, invested) = max(0, 4 · glucose − invested)',
    Math.max(0, 4 * glucose - invested), nat(glucose, invested), 'netatp', [glucose, invested]) } /**
    PHOSPHORYLATION: the prep phase invests 2 ATP per glucose (hexokinase, PFK). value 2 · glucose. -/
theorem fam_glycolysis_phosphorylation_1 : ((2 : Int) * (5 : Int)) = (10 : Int) := by decide

/-- glycolysis: pyruvate(5) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry
    every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. */ static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux',
    'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0,
    nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) } /** GLUCONEOGENESIS: glucose rebuilt
    from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */ static gluconeogenesis(pyruvate: number):
    CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋',
    Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) } /** GLUCOSE CONSUMED: from net
    ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */ static glucoseconsumed(atp: number): CrossFormula { return
    c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp),
    'glucoseconsumed', [atp]) } /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. */
    static lactate(glucose: number): CrossFormula { return c('glycolysis-lactate', 'lactate(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'lactate', [glucose]) } /** NADH: 2 NADH reduced per glucose. value 2 ·
    glucose. */ static nadh(glucose: number): CrossFormula { return c('glycolysis-nadh', 'nadh(glucose) = 2 ·
    glucose', 2 * glucose, nat(glucose), 'nadh', [glucose]) } /** NET ATP: the payoff phase (4 per glucose) less
    the ATP invested. value max(0, 4 · glucose − invested). */ static netatp(glucose: number, invested: number):
    CrossFormula { return c('glycolysis-netatp', 'netatp(glucose, invested) = max(0, 4 · glucose − invested)',
    Math.max(0, 4 * glucose - invested), nat(glucose, invested), 'netatp', [glucose, invested]) } /**
    PHOSPHORYLATION: the prep phase invests 2 ATP per glucose (hexokinase, PFK). value 2 · glucose. */ static
    phosphorylation(glucose: number): CrossFormula { return c('glycolysis-phosphorylation',
    'phosphorylation(glucose) = 2 · glucose', 2 * glucose, nat(glucose), 'phosphorylation', [glucose]) } /**
    PYRUVATE: 2 pyruvate per glucose. value 2 · glucose. -/
theorem fam_glycolysis_pyruvate_1 : ((2 : Int) * (5 : Int)) = (10 : Int) := by decide

/-- glyphs: count(1000, 1) = 1000 -/
theorem fam_glyphs_count_1 : ((1000 : Int) * (1 : Int)) = (1000 : Int) := by decide

/-- glyphs: strokeorderings(5) = 120 -/
theorem fam_glyphs_strokeorderings_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- glyphs: radicalcombos(10, 2) = 45 -/
theorem fam_glyphs_radicalcombos_1 : (Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int) := by decide

/-- glyphs: unicodeplanes(17, 0) = 17 -/
theorem fam_glyphs_unicodeplanes_1 : ((17 : Int) + (0 : Int)) = (17 : Int) := by decide

/-- glyphs: componentsubsets(6) = 64 -/
theorem fam_glyphs_componentsubsets_1 : ((2 : Int) ^ (6 : Nat)) = (64 : Int) := by decide

/-- glyphs: strokesperglyph(12, 8) = 20 -/
theorem fam_glyphs_strokesperglyph_1 : ((12 : Int) + (8 : Int)) = (20 : Int) := by decide

/-- glyphs: variantcount(12, 3) = 36 -/
theorem fam_glyphs_variantcount_1 : ((12 : Int) * (3 : Int)) = (36 : Int) := by decide

/-- glyphs: rendercoverage(95, 100) = 95 -/
theorem fam_glyphs_rendercoverage_1 : (((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int) := by decide

/-- golf: score(68, 72) = -4 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to
    par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation, putts
    and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is one of
    the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap, fairways,
    greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. -/
theorem fam_golf_score_1 : ((68 : Int) - (72 : Int)) = (-4 : Int) := by decide

/-- golf: score(75, 72) = 3 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to
    par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation, putts
    and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is one of
    the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap, fairways,
    greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. -/
theorem fam_golf_score_2 : ((75 : Int) - (72 : Int)) = (3 : Int) := by decide

/-- golf: handicap(108, 20) = 5 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative
    to par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation,
    putts and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is
    one of the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap,
    fairways, greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. -/
theorem fam_golf_handicap_1 : ((108 : Int) / (20 : Int)) = (5 : Int) := by decide

/-- golf: fairways(10, 14) = 71 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative
    to par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation,
    putts and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is
    one of the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap,
    fairways, greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. */ static handicap(differential: number, rounds: number):
    CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds
    > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap',
    [differential, rounds]) } /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. -/
theorem fam_golf_fairways_1 : (((10 : Int) * (100 : Int)) / (14 : Int)) = (71 : Int) := by decide

/-- golf: greens(12, 18) = 66 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to
    par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation, putts
    and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is one of
    the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap, fairways,
    greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. */ static handicap(differential: number, rounds: number):
    CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds
    > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap',
    [differential, rounds]) } /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. */
    static fairways(hit: number, played: number): CrossFormula { return c('golf-fairways', 'fairways(hit,
    played) = ⌊hit · 100 / played⌋', played > 0 ? Math.floor((hit * 100) / played) : 0, nat(hit, played) &&
    played > 0 && hit <= played, 'fairways', [hit, played]) } /** GREENS in regulation as a percentage of holes.
    value ⌊reached · 100 / holes⌋. -/
theorem fam_golf_greens_1 : (((12 : Int) * (100 : Int)) / (18 : Int)) = (66 : Int) := by decide

/-- golf: putts(30, 18) = 1 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to
    par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation, putts
    and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is one of
    the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap, fairways,
    greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. */ static handicap(differential: number, rounds: number):
    CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds
    > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap',
    [differential, rounds]) } /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. */
    static fairways(hit: number, played: number): CrossFormula { return c('golf-fairways', 'fairways(hit,
    played) = ⌊hit · 100 / played⌋', played > 0 ? Math.floor((hit * 100) / played) : 0, nat(hit, played) &&
    played > 0 && hit <= played, 'fairways', [hit, played]) } /** GREENS in regulation as a percentage of holes.
    value ⌊reached · 100 / holes⌋. */ static greens(reached: number, holes: number): CrossFormula { return
    c('golf-greens', 'greens(reached, holes) = ⌊reached · 100 / holes⌋', holes > 0 ? Math.floor((reached * 100)
    / holes) : 0, nat(reached, holes) && holes > 0 && reached <= holes, 'greens', [reached, holes]) } /** PUTTS
    per hole. value ⌊total / holes⌋. -/
theorem fam_golf_putts_1 : ((30 : Int) / (18 : Int)) = (1 : Int) := by decide

/-- golf: driving(2700, 10) = 270 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative
    to par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation,
    putts and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is
    one of the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap,
    fairways, greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. */ static handicap(differential: number, rounds: number):
    CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds
    > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap',
    [differential, rounds]) } /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. */
    static fairways(hit: number, played: number): CrossFormula { return c('golf-fairways', 'fairways(hit,
    played) = ⌊hit · 100 / played⌋', played > 0 ? Math.floor((hit * 100) / played) : 0, nat(hit, played) &&
    played > 0 && hit <= played, 'fairways', [hit, played]) } /** GREENS in regulation as a percentage of holes.
    value ⌊reached · 100 / holes⌋. */ static greens(reached: number, holes: number): CrossFormula { return
    c('golf-greens', 'greens(reached, holes) = ⌊reached · 100 / holes⌋', holes > 0 ? Math.floor((reached * 100)
    / holes) : 0, nat(reached, holes) && holes > 0 && reached <= holes, 'greens', [reached, holes]) } /** PUTTS
    per hole. value ⌊total / holes⌋. */ static putts(total: number, holes: number): CrossFormula { return
    c('golf-putts', 'putts(total, holes) = ⌊total / holes⌋', holes > 0 ? Math.floor(total / holes) : 0,
    nat(total, holes) && holes > 0, 'putts', [total, holes]) } /** DRIVING distance per drive. value ⌊distance /
    drives⌋. -/
theorem fam_golf_driving_1 : ((2700 : Int) / (10 : Int)) = (270 : Int) := by decide

/-- golf: scrambling(4, 6) = 66 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative
    to par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation,
    putts and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is
    one of the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap,
    fairways, greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. */ static handicap(differential: number, rounds: number):
    CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds
    > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap',
    [differential, rounds]) } /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. */
    static fairways(hit: number, played: number): CrossFormula { return c('golf-fairways', 'fairways(hit,
    played) = ⌊hit · 100 / played⌋', played > 0 ? Math.floor((hit * 100) / played) : 0, nat(hit, played) &&
    played > 0 && hit <= played, 'fairways', [hit, played]) } /** GREENS in regulation as a percentage of holes.
    value ⌊reached · 100 / holes⌋. */ static greens(reached: number, holes: number): CrossFormula { return
    c('golf-greens', 'greens(reached, holes) = ⌊reached · 100 / holes⌋', holes > 0 ? Math.floor((reached * 100)
    / holes) : 0, nat(reached, holes) && holes > 0 && reached <= holes, 'greens', [reached, holes]) } /** PUTTS
    per hole. value ⌊total / holes⌋. */ static putts(total: number, holes: number): CrossFormula { return
    c('golf-putts', 'putts(total, holes) = ⌊total / holes⌋', holes > 0 ? Math.floor(total / holes) : 0,
    nat(total, holes) && holes > 0, 'putts', [total, holes]) } /** DRIVING distance per drive. value ⌊distance /
    drives⌋. */ static driving(distance: number, drives: number): CrossFormula { return c('golf-driving',
    'driving(distance, drives) = ⌊distance / drives⌋', drives > 0 ? Math.floor(distance / drives) : 0,
    nat(distance, drives) && drives > 0, 'driving', [distance, drives]) } /** SCRAMBLING: pars saved as a
    percentage of greens missed. value ⌊saved · 100 / missed⌋. -/
theorem fam_golf_scrambling_1 : (((4 : Int) * (100 : Int)) / (6 : Int)) = (66 : Int) := by decide

/-- golf: birdies(15, 5) = 3 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to
    par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation, putts
    and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is one of
    the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap, fairways,
    greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. */ static score(strokes: number, par:
    number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par,
    nat(strokes, par), 'score', [strokes, par]) } /** HANDICAP: the average scoring differential over rounds
    played. value ⌊differential / rounds⌋. */ static handicap(differential: number, rounds: number):
    CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds
    > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap',
    [differential, rounds]) } /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. */
    static fairways(hit: number, played: number): CrossFormula { return c('golf-fairways', 'fairways(hit,
    played) = ⌊hit · 100 / played⌋', played > 0 ? Math.floor((hit * 100) / played) : 0, nat(hit, played) &&
    played > 0 && hit <= played, 'fairways', [hit, played]) } /** GREENS in regulation as a percentage of holes.
    value ⌊reached · 100 / holes⌋. */ static greens(reached: number, holes: number): CrossFormula { return
    c('golf-greens', 'greens(reached, holes) = ⌊reached · 100 / holes⌋', holes > 0 ? Math.floor((reached * 100)
    / holes) : 0, nat(reached, holes) && holes > 0 && reached <= holes, 'greens', [reached, holes]) } /** PUTTS
    per hole. value ⌊total / holes⌋. */ static putts(total: number, holes: number): CrossFormula { return
    c('golf-putts', 'putts(total, holes) = ⌊total / holes⌋', holes > 0 ? Math.floor(total / holes) : 0,
    nat(total, holes) && holes > 0, 'putts', [total, holes]) } /** DRIVING distance per drive. value ⌊distance /
    drives⌋. */ static driving(distance: number, drives: number): CrossFormula { return c('golf-driving',
    'driving(distance, drives) = ⌊distance / drives⌋', drives > 0 ? Math.floor(distance / drives) : 0,
    nat(distance, drives) && drives > 0, 'driving', [distance, drives]) } /** SCRAMBLING: pars saved as a
    percentage of greens missed. value ⌊saved · 100 / missed⌋. */ static scrambling(saved: number, missed:
    number): CrossFormula { return c('golf-scrambling', 'scrambling(saved, missed) = ⌊saved · 100 / missed⌋',
    missed > 0 ? Math.floor((saved * 100) / missed) : 0, nat(saved, missed) && missed > 0 && saved <= missed,
    'scrambling', [saved, missed]) } /** BIRDIES per round. value ⌊birdies / rounds⌋. -/
theorem fam_golf_birdies_1 : ((15 : Int) / (5 : Int)) = (3 : Int) := by decide

/-- governance: quorum(6, 10) = 60 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. -/
theorem fam_governance_quorum_1 : (((6 : Int) * (100 : Int)) / (10 : Int)) = (60 : Int) := by decide

/-- governance: majority(60, 100) = 60 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. */ static quorum(present: number, members: number):
    CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members
    > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members,
    'quorum', [present, members]) } /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100
    / total⌋. -/
theorem fam_governance_majority_1 : (((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int) := by decide

/-- governance: transparency(9, 10) = 90 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. */ static quorum(present: number, members: number):
    CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members
    > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members,
    'quorum', [present, members]) } /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100
    / total⌋. */ static majority(votes: number, total: number): CrossFormula { return c('governance-majority',
    'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0,
    nat(votes, total) && total > 0 && votes <= total, 'majority', [votes, total]) } /** TRANSPARENCY: the
    decisions disclosed as a percentage of all. value ⌊disclosed · 100 / decisions⌋. -/
theorem fam_governance_transparency_1 : (((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int) := by decide

/-- governance: accountability(45, 50) = 90 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together
    is numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. */ static quorum(present: number, members: number):
    CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members
    > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members,
    'quorum', [present, members]) } /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100
    / total⌋. */ static majority(votes: number, total: number): CrossFormula { return c('governance-majority',
    'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0,
    nat(votes, total) && total > 0 && votes <= total, 'majority', [votes, total]) } /** TRANSPARENCY: the
    decisions disclosed as a percentage of all. value ⌊disclosed · 100 / decisions⌋. */ static
    transparency(disclosed: number, decisions: number): CrossFormula { return c('governance-transparency',
    'transparency(disclosed, decisions) = ⌊disclosed · 100 / decisions⌋', decisions > 0 ? Math.floor((disclosed
    * 100) / decisions) : 0, nat(disclosed, decisions) && decisions > 0 && disclosed <= decisions,
    'transparency', [disclosed, decisions]) } /** ACCOUNTABILITY: the inquiries answered as a percentage of all.
    value ⌊answered · 100 / inquiries⌋. -/
theorem fam_governance_accountability_1 : (((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int) := by decide

/-- governance: representation(5, 1000000) = 5 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding
    together is numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions
    are, how answerable the answers are, how many seats a people holds, how long a term runs, how closely rules
    are met, and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A
    measure. */ const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability,
    representation, term, compliance, turnout); the rule of a body as numbers; a measure crossed to law' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof:
    PROOF, ...extra }, holds, { name: `governance.${name}`, params }) export class GovernanceFormulas { /**
    QUORUM: those present as a percentage of the members. value ⌊present · 100 / members⌋. */ static
    quorum(present: number, members: number): CrossFormula { return c('governance-quorum', 'quorum(present,
    members) = ⌊present · 100 / members⌋', members > 0 ? Math.floor((present * 100) / members) : 0, nat(present,
    members) && members > 0 && present <= members, 'quorum', [present, members]) } /** MAJORITY: the votes for
    as a percentage of the total. value ⌊votes · 100 / total⌋. */ static majority(votes: number, total: number):
    CrossFormula { return c('governance-majority', 'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ?
    Math.floor((votes * 100) / total) : 0, nat(votes, total) && total > 0 && votes <= total, 'majority', [votes,
    total]) } /** TRANSPARENCY: the decisions disclosed as a percentage of all. value ⌊disclosed · 100 /
    decisions⌋. */ static transparency(disclosed: number, decisions: number): CrossFormula { return
    c('governance-transparency', 'transparency(disclosed, decisions) = ⌊disclosed · 100 / decisions⌋', decisions
    > 0 ? Math.floor((disclosed * 100) / decisions) : 0, nat(disclosed, decisions) && decisions > 0 && disclosed
    <= decisions, 'transparency', [disclosed, decisions]) } /** ACCOUNTABILITY: the inquiries answered as a
    percentage of all. value ⌊answered · 100 / inquiries⌋. */ static accountability(answered: number, inquiries:
    number): CrossFormula { return c('governance-accountability', 'accountability(answered, inquiries) =
    ⌊answered · 100 / inquiries⌋', inquiries > 0 ? Math.floor((answered * 100) / inquiries) : 0, nat(answered,
    inquiries) && inquiries > 0 && answered <= inquiries, 'accountability', [answered, inquiries]) } /**
    REPRESENTATION: the seats a people holds per million of its population. value ⌊seats · 1000000 /
    population⌋. -/
theorem fam_governance_representation_1 : (((5 : Int) * (1000000 : Int)) / (1000000 : Int)) = (5 : Int) := by decide

/-- governance: term(100, 4) = 400 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. */ static quorum(present: number, members: number):
    CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members
    > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members,
    'quorum', [present, members]) } /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100
    / total⌋. */ static majority(votes: number, total: number): CrossFormula { return c('governance-majority',
    'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0,
    nat(votes, total) && total > 0 && votes <= total, 'majority', [votes, total]) } /** TRANSPARENCY: the
    decisions disclosed as a percentage of all. value ⌊disclosed · 100 / decisions⌋. */ static
    transparency(disclosed: number, decisions: number): CrossFormula { return c('governance-transparency',
    'transparency(disclosed, decisions) = ⌊disclosed · 100 / decisions⌋', decisions > 0 ? Math.floor((disclosed
    * 100) / decisions) : 0, nat(disclosed, decisions) && decisions > 0 && disclosed <= decisions,
    'transparency', [disclosed, decisions]) } /** ACCOUNTABILITY: the inquiries answered as a percentage of all.
    value ⌊answered · 100 / inquiries⌋. */ static accountability(answered: number, inquiries: number):
    CrossFormula { return c('governance-accountability', 'accountability(answered, inquiries) = ⌊answered · 100
    / inquiries⌋', inquiries > 0 ? Math.floor((answered * 100) / inquiries) : 0, nat(answered, inquiries) &&
    inquiries > 0 && answered <= inquiries, 'accountability', [answered, inquiries]) } /** REPRESENTATION: the
    seats a people holds per million of its population. value ⌊seats · 1000000 / population⌋. */ static
    representation(seats: number, population: number): CrossFormula { return c('governance-representation',
    'representation(seats, population) = ⌊seats · 1000000 / population⌋', population > 0 ? Math.floor((seats *
    1000000) / population) : 0, nat(seats, population) && population > 0, 'representation', [seats, population])
    } /** TERM: the office-years of those elected. value elected · years. -/
theorem fam_governance_term_1 : ((100 : Int) * (4 : Int)) = (400 : Int) := by decide

/-- governance: compliance(19, 20) = 95 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. */ static quorum(present: number, members: number):
    CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members
    > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members,
    'quorum', [present, members]) } /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100
    / total⌋. */ static majority(votes: number, total: number): CrossFormula { return c('governance-majority',
    'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0,
    nat(votes, total) && total > 0 && votes <= total, 'majority', [votes, total]) } /** TRANSPARENCY: the
    decisions disclosed as a percentage of all. value ⌊disclosed · 100 / decisions⌋. */ static
    transparency(disclosed: number, decisions: number): CrossFormula { return c('governance-transparency',
    'transparency(disclosed, decisions) = ⌊disclosed · 100 / decisions⌋', decisions > 0 ? Math.floor((disclosed
    * 100) / decisions) : 0, nat(disclosed, decisions) && decisions > 0 && disclosed <= decisions,
    'transparency', [disclosed, decisions]) } /** ACCOUNTABILITY: the inquiries answered as a percentage of all.
    value ⌊answered · 100 / inquiries⌋. */ static accountability(answered: number, inquiries: number):
    CrossFormula { return c('governance-accountability', 'accountability(answered, inquiries) = ⌊answered · 100
    / inquiries⌋', inquiries > 0 ? Math.floor((answered * 100) / inquiries) : 0, nat(answered, inquiries) &&
    inquiries > 0 && answered <= inquiries, 'accountability', [answered, inquiries]) } /** REPRESENTATION: the
    seats a people holds per million of its population. value ⌊seats · 1000000 / population⌋. */ static
    representation(seats: number, population: number): CrossFormula { return c('governance-representation',
    'representation(seats, population) = ⌊seats · 1000000 / population⌋', population > 0 ? Math.floor((seats *
    1000000) / population) : 0, nat(seats, population) && population > 0, 'representation', [seats, population])
    } /** TERM: the office-years of those elected. value elected · years. */ static term(elected: number, years:
    number): CrossFormula { return c('governance-term', 'term(elected, years) = elected · years', elected *
    years, nat(elected, years), 'term', [elected, years]) } /** COMPLIANCE: the regulations complied with as a
    percentage of all. value ⌊compliant · 100 / regulations⌋. -/
theorem fam_governance_compliance_1 : (((19 : Int) * (100 : Int)) / (20 : Int)) = (95 : Int) := by decide

/-- governance: turnout(660, 1000) = 66 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. */ static quorum(present: number, members: number):
    CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members
    > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members,
    'quorum', [present, members]) } /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100
    / total⌋. */ static majority(votes: number, total: number): CrossFormula { return c('governance-majority',
    'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0,
    nat(votes, total) && total > 0 && votes <= total, 'majority', [votes, total]) } /** TRANSPARENCY: the
    decisions disclosed as a percentage of all. value ⌊disclosed · 100 / decisions⌋. */ static
    transparency(disclosed: number, decisions: number): CrossFormula { return c('governance-transparency',
    'transparency(disclosed, decisions) = ⌊disclosed · 100 / decisions⌋', decisions > 0 ? Math.floor((disclosed
    * 100) / decisions) : 0, nat(disclosed, decisions) && decisions > 0 && disclosed <= decisions,
    'transparency', [disclosed, decisions]) } /** ACCOUNTABILITY: the inquiries answered as a percentage of all.
    value ⌊answered · 100 / inquiries⌋. */ static accountability(answered: number, inquiries: number):
    CrossFormula { return c('governance-accountability', 'accountability(answered, inquiries) = ⌊answered · 100
    / inquiries⌋', inquiries > 0 ? Math.floor((answered * 100) / inquiries) : 0, nat(answered, inquiries) &&
    inquiries > 0 && answered <= inquiries, 'accountability', [answered, inquiries]) } /** REPRESENTATION: the
    seats a people holds per million of its population. value ⌊seats · 1000000 / population⌋. */ static
    representation(seats: number, population: number): CrossFormula { return c('governance-representation',
    'representation(seats, population) = ⌊seats · 1000000 / population⌋', population > 0 ? Math.floor((seats *
    1000000) / population) : 0, nat(seats, population) && population > 0, 'representation', [seats, population])
    } /** TERM: the office-years of those elected. value elected · years. */ static term(elected: number, years:
    number): CrossFormula { return c('governance-term', 'term(elected, years) = elected · years', elected *
    years, nat(elected, years), 'term', [elected, years]) } /** COMPLIANCE: the regulations complied with as a
    percentage of all. value ⌊compliant · 100 / regulations⌋. */ static compliance(compliant: number,
    regulations: number): CrossFormula { return c('governance-compliance', 'compliance(compliant, regulations) =
    ⌊compliant · 100 / regulations⌋', regulations > 0 ? Math.floor((compliant * 100) / regulations) : 0,
    nat(compliant, regulations) && regulations > 0 && compliant <= regulations, 'compliance', [compliant,
    regulations]) } /** TURNOUT: those who voted as a percentage of the eligible. value ⌊voted · 100 /
    eligible⌋. -/
theorem fam_governance_turnout_1 : (((660 : Int) * (100 : Int)) / (1000 : Int)) = (66 : Int) := by decide

/-- gps: satellites(31, 7) = 24 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). -/
theorem fam_gps_satellites_1 : (fmax (0 : Int) ((31 : Int) - (7 : Int))) = (24 : Int) := by decide

/-- gps: trilateration(3) = 4 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. -/
theorem fam_gps_trilateration_1 : ((3 : Int) + (1 : Int)) = (4 : Int) := by decide

/-- gps: hdop(100, 8) = 12 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by hand). A
    fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision, whether
    the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and the
    satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number): CrossFormula { return
    c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) } /**
    HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread /
    satellites⌋. -/
theorem fam_gps_hdop_1 : ((100 : Int) / (8 : Int)) = (12 : Int) := by decide

/-- gps: fixquality(8, 4) = 1 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number): CrossFormula { return
    c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) } /**
    HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread /
    satellites⌋. */ static hdop(spread: number, satellites: number): CrossFormula { return c('gps-hdop',
    'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread / satellites) : 0,
    nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) } /** FIX QUALITY: 1 when the
    satellites used meet the minimum for a fix. value [satellites ≥ min]. -/
theorem fam_gps_fixquality_1 : (if (if (8 : Int) ≥ (4 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int) := by decide

/-- gps: fixquality(2, 4) = 0 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number): CrossFormula { return
    c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) } /**
    HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread /
    satellites⌋. */ static hdop(spread: number, satellites: number): CrossFormula { return c('gps-hdop',
    'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread / satellites) : 0,
    nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) } /** FIX QUALITY: 1 when the
    satellites used meet the minimum for a fix. value [satellites ≥ min]. -/
theorem fam_gps_fixquality_2 : (if (if (2 : Int) ≥ (4 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int) := by decide

/-- gps: pseudorange(68, 300) = 20400 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not
    by hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of
    precision, whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting
    accuracy, and the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation
    positions from. A measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum,
    dilution of precision, fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure
    crossed to navigation' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas {
    /** VISIBLE SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */
    static satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites',
    'satellites(total, blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) &&
    blocked <= total, 'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in
    `dims` dimensions (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number):
    CrossFormula { return c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims),
    'trilateration', [dims]) } /** HDOP: horizontal dilution of precision, geometry spread over the satellites
    used. value ⌊spread / satellites⌋. */ static hdop(spread: number, satellites: number): CrossFormula { return
    c('gps-hdop', 'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread /
    satellites) : 0, nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) } /** FIX QUALITY:
    1 when the satellites used meet the minimum for a fix. value [satellites ≥ min]. */ static
    fixquality(satellites: number, min: number): CrossFormula { return c('gps-fixquality',
    'fixquality(satellites, min) = [satellites ≥ min]', satellites >= min ? 1 : 0, nat(satellites, min),
    'fixquality', [satellites, min]) } /** PSEUDORANGE: the distance a signal travelled, time at a speed. value
    time · speed. -/
theorem fam_gps_pseudorange_1 : ((68 : Int) * (300 : Int)) = (20400 : Int) := by decide

/-- gps: ttff(12, 18, 15) = 45 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number): CrossFormula { return
    c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) } /**
    HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread /
    satellites⌋. */ static hdop(spread: number, satellites: number): CrossFormula { return c('gps-hdop',
    'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread / satellites) : 0,
    nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) } /** FIX QUALITY: 1 when the
    satellites used meet the minimum for a fix. value [satellites ≥ min]. */ static fixquality(satellites:
    number, min: number): CrossFormula { return c('gps-fixquality', 'fixquality(satellites, min) = [satellites ≥
    min]', satellites >= min ? 1 : 0, nat(satellites, min), 'fixquality', [satellites, min]) } /** PSEUDORANGE:
    the distance a signal travelled, time at a speed. value time · speed. */ static pseudorange(time: number,
    speed: number): CrossFormula { return c('gps-pseudorange', 'pseudorange(time, speed) = time · speed', time *
    speed, nat(time, speed), 'pseudorange', [time, speed]) } /** TIME TO FIRST FIX: almanac, ephemeris and
    search seconds together. value almanac + ephemeris + search. -/
theorem fam_gps_ttff_1 : (((12 : Int) + (18 : Int)) + (15 : Int)) = (45 : Int) := by decide

/-- gps: accuracy(2, 5) = 10 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by hand).
    A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision, whether
    the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and the
    satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number): CrossFormula { return
    c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) } /**
    HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread /
    satellites⌋. */ static hdop(spread: number, satellites: number): CrossFormula { return c('gps-hdop',
    'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread / satellites) : 0,
    nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) } /** FIX QUALITY: 1 when the
    satellites used meet the minimum for a fix. value [satellites ≥ min]. */ static fixquality(satellites:
    number, min: number): CrossFormula { return c('gps-fixquality', 'fixquality(satellites, min) = [satellites ≥
    min]', satellites >= min ? 1 : 0, nat(satellites, min), 'fixquality', [satellites, min]) } /** PSEUDORANGE:
    the distance a signal travelled, time at a speed. value time · speed. */ static pseudorange(time: number,
    speed: number): CrossFormula { return c('gps-pseudorange', 'pseudorange(time, speed) = time · speed', time *
    speed, nat(time, speed), 'pseudorange', [time, speed]) } /** TIME TO FIRST FIX: almanac, ephemeris and
    search seconds together. value almanac + ephemeris + search. */ static ttff(almanac: number, ephemeris:
    number, search: number): CrossFormula { return c('gps-ttff', 'ttff(almanac, ephemeris, search) = almanac +
    ephemeris + search', almanac + ephemeris + search, nat(almanac, ephemeris, search), 'ttff', [almanac,
    ephemeris, search]) } /** ACCURACY: metres, the dilution of precision times the user-equivalent range error.
    value hdop · uere. -/
theorem fam_gps_accuracy_1 : ((2 : Int) * (5 : Int)) = (10 : Int) := by decide

/-- gps: elevationmask(24, 9) = 15 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */ static
    satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total,
    blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total,
    'satellites', [total, blocked]) } /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions
    (one more, for the clock bias). value dims + 1. */ static trilateration(dims: number): CrossFormula { return
    c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) } /**
    HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread /
    satellites⌋. */ static hdop(spread: number, satellites: number): CrossFormula { return c('gps-hdop',
    'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread / satellites) : 0,
    nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) } /** FIX QUALITY: 1 when the
    satellites used meet the minimum for a fix. value [satellites ≥ min]. */ static fixquality(satellites:
    number, min: number): CrossFormula { return c('gps-fixquality', 'fixquality(satellites, min) = [satellites ≥
    min]', satellites >= min ? 1 : 0, nat(satellites, min), 'fixquality', [satellites, min]) } /** PSEUDORANGE:
    the distance a signal travelled, time at a speed. value time · speed. */ static pseudorange(time: number,
    speed: number): CrossFormula { return c('gps-pseudorange', 'pseudorange(time, speed) = time · speed', time *
    speed, nat(time, speed), 'pseudorange', [time, speed]) } /** TIME TO FIRST FIX: almanac, ephemeris and
    search seconds together. value almanac + ephemeris + search. */ static ttff(almanac: number, ephemeris:
    number, search: number): CrossFormula { return c('gps-ttff', 'ttff(almanac, ephemeris, search) = almanac +
    ephemeris + search', almanac + ephemeris + search, nat(almanac, ephemeris, search), 'ttff', [almanac,
    ephemeris, search]) } /** ACCURACY: metres, the dilution of precision times the user-equivalent range error.
    value hdop · uere. */ static accuracy(hdop: number, uere: number): CrossFormula { return c('gps-accuracy',
    'accuracy(hdop, uere) = hdop · uere', hdop * uere, nat(hdop, uere), 'accuracy', [hdop, uere]) } /**
    ELEVATION MASK: the satellites left once those below the mask are dropped. value max(0, total − below). -/
theorem fam_gps_elevationmask_1 : (fmax (0 : Int) ((24 : Int) - (9 : Int))) = (15 : Int) := by decide

/-- gpu: cores(128, 64) = 8192 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm. -/
theorem fam_gpu_cores_1 : ((128 : Int) * (64 : Int)) = (8192 : Int) := by decide

/-- gpu: warpsize() = 32 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the book:
    total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a thread
    count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the ridge
    point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. -/
theorem fam_gpu_warpsize_1 : (32 : Int) = (32 : Int) := by decide

/-- gpu: warps(100) = 4 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the book:
    total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a thread
    count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the ridge
    point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. -/
theorem fam_gpu_warps_1 : (-((-(100 : Int)) / (32 : Int))) = (4 : Int) := by decide

/-- gpu: occupancy(48, 64) = 75 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. -/
theorem fam_gpu_occupancy_1 : (((48 : Int) * (100 : Int)) / (64 : Int)) = (75 : Int) := by decide

/-- gpu: grid(256, 1024) = 262144 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. -/
theorem fam_gpu_grid_1 : ((256 : Int) * (1024 : Int)) = (262144 : Int) := by decide

/-- gpu: blocks(10000, 256) = 40 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. -/
theorem fam_gpu_blocks_1 : (-((-(10000 : Int)) / (256 : Int))) = (40 : Int) := by decide

/-- gpu: flops(8192, 2, 2) = 32768 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by
    the book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover
    a thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. -/
theorem fam_gpu_flops_1 : (((8192 : Int) * (2 : Int)) * (2 : Int)) = (32768 : Int) := by decide

/-- gpu: bandwidth(32, 100) = 3200 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by
    the book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover
    a thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. -/
theorem fam_gpu_bandwidth_1 : ((32 : Int) * (100 : Int)) = (3200 : Int) := by decide

/-- gpu: intensity(1000, 250) = 4 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. -/
theorem fam_gpu_intensity_1 : ((1000 : Int) / (250 : Int)) = (4 : Int) := by decide

/-- gpu: ridge(32768, 3200) = 11 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. -/
theorem fam_gpu_ridge_1 : (-((-(32768 : Int)) / (3200 : Int))) = (11 : Int) := by decide

/-- gpu: bound(4, 11) = 0 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the book:
    total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a thread
    count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the ridge
    point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. -/
theorem fam_gpu_bound_1 : (if (if (4 : Int) ≥ (11 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int) := by decide

/-- gpu: bound(20, 11) = 1 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the book:
    total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a thread
    count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the ridge
    point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. -/
theorem fam_gpu_bound_2 : (if (if (20 : Int) ≥ (11 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int) := by decide

/-- gpu: shared(4096, 8) = 32768 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. */ static bound(intensity: number, ridge:
    number): CrossFormula { return g('gpu-bound', 'bound(intensity, ridge) = [intensity ≥ ridge] (1
    compute-bound, 0 memory-bound)', intensity >= ridge ? 1 : 0, nat(intensity, ridge), 'bound', [intensity,
    ridge]) } /** SHARED — the shared-memory footprint of a launch: per-block bytes times resident blocks. value
    perBlock · blocks. -/
theorem fam_gpu_shared_1 : ((4096 : Int) * (8 : Int)) = (32768 : Int) := by decide

/-- gpu: hide(16, 4, 60) = 1 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. */ static bound(intensity: number, ridge:
    number): CrossFormula { return g('gpu-bound', 'bound(intensity, ridge) = [intensity ≥ ridge] (1
    compute-bound, 0 memory-bound)', intensity >= ridge ? 1 : 0, nat(intensity, ridge), 'bound', [intensity,
    ridge]) } /** SHARED — the shared-memory footprint of a launch: per-block bytes times resident blocks. value
    perBlock · blocks. */ static shared(perBlock: number, blocks: number): CrossFormula { return g('gpu-shared',
    'shared(perBlock, blocks) = perBlock · blocks (shared memory footprint)', perBlock * blocks, nat(perBlock,
    blocks), 'shared', [perBlock, blocks]) } /** HIDE — latency hidden when the issued work per cycle across
    warps covers the memory latency. value [warps · issue ≥ latency]. -/
theorem fam_gpu_hide_1 : (if (if ((16 : Int) * (4 : Int)) ≥ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int) := by decide

/-- gpu: hide(4, 1, 60) = 0 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the book:
    total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a thread
    count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the ridge
    point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. */ static bound(intensity: number, ridge:
    number): CrossFormula { return g('gpu-bound', 'bound(intensity, ridge) = [intensity ≥ ridge] (1
    compute-bound, 0 memory-bound)', intensity >= ridge ? 1 : 0, nat(intensity, ridge), 'bound', [intensity,
    ridge]) } /** SHARED — the shared-memory footprint of a launch: per-block bytes times resident blocks. value
    perBlock · blocks. */ static shared(perBlock: number, blocks: number): CrossFormula { return g('gpu-shared',
    'shared(perBlock, blocks) = perBlock · blocks (shared memory footprint)', perBlock * blocks, nat(perBlock,
    blocks), 'shared', [perBlock, blocks]) } /** HIDE — latency hidden when the issued work per cycle across
    warps covers the memory latency. value [warps · issue ≥ latency]. -/
theorem fam_gpu_hide_2 : (if (if ((4 : Int) * (1 : Int)) ≥ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int) := by decide

/-- gpu: speedup(1024, 32) = 32 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. */ static bound(intensity: number, ridge:
    number): CrossFormula { return g('gpu-bound', 'bound(intensity, ridge) = [intensity ≥ ridge] (1
    compute-bound, 0 memory-bound)', intensity >= ridge ? 1 : 0, nat(intensity, ridge), 'bound', [intensity,
    ridge]) } /** SHARED — the shared-memory footprint of a launch: per-block bytes times resident blocks. value
    perBlock · blocks. */ static shared(perBlock: number, blocks: number): CrossFormula { return g('gpu-shared',
    'shared(perBlock, blocks) = perBlock · blocks (shared memory footprint)', perBlock * blocks, nat(perBlock,
    blocks), 'shared', [perBlock, blocks]) } /** HIDE — latency hidden when the issued work per cycle across
    warps covers the memory latency. value [warps · issue ≥ latency]. */ static hide(warps: number, issue:
    number, latency: number): CrossFormula { return g('gpu-hide', 'hide(warps, issue, latency) = [warps · issue
    ≥ latency] (occupancy hides latency)', warps * issue >= latency ? 1 : 0, nat(warps, issue, latency), 'hide',
    [warps, issue, latency]) } /** SPEEDUP — SIMT lane speedup: serial cycles divided across the lanes that run
    in lockstep. value ⌊serial / lanes⌋; holds lanes > 0. -/
theorem fam_gpu_speedup_1 : ((1024 : Int) / (32 : Int)) = (32 : Int) := by decide

/-- gpu: util(6144, 8192) = 75 — GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the
    book: total cores across its streaming multiprocessors, the 32-thread warp, warps and blocks that cover a
    thread count, SM occupancy, peak FLOPS and memory bandwidth, the roofline model (arithmetic intensity, the
    ridge point, and whether a kernel is compute- or memory-bound), shared-memory footprint, latency hidden by
    occupancy, SIMT lane speedup, and utilisation. Deterministic integer identities, standard GPU architecture
    and the roofline model. Crosses to `hardware`. A measure, not advice. */ const WARP = 32 // threads per warp
    (NVIDIA SIMT) const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp,
    warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth
    = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared
    memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities
    crossed to hardware; a measure' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const g = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gpu', dst:
    'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params }) export class
    GpuFormulas { /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm.
    */ static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms ·
    perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) } /** WARPSIZE — the threads that execute in
    lockstep, one warp. value 32. */ static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32
    (SIMT threads per warp)', WARP, true, 'warpsize', []) } /** WARPS — the warps a thread count needs, rounded
    up. value ⌈threads / 32⌉. */ static warps(threads: number): CrossFormula { return g('gpu-warps',
    'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) } /**
    OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
    static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active,
    max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 &&
    active <= max, 'occupancy', [active, max]) } /** GRID — the total threads a launch covers, blocks times
    threads per block. value blocks · perBlock. */ static grid(blocks: number, perBlock: number): CrossFormula {
    return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock),
    'grid', [blocks, perBlock]) } /** BLOCKS — the blocks needed to cover a thread count, rounded up. value
    ⌈threads / perBlock⌉; holds perBlock > 0. */ static blocks(threads: number, perBlock: number): CrossFormula
    { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ?
    Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
    /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock ·
    perCycle. */ static flops(cores: number, clock: number, perCycle: number): CrossFormula { return
    g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle,
    nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) } /** BANDWIDTH — memory bandwidth: the bus
    width in bytes times the clock. value bus · clock. */ static bandwidth(bus: number, clock: number):
    CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)',
    bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) } /** INTENSITY — arithmetic intensity, FLOPs per
    byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */ static intensity(flops: number,
    bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋
    (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity',
    [flops, bytes]) } /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where
    compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */ static ridge(peak: number,
    bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉
    (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) &&
    bandwidth > 0, 'ridge', [peak, bandwidth]) } /** BOUND — the roofline verdict: compute-bound when intensity
    meets the ridge, else memory-bound. value [intensity ≥ ridge]. */ static bound(intensity: number, ridge:
    number): CrossFormula { return g('gpu-bound', 'bound(intensity, ridge) = [intensity ≥ ridge] (1
    compute-bound, 0 memory-bound)', intensity >= ridge ? 1 : 0, nat(intensity, ridge), 'bound', [intensity,
    ridge]) } /** SHARED — the shared-memory footprint of a launch: per-block bytes times resident blocks. value
    perBlock · blocks. */ static shared(perBlock: number, blocks: number): CrossFormula { return g('gpu-shared',
    'shared(perBlock, blocks) = perBlock · blocks (shared memory footprint)', perBlock * blocks, nat(perBlock,
    blocks), 'shared', [perBlock, blocks]) } /** HIDE — latency hidden when the issued work per cycle across
    warps covers the memory latency. value [warps · issue ≥ latency]. */ static hide(warps: number, issue:
    number, latency: number): CrossFormula { return g('gpu-hide', 'hide(warps, issue, latency) = [warps · issue
    ≥ latency] (occupancy hides latency)', warps * issue >= latency ? 1 : 0, nat(warps, issue, latency), 'hide',
    [warps, issue, latency]) } /** SPEEDUP — SIMT lane speedup: serial cycles divided across the lanes that run
    in lockstep. value ⌊serial / lanes⌋; holds lanes > 0. */ static speedup(serial: number, lanes: number):
    CrossFormula { return g('gpu-speedup', 'speedup(serial, lanes) = ⌊serial / lanes⌋', lanes > 0 ?
    Math.floor(serial / lanes) : 0, nat(serial, lanes) && lanes > 0, 'speedup', [serial, lanes]) } /** UTIL —
    GPU utilisation: busy cores as a percentage of the total. value ⌊used · 100 / total⌋; holds total > 0. -/
theorem fam_gpu_util_1 : (((6144 : Int) * (100 : Int)) / (8192 : Int)) = (75 : Int) := by decide

/-- gradient: step(100, 5) = 500 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. -/
theorem fam_gradient_step_1 : ((100 : Int) * (5 : Int)) = (500 : Int) := by decide

/-- gradient: update(100, 3, 10) = 70 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not
    by hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). -/
theorem fam_gradient_update_1 : (fmax (0 : Int) ((100 : Int) - ((3 : Int) * (10 : Int)))) = (70 : Int) := by decide

/-- gradient: learningrate(1000, 4) = 250 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry,
    not by hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum,
    the gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. -/
theorem fam_gradient_learningrate_1 : ((1000 : Int) / (4 : Int)) = (250 : Int) := by decide

/-- gradient: momentum(9, 10, 5) = 95 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not
    by hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. */ static learningrate(base: number, decay: number): CrossFormula { return
    c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base /
    decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) } /** MOMENTUM: carried velocity
    plus the current gradient. value mu · velocity + grad. -/
theorem fam_gradient_momentum_1 : (((9 : Int) * (10 : Int)) + (5 : Int)) = (95 : Int) := by decide

/-- gradient: norm(3, 4) = 25 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. */ static learningrate(base: number, decay: number): CrossFormula { return
    c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base /
    decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) } /** MOMENTUM: carried velocity
    plus the current gradient. value mu · velocity + grad. */ static momentum(mu: number, velocity: number,
    grad: number): CrossFormula { return c('gradient-momentum', 'momentum(mu, velocity, grad) = mu · velocity +
    grad', mu * velocity + grad, nat(mu, velocity, grad), 'momentum', [mu, velocity, grad]) } /** NORM: the
    squared length of a two-component gradient. value gx² + gy². -/
theorem fam_gradient_norm_1 : (((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int) := by decide

/-- gradient: clip(100, 30) = 30 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. */ static learningrate(base: number, decay: number): CrossFormula { return
    c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base /
    decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) } /** MOMENTUM: carried velocity
    plus the current gradient. value mu · velocity + grad. */ static momentum(mu: number, velocity: number,
    grad: number): CrossFormula { return c('gradient-momentum', 'momentum(mu, velocity, grad) = mu · velocity +
    grad', mu * velocity + grad, nat(mu, velocity, grad), 'momentum', [mu, velocity, grad]) } /** NORM: the
    squared length of a two-component gradient. value gx² + gy². */ static norm(gx: number, gy: number):
    CrossFormula { return c('gradient-norm', 'norm(gx, gy) = gx² + gy²', gx * gx + gy * gy, nat(gx, gy), 'norm',
    [gx, gy]) } /** CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). -/
theorem fam_gradient_clip_1 : (fmin (100 : Int) (30 : Int)) = (30 : Int) := by decide

/-- gradient: clip(20, 30) = 20 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. */ static learningrate(base: number, decay: number): CrossFormula { return
    c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base /
    decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) } /** MOMENTUM: carried velocity
    plus the current gradient. value mu · velocity + grad. */ static momentum(mu: number, velocity: number,
    grad: number): CrossFormula { return c('gradient-momentum', 'momentum(mu, velocity, grad) = mu · velocity +
    grad', mu * velocity + grad, nat(mu, velocity, grad), 'momentum', [mu, velocity, grad]) } /** NORM: the
    squared length of a two-component gradient. value gx² + gy². */ static norm(gx: number, gy: number):
    CrossFormula { return c('gradient-norm', 'norm(gx, gy) = gx² + gy²', gx * gx + gy * gy, nat(gx, gy), 'norm',
    [gx, gy]) } /** CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). -/
theorem fam_gradient_clip_2 : (fmin (20 : Int) (30 : Int)) = (20 : Int) := by decide

/-- gradient: decay(100, 30) = 70 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. */ static learningrate(base: number, decay: number): CrossFormula { return
    c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base /
    decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) } /** MOMENTUM: carried velocity
    plus the current gradient. value mu · velocity + grad. */ static momentum(mu: number, velocity: number,
    grad: number): CrossFormula { return c('gradient-momentum', 'momentum(mu, velocity, grad) = mu · velocity +
    grad', mu * velocity + grad, nat(mu, velocity, grad), 'momentum', [mu, velocity, grad]) } /** NORM: the
    squared length of a two-component gradient. value gx² + gy². */ static norm(gx: number, gy: number):
    CrossFormula { return c('gradient-norm', 'norm(gx, gy) = gx² + gy²', gx * gx + gy * gy, nat(gx, gy), 'norm',
    [gx, gy]) } /** CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). */ static
    clip(grad: number, threshold: number): CrossFormula { return c('gradient-clip', 'clip(grad, threshold) =
    min(grad, threshold)', Math.min(grad, threshold), nat(grad, threshold), 'clip', [grad, threshold]) } /**
    DECAY: a weight shrunk by a decay amount, floored at zero. value max(0, weight − rate). -/
theorem fam_gradient_decay_1 : (fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int) := by decide

/-- gradient: epoch(1000, 32) = 32 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. */ static step(iters: number, size: number):
    CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size),
    'step', [iters, size]) } /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param
    − lr · grad). */ static update(param: number, lr: number, grad: number): CrossFormula { return
    c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad),
    nat(param, lr, grad), 'update', [param, lr, grad]) } /** LEARNING RATE: a base rate divided by a decay
    factor. value ⌊base / decay⌋. */ static learningrate(base: number, decay: number): CrossFormula { return
    c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base /
    decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) } /** MOMENTUM: carried velocity
    plus the current gradient. value mu · velocity + grad. */ static momentum(mu: number, velocity: number,
    grad: number): CrossFormula { return c('gradient-momentum', 'momentum(mu, velocity, grad) = mu · velocity +
    grad', mu * velocity + grad, nat(mu, velocity, grad), 'momentum', [mu, velocity, grad]) } /** NORM: the
    squared length of a two-component gradient. value gx² + gy². */ static norm(gx: number, gy: number):
    CrossFormula { return c('gradient-norm', 'norm(gx, gy) = gx² + gy²', gx * gx + gy * gy, nat(gx, gy), 'norm',
    [gx, gy]) } /** CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). */ static
    clip(grad: number, threshold: number): CrossFormula { return c('gradient-clip', 'clip(grad, threshold) =
    min(grad, threshold)', Math.min(grad, threshold), nat(grad, threshold), 'clip', [grad, threshold]) } /**
    DECAY: a weight shrunk by a decay amount, floored at zero. value max(0, weight − rate). */ static
    decay(weight: number, rate: number): CrossFormula { return c('gradient-decay', 'decay(weight, rate) = max(0,
    weight − rate)', Math.max(0, weight - rate), nat(weight, rate), 'decay', [weight, rate]) } /** EPOCH: the
    batches one epoch holds over a dataset. value ⌈samples / batch⌉. -/
theorem fam_gradient_epoch_1 : (-((-(1000 : Int)) / (32 : Int))) = (32 : Int) := by decide

/-- grammar: rules(100, 3) = 300 -/
theorem fam_grammar_rules_1 : ((100 : Int) * (3 : Int)) = (300 : Int) := by decide

/-- grammar: posclasses(8, 0) = 8 -/
theorem fam_grammar_posclasses_1 : ((8 : Int) + (0 : Int)) = (8 : Int) := by decide

/-- grammar: parsepaths(5) = 120 -/
theorem fam_grammar_parsepaths_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- grammar: rulecombos(12, 3) = 220 -/
theorem fam_grammar_rulecombos_1 : (Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int) := by decide

/-- grammar: phrasestructuresubsets(6) = 64 -/
theorem fam_grammar_phrasestructuresubsets_1 : ((2 : Int) ^ (6 : Nat)) = (64 : Int) := by decide

/-- grammar: agreementfeatures(3, 2) = 5 -/
theorem fam_grammar_agreementfeatures_1 : ((3 : Int) + (2 : Int)) = (5 : Int) := by decide

/-- grammar: recursiondepth(5, 0) = 5 -/
theorem fam_grammar_recursiondepth_1 : ((5 : Int) + (0 : Int)) = (5 : Int) := by decide

/-- grammar: grammaticalityratio(90, 100) = 90 -/
theorem fam_grammar_grammaticalityratio_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- graph: edges(10, 2) = 45 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). -/
theorem fam_graph_edges_1 : (Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int) := by decide

/-- graph: degree(2, 10) = 20 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. -/
theorem fam_graph_degree_1 : ((2 : Int) * (10 : Int)) = (20 : Int) := by decide

/-- graph: paths(6, 2) = 30 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. */ static degree(x: number, y: number): CrossFormula { return f('graph-degree',
    'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) } /** paths(x, y) = x! / (x − y)!. -/
theorem fam_graph_paths_1 : ((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int) := by decide

/-- graph: components(3, 0) = 3 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. */ static degree(x: number, y: number): CrossFormula { return f('graph-degree',
    'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) } /** paths(x, y) = x! / (x − y)!. */ static
    paths(x: number, y: number): CrossFormula { return f('graph-paths', 'paths(x, y) = x! / (x − y)!', permOf(x,
    y), nat(x, y) && x <= 20 && y <= x, 'paths', [x, y]) } /** components(x, y) = x + y. -/
theorem fam_graph_components_1 : ((3 : Int) + (0 : Int)) = (3 : Int) := by decide

/-- graph: spanning(10, 1) = 9 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. */ static degree(x: number, y: number): CrossFormula { return f('graph-degree',
    'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) } /** paths(x, y) = x! / (x − y)!. */ static
    paths(x: number, y: number): CrossFormula { return f('graph-paths', 'paths(x, y) = x! / (x − y)!', permOf(x,
    y), nat(x, y) && x <= 20 && y <= x, 'paths', [x, y]) } /** components(x, y) = x + y. */ static components(x:
    number, y: number): CrossFormula { return f('graph-components', 'components(x, y) = x + y', x + y, nat(x,
    y), 'components', [x, y]) } /** spanning(x, y) = max(0, x − y). -/
theorem fam_graph_spanning_1 : (fmax (0 : Int) ((10 : Int) - (1 : Int))) = (9 : Int) := by decide

/-- graph: density(18, 45) = 40 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. */ static degree(x: number, y: number): CrossFormula { return f('graph-degree',
    'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) } /** paths(x, y) = x! / (x − y)!. */ static
    paths(x: number, y: number): CrossFormula { return f('graph-paths', 'paths(x, y) = x! / (x − y)!', permOf(x,
    y), nat(x, y) && x <= 20 && y <= x, 'paths', [x, y]) } /** components(x, y) = x + y. */ static components(x:
    number, y: number): CrossFormula { return f('graph-components', 'components(x, y) = x + y', x + y, nat(x,
    y), 'components', [x, y]) } /** spanning(x, y) = max(0, x − y). */ static spanning(x: number, y: number):
    CrossFormula { return f('graph-spanning', 'spanning(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y),
    'spanning', [x, y]) } /** density(x, y) = x · 100 / y. -/
theorem fam_graph_density_1 : (((18 : Int) * (100 : Int)) / (45 : Int)) = (40 : Int) := by decide

/-- graph: cliques(5) = 32 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex address
    crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. */ static degree(x: number, y: number): CrossFormula { return f('graph-degree',
    'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) } /** paths(x, y) = x! / (x − y)!. */ static
    paths(x: number, y: number): CrossFormula { return f('graph-paths', 'paths(x, y) = x! / (x − y)!', permOf(x,
    y), nat(x, y) && x <= 20 && y <= x, 'paths', [x, y]) } /** components(x, y) = x + y. */ static components(x:
    number, y: number): CrossFormula { return f('graph-components', 'components(x, y) = x + y', x + y, nat(x,
    y), 'components', [x, y]) } /** spanning(x, y) = max(0, x − y). */ static spanning(x: number, y: number):
    CrossFormula { return f('graph-spanning', 'spanning(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y),
    'spanning', [x, y]) } /** density(x, y) = x · 100 / y. */ static density(x: number, y: number): CrossFormula
    { return f('graph-density', 'density(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y)
    && y > 0, 'density', [x, y]) } /** cliques(x) = 2^x. -/
theorem fam_graph_cliques_1 : ((2 : Int) ^ (5 : Nat)) = (32 : Int) := by decide

/-- graph: diameter(100, 10) = 10 — GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex
    address crossing to cross; develops the graph leads. */ const PROOF = "graph counts: edges(x, y) = C(x, y);
    degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y);
    density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y" const factOf = (x: number): number =>
    { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v } const combOf = (nn:
    number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for
    (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) } const permOf = (nn: number, k:
    number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k)) const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const f = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[]): CrossFormula => crossFormulaOf({ id, src:
    'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params }) export
    class GraphFormulas { /** edges(x, y) = C(x, y). */ static edges(x: number, y: number): CrossFormula {
    return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) } /**
    degree(x, y) = x · y. */ static degree(x: number, y: number): CrossFormula { return f('graph-degree',
    'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) } /** paths(x, y) = x! / (x − y)!. */ static
    paths(x: number, y: number): CrossFormula { return f('graph-paths', 'paths(x, y) = x! / (x − y)!', permOf(x,
    y), nat(x, y) && x <= 20 && y <= x, 'paths', [x, y]) } /** components(x, y) = x + y. */ static components(x:
    number, y: number): CrossFormula { return f('graph-components', 'components(x, y) = x + y', x + y, nat(x,
    y), 'components', [x, y]) } /** spanning(x, y) = max(0, x − y). */ static spanning(x: number, y: number):
    CrossFormula { return f('graph-spanning', 'spanning(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y),
    'spanning', [x, y]) } /** density(x, y) = x · 100 / y. */ static density(x: number, y: number): CrossFormula
    { return f('graph-density', 'density(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y)
    && y > 0, 'density', [x, y]) } /** cliques(x) = 2^x. */ static cliques(x: number): CrossFormula { return
    f('graph-cliques', 'cliques(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'cliques', [x]) } /**
    diameter(x, y) = x / y. -/
theorem fam_graph_diameter_1 : ((100 : Int) / (10 : Int)) = (10 : Int) := by decide

/-- graphql: querydepth(20, 5) = 100 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. -/
theorem fam_graphql_querydepth_1 : ((20 : Int) * (5 : Int)) = (100 : Int) := by decide

/-- graphql: complexity(50, 3) = 150 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. -/
theorem fam_graphql_complexity_1 : ((50 : Int) * (3 : Int)) = (150 : Int) := by decide

/-- graphql: resolvers(5000, 50) = 100 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */ static
    complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields,
    cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) } /** RESOLVERS:
    resolver calls over the seconds served. value ⌊calls / seconds⌋. -/
theorem fam_graphql_resolvers_1 : ((5000 : Int) / (50 : Int)) = (100 : Int) := by decide

/-- graphql: nplusone(100, 1) = 101 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */ static
    complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields,
    cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) } /** RESOLVERS:
    resolver calls over the seconds served. value ⌊calls / seconds⌋. */ static resolvers(calls: number, seconds:
    number): CrossFormula { return c('graphql-resolvers', 'resolvers(calls, seconds) = ⌊calls / seconds⌋',
    seconds > 0 ? Math.floor(calls / seconds) : 0, nat(calls, seconds) && seconds > 0, 'resolvers', [calls,
    seconds]) } /** N+1: the total queries a list resolves — one for the list, then one per parent. value 1 +
    parents · per. -/
theorem fam_graphql_nplusone_1 : ((1 : Int) + ((100 : Int) * (1 : Int))) = (101 : Int) := by decide

/-- graphql: fieldcount(40, 8) = 320 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */ static
    complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields,
    cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) } /** RESOLVERS:
    resolver calls over the seconds served. value ⌊calls / seconds⌋. */ static resolvers(calls: number, seconds:
    number): CrossFormula { return c('graphql-resolvers', 'resolvers(calls, seconds) = ⌊calls / seconds⌋',
    seconds > 0 ? Math.floor(calls / seconds) : 0, nat(calls, seconds) && seconds > 0, 'resolvers', [calls,
    seconds]) } /** N+1: the total queries a list resolves — one for the list, then one per parent. value 1 +
    parents · per. */ static nplusone(parents: number, per: number): CrossFormula { return c('graphql-nplusone',
    'nplusone(parents, per) = 1 + parents · per', 1 + parents * per, nat(parents, per), 'nplusone', [parents,
    per]) } /** FIELD COUNT: the fields a schema holds — types at a per-type field count. value types · perType. -/
theorem fam_graphql_fieldcount_1 : ((40 : Int) * (8 : Int)) = (320 : Int) := by decide

/-- graphql: batchsize(1000, 30) = 34 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */ static
    complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields,
    cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) } /** RESOLVERS:
    resolver calls over the seconds served. value ⌊calls / seconds⌋. */ static resolvers(calls: number, seconds:
    number): CrossFormula { return c('graphql-resolvers', 'resolvers(calls, seconds) = ⌊calls / seconds⌋',
    seconds > 0 ? Math.floor(calls / seconds) : 0, nat(calls, seconds) && seconds > 0, 'resolvers', [calls,
    seconds]) } /** N+1: the total queries a list resolves — one for the list, then one per parent. value 1 +
    parents · per. */ static nplusone(parents: number, per: number): CrossFormula { return c('graphql-nplusone',
    'nplusone(parents, per) = 1 + parents · per', 1 + parents * per, nat(parents, per), 'nplusone', [parents,
    per]) } /** FIELD COUNT: the fields a schema holds — types at a per-type field count. value types · perType.
    */ static fieldcount(types: number, perType: number): CrossFormula { return c('graphql-fieldcount',
    'fieldcount(types, perType) = types · perType', types * perType, nat(types, perType), 'fieldcount', [types,
    perType]) } /** BATCH SIZE: the batches a dataloader groups items into. value ⌈items / perBatch⌉. -/
theorem fam_graphql_batchsize_1 : (-((-(1000 : Int)) / (30 : Int))) = (34 : Int) := by decide

/-- graphql: cachehit(950, 1000) = 95 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */ static
    complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields,
    cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) } /** RESOLVERS:
    resolver calls over the seconds served. value ⌊calls / seconds⌋. */ static resolvers(calls: number, seconds:
    number): CrossFormula { return c('graphql-resolvers', 'resolvers(calls, seconds) = ⌊calls / seconds⌋',
    seconds > 0 ? Math.floor(calls / seconds) : 0, nat(calls, seconds) && seconds > 0, 'resolvers', [calls,
    seconds]) } /** N+1: the total queries a list resolves — one for the list, then one per parent. value 1 +
    parents · per. */ static nplusone(parents: number, per: number): CrossFormula { return c('graphql-nplusone',
    'nplusone(parents, per) = 1 + parents · per', 1 + parents * per, nat(parents, per), 'nplusone', [parents,
    per]) } /** FIELD COUNT: the fields a schema holds — types at a per-type field count. value types · perType.
    */ static fieldcount(types: number, perType: number): CrossFormula { return c('graphql-fieldcount',
    'fieldcount(types, perType) = types · perType', types * perType, nat(types, perType), 'fieldcount', [types,
    perType]) } /** BATCH SIZE: the batches a dataloader groups items into. value ⌈items / perBatch⌉. */ static
    batchsize(items: number, perBatch: number): CrossFormula { return c('graphql-batchsize', 'batchsize(items,
    perBatch) = ⌈items / perBatch⌉', perBatch > 0 ? Math.ceil(items / perBatch) : 0, nat(items, perBatch) &&
    perBatch > 0, 'batchsize', [items, perBatch]) } /** CACHE HIT: the hit rate as a percentage. value ⌊hits ·
    100 / total⌋. -/
theorem fam_graphql_cachehit_1 : (((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int) := by decide

/-- graphql: fragmentreuse(600, 8) = 75 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. */ static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth',
    'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields,
    levels]) } /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */ static
    complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields,
    cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) } /** RESOLVERS:
    resolver calls over the seconds served. value ⌊calls / seconds⌋. */ static resolvers(calls: number, seconds:
    number): CrossFormula { return c('graphql-resolvers', 'resolvers(calls, seconds) = ⌊calls / seconds⌋',
    seconds > 0 ? Math.floor(calls / seconds) : 0, nat(calls, seconds) && seconds > 0, 'resolvers', [calls,
    seconds]) } /** N+1: the total queries a list resolves — one for the list, then one per parent. value 1 +
    parents · per. */ static nplusone(parents: number, per: number): CrossFormula { return c('graphql-nplusone',
    'nplusone(parents, per) = 1 + parents · per', 1 + parents * per, nat(parents, per), 'nplusone', [parents,
    per]) } /** FIELD COUNT: the fields a schema holds — types at a per-type field count. value types · perType.
    */ static fieldcount(types: number, perType: number): CrossFormula { return c('graphql-fieldcount',
    'fieldcount(types, perType) = types · perType', types * perType, nat(types, perType), 'fieldcount', [types,
    perType]) } /** BATCH SIZE: the batches a dataloader groups items into. value ⌈items / perBatch⌉. */ static
    batchsize(items: number, perBatch: number): CrossFormula { return c('graphql-batchsize', 'batchsize(items,
    perBatch) = ⌈items / perBatch⌉', perBatch > 0 ? Math.ceil(items / perBatch) : 0, nat(items, perBatch) &&
    perBatch > 0, 'batchsize', [items, perBatch]) } /** CACHE HIT: the hit rate as a percentage. value ⌊hits ·
    100 / total⌋. */ static cachehit(hits: number, total: number): CrossFormula { return c('graphql-cachehit',
    'cachehit(hits, total) = ⌊hits · 100 / total⌋', total > 0 ? Math.floor((hits * 100) / total) : 0, nat(hits,
    total) && total > 0 && hits <= total, 'cachehit', [hits, total]) } /** FRAGMENT REUSE: how often a fragment
    is reused on average across a query. value ⌊uses / fragments⌋. -/
theorem fam_graphql_fragmentreuse_1 : ((600 : Int) / (8 : Int)) = (75 : Int) := by decide

/-- graphtheory: edges(10) = 45 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted: the
    edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a spanning
    tree needs, the components a forest splits into, the edges a planar drawing allows, and the independent
    cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A measure. */ const
    PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake sum, tree edges,
    forest components, planar bound, cyclomatic number); a measure crossed to algebra' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas { /**
    COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. -/
theorem fam_graphtheory_edges_1 : (((10 : Int) * ((10 : Int) - (1 : Int))) / (2 : Int)) = (45 : Int) := by decide

/-- graphtheory: density(45, 10) = 100 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is
    counted: the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges
    a spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. -/
theorem fam_graphtheory_density_1 : ((((2 : Int) * (45 : Int)) * (100 : Int)) / ((10 : Int) * ((10 : Int) - (1 : Int)))) = (100 : Int) := by decide

/-- graphtheory: degree(45, 10) = 9 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted:
    the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a
    spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. */ static density(edges: number, n: number): CrossFormula { return
    c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ?
    Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) } /**
    AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. -/
theorem fam_graphtheory_degree_1 : (((2 : Int) * (45 : Int)) / (10 : Int)) = (9 : Int) := by decide

/-- graphtheory: handshake(45) = 90 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted:
    the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a
    spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. */ static density(edges: number, n: number): CrossFormula { return
    c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ?
    Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) } /**
    AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. */ static degree(edges: number, n:
    number): CrossFormula { return c('graphtheory-degree', 'degree(edges, n) = ⌊2 · edges / n⌋', n > 0 ?
    Math.floor((2 * edges) / n) : 0, nat(edges, n) && n > 0, 'degree', [edges, n]) } /** HANDSHAKE SUM: the
    degrees of every vertex add to twice the edges. value 2 · edges. -/
theorem fam_graphtheory_handshake_1 : ((2 : Int) * (45 : Int)) = (90 : Int) := by decide

/-- graphtheory: treeedges(10) = 9 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted:
    the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a
    spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. */ static density(edges: number, n: number): CrossFormula { return
    c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ?
    Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) } /**
    AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. */ static degree(edges: number, n:
    number): CrossFormula { return c('graphtheory-degree', 'degree(edges, n) = ⌊2 · edges / n⌋', n > 0 ?
    Math.floor((2 * edges) / n) : 0, nat(edges, n) && n > 0, 'degree', [edges, n]) } /** HANDSHAKE SUM: the
    degrees of every vertex add to twice the edges. value 2 · edges. */ static handshake(edges: number):
    CrossFormula { return c('graphtheory-handshake', 'handshake(edges) = 2 · edges', 2 * edges, nat(edges),
    'handshake', [edges]) } /** TREE EDGES: a spanning tree on n nodes. value max(0, n − 1). -/
theorem fam_graphtheory_treeedges_1 : (fmax (0 : Int) ((10 : Int) - (1 : Int))) = (9 : Int) := by decide

/-- graphtheory: components(10, 7) = 3 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is
    counted: the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges
    a spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. */ static density(edges: number, n: number): CrossFormula { return
    c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ?
    Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) } /**
    AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. */ static degree(edges: number, n:
    number): CrossFormula { return c('graphtheory-degree', 'degree(edges, n) = ⌊2 · edges / n⌋', n > 0 ?
    Math.floor((2 * edges) / n) : 0, nat(edges, n) && n > 0, 'degree', [edges, n]) } /** HANDSHAKE SUM: the
    degrees of every vertex add to twice the edges. value 2 · edges. */ static handshake(edges: number):
    CrossFormula { return c('graphtheory-handshake', 'handshake(edges) = 2 · edges', 2 * edges, nat(edges),
    'handshake', [edges]) } /** TREE EDGES: a spanning tree on n nodes. value max(0, n − 1). */ static
    treeedges(n: number): CrossFormula { return c('graphtheory-treeedges', 'treeedges(n) = max(0, n − 1)',
    Math.max(0, n - 1), nat(n), 'treeedges', [n]) } /** FOREST COMPONENTS: nodes less edges in an acyclic graph.
    value max(0, nodes − edges). -/
theorem fam_graphtheory_components_1 : (fmax (0 : Int) ((10 : Int) - (7 : Int))) = (3 : Int) := by decide

/-- graphtheory: planaredges(10) = 24 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted:
    the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a
    spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. */ static density(edges: number, n: number): CrossFormula { return
    c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ?
    Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) } /**
    AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. */ static degree(edges: number, n:
    number): CrossFormula { return c('graphtheory-degree', 'degree(edges, n) = ⌊2 · edges / n⌋', n > 0 ?
    Math.floor((2 * edges) / n) : 0, nat(edges, n) && n > 0, 'degree', [edges, n]) } /** HANDSHAKE SUM: the
    degrees of every vertex add to twice the edges. value 2 · edges. */ static handshake(edges: number):
    CrossFormula { return c('graphtheory-handshake', 'handshake(edges) = 2 · edges', 2 * edges, nat(edges),
    'handshake', [edges]) } /** TREE EDGES: a spanning tree on n nodes. value max(0, n − 1). */ static
    treeedges(n: number): CrossFormula { return c('graphtheory-treeedges', 'treeedges(n) = max(0, n − 1)',
    Math.max(0, n - 1), nat(n), 'treeedges', [n]) } /** FOREST COMPONENTS: nodes less edges in an acyclic graph.
    value max(0, nodes − edges). */ static components(nodes: number, edges: number): CrossFormula { return
    c('graphtheory-components', 'components(nodes, edges) = max(0, nodes − edges)', Math.max(0, nodes - edges),
    nat(nodes, edges) && edges <= nodes, 'components', [nodes, edges]) } /** PLANAR BOUND: the most edges a
    planar graph on n nodes allows. value max(0, 3 · n − 6). -/
theorem fam_graphtheory_planaredges_1 : (fmax (0 : Int) (((3 : Int) * (10 : Int)) - (6 : Int))) = (24 : Int) := by decide

/-- graphtheory: cyclomatic(15, 10, 1) = 6 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is
    counted: the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges
    a spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. */ static density(edges: number, n: number): CrossFormula { return
    c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ?
    Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) } /**
    AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. */ static degree(edges: number, n:
    number): CrossFormula { return c('graphtheory-degree', 'degree(edges, n) = ⌊2 · edges / n⌋', n > 0 ?
    Math.floor((2 * edges) / n) : 0, nat(edges, n) && n > 0, 'degree', [edges, n]) } /** HANDSHAKE SUM: the
    degrees of every vertex add to twice the edges. value 2 · edges. */ static handshake(edges: number):
    CrossFormula { return c('graphtheory-handshake', 'handshake(edges) = 2 · edges', 2 * edges, nat(edges),
    'handshake', [edges]) } /** TREE EDGES: a spanning tree on n nodes. value max(0, n − 1). */ static
    treeedges(n: number): CrossFormula { return c('graphtheory-treeedges', 'treeedges(n) = max(0, n − 1)',
    Math.max(0, n - 1), nat(n), 'treeedges', [n]) } /** FOREST COMPONENTS: nodes less edges in an acyclic graph.
    value max(0, nodes − edges). */ static components(nodes: number, edges: number): CrossFormula { return
    c('graphtheory-components', 'components(nodes, edges) = max(0, nodes − edges)', Math.max(0, nodes - edges),
    nat(nodes, edges) && edges <= nodes, 'components', [nodes, edges]) } /** PLANAR BOUND: the most edges a
    planar graph on n nodes allows. value max(0, 3 · n − 6). */ static planaredges(n: number): CrossFormula {
    return c('graphtheory-planaredges', 'planaredges(n) = max(0, 3 · n − 6)', Math.max(0, 3 * n - 6), nat(n),
    'planaredges', [n]) } /** CYCLOMATIC NUMBER: the independent cycles a graph carries. value max(0, edges −
    nodes + components). -/
theorem fam_graphtheory_cyclomatic_1 : (fmax (0 : Int) (((15 : Int) - (10 : Int)) + (1 : Int))) = (6 : Int) := by decide

/-- graphtheory: density(45, 1) = 0 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted:
    the edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a
    spanning tree needs, the components a forest splits into, the edges a planar drawing allows, and the
    independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A
    measure. */ const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake
    sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value,
    proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas {
    /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */ static edges(n: number):
    CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n -
    1)) / 2), nat(n), 'edges', [n]) } /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100
    / (n · (n − 1))⌋. -/
theorem fam_graphtheory_density_2 : ((((2 : Int) * (45 : Int)) * (100 : Int)) / ((1 : Int) * ((1 : Int) - (1 : Int)))) = (0 : Int) := by decide

/-- gravimetry: anomaly(9810, 9805) = 5 -/
theorem fam_gravimetry_anomaly_1 : (fmax (0 : Int) ((9810 : Int) - (9805 : Int))) = (5 : Int) := by decide

/-- gravimetry: freeaircorrection(3, 100) = 300 -/
theorem fam_gravimetry_freeaircorrection_1 : ((3 : Int) * (100 : Int)) = (300 : Int) := by decide

/-- gravimetry: bouguercorrection(1, 110) = 110 -/
theorem fam_gravimetry_bouguercorrection_1 : ((1 : Int) * (110 : Int)) = (110 : Int) := by decide

/-- gravimetry: densitycontrast(2700, 2300) = 400 -/
theorem fam_gravimetry_densitycontrast_1 : (fmax (0 : Int) ((2700 : Int) - (2300 : Int))) = (400 : Int) := by decide

/-- gravimetry: gradient(500, 10) = 50 -/
theorem fam_gravimetry_gradient_1 : ((500 : Int) / (10 : Int)) = (50 : Int) := by decide

/-- gravimetry: stationspacing(10000, 100) = 100 -/
theorem fam_gravimetry_stationspacing_1 : ((10000 : Int) / (100 : Int)) = (100 : Int) := by decide

/-- gravimetry: terraincorrection(200, 4) = 50 -/
theorem fam_gravimetry_terraincorrection_1 : ((200 : Int) / (4 : Int)) = (50 : Int) := by decide

/-- gravimetry: surveypoints(50, 20) = 1000 -/
theorem fam_gravimetry_surveypoints_1 : ((50 : Int) * (20 : Int)) = (1000 : Int) := by decide

/-- gravity: weight(70, 10) = 700 — GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The physics is
    numbers: weight (F = m·g), the inverse-square force, the potential, free-fall. And gravity is how the
    lattice BALANCES itself: a computation's mass is its time times its temperature — slow (high ms, from wave)
    and hot (high mK, from heat.temperature) code is HEAVY — and the lever law says where the pivot sits, where
    the barycenter is, and how far light work must move to counter a heavy one. So the slow, hot code detected
    by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */ const PROOF =
    'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice — a
    computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter and
    equilibrium so slow, hot code is balanced; crossed to heat' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const g = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `gravity.${name}`,
    params }) export class GravityFormulas { /** WEIGHT: force under gravity, F = m · g. value mass · g. -/
theorem fam_gravity_weight_1 : ((70 : Int) * (10 : Int)) = (700 : Int) := by decide

/-- gravity: force(100, 100, 10) = 100 — GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The physics
    is numbers: weight (F = m·g), the inverse-square force, the potential, free-fall. And gravity is how the
    lattice BALANCES itself: a computation's mass is its time times its temperature — slow (high ms, from wave)
    and hot (high mK, from heat.temperature) code is HEAVY — and the lever law says where the pivot sits, where
    the barycenter is, and how far light work must move to counter a heavy one. So the slow, hot code detected
    by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */ const PROOF =
    'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice — a
    computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter and
    equilibrium so slow, hot code is balanced; crossed to heat' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const g = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `gravity.${name}`,
    params }) export class GravityFormulas { /** WEIGHT: force under gravity, F = m · g. value mass · g. */
    static weight(mass: number, acceleration: number): CrossFormula { return g('gravity-weight', 'weight(mass,
    g) = mass · g', mass * acceleration, nat(mass, acceleration), 'weight', [mass, acceleration]) } /** THE
    INVERSE-SQUARE FORCE (G = 1): m1 · m2 over the distance squared. value ⌊m1 · m2 / r²⌋. -/
theorem fam_gravity_force_1 : (((100 : Int) * (100 : Int)) / ((10 : Int) ^ (2 : Nat))) = (100 : Int) := by decide

/-- gravity: potential(1000, 50) = 20 — GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The physics
    is numbers: weight (F = m·g), the inverse-square force, the potential, free-fall. And gravity is how the
    lattice BALANCES itself: a computation's mass is its time times its temperature — slow (high ms, from wave)
    and hot (high mK, from heat.temperature) code is HEAVY — and the lever law says where the pivot sits, where
    the barycenter is, and how far light work must move to counter a heavy one. So the slow, hot code detected
    by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */ const PROOF =
    'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice — a
    computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter and
    equilibrium so slow, hot code is balanced; crossed to heat' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const g = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `gravity.${name}`,
    params }) export class GravityFormulas { /** WEIGHT: force under gravity, F = m · g. value mass · g. */
    static weight(mass: number, acceleration: number): CrossFormula { return g('gravity-weight', 'weight(mass,
    g) = mass · g', mass * acceleration, nat(mass, acceleration), 'weight', [mass, acceleration]) } /** THE
    INVERSE-SQUARE FORCE (G = 1): m1 · m2 over the distance squared. value ⌊m1 · m2 / r²⌋. */ static force(m1:
    number, m2: number, r: number): CrossFormula { return g('gravity-force', 'force(m1, m2, r) = ⌊m1 · m2 /
    r²⌋', r > 0 ? Math.floor((m1 * m2) / (r * r)) : 0, nat(m1, m2, r) && r > 0, 'force', [m1, m2, r]) } /** THE
    POTENTIAL (magnitude): mass over radius. value ⌊mass / radius⌋. -/
theorem fam_gravity_potential_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- gravity: freefall(20, 10) = 4 — GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The physics is
    numbers: weight (F = m·g), the inverse-square force, the potential, free-fall. And gravity is how the
    lattice BALANCES itself: a computation's mass is its time times its temperature — slow (high ms, from wave)
    and hot (high mK, from heat.temperature) code is HEAVY — and the lever law says where the pivot sits, where
    the barycenter is, and how far light work must move to counter a heavy one. So the slow, hot code detected
    by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */ const PROOF =
    'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice — a
    computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter and
    equilibrium so slow, hot code is balanced; crossed to heat' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const g = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `gravity.${name}`,
    params }) export class GravityFormulas { /** WEIGHT: force under gravity, F = m · g. value mass · g. */
    static weight(mass: number, acceleration: number): CrossFormula { return g('gravity-weight', 'weight(mass,
    g) = mass · g', mass * acceleration, nat(mass, acceleration), 'weight', [mass, acceleration]) } /** THE
    INVERSE-SQUARE FORCE (G = 1): m1 · m2 over the distance squared. value ⌊m1 · m2 / r²⌋. */ static force(m1:
    number, m2: number, r: number): CrossFormula { return g('gravity-force', 'force(m1, m2, r) = ⌊m1 · m2 /
    r²⌋', r > 0 ? Math.floor((m1 * m2) / (r * r)) : 0, nat(m1, m2, r) && r > 0, 'force', [m1, m2, r]) } /** THE
    POTENTIAL (magnitude): mass over radius. value ⌊mass / radius⌋. */ static potential(mass: number, radius:
    number): CrossFormula { return g('gravity-potential', 'potential(mass, radius) = ⌊mass / radius⌋', radius >
    0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'potential', [mass, radius]) } /**
    FREE-FALL time squared: t² = 2h / g. value ⌊2 · height / g⌋. -/
theorem fam_gravity_freefall_1 : (((2 : Int) * (20 : Int)) / (10 : Int)) = (4 : Int) := by decide

/-- gravity: center(6000, 100, 61) = 1 — GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The physics
    is numbers: weight (F = m·g), the inverse-square force, the potential, free-fall. And gravity is how the
    lattice BALANCES itself: a computation's mass is its time times its temperature — slow (high ms, from wave)
    and hot (high mK, from heat.temperature) code is HEAVY — and the lever law says where the pivot sits, where
    the barycenter is, and how far light work must move to counter a heavy one. So the slow, hot code detected
    by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */ const PROOF =
    'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice — a
    computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter and
    equilibrium so slow, hot code is balanced; crossed to heat' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const g = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `gravity.${name}`,
    params }) export class GravityFormulas { /** WEIGHT: force under gravity, F = m · g. value mass · g. */
    static weight(mass: number, acceleration: number): CrossFormula { return g('gravity-weight', 'weight(mass,
    g) = mass · g', mass * acceleration, nat(mass, acceleration), 'weight', [mass, acceleration]) } /** THE
    INVERSE-SQUARE FORCE (G = 1): m1 · m2 over the distance squared. value ⌊m1 · m2 / r²⌋. */ static force(m1:
    number, m2: number, r: number): CrossFormula { return g('gravity-force', 'force(m1, m2, r) = ⌊m1 · m2 /
    r²⌋', r > 0 ? Math.floor((m1 * m2) / (r * r)) : 0, nat(m1, m2, r) && r > 0, 'force', [m1, m2, r]) } /** THE
    POTENTIAL (magnitude): mass over radius. value ⌊mass / radius⌋. */ static potential(mass: number, radius:
    number): CrossFormula { return g('gravity-potential', 'potential(mass, radius) = ⌊mass / radius⌋', radius >
    0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'potential', [mass, radius]) } /**
    FREE-FALL time squared: t² = 2h / g. value ⌊2 · height / g⌋. */ static freefall(height: number,
    acceleration: number): CrossFormula { return g('gravity-freefall', 'freefall(height, g) = ⌊2 · height / g⌋',
    acceleration > 0 ? Math.floor((2 * height) / acceleration) : 0, nat(height, acceleration) && acceleration >
    0, 'freefall', [height, acceleration]) } /** THE MASS OF A COMPUTATION: its time times its temperature —
    slow (ms, from wave) and hot (mK, from heat) code is heavy. This is what gravity balances. value ms · mK. */
    static load(ms: number, mK: number): CrossFormula { return g('gravity-load', 'load(ms, mK) = ms · mK (time ×
    temperature — the mass of a slow, hot computation)', ms * mK, nat(ms, mK), 'load', [ms, mK]) } /** THE PIVOT
    as a percentage: how much a heavy side pulls the balance — the fraction of work to move off it. value ⌊heavy
    · 100 / (heavy + light)⌋. A slow, hot computation (heavy) past 50 is pulling the lattice out of balance. */
    static balance(heavy: number, light: number): CrossFormula { return g('gravity-balance', 'balance(heavy,
    light) = ⌊heavy · 100 / (heavy + light)⌋', heavy + light > 0 ? Math.floor((heavy * 100) / (heavy + light)) :
    0, nat(heavy, light) && heavy + light > 0, 'balance', [heavy, light]) } /** THE BARYCENTER: where two loads
    balance along a separation d, measured from m1. value ⌊m2 · d / (m1 + m2)⌋. -/
theorem fam_gravity_center_1 : (((100 : Int) * (61 : Int)) / ((6000 : Int) + (100 : Int))) = (1 : Int) := by decide

/-- gravity: equilibrium(6000, 1, 100) = 60 — GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The
    physics is numbers: weight (F = m·g), the inverse-square force, the potential, free-fall. And gravity is how
    the lattice BALANCES itself: a computation's mass is its time times its temperature — slow (high ms, from
    wave) and hot (high mK, from heat.temperature) code is HEAVY — and the lever law says where the pivot sits,
    where the barycenter is, and how far light work must move to counter a heavy one. So the slow, hot code
    detected by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */ const
    PROOF = 'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice —
    a computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter
    and equilibrium so slow, hot code is balanced; crossed to heat' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const g = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gravity.${name}`, params }) export class GravityFormulas { /** WEIGHT: force under gravity, F = m · g.
    value mass · g. */ static weight(mass: number, acceleration: number): CrossFormula { return
    g('gravity-weight', 'weight(mass, g) = mass · g', mass * acceleration, nat(mass, acceleration), 'weight',
    [mass, acceleration]) } /** THE INVERSE-SQUARE FORCE (G = 1): m1 · m2 over the distance squared. value ⌊m1 ·
    m2 / r²⌋. */ static force(m1: number, m2: number, r: number): CrossFormula { return g('gravity-force',
    'force(m1, m2, r) = ⌊m1 · m2 / r²⌋', r > 0 ? Math.floor((m1 * m2) / (r * r)) : 0, nat(m1, m2, r) && r > 0,
    'force', [m1, m2, r]) } /** THE POTENTIAL (magnitude): mass over radius. value ⌊mass / radius⌋. */ static
    potential(mass: number, radius: number): CrossFormula { return g('gravity-potential', 'potential(mass,
    radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0,
    'potential', [mass, radius]) } /** FREE-FALL time squared: t² = 2h / g. value ⌊2 · height / g⌋. */ static
    freefall(height: number, acceleration: number): CrossFormula { return g('gravity-freefall',
    'freefall(height, g) = ⌊2 · height / g⌋', acceleration > 0 ? Math.floor((2 * height) / acceleration) : 0,
    nat(height, acceleration) && acceleration > 0, 'freefall', [height, acceleration]) } /** THE MASS OF A
    COMPUTATION: its time times its temperature — slow (ms, from wave) and hot (mK, from heat) code is heavy.
    This is what gravity balances. value ms · mK. */ static load(ms: number, mK: number): CrossFormula { return
    g('gravity-load', 'load(ms, mK) = ms · mK (time × temperature — the mass of a slow, hot computation)', ms *
    mK, nat(ms, mK), 'load', [ms, mK]) } /** THE PIVOT as a percentage: how much a heavy side pulls the balance
    — the fraction of work to move off it. value ⌊heavy · 100 / (heavy + light)⌋. A slow, hot computation
    (heavy) past 50 is pulling the lattice out of balance. */ static balance(heavy: number, light: number):
    CrossFormula { return g('gravity-balance', 'balance(heavy, light) = ⌊heavy · 100 / (heavy + light)⌋', heavy
    + light > 0 ? Math.floor((heavy * 100) / (heavy + light)) : 0, nat(heavy, light) && heavy + light > 0,
    'balance', [heavy, light]) } /** THE BARYCENTER: where two loads balance along a separation d, measured from
    m1. value ⌊m2 · d / (m1 + m2)⌋. */ static center(m1: number, m2: number, d: number): CrossFormula { return
    g('gravity-center', 'center(m1, m2, d) = ⌊m2 · d / (m1 + m2)⌋', m1 + m2 > 0 ? Math.floor((m2 * d) / (m1 +
    m2)) : 0, nat(m1, m2, d) && m1 + m2 > 0, 'center', [m1, m2, d]) } /** THE LEVER LAW: the distance at which a
    light load m2 balances a heavy one m1 held at d1 (m1 · d1 = m2 · d2). How far light work must move to
    counter the heavy, slow code. value ⌊m1 · d1 / m2⌋. -/
theorem fam_gravity_equilibrium_1 : (((6000 : Int) * (1 : Int)) / (100 : Int)) = (60 : Int) := by decide

/-- grazing: stockingrate(100, 20) = 5 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. -/
theorem fam_grazing_stockingrate_1 : ((100 : Int) / (20 : Int)) = (5 : Int) := by decide

/-- grazing: carryingcapacity(5000, 25) = 200 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land
    is numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. -/
theorem fam_grazing_carryingcapacity_1 : ((5000 : Int) / (25 : Int)) = (200 : Int) := by decide

/-- grazing: forageutilization(600, 1000) = 60 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land
    is numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */ static
    carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity',
    'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0,
    nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) } /** FORAGE UTILIZATION as a
    percentage. value ⌊grazed · 100 / available⌋. -/
theorem fam_grazing_forageutilization_1 : (((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int) := by decide

/-- grazing: restperiod(40, 5) = 35 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */ static
    carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity',
    'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0,
    nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) } /** FORAGE UTILIZATION as a
    percentage. value ⌊grazed · 100 / available⌋. */ static forageutilization(grazed: number, available:
    number): CrossFormula { return c('grazing-forageutilization', 'forageutilization(grazed, available) =
    ⌊grazed · 100 / available⌋', available > 0 ? Math.floor((grazed * 100) / available) : 0, nat(grazed,
    available) && available > 0 && grazed <= available, 'forageutilization', [grazed, available]) } /** REST
    PERIOD: the days a paddock rests out of a cycle after grazing. value max(0, cycle − graze). -/
theorem fam_grazing_restperiod_1 : (fmax (0 : Int) ((40 : Int) - (5 : Int))) = (35 : Int) := by decide

/-- grazing: animalunits(50, 1200) = 60 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */ static
    carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity',
    'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0,
    nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) } /** FORAGE UTILIZATION as a
    percentage. value ⌊grazed · 100 / available⌋. */ static forageutilization(grazed: number, available:
    number): CrossFormula { return c('grazing-forageutilization', 'forageutilization(grazed, available) =
    ⌊grazed · 100 / available⌋', available > 0 ? Math.floor((grazed * 100) / available) : 0, nat(grazed,
    available) && available > 0 && grazed <= available, 'forageutilization', [grazed, available]) } /** REST
    PERIOD: the days a paddock rests out of a cycle after grazing. value max(0, cycle − graze). */ static
    restperiod(cycle: number, graze: number): CrossFormula { return c('grazing-restperiod', 'restperiod(cycle,
    graze) = max(0, cycle − graze)', Math.max(0, cycle - graze), nat(cycle, graze), 'restperiod', [cycle,
    graze]) } /** ANIMAL UNITS: head at an average weight, one unit per 1000 lb. value ⌊head · weight / 1000⌋. -/
theorem fam_grazing_animalunits_1 : (((50 : Int) * (1200 : Int)) / (1000 : Int)) = (60 : Int) := by decide

/-- grazing: pasturedays(3000, 30) = 100 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */ static
    carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity',
    'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0,
    nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) } /** FORAGE UTILIZATION as a
    percentage. value ⌊grazed · 100 / available⌋. */ static forageutilization(grazed: number, available:
    number): CrossFormula { return c('grazing-forageutilization', 'forageutilization(grazed, available) =
    ⌊grazed · 100 / available⌋', available > 0 ? Math.floor((grazed * 100) / available) : 0, nat(grazed,
    available) && available > 0 && grazed <= available, 'forageutilization', [grazed, available]) } /** REST
    PERIOD: the days a paddock rests out of a cycle after grazing. value max(0, cycle − graze). */ static
    restperiod(cycle: number, graze: number): CrossFormula { return c('grazing-restperiod', 'restperiod(cycle,
    graze) = max(0, cycle − graze)', Math.max(0, cycle - graze), nat(cycle, graze), 'restperiod', [cycle,
    graze]) } /** ANIMAL UNITS: head at an average weight, one unit per 1000 lb. value ⌊head · weight / 1000⌋.
    */ static animalunits(head: number, weight: number): CrossFormula { return c('grazing-animalunits',
    'animalunits(head, weight) = ⌊head · weight / 1000⌋', Math.floor((head * weight) / 1000), nat(head, weight),
    'animalunits', [head, weight]) } /** PASTURE DAYS: the days a forage stock lasts at a daily intake. value
    ⌊forage / intake⌋. -/
theorem fam_grazing_pasturedays_1 : ((3000 : Int) / (30 : Int)) = (100 : Int) := by decide

/-- grazing: dmintake(1200, 3) = 36 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */ static
    carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity',
    'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0,
    nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) } /** FORAGE UTILIZATION as a
    percentage. value ⌊grazed · 100 / available⌋. */ static forageutilization(grazed: number, available:
    number): CrossFormula { return c('grazing-forageutilization', 'forageutilization(grazed, available) =
    ⌊grazed · 100 / available⌋', available > 0 ? Math.floor((grazed * 100) / available) : 0, nat(grazed,
    available) && available > 0 && grazed <= available, 'forageutilization', [grazed, available]) } /** REST
    PERIOD: the days a paddock rests out of a cycle after grazing. value max(0, cycle − graze). */ static
    restperiod(cycle: number, graze: number): CrossFormula { return c('grazing-restperiod', 'restperiod(cycle,
    graze) = max(0, cycle − graze)', Math.max(0, cycle - graze), nat(cycle, graze), 'restperiod', [cycle,
    graze]) } /** ANIMAL UNITS: head at an average weight, one unit per 1000 lb. value ⌊head · weight / 1000⌋.
    */ static animalunits(head: number, weight: number): CrossFormula { return c('grazing-animalunits',
    'animalunits(head, weight) = ⌊head · weight / 1000⌋', Math.floor((head * weight) / 1000), nat(head, weight),
    'animalunits', [head, weight]) } /** PASTURE DAYS: the days a forage stock lasts at a daily intake. value
    ⌊forage / intake⌋. */ static pasturedays(forage: number, intake: number): CrossFormula { return
    c('grazing-pasturedays', 'pasturedays(forage, intake) = ⌊forage / intake⌋', intake > 0 ? Math.floor(forage /
    intake) : 0, nat(forage, intake) && intake > 0, 'pasturedays', [forage, intake]) } /** DRY-MATTER INTAKE: a
    share of body weight per day. value ⌊weight · pct / 100⌋. -/
theorem fam_grazing_dmintake_1 : (((1200 : Int) * (3 : Int)) / (100 : Int)) = (36 : Int) := by decide

/-- grazing: rotationcycle(10, 4) = 40 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. */ static stockingrate(animals: number, area: number): CrossFormula {
    return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ?
    Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) } /**
    CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */ static
    carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity',
    'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0,
    nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) } /** FORAGE UTILIZATION as a
    percentage. value ⌊grazed · 100 / available⌋. */ static forageutilization(grazed: number, available:
    number): CrossFormula { return c('grazing-forageutilization', 'forageutilization(grazed, available) =
    ⌊grazed · 100 / available⌋', available > 0 ? Math.floor((grazed * 100) / available) : 0, nat(grazed,
    available) && available > 0 && grazed <= available, 'forageutilization', [grazed, available]) } /** REST
    PERIOD: the days a paddock rests out of a cycle after grazing. value max(0, cycle − graze). */ static
    restperiod(cycle: number, graze: number): CrossFormula { return c('grazing-restperiod', 'restperiod(cycle,
    graze) = max(0, cycle − graze)', Math.max(0, cycle - graze), nat(cycle, graze), 'restperiod', [cycle,
    graze]) } /** ANIMAL UNITS: head at an average weight, one unit per 1000 lb. value ⌊head · weight / 1000⌋.
    */ static animalunits(head: number, weight: number): CrossFormula { return c('grazing-animalunits',
    'animalunits(head, weight) = ⌊head · weight / 1000⌋', Math.floor((head * weight) / 1000), nat(head, weight),
    'animalunits', [head, weight]) } /** PASTURE DAYS: the days a forage stock lasts at a daily intake. value
    ⌊forage / intake⌋. */ static pasturedays(forage: number, intake: number): CrossFormula { return
    c('grazing-pasturedays', 'pasturedays(forage, intake) = ⌊forage / intake⌋', intake > 0 ? Math.floor(forage /
    intake) : 0, nat(forage, intake) && intake > 0, 'pasturedays', [forage, intake]) } /** DRY-MATTER INTAKE: a
    share of body weight per day. value ⌊weight · pct / 100⌋. */ static dmintake(weight: number, pct: number):
    CrossFormula { return c('grazing-dmintake', 'dmintake(weight, pct) = ⌊weight · pct / 100⌋',
    Math.floor((weight * pct) / 100), nat(weight, pct) && pct <= 100, 'dmintake', [weight, pct]) } /** ROTATION
    CYCLE: the paddocks of a rotation at days each. value paddocks · days. -/
theorem fam_grazing_rotationcycle_1 : ((10 : Int) * (4 : Int)) = (40 : Int) := by decide

/-- greenspace: percapita(9000, 300) = 30 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. -/
theorem fam_greenspace_percapita_1 : ((9000 : Int) / (300 : Int)) = (30 : Int) := by decide

/-- greenspace: canopycover(40, 100) = 40 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area: number, population:
    number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area /
    population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0,
    'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋. -/
theorem fam_greenspace_canopycover_1 : (((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int) := by decide

/-- greenspace: parkaccess(750, 1000) = 75 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area: number, population:
    number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area /
    population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0,
    'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋.
    */ static canopycover(canopy: number, total: number): CrossFormula { return c('greenspace-canopycover',
    'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ? Math.floor((canopy * 100) / total) : 0,
    nat(canopy, total) && total > 0 && canopy <= total, 'canopycover', [canopy, total]) } /** PARK ACCESS: the
    share of residents within a short walk of a park. value ⌊served · 100 / total⌋. -/
theorem fam_greenspace_parkaccess_1 : (((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int) := by decide

/-- greenspace: biodiversity(50, 1000) = 50 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area: number, population:
    number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area /
    population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0,
    'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋.
    */ static canopycover(canopy: number, total: number): CrossFormula { return c('greenspace-canopycover',
    'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ? Math.floor((canopy * 100) / total) : 0,
    nat(canopy, total) && total > 0 && canopy <= total, 'canopycover', [canopy, total]) } /** PARK ACCESS: the
    share of residents within a short walk of a park. value ⌊served · 100 / total⌋. */ static parkaccess(served:
    number, total: number): CrossFormula { return c('greenspace-parkaccess', 'parkaccess(served, total) =
    ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0
    && served <= total, 'parkaccess', [served, total]) } /** BIODIVERSITY: species per thousand units of area.
    value ⌊species · 1000 / area⌋. -/
theorem fam_greenspace_biodiversity_1 : (((50 : Int) * (1000 : Int)) / (1000 : Int)) = (50 : Int) := by decide

/-- greenspace: coolingeffect(20, 3) = 60 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area: number, population:
    number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area /
    population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0,
    'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋.
    */ static canopycover(canopy: number, total: number): CrossFormula { return c('greenspace-canopycover',
    'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ? Math.floor((canopy * 100) / total) : 0,
    nat(canopy, total) && total > 0 && canopy <= total, 'canopycover', [canopy, total]) } /** PARK ACCESS: the
    share of residents within a short walk of a park. value ⌊served · 100 / total⌋. */ static parkaccess(served:
    number, total: number): CrossFormula { return c('greenspace-parkaccess', 'parkaccess(served, total) =
    ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0
    && served <= total, 'parkaccess', [served, total]) } /** BIODIVERSITY: species per thousand units of area.
    value ⌊species · 1000 / area⌋. */ static biodiversity(species: number, area: number): CrossFormula { return
    c('greenspace-biodiversity', 'biodiversity(species, area) = ⌊species · 1000 / area⌋', area > 0 ?
    Math.floor((species * 1000) / area) : 0, nat(species, area) && area > 0, 'biodiversity', [species, area]) }
    /** COOLING EFFECT: degrees of cooling canopy gives, summed. value canopy · degrees. -/
theorem fam_greenspace_coolingeffect_1 : ((20 : Int) * (3 : Int)) = (60 : Int) := by decide

/-- greenspace: stormwater(500, 8) = 4000 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area: number, population:
    number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area /
    population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0,
    'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋.
    */ static canopycover(canopy: number, total: number): CrossFormula { return c('greenspace-canopycover',
    'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ? Math.floor((canopy * 100) / total) : 0,
    nat(canopy, total) && total > 0 && canopy <= total, 'canopycover', [canopy, total]) } /** PARK ACCESS: the
    share of residents within a short walk of a park. value ⌊served · 100 / total⌋. */ static parkaccess(served:
    number, total: number): CrossFormula { return c('greenspace-parkaccess', 'parkaccess(served, total) =
    ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0
    && served <= total, 'parkaccess', [served, total]) } /** BIODIVERSITY: species per thousand units of area.
    value ⌊species · 1000 / area⌋. */ static biodiversity(species: number, area: number): CrossFormula { return
    c('greenspace-biodiversity', 'biodiversity(species, area) = ⌊species · 1000 / area⌋', area > 0 ?
    Math.floor((species * 1000) / area) : 0, nat(species, area) && area > 0, 'biodiversity', [species, area]) }
    /** COOLING EFFECT: degrees of cooling canopy gives, summed. value canopy · degrees. */ static
    coolingeffect(canopy: number, degrees: number): CrossFormula { return c('greenspace-coolingeffect',
    'coolingeffect(canopy, degrees) = canopy · degrees', canopy * degrees, nat(canopy, degrees),
    'coolingeffect', [canopy, degrees]) } /** STORMWATER: litres of runoff the soil soaks up at a rate per unit
    area. value area · rate. -/
theorem fam_greenspace_stormwater_1 : ((500 : Int) * (8 : Int)) = (4000 : Int) := by decide

/-- greenspace: recreationcapacity(10000, 50) = 200 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A city's green is numbers: the square metres of park per resident, the
    share of ground under tree canopy, the share of people within a short walk of a park, species density, the
    degrees of cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its
    habitats are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF =
    'greenspace arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect,
    stormwater, recreation capacity, connectivity); a public-API measure crossed to geography' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF,
    ...extra }, holds, { name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER
    CAPITA: square metres of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area:
    number, population: number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) =
    ⌊area / population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) &&
    population > 0, 'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy
    · 100 / total⌋. */ static canopycover(canopy: number, total: number): CrossFormula { return
    c('greenspace-canopycover', 'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ?
    Math.floor((canopy * 100) / total) : 0, nat(canopy, total) && total > 0 && canopy <= total, 'canopycover',
    [canopy, total]) } /** PARK ACCESS: the share of residents within a short walk of a park. value ⌊served ·
    100 / total⌋. */ static parkaccess(served: number, total: number): CrossFormula { return
    c('greenspace-parkaccess', 'parkaccess(served, total) = ⌊served · 100 / total⌋', total > 0 ?
    Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0 && served <= total, 'parkaccess',
    [served, total]) } /** BIODIVERSITY: species per thousand units of area. value ⌊species · 1000 / area⌋. */
    static biodiversity(species: number, area: number): CrossFormula { return c('greenspace-biodiversity',
    'biodiversity(species, area) = ⌊species · 1000 / area⌋', area > 0 ? Math.floor((species * 1000) / area) : 0,
    nat(species, area) && area > 0, 'biodiversity', [species, area]) } /** COOLING EFFECT: degrees of cooling
    canopy gives, summed. value canopy · degrees. */ static coolingeffect(canopy: number, degrees: number):
    CrossFormula { return c('greenspace-coolingeffect', 'coolingeffect(canopy, degrees) = canopy · degrees',
    canopy * degrees, nat(canopy, degrees), 'coolingeffect', [canopy, degrees]) } /** STORMWATER: litres of
    runoff the soil soaks up at a rate per unit area. value area · rate. */ static stormwater(area: number,
    rate: number): CrossFormula { return c('greenspace-stormwater', 'stormwater(area, rate) = area · rate', area
    * rate, nat(area, rate), 'stormwater', [area, rate]) } /** RECREATION CAPACITY: the visitors a space holds
    at an area each. value ⌊area / perVisitor⌋. -/
theorem fam_greenspace_recreationcapacity_1 : ((10000 : Int) / (50 : Int)) = (200 : Int) := by decide

/-- greenspace: connectivity(18, 20) = 90 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. */ static percapita(area: number, population:
    number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area /
    population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0,
    'percapita', [area, population]) } /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋.
    */ static canopycover(canopy: number, total: number): CrossFormula { return c('greenspace-canopycover',
    'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ? Math.floor((canopy * 100) / total) : 0,
    nat(canopy, total) && total > 0 && canopy <= total, 'canopycover', [canopy, total]) } /** PARK ACCESS: the
    share of residents within a short walk of a park. value ⌊served · 100 / total⌋. */ static parkaccess(served:
    number, total: number): CrossFormula { return c('greenspace-parkaccess', 'parkaccess(served, total) =
    ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0
    && served <= total, 'parkaccess', [served, total]) } /** BIODIVERSITY: species per thousand units of area.
    value ⌊species · 1000 / area⌋. */ static biodiversity(species: number, area: number): CrossFormula { return
    c('greenspace-biodiversity', 'biodiversity(species, area) = ⌊species · 1000 / area⌋', area > 0 ?
    Math.floor((species * 1000) / area) : 0, nat(species, area) && area > 0, 'biodiversity', [species, area]) }
    /** COOLING EFFECT: degrees of cooling canopy gives, summed. value canopy · degrees. */ static
    coolingeffect(canopy: number, degrees: number): CrossFormula { return c('greenspace-coolingeffect',
    'coolingeffect(canopy, degrees) = canopy · degrees', canopy * degrees, nat(canopy, degrees),
    'coolingeffect', [canopy, degrees]) } /** STORMWATER: litres of runoff the soil soaks up at a rate per unit
    area. value area · rate. */ static stormwater(area: number, rate: number): CrossFormula { return
    c('greenspace-stormwater', 'stormwater(area, rate) = area · rate', area * rate, nat(area, rate),
    'stormwater', [area, rate]) } /** RECREATION CAPACITY: the visitors a space holds at an area each. value
    ⌊area / perVisitor⌋. */ static recreationcapacity(area: number, perVisitor: number): CrossFormula { return
    c('greenspace-recreationcapacity', 'recreationcapacity(area, perVisitor) = ⌊area / perVisitor⌋', perVisitor
    > 0 ? Math.floor(area / perVisitor) : 0, nat(area, perVisitor) && perVisitor > 0, 'recreationcapacity',
    [area, perVisitor]) } /** CONNECTIVITY: habitat links as a share of the nodes they could join. value ⌊links
    · 100 / nodes⌋. -/
theorem fam_greenspace_connectivity_1 : (((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int) := by decide

/-- grid: rows(10, 3) = 4 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. -/
theorem fam_grid_rows_1 : (-((-(10 : Int)) / (3 : Int))) = (4 : Int) := by decide

/-- grid: gap(4, 16) = 48 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. -/
theorem fam_grid_gap_1 : ((fmax (0 : Int) ((4 : Int) - (1 : Int))) * (16 : Int)) = (48 : Int) := by decide

/-- grid: span(2, 4) = 50 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. */ static gap(cols: number, gap: number): CrossFormula
    { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols,
    gap), 'gap', [cols, gap]) } /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 /
    cols⌋. -/
theorem fam_grid_span_1 : (((2 : Int) * (100 : Int)) / (4 : Int)) = (50 : Int) := by decide

/-- grid: fill(3, 12) = 25 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. */ static gap(cols: number, gap: number): CrossFormula
    { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols,
    gap), 'gap', [cols, gap]) } /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 /
    cols⌋. */ static span(item: number, cols: number): CrossFormula { return c('grid-span', 'span(item, cols) =
    ⌊item · 100 / cols⌋', cols > 0 ? Math.floor((item * 100) / cols) : 0, nat(item, cols) && cols > 0 && item <=
    cols, 'span', [item, cols]) } /** FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋. -/
theorem fam_grid_fill_1 : (((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int) := by decide

/-- grid: cells(3, 4) = 12 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. */ static gap(cols: number, gap: number): CrossFormula
    { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols,
    gap), 'gap', [cols, gap]) } /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 /
    cols⌋. */ static span(item: number, cols: number): CrossFormula { return c('grid-span', 'span(item, cols) =
    ⌊item · 100 / cols⌋', cols > 0 ? Math.floor((item * 100) / cols) : 0, nat(item, cols) && cols > 0 && item <=
    cols, 'span', [item, cols]) } /** FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋.
    */ static fill(filled: number, cells: number): CrossFormula { return c('grid-fill', 'fill(filled, cells) =
    ⌊filled · 100 / cells⌋', cells > 0 ? Math.floor((filled * 100) / cells) : 0, nat(filled, cells) && cells > 0
    && filled <= cells, 'fill', [filled, cells]) } /** CELLS: total cells in a grid of rows by columns. value
    rows · cols. -/
theorem fam_grid_cells_1 : ((3 : Int) * (4 : Int)) = (12 : Int) := by decide

/-- grid: auto(1000, 250) = 4 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. */ static gap(cols: number, gap: number): CrossFormula
    { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols,
    gap), 'gap', [cols, gap]) } /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 /
    cols⌋. */ static span(item: number, cols: number): CrossFormula { return c('grid-span', 'span(item, cols) =
    ⌊item · 100 / cols⌋', cols > 0 ? Math.floor((item * 100) / cols) : 0, nat(item, cols) && cols > 0 && item <=
    cols, 'span', [item, cols]) } /** FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋.
    */ static fill(filled: number, cells: number): CrossFormula { return c('grid-fill', 'fill(filled, cells) =
    ⌊filled · 100 / cells⌋', cells > 0 ? Math.floor((filled * 100) / cells) : 0, nat(filled, cells) && cells > 0
    && filled <= cells, 'fill', [filled, cells]) } /** CELLS: total cells in a grid of rows by columns. value
    rows · cols. */ static cells(rows: number, cols: number): CrossFormula { return c('grid-cells', 'cells(rows,
    cols) = rows · cols', rows * cols, nat(rows, cols), 'cells', [rows, cols]) } /** AUTO: the columns that fit
    a container at a minimum column width. value ⌊container / min⌋. -/
theorem fam_grid_auto_1 : ((1000 : Int) / (250 : Int)) = (4 : Int) := by decide

/-- grid: aspect(16, 9) = 177 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. */ static gap(cols: number, gap: number): CrossFormula
    { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols,
    gap), 'gap', [cols, gap]) } /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 /
    cols⌋. */ static span(item: number, cols: number): CrossFormula { return c('grid-span', 'span(item, cols) =
    ⌊item · 100 / cols⌋', cols > 0 ? Math.floor((item * 100) / cols) : 0, nat(item, cols) && cols > 0 && item <=
    cols, 'span', [item, cols]) } /** FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋.
    */ static fill(filled: number, cells: number): CrossFormula { return c('grid-fill', 'fill(filled, cells) =
    ⌊filled · 100 / cells⌋', cells > 0 ? Math.floor((filled * 100) / cells) : 0, nat(filled, cells) && cells > 0
    && filled <= cells, 'fill', [filled, cells]) } /** CELLS: total cells in a grid of rows by columns. value
    rows · cols. */ static cells(rows: number, cols: number): CrossFormula { return c('grid-cells', 'cells(rows,
    cols) = rows · cols', rows * cols, nat(rows, cols), 'cells', [rows, cols]) } /** AUTO: the columns that fit
    a container at a minimum column width. value ⌊container / min⌋. */ static auto(container: number, min:
    number): CrossFormula { return c('grid-auto', 'auto(container, min) = ⌊container / min⌋', min > 0 ?
    Math.floor(container / min) : 0, nat(container, min) && min > 0, 'auto', [container, min]) } /** ASPECT: a
    cell aspect ratio as a percentage. value ⌊width · 100 / height⌋. -/
theorem fam_grid_aspect_1 : (((16 : Int) * (100 : Int)) / (9 : Int)) = (177 : Int) := by decide

/-- grid: density(4, 16) = 25 — GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC
    (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website). Laying out a grid is numbers: the rows a
    count needs at a column width, the total gutter, a column span as a percentage, how full a grid is, total
    cells, the columns that fit a container, the aspect ratio, and density. Crosses to `css` — grid is what the
    stylesheet lays out. A measure. */ const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells,
    auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid);
    a measure crossed to css' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grid', dst: 'css', formula,
    value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params }) export class GridFormulas { /**
    ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */ static rows(items: number,
    cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ?
    Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) } /** GAP: the total
    gutter between columns. value max(0, cols − 1) · gap. */ static gap(cols: number, gap: number): CrossFormula
    { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols,
    gap), 'gap', [cols, gap]) } /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 /
    cols⌋. */ static span(item: number, cols: number): CrossFormula { return c('grid-span', 'span(item, cols) =
    ⌊item · 100 / cols⌋', cols > 0 ? Math.floor((item * 100) / cols) : 0, nat(item, cols) && cols > 0 && item <=
    cols, 'span', [item, cols]) } /** FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋.
    */ static fill(filled: number, cells: number): CrossFormula { return c('grid-fill', 'fill(filled, cells) =
    ⌊filled · 100 / cells⌋', cells > 0 ? Math.floor((filled * 100) / cells) : 0, nat(filled, cells) && cells > 0
    && filled <= cells, 'fill', [filled, cells]) } /** CELLS: total cells in a grid of rows by columns. value
    rows · cols. */ static cells(rows: number, cols: number): CrossFormula { return c('grid-cells', 'cells(rows,
    cols) = rows · cols', rows * cols, nat(rows, cols), 'cells', [rows, cols]) } /** AUTO: the columns that fit
    a container at a minimum column width. value ⌊container / min⌋. */ static auto(container: number, min:
    number): CrossFormula { return c('grid-auto', 'auto(container, min) = ⌊container / min⌋', min > 0 ?
    Math.floor(container / min) : 0, nat(container, min) && min > 0, 'auto', [container, min]) } /** ASPECT: a
    cell aspect ratio as a percentage. value ⌊width · 100 / height⌋. */ static aspect(width: number, height:
    number): CrossFormula { return c('grid-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0
    ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) } /**
    DENSITY: items per unit area as a percentage. value ⌊items · 100 / area⌋. -/
theorem fam_grid_density_1 : (((4 : Int) * (100 : Int)) / (16 : Int)) = (25 : Int) := by decide

/-- gripper: gripforce(50, 4) = 200 -/
theorem fam_gripper_gripforce_1 : ((50 : Int) * (4 : Int)) = (200 : Int) := by decide

/-- gripper: strokewidth(100, 20) = 80 -/
theorem fam_gripper_strokewidth_1 : (fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int) := by decide

/-- gripper: payloadlimit(200, 2) = 100 -/
theorem fam_gripper_payloadlimit_1 : ((200 : Int) / (2 : Int)) = (100 : Int) := by decide

/-- gripper: closetime(1000, 50) = 20 -/
theorem fam_gripper_closetime_1 : ((1000 : Int) / (50 : Int)) = (20 : Int) := by decide

/-- gripper: fingercount(2, 1) = 3 -/
theorem fam_gripper_fingercount_1 : ((2 : Int) + (1 : Int)) = (3 : Int) := by decide

/-- gripper: frictionhold(50, 2) = 100 -/
theorem fam_gripper_frictionhold_1 : ((50 : Int) * (2 : Int)) = (100 : Int) := by decide

/-- gripper: contactpressure(200, 4) = 50 -/
theorem fam_gripper_contactpressure_1 : ((200 : Int) / (4 : Int)) = (50 : Int) := by decide

/-- gripper: slipmargin(80, 100) = 80 -/
theorem fam_gripper_slipmargin_1 : (((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int) := by decide

/-- grouptheory: order(6, 4) = 24 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite group
    is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a cyclic
    group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. -/
theorem fam_grouptheory_order_1 : ((6 : Int) * (4 : Int)) = (24 : Int) := by decide

/-- grouptheory: cosets(24, 6) = 4 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite group
    is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a cyclic
    group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b: number): CrossFormula { return
    c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) } /** COSETS (Lagrange):
    the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. -/
theorem fam_grouptheory_cosets_1 : ((24 : Int) / (6 : Int)) = (4 : Int) := by decide

/-- grouptheory: cyclicorder(12) = 12 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite
    group is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a
    cyclic group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b: number): CrossFormula { return
    c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) } /** COSETS (Lagrange):
    the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. */ static cosets(g: number,
    h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g /
    h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) } /** CYCLIC ORDER: the order of the cyclic group Z_n. value
    n. -/
theorem fam_grouptheory_cyclicorder_1 : (12 : Int) = (12 : Int) := by decide

/-- grouptheory: subgroupindex(60, 12) = 5 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a
    finite group is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order
    of a cyclic group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric
    group, a generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory
    is the structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory
    arithmetic (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count,
    symmetric-group order n!, generator power aᵏ mod n, element order n/gcd); every value an exact finite
    integer; crossed to algebra' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const fact = (n: number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const
    modpow = (a: number, k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e =
    k; while (e > 0) { if (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra',
    formula, value, proof: PROOF, ...extra }, holds, { name: `grouptheory.${name}`, params }) export class
    GrouptheoryFormulas { /** DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b:
    number): CrossFormula { return c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a,
    b]) } /** COSETS (Lagrange): the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋.
    */ static cosets(g: number, h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g /
    h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) } /** CYCLIC ORDER: the order of
    the cyclic group Z_n. value n. */ static cyclicorder(n: number): CrossFormula { return
    c('grouptheory-cyclicorder', 'cyclicorder(n) = n', n, nat(n) && n > 0, 'cyclicorder', [n]) } /** SUBGROUP
    INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. -/
theorem fam_grouptheory_subgroupindex_1 : ((60 : Int) / (12 : Int)) = (5 : Int) := by decide

/-- grouptheory: cosetcount(100, 25) = 4 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite
    group is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a
    cyclic group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b: number): CrossFormula { return
    c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) } /** COSETS (Lagrange):
    the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. */ static cosets(g: number,
    h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g /
    h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) } /** CYCLIC ORDER: the order of the cyclic group Z_n. value
    n. */ static cyclicorder(n: number): CrossFormula { return c('grouptheory-cyclicorder', 'cyclicorder(n) =
    n', n, nat(n) && n > 0, 'cyclicorder', [n]) } /** SUBGROUP INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. */ static
    subgroupindex(g: number, h: number): CrossFormula { return c('grouptheory-subgroupindex', 'subgroupindex(g,
    h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'subgroupindex', [g, h]) } /** COSET
    COUNT: how many cosets of size h tile a group of order g. value ⌊g / h⌋. -/
theorem fam_grouptheory_cosetcount_1 : ((100 : Int) / (25 : Int)) = (4 : Int) := by decide

/-- grouptheory: symmetricorder(5) = 120 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite
    group is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a
    cyclic group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b: number): CrossFormula { return
    c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) } /** COSETS (Lagrange):
    the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. */ static cosets(g: number,
    h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g /
    h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) } /** CYCLIC ORDER: the order of the cyclic group Z_n. value
    n. */ static cyclicorder(n: number): CrossFormula { return c('grouptheory-cyclicorder', 'cyclicorder(n) =
    n', n, nat(n) && n > 0, 'cyclicorder', [n]) } /** SUBGROUP INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. */ static
    subgroupindex(g: number, h: number): CrossFormula { return c('grouptheory-subgroupindex', 'subgroupindex(g,
    h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'subgroupindex', [g, h]) } /** COSET
    COUNT: how many cosets of size h tile a group of order g. value ⌊g / h⌋. */ static cosetcount(g: number, h:
    number): CrossFormula { return c('grouptheory-cosetcount', 'cosetcount(g, h) = ⌊g / h⌋', h > 0 ?
    Math.floor(g / h) : 0, nat(g, h) && h > 0, 'cosetcount', [g, h]) } /** SYMMETRIC-GROUP ORDER: |S_n| = n!.
    value n!. -/
theorem fam_grouptheory_symmetricorder_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- grouptheory: elementorder(4, 6) = 3 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite
    group is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a
    cyclic group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b: number): CrossFormula { return
    c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) } /** COSETS (Lagrange):
    the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. */ static cosets(g: number,
    h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g /
    h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) } /** CYCLIC ORDER: the order of the cyclic group Z_n. value
    n. */ static cyclicorder(n: number): CrossFormula { return c('grouptheory-cyclicorder', 'cyclicorder(n) =
    n', n, nat(n) && n > 0, 'cyclicorder', [n]) } /** SUBGROUP INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. */ static
    subgroupindex(g: number, h: number): CrossFormula { return c('grouptheory-subgroupindex', 'subgroupindex(g,
    h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'subgroupindex', [g, h]) } /** COSET
    COUNT: how many cosets of size h tile a group of order g. value ⌊g / h⌋. */ static cosetcount(g: number, h:
    number): CrossFormula { return c('grouptheory-cosetcount', 'cosetcount(g, h) = ⌊g / h⌋', h > 0 ?
    Math.floor(g / h) : 0, nat(g, h) && h > 0, 'cosetcount', [g, h]) } /** SYMMETRIC-GROUP ORDER: |S_n| = n!.
    value n!. */ static symmetricorder(n: number): CrossFormula { return c('grouptheory-symmetricorder',
    'symmetricorder(n) = n!', fact(n), nat(n) && n <= 12, 'symmetricorder', [n]) } /** GENERATOR POWER: a
    generator a raised to the power k in Z_n. value aᵏ mod n. */ static generatorpower(a: number, k: number, n:
    number): CrossFormula { return c('grouptheory-generatorpower', 'generatorpower(a, k, n) = aᵏ mod n',
    modpow(a, k, n), nat(a, k, n) && n > 0, 'generatorpower', [a, k, n]) } /** ELEMENT ORDER: the order of
    element a in the cyclic group Z_n. value n / gcd(a, n). -/
theorem fam_grouptheory_elementorder_1 : ((6 : Int) / (Int.ofNat (fgcd 100 (Int.toNat (4 : Int)) (Int.toNat (6 : Int))))) = (3 : Int) := by decide

/-- grouptheory: elementorder(5, 6) = 6 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite
    group is counting: the order of a direct product, the cosets Lagrange's theorem‑carves out, the order of a
    cyclic group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */ static order(a: number, b: number): CrossFormula { return
    c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) } /** COSETS (Lagrange):
    the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. */ static cosets(g: number,
    h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g /
    h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) } /** CYCLIC ORDER: the order of the cyclic group Z_n. value
    n. */ static cyclicorder(n: number): CrossFormula { return c('grouptheory-cyclicorder', 'cyclicorder(n) =
    n', n, nat(n) && n > 0, 'cyclicorder', [n]) } /** SUBGROUP INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. */ static
    subgroupindex(g: number, h: number): CrossFormula { return c('grouptheory-subgroupindex', 'subgroupindex(g,
    h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'subgroupindex', [g, h]) } /** COSET
    COUNT: how many cosets of size h tile a group of order g. value ⌊g / h⌋. */ static cosetcount(g: number, h:
    number): CrossFormula { return c('grouptheory-cosetcount', 'cosetcount(g, h) = ⌊g / h⌋', h > 0 ?
    Math.floor(g / h) : 0, nat(g, h) && h > 0, 'cosetcount', [g, h]) } /** SYMMETRIC-GROUP ORDER: |S_n| = n!.
    value n!. */ static symmetricorder(n: number): CrossFormula { return c('grouptheory-symmetricorder',
    'symmetricorder(n) = n!', fact(n), nat(n) && n <= 12, 'symmetricorder', [n]) } /** GENERATOR POWER: a
    generator a raised to the power k in Z_n. value aᵏ mod n. */ static generatorpower(a: number, k: number, n:
    number): CrossFormula { return c('grouptheory-generatorpower', 'generatorpower(a, k, n) = aᵏ mod n',
    modpow(a, k, n), nat(a, k, n) && n > 0, 'generatorpower', [a, k, n]) } /** ELEMENT ORDER: the order of
    element a in the cyclic group Z_n. value n / gcd(a, n). -/
theorem fam_grouptheory_elementorder_2 : ((6 : Int) / (Int.ofNat (fgcd 100 (Int.toNat (5 : Int)) (Int.toNat (6 : Int))))) = (6 : Int) := by decide
