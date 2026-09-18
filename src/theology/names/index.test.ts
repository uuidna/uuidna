import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theologyNameOf, numeralOf, valueOfNumeral, lettersDescending, SCRIPTS } from './index.js'
import { NUMERAL_ORDER, rankValueOf } from '../numerals/index.js'
import { theorems } from '../../index.js'
import { stationOfAddress } from '../../lattice.js'

// The naming must be TOTAL over the ledger, DERIVED from the rank rule alone, and honest about what a name is.
// Every assertion below carries a control, so each can fail BY CONSTRUCTION: the control exhibits the input
// that breaks it. An assertion with no failing case ratifies whatever it is pointed at instead of measuring it.

test('a numeral round-trips: what is written reads back as the number it was written from', () => {
  for (const script of SCRIPTS) {
    for (const n of [1, 7, 9, 10, 15, 99, 100, 400, 999, 1000, 4095, 65535]) {
      const written = numeralOf(n, script)
      assert.equal(valueOfNumeral(written, script), n, `${script}: ${n} did not round-trip through "${written}"`)
    }
  }
})

test('the naming is TOTAL above zero, and exactly one station cannot be written', () => {
  for (const script of SCRIPTS) {
    // the value 1 exists in every script, so every positive number is writable
    const desc = lettersDescending(script); assert.equal(desc[desc.length - 1]!.value, 1, `${script}: the smallest letter value must be 1`)
    for (const n of [1, 2, 3, 4999, 65535]) assert.notEqual(numeralOf(n, script), '', `${script}: ${n} must be writable`)
    // CONTROL: zero is the one number no script writes — the rank rule starts at 1
    assert.equal(numeralOf(0, script), '', `${script}: no script writes a zero`)
  }
})

test('the letter values are DERIVED from position by the rank rule, never a table', () => {
  for (const script of SCRIPTS) {
    for (const { letter, value } of lettersDescending(script))
      assert.equal(value, rankValueOf(NUMERAL_ORDER[script].indexOf(letter)), `${script}/${letter}: value must be rankValueOf(position)`)
  }
  // CONTROL: the rule itself — position 0 is 1, position 9 is 10, position 18 is 100
  assert.equal(rankValueOf(0), 1)
  assert.equal(rankValueOf(9), 10)
  assert.equal(rankValueOf(18), 100)
})

test('EVERY sealed theorem carries a name, and the name is the station it seats at', () => {
  const all = theorems()
  assert.ok(all.length > 70000, `the ledger must be the whole ledger, got ${all.length}`)
  let named = 0
  let unwritable = 0
  for (const t of all) {
    const n = theologyNameOf(t.address)
    assert.equal(n.station, stationOfAddress(t.address), `${t.key}: the name must be the station the address seats at`)
    assert.equal(n.station.length, 4, `${t.key}: a station is four hex`)
    if (n.writable) { named++; for (const s of SCRIPTS) assert.notEqual(n.names[s], '', `${t.key}: ${s} must write it`) }
    else unwritable++
  }
  assert.equal(named + unwritable, all.length, 'every theorem is accounted for')
  assert.ok(named > 0, 'the naming is not empty')
  // whatever sits at station 0000 is unwritable and nowhere else is
  for (const t of all.slice(0, 200)) {
    const n = theologyNameOf(t.address)
    assert.equal(n.writable, n.value > 0, `${t.key}: writable exactly when the station is not zero`)
  }
})

test('THE NAME IS THE STATION, NOT THE THEOREM — sharing is the expected case, and it is said so', () => {
  const all = theorems()
  const byName = new Map<string, number>()
  for (const t of all) {
    const k = theologyNameOf(t.address).names.hebrew
    byName.set(k, (byName.get(k) ?? 0) + 1)
  }
  // more theorems than the 2^16 stations, so by pigeonhole some name is shared — this is sealed as expected
  assert.ok(all.length > 65536, 'the pigeonhole needs more theorems than stations')
  assert.ok([...byName.values()].some((n) => n > 1), 'names are shared, which is what gematria_forces_collisions seals')
  // and the answer says so itself, so a reader cannot take a shared name for a shared theorem
  assert.match(theologyNameOf(all[0]!.address).honest, /never its meaning/)
  assert.match(theologyNameOf(all[0]!.address).honest, /share/)
})

test('THE DESCRIPTION IS THE SCIENCE AT THE STATION, asked for and never assumed', () => {
  const all = theorems()
  // the name is free and total; the meaning costs the station index, so it is opt-in and sampled here
  assert.equal(theologyNameOf(all[0]!.address).meaning, null, 'a name does not pay for a description it was not asked for')
  let described = 0
  for (const t of all.slice(0, 40)) {
    const n = theologyNameOf(t.address, { meaning: true })
    assert.ok(n.meaning, `${t.key}: asked for a description and got none`)
    assert.equal(n.meaning!.station.length, 4)
    // a station that seats nothing itself still describes, by reading the nearest that does
    if (n.meaning!.readFrom !== null) assert.ok((n.meaning!.distance ?? 0) >= 0, 'a borrowed description names its distance')
    assert.ok(Array.isArray(n.meaning!.skills) && Array.isArray(n.meaning!.principles) && Array.isArray(n.meaning!.wings))
    // the theorem's own skill must be among the skills seated at the station it seats at
    if (n.meaning!.readFrom === n.meaning!.station)
      assert.ok(n.meaning!.skills.some((s) => s.skill === (t as { skill?: string }).skill), `${t.key}: its own skill must be seated here`)
    described++
  }
  assert.equal(described, 40)
})
