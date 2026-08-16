---
title: News
description: "The newsroom computed, never authored — release bulletins naming the ledger receipts they shipped, the newest signed deposits from the trials wire, and the sealed equilibrium as the standing weather report. Every item carries the receipt that proves it."
aside: false
---

<script setup>
import { data } from './.vitepress/news.data'
</script>

# News <Badge type="tip" text="computed, never authored" />

> A newsroom where every bulletin carries its receipt: releases name the ledger they shipped, deposits arrive
> signed from the [trials](/trials) wire, standing investigations run as [the guard's finders](/tests), and the
> approval layer is the legal gate itself — honest scope on every claim, no person ever on trial. Nothing on this
> page is written by hand; it is read from the sealed artifacts at build, or it does not appear.

## The wire — newest signed deposits

<div v-for="d in data.deposits" :key="d.id" style="margin: 0.6em 0; padding: 0.5em 0.8em; border-left: 3px solid var(--vp-c-brand-1);">
  <em>{{ d.statement || d.claim || d.id }}</em><br/>
  <code style="font-size: 0.85em">{{ d.id }}</code>
</div>

## Release bulletins — each naming the ledger it shipped

<template v-for="e in data.entries" :key="e.version">
  <h3>{{ e.version }}</h3>
  <ul><li v-for="(l, i) in e.lines" :key="i">{{ l.replace(/^-\s*/, '') }}</li></ul>
</template>

## The standing weather — the equilibrium now

<p v-if="data.fold">receipt <code>{{ data.fold.receipt }}</code> · zero entropy:
<strong>{{ data.fold.zero_entropy ? 'verified' : 'BROKEN' }}</strong> ·
<span v-for="(v, k) in data.fold.equilibrium" :key="k"><code :style="v ? 'color:var(--vp-c-green-1,#3c9a5f)' : 'color:var(--vp-c-danger-1,#c00)'">{{ k }}</code>&nbsp;</span></p>

*The investigations desk: [the trials charter](/trials#the-charter-what-the-trial-does-and-does-not-judge) — the
claim on trial, never the person. The archive: [the changelog](/changelog), self-auditing. The education desk:
[the quantum school](/school). Integrity, not truth.*
