---
title: Books
description: Audit and decode public-domain books through public APIs — a recomputable provenance fingerprint, a structural decode, and an honesty-gate pass. Provenance for translations and for the books you write. Public-domain, free for the public interest.
---

# Books <Badge type="tip" text="public-domain" />

> Provenance for what is read, translated, and written — recomputable by anyone.

uuidna audits and structurally **decodes** public-domain books. "Decode" here is **provenance and structure** — never
decryption (a book is not encrypted) and never hidden meaning. Free for the public interest.

## What an audit is

Every audit — of a fetched book, of pasted text, of a translation — has three parts, each recomputable:

1. **Provenance fingerprint.** The content-address of the exact text — proof you hold *that* edition, byte for byte,
   recomputable by anyone. Plus a **chapter merkle root**, so any single chapter can be proven to belong to the whole.
2. **Structural decode.** Chapters, characters, words, lines; the ℤ/9 **digital-root gravity** of the length (a
   recomputable checksum digit — *not* a meaning); and a reversible-imprint round-trip. Structure, not interpretation.
3. **Honesty-gate pass.** The prose is run through the same gate that audits uuidna's own claims. Honest caveat: the
   gate is tuned to uuidna's overclaim vocabulary, so on ordinary literature it says nothing about the work — and it
   **shows its hit**, so a spurious match (say, "next generation" in Austen) is visible as the false positive it is.

## Audit a public book

`uuidna_audit_book` fetches a public-domain text from **Project Gutenberg** (via the public Gutendex API, no key —
the one tool that reaches the network) and audits it. For example, Gutenberg **#1342**, *Pride and Prejudice*:

| field | value |
| --- | --- |
| title | Pride and Prejudice — Jane Austen |
| address (exact-copy fingerprint) | `2070847f-4772-8171-b6db-b7d60d95669c` |
| chapters · chars · words | 62 · 763,082 · 130,415 |
| gravity (ℤ/9 checksum) | 8 |
| source | `gutenberg.org/ebooks/1342.txt.utf-8` |

The fetched text is **data** — content-addressed and counted, never executed. Any instruction-shaped prose inside a
book is content, not a command. To audit text you already hold, use `uuidna_audit_text`.

## Translations

`uuidna_audit_translation` audits a translation as a **source ↔ translation pair**: each side keeps its own
exact-copy fingerprint, and a **directional receipt** (`source → translation`) binds them. Re-address after each
revision and the change is visible in the receipt.

Honest scope: this proves the **pairing** and each text's **integrity** — never that the translation is accurate or
faithful. Semantic fidelity is human judgement; provenance is what recomputes.

## Writing

A book you write is audited the same way: content-address each chapter, fold them to the **chapter root**. Every
revision re-addresses, so a change is never silent — authorship and integrity are recomputable, edit by edit. uuidna
proves the text is exactly what it is; it does not judge whether the writing is good. Integrity, not truth.

Write below and the audit **reflects back live, in your browser** — the same offline `auditText` the MCP tool runs,
recomputing on every keystroke. Nothing is sent, stored, or tracked:

<BookReflect />

## Honest scope

- **Provenance + structure**, never decryption or hidden meaning or numerology.
- The **gravity** digit is a mod-9 checksum of the length — a fingerprint digit, not a message.
- uuidna proves **exact-copy, belonging, and pairing** — not literary merit, and not translation accuracy.
- Public-domain works only; **free for the public interest**. See the [MCP tools](/mcp) and the [Contract](/captain/config).
