import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { PROJECTED } from '../grid.js'
import { theoremByKey } from '../theorems/index.js'
import {
  INVOLUTION_HANDLES, buildWing, involutionWings, leadOf, wingFileOf,
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

test('the ledger titles one wing per involution, each file its own', () => {
  const wings = involutionWings()
  assert.deepEqual(wings.map((w) => w.handle), [...INVOLUTION_HANDLES])
  assert.equal(new Set(wings.map((w) => w.file)).size, wings.length)
  for (const w of wings) assert.ok(w.summary.includes(leadOf(w.handle).lead))
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
