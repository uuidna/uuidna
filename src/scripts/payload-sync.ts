#!/usr/bin/env node
// payload-sync — the COMPATIBILITY AUTOMATION: uuidna keeps no collections of its own; this emits the CURRENT
// Lean seed tree TWICE, in the two shapes a Payload Pages collection actually comes in. "EACH THEOREM IS A
// BLOCK" (the captain, 2026-08-18): payload-sync.json is one page per theorem with a lexical `content` field
// (nested-docs parents/children, auto-recognized by Payload's DEFAULT richText config); payload-sync-blocks.json
// is ONE page per WING whose `layout` array holds one block per theorem — the shape Payload's OWN production
// site (payloadcms/website) actually uses. Same data, same per-theorem addresses, two envelopes; a receiver
// picks whichever field its Pages collection speaks. CURRENT means: recompute each lean file's version uuid from
// its bytes NOW and read exactly that sealed folder — older versions stay on disk untouched, the sync names only
// the tip. Idempotent by construction: uuidnaVersion equality says "already synced, skip".
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems } from '../theorems/index.js'
import { buildLeanPageSeed, toPayloadDocs, toPayloadBlocksDoc } from '../payload-seed.js'
import { PAYLOAD } from '../site/index.js'
import { ROOT } from './api.js'

const LEAN = join(ROOT, 'lean')
const OUT = join(ROOT, 'src', 'seeds', 'payload-sync.json')
const OUT_BLOCKS = join(ROOT, 'src', 'seeds', 'payload-sync-blocks.json')

const byFile = new Map<string, { key: string; name: string; statement: string; lean: string }[]>()
for (const t of theorems()) {
  const list = byFile.get(t.file) ?? []
  list.push({ key: t.key, name: t.name, statement: t.statement, lean: (t as { lean?: string }).lean ?? t.statement })
  byFile.set(t.file, list)
}

const leanFiles = readdirSync(LEAN).filter((f) => f.endsWith('.lean'))
const seeds = leanFiles.map((f) => {
  const stem = f.replace(/\.lean$/, '')
  const contents = readFileSync(join(LEAN, f), 'utf8')
  const entries = byFile.get(f) ?? []
  return buildLeanPageSeed(stem, contents, entries, entries.length > 0)
})

const docs = seeds.flatMap(toPayloadDocs)
const parents = docs.filter((d) => d.parent === null).length
const published = docs.filter((d) => d._status === PAYLOAD.statuses.published).length
writeFileSync(OUT, JSON.stringify({ collection: PAYLOAD.collection, docs }, null, 2) + '\n')
console.log(`✓ payload-sync — ${docs.length} docs (${parents} parents, ${docs.length - parents} nested children; ${published} published, ${docs.length - published} draft) → src/seeds/payload-sync.json`)
console.log('  richText shape: pages collection · nested-docs parent · drafts _status · lexical content — a vanilla Payload auto-recognizes; upsert by slug, skip when uuidnaVersion is equal.')

const blocksDocs = seeds.map(toPayloadBlocksDoc)
const blockCount = blocksDocs.reduce((n, d) => n + d.layout.length, 0)
writeFileSync(OUT_BLOCKS, JSON.stringify({ collection: PAYLOAD.collection, docs: blocksDocs }, null, 2) + '\n')
console.log(`✓ payload-sync — ${blocksDocs.length} pages, ${blockCount} theorem blocks in their \`layout\` arrays → src/seeds/payload-sync-blocks.json`)
console.log('  blocks shape: EACH THEOREM IS A BLOCK — one page per wing, its layout holding one \`theorem\` block per theorem; the shape payloadcms/website\'s own Pages collection speaks.')
