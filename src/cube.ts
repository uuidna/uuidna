// cube — THE QUANTUM-CUBE CHALLENGE: a recomputable, deterministic challenge-response with the "spinning quantum cube"
// (the A432 aura, rendered as a rotating 3D cube) as its visual answer. The verifier issues a NONCE; the holder of a
// shared SECRET answers by folding secret+nonce to a content-address and computing its quantum aura — the exact cube.
// A holder of the secret reproduces the exact cube for that nonce; an imitator cannot (a redirect or a copied cube for
// a DIFFERENT nonce fails). verifyQuantumCube recomputes and compares. Deterministic — no clock, no RNG (uuidna does
// not GENERATE the nonce; the verifier supplies it from their own entropy, and uuidna RESPONDS).
//
// HONEST SCOPE: integrity, not truth. This is a SYMMETRIC challenge-response — the verifier must share the secret to
// check it (like the ChaCha passphrase); its strength is the SECRET'S entropy, measured not asserted. It is NOT
// zero-knowledge, NOT public-key, and NOT biometric: it proves knowledge of the shared secret for a fresh nonce, and
// nothing about a person's voice, face, or liveness — those are runtime layers OUTSIDE uuidna's recomputable model.
// The cube itself is ART (the aura's colour arithmetic rendered as a rotating cube), never a cipher. Reusing a nonce
// leaks nothing new but proves nothing fresh; use a new nonce each challenge.
import { toUuid } from './address.js'
import { quantumAura } from './aura.js'

export interface QuantumCube {
  nonce: string             // the verifier-supplied challenge (uuidna never generates it — no RNG)
  response: string          // the content-address of secret|nonce — the answer the verifier recomputes and checks
  ray: number               // the ℤ/7 rosette ray of the cube (0..6)
  hue: number               // the A432 hue (0..359)
  hsl: string               // the cube's colour
  spinDegPerSec: number     // the cube's spin speed, derived from the ray (deterministic)
  axis: 'x' | 'y' | 'z'     // the spin axis, derived from the hue (deterministic)
  css: string               // a ready CSS block: a rotating 3D cube coloured by the aura (the moving "quantum cube")
  honest: string
}

const HONEST =
  'The quantum-cube challenge: a SYMMETRIC, deterministic challenge-response — the holder answers a verifier-supplied ' +
  'nonce by folding secret+nonce to a content-address and computing its aura (the spinning cube). The verifier ' +
  'recomputes and compares (it must SHARE the secret — not zero-knowledge, not public-key). Strength is the secret\'s ' +
  'entropy, measured not asserted; it proves knowledge of the shared secret for a fresh nonce, NOTHING about voice, ' +
  'face, or liveness (those are runtime layers outside this recomputable model). The cube is ART, not a cipher. ' +
  'Integrity, not truth.'

// the spinning-cube CSS: a 3D cube whose six faces wear the aura, rotating on the derived axis at the derived speed.
// Pure string assembly from integer params — no Math.*, no clock, no RNG.
const cubeCss = (hsl: string, ray: number, spin: number, axis: string): string => {
  const face = `position:absolute;width:120px;height:120px;background:${hsl};opacity:.85;border:2px solid rgba(255,255,255,.35);box-sizing:border-box`
  return [
    `.uuidna-cube{width:120px;height:120px;position:relative;transform-style:preserve-3d;`,
    `animation:uuidna-cube-spin ${spin}s linear infinite}`,
    `.uuidna-cube .f{${face}}`,
    `.uuidna-cube .f1{transform:translateZ(60px)}.uuidna-cube .f2{transform:rotateY(180deg) translateZ(60px)}`,
    `.uuidna-cube .f3{transform:rotateY(90deg) translateZ(60px)}.uuidna-cube .f4{transform:rotateY(-90deg) translateZ(60px)}`,
    `.uuidna-cube .f5{transform:rotateX(90deg) translateZ(60px)}.uuidna-cube .f6{transform:rotateX(-90deg) translateZ(60px)}`,
    `@keyframes uuidna-cube-spin{from{transform:rotate${axis.toUpperCase()}(0deg)}to{transform:rotate${axis.toUpperCase()}(360deg)}}`,
  ].join('')
}

/** quantumCubeChallenge(secret, nonce) → the deterministic spinning-cube ANSWER to a challenge: fold secret+nonce to a
 *  content-address and render its aura as a rotating 3D cube. The verifier (who shares the secret) recomputes the same
 *  response for the same nonce. Symmetric, deterministic, offline — strength is the secret's entropy. Integrity, not truth. */
export function quantumCubeChallenge(secret: string, nonce: string): QuantumCube {
  const response = toUuid(secret + '|' + nonce)
  const aura = quantumAura(response)
  const spinDegPerSec = (aura.ray + 1) * 30            // 30..210 — integer, deterministic from the ray
  const spinPeriod = 42 - aura.ray * 4                 // seconds per turn (faster ray → shorter period), integer, > 0
  const axis: 'x' | 'y' | 'z' = aura.hue % 3 === 0 ? 'y' : aura.hue % 3 === 1 ? 'x' : 'z'
  return {
    nonce, response, ray: aura.ray, hue: aura.hue, hsl: aura.hsl, spinDegPerSec, axis,
    css: cubeCss(aura.hsl, aura.ray, spinPeriod, axis),
    honest: HONEST,
  }
}

/** verifyQuantumCube(secret, nonce, response) → recompute the challenge answer and compare. True iff the responder
 *  folded the SAME secret and the SAME nonce (proving knowledge of the shared secret for this nonce). Symmetric — the
 *  verifier holds the secret. A copied cube for a different nonce, or an imitator without the secret, fails. */
export function verifyQuantumCube(secret: string, nonce: string, response: string): boolean {
  return quantumCubeChallenge(secret, nonce).response === response
}
