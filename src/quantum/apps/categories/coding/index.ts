// categories/coding — THE CODING SHELF of the app store (the captain's taxonomy, 2026-08-22:
// src/quantum/apps/categories/[...]): the school's own instruments, each a pure app that teaches the theorem it
// runs on — testing (the trial with its controls), editing (the ℤ/24 ring whose undo is its own involution),
// building (states composed on the lattice, heard and addressed). The shelf's CONTENTS are these exports; a
// store page derives its listing from the registry, never from a hand-typed list.
export { testClaim, type ClaimTest, type ControlRun } from './claim-tester.js'
export { start, applyStride, undo, unitSquaresToOne, UNITS_24, FRAME_RING, type EditState } from './frame-editor.js'
export { build, type Composition } from './state-builder.js'
