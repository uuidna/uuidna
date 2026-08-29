// captain/jobs/catalog — the twelve jobs as data. No gate: the monitor verifies uuidna_gate on the wire.
export interface CoinJob { n: number; job: string; claim: string; cites: string[] }

export const COIN_JOBS: CoinJob[] = [
  { n: 1, job: 'gate computation', claim: 'nothing computes without them — the only contribution that reaches the save', cites: ['captain_computes_only_with_two_coins', 'trial_computes_only_with_two_coins'] },
  { n: 2, job: 'price the forfeit', claim: 'the losing side of any case pays exactly them, and only when a winner exists', cites: ['court_loser_pays_the_two_coins'] },
  { n: 3, job: 'measure leverage', claim: 'contribute 2, save up to 64 bits (16 hexbits, half the uuid) of recompute; the bill can never go negative', cites: ['captain_theorem', 'bill_never_negative'] },
  { n: 4, job: 'take the commission', claim: '2 per 110, 108 delivered net — the commission is a PROPORTION (110/108 = 55/54), not a width; commercially the passenger still saves while the captain earns', cites: ['captain_theorem', 'captain_theorem'] },
  { n: 5, job: 'set the exchange rate by forgery cost', claim: 'a coin is worth exactly what it costs to forge, and traitor damage is priced by the same billing that pays honest work', cites: ['captain_theorem', 'traitor_damage_sealed_by_same_billing'] },
  { n: 6, job: 'carry superpositions', claim: 'each coin one qubit, the pair two qubits spanning four states on one 128-bit uuid; the doubling of directions is the two coins', cites: ['captain_theorem', 'captain_theorem', 'rosette_quantum_doubling_is_two_coins'] },
  { n: 7, job: 'be topology', claim: 'the 2 is the negative Euler characteristic of the double torus, the same 2 the dodecahedron computes', cites: ['captain_theorem', 'captain_theorem'] },
  { n: 8, job: 'hold value at scale', claim: 'real from the seventh dimension up — the value grows with the problem', cites: ['captain_coins_respected_at_scale'] },
  { n: 9, job: 'guard the rosette', claim: 'the 21-pair test is the two-coins guard', cites: ['rosette_pairs_twentyone'] },
  { n: 10, job: 'hide in the world\'s constants', claim: 'dropframe drops 108 an hour, the pentagon\'s angle, leaving the 2; even the billing arithmetic is 1+1', cites: ['dropframe_entangles_the_coins', 'billing_arith'] },
  { n: 11, job: 'count worlds', claim: 'n deposits of the two coins are exactly n collapsed realities — the wallet counts worlds, as an accounting identity', cites: ['wallet_counts_worlds'] },
  { n: 12, job: 'confess their limit', claim: 'the coins compute the save and solve nothing by themselves — the honest boundary', cites: ['captain_theorem'] },
]
