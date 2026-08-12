// The gate — FOLDED TO THE THEOREMS. The lexical honesty gate (English + 20-language word-lists, the Glagolitic
// rosetta, the negation-parity machinery) was a FLOOR the trial put in the dock and found leaky: it passed
// "provably honest", "impossible to break", "100% honest" while draining honest prose, and it was itself the most
// hardcoded thing in a project whose rule is "only theorems stay". The trial's verdict on "uuidna is honest" was
// UNVERIFIED — honesty is not a decidable property — so the honesty gate is removed by folding it to 0. What
// remains is the one recomputable question slimGate asks, and nothing else: does every theorem a claim CITES
// actually exist, sealed, in the ledger? A fabricated citation is the one decidably-FALSE case, so it is drained;
// every other claim is REVEALED, not drained — held open (UNVERIFIED) or sealed (SEALED). No word-list decides
// truth; the ledger does. This ends the draining-as-censorship the old lexicon performed. Integrity, not truth.
import { slimGate } from './slimgate.js'

/** The binary. 1 = stays (revealed), 0 = drained. A claim is drained ONLY when it cites a theorem that is NOT
 *  sealed in the ledger — a fabricated citation, the one decidably-false case. No lexicon, no negation guessing:
 *  the verdict folds from the sealed set alone, recomputable by anyone. `hit` is the fabricated key, or null. */
export const computes = (text: string): { binary: 0 | 1; hit: string | null } => {
  const s = slimGate(text)
  return s.fabricated.length > 0 ? { binary: 0, hit: s.fabricated[0] ?? null } : { binary: 1, hit: null }
}
