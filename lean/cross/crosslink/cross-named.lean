-- lean/cross/crosslink/cross-named.lean — CONSOLIDATED by a script from lean/Crosslink.lean (domain Crosslink, family cross-named).
-- Each theorem below is copied verbatim from its source; the preamble is that file's own definitions, namespaced.
namespace Cross_Crosslink_cross_named



/-- THE CLAIM THE CAPTAIN NAMED, DECIDED AS A COMPARISON OF EXPONENTS. E possible edges admit 2^E graphs, and
    the address space is 2^128. So the graph space exceeds the address space exactly when E > 128, and E = n(n −
    1)/2 passes 128 at n = 17 — seventeen leaves. Decided for every tabulated n from 17 upward. A base-2 power
    is monotone in its exponent, so comparing exponents settles the powers; stating 2^(2^63) directly would be a
    number no kernel can check, which is a claim wearing arithmetic rather than doing it. -/
theorem crosslinking_outgrows_the_address_space : ([17,20,32,64,128,256,1024].all (fun n => (n * (n - 1)) / 2 > 128)) ∧ ((16 * 15) / 2 <= 128) := by decide

end Cross_Crosslink_cross_named
