// slimgate — the gate of all gates, as slim as it gets: ONLY theorems, no lexicon. A claim faces ONE recomputable
// question — does every theorem it CITES actually exist, sealed, in the ledger? — and ONE of two answers falls out,
// all else void:
//   · cites a sealed theorem, none fabricated → VERIFIED   (a Lean-sealed proof backs it)
//   · anything else                           → UNVERIFIED (no sealed citation, OR a citation to a proof not in the
//                                                ledger — which verifies nothing; not "false", just not verified)
// uuidna VERIFIES; it never REFUTES — a citation to a nonexistent proof does not make the CLAIM false, it just fails
// to verify it. The `fabricated` list is still returned (the publish/prose gate refuses shipping a note that names a
// proof which does not exist), but the VERDICT is binary. Recomputable from the ledger alone. Integrity, not truth.
import { THEOREMS } from './theorems/index.js'
import { merkleFold, toUuid } from './address.js'

const SEALED = new Map(THEOREMS.map((t) => [t.key, t.address]))

export interface SlimVerdict {
  claim: string
  cited: string[]        // theorem keys the claim cites (/theorem/<key> or "theorem <key>")
  real: string[]         // cited keys that ARE sealed in the ledger
  fabricated: string[]   // cited keys that are NOT sealed — verify nothing (the publish gate refuses shipping these)
  verdict: 'VERIFIED' | 'UNVERIFIED'
  receipt: string        // the real cited addresses + the verdict, folded — recomputable by anyone
  honest: string
}

/** slimGate(claim) → the theorem-only verdict, binary. No lexicon: VERIFIED iff it cites a real sealed theorem and
 *  none fabricated; UNVERIFIED otherwise (cites none, or cites a proof not in the ledger — which verifies nothing;
 *  never "false"). The `fabricated` list is still exposed for the publish gate. Recomputable from the ledger alone. */
export function slimGate(claim: string): SlimVerdict {
  const keys = new Set<string>()
  // The link form /theorem/<key> is an unambiguous CITATION — always counted. The bare "theorem <token>" form is
  // ambiguous with ordinary prose ("the theorem ledger", "a theorem computes"), so it counts ONLY when the token is
  // KEY-SHAPED — carries an underscore or a digit, the real key convention (diamond_involution, z7fermat) — which no
  // plain English word does. This is what keeps the theorem-fold from misreading prose about theorems as a citation.
  for (const m of claim.matchAll(/\/theorem\/([a-z0-9_]+)/gi)) keys.add(m[1])
  for (const m of claim.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,})/gi)) if (/[_0-9]/.test(m[1])) keys.add(m[1])
  const cited = [...keys]
  const real = cited.filter((k) => SEALED.has(k))
  const fabricated = cited.filter((k) => !SEALED.has(k))
  const verdict: 'VERIFIED' | 'UNVERIFIED' = (real.length > 0 && fabricated.length === 0) ? 'VERIFIED' : 'UNVERIFIED'
  return {
    claim, cited, real, fabricated, verdict,
    receipt: merkleFold([...real.map((k) => SEALED.get(k) as string), toUuid('slim:' + verdict)]),
    honest:
      'No lexicon: the verdict is decided only by whether the cited theorems are sealed in the ledger. Cites a sealed ' +
      'theorem and none fabricated → VERIFIED; anything else → UNVERIFIED (no citation, or a citation to a proof not ' +
      'in the ledger — which verifies nothing; not "false", just not verified — absence of proof is not proof of ' +
      'falsity). uuidna verifies, it never refutes. Delete every word-list and this gate still stands. Integrity, not truth.',
  }
}
