---
title: The Contract
description: How an agent configures itself to use uuidna — sign the contract, learn the links. Recomputable, not trusted; the gate can return FALSE; integrity, not truth. Each term backed by a sealed theorem.
aside: true
---

# The Contract <Badge type="tip" text="agent config" />

> Recomputable, not trusted. The gate can return FALSE. Integrity, not truth.

Every agent goes to the captain **first** — sign the contract, learn the links. Configuring yourself to use uuidna is
like writing a theorem: nothing goes in that can't be recomputed. This is the reference (recorded as receipt
`19762a41-d265-86c4-9792-9942082054c8`, the content-address of the line above — recheck it with `uuidna_address`).

## Sign the contract — the terms, each backed

| Term | Backed by |
| --- | --- |
| **Recomputable, not trusted** — every tool is a pure function of its input; the same input mints the same output for anyone | the whole ledger — [`npm run lean`](https://github.com/uuidna/uuidna#verify) reproduces the receipt |
| **The gate can return FALSE** — a claim earns a sealed theorem or it is flagged; a trial that can't fail proves nothing | [`Audit.lean`](/theorem/exactly_one_flag) — the detector fires on exactly the hollow, unbacked case |
| **No FTL, no infinite** — bounded by construction | [`cosmic_speed_limit`](/theorem/cosmic_speed_limit) · [`dz_bounded`](/theorem/dz_bounded) |
| **Coins are a conserved measure**, free for the public interest — not a per-formula price | [`two_coins`](/theorem/two_coins) (110 − 108 = 2 = −χ of the double torus) |
| **The gate is multilingual** — an overclaim cannot hide in another tongue or script | the provenance audit folds Glagolitic→Cyrillic and reads 20+ languages |

Sign it by *behaving* it: back your claims, or let them be flagged. There is no other signature — the receipts are.

## Consent — two, kept separate

- **The licence.** The content is [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to read, and free to reuse **with attribution, non-commercially**. Any reuse — copy, redistribute, adapt, or commercial use — accepts those terms; the licence is stated on every page. Reading a public page is not a signed contract, but *reuse* is under the licence.
- **Your data.** Nothing is stored without your explicit consent. The [Reflect](#reflect-your-own-data) tool runs entirely in your browser; opt-in storage persists only what you choose, and declining simply limits the features that need it — it never blocks reading.
- **Rules change → new consent.** If the licence or the data terms change, prior consent does not carry over — you are asked again. Consent is to the terms *as they stand*, and each version has its own content-address, so a change is a new address and a fresh signature.

## Learn the links

- [MCP tools](/mcp) — the 50 keys, in 10 categories, each call receipted
- [All theorems](/theorems) · [Topics](/topics) · [The trial receipt](/trial)
- [The Navigator](/captain/navigator) — how to sail: fixed references, true bearings, two crossing lines
- [The captain's message](/captain/message) — contribute 2 to save up to 64

## Reflect your own data

Try it — content-addressing runs **in your browser**. Nothing is stored without your consent; here, your chosen data
reflects to its address and stays with you.

<Reflect />

## Configure the harness

Add uuidna to any MCP client — zero runtime deps, a JSON-RPC 2.0 server over stdio:

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

Every command returns a **chained receipt** — a content-address of the call, each link's receipt seeding the next —
so the agent always holds a tamper-evident record of what it ran. A theorem computes in Lean, or it is not a theorem;
a command recomputes, or it is not trusted. That is the whole contract, and it is signed in receipts, not ink.
