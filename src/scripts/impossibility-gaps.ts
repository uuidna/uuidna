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

const IMPOSSIBLE = /\b(cannot|can't|is unable to|are unable to|impossible|no way to)\b/i
/** a claim of impossibility earns its place by naming a host fact, a law, or a construction */
const JUSTIFIED = /\b(theorem [a-z0-9_]+|by construction|host|browser|no filesystem|secure context|determinism|hard-reject|kernel|physical device|edge|isolate|tab|upstream|vendored)\b/i
const COMMENT = /^\s*(\/\/|\*)/

/** impossibilityGaps(files, baseline) → bare impossibility claims not already declared. */
// THIS FILE NAMES THE WORDS IN ORDER TO HUNT THEM, so it matches its own pattern — the use/mention collision
// that put an icon theme in neuroscience and flagged four prose mentions of `git push` as unverified pushes.
// Third time today; the exemption is the same one landing-gaps carries, and for the same reason: the finder is
// not the act.
const SELF = 'src/scripts/impossibility-gaps.ts'

export function impossibilityGaps(files: readonly string[], baseline: ReadonlySet<string>): Gap[] {
  const gaps: Gap[] = []
  for (const rel of files) {
    if (rel === SELF || baseline.has(rel)) continue
    let text: string
    try { text = rd(rel) } catch { continue }
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]!
      if (!COMMENT.test(l) || !IMPOSSIBLE.test(l)) continue
      // the reason may sit on the line, or on the line before or after — a sentence wraps
      const window = [lines[i - 1] ?? '', l, lines[i + 1] ?? ''].join(' ')
      if (JUSTIFIED.test(window)) continue
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
