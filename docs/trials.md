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

The theorems are on [Theorems](/theorems) (by principle) and [Topics](/topics) (by skill); the [Tests](/tests) and the
tools on [MCP](/mcp) are the other readings of the same discipline. A theorem computes in Lean, or it is not a theorem —
and the receipt is the proof that nothing here was quietly changed. Integrity, not truth.
