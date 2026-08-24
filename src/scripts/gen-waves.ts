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

interface Candidate { key: string; why: string; lean: string }
interface Q { pending: Candidate[]; accepted: (Candidate & { receipt: string })[]; refused: (Candidate & { reason: string })[] }

const q = JSON.parse(readFileSync(join(ROOT, 'lean', 'wave-queue.json'), 'utf8')) as Q
const byKey = theoremByKey()

const acceptedRows = q.accepted.map((c) => {
  const t = byKey.get(c.key)
  const seal = t ? `[\`${t.address.slice(0, 8)}\`](/theorem/${c.key})` : 'lifting on the next lean run'
  return `| [\`${c.key}\`](/theorem/${c.key}) | ${seal} | \`${c.receipt.slice(0, 8)}\` |`
}).join('\n')

const pendingRows = q.pending.length
  ? q.pending.map((c) => `| \`${c.key}\` | awaiting the kernel |`).join('\n')
  : '| — the queue is drained — | |'

// refused keys render WITHOUT backticks on purpose: a refusal is not sealed, and the deadkey finder rightly
// refuses any backtick-quoted key the ledger does not hold — an enrollment is named in words, never cited
const refusedRows = q.refused.length
  ? q.refused.map((c) => `- **${c.key.replace(/_/g, ' ')}** (candidate, not sealed) — ${c.reason.split('\n')[0]}`).join('\n')
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
laid as a table; the coordinates that feed it live on [the discovery board](/expose).

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
