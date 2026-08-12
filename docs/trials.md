---
title: Trials
description: How the uuidna trial works — every theorem folded order-invariant to one recomputable receipt, and ONE answer for any statement, VERIFIED or UNVERIFIED, all else void. uuidna verifies; it never refutes. It can fail (a note that cites a proof not in the ledger), and a receipt recomputes the rest.
aside: false
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

# Trials <Badge type="tip" :text="`${data.total} theorems`" />

> A claim is not trusted, it is tried — and the verdict recomputes.

A **trial** is a recomputable verdict. It does not ask you to believe anything; it hands back a result anyone can
recheck. Run one for a single statement with `uuidna_trial`, or fold the whole ledger through it — below.

## The live receipt

Every theorem's content-address, folded **order-invariant** to **one** recomputable receipt. Change one theorem — or
one bit of one proof — and the receipt moves. Recompute it yourself from this same tree with `npm run lean`.

<p class="rcpt-big"><Handle :uuid="data.trial.receipt" /></p>

<FoldAnimation :receipt="data.trial.receipt" />

| field | value |
| --- | --- |
| theorems folded | {{ data.trial.count }} |
| verified (proven in Lean) | {{ data.trial.verified }} |
| lean-backed | {{ data.trial.leanBacked }} |
| order-invariant | {{ data.trial.orderInvariant ? 'yes — any pairing folds to the same root' : 'no' }} |
| sequential chain tip | <code>{{ data.trial.chainTip }}</code> |

The fold folds every direction at once — forward, reverse, any pairing — and lands on the same root: that is the
order-invariance the animation shows. The **chain tip** is the other reading: the same addresses folded *sequentially*,
each link's receipt seeding the next (the referer ratchet). Two honest views of the same sealed set.

## The one answer — VERIFIED or UNVERIFIED, all else void

A trial on a single statement returns **one** answer, and only one of **two** — as a function of the statement, not an opinion:

| verdict | when | meaning |
| --- | --- | --- |
| **VERIFIED** | a decidable test recomputes true, **or** it cites a sealed Lean theorem | a `by decide` proof backs it — settled, recomputable by anyone |
| **UNVERIFIED** | everything else | no test, no sealed citation, a failed test, or a citation to a proof that is **not** in the ledger — which verifies nothing. **Not "false"** — just not verified |

**uuidna verifies; it never refutes.** Calling a claim *false* is an overclaim it cannot decide — absence of proof is
not proof of falsity — so there is no third verdict. The receipt is a content-address, so two people running the same
trial on the same statement get the same answer.

## The charter — what the trial does and does not judge

A public trial carries credibility only if its stance is stated plainly. This is the whole of it, drawn from the two
answers above — no more, no less:

- **The claim is on trial, never the person, never the idea's worth.** A trial judges *integrity* — does a statement
  earn what it asserts — not merit, taste, or who wrote it. There is no verdict for "unwelcome" and none for "brilliant".
- **Every idea is heard, and none is called false.** Any statement can be tried. An idea without a proof is
  **UNVERIFIED** — held open, never dismissed, never labelled false — and it leaves with an ordered `develop` plan:
  name the finite structure, write the boolean predicate, supply it. An idea is *not* left at "UNVERIFIED, good luck".
- **The only distinction is a proof.** **VERIFIED** happens only when a recomputable test holds or a sealed theorem
  backs it. Respect for an idea is not agreement with it: the trial reports whether a proof stands, not whether the
  reader likes it.
- **Nothing is refused — one thing is not shipped.** The trial refuses no idea. The *publish* gate does refuse one
  thing: shipping a note that cites a proof which does not exist in the ledger (a fabricated citation). That is a
  quality check on the making, not a verdict that the idea is false — the remedy is *"seal that theorem, or drop the
  citation and bring a test"*.
- **Public and equal.** Every answer is content-addressed and recomputable by anyone, and the fold is order-invariant:
  the same receipt for every observer, whatever order they read in. No private verdict, no privileged reader.

**The honest limit — credibility *is* responsibility.** "Every idea heard" is not "every claim verified". Leaving an
unbacked claim UNVERIFIED is not judging the idea — it is holding the *claim* to what it earns; drop that and a VERIFIED
would mean nothing. The trial expects nothing of an idea except that it not claim a proof it does not have.

## It can fail

The trial is **not rigged to pass**. The publish gate exits non-zero when a note cites a proof that is not in the
ledger — the opposite of a rubber stamp. A build that ships a fabricated citation **fails the audit**. That a trial
*can* fail is what makes a VERIFIED mean anything.

## It hardens in real life

The gate is not frozen. Every real near-miss sharpens it: a false "pass" becomes a new rule; a false "fail" (a
citation mistaken for a claim, a debunk mistaken for the thing it debunks) becomes a new demarcation — fixed at the
root, not patched at the surface, so the same class of mistake cannot recur. The gate audits README, every docs page,
all MCP descriptions, every theorem "why", the Lean headers, and the source comments.

## What a trial is not

- **Not a truth oracle.** A content-address proves **integrity** — that nothing was quietly changed — not that a claim
  is *true*. The trial tells you a statement is honest and recomputable, or that it overclaims; never that the world agrees.
- **Not a judgement of people.** A trial adjudicates a **statement**, and its remedy is paid in code (link a sealed
  theorem, or demarcate the claim), never in blame.
- **Not a manipulation-proof filter — and honest about it.** The honesty gate is a **hardcoded, incomplete word
  lexicon** — the *one* place uuidna hardcodes, and so its weakest, most compromised part. It is a **heuristic floor**
  that catches careless overclaims (it caught many while this project was built), not a wall against a determined one:
  synonyms, cross-script homoglyphs and paraphrase evade it *by construction*, because "is this sentence dishonest?"
  is not decidable arithmetic and cannot compute from the sequence. uuidna's integrity does **not** rest on the gate.
  It rests on the **recomputable proofs and receipts** — which *are* computed, complete over their domain, and
  recheckable by anyone. **Trust the recomputation, not the word-list.**

The theorems are on [Theorems](/theorems) (by principle) and [Topics](/topics) (by skill); the [Tests](/tests) and the
tools on [MCP](/mcp) are the other readings of the same discipline. A theorem computes in Lean, or it is not a theorem —
and the receipt is the proof that nothing here was quietly changed. Integrity, not truth.
