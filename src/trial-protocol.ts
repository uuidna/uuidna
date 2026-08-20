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

export type Outcome = 'supported' | 'refuted' | 'void' | 'inconclusive'

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
  controlRejected: boolean
  why: string
}

/** Run a pre-registered trial. The CONTROL is evaluated first and independently of the subject: a trial whose
 *  control passes is void whatever the subject does, because the instrument has not been shown to discriminate. */
export function trial<T>(p: Protocol<T>): Result {
  const base = { hypothesis: p.hypothesis, refutedIf: p.refutedIf }
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
    hypothesis: p.hypothesis, refutedIf: p.refutedIf, outcome: 'void', controlRejected: false,
    why: `${leaked.length} of ${p.controls.length} controls PASSED — the instrument does not discriminate`,
  }
  if (!p.controls.length) return {
    hypothesis: p.hypothesis, refutedIf: p.refutedIf, outcome: 'inconclusive', controlRejected: false,
    why: 'no controls were supplied, so nothing establishes that this test can fail',
  }
  return trial({ ...p, control: p.controls[0] })
}
