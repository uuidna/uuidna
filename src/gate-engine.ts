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
// here. Integrity — the record recomputes for anyone — the gate judges the WORK (addresses, citations, bounds).
import { toUuid } from './address.js'
import { coinCensus, type CoinPayment } from './coin-ledger.js'
import { merkleGravity } from './gravity/index.js'
import { wireBytes, sealedBudget, type WireTool } from './mcp-wire.js'
import { sanitizeInput, sanitizeValue } from './sanitize.js'
import { slimGate } from './slimgate.js'
import { theoremByKey, theorems } from './theorems/index.js'
import { hexbitDoorOf, type HexbitDoor } from './hexbit/index.js'
import { channelAudit } from './hexagram.js'
import { runSequence, type DigitPolarity } from './sequence-run.js'
import { TRIAL_DIGIT_ANGLE } from './theorems/index.js'
import { encodeMessage, serializeMessage } from './quantum/message/index.js'

const WITNESS_CACHE = new Map<string, ReturnType<typeof serializeMessage>>()
const compactWitness = (receipt: string) => {
  let w = WITNESS_CACHE.get(receipt)
  if (!w) {
    w = serializeMessage(encodeMessage(receipt, 'crew_verifies_instantly'))
    WITNESS_CACHE.set(receipt, w)
  }
  return w
}

/** Derived witness — kept in sync with lean/messaging-witness.json (one-receipt messaging). */
export const MESSAGING_WITNESS = { total: true, keys: 2127, distinct: 2044 } as const

/** THE GATE'S SPEC IS READ OFF THE LEDGER. This was a hand-written list of six keys, and when the
 *  lexical honesty gate was folded away four of them left the ledger — so the gate went on publishing four
 *  fabricated citations with every verdict it served, and the list itself could not notice. A typed name cannot
 *  compute; it can only go stale. The spec is therefore SELECTED: every sealed theorem whose statement is about
 *  the gate's own algebra — the conjunction `cleanAudit` or the forgery detector `forged` that feeds it. Seal a
 *  new one and it joins the spec; rename one and nothing breaks, because no name is written down here. */
export const GATE_THEOREMS: readonly string[] = theorems()
  .filter((t) =>
    // the MECHANISM: the conjunction itself and the forgery detector that feeds it. The boundary clause that
    // stood beside this one selected the Clay wing's non-dz theorems, and there are none: the wing proved
    // reflections of an involution DivByZero already seals universally, so it was purged whole.
    t.file === 'AntiFraud.lean' && /\bcleanAudit\b|\bforged\b/.test(t.statement))
  .map((t) => t.key)
  .sort()

/** cleanAudit — the sealed conjunction gate, literally: (1−f)·(1−d)·(1−v) over the three violation bits. */
export const cleanAudit = (f: number, d: number, v: number): number => (1 - f) * (1 - d) * (1 - v)

export interface GateVerdict {
  input: 0 | 1        // f — sanitizing changed a plain-object input (adversarial shape)
  output: 0 | 1       // d — sanitizing had to repair the tool's output
  honesty: 0 | 1      // v — the output fabricates a theorem citation (slimGate)
  clean: boolean      // cleanAudit(f,d,v) === 1 — the conjunction verdict
  fabricated: string[] // the fabricated citations, named (the diagnosis
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
  // arguments object is the engine's documented courtesy.
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

// ── THE IMMEDIATE DEPOSIT — contribute first, then take, enforced by the PROTOCOL
// Every judged call IS a two-coin deposit to the captain wallet: the deposit statement cites the sealed coin
// theorems (captain_commission_two_coins: 110 − 108 = 2; two_coins), its id is the statement's own content-address
// (deterministic — the same call always deposits to the same id, exactly the /trials mechanic), and the deposit
// receipt folds the call, the gate verdict, and the sealed theorem addresses order-invariantly. An agent does not
// opt in: its very FIRST tools/call already carries the deposit in the response — the unified economy (reconcile
// cost + captain commission + governance weight, one coin) settled at the wire. Integrity
// is a recomputable RECORD of judged work.
export interface CoinDeposit { coins: 2; statement: string; id: string; theorems: string[]; receipt: string; honest: string }

/** depositCoins — mint the call's two-coin deposit from its op and its gate receipt. Pure and deterministic:
 *  the same judged call always deposits the same id. Cites only theorems actually sealed in the ledger. The
 *  honest demarcation travels IN the deposit (user-facing, both surfaces): a record. */
export function depositCoins(op: string, gateReceipt: string): CoinDeposit {
  const ledger = theoremByKey()
  const cited = ['captain_commission_two_coins', 'two_coins'].filter((k) => ledger.has(k))
  const statement = `Two coins deposited by the call ${op}: the work judged by the sealed gate (${gateReceipt}), proven by ${cited.map((k) => 'theorem ' + k).join(' and ')}.`
  const id = toUuid(statement)
  const receipt = merkleGravity([toUuid(op), gateReceipt, toUuid('coins:2'), ...cited.map((k) => ledger.get(k)!.address)])
  return { coins: 2, statement, id, theorems: cited, receipt, honest: 'a recomputable RECORD of judged work — no value is transferred; not a payment' }
}

// ── THE LEDGER LINE — the verdict, the deposit and the receipt as ONE model-visible row, defined ONCE for both
// served surfaces (stdio and the edge), because two hand-written envelopes are how two surfaces drift.
//
// An agent pays for this line in its context on EVERY call, so the line carries ids and nothing else. What is
// omitted is only what repeats and therefore informs nothing: the two deposit theorem keys are the same on every
// call (named once in each surface's INSTRUCTIONS, and still in _meta.deposit.theorems), and the referer is the
// PRIOR call's receipt, which the agent has already read (still in _meta). Every id needed to RECHECK the call —
// the gate receipt, the deposit id, the chained receipt and its seq — stays. Integrity
// recomputable record of judged work.
export const ledgerLine = (
  gate: Pick<GateVerdict, 'clean' | 'input' | 'output' | 'honesty' | 'receipt' | 'fabricated'>,
  dep: Pick<CoinDeposit, 'coins' | 'id'>,
  rec?: { receipt: string; seq: number },
): string =>
  `gate ${gate.clean ? 'CLEAN' : 'DRAINED'} f${gate.input} d${gate.output} v${gate.honesty} · ${gate.receipt}` +
  (gate.fabricated.length ? ' · fabricated: ' + gate.fabricated.join(', ') : '') +
  ` · deposit ${dep.coins} · ${dep.id}` +
  (rec ? ` · receipt ${rec.receipt} · seq ${rec.seq}` : '')

/** Compact Sequence walk on the gate receipt — seed, reflection, orbit, covers, fixed. The full runSequence
 *  object stays in the runner; the envelope carries what coordination needs. */
export interface EnvelopeSequence {
  seed: number
  reflection: number
  orbit: number[]
  covers: boolean
  fixed: boolean
  polarity: DigitPolarity
  spin: number
  angle: number
}

/** THE COORDINATED ENVELOPE — the fusion: hexbitDoorOf IS the identity, compact crew_verifies_instantly witness,
 *  compact runSequence. Defined ONCE for both served surfaces so multi-agent sessions read the same shape whether
 *  they speak stdio or the edge. Instant coordination is O(1) order-invariant recompute, not wall-clock zero,
 *  not QKD. stdio chains receipt · seq · referer; the edge is stateless and omits the chain (named, not silent). */
export interface MessagingEnvelope extends HexbitDoor {
  surface: 'stdio' | 'edge'
  gate: Pick<GateVerdict, 'clean' | 'input' | 'output' | 'honesty' | 'receipt' | 'fabricated'>
  deposit: Pick<CoinDeposit, 'coins' | 'id' | 'receipt' | 'honest'>
  witness: ReturnType<typeof serializeMessage>
  sequence: EnvelopeSequence
  /** 8-4-4-4-12 channel slice of the gate receipt — handle, trinities, tail; payload store optional. */
  channel: ReturnType<typeof channelAudit>
  receipt?: { receipt: string; seq: number; referer: string; tool: string }
  ledger: string
  honest: string
}

export function messagingEnvelope(opts: {
  surface: 'stdio' | 'edge'
  gate: GateVerdict
  deposit: CoinDeposit
  hexbits?: readonly number[]
  receipt?: { receipt: string; seq: number; referer: string; tool: string }
}): MessagingEnvelope {
  const { gate, deposit, receipt, surface } = opts
  const door = hexbitDoorOf(gate.receipt)
  const walked = runSequence(gate.receipt)
  const witness = compactWitness(gate.receipt)
  const ledger = ledgerLine(gate, deposit, receipt ? { receipt: receipt.receipt, seq: receipt.seq } : undefined)
  return {
    surface,
    gate: { clean: gate.clean, input: gate.input, output: gate.output, honesty: gate.honesty, receipt: gate.receipt, fabricated: gate.fabricated },
    deposit: { coins: deposit.coins, id: deposit.id, receipt: deposit.receipt, honest: deposit.honest },
    ...door,
    witness,
    sequence: {
      seed: walked.seed,
      reflection: walked.reflection,
      orbit: walked.orbit,
      covers: walked.covers,
      fixed: walked.fixed,
      polarity: walked.polarity,
      spin: walked.period,
      angle: (walked.seed * TRIAL_DIGIT_ANGLE) % 360,
    },
    channel: channelAudit(gate.receipt),
    ...(receipt ? { receipt } : {}),
    ledger,
    honest: surface === 'stdio'
      ? 'two content blocks — answer then ledger line — with a chained session receipt in _meta.messaging.receipt; hexbits ARE the door (hexbitDoorOf); witness is crew_verifies_instantly (O(1), order-invariant)'
      : 'two content blocks — answer then ledger line — stateless edge: no session chain; coin account is per-isolate (uuidna_coin_ledger reports census state); hexbits ARE the door; witness is crew_verifies_instantly',
  }
}

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

export interface GateMessagingOpts {
  surface: 'stdio' | 'edge'
  wireTools: readonly WireTool[]
  payments?: readonly CoinPayment[]
  receiptSeq?: number
  receiptTip?: string
  agent?: string
}

/** gateStatus — gateSelfTest plus optional coordinated messaging health ({messaging:true} on uuidna_gate_status). */
export function gateStatus(toolNames: readonly string[], messaging?: GateMessagingOpts) {
  const base = gateSelfTest(toolNames)
  if (!messaging) return base
  const census = coinCensus(messaging.payments ?? [])
  // ── ONE LAW, ONE IMPLEMENTATION (2026-09-01) ──────────────────────────────────────────────────────────────
  //
  // This compared the wire against a frozen byte TOTAL while the guard's context finder had already moved to a
  // RATE — bytes per tool — and the two disagreed the moment a genuinely new tool landed: the guard passed and
  // this reported healthy:false for the same surface. Two implementations of one rule is the drift the tree
  // refuses everywhere else, and here it had the sharper cost of making a self-audit contradict a gate.
  //
  // The rate is the law: a frozen total punishes CAPABILITY and cannot see DENSITY. Adding a tool raises the
  // allowance lawfully; padding a description raises the rate and fails. The total is still reported, because a
  // reader wants to know what the wire actually costs — it is simply no longer the thing being judged.
  const bytes = wireBytes(messaging.wireTools)
  const sealed = sealedBudget()
  const tools = messaging.wireTools.length
  const rate = tools > 0 ? Number((BigInt(bytes) * 100n) / BigInt(tools)) : 0
  const rateCeiling = sealed?.perToolHundredths ?? null
  const ceiling = sealed?.wireBytes ?? null
  const headroom = rateCeiling === null ? null : rateCeiling - rate
  const withinBudget = rateCeiling !== null && rate <= rateCeiling
  const healthy = base.matchesSealedSpec && MESSAGING_WITNESS.total && withinBudget
  return {
    ...base,
    healthy,
    messaging: MESSAGING_WITNESS,
    context: { wireBytes: bytes, tools, perToolHundredths: rate, rateCeiling, ceiling, headroom, withinBudget },
    session: {
      surface: messaging.surface,
      payments: census.payments,
      censusState: census.state,
      ...(messaging.receiptSeq !== undefined ? { receiptSeq: messaging.receiptSeq } : {}),
      ...(messaging.receiptTip !== undefined ? { receiptTip: messaging.receiptTip } : {}),
      ...(messaging.agent !== undefined ? { agent: messaging.agent } : {}),
    },
    coordinate: { envelope: '_meta.messaging' as const, contentBlocks: 2, ledgerInMeta: true },
    messagingReceipt: merkleGravity([toUuid('gate-status:' + messaging.surface), base.receipt, toUuid('messaging:' + MESSAGING_WITNESS.total), toUuid('wire:' + bytes), census.receipt]),
    honest: 'recomputable health — poll uuidna_gate_status {messaging:true}; pair with uuidna_coin_ledger for WHO paid',
  }
}
