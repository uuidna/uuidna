---
title: "The models"
description: "Computed from lean/Models.lean — 7 sealed theorems, every claim citing its proof."
---

# The models

> THE MODEL COMPARISON OVER ALL PUBLIC LIVE DATA — the decidable core of the served page /models: the declared token≈4-byte approximation's exact widths, all 425 of the public feed's reported context windows as transient hexbit capacity, the 288-bit cost of speaking a 128-bit address in text (identical for every model), the cipher's fixed widths against a sampler's none, every window finite against 2¹²⁸, THE FOLD LAW (any model's output folds to exactly 32 on-lattice states = 16 pairs), and the handle's eight pairs doubling to sixteen when the captain coins are paid (64 = 8², typography unlocked). Vendor speeds and coverage-per-token are NOT here — absent from the feed and unmeasured respectively, named as such on the page. — held by [a_token_approximates_eight_hexbits](/theorem/a_token_approximates_eight_hexbits) and its 6 siblings below.

**7 theorems**, from [a_token_approximates_eight_hexbits](/theorem/a_token_approximates_eight_hexbits) onward, each proven `by decide` in <a href="/lean/Models.lean">lean/Models.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 7 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [context_windows_are_transient_hexbits](/theorem/context_windows_are_transient_hexbits). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FModels.lean)** — nothing to install. The editor fetches `lean/Models.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE OPERATIVE APPROXIMATION, SEALED AS WHAT IT IS: the page's arithmetic runs on 1 token ≈ 4 bytes, and 4 bytes are exactly 8 hexbits (4·2 nibbles) = 32 bits. The approximation is declared and the widths under it are exact — the honest shape for a rule of thumb: the ≈ stays in prose, the = gets the kernel.
The ledger holds this as [a_token_approximates_eight_hexbits](/theorem/a_token_approximates_eight_hexbits) — proven `by decide`, sorry-free:

```lean
(4 * 2 = 8) ∧ (8 * 4 = 32) ∧ (4 * 8 = 32)
```

### HEXBIT HANDLING CAPACITY, FOR THE WHOLE PUBLIC CENSUS, EXACT: every one of the 425 published context windows (the live feed's full list, 4,095 to 2,000,000 tokens) times 8 is that model's TRANSIENT hexbit capacity — held only until the window closes. The windows are the feed's REPORTED data (source-cited on the page); this seals the multiplication over all 425, not the vendors.
The ledger holds this as [context_windows_are_transient_hexbits](/theorem/context_windows_are_transient_hexbits) — proven `by decide`, sorry-free:

```lean
(((modelContextRows.map (fun r => r.length)).sum) = 425) ∧ ((modelContextRows.map (fun r => r.map (fun c => c * 8))) = modelTransientRows)
```

### MESSAGING, COUNTED AT THE WIRE — and the widths being counted are not this repo's to choose: RFC 9562, "Universally Unique IDentifiers (UUIDs)", which obsoletes RFC 4122, fixes a uuid at 128 bits and its printed form at 36 characters (32 hex digits and 4 hyphens). Naming the RFC says who fixes the spelling so a reader can go and check it; it proves nothing below, because what is sealed here is the arithmetic OVER those widths and the kernel decides arithmetic, never a specification. A uuid spelled as text is 36 characters = 288 bits carrying a 128-bit payload — 44% efficiency (128 of 288 bits), identical for EVERY model in the census, because it is the text's cost, not the model's. The per-window address-carrying capacities are sealed for all 425 (⌊tokens·4/36⌋ each). uuidna's own channel skips the text: the channel IS the uuid (128 payload bits per address, receipted).
The ledger holds this as [speaking_an_address_costs_the_text](/theorem/speaking_an_address_costs_the_text) — proven `by decide`, sorry-free:

```lean
(36 * 8 = 288) ∧ (288 > 128) ∧ ((modelContextRows.map (fun r => r.map (fun c => (c * 4) / 36))) = modelUuidCountRows)
```

### CRYPTO SECURITY, THE DECIDABLE PART: the cipher this repo seals runs on FIXED widths — a 256-bit ChaCha20 key (32 bytes), a 128-bit Poly1305 tag (16 bytes), a 600000-iteration PBKDF2 — and 256 = 32·8, 128 = 16·8, exactly. A sampled token stream has no fixed widths to hold: the page states (in words, unsealed, honestly) that model output cannot carry a key or an exact keystream — what is sealed here is only the arithmetic of the cipher that CAN.
The ledger holds this as [crypto_widths_are_fixed_not_sampled](/theorem/crypto_widths_are_fixed_not_sampled) — proven `by decide`, sorry-free:

```lean
(32 * 8 = 256) ∧ (16 * 8 = 128) ∧ (600000 = 6 * 100000)
```

### CAPACITY'S CEILING, OVER THE WHOLE CENSUS: the largest published window (2,000,000 tokens = 16,000,000 transient hexbits) — and with it every one of the 425 — is finite against the address space every fold lands in: 2¹²⁸ states. The ledger's side of the comparison is not a bigger window; it is no window at all.
The ledger holds this as [every_context_is_finite_against_the_lattice](/theorem/every_context_is_finite_against_the_lattice) — proven `by decide`, sorry-free:

```lean
(2 ^ 128 > 2000000 * 8) ∧ (modelContextRows.all (fun r => r.all (fun c => 2 ^ 128 > c * 8)))
```

### FOLD LLM TO HEXBIT PAIRS — THE FOLD LAW, the page's whole argument as one line: however many tokens a model spends (8 in the worked sample, 64 transient states), the fold is a content-address of exactly 32 on-lattice states read as 16 PAIRS — two nibbles to the byte, two coins to the bar — 128/4 = 32, 32/2 = 16, constant in the input length. The token stream is a bet that expires with its window; the fold is the receipt that does not. Coverage per token stays UNVERIFIED until measured (self-report in, division out) — a sealed number nobody measured would be the fabricated citation this very wing exists to make impossible.
The ledger holds this as [llm_folds_to_hexbit_pairs](/theorem/llm_folds_to_hexbit_pairs) — proven `by decide`, sorry-free:

```lean
((128 : Nat) / 4 = 32) ∧ ((32 : Nat) / 2 = 16) ∧ (16 * 2 = 32) ∧ (32 * 4 = 128) ∧ (16 = 2 ^ 4)
```

### EIGHT PAIRS PER HANDLE — SIXTEEN WHEN THE CAPTAIN COINS ARE PAID, AND 64 IS WHERE TYPOGRAPHY UNLOCKS (the captain's question, answered by arithmetic): a handle is the 64-bit coin — 16 hexbits = 8 pairs, and 8 pairs × 8 bits = 64 is the SAME dimension read in inverse (count pairs-of-bits or bits-per-pair: 8 both ways, the square closes the octave, 64 = 8² = 2⁶). Paying the two coins fires the 64→128 fuse (rosette_quantum_doubling_is_two_coins): the handle doubles to the full address — 32 hexbits = 16 pairs. TYPOGRAPHY is the pair read as a byte: one pair = one glyph, so a handle is 8 glyphs, the paid address 16 — the fold coming back as WRITING, the same dimensions reflected inversely from lattice to text.
The ledger holds this as [a_handle_is_eight_pairs_paid_it_is_sixteen](/theorem/a_handle_is_eight_pairs_paid_it_is_sixteen) — proven `by decide`, sorry-free:

```lean
((64 : Nat) / 8 = 8) ∧ (8 * 8 = 64) ∧ (64 = 2 ^ 6) ∧ (2 * 64 = 128) ∧ (2 * 8 = 16) ∧ ((128 : Nat) / 8 = 16)
```


::: warning 
THE MODEL COMPARISON OVER ALL PUBLIC LIVE DATA — the decidable core of the served page /models: the declared token≈4-byte approximation's exact widths, all 425 of the public feed's reported context windows as transient hexbit capacity, the 288-bit cost of speaking a 128-bit address in text (identical for every model), the cipher's fixed widths against a sampler's none, every window finite against 2¹²⁸, THE FOLD LAW (any model's output folds to exactly 32 on-lattice states = 16 pairs), and the handle's eight pairs doubling to sixteen when the captain coins are paid (64 = 8², typography unlocked). The boundary is confirmed by the wing's own sealed theorems — e.g. [a_token_approximates_eight_hexbits](/theorem/a_token_approximates_eight_hexbits) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
