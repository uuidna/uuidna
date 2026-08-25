import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contrastRatio, realComponentChecks, accentTextChecks, SEQ_AS_TEXT, VP_COLORS, WCAG_AA_TEXT } from './contrast.ts'

const HERE = dirname(fileURLToPath(import.meta.url))

test('contrastRatio matches the well-known reference: black on white is exactly 21:1', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21)
})

test('contrastRatio is symmetric — argument order does not matter', () => {
  assert.equal(contrastRatio('#3c3c43', '#ffffff'), contrastRatio('#ffffff', '#3c3c43'))
})

test('contrastRatio of a colour against itself is exactly 1:1 (no contrast)', () => {
  assert.equal(contrastRatio('#67676c', '#67676c'), 1)
})

test('every real colour pair ReferrerNav/ReadAloud actually render meets its WCAG AA threshold', () => {
  const checks = realComponentChecks()
  assert.ok(checks.length > 0, 'sanity: the check list itself must not be empty')
  const failures = checks
    .map((c) => ({ ...c, ratio: contrastRatio(c.fg, c.bg) }))
    .filter((c) => c.ratio < c.threshold)
  assert.deepEqual(
    failures.map((f) => `${f.name}: ${f.ratio.toFixed(2)}:1 < required ${f.threshold}:1`),
    [],
    'a real WCAG contrast failure in a shipped component, not a hypothetical one',
  )
})

// THE GAP THIS CLOSES. The check list above covers the pairs of the components it names, and says so — a declared
// boundary, which is the honest kind. It is still a boundary, and writing SponsorCard walked straight through it:
// the link was first written `var(--seq-5)`, copied from Dimensions.vue where the same var is used the same way,
// and --seq-5 as text measures 1.75:1 against the light background where AA asks 4.5:1. Legible in dark, nearly
// invisible in light — the failure a dark-themed author never sees, caught by measuring rather than by looking.
//
// The fix for THAT line is a check in realComponentChecks. The fix for the CLASS is this: any component using a
// ℤ/9 accent as a text colour must use one that has been measured, so the unmeasured set cannot grow silently.
// It deliberately does NOT assert that the existing five pass — they do not, and failing them here would turn
// five other authors' components red in a shared tree without their say. The finding is named in contrast.ts,
// exposed by accentTextChecks() for whoever fixes it, and pinned below so it cannot quietly stop being true.
test('no component introduces an UNMEASURED ℤ/9 accent as a text colour', () => {
  const files = readdirSync(HERE, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.vue'))
    .map((e) => e.name)
  assert.ok(files.length > 0, 'sanity: there should be .vue components to scan')
  const unmeasured: string[] = []
  for (const f of files) {
    const src = readFileSync(join(HERE, f), 'utf8')
    // `color:` only — a --seq-* used for a border or a background is a non-text pair with a different threshold,
    // and folding the two together would be its own instrument-too-wide mistake
    for (const m of src.matchAll(/[^-]color:\s*var\((--seq-[a-z0-9-]+)/g)) {
      const v = m[1]
      if (!(v in SEQ_AS_TEXT)) unmeasured.push(`${f}: ${v}`)
    }
  }
  assert.deepEqual([...new Set(unmeasured)], [],
    'add the accent to SEQ_AS_TEXT (with its measured ratio) before using it as text, or use var(--vp-c-brand-1)')
})

test('THE ACCENT FINDING IS STILL TRUE — the ℤ/9 accents fail AA as text on the light background', () => {
  // a characterisation test, not an endorsement: it pins a MEASURED fact so that fixing the palette makes this
  // red and forces the note in contrast.ts to be corrected, instead of leaving a stale claim in a comment
  const lightFails = accentTextChecks()
    .filter((c) => c.theme === 'light')
    .filter((c) => contrastRatio(c.fg, c.bg) < c.threshold)
  assert.equal(lightFails.length, 8,
    'every ℤ/9 accent used as text failed AA on both light backgrounds when measured; if that changed, update ' +
    'the scope note in contrast.ts and the component list it names — do not just move this number')
  // and the control: the colour SponsorCard actually ships passes in both themes, so the test above is not
  // asserting that everything fails
  for (const theme of ['light', 'dark'] as const) {
    const c = VP_COLORS[theme]
    assert.ok(contrastRatio(c.brand1, c.bgSoft) >= WCAG_AA_TEXT, `brand on bgSoft must pass in ${theme}`)
  }
})
