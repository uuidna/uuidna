---
layout: home
description: "Lean 4 theorem ledger — content-addressed identity, honest by construction. Two coins conserved; cite by DOI-class handle."

hero:
  name: "uuidna"
  text: "Content-addressed identity, honest by construction"
  tagline: "A Lean 4 ledger of decidable theorems — TypeScript computes, VitePress monitors. 2^128 usable addresses; two coins conserved; cite by DOI-class handle."
  actions:
    - theme: brand
      text: Browse the theorems
      link: /theorems
    - theme: alt
      text: License
      link: /license

features:
  - title: Theorems
    details: Distinct theorems and keys are counted from the sealed ledger at build time — every proof by decide, axiom-free. Live counts sit in the status table below.
    link: /theorems
  - title: Captain
    details: Denomination two — theorem two_coins (110 − 108 = 2). The whole account is one page, /captain, tried against the ledger as you read it.
    link: /captain
  - title: Quantum
    details: Usable-capacity gap vs reported 48 logical qubits is 2^80 — theorem usable_gap_is_two_to_eighty. Full capacity report on /quantum.
    link: /quantum
---

## Live system status — computed, not typed

<script setup>
import { data } from './.vitepress/ledger.data'
</script>

| | |
| --- | --- |
| **Theorems sealed** | {{ data.total }} — every one `by decide`, recomputed each build from the ledger |
| **Clusters** | {{ data.groups.length }} — each with its audited monograph (`/publications`) |
| **Skills** | {{ data.skillGroups.length }} — the topics axis (`/topics`), mined from the keys |
| **Coins conserved** | 2 — [`two_coins`](/theorem/two_coins) (110 − 108 = −χ of the double torus) |

These numbers are read from the sealed ledger at build time — the page cannot say more than the ledger proves.

**[Capacity report →](/quantum)** — usable-capacity gap `2^80` vs reported 48 logical qubits (theorem `usable_gap_is_two_to_eighty`). Full table and measured fold decade live on [/quantum](/quantum); cost meter on [/captain](/captain).

Permanent citation: `https://uuidna.com/<handle>` (DOI-class). Archive DOI `10.5281/zenodo.21787144` — both in the site footer; terms at [License](/license). Completeness cites handle and DOI.
