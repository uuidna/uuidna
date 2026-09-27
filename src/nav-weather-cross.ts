// nav-weather-cross — WHAT THE SEALED NAVIGATION ARITHMETIC ASSUMES, MADE VISIBLE BY LIVE WEATHER.
//
// The captain, 2026-09-28: "cross formulate navigation and weather wiring all relevant apis to crosscheck proofs".
//
// THE HONEST FORM OF THIS IS NOT "COMPARE NUMBERS". Most of what lean/Navigation.lean, lean/Sailing.lean and
// lean/Acoustics.lean seal is pure geometry — 8 × 45 = 360, 3² + 4² = 5², the reverse-bearing involution — and no
// measurement in the world can agree or disagree with it. Wiring an API to those would produce a check that always
// passes, which this repository calls furniture, and calling it corroboration would be worse than not doing it.
//
// THREE STATEMENTS ARE DIFFERENT, and they are the ones worth crossing: each is exact arithmetic that silently assumes
// STANDARD CONDITIONS, and a live reading names the assumption.
//
//   · lean/Acoustics.lean seals `wave_speed_f_lambda : 340 = 170 * 2`. 340 m/s is the speed of sound at about 15 °C.
//     At −10 °C it is near 325 and at 35 °C near 352, so the sealed integer carries a temperature nobody wrote down.
//   · lean/Diving.lean seals `absolute_pressure_at_depth : map (fun d => 1 + d/10) = [1,2,3,4,5]`. One bar per ten
//     metres plus ONE bar at the surface — and the surface bar is the weather. At 980 hPa the whole column is lighter
//     than the theorem's arithmetic says, which for a gas blend is the difference that matters.
//   · lean/Navigation.lean seals `compass_rose_eight : 8 * 45 = 360`. True for TRUE bearings; a magnetic compass reads
//     them offset by the local declination, which is a live geophysical field and not a constant.
//
// SO A DISAGREEMENT HERE IS NOT AN ERROR IN THE THEOREM, and that distinction is the whole contribution. The arithmetic
// is exact and stays exact. What the cross exposes is the CONDITION the arithmetic holds under, which was implicit and
// is now measured — the same shape as this tree's rule that UNVERIFIED means "not decidable here" and never "false".
// A theorem whose condition is visible is stronger than one whose condition is assumed, so every disagreement below is
// a lead about the CONDITION, never a refutation of the proof.
//
// INTEGER ARITHMETIC THROUGHOUT, in scaled units, because the determinism scan refuses Math.* anywhere and a float
// would make the answer a property of the host. Temperature arrives in centi-degrees, speeds leave in millimetres per
// second, pressures in millibars — so every value below is an exact integer a reader can recompute by hand.

import type { Probe } from './cross-surface.js'

/**
 * The speed of sound in dry air, in millimetres per second, from temperature in centi-degrees Celsius.
 *
 * c = 331.3 + 0.606·T m/s is the standard linear approximation. In scaled integers: 331300 + 606·T/100 mm/s, with the
 * division truncating — which is exact for any centi-degree input and identical on every host.
 */
export function speedOfSoundMmPerS(tempCentiC: number): number {
  const rise = 606 * tempCentiC
  return 331300 + (rise - (rise % 100)) / 100
}

/** absolute pressure in millibars at a depth in whole metres, given the live surface pressure in hPa (= mbar) */
export function absolutePressureMbar(depthM: number, surfaceMbar: number): number {
  // ten metres of seawater is very close to one bar; 100 mbar per metre, in exact integers
  return surfaceMbar + depthM * 100
}

/** the true bearing for a magnetic reading, both in whole degrees, normalised into [0, 360) */
export function trueFromMagnetic(magneticDeg: number, declinationDeg: number): number {
  const sum = magneticDeg + declinationDeg
  const wrapped = sum % 360
  return wrapped < 0 ? wrapped + 360 : wrapped
}

/** what a live source said, in the scaled integer units this module works in */
export interface LiveConditions {
  /** air temperature in centi-degrees Celsius, or null when the source did not answer */
  tempCentiC: number | null
  /** surface pressure in millibars (hPa), or null */
  surfaceMbar: number | null
  /** magnetic declination in whole degrees at the place asked about, or null */
  declinationDeg: number | null
}

/** the sealed values these probes cross, quoted from the wings rather than restated */
export const SEALED = {
  /** lean/Acoustics.lean wave_speed_f_lambda — 340 m/s, i.e. 340000 mm/s */
  soundSpeedMmPerS: 340000,
  /** lean/Diving.lean absolute_pressure_at_depth at 10 m — 2 bar, i.e. 2000 mbar */
  pressureAtTenMbar: 2000,
  /** lean/Navigation.lean compass_rose_eight — the eight points, in whole degrees */
  compassPoints: [0, 45, 90, 135, 180, 225, 270, 315] as readonly number[],
} as const

/**
 * The probes: one per commensurable statement, skipped entirely when the live side did not answer.
 *
 * A MISSING READING PRODUCES NO PROBE, rather than a probe that trivially agrees. cross-surface counts what it was
 * asked; handing it a pair where one side is a default would let an outage read as corroboration, which is the vacuous
 * pass this whole tree is built to refuse.
 */
export function navWeatherProbes(live: LiveConditions): Probe[] {
  const out: Probe[] = []

  if (live.tempCentiC !== null) {
    out.push({
      what: 'the speed of sound the Acoustics wing seals, against the live air temperature',
      a: { surface: 'lean/Acoustics.lean wave_speed_f_lambda (340 m/s)', value: SEALED.soundSpeedMmPerS },
      b: { surface: `331.3 + 0.606·T at T = ${live.tempCentiC / 100} °C`, value: speedOfSoundMmPerS(live.tempCentiC) },
      why: 'the sealed integer is the speed at about 15 °C, a condition the statement does not carry — a gap here is '
        + 'the temperature the theorem assumed, not an error in its arithmetic',
    })
  }

  if (live.surfaceMbar !== null) {
    out.push({
      what: 'absolute pressure at ten metres, against the live surface pressure',
      a: { surface: 'lean/Diving.lean absolute_pressure_at_depth (2 bar at 10 m)', value: SEALED.pressureAtTenMbar },
      b: { surface: `surface ${live.surfaceMbar} mbar + 100 mbar per metre`, value: absolutePressureMbar(10, live.surfaceMbar) },
      why: 'the theorem adds ONE bar for the surface; the surface is the weather, and for a partial-pressure blend the '
        + 'difference between 980 and 1030 mbar is the difference that matters',
    })
  }

  if (live.declinationDeg !== null) {
    // the north point is the sharpest case: true north is 0 by definition and magnetic north is not
    out.push({
      what: 'the compass rose read magnetically, against true north',
      a: { surface: 'lean/Navigation.lean compass_rose_eight (north = 0°)', value: SEALED.compassPoints[0]! },
      b: { surface: `magnetic north corrected by ${live.declinationDeg}° declination`, value: trueFromMagnetic(0, live.declinationDeg) },
      why: 'the eight points are exact for TRUE bearings; a magnetic compass is offset by a live geophysical field, so '
        + 'the disagreement IS the declination and the theorem is untouched',
    })
  }

  return out
}
