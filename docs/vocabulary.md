---
title: Vocabulary
aside: false
---

<script setup>
import { data } from '../.vitepress/vocabulary.data'
</script>

# Vocabulary <Badge type="tip" :text="`${data.count} terms`" />

**A common, computable vocabulary — derived from every theorem and its domain, not written by hand.** Each term is a
concept the ledger already carries: a **domain** (what a set of theorems is about) or a **capability** (what they
demonstrate). Its definition is drawn from the sealed prose that defines it, its address recomputes from that text,
and its honesty is **self-audited** by the same gate the whole site runs — so a term earns its place or is flagged.

<p class="voc-fold">
All <b>{{ data.count }}</b> terms self-audit: <b>{{ data.clean }}</b> clean<span v-if="data.flagged.length">, <b>{{ data.flagged.length }}</b> flagged</span>.
They fold — in <b>{{ data.trinities }}</b> trinities — to <b>one</b> recomputable receipt: <Handle :uuid="data.receipt" />
</p>

> **All is one — one *receipt*, not a singularity.** What is proven is integrity: every term folds, order-invariant, to
> one recomputable receipt anyone rechecks from the same ledger. That is the honest "all is one" — not a metaphysical
> claim, a merkle fold.

## Domains

<ul class="voc-list">
  <li v-for="t in data.terms.filter(t => t.kind === 'domain')" :key="t.term">
    <b>{{ t.term }}</b> <Badge type="tip" :text="`${t.theorems}`" />
    <span class="voc-def">{{ t.definition }}</span>
    <Handle :uuid="t.address" />
  </li>
</ul>

## Capabilities

<ul class="voc-list">
  <li v-for="t in data.terms.filter(t => t.kind === 'capability')" :key="t.term">
    <b>{{ t.term }}</b> <Badge type="tip" :text="`${t.theorems}`" />
    <span class="voc-def">{{ t.definition }}</span>
    <Handle :uuid="t.address" />
  </li>
</ul>

## Standards the domains formalize

These are **citations, not compliance.** A content-address proves that a theorem states a fact about a standard —
never that uuidna is certified, compliant, or legal under it. That is a matter for auditors and law, not a fold.

<ul class="voc-std">
  <li v-for="(list, file) in data.standards" :key="file">
    <code>{{ file }}</code> — {{ list.join(' · ') }}
  </li>
</ul>

## Translation-ready, not translated

Each term is content-addressed, so a **translation binds to it** by a directional provenance receipt (source → term),
exactly as a book binds to its translation. That proves the *pairing* and each text's integrity — **never** that the
translation is faithful; semantic fidelity is human judgement, provenance is what recomputes. Bring a translation and
`auditTranslation` folds the pair; the vocabulary is the anchor every language ties back to.

[All theorems](/theorems) · [Publications](/publications) · [How the trial works](/trials)

<style scoped>
.voc-fold { border: 1px solid var(--seq-center); border-radius: 8px; padding: .7rem 1rem; }
.voc-fold code { word-break: break-all; }
.voc-list { list-style: none; padding: 0; }
.voc-list li { padding: .6rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.voc-def { display: block; color: var(--vp-c-text-2); font-size: .86rem; margin: .2rem 0; }
.voc-addr { font-size: .72rem; color: var(--vp-c-text-3); }
.voc-std code { font-size: .82em; }
.voc-std li { margin: .3rem 0; }
</style>
