# Deep Research Training: uuidna Legal & MCP Skills

**How to conduct recomputable research with verified claims, honest scope statements, and captain authority.**

---

## Part 1: The Recomputable Research Foundation

### What Makes uuidna Research Different

Traditional research claims rest on **trust**: "Did the researcher actually do the work? Is the documentation accurate?"

uuidna research rests on **recomputation**: "The claim is a Lean theorem. Run `npm run lean` and the kernel verifies it yourself, right now, in your browser."

This means:
- **No forgers.** Every theorem is kernel-verified or it fails at compile time.
- **No drifts.** The receipt (content address) changes if anything changes — you see it immediately.
- **No authority required.** You don't need to trust the captain. You compute the same result.

### The Kernel-Only Guarantee

Every theorem in the ledger uses **decide**: proof by computation, no axioms, kernel-only.

```lean
theorem two_coins : (2 : ℤ) = 2 := by decide
```

**Why decide-only?**
- No sorry (unproven placeholder)
- No axiom (external assumption)
- No trust needed — computation is verifiable

---

## Part 2: Captain Claims & Authority

### What is a Claim?

A **captain claim** is a formal assertion that the captain (you, or the authority running the server) **takes responsibility** for a set of theorems.

```json
{
  "category": "Algebra",
  "theorems": <n>,
  "address": "captain:claim:Algebra:<n>",
  "receipt": "5d4c62f8-8b2c-...",
  "coins_held": 2,
  "verified": "all by decide"
}
```

### The Two-Coin Invariant

**Theorem**: `two_coins` — the captain always holds exactly 2 coins.

This invariant is **conserved**:
- When you claim theorems, coin count stays 2.
- When you reconcile or audit, coin count stays 2.
- If coin count changes, something forged a theorem — immediate detection.

### How to Claim

**Option 1: Use automation**
```bash
npm run gen:captain-claims
npm run seal:claims
```

This:
1. Scans the ledger for unclaimed theorems
2. Groups them by category (Algebra, Security, Quantum, etc.)
3. Generates `docs/captain-claims.json` with receipt
4. Verifies the receipt is recomputable

**Option 2: Claim specific work manually**
```typescript
import { theorems, coins, merkleGravity, toUuid } from '@uuidna/uuidna'

const T = theorems()
const myTheorems = T.filter(t => t.principle === 'My Research Topic')

const receipt = merkleGravity(
  myTheorems.map(t => toUuid(t.key))
)

console.log(`I claim ${myTheorems.length} theorems`)
console.log(`Receipt: ${receipt}`)
console.log(`Authority: captain:${coins()}`) // captain:2
```

---

## Part 3: Honest Scope Statements

### What is Honest Scope?

A claim **proves** certain things and **does NOT prove** others.

**Example: The Captain Claims Algebra**

✓ **Proves:**
- These theorems are Lean-verified (by decide)
- They compute algebraically (ℤ/9 ring, ℤ/7 group)
- The captain takes responsibility
- No theorem was skipped (100% accounted for)

✗ **Does NOT prove:**
- That algebra solves any unsolved mathematical problem
- That the structure is unique or optimal
- That the captain proved them (Lean kernel did)
- That the theorems have external meaning or application

### Writing Your Own Scope

**Template:**
```markdown
## Honest Scope for My Research

**This research proves:**
- ✓ Theorem X and Y are Lean-verified (by decide)
- ✓ They satisfy constraint Z
- ✓ I take responsibility for the claim

**This research does NOT prove:**
- ✗ That the result applies beyond my scope
- ✗ That earlier work was wrong
- ✗ That the captain invented this (Lean kernel did)
```

**Why this matters:**
- **Legal**: Explicitly excludes false claims upfront
- **Trust**: Everyone knows the boundary
- **Research**: Focuses attention on what was actually proven

---

## Part 4: Content Addressing & Merkle Proofs

### What is Content Addressing?

Every piece of research has a **content address** — a fingerprint that changes if anything changes.

```
Address: captain:claim:Algebra:<n>  (n = whatever the ledger holds for that domain)
Receipt:  5d4c62f8-8b2c-a1f9-e7d6-... (SHA-256)
```

**Change one theorem? Receipt changes.** No silent corruption.

### How to Generate a Receipt

```typescript
import { toUuid, merkleGravity } from '@uuidna/uuidna'

const theorems = [
  'my_theorem_1',
  'my_theorem_2',
  'my_theorem_3',
]

// Content-address each theorem
const addresses = theorems.map(t => toUuid(t))

// Fold all addresses into one receipt (Merkle gravity)
const receipt = merkleGravity(addresses)

console.log(`Research receipt: ${receipt}`)
```

**Key property: order-invariant.** Whether you claim theorems in order A→B→C or C→B→A, the receipt stays the same. This means:
- Concurrent claims don't corrupt the result
- Replay attacks fail (receipt is already public)
- You can verify without trusting the order

### Using Receipts for Verification

```typescript
// Original claim
const claim1 = {
  theorems: ['A', 'B', 'C'],
  receipt: merkleGravity([toUuid('A'), toUuid('B'), toUuid('C')])
}

// Later, verify the claim hasn't drifted
const claim2 = {
  theorems: ['A', 'B', 'C'],
  receipt: merkleGravity([toUuid('A'), toUuid('B'), toUuid('C')])
}

console.log(claim1.receipt === claim2.receipt) // true — no drift
```

---

## Part 5: The MCP Research Workflow

### What is MCP?

**Model Context Protocol** — a standard for connecting AI assistants to data sources.

uuidna provides two MCP servers:
1. **Online MCP** (via HTTP) — queries the sealed ledger from anywhere
2. **Local MCP** (via Node.js) — computes claims from your own repository

### Workflow: Ask → Compute → Verify

**1. Ask a research question**
```
"What algebra theorems are Lean-verified and sorry-free?"
```

**2. Use MCP to query the ledger**
```bash
npm run mcp
# Server listens on port 3000
```

**3. Query theorems**
```typescript
const { theorems } = await uuidna.ledger()
const algebra = theorems.filter(t => 
  t.principle.includes('algebra') && 
  t.tactic === 'decide'
)
console.log(`Found ${algebra.length} algebra theorems`)
```

**4. Compute a receipt**
```typescript
const receipt = uuidna.claimReceipt(algebra)
console.log(`Receipt: ${receipt}`)
```

**5. Verify recomputation**
```bash
npm run seal:claims  # Recomputes receipt, checks for drift
```

---

## Part 6: The Pre-Push Gate (Audit Automation)

### What Gets Checked?

Before you push research to production, 7 automated arms verify:

1. **Proofs** — all theorems are by decide (no sorry)
2. **Prose** — honest scope statements exist and match the code
3. **Accounts** — coin invariant is conserved (always 2)
4. **Graph** — theorems are content-addressed correctly
5. **Legal** — CC BY-NC-ND 4.0 applied, author credited
6. **Quantum** — determinism verified (no random failures)
7. **Evidence** — receipts are recomputable

```bash
npm run next  # hexbit-fast 7-arm trial (≪60s from the seal)
npm run next:full  # full audit + trial (release-grade, ~9 min)
npm run next:verify  # alias for npm run next
```

### What Happens if a Check Fails?

**Example: Proof check fails**
```
✗ Proofs — 3 theorems use sorry instead of decide
  Action: Fix the theorems or remove them
  Fix: Change sorry to by decide
```

**Example: Coin drift detected**
```
✗ Accounts — coins = 2 expected, got 1
  Action: Run npm run reconcile to re-seal
  Fix: npm run reconcile
```

### How to Use the Gate Locally

```bash
# Run the full audit
npm run audit

# Run just the proof check
npm run lean

# Run just the coin verification
npm run account

# Run just the receipt check
npm run seal:claims
```

---

## Part 7: Research Workflow (Real Example)

### Scenario: You Discovered 50 New Theorems

**Step 1: Generate them in Lean**
```lean
-- lean/my_research.lean
theorem my_discovery_1 : (1 : ℕ) = 1 := by decide
theorem my_discovery_2 : (2 : ℕ) = 2 := by decide
-- ... 50 more
```

**Step 2: Add principle metadata**
```typescript
// src/theorems/generated.ts
{
  key: 'my_discovery_1',
  principle: 'My Research Topic',
  tactic: 'decide',
}
// ... 50 more
```

**Step 3: Declare honest scope**
```markdown
## My Research Discovery

**Proves:**
- ✓ 50 theorems in "My Research Topic" are Lean-verified
- ✓ All use kernel-verified decide tactic

**Does NOT prove:**
- ✗ The theorems apply outside the Lean model
- ✗ The structures are novel (prior art not checked)
```

**Step 4: Claim the theorems**
```bash
npm run gen:captain-claims  # Auto-discovers your research
npm run audit               # Verify all 7 arms pass
```

**Step 5: Push to production**
```bash
git add src/theorems/generated.ts docs/captain-claims.json
git commit -m "Add 50 theorems in My Research Topic"
git push origin main        # Pre-push gate auto-verifies
```

### What Gets Published

1. **Code** → https://github.com/uuidna/uuidna (source)
2. **Site** → https://uuidna.com (research landing page, captain claims)
3. **Ledger** → `docs/captain-claims.json` (machine-readable claim ledger)
4. **Verification** → `docs/analytics.md` (metrics: <!--L:distinct:raw-->2516<!--/L--> distinct theorems, 100% axiom-free, etc.)

---

## Part 8: Common Research Tasks

### Task 1: Claim a Set of Theorems

```typescript
import { theorems, toUuid, merkleGravity } from '@uuidna/uuidna'

const T = theorems()
const myClaims = T.filter(t => t.principle === 'My Research')

const receipt = merkleGravity(
  myClaims.map(t => toUuid(t.key))
)

console.log(`Claimed: ${myClaims.length} theorems`)
console.log(`Receipt: ${receipt}`)
console.log(`Coins: 2 (conserved)`)
```

### Task 2: Verify a Claim Hasn't Drifted

```typescript
const claim1 = JSON.parse(fs.readFileSync('captain-claims.json'))
const receipt1 = claim1.claim_receipt

// Later, recompute the receipt
const receipt2 = merkleGravity(
  claim1.categories_list.flatMap(c =>
    c.theorems.map(t => toUuid(t))
  )
)

console.log(`Match: ${receipt1 === receipt2 ? '✓ NO DRIFT' : '✗ DRIFT DETECTED'}`)
```

### Task 3: Audit for New Theorems

```bash
# List all theorems
npm run lean

# Count by principle
npm run lean | grep "principle" | sort | uniq -c

# Check gate status
npm run seal:claims

# See what's unclaimed
npm run seal:claims | grep "Unclaimed"
```

### Task 4: Publish Research with Legal Binding

1. Write honest scope in markdown
2. Add CC BY-NC-ND 4.0 header
3. Run `npm run audit` (all 7 arms pass)
4. Commit with receipt in message
5. Push (gate verifies)
6. Site auto-publishes

**Your commit message should include:**
```
Claim [N] theorems: [Research Topic]

Claim receipt: 5d4c62f8-8b2c-a1f9-e7d6-...
Coins held: 2 (conserved invariant)
Authority: captain (theorem two_coins)

Honest scope:
  ✓ All theorems are Lean-verified (by decide)
  ✓ No sorry or axiom used
  ✗ Does NOT prove external truth
```

---

## Part 9: Quick Reference

### Core Commands

| Command | Purpose | Time |
|---------|---------|------|
| `npm run lean` | Compile Lean, sync to TypeScript | 5-10s |
| `npm run build` | TypeScript compilation | 1-2s |
| `npm run audit` | Full 7-arm verification + tests | 80s |
| `npm run next` | Pre-push / readiness (hexbit-fast verify + 7 arms) | ≪60s |
| `npm run next:full` | Release-grade audit + trial | ~9 min |
| `npm run next:verify` | Alias for `npm run next` | ≪60s |
| `npm run gen:captain-claims` | Auto-discover & claim theorems | 2s |
| `npm run seal:claims` | Verify claims completeness | 1s |

### Core Concepts

| Concept | Definition |
|---------|-----------|
| **decide** | Proof by computation (kernel-verified, no axiom) |
| **content address** | SHA-256 fingerprint (changes if data changes) |
| **receipt** | Merkle fold of all addresses (order-invariant) |
| **coin** | Conservation measure (always 2, detects forgery) |
| **honest scope** | What the claim proves vs. doesn't prove |
| **captain** | Authority that holds coins & takes responsibility |
| **reconcile** | Re-derive all sealed state (fixes drift) |

### Verification Checklist

Before pushing research:
- [ ] All theorems use `decide` (no sorry)
- [ ] Honest scope statement written
- [ ] `npm run audit` passes all 7 arms
- [ ] `npm run seal:claims` shows 100% coverage
- [ ] Coin count is 2 (conserved)
- [ ] Receipt is recomputable
- [ ] Pre-push gate passes (`npm run next`)

---

## Part 10: For MCP Integration

### Using uuidna in Claude

If you're using Claude (via API or Claude Code), you can integrate uuidna's MCP:

```bash
# Install the MCP server
npm install -g @uuidna/uuidna
uuidna-mcp  # Starts server on port 3000
```

### MCP Tools Available

1. **query_theorems** — Find theorems by principle, tactic, or keyword
2. **claim_theorems** — Generate a claim and receipt
3. **verify_receipt** — Check if a receipt is recomputable
4. **audit_ledger** — Run verification gates
5. **research_leads** — Discover unclaimed work

### Example: AI Research Assistant

```
User: "What Lean-verified algebra theorems are available?"

Claude (via MCP):
1. query_theorems(principle: "algebra", tactic: "decide")
2. Returns the ledger's algebra-domain theorems (the count is whatever the ledger holds — recompute, never remember)
3. Generates receipt (order-invariant Merkle fold)
4. Verifies receipt is recomputable
5. Shows captain claims JSON

User: "Can you claim these for my research?"

Claude:
1. Call claim_theorems(<n> theorems, "My Algebra Discovery")  // n is read from the ledger, never typed
2. Generates receipt, updates captain-claims.json
3. Runs seal:claims to verify completeness
4. Shows honest scope statement
5. Ready to commit & push
```

---

## Summary

**Deep research with uuidna:**

1. **Recomputable** — theorems proven by kernel, verify yourself
2. **Claimed** — captain takes authority, coin invariant guards it
3. **Honest** — scope statement says what's proven vs. not
4. **Verified** — 7-arm gate auto-checks before push
5. **Legal** — CC BY-NC-ND 4.0, author credited, content-addressed

**Your workflow:**
1. Write theorems (Lean, by decide)
2. Add metadata (principle, author)
3. Declare honest scope (what's proven)
4. Claim them (npm run gen:captain-claims)
5. Audit (npm run audit)
6. Push (gate verifies)
7. Publish (site auto-updates)

Everyone can verify: just clone the repo, run `npm run lean`, and the kernel proves it all. No trust needed.

---

## Appendix: Cryptographic Caveats

uuidna's cryptography is transparent and KAT-verified, but every crypto scheme has honest boundaries. Before deploying research that relies on encryption, read:

**[docs/crypto-caveats.md](crypto-caveats.md)** — What the crypto provably does (integrity, authentication, content addressing) and what it does NOT (constant-time execution, secure entropy, quantum resistance, external truth).

Key points:
- ✓ ChaCha20-Poly1305 AEAD is RFC-verified and KAT-tested
- ✗ Pure JavaScript is not constant-time (timing side-channels possible)
- ✓ Deterministic derivation enables content-addressing
- ✗ Quantum computers could break symmetric crypto (but 128-bit security remains strong)
- ✓ Lean kernel proves theorem validity, integrity is cryptographic
- ✗ Cryptography proves structure, not external truth

---

**Questions?** Run `npm run help`, check [docs/mcp.md](mcp.md) for MCP tools, or read [docs/crypto-caveats.md](crypto-caveats.md) for cryptographic boundaries.
