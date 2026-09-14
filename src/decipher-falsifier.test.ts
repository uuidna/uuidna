// decipher-falsifier — the Decipher wing's denials, read from the sealed statements themselves: the texts and the
// relabelings are the lists each theorem's own Lean carries, recomputed here, and each claim is handed a mutation that
// must fail. The emitter is not imported — it writes its wing on load.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremByKey } from './theorems/index.js'

const leanOf = (key: string): string => {
  const t = theoremByKey().get(key) as { lean?: string; statement?: string } | undefined
  assert.ok(t, `${key} is sealed`)
  return `${t.lean ?? ''} ${t.statement ?? ''}`
}
const listsIn = (s: string): number[][] => [...s.matchAll(/\[(\d+(?:,\d+)+)\]/g)].map((m) => m[1]!.split(',').map(Number))
const sumSq = (t: readonly number[]): number => {
  const bs = t.slice(1).map((c, i) => `${t[i]},${c}`)
  return bs.reduce((a, b) => a + bs.filter((x) => x === b).length, 0)
}
const relabel = (t: readonly number[], p: readonly number[]): number[] => t.map((c) => p[c]!)

test('relabel3_preserves_bigram_collisions — every relabeling it names keeps the count; merging two letters moves it', () => {
  const lean = leanOf('relabel3_preserves_bigram_collisions')
  const text = listsIn(lean)[0]!
  const perms = [...lean.matchAll(/\((\d+),(\d+),(\d+)\)/g)].map((m) => [Number(m[1]), Number(m[2]), Number(m[3])])
  assert.ok(text.length > 2 && perms.length > 1, 'the statement carries its text and its relabelings')
  assert.ok(perms.every((p) => sumSq(relabel(text, p)) === sumSq(text)))
  // FALSIFIER: a relabeling that is not a bijection sends unequal pairs to equal ones, and the count moves
  const merged = perms[0]!.map((c, i) => (i === 1 ? perms[0]![0]! : c))
  assert.notEqual(sumSq(relabel(text, merged)), sumSq(text), 'a non-bijective relabeling must break the invariance')
})

test('letter_order_moves_bigram_collisions — same letters, other order, a different count; the same order does not move', () => {
  const lean = leanOf('letter_order_moves_bigram_collisions')
  const [sorted, text] = listsIn(lean) as [number[], number[]]
  assert.deepEqual([...text].sort((a, b) => a - b), sorted, 'the first list is the second, sorted')
  assert.ok(lean.includes(`= ${sumSq(sorted)}`) && lean.includes(`= ${sumSq(text)}`), 'the numerals it states are the recomputed counts')
  assert.notEqual(sumSq(sorted), sumSq(text))
  // FALSIFIER: the claim that order moves the count is false for an order compared with itself
  assert.equal(sumSq([...sorted].sort((a, b) => a - b)), sumSq(sorted))
})
