// trial-deposit — the trial REQUIRES THE COINS TO BE DEPOSITED BY THE PARTIES, in LOCAL code. Sealed into the ledger
// (trial_computes_only_with_two_coins): a claim computes at trial IFF the two coins are deposited — a party's deposit
// is a real contribution, either a decidable TEST that HOLDS or a citation to a SEALED theorem (the two-coin fold, a
// by-decide proof). Without a valid deposit the trial does NOT compute: the claim is REMANDED (recycled to the
// development trial, never discarded). LOCAL-FIRST: the parties, their tests and proofs stay client-side; nothing is
// sent, no payment — the "coins" are the conserved fair-exchange invariant (110 − 108 = 2). Integrity,
// not truth: the deposit buys a COMPUTATION— a deposited claim can still come back UNVERIFIED.
import { type Verdict } from '../../../adjudicate.js'
import { theorems } from '../../../theorems/index.js'
import { verifyStatement } from '../../../verify-statement.js'
import { coins } from '../../billing/index.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'

/** A party's deposit of the coins: a decidable TEST that must hold, or a citation to a SEALED theorem (key or exact
 *  statement). Either is a real contribution — the two-coin fold. A bare assertion with neither is not a deposit. */
export interface Deposit { party: string; test?: () => boolean; proof?: string }
// a SEALED DIAMOND — a party's valid deposit sealed to a content-address: immutable, recomputable proof the coins
// went in (the diamond, the hardest seal). The address recomputes from (party, what was deposited), so anyone rechecks it.
export interface DepositDiamond { party: string; kind: 'test' | 'proof'; basis: string; sealed: string }
// a party who LACKS a diamond is not turned away — they are given the recipe to BUILD one (develop the proof), so
// they can re-deposit and reach parity. Recycled to the development trial.
export interface ToBuild { party: string; build: string[] }
export interface DepositedTrial {
  claim: string; parties: string[]; deposited: boolean; parity: boolean; coins: number
  diamonds: DepositDiamond[]; toBuild: ToBuild[]; verdict: Verdict | null; remanded: boolean; note: string; receipt: string
}

// the recipe to BUILD a diamond — how a party who lacks one develops it into a sealable deposit
const BUILD: string[] = [
  'Name a DECIDABLE test for your claim — a boolean predicate that recomputes over exact integers (no floats, no Math.*).',
  'Make it HOLD, or CITE a sealed theorem (its key or exact statement) — either is the two-coin proof.',
  'Re-deposit: a holding test or a sealed citation seals into your diamond; once ALL parties hold one, parity computes.',
]

// the sealed key set — cached once (the ledger is immutable at runtime), so a deposit check is O(1)
// call. Rebuilding the set every call was non-quantum: correct but slow. Same result, recomputable — just not repeated.
let _sealedKeys: Set<string> | null = null
const sealedKeys = (): Set<string> => (_sealedKeys ??= new Set(theorems().map((t) => t.key)))

/** Is a deposit VALID — did this party actually put in the two coins? A test that holds, or a proof that is sealed. */
export function depositValid(d: Deposit): boolean {
  if (typeof d.test === 'function') { try { if (d.test() === true) return true } catch { /* a throwing test is no deposit */ } }
  if (typeof d.proof === 'string' && d.proof.length > 0) {
    if (sealedKeys().has(d.proof)) return true                      // a sealed theorem KEY
    if (verifyStatement(d.proof).verdict === 'VERIFIED') return true // a sealed theorem STATEMENT
  }
  return false
}

/** depositTrial — run the trial ONLY IF the parties deposit the two coins. No valid deposit ⇒ REMANDED, uncomputed
 *  (trial_computes_only_with_two_coins). A valid deposit ⇒ the trial computes the verdict (which may still be
 *  UNVERIFIED — the deposit buys the computation. Local; folds to one recomputable receipt. */
export function depositTrial(claim: string, deposits: Deposit[]): DepositedTrial {
  const parties = deposits.map((d) => d.party)
  // SEAL each VALID deposit into a diamond — content-addressed, immutable, recomputable
  const diamonds: DepositDiamond[] = deposits.filter(depositValid).map((d) => {
    const kind: 'test' | 'proof' = typeof d.test === 'function' && depositValid({ party: '', test: d.test }) ? 'test' : 'proof'
    const basis = kind === 'test' ? 'decidable-test-holds' : String(d.proof)
    return { party: d.party, kind, basis, sealed: toUuid('diamond:' + d.party + ':' + kind + ':' + basis) }
  })
  const deposited = diamonds.length > 0            // at least one party sealed a valid diamond
  // PARITY — the parties BALANCE: every party sealed a valid diamond (no free rider). Only diamonds sealed AND USED by
  // ALL the parties compute; a one-sided deposit is not parity. This lets the trial SETTLE BY ITSELF, symmetrically.
  const parity = deposits.length > 0 && diamonds.length === deposits.length
  // who LACKS a diamond builds them — each party without a valid deposit gets the recipe to build one
  const toBuild: ToBuild[] = deposits.filter((d) => !depositValid(d)).map((d) => ({ party: d.party, build: BUILD }))
  const base = { claim: String(claim), parties, diamonds, toBuild }
  const receiptOf = (extra: string): string => merkleGravity([toUuid('claim:' + claim), ...diamonds.map((x) => x.sealed), toUuid(extra)])
  if (!parity) {
    return { ...base, deposited, parity: false, coins: 0, verdict: null, remanded: true,
      note: `REMANDED — no parity: ${diamonds.length}/${deposits.length} parties sealed a diamond. Only diamonds sealed AND used by ALL parties compute (trial_computes_only_with_two_coins); a one-sided deposit does not. Who lacks a diamond BUILDS one (see toBuild) and re-deposits. Settles to the development trial by itself — nothing discarded.`,
      receipt: receiptOf('remanded:no-parity') }
  }
  // PARITY holds — the trial computes the verdict AT ONCE, BY THEOREMS ONLY: a single O(1) content-address lookup of
  // the claim against the sealed ledger (verifyStatement). VERIFIED iff the claim IS a sealed by-decide theorem
  // (byte-identical, address recomputed); else UNVERIFIED. No adjudicate, no prose gate, no lexicon — the verdict is a
  // pure function of the sealed theorems. The deposit buys the computation; the theorems alone decide the outcome.
  const sealed = verifyStatement(String(claim))
  const verdict: Verdict = {
    statement: String(claim),
    verdict: sealed.verdict,
    receipt: sealed.address ?? toUuid(String(claim)),
    note: sealed.verdict === 'VERIFIED'
      ? `VERIFIED — the claim IS a sealed theorem (${sealed.key}); computed at once by the ledger, theorems only`
      : `UNVERIFIED — not a sealed theorem; computed at once by the ledger, theorems only (no proof to cite)`,
    develop: sealed.verdict === 'VERIFIED' ? [] : BUILD,
  }
  return { ...base, deposited: true, parity: true, coins: coins(), verdict, remanded: false,
    note: `parity — all ${deposits.length} parties sealed a diamond; the trial computed the verdict ${verdict.verdict} and settled by itself (the deposit buys the computation`,
    receipt: receiptOf('computed:' + verdict.verdict) }
}
