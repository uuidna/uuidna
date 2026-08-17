// clock/order — WHAT THE CLOCK CAN SAY ABOUT TWO POSITIONS. A clock with no reading still orders: a step is before
// or after another, and two clocks agree exactly when they stand at the same step. There is no "close enough" here
// and no tolerance window, because there is no drift to tolerate — a step is a position, not a measurement.
import type { Tick } from './step.js'

/** Monotone by construction: a later step is never an earlier one (the odometer's law, in the small). */
export const isAfter = (a: Tick, b: Tick): boolean => a.step > b.step

/** Two clocks agree iff they are at the same step — no drift is possible, because there is nothing to drift from. */
export const agree = (a: Tick, b: Tick): boolean => a.step === b.step && a.address === b.address

/** The distance between two positions, in steps — a COUNT, never a duration. */
export const between = (a: Tick, b: Tick): number => (a.step > b.step ? a.step - b.step : b.step - a.step)
