---
title: Trials
description: How the uuidna trial works — every theorem folded order-invariant to one recomputable receipt, and ONE answer for any statement, VERIFIED or UNVERIFIED, all else void. uuidna verifies; it never refutes. It can fail (a note that cites a proof not in the ledger), and a receipt recomputes the rest.
aside: false
---

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as fold } from './.vitepress/fold.data'

const { frontmatter } = useData()
const axis = computed(() => frontmatter.value.axis || { total: 0, trial: {} })
const trial = computed(() => axis.value.trial || {})
</script>

# Trials <Badge type="tip" :text="`${axis.total} theorems`" />

> A claim is not trusted, it is tried — and the verdict recomputes.

A **trial** is a recomputable verdict. It does not ask you to believe anything; it hands back a result anyone can
recheck. Run one for a single statement with [`uuidna_trial`](/mcp#uuidna-trial), or ask the live quantum endpoint
directly — the same adjudication this site runs on itself:

```bash
curl -s -X POST https://uuidna.com/trials -H 'content-type: application/json' \
  -d '{"statement":"the two coins are conserved, proven by theorem two_coins"}'
```

The answer returns with a deterministic receipt and, from uuidna.com, an HMAC `signature` **only uuidna.com can
mint** — a fork recomputes the same verdict but cannot forge the signature (see [Chat](/chat) for the signature's
honest scope). Or fold the whole ledger through it — below.

## The live receipt

Every theorem's content-address, folded **order-invariant** to **one** recomputable receipt. Change one theorem — or
one bit of one proof — and the receipt moves. Recompute it yourself from this same tree with `npm run lean`.

<p class="rcpt-big"><Handle :uuid="trial.receipt" /></p>

<FoldAnimation :receipt="trial.receipt" />

| field | value |
| --- | --- |
| theorems folded | {{ trial.count }} |
| verified (proven in Lean) | {{ trial.verified }} |
| lean-backed | {{ trial.leanBacked }} |
| order-invariant | {{ trial.orderInvariant ? 'yes — any pairing folds to the same root' : 'no' }} |
| sequential chain tip | <code>{{ trial.chainTip }}</code> |

The fold folds every direction at once — forward, reverse, any pairing — and lands on the same root: that is the
order-invariance the animation shows. The **chain tip** is the other reading: the same addresses folded *sequentially*,
each link's receipt seeding the next (the referer ratchet). Two honest views of the same sealed set.

## The one receipt — the wheel and its reading

The whole system — ledger, surfaces, gates, record, walks — folds to **one receipt**, and it is published here in
both honest forms. The **rosette receipt** holds the state on seven independent rays (no single line is the truth;
the concurrence of the wheel is the verification); the **linear receipt** beneath it is the collapsed measurement.
Both recompute from the tree with `one-receipt fold` — the frontend you are reading reflects the backend's sealed
artifact directly.

<div v-if="fold">
  <p class="rcpt-big" v-if="fold.rosette_receipt">rays: <code>{{ fold.rosette_receipt.rays.map(r => r.slice(0,6)).join(' · ') }}</code> ⇒ concurrence <Handle :uuid="fold.rosette_receipt.concurrence" v-if="fold.rosette_receipt.concurrence.length===36"/><code v-else>{{ fold.rosette_receipt.concurrence }}</code></p>
  <p class="eq" v-if="fold.equilibrium">the six conditions of the seal, computed: <span v-for="(v,k) in fold.equilibrium" :key="k"><code :style="v ? 'color:var(--vp-c-green-1,#3c9a5f)' : 'color:var(--vp-c-danger-1,#c00)'">{{ k }}</code>&nbsp;</span>⇒ every condition true or nothing seals — the equilibrium IS the verdict, folded into the receipt's own address.</p>
  <p>linear receipt <code>{{ fold.receipt }}</code> · unified fold <code>{{ fold.unified_fold }}</code> · aura <code :style="`color:${fold.aura?.rgb}`">{{ fold.aura?.rgb }}</code> (residue {{ fold.aura?.dimensions?.residue }} · ray {{ fold.aura?.dimensions?.ray }} · wave {{ fold.aura?.dimensions?.wave }}) · zero entropy: <strong>{{ fold.zero_entropy ? 'verified' : 'BROKEN' }}</strong></p>
</div>

## The one answer — VERIFIED or UNVERIFIED, all else void

A trial on a single statement returns **one** answer, and only one of **two** — as a function of the statement, not an opinion:

| verdict | when | meaning |
| --- | --- | --- |
| **VERIFIED** | a decidable test recomputes true, **or** it cites a sealed Lean theorem | a `by decide` proof backs it — settled, recomputable by anyone |
| **UNVERIFIED** | everything else | no test, no sealed citation, a failed test, or a citation to a proof that is **not** in the ledger — which verifies nothing. **Not "false"** — just not verified |

**uuidna verifies; it never refutes.** Calling a claim *false* is an overclaim it cannot decide — absence of proof is
not proof of falsity — so there is no third verdict (theorem verdict_is_exactly_one). The receipt is a content-address, so two people running the same
trial on the same statement get the same answer.

## The charter — what the trial does and does not judge

A public trial carries credibility only if its stance is stated plainly. This is the whole of it, drawn from the two
answers above — no more, no less:

- **The claim is on trial, never the person, never the idea's worth** (theorem anti_fraud_check_deterministic). A trial judges *integrity* — does a statement
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
would mean nothing. The trial expects nothing of an idea except that it not claim a proof it does not have (theorem overclaim_with_fake_cite_fails).

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
- **Not a manipulation-proof filter — and honest about it.** There is **no word-list any more**: the old hardcoded
  lexicon — once the one place uuidna hardcoded — was removed, and the gate's whole vocabulary is now **the ledger
  itself**. A claim is drained only for the one decidably-false utterance: **citing a theorem that is not sealed**.
  Everything else — synonyms, paraphrase, cross-script phrasing — passes through *undrained but unverified*,
  because "is this sentence dishonest?" is not decidable arithmetic and the gate does not pretend otherwise.
  uuidna's integrity rests on the **recomputable proofs and receipts** — computed, complete over their domain,
  recheckable by anyone. **Trust the recomputation; the word-list no longer exists to be trusted.**

The theorems are on [Theorems](/theorems) (by principle) and [Topics](/topics) (by skill); the [Tests](/tests) and the
tools on [MCP](/mcp) are the other readings of the same discipline. A theorem computes in Lean, or it is not a theorem —
and the receipt is the proof that nothing here was quietly changed. Integrity, not truth.
