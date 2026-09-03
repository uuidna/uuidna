// involution/tables — sealed Lean mirrors the evaluator must know by name (Installs.lean, Models.lean).
// Derived from the same committed mirrors the Lean generators use — never hand-edited.
import { INSTALLS_MIRROR } from '../../quantum/os/mirror/index.js'
import { buildOrder } from '../../quantum/os/index.js'
import { routeOf } from '../../quantum/os/routes/index.js'
import { MODELS_MIRROR } from '../../quantum/models/mirror.js'
import { modelComparison } from '../../quantum/models/index.js'

const chunk32 = (xs: number[]): number[][] => {
  const rows: number[][] = []
  for (let i = 0; i < xs.length; i += 32) rows.push(xs.slice(i, i + 32))
  return rows
}

const names = INSTALLS_MIRROR.packages.map((p) => p.name)
const idx = new Map(names.map((n, i) => [n, i]))
export const INSTALL_EDGE_PAIRS: readonly (readonly [number, number])[] = (() => {
  const edges: [number, number][] = []
  for (const p of INSTALLS_MIRROR.packages) {
    for (const d of p.deps) edges.push([idx.get(p.name)! as number, idx.get(d)! as number])
  }
  return edges
})()
export const INSTALL_NAMES: readonly string[] = names
export const INSTALL_ROUTES: readonly string[] = names.map(routeOf)
export const INSTALL_MEANINGS: readonly string[] = INSTALLS_MIRROR.packages.map((p: { desc: string }) => p.desc)

const out = new Map<number, number[]>()
for (const [a, b] of INSTALL_EDGE_PAIRS) {
  if (!out.has(a)) out.set(a, [])
  out.get(a)!.push(b)
}
export const BFS_ORDER: readonly number[] = (() => {
  const bfs: number[] = [0]
  const seen = new Set([0])
  for (let q = 0; q < bfs.length; q++) {
    for (const b of out.get(bfs[q]!) ?? []) {
      if (!seen.has(b)) { seen.add(b); bfs.push(b) }
    }
  }
  return bfs
})()

const build = buildOrder(INSTALLS_MIRROR)
const inv = new Array(names.length).fill(0)
build.forEach((node: number, pos: number) => { inv[node] = pos })
export const INV_ORDER: readonly number[] = inv

export const BOOT_PAGE_COUNT = 26
export const ROOTFS_NIBBLE_COUNT = 64
export const RELEASE_ADDRESS_COUNT = 32

// THESE ARE FUNCTIONS BECAUSE THE CALL WAS A CYCLE, not because a value would not do. `const cmp =
// modelComparison(MODELS_MIRROR)` ran at MODULE SCOPE, and quantum/models reaches this file through quantum/os —
// so in ESM, where every import is evaluated before one line of the importer's body, the call landed while
// quantum/models had not run its own body yet. Every module-scope binding it needs was in its temporal dead zone,
// and READING one throws: first `Cannot access 'CACHE' before initialization`, then `row` behind it — a queue of
// them, because the whole body is what had not run. Hoisting a declaration leaves that unfixed and neither can moving
// the cache, since the body runs after the imports either way. Deferring the CALL is the fix: nothing is computed
// while the cycle is open, and the first real caller runs after quantum/models is whole. Memoised, so the census
// is still walked once. The same shape as the edge rule this tree already keeps — no module-scope registry calls.
let cmpMemo: ReturnType<typeof modelComparison> | null = null
const cmp = (): ReturnType<typeof modelComparison> => (cmpMemo ??= modelComparison(MODELS_MIRROR))
export const modelContextRows = (): readonly (readonly number[])[] => chunk32(cmp().rows.map((r: { contextTokens: number }) => r.contextTokens))
export const modelTransientRows = (): readonly (readonly number[])[] => chunk32(cmp().rows.map((r: { hexbitCapacity: number }) => r.hexbitCapacity))
export const modelUuidCountRows = (): readonly (readonly number[])[] => chunk32(cmp().rows.map((r: { uuidsPerContext: number }) => r.uuidsPerContext))
