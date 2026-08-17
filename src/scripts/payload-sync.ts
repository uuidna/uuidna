#!/usr/bin/env node
// payload-sync — the COMPATIBILITY AUTOMATION: uuidna keeps no collections of its own; this emits the CURRENT
// Lean seed tree as standard Payload pages-collection docs (nested-docs parent relations, drafts _status, lexical
// content) into src/seeds/payload-sync.json, ready for a vanilla Payload instance to upsert-by-slug and
// auto-recognize. CURRENT means: recompute each lean file's version uuid from its bytes NOW and read exactly that
// sealed folder — older versions stay on disk untouched (the append-only history), the sync names only the tip.
// Idempotent by construction: uuidnaVersion equality says "already synced, skip".
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems } from '../theorems/index.js'
import { buildLeanPageSeed, toPayloadDocs } from '../payload-seed.js'
import { ROOT } from './api.js'

const LEAN = join(ROOT, 'lean')
const OUT = join(ROOT, 'src', 'seeds', 'payload-sync.json')

const byFile = new Map<string, { key: string; name: string; statement: string; lean: string }[]>()
for (const t of theorems()) {
  const list = byFile.get(t.file) ?? []
  list.push({ key: t.key, name: t.name, statement: t.statement, lean: (t as { lean?: string }).lean ?? t.statement })
  byFile.set(t.file, list)
}

const docs = readdirSync(LEAN).filter((f) => f.endsWith('.lean')).flatMap((f) => {
  const stem = f.replace(/\.lean$/, '')
  const contents = readFileSync(join(LEAN, f), 'utf8')
  const entries = byFile.get(f) ?? []
  return toPayloadDocs(buildLeanPageSeed(stem, contents, entries, entries.length > 0))
})

const parents = docs.filter((d) => d.parent === null).length
const published = docs.filter((d) => d._status === 'published').length
writeFileSync(OUT, JSON.stringify({ collection: 'pages', docs }, null, 2) + '\n')
console.log(`✓ payload-sync — ${docs.length} docs (${parents} parents, ${docs.length - parents} nested children; ${published} published, ${docs.length - published} draft) → src/seeds/payload-sync.json`)
console.log('  standard shapes only: pages collection · nested-docs parent · drafts _status · lexical content — a vanilla Payload auto-recognizes; upsert by slug, skip when uuidnaVersion is equal.')
