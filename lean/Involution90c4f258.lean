-- lean/Involution90c4f258.lean — GENERATED. INVOLUTION 90c4f258: lead 90c4f258 of lean/leads.json (refuted), stated in the row's own lean field as lead_90c4f258, and involution_90c4f258, the kernel's proof of its negation, accepted at the door for the text addressed d8893eff-803b-86fa-b79e-0d0ca40c03b7. Every proof checked by the kernel (by unfold), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- Lead 90c4f258 (lean/leads.json refuted#47), stated as the CONJUNCTION the lead asserts, over
-- the instants the row's own killed_by MEASURED — not over the two the lead misread.
-- THE LEAD SAYS TWO THINGS IN ONE BREATH: that production is BEHIND a green main, and that the distance is
-- SEVENTEEN HOURS. An involution that disputes only the second leaves the first standing, which is why five of the
-- fourteen faces refused to sign the earlier wing. Both clauses are stated here, and both die.
-- THE INSTANTS ARE THE ROW'S OWN MEASUREMENT: `wrangler deployments list` prints ASCENDING, and read correctly the
-- newest deployment is 2026-09-01T08:23:18Z while the newest landed commit ff427884 is 2026-09-01T07:47:39Z.
-- Seconds run from 2026-09-01T00:00:00Z — one clock, one day, no offset to drop.
-- WHAT DIES: both clauses at once. The deployment is 2139 s = 35 m 39 s AFTER the commit, so production
-- was never behind at all, and "behind by at least seventeen hours" is false twice over.
-- WHAT THIS DOES NOT DECIDE: whether `wrangler deployments list` prints ascending. That is an instrument's
-- behaviour; the row's killed_by measured it, and no kernel decides a measurement. The kernel decides only what
-- follows from the instants once they are read.
def deployUtcSec : Nat := 8 * 3600 + 23 * 60 + 18
def commitUtcSec : Nat := 7 * 3600 + 47 * 60 + 39
/-- Lead 90c4f258 as the conjunction it actually asserts: production BEHIND a green main — the newest deployment
    older than the newest landed commit — AND behind it by at least seventeen hours. Stated over the instants the
    row's own killed_by measured, so what the kernel decides is the lead's claim and not a milder one. -/
def lead_90c4f258 : Prop := deployUtcSec < commitUtcSec ∧ 17 * 3600 ≤ commitUtcSec - deployUtcSec

/-- The kernel refutes lead 90c4f258 whole. On the instants the row measured, the newest deployment 08:23:18Z is
    2139 seconds — 36 minutes — AFTER the newest landed commit 07:47:39Z: production was AHEAD of the landing,
    not seventeen hours behind it. The first clause fails, so the conjunction fails with it, and the lead's
    substance dies here rather than only its numeral. -/
theorem involution_90c4f258 : ¬ lead_90c4f258 := by
  unfold lead_90c4f258
  decide
