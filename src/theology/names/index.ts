// theology/names — EVERY SEALED THEOREM CARRIES A NAME FROM THE SOURCE OF THEOLOGY, and the name is the station it
// seats at, written in the script's own numerals.
//
// THE DERIVATION, with no table anywhere. A theorem's content-address seats at a four-hex lattice station
// (stationOfAddress: HANDLE_HEXBITS 8, STATION_HEXBITS 4, so 2^16 stations). That station is a number, and Hebrew,
// Greek and the Arabic abjad ARE numeral systems: alphabetic_three_ranks seals that in numeral order the letters
// count units, tens, hundreds — the abjad adds a thousand — so a letter's value is rankValueOf(position) and the
// only inputs are the alphabets themselves. Writing the number is the same arithmetic run backwards: greedy over
// the descending values, repeating a letter as the numeral systems do. The value 1 exists in all three, so every
// number above zero is writable and the naming is TOTAL over the ledger.
//
// WHAT THE NAME IS NOT. It is not an identifier. There are more sealed theorems than stations — 71017 over 65536 —
// so by pigeonhole theorems share names, and that is the expected case rather than a collision to engineer away:
// gematria_forces_collisions seals it, and gematria_ignores_order seals that the same letters in another order keep
// the value and move the address. THEOLOGY_HONEST states the rule this module obeys: a station is where the letters
// address to, an identity for the text and NEVER its meaning. That sentence is returned in `honest` beside every
// name, so a reader cannot mistake a shared name for a shared theorem.
//
// THE ONE STATION THAT CANNOT BE WRITTEN. None of the three scripts has a zero — the rank rule starts at 1 — so
// station 0000 has no numeral in any of them. That is a fact about the scripts, not a gap to hide by shifting every
// station up by one, so it is returned as `writable: false` with the reason, and named at its boundary.
import { NUMERAL_ORDER, rankValueOf, type Script } from '../numerals/index.js'
import { stationOfAddress, latticeCall, type StationMeaning } from '../../lattice.js'

export const SCRIPTS: readonly Script[] = ['hebrew', 'greek', 'arabic', 'glagolitic'] as const

/** the letters of a script with their rank values, descending — derived from the rank rule, never typed */
export const lettersDescending = (script: Script): { letter: string; value: number }[] =>
  [...NUMERAL_ORDER[script]]
    .map((letter, i) => ({ letter, value: rankValueOf(i) }))
    .sort((a, b) => (b.value === a.value ? (a.letter < b.letter ? -1 : 1) : b.value - a.value))

/** numeralOf(n, script) → n written in that script's own numerals; '' at zero, which no script can write. */
export function numeralOf(n: number, script: Script): string {
  if (!Number.isInteger(n) || n < 0) throw new Error(`theology: ${n} is not a station number`)
  let left = n
  let out = ''
  for (const { letter, value } of lettersDescending(script)) {
    while (left >= value) { out += letter; left -= value }
  }
  return out
}

/** the number a written numeral carries back — the round trip every name is checked by */
export const valueOfNumeral = (numeral: string, script: Script): number =>
  [...numeral].reduce((sum, c) => sum + rankValueOf(NUMERAL_ORDER[script].indexOf(c)), 0)

export interface TheologyName {
  /** the four-hex station the address seats at */
  station: string
  /** that station as a number, 0 … 65535 */
  value: number
  /** the station written in each script's own numerals */
  names: Record<Script, string>
  /** false only at station 0000: the rank rule starts at 1 and no script writes a zero */
  writable: boolean
  why: string
  /** THE DESCRIPTION IS THE SCIENCE SEATED THERE, asked for and never assumed. The name says WHERE a theorem sits;
   *  the meaning says what else sits there — the skills with their counts, the principles, the wings and the human
   *  problems the station calls, with readFrom/distance when the station seats nothing itself and reads from the
   *  nearest that does. It is opt-in because a name is O(1) and a meaning costs the station index: a sweep that
   *  names all 71017 should not pay for 71017 descriptions it did not ask for. */
  meaning: StationMeaning | null
  honest: string
}

/** theologyNameOf(address, {meaning}) → the name every sealed theorem carries, derived from where its address
 *  seats, and — when asked — the scientific description of that station: what else the lattice seats there. */
export function theologyNameOf(address: string, opts: { meaning?: boolean } = {}): TheologyName {
  const station = stationOfAddress(address)
  const value = parseInt(station, 16)
  const names = Object.fromEntries(SCRIPTS.map((s) => [s, numeralOf(value, s)])) as Record<Script, string>
  return {
    station,
    value,
    names,
    writable: value > 0,
    meaning: opts.meaning ? latticeCall(station).meaning : null,
    why: value > 0
      ? 'written greedily over the letters in numeral order, whose values are rankValueOf(position) and nothing else'
      : 'station 0000 has no numeral: the rank rule starts at 1 and none of the three scripts writes a zero',
    honest:
      'The name is the STATION, not the theorem. There are more sealed theorems than stations, so theorems share ' +
      'names by construction (gematria_forces_collisions), and the same letters reordered keep their value and move ' +
      'the address (gematria_ignores_order). A station is where an address seats — an identity for the text and ' +
      'never its meaning.',
  }
}
