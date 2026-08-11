#!/usr/bin/env node
// lean-ledger — LEAN IS THE SINGLE SOURCE OF THEOREMS. This parses every lean/*.lean theorem (organised by
// computing principle) and writes src/theorems/generated.ts — the one derived ledger the package, the MCP tools,
// the trial and the site all consume. No theorem is authored anywhere else: a theorem computes in Lean, or it is
// not a theorem. Names come from the *-manifest.json emitted alongside each proof. Run by `npm run lean`.
import { writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { LeanTheorem } from '../theorems/generated.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const LEAN_DIR = join(ROOT, 'lean')

// the computing-principle order — the derivation order the whole layer is organised by
export const PRINCIPLE = [
  ['Core.lean', 'The 8×8 core', "the multiplication table of ℤ/9's eight non-zero residues — from these 64 the rest computes"],
  ['Ring.lean', 'The ring ℤ/9', 'the vortex ring: its full multiplication, addition and power tables'],
  ['Rosette.lean', 'The rosette ℤ/7', 'the Pliska group: its full multiplication, addition and power tables'],
  ['Uuidna.lean', 'The vortex algebra', 'units, orbit, involution, gravity, division by zero, light — the foundational facts'],
  ['Vortex.lean', 'Ported from millennium-solutions', 'the honest ℤ/9 & ℤ/7 facts, ported to plain Lean (no Mathlib)'],
  ['Sequence.lean', 'The sequence & reflection group', 'the mirror, AGL(1,ℤ/9)=54, one strip, neighbours, the ± polarities, the crypt salt'],
  ['DivByZero.lean', 'Division by zero', 'the reflection dz(x)=10−x — a finite residue, never infinity'],
  ['BioPhysics.lean', 'Applied structure — the science pairs', 'blood, DNA, sound, chemistry, music, acid-base, heredity, colour — the algebra, demarcated'],
  ['Discover.lean', 'Self-discovered', 'facts derived by function: Lagrange, the unit criterion, idempotents'],
  ['Quantum.lean', 'The quantum computer', 'the exact facts the classical state-vector simulator computes — Born rule, no-signaling, GHZ, gate truth-tables, phase algebra; simulation, not hardware'],
  ['Clay.lean', 'The seven reflected', 'the seven Clay problems reflected into the ℤ/9 structure and solved none — a bijection that relabels, it does not propagate proofs; it reflects all seven and solves none'],
  ['Infinity.lean', 'The physics infinities, made finite', 'the nasty divergences of physics — UV catastrophe, self-energy, the Landau pole, 1+2+3+…, the derivative 0/0, δ(0), the horizon, the 1/r singularity — each the finite object physics puts where the naive infinity was, exactly as dz(x)=10−x replaces x/0'],
  ['Cipher.lean', 'The cipher & the strand', 'crypto ∩ DNA, honest by construction — base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR (why a step must rotate), a linear fold is malleable (a receipt is integrity, not a seal), the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but linear, and Grover only halves the key (256→128, not a break) — the shared algebra and its honest limits'],
  ['Audit.lean', 'The detectors, proven', 'the provenance gate as decidable logic — flag(h,d,b)=h·(1−d)·(1−b): hollow prose is flagged only when neither demarcated nor backed by a sealed theorem, a demarcation clears it, a backing clears it, and of the eight states exactly one fires — the honesty detector, itself a theorem set'],
  ['Coins.lean', 'The two coins & the 64', 'the honest billing/measure algebra — the two coins are the conserved fair-exchange invariant (110−108 = 2 = −χ of the double torus, genus 2), 64 = 2⁶ is the bit measure, contribute 2 to save up to 64 (leverage 32), n qubits give 2ⁿ direct outcomes reaching 64 at n=6, and the measured saving never goes negative — a measured unit of work saved, not a price and not a claim of speed'],
  ['Neuro.lean', 'The algebra of the neuron', 'neuroscience, demarcated — all-or-none firing as a threshold step, sub-threshold silence, supra-threshold spike, monotone firing, spatial summation (two sub-threshold inputs sum to fire), the excitatory−inhibitory net drive, the −70→+40 mV action potential (rest < threshold < peak), Hebbian coincidence (Δw = pre·post), and the refractory cap — the textbook model as decidable algebra, not clinical and not about any individual'],
  ['Propulsion.lean', 'Propulsion — Newtonian & bounded', 'thrust is conserved momentum (Newton\'s third law), it REQUIRES reaction mass (zero exhaust → zero thrust: no reactionless/free drive), thrust = ṁ·vₑ, the Δv budget adds across stages, and acceleration a = F/m is finite — no infinite g. The algebra of rocketry, demarcated: not a novel drive, not FTL, not infinite g'],
  ['Navigation.lean', 'Navigation — bounded geometry', 'straight-line distance is Pythagorean (3-4-5), the compass rose is ℤ/8 (eight 45° headings), the reciprocal bearing is +4 (an involution), a quarter turn is +2 (order 4), and dead reckoning is the vector sum of the legs — classical navigation as decidable algebra, not GPS-grade guidance and not a positioning claim about anyone'],
  ['Command.lean', 'Command authentication', 'the auth gate as decidable logic — a command is accepted iff it is signed AND its tag verifies (accept = signed·verifies): unsigned rejected, a failing/tampered tag rejected, exactly one tag verifies, tampering changes the tag, and a LINEAR tag is forgeable (why the real MAC is HMAC-SHA256, KAT-verified, not this model) — the gate logic proven, the strength demarcated'],
  ['Astronomy.lean', 'The fixed stars', 'positional astronomy as decidable arithmetic — the celestial sphere is 360° (15°/hour × 24; the ecliptic 12 × 30°), sexagesimal gives 3600 arcsec/degree, Kepler\'s harmonic law T²=a³ holds in scaled units, the Metonic cycle is 19 years = 235 synodic months, the classical great year precesses 72 years/degree (25920), and declination spans 180° pole to pole — the fixed references of the sky, exact ratios and cycles, demarcated (some classical approximations, not cosmological claims)'],
  ['Diving.lean', 'Diving — trimix gas laws', 'the decidable arithmetic of trimix diving, demarcated — a mix sums to 100%, absolute pressure is 1+depth/10 atm, Dalton makes partial pressures sum to it, air leaves the oxygen window at depth (why trimix), gases blend by partial pressure, helium is non-narcotic, and a direct ascent exceeding the Haldane ratio needs a stop. HARD SAFETY SCOPE: arithmetic only, NEVER a dive plan — use training, tables, and a computer'],
  ['Optics.lean', 'The light domain', 'geometric optics as decidable arithmetic, demarcated — reflection is an involution (angle in = angle out), the refractive index n=c/v ≥ 1 so light in a medium is slower than c (no FTL), Snell\'s law n₁sinθ₁=n₂sinθ₂ holds in a consistent case (4·3=3·4), the thin-lens equation 1/f=1/do+1/di and its magnification are exact, dispersion refracts blue more than red, and total internal reflection needs a denser source — the light domain, consistent cases, not a full wave-optics derivation'],
  ['Acoustics.lean', 'The sound domain', 'acoustics as decidable arithmetic, demarcated — the harmonic series stacks integer multiples of the fundamental, the wave speed is v=f·λ, sound (343 m/s) is far slower than light, the decibel is logarithmic (10 dB = ×10 intensity), two tones beat at their difference, the Doppler shift raises pitch on approach and lowers it on recession, a closed pipe sounds only odd harmonics, and intensity falls as the inverse square of distance — the sound domain, exact ratios, distinct from the music/432 ladder in BioPhysics'],
  ['OneLeap.lean', 'One leap', 'the whole vortex proved in a single by decide'],
]

const manifest: Record<string, string> = {}
for (const f of readdirSync(LEAN_DIR).filter((f) => f.endsWith('-manifest.json'))) for (const e of JSON.parse(readFileSync(join(LEAN_DIR, f), 'utf8')) as { key: string; name: string }[]) manifest[e.key] = e.name

const parseLean = (file: string): Omit<LeanTheorem, 'file' | 'principle'>[] => [...readFileSync(join(LEAN_DIR, file), 'utf8')
  .matchAll(/theorem\s+(\w+)\s*:([\s\S]*?):=\s*by([\s\S]*?)(?=\n(?:--|theorem|def|namespace|end|$))/g)]
  .map((m) => ({ key: m[1], statement: m[2].trim().replace(/\s+/g, ' '), tactic: m[3].trim().replace(/\s+/g, ' '), name: manifest[m[1]] || m[2].trim().replace(/\s+/g, ' ') }))

const allFiles = existsSync(LEAN_DIR) ? readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean')).sort() : []
const ordered = [...PRINCIPLE.map((p) => p[0]).filter((f) => allFiles.includes(f)), ...allFiles.filter((f) => !PRINCIPLE.some((p) => p[0] === f))]
const titleOf = (f: string) => (PRINCIPLE.find((p) => p[0] === f) || [f, 'lean/' + f])[1]

const ledger = ordered.flatMap((file) => parseLean(file).map((t) => ({ ...t, file, principle: titleOf(file) })))

// A principle appears only if it actually carries theorems — remove any with a count of zero (not needed).
const countOf = (f: string) => ledger.filter((t) => t.file === f).length
const keptPrinciples = PRINCIPLE.filter((p) => ordered.includes(p[0]) && countOf(p[0]) > 0)

const body = ledger.map((t) =>
  `  { key: ${JSON.stringify(t.key)}, name: ${JSON.stringify(t.name)}, statement: ${JSON.stringify(t.statement)}, tactic: ${JSON.stringify(t.tactic)}, file: ${JSON.stringify(t.file)}, principle: ${JSON.stringify(t.principle)} },`
).join('\n')

const out = `// src/theorems/generated.ts — GENERATED from lean/*.lean by scripts/lean-ledger.mjs. DO NOT EDIT.
// Lean is the single source of theorems; this is the derived ledger the package, MCP, trial and site consume.
// Every entry corresponds to a theorem verified sorry-free by \`npm run lean\` before this file was written.

export interface LeanTheorem { key: string; name: string; statement: string; tactic: string; file: string; principle: string }

/** The ${ledger.length} Lean-proven theorems, in computing-principle order. */
export const LEAN_LEDGER: readonly LeanTheorem[] = [
${body}
]

/** The principles that carry theorems, in derivation order — [file, title, blurb]. */
export const PRINCIPLES: readonly [string, string, string][] = [
${keptPrinciples.map((p) => `  [${JSON.stringify(p[0])}, ${JSON.stringify(p[1])}, ${JSON.stringify(p[2])}],`).join('\n')}
]
`

writeFileSync(join(ROOT, 'src', 'theorems', 'generated.ts'), out)

// Also derive lean/PRINCIPLE.md — the human index. Every COUNT and the TOTAL are computed from the parsed ledger
// (never hardcoded, so the doc can never go stale); titles and blurbs come from the PRINCIPLE metadata above.
const md = `# The formal layer, organized by computing principle

<!-- GENERATED from lean/*.lean by scripts/lean-ledger — DO NOT EDIT. Counts are derived; edit titles/blurbs in the PRINCIPLE metadata. -->

Every theorem below is proven \`by decide\` in Lean, verified sorry-free by \`npm run lean\` — **${ledger.length} theorems** in
derivation order. A theorem computes in Lean, or it is not a theorem.

${keptPrinciples.map((p, i) => `${i + 1}. **${p[1]}** — \`lean/${p[0]}\` · **${countOf(p[0])}** theorems\n   ${p[2]}`).join('\n\n')}

---

Rendered as schema.org microdata cards at [uuidna.com/theorems](https://uuidna.com/theorems), folded to one recomputable receipt.
`
writeFileSync(join(ROOT, 'lean', 'PRINCIPLE.md'), md)
console.log('✓ src/theorems/generated.ts + lean/PRINCIPLE.md — ' + ledger.length + ' Lean theorems (single source), organised by ' + keptPrinciples.length + ' principles.')
