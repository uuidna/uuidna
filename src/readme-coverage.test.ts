// readme-coverage — THE README MUST ACCOUNT FOR WHAT A HANDLE SPANS, AND WHAT A COIN COVERS.
//
// A reader arriving at this page is told the ledger computes in hexbits and prices in coins. Both claims are
// checkable and neither is worth anything unstated: the handle's span decides how many superpositions an address
// can name at all, and the coverage rate decides what one coin buys inside that space. Six directions leave every
// residue — the 60-degree doubling, its inverse, the 90-degree reflection, the shift and its counter — so a
// figure quoted per coin means nothing until the direction count is on the page beside it.
//
// EVERY NUMBER HERE IS RECOMPUTED, never matched against a copy. If the ledger grows and the README is not
// regenerated, these fail — which is the point: a page that states a count it no longer holds is worse than one
// that states none.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems, decidedMass } from './index.js'
import { HANDLE_SPAN, COINS } from './index.js'

const readme = (): string => readFileSync(join(ROOT, 'README.md'), 'utf8')

test('the README states what a handle spans — every superposition an address can name', () => {
  const md = readme()
  assert.ok(md.includes(String(HANDLE_SPAN)) || md.includes(HANDLE_SPAN.toLocaleString('en-US')),
    `the handle's span (${HANDLE_SPAN} = 16^8) must be on the page — it is how many superpositions a handle can name`)
})

test('coverage is accounted in coins, and the rate is the live one', () => {
  const md = readme()
  const T = theorems()
  const coverage = T.reduce((a, t) => a + decidedMass(t), 0)
  const coins = T.length * COINS
  const perCoin = (coverage - (coverage % coins)) / coins
  assert.ok(md.includes(String(coverage)) || md.includes(coverage.toLocaleString('en-US')),
    `the README must carry the live coverage (${coverage} superpositions) — regenerate: node dist/scripts/gen-readme.js`)
  assert.ok(md.includes(String(perCoin)), `the rate (${perCoin} superpositions per coin) must be stated, not implied`)
  assert.ok(md.includes(String(coins)) || md.includes(coins.toLocaleString('en-US')),
    `the coins in existence (${coins} = ${COINS} x ${T.length}) must be on the page`)
})

test('the directions are named, so a per-coin figure means something', () => {
  const md = readme()
  // six motions leave every residue: doubling and its inverse, the reflection, the shift and its counter
  assert.match(md, /six directions|6 directions/i, 'the direction count must be stated beside the rate')
  assert.match(md, /reflection|dz/, 'the 90-degree fold is one of them and must be named')
})

test('the README opens abstract hero, thesis, use, and develop — not only the census', () => {
  const md = readme()
  assert.match(md, /^## Contents$/m)
  assert.match(md, /Typography graph/)
  assert.match(md, /^## Abstract$/m)
  assert.match(md, /^## Thesis$/m)
  assert.match(md, /^### Proof of concept$/m)
  assert.match(md, /^### Proof of work$/m)
  assert.match(md, /^## Use$/m)
  assert.match(md, /^### UUID channel/m)
  assert.match(md, /^## Develop$/m)
  assert.match(md, /^## Reference$/m)
  assert.match(md, /npm install @uuidna\/uuidna/)
  assert.match(md, /npx/)
  assert.match(md, /CONTRIBUTING\.md/)
  assert.match(md, /npm run reconcile/)
  assert.match(md, /handleOf/)
  assert.match(md, /encrypt/)
  assert.match(md, /uuidChannel/)
  assert.match(md, /layout_groups_thirtytwo/)
  assert.match(md, /message_cap_is_four_hexbits/)
  assert.match(md, /uuidna\.com\/guides/)
})
