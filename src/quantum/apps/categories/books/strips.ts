// strips — WHAT HANDLES DO WHEN THEY WRITE A BOOK.
//
// Fourteen lines, ten choices per line: the sonnet measure (literature_sonnet_measure) is the product; the book
// is the power (literature_sonnet_volume) — STATION_TEN choices on VE_FACES lines. Selecting one variant per
// line folds to a handle. Occupancy, not verse: no poem text lives here.
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'
import { compileToHexbits, VE_FACES } from '../../../../hexbit/index.js'
import { STATION_TEN } from '../../../../hexagram.js'

/** Sonnet lines / VE faces — HANDLE_HEXBITS + HEXBIT_BITS + COINS. */
export const STRIP_LINES = VE_FACES
/** Variants per line — hexagram lines plus hexbit width, the ten stations. */
export const STRIP_CHOICES = STATION_TEN

export interface HandleBook {
  address: string
  handle: string
  choices: readonly number[]
  lines: number
  variants: number
  volume: number
}

function volumeOf(): number {
  let n = 1
  for (let i = 0; i < STRIP_LINES; i++) n = n * STRIP_CHOICES
  return n
}

function assertChoices(choices: readonly number[]): void {
  if (choices.length !== STRIP_LINES) {
    throw new Error(`handle book: need ${STRIP_LINES} strips, got ${choices.length}`)
  }
  for (let i = 0; i < choices.length; i++) {
    const c = choices[i]!
    if (c !== (c | 0) || c < 0 || c >= STRIP_CHOICES) {
      throw new Error(`handle book: strip ${i} is not a choice in 0..${STRIP_CHOICES - 1}`)
    }
  }
}

/** handleBookOf(choices) → the book those fourteen strip-choices write. Same choices, same handle. */
export function handleBookOf(choices: readonly number[]): HandleBook {
  assertChoices(choices)
  const address = toUuid(choices.join(''))
  return {
    address,
    handle: handleOf(address),
    choices: [...choices],
    lines: STRIP_LINES,
    variants: STRIP_CHOICES,
    volume: volumeOf(),
  }
}

/** stripsOf(address) → fourteen choices read off the first VE_FACES hexbits, each reduced onto the ten stations. */
export function stripsOf(address: string): number[] {
  return compileToHexbits(address).slice(0, STRIP_LINES).map((t) => t % STRIP_CHOICES)
}
