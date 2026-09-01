// landing-gaps — THE FINDER FOR THE DEFECT THIS TREE KEEPS MEETING: a green report over an action never taken.
//
// Ten times in one session, in ten disguises: three HARD gates whose entry guard stopped matching, so they
// exited 0 without running for 229 commits; `wrangler deploy --dry-run` passing an upload that error 10021
// refuses; a suite dying in setup and reporting no failures; deploy-run printing COMPLETE over four failed
// steps; a memo keyed on an array identity that is rebuilt every call, so it never hit; a delta test-selector
// silently choosing nothing; and — the plainest of them — `land`, whose header described "heal → commit → push"
// while the commit step did not exist. It healed, left 217 files staged, ran `git push`, and git said
// "Everything up-to-date" and exited 0. Six landings in a row reported success and moved nothing.
//
// WHAT THEY SHARE is not a bug in any check. Each check ran and each returned truthfully; what was missing was
// the WORK, and an exit code cannot see an absence. The only cure that has ever held is to ask the world what
// changed — git for a ref, the registry for a version, the zone for a redirect — rather than to read the tool's
// own opinion of itself.
//
// SO THIS FINDER ASKS ONE NARROW, DECIDABLE QUESTION, chosen because it is the one that keeps costing landings:
// a script that mutates git must VERIFY the mutation. A `git push` must read a ref back; a `git commit` must
// check that it succeeded. Both are cheap, both are exactly what was missing, and both are visible in the source.
//
// it sees the call and the verification, not whether the
// verification is CORRECT — a script could read a ref and ignore it and still pass here. It reasons about git
// alone, so the deploy and registry variants of the same class are out of its reach. It is a floor under one
// recurring failure, not a theory of the whole family, and naming it as such is the point: the family is caught
// by measuring effects, and no finder replaces that habit.
import { rd } from './api.js'

export interface Gap { what: string; fix: string }

/** files exempt with their reason — a list that MAY ONLY SHRINK, like every other exemption in this tree */
const EXEMPT: Record<string, string> = {
  'src/scripts/land.test.ts': 'a test ABOUT landing quotes the commands it checks; quoting is not performing',
  'src/scripts/landing-gaps.ts': 'this file names the commands in order to look for them — the finder is not the act',
  'src/reconcile-covers.test.ts': 'lists git commands as FORBIDDEN — it asserts the same law from the other side, and its list is quoted by construction',
  'src/scripts/impossibility-gaps.ts': 'discusses THIS finder in prose and quotes its example in backticks — a sibling finder describing a sibling finder is the mention case twice over',
}

// USE, NOT MENTION — and the first cut got this wrong in the way this tree has a whole law about. Matching
// /\bgit push\b/ flagged four files that only TALK about pushing: anchor.ts explaining that a push gives a
// NOT-AFTER bound, mcp.ts and priorart.ts saying a public commit is the external observer that dates a
// publication, and a test listing 'git commit' among the commands reconcile must never run. Every one was prose
// about git; none of them touched a repository.
//
// A command that is actually RUN is handed to a runner as a string, so it begins one: run('git push …'),
// execSync(`git commit …`). Requiring the opening quote separates the act from the account of it, and it is not
// a heuristic about English — it is the shape of a call site.
const PUSH = /['"`]git push\b/
const COMMIT = /['"`]git commit\b/
// reading a ref back, in any of the spellings this tree actually uses
const VERIFIES_REF = /rev-parse|rev-list|ls-remote|git log -1|%H/
// noticing whether the commit call itself succeeded
const VERIFIES_COMMIT = /\.ok\b|exitCode|status !== 0|catch\b|execSync/

export function landingGaps(files: readonly string[]): Gap[] {
  const gaps: Gap[] = []
  for (const rel of files) {
    if (EXEMPT[rel]) continue
    let text: string
    try { text = rd(rel) } catch { continue }
    if (PUSH.test(text) && !VERIFIES_REF.test(text)) {
      gaps.push({
        what: `${rel}: runs \`git push\` and never reads a ref back — "Everything up-to-date" is also a success`,
        fix: 'capture the commit you meant to land and compare it to the remote after the push (git rev-parse HEAD, then git rev-parse origin/<branch>). A push that moved nothing must FAIL, not report a landing — this is the exact shape that let six landings in one session push nothing at all.',
      })
    }
    if (COMMIT.test(text) && !VERIFIES_COMMIT.test(text)) {
      gaps.push({
        what: `${rel}: runs \`git commit\` without noticing whether it succeeded`,
        fix: 'check the result — a refused commit-msg gate, an empty index, or a blocked pre-commit all leave the tree exactly as it was while the script walks on believing it landed.',
      })
    }
  }
  return gaps
}
