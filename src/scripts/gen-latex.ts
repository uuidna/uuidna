#!/usr/bin/env node
// gen-latex — THE LEDGER AS A SUBMITTABLE MANUSCRIPT. Writes docs/public/uuidna-ledger.tex: every sealed
// theorem as an amsthm entry, the statement set as mathematics where it IS mathematics, the Lean the kernel
// decided beneath it, and the content-address by which a reader recomputes it. Derived from the ledger, so a
// wing that lands today appears in the paper today and nobody edits a .tex by hand.
//
// It writes ONE file rather than 2596. A per-theorem document would add 2596 files to a dist whose render heap
// is already the binding constraint (theorem render_retention_exceeds_the_container), and the single-line TeX a
// reader actually wants for one theorem is already on that theorem's page.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { THEOREMS } from '../theorems/index.js'
import { ledgerLatex, checkLatex } from '../latex.js'

const OUT_DIR = join(ROOT, 'docs', 'public')
const OUT = join(OUT_DIR, 'uuidna-ledger.tex')

const doc = ledgerLatex(THEOREMS, {
  title: 'The uuidna ledger',
  author: 'uuidna --- every statement decided by the Lean 4 kernel',
  abstract:
    'Every theorem in this document was decided by the Lean 4 kernel, sorry-free and axiom-free: no propext, no '
    + 'Classical.choice, kernel numerals only. Each entry carries its content-address, and the whole ledger is '
    + 'recomputable from source. Statements that are formulas are set as mathematics; statements that are Lean '
    + 'computations are shown as the source the kernel read, because a fold over a list has no formula form and '
    + 'typesetting one as an equation would dress a computation as mathematics.',
})

const check = checkLatex(doc.tex)
const problems: string[] = []
if (!check.balancedBraces) problems.push('braces do not balance')
if (check.unmatched.length) problems.push(`${check.unmatched.length} unmatched environment(s): ${check.unmatched.slice(0, 3).join('; ')}`)
if (check.unescaped.length) problems.push(`unescaped special(s) outside verbatim and comments: ${check.unescaped.join(' ')}`)
if (doc.refused.length) problems.push(`${doc.refused.length} theorem(s) refused: ${doc.refused.slice(0, 3).join('; ')}`)

if (problems.length) {
  console.log('✗ gen-latex — the manuscript is not well formed, so it is NOT written:')
  for (const p of problems) console.log('    GAP ' + p)
  console.log('    FIX the escaping or the environment nesting in src/latex.ts, then re-run')
  process.exit(1)
}

// integer arithmetic only: Math.* is a hard-reject tree-wide (it settles no theorem), so the size is rounded
// the way the rest of the tree rounds — by remainder, not by a library.
const kb = (n: number): number => { const q = (n - (n % 1024)) / 1024; return n % 1024 >= 512 ? q + 1 : q }

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT, doc.tex)
console.log(`✓ gen-latex — docs/public/uuidna-ledger.tex · ${doc.entries} theorem(s) · ${kb(doc.tex.length)} KB`)
console.log('  STRUCTURE checked (balanced braces, matched environments, escaped specials) — NOT compiled: no TeX')
console.log('  engine is installed here. Compile with `xelatex docs/public/uuidna-ledger.tex` (XeLaTeX or LuaLaTeX,')
console.log('  never pdfTeX — theorem names carry Greek, Cyrillic and CJK).')
