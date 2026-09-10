// quantum/os/installer — APK'S OWN DISCIPLINE, PORTED: simulate, show the plan, then commit.
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
// what drifted from the installed manifest. Three verbs — simulate, commit, audit — and the middle one is only
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

/** The three packages the interactive installer seats: QPU MCP, Payload MCP (find-only), VitePress payload. */
export const INSTALL_PACKAGES = [
  {
    key: 'qpu-mcp',
    href: 'https://qpu.uuidna.com/mcp',
    auth: false,
    html: false,
    sealed: 8,
    prompt: 'Install QPU MCP at https://qpu.uuidna.com/mcp? JSON-LD. No auth. Eight sealed tools. Not HTML. Not VitePress.',
  },
  {
    key: 'payload-mcp',
    href: '/api/mcp',
    find: true,
    write: false,
    html: false,
    sealed: false,
    tools: ['findPages', 'findUsers', 'findMedia', 'findTenants'] as const,
    prompt: 'Fuse Payload MCP find-only (findPages findUsers findMedia findTenants) into QPU tools/call without a ninth sealed tool? Writes stay off.',
  },
  {
    key: 'vitepress-payload',
    href: 'https://uuidna.com',
    html: true,
    qpuHtml: false,
    plugin: 'infuseQuantumPayload',
    concurrency: 2,
    prompt: 'Keep VitePress quantum payload on uuidna.com (infuseQuantumPayload, buildConcurrency = 2). QPU stays API-only JSON-LD?',
  },
] as const

export type InstallVerb = 'ask' | 'simulate' | 'commit' | 'audit'

export interface InteractiveInstall {
  kind: 'install'
  interactive: true
  verb: InstallVerb
  step: number
  total: number
  prompt: string
  package?: (typeof INSTALL_PACKAGES)[number]
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

/** interactiveInstall — apk ask → simulate → commit → audit, one package at a time. Memory only until commit. */
export function interactiveInstall(args: {
  verb?: InstallVerb
  step?: number
  yes?: boolean
  reset?: boolean
  allowRemovals?: boolean
  reason?: string
} = {}): InteractiveInstall {
  if (args.reset) {
    interactivePending.length = 0
    interactiveSeated.length = 0
  }
  const verb: InstallVerb = args.verb === 'simulate' || args.verb === 'commit' || args.verb === 'audit' ? args.verb : 'ask'
  let step = typeof args.step === 'number' && args.step >= 0 && args.step < INSTALL_PACKAGES.length ? args.step : interactivePending.length
  if (verb === 'ask' && args.yes && step < INSTALL_PACKAGES.length) {
    const key = INSTALL_PACKAGES[step]!.key
    if (!interactivePending.includes(key)) interactivePending.push(key)
    step += 1
  }
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
  return {
    kind: 'install',
    interactive: true,
    verb,
    step,
    total: INSTALL_PACKAGES.length,
    prompt: current?.prompt ?? 'Simulate, then commit. Audit names every seated package.',
    package: current,
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
        ? '{ yes: true } seats this package. Then { verb: "simulate" } then { verb: "commit", yes: true } then { verb: "audit" }.'
        : verb === 'simulate'
          ? '{ verb: "commit" } applies a lossless plan. Removals need allowRemovals.'
          : verb === 'commit'
            ? '{ verb: "audit" } names what is seated.'
            : audit
              ? 'installed. Payload MCP is fused at QPU tools/call. VitePress payload stays on uuidna.com. QPU is JSON-LD.'
              : 'seat every package with { yes: true }, then simulate, then commit.',
  }
}
