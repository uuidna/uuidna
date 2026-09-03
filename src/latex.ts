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
