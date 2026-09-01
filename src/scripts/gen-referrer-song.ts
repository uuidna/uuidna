#!/usr/bin/env node
// gen-referrer-song — THE REFERRER SONG'S SURFACE, derived, never composed (lead 77). Three artifacts of one law:
// the DOOR TABLE (every first tile of a handle mapped to its door, its trinity multiplier and the verse it
// enters — door_of_the_referrer, rotation_is_multiplication, the_shift_is_the_trinity), the HARMONY CENSUS of the
// site's own canonical page cycle (each consecutive pair of page handles measured as a reduced lattice interval
// and a beat in units of A432 — tuning_cancels_from_every_interval, adjacent_steps_beat_at_the_tuning), and the
// WALK's own recording (docs/public/walk.wav — the closed cycle sounded page by page on the lattice, one 252 ms
// bar each, 4032 samples = 24 frame-slots of 168 — the_movie_and_the_song_are_one). A missing seal THROWS: the
// surface cannot render an unsealed claim. doors, ratios and rings measured on the site's own
// addresses — nothing about listeners or taste, and no referrer header is read or trusted anywhere here; the
// REFERRER is a position, and positions are arithmetic.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEAN_LEDGER, type LeanTheorem } from '../theorems/generated.js'
import { discoverStaticPages, canonicalOrder, computeSidebar } from '../site.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { A432_HZ } from '../tts/synth.js'

const sealed = new Map(LEAN_LEDGER.filter((t) => t.file === 'Referrer.lean').map((t) => [t.key, t]))
const cite = (key: string): LeanTheorem => {
  const t = sealed.get(key)
  if (!t) throw new Error(`gen-referrer-song: the ledger holds no seal ${key} — an unsealed claim cannot render`)
  return t
}
cite('door_of_the_referrer'); cite('rotation_is_multiplication'); cite('the_shift_is_the_trinity')
cite('every_referrer_reaches_every_page'); cite('prev_undoes_next'); cite('tuning_cancels_from_every_interval')
cite('adjacent_steps_beat_at_the_tuning'); cite('development_is_the_complement'); cite('the_movie_and_the_song_are_one')

// ── THE DOORS — tile → door → trinity multiplier → the verse entered. Derived, then held against the seals.
const gcd = (a: number, b: number): number => { let x = a, y = b; while (y !== 0) { const t = x % y; x = y; y = t } return x }
const PERIOD = 142857
const MULT = Array.from({ length: 6 }, (_, d) => (3 ** d) % 7)          // [1,3,2,6,4,5] — the_shift_is_the_trinity
const digitsOf = (n: number): number[] => { const ds: number[] = []; let x = n; while (x > 0) { ds.unshift(x % 10); x = (x - x % 10) / 10 } return ds }
const doorRows = Array.from({ length: 16 }, (_, t) => {
  const door = t % 6
  const verse = PERIOD * MULT[door]!
  return `| \`${t.toString(16)}\` | ${door} | ×${MULT[door]} | \`${verse}\` |`
})

// ── THE WALK — the site's canonical closed cycle, each page a lattice tone from its handle's first tile.
const order = canonicalOrder(discoverStaticPages())
const stateOf = (route: string): number => parseInt(handleOf(toUuid(route))[0]!, 16)   // 0..15
const pitches = order.map((p) => stateOf(p.route) + 1)                                  // 1..16 — readings_states_sound_the_lattice
// each step measured: the reduced interval a:b (the tuning cancels) and the beat 432·|a−b|
interface Step { from: string; to: string; a: number; b: number; ra: number; rb: number; beat: number }
const steps: Step[] = order.map((p, i) => {
  const q = order[(i + 1) % order.length]!
  const a = pitches[i]!, b = pitches[(i + 1) % order.length]!
  const g = gcd(a, b)
  return { from: p.route, to: q.route, a, b, ra: (a - a % g) / g, rb: (b - b % g) / g, beat: 432 * (a > b ? a - b : b - a) }
})
const census = new Map<string, number>()
for (const s of steps) { const k = `${s.ra}:${s.rb}`; census.set(k, (census.get(k) ?? 0) + 1) }
const unisons = steps.filter((s) => s.a === s.b).length
const octaves = steps.filter((s) => (s.ra === 1 && s.rb === 2) || (s.ra === 2 && s.rb === 1)).length
const coprimeTense = steps.filter((s) => s.a !== s.b && gcd(s.a, s.b) === 1).length

// ── THE RECORDING IS NOT AN ASSET (the captain's rule: no assets allowed, all computes in browser; hexbit
// quantum apps only). This generator ships NO bytes of audio — it derives the SIDEBAR walk's hexbit STATES (the
// declared editorial reading order) and hands them to <HexbitPlayer/>, the standard hexbit quantum app, which
// renders the same exact-integer lattice CLIENT-SIDE at mount. The census above still measures the FULL cycle;
// the recording a visitor hears is recomputed in their own browser, address printed, verifiable on the spot.
const chapterRoutes = computeSidebar().flatMap((g) => g.items.map((i) => i.link))
const chapterStates = chapterRoutes.map((r) => stateOf(r))

const topCensus = [...census.entries()].sort((x, y) => y[1] - x[1]).slice(0, 8)
  .map(([k, n]) => `| ${k} | ${n} |`).join('\n')

const page = `---
title: The referrer song
description: The song entered at the reader's own address — doors, the measured walk, and the site's own recording.
---

# The referrer song <Badge type="tip" text="lead 77 · every claim sealed" />

> The canonical [song](/song) enters the round at one door — the ×1 rotation — **by construction, not by
> necessity**. This page is the proof the doors are free, and the site's own walk measured and sounded. The
> shipped recording is the **undeveloped film**; each referrer's position develops it at their own door
> ([\`development_is_the_complement\`](/theorem/development_is_the_complement)).

## The sixteen doors

A handle's first tile picks the door — totally, every door reached
([\`door_of_the_referrer\`](/theorem/door_of_the_referrer)). Entering d doors in is **multiplying by 3^d mod 7**:
the decimal shift is the trinity step, because 10 ≡ 3 (mod 7)
([\`the_shift_is_the_trinity\`](/theorem/the_shift_is_the_trinity),
[\`rotation_is_multiplication\`](/theorem/rotation_is_multiplication)).

| first tile | door | multiplier | the verse entered |
|---|---|---|---|
${doorRows.join('\n')}

Door 3 — the half-rotation, ×6 — is the **print**: the complement strand, every rung summing to nine. Develop
twice and the film returns.

## The site's walk, measured

The site's ${order.length} pages form one closed cycle — previous and next are total and mutually inverse from
every position ([\`prev_undoes_next\`](/theorem/prev_undoes_next),
[\`every_referrer_reaches_every_page\`](/theorem/every_referrer_reaches_every_page)). Each page sounds its
handle's first tile on the A432 lattice, and **every step's harmony is a measured, reduced ratio** — the tuning
cancels from every interval ([\`tuning_cancels_from_every_interval\`](/theorem/tuning_cancels_from_every_interval)),
so consonance is the addresses' own arithmetic. Neighbouring tiles beat at exactly ${A432_HZ} Hz
([\`adjacent_steps_beat_at_the_tuning\`](/theorem/adjacent_steps_beat_at_the_tuning)).

**The census of this walk's ${steps.length} steps**: ${unisons} unisons, ${octaves} pure octaves,
${coprimeTense} coprime (irreducible) tensions. The most common reduced intervals:

| interval | steps |
|---|---|
${topCensus}

## The walk, sounded — in your browser, from nothing served

<HexbitPlayer :states="[${chapterStates.join(',')}]" />

No audio file exists for this recording and none was fetched: the states above are the sidebar walk's own
handles, and your browser just rendered them on the exact-integer lattice — one bar per **chapter**
(${chapterStates.length} bars), while the census above measures the full ${order.length}-page cycle. Every bar
is 4032 samples = 9·7·64 = 63·64 = **24²·7** — twenty-four frame-slots of 168 samples inside every note, so
what plays is also a frame-track: **the movie and the song are one**
([\`the_movie_and_the_song_are_one\`](/theorem/the_movie_and_the_song_are_one)).

## Honest scope

Doors, rotations, ratios and rings — measured on the site's own addresses. Nothing here reads a Referer header,
claims anything about listeners or taste, or asserts the walk is beautiful: the census counts, the seals decide,
and the reader keeps the meaning.
`
writeFileSync(join(ROOT, 'docs', 'referrer-song.md'), page)
console.log(`✓ gen-referrer-song — docs/referrer-song.md from ${sealed.size} Referrer.lean seals; ${order.length} pages walked, ${steps.length} steps measured, ${chapterStates.length} chapter states handed to the browser (no audio asset — the app renders client-side)`)
