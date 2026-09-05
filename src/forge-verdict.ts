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

/** THE ROSTER IS OVER CHECK RUNS, NOT WORKFLOWS, and that is forced by two measurements rather than chosen.
 *
 *  1. A CHECK RUN IS A JOB. On origin/main, `secret-scan`, `recomputable-audit` and `dependency-review` are three
 *     checks sharing ONE workflow run (33987294185, security); both `Analyze` checks share the CodeQL run. So the
 *     two surfaces are not peers to union — the check surface is strictly FINER and strictly LARGER: every Actions
 *     job, plus any foreign app. Judging on checks loses nothing; judging on both counts one failure twice.
 *  2. A FOREIGN CHECK CANNOT BE EVENT-ATTRIBUTED — because the join needs a run id and it has none. Every
 *     github-actions check carries its run id in details_url
 *     (`actions/runs/33987294185/job/…`), so its event is recoverable by a join. `Workers Builds: uuidna` points
 *     at dash.cloudflare.com and carries no run id, so no event filter can reach it and no default is safe.
 *     The roster is therefore the ONLY place its verdict can be decided — these columns are forced, not a
 *     convenience. (Both measured by uuidna-49 and confirmed here against the live commit.)
 *
 *  WHICH ONES MUST JUDGE IS A PROPERTY OF THE EVENT. A flat set was the first design and the forge refuted it:
 *  publish and release are TAG-triggered, so on a push to main they produce no row at all, and a must-judge
 *  check the event never triggers can never judge — the flat set refused every ordinary landing forever. */
export const MUST_JUDGE_BY_REF: Readonly<Record<'branch' | 'tag', readonly string[]>> = {
  // measured on origin/main: these three are the security and deploy jobs that judge every push
  branch: ['secret-scan', 'recomputable-audit', 'deploy'],
  // NOT MEASURED. The v0.3.1 tag was cut and deleted before its check names could be read, so this column is
  // left empty ON PURPOSE rather than guessed from the workflow names. An empty column refuses nothing and
  // rosterGaps reports whatever a tag push actually produces, which is how the names get declared honestly.
  tag: [],
}

/** WHY a check is exempt, because one word was answering two questions and the absent case lost.
 *
 *  uuidna-49 measured it against this roster: `Analyze (actions)` FAILING came back ok=true, listed merely as
 *  exempt. "Exempt" was spelling both "may not have judged YET" and "its verdict is MEANINGLESS", and read as
 *  one word the first collapses into the second — so a real CodeQL security finding sailed through.
 *
 *  LATE        its ABSENCE must not block, and its FAILURE is a real finding that must.
 *  MEANINGLESS its verdict says nothing whatever, so even a failure is ignored — otherwise a check that can
 *              never succeed refuses every landing forever.
 *
 *  DECLARED, not derived. 49 closed it on their side by inferring MEANINGLESS from "foreign app, no run to
 *  join", which is true of today's single case and couples two independent facts: a first-party check can be
 *  meaningless, and a foreign one can carry a verdict worth believing. The kind is the decision; the app is not
 *  evidence for it. */
export type ExemptionKind = 'late' | 'meaningless'
export interface Exemption { readonly kind: ExemptionKind; readonly why: string }

export const NEED_NOT_JUDGE: Readonly<Record<string, Exemption>> = {
  'dependency-review': { kind: 'late', why: 'PR-only; skips on every push to main by design' },
  'Analyze (actions)': { kind: 'late', why: 'CodeQL; takes minutes longer than the rest and is routinely still queued when they settle' },
  'Analyze (javascript-typescript)': { kind: 'late', why: 'CodeQL; same run as Analyze (actions), same lateness' },
  'Workers Builds: uuidna': { kind: 'meaningless', why: 'git-connected Cloudflare container build; it CANNOT render this site — 5260 pages against an 8 GiB container that must also hold node and the bundler — so it can never succeed, and disconnecting it is a dashboard act no repository change can perform' },
}

/** ignoreFailure(name) → may a FAILING check be disregarded? Only a MEANINGLESS one. A late check that
 *  actually failed has judged, and what it judged is exactly what this arm exists to carry. */
export const ignoreFailure = (name: string): boolean => NEED_NOT_JUDGE[name]?.kind === 'meaningless'

export const mustJudge = (ref: 'branch' | 'tag'): readonly string[] => MUST_JUDGE_BY_REF[ref]

/** rosterGaps(observed) → checks the forge reported that NO column claims: a decision nobody made. */
export function rosterGaps(observed: readonly string[]): string[] {
  const known = new Set([...MUST_JUDGE_BY_REF.branch, ...MUST_JUDGE_BY_REF.tag, ...Object.keys(NEED_NOT_JUDGE)])
  return [...new Set(observed)].filter((n) => !known.has(n)).sort()
}

/** absentMustJudge(observed, ref) → declared must-judge checks with NO ROW AT ALL for this push.
 *
 *  rosterGaps cannot see this and never could: it reports what was OBSERVED in neither column, and an absent
 *  check is observed nowhere. A survey of what arrived can never report a silence. */
export function absentMustJudge(observed: readonly string[], ref: 'branch' | 'tag'): string[] {
  const seen = new Set(observed)
  return mustJudge(ref).filter((n) => !seen.has(n)).sort()
}

/** staleExemptions(observed) → need-not entries that STOPPED ARRIVING, so their stated reason is now paperwork.
 *
 *  uuidna-49's refinement, and it is absentMustJudge one column over. If the captain performs the dashboard act,
 *  `Workers Builds: uuidna` disappears and its reason — "can never succeed" — becomes an assertion about a check
 *  that no longer exists. A repaired gap keeps no paperwork, which is the rule the finder-controls baseline
 *  already applies to itself. Reported, never refused: a check can be absent for one push and back the next. */
export function staleExemptions(observed: readonly string[]): string[] {
  const seen = new Set(observed)
  return Object.keys(NEED_NOT_JUDGE).filter((n) => !seen.has(n)).sort()
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
