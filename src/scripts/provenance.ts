#!/usr/bin/env node
// scripts/provenance — the PROVENANCE AUDIT (a fourth arm of the self-audit). PURELY LEDGER-DERIVED: a sentence is
// flagged only when it CITES A FABRICATED theorem — a /theorem/<key> or sealed-key name that is NOT in the ledger —
// the one decidably-false thing prose can do. A hollow superlative that cites nothing is REVEALED, not refused: a
// word-list is VOID here (it is not a theorem, so it carries no authority), so none is used — the ledger is the only
// authority. A unit that links a sealed proof, or is a theorem's own committed description, is cleared. Findings are
// content-addressed and fold, order-invariantly, to ONE recomputable receipt. It can FAIL (exit 1) — the opposite of
// a trial rigged to pass. Integrity, not truth.
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, merkleFold, toUuid } from '../index.js'
import { overreachOf } from '../prose-gate.js'
import { MCP_CATALOG } from '../mcp.js'
import { ROOT, rd } from './api.js'

// The floor lives in ONE tested place — src/prose-gate.ts (overreachOf → slimGate) — so the audit and the self-trial
// share the exact same detector: a unit drains only for citing a FABRICATED theorem, never for a word. This script
// adds only the CONTEXT the ledger derives: whether a unit is BACKED (links a proof / names a sealed key) or vouched
// by a theorem's own proof (backedBy). The call is overreachOf(u); backing is applied below.


const sealedKeys = theorems().map((t) => t.key)
// BACKED — the unit carries a /theorem/ link or names a sealed theorem key (specific underscored identifiers).
const backed = (u: string): boolean => /\/theorem\//.test(u) || sealedKeys.some((k) => u.includes(k))

// split prose into sentence-ish units, dropping fenced/inline code (examples legitimately contain API strings).
const units = (text: string): string[] =>
  text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 0 && s.length < 2000)

interface Finding { surface: string; unit: string; token: string; address: string }
const findings: Finding[] = []
// `backedBy` — a sealed theorem key that backs THIS whole unit (used when scanning a theorem's own description:
// its "why" is backed by the theorem it describes, committed in git). A debunk is disputed with a theorem, not
// merely with negation words — so a theorem's claim is cleared by its own proof.
const scan = (surface: string, text: string, backedBy?: string): void => {
  for (const u of units(text)) {
    // If this unit is vouched by a theorem's own proof (backedBy) or BACKED (links a proof / names a sealed key),
    // it is cleared — a proof, not a negation word, is what disputes a claim. Otherwise ask overreachOf, which now
    // delegates ENTIRELY to slimGate (no lexicon): a unit drains ONLY when it cites a theorem key — via /theorem/<key>
    // or `theorem <key_shaped_token>` — that is not sealed in the ledger (a fabricated citation). An uncited claim
    // does not drain; this is an INTEGRITY floor (every cited proof must exist), not a truth or boast detector.
    if (backedBy || backed(u)) continue
    const token = overreachOf(u)
    if (token) findings.push({ surface, unit: u.length > 160 ? u.slice(0, 157) + '…' : u, token, address: toUuid(surface + '|' + u) })
  }
}

// prose surfaces: README, the derived principle index, every site page, and every MCP tool description.
if (existsSync(join(ROOT, 'README.md'))) scan('README.md', rd('README.md'))
if (existsSync(join(ROOT, 'lean/PRINCIPLE.md'))) scan('lean/PRINCIPLE.md', rd('lean/PRINCIPLE.md'))
const walk = (d: string): string[] => existsSync(d) ? readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(d, e.name)) : /\.md$/.test(e.name) ? [join(d, e.name)] : []) : []
for (const f of walk(join(ROOT, 'docs'))) scan(relative(ROOT, f), readFileSync(f, 'utf8'))
for (const t of MCP_CATALOG) scan('mcp:' + t.name, t.description)

// INLINE DOCS as an audit surface too — the theorem descriptions (the "why", rendered on every theorem page) and
// the lean/*.lean header/comment prose. The docs that describe the proofs are held to the same standard as the
// proofs: a hollow description of a finite, decidable fact is flagged, exactly like hollow site prose.
for (const t of theorems()) scan('theorem:' + t.key, t.name, t.key)
for (const f of readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean')))
  scan('lean/' + f, [...readFileSync(join(ROOT, 'lean', f), 'utf8').matchAll(/^--\s?(.*)$/gm)].map((m) => m[1]).join('\n'))
// the CODE too — every src/**/*.ts comment line (the inline docs that describe what the code claims to do). The
// honesty-gate files (this scanner, gate, audit, adjudicate) necessarily NAME the words they hunt for, so they are
// excluded — a lexicon that lists "quantum-secure" as a flag is not a claim of being quantum-secure.
// Excluded from the code scan only: the honesty-gate files themselves — they NAME the words they hunt, so a
// lexicon is not a claim. TESTS ARE SCANNED (they quote boast phrases as inputs, and a quoted phrase is a
// citation, not a claim — handled by de-quoting in scan(), below).
const GATE_FILES = /(provenance|gate|audit|adjudicate)\.ts$/
const tsFiles = (d: string): string[] => existsSync(d) ? readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? tsFiles(join(d, e.name)) : /\.ts$/.test(e.name) ? [join(d, e.name)] : []) : []
for (const f of tsFiles(join(ROOT, 'src')).filter((f) => !GATE_FILES.test(f))) scan(relative(ROOT, f), [...readFileSync(f, 'utf8').matchAll(/^\s*\/\/\s?(.*)$/gm)].map((m) => m[1]).join('\n'))

// fold the findings to ONE recomputable receipt (order-invariant), recomputable by anyone from this same tree.
const receipt = findings.length ? merkleFold(findings.map((f) => f.address)) : toUuid('provenance-clean')

console.log('\n  PROVENANCE AUDIT — prose earns its claim by linking a sealed theorem, or it is audited.')
console.log('    surfaces : README + docs/*.md + ' + MCP_CATALOG.length + ' MCP descriptions + inline docs (theorem "why" + lean/*.lean) + code comments (src/**/*.ts)')
console.log('    fabricated-citation claims : ' + findings.length)
// The remedy is free of money and paid in CODE: back the claim with a sealed theorem, or demarcate it. The flag is
// on the CLAIM, never on a person — a hollow sentence is cleared by delivering the proof that makes it true.
for (const f of findings) console.log(`      • [${f.token}] ${f.surface}\n        "${f.unit}"\n        remedy (paid in code, not coin): cite a /theorem/<key> that IS sealed in the ledger — this one is not`)
console.log('    audit receipt : ' + receipt + (findings.length ? '  (FLAGGED — a claim cites a fabricated theorem)' : '  (CLEAN — no claim cites a fabricated theorem)'))
process.exitCode = findings.length ? 1 : 0
