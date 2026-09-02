#!/usr/bin/env node
// @non-harmonic: reads the git index and the working tree — host boundary only.
//
// leak-scan — WHAT LEAVES THIS MACHINE WHEN A COMMIT LEAVES IT (the captain, 2026-09-02: "there are git leaks
// not caught pre push"). The pre-push gate ran guard, the court and reconcile, and NONE of them looked at what
// the bytes contain. That is not a hypothetical gap: lean/quantum-advantage.json carried a `device` object —
// this developer's CPU model, core count and installed memory — committed and served from the public site, for
// as long as that generator existed. No gate objected. CI eventually failed it, but only as a DETERMINISM drift
// on a runner with different hardware, which is catching a privacy leak by accident and only because the leak
// happened to also be non-reproducible. A secret that reproduces perfectly would never have been caught at all.
//
// TWO CLASSES, and they fail for different reasons:
//   • CREDENTIALS — a key, token or private key committed. Irreversible the moment it is pushed: rotating is the
//     only cure, because the object stays in the history and on every fork.
//   • HOST IDENTITY AS DATA — the machine's cpu/memory/core-count/home path folded into a committed artifact.
//     Not a secret, but it is someone's hardware published under a claim of reproducibility, and it makes the
//     derived layer reproducible on exactly one machine, which is how it broke the release.
//
// USE VERSUS MENTION IS THE WHOLE DIFFICULTY, and this tree has been bitten by it five times. Prose that
// EXPLAINS the rule ("quoting an Apple M1 Max at a reader would be quoting someone else's hardware") must not be
// a finding, or the finder makes its own documentation unwritable. So the credential rules apply everywhere,
// while the host-identity rule applies ONLY to DATA files — committed .json — where a CPU string can only have
// arrived by being measured, never by being discussed.
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

export interface Leak { file: string; line: number; kind: string; why: string }

/** credential shapes — a match is a finding wherever it appears, prose included: a real key in a comment is a real key. */
const CREDENTIALS: readonly { kind: string; re: RegExp }[] = [
  { kind: 'aws access key id', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { kind: 'github token', re: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/ },
  { kind: 'github fine-grained token', re: /\bgithub_pat_[A-Za-z0-9_]{50,}\b/ },
  { kind: 'openai-style key', re: /\bsk-[A-Za-z0-9]{32,}\b/ },
  { kind: 'slack token', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { kind: 'private key block', re: /-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/ },
  { kind: 'cloudflare api token assignment', re: /CLOUDFLARE_API_TOKEN\s*[=:]\s*["'][A-Za-z0-9_-]{20,}["']/ },
  { kind: 'generic secret assignment', re: /\b(?:api[_-]?key|secret|passwd|password|token)\s*[=:]\s*["'][A-Za-z0-9+/_-]{24,}["']/i },
]

/** host identity — checked in DATA only, where a value can only have been measured. */
const HOST_IN_DATA: readonly { kind: string; re: RegExp }[] = [
  { kind: 'cpu model', re: /"[^"]*(?:Apple M\d|Intel\(R\)|AMD Ryzen|Core\(TM\))[^"]*"/ },
  { kind: 'installed memory', re: /"memoryGiB"\s*:\s*\d+/ },
  { kind: 'core count', re: /"logical"\s*:\s*\d+/ },
  { kind: 'home directory path', re: /"\/(?:Users|home)\/[A-Za-z0-9_.-]+/ },
]

/** THIS FILE DECLARES THE PATTERNS, so it matches itself — the use/mention trap the tree has hit five times. */
const SELF = new Set(['src/scripts/leak-scan.ts', 'dist/scripts/leak-scan.js'])

const tracked = (): string[] =>
  execSync('git ls-files', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    .split('\n').map((f) => f.trim()).filter(Boolean)

/** leakGaps() → every credential shape anywhere, and host identity in committed DATA. Pure over the index. */
export function leakGaps(): Leak[] {
  const out: Leak[] = []
  for (const file of tracked()) {
    if (SELF.has(file)) continue
    if (/^package-lock\.json$/.test(file)) continue
    let text = ''
    try { text = readFileSync(join(ROOT, file), 'utf8') } catch { continue }
    if (text.includes('\0')) continue
    const isData = /\.(?:json|jsonld)$/.test(file)
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      for (const c of CREDENTIALS) {
        if (c.re.test(line)) {
          out.push({ file, line: i + 1, kind: c.kind, why: 'a credential in the index is public the moment it is pushed, and stays in history and on every fork — rotate it, then remove it' })
        }
      }
      if (!isData) continue
      for (const h of HOST_IN_DATA) {
        if (h.re.test(line)) {
          out.push({ file, line: i + 1, kind: h.kind, why: 'a committed data file carries this machine\'s hardware — it publishes someone\'s host under a claim of reproducibility, and makes the derived layer reproducible on one machine only' })
        }
      }
    }
  }
  return out
}

if (process.argv[1] && process.argv[1].endsWith('leak-scan.js')) {
  const leaks = leakGaps()
  if (!leaks.length) {
    console.log('✓ leak-scan — no credential shape and no host identity in committed data')
    process.exit(0)
  }
  console.error(`✗ leak-scan: ${leaks.length} leak(s) in the git index, each with its exact fix:`)
  for (const l of leaks.slice(0, 20)) {
    console.error(`    GAP ${l.file}:${l.line} — ${l.kind}`)
    console.error(`    FIX ${l.why}`)
  }
  process.exit(1)
}
