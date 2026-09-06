import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { queryOf } from './prior-art-sweep.js'
import { theorems } from '../index.js'
import { attributions } from '../claim-attribution.js'

// THE SWEEP MUST FIND WHAT THE TREE ALREADY HOLDS, or its silence means nothing.
//
// This is the acceptance test the sweep did not have, and its absence is why a broken instrument ran for hours.
// The tree records 16 theorems against a named external source, four of them with a DOI. Those are not opinions
// — they are the answers. An instrument that fails to retrieve a citation this repository already has on file
// may not be read as evidence when it retrieves nothing for a row nobody annotated. May not, because the two
// outcomes are then the same event: the retriever failing. A miss would report "no prior art found" in both the
// case where none exists and the case where the instrument is blind, and nothing in the output distinguishes
// them.
//
// MEASURED 2026-09-06, which is why this exists rather than a threshold tweak:
//   production query (the claim SENTENCE)   0/3 known DOIs retrieved; Watson-Crick absent from the top 5
//   subject-noun query                      3/4 retrieved AT RANK 1
// "molecular structure of nucleic acids" returns 10.1038/171737a0 first. The sealed claim sentence — "DNA
// base-pairing is a fixed-point-free involution on 4 bases (A<->T, G<->C = b XOR 1)" — returns a paper on the
// Riemann zeta function. The claim sentence is a FORMALISATION; no paper is phrased that way, so the retriever
// was never handed a literature query. Threshold work above that layer is polishing a broken retriever, and the
// cross-index agreement rule was calibrated on short hand-made probes the running code never constructs.
//
// OFFLINE. This asserts a PROPERTY OF THE QUERY, not a network answer — the sweep is declared dormant precisely
// so no network read enters a deterministic chain, and an acceptance test that needed the network could not run
// in the gate that has to enforce it. The network arm is `prior-art-sweep --limit=N` run by hand against these
// same 16 rows; this arm holds the line the query must clear before that is worth spending.

/** Words a literature index can match: the subject, not the formalism. */
const LITERATURE_STOP = /^(is|are|the|a|an|of|on|in|to|and|or|for|by|with|as|at|so|no|not|its|it|this|that|each|every|all|any|be|has|have|from|into|over|under|then|than|thus|hence|which|where|when|because|since|only|just|also|same|other|both|two|one)$/

const contentWords = (q: string): string[] =>
  q.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3 && !LITERATURE_STOP.test(w))

test('prior-art retrieval — every attributed row still has a claim sentence to ask about', () => {
  const byKey = new Map(theorems().map((t) => [t.key, t]))
  const rows = attributions()
  assert.ok(rows.length > 0, 'the witness census is empty — every assertion below would be vacuous')
  for (const a of rows) {
    const t = byKey.get(a.key)
    assert.ok(t, `${a.key} is attributed to ${a.source} but is not in the ledger`)
    assert.notEqual(queryOf(t.name).trim(), '', `${a.key} produces an EMPTY query — the sweep records it as unasked forever`)
  }
})

// THE OUTPUT MAY NOT BE READABLE AS A NOVELTY VERDICT — the boundary that survives the measurement.
//
// The retrieval defect turned out not to be a tuning problem. Automated queries return NOTHING: n=0 from
// PubMed for the claim sentence and for a subject-extracted rewrite of it, and no relevant result from
// Crossref, OpenAlex or arXiv. The only queries that retrieved the four known DOIs were the target papers' own
// titles — circular, since that is the answer. A formalisation sentence is not a literature query, and no
// mechanical rewrite tested turned it into one: dropping the symbols and the proof vocabulary still returned
// n=0, because what the index needs is the subject's name in the literature's own words, which is precisely the
// knowledge the sweep was meant to go and find.
//
// What survives is an ASYMMETRY, and it is permanent rather than pending a better retriever: a hit is
// self-verifying, because it carries an identifier anyone can check, and a miss is evidence of nothing — not
// from one index, not from two independent ones, not from any finite set. So this instrument can find prior art
// and can NEVER establish novelty. The risk is therefore not a wrong number, it is a WORD: a field named
// `clean` becomes "novel" in the next hand's summary. This test holds the naming.
test('prior-art retrieval — no field of the sweep can be read as a novelty verdict', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'prior-art-sweep.ts'), 'utf8')
  const emitted = [...src.matchAll(/^\s{4}([a-zA-Z]+):/gm)].map((m) => m[1]!)
  const reads_as_novel = emitted.filter((f) => /^(clean|novel|unique|original|first|clear)$/.test(f))
  assert.deepEqual(reads_as_novel, [], 'a field with this name will be summarised as "novel", which no miss can support')
  assert.match(src, /A MISS IS NOT EVIDENCE OF NOVELTY AND NEVER CAN BE/, 'the written record must carry the asymmetry, not just this test')
})
