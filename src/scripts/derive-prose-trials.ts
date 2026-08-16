#!/usr/bin/env node
// derive-prose-trials — ALL PROSE TO TRIAL, RETURNING THE USABLE COMBINATIONS. Every paragraph of every prose
// surface (README + docs/*.md) is sent through the gate's reveal() — the same trial the commit-sign and the
// provenance audit use — and the output is DERIVED, never authored: the combinations that are USABLE, meaning
// a prose unit paired with the sealed theorems it actually cites (verdict VERIFIED), plus the honest census of
// what stays UNVERIFIED (revealed as unbacked, not endorsed) and what would DRAIN (a fabricated citation — the
// one decidably-false case; the gate keeps this at zero). No hand-curated evidence list — the ledger decides.
// Deterministic: file order, paragraph order, no wall-clock, no RNG; the receipt is the fold of the output.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { reveal, toUuid } from '../index.js'
import { ROOT } from './api.js'

interface UsableCombination {
  surface: string          // the file the prose lives in
  address: string          // content-address of the exact prose unit (recomputable)
  prose: string            // the paragraph, trimmed (the claim as written)
  cites: string[]          // the SEALED theorems it cites — the usable pairing
}

const surfaces: string[] = []
const readme = join(ROOT, 'README.md')
if (existsSync(readme)) surfaces.push(readme)
const DOCS = join(ROOT, 'docs')
for (const f of readdirSync(DOCS).sort()) if (f.endsWith('.md')) surfaces.push(join(DOCS, f))

const usable: UsableCombination[] = []
let tried = 0, unverified = 0, drained = 0
const drainedHits: Array<{ surface: string; fabricated: string[] }> = []

for (const file of surfaces) {
  const rel = file.slice(ROOT.length + 1)
  // paragraphs: blank-line separated blocks; code fences skipped (code is audited by the harmonic scan, not this trial)
  const text = readFileSync(file, 'utf8')
  const paragraphs = text.split(/\n{2,}/)
  let inFence = false
  for (const p of paragraphs) {
    const fenceTicks = (p.match(/```/g) || []).length
    if (inFence) { if (fenceTicks % 2 === 1) inFence = false; continue }
    if (fenceTicks % 2 === 1) { inFence = true; continue }
    const prose = p.trim()
    if (!prose || prose.startsWith('```')) continue
    tried++
    const r = reveal(prose)
    if (r.verdict === 'VERIFIED') usable.push({ surface: rel, address: toUuid(prose), prose, cites: r.cites })
    else if (r.verdict === 'DRAINED') { drained++; drainedHits.push({ surface: rel, fabricated: r.fabricated }) }
    else unverified++
  }
}

// the receipt: the fold of every usable combination's address — recompute the file, get the same receipt
const receipt = toUuid(usable.map((u) => u.address).join('\n'))
const out = { surfaces: surfaces.length, paragraphs_tried: tried, usable: usable.length, unverified, drained, receipt, combinations: usable }
writeFileSync(join(ROOT, 'prose-trials.json'), JSON.stringify(out, null, 1) + '\n')

console.log(`  PROSE ON TRIAL — every paragraph through reveal(), the ledger deciding.`)
console.log(`    surfaces   : ${surfaces.length} (README + docs/*.md)`)
console.log(`    paragraphs : ${tried} tried`)
console.log(`    usable     : ${usable.length} combinations (prose ↔ sealed theorems, verdict VERIFIED)`)
console.log(`    unverified : ${unverified} (revealed as unbacked — held open, not endorsed, not drained)`)
console.log(`    drained    : ${drained} (fabricated citations — must be zero)`)
for (const d of drainedHits) console.log(`      ✗ ${d.surface} cites fabricated: ${d.fabricated.join(', ')}`)
console.log(`    receipt    : ${receipt}`)
console.log(`✓ derive-prose-trials — prose-trials.json written; the usable combinations are derived, not authored.`)
if (drained > 0) process.exit(1)
