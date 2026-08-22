// tts-voice — THE PITCH IS THE DIGIT, MEASURED, NOT RESTATED
//
// The synth's whole claim is that a listener with the lattice can read a handle back out of the sound. That is a
// claim about the AUDIO, so the instrument here listens: it counts rising zero-crossings in the rendered samples
// — a count the synth never writes — and holds the count against the lattice. A period rounded to whole samples
// passes any test that reads the source and fails this one, because at 8 kHz nine of the sixteen states collided
// onto a neighbour's pitch and the digit was gone from the sound. The envelope, the gaps, the receipt and the
// header are each held the same way: by the bytes, not the intent.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  SAMPLE_RATE, AMPLITUDE, BASE_HZ, A432_HZ, GAP_MS,
  toneOf, tone, silence, humanise, speakHandle, wav, audioHandleOf, voiceOf,
} from '../index.js'

/** rising zero-crossings per buffer — one per cycle for any wave with one positive arc, and not a number the
 *  synth computes anywhere, so it can disagree. */
const risingCrossings = (pcm: Int16Array): number => {
  let count = 0
  for (let i = 1; i < pcm.length; i++) if (pcm[i - 1]! < 0 && pcm[i]! >= 0) count++
  return count
}

test('every hexbit state sounds its own A432 harmonic — the pitch is the digit, all sixteen', () => {
  assert.equal(toneOf(0), A432_HZ, 'state 0 sounds the tuning itself — the lattice is A432 and only A432')
  assert.equal(BASE_HZ, A432_HZ, 'no halved base exists beside the series')
  for (let h = 0; h < 16; h++) {
    const hz = toneOf(h)
    assert.equal(hz, BASE_HZ * (h + 1))
    const cycles = risingCrossings(tone(hz, 1000))
    // one second must carry exactly hz cycles; one crossing of slack for the buffer's cut ends
    assert.ok(cycles >= hz - 1 && cycles <= hz + 1, `state ${h.toString(16)}: ${cycles} cycles for ${hz} Hz`)
  }
})

test('no two states collide — sixteen tones, sixteen distinct measured pitches', () => {
  const measured = Array.from({ length: 16 }, (_, h) => risingCrossings(tone(toneOf(h), 1000)))
  assert.equal(new Set(measured).size, 16, `collisions: ${measured.join(',')}`)
  for (let h = 1; h < 16; h++) assert.ok(measured[h]! > measured[h - 1]!, 'the ladder climbs with the digit')
})

test('samples are exact integers inside the declared headroom', () => {
  for (const h of [0, 7, 15]) {
    for (const s of tone(toneOf(h), 100)) {
      assert.ok(Number.isInteger(s))
      assert.ok(s >= -AMPLITUDE && s <= AMPLITUDE)
    }
  }
})

test('humanise removes the click and only the click — edges at zero, pitch untouched', () => {
  const raw = tone(toneOf(3), 120)
  const shaped = humanise(raw)
  assert.equal(shaped.length, raw.length)
  assert.equal(shaped[0], 0, 'a tile begins in silence, not a click')
  assert.equal(shaped[shaped.length - 1], 0, 'and ends there')
  const rawCycles = risingCrossings(raw)
  const shapedCycles = risingCrossings(shaped)
  assert.ok(shapedCycles >= rawCycles - 2 && shapedCycles <= rawCycles + 2, 'the ramp moves no pitch')
})

test('a handle is eight tiles with a breath between them, and the breath is real silence', () => {
  const pcm = speakHandle('084c3982')
  const tile = tone(BASE_HZ, 120).length
  const gap = silence(GAP_MS).length
  assert.equal(pcm.length, 8 * tile + 7 * gap, 'eight tiles, seven breaths, nothing else')
  for (let i = 0; i < gap; i++) assert.equal(pcm[tile + i], 0, 'the first breath is silent to the sample')
})

test('the recording carries a receipt anyone can recompute, and it covers every byte', () => {
  const a = voiceOf('the pitch is the digit')
  const b = voiceOf('the pitch is the digit')
  assert.equal(a.audioHandle, b.audioHandle, 'the same text is the same audio, addressed the same')
  assert.equal(audioHandleOf(a.audio), a.audioHandle, 'a listener recomputes the receipt from the WAV alone')
  const tampered = Uint8Array.from(a.audio)
  tampered[tampered.length - 1] = tampered[tampered.length - 1]! ^ 1
  assert.notEqual(audioHandleOf(tampered), a.audioHandle, 'one flipped bit at the far end drifts the receipt')
})

test('the WAV header declares exactly the bytes it carries', () => {
  const { audio, samples } = voiceOf('header')
  const dv = new DataView(audio.buffer, audio.byteOffset, audio.byteLength)
  assert.equal(String.fromCharCode(...audio.slice(0, 4)), 'RIFF')
  assert.equal(String.fromCharCode(...audio.slice(36, 40)), 'data')
  assert.equal(audio.length, 44 + samples * 2)
  assert.equal(dv.getUint32(4, true), 36 + samples * 2, 'RIFF size agrees with the payload')
  assert.equal(dv.getUint32(40, true), samples * 2, 'data size agrees with the payload')
  assert.equal(dv.getUint32(24, true), SAMPLE_RATE)
})
