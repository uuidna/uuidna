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
const placeholder = (text: string, m: RegExpMatchArray): boolean => /[<${[]/.test(text.charAt((m.index ?? 0) + m[0].length))

/** a sealed key never ends in `_` (the live-ledger test asserts it), so a matched name ending in one was cut where it
 *  continued — `grep -o '/theorem/enumeration_hex4_'` closes its quote on a prefix — and names no theorem */
const cut = (key: string): boolean => key.replace(/'+$/, '').endsWith('_')

/** what may stand before the quote that opens a string whose first token is `theorem`: nothing on the line, or the
 *  `(` `[` `{` `,` `:` `=` of a call, array, object, field (`lean: '…'`) or assignment (`lean = "…"`) */
const OPENS_LITERAL = new Set(['(', '[', '{', ',', ':', '='])
const opensLiteral = (text: string, q: number): boolean => {
  let j = q
  if (text[j - 1] === '\\') j--   // an escaped quote in an encoded string (`\"theorem …`) opens it the same way
  while (j > 0 && (text[j - 1] === ' ' || text[j - 1] === '\t')) j--
  return j === 0 || text[j - 1] === '\n' || text[j - 1] === '\r' || OPENS_LITERAL.has(text[j - 1]!)
}

/** a Lean DECLARATION: `theorem NAME` followed by binders or its type's colon, where `theorem` opens its line (after a
 *  closing doc comment, an attribute, or a modifier) or is the first token of a string literal (a generator's
 *  `lean: 'theorem mul_add_by_induction : …'`, a template `` `theorem foo : …` ``, a fixture
 *  `'theorem refused_key : 1 = 1 := by decide'`) — it defines NAME and cites nothing. Prose such as
 *  "theorem two_coins backs this", or 'the proof is theorem two_coins', has no binder or colon after the name, or
 *  words before `theorem` inside its quote, so it still counts as a citation. */
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
  if (i === 0 || text[i - 1] === '\n' || text[i - 1] === '\r' || text.endsWith('-/', i)) return true
  const q = text[i - 1]
  return (q === "'" || q === '"' || q === '`') && opensLiteral(text, i - 1)
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
  // by construction — and a PLACEHOLDER (`involution_<handle>`, `involution_${h}`) or a trailing `_` is a name cut
  // where it continues.
  // 22 court orders from one wave were raised this way (court-hooks → law-audit → this gate).
  // A Lean name may end in primes (two_coins'), and a primed name is its own theorem, never its stem. A prime that a
  // letter follows is English (theorem two_coins's proof), a quote that closes a single-quoted literal on the same
  // line is the string's (signCommit('Backed by theorem two_coins')), and a route carries no prime at all.
  for (const m of claim.matchAll(/\/theorem\/([a-z0-9_]+)/gi)) if (!placeholder(claim, m) && !cut(m[1]!)) keys.add(m[1]!)
  let quotes: Uint32Array | null = null   // single quotes since the line's start, counted once, only if a prime appears
  const inLiteral = (at: number): boolean => {
    if (quotes === null) {
      quotes = new Uint32Array(claim.length + 1)
      for (let i = 0; i < claim.length; i++) quotes[i + 1] = claim[i] === '\n' ? 0 : quotes[i]! + (claim[i] === "'" ? 1 : 0)
    }
    return quotes[at]! % 2 === 1
  }
  for (const m of claim.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,}(?:'+(?![A-Za-z0-9_]))?)/gi)) {
    const key = m[1]!.endsWith("'") && inLiteral(m.index ?? 0) ? m[1]!.replace(/'+$/, '') : m[1]!
    // THE LEDGER DECIDES WHAT IS A KEY, NOT ITS SPELLING. An underscore or a digit is what a key USUALLY has, and
    // requiring one is a hand rule standing in for the ledger — it kept "theorem proving" out of the citations and it
    // kept three real ones out with it: magnification (Optics.lean), neutralization (Chemistry.lean) and
    // contrapositive (Reasoning.lean) are sealed and were uncitable by anyone, so an honest claim naming them read
    // UNVERIFIED. It surfaced in the 2x7 fold, which picks its witnesses from the ledger by position and so can pick
    // a key the gate cannot read back: one face of 14 failed to sign and the receipt would not seal — about one
    // receipt in 1691, which is why 492 ledger pieces found it. A bare word that the ledger does NOT seal is still
    // ignored exactly as before, so prose is unaffected; what changes is that a word the ledger DOES seal counts.
    if ((/[_0-9]/.test(key) || SEALED.has(key)) && !cut(key) && !placeholder(claim, m) && !declared(claim, m)) keys.add(key)
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
