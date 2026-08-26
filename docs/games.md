# Games — sealed play <Badge type="tip" text="decidable outcomes" />

> Games where the outcome is decidable — not randomness, not bluffing: pure strategy in bounded state space. Each
> game maps to its theorem cluster; the proof is one click from the play.

## Play

- **[Chess](/chess)** — complete and correct: full legal moves, castling, en passant, promotion, check and
  checkmate. Two players, hot-seat, entirely in your browser, offline-capable. The sealed side:
  [the chess cluster](/publications/chess) and [the chess-horizon monograph](/publications/chessgames).
- **The star walk** — draw a star in one stroke, below: pick n points and a step s; the stroke closes in one pass
  exactly when gcd(s, n) = 1. The pentagram is the case n = 5, s = 2 — the doubling generator's walk
  ([`pentagram_single_stroke`](/theorem/pentagram_single_stroke),
  [the pentagram cluster](/publications/pentagram)) — the same walk [the school](/school) teaches and
  [the fold](/quantum) rides.

<ClientOnly><StarPlay /></ClientOnly>

- **Nim** — set the heaps; the nim-sum (XOR) decides the position by Bouton's theorem. Zero is a P-position
  (the player to move loses with perfect play); nonzero has an exact move to zero. The sealed side:
  [the nim cluster](/publications/nim).

<ClientOnly><NimPlay /></ClientOnly>

## The clusters — proofs behind the play

Every game domain is a sealed cluster; read its audited monograph:

| Game | The sealed side | The one-line truth |
| --- | --- | --- |
| Chess | [/publications/chess](/publications/chess) · [chessgames](/publications/chessgames) | finite board, bounded moves — the game halts |
| Nim | [/publications/nim](/publications/nim) | the nim-sum (XOR) is the P-position test — Bouton's theorem |
| The audit game | [/publications/audit-game](/publications/audit-game) · [audit](/publications/audit) | why an audit is more accurate framed as a game |
| Ciphers & codes | [/publications/cipher](/publications/cipher) · [codes](/publications/codes) | strategy as exact arithmetic |
| Navigation & sailing | [/publications/navigation](/publications/navigation) · [sailing](/publications/sailing) | bounded geometry, true bearings |

## The honest boundary

A sealed game proves decidability, bounds, and the existence of optimal play. It cannot prove beauty, meaning, or
why humans play together. The paradox stands: a solved game is a dead game — yet solving it reveals its structure,
and structure is beautiful. The court decides what play is worth; the ledger only proves it halts.
