// involution/tables — sealed Lean mirrors the evaluator must know by name (Installs.lean, Models.lean).
// Derived from the same committed mirrors the Lean generators use — never hand-edited.
import { INSTALLS_MIRROR } from '../../quantum/os/mirror.js'
import { buildOrder } from '../../quantum/os/index.js'
import { routeOf } from '../../quantum/os/routes.js'
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

const cmp = modelComparison(MODELS_MIRROR)
export const MODEL_CONTEXT_ROWS: readonly (readonly number[])[] = chunk32(cmp.rows.map((r: { contextTokens: number }) => r.contextTokens))
export const MODEL_TRANSIENT_ROWS: readonly (readonly number[])[] = chunk32(cmp.rows.map((r: { hexbitCapacity: number }) => r.hexbitCapacity))
export const MODEL_UUID_COUNT_ROWS: readonly (readonly number[])[] = chunk32(cmp.rows.map((r: { uuidsPerContext: number }) => r.uuidsPerContext))
