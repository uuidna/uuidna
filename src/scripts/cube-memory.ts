#!/usr/bin/env node
// cube-memory — RUN THE CUBE MEMORY OVER THE LEAN ON DISK, and persist the one thing that cannot be recomputed
// from it: which neighbourhoods have already been sealed, and at what fold.
//
// THE CENSUS COMES FROM lean/*.lean, NOT FROM THE LEDGER. src/theorems/generated.ts is written by lean-ledger from
// these same files, so reading it here would census the PREVIOUS generation — the one-generation-stale defect that
// already shipped once in this repository (the infinity wing counted its own census a run behind). A .lean file IS
// a neighbourhood: lean-ledger assigns `principle: titleOf(file)`, one title per file, so the cubes are the wings
// and the wings are on disk. Reading the source of truth costs one directory walk and cannot lag.
//
// NO PAYLOAD IS WRITTEN. The memory file is one complete uuid per neighbourhood and nothing else — every member
// handle, statement and count behind it is recomputable from the Lean by anyone holding the file, and a second
// stored copy of a derived fact is the only kind that can disagree with the first. An earlier attempt at a handle
// store materialised 3,494 directories for 1,271 payloads and was refused by the guard; this writes one file.
//
// A STALE MEMORY COSTS EXTRA SEALING, NEVER A FALSE SEAL. Every address here is recomputed from the file's own
// bytes on every run and compared; nothing is trusted from the memory file. Delete it and the next run re-seals
// everything and agrees with itself. That is the same asymmetry the delta gate in lean-gen rests on.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, leanDecls, report, type Gap } from './api.js'
import { toUuid } from '../address.js'
import { cubeMemory, hold, cubes, planMemory, commitMemory, type CubeMemory, type CubeReceipts } from '../quantum/memory/index.js'

const LEAN_DIR = join(ROOT, 'lean')
export const MEMORY_PATH = join(ROOT, 'lean', 'cube-memory.json')

/** the neighbourhoods as they stand ON DISK: one cube per .lean file, its members that file's theorems */
export function leanCensus(): Map<string, { key: string; address: string }[]> {
  const census = new Map<string, { key: string; address: string }[]>()
  for (const file of readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean')).sort()) {
    const decls = leanDecls(readFileSync(join(LEAN_DIR, file), 'utf8'))
    if (!decls.length) continue                 // a file carrying no theorem is not a neighbourhood
    // the ledger-wide identity of a proposition — toUuid(key + ':' + statement), exactly as theorems/index.ts folds it
    census.set(file, decls.map((d) => ({ key: d.key, address: toUuid(d.key + ':' + d.statement) })))
  }
  return census
}

/** stage every theorem on disk into a memory whose census is that same disk — so every cube is whole by construction
 *  and any cube that ISN'T is a genuine defect (a duplicate key, a file that changed under the walk) */
export function stagedMemory(census = leanCensus()): CubeMemory {
  const mem = cubeMemory([...census].map(([file, members]) => [file, members.map((m) => m.key)] as const))
  for (const [file, members] of census) for (const m of members) hold(mem, { key: m.key, principle: file, address: m.address })
  return mem
}

export const readMemory = (): CubeReceipts => {
  try { return existsSync(MEMORY_PATH) ? JSON.parse(readFileSync(MEMORY_PATH, 'utf8')) : {} } catch { return {} }
}

/** the gaps a memory run can find: a neighbourhood that will not seal. Nothing else here is a defect — a moved cube
 *  is work, and work is not a gap. */
export function cubeGaps(): Gap[] {
  const plan = planMemory(stagedMemory(), readMemory())
  return plan.held.map((c) => ({
    what: `the neighbourhood ${c.principle} did not seal — ${c.members.length} of ${c.size} members held, missing ${c.missing.join(', ')}`,
    fix: `every theorem in lean/${c.principle} must parse exactly once; a duplicate key or a mid-write file is the usual cause. Re-run \`npm run lean\` and then this.`,
  }))
}

function main(): void {
  const prior = readMemory()
  const mem = stagedMemory()
  const plan = planMemory(mem, prior)
  const gaps = cubeGaps()
  if (gaps.length) { report('cube-memory', gaps, '') ; process.exit(1) }

  const next = commitMemory(plan, prior)
  writeFileSync(MEMORY_PATH, JSON.stringify(next, null, 1) + '\n')
  const members = cubes(mem).reduce((n, c) => n + c.members.length, 0)
  console.log(
    `✓ cube-memory — ${plan.sealed.length} neighbourhoods sealed over ${members} theorems: ` +
    `${plan.fresh.length} verified by receipt (not recomputed), ${plan.moved.length} moved and re-sealed, ` +
    `${plan.held.length} held in memory. lean/cube-memory.json carries one complete uuid per neighbourhood — no payload.`,
  )
}

if (process.argv[1] && /cube-memory\.(js|ts)$/.test(process.argv[1])) main()
