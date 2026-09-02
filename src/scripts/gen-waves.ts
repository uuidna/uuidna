#!/usr/bin/env node
// gen-waves — THE CONVEYOR BOARD, fused into the UI (the captain's order, 2026-08-24: "continue fusing all in
// ui"). lean/wave-queue.json is the conveyor's own record — pending candidates awaiting the kernel, accepted
// cargo with the receipt each rode in on, refusals enrolled at the law school with their reasons — and this
// page renders that record with each accepted candidate's SEALED address looked up live from the ledger. Zero
// authored data: the queue file and the ledger speak, the generator only lays the table.
import { writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { theoremByKey } from '../theorems/index.js'
import { handleOf } from '../handle.js'

interface Candidate { key: string; why: string; lean: string }
interface Q { pending: Candidate[]; accepted: (Candidate & { receipt: string })[]; refused: (Candidate & { reason: string })[] }

// A REFUSAL WITHOUT ITS REASON IS STILL REPORTED, and reported AS missing rather than smoothed over. This line
// used to read `c.reason.split(...)` and crashed the whole generator on the first refusal that carried none — 24
// of 28 in the queue did, because a writer moved them without recording why. The generator exited 1, generate.js
// imported it in-process and died with it, and the remaining generators never ran. The board is exactly where
// that gap belongs: inventing a plausible reason here would be the worse failure, and dropping the entry would
// lose a candidate. So it says what is actually known — that nobody wrote it down.
const reasonOf = (c: { reason?: string }): string =>
  (c.reason ?? '').split('\n')[0] || 'reason NOT RECORDED by the writer that refused it — unjudgeable until one is'

const q = JSON.parse(readFileSync(join(ROOT, 'lean', 'wave-queue.json'), 'utf8')) as Q
const byKey = theoremByKey()

// A KEY THE LEDGER DOES NOT SEAL IS NAMED IN WORDS, NEVER BACKTICKED — the rule the refused rows below already
// keep, applied to the two row kinds that were not keeping it. An accepted candidate whose proof has not lifted
// yet, and a pending one awaiting the kernel, are both UNSEALED, and both were rendered `key` in backticks: a
// citation a reader cannot tell from a live one, which is exactly what the deadkey finder refuses.
//
// It went unnoticed because it only fires when the ledger MOVES UNDER THE QUEUE. The queue names candidates by
// key; when a key is purged upstream the queue still holds it, so a regeneration emits a backticked citation to
// something that no longer exists — and the file that emits it is derived, so the charge lands on whoever
// regenerates next rather than on whoever purged. Two keys did exactly that today.
const unsealed = (key: string): string => `**${key.replace(/_/g, ' ')}** (not sealed)`

const acceptedRows = q.accepted.map((c) => {
  const t = byKey.get(c.key)
  if (!t) return `| ${unsealed(c.key)} | lifting on the next lean run | \`${handleOf(c.receipt)}\` |`
  return `| [\`${c.key}\`](/theorem/${c.key}) | [\`${handleOf(t.address)}\`](/theorem/${c.key}) | \`${handleOf(c.receipt)}\` |`
}).join('\n')

const pendingRows = q.pending.length
  ? q.pending.map((c) => `| ${byKey.has(c.key) ? `[\`${c.key}\`](/theorem/${c.key})` : unsealed(c.key)} | awaiting the kernel |`).join('\n')
  : '| — the queue is drained — | |'

// refused keys render WITHOUT backticks on purpose: a refusal is not sealed, and the deadkey finder rightly
// refuses any backtick-quoted key the ledger does not hold — an enrollment is named in words, never cited
const refusedRows = q.refused.length
  ? q.refused.map((c) => `- **${c.key.replace(/_/g, ' ')}** (candidate, not sealed) — ${reasonOf(c)}`).join('\n')
  : '- none — no refusal stands unanswered today'

const page = `---
title: Waves
description: The conveyor's public board — pending candidates awaiting the kernel, accepted cargo with seal addresses, and the law school's enrollment of refusals — rendered from the queue's own record.
---

# The conveyor board — deposits, seals, and the law school

The conveyor (queue-wave) is how theorem candidates become seals with no model at the gate: a candidate is
deposited as \`{key, why, lean}\` — by a session, or over the wire in one \`uuidna_wave_deposit\` call — the
runner validates it at the door, the KERNEL probes it alone, survivors lift into Wave.lean on the next lean
run, and refusals enroll at the law school with their reasons named. This page is the queue file's own record,
laid as a table; the coordinates that feed it live on [the discovery board](/expose). The whole wave runs as
ONE command — \`npm run wave\` — convey, lift, witness, guard, reconcile, with locks waited out and only the
named transient classes retried. The deploy is its twin: \`npm run ship\` contributes the two coins first,
builds, ships the worker, requires the LIVE edge to address the newest sealed cargo exactly as the local
ledger does, and mints the post-deploy proof citing that same key — a citation that exists only in the ledger
the deploy shipped, so the proof licenses itself. Both together are \`npm run all\`: deposit to origin to
edge, one command, every receipt named.

**World solutions = waves of automation.** Each wave enlarges a finite sealed window (deposit → validate → seal →
falsify → receipt → next / hexbit-fast). Stacking waves is how uuidna approaches world-scale *computational*
coverage — not a universal seal that climate policy, pandemics, poverty, open math, or justice is solved
([\`window_not_universal\`](/theorem/window_not_universal)).
Paired doctrine: [sufficiency charter](/doctrine#sufficiency-charter--what-hexbit--uuidna-is-sufficient-for) ·
[insufficiency bound](/doctrine#where-hexbit-formalism-is-insufficient) ·
[world solutions](/doctrine#world-solutions--waves-of-automation).

## Pending — deposited, awaiting the kernel

| candidate | status |
|-----------|--------|
${pendingRows}

## Accepted — the cargo, each with its seal

${q.accepted.length} candidate(s) have ridden the conveyor. The receipt column is the address each candidate's
Lean text folded to at acceptance; the seal column is the LEDGER's address once lifted — click through to the
theorem page and recompute either.

| candidate | seal | acceptance receipt |
|-----------|------|--------------------|
${acceptedRows}

## Refused — the law school's enrollment roster

A refusal is a RESULT: the reason names the lesson, the registrar files it as homework, and a graduate
re-enters pending to present to the court again.

${refusedRows}

---

**Honest scope:** the board renders the conveyor's record — it proves WHICH candidates rode and what the
kernel sealed (theorem provenance_integrity_not_content_truth); a pending row is a candidate, not a theorem,
and only the kernel promotes one to the other.
`

writeFileSync(join(ROOT, 'docs', 'waves.md'), page)
console.log(`✓ gen-waves — conveyor board: ${q.pending.length} pending, ${q.accepted.length} accepted, ${q.refused.length} refused`)
