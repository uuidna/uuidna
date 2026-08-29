// table-leads — tables.found is a lead list; under-count is homework, never a freeze of the stated size.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tableLeadsFrom, tableFileOf } from '../table-leads.js'
import { theoremCountByFile } from '../theorems/index.js'
import { ROOT } from '../scripts/api.js'

test('a stating wing shorter than its table is a lead; an enumerating wing is silent', () => {
  const counts = new Map([['Spectrum.lean', 2], ['Sailing.lean', 32]])
  const found = [
    { wing: 'Spectrum', object: 'seven EM bands', size: '35' },
    { wing: 'Sailing', object: '32-point rose', size: '32' },
  ]
  const leads = tableLeadsFrom(found, counts)
  assert.equal(leads.length, 1)
  assert.equal(leads[0]!.file, 'Spectrum.lean')
  assert.equal(leads[0]!.stated, 35)
  assert.equal(leads[0]!.sealed, 2)
  assert.equal(tableFileOf('Os'), 'Os.lean')
})

test('live tables.found is read, never copied — the finder names the short wings', () => {
  const ledger = JSON.parse(readFileSync(join(ROOT, 'lean/leads.json'), 'utf8')) as {
    tables?: { found?: { wing: string; object: string; size: string }[] }
  }
  const found = ledger.tables?.found ?? []
  assert.ok(found.length > 0, 'the tables record names finite objects')
  const leads = tableLeadsFrom(found, theoremCountByFile())
  for (const l of leads) {
    assert.ok(l.stated > l.sealed, `${l.file} would not be a lead if it already enumerated`)
    assert.match(l.file, /\.lean$/)
  }
})
