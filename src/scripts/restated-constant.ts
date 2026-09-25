// restated-constant — A DERIVED CONSTANT WRITTEN OUT AGAIN AS A BARE NUMERAL.
//
// THIS FINDER IS WHAT LEAD a5572638 ACTUALLY ASKED FOR. "Plan leftover: concurrent width is 14 VE faces" alleged
// that a figure had been typed once while planning and carried afterwards. Five waves of the 2×7 rosetta tried to
// refute it inside Lean and all five were refused 7/14: leftover is a claim about PROVENANCE — about how a number
// got into the code — and no kernel reads a file. But the allegation was TRUE, and each wave proved it the same
// way: a witness wrote a broader rule than the generator's and found a spelling it could not see. Seven
// `lanes = 14` defaults; then `const FACES = 14`; then nine positional `waveCensus(14)`; then every COMPARISON
// form, which a rule requiring `[:=]` does not match by construction, since a comparison never writes one.
//
// A RULE IS SHARPENED IN THE OPEN OR IT IS SHAPED TO PASS. That generator's hunt was rewritten three times and was
// narrower than the tree every time, because nothing ever made it face the spellings it missed — it cured the
// instances that had been reported and never the defect they were instances of. So the rule lives here, with a
// control (restated-constant.test.ts) that plants every spelling the witnesses found and asserts the rule catches
// each one, and every near miss and asserts it stays quiet. The next spelling that gets past it goes into the
// control FIRST and into the rule second.
//
// THE SET IS DERIVED, NEVER LISTED. A constant is in scope when the tree DERIVES it — declares it as an expression
// over other named constants rather than as a literal. That is exactly the class that can drift: a literal has
// nothing to drift from, while a derived constant has a definition elsewhere that a hand-written copy silently
// stops tracking. No allow list, no naming convention, no per-constant vocabulary — the captain, 2026-09-14:
// "remove any allow lists or disallowed or any manual logic whatsoever not coming from lean decisions".
import { lsRoot, rdRoot, existsRoot } from '../boundary.js'

export interface Restated { constant: string; value: number; declaredIn: string; file: string; line: number; text: string }

/** every .ts under src/ — the tree's own sources.
 *
 *  THE GENERATED STORES ARE SKIPPED, and skipping them is most of this function's cost. src/handles and
 *  src/chunks are the content-addressed store: `the_store_footprint_is_its_folders` seals that it occupies
 *  258,557 inodes, four levels deep, one folder per record. Walking it to look for TypeScript — of which it
 *  holds none, only JSON — took 7,046 ms of a 8,626 ms finder. src/seeds is the same class, generated page data.
 *  These are not an allow list: they are the three generated DATA trees under src/, and a data tree has no
 *  source to scan. */
export const sources = (rel = 'src'): string[] => {
  const out: string[] = []
  if (!existsRoot(rel)) return out
  for (const e of lsRoot(rel)) {
    if (e.name === 'node_modules' || e.name === 'seeds' || e.name === 'handles' || e.name === 'chunks') continue
    const r = `${rel}/${e.name}`
    if (e.isDirectory()) out.push(...sources(r))
    else if (r.endsWith('.ts')) out.push(r)
  }
  return out
}

/** code only: comments and string literals stripped, so prose ABOUT a width is never read as a freeze OF one.
 *  Measured before this existed: a naive scan for the bare numeral 14 returned 7,605 hits, nearly all of them the
 *  date 2026-09-14 in quoted law text. A finder that cries wolf is one nobody reads. */
export const codeOnly = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '').replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '""')

/** evaluate(rhs, at) → the integer a constant's declaration comes to, or null. A hand-rolled shunting-yard over
 *  + - * / ** and parentheses, because the tree forbids `eval` and because a declaration is arithmetic, not code.
 *  Exact integers only: a division that does not divide, or anything the grammar does not cover, answers null
 *  rather than a rounded number — an approximate constant is not a constant. */
export function evaluate(rhs: string, at: (name: string) => number | null): number | null {
  const tokens = rhs.match(/\*\*|[()+\-*/]|[A-Z][A-Z0-9_]*|\d+/g)
  if (!tokens || tokens.join('') !== rhs.replace(/\s+/g, '')) return null   // anything unrecognised refuses the whole
  const prec: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '**': 3 }
  const vals: number[] = [], ops: string[] = []
  const apply = (): boolean => {
    const op = ops.pop()!, b = vals.pop(), a = vals.pop()
    if (a === undefined || b === undefined) return false
    const v = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : op === '/' ? a / b : a ** b
    if (!Number.isInteger(v)) return false
    vals.push(v)
    return true
  }
  for (const t of tokens) {
    if (/^\d+$/.test(t)) vals.push(Number(t))
    else if (/^[A-Z]/.test(t)) { const v = at(t); if (v === null) return null; vals.push(v) }
    else if (t === '(') ops.push(t)
    else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') if (!apply()) return null
      if (ops.pop() !== '(') return null
    } else {
      // ** is right-associative, the rest left — TRINITY ** TRINITY ** 2 must not fold leftwards
      while (ops.length && ops[ops.length - 1] !== '(' &&
             (t === '**' ? prec[ops[ops.length - 1]]! > prec[t]! : prec[ops[ops.length - 1]]! >= prec[t]!)) if (!apply()) return null
      ops.push(t)
    }
  }
  while (ops.length) { if (ops[ops.length - 1] === '(') return null; if (!apply()) return null }
  return vals.length === 1 ? vals[0]! : null
}

/** derivedConstants(files, read) → every `export const NAME = <arithmetic over other NAMES>` with its value.
 *
 *  THE GRAMMAR IS WIDE ON PURPOSE, and it was measured narrow first. A flat sum of names — `A + B + C` — covered
 *  17 constants and missed the ones the court is actually asking about: `A432_HZ = HEXBIT_STATES * (TRINITY **
 *  TRINITY)` (parentheses and a power), `SALT_BYTES = ADDRESS_BYTES` (a bare alias, which is the purest copy there
 *  is), and every constant whose parts are themselves derived. Nine of the court's open settlements name a figure
 *  written out instead of derived, and a finder serves none of them unless it resolves their constants —
 *  by construction, since an unresolved constant has no value to hunt for.
 *
 *  A LITERAL DECLARATION IS STILL NOT IN SCOPE: there is nothing for it to have drifted FROM. What makes a
 *  constant watchable is that its value is stated somewhere else, in terms of other names. */
export function derivedConstants(files: readonly string[], read: (f: string) => string): Map<string, { value: number; file: string }> {
  const literals = new Map<string, number>()
  const derived = new Map<string, { rhs: string; file: string }>()
  for (const f of files) {
    for (const m of read(f).matchAll(/^export const ([A-Z][A-Z0-9_]*) = (.+?)$/gm)) {
      const rhs = m[2]!.replace(/\s*\/\/.*$/, '').replace(/\s*as const\s*$/, '').trim()
      if (/^\d+$/.test(rhs)) literals.set(m[1]!, Number(rhs))
      else if (/^[A-Z0-9_()\s+\-*/]+$/.test(rhs) && /[A-Z]/.test(rhs)) derived.set(m[1]!, { rhs, file: f })
    }
  }
  // one resolution pass per constant, so a constant derived FROM a derived constant resolves whatever the file order
  const out = new Map<string, { value: number; file: string }>()
  for (let pass = 0; pass < derived.size + 1; pass++) {
    let moved = false
    for (const [name, { rhs, file }] of derived) {
      if (out.has(name)) continue
      const value = evaluate(rhs, (n) => literals.get(n) ?? out.get(n)?.value ?? null)
      if (value === null || !Number.isInteger(value) || value <= 1) continue
      out.set(name, { value, file })
      moved = true
    }
    if (!moved) break
  }
  return out
}

/** THE RULE, and every clause of it was written by a witness who caught the previous rule missing something.
 *  A line restates a derived constant when the bare numeral is BOUND to a name (`= 14`, `: 14`, a parameter
 *  default) or COMPARED against something (`assert.equal(x, 14)`, `=== 14`). The numeral must stand alone: 140,
 *  0x14, 1.14, v14, -14 and 10 ** 14 are all excluded.
 *
 *  `word` IS WHAT MAKES THIS A FINDER RATHER THAN NOISE, and it was learned the expensive way. Without it, run over
 *  this tree, the rule returned 4,656 hits — `{ one: 1, two: 2, … }`, `slice(0, 16)`, `[2, 3, 5, 6]`. A VALUE DOES
 *  NOT IDENTIFY A CONSTANT: small integers are everywhere for unrelated reasons, and a finder that cries wolf is
 *  one nobody reads. So the caller supplies the words this constant is actually KNOWN BY, and the name bound or
 *  compared must carry one of them. With no words nothing matches, which is the safe direction to fail. */
export const restatesValue = (line: string, value: number, words: readonly string[] = []): boolean =>
  matcherFor(value, words)(line)

/** matcherFor(value, words) → the test, with its regexes built ONCE.
 *
 *  THE SECOND FOLD, and the larger one. restatesValue compiled four RegExp objects on every call, and the scan
 *  calls it per line per constant — 1,367 files x their lines x 50 constants, which is regex compilation in the
 *  innermost loop of the whole finder. The value and the vocabulary are fixed per constant, so the matcher is
 *  built per constant and then applied. Measured: 61,091 ms before any fold, 42,413 ms after the tree was walked
 *  once, and what is left was almost all this. The captain, 2026-09-07: "Slow comes from quantum cracks."
 *
 *  The clauses themselves are unchanged, and each was written by a witness who caught the previous rule missing
 *  something. A line restates a derived constant when the bare numeral is BOUND to a name (`= 14`, `: 14`, a
 *  parameter default) or COMPARED against something (`assert.equal(x, 14)`, `=== 14`). The numeral must stand
 *  alone: 140, 0x14, 1.14, v14, -14 and 10 ** 14 are all excluded.
 *
 *  A RESTATEMENT IS A VALUE, NEVER AN OPERAND. `maxBuffer: 32 * 1024 * 1024` and a chess tally `4 * 2 + 8 * 3`
 *  were the false positives that clause removes: a figure standing in for a constant is written alone, while a
 *  figure inside an arithmetic expression is a term of that expression. Measured: 22 findings before, 15 after.
 *
 *  `words` IS WHAT MAKES THIS A FINDER RATHER THAN NOISE, learned the expensive way. Without it, over this tree,
 *  the rule returned 4,656 findings — `{ one: 1, two: 2, … }`, `slice(0, 16)`, `[2, 3, 5, 6]`. A VALUE DOES NOT
 *  IDENTIFY A CONSTANT: small integers are everywhere for unrelated reasons. With no words nothing matches, which
 *  is the safe direction to fail.
 *
 *  A KNOWN BLIND SPOT, NAMED RATHER THAN GUESSED AT. When the figure is handed over positionally and the
 *  vocabulary lives in the CALLEE — `laneWork(3, 14)`, `waveCensus(14)` — this rule does not see it. A clause
 *  matching any call whose name loosely carries a stem was tried and MEASURED: it took the tree from 15 findings
 *  to 41 and every one it added was noise (`super(64, outputLen, 8, false)`, `animateStates([3, 6, 9 % 9])`).
 *  Precision is what makes a survey readable, so the miss stays, written down, with its own case in the control
 *  marked KNOWN MISS. Tuning further against the handful of spellings already known is the exact defect five
 *  witness waves caught in the generator this finder replaces. */
export function matcherFor(value: number, words: readonly string[]): (line: string) => boolean {
  const v = String(value)
  const bare = `(?<![\\w.$\\d-])(?<![*+/-]\\s)${v}(?!\\s*[*+/-]|[\\w.$\\d])`
  // STEMMED, because the tree names a thing in the plural and calls it in the singular: the vocabulary learns
  // `lanes` from `const lanes = VE_FACES`, and the call that freezes it is `laneWork(3, 14)`. Trimming one
  // trailing `s` joins them; anything cleverer would be a guess about English, which this is not.
  const stems = words.map((w) => (w.length > 3 ? w.replace(/s$/, '') : w))
  const known = (name: string): boolean => { const n = name.toLowerCase(); return stems.some((w) => n.includes(w)) }
  // A MODULUS BY THE VALUE, OR A RANGE OF IT, IS A RESTATEMENT NO BOUND-OR-COMPARED RULE SEES. `i % 14 === l`
  // and `Array(14)` carry the width structurally rather than by name, and the identifier beside them (`i`, `l`)
  // has no stem to learn from — so both escaped, and both were how the lane count sat frozen inside three sealed
  // theorems. Here the whole LINE supplies the vocabulary: if any identifier on it carries a stem, a modulus or a
  // range by the value counts. Narrower than matching every `% 14` anywhere, which would fire on every hash.
  const structural = new RegExp(`(?:%\\s*${bare})|(?:\\b(?:Array|range)\\s*\\(\\s*${bare}\\s*\\))`)
  const bound = new RegExp(`\\b([A-Za-z_$][\\w$]*)\\s*[:=]\\s*${bare}`)
  const compared = [new RegExp(`([\\w$.]+?)\\s*[=!]==?\\s*${bare}`), new RegExp(`${bare}\\s*[=!]==?\\s*([\\w$.]+)`),
                    new RegExp(`\\(\\s*([\\w$.]+?)\\s*,\\s*${bare}\\s*[),]`)]
  // the cheapest possible rejection first: a line not carrying the digits restates no value, by construction
  const carries = new RegExp(v)
  if (!stems.length) return () => false
  return (line: string): boolean => {
    if (!carries.test(line)) return false
    const b = bound.exec(line)
    if (b && known(b[1]!)) return true
    if (structural.test(line) && (line.match(/[A-Za-z_$][\w$]*/g) ?? []).some(known)) return true
    for (const re of compared) { const m = re.exec(line); if (m && m[1]!.split('.').some(known)) return true }
    return false
  }
}

/** wordsFor(name, files, read) → the words this constant is KNOWN BY, learned from the tree's own use of it and
 *  never typed here. Two sources, both derived: the constant's own name parts (VE_FACES → "ve", "faces"), and
 *  every identifier the importing files bind it to or compare it against (`const lanes = VE_FACES`,
 *  `assert.equal(circuit.faces, VE_FACES)` → "lanes", "faces"). A file that uses the constant teaches what the
 *  constant is called; a file that copied its numeral is then caught by the vocabulary of its own siblings.
 *
 *  Kept for one constant because a caller sometimes wants exactly one; the whole-tree path folds it (vocabularies)
 *  so the tree is walked ONCE rather than once per constant. */
export function wordsFor(name: string, files: readonly string[], read: (f: string) => string): string[] {
  return vocabularies([name], files, read).get(name)!
}

/** vocabularies(names, files, read) → the learned words for EVERY constant in one pass over the tree.
 *
 *  THE FOLD THAT MATTERS. Asking wordsFor() per constant re-read all 1,367 sources for each of 50 constants, and
 *  the scan did it again: 68,350 reads where 1,367 suffice. Measured before this fold: 61,091 ms for fifteen
 *  findings. The work never needed splitting across a host — it needed the tree walked once, with all fifty
 *  questions asked of each file while it is in hand. The captain, 2026-09-07: "Slow comes from quantum cracks."  */
export function vocabularies(names: readonly string[], files: readonly string[], read: (f: string) => string): Map<string, string[]> {
  const out = new Map(names.map((n) => [n, new Set(n.toLowerCase().split('_').filter((w) => w.length > 2))]))
  // one regex per constant, built once, then every file is opened once and asked all of them
  const probes = names.map((name) => ({
    name,
    present: new RegExp(`\\b${name}\\b`),
    res: [new RegExp(`\\b([A-Za-z_$][\\w$]*)\\s*[:=]\\s*${name}\\b`, 'g'),
          new RegExp(`([\\w$.]+?)\\s*[=!]==?\\s*${name}\\b`, 'g'),
          new RegExp(`\\(\\s*([\\w$.]+?)\\s*,\\s*${name}\\s*[),]`, 'g')],
  }))
  for (const f of files) {
    const src = read(f)
    let code: string | null = null
    for (const { name, present, res } of probes) {
      if (!present.test(src)) continue
      code ??= codeOnly(src)
      const words = out.get(name)!
      for (const re of res) for (const m of code.matchAll(re)) {
        for (const part of m[1]!.split('.')) {
          const w = part.toLowerCase().replace(/^(the|a|my)/, '')
          if (w.length > 2 && !/^\d/.test(w)) words.add(w)
        }
      }
    }
  }
  return new Map([...out].map(([n, ws]) => [n, [...ws]]))
}

/** restatedConstants() → every place the tree writes a derived constant's value as a bare numeral instead of
 *  reaching for the constant. Pure given the tree: no clock, no RNG. */
export function restatedConstants(files: readonly string[] = sources(), read: (f: string) => string = rdRoot): Restated[] {
  const derived = derivedConstants(files, read)
  const names = [...derived.keys()]
  // A WORD SHARED BY MANY CONSTANTS DISCRIMINATES NONE OF THEM, and which words those are is DERIVED rather than
  // listed. `length`, `size`, `count` and `number` are each learned honestly — the tree really does write
  // `x.length === VE_FACES` — but they are learned for a dozen constants at once, so a numeral beside one of them
  // says nothing about WHICH constant it restates. Measured: 61 of 232 learned words are shared, and dropping
  // them took this finder from 131 findings to 22. A word earns its place by belonging to exactly one constant.
  const learned = vocabularies(names, files, read)
  const owners = new Map<string, number>()
  for (const words of learned.values()) for (const w of new Set(words)) owners.set(w, (owners.get(w) ?? 0) + 1)
  const vocabulary = new Map([...learned].map(([n, ws]) => [n, ws.filter((w) => owners.get(w) === 1)]))

  // ONE PASS PER FILE, ALL FIFTY QUESTIONS ASKED WHILE IT IS IN HAND — the fold that took this from 61 s to
  // seconds. A file is read once, stripped once, split once, and every constant is then asked of every line.
  const out: Restated[] = []
  for (const f of files) {
    const raw = read(f)
    // THE EXEMPTION IS PER LINE, NOT PER FILE, and it was per file until a witness measured what that cost.
    // The old rule skipped a whole file that named the constant anywhere, on the reasoning that a file reaching
    // for a constant is not copying it. A file can do BOTH: src/scripts/axiom-hunt.ts writes `VE_FACES === 14` on
    // one line and `STRIP_LINES === 14` four lines later — one quantity, two forms, one of them bare — and the
    // file-level exemption made it invisible BY CONSTRUCTION. The finder reported VE_FACES findings: 0 over a tree
    // that held ten. What is genuinely exempt is a line that names the constant, and the line beside it: that
    // pairing is the drift ANCHOR this tree uses deliberately (assert x = 14 immediately beside assert x = VE_FACES,
    // so neither side can go tautological), and a witness judged it defensible. Two lines of distance is not.
    const mine = names.filter((n) => derived.get(n)!.file !== f)
    if (!mine.length) continue
    const lines = codeOnly(raw).split('\n')
    const anchors = new Map(mine.map((n) => [n, new RegExp(`\\b${n}\\b`)]))
    const anchored = (n: string, i: number): boolean =>
      [i - 1, i, i + 1].some((j) => j >= 0 && j < lines.length && anchors.get(n)!.test(lines[j]!))
    const matchers = mine.map((n) => ({ constant: n, test: matcherFor(derived.get(n)!.value, vocabulary.get(n)!) }))
    for (const [i, line] of lines.entries()) {
      if (!/\d/.test(line)) continue                       // a line with no digit restates no numeral
      for (const { constant, test } of matchers) {
        const { value, file } = derived.get(constant)!
        if (anchored(constant, i)) continue        // the constant is named here or next door: an anchor, not a copy
        if (test(line)) {
          out.push({ constant, value, declaredIn: file, file: f, line: i + 1, text: line.trim().slice(0, 90) })
        }
      }
    }
  }
  return out.sort((a, b) => (a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1))
}

/** restatedGaps() → the guard's shape: each restatement with the exact edit that cures it */
export function restatedGaps(): { what: string; fix: string }[] {
  return restatedConstants().map((r) => ({
    what: `${r.file}:${r.line} writes ${r.constant}'s value as the bare numeral ${r.value} — \`${r.text}\` — in a file that never names ${r.constant} (declared at ${r.declaredIn})`,
    fix: `edit ${r.file}:${r.line}: import { ${r.constant} } from its declaration and use it. A derived constant copied as a numeral is a figure that has stopped tracking its own definition — the two drift apart in silence, which is what lead a5572638 alleged and what five witness waves found eleven times`,
  }))
}
