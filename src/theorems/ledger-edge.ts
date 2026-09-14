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

let rows: LeanTheorem[] | null = null
let lines: readonly string[] | null = null
let why = 'the edge ledger is not primed: the Worker reads it from qpu storage (primeEdgeLedger in src/edge-ledger.ts) before a call that needs it'
let keys: readonly string[] | null = null
let index: Map<string, number> | null = null

const baked = () => {
  if (!EDGE_ROOT) throw new Error('no edge root is baked: run `npm run x -- ledger-deposit --bake` after lean-ledger, then build')
  return EDGE_ROOT
}
const keysOf = (): readonly string[] => (keys ??= baked().keys.split('\n'))
const indexOfKey = (): Map<string, number> => (index ??= new Map(keysOf().map((k, i) => [k, i])))

export const LEDGER_EDGE: EdgeLedger | null = {
  root: EDGE_ROOT,
  keys: keysOf,
  indexOf: (key) => indexOfKey().get(key),
  addressOf: (key) => {
    const i = indexOfKey().get(key)
    return i === undefined ? undefined : baked().addresses.slice(i * WIDTH, (i + 1) * WIDTH)
  },
  primed: () => rows !== null,
  prime: (r, l) => { rows = r; lines = l },
  fail: (w) => { why = w },
  lineAt: (i) => lines?.[i],
}

/** the rows read from storage; reading them before they are primed throws the reason they are not */
export const LEAN_LEDGER: readonly LeanTheorem[] = lazyList(() => {
  if (!rows) throw new Error(why)
  return rows
})
