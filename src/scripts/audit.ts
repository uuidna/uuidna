#!/usr/bin/env node
// scripts/audit.mjs — THE SELF-AUDIT. uuidna audits itself with its own instruments:
//
//   • THE ROSETTA (the gate) — run `computes()` over every surface the package ships as PROSE (README, the 44
//     MCP tool descriptions, the hand-authored site pages). A `binary:0` is the project's own honesty gate
//     firing on the project's own words — a self-overclaim flagged for review. The rosetta folds Glagolitic to
//     Cyrillic first, so a Slavic proof-boast can't hide from an English read.
//   • THE THEOREMS (the trial) — run `runTrial()` over the Lean-derived ledger, independently RECOMPUTE the
//     receipt, and cross-check the human-authored counts (README, lean/PRINCIPLE.md) against the actual ledger.
//   • THE CIPHER (behavioural) — exercise the shipped crypt surface end to end: round-trip, the documented v1
//     equality leak, its v2 closure, and tamper-rejection — the claims, run.
//
// Every finding is content-addressed; the addresses fold, ORDER-INVARIANTLY, to ONE recomputable audit receipt.
// Recomputable by anyone from this same tree. Integrity.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  computes, runTrial, THEOREMS,
  toUuid, merkleGravity,
  encrypt, decrypt, sealSequence, verifyEnvelope,
} from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { ROOT, rd, relRoot } from './api.js'

const rel = (p: string) => relRoot(p)
const MAX_UNIT = 2000 // cap each prose unit — computes()'s per-match scan is superlinear; bound the input (no DoS)

type Severity = 'high' | 'medium' | 'review'
interface Finding { severity: Severity; arm: string; where: string; note: string; hit: string | null }
const findings: Finding[] = []
const flag = (severity: Severity, arm: string, where: string, note: string, hit?: string | null) => findings.push({ severity, arm, where, note, hit: hit ?? null })

// ── ARM 1 · THE ROSETTA — the gate over the project's own prose ───────────────────────────────────────────────
// A unit is one paragraph / description / visible-text block. computes() is a lexical TRIPWIRE (necessary, not
// sufficient): a hit means "matches a red-flag shape" and is surfaced for human judgement.
const gateUnits = []

// README — prose blocks, skipping fenced code (examples legitimately contain API strings.
{
  const md = rd('README.md')
  let inFence = false
  let block: string[] = []
  const flush = () => { const t = block.join(' ').trim(); if (t) gateUnits.push({ surface: 'README', file: 'README.md', text: t }); block = [] }
  for (const line of md.split('\n')) {
    if (/^```/.test(line)) { flush(); inFence = !inFence; continue }
    if (inFence) continue
    if (line.trim() === '') flush(); else block.push(line.replace(/^#+\s*/, ''))
  }
  flush()
}

// The MCP tool descriptions (+ their parameter descriptions) — the public tool surface's own words, read from the
// SERVED CATALOG rather than from a file. This block used to read a root-level 'mcp.mjs' that no longer exists, so
// it threw ENOENT and killed the whole audit before any arm ran — unnoticed, because audit.js is wired into no npm
// script. Deriving from the catalog cannot drift: the surface audited is the surface served, and the count is never
// typed (it was commented as "the 44 MCP tool descriptions" while the catalog served 170).
for (const t of MCP_CATALOG) {
  if (t.description) gateUnits.push({ surface: 'MCP-tool', file: 'src/mcp.ts', text: t.description })
  const props = (t.inputSchema as { properties?: Record<string, { description?: string }> } | undefined)?.properties ?? {}
  for (const v of Object.values(props)) if (v?.description) gateUnits.push({ surface: 'MCP-param', file: 'src/mcp.ts', text: v.description })
}

// The VitePress-built site pages (the default outDir docs/.vitepress/dist) — strip tags to visible text, split to
// sentences. The page list is DISCOVERED
// ('theorems/index.html') stopped existing when cleanUrls started emitting 'theorems.html' — so the audit silently
// covered half of what it claimed, for as long as nobody looked. A path is not a property; read the directory.
const builtRoot = join(ROOT, 'docs', '.vitepress', 'dist')
const builtPages = existsSync(builtRoot)
  ? readdirSync(builtRoot).filter((f) => f.endsWith('.html')).sort().map((f) => join('docs/.vitepress/dist', f))
  : []                                        // the dist is gitignored — absent means "site not built"
for (const page of builtPages) {
  let html
  try { html = rd(page) } catch { continue }
  const visible = html
    // `</script >` is a legal end tag — HTML permits whitespace before the closing angle. Matching only `</script>`
    // left such a block unstripped, so its JavaScript source would have been counted as VISIBLE PROSE and audited
    // as if a human wrote it (js/bad-tag-filter). The audit reads generated pages, so this is a correctness bug in
    // what the audit measures rather than a way in for an attacker.
    .replace(/<script[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  for (const s of visible.split(/(?<=[.!?])\s+/)) { const t = s.trim(); if (t.length > 3) gateUnits.push({ surface: 'site', file: page, text: t }) }
}

let gateChecked = 0
for (const u of gateUnits) {
  const text = u.text.length > MAX_UNIT ? u.text.slice(0, MAX_UNIT) : u.text
  gateChecked++
  const v = computes(text)
  if (v.binary === 0) flag('review', 'rosetta', u.file, `${u.surface}: gate fired on "${v.hit}"`, text.slice(0, 140))
}

// ── ARM 2 · THE THEOREMS — the trial, recomputed, and the counts cross-checked ────────────────────────────────
const trial = runTrial()
const recomputed = merkleGravity(THEOREMS.map((t) => t.address))
const receiptHolds = recomputed === trial.receipt
if (!receiptHolds) flag('high', 'theorems', 'src/theorems', 'trial receipt does NOT recompute from THEOREMS addresses', `${trial.receipt} ≠ ${recomputed}`)
if (trial.unverified !== 0) flag('high', 'theorems', 'src/theorems', `${trial.unverified} theorem(s) UNVERIFIED`)
if (trial.unverified !== 0) flag('medium', 'theorems', 'src/theorems', `${trial.unverified} theorem(s) UNVERIFIED`)
if (trial.leanBacked !== trial.count) flag('medium', 'theorems', 'src/theorems', `only ${trial.leanBacked}/${trial.count} theorems are Lean-backed`)

// per-file ledger counts, and the human-authored totals that should match them.
const byFile: Record<string, number> = {}
for (const t of THEOREMS) byFile[t.file] = (byFile[t.file] ?? 0) + 1
const claimTotals = new Map()
for (const src of ['README.md', 'lean/PRINCIPLE.md']) {
  let txt = ''
  try { txt = rd(src) } catch { continue }
  for (const m of txt.matchAll(/\*\*(\d{2,4})\s+theorems?\*\*|\b(\d{3,4})\s+theorems?\b/gi)) {
    const n = Number(m[1] ?? m[2]); if (Number.isFinite(n)) claimTotals.set(`${src}:${n}`, { src, n })
  }
}
for (const { src, n } of claimTotals.values()) {
  if (n !== trial.count) flag('medium', 'theorems', src, `claims "${n} theorems" but the ledger holds ${trial.count}`)
}

// ── ARM 3 · THE CIPHER — the crypt claims, run against the shipped surface ─────────────────────────────────────
const P = 'correct horse battery staple'
interface Behav { name: string; ok: boolean }
const behav: Behav[] = []
const assert = (name: string, ok: boolean, detail?: string) => { behav.push({ name, ok }); if (!ok) flag('high', 'cipher', 'src/crypt.ts', `behavioural: ${name} FAILED`, detail) }

try {
  const s1 = encrypt('the honest floor holds', P)
  assert('round-trip: decrypt∘encrypt = id', decrypt(s1, P) === 'the honest floor holds')
  assert('envelope 7d-fold verifies', verifyEnvelope(s1) === true)

  // documented v1 equality leak: two convergent seals of the same plaintext are byte-identical.
  const a = encrypt('repeat', P), b = encrypt('repeat', P)
  assert('v1 convergent equality leak is REAL (documented)', a.ct === b.ct && a.address === b.address, 'v1 seals differ — doc says they must coincide')

  // v2 advancing sequence CLOSES the leak: repeated plaintext seals differently per step.
  const seq = sealSequence(['repeat', 'repeat', 'repeat'], P, 0)
  const cts = new Set(seq.map((s) => s.ct))
  assert('v2 sequence closes the equality leak', cts.size === seq.length && seq.every((s) => s.v === 2))
  assert('v2 seals still round-trip', seq.every((s) => decrypt(s, P) === 'repeat'))

  // tamper-rejection: a flipped ciphertext byte must fail Poly1305 authentication. Flip the FIRST base64 char
  // of ct (a full 6 significant bits.
  let threw = false
  const flip = (c: string) => (c === 'A' ? 'B' : 'A') + s1.ct.slice(1)
  const tampered = { ...s1, ct: flip(s1.ct[0]) }
  try { decrypt(tampered, P) } catch { threw = true }
  assert('tamper (flipped ciphertext byte) is REJECTED', threw)

  // wrong passphrase must fail.
  let wrongThrew = false
  try { decrypt(s1, 'wrong passphrase') } catch { wrongThrew = true }
  assert('wrong passphrase is REJECTED', wrongThrew)
} catch (e) {
  flag('high', 'cipher', 'src/crypt.ts', `behavioural harness threw: ${e instanceof Error ? e.message : String(e)}`)
}

// ── THE FOLD — every finding content-addressed, folded order-invariantly to ONE receipt ───────────────────────
const addressed = findings.map((f) => ({ ...f, address: toUuid(`audit:${f.arm}:${f.where}:${f.note}`) }))
const receipt = merkleGravity(addressed.length ? addressed.map((f) => f.address) : ['clean'])

// ── THE REPORT ────────────────────────────────────────────────────────────────────────────────────────────────
const bySev = (s: Severity) => addressed.filter((f) => f.severity === s)
const line = '─'.repeat(78)
console.log(`\n${line}\n  uuidna self-audit — the rosetta, the theorems, the cipher\n${line}`)
console.log(`\n  ROSETTA (the gate over the project's own prose)`)
console.log(`    prose units checked : ${gateChecked}  (README + ${gateUnits.filter((u) => u.surface === 'MCP-tool').length} MCP descriptions + site)`)
console.log(`    self-overclaims     : ${bySev('review').length}  (gate fired → flagged for human review)`)
console.log(`\n  THEOREMS (the trial)`)
console.log(`    ledger count        : ${trial.count}   verified ${trial.verified} · unverified ${trial.unverified} · lean-backed ${trial.leanBacked}`)
console.log(`    receipt recomputes  : ${receiptHolds ? 'YES ✓' : 'NO ✗'}   ${trial.receipt}`)
console.log(`    count cross-checks  : ${[...claimTotals.values()].map((c) => `${rel(join(ROOT, c.src))}=${c.n}`).join(', ') || '(none found)'}`)
console.log(`\n  CIPHER (behavioural)`)
for (const b of behav) console.log(`    ${b.ok ? '✓' : '✗'} ${b.name}`)
console.log(`\n${line}\n  FINDINGS  (high ${bySev('high').length} · medium ${bySev('medium').length} · review ${bySev('review').length})\n${line}`)
if (!addressed.length) console.log('  none — every automated arm is clean.')
for (const f of (['high', 'medium', 'review'] as Severity[]).flatMap(bySev)) {
  console.log(`  [${f.severity.toUpperCase()}] ${f.arm} · ${f.where}\n     ${f.note}${f.hit ? `\n     ↳ ${f.hit}` : ''}\n     address ${f.address}`)
}
console.log(`\n  AUDIT RECEIPT (order-invariant fold of all finding addresses)\n     ${receipt}\n${line}\n`)

// machine-readable receipt to stdout tail for CI / the site.
const report = {
  receipt,
  rosetta: { checked: gateChecked, overclaims: bySev('review').length },
  theorems: { count: trial.count, verified: trial.verified, unverified: trial.unverified, leanBacked: trial.leanBacked, receipt: trial.receipt, receiptHolds },
  cipher: behav,
  findings: addressed,
}
process.stdout.write('AUDIT_JSON ' + JSON.stringify(report) + '\n')
// non-zero exit iff a hard (high/medium) finding fired — the gate's own review hits do not fail the build.
process.exit(bySev('high').length + bySev('medium').length > 0 ? 1 : 0)
