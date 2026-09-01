import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RESIDUE_WGSL, gpuPresence, residuesOnCpu, dispatchResidues, hybridResidues } from './index.js'
import { RING } from '../../hexbit/index.js'

test('the CPU reference is the lattice residue, not a re-derivation of it', () => {
  const v = new Uint32Array([0, 1, 8, 9, 10, 0xdeadbeef, 0xffffffff])
  const got = residuesOnCpu(v)
  for (let i = 0; i < v.length; i++) assert.equal(got[i], v[i]! % RING, `element ${i}`)
})

test('the shader carries the SEALED modulus, so it cannot drift from the lattice', () => {
  assert.match(RESIDUE_WGSL, new RegExp(`% ${RING}u`), 'the modulus is injected from RING, never written into the source')
  assert.match(RESIDUE_WGSL, /@compute @workgroup_size\(64\)/)
  assert.match(RESIDUE_WGSL, /arrayLength\(&src\)/, 'the bound is read from the buffer, so a short tail cannot run off the end')
})

// ── THE PART THAT MATTERS: AN UNRUN SHADER IS NOT A PASSING ONE ──────────────────────────────────────────────
// Node exposes no navigator.gpu, so this suite can verify detection, refusal and the reference — and cannot
// verify the dispatch. The result therefore reports agrees:null rather than true, because nothing was compared.
// A default of true here would be the exact defect this repository has been finding all day: a check that
// reports success over work it never did.
test('CONTROL — with no accelerator the dispatch REFUSES and reports agrees:null, never true', async () => {
  assert.equal(gpuPresence().webgpu, false, 'Node exposes no WebGPU')
  const r = await dispatchResidues(new Uint32Array([1, 2, 3]))
  assert.equal(r.ran, false)
  assert.equal(r.agrees, null, 'nothing was compared, so nothing may be claimed')
  assert.notEqual(r.agrees, true, 'an unrun shader must never read as a passing one')
  assert.match(r.honest, /not a passing one/)
})

test('CONTROL — the refusal names the reason rather than reporting a zero', async () => {
  const r = await dispatchResidues(new Uint32Array(1024))
  assert.equal(r.elements, 1024, 'it still says how much was asked for')
  assert.match(r.honest, /no navigator\.gpu/)
})

// ── THE INVOLUTION: ONE PROBLEM, BOTH PROCESSORS ─────────────────────────────────────────────────────────────
// The plain dispatch is awaited immediately, which idles the CPU — so it measures the accelerator against
// nothing running, and it loses at every size. Splitting the work and computing the CPU's share WHILE the
// dispatch is in flight is a different arrangement, and on real hardware it beats the CPU alone. These pin the
// contract that makes such a measurement meaningful; the speed itself is a fact about a host, not about a type.
test('the split is 64-aligned, so the shader never runs a ragged tail', async () => {
  for (const frac of [0.1, 0.25, 0.5, 0.75]) {
    const r = await hybridResidues(new Uint32Array(100_000), frac)
    assert.equal(r.split % 64, 0, `a ${frac} share must align to the workgroup width, got ${r.split}`)
    assert.ok(r.split <= 100_000)
  }
})

test('fraction 0 is the CPU alone and fraction 1 is the whole problem dispatched', async () => {
  assert.equal((await hybridResidues(new Uint32Array(4096), 0)).split, 0)
  assert.equal((await hybridResidues(new Uint32Array(4096), 1)).split, 4096)
})

test('CONTROL — a share outside [0,1] is refused, never clamped into looking sensible', async () => {
  await assert.rejects(() => hybridResidues(new Uint32Array(64), 1.5), /share of one problem/)
  await assert.rejects(() => hybridResidues(new Uint32Array(64), -0.1), /share of one problem/)
})

test('CONTROL — with no accelerator the hybrid says so and does NOT read as a hybrid result', async () => {
  const r = await hybridResidues(new Uint32Array(4096), 0.5)
  assert.equal(r.ran, false, 'Node has no navigator.gpu')
  assert.equal(r.agrees, null, 'nothing was dispatched, so nothing was compared')
  assert.match(r.honest, /must not be read as a hybrid result/)
})
