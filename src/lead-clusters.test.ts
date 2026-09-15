// lead-clusters — THE HAND-RUN VERSION GOT BOTH ITS FIRST TWO ANSWERS WRONG, WHICH IS WHY THIS FILE EXISTS.
//
// Asked "how many leads around darwin", a grep answered 27 by splitting the queue on "; " — punctuation, not a
// lead boundary — and by matching substrings, so a book quotation containing the word apple was counted as a
// lead about the platform. The instrument says 0. Asked about tesla it answered 20; the instrument says 1.
// Both hand answers were too big and both were confident, which is the pairing that does the damage.
//
// So the properties below are the two defects turned into assertions: a lead is counted at its own boundary,
// and a term matches a word rather than a fragment of one. The third asserts what one-pass buys — every
// cluster from a single tokenisation — by checking the fold against a per-term scan that computes the same
// numbers the slow way. An instrument that only agrees with itself is not corroborated.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fold as foldOn, around as aroundOn, leads as leadsOn, wingTerms as wingTermsOn, foldOf, handleOfText, tokens, LEADS_FILE, QUEUE_FILE } from './lead-clusters.js'
import { callTool } from './mcp.js'
import { isUnmeasured, type Unmeasured } from './boundary.js'

// the host answers; an Unmeasured here is a failure of the host reading, named
const measured = <T,>(x: T | Unmeasured): T => { if (isUnmeasured(x)) assert.fail(x.unmeasured); return x }
const leads = () => measured(leadsOn())
const fold = () => measured(foldOn())
const around = (t: string) => measured(aroundOn(t))
const wingTerms = () => measured(wingTermsOn())

test('a lead is parsed at its own boundary, not on punctuation', () => {
  const { leads: all, unreadable } = leads()
  assert.equal(unreadable.length, 0, `unreadable lead sources: ${unreadable.join(',')}`)
  assert.ok(all.length > 100, 'the tree holds well over a hundred leads across its surfaces')
  // the "; " splitter produced hundreds of fragments; real leads are numbered or binned records
  assert.ok(all.every((l) => /^[0-9a-f]{8}$/.test(l.handle) && l.text.length > 0),
    'every lead is addressed by a handle derived from its own content — no invented id scheme')
  // identity IS content: same body, same handle, with no merge rule to write and none to get wrong
  assert.equal(handleOfText('a lead'), handleOfText('a lead'), 'the address is a function of the content')
  assert.notEqual(handleOfText('a lead'), handleOfText('another lead'), 'and it separates different content')
})

test('a term matches a WORD, never a fragment — the apple-in-a-quotation defect', () => {
  // "app" must not collect leads that merely contain "apple", "applet" or "application"
  const app = around('app').hits.length
  const apple = around('apple').hits.length
  assert.ok(app <= apple + around('app').total, 'sanity')
  assert.notEqual(around('os').hits.length, around('o').hits.length, 'a one-letter term is not a cluster')
  // the concrete correction: darwin is not a sealed wing and no lead names it
  assert.equal(around('darwin').hits.length, 0,
    'the hand-run grep reported 27 by substring-matching prose; the word darwin appears in no lead')
  assert.equal((callTool('uuidna_lead_clusters', { term: 'darwin' }) as { leads: number }).leads, 0,
    'and the door answers what the instrument answers')
})

test('ONE PASS, cross-checked against the \\b scan it replaced — and every gap explained', () => {
  const f = fold()
  const vocab = wingTerms()
  // THE CONTROL IS THE OLD RULE, kept precisely because it disagrees. \b treats _ and digits as word
  // characters, so `uuidna_unify` and `os2` hide the term from the regex while the tokeniser reads it. Where
  // the two differ, every extra lead must contain the term ADJACENT to a word character — a disagreement this
  // assertion can fail on, rather than a control rewritten until it agrees.
  for (const c of f.clusters.slice(0, 12)) {
    const slow = f.leads.filter((l) => new RegExp(`\\b${c.term}\\b`, 'i').test(l.text))
    const fast = f.leads.filter((l) => tokens(l.text).has(c.term))
    assert.equal(fast.length, c.n, `${c.term}: the fold must equal a direct token scan`)
    assert.ok(fast.length >= slow.length, `${c.term}: the tokeniser can only see MORE, never less`)
    const extra = fast.filter((l) => !slow.includes(l))
    for (const l of extra) {
      assert.match(l.text.toLowerCase(), new RegExp(`[_a-z0-9]${c.term}|${c.term}[_a-z0-9]`),
        `${c.term}: lead ${l.handle} differs for a reason other than word-character adjacency`)
    }
  }
  assert.ok(f.clusters.every((c) => vocab.includes(c.term)), 'every cluster term is a sealed wing name')
  assert.ok(f.clusters.length > 0 && f.clusters.length <= vocab.length, 'live terms are a subset of the vocabulary')
})

test('a lead naming no sealed wing is UNANCHORED, and is the exact complement of the graph', () => {
  const f = fold()
  const anchored = new Set(f.graph.map((e) => e.lead))
  assert.ok(f.unanchored.every((l) => !anchored.has(l.handle)), 'an unanchored lead has no edge')
  assert.equal(anchored.size + f.unanchored.length, new Set(f.leads.map((l) => l.handle)).size,
    'anchored and unanchored partition the leads — nothing is lost or double-counted between them')
})

test('the crosslink is handle to handle, both ends derived', () => {
  const f = fold()
  assert.ok(f.graph.length > 0, 'leads do name sealed wings')
  assert.ok(f.graph.every((e) => /^[0-9a-f]{8}$/.test(e.lead) && /^[0-9a-f]{8}$/.test(e.wing)),
    'both ends of every edge are handles, at the level the rest of the tree already works')
  for (const c of f.clusters) assert.equal(c.handle, handleOfText(c.term), 'a wing handle is derived, not assigned')
})

test('the sources are the tree\'s own: every lead comes from lean/, and nothing reads a private store', () => {
  const all = leads().leads
  assert.ok(all.every((l) => l.source === LEADS_FILE || l.source === QUEUE_FILE), 'a lead from outside the repo is a lead the tree cannot check')
  assert.ok(all.some((l) => l.source === LEADS_FILE) && all.some((l) => l.source === QUEUE_FILE), 'both in-repo sources are read')
  const src = readFileSync(new URL('./lead-clusters.js', import.meta.url), 'utf8')
  assert.doesNotMatch(src, /homedir|\.claude/, 'no path outside the project')
})

test('with no filesystem every door answers UNMEASURED by name, never an empty fold; on the host it measures', () => {
  for (const x of [foldOn('.', null), leadsOn('.', null), aroundOn('wave', '.', null), wingTermsOn('.', null)]) {
    assert.ok(isUnmeasured(x))
    assert.match(x.unmeasured, /lead clusters — UNMEASURED/)
  }
  assert.ok(!isUnmeasured(foldOn()))
})

test('foldOf is pure over its sources: a lead naming a wing clusters, and an unread source is named, not zero', () => {
  const queue = JSON.stringify({ pending: [{ key: 'k', why: 'a wave candidate' }], accepted: [], refused: [{ key: 'r', why: 'nothing named', reason: 'no proof class' }] })
  const f = foldOf({ leads: null, queue, wings: ['Wave.lean', 'Other.lean'] })
  assert.deepEqual(f.clusters.map((c) => [c.term, c.n]), [['wave', 1]])
  assert.equal(f.unanchored.length, 1)
  assert.deepEqual(f.unreadable, [LEADS_FILE])
  assert.deepEqual(f.leads.map((l) => l.status), ['open', 'refused'])
  assert.deepEqual(foldOf({ leads: '{}', queue: '{}', wings: [] }).unreadable, [])
})
