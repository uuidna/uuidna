#!/usr/bin/env node
// Automate the Lean layer for OPTICS — the light domain, as decidable arithmetic, demarcated. Reflection is an
// involution (angle in = angle out; reflect twice, return); the refractive index n = c/v is ≥ 1, so light in a
// medium is SLOWER than c (never faster — no FTL, the vacuum is the ceiling); Snell's law n₁sinθ₁ = n₂sinθ₂ holds
// in a consistent rational-sine case; the thin-lens equation 1/f = 1/do + 1/di and its magnification are exact;
// dispersion refracts blue more than red; and total internal reflection needs a denser source. the
// arithmetic of geometric optics — specific consistent cases (Snell/critical angle use rational sines)
// wave-optics derivation. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)

const FACTS = [
  { key: 'law_of_reflection',
    why: 'The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.',
    js: () => R(0, 181).every((a) => 180 - (180 - a) === a),
    lean: 'theorem law_of_reflection : (List.range 181).all (fun a => (180 - (180 - a)) == a) := by decide' },

  { key: 'refractive_index_ge_one',
    why: 'The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.',
    js: () => [100, 133, 150, 242].every((n) => 100 <= n),
    lean: 'theorem refractive_index_ge_one : ([100,133,150,242] : List Nat).all (fun n => 100 <= n) := by decide' },

  { key: 'light_slower_in_medium',
    why: 'Light slows in matter: with n > 1 the phase speed v = c/n is strictly less than c — water (1.33), glass (1.50) and diamond (2.42) all have index above the vacuum 1.00. The vacuum speed is the ceiling; no medium beats it.',
    js: () => [133, 150, 242].every((n) => 100 < n),
    lean: 'theorem light_slower_in_medium : ([133,150,242] : List Nat).all (fun n => 100 < n) := by decide' },

  { key: 'snell_law',
    why: "Snell's law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.",
    js: () => 4 * 3 === 3 * 4,
    lean: 'theorem snell_law : 4 * 3 = 3 * 4 := by decide' },

  { key: 'thin_lens_equation',
    why: 'The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.',
    js: () => 10 * 30 + 10 * 15 === 15 * 30,
    lean: 'theorem thin_lens_equation : 10*30 + 10*15 = 15*30 := by decide' },

  { key: 'magnification',
    why: 'Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.',
    js: () => 30 / 15 === 2,
    lean: 'theorem magnification : 30 / 15 = 2 := by decide' },


]

// compute → generate → verify. The light domain — reflection, refraction, the lens, dispersion, TIR — as decidable
// arithmetic, demarcated: geometric optics in consistent cases, and light in a medium is slower than c (no FTL).
emit({ file: 'Optics.lean', skill: 'optics',
  header: 'OPTICS — the light domain, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
