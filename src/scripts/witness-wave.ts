#!/usr/bin/env node
// witness-wave — NAME THE VERDICTS AWAITING THEIR FOURTEEN FACES, and brief the wave that must sign them.
//
// The captain, 2026-09-26: "autonomous waves". The autonomous plan ran the PROPOSAL wave — wave-run, which
// kernel-probes pending candidates — and never the SEALING one. gen-witness-seals draws exactly that line: a receipt
// with no witness seats "is not a sealing receipt". So an involution could be compiled, axiom-free, served and
// correct, and still read `stands: false · witnesses 0 of 14` forever, with nothing in the loop naming the gap.
// Measured on theorem involution_c0727ef6 the day it was sealed: the kernel had accepted it and the rosettas had
// signed nothing, because no phase asked.
//
// THIS SCRIPT DOES NOT SIGN, AND THAT IS ITS DESIGN RATHER THAN ITS LIMIT. A face is a witness's OWN kernel
// recompile and its OWN faithfulness judgment. A process that wrote fourteen signatures for itself would be
// precisely the fraud the fourteen faces exist to prevent — and the faithfulness face in particular is a judgment
// about whether a Prop states the lead or something weaker that merely looks like it, which is not a computation.
// So the loop's honest move is to ASK: this names the work, prints the brief each witness needs, and exits.
//
// WHAT A WAVE THEN OWES, and the shape is the one that worked: seven witnesses, each recompiling the wing and
// reading `#print axioms` itself, each comparing the wing's quoted defs line by line against the wing they came
// from, and each free to DISSENT. On c0727ef6 three witnesses independently built the refused conjugated form as a
// CONTROL and kernel-proved it TRUE — confirming the overturned settlement was vacuous — and a fourth caught its own
// control comparing conjugated against conjugated and restated it rather than trusting the pass. That is what the
// faces are for; a wave where seven agree without looking is worth nothing.
import { rosettaSeals } from '../rosetta-seals.js'
import { VE_FACES } from '../hexbit/index.js'

interface Row { handle: string; theorem: string; kind: string; faces: number; signed: boolean; owes: string }
const s = rosettaSeals() as unknown as {
  faces: number; sealsMeasured: boolean; rows: Row[]; owing: string[]; noRosettaPath: string[]; receipt: string
}

// ONLY THE ROWS A WAVE CAN SIGN. rosettaSeals keeps `owing` (open refutations) apart from `noRosettaPath` — the
// proof_<handle> verdicts whose seal the writer cannot key, BY CONSTRUCTION: witnessSealsOf keys a seal by
// involution_<handle>, and a proof has no such name, which each row states in its own `owes`. Briefing those would
// ask seven witnesses, every run and forever, for work the machinery has no road to accept.
const owing = s.rows.filter((r) => !r.signed && s.owing.includes(r.handle))
const blocked = s.rows.filter((r) => !r.signed && !s.owing.includes(r.handle))
console.log(`witness-wave — ${owing.length} verdict(s) of ${s.rows.length} await their ${s.faces} faces`
  + `${s.sealsMeasured ? '' : ' (seals UNMEASURED: the seal file does not ship, so this is the absence of a measurement, never a zero)'}`)

if (blocked.length) {
  console.log(`  ${blocked.length} unsigned verdict(s) are NOT briefed, because the machinery cannot key their seal —`
    + ` a recorded gap, not a queue: ${blocked.map((r) => r.theorem).join(', ')}`)
}

if (!owing.length) {
  console.log('  every verdict a wave can sign is signed on all faces. Nothing to brief.')
  process.exit(0)
}

for (const r of owing) {
  console.log(`\n  ${r.theorem}  [lead ${r.handle}, ${r.kind}]  ${r.faces}/${s.faces} faces`)
  console.log(`      owes: ${r.owes}`)
  console.log(`      brief: seat ${s.faces / 2} witnesses. Each one, independently:`)
  console.log(`        FACE 1 — compile the wing itself and read the kernel's own \`#print axioms ${r.theorem}\`.`)
  console.log(`        FACE 2 — read the lead's exact text, read the Prop, and judge whether the Prop states THAT`)
  console.log(`                 lead or something weaker. Compare every quoted def line by line against the wing it`)
  console.log(`                 came from. A formalization that conjugates the law with the involution cannot fail`)
  console.log(`                 and is vacuous — build that form as a CONTROL and check the kernel calls it true.`)
  console.log(`        Dissent is a legitimate outcome and belongs in the receipt.`)
}

console.log(`\n  The wave writes dist/evidence/involution-wave-*.json carrying ${s.faces / 2} witness seats — a receipt`)
console.log(`  without seats is a proposal, not a sealing — then \`npm run x -- gen-witness-seals\` folds the faces.`)
console.log(`  NOTHING HERE SIGNS: ${VE_FACES} faces are ${VE_FACES / 2} witnesses' own work, and a process signing for`)
console.log('  itself is what the faces exist to refuse.')
