// browser-boot — uuidnaOS must verify-load before browser surfaces run.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { bootUuidnaOSInBrowser } from '../quantum/os/browser-boot.js'

test('bootUuidnaOSInBrowser loads committed catalogue in Node', async () => {
  const r = await bootUuidnaOSInBrowser(undefined, { selfTest: true })
  assert.ok(r.bootReceipt.includes('-'), 'boot receipt must be a uuid')
  assert.equal(r.catalogue.present, true, r.catalogue.why ?? 'catalogue absent')
  assert.ok(r.catalogue.count > 28_000, `expected full Alpine census; got ${r.catalogue.count}`)
  assert.ok(r.selfTest, 'self-test must run when catalogue is present')
  assert.equal(r.selfTest!.tested, r.catalogue.count)
  assert.equal(r.selfTest!.passed + r.selfTest!.failed, r.selfTest!.tested)
  assert.equal(r.selfTest!.failed, r.selfTest!.upstreamGaps)
})

test('uuidnaOS browser boot wired on terminal and os surfaces', () => {
  const terminal = readFileSync(join(ROOT, 'docs/.vitepress/theme/Terminal.vue'), 'utf8')
  const player = readFileSync(join(ROOT, 'docs/.vitepress/theme/HexbitPlayer.vue'), 'utf8')
  assert.match(terminal, /bootUuidnaOSInBrowser/, '/terminal must boot uuidnaOS before MCP')
  assert.match(player, /bootUuidnaOSInBrowser/, '/os HexbitPlayer must boot uuidnaOS')
})
