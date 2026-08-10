---
title: The trial receipt
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

# The trial receipt

<p class="rcpt-big"><code>{{ data.trial.receipt }}</code></p>

{{ data.total }} theorems · all **SEALED** · all Lean-proven (`by decide`, sorry-free) · order-invariant fold
<span v-if="data.trial.orderInvariant">✓ (reverse order yields the same root)</span><span v-else>✗ BREAK</span> ·
recompute with `npm run docs:build`, re-verify the proofs with `npm run lean`. Each theorem's content-address is
`toUuid(key:statement)`; the trial folds them through the order-invariant gravity.

## Reverse — the chain re-seals

sequential chain tip <code>{{ data.trial.chainTip }}</code> · genesis <code>{{ data.trial.chainGenesis }}</code> —
recompute link by link and it re-seals.

## By computing principle — each layer folds to its own root

<p v-for="g in data.groups" :key="g.name">
  <Badge type="tip" :text="String(g.count)" /> <strong>{{ g.name }}</strong>
  <code class="rcpt">{{ g.fold }}</code>
</p>
