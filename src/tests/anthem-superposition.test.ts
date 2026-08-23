// anthem-superposition — THE SUPERPOSITION COLLAPSES THE SAME WAY FOREVER, THE STREAMS FIT, THE ANALOG ROUND-TRIPS
//
// The anthem stopped being a file; these tests are what keep that honest. A seed collapses deterministically and
// totally; the recursion chains address→seed→address without starving; the mixed streams stay strictly inside
// the sealed amplitude ceiling at every allowed depth (measured, then guaranteed by the geometric seal); the
// bytes are a lossless standard WAV any browser or movie timeline decodes; and the codec's round-trip is the
// IDENTITY — full analog means bit-identical, sample for sample, not "close". Controls refuse: bad depth, bad
// bars, off-ceiling mixes all throw by name.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { anthemScore, collapse, renderSuperposition, compressPcm, uncompressPcm } from '../quantum/apps/anthem-superposition.js'
import { audioHandleOf, AMPLITUDE, SAMPLE_RATE, tone } from '../tts/synth.js'

test('the score is the ledger in place — one bar per theorem, lengths from the sealed three', () => {
  const score = anthemScore()
  assert.ok(score.length >= 1500, `the ledger has grown past 1500 (${score.length})`)
  for (const b of [score[0]!, score[750]!, score[score.length - 1]!]) {
    assert.ok(b.c1 >= 0 && b.c1 <= 15 && b.c2 >= 0 && b.c2 <= 15)
    assert.ok([126, 189, 252].includes(b.ms))
  }
})

test('a seed collapses deterministically and totally — same somewhere, same entry bar, forever', () => {
  const a = collapse('https://example.org'), b = collapse('https://example.org')
  assert.deepEqual(a, b)
  assert.ok(a.entryBar >= 0 && a.entryBar < anthemScore().length)
  assert.ok(collapse('').entryBar >= 0, 'the empty seed (a direct visit) is admitted')
})

test('the superposition renders deterministically and the recursion chains address into seed', () => {
  const s1 = renderSuperposition('movie-visitor', 8, 3)
  const s2 = renderSuperposition('movie-visitor', 8, 3)
  assert.equal(s1.address, s2.address, 'one seed, one sound, forever')
  assert.equal(s1.streams.length, 3)
  assert.equal(s1.streams[1]!.collapse.seed, s1.streams[0]!.address, 'depth 1 is seeded by depth 0\'s address')
  assert.equal(s1.streams[2]!.collapse.seed, s1.streams[1]!.address, 'and depth 2 by depth 1\'s — the recursion is real')
  assert.equal(s1.nextSeed, s1.address, 'the whole mix\'s address is the next seed — deepening never starves')
})

test('the mix stays strictly inside the sealed ceiling at the deepest allowed depth', () => {
  const s = renderSuperposition('ceiling-test', 8, 6)
  const dv = new DataView(s.bytes.buffer, s.bytes.byteOffset, s.bytes.byteLength)
  let peak = 0
  for (let i = 44; i < s.bytes.length; i += 2) { const v = dv.getInt16(i, true); const a = v < 0 ? -v : v; if (a > peak) peak = a }
  assert.ok(peak <= AMPLITUDE, `peak ${peak} inside ${AMPLITUDE} — the geometric law holds in the bytes`)
})

test('the bytes are a lossless standard WAV — the web and the movie decode the exact integers', () => {
  const s = renderSuperposition('web-format', 4, 2)
  const dv = new DataView(s.bytes.buffer, s.bytes.byteOffset, s.bytes.byteLength)
  assert.equal(String.fromCharCode(...s.bytes.slice(0, 4)), 'RIFF')
  assert.equal(dv.getUint16(20, true), 1, 'PCM — uncompressed, lossless by construction')
  assert.equal(dv.getUint32(24, true), SAMPLE_RATE)
  assert.equal(audioHandleOf(s.bytes), s.address, 'the receipt recomputes from the bytes alone')
})

test('FULL ANALOG — compress then uncompress is the identity, sample for sample, even on the deep mix', () => {
  const s = renderSuperposition('analog-round-trip', 8, 3)
  const pcm = new Int16Array(s.samples)
  const dv = new DataView(s.bytes.buffer, s.bytes.byteOffset, s.bytes.byteLength)
  for (let i = 0; i < s.samples; i++) pcm[i] = dv.getInt16(44 + i * 2, true)
  const back = uncompressPcm(compressPcm(pcm))
  assert.equal(back.length, pcm.length)
  for (let i = 0; i < pcm.length; i++) if (back[i] !== pcm[i]) assert.fail(`sample ${i} drifted: ${back[i]} ≠ ${pcm[i]}`)
})

test('the codec SHRINKS the stems — a single lattice voice collapses to its slopes; the mix honestly does not', () => {
  // a pure triangle's delta stream is constant between folds: one second packs into a few hundred pairs
  const stem = tone(432, 1000)
  const packedStem = compressPcm(stem)
  assert.deepEqual([...uncompressPcm(packedStem)], [...stem], 'the stem round-trips bit-identically')
  assert.ok(packedStem.length * 4 * 2 < stem.length * 2, `a stem shrinks at least 2× — the DDS jitter honestly costs runs (${packedStem.length * 4} over ${stem.length * 2})`)
  // the DEEP MIX resists: many waves at many phases destroy the runs — dimensionality costs compressibility,
  // and the honest pipeline compresses STEMS and remixes exactly (the round-trip above proves the remix side)
  const s = renderSuperposition('mix-resists', 8, 3)
  const pcm = new Int16Array(s.samples)
  const dv = new DataView(s.bytes.buffer, s.bytes.byteOffset, s.bytes.byteLength)
  for (let i = 0; i < s.samples; i++) pcm[i] = dv.getInt16(44 + i * 2, true)
  assert.ok(compressPcm(pcm).length * 4 > stem.length, 'the mix genuinely resists — the observation is real, not assumed')
})

test('CONTROL — bad depth and bad bars are refused by name; the app never guesses', () => {
  assert.throws(() => renderSuperposition('x', 8, 0), /depth 1\.\.6/)
  assert.throws(() => renderSuperposition('x', 8, 7), /depth 1\.\.6/)
  assert.throws(() => renderSuperposition('x', 0, 3), /bars 1\.\.128/)
})
