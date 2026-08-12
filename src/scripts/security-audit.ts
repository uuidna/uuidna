#!/usr/bin/env node
// security-audit (CLI) — the full recomputable security gate: the shipped package posture (securityAudit) PLUS the
// repo-tree scans that need the source (no committed secret across every tracked file; the crypto KAT suite wired),
// folded to ONE order-invariant receipt and printed as a table. Exits non-zero if any check fails — a dimension of
// `npm run audit`, recomputable by anyone from the same tree. Integrity, not truth.
import { execSync } from 'node:child_process'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { securityAudit, type SecurityCheck } from '../security-audit.js'
import { toUuid, merkleGravity } from '../index.js'
import { ROOT } from './lean-gen.js'

// HIGH-CONFIDENCE credential patterns only — real leaked secrets, not fixture strings (the repo is full of test
// passphrases and crypto prose, so a loose scan would cry wolf). Each pattern is the literal shape of a live token.
const SECRET_PATTERNS: [string, RegExp][] = [
  ['private-key-pem', /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/],
  ['aws-access-key-id', /\bAKIA[0-9A-Z]{16}\b/],
  ['github-token', /\bgh[posru]_[A-Za-z0-9]{36,}\b/],
  ['slack-token', /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/],
  ['google-api-key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['npm-token', /\bnpm_[A-Za-z0-9]{36}\b/],
]
// the scanner's own source carries these pattern strings — never scan them (they are shapes, not secrets).
const SKIP = new Set(['src/security-audit.ts', 'src/scripts/security-audit.ts'])

// scan every tracked text file for a credential pattern — recomputable from `git ls-files`.
let tracked: string[] = []
let gitOk = true
try { tracked = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).split('\n').filter(Boolean) }
catch { gitOk = false }
const hits: { file: string; pattern: string }[] = []
for (const rel of tracked) {
  if (SKIP.has(rel)) continue
  const abs = join(ROOT, rel)
  let buf: Buffer
  try { if (statSync(abs).size > 2 * 1024 * 1024) continue; buf = readFileSync(abs) } catch { continue }
  if (buf.includes(0)) continue // binary — skip
  const text = buf.toString('utf8')
  for (const [name, re] of SECRET_PATTERNS) if (re.test(text)) hits.push({ file: rel, pattern: name })
}
const katPresent = existsSync(join(ROOT, 'src', 'test', 'kat.test.ts')) || existsSync(join(ROOT, 'dist', 'test', 'kat.test.js'))

const repoChecks: SecurityCheck[] = [
  { id: 'no-committed-secrets', ok: gitOk && hits.length === 0,
    detail: !gitOk ? 'git unavailable — cannot scan the tree'
      : hits.length ? `FOUND ${hits.length}: ${hits.map((h) => `${h.pattern} in ${h.file}`).join('; ')}`
      : `scanned ${tracked.length} tracked files — no credential pattern (PEM key, AWS/GitHub/Slack/Google/npm token)`,
    address: toUuid(`security|no-committed-secrets|${gitOk && hits.length === 0}|${hits.map((h) => h.file + ':' + h.pattern).join(',')}`) },
  { id: 'crypto-kat-suite-present', ok: katPresent,
    detail: katPresent ? 'the crypto KAT suite (FIPS 180-4 SHA-256, RFC 4231 HMAC, RFC 8018 PBKDF2, RFC 8439 ChaCha20/Poly1305/AEAD) is wired into the tests'
      : 'MISSING: src/test/kat.test.ts — the KAT-verified claim would be unbacked',
    address: toUuid(`security|crypto-kat-suite-present|${katPresent}`) },
]

const pkg = securityAudit()
const all = [...pkg.checks, ...repoChecks]
const failed = all.filter((c) => !c.ok)
const receipt = merkleGravity(all.map((c) => c.address))

console.log('security audit — the recomputable posture (package) + the repo scan:')
for (const c of all) console.log(`  ${c.ok ? '✓' : '✗'} ${c.id} — ${c.detail}`)
console.log(`  receipt : ${receipt}  (order-invariant fold of ${all.length} checks — recheck it yourself)`)

if (failed.length) { console.error(`\n✗ security audit FAILED — ${failed.length} check(s): ${failed.map((c) => c.id).join(', ')}`); process.exit(1) }
console.log(`\n✓ security audit — ${all.length} checks pass, folded to ${receipt}.`)
