import { test } from 'node:test'
import assert from 'node:assert/strict'
import { commonWords, crossLeads, distinctive, refutationCandidates, type LeadRow, type ToolRow } from './lead-cross.js'

const gaps = (...whats: string[]): LeadRow[] => whats.map((what) => ({ source: 'mcp-self-sufficiency', what }))

test('commonWords — words most leads share are refused as identifiers', () => {
  const leads = gaps('no door commits a pathspec', 'no door reads a source', 'no door runs the kernel', 'no door serves a theorem')
  const common = commonWords(leads)
  assert.ok(common.has('door'), 'every lead says door, so door identifies nothing')
  assert.ok(!common.has('pathspec'), 'pathspec appears once and is distinctive')
})

test('distinctive — a lead keeps only the words that single it out', () => {
  const leads = gaps('no door commits a pathspec', 'no door reads a source', 'no door runs a kernel',
    'no door reports a landing', 'no door serves a theorem', 'no door probes an evaluator')
  const d = distinctive(leads[0]!, commonWords(leads))
  assert.ok(d.includes('pathspec'))
  assert.ok(!d.includes('door'))
})

// CROSSING IS WHAT SHOWS 121 LEADS TO BE FAR FEWER CAPABILITIES.
// A REALISTIC PROPORTION MATTERS: three of five leads sharing a word is sixty per cent, which IS common. In the real
// corpus of 121, pathspec appears in about eight — six per cent — so the filler below is what makes the test's
// proportions resemble the corpus rather than a toy.
test('crossLeads — leads restating one capability land in one cluster', () => {
  const leads = gaps(
    'no door commits a pathspec',
    'no door commits a pathspec to git',
    'no door commits a pathspec in another repository',
    'no door runs the bare Lean kernel on candidate text',
    'no door runs the bare Lean kernel on an involution',
    'no door reports the publication kin graph',
    'no door probes zenodo header behaviour',
    'no door reports the school course ordering',
    'no door times a finder cost',
    'no door serves the cross skill identity census',
    'no door edits an authored citation',
    'no door reports qpu intra file dependency',
  )
  const { clusters } = crossLeads(leads)
  // THE CLAIM IS THE GROUPING, NOT THE NAME. "commits" and "pathspec" both appear in the same three leads, so which one
  // names the cluster is a tie broken alphabetically — asserting the name would be asserting the tiebreak.
  const together = clusters.find((c) => c.leads.every((l) => l.what.includes('pathspec')) && c.leads.length === 3)
  assert.ok(together, 'the three pathspec leads are one capability, whatever the cluster is called')
  assert.ok(clusters.some((c) => c.leads.every((l) => l.what.includes('kernel')) && c.leads.length === 2))
})

// A LEAD JOINS AT MOST ONE CLUSTER, or counting how many capabilities 121 leads amount to counts some of them twice.
test('crossLeads — no lead is claimed by two clusters', () => {
  const leads = gaps('alpha beta thing', 'alpha gamma thing', 'beta gamma thing')
  const { clusters, alone } = crossLeads(leads)
  const all = clusters.flatMap((c) => c.leads)
  assert.equal(new Set(all).size, all.length, 'each lead appears once')
  assert.equal(all.length + alone.length, 3)
})

test('crossLeads — a lead sharing nothing distinctive stands alone', () => {
  const leads = gaps('no door commits a pathspec', 'no door commits a pathspec again',
    'a wholly unrelated zebra matter', 'no door reads a generated page', 'no door reports a landing phase',
    'no door probes the involution evaluator', 'no door hunts a derived constant')
  const { alone } = crossLeads(leads)
  // every lead here that shares no distinctive word with another stands alone, and the zebra is one of them — the
  // earlier expectation of exactly one was wrong, because the other singletons are equally unpaired
  assert.ok(alone.some((l) => l.what.includes('zebra')))
  assert.ok(alone.length >= 1)
})

// THE FAKE LEAD: it names a door that already exists.
const tools: ToolRow[] = [
  { name: 'uuidna_theorem', description: 'Read ONE theorem by key: its Lean proof, statement, principle and address.' },
  { name: 'uuidna_spin', description: 'Fold the derived layer to one receipt.' },
]

test('refutationCandidates — a lead naming an existing door is a CANDIDATE, with the tool named', () => {
  const leads = gaps(
    'no door serves a theorem by key',
    'no door commits a pathspec to git',
    'no door reads a generated page',
    'no door probes zenodo header behaviour',
    'no door times a finder cost',
  )
  const cand = refutationCandidates(leads, tools)
  const theorem = cand.find((c) => c.lead.what.includes('theorem'))
  assert.ok(theorem, 'the theorem lead is a candidate — uuidna_theorem exists')
  assert.equal(theorem!.servedBy, 'uuidna_theorem')
  assert.ok(theorem!.on.includes('theorem'), 'and the matching word is named so it can be argued with')
})

// A WRONGLY REFUTED LEAD IS WORSE THAN AN OPEN ONE: an open lead is a question, a wrongly closed one is a false answer
// carrying a receipt. So one word in common is never enough.
// NOTHING HERE IS APPLIED, which is what makes a loose threshold safe: a candidate is a question put to a reader, and
// leads-gate still requires the kernel's evidence or an explicit --settle --refute with a stated reason.
test('refutationCandidates — a candidate is reported, never settled', () => {
  const leads = gaps('no door commits a pathspec', 'no door commits a pathspec twice', 'no door reads a page',
    'no door times a cost', 'no door probes zenodo')
  const cand = refutationCandidates(leads, [{ name: 'uuidna_commit_message', description: 'Check a commit message cites a theorem.' }])
  for (const c of cand) {
    assert.ok(c.servedBy !== null, 'every candidate names the tool it may be served by')
    assert.ok(c.on.length >= 1, 'and the words that matched, so a reader can disagree')
  }
})

test('refutationCandidates — a lead too vague to have distinctive words yields nothing', () => {
  const leads = gaps('no door', 'no door', 'no door')
  assert.deepEqual(refutationCandidates(leads, tools), [])
})
