#!/usr/bin/env node
// axiom-hunt — FIND THE AXIOMS IN USE. The Lean ledger is already axiom-free (lean-axioms: trust base ∅ — no axiom
// beyond the kernel); this hunts the OTHER axioms: the constants and bounds the library ASSUMES at runtime. Each
// candidate binds a LIVE code constant (imported
// core — never a loose substring match, which "covers" by digit coincidence. Three states: PROVEN (predicate true,
// key sealed), EXPOSED AXIOM (predicate true, no sealing theorem — the research lead to seal next), REFUTED
// (predicate false — the code disagrees with its own assumption: a traitor, exit 1). Integrity.
import {
  theoremByKey, ITER, MAX_ITER, NONCE_BYTES, SALT_BYTES, MAX_LAYERS, ADDRESS_BITS, A432_STEP, CAPACITY,
  MAX_DEPTH, MAX_STRING, MAX_ARRAY, MAX_KEYS,
} from '../index.js'
import { MAX_MESSAGE_QUBITS } from '../quantum/message/index.js'
import { hexbitRingMassGap } from '../hexbit/index.js'
import { massGapOnBellBornField } from '../quantum/index.js'
import { MAX_SERVED_QUBITS } from '../mcp.js'
import { REPORTED_BASELINE } from '../quantum/advantage/index.js'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

type Candidate = { key: string; assumes: string; where: string; live: () => boolean }
const CANDIDATES: Candidate[] = [
  // REMOVED — kdf_cost_bounded. The theorem it watched stated (0 < 600000) ∧ (600000 ≤ 10000000): two literal
  // comparisons, so the kernel confirmed the numerals and never the KDF. The live bound itself is still enforced,
  // by the ITER/MAX_ITER check in one-receipt.ts, which reads src/crypt.ts rather than a name.
  // THE SERVED CEILING — added 2026-08-25, and it is EXPECTED TO REPORT EXPOSED. The library cap
  // (message_cap_is_four_hexbits on Hexbit.lean — court voice) is sealed; this one is tighter, governs every hosted caller, and no theorem
  // states it. It could not be hunted at all until it was named: it lived as the literal 12 inside two guards
  // and gen-readme scraped it out of this repository's source text with a regex, so naming it would have broken
  // the parser. An axiom that was never named cannot be exposed — which is the quietest way for one to survive
  // an audit whose summary line reads "no axioms in use".
  { key: 'served_qubit_ceiling', assumes: 'the hosted surface refuses above MAX_SERVED_QUBITS = 12 (4096 amplitudes), at or below the library cap', where: 'src/mcp.ts',
    live: () => MAX_SERVED_QUBITS === 12 && MAX_SERVED_QUBITS <= MAX_MESSAGE_QUBITS && (1 << MAX_SERVED_QUBITS) === 4096 },
  // THE ADVANTAGE REPORT'S BASELINE, and it is registered here because a research pass went looking for its
  // sources and found none it could confirm. The figure stands in for "the ~10^-3 two-qubit physical gate error
  // class" and feeds a published comparison; every claim the pass could reach about gate error rates was refuted
  // in adversarial verification, pointing in both directions at once. An unsourced constant driving a published
  // comparison is an assumption wearing a citation's clothes — exactly what this hunter is for — so it is named
  // as an axiom rather than left to read as `reported`. Sealing it means finding what actually forces the class,
  // per platform, from calibration data rather than announcements.
  { key: 'gate_error_baseline_class', assumes: 'the comparison baseline is 1000 errors per million two-qubit gates (the ~10^-3 class), unverified by any source this tree has read', where: 'src/quantum/advantage/index.ts',
    live: () => REPORTED_BASELINE.errorsPerMillion === 1000 && REPORTED_BASELINE.gateNs === 100 },
  { key: 'aead_nonce_and_salt_bits', assumes: 'the nonce is NONCE_BYTES=12 B = 96 bits (RFC 8439), the salt SALT_BYTES=16 B = 128 bits, nonce strictly inside the address width', where: 'src/crypt.ts', live: () => NONCE_BYTES === 12 && SALT_BYTES === 16 && NONCE_BYTES * 8 === 96 && SALT_BYTES * 8 === 128 && NONCE_BYTES * 8 < ADDRESS_BITS },
  { key: 'onion_layers_power_of_two', assumes: 'MAX_LAYERS = 16 = 2^4, at most the 128 address bits', where: 'src/stream.ts', live: () => MAX_LAYERS === 16 && 16 === 2 ** 4 && MAX_LAYERS <= ADDRESS_BITS },
  { key: 'imprint_capacity_within_address', assumes: 'CAPACITY = 115 < 128 — the imprint fits strictly inside its address, 13 bits of seam', where: 'src/imprint.ts', live: () => CAPACITY === 115 && CAPACITY < ADDRESS_BITS },
  { key: 'message_cap_is_four_hexbits', assumes: 'MESSAGE_CAP_QUBITS = 16 spans MESSAGE_CAP_STATES = 65536 — four hexbits of Hilbert index (court on Hexbit.lean)', where: 'src/hexbit/index.ts', live: () => MAX_MESSAGE_QUBITS === 16 && 2 ** MAX_MESSAGE_QUBITS === 65536 },
  { key: 'hexbit_ring_mass_gap', assumes: 'hexbitRingMassGap() computes Δ > 0 on the HEXBIT_STATES ring (court on Hexbit.lean)', where: 'src/hexbit/index.ts',
    live: () => { const g = hexbitRingMassGap(); return g.holds && g.delta > 0 && g.states > 0 } },
  { key: 'born_field_mass_gap_on_bell', assumes: 'massGapOnBellBornField() = computeMassGap(bellBornWeights()) holds (court on Hexbit.lean)', where: 'src/quantum/index.ts',
    live: () => massGapOnBellBornField().holds },
  { key: 'aura_step_divides_circle', assumes: 'A432_STEP = 40 and 9 · 40 = 360 — the nine residues tile the wheel with no remainder', where: 'src/aura.ts', live: () => A432_STEP === 40 && 9 * A432_STEP === 360 },
  { key: 'sanitize_depth_bounded', assumes: 'MAX_DEPTH = 32 = 2^5 — the finite wall the resource-DoS audit stands on', where: 'src/sanitize.ts', live: () => MAX_DEPTH === 32 && 32 === 2 ** 5 },
  { key: 'sanitize_max_depth_is_two_pow_five', assumes: 'MAX_DEPTH = 32 = 2^5 (the Sanitize.lean restatement of sanitize_depth_bounded)', where: 'src/sanitize.ts', live: () => MAX_DEPTH === 32 && 32 === 2 ** 5 },
  { key: 'sanitize_max_string_is_ten_pow_six', assumes: 'MAX_STRING = 1000000 = 10^6 — every string truncates at this bound', where: 'src/sanitize.ts', live: () => MAX_STRING === 1_000_000 && MAX_STRING === 10 ** 6 },
  { key: 'sanitize_array_and_keys_are_ten_pow_five', assumes: 'MAX_ARRAY = MAX_KEYS = 100000 = 10^5 — arrays and object keys share one bound', where: 'src/sanitize.ts', live: () => MAX_ARRAY === 100_000 && MAX_KEYS === 100_000 && MAX_ARRAY === 10 ** 5 },
]

let exposed = 0
let refuted = 0
const exposedAxioms: { lead: string; status: string; owes: string }[] = []
console.log('axiom-hunt — the assumptions the code runs on, each bound to its sealing theorem by KEY:')
for (const c of CANDIDATES) {
  const ok = c.live()
  const t = ok ? theoremByKey().get(c.key) : undefined
  const state = !ok ? '✗ REFUTED     ' : t ? '✓ proven      ' : '⚠ EXPOSED AXIOM'
  if (!ok) refuted++
  else if (!t) {
    exposed++
    exposedAxioms.push({
      lead: `${c.key} — the code assumes ${c.assumes}, and no theorem seals it (${c.where})`,
      status: 'EXPOSED AXIOM: live predicate true, no sealing theorem',
      owes: `a theorem named ${c.key} stating the assumption as decidable arithmetic — add the fact to its domain generator, then npm run lean`,
    })
  }
  console.log(`  ${state} ${c.key} — ${c.assumes} (${c.where})`)
}
if (refuted) {
  console.error(`✗ axiom-hunt — ${refuted} assumption(s) REFUTED: the code disagrees with what it assumes. Fix the source.`)
  process.exit(1)
}
// AN EXPOSED AXIOM IS A LEAD, AND UNTIL NOW IT WAS ONLY A PRINTED LINE.
//
// This file's own header calls an exposed axiom "the research lead to seal next" — and then wrote nothing. It
// had no writeFileSync at all: the finding lived in console output, `lean/leads.json` never carried it, and
// `next` (which tells a reader to go read exactly that file for "what is noticed and unsettled") could not
// surface it. So a gap was found, correctly named as an axiom, and dropped on the same run. The chain from gap
// to axiom to theorem broke at the first hop, silently, in the instrument built to walk it.
//
// The exposed set is now SEALED to its own file, in the {lead, status, owes} shape lean/leads.json uses, so the
// leads surface can carry it and a reader can act on it. Written on every run — including EMPTY when nothing is
// exposed, because "no file" and "nothing exposed" must not render alike, which is the defect this whole
// instrument exists to catch one level down.
const out = { why: 'Assumptions the running code makes that NO sealed theorem states. Each is a lead: seal it, and axiom-hunt reports it proven on the next run. Written by src/scripts/axiom-hunt.ts on every run, empty included — an absent file and an empty set are different facts.', exposed: exposedAxioms.length, held: exposedAxioms }
writeFileSync(join(ROOT, 'lean', 'exposed-axioms.json'), JSON.stringify(out, null, 1) + '\n')

if (exposed) {
  console.log(`⚠ axiom-hunt — ${exposed} axiom(s) in use with NO sealing theorem: seal each (add the fact to its domain generator, then npm run lean).`)
  console.log(`  filed to lean/exposed-axioms.json — a lead, not just a printed line.`)
} else console.log('✓ axiom-hunt — every assumption in the table is sealed: no axioms in use, the code stands on theorems.')
