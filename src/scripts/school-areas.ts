#!/usr/bin/env node
// school-areas — REPORT THE CAPTAIN'S TWELVE LEARNING AREAS against what this ledger can actually teach.
//
// The taxonomy is the captain's (2026-09-28); every placement is computed from the wing's own generated header. The
// empty areas are the finding: an area no wing reaches is a curriculum this ledger cannot yet teach, and naming those
// is the honest measure of how much of the architecture exists.

import { readFileSync } from 'node:fs'
import { theorems } from '../theorems/index.js'
import { DIMENSIONS, schoolAreas } from '../school-areas.js'

const subjectOf = (wing: string): string => {
  try {
    const head = readFileSync(new URL(`../../lean/${wing}`, import.meta.url), 'utf8').split('\n')[0] ?? ''
    return head
      .replace(/^--\s*lean\/\S+\s*—\s*/u, '')
      .replace(/^GENERATED\.\s*/u, '')
      .replace(/(Prior art|Cite DOI|DOI 10\.|live surface|Every proof).*$/su, '')
  } catch { return '' }
}

const byWing = new Map<string, Set<string>>()
for (const t of theorems()) {
  const w = String(t.file)
  const s = byWing.get(w) ?? new Set<string>()
  s.add(String(t.principle))
  byWing.set(w, s)
}
const rows = [...byWing].map(([wing, ps]) => ({ wing, subject: subjectOf(wing), principles: [...ps] }))
const { census, unplaced, empty } = schoolAreas(rows)

const held = census.filter((c) => c.wings.length > 0)
console.log('THE TWELVE LEARNING AREAS (the captain, 2026-09-28). Candidates only — the corpus never states which')
console.log('science a wing belongs to, so no assignment is made here. See src/school-areas.ts for the three')
console.log('measurements that established that, and window-crossroads for what IS computed: the entanglements.')
console.log()
console.log(`wings ${rows.length} · with a candidate area ${rows.length - unplaced.length} · reached by none ${unplaced.length}`)
console.log(`areas ${census.length} · with candidates ${held.length} · reached by NO wing ${empty.length}`)
console.log()
for (const c of census) {
  const mark = c.wings.length === 0 ? '·' : '✓'
  console.log(`${mark} ${String(c.area.n).padStart(2)}. ${c.area.name}  — ${c.wings.length} wing(s), ${c.principles.length} principle(s)`)
  if (c.wings.length > 0) {
    console.log(`      ${c.wings.slice(0, 10).map((w) => w.replace(/\.lean$/, '')).join(', ')}${c.wings.length > 10 ? ` … +${c.wings.length - 10}` : ''}`)
  } else {
    console.log(`      NO WING REACHES THIS AREA — nothing here can teach: ${c.area.subjects.slice(0, 4).join(', ')} …`)
  }
}
console.log()
console.log(`the four transversal dimensions (assigned to nothing, by design): ${DIMENSIONS.map((d) => d.name).join(' · ')}`)
if (unplaced.length > 0) {
  console.log()
  console.log(`REACHED BY NO AREA (${unplaced.length}) — mostly this ledger's own machinery, which is the correct answer for it:`)
  console.log(`  ${unplaced.slice(0, 16).map((w) => w.replace(/\.lean$/, '')).join(', ')}${unplaced.length > 16 ? ` … +${unplaced.length - 16}` : ''}`)
}
