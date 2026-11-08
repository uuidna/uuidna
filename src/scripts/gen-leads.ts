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
// encodeURIComponent leaves ( and ) as they are, and an unbalanced parenthesis inside a markdown link destination ends
// the link early: a lead quoting `Set(PRINCIPLES.map(p` rendered its "take this one further" as literal brackets around
// an autolink (measured 2026-11-08 on docs/leads.md). Both are encoded, so the destination is one token.
const ask = (text: string): string => `${ASSIST}?q=${encodeURIComponent(text.slice(0, 300)).replace(/\(/g, '%28').replace(/\)/g, '%29')}`
const further = (l: Lead): string => `\n  <br>[take this one further \u2192](${ask(l.lead)})`
const PHYSICS = /quantum\s+(speedup|speed-up|advantage|supremacy)|faster\s+than\s+classical/i
const bound = (text: string): string => PHYSICS.test(text) ? ' ([`n_qubit_dimension`](/theorem/n_qubit_dimension))' : ''
/** DATA IS NOT MARKUP, and this page is compiled as Vue. A lead carries whatever words were deposited, and the
 *  court phrases the involution law with placeholders — def lead_<handle>, theorem involution_<handle> — which the
 *  Vue compiler reads as an ELEMENT and then refuses for want of a closing tag. Measured 2026-09-21: 159 of them in
 *  docs/leads.md failed the site build outright with "Element is missing end tag", so nothing shipped. The angle
 *  brackets this generator writes itself (<br>, <small>, <q>) are markup and stay markup; everything arriving as
 *  data is escaped, because a lead may contain any characters at all and none of them are this page structure.
 *  Backticks and links in a lead still render as the markdown they are.
 *
 *  EMPHASIS DELIMITERS ARE DATA TOO. A settlement quoting `_meta.deposit` opened an <em> inside the <q> this generator
 *  writes, and markdown closed it at the next underscore, in the following line — so the <q> held an element with no
 *  end tag and the Vue compiler refused the page (measured 2026-11-08: one lead, the whole site build). Underscores and
 *  asterisks outside code spans are backslash-escaped, which markdown renders as the characters themselves; inside a
 *  code span a backslash would be literal, so code spans pass through as they are — markdown already keeps their
 *  contents from opening anything. */
const say = (text: string): string => text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .split(/(`[^`]*`)/).map((part, i) => (i % 2 ? part : part.replace(/[_*]/g, '\\$&'))).join('')

const line = (l: Lead): string =>
  `- **\`${handleOf(toUuid(l.lead))}\`** ${say(l.lead)}${bound(l.lead)}` +
  (l.owes ? `\n  <br>_owes:_ ${say(l.owes)}` : '') +
  (l.killed_by ? `\n  <br>_killed by:_ ${say(l.killed_by)}` : '') +
  further(l)
const reopenedLine = ({ l, s }: { l: Lead; s: Settlement | null }): string =>
  `- **\`${handleOf(toUuid(l.lead))}\`** ${say(l.lead)}${bound(l.lead)}` +
  // A REOPENED SETTLEMENT IS QUOTED, NEVER TAUGHT. Its words stay exactly as they were said — nobody withdraws a
  // settlement, they only prove what they meant — but a settlement whose evidence has since left the tree would
  // otherwise have this page teaching paths that no longer exist. <q> marks it as a claim on record, which is what
  // the prose finder reads it as; say() has already escaped the text, so nothing inside can close the tag early.
  (l.killed_by ? `\n  <br>_claimed:_ <q>${say(l.killed_by)}</q>` : '') +
  `\n  <br>_owes:_ the sealed theorem that proves what this settlement meant \u2014 ${s ? say(reopenedBecause(s)) : 'the court has not tried it yet'}` +
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
