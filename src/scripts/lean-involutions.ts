#!/usr/bin/env node
// lean-involutions — the court's involutions enter the ledger through here, one wing per involution. Each wing
// states a refuted lead of lean/leads.json as `def lead_<handle> : Prop` over the objects its source derives, and
// proves `theorem involution_<handle> : ¬ lead_<handle>`. What each wing reads, and from where, is declared in
// involution-family.ts; this file only hands the wings to emit, which runs every fact's js leg before a line is
// written and queues the kernel. The 2×7 witness seals follow separately (gen-witness-seals), after lean-ledger has
// sealed these theorems, because a witness can only sign a subject the ledger holds.
//
// FORMALISED LEADS pass the door first: every row whose `lean` has no verdict for its current text is sent through
// the conveyor's probe and its verdict written back onto the row, and each accepted row becomes a wing. A host with
// no kernel VOIDS the door (no verdict is written, because an absent instrument issues none) and emits only the
// rows already accepted for their current text.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { emit } from './lean-gen.js'
import { probe, kernelPresent } from './kernel-probe.js'
import {
  INVOLUTION_HANDLES, FORMAL_SECTIONS, buildWing, buildFormalWing, formalLeads, formaliseLeads, verdictCurrent,
  type LeadBook, type WingText,
} from './involution-family.js'

const LEADS = join(ROOT, 'lean', 'leads.json')
let book = JSON.parse(readFileSync(LEADS, 'utf8')) as LeadBook
const stale = FORMAL_SECTIONS.flatMap((s) => book[s]).filter((r) => typeof r.lean === 'string' && !verdictCurrent(r)).length
if (stale && !kernelPresent()) {
  console.log(`lean-involutions — VOID: no lean kernel on this host; ${stale} formalised lead(s) wait for a host that can judge`)
} else if (stale) {
  const { book: next, judged } = formaliseLeads(book, probe)
  writeFileSync(LEADS, JSON.stringify(next, null, 2) + '\n')
  book = next
  for (const j of judged) {
    console.log(`  lead ${j.handle} (${j.section}): ${j.kernel.verdict.toUpperCase()} by the ${j.kernel.by}${j.kernel.theorem ? ` — ${j.kernel.theorem}` : ''}${j.kernel.said ? `: ${j.kernel.said.split('\n')[0]}` : ', no axiom'}`)
  }
}

const emitWing = (w: WingText): void => {
  // every wing names the capability it demonstrates, as every other wing does — a row with no skill is a shape the
  // ledger's rows otherwise never take, and one more shape pushed the ledger's array literal past the type checker
  emit({ file: w.file, header: w.header, defs: w.defs, facts: w.facts, skill: 'involution' })
}

for (const handle of INVOLUTION_HANDLES) emitWing(await buildWing(handle))
for (const f of formalLeads(book)) emitWing(buildFormalWing(f))
