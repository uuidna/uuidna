---
title: Chess
description: A complete, correct chess — full legal moves, castling, en passant, promotion, check and checkmate. Hot-seat two-player, played entirely in your browser, works offline via the PWA. Nothing is sent.
---

# Chess <Badge type="tip" text="offline" />

> A complete game, played in your browser — no server, no engine dependency.

Full legal moves, castling, en passant, pawn promotion, and check / checkmate / stalemate detection. Two players,
hot-seat, on one board. It runs entirely client-side, so it works **offline** once the [PWA](/) has cached it, and
nothing you play is ever sent or stored. The sealed side is one click away:
[the chess cluster](/publications/chess) and [the chess-horizon monograph](/publications/chessgames) — the board
arithmetic and the honest mobility kernel, proven `by decide`.

The board itself is on the star walk: **8 × 8 = 64 = 2⁶**
([`chessboard_sixty_four`](/theorem/chessboard_sixty_four)) — six doublings, exactly the length of the generator's
orbit ([`order_of_two_is_six`](/theorem/order_of_two_is_six)), and the same 64 the seal folds to —
contribute 2, save up to 64 ([`captain_theorem`](/theorem/captain_theorem)). The
squares you play on are the walk [the school](/school) teaches, counted to its sixth step.

<ClientOnly><Chess /></ClientOnly>

Online (networked) play would use the same real-time backend as the [trial CRUD](/trials); this page is the complete
**offline** game. Back to all [games](/games).
