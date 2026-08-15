// aura — the QUANTUM AURA: a recomputable COLOUR for any content-address, tuned to A432 — the artistic "captain string
// theory". The 7 rosette rays (ℤ/7) are the spectral bands; the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray
// rides; the hue steps by the A432 angle (360/9 = 40°). Deterministic: the same address folds to the same aura for
// every observer (no RNG, no clock) — the colour is content-addressed, like everything else. The MOVING aura is a CSS
// block whose animation parameters are computed from the address, so a page's glow IS its fingerprint in light.
//
// HONEST SCOPE: integrity, not truth. This is an ARTISTIC, recomputable colour mapping — NOT physics, NOT real string
// theory, and NOT a claim that sound IS light or that 432 Hz carries special physical power. It is a deterministic
// aesthetic derived from the address: a defined arithmetic from a number to a hue. Recomputable by anyone; it decorates
// the work, it does not describe the universe.
import { toUuid, A432_STEP, vortexOrbit } from './address.js'

const RAYS = 7                                   // the ℤ/7 rosette rays — the spectral bands (z7rays_seven)
const WAVE = vortexOrbit()                       // the ℤ/9 vortex orbit [1,2,4,8,7,5] — the wave each ray rides

export interface Aura {
  address: string          // the content-address the aura is folded from
  ray: number              // which of the 7 A432 rays (0..6)
  wave: number             // the ray's phase on the ℤ/9 vortex wave
  hue: number              // 0..359 — the A432-stepped hue angle
  hsl: string              // the colour, HSL
  rgb: string              // the colour, RGB hex
  cmyk: [number, number, number, number]  // the print colour
  css: string              // a ready CSS block: the moving aura (hue-rotating glow), keyframes + a .uuidna-aura class
  honest: string
}

const HONEST =
  'The quantum aura: a recomputable, A432-tuned colour folded from a content-address (the 7 rosette rays as bands, the ' +
  'ℤ/9 vortex as the wave, the hue stepping by 360/9 = 40°). Deterministic — the same address, the same aura for ' +
  'everyone. ARTISTIC, not physics: it is a defined arithmetic from a number to a hue, NOT real string theory and not a ' +
  'claim that sound is light. It decorates the work; it does not describe the universe. Integrity, not truth.'

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
 *  returns the colour in HSL/RGB/CMYK plus a ready moving-aura CSS block. Artistic, not physics. */
export function quantumAura(subject: string): Aura {
  const address = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(subject) ? subject : toUuid(subject)
  const n = parseInt(address.replace(/-/g, '').slice(0, 8), 16)   // a stable integer from the address
  const ray = n % RAYS                                             // 0..6 — the spectral band
  const wi = n % WAVE.length                                       // 0..5 — the wave index (lightness channel)
  const wave = WAVE[wi]                                            // the ray's phase on the ℤ/9 vortex wave
  // hue: step by the A432 angle (40° = 360/9) per ℤ/9 residue, offset by the ray's share of the wheel (360/7 per ray)
  const hue = ((n % 9) * A432_STEP + ray * floorN(360 / RAYS) + wave) % 360
  const sat = 62 + 2 * ray                                         // 62..74 % — the ray, readable from the colour
  const light = 50 + 2 * wi                                        // 50..60 % — the wave index, readable from the colour
  const [r, g, b] = hslToRgb(hue, sat, light)
  const rgb = '#' + hex2(r) + hex2(g) + hex2(b)
  const cmyk = rgbToCmyk(r, g, b)
  const hsl = `hsl(${hue}, ${sat}%, ${light}%)`
  const period = 12 + ray * 2                                      // seconds — the ray sets the wave's tempo (deterministic)
  const css =
    `@keyframes uuidna-aura-${ray} { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }\n` +
    `.uuidna-aura { color: ${hsl};\n` +
    `  box-shadow: 0 0 24px 4px ${hsl}, 0 0 64px 12px ${rgb}44;\n` +
    `  animation: uuidna-aura-${ray} ${period}s linear infinite; }`
  return { address, ray, wave, hue, hsl, rgb, cmyk, css, honest: HONEST }
}

/** auraDecode(rgbHex) → the state the colour carries — {residue, ray, wave, hue, sat, light} — or null if the hex
 *  is not one of the 378 aura colours. EXACT by construction: every state renders through the same pipeline and the
 *  hex is matched, so decode∘encode = id (the fold verifies the whole table stays collision-free at every seal).
 *  The colour is a reversible harmonic message — state and status readable from the glow. Art, not physics. */
export function auraDecode(rgbHex: string): { residue: number; ray: number; wave: number; hue: number; sat: number; light: number } | null {
  const target = rgbHex.toLowerCase()
  for (let a = 0; a < 9; a++) for (let ray = 0; ray < RAYS; ray++) for (let wi = 0; wi < WAVE.length; wi++) {
    const wave = WAVE[wi]
    const hue = (a * A432_STEP + ray * floorN(360 / RAYS) + wave) % 360
    const sat = 62 + 2 * ray, light = 50 + 2 * wi
    const [r, g, b] = hslToRgb(hue, sat, light)
    if ('#' + hex2(r) + hex2(g) + hex2(b) === target) return { residue: a, ray, wave, hue, sat, light }
  }
  return null
}
