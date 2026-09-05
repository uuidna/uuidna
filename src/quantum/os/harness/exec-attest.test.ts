import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaExec, uuidnaExecAsync, APPLETS, CODEC_APPLETS } from '../exec/index.js'

// ── ATTESTED IS NOT EXECUTED, AND THE SURFACE MUST SAY WHICH.
//
// The captain asked, 2026-09-04: what is the point of an app register if the apps do not execute? Measured, the
// answer was worse than the question. `openssl version`, bare `openssl`, and `openssl this-is-not-a-subcommand`
// all returned the IDENTICAL provenance record with ok: true, because the app branch parsed args into a field
// and then never consulted it. A caller could not tell a program having run from a package having been
// identified, and a nonsense subcommand read as success.
//
// The register's purpose IS provenance — uuidnaOS identifies packages by content-address and does not run
// binaries, deliberately. That was never the fault. The fault was a surface shaped like a shell. These tests
// hold the partition: a ported applet EXECUTES and its arguments change its output; a catalogued package is
// ATTESTED, says so, and names the arguments it did not run.

test('a ported applet EXECUTES, and its arguments change its output', () => {
  const a = uuidnaExec('echo hello world')
  assert.equal(a.mode, 'executed')
  assert.deepEqual(a.unrunArgs, [], 'an executed applet leaves no argument unrun')
  assert.match(a.output.join(' '), /hello world/, 'echo must echo')
  // and a different argument must give a different answer — the proof that args are honoured
  const b = uuidnaExec('echo something else')
  assert.notEqual(a.output.join(' '), b.output.join(' '), 'arguments that change nothing are arguments ignored')
})

test('a catalogued package is ATTESTED, not executed, and says so in the output', () => {
  const r = uuidnaExec('openssl')
  assert.equal(r.mode, 'attested')
  assert.match(r.output.join('\n'), /ATTESTED, NOT EXECUTED/, 'the record must declare what it is')
  assert.match(r.output.join('\n'), /provenance record; no program ran/)
})

test('arguments to an attested package are REPORTED as unrun, never silently dropped', () => {
  const r = uuidnaExec('openssl version')
  assert.equal(r.mode, 'attested')
  assert.deepEqual(r.unrunArgs, ['version'], 'the dropped arguments must be named')
  assert.match(r.output.join('\n'), /NOT RUN:\s+version/, 'and named in the output a human reads')
})

// THE EXACT FAULT THAT STARTED THIS. Three different command lines, one identical answer, all ok: true.
test('a nonsense subcommand no longer masquerades as a successful run', () => {
  const bare = uuidnaExec('openssl')
  const nonsense = uuidnaExec('openssl this-is-not-a-subcommand')
  // the provenance record is legitimately the same — it is the same package
  assert.equal(nonsense.mode, 'attested')
  // but the caller can now SEE that nothing ran, and see what was not run
  assert.deepEqual(nonsense.unrunArgs, ['this-is-not-a-subcommand'])
  assert.deepEqual(bare.unrunArgs, [], 'a bare attestation has nothing unrun')
  assert.notEqual(nonsense.output.join('\n'), bare.output.join('\n'),
    'before this, these two were byte-identical — which is how a nonsense subcommand read as success')
})

test('every ported applet reports executed; no applet claims attestation', async () => {
  for (const applet of APPLETS) {
    // the codec applets are ported on the async door — see CODEC_APPLETS; the law is the same, the door is not
    const r = (CODEC_APPLETS as readonly string[]).includes(applet) ? await uuidnaExecAsync(applet) : uuidnaExec(applet)
    assert.equal(r.mode, 'executed', `${applet}: a ported applet must run, not attest`)
    assert.deepEqual(r.unrunArgs, [], `${applet}: nothing was passed, so nothing may be reported unrun`)
  }
})

test('the help surface promises attestation, not use', () => {
  const h = uuidnaExec('help').output.join('\n')
  assert.match(h, /ATTEST a published Alpine app/, 'the word "use" implied execution and was wrong')
  assert.ok(!/— use a published Alpine app/.test(h), 'the old wording must not return')
})

test('an unresolvable name is refused, and the refusal names it', () => {
  const r = uuidnaExec('definitely-not-a-package-xyz')
  assert.equal(r.ok, false, 'an unknown name must not read as success')
  assert.match(r.output.join(' '), /definitely-not-a-package-xyz/, 'the refusal must name what was refused')
})

test('the receipt separates an attested call from an executed one', () => {
  assert.notEqual(uuidnaExec('openssl').receipt, uuidnaExec('openssl version').receipt,
    'two different calls must not fold to one receipt')
  assert.equal(uuidnaExec('openssl').receipt, uuidnaExec('openssl').receipt, 'and the same call must')
})
