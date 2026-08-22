// spin — a file the gate watches but spin does not seal can drift without moving the receipt.
//
// DERIVED_FILES was hand-written and named eight paths while the audit chain git-diffed fourteen, so six files
// were gated and never rotated. And verifySpin returned ok:true on an EMPTY manifest against any file set: a
// verifier that verifies nothing and passes, the same class as the dna-recompute check that accepted a forgery.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DERIVED_FILES, sealSpin, verifySpin } from '../spin.js'

/** the paths the audit chain actually diffs — read from package.json, so this cannot drift from the real gate */
const gated = (): string[] => {
  const audit = (JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as
    { scripts: Record<string, string> }).scripts.audit
  // the gated list ends at the first chain operator: an `&&` and whatever follows it are the NEXT command,
  // not gated files — the one-writer release wrapper taught this parser that the diff arm is not always last
  const tail = audit.slice(audit.indexOf('git diff --exit-code -- ') + 24)
  const cut = tail.indexOf(' && ')
  return (cut >= 0 ? tail.slice(0, cut) : tail).split(' ').filter(Boolean)
}

// ── THE PARITY. Every FILE the gate diffs must be rotated. Directory entries are covered by prefix.
test('every gated file is sealed by spin', () => {
  const missing = gated().filter((p) => {
    const bare = p.replace(/\/$/, '')
    return !DERIVED_FILES.includes(bare) && !DERIVED_FILES.some((d) => bare.startsWith(d + '/'))
  })
  assert.deepEqual(missing, [], 'a gated file that spin does not seal can drift without moving the receipt')
})

// ── THE REFUSAL. This is the one that was silently true.
test('an EMPTY manifest refuses, rather than agreeing with everything', () => {
  const r = verifySpin({ coins: {}, receipt: 'anything' }, { 'a.txt': 'hello', 'b.txt': 'world' })
  assert.equal(r.ok, false, 'a manifest that sealed nothing must not verify anything')
  assert.equal(r.drift[0].path, '(manifest)')
})

test('a DIRECTORY entry seals every file beneath it', () => {
  const m = sealSpin({ 'src/chunks/7a/97c585.json': '{}', 'src/chunks/01/263a62.json': '{}', 'unrelated.txt': 'x' })
  assert.deepEqual(Object.keys(m.coins).sort(), ['src/chunks/01/263a62.json', 'src/chunks/7a/97c585.json'])
  assert.equal(verifySpin(m, { 'src/chunks/7a/97c585.json': 'TAMPERED', 'src/chunks/01/263a62.json': '{}' }).ok, false)
})

test('a sealed manifest still detects a tampered file, and passes an intact one', () => {
  const m = sealSpin({ 'README.md': 'a', 'llm.txt': 'b' })
  assert.ok(Object.keys(m.coins).length === 2, 'both must be in DERIVED_FILES to be sealed at all')
  assert.equal(verifySpin(m, { 'README.md': 'a', 'llm.txt': 'b' }).ok, true)
  assert.equal(verifySpin(m, { 'README.md': 'CHANGED', 'llm.txt': 'b' }).ok, false)
  assert.equal(verifySpin(m, { 'llm.txt': 'b' }).ok, false, 'an absent file is drift')
})
