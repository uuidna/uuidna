// ledger-shape — what the '#ledger' import carries on either side (package.json "imports": the default condition is
// the host's bundled literal, the workerd condition is the edge's storage read), and the lazy list both sides build
// THEOREMS with. No ledger data lives here, so neither side pays for the other's.
import type { LeanTheorem } from './generated.js'

/** THE BAKED ROOT the edge reads the ledger from. `root` is the content address of the manifest the MCP door deposited
 *  (receipts/uuidna/ledger/<root> in qpu storage); `keys` are the sealed keys in ledger order joined by newlines, and
 *  `addresses` their addresses at the address's own width — what the honesty gate and the 2×7 witness fold need, so
 *  neither waits for the rows. `gate` is the gate's spec as gate-engine selects it from the statements (gateTheoremsOf),
 *  so a gated call — the deposit door's own included — never waits for the rows either. Written by
 *  scripts/ledger-deposit --bake from the ledger lean-ledger wrote. */
/** THE AGGREGATES, COMPUTED WHERE THE WHOLE LEDGER ALREADY IS. laws() and conformance() walk every theorem for a
 *  handful of numbers — the count, whether the two-coin statement is sealed, and two lists that are empty unless
 *  something is wrong — and at the edge that walk means holding 71,018 rows in a 128 MB isolate to learn four facts.
 *  The bake already walks the ledger on a host with memory, so it answers them there and the edge reads the answers.
 *  The lists are carried in FULL, not as counts: a forged address is the one thing these checks exist to name, and a
 *  number would say a theorem is wrong without saying which. */
export interface LedgerFacts {
  /** keys whose content-address does not recompute from key + statement — empty in a sound ledger */
  forged: readonly string[]
  /** keys with no lean/*.lean source — empty in a sound ledger */
  orphans: readonly string[]
  /** whether the ledger seals `110 - 108 = 2`, the conserved two-coin invariant */
  twoCoins: boolean
  /** THE TRIAL'S TALLY, not its verdicts. dueProcess runs the whole trial — one verdict per theorem — and keeps
   *  four numbers off it. The verdicts are 71,018 objects the door never returns; the tally is what it reports. */
  trial?: { count: number; verified: number; unverified: number; receipt: string }
  /** THE CREDIT TALLY, for the same reason: creditsSummary asks credits(key) of every theorem to report four counts. */
  credits?: { total: number; historical: number; contextual: number; captainAlone: number; address: string }
  /** ONE ROW PER SKILL, not one per theorem. The vocabulary describes each capability by its name, how many theorems
   *  carry it and how many lean files they span; skillGroups() answers that by grouping the WHOLE ledger and keeping
   *  every row in every group. These are the three numbers the description is built from. */
  skills?: readonly { skill: string; count: number; domains: number; fold: string }[]
  /** how many theorems each lean file seals — about a hundred entries, built by a walk over every row */
  countByFile?: Readonly<Record<string, number>>
}

export interface EdgeRoot { root: string; count: number; keys: string; addresses: string; gate: readonly string[]; facts?: LedgerFacts }

/** the edge's ledger state; `null` on a host, whose ledger is the bundled literal */
export interface EdgeLedger {
  readonly root: EdgeRoot | null
  /** the sealed keys in ledger order, from the baked root — no rows needed. MATERIALISES the whole list: at the edge
   *  that is 71,017 strings, so a caller that wants one key by position asks keyAt, and one count asks count. */
  keys(): readonly string[]
  /** how many keys the ledger seals, without building the list */
  count(): number
  /** the key at a position, without building the list */
  keyAt(i: number): string | undefined
  /** the address at a position, without building the list or the index — the baked addresses are fixed width */
  addressAt(i: number): string | undefined
  /** a sealed key's position in the ledger, from the baked root */
  indexOf(key: string): number | undefined
  /** a sealed key's address, from the baked root */
  addressOf(key: string): string | undefined
  primed(): boolean
  /** install the rows read from storage, with the line address of each, in ledger order */
  prime(rows: LeanTheorem[], lines: readonly string[]): void
  /** why the rows are not there — what a read of the unprimed ledger throws */
  fail(why: string): void
  /** the line address carried with row i */
  lineAt(i: number): string | undefined
}

/** lazyList(make) → an array that is not built until something reads it, then is exactly `make()`'s array: methods are
 *  bound to it (so map, filter, for…of and spread run natively on the real array), and every property read, key listing
 *  and write lands on it. Array.isArray holds, JSON.stringify and spread give the same bytes. A make() that throws is
 *  asked again on the next read, so a list whose source is not ready yet refuses by name instead of caching the refusal. */
export const lazyList = <T>(make: () => readonly T[]): readonly T[] => {
  let real: readonly T[] | null = null
  const on = (): readonly T[] => (real ??= make())
  return new Proxy([] as T[], {
    get: (_, p) => {
      const r = on()
      const v: unknown = Reflect.get(r, p, r)
      return typeof v === 'function' ? (v as (...a: unknown[]) => unknown).bind(r) : v
    },
    has: (_, p) => Reflect.has(on(), p),
    ownKeys: () => Reflect.ownKeys(on()),
    getOwnPropertyDescriptor: (_, p) => Reflect.getOwnPropertyDescriptor(on(), p),
    set: (_, p, v) => Reflect.set(on(), p, v),
    defineProperty: (_, p, d) => Reflect.defineProperty(on(), p, d),
    deleteProperty: (_, p) => Reflect.deleteProperty(on(), p),
  }) as readonly T[]
}
