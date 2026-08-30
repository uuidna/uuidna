#!/usr/bin/env node
// trial-book-leads — TRIAL EVERY BOOK LEAD. Reads book-leads.json, writes lean/book-trials.json.
// Optional --books runs mine-books first (network). Remands open doors — never auto-seals.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT } from './api.js'
import { trialAllBookLeads } from '../book-trials.js'
import { type BookLeadInput } from '../refusal-trials.js'

const main = (): void => {
  if (process.argv.includes('--books')) {
    console.log('trial-book-leads — mining book corpus first (mine-books)…')
    const r = spawnSync('node', ['dist/scripts/mine-books.js'], { cwd: ROOT, stdio: 'inherit' })
    if (r.status !== 0) process.exit(r.status ?? 1)
  }

  const path = join(ROOT, 'book-leads.json')
  if (!existsSync(path)) {
    console.error('trial-book-leads — no book-leads.json; run npm run leads:books or --books')
    process.exit(1)
  }

  const raw = JSON.parse(readFileSync(path, 'utf8')) as { lead?: (BookLeadInput & { address?: string })[] }
  const leads = raw.lead ?? []
  const out = trialAllBookLeads(leads)
  const dest = join(ROOT, 'lean', 'book-trials.json')
  writeFileSync(dest, JSON.stringify(out, null, 1) + '\n')

  console.log(
    `✓ trial-book-leads — ${out.count} claims · ${out.verified} verified · ${out.unverified} unverified · receipt ${out.receipt}`,
  )
  console.log(`  written to lean/book-trials.json`)
}

if (process.argv[1]?.endsWith('trial-book-leads.js')) main()
