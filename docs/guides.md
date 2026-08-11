---
title: Guides
description: Practical guides for uuidna — fuse the MCP into an agent, audit a public-domain book, seal a message under a contract, and verify every theorem yourself. Short, recomputable, honest.
---

# Guides <Badge type="tip" text="practical" />

> Short paths into uuidna. Every one ends in something you can recompute yourself.

## Fuse the MCP into an agent

Add the server to any MCP client — zero dependencies, launched with npx:

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

On connect the server sends an **instructions** summary, and every tool call returns a chained **receipt** (`receipt ·
seq · referer`) — a content-address of the command — so an agent always holds a tamper-evident record of what it ran.
Browse the full surface on the [MCP tools](/mcp) page; new here, start at the [Contract](/captain/config).

## Audit a public-domain book

Fetch and audit any Project Gutenberg book by id (the one tool that reaches the network, via the public Gutendex API):

- `uuidna_audit_book { "gutenbergId": 1342 }` → *Pride and Prejudice*: an exact-copy **fingerprint**, a **chapter
  root** proving any chapter belongs, the structural decode, and the honesty-gate pass.
- `uuidna_audit_text { "text": "…" }` audits text you already hold; `uuidna_audit_translation { source, translation }`
  binds a translation to its source with a directional receipt.

Or just **[write on the Books page](/books#writing)** — the audit reflects back live in your browser, nothing sent.
Honest scope: provenance and structure, never decryption or a judgement of merit.

## Seal a message under a contract

The domain **is** the contract's address, and the contract text is the key:

- `uuidna_contract { "terms": "…" }` → the `[contract-uuid]` and its `<contract-uuid>.uuidna.org` domain (public identity).
- `uuidna_contract_seal { message, terms }` → a sealed uuid stream, tagged with the public contract-uuid; only
  holders of the terms decrypt (`uuidna_contract_open`). `uuidna_contract_chain` seals a whole stream as a ratchet.

Honest scope: confidentiality is exactly the secrecy of the terms — a **public** contract gives none (a fixed pad is
public, not secret); a **private** contract gives real ChaCha20-Poly1305 secrecy. See [the license](/license#what-the-license-can-and-cannot-lock).

## Verify every theorem yourself

Nothing here asks to be trusted — only rechecked:

```bash
git clone https://github.com/uuidna/uuidna && cd uuidna && npm install && npm run lean
```

`npm run lean` regenerates every `lean/*.lean` file from its generator and verifies each proof **`by decide`,
sorry-free** — then folds the whole ledger to one recomputable receipt. Browse the sealed set on [Theorems](/theorems),
or run the full release gate with `npm run audit` (build · lean · provenance · tests · determinism).
