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
import { levelOf } from '../school.js'
import { writeFileSync, readFileSync } from 'node:fs'

interface Gen { file: string; args: string[]; note: string }
// THE MANIFEST — dependency order, the shell chain's order preserved where it existed, orphans folded in at the
// point their inputs are ready. This list is the ONE place generation order is stated.
const GENERATORS: Gen[] = [
  { file: 'gen-mcp.js', args: [], note: 'the served catalog — every later surface reads it' },
  { file: 'gen-apis.js', args: [], note: 'the public API catalog — drained from publicApiRegistry(), no hand-typed /apis' },
  { file: 'gen-packages.js', args: [], note: 'the six workspace surfaces, computed from src/index.ts (guard step 3 rejects drift)' },
  { file: 'gen-zenodo.js', args: [], note: 'the archival record' },
  { file: 'gen-zenodo-seals.js', args: [], note: 'agnostic Zenodo publication seals (manifest + per-id metadata)' },
  { file: 'gen-lines.js', args: [], note: 'the line census' },
  { file: 'gen-search-feed.js', args: [], note: 'most-searched queries ring Lean — new /search-feed route, freeze before handles audit' },
  { file: 'gen-seo-freeze.js', args: [], note: 'FINAL SEO URL freeze — route↔hexbit map; must precede gen-handles (which audits the seal)' },
  { file: 'gen-handles.js', args: [], note: 'the handles the chunks are cut from' },
  { file: 'gen-handle-store.js', args: [], note: 'four-level src/handles from chunks + publication|page' },
  { file: 'gen-handle-chunks.js', args: [], note: 'the chunked handle payloads' },
  { file: 'gen-captain-claims.js', args: [], note: 'the captain claims' },
  // WAS DORMANT while its drain path stayed staged: docs/captain-claims-complete.json sat in DRAIN_PATHS with
  // total_theorems frozen at 1307 while the ledger moved past 2000. Wiring it here is the last of the three
  // "owned by nothing" generators (gen-prose-evidence and gen-handles already ride this manifest).
  { file: 'gen-captain-claims-complete.js', args: [], note: 'the captain claims every sealed key — census-read, never remembered' },
  { file: 'gen-reports.js', args: [], note: 'reports as accounting — computed from the ledger' },
  { file: 'gen-quantum-capacity.js', args: [], note: 'the quantum capacity report — every model one metric, uuidna measured live, sealed with receipt' },
  { file: 'gen-quantum-advantage.js', args: [], note: 'the measured advantage report — reach/cost/fidelity per datapath level on this host' },
  { file: 'gen-expose.js', args: [], note: 'the discovery board — the live coordinates where clusters expose unsealed structure, one uuidna_expose call rendered' },
  { file: 'gen-waves.js', args: [], note: 'the conveyor board — pending, accepted with seals, and the law school roster, from the queue\'s own record' },
  { file: 'gen-unlocks.js', args: [], note: 'the unlock board — every sealed by-decide theorem unlocks its statement; census from theorems()' },
  { file: 'gen-readme.js', args: [], note: 'the published capacity, every figure derived' },
  { file: 'gen-llm.js', args: [], note: 'llm.txt' },
  { file: 'gen-leads.js', args: [], note: 'leads.md' },
  { file: 'gen-terminology.js', args: [], note: 'terminology.json' },
  { file: 'gen-feed.js', args: [], note: 'the feed' },
  { file: 'gen-articles.js', args: [], note: 'the desk’s own writing' },
  { file: 'gen-prose-evidence.js', args: [], note: 'the prose evidence' },
  { file: 'gen-gitattributes.js', args: [], note: 'the generated-file marks' },
  { file: 'gen-school.js', args: [], note: 'the school practices, wings, Clay lessons, and the full leads roster (held, refuted, refused) — every figure recomputed from the ledger, never authored' },
  { file: 'gen-analytics.js', args: [], note: 'the measured metrics' },
  { file: 'gen-song.js', args: [], note: 'the song from the ledger — every bar a Song.lean seal, the WAV exact-integer and content-addressed' },
  { file: 'gen-anthem.js', args: [], note: 'the release anthem — the whole ledger in place, theorem k at bar k, derived from Anthem.lean seals, regrown each release' },
  { file: 'gen-utterances.js', args: [], note: 'the honest LLM\'s corpus — every test title a sentence that must be true or nothing ships' },
  { file: 'gen-symphony.js', args: [], note: 'the ledger symphony — four movements from four sealed sources, minted in the listener\'s browser, alive with every seal' },
  { file: 'gen-evasion.js', args: [], note: 'the evasion ticker — the tricks with their finders and convicting seals, the tape folded live, the board singing its address' },
  { file: 'gen-apps.js', args: [], note: 'the store — shelves derived from the category registry itself' },
  { file: 'gen-open-questions.js', args: [], note: 'the school of open doors — the unverified in topics, involution magnets attached, derived from the springs (held, research, prose, search-feed, support-wave, axiom-hunt)' },
  { file: 'gen-referrer-song.js', args: [], note: 'the referrer song — the doors, the measured walk census, and the site cycle sounded; every claim a Referrer.lean seal' },
  { file: 'gen-store.js', args: [], note: 'the storefront — apps, games, books unified at /store, derived from each shelf' },
  { file: 'gen-os.js', args: [], note: 'the default install — every path\'s exact meaning from the committed Alpine mirror; every claim an Installs.lean seal' },
  { file: 'gen-alpine-overlay.js', args: [], note: 'npm/curl apps ported as Alpine overlay rows (omp/oh-my-pi); merged into catalogue at read time' },
  { file: 'gen-alpine-testing-leads.js', args: [], note: 'edge/testing packages that close latest-stable community deps; named gaps are filled, not kept open' },
  { file: 'browser-apps-usable.js', args: [], note: 'browser usability seal — store mounts + man→app→hexbit + terminal man samples; orphans named, never padded' },
  { file: 'gen-models.js', args: [], note: 'the model comparison over all public live data — every figure\'s honesty class visible; every sealed claim an Models.lean cite' },
  // BEFORE rosetta, and the order is load-bearing: rosetta grants the falsifier leg by finding a theorem's literal
  // key in a test file, so the generated test has to exist before the census counts it. Landed unwired an hour
  // after it was written, which is the orphan class derived-attribute.test.ts exists to catch and could not see —
  // its target is a variable, so the ratchet's literal-only probe looked straight past it — exactly as it looked
  // past gen-captain-claims-complete, whose output went on asserting that no theorem escapes the audit while the
  // ledger outgrew the key count it was counting.
  { file: 'gen-falsifiers.js', args: [], note: 'the falsifier leg for every sealed statement a second implementation can decide — refuses on any FALSE' },
  { file: 'rosetta.js', args: [], note: 'the five-leg census — rewrites src/rosetta-mirror.ts, the surface the hosted edge answers from' },
]

const results: Array<{ file: string; ok: boolean; leaf: string }> = []
const metrics: Array<{ file: string; ms: number; decade: number }> = []
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
  // AND THE METER IS NOW A METRIC (2026-08-24). Printing it named the slow generator and then lost it with the
  // scrollback, so nothing could say whether a generator got slower — the one question a meter exists to answer.
  // Every generator is RECORDED, not just the ones over the line, and the record is reported below.
  // EXACT INTEGER MILLISECONDS, by BigInt division of the nanosecond counter — no float, no Math.*, which the
  // determinism hard-reject forbids here as everywhere (a meter that had to round could not live in this tree).
  const msInt = Number((process.hrtime.bigint() - t0) / 1_000_000n)
  metrics.push({ file: g.file, ms: msInt, decade: levelOf(msInt) })
  if (msInt > 250) console.log(`    · ${g.file} took ${msInt} ms`)
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
// ── THE GENERATOR METRICS — SLOW IS REPORTED, NOT SCROLLED PAST ───────────────────────────────────────────────
// The meter above named a slow generator and then lost it. "Is gen-song getting slower?" was unanswerable, so
// nobody asked it, so a generator could drift from 30ms to 900ms one commit at a time with every run printing a
// line nobody diffed. The record answers it: every generator, its DECADE, and the delta against the last run.
//
// A DECADE IS SEALED, A RAW NUMBER IS LOGGED — gen-quantum-capacity's law, applied here for the same reason:
// wall-clock ms differ every run on every host (gen-song measured 302ms and 499ms an hour apart), so a raw
// figure committed anywhere would dirty the tree on every run and teach everyone to ignore the diff. The decade
// is a property of the GENERATOR; the raw ms is a property of THIS RUN AND THIS MACHINE. Only the first can
// mean anything tomorrow.
//
// The file is GITIGNORED — a timing is state, exactly like the writer lock, never source. It exists so two runs
// can be compared, not so a run can be committed.
const METRICS = join(ROOT, 'generator-metrics.json')
const prev: Record<string, number> = (() => {
  try { return JSON.parse(readFileSync(METRICS, 'utf8')).decades ?? {} } catch { return {} }
})()

const slowest = [...metrics].sort((a, b) => b.ms - a.ms)
const totalMs = metrics.reduce((a, m) => a + m.ms, 0)
// a generator is REPORTED SLOW by its decade, not by a hand-picked threshold: 100ms+ is decade 100 or above.
const slow = slowest.filter((m) => m.decade >= 100)

console.log(`\n    ── generator metrics — ${metrics.length} generators, ${totalMs} ms total (decade sealed, raw logged) ──`)
if (slow.length === 0) console.log('    every generator lands under decade 100 — nothing to name')
for (const m of slow) {
  const was = prev[m.file]
  const move = was === undefined ? 'new' : was === m.decade ? `steady at ${was}` : was < m.decade ? `SLOWER: ${was} → ${m.decade}` : `faster: ${was} → ${m.decade}`
  console.log(`    ${m.file.padEnd(26)} decade ${String(m.decade).padStart(4)}   (raw ${m.ms} ms this run)   ${move}`)
}
// the REGRESSION is the finding: a generator whose decade climbed is named loudly, because that is the whole
// point of keeping the record — the meter that only printed could never have said this.
//
// BOUNDED TO THE SLOW BAND, and that bound was MEASURED, not guessed. The first version fired on any climb and
// immediately cried wolf: gen-prose-evidence.js, a sub-15ms generator, crossed the 10ms line between two runs
// of the same unchanged code and got announced as a regression. Below decade 100 this meter is reading node's
// scheduler, not the generator, and a warning that fires on noise is a warning everyone learns to scroll past —
// the precise failure this record exists to end. So a climb is a finding only where the signal is real.
const regressed = metrics.filter((m) => prev[m.file] !== undefined && m.decade > prev[m.file]! && m.decade >= 100)
if (regressed.length > 0) console.log(`    ⚠ ${regressed.length} generator(s) climbed a decade since the last run: ${regressed.map((m) => m.file).join(', ')}`)

writeFileSync(METRICS, JSON.stringify({
  generators: metrics.length,
  totalMs,
  // the SEALED half — decades only, stable across runs and hosts
  decades: Object.fromEntries(metrics.map((m) => [m.file, m.decade])),
  // the LOGGED half — this run, this machine, explicitly not a fact about the generator
  rawMs: Object.fromEntries(metrics.map((m) => [m.file, m.ms])),
  note: 'decades reseal and are comparable across runs; rawMs is this run on this host only. Gitignored: a timing is state, never source.',
}, null, 2) + '\n')

console.log('\n✓ generate — all generators merged, fused across every dimensional combination, one receipt.')
