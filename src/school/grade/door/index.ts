// school/grade/door — what a learner's proof block must not contain before the kernel sees it.
//
// Running `lean` on a text IS running code: elaboration executes tactics, macros and elaborators, and several
// commands evaluate arbitrary programs with IO. The kernel's verdict only means something about the lesson's
// statement if the learner's text stays inside the proof. So the grader writes
//     theorem <name> : <statement> := by (
//       <proof>
//     )
// and the door guarantees two things before that file exists: (1) no form that executes a program, adds an axiom,
// leaves a hole, or changes the kernel's settings; (2) the proof cannot close the outer parenthesis and start a
// command of its own — its parentheses never go below depth zero once comments are removed, and it holds no string
// literal, character literal or «quoted identifier», which are the three places a parenthesis hides from the count
// while the Lean lexer still reads it. The door is a pure function of the text; the kernel judges everything else.

/** the longest proof block the door admits, in UTF-16 code units */
export const DOOR_MAX_LENGTH = 8192

/** forms refused anywhere in the text, case-sensitive, as substrings — so `unsafeIO` and `sorryAx` are caught */
export const DOOR_FORMS: readonly { form: string; why: string }[] = [
  { form: '#eval', why: 'evaluates a program at elaboration time' },
  { form: '#exit', why: 'stops elaboration, so the rest of the file is never checked' },
  { form: 'run_cmd', why: 'runs a command-level program' },
  { form: 'run_tac', why: 'runs a tactic-level program' },
  { form: 'run_', why: 'the run_ family (run_elab, run_meta) runs programs at elaboration time' },
  { form: 'IO', why: 'IO reaches the host: files, processes, network' },
  { form: 'unsafe', why: 'unsafe code bypasses the kernel' },
  { form: '@[extern', why: 'binds a Lean name to foreign code' },
  { form: '@[implemented_by', why: 'replaces a definition with other code at run time' },
  { form: 'axiom', why: 'an axiom is a claim the kernel never checks' },
  { form: 'sorry', why: 'a hole is not a proof' },
  { form: 'admit', why: 'a hole is not a proof' },
  { form: 'native', why: 'native evaluation (native_decide, decide +native) trusts compiled code over the kernel' },
  { form: 'import', why: 'the lesson fixes the environment; a proof block imports nothing' },
  { form: 'set_option', why: 'the lesson fixes the kernel settings, including the heartbeat budget' },
  { form: '#', why: 'every #-command runs outside the proof' },
  { form: '@[', why: 'an attribute changes the environment outside the proof' },
  { form: '"', why: 'a string literal hides a parenthesis from the door\'s count while Lean still lexes it' },
  { form: '«', why: 'a quoted identifier hides a parenthesis from the door\'s count while Lean still lexes it' },
]

/** words refused as whole identifiers: each begins a command or defines code that elaboration runs later */
export const DOOR_WORDS: readonly string[] = [
  'elab', 'elab_rules', 'macro', 'macro_rules', 'syntax', 'declare_syntax_cat', 'notation', 'infix', 'infixl', 'infixr',
  'prefix', 'postfix', 'simproc', 'dsimproc', 'initialize', 'builtin_initialize', 'by_elab', 'instance', 'attribute',
  'def', 'theorem', 'lemma', 'example', 'abbrev', 'opaque', 'structure', 'class', 'inductive', 'coinductive', 'mutual',
  'namespace', 'section', 'end', 'variable', 'universe', 'export', 'deriving', 'local', 'scoped', 'private',
  'protected', 'noncomputable', 'partial',
]

const IDENT = /[\p{L}\p{N}_'!?.]/u
const PAIRS: readonly [string, string][] = [['(', ')'], ['[', ']'], ['{', '}'], ['⟨', '⟩']]

/** withoutComments(text) → the text with `--` line comments and nested `/- -/` block comments removed, or null when
 *  a block comment is left open */
export function withoutComments(text: string): string | null {
  let out = '', i = 0
  while (i < text.length) {
    if (text.startsWith('--', i)) { const nl = text.indexOf('\n', i); i = nl < 0 ? text.length : nl; continue }
    if (text.startsWith('/-', i)) {
      let depth = 1; i += 2
      while (i < text.length && depth > 0) {
        if (text.startsWith('/-', i)) { depth++; i += 2 }
        else if (text.startsWith('-/', i)) { depth--; i += 2 }
        else i++
      }
      if (depth > 0) return null
      out += ' '
      continue
    }
    out += text[i]; i++
  }
  return out
}

/** doorRefusal(proof) → null when the proof block may go to the kernel, else the reason it may not */
export function doorRefusal(proof: string): string | null {
  if (!proof.trim()) return 'the proof block is empty'
  if (proof.length > DOOR_MAX_LENGTH) return `the proof block is longer than ${DOOR_MAX_LENGTH} characters`
  for (let i = 0; i < proof.length; i++) {
    const c = proof.charCodeAt(i)
    if ((c < 0x20 && c !== 0x0a) || c === 0x7f) return `the proof block holds a control character (code ${c}); Lean source is printable text and newlines`
  }
  for (const f of DOOR_FORMS) if (proof.includes(f.form)) return `\`${f.form}\` is refused at the door: ${f.why}`
  for (const w of DOOR_WORDS) {
    let at = proof.indexOf(w)
    while (at >= 0) {
      const before = at > 0 ? proof[at - 1]! : ' ', after = proof[at + w.length] ?? ' '
      if (!IDENT.test(before) && !IDENT.test(after)) return `\`${w}\` is refused at the door: it starts a declaration or command outside the proof`
      at = proof.indexOf(w, at + 1)
    }
  }
  const code = withoutComments(proof)
  if (code === null) return 'a block comment is left open, so the rest of the file would be read as comment'
  for (let i = 0; i < code.length; i++)
    if (code[i] === '\'' && !(i > 0 && IDENT.test(code[i - 1]!)))
      return 'a character literal is refused at the door: it hides a parenthesis from the count while Lean still lexes it'
  for (const [open, close] of PAIRS) {
    let depth = 0
    for (const ch of code) {
      if (ch === open) depth++
      else if (ch === close && --depth < 0) return `\`${close}\` closes more than the proof opened, which would end the proof block and start a command`
    }
    if (depth !== 0) return `\`${open}\` is opened ${depth} more time(s) than it is closed`
  }
  return null
}
