// uuidnaOS is the hex image. Daily git and `npm run x` must boot it; a script beside it is a bypass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { dryGaps } from './scripts/dry-gaps.js'

const rd = (p: string): string => readFileSync(join(ROOT, p), 'utf8')

test('hooks enter uuidnaOS hex only — no classical script beside the image', () => {
  for (const f of ['hooks/pre-commit', 'hooks/pre-push', 'hooks/commit-msg']) {
    const body = rd(f)
    assert.match(body, /quantum\/os\/cli\.js/, `${f} must call uuidnaOS cli`)
    assert.match(body, /HARD/, `${f} is a hard gate`)
    assert.doesNotMatch(body, /next\.js/, `${f}: next.js bypasses the hex OS`)
    assert.doesNotMatch(body, /guard\.js/, `${f}: guard.js bypasses the hex OS`)
    assert.doesNotMatch(body, /npm run build/, `${f}: tsc bypasses the hex OS`)
    assert.doesNotMatch(body, /vitepress/, `${f}: VitePress bypasses the hex OS`)
  }
  const cli = rd('src/quantum/os/cli.ts')
  const court = rd('src/quantum/os/court.ts')
  assert.match(cli, /runCourtCli/, 'cli delegates to runCourtCli')
  assert.match(court, /callTool/, 'the court is MCP callTool')
  assert.match(court, /uuidna_os/, 'boot is uuidna_os')
  assert.match(court, /UUID_HEXBITS/, 'the image is UUID_HEXBITS tiles')
  assert.match(court, /HEXBIT_STATES/, 'every state is on the hex lattice')
  assert.match(court, /hexbitDoorOf/, 'the door is hexbitDoorOf')
  assert.doesNotMatch(court, /execSync|spawn\(/, 'court does not shell out')
  const x = rd('src/scripts/run.ts')
  assert.match(x, /bootOS\(\)/, 'x boots the hex image before firmware')
})

test('dry finder names a uuidnaOS bypass', () => {
  const { gaps } = dryGaps()
  const os = gaps.filter((g) => /uuidnaOS|cli\.js|quantum hex|hex image/i.test(g.what))
  assert.equal(os.length, 0, os.map((g) => g.what).join('\n'))
})
