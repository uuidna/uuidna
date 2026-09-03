// impossibility-gaps — A CLAIM THAT SOMETHING CANNOT BE DONE MUST SAY WHY.
//
// THE CAPTAIN'S LAW, learned by correcting me six times in one session: "all instructions NOT are treason." The
// treason is not every negation — "this module runs nothing" is a description and is fine. It is the negation
// that dresses a CHOICE as an IMPOSSIBILITY, because a choice can be argued with and a law of nature cannot.
// Each of these was mine, and each was false:
//
//   "uuidna NEVER EXECUTES"            — uuidnaExec runs applets; os/runtime verifies then runs host binaries
//   "network is forbidden"             — src/os is the declared boundary where a fetch is honest
//   "gate-receipt is host-only by nature" — it needs BYTES; primeCatalogue shows how bytes are handed over
//   "cannot flash firmware"            — os/runtime can plan a verified run of dd
//   "cannot confine, cannot scan"      — planAlpineRun('firejail') returns ok:true against a pinned rootfs
//   "fido2 needs a physical device"    — the browser exposes navigator.credentials, on the user's own machine
//
// Six false walls, none caught by a test, all caught by a person. A false limit is worse than the decision it
// hides: it reads as rigour, so nobody re-examines it, and the work behind it never gets done.
//
// SO THE RULE IS NARROW AND CHECKABLE. A comment claiming impossibility — cannot, can't, unable to, impossible,
// no way to — must name the reason in the same breath: a host fact (no filesystem, not a secure context, no
// device), a sealed theorem, a declared boundary, or "by construction". Anything else is an assertion that
// something is out of reach, made without evidence, in a tree whose whole discipline is evidence.
//
// THE EXISTING 691 ARE A DECLARED DEBT, not a wall of errors. Sweeping them mechanically is how a regex and a
// test fixture got broken earlier today; the list may only shrink, and each entry is a place where either a
// reason is missing or a capability is being refused without saying so.
import { rd } from './api.js'

export interface Gap { what: string; fix: string }

// WIDENED TO MODALITY, on a peer session's evidence (zeropoint-node, 2026-09-02). My class was bare
// IMPOSSIBILITY — "cannot", "never executes". Theirs was bare OBLIGATION, which this finder would have missed
// entirely: they asserted that additive changes REQUIRE a minor version bump, and were corrected — patch-first
// is that project's rule, and they had written a convention as a law. Same error, opposite modality: I wrote a
// limit that was actually a choice, they wrote a requirement that was actually a choice.
//
// So the rule is not about impossibility, it is about MODALITY: must, cannot, never, always, requires, only —
// every one asserts that the world admits no alternative, and every one needs a named source. "Patch-first is
// this project's rule" passes, because it names a decision. "Additive changes require a minor bump" fails,
// because it states a convention as physics.
// AND MEASURED BEFORE WIDENING, because the obvious version was wrong. Adding bare `must` doubles the debt
// (614 → 1250) and adding `always`/`only` quadruples it (2372), and those hits are overwhelmingly INVARIANTS a
// test enforces two lines later — "the count must equal the parts" is not a claim that the world admits no
// alternative, it is a description of what the adjacent assertion checks. The distinguishing feature is whether
// the modal is about the WORLD or about THIS CODE. So the obligation forms are taken and the bare ones are not,
// and the count lands at 606 — BELOW the impossibility-only baseline, because widening the justified sources
// (a named project decision is a legitimate source) offsets more than the new modals add.
export const IMPOSSIBLE = /\b(cannot|can't|is unable to|are unable to|impossible|no way to|must always|must never|(?:is|are) required to|require[sd]? that)\b/i
/** a claim of impossibility earns its place by naming a host fact, a law, or a construction */
// a modal claim earns its place by naming a host fact, a law, a construction, or an explicit DECISION — the
// last was added for the obligation class: a project rule is a legitimate source, it simply has to be named as
// one rather than dressed as a necessity
export const JUSTIFIED = /\b(theorem [a-z0-9_]+|by construction|host|browser|no filesystem|secure context|determinism|hard-reject|kernel|physical device|edge|isolate|tab|upstream|vendored|this project|the captain|decision|convention|rule of this|chosen|deliberate)\b/i

// AND A REASON STATED AS A CLAUSE IS A NAMED REASON. The rule at the top of this file is "must name the reason
// in the same breath" — but JUSTIFIED is a VOCABULARY, so a claim that gives its reason in plain English scored
// as unjustified. Six of the eight in src/nobles/curve.ts read like this:
//
//   "we can't do 'P = GetCurvePoint<PC>': this is default value and doesn't constrain anything"
//
// The reason is right there, after the colon. Flagging it demanded a keyword, not evidence, and the only way to
// clear it was to reword someone else's correct comment until it contained a word from a list — which is
// gaming the finder, and would have taught the tree that the finder is the thing to satisfy.
//
// So a modal followed by an explicit reason clause — `because`, `since`, `so that`, `which is why`, or a colon
// introducing a real explanation — is justified. DELIBERATELY NARROW: the colon must carry at least twelve
// characters of clause, so `cannot: no` does not pass, and the bare forms this finder was built for — "cannot
// flash firmware", "uuidna NEVER EXECUTES" — name no reason in any shape and still fail. The controls in
// impossibility-gaps.test.ts hold that: this widening must clear the stated-reason class and NOTHING else.
//
// AND THE REASON RUNS BOTH WAYS, which the first version of this missed. All eight claims in one-writer.ts
// state their reason — but the sentence puts it FIRST:
//
//   "A PID IS A NUMBER THE OS REISSUES, SO IT CANNOT BE AN IDENTITY"
//   "Atomic-exclusive create (flag wx) so two simultaneous acquirers cannot both win"
//   "A count cannot tell busy from stuck; a live child can"
//
// The first two put the cause before the effect and join it with `so`; the third states the claim and then the
// contrast that makes it true. Reading only rightwards from the modal scored every one of them as a bare wall,
// which would have had me rewrite eight correct comments backwards to satisfy a regex. So a cause introduced
// BEFORE the modal by `so`/`therefore`/`hence`, and a clause introduced after it by a dash or semicolon, both
// count — each with the same twelve-character floor, so a shrug (`cannot — sadly`) is not a reason.
//
// AND IT READS THE SAME THREE-LINE WINDOW the keyword rule does, which the first version did not: this file's
// own note says the reason "may sit on the line, or on the line before or after — a sentence wraps", and
// applying the clause rule to the single line contradicted it. A wrapped comment whose colon landed on the next
// line scored as a bare wall.
export const REASON_CLAUSE = new RegExp(
  [
    // the reason follows the claim: `cannot X: <clause>` or `cannot X because …`
    String.raw`\b(cannot|can't|is unable to|are unable to|impossible|no way to|must always|must never|(?:is|are) required to|require[sd]? that)\b[^:.]{0,80}(?::\s*\S[^\n]{11,}|\s+(?:because|since|so that|which is why)\b)`,
    // the reason follows after a dash or a semicolon: `cannot tell busy from stuck; a live child can`
    String.raw`\b(cannot|can't|is unable to|are unable to|impossible|no way to|must always|must never|(?:is|are) required to|require[sd]? that)\b[^\n]{0,80}[—–;]\s*\S[^\n]{11,}`,
    // the cause comes FIRST and joins with `so`: `the OS reissues it, so it cannot be an identity`
    String.raw`\S[^\n]{11,}[,)]?\s+(?:so|therefore|hence)\s+[^\n]{0,30}?\b(cannot|can't|is unable to|are unable to|impossible|no way to|must always|must never|(?:is|are) required to|require[sd]? that)\b`,
  ].join('|'),
  'i',
)
const COMMENT = /^\s*(\/\/|\*)/

/** impossibilityGaps(files, baseline) → bare impossibility claims not already declared. */
// THIS FILE NAMES THE WORDS IN ORDER TO HUNT THEM, so it matches its own pattern — the use/mention collision
// that put an icon theme in neuroscience and flagged four prose mentions of `git push` as unverified pushes.
// Third time today; the exemption is the same one landing-gaps carries, and for the same reason: the finder is
// not the act.
const SELF = new Set([
  'src/scripts/impossibility-gaps.ts',
  // classifies refusal boundaries BY these words, so it must name them — the mention case, fifth time today
  'src/school/refusals/index.ts',
  // THE INVOLUTION TOOL, which carries the modal phrases as its TAUGHT TABLE and quotes the broken rewrites it
  // measured — "claims that cannot fail" becoming "claims that is rigged to pass" is the evidence for why the
  // table stays nine forms wide, and it can only be shown by writing it. Seventh instance of mention-not-use.
  // NOT the same as exempting a vendored file by provenance, which was proposed and REFUSED: this list is for
  // finders that must name what they hunt, never for source whose prose someone else wrote.
  'src/scripts/involute-modals.ts',
  // THE CONTROLS FOR THIS FINDER, which must WRITE a bare wall in order to assert it is still caught. Eighth
  // instance of mention-not-use, and the one that would have been most corrosive to fix the other way: the
  // shortest path to a green guard was to soften my own controls until they no longer contained the forms they
  // exist to catch, which is the finder marking its own homework.
  'src/scripts/impossibility-gaps.test.ts',
])

export function impossibilityGaps(files: readonly string[], baseline: ReadonlySet<string>): Gap[] {
  const gaps: Gap[] = []
  for (const rel of files) {
    if (SELF.has(rel) || baseline.has(rel)) continue
    let text: string
    try { text = rd(rel) } catch { continue }
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]!
      if (!COMMENT.test(l) || !IMPOSSIBLE.test(l)) continue
      // the reason may sit on the line, or on the line before or after — a sentence wraps
      const window = [lines[i - 1] ?? '', l, lines[i + 1] ?? ''].join(' ')
      if (JUSTIFIED.test(window) || REASON_CLAUSE.test(window)) continue
      gaps.push({
        what: `${rel}:${i + 1} claims something CANNOT be done without naming why: ${l.trim().slice(0, 96)}`,
        fix: 'name the reason in the same breath — a host fact (no filesystem, not a secure context, no device), ' +
          'a sealed theorem, a declared boundary, or "by construction". If there is no such reason, the thing is ' +
          'a CHOICE and should be written as one: "this API declines to", not "uuidna cannot". A false limit ' +
          'reads as rigour, so nobody re-examines it and the work behind it never gets done.',
      })
    }
  }
  return gaps
}
