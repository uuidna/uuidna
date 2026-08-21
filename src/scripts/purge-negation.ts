#!/usr/bin/env node
// scripts/purge-negation — THE TRAILING-NEGATION PURGE. The lean form says a claim CONFIRMS: it states what IS and
// cites the seal. A clause that defines and then appends what it is not — "X is A" — carries its evidence in
// the second half, where no proof lives. This purges that shape from the SOURCE layer (the files a human edits), so
// the generated layer carries the confirmation when it is regenerated.
//
// THE TRANSFORM IS TRUNCATION, and truncation is the whole argument: if the positive head defines the thing, the
// trailing clause was decoration; if it does not, the head was incomplete and the site is REPORTED for authoring
// rather than silently cut. Run with --apply to write; the default is a dry run that changes nothing.
//
// SCOPE: src/**/*.ts, source of truth. The generated copies (lean/*.lean, docs/**, packages/**, src/theorems,
// src/seeds, src/chunks) regenerate from here through scripts/generate. Integrity.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, extname, relative } from 'node:path'
import { ROOT } from './api.js'

const APPLY = process.argv.includes('--apply')
// the shape: a comma, then never/not/NOT, then the clause it introduces, running to the next hard stop
const SHAPE = /,\s+(?:never|not|NEVER|NOT)\s+([^.;—|'"`\n]*)/g
const SKIP = new Set(['node_modules', '.git', 'dist', '.vitepress', 'coverage', 'seeds', 'chunks', 'theorems'])
const files: string[] = []
const walk = (d: string): void => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue
    const p = join(d, e.name)
    if (e.isDirectory()) walk(p); else if (extname(e.name) === '.ts') files.push(p)
  }
}
walk(join(ROOT, 'src'))

// a head is COMPLETE when something survives before the comma that still reads as a statement: at least three words.
const headComplete = (before: string): boolean => before.trim().split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).length >= 3
let cut = 0, reported = 0, touched = 0
const incomplete: Array<{ surface: string; line: number; text: string }> = []
for (const f of files) {
  const rel = relative(ROOT, f)
  const lines = readFileSync(f, 'utf8').split('\n')
  let changed = false
  for (let i = 0; i < lines.length; i++) {
    const before = lines[i]!
    const after = before.replace(SHAPE, (m, _c, off: number) => {
      const head = before.slice(0, typeof off === 'number' ? off : 0)
      if (headComplete(head)) { cut++; return '' }
      reported++; incomplete.push({ surface: rel, line: i + 1, text: before.trim().slice(0, 110) }); return m
    })
    if (after !== before) { lines[i] = after; changed = true }
  }
  if (changed) { touched++; if (APPLY) writeFileSync(f, lines.join('\n')) }
}
console.log(`  THE TRAILING-NEGATION PURGE — ${APPLY ? 'APPLIED' : 'DRY RUN (pass --apply to write)'}`)
console.log(`    surfaces   : ${files.length} source files (src/**/*.ts)`)
console.log(`    truncated  : ${cut} clause(s) whose positive head already defines the thing`)
console.log(`    files      : ${touched} rewritten`)
console.log(`    to author  : ${reported} site(s) where the head is too thin to stand alone — these need a positive statement`)
for (const r of incomplete.slice(0, 12)) console.log(`      • ${r.surface}:${r.line}  ${r.text}`)
if (incomplete.length > 12) console.log(`      … and ${incomplete.length - 12} more`)
