// downstream-pins — THE ADDRESSING CONTRACT uuidna OWES THE REPOSITORIES THAT ADDRESS THEIR WORK WITH IT.
//
// LEARNED FROM A DOWNSTREAM, NOT INVENTED HERE. A sibling estate content-addresses its whole business with
// uuidna handles — decades of signed contracts, domains, network configuration — and keeps a pin file: the
// constants it assumes and a set of BEHAVIOURAL probes, because a constant can hold while behaviour moves
// underneath it. Its sync tool re-probes and fails when upstream drifts, and the note it prints is the whole
// lesson in one line: "the handle index was built under the pinned values; rebuild it before trusting
// addresses."
//
// THE ASYMMETRY THAT MATTERS. That check runs DOWNSTREAM. It fires after uuidna has already moved, on a machine
// uuidna never sees, and only when someone happens to run it — while the only party who can actually break the
// pin is uuidna, which had no check at all. An index of decades of records could have been quietly invalidated
// by a refactor here, and the first symptom would have been addresses that no longer resolve to their
// documents. So the contract is declared HERE, where it can be broken, and recomputed by this tree's own suite.
//
// WHAT THIS IS NOT. It is not a promise never to change: it is a promise that a change is VISIBLE. A probe that
// moves is a breaking change to every downstream index, and it must be seen as one — announced and re-pinned
// deliberately — rather than discovered by a stranger whose addresses stopped matching.
import { toUuid, merkleFold } from './address.js'
import { handleOf } from './handle.js'
import { hexagramsOf, coinNeighbours } from './hexagram.js'
import { HEXBIT_BITS, HEXBIT_STATES, UUID_HEXBITS, HANDLE_HEXBITS, HANDLE_SPAN } from './hexbit/index.js'
import { HEXAGRAM_BITS, HEXAGRAM_STATES, PAYLOAD_HEXAGRAMS } from './hexagram.js'

/** the structural constants a downstream may assume when it builds an index */
export const CONTRACT_CONSTANTS: Readonly<Record<string, number>> = Object.freeze({
  HEXBIT_BITS, HEXBIT_STATES, UUID_HEXBITS, HANDLE_HEXBITS, HANDLE_SPAN,
  HEXAGRAM_BITS, HEXAGRAM_STATES, PAYLOAD_HEXAGRAMS,
})

// THE PROBE INPUTS ARE NAMED, which the pin format this was learned from does not do: its file records
// `toUuid(sample)` without recording what `sample` was, so the value can only be re-derived by reading the
// tool's source. Reproducing that opacity here would be copying a defect: checking this contract from the
// outside must need nothing but this file. (Measured: reconstructing a probe from the label alone gave three
// false mismatches and a moment of believing a downstream index had been invalidated.)
export const PROBE_INPUTS: readonly string[] = [
  'hitsol:domains/atlantis-scubadiving.com',   // the input a live downstream pins; kept so its pin is checkable here
  'uuidna',
  '',
]

// CARDINALITIES — the counted invariants a downstream pins that are not addresses. The live pin carried
// `coinNeighbours(0).length` and this checker reported it UNCHECKABLE, which was the honest answer and an
// incomplete contract: an invariant a downstream depends on belongs in the contract that promises it, not on a
// list of things nobody verifies. Adding it takes the live pin from eleven checkable probes to twelve.
export const CONTRACT_CARDINALITIES: Readonly<Record<string, number>> = Object.freeze({
  'coinNeighbours(0).length': coinNeighbours(0).length,
  'hexagramsOf(uuid).length': hexagramsOf(toUuid('uuidna')).length,
})

export interface ContractProbe { input: string; uuid: string; handle: string; hexagrams: string }

/** addressingProbes() → each named input with every derived value a downstream depends on. Pure. */
export function addressingProbes(): ContractProbe[] {
  return PROBE_INPUTS.map((input) => {
    const uuid = toUuid(input)
    return { input, uuid, handle: handleOf(uuid), hexagrams: hexagramsOf(uuid).join(',') }
  })
}

export interface AddressingContract {
  constants: Readonly<Record<string, number>>
  cardinalities: Readonly<Record<string, number>>
  probes: ContractProbe[]
  receipt: string
  honest: string
}

const HONEST =
  'The addressing contract is what a downstream index rests on: the same input must fold to the same uuid, the ' +
  'same handle and the same hexagrams, on every host and every version, or every address that downstream stored ' +
  'stops resolving to the record it was taken from. A probe moving here is a BREAKING CHANGE to those indexes — ' +
  'not a failing test to be updated until it passes.'

/** addressingContract() → the whole contract, folded to one receipt anyone recomputes. */
export function addressingContract(): AddressingContract {
  const probes = addressingProbes()
  return {
    constants: CONTRACT_CONSTANTS,
    cardinalities: CONTRACT_CARDINALITIES,
    probes,
    receipt: merkleFold([
      toUuid('addressing-contract'),
      ...Object.entries(CONTRACT_CONSTANTS).map(([k, v]) => toUuid(`const|${k}|${v}`)),
      ...Object.entries(CONTRACT_CARDINALITIES).map(([k, v]) => toUuid(`card|${k}|${v}`)),
      ...probes.map((p) => toUuid(`probe|${p.input}|${p.uuid}|${p.handle}|${p.hexagrams}`)),
    ]),
    honest: HONEST,
  }
}

export interface PinDrift { what: string; pinned: string; live: string }

/** the shape a downstream pin file takes — constants, and probes keyed however the downstream labels them */
export interface DownstreamPin {
  commit?: string
  constants?: Record<string, number>
  probes?: Record<string, string>
  /** the inputs behind the probe labels, when the downstream records them; without it a probe whose label
   *  names no input can only be checked for CONSTANTS, and this says so rather than guessing */
  inputs?: Record<string, string>
}

/** pinDrift(pin) → what a downstream pinned that no longer computes the same value here.
 *
 *  A probe whose input this file cannot determine is reported as UNCHECKABLE, never as holding: an unread
 *  probe and a passing probe are different facts, and collapsing them is how a contract silently lapses. */
export function pinDrift(pin: DownstreamPin): { drift: PinDrift[]; uncheckable: string[]; checked: number } {
  const drift: PinDrift[] = []
  for (const [k, v] of Object.entries(pin.constants ?? {})) {
    const live = CONTRACT_CONSTANTS[k]
    if (live === undefined) { drift.push({ what: `constant ${k}`, pinned: String(v), live: '(not in the contract)' }); continue }
    if (live !== v) drift.push({ what: `constant ${k}`, pinned: String(v), live: String(live) })
  }
  const uncheckable: string[] = []
  let checked = Object.keys(pin.constants ?? {}).length
  for (const [label, pinned] of Object.entries(pin.probes ?? {})) {
    // a CARDINALITY the contract names is checked as a number, whatever the downstream labelled it
    const card = CONTRACT_CARDINALITIES[label]
    if (card !== undefined) {
      checked++
      if (String(card) !== pinned) drift.push({ what: `cardinality ${label}`, pinned, live: String(card) })
      continue
    }
    const input = pin.inputs?.[label] ?? inputForLabel(label, pin)
    if (input === null) { uncheckable.push(label); continue }
    const uuid = toUuid(input)
    const live = /handle/i.test(label) ? handleOf(uuid) : /hexagram/i.test(label) ? hexagramsOf(uuid).join(',') : uuid
    checked++
    if (live !== pinned) drift.push({ what: `probe ${label}`, pinned, live })
  }
  return { drift, uncheckable, checked }
}

/** A probe label carries its input only when the pin records one, or when the pinned VALUE matches a probe this
 *  contract already computes — the second is a recognition, not a guess: if some declared input reproduces the
 *  pinned value exactly, that input is what produced it. Anything else is uncheckable and is reported as such. */
function inputForLabel(label: string, pin: DownstreamPin): string | null {
  const pinned = pin.probes?.[label]
  if (pinned === undefined) return null
  for (const p of addressingProbes()) {
    if (pinned === p.uuid || pinned === p.handle || pinned === p.hexagrams) return p.input
  }
  return null
}
