#!/usr/bin/env node
// @non-harmonic: fetches a book over the network before decoding it — a NAMED boundary, like books.ts.
//
// decode-book — WHAT A BOOK DECIDES. The pure decoder lives in categories/books/structure.ts so the reading
// room can run it with no fetch. This file is the Gutenberg CLI and a re-export for mine-wikisource / iq-books.
import { decode, candidates, type Decoding } from '../quantum/apps/categories/books/structure.js'

export { decode, body, candidates, type Decoding } from '../quantum/apps/categories/books/structure.js'

if (process.argv[1] && /decode-book\.(js|ts)$/.test(process.argv[1])) {
  const id = Number(process.argv[2])
  if (!id) { console.error('decode-book — usage: decode-book.js <gutenberg-id> [--top N]'); process.exit(1) }
  const topArg = process.argv.indexOf('--top')
  const top = topArg > 0 ? Number(process.argv[topArg + 1]) || 12 : 12

  const { fetchGutenberg } = await import('../books.js')
  const fetched = await fetchGutenberg(id) as unknown
  const raw = typeof fetched === 'string' ? fetched : String((fetched as { text?: string }).text ?? '')
  const d: Decoding = decode(raw, top)

  console.log(`decode-book ${id} — address ${d.address}`)
  console.log(`  chars ${d.chars}  words ${d.words}  sentences ${d.sentences}  distinct ${d.distinct}`)
  console.log(`  ranks: ${d.ranks.map((r) => `${r.rank}.${r.word}=${r.count}`).join('  ')}`)
  console.log(`  letters: ${d.letters.slice(0, 8).map((l) => l.letter + l.count).join(' ')}`)
  console.log(`  numerals written as words: ${d.numerals.slice(0, 10).map((n) => `${n.word}(${n.value})×${n.count}`).join('  ') || 'none'}`)
  console.log(`\n  candidate sealable facts:`)
  for (const c of candidates(d)) console.log(`    ${c.holds ? '✓' : '✗'} ${c.shape === 'vacuous-on-corpus' ? '[vacuous] ' : ''}${c.claim}`)
}
