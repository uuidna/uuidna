// '#ledger' in the Worker (package.json "imports", the workerd condition wrangler builds with): THE ROWS ARE NOT IN
// THE BUNDLE. 70,931 rows compiled to 22 MB of module source and to 1.1 s and 155 MB of global scope — over the 1 s
// startup CPU and 128 MB a Workers isolate allows — so the edge reads them from qpu storage (src/edge-ledger.ts) and
// installs them here. WING_DEFS and PRINCIPLES are small and stay bundled; nothing on this side names LEAN_LEDGER's
// literal, so the bundler drops it. The baked root carries the keys and addresses, so the honesty gate and the 2×7
// witness fold answer before, and without, the rows.
import type { LeanTheorem } from './generated.js'
import { lazyList, type EdgeLedger } from './ledger-shape.js'
import { EDGE_ROOT } from './edge-root.js'
import { toUuid, keepAddresses } from '../address.js'
export type { LeanTheorem }
export { WING_DEFS, PRINCIPLES } from './generated.js'

// the edge isolate keeps no addresses: a ledger-wide re-address would pin every statement past its memory
keepAddresses(false)

/** the address's own width — every address in the baked root takes exactly this many characters */
const WIDTH = toUuid('').length

// THE WHOLE LEDGER IS NEVER RESIDENT HERE. It was installed by a prime that read all 492 pieces; that prime is gone,
// so the rows a call needs arrive one piece at a time in heldRows and nothing else is ever held.
const why = 'the edge does not hold the whole ledger: 40 MB of rows does not fit a 128 MB isolate. A door answers from the baked root (ledgerFacts, sealedAddressOf) or from the one piece its cited key sits in (rowsForKeys) — asking for every row asks for what the edge cannot hold.'
let keys: readonly string[] | null = null

const baked = () => {
  if (!EDGE_ROOT) throw new Error('no edge root is baked: run `npm run x -- ledger-deposit --bake` after lean-ledger, then build')
  return EDGE_ROOT
}
const keysOf = (): readonly string[] => (keys ??= baked().keys.split('\n'))

// THE INDEX IS TYPED ARRAYS, NOT 71,017 STRINGS. The rows left this isolate for qpu storage because they did not fit;
// the INDEX over them stayed, and it did not fit either. Splitting the baked list into one string per key and building
// a Map over it measured 20 ms and 66 MB on the FIRST lookup, and the deposit door died on exactly that — the live
// tail read `outcome: exceededMemory`, `Worker exceeded memory limit`, at 63 ms of CPU. So the edge could neither
// write a deposit nor read the ledger back, each for the other's reason. What replaces it answers the same questions
// from one Int32Array of line offsets and one open-addressed Int32Array of positions — about 1.3 MB — and builds no
// key string except the one a caller asks for. Addresses are fixed width in the baked root, so a position reads one
// slice and needs no index at all.
/** rows the pre-pass fetched for the keys a call cites — a handful, not the ledger */
const heldRows = new Map<string, LeanTheorem>()

let offsets: Int32Array | null = null
let table: Int32Array | null = null
let mask = 0

/** the same fold over a key's characters whether they sit in the baked list or in a caller's string; 32-bit through
 *  shift and subtract, so nothing leaves the range an int32 holds and no rounding namespace is touched */
const foldOf = (read: (at: number) => number, from: number, to: number): number => {
  let h = 0
  for (let i = from; i < to; i++) h = (((h << 5) - h) + read(i)) | 0
  return h >>> 0
}

/** where every key starts in the baked list — one pass, no strings */
const offsetsOf = (): Int32Array => {
  if (offsets) return offsets
  const text = baked().keys
  const count = baked().count
  const at = new Int32Array(count + 1)
  let row = 1
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) { at[row] = i + 1; row++ }
  if (row !== count) throw new Error(`edge ledger: the baked root counts ${count} keys and its list holds ${row}`)
  at[count] = text.length + 1
  offsets = at
  return at
}

/** position by key: open addressing over a power-of-two table, every hit confirmed character by character against the
 *  baked list, so a fold collision costs one more probe and never a wrong answer */
const positionOf = (key: string): number | undefined => {
  const text = baked().keys
  const at = offsetsOf()
  if (!table) {
    const count = baked().count
    let size = 1
    while (size < count + count) size += size
    mask = size - 1
    const t = new Int32Array(size)
    const read = (i: number): number => text.charCodeAt(i)
    for (let i = 0; i < count; i++) {
      let slot = foldOf(read, at[i]!, at[i + 1]! - 1) & mask
      while (t[slot] !== 0) slot = (slot + 1) & mask
      t[slot] = i + 1
    }
    table = t
  }
  let slot = foldOf((i) => key.charCodeAt(i), 0, key.length) & mask
  for (;;) {
    const held = table[slot]!
    if (held === 0) return undefined
    const i = held - 1
    const from = at[i]!
    if (at[i + 1]! - 1 - from === key.length) {
      let same = true
      for (let j = 0; j < key.length; j++) if (text.charCodeAt(from + j) !== key.charCodeAt(j)) { same = false; break }
      if (same) return i
    }
    slot = (slot + 1) & mask
  }
}

const addressAt = (i: number): string | undefined =>
  i < 0 || i >= baked().count ? undefined : baked().addresses.slice(i * WIDTH, (i + 1) * WIDTH)

export const LEDGER_EDGE: EdgeLedger | null = {
  root: EDGE_ROOT,
  keys: keysOf,
  count: () => baked().count,
  keyAt: (i) => {
    if (i < 0 || i >= baked().count) return undefined
    const at = offsetsOf()
    return baked().keys.slice(at[i]!, at[i + 1]! - 1)
  },
  addressAt,
  indexOf: positionOf,
  addressOf: (key) => {
    const i = positionOf(key)
    return i === undefined ? undefined : addressAt(i)
  },
  holdRows: (held) => { for (const r of held) heldRows.set(r.key, r) },
  rowFor: (key) => heldRows.get(key),
  primed: () => false,
  lineAt: () => undefined,
}

/** the rows read from storage; reading them before they are primed throws the reason they are not */
export const LEAN_LEDGER: readonly LeanTheorem[] = lazyList(() => { throw new Error(why) })
