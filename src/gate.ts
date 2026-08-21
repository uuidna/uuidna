// The gate — FOLDED TO THE THEOREMS. The lexical honesty gate (English + 20-language word-lists, the Glagolitic
// rosetta, the negation-parity machinery) was a FLOOR the trial put in the dock and found leaky: it passed
// "provably honest", "impossible to break", "100% honest" while draining honest prose, and it was itself the most
// hardcoded thing in a project whose rule is "only theorems stay". The trial's verdict on "uuidna is honest" was
// UNVERIFIED — honesty is not a decidable property — so the honesty gate is removed by folding it to 0. What
// remains is the one recomputable question slimGate asks, and nothing else: does every theorem a claim CITES
// actually exist, sealed, in the ledger? A fabricated citation is the one decidably-FALSE case, so it is drained;
// every other claim is REVEALED— held open (UNVERIFIED) or sealed (SEALED). No word-list decides
// truth; the ledger does. This ends the draining-as-censorship the old lexicon performed. Integrity.
import { slimGate } from './slimgate.js'

/** The binary. 1 = stays (revealed), 0 = drained. A claim is drained ONLY when it cites a theorem that is NOT
 *  sealed in the ledger — a fabricated citation, the one decidably-false case. No lexicon, no negation guessing:
 *  the verdict folds from the sealed set alone, recomputable by anyone. `hit` is the fabricated key, or null. */
export const computes = (text: string): { binary: 0 | 1; hit: string | null } => {
  const s = slimGate(text)
  return s.fabricated.length > 0 ? { binary: 0, hit: s.fabricated[0] ?? null } : { binary: 1, hit: null }
}

/** The SURFACING — the leak-closer. `computes()` returns binary:1 for BOTH a proof-backed claim and a hollow uncited
 *  boast, so "holds=1" reads as OK and an overclaim leaks past a reader who checks the drain-bit instead of the stamp.
 *  `reveal()` surfaces the explicit three-way verdict slimGate already computes, so an uncited boast reads UNVERIFIED
 *  (unbacked), never a clean pass — no word-list, only the ledger's authority. "Holds" means "not drained", NEVER
 *  "true"; only VERIFIED (a sealed citation) is backing. */
export interface Reveal {
  verdict: 'VERIFIED' | 'UNVERIFIED' | 'DRAINED'
  binary: 0 | 1          // 0 = drained (a fabricated citation), 1 = stays (VERIFIED or UNVERIFIED)
  cites: string[]        // the SEALED theorems the claim cites (its backing)
  fabricated: string[]   // cited proofs NOT in the ledger — the one decidably-false case
  reveal: string         // what this verdict MEANS, said plainly, so it cannot be mistaken for endorsement
}
export function reveal(text: string): Reveal {
  const s = slimGate(text)
  const verdict: Reveal['verdict'] = s.fabricated.length > 0 ? 'DRAINED' : s.real.length > 0 ? 'VERIFIED' : 'UNVERIFIED'
  const msg = verdict === 'DRAINED'
    ? `DRAINED — cites a proof NOT in the ledger (${s.fabricated.join(', ')}); the one decidably-false case, refused.`
    : verdict === 'VERIFIED'
      ? `VERIFIED — backed by sealed proof(s): ${s.real.join(', ')}.`
      : 'UNVERIFIED — cites no sealed proof. REVEALED as UNBACKED. "Holds" here means "not drained""true"; a hollow boast stays UNVERIFIED— trust only the stamp.'
  return { verdict, binary: verdict === 'DRAINED' ? 0 : 1, cites: s.real, fabricated: s.fabricated, reveal: msg }
}
