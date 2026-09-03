import { test } from 'node:test'
import assert from 'node:assert/strict'
import { latexProse, theoremLatex, ledgerLatex, checkLatex } from './latex.js'
import { THEOREMS } from './theorems/index.js'

// WHAT THESE TESTS DO NOT CLAIM: no TeX engine is installed on this machine, so nothing here proves the
// document compiles. They check STRUCTURE — the class of defect that makes TeX fail or, worse, succeed while
// swallowing a sentence. The controls at the bottom are why the rest can be believed: a checker that cannot
// fail is no instrument, because a routine with no failing branch reports a clean document whatever it is
// handed, and the only way to know this one has a failing branch is to hand it documents that must trip it.

test('the whole ledger becomes one well-formed manuscript, with nothing skipped', () => {
  const doc = ledgerLatex(THEOREMS)
  assert.equal(doc.entries, THEOREMS.length, 'every sealed theorem must appear — a paper missing entries is a different paper')
  assert.deepEqual(doc.refused, [], 'a refusal must be fixed, not tolerated')
  const c = checkLatex(doc.tex)
  assert.ok(c.balancedBraces, 'unbalanced braces')
  assert.deepEqual(c.unmatched, [], 'every \\begin must be closed by its own \\end')
  assert.deepEqual(c.unescaped, [], 'a bare & % $ # _ in prose is a TeX instruction, not text')
})

test('the three zones are handled as themselves: math, prose, source', () => {
  const formula = THEOREMS.find((t) => t.statement === '(1 * 7) % 9 = 7')
  assert.ok(formula, 'the congruence family must be in the ledger')
  const e = theoremLatex(formula)
  assert.equal(e.refused, null)
  assert.match(e.tex, /\\\[\n  1 \\cdot 7 \\equiv 7 \\pmod\{9\}\n\\\]/, 'math is set as mathematics')
  assert.match(e.tex, /\\begin\{verbatim\}\ntheorem mul9_1_7/, 'the Lean the kernel read is passed through untouched')
  assert.match(e.tex, /Content-address \\texttt\{/, 'an entry a reader cannot recompute is not a seal')
  // a program-shaped statement is NOT dressed as an equation
  const program = THEOREMS.find((t) => t.statement.includes('List.range'))
  assert.ok(program)
  const p = theoremLatex(program)
  assert.doesNotMatch(p.tex.split('\\begin{proof}')[0]!, /\\\[/, 'a fold over a list has no formula form')
  assert.match(p.tex, /A computation, not a formula/)
})

test('prose keeps its alphabets and escapes only what TeX reads as instruction', () => {
  assert.equal(latexProse('50% of 3_4 & more #1 $x'), '50\\% of 3\\_4 \\& more \\#1 \\$x')
  assert.equal(latexProse('a\\b'), 'a\\textbackslash{}b')
  assert.equal(latexProse('x~y^z'), 'x\\textasciitilde{}y\\textasciicircum{}z')
  // the 132 non-ASCII characters the ledger carries pass through for a UTF-8 engine — Cyrillic, CJK, Greek
  for (const s of ['теорема', '十二', 'φ(9) = 6', '1·1 ≡ 1 (mod 9)', 'Å ü é']) assert.equal(latexProse(s), s)
})

test('the preamble names the engine it needs — pdfTeX would stop at the first Cyrillic name', () => {
  const doc = ledgerLatex(THEOREMS.slice(0, 3))
  assert.match(doc.tex, /XeLaTeX or LuaLaTeX/)
  assert.match(doc.tex, /NOT pdfTeX/)
  assert.match(doc.tex, /\\usepackage\{fontspec\}/, 'fontspec is what makes the ledger\'s alphabets compile')
  assert.match(doc.tex, /\\end\{document\}/)
})

test('CONTROLS — the structural checker can fail, or it is not an instrument', () => {
  assert.equal(checkLatex('\\begin{theorem}{ \\end{theorem}').balancedBraces, false)
  assert.ok(checkLatex('\\begin{theorem}\\end{proof}').unmatched.length > 0)
  assert.ok(checkLatex('\\begin{theorem}').unmatched.length > 0, 'an environment left open must be named')
  assert.deepEqual(checkLatex('text 50% more').unescaped, ['%'], 'a % in prose eats the rest of the line')
  assert.deepEqual(checkLatex('a & b').unescaped, ['&'])
  // and it must NOT cry wolf: a leading % is a comment, verbatim is literal, math may carry _ and ^
  assert.deepEqual(checkLatex('% a comment\ntext').unescaped, [])
  assert.deepEqual(checkLatex('\\begin{verbatim}\n50% & $x_1\n\\end{verbatim}').unescaped, [])
  assert.deepEqual(checkLatex('\\[ x_1^2 \\]').unescaped, [])
})

test('a source line that would close the environment early is REFUSED, not written', () => {
  const e = theoremLatex({ key: 'k', name: 'n', statement: 's', lean: 'x \\end{verbatim} y' })
  assert.equal(e.tex, '')
  assert.match(e.refused ?? '', /close the environment early/)
})
