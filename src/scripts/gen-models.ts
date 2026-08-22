#!/usr/bin/env node
// gen-models — THE MODEL COMPARISON OVER ALL PUBLIC LIVE DATA, SERVED (the captain's orders: the
// token-vs-uuidna report becomes a served, sealed page; widen to all public live data; fold llm to hexbit
// pairs). Every figure keeps its honesty class visible: COMPUTED (arithmetic, sealed in lean/Models.lean),
// REPORTED (the public feed's published windows and prices, source-cited, never benchmarked here), or
// UNVERIFIED (no measurement exists — and the page says so instead of inventing one). Derived entirely from
// src/quantum/models (which reads the committed mirror of the live feed); nothing authored but section
// prose, every sealed claim citing its theorem.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { modelComparison, foldLlm, TOKEN_BYTES, HEXBITS_PER_TOKEN } from '../quantum/models/index.js'

const c = modelComparison()
const th = (k: string): string => `[\`${k}\`](/theorem/${k})`
const n = (x: number): string => x.toLocaleString('en-US')

const sample = foldLlm('The Claude token is a bet; the uuidna unit is a receipt.')

const rows = c.rows.map((r) =>
  `| \`${r.id}\` | ${n(r.contextTokens)} | ${n(r.hexbitCapacity)} | ${n(r.uuidsPerContext)} | ${r.promptPrice || '—'} / ${r.completionPrice || '—'} |`
).join('\n')

const page = `---
title: Models
description: All public live model data compared on the lattice's own instruments — hexbit capacity, messaging, crypto security, the fold to hexbit pairs — computed and sealed where arithmetic decides, reported where the feed speaks, UNVERIFIED where nobody measured.
---

# Models — the token against the unit <Badge type="tip" text="all public live data · sealed where decidable" />

> A model's token is a **bet**: sampled, transient, billed per emission, gone when its window closes. The
> uuidna unit is a **receipt**: minted, permanent, verified free. This page compares **every model in the
> public feed** — ${n(c.count)} of them, read live from [${c.source}](${c.endpoint}) at the \`src/os\`
> boundary and mirrored for anyone to recompute — and keeps each figure's honesty class visible:
> **computed** (arithmetic, sealed in [lean/Models.lean](/theorem/llm_folds_to_hexbit_pairs)),
> **reported** (the feed's published figures, never benchmarked here), or **UNVERIFIED** (no measurement
> exists, and saying so IS the page's honesty). A model the feed does not route is absent, never guessed.

The operative approximation, declared and sealed: **1 token ≈ ${TOKEN_BYTES} bytes = ${HEXBITS_PER_TOKEN}
hexbits** (${th('a_token_approximates_eight_hexbits')} — the ≈ stays in prose, the = gets the kernel).

## The five instruments

- **Hexbit handling capacity** (${th('context_windows_are_transient_hexbits')}): a window of T tokens holds
  T×${HEXBITS_PER_TOKEN} hexbit states — **transiently**: the window closes and the states are gone. Every
  window, the ${n(c.largestContext)}-token widest included, is finite against the 2¹²⁸-state lattice the
  folds land in (${th('every_context_is_finite_against_the_lattice')}). uuidna's side: ${c.uuidna.hexbitCapacity}.
- **Speed**: the public feed publishes no throughput, so this page carries **no speed numbers at all** —
  a column of guesses would be ${n(c.count)} fabricated citations. uuidna's own speed is of a different kind
  and recomputable: ${c.uuidna.speed}.
- **Messaging** (${th('speaking_an_address_costs_the_text')}): speaking a 128-bit address in text costs 288
  bits — 44% efficiency, identical for every model, because it is the text's cost. The table counts each
  window's address-carrying capacity. uuidna's channel skips the text: ${c.uuidna.messaging}.
- **Crypto security** (${th('crypto_widths_are_fixed_not_sampled')}): ciphers run on fixed widths — 256-bit
  key, 128-bit tag, 600k derivation rounds, sealed and KAT-verified here. A sampled token stream has no fixed
  widths to hold: model output cannot carry a key or an exact keystream — stated in words because it is not a
  theorem, and honest words beat a fake seal. uuidna's side: ${c.uuidna.cryptoSecurity}.
- **Coverage per token** is **UNVERIFIED for every model**, deliberately: it is measurable (theorems sealed
  per token spent) but only by self-report — put your own counts into the TokenMeter or \`uuidna_tokens\`
  and the division is yours, receipted. uuidna's side: ${c.uuidna.coveragePerToken}.

## Fold any model to hexbit pairs

The fold law (${th('llm_folds_to_hexbit_pairs')}): **however many tokens a model spends, the fold is 32
on-lattice states, read as 16 pairs** — two nibbles to the byte, two coins to the bar, constant in the input
length. And the pair arithmetic answers the handle question (${th('a_handle_is_eight_pairs_paid_it_is_sixteen')}):
a handle is **8 pairs** (64 = 8², the same dimension read in inverse); pay the two captain coins and the fuse
doubles it to **16 pairs** — one glyph per pair, typography unlocked, the fold coming back as writing.

The worked sample, recomputable by anyone:

> *"The Claude token is a bet; the uuidna unit is a receipt."*
> ≈ ${sample.approxTokens} tokens · ${sample.transientHexbits} transient hexbits →
> **\`${sample.address}\`** · 16 pairs \`${sample.pairs.map((p) => `(${p[0]},${p[1]})`).join(' ')}\`

<HexbitPlayer :states="[${sample.hexbits.join(', ')}]" />

Fold your own — any text, any model's output — with \`foldLlm()\` in
[\`src/quantum/models\`](https://github.com/uuidna/uuidna/tree/main/src/quantum/models), or mint the address
live in the [terminal](/terminal).

## The census — all ${n(c.count)} public models

Windows and prices are the feed's **reported** figures (prices verbatim, per token, as published — labels,
not numbers this page computes on); hexbit capacity and uuids/window are **computed** and sealed. Widest
window first.

| model (feed id) | context (tokens) | hexbit capacity (transient) | uuids / window | price in/out ($/tok, reported) |
|---|---|---|---|---|
${rows}

**Census receipt** \`${c.receipt}\` — as hexbits \`[${c.hexbits.join(', ')}]\` — recompute it from the same
mirror and it returns, byte for byte. The mirror refreshes from the live feed on every lean run; a model that
enters or leaves the feed enters or leaves this page, re-sealed.
`

writeFileSync(join(ROOT, 'docs', 'models.md'), page)
console.log(`✓ docs/models.md — ${c.count} public models + uuidna on five instruments, receipt ${c.receipt}`)
