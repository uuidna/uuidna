#!/usr/bin/env node
// @finder phase:5 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// phd-census — REPORT THE DOCTORATE'S REQUIREMENTS ONE BY ONE, and name the ones not holding.
//
// phdProofs().complete was a single 26-term conjunction. When a new wing made it false, the only thing any surface
// could say was `false`, and finding out which requirement had stopped holding meant bisecting the expression by hand.
// This is the door that was missing (recorded as UUIDNA_MCP_GAP="no phd door"): the clauses are unchanged, they are
// named, and a failure points at itself.

import { phdProofs } from '../phd-proofs.js'
import { prepublishSeal } from '../prepublish-seal.js'

const phd = phdProofs()
console.log(`phd — ${phd.clauses.length} requirement(s), ${phd.failing.length} not holding, complete ${phd.complete}`)
console.log(`receipt ${phd.receipt}`)
if (phd.failing.length > 0) {
  console.log()
  console.log('NOT HOLDING:')
  for (const name of phd.failing) console.log(`  ✗ ${name}`)
}
console.log()
console.log(`thesis: ok ${phd.thesis.ok} · drained ${phd.thesis.drained} · axiom-free ${phd.thesis.axiomFree} · gaps ${phd.thesis.gaps}`)
// A GAP COUNT IS NOT A WORK LIST. `thesis: the seal holds` is itself a conjunction, so naming it only moves the
// question one level down; the gaps are printed here so the trail ends at something actionable.
const seal = prepublishSeal()
if (seal.gaps.length > 0) {
  console.log()
  console.log(`THESIS GAPS (${seal.gaps.length}):`)
  for (const g of seal.gaps) console.log(`  ✗ ${JSON.stringify(g)}`)
}
