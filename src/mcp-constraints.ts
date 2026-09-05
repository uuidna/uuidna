// mcp-constraints — WHAT A CLIENT'S OWN LIMITS SAY ABOUT THIS SURFACE, computed rather than assumed.
//
// tools/list is not served into a vacuum. Every host that puts these tools in front of a model has published
// limits, and this tree has never measured itself against them — the wire budget counts BYTES, which is a
// different question from whether a client will accept the surface at all. microsoft/mcp-interviewer publishes
// the constraint codes as a checkable list (OTC, ONL, ONP), so they can be recomputed here instead of taken on
// faith from someone else's report about us.
//
// EXCEEDING A LIMIT IS NOT AUTOMATICALLY A DEFECT, and this module refuses to pretend otherwise. OpenAI's
// chat-completions endpoint caps a request at 128 tools and recommends at most 20; this server serves far more,
// deliberately, and collapses to one call through uuidna_unify for a caller that wants the state rather than the
// surface. So a failed limit is reported with WHOSE limit it is and what this tree offers instead — never as a
// gap demanding a fix, because a gate that refuses a stated scope is a gate measuring the wrong thing, which is
// the same fault the ratchet record was written to end.
//
// THE RESULT IS A READING, NOT A SEAL. Nothing here is minted: the counts are recomputed from TOOL_NAMES on
// every call, and a number that describes this repository on a Tuesday belongs in a report, never in the ledger.

/** One published client limit, and what this surface does against it. */
export interface ConstraintVerdict {
  code: string        // the interviewer's own code, so a reader can look it up in their table
  whose: string       // WHOSE limit — a limit with no owner reads as a law of nature
  limit: string       // the rule in one phrase
  satisfied: boolean
  measured: string    // what this surface actually reads
  note: string        // what it means here — the scope, or the offenders
}

/** Every limit, with the surface's own summary. */
export interface ConstraintReport {
  tools: number
  verdicts: ConstraintVerdict[]
  satisfied: number
  exceeded: number
  honest: string
}

/** OpenAI's hard cap on tools in a single chat-completions request. */
export const OPENAI_TOOL_CAP = 128
/** OpenAI's recommended ceiling — guidance, not a rejection. */
export const OPENAI_TOOL_ADVICE = 20
/** Longest tool name a function call accepts. */
export const NAME_MAX = 64
/** The characters a tool name may use. */
export const NAME_PATTERN = /^[a-zA-Z0-9_-]+$/

const HONEST =
  'This surface measured against limits published by the clients that serve it, recomputed from the live tool ' +
  'list. A limit that is exceeded is reported with whose limit it is and what this tree offers instead — the ' +
  'tool count is a stated scope, not a defect, and uuidna_unify is the one call that answers state without the ' +
  'surface. Nothing here is sealed: a count of this repository today is a reading, and a reading is not a theorem.'

/** overLongNames(names) → names a function-calling client would reject as too long. */
export const overLongNames = (names: readonly string[]): string[] => names.filter((n) => n.length > NAME_MAX)

/** malformedNames(names) → names outside the accepted character set. */
export const malformedNames = (names: readonly string[]): string[] => names.filter((n) => !NAME_PATTERN.test(n))

/** longestName(names) → the longest name and its length, for a report that shows headroom rather than a verdict. */
export function longestName(names: readonly string[]): { name: string; length: number } {
  let best = { name: '', length: 0 }
  for (const n of names) if (n.length > best.length) best = { name: n, length: n.length }
  return best
}

/** constraintReport(names) → every published limit, recomputed against this surface.
 *
 *  The count limit is reported TWICE on purpose — the hard cap and the recommendation are different claims, and
 *  collapsing them would let a surface that merely exceeds guidance look like one a client will reject. */
export function constraintReport(names: readonly string[]): ConstraintReport {
  const longest = longestName(names)
  const tooLong = overLongNames(names)
  const malformed = malformedNames(names)
  const verdicts: ConstraintVerdict[] = [
    {
      code: 'OTC', whose: 'OpenAI chat-completions', limit: `at most ${OPENAI_TOOL_CAP} tools in one request`,
      satisfied: names.length <= OPENAI_TOOL_CAP,
      measured: `${names.length} tools`,
      note: names.length <= OPENAI_TOOL_CAP
        ? 'the whole surface fits in one request'
        : `STATED SCOPE, not a defect: this server serves the full surface and collapses to one call through uuidna_unify for a caller that wants the state. A client capped at ${OPENAI_TOOL_CAP} takes the subset it can hold, or the one call.`,
    },
    {
      code: 'OTC-advice', whose: 'OpenAI guidance', limit: `at most ${OPENAI_TOOL_ADVICE} tools recommended`,
      satisfied: names.length <= OPENAI_TOOL_ADVICE,
      // INTEGER DIVISION WITHOUT THE MATHS NAMESPACE, which this tree hard-rejects everywhere with no
      // exemption — the scanner cannot tell a mention from a use, and a floor helper is the one thing a
      // determinism law cannot allow a carve-out for. Subtracting the remainder before dividing is exact
      // for non-negative integers, which a tool count always is.
      measured: `${names.length} tools, ${(names.length - (names.length % OPENAI_TOOL_ADVICE)) / OPENAI_TOOL_ADVICE}x the recommendation`,
      note: 'guidance about model accuracy under tool-space interference, not a rejection — the same research that names the effect is why the one-call collapse exists',
    },
    {
      code: 'ONL', whose: 'function calling', limit: `name at most ${NAME_MAX} characters`,
      satisfied: tooLong.length === 0,
      measured: `longest ${longest.length} (${longest.name})`,
      note: tooLong.length === 0 ? `${NAME_MAX - longest.length} characters of headroom` : `too long: ${tooLong.join(', ')}`,
    },
    {
      code: 'ONP', whose: 'function calling', limit: 'name matches a-zA-Z0-9_-',
      satisfied: malformed.length === 0,
      measured: `${names.length - malformed.length}/${names.length} well-formed`,
      note: malformed.length === 0 ? 'every name callable as written' : `malformed: ${malformed.join(', ')}`,
    },
  ]
  return {
    tools: names.length,
    verdicts,
    satisfied: verdicts.filter((v) => v.satisfied).length,
    exceeded: verdicts.filter((v) => !v.satisfied).length,
    honest: HONEST,
  }
}
