#!/usr/bin/env node
// @finder phase:12 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// audit-refusal-grounds — WHICH REFUSALS THE LEDGER ACTUALLY BACKS, AND WHICH ARE A RULE SOMEBODY WROTE.
//
// The captain, 2026-09-28: "remove ALL refusals not based on cross formulated theorems proving each other".
//
// A REFUSAL IS THE STRONGEST THING A GATE DOES: it stops the work and says the tree is wrong. That claim is only as
// good as its ground. If a step refuses because the kernel decided something, the refusal carries the kernel's
// authority. If it refuses because a regex did not find a word in a comment, it carries the authority of whoever typed
// the regex — and this session is the evidence, because the word `declared boundary` was missing from one such list
// and the finder refused a cure its own printed message had recommended.
//
// THE GUARD ALREADY KNOWS THIS, and what follows is a QUOTATION of its own ADVISORY tier — a named decision of this
// project, which is the ground for the limit it states: "Every entry here decided something OTHER than a Lean
// violation ... None of them can refuse a proof, and a gate that cannot refuse a proof is custom logic over spelling,
// counting or presentation." Those finders were demoted and then removed. This reads the rest of
// the gate by the same standard, and it reads it FROM SOURCE rather than from a list, so a finder added tomorrow is
// classified the day it lands.
//
// THE TEST IS THE LEDGER'S, NOT MINE. A step is GROUNDED when its own implementation cites a theorem key that
// lean/*.lean actually seals — verified against the sealed set, so a plausible-looking citation to a theorem that does
// not exist counts for nothing (this tree drains a claim that cites an unsealed theorem, and the same rule applies to
// a gate). Everything else is REPORTED: it may print, deposit and rank, and it may not stop the work.
//
// WHAT THIS DOES NOT DO: it does not decide that an ungrounded finder is WRONG. Most of them are useful and several
// have caught real defects. It decides only that a useful judgement is not a proof, which is the distinction the
// captain's instruction turns on.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, wrRoot } from '../boundary.js'
import { theorems } from '../theorems/index.js'
import { wrArtifact } from '../artifact.js'

const GUARD = join(ROOT, 'src/scripts/guard.ts')
const RECEIPT = join(ROOT, 'src/scripts/one-receipt.ts')

export interface Ground { finder: string; grounded: boolean; cited: string[]; unsealedCitations: string[] }

/** the source of a named export in a module, from its declaration to the next top-level declaration */
export function sourceOfExport(text: string, name: string): string {
  const re = new RegExp('^(?:export )?(?:const|function|async function) ' + name + '\\b', 'm')
  const m = re.exec(text)
  if (!m || m.index === undefined) return ''
  const rest = text.slice(m.index)
  const next = /\n(?:export )?(?:const|function|async function) [a-zA-Z]/.exec(rest.slice(1))
  return next ? rest.slice(0, next.index + 1) : rest
}

/** classify one finder from its own body plus the bodies of the gap functions it calls */
export function groundOfFinder(finder: string, body: string, receiptText: string, sealed: ReadonlySet<string>): Ground {
  const called = [...body.matchAll(/\b([a-zA-Z][a-zA-Z0-9]*(?:Gaps|Reading))\s*\(/g)].map((m) => m[1] as string)
  const text = body + '\n' + [...new Set(called)].map((n) => sourceOfExport(receiptText, n)).join('\n')
  const all = [...new Set([...text.matchAll(/theorem ([a-z0-9_]{6,})/g)].map((m) => m[1] as string))]
  const cited = all.filter((k) => sealed.has(k))
  return { finder, grounded: cited.length > 0, cited, unsealedCitations: all.filter((k) => !sealed.has(k)) }
}

/** every finder the guard runs, read out of the guard's own source — never a list kept beside it */
export function findersOf(guardText: string): { name: string; body: string }[] {
  const out: { name: string; body: string }[] = []
  // each entry is `{ name: 'x', run: ... }` inside the FINDERS array; the body runs to the next entry
  const re = /\{\s*name:\s*'([a-z0-9-]+)'\s*,\s*(?:needsBuiltSite:\s*\w+\s*,\s*)?run:/g
  const starts: { name: string; at: number }[] = []
  for (let m = re.exec(guardText); m !== null; m = re.exec(guardText)) starts.push({ name: m[1] as string, at: m.index })
  for (let i = 0; i < starts.length; i++) {
    const from = starts[i]!.at
    const to = i + 1 < starts.length ? starts[i + 1]!.at : guardText.length
    out.push({ name: starts[i]!.name, body: guardText.slice(from, to) })
  }
  return out
}

if (process.argv[1]?.endsWith('audit-refusal-grounds.js')) {
  const sealed = new Set(theorems().map((t) => t.key))
  const guardText = readFileSync(GUARD, 'utf8')
  const receiptText = readFileSync(RECEIPT, 'utf8')
  const finders = findersOf(guardText)
  const rows = finders.map((f) => groundOfFinder(f.name, f.body, receiptText, sealed))
  const grounded = rows.filter((r) => r.grounded)
  const reported = rows.filter((r) => !r.grounded)
  const fabricated = rows.filter((r) => r.unsealedCitations.length > 0)

  console.log(`audit-refusal-grounds — ${rows.length} guard finder(s): ${grounded.length} backed by a SEALED theorem, ${reported.length} backed by a written rule`)
  console.log()
  console.log('  GROUNDED — these may refuse, and the ledger is why:')
  for (const r of grounded) console.log(`    ✓ ${r.finder.padEnd(22)} ${r.cited.slice(0, 2).join(', ')}`)
  console.log()
  console.log('  A WRITTEN RULE — useful judgements, and not proofs:')
  for (const r of reported) console.log(`    · ${r.finder}`)
  if (fabricated.length > 0) {
    console.log()
    console.log('  CITES A THEOREM THE LEDGER DOES NOT SEAL — a citation that counts for nothing:')
    for (const r of fabricated) console.log(`    ✗ ${r.finder}: ${r.unsealedCitations.slice(0, 3).join(', ')}`)
  }

  wrArtifact('lean/refusal-grounds.json', {
    kind: 'refusal-grounds',
    why: 'A refusal is only as good as its ground. A guard step that cites a theorem the ledger seals refuses with the '
      + "kernel's authority; one that decides by a written rule refuses with its author's. This reads the guard's own "
      + 'source, so a finder added tomorrow is classified the day it lands, and it verifies every citation against the '
      + 'sealed set, because a citation to a theorem that does not exist counts for nothing.',
    finders: rows.length,
    grounded: grounded.length,
    writtenRule: reported.length,
    groundedRows: grounded,
    writtenRuleRows: reported.map((r) => r.finder),
    fabricatedCitations: fabricated,
  })
  process.exit(0)
}
