// gate-engine — THE GATED DISPATCH CORE, from scratch: no tool result leaves the served surface without passing
// the conjunction gate the ledger seals. The pipeline IS the sealed spec (lean/AntiFraud.lean): the verdict is
// cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v) over three violation bits — f the INPUT bit (sanitizing changed a plain-
// object input: poison keys, BIDI points, bounds — Sanitize.lean), d the OUTPUT bit (the tool produced non-JSON-
// safe / unbounded output the sanitizer had to repair), v the HONESTY bit (the output fabricates a theorem
// citation — slimGate, the gate of all gates). Clean at EXACTLY the no-violation state (sealed:
// anti_fraud_check_deterministic — the fixed verdict table [1,0,0,0,0,0,0,0]), one flag drains all (sealed:
// conformance_failure_detects_intrusion), and the implementation equals its boolean spec (sealed:
// honesty_gate_is_theorem_not_oracle) — recomputed live by gateSelfTest, so the runtime gate can never drift from
// the sealed theorem without failing its own status tool. Every verdict folds to an ORDER-INVARIANT receipt
// (merkleGravity — the quantum receipt, the same for any observer ordering), and the registry itself folds to one
// receipt (the server's identity — the same for any tool ordering). PURE and harmonic: no I/O, no clock, no RNG;
// the stdio host (mcp.ts) is the named non-harmonic boundary that awaits the tool, then hands the settled output
// here. Integrity, not truth — the gate judges the WORK (addresses, citations, bounds), never intention.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { sanitizeInput, sanitizeValue } from './sanitize.js'
import { slimGate } from './slimgate.js'

/** The sealed theorems this pipeline implements — the spec is in the ledger, the gate recomputes it. */
export const GATE_THEOREMS = [
  'anti_fraud_check_deterministic',        // the verdict table is fixed: [1,0,0,0,0,0,0,0] — same input, same verdict, for anyone
  'honesty_gate_passes_iff_all_sealed',    // clean at exactly the no-violation state
  'conformance_failure_detects_intrusion', // one raised flag drains the whole audit — no partial credit
  'honesty_gate_is_theorem_not_oracle',    // the implementation equals its boolean spec — no oracle
  'overclaim_with_fake_cite_fails',        // a fabricated citation drains the audit
  'sealed_theorem_not_forged',             // a true seal never flags — the gate accuses no honest tool
] as const

/** cleanAudit — the sealed conjunction gate, literally: (1−f)·(1−d)·(1−v) over the three violation bits. */
export const cleanAudit = (f: number, d: number, v: number): number => (1 - f) * (1 - d) * (1 - v)

export interface GateVerdict {
  input: 0 | 1        // f — sanitizing changed a plain-object input (adversarial shape)
  output: 0 | 1       // d — sanitizing had to repair the tool's output
  honesty: 0 | 1      // v — the output fabricates a theorem citation (slimGate)
  clean: boolean      // cleanAudit(f,d,v) === 1 — the conjunction verdict
  fabricated: string[] // the fabricated citations, named (the diagnosis, never a judgment)
  receipt: string     // order-invariant fold of (op, input, output, verdict) — the quantum receipt
  cites: readonly string[] // the sealed theorems the verdict stands on
}

export interface GatedRun { op: string; input: Record<string, unknown>; output: unknown; gate: GateVerdict }

const addressOf = (v: unknown): string => toUuid(JSON.stringify(v) ?? 'null')
const isPlainObject = (v: unknown): boolean => typeof v === 'object' && v !== null && !Array.isArray(v)

/** gateVerdict — judge ONE settled tool run: the pure gate the host calls after awaiting the tool. Returns the
 *  sanitized output (what the server serves) and the conjunction verdict with its order-invariant receipt.
 *  Draining is a DIAGNOSIS: the output still ships (sanitized), flagged, with the violating bits named. */
export function gateVerdict(op: string, rawInput: unknown, rawOutput: unknown): GatedRun {
  const input = sanitizeInput(rawInput)
  // f — only a PLAIN-OBJECT input that sanitizing CHANGED is a violation; normalizing null/string/array into an
  // arguments object is the engine's documented courtesy, not an attack.
  const f: 0 | 1 = isPlainObject(rawInput) && addressOf(input) !== addressOf(rawInput) ? 1 : 0
  const output = sanitizeValue(rawOutput) ?? null
  const d: 0 | 1 = rawOutput !== undefined && addressOf(output) !== addressOf(rawOutput) ? 1 : 0
  // v — the honesty bit: slimGate scans the served text; ONLY a fabricated theorem citation drains (the folded
  // gate law). A result citing no theorem passes vacuously; a result citing sealed theorems passes verified.
  const served = typeof output === 'string' ? output : JSON.stringify(output)
  const gate = slimGate(served)
  const v: 0 | 1 = gate.fabricated.length > 0 ? 1 : 0
  const clean = cleanAudit(f, d, v) === 1
  const receipt = merkleGravity([toUuid('op:' + op), addressOf(input), addressOf(output), toUuid('gate:' + f + d + v)])
  return { op, input, output, gate: { input: f, output: d, honesty: v, clean, fabricated: gate.fabricated, receipt, cites: GATE_THEOREMS } }
}

/** registryReceipt — the server's identity: the ORDER-INVARIANT fold of every tool name's address. The same
 *  receipt for any tool ordering (the quantum registry); adding, removing, or renaming one tool moves it. */
export const registryReceipt = (names: readonly string[]): string => merkleGravity(names.map((n) => toUuid(n)))

export interface GateSelfTest {
  table: number[]            // the live verdict table over the eight (f,d,v) states
  sealedTable: number[]      // the sealed expectation — [1,0,0,0,0,0,0,0] (anti_fraud_check_deterministic)
  matchesSealedSpec: boolean // live table === sealed table AND === the boolean spec (honesty_gate_is_theorem_not_oracle)
  cleanStates: number        // exactly 1 (honesty_gate_passes_iff_all_sealed)
  drainedStates: number      // exactly 7 (conformance_failure_detects_intrusion)
  tools: number
  registry: string           // the order-invariant registry receipt — the server's identity
  cites: readonly string[]
  receipt: string
}

/** gateSelfTest — the gate proves ITSELF against the sealed spec, live: recompute the eight-state verdict table
 *  and require it equals both the sealed table and the boolean spec. The runtime cannot drift from the theorem
 *  without this returning matchesSealedSpec: false — the enforcement enforcing itself. */
export function gateSelfTest(toolNames: readonly string[]): GateSelfTest {
  const bits = (n: number): [number, number, number] => [n & 1, (n >> 1) & 1, (n >> 2) & 1]
  const table = Array.from({ length: 8 }, (_, n) => { const [f, d, v] = bits(n); return cleanAudit(f, d, v) })
  const sealedTable = [1, 0, 0, 0, 0, 0, 0, 0]
  const spec = Array.from({ length: 8 }, (_, n) => { const [f, d, v] = bits(n); return f === 0 && d === 0 && v === 0 ? 1 : 0 })
  const matchesSealedSpec = table.every((x, i) => x === sealedTable[i] && x === spec[i])
  const cleanStates = table.filter((x) => x === 1).length
  const registry = registryReceipt(toolNames)
  const receipt = merkleGravity([toUuid('gate-selftest:' + table.join('')), registry, ...GATE_THEOREMS.map((k) => toUuid(k))])
  return { table, sealedTable, matchesSealedSpec, cleanStates, drainedStates: 8 - cleanStates, tools: toolNames.length, registry, cites: GATE_THEOREMS, receipt }
}
