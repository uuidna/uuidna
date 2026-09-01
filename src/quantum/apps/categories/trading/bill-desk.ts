// categories/trading/bill-desk — WHAT A WORKLOAD COSTS, AND WHAT THE WALLET HOLDS (lead 89's missing floor: the
// captain named [trading|gaming|coding|…] and trading was the one shelf never built). Two instruments composed
// from the billing surface that already exists — bill/account are IMPORTED, never re-implemented (one source,
// many surfaces): the desk prices a workload in the ledger's own unit, and the census counts what has been
// minted against what is conserved.
//
// , THE STRICTEST ON ANY SHELF — the psychology wing's discipline applied at full strength: a coin
// here is a MEASURED UNIT OF WORK SAVED (two per verified exchange, conserved by theorem two_coins), never a
// price in any nation's money, never a security, never a claim about anyone's finances, and NOTHING on this
// shelf is advice of any kind. The desk answers "what did this cost in work-units" — a question about
// arithmetic — and refuses every question about value, worth, or what anyone should do.
import { bill, account, PRICE, type Billable } from '../../../../billing/index.js'
import { coins } from '../../../../captain/billing/index.js'

export interface WorkloadCost { events: number; coins: number; lines: { event: string; count: number; coins: number }[]; honest: string }

/** price a workload: how many coins the ledger's own billing charges for these events. */
export function costOf(counts: Partial<Record<Billable, number>>): WorkloadCost {
  const acc = account(counts)
  return {
    events: acc.events,
    coins: acc.coins,
    lines: acc.charges.map((c) => ({ event: String((c as { event?: string }).event ?? ''), count: Number((c as { count?: number }).count ?? 0), coins: Number((c as { coins?: number }).coins ?? 0) })),
    honest: 'work-units, never money — a coin is a measured unit of work saved, and this desk gives no advice',
  }
}

export interface WalletCensus { seals: number; derived: number; minted: number; perExchange: number; conserved: boolean; honest: string }

/** the wallet, counted: two coins per sealed thing, and the conservation checked rather than assumed. */
export function walletCensus(seals: number, derived: number): WalletCensus {
  const minted = (seals + derived) * PRICE
  return {
    seals,
    derived,
    minted,
    perExchange: PRICE,
    // conservation is a CHECK, not a promise: the rate must be exactly the sealed two, at every scale
    conserved: PRICE === coins() && minted === coins() * (seals + derived),
    honest: 'the count of work-units minted by proofs and seals — no currency, no market, no holder',
  }
}

/** one event's charge, for the reader who wants the smallest true answer. */
export const chargeFor = (event: Billable, count = 1): number => Number((bill(event, count) as { coins?: number }).coins ?? 0)
