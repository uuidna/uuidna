// anthem-stream — THE STREAM IS THE SAME MUSIC AS THE FILE, OR IT IS A DIFFERENT PIECE WEARING ITS NAME.
//
// Streaming buys O(1) memory and an anthem that never has to end; it costs the whole-artifact address. What it
// must NOT cost is the music. tone() is position-pure in (hz, i) and humanise() in (value, i, n), so the same
// integers must fall out whether they are computed into a buffer or handed to a speaker one block at a time —
// and these tests drive BOTH paths and compare sample for sample. Three ways to fail, all reachable: the
// stream drifts from the file; the block size changes what is heard (it must not — a cursor is not a buffer);
// or the WORKLET's inlined copy drifts from the module it was lifted from, which is the real risk of a
// processor that runs in an isolated realm and cannot import. The last is checked by EVALUATING the worklet
// source against a fake AudioWorkletProcessor and driving its own process() — the copy is tested, not trusted.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { triangleAt, rampAt, spanOf, barSample, fill, workletSource, START, type Bar } from '../../apps/anthem-stream.js'
import { tone, humanise, silence, toneOf, SAMPLE_RATE } from '../../../tts/synth.js'

const idiv = (v: number, d: number): number => (v - (v % d)) / d

/** the FILE path, exactly as gen-anthem builds a bar: two coins summed, humanised, then the breath. */
const fileBar = (b: Bar, restMs = 21): Int16Array => {
  const a = tone(toneOf(b.c1), b.ms), c = tone(toneOf(b.c2), b.ms)
  const chord = new Int16Array(a.length)
  for (let i = 0; i < a.length; i++) chord[i] = idiv(a[i]!, 2) + idiv(c[i]!, 2)
  const shaped = humanise(chord)
  const rest = silence(restMs)
  const out = new Int16Array(shaped.length + rest.length)
  out.set(shaped, 0)
  return out
}

const SCORE: Bar[] = [{ c1: 3, c2: 9, ms: 126 }, { c1: 0, c2: 15, ms: 189 }, { c1: 7, c2: 2, ms: 252 }]

const streamAll = (score: Bar[], samples: number, block = 128): Int16Array => {
  const out = new Int16Array(samples)
  const buf = new Int16Array(block)
  let cursor = START
  for (let at = 0; at < samples; at += block) {
    cursor = fill(buf, score, cursor)
    const room = samples - at
    out.set(buf.subarray(0, room < block ? room : block), at)
  }
  return out
}

test('one position, one sample — the lifted formulas equal the buffered ones exactly', () => {
  const buffered = tone(toneOf(5), 126)
  for (let i = 0; i < buffered.length; i++)
    if (triangleAt(toneOf(5), i) !== buffered[i]) assert.fail(`triangle drifted at ${i}`)
  const shaped = humanise(buffered)
  for (let i = 0; i < shaped.length; i++)
    if (rampAt(buffered[i]!, i, buffered.length) !== shaped[i]) assert.fail(`envelope drifted at ${i}`)
  assert.equal(spanOf(126), buffered.length, 'the span is the same flooring the buffer used')
})

test('THE PROPERTY — the stream is bit-identical to the file across bars and their breaths', () => {
  const file = SCORE.map((b) => fileBar(b))
  const total = file.reduce((n, p) => n + p.length, 0)
  const expected = new Int16Array(total)
  let at = 0
  for (const p of file) { expected.set(p, at); at += p.length }
  const streamed = streamAll(SCORE, total)
  for (let i = 0; i < total; i++)
    if (streamed[i] !== expected[i]) assert.fail(`sample ${i}: stream ${streamed[i]} ≠ file ${expected[i]}`)
})

test('CONTROL — the block size cannot change what is heard (a cursor is not a buffer)', () => {
  const n = spanOf(126) * 3
  const a = streamAll(SCORE, n, 128)
  const b = streamAll(SCORE, n, 1000)
  const c = streamAll(SCORE, n, 7)     // a deliberately awkward block: no bar boundary aligns to it
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) assert.fail(`block 128 vs 1000 differ at ${i}`)
    if (a[i] !== c[i]) assert.fail(`block 128 vs 7 differ at ${i}`)
  }
})

test('the stream is a ROUND — it re-enters at the first bar and never ends', () => {
  const oneLap = SCORE.reduce((n, b) => n + spanOf(b.ms) + spanOf(21), 0)
  const two = streamAll(SCORE, oneLap * 2)
  for (let i = 0; i < oneLap; i++)
    if (two[i] !== two[oneLap + i]) assert.fail(`the second lap diverged at ${i} — a round must return`)
})

test('THE WORKLET COPY IS TESTED, NOT TRUSTED — its process() matches the module it was lifted from', () => {
  // a fake realm: the worklet source registers a processor against these globals, then we drive it ourselves
  let Processor: any = null
  const fakeGlobals = {
    AudioWorkletProcessor: class { port = { onmessage: null, postMessage: () => {} } },
    registerProcessor: (_n: string, p: unknown) => { Processor = p as typeof Processor },
  }
  new Function('AudioWorkletProcessor', 'registerProcessor', workletSource())(fakeGlobals.AudioWorkletProcessor, fakeGlobals.registerProcessor)
  assert.ok(Processor, 'the source must register a processor')
  const proc = new (Processor as new (o: unknown) => { process: (i: unknown[], o: Float32Array[][]) => boolean })({ processorOptions: { score: SCORE, restMs: 21 } })
  const heard: number[] = []
  const block = new Float32Array(128)
  const laps = 6
  for (let b = 0; b < laps; b++) { proc.process([], [[block]]); // s/32768 then ×32768 is EXACT (a power-of-two divisor), so no rounding is needed or allowed here
    for (const v of block) heard.push(v * 32768) }
  const expected = streamAll(SCORE, heard.length)
  for (let i = 0; i < heard.length; i++)
    if (heard[i] !== expected[i]) assert.fail(`worklet copy drifted at ${i}: ${heard[i]} ≠ ${expected[i]}`)
})

test('an empty score is silence, never a crash — a stream with nothing to play still fills its block', () => {
  const out = new Int16Array(128).fill(999)
  const cursor = fill(out, [], START)
  assert.deepEqual(cursor, START)
  assert.ok([...out].every((v) => v === 0), 'silence, and no exception')
})

test('the sample rate the stream computes at is the lattice\'s own', () => {
  assert.equal(SAMPLE_RATE, 16000)
  assert.equal(spanOf(1000), SAMPLE_RATE, 'one second is one second of samples')
})
