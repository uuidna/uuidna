// os session + runtime — Layer 1 simulation and Layer 2 verify-then-run.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resetExecSession, execSessionStamp, sessionWrite } from '../quantum/os/session.js'
import { uuidnaExec, resetExecSession as resetExec, APPLETS, APK_VERBS } from '../quantum/os/exec.js'
import { planAlpineRun, pinnedAlpineRelease, verifyPinnedRootfs } from '../os/runtime/index.js'

test('session apk add — simulated install beyond boot closure', () => {
  resetExecSession()
  resetExec()
  const before = execSessionStamp()
  const add = uuidnaExec('apk add nginx')
  assert.ok(add.ok, add.output.join('\n'))
  assert.ok((add.data as { added: string[] }).added.includes('nginx'))
  const list = uuidnaExec('apk list')
  assert.ok(list.output.some((l) => l.includes('[session]') && l.includes('nginx')))
  const info = uuidnaExec('apk info nginx')
  assert.equal((info.data as { state: string }).state, 'SESSION')
  assert.notEqual(execSessionStamp(), before)
  const del = uuidnaExec('apk del nginx')
  assert.ok(del.ok)
})

test('busybox applets — cat/which/pwd/echo over virtual vfs + session', () => {
  resetExecSession()
  resetExec()
  sessionWrite('/tmp/hello', 'hello uuidnaOS')
  assert.equal(uuidnaExec('pwd').output[0], '/')
  assert.equal(uuidnaExec('echo one two').output[0], 'one two')
  assert.equal(uuidnaExec('which busybox').output[0], '/terminal')
  assert.ok(uuidnaExec('cat /tmp/hello').output[0]!.includes('hello'))
  assert.ok(uuidnaExec('cat /core').ok)
  assert.match(uuidnaExec('cat /core').output[0]!, /C library/i)
  assert.ok(uuidnaExec('stat /terminal').ok)
  assert.ok(uuidnaExec('du /').ok)
  assert.ok(APPLETS.includes('cat'))
  assert.ok(APK_VERBS.includes('add'))
})

test('apk policy names both layers', () => {
  const p = uuidnaExec('apk policy')
  assert.ok(p.ok)
  assert.ok(p.output.some((l) => l.includes('Layer 1')))
  assert.ok(p.output.some((l) => l.includes('uuidna_run')))
})

test('uuidna_run plan — verify-then-run scaffold (recipe or honest refusal)', () => {
  const release = pinnedAlpineRelease()
  assert.equal(release.version, '3.24.1')
  const verify = verifyPinnedRootfs()
  const plan = planAlpineRun('echo uuidna-run-plan')
  if (verify.present && verify.ok) {
    assert.ok(plan.ok, plan.reason ?? 'plan should succeed when rootfs verifies')
    assert.equal(plan.recipe?.command, 'echo uuidna-run-plan')
  } else {
    assert.equal(plan.ok, false)
    assert.ok(plan.reason)
  }
})
