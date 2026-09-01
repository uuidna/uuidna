// categories/trading — THE TRADING FLOOR (lead 89's missing shelf: the captain named [trading|gaming|coding|…]
// and this was the one category never built). Four instruments over the ledger's own billing arithmetic — the
// desk that prices a workload, the census that counts what has been minted, the leverage that measures what a
// receipt spares a verifier, and the compound that reads the rate at which a growing ledger spares re-derivation.
// Every figure is IMPORTED from the sealed billing surface or computed from a sealed constant; nothing here is
// re-implemented (one_source_is_exactly_one).
//
// THE SHELF'S a coin is a MEASURED UNIT OF
// WORK SAVED, conserved at two per verified exchange (two_coins) — it is not money, not a security, not a
// holding, and not anyone's wealth. Nothing on this floor is financial advice, a valuation, a forecast, or a
// claim about markets; the psychology wing's discipline applies at full strength. These instruments answer
// "how much work did this cost or spare", which is arithmetic, and refuse every question about worth.
export { costOf, walletCensus, chargeFor, type WorkloadCost, type WalletCensus } from './bill-desk.js'
export { leverageOf, compoundAt, RATE_NUM, RATE_DEN, FIRST_DOUBLING, type Leverage, type Compound } from './meters.js'
