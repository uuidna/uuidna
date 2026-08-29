// billing — THE BILLABLE EVENTS, AS TYPES, AT ONE PRICE.
//
// Three things in this ledger are billable and they were counted in three unrelated places: sealing a theorem
// (minting_is_two_per_theorem), calling the hosted MCP (every call deposits), and CITING a theorem — which was
// billed nowhere at all. So the books balanced on what was made and never on what was used, and the price
// itself had two derivations: `coins()` in captain/billing computing 110 − 108, and COINS in hexbit written 2.
// PRICE now IS coins() — the computed captain theorem — and axiom-hunt binds two_coins so hexbit COINS cannot
// drift from that price in silence. Same number, watched sources.
//
// ONE PRICE, NAMED EVENTS. A billable event is a passage, and a passage costs a coin at each end — one entering,
// one leaving, which is where the two comes from rather than from a price list (the_passage_costs_a_coin_at_each_end).
// Every event type below pays exactly that, and none of them may set their own rate: the price is a PROPORTION
// on the whole, not a per-item fee, which is why the same two coins cover a proof settling one case and a proof
// settling 55,986.
//
// USE IS BILLABLE, AND THAT IS THE GAP THIS CLOSES. A citation draws on a sealed proof to back a claim, which is
// a use of the ledger's work. The keys cited were already known — citationsGaps reads them to catch departed
// ones — so the count was available and simply never charged.
import { coins } from '../captain/billing/index.js'

/** the three ways the ledger is used, and there are no others. */
export type Billable = 'seal' | 'call' | 'cite'

export interface Charge { event: Billable; count: number; coins: number; why: string }

/** THE PRICE, from one place: coins() = 110 − 108, not a second literal beside hexbit COINS. */
export const PRICE: number = coins()

export const WHY: Record<Billable, string> = {
  seal: 'a theorem sealed — the kernel settled it and the ledger carries it',
  call: 'a tool call answered — the hosted edge recomputed and returned a verdict',
  cite: 'a theorem cited — a claim drew on sealed work to stand up',
}

/** bill(event, n) → what n INDEPENDENT events cost. Each is its own passage with its own two ends, so the
 *  charge is n x 2: sealing one theorem does not put you halfway through sealing the next. */
export const bill = (event: Billable, count: number): Charge =>
  ({ event, count, coins: count * PRICE, why: WHY[event] })

/** billChain(n) → what n LINKED passages cost, which is not n x 2.
 *
 *  The cost is a coin per gateway END, and leaving one gateway is entering the next, so consecutive passages
 *  SHARE an end: n links have n+1 ends, not 2n. Three passages cost four coins and not six. The two coins are
 *  the base case of the law rather than the rate — they agree only at n = 1, and a flat two-per-event overcharges
 *  every chain after it (`a_chain_shares_its_gateway_ends`).
 *
 *  This is the shape a referrer chain actually has: each link's destination recognises the referrer it came from,
 *  so the end they meet at is one end and not two, and the coin is traced through rather than paid twice. */
export const billChain = (links: number): Charge =>
  ({ event: 'call', count: links, coins: links > 0 ? links + 1 : 0, why: 'a chain of linked passages — ends are shared, so n links cost n+1' })

/** the whole account across every event type — quantity and value together, which is what an audit balances. */
export const account = (counts: Partial<Record<Billable, number>>): { charges: readonly Charge[]; events: number; coins: number } => {
  const charges = (Object.keys(WHY) as Billable[])
    .filter((e) => (counts[e] ?? 0) > 0)
    .map((e) => bill(e, counts[e] ?? 0))
  return {
    charges,
    events: charges.reduce((a, c) => a + c.count, 0),
    coins: charges.reduce((a, c) => a + c.coins, 0),
  }
}

/** billEntangled(n) → what n superpositions cost to HOLD, which is 2n and never less.
 *
 *  The two coins decompose: one switches the dimension, one keeps track. Entanglement pays both per state,
 *  because tracking cannot be shared — a record merged with its neighbour's would stop telling them apart, and
 *  telling them apart is the whole point of holding them. So this is the expensive topology, and deliberately:
 *  a chain shares its ends and costs n+1, entanglement shares nothing and costs 2n. They meet at n = 1, where a
 *  single superposition is a single passage and both readings return the captain commission
 *  (`two_coins_are_switch_and_track`). */
export const billEntangled = (states: number): Charge =>
  ({ event: 'call', count: states, coins: states * PRICE, why: 'superpositions held in entanglement — one coin switches, one tracks, and neither is shared' })
