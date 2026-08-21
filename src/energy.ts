// energy — FOUR DIY ENERGY ROUTES, COMPUTED RATHER THAN DESCRIBED. Wind, biogas-to-engine, the microbial fuel cell,
// and photon/electrolysis. Each route answers with a CEILING it cannot exceed and, where the caller supplies a
// measured machine figure, an ESTIMATE bounded by that ceiling. A route that would have to report an efficiency
// above its physical limit REFUSES and names the limit instead — there is no over-unity arm in this module, and no
// arm that returns an unbounded number.
//
// THE VERDICT IS AN INTEGER BRACKET, NEVER A FLOAT. Every quantity is carried as an exact rational over bigint and
// reported as the tightest pair of integers that provably enclose it, each side witnessed by a multiplication a
// reader can recompute by hand: `low * denominator <= numerator` and `high * denominator >= numerator`. No division
// survives into a verdict. Decimals appear only in the human-readable `display` line, which is derived from the same
// integers and is never the thing being asserted. verifyBracket() re-evaluates a bracket's own witnesses, so a
// tampered bracket reports false rather than passing on the strength of having been written down.
//
// EXACT vs MEASURED IS DECLARED PER ROUTE, not implied by precision. Exact by definition: the Betz ratio 16/27, the
// stroke counts of the four-stroke cycle, the 2019 SI constants (h, c, e, N_A, k, and the Faraday constant and molar
// gas constant that are their exact products), 1 kWh = 3600 kJ, and the STP reference point. Measured, and therefore
// only ever bracketed: the methane combustion enthalpy, the Gibbs energy of water formation, hydrogen's heating
// values, every microbial-fuel-cell power density, and the standard-atmosphere air density.
//
// Pure, total, deterministic: no clock, no host intrinsics, no I/O. Same input, same bytes, for anyone.

// ── the shapes ──────────────────────────────────────────────────────────────────────────────────────────────────

/** An integer bracket: the tightest integers enclosing a rational quantity, each side proved by multiplication. */
export interface Bracket {
  quantity: string        // what is bounded
  unit: string            // the INTEGER unit the two bounds are counted in
  low: string             // greatest integer <= the quantity's lower end (decimal string; never a float)
  high: string            // least integer >= the quantity's upper end
  witness: string[]       // the exact integer multiplications that establish each side
  holds: boolean          // recomputed here from the witnesses, never asserted
  approx: string          // human-readable only — derived from the same integers, never the claim
}

/** One route's answer. `ceiling` is always present: no output of this module can read as unbounded. */
export interface EnergyReport {
  route: 'wind' | 'biogas-engine' | 'microbial-fuel-cell' | 'photon-electrolysis'
  verdict: 'BOUNDED' | 'REFUSED'
  refusal: string | null          // why the route refused to answer, in the caller's terms
  ceiling: Bracket                // the limit the route cannot exceed — present on a refusal too
  estimate: Bracket | null        // null when nothing measured was supplied to bound; never invented
  brackets: Bracket[]             // every intermediate quantity, each independently witnessed
  flags: Record<string, boolean>  // computed yes/no findings (each may legitimately be false)
  exactByDefinition: string[]
  measured: string[]
  sources: string[]
  notes: string[]
  display: string
}

// ── integer arithmetic (bigint only; no host intrinsics) ────────────────────────────────────────────────────────

const TEN = 10n
const p10 = (n: number): bigint => TEN ** BigInt(n)
/** floor division for a positive divisor */
const fl = (a: bigint, b: bigint): bigint => (a >= 0n ? a / b : -((-a + b - 1n) / b))
/** ceiling division for a positive divisor */
const ce = (a: bigint, b: bigint): bigint => (a >= 0n ? (a + b - 1n) / b : -((-a) / b))

/** n/d rendered to `places` decimal places by truncation — display only, computed from integers. */
const dec = (n: bigint, d: bigint, places: number): string => {
  if (d === 0n) return 'undefined'
  const neg = (n < 0n) !== (d < 0n)
  const a = n < 0n ? -n : n, b = d < 0n ? -d : d
  const s = p10(places)
  const scaled = (a * s) / b
  const body = places > 0 ? `${scaled / s}.${(scaled % s).toString().padStart(places, '0')}` : `${scaled / s}`
  return neg ? '-' + body : body
}

/** Build the tightest bracket around a quantity known to lie in [nLo/dLo, nHi/dHi]. Both denominators positive. */
const bracketOf = (quantity: string, unit: string, nLo: bigint, dLo: bigint, nHi: bigint, dHi: bigint, places = 3): Bracket => {
  const low = fl(nLo, dLo), high = ce(nHi, dHi)
  const witness = [
    `${low} * ${dLo} <= ${nLo}`,
    `${low + 1n} * ${dLo} > ${nLo}`,
    `${high} * ${dHi} >= ${nHi}`,
    `${high - 1n} * ${dHi} < ${nHi}`,
    `${low} <= ${high}`,
  ]
  const approx = low === high ? dec(low, 1n, 0) : `${dec(nLo, dLo, places)} .. ${dec(nHi, dHi, places)}`
  const b: Bracket = { quantity, unit, low: low.toString(), high: high.toString(), witness, holds: false, approx }
  // `holds` is the VERIFIER's answer, never a second opinion computed alongside it — so a bracket can never be
  // published claiming to hold while verifyBracket, the thing anyone else would run, says otherwise.
  return { ...b, holds: verifyBracket(b) }
}

/** An exactly-known integer, bracketed to itself so every reported quantity carries the same proof shape. */
const exactBracket = (quantity: string, unit: string, v: bigint): Bracket => bracketOf(quantity, unit, v, 1n, v, 1n, 0)

/** Append further exact inequalities to a bracket — how a REFUSAL carries the multiplication that convicts it while
 *  keeping the canonical binding shape (witness[0] binds `low`, witness[2] binds `high`) that verifyBracket demands. */
const withWitness = (b: Bracket, quantity: string, extra: string[]): Bracket => {
  const merged = { ...b, quantity, witness: [...b.witness, ...extra] }
  return { ...merged, holds: verifyBracket(merged) }
}

const INT_WITNESS = /^(-?\d+) \* (-?\d+) (<=|>=|>|<) (-?\d+)$/
const ORD_WITNESS = /^(-?\d+) <= (-?\d+)$/

/** Re-evaluate a bracket's own witnesses. A tampered bracket returns false — the verifier is not a formality:
 *  src/tests/energy.test.ts mutates a witness and asserts this reports false, so the check is known to be fallible.
 *  The two stated bounds are bound POSITIONALLY (witness[0] establishes `low`, witness[2] establishes `high`), because
 *  a mere "some witness mentions this number" test is satisfiable by the neighbouring tightness witnesses — moving
 *  `low` up by one lands on the `low + 1` witness and passes, which is exactly the silent edit this must catch. */
export function verifyBracket(b: Bracket): boolean {
  if (!b || !Array.isArray(b.witness) || b.witness.length < 3) return false
  for (const w of b.witness) {
    const ord = ORD_WITNESS.exec(w)
    if (ord) { if (!(BigInt(ord[1]) <= BigInt(ord[2]))) return false; continue }
    const m = INT_WITNESS.exec(w)
    if (!m) return false
    const lhs = BigInt(m[1]) * BigInt(m[2]), rhs = BigInt(m[4])
    const ok = m[3] === '<=' ? lhs <= rhs : m[3] === '>=' ? lhs >= rhs : m[3] === '>' ? lhs > rhs : lhs < rhs
    if (!ok) return false
  }
  const lowW = INT_WITNESS.exec(b.witness[0])
  if (!lowW || lowW[1] !== b.low || lowW[3] !== '<=') return false
  const highW = INT_WITNESS.exec(b.witness[2])
  if (!highW || highW[1] !== b.high || highW[3] !== '>=') return false
  return true
}

// ── input handling: total, never throwing, never silently coercing a non-integer ─────────────────────────────────

/** the bounded input range — a magnitude beyond this is refused by name rather than folded into a huge bigint */
const MAX_INPUT = p10(15)

type Parsed = { ok: true; v: bigint } | { ok: false; why: string }

/** describe an untrusted value for a refusal message — never JSON.stringify, which throws on a bigint and on a
 *  hostile toString. A refusal that throws while explaining itself is not a refusal. */
const describe = (raw: unknown): string => {
  if (raw === null) return 'null'
  const t = typeof raw
  if (t === 'bigint') return `a very large integer`
  if (t === 'string') return `the text "${(raw as string).slice(0, 40)}"`
  if (t === 'number' || t === 'boolean') return `${raw as number | boolean}`
  if (Array.isArray(raw)) return `a list of ${raw.length}`
  return `a value of type ${t}`
}

const intArg = (raw: unknown, name: string, fallback?: bigint): Parsed => {
  if (raw === undefined || raw === null || raw === '') {
    if (fallback !== undefined) return { ok: true, v: fallback }
    return { ok: false, why: `${name} was not supplied and has no default — nothing was computed` }
  }
  let v: bigint
  if (typeof raw === 'bigint') v = raw
  else if (typeof raw === 'number') {
    if (!Number.isFinite(raw)) return { ok: false, why: `${name} is not a finite number — nothing was computed` }
    if (!Number.isInteger(raw)) return { ok: false, why: `${name} must be a whole number in its stated unit (this module carries no floating point); received ${raw}` }
    v = BigInt(raw)
  } else if (typeof raw === 'string' && /^\s*-?\d+\s*$/.test(raw)) v = BigInt(raw.trim())
  else return { ok: false, why: `${name} must be a whole number in its stated unit; received ${describe(raw)}` }
  const mag = v < 0n ? -v : v
  if (mag > MAX_INPUT) return { ok: false, why: `${name} is outside this module's bounded input range (magnitude at most ${MAX_INPUT}) — refused rather than answered` }
  return { ok: true, v }
}

// ── constants ────────────────────────────────────────────────────────────────────────────────────────────────────

// EXACT by the 2019 SI redefinition (fixed numerical values of h, e, k and N_A), carried as exact integers.
const H_NUM = 662607015n          // Planck constant = H_NUM x 1e-42 J s
const C_LIGHT = 299792458n        // speed of light in vacuum, m/s
const E_CHARGE = 1602176634n      // elementary charge = E_CHARGE x 1e-28 C
const N_AVOGADRO = 602214076n     // Avogadro constant = N_AVOGADRO x 1e15 /mol
const K_BOLTZ = 1380649n          // Boltzmann constant = K_BOLTZ x 1e-29 J/K

/** Faraday constant F = N_A e, exact: FARADAY_NUM / 1e13 C/mol (= 96485.3321233100184 C/mol). The commonly
 *  quoted 96485.33212 C/mol is this exact product rounded to ten significant figures. */
export const FARADAY_NUM = N_AVOGADRO * E_CHARGE
/** molar gas constant R = k N_A, exact: GAS_NUM / 1e14 J/(mol K) (= 8.31446261815324). */
export const GAS_NUM = K_BOLTZ * N_AVOGADRO
/** molar volume of an IDEAL gas at STP (273.15 K, 100 kPa): MOLAR_VOLUME_NUM / 1e21 m3/mol (= 22.710954641... L/mol).
 *  The reference point and the constant are exact; the IDEAL-GAS MODEL is not a measurement of real biogas. */
export const MOLAR_VOLUME_NUM = GAS_NUM * 27315n
/** photon energy per electron charge: PHOTON_NUM / (lambda_nm * E_CHARGE) microvolts. Exact (h, c and e are exact). */
export const PHOTON_NUM = H_NUM * C_LIGHT * 10n

// pi is bracketed by two consecutive continued-fraction convergents, 333/106 and 355/113. They are a unimodular
// pair — 355*106 - 333*113 = 1, checked in the tests — which is why the value they bracket is trapped between them;
// this module cites that bound rather than re-deriving it.
const PI_LO_N = 333n, PI_LO_D = 106n, PI_HI_N = 355n, PI_HI_D = 113n

// MEASURED quantities, quoted to the precision of their source. The bracket around each is the half-unit band of the
// LAST QUOTED DIGIT — a quotation-precision bound, which is not the same thing as the source's stated uncertainty.
const METHANE_HHV_LO = 890285n, METHANE_HHV_HI = 890295n   // J/mol, from 890.29 kJ/mol
const GIBBS_WATER_LO = 237135n, GIBBS_WATER_HI = 237145n   // J/mol, from 237.14 kJ/mol
const HYDROGEN_HHV_LO = 285825n, HYDROGEN_HHV_HI = 285835n // J/mol, from 285.83 kJ/mol
const HYDROGEN_LHV_LO = 241825n, HYDROGEN_LHV_HI = 241835n // J/mol, from 241.83 kJ/mol

// MEASURED pilot-scale microbial fuel cell figures (Rossi & Logan 2022).
const MFC_VOL_MEAN = 600n, MFC_VOL_SD = 452n               // mW/m3
const MFC_VOL_MIN = 12n, MFC_VOL_MAX = 1435n               // mW/m3, the reported range
const MFC_AREAL_MEAN = 49n, MFC_AREAL_SD = 27n             // mW/m2
const MFC_ENERGY_MEAN = 11n, MFC_ENERGY_SD = 6n            // Wh/m3
/** the highest single-cell volumetric power reported anywhere — a MINIATURISED cell on a DEFINED MEDIUM, not
 *  wastewater, and not a pilot-scale expectation. Exposed only under the explicit 'lab' scale, always labelled. */
const MFC_LAB_RECORD = 11220000n                           // mW/m3 (11,220 W/m3)

/** 1 kWh = 3600 kJ, exact by definition of the hour and the watt. */
const JOULES_PER_KWH = 3600000n

export const ENERGY_SOURCES: Readonly<Record<string, string>> = {
  betz: 'Betz, A. (1919/1920) — the maximum fraction of an open flow’s kinetic energy any turbine can capture is 16/27. A ratio of integers, exact by the derivation, not a measurement.',
  methane: 'Horstmeyer et al. (2018), Journal of Water Reuse and Desalination 8(4):455 — CH4 + 2 O2 -> CO2 + 2 H2O releases 890.29 kJ/mol, derived from CODATA enthalpies. This is the value with LIQUID water as product (the higher heating value); an engine exhausting steam recovers less, and the vaporisation loss is not sourced here so it is not subtracted.',
  fourStroke: 'Runciman (Project Gutenberg 27286) and Rathbun (Project Gutenberg 56776) — a four-stroke engine gives ONE working stroke in four, i.e. two crankshaft revolutions per cycle; Rathbun states impulses per revolution = cylinders / 2. Definitional counts of the cycle, not measurements.',
  mfc: 'Rossi & Logan (2022), Water Research 225:119179 — pilot-scale volumetric power 600 +/- 452 mW/m3 (range 12–1435), areal 49 +/- 27 mW/m2, energy recovery 11 +/- 6 Wh/m3. Every one of these is MEASURED and carries uncertainty.',
  mfcLab: 'Ren et al. (2016), Nanoscale 8:3539 — 11,220 W/m3 from a MINIATURISED cell on a DEFINED MEDIUM. Not wastewater, not pilot scale, and not a yield anyone should plan around.',
  si: 'SI (2019) — h, e, k and N_A have exact fixed numerical values, so the Faraday constant and the molar gas constant are exact products, not measurements.',
  gibbs: 'Gibbs energy of liquid water formation, -237.14 kJ/mol, against the exact Faraday constant, gives a reversible cell voltage of about 1.2289 V. The commonly quoted 1.23 V is that number ROUNDED UP — an upper bound, not the value. Real electrolysers run 1.6–2.0 V.',
  pi: 'The circle constant is bracketed by its consecutive convergents 333/106 and 355/113 (a unimodular pair). Cited, not re-derived here.',
}

// ── shared assembly ─────────────────────────────────────────────────────────────────────────────────────────────

const report = (
  route: EnergyReport['route'], verdict: EnergyReport['verdict'], refusal: string | null,
  ceiling: Bracket, estimate: Bracket | null, brackets: Bracket[], flags: Record<string, boolean>,
  exactByDefinition: string[], measured: string[], sources: string[], notes: string[], display: string,
): EnergyReport => ({ route, verdict, refusal, ceiling, estimate, brackets, flags, exactByDefinition, measured, sources, notes, display })

// ── 1) WIND — the Betz ceiling ───────────────────────────────────────────────────────────────────────────────────

export interface WindInput {
  rotorDiameterMillimetres?: unknown
  windSpeedMillimetresPerSecond?: unknown
  airDensityGramsPerCubicMetre?: unknown
  claimedOutputMilliwatts?: unknown
}

/** The Betz ratio 16/27 in parts per million, bracketed by integers: 592592 * 27 < 16000000 < 592593 * 27. */
const betzRatioCeiling = (): Bracket => bracketOf('the Betz limit — the largest fraction of the wind’s kinetic energy any open-flow turbine can capture', 'parts per million', 16n * p10(6), 27n, 16n * p10(6), 27n, 3)

/**
 * Wind, bounded by Betz. Power in the wind is proportional to the swept area and the CUBE of the wind speed; no
 * open-flow turbine may capture more than 16/27 of it. Supplying a machine's measured output has it checked against
 * that ceiling, and a claim above the ceiling is REFUSED with the multiplication that convicts it.
 */
export function windBetzCeiling(input: WindInput = {}): EnergyReport {
  const ceilFallback = betzRatioCeiling()
  const exact = ['the Betz ratio 16/27 (exact, from the derivation)', 'the cube law in wind speed and the area law in swept area (exact, from the kinetic-energy flux)']
  const measured = ['air density — the 1.225 kg/m3 default is the standard-atmosphere REFERENCE value at sea level, not the air at any site; supply the site value to bound the answer to it']
  const src = [ENERGY_SOURCES.betz, ENERGY_SOURCES.pi]

  const d = intArg(input.rotorDiameterMillimetres, 'rotorDiameterMillimetres')
  if (!d.ok) return report('wind', 'REFUSED', d.why, ceilFallback, null, [ceilFallback], {}, exact, measured, src, [], 'REFUSED — ' + d.why)
  const v = intArg(input.windSpeedMillimetresPerSecond, 'windSpeedMillimetresPerSecond')
  if (!v.ok) return report('wind', 'REFUSED', v.why, ceilFallback, null, [ceilFallback], {}, exact, measured, src, [], 'REFUSED — ' + v.why)
  const rho = intArg(input.airDensityGramsPerCubicMetre, 'airDensityGramsPerCubicMetre', 1225n)
  if (!rho.ok) return report('wind', 'REFUSED', rho.why, ceilFallback, null, [ceilFallback], {}, exact, measured, src, [], 'REFUSED — ' + rho.why)
  if (d.v <= 0n || v.v < 0n || rho.v <= 0n) {
    const why = 'the rotor diameter and the air density must be positive and the wind speed non-negative — a turbine with no rotor, no air, or a negative wind is not a machine this module will price'
    return report('wind', 'REFUSED', why, ceilFallback, null, [ceilFallback], {}, exact, measured, src, [], 'REFUSED — ' + why)
  }

  // swept area = pi d^2 / 4, in square millimetres
  const dd = d.v * d.v
  const area = bracketOf('swept area', 'square millimetres', PI_LO_N * dd, 4n * PI_LO_D, PI_HI_N * dd, 4n * PI_HI_D, 1)
  // K collects every exactly-known integer factor; only the circle constant is bracketed
  const K = rho.v * dd * v.v * v.v * v.v
  // power in the wind = 1/2 rho A v^3, in milliwatts:  pi * K / (8 * 1e15)
  const windDen = 8n * p10(15)
  const wind = bracketOf('power in the undisturbed wind through that area', 'milliwatts', PI_LO_N * K, PI_LO_D * windDen, PI_HI_N * K, PI_HI_D * windDen, 1)
  // the Betz ceiling = 16/27 of it, in milliwatts:  2 * pi * K / (27 * 1e15)
  const betzDen = 27n * p10(15)
  const betz = bracketOf('the Betz ceiling — the most this rotor could capture at this wind speed', 'milliwatts', 2n * PI_LO_N * K, PI_LO_D * betzDen, 2n * PI_HI_N * K, PI_HI_D * betzDen, 1)
  // the greatest WHOLE milliwatt claim this module admits: floor of the exact upper bound, so the refusal boundary
  // is a stated integer rather than something a caller has to infer from a rounded ceiling
  const admissible = exactBracket('the greatest whole-milliwatt claim admitted before the Betz refusal fires', 'milliwatts', fl(2n * PI_HI_N * K, PI_HI_D * betzDen))
  const brackets = [ceilFallback, area, wind, betz, admissible]
  const notes = [
    'This ceiling is what the AIR allows, not what a machine delivers. Blade count, airfoil, generator, gearbox and controller all subtract from it; a real small turbine typically reaches a third to a half of the Betz figure, and this module will not invent that fraction for you.',
    'The wind speed enters as a cube, so the ceiling is dominated by the site, not by the rotor: doubling the wind speed multiplies the ceiling by eight, while doubling the diameter multiplies it by four.',
  ]

  const claimRaw = input.claimedOutputMilliwatts
  if (claimRaw === undefined || claimRaw === null || claimRaw === '') {
    const display = `wind: the Betz ceiling is ${betz.approx} mW (${dec(2n * PI_LO_N * K, PI_LO_D * betzDen * 1000n, 4)} .. ${dec(2n * PI_HI_N * K, PI_HI_D * betzDen * 1000n, 4)} W) out of ${wind.approx} mW in the wind. No estimate: a turbine's coefficient of performance is a measured property of that machine — supply claimedOutputMilliwatts to have it bounded against this ceiling.`
    return report('wind', 'BOUNDED', null, betz, null, brackets, { claimChecked: false }, exact, measured, src, notes, display)
  }
  const claim = intArg(claimRaw, 'claimedOutputMilliwatts')
  if (!claim.ok) return report('wind', 'REFUSED', claim.why, betz, null, brackets, { claimChecked: false }, exact, measured, src, notes, 'REFUSED — ' + claim.why)
  if (claim.v < 0n) {
    const why = 'claimedOutputMilliwatts is negative — a turbine that consumes power is not producing it'
    return report('wind', 'REFUSED', why, betz, null, brackets, { claimChecked: false }, exact, measured, src, notes, 'REFUSED — ' + why)
  }
  // the convicting multiplication, division-free:  claim * 113 * 27 * 1e15  >  2 * 355 * K
  const lhs = claim.v * PI_HI_D * betzDen, rhs = 2n * PI_HI_N * K
  if (lhs > rhs) {
    const why = `claimedOutputMilliwatts = ${claim.v} exceeds the Betz ceiling. No open-flow turbine captures more than 16/27 of the wind's kinetic energy, so this claim is refused rather than reported: ${claim.v} * ${PI_HI_D} * ${betzDen} = ${lhs} > 2 * ${PI_HI_N} * ${K} = ${rhs}`
    const conviction = withWitness(admissible, 'REFUSAL WITNESS — the claim exceeds the Betz ceiling', [`${claim.v} * ${PI_HI_D * betzDen} > ${rhs}`])
    return report('wind', 'REFUSED', why, betz, null, [...brackets, conviction], { claimChecked: true, claimWithinBetz: false }, exact, measured, src, notes, 'REFUSED — ' + why)
  }
  // coefficient of performance in ppm = claim / (power in the wind); the wider pi bound on each side
  const cpDen = PI_HI_N * K, cpDen2 = PI_LO_N * K
  const cp = bracketOf('coefficient of performance of the claimed machine', 'parts per million of the wind’s kinetic energy', claim.v * windDen * p10(6) * PI_HI_D, cpDen, claim.v * windDen * p10(6) * PI_LO_D, cpDen2, 0)
  const display = `wind: claimed ${claim.v} mW against a Betz ceiling of ${betz.approx} mW — within the limit. Coefficient of performance ${dec(BigInt(cp.low), 10000n, 2)}% .. ${dec(BigInt(cp.high), 10000n, 2)}%, against the Betz limit of 59.25%.`
  return report('wind', 'BOUNDED', null, betz, cp, [...brackets, cp], { claimChecked: true, claimWithinBetz: true }, exact, measured, src, notes, display)
}

// ── 2) BIOGAS TO ENGINE — chemical energy in, Carnot ceiling on the way out ──────────────────────────────────────

export interface BiogasInput {
  biogasLitres?: unknown
  methanePercent?: unknown
  cylinders?: unknown
  crankRevolutionsPerMinute?: unknown
  hotKelvin?: unknown
  coldKelvin?: unknown
  claimedThermalEfficiencyPercent?: unknown
}

const unityCeiling = (): Bracket => exactBracket('the unity bound — no heat engine reaches it, and nothing may be reported above it', 'parts per million', p10(6))

/**
 * Biogas into a four-stroke engine. The chemical energy is bracketed from the measured methane combustion enthalpy
 * through the exact ideal-gas molar volume at STP; the shaft work is bounded by Carnot between the stated hot and
 * cold temperatures. A claimed thermal efficiency at or above unity, or above Carnot, is REFUSED.
 */
export function biogasEngineYield(input: BiogasInput = {}): EnergyReport {
  const exact = [
    'the four-stroke cycle: 4 strokes, 2 crankshaft revolutions, exactly 1 working stroke per cycle — counts, not measurements',
    'the molar gas constant R = k N_A and the STP reference point (273.15 K, 100 kPa) — exact under SI 2019',
    'the stoichiometry CH4 + 2 O2 -> CO2 + 2 H2O — exact integer coefficients',
    '1 kWh = 3600 kJ — exact by definition',
    'the Carnot ceiling (T_hot - T_cold) / T_hot — exact given the two temperatures',
  ]
  const measured = [
    'the methane combustion enthalpy 890.29 kJ/mol — MEASURED, bracketed here at the precision it is quoted to',
    'the biogas methane fraction — whatever the caller supplies; real digester gas varies by feedstock, season and load',
    'the IDEAL-GAS molar volume is a MODEL, not a measurement of real biogas: water vapour, carbon dioxide and pressure all move the true molar count',
  ]
  const src = [ENERGY_SOURCES.methane, ENERGY_SOURCES.fourStroke, ENERGY_SOURCES.si]
  const bail = (why: string, ceiling: Bracket, brackets: Bracket[]): EnergyReport =>
    report('biogas-engine', 'REFUSED', why, ceiling, null, brackets, {}, exact, measured, src, [], 'REFUSED — ' + why)

  const unity = unityCeiling()
  const litres = intArg(input.biogasLitres, 'biogasLitres')
  if (!litres.ok) return bail(litres.why, unity, [unity])
  const pct = intArg(input.methanePercent, 'methanePercent')
  if (!pct.ok) return bail(pct.why, unity, [unity])
  const cyl = intArg(input.cylinders, 'cylinders', 1n)
  if (!cyl.ok) return bail(cyl.why, unity, [unity])
  const rpm = intArg(input.crankRevolutionsPerMinute, 'crankRevolutionsPerMinute', 0n)
  if (!rpm.ok) return bail(rpm.why, unity, [unity])
  const hot = intArg(input.hotKelvin, 'hotKelvin', 0n)
  if (!hot.ok) return bail(hot.why, unity, [unity])
  const cold = intArg(input.coldKelvin, 'coldKelvin', 0n)
  if (!cold.ok) return bail(cold.why, unity, [unity])

  if (litres.v < 0n) return bail('biogasLitres is negative — there is no such volume', unity, [unity])
  if (pct.v < 0n || pct.v > 100n) return bail(`methanePercent = ${pct.v} is outside 0..100 — a gas cannot be more than all methane, and a fraction below zero is not a fraction`, unity, [unity])
  if (cyl.v < 1n) return bail('cylinders must be at least 1 — an engine with no cylinder has no working stroke', unity, [unity])
  if (rpm.v < 0n) return bail('crankRevolutionsPerMinute is negative — refused rather than answered', unity, [unity])

  // chemical energy: litres * percent * 1e16 * dH / MOLAR_VOLUME_NUM  joules
  const base = litres.v * pct.v * p10(16)
  const joules = bracketOf('chemical energy in the methane fraction, fully burned', 'joules', base * METHANE_HHV_LO, MOLAR_VOLUME_NUM, base * METHANE_HHV_HI, MOLAR_VOLUME_NUM, 0)
  const microKwh = bracketOf('the same energy', 'micro-kilowatt-hours', base * METHANE_HHV_LO * p10(6), MOLAR_VOLUME_NUM * JOULES_PER_KWH, base * METHANE_HHV_HI * p10(6), MOLAR_VOLUME_NUM * JOULES_PER_KWH, 0)
  const moles = bracketOf('moles of methane, by the ideal-gas model at STP', 'micromoles', litres.v * pct.v * p10(22), MOLAR_VOLUME_NUM, litres.v * pct.v * p10(22), MOLAR_VOLUME_NUM, 0)
  // the cycle, counted rather than measured
  const impulses = exactBracket('working strokes per two crankshaft revolutions — one per cylinder, by the four-stroke cycle', 'strokes', cyl.v)
  const brackets = [unity, moles, joules, microKwh, impulses]
  const notes = [
    'The enthalpy used is the value with LIQUID water as product. An engine that exhausts steam does not recover the heat of vaporisation, so the shaft work available is lower than this figure implies; the vaporisation loss is not sourced in this module and is therefore not subtracted rather than being guessed.',
    'Rathbun states impulses per revolution as cylinders / 2. That is the same count as the one reported here, written without the fraction: each cylinder fires once per two crankshaft revolutions.',
  ]
  if (rpm.v > 0n) {
    const perTwoMinutes = exactBracket('working strokes per two minutes of running at the stated speed', 'strokes', cyl.v * rpm.v)
    brackets.push(perTwoMinutes)
    notes.push(`At ${rpm.v} rpm with ${cyl.v} cylinder(s) the engine takes ${cyl.v * rpm.v} working strokes every two minutes — an exact integer, which is why it is reported per two minutes rather than as a halved count per minute.`)
  }

  if (hot.v === 0n && cold.v === 0n) {
    const display = `biogas: ${litres.v} L at ${pct.v}% methane holds ${joules.approx} J (${dec(base * METHANE_HHV_LO, MOLAR_VOLUME_NUM * p10(6), 2)} .. ${dec(base * METHANE_HHV_HI, MOLAR_VOLUME_NUM * p10(6), 2)} MJ). No shaft-work estimate: supply hotKelvin and coldKelvin for the Carnot ceiling. The ceiling standing here is unity, which no heat engine reaches.`
    return report('biogas-engine', 'BOUNDED', null, unity, joules, brackets, { carnotComputed: false, claimChecked: false }, exact, measured, src, notes, display)
  }
  if (cold.v < 1n || hot.v < 1n) return bail('hotKelvin and coldKelvin must both be at least 1 K — supply both, or neither', unity, brackets)
  if (hot.v <= cold.v) return bail(`hotKelvin = ${hot.v} is not above coldKelvin = ${cold.v} — with no temperature difference there is no heat engine, and any positive work reported here would be work from nowhere`, unity, brackets)

  const carnot = bracketOf('the Carnot ceiling between the stated temperatures', 'parts per million', (hot.v - cold.v) * p10(6), hot.v, (hot.v - cold.v) * p10(6), hot.v, 2)
  brackets.push(carnot)
  const carnotWork = bracketOf('shaft work at the Carnot ceiling — unreachable, stated as the bound', 'joules', base * METHANE_HHV_LO * (hot.v - cold.v), MOLAR_VOLUME_NUM * hot.v, base * METHANE_HHV_HI * (hot.v - cold.v), MOLAR_VOLUME_NUM * hot.v, 0)
  brackets.push(carnotWork)
  notes.push('Carnot is a ceiling no real engine touches. A well-run small gas engine converts roughly a quarter to a third of the fuel energy to shaft work; the rest leaves as exhaust and jacket heat, which is useful for hot water and useless for electricity.')

  const claimRaw = input.claimedThermalEfficiencyPercent
  if (claimRaw === undefined || claimRaw === null || claimRaw === '') {
    const display = `biogas: ${litres.v} L at ${pct.v}% methane holds ${joules.approx} J. Between ${hot.v} K and ${cold.v} K the Carnot ceiling is ${dec(BigInt(carnot.low), 10000n, 2)}%, so the shaft work cannot exceed ${carnotWork.approx} J. No estimate: supply claimedThermalEfficiencyPercent for your engine to have it bounded against this ceiling.`
    return report('biogas-engine', 'BOUNDED', null, carnotWork, null, brackets, { carnotComputed: true, claimChecked: false }, exact, measured, src, notes, display)
  }
  const claim = intArg(claimRaw, 'claimedThermalEfficiencyPercent')
  if (!claim.ok) return bail(claim.why, carnotWork, brackets)
  if (claim.v < 0n) return bail('claimedThermalEfficiencyPercent is negative — refused rather than answered', carnotWork, brackets)
  if (claim.v >= 100n) return bail(`claimedThermalEfficiencyPercent = ${claim.v} is at or above unity. A heat engine converting all of its heat to work is forbidden by the second law before any question of Carnot arises; there is no over-unity arm in this module`, carnotWork, brackets)
  // the convicting multiplication:  claim * T_hot  >  100 * (T_hot - T_cold)
  if (claim.v * hot.v > 100n * (hot.v - cold.v)) {
    const why = `claimedThermalEfficiencyPercent = ${claim.v} exceeds the Carnot ceiling between ${hot.v} K and ${cold.v} K: ${claim.v} * ${hot.v} = ${claim.v * hot.v} > 100 * (${hot.v} - ${cold.v}) = ${100n * (hot.v - cold.v)}. Refused rather than reported`
    const conviction = withWitness(carnot, 'REFUSAL WITNESS — the claim exceeds Carnot', [`${claim.v} * ${hot.v} > ${100n * (hot.v - cold.v)}`])
    return report('biogas-engine', 'REFUSED', why, carnotWork, null, [...brackets, conviction], { carnotComputed: true, claimChecked: true, claimWithinCarnot: false }, exact, measured, src, notes, 'REFUSED — ' + why)
  }
  const work = bracketOf('shaft work at the claimed efficiency', 'joules', base * METHANE_HHV_LO * claim.v, MOLAR_VOLUME_NUM * 100n, base * METHANE_HHV_HI * claim.v, MOLAR_VOLUME_NUM * 100n, 0)
  const display = `biogas: ${litres.v} L at ${pct.v}% methane holds ${joules.approx} J; at a claimed ${claim.v}% (Carnot ceiling ${dec(BigInt(carnot.low), 10000n, 2)}%) the shaft work is ${work.approx} J, i.e. ${dec(base * METHANE_HHV_LO * claim.v, MOLAR_VOLUME_NUM * 100n * JOULES_PER_KWH, 4)} .. ${dec(base * METHANE_HHV_HI * claim.v, MOLAR_VOLUME_NUM * 100n * JOULES_PER_KWH, 4)} kWh.`
  return report('biogas-engine', 'BOUNDED', null, carnotWork, work, [...brackets, work], { carnotComputed: true, claimChecked: true, claimWithinCarnot: true }, exact, measured, src, notes, display)
}

// ── 3) MICROBIAL FUEL CELL — every number measured, so every number bracketed ────────────────────────────────────

export interface MfcInput {
  reactorLitres?: unknown
  retentionHours?: unknown
  anodeAreaSquareMillimetres?: unknown
  assertedVolumetricMilliwattsPerCubicMetre?: unknown
  scale?: unknown
}

/**
 * The microbial fuel cell, priced from a pilot-scale survey. Nothing here is exact: the volumetric power, the areal
 * power and the energy recovery are all measured, so all three are bracketed. The survey's reported MAXIMUM is the
 * ceiling; an asserted power above it is REFUSED. The two measured bands are also checked AGAINST EACH OTHER over
 * the stated retention time, and that check is allowed to come out false.
 */
export function microbialFuelCellYield(input: MfcInput = {}): EnergyReport {
  const exact: string[] = ['nothing in this route is exact by definition — that is the honest answer, and it is why every figure below is a bracket']
  const measured = [
    'volumetric power 600 +/- 452 mW/m3 at pilot scale, reported range 12–1435 — MEASURED, and the spread is larger than most of the mean',
    'areal power 49 +/- 27 mW/m2 — MEASURED',
    'energy recovery 11 +/- 6 Wh/m3 of treated water — MEASURED',
    'the wastewater itself: strength, conductivity, temperature and biofilm maturity all move these numbers, and none of them is an input here',
  ]
  const src = [ENERGY_SOURCES.mfc, ENERGY_SOURCES.mfcLab]
  const scaleRaw = input.scale
  // NEVER String() an untrusted value: a hostile toString throws, and a route that throws while validating is not
  // total. Only a real string is accepted; anything else falls through to the named refusal below.
  const scale = scaleRaw === undefined || scaleRaw === null || scaleRaw === '' ? 'pilot' : typeof scaleRaw === 'string' ? scaleRaw : '\0not-a-string'
  const isLab = scale === 'lab'
  const cap = isLab ? MFC_LAB_RECORD : MFC_VOL_MAX
  const capCeiling = exactBracket(isLab
    ? 'the highest volumetric power reported for ANY microbial fuel cell — a miniaturised cell on a defined medium, NOT wastewater and NOT a pilot-scale expectation'
    : 'the highest volumetric power reported at pilot scale in the survey — the top of the measured range, not a design target', 'milliwatts per cubic metre', cap)
  const bail = (why: string, brackets: Bracket[]): EnergyReport =>
    report('microbial-fuel-cell', 'REFUSED', why, capCeiling, null, brackets, {}, exact, measured, src, [], 'REFUSED — ' + why)

  if (scale !== 'pilot' && scale !== 'lab') return bail(`scale must be 'pilot' or 'lab'; received ${describe(scaleRaw)}`, [capCeiling])
  const litres = intArg(input.reactorLitres, 'reactorLitres')
  if (!litres.ok) return bail(litres.why, [capCeiling])
  const hours = intArg(input.retentionHours, 'retentionHours')
  if (!hours.ok) return bail(hours.why, [capCeiling])
  const areaMm2 = intArg(input.anodeAreaSquareMillimetres, 'anodeAreaSquareMillimetres', 0n)
  if (!areaMm2.ok) return bail(areaMm2.why, [capCeiling])
  if (litres.v < 1n) return bail('reactorLitres must be at least 1 — a reactor with no volume produces no power', [capCeiling])
  if (hours.v < 1n) return bail('retentionHours must be at least 1 — water that is not held is not treated', [capCeiling])
  if (areaMm2.v < 0n) return bail('anodeAreaSquareMillimetres is negative — refused rather than answered', [capCeiling])

  // mW/m3 x (litres / 1000) m3 = mW*litres/1000 = microwatts x litres... stated in microwatts, exactly.
  const sdBand = bracketOf('volumetric power, mean +/- one standard deviation', 'microwatts', (MFC_VOL_MEAN - MFC_VOL_SD) * litres.v, 1n, (MFC_VOL_MEAN + MFC_VOL_SD) * litres.v, 1n, 0)
  const rangeBand = bracketOf('volumetric power across the whole reported range', 'microwatts', MFC_VOL_MIN * litres.v, 1n, MFC_VOL_MAX * litres.v, 1n, 0)
  const ceilingPower = exactBracket('the most this reactor volume could give at the top of the reported range', 'microwatts', cap * litres.v)
  // energy recovery: Wh/m3 x (litres/1000) m3 = Wh*litres/1000 = milliwatt-hours x litres, exactly.
  const energyBand = bracketOf('energy recovered per pass, mean +/- one standard deviation', 'milliwatt-hours', (MFC_ENERGY_MEAN - MFC_ENERGY_SD) * litres.v, 1n, (MFC_ENERGY_MEAN + MFC_ENERGY_SD) * litres.v, 1n, 0)
  const brackets = [capCeiling, sdBand, rangeBand, ceilingPower, energyBand]
  if (areaMm2.v > 0n) {
    // mW/m2 x (mm2 / 1e6) m2 = mW*mm2/1e6 = nanowatts x mm2 ... stated in nanowatts, exactly.
    const areal = bracketOf('areal power on the stated anode area, mean +/- one standard deviation', 'nanowatts', (MFC_AREAL_MEAN - MFC_AREAL_SD) * areaMm2.v, 1n, (MFC_AREAL_MEAN + MFC_AREAL_SD) * areaMm2.v, 1n, 0)
    brackets.push(areal)
  }

  // THE CROSS-CHECK, allowed to fail: can the measured power range and the measured energy recovery both describe
  // this retention time? Power range x hours, in milliwatt-hours per cubic metre, against the energy band.
  const powerOverHoldLo = MFC_VOL_MIN * hours.v, powerOverHoldHi = MFC_VOL_MAX * hours.v          // mWh/m3
  const energyLo = (MFC_ENERGY_MEAN - MFC_ENERGY_SD) * 1000n, energyHi = (MFC_ENERGY_MEAN + MFC_ENERGY_SD) * 1000n // mWh/m3
  const bandsAgree = powerOverHoldHi >= energyLo && powerOverHoldLo <= energyHi
  const crossCheck: Bracket = {
    ...bracketOf('the measured power range integrated over the stated retention time, to be compared with the measured energy recovery', 'milliwatt-hours per cubic metre', powerOverHoldLo, 1n, powerOverHoldHi, 1n, 0),
    approx: `${powerOverHoldLo} .. ${powerOverHoldHi} against the reported ${energyLo} .. ${energyHi}`,
  }
  brackets.push(crossCheck)
  const notes = [
    'The standard deviation here is larger than three quarters of the mean, so a single-number expectation from this route would be dishonest. The band is the finding.',
    bandsAgree
      ? `Over ${hours.v} h the measured power range spans ${powerOverHoldLo}..${powerOverHoldHi} mWh/m3, which overlaps the measured energy recovery band ${energyLo}..${energyHi} mWh/m3 — the two independent measurements can both describe this reactor.`
      : `Over ${hours.v} h the measured power range spans ${powerOverHoldLo}..${powerOverHoldHi} mWh/m3, which does NOT overlap the measured energy recovery band ${energyLo}..${energyHi} mWh/m3. The two published measurements cannot both describe a pass of this length; the retention time, not the survey, is what does not fit.`,
  ]
  if (isLab) notes.push('You asked for the lab scale. The record it admits comes from a miniaturised cell fed a defined medium, not wastewater. It is a laboratory result about electrode and reactor design, and treating it as a yield for a bucket of sewage would be the exact overclaim this module exists to refuse.')

  const assertedRaw = input.assertedVolumetricMilliwattsPerCubicMetre
  if (assertedRaw === undefined || assertedRaw === null || assertedRaw === '') {
    const display = `microbial fuel cell: ${litres.v} L held ${hours.v} h gives ${sdBand.approx} uW at the mean +/- one standard deviation (whole reported range ${rangeBand.approx} uW), recovering ${energyBand.approx} mWh per pass. Ceiling ${ceilingPower.approx} uW. Bands agree: ${bandsAgree ? 'yes' : 'NO'}.`
    return report('microbial-fuel-cell', 'BOUNDED', null, ceilingPower, sdBand, brackets, { bandsAgree, scaleIsLab: isLab, assertionChecked: false }, exact, measured, src, notes, display)
  }
  const asserted = intArg(assertedRaw, 'assertedVolumetricMilliwattsPerCubicMetre')
  if (!asserted.ok) return report('microbial-fuel-cell', 'REFUSED', asserted.why, ceilingPower, null, brackets, { bandsAgree, scaleIsLab: isLab, assertionChecked: false }, exact, measured, src, notes, 'REFUSED — ' + asserted.why)
  if (asserted.v < 0n) return report('microbial-fuel-cell', 'REFUSED', 'assertedVolumetricMilliwattsPerCubicMetre is negative — refused rather than answered', ceilingPower, null, brackets, { bandsAgree, scaleIsLab: isLab, assertionChecked: false }, exact, measured, src, notes, 'REFUSED — negative assertion')
  if (asserted.v > cap) {
    const why = isLab
      ? `assertedVolumetricMilliwattsPerCubicMetre = ${asserted.v} is above ${cap}, the highest volumetric power reported for any microbial fuel cell anywhere. Refused: ${asserted.v} * 1 > ${cap}`
      : `assertedVolumetricMilliwattsPerCubicMetre = ${asserted.v} is above ${cap}, the top of the pilot-scale range in the survey. Refused: ${asserted.v} * 1 > ${cap}. If you mean the miniaturised laboratory cell on a defined medium, pass scale='lab' and read the label that comes with it — it is not a wastewater result`
    const conviction = withWitness(exactBracket('the reported ceiling', 'milliwatts per cubic metre', cap), 'REFUSAL WITNESS — the assertion exceeds the reported ceiling', [`${asserted.v} * 1 > ${cap}`])
    return report('microbial-fuel-cell', 'REFUSED', why, ceilingPower, null, [...brackets, conviction], { bandsAgree, scaleIsLab: isLab, assertionChecked: true, assertionWithinCeiling: false }, exact, measured, src, notes, 'REFUSED — ' + why)
  }
  const assertedPower = exactBracket('power at the asserted volumetric density', 'microwatts', asserted.v * litres.v)
  const withinSd = asserted.v >= MFC_VOL_MEAN - MFC_VOL_SD && asserted.v <= MFC_VOL_MEAN + MFC_VOL_SD
  const display = `microbial fuel cell: an asserted ${asserted.v} mW/m3 over ${litres.v} L gives ${assertedPower.approx} uW, within the ${cap} mW/m3 ceiling${withinSd ? '' : ' but OUTSIDE the mean +/- one standard deviation band'}. Bands agree: ${bandsAgree ? 'yes' : 'NO'}.`
  return report('microbial-fuel-cell', 'BOUNDED', null, ceilingPower, assertedPower, [...brackets, assertedPower], { bandsAgree, scaleIsLab: isLab, assertionChecked: true, assertionWithinCeiling: true, assertionWithinOneSd: withinSd }, exact, measured, src, notes, display)
}

// ── 4) PHOTON AND ELECTROLYSIS — the thermodynamic floor, and what a single photon can pay ───────────────────────

export interface PhotonInput {
  wavelengthNanometres?: unknown
  appliedMillivolts?: unknown
  claimedFaradaicEfficiencyPercent?: unknown
}

/** the reversible cell voltage in microvolts, bracketed by the quotation precision of the Gibbs energy */
const reversibleVolts = (): Bracket => bracketOf(
  'the reversible cell voltage for splitting liquid water — the thermodynamic FLOOR, below which no sustained electrolysis occurs',
  'microvolts', GIBBS_WATER_LO * p10(19), 2n * FARADAY_NUM, GIBBS_WATER_HI * p10(19), 2n * FARADAY_NUM, 6)

/** the thermoneutral voltage in microvolts: the point where the electricity alone carries the full higher heating value */
const thermoneutralVolts = (): Bracket => bracketOf(
  'the thermoneutral voltage — electricity alone carries the full higher heating value; below it the cell must draw heat from its surroundings',
  'microvolts', HYDROGEN_HHV_LO * p10(19), 2n * FARADAY_NUM, HYDROGEN_HHV_HI * p10(19), 2n * FARADAY_NUM, 6)

/**
 * Photon and electrolysis. The reversible voltage is computed from the measured Gibbs energy against the EXACT
 * Faraday constant and reported as a bracket around roughly 1.2289 V; the familiar 1.23 V is shown to be that number
 * rounded UP, i.e. an upper bound rather than the value, by an integer multiplication. A photon of the stated
 * wavelength is priced in volts per electron (exact: h, c and e are all exact) and checked against that floor. An
 * applied voltage below the floor is REFUSED, and so is one below the thermoneutral voltage, where an efficiency
 * measured against the higher heating value exceeds unity only because the cell is absorbing ambient heat.
 */
export function photonElectrolysisYield(input: PhotonInput = {}): EnergyReport {
  const rev = reversibleVolts(), tn = thermoneutralVolts()
  const revLo = BigInt(rev.low), revHi = BigInt(rev.high), tnLo = BigInt(tn.low), tnHi = BigInt(tn.high)
  const exact = [
    'h, c, e and N_A — exact fixed values under SI 2019, so the Faraday constant N_A e is an exact product and photon energy per electron charge is exact',
    'the stoichiometry of water splitting: 2 electrons per hydrogen molecule — an exact integer',
  ]
  const measured = [
    'the Gibbs energy of liquid water formation, -237.14 kJ/mol — MEASURED. It, not the Faraday constant, is the whole width of the voltage bracket below',
    'hydrogen’s higher heating value 285.83 kJ/mol and lower heating value 241.83 kJ/mol — MEASURED',
    'the 1.6–2.0 V a real electrolyser actually runs at — OBSERVED practice, dominated by kinetic overpotential and ohmic loss, neither of which this module models',
  ]
  const src = [ENERGY_SOURCES.si, ENERGY_SOURCES.gibbs]
  // the 1.23 V claim, settled by multiplication with no division anywhere
  const roundedUp = 1230000n * (2n * FARADAY_NUM) > GIBBS_WATER_HI * p10(19)
  const roundingWitness: Bracket = {
    ...withWitness(
      exactBracket('the familiar 1.23 V, tested against the reversible voltage — it is an UPPER BOUND, not the value', 'microvolts', 1230000n),
      'the familiar 1.23 V, tested against the reversible voltage — it is an UPPER BOUND, not the value',
      [`1230000 * ${2n * FARADAY_NUM} > ${GIBBS_WATER_HI * p10(19)}`, `${rev.high} <= 1230000`]),
    approx: `the floor is ${rev.approx} microvolts, so 1230000 microvolts overstates it`,
  }
  const brackets = [rev, tn, roundingWitness]
  const notes = [
    'The reversible voltage is a FLOOR, not a target. Real electrolysers run 1.6–2.0 V, and the difference is kinetic overpotential and ohmic loss — heat, not hydrogen.',
    'The bracket’s whole width comes from the measured Gibbs energy. The Faraday constant contributes none of it: under SI 2019 it is an exact product of two exact constants.',
  ]
  const bail = (why: string, extra: Bracket[] = []): EnergyReport =>
    report('photon-electrolysis', 'REFUSED', why, rev, null, [...brackets, ...extra], {}, exact, measured, src, notes, 'REFUSED — ' + why)

  const nm = intArg(input.wavelengthNanometres, 'wavelengthNanometres')
  if (!nm.ok) return bail(nm.why)
  const mv = intArg(input.appliedMillivolts, 'appliedMillivolts')
  if (!mv.ok) return bail(mv.why)
  if (nm.v < 1n) return bail('wavelengthNanometres must be at least 1 — refused rather than answered')
  if (mv.v < 1n) return bail('appliedMillivolts must be at least 1 — refused rather than answered')

  // photon energy per electron charge, exact: PHOTON_NUM / (lambda_nm * e) microvolts
  const photonDen = nm.v * E_CHARGE
  const photon = bracketOf('what one photon of this wavelength can pay a single electron', 'microvolts', PHOTON_NUM, photonDen, PHOTON_NUM, photonDen, 3)
  const photonLo = BigInt(photon.low)
  // the longest wavelength whose photon still clears the floor at its most demanding end
  const lambdaMax = exactBracket('the longest wavelength whose single photon still clears the reversible floor', 'nanometres', fl(PHOTON_NUM, E_CHARGE * revHi))
  const clearsFloor = photonLo >= revHi
  brackets.push(photon, lambdaMax)
  notes.push(clearsFloor
    ? `A ${nm.v} nm photon carries ${photon.approx} uV per electron, which clears the ${rev.approx} uV floor. Clearing the floor is necessary and nowhere near sufficient: a real photoelectrochemical cell needs roughly 1.6–2.0 V of driving force, so one such photon does not split water on its own.`
    : `A ${nm.v} nm photon carries only ${photon.approx} uV per electron, BELOW the ${rev.approx} uV floor. One photon of this wavelength cannot drive the reaction; wavelengths of ${lambdaMax.low} nm or shorter are the ones that clear it.`)

  if (mv.v * 1000n < revLo) {
    const why = `appliedMillivolts = ${mv.v} is below the reversible floor. Water splitting is thermodynamically uphill there, so a device claiming sustained hydrogen output at this voltage is claiming energy from nowhere. Refused: ${mv.v} * ${2000n * FARADAY_NUM} < ${GIBBS_WATER_LO * p10(19)}`
    const conviction = withWitness(exactBracket('the applied voltage', 'microvolts', mv.v * 1000n), 'REFUSAL WITNESS — the applied voltage is below the thermodynamic floor', [`${mv.v} * ${2000n * FARADAY_NUM} < ${GIBBS_WATER_LO * p10(19)}`, `${mv.v * 1000n} <= ${rev.low}`])
    return bail(why, [conviction])
  }
  if (mv.v * 1000n < tnLo) {
    const why = `appliedMillivolts = ${mv.v} is below the thermoneutral voltage (${tn.approx} uV). A cell run there is ENDOTHERMIC: it absorbs heat from its surroundings, and an efficiency measured against hydrogen's higher heating value would come out above 100%. That number is not free energy and this module will not print it as an efficiency — the heat drawn from the surroundings would have to be accounted for, and no sourced figure for it is carried here. Raise the applied voltage to ${tnHi / 1000n + 1n} mV or above, or ask for the voltages themselves`
    const conviction = withWitness(exactBracket('the applied voltage', 'microvolts', mv.v * 1000n), 'REFUSAL WITNESS — the applied voltage is below the thermoneutral voltage', [`${mv.v} * ${2000n * FARADAY_NUM} < ${HYDROGEN_HHV_LO * p10(19)}`, `${mv.v * 1000n} <= ${tn.low}`])
    return report('photon-electrolysis', 'REFUSED', why, rev, null, [...brackets, conviction], { photonClearsFloor: clearsFloor, oneTwoThreeIsAnUpperBound: roundedUp, appliedAboveFloor: true, appliedAboveThermoneutral: false }, exact, measured, src, notes, 'REFUSED — ' + why)
  }

  const claimRaw = input.claimedFaradaicEfficiencyPercent
  let faradaic = 100n
  if (!(claimRaw === undefined || claimRaw === null || claimRaw === '')) {
    const c = intArg(claimRaw, 'claimedFaradaicEfficiencyPercent')
    if (!c.ok) return bail(c.why)
    if (c.v < 0n || c.v > 100n) return bail(`claimedFaradaicEfficiencyPercent = ${c.v} is outside 0..100. Above 100 would mean more hydrogen than the charge passed can account for, which is over-unity in the plainest form; below 0 is not a fraction. Refused rather than reported`)
    faradaic = c.v
  }

  // voltage efficiency against the higher and lower heating values, in parts per million, at the applied voltage
  const den = 2n * FARADAY_NUM * mv.v
  const hhvEff = bracketOf('energy efficiency against hydrogen’s higher heating value, at unit faradaic efficiency', 'parts per million', HYDROGEN_HHV_LO * p10(22), den, HYDROGEN_HHV_HI * p10(22), den, 2)
  const lhvEff = bracketOf('energy efficiency against hydrogen’s lower heating value, at unit faradaic efficiency', 'parts per million', HYDROGEN_LHV_LO * p10(22), den, HYDROGEN_LHV_HI * p10(22), den, 2)
  const netEff = bracketOf('energy efficiency against the higher heating value, after the claimed faradaic efficiency', 'parts per million', HYDROGEN_HHV_LO * p10(22) * faradaic, den * 100n, HYDROGEN_HHV_HI * p10(22) * faradaic, den * 100n, 2)
  brackets.push(hhvEff, lhvEff, netEff)
  // the ceiling on this route: the applied voltage can never do better than the thermoneutral ratio at unity faradaic
  const ceiling = bracketOf('the ceiling on energy efficiency at this applied voltage — the thermoneutral voltage over it, at perfect faradaic efficiency', 'parts per million', HYDROGEN_HHV_LO * p10(22), den, HYDROGEN_HHV_HI * p10(22), den, 2)
  if (BigInt(ceiling.high) > p10(6)) notes.push('The ceiling reported here is at or below unity by construction: this branch is only reached at or above the thermoneutral voltage.')

  const display = `electrolysis: the reversible floor is ${rev.approx} uV (about 1.2289 V) and 1.23 V is that number rounded UP. At ${mv.v} mV the energy efficiency against the higher heating value is ${dec(BigInt(hhvEff.low), 10000n, 2)}% .. ${dec(BigInt(hhvEff.high), 10000n, 2)}%${faradaic === 100n ? '' : `, or ${dec(BigInt(netEff.low), 10000n, 2)}% .. ${dec(BigInt(netEff.high), 10000n, 2)}% after a claimed ${faradaic}% faradaic efficiency`}. A ${nm.v} nm photon pays ${photon.approx} uV per electron and ${clearsFloor ? 'clears' : 'does NOT clear'} the floor; ${lambdaMax.low} nm is the longest wavelength that does.`
  return report('photon-electrolysis', 'BOUNDED', null, ceiling, netEff, brackets,
    { photonClearsFloor: clearsFloor, oneTwoThreeIsAnUpperBound: roundedUp, appliedAboveFloor: true, appliedAboveThermoneutral: true },
    exact, measured, src, notes, display)
}

/** Every route in one call, each answering for itself. Useful as a single honest overview; nothing is summed across
 *  routes, because adding a wind ceiling to a fuel-cell band would produce a number that means nothing. */
export function energyRoutes(input: { wind?: WindInput; biogas?: BiogasInput; mfc?: MfcInput; photon?: PhotonInput } = {}): EnergyReport[] {
  return [
    windBetzCeiling(input.wind ?? {}),
    biogasEngineYield(input.biogas ?? {}),
    microbialFuelCellYield(input.mfc ?? {}),
    photonElectrolysisYield(input.photon ?? {}),
  ]
}
