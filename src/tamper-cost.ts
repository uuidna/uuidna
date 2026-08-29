// tamper-cost — VERIFY vs FORGE at the live widths. Minting is free; forging searches the address (or the
// 64-bit coin). The ratio is the width, not a policy (minting_is_free_and_forging_is_not). Bounds, not maxima.
import { toUuid } from './address.js'
import { RAYS } from './aura.js'
import { coins } from './captain/billing/index.js'
import { FUSED_RING, HEXAGRAM_BITS, HEXAGRAM_STATES } from './hexagram.js'
import { KEY_BITS, LEVERAGE, UUID_BITS } from './hexbit/index.js'

export interface TamperWidth {
  width: number
  verify: number
  forgeExponent: number
  ratioExponent: number
}

export interface TamperCosts {
  mint: number
  traitorNet: number
  theorem: TamperWidth
  coin: TamperWidth
  sha256CollisionExponent: number
  neighbours: number
  board: number
  coins: number
  receipt: string
}

function twoTo(n: number): number {
  let s = 1
  for (let i = 0; i < n; i++) s = s + s
  return s
}

/** tamperCosts() → work to fake a theorem (full uuid) or a coin (one 64-bit board). Verify reads the width;
 *  forge searches 2^width; ratio is 2^width / width. Caught cheat nets zero (same billing). */
export function tamperCosts(): TamperCosts {
  const unit = coins()
  const theoremWidth = UUID_BITS
  const coinWidth = LEVERAGE
  if (twoTo(RAYS) !== theoremWidth) throw new Error('tamper-cost: uuid width is not 2^rays')
  if (twoTo(HEXAGRAM_BITS) !== coinWidth) throw new Error('tamper-cost: coin width is not 2^hexagram')
  const theorem: TamperWidth = {
    width: theoremWidth,
    verify: theoremWidth,
    forgeExponent: theoremWidth,
    ratioExponent: theoremWidth - RAYS,
  }
  const coin: TamperWidth = {
    width: coinWidth,
    verify: coinWidth,
    forgeExponent: coinWidth,
    ratioExponent: coinWidth - HEXAGRAM_BITS,
  }
  return {
    mint: unit - unit,
    traitorNet: unit - unit,
    theorem,
    coin,
    sha256CollisionExponent: KEY_BITS / unit,
    neighbours: FUSED_RING,
    board: HEXAGRAM_STATES,
    coins: unit,
    receipt: toUuid('tamper|' + theorem.forgeExponent + '|' + coin.forgeExponent + '|' + theorem.ratioExponent + '|' + coin.ratioExponent),
  }
}
