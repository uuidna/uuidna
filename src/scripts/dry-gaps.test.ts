// dry-gaps — the linear-scan finder must catch the scan it was folded from and stay silent on the keyed lookup.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { linearScansIn, linearGaps, writeOnlyMemosIn, memoGaps } from './dry-gaps.js'

test('linearScansIn names the scan and not the keyed lookup', () => {
  const src = [
    "const a = theoremByKey().get(String(key))",
    "const t = THEOREMS.find((x) => x.key === String(key))",
    "const u = THEOREMS.find((t) => t.key === key)",
    "const v = THEOREMS.find((t) => t.file === f)",
    "const w = theorems().find((x) => x.key === subject.key)",
    "const byKey = new Map(theorems().map((t) => [t.key, t]))",
    "// THEOREMS.find((x) => x.key === k) named in a comment is prose, not a scan",
  ].join('\n')
  const lines = linearScansIn(src)
  assert.ok(lines.length >= 1, 'the positive control: linearGaps fires through linearScansIn on a crafted violation')
  assert.deepEqual(lines, [2, 3, 5, 6], 'the key scans through either door name and the per-call map, by line; the file scan is a different question')
})

test('the tree holds no linear key scan (the three cured sites stay cured)', () => {
  assert.deepEqual(linearGaps(), [])
})


// THE POSITIVE CONTROL for memoGaps: a memo assigned and never read must fire; three real reading shapes must not.
test('writeOnlyMemosIn names the write-only memo and stays silent on every shape that reads one back', () => {
  const src = [
    "let _written: T | null = null",            // 1: assigned below, never read — the defect
    "export function a() { _written = compute(); return _written2 }",
    "let _early: T | null = null",              // 3: read by an early return
    "export function b() { if (_early) return _early; _early = compute(); return _early }",
    "let _coalesced: T[] | null = null",        // 5: read and written by ??=
    "export function c() { return (_coalesced ??= build()) }",
    "const _byKey = new Map<string, T>()",      // 7: read by a Map get
    "export function d(k: string) { const hit = _byKey.get(k); if (hit) return hit; const v = build(k); _byKey.set(k, v); return v }",
    "const _0n = BigInt(0)",                    // 9: a constant binding nothing reads is DEAD CODE, not a write-only memo
    "const _labels = ['a', 'b']",               // 10: likewise — this finder names memos, and names them exactly
  ].join('\n')
  const fired = writeOnlyMemosIn(src)
  assert.ok(fired.length >= 1, 'the positive control: memoGaps fires through writeOnlyMemosIn on a crafted write-only memo')
  assert.deepEqual(fired, [1], 'only the memo nothing reads back — the early return, the ??= and the Map get are real reads')
})

test('the tree holds no write-only memo (the trial memo stays read)', () => {
  assert.deepEqual(memoGaps(), [])
})
