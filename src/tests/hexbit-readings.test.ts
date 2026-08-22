// hexbit-readings — EACH LANGUAGE READS HEXBIT-TRANSLATED ENGLISH, AND THE ADDRESS SURVIVES THE TONGUE
//
// English folds to hexbits; the fold is the translation. What these tests hold: every locale ray can read the
// fold back in its own words (no ray is a second-class reader), the seven readings are genuinely seven texts
// over ONE address (translation changes the spelling, never the meaning), and a reader refuses what is not a
// hexbit instead of guessing (the control). The table's keys are pinned to the sealed DIMENSIONS so neither
// list can drift without the other noticing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DIMENSIONS, HEXBIT_WORDS, readHexbits, englishToHexbitReadings, toUuid } from '../index.js'
import { handleOf } from '../handle.js'

test('the reading table covers exactly the seven sealed rays — no ray unread, no stowaway tongue', () => {
  assert.deepEqual(Object.keys(HEXBIT_WORDS).sort(), [...DIMENSIONS].sort())
})

test('every language names all sixteen states, each name distinct within its tongue', () => {
  for (const [lang, words] of Object.entries(HEXBIT_WORDS)) {
    assert.equal(words.length, 16, `${lang}: sixteen states need sixteen names`)
    assert.ok(words.every((w) => w.length > 0), `${lang}: no state is nameless`)
    assert.equal(new Set(words).size, 16, `${lang}: two states sharing a name would be unreadable`)
  }
})

test('English text folds to one handle and all seven rays read it — seven texts, one address', () => {
  const { handle, readings } = englishToHexbitReadings('The pitch is the digit.')
  assert.match(handle, /^[0-9a-f]{8}$/)
  assert.equal(readings.length, DIMENSIONS.length)
  for (const r of readings) {
    assert.equal(r.hex, handle, `${r.lang}: every ray reads the SAME tiles`)
    assert.equal(r.words.length, 8, `${r.lang}: eight tiles, eight words`)
    assert.match(r.utterance.address, /^[0-9a-f-]{36}$/, `${r.lang}: the reading itself is addressed`)
  }
  assert.equal(new Set(readings.map((r) => r.utterance.text)).size, readings.length, 'seven tongues, seven spellings')
  assert.equal(new Set(readings.map((r) => r.hex)).size, 1, 'and one meaning under all of them')
})

test('the reading is exact — state a is "ten" in English, "десет" in Bulgarian, "十" in Chinese', () => {
  assert.deepEqual(readHexbits('a0', 'en').words, ['ten', 'zero'])
  assert.deepEqual(readHexbits('a0', 'bg').words, ['десет', 'нула'])
  assert.deepEqual(readHexbits('a0', 'zh').words, ['十', '零'])
  assert.deepEqual(readHexbits('F', 'de').words, ['fünfzehn'], 'case is not meaning')
})

test('CONTROL — a non-hexbit character is refused by name, never guessed at', () => {
  assert.throws(() => readHexbits('a0g1', 'en'), /"g" is not a hexbit state/)
  assert.throws(() => readHexbits('a0', 'tr'), /no reading for language "tr"/)
})

test('the reading round-trips — the words point back to the states that made them', () => {
  const handle = handleOf(toUuid('round trip'))
  for (const lang of DIMENSIONS) {
    const r = readHexbits(handle, lang)
    const decoded = r.words.map((w) => HEXBIT_WORDS[lang]!.indexOf(w).toString(16)).join('')
    assert.equal(decoded, handle, `${lang}: the tongue reads back to the tiles`)
  }
})
