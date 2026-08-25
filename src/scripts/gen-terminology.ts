#!/usr/bin/env node
// gen-terminology — THE VOCABULARY, EXTRACTED BACKWARDS FROM THE DEVELOPMENT RECORD.
//
// This repository names a concept the same way every time: an ALL-CAPS phrase opening the sentence that
// introduces it, in a sealed Lean doc comment or a module header — THE COIN LIST IS READ, EXACT AND ENFORCED,
// ONE HOME, THE SINGULARITY IS THE TWO. That convention is not decoration; it is where a term is DEFINED, and
// it means the vocabulary can be read off the artifacts rather than remembered.
//
// BACKWARDS, because the record is a development feed and the newest naming is the one that supersedes. Walking
// from the end, the first place a term is introduced is the definition that stands; earlier appearances are the
// history behind it. Terms are emitted newest-first with the theorem or module that introduced them, so a reader
// arrives at the current meaning before the archaeology.
//
// COMPUTED, NOT AUTHORED. Nothing here is a glossary someone maintains. The terms are found by the shape the
// codebase already uses, counted, and addressed — so a concept named tomorrow appears without an edit here, and
// one that disappears stops being listed.
import { writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { theorems, toUuid } from '../index.js'
import { handleOf } from '../handle.js'
import { ROOT } from './api.js'

/** an ALL-CAPS phrase of two or more words — where this codebase puts a definition. */
const TERM = /\b([A-Z][A-Z0-9'’-]*(?:\s+[A-Z][A-Z0-9'’-]*){1,7})\b/g
const NOISE = new Set(['THE', 'AND', 'NOT', 'BUT', 'FOR', 'ONE', 'TWO', 'ALL', 'NO', 'IS', 'IT', 'A', 'AN', 'OR', 'SO', 'TS', 'JS', 'MCP', 'JSON', 'HTTP', 'URL', 'API', 'CC', 'BY', 'NC', 'ND'])

const clean = (t: string): string => t.trim().replace(/\s+/g, ' ')
const meaningful = (t: string): boolean => {
  const words = t.split(' ')
  return words.length >= 2 && words.some((w) => !NOISE.has(w) && w.length > 2)
}

interface Term { term: string; where: string; kind: 'theorem' | 'module'; handle: string; count: number }

const found = new Map<string, Term>()
const note = (term: string, where: string, kind: 'theorem' | 'module'): void => {
  const t = clean(term)
  if (!meaningful(t)) return
  const prior = found.get(t)
  // BACKWARDS: the walk runs newest-first, so the FIRST sighting is the current definition and later ones only
  // add to the count. A term redefined since is reported at its newest home, not its oldest.
  if (prior) { prior.count++; return }
  found.set(t, { term: t, where, kind, handle: handleOf(toUuid(t)), count: 1 })
}

// the ledger, newest wing first — the sealed doc comments are the definitions the kernel signed alongside
const ledger = [...theorems()].reverse()
for (const t of ledger) for (const m of (t.name ?? '').matchAll(TERM)) note(m[1]!, t.key, 'theorem')

// then the module headers, newest file first by the record rather than by name
let modules: string[] = []
try {
  modules = execSync('git ls-files src/', { encoding: 'utf8' }).trim().split('\n')
    .filter((f) => f.endsWith('.ts') && !f.includes('/tests/'))
} catch { modules = [] }
for (const f of modules.reverse()) {
  let src = ''
  try { src = readFileSync(join(ROOT, f), 'utf8') } catch { continue }
  for (const m of src.slice(0, 4000).matchAll(TERM)) note(m[1]!, f, 'module')
}

const terms = [...found.values()].sort((a, b) => b.count - a.count || a.term.localeCompare(b.term))
const receipt = handleOf(toUuid(terms.map((t) => t.term).join('|')))
writeFileSync(join(ROOT, 'docs', 'public', 'terminology.json'),
  JSON.stringify({ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'uuidna terminology',
    description: 'Extracted backwards from the development record: ALL-CAPS namings in sealed doc comments and module headers, newest definition first.',
    receipt, terms: terms.length,
    definedTerm: terms.map((t) => ({ '@type': 'DefinedTerm', name: t.term, identifier: t.handle, inDefinedTermSet: t.kind, url: t.kind === 'theorem' ? `https://uuidna.com/theorem/${t.where}` : undefined, description: `introduced in ${t.where}` })) }) + '\n')
console.log(`✓ gen-terminology — ${terms.length} terms extracted backwards from ${ledger.length} theorems and ${modules.length} modules (receipt ${receipt})`)
