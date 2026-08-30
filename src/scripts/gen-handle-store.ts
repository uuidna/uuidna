#!/usr/bin/env node
// gen-handle-store — four-level src/handles/aa/bb/cc/dd/index.json from CHUNKS (algebra + keys[])
// plus freeze publication | page. Not one file per theorem key (that identity lives on the chunk as keys[]).
//
// Identity payload only: handle, address, kind, keys/statement/files or route/identity. No principle, skill,
// title, blurb. Collision refuse — two addresses must not share a handle. Wipe+rewrite so a shrunk ledger
// leaves no orphan. handleOf only. Presentation reads hexbitDoorOf; this tree is the invertible path.
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { handleOf, handlePath, handleDirs, HANDLE_ROOT, isHandle } from '../handle.js'
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

const FORBIDDEN = /principle|skill|title|blurb|sephirot|chakra|wen\b|king wen/i

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

export function assertIdentityPayload(r: HandleRecord): void {
  for (const k of Object.keys(r)) {
    if (FORBIDDEN.test(k)) throw new Error(`handle store: identity payload carried grouping key ${k} on ${r.handle}`)
  }
}

export function writeHandleStore(): void {
  const records = buildHandleRecords()
  for (const r of records) assertIdentityPayload(r)
  const out = join(ROOT, HANDLE_ROOT)
  if (existsSync(out)) rmSync(out, { recursive: true, force: true })
  for (const r of records) {
    for (const dir of handleDirs(r.handle)) mkdirSync(join(ROOT, dir), { recursive: true })
    writeFileSync(join(ROOT, handlePath(r.handle)), JSON.stringify(r, null, 2) + '\n')
  }
}

function shouldWrite(): boolean {
  const a = process.argv[1] || ''
  return a.endsWith('gen-handle-store.js') || a.endsWith('generate.js')
}

if (shouldWrite()) {
  writeHandleStore()
  console.log(`✓ gen-handle-store — four-level ${HANDLE_ROOT} from chunks + publication|page, collision-free`)
}
