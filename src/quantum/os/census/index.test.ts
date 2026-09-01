import { test } from 'node:test'
import assert from 'node:assert/strict'
import { primeMonitor, monitorCensus, renderMonitor, monitorPrimed, compilerCensus, archMatrix } from './index.js'
import { MONITOR_INVENTORY } from './inventory/index.js'
import { uuidnaExec, APPLETS } from '../exec/index.js'

test('an unprimed monitor is ABSENT, never a monitor with nothing on it', () => {
  // The distinction the whole census turns on: a host that never handed over an inventory has not told us the
  // monitor is empty. Returning zeros would let a caller report "no panels" for a tab that simply never primed.
  const before = monitorCensus()
  if (!monitorPrimed()) {
    assert.equal(before.present, false)
    assert.match(before.honest, /absent, which is not the same/)
    assert.equal(renderMonitor(before)[0], 'monitor: ABSENT — no inventory primed on this host')
  }
})

test('the census splits live panels from build-time ones', () => {
  primeMonitor(MONITOR_INVENTORY)
  const c = monitorCensus()
  assert.equal(c.present, true)
  assert.ok(c.panels > 0 && c.pages > 0)
  assert.equal(c.live + c.static, c.panels, 'every panel is exactly one of the two — the split must partition')
  assert.ok(c.live > 0, 'some panels compute in the reader\'s tab; those are the only ones that can report a host')
  assert.ok(c.static > c.live, 'and most draw what the build knew, which is why the split is worth stating')
})

test('the generated inventory names panels that exist and pages that exist', () => {
  for (const p of MONITOR_INVENTORY.live) {
    assert.ok(MONITOR_INVENTORY.panels.includes(p), `${p} is listed live but is not a panel — the enumerator drifted`)
  }
  assert.ok(MONITOR_INVENTORY.pages.includes('os.md'), 'the OS page is the one that mounts the monitor')
})

test('uuidnaOS answers about its own monitor, through the one door', () => {
  const r = uuidnaExec('monitor')
  assert.equal(r.ok, true)
  assert.match(r.output[0] ?? '', /^monitor: vitepress · \d+ panels · \d+ pages$/)
  assert.ok((APPLETS as readonly string[]).includes('monitor'), 'and it is a declared applet, not a hidden verb')
})

test('the receipt recomputes and moves with the inventory', () => {
  primeMonitor(MONITOR_INVENTORY)
  const a = monitorCensus().receipt
  primeMonitor(MONITOR_INVENTORY)
  assert.equal(monitorCensus().receipt, a, 'same inventory, same receipt')
  primeMonitor({ ...MONITOR_INVENTORY, panels: [...MONITOR_INVENTORY.panels, 'Ghost.vue'] })
  assert.notEqual(monitorCensus().receipt, a, 'a panel added must move it')
  primeMonitor(MONITOR_INVENTORY)
})

test('`top` OBSERVES residency without causing it', async () => {
  // The defect this exists for: the first `top` called catalogueState(), which triggers the lazy load — so
  // asking what was resident MATERIALISED 7.3 MB and then reported it as resident. It said PRIMED every time
  // and the reason was itself. A monitor that changes what it measures is worse than none.
  const { uuidnaExec } = await import('../exec/index.js')
  const { cataloguePrimed } = await import('../catalogue/index.js')
  if (cataloguePrimed()) return                       // another test primed it; the observer effect is untestable here
  const out = uuidnaExec('top')
  assert.equal(out.ok, true)
  assert.equal(cataloguePrimed(), false, 'running top must NOT prime the catalogue')
  assert.ok(out.output.some((l) => /NOT primed/.test(l)), 'and it must report the lazy state it found')
})

// ── FOLDED IN with compilers/ and archmatrix/. Deleting those folders would have taken their assertions with
// them, which is coverage lost in a refactor — the same content-loss shape the installer refuses. Every test
// below stood in its own file before the merge and still stands.

test('every compiler measures a real translation, in both directions', () => {
  const c = compilerCensus()
  assert.equal(c.present, true)
  for (const r of c.rows) {
    assert.ok(r.inBytes > 0, `${r.compiler} must have an input`)
    assert.ok(r.outBytes > 0, `${r.compiler} must have an output`)
  }
})

test('the ratio unit is fine enough to show a CONTRACTION', () => {
  // tenths truncated the edge mirror's 0.05× to a flat 0.0, reporting the most interesting compiler as doing
  // nothing. A unit too coarse to show a contraction hides one.
  const mirror = compilerCensus().rows.find((r) => r.compiler === 'ledger → edge mirror')!
  assert.ok(mirror.ratioHundredths > 0 && mirror.ratioHundredths < 100)
})

test('expansion and contraction both appear — the pipeline is not one-directional', () => {
  const c = compilerCensus()
  assert.ok(c.rows.some((r) => r.ratioHundredths > 100), 'markdown → site expands: every theorem gets a page')
  assert.ok(c.rows.some((r) => r.ratioHundredths < 100), 'ledger → mirror contracts')
})

test('provenance MUST separate across architectures', () => {
  // Two arches sharing an address would let a deployment verify against the wrong binary.
  const m = archMatrix()
  assert.equal(m.distinctAddresses, m.arches.length)
  assert.equal(m.provenanceSeparates, true)
})

test('computation MUST NOT vary across architectures', () => {
  // Exact integer arithmetic, no floating point — a ledger that decided differently on s390x would make every
  // sealed theorem a claim about one machine.
  const m = archMatrix()
  assert.equal(m.distinctComputations, 1)
  assert.equal(m.computationIsArchInvariant, true)
})

test('uuidnaOS answers about compilers and architectures through the one door', () => {
  assert.equal(uuidnaExec('compilers').ok, true)
  assert.ok((APPLETS as readonly string[]).includes('compilers'))
})
