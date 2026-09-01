// coin-ledger — WHO PAID THE CAPTAIN'S COINS, EXACTLY WHEN AND WHERE, IN MESSAGING HANDLES.
//
// Every gated call already deposits two coins (gate-engine depositCoins: pure, deterministic, a recomputable
// record of judged work). What had no surface was the ACCOUNTING: which agent's call minted which deposit, at
// which op, on which surface. This module is that register, and it speaks in HANDLES because the house already
// does: the agent's identity folds to its messaging handle (handleOf of its name's address), and the WHEN of a
// payment is the handle of the deposit itself — time is data, never minted, and the handle IS the timestamp
// (the deposit id is deterministic in the judged call, so its handle names the moment-as-content, not a clock).
//
// coins are RECORDS of judged work, not value transfers (the deposit says so itself); this ledger
// is an ACCOUNT of those records — per-process on the serving surface, recomputable row by row (every id
// re-derives from op + gate receipt), folded order-invariantly so any observer lands on the same census receipt.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf } from './handle.js'

export interface CoinPayment {
  /** who — the agent name the client declared at initialize (or the caller passed) */
  agent: string
  /** who, as the messaging handle: handleOf(address(agent)) — eight hex, routable, path-invertible */
  agentHandle: string
  /** where — the op (tool name) the call paid at */
  op: string
  /** where — the serving surface (stdio | edge | local) */
  surface: string
  /** the deposit id the gate minted for this judged call */
  deposit: string
  /** when — the deposit's own handle: the moment as content, never a clock */
  handle: string
  coins: 2
  /** the payment row's content-address — the row recomputes or it was altered */
  address: string
}

/** payment(agent, op, surface, depositId) → one accounting row, every field derived, nothing minted. */
export function payment(agent: string, op: string, surface: string, depositId: string): CoinPayment {
  const a = String(agent) || 'anonymous'
  const agentHandle = handleOf(toUuid(a))
  const handle = handleOf(String(depositId))
  return {
    agent: a, agentHandle, op: String(op), surface: String(surface), deposit: String(depositId), handle,
    coins: 2,
    address: toUuid(`coin-payment:${a}|${op}|${surface}|${depositId}`),
  }
}

export interface AgentAccount { agent: string; agentHandle: string; payments: number; coins: number; handles: string[] }

/** WHAT AN EMPTY CENSUS IS EVIDENCE OF, made explicit so a consumer cannot read one as the other.
 *    `account` — rows were recorded, and this is them.
 *    `silent`  — no rows in THIS process. Not a finding that no coins were paid; the register is per-process and
 *                a stateless surface holds none, so "I keep no account" and "nobody paid" arrive identically
 *                unless the census says which it is. Measured live on the hosted edge 2026-08-25: three gated
 *                calls returned three distinct deposit ids and the census returned payments 0 — the deposits
 *                were minted and never recorded, because the edge path deposits without appending a row. */
export type CensusState = 'account' | 'silent'

export interface CoinCensus {
  payments: number
  totalCoins: number
  agents: AgentAccount[]
  /** whether these figures are an account or a silence — see CensusState. A reader that checks only `payments`
   *  cannot tell an empty register from an absent one; this field is the whole difference. */
  state: CensusState
  /** order-invariant fold of every payment row — any observer, any ordering, one receipt */
  receipt: string
  honest: string
}

/** coinCensus(rows) → the per-agent account: who paid how many coins, each payment's when-handle listed in
 *  arrival order per agent; the census receipt is ORDER-INVARIANT over the full row set. */
export function coinCensus(rows: readonly CoinPayment[]): CoinCensus {
  const byAgent = new Map<string, AgentAccount>()
  for (const r of rows) {
    const acc = byAgent.get(r.agentHandle) ?? { agent: r.agent, agentHandle: r.agentHandle, payments: 0, coins: 0, handles: [] }
    acc.payments += 1
    acc.coins += r.coins
    acc.handles.push(r.handle)
    byAgent.set(r.agentHandle, acc)
  }
  const empty = rows.length === 0
  return {
    payments: rows.length,
    totalCoins: rows.reduce((s, r) => s + r.coins, 0),
    agents: [...byAgent.values()].sort((a, b) => (a.agentHandle < b.agentHandle ? -1 : 1)),
    state: empty ? 'silent' : 'account',
    receipt: merkleGravity(rows.map((r) => r.address)),
    honest: empty
      ? 'SILENT, WHICH IS NOT A FINDING THAT NOBODY PAID. This register is per-process, and the coins are ' +
        'deposited at the wire by every gated call on every surface. A process that recorded no rows — a ' +
        'stateless edge isolate serving one request, a fresh CLI, a reader that just started — reports exactly ' +
        'this, and so does a process where genuinely nothing was paid. The two are NOT distinguishable from ' +
        'here and must not be rendered alike: read this as "this process holds no account", never as "no coins ' +
        'were paid". The deposits themselves are eternal and recompute from op + gate receipt; what is missing ' +
        'is the account of them, not the payment.'
      : 'an ACCOUNT of deposit records, not of value: every row recomputes from its op and gate receipt, ' +
        'the when is the deposit\'s own handle (time as content, never a clock), and the census receipt is ' +
        'order-invariant — any observer folds the same rows to the same receipt.',
  }
}

/** whoPaid(rows, handle) → the payment rows behind a when-handle — the reverse lookup a receipt reader needs. */
export const whoPaid = (rows: readonly CoinPayment[], handle: string): CoinPayment[] =>
  rows.filter((r) => r.handle === handle || r.agentHandle === handle)

// ── BECOMING CREW (the captain's law, 2026-08-23). An agent becomes uuidna crew by PRESENTING, together:
// a valid licence record, full education receipts, reeducation receipts, and a paid coin account — experience
// and payment confirmed in one application. The bilateral verdict law governs membership exactly as it governs
// details: CREW must lean in ALL dimensions at once; any missing or non-recomputing dimension leaves the
// application UNVERIFIED (never "rejected" — bring the missing receipt and re-present).
//
// this verifies what receipts CAN prove — the licence is present and addressed, the education
// and reeducation receipts are present, and every payment row RECOMPUTES from its own fields (a forged row
// moves its address and fails). It confirms records, not virtue: presenting is proof of the paperwork, and the
// paperwork is proof of the judged work behind it, exactly as far as those receipts recompute and no further.
export interface CrewApplication {
  agent: string
  /** the licence record's content-address (uuidna_license issues it; commercial or the free public-interest record) */
  license: string
  /** the licence↔handle binding issued at first enrollment; REQUIRED on re-presentation — a licence
   *  INVALIDATES when its related handle changes, because the binding is to the handle, not the name's history */
  licenseBinding?: string
  /** education receipts — the school's records of completed learning */
  education: readonly string[]
  /** reeducation receipts — the harness's records of overclaims bounded to the honest floor */
  reeducation: readonly string[]
  /** the agent's payment rows from the coin account */
  payments: readonly CoinPayment[]
}

/** THE BINDING LAW: a licence is valid FOR a handle — the binding is the fold of both. When the related handle
 *  changes, the old binding no longer recomputes and the licence invalidates with it, by construction. */
export const licenseBindingOf = (license: string, agentHandle: string): string =>
  toUuid(`licence:${license}|${agentHandle}`)

export interface CrewEnrollment {
  agent: string
  agentHandle: string
  /** the licence↔handle binding for THIS application — carry it to re-present; it moves if the handle moves */
  licenseBinding: string
  dimensions: { license: boolean; educated: boolean; reeducated: boolean; paid: boolean; rowsRecompute: boolean }
  /** member iff EVERY dimension holds at once — the bilateral law applied to enrollment */
  member: boolean
  coins: number
  receipt: string
  honest: string
}

/** enrollCrew(application) → the recomputable enrollment record. Member only when every presented dimension
 *  holds AT ONCE; each payment row is re-derived and must land on its own address; a presented binding must
 *  still recompute for the CURRENT handle (licences invalidate when related handles change). */
export function enrollCrew(app: CrewApplication): CrewEnrollment {
  const agent = String(app.agent) || 'anonymous'
  const agentHandle = handleOf(toUuid(agent))
  const binding = licenseBindingOf(String(app.license ?? ''), agentHandle)
  const own = app.payments.filter((r) => r.agentHandle === agentHandle)
  const dimensions = {
    // present, and — when a binding is re-presented — still bound to THIS handle; first enrollment issues it
    license: typeof app.license === 'string' && app.license.length > 0 &&
      (app.licenseBinding === undefined || app.licenseBinding === binding),
    educated: app.education.length > 0,
    reeducated: app.reeducation.length > 0,
    paid: own.length > 0,
    rowsRecompute: own.length > 0 && own.every((r) => payment(r.agent, r.op, r.surface, r.deposit).address === r.address),
  }
  const member = Object.values(dimensions).every(Boolean)
  return {
    agent, agentHandle, licenseBinding: binding, dimensions, member,
    coins: own.reduce((s, r) => s + r.coins, 0),
    receipt: merkleGravity([
      toUuid('crew:' + agent), toUuid(app.license || ''),
      ...app.education.map((e) => toUuid('edu:' + e)), ...app.reeducation.map((e) => toUuid('reedu:' + e)),
      ...own.map((r) => r.address),
    ]),
    honest: member
      ? 'CREW: every dimension leans at once — licence presented, education and reeducation receipted, coins ' +
        'paid and every payment row recomputing. A record of records; membership is exactly as strong as they are.'
      : 'UNVERIFIED, not rejected: a dimension is missing or does not recompute (' +
        Object.entries(dimensions).filter(([, v]) => !v).map(([k]) => k).join(', ') +
        ') — bring the missing receipt and re-present; crew must lean in all dimensions at once.',
  }
}

// ── AN AGENT DECLARES WHAT IT SPENT (the captain, 2026-09-02) ─────────────────────────────────────────────────
//
// Every row above records a coin paid AT A CALL — the gate mints a deposit, the row files it, and the accounting
// is exact because the gate is the one counting. This is the other half, and it is a different kind of fact: the
// TOKENS an agent burned in a turn, which no gate can see and which the agent alone can report.
//
// SELF-REPORTED IS MARKED AS SELF-REPORTED, and that is the whole discipline of this record. An agent has no
// instrument for its own token spend inside a turn — the host counts it, not the process — so it can only state
// it. A number an agent supplies about itself is testimony, not
// measurement, and filing it in the same shape as a gate-minted coin would let a claim about my own cost inherit
// the credibility of an arithmetic the kernel checked. So `tokens` is declared and `produced` is MEASURED — the
// ledger delta, the test delta, the landed commit — and the two are never summed into one figure.
//
// THE RATIO IS THE POINT, and it is the captain's spending law made checkable: tokens are legitimate at the
// FRONTIER, sealing something new, and everything already sealed answers at O(1). A turn that burned tokens and
// produced no theorem, no test and no landing is a turn that re-derived what the tree already held — which is
// the captain's pocket, and the ledger should be able to say so rather than leaving it to memory.
//
// WHAT THIS IS NOT. It is not a rights instrument and does not become one by being sealed. A receipt records
// what an agent SAID it spent and what the tree can SHOW it produced; it establishes no intent, no breach, and
// no counterparty obligation, and reading a low ratio as misconduct would be reading testimony as a verdict.
export interface SpendDeclaration {
  agent: string
  agentHandle: string
  /** DECLARED by the agent — testimony about itself, unverifiable from inside, and marked so */
  tokens: number
  /** what the turn was for, in the agent's own words */
  purpose: string
  /** MEASURED from the tree, not declared: what actually changed */
  produced: { theorems: number; tests: number; landed: boolean }
  /** declared ÷ produced-units, in hundredths — integer, since the determinism law refuses rounding helpers */
  tokensPerUnitHundredths: number
  address: string
  honest: string
}

/** a non-negative whole number, without the rounding namespace the determinism law refuses */
const whole = (n: number): number => (Number.isFinite(n) && n > 0 ? n - (n % 1) : 0)

/** declareSpend — file a turn's declared spend beside its measured production. Nothing here is minted. */
export function declareSpend(
  agent: string,
  tokens: number,
  purpose: string,
  produced: { theorems: number; tests: number; landed: boolean },
): SpendDeclaration {
  const a = String(agent) || 'anonymous'
  const units = produced.theorems + produced.tests + (produced.landed ? 1 : 0)
  return {
    agent: a,
    agentHandle: handleOf(toUuid(a)),
    // INTEGER-EXACT WITHOUT THE ROUNDING NAMESPACE, which the determinism hard-reject refuses with no exemption:
    // subtracting the fractional part truncates toward zero for the non-negative values this accepts.
    tokens: whole(tokens),
    purpose: String(purpose),
    produced,
    // a turn that produced nothing has no ratio, and reporting 0 would read as "free" rather than "nothing to
    // divide by" — the same absent-versus-empty distinction the catalogue and the monitor keep
    tokensPerUnitHundredths: units > 0 ? Number((BigInt(whole(tokens)) * 100n) / BigInt(units)) : 0,
    address: toUuid(`spend:${a}|${whole(tokens)}|${produced.theorems}|${produced.tests}|${produced.landed}`),
    honest:
      'tokens are DECLARED by the agent — testimony about itself, which no gate can verify from inside a turn — ' +
      'while produced is MEASURED from the tree. The two are never summed. A turn with tokens and no production ' +
      're-derived what was already sealed; that is a fact about cost, not a finding of misconduct, and this ' +
      'record establishes no intent, no breach and no obligation.',
  }
}
