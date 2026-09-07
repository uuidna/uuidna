// assert-tautology — AN ASSERTION THAT COMPARES AN EXPRESSION TO ITSELF AFTER A MUTATION IS BLIND TO THE MUTATION
// BY CONSTRUCTION: both sides evaluate after it, so no value from before survives to be compared.
//
// `assert.equal(fileManifest(committed)['src/a.ts'], fileManifest(committed)['src/a.ts'], 'the manifest is stable')`
// shipped on 2026-09-07 inside the test that guards the receipt (lead 235), after a writeFileSync it meant to
// be unmoved by: both sides evaluate after the write, so the line could not fail and its message claimed a
// stability it never checked. A peer read it dead, and then measured the obvious rule against the suite: the
// SAME TEXT — one expression on both sides — appears 52 times as a load-bearing determinism check
// (`assert.equal(gridRoot(), gridRoot(), 'deterministic')`) in a tree whose law is no clock, no RNG. The source
// text does not carry the difference; the claim does. A determinism check has nothing between its two
// evaluations by design; a dead line has a mutation between the value it meant to capture and the comparison.
// So the rule is positional: the two arguments are one expression AND the enclosing test body mutates state
// (a filesystem write, a process spawn) before the assertion. Measured 2026-09-07 after the fix: 51 same-text
// asserts, 0 with a mutation before them; the committed dead line, fed back in, is the one the rule names.
//
// THE BOUNDARY, STATED RATHER THAN GUESSED PAST (lead 237, a peer's measurement): a determinism check that follows an
// UNRELATED fixture write in the same test body — `writeFileSync(f, 'seed'); assert.equal(gridRoot(), gridRoot())` —
// is NAMED, falsely. The obvious narrowing, "count only a mutation whose target names something the assertion
// reads", was checked and refused: it also clears the real dead line, whose write targets `root` while the
// assertion reads `committed`. So the rule stays wide and says so; the tree has zero such shapes today, and the
// control test below holds the false positive as a documented limit, not a surprise.
//
// The first draft's regex was paren-blind — a lazy `[\s\S]{1,200}?` stopped at the first `)` — and reported 0
// over 383 files because it could not read a single call argument. That is the instrument
// no_instrument_narrower_than_its_question forbids, and it was a peer's probe, not this tree's guard, that saw it.
// Arguments are now split at depth zero, strings respected. Pure over source text so the guard and its test share it.
export interface TautologicalAssert { line: number; text: string }

const CALL = /assert\.(equal|deepEqual|strictEqual|deepStrictEqual|notEqual|notDeepEqual|notStrictEqual)\(/g
/** state a test body can change that a later same-expression comparison cannot see */
export const MUTATION = /\b(writeFileSync|appendFileSync|rmSync|unlinkSync|mkdirSync|renameSync|copyFileSync|truncateSync|execSync|execFileSync|spawnSync)\s*\(/
const norm = (s: string): string => s.replace(/\s+/g, '')

/** topLevelArgs(src, openParen) → the call's arguments split at depth zero, quotes respected */
export function topLevelArgs(src: string, open: number): string[] {
  const out: string[] = []
  let depth = 0, cur = '', quote: string | null = null
  for (let i = open + 1; i < src.length; i++) {
    const c = src[i]!
    if (quote) { cur += c; if (c === '\\') { cur += src[++i] ?? ''; continue } if (c === quote) quote = null; continue }
    if (c === '"' || c === '\'' || c === '`') { quote = c; cur += c; continue }
    if ('([{'.includes(c)) depth++
    if (')]}'.includes(c)) { if (depth === 0) { out.push(cur); return out } depth-- }
    if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue }
    cur += c
  }
  return out
}

/** sameExpressionAsserts(source) → every two-argument assert whose arguments are one expression (the survey) */
export function sameExpressionAsserts(source: string): TautologicalAssert[] {
  const out: TautologicalAssert[] = []
  for (const m of source.matchAll(CALL)) {
    const a = topLevelArgs(source, m.index! + m[0].length - 1)
    if (a.length < 2 || norm(a[0]!) !== norm(a[1]!)) continue
    out.push({ line: source.slice(0, m.index).split('\n').length, text: (m[0] + a[0]!.trim()).replace(/\s+/g, ' ').slice(0, 120) })
  }
  return out
}

/** tautologicalAsserts(source) → the same-expression asserts that follow a mutation in their own test body — the dead ones */
export function tautologicalAsserts(source: string): TautologicalAssert[] {
  return sameExpressionAsserts(source).filter((t) => {
    const at = source.split('\n').slice(0, t.line - 1).join('\n').length
    const bodyStart = source.lastIndexOf('\ntest(', at)
    return MUTATION.test(source.slice(bodyStart < 0 ? 0 : bodyStart, at))
  })
}
