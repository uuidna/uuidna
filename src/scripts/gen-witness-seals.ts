#!/usr/bin/env node
// gen-witness-seals — lean/witness-seals.json from the court's involution wave receipts. For every involution a wave
// sealed on all VE_FACES faces with no dissent, the fourteen witness statements are written under
// "involution_<handle>": faces 0 … 6 the seven witnesses' kernel recompile, faces 7 … 13 their faithfulness judgment,
// in the order the receipt lists the witnesses (involution-family.ts, witnessSealsOf). trial-refusals re-signs them.
//
// IT RUNS AFTER THE LEDGER HOLDS THE SUBJECT. witnessSealOf signs a statement only when the theorem it cites is sealed,
// so the order is lean-involutions → lean-ledger → build → this. Every seal is re-checked for legality before
// anything is written, and one illegal seal writes nothing: an unsigned entry would read as a seal that failed.
//
// The receipts are named on the command line, or read from dist/evidence/involution-wave-*.json in name order; the
// first receipt to seal a handle is the one kept. Entries already in the file for other subjects stay as they are.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { ROOT } from './api.js'
import { witnessSealsOf, type WaveReceipt, type SealWitness } from './involution-family.js'
import { witnessSealOf } from '../refusal-trials.js'
import { VE_FACES } from '../hexbit/index.js'

const EVIDENCE = join(ROOT, 'dist', 'evidence')
const OUT = join(ROOT, 'lean', 'witness-seals.json')
const named = process.argv.slice(2).filter((a) => a.endsWith('.json'))
const paths = named.length
  ? named.map((a) => resolve(ROOT, a))
  : existsSync(EVIDENCE) ? readdirSync(EVIDENCE).filter((f) => /^involution-wave-.*\.json$/.test(f)).sort().map((f) => join(EVIDENCE, f)) : []
// the receipts are a wave's output under dist/evidence, which a fresh checkout does not carry: with none, nothing new
// arrived and the committed seals stand as written
if (!paths.length) {
  console.log('· gen-witness-seals — no involution wave receipt (dist/evidence/involution-wave-*.json, or a path argument); lean/witness-seals.json stands as committed')
  process.exit(0)
}

// a proposal wave writes under the same name and carries no witness seats: it is not a sealing receipt, and is named
const read = paths.map((p) => ({ p, r: JSON.parse(readFileSync(p, 'utf8')) as Partial<WaveReceipt> }))
const unseated = read.filter((x) => !Array.isArray(x.r.witnesses))
if (unseated.length) console.log(`· gen-witness-seals — ${unseated.map((x) => x.p.split('/').pop()).join(', ')}: no witness seats, not a sealing receipt`)
const fresh: Record<string, SealWitness[]> = {}
for (const { r } of read.filter((x) => Array.isArray(x.r.witnesses))) {
  for (const [key, ws] of Object.entries(witnessSealsOf(r as WaveReceipt))) if (!(key in fresh)) fresh[key] = ws
}
// A subject the file already seals keeps its seal unless a receipt is NAMED for it (how a re-witness is applied): the
// chain's default read of dist/evidence only adds subjects, so an older wave never rewrites a re-witnessed seal.
const prior = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) as Record<string, SealWitness[]> : {}
const adding = named.length ? fresh : Object.fromEntries(Object.entries(fresh).filter(([key]) => !(key in prior)))
const checked = Object.entries(adding).map(([key, ws]) => ({ key, ws, s: witnessSealOf(key, ws) }))
const illegal = checked.filter((x) => !x.s.legal)
const named_ = illegal.map((x) => `${x.key} (${x.s.signed} of ${x.s.of} faces sign)`).join(', ')
// a NAMED receipt is a request to seal, so an unsignable subject refuses it; the chain's default read only adds what
// the served ledger lets every face sign, and names the rest (a wave may list a subject the ledger later refused)
if (illegal.length && named.length) {
  console.error(`✗ gen-witness-seals — ${named_}: a witness signs only a subject the ledger seals.`)
  console.error('  Run lean-involutions, lean-ledger and build first, so every involution_<handle> is in the served ledger.')
  process.exit(1)
}
if (illegal.length) console.log(`· gen-witness-seals — ${named_}: not signable against the served ledger, not added`)
const legal = Object.fromEntries(checked.filter((x) => x.s.legal).map((x) => [x.key, x.ws]))
const merged = Object.fromEntries(Object.entries({ ...prior, ...legal }).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
writeFileSync(OUT, JSON.stringify(merged, null, 1) + '\n')
console.log(`✓ lean/witness-seals.json — ${Object.keys(legal).length} involution(s) signed and sealed on all ${VE_FACES} faces (${Object.keys(legal).join(', ') || 'none'}); ${Object.keys(merged).length} subject(s) in the file`)
