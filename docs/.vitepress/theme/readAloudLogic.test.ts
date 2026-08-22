import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chunksOf, pickVoice, pitchFromRay, createReadAloudController, type SpeechLike, type UtteranceLike, type VoiceLike } from './readAloudLogic.ts'

test('chunksOf splits on sentence boundaries, drops empties', () => {
  assert.deepEqual(chunksOf('One. Two! Three?'), ['One.', 'Two!', 'Three?'])
  assert.deepEqual(chunksOf('  '), [])
  assert.deepEqual(chunksOf('Solo sentence with no terminator'), ['Solo sentence with no terminator'])
})

test('pickVoice prefers the curated list for the page language', () => {
  const voices: VoiceLike[] = [
    { name: 'Daniel', lang: 'en-GB', default: true },
    { name: 'Samantha', lang: 'en-US', default: false },
    { name: 'Albert', lang: 'en-US', default: false },
  ]
  assert.equal(pickVoice(voices, 'en-US')?.name, 'Samantha')
})

test('pickVoice falls back to a non-default same-language voice when nothing curated matches', () => {
  const voices: VoiceLike[] = [
    { name: 'Daniel', lang: 'en-GB', default: true },
    { name: 'SomeOtherVoice', lang: 'en-GB', default: false },
  ]
  assert.equal(pickVoice(voices, 'en-GB')?.name, 'SomeOtherVoice')
})

test('pickVoice returns null with no voices at all', () => {
  assert.equal(pickVoice([], 'en'), null)
})

test('pitchFromRay spans 0.90..1.10 across the 7 rosette rays, ray 0 and ray 6 at the ends', () => {
  assert.equal(pitchFromRay(0), 0.9)
  assert.ok(Math.abs(pitchFromRay(6) - 1.1) < 1e-9)
  assert.ok(pitchFromRay(3) > 0.9 && pitchFromRay(3) < 1.1)
})

// A fake speechSynthesis whose speak() does NOT auto-fire onend — the test drives it explicitly, the same way a
// real browser fires it asynchronously once audio playback for that utterance finishes.
function fakeSpeech() {
  const calls: string[] = []
  const speech: SpeechLike = {
    speak: (u) => calls.push('speak'),
    cancel: () => calls.push('cancel'),
    pause: () => calls.push('pause'),
    resume: () => calls.push('resume'),
  }
  return { speech, calls }
}
const makeUtterance = (text: string): UtteranceLike => ({ onend: null, onerror: null, voice: null, pitch: 1 })

test('start() with empty text does nothing (no speak call), status explains why', () => {
  const { speech, calls } = fakeSpeech()
  const c = createReadAloudController(speech, makeUtterance)
  c.start('', null, 1)
  assert.deepEqual(calls, [])
  assert.equal(c.getState().phase, 'idle')
  assert.equal(c.getState().status, 'Nothing on this page to read.')
})

test('start() speaks the first chunk and enters reading', () => {
  const { speech, calls } = fakeSpeech()
  const c = createReadAloudController(speech, makeUtterance)
  c.start('First sentence. Second sentence.', null, 1)
  assert.deepEqual(calls, ['cancel', 'speak'])
  assert.equal(c.getState().phase, 'reading')
})

test('the chunk queue actually reaches completion — onend chains through every chunk to "Finished reading"', () => {
  const { speech, calls } = fakeSpeech()
  // start() builds ALL chunk utterances upfront (one makeUtterance call per chunk), but speakNext() only assigns
  // onend/onerror to ONE at a time as it processes the queue — so capture every utterance created, by index, and
  // fire onend on whichever one the controller actually attached a handler to at each step (never "the last one
  // created", which is chunk 3 immediately after start() returns, before it has a handler at all).
  const created: UtteranceLike[] = []
  const capturingMakeUtterance = (text: string): UtteranceLike => {
    const u = makeUtterance(text)
    created.push(u)
    return u
  }
  const c = createReadAloudController(speech, capturingMakeUtterance)
  c.start('One. Two. Three.', null, 1)
  assert.equal(created.length, 3, 'three sentences should produce three queued utterances')
  assert.equal(calls.filter((x) => x === 'speak').length, 1)

  // simulate the browser firing onend for each chunk in turn, exactly as real playback would
  created[0].onend!()
  assert.equal(calls.filter((x) => x === 'speak').length, 2)
  assert.equal(c.getState().phase, 'reading')

  created[1].onend!()
  assert.equal(calls.filter((x) => x === 'speak').length, 3)

  created[2].onend!()
  assert.equal(c.getState().phase, 'idle')
  assert.equal(c.getState().status, 'Finished reading.')
})

test('toggle() cycles idle -> reading -> paused -> reading, calling the right speechSynthesis method each time', () => {
  const { speech, calls } = fakeSpeech()
  const c = createReadAloudController(speech, makeUtterance)
  c.toggle('Some text.', null, 1)
  assert.equal(c.getState().phase, 'reading')
  c.toggle('Some text.', null, 1)
  assert.equal(c.getState().phase, 'paused')
  assert.ok(calls.includes('pause'))
  c.toggle('Some text.', null, 1)
  assert.equal(c.getState().phase, 'reading')
  assert.ok(calls.includes('resume'))
})

// The bug the FIRST extraction shipped with, caught before it ever reached a component: onChange must fire on
// the ASYNC transitions too (a chunk finishing naturally), not just synchronously inside start()/toggle()/stop() —
// otherwise a caller (ReadAloud.vue) that only reads getState() right after calling one of those methods misses
// every transition after, and the UI freezes on "Pause reading" even after speech genuinely finished.
test('onChange fires on the async chunk-completion transition, not just on direct calls', () => {
  const { speech } = fakeSpeech()
  const created: UtteranceLike[] = []
  const capturingMakeUtterance = (text: string): UtteranceLike => {
    const u = makeUtterance(text)
    created.push(u)
    return u
  }
  const changes: string[] = []
  const c = createReadAloudController(speech, capturingMakeUtterance, (s) => changes.push(`${s.phase}:${s.status}`))
  c.start('One. Two.', null, 1)
  assert.equal(changes.length, 1, 'start() itself fires one synchronous change')
  created[0].onend!() // advancing mid-queue: still "reading", no VISIBLE change, correctly no extra notification
  assert.equal(changes.length, 1)
  created[1].onend!() // the LAST onend, fired asynchronously outside any direct call from the test — this is the
  // exact transition the first extraction missed: nothing else re-reads state after the initial toggle() click.
  assert.equal(changes.length, 2, 'the queue finishing must notify onChange even though nothing called a method')
  assert.equal(changes.at(-1), 'idle:Finished reading.')
})

// The behavior that shipped unverified last time: does stop() actually cancel speech, not just report idle?
test('stop() calls speechSynthesis.cancel() and returns to idle — verified, not assumed', () => {
  const { speech, calls } = fakeSpeech()
  const c = createReadAloudController(speech, makeUtterance)
  c.start('Reading something long enough to still be going.', null, 1)
  assert.equal(c.getState().phase, 'reading')
  c.stop()
  assert.ok(calls.includes('cancel'), 'stop() must call speechSynthesis.cancel(), not just flip local state')
  assert.equal(c.getState().phase, 'idle')
  assert.equal(c.getState().status, 'Stopped.')
})

test('an utterance error stops reading rather than hanging silently', () => {
  const { speech } = fakeSpeech()
  const created: UtteranceLike[] = []
  const capturingMakeUtterance = (text: string): UtteranceLike => {
    const u = makeUtterance(text)
    created.push(u)
    return u
  }
  const c = createReadAloudController(speech, capturingMakeUtterance)
  c.start('One. Two.', null, 1)
  created[0].onerror!() // the handler speakNext() actually attached, to the chunk actually being spoken
  assert.equal(c.getState().phase, 'idle')
  assert.equal(c.getState().status, 'Reading stopped — a speech error occurred.')
})

// ——— language & dialect selection, and the handle the choice collides to ———
import { languagesOf, dialectsOf, canonicalTag, localeHandleOf, encodeLocale, decodeLocale } from './readAloudLogic.ts'

const POLYGLOT: VoiceLike[] = [
  { name: 'Samantha', lang: 'en-US', default: false },
  { name: 'Kate', lang: 'en-GB', default: false },
  { name: 'Daria', lang: 'bg-BG', default: false },
  { name: 'Anna', lang: 'de-DE', default: false },
  { name: 'Petra', lang: 'de-CH', default: false },
  { name: 'Amelie', lang: 'fr-CA', default: false },
  { name: 'Monica', lang: 'es-ES', default: false },
  { name: 'Milena', lang: 'ru-RU', default: false },
  { name: 'Tingting', lang: 'zh-CN', default: false },
  { name: 'Meijia', lang: 'zh_TW', default: false },   // underscore on purpose — some engines report it
  { name: 'Alva', lang: 'sv-SE', default: false },     // a tongue the grid does not project
]

test('languagesOf lists the seven rays first, in sealed order, then the rest alphabetically', () => {
  assert.deepEqual(languagesOf(POLYGLOT), ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh', 'sv'])
})

test('languagesOf offers only languages a voice can actually speak', () => {
  assert.deepEqual(languagesOf([{ name: 'Kate', lang: 'en-GB', default: false }]), ['en'])
  assert.deepEqual(languagesOf([]), [])
})

test('dialectsOf lists the installed dialects of one language, hyphen-canonical, alphabetical', () => {
  assert.deepEqual(dialectsOf(POLYGLOT, 'zh'), ['zh-CN', 'zh-TW'])
  assert.deepEqual(dialectsOf(POLYGLOT, 'de'), ['de-CH', 'de-DE'])
})

test('pickVoice respects the dialect before the language — en-GB never loses to a curated en-US voice', () => {
  // Samantha is first in the curated en list; the old primary-subtag filter would return her for en-GB
  assert.equal(pickVoice(POLYGLOT, 'en-GB')?.name, 'Kate')
  assert.equal(pickVoice(POLYGLOT, 'de-CH')?.name, 'Petra')
  // no exact dialect installed → the language still speaks, rather than silence
  assert.equal(pickVoice(POLYGLOT, 'de-AT')?.name, 'Anna')
})

test('every linear spelling of a locale collides to one hexbit handle', () => {
  const h = localeHandleOf('en-GB')
  assert.match(h, /^[0-9a-f]{8}$/)
  for (const spelling of ['en-gb', 'EN-GB', 'en_GB', 'En_gB']) {
    assert.equal(localeHandleOf(spelling), h, `${spelling} is the same locale, so the same handle`)
  }
  assert.notEqual(localeHandleOf('en-US'), h, 'a different dialect is a different handle')
  assert.equal(canonicalTag('EN_gb'), 'en-gb')
})

test('the stored locale is verified by recomputation — what does not recompute is discarded', () => {
  const good = JSON.stringify(encodeLocale('bg-BG'))
  assert.deepEqual(decodeLocale(good), { tag: 'bg-bg', handle: localeHandleOf('bg-bg') }, 'a verified preference round-trips canonical')
  const forged = JSON.stringify({ tag: 'bg-bg', handle: '00000000' })
  assert.equal(decodeLocale(forged), null, 'a handle that does not recompute is not a preference')
  assert.equal(decodeLocale('not json'), null)
  assert.equal(decodeLocale(null), null)
})
