#!/usr/bin/env node
// lean-payload-seeds — CONVERT the Lean sources into computable PayloadCMS nested page seeds, versioned by content:
// each lean/*.lean becomes src/seeds/<uuid>/page.json, where the uuid is the reversible imprint of
// (status ∥ stem ∥ content). A changed Lean file mints a NEW folder (append-only versions;
// an unchanged file finds its folder already sealed and skips. The closing demo REVERSE-ENGINEERS the whole tree
// from the folder NAMES alone — zero file reads — proving the no-cost filtering/indexing claim on the spot.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems } from '../theorems/index.js'
import { buildLeanPageSeed, readSeed, filterSeeds, retiredUuid } from '../payload-seed.js'
import { ROOT } from './api.js'

const LEAN = join(ROOT, 'lean')
const OUT = join(ROOT, 'src', 'seeds')

const byFile = new Map<string, { key: string; name: string; statement: string; lean: string }[]>()
for (const t of theorems()) {
  const list = byFile.get(t.file) ?? []
  list.push({ key: t.key, name: t.name, statement: t.statement, lean: (t as { lean?: string }).lean ?? t.statement })
  byFile.set(t.file, list)
}

mkdirSync(OUT, { recursive: true })
let created = 0
let sealed = 0
const current = new Set<string>()
for (const f of readdirSync(LEAN).filter((f) => f.endsWith('.lean'))) {
  const stem = f.replace(/\.lean$/, '')
  const contents = readFileSync(join(LEAN, f), 'utf8')
  const entries = byFile.get(f) ?? []
  const seed = buildLeanPageSeed(stem, contents, entries, entries.length > 0)
  const dir = join(OUT, seed.uuid)
  current.add(seed.uuid)
  if (existsSync(dir)) { sealed++; continue } // an existing version is immutable — a changed file mints a NEW uuid
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'page.json'), JSON.stringify({ file: f, slug: seed.slug, status: seed.status, address: seed.address, page: seed.page }, null, 2) + '\n')
  created++
}

// RETIRE WHAT THIS RUN SUPERSEDED. Nothing is purged: the bytes stay, the folder stays addressable, and only the
// three status bits in the name move, so the no-cost index stops returning it for `usable`. A superseded version
// of a wing holds the SAME Lean bytes as the current one, so keeping it as `usable` preserves no history — the
// only thing it uniquely carries is whatever was stale when it was minted, stated in the present tense with a
// status that affirmatively says NOT superseded. That is a claim the store keeps making, not one it records.
let retired = 0
for (const d of readdirSync(OUT).filter((d) => !d.includes('.'))) {
  if (current.has(d)) continue
  let status: string
  try { status = readSeed(d).status } catch { continue }   // not one of ours; leave it alone
  if (status === 'retired') continue
  const to = retiredUuid(d)
  if (existsSync(join(OUT, to))) continue                  // already retired under its retired name
  renameSync(join(OUT, d), join(OUT, to))
  const pj = join(OUT, to, 'page.json')
  const doc = JSON.parse(readFileSync(pj, 'utf8')) as Record<string, unknown>
  doc.status = 'retired'                                   // the file may not contradict its own name
  writeFileSync(pj, JSON.stringify(doc, null, 2) + '\n')
  retired++
}

// the NO-COST index — reverse-engineered from the folder names alone, zero file reads:
const names = readdirSync(OUT).filter((d) => !d.includes('.'))
const usable = filterSeeds(names, 'usable')
const draft = filterSeeds(names, 'draft')
console.log(`✓ lean-payload-seeds — ${created} new version(s) minted, ${sealed} already sealed (immutable), ${retired} superseded version(s) retired (renamed, never deleted); ${names.length} versions on disk`)
console.log(`  no-cost index (decoded from names, zero reads): ${usable.length} usable · ${draft.length} draft`)
const sample = names[0] ? readSeed(names[0]) : null
if (sample) console.log(`  sample ${names[0].slice(0, 13)}… → status=${sample.status}, stem=${sample.stem32.slice(0, 8)}…, content=${sample.content64.slice(0, 8)}…`)
