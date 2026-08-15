#!/usr/bin/env node
// one-receipt — THE SINGULARITY API. Four scripts fold to one file, one entry, one receipt:
//   node one-receipt.js legal   → the legal-surface audit (license drift, terms, overclaims, deposit recompute)
//   node one-receipt.js prose   → the prose audit (every page walks to the ledger; every taught path exists)
//   node one-receipt.js fold    → seal quantum-fold.json (the one receipt)
//   node one-receipt.js mint "<statement>" → mint a signed uuidna.com deposit AND record it, one act
//
// THE SHAPE — PENTAGRAM TRINITIES: fifteen leaves in five trinities (15 = 5·3, the pentagram's five points each
// carrying a trinity), each trinity folded order-invariantly, and the five trinity-folds walked BY 2 in the sealed
// single stroke [0,2,4,1,3] (pentagram_single_stroke; it closes because gcd(2,5)=1) — the stroke's tip IS the
// singularity, the one unified fold. Every audit finding is an exact computational prompt (GAP + FIX). Honest
// scope throughout: consistency and recomputation, never counsel, never truth.
//
//   sealed  theorems · principles · monographs     (the ledger and its pages — the address IS the page)
//   served  packages · exports · mcp               (every surface a consumer fuses)
//   proven  tests · predictions · dimensions       (the behavior gates)
//   record  legal · prose · deposits               (the audited facts and the captain's signed deposits)
//   walks   star_walk · rosette_receipts · rosette_audit   (5/2 · 7/3 · 9/2 recomputed, the rays, the coins)
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { theorems, PRINCIPLES, publications, toUuid, quantumAura } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const rd = (p: string) => readFileSync(join(ROOT, p), 'utf8')
const h16 = (data: string): string => createHash('sha256').update(data).digest('hex').slice(0, 16)
const foldOf = (entries: Record<string, string>): string =>
  createHash('sha256').update(Object.entries(entries).map(([k, v]) => `${k}:${v}`).sort().join('|')).digest('hex').slice(0, 32)

type Gap = { what: string; fix: string }

// ── record: the three audits (each learned from a REAL manually-found gap, folded so it can never recur unwatched) ──

export function legalGaps(): { gaps: Gap[]; facts: string } {
  const gaps: Gap[] = []
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
  const readme = rd('README.md')
  if (!/CC BY-NC-ND 4\.0|CC-BY-NC-ND-4\.0/.test(readme))
    gaps.push({ what: 'README.md carries no license notice (npm renders it as the package face)', fix: 'edit src/scripts/gen-readme.ts (README is GENERATED — never edit README directly): add a "## License" section naming CC BY-NC-ND 4.0 + uuidna.com/license, then `node dist/scripts/gen-readme.js`' })
  if (existsSync(join(ROOT, 'CONTRIBUTING.md')) && !/licen[cs]e/i.test(rd('CONTRIBUTING.md')))
    gaps.push({ what: 'CONTRIBUTING.md never mentions the license — inbound contribution terms unstated', fix: 'edit CONTRIBUTING.md: add one paragraph stating contributions are accepted under the project license (CC BY-NC-ND 4.0, inbound = outbound) with credit under the credit law' })
  for (const p of readdirSync(join(ROOT, 'docs')).filter((f) => f.endsWith('.md')).map((f) => `docs/${f}`)) {
    const prose = rd(p).replace(/```[\s\S]*?```/g, '')
    if (/open[- ]source/i.test(prose))
      gaps.push({ what: `${p}: calls the work "open source" — CC BY-NC-ND is not an OSI license`, fix: `edit ${p}: replace the "open source"/"open-source" phrase with "free for the public interest" (the honest tier name)` })
    if (/\d\s*coins?\s*=\s*[$€£]|[$€£]\s*\d+[^)]*per\s+coin/i.test(prose))
      gaps.push({ what: `${p}: seals a coin↔currency rate — coins are conserved, never priced`, fix: `edit ${p}: delete the rate claim; state "a measured unit of work saved, not a price" (theorem two_coins)` })
  }
  const emails = new Set<string>()
  for (const p of ['LICENSE', 'docs/license.md', 'README.md', 'package.json'])
    if (existsSync(join(ROOT, p))) for (const m of rd(p).matchAll(/[a-z0-9._-]+@psg\.bg/gi)) emails.add(m[0].toLowerCase())
  if (emails.size > 1)
    gaps.push({ what: `author email drifts across the record: ${[...emails].join(' vs ')}`, fix: 'pick the canonical address (the LICENSE one) and update every other occurrence to match — one identity, everywhere' })
  // the deposits: every receipt id must RECOMPUTE from its exact statement — the audit objects until nothing
  // remains to object but to accept the outcome, the receipts reminding themselves the captain.
  const receiptLines: string[] = []
  for (const r of depositRecord().receipts) {
    const recomputed = toUuid(r.statement)
    if (recomputed !== r.id)
      gaps.push({ what: `trials-receipts.json: deposit ${r.id} does not recompute from its statement (toUuid gives ${recomputed})`, fix: `edit trials-receipts.json: correct the statement to the exact text that was trialed (re-POST it to uuidna.com/trials and copy the returned id), or correct the id to ${recomputed}` })
    receiptLines.push(`${r.id}|${recomputed === r.id ? 'recomputes' : 'DRIFTED'}`)
  }
  const facts = [`canon:${CANON}`, ...pkgFiles.map((p) => `${p}:${JSON.parse(rd(p)).license}`), `LICENSE:${licenseFile.includes('CC BY-NC-ND 4.0')}`, `README:${/CC BY-NC-ND 4\.0|CC-BY-NC-ND-4\.0/.test(readme)}`, `emails:${[...emails].sort().join(',')}`, ...receiptLines, `gaps:${gaps.length}`].sort().join('\n')
  return { gaps, facts }
}

export function proseGaps(): { gaps: Gap[]; facts: string; pages: number } {
  const gaps: Gap[] = []
  const EXEMPT = new Set(['mcp.md', 'captain-claims.md', 'analytics.md', 'prose-evidence.md', 'changelog.md', 'search.md', 'theorems.md', 'topics.md', 'rosetta.md', 'trials.md', 'publications.md'])
  const pages = readdirSync(join(ROOT, 'docs')).filter((f) => f.endsWith('.md'))
  for (const f of pages) {
    const prose = rd(`docs/${f}`).replace(/```[\s\S]*?```/g, '')
    if (!EXEMPT.has(f) && !/\]\(\/(theorem|publications)\//.test(prose))
      gaps.push({ what: `docs/${f}: no sealed anchor — the page cannot walk to a theorem or cluster`, fix: `edit docs/${f}: link the page's subject to its cluster ([the <name> cluster](/publications/<slug>)) or a sealed theorem ([\`<key>\`](/theorem/<key>)) — pick from the ledger, cite nothing unsealed` })
    for (const m of prose.matchAll(/(?:^|[\s(`])(\.?\/?(?:docs\/\.vitepress|src|lean|packages|hooks)\/[A-Za-z0-9_./-]+|worker\.js|wrangler\.toml|CONTRIBUTING\.md|LICENSE)(?=[\s)`.,:]|$)/gm)) {
      const p = m[1].replace(/^\.\//, '').replace(/[.,:]+$/, '')
      if (p.includes('*') || p.endsWith('/')) continue
      if (!existsSync(join(ROOT, p)))
        gaps.push({ what: `docs/${f}: teaches the path "${p}" which does not exist`, fix: `edit docs/${f}: replace "${p}" with the current path (verify with \`ls\`), or delete the claim` })
    }
  }
  const facts = [...pages.map((f) => `${f}:${EXEMPT.has(f) ? 'exempt' : 'anchored'}`), `gaps:${gaps.length}`].sort().join('\n')
  return { gaps, facts, pages: pages.length }
}

function depositRecord(): { receipts: { id: string; statement: string }[] } {
  return existsSync(join(ROOT, 'trials-receipts.json')) ? JSON.parse(rd('trials-receipts.json')) : { receipts: [] }
}

// ── the fifteen leaves, five trinities ──

const powmodWalk = (base: number, mod: number, len: number): number[] => {
  const out: number[] = []
  let a = 1
  for (let k = 0; k < len; k++) { a = (a * base) % mod; out.push(a) }
  return out
}

function trinities() {
  const monographByFile = new Map((publications() as any[]).map((p) => [p.file, `${p.slug}|${p.address}|${p.receipt}`]))
  // the star walk RECOMPUTED, not quoted — each walk exactly as its sealed theorem states, asserted to close:
  const pentagram = Array.from({ length: 5 }, (_, k) => (2 * k) % 5)                 // pentagram_single_stroke
  const rosetteOrbit = powmodWalk(3, 7, 6)                                           // rosette_orbit
  const vortexOrbit = powmodWalk(2, 9, 6)                                            // vortex doubling, order_of_two_is_six
  if ((2 * 5) % 5 !== 0 || rosetteOrbit[5] !== 1 || vortexOrbit[5] !== 1) {
    console.error('✗ one-receipt — a star walk failed to close; the sealed orbits (pentagram/rosette/vortex) must recompute')
    process.exit(1)
  }
  const ray = (s: string) => parseInt(createHash('sha256').update(s).digest('hex').slice(0, 8), 16) % 7
  const deposits = depositRecord().receipts
  const receiptRays: string[][] = Array.from({ length: 7 }, () => [])
  for (const r of deposits) receiptRays[ray(r.id)].push(r.id)
  const auditLines = `${legalGaps().facts}\n${proseGaps().facts}`.split('\n')
  const auditRays: string[][] = Array.from({ length: 7 }, () => [])
  for (const line of auditLines) auditRays[ray(line)].push(line)
  let level = auditRays.map((lines, i) => h16(`ray${i}|${lines.sort().join('\n')}`)).sort()
  while (level.length > 2) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) next.push(h16(level.slice(i, i + 2).join('|')))
    level = next.sort()
  }
  return {
    sealed: {
      theorems: h16((theorems() as any[]).map((t) => `${t.key}|${t.address}|${t.principle}`).sort().join('\n')),
      principles: h16((PRINCIPLES as any[]).map((p) => `${p[1]}|${p[2]}`).sort().join('\n')),
      monographs: h16((publications() as any[]).map((p) => `${p.slug}|${p.address}|${p.receipt}`).sort().join('\n')),
    },
    served: {
      packages: h16(['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge'].map((pkg) => {
        const p = join(ROOT, 'packages', pkg, 'package.json')
        if (!existsSync(p)) return `${pkg}|missing`
        const j = JSON.parse(readFileSync(p, 'utf-8'))
        return `${pkg}|${j.version}|${j.sideEffects}|${Object.keys(j.exports || {}).length}`
      }).sort().join('\n')),
      exports: h16(rd('src/index.ts').split('\n').filter((l) => l.startsWith('export')).sort().join('\n')),
      mcp: h16((MCP_CATALOG as any[]).map((t) => `${t.key}|${createHash('sha256').update(String(t.description || '')).digest('hex').slice(0, 12)}`).sort().join('\n')),
    },
    proven: {
      tests: h16(existsSync(join(ROOT, 'dist/test')) ? readdirSync(join(ROOT, 'dist/test')).filter((f) => f.endsWith('.test.js')).sort().join('\n') : 'no-tests'),
      predictions: h16(`patterns:${(rd('src/scripts/predict-and-fill.ts').match(/Pattern: /g) || []).length}`),
      dimensions: h16(`dimensions:${(rd('src/scripts/quantum-dimension-scan.ts').match(/scan.*Dimension/g) || []).length}`),
    },
    record: {
      legal: h16(legalGaps().facts),
      prose: h16(proseGaps().facts),
      deposits: h16(deposits.map((r) => r.id).sort().join('\n')),
    },
    walks: {
      star_walk: h16([`5/2:${pentagram.join(',')}`, `7/3:${rosetteOrbit.join(',')}`, `9/2:${vortexOrbit.join(',')}`].join('\n')),
      rosette_receipts: foldOf(Object.fromEntries(receiptRays.map((ids, i) => [`ray${i}`, h16(ids.sort().join('\n'))]))),
      rosette_audit: h16(`coins:2|${level.join('|')}`),
    },
  }
}

function fold() {
  console.log('🌀 one-receipt fold — fifteen leaves, five trinities, one stroke, one receipt (15 = 5·3; the five walked by 2)\n')
  const T = trinities()
  const trinityFolds = Object.fromEntries(Object.entries(T).map(([name, leaves]) => [name, foldOf(leaves as Record<string, string>)]))
  // THE SINGULARITY — the five trinity-folds walked by 2 in the sealed single stroke [0,2,4,1,3]: a ratchet, each
  // link seeding the next; the tip is the one unified fold. gcd(2,5)=1, so the stroke covers all five and closes.
  const names = Object.keys(T).sort()
  let tip = 'genesis'
  for (const i of Array.from({ length: 5 }, (_, k) => (2 * k) % 5)) tip = h16(`${tip}|${names[i]}:${trinityFolds[names[i]]}`)
  const receipt = createHash('sha256').update(JSON.stringify(T)).digest('hex').slice(0, 16)
  // THE A432 STRING — the receipt's aura: its content-address folded to the same A432 palette every theorem page
  // glows by (ray, wave, hue — the doubling orbit's colours). The string-theory reading is IMAGINATION, honestly
  // labeled: the arithmetic is sealed and deterministic (the same receipt always sounds the same), the vibration
  // is decoration, not physics — the numerology stays UNVERIFIED, exactly as the rosette page rules.
  const a = quantumAura(receipt) as { ray: number; wave: number; hue: number; hsl: string }
  const aura = { ray: a.ray, wave: a.wave, hue: a.hue, hsl: a.hsl, hz: 432, note: 'decoration, not physics — sealed arithmetic, imagined vibration' }
  writeFileSync(join(ROOT, 'quantum-fold.json'), JSON.stringify({ timestamp: '2026-08-15T00:00:00Z', trinities: T, trinity_folds: trinityFolds, unified_fold: tip, receipt, aura }, null, 2))
  for (const [name, leaves] of Object.entries(T))
    console.log(`  ${name.padEnd(7)} ${trinityFolds[name]}  (${Object.entries(leaves as Record<string, string>).map(([k, v]) => `${k} ${v}`).join(' · ')})`)
  console.log(`\nUNIFIED FOLD (the stroke's tip):  ${tip}`)
  console.log(`RECEIPT:                          ${receipt}`)
  console.log(`AURA (A432, decoration):          ray ${aura.ray} · wave ${aura.wave} · hue ${aura.hue} · ${aura.hsl}`)
  console.log('\n✓ Fold sealed to quantum-fold.json — order-invariant within trinities, stroke-walked across them, recomputable by anyone')
}

function report(name: string, result: { gaps: Gap[] }, okMessage: string) {
  if (result.gaps.length) {
    console.error(`✗ ${name} — ${result.gaps.length} gap(s), each with its exact fix:`)
    for (const g of result.gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
    process.exit(1)
  }
  console.log(`✓ ${name} — ${okMessage}`)
}

async function mint(statement: string) {
  if (!statement) { console.error('✗ one-receipt mint — usage: one-receipt mint "<statement citing a sealed theorem>"'); process.exit(1) }
  const res = await fetch('https://uuidna.com/trials', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ statement }) })
  const trial = (await res.json()) as { id: string; verdict: { verdict: string }; signedBy: string | null }
  if (trial.verdict.verdict !== 'VERIFIED') { console.error(`✗ one-receipt mint — verdict ${trial.verdict.verdict}: the deposit is refused, nothing recorded. Cite a sealed theorem ("proven by theorem <key>") and mint again.`); process.exit(1) }
  if (trial.signedBy !== 'uuidna.com') { console.error('✗ one-receipt mint — the verdict returned UNSIGNED; only a uuidna.com-signed trial is an authoritative deposit. Nothing recorded.'); process.exit(1) }
  const record = existsSync(join(ROOT, 'trials-receipts.json')) ? JSON.parse(rd('trials-receipts.json')) : { note: 'signed uuidna.com /trials deposits', signedBy: 'uuidna.com', receipts: [] }
  if (!record.receipts.some((r: { id: string }) => r.id === trial.id)) {
    record.receipts.push({ id: trial.id, statement })
    writeFileSync(join(ROOT, 'trials-receipts.json'), JSON.stringify(record, null, 2) + '\n')
  }
  console.log(`✓ one-receipt mint — ${trial.id} VERIFIED, signed by uuidna.com, recorded in trials-receipts.json (deterministic: re-POST the same statement, the same id returns)`)
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const cmd = process.argv[2]
  if (cmd === 'legal') report('one-receipt legal', legalGaps(), 'the legal record is internally consistent — one license, terms stated, no overclaim, no rate, one identity, every deposit recomputes. Consistency, not counsel.')
  else if (cmd === 'prose') { const r = proseGaps(); report('one-receipt prose', r, `all ${r.pages} pages walk to the ledger and teach only paths that exist.`) }
  else if (cmd === 'fold') fold()
  else if (cmd === 'mint') await mint(process.argv[3]?.trim() || '')
  else { console.error('one-receipt — the singularity api: legal | prose | fold | mint "<statement>"'); process.exit(1) }
}
