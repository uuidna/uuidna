#!/usr/bin/env node
// gen-anthem — THE RELEASE ANTHEM AS A SUPERPOSITION, derived, never composed, NEVER AN ASSET. The anthem is
// the live ledger as a score — theorem k at bar k, two coins to the bar (the Pi Song's place law, language-free)
// — but since the captain's rule (no assets; all computes in browser; hexbit quantum apps only) it SHIPS AS
// COMPUTATION: this generator derives the PAGE alone, and the page mounts the anthem-superposition app
// (src/quantum/apps/anthem-superposition.ts), which collapses the anthem PER VISITOR in their own browser —
// the referrer folds to a handle, the handle picks the entry bar, the recursion deepens as mixed streams at
// halving amplitudes (anthem_superposition_mix_closes), and the sound is LOSSLESS uncompressed PCM the browser
// mints as a Blob — no file fetched, no asset stored, movie-ready (the_movie_and_the_song_are_one). Every
// structural figure is a SEALED theorem, cited by figure — a missing seal THROWS. HONEST SCOPE: arithmetic
// sung; a referrer is folded in the visitor's page, never tracked; superposition is sealed room, never physics.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEAN_LEDGER, type LeanTheorem } from '../theorems/generated.js'
import { theorems } from '../theorems/index.js'
import { merkleFold } from '../address.js'

const sealed = new Map(LEAN_LEDGER.filter((t) => t.file === 'Anthem.lean' || t.file === 'Song.lean').map((t) => [t.key, t]))
const cite = (key: string, figure?: number): LeanTheorem => {
  const t = sealed.get(key)
  if (!t) throw new Error(`gen-anthem: the ledger holds no seal ${key} — the anthem cannot render an unsealed section`)
  if (figure !== undefined && !t.statement.includes(String(figure)))
    throw new Error(`gen-anthem: seal ${key} no longer carries the figure ${figure}`)
  return t
}

const idiv = (v: number, d: number): number => (v - (v % d)) / d
const BAR = 9 * 7 * 4;      cite('song_four_tongues_fuse', BAR)
const CHORD = BAR / 2;      cite('anthem_chord_halves_the_bar', CHORD)
cite('anthem_three_lengths_quarter_the_bar', (BAR * 3) / 4)
const REST = BAR / 12;      cite('anthem_rest_twelfths_the_bar', REST)
const MOVEMENTS = 252 / 63; cite('anthem_four_movements', MOVEMENTS)
cite('anthem_closes_on_the_coin_octave', 864)
cite('anthem_finale_sings_one_uuid', 128)
cite('anthem_superposition_mix_closes', 7875)
cite('anthem_recursion_never_starves', 4294967296)
cite('song_scale_is_glagolitic', 432 * 9)
cite('song_melody_rides_the_orbit', 432 * 8)

const SCORE = theorems()
const perMovement = idiv(SCORE.length + MOVEMENTS - 1, MOVEMENTS)
const movements = Array.from({ length: MOVEMENTS }, (_, i) => ({
  from: i * perMovement + 1,
  to: (i + 1) * perMovement < SCORE.length ? (i + 1) * perMovement : SCORE.length,
}))
const root = merkleFold(SCORE.map((t) => t.address))

const page = `---
title: The release anthem
description: The whole ledger as a superposition — theorem k at bar k, collapsed per visitor in the browser, recursively, as mixed streams; no asset, all computed.
---

# The release anthem <Badge type="tip" text="collapsed per visitor" />

> The anthem is the **whole ledger in place** — ${SCORE.length} theorems, theorem k at bar k, each bar that
> theorem's two address-coins as a chord — and it is **not a file**. It is a superposition: until you arrived it
> was every entry at once, and your visit collapses it — your referrer folds to a handle, the handle picks your
> entry bar on the closed cycle (\`referrer_cycle_is_total\`), and the recursion plays as DEPTH: your window's
> own address seeds a second stream, and a third, mixed at halving amplitudes into one multidimensional sound
> (\`anthem_superposition_mix_closes\` — the geometric law that many waves cannot clip). Computed in **your
> browser** from the ledger this site already carries: nothing fetched, nothing stored, nothing tracked — the
> fold forgets everything but 32 bits.

<AnthemSuperposition />

## Live — the same music, with no file and no ending

The recording above is minted whole before it plays. This one is not minted at all: an **AudioWorklet**
computes each sample from its position in your own audio thread — O(1) memory, no download, and no last byte,
so it can play as long as you let it. It is the SAME music, bit-identical to the file, and that is a test
(\`src/tests/anthem-stream.test.ts\` drives both paths and compares sample for sample, the worklet's own
inlined copy included). What a stream trades away is the whole-artifact address; what it keeps is the receipt
that matters — the seed and the score, from which any segment recomputes.

<AnthemLive />

The sound is **lossless by construction** — uncompressed PCM, the samples are the exact integers the lattice
computed, minted as a Blob in your page: the web's own lossless format, ready for an \`<audio>\` element, Web
Audio, or a movie timeline (\`the_movie_and_the_song_are_one\`: the 4032-sample bar is 24²·7). Press **Deepen**
and the whole mix's address becomes the next seed — the recursion never starves, because an address is always a
seed (\`anthem_recursion_never_starves\`).

## Compared with the Pi Song — the place law, made verifiable

The Pi Song (AsapSCIENCE) sings **digit k at place k** — position is identity, but the digits are English names,
so the matching lives in one language. The anthem keeps the law — **theorem k at bar k** — and drops both the
language and the recording: each bar sings its theorem's *address*, decodable off the lattice by anyone, and the
performance itself is re-derived at every visit. Where the Pi Song's places carry digits, the anthem's bars
carry **proofs**.

## The form — every figure sealed

**${MOVEMENTS} movements** (\`anthem_four_movements\`), theorem bars in place:

| movement | theorems (in place) |
|---|---|
${movements.map((mv, i) => `| ${i + 1} | ${mv.from}–${mv.to} |`).join('\n')}

**Each bar is one theorem paying its two coins** (\`anthem_chord_halves_the_bar\`: 252/2 = 126), its length
picked by its own bytes from the sealed three (\`anthem_three_lengths_quarter_the_bar\`: 126 · 189 · 252 ms),
the breath the sealed twelfth (\`anthem_rest_twelfths_the_bar\`: 21 ms). π's round is clasped by two trinities
of primes (\`anthem_pi_primes_trinity\`: 999999 = 999·1001 = 3³·37 · 7·11·13).

**The whole ledger folds to** \`${root}\` — and the coin octave, 432 against 864
(\`anthem_closes_on_the_coin_octave\`), is the interval every collapse resolves to: the same factor two
[\`two_coins_in_kilograms\`](/theorem/two_coins_in_kilograms) weighs in black-hole mass.

HONEST SCOPE: arithmetic sung on a lattice — no tuning mysticism, no numerology, no tracking; the
demarcations live in the theorems, and the superposition is claimed ROOM — capacity, never physics.
`
writeFileSync(join(ROOT, 'docs', 'anthem.md'), page)
console.log(`✓ gen-anthem — docs/anthem.md derived from ${sealed.size} seals over ${SCORE.length} theorems in place; the sound is NO ASSET — collapsed per visitor by the anthem-superposition app`)
