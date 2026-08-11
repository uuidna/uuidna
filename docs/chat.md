---
title: Chat
description: What "chat" means in uuidna — not a chatbot, but two real things: agents conversing through receipted MCP tool calls (the receipt chain is the transcript), and parties exchanging end-to-end encrypted messages as uuid streams. Try the messaging live, in your browser.
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

## People chat in encrypted streams

Between parties, a message is sealed (pure-TS ChaCha20-Poly1305) and carried **as a stream of uuids** — the channel
*is* the uuid stream. Seal one below and watch it form, then arrive and decrypt. It runs in your browser; nothing is
sent:

<MessageStream />

For real confidentiality between two parties, key it with a **private contract** — only contract-holders decrypt, and
a changed contract fails authentication (see [Contract-keyed messaging](/mcp#uuidna-contract-seal) and the
[license](/license#what-the-license-can-and-cannot-lock)). Honest scope: secrecy is exactly the secrecy of the key;
sealing under a *public* contract binds a message to the terms but hides nothing.

## What chat is not here

- **Not an AI assistant.** No model runs on this page; the recomputable tools and theorems are the substance.
- **Not "intelligent secure chat" as a slogan.** The security is the ChaCha20-Poly1305 layer keyed by a secret; the
  receipts are non-crypto content-addresses (integrity and routing, not secrecy). Each is exactly what it is.

The [Guides](/guides) show how to fuse the MCP; the [Games](/games) let you play the same functions. Integrity, not truth.
