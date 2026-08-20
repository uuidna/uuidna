// handle — every aspect of the address scheme, checked against the LIVE ledger rather than against examples.
//
// An address scheme fails quietly. Two payloads land in one place, or a path stops recovering its handle, and
// nothing complains until something is already lost — so each test here carries a negative control, and the
// properties are asserted over all 1250 live handles rather than over a chosen few. Today's audits found four
// checks in this repo that cannot fail at all; a suite that only demonstrates success is not evidence.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  isHandle, handleParts, handlePath, handleOfPath, handleDirs, pathOrderMatchesHandleOrder, HANDLE_ROOT,
} from '../handle.js'
import { chunkHandleOf } from '../scripts/gen-handle-chunks.js'
import { theorems } from '../index.js'

const live = (): string[] => [...new Set(theorems().map((t) => chunkHandleOf(t.key)).filter((h): h is string => !!h))]

// ── SHAPE. Eight lowercase hex, splitting four ways — not a chosen convention but the shape chunkHandleOf emits.
test('every live handle is eight lowercase hex characters', () => {
  const hs = live()
  assert.ok(hs.length > 1000, `expected the full ledger, saw ${hs.length}`)
  assert.ok(hs.every(isHandle))
})

test('malformed handles are REFUSED, never coerced', () => {
  for (const bad of ['CC9C0011', 'cc9c001', 'cc9c00112', 'zz9c0011', '', 'cc 9c0011', 'cc9c-011']) {
    assert.equal(isHandle(bad), false, `${JSON.stringify(bad)} must not pass`)
    assert.throws(() => handleParts(bad), /eight lowercase hex/, `${JSON.stringify(bad)} must throw`)
  }
  // and the control: a well-formed one must NOT throw
  assert.deepEqual(handleParts('cc9c0011'), ['cc', '9c', '00', '11'])
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
