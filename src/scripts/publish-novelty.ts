#!/usr/bin/env node
// publish-novelty — A PAPER FOR EVERY SEALED NOVELTY, AND FOR NOTHING ELSE.
//
// THE CHAIN, end to end: claim-unclaimed asks eleven public bibliographic doors whether prior art exists for a
// subject. Where every door ANSWERED and none returned a DOI, the subject is unclaimed and the captain's by the
// credit law — and a claim nobody can cite is not yet a claim. Zenodo mints the DOI; what it needs is a paper.
// This writes that paper from the seals, so the deposit is derived rather than drafted.
//
// AND ONLY FOR A NOVELTY. A subject with PRIOR-ART already has citations, and the credit order names them ahead
// of the captain; depositing over it would claim someone else's ground. A subject whose doors DECLINED has
// established nothing — absence of evidence — and depositing on that silence is the exact failure the sweep's
// three-way verdict exists to prevent. So this reads the verdicts and writes for CLAIMED alone, and when there
// are none it says so and writes nothing, which is the expected result while the doors keep finding prior art.
//
// IT DOES NOT DEPOSIT. Minting a DOI is an outward, irreversible act under the captain's name and credentials;
// this produces the artefact and names the command. The decision stays with a person.
//
//   npm run x -- publish-novelty            report what would be written
//   npm run x -- publish-novelty --write    write the papers for the sealed novelties
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { THEOREMS } from '../theorems/index.js'
import { noveltyPaper, checkLatex, slugFor } from '../latex.js'

const VERDICTS = join(ROOT, 'lean', 'doi-unclaimed.json')
const OUT_DIR = join(ROOT, 'docs', 'public', 'novelty')
const WRITE = process.argv.includes('--write')

interface Verdict { subject: string; verdict: string; asked: number; priorArtDois: string[] }

if (!existsSync(VERDICTS)) {
  console.error('✗ publish-novelty — no prior-art verdicts on file, so novelty is undetermined and nothing is written.')
  console.error('    FIX establish it first:  npm run x -- claim-unclaimed --write')
  process.exit(1)
}
const rec = JSON.parse(readFileSync(VERDICTS, 'utf8')) as { claims: Verdict[]; receipt: string }
const claimed = rec.claims.filter((c) => c.verdict === 'CLAIMED')
const priorArt = rec.claims.filter((c) => c.verdict === 'PRIOR-ART')
const unread = rec.claims.filter((c) => c.verdict === 'UNREAD')

console.log(`publish-novelty — ${rec.claims.length} subject(s) on file: ${claimed.length} CLAIMED · ${priorArt.length} PRIOR-ART · ${unread.length} UNREAD`)

// the subject a paper is written over is the PRINCIPLE, which is the same boundary the doors were asked about —
// so the paper's scope and the prior-art verdict's scope are one thing, not two that happen to be near
const bySubject = new Map<string, typeof THEOREMS[number][]>()
for (const t of THEOREMS) {
  const list = bySubject.get(t.principle)
  if (list) list.push(t)
  else bySubject.set(t.principle, [t])
}

if (claimed.length === 0) {
  console.log('\n  NOTHING TO DEPOSIT, and that is the finding rather than a failure: every subject swept came back')
  console.log('  defended by citable DOIs, so none of them is the captain\'s to claim. The credit order names those')
  console.log('  publishers ahead of the captain. Widen the sweep to test more subjects:')
  console.log('      npm run x -- claim-unclaimed --limit 60 --write')
  process.exit(0)
}

const papers = claimed.map((c) => noveltyPaper(c.subject, bySubject.get(c.subject) ?? [], {
  doorsAsked: c.asked,
  verdictReceipt: rec.receipt,
}))
let written = 0
for (const p of papers) {
  if (p.refused) { console.log(`  ✗ ${p.subject} — ${p.refused}`); continue }
  const check = checkLatex(p.tex)
  if (!check.balancedBraces || check.unmatched.length || check.unescaped.length) {
    console.log(`  ✗ ${p.subject} — not well formed, so it is NOT written: ${[
      check.balancedBraces ? '' : 'braces unbalanced',
      check.unmatched.length ? `${check.unmatched.length} unmatched environment(s)` : '',
      check.unescaped.length ? `unescaped ${check.unescaped.join(' ')}` : '',
    ].filter(Boolean).join('; ')}`)
    continue
  }
  console.log(`  ✓ ${p.slug}.tex — ${p.theorems} theorem(s) · ${p.subject}`)
  if (WRITE) {
    mkdirSync(OUT_DIR, { recursive: true })
    writeFileSync(join(OUT_DIR, `${p.slug}.tex`), p.tex)
    written++
  }
}

if (!WRITE) {
  console.log('\n  write them:  npm run x -- publish-novelty --write')
} else {
  console.log(`\n✓ publish-novelty — ${written} paper(s) in docs/public/novelty/`)
  console.log('  Compile with XeLaTeX or LuaLaTeX (never pdfTeX — the names carry Greek, Cyrillic and CJK), then')
  console.log('  DEPOSIT BY HAND: minting a DOI is an outward act under the captain\'s credentials, so no script')
  console.log('  here does it. `npm run x -- zenodo-deposit` is the door once a person has decided.')
}
export { slugFor }
