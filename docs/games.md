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

## Nim — the game of heaps <Badge type="tip" text="the two coins, live" />

Set the heaps and read the game off a single **nim-sum** (bitwise XOR — the same operation the axiom-free
[`lxor`](/theorem/nim_sum_is_xor) seals across the [9×9 nim-addition table](/theorems?skill=nim)). By **Bouton's
theorem** a zero nim-sum is a P-position (the player to move loses); nonzero is a win, and the exact winning move is
shown. You **verify** the position with one XOR instead of **recomputing** the game tree — the two coins, in miniature.

<NimPlay />

## Chess mobility — the board's geometry <Badge type="tip" text="click a square" />

Place a knight or king on any square; the reachable squares light up, counting exactly the move-deltas that stay on
the 8×8 — the [mobility map](/theorems?skill=chess) `Chessgames.lean` seals (a knight commands 8 from the centre, 2
from a corner). Verified geometry, not a search. **Real board arithmetic, still not a solved game.**

<ChessMobility />

## The audit game — accuracy as a game <Badge type="tip" text="toggle the refuters" />

Toggle each independent **refuter** between cleared and refuted. A claim is **CLEAN** (a P-position) iff *no* refuter
has a winning move — `survive = ∏(1−rᵢ)` — and **FLAGGED** the moment any refuter refutes. Adding a refuter is
monotone (never un-flags), so N independent refuters are strictly more accurate — [why an audit is more accurate as a
game](/theorems?skill=audit), sealed in `AuditGame.lean`.

<AuditPanel />

## Watch a message become a stream

Type a message and a passphrase, seal it, and watch it become a chain of uuids — the onion carried *as* the stream —
then arrive and decrypt back. Real ChaCha20-Poly1305, sealed and opened in your browser, nothing sent:

<MessageStream />

## Reflect anything to its address

Type anything and watch it fall to its content-address — deterministically, the same for anyone, in your browser:

<Reflect />

## Audit as you write

Write a chapter and the full audit reflects back live — fingerprint, chapter root, structure, gravity, gate:

<BookReflect />

More to explore: the [7d fold](/trials), the [theorem ledger](/theorems), and the whole [MCP toolset](/mcp). A theorem
computes in Lean, or it is not a theorem — and here you can watch it compute. Integrity, not truth.
