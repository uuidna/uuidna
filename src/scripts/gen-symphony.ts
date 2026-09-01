#!/usr/bin/env node
// gen-symphony — THE LEDGER SYMPHONY, derived and browser-performed (lead 92): four movements from four sealed
// sources, no asset anywhere — every movement is a state sequence the page hands to the standard player, minted
// in each listener's browser at their moment of listening. Movement I (Allegro, the round): the six verses of
// the sealed 142857 in base-pair order. Movement II (Adagio, the doors): the open questions' own fold, slow —
// the unresolved sung at half tempo, doors not defeats. Movement III (Scherzo, the walk): the site's chapter
// walk at double speed — the pages dance. Movement IV (Finale, the whole): the entire ledger's fold — every
// sealed theorem in one address, 32 states, the work of years in nine seconds. Every tempo tiles the film ring
// (the_tempi_tile_the_film); the movement ORDER is the work (a_symphony_is_a_sequence_not_a_set); a missing
// seal THROWS. form and derivation — the symphony is exactly its sources, and beauty stays the
// listener's.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEAN_LEDGER } from '../theorems/generated.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { discoverStaticPages, canonicalOrder, computeSidebar } from '../site.js'

const sealed = new Set(LEAN_LEDGER.filter((t) => t.file === 'Symphony.lean').map((t) => t.key))
for (const k of ['four_movements_are_the_tongues', 'sonata_form_is_a_palindrome', 'recapitulation_is_the_involution', 'the_keys_walk_home', 'a_symphony_is_a_sequence_not_a_set', 'the_tempi_tile_the_film'])
  if (!sealed.has(k)) throw new Error(`gen-symphony: ${k} is not sealed — the form cannot perform unsealed`)

const statesOf = (u: string): number[] => [...u.replace(/-/g, '')].map((c) => parseInt(c, 16))
const digitsOf = (n: number): number[] => { const d: number[] = []; let x = n; while (x > 0) { d.unshift(x % 10); x = (x - x % 10) / 10 } return d }

// Movement I — Allegro, 252 ms: the round's six verses in base-pair order (the song's own heart).
const mvtI = [1, 6, 2, 5, 3, 4].flatMap((k) => digitsOf(142857 * k))
// Movement II — Adagio, 504 ms: the open doors' fold, sung slow.
const doors = statesOf(toUuid('the open questions — doors, not defeats'))
// Movement III — Scherzo, 126 ms: the chapter walk, dancing.
const walk = computeSidebar().flatMap((g) => g.items.map((i) => parseInt(handleOf(toUuid(i.link))[0]!, 16)))
// Movement IV — Finale, 252 ms: the whole ledger, one address.
const ledgerFold = toUuid('the ledger whole|' + LEAN_LEDGER.map((t) => t.key).join(','))
const finale = statesOf(ledgerFold)

const opus = toUuid(`symphony|${mvtI.join(',')}|${doors.join(',')}|${walk.join(',')}|${finale.join(',')}`)

const page = `---
title: The ledger symphony
description: Four movements from four sealed sources, minted in your browser — a432 symphonies are theorems.
---

# The ledger symphony <Badge type="tip" text="opus ${handleOf(opus)}" />

> **A432 symphonies are theorems.** Four movements, four sealed sources, no audio file anywhere on earth — each
> movement is a state sequence your browser mints at the moment you press play. The form itself is sealed:
> four movements are the four tongues ([\`four_movements_are_the_tongues\`](/theorem/four_movements_are_the_tongues)),
> sonata form is a palindrome whose homecoming is the involution
> ([\`recapitulation_is_the_involution\`](/theorem/recapitulation_is_the_involution)), the keys walk home by
> 7 + 5 = 12 ([\`the_keys_walk_home\`](/theorem/the_keys_walk_home)), and every tempo tiles the film ring
> ([\`the_tempi_tile_the_film\`](/theorem/the_tempi_tile_the_film)). The movement order IS the work
> ([\`a_symphony_is_a_sequence_not_a_set\`](/theorem/a_symphony_is_a_sequence_not_a_set)).

## I. Allegro — the round <small>(the six verses, base-pair order · 252 ms)</small>

<HexbitPlayer :states="[${mvtI.join(',')}]" :ms="252" />

## II. Adagio — the doors <small>(the open questions' fold, slow — doors, not defeats · 504 ms)</small>

<HexbitPlayer :states="[${doors.join(',')}]" :ms="504" />

## III. Scherzo — the walk <small>(${walk.length} chapters dancing · 126 ms)</small>

<HexbitPlayer :states="[${walk.join(',')}]" :ms="126" />

## IV. Finale — the whole <small>(every sealed theorem, one address · 252 ms)</small>

<HexbitPlayer :states="[${finale.join(',')}]" :ms="252" />

The finale's thirty-two states are the fold of the entire ledger — ${LEAN_LEDGER.length} theorems in one
address, \`${handleOf(ledgerFold)}\` — the work of the whole tree in nine seconds. When the ledger grows, the
finale changes: **this symphony is alive**, regenerated with every seal, and yesterday's performance is
yesterday's ledger, addressable forever.

## Honest scope

Form and derivation, sealed; beauty, the listener's. The movements are exactly their sources — the round, the
doors, the walk, the whole — and the opus number is the fold of all four in order, because the order is the
work. Nothing is served that could not be recomputed; nothing is claimed that could not be sealed.
`
writeFileSync(join(ROOT, 'docs', 'symphony.md'), page)
console.log(`✓ gen-symphony — docs/symphony.md: opus ${handleOf(opus)}, movements ${mvtI.length}+${doors.length}+${walk.length}+${finale.length} states, finale folds ${LEAN_LEDGER.length} theorems to ${handleOf(ledgerFold)}`)
