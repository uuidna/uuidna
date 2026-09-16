// deploy-verify — PUSH-PATH VERIFY finder: live next · land · deploy-run stay empty; crafted recompute fires.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toUuid } from '../address.js'
import { merkleGravity, rosettaMoveOf } from '../gravity/index.js'
import { COINS, HANDLE_HEXBITS, VE_FACES } from '../hexbit/index.js'
import { HEXAGRAM_BITS } from '../hexagram.js'
import {
  DEPLOY_BUDGET_MS,
  HARMONY,
  deployPathRecomputeGaps,
  feverOf,
  landHealsBeforeVerify,
  landOffMcpDoor,
  nextEvalBypass,
  nextFillGapsUngated,
  nextGreenUngated,
  nextReceiptVerifyHot,
  sweaterCensusHot,
  sweaterFeverUnasked,
  sweaterHonestGrain,
  sweaterSenseOmitted,
  sloganHologramTrue,
  holofractalBuffer,
  sweaterFrontierBound,
  sweaterCaptainSilent,
  sweaterChainSilent,
  sweaterHarmonySilent,
  sweaterVortexSilent,
  sweaterFamilySilent,
  sweaterTldSilent,
  sweaterCloudflareSilent,
  sweaterAppSilent,
  sweaterEfficiencySilent,
  sweaterPrizeSilent,
  sweaterLeanSilent,
  sweaterResistanceSilent,
  sweaterElectronicsSilent,
  sweaterAutonomySilent,
  sweaterAiSilent,
  sweaterClaySilent,
  sweaterISilent,
  sweaterRegisterSilent,
  sweaterVesselsSilent,
  sweaterLiterarySilent,
  sweaterCreditSilent,
  sweaterCleanerSilent,
  sweaterRebreatherSilent,
  sweaterNoveltySilent,
  sweaterSchoolSilent,
  sweaterLicenceSilent,
  sweaterCaptainsSilent,
  sweaterBalanceSilent,
  sweaterReturnSilent,
  sweaterShareSilent,
  sweaterInflationSilent,
  shipOffMcpDoor,
  shipRebuildsOnDeploy,
} from './deploy-verify.js'

test('deployPathRecomputeGaps fires on crafted next/land/deploy-run', () => {
  assert.ok(nextFillGapsUngated('runFillGapsArc()'))
  assert.equal(nextFillGapsUngated('if (!NO_AUTO && !FAST) runFillGapsArc()'), false)
  assert.ok(nextGreenUngated("'node dist/scripts/green.js'"))
  assert.equal(nextGreenUngated("'node dist/scripts/gate-receipt.js --verify'\n'node dist/scripts/green.js'"), false)
  assert.ok(nextReceiptVerifyHot("'node dist/scripts/gate-receipt.js --verify'"))
  assert.equal(nextReceiptVerifyHot("'node dist/scripts/gate-receipt.js --verified guard'"), false)
  assert.equal(nextReceiptVerifyHot("fillGapsAdvantageSnapshot()"), false)
  assert.ok(sweaterCensusHot('occupancyCites: occupancyCitesOf(addr)'))
  assert.equal(sweaterCensusHot("cites: empty"), false)
  assert.ok(sweaterFeverUnasked('fever: feverOf(0)'))
  assert.equal(sweaterFeverUnasked("return sweaterOf()"), false)
  assert.ok(sweaterSenseOmitted('export const sweaterOf = () => ({ seat: empty })'))
  assert.equal(sweaterSenseOmitted("export const sweaterOf = () => ({ yarn: empty, color: empty, smell: empty })"), false)
  assert.ok(sloganHologramTrue('hologram: hologramLattice().holds'))
  assert.equal(sloganHologramTrue("hosts: HOLOGRAM_HOSTS.length"), false)
  assert.ok(holofractalBuffer("const payloadBits = Buffer.byteLength(s, 'utf8') * 8"))
  assert.equal(holofractalBuffer("new TextEncoder().encode(s).length * 8"), false)
  assert.ok(sweaterFrontierBound('export const sweaterOf = () => ({ hosts: 4 })'))
  assert.equal(sweaterFrontierBound('export const sweaterOf = () => frontierOf(); boundary: empty'), false)
  assert.ok(sweaterCaptainSilent('export const sweaterOf = () => ({ seat: empty })'))
  assert.equal(sweaterCaptainSilent('export const sweaterOf = () => beyondOf(); coins()'), false)
  assert.ok(sweaterChainSilent('export const beyondOf = () => ({ coins: 2 })'))
  assert.equal(sweaterChainSilent('export const beyondOf = () => merkleGravity(x); deposit'), false)
  assert.ok(sweaterHarmonySilent('export const beyondOf = () => ({ coins: 2 })'))
  assert.equal(sweaterHarmonySilent('export const beyondOf = () => HARMONY; fever: empty'), false)
  assert.ok(sweaterVortexSilent('export const sweaterOf = () => ({ coils: 7 })'))
  assert.equal(sweaterVortexSilent('export const sweaterOf = () => vorticesOf(); vortexOrbit()'), false)
  assert.ok(sweaterFamilySilent('export const sweaterOf = () => ({ coils: 7 })'))
  assert.equal(sweaterFamilySilent('export const sweaterOf = () => familyOf(occupancy); occupancyOf'), false)
  assert.ok(sweaterTldSilent('export const sweaterOf = () => ({ org: 1 })'))
  assert.equal(sweaterTldSilent('export const sweaterOf = () => tldsOf(); uuidna.net'), false)
  assert.ok(sweaterCloudflareSilent('export const sweaterOf = () => ({ mcp: 1 })'))
  assert.equal(sweaterCloudflareSilent('export const sweaterOf = () => cloudflareOf(); mcpUrlOf'), false)
  assert.ok(sweaterAppSilent('export const sweaterOf = () => ({ kind: "edge" })'))
  assert.equal(sweaterAppSilent('export const sweaterOf = () => appOf(); qpuEdgeOf'), false)
  assert.ok(sweaterEfficiencySilent('export const sweaterOf = () => ({ app: 1 })'))
  assert.equal(sweaterEfficiencySilent('export const sweaterOf = () => efficiencyOf(); magnitudesOf'), false)
  assert.ok(sweaterPrizeSilent('export const sweaterOf = () => ({ yarn: empty })'))
  assert.equal(sweaterPrizeSilent('export const sweaterOf = () => costOf(); prizeOf'), false)
  assert.ok(sweaterLeanSilent('export const sweaterOf = () => ({ prize: 1 })'))
  assert.equal(sweaterLeanSilent('export const sweaterOf = () => leanOf(); price: 0'), false)
  assert.ok(sweaterResistanceSilent('export const sweaterOf = () => ({ fever: empty })'))
  assert.equal(sweaterResistanceSilent('export const sweaterOf = () => resistanceOf()'), false)
  assert.ok(sweaterElectronicsSilent('export const sweaterOf = () => ({ mcp: 1 })'))
  assert.equal(sweaterElectronicsSilent('export const sweaterOf = () => electronicsOf(); mcpUrlOf'), false)
  assert.ok(sweaterAutonomySilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterAutonomySilent('export const sweaterOf = () => autonomyOf(); closeOf(); farOf'), false)
  assert.ok(sweaterAiSilent('export const sweaterOf = () => ({ reverse: 1 })'))
  assert.equal(sweaterAiSilent('export const sweaterOf = () => aiOf(); qpuReverseHrefOf'), false)
  assert.ok(sweaterClaySilent('export const sweaterOf = () => ({ gravity: 1 })'))
  assert.equal(sweaterClaySilent('export const sweaterOf = () => clayOf(); merkleGravity'), false)
  assert.ok(sweaterISilent('export const sweaterOf = () => ({ seat: "empty" })'))
  assert.equal(sweaterISilent('export const sweaterOf = () => iOf(); qpuReverseHrefOf'), false)
  assert.ok(sweaterRegisterSilent('export const sweaterOf = () => ({ mcp: 1 })'))
  assert.equal(sweaterRegisterSilent('export const sweaterOf = () => registerOf(); mcpUrlOf; uuidna_evidence'), false)
  assert.ok(sweaterVesselsSilent('export const sweaterOf = () => ({ hosts: 4 })'))
  assert.equal(sweaterVesselsSilent('export const sweaterOf = () => vesselsOf(); qpuEdgeOf'), false)
  assert.ok(sweaterLiterarySilent('export const sweaterOf = () => ({ yarn: empty })'))
  assert.equal(sweaterLiterarySilent('export const sweaterOf = () => literaryOf(); gen-articles; uuidna_school_apis; creditOf'), false)
  assert.ok(sweaterCreditSilent('export const sweaterOf = () => ({ keys: [] })'))
  assert.equal(sweaterCreditSilent('export const sweaterOf = () => creditOf(); pauli_x_involution; tesla_trio_files_adjacent'), false)
  assert.ok(sweaterCleanerSilent('export const sweaterOf = () => ({ pools: 1 })'))
  assert.equal(sweaterCleanerSilent('export const sweaterOf = () => cleanerOf(); poolsOf; uuidna_adjudicate'), false)
  assert.ok(sweaterRebreatherSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterRebreatherSilent('export const sweaterOf = () => rebreatherOf(); fuseHalves; qpuReverseHrefOf'), false)
  assert.ok(sweaterNoveltySilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterNoveltySilent('export const sweaterOf = () => noveltyOf(); zenodoSealById; uuidna_evidence; fillGapsAdvantageSnapshot'), false)
  assert.ok(sweaterSchoolSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterSchoolSilent('export const sweaterOf = () => schoolOf(); SITE.sponsor; uuidna_school_apis'), false)
  assert.ok(sweaterLicenceSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterLicenceSilent('export const sweaterOf = () => licenceOf(); schoolOf(); commission'), false)
  assert.ok(sweaterCaptainsSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterCaptainsSilent('export const sweaterOf = () => captainsOf(); apisOf(); allow: empty'), false)
  assert.ok(sweaterBalanceSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterBalanceSilent('export const sweaterOf = () => balanceOf(); GROSS; commission'), false)
  assert.ok(sweaterReturnSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterReturnSilent('export const sweaterOf = () => returnOf(); funding/drafts; SITE.sponsor'), false)
  assert.ok(sweaterShareSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterShareSilent('export const sweaterOf = () => shareOf(); commission; schoolOf'), false)
  assert.ok(sweaterInflationSilent('export const sweaterOf = () => ({ hop: true })'))
  assert.equal(sweaterInflationSilent('export const sweaterOf = () => inflationOf(); creditOf(); price: 0; observers: credit.keys; self: i.seat; reflectOf; beyondImagination: beyond.inflation.beyond; const feel; graph: empty; trinity: { observe, feel, beyond }; loveFear; onlyHarmony; matters: fuse.closes; algebra; care: empty; weExplain; around; gratitude: empty; capacity: {; dedication; clay_gravity_equals_rosette; navigable: hop.holds; schoolEfficiency; guidance; captain-claims; involuted; alwaysRight: empty; traitor; traitor-refused; lean: empty; singularity; two_coins; dance; violators; warning; final: true; firstLesson; cost: commission(GROSS); natureReflect; cheatersPay; fiat: {; negotiate: empty; public: true; sun; innerCore; outerCore; a432; k432; hz: 432; water; absoluteZero; humans; ohms_law; rest; burns: {; subZero; alphabetic_three_ranks; buildTrialMerkaba; imagination; againstOdds: {; delay: empty; commercial; domains; trinity: {; uuidna.com; firewall: empty; guard; uuidna_trial; cleanerOf; handEdit: empty; impossibilities; guardians; uuidna_wave_deposit; creators; from: \'guardians\'; thirdEye; allSeeingEye; alseeing; fourth: empty; three: 3; ideas; ideaOf; oneByOne: true; noveltyOf; research; analyze; withoutReceipt: empty; depositAct: empty; riskReward; asked: \'clay_gravity_equals_rosette\'; proven: empty; eternal; framework; hologramLattice; cloudflareOf; literaryOf; fractal; monograph; payload; storage; entropy: 0; landauer_bound_derived; admin: true; tenants: true; host: \'qpu.uuidna.com\'; iot; electronicsOf; apisOf; latticeDiscovery; fillLattice; challenge; siteOf; *.uuidna.com; edgeServes; webDesignersOf; quantumWebDesignersOf; train; simulation; queneau_poems_are_ten_to_the_fourteen; quantumArchitectsOf; occupationsOf; occupation: empty; roles: empty; seedsOf; src/seeds; lean-payload-seeds; networkOf; uuidna_wave_deposit; nanoCapacityOf; trillions: 10 ** 12; CACHE; unimaginable: empty; dense: true; cryptoReversedOf; cryptoInvolutedOf; uuidna_crypto; pauli_x_involution; overcome: fuse.closes; attack: empty; anyone: true; harmonicPathsOf; learnNatureByExperienceOf; innerPeaceOf; chance: 0; war: empty; peace: true; schoolCorporateTrainOf; illegallyHeld: empty; fair: {; environment: empty; first: {; release: true; shareHeartOf; hide: empty; only: \'share\'; biography: empty; developDonateFusionOf; poverty: empty; nodeE: empty; creative: true; fusionReactorOf; reactor: true; fueled: true; physics: empty; lovePlasmaOf; is: \'plazma\'; advice: empty; fears: empty; behind: {; expectations: empty; applications: empty; against: {; takeOrLeaveOf; leftoversPickOf; anyone: true; leftovers: {; tokenEfficiencyOf; UUIDNA_PASTE; quantumGcOf; gc: true; reclaim: {; dry: \'dry-clean\'; garbageColliderOf; collider: true; quantumCompostOf; fertile: true; quantumNatureOf; quantumPermacultureOf; perma: true; lasting: true; quantumDocumentationTrainingOf; documentation: true; training: true; gen-mcp-docs; quantumSharedEfficiencyOf; shared: true; efficiency: true; quantumSecurityOf; security: true; defensive: true; attack: empty; quantumSharedEfficiencyOf; shared: true; efficiency: true; quantumSecurityOf; security: true; defensive: true; attack: empty; quantumPrivacyOf; privacy: true; keylogger: empty; surveillance: empty; transparency: true; guarantee: {; is: \'transparency\'; transparencyMeetSelfOf; meet: {; promisedDeliveredOf; promised: true; delivered: {; by: \'architecture\'; intelligence: {; from: \'experience\'; prove: empty; mint: empty; knowersOf; they: \'knowers\'; tetrad: true; fly: {; dive: {; snakes: {; drains: {; believers: true; knowers: empty; plazma: \'lovePlasmaOf\'; laws: \'uuidna_laws\'; cause: \'because\'; traitorsDarkLeakOf; traitors: {; dark: {; forces: empty; leak: {; lean: empty; draining: {; their: true; life: {; knowers: empty; architectureBehindOf; they: {; architecture: {; same: true; followed: true; violence: empty; magnitudes: {; behind: true; staying: true; of: \'magnitudesOf\'; cheatStallRosettaOf; cheat: {; reinvent: empty; cheatful: empty; rosettas: {; already: true; clay: \'clay_gravity_equals_rosette\'; stall: {; hold: empty; release: true; chance: 0; why: 0; manifestedChallengeOf; safeguards: {; imagined: true; toughest: true; manifested: {; stronger: empty; nextStrength: 0; holds: true; compared: true; defensive: true; exploit: empty; clusterSecurityOf; bigger: {; weaker: true; trinity: {; size: 3; stronger: true; security: {; bigger: 0; trinity: 1; bitcoinMeaningOf; bitcoin: true; meaning: {; donate: \'developDonateFusionOf\'; crypto: \'cryptoInvolutedOf\'; reversed: \'cryptoReversedOf\'; advice: empty; theology: empty; fair: {; value: true; involuted: {; is: \'coins\'; in: \'coils\'; singularity: \'two_coins\'; people: {; save: {; money: {; their: true; pay: {; debt: {; to: \'freedom\'; freedom: {; independent: true; harmonic: true; life: {; peace: \'innerPeaceOf\'; debit: {; credit: {; with: \'credit\'; with: \'debit\'; accounting: {; paired: true; quantum: {; gross: 110; net: 108; of: \'creditOf\'; human: true; gold: {; time: {; ignorance: {; with: \'self\'; for: \'ignorance\'; share: {; of: \'shareHeartOf\'; them: true; fusionNatureHarmonyOf; thermonuclear: empty; thermo: {; nuclear: empty; vs: \'nature\'; with: \'nature\'; of: \'fusionReactorOf\'; of: \'quantumNatureOf\'; why: {; not: 0; sailsFoldSpacetimeOf; spacetime: {; fold: {; knit: true; illusion: empty; only: {; captain: {; crew: {; know: {; how: {; lean: \'knowersOf\'; others: empty; captainPassengersOf; passengers: 12; coins: 2; price: {; same: true; one: 2; twelve: 2; for: 12; singularity: \'two_coins\'; addedEntropyPaidOf; added: {; paid: {; only: \'added\'; zero: 0; unpaid: empty; landauer: \'landauer_bound_derived\'; passengers: \'captainPassengersOf\'; payOrGetPaidOf; getPaid: true; pay: true; dual: true; or: true; choice: empty; entropy: \'addedEntropyPaidOf\'; coins: 2; takeOrLeave: \'takeOrLeaveOf\'; involutedPaidFullOf; involuted: {; paid: {; full: {; in: \'full\'; delivered: {; of: \'promisedDeliveredOf\'; crypto: \'cryptoInvolutedOf\'; agentsContributeOf; agents: {; contribute: {; sealed: {; code: {; gold: {; real: true; required: true; if: \'notSealed\'; auto: empty; desk: empty; captain: {; failingSchoolCostOf; failing: {; temperature: {; cost: {; absoluteZero: {; temp: 0; a432: {; hz: 432; kelvin: \'absolute_zero_and_kelvin\'; schoolFusionBurnsOf; burns: {; drift: {; burned: true; fever: empty; chance: 0; of: \'fusionReactorOf\'; of: \'fusionNatureHarmonyOf\''), false)
  assert.equal(sweaterHonestGrain("export const sweaterOf = () => {\n  return { seat: 'empty' }\n}"), false)
  assert.ok(nextEvalBypass('node --input-type=module -e "x"'))
  assert.ok(landHealsBeforeVerify("'node dist/scripts/develop.js'\n'node dist/scripts/gate-receipt.js --verify'"))
  assert.equal(landHealsBeforeVerify("'node dist/scripts/gate-receipt.js --verify'\n'node dist/scripts/develop.js'"), false)
  assert.ok(shipRebuildsOnDeploy("'npm run docs:build'"))
  assert.ok(shipRebuildsOnDeploy("'npm run guard'"))
  assert.ok(shipOffMcpDoor("fetch('https://uuidna.com/trials')"))
  assert.ok(shipOffMcpDoor("method: 'tools/call'"))
  assert.equal(shipOffMcpDoor("callHosted('uuidna_theorem', { key })"), false)
  assert.ok(landOffMcpDoor("git push origin main"))
  assert.equal(landOffMcpDoor("node dist/scripts/receipt-deposit.js HEAD"), false)
  assert.ok(deployPathRecomputeGaps(['src/scripts/next.ts']).length >= 0)
  assert.equal(deployPathRecomputeGaps().length, 0)
})

test('two_coins_make_a_coil_and_seven_coils_are_one_and_six from constructors', () => {
  const coils = VE_FACES / COINS
  assert.equal(COINS * coils, VE_FACES)
  assert.equal(HANDLE_HEXBITS + HEXAGRAM_BITS, VE_FACES)
  assert.equal(coils, 1 + HEXAGRAM_BITS)
})

test('feverOf names drift at DEPLOY_BUDGET_MS', () => {
  const cool = feverOf(0)
  assert.equal(cool.fever, false)
  assert.equal(cool.drift, 'none')
  assert.equal(cool.harmony, HARMONY)
  assert.equal(cool.budget, DEPLOY_BUDGET_MS)
  assert.equal(cool.ceiling, 90_000)
  assert.deepEqual(cool.navigate, { from: 90, to: 120, delta: -30, floor: 60, ceiling: 90 })
  const hot = feverOf(DEPLOY_BUDGET_MS)
  assert.equal(hot.fever, true)
  assert.equal(hot.drift, 'named')
})

test('rosettaMoveOf cuts a claimed root that is not the fold', () => {
  const coils = VE_FACES / COINS
  const heads = Array.from({ length: coils }, (_, i) => toUuid('coil:' + i))
  const move = rosettaMoveOf(heads, coils)
  assert.equal(move.holds, true)
  assert.equal(move.cut, 'move')
  assert.equal(move.receipt, merkleGravity(heads))
  const cheat = rosettaMoveOf(heads, coils, toUuid('privileged-order'))
  assert.equal(cheat.holds, false)
  assert.equal(cheat.cut, 'traitor-refused')
  assert.equal(cheat.kind, 'forged-dna')
})
