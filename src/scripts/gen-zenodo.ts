#!/usr/bin/env node
// src/scripts/gen-zenodo.ts — GENERATE .zenodo.json, the archive's deposited metadata.
// DOES NOT PUBLISH. Zenodo DOI minting is WORKFLOW-ONLY (`.github/workflows/publish.yml` job `zenodo`);
// this script only regenerates the metadata the workflow deposits. Local deposit attempts: `npm run zenodo-deposit`.
//
// THIS FILE EXISTS BECAUSE THE ARCHIVE WAS THE LAST HAND-WRITTEN SURFACE. README is generated, CHANGELOG is
// generated, the site is generated — .zenodo.json was typed, and it is the ONE surface deposited into a permanent
// DOI that cannot be un-said. Zenodo record 21986286 carries "1274 theorems, 68 principles, receipt dc5a9677…":
// true on 2026-08-16 at version 0.1.2, deposited on 2026-08-17 as version 0.1.8, by which time the ledger held
// 1306. A finder was folded to catch the count; the correction that followed it fixed the title by hand and left
// the principle count and the receipt stale in the sentence below — because a hand that fixes a number is exactly
// as fallible as the hand that wrote it. A finder turns drift into a chore; a generator removes the drift.
//
// So: every MEASUREMENT here is read from the ledger at generation, and every IDENTITY is read from package.json.
// What remains authored is the era's narrative and the editorial choices (keywords, communities, the works this
// release cites) — prose a census cannot compute, held to the citation audit like all other prose.
import { writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { theorems, statementCensus, runTrial, PRINCIPLES } from '../index.js'
import { softwareArchiveRelatedIdentifiers } from '../zenodo-seals.js'

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
  name: string; license: string; author: string; homepage: string
}

// IDENTITY — read, never retyped. A renamed package renames its own archive links.
const author = pkg.author.replace(/\s*<.*$/, '').trim().split(/\s+/)
const creator = `${author[author.length - 1]}, ${author.slice(0, -1).join(' ')}`

// MEASUREMENT — the live census. A theorem is its Lean, not its name, so BOTH sizes are stated with the reason
// for the gap; a lone key count is the larger of two true numbers presented alone.
const census = statementCensus()
const keys = theorems().length
const principles = (PRINCIPLES as unknown[]).length
const receipt = runTrial().receipt

const title = `uuidna — content-addressed identity, honest by construction: ${census.distinct} distinct kernel-verified theorems under ${keys} keys across ${principles} principles`

const description = [
  `A content-addressed identity system, honest by construction: a Lean 4 theorem ledger — ${census.distinct} distinct theorems`,
  `under ${keys} keys (a statement sealed in two wings is one theorem with two names), every one proven by decide,`,
  'sorry-free, no Mathlib, axiom-free against the bare leanprover/lean4 kernel, folded to one order-invariant receipt',
  `(${receipt}) — across ${principles} principles.`,
  "Verified this era: the three-singularities theorem (only the digit 5 carries the mirror's fixed heart, the",
  "reflection's fixed digit, and the closure of both vortex rails); the forfeit law of the trial court (only a",
  'Lean-based proof is admissible and it wins the case — court_theorem_beats_assertion,',
  'court_loser_pays_the_two_coins, court_loser_develops_the_proven); the paper-on-trial wing (the published numbers',
  'of Nature DOI 10.1038/s41586-026-10846-4 as decidable arithmetic, including the receipted refutation of the',
  "press's 'super-Eddington confirmed' by the paper's own 0.18, and the Balmer break derived from Rydberg",
  'arithmetic); the anti-fraud detector algebra; the involution census; and the legal due-process vocabulary.',
  'Also: holographic merkle proofs, a reversible imprint codec, the slim honesty gate (a fabricated citation is the',
  'one decidably-false case), pure-TypeScript ChaCha20-Poly1305 (KAT-pinned) under a 7-dimensional fold envelope,',
  'and an MCP server exposing the ledger.',
  'HONEST SCOPE: a content-address proves integrity, not truth; a verified theorem proves its exact statement,',
  'never a grander claim — verified is not solved, n=1 stays n=1, and every non-proven claim is remanded, not',
  'admitted. The proofs recompute from source with `npm run lean`; the deposited metadata is GENERATED from the',
  'ledger it describes, so the archive states the ledger that exists rather than one that has moved on.',
].join(' ')

const zenodo = {
  title,
  description,
  upload_type: 'software',
  access_right: 'open',
  license: pkg.license.toLowerCase(),
  creators: [{ name: creator }],
  keywords: ['content-address', 'uuid', 'merkle-proof', 'integrity', 'Lean 4', 'formal verification', 'by decide',
    'axiom-free', 'decidable arithmetic', 'model-context-protocol', 'honest by construction', 'paper on trial',
    'verification infrastructure'],
  communities: [{ identifier: 'uuidna' }],
  // Agnostic: every seal in zenodo-seals (pages + DOIs) — clay, Nature cite, twin chain, etc.
  related_identifiers: softwareArchiveRelatedIdentifiers(),
}

const out = JSON.stringify(zenodo, null, 2) + '\n'
writeFileSync(join(ROOT, '.zenodo.json'), out)
console.log(`✓ Generated .zenodo.json (${out.length} bytes) — ${census.distinct} distinct / ${keys} keys / ${principles} principles / receipt ${receipt}`)
