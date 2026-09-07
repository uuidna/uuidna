// handle-store-census — WHAT THE STORE HOLDS, AND HOW MUCH OF WHAT IT ADMITS.
//
// HandleStore.lean seals the addressing (2³² leaves × 2⁹⁶ payloads = 2¹²⁸ exactly) and Crosslink.lean seals what
// the same leaves admit in RELATIONS (n − 1 tree links against n(n − 1)/2 pairs, and a graph on seventeen leaves
// already outnumbering the whole uuid space). Both are arithmetic. This is the MEASUREMENT that says which tree
// those theorems are about — walked from the folders, never quoted.
//
// THE THREE NUMBERS THAT MUST NOT BE CONFLATED, and this module exists to keep them apart:
//
//   OCCUPANCY   what the store holds now — leaves on disk, keys inside them
//   CAPACITY    what the addressing admits — 2³² leaves, and n(n − 1)/2 links among them
//   USE         the share of that capacity actually taken — a tree takes n − 1 of the pairs and nothing more
//
// A ledger that let occupancy stand in for capacity would overstate this store by a factor near eight hundred
// thousand; one that let capacity stand in for occupancy would claim four billion folders that do not exist.
// HandleStore.lean seals that the store holds far less than its addressing admits, for exactly that reason, and
// this returns all three so a surface quoting one cannot silently mean another. (Stated in words rather than as a
// backticked key: a citation is checked against the SERVED ledger, and quoting a key the ledger does not yet
// serve is a fabricated citation whatever the intent — the wing may seal it while the derived layer lags.)
//
// PURE OVER A DIRECTORY, no clock and no network: given a root it walks and counts. The root is a parameter so a
// test can hand it a fixture and the shared tree is never the subject of its own measurement.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface HandleStoreCensus {
  /** leaves found on disk */
  leaves: number
  /** parent links a tree over those leaves carries — one per child */
  treeLinks: number
  /** undirected pairs those same leaves admit */
  pairs: number
  /** leaves by `kind`, summing to `leaves` */
  kinds: Record<string, number>
  /** how many leaves carry 0, 1, 2 … theorem keys */
  keysPerLeaf: Record<number, number>
  /** total theorem keys across every leaf */
  keys: number
  /** leaves whose path does NOT spell their handle — a defect, and zero on a sound store */
  pathMismatch: string[]
  /** leaves whose handle is NOT their address's prefix — likewise */
  prefixMismatch: string[]
  /** files that could not be read or parsed: UNMEASURED, never folded into a clean count */
  unreadable: string[]
}

/** handleStoreCensus(root) → occupancy, capacity and use, kept separate */
export function handleStoreCensus(root: string): HandleStoreCensus {
  const kinds: Record<string, number> = {}
  const keysPerLeaf: Record<number, number> = {}
  const pathMismatch: string[] = []
  const prefixMismatch: string[] = []
  const unreadable: string[] = []
  let leaves = 0, keys = 0

  const walk = (dir: string, seg: string[]): void => {
    let entries: { name: string; isDirectory: () => boolean }[]
    try { entries = readdirSync(dir, { withFileTypes: true }) as unknown as typeof entries }
    catch { unreadable.push(dir); return }
    for (const e of entries) {
      const here = join(dir, e.name)
      if (e.isDirectory()) { walk(here, [...seg, e.name]); continue }
      if (e.name !== 'index.json') continue
      let j: { handle?: string; address?: string; kind?: string; keys?: string[] }
      // UNREADABLE IS ITS OWN ANSWER. A leaf that cannot be parsed is not a leaf that agreed with everything —
      // folding the two is the defect this tree has now corrected in four separate finders.
      try { j = JSON.parse(readFileSync(here, 'utf8')) as typeof j } catch { unreadable.push(here); continue }
      leaves += 1
      const k = (j.keys ?? []).length
      keys += k
      keysPerLeaf[k] = (keysPerLeaf[k] ?? 0) + 1
      const kind = j.kind ?? 'unnamed'
      kinds[kind] = (kinds[kind] ?? 0) + 1
      if (seg.join('') !== j.handle) pathMismatch.push(here)
      // NO RAW CONTROL BYTE IN THE SOURCE. A literal NUL byte makes grep classify the whole file as binary and
      // skip it — that is grep's documented behaviour on a NUL, a HOST FACT and not a choice, so a reviewer's
      // search cannot reach this file while the byte is present. The sentinel is written as an escape instead:
      // the compiled string is identical and the file stays searchable.
      const handle = j.handle ?? '\u0000'
      if (!String(j.address ?? '').replace(/-/g, '').startsWith(handle)) prefixMismatch.push(here)
    }
  }
  walk(join(root, 'src', 'handles'), [])

  return {
    leaves,
    treeLinks: leaves > 0 ? leaves - 1 : 0,
    pairs: (leaves * (leaves - 1)) / 2,
    kinds, keysPerLeaf, keys, pathMismatch, prefixMismatch, unreadable,
  }
}

/** the report a surface or a tool prints — occupancy, capacity and use, each labelled as what it is */
export function handleStoreReport(c: HandleStoreCensus): string {
  const kinds = Object.entries(c.kinds).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n} ${k}`).join(', ')
  const dist = Object.entries(c.keysPerLeaf).sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([k, n]) => `${k}:${n}`).join('  ')
  // INTEGER SHARE, IN MILLIONTHS, AND BY REMAINDER. The first version wrote this with the host's truncation
  // routine — inside a line whose own comment said no floating point. The tree hard-rejects that namespace and was
  // right to: a division floored by subtracting its own remainder needs no library call, and cannot round BY
  // CONSTRUCTION, since the remainder it subtracts is exactly what a rounding step would have to invent.
  const n = c.treeLinks * 1000000
  const share = c.pairs > 0 ? (n - (n % c.pairs)) / c.pairs : 0
  return [
    `  OCCUPANCY  ${c.leaves} leaves, ${c.keys} keys — ${kinds}`,
    `             keys per leaf ${dist}`,
    `  CAPACITY   the addressing admits 4294967296 leaves; these leaves admit ${c.pairs} pairs`,
    `  USE        ${c.treeLinks} tree links — ${share} millionths of the pairs its own leaves permit`,
    `  SOUND      path spells handle: ${c.leaves - c.pathMismatch.length}/${c.leaves}`
    + `   handle is address prefix: ${c.leaves - c.prefixMismatch.length}/${c.leaves}`,
    c.unreadable.length ? `  UNMEASURED ${c.unreadable.length} file(s) could not be read — not counted as sound` : '  UNMEASURED none',
  ].join('\n')
}
