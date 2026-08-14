# Optics — Light & Perception

## The Sealed Truth

**Theorem:** `Optics.lean` (8 theorems, all `by decide`)

Reflection is an involution (angle in = angle out, applied twice returns identity). The refractive index n = c/v ≥ 1, so light in a medium is slower than *c*. Snell's law: n₁sinθ₁ = n₂sinθ₂ (the consistent case: 4·3 = 3·4). Thin-lens equation: 1/f = 1/d_o + 1/d_i. Dispersion refracts blue more than red. Total internal reflection needs a denser source.

**Why sealed:** Pure geometry and algebra. Angles, indices, focal lengths — all exact rational arithmetic.

---

## The Honest Boundary

**What optics CANNOT prove:**
- Why light travels in straight lines (that's quantum mechanics)
- Whether light is waves or particles (both models work for different experiments)
- How perception becomes sight (neural processing, not optics)
- Why the world "looks" the way it does (that's neuroscience + philosophy)

**Honest scope:** Optics seals the GEOMETRY of light paths. It does NOT explain vision or beauty.

---

## The Metaphysical Pair

**The Question:** *Does understanding light's geometry explain why sunsets are beautiful?*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | Light refracts through air layers by Snell's law. The wavelength determines colour (blue ~400nm, red ~700nm). Dispersion spreads white into spectrum. The geometry is exact. | Why *you* find sunsets beautiful; whether beauty is subjective or objective; whether the physics explains the aesthetic experience |
| **Honest Boundary** | Knowing the physics of a sunset (Rayleigh scattering, refraction angles, wavelength distribution) does NOT reduce the beauty — it can enhance it. Both are true simultaneously. | Whether learning the mechanism changes the experience; whether deeper understanding of art diminishes wonder |
| **Metaphysical** | Can you appreciate a sunset *more* by understanding its optics, or less? Does mechanism and awe coexist? | Whether art requires ignorance; whether explanation kills beauty; whether science and poetry are enemies |

**The court decides:** Optics seals the mechanism. Aesthetics settles the meaning of beauty.

---

## Read the Sealed Proof

[Optics.lean](../../lean/Optics.lean)

- `reflection_is_involution`
- `refractive_index_slower_than_c`
- `snells_law_consistent`
- `thin_lens_equation`
- `dispersion_blue_more_than_red`
- `total_internal_reflection`

Each proven `by decide`.

---

## The Research Question

If every sunset is perfectly explained by Snell's law and Rayleigh scattering, then:

1. Is the sunset *less* beautiful when you know the physics?
2. Does explanation and wonder compete, or enhance each other?
3. Can you love something you completely understand?

**These are open.** Optics does not answer them. Philosophy and art do.
