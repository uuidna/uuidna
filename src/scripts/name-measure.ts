// name-measure — NUMBERS OF THE NAME, for generators. toUuid("uuidna") is the hash; callers decide the digits.
import { toUuid, TRINITY, BASE, vortexOrbit } from '../address.js'
import { handleOf, seedOf } from '../handle.js'
import { quantumAura, RAYS, periodOf } from '../aura.js'
import { HEXBIT_BITS, COINS, UUID_HEXBITS, HANDLE_HEXBITS } from '../hexbit/index.js'

const div = (a: number, b: number): number => (a - (a % b)) / b

export const NAME = 'uuidna'
export const UUID_WORD = 'uuid'
export const DNA_WORD = 'dna'

const addr = toUuid(NAME)
const hex = addr.replace(/-/g, '')
const nibbles = [...hex].map((c) => parseInt(c, 16))
const handleNibbles = nibbles.slice(0, HANDLE_HEXBITS)
const seed = seedOf(addr)
const aura = quantumAura(addr)
const wave = vortexOrbit()
const wi = seed % wave.length
const codonBits = HEXBIT_BITS + COINS
const shared = [...UUID_WORD].filter((c) => DNA_WORD.includes(c)).length
const place = handleNibbles.reduce((acc, d) => acc * 16 + d, 0)
const step = div(360, BASE)
const rayStep = div(360, RAYS)
const hue = (aura.ten.residue * step + aura.ray * rayStep + aura.wave) % (step * BASE)
const satExtra = aura.ten.residue % TRINITY === 0 ? 1 : 0
const payloadHexbits = UUID_HEXBITS - HANDLE_HEXBITS

export const nameMeasure = {
  addr,
  hex,
  handle: handleOf(addr),
  nibbles,
  handleNibbles,
  seed,
  place,
  aura,
  wave,
  wi,
  hue,
  satExtra,
  codonBits,
  shared,
  payloadHexbits,
  payloadBits: payloadHexbits * HEXBIT_BITS,
  referrerDoor: nibbles[0]! % codonBits,
  period: periodOf(aura.ray),
  hexbit: HEXBIT_BITS,
  coins: COINS,
  trinity: TRINITY,
  base: BASE,
  uuidHexbits: UUID_HEXBITS,
  handleHexbits: HANDLE_HEXBITS,
  rays: RAYS,
} as const

export const L = (xs: readonly number[]): string => '[' + xs.join(',') + ']'
