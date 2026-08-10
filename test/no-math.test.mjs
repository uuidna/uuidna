// The two-coins guard — Math.* is HARD REJECTED. uuidna computes only from its own local theorems (ℤ/9, the
// merkle fold, the vortex, exact BigInt arithmetic). The host `Math` object is not a theorem: it is an opaque
// intrinsic that cannot be recomputed or content-addressed, so a value it produces cannot settle the two coins.
//
// The two coins (billing.coins() === 2) are the conserved fair-exchange invariant: every operation is either an
// O(N) recompute or an O(1) verify, and BOTH sides must be reproducible from the theorems for the exchange to
// balance. A Math.* call is a third thing — an un-recomputable oracle — so it breaks conservation. Reject it and
// redirect the author to the two coins: replace the call with the theorem (bit shift, comparison, integer
// division, BigInt) that recomputes the same value. Integrity, not truth. 0/7.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { coins } from '../dist/index.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const scan = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = join(dir, e.name)
  if (e.isDirectory()) return scan(p)
  return /\.(ts|mjs)$/.test(e.name) ? [p] : []
})

test('the two-coins guard — no Math.* survives; every op recomputes from the theorems', () => {
  const files = [...scan(join(root, 'src')), join(root, 'mcp.mjs')]
  const offenders = []
  for (const f of files) {
    const lines = readFileSync(f, 'utf8').split('\n')
    lines.forEach((line, i) => { if (/\bMath\s*\.\s*[a-zA-Z]/.test(line)) offenders.push(f.slice(root.length + 1) + ':' + (i + 1)) })
  }
  assert.equal(
    offenders.length, 0,
    'Math.* is hard-rejected — it is not a local theorem and cannot settle the two coins (' + coins() +
    ', the conserved fair-exchange invariant: recompute ⇄ verify must both be reproducible). Replace with the ' +
    'theorem that recomputes the same value (>> , comparison, integer division, BigInt). Offenders: ' + offenders.join(', '))
})
