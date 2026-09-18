import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { PROJECTED } from '../grid.js'
import { theoremByKey } from '../theorems/index.js'
import { proofsOf } from './lean-gen.js'
import {
  INVOLUTION_HANDLES, buildWing, involutionWings, leadOf, wingFileOf, formalLeads, leadScopeOf, buildFormalWing,
  defBlocks, closureOf, generatorFilesOf, reconcileRunsOf, memProof,
} from './involution-family.js'

const flat = (s: string): string => s.replace(/\s+/g, ' ').trim()

test('every involution states its own refuted lead and proves its negation, every js leg holding', async () => {
  for (const h of INVOLUTION_HANDLES) {
    const lead = leadOf(h).lead
    assert.equal(handleOf(toUuid(lead)), h, `${h}: the lead is found by its handle`)
    const w = await buildWing(h)
    assert.equal(w.file, wingFileOf(h))
    assert.match(w.defs, new RegExp(`^def lead_${h} : Prop :=`, 'm'))
    assert.ok(flat(w.defs).includes(flat(lead)), `${h}: the lead's own text documents lead_${h}`)
    const inv = w.facts.find((f) => f.key === `involution_${h}`)
    assert.ok(inv?.lean?.startsWith(`theorem involution_${h} : ¬ lead_${h} := by`), `${h}: involution_${h} states ¬ lead_${h}`)
    for (const f of w.facts) {
      assert.equal(f.js?.(), true, `${f.key}: the js leg recomputes the refutation`)
      // lean-ledger reads a theorem only in the shape `theorem <key> : <statement> := by <tactic>`
      assert.match(f.lean ?? '', new RegExp(`^theorem ${f.key} :[^]*?:= by`), `${f.key}: the ledger can read it`)
    }
  }
})

test('emit names the tactics its proofs use, and a decide-only wing keeps the standing header', async () => {
  assert.equal(proofsOf([{ key: 'a', stmt: '1 = 1' }, { key: 'b', lean: 'theorem b : 2 = 2 := by decide' }]), 'Every proof `by decide`')
  assert.equal(proofsOf([{ key: 'a', stmt: '1 = 1' }, { key: 'b', lean: 'theorem b : ¬ p := by\n  exact fun h => h' }]), 'Every proof checked by the kernel (by decide, by exact)')
  assert.equal(proofsOf([{ key: 'b', lean: 'theorem b : ¬ p := by unfold p; decide' }]), 'Every proof checked by the kernel (by unfold)')
  // every involution wing's header is the one its sealed file carries
  for (const h of INVOLUTION_HANDLES) {
    const w = await buildWing(h)
    const onDisk = readFileSync(join(ROOT, 'lean', w.file), 'utf8').split('\n')[0]!
    assert.ok(onDisk.includes(` ${proofsOf(w.facts)}, sorry-free,`), `${w.file}: ${onDisk.slice(0, 120)}`)
  }
})

test('the ledger titles one wing per involution and per accepted formalised lead, each file its own', () => {
  const wings = involutionWings()
  const formal = formalLeads()
  assert.deepEqual(wings.map((w) => w.handle), [...INVOLUTION_HANDLES, ...formal.map((f) => f.handle)])
  assert.equal(new Set(wings.map((w) => w.file)).size, wings.length)
  // A SUMMARY REPEATS WHAT THE PROP STATES, WHICH IS THE LEAD ONLY WHEN THE PROP STATES THE WHOLE LEAD. This used
  // to assert `summary.includes(row.lead)` unconditionally, which PINNED the over-read three of seven witnesses
  // dissented on: lead_90c4f258 states one inequality about two timestamps, and PRINCIPLE.md §217 published it as
  // stating "…origin/main == HEAD… that path did NOT fire…" — claims no kernel decided. A row that narrows says so
  // in a doc comment on its own `def lead_<handle>`; where there is none, the lead still stands (2026-09-18).
  const summaryStates = (summary: string, row: { lead: string; lean?: string }, handle: string): void => {
    const scope = leadScopeOf(handle, row.lean)
    if (scope) {
      assert.ok(summary.includes(scope), `${handle}: the summary must repeat the scope the row declares, not the lead`)
      assert.ok(!summary.includes(row.lead), `${handle}: the summary must NOT republish the whole lead past a narrowing Prop`)
    } else assert.ok(summary.includes(row.lead), `${handle}: with no declared scope the Prop states the lead, so the summary carries it`)
  }
  for (const w of wings.slice(0, INVOLUTION_HANDLES.length)) summaryStates(w.summary, leadOf(w.handle), w.handle)
  for (const [i, f] of formal.entries()) summaryStates(wings[INVOLUTION_HANDLES.length + i]!.summary, f.row, f.handle)
})

test('a wing fact name is ONE FLOWED LINE — a markdown heading cannot survive a wrapped docstring', () => {
  // The published article makes a theorem's name a heading. CommonMark closes a heading at the first newline and
  // renders four-space-indented continuations as a CODE BLOCK, so a row whose docstring wraps across lines
  // published a broken page while claiming nothing false — measured on 90c4f258 (2026-09-18), found by a witness
  // reading the rendered surface rather than the field.
  for (const f of formalLeads()) {
    for (const fact of buildFormalWing(f).facts) {
      assert.ok(!/[\r\n]/.test(fact.name ?? ''), `${fact.key}: a name reaching a heading may not carry a newline`)
      assert.ok(!/ {2}/.test(fact.name ?? ''), `${fact.key}: a name reaching a heading may not carry run-together indentation`)
    }
  }
})

test('control: leadScopeOf reads a declared scope and refuses to invent one', () => {
  const lean = (doc: string): string => `def gap : Nat := 5
${doc}def lead_abcd1234 : Prop := 17 ≤ gap
theorem involution_abcd1234 : ¬ lead_abcd1234 := by unfold lead_abcd1234; decide
`
  assert.equal(leadScopeOf('abcd1234', lean('/-- states one inequality and nothing else -/\n')), 'states one inequality and nothing else')
  assert.equal(leadScopeOf('abcd1234', lean('')), null, 'an undocumented lead def declares no scope')
  assert.equal(leadScopeOf('abcd1234', undefined), null, 'a row with no lean declares no scope')
  // the doc must be the one attached to THIS def, not an earlier one left further up the file
  assert.equal(leadScopeOf('abcd1234', `/-- an earlier note -/\ndef gap : Nat := 5\n\ndef lead_abcd1234 : Prop := 17 ≤ gap\n`), null)
})

test('the manifest reader follows its declaration: a moved entry moves, a commented one does not count', () => {
  const src = "const GENERATORS: Gen[] = [\n  { file: 'a.js', args: [] },\n  // { file: 'ghost.js' },\n  { file: 'b.js', args: [], note: 'see https://x' },\n]\n"
  assert.deepEqual(generatorFilesOf(src), ['a.js', 'b.js'])
  assert.deepEqual(generatorFilesOf(src.replace("'a.js'", "'c.js'")), ['c.js', 'b.js'])
  assert.throws(() => generatorFilesOf('const OTHER = []'))
  // a second instrument over the live file: one entry per line that opens with `{ file:` — it must count the same
  const live = readFileSync(join(ROOT, 'src', 'scripts', 'generate.ts'), 'utf8')
  assert.equal(generatorFilesOf(live).length, live.split('\n').filter((l) => /^\s*\{ file: '/.test(l)).length)
})

test('reconcile\'s runs are its run() calls, in order, and nothing else', () => {
  const src = "run('node dist/scripts/guard.js')\n// run('node dist/scripts/old.js')\nrun('npm run build')\nrun('node dist/scripts/generate.js') // every emitter"
  assert.deepEqual(reconcileRunsOf(src), ['guard.js', 'generate.js'])
  assert.ok(reconcileRunsOf(readFileSync(join(ROOT, 'src', 'scripts', 'reconcile.ts'), 'utf8')).includes('generate.js'))
})

test('a def enters a wing only if code reaches it — a name in a comment reaches nothing', () => {
  const blocks = defBlocks('def a : Nat := 1\ndef b : Nat := a -- unlike c\ndef c : Nat := 2\ndef d (x : Nat) : Nat :=\n  b + x\n\ntheorem t : d 0 = 1 := by decide')
  assert.deepEqual(blocks.map((b) => b.name), ['a', 'b', 'c', 'd'])
  assert.equal(blocks[3]!.text, 'def d (x : Nat) : Nat :=\n  b + x')
  assert.deepEqual(closureOf(blocks, 'd 3').map((b) => b.name), ['a', 'b', 'd'])
  assert.deepEqual(closureOf(blocks, '-- d').map((b) => b.name), [])
})

test('a membership proof is as deep as its index', () => {
  assert.equal(memProof(0), 'List.Mem.head _')
  assert.equal(memProof(2), 'List.Mem.tail _ (List.Mem.tail _ (List.Mem.head _))')
})

// A universal lemma is decided by no finite evaluator; its falsifier is a counterexample search over the sealed
// statement, and the mutated lemma below is the proof that the search can find one.
test('not_dvd_of_bound_e92de628 meets no counterexample in its window, and its mutation does', () => {
  const sealed = theoremByKey().get('not_dvd_of_bound_e92de628')
  assert.equal(sealed?.statement, '∀ d n : Nat, (∀ j, j < n / d + 1 → d * j ≠ n) → ¬ d * (n / d + 1) ≤ n → ¬ d ∣ n',
    'the search below reads this statement; a moved statement must move the search')
  const W = 64
  const div = (n: number, d: number): number => (d === 0 ? 0 : (n - (n % d)) / d)   // Lean Nat `/`: n / 0 = 0
  const dvd = (d: number, n: number): boolean => (d === 0 ? n === 0 : n % d === 0)
  const noSmall = (d: number, n: number): boolean => { for (let j = 0; j < div(n, d) + 1; j++) if (d * j === n) return false; return true }
  const overshoots = (d: number, n: number): boolean => !(d * (div(n, d) + 1) <= n)
  const counterexamples = (lemma: (d: number, n: number) => boolean): number => {
    let k = 0
    for (let d = 0; d < W; d++) for (let n = 0; n < W; n++) if (!lemma(d, n)) k++
    return k
  }
  assert.equal(counterexamples((d, n) => !(noSmall(d, n) && overshoots(d, n)) || !dvd(d, n)), 0)
  // CONTROL: without the bounded search the overshoot holds for every d > 0, divisors included
  assert.ok(counterexamples((d, n) => !overshoots(d, n) || !dvd(d, n)) > 0, 'a search that misses this mutation falsifies nothing')
})

test('e92de628 keeps the lead\'s wing count, the one src/grid.ts records', async () => {
  const w = await buildWing('e92de628')
  const wings = Number(/^def historicalWings : Nat := (\d+)$/m.exec(w.defs)?.[1])
  const full = Number(/^(\d+) tiles (\d+)/.exec(leadOf('e92de628').lead)?.[2])
  assert.equal(PROJECTED.length * wings, full)
  assert.ok(readFileSync(join(ROOT, 'src', 'grid.ts'), 'utf8').includes(`${PROJECTED.length} × ${wings} = ${full}`), 'grid.ts records the historical grid')
})
