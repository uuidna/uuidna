-- lean/Involution90c4f258.lean — GENERATED. INVOLUTION 90c4f258: lead 90c4f258 of lean/leads.json (refuted), stated in the row's own lean field as lead_90c4f258, and involution_90c4f258, the kernel's proof of its negation, accepted at the door for the text addressed 70ce590b-b942-8289-8560-dee54b7316b5. Every proof checked by the kernel (by unfold), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- Lead 90c4f258 (lean/leads.json refuted#47), stated as the INFERENCE the lead itself draws.
-- The lead says, in one breath: the newest Cloudflare deployment is 2026-08-31T17:45:18Z, the newest landed commit
-- ff427884 is at 2026-09-01T10:47:39+03:00, and "PRODUCTION IS 17 HOURS BEHIND A GREEN MAIN".
-- NEITHER INSTANT IS ASSUMED TRUE HERE. They are the lead's own printed numbers, and the Prop is the step it takes
-- from them; seconds run from 2026-08-31T00:00:00Z, and the +03:00 the lead prints is honoured.
-- WHAT DIES: the seventeen-hour conclusion. The lead's own two instants are 50541 s = 14 h 02 m 21 s apart, and
-- seventeen hours is 61200 s — the figure appears only if the offset the lead printed is dropped.
-- WHAT IS NOT SETTLED HERE, and no one may read this theorem as settling it: whether production tracked main, and
-- whether the deployment listing was misread (the row's killed_by says it was, the true newest deploy landing
-- 36 minutes AFTER the commit). Those are claims about an instrument's output; no kernel decides them.
def deploySec : Nat := 17 * 3600 + 45 * 60 + 18
def commitLocalSec : Nat := 86400 + (10 * 3600 + 47 * 60 + 39)
def offsetSec : Nat := 3 * 3600
/-- The seventeen-hour conclusion of lead 90c4f258, stated as the inference the lead draws from its own two
    printed instants — newest Cloudflare deployment 2026-08-31T17:45:18Z, newest landed commit ff427884 at
    2026-09-01T10:47:39+03:00 — with the +03:00 the lead prints honoured. Neither instant is assumed true
    here: the Prop is the step the lead takes, not the measurement it takes it from. The lead's other
    clauses (that the wrangler path did not fire; the folklore history) are NOT stated here, and this
    declaration must not be read as touching them. -/
def lead_90c4f258 : Prop := 17 * 3600 ≤ commitLocalSec - offsetSec - deploySec

/-- The kernel refutes lead 90c4f258: the two instants the lead prints are 50541 s = 14 h 02 m 21 s apart, not
    the seventeen hours (61200 s) it concludes — that figure appears only if the offset the lead itself printed
    is dropped. This decides the lead's arithmetic and NOTHING else: whether production tracked main, and
    whether the deployment listing was misread, are not settled here and no kernel settles them. -/
theorem involution_90c4f258 : ¬ lead_90c4f258 := by
  unfold lead_90c4f258
  decide
