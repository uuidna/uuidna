// A HEAVY DOOR RUNS AS A JOB. A door whose computation is long (the discovery over every window, for one) would block the
// server's event loop for the whole run, so no other call is answered meanwhile. `job` runs any door in a child process:
// { task, params } starts it and answers at once with an id; { id } answers its status, and its result once done.
// The state is on disk, not in memory: a job's metadata, output and errors live in the job directory, so a restart of
// the server does not lose a job that is still running or has finished.
import { spawn } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { mcpFuseOf } from '../quantum/processing/unit/index.js'

// the job directory and the unit's module paths are read when a job starts, not when the module loads: a host with no file system
// (a Worker) must still load the other doors, and this one answers that it cannot run jobs there
const DIR = (() => { try { const d = join(tmpdir(), 'qpu-jobs'); mkdirSync(d, { recursive: true }); return d } catch { return join(tmpdir(), 'qpu-jobs') } })()

const MCP = (() => { try { return new URL('../quantum/processing/unit/mcp.js', import.meta.url).href } catch { return '' } })()
const FUSED = (() => { try { return new URL('./qpu-fused.js', import.meta.url).href } catch { return '' } })()

const pathOf = (id: string, ext: string) => join(DIR, `${id}.${ext}`)
const readOf = (id: string, ext: string) => (existsSync(pathOf(id, ext)) ? readFileSync(pathOf(id, ext), 'utf8') : '')

/** Is the job's child still running? A pid that no longer answers means the job ended, with or without a result. */
const aliveOf = (pid: number) => {
  try { process.kill(pid, 0); return true } catch { return false }
}

/** The state of a job, read from its files: the output is the result, the error file is a failure, a live pid is running. */
const stateOf = (id: string) => {
  const meta = readOf(id, 'json')
  if (!meta) return null
  const { door, started, pid } = JSON.parse(meta) as { door: string; started: number; pid: number }
  const out = readOf(id, 'out')
  const err = readOf(id, 'err')
  if (out) {
    let result: unknown = out
    try { result = JSON.parse(out) } catch { /* the output is text */ }
    return { door, started, status: 'done' as const, result, error: null, finished: Date.now() }
  }
  if (err) return { door, started, status: 'failed' as const, result: null, error: err.slice(-400), finished: Date.now() }
  if (aliveOf(pid)) return { door, started, status: 'running' as const, result: null, error: null, finished: null }
  return { door, started, status: 'lost' as const, result: null, error: 'the job ended without output', finished: null }
}

/** The job runs in its own process; its output and errors are written straight to files, so a restart cannot cut them off. */
const childOf = (id: string, door: string, args: Record<string, unknown>) => {
  const code = [
    `const { mcpCallOf } = await import(${JSON.stringify(MCP)});`,
    `await import(${JSON.stringify(FUSED)});`,
    `const r = await mcpCallOf(${JSON.stringify(door)}, ${JSON.stringify(args)});`,
    'process.stdout.write(JSON.stringify(r, (k, v) => (typeof v === "bigint" ? v.toString() : v)));',
  ].join('\n')
  const out = openSync(pathOf(id, 'out'), 'w')
  const err = openSync(pathOf(id, 'err'), 'w')
  const child = spawn(process.execPath, ['--input-type=module', '-e', code], { stdio: ['ignore', out, err], detached: true })
  closeSync(out)
  closeSync(err)
  child.unref()
  return child
}

const idOf = () => `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

mcpFuseOf('job', {
  description: 'A heavy door as a job: { task, params } starts it in a child process and answers at once with its id, so the server keeps answering; { id } answers the job\'s status and, once done, its result. Jobs survive a restart of the server.',
  inputSchema: {
    type: 'object',
    properties: {
      task: { type: 'string', description: 'the door to run, e.g. discover, crypto_rsa, lean (named task, not door: the door key routes elsewhere)' },
      params: { type: 'object', description: 'the arguments that door takes' },
      id: { type: 'string', description: 'a job id from an earlier start: returns its status and result' },
    },
  },
  run: async (a) => {
    if (typeof a.id === 'string') {
      const s = stateOf(a.id)
      if (!s) return { kind: 'job', id: a.id, status: 'unknown', holds: false, next: ['start one with { task, params }'] }
      const elapsedMs = (s.finished ?? Date.now()) - s.started
      return { kind: 'job', id: a.id, door: s.door, status: s.status, elapsedMs, result: s.result, error: s.error, holds: s.status === 'done' }
    }
    if (typeof a.task !== 'string') return { kind: 'job', status: 'refused', holds: false, next: ['give { task, params } to start, or { id } to read'] }
    const id = idOf()
    const child = childOf(id, a.task, (a.params as Record<string, unknown>) ?? {})
    writeFileSync(pathOf(id, 'json'), JSON.stringify({ door: a.task, started: Date.now(), pid: child.pid }))
    return { kind: 'job', id, task: a.task, status: 'running', holds: true, next: [`tools/call job { "id": "${id}" } reads the result`] }
  },
})
