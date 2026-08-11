---
title: The trial receipt
aside: false
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

# The trial <Badge type="tip" :text="`${data.total} theorems`" />

Every theorem's content-address, folded **order-invariant** to **one** recomputable receipt. Change one theorem — or
one bit of one proof — and the receipt moves. Recompute it yourself from this same tree with `npm run lean`.

<p class="rcpt-big"><code>{{ data.trial.receipt }}</code></p>

<FoldAnimation :receipt="data.trial.receipt" />

## What the receipt attests

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

The theorems themselves are on [/theorems](/theorems) (by principle) and [/topics](/topics) (by skill). A theorem
computes in Lean, or it is not a theorem — and the receipt is the proof that nothing here was quietly changed.
