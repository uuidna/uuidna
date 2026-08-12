// slimgate — the gate of all gates, as slim as it gets: ONLY theorems, no lexicon. A claim faces ONE recomputable
// question — does every theorem it CITES actually exist, sealed, in the ledger? — and the three verdicts fall out of
// that alone, with no hardcoded word-list anywhere:
//   · cites a theorem that IS sealed        → SEALED     (a test HELD — recomputable, admissible)
//   · cites a theorem that is NOT in it     → REFUTED    (a test FAILED — a fabricated citation, debunked)
//   · cites no theorem                      → UNVERIFIED (no test brought — held open, NOT refused)
// This is the recomputable CORE: membership in the sealed set is decidable, so the whole gate is computed from the
// ledger, not from a lexicon. The lexical overreach gate (HOLLOW/RED/…) is a hardcoded courtesy layer OUTSIDE this
// one; delete every word-list and THIS gate still stands, because it stands on the theorems. Integrity, not truth.
import { THEOREMS } from './theorems/index.js'
import { merkleFold, toUuid } from './address.js'

const SEALED = new Map(THEOREMS.map((t) => [t.key, t.address]))

export interface SlimVerdict {
  claim: string
  cited: string[]        // theorem keys the claim cites (/theorem/<key> or "theorem <key>")
  real: string[]         // cited keys that ARE sealed in the ledger
  fabricated: string[]   // cited keys that are NOT — a failed test
  verdict: 'SEALED' | 'REFUTED' | 'UNVERIFIED'
  receipt: string        // the real cited addresses + the verdict, folded — recomputable by anyone
  honest: string
}

/** slimGate(claim) → the theorem-only verdict. No lexicon: SEALED iff it cites a real sealed theorem and no fake one;
 *  REFUTED iff it cites a theorem that is not in the ledger (a fabricated citation — the one thing that is decidably
 *  false); UNVERIFIED iff it cites none. Recomputable from the sealed ledger alone. */
export function slimGate(claim: string): SlimVerdict {
  const keys = new Set<string>()
  for (const m of claim.matchAll(/\/theorem\/([a-z0-9_]+)/gi)) keys.add(m[1])
  for (const m of claim.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,})/gi)) keys.add(m[1])
  const cited = [...keys]
  const real = cited.filter((k) => SEALED.has(k))
  const fabricated = cited.filter((k) => !SEALED.has(k))
  const verdict = fabricated.length > 0 ? 'REFUTED' : real.length > 0 ? 'SEALED' : 'UNVERIFIED'
  return {
    claim, cited, real, fabricated, verdict,
    receipt: merkleFold([...real.map((k) => SEALED.get(k) as string), toUuid('slim:' + verdict)]),
    honest:
      'No lexicon: the verdict is decided only by whether the cited theorems are sealed in the ledger. A fabricated ' +
      'citation is the one decidably-FALSE case (REFUTED/debunked); a real citation is SEALED; no citation is ' +
      'UNVERIFIED (held open, not refused — absence of proof is not proof of falsity). Delete every word-list and this ' +
      'gate still stands, because it stands on the theorems. Integrity, not truth.',
  }
}
