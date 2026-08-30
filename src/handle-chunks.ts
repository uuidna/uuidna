// handle-chunks — content-addressed chunk handles (pure; safe for VitePress paths loader).
import { handleOf } from './handle.js'
import { toUuid } from './address.js'
import { allStatementChunks } from './statement-chunks.js'

export interface HandleChunk {
  handle: string
  address: string
  statement: string
  tactic: string
  keys: string[]
  files: string[]
}

let CHUNKS: HandleChunk[] | undefined
export function buildChunks(): HandleChunk[] {
  return (CHUNKS ??= allStatementChunks()
    .map((c) => {
      const address = toUuid('chunk:' + c.statement.replace(/\s+/g, ''))
      return { handle: handleOf(address), address, statement: c.statement, tactic: c.tactic, keys: c.keys, files: c.files }
    })
    .sort((a, b) => a.handle.localeCompare(b.handle)))
}

let BY_KEY: Map<string, string> | undefined
function keyIndex(): Map<string, string> {
  if (BY_KEY) return BY_KEY
  const m = new Map<string, string>()
  for (const c of buildChunks()) for (const k of c.keys) if (!m.has(k)) m.set(k, c.handle)
  return (BY_KEY = m)
}

export function chunkHandleOf(key: string): string | undefined {
  return keyIndex().get(key)
}
