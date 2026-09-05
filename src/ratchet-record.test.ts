// ratchet-record — the fastening is driven here: a raise must carry its argument, progress must not, and the
// gate that names a measurement wearing a theorem's name must name the live ones and nothing else.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { admitRaise, entryAddress, entryFor, ledgerRowsNamedByRatchet, recordAddress, sealRecord, type RatchetEntry } from './ratchet-record.js'

const WIRE: RatchetEntry = {
  prefix: 'mcp_wire_rate', reading: 32183, direction: 'shrink', unit: 'hundredths of a byte per tool',
  cause: 'ten ports were given doors; the total grew and the cost per tool fell',
  evidence: 'lean/mcp-context-budget.json + wireBytes(MCP_CATALOG)',
  measureAddress: 'ruler-a',
}

test('a raise with no cause is refused — the ceiling does not move on an assertion', () => {
  const r = admitRaise(WIRE, 32186, '', 'somewhere')
  assert.equal(r.admitted, false)
  assert.match(r.admitted === false ? r.refused : '', /no stated cause/)
})

test('a raise with a cause but no evidence is refused — a cause nobody can check is the numeral again', () => {
  const r = admitRaise(WIRE, 32186, 'a new tool arrived with a long honest description', '')
  assert.equal(r.admitted, false)
  assert.match(r.admitted === false ? r.refused : '', /names no evidence/)
})

test('a raise that carries both is admitted, and keeps them on the entry', () => {
  const r = admitRaise(WIRE, 32186, 'uuidna_cloudflare, 2.0kB of honest description', 'git show HEAD:src/mcp.ts')
  assert.equal(r.admitted, true)
  if (r.admitted) {
    assert.equal(r.entry.reading, 32186)
    assert.match(r.entry.cause, /uuidna_cloudflare/)
    assert.match(r.entry.evidence, /git show/)
  }
})

test('movement in the allowed direction is not a raise and costs no argument — progress is free', () => {
  const r = admitRaise(WIRE, 32000, '', '')
  assert.equal(r.admitted, true, 'a shrink-only measure that shrank needs nobody\'s permission')
  if (r.admitted) assert.equal(r.entry.reading, 32000)
})

test('a grow-only measure refuses the opposite direction, by the same law', () => {
  const grow: RatchetEntry = { ...WIRE, prefix: 'coverage', direction: 'grow', reading: 90 }
  assert.equal(admitRaise(grow, 80, '', '').admitted, false, 'falling is the loosening for a grow-only measure')
  assert.equal(admitRaise(grow, 95, '', '').admitted, true)
})

test('the reading is addressed WITH its ruler — the same number under a new ruler is a different reading', () => {
  assert.notEqual(entryAddress(WIRE), entryAddress({ ...WIRE, measureAddress: 'ruler-b' }),
    'comparing readings across rulers is a confident verdict about nothing')
  assert.equal(entryAddress(WIRE), entryAddress({ ...WIRE, cause: 'reworded', evidence: 'reworded' }),
    'explaining a reading is free; changing it is not')
})

test('the record folds order-invariantly, so an edit is visible and a reordering is not', () => {
  const other: RatchetEntry = { ...WIRE, prefix: 'modal_debt', reading: 642 }
  assert.equal(recordAddress([WIRE, other]), recordAddress([other, WIRE]))
  assert.notEqual(recordAddress([WIRE, other]), recordAddress([{ ...WIRE, reading: 32186 }, other]))
  const sealed = sealRecord([WIRE, other])
  assert.equal(sealed.address, recordAddress([WIRE, other]))
  assert.equal(entryFor(sealed, 'modal_debt')?.reading, 642)
  assert.equal(entryFor(sealed, 'absent'), null)
})

test('the gate names measurements wearing a theorem name, and leaves definitional constants alone', () => {
  const keys = [
    'mcp_wire_rate_fell_while_total_grew_32183', 'impossibility_modal_debt_642', 'mcp_tool_debt_100',
    'zodiac_ecliptic_360', 'ph_plus_poh_14', 'mul9_2_3', 'two_coins',
  ]
  const prefixes = ['mcp_wire_rate_fell_while_total_grew', 'impossibility_modal_debt', 'mcp_tool_debt']
  assert.deepEqual(ledgerRowsNamedByRatchet(keys, prefixes),
    ['impossibility_modal_debt_642', 'mcp_tool_debt_100', 'mcp_wire_rate_fell_while_total_grew_32183'],
    'the number in zodiac_ecliptic_360 is the ecliptic, not a reading of this repository')
})
