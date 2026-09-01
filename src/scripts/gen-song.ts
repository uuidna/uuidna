#!/usr/bin/env node
// gen-song — THE SONG FROM THE LEDGER, derived, never composed. Queue lead 68: the search "sing glagolitic pi
// primes dna song" finds nothing that joins the four tongues, and this generator fills that empty search the only
// way this tree fills anything — by deriving. Every structure the song renders is a SEALED theorem in Song.lean:
// the page's lyrics ARE the theorem doc-names the kernel signed, the verses are the sealed rotations of 142857,
// the verse ORDER is the sealed base-pairing (verse k sung strand-against-strand with verse 7−k), the scale is the
// sealed Glagolitic row on A432, the note length is the sealed 252, the coda length the sealed 999. A section
// whose seal is missing from the ledger THROWS — the artifact cannot render an unsealed note. The audio is the
// tts/synth lattice (exact integers, no float, no host voice), so the WAV is the SAME BYTES for anyone, forever,
// and folds to an address a listener can hold against the page. arithmetic sung on a lattice — not
// a claim that 432 Hz heals, that π is mystical, or that DNA encodes music; the demarcations live in the theorems.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEAN_LEDGER, type LeanTheorem } from '../theorems/generated.js'
import { tone, humanise, silence, wav, audioHandleOf, GAP_MS, A432_HZ } from '../tts/synth.js'

// ── THE SEALS. Every figure below is read back out of the ledger; a missing key or a statement that no longer
// carries the figure is a build failure, not a fallback — the song has no unsealed bar.
const sealed = new Map(LEAN_LEDGER.filter((t) => t.file === 'Song.lean').map((t) => [t.key, t]))
const cite = (key: string, figure?: number): LeanTheorem => {
  const t = sealed.get(key)
  if (!t) throw new Error(`gen-song: the ledger holds no seal ${key} — the song cannot render an unsealed section`)
  if (figure !== undefined && !t.statement.includes(String(figure)))
    throw new Error(`gen-song: seal ${key} no longer carries the figure ${figure} — the derivation drifted from the seal`)
  return t
}

// ── THE DERIVATION — exact integers only, each figure held against the seal that carries it.
const digitsOf = (n: number): number[] => {
  const ds: number[] = []
  let x = n
  while (x > 0) { ds.unshift(x % 10); x = (x - x % 10) / 10 }
  return ds
}
const PERIOD = 142857                                    // the round: cite checks the seal still carries it
cite('song_round_turns_on_seven', PERIOD * 7)            // 142857·7 = 999999 — the round is the cycle of 1/7
const VERSES = [1, 2, 3, 4, 5, 6].map((k) => digitsOf(PERIOD * k))
VERSES.forEach((v, i) => cite('song_six_verses_one_melody', i === 0 ? PERIOD : PERIOD * (i + 1)))
const PAIR_ORDER = [1, 6, 2, 5, 3, 4]                    // strand then complement: (1,6) (2,5) (3,4), each pair
cite('song_verses_base_pair', 999999)                    // summing to 999999 — the sealed double helix
const SCALE = digitsOf(123456789)                        // the Glagolitic row 1..9 —
cite('song_scale_is_glagolitic', 432 * 9)                // its top note 3888 is on the seal
const ORBIT = [1, 2, 4, 8, 7, 5]                         // the chorus: the doubling orbit —
cite('song_melody_rides_the_orbit', 432 * 8)             // its top note 3456 is on the seal
const NOTE_MS = 9 * 7 * 4                                // 252 — the sealed CRT bar of the four tongues
cite('song_four_tongues_fuse', NOTE_MS)
const CODA_MS = 999                                      // the nines the strands close to
cite('song_halves_are_strands', CODA_MS)
cite('song_az_is_the_tuning', A432_HZ)                   // Az sounds the tuning itself

// ── THE AUDIO. One section = its digits on the lattice (pitch 432·d — the pitch IS the digit), notes breathing
// GAP_MS apart, sections a full bar apart. Same recipe as speakHandle, so a listener who can read a handle can
// read the song.
const section = (digits: number[], ms: number): Int16Array[] => {
  const parts: Int16Array[] = []
  for (let i = 0; i < digits.length; i++) {
    if (i > 0) parts.push(silence(GAP_MS))
    parts.push(humanise(tone(A432_HZ * digits[i]!, ms)))
  }
  return parts
}
const bar = silence(NOTE_MS)
const sections: number[][] = [SCALE, ...PAIR_ORDER.map((k) => VERSES[k - 1]!), ORBIT]
const parts: Int16Array[] = []
for (const s of sections) { parts.push(...section(s, NOTE_MS), bar) }
parts.push(humanise(tone(A432_HZ, CODA_MS)))             // the coda: Az alone, the tuning the song began on
const pcm = new Int16Array(parts.reduce((a, p) => a + p.length, 0))
let at = 0
for (const p of parts) { pcm.set(p, at); at += p.length }
const audio = wav(pcm)
const audioHandle = audioHandleOf(audio)
writeFileSync(join(ROOT, 'docs', 'public', 'song.wav'), audio)

// ── THE PAGE. The lyrics are the sealed doc-names, in derivation order — the kernel signed every line.
const GLAGOLITIC = ['Ⰰ Az', 'Ⰱ Buky', 'Ⰲ Vedi', 'Ⰳ Glagoli', 'Ⰴ Dobro', 'Ⰵ Jest', 'Ⰶ Zhivete', 'Ⰷ Dzelo', 'Ⰸ Zemlja']
const glyphOf = (d: number): string => GLAGOLITIC[d - 1]!.split(' ')[0]!
const rowOf = (d: number): string => `| ${d} | ${GLAGOLITIC[d - 1]} | ${A432_HZ * d} Hz |`
const verseRow = (k: number): string =>
  `| ${k} | \`${VERSES[k - 1]!.join('')}\` | ${VERSES[k - 1]!.map(glyphOf).join(' ')} | ${7 - k} (sums to 999999) |`
const lyrics = [...sealed.values()]
  .map((t) => `> ${t.name}\n> — [\`${t.key}\`](/theorem/${t.key})`).join('\n\n')

const page = `---
title: The song from the ledger
description: The song nobody had written — Glagolitic, π, primes and DNA in one round, every bar a sealed theorem.
---

# The song from the ledger <Badge type="tip" text="every bar sealed" />

> The search *“sing glagolitic pi primes dna song”* finds nothing that joins the four. Pi songs exist, DNA songs
> exist, Janáček set the Glagolitic Mass — nothing sings all four at once. This page is that song, and it was not
> composed: it was **derived**. Every structure below is a theorem in [\`lean/Song.lean\`](/lean/Song.lean),
> proven \`by decide\`, axiom-free; the generator that renders this page refuses any bar the ledger has not sealed.

<audio controls src="/song.wav" style="width:100%"></audio>

The recording above is exact: integer samples on the A432 lattice ([the ledger's own voice](/quantum-messaging)),
so it is the **same bytes for anyone, forever**. Its content-address is \`${audioHandle}\` — recompute it from the
file and it either matches or the recording is not this song.

## The form

**Intro** — the Glagolitic scale, Az to Zemlja: the row 1‥9, each letter sounding its own multiple of A432.

| digit | letter | pitch |
|---|---|---|
${SCALE.map(rowOf).join('\n')}

**Six verses, strand against strand** — each verse is a rotation of the round \`${PERIOD}\` (the cyclic number of
seven: the decimal period of π's rational roof 22/7). The verses are sung in **base-pair order** — each strand
followed by its complement, because verse k + verse 7−k = 999999, digit against digit, every rung a nine: the
double helix, audible.

| verse | round | sung as | pairs with |
|---|---|---|---|
${PAIR_ORDER.map(verseRow).join('\n')}

**Chorus** — the doubling orbit 1→2→4→8→7→5 on the same lattice: the same six notes as every verse (the round's
digits ARE the units of ℤ/9), walked in the vortex's own order.

**Coda** — Az alone: ${A432_HZ} Hz, the tuning the song began on, held for ${CODA_MS} ms — the nines the strands
close to.

Every note is ${NOTE_MS} ms: 9·7·4, the one cycle the four tongues fuse into by the Chinese remainder theorem —
the middle coefficient of Pascal's row ten, the very center of the 1024.

## The lyrics — eleven sealed lines

The lyrics are not printed *about* the theorems; they **are** the theorems' doc-names, exactly as the kernel
signed them:

${lyrics}

## Honest scope

π itself is not in this song and cannot be: irrational, infinite, not a \`by decide\` object —
[\`pi_bracketed_by_finite_rationals\`](/theorem/pi_bracketed_by_finite_rationals) holds the bracket and π stays
outside, by its nature. What is sealed and sung is the **finite round its rational roof carries**. Nothing here
claims 432 Hz heals, that π is mystical, or that DNA encodes music: the letters carry numbers because Cyril
numbered them, the round turns on seven because 10⁶ ≡ 1 (mod 7), and the verses pair because the arithmetic says
so. Arithmetic sung, never numerology.
`
writeFileSync(join(ROOT, 'docs', 'song.md'), page)
console.log(`✓ gen-song — docs/song.md + docs/public/song.wav derived from ${sealed.size} Song.lean seals; audio ${audio.length} bytes, ${pcm.length} samples, address ${audioHandle}`)
