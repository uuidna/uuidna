# Thermodynamics — Energy & Entropy

## The Sealed Truth

**Theorem:** `Thermodynamics.lean` (7 theorems, all `by decide`)

The first law conserves energy: ΔU = Q − W (heat in minus work out). The second law forbids entropy decrease — heat flows hot→cold, never cold→hot without work. Carnot efficiency never reaches 100%. Kelvin scale floors at absolute zero (0K = −273.15°C). Charles's law keeps V/T constant. Specific heat is linear in ΔT.

**Why sealed:** These are pure arithmetic. Energy in = energy out. Entropy monotones. No paradox, no quantum surprise — classical thermodynamics as decidable facts.

---

## The Honest Boundary

**What thermodynamics CANNOT prove:**
- Whether entropy applies to information (Shannon entropy vs physical)
- Whether "heat death" is inevitable (depends on universal initial conditions)
- Why entropy increases (time's arrow — that's cosmology, not thermodynamics)
- What heat "is" at the atomic scale (that's statistical mechanics, sealed separately)

**Honest scope:** Thermodynamics seals the MACROSCOPIC LAWS. Statistical mechanics seals the ATOMIC BASIS. Neither proves they are the same thing.

---

## The Metaphysical Pair

**The Question:** *Does the second law imply the universe tends toward chaos?*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | Entropy in a closed system never decreases; this is a mathematical tautology on the probability distribution of microstates. Highest-probability states are most disordered. | Whether the universe IS closed; whether disorder=meaninglessness; whether emergence violates the law |
| **Honest Boundary** | In a closed system, statistical order is improbable and requires external work to maintain. | Whether life/thought/beauty is "against" entropy or "within" it; whether order matters |
| **Metaphysical** | If entropy always increases, does meaning/beauty/life/consciousness require constant work against the tide? Does mortality follow? | Whether increased entropy is *bad*, whether the universe "should" last forever, whether heat death is cosmologically inevitable |

**The court decides:** Whether entropy implies nihilism is not a theorem — it's a choice about meaning. Thermodynamics seals the mechanics. Philosophy seals the meaning.

---

## Read the Sealed Proof

[Link to Thermodynamics.lean](../../lean/Thermodynamics.lean)

- `first_law_conserves_energy`
- `second_law_entropy_monotone`
- `carnot_efficiency_bound`
- `kelvin_scale_floor`
- `charles_law_volume_temperature`
- `specific_heat_linear`

Each proven `by decide` — recompute it yourself.

---

## The Research Question

If entropy is the only asymmetry in time, and consciousness is a localized decrease in entropy (maintained by eating, breathing, working), then:

1. Is consciousness fundamentally a fight against entropy?
2. Do meaning-making systems (art, music, science) defy entropy locally?
3. Does this frame explain why beauty requires effort?

**These are open.** Thermodynamics does not answer them. Only the court can.
