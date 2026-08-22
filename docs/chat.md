---
title: Chat
description: 'What chat means in uuidna — not a chatbot, but two real things. Agents converse through receipted MCP tool calls (the receipt chain is the transcript), and parties exchange encrypted messages as uuid streams. Try the messaging live, in your browser.'
---

# Chat <Badge type="tip" text="receipted" />

> Not a chatbot — a conversation you can recompute, and messages only the keyholder can read.

There is no language model on this page, and uuidna does not pretend to be one. "Chat" here is two concrete things that
**do** exist and recompute: agents conversing through the **MCP**, and parties exchanging **encrypted messages**.

## Agents chat through the MCP

An agent's conversation with uuidna is a sequence of **tool calls**, and every call returns a chained **receipt**
(`receipt · seq · referer`) — a content-address of that command, hardened from the one before it. So the transcript
isn't a claim about what was said; it's a **recomputable chain** anyone can recheck. The "intelligence" is the sealed
theorems and the tools, not a model's fluency — which is why a uuidna answer can be *verified*, not just trusted.
Browse the [64 MCP tools](/mcp); connect the server and every turn you take is receipted.

**Have that conversation here.** The terminal below IS the agents' chat, live: every line is a tool call on
the same wire (`/mcp`), through the same gate, depositing the same two coins — and a plain sentence routes to
the matching tool **deterministically**, by content words against the live-learned toolbox
([`llm_folds_to_hexbit_pairs`](/theorem/llm_folds_to_hexbit_pairs) holds the fold; there is still no language
model on this page, and the router shows its reasoning instead of guessing). The same singularity app serves
[/terminal](/terminal); the transcript compiles to the lattice as you type:

<UuidnaTerminal />

**A trial is authoritative only when signed by uuidna.com.** Send a claim to the live `uuidna.com/trials` and it
comes back with a `signature` — an HMAC keyed by a secret only uuidna.com holds. A fork running the same public code
recomputes the *same* verdict (that is the strength), but it **cannot forge the signature**, so it cannot pass its
trials off as uuidna.com's. Honest scope: this is a symmetric MAC — you verify it by re-requesting the same statement
from uuidna.com (the signature is deterministic), not with a public key; the verdict itself stays recomputable by
anyone via its receipt.

## People chat in encrypted streams

Between parties, a message is sealed (pure-TS ChaCha20-Poly1305) and carried **as a stream of uuids** — the channel
*is* the uuid stream. Seal one below and watch it form, then arrive and decrypt. It runs in your browser; nothing is
sent:

<MessageStream />

For real confidentiality between two parties, key it with a **private contract** — only contract-holders decrypt, and
a changed contract fails authentication (see [Contract-keyed messaging](/mcp#uuidna-contract-seal), the
[cipher cluster](/publications/cipher) that seals the strategy, and the
[license](/license#what-the-license-can-and-cannot-lock)). Honest scope: secrecy is exactly the secrecy of the key;
sealing under a *public* contract binds a message to the terms but hides nothing.

## What chat is not here

- **Not an AI assistant.** No model runs on this page; the recomputable tools and theorems are the substance.
- **Not "intelligent secure chat" as a slogan.** The security is the ChaCha20-Poly1305 layer keyed by a secret; the
  receipts are non-crypto content-addresses (integrity and routing, not secrecy). Each is exactly what it is.

The [Guides](/guides) show how to fuse the MCP; the [Games](/games) let you play the same functions. Integrity, not truth (theorem provenance_integrity_not_content_truth).
