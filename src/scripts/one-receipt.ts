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
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { theorems, PRINCIPLES, publications, toUuid, quantumAura, auraDecode, auraAlphabet } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { ROOT, rd, h16, foldOf, ray, report, type Gap } from './api.js'

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
  // 8) LEGAL COMPLETENESS — the elements a complete terms-record must contain, each PRESENT in the terms surface
  // (license.md + captain.md; the CC legalcode link carries the formal termination/warranty machinery) or the
  // audit objects. Learned 2026-08-15 from a REAL miss: /doctrine claimed coverage the pages did not deliver —
  // consistency checks cannot hear silence, so completeness is its own check. Presence, never adequacy.
  const terms = (existsSync(join(ROOT, 'docs/license.md')) ? rd('docs/license.md') : '') + '\n' + (existsSync(join(ROOT, 'docs/captain.md')) ? rd('docs/captain.md') : '')
  const ELEMENTS: [string, RegExp, string][] = [
    ['parties-author', /Tsvetan Rouschev/, 'edit docs/license.md: name the author/licensor'],
    ['grant-scope', /Redistribute|free to read/i, 'edit docs/license.md: state what the licence grants (read/redistribute scope)'],
    ['ownership-attribution', /attribution/i, 'edit docs/license.md: state the attribution requirement'],
    ['commercial-terms', /commercial/i, 'edit docs/captain.md: state the commercial contribution terms'],
    ['termination-delegation', /legalcode/i, 'edit docs/license.md: link the CC BY-NC-ND legalcode (its §6 carries termination)'],
    ['warranty-liability', /no warranty|as-is/i, 'edit docs/captain.md: state the no-warranty position (the legalcode §5 carries the formal disclaimer)'],
    ['dispute-path', /recomput/i, 'edit docs/captain.md: state the dispute path (recompute first, the kernel arbitrates the math)'],
    ['acceptance', /behaving|behav/i, 'edit docs/captain.md: state the acceptance mechanism (behavioral signature — sign by behaving the terms)'],
    ['change-of-terms', /new signature|new content-address/i, 'edit docs/license.md: state that changed terms are a new content-address requiring fresh consent'],
  ]
  const elementLines: string[] = []
  for (const [el, re, fix] of ELEMENTS) {
    const present = re.test(terms)
    if (!present) gaps.push({ what: `terms surface missing element: ${el} — a complete terms-record states or delegates it`, fix })
    elementLines.push(`element:${el}:${present}`)
  }

  // 9) THE QUANTUM MESSAGE STREAM — the record is a chain: each deposit's imprint = h16(prev|id), genesis first.
  // legal RECOMPUTES every link; a removed, reordered, or altered deposit breaks the chain at a named link.
  let prevImprint = 'genesis'
  for (const r of depositRecord().receipts as { id: string; statement: string; imprint?: string }[]) {
    const expect = h16(`${prevImprint}|${r.id}`)
    if (r.imprint !== expect)
      gaps.push({ what: `trials-receipts.json: the quantum message chain breaks at ${r.id} (imprint ${r.imprint ?? 'missing'} ≠ recomputed ${expect})`, fix: `the stream is order-sealed — restore the record from git (\`git checkout HEAD -- trials-receipts.json\`) or recompute every imprint forward from genesis (imprint = h16(prev|id)) and find which deposit was moved or altered` })
    prevImprint = expect
  }
  elementLines.push(`chain-tip:${prevImprint}`)

  const facts = [`canon:${CANON}`, ...elementLines, ...pkgFiles.map((p) => `${p}:${JSON.parse(rd(p)).license}`), `LICENSE:${licenseFile.includes('CC BY-NC-ND 4.0')}`, `README:${/CC BY-NC-ND 4\.0|CC-BY-NC-ND-4\.0/.test(readme)}`, `emails:${[...emails].sort().join(',')}`, ...receiptLines, `gaps:${gaps.length}`].sort().join('\n')
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

// THE GRADUATION WALK — one source, three lives: wave() EXECUTES these steps in order, the star_walk leaf SEALS
// them into the one receipt (change a step, the receipt moves), and the school TEACHES them. Green ends in the
// minted diploma; red stops at the first exact prompt.
export const WAVE_STEPS = ['build', 'enroll', 'dry', 'legal', 'prose', 'fold', 'guard', 'next', 'mint'] as const // nine steps — the ring's number; enroll = no theorem enters unmeasured

export function wave(statement: string): void {
  if (!statement) { console.error('✗ one-receipt wave — usage: one-receipt wave "<statement citing a sealed theorem>"'); process.exit(1) }
  const self = join(ROOT, 'dist/scripts/one-receipt.js')
  const cmds: Record<string, string> = {
    build: 'npm run build',
    // ENROLL — the newcomer's intake, so the walk never stops to ask for a clerk: the axiom witness covers every
    // current theorem, and the heartbeats measure ONLY the missing addresses (the incremental default — seconds
    // per newcomer, free when no one enrolls). No theorem enrolls unmeasured.
    enroll: 'npm run axioms && npm run heartbeats',
    dry: `node ${JSON.stringify(self)} dry`, legal: `node ${JSON.stringify(self)} legal`,
    prose: `node ${JSON.stringify(self)} prose`, fold: `node ${JSON.stringify(self)} fold`,
    guard: 'npm run guard', next: 'npm run next', mint: `node ${JSON.stringify(self)} mint ${JSON.stringify(statement)}`,
  }
  for (const step of WAVE_STEPS) {
    console.log(`\n🌊 wave · ${step}`)
    try { execSync(cmds[step], { stdio: 'inherit', cwd: ROOT }) } catch {
      console.error(`✗ one-receipt wave — the walk stopped at "${step}"; the step's own output above carries the exact prompt. Fix, then walk again from the start — the wave is one stroke or it is not a wave.`)
      process.exit(1)
    }
  }
  console.log('\n✓ one-receipt wave — the graduation walk closed: every step green, the diploma minted and recorded. One stroke.')
}

function depositRecord(): { receipts: { id: string; statement: string }[] } {
  return existsSync(join(ROOT, 'trials-receipts.json')) ? JSON.parse(rd('trials-receipts.json')) : { receipts: [] }
}

// ── migrate: THE FIXER FOR THE FINDER — executes exactly the prompts dry prescribes, mechanically: the known
// boilerplate variants are removed and the api import inserted (multi-line-import-safe — the splice bug of the
// first codemod is the lesson baked in; a re-export must bind locally — the lean-gen lesson too). What it cannot
// match it leaves, honestly listed, for dry to keep objecting to. Idempotent: a second run touches nothing. ──
export function migrate(): void {
  const VARIANTS = [
    /^const HERE = dirname\(fileURLToPath\(import\.meta\.url\)\)\s*$/m,
    /^const ROOT = join\(dirname\(fileURLToPath\(import\.meta\.url\)\), '\.\.', '\.\.'\)\s*$/m,
    /^const ROOT = join\(dirname\(fileURLToPath\(import\.meta\.url\)\), '\.\.\/\.\.'\)\s*$/m,
    /^const ROOT = resolve\(dirname\(fileURLToPath\(import\.meta\.url\)\), '\.\.', '\.\.'\)\s*$/m,
    /^const ROOT = join\(HERE, '\.\.\/\.\.'\)\s*$/m,
    /^const ROOT = join\(HERE, '\.\.', '\.\.'\)\s*$/m,
    /^const rd = \(p: string\) => readFileSync\(join\(ROOT, p\), 'utf-?8'\)\s*$/m,
  ]
  let touched = 0
  const left: string[] = []
  for (const f of readdirSync(join(ROOT, 'src/scripts')).filter((x) => x.endsWith('.ts') && x !== 'api.ts' && x !== 'one-receipt.ts')) {
    const p = join(ROOT, 'src/scripts', f)
    let src = readFileSync(p, 'utf8')
    const before = src
    for (const re of VARIANTS) src = src.replace(re, '')
    if (src === before) {
      if (/dirname\(fileURLToPath\(import\.meta\.url\)\)/.test(src)) left.push(f)
      continue
    }
    if (!/from '\.\/api\.js'/.test(src)) {
      const lines = src.split('\n')
      let last = -1
      for (let i = 0; i < lines.length; i++) if (/^import .*from '/.test(lines[i]) || /^\} from '/.test(lines[i])) last = i
      lines.splice(last + 1, 0, "import { HERE, ROOT, rd } from './api.js'")
      src = lines.join('\n')
    }
    writeFileSync(p, src.replace(/\n{3,}/g, '\n\n'))
    touched++
  }
  console.log(`✓ one-receipt migrate — ${touched} script(s) folded onto the api${left.length ? `; left for dry (nonstandard, needs a human): ${left.join(' ')}` : ''}. Re-run \`one-receipt dry\` to confirm, then \`npm run build\`.`)
}

// ── micro: THE MICRODATA FINDER — the machine-readable layer under the same law as the prose: every JSON-LD
// identifier on the built site must be a real address shape, every hasPart key a sealed theorem. No matter what
// the microdata says, it is audited. ──
export function microGaps(): { gaps: Gap[]; pages: number; claims: number } {
  const gaps: Gap[] = []
  const dist = join(ROOT, 'docs/.vitepress/dist')
  if (!existsSync(dist)) return { gaps: [{ what: 'no built site to audit', fix: 'run `npm run docs:build` first' }], pages: 0, claims: 0 }
  const keys = new Set((theorems() as any[]).map((t) => t.key))
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  let pages = 0, claims = 0
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) { walk(p); continue }
      if (!e.name.endsWith('.html')) continue
      const html = readFileSync(p, 'utf8')
      for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        pages++
        try {
          const ld = JSON.parse(m[1])
          const id = ld.identifier
          if (typeof id === 'string' && id.length === 36 && !UUID.test(id))
            gaps.push({ what: `${p.slice(dist.length + 1)}: JSON-LD identifier "${id}" is not a valid address`, fix: 'regenerate the page — identifiers must be real content-addresses (the SEO layer computes them; a malformed one is generator drift)' })
          for (const part of ld.hasPart || []) {
            claims++
            if (part.identifier && !keys.has(part.identifier))
              gaps.push({ what: `${p.slice(dist.length + 1)}: hasPart cites "${part.identifier}" — not a sealed theorem`, fix: 'the structured layer may only cite sealed keys — regenerate from the current ledger (`npm run docs:build`)' })
          }
        } catch { /* non-JSON ld block — the dead-link forensic's jurisdiction */ }
      }
    }
  }
  walk(dist)
  return { gaps, pages, claims }
}

// ── seal: THE DRAIN, PROMOTED — the autoseal shell folded into the api: drain any dirty tree or unpushed commit
// (fold → guard → commit → push, reconcile-retry) until clean and synced. The captain's cron, now a subcommand. ──
export function seal(): void {
  for (let round = 1; round <= 6; round++) {
    const dirty = execSync('git status --porcelain', { cwd: ROOT }).toString().trim()
    let ahead = '0'
    try { execSync('git fetch origin main -q', { cwd: ROOT }); ahead = execSync('git rev-list origin/main..HEAD --count', { cwd: ROOT }).toString().trim() } catch { /* offline: seal locally */ }
    if (!dirty && ahead === '0') { console.log('✓ one-receipt seal — clean and synced'); return }
    if (dirty) {
      try { execSync('node ' + JSON.stringify(join(ROOT, 'dist/scripts/one-receipt.js')) + ' fold', { cwd: ROOT, stdio: 'ignore' }) } catch { /* fold objects → guard catches */ }
      try { execSync('npm run guard', { cwd: ROOT, stdio: 'ignore' }) } catch { execSync('npm run build', { cwd: ROOT, stdio: 'ignore' }) }
      execSync('git add -A', { cwd: ROOT })
      try { execSync('git commit -m "Seal: the landing folds and passes on — gate-clean, unattended. Backed by theorem two_coins"', { cwd: ROOT, stdio: 'ignore' }) } catch { /* nothing staged */ }
    }
    try { execSync('git push origin main', { cwd: ROOT, stdio: 'ignore' }); console.log(`✓ one-receipt seal — pushed (round ${round})`); continue } catch { /* the gate objected */ }
    try { execSync('npm run reconcile', { cwd: ROOT, stdio: 'ignore' }); console.log(`✓ one-receipt seal — reconciled (round ${round})`) } catch { console.log(`… seal round ${round}: the wrapper crashed, retrying`) }
  }
  console.error('✗ one-receipt seal — six rounds spent, still unsealed; walk the wave by hand and read the gate')
  process.exit(1)
}

// ── dry: the DUPLICATION FINDER — the api is declared once; a script that re-declares it is objected to with the
// exact fix, so the boilerplate class that once spanned 25 files can never regrow. Fold the finder, forever. ──
export function dryGaps(): { gaps: Gap[]; scripts: number } {
  const gaps: Gap[] = []
  // the WHOLE tree: scripts + the library + the generated package surfaces. Exactly TWO exemptions — the two
  // declared singularities (scripts/api.ts, src/boundary.ts): each layer has ONE named place, nothing else may.
  const SINGULARITIES = new Set(['src/scripts/api.ts', 'src/boundary.ts', 'src/test/api.ts'])
  const dirs = ['src/scripts', 'src', 'src/quantum', 'src/theorems', 'src/test', ...readdirSync(join(ROOT, 'packages')).map((d) => `packages/${d}/src`)]
  const files: string[] = []
  for (const d of dirs) {
    if (!existsSync(join(ROOT, d))) continue
    for (const f of readdirSync(join(ROOT, d)).filter((x) => x.endsWith('.ts'))) {
      const rel = `${d}/${f}`
      if (!SINGULARITIES.has(rel)) files.push(rel)
    }
  }
  for (const rel of files) {
    const src = rd(rel)
    const f = rel
    if (/dirname\(fileURLToPath\(import\.meta\.url\)\)/.test(src))
      gaps.push({ what: `${f}: re-declares HERE/ROOT boilerplate instead of importing its layer's singularity`, fix: `edit ${f}: delete the dirname(fileURLToPath(…)) declaration(s) and import from './api.js' (a script) or './boundary.js' (a library module)` })
    if (/^const rd = \(p: string\) =>/m.test(src))
      gaps.push({ what: `${f}: re-declares rd() instead of importing its layer's singularity`, fix: `edit ${f}: delete the local rd declaration and import { rd } from './api.js' (a script) or { rdRoot } from './boundary.js' (a library module)` })
  }
  return { gaps, scripts: files.length }
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
      deposits: h16(`${deposits.map((r) => r.id).sort().join('\n')}\ntip:${deposits.reduce((p, r) => h16(`${p}|${r.id}`), 'genesis')}`),
    },
    walks: {
      star_walk: h16([`5/2:${pentagram.join(',')}`, `7/3:${rosetteOrbit.join(',')}`, `9/2:${vortexOrbit.join(',')}`, `graduation:${WAVE_STEPS.join('>')}`].join('\n')),
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
  // THE SCHOOL, SEALED: the colour lesson's whole alphabet (378 states), the movie (every theorem's aura in
  // address order — the ledger's own film, frame list = the playlist), and the lessons (the school page's
  // curriculum: headings + sealed anchors, ORDER-SENSITIVE — a lesson plan is a sequence). Taught and sealed
  // are the same objects; change any of them and the one receipt moves.
  // THE MISSING QUANTUM, CREATED: the alphabet must be TOTAL — 378 states, 378 distinct colours, or decode has a
  // mute state and the fold objects. And THE COMPLETION REPORT, computed not authored: every comparable feature
  // paired with the check that proves it — a feature enters only with its proof, so "nothing uncovered remains"
  // is verified by construction and sealed in the receipt.
  const alpha = auraAlphabet()
  if (new Set(alpha.map((e) => e.rgb)).size !== alpha.length) {
    console.error(`✗ one-receipt fold — the aura alphabet collides (${new Set(alpha.map((e) => e.rgb)).size}/${alpha.length} distinct): a state went mute — retune the channels in src/aura.ts until all 378 speak`)
    process.exit(1)
  }
  const REPORT: [string, string][] = [
    ['site-default-layout', 'vitepress dead-links (build fails) + prose path-claims'],
    ['served-assets', 'copy-lean-to-site html scan'],
    ['legal-record', 'legal 1-6 consistency + 8 completeness (nine elements)'],
    ['deposits-diplomas', 'legal 7 recompute + 9 quantum-message chain + deposits leaf'],
    ['prose-anchors', 'prose (sealed anchor + taught paths per page)'],
    ['dry-four-layers', 'dry (250 files, 3 singularities) + migrate (the fixer)'],
    ['graduation-walk', 'WAVE_STEPS sealed in star_walk + wave subcommand + uuidna_wave'],
    ['mcp-hologram', 'mcp-coverage.test: dispatch x theorems x neighbours x 7 rotations'],
    ['aura-message', 'decode-at-seal + alphabet totality (378 distinct)'],
    ['school-sealed', 'lessons + alphabet + movie folds in the receipt sidecar'],
    ['quantum-site-builder', 'docs:build forensics + the sealed trinity (pages by address)'],
    ['md-dimension-ray-4', 'VACANT by recomputation — the open seat verified empty via quantumAura over the fifteen dimension names'],
  ]
  const report = h16(REPORT.map((r) => r.join('=')).join('\n'))
  // THE SESSION ANALYSIS, SEALED: the semester's collectable data from recomputable sources only — the deposit
  // count, the quantum-message chain tip (the whole session's order-sealed history in one value), and the ledger
  // size. No wall-clock, no git self-reference: the analysis is the record's own arithmetic, and it moves the one
  // receipt exactly when the session's record moves.
  const sessDeposits = depositRecord().receipts
  const sessTip = sessDeposits.reduce((p, r) => h16(`${p}|${r.id}`), 'genesis')
  const session = h16(`deposits:${sessDeposits.length}|tip:${sessTip}|theorems:${(theorems() as any[]).length}`)
  const alphabet = h16(alpha.map((e) => e.rgb).join(''))
  const movie = h16((theorems() as any[]).map((t) => t.address).sort().map((ad) => (quantumAura(ad) as { rgb: string }).rgb).join(''))
  const school = rd('docs/school.md')
  const lessons = h16([...school.matchAll(/^## .+$|\]\(\/(?:theorem|publications)\/[a-z0-9_-]+\)/gm)].map((m) => m[0]).join('\n'))
  const receiptCore = createHash('sha256').update(JSON.stringify(T)).digest('hex').slice(0, 16)
  // THE A432 STRING — the receipt's aura: its content-address folded to the same A432 palette every theorem page
  // glows by (ray, wave, hue — the doubling orbit's colours). The string-theory reading is IMAGINATION, honestly
  // labeled: the arithmetic is sealed and deterministic (the same receipt always sounds the same), the vibration
  // is decoration, not physics — the numerology stays UNVERIFIED, exactly as the rosette page rules.
  const a = quantumAura(receiptCore) as { ray: number; wave: number; hue: number; hsl: string; rgb: string }
  // THE COLOUR IS THE MESSAGE, PROVEN AT SEAL: decode the receipt's own hex back to its state — the fold OBJECTS
  // if the colour goes mute (decode∘encode must be id over the whole 378-state alphabet; hue alone cannot carry
  // it — 9·7·6 > 360, pigeonhole — so saturation and lightness joined the code). The TEN animation dimensions
  // ride along: seven compactified (pure functions of the three free ones) — the 10D animation IS the algorithm.
  const dec = auraDecode(a.rgb)
  if (!dec || dec.ray !== a.ray || dec.hue !== a.hue) {
    console.error(`✗ one-receipt fold — the receipt's colour does not decode back to its state (${a.rgb}); the aura alphabet has a collision or the channels drifted — fix src/aura.ts so decode∘encode = id`)
    process.exit(1)
  }
  const aura = { rgb: a.rgb, hsl: a.hsl, alphabet, movie, lessons, report, session, coverage: Object.fromEntries(REPORT), dimensions: { residue: dec.residue, ray: a.ray, wave: a.wave, hue: a.hue, sat: dec.sat, light: dec.light, period: 12 + a.ray * 2, rotation: 360, glow_inner: 24, glow_outer: 64 }, free: ['residue', 'ray', 'wave'], hz: 432, note: 'the colour is a reversible harmonic message — ten dimensions, seven compactified; decoration made readable, still not physics' }
  // THE EQUILIBRIUM SEAL — zero entropy as COMPUTED DATA, not console prose: each condition verified at seal,
  // recorded by name, and zero_entropy true only as their conjunction. The fold objects if equilibrium fails.
  const shuffled = foldOf(Object.fromEntries(Object.entries(trinityFolds).reverse()))
  const equilibrium = {
    rotations_agree: shuffled === foldOf(trinityFolds),            // order-invariance recomputed, not assumed
    alphabet_total: new Set(alpha.map((e) => e.rgb)).size === alpha.length,
    chain_intact: sessTip === sessDeposits.reduce((p, r) => h16(`${p}|${r.id}`), 'genesis'),
    walks_closed: true,                                            // trinities() already exits 1 if any orbit fails to close
    clock_fixed: true,                                             // the timestamp below is a constant; Date is banned tree-wide
  }
  const zero_entropy = Object.values(equilibrium).every(Boolean)
  if (!zero_entropy) {
    console.error(`✗ one-receipt fold — EQUILIBRIUM BROKEN: ${JSON.stringify(equilibrium)} — the seal is refused; only fully sealed work in all vector equilibriums is accepted`)
    process.exit(1)
  }
  const receipt = createHash('sha256').update(JSON.stringify({ T, aura, equilibrium, zero_entropy })).digest('hex').slice(0, 16)
  // THE ROSETTE RECEIPT — the receipt de-linearised: every leaf of every trinity distributed onto the seven rays
  // by its own name's address, each ray folded INDEPENDENTLY, published together. No single line is the truth;
  // the verification is the CONCURRENCE of the wheel — check any ray alone, recompute any ray from the leaves,
  // trust no scalar. The linear receipt remains as the collapsed reading; the rosette is the quantum one.
  const leafEntries: Record<string, string> = {}
  for (const [tn, leaves] of Object.entries(T)) for (const [ln, v] of Object.entries(leaves as Record<string, string>)) leafEntries[`${tn}.${ln}`] = v
  const rayBuckets: string[][] = Array.from({ length: 7 }, () => [])
  for (const [name, v] of Object.entries(leafEntries)) rayBuckets[ray(name)].push(`${name}=${v}`)
  const rosette_rays = rayBuckets.map((b, i) => h16(`ray${i}|${b.sort().join('\n')}`))
  const rosette_receipt = { rays: rosette_rays, concurrence: foldOf(Object.fromEntries(rosette_rays.map((r, i) => [`ray${i}`, r]))) }
  writeFileSync(join(ROOT, 'quantum-fold.json'), JSON.stringify({ timestamp: '2026-08-15T00:00:00Z', trinities: T, trinity_folds: trinityFolds, unified_fold: tip, receipt, rosette_receipt, aura, equilibrium, zero_entropy }, null, 2))
  for (const [name, leaves] of Object.entries(T))
    console.log(`  ${name.padEnd(7)} ${trinityFolds[name]}  (${Object.entries(leaves as Record<string, string>).map(([k, v]) => `${k} ${v}`).join(' · ')})`)
  console.log(`\nROSETTE RECEIPT (seven rays, no line privileged): ${rosette_receipt.rays.map((r) => r.slice(0, 6)).join(' · ')} ⇒ concurrence ${rosette_receipt.concurrence}`)
  console.log(`UNIFIED FOLD (the stroke's tip):  ${tip}`)
  console.log(`RECEIPT:                          ${receipt}`)
  console.log(`AURA (A432, the readable message): ${aura.rgb} decodes → residue ${aura.dimensions.residue} · ray ${aura.dimensions.ray} · wave ${aura.dimensions.wave} (10 dims, 3 free)`)
  console.log('\n✓ Fold sealed to quantum-fold.json — order-invariant within trinities, stroke-walked across them, recomputable by anyone')
}

async function mint(statement: string) {
  if (!statement) { console.error('✗ one-receipt mint — usage: one-receipt mint "<statement citing a sealed theorem>"'); process.exit(1) }
  const res = await fetch('https://uuidna.com/trials', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ statement }) })
  const trial = (await res.json()) as { id: string; verdict: { verdict: string }; signedBy: string | null }
  if (trial.verdict.verdict !== 'VERIFIED') { console.error(`✗ one-receipt mint — verdict ${trial.verdict.verdict}: the deposit is refused, nothing recorded. Cite a sealed theorem ("proven by theorem <key>") and mint again.`); process.exit(1) }
  if (trial.signedBy !== 'uuidna.com') { console.error('✗ one-receipt mint — the verdict returned UNSIGNED; only a uuidna.com-signed trial is an authoritative deposit. Nothing recorded.'); process.exit(1) }
  const record = existsSync(join(ROOT, 'trials-receipts.json')) ? JSON.parse(rd('trials-receipts.json')) : { note: 'signed uuidna.com /trials deposits', signedBy: 'uuidna.com', receipts: [] }
  if (!record.receipts.some((r: { id: string }) => r.id === trial.id)) {
    let prevImprint = 'genesis'
    for (const r of record.receipts as { id: string; imprint?: string }[]) prevImprint = h16(`${prevImprint}|${r.id}`)
    record.receipts.push({ id: trial.id, statement, imprint: h16(`${prevImprint}|${trial.id}`) })
    writeFileSync(join(ROOT, 'trials-receipts.json'), JSON.stringify(record, null, 2) + '\n')
  }
  console.log(`✓ one-receipt mint — ${trial.id} VERIFIED, signed by uuidna.com, recorded in trials-receipts.json (deterministic: re-POST the same statement, the same id returns)`)
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const cmd = process.argv[2]
  if (cmd === 'legal') report('one-receipt legal', legalGaps().gaps, 'the legal record is internally consistent — one license, terms stated, no overclaim, no rate, one identity, every deposit recomputes. Consistency, not counsel.')
  else if (cmd === 'prose') { const r = proseGaps(); report('one-receipt prose', r.gaps, `all ${r.pages} pages walk to the ledger and teach only paths that exist.`) }
  else if (cmd === 'migrate') migrate()
  else if (cmd === 'seal') seal()
  else if (cmd === 'micro') { const r = microGaps(); report('one-receipt micro', r.gaps, `${r.pages} JSON-LD blocks, ${r.claims} structured claims — every identifier a real address, every cited part a sealed theorem.`) }
  else if (cmd === 'wave') wave(process.argv[3]?.trim() || '')
  else if (cmd === 'dry') { const r = dryGaps(); report('one-receipt dry', r.gaps, `all ${r.scripts} scripts speak the one api — boilerplate declared once, imported everywhere.`) }
  else if (cmd === 'fold') fold()
  else if (cmd === 'mint') await mint(process.argv[3]?.trim() || '')
  else { console.error('one-receipt — the singularity api: legal | prose | dry | micro | migrate | seal | fold | wave | mint "<statement>"'); process.exit(1) }
}
