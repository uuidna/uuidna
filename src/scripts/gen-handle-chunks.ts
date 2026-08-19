#!/usr/bin/env node
// gen-handle-chunks — the storable unit is the ALGEBRA, not the theorem record. 1308 keys cite only 1224 distinct
// proven facts (84 re-namings across 79 groups — z9mul_1_1 and mul9_1_1 are one fact, two names); storing a full
// copy per KEY duplicates 84 facts for nothing. This writes ONE chunk per distinct fact (allStatementChunks(),
// content-addressed by its normalised statement — the same identity statementCensus()/guard.js's "1224 distinct"
// already audits, not a new one invented here), sharded ONE level deep by the first byte of its handle.
//
// Why one level, not four: computed against the real ledger (2026-08-19) — at 1224 chunks, one level of 2-hex
// sharding (256 buckets) already averages ~5 entries/bucket (max 11); a second level averages ~1/bucket, and a
// third or fourth level is 100% single-entry directories — decoration, not sharding, and it costs real git/build
// overhead (empty intermediate dirs, extra readdir/stat calls, more surface for cross-branch tree conflicts) for
// zero lookup benefit past level one. A handle still reads as four DNA-codon pairs (ab·cd·ef·12) at the DISPLAY
// layer — src/handles/<ab>/<cdef12>.json keeps that reading without four levels of nearly-empty folders on disk.
//
// Each theorem's own per-key record (src/theorems/generated.ts) is unchanged — key+statement is still its own
// citation identity (address = toUuid(key+':'+statement)), because a key names WHO cites the fact, not the fact
// itself. This is the has_and_belongs_to_many join the other side of: every chunk lists every key that cites it;
// every key can be resolved to its one chunk via chunkHandleOf.
import { writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { allStatementChunks } from '../editorial.js'
import { toUuid } from '../address.js'
import { ROOT } from './api.js'

export interface HandleChunk {
  handle: string
  address: string
  statement: string
  tactic: string
  keys: string[]
  files: string[]
}

/** buildChunks() — pure, deterministic, no I/O: every distinct proven fact, content-addressed and handled. */
export function buildChunks(): HandleChunk[] {
  return allStatementChunks()
    .map((c) => {
      const address = toUuid('chunk:' + c.statement.replace(/\s+/g, ''))
      return { handle: address.replace(/-/g, '').slice(0, 8), address, statement: c.statement, tactic: c.tactic, keys: c.keys, files: c.files }
    })
    .sort((a, b) => a.handle.localeCompare(b.handle))
}

/** chunkHandleOf(key) — resolve a theorem KEY to the handle of the fact it cites (the has_and_belongs_to_many
 *  join, read from the key's side). A caller resolving many keys should build the map once instead: this is a
 *  convenience for the occasional single lookup, not a loop-friendly primitive. */
export function chunkHandleOf(key: string): string | undefined {
  return buildChunks().find((c) => c.keys.includes(key))?.handle
}

const OUT = join(ROOT, 'src/handles')

if (process.argv[1] && process.argv[1].endsWith('gen-handle-chunks.js')) {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║ GEN-HANDLE-CHUNKS — one file per distinct algebra, sharded  ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const chunks = buildChunks()
  const handles = chunks.map((c) => c.handle)
  if (new Set(handles).size !== handles.length) {
    console.error(`✗ gen-handle-chunks — handle collision among ${handles.length} chunks — refusing to write a lossy index`)
    process.exit(1)
  }

  // clean slate: a shrunk ledger (a re-namings backlog may only shrink) must not leave an orphaned chunk file behind
  if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true })
  mkdirSync(OUT, { recursive: true })

  const index: Record<string, string> = {}
  for (const c of chunks) {
    const shard = c.handle.slice(0, 2)
    const leaf = c.handle.slice(2)
    const dir = join(OUT, shard)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, `${leaf}.json`), JSON.stringify(c, null, 2) + '\n')
    index[c.handle] = `${shard}/${leaf}.json`
  }
  writeFileSync(join(OUT, 'index.json'), JSON.stringify({ chunks: chunks.length, shards: new Set(chunks.map((c) => c.handle.slice(0, 2))).size, index }, null, 2) + '\n')

  const shardDirs = readdirSync(OUT).filter((f) => f !== 'index.json')
  console.log(`✓ gen-handle-chunks — ${chunks.length} distinct chunks across ${shardDirs.length} shard(s), 0 collisions`)
  console.log(`  written to: src/handles/<2-hex>/<6-hex>.json + src/handles/index.json`)
}
