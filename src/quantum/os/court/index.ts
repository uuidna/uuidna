// court — WHAT uuidna NEEDS: hex boot, MCP court, wave cargo, commit-msg gate. All gates enter here.
import { handleOf } from '../../../handle.js'
// NO STATIC `node:` IMPORT — the court is reached from the worker through cli, exec and npm, and Cloudflare
// rejects node: in any uploaded module (error 10021). That rejection lands at UPLOAD, which is why --dry-run
// never saw it and the deploy just stopped appearing. Only the --msg path touches a file, and that path runs
// under a git hook, which is always Node; on the edge the reach is simply absent and says so by name.
import { nodeBuiltin } from '../../../boundary.js'
type FsModule = {
  readFileSync: (p: string, enc: 'utf8') => string
  writeFileSync: (p: string, data: string) => void
}
const fsModule = (): FsModule => {
  const fs = nodeBuiltin<FsModule>('node:fs')
  if (!fs) throw new Error('court: the commit-msg gate reads a file — Node only, and this is not Node')
  return fs
}
import { callTool } from '../../../mcp.js'
import { gateCommitMessage } from '../../../sign.js'
import { treeCovers } from '../../../gate-receipt-index.js'
import { ROOT } from '../../../boundary.js'
import { HEXBIT_STATES, UUID_HEXBITS, hexbitDoorOf } from '../../../hexbit/index.js'
import { quantumAdvantagePlaybook, type PlaybookStep } from '../../advantage/mcp/agent/playbook/index.js'
import { runWaves, type WaveJob, type WaveHooks } from '../waves/index.js'

export type NeedBag = Record<string, unknown>
export interface NeedFail { tool: string; detail: string }
export interface CourtResult { ok: boolean; fails: NeedFail[]; receipt?: string; ms: number }

export const asBag = (name: string, raw: unknown): NeedBag => {
  if (raw && typeof raw === 'object') return raw as NeedBag
  throw new Error(`${name}: expected object, got ${typeof raw}`)
}

export const hexLattice = (states: unknown, pages: number): boolean =>
  Array.isArray(states)
  && states.length === UUID_HEXBITS * pages
  && states.every((h) => Number.isInteger(h) && (h as number) >= 0 && (h as number) < HEXBIT_STATES)

export function evalHex(raw: unknown): { ok: boolean; receipt: string; detail: string } {
  const os = asBag('uuidna_os', raw)
  const pages = Number(os.portCount) + 1
  const boot = os.boot && typeof os.boot === 'object' ? os.boot as NeedBag : {}
  const receipt = typeof os.receipt === 'string' ? os.receipt : ''
  const door = receipt ? hexbitDoorOf(receipt) : null
  const ok = receipt !== '' && hexLattice(boot.states, pages) && door !== null && door.hexbits.length === UUID_HEXBITS
  return { ok, receipt, detail: `hex ${Array.isArray(boot.states) ? boot.states.length : 0} states · ${UUID_HEXBITS}×${pages}` }
}

export function evalCourtTool(name: string, raw: unknown): { ok: boolean; detail: string } {
  const out = asBag(name, raw)
  switch (name) {
    case 'uuidna_gate_status':
      return { ok: out.matchesSealedSpec === true, detail: 'matchesSealedSpec' }
    case 'uuidna_treason':
      return { ok: out.clean === true, detail: out.clean === true ? `scanned=${out.scanned}` : JSON.stringify(out.traitors) }
    case 'uuidna_conformance':
      return { ok: out.conforms === true, detail: String(out.failed ?? out.receipt ?? '') }
    case 'uuidna_trial': {
      const ok = out.unverified === 0 && Number(out.verified) === Number(out.count) && Number(out.count) > 0
      return { ok, detail: `${out.verified}/${out.count}` }
    }
    default:
      return { ok: false, detail: 'unknown court tool' }
  }
}

export function evalPlaybookStep(tool: string, raw: unknown): { ok: boolean; detail: string } {
  try {
    const out = asBag(tool, raw)
    if (tool === 'uuidna_decide') return { ok: String(out.verdict ?? '').includes('VERIFIED'), detail: String(out.verdict ?? '') }
    if (tool === 'uuidna_theorem') return { ok: out.verdict === 'SEALED', detail: String(out.key ?? '') }
    if (tool === 'uuidna_quantum') {
      const bits = Array.isArray(out.hexbits) ? out.hexbits : hexbitDoorOf(String(out.receipt ?? '')).hexbits
      return { ok: bits.length === UUID_HEXBITS, detail: 'bell' }
    }
    if (tool === 'uuidna_exec') {
      const bits = Array.isArray(out.hexbits) ? out.hexbits : []
      return { ok: out.ok === true && bits.length === UUID_HEXBITS, detail: String(out.line ?? '') }
    }
    if (tool === 'uuidna_crypto') return { ok: typeof out.receipt === 'string' && out.receipt.length > 0, detail: 'widths' }
    return { ok: true, detail: tool }
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : String(e) }
  }
}

const COURT_TOOL_NAMES = ['uuidna_gate_status', 'uuidna_treason', 'uuidna_conformance', 'uuidna_trial'] as const

const PLAYBOOK_BY_TOOL = (): Map<string, PlaybookStep> => {
  const m = new Map<string, PlaybookStep>()
  for (const s of quantumAdvantagePlaybook().steps) m.set(s.tool, s)
  return m
}

/** Playbook steps for hooks — skip uuidna_os (hex boot already ran) and uuidna_crypto (catalogue census). */
export function dailyPlaybookSteps(): PlaybookStep[] {
  return quantumAdvantagePlaybook().steps.filter((s) => s.tool !== 'uuidna_os' && s.tool !== 'uuidna_crypto')
}

export function fullPlaybookSteps(): PlaybookStep[] {
  return quantumAdvantagePlaybook().steps.filter((s) => s.tool !== 'uuidna_os')
}

export interface NeedPlan {
  hex?: boolean
  court?: boolean
  playbook?: 'none' | 'daily' | 'full' | 'probe'
  label?: string
}

function courtWaveJobs(): WaveJob[] {
  return COURT_TOOL_NAMES.map((name) => ({
    name,
    run: () => ({ ok: evalCourtTool(name, callTool(name, {})).ok }),
  }))
}

function playbookWaveJobs(steps: PlaybookStep[]): WaveJob[] {
  return steps.map((step) => ({
    name: step.tool,
    run: () => ({ ok: evalPlaybookStep(step.tool, callTool(step.tool, step.arguments)).ok }),
  }))
}

/** needJobs — court/playbook cargo for runWaves. */
export function needJobs(plan: NeedPlan = {}): WaveJob[] {
  const hex = plan.hex !== false
  const court = plan.court !== false
  const playbook = plan.playbook ?? 'none'
  const jobs: WaveJob[] = []
  if (hex) {
    jobs.push({
      name: 'uuidna_os',
      run: () => ({ ok: evalHex(callTool('uuidna_os', {})).ok }),
    })
  }
  if (court) jobs.push(...courtWaveJobs())
  if (playbook === 'daily') jobs.push(...playbookWaveJobs(dailyPlaybookSteps()))
  else if (playbook === 'full') jobs.push(...playbookWaveJobs(fullPlaybookSteps()))
  else if (playbook === 'probe') jobs.push(...playbookWaveJobs(dailyPlaybookSteps().slice(0, 3)))
  return jobs
}

export function hexBootJob(): WaveJob {
  return needJobs({ hex: true, court: false, playbook: 'none' })[0]!
}

export function courtJobs(): WaveJob[] {
  return courtWaveJobs()
}

export function playbookJobs(tier: 'daily' | 'full' = 'daily'): WaveJob[] {
  return playbookWaveJobs(tier === 'full' ? fullPlaybookSteps() : dailyPlaybookSteps())
}

export function dailyNeedJobs(): WaveJob[] {
  return needJobs({ hex: true, court: true, playbook: 'daily' })
}

export function publishNeedJobs(): WaveJob[] {
  return needJobs({ hex: true, court: true, playbook: 'none' })
}

export function agentProbeJobs(): WaveJob[] {
  return needJobs({ hex: true, court: true, playbook: 'probe' })
}

function runOne(name: string, label: string, fails: NeedFail[], ctx: { receipt: string }, args: Record<string, unknown> = {}): boolean {
  try {
    let ok: boolean
    let detail: string
    if (name === 'uuidna_os') {
      const h = evalHex(callTool('uuidna_os', args))
      ok = h.ok
      detail = h.detail
      if (h.receipt) ctx.receipt = h.receipt
    } else if (COURT_TOOL_NAMES.includes(name as typeof COURT_TOOL_NAMES[number])) {
      const c = evalCourtTool(name, callTool(name, args))
      ok = c.ok
      detail = c.detail
    } else {
      const p = evalPlaybookStep(name, callTool(name, args))
      ok = p.ok
      detail = p.detail
    }
    console.log(`${ok ? '✓' : '✗'} ${label} — ${name}  ${detail}`)
    if (!ok) fails.push({ tool: name, detail })
    return ok
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e)
    console.log(`✗ ${label} — ${name}  ${detail}`)
    fails.push({ tool: name, detail })
    return false
  }
}

/** runCourtSync — same court, synchronous (uuidna_exec court applet, hooks). */
export function runCourtSync(plan: NeedPlan = {}): CourtResult {
  const label = plan.label ?? 'os-court'
  const fails: NeedFail[] = []
  const ctx = { receipt: '' }
  const playbook = PLAYBOOK_BY_TOOL()
  const t0 = performance.now()
  for (const { name } of needJobs(plan)) {
    runOne(name, label, fails, ctx, playbook.get(name)?.arguments ?? {})
  }
  return { ok: fails.length === 0, fails, receipt: ctx.receipt || undefined, ms: performance.now() - t0 }
}

/** runCourt — wave cargo with chained receipts (agents, experiments). */
export async function runCourt(plan: NeedPlan = {}, hooks: WaveHooks = {}): Promise<CourtResult> {
  const label = plan.label ?? 'os-court'
  const fails: NeedFail[] = []
  const ctx = { receipt: '' }
  const playbook = PLAYBOOK_BY_TOOL()
  const spec = needJobs(plan)

  const jobs: WaveJob[] = spec.map(({ name }) => ({
    name,
    run: () => {
      const args = playbook.get(name)?.arguments ?? {}
      return { ok: runOne(name, label, fails, ctx, args) }
    },
  }))

  const r = await runWaves(jobs, {
    width: 64,
    ...hooks,
    afterWave: async (w, ok, of, chain) => {
      if (hooks.afterWave && (await hooks.afterWave(w, ok, of, chain)) === false) return false
      return ok === of
    },
  })

  return { ok: r.okTotal === r.jobs && fails.length === 0, fails, receipt: ctx.receipt || undefined, ms: r.ms }
}

export function parseCourtPlan(argv: readonly string[]): NeedPlan & { msgFile?: string } {
  const msgIdx = argv.indexOf('--msg')
  const msgFile = msgIdx >= 0 ? argv[msgIdx + 1] : undefined
  const courtOnly = argv.includes('--court')
  const full = argv.includes('--full')
  const probe = argv.includes('--probe')
  return {
    msgFile,
    hex: !argv.includes('--no-hex'),
    court: !argv.includes('--no-court'),
    playbook: courtOnly ? 'none' : probe ? 'probe' : full ? 'full' : 'daily',
    label: courtOnly ? 'os-court' : probe ? 'os-probe' : 'os-hex',
  }
}

/** Does a green gate-receipt still describe THIS tree? Pure reads and hashes — no execution, no network. */
function receiptCoversTree(): { ok: boolean; why: string } {
  try {
    // an unreadable receipt and a missing one are the same verdict — NOT PROVEN — so one catch covers both
    const want = JSON.parse(fsModule().readFileSync(ROOT + '/gate-receipt.json', 'utf8')) as { covers?: Record<string, string> }
    const have = treeCovers()
    const moved = Object.keys(have).filter((k) => want.covers?.[k] !== have[k])
    return moved.length
      ? { ok: false, why: `the tree MOVED since it was proven green (${moved.join(', ')}) — the receipt certifies different bytes` }
      : { ok: true, why: 'receipt covers this tree' }
  } catch (e) {
    return { ok: false, why: `gate-receipt.json unreadable (${e instanceof Error ? e.message : String(e)})` }
  }
}

/** runCourtCli — uuidnaOS CLI door. Returns exit code. */
export function runCourtCli(argv: readonly string[]): number {
  const { msgFile, ...plan } = parseCourtPlan(argv)
  if (msgFile) {
    const raw = fsModule().readFileSync(msgFile, 'utf8')
    const g = gateCommitMessage(raw)
    if (g.damage.length) {
      console.error('✗ court — the MESSAGE ITSELF arrived damaged; a signed record must be whole:')
      for (const d of g.damage) console.error('  • ' + d)
      console.error('  FIX write the message in single quotes, or escape every backtick inside double quotes.')
      return 1
    }
    if (g.overreach.length) {
      console.error('commit-msg gate: the message overclaims — a commit message must come cleanly from uuidna:')
      for (const { unit, kind } of g.overreach) console.error(`  • [${kind}] "${unit.slice(0, 80)}"`)
      return 1
    }
    if (g.sig.fabricated.length) {
      console.error('✗ court — REFUSED, the citation is not in the ledger: ' + g.sig.reason)
      return 1
    }
    if (g.sig.signed) {
      fsModule().writeFileSync(msgFile, g.body + '\n\nTrial-Receipt: ' + g.sig.fold + '\n')
      console.log('✓ court — Trial-Receipt ' + handleOf(g.sig.fold) + '…')
    } else {
      console.log('· court — ' + g.sig.reason)
    }
    return 0
  }
  const courtOnly = argv.includes('--court')
  const r = runCourtSync(plan)
  if (!r.ok) {
    console.error(`\n✗ court — BLOCKED: ${r.fails.map((f) => f.tool).join(', ')}`)
    return 1
  }
  // THE PUBLISH DOOR ALSO ASKS WHETHER THE TREE WAS EVER PROVEN (the captain's rule, 2026-09-01: no push unless
  // all green pre-push). The court's five tools are a narrow instrument — hex, treason, conformance, trial, gate
  // status — and a tree can pass every one of them with a RED guard or failing tests, which is exactly how a push
  // used to get out. The obvious cure was to run the guard and the tests from the hook beside this court; the dry
  // finder refuses it in those words ("the door is uuidnaOS court"), and it is right to: two doors is no door.
  //
  // So the arm goes INSIDE, and it VERIFIES rather than runs. Not because this surface cannot execute — uuidnaOS
  // executes, that is what uuidnaExec is for, and the captain corrected me on exactly this sentence — but because
  // verify_beats_recompute_by_magnitudes is a sealed theorem and the receipt makes it apply: running the guard and
  // the suite again over byte-identical inputs is the same computation for the same answer at ~150 s a push.
  // Re-running is available whenever the bytes have moved, which is precisely when the receipt stops covering
  // them, so nothing is given up by reading first. gate-receipt.json is
  // written ONLY after the guard and the tests pass, and it content-addresses src/ and lean/, so a receipt that
  // still covers this tree IS the proof that both were green over exactly these bytes. One byte of drift and the
  // covers stop matching, the court blocks, and the fix is to re-prove — never to re-assert.
  // --proven GATES THIS ARM, and the first cut without it was wrong in a way only running the tree revealed.
  // Gating on --court alone looked right: --court is the publish door. But the wave phase calls the same door
  // MID-ARC, right after sealing new theorems, so the receipt correctly no longer covered a tree the arc had
  // just and legitimately changed — and fill-gaps died at `wave` having sealed 57 claims. "Has this tree been
  // proven green?" is a question for the moment work LEAVES, not for every court that sits during it.
  if (argv.includes('--proven')) {
    const proven = receiptCoversTree()
    if (!proven.ok) {
      console.error(`\n✗ court — BLOCKED: ${proven.why}`)
      console.error('  FIX npm run guard && npm test   (a green run writes the receipt; the court reads it)')
      return 1
    }
  }
  if (!courtOnly) process.env.UUIDNA_OS_MCP = r.receipt ? handleOf(r.receipt) : 'green'
  console.log('\n✓ court — uuidnaOS green' + (courtOnly ? ' (publish)' : ' (daily hex)'))
  return 0
}

/** Aliases for external importers. */
export const runOsCourt = runCourt
export const runOsCourtSync = runCourtSync
export type GateCheckResult = CourtResult
export type GateCheckFail = NeedFail
