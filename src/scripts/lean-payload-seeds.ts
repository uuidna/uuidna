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
import { buildLeanPageSeed, readSeed, filterSeeds, retiredUuid, seedReference, type SeedStatus } from '../payload-seed.js'
import { documentAddress, type EditorState } from '../editor.js'
import { isPagelessFile } from '../theorems/index.js'
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
let rewritten = 0
const current = new Set<string>()
for (const f of readdirSync(LEAN).filter((f) => f.endsWith('.lean'))) {
  const stem = f.replace(/\.lean$/, '')
  const contents = readFileSync(join(LEAN, f), 'utf8')
  const entries = byFile.get(f) ?? []
  const seed = buildLeanPageSeed(stem, contents, entries, entries.length > 0)
  const dir = join(OUT, seed.uuid)
  current.add(seed.uuid)
  // AN EXISTING VERSION IS IMMUTABLE IN ITS CONTENT, AND ITS BODY MUST STILL RECOMPUTE. The uuid folds the Lean
  // bytes and the ledger entries, so a changed wing mints a NEW folder and this skip is right. What the uuid does
  // NOT fold is the SHAPE buildLeanPageSeed renders those bytes into — and when that shape changes, every folder
  // on disk holds a body whose documentAddress no longer matches the `address` beside it, with no uuid moving to
  // say so. Nothing read it, so nothing noticed: that is how 94 seeds kept 234 MiB of a body the generator had
  // stopped producing. The stored address is the test, and it is free — a mismatch means the file does not
  // recompute, which is the one condition under which a derived file is rewritten rather than kept.
  if (existsSync(dir)) {
    const pj = join(dir, 'page.json')
    const stored = existsSync(pj) ? (JSON.parse(readFileSync(pj, 'utf8')) as { address?: string }).address : undefined
    if (stored === seed.address) { sealed++; continue }
    rewritten++
    writeFileSync(join(dir, 'page.json'), JSON.stringify({ file: f, slug: seed.slug, status: seed.status, address: seed.address, page: seed.page }, null, 2) + '\n')
    continue
  }
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'page.json'), JSON.stringify({ file: f, slug: seed.slug, status: seed.status, address: seed.address, page: seed.page }, null, 2) + '\n')
  created++
}

// RETIRE WHAT THIS RUN SUPERSEDED. Nothing is purged: the bytes stay, the folder stays addressable, and only the
// three status bits in the name move, so the no-cost index stops returning it for `usable`. A superseded version
// of a wing holds the SAME Lean bytes as the current one, so keeping it as `usable` preserves no history — the
// only thing it uniquely carries is whatever was stale when it was minted, stated in the present tense with a
// status that affirmatively says NOT superseded. That is a claim the store keeps making, not one it records.
// AND A SUPERSEDED VERSION KEEPS ITS BODY NO MORE THAN A CURRENT ONE DOES. Two counts, one pass, because they were
// the same fault: 1,610 retired pages held 136 MiB and 35 of them were over a megabyte each. copy-lean-to-site
// serves every folder under src/seeds, so those bytes are rendered and shipped exactly like a current version's —
// which is the site's weight, and it buys nothing. This loop's own reasoning already said so: a superseded version
// holds the same Lean bytes as the current one, so "the only thing it uniquely carries is whatever was stale when
// it was minted". Its body is reduced to the same schema.org reference a current one carries, which is a
// RECOMPUTATION and not a purge — the folder, its name, its content fingerprint and its status all stay, and the
// bytes it pointed at were never in it: the source is at /lean/<File>.lean and a span's rows are on their door.
//
// THE DUPLICATE CASE IS WHY THIS IS ONE PASS. `if (existsSync(retiredName)) continue` left a version that is not
// current and whose retired twin already exists as `usable` forever — never retired, never revisited, never
// recomputed. Six HexSpan wings sat there at 4.83 MiB each after the fold had already shrunk their live twins to
// 869 bytes. Reducing the body first and retiring second removes the case instead of special-casing it.
let retired = 0
let reduced = 0
for (const d of readdirSync(OUT).filter((d) => !d.includes('.'))) {
  if (current.has(d)) continue
  let status: SeedStatus
  try { status = readSeed(d).status } catch { continue }   // not one of ours; leave it alone
  const pj = join(OUT, d, 'page.json')
  if (!existsSync(pj)) continue
  const doc = JSON.parse(readFileSync(pj, 'utf8')) as { file?: string; page?: EditorState; address?: string; status?: string }
  const stem = String(doc.file ?? '').replace(/\.lean$/, '')
  const kids = doc.page?.root?.children ?? []
  if (stem && kids.length > 2) {
    // the entry count this version carried is its own nested pages — read from the body being replaced, so the
    // reference states what THIS version held rather than what the wing holds today
    const held = kids.filter((n) => n.type === 'page').length
    const page: EditorState = { root: { type: 'root', children: [
      { type: 'heading', tag: 'h1', children: [{ type: 'text', text: stem + '.lean — the sealed source' }] },
      { type: 'code', language: 'json', children: [{ type: 'text', text: JSON.stringify(seedReference(stem, held, isPagelessFile(stem + '.lean')), null, 1) }] },
    ] } }
    doc.page = page
    doc.address = documentAddress(page)
    writeFileSync(pj, JSON.stringify(doc, null, 2) + '\n')
    reduced++
  }
  if (status === 'retired') continue
  const to = retiredUuid(d)
  if (existsSync(join(OUT, to))) continue                  // its retired twin is already on disk under that name
  renameSync(join(OUT, d), join(OUT, to))
  const moved = join(OUT, to, 'page.json')
  const after = JSON.parse(readFileSync(moved, 'utf8')) as Record<string, unknown>
  after.status = 'retired'                                 // the file may not contradict its own name
  writeFileSync(moved, JSON.stringify(after, null, 2) + '\n')
  retired++
}

// the NO-COST index — reverse-engineered from the folder names alone, zero file reads:
const names = readdirSync(OUT).filter((d) => !d.includes('.'))
const usable = filterSeeds(names, 'usable')
const draft = filterSeeds(names, 'draft')
console.log(`✓ lean-payload-seeds — ${created} new version(s) minted, ${rewritten} recomputed (body no longer matched its stored address), ${sealed} already sealed (immutable), ${retired} superseded version(s) retired (renamed, never deleted), ${reduced} superseded body(ies) reduced to their reference; ${names.length} versions on disk`)
console.log(`  no-cost index (decoded from names, zero reads): ${usable.length} usable · ${draft.length} draft`)
const sample = names[0] ? readSeed(names[0]) : null
if (sample) console.log(`  sample ${names[0].slice(0, 13)}… → status=${sample.status}, stem=${sample.stem32.slice(0, 8)}…, content=${sample.content64.slice(0, 8)}…`)
