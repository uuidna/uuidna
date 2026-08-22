#!/usr/bin/env node
// gen-anthem — THE RELEASE ANTHEM, derived, never composed, and IN PLACE. The anthem sings the WHOLE ledger:
// theorem k sounds at bar k, in ledger order — the Pi Song's own law (AsapSCIENCE sing digit k at place k) made
// verifiable: where the Pi Song needs English digit names, the anthem sings each theorem's ADDRESS as a two-coin
// chord, so the place-matching is language-free and a listener with the lattice can index into the sound and
// find any theorem where the ledger holds it. Every structural figure is a SEALED theorem (Anthem.lean +
// Song.lean, cited by figure — a missing seal THROWS); the LEDGER ITSELF is the score, so the anthem regrows at
// every reconcile and its length measures the release. Exact integers throughout; the WAV folds to an address
// the page carries. HONEST SCOPE: arithmetic sung — no claim that any tuning heals or any coincidence means.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEAN_LEDGER, type LeanTheorem } from '../theorems/generated.js'
import { theorems } from '../theorems/index.js'
import { merkleFold } from '../address.js'
import { tone, humanise, silence, wav, audioHandleOf, toneOf, GAP_MS, A432_HZ, SAMPLE_RATE } from '../tts/synth.js'

// ── THE SEALS — every figure read back out of the ledger; unsealed bars refuse to render.
const sealed = new Map(LEAN_LEDGER.filter((t) => t.file === 'Anthem.lean' || t.file === 'Song.lean').map((t) => [t.key, t]))
const cite = (key: string, figure?: number): LeanTheorem => {
  const t = sealed.get(key)
  if (!t) throw new Error(`gen-anthem: the ledger holds no seal ${key} — the anthem cannot render an unsealed bar`)
  if (figure !== undefined && !t.statement.includes(String(figure)))
    throw new Error(`gen-anthem: seal ${key} no longer carries the figure ${figure}`)
  return t
}

const BAR = 9 * 7 * 4;      cite('song_four_tongues_fuse', BAR)                 // 252 — the sealed bar
const CHORD = BAR / 2;      cite('anthem_chord_halves_the_bar', CHORD)          // 126 — two coins to the bar
const LENGTHS = [2, 3, 4].map((q) => (BAR * q) / 4)
cite('anthem_three_lengths_quarter_the_bar', LENGTHS[1]!)                       // 126, 189, 252 — the vortex three
const REST = BAR / 12;      cite('anthem_rest_twelfths_the_bar', REST)          // 21 — the breath
const MOVEMENTS = 252 / 63; cite('anthem_four_movements', MOVEMENTS)            // 4 — the DNA tongue conducts
const OCTAVE = 2 * A432_HZ; cite('anthem_closes_on_the_coin_octave', OCTAVE)    // 864 — the coins as interval
const FINALE_TILES = 32;    cite('anthem_finale_sings_one_uuid', FINALE_TILES * 4) // 128 — one uuid, whole
const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9];  cite('song_scale_is_glagolitic', 432 * 9)
const ORBIT = [1, 2, 4, 8, 7, 5];           cite('song_melody_rides_the_orbit', 432 * 8)

// ── THE DERIVATION — exact integers; the ledger is the score.
const idiv = (v: number, d: number): number => (v - (v % d)) / d
const chordOf = (t1: number, t2: number, ms: number): Int16Array => {
  const a = tone(toneOf(t1), ms), b = tone(toneOf(t2), ms), out = new Int16Array(a.length)
  for (let i = 0; i < a.length; i++) out[i] = idiv(a[i]!, 2) + idiv(b[i]!, 2)
  return humanise(out)
}
const overDrone = (hz: number, ms: number): Int16Array => {
  const a = tone(hz, ms), d = tone(A432_HZ, ms), out = new Int16Array(a.length)
  for (let i = 0; i < a.length; i++) out[i] = idiv(a[i]!, 2) + idiv(d[i]!, 8)
  return humanise(out)
}

const parts: Int16Array[] = []
const rest = silence(REST)
const breath = silence(GAP_MS * 4)
let samplesSoFar = 0
const push = (p: Int16Array): void => { parts.push(p); samplesSoFar += p.length }
const stamp = (): string => {
  const s = idiv(samplesSoFar, SAMPLE_RATE)
  return `${idiv(s, 60)}:${String(s % 60 + 100).slice(1)}`
}

// overture — the Glagolitic scale (cited above)
for (const d of SCALE) { push(humanise(tone(A432_HZ * d, BAR))); push(rest) }
push(breath)

// the movements — THEOREM k AT BAR k, the pi-song law: ledger order IS bar order, nothing reordered
const SCORE = theorems()
// ceiling by integers — the scan rightly refuses the host's rounding library anywhere in this tree
const perMovement = idiv(SCORE.length + MOVEMENTS - 1, MOVEMENTS)
const movements: { from: number; to: number; at: string }[] = []
const refrain = (): void => { for (const d of ORBIT) { push(overDrone(A432_HZ * d, BAR)); push(rest) } push(breath) }
SCORE.forEach((t, k) => {
  if (k % perMovement === 0) {
    if (k > 0) refrain()
    movements.push({ from: k + 1, to: k + perMovement < SCORE.length ? k + perMovement : SCORE.length, at: stamp() })
  }
  const tiles = t.address.replace(/-/g, '')
  const c1 = parseInt(tiles[0]!, 16), c2 = parseInt(tiles[16]!, 16)
  push(chordOf(c1, c2, LENGTHS[(c1 + c2) % 3]!))
  push(rest)
})
refrain()

// finale — the root of the whole release, tile by tile over the drone, then the coin octave, fading
const root = merkleFold(SCORE.map((t) => t.address))
const finaleAt = stamp()
for (const c of root.replace(/-/g, '')) { push(overDrone(toneOf(parseInt(c, 16)), BAR - REST * 4)); push(rest) }
const oct = ((): Int16Array => {
  const a = tone(A432_HZ, 4 * BAR - REST * 4 * 3), b = tone(OCTAVE, 4 * BAR - REST * 4 * 3), out = new Int16Array(a.length)
  for (let i = 0; i < a.length; i++) out[i] = idiv(a[i]!, 2) + idiv(b[i]!, 2)
  for (let i = 0; i < out.length; i++) out[i] = idiv(out[i]! * (out.length - i), out.length)
  return out
})()
push(breath); push(oct)

const pcm = new Int16Array(parts.reduce((a, p) => a + p.length, 0))
let at = 0
for (const p of parts) { pcm.set(p, at); at += p.length }
const audio = wav(pcm)
const audioHandle = audioHandleOf(audio)
writeFileSync(join(ROOT, 'docs', 'public', 'anthem.wav'), audio)

const seconds = idiv(pcm.length, SAMPLE_RATE)
const page = `---
title: The release anthem
description: The whole ledger sung in place — theorem k at bar k, every structural figure a sealed theorem, regrown at every release.
---

# The release anthem <Badge type="tip" text="theorem k at bar k" />

> The anthem sings the **whole ledger, in place**: theorem k sounds at bar k, in ledger order — ${SCORE.length}
> theorems, each one bar, each bar that theorem's own two address-coins as a chord. It is derived, never composed:
> every structural figure below is a theorem in [\`lean/Anthem.lean\`](/lean/Anthem.lean) or
> [\`lean/Song.lean\`](/lean/Song.lean), and the generator refuses any unsealed bar. The anthem **regrows at every
> release** — its length measures the ledger.

<audio controls src="/anthem.wav" style="width:100%"></audio>

Exact integers on the A432 lattice: the **same bytes for anyone, forever**. Content-address \`${audioHandle}\` —
recompute it from the file, or the recording is not this anthem. Duration ${idiv(seconds, 60)}:${String(seconds % 60 + 100).slice(1)} for ${SCORE.length} theorems.

## Compared with the Pi Song — the place law, made verifiable

The Pi Song (AsapSCIENCE) sings **digit k at place k** — position is identity, but the digits are English names,
so the matching lives in one language and checking it means listening in that language. The anthem keeps the same
law — **theorem k at bar k** — and drops the language: each bar sings its theorem's *address* (the leading hexbit
of each 64-bit coin, as one chord), so the place-matching is language-free and decodable off the lattice by
anyone. Where the Pi Song's places carry digits, the anthem's bars carry **proofs**: index into the sound and the
bar you land on names a theorem the kernel signed.

## The form — every figure sealed

**Overture** — the Glagolitic scale, Az to Zemlja (\`song_scale_is_glagolitic\`).

**${MOVEMENTS} movements** (\`anthem_four_movements\` — the DNA tongue conducts), the vortex orbit as refrain
between them (\`song_melody_rides_the_orbit\`):

| movement | theorems (in place) | begins at |
|---|---|---|
${movements.map((mv, i) => `| ${i + 1} | ${mv.from}–${mv.to} | ${mv.at} |`).join('\n')}

**Each bar is one theorem paying its two coins** (\`anthem_chord_halves_the_bar\`: 252/2 = 126 — two coins close
the bar), its length picked by its own bytes from the sealed three (\`anthem_three_lengths_quarter_the_bar\`:
126 · 189 · 252 ms), the breath between bars the sealed twelfth (\`anthem_rest_twelfths_the_bar\`: 21 ms).

**Finale** (at ${finaleAt}) — the merkle root of all ${SCORE.length} addresses, \`${root}\`, sung whole:
32 tiles, one uuid entire (\`anthem_finale_sings_one_uuid\`), over the Az drone. The final chord is 432 against
864 — the coin octave (\`anthem_closes_on_the_coin_octave\`): the same factor two that
[\`two_coins_in_kilograms\`](/theorem/two_coins_in_kilograms) weighs in black-hole mass, sounded as the interval
every ear resolves.

HONEST SCOPE: arithmetic sung on a lattice — not a claim that 432 Hz carries power, that the length means
anything, or that a coincidence of counts signifies; the demarcations live in the theorems.
`
writeFileSync(join(ROOT, 'docs', 'anthem.md'), page)
console.log(`✓ gen-anthem — docs/anthem.md + docs/public/anthem.wav derived from ${sealed.size} seals over ${SCORE.length} theorems in place; audio ${audio.length} bytes, address ${audioHandle}`)
