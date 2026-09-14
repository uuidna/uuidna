// slimgate — the gate of all gates, as slim as it gets: ONLY theorems, no lexicon. A claim faces ONE recomputable
// question — does every theorem it CITES actually exist, sealed, in the ledger? — and ONE of two answers falls out,
// all else void:
//   · cites a sealed theorem, none fabricated → VERIFIED   (a Lean-sealed proof backs it)
//   · anything else                           → UNVERIFIED (no sealed citation, OR a citation to a proof not in the
//                                                ledger — which verifies nothing; not "false", just not verified)
// uuidna VERIFIES; it never REFUTES — a citation to a nonexistent proof does not make the CLAIM false, it just fails
// to verify it. The `fabricated` list is still returned (the publish/prose gate refuses shipping a note that names a
// proof which does not exist), but the VERDICT is binary. Recomputable from the ledger alone. Integrity, not truth.
import { sealedAddressOf } from './theorems/index.js'
import { merkleFold, toUuid } from './address.js'

// the sealed keys and their addresses, read without the ledger's rows — at the edge from the baked root, on a host from
// the ledger; a map built over every theorem when this module loads kept the edge Worker from starting
const SEALED = { has: (k: string): boolean => sealedAddressOf(k) !== undefined, get: (k: string): string | undefined => sealedAddressOf(k) }

/** the name continues past the match through a placeholder (`involution_<handle>`, `involution_${h}`, `{handle}`):
 *  what was matched is a cut-off prefix, not a key */
const placeholder = (text: string, m: RegExpMatchArray): boolean => /[<${]/.test(text.charAt((m.index ?? 0) + m[0].length))

/** a Lean DECLARATION: `theorem NAME` opening its line (after a closing doc comment, an attribute, or a modifier) and
 *  followed by binders or its type's colon — it defines NAME and cites nothing. Prose that merely starts a line with
 *  "theorem two_coins backs this" is not followed by a binder or colon, so it still counts as a citation. */
const MODIFIERS = ['private', 'protected', 'noncomputable'] as const
const declared = (text: string, m: RegExpMatchArray): boolean => {
  const at = m.index ?? 0
  if (!/^\s*[:({[⦃]/.test(text.slice(at + m[0].length))) return false
  // Walk BACK over what Lean lets stand before `theorem` on its line — modifiers, one attribute, blanks — and stop
  // there. The prefix is a few tokens, so this never reads the rest of the line: an MCP answer is ONE line of JSON,
  // megabytes long, and a regex over the whole line for every match made the gate quadratic and hung the tests.
  let i = at
  const blank = (): void => { while (i > 0 && (text[i - 1] === ' ' || text[i - 1] === '\t')) i-- }
  blank()
  for (let w = MODIFIERS.find((x) => text.endsWith(x, i)); w !== undefined; w = MODIFIERS.find((x) => text.endsWith(x, i))) {
    const start = i - w.length
    if (start > 0 && !/\s/.test(text[start - 1]!)) break
    i = start
    blank()
  }
  if (text[i - 1] === ']') {
    const open = text.lastIndexOf('@[', i - 1)
    if (open < 0 || text.indexOf(']', open) !== i - 1) return false
    i = open
    blank()
  }
  return i === 0 || text[i - 1] === '\n' || text[i - 1] === '\r' || text.endsWith('-/', i)
}

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
  // Two shapes carry the word "theorem" and cite nothing, and both read as fabricated before this: a Lean DECLARATION
  // (`theorem brand_new_x : 1 = 1 := rfl` in a written wing or snippet) defines its name — a new name is not yet sealed
  // by construction — and a PLACEHOLDER (`involution_<handle>`, `involution_${h}`) is a name cut where it continues.
  // 22 court orders from one wave were raised this way (court-hooks → law-audit → this gate).
  // A Lean name may end in primes (two_coins'), and a primed name is its own theorem, never its stem; a prime that a
  // letter follows is English (theorem two_coins's proof), so it stays outside the key.
  for (const m of claim.matchAll(/\/theorem\/([a-z0-9_]+(?:'+(?![A-Za-z0-9_]))?)/gi)) if (!placeholder(claim, m)) keys.add(m[1])
  for (const m of claim.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,}(?:'+(?![A-Za-z0-9_]))?)/gi)) {
    if (/[_0-9]/.test(m[1]) && !placeholder(claim, m) && !declared(claim, m)) keys.add(m[1])
  }
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
