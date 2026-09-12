// trial-run — the living ledger walk: gate first, then sequence on every address, merkaba fold last.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { imprintTextChain } from './imprint.js'
import { THEOREMS, trialSequenceOf, trialSequenceSummary, type TheoremVerdict, type TrialResult } from './theorems/index.js'
import {
  assertTrialGate,
  buildTrialMerkaba,
  trialAgentSwarm,
  type TrialSealedContent,
} from './trial-gate.js'

/** runTrial() → gate, walk, fold — unverified rows cannot enter. */
let _trial: TrialResult | null = null
/** THE TRIAL IS WALKED ONCE PER PROCESS (2026-09-12). It gates, walks and folds the whole ledger — measured at
 *  492 ms a call with no memo — takes no argument, and reads only the immutable ledger, so every call in one
 *  process returns the same verdicts and the same receipt. Thirty-odd surfaces call it, the legal fact base among
 *  them, and a deposit record paid it three times over. Recomputed fresh in the next process, as before. */
export function runTrial(): TrialResult {
  if (_trial) return _trial
  assertTrialGate()
  const gateReceipt = merkleGravity(THEOREMS.map((t) => toUuid(`trial-gate|${t.key}|verified`)))
  const verdicts: TheoremVerdict[] = THEOREMS.map((t) => ({
    key: t.key,
    name: t.name,
    statement: t.statement,
    file: t.file,
    principle: t.principle,
    lean: t.lean,
    verdict: 'VERIFIED',
    address: t.address,
    sequence: trialSequenceOf(t.address),
  }))
  const receipt = merkleGravity(verdicts.map((v) => v.address))
  const sequence = trialSequenceSummary(verdicts)
  const merkaba = buildTrialMerkaba({
    ledgerReceipt: receipt,
    sequenceReceipt: sequence.receipt,
    count: verdicts.length,
    polarities: sequence.polarities,
    gateReceipt,
  })
  return (_trial = {
    count: verdicts.length,
    verified: verdicts.length,
    unverified: 0,
    leanBacked: verdicts.length,
    receipt,
    verdicts,
    sequence,
    merkaba,
  })
}

/** trialSealContent — verified trial outputs + swarm refusals, each on imprint carrier, one fused receipt. */
export function trialSealContent(swarmSize = 0): TrialSealedContent {
  const trial = runTrial()
  const { seal: swarm } = swarmSize > 0 ? trialAgentSwarm(swarmSize) : {
    seal: {
      agents: 0,
      verified: 0,
      denialsRefused: 0,
      denialsFixed: 0,
      involutions: {} as Record<string, number>,
      kinds: {} as Record<import('./trial-gate.js').TrialRefusalKind, number>,
      refusals: [] as { kind: import('./trial-gate.js').TrialRefusalKind; receipt: string }[],
      admissions: [] as { key: string; receipt: string }[],
      receipt: toUuid('trial-swarm|empty'),
    },
  }
  const verified = trial.verdicts.map((v) => ({
    key: v.key,
    address: v.address,
    carrier: imprintTextChain(v.statement),
  }))
  const refused = swarm.refusals.map((r) => ({
    kind: r.kind,
    carrier: imprintTextChain(r.receipt),
  }))
  const body = JSON.stringify({
    trial: trial.receipt,
    sequence: trial.sequence.receipt,
    merkaba: trial.merkaba.receipt,
    swarm: swarm.receipt,
    admitted: swarm.verified,
    refused: swarm.denialsRefused,
    fixed: swarm.denialsFixed,
    involutions: swarm.involutions,
    kinds: swarm.kinds,
    count: trial.count,
  })
  const imprint = imprintTextChain(body)
  const address = toUuid(body)
  const refusalCarriers = refused.flatMap((r) => r.carrier)
  const receipt = merkleGravity([
    trial.receipt,
    trial.merkaba.receipt,
    swarm.receipt,
    address,
    ...imprint,
    ...refusalCarriers,
  ])
  return { trial, verified, refused, swarm, imprint, address, receipt }
}
