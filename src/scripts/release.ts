#!/usr/bin/env node
// @non-harmonic: spawns git, npm and the forge client as subprocesses and reaches the network (the registry and the
// live edge) — a NAMED boundary, like release-cut and deploy-run.
//
// release — THE WAVES AFTER A PUSH AS ONE COMMAND (the captain, 2026-09-13: "automate all waves after the push" and
// "no repeating manual tasks whatsoever"). The sequence was typed by hand into a scratch script that died with its
// session mid-chain. This fuses only commands that already exist and already keep their own laws:
//
//   land (only when HEAD is ahead) → the forge on that commit → release-cut --push → the forge on the tag →
//   the registry serves the version → ship → the live edge answers
//
// Nothing outward runs before its proof: no tag before origin holds HEAD and the forge is green on it, no ship before
// the registry serves the version. Waiting is bounded and never becomes a verdict: a forge still running after its
// windows, or a registry still serving the old version, stops the release as UNMEASURED, by name.
//
//   npm run release            → every step, stopping at the first that fails
//   npm run release -- --plan  → print the steps for this tree and run nothing
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT, streamStep } from './api.js'
import { awaitValue } from './await-live.js'
import { depositEvidence } from './receipt-deposit.js'

export interface ReleaseState { ahead: number; behind: number; version: string; tagged: boolean }
export interface ReleaseStep { name: string; kind: 'land' | 'forge' | 'cut' | 'registry' | 'ship' | 'live'; cmd?: string }

/** the steps for this tree, in order — pure, so the order is a test and not a habit */
export function releaseSteps(s: ReleaseState): ReleaseStep[] {
  if (s.behind > 0) throw new Error(`release: HEAD is ${s.behind} commit(s) behind origin/main — integrate them before releasing`)
  const steps: ReleaseStep[] = []
  if (s.ahead > 0) steps.push({ name: 'land', kind: 'land', cmd: 'npm run land' })
  steps.push({ name: 'the forge on HEAD', kind: 'forge' })
  if (!s.tagged) {
    steps.push({ name: `cut v${s.version}`, kind: 'cut', cmd: 'npm run release-cut -- --push' })
    steps.push({ name: `the forge on v${s.version}`, kind: 'forge' })
  }
  steps.push({ name: `the registry serves ${s.version}`, kind: 'registry' })
  steps.push({ name: 'ship', kind: 'ship', cmd: 'npm run ship' })
  steps.push({ name: 'the live edge answers', kind: 'live' })
  return steps
}

const out = (cmd: string, args: readonly string[]): string => {
  const r = spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8' })
  return r.status === 0 ? r.stdout.trim() : ''
}

// post-push asks the forge about one commit for its own eight-minute window and exits 1 while runs are still going;
// a release waits up to five such windows (forty minutes, longer than one publish has taken) before calling it
// UNMEASURED — a window count, not a verdict on the commit
const FORGE_WINDOWS = 5
async function forge(sha: string): Promise<boolean> {
  for (let w = 1; w <= FORGE_WINDOWS; w++) {
    const r = await streamStep(`release · the forge on ${sha.slice(0, 10)} (window ${w} of ${FORGE_WINDOWS})`, `node dist/scripts/post-push.js ${sha} --wait`)
    if (r.ok) return true
    if (!/RUNNING|reports nothing/.test(r.out)) return false   // a failed run is a verdict; only silence waits again
  }
  console.error(`✗ release — the forge was still running on ${sha.slice(0, 10)} after ${FORGE_WINDOWS} windows: UNMEASURED, not green`)
  return false
}

async function live(): Promise<boolean> {
  const local = readFileSync(join(ROOT, 'docs', 'public', 'robots.txt'), 'utf8')
  const served = await fetch('https://uuidna.com/robots.txt').then((r) => r.text()).catch(() => '')
  const signal = local.split('\n').find((l) => l.startsWith('Content-Signal:')) ?? ''
  const robots = signal !== '' && served.includes(signal)
  console.log(`${robots ? '✓' : '✗'} release — live robots.txt ${robots ? 'carries' : 'lacks'} "${signal}"`)
  // tools/list proves the edge serves the catalogue; uuidna_decode is the call that needs the baked receipt, the one
  // an edge without its slices refuses with the boundary's "Node-only" (measured 2026-09-13)
  const rpc = async (method: string, params: Record<string, unknown>): Promise<string> =>
    fetch('https://uuidna.com/mcp', { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) }).then((r) => r.text()).catch(() => '')
  const list = await rpc('tools/list', {})
  const decode = await rpc('tools/call', { name: 'uuidna_decode', arguments: {} })
  const edge = list.includes('"tools"') && decode !== '' && !decode.includes('Node-only')
  console.log(`${edge ? '✓' : '✗'} release — the live edge ${edge ? 'lists its tools and answers uuidna_decode' : 'refused or did not answer'}`)
  return robots && edge
}

const isMain = process.argv[1]?.endsWith('release.js') ?? false
if (isMain) {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { name: string; version: string }
  out('git', ['fetch', '-q', 'origin', 'main'])
  const counts = out('git', ['rev-list', '--left-right', '--count', 'HEAD...origin/main']).split(/\s+/).map(Number)
  const state: ReleaseState = { ahead: counts[0] ?? 0, behind: counts[1] ?? 0, version: pkg.version, tagged: out('git', ['ls-remote', '--tags', 'origin', `v${pkg.version}`]) !== '' }
  const steps = releaseSteps(state)
  console.log(`· release — ${pkg.name}@${pkg.version}: ${steps.map((s) => s.name).join(' → ')}`)
  if (process.argv.includes('--plan')) process.exit(0)
  // THE EVIDENCE LIVES WHERE EVIDENCE LIVES: after every step the whole run so far is deposited to qpu storage as one
  // document, so the captain and the agent read the same run by one GET instead of a log on the machine that ran it.
  // Order only, never times (the clock law); a registry it cannot reach is reported and never undoes the release.
  const evidence: { step: string; kind: ReleaseStep['kind']; ok: boolean }[] = []
  const report = async (commit: string): Promise<void> => {
    const r = await depositEvidence(`receipts/uuidna/release-${pkg.version}`,
      { kind: 'release', repo: 'uuidna/uuidna', version: pkg.version, commit, plan: steps.map((s) => s.name), steps: evidence },
      process.env.QPU_WRITE_TOKEN)
    console.log(r.sent ? `· release — evidence at ${r.href} (${r.status})` : `· release — evidence UNSENT: ${r.why}`)
  }
  for (const step of steps) {
    const sha = out('git', ['rev-parse', 'HEAD'])
    let ok: boolean
    if (step.cmd) ok = (await streamStep(`release · ${step.name}`, step.cmd)).ok
    else if (step.kind === 'forge') ok = await forge(sha)
    else if (step.kind === 'registry') {
      const got = await awaitValue({
        probe: async () => out('npm', ['view', pkg.name, 'version']) || null, want: pkg.version,
        maxProbes: 20, sleepMs: 30000, sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
        onProbe: (n, v) => console.log(`  registry probe ${n}: ${v ?? 'unreachable'}`),
      })
      ok = got.ok
      if (!ok) console.error(`✗ release — ${got.reason}`)
    } else ok = await live()
    evidence.push({ step: step.name, kind: step.kind, ok })
    await report(out('git', ['rev-parse', 'HEAD']))
    if (!ok) { console.error(`✗ release — "${step.name}" did not pass; nothing after it ran`); process.exit(1) }
    console.log(`✓ release — ${step.name}`)
  }
  console.log(`✓ release — ${pkg.name}@${pkg.version} is on the registry, shipped, and answering live`)
}
