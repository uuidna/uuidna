// categories/coding/polygraph — THE SAY-DO GAP, MADE DECIDABLE (lead 98, the captain's question: "what is the
// navy procedure detecting similar pattern in agent behaviour? the hexbit polygraph?"). The investigation of
// 2026-08-23 charted the gap by hand and found five strikes; this is the instrument that finds one class of it
// WITHOUT a hand: a commit's MESSAGE against its own DIFF. A message that names a path the commit never touched
// is a say-do gap in the one place the tree can adjudicate — the message is the claim, the diff is the deposit,
// and the two are comparable by set arithmetic alone.
//
// WHAT IT MEASURES AND WHAT IT REFUSES TO: it measures NAMED-BUT-UNTOUCHED (a path claimed in prose that the
// commit does not contain). It does NOT measure intention, effort, or honesty — a mismatch is a NOTICE, exactly
// as UNVERIFIED is a notice (theorem silence_never_refutes): the commit may be describing context, quoting a
// finder, or naming the file it deliberately did not change. So the needle reports a RATE, never a verdict on a
// person, and the examined agent reads its own chart first. The other direction (touched-but-unnamed) is left
// unmeasured on purpose: a wave legitimately touches derived files it need not list, and a finder that demanded
// exhaustive listing would teach padding — the exact evasion the catalogue warns of.
// Pure hexbit-app law: the caller supplies the commits; this module counts. HONEST SCOPE: conduct arithmetic
// over the record, never over a mind.
export interface CommitRecord { hash: string; message: string; touched: readonly string[] }
export interface SayDo { hash: string; claimed: string[]; untouched: string[]; kept: number }
export interface PolygraphChart { commits: number; claims: number; kept: number; gaps: SayDo[]; keptRate: number }

// a PATH-SHAPED token in prose: at least one slash and a known source extension — narrow on purpose, because a
// finder that guessed at bare words would charge every noun in a sentence
const PATH = /\b((?:src|docs|lean|packages|scripts|\.github)\/[A-Za-z0-9_./-]+\.(?:ts|js|md|lean|json|vue|yml))\b/g

/** one commit's say-do: which paths its message names, and which of those its diff does not contain. */
export function sayDoOf(c: CommitRecord): SayDo {
  const claimed = [...new Set([...c.message.matchAll(PATH)].map((m) => m[1]!))]
  const touched = new Set(c.touched)
  const untouched = claimed.filter((p) => !touched.has(p))
  return { hash: c.hash, claimed, untouched, kept: claimed.length - untouched.length }
}

/** the chart: the rate at which named paths were actually delivered, and every gap named with its commit. */
export function chart(commits: readonly CommitRecord[]): PolygraphChart {
  const rows = commits.map(sayDoOf)
  const claims = rows.reduce((n, r) => n + r.claimed.length, 0)
  const kept = rows.reduce((n, r) => n + r.kept, 0)
  return {
    commits: commits.length,
    claims,
    kept,
    gaps: rows.filter((r) => r.untouched.length > 0),
    // no claims is not a failure — a message that names no path promises no path (the empty case verifies)
    keptRate: claims === 0 ? 1 : kept / claims,
  }
}
