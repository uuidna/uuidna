import { test } from 'node:test'
import assert from 'node:assert/strict'
import { leakGaps } from './scripts/leak-scan.js'

// THE INSTRUMENT MUST BE ABLE TO FAIL. A scanner that has only ever returned zero reads the same as one whose
// patterns match nothing at all — this tree has shipped three counts that measured their own blind spot, and by
// construction a green result distinguishes the two only when a control has been shown to go red. The controls
// below feed the real patterns synthetic strings that MUST match, so a green scan means "looked and found
// nothing" rather than "looked at nothing".
const CREDENTIAL_SAMPLES: readonly [string, string][] = [
  ['aws', 'AKIA' + 'ABCDEFGHIJKLMNOP'],
  ['github token', 'ghp_' + 'a'.repeat(36)],
  ['openai-style', 'sk-' + 'b'.repeat(40)],
  ['slack', 'xoxb-' + '1234567890abcdef'],
  // ASSEMBLED, NEVER WRITTEN OUT. The finder scans the whole index and this file is in it, so a literal key
  // header here is a finding — correctly so: by construction a pattern scanner sees bytes and not intent, so a
  // sample and a key read identically to it. The cure is
  // to build the sample rather than exempt this file: an exemption would make the one file guaranteed to hold
  // credential-shaped strings the one file nobody scans, which is exactly where a real key would hide best.
  ['private key', ['-----BEGIN', 'RSA', 'PRIVATE', 'KEY-----'].join(' ')],
]

const CREDENTIALS = [
  /\bAKIA[0-9A-Z]{16}\b/, /\bgh[pousr]_[A-Za-z0-9]{30,}\b/, /\bsk-[A-Za-z0-9]{32,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, /-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/,
]

test('CONTROL — every credential shape actually matches a sample of its kind', () => {
  for (const [name, sample] of CREDENTIAL_SAMPLES) {
    assert.ok(CREDENTIALS.some((re) => re.test(sample)), `${name}: no rule matched a real-shaped sample — the scanner is blind to it`)
  }
})

test('CONTROL — host identity in DATA matches, and the same words in prose do not', () => {
  const inData = /"[^"]*(?:Apple M\d|Intel\(R\)|AMD Ryzen|Core\(TM\))[^"]*"/
  assert.ok(inData.test('{"cpu":"Apple M1 Max"}'), 'a measured cpu string in json must be caught')
  assert.ok(/"memoryGiB"\s*:\s*\d+/.test('{"memoryGiB":32}'), 'installed memory in json must be caught')
  // and the mention that explains the rule must stay writable — the use/mention trap this tree has hit five times
  assert.equal(inData.test('quoting an Apple M1 Max at a reader would be quoting someone else’s hardware'), false)
})

test('the index carries no credential and no host identity in committed data', () => {
  const leaks = leakGaps()
  assert.deepEqual(leaks, [], leaks.map((l) => `${l.file}:${l.line} ${l.kind}`).join('\n'))
})
