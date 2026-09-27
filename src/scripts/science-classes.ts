#!/usr/bin/env node
// science-classes — REPORT THE PRINCIPLES GROUPED INTO CLASSES, each identified by its members.
//
// The classes are computed; their DOMAIN NAMES are not, because the corpus does not carry them. See
// src/science-classes.ts: the physical-sciences class is real and shares no word meaning "physics". The join word is
// printed so the grouping can be checked, never as the domain's name.
//
// The domains are named by the corpus: each wing's own generated header states its subject, and a term's weight is how
// often that wing says it discounted by how many wings say it at all. See src/science-classes.ts for why that removes
// the need for a stopword list and, more importantly, for a hand-written wing-to-science map.
//
// Reports and holds. Nothing is sealed: a class is a way to read the ledger, not a claim inside it.

import { readFileSync } from 'node:fs'
import { theorems } from '../theorems/index.js'
import { scienceClasses, type WingSubject } from '../science-classes.js'

/** the wing's own account of itself: the generated header's prose, with the boilerplate prefix removed */
const subjectOf = (wing: string): string => {
  let head = ''
  try {
    head = readFileSync(new URL(`../../lean/${wing}`, import.meta.url), 'utf8').split('\n')[0] ?? ''
  } catch {
    return ''
  }
  return head
    .replace(/^--\s*lean\/\S+\s*—\s*/u, '')
    .replace(/^GENERATED\.\s*/u, '')
    // the DOI, licence and citation tails are administrative and say nothing about the science
    .replace(/(Prior art|Cite DOI|DOI 10\.|live surface|Every proof).*$/su, '')
}

const principlesByWing = new Map<string, Set<string>>()
for (const t of theorems()) {
  const wing = String(t.file)
  const s = principlesByWing.get(wing) ?? new Set<string>()
  s.add(String(t.principle))
  principlesByWing.set(wing, s)
}

const subjects: WingSubject[] = [...principlesByWing].map(([wing, ps]) => ({
  wing,
  subject: subjectOf(wing),
  principles: [...ps],
}))

const { classes, unclassed } = scienceClasses(subjects)
const placed = new Set(classes.flatMap((c) => c.principles))
const allPrinciples = new Set([...principlesByWing.values()].flatMap((s) => [...s]))

console.log(`wings ${subjects.length} · principles ${allPrinciples.size}`)
console.log(`classes ${classes.length} · principles placed ${placed.size} · wings unplaceable ${unclassed.length}`)
if (unclassed.length > 0) console.log(`UNCLASSED: ${unclassed.slice(0, 12).join(', ')}${unclassed.length > 12 ? ` … +${unclassed.length - 12}` : ''}`)
console.log()
for (const c of classes.slice(0, 20)) {
  console.log(`${String(c.principles.length).padStart(4)} principle(s) · ${c.wings.length} wing(s) · joined on "${c.joinedOn}" (rarity ${c.weight.toFixed(1)})`)
  console.log(`                 ${c.wings.slice(0, 6).join(', ')}${c.wings.length > 6 ? ` … +${c.wings.length - 6}` : ''}`)
}
if (classes.length > 20) console.log(`… and ${classes.length - 20} smaller classes`)
