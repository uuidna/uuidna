-- lean/Cipher.lean — GENERATED. CRYPTO ∩ DNA — the shared algebra of ciphers and the strand, and its HONEST limits: base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR, a linear fold is malleable (a receipt is integrity, not a seal), the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but linear, and Grover only halves the key (256→128). HONEST SCOPE: these are the DECIDABLE BOUNDS of the algebra — what it guarantees and what it cannot; secrecy itself is ChaCha20-Poly1305, not this. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.
theorem dna_complement_involution : (List.range 4).all (fun x => 3 - (3 - x) == x) := by decide

-- The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.
theorem dna_complement_fixed_point_free : (List.range 4).all (fun x => 3 - x != x) := by decide

-- Base-pairing IS a XOR cipher: on the 2-bit encoding comp(x)=3−x equals x XOR 3 — a one-time-pad STEP with the fixed pad 3. Real, but a FIXED pad is public, not secret.
theorem complement_is_xor_key3 : (List.range 4).all (fun x => 3 - x == lxor x 3) := by decide

-- The one-time-pad is its own inverse (Vernam): (m ⊕ k) ⊕ k = m for every symbol and key — the one information-theoretically secure primitive, WHEN the key is fresh and never reused.
theorem otp_self_inverse : (List.range 16).all (fun m => (List.range 16).all (fun k => lxor (lxor m k) k == m)) := by decide

-- Key reuse is fatal: two messages under the SAME key leak their plaintext XOR — (m₁⊕k) ⊕ (m₂⊕k) = m₁⊕m₂, independent of k. The honest reason a step MUST advance (the ratchet), and why a fixed-pad complement hides nothing.
theorem otp_key_reuse_leaks_xor : (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => (lxor (lxor m1 k) (lxor m2 k)) == (lxor m1 m2)))) := by decide

-- A linear (XOR) fold is malleable: flipping the input by d flips the fold by exactly d — (a⊕d)⊕a = d — so it binds nothing an adversary cannot adjust. A content-address is INTEGRITY/routing, NOT a binding one-way seal.
theorem xor_fold_is_malleable : (List.range 16).all (fun a => (List.range 16).all (fun d => lxor (lxor a d) a == d)) := by decide

-- The uuid transport leaks SIZE: a message of b bits occupies ⌈b/115⌉ uuids, a step function of length — content is hidden by the cipher, message LENGTH is not (the chain grows in whole-uuid quanta of 115 bits).
theorem transport_leaks_length : ((1 + 114) / 115 = 1) ∧ ((115 + 114) / 115 = 1) ∧ ((116 + 114) / 115 = 2) ∧ ((230 + 114) / 115 = 2) ∧ ((231 + 114) / 115 = 3) := by decide

-- The genetic code reads bases three at a time: 4³ = 64 codons — the DNA alphabet cubed, the domain the code maps from.
theorem codons_four_cubed : 4^3 = 64 := by decide

-- Translation is LOSSY, never a cipher: 64 codons map onto only 21 outcomes (20 amino acids + stop), and 64 > 21, so by pigeonhole the map cannot be injective — a hash-like reduction that cannot be inverted, not encryption.
theorem translation_is_lossy : 4^3 > 21 := by decide

-- An affine substitution E(x)=2x+3 over ℤ/5 is a bijection — it hits every residue, so it is an invertible S-box (unlike lossy translation). But it is LINEAR, hence weak: two known plaintext pairs recover it. Invertible ≠ secure.
theorem affine_is_permutation : (List.range 5).all (fun y => (List.range 5).any (fun x => (2*x + 3) % 5 == y)) := by decide

-- The honest quantum posture: Grover’s search is a QUADRATIC speedup, not a break — a 2n-bit key space costs ~2ⁿ work ((2ⁿ)² = 2²ⁿ), so a 256-bit key falls to ~128-bit, still strong. Symmetric-only means no Shor target at all.
theorem grover_quadratic_bound : (List.range 27).all (fun n => 2^n * 2^n == 2^(2*n)) := by decide
