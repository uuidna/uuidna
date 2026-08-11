#!/usr/bin/env node
// scripts/provenance — the PROVENANCE AUDIT (a fourth arm of the self-audit). An honest-prose gate: any sentence
// that leans on a HOLLOW superlative — quantum-secure, unbreakable, infinite(ly), FTL, keyless-secure, production-
// grade, untraceable … — is flagged REVIEW *unless* it is DEMARCATED (negated: not / never / no / honest /
// simulation / finite) OR BACKED (it names a SEALED theorem key or carries a /theorem/ link). Prose earns its
// claim by pointing at a proof, or it is audited until it does. Findings are content-addressed and fold, order-
// invariantly, to ONE recomputable receipt. It can FAIL (exit 1) — the opposite of a trial rigged to pass.
// Integrity, not truth.
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, merkleFold, toUuid } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const rd = (p: string) => readFileSync(join(ROOT, p), 'utf8')

// the hollow lexicon — superlatives that assert a property no prose can settle; each must be BACKED or demarcated.
const HOLLOW = /\b(quantum[- ]?secure|quantum[- ]?speed|computes at once|instantaneous(ly)?|at no [\w ]{0,30}?time|no (additional |extra )?(development |dev )?time|zero[- ]time|unbreakable|uncrackable|unhackable|untraceable|undetectable|FTL|faster[- ]than[- ]light|production[- ]grade|military[- ]grade|zero[- ]knowledge|100%\s*secure|keyless\s+secure|perfectly\s+secure|absolute\s+security|unlimited|infinitely|infinite)\b/i

// a demarcation/negation clears a token — the repo's honest prose ("never infinity", "no fake FTL", "simulation,
// not hardware", "bounded, never infinite") is the CORRECT use of these words, not a boast.
const DEMARCATED = /\b(not|never|no|non|isn'?t|aren'?t|cannot|can'?t|without|honest|honestly|simulation|integrity|finite|bounded|demarcat)\b/i

const sealedKeys = theorems().map((t) => t.key)
// BACKED — the unit carries a /theorem/ link or names a sealed theorem key (specific underscored identifiers).
const backed = (u: string): boolean => /\/theorem\//.test(u) || sealedKeys.some((k) => u.includes(k))

// split prose into sentence-ish units, dropping fenced/inline code (examples legitimately contain API strings).
const units = (text: string): string[] =>
  text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 0 && s.length < 2000)

interface Finding { surface: string; unit: string; token: string; address: string }
const findings: Finding[] = []
const scan = (surface: string, text: string): void => {
  for (const u of units(text)) {
    const m = u.match(HOLLOW)
    // Test demarcation on the unit with the hollow token REMOVED, so a phrase cannot clear itself with its own
    // words — e.g. "at no time" must not pass just because it contains "no". A genuine negation elsewhere still clears.
    if (m && !DEMARCATED.test(u.replace(m[0], ' ')) && !backed(u))
      findings.push({ surface, unit: u.length > 160 ? u.slice(0, 157) + '…' : u, token: m[0], address: toUuid(surface + '|' + u) })
  }
}

// prose surfaces: README, the derived principle index, every site page, and every MCP tool description.
if (existsSync(join(ROOT, 'README.md'))) scan('README.md', rd('README.md'))
if (existsSync(join(ROOT, 'lean/PRINCIPLE.md'))) scan('lean/PRINCIPLE.md', rd('lean/PRINCIPLE.md'))
const walk = (d: string): string[] => existsSync(d) ? readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(d, e.name)) : /\.md$/.test(e.name) ? [join(d, e.name)] : []) : []
for (const f of walk(join(ROOT, 'docs'))) scan(relative(ROOT, f), readFileSync(f, 'utf8'))
for (const t of MCP_CATALOG) scan('mcp:' + t.name, t.description)

// fold the findings to ONE recomputable receipt (order-invariant), recomputable by anyone from this same tree.
const receipt = findings.length ? merkleFold(findings.map((f) => f.address)) : toUuid('provenance-clean')

console.log('\n  PROVENANCE AUDIT — prose earns its claim by linking a sealed theorem, or it is audited.')
console.log('    surfaces : README + lean/PRINCIPLE.md + docs/*.md + ' + MCP_CATALOG.length + ' MCP descriptions')
console.log('    hollow-and-unbacked claims : ' + findings.length)
// The remedy is free of money and paid in CODE: back the claim with a sealed theorem, or demarcate it. The flag is
// on the CLAIM, never on a person — a hollow sentence is cleared by delivering the proof that makes it true.
for (const f of findings) console.log(`      • [${f.token}] ${f.surface}\n        "${f.unit}"\n        remedy (paid in code, not coin): link a sealed /theorem/<key> that backs it, or demarcate it (not / never / no / simulation / finite)`)
console.log('    audit receipt : ' + receipt + (findings.length ? '  (FLAGGED — audited until backed by a theorem or demarcated)' : '  (CLEAN — every claim is demarcated or backed by a sealed theorem)'))
process.exitCode = findings.length ? 1 : 0
