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
/** ORCID iD — the author's persistent identifier, bare (no https:// prefix), which is the form Zenodo expects. */
const ORCID = '0009-0000-7312-9778'

// MEASUREMENT — the live census. A theorem is its Lean, not its name, so BOTH sizes are stated with the reason
// for the gap; a lone key count is the larger of two true numbers presented alone.
const census = statementCensus()
const keys = theorems().length
const principles = (PRINCIPLES as unknown[]).length
const receipt = runTrial().receipt

// THE TITLE IS STABLE; THE CENSUS IS IN THE DESCRIPTION. Measured 2026-09-12 on the live records: 17 versions of
// this archive carried 9 different titles, because the census was appended to the title. A citation names a work
// by its title, and a title that moves every release is nine works to a registry and to a reader. The census
// still states the ledger that exists — in the first sentence of the description, and in `version` — so the
// archive stays exact without the title changing under a citation.
const title = 'uuidna — content-addressed identity, honest by construction'

// THE DESCRIPTION IS DERIVED, NOT NARRATED. An earlier form carried a hand-typed "verified this era" paragraph
// inside this generator — manual text in a generated surface, stale the release after it was written. What is
// stated now is what the ledger measures (census, keys, principles, receipt) and what the tree ships.
const description = [
  `A content-addressed identity system, honest by construction: a Lean 4 theorem ledger of ${census.distinct} distinct theorems`,
  `under ${keys} keys (a statement sealed in two wings is one theorem with two names), every one proven by decide,`,
  'sorry-free, without Mathlib, axiom-free against the bare leanprover/lean4 kernel, folded to one order-invariant receipt',
  `(${receipt}), across ${principles} principles.`,
  'The package ships holographic merkle proofs, a reversible imprint codec, the slim honesty gate (a fabricated',
  'citation is the one decidably-false case), pure-TypeScript ChaCha20-Poly1305 pinned to known-answer tests, and',
  'an MCP server exposing the ledger.',
  'A content-address proves integrity, not truth; a verified theorem proves its exact statement and never a grander',
  'claim. The proofs recompute from source with `npm run lean`; this metadata is generated from the ledger it',
  'describes, so the archive states the ledger that exists rather than one that has moved on.',
].join(' ')

// THE TWO CHAINS CROSS-DECLARE, AND THIS FILE IS READ BY THE SYNC CHAIN. The committed .zenodo.json is what the
// GitHub↔Zenodo sync deposits on its own chain (21970356); publish.yml's API deposit lands on the standing chain
// (21787143) and swaps the identifier back with jq. Measured 2026-09-12 on the live records: every version on BOTH
// chains declared isIdenticalTo 21970356, so the sync chain pointed at itself and nothing on Zenodo led from it to
// the standing chain. The registry keeps 21970356 (ownership is read from there); the deposited file names the
// OTHER chain, which is what "identical to" means.
const STANDING_CHAIN = '10.5281/zenodo.21787143'
const SYNC_CHAIN = '10.5281/zenodo.21970356'
const related_identifiers = softwareArchiveRelatedIdentifiers().map((r) =>
  r.identifier === SYNC_CHAIN && r.relation === 'isIdenticalTo' ? { ...r, identifier: STANDING_CHAIN } : r)

const zenodo = {
  title,
  description,
  upload_type: 'software',
  access_right: 'open',
  license: pkg.license.toLowerCase(),
  // THE ORCID IS THE AUTHOR'S PERSISTENT IDENTIFIER, and it belongs beside the name for the same reason a DOI
  // belongs beside a release: a name is ambiguous across archives and an iD is not. Zenodo resolves it against
  // ORCID's own registry, so a deposit made under this record is attributable without a human matching strings.
  // Recorded once, here, because .zenodo.json is DERIVED — editing the file would be overwritten on the next
  // generation, and the identity would silently revert on a release nobody was watching.
  creators: [{ name: creator, orcid: ORCID }],
  // KEYWORDS ARE SUBJECTS. The `related:<id>` and `prior-art-credited` tags that used to sit here duplicated
  // related_identifiers in a field registries index as subject terms; they are gone, the links stay machine-readable.
  keywords: ['content-address', 'uuid', 'merkle-proof', 'integrity', 'Lean 4', 'formal verification', 'by decide',
    'axiom-free', 'decidable arithmetic', 'model-context-protocol', 'honest by construction',
    'verification infrastructure'],
  communities: [{ identifier: 'uuidna' }],
  // Agnostic: every seal in zenodo-seals (pages + DOIs) — clay, Nature cite, twin chain, etc.
  related_identifiers,
  notes:
    'License CC BY-NC-ND 4.0 — https://uuidna.com/license. Metadata generated from the ledger by ' +
    'src/scripts/gen-zenodo.ts at release time; the proofs recompute with `npm run lean`.',
}

const out = JSON.stringify(zenodo, null, 2) + '\n'
writeFileSync(join(ROOT, '.zenodo.json'), out)
console.log(`✓ Generated .zenodo.json (${out.length} bytes) — ${census.distinct} distinct / ${keys} keys / ${principles} principles / receipt ${receipt}`)
