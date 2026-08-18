#!/usr/bin/env node
// axiom-hunt — FIND THE AXIOMS IN USE. The Lean ledger is already axiom-free (lean-axioms: trust base ∅ — no axiom
// beyond the kernel); this hunts the OTHER axioms: the constants and bounds the library ASSUMES at runtime. Each
// candidate binds a LIVE code constant (imported, not copied) to the sealed theorem KEY that proves its decidable
// core — never a loose substring match, which "covers" by digit coincidence. Three states: PROVEN (predicate true,
// key sealed), EXPOSED AXIOM (predicate true, no sealing theorem — the research lead to seal next), REFUTED
// (predicate false — the code disagrees with its own assumption: a traitor, exit 1). Integrity, not truth.
import {
  theoremByKey, ITER, MAX_ITER, NONCE_BYTES, SALT_BYTES, MAX_LAYERS, ADDRESS_BITS, A432_STEP, CAPACITY,
  MAX_DEPTH, MAX_STRING, MAX_ARRAY, MAX_KEYS,
} from '../index.js'
import { MAX_MESSAGE_QUBITS } from '../quantum/message/index.js'

type Candidate = { key: string; assumes: string; where: string; live: () => boolean }
const CANDIDATES: Candidate[] = [
  { key: 'kdf_cost_bounded', assumes: 'ITER = 600000 (OWASP 2023), positive, within the DoS guard MAX_ITER = 10000000', where: 'src/crypt.ts', live: () => ITER === 600000 && 0 < ITER && ITER <= MAX_ITER },
  { key: 'aead_nonce_and_salt_bits', assumes: 'the nonce is NONCE_BYTES=12 B = 96 bits (RFC 8439), the salt SALT_BYTES=16 B = 128 bits, nonce strictly inside the address width', where: 'src/crypt.ts', live: () => NONCE_BYTES === 12 && SALT_BYTES === 16 && NONCE_BYTES * 8 === 96 && SALT_BYTES * 8 === 128 && NONCE_BYTES * 8 < ADDRESS_BITS },
  { key: 'onion_layers_power_of_two', assumes: 'MAX_LAYERS = 16 = 2^4, at most the 128 address bits', where: 'src/stream.ts', live: () => MAX_LAYERS === 16 && 16 === 2 ** 4 && MAX_LAYERS <= ADDRESS_BITS },
  { key: 'imprint_capacity_within_address', assumes: 'CAPACITY = 115 < 128 — the imprint fits strictly inside its address, 13 bits of seam', where: 'src/imprint.ts', live: () => CAPACITY === 115 && CAPACITY < ADDRESS_BITS },
  { key: 'message_qubit_cap_states', assumes: 'MAX_MESSAGE_QUBITS = 16 spans 2^16 = 65536 states — the tractable ceiling', where: 'src/quantum/message/index.ts', live: () => MAX_MESSAGE_QUBITS === 16 && 2 ** MAX_MESSAGE_QUBITS === 65536 },
  { key: 'aura_step_divides_circle', assumes: 'A432_STEP = 40 and 9 · 40 = 360 — the nine residues tile the wheel with no remainder', where: 'src/aura.ts', live: () => A432_STEP === 40 && 9 * A432_STEP === 360 },
  { key: 'sanitize_depth_bounded', assumes: 'MAX_DEPTH = 32 = 2^5 — the finite wall the resource-DoS audit stands on', where: 'src/sanitize.ts', live: () => MAX_DEPTH === 32 && 32 === 2 ** 5 },
  { key: 'sanitize_max_depth_is_two_pow_five', assumes: 'MAX_DEPTH = 32 = 2^5 (the Sanitize.lean restatement of sanitize_depth_bounded)', where: 'src/sanitize.ts', live: () => MAX_DEPTH === 32 && 32 === 2 ** 5 },
  { key: 'sanitize_max_string_is_ten_pow_six', assumes: 'MAX_STRING = 1000000 = 10^6 — every string truncates at this bound', where: 'src/sanitize.ts', live: () => MAX_STRING === 1_000_000 && MAX_STRING === 10 ** 6 },
  { key: 'sanitize_array_and_keys_are_ten_pow_five', assumes: 'MAX_ARRAY = MAX_KEYS = 100000 = 10^5 — arrays and object keys share one bound', where: 'src/sanitize.ts', live: () => MAX_ARRAY === 100_000 && MAX_KEYS === 100_000 && MAX_ARRAY === 10 ** 5 },
]

let exposed = 0
let refuted = 0
console.log('axiom-hunt — the assumptions the code runs on, each bound to its sealing theorem by KEY:')
for (const c of CANDIDATES) {
  const ok = c.live()
  const t = ok ? theoremByKey().get(c.key) : undefined
  const state = !ok ? '✗ REFUTED     ' : t ? '✓ proven      ' : '⚠ EXPOSED AXIOM'
  if (!ok) refuted++
  else if (!t) exposed++
  console.log(`  ${state} ${c.key} — ${c.assumes} (${c.where})`)
}
if (refuted) {
  console.error(`✗ axiom-hunt — ${refuted} assumption(s) REFUTED: the code disagrees with what it assumes. Fix the source, never the predicate.`)
  process.exit(1)
}
if (exposed) console.log(`⚠ axiom-hunt — ${exposed} axiom(s) in use with NO sealing theorem: seal each (add the fact to its domain generator, then npm run lean).`)
else console.log('✓ axiom-hunt — every assumption in the table is sealed: no axioms in use, the code stands on theorems.')
