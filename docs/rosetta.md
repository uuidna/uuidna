---
title: The rosette index
description: The whole ledger indexed onto seven rays (ℤ/7) by content-address — a decidable partition for computing in seven dimensions, each ray folded to one recomputable receipt. Organisation, not meaning.
aside: false
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

# The rosette index <Badge type="tip" :text="`7 rays · ${data.total} theorems`" />

**The whole ledger, indexed onto seven rays.** Each theorem falls on one ray of the ℤ/7 rosette by a decidable
function of its content-address (`ray = address mod 7`), and each ray folds — order-invariantly — to its own
recomputable receipt. This is a **computing structure, not a folder move**: a balanced seven-way partition for
folding and lookup over the flat ledger, recomputable by anyone.

**Honest scope:** which ray a theorem lands on carries **no meaning** — it is a stable index, not a significance.
The arithmetic (the ℤ/7 partition, the per-ray fold) is decidable; any numerological reading of the ray is
UNVERIFIED. The same discipline the rest of uuidna holds: the number is sealed, the meaning is not.

<section v-for="r in data.rosetta" :key="r.ray" class="psec">
  <h2 :id="'ray-' + r.ray">Ray {{ r.ray }} <Badge type="tip" :text="String(r.count)" /></h2>
  <p class="psec-fold">ray fold <Handle :uuid="r.fold" /></p>
  <ul class="tlist">
    <li v-for="t in r.theorems" :key="t.key"><a :href="`/theorem/${t.key}`">{{ t.name }}</a></li>
  </ul>
</section>

The same theorems organised by computing principle are on [/theorems](/theorems), by skill on [/topics](/topics), and
folded whole on [/trials](/trials). A theorem computes in Lean, or it is not a theorem.
