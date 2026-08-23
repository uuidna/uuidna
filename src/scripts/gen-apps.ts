#!/usr/bin/env node
// gen-apps — THE STORE, derived from its own shelves (lead 79 complete: "organise as app store"; the shelves'
// CONTENTS come from the category indexes themselves, never a hand-typed list). Each shelf directory under
// src/quantum/apps/categories is one section; its index.ts's header comment is the shelf's own words and its
// export line names the instruments. The kernel beneath all sixteen — the hexbit player — heads the page. A
// shelf added tomorrow appears by recomputation; a hand-edit to this page is a drift the drain recomputes away.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

const CAT = join(ROOT, 'src', 'quantum', 'apps', 'categories')
const SURFACE: Record<string, string> = { coding: '/tools', books: '/reading-room', practice: '/school', gaming: '/games' }

const shelves = readdirSync(CAT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()
const sections = shelves.map((name) => {
  const src = readFileSync(join(CAT, name, 'index.ts'), 'utf8')
  const blurb = src.split('\n').filter((l) => l.startsWith('//')).map((l) => l.replace(/^\/\/ ?/, '')).join(' ').replace(/\s+/g, ' ').trim()
  const apps = [...src.matchAll(/export \{ ([^}]+) \}/g)].flatMap((m) => m[1]!.split(',').map((x) => x.trim()).filter((x) => !x.startsWith('type ') && x !== ''))
  return `## ${name} — ${apps.length} instruments\n\n${blurb.slice(0, 500)}\n\n\`${apps.join('\` · \`')}\` — live at [${SURFACE[name] ?? '/' + name}](${SURFACE[name] ?? '/' + name})`
}).join('\n\n')

const page = `---
title: The app store
description: Four shelves, sixteen instruments, one kernel — every app pure, browser-computed, asset-free.
---

# The app store <Badge type="tip" text="16 apps · 4 shelves · 1 kernel" />

> Every instrument here obeys one law: a pure function from states to verifiable output — browser-computable,
> Node-testable, asset-free. **Nothing is served that could not be recomputed.** The shelves below derive from
> the registry itself (\`src/quantum/apps/categories/\`); a shelf added tomorrow appears by recomputation.

**The kernel**: the [hexbit player](/referrer-song) — states 0..15 in, the exact-integer A432 lattice out
([\`readings_states_sound_the_lattice\`](/theorem/readings_states_sound_the_lattice)), the address printed so
what you hear is what anyone can recompute. Sixteen states to one glyph; sixteen apps to one store; the fold is
the same fold — and the bar every instrument keeps is the sealed 4032
([\`the_movie_and_the_song_are_one\`](/theorem/the_movie_and_the_song_are_one)). What survives here survived
its denials ([\`denial_drains_to_the_last_coin\`](/theorem/denial_drains_to_the_last_coin)).

**The kernel's second layer** — the same states as motion: type anything below, fold it, and the uuid sings and
moves at once, every layer refolding to one identity (the DVD read whole — lead 94's imprint):

<HexbitAnimator />

${sections}

## Honest scope

A store that sells nothing: every app is free, local, and silent — no telemetry, no accounts, no assets fetched.
The NEXT sets of sixteen are queued (each shelf deepening 4 → 16 until the store is the coin square, 64); the
queue holds them as exact prompts, and a door closes only by the two coins.
`
writeFileSync(join(ROOT, 'docs', 'apps.md'), page)
console.log(`✓ gen-apps — docs/apps.md: ${shelves.length} shelves derived from the registry (${shelves.join(', ')})`)
