// forge-verdict — WHAT THE NEXT PUSH MUST KNOW ABOUT THE LAST ONE (lead 213).
//
// post-push reports a red forge ONCE, to whoever is watching, and the next push proceeds in silence over the
// same red. That is how a failing security workflow stood for over a day across three sessions and forty-four
// consecutive runs while every local court was green: nothing carried the verdict forward. The cure is not
// another arm in hooks/pre-push — that file says it in its own words, "two doors is no door", and adding
// `npm run guard` beside the court was tried and refused. It is a fact the COURT already reads, the way the
// gate receipt is.
//
// PURE. No filesystem, no network, no clock — it decides over a receipt and an ancestry answer, so it can be
// handed a violation without a forge, a push, or a temp directory.
//
// THE ROSTER IS A DECLARATION AND REFUSES TO BE DERIVED. `dependency-review` is PR-only and legitimately skips
// on every push to main; `security` being cancelled is a hole. Nothing about a RUN distinguishes those — it is a
// property of WHICH WORKFLOW it is, and no derivation reaches it. So the list is declared, and the third column
// is the part that keeps it honest: a workflow the forge reports that appears in NEITHER column is itself a gap,
// so adding a workflow forces a decision instead of defaulting to permissive. Without that the list rots
// silently, and it rots toward passing.

/** WHICH WORKFLOWS MUST JUDGE IS A PROPERTY OF THE EVENT, not of the run and not of a flat list.
 *
 *  A flat set was the first design and uuidna-49 refuted it from the forge in one query: `publish` and `release`
 *  are TAG-triggered, so on a push to main they do not skip and do not cancel — THERE IS NO ROW FOR THEM AT ALL.
 *  A must-judge workflow that the event never triggers can never judge, so the flat set refused every ordinary
 *  landing, forever. Measured over 60 runs: deploy 19 and security 18 and CodeQL 18 on push/main; publish 1 and
 *  release 1, both only on the v0.3.1 tag.
 *
 *  This is the third-column argument one level down. Which workflows must judge is not derivable from the rows,
 *  because the rows of an untriggered workflow do not exist — so it is declared, per event, and the absence of a
 *  declared one is itself the finding. */
export const MUST_JUDGE_BY_REF: Readonly<Record<'branch' | 'tag', readonly string[]>> = {
  branch: ['security', 'deploy'],
  tag: ['publish', 'release', 'deploy'],
}
/** Workflows that legitimately do not judge every push, each with the reason it is exempt. */
export const NEED_NOT_JUDGE: Readonly<Record<string, string>> = {
  'dependency-review': 'PR-only; skips on every push to main by design',
  'CodeQL Advanced': 'runs on every push to main but takes minutes longer than the rest, so it is routinely still queued when the others have settled',
  books: 'scheduled, not triggered by a push',
  next: 'scheduled, not triggered by a push',
}

export const mustJudge = (ref: 'branch' | 'tag'): readonly string[] => MUST_JUDGE_BY_REF[ref]

/** rosterGaps(observed) → workflows the forge reported that NO column claims: a decision nobody made. */
export function rosterGaps(observed: readonly string[]): string[] {
  const known = new Set([...MUST_JUDGE_BY_REF.branch, ...MUST_JUDGE_BY_REF.tag, ...Object.keys(NEED_NOT_JUDGE)])
  return [...new Set(observed)].filter((n) => !known.has(n)).sort()
}

/** absentMustJudge(observed, ref) → declared must-judge workflows with NO ROW AT ALL for this push.
 *
 *  rosterGaps cannot see this and never could: it reports what was OBSERVED in neither column, and an absent
 *  workflow is observed nowhere. A silence is the one thing a survey of what arrived can never report. */
export function absentMustJudge(observed: readonly string[], ref: 'branch' | 'tag'): string[] {
  const seen = new Set(observed)
  return mustJudge(ref).filter((n) => !seen.has(n)).sort()
}

/** What post-push learned about one pushed sha, as it persists it for the next court to read. */
export interface ForgeReceipt {
  sha: string
  ok: boolean
  measured: boolean
  failing: readonly string[]
  /** must-judge workflows that did not judge — cancelled, skipped, or absent */
  notJudged?: readonly string[]
  /** set deliberately, to the exact sha, by someone who has read the failure and is pushing the cure on top */
  acknowledged?: string
}

export interface ForgeGate { refuse: boolean; reason: string }

/** prePushForge(receipt, receiptIsAncestorOfHead) → may this push proceed over what the forge last said?
 *
 *  A MISSING RECEIPT DOES NOT REFUSE, and that is a deliberate asymmetry rather than an oversight. "Unmeasured
 *  is not a pass" governs a verdict ABOUT a push; this asks whether to allow the NEXT one, and no prior verdict
 *  is not evidence of red — refusing on it would block the first push of every clone forever. It is reported
 *  instead, so the silence is named rather than absent. */
export function prePushForge(receipt: ForgeReceipt | null, receiptIsAncestorOfHead: boolean): ForgeGate {
  if (!receipt) return { refuse: false, reason: 'no forge verdict on record for any earlier push — UNMEASURED, and allowed: an absent verdict is not evidence of red' }
  const at = receipt.sha.slice(0, 9)
  if (!receiptIsAncestorOfHead) return { refuse: false, reason: `the last forge verdict is for ${at}, which is not behind HEAD — it says nothing about this push` }
  if (receipt.acknowledged && receipt.acknowledged === receipt.sha) {
    return { refuse: false, reason: `the forge was red on ${at} and it is ACKNOWLEDGED — pushing the cure on top` }
  }
  if (!receipt.measured) {
    return { refuse: true, reason: `the forge never judged ${at}: no run reported. UNMEASURED is not a pass — re-run post-push, or acknowledge it deliberately` }
  }
  const unjudged = receipt.notJudged ?? []
  if (receipt.failing.length) {
    return { refuse: true, reason: `the forge is RED on ${at} — ${receipt.failing.join(', ')}. A push on top adds a second commit to a broken forge; fix or acknowledge` }
  }
  if (unjudged.length) {
    return { refuse: true, reason: `${unjudged.join(', ')} did NOT judge ${at}, and each must. A cancelled security scan is not a clean one` }
  }
  if (!receipt.ok) return { refuse: true, reason: `the forge verdict for ${at} is not ok and names nothing — a verdict that cannot say why is not a pass` }
  return { refuse: false, reason: `the forge was green on ${at}` }
}
