import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RESIDUE_WGSL, gpuPresence, residuesOnCpu, dispatchResidues } from './index.js'
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
