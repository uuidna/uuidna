-- lean/cross/handlestore/cross-named.lean — CONSOLIDATED by a script from lean/HandleStore.lean (domain HandleStore, family cross-named).
-- Each theorem below is copied verbatim from its source; the preamble is that file's own definitions, namespaced.
namespace Cross_HandleStore_cross_named



/-- AND THE CROSSING IS AT 116 BITS, WHICH IS INSIDE THE ADDRESS. The two theorems below say 2^128 clears Planck
    resolution on a metre and 2^96 does not; between them sits a width where it first happens, and walking it
    gives 116 — 1616255 · 2^115 < 10^41 and 1616255 · 2^116 > 10^41, on the same CODATA 2022 Planck length the
    two theorems below use — 1.616255(18) x 10^-35 m, physics.nist.gov. So the frontier is not at either end of
    this tree's arithmetic: the leaf payload falls short by exactly twenty bits, and the full address clears it
    by twelve. A bound established by the same walk that uses it is a shape this ledger has caught before, so
    both sides are decided rather than the crossing being quoted from one. -/
theorem crossing_sits_inside : ((1616255 * 2 ^ 115 < 10 ^ 41) ∧ (1616255 * 2 ^ 116 > 10 ^ 41)) ∧ ((96 < 116) ∧ (116 < 128)) := by decide

end Cross_HandleStore_cross_named
