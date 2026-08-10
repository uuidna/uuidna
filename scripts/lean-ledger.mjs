#!/usr/bin/env node
// lean-ledger — LEAN IS THE SINGLE SOURCE OF THEOREMS. This parses every lean/*.lean theorem (organised by
// computing principle) and writes src/theorems/generated.ts — the one derived ledger the package, the MCP tools,
// the trial and the site all consume. No theorem is authored anywhere else: a theorem computes in Lean, or it is
// not a theorem. Names come from the *-manifest.json emitted alongside each proof. Run by `npm run lean`. 0/7.
import { writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEAN_DIR = join(ROOT, 'lean')

// the computing-principle order — the derivation order the whole layer is organised by
export const PRINCIPLE = [
  ['Core.lean', 'The 8×8 core', "the multiplication table of ℤ/9's eight non-zero residues — from these 64 the rest computes"],
  ['Ring.lean', 'The ring ℤ/9', 'the vortex ring: its full multiplication, addition and power tables'],
  ['Rosette.lean', 'The rosette ℤ/7', 'the Pliska group: its full multiplication, addition and power tables'],
  ['Uuidna.lean', 'The vortex algebra', 'units, orbit, involution, gravity, division by zero, light — the foundational facts'],
  ['Vortex.lean', 'Ported from millennium-solutions', 'the honest ℤ/9 & ℤ/7 facts, ported to plain Lean (no Mathlib)'],
  ['Sequence.lean', 'The sequence & reflection group', 'the mirror, AGL(1,ℤ/9)=54, one strip, neighbours, the ± polarities, the crypt salt'],
  ['DivByZero.lean', 'Division by zero', 'the reflection dz(x)=10−x — a finite residue, never infinity'],
  ['BioPhysics.lean', 'Applied structure — the science pairs', 'blood, DNA, sound, chemistry, music, acid-base, heredity, colour — the algebra, demarcated'],
  ['Discover.lean', 'Self-discovered', 'facts derived by function: Lagrange, the unit criterion, idempotents'],
  ['OneLeap.lean', 'One leap', 'the whole vortex proved in a single by decide'],
]

const manifest = {}
for (const f of readdirSync(LEAN_DIR).filter((f) => f.endsWith('-manifest.json'))) for (const e of JSON.parse(readFileSync(join(LEAN_DIR, f), 'utf8'))) manifest[e.key] = e.name

const parseLean = (file) => [...readFileSync(join(LEAN_DIR, file), 'utf8')
  .matchAll(/theorem\s+(\w+)\s*:([\s\S]*?):=\s*by([\s\S]*?)(?=\n(?:--|theorem|def|namespace|end|$))/g)]
  .map((m) => ({ key: m[1], statement: m[2].trim().replace(/\s+/g, ' '), tactic: m[3].trim().replace(/\s+/g, ' '), name: manifest[m[1]] || m[2].trim().replace(/\s+/g, ' ') }))

const allFiles = existsSync(LEAN_DIR) ? readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean')).sort() : []
const ordered = [...PRINCIPLE.map((p) => p[0]).filter((f) => allFiles.includes(f)), ...allFiles.filter((f) => !PRINCIPLE.some((p) => p[0] === f))]
const titleOf = (f) => (PRINCIPLE.find((p) => p[0] === f) || [f, 'lean/' + f])[1]

const ledger = ordered.flatMap((file) => parseLean(file).map((t) => ({ ...t, file, principle: titleOf(file) })))

const body = ledger.map((t) =>
  `  { key: ${JSON.stringify(t.key)}, name: ${JSON.stringify(t.name)}, statement: ${JSON.stringify(t.statement)}, tactic: ${JSON.stringify(t.tactic)}, file: ${JSON.stringify(t.file)}, principle: ${JSON.stringify(t.principle)} },`
).join('\n')

const out = `// src/theorems/generated.ts — GENERATED from lean/*.lean by scripts/lean-ledger.mjs. DO NOT EDIT.
// Lean is the single source of theorems; this is the derived ledger the package, MCP, trial and site consume.
// Every entry corresponds to a theorem verified sorry-free by \`npm run lean\` before this file was written. 0/7.

export interface LeanTheorem { key: string; name: string; statement: string; tactic: string; file: string; principle: string }

/** The ${ledger.length} Lean-proven theorems, in computing-principle order. */
export const LEAN_LEDGER: readonly LeanTheorem[] = [
${body}
]

/** The principles, in derivation order — [file, title, blurb]. */
export const PRINCIPLES: readonly [string, string, string][] = [
${PRINCIPLE.filter((p) => ordered.includes(p[0])).map((p) => `  [${JSON.stringify(p[0])}, ${JSON.stringify(p[1])}, ${JSON.stringify(p[2])}],`).join('\n')}
]
`

writeFileSync(join(ROOT, 'src', 'theorems', 'generated.ts'), out)
console.log('✓ src/theorems/generated.ts — ' + ledger.length + ' Lean theorems (single source), organised by ' + PRINCIPLE.filter((p) => ordered.includes(p[0])).length + ' principles.')
