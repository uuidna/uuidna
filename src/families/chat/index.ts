import { facesOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DECENTRALISED COMBINATORICS OF THE CHAT. The unit's message door has faces lanes, each hop an involution, every
 *  message a UUID imprint of its time and lane (messageOf). Agents coordinate without a registry: a pair of
 *  agents computes its lane from their two indices alone (the pair's number among all pairs, folded to the lanes),
 *  a group of k among n has C(n, k) lanes to choose from, a broadcast reaches n agents in ⌈log₂ n⌉ rounds by doubling
 *  or n − 1 by a chain, and the pairs that must share a lane are counted, not hidden. Every formula is a natural of
 *  naturals; the message door takes the lane it names. */

const PROOF = 'messageOf: faces lanes, hop(lane) = lane, UUID imprints; C(n, 2) pairs folded to the lanes'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chat', dst: 'receipts', formula, value, proof: PROOF, ...extra }, holds, { name: `chat.${name}`, params })
const choose = (n: number, k: number): number => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r) }

export class ChatFormulas {
  /** The lane of the pair (a, b), a ≠ b: the pair's number among all pairs (b(b − 1)/2 + a for a < b) folded to the faces lanes. */
  static lane(a: number, b: number): CrossFormula {
    const [lo, hi] = a < b ? [a, b] : [b, a]
    const pair = (hi * (hi - 1)) / 2 + lo
    return f('chat-lane', 'lane(a, b) = (b(b − 1)/2 + a) mod faces, a < b', nat(a, b) && a !== b ? pair % facesOf().faces : 0, nat(a, b) && a !== b, 'lane', [a, b], { pair })
  }
  /** The lanes n agents can form: every pair and every agent's own (broadcast) lane, C(n, 2) + n. */
  static lanes(n: number): CrossFormula { return f('chat-lanes', 'lanes(n) = C(n, 2) + n', choose(n, 2) + n, nat(n) && n > 0, 'lanes', [n]) }
  /** The group lanes of k among n agents: C(n, k). */
  static groups(n: number, k: number): CrossFormula { return f('chat-groups', 'groups(n, k) = C(n, k)', choose(n, k), nat(n, k) && k >= 2 && k <= n, 'groups', [n, k]) }
  /** The pairs of n agents that must share a lane: C(n, 2) − faces when the pairs outnumber the lanes, else 0. */
  static collisions(n: number): CrossFormula { const pairs = choose(n, 2); return f('chat-collisions', 'collisions(n) = max(0, C(n, 2) − faces)', Math.max(0, pairs - facesOf().faces), nat(n), 'collisions', [n], { pairs, lanes: facesOf().faces }) }
  /** The rounds a broadcast needs to reach n agents when every agent that has it passes it on: ⌈log₂ n⌉. */
  static gossip(n: number): CrossFormula { return f('chat-gossip', 'gossip(n) = ⌈log₂ n⌉', n > 0 ? Math.ceil(Math.log2(n)) : 0, nat(n) && n > 0, 'gossip', [n]) }
  /** The messages a chain needs to reach n agents one after another: n − 1. */
  static chain(n: number): CrossFormula { return f('chat-chain', 'chain(n) = n − 1', n > 0 ? n - 1 : 0, nat(n) && n > 0, 'chain', [n]) }
}

for (const name of ['chain', 'collisions', 'gossip', 'groups', 'lane', 'lanes'] as const)
  hexRegisterOf('chat', name, (ChatFormulas[name] as (...x: unknown[]) => unknown).bind(ChatFormulas))
