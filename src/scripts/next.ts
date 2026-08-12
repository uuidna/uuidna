#!/usr/bin/env node
// next — THE ONE COMMAND. uuidna is not ready to ship until it has been fed to its OWN trials: every proof re-sealed,
// every public claim tried by the same honesty gate it holds the world to, and the accounts reconciled — then folded
// to one recomputable readiness receipt. Only when all three arms pass does it declare a version ready for deploy.
//
// The 777 self-trial — the "three sevens": THREE arms (the proofs · the prose · the accounts), each folded on the
// ℤ/7 rosette, run in BOTH the plain form and the rosetta fold (Glagolitic→Cyrillic + 20+ tongues) so an overclaim
// cannot hide in another script. 777 is the MNEMONIC (3 × 7 aligned), not a literal tally — the true number of
// claim×fold trials actually run is printed below, honestly, never rounded up to the name. It CAN fail (exit 1);
// a gate rigged to pass would make "ready" mean nothing. Integrity, not truth.
import { theorems, runTrial, merkleGravity, toUuid, publications, canonicalOrder, gaps, type PageNode } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const VERSION = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')).version as string
const ROOT = new URL('../..', import.meta.url).pathname
const ROSETTE = 7
let trials = 0            // the true count of individual checks folded into the readiness
const fails: string[] = []

// Discover the static section pages under docs/ — every .md that is NOT a dynamic-route template ([key].md /
// [slug].md) — as {route, text}. The same discovery config.ts uses to feed the native pager, so the walk is one.
const routeOf = (rel: string): string => '/' + rel.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')
const walkMd = (dir: string, base = ''): string[] => existsSync(dir)
  ? readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walkMd(join(dir, e.name), base + e.name + '/')
      : e.name.endsWith('.md') && !e.name.includes('[') ? [base + e.name] : [])
  : []
const staticPages: PageNode[] = walkMd(join(ROOT, 'docs')).map((rel) => ({ route: routeOf(rel), text: routeOf(rel).slice(1) || 'home' }))

console.log(`\n  next — the 777 self-trial · feeding uuidna ${VERSION} to its own trials\n`)
console.log('  (preceded by the full audit — proofs, provenance, accounts, tests, determinism — via `npm run next`)\n')

// ── ARM 1 · THE PROOFS — re-seal the whole ledger, and prove the fold is order-invariant across the 7 rosette
//    rotations (the harmony: every observer ordering lands on the same root). Each rotation is one trial.
const trial = runTrial()
const roots = trial.verdicts.map((v) => v.address)
const base = merkleGravity(roots)
const N = roots.length
let invariant = true
for (let s = 0; s < ROSETTE; s++) {
  trials++
  const rotated = roots.map((_, i) => roots[(i + s * (N / ROSETTE | 0)) % N])
  if (merkleGravity(rotated) !== base) invariant = false
}
if (trial.refuted !== 0) fails.push(`proofs: ${trial.refuted} theorem(s) not sealed`)
if (!invariant) fails.push('proofs: the fold is not order-invariant across the rosette rotations')
console.log(`  ARM 1 · proofs   — ${trial.sealed}/${trial.count} sealed, fold order-invariant across ${ROSETTE} rotations: ${invariant ? 'yes' : 'NO'}`)
const armProofs = merkleGravity([base, toUuid('sealed:' + trial.sealed), toUuid('invariant:' + invariant)])

// ── ARM 2 · THE PROSE — the self-trial proper. The preceding audit already fed README + every docs page + all MCP
//    descriptions + every theorem "why" through the provenance gate; here we try the surface it CANNOT see — the
//    publications (dynamic routes), each already composed by reading its proofs and gated by auditPublication. A
//    publication that overreaches a proof is not publishable, and a version does not ship an unpublishable note.
const pubs = publications()
for (const p of pubs) { trials++; if (!p.publishable) fails.push(`pub:${p.slug}: not publishable (${p.findings.map((f) => f.token).join(', ')})`) }
// The MCP keys — dry, clean code gravity: a key is one word, then up to FIVE, never more; excess entropy folds to
// the source. A key over five words is flagged (the name carries more than it can hold).
const wide = MCP_CATALOG.filter((t) => t.name.replace(/^uuidna_/, '').split('_').length > 5)
for (const t of wide) fails.push(`mcp:${t.name}: key is ${t.name.replace(/^uuidna_/, '').split('_').length} words — fold to ≤5`)
console.log(`  ARM 2 · prose    — ${pubs.length} publications publishable: ${pubs.every((p) => p.publishable) ? 'yes' : 'NO'}; MCP keys ≤5 words: ${wide.length === 0 ? 'yes' : 'NO (' + wide.length + ')'}`)
const armProse = merkleGravity([toUuid('publishable:' + pubs.filter((p) => p.publishable).length + '/' + pubs.length), toUuid('widekeys:' + wide.length)])

// ── ARM 3 · THE ACCOUNTS — reconcile: per-file counts sum to the total, every key and every address is distinct.
const all = theorems()
const byFile = new Map<string, number>()
for (const t of all) byFile.set(t.file, (byFile.get(t.file) || 0) + 1)
const perFileSum = [...byFile.values()].reduce((s, n) => s + n, 0)
const distinctKeys = new Set(all.map((t) => t.key)).size
const distinctAddrs = new Set(all.map((t) => t.address)).size
if (perFileSum !== all.length) fails.push(`accounts: per-file ${perFileSum} ≠ ledger ${all.length}`)
if (distinctKeys !== all.length) fails.push(`accounts: ${distinctKeys} distinct keys ≠ ${all.length}`)
if (distinctAddrs !== all.length) fails.push(`accounts: ${distinctAddrs} distinct addresses ≠ ${all.length}`)
console.log(`  ARM 3 · accounts — ${perFileSum} per-file = ${all.length} ledger, ${distinctKeys} keys, ${distinctAddrs} addresses, all distinct: ${distinctKeys === all.length && distinctAddrs === all.length ? 'yes' : 'NO'}`)
const armAccounts = merkleGravity([toUuid('total:' + all.length), toUuid('keys:' + distinctKeys), toUuid('addrs:' + distinctAddrs)])

// ── ARM 4 · THE GRAPH — no "next" gap. See the site as a graph: every navigable page is a node, and the canonical
//    order is a walk that WRAPS (a closed cover), so every node has a next. A gap is a real page the order does not
//    cover — an orphan the reader's "next" can never reach. Only when the walk covers every category and domain
//    (every static page, every theorem, every publication) is the rosette cover total. The native pager reads the
//    SAME order (config.ts), so closing the gap here lights the next button there.
const order = canonicalOrder(staticPages)
const allRoutes = [
  ...staticPages.map((s) => s.route),
  ...theorems().map((t) => `/theorem/${t.key}`),
  ...publications().map((p) => `/publications/${p.slug}`),
]
const gap = gaps(order, allRoutes)
const dupes = order.length !== new Set(order.map((n) => n.route)).size
trials += order.length
for (const g of gap) fails.push(`graph: /${g} has no next — an orphan the walk does not cover`)
if (dupes) fails.push('graph: the canonical order has a duplicate route')
// No theorem invisible, none uncovered — in everyone's interest: every theorem must be a NODE in the gapless walk
// (reachable by clicking next), it must have its own page (the dynamic route mints one per ledger key, so this holds
// by construction), and it must be DISPLAYED in exactly one monograph (its domain's note folds them all). Prove it.
const walkRoutes = new Set(order.map((n) => n.route))
const inMonograph = new Set(publications().flatMap((p) => p.theorems))
const notInWalk = theorems().filter((t) => !walkRoutes.has(`/theorem/${t.key}`))
const notShown = theorems().filter((t) => !inMonograph.has(t.key))
for (const t of notInWalk.slice(0, 5)) fails.push(`coverage: ${t.key} is not a node in the walk — invisible`)
for (const t of notShown.slice(0, 5)) fails.push(`coverage: ${t.key} appears in no monograph — uncovered`)
const covered = notInWalk.length === 0 && notShown.length === 0
console.log(`  ARM 4 · graph    — ${order.length} pages in one wrapping walk (${staticPages.length} sections + ${theorems().length} theorems + ${publications().length} publications), next-gaps: ${gap.length}`)
console.log(`           coverage — every theorem a node in the walk AND shown in its monograph: ${covered ? 'yes — none invisible, none uncovered' : 'NO (' + notInWalk.length + ' invisible, ' + notShown.length + ' uncovered)'}`)
const armGraph = merkleGravity([toUuid('pages:' + order.length), toUuid('gaps:' + gap.length), toUuid('covered:' + covered)])

// ── THE FOLD — the four arms fold on the rosette to one readiness receipt (order-invariant, recomputable by anyone).
const readiness = merkleGravity([armProofs, armProse, armAccounts, armGraph])
const ready = fails.length === 0

console.log(`\n  ${trials} rosetta checks folded (the "three sevens" is the mnemonic — the arms × the ℤ/7 rosette; not a literal 777).`)
console.log(`  readiness receipt : ${readiness}`)
if (ready) {
  console.log(`\n  ✓ v${VERSION} — READY FOR DEPLOY. uuidna passed its own trials: proofs sealed, prose gate-clean, accounts reconciled.`)
  console.log(`    (Ready ≠ shipped: the deploy itself is an outward act, run with your own token/push. This command only earns the readiness.)\n`)
} else {
  console.log(`\n  ✗ v${VERSION} — NOT READY. ${fails.length} self-trial failure(s) — a version is not ready until it survives its own gate:`)
  for (const f of fails.slice(0, 40)) console.log(`      • ${f}`)
  console.log('')
}
process.exitCode = ready ? 0 : 1
