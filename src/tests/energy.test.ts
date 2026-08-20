// energy — THE FOUR DIY ROUTES, AND THE PROOF THAT THESE CHECKS CAN FAIL.
//
// A suite where everything passes is not evidence; it is decoration. Every route below is exercised on a case that
// comes out NEGATIVE — a REFUSED verdict, or a computed flag that is false — and on the exact integer BOUNDARY where
// the answer flips, so the refusal is known to sit where the module says it sits rather than somewhere convenient.
// Three separate mechanisms are deliberately shown to be fallible rather than true by construction:
//
//   (1) verifyBracket() is fed a MUTATED bracket and must report false. A verifier that cannot reject is not one.
//   (2) each headline bracket is checked against an INDEPENDENT recomputation — a much tighter circle constant, the
//       separately quoted Faraday constant — and the same containment check is then fed a deliberately wrong value
//       and must reject it. Containment that accepts everything proves nothing about what it accepted.
//   (3) the closing test COUNTS the negative outcomes the suite actually observed and fails if there are none, so
//       the discipline above cannot rot into a suite that quietly stops exercising the refusing paths.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  windBetzCeiling, biogasEngineYield, microbialFuelCellYield, photonElectrolysisYield, energyRoutes,
  verifyBracket, FARADAY_NUM, MOLAR_VOLUME_NUM, PHOTON_NUM, ENERGY_SOURCES,
  type Bracket, type EnergyReport,
} from '../energy.js'
import { callTool, MCP_CATALOG } from '../mcp.js'

const TOOLS = ['uuidna_energy_wind', 'uuidna_energy_biogas', 'uuidna_energy_mfc', 'uuidna_energy_photon'] as const
const INTEGER = /^-?\d+$/

// the suite's own tally of NEGATIVE outcomes — read by the last test, which fails if the suite went all-green by
// never reaching a refusing path
const observed = { refusals: 0, falseFlags: 0, rejectedBrackets: 0, rejectedContainments: 0 }
const seen = (r: EnergyReport): EnergyReport => {
  if (r.verdict === 'REFUSED') observed.refusals++
  for (const v of Object.values(r.flags)) if (v === false) observed.falseFlags++
  return r
}
/** a bracket contains a value known as the exact rational n/d — the containment check used against INDEPENDENT
 *  recomputations. Division-free: both sides by multiplication. */
const contains = (b: Bracket, n: bigint, d: bigint): boolean => BigInt(b.low) * d <= n && BigInt(b.high) * d >= n

// ── the module's constants, recomputed from their published decimal forms ────────────────────────────────────────

test('the exact SI products are the published constants, and the circle bracket is a unimodular pair', () => {
  // the Faraday constant, quoted as 96485.33212 C/mol, is this exact product rounded — so the exact product must
  // sit inside the half-unit band of that quotation. FARADAY_NUM is scaled by 1e13.
  assert.ok(FARADAY_NUM >= 964853321150000000n && FARADAY_NUM <= 964853321250000000n, `Faraday product ${FARADAY_NUM} is not the quoted 96485.33212 C/mol`)
  // the molar gas constant R = k N_A must be 8.31446261815324 exactly; MOLAR_VOLUME_NUM = R x 27315, scaled by 1e21
  assert.equal(MOLAR_VOLUME_NUM, 831446261815324n * 27315n)
  // and the molar volume it encodes is IUPAC's 22.71095 L/mol at STP (scaled: 1e21 m3 = 1e18 L)
  assert.ok(MOLAR_VOLUME_NUM >= 22710945000000000000n && MOLAR_VOLUME_NUM <= 22710955000000000000n)
  // 333/106 and 355/113 are consecutive convergents: their determinant is exactly 1, which is why they bracket
  assert.equal(355n * 106n - 333n * 113n, 1n)
  // and the tighter one really is the upper side: 355/113 > 333/106
  assert.ok(355n * 106n > 333n * 113n)
  // hc/e, the photon constant, is 1239.841984... V nm — PHOTON_NUM / (nm x e) microvolts
  assert.equal(PHOTON_NUM, 662607015n * 299792458n * 10n)
  assert.ok(typeof ENERGY_SOURCES.betz === 'string' && ENERGY_SOURCES.betz.includes('16/27'))
})

// ── (1) THE VERIFIER MUST BE ABLE TO REJECT ──────────────────────────────────────────────────────────────────────

test('verifyBracket rejects a tampered bracket — the verifier is fallible, not a formality', () => {
  const r = seen(windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 }))
  const good = r.ceiling
  assert.ok(verifyBracket(good), 'the honest bracket verifies')

  // mutate the STATED bound while leaving the witnesses alone — the classic silent-edit
  const movedBound: Bracket = { ...good, low: (BigInt(good.low) + 1n).toString() }
  assert.equal(verifyBracket(movedBound), false, 'a bound that no witness is about must be rejected')
  observed.rejectedBrackets++

  // mutate a WITNESS so the multiplication no longer holds
  const brokenWitness: Bracket = { ...good, witness: good.witness.map((w, i) => (i === 0 ? w.replace(/^(-?\d+) \*/, (_m, n) => `${BigInt(n) + 1000000n} *`) : w)) }
  assert.equal(verifyBracket(brokenWitness), false, 'a witness whose multiplication fails must be rejected')
  observed.rejectedBrackets++

  // strip the witnesses entirely — an unwitnessed bracket is not a bracket
  assert.equal(verifyBracket({ ...good, witness: [] }), false)
  assert.equal(verifyBracket({ ...good, witness: ['trust me'] }), false)
  observed.rejectedBrackets += 2
})

// ── 1) WIND ──────────────────────────────────────────────────────────────────────────────────────────────────────

test('wind: the Betz ceiling brackets an INDEPENDENT recomputation, and rejects a wrong one', () => {
  const d = 3000n, v = 6000n, rho = 1225n
  const r = seen(windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 }))
  assert.equal(r.verdict, 'BOUNDED')
  // recomputed with a circle constant far tighter than the convergent pair the module cites — an independent path
  const PI15 = 3141592653589793n, PI15_DEN = 10n ** 15n
  const K = rho * d * d * v * v * v
  const trueN = 2n * PI15 * K, trueD = PI15_DEN * 27n * 10n ** 15n     // milliwatts, as an exact rational
  assert.ok(contains(r.ceiling, trueN, trueD), `the Betz bracket ${r.ceiling.low}..${r.ceiling.high} must contain the independently computed value`)
  // THE SAME CHECK MUST REJECT: a value 1% high is outside the bracket, so containment is not vacuous
  assert.equal(contains(r.ceiling, trueN * 101n, trueD * 100n), false, 'containment accepted a value 1% above the truth — the check is vacuous')
  observed.rejectedContainments++
  // sanity against hand arithmetic: 1/2 x 1.225 x pi x 1.5^2 x 6^3 x 16/27 = 554.17 W = 554170 mW
  assert.ok(BigInt(r.ceiling.low) >= 554100n && BigInt(r.ceiling.high) <= 554200n, r.ceiling.approx)
})

test('wind: a claim above the Betz limit is REFUSED, and the boundary is exactly where the module says', () => {
  const args = { rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 }
  const base = windBetzCeiling(args)
  // the boundary is the greatest WHOLE milliwatt the module admits — the floor of the exact bound, not the rounded
  // ceiling, which is one integer above it by construction and would therefore already be a violation
  const admissible = base.brackets.find((b) => b.quantity.startsWith('the greatest whole-milliwatt claim'))!
  const ceiling = BigInt(admissible.low)
  assert.equal(BigInt(base.ceiling.high) - ceiling, 1n, 'the admitted maximum sits exactly one below the rounded-up ceiling')

  const atCeiling = seen(windBetzCeiling({ ...args, claimedOutputMilliwatts: ceiling.toString() }))
  assert.equal(atCeiling.verdict, 'BOUNDED', 'a claim exactly at the ceiling is admitted')
  assert.equal(atCeiling.flags.claimWithinBetz, true)

  const oneAbove = seen(windBetzCeiling({ ...args, claimedOutputMilliwatts: (ceiling + 1n).toString() }))
  assert.equal(oneAbove.verdict, 'REFUSED', 'ONE milliwatt above the ceiling must refuse — the boundary is exact')
  assert.equal(oneAbove.flags.claimWithinBetz, false)
  assert.match(String(oneAbove.refusal), /Betz/)
  assert.ok(oneAbove.ceiling, 'a refusal still returns the ceiling — no output reads as unbounded')

  // a grossly over-unity claim: more than the wind itself carries
  const overUnity = seen(windBetzCeiling({ ...args, claimedOutputMilliwatts: 2000000 }))
  assert.equal(overUnity.verdict, 'REFUSED')
  // and no BOUNDED wind report may ever carry a coefficient of performance above the Betz limit in ppm
  const cp = seen(windBetzCeiling({ ...args, claimedOutputMilliwatts: 300000 }))
  assert.equal(cp.verdict, 'BOUNDED')
  assert.ok(BigInt(cp.estimate!.high) <= 592593n, `reported coefficient of performance ${cp.estimate!.high} ppm exceeds the Betz limit`)
})

test('wind: the cube law and the area law are the ones actually computed', () => {
  const a = windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 })
  const b = windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 12000 })
  const c = windBetzCeiling({ rotorDiameterMillimetres: 6000, windSpeedMillimetresPerSecond: 6000 })
  // doubling the wind speed multiplies the ceiling by 8 (allowing only for the integer rounding of each bound)
  assert.ok(BigInt(b.ceiling.low) >= BigInt(a.ceiling.low) * 8n - 8n && BigInt(b.ceiling.high) <= BigInt(a.ceiling.high) * 8n + 8n, 'the cube law in wind speed')
  // doubling the diameter multiplies it by 4
  assert.ok(BigInt(c.ceiling.low) >= BigInt(a.ceiling.low) * 4n - 4n && BigInt(c.ceiling.high) <= BigInt(a.ceiling.high) * 4n + 4n, 'the area law in diameter')
  // NEGATIVE CONTROL: it is NOT a square law in speed, so the 8x relation must not also hold at 4x
  assert.ok(BigInt(b.ceiling.low) > BigInt(a.ceiling.high) * 4n, 'a square law would have passed the previous assertion too — it does not')
})

test('wind: hostile and impossible inputs REFUSE rather than compute', () => {
  for (const bad of [
    { rotorDiameterMillimetres: 0, windSpeedMillimetresPerSecond: 6000 },
    { rotorDiameterMillimetres: -3000, windSpeedMillimetresPerSecond: 6000 },
    { rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: -1 },
    { rotorDiameterMillimetres: 1.5, windSpeedMillimetresPerSecond: 6000 },
    { rotorDiameterMillimetres: 'three metres', windSpeedMillimetresPerSecond: 6000 },
    { rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000, airDensityGramsPerCubicMetre: 0 },
    { rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000, claimedOutputMilliwatts: -5 },
    { rotorDiameterMillimetres: 10n ** 20n, windSpeedMillimetresPerSecond: 6000 },
  ]) {
    const r = seen(windBetzCeiling(bad as Record<string, unknown>))
    assert.equal(r.verdict, 'REFUSED', `should refuse: ${JSON.stringify(bad, (_k, x) => (typeof x === 'bigint' ? x.toString() : x))}`)
    assert.ok(r.refusal && r.refusal.length > 10)
    assert.ok(r.ceiling, 'even a refusal names a ceiling')
  }
})

// ── 2) BIOGAS TO ENGINE ──────────────────────────────────────────────────────────────────────────────────────────

test('biogas: the chemical energy brackets an INDEPENDENT recomputation, and rejects a wrong one', () => {
  const r = seen(biogasEngineYield({ biogasLitres: 1000, methanePercent: 60 }))
  assert.equal(r.verdict, 'BOUNDED')
  const joules = r.brackets.find((b) => b.unit === 'joules')!
  // independent path: 0.6 m3 of methane at 22.710954641 L/mol is 26.4181... mol; times 890290 J/mol
  // = 600 L / 22.710954641485575060 L/mol x 890290 J/mol, as an exact rational
  const n = 600n * 890290n * (10n ** 18n), dd = MOLAR_VOLUME_NUM / 1n  // MOLAR_VOLUME_NUM is m3/mol x 1e21 = L/mol x 1e18
  assert.ok(contains(joules, n, dd), `${joules.low}..${joules.high} must contain the independently computed ${n}/${dd}`)
  // THE SAME CHECK MUST REJECT a value 1 part in 1000 high — the quotation bracket is far narrower than that
  assert.equal(contains(joules, n * 1001n, dd * 1000n), false, 'containment accepted a value 0.1% off — the check is vacuous')
  observed.rejectedContainments++
  // hand check: about 23.52 MJ, i.e. 6.53 kWh
  assert.ok(BigInt(joules.low) >= 23500000n && BigInt(joules.high) <= 23540000n, joules.approx)
})

test('biogas: the Carnot boundary is exact — 75% passes at 1200/300 K and 76% is REFUSED', () => {
  const base = { biogasLitres: 1000, methanePercent: 60, hotKelvin: 1200, coldKelvin: 300 }
  const carnot = biogasEngineYield(base).brackets.find((b) => b.quantity.startsWith('the Carnot ceiling'))!
  assert.equal(carnot.low, '750000')   // exactly 75.0000% — (1200-300)/1200
  assert.equal(carnot.high, '750000')

  const at = seen(biogasEngineYield({ ...base, claimedThermalEfficiencyPercent: 75 }))
  assert.equal(at.verdict, 'BOUNDED', 'a claim exactly at Carnot is admitted (it is unreachable, but it is not a violation)')
  assert.equal(at.flags.claimWithinCarnot, true)

  const above = seen(biogasEngineYield({ ...base, claimedThermalEfficiencyPercent: 76 }))
  assert.equal(above.verdict, 'REFUSED', 'one percent above Carnot must refuse')
  assert.equal(above.flags.claimWithinCarnot, false)
  assert.match(String(above.refusal), /Carnot/)
  // the refusal carries the multiplication that convicts it: 76 * 1200 > 100 * 900
  assert.match(String(above.refusal), /76 \* 1200 = 91200 > 100 \* \(1200 - 300\) = 90000/)

  // A TIGHTER BOUNDARY, chosen so the comparison CONSTANT itself is pinned. At 1200/300 K the Carnot ceiling is a
  // round 75%, so a comparison loosened from 100x to 101x would still refuse 76% and the test above would not
  // notice — measured by mutating the module, and this case is what caught it. At 1000/101 K the ceiling is 89.9%,
  // and 90% sits inside the one-point window a loosened comparison would open.
  const tight = { biogasLitres: 10, methanePercent: 55, hotKelvin: 1000, coldKelvin: 101 }
  const ppm = biogasEngineYield(tight).brackets.find((b) => b.quantity.startsWith('the Carnot ceiling'))!
  assert.equal(ppm.low, '899000')      // (1000 - 101) / 1000 = 89.9000%
  assert.equal(ppm.high, '899000')
  assert.equal(seen(biogasEngineYield({ ...tight, claimedThermalEfficiencyPercent: 89 })).verdict, 'BOUNDED', '89% is below the 89.9% ceiling')
  const justOver = seen(biogasEngineYield({ ...tight, claimedThermalEfficiencyPercent: 90 }))
  assert.equal(justOver.verdict, 'REFUSED', '90% is above the 89.9% ceiling and must refuse — the comparison is 100x, not 101x')
  assert.ok(90n * 1000n > 100n * 899n && 90n * 1000n <= 101n * 899n, 'this case sits exactly in the window a loosened comparison would open')
})

test('biogas: unity, impossible fractions and impossible engines are REFUSED', () => {
  const base = { biogasLitres: 1000, methanePercent: 60, hotKelvin: 1200, coldKelvin: 300 }
  const unity = seen(biogasEngineYield({ ...base, claimedThermalEfficiencyPercent: 100 }))
  assert.equal(unity.verdict, 'REFUSED')
  assert.match(String(unity.refusal), /second law|over-unity/)

  assert.equal(seen(biogasEngineYield({ biogasLitres: 1000, methanePercent: 101 })).verdict, 'REFUSED')
  assert.equal(seen(biogasEngineYield({ biogasLitres: 1000, methanePercent: -1 })).verdict, 'REFUSED')
  assert.equal(seen(biogasEngineYield({ biogasLitres: -1, methanePercent: 60 })).verdict, 'REFUSED')
  assert.equal(seen(biogasEngineYield({ biogasLitres: 1000, methanePercent: 60, cylinders: 0 })).verdict, 'REFUSED')
  // no temperature difference is no heat engine
  const flat = seen(biogasEngineYield({ biogasLitres: 1000, methanePercent: 60, hotKelvin: 300, coldKelvin: 300 }))
  assert.equal(flat.verdict, 'REFUSED')
  assert.match(String(flat.refusal), /work from nowhere|no heat engine/)
  const inverted = seen(biogasEngineYield({ biogasLitres: 1000, methanePercent: 60, hotKelvin: 300, coldKelvin: 1200 }))
  assert.equal(inverted.verdict, 'REFUSED')
  // and 100% methane at 100% claimed efficiency — the plainest over-unity shape — never yields a BOUNDED answer
  assert.equal(seen(biogasEngineYield({ biogasLitres: 1, methanePercent: 100, hotKelvin: 2000, coldKelvin: 1, claimedThermalEfficiencyPercent: 100 })).verdict, 'REFUSED')
})

test('biogas: the four-stroke counts are the definitional ones, not an approximation', () => {
  const r = biogasEngineYield({ biogasLitres: 100, methanePercent: 60, cylinders: 4, crankRevolutionsPerMinute: 1500 })
  const impulses = r.brackets.find((b) => b.quantity.startsWith('working strokes per two crankshaft revolutions'))!
  assert.equal(impulses.low, '4')
  assert.equal(impulses.high, '4')       // exactly one working stroke per cylinder per two revolutions
  const perTwoMinutes = r.brackets.find((b) => b.quantity.startsWith('working strokes per two minutes'))!
  assert.equal(perTwoMinutes.low, '6000')  // 4 cylinders x 1500 rpm, an exact integer over two minutes
  // Rathbun's "impulses per revolution = cylinders / 2" restated without the fraction
  assert.equal(BigInt(impulses.low) * 1n, 4n)
  assert.ok(r.notes.some((n) => n.includes('cylinders / 2')))
  // a single-cylinder engine fires once per two revolutions — the halved count that motivated the doubled unit
  const single = biogasEngineYield({ biogasLitres: 100, methanePercent: 60, cylinders: 1 })
  assert.equal(single.brackets.find((b) => b.quantity.startsWith('working strokes per two crankshaft'))!.low, '1')
})

// ── 3) MICROBIAL FUEL CELL ───────────────────────────────────────────────────────────────────────────────────────

test('mfc: the two measured bands DISAGREE at short retention, and the boundary is at 3 vs 4 hours', () => {
  // power range 12..1435 mW/m3 integrated over t hours, against the reported 5..17 Wh/m3
  const short = seen(microbialFuelCellYield({ reactorLitres: 100, retentionHours: 3 }))
  assert.equal(short.verdict, 'BOUNDED')
  assert.equal(short.flags.bandsAgree, false, 'at 3 h the published power range cannot reach the published energy recovery — this check MUST come out false')
  assert.ok(short.notes.some((n) => n.includes('does NOT overlap')))

  const ok = seen(microbialFuelCellYield({ reactorLitres: 100, retentionHours: 4 }))
  assert.equal(ok.flags.bandsAgree, true, 'at 4 h they overlap — the boundary is exactly between 3 and 4')
  // 1435 x 3 = 4305 < 5000, and 1435 x 4 = 5740 >= 5000 — the arithmetic that puts the boundary there
  assert.ok(1435n * 3n < 5000n && 1435n * 4n >= 5000n)
})

test('mfc: the bands disagree again at very long retention — the upper boundary is 1416 vs 1417 hours', () => {
  assert.equal(seen(microbialFuelCellYield({ reactorLitres: 100, retentionHours: 1416 })).flags.bandsAgree, true)
  const tooLong = seen(microbialFuelCellYield({ reactorLitres: 100, retentionHours: 1417 }))
  assert.equal(tooLong.flags.bandsAgree, false, 'at 1417 h even the range floor overshoots the reported energy recovery')
  assert.ok(12n * 1416n <= 17000n && 12n * 1417n > 17000n)
})

test('mfc: an asserted power above the reported ceiling is REFUSED, at the exact integer boundary', () => {
  const base = { reactorLitres: 100, retentionHours: 20 }
  const at = seen(microbialFuelCellYield({ ...base, assertedVolumetricMilliwattsPerCubicMetre: 1435 }))
  assert.equal(at.verdict, 'BOUNDED', 'the top of the reported range is admitted')
  assert.equal(at.flags.assertionWithinCeiling, true)
  assert.equal(at.flags.assertionWithinOneSd, false, 'and it is flagged as outside the mean +/- one standard deviation')

  const above = seen(microbialFuelCellYield({ ...base, assertedVolumetricMilliwattsPerCubicMetre: 1436 }))
  assert.equal(above.verdict, 'REFUSED', 'one mW/m3 above the reported ceiling must refuse')
  assert.equal(above.flags.assertionWithinCeiling, false)
  assert.match(String(above.refusal), /pilot-scale range/)

  // the lab record is reachable only under the explicit lab scale, and always labelled
  const labRefused = seen(microbialFuelCellYield({ ...base, assertedVolumetricMilliwattsPerCubicMetre: 11220000 }))
  assert.equal(labRefused.verdict, 'REFUSED', 'the lab record is NOT a pilot-scale answer')
  const lab = seen(microbialFuelCellYield({ ...base, scale: 'lab', assertedVolumetricMilliwattsPerCubicMetre: 11220000 }))
  assert.equal(lab.verdict, 'BOUNDED')
  assert.ok(lab.notes.some((n) => n.includes('not wastewater')), 'the lab record must always carry its label')
  assert.equal(seen(microbialFuelCellYield({ ...base, scale: 'lab', assertedVolumetricMilliwattsPerCubicMetre: 11220001 })).verdict, 'REFUSED')
  assert.equal(seen(microbialFuelCellYield({ ...base, scale: 'bench' })).verdict, 'REFUSED')
})

test('mfc: nothing is claimed as exact, and the band is the finding', () => {
  const r = microbialFuelCellYield({ reactorLitres: 1000, retentionHours: 20, anodeAreaSquareMillimetres: 500000 })
  assert.equal(r.verdict, 'BOUNDED')
  assert.ok(r.exactByDefinition.some((s) => s.includes('nothing in this route is exact')))
  assert.equal(r.measured.length >= 4, true)
  // 1000 L at the mean +/- one sd: (600-452)..(600+452) mW/m3 x 1 m3 = 148000..1052000 uW
  const sd = r.brackets.find((b) => b.quantity.startsWith('volumetric power, mean'))!
  assert.equal(sd.low, '148000')
  assert.equal(sd.high, '1052000')
  // the spread is wider than the mean itself — assert it, so a future edit that quietly narrows it fails here
  assert.ok(BigInt(sd.high) - BigInt(sd.low) > 600n * 1000n, 'the reported spread must remain wider than the mean')
  assert.equal(seen(microbialFuelCellYield({ reactorLitres: 0, retentionHours: 20 })).verdict, 'REFUSED')
  assert.equal(seen(microbialFuelCellYield({ reactorLitres: 100, retentionHours: 0 })).verdict, 'REFUSED')
})

// ── 4) PHOTON AND ELECTROLYSIS ───────────────────────────────────────────────────────────────────────────────────

test('electrolysis: the reversible floor is about 1.2289 V, and 1.23 V is proved to be a ROUNDING UP', () => {
  const r = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800 }))
  assert.equal(r.verdict, 'BOUNDED')
  const rev = r.brackets.find((b) => b.quantity.includes('reversible cell voltage'))!
  // INDEPENDENT recomputation: the separately quoted Faraday constant 96485.33212 C/mol, not the exact product
  const quotedF = 9648533212n, quotedScale = 100000n   // F = 96485.33212 C/mol
  assert.ok(contains(rev, 237140n * quotedScale * 10n ** 6n, 2n * quotedF), 'the bracket must contain the value computed from the quoted Faraday constant')
  // the SAME check must reject the value the module refuses to endorse: 1.23 V
  assert.equal(contains(rev, 1230000n, 1n), false, 'the bracket must NOT contain 1.23 V')
  observed.rejectedContainments++
  // every bound rounds to 1.2289 V at four decimal places, and 1.23 V is strictly above the whole bracket
  assert.ok(BigInt(rev.low) >= 1228850n && BigInt(rev.high) < 1228950n, `${rev.low}..${rev.high} must round to 1.2289 V`)
  assert.ok(BigInt(rev.high) < 1230000n, '1.23 V is an upper bound, not the value')
  assert.equal(r.flags.oneTwoThreeIsAnUpperBound, true)
  // the witness is a multiplication with no division anywhere
  const rounding = r.brackets.find((b) => b.quantity.includes('the familiar 1.23 V'))!
  assert.ok(rounding.witness.includes(`1230000 * ${2n * FARADAY_NUM} > ${237145n * 10n ** 19n}`), `the convicting multiplication is missing: ${rounding.witness.join(' ; ')}`)
  assert.ok(verifyBracket(rounding))
  // and it is a real inequality, not a tautology: shrink the left side and the same witness form must fail
  assert.equal(1228000n * (2n * FARADAY_NUM) > 237145n * 10n ** 19n, false, '1.228 V must NOT clear the same bound — the witness is not vacuously true')
})

test('photon: a long-wavelength photon does NOT clear the floor, and the boundary is 1008 vs 1009 nm', () => {
  const clears = seen(photonElectrolysisYield({ wavelengthNanometres: 1008, appliedMillivolts: 1800 }))
  assert.equal(clears.flags.photonClearsFloor, true)
  const fails = seen(photonElectrolysisYield({ wavelengthNanometres: 1009, appliedMillivolts: 1800 }))
  assert.equal(fails.flags.photonClearsFloor, false, 'ONE nanometre longer and a single photon no longer pays the floor')
  assert.ok(fails.notes.some((n) => n.includes('BELOW')))
  // the module names the same boundary it enforces
  assert.equal(clears.brackets.find((b) => b.quantity.startsWith('the longest wavelength'))!.low, '1008')
  // an infrared photon is well short; a blue one is well over
  assert.equal(seen(photonElectrolysisYield({ wavelengthNanometres: 1200, appliedMillivolts: 1800 })).flags.photonClearsFloor, false)
  const blue = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800 }))
  assert.equal(blue.flags.photonClearsFloor, true)
  // 400 nm pays about 3.0996 V per electron — hc/e = 1239.841984 V nm
  const photon = blue.brackets.find((b) => b.quantity.startsWith('what one photon'))!
  assert.ok(contains(photon, PHOTON_NUM, 400n * 1602176634n))
  assert.ok(BigInt(photon.low) >= 3099604n && BigInt(photon.high) <= 3099606n, photon.approx)
})

test('electrolysis: a voltage below the floor is REFUSED, at the exact millivolt boundary', () => {
  const below = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1228 }))
  assert.equal(below.verdict, 'REFUSED')
  assert.match(String(below.refusal), /below the reversible floor|energy from nowhere/)

  // 1229 mV clears the floor — so if it still refuses, it must be for the OTHER, separately named reason
  const justAbove = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1229 }))
  assert.equal(justAbove.verdict, 'REFUSED')
  assert.equal(justAbove.flags.appliedAboveFloor, true, 'above the floor')
  assert.equal(justAbove.flags.appliedAboveThermoneutral, false, 'but below the thermoneutral voltage')
  assert.match(String(justAbove.refusal), /thermoneutral/)
  assert.doesNotMatch(String(justAbove.refusal), /energy from nowhere/)
})

test('electrolysis: the endothermic band is REFUSED rather than printed as an efficiency above 100%', () => {
  // below the thermoneutral voltage (about 1.4812 V) an efficiency against the higher heating value exceeds unity
  // ONLY because the cell absorbs ambient heat. Reporting it would read as free energy, so the module refuses.
  const endo = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1481 }))
  assert.equal(endo.verdict, 'REFUSED', '1481 mV is below the thermoneutral voltage')
  assert.match(String(endo.refusal), /ENDOTHERMIC|absorbs heat/)
  assert.match(String(endo.refusal), /not free energy/)

  const exo = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1482 }))
  assert.equal(exo.verdict, 'BOUNDED', 'one millivolt higher and the answer is honest without a heat term')
  assert.equal(exo.flags.appliedAboveThermoneutral, true)

  // THE INVARIANT: no BOUNDED report may ever carry an efficiency at or above unity (1e6 ppm)
  for (let mv = 1482; mv <= 2400; mv += 7) {
    const r = photonElectrolysisYield({ wavelengthNanometres: 500, appliedMillivolts: mv })
    assert.equal(r.verdict, 'BOUNDED')
    assert.ok(BigInt(r.ceiling.high) <= 1000000n, `at ${mv} mV the ceiling ${r.ceiling.high} ppm is at or above unity`)
    assert.ok(BigInt(r.estimate!.high) <= BigInt(r.ceiling.high), 'the estimate never exceeds the ceiling')
  }
  // a real electrolyser at 1.8 V: about 82.3% against the higher heating value
  const real = photonElectrolysisYield({ wavelengthNanometres: 500, appliedMillivolts: 1800 })
  const hhv = real.brackets.find((b) => b.quantity.includes('higher heating value, at unit'))!
  assert.ok(BigInt(hhv.low) >= 822800n && BigInt(hhv.high) <= 823000n, hhv.approx)
})

test('electrolysis: a faradaic efficiency above 100% is REFUSED as over-unity', () => {
  const over = seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800, claimedFaradaicEfficiencyPercent: 101 }))
  assert.equal(over.verdict, 'REFUSED')
  assert.match(String(over.refusal), /over-unity/)
  assert.equal(seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800, claimedFaradaicEfficiencyPercent: -1 })).verdict, 'REFUSED')
  // a plausible one lowers the delivered efficiency, it never raises it
  const perfect = photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800, claimedFaradaicEfficiencyPercent: 100 })
  const lossy = photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800, claimedFaradaicEfficiencyPercent: 90 })
  assert.ok(BigInt(lossy.estimate!.high) < BigInt(perfect.estimate!.low), 'a 90% faradaic efficiency must land strictly below a 100% one')
  assert.equal(seen(photonElectrolysisYield({ wavelengthNanometres: 0, appliedMillivolts: 1800 })).verdict, 'REFUSED')
  assert.equal(seen(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 0 })).verdict, 'REFUSED')
})

// ── CROSS-CUTTING: the shape of every answer ─────────────────────────────────────────────────────────────────────

const CORPUS = (): EnergyReport[] => [
  windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000, claimedOutputMilliwatts: 200000 }),
  windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000, claimedOutputMilliwatts: 9000000 }),
  biogasEngineYield({ biogasLitres: 1000, methanePercent: 60, hotKelvin: 1200, coldKelvin: 300, claimedThermalEfficiencyPercent: 30, cylinders: 4, crankRevolutionsPerMinute: 1500 }),
  biogasEngineYield({ biogasLitres: 1000, methanePercent: 60, hotKelvin: 1200, coldKelvin: 300, claimedThermalEfficiencyPercent: 90 }),
  microbialFuelCellYield({ reactorLitres: 100, retentionHours: 3 }),
  microbialFuelCellYield({ reactorLitres: 100, retentionHours: 24, anodeAreaSquareMillimetres: 200000, assertedVolumetricMilliwattsPerCubicMetre: 600 }),
  photonElectrolysisYield({ wavelengthNanometres: 450, appliedMillivolts: 1800, claimedFaradaicEfficiencyPercent: 95 }),
  photonElectrolysisYield({ wavelengthNanometres: 450, appliedMillivolts: 900 }),
  ...energyRoutes(),
]

test('every bracket in every answer verifies against its own witnesses, and carries no floating point', () => {
  let checked = 0
  for (const r of CORPUS()) {
    seen(r)
    assert.ok(r.ceiling, `${r.route}: a ceiling is always present, refusal or not`)
    for (const b of [r.ceiling, ...(r.estimate ? [r.estimate] : []), ...r.brackets]) {
      assert.match(b.low, INTEGER, `${r.route}: ${b.quantity} low is not an integer`)
      assert.match(b.high, INTEGER, `${r.route}: ${b.quantity} high is not an integer`)
      for (const w of b.witness) assert.doesNotMatch(w, /\d\.\d/, `${r.route}: a witness carries a decimal point: ${w}`)
      assert.equal(b.holds, true, `${r.route}: ${b.quantity} does not hold`)
      assert.equal(verifyBracket(b), true, `${r.route}: ${b.quantity} fails re-verification`)
      checked++
    }
    // the human-readable line is the ONLY place a decimal may appear
    assert.equal(typeof r.display, 'string')
    assert.ok(r.sources.length > 0, `${r.route} cites its sources`)
    assert.ok(r.measured.length > 0, `${r.route} declares what is measured rather than defined`)
  }
  assert.ok(checked > 40, `only ${checked} brackets were checked — the corpus stopped covering the routes`)
})

test('every answer is deterministic, total, and never over-unity in its own words', () => {
  const HOSTILE: unknown[] = [undefined, null, {}, [], 'x', 0, -1, 1.5, NaN, Infinity, 10n ** 30n, { toString() { throw new Error('hostile') } }]
  for (const h of HOSTILE) {
    for (const fn of [windBetzCeiling, biogasEngineYield, microbialFuelCellYield, photonElectrolysisYield]) {
      const args = { rotorDiameterMillimetres: h, windSpeedMillimetresPerSecond: h, biogasLitres: h, methanePercent: h, reactorLitres: h, retentionHours: h, wavelengthNanometres: h, appliedMillivolts: h, scale: h }
      const a = fn(args as never), b = fn(args as never)
      seen(a)
      assert.equal(JSON.stringify(a), JSON.stringify(b), 'same input, same bytes')
      assert.ok(a.ceiling, 'a ceiling even here')
      assert.ok(a.verdict === 'BOUNDED' || a.verdict === 'REFUSED')
    }
  }
  // no answer anywhere may use the language of free energy as a claim about itself
  for (const r of CORPUS()) {
    const text = [r.display, ...(r.refusal ? [r.refusal] : [])].join(' ')
    assert.doesNotMatch(text, /free energy is|over-unity is possible|unlimited energy|infinite energy/i)
    assert.doesNotMatch(text, /Infinity|NaN/)
  }
})

test('the MCP surface serves the same computation, and refuses an empty call by name', () => {
  for (const name of TOOLS) {
    const entry = MCP_CATALOG.find((t) => t.name === name)
    assert.ok(entry, `${name} is in the catalog`)
    const required = entry!.inputSchema?.required ?? []
    assert.ok(required.length >= 2, `${name} declares its required arguments`)
    assert.throws(() => callTool(name, {}), (e: Error) => {
      for (const k of required) assert.ok(e.message.includes(k), `${name}: the refusal names ${k}`)
      return /missing required argument/.test(e.message)
    }, `${name} must refuse an empty call`)
    assert.equal(entry!.category, 'DIY energy yield (ceiling first, integer brackets, refuses over-unity)')
    // the description must declare what is measured, and must not use the banned advantage language
    assert.doesNotMatch(entry!.description, /quantum advantage|quantum speedup|faster than classical/i)
    // an AFFIRMATIVE free-energy claim is banned; naming the thing in order to refuse it is the point of the tool,
    // so the negated forms ("is not free energy", "never free energy") are what a description is allowed to say
    assert.doesNotMatch(entry!.description, /(?<!not )(?<!never )(?<!no )free energy/i)
    assert.doesNotMatch(entry!.description, /\b(unlimited|infinite|limitless|perpetual)\s+(energy|motion)\b/i)
  }
  // dispatch equals the library call, byte for byte
  assert.equal(
    JSON.stringify(callTool('uuidna_energy_wind', { rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 })),
    JSON.stringify(windBetzCeiling({ rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 })))
  assert.equal(
    JSON.stringify(callTool('uuidna_energy_photon', { wavelengthNanometres: 400, appliedMillivolts: 1800 })),
    JSON.stringify(photonElectrolysisYield({ wavelengthNanometres: 400, appliedMillivolts: 1800 })))
  // every tool's result survives the JSON boundary — no bigint leaks into a response the server cannot serialise
  for (const [name, args] of [
    ['uuidna_energy_wind', { rotorDiameterMillimetres: 3000, windSpeedMillimetresPerSecond: 6000 }],
    ['uuidna_energy_biogas', { biogasLitres: 1000, methanePercent: 60 }],
    ['uuidna_energy_mfc', { reactorLitres: 100, retentionHours: 20 }],
    ['uuidna_energy_photon', { wavelengthNanometres: 400, appliedMillivolts: 1800 }],
  ] as const) {
    const out = callTool(name, args as Record<string, unknown>)
    assert.equal(typeof JSON.stringify(out), 'string', `${name} must be JSON-serialisable`)
  }
})

// ── (3) THE SUITE MUST HAVE REACHED THE REFUSING PATHS ───────────────────────────────────────────────────────────

test('this suite actually exercised the negative paths — it is not green by never asking', () => {
  // Counted across every test above. If a future edit makes the routes stop refusing, or makes every computed flag
  // come out true, this fails — which is the whole point: a check that cannot fail is not a check.
  assert.ok(observed.refusals >= 25, `only ${observed.refusals} REFUSED verdicts were observed — the refusing paths went unexercised`)
  assert.ok(observed.falseFlags >= 8, `only ${observed.falseFlags} computed flags came out false — every finding was affirmative, which is the defect this suite exists to catch`)
  assert.ok(observed.rejectedBrackets >= 4, `verifyBracket rejected only ${observed.rejectedBrackets} tampered brackets — a verifier that never rejects proves nothing`)
  assert.ok(observed.rejectedContainments >= 3, `only ${observed.rejectedContainments} wrong values were rejected by the containment check — containment that accepts everything is vacuous`)
})
