---
title: Models
description: All public live model data compared on the lattice's own instruments — hexbit capacity, messaging, crypto security, the fold to hexbit pairs — computed and sealed where arithmetic decides, reported where the feed speaks, UNVERIFIED where nobody measured.
---

# Models — the token against the unit <Badge type="tip" text="all public live data · sealed where decidable" />

> A model's token is a **bet**: sampled, transient, billed per emission, gone when its window closes. The
> uuidna unit is a **receipt**: minted, permanent, verified free. This page compares **every model in the
> public feed** — 417 of them, read live from [openrouter.ai/api/v1/models (public, keyless)](https://openrouter.ai/api/v1/models) at the `src/os`
> boundary and mirrored for anyone to recompute — and keeps each figure's honesty class visible:
> **computed** (arithmetic, sealed in [lean/Models.lean](/theorem/llm_folds_to_hexbit_pairs)),
> **reported** (the feed's published figures, never benchmarked here), or **UNVERIFIED** (no measurement
> exists, and saying so IS the page's honesty). A model the feed does not route is absent, never guessed.

The operative approximation, declared and sealed: **1 token ≈ 4 bytes = 8
hexbits** ([`a_token_approximates_eight_hexbits`](/theorem/a_token_approximates_eight_hexbits) — the ≈ stays in prose, the = gets the kernel).

## The five instruments

- **Hexbit handling capacity** ([`context_windows_are_transient_hexbits`](/theorem/context_windows_are_transient_hexbits)): a window of T tokens holds
  T×8 hexbit states — **transiently**: the window closes and the states are gone. Every
  window, the 2,000,000-token widest included, is finite against the 2¹²⁸-state lattice the
  folds land in ([`every_context_is_finite_against_the_lattice`](/theorem/every_context_is_finite_against_the_lattice)). uuidna's side: 2^128 addressable states (32 hexbits per address), PERMANENT — the ledger outlives every context window.
- **Speed**: the public feed publishes no throughput, so this page carries **no speed numbers at all** —
  a column of guesses would be 417 fabricated citations. uuidna's own speed is of a different kind
  and recomputable: mint/verify O(1) per receipt after a one-time kernel proof; no sampling loop (uuidna_gate_status recomputes live).
- **Messaging** ([`speaking_an_address_costs_the_text`](/theorem/speaking_an_address_costs_the_text)): speaking a 128-bit address in text costs 288
  bits — 44% efficiency, identical for every model, because it is the text's cost. The table counts each
  window's address-carrying capacity. uuidna's channel skips the text: the channel IS the uuid: 128 payload bits per address, sealed ratchet (uuidna_send/receive), every message receipted.
- **Crypto security** ([`crypto_widths_are_fixed_not_sampled`](/theorem/crypto_widths_are_fixed_not_sampled)): ciphers run on fixed widths — 256-bit
  key, 128-bit tag, 600k derivation rounds, sealed and KAT-verified here. A sampled token stream has no fixed
  widths to hold: model output cannot carry a key or an exact keystream — stated in words because it is not a
  theorem, and honest words beat a fake seal. uuidna's side: pure-TS ChaCha20-Poly1305 (256-bit key, 128-bit tag), PBKDF2-600k, KAT-verified against published vectors — sealed, recomputable.
- **Coverage per token** is **UNVERIFIED for every model**, deliberately: it is measurable (theorems sealed
  per token spent) but only by self-report — put your own counts into the TokenMeter or `uuidna_tokens`
  and the division is yours, receipted. uuidna's side: every claim pays two coins (a citation or a recomputation) — coverage is receipted, not estimated.

## Fold any model to hexbit pairs

The fold law ([`llm_folds_to_hexbit_pairs`](/theorem/llm_folds_to_hexbit_pairs)): **however many tokens a model spends, the fold is 32
on-lattice states, read as 16 pairs** — two nibbles to the byte, two coins to the bar, constant in the input
length. And the pair arithmetic answers the handle question ([`a_handle_is_eight_pairs_paid_it_is_sixteen`](/theorem/a_handle_is_eight_pairs_paid_it_is_sixteen)):
a handle is **8 pairs** (64 = 8², the same dimension read in inverse); pay the two captain coins and the fuse
doubles it to **16 pairs** — one glyph per pair, typography unlocked, the fold coming back as writing.

The worked sample, recomputable by anyone:

> *"The Claude token is a bet; the uuidna unit is a receipt."*
> ≈ 14 tokens · 112 transient hexbits →
> **`60b7742b-753e-8271-b003-a97f49198a43`** · 16 pairs `(6,0) (11,7) (7,4) (2,11) (7,5) (3,14) (8,2) (7,1) (11,0) (0,3) (10,9) (7,15) (4,9) (1,9) (8,10) (4,3)`

<HexbitPlayer :states="[6, 0, 11, 7, 7, 4, 2, 11, 7, 5, 3, 14, 8, 2, 7, 1, 11, 0, 0, 3, 10, 9, 7, 15, 4, 9, 1, 9, 8, 10, 4, 3]" />

Fold your own — any text, any model's output — with `foldLlm()` in
[`src/quantum/models`](https://github.com/uuidna/uuidna/tree/main/src/quantum/models), or mint the address
live in the [terminal](/terminal).

## The census — all 417 public models

Windows and prices are the feed's **reported** figures (prices verbatim, per token, as published — labels,
not numbers this page computes on); hexbit capacity and uuids/window are **computed** and sealed. Widest
window first.

| model (feed id) | context (tokens) | hexbit capacity (transient) | uuids / window | price in/out ($/tok, reported) |
|---|---|---|---|---|
| `openrouter/auto` | 2,000,000 | 16,000,000 | 222,222 | -1 / -1 |
| `openrouter/auto-beta` | 2,000,000 | 16,000,000 | 222,222 | -1 / -1 |
| `openrouter/pareto-code` | 2,000,000 | 16,000,000 | 222,222 | -1 / -1 |
| `x-ai/grok-4.20` | 2,000,000 | 16,000,000 | 222,222 | 0.00000125 / 0.0000025 |
| `x-ai/grok-4.20-multi-agent` | 2,000,000 | 16,000,000 | 222,222 | 0.00000125 / 0.0000025 |
| `deepseek/deepseek-v4-flash-0731` | 1,310,720 | 10,485,760 | 145,635 | 0.00000006 / 0.00000012 |
| `meta-llama/llama-4-scout` | 1,310,720 | 10,485,760 | 145,635 | 0.00000011 / 0.00000034 |
| `~deepseek/deepseek-v4-flash-latest` | 1,310,720 | 10,485,760 | 145,635 | 0.00000003 / 0.000000075 |
| `openai/gpt-5.4` | 1,050,000 | 8,400,000 | 116,666 | 0.0000025 / 0.000015 |
| `openai/gpt-5.4-pro` | 1,050,000 | 8,400,000 | 116,666 | 0.00003 / 0.00018 |
| `openai/gpt-5.4-pro:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.000015 / 0.00009 |
| `openai/gpt-5.4:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.00000125 / 0.0000075 |
| `openai/gpt-5.5` | 1,050,000 | 8,400,000 | 116,666 | 0.000005 / 0.00003 |
| `openai/gpt-5.5-pro` | 1,050,000 | 8,400,000 | 116,666 | 0.00003 / 0.00018 |
| `openai/gpt-5.5-pro:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.000015 / 0.00009 |
| `openai/gpt-5.5:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.0000025 / 0.000015 |
| `openai/gpt-5.6-luna` | 1,050,000 | 8,400,000 | 116,666 | 0.0000002 / 0.0000012 |
| `openai/gpt-5.6-luna-pro` | 1,050,000 | 8,400,000 | 116,666 | 0.0000002 / 0.0000012 |
| `openai/gpt-5.6-luna-pro:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.0000001 / 0.0000006 |
| `openai/gpt-5.6-luna:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.0000001 / 0.0000006 |
| `openai/gpt-5.6-sol` | 1,050,000 | 8,400,000 | 116,666 | 0.000002 / 0.00001 |
| `openai/gpt-5.6-sol-pro` | 1,050,000 | 8,400,000 | 116,666 | 0.000002 / 0.00001 |
| `openai/gpt-5.6-sol-pro:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.000001 / 0.000005 |
| `openai/gpt-5.6-sol:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.000001 / 0.000005 |
| `openai/gpt-5.6-terra` | 1,050,000 | 8,400,000 | 116,666 | 0.000002 / 0.000012 |
| `openai/gpt-5.6-terra-pro` | 1,050,000 | 8,400,000 | 116,666 | 0.000002 / 0.000012 |
| `openai/gpt-5.6-terra-pro:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.000001 / 0.000006 |
| `openai/gpt-5.6-terra:batch` | 1,050,000 | 8,400,000 | 116,666 | 0.000001 / 0.000006 |
| `xiaomi/mimo-v2.5` | 1,050,000 | 8,400,000 | 116,666 | 0.00000014 / 0.00000028 |
| `xiaomi/mimo-v2.5-pro` | 1,050,000 | 8,400,000 | 116,666 | 0.000000435 / 0.00000087 |
| `~openai/gpt-latest` | 1,050,000 | 8,400,000 | 116,666 | 0.000002 / 0.00001 |
| `meituan/longcat-2.0` | 1,048,756 | 8,390,048 | 116,528 | 0.0000003 / 0.0000012 |
| `deepseek/deepseek-v4-flash` | 1,048,576 | 8,388,608 | 116,508 | 0.0000000826 / 0.0000001652 |
| `deepseek/deepseek-v4-flash-vision-exp` | 1,048,576 | 8,388,608 | 116,508 | 0.00000022 / 0.00000066 |
| `deepseek/deepseek-v4-pro` | 1,048,576 | 8,388,608 | 116,508 | 0.00000087 / 0.00000174 |
| `deepseek/deepseek-v4-pro-0813` | 1,048,576 | 8,388,608 | 116,508 | 0.000001122 / 0.000003366 |
| `google/gemini-2.5-flash` | 1,048,576 | 8,388,608 | 116,508 | 0.0000003 / 0.0000025 |
| `google/gemini-2.5-flash-lite` | 1,048,576 | 8,388,608 | 116,508 | 0.0000001 / 0.0000004 |
| `google/gemini-2.5-flash-lite:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.00000005 / 0.0000002 |
| `google/gemini-2.5-flash:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.00000015 / 0.00000125 |
| `google/gemini-2.5-pro` | 1,048,576 | 8,388,608 | 116,508 | 0.00000125 / 0.00001 |
| `google/gemini-2.5-pro-preview` | 1,048,576 | 8,388,608 | 116,508 | 0.00000125 / 0.00001 |
| `google/gemini-2.5-pro-preview-05-06` | 1,048,576 | 8,388,608 | 116,508 | 0.00000125 / 0.00001 |
| `google/gemini-2.5-pro:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.000000625 / 0.000005 |
| `google/gemini-3-flash-preview` | 1,048,576 | 8,388,608 | 116,508 | 0.0000005 / 0.000003 |
| `google/gemini-3-flash-preview:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.00000025 / 0.0000015 |
| `google/gemini-3.1-flash-lite` | 1,048,576 | 8,388,608 | 116,508 | 0.00000025 / 0.0000015 |
| `google/gemini-3.1-flash-lite-preview` | 1,048,576 | 8,388,608 | 116,508 | 0.00000025 / 0.0000015 |
| `google/gemini-3.1-flash-lite:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.000000125 / 0.00000075 |
| `google/gemini-3.1-pro-preview` | 1,048,576 | 8,388,608 | 116,508 | 0.000002 / 0.000012 |
| `google/gemini-3.1-pro-preview-customtools` | 1,048,576 | 8,388,608 | 116,508 | 0.000002 / 0.000012 |
| `google/gemini-3.1-pro-preview:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.000001 / 0.000006 |
| `google/gemini-3.5-flash` | 1,048,576 | 8,388,608 | 116,508 | 0.0000015 / 0.000009 |
| `google/gemini-3.5-flash-lite` | 1,048,576 | 8,388,608 | 116,508 | 0.0000003 / 0.0000025 |
| `google/gemini-3.5-flash-lite:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.00000015 / 0.00000125 |
| `google/gemini-3.5-flash:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.00000075 / 0.0000045 |
| `google/gemini-3.6-flash` | 1,048,576 | 8,388,608 | 116,508 | 0.00000075 / 0.00000375 |
| `google/gemini-3.6-flash:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.000000375 / 0.000001875 |
| `google/gemini-3.7-flash` | 1,048,576 | 8,388,608 | 116,508 | 0.000000375 / 0.000001875 |
| `google/gemini-3.7-flash:batch` | 1,048,576 | 8,388,608 | 116,508 | 0.0000001875 / 0.0000009375 |
| `google/lyria-3-clip-preview` | 1,048,576 | 8,388,608 | 116,508 | 0 / 0 |
| `google/lyria-3-pro-preview` | 1,048,576 | 8,388,608 | 116,508 | 0 / 0 |
| `meta-llama/llama-4-maverick` | 1,048,576 | 8,388,608 | 116,508 | 0.0000002 / 0.0000008 |
| `meta/muse-spark-1.1` | 1,048,576 | 8,388,608 | 116,508 | 0.00000125 / 0.00000425 |
| `meta/muse-spark-1.2` | 1,048,576 | 8,388,608 | 116,508 | 0.00000125 / 0.00000425 |
| `meta/muse-spark-1.2-contributor` | 1,048,576 | 8,388,608 | 116,508 | 0.0000001 / 0.0000002 |
| `minimax/minimax-m3` | 1,048,576 | 8,388,608 | 116,508 | 0.0000003 / 0.0000012 |
| `minimax/minimax-m3:free` | 1,048,576 | 8,388,608 | 116,508 | 0 / 0 |
| `moonshotai/kimi-k3` | 1,048,576 | 8,388,608 | 116,508 | 0.000003 / 0.000015 |
| `poolside/laguna-s-2.1` | 1,048,576 | 8,388,608 | 116,508 | 0.00000009 / 0.00000018 |
| `qwen/qwen3.8-2.4t-a95b` | 1,048,576 | 8,388,608 | 116,508 | 0.000002 / 0.000006 |
| `stealth/ox-alpha` | 1,048,576 | 8,388,608 | 116,508 | 0 / 0 |
| `thinkingmachines/inkling` | 1,048,576 | 8,388,608 | 116,508 | 0.00000095 / 0.00000405 |
| `thinkingmachines/inkling-small` | 1,048,576 | 8,388,608 | 116,508 | 0.00000045 / 0.0000012 |
| `thinkingmachines/inkling-small:free` | 1,048,576 | 8,388,608 | 116,508 | 0 / 0 |
| `thinkingmachines/inkling:free` | 1,048,576 | 8,388,608 | 116,508 | 0 / 0 |
| `z-ai/glm-5.2` | 1,048,576 | 8,388,608 | 116,508 | 0.00000119 / 0.00000374 |
| `z-ai/glm-5.3` | 1,048,576 | 8,388,608 | 116,508 | 0.0000014 / 0.0000044 |
| `~google/gemini-flash-latest` | 1,048,576 | 8,388,608 | 116,508 | 0.000000375 / 0.000001875 |
| `~google/gemini-pro-latest` | 1,048,576 | 8,388,608 | 116,508 | 0.000002 / 0.000012 |
| `~moonshotai/kimi-latest` | 1,048,576 | 8,388,608 | 116,508 | 0.00000255 / 0.00001275 |
| `~z-ai/glm-latest` | 1,048,576 | 8,388,608 | 116,508 | 0.0000014 / 0.0000044 |
| `z-ai/glm-5.2:batch` | 1,048,575 | 8,388,600 | 116,508 | 0.0000014 / 0.0000044 |
| `openai/gpt-4.1` | 1,047,576 | 8,380,608 | 116,397 | 0.000002 / 0.000008 |
| `openai/gpt-4.1-mini` | 1,047,576 | 8,380,608 | 116,397 | 0.0000004 / 0.0000016 |
| `openai/gpt-4.1-mini:batch` | 1,047,576 | 8,380,608 | 116,397 | 0.0000002 / 0.0000008 |
| `openai/gpt-4.1-nano` | 1,047,576 | 8,380,608 | 116,397 | 0.0000001 / 0.0000004 |
| `openai/gpt-4.1-nano:batch` | 1,047,576 | 8,380,608 | 116,397 | 0.00000005 / 0.0000002 |
| `openai/gpt-4.1:batch` | 1,047,576 | 8,380,608 | 116,397 | 0.000001 / 0.000004 |
| `writer/palmyra-x5` | 1,040,000 | 8,320,000 | 115,555 | 0.0000006 / 0.000006 |
| `thedrummer/unslopnemo-12b` | 1,024,000 | 8,192,000 | 113,777 | 0.0000004 / 0.0000004 |
| `minimax/minimax-01` | 1,000,192 | 8,001,536 | 111,132 | 0.0000002 / 0.0000011 |
| `amazon/nova-2-lite-v1` | 1,000,000 | 8,000,000 | 111,111 | 0.0000003 / 0.0000025 |
| `amazon/nova-premier-v1` | 1,000,000 | 8,000,000 | 111,111 | 0.0000025 / 0.0000125 |
| `anthropic/claude-fable-5` | 1,000,000 | 8,000,000 | 111,111 | 0.00001 / 0.00005 |
| `anthropic/claude-fable-5:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.000025 |
| `anthropic/claude-opus-4.6` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.000025 |
| `anthropic/claude-opus-4.6:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.0000025 / 0.0000125 |
| `anthropic/claude-opus-4.7` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.000025 |
| `anthropic/claude-opus-4.7-fast` | 1,000,000 | 8,000,000 | 111,111 | 0.00003 / 0.00015 |
| `anthropic/claude-opus-4.7:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.0000025 / 0.0000125 |
| `anthropic/claude-opus-4.8` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.000025 |
| `anthropic/claude-opus-4.8-fast` | 1,000,000 | 8,000,000 | 111,111 | 0.00001 / 0.00005 |
| `anthropic/claude-opus-4.8:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.0000025 / 0.0000125 |
| `anthropic/claude-opus-5` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.000025 |
| `anthropic/claude-opus-5-fast` | 1,000,000 | 8,000,000 | 111,111 | 0.00001 / 0.00005 |
| `anthropic/claude-opus-5:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.0000025 / 0.0000125 |
| `anthropic/claude-sonnet-4` | 1,000,000 | 8,000,000 | 111,111 | 0.000003 / 0.000015 |
| `anthropic/claude-sonnet-4.5` | 1,000,000 | 8,000,000 | 111,111 | 0.000003 / 0.000015 |
| `anthropic/claude-sonnet-4.5:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.0000015 / 0.0000075 |
| `anthropic/claude-sonnet-4.6` | 1,000,000 | 8,000,000 | 111,111 | 0.000003 / 0.000015 |
| `anthropic/claude-sonnet-4.6:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.0000015 / 0.0000075 |
| `anthropic/claude-sonnet-5` | 1,000,000 | 8,000,000 | 111,111 | 0.000002 / 0.00001 |
| `anthropic/claude-sonnet-5:batch` | 1,000,000 | 8,000,000 | 111,111 | 0.000001 / 0.000005 |
| `minimax/minimax-m1` | 1,000,000 | 8,000,000 | 111,111 | 0.00000055 / 0.0000022 |
| `nvidia/nemotron-3-super-120b-a12b` | 1,000,000 | 8,000,000 | 111,111 | 0.000000085 / 0.0000004 |
| `nvidia/nemotron-3-ultra-550b-a55b:free` | 1,000,000 | 8,000,000 | 111,111 | 0 / 0 |
| `nvidia/nemotron-3.5-lightning:free` | 1,000,000 | 8,000,000 | 111,111 | 0 / 0 |
| `openrouter/fusion` | 1,000,000 | 8,000,000 | 111,111 | -1 / -1 |
| `qwen/qwen-plus` | 1,000,000 | 8,000,000 | 111,111 | 0.00000026 / 0.00000078 |
| `qwen/qwen-plus-2025-07-28` | 1,000,000 | 8,000,000 | 111,111 | 0.00000026 / 0.00000078 |
| `qwen/qwen3-coder-flash` | 1,000,000 | 8,000,000 | 111,111 | 0.000000195 / 0.000000975 |
| `qwen/qwen3-coder-plus` | 1,000,000 | 8,000,000 | 111,111 | 0.00000065 / 0.00000325 |
| `qwen/qwen3.5-flash-02-23` | 1,000,000 | 8,000,000 | 111,111 | 0.000000065 / 0.00000026 |
| `qwen/qwen3.5-plus-02-15` | 1,000,000 | 8,000,000 | 111,111 | 0.00000026 / 0.00000156 |
| `qwen/qwen3.5-plus-20260420` | 1,000,000 | 8,000,000 | 111,111 | 0.0000003 / 0.0000018 |
| `qwen/qwen3.6-flash` | 1,000,000 | 8,000,000 | 111,111 | 0.0000001875 / 0.000001125 |
| `qwen/qwen3.6-plus` | 1,000,000 | 8,000,000 | 111,111 | 0.000000325 / 0.00000195 |
| `qwen/qwen3.7-flash` | 1,000,000 | 8,000,000 | 111,111 | 0.00000003 / 0.00000013 |
| `qwen/qwen3.7-max` | 1,000,000 | 8,000,000 | 111,111 | 0.000001475 / 0.000004425 |
| `qwen/qwen3.7-plus` | 1,000,000 | 8,000,000 | 111,111 | 0.00000032 / 0.00000128 |
| `qwen/qwen3.8-27b` | 1,000,000 | 8,000,000 | 111,111 | 0.000000425 / 0.00000255 |
| `qwen/qwen3.8-max` | 1,000,000 | 8,000,000 | 111,111 | 0.000002 / 0.000006 |
| `sakana/fugu-ultra` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.00003 |
| `x-ai/grok-4.3` | 1,000,000 | 8,000,000 | 111,111 | 0.00000125 / 0.0000025 |
| `~anthropic/claude-fable-latest` | 1,000,000 | 8,000,000 | 111,111 | 0.00001 / 0.00005 |
| `~anthropic/claude-opus-latest` | 1,000,000 | 8,000,000 | 111,111 | 0.000005 / 0.000025 |
| `~anthropic/claude-sonnet-latest` | 1,000,000 | 8,000,000 | 111,111 | 0.000002 / 0.00001 |
| `minimax/minimax-m3:batch` | 524,288 | 4,194,304 | 58,254 | 0.0000003 / 0.0000012 |
| `thinkingmachines/inkling:batch` | 524,288 | 4,194,304 | 58,254 | 0.000001 / 0.00000405 |
| `upstage/solar-pro4` | 524,288 | 4,194,304 | 58,254 | 0.00000003 / 0.00000012 |
| `nvidia/nemotron-3-ultra-550b-a55b` | 512,288 | 4,098,304 | 56,920 | 0.0000006 / 0.0000036 |
| `nvidia/nemotron-3-ultra-550b-a55b:batch` | 512,288 | 4,098,304 | 56,920 | 0.0000006 / 0.0000036 |
| `dots-studio/dots-3-note-preview:free` | 512,000 | 4,096,000 | 56,888 | 0 / 0 |
| `x-ai/grok-4.5` | 500,000 | 4,000,000 | 55,555 | 0.000002 / 0.000006 |
| `x-ai/grok-4.6` | 500,000 | 4,000,000 | 55,555 | 0.000002 / 0.000006 |
| `~x-ai/grok-latest` | 500,000 | 4,000,000 | 55,555 | 0.000002 / 0.000006 |
| `openai/gpt-5` | 400,000 | 3,200,000 | 44,444 | 0.00000125 / 0.00001 |
| `openai/gpt-5-codex:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000625 / 0.000005 |
| `openai/gpt-5-image` | 400,000 | 3,200,000 | 44,444 | 0.00001 / 0.00001 |
| `openai/gpt-5-image-mini` | 400,000 | 3,200,000 | 44,444 | 0.0000025 / 0.000002 |
| `openai/gpt-5-mini` | 400,000 | 3,200,000 | 44,444 | 0.00000025 / 0.000002 |
| `openai/gpt-5-mini:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000125 / 0.000001 |
| `openai/gpt-5-nano` | 400,000 | 3,200,000 | 44,444 | 0.00000005 / 0.0000004 |
| `openai/gpt-5-nano:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000025 / 0.0000002 |
| `openai/gpt-5-pro` | 400,000 | 3,200,000 | 44,444 | 0.000015 / 0.00012 |
| `openai/gpt-5-pro:batch` | 400,000 | 3,200,000 | 44,444 | 0.0000075 / 0.00006 |
| `openai/gpt-5.1` | 400,000 | 3,200,000 | 44,444 | 0.00000125 / 0.00001 |
| `openai/gpt-5.1-codex` | 400,000 | 3,200,000 | 44,444 | 0.00000125 / 0.00001 |
| `openai/gpt-5.1-codex-max` | 400,000 | 3,200,000 | 44,444 | 0.00000125 / 0.00001 |
| `openai/gpt-5.1-codex-mini` | 400,000 | 3,200,000 | 44,444 | 0.00000025 / 0.000002 |
| `openai/gpt-5.1:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000625 / 0.000005 |
| `openai/gpt-5.2` | 400,000 | 3,200,000 | 44,444 | 0.00000175 / 0.000014 |
| `openai/gpt-5.2-codex` | 400,000 | 3,200,000 | 44,444 | 0.00000175 / 0.000014 |
| `openai/gpt-5.2-pro` | 400,000 | 3,200,000 | 44,444 | 0.000021 / 0.000168 |
| `openai/gpt-5.2-pro:batch` | 400,000 | 3,200,000 | 44,444 | 0.0000105 / 0.000084 |
| `openai/gpt-5.2:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000875 / 0.000007 |
| `openai/gpt-5.3-codex` | 400,000 | 3,200,000 | 44,444 | 0.00000175 / 0.000014 |
| `openai/gpt-5.4-mini` | 400,000 | 3,200,000 | 44,444 | 0.00000075 / 0.0000045 |
| `openai/gpt-5.4-mini:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000375 / 0.00000225 |
| `openai/gpt-5.4-nano` | 400,000 | 3,200,000 | 44,444 | 0.0000002 / 0.00000125 |
| `openai/gpt-5.4-nano:batch` | 400,000 | 3,200,000 | 44,444 | 0.0000001 / 0.000000625 |
| `openai/gpt-5:batch` | 400,000 | 3,200,000 | 44,444 | 0.000000625 / 0.000005 |
| `openai/gpt-chat-latest` | 400,000 | 3,200,000 | 44,444 | 0.000005 / 0.00003 |
| `~openai/gpt-mini-latest` | 400,000 | 3,200,000 | 44,444 | 0.00000075 / 0.0000045 |
| `amazon/nova-lite-v1` | 300,000 | 2,400,000 | 33,333 | 0.00000006 / 0.00000024 |
| `amazon/nova-pro-v1` | 300,000 | 2,400,000 | 33,333 | 0.0000008 / 0.0000032 |
| `openai/gpt-5.4-image-2` | 272,000 | 2,176,000 | 30,222 | 0.000008 / 0.000015 |
| `arcee-ai/trinity-large-thinking` | 262,144 | 2,097,152 | 29,127 | 0.00000022 / 0.00000085 |
| `bytedance-seed/seed-1.6` | 262,144 | 2,097,152 | 29,127 | 0.00000025 / 0.000002 |
| `bytedance-seed/seed-1.6-flash` | 262,144 | 2,097,152 | 29,127 | 0.000000075 / 0.0000003 |
| `bytedance-seed/seed-2-1-turbo` | 262,144 | 2,097,152 | 29,127 | 0.0000005 / 0.0000025 |
| `bytedance-seed/seed-2.0-code` | 262,144 | 2,097,152 | 29,127 | 0.0000005 / 0.000003 |
| `bytedance-seed/seed-2.0-lite` | 262,144 | 2,097,152 | 29,127 | 0.00000025 / 0.000002 |
| `bytedance-seed/seed-2.0-mini` | 262,144 | 2,097,152 | 29,127 | 0.0000001 / 0.0000004 |
| `google/gemma-3-27b-it` | 262,144 | 2,097,152 | 29,127 | 0.00000008 / 0.00000045 |
| `google/gemma-4-26b-a4b-it` | 262,144 | 2,097,152 | 29,127 | 0.00000007 / 0.00000034 |
| `google/gemma-4-26b-a4b-it:free` | 262,144 | 2,097,152 | 29,127 | 0 / 0 |
| `google/gemma-4-31b-it` | 262,144 | 2,097,152 | 29,127 | 0.00000009 / 0.00000034 |
| `google/gemma-4-31b-it:free` | 262,144 | 2,097,152 | 29,127 | 0 / 0 |
| `inclusionai/ling-3.0-flash` | 262,144 | 2,097,152 | 29,127 | 0.000000021 / 0.000000063 |
| `kwaipilot/kat-coder-pro-v2` | 262,144 | 2,097,152 | 29,127 | 0.0000003 / 0.0000012 |
| `mistralai/devstral-2512` | 262,144 | 2,097,152 | 29,127 | 0.00000044 / 0.0000022 |
| `mistralai/ministral-14b-2512` | 262,144 | 2,097,152 | 29,127 | 0.0000002 / 0.0000002 |
| `mistralai/ministral-8b-2512` | 262,144 | 2,097,152 | 29,127 | 0.00000015 / 0.00000015 |
| `mistralai/mistral-large-2512` | 262,144 | 2,097,152 | 29,127 | 0.0000005 / 0.0000015 |
| `mistralai/mistral-medium-3-5` | 262,144 | 2,097,152 | 29,127 | 0.0000015 / 0.0000075 |
| `mistralai/mistral-small-2603` | 262,144 | 2,097,152 | 29,127 | 0.00000015 / 0.0000006 |
| `moonshotai/kimi-k2-0905` | 262,144 | 2,097,152 | 29,127 | 0.0000006 / 0.0000025 |
| `moonshotai/kimi-k2-thinking` | 262,144 | 2,097,152 | 29,127 | 0.0000006 / 0.0000025 |
| `moonshotai/kimi-k2.5` | 262,144 | 2,097,152 | 29,127 | 0.0000006 / 0.000003 |
| `moonshotai/kimi-k2.6` | 262,144 | 2,097,152 | 29,127 | 0.00000095 / 0.000004 |
| `moonshotai/kimi-k2.7-code` | 262,144 | 2,097,152 | 29,127 | 0.00000067 / 0.0000034 |
| `moonshotai/kimi-k2.7-code:batch` | 262,144 | 2,097,152 | 29,127 | 0.00000095 / 0.000004 |
| `morph/morph-v3-large` | 262,144 | 2,097,152 | 29,127 | 0.0000009 / 0.0000019 |
| `nex-agi/nex-n2-mini` | 262,144 | 2,097,152 | 29,127 | 0.000000025 / 0.0000001 |
| `nex-agi/nex-n2-pro` | 262,144 | 2,097,152 | 29,127 | 0.00000025 / 0.000001 |
| `nvidia/nemotron-3-nano-30b-a3b` | 262,144 | 2,097,152 | 29,127 | 0.00000005 / 0.0000002 |
| `nvidia/nemotron-3-super-120b-a12b:free` | 262,144 | 2,097,152 | 29,127 | 0 / 0 |
| `nvidia/nemotron-3.5-lightning` | 262,144 | 2,097,152 | 29,127 | 0.00000008 / 0.0000002 |
| `poolside/laguna-s-2.1:free` | 262,144 | 2,097,152 | 29,127 | 0 / 0 |
| `poolside/laguna-xs-2.1` | 262,144 | 2,097,152 | 29,127 | 0.00000006 / 0.00000012 |
| `poolside/laguna-xs-2.1:free` | 262,144 | 2,097,152 | 29,127 | 0 / 0 |
| `qwen/qwen3-235b-a22b-2507` | 262,144 | 2,097,152 | 29,127 | 0.00000009 / 0.00000055 |
| `qwen/qwen3-30b-a3b-instruct-2507` | 262,144 | 2,097,152 | 29,127 | 0.00000004815 / 0.00000019305 |
| `qwen/qwen3-coder` | 262,144 | 2,097,152 | 29,127 | 0.0000003 / 0.000001 |
| `qwen/qwen3-coder-30b-a3b-instruct` | 262,144 | 2,097,152 | 29,127 | 0.00000007 / 0.00000028 |
| `qwen/qwen3-coder-next` | 262,144 | 2,097,152 | 29,127 | 0.00000012 / 0.0000008 |
| `qwen/qwen3-max` | 262,144 | 2,097,152 | 29,127 | 0.00000078 / 0.0000039 |
| `qwen/qwen3-max-thinking` | 262,144 | 2,097,152 | 29,127 | 0.00000078 / 0.0000039 |
| `qwen/qwen3-next-80b-a3b-instruct` | 262,144 | 2,097,152 | 29,127 | 0.0000001 / 0.0000011 |
| `qwen/qwen3-next-80b-a3b-thinking` | 262,144 | 2,097,152 | 29,127 | 0.00000015 / 0.0000012 |
| `qwen/qwen3-vl-235b-a22b-instruct` | 262,144 | 2,097,152 | 29,127 | 0.00000021 / 0.0000019 |
| `qwen/qwen3-vl-30b-a3b-instruct` | 262,144 | 2,097,152 | 29,127 | 0.00000013 / 0.00000052 |
| `qwen/qwen3-vl-30b-a3b-thinking` | 262,144 | 2,097,152 | 29,127 | 0.0000002 / 0.0000024 |
| `qwen/qwen3-vl-8b-instruct` | 262,144 | 2,097,152 | 29,127 | 0.000000117 / 0.000000455 |
| `qwen/qwen3.5-122b-a10b` | 262,144 | 2,097,152 | 29,127 | 0.00000026 / 0.00000208 |
| `qwen/qwen3.5-27b` | 262,144 | 2,097,152 | 29,127 | 0.000000195 / 0.00000156 |
| `qwen/qwen3.5-35b-a3b` | 262,144 | 2,097,152 | 29,127 | 0.00000025 / 0.00000125 |
| `qwen/qwen3.5-397b-a17b` | 262,144 | 2,097,152 | 29,127 | 0.00000039 / 0.00000234 |
| `qwen/qwen3.5-9b` | 262,144 | 2,097,152 | 29,127 | 0.0000001 / 0.00000015 |
| `qwen/qwen3.6-27b` | 262,144 | 2,097,152 | 29,127 | 0.0000006 / 0.0000036 |
| `qwen/qwen3.6-35b-a3b` | 262,144 | 2,097,152 | 29,127 | 0.00000014 / 0.000001 |
| `qwen/qwen3.6-max-preview` | 262,144 | 2,097,152 | 29,127 | 0.000001027 / 0.000006162 |
| `sakana/sakana-namazu` | 262,144 | 2,097,152 | 29,127 | 0.00000095 / 0.000004 |
| `stepfun/step-3.5-flash` | 262,144 | 2,097,152 | 29,127 | 0.0000001 / 0.0000003 |
| `stepfun/step-3.7-flash` | 262,144 | 2,097,152 | 29,127 | 0.0000002 / 0.00000115 |
| `tencent/hy3` | 262,144 | 2,097,152 | 29,127 | 0.000000132 / 0.000000528 |
| `tencent/hy3-preview` | 262,144 | 2,097,152 | 29,127 | 0.00000018 / 0.0000006 |
| `cohere/command-a` | 256,000 | 2,048,000 | 28,444 | 0.0000025 / 0.00001 |
| `cohere/north-mini-code:free` | 256,000 | 2,048,000 | 28,444 | 0 / 0 |
| `kwaipilot/kat-coder-air-v2.5` | 256,000 | 2,048,000 | 28,444 | 0.00000015 / 0.0000006 |
| `kwaipilot/kat-coder-pro-v2.5` | 256,000 | 2,048,000 | 28,444 | 0.00000074 / 0.00000296 |
| `mistralai/codestral-2508` | 256,000 | 2,048,000 | 28,444 | 0.0000003 / 0.0000009 |
| `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` | 256,000 | 2,048,000 | 28,444 | 0 / 0 |
| `relace/relace-apply-3` | 256,000 | 2,048,000 | 28,444 | 0.00000085 / 0.00000125 |
| `relace/relace-search` | 256,000 | 2,048,000 | 28,444 | 0.000001 / 0.000003 |
| `x-ai/grok-build-0.1` | 256,000 | 2,048,000 | 28,444 | 0.000001 / 0.000002 |
| `z-ai/glm-5.2:free` | 256,000 | 2,048,000 | 28,444 | 0 / 0 |
| `minimax/minimax-m2` | 204,800 | 1,638,400 | 22,755 | 0.000000255 / 0.00000102 |
| `minimax/minimax-m2.1` | 204,800 | 1,638,400 | 22,755 | 0.0000003 / 0.0000012 |
| `minimax/minimax-m2.5` | 204,800 | 1,638,400 | 22,755 | 0.00000027 / 0.00000108 |
| `minimax/minimax-m2.7` | 204,800 | 1,638,400 | 22,755 | 0.0000003 / 0.0000012 |
| `z-ai/glm-4.6` | 204,800 | 1,638,400 | 22,755 | 0.0000005 / 0.000002 |
| `z-ai/glm-4.7` | 204,800 | 1,638,400 | 22,755 | 0.0000004 / 0.00000175 |
| `z-ai/glm-5` | 204,800 | 1,638,400 | 22,755 | 0.0000006 / 0.00000192 |
| `z-ai/glm-5.1` | 204,800 | 1,638,400 | 22,755 | 0.00000126 / 0.00000396 |
| `z-ai/glm-4.7-flash` | 202,752 | 1,622,016 | 22,528 | 0.00000006 / 0.0000004 |
| `z-ai/glm-5-turbo` | 202,752 | 1,622,016 | 22,528 | 0.0000012 / 0.000004 |
| `z-ai/glm-5v-turbo` | 202,752 | 1,622,016 | 22,528 | 0.0000012 / 0.000004 |
| `anthropic/claude-3-haiku` | 200,000 | 1,600,000 | 22,222 | 0.00000025 / 0.00000125 |
| `anthropic/claude-haiku-4.5` | 200,000 | 1,600,000 | 22,222 | 0.000001 / 0.000005 |
| `anthropic/claude-haiku-4.5:batch` | 200,000 | 1,600,000 | 22,222 | 0.0000005 / 0.0000025 |
| `anthropic/claude-opus-4` | 200,000 | 1,600,000 | 22,222 | 0.000015 / 0.000075 |
| `anthropic/claude-opus-4.1` | 200,000 | 1,600,000 | 22,222 | 0.000015 / 0.000075 |
| `anthropic/claude-opus-4.1:batch` | 200,000 | 1,600,000 | 22,222 | 0.0000075 / 0.0000375 |
| `anthropic/claude-opus-4.5` | 200,000 | 1,600,000 | 22,222 | 0.000005 / 0.000025 |
| `anthropic/claude-opus-4.5:batch` | 200,000 | 1,600,000 | 22,222 | 0.0000025 / 0.0000125 |
| `openai/o1` | 200,000 | 1,600,000 | 22,222 | 0.000015 / 0.00006 |
| `openai/o1-pro` | 200,000 | 1,600,000 | 22,222 | 0.00015 / 0.0006 |
| `openai/o1-pro:batch` | 200,000 | 1,600,000 | 22,222 | 0.000075 / 0.0003 |
| `openai/o1:batch` | 200,000 | 1,600,000 | 22,222 | 0.0000075 / 0.00003 |
| `openai/o3` | 200,000 | 1,600,000 | 22,222 | 0.000002 / 0.000008 |
| `openai/o3-mini` | 200,000 | 1,600,000 | 22,222 | 0.0000011 / 0.0000044 |
| `openai/o3-mini-high` | 200,000 | 1,600,000 | 22,222 | 0.0000011 / 0.0000044 |
| `openai/o3-mini-high:batch` | 200,000 | 1,600,000 | 22,222 | 0.00000055 / 0.0000022 |
| `openai/o3-mini:batch` | 200,000 | 1,600,000 | 22,222 | 0.00000055 / 0.0000022 |
| `openai/o3-pro` | 200,000 | 1,600,000 | 22,222 | 0.00002 / 0.00008 |
| `openai/o3-pro:batch` | 200,000 | 1,600,000 | 22,222 | 0.00001 / 0.00004 |
| `openai/o3:batch` | 200,000 | 1,600,000 | 22,222 | 0.000001 / 0.000004 |
| `openai/o4-mini` | 200,000 | 1,600,000 | 22,222 | 0.0000011 / 0.0000044 |
| `openai/o4-mini-high` | 200,000 | 1,600,000 | 22,222 | 0.0000011 / 0.0000044 |
| `openai/o4-mini-high:batch` | 200,000 | 1,600,000 | 22,222 | 0.00000055 / 0.0000022 |
| `openai/o4-mini:batch` | 200,000 | 1,600,000 | 22,222 | 0.00000055 / 0.0000022 |
| `openrouter/free` | 200,000 | 1,600,000 | 22,222 | 0 / 0 |
| `perplexity/sonar-pro` | 200,000 | 1,600,000 | 22,222 | 0.000003 / 0.000015 |
| `perplexity/sonar-pro-search` | 200,000 | 1,600,000 | 22,222 | 0.000003 / 0.000015 |
| `~anthropic/claude-haiku-latest` | 200,000 | 1,600,000 | 22,222 | 0.000001 / 0.000005 |
| `minimax/minimax-m2.7:free` | 196,608 | 1,572,864 | 21,845 | 0 / 0 |
| `deepseek/deepseek-chat` | 163,840 | 1,310,720 | 18,204 | 0.0000002574 / 0.0000010287 |
| `deepseek/deepseek-chat-v3-0324` | 163,840 | 1,310,720 | 18,204 | 0.00000025 / 0.000001 |
| `deepseek/deepseek-chat-v3.1` | 163,840 | 1,310,720 | 18,204 | 0.00000055 / 0.00000165 |
| `deepseek/deepseek-r1-0528` | 163,840 | 1,310,720 | 18,204 | 0.0000005 / 0.00000215 |
| `deepseek/deepseek-v3.1-terminus` | 163,840 | 1,310,720 | 18,204 | 0.00000027 / 0.000001 |
| `deepseek/deepseek-v3.2` | 163,840 | 1,310,720 | 18,204 | 0.00000026 / 0.00000038 |
| `deepseek/deepseek-v3.2-exp` | 163,840 | 1,310,720 | 18,204 | 0.00000027 / 0.00000041 |
| `meta-llama/llama-guard-4-12b` | 163,840 | 1,310,720 | 18,204 | 0.00000018 / 0.00000018 |
| `aion-labs/aion-2.0` | 131,072 | 1,048,576 | 14,563 | 0.0000008 / 0.0000016 |
| `aion-labs/aion-3.0` | 131,072 | 1,048,576 | 14,563 | 0.000003 / 0.000006 |
| `aion-labs/aion-3.0-mini` | 131,072 | 1,048,576 | 14,563 | 0.0000007 / 0.0000014 |
| `arcee-ai/virtuoso-large` | 131,072 | 1,048,576 | 14,563 | 0.00000075 / 0.0000012 |
| `google/gemini-3-pro-image` | 131,072 | 1,048,576 | 14,563 | 0.000002 / 0.000012 |
| `google/gemini-3.1-flash-image` | 131,072 | 1,048,576 | 14,563 | 0.0000005 / 0.000003 |
| `google/gemma-3-12b-it` | 131,072 | 1,048,576 | 14,563 | 0.00000005 / 0.00000015 |
| `google/gemma-3-4b-it` | 131,072 | 1,048,576 | 14,563 | 0.00000005 / 0.0000001 |
| `ibm-granite/granite-4.1-8b` | 131,072 | 1,048,576 | 14,563 | 0.00000005 / 0.0000001 |
| `meta-llama/llama-3.1-70b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.0000004 / 0.0000004 |
| `meta-llama/llama-3.1-8b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.00000005 / 0.00000008 |
| `meta-llama/llama-3.2-3b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.00000005 / 0.00000033 |
| `meta-llama/llama-3.3-70b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.00000071 / 0.00000071 |
| `meta/muse-glimmer-30b` | 131,072 | 1,048,576 | 14,563 | 0.00000035 / 0.0000015 |
| `mistralai/ministral-3b-2512` | 131,072 | 1,048,576 | 14,563 | 0.0000001 / 0.0000001 |
| `mistralai/mistral-large-2407` | 131,072 | 1,048,576 | 14,563 | 0.000002 / 0.000006 |
| `mistralai/mistral-medium-3` | 131,072 | 1,048,576 | 14,563 | 0.0000004 / 0.000002 |
| `mistralai/mistral-medium-3.1` | 131,072 | 1,048,576 | 14,563 | 0.0000004 / 0.000002 |
| `mistralai/mistral-nemo` | 131,072 | 1,048,576 | 14,563 | 0.000000019 / 0.00000003 |
| `mistralai/mistral-small-3.2-24b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.000000075 / 0.0000002 |
| `moonshotai/kimi-k2` | 131,072 | 1,048,576 | 14,563 | 0.00000057 / 0.0000023 |
| `nousresearch/hermes-3-llama-3.1-405b` | 131,072 | 1,048,576 | 14,563 | 0.000001 / 0.000001 |
| `nousresearch/hermes-3-llama-3.1-70b` | 131,072 | 1,048,576 | 14,563 | 0.0000007 / 0.0000007 |
| `nousresearch/hermes-4-405b` | 131,072 | 1,048,576 | 14,563 | 0.000001 / 0.000003 |
| `nousresearch/hermes-4-70b` | 131,072 | 1,048,576 | 14,563 | 0.00000013 / 0.0000004 |
| `openai/gpt-oss-120b` | 131,072 | 1,048,576 | 14,563 | 0.000000037 / 0.00000017 |
| `openai/gpt-oss-20b` | 131,072 | 1,048,576 | 14,563 | 0.00000003 / 0.00000013 |
| `openai/gpt-oss-safeguard-20b` | 131,072 | 1,048,576 | 14,563 | 0.000000075 / 0.0000003 |
| `qwen/qwen3-14b` | 131,072 | 1,048,576 | 14,563 | 0.00000012 / 0.00000024 |
| `qwen/qwen3-235b-a22b` | 131,072 | 1,048,576 | 14,563 | 0.000000455 / 0.00000182 |
| `qwen/qwen3-235b-a22b-thinking-2507` | 131,072 | 1,048,576 | 14,563 | 0.00000023 / 0.0000023 |
| `qwen/qwen3-30b-a3b` | 131,072 | 1,048,576 | 14,563 | 0.00000012 / 0.0000005 |
| `qwen/qwen3-32b` | 131,072 | 1,048,576 | 14,563 | 0.00000008 / 0.00000028 |
| `qwen/qwen3-8b` | 131,072 | 1,048,576 | 14,563 | 0.000000117 / 0.000000455 |
| `qwen/qwen3-vl-235b-a22b-thinking` | 131,072 | 1,048,576 | 14,563 | 0.0000004 / 0.000004 |
| `qwen/qwen3-vl-32b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.000000104 / 0.000000416 |
| `qwen/qwen3-vl-8b-thinking` | 131,072 | 1,048,576 | 14,563 | 0.00000018 / 0.0000021 |
| `sao10k/l3.1-euryale-70b` | 131,072 | 1,048,576 | 14,563 | 0.00000085 / 0.00000085 |
| `sao10k/l3.3-euryale-70b` | 131,072 | 1,048,576 | 14,563 | 0.00000065 / 0.00000075 |
| `tencent/hunyuan-a13b-instruct` | 131,072 | 1,048,576 | 14,563 | 0.00000014 / 0.00000057 |
| `thedrummer/cydonia-24b-v4.1` | 131,072 | 1,048,576 | 14,563 | 0.0000003 / 0.0000005 |
| `upstage/solar-pro-3` | 131,072 | 1,048,576 | 14,563 | 0.00000015 / 0.0000006 |
| `z-ai/glm-4.5` | 131,072 | 1,048,576 | 14,563 | 0.0000006 / 0.0000022 |
| `z-ai/glm-4.5-air` | 131,072 | 1,048,576 | 14,563 | 0.00000013 / 0.00000085 |
| `z-ai/glm-4.6v` | 131,072 | 1,048,576 | 14,563 | 0.0000003 / 0.0000009 |
| `ibm-granite/granite-4.0-h-micro` | 131,000 | 1,048,000 | 14,555 | 0.000000017 / 0.000000112 |
| `amazon/nova-micro-v1` | 128,000 | 1,024,000 | 14,222 | 0.000000035 / 0.00000014 |
| `bytedance/ui-tars-1.5-7b` | 128,000 | 1,024,000 | 14,222 | 0.0000001 / 0.0000002 |
| `cognitivecomputations/dolphin-mistral-24b-venice-edition` | 128,000 | 1,024,000 | 14,222 | 0.0000002 / 0.0000009 |
| `cohere/command-r-08-2024` | 128,000 | 1,024,000 | 14,222 | 0.00000015 / 0.0000006 |
| `cohere/command-r-plus-08-2024` | 128,000 | 1,024,000 | 14,222 | 0.0000025 / 0.00001 |
| `cohere/command-r7b-12-2024` | 128,000 | 1,024,000 | 14,222 | 0.0000000375 / 0.00000015 |
| `inception/mercury-2` | 128,000 | 1,024,000 | 14,222 | 0.00000025 / 0.00000075 |
| `mistralai/ministral-8b` | 128,000 | 1,024,000 | 14,222 | 0.00000011 / 0.00000011 |
| `mistralai/mistral-large` | 128,000 | 1,024,000 | 14,222 | 0.000002 / 0.000006 |
| `mistralai/mistral-small-3.1-24b-instruct` | 128,000 | 1,024,000 | 14,222 | 0.000000351 / 0.000000555 |
| `nvidia/nemotron-3.5-content-safety:free` | 128,000 | 1,024,000 | 14,222 | 0 / 0 |
| `openai/gpt-4-turbo` | 128,000 | 1,024,000 | 14,222 | 0.00001 / 0.00003 |
| `openai/gpt-4-turbo-preview` | 128,000 | 1,024,000 | 14,222 | 0.00001 / 0.00003 |
| `openai/gpt-4-turbo:batch` | 128,000 | 1,024,000 | 14,222 | 0.000005 / 0.000015 |
| `openai/gpt-4o` | 128,000 | 1,024,000 | 14,222 | 0.0000025 / 0.00001 |
| `openai/gpt-4o-2024-05-13` | 128,000 | 1,024,000 | 14,222 | 0.000005 / 0.000015 |
| `openai/gpt-4o-2024-08-06` | 128,000 | 1,024,000 | 14,222 | 0.0000025 / 0.00001 |
| `openai/gpt-4o-2024-11-20` | 128,000 | 1,024,000 | 14,222 | 0.0000025 / 0.00001 |
| `openai/gpt-4o-mini` | 128,000 | 1,024,000 | 14,222 | 0.00000015 / 0.0000006 |
| `openai/gpt-4o-mini-2024-07-18` | 128,000 | 1,024,000 | 14,222 | 0.00000015 / 0.0000006 |
| `openai/gpt-4o-mini:batch` | 128,000 | 1,024,000 | 14,222 | 0.000000075 / 0.0000003 |
| `openai/gpt-4o:batch` | 128,000 | 1,024,000 | 14,222 | 0.00000125 / 0.000005 |
| `openai/gpt-5.2-chat` | 128,000 | 1,024,000 | 14,222 | 0.00000175 / 0.000014 |
| `openai/gpt-audio` | 128,000 | 1,024,000 | 14,222 | 0.0000025 / 0.00001 |
| `openai/gpt-audio-mini` | 128,000 | 1,024,000 | 14,222 | 0.0000006 / 0.0000024 |
| `openrouter/bodybuilder` | 128,000 | 1,024,000 | 14,222 | -1 / -1 |
| `perplexity/sonar-deep-research` | 128,000 | 1,024,000 | 14,222 | 0.000002 / 0.000008 |
| `perplexity/sonar-reasoning-pro` | 128,000 | 1,024,000 | 14,222 | 0.000002 / 0.000008 |
| `qwen/qwen2.5-vl-72b-instruct` | 128,000 | 1,024,000 | 14,222 | 0.00000025 / 0.00000075 |
| `perplexity/sonar` | 127,072 | 1,016,576 | 14,119 | 0.000001 / 0.000001 |
| `baidu/ernie-4.5-vl-424b-a47b` | 123,000 | 984,000 | 13,666 | 0.00000042 / 0.00000125 |
| `morph/morph-v3-fast` | 81,920 | 655,360 | 9,102 | 0.0000008 / 0.0000012 |
| `qwen/qwen3-30b-a3b-thinking-2507` | 81,920 | 655,360 | 9,102 | 0.0000002 / 0.0000024 |
| `allenai/olmo-3-32b-think` | 65,536 | 524,288 | 7,281 | 0.00000015 / 0.0000005 |
| `google/gemini-3-pro-image-preview` | 65,536 | 524,288 | 7,281 | 0.000002 / 0.000012 |
| `google/gemini-3.1-flash-image-preview` | 65,536 | 524,288 | 7,281 | 0.0000005 / 0.000003 |
| `google/gemini-3.1-flash-lite-image` | 65,536 | 524,288 | 7,281 | 0.00000025 / 0.0000015 |
| `liquid/lfm-2.5-2.6b:free` | 65,536 | 524,288 | 7,281 | 0 / 0 |
| `minimax/minimax-m2-her` | 65,536 | 524,288 | 7,281 | 0.0000003 / 0.0000012 |
| `mistralai/mixtral-8x22b-instruct` | 65,536 | 524,288 | 7,281 | 0.000002 / 0.000006 |
| `rekaai/reka-flash-3` | 65,536 | 524,288 | 7,281 | 0.0000001 / 0.0000002 |
| `thedrummer/rocinante-12b` | 65,536 | 524,288 | 7,281 | 0.00000025 / 0.0000005 |
| `z-ai/glm-4.5v` | 65,536 | 524,288 | 7,281 | 0.0000006 / 0.0000018 |
| `microsoft/wizardlm-2-8x22b` | 65,535 | 524,280 | 7,281 | 0.00000062 / 0.00000062 |
| `deepseek/deepseek-r1` | 64,000 | 512,000 | 7,111 | 0.0000007 / 0.0000025 |
| `meta-llama/llama-3.2-1b-instruct` | 60,000 | 480,000 | 6,666 | 0.000000027 / 0.000000201 |
| `aion-labs/aion-rp-llama-3.1-8b` | 32,768 | 262,144 | 3,640 | 0.0000008 / 0.0000016 |
| `anthracite-org/magnum-v4-72b` | 32,768 | 262,144 | 3,640 | 0.000003 / 0.000005 |
| `google/gemini-2.5-flash-image` | 32,768 | 262,144 | 3,640 | 0.0000003 / 0.0000025 |
| `mistralai/mistral-saba` | 32,768 | 262,144 | 3,640 | 0.0000002 / 0.0000006 |
| `mistralai/mistral-small-24b-instruct-2501` | 32,768 | 262,144 | 3,640 | 0.00000005 / 0.00000008 |
| `perceptron/perceptron-mk1` | 32,768 | 262,144 | 3,640 | 0.00000015 / 0.0000015 |
| `qwen/qwen-2.5-72b-instruct` | 32,768 | 262,144 | 3,640 | 0.00000036 / 0.0000004 |
| `qwen/qwen-2.5-7b-instruct` | 32,768 | 262,144 | 3,640 | 0.0000001 / 0.0000002 |
| `qwen/qwen-2.5-coder-32b-instruct` | 32,768 | 262,144 | 3,640 | 0.00000066 / 0.000001 |
| `thedrummer/skyfall-36b-v2` | 32,768 | 262,144 | 3,640 | 0.00000055 / 0.0000008 |
| `mistralai/voxtral-small-24b-2507` | 32,000 | 256,000 | 3,555 | 0.0000001 / 0.0000003 |
| `openai/gpt-3.5-turbo` | 16,385 | 131,080 | 1,820 | 0.0000005 / 0.0000015 |
| `openai/gpt-3.5-turbo-16k` | 16,385 | 131,080 | 1,820 | 0.000003 / 0.000004 |
| `openai/gpt-3.5-turbo:batch` | 16,385 | 131,080 | 1,820 | 0.00000025 / 0.00000075 |
| `microsoft/phi-4` | 16,384 | 131,072 | 1,820 | 0.00000007 / 0.00000014 |
| `rekaai/reka-edge` | 16,384 | 131,072 | 1,820 | 0.0000001 / 0.0000001 |
| `deepseek/deepseek-r1-distill-llama-70b` | 8,192 | 65,536 | 910 | 0.0000008 / 0.0000008 |
| `google/gemma-2-27b-it` | 8,192 | 65,536 | 910 | 0.00000065 / 0.00000065 |
| `gryphe/mythomax-l2-13b` | 8,192 | 65,536 | 910 | 0.00000006 / 0.00000006 |
| `sao10k/l3-lunaris-8b` | 8,192 | 65,536 | 910 | 0.00000004 / 0.00000005 |
| `tencent/hy-mt2-1.8b` | 8,192 | 65,536 | 910 | 0.000000044 / 0.000000177 |
| `tencent/hy-mt2-30b-a3b` | 8,192 | 65,536 | 910 | 0.000000074 / 0.000000295 |
| `tencent/hy-mt2-7b` | 8,192 | 65,536 | 910 | 0.000000074 / 0.000000295 |
| `openai/gpt-4` | 8,191 | 65,528 | 910 | 0.00003 / 0.00006 |
| `mancer/weaver` | 8,000 | 64,000 | 888 | 0.0000005 / 0.00000075 |
| `undi95/remm-slerp-l2-13b` | 6,144 | 49,152 | 682 | 0.00000045 / 0.00000065 |
| `openai/gpt-3.5-turbo-0613` | 4,095 | 32,760 | 455 | 0.000001 / 0.000002 |
| `openai/gpt-3.5-turbo-instruct` | 4,095 | 32,760 | 455 | 0.0000015 / 0.000002 |

**Census receipt** `12fa1347-423c-8105-b500-fe790d5674a9` — as hexbits `[1, 2, 15, 10, 1, 3, 4, 7, 4, 2, 3, 12, 8, 1, 0, 5, 11, 5, 0, 0, 15, 14, 7, 9, 0, 13, 5, 6, 7, 4, 10, 9]` — recompute it from the same
mirror and it returns, byte for byte. The mirror refreshes from the live feed on every lean run; a model that
enters or leaves the feed enters or leaves this page, re-sealed.
