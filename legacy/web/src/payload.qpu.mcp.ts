// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The app's answer to a tool call (appCall) and the developer machine as a Payload MCP tool and job; the tools list is src/plugins/qpuMcp.ts.
import { caller, call } from '@uuidna/qpu/mcp'
import { runMachine } from '@uuidna/qpu/machine-run'
import { LONG_ACTIONS, MACHINE_ACTIONS, MACHINE_RUNNER } from '@uuidna/qpu/machine'
import type { PayloadRequest, TaskConfig } from 'payload'
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

// audit { access } measured on the files the handler names, read under src/ here (the Worker has none); an entry keeps the caller's arguments
export const appCall = (name: string, args: Record<string, unknown>, o: { draw?: boolean } = {}) => {
  const first = call(name, args)
  // a mint without a seed gets one drawn here, on the MCP door alone (o.draw), so an entry stays reproducible
  const asked = (first as { result?: { structuredContent?: { mode?: unknown; continue?: { run?: { arguments?: Record<string, unknown> } } } } }).result?.structuredContent
  if (o.draw && name === 'algorithm' && asked?.mode === 'seed') {
    const bytes = crypto.getRandomValues(new Uint8Array(32)), seed = BigInt('0x' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')).toString()
    return call(name, { ...args, create: { ...(args.create as object), seed } })
  }
  const answered = (first as { result?: { structuredContent?: { missing?: unknown } } }).result?.structuredContent?.missing
  const given = args.access
  if (name !== 'audit' || !given || (typeof given === 'object' && 'files' in (given as object))) return first
  const missing = (Array.isArray(answered) ? answered : []).filter((p): p is string => typeof p === 'string' && /^src\/[A-Za-z0-9._/-]+\.tsx?$/.test(p) && existsSync(path.join(process.cwd(), p)))
  if (!missing.length) return first
  return call(name, { ...args, access: { files: Object.fromEntries(missing.map((p) => [p, readFileSync(path.join(process.cwd(), p), 'utf8')])) } })
}
// the developer machine through the Payload MCP (the plugin's top-level tool shape): the handler's door plans every action from its allow-list; the
// action runs in child processes of the runner (src/quantum/processing/machine-run.ts), only on a local app (a loopback host) and only for a super
// admin, with no shell; an action longer than a request (LONG_ACTIONS, next among them) is queued as the qpu-machine job and answered by its id at
// once (textbook_long_action_queued), its record an entry when it ends; every run is an entry of the Entries collection created as the user (the
// tenant's roles and the entries hooks apply); the result names the repository tool's MCP App view
const callTool = (name: string, args: Record<string, unknown>) => caller(name)(args)
const LOOPBACK = ['localhost', '127.0.0.1', '[::1]']
const ROOT = process.cwd()
type MachineReq = { headers?: { get?: (k: string) => string | null }; user?: { id?: string | number; roles?: string[] } | null; payload: any }
const answer = (x: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(x) }], structuredContent: x as Record<string, unknown>, _meta: { ui: { resourceUri: 'ui://qpu/repository' } } })
/** The facts the workflow rules read and the times the ETA reads, from the docket: the machine entries, the last receipt of next among them. */
const factsOf = async (req: MachineReq) => {
  const r = (await req.payload.find({ collection: 'entries', where: { kind: { equals: 'machine' } }, sort: '-createdAt', pagination: false, depth: 0, overrideAccess: true }).catch(() => ({ docs: [] }))) as { docs: { body?: { receipt?: unknown; ms?: number; action?: string } }[] }
  const receipt = r.docs.find((d) => d.body?.action === 'next' && d.body?.receipt)?.body?.receipt ?? null
  const times: Record<string, number[]> = {}
  for (const d of r.docs) if (typeof d.body?.ms === 'number' && d.body.action) (times[d.body.action] ??= []).push(d.body.ms)
  return { facts: { receipt }, times }
}
export const qpuMachineTool = {
  // the machine runs Payload jobs, so Payload's jobs run access reaches it; the handler keeps the super admin
  access: async ({ req }: { req: PayloadRequest }) => { const run = req.payload.config.jobs?.access?.run; return Boolean(run ? await run({ req }) : req.user) },
  description: `The developer machine managed through the Payload MCP, securely: one action of the allow-list (repository { machine: { actions: true } } names them) run on this local app for a super admin, with no shell, by ${MACHINE_RUNNER}; an action longer than a request (${LONG_ACTIONS.join(', ')}) is queued as the qpu-machine job and answered by its id at once, its record a machine entry when it ends; commit and push decided by the workflow rules, a push only with confirm; every run an entry of the Entries collection, its paths relative and its leaks redacted`,
  input: { type: 'object', properties: { action: { type: 'string', description: `an action of the allow-list: ${MACHINE_ACTIONS.map((a) => a.id).join(', ')}` }, message: { type: 'string', description: 'commit: the message' }, confirm: { type: 'boolean', description: 'push: the user confirms it' }, branch: { type: 'string', description: 'merge, branch-delete: the branch' }, path: { type: 'string', description: 'worktree-remove: the worktree under .claude/worktrees' }, tag: { type: 'string', description: 'tag: an archive/ tag' }, commit: { type: 'string', description: 'tag: the full commit' }, from: { type: 'string', description: 'port: the worktree file' }, file: { type: 'string', description: 'port, and the actions that take a file' }, worktree: { type: 'string', description: 'the worktree the action runs in' }, archived: { type: 'boolean', description: 'branch-delete: the branch is archived (forced)' } }, required: ['action'] },
  handler: async ({ input, req }: { input: Record<string, unknown>; req: MachineReq }) => {
    const h = String(req.headers?.get?.('host') ?? ''), host = h.startsWith('[') ? h.slice(0, h.indexOf(']') + 1) : h.split(':')[0]!
    const refuse = (refused: string, evidence: unknown) => answer({ refused, court: callTool('legal', { court: { gate: 'machine', status: 403, rule: 'role', evidence } }) })
    if (!LOOPBACK.includes(host)) return refuse('the machine answers only on a local app', { host })
    if (!(req.user?.roles ?? []).includes('admin')) return refuse('the machine needs the super admin', { action: input.action })
    const action = String(input.action)
    if (LONG_ACTIONS.includes(action)) {
      const job = (await req.payload.jobs.queue({ task: 'qpu-machine', input: { action, args: JSON.stringify(input) }, req })) as { id: string | number }
      void req.payload.jobs.runByID({ id: job.id, req }).catch(() => undefined)
      return answer({ queued: true, action, job: { collection: 'payload-jobs', id: job.id }, long: LONG_ACTIONS, theorem: 'textbook_long_action_queued', says: `${action} is longer than a request: queued as the qpu-machine job ${job.id}, running now in child processes; its record is a machine entry when it ends` })
    }
    const { facts, times } = await factsOf(req)
    const r = await runMachine(input, ROOT, () => {}, { facts, times })
    if (!r.record) return answer(r.plan)
    const doc = await req.payload.create({ collection: 'entries', data: { kind: 'machine', from: 'local', body: r.record.entry.body }, req, overrideAccess: false, user: req.user })
    return answer({ ...r.answer, stored: { collection: 'entries', id: doc.id } })
  },
}
/** The job of a long action (payloadcms.com/docs/jobs-queue/tasks): the runner in child processes, its record an entry, the request free meanwhile. */
export const qpuMachineTask: TaskConfig<{ input: { action: string; args?: string }; output: { entry: string; ok: boolean } }> = {
  slug: 'qpu-machine', retries: 0, inputSchema: [{ name: 'action', type: 'text', required: true }, { name: 'args', type: 'textarea' }], outputSchema: [{ name: 'entry', type: 'text' }, { name: 'ok', type: 'checkbox' }],
  handler: async ({ input, req }) => {
    const args = JSON.parse(input.args || '{}') as Record<string, unknown>
    const { facts, times } = await factsOf(req as never)
    const r = await runMachine({ ...args, action: input.action }, ROOT, () => {}, { facts, times })
    const body = r.record ? r.record.entry.body : { action: input.action, refused: (r.plan as { refused?: string }).refused ?? 'refused by the plan', plan: r.plan }
    const doc = (await (req as never as MachineReq).payload.create({ collection: 'entries', data: { kind: 'machine', from: 'local', body }, req, overrideAccess: true })) as { id: string | number }
    return { output: { entry: String(doc.id), ok: r.record?.ok === true } }
  },
}
