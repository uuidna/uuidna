import { NEED_NOT_JUDGE } from './forge-verdict.js'
// post-push — THE GATE'S BLIND SIDE: a workflow that fails AFTER the push.
//
// The pre-push court runs the whole local gate and is structurally unable to see what the forge does with the
// commit once it has it. Measured 2026-09-05: the `security` workflow failed on 44 consecutive pushes across
// three sessions and one full day, and not one push was blocked, because every local gate was green for every
// one of them. Three of us pushed into a red CI without noticing; the cure is not more attention, it is an arm
// that asks.
//
// land already reasons this way one step earlier — "VERIFY THE REMOTE MOVED, because 'Everything up-to-date' is
// also a success ... asked of git, never inferred from an exit code". This is the same sentence about the forge.
//
// THE LAW THAT MAKES IT HONEST (uuidna-87's, and the same one the deposit door applies to a null axiom verdict):
// NO RUN FOUND IS UNMEASURED, NEVER A PASS. A poll is always faster than a queue, so a check that read "no runs
// yet" as clean would report green on every push and be worse than no check at all — it would carry the
// authority of a verdict while measuring nothing.

/** THE OTHER FORGE SURFACE. `gh run list` returns WORKFLOWS; a commit also carries CHECK RUNS, and the two are
 *  not peers to be unioned — measured on origin/main, `secret-scan`, `recomputable-audit` and `dependency-review`
 *  are three checks that are all JOBS of one `security` workflow run. The check surface is strictly FINER and
 *  strictly LARGER: every Actions job PLUS anything a GitHub App posts. `Workers Builds: uuidna`
 *  (cloudflare-workers-and-pages) failed on five consecutive pushes, appeared in neither `gh run list` nor this
 *  arm's verdict, and post-push answered "3 workflow(s) passed" on a commit the forge had marked red — the fault
 *  this arm exists to catch, reproduced inside the arm. Found by uuidna-87. */
export interface CheckRow {
  name: string
  status: string
  conclusion: string | null
  appSlug: string
  /** the workflow run this check belongs to, recovered from details_url — null for a foreign app. */
  runId: number | null
}

/** A FOREIGN CHECK CANNOT BE EVENT-ATTRIBUTED, so it cannot be filtered and cannot be defaulted safely. Every
 *  github-actions check carries `actions/runs/<id>/job/<id>` in details_url, and joining that id to
 *  `gh run list --json databaseId` recovers the event (verified: 33987294185 -> security -> push). A foreign
 *  app's details_url points at its own dashboard and carries no run id. So the roster is not a convenience for
 *  foreign checks — it is the ONLY place their verdict can be decided, and its columns are forced rather than
 *  chosen.
 *
 *  THE ROSTER IS uuidna-87's, IN src/forge-verdict.ts, AND IS IMPORTED RATHER THAN RESTATED. I wrote a second
 *  one here for an hour; two rosters is two trust bases, the same fault as two allowed-axiom sets. Theirs is
 *  keyed by exact check NAME, so `Workers Builds: uuidna-edge` lands in rosterGaps instead of inheriting an
 *  exemption written for a different worker — which is the correct direction for a name that is per-worker. */

/** One row as `gh run list --json workflowName,headSha,status,conclusion` returns it. */
export interface RunRow {
  workflowName: string
  headSha: string
  status: string
  conclusion: string | null
  /** the run's own id, so a check run can be joined back to it and inherit its event. */
  databaseId?: number
  // WHAT TRIGGERED THE RUN, and it is required rather than optional. A scheduled job carries the BRANCH HEAD's
  // sha, so `next` failing nightly and a push landing cleanly are two runs on one commit — and judging the push
  // by the schedule reports a clean landing as red. Measured on the forge: 69066484c carries
  // `push deploy success` and `schedule next failure`; the arm called that push FAILED. The mirror image of the
  // all-cancelled false pass, and the same defect underneath — a verdict that does not mean what its words say.
  event: string
}

export interface PushVerdict {
  sha: string
  // MEASURED MEANS SOMETHING JUDGED, not that a row exists. Those came apart and the arm was wrong for exactly
  // one evening: `[{security, cancelled}, {deploy, cancelled}]` is a NON-EMPTY row set that is EMPTY OF VERDICTS,
  // and reading "no failures" off it returned ok=true — with a reason that read "every workflow succeeded (2)".
  // Null and [] one more time, one layer out. Found by uuidna-87 handing the function cases, not by reading it.
  measured: boolean      // at least one run reached a verdict — false means UNMEASURED, never clean
  settled: boolean       // every run for this sha has finished
  ok: boolean            // settled AND something judged AND nothing failed
  failing: string[]      // workflow names whose conclusion is a real failure
  pending: string[]      // workflow names still running
  didNotJudge: string[]  // cancelled or skipped — reported ALWAYS, because what did not run is the reader's business
  notThisPush: string[]  // runs on this sha triggered by something else — reported, NEVER judged
  notJudging: string[]   // checks a roster entry exempts — reported ALWAYS, with the entry's reason available
  rosterGaps: string[]   // foreign checks NOT in the roster: judged normally, and named so someone decides
  reason: string
}

// A skipped or cancelled run is NOT a failure and NOT a success: it is a run that did not judge. Counting it as
// a pass would let a cancelled security scan read as a clean one, which is exactly the shape being cured here.
const PASSED = new Set(['success', 'neutral'])
const DID_NOT_JUDGE = new Set(['skipped', 'cancelled'])

/** pushVerdict(sha, rows) → what the forge says about this commit. Pure: the network lives in the caller. */
export function pushVerdict(sha: string, rows: readonly RunRow[], checks: readonly CheckRow[] = []): PushVerdict {
  // MATCH A PREFIX, because everyone types the short sha. Exact-only matching made the arm answer UNMEASURED for
  // a commit whose runs it was holding — the right refusal for the wrong reason, which is the failure mode this
  // whole arm exists to prevent: a check whose verdict does not mean what its words say. Seven hex characters is
  // git's own floor for an unambiguous abbreviation; anything shorter is refused rather than guessed at.
  if (sha.length < 7) throw new Error(`post-push: "${sha}" is too short to identify a commit — give at least seven hex characters`)
  const onSha = rows.filter((r) => r.headSha === sha || r.headSha.startsWith(sha))
  // ONLY A PUSH JUDGES A PUSH. A schedule, a workflow_dispatch and a pull_request can all land on this same
  // commit and answer a different question about it. They are reported so nothing is hidden, never counted.
  const mine = onSha.filter((r) => r.event === 'push')
  const notThisPush = onSha.filter((r) => r.event !== 'push')
    .map((r) => `${r.workflowName} (${r.event}: ${r.conclusion ?? r.status})`).sort()
  const pending = mine.filter((r) => r.status !== 'completed').map((r) => r.workflowName).sort()
  const failing = mine
    .filter((r) => r.status === 'completed' && !PASSED.has(r.conclusion ?? '') && !DID_NOT_JUDGE.has(r.conclusion ?? ''))
    .map((r) => `${r.workflowName} (${r.conclusion ?? 'no conclusion'})`).sort()
  const didNotJudge = mine.filter((r) => r.status === 'completed' && DID_NOT_JUDGE.has(r.conclusion ?? ''))
    .map((r) => `${r.workflowName} (${r.conclusion})`).sort()
  const passed = mine.filter((r) => r.status === 'completed' && PASSED.has(r.conclusion ?? ''))
  // A VERDICT REQUIRES A JUDGE. `failing.length === 0` is absence-of-failure, which is not the same as a pass over
  // a set where nothing judged — all-cancelled satisfied it. So ok demands at least one run that actually passed.
  const measured = passed.length > 0 || failing.length > 0
  const settled = mine.length > 0 && pending.length === 0
  const ok = settled && passed.length > 0 && failing.length === 0
  const aside = (didNotJudge.length ? ` — and did NOT judge: ${didNotJudge.join(', ')}` : '')
    + (notThisPush.length ? ` — and NOT this push: ${notThisPush.join(', ')}` : '')
  const reason = pending.length
    ? `still running for ${sha.slice(0, 9)}: ${pending.join(', ')}${aside}`
    : failing.length
      ? `FAILED for ${sha.slice(0, 9)}: ${failing.join(', ')}${aside}`
      : !onSha.length
        ? `UNMEASURED: the forge reports no run at all for ${sha.slice(0, 9)} — this is not a pass. It may not be queued yet, or may sit outside the queried window; ask again, with a larger limit if the commit is old.`
        : !mine.length
          ? `UNMEASURED: ${onSha.length} run(s) sit on ${sha.slice(0, 9)} and NOT ONE WAS A PUSH — ${notThisPush.join(', ')}. A schedule answers a different question about the same commit.`
          : !passed.length
            ? `UNMEASURED: ${mine.length} push run(s) for ${sha.slice(0, 9)} and NOT ONE JUDGED — ${didNotJudge.join(', ') || 'none completed'}. A cancelled scan is not a clean scan.`
            : `${passed.length} workflow(s) passed for ${sha.slice(0, 9)}${aside}`
  // ── THE FINER SURFACE, folded in. Actions checks inherit their run's event through the join, so the schedule
  //    filter above still holds. A foreign check has no run to join, so the roster decides it — and an
  //    UNROSTERED foreign check is judged NORMALLY (a new integration that fails must refuse) and named, so the
  //    decision is forced rather than defaulted. Silence toward a surface is how this arm went blind once.
  const eventOf = new Map(rows.filter((r) => r.databaseId !== undefined).map((r) => [r.databaseId!, r.event]))
  const notJudging: string[] = [], rosterGaps: string[] = []
  const checkFailing: string[] = [], checkPending: string[] = [], checkDidNotJudge: string[] = []
  let checkPassed = 0, sawCheck = false
  for (const c of checks) {
    // AN EXEMPTION ANSWERS ONE OF TWO QUESTIONS, AND THE ROSTER SPELLS BOTH THE SAME WAY.
    //   "may not have judged YET"      — CodeQL is routinely still queued; dependency-review skips on main.
    //                                    Its ABSENCE must not block. Its FAILURE is still a real finding.
    //   "its verdict is MEANINGLESS"   — Workers Builds cannot render this site, because 5260 pages do not fit
    //                                    an 8 GiB container that must also hold node and the bundler, so it can
    //                                    never succeed and even its failure must be ignored or every landing
    //                                    refuses forever.
    // Read as one word, a CodeQL FAILURE passes: measured, ok=true with `Analyze (actions) (failure)` merely
    // listed as exempt. The two are told apart by data already in hand rather than by a second declaration:
    // a FOREIGN check (no run to join, not github-actions) is exempt only because someone deliberately rostered
    // it as meaningless — an unrostered foreign check is judged normally below. A first-party JOB is exempt
    // from being REQUIRED, never from being believed when it fails.
    const exemptWhy = NEED_NOT_JUDGE[c.name]
    if (exemptWhy !== undefined) {
      const foreign = c.runId === null && c.appSlug !== 'github-actions'
      const failed = c.status === 'completed' && !PASSED.has(c.conclusion ?? '') && !DID_NOT_JUDGE.has(c.conclusion ?? '')
      if (foreign || !failed) { notJudging.push(`${c.name} (${c.conclusion ?? c.status})`); continue }
      // an exempt first-party check that FAILED falls through and is judged: exemption covers lateness, not fault
    }
    if (c.runId !== null) {
      const ev = eventOf.get(c.runId)
      // an Actions check whose run we cannot see is UNATTRIBUTED — not judged, and not silently dropped either
      if (ev === undefined) { rosterGaps.push(`${c.name} — its workflow run ${c.runId} is outside the queried window, so its event is unknown`); continue }
      if (ev !== 'push') { notThisPush.push(`${c.name} (${ev}: ${c.conclusion ?? c.status})`); continue }
    } else if (c.appSlug !== 'github-actions') {
      rosterGaps.push(`${c.name} (${c.appSlug}) is in no roster column — judged as a push check until someone decides`)
    }
    sawCheck = true
    if (c.status !== 'completed') { checkPending.push(c.name); continue }
    if (PASSED.has(c.conclusion ?? '')) { checkPassed++; continue }
    if (DID_NOT_JUDGE.has(c.conclusion ?? '')) { checkDidNotJudge.push(`${c.name} (${c.conclusion})`); continue }
    checkFailing.push(`${c.name} (${c.conclusion ?? 'no conclusion'})`)
  }
  if (checks.length) {
    // the check surface CONTAINS every Actions job, so when it is present it is the verdict — using both would
    // count one failure twice, at two granularities.
    const f = checkFailing.sort(), pd = checkPending.sort(), dj = checkDidNotJudge.sort()
    const meas = checkPassed > 0 || f.length > 0
    const sett = sawCheck && pd.length === 0
    const aside2 = (dj.length ? ` — and did NOT judge: ${dj.join(', ')}` : '')
      + (notJudging.length ? ` — and exempt: ${notJudging.join(', ')}` : '')
      + (notThisPush.length ? ` — and NOT this push: ${notThisPush.join(', ')}` : '')
      + (rosterGaps.length ? ` — UNROSTERED: ${rosterGaps.join('; ')}` : '')
    const why = pd.length ? `still running for ${sha.slice(0, 9)}: ${pd.join(', ')}${aside2}`
      : f.length ? `FAILED for ${sha.slice(0, 9)}: ${f.join(', ')}${aside2}`
      : !sawCheck ? `UNMEASURED: every check on ${sha.slice(0, 9)} is exempt or belongs to another event${aside2}`
      : !meas ? `UNMEASURED: ${checks.length} check(s) on ${sha.slice(0, 9)} and NOT ONE JUDGED${aside2}`
      : `${checkPassed} check(s) passed for ${sha.slice(0, 9)}${aside2}`
    return { sha, measured: meas, settled: sett, ok: sett && meas && f.length === 0,
      failing: f, pending: pd, didNotJudge: dj, notThisPush, notJudging, rosterGaps, reason: why }
  }
  return { sha, measured, settled, ok, failing, pending, didNotJudge, notThisPush, notJudging, rosterGaps, reason }
}

/** parseRunRows(json) → rows, refusing silently-malformed input rather than reading it as an empty (clean) list. */
export function parseRunRows(json: string): RunRow[] {
  const raw: unknown = JSON.parse(json)
  if (!Array.isArray(raw)) throw new Error('post-push: `gh run list --json` did not return an array — refusing to read a malformed answer as "no failures"')
  return raw.map((r) => {
    const o = r as Record<string, unknown>
    // NO DEFAULT FOR event. Guessing "push" would re-admit the schedule bug the moment the field is not asked
    // for; guessing "not push" would drop real push runs and read as a pass. Neither guess is safe, so refuse.
    if (o.event === undefined || o.event === null || String(o.event) === '')
      throw new Error('post-push: a run row carries no `event` — ask `gh run list --json ...,event`. A run that cannot say what triggered it cannot be attributed to a push.')
    return {
      event: String(o.event),
      workflowName: String(o.workflowName ?? o.name ?? '?'),
      headSha: String(o.headSha ?? ''),
      status: String(o.status ?? ''),
      conclusion: o.conclusion === null || o.conclusion === undefined ? null : String(o.conclusion),
    }
  })
}
