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
// one level deep: the top-level pages AND the computed sub-wings (docs/articles/ — the desk tries its own
// writing), skipping the VitePress internals (.vitepress) and served templates
for (const f of readdirSync(DOCS, { withFileTypes: true })) {
  if (f.isFile() && f.name.endsWith('.md')) surfaces.push(join(DOCS, f.name))
  else if (f.isDirectory() && !f.name.startsWith('.') && f.name !== 'theorem' && f.name !== 'publications')
    for (const g of readdirSync(join(DOCS, f.name)).sort()) if (g.endsWith('.md')) surfaces.push(join(DOCS, f.name, g))
}
surfaces.sort()

const usable: UsableCombination[] = []
let tried = 0, unverified = 0, drained = 0
const drainedHits: Array<{ surface: string; fabricated: string[] }> = []
// THE COIN LAW FINDER — the coins are explained in detail ONLY by theorems: they are two, conserved (sealed as
// two_coins, coin_is_one_qubit, captain_coins_respected_at_scale). A prose paragraph claiming any OTHER coin
// quantity ("earn 2500+ coins" — the retired currency era) must cite a sealed theorem in the same paragraph or
// the desk names it and refuses. N ∈ {0, 2} passes (the sealed denominations: free, and the two); "two coins"
// in words always passes; everything else is the chaos, structurally unable to return.
const COIN_CLAIM = /\b(\d[\d,]*)\s*\+?\s*coins?\b/gi
const coinChaos: Array<{ surface: string; claim: string }> = []
// THE PHYSICS-CLAIM FINDER — same shape as the coin law ("why are the gates so loose?" — loose by sealed
// verdict: the lexical gate drained honest prose and was folded to the fabricated-citation question; where a
// claim-shape IS decidable, a TARGETED finder holds the line instead of a lexicon). THE LEAN FORM ("explicitly
// denying is not lean — lean CONFIRMS instead of denying"): a prose paragraph mentioning quantum speedup or
// advantage passes ONLY by citing a sealed theorem — the positive confirmation of what IS (the classical bound,
// n_qubit_dimension) — never by adverbs of absence; "no advantage" is prose, a citation is a proof.
const PHYSICS_CLAIM = /quantum\s+(speedup|speed-up|advantage|supremacy)|faster\s+than\s+classical/gi
const physicsChaos: Array<{ surface: string; claim: string }> = []

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
    // the coin law: a numeric coin claim outside the sealed denominations {0, 2} must carry a sealed citation
    for (const m of prose.matchAll(COIN_CLAIM)) {
      const n = Number((m[1] ?? '').replace(/,/g, ''))
      if (n !== 0 && n !== 2 && r.cites.length === 0) coinChaos.push({ surface: rel, claim: m[0] + ' — uncited' })
    }
    // the physics-claim law, lean form: only a sealed CONFIRMATION passes — denial words carry no weight
    for (const m of prose.matchAll(PHYSICS_CLAIM)) {
      if (r.cites.length === 0) physicsChaos.push({ surface: rel, claim: m[0] + ' — uncited (denial is prose; cite the sealed bound)' })
    }
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
if (coinChaos.length) {
  console.log(`    coin law   : ✗ ${coinChaos.length} uncited numeric coin claim(s) outside the sealed denominations {0, 2}:`)
  for (const c of coinChaos) console.log(`      ✗ ${c.surface}: "${c.claim}" — the coins are explained ONLY by theorems (two_coins); cite one or fold the claim`)
} else {
  console.log(`    coin law   : ✓ every numeric coin claim is a sealed denomination or carries its citation`)
}
if (physicsChaos.length) {
  console.log(`    physics law: ✗ ${physicsChaos.length} undemarcated quantum-advantage claim(s):`)
  for (const c of physicsChaos) console.log(`      ✗ ${c.surface}: "${c.claim}" — deny it, bound it, or cite the sealed boundary (n_qubit_dimension)`)
} else {
  console.log(`    physics law: ✓ every quantum-advantage mention is demarcated or cited — the honest boundary holds`)
}
console.log(`✓ derive-prose-trials — prose-trials.json written; the usable combinations are derived, not authored.`)
if (drained > 0 || coinChaos.length > 0 || physicsChaos.length > 0) process.exit(1)
