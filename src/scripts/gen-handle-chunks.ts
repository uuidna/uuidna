#!/usr/bin/env node
// gen-handle-chunks — write src/chunks/ from the pure handle-chunks constructor.
import { buildChunks } from '../handle-chunks.js'
import { has, wr, mkdirp, rmrf } from './api.js'

export { buildChunks, chunkHandleOf, type HandleChunk } from '../handle-chunks.js'

export function writeHandleChunks(): void {
  const chunks = buildChunks()
  const handles = chunks.map((c) => c.handle)
  if (new Set(handles).size !== handles.length) {
    throw new Error(`gen-handle-chunks — handle collision among ${handles.length} chunks — refusing to write a lossy index`)
  }
  if (has('src/chunks')) rmrf('src/chunks')
  mkdirp('src/chunks')
  const index: Record<string, string> = {}
  for (const c of chunks) {
    const parts = [c.handle.slice(0, 2), c.handle.slice(2)]
    mkdirp(`src/chunks/${parts[0]!}`)
    wr(`src/chunks/${parts[0]!}/${parts[1]}.json`, JSON.stringify(c, null, 2) + '\n')
    index[c.handle] = `${parts[0]}/${parts[1]}.json`
  }
  wr('src/chunks/index.json', JSON.stringify({ chunks: chunks.length, shards: new Set(chunks.map((c) => c.handle.slice(0, 2))).size, index }, null, 2) + '\n')
}

function shouldWrite(): boolean {
  const argv = typeof process !== 'undefined' && Array.isArray(process.argv) ? process.argv : []
  const a = argv[1] || ''
  return a.endsWith('gen-handle-chunks.js') || a.endsWith('generate.js')
}

if (shouldWrite()) {
  writeHandleChunks()
  console.log(`✓ gen-handle-chunks — distinct chunks, collision-free, written to src/chunks`)
}
