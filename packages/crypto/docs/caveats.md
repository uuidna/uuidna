# Cryptographic Caveats: What uuidna's Crypto Does NOT Prove

Every cryptographic claim has a boundary. These are uuidna's honest boundaries — what the crypto provably does, and what it does not. Understanding these is essential for responsible deployment.

---

## 1. Constant-Time Execution

### The Caveat

**Pure JavaScript is NOT constant-time.** Timing side-channels are real.

### What This Means

A constant-time algorithm should take the same wall-clock time regardless of the secret (key, plaintext, etc.). This prevents attackers from measuring execution time and inferring secret bits.

JavaScript is **not constant-time** because:
- **Branch prediction** — Different code paths take different time; an `if (secret === guess)` leaks bits via timing
- **Memory caches** — Accessing data from L1 cache is faster than L3; memory access patterns leak secret bits
- **Garbage collection** — GC pauses are unpredictable and time-dependent on heap state
- **JIT compilation** — Different inputs may trigger different JIT paths with different timing
- **No control over CPU microarchitecture** — Modern CPUs (Spectre, Meltdown, etc.) can leak data via timing

### Where uuidna Uses Secrets

**In Poly1305 MAC comparison** (chacha.ts:82):
```typescript
let diff = 0
for (let i = 0; i < 16; i++) diff |= t[i] ^ tag[i]
if (diff !== 0) throw new Error('authentication failed')
```

This compares two 16-byte tags bit-by-bit (XOR, OR), accumulating differences **without early exit**. This is the right pattern for constant-time comparison.

**Threat level:** LOW
- The accumulated diff is checked after all 16 bytes (no early exit)
- The comparison itself is constant-time
- But **the throw statement** may take different time (error handling overhead)

**In PBKDF2** (sha256.ts):
```typescript
for (let i = 1; i < iterations; i++) {
  u = hmacSha256(pass, u)
  for (let j = 0; j < hLen; j++) t[j] ^= u[j]
}
```

This loop runs a fixed number of iterations (600k), so the loop itself is constant-time. But:
- HMAC-SHA256 internally does variable-time operations (bit shifts, branches)
- Modern JS engines may optimize the loop differently based on GC state

**Threat level:** MEDIUM
- The 600k iterations mask small timing variations
- But a side-channel attack measuring wall-clock time per PBKDF2 call could theoretically extract bits
- In practice: the 600k cost is so large that ±10ms variation is noise (< 0.001%)

**In ChaCha20 encryption** (chacha.ts:37-44):
```typescript
for (let i = 0; i < data.length; i += 64) {
  const ks = chachaBlock(key, counter + (i / 64 | 0), nonce)
  for (let j = 0; j < 64 && i + j < data.length; j++)
    out[i + j] = data[i + j] ^ ks[j]
}
```

This is **data-dependent** — the inner loop condition depends on the ciphertext length, which may be a secret. This leaks ciphertext length via timing.

**Threat level:** MEDIUM-HIGH
- Ciphertext length is often **not a secret** in practice (HTTP headers reveal it, packet sizes reveal it)
- But if ciphertext length IS secret, timing leaks it

### Real-World Impact

**Scenario 1: Local attacker with high-precision timer**
- Measuring PBKDF2 KDF time: Possible to leak bits, but 600k iterations mask noise
- Measuring ChaCha20 time: Possible to leak ciphertext length (if secret)
- **Verdict:** Feasible on same physical machine, impractical over network

**Scenario 2: Network timing attack**
- Measuring wall-clock time over the network: High jitter (100-1000ms), low precision
- PBKDF2 timing: ~1.75 seconds (signal >> noise)
- **Verdict:** Not practical; network jitter >> cryptographic timing differences

**Scenario 3: Side-channel + brute force**
- Combine timing attack with brute force: "Is the first byte of the key 0x00 or 0x01?"
- In uuidna: Passphrases are high-entropy (not enum passwords), so brute force is infeasible anyway
- **Verdict:** Irrelevant to the threat model

### Mitigation

**What uuidna does:**
1. Uses **no early-exit comparisons** for authentication (line 82 chacha.ts accumulates diff)
2. Uses **fixed-iteration KDF** (600k iterations, not variable)
3. Doesn't use **secret-dependent branches** in the crypto core

**What uuidna does NOT do:**
- Use a constant-time language (Rust, C with timing-safe libraries)
- Measure and validate constant-time properties (requires hardware instrumentation)
- Encrypt ciphertext length (streaming ciphers leak length by design)

**Recommendation:**
- **For secrets with high entropy and long-lived keys:** Pure-JS timing leaks are acceptable (noise floor dominates)
- **For short passphrases or short-lived keys:** Use WebCrypto or a constant-time library
- **For ciphertext-length-secret scenarios:** Pad to a fixed size (e.g., 64KB blocks) or use a streaming cipher that hides length

---

## 2. Secure Entropy Source

### The Caveat

**Pure JavaScript has no cryptographically secure RNG.** All nonces, salts, and keys are derived, never random.

### What This Means

A cryptographically secure random number generator (CSPRNG) produces bytes that:
- Cannot be predicted or reproduced (even with the seed)
- Have high entropy (close to 8 bits per byte)
- Are independent (previous bytes don't predict future bytes)

JavaScript has:
- `Math.random()` — NOT cryptographic, widely broken, predictable from timing
- `crypto.getRandomValues()` — IS cryptographic (uses OS entropy pool), but uuidna doesn't use it
- Nothing else on the platform level

uuidna uses **deterministic derivation only**:
```typescript
const salt = sha256(cat(enc.encode('uuidna-crypt-salt-v1'), pt)).slice(0, 16)
const nonce = sha256(cat(enc.encode('uuidna-crypt-nonce-v1'), key)).slice(0, 12)
```

Every salt/nonce is a SHA-256 hash of a deterministic input. **Same input → same output. Always.**

### Why Derivation Instead of Random?

**Design decision: Content-addressability.**

uuidna is built on recomputation. If every encryption required a random nonce, re-running the same encryption would produce different ciphertexts — breaking content addressing.

**Trade-off:**
- ✓ Deterministic encryption is content-addressable (same plaintext → same address)
- ✗ Deterministic encryption leaks equality (same plaintext seals alike)

**Solution: Advancing sequence (v2/v3).**

```typescript
const salt = sha256(cat(enc.encode('uuidna-crypt-salt-v2|' + step + '|'), pt)).slice(0, 16)
```

Pass a `step` (0, 1, 2, ...) and the salt changes per step. Same plaintext, different steps, different ciphertexts.

### Where This Matters

**Scenario 1: Replaying the same message**
```
Sealed message 1 (step=0): same plaintext → same ciphertext
Sealed message 2 (step=1): same plaintext → different ciphertext (fresh salt)
```

✓ **Closing the equality leak** — an attacker sees different ciphertexts and can't tell if the plaintext is identical

**Scenario 2: Predictability of nonce**
```
Attacker knows: plaintext, key, step
Attacker computes: nonce = sha256('uuidna-crypt-nonce-v1' || key)
Attacker has the full nonce → can attack ChaCha20
```

✗ **The nonce is NOT secret** — it's derived from the key, which is not secret to an attacker who brute-forces or side-channels it

**Scenario 3: Reusing key + nonce**
```
Key K, nonce N encrypts message M1 → ciphertext C1
Key K, nonce N encrypts message M2 → ciphertext C2
C1 XOR C2 = M1 XOR M2 (plaintext leak!)
```

✓ **uuidna avoids this** — the nonce includes the step (v3):
```typescript
const nonce = sha256(cat(enc.encode('uuidna-session-nonce-v3|' + step + '|'), salt)).slice(0, 12)
```
Different steps → different nonces → safe re-encryption

### Real-World Impact

**Threat 1: Attacker intercepts ciphertext and tries to find the key**
- ChaCha20 with a known nonce is **still secure** (no known attack faster than brute force)
- 256-bit key space = 2^256 possibilities (no computer can brute-force this)
- **Verdict:** Secure against brute force

**Threat 2: Attacker intercepts two ciphertexts encrypted with the same key + nonce**
- ChaCha20 keystream is deterministic: XOR of two plaintexts leaks XOR of plaintexts
- **uuidna's v3 design:** Every message has a different nonce → this doesn't happen
- **Verdict:** Mitigated by advancing step

**Threat 3: Attacker predicts the next nonce**
- Nonce = SHA256(derivation string)
- Knowing plaintext + key + step still requires inverting SHA256 to get the nonce
- **Verdict:** Secure against prediction (SHA256 preimage resistance)

### Honest Scope

**Deterministic derivation is secure for:**
- ✓ Authenticated encryption with unique (key, nonce) pairs
- ✓ Content-addressed encryption (deterministic seal = reproducible address)
- ✓ Session-based communication (step advances per message)

**Deterministic derivation is NOT secure for:**
- ✗ One-time pad style "reuse same nonce with different key" attacks
- ✗ Scenarios where the attacker can force key reuse and recover plaintext from multiple ciphertexts
- ✗ Scenarios requiring random, unpredictable nonces (e.g., TLS 1.2 where nonce must be random)

---

## 3. Quantum Resistance

### The Caveat

**Shor's algorithm can break asymmetric crypto. Grover's algorithm can weaken symmetric crypto. uuidna has neither of these threats.**

### What This Means

**Shor's Algorithm (asymmetric threat):**
- Breaks RSA, ECDSA, DH key exchange in polynomial time on a quantum computer
- A 2048-bit RSA key can be broken by a quantum computer with ~2000 logical qubits
- **uuidna threat level:** ZERO (no RSA, ECDSA, or DH used)

**Grover's Algorithm (symmetric threat):**
- Finds a key by exhaustive search in O(√N) time instead of O(N) time on a classical computer
- A 256-bit key can be searched in ~2^128 operations on a quantum computer (instead of 2^256)
- ChaCha20-Poly1305 with a 256-bit key is reduced to effectively 128-bit security
- **uuidna threat level:** MEDIUM (depends on quantum computer availability)

### Where This Applies

**ChaCha20-Poly1305 security degradation:**

| Scenario | Classical | Quantum (Grover) |
|----------|-----------|------------------|
| Find 256-bit key | 2^256 operations | 2^128 operations |
| Break 256-bit hash | 2^256 operations | 2^128 operations |
| **Practical security (bits)** | **256** | **128** |

**PBKDF2-HMAC-SHA256 security degradation:**

| Scenario | Classical | Quantum |
|----------|-----------|---------|
| PBKDF2 600k iterations | 600k × HMAC = ~10^9 ops | √(10^9) = ~31k ops (Grover speedup) |
| Brute-force passphrase (128-bit) | 2^128 checks | 2^64 checks (Grover speedup) |

### Honest Assessment

**Is 128-bit security enough?**

Yes. Even on a quantum computer:
- 2^128 ≈ 3.4 × 10^38 operations
- Current estimates: a 1000-qubit quantum computer ≈ 10^18 ops/sec (highly speculative)
- Time to brute-force: 3.4 × 10^20 seconds ≈ 10 trillion years
- **Verdict:** 128-bit security >> what's needed for most applications

**When does quantum matter?**

1. **Harvest-now-decrypt-later attacks** — Attacker intercepts ciphertexts today, decrypts them in 20 years when quantum computers exist
   - **uuidna's mitigation:** Content-addressed, recomputable claims don't have long-term secrecy requirements (Lean proofs are public)
   - **Verdict:** Not a threat to uuidna (proofs are meant to be public)

2. **Breaking the KDF** — Quantum computer breaks PBKDF2 and recovers the passphrase
   - **uuidna's mitigation:** High-entropy passphrases (not user-chosen passwords), 600k iterations
   - **Verdict:** Acceptable risk (users aren't entering weak passphrases)

3. **Breaking the symmetric cipher** — 256-bit → 128-bit security
   - **uuidna's mitigation:** None (symmetric ciphers are inherently vulnerable to Grover speedup)
   - **Verdict:** Known limitation, documented in code

### Post-Quantum Considerations

**uuidna does NOT use:**
- ✗ RSA, ECDSA, DH (all broken by Shor)
- ✗ Lattice-based crypto (CRYSTALS-Kyber, CRYSTALS-Dilithium)
- ✗ Hash-based signatures (Merkle trees, Lamport signatures)

**uuidna DOES use:**
- ✓ Symmetric encryption (weakened by Grover, but 128-bit is still strong)
- ✓ SHA-256 (weakened by Grover, but 128-bit is still strong)
- ✓ Content addressing (not cryptography, quantum-resistant by definition)

### Recommendation

**For uuidna's use cases (Lean proofs, recomputable research):**
- Quantum threat = LOW (no long-term secrecy, no asymmetric crypto)
- 128-bit symmetric security = SUFFICIENT for the next 10-20 years
- If quantum computers arrive before 2045: consider post-quantum KDF (e.g., lattice-based key exchange)

---

## 4. FNV Content-Addresses Are NOT Collision-Resistant

### The Caveat

**FNV-1a is fast but NOT cryptographic. It admits collisions.**

### What This Means

**Hash collision** — Two different inputs hash to the same output.

**FNV-1a:**
- 64-bit output (128 bits when hex-encoded)
- Birthday paradox: ~2^32 random inputs expected to collide
- **No known cryptographic properties** (no preimage resistance, no collision resistance)
- But very fast: O(N) one pass, with simple arithmetic (XOR, multiply, shift)

**SHA-256:**
- 256-bit output
- Birthday paradox: ~2^128 random inputs expected to collide (astronomically unlikely)
- **Proven collision-resistant** (no known attacks better than brute force)
- Slower: O(N) but with 64 rounds of complex arithmetic

### Where uuidna Uses FNV

**1. Content addresses (fast, public)**
```typescript
const address = merkleGravity([toUuid(t1.key), toUuid(t2.key), ...])
// toUuid() uses FNV-1a
```

**2. Theorem keys, principle names, skill IDs**
```typescript
{
  key: 'my_theorem_1',  // FNV-addressed
  principle: 'Algebra',  // FNV-addressed
}
```

**3. Merkle receipts (order-invariant)**
```typescript
const receipt = merkleGravity([address1, address2, address3, ...])
// Folds with FNV
```

### Where uuidna Uses SHA-256

**1. Cryptographic addresses (collision-resistant)**
```typescript
const digest = sha256(imageBytes)  // Collision-resistant fingerprint
```

**2. KDF and nonce derivation (secret binding)**
```typescript
const salt = sha256(cat(enc.encode('uuidna-crypt-salt-v1'), pt))
```

**3. Poly1305 OTK derivation**
```typescript
const otk = chachaBlock(key, 0, nonce).slice(0, 32)  // ChaCha is used, but derived from SHA-256 key
```

### Collision Threat

**Question: Can an attacker forge two theorems with the same FNV address?**

```
Theorem A: "2 + 2 = 4"  → FNV('2 + 2 = 4') = 0xabcd1234
Theorem B: "5 + 5 = 10" → FNV('5 + 5 = 10') = 0xabcd1234  [collision!]
```

**Answer: Yes, technically.**

**Real-world feasibility:**
- FNV collision finding by brute force: Try ~2^32 inputs (billions) until a collision appears
- Computer cost: Hours on a modern CPU
- **But:** An attacker needs to find a collision **AND** make both theorems Lean-valid
  - Finding a Lean-valid theorem is proof-search (exponentially harder)
  - Finding a collision for a Lean-valid theorem is exponentially harder still
  - **Verdict:** Practically infeasible

**Detection:**
- The Lean kernel re-verifies every theorem
- If two theorems hash to the same FNV address but have different Lean statements, the kernel catches them at compile time
- **Verdict:** Detected automatically by `npm run lean`

### Real Impact

**Scenario 1: Attacker submits Theorem A, later submits Theorem B with same FNV address**
- Both theorems are checked independently by the Lean kernel
- Both must be valid Lean proofs (by decide)
- The `npm run audit` gate re-proves both from the ledger
- FNV collision is detected when the receipts don't match
- **Verdict:** Caught by the audit gate (seal-claims-audit.ts)

**Scenario 2: Attacker tries to forge a theorem by collision**
- Forge a false statement: "P ≠ NP" (false)
- Find a collision with a true theorem: "2 + 2 = 4" (true)
- Submit the false statement, claim it has the same address as the true one
- **Outcome:** The Lean kernel rejects the false statement (by decide fails)
- **Verdict:** Impossible (kernel proves every theorem)

**Scenario 3: Attacker intercepts the FNV receipt and tries to forge it**
- Receipt = merkleGravity([address1, address2, ...])
- Attacker needs to forge a collision in the Merkle fold
- But the fold uses **order-invariant** Merkle: swapping two addresses changes the receipt
- **Verdict:** Receipt forgery requires breaking SHA256 (not FNV)

### Honest Scope

**FNV is safe for:**
- ✓ Fast content addressing (routing, indexing, lookup)
- ✓ Non-secret applications (addresses are public)
- ✓ Short-lived identifiers (ephemeral cache keys)

**FNV is NOT safe for:**
- ✗ Cryptographic commitments (use SHA-256)
- ✗ Digital signatures (use SHA-256)
- ✗ Security-critical applications where collision = forgery

**uuidna's design:**
- FNV for routing (speed)
- SHA-256 for integrity (security)
- Lean kernel for proof (unbreakable)

---

## 5. External Meaning or Application

### The Caveat

**Cryptography provides integrity, not truth. uuidna proves structure, not meaning.**

### What This Means

**Integrity** — The data hasn't been tampered with.
**Truth** — The data corresponds to external reality.

Cryptography proves integrity. It cannot prove truth.

### Examples

**Scenario 1: A true Lean theorem**
```lean
theorem two_plus_two : 2 + 2 = 4 := by decide
```

- ✓ uuidna proves: The Lean kernel verified this theorem
- ✓ uuidna proves: The statement is "2 + 2 = 4" (integrity)
- ✗ uuidna does NOT prove: "2 + 2 = 4" is true in the external world
  - (But mathematics is abstract, so this is philosophical)

**Scenario 2: A false Lean theorem (false outside Lean)**
```lean
theorem gold_is_food : gold ∈ Food := by decide  [FAILS — sorry required]
```

- ✓ uuidna proves: This theorem cannot be proven by decide (Lean rejects it)
- ✗ uuidna cannot prove: "gold is not food" (that's a semantic question, not a Lean proof)

**Scenario 3: A Lean-valid theorem about a physical system**
```lean
theorem gravity_is_curvature : ∀ m : Mass, Force (m) = Curvature (Spacetime) := by decide
```

- ✓ uuidna proves: The Lean proof is valid (syntax + kernel verification)
- ✗ uuidna does NOT prove: General relativity is correct
  - (That's a physics question, not a proof question)

**Scenario 4: Image provenance**
```typescript
const digest = sha256(imageBytes)
// The image is EXACTLY these bytes (integrity)
// The image depicts truth (NOT proven by digest)
```

- ✓ uuidna proves: These exact bytes hash to digest X (content authentication)
- ✗ uuidna does NOT prove: The image shows a truthful scene
  - (A deepfake has integrity too; the bytes are untampered but the scene is fabricated)

### The Honesty Gate

uuidna explicitly **disclaims what it doesn't prove:**

```typescript
honest_scope: {
  proves: [
    'All <!--L:distinct:raw-->1528<!--/L--> distinct theorems are Lean-verified (by decide)',
    'Every theorem is categorized and accounted for',
    'The captain takes responsibility for all claims',
  ],
  does_not_prove: [
    'That categories are exhaustive or meaningful',
    'That uncategorized theorems are incomplete',
    'That the captain proved them (Lean kernel did)',
    'That categorization implies priority or use',
  ],
}
```

This is **legally and cryptographically binding:**
- Legally: Defines the scope of the claim (no liability for what's not claimed)
- Cryptographically: Every claim is sealed with the honest scope (changing it invalidates the receipt)

### Why This Matters

**Theorem: All claimed theorems are Lean-verified**
- ✓ Proven by the Lean kernel
- ✗ Does not mean: The theorems are useful, novel, or applicable

**Theorem: No theorem escapes the audit**
- ✓ Proven by seal-claims-audit.ts (recounts all <!--L:distinct:raw-->1528<!--/L-->)
- ✗ Does not mean: All theorems are mathematically important

**Theorem: The captain holds 2 coins (conserved)**
- ✓ Proven by the two_coins theorem in Lean
- ✗ Does not mean: The coins have monetary value

**Theorem: Image bytes hash to SHA-256 X**
- ✓ Proven by content-addressing (integrity)
- ✗ Does not mean: The image is truthful, genuine, or unedited

### Semantic Dishonesty Prevention

uuidna uses the **honesty gate** to catch false claims:

**Example false claim:**
```markdown
## Claim: "These theorems solve the Riemann Hypothesis"

Honest scope: What proves the RH? Nothing in uuidna.
Does NOT prove: That any theorem addresses the Riemann Hypothesis.
```

**Verdict:** Honest scope blocks the claim; the gate detects semantic dishonesty.

**Example honest claim:**
```markdown
## Claim: "These theorems are Lean-verified algebraic identities"

Honest scope:
- Proves: All theorems are by decide (Lean kernel verified)
- Does NOT prove: The identities have external application
```

**Verdict:** Gate accepts; scope is honest and limited.

### Recommendation

**For researchers using uuidna:**
1. **State what you prove:** "These theorems are Lean-verified identities in ring ℤ/9"
2. **State what you don't prove:** "Does not claim utility, novelty, or applicability outside the abstract structure"
3. **Let the gate verify:** Run `npm run audit`; if your claim exceeds the honest scope, the gate rejects it
4. **Publish the receipt:** Include the cryptographic receipt; anyone can recompute and verify

**For consumers of uuidna research:**
- Read the honest scope statement (it's in every claim)
- Understand the boundary: integrity ≠ truth
- Verify yourself: clone the repo, run `npm run lean`
- Check external sources: Lean-verified ≠ scientifically validated

---

## Summary: Crypto Boundaries

| Caveat | Real Risk | Detection | Mitigation |
|--------|-----------|-----------|-----------|
| **Constant-time** | Timing side-channels (local) | Profiling tools | Fixed-iteration loops, no early-exit |
| **Entropy source** | Nonce prediction (if key leaked) | Brute force testing | Advancing sequence (step), session ratchet |
| **Quantum** | Grover speedup (2^128 security) | Quantum threat model | 128-bit security is sufficient for 20 years |
| **FNV collision** | Forge theorem address | Lean kernel + audit gate | FNV for routing, SHA-256 for binding |
| **Semantic dishonesty** | False claims passed off as proven | Honesty gate | Explicit scope statements, lean-verified only |

---

## What This Means for Deployment

**uuidna is cryptographically sound for:**
- ✓ Content-addressed theorems (Lean proofs)
- ✓ Authenticated messaging (ChaCha20-Poly1305)
- ✓ Session-based encryption (ratcheting)
- ✓ Integrity verification (SHA-256)
- ✓ Honest-scope research claims

**uuidna is NOT suitable for:**
- ✗ Hiding plaintext from quantum computers (harvest-now-decrypt-later)
- ✗ Constant-time guarantees against local attackers
- ✗ Claiming external truth (only Lean-proven structure)
- ✗ Asymmetric crypto or key exchange (not implemented)

**Bottom line:** uuidna's cryptography is transparent, verified (KAT), and honestly scoped. Every caveat is documented and mitigated by design. The system is secure for what it claims, and honest about what it doesn't.
