---
title: "The affect trinity"
description: "Computed from lean/AffectTrinity.lean — 13 sealed theorems, every claim citing its proof."
---

# The affect trinity

> THE AFFECT TRINITY — feeling, thought and emotion as 3 corners a turn carries round, 120° apart, with valence a flip on every corner at once; together a 6-element cyclic group. Honest scope, which no theorem here closes: the algebra is exact for the model; whether experience divides into three, and whether a mixed state (bittersweet) breaks the loop, is an open empirical question — a lens, not a proven law of mind. — held by [affect_loop_order](/theorem/affect_loop_order) and its 12 siblings below.

**13 theorems** and **536 decided cases**, from [affect_loop_order](/theorem/affect_loop_order) onward, each proven `by decide` in <a href="/lean/AffectTrinity.lean">lean/AffectTrinity.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 13 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [affect_turn_fixes_no_corner](/theorem/affect_turn_fixes_no_corner). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FAffectTrinity.lean)** — nothing to install. The editor fetches `lean/AffectTrinity.lean` from the repository and re-decides all 13 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### the loop runs feeling → thought → emotion → feeling: a feeling, the body's raw affect signal, is read by a thought, the appraisal (Lazarus 1991, doi 10.1037/0003-066X.46.8.819; Scherer 2009, doi 10.1080/02699930902928969), and the reading completes an emotion, the whole episode of affect joined to a concept (Barrett 2017, doi 10.1093/scan/nsw154), which is felt again
The ledger holds this as [affect_loop_order](/theorem/affect_loop_order) — proven `by decide`, sorry-free:

```lean
Corner.turn .feeling = .thought ∧ Corner.turn .thought = .emotion ∧ Corner.turn .emotion = .feeling
```

### 3 turns of 120° return every corner to itself: ρ³ = id, so the loop closes
The ledger holds this as [affect_turn_closes](/theorem/affect_turn_closes) — proven `by decide`, sorry-free:

```lean
∀ c : Corner, Corner.turn (Corner.turn (Corner.turn c)) = c
```

### no turn short of a full loop (ρ¹, ρ²) leaves any corner where it was: the observer is the axis the loop turns around, not a fourth corner it lands on
The ledger holds this as [affect_turn_fixes_no_corner](/theorem/affect_turn_fixes_no_corner) — proven `by decide`, sorry-free:

```lean
∀ c : Corner, Corner.turn c ≠ c ∧ Corner.turn (Corner.turn c) ≠ c
```

### the observer is the fixed point of the turn, not a corner: on the drawn lens the turn moves every corner and leaves only the centre where it is; in the plane, with the corners at 1, ω and ω² in Eisenstein coordinates and the turn multiplication by ω, the corners follow the loop and sum to the centre (1 + ω + ω² = 0), and of the 49 lattice points within 3 of the centre the rotation fixes exactly one, the centre
The ledger holds this as [affect_observer_fixed_point](/theorem/affect_observer_fixed_point) — proven `by decide`, sorry-free:

```lean
(∀ p : Point, Point.turn p = p ↔ p = .centre) ∧ (∀ c : Corner, rot (coord c) = coord (Corner.turn c)) ∧ ((coord .feeling).1 + (coord .thought).1 + (coord .emotion).1 = 0 ∧ (coord .feeling).2 + (coord .thought).2 + (coord .emotion).2 = 0) ∧ box.all (fun p => (rot p == p) == (p == (0, 0))) = true ∧ box.length = 49
```

### feel is defined: a feeling is exactly one valence and one arousal, core affect (Russell 2003, doi 10.1037/0033-295X.110.1.145), so there are 4 feelings, 2 valences by 2 arousals, and feel f is the episode that feeling begins at the feeling corner
The ledger holds this as [affect_feel_defined](/theorem/affect_feel_defined) — proven `by decide`, sorry-free:

```lean
(∀ f : Feel, feels.contains f = true) ∧ feels.length = 4 ∧ (∀ f : Feel, (feel f).corner = .feeling ∧ (feel f).feel = f)
```

### what a feeling turns into: feel f, turned, is a thought reading the same feeling, turned again an emotion completing it, and turned 3 times it is the feeling again
The ledger holds this as [affect_feel_turns_into](/theorem/affect_feel_turns_into) — proven `by decide`, sorry-free:

```lean
∀ f : Feel, Episode.turn (feel f) = ⟨.thought, f⟩ ∧ Episode.turn (Episode.turn (feel f)) = ⟨.emotion, f⟩ ∧ Episode.turn (Episode.turn (Episode.turn (feel f))) = feel f
```

### the turn carries the feeling and loses none of it: two feelings that are the same after the turn were the same feeling
The ledger holds this as [affect_feel_carried](/theorem/affect_feel_carried) — proven `by decide`, sorry-free:

```lean
∀ f : Feel, ∀ g : Feel, Episode.turn (feel f) = Episode.turn (feel g) → f = g
```

### flipping a feeling's valence keeps its arousal and its corner, undoes itself, and commutes with the turn on every episode
The ledger holds this as [affect_feel_flip](/theorem/affect_feel_flip) — proven `by decide`, sorry-free:

```lean
∀ e : Episode, (Episode.turn e).flip = Episode.turn (Episode.flip e) ∧ Episode.flip (Episode.flip e) = e ∧ (Episode.flip e).feel.arousal = e.feel.arousal ∧ (Episode.flip e).corner = e.corner
```

### the loop also runs backward: ρ⁻¹ undoes the turn on either side, and running back once is turning forward 2 times, ρ⁻¹ = ρ²
The ledger holds this as [affect_turn_back](/theorem/affect_turn_back) — proven `by decide`, sorry-free:

```lean
∀ c : Corner, Corner.back (Corner.turn c) = c ∧ Corner.turn (Corner.back c) = c ∧ Corner.back c = Corner.turn (Corner.turn c)
```

### the valence flip, pleasant ↔ unpleasant (Russell 1980, doi 10.1037/h0077714), undone by itself and fixing neither valence: σ² = id
The ledger holds this as [affect_flip_involution](/theorem/affect_flip_involution) — proven `by decide`, sorry-free:

```lean
∀ v : Valence, Valence.flip (Valence.flip v) = v ∧ Valence.flip v ≠ v
```

### the valence flip acts on every corner at once, leaving each corner where it is, and commutes with the turn: σρ = ρσ on every state
The ledger holds this as [affect_flip_commutes_turn](/theorem/affect_flip_commutes_turn) — proven `by decide`, sorry-free:

```lean
∀ a : Affect, (Affect.turn a).flip = (Affect.flip a).turn ∧ (Affect.flip a).corner = a.corner
```

### the turn and the flip generate a group of exactly 6 elements, 3 turns times 2 flips (ℤ/3 × ℤ/2): the closure of the identity under both holds the identity, is closed under each generator, and has 6 action tables on the 6 states
The ledger holds this as [affect_group_order_six](/theorem/affect_group_order_six) — proven `by decide`, sorry-free:

```lean
(∀ a : Affect, states.contains a = true) ∧ generated.contains states = true ∧ generated.all (fun t => generated.contains (t.map Affect.turn) && generated.contains (t.map Affect.flip)) = true ∧ generated.length = 6
```

### turning and flipping together has order exactly 6, so the 6-element group is cyclic: ℤ/3 × ℤ/2 ≅ ℤ/6, and the lens is abelian, not the triangle's dihedral symmetry
The ledger holds this as [affect_group_cyclic](/theorem/affect_group_cyclic) — proven `by decide`, sorry-free:

```lean
(∀ a : Affect, iter (fun b => (Affect.turn b).flip) 6 a = a) ∧ (List.range 5).all (fun k => states.map (iter (fun b => (Affect.turn b).flip) (k + 1)) != states) = true
```


::: warning 
THE AFFECT TRINITY — feeling, thought and emotion as 3 corners a turn carries round, 120° apart, with valence a flip on every corner at once; together a 6-element cyclic group. The boundary is confirmed by the wing's own sealed theorems — e.g. [affect_loop_order](/theorem/affect_loop_order) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
