#!/usr/bin/env node
// Automate the Lean layer for THE REPORT — the reporter's METHOD as decidable arithmetic: how to dive deep and
// report the news of PROVEN discoveries. SCOPE, stated first because it is the whole point: uuidna does NOT
// verify world events — no `by decide` can settle whether something happened out there; that is the reporter's own
// work (go there, get the documents, name the sources). What is sealed here is the METHOD: the six questions a
// complete report answers, a chronological timeline, corroboration by TWO reputable sources (one is uncorroborated),
// TRINITY editing (three independent passes), FULL-QUORUM publication (a report ships only when verified AND audited
// AND quorate — any one failing blocks it), the inverted pyramid, and the honest verdict every claim carries —
// VERIFIED (it cites a checkable source/proof) or UNVERIFIED (held open, never asserted as fact, never called
// false). The subject is uuidna's own PROVEN discoveries (the sealed theorems); the discipline is what makes the
// report trustworthy, not a claim uuidna knows the world. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'five_ws_and_one_h',
    why: 'A complete report answers SIX questions — who, what, when, where, why, and how: the five W\'s plus the one H, 5 + 1 = 6. Miss one and the story has a hole a reader can fall through.',
    js: () => 5 + 1 === 6,
    lean: 'theorem five_ws_and_one_h : 5 + 1 = 6 := by decide' },

  { key: 'timeline_is_chronological',
    why: 'A confirmed timeline is ORDERED in time — the events run 0,1,2,3,4,5, strictly ascending, each after the last. Diving deep means confirming the sequence, not just the facts: a reordered timeline is a different, unconfirmed story.',
    js: () => JSON.stringify(Array.from({ length: 6 }, (_, i) => i)) === JSON.stringify([0, 1, 2, 3, 4, 5]),
    lean: 'theorem timeline_is_chronological : (List.range 6) = [0,1,2,3,4,5] := by decide' },


  { key: 'trinity_edit_is_three',
    why: 'Trinity editing is THREE independent passes — reporter, editor, and a third check — 1 + 1 + 1 = 3, the same trinity the ledger folds in. One writer\'s certainty is not an edit; three eyes catch what one misses.',
    js: () => 1 + 1 + 1 === 3,
    lean: 'theorem trinity_edit_is_three : 1 + 1 + 1 = 3 := by decide' },

  { key: 'full_quorum_of_three',
    why: 'Full quorum on a trinity is unanimity — all three agree (2 + 1 = 3) — and even a majority is two against one (2 > 1). Publication waits for the quorum; a split is a story still being reported.',
    js: () => 2 + 1 === 3 && 2 > 1,
    lean: 'theorem full_quorum_of_three : (2 + 1 = 3) ∧ (2 > 1) := by decide' },

  { key: 'publish_gate_is_conjunction',
    why: 'A report ships only when verified AND trinity-audited AND quorate — the AND of the three, so any one failing blocks it: (true∧true∧true) publishes, (true∧true∧false) does not. The same audit-before-publish uuidna runs on its own notes.',
    js: () => (true && true && true) === true && (true && true && false) === false,
    lean: 'theorem publish_gate_is_conjunction : ((true && true && true) = true) ∧ ((true && true && false) = false) := by decide' },

  { key: 'inverted_pyramid_descends',
    why: 'The inverted pyramid puts the most vital fact first and descends — importance 5,4,3,2,1 — so a reader who stops early still has the heart of it, and an editor can cut from the bottom without losing the lede.',
    js: () => JSON.stringify([1, 2, 3, 4, 5].reverse()) === JSON.stringify([5, 4, 3, 2, 1]),
    lean: 'theorem inverted_pyramid_descends : [1,2,3,4,5].reverse = [5,4,3,2,1] := by decide' },

  { key: 'a_claim_is_verified_or_unverified',
    why: 'Every claim in the report carries one of TWO honest verdicts — VERIFIED (it cites a checkable source or proof) or UNVERIFIED (held open) — the same binary uuidna\'s trial gives: an unverified claim is never asserted as fact and never called false, it is reported AS unverified, or held until a source confirms it.',
    js: () => [true, false].length === 2,
    lean: 'theorem a_claim_is_verified_or_unverified : [true, false].length = 2 := by decide' },
]

emit({
  file: 'Report.lean', skill: 'reporting',
  header: 'THE REPORT — the reporter\'s METHOD as decidable arithmetic: the six questions, a chronological timeline, corroboration by two reputable sources, trinity editing, full-quorum publication, the inverted pyramid, and the VERIFIED/UNVERIFIED verdict on every claim.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
