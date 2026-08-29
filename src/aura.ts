// aura — the QUANTUM AURA: a recomputable COLOUR for any content-address, tuned to A432 — the artistic "captain string
// theory". The 7 rosette rays (ℤ/7) are the spectral bands; the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray
// rides; the hue steps by the A432 angle (360/9 = 40°). Deterministic: the same address folds to the same aura for
// every observer (no RNG, no clock) — the colour is content-addressed, like everything else. The MOVING aura is a CSS
// block whose animation parameters are computed from the address, so a page's glow IS its fingerprint in light.
//
// HONEST SCOPE: integrity. This is an ARTISTIC, recomputable colour mapping — NOT physics
// theory, and NOT a claim that sound IS light or that 432 Hz carries special physical power. It is a deterministic
// aesthetic derived from the address: a defined arithmetic from a number to a hue. Recomputable by anyone; it decorates
// the work, it does not describe the universe.
import { toUuid, A432_STEP, vortexOrbit, BASE, TRINITY } from './address.js'
import { seedOf } from './handle.js'   // THE one address→integer derivation — see handle.ts
import { COINS, HANDLE_HEXBITS, LEVERAGE, HEXBIT_BITS } from './hexbit/index.js'

/** Rosette rays — BASE − COINS = 7 (z7rays_seven). Not a stranded 7. */
export const RAYS = BASE - COINS
/** Three free aura coordinates — residue, ray, wave (ten_square_computes_ten_dimensions). */
export const FREE_DIMS = TRINITY
/** Seven compactified — hue, sat, light, period, rotation, glowInner, glowOuter. Same count as the rays. */
export const COMPACT_DIMS = RAYS
/** 3 + 7 = 10. */
export const TEN_DIMS = FREE_DIMS + COMPACT_DIMS

export const FREE_KEYS = ['residue', 'ray', 'wave'] as const
export const COMPACT_KEYS = ['hue', 'sat', 'light', 'period', 'rotation', 'glowInner', 'glowOuter'] as const

const WAVE = vortexOrbit()                       // the ℤ/9 vortex orbit [1,2,4,8,7,5] — the wave each ray rides

/** Turn of the colour wheel — A432_STEP × BASE. */
export const rotationOf = (): number => A432_STEP * BASE
/** Inner glow px — HANDLE_HEXBITS × TRINITY. */
export const glowInnerOf = (): number => HANDLE_HEXBITS * TRINITY
/** Outer glow px — LEVERAGE (the 64-bit coin). */
export const glowOuterOf = (): number => LEVERAGE
/** Inner shadow spread — one hexbit. */
export const glowSpreadInnerOf = (): number => HEXBIT_BITS
/** Outer shadow spread — hexbit × trinity. */
export const glowSpreadOuterOf = (): number => HEXBIT_BITS * TRINITY
/** Period in seconds — COINS × (hexagram width + ray). Hexagram width is HEXBIT_BITS + COINS. */
export const periodOf = (ray: number): number => COINS * (HEXBIT_BITS + COINS + ray)

export interface Aura {
  address: string          // the content-address the aura is folded from
  ray: number              // which of the 7 A432 rays (0..6)
  wave: number             // the ray's phase on the ℤ/9 vortex wave
  hue: number              // 0..359 — the A432-stepped hue angle
  hsl: string              // the colour, HSL
  rgb: string              // the colour, RGB hex
  cmyk: [number, number, number, number]  // the print colour
  css: string              // a ready CSS block: the moving aura (hue-rotating glow), keyframes + a .uuidna-aura class
  ten: TenD                // 3 free + 7 compactified — the 10D animation IS this record
  honest: string
}

/** The 10D bag: three free coordinates, seven compactified functions of them. Art, not physics. */
export interface TenD {
  residue: number
  ray: number
  wave: number
  hue: number
  sat: number
  light: number
  period: number
  rotation: number
  glowInner: number
  glowOuter: number
}

const HONEST =
  'The quantum aura: a recomputable, A432-tuned colour folded from a content-address (the 7 rosette rays as bands, the ' +
  'ℤ/9 vortex as the wave, the hue stepping by 360/9 = 40°). Deterministic — the same address, the same aura for ' +
  'everyone. ARTISTIC, not physics: it is a defined arithmetic from a number to a hue, NOT real string theory and not a ' +
  'claim that sound is light. It decorates the work; it does not describe the universe. Integrity.'

// abs and floor via exact comparison / arithmetic, NO Math.* — the determinism hard-reject bans host intrinsics.
const absN = (n: number): number => (n < 0 ? -n : n)
const floorN = (n: number): number => n - (((n % 1) + 1) % 1)
// hue → RGB (exact 60°-sector HSL→RGB) — pure arithmetic, no Math.*. S and L are now MESSAGE CHANNELS, not
// constants: saturation carries the ray (62+2·ray %), lightness the wave index (50+2·i %) — the colour becomes a
// REVERSIBLE harmonic message (auraDecode below): hue alone cannot carry the 378 states (9·7·6 > 360 — the
// ledger's own pigeonhole), so the two idle channels join the code and the hex speaks the whole state.
const hslToRgb = (h: number, s = 68, l = 56): [number, number, number] => {
  const c = (1 - absN(2 * l - 100) / 100) * (s / 100)      // chroma
  return sectorRgb(h, c, l / 100)
}
const sectorRgb = (h: number, c: number, l: number): [number, number, number] => {
  const hp = h / 60
  const x = c * (1 - absN((hp % 2) - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  const seg = floorN(hp) % 6
  if (seg === 0) { r = c; g = x } else if (seg === 1) { r = x; g = c }
  else if (seg === 2) { g = c; b = x } else if (seg === 3) { g = x; b = c }
  else if (seg === 4) { r = x; b = c } else { r = c; b = x }
  const to255 = (v: number): number => { const n = floorN((v + m) * 255 + 0.5); return n < 0 ? 0 : n > 255 ? 255 : n }
  return [to255(r), to255(g), to255(b)]
}
const hex2 = (n: number): string => (n < 16 ? '0' : '') + n.toString(16)
const rgbToCmyk = (r: number, g: number, b: number): [number, number, number, number] => {
  const R = r / 255, G = g / 255, B = b / 255
  const k = 1 - (R > G ? (R > B ? R : B) : (G > B ? G : B))
  if (k === 1) return [0, 0, 0, 100]
  const pc = (x: number): number => floorN(((1 - x - k) / (1 - k)) * 100 + 0.5)
  return [pc(R), pc(G), pc(B), floorN(k * 100 + 0.5)]
}

/** quantumAura(subject) → the recomputable A432 aura for a content-address (pass an address, or any string to fold
 *  into one). The 7 rays band it, the ℤ/9 vortex waves it, the hue steps by 40°. Deterministic and content-addressed;
 *  returns the colour in HSL/RGB/CMYK plus a ready moving-aura CSS block. Artistic. */
export function quantumAura(subject: string): Aura {
  const address = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(subject) ? subject : toUuid(subject)
  const n = seedOf(address)                                        // a stable integer from the address
  const residue = n % BASE
  const ray = n % RAYS                                             // 0..6 — the spectral band
  const wi = n % WAVE.length                                       // 0..5 — the wave index (lightness channel)
  const wave = WAVE[wi]                                            // the ray's phase on the ℤ/9 vortex wave
  const turn = rotationOf()
  const hue = (residue * A432_STEP + ray * floorN(turn / RAYS) + wave) % turn
  const sat = 62 + 2 * ray + (residue % TRINITY === 0 ? 1 : 0)
  const light = 50 + COINS * wi
  const [r, g, b] = hslToRgb(hue, sat, light)
  const rgb = '#' + hex2(r) + hex2(g) + hex2(b)
  const cmyk = rgbToCmyk(r, g, b)
  const hsl = `hsl(${hue}, ${sat}%, ${light}%)`
  const period = periodOf(ray)
  const glowInner = glowInnerOf()
  const glowOuter = glowOuterOf()
  const spreadIn = glowSpreadInnerOf()
  const spreadOut = glowSpreadOuterOf()
  const css =
    `@keyframes uuidna-aura-${ray} { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(${turn}deg); } }\n` +
    `.uuidna-aura { color: ${hsl};\n` +
    `  box-shadow: 0 0 ${glowInner}px ${spreadIn}px ${hsl}, 0 0 ${glowOuter}px ${spreadOut}px ${rgb}44;\n` +
    `  animation: uuidna-aura-${ray} ${period}s linear infinite; }`
  const ten: TenD = { residue, ray, wave, hue, sat, light, period, rotation: turn, glowInner, glowOuter }
  return { address, ray, wave, hue, hsl, rgb, cmyk, css, ten, honest: HONEST }
}

/** auraDecode(rgbHex) → the state the colour carries — {residue, ray, wave, hue, sat, light} — or null if the hex
 *  is not one of the 378 aura colours. EXACT by construction: every state renders through the same pipeline and the
 *  hex is matched, so decode∘encode = id (the fold verifies the whole table stays collision-free at every seal).
 *  The colour is a reversible harmonic message — state and status readable from the glow. Art. */
export function auraDecode(rgbHex: string): { residue: number; ray: number; wave: number; hue: number; sat: number; light: number } | null {
  const target = rgbHex.toLowerCase()
  for (const e of auraAlphabet()) if (e.rgb === target) return { residue: e.residue, ray: e.ray, wave: e.wave, hue: e.hue, sat: e.sat, light: e.light }
  return null
}

/** the COMPLETE aura alphabet — all 378 states (9 residues × 7 rays × 6 waves) rendered through the one pipeline,
 *  in state order. The colour lesson's table and auraDecode's source; the one receipt seals its fold. */
export function auraAlphabet(): { residue: number; ray: number; wave: number; hue: number; sat: number; light: number; rgb: string }[] {
  const out: { residue: number; ray: number; wave: number; hue: number; sat: number; light: number; rgb: string }[] = []
  const turn = rotationOf()
  for (let a = 0; a < BASE; a++) for (let ray = 0; ray < RAYS; ray++) for (let wi = 0; wi < WAVE.length; wi++) {
    const wave = WAVE[wi]
    const hue = (a * A432_STEP + ray * floorN(turn / RAYS) + wave) % turn
    const sat = 62 + 2 * ray + (a % TRINITY === 0 ? 1 : 0), light = 50 + COINS * wi
    const [r, g, b] = hslToRgb(hue, sat, light)
    out.push({ residue: a, ray, wave, hue, sat, light, rgb: '#' + hex2(r) + hex2(g) + hex2(b) })
  }
  return out
}
