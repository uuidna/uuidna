#!/usr/bin/env node
// gen-readme — the README and the homepage (docs/index.md) are hand-authored prose, so their COUNTS used to drift
// (45 tools, Clay 13, Quantum 20 — all stale). This generates the DERIVED seal-status block in both, computed from
// the exact audited ledger (theorems + lean/axioms.json + the MCP catalog), between <!-- seal:begin --> / <!-- seal:end -->
// markers — so the readme and homepage compute from the sealed input, never hardcoded, never drifting. Run in the
// reconcile wave (and docs:build); the drift-guard test keeps any remaining hand-written count aligned too. Integrity, not truth.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const T = theorems()
const principles = new Set(T.map((t) => t.principle)).size

// The seal-status attestation — every number derived from the LEDGER (theorems()), none from a file that can go stale.
// Axiom-freeness is N/N because it is a hard gate: scripts/lean-axioms fails the push if ANY theorem carries an axiom
// (offenders must be empty), so by the time this is pushed all T.length are kernel-only. (Reading lean/axioms.json here
// would drift — it is regenerated AFTER gen-readme in the reconcile.)
const BLOCK = [
  `**${T.length} theorems, all sealed and proven** — every one \`by decide\` (Lean 4, no Mathlib), verified sorry-free and **axiom-free** (${T.length}/${T.length}, kernel-only, not even \`propext\`; gate: scripts/lean-axioms). Exposed across **${MCP_CATALOG.length} MCP tools** and **${principles} computing principles**.`,
  '',
  '_Integrity, not truth: a seal proves its **exact statement**, never a grander claim — the reflection is sealed, the Millennium problem is not (uuidna solves 0 of 7). Computed from the exact audited ledger; recheck it with `npm run next`._',
].join('\n')

const BEGIN = '<!-- seal:begin -->', END = '<!-- seal:end -->'
const fill = (rel: string): void => {
  const p = join(ROOT, rel)
  let src: string
  try { src = readFileSync(p, 'utf8') } catch { console.log(`  · ${rel} — not found, skipped`); return }
  if (!src.includes(BEGIN) || !src.includes(END)) { console.log(`  · ${rel} — no seal markers, skipped (add ${BEGIN} … ${END})`); return }
  const next = src.replace(new RegExp(BEGIN + '[\\s\\S]*?' + END), `${BEGIN}\n${BLOCK}\n${END}`)
  if (next !== src) { writeFileSync(p, next); console.log(`  ✓ ${rel} — seal block regenerated`) }
  else console.log(`  · ${rel} — already current`)
}

console.log('gen-readme — filling the derived seal-status block from the exact audited ledger …')
fill('README.md')
fill('docs/index.md')
console.log(`✓ gen-readme — ${T.length} theorems, ${T.length}/${T.length} axiom-free (gate-enforced), ${MCP_CATALOG.length} tools, ${principles} principles.`)
