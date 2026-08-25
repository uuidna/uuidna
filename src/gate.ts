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
import { theoremByKey } from './theorems/index.js'

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
  /** WHAT THE BACKING ACTUALLY SAYS — the closer for the leak one level out from the one `reveal()` was built for.
   *
   *  THE HOLE, found 2026-08-25 by trying to make a claim and watching this gate pass it. slimGate folds the ledger
   *  to `Map<key, address>`: a theorem arrives here as a TOKEN, and its own text is discarded before any verdict is
   *  formed. So the gate can confirm a citation EXISTS and is structurally incapable of noticing that the cited
   *  theorem DENIES the claim citing it. The demonstration: "uuidna achieves quantum advantage, by theorem
   *  n_qubit_dimension" returns VERIFIED, and n_qubit_dimension's own sealed prose ends "...this counts the
   *  simulation cost, it is NOT a speedup or a quantum advantage." The gate read the key and never read the
   *  sentence. A citation that refutes its citer is the one move a citation-existence check cannot catch.
   *
   *  WHY THIS IS NOT A CONTRADICTION-DETECTOR, and must not become one. The obvious repair — scan the cited prose
   *  for denials, scan the claim for the denied term, refuse on overlap — is the lexical honesty gate this file's
   *  header records being TORN OUT: "it passed 'provably honest', 'impossible to break', '100% honest' while
   *  draining honest prose, and it was itself the most hardcoded thing in a project whose rule is 'only theorems
   *  stay'". Entailment is not decidable, and a word-list that pretends otherwise leaks in both directions. The
   *  trial already ruled on this class: "uuidna is honest" → UNVERIFIED, because honesty is not a decidable
   *  property. Rebuilding that lexicon under the name `contradicts()` would repeat a mistake already paid for once.
   *
   *  WHAT IT DOES INSTEAD, which is microdata's discipline applied to citation: the qualifier travels ATTACHED to
   *  the figure rather than narrated beside it. VERIFIED stops meaning "backed" in the abstract and starts meaning
   *  "backed BY THIS, WHICH SAYS THIS". The gate decides nothing new and refutes nothing — it stops letting a
   *  citation be a bare token. A reader, human or model, who is shown the cited sentence cannot ship a claim that
   *  sentence denies without doing it knowingly, and that is the honest limit of what a recomputable gate offers.
   *
   *  NOT TRUNCATED, deliberately. n_qubit_dimension's denial is the LAST clause of its prose; a head-clipped
   *  excerpt would drop precisely the sentence that matters and hand back a scope that reads like endorsement.
   *  Clipping the qualifier out of the qualifier is this tree's most-repeated defect, and it is not repeated here. */
  backing: { key: string; says: string }[]
  fabricated: string[]   // cited proofs NOT in the ledger — the one decidably-false case
  reveal: string         // what this verdict MEANS, said plainly, so it cannot be mistaken for endorsement
}
export function reveal(text: string): Reveal {
  const s = slimGate(text)
  const byKey = theoremByKey()
  // the theorem's OWN prose, whole. `name` is where a sealed theorem writes its scope — including the clauses that
  // say what it does NOT support — so it is the field that has to survive the trip to the verdict.
  const backing = s.real.map((key) => ({ key, says: byKey.get(key)?.name ?? '' }))
  const verdict: Reveal['verdict'] = s.fabricated.length > 0 ? 'DRAINED' : s.real.length > 0 ? 'VERIFIED' : 'UNVERIFIED'
  const msg = verdict === 'DRAINED'
    ? `DRAINED — cites a proof NOT in the ledger (${s.fabricated.join(', ')}); the one decidably-false case, refused.`
    : verdict === 'VERIFIED'
      ? `VERIFIED — backed by sealed proof(s): ${s.real.join(', ')}. VERIFIED means THE CITATION IS SEALED, never ` +
        `that the citation SUPPORTS the claim — entailment is not decidable and this gate does not pretend to ` +
        `decide it. Read what the backing actually says before relying on it:\n` +
        backing.map((b) => `  · ${b.key} — ${b.says}`).join('\n')
      : 'UNVERIFIED — cites no sealed proof. REVEALED as UNBACKED. "Holds" here means "not drained""true"; a hollow boast stays UNVERIFIED— trust only the stamp.'
  return { verdict, binary: verdict === 'DRAINED' ? 0 : 1, cites: s.real, backing, fabricated: s.fabricated, reveal: msg }
}
