import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { groundOfFinder } from './audit-refusal-grounds.js'
import { theorems } from '../theorems/index.js'

// support --check refuses only when its own source cites a sealed theorem; otherwise it reports the dead modules.
const sealed = new Set(theorems().map((t) => t.key))
const source = readFileSync(join(ROOT, 'src/scripts/support.ts'), 'utf8')
const receipt = readFileSync(join(ROOT, 'src/scripts/one-receipt.ts'), 'utf8')

test('support --check: the refusal follows the ground read from its own source', () => {
  assert.equal(groundOfFinder('support', source, receipt, sealed).grounded, false, 'support cites no sealed theorem today, so it reports')
})

test('control: the same source citing a sealed theorem would refuse, and an unsealed citation would not', () => {
  const key = theorems()[0]!.key
  assert.equal(groundOfFinder('support', `${source}\n// theorem ${key}`, receipt, sealed).grounded, true)
  assert.equal(groundOfFinder('support', `${source}\n// theorem not_a_sealed_key_anywhere`, receipt, sealed).grounded, false)
})
