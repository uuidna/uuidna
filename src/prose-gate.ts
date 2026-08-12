// prose-gate — the honest-prose overreach detector, shared by the provenance audit (scripts/provenance.ts) and the
// self-trial, and now TESTABLE instead of buried in a script. A unit trips if it leans on a HOLLOW superlative — a
// property no prose can settle — that is not DEMARCATED (negated: not / never / no / simulation / finite …), OR on a
// proof-boast in any of 20+ languages (checked against the Glagolitic→Cyrillic fold too, so a boast cannot hide in
// another script). Backing (a proof link / sealed key) is applied by the CALLER — this module is the pure lexical floor.
//
// The demarcation test removes EVERY hollow match before it runs, so a SECOND overclaim's stray negation can no
// longer clear a FIRST: "resulting in infinite results, all in no time" once cleared itself (the "no" in "no time"
// read as an honest negation of "infinite"); now both "infinite" and "in no time" are stripped, nothing clears, it
// flags. A near-miss from a real session, hardened at the root. Integrity, not truth.
import { RED, RED_INTL, rosetta } from './gate.js'

// The hollow lexicon — superlatives that assert a property no prose can settle; each must be BACKED or demarcated.
// "in no time" (idiomatic zero-time) joins the "at no …time/cost" family: everything uuidna does costs heartbeats.
export const HOLLOW = /\b(quantum[- ]?secure|quantum[- ]?speed|computes at once|instantaneous(ly)?|in\s+no\s+time|at no [\w ]{0,30}?(time|cost)|no (additional |extra )?(development |dev |token )?(time|cost)|zero[- ](time|cost)|unbreakable|uncrackable|unhackable|unstoppable|untraceable|undetectable|tamper[- ]?proof|hack[- ]?proof|bullet[- ]?proof|fool[- ]?proof|future[- ]?proof|perpetual motion|FTL|faster[- ]than[- ]light|production[- ]grade|professional[- ]grade|military[- ]grade|enterprise[- ]grade|zero[- ]knowledge|100%\s*secure|keyless\s+secure|perfectly\s+secure|absolute\s+security|unlimited|infinitely|infinite)\b/i

// A demarcation/negation clears a HOLLOW token — the repo's honest prose ("never infinity", "no fake FTL",
// "simulation, not hardware", "bounded, never infinite") is the CORRECT use of these words, not a boast.
export const DEMARCATED = /\b(not|never|no|non|isn'?t|aren'?t|cannot|can'?t|without|honest|honestly|simulation|integrity|finite|bounded|refus\w*|forbid\w*|impossible|reject\w*|prohibit\w*|ruled out|demarcat)\b/i

// A quoted phrase is a CITATION, not a claim — tests quote boasts as inputs and prose quotes words to discuss them.
const deQuote = (u: string): string => u.replace(/'[^']*'|"[^"]*"|“[^”]*”|«[^»]*»/g, ' ')

// Proof-boasts in any of 20+ languages (and Glagolitic, folded to Cyrillic first). NOT demarcation-cleared — a boast
// in another tongue is not softened by an English "no".
const redFlag = (u: string): string | null =>
  (RED.test(u) || RED.test(rosetta(u))) ? (u.match(RED) || rosetta(u).match(RED))![0]
  : (RED_INTL.test(u) || RED_INTL.test(rosetta(u))) ? (u.match(RED_INTL) || rosetta(u).match(RED_INTL))![0] : null

/** overreachOf(unit) → the drained overclaim token, or null. A HOLLOW superlative flags UNLESS the unit — with EVERY
 *  hollow match stripped first — still reads as demarcated; a translated proof-boast flags outright. Backing is the
 *  caller's to apply. This is the pure, testable floor the provenance audit and the self-trial both stand on. */
export function overreachOf(unit: string): string | null {
  // NFKC-normalise first, so compatibility/fullwidth homoglyphs ("unbreａkable") fold to their plain form and cannot
  // slip the lexicon. HONEST LIMIT: NFKC folds compatibility characters, NOT cross-script confusables (a Cyrillic "а"
  // is a different codepoint); and no lexical gate catches SYNONYM evasion ("impossible to break") or a stray
  // negation elsewhere in the sentence. The gate is a floor against honest overclaims, not a manipulation-proof wall.
  const cited = deQuote(unit).normalize('NFKC')
  const m = cited.match(HOLLOW)
  if (m) {
    // Strip ALL hollow matches before testing demarcation, so a second overclaim's negation can't clear the first.
    const stripped = cited.replace(new RegExp(HOLLOW.source, 'gi'), ' ')
    if (!DEMARCATED.test(stripped)) return m[0]
  }
  return redFlag(cited)
}
