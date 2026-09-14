#!/usr/bin/env node
// lean-involutions — the court's involutions enter the ledger through here, one wing per involution. Each wing
// states a refuted lead of lean/leads.json as `def lead_<handle> : Prop` over the objects its source derives, and
// proves `theorem involution_<handle> : ¬ lead_<handle>`. What each wing reads, and from where, is declared in
// involution-family.ts; this file only hands the wings to emit, which runs every fact's js leg before a line is
// written and queues the kernel. The 2×7 witness seals follow separately (gen-witness-seals), after lean-ledger has
// sealed these theorems, because a witness can only sign a subject the ledger holds.
import { emit } from './lean-gen.js'
import { INVOLUTION_HANDLES, buildWing } from './involution-family.js'

for (const handle of INVOLUTION_HANDLES) {
  const w = await buildWing(handle)
  // the header names the tactics this wing's proofs actually use, read from the proofs — `by decide` alone keeps
  // emit's standing header; a `decide` on Nat dvd or String membership drags propext, so some wings use exact/intro
  const tactics = [...new Set(w.facts.flatMap((f) => [...(f.lean ?? '').matchAll(/\bby\s+([a-z_]+)/g)].map((m) => m[1]!)))].sort()
  // every wing names the capability it demonstrates, as every other wing does — a row with no skill is a shape the
  // ledger's rows otherwise never take, and one more shape pushed the ledger's array literal past the type checker
  emit({ file: w.file, header: w.header, defs: w.defs, facts: w.facts, skill: 'involution', ...(tactics.join() === 'decide' ? {} : { proofs: `Every proof checked by the kernel (by ${tactics.join(', by ')})` }) })
}
