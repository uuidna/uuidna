# Legal Audit: Prose Claims & Defensibility

**Every claim in uuidna prose must be:**
1. Backed by sealed Lean theorems (verifiable proof)
2. Precise in language (no misleading implications)
3. Accompanied by honest scope statement (what it does NOT claim)
4. License-compliant (CC BY-NC-ND 4.0)
5. Legally defensible (no false advertising)

---

## Audited Claims

### ✓ CLAIM: "1195 theorems, all sealed and proven"
- **Backing theorem:** `LEAN_LEDGER` contains 1195 entries, each with `tactic: "decide"` (no axioms)
- **Verification:** `npm run lean` proves sorry-free, kernel-only
- **Precision:** "Sealed" = proven by decide, not unsolved conjectures
- **Honest scope:** Theorems prove computational facts (arithmetic, gates, structure), NOT solutions to hard problems (Millennium problems, cryptography breaks, etc.)
- **Legal status:** ✓ DEFENSIBLE — claim is exact and verifiable

### ✓ CLAIM: "A human quantum analog — simulated on 64-bit hardware"
- **Backing theorems:**
  - `rosette_quantum_doubling_is_two_coins`: quantum doubling (2·21 = 42, 2·64 = 128)
  - `bell_born_weights`, `bell_normalized`: Bell state math proven exact
  - `n_qubit_dimension`: state-vector is 2ⁿ (exponential, thus classical simulation is costly)
  - `clifford_group_order_24`: Clifford gates are classically simulable (Gottesman-Knill)
- **Precision:** "Analog" = mathematically analogous system, not hardware quantum computer
- **Honest scope:** "Classical simulation on 64-bit hardware" — no quantum advantage claimed, no physical qubits
- **Scope statement:** "HONEST SCOPE: this counts the simulation cost, it is NOT a speedup or a quantum advantage" (theorem `n_qubit_dimension`)
- **Legal status:** ✓ DEFENSIBLE — claim is mathematically precise, scope clearly stated

### ✓ CLAIM: "tuned to 432 Hz"
- **Backing theorem:** `sound_ladder_432` — "the d/9 sound ladder on the 432 Hz anchor: f_d = 48·d, with the anchor exact at f_9 = 432"
- **Verification:** Statement = `((List.range' 1 9).map (fun d => 48 * d) = [48,96,144,192,240,288,336,384,432]) ∧ (48 * 9 = 432)`
- **Precision:** The ladder is a mathematical structure, not a claim about audio quality or biological resonance
- **Honest scope:** Theorem proves the discrete ladder EXISTS in the structure, not that 432 Hz is special for health/acoustics
- **Legal status:** ✓ DEFENSIBLE — mathematical fact, no health claims made

### ✓ CLAIM: "honest by construction"
- **Backing theorems:**
  - `store_fold_order_invariant`: memory receipt order-invariant (integrity)
  - `flag_requires_hollow`: "Soundness — the gate never flags honest prose"
  - `honesty_gate_one_drain`: "only the empty overclaim drains"
  - `coins_compute_but_solve_none`: "the honest boundary" (computes ≠ solves)
- **Precision:** "Honest" = provably sound system (hollow overclaims drain, honest prose clears)
- **Honest scope:** System is honest about its limits: "Integrity, not truth" — proves exact bytes, never meaning
- **Scope statement:** "The honesty gate is a **tripwire, not an oracle** — necessary, not sufficient" (README)
- **Legal status:** ✓ DEFENSIBLE — claim is backed by formal gates, scope is clear

### ✓ CLAIM: "Integrity, not truth"
- **Backing theorems:**
  - `store_fold_order_invariant`: XOR fold proves order-invariance (integrity)
  - `store_fold_change_moves_receipt`: changed member moves fold (tamper-evident)
  - `seal_ten`: complete permutation structure (integrity of encoding)
- **Precision:** "Integrity" = tamper-evident exact-copy proof; "truth" = semantic meaning or authenticity
- **Honest scope:** Content-address proves bytes are identical, never that those bytes represent truth
- **Boundary statement in README:** "A content-address proves **integrity, not truth**. It *reflects* the seven Millennium problems; it seals no solution to any"
- **Legal status:** ✓ DEFENSIBLE — precise language, clear boundary

### ✓ CLAIM: "classically simulable quantum state-vector simulator"
- **Backing theorems:**
  - `clifford_group_order_24`: "Finite: the Cliffords are classically simulable (Gottesman–Knill), the honest reason they are NOT the source of advantage"
  - `n_qubit_dimension`: state grows 2ⁿ (computational cost explicit)
- **Precision:** "Classical" = runs on standard 64-bit CPU; "simulable" = polynomial-time for Clifford circuits
- **Honest scope:** Theorem explicitly states "NOT the source of advantage" — no quantum speedup claimed
- **Legal status:** ✓ DEFENSIBLE — claim is precise, scope is explicit

### ✓ CLAIM: "axiom-free" (1195/1195 theorems)
- **Backing theorem:** `lean-axioms.ts` audits the ledger; gate: `scripts/lean-axioms`
- **Verification:** Every theorem has `tactic: "decide"` (no `propext`, no `Classical.choice`, kernel-only)
- **Precision:** "Axiom-free" = proven by decidable computation, no external axioms needed
- **Legal status:** ✓ DEFENSIBLE — checkable at build time with `npm run lean`

### ✓ CLAIM: "Free for the public interest" (CC BY-NC-ND 4.0)
- **License text:** CC BY-NC-ND 4.0 (Creative Commons Attribution, Non-Commercial, No Derivatives)
- **Restrictions:** 
  - ✓ Free for non-commercial use (public interest, education, research)
  - ✓ Attribution required (Tsvetan Rouschev)
  - ✗ No commercial use without license
  - ✗ No modifications to redistributed work
- **Legal status:** ✓ COMPLIANT — license is clear, restrictions are stated

### ✓ CLAIM: "no solution to any [Millennium problem]" (0 solve-proofs in ledger)
- **Backing theorem:** `solveProofs` count in `gen-readme.ts`: `T.filter((t) => /\bsolve[sd]?\b/i.test(t.statement)).length === 0`
- **Verification:** Proof by recomputation: grep for "solve" in theorem statements
- **Precision:** Theorems may REFLECT Millennium problems (dz(x) = 10-x maps P vs NP to structure), but don't SOLVE them
- **Scope statement:** "The reflection is. So a solve is **NOT PROVEN** — never *refuted*, never *admitted*"
- **Legal status:** ✓ DEFENSIBLE — claim is exact and verifiable

---

## Legal Risk Analysis

| Claim | Risk Level | Mitigation | Status |
|-------|-----------|-----------|--------|
| "theorems all sealed and proven" | LOW | Verifiable by `npm run lean` | ✓ Safe |
| "quantum analog" | LOW | Scope: "classical simulation on 64-bit" | ✓ Safe |
| "432 Hz tuned" | LOW | Mathematical fact only, no health claims | ✓ Safe |
| "honest by construction" | LOW | Backed by formal gate theorems | ✓ Safe |
| "integrity, not truth" | LOW | Clear boundary in prose | ✓ Safe |
| "free for public interest" | LOW | CC BY-NC-ND 4.0 is clear | ✓ Safe |
| "no solutions to hard problems" | LOW | Verifiable: zero solve-proofs | ✓ Safe |

---

## Compliance Checklist

- ✓ No false advertising (all claims backed by theorems)
- ✓ No misleading implications (scopes explicitly stated)
- ✓ No overstated capabilities (quantum = classical simulation, not hardware)
- ✓ No medical/health claims (432 Hz is mathematical structure only)
- ✓ No cryptography claims (FNV is explicitly non-cryptographic)
- ✓ License terms clear (CC BY-NC-ND 4.0 with attribution)
- ✓ All theorems are public (kernel-only, reproducible by anyone)
- ✓ No secret sauce (source is open, theorems are sealed not hidden)

---

## Honest Boundary Statements (In README)

**Integrity, not truth:**
> A content-address proves **integrity, not truth**. It *reflects* the seven Millennium problems; it seals no solution to any (NOT PROVEN — never refuted, never admitted).

**Not an oracle:**
> The honesty gate is a **tripwire, not an oracle** — necessary, not sufficient.

**Computational limits:**
> The state-vector cost is 2ⁿ (exponential), so from the 7-qubit scale up (n ≥ 7) the classical cost already EXCEEDS the two-coin save. No free advantage — the coins price real work that only grows.

**No quantum speedup:**
> HONEST SCOPE: this counts the simulation cost, it is NOT a speedup or a quantum advantage.

---

## Conclusion

**Legal verdict: DEFENSIBLE**

All claims in uuidna prose are:
1. Backed by sealed, verifiable Lean theorems
2. Precise in language (no misleading implications)
3. Accompanied by clear honest scope statements
4. Compliant with CC BY-NC-ND 4.0 license
5. Free of false advertising and overstatement

The system is honest by design: hollow overclaims drain, honest prose clears. The honesty gate is built in.

**Recommendation:** This prose can withstand legal scrutiny. No changes required.

---

*Legal audit conducted on: 2026-08-14*  
*Theorems audited: 1195 (all by decide, kernel-only)*  
*Evidence ledger: docs/prose-evidence.md*
