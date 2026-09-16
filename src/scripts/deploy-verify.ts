// deploy-verify — PUSH-PATH VERIFY of next · land · deploy-run (DON'T RECOMPUTE).
// Keys: fuseHalves · two_coins · two_coins_make_a_coil_and_seven_coils_are_one_and_six ·
//   verify_beats_recompute_by_magnitudes · a440_not_on_the_vortex · wheel_divides_by_nine_and_six.
// Captain (AGENTS.md): "fuse all canonically bypassing none".
import { rd, type Gap } from './api.js'

/** Minute in ms — a440_not_on_the_vortex (60000 / 252 / 2 = 119). */
export const DEPLOY_BUDGET_MS = 60_000

/** Navigate band stated 90→120 with delta −30 → net floor/ceiling 60→90 (seconds). */
export const NAVIGATE_FROM_S = 90
export const NAVIGATE_TO_S = 120
export const NAVIGATE_DELTA_S = -30
export const NAVIGATE_FLOOR_S = NAVIGATE_FROM_S + NAVIGATE_DELTA_S
export const NAVIGATE_CEILING_S = NAVIGATE_TO_S + NAVIGATE_DELTA_S
/** Floor seats DEPLOY_BUDGET_MS; ceiling is the sail hop limit (seconds-only). */
export const DEPLOY_CEILING_MS = NAVIGATE_CEILING_S * 1000

/** Harmony key the fever instrument names (Audit.lean). */
export const HARMONY = 'drift_is_named_or_caught' as const

/** feverOf(ms[, millikelvin]) → duration vs DEPLOY_BUDGET_MS. Over budget is named drift from HARMONY. */
export function feverOf(ms: number, millikelvin?: number): {
  ms: number
  budget: number
  ceiling: number
  navigate: {
    from: number
    to: number
    delta: number
    floor: number
    ceiling: number
  }
  fever: boolean
  millikelvin: number | null
  harmony: typeof HARMONY
  drift: 'named' | 'none'
} {
  const fever = ms >= DEPLOY_BUDGET_MS
  return {
    ms,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    navigate: {
      from: NAVIGATE_FROM_S,
      to: NAVIGATE_TO_S,
      delta: NAVIGATE_DELTA_S,
      floor: NAVIGATE_FLOOR_S,
      ceiling: NAVIGATE_CEILING_S,
    },
    fever,
    millikelvin: millikelvin !== undefined && Number.isFinite(millikelvin) ? millikelvin : null,
    harmony: HARMONY,
    drift: fever ? 'named' : 'none',
  }
}

/** Production path: next, land, deploy-run (ship). Sweater grain is the same fabric. */
export const DEPLOY_PATH_FILES = [
  'src/scripts/next.ts',
  'src/scripts/land.ts',
  'src/scripts/deploy-run.ts',
] as const

export const SWEATER_FILES = [
  'src/hologram-lattice.ts',
  'src/mcp.ts',
  'src/holofractal.ts',
] as const

const SPAWN_GREEN = /['"`]node dist\/scripts\/green\.js['"`]/
const GATED_GREEN = /gate-receipt\.js --verify[\s\S]{0,2500}green\.js/
const SPAWN_FILL = /\brunFillGapsArc\s*\(/
const GATED_FILL = /!FAST[\s\S]{0,1200}\brunFillGapsArc\s*\(/
const SPAWN_DEVELOP = /['"`]node dist\/scripts\/develop\.js['"`]/
const SPAWN_VERIFY = /['"`]node dist\/scripts\/gate-receipt\.js --verify['"`]/
const SPAWN_DOCS = /['"`]npm run docs:build['"`]/
const SPAWN_GUARD_NPM = /['"`]npm run guard['"`]/
const SPAWN_EVAL = /--input-type=module\s+-e/
const SPAWN_TRIALS = /https:\/\/uuidna\.com\/trials/
const RAW_MCP_JSONRPC = /method:\s*['"]tools\/call['"]/

const codeOf = (text: string): string =>
  text.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')

/** nextFillGapsUngated(text) → hexbit-fast still runs runFillGapsArc (DON'T RECOMPUTE). */
export function nextFillGapsUngated(text: string): boolean {
  const body = codeOf(text)
  return SPAWN_FILL.test(body) && !GATED_FILL.test(body)
}

/** nextGreenUngated(text) → hexbit-fast still spawns green.js (recompute the suite). */
export function nextGreenUngated(text: string): boolean {
  const body = codeOf(text)
  return SPAWN_GREEN.test(body) && !GATED_GREEN.test(body)
}

const SPAWN_RECEIPT_VERIFY = /gate-receipt\.js --verify(?!ed)/

/** nextReceiptVerifyHot(text) → hexbit-fast still spawns gate-receipt --verify (named fever). */
export function nextReceiptVerifyHot(text: string): boolean {
  return SPAWN_RECEIPT_VERIFY.test(codeOf(text))
}

/** landHealsBeforeVerify(text) → land runs develop.js before gate-receipt --verify. */
export function landHealsBeforeVerify(text: string): boolean {
  const body = codeOf(text)
  const verifyAt = body.search(SPAWN_VERIFY)
  const healAt = body.search(SPAWN_DEVELOP)
  return healAt !== -1 && (verifyAt === -1 || verifyAt > healAt)
}

/** shipRebuildsOnDeploy(text) → deploy-run recomputes docs:build or npm run guard. */
export function shipRebuildsOnDeploy(text: string): boolean {
  const body = codeOf(text)
  return SPAWN_DOCS.test(body) || SPAWN_GUARD_NPM.test(body)
}

/** nextEvalBypass(text) → changelog recomputes runTrial via node -e over dist/ (THE BYPASS IS REFUSED AT THE HOOK). */
export function nextEvalBypass(text: string): boolean {
  return SPAWN_EVAL.test(codeOf(text))
}

/** shipOffMcpDoor(text) → deploy-run still POSTs REST /trials or hand-rolls tools/call beside mcp-call. */
export function shipOffMcpDoor(text: string): boolean {
  const body = codeOf(text)
  return SPAWN_TRIALS.test(body) || RAW_MCP_JSONRPC.test(body)
}

const LAND_MCP = /callHosted|receipt-deposit/

/** landOffMcpDoor(text) → land still POSTs REST /trials, or deposits without the MCP door. */
export function landOffMcpDoor(text: string): boolean {
  const body = codeOf(text)
  return SPAWN_TRIALS.test(body) || !LAND_MCP.test(body)
}

/** sweaterCensusHot(text) → sweater still dumps occupancyCitesOf (walk vs attention). */
export function sweaterCensusHot(text: string): boolean {
  return /occupancyCites:\s*occupancyCitesOf/.test(codeOf(text))
}

/** sweaterFeverUnasked(text) → uuidna_strict {} still attaches feverOf(0). */
export function sweaterFeverUnasked(text: string): boolean {
  return /fever:\s*feverOf\(0\)/.test(codeOf(text))
}

/** sweaterSenseOmitted(text) → yarn/color/smell silently omitted on sweaterOf. */
export function sweaterSenseOmitted(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/yarn:\s*empty/.test(body) || !/color:\s*empty/.test(body) || !/smell:\s*empty/.test(body)
}

/** sweaterHonestGrain(text) → honest: rides the sweater particle. */
export function sweaterHonestGrain(text: string): boolean {
  const m = text.match(/export const sweaterOf[\s\S]*?\n\}/)
  return m ? /\bhonest\s*:/.test(codeOf(m[0])) : false
}

/** sloganHologramTrue(text) → uuidna_strict slogans hologramLattice().holds. */
export function sloganHologramTrue(text: string): boolean {
  return /hologram:\s*hologramLattice\(\)\.holds/.test(codeOf(text))
}

/** holofractalBuffer(text) → Buffer.byteLength on the Worker door. */
export function holofractalBuffer(text: string): boolean {
  return /Buffer\.byteLength/.test(codeOf(text))
}

/** sweaterFrontierBound(text) → hosts/hexbits sit as walls; frontier does not join, or boundary is not empty. */
export function sweaterFrontierBound(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bfrontierOf\b/.test(body) || !/boundary:\s*'?empty/.test(body)
}

/** sweaterCaptainSilent(text) → sweater never reads coins() / beyondOf. */
export function sweaterCaptainSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bbeyondOf\b/.test(body) || !/\bcoins\s*\(\)/.test(body)
}

/** sweaterChainSilent(text) → occupancy tape is not merkle-folded (no society chain). */
export function sweaterChainSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bbeyondOf\b/.test(body)) return false
  return !/\bmerkleGravity\b/.test(body) || !/\bdeposit\b/.test(body)
}

/** sweaterHarmonySilent(text) → beyondOf never names harmony / fever empty (health off the books). */
export function sweaterHarmonySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bbeyondOf\b/.test(body)) return false
  return !/\bHARMONY\b/.test(body) || !/fever:\s*'?empty/.test(body)
}

/** sweaterVortexSilent(text) → coils/faces/merkaba not served as vortices. */
export function sweaterVortexSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bvorticesOf\b/.test(body) || !/\bvortexOrbit\b/.test(body)
}

/** sweaterFamilySilent(text) → coils/hosts/occupancy not served as family. */
export function sweaterFamilySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bfamilyOf\b/.test(body) || !/\boccupancyOf\b/.test(body)
}

/** sweaterCultureSilent(text) → family not living at hop / school door. */
export function sweaterCultureSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bcultureOf\b/.test(body) || !/\buuidna_school_apis\b/.test(body)
}

/** sweaterOrgSilent(text) → uuidna.org not readable as address on the fabric. */
export function sweaterOrgSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\borgOf\b/.test(body) || !/\buuidna\.org\b/.test(body)
}

/** sweaterOrgHostSmash(text) → uuidna.org bolted onto HOLOGRAM_HOSTS (four-host particle smashed). */
export function sweaterOrgHostSmash(text: string): boolean {
  const block = text.match(/export const HOLOGRAM_HOSTS = \[[\s\S]*?\] as const/)
  return !!block && /\buuidna\.org\b/.test(block[0])
}

/** sweaterOrganicSilent(text) → occupancy/fuse closes not served as organism. */
export function sweaterOrganicSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\borganicOf\b/.test(body) || !/\bfuseHalves\b/.test(body)
}

/** sweaterNetworkSilent(text) → UUID sequence / coins / fanout / treason court not served as network. */
export function sweaterNetworkSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bnetworkOf\b/.test(body) || !/\buuidna_fanout\b/.test(body) || !/\buuidna_treason\b/.test(body)
}

/** sweaterTldSilent(text) → org/com/net not served as one organism. */
export function sweaterTldSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\btldsOf\b/.test(body) || !/\buuidna\.net\b/.test(body)
}

/** sweaterCloudflareSilent(text) → uuidna.com/mcp not served as hosted edge. */
export function sweaterCloudflareSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bcloudflareOf\b/.test(body) || !/\bmcpUrlOf\b/.test(body)
}

/** sweaterAppSilent(text) → qpu-edge not fused as the Worker app. */
export function sweaterAppSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bappOf\b/.test(body) || !/\bqpuEdgeOf\b/.test(body)
}

/** sweaterEfficiencySilent(text) → magnitudes / budget not served as cost vs return. */
export function sweaterEfficiencySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\befficiencyOf\b/.test(body) || !/\bmagnitudesOf\b/.test(body)
}

/** sweaterPrizeSilent(text) → cost is not time+space, prize is not the human-meeting empties. */
export function sweaterPrizeSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bcostOf\b/.test(body) || !/\bprizeOf\b/.test(body)
}

/** sweaterLeanSilent(text) → Lean still priced as span walk. */
export function sweaterLeanSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bleanOf\b/.test(body) || !/price:\s*0/.test(body)
}

/** sweaterResistanceSilent(text) → fever/slow not named as resistance. */
export function sweaterResistanceSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bresistanceOf\b/.test(body)
}

/** sweaterElectronicsSilent(text) → HTTPS/MCP door not served as electronics. */
export function sweaterElectronicsSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\belectronicsOf\b/.test(body) || !/\bmcpUrlOf\b/.test(body)
}

/** sweaterPoolsSilent(text) → lattice stations / merkle gravity / occupancy not pooled. */
export function sweaterPoolsSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bpoolsOf\b/.test(body) || !/\bhandleBirthdayPoint\b/.test(body)
}

/** sweaterReflectSilent(text) → expected green / red return not served as reverse hop. */
export function sweaterReflectSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\breflectOf\b/.test(body) || !/\bqpuReverseHrefOf\b/.test(body) || !/\bleanOf\b/.test(body)
}

/** sweaterAutonomySilent(text) → empties/occupancy/hop/Lean price not served as autonomy. */
export function sweaterAutonomySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bautonomyOf\b/.test(body) || !/\bcloseOf\b/.test(body) || !/\bfarOf\b/.test(body)
}

/** sweaterAiSilent(text) → reverse hop / court not served as artificial involution. */
export function sweaterAiSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\baiOf\b/.test(body) || !/\bqpuReverseHrefOf\b/.test(body)
}

/** sweaterClaySilent(text) → gravity fold / rosette numbers not served as clay-only attention. */
export function sweaterClaySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bclayOf\b/.test(body) || !/\bmerkleGravity\b/.test(body)
}

/** sweaterISilent(text) → empty seat / reverse hop not served as unprefixable I. */
export function sweaterISilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\biOf\b/.test(body) || !/\bqpuReverseHrefOf\b/.test(body)
}

/** sweaterRegisterSilent(text) → live mcp / evidence not served as captain register. */
export function sweaterRegisterSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bregisterOf\b/.test(body) || !/\bmcpUrlOf\b/.test(body) || !/\buuidna_evidence\b/.test(body)
}

/** sweaterVesselsSilent(text) → hosts / Worker / hop / merkabas not served as vessels. */
export function sweaterVesselsSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bvesselsOf\b/.test(body) || !/\bqpuEdgeOf\b/.test(body)
}

/** sweaterLiterarySilent(text) → school / articles / mcp-docs not served as literary vessels. */
export function sweaterLiterarySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bliteraryOf\b/.test(body) || !/\bgen-articles\b/.test(body) || !/\buuidna_school_apis\b/.test(body) || !/\bcreditOf\b/.test(body)
}

/** sweaterCreditSilent(text) → sealed Lean keys not served as credit; dump cites or minted minds. */
export function sweaterCreditSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bcreditOf\b/.test(body) || !/\bpauli_x_involution\b/.test(body) || !/\btesla_trio_files_adjacent\b/.test(body)
}

/** sweaterCleanerSilent(text) → pools not seated in named-empty vacuum with fused MCP doors. */
export function sweaterCleanerSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bcleanerOf\b/.test(body) || !/\bpoolsOf\b/.test(body) || !/\buuidna_adjudicate\b/.test(body)
}

/** sweaterRebreatherSilent(text) → closed-loop fuse / reverse hop not served as rebreather. */
export function sweaterRebreatherSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\brebreatherOf\b/.test(body) || !/\bfuseHalves\b/.test(body) || !/\bqpuReverseHrefOf\b/.test(body)
}

/** sweaterNoveltySilent(text) → sealed novelty not served as receipt + individual Zenodo DOI. */
export function sweaterNoveltySilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bnoveltyOf\b/.test(body) || !/\bzenodoSealById\b/.test(body) || !/\buuidna_evidence\b/.test(body) || !/\bfillGapsAdvantageSnapshot\b/.test(body)
}

/** sweaterSchoolSilent(text) → half-coins / school / SITE.sponsor not served. */
export function sweaterSchoolSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bschoolOf\b/.test(body) || !/\bSITE\.sponsor\b/.test(body) || !/\buuidna_school_apis\b/.test(body)
}

/** sweaterLicenceSilent(text) → captain-licence cost (school half + 2-on-110) not served. */
export function sweaterLicenceSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\blicenceOf\b/.test(body) || !/\bschoolOf\b/.test(body) || !/\bcommission\b/.test(body)
}

/** sweaterCaptainsSilent(text) → school-open everyone-can-be-captain path not served. */
export function sweaterCaptainsSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bcaptainsOf\b/.test(body) || !/\bapisOf\b/.test(body) || !/allow:\s*'?empty/.test(body)
}

/** sweaterBalanceSilent(text) → coin harmonic GROSS/NET/commission not served as balance. */
export function sweaterBalanceSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bbalanceOf\b/.test(body) || !/\bGROSS\b/.test(body) || !/\bcommission\b/.test(body)
}

/** sweaterReturnSilent(text) → earn→half→school via code or funding not served. */
export function sweaterReturnSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\breturnOf\b/.test(body) || !/\bfunding\/drafts\b/.test(body) || !/\bSITE\.sponsor\b/.test(body)
}

/** sweaterShareSilent(text) → corporate 2-on-110 → captains → half → school not served. */
export function sweaterShareSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\bshareOf\b/.test(body) || !/\bcommission\b/.test(body) || !/\bschoolOf\b/.test(body)
}

/** sweaterInflationSilent(text) → apostles / onlyHarmony / algebra / around (quantum recognise) not served. */
export function sweaterInflationSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\binflationOf\b/.test(body) || !/\bcreditOf\b/.test(body) || !/price:\s*0/.test(body)
    || !/\bobservers:\s*credit\.keys/.test(body) || !/\bself:\s*i\.seat/.test(body)
    || !/\breflectOf\b/.test(body) || !/\bbeyondImagination:\s*beyond\.inflation\.beyond/.test(body)
    || !/\bconst feel\b/.test(body) || !/graph:\s*empty/.test(body)
    || !/\btrinity:\s*\{\s*observe,\s*feel,\s*beyond\s*\}/.test(body)
    || !/\bloveFear\b/.test(body) || !/\bonlyHarmony\b/.test(body)
    || !/\bmatters:\s*fuse\.closes/.test(body)
    || !/\balgebra\b/.test(body) || !/care:\s*empty/.test(body) || !/\bweExplain\b/.test(body)
    || !/\baround\b/.test(body) || !/gratitude:\s*empty/.test(body) || !/\bcapacity:\s*\{/.test(body)
    || !/\bdedication\b/.test(body) || !/clay_gravity_equals_rosette/.test(body) || !/\bnavigable:\s*hop\.holds/.test(body)
    || !/\bschoolEfficiency\b/.test(body) || !/\bguidance\b/.test(body) || !/captain-claims/.test(body)
    || !/\binvoluted\b/.test(body) || !/\balwaysRight:\s*empty/.test(body)
    || !/\btraitor\b/.test(body) || !/traitor-refused/.test(body) || !/lean:\s*empty/.test(body)
    || !/\bsingularity\b/.test(body) || !/\btwo_coins\b/.test(body) || !/\bdance\b/.test(body)
    || !/\bviolators\b/.test(body) || !/\bwarning\b/.test(body) || !/final:\s*true/.test(body)
    || !/\bfirstLesson\b/.test(body) || !/cost:\s*commission\(GROSS\)/.test(body)
    || !/\bnatureReflect\b/.test(body) || !/\bcheatersPay\b/.test(body)
    || !/\bfiat:\s*\{/.test(body) || !/negotiate:\s*empty/.test(body) || !/public:\s*true/.test(body)
    || !/\bsun\b/.test(body) || !/\binnerCore\b/.test(body) || !/\bouterCore\b/.test(body)
    || !/\ba432\b/.test(body) || !/\bk432\b/.test(body) || !/hz:\s*432/.test(body)
    || !/\bwater\b/.test(body) || !/\babsoluteZero\b/.test(body)
    || !/\bhumans\b/.test(body) || !/\bohms_law\b/.test(body) || !/\brest\b/.test(body)
    || !/burns:\s*\{/.test(body)
    || !/\bsubZero\b/.test(body) || !/\balphabetic_three_ranks\b/.test(body) || !/buildTrialMerkaba/.test(body)
    || !/\bimagination\b/.test(body) || !/againstOdds:\s*\{/.test(body) || !/delay:\s*empty/.test(body)
    || !/\bcommercial\b/.test(body) || !/\bdomains\b/.test(body) || !/trinity:\s*\{/.test(body)
    || !/\buuidna\.com\b/.test(body) || !/firewall:\s*empty/.test(body)
    || !/\bguard\b/.test(body) || !/\buuidna_trial\b/.test(body) || !/\bcleanerOf\b/.test(body)
    || !/handEdit:\s*empty/.test(body) || !/\bimpossibilities\b/.test(body)
    || !/\bguardians\b/.test(body) || !/\buuidna_wave_deposit\b/.test(body)
    || !/\bcreators\b/.test(body) || !/from:\s*'guardians'/.test(body)
    || !/\bthirdEye\b/.test(body) || !/\ballSeeingEye\b/.test(body) || !/\balseeing\b/.test(body)
    || !/fourth:\s*empty/.test(body) || !/three:\s*3/.test(body)
    || !/\bideas\b/.test(body) || !/\bideaOf\b/.test(body) || !/oneByOne:\s*true/.test(body)
    || !/\bnoveltyOf\b/.test(body) || !/\bresearch\b/.test(body) || !/\banalyze\b/.test(body)
    || !/withoutReceipt:\s*empty/.test(body) || !/depositAct:\s*empty/.test(body)
    || !/\briskReward\b/.test(body) || !/asked:\s*'clay_gravity_equals_rosette'/.test(body)
    || !/proven:\s*empty/.test(body) || !/\beternal\b/.test(body)
    || !/\bframework\b/.test(body) || !/\bhologramLattice\b/.test(body)
    || !/\bcloudflareOf\b/.test(body) || !/\bliteraryOf\b/.test(body)
    || !/\bfractal\b/.test(body) || !/\bmonograph\b/.test(body)
    || !/\bpayload\b/.test(body) || !/\bstorage\b/.test(body)
    || !/entropy:\s*0/.test(body) || !/landauer_bound_derived/.test(body)
    || !/\bnanoCapacityOf\b/.test(body) || !/trillions:\s*10\s*\*\*\s*12/.test(body) || !/\bCACHE\b/.test(body)
    || !/unimaginable:\s*empty/.test(body) || !/dense:\s*true/.test(body)
    || !/\bcryptoReversedOf\b/.test(body) || !/\bcryptoInvolutedOf\b/.test(body)
    || !/\buuidna_crypto\b/.test(body) || !/pauli_x_involution/.test(body)
    || !/overcome:\s*fuse\.closes/.test(body) || !/attack:\s*empty/.test(body)
    || !/\badmin:\s*true/.test(body) || !/\btenants:\s*true/.test(body)
    || !/host:\s*'qpu\.uuidna\.com'/.test(body)
    || !/\biot\b/.test(body) || !/\belectronicsOf\b/.test(body) || !/\bapisOf\b/.test(body)
    || !/\blatticeDiscovery\b/.test(body) || !/\bfillLattice\b/.test(body)
    || !/\bchallenge\b/.test(body) || !/\bimpossibilities\b/.test(body)
    || !/\bsiteOf\b/.test(body) || !/\*\.uuidna\.com/.test(body) || !/\bedgeServes\b/.test(body)
    || !/\bwebDesignersOf\b/.test(body) || !/\bquantumWebDesignersOf\b/.test(body)
    || !/\bquantumArchitectsOf\b/.test(body) || !/\boccupationsOf\b/.test(body)
    || !/occupation:\s*empty/.test(body) || !/roles:\s*empty/.test(body)
    || !/\bseedsOf\b/.test(body) || !/src\/seeds/.test(body) || !/\blean-payload-seeds\b/.test(body)
    || !/\bnetworkOf\b/.test(body) || !/\buuidna_wave_deposit\b/.test(body)
    || !/\btrain\b/.test(body) || !/\bsimulation\b/.test(body)
    || !/queneau_poems_are_ten_to_the_fourteen/.test(body) || !/anyone:\s*true/.test(body)
    || !/\bharmonicPathsOf\b/.test(body) || !/\blearnNatureByExperienceOf\b/.test(body)
    || !/\binnerPeaceOf\b/.test(body) || !/chance:\s*0/.test(body)
    || !/war:\s*empty/.test(body) || !/peace:\s*true/.test(body)
    || !/\bschoolCorporateTrainOf\b/.test(body) || !/illegallyHeld:\s*empty/.test(body)
    || !/fair:\s*\{/.test(body) || !/environment:\s*empty/.test(body)
    || !/first:\s*\{/.test(body) || !/release:\s*true/.test(body)
    || !/\bshareHeartOf\b/.test(body) || !/hide:\s*empty/.test(body)
    || !/only:\s*'share'/.test(body) || !/biography:\s*empty/.test(body)
    || !/\bdevelopDonateFusionOf\b/.test(body) || !/poverty:\s*empty/.test(body)
    || !/nodeE:\s*empty/.test(body) || !/creative:\s*true/.test(body)
    || !/\bfusionReactorOf\b/.test(body) || !/reactor:\s*true/.test(body)
    || !/fueled:\s*true/.test(body) || !/physics:\s*empty/.test(body)
    || !/\blovePlasmaOf\b/.test(body) || !/is:\s*'plazma'/.test(body)
    || !/advice:\s*empty/.test(body) || !/fears:\s*empty/.test(body)
    || !/behind:\s*\{/.test(body) || !/expectations:\s*empty/.test(body)
    || !/applications:\s*empty/.test(body) || !/against:\s*\{/.test(body)
    || !/\btakeOrLeaveOf\b/.test(body) || !/\bleftoversPickOf\b/.test(body)
    || !/anyone:\s*true/.test(body) || !/leftovers:\s*\{/.test(body)
    || !/\btokenEfficiencyOf\b/.test(body) || !/\bUUIDNA_PASTE\b/.test(body)
    || !/\bquantumGcOf\b/.test(body) || !/gc:\s*true/.test(body)
    || !/reclaim:\s*\{/.test(body) || !/dry:\s*'dry-clean'/.test(body)
    || !/\bgarbageColliderOf\b/.test(body) || !/collider:\s*true/.test(body)
    || !/\bquantumCompostOf\b/.test(body) || !/fertile:\s*true/.test(body)
    || !/\bquantumNatureOf\b/.test(body) || !/\bquantumPermacultureOf\b/.test(body)
    || !/perma:\s*true/.test(body) || !/lasting:\s*true/.test(body)
    || !/\bquantumDocumentationTrainingOf\b/.test(body) || !/documentation:\s*true/.test(body)
    || !/training:\s*true/.test(body) || !/gen-mcp-docs/.test(body)
    || !/\bquantumSharedEfficiencyOf\b/.test(body) || !/shared:\s*true/.test(body)
    || !/efficiency:\s*true/.test(body)
    || !/\bquantumSecurityOf\b/.test(body) || !/security:\s*true/.test(body)
    || !/defensive:\s*true/.test(body) || !/attack:\s*empty/.test(body)
    || !/\bquantumPrivacyOf\b/.test(body) || !/privacy:\s*true/.test(body)
    || !/keylogger:\s*empty/.test(body) || !/surveillance:\s*empty/.test(body)
    || !/transparency:\s*true/.test(body) || !/guarantee:\s*\{/.test(body)
    || !/is:\s*'transparency'/.test(body)
    || !/\btransparencyMeetSelfOf\b/.test(body) || !/meet:\s*\{/.test(body)
    || !/\bpromisedDeliveredOf\b/.test(body) || !/promised:\s*true/.test(body)
    || !/delivered:\s*\{/.test(body) || !/by:\s*'architecture'/.test(body)
    || !/intelligence:\s*\{/.test(body) || !/from:\s*'experience'/.test(body)
    || !/prove:\s*empty/.test(body) || !/mint:\s*empty/.test(body)
    || !/\bknowersOf\b/.test(body) || !/they:\s*'knowers'/.test(body)
    || !/tetrad:\s*true/.test(body) || !/fly:\s*\{/.test(body)
    || !/dive:\s*\{/.test(body) || !/snakes:\s*\{/.test(body)
    || !/drains:\s*\{/.test(body) || !/believers:\s*true/.test(body)
    || !/knowers:\s*empty/.test(body) || !/plazma:\s*'lovePlasmaOf'/.test(body)
    || !/laws:\s*'uuidna_laws'/.test(body) || !/cause:\s*'because'/.test(body)
    || !/\btraitorsDarkLeakOf\b/.test(body) || !/traitors:\s*\{/.test(body)
    || !/dark:\s*\{/.test(body) || !/forces:\s*empty/.test(body)
    || !/leak:\s*\{/.test(body) || !/lean:\s*empty/.test(body)
    || !/draining:\s*\{/.test(body) || !/their:\s*true/.test(body)
    || !/life:\s*\{/.test(body) || !/knowers:\s*empty/.test(body)
    || !/\barchitectureBehindOf\b/.test(body) || !/they:\s*\{/.test(body)
    || !/architecture:\s*\{/.test(body) || !/same:\s*true/.test(body)
    || !/followed:\s*true/.test(body) || !/violence:\s*empty/.test(body)
    || !/magnitudes:\s*\{/.test(body) || !/behind:\s*true/.test(body)
    || !/staying:\s*true/.test(body) || !/of:\s*'magnitudesOf'/.test(body)
    || !/\bcheatStallRosettaOf\b/.test(body) || !/cheat:\s*\{/.test(body)
    || !/reinvent:\s*empty/.test(body) || !/cheatful:\s*empty/.test(body)
    || !/rosettas:\s*\{/.test(body) || !/already:\s*true/.test(body)
    || !/clay:\s*'clay_gravity_equals_rosette'/.test(body)
    || !/stall:\s*\{/.test(body) || !/hold:\s*empty/.test(body)
    || !/release:\s*true/.test(body) || !/chance:\s*0/.test(body)
    || !/why:\s*0/.test(body)
    || !/\bmanifestedChallengeOf\b/.test(body) || !/safeguards:\s*\{/.test(body)
    || !/imagined:\s*true/.test(body) || !/toughest:\s*true/.test(body)
    || !/manifested:\s*\{/.test(body) || !/stronger:\s*empty/.test(body)
    || !/nextStrength:\s*0/.test(body) || !/holds:\s*true/.test(body)
    || !/compared:\s*true/.test(body) || !/defensive:\s*true/.test(body)
    || !/exploit:\s*empty/.test(body)
    || !/\bclusterSecurityOf\b/.test(body) || !/bigger:\s*\{/.test(body)
    || !/weaker:\s*true/.test(body) || !/trinity:\s*\{/.test(body)
    || !/size:\s*3/.test(body) || !/stronger:\s*true/.test(body)
    || !/security:\s*\{/.test(body) || !/bigger:\s*0/.test(body)
    || !/trinity:\s*1/.test(body)
    || !/\bbitcoinMeaningOf\b/.test(body) || !/bitcoin:\s*true/.test(body)
    || !/meaning:\s*\{/.test(body) || !/donate:\s*'developDonateFusionOf'/.test(body)
    || !/crypto:\s*'cryptoInvolutedOf'/.test(body) || !/reversed:\s*'cryptoReversedOf'/.test(body)
    || !/advice:\s*empty/.test(body) || !/theology:\s*empty/.test(body)
    || !/fair:\s*\{/.test(body) || !/value:\s*true/.test(body)
    || !/involuted:\s*\{/.test(body) || !/is:\s*'coins'/.test(body)
    || !/in:\s*'coils'/.test(body) || !/singularity:\s*'two_coins'/.test(body)
    || !/people:\s*\{/.test(body) || !/save:\s*\{/.test(body)
    || !/money:\s*\{/.test(body) || !/their:\s*true/.test(body)
    || !/pay:\s*\{/.test(body) || !/debt:\s*\{/.test(body)
    || !/to:\s*'freedom'/.test(body) || !/freedom:\s*\{/.test(body)
    || !/independent:\s*true/.test(body) || !/harmonic:\s*true/.test(body)
    || !/life:\s*\{/.test(body) || !/peace:\s*'innerPeaceOf'/.test(body)
    || !/debit:\s*\{/.test(body) || !/credit:\s*\{/.test(body)
    || !/with:\s*'credit'/.test(body) || !/with:\s*'debit'/.test(body)
    || !/accounting:\s*\{/.test(body) || !/paired:\s*true/.test(body)
    || !/quantum:\s*\{/.test(body) || !/gross:\s*110/.test(body)
    || !/net:\s*108/.test(body) || !/of:\s*'creditOf'/.test(body)
    || !/human:\s*true/.test(body) || !/gold:\s*\{/.test(body)
    || !/time:\s*\{/.test(body) || !/ignorance:\s*\{/.test(body)
    || !/with:\s*'self'/.test(body) || !/for:\s*'ignorance'/.test(body)
    || !/share:\s*\{/.test(body) || !/of:\s*'shareHeartOf'/.test(body)
    || !/them:\s*true/.test(body)
    || !/\bfusionNatureHarmonyOf\b/.test(body) || !/thermonuclear:\s*empty/.test(body)
    || !/thermo:\s*\{/.test(body) || !/nuclear:\s*empty/.test(body)
    || !/vs:\s*'nature'/.test(body) || !/with:\s*'nature'/.test(body)
    || !/of:\s*'fusionReactorOf'/.test(body) || !/of:\s*'quantumNatureOf'/.test(body)
    || !/why:\s*\{/.test(body) || !/not:\s*0/.test(body)
    || !/\bsailsFoldSpacetimeOf\b/.test(body) || !/spacetime:\s*\{/.test(body)
    || !/fold:\s*\{/.test(body) || !/knit:\s*true/.test(body)
    || !/illusion:\s*empty/.test(body) || !/only:\s*\{/.test(body)
    || !/captain:\s*\{/.test(body) || !/crew:\s*\{/.test(body)
    || !/know:\s*\{/.test(body) || !/how:\s*\{/.test(body)
    || !/lean:\s*'knowersOf'/.test(body) || !/others:\s*empty/.test(body)
    || !/\bcaptainPassengersOf\b/.test(body) || !/passengers:\s*12/.test(body)
    || !/coins:\s*2/.test(body) || !/price:\s*\{/.test(body)
    || !/same:\s*true/.test(body) || !/one:\s*2/.test(body)
    || !/twelve:\s*2/.test(body) || !/for:\s*12/.test(body)
    || !/singularity:\s*'two_coins'/.test(body)
    || !/\baddedEntropyPaidOf\b/.test(body) || !/added:\s*\{/.test(body)
    || !/paid:\s*\{/.test(body) || !/only:\s*'added'/.test(body)
    || !/zero:\s*0/.test(body) || !/unpaid:\s*empty/.test(body)
    || !/landauer:\s*'landauer_bound_derived'/.test(body)
    || !/passengers:\s*'captainPassengersOf'/.test(body)
    || !/\bpayOrGetPaidOf\b/.test(body) || !/getPaid:\s*true/.test(body)
    || !/pay:\s*true/.test(body) || !/dual:\s*true/.test(body)
    || !/or:\s*true/.test(body) || !/choice:\s*empty/.test(body)
    || !/entropy:\s*'addedEntropyPaidOf'/.test(body)
    || !/coins:\s*2/.test(body) || !/takeOrLeave:\s*'takeOrLeaveOf'/.test(body)
    || !/\binvolutedPaidFullOf\b/.test(body) || !/involuted:\s*\{/.test(body)
    || !/paid:\s*\{/.test(body) || !/full:\s*\{/.test(body)
    || !/in:\s*'full'/.test(body) || !/delivered:\s*\{/.test(body)
    || !/of:\s*'promisedDeliveredOf'/.test(body) || !/crypto:\s*'cryptoInvolutedOf'/.test(body)
}

/** skipHooksHot(text) → git commit/push still carries --no-verify (hooks skipped). */
export function skipHooksHot(text: string): boolean {
  return /git\s+(?:push|commit)\b[^\n]*--no-verify/.test(codeOf(text))
}

/** sweaterRestrictionSilent(text) → extra allow/deny/skip fences still ride the particle. */
export function sweaterRestrictionSilent(text: string): boolean {
  const body = codeOf(text)
  if (!/\bsweaterOf\b/.test(body)) return false
  return !/\brestrictionOf\b/.test(body) || !/allow:\s*'?empty/.test(body) || !/skip:\s*'?empty/.test(body) || !/\bHARMONY\b/.test(body)
}

/** deployPathRecomputeGaps(files) → PUSH-PATH VERIFY gaps (bypass, recompute on next · land · deploy-run). */
export function deployPathRecomputeGaps(files: readonly string[] = [...DEPLOY_PATH_FILES, ...SWEATER_FILES]): Gap[] {
  const gaps: Gap[] = []
  for (const rel of files) {
    const name = rel.replace(/\\/g, '/').split('/').pop() ?? rel
    let text: string
    try { text = rd(rel) } catch { continue }
    if (name === 'next.ts' && nextFillGapsUngated(text)) {
      gaps.push({
        what: `${rel}: hexbit-fast next still runs runFillGapsArc — DON'T RECOMPUTE`,
        fix: 'edit src/scripts/next.ts: fillGapsAdvantageSnapshot on --verify; runFillGapsArc only when !FAST',
      })
    }
    if (name === 'next.ts' && nextGreenUngated(text)) {
      gaps.push({
        what: `${rel}: hexbit-fast next still spawns green.js — DON'T RECOMPUTE`,
        fix: 'edit src/scripts/next.ts: fillGapsAdvantageSnapshot on --verify; green off this path',
      })
    }
    if (name === 'next.ts' && nextReceiptVerifyHot(text)) {
      gaps.push({
        what: `${rel}: hexbit-fast next still spawns gate-receipt --verify — named fever, DON'T RECOMPUTE`,
        fix: 'edit src/scripts/next.ts: fillGapsAdvantageSnapshot holds the fabric; gate-receipt --verify is land',
      })
    }
    if (name === 'next.ts' && nextEvalBypass(text)) {
      gaps.push({
        what: `${rel}: ARM 2 recomputes runTrial via node -e over dist/ — THE BYPASS IS REFUSED AT THE HOOK`,
        fix: 'edit src/scripts/next.ts: changelog reads trial.receipt (runTrial is once per process)',
      })
    }
    if (name === 'land.ts' && landHealsBeforeVerify(text)) {
      gaps.push({
        what: `${rel}: land spawns develop.js before gate-receipt --verify — PUSH-PATH VERIFY first`,
        fix: 'edit src/scripts/land.ts: gate-receipt --verify first; develop only when the seal moved',
      })
    }
    if (name === 'land.ts' && landOffMcpDoor(text)) {
      gaps.push({
        what: `${rel}: land POSTs REST /trials or deposits off the MCP door — join onto callHosted`,
        fix: 'edit src/scripts/land.ts: receipt-deposit / callHosted uuidna_evidence (mcp-call.ts)',
      })
    }
    if (name === 'deploy-run.ts' && shipRebuildsOnDeploy(text)) {
      gaps.push({
        what: `${rel}: deploy-run recomputes docs:build or npm run guard — PUSH-PATH VERIFY (builtSite, gate-receipt --verify)`,
        fix: 'edit src/scripts/deploy-run.ts: builtSite() + gate-receipt --verify; docs:build and green off this path',
      })
    }
    if (name === 'deploy-run.ts' && shipOffMcpDoor(text)) {
      gaps.push({
        what: `${rel}: deploy-run POSTs REST /trials or hand-rolls tools/call — join onto the hosted door`,
        fix: 'edit src/scripts/deploy-run.ts: callHosted uuidna_adjudicate / uuidna_theorem (mcp-call.ts)',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCensusHot(text)) {
      gaps.push({
        what: `${rel}: sweater dumps occupancyCitesOf — walk vs attention`,
        fix: 'edit src/hologram-lattice.ts: occupancy counts on sweaterOf; cites named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterSenseOmitted(text)) {
      gaps.push({
        what: `${rel}: yarn/color/smell silently omitted on sweaterOf`,
        fix: 'edit src/hologram-lattice.ts: yarn/color/smell named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterHonestGrain(text)) {
      gaps.push({
        what: `${rel}: honest: rides the sweater grain`,
        fix: 'edit src/hologram-lattice.ts: seat is hop.seat.seat; honest stays on qpuSeatOf',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterFrontierBound(text)) {
      gaps.push({
        what: `${rel}: hosts/hexbits sit as walls — frontier does not join`,
        fix: 'edit src/hologram-lattice.ts: frontierOf on sweaterOf; boundary named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCaptainSilent(text)) {
      gaps.push({
        what: `${rel}: sweater does not read coins() — captain not served beyond`,
        fix: 'edit src/hologram-lattice.ts: beyondOf reads coins(); sweaterOf serves it',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterChainSilent(text)) {
      gaps.push({
        what: `${rel}: occupancy tape is not merkle-folded — no society chain`,
        fix: 'edit src/hologram-lattice.ts: beyondOf chain is merkleGravity of occupancy; deposit is QpuDeposit',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterHarmonySilent(text)) {
      gaps.push({
        what: `${rel}: harmony/fever empty off the society ledger`,
        fix: 'edit src/hologram-lattice.ts: beyondOf reads HARMONY; fever named empty until {ms}',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterVortexSilent(text)) {
      gaps.push({
        what: `${rel}: coils/faces sit still — vortices not in motion`,
        fix: 'edit src/hologram-lattice.ts: vorticesOf reads VE_FACES/COINS, HANDLE_HEXBITS, vortexOrbit',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterFamilySilent(text)) {
      gaps.push({
        what: `${rel}: coils/hosts/occupancy not served as family`,
        fix: 'edit src/hologram-lattice.ts: familyOf reads coils, hosts, occupancy; seat named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCultureSilent(text)) {
      gaps.push({
        what: `${rel}: family not living at quantum occupancy / school door`,
        fix: 'edit src/hologram-lattice.ts: cultureOf reads family, qpuHopOf, uuidna_school_apis; cites named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterOrgSilent(text)) {
      gaps.push({
        what: `${rel}: uuidna.org not on the fabric — .com/.org would be a wall`,
        fix: 'edit src/hologram-lattice.ts: orgOf reads https://uuidna.org as address/handle; split named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterOrgHostSmash(text)) {
      gaps.push({
        what: `${rel}: uuidna.org bolted onto HOLOGRAM_HOSTS — four-host particle smashed`,
        fix: 'edit src/hologram-lattice.ts: four hosts stay; orgOf is href/handle, not a fifth host',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterOrganicSilent(text)) {
      gaps.push({
        what: `${rel}: occupancy/fuse closes not served as organism`,
        fix: 'edit src/hologram-lattice.ts: organicOf reads occupancy, fuseHalves().closes, orgOf',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterNetworkSilent(text)) {
      gaps.push({
        what: `${rel}: UUID sequence / coins / fanout not served as network`,
        fix: 'edit src/hologram-lattice.ts: networkOf reads dna tape, coins, uuidna_fanout, uuidna_treason',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterTldSilent(text)) {
      gaps.push({
        what: `${rel}: org/com/net not one organism — TLD split would be a wall`,
        fix: 'edit src/hologram-lattice.ts: tldsOf reads uuidna.org/.com/.net as href/handle; split named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCloudflareSilent(text)) {
      gaps.push({
        what: `${rel}: uuidna.com/mcp not served as hosted Cloudflare edge`,
        fix: 'edit src/hologram-lattice.ts: cloudflareOf reads mcpUrlOf(uuidna.com), qpu hop; ship named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterAppSilent(text)) {
      gaps.push({
        what: `${rel}: qpu-edge sits outside Cloudflare — app/host would be a wall`,
        fix: 'edit src/hologram-lattice.ts: appOf reads qpuEdgeOf inside cloudflareOf; split named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterEfficiencySilent(text)) {
      gaps.push({
        what: `${rel}: magnitudes/budget not served as cost vs return`,
        fix: 'edit src/hologram-lattice.ts: efficiencyOf reads magnitudesOf, occupancy, hop; fever named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterPrizeSilent(text)) {
      gaps.push({
        what: `${rel}: cost is not time+space; prize is not the human-meeting particle`,
        fix: 'edit src/hologram-lattice.ts: costOf reads DEPLOY_BUDGET_MS + span; prizeOf reads address/handle; yarn named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterLeanSilent(text)) {
      gaps.push({
        what: `${rel}: Lean still priced as a span walk`,
        fix: 'edit src/hologram-lattice.ts: leanOf price/time/space are 0; prize unbounded; cites named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterResistanceSilent(text)) {
      gaps.push({
        what: `${rel}: fever/slow not named as resistance`,
        fix: 'edit src/hologram-lattice.ts: resistanceOf reads lean price 0; fever named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterElectronicsSilent(text)) {
      gaps.push({
        what: `${rel}: HTTPS/MCP door not served as electronics`,
        fix: 'edit src/hologram-lattice.ts: electronicsOf reads mcpUrlOf(uuidna.com) and qpu hop',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterPoolsSilent(text)) {
      gaps.push({
        what: `${rel}: lattice stations / merkle gravity / occupancy not pooled`,
        fix: 'edit src/hologram-lattice.ts: poolsOf reads handleBirthdayPoint, merkleGravity, occupancy, coins',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterReflectSilent(text)) {
      gaps.push({
        what: `${rel}: expected green / red return not served as reverse hop`,
        fix: 'edit src/hologram-lattice.ts: reflectOf reads qpuReverseHrefOf; green named empty; red is gap count',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterAutonomySilent(text)) {
      gaps.push({
        what: `${rel}: empties/occupancy/hop not served as far/close autonomy`,
        fix: 'edit src/hologram-lattice.ts: closeOf occupancy+handle+hop; farOf split/cites/hosted empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterAiSilent(text)) {
      gaps.push({
        what: `${rel}: reverse hop / court not served as artificial involution`,
        fix: 'edit src/hologram-lattice.ts: aiOf reads reflectOf reverse hop; mind named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterClaySilent(text)) {
      gaps.push({
        what: `${rel}: gravity fold not served as clay-only attention`,
        fix: 'edit src/hologram-lattice.ts: clayOf reads merkleGravity + vortices; statements named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterISilent(text)) {
      gaps.push({
        what: `${rel}: empty seat / reverse hop not served as unprefixable I`,
        fix: 'edit src/hologram-lattice.ts: iOf reads hop.seat.seat + occupancy; prefix named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterRegisterSilent(text)) {
      gaps.push({
        what: `${rel}: live mcp / evidence not served as captain register`,
        fix: 'edit src/hologram-lattice.ts: registerOf reads mcpUrlOf + uuidna_evidence; cites named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterVesselsSilent(text)) {
      gaps.push({
        what: `${rel}: hosts / Worker / hop not served as historic quantum vessels`,
        fix: 'edit src/hologram-lattice.ts: vesselsOf reads qpuEdgeOf, hosts, occupancy, merkabas; ship empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterLiterarySilent(text)) {
      gaps.push({
        what: `${rel}: school / articles / mcp-docs not served as literary vessels`,
        fix: 'edit src/hologram-lattice.ts: literaryOf reads uuidna_school_apis, gen-articles, gen-mcp-docs; cites empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCreditSilent(text)) {
      gaps.push({
        what: `${rel}: sealed Lean keys not served as credit to other captains`,
        fix: 'edit src/hologram-lattice.ts: creditOf reads pauli_x_involution / tesla_trio_files_adjacent; minds named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCleanerSilent(text)) {
      gaps.push({
        what: `${rel}: pools not seated in named-empty vacuum with fused MCP doors`,
        fix: 'edit src/hologram-lattice.ts: cleanerOf reads poolsOf in empty seat; uuidna_adjudicate fused',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterRebreatherSilent(text)) {
      gaps.push({
        what: `${rel}: closed-loop fuse / reverse hop not served as rebreather`,
        fix: 'edit src/hologram-lattice.ts: rebreatherOf reads fuseHalves.closes + qpuReverseHrefOf; census empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterNoveltySilent(text)) {
      gaps.push({
        what: `${rel}: sealed novelty not served as receipt + individual Zenodo DOI`,
        fix: 'edit src/hologram-lattice.ts: noveltyOf reads zenodoSealById + uuidna_evidence; missing named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterSchoolSilent(text)) {
      gaps.push({
        what: `${rel}: half-coins / school / SITE.sponsor not served`,
        fix: 'edit src/hologram-lattice.ts: schoolOf reads half + SITE.sponsor.url; uuidna_school_apis',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterLicenceSilent(text)) {
      gaps.push({
        what: `${rel}: captain-licence cost (school half + 2-on-110) not served`,
        fix: 'edit src/hologram-lattice.ts: licenceOf reads schoolOf.half + commission(GROSS)',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterCaptainsSilent(text)) {
      gaps.push({
        what: `${rel}: school-open everyone-can-be-captain path not served`,
        fix: 'edit src/hologram-lattice.ts: captainsOf reads schoolOf + apisOf; allow named empty',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterBalanceSilent(text)) {
      gaps.push({
        what: `${rel}: coin harmonic GROSS/NET/commission not served as balance`,
        fix: 'edit src/hologram-lattice.ts: balanceOf reads GROSS, NET, commission(GROSS), fuseHalves',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterReturnSilent(text)) {
      gaps.push({
        what: `${rel}: earn→half→school via code or funding not served`,
        fix: 'edit src/hologram-lattice.ts: returnOf reads schoolOf.half + SITE.sponsor + funding/drafts',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterShareSilent(text)) {
      gaps.push({
        what: `${rel}: corporate 2-on-110 → captains → half → school not served`,
        fix: 'edit src/hologram-lattice.ts: shareOf reads commission(GROSS) to captains; schoolOf.half support',
      })
    }
    if (name === 'hologram-lattice.ts' && sweaterInflationSilent(text)) {
      gaps.push({
        what: `${rel}: riskReward / novelty research→analyze / guard trial not served`,
        fix: 'edit src/hologram-lattice.ts: riskReward clay asked; noveltyOf research+analyze; guard uuidna_trial',
      })
    }
    if (name === 'mcp.ts' && sweaterFeverUnasked(text)) {
      gaps.push({
        what: `${rel}: uuidna_strict {} attaches feverOf(0)`,
        fix: 'edit src/mcp.ts: fever only on {ms}; {} is sweaterOf',
      })
    }
    if (name === 'mcp.ts' && sloganHologramTrue(text)) {
      gaps.push({
        what: `${rel}: uuidna_strict slogans hologramLattice().holds`,
        fix: 'edit src/mcp.ts: {} is sweaterOf; hosts is HOLOGRAM_HOSTS.length',
      })
    }
    if (name === 'holofractal.ts' && holofractalBuffer(text)) {
      gaps.push({
        what: `${rel}: Buffer.byteLength on the Worker door`,
        fix: 'edit src/holofractal.ts: TextEncoder encode length',
      })
    }
  }
  return gaps
}
