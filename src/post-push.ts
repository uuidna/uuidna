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

/** One row as `gh run list --json workflowName,headSha,status,conclusion` returns it. */
export interface RunRow {
  workflowName: string
  headSha: string
  status: string
  conclusion: string | null
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
  reason: string
}

// A skipped or cancelled run is NOT a failure and NOT a success: it is a run that did not judge. Counting it as
// a pass would let a cancelled security scan read as a clean one, which is exactly the shape being cured here.
const PASSED = new Set(['success', 'neutral'])
const DID_NOT_JUDGE = new Set(['skipped', 'cancelled'])

/** pushVerdict(sha, rows) → what the forge says about this commit. Pure: the network lives in the caller. */
export function pushVerdict(sha: string, rows: readonly RunRow[]): PushVerdict {
  // MATCH A PREFIX, because everyone types the short sha. Exact-only matching made the arm answer UNMEASURED for
  // a commit whose runs it was holding — the right refusal for the wrong reason, which is the failure mode this
  // whole arm exists to prevent: a check whose verdict does not mean what its words say. Seven hex characters is
  // git's own floor for an unambiguous abbreviation; anything shorter is refused rather than guessed at.
  if (sha.length < 7) throw new Error(`post-push: "${sha}" is too short to identify a commit — give at least seven hex characters`)
  const mine = rows.filter((r) => r.headSha === sha || r.headSha.startsWith(sha))
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
  const aside = didNotJudge.length ? ` — and did NOT judge: ${didNotJudge.join(', ')}` : ''
  const reason = pending.length
    ? `still running for ${sha.slice(0, 9)}: ${pending.join(', ')}${aside}`
    : failing.length
      ? `FAILED for ${sha.slice(0, 9)}: ${failing.join(', ')}${aside}`
      : !mine.length
        ? `UNMEASURED: the forge reports no run at all for ${sha.slice(0, 9)} — this is not a pass. The runs may not have been queued yet; ask again.`
        : !passed.length
          ? `UNMEASURED: ${mine.length} run(s) for ${sha.slice(0, 9)} and NOT ONE JUDGED — ${didNotJudge.join(', ') || 'none completed'}. A cancelled scan is not a clean scan.`
          : `${passed.length} workflow(s) passed for ${sha.slice(0, 9)}${aside}`
  return { sha, measured, settled, ok, failing, pending, didNotJudge, reason }
}

/** parseRunRows(json) → rows, refusing silently-malformed input rather than reading it as an empty (clean) list. */
export function parseRunRows(json: string): RunRow[] {
  const raw: unknown = JSON.parse(json)
  if (!Array.isArray(raw)) throw new Error('post-push: `gh run list --json` did not return an array — refusing to read a malformed answer as "no failures"')
  return raw.map((r) => {
    const o = r as Record<string, unknown>
    return {
      workflowName: String(o.workflowName ?? o.name ?? '?'),
      headSha: String(o.headSha ?? ''),
      status: String(o.status ?? ''),
      conclusion: o.conclusion === null || o.conclusion === undefined ? null : String(o.conclusion),
    }
  })
}
