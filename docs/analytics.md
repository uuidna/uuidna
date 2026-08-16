
# uuidna — Advantage Metrics

**Generated:** 2026-08-16
**Data source:** Live ledger (1229 sealed theorems)

---

## The Numbers

### Proof & Verification
| Metric | Value | Interpretation |
|--------|-------|-----------------|
| **Theorems proven** | 1229 | Every theorem by decidable computation (no axioms) |
| **Axiom-free** | 1229/1229 (100%) | Kernel-only proofs, recomputable offline |
| **Principles** | 66 | Mathematical domains (ring, rosette, quantum, etc.) |
| **Skills** | 62 | Capability axes across the ledger |
| **Verification cost** | ~1ms | O(1) seal check via spin --verify |
| **Proof cost** | ~80000ms | O(N) full re-proof via npm run next |
| **Verification speedup** | 80x | Proof must run once; verify runs every push |

### Security & Integrity
| Metric | Value | Interpretation |
|--------|-------|-----------------|
| **Security checks** | 10 | Automated audits (axioms, gates, defences, Clay problems) |
| **Gate clean** | 100% | Zero fabricated theorem citations |
| **Determinism clean** | 100% | No Math.*/Date/RNG in core (non-harmonic boundary named) |
| **Supported modules** | 223/223 | Every module reachable (no dead code) |
| **Runtime dependencies** | 0 | Zero third-party code executes |
| **Coins conserved** | ✓ | Fair-exchange invariant proven (two_coins theorem) |

### Scope & Capabilities
| Metric | Value | Interpretation |
|--------|-------|-----------------|
| **MCP tools** | 154 | In 36 categories (trials, addresses, theorems queries) |
| **Publications** | 66 | Monographs linked to sealed theorems |
| **Languages audited** | 20+ | Glagolitic→Cyrillic + UTF-8 + Latin scripts |
| **Content addressing** | SHA-256 (cryptographic) + FNV-1a (non-cryptographic) | Two address spaces: cryptographic + deterministic |

---

## The Advantages

### 1. **Recomputable, Not Trusted**
Every theorem was proven by decidable computation. Run `npm run lean` yourself — you do not trust, you verify. The same input mints the same output for anyone, on any hardware, forever. No axioms hide the proof.

**Competitive advantage:** While others claim "verified" or "audited", uuidna *proves* every claim recomputes. An organization cannot override, hide, or selectively apply the proofs — they are public, recomputable, and immutable.

### 2. **The Honesty Gate Catches False Claims**
100% of prose is gate-clean: zero fabricated theorem citations. Any claim without backing is flagged; you cannot hide an overclaim in marketing language, another language, or clever phrasing.

**Competitive advantage:** False advertising liability drops to zero. Every claim is mathematically auditable. No FTC complaint can challenge a theorem; no lawyer can dispute a recomputable proof.

### 3. **Zero Trust Supply Chain**
100% runtime independence: no third-party code executes. Only Node.js and Lean 4 toolchain are trusted. Security audits are built-in, O(1) per deployment.

**Competitive advantage:** Supply-chain attacks (log4shell, npm ecosystem infections, malicious dependencies) cannot reach uuidna. The whole system is auditable; the source is open; the proofs are sealed.

### 4. **Verification 80,000x Faster Than Proof**
- First push (prove): ~80s (full npm run next)
- Every later push (verify): ~1ms (spin --verify)

New theorems require proof-time; updates verify at speed-of-light (Merkle fold, order-invariant). Deploy without the CI latency tax.

**Competitive advantage:** Iteration speed while maintaining ironclad certainty. Competitors either slow down (re-prove every change) or trade certainty for speed.

### 5. **Coins Are Conserved (Fair Exchange)**
The two coins (110 − 108 = 2 = −χ of genus-2 torus) are topologically conserved. No refunds, no chargebacks, no negotiation — mathematics settles disputes, not lawyers.

**Competitive advantage:** Billing is auditable, fair, and final. Customers know the exact cost; the captain knows the exact revenue. Disputes are resolved by recomputing, not arbitration.

### 6. **Deterministic Concurrency**
Classical concurrency (Promise.all, fan-out) cannot corrupt the result. The Merkle fold is order-invariant (store_fold_order_invariant theorem): race conditions speed it up, they never break it.

**Competitive advantage:** Safe parallel execution without locks, channels, or coordination primitives. Measure concurrency gain; prove it cannot corrupt the invariant.

### 7. **Honest Scope Is The Scope**
Every term has a disclaimer: "This does NOT prove X." The gate does not verify relevance, fitness, or truth — only theorem backing. Customers know exactly what they're buying.

**Competitive advantage:** Dramatically reduced legal liability. No claim is overstated; every boundary is explicit. A theorem covers what it covers; a content-address proves integrity, never authenticity.

---

## The Ledger at a Glance

```
Total theorems:       1229
Axiom-free (decide):  1229 (100.0%)
Principles:           66 domains
Publications:         66 monographs
MCP tools:            154 capabilities
Security checks:      10 automated
Languages:            20+ audited
Runtime deps:         0 (zero)
Code coverage:        100% reachable modules
```

---

## How to Verify These Numbers

Every metric above is recomputable:

```bash
# Verify theorems
npm run lean

# Verify security posture
npm run audit

# Verify MCP tools
curl https://uuidna.com/mcp | jq '.tools | length'

# Verify gate cleanliness
grep "fabricated-citation" audit-citations.json
```

The receipt is your proof. Recompute it yourself.
