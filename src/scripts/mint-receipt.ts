#!/usr/bin/env node
// mint-receipt — ONE act, not two: POST a statement to the live uuidna.com/trials, verify the verdict is signed,
// and append the deposit to trials-receipts.json in the same breath. The manual transcription that audit-legal-gaps
// had to police (a human copying ids between a terminal and a file) no longer exists — the record is written by
// the same call that mints it, and the audit's toUuid recompute stays as the second, independent line on the fix.
// Usage: node dist/scripts/mint-receipt.js "<statement citing a sealed theorem>"
// HONEST SCOPE: the network call is the point — only uuidna.com can sign (env.TRIAL_KEY); everything else here is
// deterministic bookkeeping. An UNVERIFIED verdict is recorded as a refusal to deposit, not silently dropped.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const RECORD = join(ROOT, 'trials-receipts.json')

const statement = process.argv[2]?.trim()
if (!statement) { console.error('✗ mint-receipt — usage: mint-receipt "<statement citing a sealed theorem>"'); process.exit(1) }

const res = await fetch('https://uuidna.com/trials', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ statement }),
})
const trial = (await res.json()) as { id: string; verdict: { verdict: string }; signedBy: string | null }

if (trial.verdict.verdict !== 'VERIFIED') {
  console.error(`✗ mint-receipt — verdict ${trial.verdict.verdict}: the deposit is refused, nothing recorded. Cite a sealed theorem ("proven by theorem <key>") and mint again.`)
  process.exit(1)
}
if (trial.signedBy !== 'uuidna.com') {
  console.error('✗ mint-receipt — the verdict returned UNSIGNED; only a uuidna.com-signed trial is an authoritative deposit. Nothing recorded.')
  process.exit(1)
}

const record = existsSync(RECORD)
  ? JSON.parse(readFileSync(RECORD, 'utf8'))
  : { note: 'signed uuidna.com /trials deposits', signedBy: 'uuidna.com', receipts: [] }
if (!record.receipts.some((r: { id: string }) => r.id === trial.id)) {
  record.receipts.push({ id: trial.id, statement })
  writeFileSync(RECORD, JSON.stringify(record, null, 2) + '\n')
}
console.log(`✓ mint-receipt — ${trial.id} VERIFIED, signed by uuidna.com, recorded in trials-receipts.json (deterministic: re-POST the same statement, the same id returns)`)
