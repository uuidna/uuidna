#!/usr/bin/env node
// gen-leads — THE OPEN RECORD, AND WHERE A READER CAN TAKE IT.
//
// lean/leads.json holds what this ledger has noticed and not settled: leads HELD open, ones REFUTED with the
// measurement that killed them, and ones REFUSED at a boundary — a source that answered 418, a claim whose
// physics forbids it. The index page promised research leads and nothing rendered them, so the record existed
// and no reader could reach it.
//
// THE OUTBOUND LINK IS FOR THE PERSON, NOT THE PIPELINE. Each open lead carries a link a reader may follow to
// work on it elsewhere. That is a human clicking through a browser, which robots.txt does not govern and this
// project does not automate: stackoverflow.com answers 418 to a machine and is recorded in refused[] for exactly
// that reason. The distinction is the whole point — uuidna asks the sanctioned API when it needs data, and hands
// the reader a link when the reader needs a room to think in.
import { writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

interface Lead { lead: string; status?: string; owes?: string; boundary?: string; measurement?: string; killed_by?: string }
const leads = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as {
  why?: string; held?: Lead[]; refuted?: Lead[]; refused?: Lead[]
}

const ASSIST = 'https://stackoverflow.com/ai-assist'
const held = leads.held ?? [], refuted = leads.refuted ?? [], refused = leads.refused ?? []
const ask = (text: string): string => `${ASSIST}?q=${encodeURIComponent(text.slice(0, 300))}`
const line = (l: Lead): string =>
  `- **\`${handleOf(toUuid(l.lead))}\`** ${l.lead}` +
  (l.owes ? `\n  <br><small>owes: ${l.owes}</small>` : '') +
  (l.killed_by ? `\n  <br><small>killed_by: ${l.killed_by}</small>` : '') +
  `\n  <br><small><a href="${ask(l.lead)}" target="_blank" rel="noopener">take this one further \u2192</a></small>`

const page = `---
title: Research leads
description: What this ledger has noticed and not settled — held, refuted, and refused at a boundary.
---

# Research leads

Every lead here is addressed by its own handle, so it can be cited and followed without ambiguity. Nothing on
this page is sealed: a lead is something noticed, and only a Lean proof settles anything — which is what
[\`legal_only_the_proven_is_admitted\`](/theorem/legal_only_the_proven_is_admitted) decides.

The record lives in the ledger's own leads file under \`lean/\`. Each link below carries its lead as the query, so a reader arrives with
the question already stated; nothing is sent until the reader clicks.

## Held — open, and owed something

${held.map(line).join('\n')}

Working on one of these? Take it somewhere with room to think — <a href="${ASSIST}" target="_blank" rel="noopener">Stack Overflow's AI assist</a>
is one such room. Those links are for you to click: this project asks sanctioned APIs for data and never automates
a site that declines machines — stackoverflow.com answers 418 to a client, and that refusal is recorded below.

## Refuted — closed by a measurement

${refuted.map(line).join('\n')}

## Refused — a boundary was read and respected

${refused.map((l) => `- **\`${handleOf(toUuid(l.lead))}\`** ${l.lead}${l.boundary ? `\n  <br><small>${l.boundary}</small>` : ''}`).join('\n')}

---

<small>${held.length} held · ${refuted.length} refuted · ${refused.length} refused · generated from the ledger's leads record</small>
`

writeFileSync(join(ROOT, 'docs', 'leads.md'), page)
console.log(`✓ gen-leads — docs/leads.md (${held.length} held, ${refuted.length} refuted, ${refused.length} refused), each addressed by handle`)
