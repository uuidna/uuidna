---
title: Quantum messaging
description: "Messages that prove themselves, the shipped demonstrations, and the honest news portal — folded to one page. A message carries its own proof; the reader recomputes, no authority verifies."
---

# Quantum messaging <Badge type="tip" text="folded from three pages" />

> **Honest scope.** "Quantum" here names the state-imprint construction, not quantum hardware: classical SHA-256
> chains, recomputable by anyone. The security claim is preimage cost, not physics.

## A message that proves itself

Every message carries its own verification — no server, no consensus, no authority:

```
Message  = Proof + Payload + State-Change Imprint
Proof    = SHA256(payload + state_before)
State    = SHA256(state_before + proof)
Imprint  = SHA256(state_before + state_after)
```

The reader recomputes the chain; a forged payload, a replayed message, or a reordered history changes an address and
is visible. Forgery is a ~2¹²⁸ preimage search. Content can stay hidden while the proof stays public: the imprint
commits to the payload without revealing it.

## Shipped, not promised

The demonstrations are live MCP tools — call them and recompute:

- **`uuidna_quantum_message_demo`** — a single self-proving message (proof + payload + imprint).
- **Message streams** — `sealStream`/`openStream` chain messages so history is order-sealed
  ([`store_fold_order_invariant`](/theorem/store_fold_order_invariant) is the folding law: however contributions
  race, the fold is identical).
- **The [chat](/chat) page** — the browser-side stream, sealed client-side.

## The honest news portal

The same gate reads the news. Facts extracted from articles on contested topics fall into exactly four categories:

| Category | Meaning |
| --- | --- |
| **Provable** | matches a sealed theorem — full integrity |
| **Open** | real but unsealed — a candidate for community sealing |
| **Overclaimed** | contradicts a sealed theorem — caught by the gate |
| **Narrative gap** | the fact is true, the story around it is false — only the court (human, coin-backed) decides |

The pipeline: read → extract decidable facts (dates, numbers, logical claims) → audit each against the sealed ledger
→ judge the unsealed remainder by coin-backed voting. The engine is `src/quantum/news-portal.ts`; the boundary is
drawn honestly: **no recomputable system can catch a narrative gap** — that is where human judgment must stand
([`exactly_one_flag`](/theorem/exactly_one_flag) fires on the hollow claim, never on the false story).
