#!/usr/bin/env node
// scripts/lean-form — THE LEAN FORM, enforced on the surfaces the prose trial never reaches. The law is already
// stated in derive-prose-trials.ts: "explicitly denying is not lean — lean CONFIRMS instead of denying". A paragraph
// mentioning quantum speedup or advantage passes ONLY by citing a sealed theorem — the positive confirmation of what
// IS (the classical bound, n_qubit_dimension) — never by adverbs of absence. derive-prose-trials holds that line over
// README + docs/*.md (197 markdown surfaces). It does NOT reach source comments, string literals, or Lean headers,
// which is where the remaining denials live. This finder covers exactly that gap.
//
// EXEMPTIONS ARE NAMED, never inferred (theorem drift_is_named_or_caught: a boundary is either declared or it fails).
// The gate machinery must utter the refused phrase to refuse it — the regex that rejects a release cannot be written
// without the words it rejects — so those files are listed below by path, in the open.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, extname, relative } from 'node:path'
import { theorems } from '../index.js'
import { ROOT } from './api.js'

const PHYSICS_CLAIM = /quantum\s+(?:speedup|speed-up|advantage|supremacy)|faster\s+than\s+classical/gi
const SEALED = new Set(theorems().map((t) => t.key))

// NAMED EXEMPTIONS — the gate machinery and the law's own statement. Each must SAY the phrase to enforce it.
const EXEMPT = new Set([
  'src/scripts/next.ts',                // ARM 6: the release-title regex and its failure message
  'src/scripts/one-receipt.ts',         // the NEG demarcation regex
  'src/scripts/derive-prose-trials.ts', // the law's own statement (PHYSICS_CLAIM)
  'src/scripts/lean-form.ts',           // this finder
  'src/tests/energy.test.ts',           // the assertion that tool descriptions stay clean
  'src/tests/readme-quantum.test.ts',   // the assertion that the README stays clean
  'lean/leads.json',                    // a research lead NAMES the claim class it hunts
  'src/tests/daemon.test.ts',           // NEGATIVE FIXTURE: the sentence fed to the refuser to prove it refuses
  'src/tests/smoke.test.ts',            // NEGATIVE FIXTURE: same, through reeducate()
  'src/theorems/generated.ts',          // GENERATED from the lean-*.ts sources; fixing a copy is drift
])

// SOURCE OF TRUTH ONLY — generated trees (lean/*.lean, packages/**, docs/**, src/seeds/**, *.json artifacts) carry
// copies; fixing a copy is drift. The finder reads the files a human edits, so a fix lands where it regenerates from.
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', '.vitepress', 'coverage', 'seeds', 'chunks'])
const files: string[] = []
const walk = (d: string): void => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (SKIP_DIR.has(e.name)) continue
    const p = join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (extname(e.name) === '.ts') files.push(p)
  }
}
walk(join(ROOT, 'src'))

// A BLOCK is the citation window: consecutive comment lines, or the single line of a string literal. A citation
// anywhere in the block confirms the whole block — the same window the markdown trial gives a paragraph.
interface Violation { surface: string; line: number; claim: string; text: string }
const violations: Violation[] = []
for (const f of files) {
  const rel = relative(ROOT, f)
  if (EXEMPT.has(rel)) continue
  const lines = readFileSync(f, 'utf8').split('\n')
  // group consecutive comment lines into one block; every other line is its own block
  let i = 0
  while (i < lines.length) {
    const isComment = (s: string): boolean => /^\s*(\/\/|\*|\/\*)/.test(s)
    let j = i
    if (isComment(lines[i]!)) while (j + 1 < lines.length && isComment(lines[j + 1]!)) j++
    const block = lines.slice(i, j + 1).join('\n')
    if (PHYSICS_CLAIM.test(block)) {
      PHYSICS_CLAIM.lastIndex = 0
      // THE BACKED-BY WINDOW (the precedent is provenance.ts): a theorem's description is vouched by its OWN key,
      // which sits on a sibling line of the same object literal — so the citation window is the block plus six
      // lines either side, never the block alone. A narrower window false-flags every sealed `why:` in the tree.
      const window = lines.slice(Math.max(0, i - 6), j + 7).join('\n')
      const cited = [...SEALED].some((k) => window.includes(k))
      if (!cited) for (const m of block.matchAll(PHYSICS_CLAIM))
        violations.push({ surface: rel, line: i + 1, claim: m[0], text: (lines[i] ?? '').trim().slice(0, 100) })
    }
    PHYSICS_CLAIM.lastIndex = 0
    i = j + 1
  }
}

console.log('  THE LEAN FORM — source prose confirms by citation, never denies by adverb.')
console.log(`    surfaces   : ${files.length} (src/**/*.ts, source of truth only)`)
console.log(`    exempt     : ${EXEMPT.size} named (gate machinery — it must say the phrase to refuse it)`)
if (violations.length === 0) {
  console.log('    lean form  : ✓ every mention cites the sealed bound in its own block')
  process.exit(0)
}
console.log(`    lean form  : ✗ ${violations.length} denial(s) with no sealed citation in the block:`)
for (const v of violations) console.log(`      ✗ ${v.surface}:${v.line}  "${v.claim}"  — ${v.text}`)
console.log('    fix: state what IS and cite the bound (n_qubit_dimension), or name the file in EXEMPT with a reason.')
process.exit(1)
