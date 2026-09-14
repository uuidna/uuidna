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
if (!paths.length) {
  console.error('✗ gen-witness-seals — no involution wave receipt (dist/evidence/involution-wave-*.json, or a path argument); nothing to seal')
  process.exit(1)
}

const fresh: Record<string, SealWitness[]> = {}
for (const p of paths) {
  for (const [key, ws] of Object.entries(witnessSealsOf(JSON.parse(readFileSync(p, 'utf8')) as WaveReceipt))) if (!(key in fresh)) fresh[key] = ws
}
const illegal = Object.entries(fresh).map(([key, ws]) => ({ key, s: witnessSealOf(key, ws) })).filter((x) => !x.s.legal)
if (illegal.length) {
  console.error(`✗ gen-witness-seals — ${illegal.map((x) => `${x.key} (${x.s.signed} of ${x.s.of} faces sign)`).join(', ')}: a witness signs only a subject the ledger seals.`)
  console.error('  Run lean-involutions, lean-ledger and build first, so every involution_<handle> is in the served ledger.')
  process.exit(1)
}
const prior = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) as Record<string, SealWitness[]> : {}
const merged = Object.fromEntries(Object.entries({ ...prior, ...fresh }).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
writeFileSync(OUT, JSON.stringify(merged, null, 1) + '\n')
console.log(`✓ lean/witness-seals.json — ${Object.keys(fresh).length} involution(s) signed and sealed on all ${VE_FACES} faces (${Object.keys(fresh).join(', ') || 'none'}); ${Object.keys(merged).length} subject(s) in the file`)
