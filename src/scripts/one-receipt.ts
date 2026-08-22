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
// scope throughout: consistency and recomputation.
//
//   sealed  theorems · principles · monographs     (the ledger and its pages — the address IS the page)
//   served  packages · exports · mcp               (every surface a consumer fuses)
//   proven  tests · predictions · dimensions       (the behavior gates)
//   record  legal · prose · deposits               (the audited facts and the captain's signed deposits)
//   walks   star_walk · rosette_receipts · rosette_audit   (5/2 · 7/3 · 9/2 recomputed, the rays, the coins)
import { createHash } from 'node:crypto'
import { messagingSeal } from '../quantum/message/index.js'
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { theorems, PRINCIPLES, runTrial, theoremCountByFile, publications, toUuid, quantumAura, auraDecode, auraAlphabet, statementCensus } from '../index.js'
import { MCP_CATALOG, callTool } from '../mcp.js'
import { handleMcpRpc } from '../mcp-http.js'
import { orphanedSkills, skillNames, SKILL_TOOLS } from '../skills.js'
import { ROOT, rd, h16, foldOf, ray, report, teeStep as step, stageDerived, DRAIN_PATHS, RECONCILE_OUTPUTS, DOCS_BUILD_OUTPUTS, selfExcluded, invokesFile, type Gap } from './api.js'

// ONE READ PER FILE, SHARED. `binary` scans bytes and `hexbit` scans text over the SAME tracked source, and each was
// re-reading every file from disk — the cache-immutable-reads law applied to the read itself. The buffer is the one
// authority; the text is decoded from it once. Within a single pass the tree cannot change, so this is exact.
const _buf = new Map<string, Buffer>()
const _txt = new Map<string, string>()
const fileBuf = (abs: string): Buffer => {
  let b = _buf.get(abs)
  if (b === undefined) { b = readFileSync(abs); _buf.set(abs, b) }
  return b
}
const fileText = (abs: string): string => {
  let t = _txt.get(abs)
  if (t === undefined) { t = fileBuf(abs).toString('utf8'); _txt.set(abs, t) }
  return t
}
// AND THE SAME COMPUTATION REPORTS THE GAPS. Splitting a file into lines is the shape every per-file finder needs,
// and each was doing it again over the same text — one read, then N identical splits. The split joins the read in the
// cache, so the corpus is walked once and every finder reports off that one computation. Within a pass the tree
// cannot change, so this is exact rather than approximate.
const _lines = new Map<string, string[]>()
const fileLines = (abs: string): string[] => {
  let l = _lines.get(abs)
  if (l === undefined) { l = fileText(abs).split('\n'); _lines.set(abs, l) }
  return l
}


// THE TRACKED-FILE LIST IS AN IMMUTABLE READ within one pass, and it was being re-spawned per finder — three `git
// ls-files` processes for one answer. Cached once (the cache-immutable-reads law): the finders that walk the tracked
// tree now share a single spawn. An empty result on failure is preserved so an offline or non-git checkout still seals.
let _tracked: string[] | null = null
const trackedFiles = (): string[] => {
  if (_tracked === null) {
    try { _tracked = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' }).split('\n') } catch { _tracked = [] }
  }
  return _tracked
}


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
      gaps.push({ what: `${p}: seals a coin↔currency rate — coins are conserved`, fix: `edit ${p}: delete the rate claim; state "a measured unit of work saved" (theorem two_coins)` })
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
  // consistency checks cannot hear silence, so completeness is its own check. Presence.
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
      if (/(^|\/)(dist|\.vitepress\/dist|\.vitepress\/cache)(\/|$)/.test(p)) continue // a DECLARED BUILD OUTPUT exists by construction— teaching it is honest even on a fresh clone where the build has not run yet (the CI-order flake this line ends)
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
    let src = fileText(p)
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

// ── seo: THE DISCOVERABILITY AUDIT — the zero-click finding (pages rank 4-9 but titles do not promise the answer)
// made a checked invariant: every built page must carry a title, a meta description in the click-worthy length band
// (50-160 chars — Google truncates outside it), a canonical link, and structured data; and no two pages may share a
// description (the duplicate-content penalty). Honest SEO: describe what is sealed. ──
export function seoGaps(): { gaps: Gap[]; pages: number } {
  const gaps: Gap[] = []
  const dist = join(ROOT, 'docs/.vitepress/dist')
  if (!existsSync(dist)) return { gaps: [{ what: 'no built site to audit', fix: 'run `npm run docs:build` first' }], pages: 0 }
  const descriptions = new Map<string, string>()
  let pages = 0
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) { walk(p); continue }
      if (!e.name.endsWith('.html')) continue
      const html = fileText(p)
      // skip redirect/stub pages (no <h1> content) — only audit real content pages
      if (!/<h1[ >]/.test(html)) continue
      pages++
      const rel = p.slice(dist.length + 1)
      const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
      const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''
      if (!title.trim()) gaps.push({ what: `${rel}: no <title>`, fix: 'add a frontmatter title — the search result\'s headline' })
      if (!desc.trim()) gaps.push({ what: `${rel}: no meta description — the search snippet is empty`, fix: 'add a frontmatter description that promises what the page answers (transformPageData supplies it for dynamic pages)' })
      else if (desc.length < 50 || desc.length > 160) gaps.push({ what: `${rel}: description ${desc.length} chars — outside the click-worthy band (50-160), Google truncates`, fix: 'rewrite the frontmatter description to 50-160 chars that state the answer the page holds' })
      if (!/rel="canonical"/.test(html)) gaps.push({ what: `${rel}: no canonical link`, fix: 'transformPageData folds every serving host to one canonical — ensure the page passes through it' })
      if (!/ld\+json/.test(html)) gaps.push({ what: `${rel}: no structured data (JSON-LD)`, fix: 'infuse schema.org via the quantum SEO layer' })
      if (desc.trim()) { const prev = descriptions.get(desc); if (prev) gaps.push({ what: `${rel}: shares its description with ${prev} — duplicate-content SEO penalty`, fix: 'give each page a distinct description of its own subject' }); else descriptions.set(desc, rel) }
    }
  }
  walk(dist)
  return { gaps, pages }
}

// ── crypto: THE COVERAGE MATRIX — every cryptographic operation is covered in BOTH directions, verified by
// round-trip, or its irreversibility is named and its forward direction is deterministic. A reversible primitive
// whose inverse does not invert, or a one-way primitive that is not deterministic, is a gap. "All combinations,
// all directions" made an executable invariant instead of a claim. ──
export async function cryptoGaps(): Promise<Gap[]> {
  const gaps: Gap[] = []
  const dist = join(ROOT, 'dist')
  if (!existsSync(join(dist, 'sha256.js'))) return [{ what: 'no built crypto to audit', fix: 'npm run build' }]
  const enc = new TextEncoder()
  const sha = await import(join(dist, 'sha256.js'))
  const im = await import(join(dist, 'imprint.js'))
  const cr = await import(join(dist, 'crypt.js'))
  const eq = (a: Uint8Array, b: Uint8Array) => a.length === b.length && a.every((x, i) => x === b[i])
  // reversible primitives — the inverse must actually invert (both directions)
  try { const sealed = cr.encrypt('the quick brown fox', 'pass', 7); if (cr.decrypt(sealed, 'pass') !== 'the quick brown fox') gaps.push({ what: 'crypt: decrypt does not invert encrypt', fix: 'the AEAD round-trip is broken — fix src/crypt.ts so decrypt(encrypt(m)) = m' }) } catch (e) { gaps.push({ what: 'crypt: encrypt/decrypt threw — ' + (e as Error).message.slice(0, 40), fix: 'restore the reversible direction in src/crypt.ts' }) }
  try { const chain = im.imprintTextChain('attack at dawn'); if (im.readImprintTextChain(chain) !== 'attack at dawn') gaps.push({ what: 'imprint: readImprintTextChain does not invert imprintTextChain', fix: 'the carrier codec is not bijective — fix src/imprint.ts' }) } catch (e) { gaps.push({ what: 'imprint: carrier threw — ' + (e as Error).message.slice(0, 40), fix: 'restore the reversible carrier in src/imprint.ts' }) }
  // one-way primitives — no inverse by design, but the FORWARD direction must be deterministic (same in → same out)
  try { const a = sha.sha256(enc.encode('abc')), b = sha.sha256(enc.encode('abc')); if (!eq(a, b)) gaps.push({ what: 'sha256: not deterministic', fix: 'a hash must be a pure function — fix src/sha256.js' }) } catch (e) { gaps.push({ what: 'sha256 threw — ' + (e as Error).message.slice(0, 40), fix: 'restore the forward hash' }) }
  try { const k = enc.encode('key'), a = sha.hmacSha256(k, enc.encode('m')), b = sha.hmacSha256(k, enc.encode('m')); if (!eq(a, b)) gaps.push({ what: 'hmac: not deterministic (verify = recompute is impossible)', fix: 'HMAC must be pure — fix src/sha256.js' }) } catch (e) { gaps.push({ what: 'hmac threw — ' + (e as Error).message.slice(0, 40), fix: 'restore hmac' }) }
  try { const s = enc.encode('salt'), a = sha.pbkdf2Sha256(enc.encode('pw'), s, 1000, 32), b = sha.pbkdf2Sha256(enc.encode('pw'), s, 1000, 32); if (!eq(a, b)) gaps.push({ what: 'pbkdf2: not deterministic (a decrypt could not re-derive the key)', fix: 'PBKDF2 must be pure — fix src/sha256.js' }) } catch (e) { gaps.push({ what: 'pbkdf2 threw — ' + (e as Error).message.slice(0, 40), fix: 'restore pbkdf2' }) }
  return gaps
}

// ── pipes: THE UNMASKED-GATE LAW — a sentinel written by a pipe is not a sentinel. `gate | tail` returns the
// PIPE's exit code, so a dying gate reports green (bitten twice: grep -c in && chains; a broken build behind
// `| tail -3` sealing two false WAVED=0). The law: a gate's exit code is captured RAW; no gate invocation may
// flow into a pipe. This finder holds that line over the repo's own scripts, workflows, and package manifest. ──
export function pipeGaps(): Gap[] {
  const gaps: Gap[] = []
  const GATE = /(npm run (guard|next|lean|reconcile|build|test)|one-receipt\.js \w+)[^|&\n"']*\|(?!\|)/
  const check = (rel: string) => {
    const p = join(ROOT, rel)
    if (!existsSync(p)) return
    const lines = fileText(p).split('\n')
    lines.forEach((line, i) => {
      if (line.trimStart().startsWith('|')) return // a markdown table row's cell border is not a pipe
      if (GATE.test(line))
        gaps.push({ what: `${rel}:${i + 1} pipes a gate — its exit code is the pipe's's`, fix: 'capture the exit raw: `gate > log 2>&1; echo EXIT=$?` and read the log after — never let a gate flow into a pipe' })
    })
  }
  check('package.json')
  for (const dir of ['src/scripts', '.github/workflows']) {
    if (!existsSync(join(ROOT, dir))) continue
    for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true }))
      if (!e.isDirectory() && (e.name.endsWith('.ts') || e.name.endsWith('.yml'))) check(dir + '/' + e.name)
  }
  return gaps
}

// ── actions: THE ONE-MAJOR LAW — a repo pins each action at ONE major, tree-wide. Version drift is silent by
// nature: on 2026-08-17 codeql.yml already ran actions/checkout@v7 while five other workflows sat on @v4, and
// nothing said so until GitHub itself warned that the v4 line's Node 20 runtime was deprecated. The finder is
// DETERMINISTIC by construction — it asks no network what "latest" is (that question belongs to the research
// desk, which already reaches outward); it asks only that the tree agree with itself, which is recomputable
// from the source alone. A newer major anywhere is the signal: the rest of the tree is behind it. ──
export function actionsGaps(): Gap[] {
  const gaps: Gap[] = []
  const dir = join(ROOT, '.github/workflows')
  if (!existsSync(dir)) return gaps
  const seen = new Map<string, { major: number; where: string }[]>()
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() || !e.name.endsWith('.yml')) continue
    fileText(join(dir, e.name)).split('\n').forEach((line, i) => {
      if (line.trimStart().startsWith('#')) return // a commented example pins nothing
      const m = /^\s*-?\s*uses:\s*([\w-]+\/[\w/-]+)@v(\d+)/.exec(line)
      if (m) (seen.get(m[1]) ?? seen.set(m[1], []).get(m[1])!).push({ major: Number(m[2]), where: `${e.name}:${i + 1}` })
    })
  }
  for (const [action, uses] of seen) {
    const newest = uses.reduce((hi, u) => (u.major > hi ? u.major : hi), 0) // a plain fold — the determinism law admits no Math.*
    for (const u of uses.filter((u) => u.major < newest))
      gaps.push({ what: `${u.where} pins ${action}@v${u.major} while the tree already runs @v${newest} — version drift, the class that hides a deprecated runtime`, fix: `bump it to ${action}@v${newest} (one major, tree-wide), or move the whole tree down deliberately` })
  }
  // The SAME law over the runtime itself: one node-version, tree-wide. A workflow left behind on an older major
  // gates the work on a runtime nothing else uses — how 22 sat under a deploy already building on 24, unseen.
  const nodes: { major: number; where: string }[] = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() || !e.name.endsWith('.yml')) continue
    fileText(join(dir, e.name)).split('\n').forEach((line, i) => {
      if (line.trimStart().startsWith('#')) return
      const m = /^\s*node-version:\s*'?(\d+)/.exec(line)
      if (m) nodes.push({ major: Number(m[1]), where: `${e.name}:${i + 1}` })
    })
  }
  const newestNode = nodes.reduce((hi, n) => (n.major > hi ? n.major : hi), 0)
  for (const n of nodes.filter((n) => n.major < newestNode))
    gaps.push({ what: `${n.where} gates on node ${n.major} while the tree already runs ${newestNode} — the runtime the work is proven on must be one`, fix: `set node-version: '${newestNode}' here, or move every workflow down together` })
  return gaps
}

// ── vacuous: THE NAME-IS-NOT-THE-PROOF LAW, made arithmetic. A statement true REGARDLESS OF ITS CONTENT —
// True, x = x, P ∧ P, P ↔ P, P → P, P ∨ ¬P — proves nothing about the name above it, and a grand name over a
// vacuous proof is the one thing this ledger must never contain (the martial-arts wing was rewritten for
// exactly this, 2026-08-17). `by decide` will happily certify every one of them: the kernel checks the
// proposition, never whether the proposition means what its key says. This finder is that missing half.
// EXEMPT: the declared `oos_` scope markers, whose whole purpose is to be void — a named boundary.
/** THREE CONTENT WORDS CARRY THE FACT; MORE IS ENTROPY — and entropy fails hard. A key that needs a fourth word is
 *  usually carrying scaffolding rather than content: forged_theorem_costs_2_power_7_bits was forgery_costs_128,
 *  and this session's own doubling_ladder_spans_octave_codon_address folded to octave_codon_address with nothing
 *  lost — the three words that survive ARE the fact. Grammatical filler (is/the/of/by/only/…) is not counted, since
 *  it carries nothing either way.
 *
 *  A RATCHET, NOT A BIG BANG: the keys recorded in lean/key-entropy.json predate this law, and renaming a theorem moves its content-address, the
 *  ledger receipt and the published archive — so they are recorded in lean/key-entropy.json as an explicit backlog
 *  that may only SHRINK (src/tests/key-entropy.test.ts enforces that it never grows). Anything NEW fails hard here.
 *  That is how the class stops growing today without moving every published address in one stroke. The
 *  backlog's SIZE is deliberately not written here: it may only shrink, so any figure in prose is wrong the
 *  moment it does (it read 313 while the list held 311). */
/** BOTH NUMBERS OR NEITHER — a theorem is its LEAN
 *  KEYS and the number of DISTINCT propositions. They differ because some statements are deliberately sealed in two
 *  wings (the ℤ/9 table in Core and in Ring accounts for 64 of the overlap). A surface that prints only the key count
 *  is quietly choosing the larger of two true numbers, and a surface carrying a count from an older ledger is simply
 *  wrong — .zenodo.json was publishing 1274 into the archive while the ledger held 1307 keys over 1222 distinct.
 *
 *  This holds every declared surface to the LIVE census: every theorem count it states must be one the census
 *  currently reports, and a surface naming the key count must name the distinct count beside it. */
export function countsGaps(): Gap[] {
  const gaps: Gap[] = []
  const T = theorems()
  const census = statementCensus()
  const keys = T.length
  const principles = (PRINCIPLES as unknown[]).length
  const receipt = runTrial().receipt
  const TARGET = 1024                       // the stated v1.0.0 milestone — a goal
  // EVERY count the ledger can honestly report — the census, each wing, each principle group, each skill group.
  // Derived, because a fixed allow-list would refuse a true per-wing count on a monograph or
  // wave through a dead global like 1195 that no longer names anything at all.
  const groupSizes = (k: 'principle' | 'skill'): number[] =>
    [...new Set(T.map((t) => t[k]))].map((v) => T.filter((t) => t[k] === v).length)
  const allowed = new Set([keys, census.distinct, census.renamings, TARGET,
    ...Object.values(theoremCountByFile()), ...groupSizes('principle'), ...groupSizes('skill')].map(String))
  // THE SURFACES ARE DISCOVERED. The first cut of this finder named three files by hand, which is the
  // same failure it exists to catch one level up: a fixed list cannot grow with the repo, and every surface it
  // omits is free to publish a dead number. A surface is now anything TRACKED that makes a census claim — states a
  // theorem count or a principle count — minus the derived layer, whose numbers recompute on every reconcile and
  // whose staleness is its generator's fault's. That exemption is itself read from the declarations
  // (DRAIN_PATHS, RECONCILE_OUTPUTS, DOCS_BUILD_OUTPUTS).
  const derived = new Set<string>([...DRAIN_PATHS, ...Object.values(RECONCILE_OUTPUTS).flat(), ...Object.values(DOCS_BUILD_OUTPUTS).flat()])
  const isDerived = (f: string): boolean =>
    [...derived].some((d) => d.endsWith('*') ? f.startsWith(d.slice(0, -1)) : f === d || f.startsWith(d + '/'))
  // (?<![0-9a-fx]) — a hex literal beside the word "theorem" is not a count. Measured false positive: the crypto
  // caveats doc illustrates a collision with `Theorem A: … = 0xabcd1234`, and 1234 was read as a ledger claim.
  const RX_T = [/(?<![0-9a-fx])(\d{3,5})\s*(?:sealed\s+|distinct\s+)?theorems?\b/gi, /theorems?"?\s*[:=]\s*\**(?<![0-9a-fx])(\d{3,5})/gi]
  const RX_P = [/(\d{1,4})\s+principles?\b/gi, /principles?"?\s*[:=]\s*\**(\d{1,4})/gi]
  const stated = (text: string, rx: RegExp[]): string[] =>
    [...new Set(rx.flatMap((r) => [...text.matchAll(r)].map((m) => m[1])))]
  let files: string[] = []
  files = trackedFiles(); if (files.length === 0) return gaps
  for (const f of files) {
    if (!/\.(md|json|txt|ya?ml)$/.test(f) || f.includes('package-lock') || isDerived(f)) continue
    let text = ''
    try { text = rd(f) } catch { continue }
    const st = stated(text, RX_T), sp = stated(text, RX_P)
    if (!st.length && !sp.length) continue                       // not a surface that describes the ledger
    for (const n of st) if (!allowed.has(n)) gaps.push({
      what: `${f}: states ${n} theorems, which the ledger does not report anywhere (${keys} keys, ${census.distinct} distinct, and no wing or group of that size)`,
      fix: `generate the number instead of writing it — ${f === '.zenodo.json' ? 'the archive description is deposited on every release, so a stale count is published into a DOI that cannot be un-said' : 'read it from statementCensus()/theoremCountByFile() at generation, so it cannot rot'}`,
    })
    for (const n of sp) if (n !== String(principles)) gaps.push({
      what: `${f}: states ${n} principles, which the ledger does not report (${principles} live)`,
      fix: `state ${principles} — the ledger organises itself by PRINCIPLES.length, so the number is read`,
    })
    // a surface naming the key count must name the distinct count beside it, or it presents the larger of two truths
    if (st.includes(String(keys)) && !text.includes(String(census.distinct))) gaps.push({
      what: `${f}: names the ${keys} keys without the ${census.distinct} distinct propositions — the larger of two true numbers, alone`,
      fix: `state both, with the reason: "${census.distinct} distinct propositions under ${keys} keys (${census.renamings} deliberate re-namings)"`,
    })
    // A uuid is only THE LEDGER'S receipt where it sits in the same sentence as a census claim. Everywhere else a
    // uuid is a page address or a per-claim seal, and holding those to the fold would be a wall.
    for (const sentence of text.split(/(?<=\.)\s|\n/)) {
      if (!stated(sentence, RX_T).length && !stated(sentence, RX_P).length) continue
      for (const r of stated(sentence, [/\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/g]))
        if (r !== receipt) gaps.push({
          what: `${f}: presents receipt ${r} beside a census claim, and it is not the ledger's fold (${receipt})`,
          fix: 'recompute it — runTrial().receipt folds every theorem address order-invariantly, so a receipt names WHICH ledger was sealed; a stale one names a ledger that no longer exists',
        })
    }
  }
  return gaps
}

/** ── THE LEAN LINE INDEX — each Lean line indexed, and every reuse of it declared.
 *
 *  Lean is the source of all of this. Every surface, every report, every article derives from it, so duplication in
 *  Lean is duplication everywhere downstream — and the census had been discovering it after the fact rather than the
 *  generator refusing it up front. 85 keys seal a statement some other key already sealed. Most are legitimate: the
 *  wings verify STANDALONE (no lean file imports another, which is what keeps each one kernel-independent), so the
 *  ℤ/9 table sealed in Core and again in Ring is a deliberate re-seal. That is a real cost paid for
 *  a real property, and the honest treatment is to NAME it.
 *
 *  What is NOT legitimate is a statement sealed twice inside ONE file, where no independence is bought — measured
 *  once, in Nim.lean, where a named theorem claiming the Sprague–Grundy law re-proved a single row of the nim table
 *  the same wing already held. It now walks all 64 pairs and the name is falsifiable by the structure it names.
 *
 *  So: the index records every reuse that exists, and this finder holds the ledger to it. A duplicate inside one
 *  file always fails. A cross-wing reuse fails unless the index already declares it — the list may only SHRINK,
 *  the same law the key-entropy backlog carries, so the count of duplication cannot quietly grow. */
export function linesGaps(): Gap[] {
  const gaps: Gap[] = []
  const census = statementCensus()
  let declared: Record<string, string[]> = {}
  try { declared = (JSON.parse(rd('lean/statement-index.json')) as { reuse: Record<string, string[]> }).reuse } catch { /* no index yet: every reuse is new */ }
  for (const g of census.groups) {
    const files = [...new Set(g.files)]
    if (files.length === 1) {
      gaps.push({
        what: `${files[0]}: seals "${g.statement}" TWICE — ${g.keys.join(' and ')} are the same Lean line in the same wing`,
        fix: 'one of them must state something the other does not, or be withdrawn. Re-sealing inside one file buys no kernel independence — it is the same proof, checked twice, indexed twice, and published twice',
      })
      continue
    }
    const known = declared[g.statement]
    if (!known) gaps.push({
      what: `NEW cross-wing reuse: "${g.statement}" is sealed by ${g.keys.join(', ')} across ${files.join(' + ')}, and lean/statement-index.json does not declare it`,
      fix: 'if the re-seal is deliberate (a standalone wing may not import another, so a shared fact is re-proven on purpose), run `npm run gen:lines` to declare it; if it is an accident, withdraw the later key. The index may only shrink — a new entry is a decision',
    })
    else if (known.length !== g.keys.length || !g.keys.every((k) => known.includes(k))) gaps.push({
      what: `reuse of "${g.statement}" changed: declared ${known.join(', ')} but the ledger now seals it as ${g.keys.join(', ')}`,
      fix: 'run `npm run gen:lines` after confirming the change is intended — a reuse set that drifts silently is the duplication growing under a declaration that no longer describes it',
    })
  }
  return gaps
}

// ── words: REMOVED. It capped a theorem NAME at a word count, and a name is prose about a proof—
// the kernel verifies the same statement whatever it is called. It caught no Lean violation, so it was custom logic
// over spelling, and tuning its limit (3 -> the derived 6) was elaborating something that should not exist. The
// naming law survives where it belongs: name the OPERATION, as Glagolitic does. That is a law for a person writing a
// wing, not a gate on the kernel's output. lean/key-entropy.json and its test go with it.
export function vacuousGaps(): Gap[] {
  // strip outer parens ONLY when the first '(' closes at the last ')' — a greedy strip mangles "(A) ∨ (B)"
  // into "A) ∨ (B" and makes the detector miss what it exists to catch (measured: 1 found instead of 12)
  const norm = (s: string): string => {
    let t = s.trim().replace(/\s+/g, ' ')
    for (;;) {
      if (!(t.startsWith('(') && t.endsWith(')'))) return t
      let d = 0
      for (let i = 0; i < t.length; i++) {
        if (t[i] === '(') d++
        else if (t[i] === ')') { d--; if (d === 0 && i !== t.length - 1) return t }
      }
      t = t.slice(1, -1).trim()
    }
  }
  const strip = (s: string): string => norm(norm(s).replace(/\s*:\s*(Nat|Int|Prop)\b/g, ''))
  const split = (s: string, op: string): [string, string] | null => {
    let d = 0
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') d++
      else if (s[i] === ')') d--
      else if (d === 0 && s.startsWith(op, i)) return [s.slice(0, i), s.slice(i + op.length)]
    }
    return null
  }
  const why = (raw: string): string | null => {
    const s = strip(raw)
    if (s === 'True') return 'True — proves nothing at all'
    for (const op of ['↔', '→', '∨', '∧', '=']) {
      const parts = split(s, op)
      if (!parts) continue
      const [l, r] = [strip(parts[0]), strip(parts[1])]
      if (op === '∨') {
        if (strip(r.replace(/^¬\s*/, '')) === l) return 'P ∨ ¬P — excluded middle, true for ANY P'
        if (l.includes('=') && r.includes('≠') && r.replace('≠', '=') === l) return 'P ∨ ¬P via ≠ — excluded middle, true for ANY P'
        continue
      }
      if (l === r) return op === '=' ? 'x = x — reflexivity, true for ANY x' : `P ${op} P — a tautology, true for ANY P`
    }
    return null
  }
  const gaps: Gap[] = []
  for (const t of theorems()) {
    if (t.key.startsWith('oos_')) continue // declared out-of-scope markers: void ON PURPOSE, and say so by name
    const w = why(t.statement)
    if (w) gaps.push({ what: `${t.file}: theorem ${t.key} is VACUOUS — \`${t.statement}\` is ${w}`, fix: `rewrite it to prove its own name in arithmetic, or drop the claim and rename it for what it actually proves (the martial-arts standard); if it is a deliberate scope marker, rename it oos_*` })
  }
  return gaps
}

// ── re: THE REVERSE-ENGINEERING POSTURE — the two-layer trial, folded as its decidable half. Layer 1 (the
// imprint transport) REVERSES BY DESIGN: the uuid IS the message — 115 payload bits placed into the 122 free bit
// positions (128 minus RFC 4122's six, minus the 7-bit length header), so "reverse engineering" is picking the
// bits back out: a bijection with an exact inverse, no search, no key, microseconds. Layer 2 (the sealed layer)
// reverses ONLY by key recovery: one full KDF derive per passphrase guess, Grover merely halving the exponent.
// The posture is decidable; the per-guess TIMING is measurement and stays at the heartbeats boundary. ──
export async function reGaps(): Promise<Gap[]> {
  const gaps: Gap[] = []
  const { roundTrips, imprintTextChain, readImprintTextChain, CAPACITY } = await import(join(ROOT, 'dist/imprint.js'))
  const { ITER, MAX_ITER } = await import(join(ROOT, 'dist/crypt.js'))
  if (CAPACITY !== 128 - 6 - 7) gaps.push({ what: `transport capacity ${CAPACITY} ≠ 115 = 128−6−7`, fix: 'the codec drifted from theorem imprint_capacity_chain — restore the derivation in src/imprint.ts' })
  if (!roundTrips('10110011101')) gaps.push({ what: 'transport round-trip broken — readImprint(imprint(m)) ≠ m', fix: 'the bijection is the design; repair src/imprint.ts until roundTrips holds for every message ≤ 115 bits' })
  const probe = 'reverse me'
  if (readImprintTextChain(imprintTextChain(probe)) !== probe) gaps.push({ what: 'text chain round-trip broken', fix: 'imprintTextChain/readImprintTextChain must invert exactly — repair the chunking in src/imprint.ts' })
  if (!(0 < ITER && ITER <= MAX_ITER)) gaps.push({ what: `KDF work factor ${ITER} outside (0, ${MAX_ITER}]`, fix: 'restore ITER/MAX_ITER in src/crypt.ts so 0 < ITER ≤ MAX_ITER holds (OWASP 2023 puts ITER at 600000)' })
  gaps.push(...absenceGaps())
  return gaps
}

// ── the ABSENCE-CLAIM LAW — an absence claim must carry the presence pointer. The system DOES encrypt (the
// ChaCha20-Poly1305 sealed layer, KAT-verified, its salt-key-nonce derivation rotating with every advancing step —
// salt_seq_injective); so any prose saying "not encryption / not a cipher / no secrecy" about a keyless component
// LIES BY OMISSION unless, in the same breath, it points to where encryption lives. Scoped truth + pointer = honest;
// scoped truth alone = the lie the trial drains. ──
export function absenceGaps(): Gap[] {
  const gaps: Gap[] = []
  const POINTER = /chacha|sealed (envelope|layer)|crypt|sealmessage/i
  const ABSENCE = /not?\s+(a\s+)?(encryption|cipher)|no\s+secrecy/gi
  const scan = (dir: string, exts: string[]) => {
    for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      if (e.isDirectory() || !exts.some((x) => e.name.endsWith(x))) continue
      const p = join(ROOT, dir, e.name)
      const txt = fileText(p)
      for (const m of txt.matchAll(ABSENCE)) {
        const ctx = txt.slice(m.index < 400 ? 0 : m.index - 400, m.index + 400)
        if (!POINTER.test(ctx))
          gaps.push({ what: `${dir}/${e.name}: absence claim "${m[0]}" with no presence pointer in reach`, fix: 'name where encryption lives in the same breath — "secrecy lives in the sealed ChaCha20-Poly1305 layer, rotating per step (salt_seq_injective)" — an absence claim without the pointer lies by omission' })
      }
    }
  }
  scan('src', ['.ts']); scan('src/quantum', ['.ts']); scan('docs', ['.md'])
  return gaps
}

// ── blocks: THE TWO SHAPES MUST NEVER DISAGREE. "Each theorem is a block" (the captain, 2026-08-18) — uuidna
// emits the same seed tree TWICE: payload-sync.json (one page per theorem, nested-docs children, a lexical
// `content` field — Payload's DEFAULT) and payload-sync-blocks.json (one page per WING, a `layout` array of one
// `theorem` block per theorem — the shape Payload's OWN production site, payloadcms/website, actually speaks).
// Same source, same per-theorem address (documentAddress of that theorem's lexical root), two envelopes. This
// checks the invariant that makes "two envelopes" honest rather than "two sources of truth": every theorem's
// address must AGREE across both files, and every block address must be DISTINCT — the exact class that once
// collapsed 235 theorems onto one wing address, now guarded on both shapes at once.
// SKIPS (returns clean— these are optional exports (`npm run payload:sync`),
// not part of every reconcile, so guard does not force-generate them; when they exist, they must agree.
export function blocksGaps(): Gap[] {
  const gaps: Gap[] = []
  const richPath = join(ROOT, 'src', 'seeds', 'payload-sync.json')
  const blocksPath = join(ROOT, 'src', 'seeds', 'payload-sync-blocks.json')
  if (!existsSync(richPath) || !existsSync(blocksPath)) return gaps
  const rich = JSON.parse(fileText(richPath)) as { docs: { slug: string; parent: string | null; uuidnaAddress: string }[] }
  const blocksFile = JSON.parse(fileText(blocksPath)) as { docs: { layout: { slug: string; uuidnaAddress: string }[] }[] }
  const blocks = blocksFile.docs.flatMap((d) => d.layout)

  const seen = new Map<string, string>()
  for (const b of blocks) {
    const prior = seen.get(b.uuidnaAddress)
    if (prior) gaps.push({ what: `payload-sync-blocks.json: "${prior}" and "${b.slug}" share address ${b.uuidnaAddress} — the wing-address collision class, back in the blocks shape`, fix: 'each block must be addressed from its OWN content (documentAddress of its lexical root)— see toPayloadBlocksDoc in src/payload-seed.ts' })
    seen.set(b.uuidnaAddress, b.slug)
  }

  const richBySlug = new Map(rich.docs.filter((d) => d.parent !== null).map((d) => [d.slug, d.uuidnaAddress]))
  for (const b of blocks) {
    const richAddr = richBySlug.get(b.slug)
    if (richAddr && richAddr !== b.uuidnaAddress)
      gaps.push({ what: `"${b.slug}" has address ${richAddr} in payload-sync.json but ${b.uuidnaAddress} in payload-sync-blocks.json — the two envelopes disagree about one theorem's identity`, fix: 'both emitters must call documentAddress on the SAME lexical root for a given theorem; regenerate both with `npm run payload:sync` after checking toPayloadDocs and toPayloadBlocksDoc compute identically' })
  }
  return gaps
}

// ── frozen: A FACT MUST COMPUTE IN AT LEAST ONE DIMENSION. Its first draft read only the ledger and convicted two
// innocents: two purged Clay keys looked like closed arithmetic (`15 - 15 = 0`) but their
// generators compute LIVE — refusedCount runs adjudicate() over all fifteen probes, and emit() hard-exits when a
// mirror returns false, so one probe verifying blocks the wing from regenerating at all. The Lean there is a frozen
// WITNESS of a live check. So the finder now reads BOTH halves from the generator: a fact
// is flagged only when its Lean statement AND its js mirror are both closed constants — nothing walked, nothing
// measured, no path from the name to a computation in either dimension. That is the real class, and it is small.
export function frozenGaps(): Gap[] {
  const gaps: Gap[] = []
  const walks = (s: string): boolean => /\[[^\]]*,|nth |List\.|\bfun\b|=>|range|filter|map|foldl|\ball\b|\bany\b|length|≠|!==|\.some|\.every|adjudicate|runTrial|theorems\(/.test(s)
  const measured = /_(refused|probed|cases|total|covered|audited|counted|scanned|checked)\b/i
  for (const f of readdirSync(join(ROOT, 'src/scripts')).filter((n) => n.startsWith('lean-') && n.endsWith('.ts'))) {
    const src = fileText(join(ROOT, 'src/scripts', f))
    // each authored fact: its key, its js mirror line, and its lean line — read from the generator, the one source
    for (const m of src.matchAll(/key: '([a-z0-9_]+)'[\s\S]{0,900}?(?=\n  \{ key: |\n\])/g)) {
      const [block, key] = [m[0], m[1]]
      if (!measured.test(key)) continue
      const js = /js: \(\) =>([^\n]*)/.exec(block)?.[1] ?? ''
      const lean = /lean: [`'"]theorem [a-z0-9_]+ :([^\n]*)/.exec(block)?.[1] ?? ''
      if (!lean) continue
      if (walks(js) || walks(lean)) continue
      gaps.push({ what: `${f}: ${key} computes in NO dimension — its Lean (\`${lean.trim().slice(0, 48)}…\`) and its js mirror are both closed constants, while its name claims a measured quantity`, fix: 'make one half compute: have the js mirror measure the live quantity (as lean-clay does with adjudicate() over its probes, which emit() hard-fails on), or have the Lean walk the structure it names. A name that counts live things must be falsifiable by them' })
    }
  }
  return gaps
}

// ── state: THE FOLDED QUESTION HAS ONE COPY. `npm run state` folds the laws, the ledger, the sync, the finders and
// the next command into one receipted answer, and a workflow that re-implements any of it in a shell one-liner is a
// SECOND copy of a question that already has an answer — the copy that lives in CI is the one nobody runs locally,
// so it drifts silently and is discovered only when it disagrees. This is the `dry` law applied to questions rather
// than to boilerplate. Scoped to the workflows on purpose: guard.ts and state.ts legitimately read these sources
// (one is the gate, one is the fold), and reconcile legitimately runs the generators.
export function stateGaps(): Gap[] {
  const gaps: Gap[] = []
  const FOLDED: [RegExp, string][] = [
    [/editorialState\(/, 'the editorial drained/usable counts'],
    [/publicationStatus\(/, 'the license-law and conformance verdicts'],
    [/rev-list --left-right/, 'the ahead/behind sync'],
    [/axioms\.json/, 'the axiom witness'],
  ]
  const dir = join(ROOT, '.github/workflows')
  if (!existsSync(dir)) return gaps
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() || !e.name.endsWith('.yml')) continue
    // COMMENTS ARE NOT IMPLEMENTATIONS — stripped before the scan, the same lesson the unwired-script detector
    // learned the hard way: the comment explaining this rule names the very sources it forbids, and a raw-text
    // scan convicted it. Reproduced here on the first run, on my own comment.
    const txt = fileText(join(dir, e.name)).split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
    for (const [rx, what] of FOLDED) {
      if (!rx.test(txt)) continue
      gaps.push({ what: `.github/workflows/${e.name} re-implements ${what}, which \`npm run state\` already folds`, fix: 'replace the hand-written check with `npm run state -- --assert` — one command for the operator and the workflow, so the answer cannot drift between them; if this workflow genuinely needs the raw value, take it from the state receipt rather than recomputing it' })
    }
  }

  // THE FOLD ITSELF MUST STAY WHOLE — state.ts's own finders array is a SECOND list of guard's blocking finder
  // names, and it drifted the day `folders` and `blocks` landed in the guard without landing here: state reported
  // nine finders while ten were actually gating the push. A fold that quietly omits members is worse than no fold,
  // because it reads as complete. Compares guard's blocking `{ name: 'x', run: ... }` entries against state.ts's
  // own `['x', xGaps()...]` array — both read fresh from source.
  // SELF-EXEMPT, by name and reason— the same discipline finder-coverage.test.ts's ON_DEMAND
  // uses. 'state' cannot report on itself (state.ts calling stateGaps() to build state.ts is not a check, it is
  // a loop). 'micro' needs a built site (needsBuiltSite in guard.ts) and state.ts never builds one, so it would
  // either always read clean-by-absence or force a site build on every `npm run state` call — the wrong cost for
  // a command whose whole point is to be cheap enough to ask before anything.
  const STATE_EXEMPT = new Set(['state', 'micro'])
  const guardSrc = fileText(join(ROOT, 'src', 'scripts', 'guard.ts'))
  const stateSrc = fileText(join(ROOT, 'src', 'scripts', 'state.ts'))
  // ONLY the blocking array — guard.ts's ADVISORY tier (e.g. 'seo') uses the identical `{ name: 'x', run: ...`
  // shape but is deliberately non-blocking, so it is not part of what state.ts's fold owes.
  const findersBlock = guardSrc.slice(guardSrc.indexOf('const FINDERS'), guardSrc.indexOf('const ADVISORY'))
  const guardNames = new Set([...findersBlock.matchAll(/\{ name: '([a-z]+)', run:/g)].map((m) => m[1]).filter((n) => !STATE_EXEMPT.has(n)))
  // SYMMETRY WITH THE GUARD SIDE ABOVE. guard.ts has two tiers and only its BLOCKING one is read; state.ts now has
  // two tiers for the same reason, so only ITS blocking one is read. Its `advisory` array uses the identical
  // ['name', xGaps(…)] shape, and without this slice every deliberately-demoted finder reads as a fold naming a
  // gate that does not gate — the finder would fire on the very declaration that makes the demotion honest.
  // `(await coherentGaps()).length` — the invocation may be wrapped in (await …)
  const stateFindersBlock = stateSrc.slice(stateSrc.indexOf('const finders'))
  const stateNames = new Set([...stateFindersBlock.matchAll(/\['([a-z]+)',\s*\(?(?:await )?\w+Gaps\(/g)].map((m) => m[1]))
  for (const n of guardNames) if (!stateNames.has(n)) gaps.push({ what: `guard.ts blocks on '${n}' but state.ts's finders array does not report it — the fold is incomplete`, fix: `add ['${n}', ${n}Gaps().length] (or the shape its guard.ts entry uses — .gaps.length, or await if async) to the finders array in src/scripts/state.ts` })
  for (const n of stateNames) if (!guardNames.has(n) && !STATE_EXEMPT.has(n)) gaps.push({ what: `state.ts reports '${n}' but guard.ts does not block on it — the fold names a finder that is not actually gating`, fix: `either wire '${n}' into guard.ts's blocking FINDERS, or remove it from state.ts's finders array` })
  return gaps
}

// ── folders: ONE WORD, ONE NAME, MANY FACES. A module folder is a single concept, so it carries `index.*` files and
// nothing else — index.ts is what it does, index.md is what it means, and a further extension is a further face of
// the same thing. A second NAMED file inside it is a second name for one concept, and a hyphenated folder is two
// concepts sharing a directory; both are the drift this refuses. src/quantum/clock is the shape: one word, index
// faces only. COLLECTIONS are exempt by name— scripts, test, lean and theorems hold many
// independent things rather than one concept, and calling them modules would be the same category error inverted.
export function foldersGaps(): Gap[] {
  const gaps: Gap[] = []
  // SINGULAR = MODEL, PLURAL = COLLECTION — the captain's law, 2026-08-18. The exemption is DERIVED from the name
  // rather than kept in a list I have to remember to update: a singular folder is one concept and carries index
  // faces only; a plural folder is many independent things and its members are named. `clock` is a model, so it
  // holds index.ts and index.md; `scripts` is a collection, so it holds a hundred named files and that is correct.
  const isCollection = (name: string): boolean => /s$/.test(name)
  const walk = (dir: string, rel: string): void => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue
      const r = rel ? rel + '/' + e.name : e.name
      const files = readdirSync(join(dir, e.name), { withFileTypes: true }).filter((f) => !f.isDirectory()).map((f) => f.name)
      if (!isCollection(e.name)) {
        if (!/^[a-z]+$/.test(e.name))
          gaps.push({ what: `src/${r} is not ONE WORD — a hyphenated folder is two concepts sharing a directory`, fix: `nest it: src/${r.replace(/-/g, '/')}/index.ts, so each word names a folder and the leaf holds the faces` })
        for (const f of files.filter((n) => !/^index\./.test(n)))
          gaps.push({ what: `src/${r} is SINGULAR (a model) but holds the named file ${f} — one concept, one name, and the extension names the face`, fix: `move it to src/${r}/${f.replace(/\.[^.]+$/, '').replace(/-/g, '/')}/index${f.slice(f.lastIndexOf('.'))} and re-export from src/${r}/index.ts — or rename the folder plural if it is genuinely a collection` })
      }
      // A COLLECTION'S MEMBERS ARE ITS OWN BUSINESS — do not descend. src/seeds holds ninety content-addressed
      // page seeds whose names are uuids by construction; judging them as models would demand a uuid be one word.
      if (!isCollection(e.name)) walk(join(dir, e.name), r)
    }
  }
  walk(join(ROOT, 'src'), '')
  return gaps
}

// ── negation: NO LEAN LEAD IS LOST IN PROSE, EVEN NEGATING. The absence law above holds one case (a cipher denied
// must name where encryption lives); this is that law at full width. Every honest boundary this project states —
// "not a solver", "solves none", "NOT PROVEN", "never a chip", "not truth" — is a CLAIM ABOUT WHAT IS PROVEN, and a
// negation stated bare drops the lead: the reader is told what the work is not and never handed the sealed thing
// that fixes the bound. Scoped truth + pointer is honest; scoped truth alone is the omission the trial drains, and
// it is the more dangerous half here, because a demarcation READS like rigour while pointing at nothing.
// A pointer is a /theorem/<key> link, a `theorem <key>` citation, or any sealed key named in the same breath —
// resolved against the LIVE ledger.
export function negationGaps(): Gap[] {
  const gaps: Gap[] = []
  const keys = new Set(theorems().map((t) => t.key))
  const NEG = /\b(?:NOT|not)\s+(?:a\s+|an\s+|the\s+)?(?:solver|proof|physics|medicine|chip|claim|cipher|encryption|oracle|truth)\b|\bnever\s+(?:a|an|the)\s+\w+|\bsolv(?:e[sd])?\s+none\b|\bNOT PROVEN\b|\bno\s+(?:quantum advantage|claim|maximum)\b/g
  const REACH = 350 // the "same breath" — a pointer further away is not in the reader's view of the boundary
  const pointed = (ctx: string): boolean =>
    /\/theorem\/[a-z0-9_]+|theorem\s+[a-z][a-z0-9_]{4,}/i.test(ctx) ||
    [...ctx.matchAll(/\b([a-z][a-z0-9_]{6,})\b/g)].some((m) => keys.has(m[1]))
  for (const f of readdirSync(join(ROOT, 'docs')).filter((n) => n.endsWith('.md'))) {
    const txt = fileText(join(ROOT, 'docs', f))
    for (const m of txt.matchAll(NEG)) {
      const at = m.index ?? 0
      if (pointed(txt.slice(at < REACH ? 0 : at - REACH, at + REACH))) continue
      gaps.push({ what: `docs/${f}: the boundary "${m[0]}" is stated bare — no sealed theorem within reach`, fix: `name the proof that fixes this bound in the same breath (a /theorem/<key> link or "theorem <key>"); a negation without its lead tells the reader what the work is not and never where the work is` })
    }
  }
  return gaps
}

// ── drain-coverage: THE DRAIN STAGES WHAT RECONCILE REGENERATES. The drain stages DRAIN_PATHS and nothing else —
// the right law, since sweeping `git add -A` on a shared tree steals a sibling's edit into a signed commit. But the
// two lists then have to AGREE: a generator in the reconcile chain whose output is not a drain path is rewritten on
// every run and staged by none, so reconcile reaches `git commit` with nothing added and dies on git's own error
// message rather than its own. Measured 2026-08-17: five outputs regenerated, zero staged, the run lost.
// Write targets are computed through variables in the generators, so this checks the DECLARATION (RECONCILE_OUTPUTS)
// from both sides: every generator the chain invokes must declare what it writes, and every declared output must be
// a drain path. Adding a generator to reconcile without declaring it fails here, at guard speed, before a run dies.
export function drainGaps(): Gap[] {
  const gaps: Gap[] = []
  const checkChain = (chainName: string, invoked: string[], declared: Readonly<Record<string, readonly string[]>>): void => {
    for (const g of invoked)
      if (!(g in declared))
        gaps.push({ what: `${chainName} invokes ${g} but its output map does not declare what it writes`, fix: `add '${g}': ['<the path(s) it writes>'] to the declaration in src/scripts/api.ts — an empty array if it only reports` })
    for (const [g, outs] of Object.entries(declared)) {
      if (!invoked.includes(g)) gaps.push({ what: `the ${chainName} declaration names ${g}, which ${chainName} no longer invokes`, fix: `remove '${g}' from its declaration in src/scripts/api.ts — a declaration for a generator nothing runs is a claim about work that does not happen` })
      for (const out of outs)
        if (!DRAIN_PATHS.some((p) => out === p || out.startsWith(p + '/')))
          gaps.push({ what: `${g} (${chainName}) writes ${out}, which the drain does not stage (absent from DRAIN_PATHS)`, fix: `add '${out}' to DRAIN_PATHS in src/scripts/api.ts — ${chainName} rewrites it every run, so unstaged it drifts dirty until a human notices` })
    }
  }
  const reconcileSrc = fileText(join(ROOT, 'src/scripts/reconcile.ts'))
  // THE MANIFEST IS PART OF THE CHAIN. reconcile invokes `generate`, which runs every emitter in generate.ts's
  // manifest — so naming generate alone would let eighteen generators escape this check the moment the two lists
  // were merged. Expanding it keeps the law exactly as strong as when each was listed by hand: every generator the
  // chain reaches, directly or through the manifest, must declare what it writes.
  const manifest = [...fileText(join(ROOT, 'src/scripts/generate.ts')).matchAll(/file: '([a-z-]+)\.js'/g)].map((m) => m[1]!)
  const direct = [...new Set([...reconcileSrc.matchAll(/dist\/scripts\/([a-z-]+)\.js/g)].map((m) => m[1]))]
  const reconcileInvoked = [...new Set(direct.includes('generate') ? [...direct, ...manifest] : direct)]
  checkChain('reconcile', reconcileInvoked, RECONCILE_OUTPUTS)

  // AND THE DECLARATION MUST BE HEXBIT-COMPUTABLE. Naming a path proves nothing: a typo, a renamed artifact or a
  // generator that stopped writing all read the same as a correct declaration, because nothing ever measured the
  // thing declared. An output that EXISTS has a width — bytes fold to a hexbit magnitude through the unit — and a
  // declaration whose subject cannot be measured is a claim about a file nobody has. Every reconcile generates
  // before this runs, so an absent output means the declaration is wrong, not that the run was early.
  for (const [g, outs] of Object.entries(RECONCILE_OUTPUTS))
    for (const o of outs as readonly string[])
      if (!existsSync(join(ROOT, o)))
        gaps.push({
          what: `the reconcile declaration says ${g} writes ${o}, and no such path exists — a declared output nothing can measure`,
          fix: `point the declaration at what the generator actually writes, or drop the entry — regenerate first with \`node dist/scripts/generate.js\` if the tree has never been generated`,
        })

  // THE SAME LAW, THE OTHER CHAIN — `docs:build` regenerates tracked files too (gen-captain-claims' two outputs,
  // one declared and one not, drifted docs/captain-claims.md dirty for most of a session before this existed).
  // Read from package.json's OWN script string.ts, so a change to docs:build's chain is caught the
  // same way a change to reconcile's chain is.
  const pkg = JSON.parse(fileText(join(ROOT, 'package.json'))) as { scripts: Record<string, string> }
  const docsBuildInvoked = [...new Set([...(pkg.scripts['docs:build'] ?? '').matchAll(/dist\/scripts\/([a-z-]+)\.js/g)].map((m) => m[1]))]
  checkChain('docs:build', docsBuildInvoked, DOCS_BUILD_OUTPUTS)
  // .gitattributes is GENERATED from this same list, so the derived layer is unmergeable everywhere it is derived.
  // A path that gains a generator but not the mark comes back as a hand-resolved merge conflict — the manual work
  // this whole finder exists to end (measured: spin-manifest.json conflicted four times in one session).
  const attrs = existsSync(join(ROOT, '.gitattributes')) ? fileText(join(ROOT, '.gitattributes')) : ''
  for (const p of DRAIN_PATHS) {
    const line = p.endsWith('/') || !p.includes('.') ? p + '/**' : p
    if (!attrs.includes(`${line} merge=derived`))
      gaps.push({ what: `${p} is a drain path but .gitattributes does not mark it unmergeable`, fix: 'run `npm run gen:gitattributes` — .gitattributes is generated from DRAIN_PATHS; a derived file has no merge, only a recomputation' })
  }
  return gaps
}

// ── precede: THE SOURCE IS STAGED BEFORE WHAT IT DERIVES. The drain stages DRAIN_PATHS and nothing else, by
// design — a sibling session's in-flight source edit must never be swept into a machine commit. The cost of that
// design is this inversion: with the derived layer staged and its Lean source still unstaged, a commit publishes
// generated.ts, CHANGELOG, README and .zenodo.json describing wings origin cannot see. The receipts then seal a
// ledger state nobody can recompute — integrity claimed over source that was never published, which is the one
// failure this repo cannot absorb, because every downstream proof cites those receipts.
// CI checks out clean and stages nothing, so this finder returns green there by construction. It exists to hold the
// LOCAL act — which is precisely where the drain stages, and where no other gate was looking. ──
export function precedeGaps(cwd: string = ROOT): Gap[] {
  const gaps: Gap[] = []
  const git = (cmd: string): string[] => {
    try { return execSync(cmd, { cwd, encoding: 'utf8' }).split('\n').filter(Boolean) } catch { return [] }
  }
  const staged = git('git diff --cached --name-only')
  if (!staged.length) return gaps                        // nothing armed — nothing can invert
  // A glob becomes a regex by escaping EVERYTHING except the one metacharacter it owns. The previous form escaped
  // only `.`, so any other regex character in a DRAIN_PATHS entry — `+`, `?`, `(`, `[` — would have been read as
  // regex syntax rather than as itself, silently widening the match or throwing on an unbalanced bracket. No entry
  // contains one today, which is exactly why this would have failed the day someone added the first (the split on
  // `*` keeps the wildcard's meaning while the escape covers the rest — js/incomplete-sanitization).
  const globToRe = (p: string): RegExp =>
    new RegExp('^' + p.split('*').map((seg) => seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*') + '$')
  const isDerived = (f: string): boolean => DRAIN_PATHS.some((p) => p.includes('*')
    ? globToRe(p).test(f)
    : f === p || f.startsWith(p + '/'))
  const stagedDerived = staged.filter(isDerived)
  if (!stagedDerived.length) return gaps
  // The whole derived layer is a function of two things: the Lean corpus and the generators that read it. Either one
  // dirty-but-unstaged makes the staged output unreproducible from what a commit would actually publish.
  const unstagedSource = git('git diff --name-only')     // worktree vs INDEX: modified and NOT staged
    .filter((f) => /^lean\/[^/]+\.lean$/.test(f) || /^src\/scripts\/lean-.+\.ts$/.test(f))
  if (unstagedSource.length) {
    const show = (xs: string[]): string => xs.slice(0, 3).join(', ') + (xs.length > 3 ? `, … (${xs.length} total)` : '')
    gaps.push({
      what: `${stagedDerived.length} derived file(s) are STAGED (${show(stagedDerived)}) while ${unstagedSource.length} source file(s) they are computed from are modified and NOT staged (${show(unstagedSource)})`,
      fix: `stage the source in the SAME commit as its derived output — \`git add ${unstagedSource.slice(0, 2).join(' ')}${unstagedSource.length > 2 ? ' …' : ''}\` — or disarm the index with \`git restore --staged .\` and commit deliberately. Derived committed without its source seals a ledger origin cannot recompute.`,
    })
  }
  return gaps
}

// ── scripts: THE DRY LAW, APPLIED TO package.json. ~49 scripts were one identical shape —
// "<name>": "npm run build && node dist/scripts/<file>.js" — a hand-typed line per script, the same repetition the
// `dry` finder refuses in source, living in JSON where no finder was looking. It had already rotted in the only way
// a hand-typed list can: the lean:<domain> family named 30 domains for a ledger carrying 66, so most domains had no
// entry and nothing said so. `npm run x -- <script>` dispatches all of them from DISCOVERY, so the list cannot lag
// what exists.
// A thin wrapper KEEPS its own entry when something OUTSIDE package.json calls it by name — those are contracts with
// CI, a git hook, or a reader following the README — and that set is COMPUTED here from every such surface at once
// (workflows + hooks + README + docs/*.md + package.json's own composite scripts)
// gains or loses an external caller changes tier by recomputation rather than by anyone remembering. ──
// ── stale: A CHAIN MAY NOT READ dist/ FROM BEFORE ITS OWN GENERATOR RAN ─────────────────────────────────────
// lean-all.js rewrites src/theorems/generated.ts — the ledger itself. Every step after it that runs `node dist/`
// imports the ledger tsc compiled BEFORE that rewrite, so it reads the previous count and then PUBLISHES it.
// This is measured, not imagined: gen-feed sealed a DataFeed of 1453 nodes while the ledger it claims to feed
// already held 1456, and the only reason anyone noticed is that the two were compared by hand. Running the chain
// a second time made it agree, which is the worst possible symptom — a defect that a retry hides.
//
// The knowledge already existed in the repository and simply never reached the chain that needed it: `audit`
// inserts its own `npm run build` after `npm run lean`, while standalone `npm run lean` did not. One composite
// knew the rule and the other did not, and nothing held them to the same answer.
//
// THE LAW, stated for the next generator rather than this one: a step that rewrites compiled SOURCE invalidates
// dist, and dist must be rebuilt before anything reads it again. GENERATORS is named rather than discovered
// because the guard cannot infer intent from a write — but once a step is named, the ORDER is held mechanically,
// which is the part that was manual before.
export function staleGaps(): Gap[] {
  const gaps: Gap[] = []
  const pkg = JSON.parse(fileText(join(ROOT, 'package.json'))) as { scripts: Record<string, string> }
  const GENERATORS = ['lean-all.js']
  for (const [name, body] of Object.entries(pkg.scripts)) {
    for (const gen of GENERATORS) {
      const at = body.indexOf(gen)
      if (at < 0) continue
      const after = body.slice(at + gen.length)
      const reads = after.indexOf('node dist/')
      if (reads < 0) continue                       // nothing reads dist afterwards — nothing can go stale
      const rebuilt = after.indexOf('npm run build')
      if (rebuilt >= 0 && rebuilt < reads) continue // rebuilt before the first read — the order holds
      gaps.push({
        what: `package.json script "${name}" runs ${gen} and then reads dist/ with no rebuild between — every later step sees the ledger as it stood BEFORE the generator wrote it`,
        fix: `insert \`npm run build\` immediately after ${gen} in the "${name}" script. The generator rewrites compiled source, so dist is stale until tsc runs again, and a derived surface published from stale dist states a count the ledger does not hold.`,
      })
    }
  }
  return gaps
}

export function scriptsGaps(): Gap[] {
  const gaps: Gap[] = []
  const pkg = JSON.parse(fileText(join(ROOT, 'package.json'))) as { scripts: Record<string, string> }
  // a THIN WRAPPER runs exactly one dist script and nothing else — composites (audit, lean, docs:build) are real
  // pipelines and stay; `x` itself is the dispatcher.
  const THIN = /^(?:npm run build && )?node dist\/scripts\/[a-z0-9-]+\.js$/
  const thin = Object.entries(pkg.scripts).filter(([k, v]) => THIN.test(v.trim()) && k !== 'x')
  if (!thin.length) return gaps

  // EVERY EXTERNAL SURFACE AT ONCE — a name referenced from any one of them is a contract and keeps its entry.
  const surfaces: string[] = []
  const readDir = (rel: string, filter: (f: string) => boolean): void => {
    const dir = join(ROOT, rel)
    if (!existsSync(dir)) return
    for (const f of readdirSync(dir)) if (filter(f)) surfaces.push(fileText(join(dir, f)))
  }
  readDir('.github/workflows', (f) => f.endsWith('.yml') || f.endsWith('.yaml'))
  readDir('hooks', () => true)
  readDir('docs', (f) => f.endsWith('.md'))
  if (existsSync(join(ROOT, 'README.md'))) surfaces.push(fileText(join(ROOT, 'README.md')))
  // package.json's OWN composites count as callers: `next` invoking `npm run audit` is a real reference
  surfaces.push(Object.entries(pkg.scripts).filter(([k]) => !thin.some(([t]) => t === k)).map(([, v]) => v).join('\n'))
  const haystack = surfaces.join('\n')

  for (const [name, body] of thin) {
    // `npm run <name>` / `npm run --silent <name>` / `run: npm run <name>` — the word-boundary guard keeps
    // `npm run audit` from matching `audit:packages`.
    // The script name is escaped in full, not just `:` and `.`. A name is npm's to choose, and npm allows characters
    // that mean something to a regex — one `+` or `(` in a script name turned this guard into either a wrong match
    // or a thrown SyntaxError, and the gap it reports would have vanished quietly (js/incomplete-sanitization).
    if (new RegExp(`npm run (?:--silent )?${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z0-9:-])`).test(haystack)) continue
    const file = /dist\/scripts\/([a-z0-9-]+)\.js/.exec(body)![1]
    gaps.push({
      what: `package.json script "${name}" is a thin wrapper around dist/scripts/${file}.js that nothing outside package.json calls`,
      fix: `remove it and use \`npm run x -- ${file}\` — the dispatcher discovers every script, so a hand-typed entry can only lag what exists (the lean:<domain> family named 30 of 66 domains before it was collapsed). Keep an entry ONLY when CI, a git hook, the README or a docs page calls it by name.`,
    })
  }
  return gaps
}

// ── mirror: THE js MIRROR MUST AGREE BY VALUE. emit() hard-fails when a fact's `js:` mirror
// disagrees with its `lean:` statement — but a mirror doing Number arithmetic past 2^53 can AGREE BY LUCK: both
// sides round to the same wrong value, the check passes, and the ledger seals a fact its own mirror never really
// computed. Lean's Nat is arbitrary-precision; JavaScript's Number is a float with a 53-bit integer range.
// Measured 2026-08-19: three mirrors in one session needed BigInt (wgs84_polar_shorter at 1.9e18,
// hardware_above_landauer at 2.9e16 — which the author only caught by hand-checking), so the rule is enforced
// here rather than remembered. A repeated mistake is a missing finder.
// The check is conservative: read each fact's LEAN statement (the authority), find the integer literals and the
// products among them, and if anything can exceed 2^53 the mirror must be written in BigInt (an `n` literal or
// a BigInt(...) call). Number-only mirrors below the bound are untouched.
export function mirrorGaps(): Gap[] {
  const gaps: Gap[] = []
  const SAFE = 9007199254740991 // Number.MAX_SAFE_INTEGER = 2^53 - 1
  const dir = join(ROOT, 'src/scripts')
  for (const file of readdirSync(dir).filter((f) => /^lean-.*\.ts$/.test(f)).sort()) {
    const src = fileText(join(dir, file))
    // each fact is an object literal opening with `key:` — split there, so a block carries its own js + lean
    for (const block of src.split(/\{\s*key:\s*'/).slice(1)) {
      const key = /^([a-z0-9_]+)'/.exec(block)?.[1]
      const lean = /lean:\s*'((?:[^'\\]|\\.)*)'/.exec(block)?.[1]
      if (!key || !lean) continue
      const jsPart = block.slice(0, block.indexOf('lean:') >= 0 ? block.indexOf('lean:') : block.length)
      const usesBigInt = /\d+n\b|BigInt\s*\(/.test(jsPart)
      if (usesBigInt) continue // already arbitrary-precision — nothing to prove
      // the biggest value the statement can force: a bare literal, or the product of two literals side by side
      const lits = [...lean.matchAll(/\b(\d{2,})\b/g)].map((m) => Number(m[1])).filter((n) => Number.isFinite(n))
      // a plain fold— the determinism law admits no such call ANYWHERE, and this
      // finder tripped its own sibling scan on the first write. The idiom already lives at the top of this file.
      let worst = lits.reduce((hi, n) => (n > hi ? n : hi), 0)
      for (const m of lean.matchAll(/(\d+)\s*\*\s*\(?\s*(\d+)/g)) {
        const p = Number(m[1]) * Number(m[2])
        if (p > worst) worst = p
      }
      if (worst <= SAFE) continue
      gaps.push({
        what: `${file}: theorem ${key}'s js mirror uses Number arithmetic, but its Lean statement reaches ${worst.toExponential(2)} — past 2^53 (${SAFE})`,
        fix: `rewrite the mirror in BigInt (\`123n\` literals; \`/\` is then exactly Lean's Nat floor division). Above 2^53 a Number mirror can round to the SAME wrong value as the check it is compared against and pass by luck, so emit()'s agreement stops being evidence.`,
      })
    }
  }
  return gaps
}

// ── lanes: A PACKAGE TEST LANE MUST POINT AT FILES THE BUILD ACTUALLY PRODUCES. Found 2026-08-19: every one of
// the six workspace packages ran its tests out of `dist/test/`, a directory the build STOPPED producing when
// src/test was renamed src/tests. The folder survived in dist (gitignored, so never cleaned), its newest file a
// day stale, and all 108 package tests passed against frozen compiled code — green, and testing nothing current.
// A lane that names a missing file fails loudly; a lane that names a STALE file passes quietly, which is worse.
// So the check is existence against the live tree, per referenced path, for every workspace package.
export function lanesGaps(): Gap[] {
  const gaps: Gap[] = []
  let referenced = 0
  const pkgDir = join(ROOT, 'packages')
  if (!existsSync(pkgDir)) return gaps
  for (const pkg of readdirSync(pkgDir).sort()) {
    const manifest = join(pkgDir, pkg, 'package.json')
    if (!existsSync(manifest)) continue
    const j = JSON.parse(fileText(manifest)) as { name?: string; scripts?: Record<string, string> }
    const lane = j.scripts?.test
    if (!lane) { gaps.push({ what: `packages/${pkg} declares no test lane`, fix: `add a "test" script running its own dist tests, or drop the package — an untested surface is shipped on trust` }); continue }
    for (const ref of lane.match(/(?:\.\.\/)+dist\/[^\s]+/g) ?? []) {
      if (ref.includes('*')) continue // a glob resolves at run time; node --test reports its own empty match
      const abs = join(ROOT, ref.replace(/^(?:\.\.\/)+/, ''))
      if (!existsSync(abs))
        gaps.push({
          what: `packages/${pkg} (${j.name ?? pkg}) test lane names ${ref}, which the build does not produce`,
          fix: `repoint it at the live compiled path (the tests compile from src/tests/ to dist/tests/). A lane aimed at a directory the build no longer writes keeps PASSING against stale output — it does not fail, it silently stops testing.`,
        })
      else referenced++
    }
  }
  // THE FLOOR — existence alone does not catch a lane QUIETLY LOSING a file: drop a path from the list and every
  // remaining test still passes, the suite just gets smaller, and nothing objects. So the count may only GROW.
  // 21 referenced files carrying 108 tests, measured 2026-08-19 when the lanes were repointed off stale output.
  // (108 is load-bearing elsewhere in this ledger — 110 − 108 = 2 is two_coins, 5 × 108 = 540 closes the pentagon
  // — but its appearance HERE is coincidence, and is used only as a fixed reference.)
  if (referenced < LANE_FLOOR)
    gaps.push({
      what: `the workspace test lanes reference ${referenced} files, below the sealed floor of ${LANE_FLOOR}`,
      fix: `a lane lost a test file: the remaining tests still pass and the suite silently shrinks, so the count may only GROW. Restore the dropped path, or raise LANE_FLOOR deliberately in src/scripts/one-receipt.ts if a file was genuinely retired.`,
    })
  return gaps
}
/** the referenced-test-file floor: measured, may only grow — see lanesGaps */
const LANE_FLOOR = 21

// ── sources: A WING THAT ASSERTS A REAL-WORLD QUANTITY MUST NAME ITS AUTHORITY. Pure arithmetic needs no source
// (2 * 2 = 4 answers to the kernel alone), but the moment a wing states a MEASURED quantity — a distance in metres,
// an angle in degrees, an energy in joules — it is making a claim about the world, and the reader is owed where it
// came from. Written 2026-08-19 after two sailing theorems were sealed from first-principles derivation and both
// were wrong: the captain, who sails, corrected the pointing angle twice.
// TWO DETECTOR BUGS ARE BAKED IN HERE AS FIXED TESTS, because both let the offending file pass:
//   1. a bare four-digit year was accepted as a source — so the comment "2026-08-19" made an uncited wing look
//      cited. A DATE IS NOT A SOURCE. Only an authority, an RFC/ISO number, an author-year in parens, or a
//      named survey counts.
//   2. `\b` after `°` can never match (a degree sign is not a word character), so every angle in the tree was
//      invisible to the unit scan. Units that end in punctuation need their own alternation.
//   3. requiring a year as literally `(1904)` missed the real citation form `(The Rudder Publishing Company, 1904)`
//      — a false POSITIVE against a properly cited wing. A year CLOSING a parenthetical is the citation shape;
//      a bare year still is not. Three misses on two files is why this ships with a declared backlog
//      verdict on the whole tree.
// HONEST SCOPE: this is a prose heuristic. It was wrong twice on the one file known to violate it,
// so it is deliberately paired with a DECLARED backlog rather than trusted to judge the whole tree from scratch.
export function sourcesGaps(): Gap[] {
  const gaps: Gap[] = []
  const UNITS = /\b\d[\d,.]*\s*(?:°|deg\b|degrees\b|m\b|km\b|mm\b|kg\b|J\b|K\b|Hz\b|knots\b|nautical\b|volts\b|watts\b)|\bmeasured\b/i
  const SRC = /\bRFC\s?\d+|\bISO\b\s?\d|\bSI\b|\bWGS\s?84|\bNGA\b|\bIERS\b|\bNOAA\b|\bFIPS\b|\bOWASP\b|\bIAU\b|et al\.|(?:18|19|20)\d{2}\)|\bsurvey\b|\bredefinition\b/
  const listPath = join(ROOT, 'lean', 'uncited-wings.json')
  const backlog: string[] = existsSync(listPath) ? (JSON.parse(fileText(listPath)) as { wings: string[] }).wings : []
  const dir = join(ROOT, 'src/scripts')
  const live: string[] = []
  for (const f of readdirSync(dir).filter((x) => /^lean-.*\.ts$/.test(x)).sort()) {
    const s = fileText(join(dir, f))
    if (!UNITS.test(s) || SRC.test(s)) continue
    live.push(f)
    if (backlog.includes(f)) continue // grandfathered — owed
    gaps.push({
      what: `${f} asserts a real-world measured quantity but names no authority for it`,
      fix: `cite the source in the wing header or the fact's why — a standard (WGS 84, RFC 9562, ISO), an agency (NGA, IERS, NOAA), an author-year in parens, or a named survey. A DATE IS NOT A SOURCE. If the wing is pure arithmetic, say so and drop the measured framing; if it is genuinely empirical and predates this check, it belongs in lean/uncited-wings.json, which may only SHRINK.`,
    })
  }
  // THE LIST MAY ONLY SHRINK — a wing that gained a citation must leave it, or the backlog quietly stops meaning
  // anything (the same law lean/key-entropy.json is held to).
  for (const f of backlog)
    if (!live.includes(f))
      gaps.push({ what: `lean/uncited-wings.json still lists ${f}, which now cites a source (or no longer claims a measured quantity)`, fix: `remove '${f}' from lean/uncited-wings.json — the backlog may only shrink, and a stale entry grandfathers a wing that no longer needs it` })
  return gaps
}

// ── dormant: BUILT, REACHABLE, AND NEVER RUN. support-audit answers "is this module reachable from a root?" and
// books.ts passed it at 302/302 — imported by index.ts, re-exported on the public surface, entirely dead to every
// automated pass. Its book-reading capability sat unexercised for months while the research cron searched academic
// sources beside it. REACHABLE IS NOT EXERCISED, and the gap between the two is where a finished capability sleeps.
// The class is not new here: guard.ts records that `dry`, `seo` and `vacuous` were "invoked nowhere in the tree,
// and the vacuous one was holding 12 real findings the moment it was first executed". finder-coverage.test.ts
// closed that for FINDERS; nothing watched anything else.
// MEASURING THIS IS THE HARD PART, and three naive attempts were wrong before this one, each in a way worth keeping:
//   1. name-matching alone reported 108 — wrong, because `npm run x -- <script>` dispatches GENERICALLY, so a
//      script can be invocable without any chain ever naming it;
//   2. adding execSync/hook scanning reported 97 — wrong, because lean-all.ts discovers every lean-*.ts by
//      readdirSync, so 67 wings run on every build while being named nowhere at all;
//   3. only after modelling BOTH discovery mechanisms does the number hold at 33.
// A repo that invokes by discovery cannot be audited by grep — which is exactly why nothing caught books.ts.


export function dormantGaps(): Gap[] {
  const gaps: Gap[] = []
  const dir = join(ROOT, 'src/scripts')
  // the corpus a script can be NAMED in: npm scripts, workflows, git hooks, and any source that spawns it
  const pkg = JSON.parse(fileText(join(ROOT, 'package.json'))) as { scripts: Record<string, string> }
  let corpus = Object.values(pkg.scripts).join(' ')
  for (const d of ['.github/workflows', 'hooks']) {
    const p = join(ROOT, d)
    if (!existsSync(p)) continue
    for (const f of readdirSync(p)) corpus += ' ' + fileText(join(p, f))
  }
  // a sibling script naming this one counts as an invocation; the file naming ITSELF does not. Found 2026-08-19:
  // a script that documents its own usage as `node dist/scripts/<name>.js …` had that comment read
  // as proof something ran it — so ANY dormant script could exempt itself simply by naming its compiled form.
  // The corpus is therefore built per-candidate, with the candidate's own source left out. NOTE the compiled name
  // is written here WITHOUT the literal extension, because this finder reads raw source and would otherwise exempt
  // whichever file its own explanation names — the same use-versus-mention trap the determinism scan, the sources
  // finder and the comments finder each sprang today.
  const siblings = readdirSync(dir).filter((x) => x.endsWith('.ts'))
  const siblingSrc = new Map(siblings.map((f) => [f, fileText(join(dir, f))]))

  const listPath = join(ROOT, 'lean', 'dormant-scripts.json')
  const declared: string[] = existsSync(listPath) ? (JSON.parse(fileText(listPath)) as { scripts: string[] }).scripts : []

  const live: string[] = []
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'api.ts')) {
    // DISCOVERED, not named: lean-all.ts readdirs every lean-*.ts, so a wing runs on every build with no mention
    if (/^lean-/.test(f)) continue
    const base = f.replace(/\.ts$/, '')
    // AN INVOCATION, NOT A MENTION. Matching a bare filename read three kinds of prose as proof something ran:
    // a path inside a data list, a comment naming a generator, and `rd('src/scripts/…')` — which READS a script's
    // source rather than running it. So the pattern requires the RUNNER: `node <path>/<name>.js|.ts`, or the
    // dispatcher form `x -- <name>`. Both extensions count, because node 26 executes TypeScript directly and
    // publish.yml runs await-live that way so the live job needs no install and no build.
    // USE VERSUS MENTION, both directions, from api.ts: selfExcluded keeps a file from being its own witness, and
    // invokesFile demands one line carry both the filename and a runner — see the law stated there in full.
    if (invokesFile(corpus + '\n' + selfExcluded(f, siblingSrc), base)) continue
    // AN IN-PROCESS IMPORT IS AN INVOCATION. A script module does its work at top level, so `await import('./x.js')`
    // runs it exactly as `node x.js` did — when the guard stopped spawning a second interpreter for harmonic-scan
    // (a full boot and a second ledger load, the same waste already removed from predict-and-fill) the filename lost
    // its runner token while losing none of its running. That is a change in HOW it runs, never in WHETHER.
    if (new RegExp(`import\\(['"]\\./${base}\\.js['"]\\)`).test(selfExcluded(f, siblingSrc))) continue
    live.push(f)
    if (declared.includes(f)) continue
    gaps.push({
      what: `src/scripts/${f} is built but no npm script, workflow, hook or sibling ever runs it — reachable`,
      fix: `wire it into a chain (the audit, a cron, or another script), or declare it in lean/dormant-scripts.json with the reason it stays on-demand. That list MAY ONLY SHRINK. support-audit cannot catch this: importing a module makes it "supported" while nothing exercises what it does.`,
    })
  }
  for (const f of declared)
    if (!live.includes(f))
      gaps.push({ what: `lean/dormant-scripts.json still lists ${f}, which is now invoked (or no longer exists)`, fix: `remove '${f}' from lean/dormant-scripts.json — the list may only shrink, and a stale entry excuses a script that no longer needs excusing` })
  return gaps
}

// ── pages: EVERY AUTHORED PAGE REDUCES TO A THEOREM COMBINATION, OR DECLARES WHY IT DOES NOT. The site is 1432
// pages and 1399 of them already come from TWO templates (/theorem/[key] over the whole ledger, /publications/[slug]
// over the monographs) with the sidebar computed by computeSidebar() — no hand-typed navigation anywhere. The 33
// authored markdown pages are the remainder, and the question this settles is what each one STANDS ON.
// Measured 2026-08-19: 28 of 33 fold to a real theorem set (captain-claims to 1326, school to 58, mcp to 19), and
// the other five earn their place another way — rosetta and topics compute from a .data loader, guides is a link
// index, changelog and analytics are generated artifacts. So the involution already held; this keeps it holding.
// A page that ASSERTS while standing on nothing is the gap — it cannot be recomputed, and nothing catches it drifting.
// HONEST SCOPE: a page's theorem fold is its BACKING. Prose is not removed and not generated — the
// captain's rule is that values compute while prose stays authored, and a fold records which proofs a page rests on.
export function pagesGaps(): Gap[] {
  const gaps: Gap[] = []
  const docs = join(ROOT, 'docs')
  if (!existsSync(docs)) return gaps
  const keys = new Set(theorems().map((t) => t.key))
  // declared non-asserting pages: an index of links, or an artifact a generator owns. MAY ONLY SHRINK.
  const EXEMPT: Record<string, string> = {
    'guides.md': 'a link index — it navigates, it does not assert',
    'changelog.md': 'generated: sync-changelog stamps it from the ledger',
    'analytics.md': 'generated: gen-analytics writes it (declared in RECONCILE_OUTPUTS)',
    'articles/index.md': 'a link index over the computed articles — the desk regenerates it with the articles themselves, and each ARTICLE carries the citations; the index only points',
  }
  // THE GATE WALKS THE WHOLE TREE, which it did not before. readdirSync(docs) is not recursive, so this check
  // scanned the 34 top-level pages and never looked at the 148 beneath them — 81% of the docs tree, including
  // every article, was exempt by accident rather than by declaration. The articles happen to pass (each cites the
  // wing it was written from), and that is exactly why the hole survived: nothing was wrong, so nothing complained.
  // A check that silently covers a fifth of what it names is the same failure shape as a gate that cannot fail.
  const pages: string[] = []
  const walk = (dir: string, prefix: string): void => {
    for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
      if (e.isDirectory()) { if (!e.name.startsWith('.') && e.name !== 'node_modules') walk(join(dir, e.name), prefix + e.name + '/'); continue }
      if (e.name.endsWith('.md')) pages.push(prefix + e.name)
    }
  }
  walk(docs, '')
  for (const f of pages) {
    // VitePress DYNAMIC ROUTES are templates`[key].md` renders once per theorem and `[slug].md` once
    // per publication, each from its paired .paths.ts loader. They assert nothing on their own — what they render
    // is the ledger — so they are skipped by SHAPE rather than by name, and a new dynamic route needs no edit here.
    if (/\[[^\]]+\]\.md$/.test(f)) continue
    const s = fileText(join(docs, f))
    const cites = [...s.matchAll(/\/theorem\/([a-z0-9_]+)|theorem\s+([a-z][a-z0-9_]{4,})/gi)]
      .map((m) => (m[1] || m[2] || '').toLowerCase()).filter((k) => keys.has(k))
    if (cites.length) continue                       // stands on a real theorem combination
    if (/<script setup|\.data'/.test(s)) continue    // computed from a build-time data loader
    if (f in EXEMPT) continue                        // declared, with its reason
    gaps.push({
      what: `docs/${f} asserts without standing on anything — it cites no sealed theorem, loads no data, and is not a declared index or generated artifact`,
      fix: `cite the theorems the page rests on (a /theorem/<key> link or "theorem <key>"), or compute it from a .data loader, or declare it in pagesGaps's EXEMPT map with the reason it asserts nothing. A page that cannot be reduced to a theorem combination cannot be recomputed, and nothing will catch it drifting.`,
    })
  }
  for (const f of Object.keys(EXEMPT))
    if (!existsSync(join(docs, f)))
      gaps.push({ what: `pagesGaps EXEMPT still names docs/${f}, which no longer exists`, fix: `remove '${f}' from the EXEMPT map — the list may only shrink` })
  return gaps
}

// ── comments: DESCRIBE HISTORY WITH NUMBERS, DESCRIBE THE PRESENT WITHOUT THEM. countsGaps holds every tracked
// SURFACE to the live ledger, but it deliberately exempts derived files and it reads prose— so the
// one place a count could rot unwatched was source comments, where no generator reaches and no gate looked. The
// README sat twenty theorems stale behind exactly that reasoning.
// THE RULE IS STRICTER THAN "IS IT CURRENT", and that is the point: a comment naming the current key count is RIGHT today and
// WRONG on the next landing, so correctness now is no defence. (This very paragraph tripped the finder on its
// first run, for using a literal count as the example — the third time in one session a check caught a comment
// that merely DISCUSSED what it forbids, after the determinism scan and the sources finder. Raw-source scanners
// cannot tell use from mention, so the example is given in words.) Three of the four counts this finder first
// caught were written earlier the same session and had already drifted by the time it ran; a fourth, in
// reconcile.ts, was a duplicate of a stale line already fixed twice elsewhere and missed both times by hand.
// HISTORY IS DIFFERENT AND KEEPS ITS NUMBERS. "reports.json sat tracked for three days stating 1195 theorems"
// names an event; Zenodo record 21986286 "published 1274 theorems" is an immutable DOI that can never be anything
// else. Changing those would falsify the record, so a comment marked as past tense or as a published record is
// allowed — as is a threshold restating the code beside it ("at least 1000 theorems", guarding `>= 1000`).
export function commentsGaps(): Gap[] {
  const gaps: Gap[] = []
  // a ledger COUNT: a 3–5 digit number naming theorems, keys, principles, wings or skills
  const COUNT = /(?<![0-9a-fx.])(\d{3,5})\s*(?:sealed |distinct )?(theorems?|principles?|wings?|keys|skills)\b/gi
  // past tense, or the naming of a fixed record — the marks of describing something that already happened
  const HISTORY = /\b(sat|was|were|had|held|published|predate|grew|collapsed?|read|stale|record \d+|carries|stated|froze|frozen|for three days|once|previously|until|then|earlier|holding)\b/i
  // a bound the code enforces on the line beside it — a target
  const THRESHOLD = /\b(at least|minimum|milestone|target|aims? at|goal)\b/i
  const files = trackedFiles().filter((f) => /\.(ts|js)$/.test(f))
  for (const f of files) {
    let src = ''
    try { src = fileText(join(ROOT, f)) } catch { continue }
    const comments = [...src.matchAll(/\/\/[^\n]*/g), ...src.matchAll(/\/\*[\s\S]*?\*\//g)].map((m) => m[0])
    for (const c of comments) {
      if (HISTORY.test(c) || THRESHOLD.test(c)) continue
      for (const m of c.matchAll(COUNT))
        gaps.push({
          what: `${f}: a comment states "${m[0]}" — a ledger count in prose, which no generator can keep current`,
          fix: `drop the number and name the source instead ("the key count", "theoremCountByFile()"), or mark the sentence as HISTORY if it describes something that already happened (past tense, or a named record — those keep their numbers and must not be edited). A count that is correct today is wrong on the next landing, so updating it only schedules the next drift.`,
        })
    }
  }
  return gaps
}

// ── skills: A THEOREM IS A HOOK AND HOOKED AT ONCE — reachable from the live API through the skill it carries.
// Measured the day this landed: most of the skills the sealed ledger carries matched NO tool name and NO category
// on the served catalogue — sequence, involution, z9-ring, z7-rosette, clay-reflection, foundational, neuro and
// science-pairs among them. Those theorems were sealed, axiom-free, witnessed by their wings, and served by nothing.
//
// THE LAW: every skill a theorem carries must be OPENABLE through the live API, on BOTH surfaces. It is measured by
// CALLING each dispatch— a catalogue can advertise a tool whose handler answers for
// something else, and a source-level check would pass that. The skill set is carried by the WINGS, so it moves: this
// is why the surface is one computed dimension and not one authored tool per skill. Fifty authored tools would be
// fifty places to forget, which is how every hand-kept list in this repository has rotted.
//
// BOTH SURFACES, because they are maintained separately and have drifted before (the edge advertised a version
// eleven releases stale). Registering the axis in src/mcp.ts alone would leave uuidna.com/mcp without it, and that
// class of gap is exactly what lean/mcp-surface-divergence.json records.
export function skillsGaps(): Gap[] {
  const gaps: Gap[] = []
  const openStdio = (skill: string): unknown => callTool('uuidna_skill', { skill })
  const edgeCall = (name: string, args: Record<string, unknown>): unknown => {
    const r = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }) as
      { result?: { content?: { text: string }[]; isError?: boolean } } | null
    const text = r?.result?.content?.[0]?.text
    if (r?.result?.isError || text === undefined) throw new Error(String(text ?? 'the edge returned no content'))
    return JSON.parse(text)
  }

  // 1) THE INTERSECTION, on each surface: every skill the ledger carries, opened through that surface's own dispatch
  // ONE SURFACE IN THE GATE, BOTH IN THE SUITE. Opening every sealed skill through both dispatches cost ~250ms of a
  // gate that runs before every reconcile, and the pair is already held honest by src/tests/skill-surface.test.ts,
  // which opens each skill on stdio AND on the edge and compares them. What the gate gives up is catching an
  // edge-only divergence BEFORE a reconcile rather than at the next test run — declared here, not silently dropped.
  for (const [surface, open] of [['stdio (src/mcp.ts)', openStdio]] as const)
    for (const o of orphanedSkills(open))
      gaps.push({
        what: `${surface}: the skill "${o.skill}" carries ${o.theorems} sealed theorem(s) and ${o.why} — proven and unreachable`,
        fix: `uuidna_skill is COMPUTED from the ledger (src/skills.ts, skillSurface), so this means the surface stopped serving the computed answer. Restore the computed dispatch rather than adding a case for "${o.skill}" — one tool per skill is the shape this finder exists to prevent.`,
      })

  // 2) DISCOVERABILITY: a served skill nobody can enumerate is reachable only by guessing its name
  const names = skillNames()
  for (const [surface, list] of [['stdio (src/mcp.ts)', () => callTool('uuidna_skills', {})]] as const) {
    let rows: { skill?: string; theorems?: number }[]
    try { rows = list() as { skill?: string; theorems?: number }[] } catch (e) {
      gaps.push({ what: `${surface}: uuidna_skills refused a zero-argument call — ${String((e as Error)?.message ?? e).slice(0, 160)}`, fix: 'register uuidna_skills with an empty schema and run skillIndex() (src/skills.ts)' })
      continue
    }
    if (!Array.isArray(rows)) { gaps.push({ what: `${surface}: uuidna_skills did not return a list of skills`, fix: 'return skillIndex() (src/skills.ts) — the computed index, one row per skill' }); continue }
    const listed = new Set(rows.map((r) => String(r.skill)))
    for (const n of names)
      if (!listed.has(n))
        gaps.push({ what: `${surface}: uuidna_skills does not list "${n}", so it can only be opened by guessing the name`, fix: 'uuidna_skills must return skillIndex() (src/skills.ts), which is computed from the ledger and cannot omit a skill' })
    for (const r of rows)
      if (typeof r.theorems !== 'number')
        gaps.push({ what: `${surface}: uuidna_skills lists "${String(r.skill)}" with no theorem count`, fix: 'each row carries {skill,theorems,fold,handle,esco,open} — return skillIndex() unaltered' })
  }

  // 3) ONE CONTRACT, TWO DOORS: the axis must be registered on both surfaces, taking the same required arguments —
  //    an agent that learns a tool against uuidna.com and then runs it over stdio must not get an error.
  const edgeSchemas = new Map((handleMcpRpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) as { result: { tools: { name: string; inputSchema?: { required?: string[] } }[] } }).result.tools
    .map((t) => [t.name, [...(t.inputSchema?.required ?? [])].sort().join(',')]))
  const localSchemas = new Map(MCP_CATALOG.map((t) => [t.name, [...(t.inputSchema?.required ?? [])].sort().join(',')]))
  for (const tool of SKILL_TOOLS) {
    if (!localSchemas.has(tool)) gaps.push({ what: `${tool} is not in the stdio catalogue`, fix: `register ${tool} in src/mcp.ts's TOOLS, running the computed surface in src/skills.ts` })
    if (!edgeSchemas.has(tool)) gaps.push({ what: `${tool} is not served by the hosted edge — uuidna.com/mcp cannot open the capability axis`, fix: `register ${tool} in src/mcp-http.ts's TOOLS (the surface is pure and reaches no network, so it is Workers-safe)` })
    if (localSchemas.has(tool) && edgeSchemas.has(tool) && localSchemas.get(tool) !== edgeSchemas.get(tool))
      gaps.push({
        what: `${tool} requires [${localSchemas.get(tool)}] over stdio and [${edgeSchemas.get(tool)}] at the edge`,
        fix: 'make the two schemas identical — an agent that learned this tool on one surface would get an error on the other (the divergence class lean/mcp-surface-divergence.json records)',
      })
  }
  return gaps
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
      const html = fileText(p)
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

// ── coherent: THE MIXED-DIST FINDER — the reconcile race, folded. The wrapper's crash class was never a race in
// one process: interleaved writers on the shared working tree leave a MIXED dist (scripts newer than index), and a
// spawned generator dies on a missing export mid-chain. This probe detects exactly that class in milliseconds:
// every named `import {…} from '…/index.js'` across dist must resolve against dist/index.js's real exports. ──
export async function coherentGaps(): Promise<Gap[]> {
  const gaps: Gap[] = []
  const dist = join(ROOT, 'dist')
  if (!existsSync(join(dist, 'index.js'))) return [{ what: 'dist/index.js missing — no build to probe', fix: 'npm run build' }]
  const have = new Set(Object.keys(await import(join(dist, 'index.js'))))
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) { walk(p); continue }
      if (!e.name.endsWith('.js')) continue
      const js = fileText(p)
      // THE ROOT BARREL. This matched every `…/index.js`, which meant exactly one file until the
      // 2026-08-18 migration gave every module its own index face — after which it compared module-local imports
      // against the root's exports and reported five phantom breaks. It now RESOLVES the specifier and keeps only
      // the imports that actually target dist/index.js.
      for (const m of js.matchAll(/^import\s*\{([^}]*)\}\s*from\s*['"]([^'"]*\/index\.js)['"]/gm))
        if (resolve(dirname(p), m[2]) !== join(dist, 'index.js')) continue; else
        for (const raw of m[1].split(',')) {
          const name = raw.split(' as ')[0].trim()
          if (name && !have.has(name))
            gaps.push({ what: `${p.slice(dist.length + 1)} imports "${name}" — absent from dist/index.js: the dist is MIXED (interleaved writers on the shared tree)`, fix: 'rm -rf dist && npm run build — one clean emit; then rerun. Never diagnose further: the class is known and the cure is total' })
        }
    }
  }
  walk(dist)
  return gaps
}

// ── seal: THE DRAIN, PROMOTED — the autoseal shell folded into the api: drain any dirty tree or unpushed commit
// (fold → guard → commit → push, reconcile-retry) until clean and synced. The captain's cron, now a subcommand. ──
export function seal(): void {
  let lastFailure = ''
  for (let round = 1; round <= 6; round++) {
    // THE GATE-WAIT, folded — the piece every hand-written watcher kept re-implementing: never interleave
    // writers on the shared tree (the mixed-dist hazard). Wait for any running reconcile before touching it.
    for (let w = 0; w < 90; w++) {
      const gates = execSync('ps aux | grep "[r]econcile.js" | wc -l', { cwd: ROOT }).toString().trim()
      if (gates === '0') break
      execSync('sleep 10', { cwd: ROOT })
    }
    const dirty = execSync('git status --porcelain', { cwd: ROOT }).toString().trim()
    let ahead = '0'
    try { execSync('git fetch origin main -q', { cwd: ROOT }); ahead = execSync('git rev-list origin/main..HEAD --count', { cwd: ROOT }).toString().trim() } catch { /* offline: seal locally */ }
    if (!dirty && ahead === '0') { console.log('✓ one-receipt seal — clean and synced'); return }
    if (dirty) {
      step('fold', 'node ' + JSON.stringify(join(ROOT, 'dist/scripts/one-receipt.js')) + ' fold')  // objects → guard catches
      const guard = step('guard', 'npm run guard')
      if (!guard.ok) { lastFailure = `guard:\n${guard.tail}`; step('build', 'npm run build') }
      // stage the drain's OWN paths's in-flight source edit must not land inside a
      // seal commit whose message describes the seal's work (four times in one day it did).
      const st = stageDerived(ROOT)
      if (st.leftForHumans.length) console.log('· seal — left for a human (not staged' + st.leftForHumans.join(', '))
      step('commit', 'git commit -m "Seal: the landing folds and passes on — gate-clean, unattended. Backed by theorem two_coins"')
    }
    const push = step('push', 'git push origin main')
    if (push.ok) { console.log(`✓ one-receipt seal — pushed (round ${round})`); continue }
    lastFailure = `push:\n${push.tail}`
    const rec = step('reconcile', 'npm run reconcile')
    if (rec.ok) { console.log(`✓ one-receipt seal — reconciled (round ${round})`); continue }
    lastFailure = `reconcile:\n${rec.tail}`
    console.log(`… seal round ${round}: reconcile failed — its last lines:\n${rec.tail}\n`)
  }
  console.error('✗ one-receipt seal — six rounds spent, still unsealed. The last failure was ' + (lastFailure || '(none captured)'))
  console.error('  Every step above is teed in full: read the gate\'s own objection, fix it, and seal again.')
  process.exit(1)
}

// ── dry: the DUPLICATION FINDER — the api is declared once; a script that re-declares it is objected to with the
// exact fix, so the boilerplate class that once spanned 25 files can never regrow. Fold the finder, forever. ──
export function dryGaps(): { gaps: Gap[]; scripts: number } {
  const gaps: Gap[] = []
  // the WHOLE tree: scripts + the library + the generated package surfaces. Exactly TWO exemptions — the two
  // declared singularities (scripts/api.ts, src/boundary.ts): each layer has ONE named place, nothing else may.
  const SINGULARITIES = new Set(['src/scripts/api.ts', 'src/boundary.ts', 'src/tests/api.ts'])
  const dirs = ['src/scripts', 'src', 'src/quantum', 'src/theorems', 'src/tests', 'src/site', 'src/desk', ...readdirSync(join(ROOT, 'packages')).map((d) => `packages/${d}/src`)]
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
    // the generators' own boilerplate class: a range walk re-declared as a literal (const R8 = [0,1,…,7]) instead
    // of the ONE shared range() in lean-gen. Same law as HERE/ROOT and rd(), applied one layer in.
    const rangeDecl = /^const R\d+ = \[/m.exec(src)
    if (rangeDecl)
      gaps.push({ what: `${f}: re-declares a range literal (${rangeDecl[0].trim()}…) instead of the shared range()`, fix: `edit ${f}: delete the R<n> literal and import { range } from './lean-gen.js', then use range(n)` })
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


/** The messaging witness, verified rather than recomputed. Returns true only when the sealed witness says the carrier
 *  is total AND it covers every theorem now in the ledger — a stale witness is a failure, never a pass. The full
 *  round-trip lives in `npm run audit` (one-receipt messaging --seal), which writes the witness. */
function messagingWitness(): boolean {
  const w = join(ROOT, 'lean', 'messaging-witness.json')
  if (!existsSync(w)) return false
  try {
    const j = JSON.parse(fileText(w)) as { total: boolean; keys: number }
    return j.total === true && j.keys >= (theorems() as unknown[]).length
  } catch { return false }
}

function trinities() {
  const TM = (label: string, t0: bigint): void => { if (process.env.UUIDNA_METER) console.log(`    · trinities/${label} ${(Number(process.hrtime.bigint() - t0) / 1e6).toFixed(0)} ms`) }
  let _t = process.hrtime.bigint()
  // SEAL THE INPUT, NOT ITS PURE FUNCTION — the same law the movie leaf now follows, applied to the monographs.
  // composePublication() is DETERMINISTIC in (the PRINCIPLE entry, the theorems of that file), so composing all 90
  // wings to content-address them sealed a fact the inputs already fix: the monograph digest moves exactly when a
  // wing's title or its theorem set moves, and never otherwise. Composing them cost 103ms of a gate held to one
  // second. The wings still compose — publications() is unchanged and every reader gets the full monograph; the FOLD
  // stops re-deriving them just to fingerprint them.
  const byFile = new Map<string, string[]>()
  for (const t of theorems() as { file: string; key: string }[]) (byFile.get(t.file) ?? byFile.set(t.file, []).get(t.file)!).push(t.key)
  const monographByFile = new Map(
    (PRINCIPLES as [string, string, string][])
      .filter(([f]) => byFile.has(f))
      .map(([f, title]) => [f, `${f}|${title}|${(byFile.get(f) ?? []).slice().sort().join(',')}`]),
  )
  TM('publications', _t); _t = process.hrtime.bigint()
  // the star walk RECOMPUTED— each walk exactly as its sealed theorem states, asserted to close:
  const pentagram = Array.from({ length: 5 }, (_, k) => (2 * k) % 5)                 // pentagram_single_stroke
  const rosetteOrbit = powmodWalk(3, 7, 6)                                           // rosette_orbit
  const vortexOrbit = powmodWalk(2, 9, 6)                                            // vortex doubling, order_of_two_is_six
  if ((2 * 5) % 5 !== 0 || rosetteOrbit[5] !== 1 || vortexOrbit[5] !== 1) {
    console.error('✗ one-receipt — a star walk failed to close; the sealed orbits (pentagram/rosette/vortex) must recompute')
    process.exit(1)
  }
  const deposits = depositRecord().receipts
  TM('deposits', _t); _t = process.hrtime.bigint()
  const receiptRays: string[][] = Array.from({ length: 7 }, () => [])
  for (const r of deposits) receiptRays[ray(r.id)].push(r.id)
  const auditLines = `${legalGaps().facts}\n${proseGaps().facts}`.split('\n')
  TM('legal+prose re-run', _t); _t = process.hrtime.bigint()
  const auditRays: string[][] = Array.from({ length: 7 }, () => [])
  for (const line of auditLines) auditRays[ray(line)].push(line)
  let level = auditRays.map((lines, i) => h16(`ray${i}|${lines.sort().join('\n')}`)).sort()
  while (level.length > 2) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) next.push(h16(level.slice(i, i + 2).join('|')))
    level = next.sort()
  }
  TM('audit rays', _t)
  return {
    sealed: {
      theorems: h16((theorems() as any[]).map((t) => `${t.key}|${t.address}|${t.principle}`).sort().join('\n')),
      principles: h16((PRINCIPLES as any[]).map((p) => `${p[1]}|${p[2]}`).sort().join('\n')),
      // SEAL THE INPUT, NOT ITS PURE FUNCTION. This leaf composed all 90 wings — publications() — purely to
      // fingerprint them, at 103ms of a gate held to one second. composePublication() is deterministic in (the
      // PRINCIPLE entry, that file's theorem set), which monographByFile already carries, so this digest moves
      // exactly when a wing's title or its theorems move and never otherwise. Same guarantee, none of the work.
      monographs: h16([...monographByFile.values()].sort().join('\n')),
    },
    served: (() => {
      let _s = process.hrtime.bigint()
      const packages = h16(['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge'].map((pkg) => {
        const p = join(ROOT, 'packages', pkg, 'package.json')
        if (!existsSync(p)) return `${pkg}|missing`
        const j = JSON.parse(readFileSync(p, 'utf-8'))
        return `${pkg}|${j.version}|${j.sideEffects}|${Object.keys(j.exports || {}).length}`
      }).sort().join('\n'))
      TM('served/packages', _s); _s = process.hrtime.bigint()
      const exports_ = h16(rd('src/index.ts').split('\n').filter((l) => l.startsWith('export')).sort().join('\n'))
      TM('served/exports', _s); _s = process.hrtime.bigint()
      const mcp = h16((MCP_CATALOG as any[]).map((t) => `${t.key}|${createHash('sha256').update(String(t.description || '')).digest('hex').slice(0, 12)}`).sort().join('\n'))
      TM('served/mcp', _s)
      return { packages, exports: exports_, mcp }
    })(),
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

export function fold() {
  console.log('🌀 one-receipt fold — fifteen leaves, five trinities, one stroke, one receipt (15 = 5·3; the five walked by 2)\n')
  // the fold ships the same meter the gate does: UUIDNA_METER=1 names each phase's cost, so what the seal spends
  // is visible rather than inferred.
  const FM = (label: string, t0: bigint): void => { if (process.env.UUIDNA_METER) console.log(`    · fold/${label} ${(Number(process.hrtime.bigint() - t0) / 1e6).toFixed(0)} ms`) }
  let _m = process.hrtime.bigint()
  const T = trinities()
  FM('trinities', _m); _m = process.hrtime.bigint()
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
  FM('stroke', _m); _m = process.hrtime.bigint()
  const alpha = auraAlphabet()
  if (new Set(alpha.map((e) => e.rgb)).size !== alpha.length) {
    console.error(`✗ one-receipt fold — the aura alphabet collides (${new Set(alpha.map((e) => e.rgb)).size}/${alpha.length} distinct): a state went mute — retune the channels in src/aura.ts until all 378 speak`)
    process.exit(1)
  }
  FM('aura-alphabet', _m); _m = process.hrtime.bigint()
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
  FM('report', _m); _m = process.hrtime.bigint()
  const sessDeposits = depositRecord().receipts
  const sessTip = sessDeposits.reduce((p, r) => h16(`${p}|${r.id}`), 'genesis')
  const session = h16(`deposits:${sessDeposits.length}|tip:${sessTip}|theorems:${(theorems() as any[]).length}`)
  const alphabet = h16(alpha.map((e) => e.rgb).join(''))
  // AN AURA IS ONLY AN AURA IF DERIVED FROM THE ALGEBRA. This leaf was briefly changed to fold the addresses
  // directly — the seal-the-input law, correctly reasoned and wrongly applied: the aura IS a pure function of the
  // address, so the digests do move together, but folding addresses computes NO aura while still being called the
  // movie. That is the defect the hexbit finder blocks by name (a value called a hexbit must be computed by the
  // unit), and the saving was 5ms. The film is the state read from the glow — ray from ℤ/7, wave from the ℤ/9
  // vortex orbit, hue by the A432 step — so the frames are derived, and the name is true again.
  const movie = h16((theorems() as any[]).map((t) => t.address).sort().map((ad) => (quantumAura(ad) as { rgb: string }).rgb).join(''))
  FM('session+alphabet+movie', _m); _m = process.hrtime.bigint()
  const school = rd('docs/school.md')
  const lessons = h16([...school.matchAll(/^## .+$|\]\(\/(?:theorem|publications)\/[a-z0-9_-]+\)/gm)].map((m) => m[0]).join('\n'))
  FM('lessons', _m); _m = process.hrtime.bigint()
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
  // THE EQUILIBRIUM SEAL — zero entropy as COMPUTED DATA
  // recorded by name, and zero_entropy true only as their conjunction. The fold objects if equilibrium fails.
  FM('aura+decode', _m); _m = process.hrtime.bigint()
  const shuffled = foldOf(Object.fromEntries(Object.entries(trinityFolds).reverse()))
  const equilibrium = {
    rotations_agree: shuffled === foldOf(trinityFolds),            // order-invariance recomputed
    alphabet_total: new Set(alpha.map((e) => e.rgb)).size === alpha.length,
    chain_intact: sessTip === sessDeposits.reduce((p, r) => h16(`${p}|${r.id}`), 'genesis'),
    walks_closed: true,                                            // trinities() already exits 1 if any orbit fails to close
    clock_fixed: true,                                             // the timestamp below is a constant; Date is banned tree-wide
    // THE MESSAGING WITNESS — the same shape as the axiom witness above it in guard.ts, and for the same reason.
    // messagingSeal() round-trips EVERY theorem's carrier byte-exact: real verification, and 100ms of a gate held to
    // one second. lean/messaging-witness.json is the derived witness {total, theorems}, written by the full run in
    // `npm run audit`; the gate verifies it COVERS the current ledger. A witness that is missing, false, or short of
    // the ledger fails the equilibrium and refuses the seal — so a new theorem cannot slip in under an old proof.
    messaging_total: messagingWitness(),                        // every theorem's carrier decodes byte-exact — secure messaging stays a TOTAL function on the ledger, or the seal is refused
  }
  FM('equilibrium', _m); _m = process.hrtime.bigint()
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
  FM('receipt-hash', _m); _m = process.hrtime.bigint()
  const leafEntries: Record<string, string> = {}
  for (const [tn, leaves] of Object.entries(T)) for (const [ln, v] of Object.entries(leaves as Record<string, string>)) leafEntries[`${tn}.${ln}`] = v
  const rayBuckets: string[][] = Array.from({ length: 7 }, () => [])
  for (const [name, v] of Object.entries(leafEntries)) rayBuckets[ray(name)].push(`${name}=${v}`)
  const rosette_rays = rayBuckets.map((b, i) => h16(`ray${i}|${b.sort().join('\n')}`))
  const rosette_receipt = { rays: rosette_rays, concurrence: foldOf(Object.fromEntries(rosette_rays.map((r, i) => [`ray${i}`, r]))) }
  FM('rosette-rays', _m); _m = process.hrtime.bigint()
  writeFileSync(join(ROOT, 'quantum-fold.json'), JSON.stringify({ timestamp: '2026-08-15T00:00:00Z', trinities: T, trinity_folds: trinityFolds, unified_fold: tip, receipt, rosette_receipt, aura, equilibrium, zero_entropy }, null, 2))
  FM('report + write', _m)
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
  if (cmd === 'legal') report('one-receipt legal', legalGaps().gaps, 'the legal record is internally consistent — one license, terms stated, no overclaim, no rate, one identity, every deposit recomputes. Consistency.')
  else if (cmd === 'prose') { const r = proseGaps(); report('one-receipt prose', r.gaps, `all ${r.pages} pages walk to the ledger and teach only paths that exist.`) }
  else if (cmd === 'migrate') migrate()
  else if (cmd === 'seal') seal()
  else if (cmd === 'seo') { const r = seoGaps(); report('one-receipt seo', r.gaps, `${r.pages} content pages — every one titled, described in the click band, canonical, and structured, no duplicate snippets.`) }
  else if (cmd === 'crypto') cryptoGaps().then((g) => report('one-receipt crypto', g, 'every cryptographic operation covered in both directions — reversibles invert, one-ways are deterministic.'))
  else if (cmd === 'pipes') report('one-receipt pipes', pipeGaps(), 'no gate flows into a pipe — every exit code is the gate\'s own.')
  else if (cmd === 'actions') report('one-receipt actions', actionsGaps(), 'every action pins one major, tree-wide — no workflow silently trails the rest onto a deprecated runtime.')
  else if (cmd === 'vacuous') report('one-receipt vacuous', vacuousGaps(), 'no theorem is true regardless of its content — every sealed name is carried by a proof that means it.')
  else if (cmd === 'frozen') report('one-receipt frozen', frozenGaps(), 'no theorem freezes a measured quantity — every name that counts live things walks the structure it counts.')
  else if (cmd === 'blocks') report('one-receipt blocks', blocksGaps(), 'the two Payload shapes never disagree — every theorem addresses the same across richText docs and layout blocks.')
  else if (cmd === 'state') report('one-receipt state', stateGaps(), 'the folded question has one copy — no workflow re-implements what npm run state already answers.')
  else if (cmd === 'folders') report('one-receipt folders', foldersGaps(), 'every module folder is one word holding index faces only — one concept, one name.')
  else if (cmd === 'negation') report('one-receipt negation', negationGaps(), 'no lean lead is lost in prose — every stated boundary names the proof that fixes it, even when negating.')
  else if (cmd === 'precede') report('one-receipt precede', precedeGaps(), 'no derived file is staged ahead of the source it derives from — every commit can be recomputed from what it publishes.')
  else if (cmd === 'drain') report('one-receipt drain', drainGaps(), 'the drain stages everything reconcile regenerates — every generator declares its output, and every output is a drain path.')
  else if (cmd === 're') reGaps().then((g) => report('one-receipt re', g, 'the two-layer posture holds: the transport reverses by design (a bijection — the uuid IS the message, bits placed and picked back, no search), the sealed layer only by paying the bounded KDF per guess with Grover halving the exponent at most. Decidable posture green; timings stay at the measurement boundary.'))
  else if (cmd === 'absence') report('one-receipt absence', absenceGaps(), 'every absence claim carries its presence pointer — the sealed layer is named wherever a cipher is denied.')
  else if (cmd === 'coherent') coherentGaps().then((g) => report('one-receipt coherent', g, 'every dist import resolves — one emit, no mixed writers.'))
  else if (cmd === 'messaging') {
    const seal = messagingSeal() as { total: boolean }
    const n = (theorems() as unknown[]).length
    // BOTH TRUE NUMBERS, NEVER THE LARGER ALONE (the counts law): the ledger carries 1437 KEYS over a smaller set of
    // DISTINCT propositions, because a theorem may be re-sealed under a second name. A witness that published only
    // the larger would read as a claim about propositions it never verified — it round-trips one carrier per KEY.
    const census = statementCensus() as { distinct: number; renamings: number }
    writeFileSync(join(ROOT, 'lean', 'messaging-witness.json'), JSON.stringify({
      total: seal.total,
      keys: n,
      distinct: census.distinct,
      covers: `${census.distinct} distinct propositions under ${n} keys (${census.renamings} deliberate re-namings); the carrier round-trip runs once per key`,
    }, null, 2) + '\n')
    report('one-receipt messaging', seal.total ? [] : [{ what: 'a theorem carrier does not decode byte-exact', fix: 'fix the codec — secure messaging must be TOTAL over the ledger' }], `carrier round-trip verified byte-exact over ${n} theorems; witness written to lean/messaging-witness.json`)
  }
  else if (cmd === 'binary') report('one-receipt binary', binaryGaps(process.argv.includes('--full')), 'every tracked file is greppable — the FULL corpus including the generated payloads the gate leaves to this pass')
  else if (cmd === 'dormant') report('one-receipt dormant', dormantGaps(), 'every built script is reached by a chain, a hook or a declared on-demand entry — reachable is not exercised')
  else if (cmd === 'micro') { const r = microGaps(); report('one-receipt micro', r.gaps, `${r.pages} JSON-LD blocks, ${r.claims} structured claims — every identifier a real address, every cited part a sealed theorem.`) }
  else if (cmd === 'wave') wave(process.argv[3]?.trim() || '')
  else if (cmd === 'dry') { const r = dryGaps(); report('one-receipt dry', r.gaps, `all ${r.scripts} scripts speak the one api — boilerplate declared once, imported everywhere.`) }
  else if (cmd === 'stage') { const r = stageDerived(ROOT); console.log('✓ one-receipt stage — ' + r.staged + ' derived path(s) staged' + (r.leftForHumans.length ? '; left for a human (not staged' + r.leftForHumans.join(', ') : '; nothing else pending')) }
  else if (cmd === 'counts') report('one-receipt counts', countsGaps(), 'every surface states both ledger sizes, and both are live')
  else if (cmd === 'lines') report('one-receipt lines', linesGaps(), 'every Lean line is indexed — no wing seals a statement twice, and every cross-wing reuse is declared')
  else if (cmd === 'fold') fold()
  else if (cmd === 'mint') await mint(process.argv[3]?.trim() || '')
  else if (cmd === 'skills') report('one-receipt skills', skillsGaps(), 'every skill the sealed ledger carries is openable through the live API on BOTH surfaces, and enumerable with its theorem count — no capability is proven and unreachable')
  else { console.error('one-receipt — the singularity api: legal | prose | dry | precede | micro | seo | coherent | absence | re | pipes | crypto | migrate | words | counts | lines | skills | stage | seal | fold | wave | mint "<statement>"'); process.exit(1) }
}

/** RENAMING A THEOREM IS RENAMING A PUBLISHED CONTRACT. A regeneration of AntiFraud renamed two keys —
 *  `anti_fraud_check_deterministic` and `sealed_theorem_not_forged` — that 59 and 48 files cited, including the
 *  gate spec the hosted MCP tells every agent to recompute against. The ledger stayed green (both replacements
 *  were sealed and axiom-free), the wings stayed green, and the only thing that noticed was one test on one
 *  surface. So the fault is not "a key is missing" but "a key that WAS in the ledger left it while citations
 *  stayed behind" — which is exactly what this compares: the committed ledger against the live one, and every key
 *  that disappeared against the source that still names it. Tests are excluded because a test cites dead keys on
 *  purpose, as negative controls. */
export function citationsGaps(): Gap[] {
  const gaps: Gap[] = []
  let committed = ''
  try { committed = execSync('git show HEAD:src/theorems/generated.ts', { encoding: 'utf8', maxBuffer: 1 << 28 }) }
  catch { return gaps } // no git, no previous ledger to diff — silence beats a guess
  const live = new Set(theorems().map((t) => t.key))
  const removed = [...committed.matchAll(/\{ key: "([a-z0-9_]+)"/g)].map((m) => m[1]).filter((k) => !live.has(k))
  let files: string[] = []
  // `src/**/*.ts` LOOKS recursive and is not: git's pathspec drops every top-level src/*.ts, which is 98 files —
  // including mcp.ts, mcp-http.ts and gate-engine.ts, the three that carry the citations this finder exists for.
  // Ask for the directory and filter in code, where the extension test is visible.
  files = trackedFiles().filter((f) => f.startsWith('src/') && f.endsWith('.ts'))
  const readable = (f: string): string => { try { return fileText(join(ROOT, f)) } catch { return '' } }
  const isGenerated = (t: string): boolean => /GENERATED by|GENERATED\. DO NOT EDIT|— GENERATED/.test(t.slice(0, 400))
  const blob = files.filter((f) => !f.includes('/tests/')).map(readable).filter((t) => !isGenerated(t)).join('\n')
  // THE PROSE CITATIONS TOO. `captain_commission_two_coins` left the ledger in an earlier commit, so a
  // commit-to-commit diff could never see it — and it survived in the hosted MCP's own instructions, telling every
  // agent that connects which theorem its deposit cites, while gate-engine quietly FILTERED the dead key out of
  // the citation list rather than complaining. A declared citation is checked wherever it is declared: an
  // explicit *_THEOREMS list, a theoremKey field, or the phrase "theorem <key>" in text a consumer reads.
  const shipped = files.filter((f) => !f.includes('/tests/'))
  for (const f of shipped) {
    let raw = ''
    try { raw = fileText(join(ROOT, f)) } catch { continue }
    // a GENERATED file is not a citation surface: it is stale until its generator runs, and the fix is to run
    // the generator, never to edit the file. Its own header says so, so ask the file rather than keep a list.
    if (/GENERATED by|GENERATED\. DO NOT EDIT|— GENERATED/.test(raw.slice(0, 400))) continue
    const src = raw.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')
    const declared = new Set<string>()
    for (const m of src.matchAll(/theoremKey:\s*['`"]([a-z0-9_]+)['`"]/g)) declared.add(m[1])
    // close on a `]` that OPENS a line`]` anywhere: the comment beside the first entry of
    // GATE_THEOREMS contains the verdict table [1,0,0,0,0,0,0,0], and a non-greedy scan ended there — reading one
    // key out of six and reporting the other five clean.
    for (const blk of src.matchAll(/export const [A-Z_]*THEOREMS\s*=\s*\[([\s\S]*?)\n\]/g))
      for (const m of blk[1].matchAll(/['`"]([a-z0-9_]+)['`"]/g)) declared.add(m[1])
    // NOT the Lean definition form. An emitter WRITES `theorem <key> : <prop> := by decide`; that is where a
    // theorem is born. Only a bare mention is a citation.
    for (const m of src.matchAll(/\btheorem ([a-z][a-z0-9]*(?:_[a-z0-9]+){2,})\b(\s*:)?/g)) if (!m[2]) declared.add(m[1])
    // A FABRICATED CITATION FED TO THE GATE IS A FIXTURE.ts asserts that a
    // deliberately made-up key scores 0, which REQUIRES a key no ledger will ever hold. (This note named that
    // key in its first draft and the provenance audit rightly flagged the note itself — a comment is not exempt
    // from the law it documents, which gate-all.ts learned the same way.)
    const fixture = new Set<string>()
    for (const m of src.matchAll(/(?:computes|adjudicate|overreachOf)\([^)]*theorem ([a-z0-9_]+)/g)) fixture.add(m[1])
    for (const key of declared) {
      if (live.has(key) || fixture.has(key)) continue
      gaps.push({
        what: `${f} cites \`theorem ${key}\`, which is not sealed in the ledger — a fabricated citation on a surface a consumer reads`,
        fix: `restore \`${key}\` in its emitter (a cited key is a published contract), or point the citation at the successor theorem and reconcile`,
      })
    }
  }
  // COMMENTS ARE NOT CITATIONS here either. A note explaining WHY a key was purged necessarily names it, and a
  // finder that reads prose would demand the explanation be deleted to go green — the exact opposite of the point.
  const code = blob.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')
  for (const key of removed) {
    if (!code.includes(key)) continue
    const where = files.filter((f) => !f.includes('/tests/')).filter((f) => { try { return fileText(join(ROOT, f)).includes(key) } catch { return false } })
    gaps.push({
      what: `\`${key}\` left the ledger but is still cited by ${where.length} file(s): ${where.slice(0, 3).join(', ')}${where.length > 3 ? ' …' : ''}`,
      fix: `either restore the key in its emitter (a cited key is a published contract — rename it and every citation becomes a fabricated one), or update all ${where.length} citations to the successor theorem and reconcile`,
    })
  }
  return gaps
}

/** LITERAL-VS-LITERAL IS NOT A THEOREM. `time_dilation : 13 > 12`, `cosmic_speed_limit : 299792457 < 299792458`,
 *  `verified : (7 ≠ 0) ∧ (7 ≠ 1) ∧ (0 ≠ 1)` — every one is settled by reading the two numerals, and every one
 *  carries its whole meaning in the KEY, where no kernel checks it. `by decide` confirms the comparison and says
 *  nothing about time, light or verification, so the name is doing work the algebra never does. This is distinct
 *  from vacuousGaps (a proposition true regardless of content) and from a real table entry like (1*2) % 9 = 2,
 *  which computes: the test is that EVERY conjunct compares two bare literals with no operation between them. */
export function literalGaps(): Gap[] {
  const LIT = String.raw`(?:\(\s*\d+\s*:\s*Nat\s*\)|\d+)`
  const clause = new RegExp('^\\s*\\(?\\s*' + LIT + '\\s*(?:≠|<|>|≤|≥|=)\\s*' + LIT + '\\s*\\)?\\s*$')
  return theorems()
    .filter((t) => t.statement.split('∧').every((c) => clause.test(c.trim())))
    .map((t) => ({
      what: `${t.key} (${t.file}) states only \`${t.statement}\` — a comparison of bare literals; the claim its key makes is nowhere in the algebra`,
      fix: `give it content the kernel checks (quantify over a range, compute the quantity from its inputs, or enumerate the cases), or purge it from its emitter — a name is not a proof`,
    }))
}

/** A SOURCE FILE GREP CANNOT READ IS INVISIBLE TO EVERY FINDER HERE. src/tests/smoke.test.ts and src/energy.ts
 *  each carried a RAW NUL byte — deliberate fixtures (`scrubString('a\0b')`) written as the byte itself rather
 *  than the \0 escape. `file` called them data, grep skipped them silently with no error and no count, and every
 *  scan in this file quietly reported them clean: a stale threshold in smoke.test.ts survived that way until a
 *  stack trace pointed at a line no search could find. The escape compiles to the identical string, so nothing
 *  is lost by requiring it. */
/** binaryGaps(full?) — a file grep cannot read is a file no finder above ever scanned.
 *
 *  SCOPE, SPLIT AND DECLARED. The full corpus is 2405 files and 23.2 MB, of which src/chunks and src/seeds are 1994
 *  files and 19.2 MB — 83% of the bytes — and both are GENERATED, content-addressed payloads that no other finder
 *  reads. Byte-scanning them cost 93ms of a gate held to one second, to protect greps that never run there.
 *
 *  So the GATE scans the source of truth, where a control byte would actually blind another finder, and the AUDIT
 *  scans everything (`one-receipt binary --full`, wired into npm run audit). What the gate gives up: a control byte
 *  emitted INTO a generated payload is caught at audit time rather than before a reconcile. It cannot hide, because
 *  a byte only reaches a payload through a generator, and every generator's source is in the gate's scope. */
export function binaryGaps(full = false): Gap[] {
  const gaps: Gap[] = []
  let files: string[] = []
  try { files = trackedFiles().filter((f) => f.startsWith('src/') && /\.(ts|json|md)$/.test(f) && (full || !/^src\/(chunks|seeds)\//.test(f))) } catch { return gaps }
  for (const f of files) {
    let buf: Buffer
    try { buf = fileBuf(join(ROOT, f)) } catch { continue }
    // scan the bytes in place: [...buf] allocated a JS number array per file, which cost more than the whole rest of
    // the gate — an index walk reads the same bytes and allocates nothing (the cache-immutable-reads law, applied to
    // the read itself rather than its result).
    let bad = -1
    for (let i = 0; i < buf.length; i++) { const c = buf[i]!; if (c < 9 || (c > 13 && c < 32) || c === 127) { bad = i; break } }
    if (bad < 0) continue
    const line = buf.subarray(0, bad).toString('utf8').split('\n').length
    gaps.push({
      what: `${f}:${line} holds a raw control byte (0x${buf[bad].toString(16).padStart(2, '0')}) — grep treats the file as binary and skips it silently, so every finder reports it clean`,
      fix: `write the byte as an escape (\\0, \\x1b, …) instead of embedding it: the compiled string is identical and the file stays searchable`,
    })
  }
  return gaps
}

/** A DELETED SOURCE THAT STILL RUNS. lean-all discovers its generators by globbing dist/scripts/lean-*.js, and
 *  tsc never removes an orphaned output — so deleting src/scripts/lean-clay.ts left dist/scripts/lean-clay.js
 *  behind and the wing kept emitting, failing against a ledger that no longer held its theorems. The same shape
 *  made a stale dist/tests/smoke.test.js run tests absent from source. Any dist/scripts/lean-*.js without a
 *  matching source is a generator nobody can read but everybody runs. */
export function orphanGaps(): Gap[] {
  const d = join(ROOT, 'dist', 'scripts')
  if (!existsSync(d)) return []
  return readdirSync(d)
    .filter((f) => /^lean-.*\.js$/.test(f))
    .filter((f) => !existsSync(join(ROOT, 'src', 'scripts', f.replace(/\.js$/, '.ts'))))
    .map((f) => ({
      what: `dist/scripts/${f} has no source — tsc leaves orphaned output, and lean-all runs every dist/scripts/lean-*.js it finds`,
      fix: `rm dist/scripts/${f} (the source was deleted; a clean \`rm -rf dist && npm run build\` also clears it)`,
    }))
}

/** ONE UNIT, ONE IMPLEMENTATION. The hexbit conversion had grown four homes — a division loop in theorems/, a
 *  `(q - q % 4) / 4` in quantum/, an open-coded `32 -` in entropy/, and the reading in gravity/ — each correct
 *  in itself, each separately maintained, and each a place the unit could drift from the other three without
 *  anything noticing. A unit with four definitions is not a standard. src/hexbit is the single implementation,
 *  computed from `captain_theorem` (32 · 4 = 128, 128 / 2 = 64), and this refuses a second: any
 *  module outside it that divides by 16, floors by 4, or writes the uuid's 32 as a literal beside a hexbit word
 *  is re-deriving what it should import. */
export function unitGaps(): Gap[] {
  const gaps: Gap[] = []
  let files: string[] = []
  try { files = execSync("git ls-files 'src/'", { encoding: 'utf8' }).trim().split('\n').filter((f) => f.endsWith('.ts')) } catch { return gaps }
  for (const f of files) {
    if (f.startsWith('src/hexbit/') || f.includes('/tests/')) continue
    let src = ''
    try { src = fileText(join(ROOT, f)) } catch { continue }
    if (/GENERATED by|GENERATED\. DO NOT EDIT|— GENERATED/.test(src.slice(0, 400))) continue
    const code = src.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l))
    for (let i = 0; i < code.length; i++) {
      const l = code[i]!
      if (!/hexbit/i.test(l)) continue
      if (/%\s*16\s*\)\s*\/\s*16|%\s*4\s*\)\s*\/\s*4|\b32\s*-\s*\w*hexbit/i.test(l))
        gaps.push({
          what: `${f}: re-derives the hexbit unit inline (\`${l.trim().slice(0, 60)}\`) instead of importing it`,
          fix: 'import from src/hexbit — hexbitsOf, bitsToHexbits, qubitsToHexbits, spareOf, UUID_HEXBITS — so the unit has one definition and the captain theorem computes it in one pass',
        })
    }
  }
  return gaps
}

/** HARD FAIL IF NOT HEXBIT. A width computed one bit at a time is 2.9x slower than the same width computed by
 *  the tile — measured over a million calls — and the float route that would beat both is banned outright,
 *  because a width from the float logarithm carries an approximation into a ledger that must recompute exactly. So there
 *  is one right way to take a width here and it lives in src/hexbit.
 *
 *  WHAT THIS REFUSES, precisely: a doubling or halving loop that CARRIES A COUNTER, which is what defines a
 *  width. Not a popcount, which is per-bit by nature and counts set bits rather than measuring a span; not a
 *  loop seeking a bound with no counter, like grow.ts climbing past a population. Measured before wiring: zero
 *  genuine violations outside src/hexbit, three candidates all false — a popcount, a bound search, and a line of
 *  prose. A hard gate with false positives blocks honest work, so the pattern is the narrow one. */
/** A VALUE NAMED FOR A COMPUTATION MUST BE COMPUTED BY IT.
 *
 *  THE FINDING THAT MADE IT (2026-08-21): the fold's `movie` leaf was rewritten to digest theorem ADDRESSES instead
 *  of the auras derived from them. The reasoning was sound — an aura is a pure function of its address, so the two
 *  digests move together — and the result was still wrong: folding addresses computes no aura, while the leaf keeps
 *  the word. An aura is only an aura if it is DERIVED from the algebra (ray from Z/7, wave from the Z/9 vortex
 *  orbit, hue by the A432 step). Nothing caught it. hexbitGaps already enforces exactly this law for ONE name —
 *  "if it is named a hexbit, the unit computed it" — and that law was never generalised.
 *
 *  DECLARED, NEVER GUESSED. Each entry is a name whose computation is unambiguous and a token that must appear in
 *  the same assignment. A broad heuristic over identifiers would false-flag every variable that merely mentions a
 *  concept; this only holds names that NAME A COMPUTED ARTIFACT of this ledger. The list may grow as names earn a
 *  single meaning — and a name whose meaning is genuinely plural does not belong here at all. */
const COMPUTED_NAMES: { name: RegExp; needs: RegExp; why: string }[] = [
  { name: /^(movie|aura|auras|frames)$/, needs: /quantumAura|auraAlphabet|auraDecode/,
    why: 'an aura is DERIVED from the algebra (ray, wave, A432 hue) — a digest of the addresses it came from is not one' },
  // WHAT THIS TABLE REFUSED. `address` and `receipt` were drafted here and removed after measuring: both flagged ten
  // sites that were correct, because a value is often OBTAINED from the thing that computed it (`runTrial().receipt`)
  // rather than computed inline, and `merge(...)` mints an address without naming the mint. A finder that must
  // explain away its own findings is a finder nobody will keep, so those names stay out until their meaning is
  // single. This one is single: nothing derives an aura but the algebra.
]

/** A BACKTICKED KEY IS A CITATION, AND A CITATION TO NOTHING IS A HACK.
 *
 *  THE VIOLATION THAT MADE IT (2026-08-21): docs/school.md cited a purged Clay key in three places, one
 *  purged with the Clay wing — and the guard was GREEN. citationsGaps checks /theorem/<key> LINKS and slimGate reads
 *  `theorem <key>`, so a bare backticked key was examined by nothing. Eleven more dead names were found the same way,
 *  and the hosted edge still serves some of them from an older ledger, which is exactly how one gets written in good
 *  faith. A reader cannot tell a live citation from a dead one; only the ledger can.
 *
 *  A NAME IS KEY-SHAPED when it is lowercase with at least two underscores — the shape every sealed key has. Served
 *  MCP tool names are excluded because they are a different namespace with its own catalog, and `uuidna_`-prefixed
 *  tokens are tool-shaped by construction. Everything else in backticks that looks like a key must BE one. */
export function deadkeyGaps(): Gap[] {
  const gaps: Gap[] = []
  const sealed = new Set((theorems() as { key: string }[]).map((t) => t.key))
  const tools = new Set((MCP_CATALOG as { name: string }[]).map((t) => t.name))
  // EVERY SURFACE A READER TRUSTS, not just the site. A dead key in a source comment or a package doc reads exactly
  // as authoritative as one on a page — the same violation, one layer over. TESTS ARE EXEMPT BY NAME: they carry
  // deliberate NEGATIVE FIXTURES (no_such_key) fed to the refusers to prove the refusers refuse, and a finder that
  // flagged its own controls would be demanding the suite stop testing failure. Generated trees are skipped for the
  // usual reason — fixing a copy is drift; the source it came from is in scope.
  const walk = (d: string, ext: string): string[] => existsSync(d)
    ? readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() && !e.name.startsWith('.') && !['node_modules', 'dist', 'seeds', 'chunks', 'tests'].includes(e.name)
          ? walk(join(d, e.name), ext)
          : e.name.endsWith(ext) ? [join(d, e.name)] : [])
    : []
  const surfaces = [
    ...walk(join(ROOT, 'docs'), '.md'),
    ...walk(join(ROOT, 'src'), '.ts'),
    ...walk(join(ROOT, 'packages'), '.md'),
  ]
  for (const f of surfaces) {
    const rel = relative(ROOT, f)
    fileLines(f).forEach((l, i) => {
      for (const m of l.matchAll(/`([a-z][a-z0-9]*(?:_[a-z0-9]+){2,})`/g)) {
        const k = m[1]!
        if (sealed.has(k) || tools.has(k) || k.startsWith('uuidna_')) continue
        gaps.push({
          what: `${rel}:${i + 1} cites \`${k}\` in backticks, and the ledger seals no such key — a citation a reader cannot tell from a live one`,
          fix: `cite a key this ledger seals, or state the claim in words — a purged key still quoted is a fabricated citation, whatever the edge still serves`,
        })
      }
    })
  }
  return gaps
}

export function nameGaps(): Gap[] {
  const gaps: Gap[] = []
  for (const f of trackedFiles().filter((x) => x.startsWith('src/') && x.endsWith('.ts') && !x.includes('/tests/'))) {
    const lines = fileLines(join(ROOT, f))
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]!
      if (/^\s*(\/\/|\*)/.test(l)) continue
      const m = /^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(.*)$/.exec(l)
      if (!m) continue
      const [, name, rhsHead] = m
      const rule = COMPUTED_NAMES.find((r) => r.name.test(name!))
      if (!rule) continue
      // THE DERIVATION WINDOW. A value is often ASSEMBLED from one the algebra computed a few lines above
      // (`const a = quantumAura(core)` … `const aura = { rgb: a.rgb, … }`), so a forward-only window calls that a
      // violation when it is the law being obeyed. The window reaches six lines back and two forward — the same
      // shape audit-lean-form uses to let a theorem's own key vouch for its description.
      const rhs = [rhsHead, lines[i + 1] ?? '', lines[i + 2] ?? '', ...lines.slice(i > 6 ? i - 6 : 0, i)].join(' ')
      if (rule.needs.test(rhs)) continue
      gaps.push({
        what: `${f}:${i + 1} names a value \`${name}\` but does not compute one (\`${l.trim().slice(0, 56)}\`) — ${rule.why}`,
        fix: `compute it with the operation the name promises, or rename the value to what it actually holds — a name that outlives its computation is a claim nothing checks`,
      })
    }
  }
  return gaps
}

export function hexbitGaps(): Gap[] {
  const gaps: Gap[] = []
  let files: string[] = []
  files = trackedFiles().filter((f) => f.startsWith('src/') && f.endsWith('.ts'))
  for (const f of files) {
    if (f.startsWith('src/hexbit/') || f.includes('/tests/')) continue
    let src = ''
    try { src = fileText(join(ROOT, f)) } catch { continue }
    if (/GENERATED by|— GENERATED/.test(src.slice(0, 400))) continue
    // BOTH GAPS THIS FINDER RAISES NEED ONE OF TWO WORDS in the file: a value NAMED a hexbit, or a `while` loop
    // taking a width a bit at a time. A file holding neither cannot produce either gap, so the per-line regex
    // sweep is skipped whole — the same finding set, without scanning every line of every module to prove a
    // negative. This is the finder the captain named; it was the gate's most expensive.
    if (!src.includes('hexbit') && !src.includes('while')) continue
    const lines = fileLines(join(ROOT, f))
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]!
      if (/^\s*(\/\/|\*)/.test(l)) continue
      const window = l + ' ' + (lines[i + 1] ?? '')
      const doubles = /\b(\w+)\s*=\s*\1\s*\*\s*2\b|\b(\w+)\s*\*=\s*2\b/.test(window)
      const counts = /\b\w+\+\+|\+=\s*1\b/.test(window)
      // AND THE NAMING. The arithmetic is not the violation — mislabelling is. Something CALLED a hexbit that
      // was not computed by the unit is the error I made myself twice: once dividing hex characters by two and
      // reporting bytes as hexbits, once open-coding `(q - q % 4) / 4` in quantum/message hours after building
      // src/hexbit to end exactly that. Broad patterns cannot catch this — a gate on the literals 32 and 128
      // fires 400+ times on correct code, because FNV really is a 32-bit hash and a hex decoder really does
      // halve a character count. What is narrow and true: if it is named a hexbit, the unit computed it.
      // an ASSIGNMENT of a value, not a type annotation (`hexbits: number`) and not prose (`'…TWO HEXBITS…'`),
      // both of which the first version flagged — the word appearing is not the same as the value being made.
      const namesHexbit = /\b(const|let|var)\s+hexbits?\b\s*=|\bhexbits?\s*=\s*[^=]/.test(l) && !/why:|note:|'|"/.test(l.split('=')[0]!)
      const usesUnit = /hexbitsOf|bitsToHexbits|qubitsToHexbits|HEXBIT_BITS|UUID_HEXBITS|spareOf/.test(l)
      const declaration = /interface|type\s|readonly|\?:/.test(l)
      if (namesHexbit && !usesUnit && !declaration && !/hexBits/.test(l))
        gaps.push({
          what: `${f}:${i + 1} names a value \`hexbit\` but does not compute it with the unit (\`${l.trim().slice(0, 52)}\`)`,
          fix: 'compute it with src/hexbit — hexbitsOf, bitsToHexbits, qubitsToHexbits, spareOf — so the name and the arithmetic agree',
        })
      if (/\bwhile\b/.test(l) && doubles && counts)
        gaps.push({
          what: `${f}:${i + 1} takes a width one BIT at a time (\`${l.trim().slice(0, 56)}\`) — 2.9x the cost of the same width by tile`,
          fix: 'import bitsOf/hexbitsOf from src/hexbit — one implementation, exact integers, and the tile is the unit this ledger computes in',
        })
    }
  }
  return gaps
}

/** INCOMPLETE — the key claims more than the statement establishes.
 *
 *  A theorem whose NAME says every, never, reaches or generates is claiming something universal, and only a
 *  quantifier can carry that: `.all` over a range, a walked enumeration, a list decided element by element. A
 *  handful of point facts cannot, however true each one is.
 *
 *  This was earned. a theorem claiming the void and the axis never reach each other was sealed here with the word REACH in its
 *  name while its Lean settled counts and its JS applied each motion ONCE from the seed — never closing the set
 *  under composition. One step is not a walk: closed properly, every seed reaches all nine residues and the
 *  theorem was false. It passed the kernel, the axiom audit, the vacuous check and the literal check, because
 *  none of them compares a name to what its statement actually quantifies over.
 *
 *  AN ENUMERATED LIST COUNTS. A statement decided over `[a, b, c, …]` walks its domain exhaustively and is a
 *  quantification; an earlier version of this finder called those unquantified and flagged eighteen theorems,
 *  most of them sound. The prompt names the domain the key implies, so the fix is stated rather than hinted. */
export function incompleteGaps(): Gap[] {
  // VERBS AND ADVERBS ONLY — a universal is a claim about all cases, not a noun that happens to share a stem.
  // `sixteen_connectives` counts sixteen things and proves the count with 2^4 = 16; it claims nothing universal,
  // and `connect\w*` flagged it because "connectives" starts the same way. The words below are the ones that
  // assert scope: reaches, connects, generates, and the quantifying adverbs.
  const UNIVERSAL = /(^|_)(every|never|always|reaches|reach|connects|connect|generates|generate|closed)(_|$)/
  const quantifies = (s: string): boolean =>
    /\.(all|every|filter|map|flatMap)\b|List\.range/.test(s) || /\[[^\]]*,[^\]]*,[^\]]*\]/.test(s)
  return theorems()
    .filter((t) => UNIVERSAL.test(t.key) && !quantifies(t.statement))
    .map((t) => ({
      what: `${t.key} claims a universal ("${(t.key.match(UNIVERSAL) ?? [, , ''])[2]}") but its statement quantifies over nothing — \`${t.statement.slice(0, 54)}\``,
      fix: `state it over the domain the name claims: (List.range N).all (fun x => …) or a decided enumeration, so the walk is closed rather than sampled — a handful of point facts cannot carry a universal, and one step is not a walk`,
    }))
}

/** LONELY — a theorem that connects to nothing in its own wing.
 *
 *  A theorem leans on its neighbours or it is a name with a sum under it. `fold_prototype_pollution` settles
 *  1300 + 21 = 1321 and shares neither a symbol nor a constant with anything else in Exploits.lean: the
 *  arithmetic is true and what it has to do with prototype pollution is carried entirely by the key.
 *
 *  CONSTANTS COUNT AS CONNECTION. Reading identifiers alone reports 39 lonely theorems and the examples are
 *  `division_by_zero`, `units_z9`, `digital_root` — the core of their wing, flagged because they are stated in
 *  bare numerals with no symbols at all. Counting numerals too gives 23 and an entirely different set. An
 *  isolation detector that flags the most central theorems in the ledger is measuring its own blind spot.
 *
 *  ADVISORY, NOT BLOCKING. A wing's first theorem in a new direction has no neighbours yet, and that is growth
 *  rather than rot — so this reports and never refuses. `incomplete` blocks because a universal with nothing
 *  quantified is always wrong; lonely is a question, not a verdict. */
export function lonelyGaps(): Gap[] {
  const STOP = /^(List|range|fun|all|Nat|Int|true|false|filter|map|length|sum|if|then|else)$/
  const toks = (s: string): Set<string> => new Set([
    ...(s.match(/[A-Za-z_][A-Za-z0-9_]{2,}/g) ?? []).filter((w) => !STOP.test(w)),
    ...(s.match(/\b\d+\b/g) ?? []),
  ])
  const byWing = new Map<string, ReturnType<typeof theorems>>()
  for (const t of theorems()) byWing.set(t.file, [...(byWing.get(t.file) ?? []), t])
  const gaps: Gap[] = []
  for (const [file, ts] of byWing) {
    if (ts.length < 2) continue          // a wing of one has no neighbours to connect to
    for (const t of ts) {
      const mine = toks(t.statement)
      if (mine.size === 0) continue
      if (ts.some((o) => o.key !== t.key && [...toks(o.statement)].some((w) => mine.has(w)))) continue
      gaps.push({
        what: `${t.key} shares no symbol and no constant with any neighbour in ${file} — \`${t.statement.slice(0, 46)}\``,
        fix: 'connect it: state it over a constant or definition the wing already uses, so the theorem leans on its neighbours instead of standing alone under its name',
      })
    }
  }
  return gaps
}

/** MARKUP THAT DOES NOT CLOSE — the defect that broke every theorem page and passed every gate.
 *
 *  A clause-strip removed `, not truth</small></div>` from render.ts, leaving `>integrity` and a <div> that
 *  never closed. It compiled. Types passed, the kernel passed, the axiom audit passed, every finder passed — and
 *  VitePress then failed all 1442 theorem pages with "Element is missing end tag", naming a symptom four layers from
 *  the cause. It took a separate debugging session to find, and the same strip damaged four other files the same
 *  evening, each rediscovered from scratch.
 *
 *  THE RULE: markup a module emits must balance. Count opening and closing tags per file for the elements that
 *  carry content; a mismatch means a template is emitting HTML that no browser will parse and no compiler will
 *  refuse. Void elements (br, img, hr, input, meta, link) never close and are excluded.
 *
 *  This is the finder I owed and did not write while fixing five instances by hand — the exact failure the
 *  captain's rule names: hard labour is only worth spawning to build the tool that ends it. */
export function markupGaps(): Gap[] {
  const CARRY = ['div', 'article', 'section', 'span', 'small', 'p', 'a', 'ul', 'li', 'table', 'tr', 'td', 'h1', 'h2', 'h3']
  const gaps: Gap[] = []
  let files: string[] = []
  try { files = execSync("git ls-files 'src/'", { encoding: 'utf8' }).trim().split('\n').filter((f) => f.endsWith('.ts')) } catch { return gaps }
  for (const f of files) {
    if (f.includes('/tests/')) continue
    let src = ''
    try { src = readFileSync(join(ROOT, f), 'utf8') } catch { continue }
    // COMMENTS ARE MENTIONS, NOT EMISSIONS. The first version counted tags inside prose and flagged four files,
    // one of them this very finder — whose doc comment names `</div>` while explaining the defect it hunts. The
    // same use-versus-mention trap the determinism scan, the sources finder and the comments finder each sprang.
    const code = src
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .split('\n').filter((l) => !/^\s*(\/\/|\*)/.test(l)).join('\n')
    if (!/<[a-z]+[ >]/.test(code)) continue
    for (const tag of CARRY) {
      const open = (code.match(new RegExp(`<${tag}[ >$]`, 'g')) ?? []).length
      const close = (code.match(new RegExp(`</${tag}>`, 'g')) ?? []).length
      if (open !== close) gaps.push({
        what: `${f} emits ${open} <${tag}> and closes ${close} — markup that does not balance compiles fine and fails only where it is rendered`,
        fix: `close the ${tag} in the template that emits it; a stripped clause often takes the closing tag with it, which is how render.ts lost its closing tag and broke every theorem page`,
      })
    }
  }
  return gaps
}
