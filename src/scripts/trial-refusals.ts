#!/usr/bin/env node
// trial-refusals — TRIAL EACH REFUSAL WITH BOOKS. Reads lean/leads.json refused[], book-leads.json for corpus
// overlap, writes lean/refusal-trials.json. Optional --books runs mine-books first (network). Desk proposes
// reasoning from public texts; captain seals. Nothing here mints theorem keys or moves refused[] to refuted[].
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT } from './api.js'
import { collideRefusals, type BookLeadInput } from '../refusal-trials.js'

const readJson = <T>(p: string): T | null => {
  try { return JSON.parse(readFileSync(p, 'utf8')) as T } catch { return null }
}

const bookCorpus = (): BookLeadInput[] => {
  const raw = readJson<{ lead?: BookLeadInput[] }>(join(ROOT, 'book-leads.json'))
  return raw?.lead ?? []
}

const main = (): void => {
  const withBooks = process.argv.includes('--books')
  if (withBooks) {
    console.log('trial-refusals — mining book corpus first (mine-books)…')
    const r = spawnSync('node', ['dist/scripts/mine-books.js'], { cwd: ROOT, stdio: 'inherit' })
    if (r.status !== 0) process.exit(r.status ?? 1)
  }

  const leads = readJson<{ refused?: { lead?: string; boundary?: string; note?: string }[] }>(
    join(ROOT, 'lean', 'leads.json'),
  )
  const refused = leads?.refused ?? []
  const corpus = bookCorpus()
  if (!corpus.length && !existsSync(join(ROOT, 'book-leads.json'))) {
    console.log('trial-refusals — no book-leads.json; run with --books or npm run leads:books for corpus overlap')
  }

  const out = collideRefusals(refused, corpus)
  const path = join(ROOT, 'lean', 'refusal-trials.json')
  writeFileSync(path, JSON.stringify(out, null, 1) + '\n')

  console.log(
    `✓ trial-refusals — ${out.refused} refused · ${out.verified} verified · ${out.purged} purged · ` +
      `${out.open} open (${out.lean} lean · ${out.policy} policy) · ${out.collisionPairs} collision pairs · ${out.rounds} round(s)`,
  )
  console.log(`  book corpus: ${corpus.length} leads · receipt ${out.receipt}`)
  console.log(`  written to lean/refusal-trials.json`)
  const witnessed = out.trials.filter((t) => t.witnessKeys.length > 0)
  if (witnessed.length) {
    console.log(`  witness — ${witnessed.length} refusal(s) had sealed evidence the boundary omitted:`)
    for (const t of witnessed) {
      console.log(`    ${t.handle} · ${t.witnessKeys.join(', ')}`)
    }
  }
  for (const t of out.trials.filter((x) => x.disposition === 'open')) {
    const hits = t.bookHits.length ? ` · ${t.bookHits.length} book hit(s)` : ' · no book overlap yet'
    const th = t.theoremTrials.filter((x) => x.verdict !== 'VERIFIED').map((x) => x.key)
    const fail = th.length ? ` · theorem gaps: ${th.join(', ')}` : ''
    console.log(`  open · ${t.handle} — ${t.lead.slice(0, 72)}…${hits}${fail}`)
  }
  for (const t of out.trials.filter((x) => x.disposition === 'purged')) {
    console.log(`  purged · ${t.handle} — ${t.purgeReason}`)
  }
}

if (process.argv[1]?.endsWith('trial-refusals.js')) main()
