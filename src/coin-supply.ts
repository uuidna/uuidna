// coin-supply — ISSUANCE AGAINST A CAPPED MINT, BACKING THE CIPHER WIDTHS.
//
// Sealing a theorem mints coins() coins (minting_is_two_per_theorem). The cap is quantum capacity times
// directed referrer combinations: fuseWidth(HANDLE_HEXBITS, coins()) → 7, capacityAt(7) = UUID_BITS = 128,
// combinations = RAYS × (RAYS − 1) = HEXAGRAM_BITS × RAYS = 42 (directions_number_fortytwo). The crypto
// occupancy is the same two coins doubled into the key: KEY_BITS = UUID_BITS × coins(); Grover's floor is
// one uuid (sha256_grover_margin_is_the_address). Coverage (ledgerCoins) is a different axis — discovery
// buys coverage, never this cap (discovery_buys_coverage_never_supply).
import { toUuid } from './address.js'
import { RAYS } from './aura.js'
import { coins } from './captain/billing/index.js'
import { HEXAGRAM_BITS, HEXAGRAM_STATES, FUSED_RING } from './hexagram.js'
import { capacityAt, fuseWidth, HANDLE_HEXBITS, HEXBIT_BITS, KEY_BITS, LEVERAGE, UUID_BITS } from './hexbit/index.js'
import { theorems } from './theorems/index.js'

export interface CoinSupplyCrypto {
  coinBits: number
  floorBits: number
  keyBits: number
  coinsOnFloor: number
  coinsOnKey: number
}

/** Each coin-gate is witnessed by the fused ring (board minus itself). */
export interface CoinSupplyWitness {
  neighbours: number
  board: number
  coins: number
}

export interface CoinSupply {
  coins: number
  unit: number
  seals: number
  minted: number
  capacity: number
  referrerDoors: number
  combinations: number
  max: number
  remaining: number
  capSeals: number
  unsealed: number
  search: number
  decimalSubunit: number
  crypto: CoinSupplyCrypto
  witness: CoinSupplyWitness
  receipt: string
}

/** coinSupply(seals?) → live mint against the capacity × combinations cap.
 *  Default seals is the sealed ledger length. A CONTROL omits seals; the cap does not move. */
export function coinSupply(seals?: number): CoinSupply {
  const unit = coins()
  const n = seals === undefined ? theorems().length : (!Number.isInteger(seals) || seals < 0 ? 0 : seals)
  const minted = n * unit
  const capacity = capacityAt(fuseWidth(HANDLE_HEXBITS, unit))
  const referrerDoors = HEXAGRAM_BITS
  const combinations = RAYS * (RAYS - 1)
  const max = capacity * combinations
  const remaining = max - minted
  const capSeals = max / unit
  const unsealed = capSeals - n
  const search = unit - unit
  let decimalSubunit = 1
  const ten = HEXBIT_BITS + HEXAGRAM_BITS
  for (let i = 0; i < HANDLE_HEXBITS; i++) decimalSubunit = decimalSubunit * ten
  const coinBits = LEVERAGE
  const floorBits = UUID_BITS
  const keyBits = KEY_BITS
  return {
    coins: unit,
    unit,
    seals: n,
    minted,
    capacity,
    referrerDoors,
    combinations,
    max,
    remaining,
    capSeals,
    unsealed,
    search,
    decimalSubunit,
    crypto: {
      coinBits,
      floorBits,
      keyBits,
      coinsOnFloor: floorBits / coinBits,
      coinsOnKey: keyBits / coinBits,
    },
    witness: { neighbours: FUSED_RING, board: HEXAGRAM_STATES, coins: unit },
    receipt: toUuid('coin-supply|' + n + '|' + minted + '|' + max + '|' + remaining + '|' + keyBits),
  }
}
