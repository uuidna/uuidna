#!/usr/bin/env node
// audit-legal-gaps — QUANTUM AUTOMATION FOR THE LEGAL SURFACE. The gaps a human counsel would grep for, folded to
// deterministic checks that run in the guard on every edit, forever — manual review replaced by recomputation,
// the same move audit-packages made for package configuration. Milliseconds, no network, no opinion.
//
// What it catches (each learned from a REAL gap found by hand on 2026-08-15):
//   1. LICENSE DRIFT — the LICENSE file, every package.json (root + workspaces), and docs/license.md must all
//      name the SAME license (SPDX CC-BY-NC-ND-4.0). A fork of terms across files is a contradiction in the record.
//   2. README SILENT ON TERMS — npm renders README as the package's face; publishing with no license/attribution
//      notice in it invites exactly the misuse the license forbids.
//   3. CONTRIBUTING SILENT ON INBOUND TERMS — accepting outside contributions without stating what license they
//      arrive under makes the ND/NC status of the whole murky. The word "license" must appear.
//   4. "OPEN-SOURCE" OVERCLAIM — CC BY-NC-ND is NOT an OSI open-source license (it bars derivatives and commercial
//      use). A doc calling the project "open source" contradicts the license; the free tier is "free for the
//      public interest", which is the honest phrase.
//   5. FIXED CURRENCY RATE — no doc may seal a coin↔currency rate ("1 coin = $100"); the ledger conserves coins,
//      it does not price them. (The retired draft did exactly this.)
//   6. AUTHOR IDENTITY DRIFT — the attribution email must be ONE address everywhere it appears.
//
// HONEST SCOPE: this audits internal CONSISTENCY of the legal record — it is not legal advice, does not certify
// compliance, and a green run means "no contradiction found", never "lawful". Counsel judges; this recomputes.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const rd = (p: string) => readFileSync(join(ROOT, p), 'utf8')

// Every gap is a PRECISE COMPUTATIONAL PROMPT: what drifted, and the exact edit or command that closes it —
// an agent (or a human) executes the fix verbatim, no interpretation step between the finding and the doing.
// Exported PURE — fold-quantum imports this so the legal surface is a dimension of the ONE guard receipt: any
// change to the checked legal facts moves the unified fold. Execution happens only when run directly (below).
export function legalGaps(): { gaps: { what: string; fix: string }[]; facts: string } {
  const gaps: { what: string; fix: string }[] = []

// 1) LICENSE DRIFT — one SPDX id across the whole record.
const CANON = 'CC-BY-NC-ND-4.0'
const licenseFile = existsSync(join(ROOT, 'LICENSE')) ? rd('LICENSE') : ''
if (!licenseFile.includes('CC BY-NC-ND 4.0'))
  gaps.push({ what: 'LICENSE file missing or does not state CC BY-NC-ND 4.0', fix: 'restore LICENSE from git (`git checkout HEAD -- LICENSE`) or write the CC BY-NC-ND 4.0 text with © Tsvetan Rouschev' })
const pkgFiles = ['package.json', ...readdirSync(join(ROOT, 'packages')).map((d) => `packages/${d}/package.json`)].filter((p) => existsSync(join(ROOT, p)))
for (const p of pkgFiles) {
  const lic = JSON.parse(rd(p)).license
  if (lic !== CANON) gaps.push({ what: `${p}: license "${lic}" ≠ canonical "${CANON}"`, fix: `edit ${p}: set "license": "${CANON}" (workspace surfaces regenerate via \`npm run gen:packages\`)` })
}
if (existsSync(join(ROOT, 'docs/license.md')) && !rd('docs/license.md').includes('CC BY-NC-ND 4.0'))
  gaps.push({ what: 'docs/license.md does not state CC BY-NC-ND 4.0', fix: 'edit docs/license.md: restore the "CC BY-NC-ND 4.0" terms line (see git history of the canonical page)' })

// 2) README must carry the terms it ships under.
const readme = rd('README.md')
if (!/CC BY-NC-ND 4\.0|CC-BY-NC-ND-4\.0/.test(readme))
  gaps.push({ what: 'README.md carries no license notice (npm renders it as the package face)', fix: 'edit src/scripts/gen-readme.ts (README is GENERATED — never edit README directly): add a "## License" section naming CC BY-NC-ND 4.0 + uuidna.com/license, then `node dist/scripts/gen-readme.js`' })

// 3) CONTRIBUTING must state inbound terms.
if (existsSync(join(ROOT, 'CONTRIBUTING.md')) && !/licen[cs]e/i.test(rd('CONTRIBUTING.md')))
  gaps.push({ what: 'CONTRIBUTING.md never mentions the license — inbound contribution terms unstated', fix: 'edit CONTRIBUTING.md: add one paragraph stating contributions are accepted under the project license (CC BY-NC-ND 4.0, inbound = outbound) with credit under the credit law' })

// 4) "open-source" overclaim + 5) fixed currency rate — scan every shipped doc page (not dist, not history).
const docPages = readdirSync(join(ROOT, 'docs')).filter((f) => f.endsWith('.md')).map((f) => `docs/${f}`)
for (const p of docPages) {
  const text = rd(p)
  // strip fenced code (a shell example is not a claim) before scanning prose
  const prose = text.replace(/```[\s\S]*?```/g, '')
  if (/open[- ]source/i.test(prose))
    gaps.push({ what: `${p}: calls the work "open source" — CC BY-NC-ND is not an OSI license`, fix: `edit ${p}: replace the "open source"/"open-source" phrase with "free for the public interest" (the honest tier name)` })
  if (/\d\s*coins?\s*=\s*[$€£]|[$€£]\s*\d+[^)]*per\s+coin/i.test(prose))
    gaps.push({ what: `${p}: seals a coin↔currency rate — coins are conserved, never priced`, fix: `edit ${p}: delete the rate claim; state "a measured unit of work saved, not a price" (theorem two_coins)` })
}

// 6) one author email across the record.
const emails = new Set<string>()
for (const p of ['LICENSE', 'docs/license.md', 'README.md', 'package.json']) {
  if (!existsSync(join(ROOT, p))) continue
  for (const m of rd(p).matchAll(/[a-z0-9._-]+@psg\.bg/gi)) emails.add(m[0].toLowerCase())
}
if (emails.size > 1)
  gaps.push({ what: `author email drifts across the record: ${[...emails].join(' vs ')}`, fix: 'pick the canonical address (the LICENSE one) and update every other occurrence to match — one identity, everywhere' })

  // the FACTS the audit stood on, serialized order-invariantly — the legal dimension of the one guard receipt.
  const facts = [
    `canon:${CANON}`,
    ...pkgFiles.map((p) => `${p}:${JSON.parse(rd(p)).license}`),
    `LICENSE:${licenseFile.includes('CC BY-NC-ND 4.0')}`,
    `README:${/CC BY-NC-ND 4\.0|CC-BY-NC-ND-4\.0/.test(readme)}`,
    `emails:${[...emails].sort().join(',')}`,
    `gaps:${gaps.length}`,
  ].sort().join('\n')
  return { gaps, facts }
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const { gaps } = legalGaps()
  if (gaps.length) {
    console.error(`✗ audit-legal-gaps — ${gaps.length} legal-surface gap(s), each with its exact fix:`)
    for (const g of gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
    process.exit(1)
  }
  console.log(`✓ audit-legal-gaps — the legal record is internally consistent: one license across the record, README + CONTRIBUTING state the terms, no open-source overclaim, no currency rate, one author identity. Consistency, not counsel.`)
}
