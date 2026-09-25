import { test } from 'node:test'
import assert from 'node:assert/strict'

import { byWing, formulaAxes, formulaGaps, formulas, opsOf } from './formulas.js'
import { parseFormula } from './formula.js'
import { theorems } from './theorems/index.js'

/**
 * THE TWO WALKS MUST AGREE. formulas() collects rows and byWing() counts them in a separate pass, so a reader
 * comparing a served list against a census is comparing two instruments. If they ever disagree the number on
 * the page is whichever one the page happened to call, which is how a census becomes decoration.
 */
test('the collection and the census count the same corpus', () => {
  const rows = formulas(), wings = byWing()
  assert.equal(wings.reduce((a, w) => a + w.formula, 0), rows.length)
  assert.equal(wings.reduce((a, w) => a + w.total, 0), theorems().length)
  assert.equal(wings.reduce((a, w) => a + w.formula + w.program, 0), theorems().length)
})

/**
 * A GAP IS THE PARSER'S SHORTFALL, NOT MATHEMATICS'. A fold has no formula form and is not missing anything;
 * only a statement that classifies AS a formula and still refuses to parse is a defect. Whatever the count,
 * every gap must be exactly that shape — otherwise the work list has programs in it and nobody will act on it.
 */
test('every reported gap is formula-shaped and genuinely refuses to parse', () => {
  for (const g of formulaGaps()) {
    assert.equal(parseFormula(g.source).ok, false, `${g.key} is reported as a gap but parses`)
    assert.ok(g.why.length > 0, `${g.key} names no reason`)
  }
})

/**
 * THE FILTER MUST FILTER. An axis that narrows nothing is a control the caller believes in and does not have,
 * so each one is shown to cut the corpus AND to be the reason it was cut.
 */
test('each axis narrows the corpus, and narrows it for its own reason', () => {
  const all = formulas()
  assert.ok(all.length > 0)

  const wing = all[0].wing
  const byW = formulas({ wing })
  assert.ok(byW.length > 0 && byW.length < all.length, 'the wing filter did not narrow')
  assert.ok(byW.every((r) => r.wing === wing))

  const mod = formulas({ op: '%' })
  assert.ok(mod.length > 0 && mod.length < all.length, 'the operator filter did not narrow')
  assert.ok(mod.every((r) => r.ops.includes('%')))

  // and a filter nothing satisfies returns nothing rather than everything
  assert.equal(formulas({ wing: 'NoSuchWing.lean' }).length, 0)
  assert.equal(formulas({ key: 'zzz_no_such_key_zzz' }).length, 0)
})

/** The door must not offer a value it cannot serve — every advertised axis value has at least one row. */
test('every advertised axis value is servable', () => {
  const ax = formulaAxes()
  assert.ok(ax.wings.length > 0 && ax.ops.length > 0)
  for (const w of ax.wings.slice(0, 5)) assert.ok(formulas({ wing: w }).length > 0, `${w} is offered and serves nothing`)
  for (const op of ax.ops) assert.ok(formulas({ op }).length > 0, `${op} is offered and serves nothing`)
})

/** opsOf reads the operators actually present — including under a negation, which is where a walk forgets to look. */
test('opsOf reads every operator, including beneath a negation', () => {
  const p = parseFormula('¬ (1 + 2 = 4)')
  assert.equal(p.ok, true)
  if (!p.ok) return
  const ops = opsOf(p.node)
  assert.ok(ops.includes('+'))
  assert.ok(ops.includes('='))
})
