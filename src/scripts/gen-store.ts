#!/usr/bin/env node
// gen-store — THE ONE STOREFRONT (the captain's order, 2026-08-23: a literal /store unifying apps, games,
// books). The three shelves already serve — /apps (the hexbit-app store, derived from the categories
// registry), /games (sealed play), /books (the reading room) — but a visitor arriving at /store found
// nothing. This binds them into one door: each shelf's OWN page supplies its title and one-line description
// (read from the committed md — the page derives from its registry, so the store derives from the pages, one
// derivation deep, never a hand-typed catalogue), and the apps shelf's instrument count comes straight from
// the categories registry. Derived, not authored: change a shelf and the storefront changes with it.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

const DOCS = join(ROOT, 'docs')

// the three shelves, in reading order: what a learner meets, plays, and reads
const SHELVES: { route: string; file: string; icon: string }[] = [
  { route: '/apps', file: 'apps.md', icon: '🎛' },
  { route: '/games', file: 'games.md', icon: '♟' },
  { route: '/books', file: 'books.md', icon: '📖' },
]

// read a shelf page's H1 title (minus any <Badge>) and its first blockquote line — the shelf's own words
const shelfOf = (file: string): { title: string; blurb: string } => {
  const md = existsSync(join(DOCS, file)) ? readFileSync(join(DOCS, file), 'utf8') : ''
  const h1 = (md.match(/^#\s+(.+)$/m)?.[1] ?? file.replace('.md', '')).replace(/<Badge[^>]*\/?>/g, '').replace(/\s+$/, '')
  const blurb = (md.match(/^>\s+(.+)$/m)?.[1] ?? '').replace(/\s+/g, ' ').trim()
  return { title: h1, blurb }
}

// the apps shelf carries a live count — the instruments across the categories registry (the same source gen-apps reads)
const appsCount = (): number => {
  const CAT = join(ROOT, 'src', 'quantum', 'apps', 'categories')
  if (!existsSync(CAT)) return 0
  return readdirSync(CAT, { withFileTypes: true }).filter((d) => d.isDirectory()).reduce((n, d) => {
    const src = readFileSync(join(CAT, d.name, 'index.ts'), 'utf8')
    return n + [...src.matchAll(/export \{ ([^}]+) \}/g)].flatMap((m) => m[1]!.split(',').map((x) => x.trim()).filter((x) => x && !x.startsWith('type '))).length
  }, 0)
}

const rows = SHELVES.map((s) => {
  const { title, blurb } = shelfOf(s.file)
  const count = s.route === '/apps' ? ` — **${appsCount()}** instruments` : ''
  return `## ${s.icon} [${title}](${s.route})${count}\n\n${blurb || 'A shelf of the store.'}`
}).join('\n\n')

const page = `---
title: The store
description: One storefront — the apps, the games, and the books, each a shelf you can open, play, or read, every one computed in the browser and sealed to the ledger.
---

# The store <Badge type="tip" text="three shelves, one door" />

> Everything the site lets you *do* in one place — instruments to run, games to play, books to read. Each
> shelf below is its own page; this is the door that gathers them. Every item computes where you stand and
> cites the theorem it rests on — nothing here is a demo, and nothing is sold: the coins are contributed, not
> charged ([\`two_coins\`](/theorem/two_coins), [the captain's coins](/captain)).

${rows}

---

Each shelf derives from its own registry, so this storefront is never hand-kept: a new app, game, or book
appears here the moment its shelf lists it. The store is a *view*, not a second catalogue — one derivation
deep, recomputable like every other surface.
`

const { writeFileSync } = await import('node:fs')
writeFileSync(join(DOCS, 'store.md'), page)
console.log(`✓ docs/store.md — the storefront: ${SHELVES.length} shelves (${appsCount()} app instruments), unified at /store`)
