#!/usr/bin/env node
// migrate-skills — a SAVED, idempotent codemod that authors each domain's inline skill into its generator (the
// single source), so the capability is derived in the generator, not reverse-engineered by the skillOf heuristic.
// It injects `skill: '<skill>'` into the emit() call of every UNIFORM-skill generator (one authored capability per
// file). Mixed-skill files (per-fact skills) and the hand-written trio (Uuidna/Vortex/OneLeap) are out of scope —
// they carry no single file default. Re-runnable: a generator that already carries its skill is skipped.
//
// This is the migration record: run it, then `npm run lean` regenerates the manifests (now {key,name,skill}) and the
// ledger, and the site + MCP derive the skill from there. Nothing here authors a theorem; it authors the axis label.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPTS = dirname(fileURLToPath(import.meta.url)).replace(/\/dist\//, '/src/') // author into src/, not dist/

// Each UNIFORM generator → the ONE capability every fact in its file demonstrates. Domain files that skillOf could
// not classify (they fell to 'foundational' by default) get their true domain skill here — authored, not defaulted.
const MAP: Record<string, [string, string]> = {
  'lean-astronomy.ts': ['Astronomy.lean', 'astronomy'],
  'lean-calendar.ts': ['Calendar.lean', 'calendar'],
  'lean-chess.ts': ['Chess.lean', 'chess'],
  'lean-codes.ts': ['Codes.lean', 'codes'],
  'lean-colour.ts': ['Colour.lean', 'colour'],
  'lean-core.ts': ['Core.lean', 'z9-ring'],
  'lean-diving.ts': ['Diving.lean', 'diving'],
  'lean-editing.ts': ['Editing.lean', 'editing'],
  'lean-electromagnetism.ts': ['Electromagnetism.lean', 'electromagnetism'],
  'lean-harmony.ts': ['Harmony.lean', 'science-pairs'],
  'lean-identifiers.ts': ['Identifiers.lean', 'identifiers'],
  'lean-neuro.ts': ['Neuro.lean', 'neuro'],
  'lean-photography.ts': ['Photography.lean', 'photography'],
  'lean-propulsion.ts': ['Propulsion.lean', 'propulsion'],
  'lean-reasoning.ts': ['Reasoning.lean', 'reasoning'],
  'lean-sailing.ts': ['Sailing.lean', 'sailing'],
  'lean-security.ts': ['Security.lean', 'security'],
  'lean-spectrum.ts': ['Spectrum.lean', 'spectrum'],
  'lean-statics.ts': ['Statics.lean', 'statics'],
  'lean-thermodynamics.ts': ['Thermodynamics.lean', 'thermodynamics'],
  'lean-tides.ts': ['Tides.lean', 'tides'],
  'lean-topography.ts': ['Topography.lean', 'topography'],
}

let changed = 0
for (const [gen, [leanFile, skill]] of Object.entries(MAP)) {
  const path = join(SCRIPTS, gen)
  let src: string
  try { src = readFileSync(path, 'utf8') } catch { console.log('  ! missing ' + gen); continue }
  if (src.includes(`skill: '${skill}'`)) { console.log('  = ' + gen + ' already carries skill ' + skill); continue }
  const anchor = `file: '${leanFile}',`
  if (!src.includes(anchor)) { console.log('  ! ' + gen + ' — no anchor "' + anchor + '" (non-standard emit)'); continue }
  writeFileSync(path, src.replace(anchor, `${anchor} skill: '${skill}',`))
  console.log('  + ' + gen + ' → skill: ' + skill)
  changed++
}
console.log(`migrate-skills: authored ${changed} generator(s). lean-tables (Ring/Rosette) is threaded separately; run \`npm run lean\` to regenerate manifests + ledger.`)
