#!/usr/bin/env node
// gen-unlocks — AUTOMATE THE UNLOCK BOARD from theorems().
// Writes lean/unlocks.json + docs/unlocks.md; injects home fragment; refuses missing illustrations.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { unlockBoard, unlockHomeFragment, UNLOCK_LAW } from '../unlocks.js'

const board = unlockBoard()
if (!board.illustrationsAllPresent) {
  console.error('✗ gen-unlocks — illustration keys missing from the ledger (automation refuses a hollow board):')
  for (const k of board.missingIllustrations) console.error('  ', k)
  process.exit(1)
}

const jsonPath = join(ROOT, 'lean', 'unlocks.json')
writeFileSync(jsonPath, JSON.stringify({
  law: board.law,
  keys: board.keys,
  distinct: board.distinct,
  skills: board.skills,
  files: board.files,
  bySkill: board.bySkill,
  byFile: board.byFile.slice(0, 40),
  illustrations: board.illustrations,
  receipt: board.receipt,
  honest: board.honest,
}, null, 1) + '\n')

const topSkills = board.bySkill.slice(0, 20)
  .map((s) => `| \`${s.name}\` | ${s.n} |`)
  .join('\n')
const topFiles = board.byFile.slice(0, 20)
  .map((f) => `| [\`${f.name}\`](/lean/${f.name}) | ${f.n} |`)
  .join('\n')
const illus = board.illustrations
  .map((i) => `| [\`${i.key}\`](/theorem/${i.key}) | ${i.label} | ${i.present ? 'UNLOCKED' : 'MISSING'} |`)
  .join('\n')

const md = `---
title: Unlocks
description: Each sealed by-decide theorem unlocks what it states — automated census from the ledger.
---

# Unlocks — each theorem unlocks

> ${UNLOCK_LAW}

**Board (computed).** ${board.distinct.toLocaleString('en-US')} distinct theorems · ${board.keys.toLocaleString('en-US')} keys · ${board.skills} skills · ${board.files} Lean files.

Receipt \`${board.receipt}\` · structured form [lean/unlocks.json](/lean/unlocks.json)

## Illustrations (presence-checked, not a closed set)

| Key | Label | Status |
| --- | --- | --- |
${illus}

## Skills (top 20)

| Skill | Keys |
| --- | ---: |
${topSkills}

## Lean files (top 20)

| File | Keys |
| --- | ---: |
${topFiles}

## Automation

\`npm run build && node dist/scripts/gen-unlocks.js\` — regenerates this page and \`lean/unlocks.json\` from \`theorems()\`. Wired into the one generator. MCP: \`uuidna_unlocks\`.
`

writeFileSync(join(ROOT, 'docs', 'unlocks.md'), md)

const homePath = join(ROOT, 'docs', 'index.md')
if (existsSync(homePath)) {
  const home = readFileSync(homePath, 'utf8')
  const begin = '<!-- unlocks:begin -->'
  const end = '<!-- unlocks:end -->'
  const block = `${begin}\n${unlockHomeFragment()}\n${end}`
  let next: string
  if (home.includes(begin) && home.includes(end)) {
    next = home.replace(new RegExp(`${begin}[\\s\\S]*?${end}`), block)
  } else if (home.includes('**Each theorem unlocks.**') || home.includes('**Unlocked (sealed).**')) {
    next = home.replace(/\*\*Each theorem unlocks\.\*\*[^\n]*\n?|\*\*Unlocked \(sealed\)\.\*\*[^\n]*\n?/, `${block}\n\n`)
  } else {
    // insert before Hexbit-fast if present
    next = home.includes('**Hexbit-fast.**')
      ? home.replace('**Hexbit-fast.**', `${block}\n\n**Hexbit-fast.**`)
      : home.trimEnd() + `\n\n${block}\n`
  }
  writeFileSync(homePath, next)
}

console.log(`✓ gen-unlocks — ${board.keys} keys / ${board.distinct} distinct · ${board.skills} skills · illustrations ${board.illustrations.length}/${board.illustrations.length}`)
console.log(`  → lean/unlocks.json · docs/unlocks.md · docs/index.md fragment · receipt ${board.receipt}`)
