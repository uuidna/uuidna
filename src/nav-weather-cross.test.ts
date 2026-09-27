import { test } from 'node:test'
import assert from 'node:assert/strict'
import { disagreements } from './cross-surface.js'
import {
  SEALED,
  absolutePressureMbar,
  navWeatherProbes,
  speedOfSoundMmPerS,
  trueFromMagnetic,
} from './nav-weather-cross.js'

// THE SEALED 340 IS A TEMPERATURE NOBODY WROTE DOWN, and this is the arithmetic that says which one.
test('speedOfSoundMmPerS — 15 °C lands within a metre of the sealed 340 m/s', () => {
  const at15 = speedOfSoundMmPerS(1500)
  assert.equal(at15, 340390)
  const off = at15 - SEALED.soundSpeedMmPerS
  assert.ok(off > 0 && off < 1000, `within a metre per second: ${off} mm/s`)
})

test('speedOfSoundMmPerS — cold and hot air move it metres, not millimetres', () => {
  assert.equal(speedOfSoundMmPerS(-1000), 325240)
  assert.equal(speedOfSoundMmPerS(3500), 352510)
  assert.ok(speedOfSoundMmPerS(3500) - speedOfSoundMmPerS(-1000) > 27000)
})

// EXACT ON EVERY HOST: the division truncates by construction, so no rounding namespace is consulted.
test('speedOfSoundMmPerS — integer only, and exact at a centi-degree', () => {
  assert.equal(speedOfSoundMmPerS(0), 331300)
  assert.equal(speedOfSoundMmPerS(1), 331306)
  assert.ok(Number.isInteger(speedOfSoundMmPerS(1237)))
})

test('absolutePressureMbar — the theorem\'s 2 bar at ten metres assumes a 1000 mbar surface', () => {
  assert.equal(absolutePressureMbar(10, 1000), 2000)
  assert.equal(absolutePressureMbar(10, 1000), SEALED.pressureAtTenMbar)
  assert.equal(absolutePressureMbar(10, 980), 1980)
  assert.equal(absolutePressureMbar(10, 1030), 2030)
})

test('trueFromMagnetic — normalises both ways round the circle', () => {
  assert.equal(trueFromMagnetic(0, 5), 5)
  assert.equal(trueFromMagnetic(0, -5), 355)
  assert.equal(trueFromMagnetic(350, 20), 10)
})

// A MISSING READING PRODUCES NO PROBE. Handing cross-surface a pair with a defaulted side would let an outage read as
// corroboration, which is the vacuous pass this tree exists to refuse.
test('navWeatherProbes — an unanswered source yields NO probe, never an agreeing one', () => {
  assert.deepEqual(navWeatherProbes({ tempCentiC: null, surfaceMbar: null, declinationDeg: null }), [])
  assert.equal(navWeatherProbes({ tempCentiC: 1500, surfaceMbar: null, declinationDeg: null }).length, 1)
})

test('navWeatherProbes — all three conditions answered gives three probes', () => {
  const p = navWeatherProbes({ tempCentiC: 1500, surfaceMbar: 1013, declinationDeg: 4 })
  assert.equal(p.length, 3)
  for (const x of p) {
    assert.ok(x.why.length > 40, 'each probe says what a gap would mean')
    assert.match(x.a.surface, /lean\//, 'the sealed side names the wing it is quoted from')
  }
})

// THE DISAGREEMENT IS THE CONDITION, not a refutation — at standard conditions it nearly vanishes, and off them it does not.
test('navWeatherProbes — standard conditions agree closely; off-standard conditions disagree measurably', () => {
  const standard = disagreements(navWeatherProbes({ tempCentiC: 1500, surfaceMbar: 1000, declinationDeg: 0 }))
  const atStandard = standard.find((d) => d.what.includes('pressure'))
  assert.equal(atStandard, undefined, 'a 1000 mbar surface is exactly what the theorem assumed')

  const storm = disagreements(navWeatherProbes({ tempCentiC: -1000, surfaceMbar: 980, declinationDeg: 12 }))
  assert.equal(storm.length, 3, 'cold, low and offset — every condition the theorems assumed is visibly absent')
  // THE SIGN CARRIES DIRECTION and must not be flattened: delta is b − a, so colder air and a lower surface are
  // NEGATIVE while an easterly declination is positive. Asserting delta > 0 was my error, and it would have hidden
  // exactly the two departures that matter most to a diver and a musician.
  for (const d of storm) assert.notEqual(d.delta, 0)
  const sound = storm.find((d) => d.what.includes('speed of sound'))!
  assert.ok(sound.delta < 0, 'cold air is SLOWER than the sealed 340, and the sign says so')
  const pressure = storm.find((d) => d.what.includes('pressure'))!
  assert.ok(pressure.delta < 0, 'a 980 mbar surface is LIGHTER than the theorem assumed')
  const compass = storm.find((d) => d.what.includes('compass'))!
  assert.ok(compass.delta > 0, 'an easterly declination turns true north clockwise')
})
