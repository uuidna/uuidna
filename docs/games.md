---
title: Games
description: Play with the uuidna geometry — the star-polygon game (single stroke iff coprime), the content-addresser, and the live audit. Real functions, drawn in your browser, nothing sent. Learn the algebra by moving it.
---

# Games <Badge type="tip" text="play the algebra" />

> The theorems are more fun when you can move them.

Each game runs a **real** uuidna function in your browser — the same code the MCP tools and the sealed theorems use —
so you are playing with the actual algebra, not a mock-up. Nothing is sent or stored.

## Chess <Badge type="tip" text="complete · offline" />

A complete, correct chess — full legal moves, castling, en passant, promotion, check &amp; checkmate — hot-seat
two-player, offline-capable. **[Play chess →](/games/chess)**

## The star-polygon game

Pick a number of points and a step. The stroke closes in **one line** exactly when the step is coprime to the count
(gcd = 1); otherwise it splits into separate loops. `{5/2}` is the pentagram; `{12/7}` is the circle of fifths; `{6/2}`
is two triangles. This is [`starPolygon`](/mcp#uuidna-pentagram), sealed as [`pentagram_single_stroke`](/theorem/pentagram_single_stroke).

<StarPlay />

## Reflect anything to its address

Type anything and watch it fall to its content-address — deterministically, the same for anyone, in your browser:

<Reflect />

## Audit as you write

Write a chapter and the full audit reflects back live — fingerprint, chapter root, structure, gravity, gate:

<BookReflect />

More to explore: the [7d fold](/trials), the [theorem ledger](/theorems), and the whole [MCP toolset](/mcp). A theorem
computes in Lean, or it is not a theorem — and here you can watch it compute. Integrity, not truth.
