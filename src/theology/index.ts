// theology — THE LETTERS ARE NUMERALS, AND THE ARITHMETIC IS THE WHOLE OF WHAT IS DECIDED. The values come from
// ./numerals.ts (derived from numeral order by the rank rule alphabetic_three_ranks seals, no table typed); this module
// adds the text's lattice coordinates and the refusal numerology needs.
//
// gematria_forces_collisions proves a shared value is the expected case, and gematria_ignores_order proves every anagram
// carries the same value. So every reading comes with its CONTROL: the same letters sorted, which keeps the value and
// moves the address. A verse's lattice station is where its letters address to, an identity for the text and never an
// interpretation of it (provenance_integrity_not_content_truth).
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { stationOfAddress, latticeCall, type StationMeaning } from '../lattice.js'
import { lettersOf, numeralValueOf, type Script } from './numerals/index.js'

export { NUMERAL_ORDER, rankValueOf, lettersOf, numeralValueOf, type Script } from './numerals/index.js'

export const THEOLOGY_HONEST =
  'The value is decided arithmetic over the letters in numeral order (alphabetic_three_ranks). A shared value is the ' +
  'expected case (gematria_forces_collisions) and is blind to order (gematria_ignores_order): the control sorts the same ' +
  'letters, keeps the value, and lands on another station. A station is where the letters address to, an identity for ' +
  'the text and never its meaning (provenance_integrity_not_content_truth).'

export interface ScriptureReading {
  script: Script
  letters: number
  value: number
  address: string
  handle: string
  station: string
  /** the ledger cargo at that station: what the lattice holds there, not what the verse says */
  lattice: Pick<StationMeaning, 'readFrom' | 'distance' | 'skills' | 'receipt'>
  control: { value: number; station: string }
  honest: string
}

/** readingOf(text, script) → the value, the text's lattice coordinates and the station's cargo, beside the control. */
export function readingOf(text: string, script: Script): ScriptureReading {
  const letters = lettersOf(text, script)
  const joined = letters.join('')
  const address = toUuid(`${script}|${joined}`)
  const station = stationOfAddress(address)
  const { readFrom, distance, skills, receipt } = latticeCall(station).meaning
  const sorted = [...letters].sort().join('')
  return {
    script, letters: letters.length, value: numeralValueOf(joined, script), address, handle: handleOf(address), station,
    lattice: { readFrom, distance, skills, receipt },
    control: { value: numeralValueOf(sorted, script), station: stationOfAddress(toUuid(`${script}|${sorted}`)) },
    honest: THEOLOGY_HONEST,
  }
}
