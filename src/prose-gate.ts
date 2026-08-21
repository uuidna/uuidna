// prose-gate — FOLDED TO THE THEOREMS. See gate.ts for the trial that removed the lexical honesty gate. The HOLLOW
// superlative lexicon and the DEMARCATED negation-clearing list are gone, folded to 0: they were a leaky floor and a
// hardcoded contradiction of "only theorems stay". overreachOf now asks only slimGate's one recomputable question —
// does the unit cite a FABRICATED theorem? If so it is drained (the one decidably-false case); every other unit is
// REVEALED, not refused. No word-list survives; the ledger is the only authority. Integrity.
import { slimGate } from './slimgate.js'

/** overreachOf(unit) → the fabricated theorem key the unit cites, or null. No lexicon: a claim is drained only for
 *  citing a theorem that is not sealed in the ledger; every other claim is revealed (VERIFIED or UNVERIFIED), never
 *  word-drained. The pure, recomputable floor the provenance audit and the self-trial now both stand on. */
export function overreachOf(unit: string): string | null {
  const s = slimGate(unit)
  return s.fabricated.length > 0 ? (s.fabricated[0] ?? null) : null
}
