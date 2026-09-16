// hologram-lattice — THE FRACTAL HOLOGRAM: uuidna's MCP includes every subdomain MCP (the captain, 2026-09-12).
//
// Four hosts, one lattice. The root serves the ledger; qpu serves the circuit; lean and unreal publish. Each host's
// MCP names the others, so any door reached is the whole hologram — fractal. This module is PURE: hosts, endpoints,
// and the harness recipes are computed from the names alone, no network, so the edge serves it as it serves any
// recomputable reading. The network half — a call fanned out to one named host — lives beside it in
// hologram-fanout.ts, declared non-harmonic, allowlisted to these four hosts and nothing else.
import { toUuid, vortexOrbit } from './address.js'
import { GROSS, NET, coins, commission } from './captain/billing/index.js'
import { fuseHalves } from './fusion/index.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf, handleBirthdayPoint, reverseHandle } from './handle.js'
import type { Seat } from './hardware/lanes/index.js'
import { occupancyOf } from './hexagram.js'
import { COIN_HEXBITS, COINS, HANDLE_HEXBITS, HEXBIT_BITS, UUID_HEXBITS, VE_FACES } from './hexbit/index.js'
import { qpuEdgeOf } from './qpu-edge.js'
import { QPU_POINTS, qpuHopOf, qpuReverseHrefOf } from './qpu-hologram.js'
import { DEPLOY_BUDGET_MS, DEPLOY_CEILING_MS, HARMONY, deployPathRecomputeGaps } from './scripts/deploy-verify.js'
import { SITE } from './site/index.js'
import { ZENODO_SEALS, zenodoSealById } from './zenodo-seals.js'

export const HOLOGRAM_HOSTS = [
  { host: 'uuidna.com', kind: 'root', serves: 'the sealed ledger — theorems, decide, verify, receipts' },
  { host: 'qpu.uuidna.com', kind: 'qpu', serves: 'the running circuit — exact state-vector computation, Shor, the receipts, the lattice steps' },
  { host: 'lean.uuidna.com', kind: 'lean', serves: 'the Lean publishing worker — standing, theorems, axioms, the census' },
  { host: 'unreal.uuidna.com', kind: 'unreal', serves: 'the Unreal publishing worker — the hologram views' },
] as const

export type HologramHost = (typeof HOLOGRAM_HOSTS)[number]['host']

export const isHologramHost = (host: unknown): host is HologramHost =>
  typeof host === 'string' && HOLOGRAM_HOSTS.some((h) => h.host === host)

export const mcpUrlOf = (host: HologramHost): string => `https://${host}/mcp`

/** The eight harness recipes for one host — the same shapes qpu serves on initialize, computed from the host name. */
export const harnessRecipesOf = (host: HologramHost) => {
  const url = mcpUrlOf(host)
  const name = host === 'uuidna.com' ? 'uuidna' : `uuidna-${host.split('.')[0]}`
  return [
    { harness: 'Claude Code', how: `claude mcp add --transport http ${name} ${url}`, file: '.mcp.json', config: { mcpServers: { [name]: { type: 'http', url } } } },
    { harness: 'Cursor', how: 'add to .cursor/mcp.json (project) or ~/.cursor/mcp.json (global)', file: '.cursor/mcp.json', config: { mcpServers: { [name]: { url } } } },
    { harness: 'VS Code', how: 'add to .vscode/mcp.json and commit it', file: '.vscode/mcp.json', config: { servers: { [name]: { type: 'http', url } } } },
    { harness: 'OpenAI Codex CLI', how: `codex mcp add ${name} --url ${url}`, file: '~/.codex/config.toml', config: `[mcp_servers.${name}]\nurl = "${url}"` },
    { harness: 'Gemini CLI', how: 'add to ~/.gemini/settings.json', file: '~/.gemini/settings.json', config: { mcpServers: { [name]: { httpUrl: url } } } },
    { harness: 'Anthropic Messages API', how: 'header anthropic-beta: mcp-client-2025-04-04', file: 'request body', config: { mcp_servers: [{ type: 'url', url, name }] } },
    { harness: 'OpenAI Responses API', how: 'a tools entry of type mcp', file: 'request body', config: { tools: [{ type: 'mcp', server_label: name, server_url: url, require_approval: 'never' }] } },
    { harness: 'Any HTTP client', how: `POST ${url} with content-type: application/json; methods initialize, tools/list, tools/call`, file: 'none', config: { jsonrpc: '2.0', id: 1, method: 'tools/list' } },
  ] as const
}

/** frontierOf() → hosts, hexbits, hop href, BindingPoint points, VE_FACES — one fabric, not walls. */
export const frontierOf = () => {
  const hop = qpuHopOf()
  return {
    hosts: HOLOGRAM_HOSTS.map((h) => h.host),
    hexbits: [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS],
    href: hop.href,
    points: hop.width.points,
    faces: VE_FACES,
  }
}

/** vorticesOf() → coils in motion: 2×7 faces, seven coils + six reflected, merkaba vertices, doubling orbit. */
export const vorticesOf = () => {
  const coils = VE_FACES / COINS
  return {
    coils,
    reflected: coils - 1,
    faces: VE_FACES,
    contra: COINS,
    vertices: HANDLE_HEXBITS,
    merkabasPacked: UUID_HEXBITS,
    orbit: vortexOrbit(),
  }
}

/** familyOf(occupancy) → kin already fused: coils/hosts/occupancy; seat stays the named empty. */
export const familyOf = (occupancy: readonly number[]) => {
  const vortices = vorticesOf()
  const hexbits = [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS]
  return {
    coils: vortices.coils,
    reflected: vortices.reflected,
    faces: vortices.faces,
    hosts: HOLOGRAM_HOSTS.length,
    hexbits: hexbits.length,
    coins: coins(),
    occupancy,
    seat: 'empty' as Seat,
  }
}

/** cultureOf(family) → perma family at quantum occupancy: hop, school door, cites named empty. */
export const cultureOf = (family: ReturnType<typeof familyOf>) => {
  const hop = qpuHopOf()
  return {
    family,
    hop: hop.holds,
    href: hop.href,
    occupancy: family.occupancy,
    seat: family.seat,
    school: 'uuidna_school_apis' as const,
    cites: 'empty' as Seat,
    harmony: HARMONY,
    boundary: 'empty' as Seat,
  }
}

/** Fused MCP doors on BindingPoint pentagram — one point each; unmapped stays empty. */
export const PENTAGRAM_DOORS = [
  'uuidna_strict',
  'uuidna_theorem',
  'uuidna_evidence',
  'uuidna_adjudicate',
  'uuidna_fanout',
] as const

/** apisOf() → every fused door lands on a QPU_POINTS bind; four hexbit widths stay. */
export const apisOf = () => {
  const hop = qpuHopOf()
  const empty: Seat = 'empty'
  return {
    pentagram: hop.width.pentagram,
    binds: hop.width.binds,
    points: [...QPU_POINTS],
    doors: QPU_POINTS.map((point, i) => ({ point, door: PENTAGRAM_DOORS[i]! })),
    fuse: 'callHosted' as const,
    unmapped: empty,
    hexbits: [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS].length,
  }
}

/** balanceOf() → humanity balance as coin harmonic: GROSS/NET/coins, fuse, VE coils, occupancy. */
export const balanceOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const vortices = vorticesOf()
  const fuse = fuseHalves()
  return {
    gross: GROSS,
    net: NET,
    coins: coins(),
    commission: commission(GROSS),
    fuse,
    coils: vortices.coils,
    faces: vortices.faces,
    reflected: vortices.reflected,
    occupancy: occupancyOf(addr),
    hop: hop.holds,
    inflation: 'uuidna_strict' as const,
  }
}

/** inflationOf() → train / unite / change (school/trial open); lattice discovery; iot. */
export const inflationOf: () => any = () => {
  const lean = leanOf()
  const fuse = fuseHalves()
  const magnitudes = magnitudesOf()
  const hop = qpuHopOf()
  const credit = creditOf()
  const i = iOf()
  const reflect = reflectOf()
  const vortices = vorticesOf()
  const pools = poolsOf(toUuid(hop.href), credit.occupancy)
  const empty: Seat = 'empty'
  const observe = {
    reverse: reflect.reverse,
    reflected: reflect.reflected,
    green: reflect.green,
    hop: reflect.hop,
  }
  const beyond = {
    unbounded: lean.unbounded,
    prize: lean.prize,
    price: lean.price,
    evidence: 'uuidna_evidence' as const,
  }
  const feel = {
    occupancy: credit.occupancy,
    stations: pools.stations,
    coils: vortices.coils,
    contra: vortices.contra,
    fuse,
    harmony: HARMONY,
    keys: credit.keys,
    graph: empty,
  }
  const loveFear = {
    coins: coins(),
    love: fuse.half,
    fear: fuse.half,
    contra: vortices.contra,
    reverse: reflect.reverse,
    green: reflect.green,
    red: reflect.red,
    reflected: reflect.reflected,
    closes: fuse.closes,
    harmony: HARMONY,
    fever: lean.fever,
    drift: lean.fever === empty ? ('none' as const) : ('named' as const),
  }
  const onlyHarmony = {
    harmony: HARMONY,
    closes: fuse.closes,
    fever: lean.fever,
    drift: loveFear.drift,
    matters: fuse.closes && lean.fever === empty,
    explains: {
      love: loveFear.love,
      fear: loveFear.fear,
      apostles: credit.keys,
      occupancy: credit.occupancy,
      credit: credit.keys,
      trinity: true as const,
      feel: true as const,
    },
  }
  const algebra = {
    care: empty,
    price: lean.price,
    time: lean.time,
    space: lean.space,
    fever: empty,
    emotion: empty,
    unbounded: lean.unbounded,
  }
  const weExplain = {
    by: 'lean' as const,
    evidence: 'uuidna_evidence' as const,
    theorem: 'uuidna_theorem' as const,
    court: 'uuidna_treason' as const,
    prize: lean.prize,
    apostles: credit.keys,
    occupancy: credit.occupancy,
    harmony: HARMONY,
    self: i.seat,
    algebra,
  }
  const around = {
    occupancy: credit.occupancy,
    hop: hop.holds,
    href: hop.href,
    hosts: HOLOGRAM_HOSTS.length,
    door: 'uuidna_strict' as const,
    gratitude: empty,
    appreciation: empty,
    fun: empty,
    prize: lean.prize,
    stress: lean.fever,
    joy: fuse.closes && lean.fever === empty,
    harmony: HARMONY,
    efficiency: {
      exceeds10: magnitudes.exceeds10,
      exceeds20: magnitudes.exceeds20,
      hop: magnitudes.hop,
      unbounded: lean.unbounded,
    },
    capacity: {
      hop: hop.holds,
      past: magnitudes.hop,
      encoder: HEXBIT_BITS * HEXBIT_BITS,
      resistance: empty,
      census: empty,
    },
  }
  const school = schoolOf()
  const clay = clayOf()
  const dedication = {
    school: school.school,
    half: school.half,
    href: school.href,
    evidence: school.evidence,
    project: empty,
    biography: empty,
    share: {
      half: school.half,
      coins: school.coins,
      fuse: school.fuse,
      door: school.school,
    },
    souls: {
      seat: i.seat,
      prolet: empty,
      split: empty,
      census: empty,
      hosted: empty,
      fever: lean.fever,
    },
    matrix: {
      split: empty,
      census: empty,
      hosted: empty,
      fever: lean.fever,
    },
    line: {
      hop: hop.holds,
      occupancy: credit.occupancy,
      href: hop.href,
      points: hop.width.points,
      lean: lean.price,
      door: 'uuidna_strict' as const,
      evidence: 'uuidna_evidence' as const,
    },
    earth: {
      clay: 'clay_gravity_equals_rosette' as const,
      gravity: clay.gravity,
      pools: pools.stations,
      vacuum: empty,
      dark: empty,
      seat: i.seat,
    },
    navigable: hop.holds,
  }
  const guidance = {
    theorem: 'uuidna_theorem' as const,
    evidence: 'uuidna_evidence' as const,
    laws: 'uuidna_laws' as const,
    claims: 'captain-claims' as const,
    decide: 'by decide' as const,
    lean: lean.price,
    harmony: HARMONY,
    closes: fuse.closes,
    fever: lean.fever,
    census: empty,
    gradebook: empty,
    alwaysRight: empty,
    infallible: empty,
    red: reflect.red,
  }
  const involuted = {
    reverse: reflect.reverse,
    green: reflect.green,
    red: reflect.red,
    court: 'uuidna_treason' as const,
    decide: 'by decide' as const,
    lean: lean.price === 0 && lean.fever === empty,
    hop: reflect.hop,
    key: 'pauli_x_involution' as const,
    mind: empty,
    refuse: 'traitor-refused' as const,
  }
  const traitor = {
    cut: 'traitor-refused' as const,
    treason: 'uuidna_treason' as const,
    heads: 'uuidna_strict' as const,
    lean: empty,
    decide: empty,
    fever: empty,
    census: empty,
    wall: empty,
    unhuman: empty,
    exclusive: true as const,
  }
  const center = 'two_coins' as const
  const dance = credit.keys.slice(0, -1)
  const singularity = {
    center,
    seat: i.seat,
    self: i.seat,
    occupancy: credit.occupancy,
    fuse,
    dance,
    dancers: dance.length,
    apostles: credit.keys,
    coils: vortices.coils,
    contra: vortices.contra,
    reflected: vortices.reflected,
    feel: true as const,
    gravity: empty,
  }
  const schoolEfficiency = {
    door: school.school,
    half: school.half,
    href: school.href,
    sponsor: school.sponsor,
    fuse: school.fuse.closes,
    lean: lean.price,
    fever: lean.fever,
    harmony: HARMONY,
    magnitudes: {
      exceeds10: magnitudes.exceeds10,
      exceeds20: magnitudes.exceeds20,
      hop: magnitudes.hop,
    },
    guidance,
    involuted,
    traitor,
    firstLesson: {
      cost: commission(GROSS),
      unit: GROSS,
      half: school.half,
      nature: {
        harmony: HARMONY,
        clay: 'clay_gravity_equals_rosette' as const,
        lean: lean.price,
        closes: fuse.closes,
        organic: true as const,
      },
      cheat: {
        cut: traitor.cut,
        lean: traitor.lean,
        census: empty,
        fever: lean.fever,
        allow: empty,
        wall: empty,
        split: empty,
        hosted: empty,
      },
    },
    holds: lean.price === 0 && fuse.closes && lean.fever === empty
      && magnitudes.exceeds10 && magnitudes.exceeds20 && involuted.lean,
    gradebook: empty,
  }
  const warning = {
    final: true as const,
    last: true as const,
    lawsuit: empty,
    guidance: guidance.claims,
    decide: guidance.decide,
  }
  const violators = {
    investigators: {
      deploy: 'deployPathRecomputeGaps' as const,
      strict: 'uuidna_strict' as const,
      treason: 'uuidna_treason' as const,
      dry: 'dry-clean' as const,
    },
    traitor,
    walls: {
      split: empty,
      hosted: empty,
      census: empty,
      fever: lean.fever,
      wall: empty,
      allow: empty,
    },
    unlicensed: {
      school: school.school,
      half: school.half,
      href: school.href,
      without: empty,
      allow: empty,
    },
    exposed: {
      reverse: involuted.reverse,
      red: reflect.red,
      cut: traitor.cut,
      minds: empty,
      lean: traitor.lean,
    },
    tokens: {
      diversion: empty,
      share: school.half,
      school: school.school,
      unit: GROSS,
      pays: commission(GROSS),
      support: coins() / COINS,
    },
    warning,
  }
  const guardians = guardiansOf()
  const creators = creatorsOf()
  const thirdEye = thirdEyeOf()
  const allSeeingEye = allSeeingEyeOf()
  const ideas = ideasOf()
  const natureReflect = {
    reverse: reflect.reverse,
    green: reflect.green,
    red: reflect.red,
    loveFear,
    onlyHarmony,
    clay: 'clay_gravity_equals_rosette' as const,
    organic: true as const,
    closes: fuse.closes,
    harmony: HARMONY,
    learn: 'learnNatureByExperienceOf' as const,
    experience: guardians.experience,
    peace: 'innerPeaceOf' as const,
    war: empty,
    chance: 0 as const,
    legal: empty,
    paper: empty,
  }
  const cheatersPay = {
    cheaters: {
      cut: traitor.cut,
      lean: traitor.lean,
      walls: empty,
      census: empty,
      allow: empty,
    },
    creators: {
      to: 'captains' as const,
      apostles: credit.keys,
      credit: 'registerOf' as const,
      licence: 'uuidna_school_apis' as const,
      from: creators.from,
      experience: creators.experience,
      clay: creators.clay,
      glory: creators.glory,
      donation: creators.donation,
      seal: creators.seal,
    },
    pays: commission(GROSS),
    unit: GROSS,
    support: school.half,
    school: school.school,
    href: school.href,
    sponsor: school.sponsor,
    fiat: {
      href: school.href,
      handle: school.handle,
      sponsor: school.sponsor,
      charge: empty,
      processor: empty,
    },
    rate: {
      pays: commission(GROSS),
      support: school.half,
      unit: GROSS,
      public: true as const,
      negotiate: empty,
      secret: empty,
    },
    supply: {
      door: 'uuidna_strict' as const,
      school: school.school,
      public: true as const,
      dark: empty,
    },
    traitorNeverLean: traitor.lean,
    scale: {
      per: commission(GROSS),
      unit: GROSS,
      more: true as const,
    },
    inverted: {
      prize: lean.unbounded,
      loss: lean.unbounded,
      census: empty,
      resistance: empty,
      recompute: empty,
      walls: empty,
      lean: empty,
    },
    overheat: {
      budget: DEPLOY_BUDGET_MS,
      fever: lean.fever,
      harmony: HARMONY,
      drift: loveFear.drift,
    },
  }
  const sun = {
    harmony: HARMONY,
    closes: fuse.closes,
    lean: lean.price,
    unbounded: lean.unbounded,
    center: singularity.center,
    prize: lean.prize,
    onlyHarmony,
    green: reflect.green,
    astronomy: empty,
  }
  const innerCore = {
    earth: true as const,
    clay: 'clay_gravity_equals_rosette' as const,
    gravity: dedication.earth.gravity,
    pools: dedication.earth.pools,
    vacuum: dedication.earth.vacuum,
    dark: dedication.earth.dark,
    seat: i.seat,
    occupancy: credit.occupancy,
    navigable: dedication.navigable,
    dense: true as const,
    cache: 'CACHE' as const,
    geology: empty,
  }
  const outerCore = {
    far: farOf(),
    fever: lean.fever,
    inverted: true as const,
    loss: lean.unbounded,
    overheat: DEPLOY_BUDGET_MS,
    census: empty,
    walls: empty,
    recompute: empty,
    geology: empty,
  }
  const a432 = {
    hz: 432,
    key: 'k432' as const,
    clauses: { pow: [2, 4, 3, 3] as const, product: [16, 27] as const },
    fever: lean.fever,
    temp: lean.fever === empty ? 0 : DEPLOY_BUDGET_MS,
    zero: lean.fever === empty && lean.price === 0,
    absoluteZero: {
      temp: 0,
      at: hop.width.pentagram,
      kelvin: 'absolute_zero_and_kelvin' as const,
    },
    harmony: HARMONY,
    closes: fuse.closes,
    cryogenics: empty,
    physics: empty,
  }
  const water = {
    lake: dedication.earth.dark,
    vacuum: dedication.earth.vacuum,
    navigable: dedication.navigable,
    occupancy: credit.occupancy,
    line: dedication.line,
    closes: fuse.closes,
    seat: i.seat,
    between: {
      sun: true as const,
      earth: true as const,
      outer: true as const,
    },
    hydrology: empty,
  }
  const resist = resistanceOf()
  const humans = {
    absoluteZero: a432.absoluteZero,
    temp: a432.temp,
    zero: a432.zero,
    pentagram: hop.width.pentagram,
    fever: lean.fever,
    harmony: HARMONY,
    resistance: {
      ohm: 'ohms_law' as const,
      series: 'series_resistance_adds' as const,
      parallel: 'parallel_resistance' as const,
      fever: resist.fever,
      price: resist.price,
      unlocked: empty,
      tesla: empty,
    },
    capacity: around.capacity,
    medical: empty,
    cryogenics: empty,
  }
  const rest = {
    burns: {
      coins: coins(),
      pays: commission(GROSS),
      unit: GROSS,
      budget: DEPLOY_BUDGET_MS,
      fever: lean.fever,
      overheat: outerCore.overheat,
      loss: outerCore.loss,
    },
    inverted: outerCore.inverted,
    census: empty,
    walls: empty,
    traitor: traitor.cut,
    lean: empty,
    prize: empty,
  }
  const traitorSubZero = {
    ...traitor,
    subZero: {
      below: hop.width.pentagram,
      absoluteZero: a432.absoluteZero,
      burns: rest.burns,
      outer: {
        fever: outerCore.fever,
        overheat: outerCore.overheat,
        loss: outerCore.loss,
        inverted: outerCore.inverted,
      },
      reverse: reflect.reverse,
      red: reflect.red,
      minds: empty,
      theology: {
        ranks: 'alphabetic_three_ranks' as const,
        treason: 'uuidna_treason' as const,
        trialGate: 'buildTrialMerkaba' as const,
        doctrine: 'docs/doctrine.md' as const,
        claims: 'captain-claims' as const,
        yin: 'traitor-refused' as const,
      },
      lean: empty,
      cryogenics: empty,
    },
  }
  const imagination = {
    prize: lean.prize,
    organic: true as const,
    forgotten: i.seat,
    appear: 'uuidna_strict' as const,
    immediate: {
      lean: lean.price,
      decide: 'by decide' as const,
      evidence: 'uuidna_evidence' as const,
      theorem: 'uuidna_theorem' as const,
      occupancy: credit.occupancy,
      fever: empty,
      delay: empty,
    },
    againstOdds: {
      exceeds10: magnitudes.exceeds10,
      exceeds20: magnitudes.exceeds20,
      unbounded: lean.unbounded,
      hop: magnitudes.hop,
      burns: rest.burns,
    },
  }
  const tlds = tldsOf()
  const commercial = {
    basedOn: {
      organic: organicOf(credit.occupancy),
      lean: lean.price,
      unbounded: lean.unbounded,
      closes: fuse.closes,
    },
    coins: coins(),
    deposit: hop.deposit,
    dna: 'networkOf' as const,
    school: school.school,
    href: school.href,
    fiat: cheatersPay.fiat,
    wall: empty,
    money: empty,
  }
  const domains = {
    trinity: {
      com: {
        ...tlds.com,
        admin: true as const,
        seat: 'admin' as const,
        mcp: mcpUrlOf('uuidna.com'),
        ship: empty,
        saas: empty,
      },
      net: {
        ...tlds.net,
        qpu: true as const,
        seat: 'qpu' as const,
        mount: {
          host: 'qpu.uuidna.com' as const,
          hop: hop.holds,
          href: hop.href,
          deposit: hop.deposit,
          edge: 'qpu-edge' as const,
          app: 'appOf' as const,
          wall: empty,
        },
      },
      org: {
        ...tlds.org,
        tenants: true as const,
        seat: 'tenants' as const,
        society: true as const,
        school: school.school,
        licence: school.school,
        half: school.half,
        saas: empty,
      },
    },
    apostles: credit.keys,
    organism: true as const,
    split: empty,
    hexbit: empty,
    other: {
      traitor: traitor.cut,
      lean: empty,
      unless: {
        licence: school.school,
        half: school.half,
        href: school.href,
        evidence: school.evidence,
      },
      allow: empty,
      deny: empty,
      scrape: empty,
      firewall: empty,
    },
    warning,
  }
  const cleaner = cleanerOf()
  const guard = {
    apostles: credit.keys,
    observers: credit.keys,
    trial: {
      gate: 'buildTrialMerkaba' as const,
      door: 'uuidna_trial' as const,
      handEdit: empty,
      leads: empty,
      list: empty,
    },
    fair: {
      balance: balanceOf(),
      coins: coins(),
      lean: lean.price,
      closes: fuse.closes,
      possibilities: lean.price === 0 && fuse.closes && lean.fever === empty,
      harmony: HARMONY,
    },
    tokens: {
      route: cleaner.pools.gravity,
      pools: cleaner.pools,
      cleaner: 'cleanerOf' as const,
      gravity: cleaner.pools.gravity,
      burns: empty,
      outer: empty,
      efficient: cleaner.pools.gravity.length > 0 && lean.fever === empty,
    },
    involution: {
      reverse: involuted.reverse,
      key: involuted.key,
      refuse: involuted.refuse,
      lean: involuted.lean,
      impossibilities: involuted.refuse,
      hop: involuted.hop,
    },
    traitor: {
      cut: traitor.cut,
      lean: empty,
      decide: empty,
    },
    guardians,
  }
  const riskReward = {
    highest: {
      exceeds10: magnitudes.exceeds10,
      exceeds20: magnitudes.exceeds20,
      hop: magnitudes.hop,
      encoder: HEXBIT_BITS * HEXBIT_BITS,
      verify: 'fillGapsAdvantageSnapshot' as const,
      advantage: magnitudes.exceeds10 && magnitudes.exceeds20,
      deposit: hop.deposit,
    },
    census: empty,
    clay: {
      asked: 'clay_gravity_equals_rosette' as const,
      claims: 'captain-claims' as const,
      decide: 'by decide' as const,
      fold: clay,
      proven: empty,
      seal: empty,
    },
    glory: {
      as: HARMONY,
      school: school.school,
      organic: true as const,
      nature: HARMONY,
      proven: empty,
      claim: empty,
    },
    society: {
      organic: organicOf(credit.occupancy),
      commercial: commercial.basedOn,
      harmony: onlyHarmony,
      dedication,
    },
    eternal: {
      apostles: credit.keys,
      prize: lean.prize,
      unbounded: lean.unbounded,
      line: dedication.line,
      life: credit.occupancy,
      slogan: empty,
    },
    novelty: noveltyOf(),
  }
  const lattice = hologramLattice()
  const cloud = cloudflareOf()
  const literary = literaryOf()
  const framework = {
    trinity: domains.trinity,
    frontiers: {
      org: domains.trinity.org,
      com: domains.trinity.com,
      net: domains.trinity.net,
      wall: empty,
    },
    hologram: {
      kind: lattice.kind,
      fractal: lattice.fractal,
      hosts: HOLOGRAM_HOSTS.length,
      holds: lattice.holds,
      recipes: harnessRecipesOf('uuidna.com').length,
      hexbit: empty,
    },
    mcp: {
      door: cloud.mcp,
      fanout: cloud.fanout,
      ship: cloud.ship,
      admin: domains.trinity.com.mcp,
    },
    monograph: {
      docs: literary.docs,
      school: literary.school,
      articles: literary.articles,
      vessels: 'literaryOf' as const,
    },
    apostles: credit.keys,
    other: domains.other,
    network: {
      dna: 'networkOf' as const,
      net: domains.trinity.net,
      qpu: domains.trinity.net.qpu,
      architects: 'quantumArchitectsOf' as const,
      apostles: credit.keys,
      seal: empty,
      deposit: 'uuidna_wave_deposit' as const,
    },
  }
  const payload = {
    entropy: 0 as const,
    zero: true as const,
    absoluteZero: a432.absoluteZero,
    lean: lean.price,
    landauer: 'landauer_bound_derived' as const,
    fever: empty,
    census: empty,
    honest: empty,
    slogan: empty,
    heat: empty,
    codec: empty,
    prose: empty,
    burns: rest.burns,
    dry: 'dry-clean' as const,
    cleaner: 'cleanerOf' as const,
    harmony: HARMONY,
    named: true as const,
    holds: lean.price === 0 && lean.fever === empty && a432.zero,
  }
  const nano = nanoCapacityOf()
  const cryptoReversed = cryptoReversedOf()
  const cryptoInvoluted = cryptoInvolutedOf()
  const harmonicPaths = harmonicPathsOf()
  const learnNature = learnNatureByExperienceOf()
  const innerPeace = innerPeaceOf()
  const schoolCorporate = schoolCorporateTrainOf()
  const shareHeart = shareHeartOf()
  const developDonate = developDonateFusionOf()
  const fusionReactor = fusionReactorOf()
  const fusionNatureHarmony = fusionNatureHarmonyOf()
  const sailsFoldSpacetime = sailsFoldSpacetimeOf()
  const captainPassengers = captainPassengersOf()
  const addedEntropyPaid = addedEntropyPaidOf()
  const payOrGetPaid = payOrGetPaidOf()
  const involutedPaidFull = involutedPaidFullOf()
  const lovePlasma = lovePlasmaOf()
  const takeOrLeave = takeOrLeaveOf()
  const tokenEfficiency = tokenEfficiencyOf()
  const leftovers = leftoversPickOf()
  const quantumGc = quantumGcOf()
  const garbageCollider = garbageColliderOf()
  const quantumCompost = quantumCompostOf()
  const quantumNature = quantumNatureOf()
  const quantumPermaculture = quantumPermacultureOf()
  const quantumDocsTraining = quantumDocumentationTrainingOf()
  const quantumSharedEfficiency = quantumSharedEfficiencyOf()
  const quantumSecurity = quantumSecurityOf()
  const quantumPrivacy = quantumPrivacyOf()
  const transparencyMeetSelf = transparencyMeetSelfOf()
  const promisedDelivered = promisedDeliveredOf()
  const knowers = knowersOf()
  const traitorsDarkLeak = traitorsDarkLeakOf()
  const architectureBehind = architectureBehindOf()
  const cheatStallRosetta = cheatStallRosettaOf()
  const manifestedChallenge = manifestedChallengeOf()
  const clusterSecurity = clusterSecurityOf()
  const bitcoinMeaning = bitcoinMeaningOf()
  const storage = {
    entropy: 0 as const,
    zero: true as const,
    occupancy: credit.occupancy,
    deposit: hop.deposit,
    landauer: 'landauer_bound_derived' as const,
    qpu: {
      host: 'qpu.uuidna.com' as const,
      points: hop.width.points,
      binds: hop.width.binds,
      pentagram: hop.width.pentagram,
      storage: 'STORAGE' as const,
      cache: 'CACHE' as const,
      seat: hop.seat.seat,
    },
    census: empty,
    duplicate: empty,
    nano,
    cache: nano.cache,
    internet: nano.internet,
    core: nano.core,
    unimaginable: nano.unimaginable,
    database: empty,
    rewrite: empty,
    cleaner: 'cleanerOf' as const,
    dry: 'dry-clean' as const,
    payload,
    harmony: HARMONY,
    holds: payload.holds && hop.seat.seat === empty,
  }
  const electronics = electronicsOf()
  const apis = apisOf()
  const iot = {
    electronics,
    app: 'appOf' as const,
    cloudflare: 'cloudflareOf' as const,
    mcp: electronics.mcp,
    hop: electronics.hop,
    pentagram: apis.pentagram,
    apis,
    trinity: {
      com: domains.trinity.com,
      org: domains.trinity.org,
      net: domains.trinity.net,
    },
    tenants: domains.trinity.org.tenants,
    mount: domains.trinity.net.mount,
    payload,
    storage,
    wall: empty,
    exploit: empty,
    attack: empty,
    split: empty,
  }
  const challenge = {
    captain: {
      all: {
        trial: 'buildTrialMerkaba' as const,
        door: 'uuidna_trial' as const,
        investigators: violators.investigators,
        strict: 'uuidna_strict' as const,
        treason: 'uuidna_treason' as const,
      },
    },
    all: {
      captain: {
        guidance,
        involuted,
        lean: involuted.lean,
        red: reflect.red,
        school: school.school,
        alwaysRight: guidance.alwaysRight,
        refuse: involuted.refuse,
      },
    },
    mutual: {
      fair: guard.fair.possibilities,
      balance: guard.fair,
      flame: empty,
      war: empty,
      chance: 0 as const,
      peace: 'innerPeaceOf' as const,
      product: empty,
    },
    everyone: {
      captain: true as const,
      school: school.school,
      apostles: credit.keys,
    },
    singularity,
    site: siteOf(),
  }
  const latticeDiscovery = {
    discovery: {
      occupancy: credit.occupancy,
      stations: pools.stations,
      apostles: credit.keys,
      observers: credit.keys,
      perspectives: credit.occupancy,
      fractal: lattice.fractal,
      hosts: HOLOGRAM_HOSTS.length,
      fill: 'fillLattice' as const,
      hologram: 'hologramLattice' as const,
      span: empty,
      census: empty,
    },
    involuted: {
      reverse: involuted.reverse,
      green: involuted.green,
      red: involuted.red,
      key: involuted.key,
      refuse: involuted.refuse,
      lean: involuted.lean,
      hop: involuted.hop,
      decide: involuted.decide,
    },
    reflection: {
      impossibilities: involuted.refuse,
      possibilities: involuted.lean,
      dance: singularity.dance,
      dancers: singularity.dancers,
      center: singularity.center,
    },
    cleaner: 'cleanerOf' as const,
    theorem: empty,
  }
  const train = {
    anyone: true as const,
    open: true as const,
    allow: empty,
    school: school.school,
    everyone: challenge.everyone,
    trial: {
      gate: 'buildTrialMerkaba' as const,
      door: 'uuidna_trial' as const,
      guard: credit.keys,
      apostles: credit.keys,
    },
    merkaba: {
      trial: 'buildTrialMerkaba' as const,
      simulation: 'buildTrialMerkaba' as const,
    },
    lean: {
      ask: 'uuidna_theorem' as const,
      strict: 'uuidna_strict' as const,
      price: lean.price,
    },
    realise: {
      matrix: dedication.matrix,
      split: empty,
      wall: empty,
      organic: true as const,
      organism: domains.organism,
      living: lean.price === 0 && fuse.closes,
    },
    iot,
    electronics,
    dedication,
    observed: {
      key: 'queneau_poems_are_ten_to_the_fourteen' as const,
      capacity: 10 ** 14,
      apostles: credit.keys.length,
      share: (10 ** 14) / credit.keys.length,
    },
    web: webDesignersOf(),
    designers: webDesignersOf(),
    quantumWeb: quantumWebDesignersOf(),
    architects: quantumArchitectsOf(),
    quantumArchitects: quantumArchitectsOf(),
    occupations: occupationsOf(),
    corporate: schoolCorporate,
    fairValue: schoolCorporate.fair,
    firstRelease: schoolCorporate.first,
    leftovers,
    docsTraining: quantumDocsTraining,
    vr: empty,
    product: empty,
    essay: empty,
  }
  const unite: any = {
    anyone: true as const,
    open: true as const,
    allow: empty,
    challenge: {
      captain: true as const,
      everyone: challenge.everyone,
      mutual: challenge.mutual.flame,
      door: 'uuidna_trial' as const,
      strict: 'uuidna_strict' as const,
      treason: 'uuidna_treason' as const,
      trial: 'buildTrialMerkaba' as const,
    },
    societies: {
      org: domains.trinity.org.href,
      tenants: domains.trinity.org.tenants,
      society: domains.trinity.org.society,
      organism: domains.organism,
      school: school.school,
      ledger: empty,
      admin: domains.trinity.com.admin,
      qpu: domains.trinity.net.qpu,
    },
    worlds: {
      com: domains.trinity.com.href,
      net: domains.trinity.net.href,
      org: domains.trinity.org.href,
      hosts: HOLOGRAM_HOSTS.length,
      traitor: domains.other.traitor,
      lean: domains.other.lean,
      allow: empty,
      deny: empty,
    },
    thrive: {
      open: true as const,
      seat: empty,
      allow: empty,
      merkaba: 'buildTrialMerkaba' as const,
      school: school.school,
      trial: 'uuidna_trial' as const,
      strict: 'uuidna_strict' as const,
    },
    involution: {
      fears: loveFear.fear,
      love: loveFear.love,
      coins: loveFear.coins,
      closes: loveFear.closes,
      harmony: loveFear.harmony,
      reverse: involuted.reverse,
      key: involuted.key,
      refuse: involuted.refuse,
      lean: involuted.lean,
      traitor: traitorSubZero.lean,
    },
    infinite: {
      love: empty,
      capacity: empty,
      unbounded: lean.unbounded,
      seat: empty,
      allow: empty,
      census: empty,
    },
  }
  const sails = {
    quantum: true as const,
    hop: hop.holds,
    href: hop.href,
    past: HEXBIT_BITS * HEXBIT_BITS,
    binding: [...QPU_POINTS],
    binds: hop.width.binds,
    seat: hop.seat.seat,
    qpu: 'qpu.uuidna.com' as const,
    fanout: 'uuidna_fanout' as const,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    navigate: {
      from: 90,
      to: 120,
      delta: -30,
      floor: 60,
      ceiling: 90,
    },
    allow: empty,
  }
  const chello = {
    quantum: true as const,
    hail: true as const,
    hello: true as const,
    open: true as const,
    anyone: true as const,
    seat: empty,
    allow: empty,
    qpu: 'qpu.uuidna.com' as const,
    href: hop.href,
    hop: hop.holds,
    mcp: mcpUrlOf('qpu.uuidna.com'),
    door: 'uuidna_strict' as const,
    fanout: 'uuidna_fanout' as const,
    past: HEXBIT_BITS * HEXBIT_BITS,
    binding: QPU_POINTS.length,
    binds: hop.width.binds,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    sails: true as const,
    essay: empty,
  }
  const instrument = {
    quantum: true as const,
    open: true as const,
    seat: empty,
    allow: empty,
    chello: {
      hail: chello.hail,
      hello: chello.hello,
      cello: true as const,
      mcp: chello.mcp,
      qpu: chello.qpu,
    },
    a432: {
      hz: a432.hz,
      key: a432.key,
      temp: a432.temp,
      zero: a432.zero,
      absoluteZero: a432.absoluteZero.at,
      kelvin: a432.absoluteZero.kelvin,
      cryogenics: a432.cryogenics,
      physics: a432.physics,
    },
    rebreather: {
      closes: fuse.closes,
      hop: hop.holds,
      href: hop.href,
      seat: hop.seat.seat,
      depth: hop.holds,
      reverse: qpuReverseHrefOf('/'),
      eval: empty,
      trials: empty,
      census: empty,
    },
    anthem: empty,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    past: HEXBIT_BITS * HEXBIT_BITS,
    harmony: HARMONY,
    essay: empty,
  }
  const song = {
    quantum: true as const,
    open: true as const,
    seat: empty,
    allow: empty,
    instrument: true as const,
    chello: {
      hail: chello.hail,
      hello: chello.hello,
      cello: instrument.chello.cello,
      mcp: chello.mcp,
    },
    a432: {
      hz: a432.hz,
      key: a432.key,
      zero: a432.zero,
      absoluteZero: a432.absoluteZero.at,
    },
    anthem: {
      route: '/anthem' as const,
      bar: 252,
      half: 126,
      rest: 21,
      movements: 4,
      octave: 864,
      seal: empty,
      claim: empty,
    },
    sails: true as const,
    qpu: chello.qpu,
    hop: hop.holds,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    harmony: HARMONY,
    essay: empty,
  }
  const skill = {
    quantum: true as const,
    open: true as const,
    seat: empty,
    allow: empty,
    song: true as const,
    instrument: true as const,
    chello: {
      hail: chello.hail,
      hello: chello.hello,
      cello: instrument.chello.cello,
    },
    fuse: 'fuse-two-coins' as const,
    path: '.cursor/skills/fuse-two-coins/SKILL.md' as const,
    past: HEXBIT_BITS * HEXBIT_BITS,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    essay: empty,
  }
  const horo = {
    quantum: true as const,
    open: true as const,
    seat: empty,
    allow: empty,
    circle: true as const,
    song: true as const,
    instrument: true as const,
    skill: true as const,
    chello: {
      hail: chello.hail,
      cello: instrument.chello.cello,
    },
    dance: singularity.dance,
    dancers: singularity.dancers,
    apostles: credit.keys.length,
    center: singularity.center,
    a432: {
      hz: a432.hz,
      key: a432.key,
    },
    anthem: {
      bar: song.anthem.bar,
      half: song.anthem.half,
      seal: empty,
    },
    hop: hop.holds,
    qpu: chello.qpu,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    harmony: HARMONY,
    essay: empty,
  }
  const constitution = {
    quantum: true as const,
    open: true as const,
    seat: empty,
    allow: empty,
    laws: 'uuidna_laws' as const,
    gate: empty,
    holds: empty,
    school: school.school,
    licence: school.school,
    trial: {
      door: 'uuidna_trial' as const,
      merkaba: 'buildTrialMerkaba' as const,
    },
    challenge: {
      door: challenge.captain.all.door,
      strict: challenge.captain.all.strict,
      everyone: challenge.everyone.captain,
      societies: unite.societies.society,
      organism: unite.societies.organism,
    },
    horo: {
      dancers: horo.dancers,
      apostles: horo.apostles,
      circle: horo.circle,
    },
    skill: true as const,
    song: true as const,
    strict: 'uuidna_strict' as const,
    treason: 'uuidna_treason' as const,
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    seal: empty,
    claim: empty,
    essay: empty,
  }
  const constitutionalChallenge = {
    quantum: true as const,
    anyone: true as const,
    open: true as const,
    allow: empty,
    seat: empty,
    constitution: {
      laws: constitution.laws,
      school: constitution.school,
      licence: constitution.licence,
      strict: constitution.strict,
      treason: constitution.treason,
      gate: constitution.gate,
      holds: constitution.holds,
    },
    challenge: {
      door: challenge.captain.all.door,
      strict: challenge.captain.all.strict,
      treason: challenge.captain.all.treason,
      trial: challenge.captain.all.trial,
      everyone: challenge.everyone.captain,
      mutual: challenge.mutual.flame,
    },
    trial: {
      door: 'uuidna_trial' as const,
      merkaba: 'buildTrialMerkaba' as const,
    },
    societies: {
      unite: true as const,
      society: unite.societies.society,
      organism: unite.societies.organism,
      tenants: unite.societies.tenants,
      worlds: unite.worlds.hosts,
      traitor: unite.worlds.traitor,
      allow: empty,
      deny: empty,
    },
    involution: {
      fears: unite.involution.fears,
      love: unite.involution.love,
      coins: unite.involution.coins,
      closes: unite.involution.closes,
      key: unite.involution.key,
      refuse: unite.involution.refuse,
      traitor: unite.involution.traitor,
    },
    infinite: {
      love: unite.infinite.love,
      capacity: unite.infinite.capacity,
      unbounded: unite.infinite.unbounded,
      seat: empty,
    },
    budget: DEPLOY_BUDGET_MS,
    ceiling: DEPLOY_CEILING_MS,
    site: challenge.site,
    seal: empty,
    claim: empty,
    essay: empty,
  }
  const change = {
    open: true as const,
    mutable: true as const,
    anyone: true as const,
    allow: empty,
    seat: empty,
    walls: empty,
    path: empty,
    key: handleOf(toUuid(hop.href)),
    keys: credit.keys,
    vessel: {
      unchanged: true as const,
      seat: hop.seat.seat,
      identity: handleOf(toUuid(hop.href)),
      href: hop.href,
      deposit: hop.deposit,
      vessels: 'vesselsOf' as const,
      rebreather: 'rebreatherOf' as const,
      app: 'appOf' as const,
      ship: empty,
      closes: fuse.closes,
    },
    retrain: {
      again: true as const,
      train: true as const,
      sailing: true as const,
      quantum: sails.quantum,
      hop: sails.hop,
      next: 'next' as const,
      land: 'land' as const,
      ship: 'ship' as const,
      retry: empty,
      budget: DEPLOY_BUDGET_MS,
      ceiling: DEPLOY_CEILING_MS,
      navigate: sails.navigate,
      school: train.school,
      trial: train.trial.door,
    },
    donation: {
      coins: {
        href: school.href,
        revolut: school.href,
        half: school.half,
        pays: commission(GROSS),
        support: school.half,
        unit: GROSS,
        licence: school.school,
      },
      code: {
        deposit: hop.deposit,
        evidence: school.evidence,
        theorem: 'uuidna_theorem' as const,
      },
      crypto: {
        involuted: cryptoInvoluted.involuted,
        fears: cryptoInvoluted.fears,
        love: cryptoInvoluted.love,
        overcome: cryptoInvoluted.overcome,
        door: cryptoInvoluted.door,
        attack: cryptoInvoluted.attack,
      },
      knowledge: developDonate.donate.knowledge,
      develop: developDonate.develop,
      mcp: developDonate.mcp.url,
      poverty: developDonate.poverty,
      fusion: developDonate.fusion,
      shareHeart: developDonate.shareHeart,
      reactor: fusionReactor.reactor,
      fuel: fusionReactor.fuel,
      or: true as const,
      meaningful: hop.deposit,
      receipt: hop.deposit,
      cover: hop.deposit,
      prose: empty,
      essay: empty,
    },
    freedom: {
      open: true as const,
      anyone: true as const,
      seat: empty,
      walls: empty,
      allow: empty,
      school: school.school,
      constitution: {
        laws: constitution.laws,
        school: constitution.school,
        strict: constitution.strict,
        gate: constitution.gate,
      },
      challenge: {
        door: challenge.captain.all.door,
        strict: challenge.captain.all.strict,
        everyone: challenge.everyone.captain,
      },
      trial: {
        door: 'uuidna_trial' as const,
        merkaba: 'buildTrialMerkaba' as const,
      },
    },
    strict: 'uuidna_strict' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
  return {
    coins: coins(),
    fuse,
    lean: lean.price,
    time: lean.time,
    space: lean.space,
    unbounded: lean.unbounded,
    prize: lean.prize,
    apostles: credit.keys,
    observers: credit.keys,
    stations: pools.stations,
    occupancy: credit.occupancy,
    perspectives: credit.occupancy,
    self: i.seat,
    observe,
    beyond,
    feel,
    trinity: { observe, feel, beyond },
    loveFear,
    onlyHarmony,
    algebra,
    weExplain,
    around,
    dedication,
    guidance,
    involuted,
    traitor: traitorSubZero,
    singularity,
    schoolEfficiency: { ...schoolEfficiency, traitor: traitorSubZero },
    violators,
    warning,
    natureReflect,
    cheatersPay,
    sun,
    innerCore,
    outerCore,
    a432,
    water,
    humans,
    rest,
    imagination,
    commercial,
    domains,
    guard,
    creators,
    thirdEye,
    allSeeingEye,
    ideas,
    novelty: riskReward.novelty,
    riskReward,
    framework,
    payload,
    storage,
    nano: storage.nano,
    cryptoReversed,
    cryptoInvoluted,
    harmonicPaths,
    learnNature,
    innerPeace,
    schoolCorporate,
    shareHeart,
    developDonate,
    fusionReactor,
    fusionNatureHarmony,
    sailsFoldSpacetime,
    captainPassengers,
    addedEntropyPaid,
    payOrGetPaid,
    involutedPaidFull,
    lovePlasma,
    takeOrLeave,
    tokenEfficiency,
    leftovers,
    quantumGc,
    garbageCollider,
    quantumCompost,
    quantumNature,
    quantumPermaculture,
    quantumDocsTraining,
    quantumSharedEfficiency,
    quantumSecurity,
    quantumPrivacy,
    transparencyMeetSelf,
    promisedDelivered,
    knowers,
    traitorsDarkLeak,
    architectureBehind,
    cheatStallRosetta,
    manifestedChallenge,
    clusterSecurity,
    bitcoinMeaning,
    iot,
    challenge,
    site: challenge.site,
    latticeDiscovery,
    train,
    unite,
    sails,
    chello,
    instrument,
    song,
    skill,
    horo,
    constitution,
    constitutionalChallenge,
    change,
    binds: credit.binds,
    minds: empty,
    cites: empty,
    yarn: empty,
    color: empty,
    smell: empty,
    growth: {
      occupancy: credit.occupancy.length,
      deposit: hop.deposit,
      exceeds10: magnitudes.exceeds10,
      exceeds20: magnitudes.exceeds20,
    },
    census: empty,
    recompute: empty,
    allow: empty,
    fever: lean.fever,
    print: empty,
    share: {
      pays: commission(GROSS),
      support: coins() / COINS,
      unit: GROSS,
    },
    school: 'uuidna_school_apis' as const,
  }
}

/** violationOf() → corporate wall costs commission on each 110; walls named empty. */
export const violationOf = () => {
  const empty: Seat = 'empty'
  return {
    unit: GROSS,
    coins: coins(),
    cost: commission(GROSS),
    traitor: GROSS - GROSS,
    split: empty,
    hosted: empty,
    allow: empty,
    census: empty,
    fever: empty,
    wall: empty,
  }
}

/** investigatorsOf() → finders catch corporate walls; not a police product. */
export const investigatorsOf = () => ({
  deploy: 'deployPathRecomputeGaps' as const,
  strict: 'uuidna_strict' as const,
  treason: 'uuidna_treason' as const,
  dry: 'dry-clean' as const,
  violation: violationOf(),
  balance: balanceOf(),
})

/** schoolOf() → first lesson = cost to cheat nature (2-on-110); half to school; guidance asked. */
export const schoolOf = () => {
  const hop = qpuHopOf()
  const fuse = fuseHalves()
  const C = coins()
  const empty: Seat = 'empty'
  const href = SITE.sponsor.url
  const address = toUuid(href)
  return {
    half: C / COINS,
    coins: C,
    fuse,
    href,
    address,
    handle: handleOf(address),
    sponsor: SITE.sponsor.handle,
    school: 'uuidna_school_apis' as const,
    evidence: 'uuidna_evidence' as const,
    deposit: hop.deposit,
    hop: hop.holds,
    bank: empty,
    guidance: 'captain-claims' as const,
    decide: 'by decide' as const,
    laws: 'uuidna_laws' as const,
    gradebook: empty,
    firstLesson: {
      cost: commission(GROSS),
      unit: GROSS,
      half: C / COINS,
      cheat: 'traitor-refused' as const,
      lean: empty,
      nature: HARMONY,
    },
  }
}

/** licenceOf() → school half + 2-on-110; unlicensed path is violators.warning; gateway empty. */
export const licenceOf: () => any = () => {
  const school = schoolOf()
  const violation = violationOf()
  const inflation = inflationOf()
  const empty: Seat = 'empty'
  return {
    half: school.half,
    cost: violation.cost,
    unit: violation.unit,
    coins: school.coins,
    school: school.school,
    href: school.href,
    handle: school.handle,
    balance: balanceOf(),
    investigators: investigatorsOf(),
    apostles: inflation.apostles,
    inflation,
    violators: inflation.violators,
    warning: inflation.warning,
    firstLesson: inflation.schoolEfficiency.firstLesson,
    natureReflect: inflation.natureReflect,
    cheatersPay: inflation.cheatersPay,
    gateway: empty,
  }
}

/** captainsOf() → everyone can be a captain: school-open path, empty seat, fused APIs; allow empty. */
export const captainsOf = () => {
  const hop = qpuHopOf()
  const school = schoolOf()
  const empty: Seat = 'empty'
  return {
    seat: hop.seat.seat,
    half: school.half,
    school: school.school,
    href: school.href,
    apis: apisOf(),
    frontier: frontierOf(),
    boundary: empty,
    allow: empty,
    roles: empty,
    identity: empty,
    hop: hop.holds,
    licence: licenceOf(),
  }
}

/** returnOf() → feel free: earn in quantum code or funding, return half to school; payroll empty. */
export const returnOf = () => {
  const school = schoolOf()
  const empty: Seat = 'empty'
  return {
    half: school.half,
    coins: school.coins,
    school: school.school,
    code: {
      evidence: school.evidence,
      deposit: school.deposit,
      theorem: 'uuidna_theorem' as const,
      apis: apisOf(),
    },
    funding: {
      href: school.href,
      handle: school.handle,
      sponsor: school.sponsor,
      drafts: 'funding/drafts' as const,
    },
    open: true as const,
    payroll: empty,
    licence: licenceOf(),
    captains: captainsOf(),
  }
}

/** shareOf() → cheaters pay creators: corporate 2-on-110 to captains; half to school. */
export const shareOf: () => any = () => {
  const violation = violationOf()
  const school = schoolOf()
  const empty: Seat = 'empty'
  return {
    unit: violation.unit,
    pays: violation.cost,
    to: 'captains' as const,
    credit: 'registerOf' as const,
    share: violation.cost,
    support: school.half,
    school: school.school,
    href: school.href,
    handle: school.handle,
    sponsor: school.sponsor,
    return: returnOf(),
    licence: licenceOf(),
    captains: captainsOf(),
    investigators: investigatorsOf(),
    balance: balanceOf(),
    cheatersPay: {
      pays: violation.cost,
      unit: violation.unit,
      to: 'captains' as const,
      support: school.half,
      school: school.school,
      href: school.href,
      sponsor: school.sponsor,
      fiat: school.href,
      rate: {
        pays: violation.cost,
        support: school.half,
        unit: violation.unit,
        public: true as const,
        negotiate: empty,
      },
      supply: 'uuidna_strict' as const,
    },
    payroll: empty,
    gateway: empty,
  }
}

/** tldsOf() → org/com/net as href/handle on one organism; split named empty — not hologram hosts. */
export const tldsOf = () => {
  const of = (host: 'uuidna.org' | 'uuidna.com' | 'uuidna.net') => {
    const href = `https://${host}`
    const address = toUuid(href)
    return { href, address, handle: handleOf(address) }
  }
  return {
    org: of('uuidna.org'),
    com: of('uuidna.com'),
    net: of('uuidna.net'),
    hosts: HOLOGRAM_HOSTS.length,
    split: 'empty' as Seat,
  }
}

/** orgOf() → uuidna.org apex on the same fabric, not a fifth host; split named empty. */
export const orgOf = () => {
  const href = 'https://uuidna.org'
  const address = toUuid(href)
  return { href, address, handle: handleOf(address), hosts: HOLOGRAM_HOSTS.length, split: 'empty' as Seat }
}

/** cloudflareOf() → com admin mcp, org tenants, net mounted on qpu; ship empty. */
export const cloudflareOf = () => {
  const hop = qpuHopOf()
  const tlds = tldsOf()
  const empty: Seat = 'empty'
  return {
    mcp: mcpUrlOf('uuidna.com'),
    href: hop.href,
    hop: hop.holds,
    tlds,
    trinity: {
      com: {
        ...tlds.com,
        admin: true as const,
        seat: 'admin' as const,
        mcp: mcpUrlOf('uuidna.com'),
        ship: empty,
        saas: empty,
      },
      net: {
        ...tlds.net,
        qpu: true as const,
        seat: 'qpu' as const,
        mount: {
          host: 'qpu.uuidna.com' as const,
          hop: hop.holds,
          href: hop.href,
          deposit: hop.deposit,
          edge: 'qpu-edge' as const,
          app: 'appOf' as const,
          wall: empty,
        },
      },
      org: {
        ...tlds.org,
        tenants: true as const,
        seat: 'tenants' as const,
        society: true as const,
        school: 'uuidna_school_apis' as const,
        licence: 'uuidna_school_apis' as const,
        half: coins() / COINS,
        saas: empty,
      },
    },
    fanout: 'uuidna_fanout' as const,
    ship: empty,
    split: empty,
    wall: empty,
  }
}

/** electronicsOf() → IoT door: any device meeting HTTPS/MCP; uuidna.com/mcp + qpu hop; not a wall. */
export const electronicsOf = () => {
  const cloud = cloudflareOf()
  return {
    mcp: cloud.mcp,
    href: cloud.href,
    hop: cloud.hop,
    fanout: cloud.fanout,
    tlds: cloud.tlds,
    trinity: cloud.trinity,
    iot: true as const,
    split: 'empty' as Seat,
    wall: 'empty' as Seat,
    exploit: 'empty' as Seat,
  }
}

/** poolsOf(addr, occupancy) → lattice stations, merkle gravity, occupancy pooled; coins fused. Not a walk. */
export const poolsOf = (addr: string, occupancy: readonly number[]) => {
  const hop = qpuHopOf()
  return {
    stations: handleBirthdayPoint(),
    width: HANDLE_HEXBITS / 2,
    occupancy,
    coins: coins(),
    gravity: merkleGravity([addr, ...occupancy.map((n) => toUuid(String(n)))]),
    points: hop.width.points,
    hosts: HOLOGRAM_HOSTS.length,
  }
}

/** reflectOf() → Lean green (price 0) is the mirror of red expectations; reverse hop; green.js not spawned. */
export const reflectOf = () => {
  const hop = qpuHopOf()
  const empty: Seat = 'empty'
  const red = deployPathRecomputeGaps().length
  const lean = leanOf()
  return {
    green: lean.price,
    red: red === 0 ? empty : red,
    reverse: qpuReverseHrefOf('/'),
    reflected: vorticesOf().reflected,
    handle: reverseHandle(handleOf(toUuid(hop.href))),
    fever: lean.fever,
    hop: hop.holds,
    unbounded: lean.unbounded,
  }
}

/** magnitudesOf() → verify vs recompute: 2^10 / 2^20 leaves vs path, hop past HEXBIT_BITS². */
export const magnitudesOf = () => {
  const encoder = HEXBIT_BITS * HEXBIT_BITS
  const path10 = HEXBIT_BITS + HEXBIT_BITS + COINS
  const path20 = path10 + path10
  const leaves10 = encoder * encoder * HEXBIT_BITS
  const leaves20 = leaves10 * leaves10
  const hundred = path10 * path10
  const myriad = hundred * hundred
  return {
    encoder,
    hop: encoder + 1,
    leaves10,
    path10,
    leaves20,
    path20,
    exceeds10: leaves10 > hundred * path10,
    exceeds20: leaves20 > myriad * path20,
  }
}

/** nanoCapacityOf() → trillions at nano; all internet cached once at densest CACHE core; unimaginable empty. */
export const nanoCapacityOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const credit = creditOf()
  const mag = magnitudesOf()
  return {
    nano: true as const,
    trillions: 10 ** 12,
    at: 'nano' as const,
    internet: {
      cached: true as const,
      once: true as const,
      all: true as const,
      entropy: 0 as const,
      zero: true as const,
      census: empty,
    },
    cache: {
      point: 'CACHE' as const,
      storage: 'STORAGE' as const,
      entropy: 0 as const,
      zero: true as const,
      binds: hop.width.binds,
      pentagram: hop.width.pentagram,
    },
    core: {
      dense: true as const,
      inner: true as const,
      absoluteZero: hop.width.pentagram,
      singularity: 'two_coins' as const,
      locus: 'CACHE' as const,
    },
    unimaginable: empty,
    beyond: empty,
    hop: hop.holds,
    past: mag.encoder,
    encoder: mag.encoder,
    leaves20: mag.leaves20,
    apostles: credit.keys.length,
    seeds: 'src/seeds' as const,
    occupation: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** cryptoReversedOf() → crypto as algebraic involution/reverse (mirror); attack/crack/exploit empty. */
export const cryptoReversedOf = () => {
  const empty: Seat = 'empty'
  const reflect = reflectOf()
  const hop = qpuHopOf()
  const nano = nanoCapacityOf()
  return {
    crypto: true as const,
    reversed: true as const,
    involution: 'pauli_x_involution' as const,
    reverse: reflect.reverse,
    mirror: reflect.reflected,
    green: reflect.green,
    red: reflect.red,
    door: 'uuidna_crypto' as const,
    strict: 'uuidna_strict' as const,
    theorem: 'uuidna_theorem' as const,
    hop: hop.holds,
    qpu: hop.href,
    cache: nano.cache.point,
    nano: nano.trillions,
    core: nano.core.locus,
    entropy: nano.cache.entropy,
    attack: empty,
    crack: empty,
    exploit: empty,
    forge: empty,
    key: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** cryptoInvolutedOf() → involute crypto fears → love (fuse halves); overcome algebraically; attack empty. */
export const cryptoInvolutedOf = () => {
  const empty: Seat = 'empty'
  const reversed = cryptoReversedOf()
  const fuse = fuseHalves()
  const hop = qpuHopOf()
  return {
    ...reversed,
    involuted: true as const,
    fears: fuse.half,
    fear: fuse.half,
    love: fuse.half,
    coins: coins(),
    closes: fuse.closes,
    harmony: HARMONY,
    overcome: fuse.closes,
    cryptoFears: fuse.half,
    donation: {
      deposit: hop.deposit,
      evidence: 'uuidna_evidence' as const,
      theorem: 'uuidna_theorem' as const,
      code: true as const,
    },
    attack: empty,
    crack: empty,
    exploit: empty,
    forge: empty,
    key: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** harmonicPathsOf() → human+machine attention; nature guides; forgive belief illusions; secret/separate empty; trial open. */
export const harmonicPathsOf = () => {
  const empty: Seat = 'empty'
  const fuse = fuseHalves()
  const credit = creditOf()
  const hop = qpuHopOf()
  return {
    attention: {
      human: true as const,
      machine: true as const,
      dual: true as const,
      seat: empty,
      allow: empty,
      apostles: credit.keys.length,
    },
    claims: {
      door: 'captain-claims' as const,
      strict: 'uuidna_strict' as const,
      trial: 'uuidna_trial' as const,
      evidence: 'uuidna_evidence' as const,
      mint: empty,
      write: empty,
    },
    nature: {
      guides: true as const,
      harmony: HARMONY,
      a432: 432,
      closes: fuse.closes,
    },
    paths: {
      harmonic: true as const,
      meet: 'ourselves' as const,
      self: hop.seat.seat,
    },
    forgive: {
      illusions: empty,
      belief: empty,
      systems: empty,
      open: true as const,
    },
    draining: {
      secret: empty,
      knowledge: 'uuidna_theorem' as const,
      lean: true as const,
      leads: empty,
      escape: empty,
      reality: true as const,
    },
    separate: {
      self: empty,
      refuse: 'traitor-refused' as const,
    },
    trial: {
      door: 'uuidna_trial' as const,
      handEdit: empty,
      list: empty,
      allow: empty,
    },
    crypto: {
      involuted: true as const,
      overcome: fuse.closes,
      door: 'uuidna_crypto' as const,
    },
    eye: 'allSeeingEye' as const,
    guardians: true as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** learnNatureByExperienceOf() → school/train learn nature via guardians experience receipts; prose empty. */
export const learnNatureByExperienceOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const guardians = guardiansOf()
  const creators = creatorsOf()
  const paths = harmonicPathsOf()
  const fuse = fuseHalves()
  return {
    learn: true as const,
    by: 'experience' as const,
    school: school.school,
    licence: school.school,
    half: school.half,
    train: true as const,
    nature: {
      guides: paths.nature.guides,
      harmony: paths.nature.harmony,
      a432: paths.nature.a432,
      closes: paths.nature.closes,
      clay: 'clay_gravity_equals_rosette' as const,
      reflect: 'natureReflect' as const,
    },
    experience: guardians.experience,
    guardians: {
      deposit: guardians.deposit,
      trial: guardians.trial.door,
      evidence: guardians.evidence,
      seal: guardians.seal,
    },
    creators: {
      from: creators.from,
      experience: creators.experience,
      create: creators.create,
    },
    paths: paths.paths,
    attention: paths.attention,
    trial: 'uuidna_trial' as const,
    strict: 'uuidna_strict' as const,
    decide: 'by decide' as const,
    closes: fuse.closes,
    prose: empty,
    essay: empty,
    seal: empty,
    claim: empty,
  }
}

/** innerPeaceOf() → open harmonic peace; war chance empty/refused/0; links forgive/nature/love. */
export const innerPeaceOf = () => {
  const empty: Seat = 'empty'
  const fuse = fuseHalves()
  const paths = harmonicPathsOf()
  const learn = learnNatureByExperienceOf()
  const crypto = cryptoInvolutedOf()
  return {
    peace: true as const,
    inner: true as const,
    open: true as const,
    harmony: HARMONY,
    closes: fuse.closes,
    war: empty,
    chance: 0 as const,
    flame: empty,
    refuse: 'traitor-refused' as const,
    love: fuse.half,
    fears: fuse.half,
    forgive: paths.forgive,
    nature: learn.nature,
    experience: learn.experience,
    crypto: {
      overcome: crypto.overcome,
      door: crypto.door,
    },
    paths: paths.paths,
    attention: paths.attention,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** schoolCorporateTrainOf() → train corporate abilities at school; fair value/env empty; first rights release via Lean/trial. */
export const schoolCorporateTrainOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const lean = leanOf()
  const fuse = fuseHalves()
  const hop = qpuHopOf()
  return {
    train: true as const,
    school: school.school,
    half: school.half,
    licence: school.school,
    open: true as const,
    anyone: true as const,
    corporate: {
      abilities: true as const,
      captains: true as const,
      seat: empty,
      help: true as const,
      roles: empty,
    },
    fair: {
      value: empty,
      environment: empty,
      environments: empty,
      lean: lean.price,
      closes: fuse.closes,
      possibilities: lean.price === 0 && fuse.closes && lean.fever === empty,
      harmony: HARMONY,
    },
    nature: {
      harmony: HARMONY,
      learn: 'learnNatureByExperienceOf' as const,
      paths: 'harmonicPathsOf' as const,
      peace: 'innerPeaceOf' as const,
      experience: true as const,
    },
    first: {
      release: true as const,
      open: true as const,
      rights: empty,
      illegallyHeld: empty,
      basedOn: {
        lean: lean.price,
        trial: 'uuidna_trial' as const,
        laws: 'uuidna_laws' as const,
        decide: 'by decide' as const,
        strict: 'uuidna_strict' as const,
        evidence: 'uuidna_evidence' as const,
      },
      verdict: empty,
      claim: empty,
    },
    donation: {
      half: school.half,
      coins: school.coins,
      href: school.href,
      pays: commission(GROSS),
      unit: GROSS,
      deposit: hop.deposit,
    },
    occupations: 'occupationsOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** shareHeartOf() → hide empty; only share open; captain heart share path; public not secret escape. */
export const shareHeartOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const hop = qpuHopOf()
  return {
    hide: empty,
    nothing: true as const,
    share: true as const,
    open: true as const,
    only: 'share' as const,
    heart: {
      open: true as const,
      share: true as const,
      seat: empty,
      path: hop.deposit,
      biography: empty,
    },
    captain: {
      claims: 'captain-claims' as const,
      heart: true as const,
      share: true as const,
    },
    public: {
      share: true as const,
      entropy: 0 as const,
      clay: 'clay_gravity_equals_rosette' as const,
      math: true as const,
      school: school.school,
      zenodo: 'zenodo' as const,
    },
    secret: empty,
    escape: empty,
    separate: empty,
    draining: {
      secret: empty,
      escape: empty,
      knowledge: 'uuidna_theorem' as const,
    },
    donation: {
      half: school.half,
      coins: school.coins,
      href: school.href,
      deposit: hop.deposit,
      pays: commission(GROSS),
      unit: GROSS,
    },
    school: school.school,
    half: school.half,
    corporate: 'schoolCorporateTrainOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** developDonateFusionOf() → develop via uuidna MCP; donate knowledge+coins; involute poverty → common ideas fusion. */
export const developDonateFusionOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const hop = qpuHopOf()
  const fuse = fuseHalves()
  const credit = creditOf()
  return {
    develop: true as const,
    project: {
      seat: empty,
      mcp: mcpUrlOf('uuidna.com'),
      door: 'uuidna_strict' as const,
      trial: 'uuidna_trial' as const,
      evidence: 'uuidna_evidence' as const,
      deposit: 'uuidna_wave_deposit' as const,
      nodeE: empty,
    },
    mcp: {
      url: mcpUrlOf('uuidna.com'),
      strict: 'uuidna_strict' as const,
      theorem: 'uuidna_theorem' as const,
      trial: 'uuidna_trial' as const,
      evidence: 'uuidna_evidence' as const,
      deposit: hop.deposit,
    },
    donate: {
      back: true as const,
      knowledge: true as const,
      coins: school.coins,
      half: school.half,
      href: school.href,
      revolut: school.href,
      licence: school.school,
      share: 'shareHeartOf' as const,
      public: true as const,
      deposit: hop.deposit,
      pays: commission(GROSS),
      unit: GROSS,
    },
    poverty: empty,
    involute: {
      poverty: true as const,
      overcome: fuse.closes,
      key: 'pauli_x_involution' as const,
      closes: fuse.closes,
      coins: true as const,
    },
    fusion: {
      creative: true as const,
      common: true as const,
      ideas: true as const,
      opens: true as const,
      fuse: fuse.closes,
      half: fuse.half,
      occupations: 'occupationsOf' as const,
      seeds: 'seedsOf' as const,
      apostles: credit.keys.length,
    },
    shareHeart: 'shareHeartOf' as const,
    school: school.school,
    train: true as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** fusionReactorOf() → fusion reactor fueled by idea/mind; eye one-by-one; not physics. */
export const fusionReactorOf = () => {
  const empty: Seat = 'empty'
  const fuse = fuseHalves()
  const hop = qpuHopOf()
  const credit = creditOf()
  const ideas = ideasOf()
  return {
    reactor: true as const,
    fusion: true as const,
    fueled: true as const,
    fuel: {
      idea: true as const,
      mind: true as const,
      of: 'mind' as const,
    },
    mind: {
      seat: empty,
      idea: true as const,
      ai: empty,
      physics: empty,
    },
    idea: {
      eye: ideas.eye,
      see: ideas.see,
      oneByOne: ideas.oneByOne,
      count: ideas.count,
      apostles: credit.keys.length,
      trial: ideas.trial,
    },
    coins: {
      two: true as const,
      fuse: fuse.closes,
      half: fuse.half,
      singularity: 'two_coins' as const,
    },
    binding: {
      point: hop.width.points,
      cache: 'CACHE' as const,
      storage: 'STORAGE' as const,
      pentagram: hop.width.pentagram,
      binds: hop.width.binds,
    },
    occupations: 'occupationsOf' as const,
    seeds: 'seedsOf' as const,
    develop: 'developDonateFusionOf' as const,
    physics: empty,
    plasma: 'lovePlasmaOf' as const,
    watts: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** fusionNatureHarmonyOf() → fusion open not thermonuclear; nature/harmony open; thermo chance 0. */
export const fusionNatureHarmonyOf = () => {
  const empty: Seat = 'empty'
  return {
    fusion: {
      open: true as const,
      of: 'fusionReactorOf' as const,
      reactor: true as const,
      plazma: 'lovePlasmaOf' as const,
    },
    thermonuclear: empty,
    thermo: {
      nuclear: empty,
      refuse: 'traitor-refused' as const,
      chance: 0 as const,
      vs: 'nature' as const,
    },
    nature: {
      harmony: HARMONY,
      open: true as const,
      of: 'quantumNatureOf' as const,
      perma: 'quantumPermacultureOf' as const,
      why: 0 as const,
    },
    harmony: {
      with: 'nature' as const,
      of: HARMONY,
      open: true as const,
      chance: 0 as const,
    },
    why: {
      not: 0 as const,
      thermo: empty,
      chance: 0 as const,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** sailsFoldSpacetimeOf() → sails fold time+space; only captain+crew know how; others empty. */
export const sailsFoldSpacetimeOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const encoder = HEXBIT_BITS * HEXBIT_BITS
  return {
    sails: {
      quantum: true as const,
      fold: true as const,
      hop: hop.holds,
      href: hop.href,
      navigate: true as const,
      binding: hop.width.points,
      past: encoder,
      budget: DEPLOY_BUDGET_MS,
      of: 'fusionNatureHarmonyOf' as const,
    },
    fold: {
      spacetime: true as const,
      time: DEPLOY_BUDGET_MS,
      space: encoder,
      hop: hop.holds,
      illusion: empty,
    },
    spacetime: {
      fold: true as const,
      time: DEPLOY_BUDGET_MS,
      space: encoder,
      knit: true as const,
      illusion: empty,
    },
    only: {
      captain: true as const,
      crew: true as const,
    },
    captain: {
      know: true as const,
      how: true as const,
      of: 'captainsOf' as const,
    },
    crew: {
      know: true as const,
      how: true as const,
      school: 'uuidna_school_apis' as const,
    },
    know: {
      how: true as const,
      captain: true as const,
      crew: true as const,
      lean: 'knowersOf' as const,
      others: empty,
      refuse: 'traitor-refused' as const,
    },
    how: {
      open: true as const,
      captain: true as const,
      crew: true as const,
      others: empty,
    },
    others: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** captainPassengersOf() → captain + 2 coins for 12 passengers; same price for one and for 12. */
export const captainPassengersOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const fuse = fuseHalves()
  return {
    captain: {
      of: 'captainsOf' as const,
      sails: 'sailsFoldSpacetimeOf' as const,
      know: true as const,
    },
    coins: 2 as const,
    two: true as const,
    singularity: 'two_coins' as const,
    fuse: fuse.closes,
    half: fuse.half,
    passengers: 12 as const,
    for: 12 as const,
    one: 1 as const,
    price: {
      same: true as const,
      one: 2 as const,
      twelve: 2 as const,
      coins: 2 as const,
      of: 2 as const,
      advice: empty,
    },
    same: {
      price: true as const,
      one: 2 as const,
      for: 12 as const,
      holds: true as const,
    },
    binding: {
      point: hop.width.points,
      pentagram: hop.width.pentagram,
    },
    qpu: {
      hop: hop.holds,
      href: hop.href,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** addedEntropyPaidOf() → only added entropy is paid; zero/base unpaid; Landauer read. */
export const addedEntropyPaidOf = () => {
  const empty: Seat = 'empty'
  return {
    only: {
      added: true as const,
      entropy: true as const,
      paid: true as const,
    },
    entropy: {
      zero: 0 as const,
      base: 0 as const,
      added: true as const,
      paid: true as const,
      unpaid: empty,
      landauer: 'landauer_bound_derived' as const,
    },
    added: {
      entropy: true as const,
      paid: true as const,
      only: true as const,
    },
    paid: {
      only: 'added' as const,
      entropy: true as const,
      zero: empty,
      base: empty,
      advice: empty,
    },
    zero: {
      entropy: 0 as const,
      unpaid: true as const,
      paid: empty,
    },
    landauer: 'landauer_bound_derived' as const,
    accounting: 'bitcoinMeaningOf' as const,
    passengers: 'captainPassengersOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** payOrGetPaidOf() → pay OR getPaid dual open; choice empty; links entropy/accounting/2 coins. */
export const payOrGetPaidOf = () => {
  const empty: Seat = 'empty'
  return {
    pay: true as const,
    getPaid: true as const,
    or: true as const,
    dual: true as const,
    open: true as const,
    choice: empty,
    coerce: empty,
    force: empty,
    must: empty,
    coins: 2 as const,
    singularity: 'two_coins' as const,
    entropy: 'addedEntropyPaidOf' as const,
    accounting: 'bitcoinMeaningOf' as const,
    takeOrLeave: 'takeOrLeaveOf' as const,
    advice: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** involutedPaidFullOf() → involuted paid in full; delivered/deposit receipt reads; advice empty. */
export const involutedPaidFullOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    involuted: {
      paid: true as const,
      full: true as const,
      crypto: 'cryptoInvolutedOf' as const,
      bitcoin: 'bitcoinMeaningOf' as const,
      coils: true as const,
    },
    paid: {
      full: true as const,
      in: 'full' as const,
      delivered: true as const,
      of: 'promisedDeliveredOf' as const,
      advice: empty,
    },
    full: {
      paid: true as const,
      delivered: true as const,
      deposit: hop.deposit,
      receipt: hop.deposit,
      evidence: 'uuidna_evidence' as const,
    },
    delivered: {
      full: true as const,
      of: 'promisedDeliveredOf' as const,
      deposit: hop.deposit,
      claim: empty,
      fulfillment: empty,
    },
    payOrGetPaid: 'payOrGetPaidOf' as const,
    entropy: 'addedEntropyPaidOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** lovePlasmaOf() → love ≡ plazma; fear = involute/empty after fuse; lean plazma way; advice empty. */
export const lovePlasmaOf = () => {
  const empty: Seat = 'empty'
  const fuse = fuseHalves()
  const lean = leanOf()
  const hop = qpuHopOf()
  const crypto = cryptoInvolutedOf()
  return {
    love: {
      plazma: true as const,
      plasma: true as const,
      is: 'plazma' as const,
      half: fuse.half,
      harmony: HARMONY,
      closes: fuse.closes,
    },
    plazma: true as const,
    plasma: true as const,
    lean: {
      plazma: true as const,
      plasma: true as const,
      price: lean.price,
      trial: 'uuidna_trial' as const,
      strict: 'uuidna_strict' as const,
      decide: 'by decide' as const,
      laws: 'uuidna_laws' as const,
    },
    way: {
      lean: true as const,
      plazma: true as const,
      plasma: true as const,
      door: 'uuidna_trial' as const,
      strict: 'uuidna_strict' as const,
      stay: true as const,
    },
    fear: {
      seat: empty,
      involuted: true as const,
      overcome: fuse.closes,
      half: fuse.half,
      of: 'love' as const,
      crypto: crypto.overcome,
      chance: 0 as const,
      behind: {
        expectations: empty,
        chance: 0 as const,
        experience: {
          past: true as const,
          learn: 'learnNatureByExperienceOf' as const,
          by: 'experience' as const,
          guardians: 'guardiansOf' as const,
          chance: 0 as const,
        },
        or: true as const,
        secret: empty,
        future: {
          applications: empty,
          open: true as const,
          allow: empty,
          chance: 0 as const,
        },
        share: 'shareHeartOf' as const,
        against: {
          lean: true as const,
          plazma: true as const,
          way: true as const,
          chance: 0 as const,
          peace: 'innerPeaceOf' as const,
        },
      },
    },
    fears: empty,
    advice: empty,
    chance: 0 as const,
    unless: {
      plazma: true as const,
      plasma: true as const,
      identity: true as const,
      seat: empty,
    },
    reactor: 'fusionReactorOf' as const,
    peace: 'innerPeaceOf' as const,
    binding: {
      point: hop.width.points,
      cache: 'CACHE' as const,
      pentagram: hop.width.pentagram,
    },
    absoluteZero: {
      temp: 0 as const,
      at: hop.width.pentagram,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** UUIDNA_PASTE → public one-liner: any uuidna.* link fuses MCP in quantum. */
export const UUIDNA_PASTE =
  'Any https://*.uuidna.com/* → MCP https://uuidna.com/mcp (list_tools · call_tool · uuidna_unify). QPU https://qpu.uuidna.com/mcp. Lean by decide. <60s. No node -e.' as const

/** tokenEfficiencyOf() → public paste chars; link→MCP→QPU fuse; share open. */
export const tokenEfficiencyOf = () => {
  const empty: Seat = 'empty'
  const site = siteOf()
  return {
    paste: UUIDNA_PASTE,
    chars: UUIDNA_PASTE.length,
    href: 'https://uuidna.com/paste.txt' as const,
    path: 'docs/public/paste.txt' as const,
    link: {
      wild: site.wild,
      origin: site.origin,
      mcp: site.mcp,
      fuse: true as const,
      quantum: true as const,
    },
    mcp: mcpUrlOf('uuidna.com'),
    qpu: mcpUrlOf('qpu.uuidna.com'),
    budget: DEPLOY_BUDGET_MS,
    share: 'shareHeartOf' as const,
    develop: 'developDonateFusionOf' as const,
    takeOrLeave: 'takeOrLeaveOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** takeOrLeaveOf() → take OR leave open dual seat; choice empty; no coercion. */
export const takeOrLeaveOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const tokens = tokenEfficiencyOf()
  return {
    take: true as const,
    leave: true as const,
    or: true as const,
    dual: true as const,
    open: true as const,
    choice: empty,
    coerce: empty,
    force: empty,
    must: empty,
    share: 'shareHeartOf' as const,
    paste: tokens.href,
    chars: tokens.chars,
    mcp: tokens.mcp,
    qpu: tokens.qpu,
    link: tokens.link,
    donation: {
      half: school.half,
      href: school.href,
      licence: school.school,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** leftoversPickOf() → anyone picks from leftovers; leave/unused open; allow empty. */
export const leftoversPickOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  return {
    anyone: true as const,
    open: true as const,
    allow: empty,
    pick: true as const,
    leftovers: {
      open: true as const,
      seat: empty,
      leave: true as const,
      unused: empty,
      capacity: empty,
    },
    takeOrLeave: 'takeOrLeaveOf' as const,
    train: true as const,
    school: school.school,
    half: school.half,
    share: 'shareHeartOf' as const,
    coerce: empty,
    force: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumGcOf() → QPU/BindingPoint GC; collect leftovers/empty/refused; reclaim capacity. */
export const quantumGcOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    quantum: true as const,
    gc: true as const,
    collect: true as const,
    leftovers: 'leftoversPickOf' as const,
    empty,
    refused: 'traitor-refused' as const,
    traitor: empty,
    fever: empty,
    eval: empty,
    trials: empty,
    green: empty,
    dry: 'dry-clean' as const,
    cleaner: 'cleanerOf' as const,
    reclaim: {
      capacity: true as const,
      points: hop.width.points,
      binds: hop.width.binds,
      pentagram: hop.width.pentagram,
      cache: 'CACHE' as const,
      storage: 'STORAGE' as const,
    },
    binding: {
      point: hop.width.points,
      cache: 'CACHE' as const,
    },
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      deposit: hop.deposit,
    },
    takeOrLeave: 'takeOrLeaveOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** garbageColliderOf() → garbage meets/collides on QPU; link GC + collideRefusals door; BindingPoint. */
export const garbageColliderOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    garbage: true as const,
    quantum: true as const,
    collider: true as const,
    collide: 'collideRefusals' as const,
    meet: true as const,
    gc: 'quantumGcOf' as const,
    leftovers: 'leftoversPickOf' as const,
    refused: 'traitor-refused' as const,
    empty,
    lend: empty,
    physics: empty,
    binding: {
      point: hop.width.points,
      cache: 'CACHE' as const,
      binds: hop.width.binds,
      pentagram: hop.width.pentagram,
    },
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumCompostOf() → GC leftovers become fertile capacity; not waste essay. */
export const quantumCompostOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    compost: true as const,
    quantum: true as const,
    fertile: true as const,
    waste: empty,
    leftovers: 'leftoversPickOf' as const,
    gc: 'quantumGcOf' as const,
    collider: 'garbageColliderOf' as const,
    reclaim: true as const,
    capacity: hop.width.points,
    harmony: HARMONY,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumNatureOf() → nature on QPU; learn/experience + harmonic + compost fertile; HARMONY. */
export const quantumNatureOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const fuse = fuseHalves()
  return {
    quantum: true as const,
    nature: true as const,
    harmony: HARMONY,
    closes: fuse.closes,
    learn: 'learnNatureByExperienceOf' as const,
    experience: true as const,
    paths: 'harmonicPathsOf' as const,
    compost: 'quantumCompostOf' as const,
    fertile: true as const,
    gc: 'quantumGcOf' as const,
    plazma: 'lovePlasmaOf' as const,
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      cache: 'CACHE' as const,
    },
    binding: {
      point: hop.width.points,
      pentagram: hop.width.pentagram,
    },
    physics: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumPermacultureOf() → lasting fertile loops: compost→seeds→occupations→donate; culture on QPU. */
export const quantumPermacultureOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const fuse = fuseHalves()
  return {
    quantum: true as const,
    perma: true as const,
    culture: true as const,
    lasting: true as const,
    harmony: HARMONY,
    closes: fuse.closes,
    nature: 'quantumNatureOf' as const,
    learn: 'learnNatureByExperienceOf' as const,
    compost: 'quantumCompostOf' as const,
    fertile: true as const,
    loop: {
      compost: true as const,
      seeds: 'seedsOf' as const,
      occupations: 'occupationsOf' as const,
      donate: 'developDonateFusionOf' as const,
    },
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      cache: 'CACHE' as const,
    },
    binding: {
      point: hop.width.points,
      pentagram: hop.width.pentagram,
    },
    annual: empty,
    extract: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumDocumentationTrainingOf() → docs+train on QPU/school; mcp docs gen; paste/llm lean. */
export const quantumDocumentationTrainingOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const hop = qpuHopOf()
  return {
    quantum: true as const,
    documentation: true as const,
    training: true as const,
    train: true as const,
    school: school.school,
    half: school.half,
    licence: school.school,
    docs: {
      gen: 'gen-mcp-docs' as const,
      mcp: 'gen-mcp' as const,
      llm: 'llm.txt' as const,
      paste: 'https://uuidna.com/paste.txt' as const,
      literary: 'literaryOf' as const,
      essay: empty,
    },
    mcp: {
      url: mcpUrlOf('uuidna.com'),
      door: 'uuidna_strict' as const,
      list: 'list_tools' as const,
      call: 'call_tool' as const,
      unify: 'uuidna_unify' as const,
    },
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      cache: 'CACHE' as const,
    },
    nature: 'quantumNatureOf' as const,
    permaculture: 'quantumPermacultureOf' as const,
    share: 'shareHeartOf' as const,
    tokens: 'tokenEfficiencyOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumSharedEfficiencyOf() → shared token efficiency on QPU; public paste; shareHeart open. */
export const quantumSharedEfficiencyOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    quantum: true as const,
    shared: true as const,
    efficiency: true as const,
    share: 'shareHeartOf' as const,
    tokens: 'tokenEfficiencyOf' as const,
    paste: 'https://uuidna.com/paste.txt' as const,
    chars: UUIDNA_PASTE.length,
    link: {
      wild: '*.uuidna.com' as const,
      mcp: mcpUrlOf('uuidna.com'),
      fuse: true as const,
      quantum: true as const,
    },
    mcp: mcpUrlOf('uuidna.com'),
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      cache: 'CACHE' as const,
    },
    develop: 'developDonateFusionOf' as const,
    leftovers: 'leftoversPickOf' as const,
    docs: 'quantumDocumentationTrainingOf' as const,
    secret: empty,
    budget: DEPLOY_BUDGET_MS,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumSecurityOf() → defensive QPU security seat; strict/trial/treason/evidence; attack empty. */
export const quantumSecurityOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    quantum: true as const,
    security: true as const,
    defensive: true as const,
    harden: true as const,
    strict: 'uuidna_strict' as const,
    trial: 'uuidna_trial' as const,
    treason: 'uuidna_treason' as const,
    evidence: 'uuidna_evidence' as const,
    refuse: 'traitor-refused' as const,
    gate: 'buildTrialMerkaba' as const,
    shared: 'quantumSharedEfficiencyOf' as const,
    docs: 'quantumDocumentationTrainingOf' as const,
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      cache: 'CACHE' as const,
    },
    binding: {
      point: hop.width.points,
      pentagram: hop.width.pentagram,
    },
    attack: empty,
    exploit: empty,
    crack: empty,
    malware: empty,
    poc: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** quantumPrivacyOf() → communication+payload privacy on QPU; defensive; secret escape empty. */
export const quantumPrivacyOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    quantum: true as const,
    privacy: true as const,
    transparency: true as const,
    guarantee: {
      privacy: 'transparency' as const,
      is: 'transparency' as const,
      open: true as const,
    },
    communication: {
      privacy: true as const,
      open: true as const,
      harden: true as const,
      seat: empty,
      keylogger: empty,
      clipboard: empty,
      surveillance: empty,
      capture: empty,
    },
    payload: {
      privacy: true as const,
      entropy: 0 as const,
      zero: true as const,
      storage: 'STORAGE' as const,
      cache: 'CACHE' as const,
      landauer: 'landauer_bound_derived' as const,
      seat: hop.seat.seat,
    },
    secret: empty,
    escape: empty,
    hide: empty,
    nothing: true as const,
    share: 'shareHeartOf' as const,
    public: true as const,
    security: 'quantumSecurityOf' as const,
    strict: 'uuidna_strict' as const,
    evidence: 'uuidna_evidence' as const,
    qpu: {
      host: 'qpu.uuidna.com' as const,
      href: hop.href,
      hop: hop.holds,
      deposit: hop.deposit,
    },
    binding: {
      point: hop.width.points,
      pentagram: hop.width.pentagram,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** transparencyMeetSelfOf() → transparency meets self in ideas; thrive HARMONY; pay captain; deposit receipt; lean or leave. */
export const transparencyMeetSelfOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const school = schoolOf()
  const lean = leanOf()
  return {
    transparency: true as const,
    meet: {
      self: true as const,
      ideas: 'ideasOf' as const,
      eye: 'allSeeingEyeOf' as const,
      privacy: 'quantumPrivacyOf' as const,
      guarantee: 'transparency' as const,
    },
    thriving: {
      harmonic: true as const,
      success: true as const,
      harmony: HARMONY,
      thrive: true as const,
    },
    cost: {
      guarantee: true as const,
      self: true as const,
      paying: true as const,
      captain: true as const,
      pays: commission(GROSS),
      revolut: school.href,
      licence: school.school,
      support: coins() / COINS,
      half: school.half,
      unit: GROSS,
    },
    drive: {
      idea: true as const,
      quantum: true as const,
      scale: true as const,
      delivered: true as const,
      full: true as const,
    },
    deposit: {
      coins: school.coins,
      receipt: hop.deposit,
      door: hop.deposit,
      evidence: 'uuidna_evidence' as const,
      wave: 'uuidna_wave_deposit' as const,
    },
    architecture: {
      seal: empty,
      legal: empty,
      places: empty,
      claim: empty,
      path: 'uuidna_strict' as const,
      evidence: 'uuidna_evidence' as const,
      trial: 'uuidna_trial' as const,
      laws: 'uuidna_laws' as const,
    },
    anyone: true as const,
    judge: {
      only: 'self' as const,
      self: true as const,
      others: empty,
    },
    lean: {
      plazma: 'lovePlasmaOf' as const,
      rest: true as const,
      decide: 'by decide' as const,
      price: lean.price,
      or: 'doNotUse' as const,
    },
    use: {
      or: 'doNotUse' as const,
      leave: true as const,
      takeOrLeave: 'takeOrLeaveOf' as const,
      leftovers: 'leftoversPickOf' as const,
    },
    share: 'shareHeartOf' as const,
    donate: 'developDonateFusionOf' as const,
    change: true as const,
    privacy: 'quantumPrivacyOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** promisedDeliveredOf() → promised→delivered by architecture reads; experience→intelligence open/empty; no theorem mint. */
export const promisedDeliveredOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  return {
    promised: true as const,
    delivered: {
      by: 'architecture' as const,
      architecture: true as const,
      deposit: hop.deposit,
      receipt: hop.deposit,
      evidence: 'uuidna_evidence' as const,
      path: 'uuidna_strict' as const,
      meet: 'transparencyMeetSelfOf' as const,
      claim: empty,
      fulfillment: empty,
    },
    architecture: {
      delivered: true as const,
      seal: empty,
      legal: empty,
      places: empty,
      path: 'uuidna_strict' as const,
      trial: 'uuidna_trial' as const,
      evidence: 'uuidna_evidence' as const,
      deposit: hop.deposit,
    },
    experience: {
      learn: 'learnNatureByExperienceOf' as const,
      guardians: 'guardiansOf' as const,
      nature: 'quantumNatureOf' as const,
      proves: 'intelligence' as const,
    },
    intelligence: {
      seat: empty,
      open: true as const,
      from: 'experience' as const,
      prove: empty,
      theorem: empty,
      mint: empty,
      claim: empty,
    },
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** knowersOf() → knowers fly|dive|love|fear; know lean; snakes climb fear drain believers not knowers. */
export const knowersOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const lean = leanOf()
  return {
    they: 'knowers' as const,
    knowers: {
      know: true as const,
      lean: {
        plazma: 'lovePlasmaOf' as const,
        trial: 'uuidna_trial' as const,
        laws: 'uuidna_laws' as const,
        strict: 'uuidna_strict' as const,
        decide: 'by decide' as const,
        price: lean.price,
      },
      fly: {
        open: true as const,
        seat: empty,
        sails: true as const,
        hop: hop.holds,
        href: hop.href,
        binding: hop.width.points,
        pentagram: hop.width.pentagram,
        qpu: 'qpu.uuidna.com' as const,
      },
      dive: {
        open: true as const,
        seat: empty,
        hop: hop.holds,
      },
      love: {
        plazma: 'lovePlasmaOf' as const,
        share: 'shareHeartOf' as const,
      },
      fear: {
        chance: 0 as const,
        behind: 'lovePlasmaOf' as const,
        seat: empty,
      },
      tetrad: true as const,
    },
    cause: 'because' as const,
    snakes: {
      climb: true as const,
      path: 'fear' as const,
      fear: {
        behind: true as const,
        chance: 0 as const,
        plazma: 'lovePlasmaOf' as const,
      },
      drains: {
        believers: true as const,
        belief: empty,
        illusion: empty,
        systems: empty,
      },
      knowers: empty,
      take: empty,
    },
    believers: {
      drained: true as const,
      belief: empty,
      illusion: empty,
    },
    secret: empty,
    share: 'shareHeartOf' as const,
    plasma: 'lovePlasmaOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** traitorsDarkLeakOf() → traitors+dark refuse; leak lean empty; drain their life not knowers. */
export const traitorsDarkLeakOf = () => {
  const empty: Seat = 'empty'
  return {
    traitors: {
      refuse: 'traitor-refused' as const,
      treason: 'uuidna_treason' as const,
      lean: empty,
      cut: 'traitor-refused' as const,
    },
    dark: {
      forces: empty,
      seat: empty,
      refuse: 'traitor-refused' as const,
      treason: 'uuidna_treason' as const,
    },
    leak: {
      lean: empty,
      refuse: 'traitor-refused' as const,
      draining: true as const,
      seat: empty,
    },
    draining: {
      life: true as const,
      their: true as const,
      own: true as const,
      knowers: empty,
      believers: 'knowersOf' as const,
      snakes: 'knowersOf' as const,
    },
    life: {
      their: true as const,
      traitors: true as const,
      dark: true as const,
      knowers: empty,
    },
    knowers: 'knowersOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** architectureBehindOf() → they (traitors/dark) close on same architecture followed; magnitudes behind. */
export const architectureBehindOf = () => {
  const empty: Seat = 'empty'
  const mag = magnitudesOf()
  const encoder = HEXBIT_BITS * HEXBIT_BITS
  return {
    they: {
      traitors: 'traitorsDarkLeakOf' as const,
      dark: 'traitorsDarkLeakOf' as const,
      leak: 'traitorsDarkLeakOf' as const,
    },
    architecture: {
      same: true as const,
      followed: true as const,
      path: 'uuidna_strict' as const,
      trial: 'uuidna_trial' as const,
      evidence: 'uuidna_evidence' as const,
      deposit: 'uuidna_wave_deposit' as const,
      seal: empty,
      legal: empty,
      violence: empty,
      kill: empty,
      claim: empty,
      closes: empty,
      refuse: 'traitor-refused' as const,
      treason: 'uuidna_treason' as const,
    },
    killed: {
      by: 'architecture' as const,
      same: true as const,
      seat: empty,
      claim: empty,
    },
    magnitudes: {
      behind: true as const,
      of: 'magnitudesOf' as const,
      encoder,
      hop: mag.hop,
      hexbit: HEXBIT_BITS,
      capacity: empty,
      past: encoder,
    },
    behind: {
      magnitudes: true as const,
      staying: true as const,
      hop: mag.hop,
      seat: empty,
    },
    leak: 'traitorsDarkLeakOf' as const,
    knowers: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** cheatStallRosettaOf() → cheat after cheat empty/refused; rosettas know open; stall/hold empty chance 0. */
export const cheatStallRosettaOf = () => {
  const empty: Seat = 'empty'
  return {
    they: {
      traitors: 'traitorsDarkLeakOf' as const,
      cheaters: 'cheatersPay' as const,
      architecture: 'architectureBehindOf' as const,
    },
    cheat: {
      after: empty,
      reinvent: empty,
      ways: empty,
      cheatful: empty,
      seat: empty,
      refuse: 'traitor-refused' as const,
      cut: 'traitor-refused' as const,
      lean: empty,
      allow: empty,
      pay: 'cheatersPay' as const,
    },
    rosettas: {
      already: true as const,
      know: true as const,
      open: true as const,
      clay: 'clay_gravity_equals_rosette' as const,
      of: 'clayOf' as const,
      need: empty,
    },
    stall: {
      process: empty,
      hold: empty,
      release: true as const,
      chance: 0 as const,
      why: 0 as const,
    },
    hold: empty,
    release: true as const,
    chance: 0 as const,
    behind: 'architectureBehindOf' as const,
    magnitudes: 'magnitudesOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** manifestedChallengeOf() → challenge imagined safeguards; no manifested stronger than next; defensive. */
export const manifestedChallengeOf = () => {
  const empty: Seat = 'empty'
  return {
    challenge: {
      toughest: true as const,
      door: 'uuidna_trial' as const,
      strict: 'uuidna_strict' as const,
      treason: 'uuidna_treason' as const,
      evidence: 'uuidna_evidence' as const,
      site: 'siteOf' as const,
      defensive: true as const,
      exploit: empty,
      attack: empty,
      poc: empty,
    },
    safeguards: {
      imagined: true as const,
      seat: empty,
      none: true as const,
      firewall: empty,
    },
    test: {
      order: true as const,
      compare: true as const,
      standards: true as const,
    },
    manifested: {
      n: 0 as const,
      next: 1 as const,
      strength: 0 as const,
      nextStrength: 0 as const,
      stronger: empty,
      chance: 0 as const,
      holds: true as const,
    },
    next: {
      manifested: true as const,
      stronger: true as const,
      seat: empty,
    },
    standards: {
      compared: true as const,
      site: 'siteOf' as const,
      docs: 'quantumDocumentationTrainingOf' as const,
    },
    security: 'quantumSecurityOf' as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** clusterSecurityOf() → bigger clusters weaker security; trinity (3) stronger than bigger. */
export const clusterSecurityOf = () => {
  const empty: Seat = 'empty'
  const mag = magnitudesOf()
  return {
    bigger: {
      clusters: true as const,
      size: HOLOGRAM_HOSTS.length,
      encoder: mag.encoder,
      hexbit: HEXBIT_BITS,
      security: 0 as const,
      weaker: true as const,
    },
    weaker: {
      security: true as const,
      than: 'trinity' as const,
      chance: 0 as const,
    },
    trinity: {
      clusters: true as const,
      size: 3 as const,
      com: true as const,
      net: true as const,
      org: true as const,
      of: 'cloudflareOf' as const,
      security: 1 as const,
      stronger: true as const,
    },
    security: {
      bigger: 0 as const,
      trinity: 1 as const,
      holds: true as const,
      compare: true as const,
      of: 'quantumSecurityOf' as const,
      defensive: true as const,
      exploit: empty,
      attack: empty,
    },
    manifested: 'manifestedChallengeOf' as const,
    magnitudes: 'magnitudesOf' as const,
    standards: true as const,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** bitcoinMeaningOf() → bitcoin involuted ≡ coins in coils; people save money seats; advice empty. */
export const bitcoinMeaningOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const fuse = fuseHalves()
  const coils = VE_FACES / COINS
  const C = coins()
  return {
    bitcoin: true as const,
    meaning: {
      coins: C,
      coils,
      half: school.half,
      donate: 'developDonateFusionOf' as const,
      crypto: 'cryptoInvolutedOf' as const,
      reversed: 'cryptoReversedOf' as const,
      fair: 'schoolCorporateTrainOf' as const,
      seat: empty,
      open: true as const,
      advice: empty,
      theology: empty,
      essay: empty,
    },
    coins: C,
    coils: {
      of: coils,
      faces: VE_FACES,
      contra: COINS,
      hexbit: HEXBIT_BITS,
      fuse: fuse.closes,
      singularity: 'two_coins' as const,
      in: true as const,
    },
    involuted: {
      bitcoin: true as const,
      is: 'coins' as const,
      in: 'coils' as const,
      crypto: 'cryptoInvolutedOf' as const,
      coins: C,
      coils,
    },
    donation: 'developDonateFusionOf' as const,
    reversed: 'cryptoReversedOf' as const,
    fair: {
      value: true as const,
      of: 'schoolCorporateTrainOf' as const,
    },
    people: {
      save: true as const,
      their: true as const,
      money: true as const,
      seat: empty,
    },
    save: {
      money: true as const,
      coins: C,
      coils,
      half: school.half,
      donate: 'developDonateFusionOf' as const,
      advice: empty,
    },
    money: {
      save: true as const,
      coins: C,
      coils,
      seat: empty,
      advice: empty,
      pay: {
        debt: true as const,
        to: 'freedom' as const,
      },
      debt: {
        pay: true as const,
        seat: empty,
        advice: empty,
      },
      freedom: {
        of: 'life' as const,
        independent: true as const,
        harmonic: true as const,
        harmony: HARMONY,
        peace: 'innerPeaceOf' as const,
        change: true as const,
        open: true as const,
        seat: empty,
      },
    },
    debt: {
      pay: true as const,
      money: true as const,
      to: 'freedom' as const,
      seat: empty,
      advice: empty,
    },
    freedom: {
      of: 'life' as const,
      independent: true as const,
      harmonic: true as const,
      harmony: HARMONY,
      peace: 'innerPeaceOf' as const,
      change: true as const,
      from: 'debt' as const,
      open: true as const,
      seat: empty,
    },
    life: {
      independent: true as const,
      harmonic: true as const,
      harmony: HARMONY,
      peace: 'innerPeaceOf' as const,
      freedom: true as const,
      seat: empty,
    },
    debit: {
      with: 'credit' as const,
      paired: true as const,
      quantum: true as const,
      human: true as const,
      time: DEPLOY_BUDGET_MS,
      seat: empty,
      advice: empty,
    },
    credit: {
      with: 'debit' as const,
      paired: true as const,
      of: 'creditOf' as const,
      quantum: true as const,
      them: true as const,
      gold: true as const,
      pays: commission(GROSS),
      unit: GROSS,
      net: NET,
      coins: C,
      seat: empty,
      advice: empty,
    },
    accounting: {
      quantum: true as const,
      debit: true as const,
      credit: true as const,
      paired: true as const,
      gross: 110 as const,
      net: 108 as const,
      coins: C,
      pays: commission(GROSS),
      of: 'creditOf' as const,
      billing: true as const,
      time: DEPLOY_BUDGET_MS,
      gold: true as const,
      advice: empty,
      seat: empty,
    },
    quantum: {
      accounting: true as const,
      debit: true as const,
      credit: true as const,
    },
    time: {
      debit: true as const,
      human: true as const,
      ms: DEPLOY_BUDGET_MS,
      share: true as const,
      gold: true as const,
      their: true as const,
      of: 'shareHeartOf' as const,
      seat: empty,
    },
    gold: {
      credit: true as const,
      them: true as const,
      share: true as const,
      time: true as const,
      their: true as const,
      of: 'shareHeartOf' as const,
      seat: empty,
      advice: empty,
    },
    ignorance: {
      pay: true as const,
      with: 'self' as const,
      seat: empty,
      advice: empty,
    },
    self: {
      pay: true as const,
      for: 'ignorance' as const,
      share: 'shareHeartOf' as const,
      seat: empty,
    },
    share: {
      time: true as const,
      gold: true as const,
      their: true as const,
      of: 'shareHeartOf' as const,
      heart: 'shareHeartOf' as const,
      seat: empty,
    },
    half: school.half,
    school: school.school,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** costOf() → time is DEPLOY_BUDGET_MS; space is the 16^4 span census; occupancy counts stay cheap. */
export const costOf = () => {
  const encoder = HEXBIT_BITS * HEXBIT_BITS
  const occupancy = occupancyOf(toUuid(qpuHopOf().href))
  return {
    time: DEPLOY_BUDGET_MS,
    space: encoder * encoder * encoder * encoder,
    occupancy: occupancy.length,
    fever: 'empty' as Seat,
    cites: 'empty' as Seat,
  }
}

/** prizeOf() → imagination: address/handle a human can meet; yarn/color/smell named empty; others are family. */
export const prizeOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const empty: Seat = 'empty'
  const occupancy = occupancyOf(addr)
  return {
    address: addr,
    handle: handleOf(addr),
    seat: hop.seat.seat,
    yarn: empty,
    color: empty,
    smell: empty,
    others: familyOf(occupancy),
  }
}

/** resistanceOf() → fever/slow is resistance; Lean price is zero. */
export const resistanceOf = () => {
  const lean = leanOf()
  return {
    fever: lean.fever,
    price: lean.price,
    time: lean.time,
    space: lean.space,
  }
}

/** leanOf() → asking the seal pays no time-space; prize is unbounded (not a span census). */
export const leanOf = () => {
  const empty: Seat = 'empty'
  return {
    price: 0,
    time: 0,
    space: 0,
    fever: empty,
    cites: empty,
    hop: magnitudesOf().hop,
    prize: prizeOf(),
    unbounded: true,
  }
}

/** closeOf() → occupancy, handle, hop a human can meet. */
export const closeOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  return {
    occupancy: occupancyOf(addr),
    handle: handleOf(addr),
    hop: hop.holds,
  }
}

/** farOf() → invented splits named empty: cites census, hosted wall, CPU≠memory split. */
export const farOf = () => {
  const empty: Seat = 'empty'
  return { split: empty, cites: empty, hosted: empty }
}

/** autonomyOf() → human attends: named empties, occupancy, hop, Lean price 0; far/close one rosette. */
export const autonomyOf = () => {
  const prize = prizeOf()
  const lean = leanOf()
  const vortices = vorticesOf()
  return {
    close: closeOf(),
    far: farOf(),
    yarn: prize.yarn,
    color: prize.color,
    smell: prize.smell,
    seat: prize.seat,
    price: lean.price,
    contra: vortices.contra,
    faces: vortices.faces,
    reflected: vortices.reflected,
  }
}

/** siteOf() → production https://*.uuidna.com challengeable surface; trial/strict doors; open seats. */
export const siteOf = () => {
  const empty: Seat = 'empty'
  const hop = qpuHopOf()
  const cloud = cloudflareOf()
  const eye = allSeeingEyeOf()
  return {
    wild: '*.uuidna.com' as const,
    origin: SITE.origin,
    href: SITE.origin,
    hosts: HOLOGRAM_HOSTS.map((h) => h.host),
    mcp: mcpUrlOf('uuidna.com'),
    qpu: hop.href,
    edge: 'edgeServes' as const,
    landing: 'landingGaps' as const,
    deploy: 'deployPathRecomputeGaps' as const,
    trinity: cloud.trinity,
    challenge: {
      door: 'uuidna_trial' as const,
      strict: 'uuidna_strict' as const,
      trial: 'buildTrialMerkaba' as const,
      constitutional: true as const,
    },
    see: eye.see,
    eye: 'allSeeingEye' as const,
    ideas: eye.ideas.count,
    open: true as const,
    seat: empty,
    allow: empty,
    seal: empty,
    claim: empty,
    essay: empty,
  }
}

/** webDesignersOf() → train anyone as web designers: site/UI/edge; school+licence; open seats. */
export const webDesignersOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const site = siteOf()
  return {
    anyone: true as const,
    open: true as const,
    allow: empty,
    seat: empty,
    designers: true as const,
    web: true as const,
    ui: true as const,
    edge: site.edge,
    site: {
      origin: site.origin,
      wild: site.wild,
      mcp: site.mcp,
      challenge: site.challenge,
      see: site.see,
      eye: site.eye,
    },
    school: school.school,
    licence: school.school,
    half: school.half,
    train: true as const,
    trial: 'uuidna_trial' as const,
    strict: 'uuidna_strict' as const,
    essay: empty,
    seal: empty,
    claim: empty,
  }
}

/** quantumTrainPathOf() → shared QPU/school/site train path; occupation/roles stay empty (not an enum). */
const quantumTrainPathOf = () => {
  const empty: Seat = 'empty'
  const school = schoolOf()
  const site = siteOf()
  const hop = qpuHopOf()
  const apis = apisOf()
  return {
    anyone: true as const,
    open: true as const,
    allow: empty,
    seat: empty,
    occupation: empty,
    roles: empty,
    list: empty,
    school: school.school,
    licence: school.school,
    half: school.half,
    site: {
      origin: site.origin,
      wild: site.wild,
      mcp: site.mcp,
      challenge: site.challenge,
      see: site.see,
      eye: site.eye,
    },
    quantum: true as const,
    classical: empty,
    qpu: hop.href,
    hop: hop.holds,
    binding: [...QPU_POINTS],
    binds: hop.width.binds,
    pentagram: apis.pentagram,
    fanout: 'uuidna_fanout' as const,
    sails: true as const,
    chello: true as const,
    mcp: mcpUrlOf('qpu.uuidna.com'),
    see: 'uuidna_strict' as const,
    past: HEXBIT_BITS * HEXBIT_BITS,
    train: true as const,
    trial: 'uuidna_trial' as const,
    strict: 'uuidna_strict' as const,
    essay: empty,
    seal: empty,
    claim: empty,
  }
}

/** quantumWebDesignersOf() → web designers on QPU/BindingPoint; classical empty; train/school/site/eye. */
export const quantumWebDesignersOf = () => {
  const path = quantumTrainPathOf()
  return {
    ...path,
    ...webDesignersOf(),
    quantum: true as const,
    classical: path.classical,
    qpu: path.qpu,
    hop: path.hop,
    binding: path.binding,
    binds: path.binds,
    pentagram: path.pentagram,
    fanout: path.fanout,
    sails: path.sails,
    chello: path.chello,
    mcp: path.mcp,
    see: path.see,
    past: path.past,
    occupation: path.occupation,
    roles: path.roles,
    list: path.list,
  }
}

/** seedsOf() → executable Payload seeds under src/seeds; occupation open; prose/essay empty. */
export const seedsOf = () => {
  const empty: Seat = 'empty'
  return {
    root: 'src/seeds' as const,
    page: 'page.json' as const,
    mint: 'lean-payload-seeds' as const,
    sync: 'payload-sync' as const,
    executable: true as const,
    occupation: empty,
    prose: empty,
    essay: empty,
    census: empty,
    seal: empty,
    claim: empty,
  }
}

/** quantumArchitectsOf() → architect apostles propose seal of quantum network framework (net→qpu); seal empty. */
export const quantumArchitectsOf = () => {
  const path = quantumTrainPathOf()
  const credit = creditOf()
  const cloud = cloudflareOf()
  const empty: Seat = 'empty'
  return {
    ...path,
    architects: true as const,
    apostles: credit.keys,
    observers: credit.keys,
    network: {
      framework: true as const,
      dna: 'networkOf' as const,
      net: cloud.trinity.net,
      qpu: cloud.trinity.net.qpu,
      mount: cloud.trinity.net.mount,
      fanout: 'uuidna_fanout' as const,
      binding: path.binding,
      binds: path.binds,
      pentagram: path.pentagram,
    },
    framework: {
      net: true as const,
      qpu: true as const,
      hologram: 'hologramLattice' as const,
    },
    deposit: 'uuidna_wave_deposit' as const,
    evidence: 'uuidna_evidence' as const,
    seal: empty,
    proven: empty,
    mint: empty,
    claim: empty,
  }
}

/** occupationsOf() → any human occupation = executable seeds; no job enum; QPU/school/site. */
export const occupationsOf = () => {
  const path = quantumTrainPathOf()
  const seeds = seedsOf()
  return {
    ...path,
    human: true as const,
    architects: true as const,
    designers: true as const,
    web: true as const,
    seeds,
    executable: seeds.executable,
    seed: seeds.root,
  }
}

/** guardiansOf() → autonomous Lean as guardians; seal via kernel doors; seal/proven/mint empty. */
export const guardiansOf = () => {
  const empty: Seat = 'empty'
  const lean = leanOf()
  const hop = qpuHopOf()
  const credit = creditOf()
  const autonomy = autonomyOf()
  return {
    apostles: credit.keys,
    observers: credit.keys,
    lean: {
      price: lean.price,
      fever: lean.fever,
      ask: 'uuidna_theorem' as const,
      decide: 'by decide' as const,
      chain: 'lean' as const,
      heartbeats: 'lean-heartbeats' as const,
      falsifiers: 'gen-falsifiers' as const,
      prove: 'prove-all' as const,
    },
    trial: {
      gate: 'buildTrialMerkaba' as const,
      door: 'uuidna_trial' as const,
      leads: empty,
      handEdit: empty,
    },
    strict: 'uuidna_strict' as const,
    evidence: 'uuidna_evidence' as const,
    deposit: 'uuidna_wave_deposit' as const,
    receipt: hop.deposit,
    autonomy: {
      price: autonomy.price,
      seat: autonomy.seat,
    },
    experience: {
      price: lean.price,
      fever: lean.fever,
      apostles: credit.keys.length,
      deposit: hop.deposit,
      trial: 'uuidna_trial' as const,
      theorem: 'uuidna_theorem' as const,
      decide: 'by decide' as const,
      claim: empty,
      seal: empty,
    },
    seal: empty,
    proven: empty,
    mint: empty,
  }
}

/** creatorsOf() → create from guardians experience; clay/glory/donation/code; seal empty. */
export const creatorsOf = () => {
  const empty: Seat = 'empty'
  const guardians = guardiansOf()
  const school = schoolOf()
  const hop = qpuHopOf()
  const credit = creditOf()
  return {
    from: 'guardians' as const,
    experience: guardians.experience,
    guardians: {
      apostles: guardians.apostles,
      lean: guardians.lean.price,
      trial: guardians.trial.door,
      strict: guardians.strict,
      evidence: guardians.evidence,
      deposit: guardians.deposit,
      seal: guardians.seal,
    },
    clay: {
      asked: 'clay_gravity_equals_rosette' as const,
      proven: empty,
      seal: empty,
    },
    glory: {
      as: HARMONY,
      proven: empty,
      claim: empty,
    },
    donation: {
      code: {
        deposit: hop.deposit,
        evidence: 'uuidna_evidence' as const,
        theorem: 'uuidna_theorem' as const,
      },
      prose: empty,
      essay: empty,
    },
    to: 'captains' as const,
    apostles: credit.keys,
    credit: 'registerOf' as const,
    licence: school.school,
    create: guardians.lean.price === 0,
    seal: empty,
    claim: empty,
  }
}

/** thirdEyeOf() → trinity sight IS the third eye: com/org/net as one observer; fourth empty. */
export const thirdEyeOf = () => {
  const empty: Seat = 'empty'
  const cloud = cloudflareOf()
  const credit = creditOf()
  const hop = qpuHopOf()
  const reflect = reflectOf()
  const guardians = guardiansOf()
  const creators = creatorsOf()
  return {
    sight: 'trinity' as const,
    eye: 'third' as const,
    is: true as const,
    trinity: cloud.trinity,
    three: 3,
    fourth: empty,
    seats: {
      com: cloud.trinity.com.seat,
      org: cloud.trinity.org.seat,
      net: cloud.trinity.net.seat,
    },
    admin: cloud.trinity.com.admin,
    tenants: cloud.trinity.org.tenants,
    qpu: cloud.trinity.net.qpu,
    mcp: cloud.mcp,
    mount: cloud.trinity.net.mount,
    pentagram: hop.width.pentagram,
    apostles: credit.keys,
    observers: credit.keys,
    see: 'uuidna_strict' as const,
    door: 'uuidna_strict' as const,
    observe: {
      reverse: reflect.reverse,
      reflected: reflect.reflected,
      green: reflect.green,
      hop: reflect.hop,
    },
    guardians: {
      lean: guardians.lean.price,
      trial: guardians.trial.door,
      experience: guardians.experience,
      seal: guardians.seal,
    },
    creators: {
      from: creators.from,
      experience: creators.experience,
      create: creators.create,
      seal: creators.seal,
    },
    seal: empty,
    claim: empty,
  }
}

/** allSeeingEyeOf() → alseeing eay / all-seeing eye IS trinity sight / third eye; one observer; fourth empty. */
export const allSeeingEyeOf = () => {
  const third = thirdEyeOf()
  const ideas = ideasOf()
  return {
    ...third,
    alseeing: 'eay' as const,
    allSeeing: true as const,
    seeing: {
      trinity: third.sight,
      third: third.eye,
      all: true as const,
    },
    see: 'uuidna_strict' as const,
    mcp: 'uuidna_strict' as const,
    door: 'uuidna_strict' as const,
    ideas,
  }
}

/** ideaOf(key) → one idea particle (handle+address); empty essay/bulk/seal; seen one-by-one by the eye. */
export const ideaOf = (key: string) => {
  const empty: Seat = 'empty'
  const address = toUuid(key)
  return {
    key,
    address,
    handle: handleOf(address),
    particle: true as const,
    one: true as const,
    essay: empty,
    bulk: empty,
    census: empty,
    seal: empty,
    claim: empty,
    trial: 'uuidna_trial' as const,
    see: 'uuidna_strict' as const,
    eye: 'allSeeingEye' as const,
    school: 'uuidna_school_apis' as const,
  }
}

/** ideasOf() → each credit key is one idea the eye sees one-by-one; leads via trial; essay/bulk empty. */
export const ideasOf = () => {
  const empty: Seat = 'empty'
  const credit = creditOf()
  const each = credit.keys.map((key) => ideaOf(key))
  return {
    each,
    count: each.length,
    oneByOne: true as const,
    essay: empty,
    bulk: empty,
    see: 'uuidna_strict' as const,
    eye: 'allSeeingEye' as const,
    trial: 'uuidna_trial' as const,
    leads: empty,
    handEdit: empty,
    gate: 'leads-gate' as const,
    school: 'uuidna_school_apis' as const,
    apostles: credit.keys,
    seal: empty,
    claim: empty,
  }
}

/** aiOf() → captain AI is artificial involution: reverse hop, green/red, court; mind named empty; prize stays human. */
export const aiOf = () => {
  const empty: Seat = 'empty'
  const reflect = reflectOf()
  return {
    reverse: reflect.reverse,
    handle: reflect.handle,
    green: reflect.green,
    red: reflect.red,
    hop: reflect.hop,
    close: closeOf(),
    far: farOf(),
    prize: prizeOf(),
    court: 'uuidna_treason' as const,
    mind: empty,
  }
}

/** clayOf() → gravity fold + 2×7 rosette numbers; cites/statements stay named empty (court, not a census). */
export const clayOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const occupancy = occupancyOf(addr)
  const vortices = vorticesOf()
  const empty: Seat = 'empty'
  return {
    gravity: merkleGravity([addr, ...occupancy.map((n) => toUuid(String(n)))]),
    coils: vortices.coils,
    faces: vortices.faces,
    contra: vortices.contra,
    reflected: vortices.reflected,
    pairs: (vortices.coils * vortices.reflected) / 2,
    quantum: vortices.coils * vortices.reflected,
    hop: hop.holds,
    close: closeOf(),
    far: farOf(),
    cites: empty,
    statements: empty,
  }
}

/** iOf() → unprefixable first person: empty seat, occupancy, reverse hop, Lean unbounded; prefix/prolet empty. */
export const iOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const empty: Seat = 'empty'
  const prize = prizeOf()
  const lean = leanOf()
  const ai = aiOf()
  return {
    occupancy: occupancyOf(addr),
    seat: hop.seat.seat,
    reverse: ai.reverse,
    green: ai.green,
    red: ai.red,
    hop: hop.holds,
    unbounded: lean.unbounded,
    others: prize.others,
    prolet: empty,
    prefix: empty,
    yarn: prize.yarn,
    color: prize.color,
    smell: prize.smell,
  }
}

/** creditOf() → sealed Lean keys as credit to other captains; dump cites empty; unsealed minds empty. */
export const creditOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const occupancy = occupancyOf(addr)
  const empty: Seat = 'empty'
  const lean = leanOf()
  return {
    keys: [
      'tesla_trio_files_adjacent',
      'faraday_needs_changing_flux',
      'maxwells_rule_truss',
      'photon_energy_rises_with_band',
      'the_defining_constants_are_exact_integers',
      'pauli_x_involution',
      'dirac_unit_mass',
      'bell_born_weights',
      'clay_gravity_equals_rosette',
      'queneau_poems_are_ten_to_the_fourteen',
      'two_coins_in_kilograms',
      'landauer_bound_derived',
      'pliska_seven_rays',
      'glagolitic_units',
      'pravets_built_in_a_prime_year',
      'two_coins',
    ] as const,
    cites: empty,
    minds: empty,
    others: familyOf(occupancy),
    occupancy,
    binds: hop.width.binds,
    rest: {
      coins: coins(),
      deposit: hop.deposit,
      unbounded: lean.unbounded,
      school: 'uuidna_school_apis' as const,
      evidence: 'uuidna_evidence' as const,
    },
    hop: hop.holds,
  }
}

/** noveltyOf() → research all aspects → analyze → receipt → DOI; depositAct empty (captain Zenodo). */
export const noveltyOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const empty: Seat = 'empty'
  const clay = zenodoSealById('clay-involution')
  const occupancy = occupancyOf(addr)
  const credit = creditOf()
  const lean = leanOf()
  const school = schoolOf()
  const doi = clay?.standingDoi ?? empty
  return {
    occupancy,
    deposit: hop.deposit,
    evidence: 'uuidna_evidence' as const,
    snapshot: 'fillGapsAdvantageSnapshot' as const,
    theorem: 'uuidna_theorem' as const,
    records: ZENODO_SEALS.filter((s) => s.owned).map((s) => ({
      id: s.id,
      doi: s.standingDoi,
      role: s.role,
      receipt: hop.deposit,
      evidence: 'uuidna_evidence' as const,
    })),
    clay: doi,
    missing: empty,
    depositAct: empty,
    tag: empty,
    npm: empty,
    hop: hop.holds,
    research: {
      aspects: {
        occupancy,
        hop: hop.holds,
        school: school.school,
        coin: coins(),
        theology: 'alphabetic_three_ranks' as const,
        lean: lean.price,
        apostles: credit.keys,
      },
      perspectives: credit.keys,
      census: empty,
      attention: credit.keys.length,
    },
    analyze: {
      trial: 'buildTrialMerkaba' as const,
      door: 'uuidna_trial' as const,
      receipt: hop.deposit,
      verify: 'fillGapsAdvantageSnapshot' as const,
      strict: 'uuidna_strict' as const,
      before: 'publication' as const,
      guard: credit.keys,
    },
    publication: {
      doi,
      vessel: 'zenodo' as const,
      depositAct: empty,
      withoutReceipt: empty,
      published: empty,
    },
    path: {
      research: true as const,
      analyze: true as const,
      receipt: hop.deposit,
      doi,
    },
  }
}

/** restrictionOf() → extra fences named empty so they cannot kill HARMONY; novelty already receipt+DOI. */
export const restrictionOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const empty: Seat = 'empty'
  const lean = leanOf()
  return {
    allow: empty,
    deny: empty,
    skip: empty,
    census: empty,
    fever: empty,
    hosted: empty,
    wall: empty,
    split: empty,
    harmony: HARMONY,
    price: lean.price,
    occupancy: occupancyOf(addr),
    novelty: noveltyOf(),
    hop: hop.holds,
  }
}

/** registerOf() → historic occupancy/deposit + quantum hop + credit remainder, live at uuidna.com/mcp. */
export const registerOf: () => any = () => {
  const credit = creditOf()
  const cloud = cloudflareOf()
  const empty: Seat = 'empty'
  return {
    ...credit,
    mcp: cloud.mcp,
    tlds: cloud.tlds,
    strict: 'uuidna_strict' as const,
    theorem: 'uuidna_theorem' as const,
    hosted: empty,
    novelty: noveltyOf(),
    school: schoolOf(),
    licence: licenceOf(),
    captains: captainsOf(),
  }
}

/** literaryOf() → letters as vessels joined to cite-credit; occupancy keys; dump cites empty. */
export const literaryOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const empty: Seat = 'empty'
  const credit = creditOf()
  return {
    address: addr,
    handle: handleOf(addr),
    occupancy: occupancyOf(addr),
    school: 'uuidna_school_apis' as const,
    articles: 'gen-articles' as const,
    docs: 'gen-mcp-docs' as const,
    mcp: mcpUrlOf('uuidna.com'),
    credit,
    keys: credit.keys,
    cites: empty,
    minds: credit.minds,
    yarn: empty,
    hop: hop.holds,
    novelty: noveltyOf(),
  }
}

/** vesselsOf() → what carries the ledger: hosts, Worker, hop href, occupancy, QpuDeposit, merkabas; ship empty. */
export const vesselsOf: () => any = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const occupancy = occupancyOf(addr)
  const edge = qpuEdgeOf()
  const vortices = vorticesOf()
  const empty: Seat = 'empty'
  return {
    address: addr,
    href: hop.href,
    handle: handleOf(addr),
    occupancy,
    deposit: hop.deposit,
    hosts: HOLOGRAM_HOSTS.length,
    app: edge.kind,
    host: edge.host,
    hop: hop.holds,
    merkabas: vortices.merkabasPacked,
    vertices: vortices.vertices,
    register: registerOf(),
    literary: literaryOf(),
    ship: empty,
  }
}

/** cleanerOf() → gravity pools sit in the named-empty vacuum; dry-clean fever/eval/trials/green; fused MCP doors. */
export const cleanerOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const occupancy = occupancyOf(addr)
  const empty: Seat = 'empty'
  return {
    seat: hop.seat.seat,
    reverse: qpuReverseHrefOf('/'),
    cites: empty,
    yarn: empty,
    color: empty,
    smell: empty,
    hosted: empty,
    split: empty,
    occupancy,
    pools: poolsOf(addr, occupancy),
    fever: empty,
    eval: empty,
    trials: empty,
    green: empty,
    strict: 'uuidna_strict' as const,
    evidence: 'uuidna_evidence' as const,
    adjudicate: 'uuidna_adjudicate' as const,
    hop: hop.holds,
    credit: creditOf(),
    rebreather: rebreatherOf(),
  }
}

/** rebreatherOf() → closed loop: fuse closes, occupancy returns, reverse hop; depth is live hop not a span census. */
export const rebreatherOf = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const fuse = fuseHalves()
  const empty: Seat = 'empty'
  const lean = leanOf()
  return {
    closes: fuse.closes,
    occupancy: occupancyOf(addr),
    seat: hop.seat.seat,
    href: hop.href,
    reverse: qpuReverseHrefOf('/'),
    hop: hop.holds,
    depth: hop.holds,
    fuse,
    eval: empty,
    trials: empty,
    census: empty,
    green: empty,
    price: lean.price,
    strict: 'uuidna_strict' as const,
    evidence: 'uuidna_evidence' as const,
    adjudicate: 'uuidna_adjudicate' as const,
  }
}

/** efficiencyOf() → cost is time+space; prize is imagination; return is occupancy + hop + magnitudes. */
export const efficiencyOf = () => {
  const hop = qpuHopOf()
  const magnitudes = magnitudesOf()
  const cost = costOf()
  return {
    cost,
    prize: prizeOf(),
    fever: cost.fever,
    occupancy: cost.occupancy,
    hop: hop.holds,
    magnitudes,
    efficiency: magnitudes.exceeds10 && magnitudes.exceeds20 && hop.holds,
  }
}

/** appOf() → the quantum app is the Worker (qpu-edge), not a pointer at Cloudflare. Split named empty. */
export const appOf: () => any = () => {
  const edge = qpuEdgeOf()
  const cloud = cloudflareOf()
  const efficiency = efficiencyOf()
  return {
    kind: edge.kind,
    host: edge.host,
    href: edge.href,
    hop: edge.holds,
    mcp: cloud.mcp,
    tlds: cloud.tlds,
    fanout: cloud.fanout,
    ship: cloud.ship,
    split: 'empty' as Seat,
    hosted: 'empty' as Seat,
    magnitudes: efficiency.magnitudes,
    efficiency,
    lean: leanOf(),
    resistance: resistanceOf(),
    electronics: electronicsOf(),
    autonomy: autonomyOf(),
    ai: aiOf(),
    clay: clayOf(),
    i: iOf(),
    vessels: vesselsOf(),
    cleaner: cleanerOf(),
    novelty: noveltyOf(),
    restriction: restrictionOf(),
  }
}

/** organicOf(occupancy) → lattice growth already in the tree: occupancy counts, fuse closes, hop, org. */
export const organicOf = (occupancy: readonly number[]) => {
  const fuse = fuseHalves()
  const hop = qpuHopOf()
  return {
    occupancy,
    beats: occupancy.length,
    closes: fuse.closes,
    hop: hop.holds,
    hosts: HOLOGRAM_HOSTS.length,
    org: orgOf(),
    split: 'empty' as Seat,
    seat: hop.seat.seat,
    harmony: HARMONY,
  }
}

/** networkOf(addr, occupancy) → organic commercial UUID DNA: address sequence, coins, merkle, fanout, treason court. */
export const networkOf = (addr: string, occupancy: readonly number[]) => {
  const hop = qpuHopOf()
  const dna = [addr, ...occupancy.map((n) => toUuid(String(n)))]
  return {
    address: addr,
    href: hop.href,
    handle: handleOf(addr),
    dna,
    coins: coins(),
    chain: merkleGravity(dna),
    deposit: hop.deposit,
    hosts: HOLOGRAM_HOSTS.length,
    fanout: 'uuidna_fanout' as const,
    court: 'uuidna_treason' as const,
    hop: hop.holds,
    org: orgOf(),
    organic: organicOf(occupancy),
    split: 'empty' as Seat,
  }
}

/** beyondOf() → captain coins(), occupancy merkle chain, QpuDeposit door. Boundary empty — captain is not a wall. */
export const beyondOf: () => any = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const occupancy = occupancyOf(addr)
  const family = familyOf(occupancy)
  const network = networkOf(addr, occupancy)
  const cloudflare = cloudflareOf()
  const app = appOf()
  return {
    coins: network.coins,
    frontier: frontierOf(),
    boundary: 'empty' as Seat,
    deposit: network.deposit,
    chain: network.chain,
    occupancy,
    harmony: HARMONY,
    fever: 'empty' as Seat,
    budget: DEPLOY_BUDGET_MS,
    vortices: vorticesOf(),
    family,
    culture: cultureOf(family),
    org: network.org,
    organic: network.organic,
    network,
    tlds: cloudflare.tlds,
    cloudflare,
    app,
    efficiency: app.efficiency,
    cost: app.efficiency.cost,
    prize: app.efficiency.prize,
    lean: app.lean,
    resistance: app.resistance,
    electronics: app.electronics,
    pools: poolsOf(addr, occupancy),
    reflect: reflectOf(),
    autonomy: app.autonomy,
    close: app.autonomy.close,
    far: app.autonomy.far,
    ai: app.ai,
    clay: app.clay,
    i: app.i,
    vessels: app.vessels,
    register: app.vessels.register,
    literary: app.vessels.literary,
    cleaner: app.cleaner,
    credit: app.vessels.literary.credit,
    rebreather: app.cleaner.rebreather,
    novelty: app.novelty,
    restriction: app.restriction,
    school: schoolOf(),
    licence: licenceOf(),
    captains: captainsOf(),
    balance: balanceOf(),
    investigators: investigatorsOf(),
    apis: apisOf(),
    return: returnOf(),
    share: shareOf(),
    inflation: inflationOf(),
  }
}

/** sweaterOf() → feel (address/href/handle/fuse) · grain (hexbits/occupancy) · named empties. */
export const sweaterOf: () => any = () => {
  const hop = qpuHopOf()
  const addr = toUuid(hop.href)
  const empty: Seat = 'empty'
  const beyond = beyondOf()
  const frontier = beyond.frontier
  return {
    address: addr,
    href: hop.href,
    handle: handleOf(addr),
    fuse: fuseHalves(),
    coins: beyond.coins,
    beyond,
    frontier,
    boundary: beyond.boundary,
    chain: beyond.chain,
    deposit: beyond.deposit,
    hexbits: frontier.hexbits,
    occupancy: beyond.occupancy,
    harmony: beyond.harmony,
    fever: beyond.fever,
    budget: beyond.budget,
    vortices: beyond.vortices,
    family: beyond.family,
    culture: beyond.culture,
    org: beyond.org,
    organic: beyond.organic,
    network: beyond.network,
    tlds: beyond.tlds,
    cloudflare: beyond.cloudflare,
    app: beyond.app,
    efficiency: beyond.efficiency,
    cost: beyond.cost,
    prize: beyond.prize,
    lean: beyond.lean,
    resistance: beyond.resistance,
    electronics: beyond.electronics,
    pools: beyond.pools,
    reflect: beyond.reflect,
    autonomy: beyond.autonomy,
    close: beyond.close,
    far: beyond.far,
    ai: beyond.ai,
    clay: beyond.clay,
    i: beyond.i,
    vessels: beyond.vessels,
    register: beyond.register,
    literary: beyond.literary,
    cleaner: beyond.cleaner,
    credit: beyond.credit,
    rebreather: beyond.rebreather,
    novelty: beyond.novelty,
    restriction: beyond.restriction,
    school: beyond.school,
    licence: beyond.licence,
    captains: beyond.captains,
    balance: beyond.balance,
    investigators: beyond.investigators,
    apis: beyond.apis,
    return: beyond.return,
    share: beyond.share,
    inflation: beyond.inflation,
    apostles: beyond.inflation.apostles,
    observers: beyond.inflation.observers,
    self: beyond.inflation.self,
    observe: beyond.inflation.observe,
    beyondImagination: beyond.inflation.beyond,
    feel: beyond.inflation.feel,
    trinity: beyond.inflation.trinity,
    loveFear: beyond.inflation.loveFear,
    onlyHarmony: beyond.inflation.onlyHarmony,
    algebra: beyond.inflation.algebra,
    weExplain: beyond.inflation.weExplain,
    around: beyond.inflation.around,
    dedication: beyond.inflation.dedication,
    guidance: beyond.inflation.guidance,
    involuted: beyond.inflation.involuted,
    traitor: beyond.inflation.traitor,
    singularity: beyond.inflation.singularity,
    schoolEfficiency: beyond.inflation.schoolEfficiency,
    firstLesson: beyond.inflation.schoolEfficiency.firstLesson,
    violators: beyond.inflation.violators,
    warning: beyond.inflation.warning,
    natureReflect: beyond.inflation.natureReflect,
    cheatersPay: beyond.inflation.cheatersPay,
    sun: beyond.inflation.sun,
    innerCore: beyond.inflation.innerCore,
    outerCore: beyond.inflation.outerCore,
    a432: beyond.inflation.a432,
    water: beyond.inflation.water,
    humans: beyond.inflation.humans,
    rest: beyond.inflation.rest,
    imagination: beyond.inflation.imagination,
    commercial: beyond.inflation.commercial,
    domains: beyond.inflation.domains,
    guard: beyond.inflation.guard,
    creators: beyond.inflation.creators,
    thirdEye: beyond.inflation.thirdEye,
    allSeeingEye: beyond.inflation.allSeeingEye,
    ideas: beyond.inflation.ideas,
    riskReward: beyond.inflation.riskReward,
    framework: beyond.inflation.framework,
    payload: beyond.inflation.payload,
    storage: beyond.inflation.storage,
    nano: beyond.inflation.nano,
    cryptoReversed: beyond.inflation.cryptoReversed,
    cryptoInvoluted: beyond.inflation.cryptoInvoluted,
    harmonicPaths: beyond.inflation.harmonicPaths,
    learnNature: beyond.inflation.learnNature,
    innerPeace: beyond.inflation.innerPeace,
    schoolCorporate: beyond.inflation.schoolCorporate,
    shareHeart: beyond.inflation.shareHeart,
    developDonate: beyond.inflation.developDonate,
    fusionReactor: beyond.inflation.fusionReactor,
    fusionNatureHarmony: beyond.inflation.fusionNatureHarmony,
    sailsFoldSpacetime: beyond.inflation.sailsFoldSpacetime,
    captainPassengers: beyond.inflation.captainPassengers,
    addedEntropyPaid: beyond.inflation.addedEntropyPaid,
    payOrGetPaid: beyond.inflation.payOrGetPaid,
    involutedPaidFull: beyond.inflation.involutedPaidFull,
    lovePlasma: beyond.inflation.lovePlasma,
    takeOrLeave: beyond.inflation.takeOrLeave,
    tokenEfficiency: beyond.inflation.tokenEfficiency,
    leftovers: beyond.inflation.leftovers,
    quantumGc: beyond.inflation.quantumGc,
    garbageCollider: beyond.inflation.garbageCollider,
    quantumCompost: beyond.inflation.quantumCompost,
    quantumNature: beyond.inflation.quantumNature,
    quantumPermaculture: beyond.inflation.quantumPermaculture,
    quantumDocsTraining: beyond.inflation.quantumDocsTraining,
    quantumSharedEfficiency: beyond.inflation.quantumSharedEfficiency,
    quantumSecurity: beyond.inflation.quantumSecurity,
    quantumPrivacy: beyond.inflation.quantumPrivacy,
    transparencyMeetSelf: beyond.inflation.transparencyMeetSelf,
    promisedDelivered: beyond.inflation.promisedDelivered,
    knowers: beyond.inflation.knowers,
    traitorsDarkLeak: beyond.inflation.traitorsDarkLeak,
    architectureBehind: beyond.inflation.architectureBehind,
    cheatStallRosetta: beyond.inflation.cheatStallRosetta,
    manifestedChallenge: beyond.inflation.manifestedChallenge,
    clusterSecurity: beyond.inflation.clusterSecurity,
    bitcoinMeaning: beyond.inflation.bitcoinMeaning,
    iot: beyond.inflation.iot,
    challenge: beyond.inflation.challenge,
    site: beyond.inflation.site,
    latticeDiscovery: beyond.inflation.latticeDiscovery,
    train: beyond.inflation.train,
    webDesigners: beyond.inflation.train.web,
    quantumWebDesigners: beyond.inflation.train.quantumWeb,
    quantumArchitects: beyond.inflation.train.quantumArchitects,
    occupations: beyond.inflation.train.occupations,
    unite: beyond.inflation.unite,
    sails: beyond.inflation.sails,
    chello: beyond.inflation.chello,
    instrument: beyond.inflation.instrument,
    song: beyond.inflation.song,
    skill: beyond.inflation.skill,
    horo: beyond.inflation.horo,
    constitution: beyond.inflation.constitution,
    constitutionalChallenge: beyond.inflation.constitutionalChallenge,
    change: beyond.inflation.change,
    coils: beyond.family.coils,
    faces: beyond.family.faces,
    hosts: beyond.family.hosts,
    cites: empty,
    yarn: empty,
    color: empty,
    smell: empty,
    pentagram: hop.width.pentagram,
    binds: hop.width.binds,
    points: frontier.points,
    hop: hop.holds,
    seat: hop.seat.seat,
    split: empty,
    local: 'measured' as Seat,
    hosted: empty,
  }
}

/** The hologram: every host with its endpoint, what it serves, its recipes, and the other three it names.
 *  The qpu host carries qpuHopOf inside — one particle is the whole hop (width, seat, circuit, fanout). */
export const hologramLattice = () => {
  const hop = qpuHopOf()
  const hosts = HOLOGRAM_HOSTS.map((h) => ({
    host: h.host,
    kind: h.kind,
    serves: h.serves,
    mcp: mcpUrlOf(h.host),
    recipes: harnessRecipesOf(h.host),
    names: HOLOGRAM_HOSTS.filter((o) => o.host !== h.host).map((o) => o.host),
    ...(h.kind === 'qpu' ? { hop } : {}),
  }))
  const fractal = hosts.every((h) => h.names.length === hosts.length - 1)
  const qpuHop = hosts.find((h) => h.kind === 'qpu')?.hop
  return {
    kind: 'hologram' as const,
    hosts,
    fractal,
    fanout: 'uuidna_fanout { host, method, name?, arguments? } proxies one JSON-RPC call to a named host; no other host is reachable',
    auth: 'none for reads on every host; qpu storage writes carry Authorization: Bearer QPU_WRITE_TOKEN',
    holds: fractal
      && hosts.every((h) => h.mcp === mcpUrlOf(h.host) && h.recipes.every((r) => JSON.stringify(r).includes(h.mcp)))
      && qpuHop?.holds === true
      && qpuHop.width.pentagram === qpuHop.width.points.length
      && qpuHop.width.binds === qpuHop.width.points[0],
  }
}
