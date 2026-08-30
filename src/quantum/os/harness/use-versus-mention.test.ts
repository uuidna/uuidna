// use-versus-mention — the law four separate checks broke in one session (2026-08-19), in two opposite
// directions. A finder that greps source cannot tell a line that DOES a thing from a line that TALKS ABOUT it.
// The general rule, stated in api.ts and locked here: EVIDENCE MUST COME FROM SOMEWHERE ELSE — a file is never
// its own witness, and a check is never satisfied by the sentence describing it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { selfExcluded, invokesFile } from '../../../scripts/api.js'
import { dormantGaps } from '../../../scripts/one-receipt.js'

test('a file is never its own witness — selfExcluded drops only the candidate', () => {
  const sources = new Map([
    ['a.ts', 'node dist/scripts/a.js   // a says it runs itself'],
    ['b.ts', 'nothing to see'],
  ])
  const corpus = selfExcluded('a.ts', sources)
  assert.ok(!corpus.includes('a says it runs itself'), 'the candidate must be excluded from its own evidence')
  assert.ok(corpus.includes('nothing to see'), 'every OTHER source must remain')
})

// ── the FALSE NEGATIVE direction: a script exempting itself by documenting its own compiled name. This is exactly
// how await-live.ts escaped the dormancy check — its usage comment named the built file, and that read as proof
// something ran it. Any dormant script could have hidden the same way.
test('self-reference alone is not an invocation', () => {
  const onlySelf = new Map([['lonely.ts', '// usage: node dist/scripts/lonely.js <arg>']])
  assert.equal(invokesFile(selfExcluded('lonely.ts', onlySelf), 'lonely'), false,
    'a script that only documents its own usage is still dormant')
  const withCaller = new Map([
    ['lonely.ts', '// usage: node dist/scripts/lonely.js <arg>'],
    ['caller.ts', "execSync('node ' + join(HERE, 'lonely.js'))"],
  ])
  assert.equal(invokesFile(selfExcluded('lonely.ts', withCaller), 'lonely'), true,
    'a SIBLING naming it with a runner is a real invocation')
})

// ── the FALSE POSITIVE direction: prose read as an invocation. Widening the match to bare filenames counted a
// path inside a data list, a comment naming a generator, and a call that READS a script's source as if each ran it.
test('a mention without a runner is not an invocation', () => {
  for (const prose of [
    "  'src/economics/auto-harmonise.ts',                  // a path inside a data list",
    '// the file docs/prose-evidence.md is written by gen-prose-evidence.ts',
    "      dimensions: h16(rd('src/scripts/quantum-dimension-scan.ts')),   // READS the source",
  ]) assert.equal(invokesFile(prose, prose.includes('harmonise') ? 'auto-harmonise' : prose.includes('prose-evidence') ? 'gen-prose-evidence' : 'quantum-dimension-scan'), false,
    `prose must not count as an invocation: ${prose.trim().slice(0, 48)}`)
})

test('a constructed path still counts — the runner need not touch the filename', () => {
  // guard.ts spawns audit-packages this way; requiring `node <path>` adjacent missed it entirely
  assert.equal(invokesFile("execSync('node ' + JSON.stringify(join(HERE, 'audit-packages.js')))", 'audit-packages'), true)
})

test('both extensions are invocations — node runs TypeScript directly', () => {
  assert.equal(invokesFile('node src/scripts/await-live.ts https://example.test x', 'await-live'), true)
  assert.equal(invokesFile('node dist/scripts/await-live.js https://example.test x', 'await-live'), true)
})

test('the live tree obeys the law — no script is dormant, and none is exempt by self-reference', () => {
  assert.deepEqual(dormantGaps(), [], 'a gap here means a script is unrun, or the backlog names one that is')
})
