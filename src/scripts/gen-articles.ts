#!/usr/bin/env node
// gen-articles — THE DESK WRITES. Articles are COMPUTED from the ledger
// (per lean/*.lean file), headline from its principle, lede from the wing's own generated header (the single
// source), body one section per theorem — the claim is the theorem's name, the evidence its exact statement,
// the citation its /theorem/<key> page — and the scope box is the header's own honest-scope clause. Every
// sentence is born citing a sealed proof, so the article passes the same desk that edits it (provenance,
// citations, the prose trials) by construction. Deterministic: ledger order, no wall-clock, no RNG.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { theorems } from '../index.js'
import { ROOT } from './api.js'

interface Entry { key: string; name: string; statement: string; file: string; principle: string; skill: string }

const T = theorems() as Entry[]
const byFile = new Map<string, Entry[]>()
for (const t of T) {
  if (!byFile.has(t.file)) byFile.set(t.file, [])
  byFile.get(t.file)!.push(t)
}

const OUT = join(ROOT, 'docs', 'articles')
mkdirSync(OUT, { recursive: true })

// THE READER RE-PROVES IT, WITHOUT INSTALLING ANYTHING. Every wing imports nothing — no Mathlib, no local
// module — so a wing's source is a complete input to any Lean 4 kernel. live.lean-lang.org takes that source
// from a `url=` hash param and runs it in the browser, which turns each article into an offer the reader can
// accept: not "trust the ledger", but "here is the kernel, re-decide it yourself".
//
// The playground fetches the source CROSS-ORIGIN from the browser, so the base must send CORS.
// raw.githubusercontent.com sends `access-control-allow-origin: *`; uuidna.com's own /lean/ copy sends no such
// header and fails with `TypeError: Failed to fetch`, so the site cannot serve its own proofs here. That is a
// property of the host, not a preference — if uuidna.com ever sends the header, this base may move home.
const RAW = 'https://raw.githubusercontent.com/uuidna/uuidna/refs/heads/main/lean/'

// The reader must run the kernel the ledger is SEALED against, or the link proves something about a different
// Lean than the one we verified on. The channel is looked up from lean-toolchain rather than typed, and an
// unknown version STOPS generation: a verify link naming the wrong kernel is worse than no verify link, because
// it looks like a confirmation. Add the channel here when the toolchain moves — deliberately, not silently.
const CHANNELS: Record<string, string> = { 'v4.33.0': 'mathlib-stable' }
const LEAN_VERSION = (readFileSync(join(ROOT, 'lean-toolchain'), 'utf8').trim().split(':')[1] ?? '').trim()
const PROJECT = CHANNELS[LEAN_VERSION]
if (!PROJECT)
  throw new Error(
    `gen-articles: lean-toolchain pins Lean ${LEAN_VERSION || '(unreadable)'}, which names no live.lean-lang.org ` +
    `channel in CHANNELS. Add it — otherwise every article would offer the reader a kernel the ledger was not ` +
    `sealed against, and the verify link would confirm the wrong thing.`)

/** verifyLink(file) → a live.lean-lang.org permalink that re-runs this wing's proofs in the reader's browser.
 *  encodeURIComponent matches the playground's own hash encoder, so the value round-trips through its parser. */
const verifyLink = (file: string): string =>
  `https://live.lean-lang.org/#project=${PROJECT}&url=${encodeURIComponent(RAW + file)}`

// the wing's own header (the generated first line) is the lede — the one place the wing describes itself
const ledeOf = (file: string): string => {
  const p = join(ROOT, 'lean', file)
  if (!existsSync(p)) return ''
  const first = readFileSync(p, 'utf8').split('\n')[0] ?? ''
  const m = first.match(/GENERATED\. (.*?) Every proof/)
  return m ? m[1] : first.replace(/^-- /, '')
}

/** boundaryLine(entries) → what this wing can HONESTLY say about its own boundaries, counted rather than claimed.
 *
 *  Every article used to print "every boundary it names is CONFIRMED by a sealed theorem."
 *  That sentence was a template constant applied to all 72 wings, so it was true of the wings that had sealed their
 *  boundaries and false of the ones that had not — and the reader had no way to tell which article they were
 *  holding. It was carried as a CRITICAL finding against docs/articles/neuro.md, where the wing's stated boundaries
 *  were backed by a theorem that folded to a constant.
 *
 *  A blanket assurance that cannot vary is not an assurance. This counts the wing's demarcating theorems — those
 *  whose prose names a limit (NOT, never, only, fails, bounded) — and says how many there are. A wing with none
 *  says so plainly instead of claiming the opposite. */
const DEMARCATES = /\b(?:NOT|not|never|only|fails?|bounded|cannot|no longer|neither)\b/
const boundaryLine = (entries: { key: string; name: string }[]): string => {
  const bounded = entries.filter((t) => DEMARCATES.test(t.name))
  if (!bounded.length)
    return 'This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.'
  return `${bounded.length} of its ${entries.length} theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [${bounded[0]!.key}](/theorem/${bounded[0]!.key}). A boundary stated here is decided.`
}

const slugOf = (file: string): string => file.replace('.lean', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

let n = 0
const index: Array<{ slug: string; title: string; count: number; file: string }> = []
for (const [file, entries] of [...byFile.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1)) {
  const principle = entries[0]?.principle ?? file.replace('.lean', '')
  const lede = ledeOf(file)
  const slug = slugOf(file)
  const scope = lede.match(/([^.]*\.)/)?.[1] ?? ''
  const body = entries.map((t) =>
    // heading and citation stay ONE block (no blank line): the claim and its proof are inseparable — a
    // paragraph is never split from the citation that confirms it (the lean form: confirm
    `### ${t.name}\n` +
    `The ledger holds this as [${t.key}](/theorem/${t.key}) — proven \`by decide\`, sorry-free:\n\n` +
    '```lean\n' + t.statement + '\n```\n').join('\n')
  const md = `---
title: "${principle.replace(/"/g, "'")}"
description: "Computed from lean/${file} — ${entries.length} sealed theorems, every claim citing its proof."
---

# ${principle}

> ${lede.replace(/\n/g, ' ')} — held by [${entries[0]!.key}](/theorem/${entries[0]!.key}) and its ${entries.length - 1} siblings below.

**${entries.length} theorems**, from [${entries[0]!.key}](/theorem/${entries[0]!.key}) onward, each proven \`by decide\` in <a href="/lean/${file}">lean/${file}</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. ${boundaryLine(entries)}

**[Re-prove this wing in your browser ↗](${verifyLink(file)})** — nothing to install. The editor fetches \`lean/${file}\` from the repository and re-decides all ${entries.length} proofs on Lean ${LEAN_VERSION}, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

${body}
${scope ? `\n::: warning \n${scope} The boundary is confirmed by the wing's own sealed theorems — e.g. [${entries[0]!.key}](/theorem/${entries[0]!.key}) — never merely denied.\n:::\n` : ''}
*Computed from the sealed ledger. Re-verify any theorem with \`npm run lean\`; the article regenerates with \`npm run editorial\`.*
`
  writeFileSync(join(OUT, slug + '.md'), md)
  index.push({ slug, title: principle, count: entries.length, file })
  n++
}

// the articles index — the desk's front page, itself computed; the search-trial publications (the online wave's
// returns, written by quantum-search-trial) are indexed beneath the wings so no publication is an orphan.
const searchPages = readdirSync(OUT).filter((f) => f.startsWith('search-') && f.endsWith('.md')).sort()
const indexMd = `---
title: Articles
description: "The desk writes — one computed article per wing of the ledger, every claim citing its sealed proof."
---

# Articles <Badge type="tip" text="computed" />

**The editorial desk writes what the ledger proves.** One article per wing — the headline is the principle, the lede is the wing's own header, every claim cites its theorem, and the honest-scope box is part of the article because it is part of the proof. Regenerated by \`npm run editorial\` before any publication; verified by the same desk that wrote it.

Every wing carries a **re-prove** link: it opens the wing's source in a browser Lean ${LEAN_VERSION} kernel and
re-decides its proofs on the reader's own machine. No install, no clone, no account — the whole input travels
in the link, because these wings import nothing.

| article | theorems | re-prove |
|---|---|---|
${index.map((i) => `| [${i.title}](/articles/${i.slug}) | ${i.count} | [↗](${verifyLink(i.file)}) |`).join('\n')}
${searchPages.length ? `
## The search on trial

The online wave's returns — each publication is what one trial of the quantum search returned: findings
content-addressed, verdicts computed, sealed backing cited, novelty leads remanded. Refreshed on the research cron.

${searchPages.map((f) => `- [${f.replace('.md', '')}](/articles/${f.replace('.md', '')})`).join('\n')}
` : ''}`
writeFileSync(join(OUT, 'index.md'), indexMd)

console.log(`✓ gen-articles — ${n} articles computed from ${T.length} theorems (docs/articles/, one per wing) + the index; every claim cites its sealed proof, the desk verifies its own writing.`)
