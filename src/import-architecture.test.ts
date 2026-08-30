// import-architecture — the mint stack: address below hexbit; no cycle; coin64 width matches the unit.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { coin64, toUuid } from './index.js'
import { COIN_HEXBITS } from './index.js'
import { importGaps } from './scripts/one-receipt.js'

test('address.ts does not import hexbit — mint sits below the unit', () => {
  const src = readFileSync(join(ROOT, 'src/address.ts'), 'utf8')
  assert.doesNotMatch(src, /from ['"]\.\/hexbit\//)
  assert.doesNotMatch(src, /from ['"]\.\.\/hexbit\//)
})

test('importGaps — no address ↔ hexbit cycle', () => {
  assert.equal(importGaps().length, 0, importGaps().map((g) => g.what).join('\n'))
})

test('coin64 — half the uuid hex width matches hexbit COIN_HEXBITS', () => {
  const s = 'captain-coin-width'
  assert.equal(coin64(s).length, COIN_HEXBITS)
  assert.equal(coin64(s), toUuid(s).replace(/-/g, '').slice(0, COIN_HEXBITS))
})
