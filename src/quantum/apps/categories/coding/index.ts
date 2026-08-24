// categories/coding — THE CODING SHELF of the app store (the captain's taxonomy, 2026-08-22:
// src/quantum/apps/categories/[...]): the school's own instruments, each a pure app that teaches the theorem it
// runs on — testing (the trial with its controls), editing (the ℤ/24 ring whose undo is its own involution),
// building (states composed on the lattice, heard and addressed). The shelf's CONTENTS are these exports; a
// store page derives its listing from the registry, never from a hand-typed list.
export { testClaim, type ClaimTest, type ControlRun } from './claim-tester.js'
export { start, applyStride, undo, unitSquaresToOne, UNITS_24, FRAME_RING, type EditState } from './frame-editor.js'
export { build, type Composition } from './state-builder.js'
// the say-do gap made decidable — a commit's message against its own diff (lead 98, the polygraph)
export { sayDoOf, chart, type CommitRecord, type SayDo, type PolygraphChart } from './polygraph.js'
// UNVERIFIED made a pointer — the trial's open verdict carrying the involutions around it (lead 88)
export { noticeOf, type Notice } from './notice.js'
// the message of record, standardised — glyphs, seal, TL;DR, each carrying what only it can (lead 80)
export { envelopeOf, readEnvelope, type Envelope, type Reading } from './messaging-handle.js'
