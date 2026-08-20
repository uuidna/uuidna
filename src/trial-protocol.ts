// trial-protocol — A TRIAL THAT CANNOT RETURN A NEGATIVE IS NOT A TRIAL.
//
// runTrial() sweeps the ledger and confirms every theorem still proves. That is a regression check and worth
// having, but it cannot discriminate: every entry passes by construction, because passing is how it got sealed.
// A sweep over survivors measures survival.
//
// What a scientific trial adds is three things, and this session supplied the evidence for each:
//
//   PRE-REGISTRATION  the criterion is fixed BEFORE the test runs, so it cannot be adjusted to fit the result.
//                     A theorem was sealed here stating that reflection conserves a stroke budget; the budget was
//                     read off the one pair it was written from, and across the full family it holds in 18 of 54.
//                     The claim was shaped to the data because nothing had said in advance what would refute it.
//
//   CONTROL           a case that MUST fail. If it passes, the trial is VOID — not failed, void, because it has
//                     shown it cannot tell the two apart. Four integrity checks in this repo accept a forged entry
//                     asserting 2 + 2 = 5, and each reported green for as long as nobody fed it one.
//
//   OUTCOME EITHER WAY  a refutation is a result. Eleven leads were refuted in one session and every one is
//                     recorded in lean/leads.json, because the cheapest thing in a ledger is the derivation nobody
//                     has to make twice.
//
// Nothing here decides truth. It decides whether an experiment was capable of being wrong.

import { toUuid } from './address.js'

/** the address of a protocol — hypothesis and criterion, which are what make two trials the same trial */
export const protocolAddress = (hypothesis: string, refutedIf: string): string => toUuid(`trial:${hypothesis}|${refutedIf}`)

export type Outcome = 'supported' | 'refuted' | 'void' | 'inconclusive'

/** What the verdict is ABOUT. This is the whole content of folding a void: a trial whose control passes tells you
 *  nothing about the subject, and it tells you something definite about the INSTRUMENT — that it cannot
 *  discriminate. Re-aimed at the instrument, the same run is not void at all, it is a refutation. So `void` is
 *  never a dead end; it is a verdict that has not yet been pointed at the thing it actually settles. */
export type About = 'subject' | 'instrument'

export interface Protocol<T> {
  hypothesis: string
  /** stated in advance: what result would REFUTE this. A protocol without one cannot be run. */
  refutedIf: string
  /** the test itself */
  test: (subject: T) => boolean
  /** a subject the test MUST reject. If it does not, the trial is void. */
  control: T
  /** the real subject */
  subject: T
}

export interface Result {
  hypothesis: string
  refutedIf: string
  outcome: Outcome
  about: About
  controlRejected: boolean
  /** the fold of the protocol itself, so a void is CITABLE — an instrument shown non-discriminating can be named,
   *  tracked, and re-tested against a stricter control rather than quietly re-run and re-believed. */
  receipt: string
  why: string
}

/** fold a void into the finding it already is: the instrument is the subject, and the verdict is refuted. */
export function foldVoid(r: Result): Result {
  if (r.outcome !== 'void') return r
  return {
    ...r,
    outcome: 'refuted',
    about: 'instrument',
    hypothesis: `the instrument for "${r.hypothesis}" can discriminate`,
    refutedIf: 'a control that should fail is accepted',
    why: `${r.why} Re-aimed at the instrument this is not void but REFUTED: the test accepts a case it was built to reject.`,
  }
}

/** Run a pre-registered trial. The CONTROL is evaluated first and independently of the subject: a trial whose
 *  control passes is void whatever the subject does, because the instrument has not been shown to discriminate. */
export function trial<T>(p: Protocol<T>): Result {
  const base = { hypothesis: p.hypothesis, refutedIf: p.refutedIf, about: 'subject' as About, receipt: protocolAddress(p.hypothesis, p.refutedIf) }
  if (!p.refutedIf.trim()) return {
    ...base, outcome: 'void', controlRejected: false,
    why: 'no refutation criterion was registered — an experiment that cannot say what would disprove it is not an experiment',
  }
  const controlRejected = !p.test(p.control)
  if (!controlRejected) return {
    ...base, outcome: 'void', controlRejected: false,
    why: 'the CONTROL passed. The instrument cannot tell the subject from a case that should fail, so the subject\'s result carries no information.',
  }
  const held = p.test(p.subject)
  return {
    ...base, outcome: held ? 'supported' : 'refuted', controlRejected: true,
    why: held
      ? 'the control was rejected and the subject held — supported, which is not proven; it survived one test it could have failed'
      : `the control was rejected and the subject FAILED — refuted, which is a result: ${p.refutedIf}`,
  }
}

/** A trial is only as good as its controls. Running several controls raises the cost of a false instrument. */
export function trialWithControls<T>(p: Omit<Protocol<T>, 'control'> & { controls: readonly T[] }): Result {
  const leaked = p.controls.filter((c) => p.test(c))
  if (leaked.length) return {
    hypothesis: p.hypothesis, refutedIf: p.refutedIf, about: 'subject', receipt: protocolAddress(p.hypothesis, p.refutedIf), outcome: 'void', controlRejected: false,
    why: `${leaked.length} of ${p.controls.length} controls PASSED — the instrument does not discriminate`,
  }
  if (!p.controls.length) return {
    hypothesis: p.hypothesis, refutedIf: p.refutedIf, about: 'subject', receipt: protocolAddress(p.hypothesis, p.refutedIf), outcome: 'inconclusive', controlRejected: false,
    why: 'no controls were supplied, so nothing establishes that this test can fail',
  }
  return trial({ ...p, control: p.controls[0] })
}

/** FOLD A REFUTATION AND IT IS NOT A REFUTATION EITHER.
 *
 *  A refuted hypothesis is a SUPPORTED negation, from the same run, at the same strength. Nothing is re-tested;
 *  the verdict is re-read. This session is the evidence: every one of eleven refutations yielded a positive claim.
 *  strokes_survive_reflection refuted GAVE budget_not_conserved — the bound that survives. "42 tiles 432" refuted
 *  gave 7 does not divide 72. "The network is down" refuted gave seven of eight hosts answering. The negation was
 *  never a consolation for the loss; it was the finding, waiting to be pointed at.
 *
 *  The strength carries only because the control was rejected — a trial that could not discriminate supports no
 *  negation either, which is why foldVoid must run first and why this refuses an unsound run. */
export function foldRefuted(r: Result): Result {
  if (r.outcome !== 'refuted') return r
  if (!r.controlRejected) return r   // an unsound trial supports nothing, in either direction
  return {
    ...r,
    outcome: 'supported',
    hypothesis: `NOT (${r.hypothesis})`,
    refutedIf: `the original holds after all: ${r.hypothesis}`,
    why: `${r.why} Re-aimed at the negation this is SUPPORTED: refuting a claim establishes its negation, at exactly the strength the control earned.`,
  }
}

/** The whole chain. void -> refuted (about the instrument) -> supported (of the negation). Applied until it
 *  settles, so no verdict is a dead end and none is re-run to get there. `supported` is terminal: folding it again
 *  would only restate that the negation is refuted, which is the same information read backwards. */
export function fold(r: Result, limit = 4): Result {
  let out = r
  for (let i = 0; i < limit; i++) {
    const next = foldRefuted(foldVoid(out))
    if (next.outcome === out.outcome && next.hypothesis === out.hypothesis) return out
    out = next
  }
  return out
}
