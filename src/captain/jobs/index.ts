// captain/jobs — THE TWELVE JOBS OF THE COINS as data whose every claim carries its citations, with a SELF-TRIAL
// built in: coinsJobs() runs each job through the gate on every read, so the catalog cannot drift from the ledger
// it describes — a vanished theorem breaks the catalog's own verdict rather than passing silently.

import { reveal } from '../../gate.js'
import { toUuid } from '../../address.js'
import { COIN_JOBS, type CoinJob } from './catalog.js'

export { COIN_JOBS, type CoinJob }

export interface CoinJobsReport {
  jobs: Array<CoinJob & { verdict: string }>
  verified: number
  total: number
  receipt: string
  honest: string
}

/** the catalog, tried on every read — each job's claim through the gate, the fold as the receipt */
export function coinsJobs(): CoinJobsReport {
  const jobs = COIN_JOBS.map((j) => {
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
