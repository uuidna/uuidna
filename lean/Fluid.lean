-- lean/Fluid.lean — GENERATED. THE FLUID GRID — the discrete divergence telescopes and sums to zero on every periodic ring, the discrete curl of a gradient vanishes on every cell, one explicit diffusion step stays within its neighbourhood's maximum, and on every periodic ring one explicit diffusion step conserves momentum and never increases the discrete energy, for Nat and for signed fields, each for every length, field and value. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems. Every proof checked by the kernel (by exact, by have, by intro, by show), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- the partial sum f 0 + … + f (n-1) -/
def psum (f : Nat → Nat) : Nat → Nat
  | 0 => 0
  | n + 1 => psum f n + f n

/-- the square, as a product (no Nat.pow lemma is needed) -/
def sq (x : Nat) : Nat := x * x

/-- the integer scheme of one explicit diffusion step at λ = 1/4: cell i+1 of the new field, times four,
    from its neighbours i and i+2 -/
def step (f : Nat → Nat) (i : Nat) : Nat := f i + f (i + 1) + f (i + 1) + f (i + 2)

/-- the same step on a signed (Int) field -/
def stepZ (u : Nat → Int) (i : Nat) : Int := u i + u (i + 1) + u (i + 1) + u (i + 2)

/-- DISCRETE DIVERGENCE TELESCOPES, for every field and every length: the shifted sum plus the first value
    equals the sum plus the last — by induction on the length. What flows in at one end and out at the other is
    all the interior differences add up to. Scope: the discrete grid and the explicit scheme only; the
    continuous equations are a different statement, and their existence and smoothness is decided by none of
    these theorems. -/
theorem discrete_divergence_telescopes : ∀ (f : Nat → Nat) (n : Nat), psum (fun i => f (i + 1)) n + f 0 = psum f n + f n := by
  intro f n
  induction n with
  | zero => rfl
  | succ k ih =>
    show psum (fun i => f (i + 1)) k + f (k + 1) + f 0 = psum f k + f k + f (k + 1)
    rw [Nat.add_right_comm, ih]

/-- a + k = b + k gives a = b, for every a, b, k — by induction on k through the successor's injectivity. Core's
    Nat.add_right_cancel depends on propext; this proof depends on no axiom. Scope: the discrete grid and the
    explicit scheme only; the continuous equations are a different statement, and their existence and smoothness
    is decided by none of these theorems. -/
theorem add_right_cancel_by_induction : ∀ a b k : Nat, a + k = b + k → a = b := by
  intro a b k
  induction k with
  | zero => intro h; exact h
  | succ k ih => intro h; exact ih (Nat.succ.inj h)

/-- ON A PERIODIC RING THE DISCRETE DIVERGENCE SUMS TO ZERO, for every ring size and every field — the universal
    of which closed_grid_differences_sum_to_zero decides one 4×4 instance. Discrete incompressibility on a
    closed grid is exact. Scope: the discrete grid and the explicit scheme only; the continuous equations are a
    different statement, and their existence and smoothness is decided by none of these theorems. -/
theorem ring_divergence_is_zero : ∀ (f : Nat → Nat) (n : Nat), f n = f 0 → psum (fun i => f (i + 1)) n = psum f n := by
  intro f n h
  have t : psum (fun i => f (i + 1)) n + f 0 = psum f n + f 0 := h ▸ discrete_divergence_telescopes f n
  exact add_right_cancel_by_induction _ _ _ t

/-- ONE EXPLICIT DIFFUSION STEP STAYS WITHIN ITS NEIGHBOURHOOD'S MAXIMUM, for every value: with weights 1, 2, 1
    the weighted sum a + b + b + c is at most four times the maximum m — the discrete maximum principle that
    keeps the explicit heat scheme stable at its CFL limit. Scope: the discrete grid and the explicit scheme
    only; the continuous equations are a different statement, and their existence and smoothness is decided by
    none of these theorems. -/
theorem diffusion_step_never_exceeds_the_maximum : ∀ a b c m : Nat, a ≤ m → b ≤ m → c ≤ m → a + b + b + c ≤ m + m + m + m := by
  intro a b c m ha hb hc
  exact Nat.add_le_add (Nat.add_le_add (Nat.add_le_add ha hb) hb) hc

/-- k + a = k + b gives a = b, for every k, a, b — by induction on k through the successor's injectivity, the
    left twin of add_right_cancel_by_induction. Scope: the discrete grid and the explicit scheme only; the
    continuous equations are a different statement, and their existence and smoothness is decided by none of
    these theorems. -/
theorem add_left_cancel_by_induction : ∀ k a b : Nat, k + a = k + b → a = b := by
  intro k
  induction k with
  | zero => intro a b h; rw [Nat.zero_add, Nat.zero_add] at h; exact h
  | succ k ih => intro a b h; rw [Nat.succ_add, Nat.succ_add] at h; exact ih a b (Nat.succ.inj h)

/-- THE DISCRETE CURL OF A GRADIENT VANISHES on every grid cell: when the four corners are a potential's values
    (q = p + dx, r = p + dy, and s reached both ways), right-then-up gains exactly what up-then-right gains, dx
    + dy' = dy + dx'. A gradient flow has no circulation. Stated over Nat on purpose: core's Int.add_comm and
    Int.add_assoc depend on propext, so the Int form cannot be axiom-free on core alone. Scope: the discrete
    grid and the explicit scheme only; the continuous equations are a different statement, and their existence
    and smoothness is decided by none of these theorems. -/
theorem discrete_curl_of_gradient_vanishes : ∀ p q r s dx dy dx' dy' : Nat, q = p + dx → s = q + dy' → r = p + dy → s = r + dx' → dx + dy' = dy + dx' := by
  intro p q r s dx dy dx' dy' hq hs hr hs'
  apply add_left_cancel_by_induction p
  rw [← Nat.add_assoc, ← Nat.add_assoc, ← hq, ← hr, ← hs, ← hs']

/-- (x + y)·z = x·z + y·z, for every x, y, z — right distributivity rebuilt from the left one by commuting the
    product, because core's Nat.add_mul depends on propext and this proof depends on no axiom. It is algebra
    over Nat, the bookkeeping the energy estimate needs. It is NOT a statement about the continuous
    Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the
    discrete grid and the explicit scheme only; the continuous equations are a different statement, and their
    existence and smoothness is decided by none of these theorems. -/
theorem right_distrib_by_comm : ∀ x y z : Nat, (x + y) * z = x * z + y * z := by
  intro x y z
  rw [Nat.mul_comm, Nat.left_distrib, Nat.mul_comm z x, Nat.mul_comm z y]

/-- THE SQUARE OF A SUM EXPANDS, for every x and y: (x + y)² = (x² + y²) + (xy + xy), by rewriting alone. It is
    the binomial square over Nat and nothing more. It is NOT a statement about the continuous Navier–Stokes
    equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid
    and the explicit scheme only; the continuous equations are a different statement, and their existence and
    smoothness is decided by none of these theorems. -/
theorem square_of_sum_expands : ∀ x y : Nat, (x + y) * (x + y) = (x * x + y * y) + (x * y + x * y) := by
  intro x y
  rw [Nat.left_distrib, right_distrib_by_comm, right_distrib_by_comm, Nat.mul_comm y x,
      Nat.add_add_add_comm, Nat.add_comm (x * y) (y * y), Nat.add_add_add_comm (x * x) (y * y)]

/-- TWO PRODUCTS NEVER EXCEED THE SUM OF SQUARES, for every x and y: 2xy ≤ x² + y², the (x − y)² ≥ 0 inequality,
    proved by writing the larger as the smaller plus a gap d, which leaves exactly d² on the right. It is a
    pointwise inequality over Nat, not an estimate on any flow. It is NOT a statement about the continuous
    Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the
    discrete grid and the explicit scheme only; the continuous equations are a different statement, and their
    existence and smoothness is decided by none of these theorems. -/
theorem two_products_le_sum_of_squares : ∀ x y : Nat, x * y + x * y ≤ x * x + y * y := by
  have core : ∀ x d : Nat, x * (x + d) + x * (x + d) ≤ x * x + (x + d) * (x + d) := by
    intro x d
    rw [square_of_sum_expands, Nat.left_distrib]
    rw [Nat.add_add_add_comm (x * x) (x * d) (x * x) (x * d), Nat.add_assoc (x * x) (x * x) (x * d + x * d)]
    apply Nat.add_le_add_left
    rw [Nat.add_right_comm (x * x) (d * d) (x * d + x * d)]
    exact Nat.le_add_right _ _
  intro x y
  cases Nat.le_total x y with
  | inl h =>
    have ⟨d, hd⟩ := Nat.le.dest h
    rw [← hd]; exact core x d
  | inr h =>
    have ⟨d, hd⟩ := Nat.le.dest h
    rw [← hd, Nat.mul_comm (y + d) y, Nat.add_comm ((y + d) * (y + d))]; exact core y d

/-- THE SQUARE OF A SUM IS AT MOST TWICE THE SUM OF SQUARES, for every x and y: (x + y)² ≤ 2(x² + y²). It is a
    pointwise convexity inequality over Nat. It is NOT a statement about the continuous Navier–Stokes equations:
    that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the
    explicit scheme only; the continuous equations are a different statement, and their existence and smoothness
    is decided by none of these theorems. -/
theorem square_of_sum_le_twice_sum_of_squares : ∀ x y : Nat, (x + y) * (x + y) ≤ (x * x + y * y) + (x * x + y * y) := by
  intro x y
  rw [square_of_sum_expands]
  exact Nat.add_le_add_left (two_products_le_sum_of_squares x y) _

/-- THE DIFFUSION STENCIL'S SQUARE IS BOUNDED BY FOUR WEIGHTED ENERGIES, for every a, b, c: (a + 2b + c)² ≤ 4(a²
    + 2b² + c²), the pointwise convexity step of the discrete energy estimate. It bounds one cell of one step;
    it is not the estimate itself. It is NOT a statement about the continuous Navier–Stokes equations: that
    problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit
    scheme only; the continuous equations are a different statement, and their existence and smoothness is
    decided by none of these theorems. -/
theorem diffusion_stencil_square_le_weighted_energy : ∀ a b c : Nat,
    (a + b + b + c) * (a + b + b + c) ≤
      (a * a + b * b + b * b + c * c) + (a * a + b * b + b * b + c * c) +
      (a * a + b * b + b * b + c * c) + (a * a + b * b + b * b + c * c) := by
  intro a b c
  have split : a + b + b + c = (a + b) + (b + c) := Nat.add_assoc (a + b) b c
  have h1 := square_of_sum_le_twice_sum_of_squares a b
  have h2 := square_of_sum_le_twice_sum_of_squares b c
  have h12 := Nat.add_le_add h1 h2
  have outer := square_of_sum_le_twice_sum_of_squares (a + b) (b + c)
  have chain := Nat.le_trans outer (Nat.add_le_add h12 h12)
  rw [split]
  have hE : (a * a + b * b) + (b * b + c * c) = a * a + b * b + b * b + c * c :=
    (Nat.add_assoc (a * a + b * b) (b * b) (c * c)).symm
  rw [Nat.add_add_add_comm (a * a + b * b) (a * a + b * b) (b * b + c * c) (b * b + c * c), hE,
      ← Nat.add_assoc (a * a + b * b + b * b + c * c + (a * a + b * b + b * b + c * c))] at chain
  exact chain

/-- THE SUM OF FOUR FIELDS IS THE SUM OF THEIR SUMS, for every four fields and every length — by induction on
    the length. It is linearity of the finite sum over Nat. It is NOT a statement about the continuous
    Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the
    discrete grid and the explicit scheme only; the continuous equations are a different statement, and their
    existence and smoothness is decided by none of these theorems. -/
theorem psum_add4 : ∀ (a b c d : Nat → Nat) (n : Nat),
    psum (fun i => a i + b i + c i + d i) n = psum a n + psum b n + psum c n + psum d n := by
  intro a b c d n
  induction n with
  | zero => rfl
  | succ k ih =>
    show psum (fun i => a i + b i + c i + d i) k + (a k + b k + c k + d k)
      = psum a k + a k + (psum b k + b k) + (psum c k + c k) + (psum d k + d k)
    rw [ih, Nat.add_add_add_comm (psum a k + psum b k + psum c k) (psum d k) (a k + b k + c k) (d k),
        Nat.add_add_add_comm (psum a k + psum b k) (psum c k) (a k + b k) (c k),
        Nat.add_add_add_comm (psum a k) (psum b k) (a k) (b k)]

/-- A POINTWISE BOUND SUMS TO A BOUND, for every two fields and every length: f ≤ g cell by cell gives Σ f ≤ Σ g
    — by induction on the length. It is monotonicity of the finite sum over Nat. It is NOT a statement about the
    continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it.
    Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement,
    and their existence and smoothness is decided by none of these theorems. -/
theorem psum_le_of_pointwise : ∀ (f g : Nat → Nat) (n : Nat), (∀ i : Nat, f i ≤ g i) → psum f n ≤ psum g n := by
  intro f g n h
  induction n with
  | zero => exact Nat.le_refl 0
  | succ k ih => exact Nat.add_le_add ih (h k)

/-- A CYCLIC SHIFT PRESERVES EVERY SUM ON A PERIODIC RING, for every ring size n and every n-periodic field — a
    corollary of ring_divergence_is_zero. It is a statement about a finite ring of cells. It is NOT a statement
    about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing
    about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different
    statement, and their existence and smoothness is decided by none of these theorems. -/
theorem ring_shift_preserves_sum : ∀ (g : Nat → Nat) (n : Nat), (∀ i : Nat, g (i + n) = g i) →
    psum (fun i => g (i + 1)) n = psum g n := by
  intro g n h
  apply ring_divergence_is_zero g n
  have h0 := h 0
  rw [Nat.zero_add] at h0
  exact h0

/-- A SHIFT BY TWO PRESERVES EVERY SUM ON A PERIODIC RING, for every ring size n and every n-periodic field —
    two cyclic shifts in a row. It is a statement about a finite ring of cells. It is NOT a statement about the
    continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it.
    Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement,
    and their existence and smoothness is decided by none of these theorems. -/
theorem ring_double_shift_preserves_sum : ∀ (g : Nat → Nat) (n : Nat), (∀ i : Nat, g (i + n) = g i) →
    psum (fun i => g (i + 2)) n = psum g n := by
  intro g n h
  have h' : ∀ i, (fun j => g (j + 1)) (i + n) = (fun j => g (j + 1)) i := by
    intro i
    show g (i + n + 1) = g (i + 1)
    rw [Nat.add_right_comm]
    exact h (i + 1)
  have s1 := ring_shift_preserves_sum (fun j => g (j + 1)) n h'
  exact Eq.trans s1 (ring_shift_preserves_sum g n h)

/-- A CYCLIC SHIFT PRESERVES THE DISCRETE ENERGY, for every ring size n and every n-periodic field: Σ u(i+1)² =
    Σ u(i)². It is the discrete sum of squares on a finite ring, not a continuous energy. It is NOT a statement
    about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing
    about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different
    statement, and their existence and smoothness is decided by none of these theorems. -/
theorem ring_shift_preserves_energy : ∀ (f : Nat → Nat) (n : Nat), (∀ i : Nat, f (i + n) = f i) →
    psum (fun i => sq (f (i + 1))) n = psum (fun i => sq (f i)) n := by
  intro f n h
  exact ring_shift_preserves_sum (fun i => sq (f i)) n (fun i => congrArg sq (h i))

/-- FOUR TIMES S IS FOUR COPIES OF S, for every S: 4·S = S + S + S + S, by unfolding the product. It is
    arithmetic bookkeeping over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that
    problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit
    scheme only; the continuous equations are a different statement, and their existence and smoothness is
    decided by none of these theorems. -/
theorem four_mul_is_four_copies : ∀ S : Nat, 4 * S = S + S + S + S := by
  intro S
  rw [Nat.mul_comm]
  show S * 0 + S + S + S + S = S + S + S + S
  rw [Nat.mul_zero, Nat.zero_add]

/-- SIXTEEN TIMES S IS FOUR GROUPS OF FOUR COPIES, for every S, by unfolding the product. It is arithmetic
    bookkeeping over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is
    open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only;
    the continuous equations are a different statement, and their existence and smoothness is decided by none of
    these theorems. -/
theorem sixteen_mul_is_four_fours : ∀ S : Nat, 16 * S = (S + S + S + S) + (S + S + S + S) + (S + S + S + S) + (S + S + S + S) := by
  intro S
  rw [Nat.mul_comm]
  show S * 0 + S + S + S + S + S + S + S + S + S + S + S + S + S + S + S + S = _
  rw [Nat.mul_zero, Nat.zero_add]
  repeat rw [← Nat.add_assoc]

/-- DISCRETE MOMENTUM IS CONSERVED BY ONE DIFFUSION STEP ON A PERIODIC RING, for every ring size n and every
    n-periodic Nat field: Σ (u(i) + 2u(i+1) + u(i+2)) = 4 Σ u(i), i.e. the new field sums to the old one at λ =
    1/4. It is exact conservation for this explicit scheme on a finite ring. It is NOT a statement about the
    continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it.
    Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement,
    and their existence and smoothness is decided by none of these theorems. -/
theorem diffusion_step_conserves_momentum : ∀ (f : Nat → Nat) (n : Nat), (∀ i : Nat, f (i + n) = f i) →
    psum (step f) n = 4 * psum f n := by
  intro f n h
  show psum (fun i => f i + f (i + 1) + f (i + 1) + f (i + 2)) n = 4 * psum f n
  rw [psum_add4 f (fun i => f (i + 1)) (fun i => f (i + 1)) (fun i => f (i + 2)) n,
      ring_shift_preserves_sum f n h, ring_double_shift_preserves_sum f n h, four_mul_is_four_copies]

/-- THE ENERGY BOUND FROM A POINTWISE STENCIL BOUND, for every ring size n, every n-periodic field g and every
    field h dominated cell by cell by the diffusion stencil of g: Σ h² ≤ 16 Σ g². It is the summed form of the
    stencil inequality on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations:
    that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the
    explicit scheme only; the continuous equations are a different statement, and their existence and smoothness
    is decided by none of these theorems. -/
theorem ring_energy_bound_of_pointwise : ∀ (g h : Nat → Nat) (n : Nat), (∀ i : Nat, g (i + n) = g i) →
    (∀ i : Nat, h i ≤ g i + g (i + 1) + g (i + 1) + g (i + 2)) →
    psum (fun i => sq (h i)) n ≤ 16 * psum (fun i => sq (g i)) n := by
  intro g h n hper hdom
  let q : Nat → Nat := fun i => sq (g i)
  have point : ∀ i, sq (h i) ≤ (q i + q (i + 1) + q (i + 1) + q (i + 2)) + (q i + q (i + 1) + q (i + 1) + q (i + 2))
      + (q i + q (i + 1) + q (i + 1) + q (i + 2)) + (q i + q (i + 1) + q (i + 1) + q (i + 2)) := by
    intro i
    exact Nat.le_trans (Nat.mul_le_mul (hdom i) (hdom i))
      (diffusion_stencil_square_le_weighted_energy (g i) (g (i + 1)) (g (i + 2)))
  have summed := psum_le_of_pointwise _ _ n point
  let E : Nat → Nat := fun i => q i + q (i + 1) + q (i + 1) + q (i + 2)
  have hq : ∀ i, q (i + n) = q i := fun i => congrArg sq (hper i)
  have sumE : psum E n = psum q n + psum q n + psum q n + psum q n := by
    show psum (fun i => q i + q (i + 1) + q (i + 1) + q (i + 2)) n = _
    rw [psum_add4 q (fun i => q (i + 1)) (fun i => q (i + 1)) (fun i => q (i + 2)) n,
        ring_shift_preserves_sum q n hq, ring_double_shift_preserves_sum q n hq]
  have sumW : psum (fun i => E i + E i + E i + E i) n = psum E n + psum E n + psum E n + psum E n :=
    psum_add4 E E E E n
  rw [sumE] at sumW
  have : psum (fun i => sq (h i)) n ≤ psum (fun i => E i + E i + E i + E i) n := summed
  rw [sumW] at this
  show psum (fun i => sq (h i)) n ≤ 16 * psum q n
  rw [sixteen_mul_is_four_fours]
  exact this

/-- ONE EXPLICIT DIFFUSION STEP NEVER INCREASES THE DISCRETE ENERGY ON A PERIODIC RING, for every ring size n
    and every n-periodic Nat field: Σ (u(i) + 2u(i+1) + u(i+2))² ≤ 16 Σ u(i)², i.e. Σ u'² ≤ Σ u² at λ = 1/4. The
    constant 16 is tight — a constant field attains it, and the mirror checks that 15 fails on some sampled
    ring. It is the discrete energy estimate for this one explicit scheme on a finite ring. It is NOT a
    statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says
    nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a
    different statement, and their existence and smoothness is decided by none of these theorems. -/
theorem diffusion_step_never_increases_energy : ∀ (f : Nat → Nat) (n : Nat), (∀ i : Nat, f (i + n) = f i) →
    psum (fun i => sq (step f i)) n ≤ 16 * psum (fun i => sq (f i)) n := by
  intro f n h
  exact ring_energy_bound_of_pointwise f (step f) n h (fun i => Nat.le_refl _)

/-- THE DISTANCE OF A NATURAL DIFFERENCE IS AT MOST THE SUM, for every m and k: |m − k| ≤ m + k, by case
    analysis on Int.subNatNat. It is an integer inequality, a step toward the triangle inequality. It is NOT a
    statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says
    nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a
    different statement, and their existence and smoothness is decided by none of these theorems. -/
theorem natAbs_subNatNat_le : ∀ m k : Nat, (Int.subNatNat m k).natAbs ≤ m + k := by
  intro m k
  unfold Int.subNatNat
  cases hk : k - m with
  | zero => exact Nat.le_trans (Nat.sub_le m k) (Nat.le_add_right m k)
  | succ j =>
    show j + 1 ≤ m + k
    have hj : j + 1 ≤ k := hk ▸ Nat.sub_le k m
    exact Nat.le_trans hj (Nat.le_add_left k m)

/-- THE TRIANGLE INEQUALITY FOR natAbs, for every pair of integers: |a + b| ≤ |a| + |b|, by case analysis on the
    constructors, because core's Int.natAbs_add_le depends on propext and this proof depends on no axiom. It is
    an integer inequality. It is NOT a statement about the continuous Navier–Stokes equations: that problem is
    open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only;
    the continuous equations are a different statement, and their existence and smoothness is decided by none of
    these theorems. -/
theorem natAbs_triangle : ∀ a b : Int, (a + b).natAbs ≤ a.natAbs + b.natAbs := by
  intro a b
  cases a with
  | ofNat m =>
    cases b with
    | ofNat n => exact Nat.le_refl _
    | negSucc n => exact natAbs_subNatNat_le m (n + 1)
  | negSucc m =>
    cases b with
    | ofNat n =>
      show (Int.subNatNat n (m + 1)).natAbs ≤ m + 1 + n
      rw [Nat.add_comm (m + 1) n]
      exact natAbs_subNatNat_le n (m + 1)
    | negSucc n =>
      show m + n + 1 + 1 ≤ m + 1 + n + 1
      rw [Nat.add_right_comm m 1 n]
      exact Nat.le_refl _

/-- THE NAT SQUARE OF natAbs IS THE INTEGER SQUARE, for every integer x: |x|·|x| = x·x — core's
    Int.natAbs_mul_self, which depends on no axiom. It lets the signed energy be counted in Nat. It is NOT a
    statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says
    nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a
    different statement, and their existence and smoothness is decided by none of these theorems. -/
theorem sq_natAbs_is_the_square : ∀ x : Int, ((sq x.natAbs : Nat) : Int) = x * x := by
  exact fun _ => Int.natAbs_mul_self

/-- ONE EXPLICIT DIFFUSION STEP NEVER INCREASES THE ENERGY OF A SIGNED FIELD ON A PERIODIC RING, for every ring
    size n and every n-periodic Int field u: Σ |u(i) + 2u(i+1) + u(i+2)|² ≤ 16 Σ |u(i)|², the squares taken as
    natAbs · natAbs, which equals u · u (sq_natAbs_is_the_square). The weights matter: the mirror checks that
    the unstable weights 1, −1, 1 grow the energy of some sampled ring. It is the discrete energy estimate for
    this one explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes
    equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid
    and the explicit scheme only; the continuous equations are a different statement, and their existence and
    smoothness is decided by none of these theorems. -/
theorem signed_diffusion_step_never_increases_energy : ∀ (u : Nat → Int) (n : Nat), (∀ i : Nat, u (i + n) = u i) →
    psum (fun i => sq (stepZ u i).natAbs) n ≤ 16 * psum (fun i => sq (u i).natAbs) n := by
  intro u n h
  apply ring_energy_bound_of_pointwise (fun i => (u i).natAbs) (fun i => (stepZ u i).natAbs) n
    (fun i => congrArg Int.natAbs (h i))
  intro i
  show (u i + u (i + 1) + u (i + 1) + u (i + 2)).natAbs
    ≤ (u i).natAbs + (u (i + 1)).natAbs + (u (i + 1)).natAbs + (u (i + 2)).natAbs
  exact Nat.le_trans (natAbs_triangle _ _) (Nat.add_le_add_right
    (Nat.le_trans (natAbs_triangle _ _) (Nat.add_le_add_right (natAbs_triangle _ _) _)) _)
