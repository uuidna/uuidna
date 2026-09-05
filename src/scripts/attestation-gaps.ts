#!/usr/bin/env node
// attestation-gaps — A WRITER OF ATTESTATIONS MUST NAME WHAT IT VERIFIED.
//
// gate-receipt was hardened on 2026-09-01 to refuse a bare write. A receipt that names its arms is unable to
// claim a run nobody made, and the reason is structural: the arms and the run sit in the same command line, so
// there is no place for the two to drift apart. The hardening was correct and the FOLD was not made — `next` was fixed at its call site and
// `reconcile` was left calling it bare, so on 2026-09-05 the whole reconcile chain died at the receipt step
// after paying for the full regeneration. One fix at one call site is a repair; the finder is the fold.
//
// THE DECIDABLE QUESTION: does any source invoke the receipt WRITER without naming its arms? Writing is the
// mode that makes a claim (`gate-receipt.js` with no flag, or with flags that do not include --verified);
// `--verify` is the READER and asserts nothing, so it is not a gap. Pure over the source text; no run needed.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

/** the writers that attest, and the flag each must carry to say what it covered */
export const ATTESTORS: readonly { invocation: string; names: string; readerFlags: readonly string[] }[] = [
  { invocation: 'gate-receipt.js', names: '--verified', readerFlags: ['--verify'] },
]

export function attestationGaps(files: readonly string[]): { what: string; fix: string }[] {
  const gaps: { what: string; fix: string }[] = []
  for (const rel of files) {
    if (rel.endsWith('attestation-gaps.ts') || rel.endsWith('.test.ts')) continue
    let src: string
    try { src = readFileSync(join(ROOT, rel), 'utf8') } catch { continue }
    for (const a of ATTESTORS) {
      if (rel.endsWith('/' + a.invocation.replace('.js', '.ts'))) continue   // the writer itself
      for (const line of src.split('\n')) {
        const at = line.indexOf(a.invocation)
        if (at < 0) continue
        if (line.trimStart().startsWith('//')) continue                       // prose about it, not a call
        const call = line.slice(at)
        if (call.includes(a.names)) continue
        if (a.readerFlags.some((f) => call.includes(f))) continue             // the reader asserts nothing
        // only an INVOCATION counts: the name followed by end-of-string, a quote, or a flag — not a path read
        if (!/\.js(['"`]|\s+-)/.test(call)) continue
        gaps.push({
          what: `${rel} invokes ${a.invocation} without ${a.names} — it would write an attestation naming nothing`,
          fix: `pass ${a.names} <arms> listing exactly what THIS chain ran (e.g. --verified guard,build); a receipt naming fewer arms is weaker and honest, one naming an unrun arm is the failure the writer refuses`,
        })
      }
    }
  }
  return gaps
}
