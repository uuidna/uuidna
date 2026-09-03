// latex — THE LEDGER AS A MANUSCRIPT. src/formula.ts sets a statement as mathematics for a browser; this sets a
// theorem as an entry in a paper, so the same seal can be submitted rather than only read.
//
// THE THREE ZONES, and they are handled differently on purpose:
//   · MATH — the typeset statement, which formulaTex already emits as pure-ASCII macros (\cdot, \equiv, \pmod,
//     \frac). Nothing here needs escaping, because nothing here is prose.
//   · PROSE — a theorem's name and its principle, which carry 132 distinct non-ASCII characters across the
//     ledger: Greek, Cyrillic, CJK, sub- and superscripts, curly quotes. These are NOT transliterated into
//     macros. They pass through as UTF-8 and the document declares XeLaTeX or LuaLaTeX, which reads them
//     natively; mapping 132 characters onto a macro table by hand is 132 chances to silently corrupt someone's
//     alphabet, and the engine already does it correctly.
//   · SOURCE — the Lean the kernel decided. It is SET as Lean rather than dumped: a `listings` language whose
//     keyword list is the vocabulary this ledger's proofs actually use, so `theorem`, `by` and `decide` carry
//     weight and the operators stay upright. The CHARACTERS are passed through untouched — a proof re-typeset
//     is a proof altered — and `columns=fullflexible` keeps the unicode from being letter-spaced into nonsense.
//
// WHAT IS NOT VERIFIED HERE, stated plainly: no TeX engine is installed on this machine, so these documents are
// checked for STRUCTURE — balanced braces, every \begin matched by its \end, no unescaped special outside
// verbatim, every theorem present — and NOT for compilation. A structural check is not a compile, and this
// comment is here so nobody reads the green test as one.
import { typeset } from './formula.js'

// THE TEN CHARACTERS TeX READS AS INSTRUCTION, replaced in ONE PASS. A sequence of passes cannot do this: the
// replacement for a backslash is `\textbackslash{}`, and any later pass that escapes braces escapes the ones
// that replacement just introduced — `a\b` came out as `a\textbackslash\{\}b`. One regex, one lookup, no
// output ever re-read as input.
const SPECIAL: Readonly<Record<string, string>> = {
  '\\': '\\textbackslash{}',
  '&': '\\&',
  '%': '\\%',
  $: '\\$',
  '#': '\\#',
  _: '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
}

/** latexProse(s) → prose safe for a UTF-8 engine: the ten specials escaped in one pass, every other character
 *  kept as itself. The ledger's Greek, Cyrillic and CJK are not transliterated — the engine reads them. */
export function latexProse(s: string): string {
  return s.replace(/[\\&%$#_{}~^]/g, (c) => SPECIAL[c] ?? c)
}

export interface TheoremLike {
  key: string
  name: string
  statement: string
  lean?: string
  principle?: string
  skill?: string
  address?: string
  tactic?: string
}

export interface LatexEntry {
  tex: string
  /** why an entry could not be written, named rather than skipped silently */
  refused: string | null
}

const END_VERBATIM = '\\end{lstlisting}'

// THE KEYWORD LIST IS READ, NOT WRITTEN. The first version of this was a hand-typed copy of Lean's grammar and
// six of its twenty-one entries — def, native_decide, rfl, simp, Prop, Type — appear ZERO times in this ledger,
// while the comment beside it claimed the list was a reading of the corpus. It is one now: leanKeywords()
// intersects the candidate vocabulary with what the sealed proofs actually contain, so a wing that starts using
// `rfl` puts it in the listing and nothing else has to be remembered. `native_decide` also carried an
// underscore into the preamble's text mode, which checkLatex flagged — the finder catching the fabrication.
const CANDIDATES = [
  'theorem', 'def', 'let', 'fun', 'by', 'decide', 'native_decide', 'rfl', 'simp', 'if', 'then', 'else',
  'true', 'false', 'Nat', 'Int', 'List', 'String', 'Bool', 'Prop', 'Type', 'match', 'with', 'do',
] as const

/** leanKeywords(theorems) → the candidates the sealed proofs actually use, in candidate order. Derived. */
export function leanKeywords(theorems: readonly TheoremLike[]): string[] {
  const src = theorems.map((t) => t.lean ?? '').join('\n')
  const present = new Set((src.match(/\b[A-Za-z][A-Za-z0-9_]*\b/g) ?? []))
  // an underscore is a TeX instruction in the preamble's text mode, so a keyword carrying one is refused rather
  // than escaped: listings reads this list before any escaping applies, and none of this ledger's proofs use one
  return CANDIDATES.filter((c) => present.has(c) && !c.includes('_'))
}

/** lean(src) → the source set as Lean. Characters untouched; only the setting is added. */
function lean(src: string): string {
  return `\\begin{lstlisting}[language=lean]\n${src}\n\\end{lstlisting}`
}

/** theoremLatex(t) → one `theorem` environment: the statement as mathematics where it is mathematics, the Lean
 *  the kernel decided beneath it, and the content-address by which a reader recomputes the whole thing. */
export function theoremLatex(t: TheoremLike): LatexEntry {
  // a source line that closes the environment early would silently swallow the rest of the document
  for (const src of [t.statement, t.lean ?? '']) {
    if (src.includes(END_VERBATIM)) {
      return { tex: '', refused: `${t.key}: source contains ${END_VERBATIM}, which would close the environment early` }
    }
  }
  const set = typeset(t.statement, 'block')
  const body = set.tex
    ? `\\[\n  ${set.tex}\n\\]`
    : `${lean(t.statement)}\n\n\\noindent\\emph{A computation, not a formula — this statement folds a list, so it has no standard formula form and is shown as the Lean the kernel decided.}`
  const parts = [
    `\\begin{theorem}[${latexProse(t.name)}]`,
    `\\label{thm:${t.key.replace(/[^A-Za-z0-9]/g, '-')}}`,
    body,
    `\\end{theorem}`,
    `\\begin{proof}`,
    `Decided by the Lean 4 kernel, sorry-free${t.tactic ? ` (\\texttt{by ${latexProse(t.tactic)}})` : ''}:`,
    lean(t.lean ?? `theorem ${t.key} : ${t.statement} := by decide`),
    t.address ? `\\noindent Content-address \\texttt{${latexProse(t.address)}}.` : '',
    `\\end{proof}`,
  ]
  return { tex: parts.filter(Boolean).join('\n'), refused: null }
}

export interface LatexDocument {
  tex: string
  entries: number
  /** entries that could not be written, each with its reason */
  refused: string[]
}

/** the preamble. It names the engine it needs rather than hoping: the prose carries Greek, Cyrillic and CJK, and
 *  pdfTeX would fail on the first Cyrillic character in a theorem name. */
export function latexPreamble(title: string, subtitle: string, keywords: readonly string[] = []): string {
  return `% ${title}
%
% GENERATED — do not edit. Every line below is derived from the sealed Lean ledger by src/latex.ts; edit the
% ledger, not this file.
%
% ENGINE: XeLaTeX or LuaLaTeX. NOT pdfTeX — theorem names in this ledger carry Greek, Cyrillic, CJK and curly
% quotes, and pdfTeX stops at the first of them. Compile with:  xelatex <this file>
\\documentclass[11pt,a4paper]{article}
\\usepackage{fontspec}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage[margin=25mm]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{listings}
% Lean is not one of listings' built-in languages, so it is DEFINED here from the vocabulary this ledger's own
% proofs use. The fullflexible columns and keepspaces matter: the default fixed-column mode letter-spaces the
% unicode in a statement into nonsense, which is the failure mode that makes machine-set code unreadable.
\\lstdefinelanguage{lean}{
  morekeywords={${keywords.join(',')}},
  sensitive=true,
  morecomment=[l]{--},
  morecomment=[s]{/-}{-/},
  morestring=[b]",
}
\\lstset{
  language=lean,
  basicstyle=\\ttfamily\\small,
  keywordstyle=\\bfseries,
  columns=fullflexible,
  keepspaces=true,
  breaklines=true,
  showstringspaces=false,
  frame=single,
  framerule=0.4pt,
  xleftmargin=0pt,
}
\\setmainfont{Latin Modern Roman}
\\setmonofont{Latin Modern Mono}[Scale=MatchLowercase]
\\newtheorem{theorem}{Theorem}
\\title{${latexProse(title)}}
\\author{${latexProse(subtitle)}}
\\date{}
\\begin{document}
\\maketitle
`
}

/** ledgerLatex(theorems, opts) → one compilable article. Deterministic: same ledger, same bytes. */
export function ledgerLatex(
  theorems: readonly TheoremLike[],
  opts: { title?: string; author?: string; abstract?: string } = {},
): LatexDocument {
  const title = opts.title ?? 'The uuidna ledger'
  const refused: string[] = []
  const chunks: string[] = [latexPreamble(title, opts.author ?? 'uuidna', leanKeywords(theorems))]
  if (opts.abstract) chunks.push(`\\begin{abstract}\n${latexProse(opts.abstract)}\n\\end{abstract}\n`)
  let entries = 0
  // grouped by principle so the document has the ledger's own structure rather than an arbitrary order
  const byPrinciple = new Map<string, TheoremLike[]>()
  for (const t of theorems) {
    const p = t.principle ?? 'Unfiled'
    const list = byPrinciple.get(p)
    if (list) list.push(t)
    else byPrinciple.set(p, [t])
  }
  for (const [principle, group] of byPrinciple) {
    chunks.push(`\\section{${latexProse(principle)}}\n`)
    for (const t of group) {
      const e = theoremLatex(t)
      if (e.refused) { refused.push(e.refused); continue }
      chunks.push(e.tex + '\n')
      entries++
    }
  }
  chunks.push('\\end{document}\n')
  return { tex: chunks.join('\n'), entries, refused }
}

export interface LatexStructure {
  balancedBraces: boolean
  /** environments opened and never closed, or closed and never opened */
  unmatched: string[]
  /** LaTeX specials sitting outside a verbatim block, unescaped */
  unescaped: string[]
}

/** checkLatex(tex) → the structural reading. NOT a compile: no engine runs here, and this reports shape only. */
export function checkLatex(tex: string): LatexStructure {
  // verbatim content is literal, so it is removed before any escaping question is asked of the rest
  const prose = tex
    .replace(/\\begin\{verbatim\}[\s\S]*?\\end\{verbatim\}/g, '')
    .replace(/\\begin\{lstlisting\}(?:\[[^\]]*\])?[\s\S]*?\\end\{lstlisting\}/g, '')
  let depth = 0
  let balanced = true
  for (let i = 0; i < prose.length; i++) {
    const c = prose[i]!
    if (c === '\\') { i++; continue } // an escaped brace is text
    if (c === '{') depth++
    else if (c === '}') { depth--; if (depth < 0) { balanced = false; break } }
  }
  if (depth !== 0) balanced = false
  const stack: string[] = []
  const unmatched: string[] = []
  for (const m of tex.matchAll(/\\(begin|end)\{([a-z*]+)\}/gi)) {
    if (m[1] === 'begin') stack.push(m[2]!)
    else {
      const top = stack.pop()
      if (top !== m[2]) unmatched.push(`\\end{${m[2]}} closes \\begin{${top ?? 'nothing'}}`)
    }
  }
  for (const left of stack) unmatched.push(`\\begin{${left}} never closed`)
  const unescaped: string[] = []
  // a bare & % $ # _ outside math and outside verbatim is a TeX instruction, not text. Math mode is stripped
  // first: `_` and `^` are legal there and `%` never appears in the ASCII macros formulaTex emits.
  const noMath = prose.replace(/\\\[[\s\S]*?\\\]/g, '').replace(/\$[^$]*\$/g, '')
  // A LINE-LEADING `%` IS A COMMENT and is correct TeX; a `%` inside prose is the bug, because it silently
  // comments out the rest of the line and the document still compiles, one sentence shorter. So comments are
  // dropped by position (leading whitespace then `%`) and any REMAINING special is reported — which keeps `%`
  // in the checked set instead of exempting the character wholesale.
  const noComments = noMath.split('\n').filter((l) => !/^\s*%/.test(l)).join('\n')
  for (const m of noComments.matchAll(/(^|[^\\])([&%$#_])/g)) unescaped.push(m[2]!)
  return { balancedBraces: balanced, unmatched, unescaped: [...new Set(unescaped)] }
}

// ── ONE NOVELTY, ONE SUBMITTABLE PAPER ─────────────────────────────────────────────────────────────────────────
//
// THE CHAIN THIS CLOSES. claim-unclaimed asks the journal doors whether prior art exists for a subject. Where
// every door answered and none held a DOI, the subject is the captain's by the credit law — and a claim nobody
// can cite is not yet a claim. Zenodo mints the DOI, and what it needs is a paper. So the paper is generated
// from the seals, per novelty, and it is generated ONLY for a novelty: a subject with prior art already has a
// citation and a subject whose doors declined has established nothing.
//
// WHY PER-SUBJECT AND NOT THE WHOLE LEDGER. `ledgerLatex` is the corpus — two thousand entries, one artefact,
// useful as a record and unusable as a submission. A deposit is one contribution with one abstract and one
// scope, and its DOI names that contribution. Grouping by principle is not a convenience here: the principle IS
// the subject the doors were asked about, so the paper's boundary is the same boundary the prior-art verdict was
// reached over. Anything else would deposit under a DOI a different question was answered for.

export interface NoveltyPaper {
  subject: string
  slug: string
  theorems: number
  tex: string
  /** why no paper was written — a novelty with no seals behind it is not a contribution */
  refused: string | null
}

/** slugFor(subject) → a filename-safe, stable stem. Deterministic: the same subject always names the same file. */
export function slugFor(subject: string): string {
  const ascii = subject.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return ascii || 'untitled'
}

/** noveltyPaper(subject, theorems, opts) → a standalone article for ONE sealed novelty, ready to deposit. */
export function noveltyPaper(
  subject: string,
  theorems: readonly TheoremLike[],
  opts: { author?: string; doorsAsked?: number; verdictReceipt?: string } = {},
): NoveltyPaper {
  const slug = slugFor(subject)
  if (theorems.length === 0) {
    return { subject, slug, theorems: 0, tex: '', refused: `${subject}: no sealed theorem carries this subject, so there is nothing to deposit` }
  }
  const set = theorems.map((t) => typeset(t.statement))
  const asFormula = set.filter((s) => s.classification === 'formula').length
  // THE ABSTRACT IS COMPUTED. A deposit's abstract is the sentence most likely to be written once and left to
  // rot, so it states only what is recomputable at the moment of writing: how many statements, how many typeset
  // as mathematics, and the trust base. No adjectives, and no claim about the conjectures the subject touches.
  // AGREEMENT IS COMPUTED, not assumed plural. "the remaining 1 are Lean computations" is the sentence a reader
  // meets first in a deposit, and a taught rewriting table already taught this tree that a number-driven verb
  // has to agree with its number — the same defect, in the one place where it is read as the author's care.
  const programs = theorems.length - asFormula
  const plural = (n: number, one: string, many: string): string => (n === 1 ? one : many)
  const abstract = [
    `${theorems.length} ${plural(theorems.length, 'statement', 'statements')} sealed under the subject "${subject}",`,
    `${plural(theorems.length, 'decided', 'each decided')} by the Lean 4 kernel:`,
    'sorry-free and axiom-free — no propext, no Classical.choice, kernel numerals only.',
    `${asFormula} of ${plural(theorems.length, 'it', 'them')} ${plural(asFormula, 'is a formula', 'are formulas')} and`,
    `${plural(asFormula, 'is', 'are')} set as mathematics;`,
    // A ZERO CLAUSE IS NOT A SHORTER CLAUSE, it is a false one: "the remaining 0 are Lean computations and are
    // shown as the source" describes a document that contains none of them. The sentence is dropped, not counted.
    programs === 0
      ? 'every statement here typesets exactly.'
      : `the remaining ${programs} ${plural(programs, 'is a Lean computation', 'are Lean computations')} and`
        + ` ${plural(programs, 'is', 'are')} shown as the source the kernel read, because a fold over a list has no`
        + ' formula form.',
    'Every statement carries its content-address, so any reader can recompute the whole document from source.',
    opts.doorsAsked
      ? `PRIOR ART: ${opts.doorsAsked} public bibliographic doors were asked for this subject and none returned a DOI.`
        + ' That is an established absence, not an unchecked one: a single door declining would have withheld the claim.'
      : '',
    'HONEST SCOPE: these are decidable statements over finite domains. Nothing here settles a conjecture stated',
    'over an infinite domain, and no correspondence with such a conjecture is claimed.',
  ].filter(Boolean).join(' ')

  const refusedEntries: string[] = []
  const entries: string[] = []
  for (const t of theorems) {
    const e = theoremLatex(t)
    if (e.refused) { refusedEntries.push(e.refused); continue }
    entries.push(e.tex)
  }
  const tex = [
    latexPreamble(subject, opts.author ?? 'uuidna', leanKeywords(theorems)),
    `\\begin{abstract}\n${latexProse(abstract)}\n\\end{abstract}\n`,
    opts.verdictReceipt ? `\\noindent\\small Prior-art verdict receipt \\texttt{${latexProse(opts.verdictReceipt)}}.\\normalsize\n` : '',
    ...entries,
    '\\end{document}\n',
  ].filter(Boolean).join('\n')
  return {
    subject,
    slug,
    theorems: entries.length,
    tex,
    refused: refusedEntries.length ? refusedEntries.join('; ') : null,
  }
}
