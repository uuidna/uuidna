// cross-surface — A LEAD IS WHERE TWO SURFACES THAT MUST AGREE, DO NOT.
//
// (the captain, 2026-09-06: "use same logic for lead discovery" — the prior-art sweep's logic, where a single
// index is noise and two independent indexes agreeing is signal.)
//
// THE SAME SHAPE ONE DOMAIN OVER. The prior-art sweep could not separate a real hit from a word coincidence on
// any one index's score: Crossref gave Chargaff 53, Landauer 28, garbage 26 — a genuine hit BELOW a
// coincidence. Agreement between Crossref and arXiv separated all four probes cleanly, because noise does not
// agree across instruments that share no corpus.
//
// Lead discovery has the same problem and the same cure. A single finder reporting zero is not evidence — the
// day this was written produced FIVE finders that read clean while broken. What IS evidence is two surfaces
// that measure the same quantity by different mechanisms and return different numbers. Every defect found on
// 2026-09-06 was that shape:
//
//   captain-claims 2657 vs rosetta 2641   -> a 16-theorem over-claim
//   gh run list vs check-runs             -> a failing check both arms were blind to
//   my finder vs a peer's on the floor    -> a row hidden behind a documented threshold
//   index-mirror vs axis-discovery        -> a pairing nothing could witness
//
// NONE of those was found by looking harder at one surface. All were found by asking two.
//
// PURE. Each probe is a pair of readings and a name; the module compares numbers it is handed. No filesystem,
// no network, no clock — so a probe can be handed a crafted disagreement in a test.

export interface Reading { surface: string; value: number }
export interface Probe { what: string; a: Reading; b: Reading; why: string }
export interface Disagreement { what: string; a: Reading; b: Reading; delta: number; why: string }

/** disagreements(probes) → every pair whose two surfaces returned different numbers.
 *
 *  AGREEMENT IS NOT PROOF AND IS NOT REPORTED. Two surfaces can agree because both read the same stale file —
 *  that is the shared-mechanism failure the same day demonstrated, when two sessions both read `gh run list`
 *  and neither saw the red check. This reports only the disagreements, which are leads; a silent probe means
 *  "these two agreed today", never "this is correct". */
export function disagreements(probes: readonly Probe[]): Disagreement[] {
  return probes
    .filter((p) => p.a.value !== p.b.value)
    .map((p) => ({ what: p.what, a: p.a, b: p.b, delta: p.b.value - p.a.value, why: p.why }))
    .sort((x, y) => (y.delta < 0 ? -y.delta : y.delta) - (x.delta < 0 ? -x.delta : x.delta) || x.what.localeCompare(y.what))  // no Math.*: the determinism gate refuses it
}

/** the census a planner reads: how many pairs were asked, and how many disagreed. */
export function crossSurfaceCensus(probes: readonly Probe[]): { asked: number; disagreed: number; agreed: number } {
  const d = disagreements(probes).length
  return { asked: probes.length, disagreed: d, agreed: probes.length - d }
}
