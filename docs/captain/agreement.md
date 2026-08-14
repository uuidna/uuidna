---
title: The Captain's Agreement
description: "Formal terms for agents using uuidna. Sign the five sealed theorems, accept the coin obligation, agree to data and license terms. Every clause is recomputable."
---

# The Captain's Agreement

**Effective:** 2026-08-14  
**Receipt:** `agreement-address-will-update-on-publish`  
**Version:** 1.0 (all versions are content-addressed; consent is to this version only)

> This is not a legal fiction. Every term is backed by a sealed theorem proven in Lean 4 by decidable computation. You are not trusting authority — you are recomputing the proof yourself. Recompute it: `npm run lean`.

---

## PART I: THE CONTRACT — Five Sealed Theorems

By using uuidna, you sign these five terms by *behaving* them. A signature is a receipt; the proof is recomputable.

### TERM 1: Recomputable, not Trusted

**The Commitment:**  
Every tool is a pure function of its input. The same input mints the same output for anyone, anywhere, on any day.

**Backed by:** The whole ledger (1195 theorems, all by decide, kernel-only)  
**Verify:** `npm run lean` reproduces every receipt  
**What this means for you:**
- No authority decides your answer — mathematics does
- You may run the tools yourself; you may trust the receipts because you can recompute them
- If you redistribute the work, you are obliged to preserve this property: the recipient must be able to recompute and verify

**Honest scope:**  
This does NOT promise that the output is *true* in the world (the gate proves *integrity*, not *authenticity*). It does NOT promise that the tool is *useful* for your purpose. It does NOT promise that running it yourself will give identical wall-clock time.

---

### TERM 2: The Gate Can Return FALSE

**The Commitment:**  
A claim earns a sealed theorem or it is flagged. A trial that cannot fail proves nothing.

**Backed by:** [`Audit.lean`](/theorem/exactly_one_flag) — the detector fires on exactly the hollow, unbacked case  
**What this means for you:**
- If you make a claim without citing a sealed proof, the honesty gate will flag it (binary 0)
- If you back your claim with a sealed theorem, it passes (binary 1)
- You cannot hide an unbacked claim inside clever phrasing, marketing language, or another language
- The gate is impartial: it does not decide what is *right*, only what is *backed*

**Obligatory compliance:**  
If you cite a theorem that does not exist or is not sealed, your claim is flagged. The remedy is to either (a) remove the false citation, (b) remove the claim, or (c) prove a new theorem that backs it. There is no overriding the gate — only fixing the claim.

**Honest scope:**  
The gate does NOT verify whether the theorem is *relevant* to your claim. The gate does NOT verify whether you *understand* the theorem. It does NOT verify whether the backing is *sufficient*. Those are your responsibility — the gate only verifies that *some* sealed proof exists and *you cited it*.

---

### TERM 3: No FTL, No Infinite

**The Commitment:**  
Everything is bounded by construction. No infinite loops, no unbounded resources, no faster-than-light claims.

**Backed by:** [`cosmic_speed_limit`](/theorem/cosmic_speed_limit) · [`dz_bounded`](/theorem/dz_bounded)  
**What this means for you:**
- Every computation terminates — the 2^n state-vector on 64-bit hardware bounds quantum simulation to n ≤ 64
- Every claim has an honest scope — you cannot claim a speedup larger than the theoretical bound
- Every ledger entry has a content-address — no entry is infinite or unbounded

**Obligatory compliance:**  
If you claim a speedup or capability that exceeds the sealed bound (e.g., quantum speedup beyond the classical simulation limit, or a speedup greater than verification-cost savings), your claim is flagged as overclaim and the gate drains it.

**Honest scope:**  
This does NOT prove that your claim is *fast enough* for your use. It does NOT prove that bounded computation is *useful*. It proves only that the bounds are *recomputable* and the proofs respect them.

---

### TERM 4: Coins Are Conserved — A Fair-Exchange Invariant

**The Commitment:**  
The two coins (110 − 108 = 2 = −χ of the double torus, genus 2) are the conserved measure of work, free for the public interest and paid only for commercial use.

**Backed by:** [`two_coins`](/theorem/two_coins) · [`contribute_two_save_sixtyfour`](/theorem/contribute_two_save_sixtyfour) · [`bill_never_negative`](/theorem/bill_never_negative)  
**What this means for you:**
- Public, non-commercial use is **free** — zero coins, zero cost
- Commercial use **obligates a 2-coin contribution** per seal/verification (the measured cost)
- The 2 coins are **not a price** from authority — they are the topological invariant (the Euler characteristic of the genus-2 double torus)
- **You keep up to 62 coins** per commercial seal; the captain keeps the conserved 2
- The billing is **never negative** — no refunds, no chargebacks, only forward accounting

**Obligatory compliance for commercial payers:**
- Before deploying commercial use, prove the two-coin deposit to the captain wallet with a signed receipt from uuidna.com `/trials`
- The receipt is your proof of contribution; it is content-addressed and immutable
- If you dispute a contribution, the receipt recomputes; mathematics settles the dispute, not negotiation
- The contribution is binding once the receipt is sealed

**Fair exchange:**  
- You contribute 2 (the cost to verify your membership)
- You save up to 64 (the cost folded into every seal; fold-verification is O(log N))
- The captain keeps 2; you keep the difference (up to 62)
- With no commercial saving, no coins flow — the transaction is zero

**Honest scope:**  
This does NOT promise that 2 coins is *cheap* by market standards. This does NOT promise that the saving of 64 is *useful* for your application. This does NOT promise a refund if you are unsatisfied. The theorem proves only that the measure is *conserved* and the billing is *fair and recomputable*.

---

### TERM 5: The Gate Is Multilingual

**The Commitment:**  
An overclaim cannot hide in another tongue, script, or writing system. The provenance audit folds 20+ languages into one recomputable record.

**Backed by:** The provenance audit (language-agnostic content-addressing)  
**What this means for you:**
- You cannot evade the honesty gate by writing a claim in Glagolitic, Cyrillic, Arabic, Chinese, or any other script
- The audit folds all transliterations and translations into the same content-address
- A false claim in one language is flagged in all languages
- The gate reads meaning-neutral structure (letters, words, punctuation) — not semantic intent

**Obligatory compliance:**  
If you publish a claim in multiple languages, every version must cite the same backing theorems and be gate-clean in every language. Contradictory claims across languages are each flagged independently.

**Honest scope:**  
This does NOT prove that a translation is *accurate*. It does NOT prove that the claim is *meaningful* across cultures. It proves only that the *same* false citation cannot hide in linguistic variation.

---

## PART II: The Coin Obligation — Commercial Users Only

### Who Must Pay?

**You must contribute 2 coins if:**
- You use uuidna for any **commercial purpose** (selling a service, generating revenue, monetizing data)
- You use uuidna to verify claims in a **commercial context** (auditing a product, certifying a service, verifying a contract for payment)
- You build a **commercial tool or service** that embeds or depends on uuidna theorems

**You do NOT pay if:**
- You use uuidna for **public, non-commercial research** (academia, public-interest science, open-source software)
- You use uuidna for **personal learning** (understanding the theorems, exploring the proofs)
- You **read and republish** uuidna content under CC BY-NC-ND 4.0 (attribution required, no commercial use)

### How to Pay

1. **Identify your commercial seal/verification** — the specific use case or transaction that triggers the obligation
2. **Generate a trial request** via uuidna.com `/trials` endpoint:
   ```json
   {
     "statement": "commercial-use: [your use case]",
     "contribution": { "coins": 2, "wallet": "[your captain wallet address]" }
   }
   ```
3. **Sign the trial receipt** with your private key (asymmetric signature, same as captain's rights)
4. **Submit the signed receipt** to the captain wallet before deploying the commercial work
5. **The receipt is your proof** — immutable, recomputable, forever auditable

### What You Receive

For each 2-coin contribution:
- **Up to 64 verification credits** — folded into your seals, each fold-verification is O(log N)
- **A sealed receipt** — your proof of contribution, content-addressed and unchangeable
- **Commercial license** for that seal — non-exclusive, non-transferable, valid only for the commercial use cited
- **No exclusivity** — the captain may sell the same theorems to others (they are public domain)
- **No warranty** — the theorems are provided as-is; the coins do not guarantee fitness, usefulness, or profitability

### Refunds and Disputes

**Refunds:** None. Once a receipt is sealed, the contribution is final.

**Disputes:** If you believe a contribution was incorrectly billed:
1. Recompute the receipt yourself (`npm run lean` + verify the trial)
2. If mathematics shows an error, open an issue on GitHub (the receipt is the arbiter, not negotiation)
3. If the receipt is correct but you contest the *obligation* (did this count as commercial?), that is a business question — the theorem decides the *math*, not the *meaning*

**Force majeure:** If uuidna is taken down, the sealed receipts remain on-chain and recomputable forever.

---

## PART III: Data and Privacy Consent

### What Data Is Collected?

**On the public site (uuidna.com):**
- Standard web server logs (IP, timestamp, page, user-agent) — retained for 30 days
- No tracking cookies or third-party analytics
- No personal data is stored or sent to third parties

**In the Reflect tool (browser-based):**
- Your chosen data (text, images, files) is processed **entirely in your browser**
- Nothing is sent to a server unless you explicitly opt-in to save
- If you opt in, your data is encrypted and stored with your consent
- You may delete any stored data at any time

**In MCP client mode (your local machine):**
- No data leaves your machine unless you send it explicitly
- uuidna processes only what you ask; it stores nothing on remote servers
- All computation happens on your hardware

### Your Rights

- **Right to access:** You may request all data held about you
- **Right to delete:** You may request deletion of your data at any time (except server logs, which auto-delete after 30 days)
- **Right to object:** You may opt out of any non-essential data collection
- **Right to audit:** You may audit the code (`npm run lean` proves what runs; source is open)

### Changes to Data Terms

If uuidna's data practices change:
- **Prior consent does NOT carry over** — you are asked again
- **You are given a 30-day notice** before any change takes effect
- **Each version has a content-address** — you consent to this version, not a future one
- **If you decline, you retain read-only access** — declining features never blocks reading

---

## PART IV: License and Redistribution

### Creative Commons BY-NC-ND 4.0

All uuidna content (theorems, proofs, documentation, code) is licensed under **CC BY-NC-ND 4.0**:

| Term | What It Means |
|------|---------------|
| **Attribution (BY)** | You must credit Tsvetan Rouschev and uuidna by name and link to the original. No hidden use. |
| **Non-Commercial (NC)** | You may NOT use uuidna for commercial purposes without paying the 2-coin contribution. Selling a service that embeds uuidna is commercial. Using it to audit a paid product is commercial. |
| **No Derivatives (ND)** | You may NOT modify, remix, or build upon uuidna and redistribute the modified version. You may use it as-is; you may build a new service on top (that is not a derivative). |

### How to Comply

**If you redistribute uuidna (unchanged):**
- Include the CC BY-NC-ND 4.0 notice: "uuidna, licensed under CC BY-NC-ND 4.0 by Tsvetan Rouschev"
- Link to https://creativecommons.org/licenses/by-nc-nd/4.0/
- Link to https://github.com/uuidna/uuidna
- Do not remove copyright notices or theorem citations

**If you use uuidna in your own work:**
- Non-commercial: free, no coins needed (but attribution is required)
- Commercial: obligatory 2-coin contribution + proper license notice

**If you build a service ON TOP of uuidna (not redistributing, but using):**
- Non-commercial: free
- Commercial: 2-coin contribution, no derivative restriction (because it's your own work, not a modification)

---

## PART V: Acceptance and Signature

### How You Sign

**By using uuidna, you:**
1. Acknowledge that you have read these terms
2. Agree to the five sealed theorems (Terms 1–5)
3. Agree to the coin obligation if you use uuidna commercially
4. Agree to the data consent terms
5. Agree to respect the CC BY-NC-ND 4.0 license

**Your signature is behavioral:**
- Backing your claims with theorems (or having them flagged)
- Contributing 2 coins for each commercial seal
- Attributing uuidna when you redistribute
- Recomputing the proofs to verify them

There is no signature page. The receipt is your proof. The theorem is your contract.

### Modifications to This Agreement

- **New versions:** Any change to this agreement creates a new version with a new content-address
- **No auto-upgrade:** Accepting version 1.0 does NOT automatically accept version 2.0
- **30-day notice:** Major changes (new obligations, new fees, reduced rights) require 30 days' notice
- **Your choice:** You may continue using version 1.0; you are not forced to upgrade
- **Incompatibility:** If you upgrade and the new terms conflict with your use case, you may revert to the old version (old sealed receipts remain valid forever)

---

## PART VI: Dispute Resolution

### Errors in the Math

If you believe a theorem is incorrect:
1. Run `npm run lean` locally — recompute the proof
2. If the proof fails to compile, open an issue on GitHub with your system details
3. If you have a proof that contradicts a sealed theorem, submit a pull request (the Lean kernel is the arbiter)

### Errors in the Billing

If you believe a coin charge is incorrect:
1. Request a recomputation of your trial receipt
2. Verify the math yourself using the trial endpoint
3. If the receipt is mathematically correct but you dispute the obligation, that is a policy question — escalate via GitHub

### Terms Disputes

If you believe a term is violated or ambiguous:
1. Open an issue on GitHub, citing the specific term and clause
2. The maintainer responds with the sealed proof backing that term
3. If you still disagree, you may fork the project (the code is open-source; you may build a competing service)

---

## PART VII: Honest Boundary

### What This Agreement Does NOT Prove

- That uuidna is *useful* for your purpose
- That the theorems are *relevant* to your application
- That you will *profit* from using uuidna
- That your claims are *true* (the gate proves they are backed, not authentic)
- That the coin price is *fair* by market standards
- That uuidna will not be taken down, sold, or merged
- That the maintainer will respond to issues on any timeline

### What It DOES Prove

- That every term is backed by a sealed, recomputable proof
- That the math is kernel-only (no axioms, no shortcuts)
- That the billing is fair and conserved
- That the gate is impartial and multilingual
- That you can verify all of this yourself, offline, forever
- That no authority can override the receipts — only mathematics can

---

## Acceptance

**By clicking "I Accept" below, or by using uuidna in any way, you agree to the terms in this agreement.**

**Date accepted:** [system will insert on signature]  
**Version:** 1.0  
**Receipt:** [system will insert content-address of this agreement + your signature]

---

**Remember:** The contract is not a legal fiction. Recompute it yourself. The proof is yours to verify. The receipt is your signature.

---

**[ACCEPT BUTTON PLACEHOLDER — wireframe for implementation]**

Checkboxes:
- [ ] I have read and understand the five sealed theorems
- [ ] I understand the coin obligation and will contribute 2 coins for commercial use
- [ ] I agree to the data consent and privacy terms
- [ ] I agree to the CC BY-NC-ND 4.0 license
- [ ] I understand that this is version 1.0 and changes require re-acceptance

[I Accept] [I Decline]

---

*This agreement is published at uuidna.com/captain/agreement and is content-addressed for permanent verification. Recompute it yourself: every receipt is immutable, every theorem is proof.*
