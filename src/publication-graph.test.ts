import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  publicationGraph, graphCensus, graphNode, termsByPublication, modulusOf,
  RARE_MAX, WORD_MIN, KIN, CONST_WEIGHT, MOD_WEIGHT,
} from './publication-graph.js'
import { publications } from './publish.js'
import { merkleFold, toUuid } from './address.js'

// THE INSTRUMENT MUST BE ABLE TO FAIL. Each check below names a property that a broken graph would violate —
// a ranking that is not sorted, a score that does not follow from the shared terms, kinship claimed with no
// shared term at all, or a node relating to itself.

test('modulusOf reads the modulus of a congruence and nothing else', () => {
  assert.equal(modulusOf('(1 * 1) % 9 = 1'), '9')
  assert.equal(modulusOf('(3 + 4) % 7 = 0'), '7')
  // NOT a congruence: a plain equality has no modulus, and that is an answer, not a failure to parse
  assert.equal(modulusOf('2 + 2 = 4'), null)
  // unparseable input must be null, never a throw — most statements are not formulas
  assert.equal(modulusOf('the seal is a fixed point'), null)
})

test('every publication has kin, and kinship is never self-referential', () => {
  const g = publicationGraph()
  assert.equal(g.length, publications().length, 'the graph covers every monograph')
  for (const n of g) {
    assert.ok(n.kin.length > 0, `${n.slug} is isolated — a leaf monograph has nowhere for a reader to go`)
    assert.ok(!n.kin.some((k) => k.slug === n.slug), `${n.slug} relates to itself`)
    assert.ok(n.kin.length <= KIN, `${n.slug} keeps more than the ${KIN}-kin shortlist`)
  }
})

test('the kin list is ranked, descending, and ties break on slug', () => {
  for (const n of publicationGraph()) {
    for (let i = 1; i < n.kin.length; i++) {
      const prev = n.kin[i - 1]!, cur = n.kin[i]!
      assert.ok(prev.score >= cur.score, `${n.slug}: kin out of rank order`)
      if (prev.score === cur.score) assert.ok(prev.slug < cur.slug, `${n.slug}: tie not broken on slug`)
    }
  }
})

test('every score IS its shared terms — not a number beside them', () => {
  for (const n of publicationGraph()) {
    for (const k of n.kin) {
      const expected = k.sharedModuli.length * MOD_WEIGHT
        + k.sharedConstants.length * CONST_WEIGHT + k.sharedWords.length
      assert.equal(k.score, expected, `${n.slug}>${k.slug}: score does not follow from the shared terms`)
      assert.ok(k.score > 0, `${n.slug}>${k.slug}: kin with no shared term`)
    }
  }
})

test('kinship is symmetric in its shared terms', () => {
  const g = publicationGraph()
  const by = new Map(g.map((n) => [n.slug, n]))
  for (const n of g) {
    for (const k of n.kin) {
      const other = by.get(k.slug)
      assert.ok(other, `${k.slug} is named as kin but is not a node`)
      // the shortlist is a cut, so B need not list A — but if it does, the shared terms must agree
      const back = other!.kin.find((x) => x.slug === n.slug)
      if (back) assert.equal(back.score, k.score, `${n.slug}<->${k.slug}: asymmetric score`)
    }
  }
})

test('rarity is what makes a term relate — a corpus-wide term relates nothing', () => {
  const terms = termsByPublication()
  const cf = new Map<string, number>()
  for (const t of terms) for (const c of t.constants) cf.set(c, (cf.get(c) ?? 0) + 1)
  for (const t of terms)
    for (const c of t.rareConstants)
      assert.ok((cf.get(c) ?? 0) <= RARE_MAX, `${t.slug}: ${c} appears in more than ${RARE_MAX} monographs`)
  assert.ok(WORD_MIN >= 2, 'a word in one monograph cannot relate a pair')
})

test('the census agrees with the graph it summarises', () => {
  const g = publicationGraph()
  const c = graphCensus()
  assert.equal(c.publications, g.length)
  assert.equal(c.edges, g.reduce((a, n) => a + n.kin.length, 0), 'the edge count must BE the edges')
  assert.deepEqual(c.isolated, [], 'no monograph may be a leaf')
  assert.equal(c.fullShortlist, g.filter((n) => n.kin.length === KIN).length)
})

test('the graph is deterministic — the same ledger returns the same receipt', () => {
  assert.equal(graphCensus().receipt, graphCensus().receipt)
  assert.equal(graphNode('core')?.receipt, graphNode('core')?.receipt)
})

// THE REGRESSION THIS SECTION EXISTS TO PREVENT. The abstract was one template whose only variable was the
// theorem count: 116 monographs, 27 distinct abstracts, median length identical to the minimum. A DOI minted
// over that is a permanent record of a template, so distinctness is now a test, not a hope.
test('every monograph carries its own abstract — no template', () => {
  const ps = publications()
  const abstracts = new Set(ps.map((p) => p.abstract))
  assert.equal(abstracts.size, ps.length, 'two monographs share an abstract — the template is back')
  for (const p of ps) assert.ok(p.abstract.length >= 400, `${p.slug}: abstract too thin to be one`)
})

test('every monograph crosslinks its kin, and says why each is kin', () => {
  for (const p of publications()) {
    assert.match(p.markdown, /## Related monographs/, `${p.slug}: no related section`)
    assert.match(p.markdown, /\]\(\/publications\//, `${p.slug}: related section names no sibling`)
    assert.match(p.markdown, /## What it rests on/, `${p.slug}: does not name what it assumes`)
  }
})

// ── A SEALED LITERAL MUST STILL EQUAL THE LIVE FIGURE, or the theorem quietly becomes a record of the past
// wearing the present tense. A peer measured this exact shape in their own tree and it was wrong in five of
// eight files, four of them UNDERSTATING, because a tree only grows and nothing recomputed
// (millennium-solutions, 2026-09-04). The theorem `the_kin_shortlist_accounts_for_every_edge` seals a degree
// sequence of 114 fives and two twos summing to 574 edges; if a wing is added tomorrow those integers stay true
// as arithmetic while the sentence around them stops being about this corpus. So they are recomputed here, and
// drift breaks the suite instead of rotting in a proof.
// THE SEQUENCE IS DERIVED IN THE THEOREM TOO, so this checks the RELATIONS that must hold rather than four
// literals that a new wing invalidates. The counts were frozen at 117/115/[2,2]/579 in both places and both
// went wrong on the same run; the identity below is what the theorem actually seals, and it closes at any size.
test('the degree sequence closes: every node within the shortlist, and the degrees sum to the edges', () => {
  const g = publicationGraph()
  const degrees = g.map((n) => n.kin.length)
  const full = degrees.filter((d) => d === KIN).length
  const short = degrees.filter((d) => d !== KIN).sort((a, b) => a - b)
  assert.equal(degrees.length, g.length, 'one degree per monograph')
  assert.ok(degrees.every((d) => d >= 1 && d <= KIN), `no node may be a leaf or exceed the ${KIN}-kin shortlist`)
  assert.equal(full + short.length, g.length, 'full and short degrees must partition the corpus')
  assert.equal(graphCensus().edges, degrees.reduce((a, d) => a + d, 0),
    'the census edge count must BE the degree sum, not a number beside it')
  assert.equal(full * KIN + short.reduce((a, d) => a + d, 0), graphCensus().edges, 'and the identity must close')
})

// THE FIGURE IS DERIVED, NOT FROZEN. This asserted `ps.length === 117` and the theorem it names carried the
// same literal; sealing a wing made both wrong on the same run. The relation is what matters and it is checked
// against the live corpus: a one-variable template can only distinguish as many abstracts as it has distinct
// variable values, while the DERIVED abstracts distinguish every monograph — which is why they were derived.
test('the template ceiling is below the corpus, and the derived abstracts clear it', () => {
  const ps = publications()
  assert.ok(ps.length > 0)
  const templateCeiling = new Set(ps.map((p) => p.count)).size
  assert.ok(templateCeiling < ps.length,
    `a one-variable template distinguishes at most ${templateCeiling} of ${ps.length} monographs — that ceiling is the finding`)
  assert.equal(new Set(ps.map((p) => p.abstract)).size, ps.length,
    'and the derived abstracts distinguish every one, which the template could not')
})

// ── THE RECEIPT MUST WITNESS THE ORDERING, NOT ONLY THE MEMBERSHIP.
//
// A peer's tell (ceccec.github.io, 2026-09-05): an order-insensitive reduction discards order BY CONSTRUCTION,
// so it cannot distinguish a permutation from
// the original, and merkleFold SORTS its leaves. Tested against the real expression rather than assumed — two
// different orderings of the same (member, score) pairs folded to an identical receipt, so the ranking, which is
// the entire content of the kinship rule, was invisible to it.
//
// The exposure was latent: the comparator admits exactly one valid order per set of pairs, so the code could not
// emit two. That is precisely why it mattered — a BROKEN comparator would leave members and scores untouched,
// the receipt unchanged, and the ranking silently inverted. Position is now folded in, and this test perturbs
// exactly that substitution so the guarantee has been watched failing rather than only watched passing.
test('the node receipt distinguishes two orderings of the same members', () => {
  const fold = (order: readonly { slug: string; score: number }[]): string =>
    merkleFold([toUuid('pub-graph|core'), ...order.map((k, rank) => toUuid('core>' + rank + '>' + k.slug + '|' + k.score))])
  const ring = { slug: 'ring', score: 6 }
  const vortex = { slug: 'vortex', score: 6 }
  assert.notEqual(fold([ring, vortex]), fold([vortex, ring]),
    'a permutation of the kin list must move the receipt, or a broken comparator is invisible to it')
  // and the same ordering must still fold to the same receipt, or nothing recomputes
  assert.equal(fold([ring, vortex]), fold([ring, vortex]))
})

// THE CONTROL: the OLD expression, kept here to show what it could not see. Without this the fix above is a
// claim; with it, the defect is demonstrated.
test('CONTROL — the previous leaf shape could NOT see a permutation', () => {
  const oldFold = (order: readonly { slug: string; score: number }[]): string =>
    merkleFold([toUuid('pub-graph|core'), ...order.map((k) => toUuid('core>' + k.slug + '|' + k.score))])
  const ring = { slug: 'ring', score: 6 }
  const vortex = { slug: 'vortex', score: 6 }
  assert.equal(oldFold([ring, vortex]), oldFold([vortex, ring]),
    'this is the defect the rank was added to close — if this ever differs, the tell no longer applies')
})

test('every live node receipt still recomputes, and the rank is what makes it do so', () => {
  for (const n of publicationGraph().slice(0, 40)) {
    const recomputed = merkleFold([
      toUuid('pub-graph|' + n.slug),
      ...n.kin.map((k, rank) => toUuid(n.slug + '>' + rank + '>' + k.slug + '|' + k.score)),
    ])
    assert.equal(n.receipt, recomputed, `${n.slug}: the receipt does not recompute from its own ranked kin`)
  }
})
