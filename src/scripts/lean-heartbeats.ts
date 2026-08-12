#!/usr/bin/env node
// Extract the DETERMINISTIC decide-step cost of theorems from the Lean toolchain — the minimum `maxHeartbeats` at
// which `by decide` still verifies, found by binary search. Heartbeats are Lean's machine-INDEPENDENT work measure
// (a too-low cap yields a "(deterministic) timeout"), so the cost recomputes to the SAME number on any machine —
// unlike wall-clock time, and unlike a self-reported token count. It reflects the DECISION work (the domain the
// decide ranges over), which text-size cannot: a 64-case decide costs far more than a one-line arithmetic fact.
//
// Requires the `lean` toolchain and one Lean run per probe. Usage:
//   npm run heartbeats            → a small sample
//   npm run heartbeats key ...    → named theorems
//   npm run heartbeats --all      → FOLD the whole ledger (expensive: ~15 probes × every theorem, run in parallel)
// Integrity, not truth.
import { execFile } from 'node:child_process'
import { writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { theorems } from '../index.js'
import { ROOT } from './lean-gen.js'

const T = theorems()
const half = (n: number): number => (n - (n % 2)) / 2 // floor(n/2), no Math.*

// Each theorem is made self-contained by prepending its source file's DEFS — every `def`/`abbrev` block, wherever it
// sits in the file (generated files put them at the top; hand-written files may interleave them with theorems).
const defPrefix: Record<string, string> = {}
for (const file of [...new Set(T.map((t) => t.file))]) {
  try {
    const content = readFileSync(join(ROOT, 'lean', file), 'utf8')
    // a def block = a `def`/`abbrev` line and any following indented continuation lines, up to the next top-level line
    const lines = content.split('\n')
    const out: string[] = []
    for (let i = 0; i < lines.length; i++) {
      if (/^(def|abbrev|notation) /.test(lines[i])) {
        out.push(lines[i])
        while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) { out.push(lines[i + 1]); i++ }
      }
    }
    defPrefix[file] = out.join('\n')
  } catch { defPrefix[file] = '' }
}

// Does `by decide` verify under a maxHeartbeats cap of N? Deterministic — heartbeats are machine-independent.
const fits = (probe: string, defs: string, lean: string, N: number): Promise<boolean> =>
  new Promise((resolve, reject) => {
    writeFileSync(probe, `set_option maxHeartbeats ${N}\n${defs}\n${lean}\n`)
    execFile('lean', [probe], { maxBuffer: 32 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (!err) return resolve(true)
      const msg = String(stdout || '') + String(stderr || '')
      if (/maximum number of heartbeats/.test(msg)) return resolve(false) // capped out — N too low
      if (msg.trim() === '') return resolve(true)
      reject(new Error(msg.slice(0, 160)))
    })
  })

// The EXACT theorem block from the source file (`theorem <key>` up to the next top-level declaration) — the real,
// compiling multi-line text, so theorems with inline `-- comments` or multi-line statements (which the single-line
// reconstruction mangles) still measure. Falls back to the reconstructed t.lean if the block is not found.
const blockOf = (file: string, key: string, fallback: string): string => {
  try {
    const lines = readFileSync(join(ROOT, 'lean', file), 'utf8').split('\n')
    const start = lines.findIndex((l) => new RegExp('^theorem ' + key + '\\b').test(l))
    if (start < 0) return fallback
    let end = start + 1
    while (end < lines.length && !/^(theorem |def |abbrev |namespace|end )/.test(lines[end])) end++
    return lines.slice(start, end).join('\n')
  } catch { return fallback }
}

// The decide-step cost = the minimum maxHeartbeats at which it still passes (binary search).
async function costOf(t: (typeof T)[number]): Promise<number> {
  const probe = join(tmpdir(), 'uuidna-hb-' + t.key + '.lean')
  const defs = defPrefix[t.file] || ''
  const source = blockOf(t.file, t.key, t.lean)
  let hi = 1
  while (!(await fits(probe, defs, source, hi))) { hi *= 2; if (hi > 4_000_000) return hi }
  let lo = half(hi) < 1 ? 1 : half(hi)
  while (lo < hi) { const mid = half(lo + hi); if (await fits(probe, defs, source, mid)) hi = mid; else lo = mid + 1 }
  return lo
}

// Run tasks with bounded concurrency (parallel Lean processes).
async function pool<X, R>(items: X[], concurrency: number, worker: (x: X, i: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  const run = async () => { while (next < items.length) { const i = next++; out[i] = await worker(items[i], i) } }
  await Promise.all(Array.from({ length: concurrency }, run))
  return out
}

async function main() {
  const args = process.argv.slice(2)
  if (args[0] === '--sync') {
    // Incremental, drift-free: keyed by content-address, PRUNE every entry no longer in the ledger (a renamed or
    // changed theorem moved its address, so its old entry is stale), then MEASURE only the addresses still missing
    // (the genuinely new theorems). Same result as --all when the map is empty, but it re-probes only what changed —
    // closing the gap that a hand-merge left open (stale entries → measured ≠ total). Recompute-from-scratch is --all.
    const path = join(ROOT, 'lean', 'heartbeats.json')
    let costs: Record<string, number> = {}
    try { costs = JSON.parse(readFileSync(path, 'utf8')).costs || {} } catch { costs = {} }
    const valid = new Set(T.map((t) => t.address))
    const pruned = Object.keys(costs).filter((a) => !valid.has(a))
    for (const a of pruned) delete costs[a]
    const missing = T.filter((t) => !(t.address in costs))
    process.stderr.write(`sync: ${pruned.length} stale pruned, ${missing.length} to measure, ${Object.keys(costs).length} already current\n`)
    const measured = await pool(missing, 8, async (t) => {
      let c: number | null
      try { c = await costOf(t) } catch { c = null }
      return { address: t.address, key: t.key, cost: c }
    })
    for (const m of measured) if (m.cost !== null) costs[m.address] = m.cost
    const total = Object.values(costs).reduce((s, c) => s + c, 0)
    writeFileSync(path, JSON.stringify({ measured: Object.keys(costs).length, total, costs }) + '\n')
    const covered = Object.keys(costs).length
    console.log(`wrote lean/heartbeats.json — ${covered}/${T.length} measured` +
      (covered === T.length ? ' (100% coverage)' : ` (${T.length - covered} unmeasured)`) +
      `; ${pruned.length} stale entries pruned, ${missing.length} newly measured`)
    return
  }
  if (args[0] === '--all') {
    const started = process.hrtime.bigint()
    let done = 0
    const costs = await pool(T as unknown as (typeof T)[number][], 8, async (t) => {
      let c: number | null
      try { c = await costOf(t) } catch { c = null }
      done += 1
      if (done % 50 === 0) process.stderr.write(`  … ${done}/${T.length}\n`)
      return { key: t.key, file: t.file, cost: c }
    })
    const ok = costs.filter((c) => c.cost !== null) as { key: string; file: string; cost: number }[]
    const total = ok.reduce((s, c) => s + c.cost, 0)
    // persist per-theorem costs, keyed by CONTENT-ADDRESS so a changed theorem self-invalidates (its address moves,
    // the lookup misses, the page shows "not yet measured"). Consumed by the theorem pages; regenerate with --all.
    const addrOf: Record<string, string> = Object.fromEntries(T.map((t) => [t.key, t.address]))
    const costMap: Record<string, number> = {}
    for (const c of ok) costMap[addrOf[c.key]] = c.cost
    writeFileSync(join(ROOT, 'lean', 'heartbeats.json'), JSON.stringify({ measured: ok.length, total, costs: costMap }) + '\n')
    console.log('wrote lean/heartbeats.json — ' + ok.length + ' per-theorem decide-step costs, keyed by content-address')
    const byFile: Record<string, number> = {}
    ok.forEach((c) => { byFile[c.file] = (byFile[c.file] || 0) + c.cost })
    const failed = costs.length - ok.length
    const secs = Number(process.hrtime.bigint() - started) / 1e9
    console.log('\n=== decide-step heartbeat fold — the whole ledger ===')
    console.log('theorems folded   :', ok.length + (failed ? ` (+${failed} unmeasured)` : ''))
    console.log('TOTAL heartbeats  :', total.toLocaleString())
    console.log('mean per theorem  :', (ok.length ? total / ok.length : 0).toFixed(1))
    const top = [...ok].sort((a, b) => b.cost - a.cost).slice(0, 5)
    console.log('costliest         :', top.map((c) => `${c.key}=${c.cost}`).join(', '))
    console.log('by file (top)     :', Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([f, c]) => `${f}=${c}`).join(', '))
    console.log('elapsed           :', secs.toFixed(0) + 's')
    return
  }
  const keys = args.length ? args : ['ohms_law', 'queen_corner_twentyone', 'knight_leap_is_odd', 'chessboard_two_colours', 'z9add_0_0']
  console.log('decide-step cost — minimum maxHeartbeats to verify `by decide` (deterministic, toolchain-extracted):')
  for (const k of keys) {
    const t = T.find((x) => x.key === k)
    console.log('  ' + k.padEnd(26) + (t ? String(await costOf(t)).padStart(8) : '   not found') + ' heartbeats')
  }
}

main()
