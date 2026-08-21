// captain/jobs — THE TWELVE JOBS OF THE COINS as data whose every claim carries its citations, with a SELF-TRIAL
// built in: coinsJobs() runs each job through the gate on every read, so the catalog cannot drift from the ledger
// it describes — a vanished theorem breaks the catalog's own verdict rather than passing silently.

import { reveal } from '../../gate.js'
import { toUuid } from '../../address.js'

export interface CoinJob { n: number; job: string; claim: string; cites: string[] }
export interface CoinJobsReport {
  jobs: Array<CoinJob & { verdict: string }>
  verified: number
  total: number
  receipt: string
  honest: string
}

const JOBS: CoinJob[] = [
  { n: 1, job: 'gate computation', claim: 'nothing computes without them — the only contribution that reaches the save', cites: ['captain_computes_only_with_two_coins', 'trial_computes_only_with_two_coins'] },
  { n: 2, job: 'price the forfeit', claim: 'the losing side of any case pays exactly them, and only when a winner exists', cites: ['court_loser_pays_the_two_coins'] },
  { n: 3, job: 'measure leverage', claim: 'contribute 2, save up to 64 bits of recompute; the bill can never go negative', cites: ['contribute_two_save_sixtyfour', 'bill_never_negative'] },
  { n: 4, job: 'take the commission', claim: '2 per 110 bits, 108 delivered net; commercially the passenger still saves while the captain earns', cites: ['captain_commission_two_per_110', 'commercial_saves_and_captain_earns'] },
  { n: 5, job: 'set the exchange rate by forgery cost', claim: 'a coin is worth exactly what it costs to forge, and traitor damage is priced by the same billing that pays honest work', cites: ['coin_exchange_rate_is_traitor_cost', 'traitor_damage_sealed_by_same_billing'] },
  { n: 6, job: 'carry superpositions', claim: 'each coin one qubit, the pair two qubits spanning four states on one 128-bit uuid; the doubling of directions is the two coins', cites: ['coin_is_one_qubit', 'captain_coins_deliver_two_qubits_at_128_bits', 'rosette_quantum_doubling_is_two_coins'] },
  { n: 7, job: 'be topology', claim: 'the 2 is the negative Euler characteristic of the double torus, the same 2 the dodecahedron computes', cites: ['two_coins_is_double_torus', 'euler_two_is_the_two_coins'] },
  { n: 8, job: 'hold value at scale', claim: 'real from the seventh dimension up — the value grows with the problem', cites: ['captain_coins_respected_at_scale'] },
  { n: 9, job: 'guard the rosette', claim: 'the 21-pair test is the two-coins guard', cites: ['rosette_pairs_twentyone'] },
  { n: 10, job: 'hide in the world\'s constants', claim: 'dropframe drops 108 an hour, the pentagon\'s angle, leaving the 2; even the billing arithmetic is 1+1', cites: ['dropframe_entangles_the_coins', 'billing_arith'] },
  { n: 11, job: 'count worlds', claim: 'n deposits of the two coins are exactly n collapsed realities — the wallet counts worlds, as an accounting identity', cites: ['wallet_counts_worlds'] },
  { n: 12, job: 'confess their limit', claim: 'the coins compute the save and solve nothing by themselves — the honest boundary', cites: ['coins_compute_but_solve_none'] },
]

/** the catalog, tried on every read — each job's claim through the gate, the fold as the receipt */
export function coinsJobs(): CoinJobsReport {
  const jobs = JOBS.map((j) => {
    const r = reveal(`${j.claim} — per ${j.cites.map((c) => 'theorem ' + c).join(' and ')}`)
    return { ...j, verdict: r.verdict }
  })
  const verified = jobs.filter((j) => j.verdict === 'VERIFIED').length
  return {
    jobs, verified, total: jobs.length,
    receipt: toUuid(jobs.map((j) => j.n + ':' + j.verdict + ':' + j.cites.join(',')).join('\n')),
    honest: verified === jobs.length
      ? 'twelve for twelve — every job the coins do is confirmed by its sealed citations, tried on this very read'
      : `${jobs.length - verified} job(s) failed their trial — a cited theorem has vanished from the ledger; the catalog refuses to pretend`,
  }
}
