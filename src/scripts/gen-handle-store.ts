#!/usr/bin/env node
// gen-handle-store — four-level src/handles/aa/bb/cc/dd/index.json from CHUNKS (algebra + keys[])
// plus freeze publication | page. Not one file per theorem key (that identity lives on the chunk as keys[]).
//
// Identity payload only: handle, address, kind, keys/statement/files or route/identity. No principle, skill,
// title, blurb. Collision refuse — two addresses must not share a handle. handleOf only. Presentation reads
// hexbitDoorOf; this tree is the invertible path.
//
// WRITE THE DIFFERENCE, NEVER THE WHOLE TREE. The store is ~71k leaves under ~186k directories — about 257k inodes
// against the host's 263,168-vnode table (kern.maxvnodes). A wipe+rewrite deleted and recreated every one of them
// per run and filled that table: launchd died of SIGBUS and the machine panicked twice on 2026-09-13, both times
// minutes after this generator ran. So a leaf is written only when its bytes differ, a leaf no record claims is
// removed, and a directory is removed only once it is empty — a shrunk ledger still leaves no orphan.
import { writeFileSync, mkdirSync, readFileSync, readdirSync, rmdirSync, unlinkSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { handleOf, handlePath, HANDLE_ROOT, isHandle } from '../handle.js'
import { buildChunks } from '../handle-chunks.js'
import { buildSeoUrlMap } from '../seo-freeze.js'
import { ROOT } from './api.js'

export interface HandleRecord {
  handle: string
  address: string
  kind: 'chunk' | 'publication' | 'page'
  keys?: string[]
  statement?: string
  files?: string[]
  route?: string
  identity?: string
}

/** buildHandleRecords() — pure, deterministic: chunks plus freeze publication|page. Collision refuse. */
export function buildHandleRecords(): HandleRecord[] {
  const byHandle = new Map<string, HandleRecord>()
  const put = (r: HandleRecord): void => {
    if (!isHandle(r.handle)) throw new Error(`handle store: refused non-handle ${JSON.stringify(r.handle)}`)
    if (r.handle !== handleOf(r.address)) {
      throw new Error(`handle store: ${r.handle} is not handleOf(${r.address})`)
    }
    const prev = byHandle.get(r.handle)
    if (prev && prev.address !== r.address) {
      throw new Error(`handle store collision on ${r.handle}: ${prev.address} vs ${r.address}`)
    }
    if (prev && prev.kind !== r.kind) {
      throw new Error(`handle store collision on ${r.handle}: kind ${prev.kind} vs ${r.kind}`)
    }
    if (!prev) byHandle.set(r.handle, r)
  }
  for (const c of buildChunks()) {
    put({
      handle: c.handle,
      address: c.address,
      kind: 'chunk',
      keys: c.keys,
      statement: c.statement,
      files: c.files,
    })
  }
  for (const e of buildSeoUrlMap().entries) {
    if (e.kind === 'theorem') continue
    put({
      handle: e.handle,
      address: e.address,
      kind: e.kind,
      route: e.route,
      identity: e.identity,
    })
  }
  return [...byHandle.values()].sort((a, b) => a.handle < b.handle ? -1 : a.handle > b.handle ? 1 : 0)
}

export interface HandleStoreWrite { written: number; unchanged: number; removed: number; dirsRemoved: number }

/** prune(dir) — remove every file the wanted set does not name, then the directory itself if nothing is left.
 *  Returns true when dir was removed. The root is never removed, so an empty ledger still leaves the store. */
function prune(dir: string, want: ReadonlySet<string>, tally: HandleStoreWrite, isRoot: boolean): boolean {
  let left = 0
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const here = join(dir, e.name)
    if (e.isDirectory()) { if (!prune(here, want, tally, false)) left += 1; continue }
    if (want.has(here)) { left += 1; continue }
    unlinkSync(here)
    tally.removed += 1
  }
  if (left > 0 || isRoot) return false
  rmdirSync(dir)
  tally.dirsRemoved += 1
  return true
}

export function writeHandleStore(): HandleStoreWrite {
  const records = buildHandleRecords()
  const tally: HandleStoreWrite = { written: 0, unchanged: 0, removed: 0, dirsRemoved: 0 }
  const want = new Set<string>()
  for (const r of records) {
    const file = join(ROOT, handlePath(r.handle))
    const body = JSON.stringify(r, null, 2) + '\n'
    want.add(file)
    let have: string | null = null
    try { have = readFileSync(file, 'utf8') } catch { /* absent leaf: written below */ }
    if (have === body) { tally.unchanged += 1; continue }
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, body)
    tally.written += 1
  }
  const root = join(ROOT, HANDLE_ROOT)
  if (existsSync(root)) prune(root, want, tally, true)
  return tally
}

function shouldWrite(): boolean {
  const a = process.argv[1] || ''
  return a.endsWith('gen-handle-store.js') || a.endsWith('generate.js')
}

if (shouldWrite()) {
  const t = writeHandleStore()
  console.log(`✓ gen-handle-store — four-level ${HANDLE_ROOT} from chunks + publication|page, collision-free: ` +
    `${t.written} written, ${t.unchanged} unchanged, ${t.removed} orphan leaves + ${t.dirsRemoved} empty dirs removed`)
}
