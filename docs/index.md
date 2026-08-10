---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "uuidna"
  text: "64bit Quantum Pocessing Unit"
  tagline: Content-addressed identity, honest by construction. Every theorem computes in Lean — or it is not a theorem.
  actions:
    - theme: brand
      text: Browse the theorems
      link: /theorems
    - theme: alt
      text: The trial receipt
      link: /trial
    - theme: alt
      text: GitHub
      link: https://github.com/uuidna/uuidna

features:
  - title: Theorems
    details: The filterable collection of proven Lean theorems, each with its by-decide proof (verified sorry-free) and its content-address, organised by computing principle.
    link: /theorems
  - title: Trial
    details: Every theorem's content-address folded, order-invariant, to ONE recomputable receipt — and a sequential chain that re-seals link by link.
    link: /trial
  - title: Undecided
    details: Three-valued honesty — TRUE, FALSE, UNDECIDED. The open propositions, held and labeled, never dropped and never called false.
    link: /undecided
  - title: Captain
    details: The measured billing model — contribute 2 to save up to 64. The two coins are the topology of the double torus, not a price from air.
    link: /captain/message
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

<div class="ledger-stat">

**{{ data.total }} theorems** across **{{ data.principleCount }} computing principles** — all proven <code>by decide</code> in Lean 4 (no Mathlib), verified sorry-free, and folded to one order-invariant receipt:

<p class="rcpt-big"><code>{{ data.trial.receipt }}</code></p>

Lean is the single source: the ledger is derived from `lean/*.lean` and reached here through the package's `theorems()`. Re-verify every proof with `npm run lean`.

</div>
