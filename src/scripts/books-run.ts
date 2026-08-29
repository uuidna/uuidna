#!/usr/bin/env node
// @non-harmonic: fetches public-domain books over the network (via books.ts cache) — NAMED boundary.
//
// books-run — IMPROVE SPEED AND QUALITY BY READING BOOKS.
//
// SPEED: fetchGutenberg hits `.uuidna-books/<id>.json` on warm runs.
// QUALITY: unit-equivalence claims become HEXBIT theorems (compass rose width = UUID_HEXBITS = 32),
// not hashed book_<handle> stubs. extractDecidable alone is the wrong door — books write
// "45 degrees, or four points", and that is what four_points_is_45 already sealed.
//
//   npm run books              → read CORPUS, mint hexbit candidates, deposit search-feed harvest, write books-quality.json
//   npm run books -- --dry     → report only
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fetchGutenberg, stripGutenberg, auditText, extractClaims } from '../books.js'
import { toUuid, merkleGravity, theorems } from '../index.js'
import { handleOf } from '../handle.js'
import { UUID_HEXBITS, HEXBIT_BITS, HEXBIT_STATES, hexbitDoorOf } from '../hexbit/index.js'
import { depositCandidates, type WaveCandidate } from '../wave-deposit.js'
import { searchFeed } from '../search-feed.js'
import { mintLeadsToCandidates } from '../harvest.js'
import { CORPUS } from './mine-books.js'
import { ROOT } from './api.js'
import { probeOf, judge, sample } from './iq-books.js'
import { hexbitCandidatesFromClaims, parsePointsDegrees, pointsDegreesKey } from './hexbit-from-books.js'
import { theoremByKey } from '../theorems/index.js'

const DRY = process.argv.includes('--dry')
const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
const OUT = join(ROOT, 'books-quality.json')

/** Sealed keys whose statements are the hexbit unit (32·4=128, 16 states, captain floor). */
function hexbitSealedKeys(): string[] {
  return theorems()
    .filter((t) =>
      t.file === 'Hexbit.lean' ||
      /hexbit|key_floor_is_one_uuid|handle_string_spans|hexbit_bit_hook|handle_carries_hexbits|captain_theorem|the_page_admits_sixteen|message_cap_is_four_hexbits|four_points_is_45/i.test(t.key))
    .map((t) => t.key)
}

if (process.argv[1] && /books-run\.(js|ts)$/.test(process.argv[1])) {
  console.log(`\nbooks-run — hexbit theorems from books (UUID_HEXBITS=${UUID_HEXBITS}, states=${HEXBIT_STATES})${DRY ? '  [dry]' : ''}\n`)
  const hexKeys = hexbitSealedKeys()
  const books: {
    id: number; title: string; address: string; cached: boolean
    claims: number; unitEq: number; hexbitCandidates: number
    hexbitAlreadySealed: string[]; words: number
  }[] = []
  const candidates: WaveCandidate[] = []
  const seen = new Set<string>()
  const probes: ReturnType<typeof probeOf>[] = []
  const sealed = theoremByKey()

  for (const { id } of CORPUS) {
    const t0 = Date.now()
    try {
      const cachePath = join(ROOT, '.uuidna-books', `${id}.json`)
      const { existsSync } = await import('node:fs')
      const wasCached = existsSync(cachePath)
      const b = await fetchGutenberg(id)
      const audit = auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
      const { work } = stripGutenberg(b.text)
      const body = work || b.text
      const claims = extractClaims(body, 200)
      const unitEq = claims.filter((c) => c.kind === 'unit-equivalence')
      const hexCands = hexbitCandidatesFromClaims(claims, id, b.title)
      for (const c of hexCands) {
        if (seen.has(c.key)) continue
        seen.add(c.key)
        candidates.push(c)
      }
      const already: string[] = []
      for (const c of unitEq) {
        const pd = parsePointsDegrees(c.claim)
        if (!pd) continue
        const key = pointsDegreesKey(pd.points, pd.degrees)
        if (sealed.has(key)) already.push(key)
      }
      const p = probeOf(id, body)
      if (p) probes.push(p)
      books.push({
        id, title: b.title, address: audit.address, cached: wasCached,
        claims: claims.length, unitEq: unitEq.length, hexbitCandidates: hexCands.length,
        hexbitAlreadySealed: [...new Set(already)], words: audit.words,
      })
      const ms = Date.now() - t0
      console.log(`  ${wasCached ? '⚡' : '↓'} ${String(id).padStart(6)}  ${String(ms).padStart(5)}ms  ` +
        `claims ${claims.length} unitEq ${unitEq.length} hex+${hexCands.length} sealed [${already.join(',') || '—'}]  ` +
        `${b.title.slice(0, 32)}`)
    } catch (e) {
      console.error(`  ✗ ${String(id).padStart(6)}  ${(e as Error).message.slice(0, 80)}`)
    }
  }

  const iq = probes.length >= 3 ? judge(probes as NonNullable<ReturnType<typeof probeOf>>[]) : []
  const vacuous = iq.filter((v) => !v.discriminates && v.held === probes.length)
  if (vacuous.length) {
    console.log(`\n  iq — ${vacuous.length} vacuous decoder fact(s) (not hexbit seals):`)
    for (const v of vacuous) console.log(`    · ${v.fact}`)
  }

  const alreadyAll = [...new Set(books.flatMap((b) => b.hexbitAlreadySealed))]
  const harvest = mintLeadsToCandidates(searchFeed().leads.flatMap((l) => (l.harvest ? [l.harvest] : [])))
  for (const c of harvest) {
    if (seen.has(c.key)) continue
    seen.add(c.key)
    candidates.push(c)
  }
  const dryReceipt = toUuid('dry')
  const deposit = DRY
    ? { deposited: [] as string[], refused: [] as { key: string; reason: string }[], pending: 0, receipt: dryReceipt, ...hexbitDoorOf(dryReceipt), honest: 'dry' }
    : depositCandidates(candidates, QUEUE)

  const receipt = merkleGravity([
    ...books.map((b) => b.address),
    ...deposit.deposited.map((k) => toUuid(k)),
    ...alreadyAll.map((k) => toUuid(k)),
    toUuid(`uuid-hexbits:${UUID_HEXBITS}`),
  ])
  const report = {
    why: 'Speed: .uuidna-books/ cache. Quality: unit-equivalence → hexbit theorems (rose width = UUID_HEXBITS), never book_<hash> novels. extractDecidable a+b=c is the wrong door for treatises; four_points_is_45 is the pattern. Desk proposes; wave/kernel disposes.',
    hexbit: { UUID_HEXBITS, HEXBIT_BITS, HEXBIT_STATES, sealedKeys: hexKeys.length },
    books,
    hexbitAlreadySealed: alreadyAll,
    candidates: candidates.map((c) => c.key),
    deposited: deposit.deposited,
    depositRefused: deposit.refused,
    pending: deposit.pending,
    iq: { probes: probes.length, vacuous: vacuous.map((v) => v.fact), nextSample: sample('uuidna:books-run', 8) },
    receipt, ...hexbitDoorOf(receipt),
    dry: DRY,
  }
  writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n')
  console.log(`\n  books ${books.length} · hexbit already sealed [${alreadyAll.join(', ') || '—'}] · new candidates ${candidates.length} · deposited ${deposit.deposited.length}`)
  console.log(`  warm ${books.filter((b) => b.cached).length}/${books.length} · receipt ${handleOf(receipt)}\n`)
}
