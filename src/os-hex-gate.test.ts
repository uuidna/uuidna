// uuidnaOS is the hex image. Daily git and `npm run x` must boot it; a script beside it is a bypass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { dryGaps } from './scripts/dry-gaps.js'

const rd = (p: string): string => readFileSync(join(ROOT, p), 'utf8')

test('hooks enter uuidnaOS hex only — no classical script beside the image', () => {
  for (const f of ['hooks/pre-commit', 'hooks/pre-push', 'hooks/commit-msg']) {
    const body = rd(f)
    assert.match(body, /quantum\/os\/cli\/index\.js/, `${f} must call uuidnaOS cli`)
    assert.match(body, /HARD/, `${f} is a hard gate`)
    assert.doesNotMatch(body, /next\.js/, `${f}: next.js bypasses the hex OS`)
    assert.doesNotMatch(body, /guard\.js/, `${f}: guard.js bypasses the hex OS`)
    assert.doesNotMatch(body, /npm run build/, `${f}: tsc bypasses the hex OS`)
    assert.doesNotMatch(body, /vitepress/, `${f}: VitePress bypasses the hex OS`)
  }
  const cli = rd('src/quantum/os/cli/index.ts')
  const court = rd('src/quantum/os/court/index.ts')
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
  const os = gaps.filter((g) => /uuidnaOS|cli\/index\.js|quantum hex|hex image/i.test(g.what))
  assert.equal(os.length, 0, os.map((g) => g.what).join('\n'))
})

// THE GATE MUST RUN WHEN THE HOOKS RUN IT, and for a while it did not. cli.ts became cli/index.ts and the entry
// guard still read endsWith('cli.js'), so `node dist/quantum/os/cli/index.js` — the exact command in all three
// hooks — loaded the module, matched nothing, and exited 0 in silence. pre-commit, commit-msg and pre-push each
// echoed their banner from the shell and enforced nothing. Every check inside was healthy; none of them was
// reached. Asserting the FUNCTION works would have kept passing throughout: the defect was only visible by
// invoking the process the way a hook does, which is what this does.
test('CONTROL — the uuidnaOS court RUNS as a subprocess, the way every hook invokes it', () => {
  const cli = join(ROOT, 'dist/quantum/os/cli/index.js')
  if (!existsSync(cli)) return   // source-run before a build; the dist-run in the audit is the binding one
  const out = execFileSync(process.execPath, [cli], { encoding: 'utf8', stdio: 'pipe' })
  assert.match(out, /court — uuidnaOS/, 'a silent, exit-0 court is a gate that is not there')
})

test('CONTROL — the commit-msg gate REFUSES a fabricated theorem citation', () => {
  const cli = join(ROOT, 'dist/quantum/os/cli/index.js')
  if (!existsSync(cli)) return
  const msg = join(tmpdir(), `uuidna-msg-control-${process.pid}.txt`)
  writeFileSync(msg, 'a fabricated claim\n\nBacked by theorem this_theorem_does_not_exist_anywhere.\n')
  try {
    execFileSync(process.execPath, [cli, '--msg', msg], { encoding: 'utf8', stdio: 'pipe' })
    assert.fail('the gate accepted a citation the ledger does not hold')
  } catch (e) {
    const err = e as { status?: number | null }
    assert.equal(err.status, 1, 'an overclaiming message must be refused, not merely noted')
  } finally { rmSync(msg, { force: true }) }
})
