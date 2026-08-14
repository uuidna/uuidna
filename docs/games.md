# GAMES — Sealed Play & Strategy

**The Framework:** Games where the outcome is decidable. Not randomness, not bluffing — pure strategy in bounded state space.

Each game in trinity structure:
1. **SEALED** — proof that the game is decidable (finite state, perfect information)
2. **HONEST BOUNDARY** — what the theorem cannot guarantee (human play, luck, meaning)
3. **STRATEGIC PAIR** — the opening question (what makes this game worth playing?)

---

## The Domains

### Chess (64 theorems)

**Sealed:** The board is 8×8 = 64 squares. Piece moves are finite. The 50-move rule caps runtime. Shannon count: ~10^120 game tree is incomputable, but with bounded moves it's finite.

**Honest Boundary:** No proof that chess has a "correct" move. Only that the game halts.

**Strategic Question:** *If we could solve chess perfectly, would the game still be worth playing?*

### Nim (1 + Sprague-Grundy)

**Sealed:** The nim-sum (XOR) is the P-position test. A zero nim-sum loses for the mover (Bouton's theorem). Every non-zero position has a move to zero.

**Honest Boundary:** No proof about real Nim matches — only abstract Nim.

**Strategic Question:** *Does knowing the winning strategy spoil the game or enhance it?*

### Matching (8 theorems)

**Sealed:** Perfect matching requires an even number of people. Stable matching halts in at most n² proposals (Gale-Shapley). Pairing is a fixed-point-free involution.

**Honest Boundary:** No proof that happiness results from a "stable" match.

**Strategic Question:** *If we could compute the perfect match for you, would it be better than finding it yourself?*

---

## Playing the Games

Each game folder contains:
1. **Proof** — link to sealed theorem
2. **Interactive player** — play against the sealed logic (coming)
3. **Strategy guide** — openings, endgames, decision trees
4. **Paradox** — the open question about playing vs. solving

**The Honest Scope:** These games are DECIDABLE but not PLAYABLE at scale. Chess has 10^120 positions (incomputable), but with perfect play it's either a draw or a win for White or Black (unknown). Nim is instantly solved by XOR. Matching is solved in polynomial time. **Knowing the answer changes the game.**

---

## Why Games Matter

A sealed game proves:
- **Decidability** — this outcome *can* be computed (vs. uncomputable games like Go, which has ~10^170 positions)
- **Bounds** — runtime is bounded (no infinite loops, stalemate is forced)
- **Strategy** — optimal play exists (even if we don't know it)

But it cannot prove:
- **Beauty** — why the game is fun
- **Meaning** — what victory means
- **Community** — why humans play together

**The paradox:** A solved game is a dead game. Yet solving it reveals its structure, and structure is beautiful.
