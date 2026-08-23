#!/usr/bin/env node
// @non-harmonic: reads a captions file from disk and rides a network-fetching tool — NAMED boundary (CLI host).
// audit-video — the video-audit chain as ONE command, dispatched through the MCP surface (callTool), never
// hand-driven: oEmbed metadata fingerprint + caption detail audit + the one order-invariant receipt.
//
//   npm run x -- audit-video <url-or-id> [captions-file] [--delimiter <s>]
//
// The captions file is optional: without it the tool fingerprints the posted metadata only. With it, every
// caption line is adjudicated by the controls-first instrument (uuidna_audit_details' grammar), and the summary
// printed here is the COUNTS + RECEIPT — the full per-detail verdicts stay in the JSON written beside the input
// (<captions-file>.audit.json), so the terminal shows the ledger line and the disk keeps the evidence.
import { readFileSync, writeFileSync } from 'node:fs'
import { callTool } from '../mcp.js'
import type { VideoAudit } from '../index.js'

const [url, captionsFile, ...flags] = process.argv.slice(2)
if (!url) {
  console.error('audit-video — usage: npm run x -- audit-video <url-or-id> [captions-file] [--delimiter <s>]')
  process.exit(1)
}
const di = flags.indexOf('--delimiter')
const delimiter = di >= 0 ? flags[di + 1] : undefined

const args: Record<string, unknown> = { url }
if (captionsFile) args.captions = readFileSync(captionsFile, 'utf8')
if (delimiter !== undefined) args.delimiter = delimiter

const a = (await callTool('uuidna_audit_video', args)) as VideoAudit
console.log(`title:    ${a.title}`)
console.log(`author:   ${a.author} (${a.authorUrl})`)
console.log(`videoId:  ${a.videoId}`)
console.log(`address:  ${a.address}   (posted-metadata fingerprint)`)
if (a.captions) {
  const c = a.captions
  console.log(`captions: ${c.details} details, dropped ${c.dropped}, outcome ${c.outcome}`)
  console.log(`verdicts: verified ${c.counts.verified} · refuted ${c.counts.refuted} · unverified ${c.counts.unverified} · drained ${c.counts.drained}`)
  console.log(`text:     ${c.address}`)
  console.log(`receipt:  ${c.receipt}`)
  const out = `${captionsFile}.audit.json`
  writeFileSync(out, JSON.stringify(a, null, 1))
  console.log(`evidence: ${out}`)
} else {
  console.log('captions: none supplied — metadata fingerprint only (pass a captions file to adjudicate every detail)')
}
console.log(`honest:   ${a.honest}`)
