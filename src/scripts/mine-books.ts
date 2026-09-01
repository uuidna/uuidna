#!/usr/bin/env node
// @non-harmonic: fetches public-domain texts over the network via books.ts's named fetch boundary (fetchGutenberg).
// mine-books — THE DESK PROPOSES, THE CAPTAIN DISPOSES. Reads public-domain texts and files every numeric claim
// they STATE as a candidate lead. It seals nothing: a lead is a sentence plus the numbers in it plus the links back
// to where it came from, and a human decides whether any of it earns a theorem. That division is the two-handle law
// the research workflow already states in its own header ("which leads to pursue stays human"), and it is the same
// boundary measured on this ledger: 550 mechanically generated statements were 329 kernel-green and 0 discoveries.
//
// AI-INDEPENDENT BY CONSTRUCTION: a table of number words, two regular expressions and a fold. No model is called
// here or at any point downstream, so the cron runs it unattended and the result is byte-reproducible.
//
// EVERY VALUE LINKS TO ITS OWN COMPUTATION. A lead carries: the claim, the sentence it sits in, the parsed numbers,
// the book's content-address (auditText over the exact bytes fetched), the source URL, and the claim's own address.
// Nothing is a bare number — each one can be walked back to the text that states it.
//
//   npm run x -- mine-books            → mine the declared corpus, write book-leads.json
//   npm run x -- mine-books 45493 10   → mine only these Gutenberg ids
//
// this reports WHAT A TEXT SAYS. It makes no claim that a text is right,
// and none whatever about a text's meaning or authority — for scripture least of all. A claim about the world with
// no decidable test is NOT PROVEN and stays so (untested_stays_unproven), and a shared number is the expected case
// by pigeonhole (gematria_forces_collisions), never evidence of a connection.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fetchGutenberg, extractClaims, extractDecidable, auditText, stripGutenberg } from '../books.js'
import { merkleGravity } from '../index.js'
import { hexbitDoorOf, type HexbitDoor } from '../hexbit/index.js'
import { ROOT } from './api.js'

/** the declared corpus — public-domain texts on Project Gutenberg, by id. Grows by declaration, never by guess. */
export const CORPUS: { id: number; note: string }[] = [
  { id: 10, note: 'King James Bible — the largest measured corpus here; numbers written as words throughout' },
  { id: 2800, note: 'The Koran, Rodwell translation' },
  { id: 216, note: 'Tao Teh King' },
  { id: 2388, note: 'Bhagavad-Gita, Arnold translation' },
  { id: 2017, note: 'Dhammapada' },
  { id: 45493, note: 'Day, On Yacht Sailing (1904) — the text that sealed four_points_is_45' },
]

export interface BookLead extends HexbitDoor {
  claim: string
  kind: string
  numbers: number[]
  units: string[]
  sentence: string
  address: string
  book: { id: number; title: string; authors: string[]; source: string; address: string }
}

if (process.argv[1] && process.argv[1].endsWith('mine-books.js')) {
  const only = process.argv.slice(2).map(Number).filter((n) => Number.isFinite(n))
  const corpus = only.length ? only.map((id) => ({ id, note: 'requested on the command line' })) : CORPUS

  console.log('\nmine-books — the desk proposes, the captain disposes\n')
  const leads: BookLead[] = []
  const books: { id: number; title: string; address: string; claims: number; arithmetic: number }[] = []

  for (const { id } of corpus) {
    try {
      const b = await fetchGutenberg(id)
      // THE ADDRESS IS OF THE FILE, THE CLAIMS ARE OF THE WORK. auditText keeps the WHOLE fetched text so the
      // content-address still fingerprints the exact bytes you hold; the miners read the STRIPPED work, because
      // a Project Gutenberg file wraps the book in a header and a licence footer and legal prose is dense in
      // numbers. Measured on this corpus before the strip: 13 of 194 leads (7%) came from a wrapper that is 0.8%
      // of the words — the Foundation's royalty terms and refund window, filed as claims of Smith and Ricardo,
      // each carrying the book's own address as its provenance.
      const audit = auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
      const { work, stripped } = stripGutenberg(b.text)
      // A WRAPPER THAT COULD NOT BE LOCATED IS NOT A WRAPPER THAT IS ABSENT — say which, by name, or the next
      // reader cannot tell a clean text from an unstripped one.
      if (!stripped) console.log(`    ! ${id} — no Project Gutenberg markers found; mining the file WHOLE, so the wrapper may be included`)
      const claims = extractClaims(work, 500)
      const arithmetic = extractDecidable(work, 100)
      const link = { id, title: b.title, authors: b.authors, source: b.source, address: audit.address }
      for (const c of claims)
        leads.push({ claim: c.claim, kind: c.kind, numbers: c.numbers, units: c.units, sentence: c.sentence, address: c.address, book: link, ...hexbitDoorOf(c.address) })
      books.push({ id, title: b.title, address: audit.address, claims: claims.length, arithmetic: arithmetic.length })
      console.log(`  ✓ ${String(id).padStart(6)}  ${b.title.slice(0, 44).padEnd(44)}  ${String(claims.length).padStart(4)} claims`)
    } catch (e) {
      console.error(`  ✗ ${String(id).padStart(6)}  fetch/parse failed: ${(e as Error).message.slice(0, 60)}`)
    }
  }

  // one receipt over every lead address — order-invariant, so the corpus folds to one value a reader can recheck
  const receipt = merkleGravity(leads.map((l) => l.address))
  const out = {
    why: 'Numeric claims that public-domain texts STATE, filed as CANDIDATE leads for a human to judge. Nothing here is sealed, decided or endorsed: a lead is a sentence, its numbers, and the links back to the book and byte-range that produced it. Mined deterministically (a number-word table and two regexes — no model, no judgement), so the cron reproduces it exactly. What a text says is a textual fact; whether it is TRUE of the world has no decidable test here and stays NOT PROVEN (untested_stays_unproven), and a number shared between texts is the expected case by pigeonhole (gematria_forces_collisions), never evidence of a connection.',
    books, leads: leads.length, receipt, ...hexbitDoorOf(receipt), lead: leads,
  }
  writeFileSync(join(ROOT, 'book-leads.json'), JSON.stringify(out, null, 2) + '\n')
  console.log(`\n  ${leads.length} candidate leads from ${books.length} text(s), folded to ${receipt}`)
  console.log('  written to book-leads.json — every value links back to its book address and source sentence\n')
}
