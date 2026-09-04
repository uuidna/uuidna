import { test } from 'node:test'
import assert from 'node:assert/strict'
import { underreachIn, underreachCensus, UNDERREACH_RE } from './underreach.js'

// THE INSTRUMENT MUST FIRE. A finder that returns zero is indistinguishable from a finder that detects nothing —
// the two outputs are identical, by construction — so a clean corpus is only evidence when the detector has been
// shown to catch a real under-claim first. These four cases are that demonstration, and they run before the
// corpus-wide check below is allowed to mean anything.
test('it catches a hedge applied to the act of proving', () => {
  for (const bad of [
    'This may be proven by exhaustion.',
    'The identity appears to be decided by the kernel.',
    'That result could be verified over every case.',
    'The bound might well hold for all inputs.',
  ]) assert.equal(underreachIn('t', bad).length, 1, bad)
})

test('it does NOT fire on a prohibition, a permission, or a declared measurement', () => {
  for (const good of [
    'The court may not refute the non-justiciable.',
    'Tissue pressure may safely exceed ambient by the ratio 2:1.',
    'The tropical year is a measured quantity — roughly 365.2422 days — so it may be estimated only.',
    'Every case is decided by the kernel, axiom-free.',
  ]) assert.deepEqual(underreachIn('t', good), [], good)
})

test('the sealed corpus makes no under-claim', () => {
  const c = underreachCensus()
  assert.ok(c.scanned > 30000, 'the scan must cover every surface, not a sample')
  assert.deepEqual(c.findings, [], 'a proof hedged is a proof wasted')
  assert.equal(c.clean, true)
})

// EVERY SURFACE MUST BE READ, AND A ZERO PROVES NOTHING ON ITS OWN. A peer shipped a widened sweep whose
// extractor could not read the surface it had just added: it returned zero lines from 19,519 published words and
// reported green, because an empty list and a clean list are the same list. So the census publishes a sentence
// count per surface, and a surface at zero is a blind reader rather than a clean one.
test('no surface is blind — each contributes sentences to the census', () => {
  const c = underreachCensus()
  for (const [surface, n] of Object.entries(c.bySurface))
    assert.ok(n > 0, `${surface} contributed 0 sentences — the reader does not reach it, so its clean verdict is empty`)
  assert.equal(c.scanned, Object.values(c.bySurface).reduce((a, n) => a + n, 0), 'the total must BE the surfaces')
})

// THE PLANT TEST. Proof that the reader reaches each surface's actual bytes: inject a known under-claim and the
// finding count must rise by exactly one. Lean is the surface that matters most here — its comments open with
// `--`, not `//`, which is exactly the marker a markdown-and-TypeScript extractor silently skips.
test('planting an under-claim on each surface is caught — the reader reaches the bytes', () => {
  const PLANT = 'This may be proven by exhaustion.'
  const surfaces: [string, string][] = [
    ['markdown prose', '# A title\n\nSome sealed prose about a decided fact.'],
    ['lean -- comment', '-- THE WING: every case is decided by the kernel, axiom-free.'],
    ['a bare sentence', 'The identity closes over every residue.'],
  ]
  for (const [label, text] of surfaces) {
    const clean = underreachIn(label, text).length
    assert.equal(underreachIn(label, text + '\n' + PLANT).length, clean + 1, `${label}: the plant was not caught`)
  }
})

test('the rule requires the hedge to touch the proving, not merely share a sentence', () => {
  assert.ok(!UNDERREACH_RE.test('It may rain, and the theorem is decided.'))
  assert.ok(UNDERREACH_RE.test('the theorem may be decided'))
})
