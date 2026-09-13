// acceptance — the two lines a registering agent accepts, held against the pages that publish them.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { LICENSE_LINE, TERMS_LINE, licenseReceipt, termsReceipt, accepts, acceptanceReceipt } from './acceptance.js'
import { legalFacts } from './legal.js'

const page = (name: string): string => readFileSync(join(ROOT, 'docs', name), 'utf8')

test('each canonical page quotes its line and states the receipt that line addresses to', () => {
  for (const [file, line, receipt] of [['license.md', LICENSE_LINE, licenseReceipt()], ['terms.md', TERMS_LINE, termsReceipt()]] as const) {
    const text = page(file).replace(/\*\*/g, '')
    assert.ok(text.includes(line), `${file} must quote its canonical line verbatim`)
    assert.ok(text.includes(receipt), `${file} must state ${receipt}, the address of that line`)
  }
})

test('the fact base and the acceptance module read the same licence', () => {
  assert.equal(legalFacts().license.address, licenseReceipt())
})

test('acceptance holds only for both exact receipts, and each near miss is refused', () => {
  assert.equal(accepts({ license: licenseReceipt(), terms: termsReceipt() }), true)
  assert.equal(accepts({ license: licenseReceipt() }), false, 'the licence alone is not the terms')
  assert.equal(accepts({ terms: termsReceipt() }), false, 'the terms alone are not the licence')
  assert.equal(accepts({ license: termsReceipt(), terms: licenseReceipt() }), false, 'swapped receipts are refused')
  assert.equal(accepts({ license: licenseReceipt().toUpperCase(), terms: termsReceipt() }), false, 'a receipt is exact')
})

test('an acceptance is one address per agent, moved by the agent and by the words', () => {
  assert.equal(acceptanceReceipt('0a1b2c3d'), acceptanceReceipt('0a1b2c3d'))
  assert.notEqual(acceptanceReceipt('0a1b2c3d'), acceptanceReceipt('0a1b2c3e'))
})
