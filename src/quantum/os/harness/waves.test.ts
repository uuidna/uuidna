// quantum/os/waves — THE WAVE EXECUTOR, TESTED WITH DERIVED CARGO AND CONTROLS THAT FAIL. The cargo is the
// ledger itself (every theorem's address compiled and checked — the count DERIVED, never pinned), the hooks
// are counted, the chain is order-sensitive and tamper-evident, and refusal stops the run at its exact wave.
// All of it inside the booted sandbox: the first assertion of every run is the world itself.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runWaves, type WaveJob } from '../waves/index.js'
import { theorems } from '../../../index.js'
import { compileToHexbits } from '../index.js'

const cargo = (): WaveJob[] => theorems().map((t) => ({
  name: t.key,
  run: () => ({ ok: compileToHexbits(t.address).every((h) => Number.isInteger(h) && h >= 0 && h < 16) }),
}))

test('the whole ledger as one wave-run — sandboxed, chained, every hook heard, count derived', async () => {
  let before = 0, after = 0
  const r = await runWaves(cargo(), { width: 64, beforeWave: () => { before++ }, afterWave: () => { after++ } })
  assert.equal(r.jobs, theorems().length, 'the cargo is the ledger — derived, never pinned')
  assert.equal(r.okTotal, r.jobs, 'every theorem address on the lattice')
  assert.equal(before, r.waves.length)
  assert.equal(after, r.waves.length)
  assert.ok(r.waves.every((w, i) => i === 0 || w.link !== r.waves[i - 1]!.link), 'every wave a fresh link')
  assert.equal(r.chain, r.waves[r.waves.length - 1]!.link, 'the head is the last link')
})

test('the chain is order-sensitive and deterministic — the transcript cannot be quietly rearranged', async () => {
  const jobs = cargo().slice(0, 128)
  const a = await runWaves(jobs, { width: 64 })
  const b = await runWaves(jobs, { width: 64 })
  assert.equal(a.chain, b.chain, 'same cargo, same order, same head — the run recomputes')
  const swapped = [...jobs.slice(64), ...jobs.slice(0, 64)]
  const c = await runWaves(swapped, { width: 64 })
  assert.notEqual(c.chain, a.chain, 'reordered waves, moved head — the control that proves the chain can fail')
})

test('afterWave may REFUSE — a short wave stops the run at its exact link', async () => {
  const jobs: WaveJob[] = Array.from({ length: 20 }, (_, i) => ({ name: 'j' + i, run: () => ({ ok: i < 7 }) }))
  const r = await runWaves(jobs, { width: 5, afterWave: (_w, ok, of) => (ok === of ? undefined : false) })
  assert.equal(r.waves.length, 2, 'wave 0 clean (5 ok), wave 1 short (2 of 5) — refused there, waves 2–3 never ran')
  assert.equal(r.jobs, 10, 'only the waves that ran are in the tally')
  assert.equal(r.waves[1]!.ok, 2)
})
