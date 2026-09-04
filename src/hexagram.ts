// hexagram — THE PAYLOAD READ AS FU XI GATES. Beside hexbit, never folded into it.
//
// A hexbit is 4 bits. A hexagram is 6 bits. Those widths do not collapse: HANDLE_BITS leaves remainder 2
// against 6, so the eight-hex handle does not tile as hexagrams and is not drawn as them. The payload
// (uuid minus handle) is 96 bits, and 96 / 6 = 16 integers in 0..63. Those integers ARE the hexagrams
// (Fu Xi / Leibniz binary). King Wen names, changing lines, and divination are meaning; meaning stays null.
//
// Occupancy is which sealed COUNTS the door arithmetic hits — hexagram indices, hexbit tiles, aura ray/wave,
// digital root, and the door's own widths. The count set is derived from live theorem statements of named
// keys already in the ledger. Change the ledger, the face follows. No deity table, no authored myth list.
import { digitalRoot, BASE, TRINITY, toUuid, merkleFold } from './address.js'
import { quantumAura, rotationOf, type TenD } from './aura.js'
import { handleOf, handleParts, seedOf } from './handle.js'
import { coins } from './captain/billing/index.js'
import { growLife } from './grow.js'
import { DATAPATH, LANES } from './hardware/index.js'
import { hardwareLayer, osLayer, softwareLayer } from './layers.js'
import { sealStream, openStream, type Stream } from './stream.js'
import {
  HEXBIT_BITS, HEXBIT_STATES, UUID_BITS, UUID_HEXBITS, HANDLE_HEXBITS, HANDLE_BITS, LEVERAGE, COINS, COIN_HEXBITS,
  SAFE_HEXBITS, compileToHexbits, hexbitDoorOf, fuseLadder, fuseWidth, KEY_BITS, VE_FACES,
} from './hexbit/index.js'
import { theoremByKey, skillGroups, theorems } from './theorems/index.js'

/** Six lines — the gate width. Not HEXBIT_BITS. */
export const HEXAGRAM_BITS = HEXBIT_BITS + 2
/** 2^HEXAGRAM_BITS gate space, by doubling, never a log. */
export const HEXAGRAM_STATES: number = (() => { let s = 1; for (let i = 0; i < HEXAGRAM_BITS; i++) s = s * 2; return s })()
/** The fused ring — board minus the coin itself. 2^6 − 1 = 7·9. Each coin-gate is witnessed by this many neighbours. */
export const FUSED_RING = HEXAGRAM_STATES - 1
/** Payload bits after the handle — UUID_BITS minus HANDLE_BITS. */
export const PAYLOAD_BITS = UUID_BITS - HANDLE_BITS
/** How many hexagrams the payload tiles — PAYLOAD_BITS / HEXAGRAM_BITS. */
export const PAYLOAD_HEXAGRAMS = PAYLOAD_BITS / HEXAGRAM_BITS

/** First handle tile mod six — door_of_the_referrer. */
export function referrerDoorOf(handle: string): number {
  return parseInt(handle[0]!, 16) % HEXAGRAM_BITS
}

/** coinNeighbours(gate) → the other FUSED_RING gates on the 64-board. The coin is the +1 that closes the ring
 *  (captain_theorem_the_coins_buy_the_ring_and_one); it is not its own neighbour. */
export function coinNeighbours(gate: number): number[] {
  const n = HEXAGRAM_STATES
  if (!Number.isInteger(gate) || gate < 0 || gate >= n)
    throw new Error(`hexagram: gate ${gate} is off the ${n}-board`)
  const out: number[] = []
  for (let i = 0; i < n; i++) if (i !== gate) out.push(i)
  return out
}

/** Keys whose live statements supply the sealed-count census. Numbers come from the algebra; names stay null.
 *  The hex face surfaces these as `/theorem/<key>` doors — occupancy is not a leftover list in memory. */
export const OCCUPANCY_KEYS: readonly string[] = [
  'payload_aligns_where_the_name_does_not',
  'chessboard_sixty_four',
  'the_uuid_is_two_boards',
  'uuidna_is_dna_times_the_two_coins',
  'sixtyfour_is_two_pow_six',
  'ten_square_computes_ten_dimensions',
  've_double_five_merges_in_ten',
  'dz_two_fixedpoints',
  'gematria_forces_collisions',
  'units_mod_22_number_10',
  'pentagram_single_stroke',
  'metatron_seventyeight_lines',
  'pliska_seven_rays',
  'seven_bands_in_order',
  'compass_rose_eight',
  'glagolitic_units',
  'zodiac_ecliptic_360',
  'three_sevens_twentyone',
  'clay_gravity_equals_rosette',
  'great_year_precession',
  'pentagon_interior_angle_108',
  'seventytwo_is_decimal_only',
  'two_coins',
  'fourth_ray_is_green_band',
  'saros_metonic_bridge',
  'trinity_edit_is_three',
  'agl_order_54',
  'eclipse_four_hundred',
  'metonic_cycle',
  'metonic_is_the_intercalation',
  'order_of_two_is_six',
  'song_pi_roof_opens',
  'song_verses_base_pair',
  'door_of_the_referrer',
  'sanitize_max_depth_is_two_pow_five',
  'sanitize_max_string_is_ten_pow_six',
  'sanitize_array_and_keys_are_ten_pow_five',
  'sanitize_poison_keys_are_three',
  'sanitize_bidi_points_are_nine',
  'nyquist_clears_the_lattice',
  'served_qubit_ceiling',
  'imprint_capacity_within_address',
  'imprint_capacity_chain',
  'imprint_capacity_entangles',
  'crypto_widths_are_fixed_not_sampled',
  'k432',
  'aura_step_divides_circle',
  'aead_nonce_and_salt_bits',
  've_fourteen_faces',
  'advantage_first_doubles_at_seal_38',
  'no_maximum_only_bounds',
  'rosette_quantum_fortytwo',
  'directions_number_fortytwo',
  'gate_error_baseline_class',
  'key_floor_is_one_uuid',
  'hexbit_is_four_qubits',
  'song_az_is_the_tuning',
  'frame_ring_undo_involutive',
  'every_string_has_thirty_two_modes',
  'onion_layers_power_of_two',
  'digest_doubles_the_address',
  'sha256_is_four_sixtyfours',
]

export interface OccupancyCite {
  n: number
  keys: readonly string[]
}

/** One coin as a 64-bit board: every bit is witnessed by the fused ring (the other 63 gates). */
export interface CoinBoardWitness {
  coins: number
  board: number
  neighbours: number
  complete: boolean
  /** The two faces swap and swap back — an involution. Each coin is the other's reflection. */
  reflects: boolean
}

export interface HexFaceAura {
  hsl: string
  hue: number
  ray: number
  wave: number
  ten: TenD
}

export interface HexFace {
  handle: string
  hexbits: readonly number[]
  hexagrams: readonly number[]
  occupancy: readonly number[]
  /** Hit counts with the census keys whose statements supply them — each key is a `/theorem/<key>` door. */
  occupancyCites: readonly OccupancyCite[]
  /** The occupancy census itself, surfaced as theorem doors on every hex face. */
  occupancyDoors: readonly string[]
  aura: HexFaceAura
  handleParts: readonly string[]
  door: string
  /** 8×8 board width — HANDLE_HEXBITS, the handle in tiles. */
  board: number
  /** Gate space — LEVERAGE (64). */
  gates: number
  /** Six lines per gate — HEXAGRAM_BITS, not HEXBIT_BITS. */
  hexagramBits: number
  /** Two 64-bit Fu Xi boards — the two coins. Concatenate them and they ARE the next coin (the uuid). */
  faces: readonly [readonly number[], readonly number[]]
  /** Captain commission — COINS, the same two the fuse is priced at. */
  coins: number
  /** First handle tile mod six — the referrer door into the orbit (door_of_the_referrer). */
  referrerDoor: number
  /** Eight vertices of the merkaba — HANDLE_HEXBITS, two self-dual tetrahedra (4+4). */
  merkaba: number
  /** Vortex residues walked by coins × width mod ring. Unfused ([start]) unless coins() is paid at each rung. */
  ladder: readonly number[]
  /** First fuse of the handle — 2·8 ≡ 7, the rosetta ray count. Equals HANDLE_HEXBITS when unpaid. */
  rosette: number
  /** Second fuse — 2·7 ≡ 5, the pentad. */
  pentad: number
  /** Captain coins contributed at each fuse rung — trial_computes_only_with_two_coins. */
  fused: boolean
  /** Thirteen centres, C(13,2) = 78 lines — metatron_seventyeight_lines, live from the first SAFE_HEXBITS tiles. */
  metatron: MetatronFigure
  /** Referrer handle and superposition handle mapped onto π's 142857 hexagon. */
  hexPi: HexPi
  /** Occupancy glyphs — constructors, never frozen 5/8/9/12. */
  glyphs: HexFaceGlyphs
  /** Station counts — trinity and rays; ten is their sum. */
  stations: HexFaceStations
  /** Packed unit triangles on the two boards — KEY_BITS = UUID_BITS × COINS. 2D still draws two projected polygons. */
  packedTriangles: number
  /** Merkabas those triangles pack — packedTriangles / HANDLE_HEXBITS = UUID_HEXBITS. */
  merkabasPacked: number
  /** VE faces from the live pentad walk — HANDLE_HEXBITS + HEXAGRAM_BITS, never a freeze of 14. */
  veFaces: number
}

export interface HexFaceGlyphs {
  star: number
  rose: number
  ring: number
  wheel: number
}

export interface HexFaceStations {
  trinity: number
  rays: number
  ten: number
  roof: number
}

export interface MetatronFigure {
  centres: number
  lines: number
  nodes: readonly number[]
  xy: readonly (readonly [number, number])[]
}

export interface HexPiDoor {
  handle: string
  door: number
  verse: readonly number[]
}

export interface HexPi {
  referrer: HexPiDoor
  superposition: HexPiDoor
  /** Digitwise verses sum to 9 — song_verses_base_pair — when the two doors are a half-turn apart. */
  paired: boolean
  /** 8 handle tiles mod 6 vertices — the remainder is the coins (HANDLE_HEXBITS % HEXAGRAM_BITS = COINS). */
  remainder: number
}

const natDiv = (a: number, b: number): number => (b === 0 ? 0 : (a - (a % b)) / b)

function digitsOf(n: number): number[] {
  if (n === 0) return [0]
  const acc: number[] = []
  let x = n
  while (x > 0) {
    acc.push(x % 10)
    x = natDiv(x, 10)
  }
  const out: number[] = []
  for (let i = acc.length - 1; i >= 0; i--) out.push(acc[i]!)
  return out
}

/** Archimedes' roof numerator — song_pi_roof_opens / pi_bracketed_by_finite_rationals. Hexbit alphabet plus hexagram lines. */
export const PI_ROOF_NUM = HEXBIT_STATES + HEXAGRAM_BITS
/** 10^HEXAGRAM_BITS — the decimal engine the round turns on. */
export const PI_ENGINE: number = (() => { let n = 1; for (let i = 0; i < HEXAGRAM_BITS; i++) n = n * 10; return n })()
/** 22·10^6 / 7 in Nat division — the float `/` is the crack (22 * 1e6 / 7 is not 3142857 in JS). */
export const PI_ROOF = natDiv(PI_ROOF_NUM * PI_ENGINE, fuseWidth(HANDLE_HEXBITS, COINS))
/** π's period as six hexagon vertices, digits of the roof without the leading integer — same units as the vortex, another order. */
export const HEX_PI: readonly number[] = digitsOf(PI_ROOF % PI_ENGINE)

/** Glyph widths the face draws when occupancy hits them — TRINITY+COINS, handle, BASE, hexagram×coins. */
export const GLYPH_STAR = TRINITY + COINS
export const GLYPH_ROSE = HANDLE_HEXBITS
export const GLYPH_RING = BASE
export const GLYPH_WHEEL = HEXAGRAM_BITS * COINS
/** Ten stations: hexagram lines plus hexbit width. Rays are HEXAGRAM_BITS+1 (the rosette). */
export const STATION_TEN = HEXAGRAM_BITS + HEXBIT_BITS
export const STATION_RAYS = HEXAGRAM_BITS + 1
/** Two remainders against six — handle tiles and hexbit alphabet. They are not the same cut. */
export const HANDLE_HEXAGRAM_REMAINDER = HANDLE_BITS % HEXAGRAM_BITS
export const HEXBIT_STATE_HEXAGRAM_REMAINDER = HEXBIT_STATES % HEXAGRAM_BITS

/** Count off by a hexbit, the yarrow handful: remainder 1..HEXBIT_BITS, and a full pile is HEXBIT_BITS not 0.
 *  Empty bundle is 0. Divination stays null — this is the remainder the handle already leaves against six lines. */
export function yarrowRemainder(n: number): number {
  if (!Number.isInteger(n) || n <= 0) return 0
  const r = n % HEXBIT_BITS
  return r === 0 ? HEXBIT_BITS : r
}

/** λ × f conserved — HEXBIT_BITS × HEXAGRAM_BITS × coins(), so every handful divides the product in integers. */
export const WAVE_PRODUCT = HEXBIT_BITS * HEXAGRAM_BITS * coins()

export interface CoinYarrowWave {
  seals: number
  coins: number
  handful: number
  lines: number
  remainder: number
  hexagram: number
  wavelength: number
  frequency: number
  product: number
  visible: false
}

/** coinYarrowWave(seals) → one cluster of sealed theorems as a yarrow remainder traveling as an EM wave.
 *  The handle does not tile as hexagrams (HANDLE_HEXAGRAM_REMAINDER = coins), so the sticks stay invisible:
 *  occupancy is wavelength × frequency = WAVE_PRODUCT, never a drawn stalk. */
export function coinYarrowWave(seals: number): CoinYarrowWave {
  if (!Number.isInteger(seals) || seals < 0) throw new Error(`hexagram: ${seals} seals is not a bundle`)
  const unit = coins()
  const stalks = seals * unit
  const handful = yarrowRemainder(stalks)
  const product = WAVE_PRODUCT
  const wavelength = handful === 0 ? product : handful * unit
  const frequency = wavelength === 0 ? 0 : product / wavelength
  return {
    seals,
    coins: stalks,
    handful,
    lines: HEXAGRAM_BITS,
    remainder: HANDLE_HEXAGRAM_REMAINDER,
    hexagram: HEXAGRAM_STATES === 0 ? 0 : stalks % HEXAGRAM_STATES,
    wavelength,
    frequency,
    product,
    visible: false,
  }
}

export interface CoinWaveCluster {
  skill: string
  theorems: number
  wave: CoinYarrowWave
  fold: string
}

/** coinWaves() → each skill cluster counted off as a yarrow handful, traveling as an invisible wave. */
export function coinWaves(): CoinWaveCluster[] {
  return skillGroups().map((g) => ({
    skill: g.skill,
    theorems: g.count,
    wave: coinYarrowWave(g.count),
    fold: g.fold,
  }))
}

function verseAt(door: number): number[] {
  const n = HEX_PI.length
  const d = ((door % n) + n) % n
  const out: number[] = []
  for (let i = 0; i < n; i++) out.push(HEX_PI[(d + i) % n]!)
  return out
}

function handleFromTiles(tiles: readonly number[]): string {
  let s = ''
  for (const t of tiles) s += t.toString(16)
  return s
}

/** hexPiOf(address) → both 8-hex handles on π's hexagon: referrer (tiles 0..7) and superposition (the other
 *  coin's first eight, tiles 16..23). Same six units as the vortex; doors from first tile mod 6. */
export function hexPiOf(address: string): HexPi {
  const tiles = compileToHexbits(address)
  const refTiles = tiles.slice(0, HANDLE_HEXBITS)
  const supTiles = tiles.slice(COIN_HEXBITS, COIN_HEXBITS + HANDLE_HEXBITS)
  const refDoor = (refTiles[0] ?? 0) % HEXAGRAM_BITS
  const supDoor = (supTiles[0] ?? 0) % HEXAGRAM_BITS
  const refVerse = verseAt(refDoor)
  const supVerse = verseAt(supDoor)
  let paired = refVerse.length === supVerse.length
  for (let i = 0; i < refVerse.length; i++) if (refVerse[i]! + supVerse[i]! !== BASE) paired = false
  return {
    referrer: { handle: handleFromTiles(refTiles), door: refDoor, verse: refVerse },
    superposition: { handle: handleFromTiles(supTiles), door: supDoor, verse: supVerse },
    paired,
    remainder: HANDLE_HEXBITS % HEXAGRAM_BITS,
  }
}

const MASK6 = HEXAGRAM_STATES - 1
const MASK4 = HEXBIT_STATES - 1

/** hexagramsOf(address) → 16 integers in 0..63 from the 96 payload bits. */
export function hexagramsOf(address: string): number[] {
  const tiles = compileToHexbits(address)
  if (tiles.length !== UUID_HEXBITS) {
    throw new Error(`hexagrams: "${address}" is not ${UUID_HEXBITS} hexbits`)
  }
  const payload = tiles.slice(HANDLE_HEXBITS)
  const grams: number[] = []
  let acc = 0
  let nbits = 0
  for (const nibble of payload) {
    acc = (acc << HEXBIT_BITS) | nibble
    nbits += HEXBIT_BITS
    while (nbits >= HEXAGRAM_BITS) {
      nbits -= HEXAGRAM_BITS
      grams.push((acc >> nbits) & MASK6)
      acc &= (1 << nbits) - 1
    }
  }
  return grams
}

/** Invert hexagramsOf over the payload nibbles — the 96 bits reconstructed. */
export function payloadNibblesOfHexagrams(grams: readonly number[]): number[] {
  const nibbles: number[] = []
  let acc = 0
  let nbits = 0
  for (const g of grams) {
    acc = (acc << HEXAGRAM_BITS) | (g & MASK6)
    nbits += HEXAGRAM_BITS
    while (nbits >= HEXBIT_BITS) {
      nbits -= HEXBIT_BITS
      nibbles.push((acc >> nbits) & MASK4)
      acc &= (1 << nbits) - 1
    }
  }
  return nibbles
}

let COUNTS: number[] | undefined
/** Sealed counts from live statements of OCCUPANCY_KEYS — memoised, ledger-shaped, never a frozen list length. */
export function sealedCounts(): readonly number[] {
  if (COUNTS) return COUNTS
  const byKey = theoremByKey()
  const set = new Set<number>()
  for (const key of OCCUPANCY_KEYS) {
    const t = byKey.get(key)
    if (!t) continue
    for (const m of t.statement.matchAll(/\d+/g)) {
      const n = Number(m[0])
      if (n > 0) set.add(n)
    }
  }
  return (COUNTS = [...set].sort((a, b) => a < b ? -1 : a > b ? 1 : 0))
}

function observablesOf(address: string): Set<number> {
  const door = hexbitDoorOf(address)
  const aura = quantumAura(address)
  const obs = new Set<number>()
  for (const g of hexagramsOf(address)) obs.add(g)
  for (const h of door.hexbits) obs.add(h)
  obs.add(digitalRoot(seedOf(address)))
  obs.add(aura.ray)
  obs.add(aura.wave)
  obs.add(HANDLE_HEXBITS)
  obs.add(HEXBIT_STATES)
  obs.add(UUID_HEXBITS)
  obs.add(LEVERAGE)
  obs.add(SAFE_HEXBITS)
  obs.add(door.place.residue)
  return obs
}

/** Integer fruit-of-life centres: 1 + 6 + 6 = SAFE_HEXBITS. Axial hex with integer pitch — art, the sealed
 *  fact is the count (metatron_seventyeight_lines). */
function fruitOfLife(): readonly (readonly [number, number])[] {
  const o = 100
  const qx = UUID_HEXBITS - HEXBIT_BITS
  const rx = qx / COINS
  const ry = UUID_HEXBITS - HANDLE_HEXBITS
  const axial: readonly (readonly [number, number])[] = [
    [0, 0],
    [1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1],
    [2, 0], [0, 2], [-2, 2], [-2, 0], [0, -2], [2, -2],
  ]
  return axial.map(([q, r]) => [o + qx * q + rx * r, o + ry * r] as const)
}

/** metatronOf(address) → 13 centres from the first SAFE_HEXBITS tiles, C(13,2) = 78 lines. Same address, same figure. */
export function metatronOf(address: string): MetatronFigure {
  const nodes = compileToHexbits(address).slice(0, SAFE_HEXBITS)
  const centres = SAFE_HEXBITS
  const lines = (centres * (centres - 1)) / 2
  return { centres, lines, nodes, xy: fruitOfLife() }
}

function countsInStatement(statement: string): number[] {
  const set = new Set<number>()
  for (const m of statement.matchAll(/\d+/g)) {
    const n = Number(m[0])
    if (n > 0) set.add(n)
  }
  return [...set]
}

/** occupancyOf(address) → sealed counts the door arithmetic hits. Same address, same occupancy. */
export function occupancyOf(address: string): readonly number[] {
  const obs = observablesOf(address)
  return sealedCounts().filter((n) => obs.has(n))
}

/** occupancyCitesOf(address) → each occupied count with the census keys that supply it. */
// THE NUMBER→KEYS INDEX IS ADDRESS-INDEPENDENT, so it is built once. It was rebuilt on EVERY call, and the cost
// was the dominant term in the whole hex face: measured 2026-09-04, occupancyCitesOf took 61 of the 67
// microseconds hexFaceOf spends, because each call re-walked OCCUPANCY_KEYS and re-parsed every one of those
// theorems' statements — work that depends only on the sealed ledger and the key list, neither of which can move
// during a run. The address decides only WHICH numbers are looked up, not what the index contains.
//
// Equivalence is exact rather than approximate, and the reason is worth stating: the previous form filtered by
// the address's own hits DURING construction, so its map held fewer entries — but the result only ever reads
// entries for numbers that ARE hits, so the visible answer is identical. Key order is preserved too, since both
// forms append in OCCUPANCY_KEYS order. Asserted over every address in the ledger in the test.
let _occupancyIndex: Map<number, string[]> | null = null

function occupancyIndex(): Map<number, string[]> {
  if (_occupancyIndex) return _occupancyIndex
  const byN = new Map<number, string[]>()
  const byKey = theoremByKey()
  for (const key of OCCUPANCY_KEYS) {
    const t = byKey.get(key)
    if (!t) continue
    for (const n of countsInStatement(t.statement)) {
      const ks = byN.get(n)
      if (ks) { if (!ks.includes(key)) ks.push(key) }
      else byN.set(n, [key])
    }
  }
  _occupancyIndex = byN
  return byN
}

export function occupancyCitesOf(address: string): readonly OccupancyCite[] {
  const byN = occupancyIndex()
  return occupancyOf(address).map((n) => ({ n, keys: byN.get(n) ?? [] }))
}

/** Unpack hexbits MSB-first into 128 bits — the uuid as two 64-bit coins. */
export function bitsOfHexbits(tiles: readonly number[]): number[] {
  const bits: number[] = []
  for (const n of tiles) {
    for (let s = HEXBIT_BITS - 1; s >= 0; s--) bits.push((n >> s) & 1)
  }
  return bits
}

/** twoBoardsOf(address) → the two Fu Xi 8×8 graphs. Each board is LEVERAGE bits; together they are the uuid.
 *  Paying the two coins is what makes the fuse close (the_uuid_is_two_boards, rosette_quantum_doubling_is_two_coins). */
export function twoBoardsOf(address: string): readonly [number[], number[]] {
  const bits = bitsOfHexbits(compileToHexbits(address))
  const half = bits.length / COINS
  return [bits.slice(0, half), bits.slice(half)]
}

/** coinBoardWitness(address) → each of the two coins is a HEXAGRAM_STATES-bit board, and every bit on that
 *  board is witnessed by FUSED_RING neighbours. Complete iff both boards are that wide. */
export function coinBoardWitness(address: string): CoinBoardWitness {
  const faces = twoBoardsOf(address)
  const board = HEXAGRAM_STATES
  let complete = faces.length === COINS
  for (const face of faces) if (face.length !== board) complete = false
  const once = flipCoin(faces)
  const twice = flipCoin(once)
  let reflects = complete
  if (reflects) {
    for (let i = 0; i < board; i++) {
      if (once[0]![i] !== faces[1]![i] || once[1]![i] !== faces[0]![i]) reflects = false
      if (twice[0]![i] !== faces[0]![i] || twice[1]![i] !== faces[1]![i]) reflects = false
    }
  }
  return { coins: COINS, board, neighbours: FUSED_RING, complete, reflects }
}

/** Flip the next coin: its two faces swap. Involutive — reverse of reverse is the coin. */
export function flipCoin(faces: readonly [readonly number[], readonly number[]]): [number[], number[]] {
  return [[...faces[1]], [...faces[0]]]
}

/** Fuse the two coins into the next coin's 128 bits. */
export function nextCoinOf(faces: readonly [readonly number[], readonly number[]]): number[] {
  return [...faces[0], ...faces[1]]
}

/** hexFaceOf(address) → the one stamp compose / transformPageData put on a monograph. */
export function hexFaceOf(address: string): HexFace {
  const door = hexbitDoorOf(address)
  const aura = quantumAura(address)
  const handle = handleOf(address)
  const faces = twoBoardsOf(address)
  const contributed = coins()
  const fused = contributed === COINS
  const ladder = fuseLadder(HANDLE_HEXBITS, contributed)
  const rosette = fuseWidth(HANDLE_HEXBITS, contributed)
  const pentad = fuseWidth(rosette, contributed)
  return {
    handle,
    hexbits: door.hexbits,
    hexagrams: hexagramsOf(address),
    occupancy: occupancyOf(address),
    occupancyCites: occupancyCitesOf(address),
    occupancyDoors: OCCUPANCY_KEYS,
    aura: { hsl: aura.hsl, hue: aura.hue, ray: aura.ray, wave: aura.wave, ten: aura.ten },
    handleParts: handleParts(door.handle),
    door: door.door,
    board: HANDLE_HEXBITS,
    gates: LEVERAGE,
    hexagramBits: HEXAGRAM_BITS,
    faces,
    coins: COINS,
    referrerDoor: referrerDoorOf(handle),
    merkaba: HANDLE_HEXBITS,
    ladder,
    rosette,
    pentad,
    fused,
    metatron: metatronOf(address),
    hexPi: hexPiOf(address),
    glyphs: { star: GLYPH_STAR, rose: GLYPH_ROSE, ring: GLYPH_RING, wheel: GLYPH_WHEEL },
    stations: { trinity: TRINITY, rays: STATION_RAYS, ten: STATION_TEN, roof: PI_ROOF_NUM },
    packedTriangles: KEY_BITS,
    merkabasPacked: UUID_HEXBITS,
    veFaces: VE_FACES,
  }
}

/** monographFaceOf(address) → flat params bag for compose / VitePress transformPageData. */
export function monographFaceOf(address: string): Record<string, unknown> {
  const face = hexFaceOf(address)
  return {
    handle: face.handle,
    hexbits: face.hexbits,
    hexagrams: face.hexagrams,
    occupancy: face.occupancy,
    occupancyCites: face.occupancyCites,
    occupancyDoors: face.occupancyDoors,
    aura: face.aura,
    handleParts: face.handleParts,
    handleUrl: face.door,
    depositReferrer: face.door,
    board: face.board,
    gates: face.gates,
    hexagramBits: face.hexagramBits,
    faces: face.faces,
    coins: face.coins,
    referrerDoor: face.referrerDoor,
    merkaba: face.merkaba,
    ladder: face.ladder,
    rosette: face.rosette,
    pentad: face.pentad,
    fused: face.fused,
    metatron: face.metatron,
    hexPi: face.hexPi,
    glyphs: face.glyphs,
    stations: face.stations,
    packedTriangles: face.packedTriangles,
    merkabasPacked: face.merkabasPacked,
    veFaces: face.veFaces,
  }
}

// ── UUID channel — the 8-4-4-4-12 cut (layout_groups_thirtytwo). Payload store optional on the wire. ──

/** RFC 9562 printable groups — 32 hex digits; four hyphens bring the printed form to 36 characters. */
export const UUID_LAYOUT_GROUPS = [8, 4, 4, 4, 12] as const
export const UUID_LAYOUT_SEPARATORS = UUID_LAYOUT_GROUPS.length - 1
export const UUID_LAYOUT_HEX_CHARS = UUID_LAYOUT_GROUPS.reduce((a, b) => a + b, 0)
export const UUID_LAYOUT_PRINTED_CHARS = UUID_LAYOUT_HEX_CHARS + UUID_LAYOUT_SEPARATORS

/** One 4-hex group = message_cap_is_four_hexbits: 4 tiles × 4 bits = 16 qubits, 2^16 amplitudes. */
export const MESSAGE_CAP_HEXBITS = UUID_LAYOUT_GROUPS[1]
export const MESSAGE_CAP_QUBITS = MESSAGE_CAP_HEXBITS * HEXBIT_BITS
export const MESSAGE_CAP_AMPLITUDES = HEXBIT_STATES ** MESSAGE_CAP_HEXBITS

/** Three middle [xxxx] groups execute; the closing twelve hex carries the sealed micro-message. */
export const HEX_TRINITY_COUNT = 3
export const TAIL_HEXBITS = UUID_LAYOUT_GROUPS[4]
export const EXECUTABLE_HEXBITS =
  UUID_LAYOUT_GROUPS[1] + UUID_LAYOUT_GROUPS[2] + UUID_LAYOUT_GROUPS[3]
export const PAYLOAD_HEXBITS = EXECUTABLE_HEXBITS + TAIL_HEXBITS

export type UuidLayout = {
  handle: string
  /** Three message-cap words — the executable middle (4 hex each). */
  trinities: readonly [string, string, string]
  tail: string
  /** The three words merged (12 hex) — one executable combination, not three path segments. */
  words: string
  /** Payload after the handle: words extended with the tail message (24 hex). */
  middle: string
}

/** Strip hyphens; refuse wrong width. */
export function uuidHex(address: string): string {
  const hex = String(address).replace(/-/g, '').toLowerCase()
  if (hex.length !== UUID_LAYOUT_HEX_CHARS)
    throw new Error(`uuid channel: expected ${UUID_LAYOUT_HEX_CHARS} hex digits, got ${hex.length}`)
  if (!/^[0-9a-f]+$/.test(hex)) throw new Error('uuid channel: not lowercase hex')
  return hex
}

/** Split the address into handle, three message-cap words, tail, and the merged middle payload. */
export function layoutGroups(address: string): UuidLayout {
  const hex = uuidHex(address)
  let at = 0
  const take = (n: number): string => {
    const s = hex.slice(at, at + n)
    at += n
    return s
  }
  const handle = take(UUID_LAYOUT_GROUPS[0])
  const trinities = [take(UUID_LAYOUT_GROUPS[1]), take(UUID_LAYOUT_GROUPS[2]), take(UUID_LAYOUT_GROUPS[3])] as const
  const tail = take(UUID_LAYOUT_GROUPS[4])
  const words = trinities.join('')
  return { handle, trinities, tail, words, middle: words + tail }
}

/** Each middle group as four hexbit states (0..15) — one message-cap unit per trinity. */
export function hexTrinityStates(address: string): readonly [number[], number[], number[]] {
  const { trinities } = layoutGroups(address)
  return trinities.map((g) => g.split('').map((c) => parseInt(c, 16))) as [number[], number[], number[]]
}

/** Executable action states — the three trinities compiled (12 hexbits after the handle). */
export function executableStates(address: string): number[] {
  return compileToHexbits(address).slice(HANDLE_HEXBITS, HANDLE_HEXBITS + EXECUTABLE_HEXBITS)
}

/** Tail states — sealed micro-message channel (12 hexbits). */
export function tailStates(address: string): number[] {
  return compileToHexbits(address).slice(HANDLE_HEXBITS + EXECUTABLE_HEXBITS)
}

/** Double-torus memory step: two boards swap involutively — flip twice returns home. */
export function torusStep(address: string): {
  faces: ReturnType<typeof twoBoardsOf>
  once: ReturnType<typeof flipCoin>
  home: boolean
} {
  const faces = twoBoardsOf(address)
  const once = flipCoin(faces)
  const twice = flipCoin(once)
  const home =
    twice[0].every((b, i) => b === faces[0]![i]) &&
    twice[1].every((b, i) => b === faces[1]![i])
  return { faces, once, home }
}

/** Channel view — secure messaging without the payload store unless loaded. */
export function uuidChannel(address: string): {
  address: string
  handle: string
  door: string
  trinities: readonly [string, string, string]
  /** Three message-cap words merged — one executable combination (12 hex). */
  words: string
  /** Payload after the handle: words extended with the tail message (24 hex). */
  middle: string
  tail: string
  executable: readonly number[]
  tailStates: readonly number[]
  payloadStoreOptional: true
} {
  const { handle, trinities, tail, words, middle } = layoutGroups(address)
  return {
    address: uuidHex(address),
    handle,
    door: `https://uuidna.com/${handle}`,
    trinities,
    words,
    middle,
    tail,
    executable: executableStates(address),
    tailStates: tailStates(address),
    payloadStoreOptional: true,
  }
}

export function layoutMatchesHandle(address: string): boolean {
  return layoutGroups(address).handle === handleOf(address)
}

export function layoutWidths(): {
  groups: readonly number[]
  bits: readonly number[]
  hexChars: number
  payloadHexbits: number
} {
  return {
    groups: UUID_LAYOUT_GROUPS,
    bits: UUID_LAYOUT_GROUPS.map((g) => g * HEXBIT_BITS),
    hexChars: UUID_LAYOUT_HEX_CHARS,
    payloadHexbits: PAYLOAD_HEXBITS,
  }
}

export function layoutCoversUuid(address: string): boolean {
  return compileToHexbits(address).length === UUID_HEXBITS
}

export function channelAudit(address: string): ReturnType<typeof uuidChannel> & {
  torusHome: boolean
  widths: ReturnType<typeof layoutWidths>
} {
  return { ...uuidChannel(address), torusHome: torusStep(address).home, widths: layoutWidths() }
}

export type ChannelStream = Stream & { channels: ReturnType<typeof uuidChannel>[] }

export function channelSeal(
  message: string,
  passphrases: readonly string[],
  step?: number,
): ChannelStream {
  const stream = sealStream(message, passphrases, step)
  return { ...stream, channels: stream.uuids.map((u) => uuidChannel(u)) }
}

/** channelOpen(uuids, passphrases) → involute of channelSeal: peel the onion, attach every handle channel slice. */
export function channelOpen(
  uuids: readonly string[],
  passphrases: readonly string[],
): ChannelStream & { message: string } {
  const message = openStream(uuids, passphrases)
  return {
    message,
    uuids: [...uuids],
    layers: passphrases.length,
    receipt: merkleFold([...uuids]),
    channels: uuids.map((u) => uuidChannel(u)),
  }
}

// ── lifeWave — one conserved product over the living ledger and hardware spec. ──

export interface LifeWaveHardware {
  layerSeals: number
  hardware: number
  software: number
  os: number
  datapath: number
  lanes: number
  digestBits: number
  verifyBits: number
}

export interface LifeWave {
  wave: CoinYarrowWave
  hardware: LifeWaveHardware
  living: number
  skills: number
  product: number
  covers: boolean
  receipt: string
}

/** lifeWave() → one conserved wave over every sealed theorem, carrying the hardware spec and the living count. */
export function lifeWave(): LifeWave {
  const T = theorems()
  const wave = coinYarrowWave(T.length)
  const hw = hardwareLayer()
  const sw = softwareLayer()
  const os = osLayer()
  const life = growLife()
  const skills = skillGroups()
  let clustered = 0
  for (const g of skills) clustered += g.count
  const hardware: LifeWaveHardware = {
    layerSeals: hw.count + sw.count + os.count,
    hardware: hw.count,
    software: sw.count,
    os: os.count,
    datapath: DATAPATH.length,
    lanes: LANES.length,
    digestBits: KEY_BITS,
    verifyBits: UUID_BITS,
  }
  return {
    wave,
    hardware,
    living: life.life.living,
    skills: skills.length,
    product: WAVE_PRODUCT,
    covers: wave.seals === life.life.living && clustered === T.length && wave.product === WAVE_PRODUCT,
    receipt: toUuid('life-wave|' + wave.seals + '|' + hardware.layerSeals + '|' + life.life.living + '|' + skills.length),
  }
}
