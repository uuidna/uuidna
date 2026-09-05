// ratchet-record — WHERE A MEASURE'S PRIOR READING LIVES, now that it is not allowed to live in the ledger.
//
// (the captain's judgement, 2026-09-05: "theorems like these are entropy", of
// the key the ratchet demanded next, mcp_wire_rate_fell_while_total_grew_32186, which the ledger never sealed
// and now never will — followed by "fasten the gates".)
//
// THE OLD PAYMENT WAS A CATEGORY ERROR. A ratchet's prior value was sealed as a Lean theorem whose key carried
// the value in its suffix, so raising a ceiling cost a trip through the conveyor and the court. The intent was
// right — a JSON file is edited in a second and a seal is not — but the instrument was wrong, and the rows it
// produced say so out loud:
//
//   theorem impossibility_modal_debt_642 : (642 > 622) ∧ (622 > 6) ∧ (6 + 0 = 6) := by decide
//   theorem mcp_tool_debt_100            : (100 < 119) ∧ (144 + 100 = 244)       := by decide
//
// Three failures at once. The SUBJECT IS CONTINGENT: 642 is a reading of this repository on a Tuesday, where a
// theorem's subject is a structure — `two_coins : 110 - 108 = 2` is literal arithmetic too, but 110 and 108 are
// constants OF THE SYSTEM. `by decide` SIGNS THE WRONG THING: the kernel verifies `642 > 622`, true of the
// numerals, and never saw the modal debt at all — the signature is then read as though it certified the
// measurement. And NOTHING CAN EVER CITE THEM: `(6 + 0 = 6)` is padding, so they are terminal nodes by
// construction, which is part of what the lonely-theorem finder keeps finding.
//
// Worse, it was generative. The ratchet's key is `prefix + measured value`, so the mechanism mints one new such
// row every time a ceiling moves, for ever — entropy with a pump attached.
//
// THIS RECORD IS STRICTLY MORE FRICTION THAN THE SEAL IT REPLACES, which is the only way to fasten a gate while
// removing its instrument. A minted numeral carried no argument: `..._32186` goes green with no reason given
// anywhere. An entry here carries its cause and the evidence for it as required fields, so a raise missing
// either is refused outright, and the whole record is content-addressed so a one-second edit is a one-second
// detection. The tree already applies exactly this discipline to the RULER (measureAddress); this
// applies it to the READING.
import { toUuid } from './address.js'
import { handleOf } from './handle.js'

/** One measure's sealed reading, with the argument the numeral could not carry. */
export interface RatchetEntry {
  prefix: string        // the measure's family, e.g. 'mcp_wire_rate' — no value in the name, ever
  reading: number       // the sealed value this measure is held to
  direction: 'shrink' | 'grow'
  unit: string
  cause: string         // WHY the reading is what it is — empty is a refusal, not a default
  evidence: string      // where the cause can be checked: a file, a run, a measurement anyone can repeat
  measureAddress: string // the ruler that produced it, so a reading is never compared across rulers
}

/** The record as a whole, plus the address that makes editing it visible. */
export interface RatchetRecord {
  entries: RatchetEntry[]
  address: string       // content-address of every entry, folded — the tamper-evidence the seal used to provide
  honest: string
}

const HONEST =
  'The prior reading of every ratcheted measure, with the cause and the evidence for it. A reading is a ' +
  'MEASUREMENT of this repository, not a theorem: it is contingent, it is superseded by the next reading, and ' +
  'nothing can be derived from it — so it is sealed by content-address here rather than minted into the proof ' +
  'ledger. A raise with no cause or no evidence is refused outright, which is strictly more friction than the ' +
  'numeral it replaces: `<prefix>_<value>` went green with no reason recorded anywhere.'

/** entryAddress(entry) → the content-address of one reading, ruler included.
 *  The ruler is part of the address because a reading taken with a different ruler is a different reading, and
 *  comparing across rulers produces a confident verdict about nothing. */
export function entryAddress(entry: RatchetEntry): string {
  return toUuid(`ratchet:${entry.prefix}:${entry.reading}:${entry.direction}:${entry.measureAddress}`)
}

/** recordAddress(entries) → the fold of every entry, order-invariant, so the record cannot be quietly edited. */
export function recordAddress(entries: readonly RatchetEntry[]): string {
  return handleOf(toUuid(entries.map(entryAddress).sort().join('|')))
}

/** sealRecord(entries) → the record with its address computed. */
export function sealRecord(entries: readonly RatchetEntry[]): RatchetRecord {
  return { entries: [...entries], address: recordAddress(entries), honest: HONEST }
}

/** entryFor(record, prefix) → the sealed reading for a measure, or null when it has none. */
export function entryFor(record: RatchetRecord, prefix: string): RatchetEntry | null {
  return record.entries.find((e) => e.prefix === prefix) ?? null
}

/** admitRaise(entry, to, cause, evidence) → the new entry, or the REFUSAL that keeps the ceiling where it is.
 *
 *  This is the whole fastening in one function. Under the old mechanism a raise cost a minted numeral and no
 *  argument; here a raise without a stated cause, or with a cause nobody can check, does not happen at all. A
 *  move in the ALLOWED direction is not a raise and needs no argument — progress is free, loosening is not. */
export function admitRaise(entry: RatchetEntry, to: number, cause: string, evidence: string):
{ admitted: true; entry: RatchetEntry } | { admitted: false; refused: string } {
  const loosening = entry.direction === 'shrink' ? to > entry.reading : to < entry.reading
  if (!loosening) return { admitted: true, entry: { ...entry, reading: to } }
  if (cause.trim() === '') {
    return { admitted: false, refused: `${entry.prefix} may only ${entry.direction}: ${entry.reading} → ${to} is a raise, and a raise with no stated cause is the loosening this record exists to refuse.` }
  }
  if (evidence.trim() === '') {
    return { admitted: false, refused: `${entry.prefix} ${entry.reading} → ${to} states a cause but names no evidence. A cause nobody can check is an assertion, and an assertion is what the numeral already was.` }
  }
  return { admitted: true, entry: { ...entry, reading: to, cause, evidence } }
}

/** ledgerRowsNamedByRatchet(keys, prefixes) → ledger keys that are ratchet READINGS wearing a theorem's name.
 *  The gate has no judgement in it: a key built as `<live ratchet prefix>_<digits>` is a measurement by
 *  construction, because that is exactly how the old mechanism minted one. */
export function ledgerRowsNamedByRatchet(keys: readonly string[], prefixes: readonly string[]): string[] {
  return keys.filter((k) => prefixes.some((p) => k.startsWith(p + '_') && /^\d+$/.test(k.slice(p.length + 1)))).sort()
}
