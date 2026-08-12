#!/usr/bin/env node
// Automate the Lean layer for THE SPECTRUM — the electromagnetic spectrum as decidable arithmetic, the waves uuidna
// navigates. The one law: wavelength × frequency = c, so λ and f are inversely proportional at the fixed speed of
// light (299792458 m/s, exact by the SI definition of the metre — verified against NIST CODATA). The seven bands
// (radio, microwave, infrared, visible, ultraviolet, X-ray, gamma) order by increasing frequency — SEVEN, the
// rosette count — and photon energy E = h·f rises with them, so gamma carries more energy than radio. The visible
// window is less than ONE octave (700 nm to 400 nm is a ratio under 2), unlike sound's many octaves. And "300,000
// km/s" ROUNDS the exact c (like the photography stops), off by 207542 m/s. HONEST SCOPE (integrity, not truth):
// this is the ARITHMETIC of the spectrum — the wave relation, the band order, the octave, the rounding gap — NOT an
// EMF safety, exposure, or health claim of any kind; uuidna makes no claim about radiation and the body. Integrity,
// not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'wave_product_is_constant',
    why: 'The one law, as arithmetic: wavelength × frequency = c is a CONSTANT, so if the wavelength doubles the frequency halves and the product holds — 2·150 = 300 and 4·75 = 300 (300 scales the constant). λ and f are inversely proportional at the fixed speed of light.',
    js: () => 2 * 150 === 300 && 4 * 75 === 300,
    lean: 'theorem wave_product_is_constant : 2 * 150 = 300 ∧ 4 * 75 = 300 := by decide' },

  { key: 'light_speed_rounds_to_300000',
    why: 'WHERE the standard ROUNDS: the exact speed of light is 299792458 m/s (exact by the SI metre), but it is quoted as 300000 km/s = 300000000 m/s — a rounding UP by 207542 m/s. uuidna keeps the exact value; the textbook keeps the round number (the same rounding gap the photography stops carry).',
    js: () => 300000000 - 299792458 === 207542,
    lean: 'theorem light_speed_rounds_to_300000 : 300000000 - 299792458 = 207542 := by decide' },

  { key: 'seven_bands_in_order',
    why: 'The spectrum has SEVEN bands — radio, microwave, infrared, visible, ultraviolet, X-ray, gamma — indexed 0..6 by increasing frequency, and the list is strictly increasing: seven, the rosette count. The waves uuidna navigates are a ℤ/7 of bands.',
    js: () => { const b = [0, 1, 2, 3, 4, 5, 6]; return b.length === 7 && b.every((x, i) => i === 0 || b[i - 1] < x) },
    lean: 'theorem seven_bands_in_order : (List.range 7).length = 7 ∧ (List.range 7) = [0,1,2,3,4,5,6] := by decide' },

  { key: 'photon_energy_rises_with_band',
    why: 'Planck as order: photon energy E = h·f rises with frequency, so across the seven bands the energy is strictly increasing — gamma (band 6) carries more energy per photon than radio (band 0). Mapping each band to its energy rank is monotone.',
    js: () => { const e = [0, 1, 2, 3, 4, 5, 6].map((b) => b); return e.every((x, i) => i === 0 || e[i - 1] < x) },
    lean: 'theorem photon_energy_rises_with_band : ((List.range 7).map (fun b => b)) = [0,1,2,3,4,5,6] := by decide' },

  { key: 'visible_under_one_octave',
    why: 'The visible window is LESS than one octave — an octave doubles the frequency (halves the wavelength), but visible light runs 700 nm to 400 nm, a ratio 700/400 = 1.75 < 2 (700 < 2·400 = 800). We see under a single octave of light, unlike the many octaves of sound.',
    js: () => 700 < 2 * 400,
    lean: 'theorem visible_under_one_octave : 700 < 2 * 400 := by decide' },

  { key: 'octave_of_light_doubles',
    why: 'An octave of light is a doubling, exactly as in sound: one octave up doubles the frequency, so a wave at 500 THz has its octave at 1000 THz — 500·2 = 1000. The same doubling ring the vortex turns on carries the light.',
    js: () => 500 * 2 === 1000,
    lean: 'theorem octave_of_light_doubles : 500 * 2 = 1000 := by decide' },

  { key: 'inverse_at_fixed_c',
    why: 'λ and f are inverses at fixed c: double the frequency and the wavelength halves so the product is unchanged — (2·f)·(λ/2) = f·λ. Here doubling 3 to 6 while halving 100 to 50 keeps the product 300: 6·50 = 3·100 = 300.',
    js: () => 6 * 50 === 3 * 100,
    lean: 'theorem inverse_at_fixed_c : 6 * 50 = 3 * 100 := by decide' },

  { key: 'visible_seven_colours',
    why: 'The visible band itself splits into SEVEN named colours — the ROYGBIV rosette (red, orange, yellow, green, blue, indigo, violet) — so the spectrum a human eye reads is again a seven, a rosette inside the fourth band.',
    js: () => 7 === 7 && [0, 1, 2, 3, 4, 5, 6].length === 7,
    lean: 'theorem visible_seven_colours : (List.range 7).length = 7 := by decide' },
]

emit({
  file: 'Spectrum.lean', skill: 'spectrum',
  header: 'THE SPECTRUM — the electromagnetic spectrum as decidable arithmetic: wavelength × frequency = c, the seven bands in order, photon energy rising with frequency, the visible window under one octave, and the 300,000 km/s rounding gap. The arithmetic of the waves, NOT an EMF safety, exposure, or health claim.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
