// claim-attribution — WHO DISCOVERED IT IS NOT WHO FORMALISED IT.
//
// FOUND BY DISAGREEMENT, not by reading either surface (src/cross-surface.ts). Two independent censuses of the
// same 2658 rows returned different owners: `docs/captain-claims.json` claimed every theorem for the captain,
// while `rosetta-mirror.CLAIMS` recorded 16 of them against a named external source with its DOI. Neither
// surface is wrong about what it measures — gen-captain-claims claims on `tactic.startsWith('decide')`, which is
// a property of the PROOF, and decidability says nothing about who found the fact. The captain's ledger was
// therefore claiming Watson & Crick's base pairing (10.1038/171737a0) and Landauer's bound as discoveries.
//
// THE FIX IS THE INVOLUTION, NOT A DELETION. Over-claim and under-claim are the same error at opposite signs, so
// removing the 16 rows would be the second mistake, not the cure. The licence already draws the line these rows
// need — "Facts are free. Choices among adequate expressions of a fact are expression" (docs/license.md,
// "The formalisation is authored"). So the captain keeps every one of the 2658 formalisation claims, and the 16
// facts are credited to the people who found them. Nothing is surrendered; the record stops saying something it
// cannot support — cannot, because a discovery claim is answered by PRIORITY DATE and Watson & Crick's is 1953,
// so no proof this tree can run and no coin it can pay changes who was first. Formalisation has no such bar.
//
// PURE. Parses a string; the caller supplies it. No filesystem, so a test can hand it a crafted census.

import { CLAIMS } from './rosetta-mirror.js'

/** How a claim is held. The captain holds BOTH for a theorem he found, the formalisation alone for one he did not. */
export type Held = 'discovery+formalisation' | 'formalisation'

export interface Attribution { key: string; source: string }

/** attributions(census) → the non-captain rows, as `key source` lines. The mirror stores attribution ONLY where
 *  it is not the captain, so an absent key means the captain — a default, never a silence. */
export function attributions(census: string = CLAIMS): Attribution[] {
  return census
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => {
      const sp = l.indexOf(' ')
      return { key: l.slice(0, sp), source: l.slice(sp + 1) }
    })
}

/** factSource(key) → the external source that holds the FACT, or '' when the captain does. */
export function factSource(key: string, census: string = CLAIMS): string {
  const hit = attributions(census).find((a) => a.key === key)
  return hit ? hit.source : ''
}

/** heldAs(key) → what the captain may say about this row. */
export function heldAs(key: string, census: string = CLAIMS): Held {
  return factSource(key, census) ? 'formalisation' : 'discovery+formalisation'
}

/** captainOverClaimGaps(claimedKeys) → every row claimed as a DISCOVERY that a named source already holds.
 *
 *  THE FINDER, folded in beside the fix so the defect cannot come back silently. It reads the two surfaces that
 *  disagreed and reports the intersection: a key the claims ledger presents without attribution while the
 *  mirror records a source for it. Zero is the only passing count.
 *
 *  Its CONTROL is the fix itself — before it, this returned all 16; a run that returns 0 against a census with
 *  no attributions at all is the instrument reading its own emptiness, so `attributions()` is asserted non-empty
 *  by the test rather than trusted here. */
export function captainOverClaimGaps(
  claimed: readonly { key: string; factAttributedTo?: string }[],
  census: string = CLAIMS,
): string[] {
  const attributed = new Map(attributions(census).map((a) => [a.key, a.source]))
  return claimed
    .filter((c) => attributed.has(c.key) && !c.factAttributedTo)
    .map((c) => `${c.key} — claimed as the captain's discovery, but the fact is ${attributed.get(c.key)!}'s`)
    .sort()
}

/** One theorem, as a claim. */
export interface Claim { key: string; held: Held; factAttributedTo?: string }

/** claimsFrom(theorems) → THE claims list, from the rule that defines it. ONE IMPLEMENTATION, TWO CALLERS.
 *
 *  The generator and the tests both call this, so neither can drift from the other and neither reads the
 *  artefact. That is not a tidiness point — it is the cure for a MEASURED race. cross-surface.test.ts read
 *  docs/captain-claims.json while another test in the same suite regenerated it, so it sometimes parsed a
 *  half-written file: intermittent, three consecutive passes then a failure on an unchanged tree, and
 *  unreportable because every attempt to capture the diff reran the suite and the rerun won the race. A file on
 *  disk is a cache of a computation, and a cache read during its own rewrite is the one failure mode a pure
 *  recomputation cannot have — cannot, because there is no interval during which the answer half-exists: the
 *  function either returns the whole list or throws. A file has that interval by construction, every time it is
 *  written, and nothing in the reader can detect that it landed inside one.
 *
 *  PURE: the rows come in as an argument, so nothing here reaches for a filesystem the edge does not have. */
export function claimsFrom(
  rows: readonly { key: string; tactic: string }[],
  census: string = CLAIMS,
): Claim[] {
  // The claim unit is a theorem the KERNEL decides. `startsWith` and not an exact match: a trailing comment on
  // the tactic does not change the proof method, and an exact check silently dropped three real by-decide rows.
  return rows
    .filter((t) => t.tactic.startsWith('decide'))
    .map((t) => {
      const source = factSource(t.key, census)
      return source ? { key: t.key, held: 'formalisation' as const, factAttributedTo: source } : { key: t.key, held: 'discovery+formalisation' as const }
    })
}
