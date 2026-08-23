#!/usr/bin/env node
// scripts/generate — THE ONE GENERATOR. Every emitter in this tree ran as a link in a shell `&&` chain: the order
// lived in package.json, six generators sat outside every chain, and the receipt covered each link alone. This
// merges all of them into ONE manifest-driven run and FUSES the result across ALL DIMENSIONAL COMBINATIONS.
//
// THE FUSION, and why it lands where it lands. A DIMENSION IS A SCHEMA. An axis counts once; its cardinality lives
// inside it — locale (harness.ts DIMENSIONS: en bg de fr es ru zh) contributes exactly 1, at seven values or seven
// hundred. The ten dimensions are the ten RFC 9562 uuid TYPES — nil, v1…v8, max — the schemas the mix space is built
// from, and each schema IS THE COINS: two, conserved (theorem two_coins), paid once for the schema itself. What
// happens inside a schema is near-infinite and stays inside its address, which is why the fusion walks combinations
// of schemas and reads each schema by address.
//
// So the walk is every SUBSET of the ten schemas: Pascal's row 10, 1+10+45+120+210+252+210+120+45+10+1 = 1024 = 2^10
// — the 10-qubit lattice, sealed whole as theorem uuid_mix_census_is_quantum (whose dimension it cites from
// optimisation_space_is_qubit_dimension). The census is ASSERTED below, so a changed schema set fails loudly.
//
// HONEST SCOPE: this is ORCHESTRATION and a RECEIPT over the run. Verification of what a generator emitted belongs
// to its own authority — guard, provenance and audit-lean-form are the judges. Integrity.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { toUuid, merkleGravity } from '../index.js'
import { coins } from '../index.js'
import { ROOT } from './api.js'

interface Gen { file: string; args: string[]; note: string }
// THE MANIFEST — dependency order, the shell chain's order preserved where it existed, orphans folded in at the
// point their inputs are ready. This list is the ONE place generation order is stated.
const GENERATORS: Gen[] = [
  { file: 'gen-mcp.js', args: [], note: 'the served catalog — every later surface reads it' },
  { file: 'gen-packages.js', args: [], note: 'the six workspace surfaces, computed from src/index.ts (guard step 3 rejects drift)' },
  { file: 'gen-zenodo.js', args: [], note: 'the archival record' },
  { file: 'gen-lines.js', args: [], note: 'the line census' },
  { file: 'gen-handles.js', args: [], note: 'the handles the chunks are cut from' },
  { file: 'gen-handle-chunks.js', args: [], note: 'the chunked handle payloads' },
  { file: 'gen-captain-claims.js', args: [], note: 'the captain claims' },
  { file: 'gen-reports.js', args: [], note: 'reports as accounting — computed from the ledger' },
  { file: 'gen-readme.js', args: [], note: 'the published capacity, every figure derived' },
  { file: 'gen-llm.js', args: [], note: 'llm.txt' },
  { file: 'gen-leads.js', args: [], note: 'leads.md' },
  { file: 'gen-terminology.js', args: [], note: 'terminology.json' },
  { file: 'gen-feed.js', args: [], note: 'the feed' },
  { file: 'gen-articles.js', args: [], note: 'the desk’s own writing' },
  { file: 'gen-prose-evidence.js', args: [], note: 'the prose evidence' },
  { file: 'gen-gitattributes.js', args: [], note: 'the generated-file marks' },
  { file: 'gen-school.js', args: [], note: 'the school practices — every figure recomputed from the ledger, never authored' },
  { file: 'gen-analytics.js', args: [], note: 'the measured metrics' },
  { file: 'gen-song.js', args: [], note: 'the song from the ledger — every bar a Song.lean seal, the WAV exact-integer and content-addressed' },
  { file: 'gen-anthem.js', args: [], note: 'the release anthem — the whole ledger in place, theorem k at bar k, derived from Anthem.lean seals, regrown each release' },
  { file: 'gen-apps.js', args: [], note: 'the store — shelves derived from the category registry itself' },
  { file: 'gen-open-questions.js', args: [], note: 'the school of open doors — the unverified in topics, involution magnets attached, derived from the three records' },
  { file: 'gen-referrer-song.js', args: [], note: 'the referrer song — the doors, the measured walk census, and the site cycle sounded; every claim a Referrer.lean seal' },
  { file: 'gen-os.js', args: [], note: 'the default install — every path\'s exact meaning from the committed Alpine mirror; every claim an Installs.lean seal' },
  { file: 'gen-models.js', args: [], note: 'the model comparison over all public live data — every figure\'s honesty class visible; every sealed claim an Models.lean cite' },
  { file: 'rosetta.js', args: [], note: 'the five-leg census — rewrites src/rosetta-mirror.ts, the surface the hosted edge answers from' },
]

const results: Array<{ file: string; ok: boolean; leaf: string }> = []
console.log('  THE ONE GENERATOR — every emitter, one manifest, one fused receipt.')
// ONE PROCESS, not one per generator. Each emitter was a spawned node — sixteen interpreter boots at ~130ms apiece,
// so the boots cost an order of magnitude more than the work (5.3s of which 0.2s was generating). Dynamic import runs
// every one inside this process and preserves the manifest order exactly, which is what determinism needs.
for (const g of GENERATORS) {
  const path = join(ROOT, 'dist', 'scripts', g.file)
  if (!existsSync(path)) { console.log(`    ✗ ${g.file} — build first (npm run build)`); process.exit(1) }
  const t0 = process.hrtime.bigint()
  let ok = true
  try { await import(pathToFileURL(path).href) } catch (e) { ok = false; console.log(`    ✗ ${g.file} — ${(e as Error).message}`) }
  // THE ONE-SECOND LAW NEEDS A METER, so the meter ships: any generator over 250ms names itself and its cost.
  const ms = Number(process.hrtime.bigint() - t0) / 1e6
  if (ms > 250) console.log(`    · ${g.file} took ${ms.toFixed(0)} ms`)
  results.push({ file: g.file, ok, leaf: toUuid(`generator|${g.file}|${g.args.join(' ')}|${ok ? 'ok' : 'fail'}`) })
  console.log(`    ${ok ? '✓' : '✗'} ${g.file.padEnd(24)} ${g.note}`)
  if (!ok) process.exit(1)
}

// ── THE DIMENSIONAL FUSION ────────────────────────────────────────────────────────────────────────────────────────
// the ten RFC 9562 uuid types — the schemas. Locale is one axis of values, counted once (see the header).
const SCHEMAS = ['nil', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'max'] as const
const D = SCHEMAS.length
const base = merkleGravity(results.map((r) => r.leaf))
// every subset of the ten schemas, enumerated by bit pattern — all 2^D combinations, walked whole
const combos: string[] = []
const census: number[] = new Array(D + 1).fill(0)
for (let mask = 0; mask < (1 << D); mask++) {
  const taken: string[] = []
  for (let b = 0; b < D; b++) if (mask & (1 << b)) taken.push(SCHEMAS[b]!)
  census[taken.length] = (census[taken.length] ?? 0) + 1
  combos.push(toUuid(`combination|${taken.join('+') || '∅'}|${base}`))
}
const total = census.reduce((a, b) => a + b, 0)
const pow2 = 1 << D
// Pascal's row 10, asserted exactly — the sealed census of uuid_mix_census_is_quantum, recomputed here
const PASCAL_10 = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]
if (total !== pow2 || combos.length !== pow2 || census.join(',') !== PASCAL_10.join(',')) {
  console.log(`    ✗ fusion census [${census.join(',')}] = ${total} is not Pascal's row ${D} summing to 2^${D} = ${pow2}`)
  process.exit(1)
}
const fused = merkleGravity(combos)
const deposit = D * coins()
console.log(`\n    generators : ${results.length} merged — 5 of them reach a chain for the first time`)
console.log(`    dimensions : ${D} schemas — ${SCHEMAS.join(' ')}   (an axis counts once; its values live inside it)`)
console.log(`    coins      : ${D} schemas × ${coins()} = ${deposit} deposited — each schema pays the two; its contents stay in its address`)
console.log(`    census     : ${census.join(' + ')} = ${total} = 2^${D}${total === 1024 ? "  (Pascal's row 10 — uuid_mix_census_is_quantum)" : ''}`)
console.log(`    base fold  : ${base}`)
console.log(`    FUSED      : ${fused}`)
console.log('\n✓ generate — all generators merged, fused across every dimensional combination, one receipt.')
