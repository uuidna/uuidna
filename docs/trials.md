---
title: Trials
description: How the uuidna trial works — every theorem folded order-invariant to one recomputable receipt, and a three-way verdict (REFUTED, SEALED, UNVERIFIED) for any statement. The honesty gate drains overclaims; a receipt recomputes the rest. It can fail, and it hardens from real near-misses.
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

<p class="rcpt-big"><code>{{ data.trial.receipt }}</code></p>

<FoldAnimation :receipt="data.trial.receipt" />

| field | value |
| --- | --- |
| theorems folded | {{ data.trial.count }} |
| sealed (TRUE, proven in Lean) | {{ data.trial.sealed }} |
| lean-backed | {{ data.trial.leanBacked }} |
| order-invariant | {{ data.trial.orderInvariant ? 'yes — any pairing folds to the same root' : 'no' }} |
| sequential chain tip | <code>{{ data.trial.chainTip }}</code> |

The fold folds every direction at once — forward, reverse, any pairing — and lands on the same root: that is the
order-invariance the animation shows. The **chain tip** is the other reading: the same addresses folded *sequentially*,
each link's receipt seeding the next (the referer ratchet). Two honest views of the same sealed set.

## The three verdicts

A trial on a single statement returns one of three, as a function of the statement — not an opinion:

| verdict | when | meaning |
| --- | --- | --- |
| **REFUTED** | the honesty gate drains an overclaim | the statement claims more than it can back — the gate catches the overclaim vocabulary and the claim fails |
| **SEALED** | gate-clean **and** admissible | the statement holds the honest floor and carries a proof or a recomputable receipt — it is settled |
| **UNVERIFIED** | gate-clean but no receipt | nothing dishonest, but nothing proven either — an open claim, neither sealed nor refuted |

The gate is a pure, multilingual tripwire and the receipt is a content-address, so two people running the same trial
on the same statement get the same verdict.

## The charter — what the trial does and does not judge

A public trial carries credibility only if its stance is stated plainly. This is the whole of it, and it is drawn
from the three verdicts above — no more, no less:

- **The claim is on trial, never the person, never the idea's worth.** A trial judges *integrity* — does a statement
  earn what it asserts — not merit, taste, or who wrote it. There is no verdict for "unwelcome" and none for "brilliant".
- **Every idea is heard.** Any statement can be tried. An idea that is honest but unproven is **UNVERIFIED** — held
  open, never dismissed — and it leaves with an ordered `develop` plan: name the finite structure, write the boolean
  predicate, supply it. An idea is *not* left at "UNVERIFIED, good luck".
- **The only "no" is to overreach, and it is a reeducation, not a rejection.** **REFUTED** means one of two exact
  things: a named overclaim word, or a supplied test that fails by counterexample. Even then the remedy is *"cut the
  drained phrase, keep the mechanism"* — the claim is sharpened, the thinker is not blamed.
- **Earned, not granted.** **SEALED** happens only when a recomputable test holds. Respect for an idea is not agreement
  with it: the gate is a floor, not an oracle — it drains overclaim, not disagreement.
- **Public and equal.** Every verdict is content-addressed and recomputable by anyone, and the fold is order-invariant:
  the same receipt for every observer, whatever order they read in. No private verdict, no privileged reader.

**The honest limit — credibility *is* responsibility.** "Every idea heard" is not "every claim granted", and it is not
a megaphone. Refusing an overclaim is not judging the idea — it is holding the *claim* to what it earns; drop that and a
pass would mean nothing. And a public, hostable system keeps a floor against genuine harm: respect for learning and
responsibility point the same way. The trial expects nothing of an idea except that it not claim more than it can show.

## It can fail

The trial is **not rigged to pass**. The provenance gate exits non-zero when it finds a hollow, unlinked claim — the
opposite of a rubber stamp. A statement that overclaims is REFUTED, and a build that ships an overclaim **fails the
audit**. That a trial *can* fail is what makes a pass mean anything.

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
