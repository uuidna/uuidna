#!/usr/bin/env node
// gen-leads — THE OPEN RECORD, AND WHERE A READER CAN TAKE IT.
//
// lean/leads.json holds what this ledger has noticed and not settled: leads IN TRIAL, ones REFUTED with the
// measurement that killed them. There is no refused list: Lean decides, and a
// hand-written boundary is not a verdict (2026-09-14). The index page promised research leads and nothing rendered them, so the record existed
// and no reader could reach it.
//
// THE OUTBOUND LINK IS FOR THE PERSON, NOT THE PIPELINE. Each open lead carries a link a reader may follow to
// work on it elsewhere. That is a human clicking through a browser, which robots.txt does not govern and this
// project does not automate: stackoverflow.com answers 418 to a machine and so
// uuidna reads it through api.stackexchange.com. The distinction is the whole point — uuidna asks the sanctioned API when it needs data, and hands
// the reader a link when the reader needs a room to think in.
import { writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { reopenedBecause, courtSettlements, type Settlement } from './trial-refusals.js'

interface Lead { lead: string; status?: string; owes?: string; measurement?: string; killed_by?: string }
const leads = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as {
  why?: string; trial?: Lead[]; refuted?: Lead[]
}

// A REFUTATION STANDS ONLY WHILE ITS EVIDENCE RECOMPUTES \u2014 the court decides it on every run (trial-refusals.ts,
// settlementOf) and this page reads the court's record. A refuted lead whose settlement does not stand is shown as
// REOPENED: its settlement stays word for word as what was claimed, beside what it owes. No one withdraws a settlement
// (the captain, 2026-09-14: "noone can withdraw. only can prove what they meant"). With no court record, every
// refutation reads as reopened \u2014 none escapes by default.
const settlementAt = courtSettlements()

const ASSIST = 'https://stackoverflow.com/ai-assist'
const inTrial = leads.trial ?? []
const refutedAll = (leads.refuted ?? []).map((l, i) => ({ l, s: settlementAt(i) }))
const refuted = refutedAll.filter((r) => r.s?.stands === true).map((r) => r.l)
const reopened = refutedAll.filter((r) => r.s?.stands !== true)
const ask = (text: string): string => `${ASSIST}?q=${encodeURIComponent(text.slice(0, 300))}`
const further = (l: Lead): string => `\n  <br><small><a href="${ask(l.lead)}" target="_blank" rel="noopener">take this one further \u2192</a></small>`
const line = (l: Lead): string =>
  `- **\`${handleOf(toUuid(l.lead))}\`** ${l.lead}` +
  (l.owes ? `\n  <br><small>owes: ${l.owes}</small>` : '') +
  (l.killed_by ? `\n  <br><small>killed_by: ${l.killed_by}</small>` : '') +
  further(l)
const reopenedLine = ({ l, s }: { l: Lead; s: Settlement | null }): string =>
  `- **\`${handleOf(toUuid(l.lead))}\`** ${l.lead}` +
  (l.killed_by ? `\n  <br><small>claimed: <q>${l.killed_by}</q></small>` : '') +
  `\n  <br><small>owes: the sealed theorem that proves what this settlement meant \u2014 ${s ? reopenedBecause(s) : 'the court has not tried it yet'}</small>` +
  further(l)

const page = `---
title: Research leads
description: What this ledger has noticed and not settled — in trial, and refuted by a measurement.
---

# Research leads

Every lead here is addressed by its own handle, so it can be cited and followed without ambiguity. Nothing on
this page is sealed: a lead is something noticed, and only a Lean proof settles anything — which is what
[\`legal_only_the_proven_is_admitted\`](/theorem/legal_only_the_proven_is_admitted) decides.

The record lives in the ledger's own leads file under \`lean/\`. Each link below carries its lead as the query, so a reader arrives with
the question already stated; nothing is sent until the reader clicks.

## In trial — open, and owed a proof

${inTrial.map(line).join('\n')}

Working on one of these? Take it somewhere with room to think — <a href="${ASSIST}" target="_blank" rel="noopener">Stack Overflow's AI assist</a>
is one such room. Those links are for you to click; the data this project reads from Stack Exchange comes through
its API, api.stackexchange.com, the door it opened for programs.

## Reopened — a settlement that does not recompute

A refutation stands only when it involutes inside Lean: the lead's own claim is stated as a proposition named for its
handle, and the kernel proves its negation under the involution key named for the same handle. No reading of a theorem
settles a lead. These have no such pair yet, so they are open again. What was claimed stays word for word; no
one withdraws it, and only a sealed theorem that proves what it meant closes the lead.

${reopened.map(reopenedLine).join('\n')}

## Refuted — closed by a measurement that still recomputes

${refuted.map(line).join('\n')}

---

<small>${inTrial.length} in trial · ${reopened.length} reopened · ${refuted.length} refuted · generated from the ledger's leads record and the court's trial record</small>
`

writeFileSync(join(ROOT, 'docs', 'leads.md'), page)
console.log(`✓ gen-leads — docs/leads.md (${inTrial.length} in trial, ${reopened.length} reopened, ${refuted.length} refuted), each addressed by handle`)
