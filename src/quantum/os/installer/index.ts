// quantum/os/installer — APK'S OWN DISCIPLINE, PORTED: compute the plan, show it, then commit.
//
// THE INCIDENT THIS EXISTS FOR (2026-09-01). A `git checkout lean/wave-queue.json` reverted one bad edit and,
// in the same stroke, discarded thirty claims the wave had already accepted. The ledger fell from 2532 theorems
// to 2502 and nothing said so — the command succeeded, git reported nothing unusual, and the loss was only found
// by counting afterwards. That is content destroyed by automation, silently, which is the failure mode the
// captain named.
//
// Alpine solved this decades ago and every package manager since has copied it: NEVER change a system without
// first computing what the change does, and never destroy without saying what is being destroyed. `apk add
// --simulate` prints the plan and touches nothing; `apk` numbers each step as it commits; `apk audit` reports
// what drifted from the installed manifest. Three verbs — plan, commit, audit — and the middle one is only
// reached deliberately.
//
// So this is that shape over the tree's own records. A plan is computed from BEFORE and AFTER, losses are
// counted separately from additions, and a plan that removes content REFUSES to be called safe. The caller can
// still commit it — removal is sometimes exactly right, as when a duplicate proposition is withdrawn — but it
// must pass `allowRemovals`, which is a decision recorded in the call rather than an accident buried in a diff.
//
// this compares KEYED RECORDS, which is what the conveyor, the leads and the queue all are. It
// does not diff arbitrary text and it is not a merge tool — two writers editing the same record still need the
// one-writer lock. What it guarantees is that a change which drops a key cannot be mistaken for one that does not.
import { toUuid } from '../../../address.js'

export interface Keyed { key: string }

export interface InstallPlan<T extends Keyed> {
  added: T[]
  removed: T[]
  changed: { key: string; before: T; after: T }[]
  kept: number
  /** true when nothing is destroyed — additions and edits only */
  lossless: boolean
  /** the fold over every affected key, so a plan has an identity a caller can cite */
  receipt: string
}

const byKey = <T extends Keyed>(rows: readonly T[]): Map<string, T> => new Map(rows.map((r) => [r.key, r]))

/** planChange(before, after) → what committing this would do. Computes; changes nothing. `apk --simulate`. */
export function planChange<T extends Keyed>(before: readonly T[], after: readonly T[]): InstallPlan<T> {
  const b = byKey(before)
  const a = byKey(after)
  const added = [...a.values()].filter((r) => !b.has(r.key))
  const removed = [...b.values()].filter((r) => !a.has(r.key))
  const changed: { key: string; before: T; after: T }[] = []
  let kept = 0
  for (const [k, av] of a) {
    const bv = b.get(k)
    if (!bv) continue
    if (JSON.stringify(bv) === JSON.stringify(av)) kept++
    else changed.push({ key: k, before: bv, after: av })
  }
  return {
    added, removed, changed, kept,
    lossless: removed.length === 0,
    receipt: toUuid(`plan|${added.map((r) => r.key).sort().join(',')}|${removed.map((r) => r.key).sort().join(',')}|${changed.map((c) => c.key).sort().join(',')}`),
  }
}

/** renderPlan(plan) → apk-shaped lines: numbered steps, removals named individually, never summarised away. */
export function renderPlan<T extends Keyed>(plan: InstallPlan<T>, what = 'record'): string[] {
  const steps = plan.added.length + plan.removed.length + plan.changed.length
  if (steps === 0) return [`(0/0) nothing to do — ${plan.kept} ${what}(s) unchanged`]
  const out: string[] = []
  let n = 0
  for (const r of plan.removed) out.push(`(${++n}/${steps}) REMOVING ${r.key}`)
  for (const r of plan.added) out.push(`(${++n}/${steps}) Adding ${r.key}`)
  for (const c of plan.changed) out.push(`(${++n}/${steps}) Updating ${c.key}`)
  out.push(`OK: ${plan.added.length} added, ${plan.changed.length} updated, ${plan.removed.length} REMOVED, ${plan.kept} unchanged`)
  // REMOVALS ARE NAMED ONE BY ONE AND NEVER FOLDED INTO A COUNT. "30 removed" is a number a reader skims; thirty
  // lines each naming a claim is a thing they notice. The asymmetry is deliberate: additions can be summarised
  // because an unwanted addition is visible later, and a removal is not.
  if (!plan.lossless) out.push(`⚠ THIS PLAN DESTROYS ${plan.removed.length} ${what}(s) — listed above, individually, so none is lost in a total`)
  return out
}

export interface CommitResult<T extends Keyed> { ok: boolean; plan: InstallPlan<T>; why: string }

/** commitChange — apply only if it destroys nothing, or if the caller says removal is intended. */
export function commitChange<T extends Keyed>(
  before: readonly T[],
  after: readonly T[],
  opts: { allowRemovals?: boolean; reason?: string } = {},
): CommitResult<T> {
  const plan = planChange(before, after)
  if (!plan.lossless && !opts.allowRemovals) {
    return {
      ok: false, plan,
      why: `refused: this change REMOVES ${plan.removed.length} record(s) (${plan.removed.slice(0, 5).map((r) => r.key).join(', ')}${plan.removed.length > 5 ? '…' : ''}). ` +
        'Pass allowRemovals with a reason if the removal is the point — a destructive change must be chosen, not defaulted into.',
    }
  }
  return { ok: true, plan, why: plan.lossless ? 'lossless' : `removals allowed: ${opts.reason ?? 'no reason given'}` }
}

/** Occupancy pentagram. Rank climbs personal → paas. Console picks one. */
export const INSTALL_OCCUPANCIES = ['personal', 'business', 'corporate', 'saas', 'paas'] as const
export type InstallOccupancy = (typeof INSTALL_OCCUPANCIES)[number]

/** One-click Cloudflare Workers deploy. Same URLs as README badges and install.json. */
export const INSTALL_CLOUDFLARE = {
  key: 'cloudflare',
  button: 'https://deploy.workers.cloudflare.com/button',
  qpu: 'https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/qpu',
  uuidna: 'https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/uuidna',
  payload: 'https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/payload',
} as const

/** The three packages the interactive installer seats: QPU MCP, Payload MCP (find-only), VitePress payload. */
export const INSTALL_PACKAGES = [
  {
    key: 'qpu-mcp',
    href: 'https://qpu.uuidna.com/mcp',
    auth: false,
    html: false,
    sealed: 8,
    prompt: 'Install QPU MCP at https://qpu.uuidna.com/mcp? JSON-LD. Eight sealed tools. theorem shor. theorem crypto.',
  },
  {
    key: 'payload-mcp',
    href: '/api/mcp',
    find: true,
    write: false,
    html: false,
    sealed: false,
    tools: ['findPages', 'findUsers', 'findMedia', 'findTenants'] as const,
    prompt: 'Fuse Payload MCP find-only (findPages findUsers findMedia findTenants) into QPU tools/call. Sealed doors stay eight. Writes stay off.',
  },
  {
    key: 'vitepress-payload',
    href: 'https://uuidna.com',
    html: true,
    qpuHtml: false,
    plugin: 'infuseQuantumPayload',
    concurrency: 2,
    prompt: 'Keep VitePress quantum payload on uuidna.com (infuseQuantumPayload, buildConcurrency = 2). QPU is JSON-LD at qpu.uuidna.com.',
  },
] as const

export type InstallPackageKey = (typeof INSTALL_PACKAGES)[number]['key']

const PACKAGE_ALIASES: Record<string, InstallPackageKey> = {
  '1': 'qpu-mcp',
  qpu: 'qpu-mcp',
  'qpu-mcp': 'qpu-mcp',
  '2': 'payload-mcp',
  payload: 'payload-mcp',
  'payload-mcp': 'payload-mcp',
  '3': 'vitepress-payload',
  vitepress: 'vitepress-payload',
  'vitepress-payload': 'vitepress-payload',
}

/** parseInstallLine('1 3 saas') → packages + occupancy + whether to print the Cloudflare button. Empty / all = everything. */
export function parseInstallLine(line = ''): {
  keys: InstallPackageKey[]
  occupancy: InstallOccupancy
  cloudflare: boolean
} {
  const tokens = line.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const allKeys = INSTALL_PACKAGES.map((row) => row.key)
  if (tokens.length === 0 || tokens.includes('all')) {
    return { keys: allKeys, occupancy: 'personal', cloudflare: true }
  }
  const keys: InstallPackageKey[] = []
  let occupancy: InstallOccupancy = 'personal'
  let cloudflare = false
  for (const token of tokens) {
    const pack = PACKAGE_ALIASES[token]
    if (pack && !keys.includes(pack)) keys.push(pack)
    else if ((INSTALL_OCCUPANCIES as readonly string[]).includes(token)) occupancy = token as InstallOccupancy
    else if (token === 'cf' || token === 'cloudflare') cloudflare = true
  }
  return {
    keys: keys.length > 0 ? keys : allKeys,
    occupancy,
    cloudflare: cloudflare || tokens.includes('all'),
  }
}

export const installCombinationsOf = () =>
  INSTALL_PACKAGES.map((row, i) => ({
    n: i + 1,
    key: row.key,
    href: row.href,
    label: row.key,
  }))

const seatKeys = (keys: readonly string[]) => {
  for (const key of keys) {
    if (!interactivePending.includes(key)) interactivePending.push(key)
  }
}

export type InstallVerb = 'ask' | 'plan' | 'commit' | 'audit'

export interface InteractiveInstall {
  kind: 'install'
  interactive: true
  verb: InstallVerb
  step: number
  total: number
  prompt: string
  package?: (typeof INSTALL_PACKAGES)[number]
  combinations: ReturnType<typeof installCombinationsOf>
  occupancy: InstallOccupancy
  occupancies: typeof INSTALL_OCCUPANCIES
  cloudflare: typeof INSTALL_CLOUDFLARE
  pending: string[]
  seated: string[]
  plan: InstallPlan<{ key: string }>
  lines: string[]
  committed: boolean
  why: string
  audit: boolean
  client: {
    qpu: { url: string; auth: false; html: false }
    payload: { url: string; find: true; write: false }
    vitepress: { origin: string; plugin: string; concurrency: number; qpu: false }
  }
  next: string
}

const interactivePending: string[] = []
const interactiveSeated: string[] = []

let interactiveOccupancy: InstallOccupancy = 'personal'

/** interactiveInstall — apk ask → plan → commit → audit. Select combinations in one line, or one package at a time. */
export function interactiveInstall(args: {
  verb?: InstallVerb
  step?: number
  yes?: boolean
  reset?: boolean
  allowRemovals?: boolean
  reason?: string
  all?: boolean
  select?: readonly string[]
  line?: string
  occupancy?: string
} = {}): InteractiveInstall {
  if (args.reset) {
    interactivePending.length = 0
    interactiveSeated.length = 0
    interactiveOccupancy = 'personal'
  }
  const picked =
    typeof args.line === 'string' ? parseInstallLine(args.line)
    : args.all === true ? parseInstallLine('all')
    : args.select ? parseInstallLine(args.select.join(' '))
    : undefined
  if (picked) seatKeys(picked.keys)
  if (picked?.occupancy) interactiveOccupancy = picked.occupancy
  if (typeof args.occupancy === 'string' && (INSTALL_OCCUPANCIES as readonly string[]).includes(args.occupancy)) {
    interactiveOccupancy = args.occupancy as InstallOccupancy
  }
  const verb: InstallVerb = args.verb === 'plan' || args.verb === 'commit' || args.verb === 'audit' ? args.verb : 'ask'
  let step = typeof args.step === 'number' && args.step >= 0 && args.step < INSTALL_PACKAGES.length ? args.step : interactivePending.length
  if (verb === 'ask' && args.yes && !picked && step < INSTALL_PACKAGES.length) {
    const key = INSTALL_PACKAGES[step]!.key
    if (!interactivePending.includes(key)) interactivePending.push(key)
    step += 1
  }
  if (picked) step = INSTALL_PACKAGES.length
  const before = interactiveSeated.map((key) => ({ key }))
  const after = interactivePending.map((key) => ({ key }))
  const plan = planChange(before, after)
  let committed = false
  let why = 'ask'
  if (verb === 'commit') {
    const result = commitChange(before, after, { allowRemovals: args.allowRemovals, reason: args.reason })
    why = result.why
    if (result.ok) {
      interactiveSeated.splice(0, interactiveSeated.length, ...interactivePending)
      committed = true
    }
  }
  const wanted = INSTALL_PACKAGES.map((row) => row.key)
  const audit =
    wanted.every((key) => interactiveSeated.includes(key)) &&
    INSTALL_PACKAGES[0]!.html === false &&
    INSTALL_PACKAGES[1]!.write === false &&
    INSTALL_PACKAGES[2]!.qpuHtml === false &&
    INSTALL_PACKAGES[2]!.concurrency === 2
  const current = step < INSTALL_PACKAGES.length ? INSTALL_PACKAGES[step] : undefined
  const combinations = installCombinationsOf()
  return {
    kind: 'install',
    interactive: true,
    verb,
    step,
    total: INSTALL_PACKAGES.length,
    prompt: current?.prompt ?? 'Enter seats all. Type 1 3 saas — or all. Cloudflare is one click in README and install.json.',
    package: current,
    combinations,
    occupancy: interactiveOccupancy,
    occupancies: INSTALL_OCCUPANCIES,
    cloudflare: INSTALL_CLOUDFLARE,
    pending: [...interactivePending],
    seated: [...interactiveSeated],
    plan,
    lines: renderPlan(plan, 'package'),
    committed,
    why,
    audit,
    client: {
      qpu: { url: INSTALL_PACKAGES[0]!.href, auth: false, html: false },
      payload: { url: INSTALL_PACKAGES[1]!.href, find: true, write: false },
      vitepress: { origin: INSTALL_PACKAGES[2]!.href, plugin: INSTALL_PACKAGES[2]!.plugin, concurrency: 2, qpu: false },
    },
    next:
      verb === 'ask' && current
        ? '{ yes: true } seats this package. Then { verb: "plan" } then { verb: "commit", yes: true } then { verb: "audit" }.'
        : verb === 'plan'
          ? '{ verb: "commit" } applies a lossless plan. Removals need allowRemovals.'
          : verb === 'commit'
            ? '{ verb: "audit" } names what is seated.'
            : audit
              ? 'installed. Payload MCP is fused at QPU tools/call. VitePress payload stays on uuidna.com. QPU is JSON-LD.'
              : 'Enter seats all. Or { all: true, yes: true } then { verb: "commit" }. Cloudflare: install.json / README button.',
  }
}

/** simpleInstall — one shot: pick combinations, plan, commit. Enter / --yes seats all. */
export function simpleInstall(args: {
  line?: string
  select?: readonly string[]
  occupancy?: string
  yes?: boolean
} = {}): InteractiveInstall {
  interactiveInstall({ reset: true })
  const picked = parseInstallLine(args.line ?? (args.select ? args.select.join(' ') : 'all'))
  interactiveInstall({
    all: args.select === undefined && args.line === undefined,
    select: args.select,
    line: args.line,
    occupancy: args.occupancy ?? picked.occupancy,
  })
  interactiveInstall({ verb: 'plan' })
  return interactiveInstall({ verb: args.yes === false ? 'plan' : 'commit' })
}
