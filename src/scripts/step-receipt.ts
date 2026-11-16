// step-receipt — A DERIVE STEP RUNS ONLY WHEN SOMETHING IT READ HAS MOVED (verify_beats_recompute_by_magnitudes).
//
// The derive ran every emitter on every landing: a one-line change to one page generator re-ran all 69, about
// sixteen minutes, to rewrite one file. The kernel's own wings had stopped paying that long ago — emit() skips a wing
// whose text the kernel already signed — and the emitters had no such receipt, because nothing recorded what each one
// reads. step-trace.ts now records it from the step's own process, and this module turns the record into a receipt:
//
//   inRoot  = merkleGravity over a leaf per input — each file read (by the address of its bytes), each directory
//             listed (by its names), each path probed (by whether it exists), each environment value read, the args
//   outRoot = merkleGravity over a leaf per path written, by the address of its bytes now on disk
//   cross   = the address of inRoot and outRoot together
//
// A step whose inputs and outputs both recompute to its saved roots is VERIFIED BY RECEIPT and not run: the same
// inputs went in, the same bytes are still there, so running it again could only write what is already written. A
// step marked open (network, a child process, a read outside the tree) never skips, and neither does a step with no
// receipt yet. The fold is order-invariant, so the receipt does not depend on the order a step happened to read in.
// Inputs are fingerprinted from disk AFTER the step ran, so a file a step reads and rewrites is held at what it wrote.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { toUuidOnce } from '../address.js'
import { merkleGravity } from '../gravity/index.js'
import { envValueAddress } from './step-trace.js'

/** what step-trace.ts records for one run of one step; an environment value is held by its address, never in clear */
export interface StepTrace { reads: string[]; lists: string[]; probes: string[]; writes: string[]; env: [string, string][]; open: string[]; footprintBytes?: number }

export { envValueAddress }
/** the saved receipt: the trace that produced it and the three roots */
export interface StepReceipt { step: string; args: string[]; trace: StepTrace; inRoot: string; outRoot: string; cross: string }

const bytesOf = (root: string, rel: string): string | null => {
  const p = join(root, rel)
  if (!existsSync(p)) return null
  const s = statSync(p)
  if (s.isDirectory()) return 'dir:' + readdirSync(p).sort().join('\n')
  return toUuidOnce(readFileSync(p).toString('latin1'))
}

/** inputRoot(root, trace, args) → the fold of every input as it stands on disk now */
export function inputRoot(root: string, trace: StepTrace, args: readonly string[]): string {
  const leaves = [toUuidOnce(`args|${args.join('\u0000')}`)]
  for (const r of trace.reads) leaves.push(toUuidOnce(`read|${r}|${bytesOf(root, r) ?? 'absent'}`))
  for (const d of trace.lists) {
    const p = join(root, d)
    leaves.push(toUuidOnce(`list|${d}|${existsSync(p) && statSync(p).isDirectory() ? readdirSync(p).sort().join('\n') : 'absent'}`))
  }
  for (const q of trace.probes) {
    const p = join(root, q)
    leaves.push(toUuidOnce(`probe|${q}|${existsSync(p) ? (statSync(p).isDirectory() ? 'dir' : 'file') : 'absent'}`))
  }
  for (const [k] of trace.env) leaves.push(toUuidOnce(`env|${k}|${envValueAddress(process.env[k])}`))
  return merkleGravity(leaves)
}

/** envMoved(trace, env) → the first recorded environment variable whose value differs now, or undefined */
export const envMoved = (trace: StepTrace, env: NodeJS.ProcessEnv): string | undefined =>
  trace.env.find(([k, a]) => envValueAddress(env[k]) !== a)?.[0]

/** outputRoot(root, trace) → the fold of every path the step wrote, by its bytes on disk now */
export function outputRoot(root: string, trace: StepTrace): string {
  return merkleGravity(trace.writes.map((w) => toUuidOnce(`write|${w}|${bytesOf(root, w) ?? 'absent'}`)))
}

export const crossOf = (inRoot: string, outRoot: string): string => toUuidOnce(`cross|${inRoot}|${outRoot}`)

const receiptPath = (root: string, step: string): string => join(root, 'dist', 'step-receipts', `${step}.json`)

/** stepVerdict(root, step, args) → may this step be skipped? Only with a closed receipt whose two roots recompute. */
export function stepVerdict(root: string, step: string, args: readonly string[]): { skip: boolean; why: string; cross?: string } {
  const p = receiptPath(root, step)
  if (!existsSync(p)) return { skip: false, why: 'no receipt yet' }
  let saved: StepReceipt
  try { saved = JSON.parse(readFileSync(p, 'utf8')) as StepReceipt } catch { return { skip: false, why: 'receipt unreadable' } }
  if (saved.args.join('\u0000') !== args.join('\u0000')) return { skip: false, why: 'args changed' }
  if (saved.trace.open.length) return { skip: false, why: `open: ${saved.trace.open[0]}` }
  const moved = envMoved(saved.trace, process.env)
  if (moved !== undefined) return { skip: false, why: `environment moved: ${moved}` }
  if (inputRoot(root, saved.trace, args) !== saved.inRoot) return { skip: false, why: 'an input moved' }
  if (outputRoot(root, saved.trace) !== saved.outRoot) return { skip: false, why: 'an output moved since it was written' }
  return { skip: true, why: 'inputs and outputs recompute to the receipt', cross: saved.cross }
}

/** savedTrace(root, step) → the trace of the step's last successful run, or null when it has none */
export function savedTrace(root: string, step: string): StepTrace | null {
  try { return (JSON.parse(readFileSync(receiptPath(root, step), 'utf8')) as StepReceipt).trace } catch { return null }
}

// ── THE ORDER THE STEPS NEED, READ FROM WHAT THEY TOUCHED ──────────────────────────────────────────────────────────
// The manifest is a total order; the steps' own traces say which of its edges are real. B waits for an earlier A only
// when A writes a path B reads, probes or writes, or a path under a directory B lists — or when B writes something A
// reads, probes or lists, which A must see before B replaces it. Everything else may run at once. A step with no trace
// or an open one is a barrier: it waits for every step before it and every step after it waits for it, so what the
// record cannot vouch for keeps the manifest's order exactly.
//
// INDEXED, because the traces are large: one step lists 190,324 directories and probes 346,491 paths, and matching
// them with Array.includes across every pair of 69 steps cost the runner more wall time than the steps themselves.
// Each trace becomes sets once; a listed directory is found by walking a written path's parents, so a write costs
// its depth rather than the size of the other step's record.
interface Seen { touched: Set<string>; listed: Set<string>; writes: readonly string[] }
const seenOf = (t: StepTrace): Seen => ({ touched: new Set([...t.reads, ...t.probes, ...t.writes]), listed: new Set(t.lists), writes: t.writes })
const parentsOf = function* (path: string): Generator<string> {
  yield '.'
  for (let i = path.indexOf('/'); i !== -1; i = path.indexOf('/', i + 1)) yield path.slice(0, i)
  yield path
}
const sees = (s: Seen, path: string): boolean => {
  if (s.touched.has(path)) return true
  if (s.listed.size) for (const d of parentsOf(path)) if (s.listed.has(d)) return true
  return false
}
const needs = (a: Seen, b: Seen): boolean => a.writes.some((w) => sees(b, w)) || b.writes.some((w) => sees(a, w))

/** stepDependencies(traces) → for each step, the earlier steps it must wait for */
export function stepDependencies(traces: readonly (StepTrace | null)[]): number[][] {
  const barrier = (t: StepTrace | null): boolean => t === null || t.open.length > 0
  const seen = traces.map((t) => (t === null || barrier(t) ? null : seenOf(t)))
  return traces.map((b, j) => {
    const deps: number[] = []
    for (let i = 0; i < j; i++) {
      if (seen[i] === null || seen[j] === null || needs(seen[i]!, seen[j]!)) deps.push(i)
    }
    return deps
  })
}

/** saveStepReceipt(root, step, args, tracePath) → read the step's trace and save its receipt; returns it */
export function saveStepReceipt(root: string, step: string, args: readonly string[], tracePath: string): StepReceipt | null {
  if (!existsSync(tracePath)) return null
  const trace = JSON.parse(readFileSync(tracePath, 'utf8')) as StepTrace
  const inRoot = inputRoot(root, trace, args)
  const outRoot = outputRoot(root, trace)
  const receipt: StepReceipt = { step, args: [...args], trace, inRoot, outRoot, cross: crossOf(inRoot, outRoot) }
  mkdirSync(join(root, 'dist', 'step-receipts'), { recursive: true })
  writeFileSync(receiptPath(root, step), JSON.stringify(receipt) + '\n')
  return receipt
}
