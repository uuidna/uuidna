#!/usr/bin/env node
// migrate-skills — a SAVED, idempotent codemod that authors each domain's inline skill into its generator (the
// single source), so the capability is derived in the generator.
// It injects `skill: '<skill>'` into the emit() call of every UNIFORM-skill generator (one authored capability per
// file). Mixed-skill files (per-fact skills) and the hand-written trio (Uuidna/Vortex/OneLeap) are out of scope —
// they carry no single file default. Re-runnable: a generator that already carries its skill is skipped.
//
// This is the migration record: run it, then `npm run lean` regenerates the manifests (now {key,name,skill}) and the
// ledger, and the site + MCP derive the skill from there. Nothing here authors a theorem; it authors the axis label.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { HERE } from './api.js'

const SCRIPTS = HERE.replace(/\/dist\//, '/src/') // author into src/

// Each UNIFORM generator → the ONE capability every fact in its file demonstrates. Domain files that skillOf could
// not classify (they fell to 'foundational' by default) get their true domain skill here — authored.
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
  // batch 3 — the remaining DOMAIN files: the domain IS the primary capability every theorem demonstrates, so a
  // file-wide skill is the fresh authoring (skillOf had split them to foundational/involution/etc. by mechanism).
  'lean-navigation.ts': ['Navigation.lean', 'navigation'],
  'lean-acoustics.ts': ['Acoustics.lean', 'acoustics'],
  'lean-audit.ts': ['Audit.lean', 'audit'],
  'lean-biophysics.ts': ['BioPhysics.lean', 'science-pairs'],
  'lean-chemistry.ts': ['Chemistry.lean', 'chemistry'],
  'lean-cipher.ts': ['Cipher.lean', 'cipher'],
  'lean-clay.ts': ['Clay.lean', 'clay-reflection'],
  'lean-coins.ts': ['Coins.lean', 'coins'],
  'lean-command.ts': ['Command.lean', 'command'],
  'lean-divzero.ts': ['DivByZero.lean', 'reflection'],
  'lean-ephemeris.ts': ['Ephemeris.lean', 'ephemeris'],
  'lean-glagolitic.ts': ['Glagolitic.lean', 'glagolitic'],
  'lean-infinity.ts': ['Infinity.lean', 'infinity'],
  'lean-matching.ts': ['Matching.lean', 'matching'],
  'lean-molecular.ts': ['Molecular.lean', 'molecular'],
  'lean-optics.ts': ['Optics.lean', 'optics'],
  'lean-pentagram.ts': ['Pentagram.lean', 'pentagram'],
  'lean-production.ts': ['Production.lean', 'music-production'],
  'lean-quantum.ts': ['Quantum.lean', 'quantum'],
  'lean-relativity.ts': ['Relativity.lean', 'relativity'],
  'lean-typesetting.ts': ['Typesetting.lean', 'typesetting'],
  // batch 4 — Discover is uniform (ℤ/9 group theory), so file-wide vortex. Sequence is genuinely mixed: file-default
  // 'sequence', but its four salt_* facts are overridden to 'crypt-salt' per-fact in lean-sequence.ts directly.
  'lean-discover.ts': ['Discover.lean', 'vortex'],
  'lean-sequence.ts': ['Sequence.lean', 'sequence'],
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
