// tamper-cost — VERIFY vs FORGE at the live widths. Minting is free; forging must satisfy the coin board,
// every FUSED_RING neighbour witness, the reflecting face, and (at uuid) rosetta locate legs — 63·2+2 = 128
// (captain_theorem; captain_theorem_the_coins_buy_the_ring_and_one). Bounds, not maxima.
import { toUuid } from './address.js'
import { RAYS } from './aura.js'
import { coins } from './captain/billing/index.js'
import { FUSED_RING, HEXAGRAM_BITS, HEXAGRAM_STATES } from './hexagram.js'
import { COINS, HANDLE_BITS, HANDLE_HEXBITS, KEY_BITS, LEVERAGE, UUID_BITS } from './hexbit/index.js'
import { LEGS } from './rosetta-legs.js'

export interface TamperWidth {
  width: number
  verify: number
  forgeExponent: number
  ratioExponent: number
}

/** One tier of the ladder — bare width plus the neighbour/related witnesses a forger must also satisfy. */
export interface TamperTier extends TamperWidth {
  neighbourWitnesses: number
  relatedWitnesses: number
  closure: number
  forgeWithWitnessesExponent: number
  completionExponent?: number
}

export interface TamperCosts {
  mint: number
  traitorNet: number
  handle: TamperTier
  coin: TamperTier
  theorem: TamperTier
  sha256CollisionExponent: number
  neighbours: number
  board: number
  coins: number
  handlesPerUuid: number
  handlesPerCoin: number
  rosettaLegs: number
  locateLegs: number
  receipt: string
}

function twoTo(n: number): number {
  let s = 1
  for (let i = 0; i < n; i++) s = s + s
  return s
}

/** tamperCosts() → verify-vs-forge at handle, coin, and uuid tiers, each with neighbour + related witness counts. */
export function tamperCosts(): TamperCosts {
  const unit = coins()
  const theoremWidth = UUID_BITS
  const coinWidth = LEVERAGE
  const handleWidth = HANDLE_BITS
  const handlesPerUuid = theoremWidth / handleWidth
  const handlesPerCoin = coinWidth / handleWidth
  const locateLegs = 2 * 1 + 1
  const coinNeighbourTotal = FUSED_RING + 1
  const uuidWitnessTotal = FUSED_RING * COINS + COINS
  if (twoTo(RAYS) !== theoremWidth) throw new Error('tamper-cost: uuid width is not 2^rays')
  if (twoTo(HEXAGRAM_BITS) !== coinWidth) throw new Error('tamper-cost: coin width is not 2^hexagram')
  if (coinNeighbourTotal !== coinWidth) throw new Error('tamper-cost: ring+closure is not coin width')
  if (uuidWitnessTotal !== theoremWidth) throw new Error('tamper-cost: neighbour·coins+closure is not uuid width')
  if (handlesPerUuid !== 4) throw new Error('tamper-cost: handle quarters do not span uuid')
  const handle: TamperTier = {
    width: handleWidth,
    verify: handleWidth,
    forgeExponent: handleWidth,
    ratioExponent: handleWidth - HANDLE_HEXBITS,
    neighbourWitnesses: FUSED_RING,
    relatedWitnesses: handlesPerUuid - 1,
    closure: 1,
    completionExponent: theoremWidth - handleWidth,
    forgeWithWitnessesExponent: theoremWidth,
  }
  const coin: TamperTier = {
    width: coinWidth,
    verify: coinWidth,
    forgeExponent: coinWidth,
    ratioExponent: coinWidth - HEXAGRAM_BITS,
    neighbourWitnesses: FUSED_RING,
    relatedWitnesses: 1,
    closure: 1,
    forgeWithWitnessesExponent: coinNeighbourTotal,
  }
  const theorem: TamperTier = {
    width: theoremWidth,
    verify: theoremWidth,
    forgeExponent: theoremWidth,
    ratioExponent: theoremWidth - RAYS,
    neighbourWitnesses: FUSED_RING * COINS,
    relatedWitnesses: locateLegs,
    closure: COINS,
    forgeWithWitnessesExponent: uuidWitnessTotal,
  }
  return {
    mint: unit - unit,
    traitorNet: unit - unit,
    handle,
    coin,
    theorem,
    sha256CollisionExponent: KEY_BITS / unit,
    neighbours: FUSED_RING,
    board: HEXAGRAM_STATES,
    coins: unit,
    handlesPerUuid,
    handlesPerCoin,
    rosettaLegs: LEGS.length,
    locateLegs,
    receipt: toUuid('tamper|h' + handle.forgeWithWitnessesExponent + '|c' + coin.forgeWithWitnessesExponent + '|u' + theorem.forgeWithWitnessesExponent + '|n' + FUSED_RING + '|r' + locateLegs),
  }
}
