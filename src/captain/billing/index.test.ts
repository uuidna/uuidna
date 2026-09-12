// billing — the citation walk reads a trie once; this control re-derives a slice with the substring test it replaced.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { keyCitations, ledgerCoins } from './index.js'
import { theorems } from '../../theorems/index.js'

test('keyCitations equals the pairwise substring walk on a ledger slice, and counts a text once however often it cites', () => {
  // a contiguous run of a wing: neighbours cite each other; a strided sample of the ledger contained no citation at all
  const slice = theorems().slice(0, 1500)
  const keys = slice.map((t) => t.key)
  const texts = slice.map((t) => (t.name ?? '') + '|' + t.statement)
  const fast = keyCitations(keys, texts)
  let citations = 0
  keys.forEach((k, i) => {
    const slow: number[] = []
    texts.forEach((x, j) => { if (j !== i && x.includes(k)) slow.push(j) })
    assert.deepEqual(fast[i], slow, `${k}: the trie and the substring walk disagree`)
    citations += slow.length
  })
  assert.ok(citations > 0, 'the slice must contain citations or the control proves nothing')
  // a text that cites a key twice counts once — as includes() did — and a text never cites its own key
  assert.deepEqual(keyCitations(['ab', 'zz', 'q'], ['ab ab', 'ab', 'zz ab ab']), [[1, 2], [2], []])
  // a key that is a substring of a longer key is cited by that longer key's text — substring, not token
  assert.deepEqual(keyCitations(['bell', 'bell_state'], ['x', 'bell_state holds']), [[1], []])
})

test('ledgerCoins over a slice is deterministic and its supply is the sum of per-theorem mints', () => {
  const slice = theorems().filter((_, i) => i % 97 === 0)
  const a = ledgerCoins(slice); const b = ledgerCoins(slice)
  assert.equal(a.receipt, b.receipt)
  assert.equal(a.totalCoins, a.valued.reduce((s, v) => s + v.coinValue, 0))
})
