#!/usr/bin/env node
// @finder phase:13 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// refusal-census — EVERY REFUSAL IN THIS TREE, AND WHETHER A SEALED THEOREM STANDS BEHIND IT.
//
// The captain, 2026-09-28: "remove ALL refusals not based on cross formulated theorems proving each other".
//
// MEASURE BEFORE REMOVING, because a guard deleted on a miscount is a protection traded for a number. A first grep said
// 236 refusal sites with 11 naming a theorem, which would make 225 bare — but it only looked four lines past each
// throw, and several guards cite their theorem in the file header instead. A census that undercounts the grounded ones
// argues for deleting guards that are in fact grounded, which is the most expensive way to be wrong here.
//
// WHAT COUNTS AS GROUNDED, and the bar is the captain's: a refusal is grounded when its file names a theorem key THE
// LEDGER ACTUALLY SEALS. A key that no wing proves is a fabricated citation, which is worse than no citation — it reads
// as authority and answers to nothing — so the key is checked against the ledger rather than merely matched as a word.
//
// THE SECURITY CARVE-OUT IS THE CAPTAIN'S OWN AND IS APPLIED HERE RATHER THAN ARGUED. The standing rule of 2026-09-14
// reads: "remove any allow lists or disallowed or any manual logic whatsoever not coming from lean decisions. This never
// licenses deleting access control or secret handling; derive them instead." So a refusal about credentials, secrets,
// tokens, permissions or injection is reported in its own class: ungrounded by the same test, and to be DERIVED, never
// deleted.
//
// IT REPORTS AND REMOVES NOTHING. Which ungrounded refusal is furniture and which is a real protection whose theorem was
// never written is a judgement about what the tree owes, and this door has no standing to make it.

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { servedAsync } from '../receipt.js'
import { fsStore, ledgerAndRule } from './receipted.js'

// TWO THINGS WERE CONFLATED AND THEY ARE NOT THE SAME REFUSAL. The first census counted every `throw new Error` and
// reported 1,024 sites, with src/nobles/modular.ts, weierstrass.ts, edwards.ts, curve.ts and ml-kem.ts among the
// heaviest "bare" files — vendored noble cryptography, whose throws are ARGUMENT VALIDATION in third-party code. A
// census arguing for their deletion would be arguing to remove length checks from an elliptic-curve implementation.
//
// A GATE refuses to let work proceed: it pushes a gap to a guard, and it is the tree's own judgement about what may
// land. An ARGUMENT CHECK rejects an input its function cannot process, which is the function's contract, not a policy.
// The captain's instruction is about the first: a gate is where a refusal needs a theorem behind it, because a gate is
// where the tree decides. Both are counted, separately, and only gates are offered as the answer.
/** a GATE refusal: a gap pushed to a guard — the tree's own judgement about what may proceed */
const GATES = /gaps\.push\(/
/** an ARGUMENT CHECK: a thrown error, which is a function's contract with its caller */
const CHECKS = /throw new Error\(/
const REFUSES = /(gaps\.push\(|throw new Error\()/
/** the words that mark a refusal as access control or secret handling — the captain exempts these from deletion */
const SECURITY = /\b(secret|credential|token|password|permission|auth|authoris|authoriz|inject|escalat|privileg|sanitis|sanitiz|forge|tamper)/i

interface Site { file: string; line: number; text: string; security: boolean; gate: boolean }
interface FileVerdict { file: string; gates: number; checks: number; cites: string[]; grounded: boolean; security: number }

const census = await servedAsync<{ sites: number; files: FileVerdict[] }>({
  path: 'lean/refusal-census-receipt.json',
  inputs: ledgerAndRule(['dist/scripts/refusal-census.js']),
  compute: async () => {
    const { sourceGraph } = await import('../test-paths.js')
    const { judged } = await import('./api.js')
    const { theorems } = await import('../theorems/index.js')
    const sealed = new Set(theorems().map((t) => String(t.key)))

    const { files } = judged([...sourceGraph().keys()])
    const sites: Site[] = []
    const byFile = new Map<string, FileVerdict>()
    for (const rel of files) {
      if (!rel.endsWith('.ts') || rel.endsWith('.test.ts')) continue
      let body = ''
      try { body = readFileSync(join(ROOT, rel), 'utf8') } catch { continue }
      if (!REFUSES.test(body)) continue
      const lines = body.split('\n')
      const here: Site[] = []
      for (let i = 0; i < lines.length; i += 1) {
        const l = lines[i]!
        if (!REFUSES.test(l)) continue
        // a refusal's subject is the line and the three after it, where the message usually sits
        const window = [l, lines[i + 1] ?? '', lines[i + 2] ?? '', lines[i + 3] ?? ''].join(' ')
        here.push({ file: rel, line: i + 1, text: l.trim().slice(0, 100), security: SECURITY.test(window), gate: GATES.test(l) })
      }
      if (here.length === 0) continue
      sites.push(...here)
      // EVERY theorem key the file names, kept only if the ledger seals it — a fabricated citation grounds nothing
      const named = [...new Set([...body.matchAll(/\btheorem ([a-z][a-z0-9_]{3,})\b/g)].map((m) => m[1]!))]
      const cites = named.filter((k) => sealed.has(k))
      byFile.set(rel, {
        file: rel,
        gates: here.filter((h) => h.gate).length,
        checks: here.filter((h) => !h.gate).length,
        cites,
        grounded: cites.length > 0,
        security: here.filter((h) => h.security).length,
      })
    }
    return { sites: sites.length, files: [...byFile.values()].sort((a, b) => b.gates - a.gates) }
  },
}, fsStore)

const { sites, files } = census.value
const withGates = files.filter((f) => f.gates > 0)
const grounded = withGates.filter((f) => f.grounded)
const bare = withGates.filter((f) => !f.grounded)
const allGates = files.reduce((n, f) => n + f.gates, 0)
const allChecks = files.reduce((n, f) => n + f.checks, 0)
const groundedSites = grounded.reduce((n, f) => n + f.gates, 0)
const bareSites = bare.reduce((n, f) => n + f.gates, 0)
const securitySites = bare.reduce((n, f) => n + f.security, 0)

console.log(census.hit ? `served by receipt ${census.digest}` : `walked and earned receipt ${census.digest}`)
console.log(`refusal sites ${sites} across ${files.length} file(s)`)
console.log(`  ARGUMENT CHECKS (a function's contract, not a policy): ${allChecks} — not the captain's subject`)
console.log(`  GATES (the tree deciding what may proceed): ${allGates} in ${withGates.length} file(s)`)
console.log(`  GROUNDED in a sealed theorem: ${groundedSites} sites in ${grounded.length} file(s)`)
console.log(`  bare — no sealed theorem named: ${bareSites} sites in ${bare.length} file(s)`)
console.log(`  of the bare, access control or secret handling: ${securitySites} site(s) — the captain exempts these:`)
console.log(`    "This never licenses deleting access control or secret handling; derive them instead." (2026-09-14)`)
console.log()
console.log('the bare refusals, heaviest first — each is a question, not a verdict:')
for (const f of bare.slice(0, 16)) {
  console.log(`  ${String(f.gates).padStart(4)} gate(s)${f.security > 0 ? ` (${f.security} security)` : ''}  ${f.file}`)
}
if (bare.length > 16) console.log(`  … and ${bare.length - 16} more files`)
console.log()
console.log('A BARE REFUSAL IS NOT AUTOMATICALLY FURNITURE. Some are protections whose theorem was never written, and')
console.log('the remedy there is the theorem, not the deletion. Nothing is removed by this door.')
