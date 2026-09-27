#!/usr/bin/env node
// audit-ui-doors — IS THE UI A RESULT OF MCP, OR A SECOND CONSUMER OF THE SAME INTERNALS?
//
// The captain, 2026-09-27: "Ui is result of mcp. No redundancy whatsoever." and "Seo optimised mcp results in seo
// optimised ui." Both are one property: if every page renders a DOOR'S ANSWER, then improving a door — its naming, its
// answer shape, its honest disclaimer, its receipt — improves the page by itself, and there is one contract instead of
// two. If a page reaches past the doors into dist, the door and the page are two renderings wired separately, and a
// door's improvement cannot reach the UI at all, because the UI never asks.
//
// MEASURED 2026-09-27, the day this was written: all 8 VitePress data loaders import dist internals directly —
// theorems(), runTrial, merkleGravity, occupancyCiteTable, pagesByProof, publications, school — and NOT ONE calls
// callTool. So the UI is a second consumer today, and this counts that rather than asserting it.
//
// AND IT DOES NOT GUESS WHICH DOOR SHOULD SERVE A PAGE, because guessing that is how this audit would earn a
// false-precision finding of its own. Twice while measuring by hand, a word search offered a plausible door that served
// something else entirely: `publications` matched compare_publications, which is not the publications list its loader
// needs, and `occupancy` matched nothing at all. A NAME IS NOT A CONTRACT. So each loader is reported with the modules
// it actually reaches, and naming the door that should serve it is left to whoever reads the row: the finding is the
// BYPASS, which is measurable, not the remedy, which is a judgement.
//
// THE COMPUTATION IS ALREADY SHARED, and saying otherwise would overstate the defect: a loader and a door usually call
// the same function, so the arithmetic is not duplicated. What is duplicated is the CONTRACT — the shape, the field
// names, the honest line, the receipt — and that is the half both a reader and a search engine see.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, wrRoot } from '../boundary.js'

const LOADERS = join(ROOT, 'docs', '.vitepress')

interface Row {
  loader: string
  callsDoor: boolean
  /** dist modules the loader reaches past the doors into */
  reaches: string[]
}

const rows: Row[] = []
if (existsSync(LOADERS)) {
  for (const f of readdirSync(LOADERS).filter((x) => x.endsWith('.data.ts')).sort()) {
    const text = readFileSync(join(LOADERS, f), 'utf8')
    const reaches = [...text.matchAll(/from '\.\.\/\.\.\/dist\/([^']+)'/g)].map((m) => m[1]!).sort()
    rows.push({ loader: `docs/.vitepress/${f}`, callsDoor: /callTool/.test(text), reaches })
  }
}

const bypass = rows.filter((r) => !r.callsDoor && r.reaches.length > 0)
// A LOADER THAT READS ONLY A FILE IS NOT A BYPASS. Some read a JSON artefact a generator already wrote, which is the
// drain's own road rather than a reach past a door — counting them would inflate the finding with rows that have nothing
// to migrate, and a finding padded with non-work is how a real one stops being read.
const fileOnly = rows.filter((r) => !r.callsDoor && r.reaches.length === 0)

const leads = bypass.length
  ? [{
    lead: `${bypass.length} of ${rows.length} site data loader(s) reach past the doors into dist rather than rendering a`
      + ` door's answer, so a door's naming, shape, honest line and receipt cannot reach the UI: `
      + bypass.map((r) => `${r.loader.replace('docs/.vitepress/', '')} → ${r.reaches.join(', ')}`).join('; ') + '.',
    status: 'open',
    owes: 'per loader, either the door that serves its data (named, not guessed — a word match is not a contract) or a'
      + ' stated reason the page must compute privately; a door that does not exist yet is work, never an exemption',
  }]
  : []

const out = {
  why: 'Whether each VitePress data loader RENDERS a door\'s answer or reaches past the doors into dist. One contract or'
    + ' two: if the page renders the door, improving the door improves the page by itself. The computation is usually'
    + ' shared already — what is duplicated is the contract, which is the half a reader and a search engine both see.'
    + ' Written by src/scripts/audit-ui-doors.ts on every run, EMPTY INCLUDED: an absent file and an empty set are'
    + ' different facts.',
  loaders: rows.length,
  renderDoor: rows.filter((r) => r.callsDoor).length,
  bypass: bypass.length,
  fileOnly: fileOnly.length,
  rows,
  open: leads.length,
  leads,
}
wrRoot('lean/ui-doors.json', JSON.stringify(out, null, 1) + '\n')

console.log(`audit-ui-doors — ${rows.length} loader(s): ${out.renderDoor} render a door, ${bypass.length} reach past into dist, ${fileOnly.length} read a generated file only`)
for (const r of bypass) console.log(`  ⚙ ${r.loader.replace('docs/.vitepress/', '')} → ${r.reaches.join(', ')}`)
for (const r of fileOnly) console.log(`  · ${r.loader.replace('docs/.vitepress/', '')} — reads a generated artefact, nothing to migrate`)
