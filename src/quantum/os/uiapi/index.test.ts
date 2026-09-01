import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uiApi, renderUi, UI_CLASSES } from './index.js'

test('both sides are counted — Alpine\'s packages and uuidna\'s own surfaces', () => {
  const c = uiApi()
  assert.equal(c.rows.length, UI_CLASSES.length)
  assert.ok(c.alpineTotal > 1000, 'the interface domain is one of the largest Alpine publishes')
  assert.ok(c.own.applets > 0 && c.own.panels > 0 && c.own.pages > 0, 'uuidna already HAS a terminal, a GUI and pages')
})

test('most of the domain is provided TO a tab rather than implemented here, and it says so', () => {
  // The asymmetry is the interesting part: display server and input are things a browser gives, and together
  // they are most of the domain. Not a limit dressed as a law — os/runtime could plan a verified run of any of
  // them — a description of where the work currently sits.
  const c = uiApi()
  assert.ok(c.providedByBrowser > 0)
  const browserRows = c.rows.filter((r) => r.provider === 'the browser')
  assert.ok(browserRows.some((r) => /draws no pixels/.test(r.uuidnaSurface)), 'and it is stated plainly')
})

test('the accessibility claim rests on a MEASURED count, not an adjective', () => {
  // Every served page carries schema.org microdata, so it is machine-readable by a screen reader, a search
  // engine and an agent through the same markup. Measured from a real rendered page; not a WCAG conformance
  // claim, which is a thing an audit decides and this is not an audit.
  const c = uiApi()
  assert.ok(c.own.microdataProps > 0, 'a page with no itemprops would make the a11y row an adjective')
  const a11y = c.rows.find((r) => r.ui === 'a11y')!
  assert.match(a11y.uuidnaSurface, /\d+ itemprops/)
})

test('the census recomputes, and renders every class', () => {
  assert.equal(uiApi().receipt, uiApi().receipt)
  const lines = renderUi(uiApi())
  for (const c of UI_CLASSES) assert.ok(lines.some((l) => l.includes(c.ui)), `${c.ui} must appear`)
})
