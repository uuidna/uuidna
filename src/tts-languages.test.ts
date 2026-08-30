// tts-languages — SEVEN RAYS, ONE LATTICE: EVERY LANGUAGE SINGS THE SAME SIXTEEN TONES
//
// The synth's voice is script-independent by construction: whatever bytes a language writes, they fold to a
// 128-bit address, the address to an eight-tile handle, and the handle to eight A432 harmonics. So "all
// languages" is not sixteen synthesisers — it is one lattice and the proof that every locale ray reaches it.
// Dialects are the sharper half: the same tongue spelling the same meaning with different bytes is a DIFFERENT
// utterance to a ledger that speaks bytes, so a dialect pair must address apart and sound apart, and this test
// holds both directions — every language in, every handle singable, every dialect pair distinguishable.
//
// HONEST SCOPE: the deterministic layer only. The host half (macOS `say`) is a named non-determinism boundary —
// its voices and dialects live on the device, so it is exercised here strictly as dryRun: the command composes,
// the device is never touched, and no claim is made about any sound a host produces.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DIMENSIONS, harness7,
  utter, emit, voiceOf, speakHandle, toneOf, silence, tone, GAP_MS,
} from './index.js'

/** one sentence per locale ray — Latin, Cyrillic and Han scripts, with each tongue's own diacritics. */
const SAMPLES: Record<(typeof DIMENSIONS)[number], string> = {
  en: 'The pitch is the digit.',
  bg: 'Тонът е цифрата.',
  de: 'Die Tonhöhe ist die Ziffer — Straße der Töne.',
  fr: "La hauteur est le chiffre, déjà écrite à l'échelle.",
  es: 'El tono es el dígito, año tras año.',
  ru: 'Высота тона — это цифра.',
  zh: '音高即数字。',
}

/** dialect pairs — the same tongue, the same meaning, different bytes on the page. */
const DIALECTS: ReadonlyArray<{ ray: (typeof DIMENSIONS)[number]; a: string; b: string; note: string }> = [
  { ray: 'en', a: 'Humanise the colour of the programme.', b: 'Humanize the color of the program.', note: 'en-GB vs en-US spelling' },
  { ray: 'de', a: 'Die Straße misst sich selbst.', b: 'Die Strasse misst sich selbst.', note: 'de-DE ß vs de-CH ss' },
  { ray: 'es', a: 'El coche guarda su recibo.', b: 'El carro guarda su recibo.', note: 'es-ES vs es-MX lexis' },
  { ray: 'zh', a: '语言的声音', b: '語言的聲音', note: 'simplified vs traditional script' },
]

test('every locale ray folds to a singable handle — one lattice for all seven languages', () => {
  const handles = new Set<string>()
  for (const d of DIMENSIONS) {
    const v = voiceOf(SAMPLES[d])
    assert.match(v.handle, /^[0-9a-f]{8}$/, `${d}: eight hex tiles, whatever the script`)
    assert.equal(v.audio.length, 44 + v.samples * 2, `${d}: the WAV carries exactly its samples`)
    const again = voiceOf(SAMPLES[d])
    assert.equal(again.audioHandle, v.audioHandle, `${d}: the same sentence is the same audio, forever`)
    handles.add(v.handle)
  }
  assert.equal(handles.size, DIMENSIONS.length, 'seven sentences, seven distinct handles')
})

test('composition is exact in every script — whitespace collapses, bytes decide, addresses reproduce', () => {
  for (const d of DIMENSIONS) {
    const u1 = utter([SAMPLES[d]])
    const u2 = utter([`  ${SAMPLES[d].replace(/ /g, '  ')}  `])
    assert.equal(u1.address, u2.address, `${d}: formatting is not meaning`)
    assert.equal(u1.handle, u2.handle)
    assert.ok(u1.words >= 1, `${d}: even an unspaced script counts at least one word`)
  }
})

test('dialect pairs address apart and sound apart — the ledger speaks bytes, not tongues', () => {
  for (const { ray, a, b, note } of DIALECTS) {
    const va = voiceOf(a)
    const vb = voiceOf(b)
    assert.notEqual(va.handle, vb.handle, `${ray} (${note}): different bytes, different handle`)
    assert.notEqual(va.audioHandle, vb.audioHandle, `${ray} (${note}): and audibly different receipts`)
    // both dialects sing on the same lattice: identical geometry, eight tiles and seven breaths each
    assert.equal(va.samples, vb.samples, `${ray} (${note}): the lattice gives every dialect the same stage`)
  }
})

test('the seven rays receipt one output seven ways and fold to one root', () => {
  for (const d of DIMENSIONS) {
    const h = harness7(SAMPLES[d])
    assert.ok(h.auditableInAll, `${d}: seven distinct receipts, all reproducing`)
    assert.match(h.root, /^[0-9a-f-]{36}$/)
  }
})

test('the host voice is only ever dry-run here — the command composes, the device stays untouched', () => {
  for (const d of DIMENSIONS) {
    const u = utter([SAMPLES[d]])
    const e = emit(u, { dryRun: true })
    assert.equal(e.spoken, false, `${d}: a test must not make the room speak`)
    assert.equal(e.handle, u.handle, `${d}: the receipt rides the command`)
    assert.ok(e.command.startsWith('say'), `${d}: the boundary is named`)
  }
})

test('whatever the language, the sung handle is eight tiles and seven breaths, tile by tile on the lattice', () => {
  const tile = tone(toneOf(0), 120).length
  const gap = silence(GAP_MS).length
  for (const d of DIMENSIONS) {
    const { handle } = voiceOf(SAMPLES[d])
    const pcm = speakHandle(handle)
    assert.equal(pcm.length, 8 * tile + 7 * gap, `${d}: the geometry is the lattice's, not the language's`)
  }
})
