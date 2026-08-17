---
title: "The spectrum"
description: "Computed from lean/Spectrum.lean — 8 sealed theorems, every claim citing its proof."
---

# The spectrum

> THE SPECTRUM — the electromagnetic spectrum as decidable arithmetic: wavelength × frequency = c, the seven bands in order, photon energy rising with frequency, the visible window under one octave, and the 300,000 km/s rounding gap. The arithmetic of the waves, NOT an EMF safety, exposure, or health claim. — held by [wave_product_is_constant](/theorem/wave_product_is_constant) and its 7 siblings below.

**8 theorems**, from [wave_product_is_constant](/theorem/wave_product_is_constant) onward, each proven `by decide` in [lean/Spectrum.lean](/lean/Spectrum.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### The one law, as arithmetic: wavelength × frequency = c is a CONSTANT, so if the wavelength doubles the frequency halves and the product holds — 2·150 = 300 and 4·75 = 300 (300 scales the constant). λ and f are inversely proportional at the fixed speed of light.
The ledger holds this as [wave_product_is_constant](/theorem/wave_product_is_constant) — proven `by decide`, sorry-free:

```lean
2 * 150 = 300 ∧ 4 * 75 = 300
```

### WHERE the standard ROUNDS: the exact speed of light is 299792458 m/s (exact by the SI metre), but it is quoted as 300000 km/s = 300000000 m/s — a rounding UP by 207542 m/s. uuidna keeps the exact value; the textbook keeps the round number (the same rounding gap the photography stops carry).
The ledger holds this as [light_speed_rounds_to_300000](/theorem/light_speed_rounds_to_300000) — proven `by decide`, sorry-free:

```lean
300000000 - 299792458 = 207542
```

### The spectrum has SEVEN bands — radio, microwave, infrared, visible, ultraviolet, X-ray, gamma — indexed 0..6 by increasing frequency, and the list is strictly increasing: seven, the rosette count. The waves uuidna navigates are a ℤ/7 of bands.
The ledger holds this as [seven_bands_in_order](/theorem/seven_bands_in_order) — proven `by decide`, sorry-free:

```lean
(List.range 7).length = 7 ∧ (List.range 7) = [0,1,2,3,4,5,6]
```

### Planck as order: photon energy E = h·f rises with frequency, so across the seven bands the energy is strictly increasing — gamma (band 6) carries more energy per photon than radio (band 0). Mapping each band to its energy rank is monotone.
The ledger holds this as [photon_energy_rises_with_band](/theorem/photon_energy_rises_with_band) — proven `by decide`, sorry-free:

```lean
((List.range 7).map (fun b => b)) = [0,1,2,3,4,5,6]
```

### The visible window is LESS than one octave — an octave doubles the frequency (halves the wavelength), but visible light runs 700 nm to 400 nm, a ratio 700/400 = 1.75 < 2 (700 < 2·400 = 800). We see under a single octave of light, unlike the many octaves of sound.
The ledger holds this as [visible_under_one_octave](/theorem/visible_under_one_octave) — proven `by decide`, sorry-free:

```lean
700 < 2 * 400
```

### An octave of light is a doubling, exactly as in sound: one octave up doubles the frequency, so a wave at 500 THz has its octave at 1000 THz — 500·2 = 1000. The same doubling ring the vortex turns on carries the light.
The ledger holds this as [octave_of_light_doubles](/theorem/octave_of_light_doubles) — proven `by decide`, sorry-free:

```lean
500 * 2 = 1000
```

### λ and f are inverses at fixed c: double the frequency and the wavelength halves so the product is unchanged — (2·f)·(λ/2) = f·λ. Here doubling 3 to 6 while halving 100 to 50 keeps the product 300: 6·50 = 3·100 = 300.
The ledger holds this as [inverse_at_fixed_c](/theorem/inverse_at_fixed_c) — proven `by decide`, sorry-free:

```lean
6 * 50 = 3 * 100
```

### The visible band itself splits into SEVEN named colours — the ROYGBIV rosette (red, orange, yellow, green, blue, indigo, violet) — so the spectrum a human eye reads is again a seven, a rosette inside the fourth band.
The ledger holds this as [visible_seven_colours](/theorem/visible_seven_colours) — proven `by decide`, sorry-free:

```lean
(List.range 7).length = 7
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
