// mcp-schema — THE SERVED SURFACE HONOURS ITS OWN CONTRACT. A tool that declares an argument required must REFUSE
// when it is missing"undefined" and answer confidently. Folded as a finder over
// the WHOLE catalog rather than 106 hand-written cases: add a tool tomorrow and this audit already covers it.
//
// MEASURED, the day it was folded (2026-08-17): 72 of the 106 tools declaring required arguments ran anyway on `{}`.
// The worst was uuidna_wave — it spawns the release walk, so the gate's own dispatch probe executed a full graduation
// wave: 169.3s of the probe's 174.8s. Enforcing the schema at the one door (callTool) fixed the correctness defect
// and took the probe to seconds. The cheap gate and the correct gate were the same change.
import { cpus, loadavg } from 'node:os'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import { MCP_CATALOG, callTool } from '../../../mcp.js'

const requiredOf = (t: { inputSchema?: unknown }): string[] => {
  const r = (t.inputSchema as { required?: unknown })?.required
  return Array.isArray(r) ? r.map(String) : []
}

test('the served surface enforces its own schema — a declared-required argument is never silently absent', () => {
  const unenforced: string[] = []
  for (const t of MCP_CATALOG) {
    const required = requiredOf(t)
    if (!required.length) continue
    try {
      const r = callTool(t.name, {})
      // a Promise means the body already ran (the async tools) — that is the failure too
      if (r && typeof (r as { then?: unknown }).then === 'function') (r as Promise<unknown>).catch(() => {})
      unenforced.push(t.name)
    } catch (e) {
      const msg = String((e as Error).message)
      for (const k of required)
        if (!msg.includes(k)) unenforced.push(`${t.name} (refused, but the error does not name "${k}")`)
    }
  }
  assert.deepEqual(unenforced, [], 'these tools ran without an argument their own schema declares required')
})

test('no empty call can spawn a process — every orchestration tool declares a required argument', () => {
  // source-level finder: a tool body that shells out must be unreachable from a no-arg probe, or the gate pays for a
  // full workflow just to prove a name dispatches (which is exactly what uuidna_wave did).
  const src = readFileSync(join(ROOT, 'src', 'mcp.ts'), 'utf8')
  const blocks = src.split(/\n  \{ name: '/).slice(1)
  const offenders: string[] = []
  for (const b of blocks) {
    const name = b.slice(0, b.indexOf("'"))
    if (!/spawnSync|execSync/.test(b)) continue
    // spawn behind an explicit host flag — empty {} stays snapshot-only (uuidna_fill_gaps)
    if (/if\s*\(\s*a\.run\s*===?\s*true\s*\)[\s\S]*spawnSync/.test(b)) continue
    const entry = MCP_CATALOG.find((t) => t.name === name)
    if (!entry || !requiredOf(entry).length) offenders.push(name)
  }
  assert.deepEqual(offenders, [], 'a process-spawning tool with no required argument can be triggered by an empty probe')
})

test('the whole no-arg dispatch probe stays cheap — the gate cannot silently regrow a workflow', () => {
  const started = process.hrtime.bigint()
  for (const t of MCP_CATALOG) {
    try {
      const r = callTool(t.name, {})
      if (r && typeof (r as { then?: unknown }).then === 'function') (r as Promise<unknown>).catch(() => {})
    } catch { /* refusing is the correct, cheap answer */ }
  }
  const seconds = Number(process.hrtime.bigint() - started) / 1e9
  // generous against a slow CI runner; the point is the ORDER of magnitude — 174.8s before the fix, seconds after.
  // THE LOAD IS NAMED AND SCALES THE ALLOWANCE (lead 223, folded 2026-09-07): this arm failed at 67 s and 69 s on
  // a machine at load 54 over 10 cores while five other sessions built, and passed at 6 s alone. A wall-clock
  // ceiling that ignores the neighbours reports their builds as this tree's regression. The allowance is the
  // ceiling times the load per core (never less than one), and the failure says what the load was — so a real
  // regrowth (174.8 s at load 1) still fails, and a neighbour's load is named rather than blamed on the gate.
  const cores = cpus().length || 1
  const perCore = loadavg()[0] / cores
  const factor = perCore > 1 ? perCore : 1
  const allowance = 60 * factor
  assert.ok(seconds < allowance, `the dispatch probe took ${seconds.toFixed(1)}s at load ${loadavg()[0].toFixed(1)} on ${cores} cores (allowance ${allowance.toFixed(0)}s = 60 × ${factor.toFixed(2)}) — a tool is doing real work on an empty call`)
})
