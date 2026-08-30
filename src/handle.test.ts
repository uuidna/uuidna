// handle — every aspect of the address scheme, checked against the LIVE ledger rather than against examples.
//
// An address scheme fails quietly. Two payloads land in one place, or a path stops recovering its handle, and
// nothing complains until something is already lost — so each test here carries a negative control, and the
// properties are asserted over all 1250 live handles rather than over a chosen few. Today's audits found four
// checks in this repo that cannot fail at all; a suite that only demonstrates success is not evidence.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  isHandle, handleOf, seedOf, handleParts, reverseHandle, handlePath, handleOfPath, handleDirs, pathOrderMatchesHandleOrder, HANDLE_ROOT,
} from './handle.js'
import { chunkHandleOf, buildChunks } from './handle-chunks.js'
import { theorems } from './index.js'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'

const live = (): string[] => [...new Set(theorems().map((t) => chunkHandleOf(t.key)).filter((h): h is string => !!h))]

// ── SHAPE. Eight lowercase hex, splitting four ways — not a chosen convention but the shape chunkHandleOf emits.
test('every live handle is eight lowercase hex characters', () => {
  const hs = live()
  assert.ok(hs.length > 1000, `expected the full ledger, saw ${hs.length}`)
  assert.ok(hs.every(isHandle))
})

test('malformed handles are REFUSED', () => {
  for (const bad of ['CC9C0011', 'cc9c001', 'cc9c00112', 'zz9c0011', '', 'cc 9c0011', 'cc9c-011']) {
    assert.equal(isHandle(bad), false, `${JSON.stringify(bad)} must not pass`)
    assert.throws(() => handleParts(bad), /eight lowercase hex/, `${JSON.stringify(bad)} must throw`)
  }
  // and the control: a well-formed one must NOT throw
  assert.deepEqual(handleParts('cc9c0011'), ['cc', '9c', '00', '11'])
  assert.equal(reverseHandle('cc9c0011'), '11009ccc')
  assert.equal(reverseHandle(reverseHandle('cc9c0011')), 'cc9c0011')
})

// ── REVERSIBILITY. The property the site and the MCP catalogue currently lack: neither can recover the other's
// identity, so neither can be checked against it.
test('the round trip holds for EVERY live handle', () => {
  const hs = live()
  const broken = hs.filter((h) => handleOfPath(handlePath(h)) !== h)
  assert.deepEqual(broken, [], 'a path must recover its handle exactly')
})

test('handleOfPath refuses what is not in the store — "not ours" is distinct from "malformed"', () => {
  assert.equal(handleOfPath('docs/mcp.md'), null)
  assert.equal(handleOfPath('src/chunks/7a/97c585.json'), null, 'the older two-char store is NOT this store')
  assert.equal(handleOfPath(`${HANDLE_ROOT}/zz/9c/00/11/index.json`), null, 'non-hex parts are not a handle')
  assert.equal(handleOfPath(`${HANDLE_ROOT}/cc/9c/00`), null, 'a truncated path addresses nothing')
  assert.equal(handleOfPath(`${HANDLE_ROOT}/cc/9c/00/11/index.json`), 'cc9c0011')
})

// ── COLLISION. Two payloads in one place is the failure that loses data silently.
test('no two live handles address the same path', () => {
  const hs = live()
  const paths = hs.map((h) => handlePath(h))
  assert.equal(new Set(paths).size, hs.length, 'a collision would overwrite a payload')
  // the control: two DIFFERENT files under one handle are distinct paths, and share a directory
  assert.notEqual(handlePath('cc9c0011', 'index.json'), handlePath('cc9c0011', 'page.json'))
  assert.equal(handleDirs('cc9c0011').pop(), `${HANDLE_ROOT}/cc/9c/00/11`)
})

// ── ORDER. Lexicographic over paths equals numeric over handles, which is what makes the store sortable with no
// index at all.
test('path order equals handle order across the live ledger', () => {
  assert.equal(pathOrderMatchesHandleOrder(live()), true)
})

// ── BALANCE. Four levels of 256; the tree stays even without anything evening it.
test('the tree narrows by 256 at each level and never exceeds it', () => {
  const hs = live()
  const perLevel = [0, 1, 2, 3].map((i) => new Set(hs.map((h) => handleParts(h)[i])).size)
  for (const n of perLevel) assert.ok(n <= 256, `a level held ${n} entries, above the 256 a two-hex part allows`)
  assert.equal(handleDirs('cc9c0011').length, 4, 'four levels, one per part')
  // capacity, as an integer bracket rather than a rounded claim: 256^4 addresses, far above what is stored
  assert.ok(256 * 256 * 256 * 256 > hs.length * 1000, 'the space must dwarf the occupancy')
})

test('handleDirs returns each level outermost first, so a writer can create them in order', () => {
  assert.deepEqual(handleDirs('cc9c0011'), [
    `${HANDLE_ROOT}/cc`, `${HANDLE_ROOT}/cc/9c`, `${HANDLE_ROOT}/cc/9c/00`, `${HANDLE_ROOT}/cc/9c/00/11`,
  ])
})

// ── The scheme must survive a handle that is all zeros or all f's, since those are the ends of the space.
test('the extremes of the space address correctly', () => {
  for (const edge of ['00000000', 'ffffffff']) {
    assert.equal(isHandle(edge), true)
    assert.equal(handleOfPath(handlePath(edge)), edge)
  }
})

// ── ONE DERIVATION, OR IT FRAGMENTS AGAIN. handleOf was written three times before it was written once:
// gen-handle-chunks stripped the hyphens, editor.ts and mcp.ts sliced the raw string, and the three agreed ONLY
// because a v8 UUID's first group is exactly eight hex characters. That is agreement by formatting coincidence.
// This is the source-level finder: a new inline `.slice(0, 8)` on an address re-forks the identity scheme, and the
// only way that stays caught is if adding one fails here.
test('every handle in the source comes from handleOf — no site re-derives it inline', () => {
  const SRC = join(ROOT, 'src')
  const offenders: string[] = []
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name)
      if (e.isDirectory()) { if (e.name !== 'tests' && e.name !== 'chunks') walk(full); continue }
      if (!e.name.endsWith('.ts')) continue
      const text = readFileSync(full, 'utf8')
      text.split('\n').forEach((line, i) => {
        // A finder that cries wolf gets switched off, so this flags a handle DERIVATION and nothing else. The
        // first pass caught 18 lines of which 3 were real: arrays truncated for display (`forged.slice(0, 8)`),
        // receipts interpolated into a log line, and eight hex parsed as an INTEGER SEED (aura, css, holofractal)
        // all slice eight and none of them mint an identity. The receiver must be address-shaped and assigned.
        // NARROWED, because the first version could not tell an array slice from a string one. It flagged
        // minted.slice(0, 8) and uniq.slice(0, 8) — arrays — plus display truncation in HTML and log lines. A
        // grep cannot distinguish use from mention, so the criterion is what the value BECOMES: a site that
        // produces something *named* a handle must derive it, and everything else may slice for its own reasons.
        if (!/(?:\bhandle\b\s*[:=]|\bhandle[A-Z]\w*\s*=)[^,;]*\.slice\(0, ?8\)/.test(line)) return
        if (/handleOf|hex\.slice/.test(line)) return
        offenders.push(`${full.slice(SRC.length + 1)}:${i + 1}: ${line.trim().slice(0, 90)}`)
      })
    }
  }
  walk(SRC)
  assert.deepEqual(offenders, [], 'these re-derive a handle inline — call handleOf(address) instead')
})

test('handleOf refuses what it cannot address, rather than coercing it', () => {
  assert.equal(handleOf('57f5ef04-a2f0-83cb-a686-3343c324de12'), '57f5ef04')
  assert.equal(handleOf('57f5ef04a2f083cba6863343c324de12'), '57f5ef04', 'hyphens are incidental')
  assert.equal(handleOf('57F5EF04-A2F0-83CB-A686-3343C324DE12'), '57f5ef04', 'handles are lowercase hex')
  for (const bad of ['', 'zzzzzzzz', 'short', '----------'])
    assert.throws(() => handleOf(bad), /eight hex/, `refused, not coerced: ${JSON.stringify(bad)}`)
})

// ── THE SECOND DERIVATION. seedOf was six inline expressions, and the sharpest part is that ONE of them took a
// different route to the same number: css.ts computed Number(BigInt('0x' + h)) where aura.ts, captain/repos,
// holofractal and refactor all used parseInt(h, 16). The two agree over the whole 8-hex domain — which is exactly
// why the split survived unnoticed for as long as it did. Nothing ever disagreed, so nothing ever complained.
test('the two routes to an address-integer agree over the domain, edges included', () => {
  const both = (h: string): void =>
    assert.equal(parseInt(h, 16), Number(BigInt('0x' + h)), `the routes diverge at ${h}`)
  for (const h of ['00000000', 'ffffffff', '80000000', '7fffffff', '0000000f', 'deadbeef'])  both(h)
  for (let i = 0; i < 200000; i += 7919) both(i.toString(16).padStart(8, '0'))
})

test('seedOf is the handle read as a number, over the LIVE ledger and not over examples', () => {
  const T = theorems()
  assert.ok(T.length > 1000)
  const wrong = T.filter((t) => seedOf(t.address) !== parseInt(handleOf(t.address), 16))
  assert.deepEqual(wrong.map((t) => t.key), [], 'the seed must be the handle')
  for (const t of T.slice(0, 200)) {
    assert.ok(Number.isInteger(seedOf(t.address)), 'an exact integer')
    assert.ok(seedOf(t.address) <= 0xffffffff, 'eight hex cannot exceed 2^32 - 1')
  }
})

// ── SAME-LOOKING CODE, DIFFERENT ACTS. These must NOT be folded into seedOf, and saying so is the point: a merge
// that swallowed them would be tidy and wrong. The widths and domains differ on purpose.
test('the derivations that are deliberately NOT seedOf keep their own width and domain', () => {
  const a = 'e9ba369d-dac3-8385-8d01-d40f33e8e0a3'
  const hex = a.replace(/-/g, '')
  assert.notEqual(hex.slice(0, 13), hex.slice(0, 8), 'stream.ts steps THIRTEEN hex, a wider step on purpose')
  assert.notEqual(Number(BigInt('0x' + hex) % 7n), seedOf(a) % 7,
    'the rosette folds the WHOLE address mod 7 — a different domain')
})

// ── THE JOIN IS AN INDEX, NOT A SCAN — the finder for the defect this suite itself was paying for.
//
// chunkHandleOf used to call buildChunks() on every lookup and then scan the result linearly, so resolving the
// ledger's own keys rebuilt every chunk once per key: 6.4 SECONDS for one sweep, and `live()` above sweeps in
// every test — 35s of a 65s suite spent recomputing a map that cannot change. It was fixed by making the map
// the function. This test is why it stays fixed.
//
// NO CLOCK. A wall-time budget would assert the cure by measuring the machine, and would go flaky on a loaded
// CI box — this tree decides staleness by liveness and identity, never by a timer, and a performance test can
// hold the same law. Memoisation has an EXACT observable: the builder hands back the same object. That is
// checkable, deterministic, and fails the moment someone deletes the memo.
test('buildChunks is computed ONCE — the same object, not an equal one', () => {
  const a = buildChunks()
  const b = buildChunks()
  assert.equal(a === b, true, 'a second build means every chunkHandleOf lookup rebuilds the whole ledger again')
  // the control: identity is a real claim here, not something every array satisfies
  assert.notEqual(a, a.slice(), 'a copy must NOT pass — otherwise this test cannot fail')
})

test('the key index resolves EXACTLY what a linear scan resolves, over every live key', () => {
  const T = theorems()
  const chunks = buildChunks()
  // the OLD implementation, verbatim: first chunk in handle order whose keys hold the key
  const linear = (key: string): string | undefined => chunks.find((c) => c.keys.includes(key))?.handle
  const disagree = T.filter((t) => linear(t.key) !== chunkHandleOf(t.key))
  assert.deepEqual(disagree.map((t) => t.key), [], 'the index must return what the scan returned — faster, never different')
  // the controls: the comparator must distinguish, and a key nothing cites must resolve to nothing on both sides
  assert.equal(chunkHandleOf('not_a_theorem_key_zzz'), undefined)
  assert.equal(linear('not_a_theorem_key_zzz'), undefined)
  assert.notEqual(chunkHandleOf(T[0]!.key), chunkHandleOf('not_a_theorem_key_zzz'))
})
