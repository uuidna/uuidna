// uuidnaOS sandbox — Layer 2 spawn of planned cmd: INSIDE the pinned minirootfs, never on the host.
//
// The catalogue port is automated; the binaries run in a throwaway docker image imported from the verified
// tarball (--network=none --cap-drop=ALL --read-only). A cmd: not in the minirootfs is ABSENT (AVAILABLE),
// named, not a missing port. pwntools and peers are safe here because they cannot reach the host or the net.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bootOS } from '../../../quantum/os/index.js'
import { testDefaultInstallPackages } from '../../../quantum/os/patime/index.js'
import {
  sandboxTestCommands, renderSandboxSuite, isSafeCmdName, isProbeableCmdName, hullCracks,
  reasonFromRefused, verifyPinnedRootfs, detectRunBackend,
} from '../index.js'
import { catalogue, providedCommands } from '../../../quantum/os/catalogue/index.js'
import { theoremByKey } from '../../../theorems/index.js'
import { courtProcedure } from '../../../due-process.js'

test('cmd: names are identifiers — a shell fragment is refused before interpolation', () => {
  assert.equal(isSafeCmdName('busybox'), true)
  assert.equal(isSafeCmdName('g++'), true)
  assert.equal(isSafeCmdName('lua5.3'), true)
  assert.equal(isSafeCmdName('2bwm'), true)
  assert.equal(isSafeCmdName('foo; rm'), false)
  assert.equal(isSafeCmdName('foo && bar'), false)
  assert.equal(isSafeCmdName(''), false)
  assert.equal(isProbeableCmdName('['), true)
  assert.equal(isProbeableCmdName('foo; rm'), false)
  assert.equal(isProbeableCmdName('kdevelop!'), true)
  assert.equal(isProbeableCmdName('_pcbnew.kiface'), true)
  assert.equal(isProbeableCmdName('sxmo_deviceprofile_pine64,pinephone.sh'), true)
})

test('intentionally keeping cracks in the hull has legal consequences — solutions_not_skipped', () => {
  assert.ok(theoremByKey().has('solutions_not_skipped'))
  assert.ok(theoremByKey().has('drift_is_named_or_caught'))
  assert.ok(theoremByKey().has('court_theorem_beats_assertion'))
  assert.ok(theoremByKey().has('court_loser_develops_the_proven'))
  const published: string[] = []
  for (const p of catalogue()) {
    for (const c of providedCommands(p)) {
      if (c && !published.includes(c)) published.push(c)
    }
  }
  const cracks = hullCracks(published)
  assert.equal(cracks.length, 0,
    `skipped count must be 0 (solutions_not_skipped); cracks: ${cracks.slice(0, 8).join(', ')}`)
  const closed = reasonFromRefused([])
  assert.ok(closed.derived.includes('skipped-is-zero'))
  assert.equal(closed.derived.includes('has-next'), false, 'reasoning is not an order')
  assert.ok(closed.trace.some((t) => t.cites === '/theorem/solutions_not_skipped'))
  const leftover = reasonFromRefused(['foo; rm'])
  assert.ok(leftover.derived.includes('on-the-record'))
  assert.equal(leftover.derived.includes('has-next'), false)
  assert.ok(leftover.trace.some((t) => t.cites === '/theorem/solutions_not_skipped'))
  assert.equal(leftover.trace.some((t) => t.cites.includes('/theorem/legal_')), false)

  const court = courtProcedure(['the skipped count is 0: theorem solutions_not_skipped'])
  assert.equal(court.stages[9]?.stage, 'Judgment & the mandate')
  assert.equal(court.docket[0]?.verdict, 'VERIFIED', 'the proof is heard uninterrupted')
  assert.equal(cracks.length, 0, 'the hull obeys the mandate — court_loser_develops_the_proven')
})

test('uuidnaOS sandbox probes planned cmd: — present spawn, absent named', { timeout: 180_000 }, () => {
  const verify = verifyPinnedRootfs()
  const backend = detectRunBackend()
  if (!verify.present || !verify.ok || backend !== 'docker') return

  const boot = testDefaultInstallPackages()
  assert.equal(boot.complete, true)
  const sample = [...boot.commands.slice(0, 8), '2bwm', 'python3', 'pwntools', '[', 'foo; rm']
  const sand = sandboxTestCommands(sample)
  console.log('\n' + renderSandboxSuite(sand) + '\n')
  assert.equal(sand.ok, true, sand.reason ?? 'sandbox refused')
  assert.equal(sand.definition, 'uuidnaOS-sandbox')
  assert.equal(sand.os, bootOS().receipt)
  assert.ok(sand.presentNames.includes('busybox'), `busybox must be in the pinned image: ${sand.presentNames.join(',')}`)
  assert.equal(sand.presentNames.includes('2bwm'), false, '2bwm is AVAILABLE, not in the minirootfs')
  assert.ok(sand.absent >= 1, 'AVAILABLE cmds are named ABSENT, not a missing port')
  const busy = sand.results.find((r) => r.command === 'busybox')
  assert.ok(busy?.present && busy.spawned, 'busybox --help ran inside the sandbox')
  assert.equal(sand.refused.includes('['), false, 'published [ is in the hull, not a crack')
  assert.ok(sand.refused.includes('foo; rm'), 'a shell fragment is named, not skipped silently')
  const bracket = sand.results.find((r) => r.command === '[')
  if (bracket) assert.equal(bracket.skipped, true, '[ --help is the wrong trial — present-check only')
  assert.ok(sand.reasoning?.derived.includes('on-the-record'))
})

test('default-install cmd: that exist as identifiers are in the pinned image', { timeout: 180_000 }, () => {
  const verify = verifyPinnedRootfs()
  if (!verify.present || !verify.ok || detectRunBackend() !== 'docker') return
  const boot = testDefaultInstallPackages()
  const cmds = boot.commands.filter(isProbeableCmdName)
  assert.ok(cmds.length > 0)
  const sand = sandboxTestCommands(cmds)
  assert.equal(sand.ok, true, sand.reason ?? 'sandbox refused')
  assert.ok(sand.presentNames.includes('busybox'))
  if (cmds.includes('apk')) assert.ok(sand.presentNames.includes('apk'), 'apk-tools cmd:apk is in the minirootfs')
})
