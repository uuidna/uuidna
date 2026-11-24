import { test } from 'node:test'
import assert from 'node:assert/strict'
import { meaningCensus, meaningSourceGaps, sourceKindsOf, wingSources, SOURCE_FORMS } from './meaning-sources.js'

// THE CAPTAIN ASKED THAT MEANING ALWAYS COME FROM SOURCES. The kernel decides a wing's arithmetic and never reads the
// sentence beside it, so the checkable property is that every wing NAMES a source a reader can open. These tests hold
// the detector and the honesty of its answer; the count of unsourced wings is the guard's to report, not pinned here,
// because it falls as emitters name their sources and a pinned count would have to be edited on each one.

test('the census says what it does not establish', () => {
  const c = meaningCensus()
  assert.match(c.honest, /does not establish that the wing reads the source correctly/i)
  assert.ok(c.wings > 100, 'the census must actually cover the wings')
  assert.equal(c.sourced + c.unsourced.length, c.wings, 'every wing is sourced or named as unsourced, none dropped')
})

// THE CONTROL. A census reads the same whether it checked or could not see, so each form is shown FIRING on a text
// that names it, and all of them are shown staying quiet on prose that names no openable source.
test('each form fires on its own identifier', () => {
  const samples: Record<string, string> = {
    doi: 'Schwenk (1991), doi 10.1080/0025570X.1991.11977627',
    mathlib: 'restates Mathlib.Combinatorics.SimpleGraph.Basic',
    isbn: 'Nielsen and Chuang, ISBN 978-1-107-00217-3',
    rfc: 'the layout of RFC 9562',
    standard: 'ISO/IEC 9834-8 object identifiers',
    arxiv: 'arXiv:1905.09749',
    oeis: 'the sequence OEIS A000045',
  }
  assert.deepEqual(Object.keys(samples).sort(), SOURCE_FORMS.map((f) => f.kind).sort(), 'every form has a control')
  for (const [kind, text] of Object.entries(samples)) assert.deepEqual(sourceKindsOf(text), [kind])
})

test('a bare name is not a source, and neither is the header every wing carries', () => {
  assert.deepEqual(sourceKindsOf('Verified against the official rules, Wikipedia, and a textbook.'), [])
  assert.deepEqual(sourceKindsOf('Every proof `by decide`, sorry-free, no Mathlib, and axiom-free.'), [])
})

test('the gap row counts exactly the wings that name nothing', () => {
  const rows = [{ wing: 'A.lean', kinds: ['doi'] }, { wing: 'B.lean', kinds: [] }, { wing: 'C.lean', kinds: [] }]
  const gaps = meaningSourceGaps(rows)
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /^2 of 3 wing\(s\) name NO source/)
  assert.match(gaps[0]!.what, /B\.lean, C\.lean/)
  assert.deepEqual(meaningSourceGaps([{ wing: 'A.lean', kinds: ['rfc'] }]), [])
})

test('a wing the resolved bibliography carries counts as sourced by its DOI', () => {
  const chess = wingSources().find((r) => r.wing === 'Chess.lean')
  assert.ok(chess, 'Chess.lean is a wing')
  assert.ok(chess.kinds.includes('doi'))
})
