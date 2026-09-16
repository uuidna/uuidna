#!/usr/bin/env node
// @non-harmonic: spawns the build, the heal's cures, land, ship and the forge's reader, and reaches the live MCP door
// and qpu storage — a NAMED boundary; every pass/stop decision is a pure function in autopilot-train.ts.
//
// autopilot — THE TRAIN, ONE UNATTENDED COMMAND THAT STOPS ONLY WITH A NAMED GAP (the owner, 2026-09-15: "autonomy means
// building the mechanism, not remembering to continue"). One session hand-drove this exact sequence dozens of times in a
// day — build, heal, verify, land, ship, ask the forge, ask the live door — and each hand-run was a person remembering
// the order and reading each exit code. Here the order is the program and each stage is a gate:
//
//   build        npm run build; a type error ONLY in generated files bootstraps once (--noEmitOnError false), runs the
//                generators that own them, and a normal build must then pass — anything else stops (PATCHES §41, §45)
//   fixed-point  the heal's cures in HEAL_ORDER (develop-cures.ts), then spin --verify, the court record and the guard;
//                objections re-run the order's tail, bounded by the number of distinct cures; an alternating pair stops
//                as TWO WRITERS, named with the files each side rewrote; then the court investigates its audit orders
//   land         npm run land -- --all; success is HEAD == origin/main, asked of git, never the exit code alone
//   ship         npm run ship, then post-push's forge verdict for the exact sha
//   live         JSON-RPC to https://uuidna.com/mcp for every tool the served instructions name, and uuidna_laws
//   receipt      one run receipt, deposited through the qpu evidence door — UNSENT without QPU_WRITE_TOKEN, never a failure
//
// The train takes the one-writer lock like land does and releases it on every exit path; land and develop run as its
// descendants, which the lock admits (lead 91's reentrancy). Usage:
//   npm run x -- autopilot                        the whole train
//   npm run x -- autopilot --from land            resume at a stage (the receipt is always written)
//   npm run x -- autopilot --until fixed-point    heal and verify only
//   npm run x -- autopilot --stage build          the build gate alone — develop's cure for a refused generated file
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync, writeFileSync, mkdirSync, lstatSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, streamStep, DRAIN_WRITERS, RECONCILE_OUTPUTS } from './api.js'
import { awaitAcquire, release, LOCK_PATH, working } from './one-writer.js'
import { CURES, NO_CURE, WING_STEP, HEAL_ORDER, RESEAL_FROM, healPlan, curesFor, namedLines, type CureRow } from './develop-cures.js'
import {
  stagesToRun, buildTriage, buildDecision, typeErrorFiles, wingDomains, roundSteps, loopVerdict, roundBound, loopGap, landVerdict,
  toolsNamed, argsFor, liveVerdict, rpcOfBody, runReceipt,
  type Stage, type StageResult, type Round, type Gap, type LiveAnswer, type RpcAnswer, type ToolSchema,
} from './autopilot-train.js'
import { depositEvidence, MCP_DOOR } from './receipt-deposit.js'
import { toUuid } from '../address.js'

const plan = stagesToRun(process.argv.slice(2))
const results: StageResult[] = []
const shas: Record<string, string> = {}
const live: LiveAnswer[] = []
let rounds = 0

const git = (...args: string[]): string => {
  try { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 256 * 1024 * 1024 }).trim() } catch { return '' }
}
const pass = (stage: Stage, detail: string): StageResult => ({ stage, verdict: 'pass', detail, gaps: [] })
const stop = (stage: Stage, detail: string, gaps: Gap[]): StageResult => ({ stage, verdict: 'stop', detail, gaps })
const said = (out: string, fix: string, tail = 12): Gap[] => namedLines(out, tail).map((l) => ({ what: l.trim(), fix }))

// ── WHAT A STEP REWROTE, asked of git: the content hash of every changed or untracked file before and after it. The
// oscillation detector names a two-writer pair by these files, so they are measured, never inferred from a cure's name.
const snapshot = (): Map<string, string> => {
  let raw = ''
  try { raw = execFileSync('git', ['status', '--porcelain', '-z', '--untracked-files=all'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }) } catch { return new Map() }
  const entries = raw.split('\0')
  const paths: string[] = []
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i]!
    if (!/^[ MADRCU?!]{2} ./.test(e)) continue
    paths.push(e.slice(3))
    if (/^[RC]/.test(e)) i++   // a rename carries its source path as the next entry
  }
  const map = new Map<string, string>(paths.map((p) => [p, 'absent']))
  const files = paths.filter((p) => { try { return lstatSync(join(ROOT, p)).isFile() } catch { return false } })
  if (files.length) {
    const hashes = execFileSync('git', ['hash-object', '--stdin-paths'], { cwd: ROOT, encoding: 'utf8', input: files.join('\n') + '\n', maxBuffer: 256 * 1024 * 1024 }).trim().split('\n')
    files.forEach((p, i) => map.set(p, hashes[i] ?? ''))
  }
  return map
}
const moved = (a: Map<string, string>, b: Map<string, string>): string[] => [...new Set([...a.keys(), ...b.keys()])].filter((p) => a.get(p) !== b.get(p)).sort()

// ── A · BUILD ────────────────────────────────────────────────────────────────────────────────────────────────────────
const buildStage = async (): Promise<StageResult> => {
  const first = await streamStep('autopilot · build', 'npm run build')
  if (first.ok) return pass('build', 'npm run build passes')
  const decision = buildDecision(buildTriage(first.out, DRAIN_WRITERS, RECONCILE_OUTPUTS))
  if (!decision.bootstrap) return stop('build', 'the build fails outside the generated-file deadlock', decision.gaps)
  // tsc still exits non-zero on the errors it reports; the EMIT is what the bootstrap is for, so its exit is not the
  // verdict — the normal build after the regeneration is
  await streamStep('autopilot · build · bootstrap once (--noEmitOnError false)', 'node --stack-size=65536 ./node_modules/typescript/lib/tsc.js -p tsconfig.json --noEmitOnError false')
  for (const owner of decision.owners) {
    if (!existsSync(join(ROOT, 'dist', 'scripts', `${owner}.js`))) {
      return stop('build', `${owner} owns a refused generated file and has no script`, [{ what: `dist/scripts/${owner}.js does not exist after the bootstrap`, fix: 'declare the file under the script that writes it (DRAIN_WRITERS or RECONCILE_OUTPUTS in src/scripts/api.ts)' }])
    }
    const r = await streamStep(`autopilot · build · regenerate with ${owner}`, `node dist/scripts/${owner}.js`)
    if (!r.ok) return stop('build', `${owner} failed while regenerating its file`, said(r.out, `${owner} is the file's declared generator; its own objection, verbatim`))
  }
  const gate = await streamStep('autopilot · build · the gate', 'npm run build')
  if (gate.ok) return pass('build', `bootstrapped once, regenerated by ${decision.owners.join(', ')}, and a normal build passes`)
  const still = typeErrorFiles(gate.out)
  return stop('build', 'the build still fails after one bootstrap and the regeneration', still.length
    ? still.map((f) => ({ what: `${f} is still refused by the type checker after its generators ran`, fix: 'the generator emits a shape the checker refuses — cure the generator (§41: the TS2590 row shape was cured in involution-family.ts)' }))
    : said(gate.out, 'the build\'s own words'))
}

// ── B · THE FIXED POINT ──────────────────────────────────────────────────────────────────────────────────────────────
const ROWS: CureRow[] = [WING_STEP, ...CURES]
/** the wing generators changed since the last landing — tracked against origin/main, and the ones not yet tracked */
const changedWings = (): string[] => {
  const changed = [...git('diff', '--name-only', 'origin/main', '--', 'src/scripts').split('\n'), ...git('ls-files', '--others', '--exclude-standard', '--', 'src/scripts').split('\n')].filter(Boolean)
  return wingDomains(changed, (p) => { try { return readFileSync(join(ROOT, p), 'utf8') } catch { return null } })
}
const VERIFY = [
  { label: 'spin --verify', cmd: 'node dist/scripts/spin.js --verify' },
  { label: 'court record current', cmd: 'node dist/scripts/leads-conserved.js' },
  { label: 'guard', cmd: 'node dist/scripts/guard.js' },
]
/** every verification runs every round, so all of a round's objections are answered together (lead 229) */
const verify = async (round: number): Promise<{ objections: string[]; blocked: Gap[]; untaught: Gap[] }> => {
  const objections: string[] = [], blocked: Gap[] = [], untaught: Gap[] = []
  for (const v of VERIFY) {
    const r = await streamStep(`autopilot · fixed point · round ${round} · verify ${v.label}`, v.cmd)
    if (r.ok) continue
    const no = NO_CURE.find((n) => n.when.test(r.out))
    if (no) { blocked.push({ what: `${v.label}: ${namedLines(r.out, 6).join(' / ')}`, fix: no.why }); continue }
    const cures = curesFor(r.out, CURES)
    if (!cures.length) untaught.push(...namedLines(r.out, 8).map((l) => ({ what: `${v.label}: ${l.trim()}`, fix: 'no taught cure — add the objection\'s signature and its deterministic command to CURES in src/scripts/develop-cures.ts' })))
    for (const c of cures) if (!objections.includes(c.name)) objections.push(c.name)
  }
  return { objections, blocked, untaught }
}
const fixedPointStage = async (): Promise<StageResult> => {
  const heal = healPlan(HEAL_ORDER, ROWS)
  const order = heal.map((h) => h.name)
  const bound = roundBound(new Set(heal.map((h) => h.cmd)).size)
  const history: Round[] = []
  let steps = order
  for (;;) {
    const round = history.length + 1
    const rewrote: Record<string, string[]> = {}
    for (const name of steps) {
      const row = ROWS.find((r) => r.name === name)!
      const cmds = row === WING_STEP ? changedWings().map((d) => `${row.cmd} ${d}`) : [row.cmd]
      for (const cmd of cmds) {
        const before = snapshot()
        const r = await streamStep(`autopilot · fixed point · round ${round} · ${name}`, cmd)
        rewrote[name] = [...new Set([...(rewrote[name] ?? []), ...moved(before, snapshot())])].sort()
        if (!r.ok) return stop('fixed-point', `the cure "${name}" itself failed on the held tree (round ${round})`, [{ what: `${cmd} exited non-zero`, fix: 'a cure that fails while the train holds the tree is a real break — its own words follow' }, ...said(r.out, 'the cure\'s objection, verbatim')])
      }
    }
    const v = await verify(round)
    rounds = round
    if (v.blocked.length) return stop('fixed-point', 'the gate refused something that is not a machine\'s to cure', v.blocked)
    if (v.untaught.length) return stop('fixed-point', 'the gate objected with no taught cure', v.untaught)
    history.push({ rewrote, objections: v.objections })
    const lv = loopVerdict(history, bound)
    if (lv.kind === 'converged') break
    if (lv.kind !== 'continue') return stop('fixed-point', `the fixed point stopped (${lv.kind}) after ${round} round(s)`, [loopGap(lv)])
    steps = roundSteps(v.objections, order, RESEAL_FROM)
  }
  // THE COURT'S AUDIT ORDERS, investigated by the court — after the fixed point, because a law down (the witness behind
  // the ledger mid-heal, §34) refuses any record, and the heal is what brings the laws back
  const court = await streamStep('autopilot · fixed point · the court investigates its audit orders', 'node dist/scripts/court-investigate.js --claimant autopilot')
  if (!court.ok) return stop('fixed-point', 'the tree is at its fixed point, and the court holds an audit order nothing explains', said(court.out, 'the court investigator\'s own words; a person reads these calls'))
  return pass('fixed-point', `converged in ${rounds} round(s): spin --verify, the court record and the guard all pass, and the court's audit orders are answered`)
}

// ── C · LAND ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const landStage = async (): Promise<StageResult> => {
  shas.beforeLand = git('rev-parse', 'HEAD')
  const r = await streamStep('autopilot · land', 'npm run land -- --all')
  git('fetch', 'origin', 'main')
  const head = git('rev-parse', 'HEAD'), origin = git('rev-parse', 'origin/main')
  const log = join(ROOT, '.uuidna-sessions', 'land-proof.log')
  // the proof log is read only when THIS landing says it wrote one — an older run's log would quote another tree's failures
  const proof = /the whole proof:/.test(r.out) && existsSync(log) ? readFileSync(log, 'utf8') : ''
  const v = landVerdict({ exitOk: r.ok, head, origin, out: r.out, proof })
  shas.head = head
  shas.origin = origin
  if (v.landed && v.clean) { shas.landed = head; return pass('land', `HEAD ${head.slice(0, 9)} is origin/main`) }
  return stop('land', v.landed ? `landed ${head.slice(0, 9)}, and land objected after the push` : 'nothing landed', v.gaps)
}

// ── D · SHIP ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const shipStage = async (): Promise<StageResult> => {
  const sha = git('rev-parse', 'HEAD')
  const s = await streamStep('autopilot · ship', 'npm run ship')
  if (!s.ok) return stop('ship', 'the deploy stopped', said(s.out, 'deploy-run\'s own words, verbatim'))
  shas.shipped = sha
  const f = await streamStep(`autopilot · forge verdict for ${sha.slice(0, 9)}`, `node dist/scripts/post-push.js ${sha} --wait`)
  if (!f.ok) return stop('ship', `shipped ${sha.slice(0, 9)}, and the forge has not agreed`, f.out.split('\n').filter((l) => /^\s*(✗|FAILED|RUNNING|FIX)/.test(l)).map((l) => ({ what: l.trim(), fix: 'post-push\'s verdict for this exact sha' })))
  return pass('ship', `shipped ${sha.slice(0, 9)} and the forge agrees`)
}

// ── E · LIVE ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const post = async (id: number, method: string, params: Record<string, unknown>): Promise<{ rpc: RpcAnswer | null; why: string }> => {
  try {
    const res = await fetch(MCP_DOOR, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }, body: JSON.stringify({ jsonrpc: '2.0', id, method, params }) })
    return { rpc: rpcOfBody(await res.text(), res.headers.get('content-type') ?? ''), why: `HTTP ${res.status}` }
  } catch (e) { return { rpc: null, why: String((e as Error)?.message ?? e) } }
}
const liveStage = async (): Promise<StageResult> => {
  const version = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }).version
  const { MCP_HTTP_PROTOCOL } = await import('../mcp-http.js')
  const init = await post(1, 'initialize', { protocolVersion: MCP_HTTP_PROTOCOL, capabilities: {}, clientInfo: { name: 'uuidna-autopilot', version } })
  const instructions = init.rpc?.result?.instructions ?? ''
  if (!instructions) return stop('live', 'the door gave no connect instructions', [{ what: `${MCP_DOOR} initialize carried no instructions (${init.why})`, fix: 'the served instructions name the tools a client is told to call; without them there is nothing to verify' }])
  const list = await post(2, 'tools/list', {})
  const tools = list.rpc?.result?.tools ?? []
  if (!tools.length) return stop('live', 'the door listed no tools', [{ what: `${MCP_DOOR} tools/list answered no tools (${list.why})`, fix: 'the edge is not serving the catalog the tree ships' }])
  const names = toolsNamed(instructions, tools.map((t) => t.name))
  if (!names.includes('uuidna_laws')) names.push('uuidna_laws')
  let catalog: { name: string; inputSchema?: unknown }[] | null = null
  const gaps: Gap[] = []
  let id = 3
  for (const name of names) {
    const served = tools.find((t) => t.name === name)?.inputSchema
    let a = argsFor(name, instructions, served)
    if (a.missing.length) {
      catalog ??= (await import('../mcp.js')).MCP_CATALOG
      a = argsFor(name, instructions, served, catalog.find((t) => t.name === name)?.inputSchema as ToolSchema | undefined)
    }
    if (a.missing.length) {
      gaps.push({ what: `${name}: the served instructions name it, and neither they nor its served or local schema give a value for required ${a.missing.join(', ')}`, fix: 'write the call in the instructions (`tool {arg: value}`), or give the property an example the edge serves' })
      continue
    }
    const r = await post(id++, 'tools/call', { name, arguments: a.args })
    const v = liveVerdict(name, r.rpc, r.why)
    live.push({ tool: name, args: a.args, address: toUuid(v.text), ok: v.ok })
    if (v.gap) gaps.push(v.gap)
  }
  return gaps.length
    ? stop('live', `${gaps.length} of ${names.length} live call(s) failed at ${MCP_DOOR}`, gaps)
    : pass('live', `${names.length} tool(s) answered at ${MCP_DOOR}: ${names.join(', ')}`)
}

// ── F · THE RECEIPT ──────────────────────────────────────────────────────────────────────────────────────────────────
const receiptStage = async (): Promise<StageResult> => {
  const body = runReceipt({ stages: results, shas, live, rounds })
  mkdirSync(join(ROOT, 'dist', 'evidence'), { recursive: true })
  const local = join('dist', 'evidence', `autopilot-${body.address}.json`)
  writeFileSync(join(ROOT, local), JSON.stringify(body, null, 1) + '\n')
  if (!process.env.QPU_WRITE_TOKEN) return pass('receipt', `UNSENT — QPU_WRITE_TOKEN is absent; receipt ${body.address} kept at ${local}`)
  const sent = await depositEvidence('autopilot', body)
  return pass('receipt', sent.sent ? `deposited at ${sent.href} (${sent.status}); local copy ${local}` : `UNSENT — ${sent.why}; local copy ${local}`)
}

// ── THE TRAIN ────────────────────────────────────────────────────────────────────────────────────────────────────────
const gate = awaitAcquire('autopilot', process.pid, LOCK_PATH, (h) =>
  console.error(`· autopilot — the tree is HELD by pid ${h.pid} (${h.purpose}); WAITING (the lock lifts when the holder ends, and a dead holder is reclaimed)`))
if (!gate.ok) {
  console.error(`✗ autopilot — pid ${gate.holder.pid} (${gate.holder.purpose}) still holds the tree.`)
  console.error(working(gate.holder.pid) ? '  It IS WORKING (live children under it): busy, not stuck — wait, do not end it.' : '  NO live child runs under it — the honest stuck signal; name it to a human.')
  process.exit(1)
}
process.on('exit', () => release(process.pid))
process.on('SIGINT', () => process.exit(1))
process.on('SIGTERM', () => process.exit(1))

const RUN: Record<Exclude<Stage, 'receipt'>, () => Promise<StageResult>> = { build: buildStage, 'fixed-point': fixedPointStage, land: landStage, ship: shipStage, live: liveStage }
shas.start = git('rev-parse', 'HEAD')
for (const stage of plan) {
  if (stage === 'receipt') continue
  let r: StageResult
  try { r = await RUN[stage]() } catch (e) { r = stop(stage, 'the stage threw', [{ what: String((e as Error)?.message ?? e), fix: 'a stage that throws has decided nothing; read the trace above' }]) }
  results.push(r)
  console.log(`${r.verdict === 'pass' ? '✓' : '✗'} autopilot · ${stage} — ${r.detail}`)
  if (r.verdict === 'stop') {
    for (const g of r.gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
    break
  }
}
if (plan.includes('receipt')) {
  const r = await receiptStage()
  console.log(`· autopilot · receipt — ${r.detail}`)
}
process.exit(results.some((r) => r.verdict === 'stop') ? 1 : 0)
