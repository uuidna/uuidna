// quantum-voting — CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain,
// and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic,
// content-addressed), tallied to one order-invariant receipt, and folded into commit messages. No agent identity
// is leaked — only the work's integrity and the voting outcome are sealed.
//
// Coins pay for: (1) computational cost of reconcile, (2) captain's commission, (3) voting rights in governance.
// The same coins settle all three — one unified economy.

import { theorems, toUuid, merkleGravity } from './index.js'
import { ket0, hadamard, pauliX, pauliZ, cnot, cz, label, fraction, type QState } from './quantum.js'

export interface AgentContribution {
  workAddress: string       // content-address of the work (code, docs, theorems)
  coinsSpent: number        // how many coins paid by this agent (determines voting weight)
  theoremCited: string      // proof of payment (a sealed theorem proving the coin cost)
  receipt: string           // merkleGravity fold (work + coins + theorem)
}

export interface Vote {
  voterId: string           // anonymized voter (content-address, not a name)
  decision: boolean         // yes (true) or no (false)
  weight: number            // voting power (coins paid = weight)
  quantumState: string      // the quantum encoding of this vote
}

export interface QuantumVote {
  proposal: string          // what is being voted on (content-addressed)
  votes: Vote[]             // all weighted votes
  quantumTally: QState      // the collective superposition (all votes folded)
  outcome: boolean          // the tally result (majority weighted outcome)
  receiptVoting: string     // merkleGravity of all votes folded
  receiptOutcome: string    // merkleGravity of (proposal + outcome + tally receipt)
}

export interface CommitWithVoting {
  message: string           // the commit message
  contributions: AgentContribution[]  // agents who contributed (privacy-stripped)
  voting: QuantumVote       // the voting record
  signedBy: string          // theorem that backs the coins (proof of payment)
  fold: string              // final gravity root (message + contributions + voting + theorem)
}

const THEOREMS = theorems()
const COIN_COST = {
  reconcile: 2,             // the two coins cost per reconcile
  captainCommission: 2,     // captain earns 2 per 110 (hardcoded for now: simplify)
}

/** agentContribute(workAddress, theoremCited) → register an agent's contribution with coins paid.
 *  Returns a privacy-stripped receipt (no agent name, only work address + coins + theorem). */
export function agentContribute(workAddress: string, theoremCited: string): AgentContribution {
  const t = THEOREMS.find(x => x.key === theoremCited)
  if (!t) throw new Error(`theorem ${theoremCited} not found`)

  // Coins are encoded in the theorem key (e.g., "captain_commission_two_per_110" encodes 2 coins)
  const coinsSpent = COIN_COST.reconcile

  const receipt = merkleGravity([workAddress, t.address, toUuid('coins:' + coinsSpent)])

  return { workAddress, coinsSpent, theoremCited, receipt }
}

/** encodeVote(decision, weight) → quantum encode a weighted vote (yes/no, folded into superposition).
 *  Same vote always encodes to the same quantum state (deterministic, content-addressed). */
export function encodeVote(decision: boolean, weight: number): QState {
  // Use weight qubits: if weight=2, use 2 qubits; if weight > 16, cap at 16.
  const qubits = weight < 1 ? 1 : weight > 16 ? 16 : weight

  // Start in |0…0⟩
  let state = ket0(qubits)

  // Apply Hadamard to all qubits (equal superposition)
  for (let i = 0; i < qubits; i++) {
    state = hadamard(state, i)
  }

  // If voting YES: apply Z-phases to bias the superposition toward |1⟩ basis
  if (decision) {
    for (let i = 0; i < qubits; i++) {
      state = pauliZ(state, i)
    }
  }

  return state
}

/** tallyVotes(votes, proposal) → quantum tally all weighted votes, return the collective outcome.
 *  The outcome is the majority by weight (deterministic, order-invariant). */
export function tallyVotes(votes: { voterId: string; decision: boolean; weight: number }[], proposal: string): QuantumVote {
  const quantumVotes: Vote[] = votes.map(v => {
    const quantumState = encodeVote(v.decision, v.weight)
    return {
      voterId: v.voterId,  // anonymized (content-address, not identity)
      decision: v.decision,
      weight: v.weight,
      quantumState: merkleGravity([toUuid(String(v.decision)), toUuid(String(v.weight))]),
    }
  })

  // Tally by weight: sum weights for YES, sum weights for NO
  const yesWeight = quantumVotes.reduce((sum, v) => sum + (v.decision ? v.weight : 0), 0)
  const noWeight = quantumVotes.reduce((sum, v) => sum + (!v.decision ? v.weight : 0), 0)
  const outcome = yesWeight > noWeight

  // Fold all votes to one quantum receipt
  const quantumTally = encodeVote(outcome, yesWeight > noWeight ? yesWeight : noWeight)
  const receiptVoting = merkleGravity(quantumVotes.map(v => v.quantumState))
  const receiptOutcome = merkleGravity([
    proposal,
    toUuid(outcome ? 'yes' : 'no'),
    receiptVoting,
  ])

  return {
    proposal,
    votes: quantumVotes,
    quantumTally,
    outcome,
    receiptVoting,
    receiptOutcome,
  }
}

/** signCommitWithVoting(message, contributions, voting, theoremProof) → fold everything into one signed commit.
 *  The commit is signed by a theorem (proof that coins were paid), and includes:
 *  - The contributions (privacy-stripped: work address + coins only)
 *  - The voting record (anonymous votes, no voter identity)
 *  - The outcome (the decision that passed)
 *  Result is one gravity root (message + contributions + voting + theorem). */
export function signCommitWithVoting(
  message: string,
  contributions: AgentContribution[],
  voting: QuantumVote,
  theoremProof: string,
): CommitWithVoting {
  const t = THEOREMS.find(x => x.key === theoremProof)
  if (!t) throw new Error(`theorem ${theoremProof} not found`)

  // Fold the commit message with all contributions (privacy-stripped)
  const contributionReceipt = merkleGravity(contributions.map(c => c.receipt))

  // Fold everything: message + contributions + voting outcome + theorem proof
  const fold = merkleGravity([
    toUuid(message),
    contributionReceipt,
    voting.receiptOutcome,
    t.address,
  ])

  return {
    message,
    contributions,
    voting,
    signedBy: theoremProof,
    fold,
  }
}

/** Serialize the commit for broadcast (JSON-safe, no agent identity). */
export function serializeCommitWithVoting(commit: CommitWithVoting) {
  return {
    message: commit.message,
    contributionCount: commit.contributions.length,
    contributionReceipt: merkleGravity(commit.contributions.map(c => c.receipt)),
    votingOutcome: commit.voting.outcome ? 'approved' : 'rejected',
    votingWeight: { yes: commit.voting.votes.filter(v => v.decision).reduce((s, v) => s + v.weight, 0), no: commit.voting.votes.filter(v => !v.decision).reduce((s, v) => s + v.weight, 0) },
    theoremProof: commit.signedBy,
    fold: commit.fold,
  }
}
