#!/usr/bin/env node
// gen-apis — THE PUBLIC API CATALOG, DRAINED FROM publicApiRegistry().
//
// There is no hand-typed /apis page. This generator is the one writer of docs/apis.md: every named public door
// the repo fetches or serves, grouped by kind, with its hexbit door. computeSidebar() picks up the page from
// the live tree. Regenerated with the rest of the generate manifest.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { publicApiRegistry, hexbitDoorOf, type PublicApiEntry } from '../index.js'
import { ROOT } from './api.js'

const reg = publicApiRegistry()
const door = hexbitDoorOf(reg.receipt)

const cell = (s: string): string => s.replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;')).replace(/\|/g, '\\|')

const table = (rows: PublicApiEntry[]): string => {
  if (!rows.length) return '_none._'
  const body = rows.map((r) =>
    `| \`${cell(r.id)}\` | ${cell(r.host)} | ${r.kind} | ${r.access} | ${r.direction} | ${r.sweep ? 'yes' : 'no'} | ${r.heartbeat ? 'yes' : 'no'} |`)
  return ['| id | host | kind | access | direction | sweep | heartbeat |', '| --- | --- | --- | --- | --- | --- | --- |', ...body].join('\n')
}

const md = `---
title: Public APIs
aside: true
outline: [2, 3]
---

# Public APIs <Badge type="tip" text="${reg.count} doors" />

<!-- GENERATED from publicApiRegistry() by scripts/gen-apis — DO NOT EDIT. -->

Every keyless public door this repository names, probes, or sweeps — one catalog, one order-invariant receipt
([\`handle_capacity_is_quantum_by_architecture\`](/theorem/handle_capacity_is_quantum_by_architecture),
[\`two_coins\`](/theorem/two_coins)). Empty \`uuidna_api_mint\` serves the same object at the edge. A host that is
fetched under \`src/\` and is not here is a gap the tests name.

**${reg.count} APIs** · sweep ${reg.sweepCount} · door [\`${door.handle}\`](${door.door}) · receipt \`${reg.receipt}\`

${reg.honest}

## Research sweep

${table(reg.research)}

## EU education

${table(reg.euEducation)}

## Weather

${table(reg.weather)}

## News

${table(reg.news)}

## Other

${table(reg.other)}

Cite handle \`${door.door}\`.
`

writeFileSync(join(ROOT, 'docs', 'apis.md'), md)
console.log(`✓ gen-apis — docs/apis.md: ${reg.count} doors, receipt ${reg.receipt}`)
