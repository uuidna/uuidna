#!/usr/bin/env node
// @non-harmonic: fetches public-domain books over the network (via books.ts cache) — NAMED boundary.
//
// books-run — IMPROVE SPEED AND QUALITY BY READING BOOKS (the captain's order).
//
// SPEED: fetchGutenberg hits `.uuidna-books/<id>.json` on warm runs — mine / link / MCP re-reads do not
// re-pay the network. QUALITY: each corpus book is linked to the sealed ledger; VERIFIED facts not yet
// sealed become wave-queue CANDIDATES (desk proposes, wave/kernel disposes — never auto-admitted).
//
//   npm run books              → read CORPUS, link, deposit novel decides, write books-quality.json
//   npm run books -- --dry     → report only, do not deposit
//
// HONEST SCOPE: decidable Nat arithmetic only (a sliver of each book). Novel ≠ discovery of prior art
// everywhere — one ledger searched is OPEN absence (silence_never_refutes); here we only queue what
// `by decide` already verifies locally. Integrity, not truth.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fetchGutenberg, linkBookFacts, stripGutenberg, auditText, extractClaims, extractDecidable } from '../books.js'
import { toUuid, merkleGravity } from '../index.js'
import { handleOf } from '../handle.js'
import { depositCandidates, type WaveCandidate } from '../wave-deposit.js'
import { CORPUS } from './mine-books.js'
import { ROOT } from './api.js'
import { probeOf, judge, sample } from './iq-books.js'

const DRY = process.argv.includes('--dry')
const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
const OUT = join(ROOT, 'books-quality.json')

/** Unique lawful key from the arithmetic statement — extractDecidable emits `theorem book_fact` for every
 *  fact, which cannot deposit. The handle of the statement is eight hex; prefix `book_` keeps KEY law. */
export function novelToCandidate(lean: string, claim: string, bookId: number, title: string): WaveCandidate | null {
  const m = /^theorem book_fact\s*:\s*(.+?)\s*:=\s*by\s*decide\s*$/.exec(lean.trim())
  if (!m) return null
  const stmt = m[1]!.trim()
  const key = `book_${handleOf(toUuid(stmt))}`
  if (!/^[a-z][a-z0-9_]{3,60}$/.test(key)) return null
  return {
    key,
    lean: `theorem ${key} : ${stmt} := by decide`,
    why: `Public-domain Gutenberg ${bookId} (${title.slice(0, 40)}) states "${claim.slice(0, 72)}"; Nat arithmetic VERIFIED by decide and absent from the sealed ledger — books-run queues it; the kernel seals or refuses.`,
  }
}

if (process.argv[1] && /books-run\.(js|ts)$/.test(process.argv[1])) {
  console.log(`\nbooks-run — read for speed (cache) and quality (novel→wave)${DRY ? '  [dry]' : ''}\n`)
  const books: {
    id: number; title: string; address: string; cached: boolean
    sealed: number; novel: number; refuted: number; words: number
    claims: number; decidable: number
  }[] = []
  const candidates: WaveCandidate[] = []
  const seen = new Set<string>()
  const probes: ReturnType<typeof probeOf>[] = []

  for (const { id, note } of CORPUS) {
    const t0 = Date.now()
    try {
      // Probe cache: a second books-run should report warm hits for speed.
      const cachePath = join(ROOT, '.uuidna-books', `${id}.json`)
      const { existsSync } = await import('node:fs')
      const wasCached = existsSync(cachePath)
      const b = await fetchGutenberg(id)
      const audit = auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
      const { work } = stripGutenberg(b.text)
      const body = work || b.text
      const link = linkBookFacts(body, 200)
      const claims = extractClaims(body, 200)
      const decidable = extractDecidable(body, 200)
      for (const f of link.facts) {
        if (f.status !== 'novel' || f.verdict !== 'VERIFIED') continue
        const c = novelToCandidate(f.lean, f.claim, id, b.title)
        if (!c || seen.has(c.key)) continue
        seen.add(c.key)
        candidates.push(c)
      }
      // Also queue VERIFIED decidables the linker missed (same novel door, unique keys).
      for (const f of decidable) {
        if (f.verdict !== 'VERIFIED') continue
        const c = novelToCandidate(f.lean, f.claim, id, b.title)
        if (!c || seen.has(c.key)) continue
        // Skip if already sealed under another key (linker would have marked sealed-match).
        if (link.facts.some((x) => x.lean === f.lean && x.status === 'sealed-match')) continue
        seen.add(c.key)
        candidates.push(c)
      }
      const p = probeOf(id, body)
      if (p) probes.push(p)
      books.push({
        id, title: b.title, address: audit.address, cached: wasCached,
        sealed: link.sealed, novel: link.novel, refuted: link.refuted, words: audit.words,
        claims: claims.length, decidable: decidable.length,
      })
      const ms = Date.now() - t0
      console.log(`  ${wasCached ? '⚡' : '↓'} ${String(id).padStart(6)}  ${String(ms).padStart(5)}ms  ` +
        `seal ${link.sealed} novel ${link.novel} claims ${claims.length} dec ${decidable.length}  ` +
        `${b.title.slice(0, 36)}  (${note.slice(0, 24)})`)
    } catch (e) {
      console.error(`  ✗ ${String(id).padStart(6)}  ${(e as Error).message.slice(0, 80)}`)
    }
  }

  // QUALITY: decoder facts must discriminate across the corpus (iq-books vacuity law) — report, never seal vacuous ones.
  const iq = probes.length >= 3 ? judge(probes as NonNullable<ReturnType<typeof probeOf>>[]) : []
  const vacuous = iq.filter((v) => !v.discriminates && v.held === probes.length)
  if (vacuous.length) {
    console.log(`\n  iq — ${vacuous.length} vacuous fact(s) hold on every decoded book (not sealable as identity):`)
    for (const v of vacuous) console.log(`    · ${v.fact} (${v.held}/${probes.length})`)
  } else if (iq.length) {
    console.log(`\n  iq — ${iq.length} decoder fact(s) discriminate across ${probes.length} books`)
  }
  // Seeded sample ids (recomputable) — kept in the report so a quiet corpus still documents what would be drawn next.
  const nextSample = sample('uuidna:books-run', 8)

  const deposit = DRY
    ? { deposited: [] as string[], refused: [] as { key: string; reason: string }[], pending: 0, receipt: toUuid('dry'), honest: 'dry — nothing queued' }
    : depositCandidates(candidates, QUEUE)

  const receipt = merkleGravity([
    ...books.map((b) => b.address),
    ...deposit.deposited.map((k) => toUuid(k)),
  ])
  const report = {
    why: 'Speed: Gutenberg editions cache under .uuidna-books/. Quality: VERIFIED novel Nat facts from the declared corpus are deposited to lean/wave-queue.json pending — desk proposes, wave/kernel disposes. Never auto-sealed. Claims/decidable counts and iq discrimination are reported so vacuous decoder facts cannot pretend to identify a book.',
    books,
    candidates: candidates.length,
    deposited: deposit.deposited,
    depositRefused: deposit.refused.length,
    pending: deposit.pending,
    iq: { probes: probes.length, verdicts: iq, vacuous: vacuous.map((v) => v.fact), nextSample },
    receipt,
    dry: DRY,
  }
  writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n')
  console.log(`\n  books ${books.length} · novel candidates ${candidates.length} · deposited ${deposit.deposited.length} · pending ${deposit.pending}`)
  console.log(`  warm hits ${books.filter((b) => b.cached).length}/${books.length} · receipt ${receipt.slice(0, 8)}`)
  console.log(`  written ${OUT}${DRY ? ' (dry)' : ''}\n`)
}
