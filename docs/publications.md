---
title: Publications
aside: false
---

<script setup>
import { data } from '../.vitepress/publications.data'
</script>

# Publications <Badge type="tip" :text="`${data.publishable} audited`" />

**Notes written in lean, human prose — audited before they are published.** Each publication takes one domain and
writes only what its theorems settle: every load-bearing sentence links the proof that backs it. Nothing is asserted
beyond what is sealed. Writing here descends from **reading** — a note is composed by reading the ledger the package
already proved, and it is run through uuidna's own honesty gate *before* it reaches this page. A sentence that
overreached a proof would be refused, not shipped: the build itself will not emit an unaudited note.

This is the automated stream — {{ data.publishable }} notes over {{ data.theorems }} sealed theorems. Add a domain
(a `lean/*.lean` file, proven `by decide`) and its audited publication appears here, no prose written by hand.

<p v-if="data.refused" class="pub-refused">⚠ {{ data.refused }} note(s) currently refused by the gate — overreaching a proof. They do not publish until every claim links a proof or is demarcated.</p>

<ul class="publist">
  <li v-for="p in data.cards" :key="p.slug">
    <a :href="`/publications/${p.slug}`">{{ p.title }}</a>
    <Badge :type="p.publishable ? 'tip' : 'danger'" :text="p.publishable ? `${p.count} proofs · audited` : `refused · ${p.findings} overreach`" />
    <Handle :uuid="p.receipt" />
  </li>
</ul>

## How a publication earns its claims

A publication is not an opinion piece — it is a **fold of proofs into prose**. The rule is the same one that audits
every word on this site: a claim earns its place by pointing at a sealed `/theorem/<key>`, or it is demarcated
(*not · never · no · simulation · finite · bounded*), or it is flagged and refused until it is. That gate runs at
build time; you are reading only what survived it.

- **Read → write.** The note holds only what its linked proofs already sealed. It cannot say more than the ledger.
- **Audited before published.** The honesty gate runs *before* the page is written. An overreaching note fails the build.
- **Recomputable.** Each note content-addresses to a uuid, and its proofs fold, order-invariant, to one receipt — recompute both from the same `lean/*.lean`.

Integrity, not truth. A publication proves that every claim it makes is backed by a proof — never that its domain is
complete or its prose is fine. [All theorems](/theorems) · [How auditing works](/trials) · [The books it reads](/books)

<style scoped>
.publist { list-style: none; padding: 0; }
.publist li { padding: .5rem 0; border-bottom: 1px solid var(--vp-c-divider); display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; }
.publist a { font-weight: 600; }
.pub-receipt { font-size: .72rem; color: var(--vp-c-text-3); margin-left: auto; }
.pub-refused { color: var(--vp-c-danger-1); font-weight: 600; }
</style>
