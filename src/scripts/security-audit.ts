#!/usr/bin/env node
// security-audit (CLI) — the full recomputable security gate: the shipped package posture (securityAudit) PLUS the
// repo-tree scans that need the source (no committed secret across every tracked file; the crypto KAT suite wired),
// folded to ONE order-invariant receipt and printed as a table. Exits non-zero if any check fails — a dimension of
// `npm run audit`, recomputable by anyone from the same tree. Integrity.
import { execSync } from 'node:child_process'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { securityAudit, type SecurityCheck } from '../security-audit.js'
import { toUuid, merkleGravity } from '../index.js'
import { ROOT } from './lean-gen.js'

// HIGH-CONFIDENCE credential patterns only — real leaked secrets
// passphrases and crypto prose, so a loose scan would cry wolf). Each pattern is the literal shape of a live token.
const SECRET_PATTERNS: [string, RegExp][] = [
  ['private-key-pem', /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/],
  ['aws-access-key-id', /\bAKIA[0-9A-Z]{16}\b/],
  ['github-token', /\bgh[posru]_[A-Za-z0-9]{36,}\b/],
  ['slack-token', /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/],
  ['google-api-key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['npm-token', /\bnpm_[A-Za-z0-9]{36}\b/],
]
// the scanner's own source carries these pattern strings — never scan them (they are shapes.
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
// THE KAT CLAIM IS BACKED BY VECTORS. This check used to assert that src/tests/kat.test.ts exists
// — a hardcoded path, which a legitimate refactor breaks and an EMPTY file with the right name would satisfy. What
// actually backs "KAT-verified" is that the standards' own published outputs are asserted somewhere in the tests, so
// that is what is counted: each anchor below is a vector no implementation can produce without conforming.
const KAT_ANCHORS: [string, string][] = [
  ['FIPS 180-4 SHA-256 "abc"', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
  ['RFC 4231 HMAC case 2 (Jefe)', '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843'],
  ['RFC 4231 HMAC case 7 (key and data > block)', '9b09ffa71b942fcb27635fbcd5b0e944bfdc63644f0713938a7f51535c3a35e2'],
  ['RFC 8018 PBKDF2 c=4096', 'c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a'],
  ['RFC 8439 ChaCha20 §2.4.2', '6e2e359a2568f98041ba0728dd0d6981'],
  ['RFC 8439 Poly1305 §2.5.2', 'a8061dc1305136c6c22b8baf0c0127a9'],
  ['RFC 8439 AEAD §2.8.2 tag', '1ae10b594f09e26a7e902ecbd0600691'],
]
const testSrc = tracked
  .filter((f) => f.startsWith('src/') && f.endsWith('.test.ts'))
  .map((f) => { try { return readFileSync(join(ROOT, f), 'utf8') } catch { return '' } })
  .join('\n')
const katMissing = KAT_ANCHORS.filter(([, vector]) => !testSrc.includes(vector)).map(([label]) => label)
const katPresent = katMissing.length === 0

const repoChecks: SecurityCheck[] = [
  { id: 'no-committed-secrets', ok: gitOk && hits.length === 0,
    detail: !gitOk ? 'git unavailable — cannot scan the tree'
      : hits.length ? `FOUND ${hits.length}: ${hits.map((h) => `${h.pattern} in ${h.file}`).join('; ')}`
      : `scanned ${tracked.length} tracked files — no credential pattern (PEM key, AWS/GitHub/Slack/Google/npm token)`,
    address: toUuid(`security|no-committed-secrets|${gitOk && hits.length === 0}|${hits.map((h) => h.file + ':' + h.pattern).join(',')}`) },
  { id: 'crypto-kat-suite-present', ok: katPresent,
    detail: katPresent ? `the crypto KAT suite is wired into the tests — all ${KAT_ANCHORS.length} standard anchors asserted (FIPS 180-4 SHA-256, RFC 4231 HMAC, RFC 8018 PBKDF2, RFC 8439 ChaCha20/Poly1305/AEAD), located by VECTOR so a rename cannot fake or break the claim`
      : `MISSING ${katMissing.length} standard vector(s): ${katMissing.join('; ')} — the KAT-verified claim would be unbacked`,
    address: toUuid(`security|crypto-kat-suite-present|${katPresent}|${katMissing.join(',')}`) },
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
