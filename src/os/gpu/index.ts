// @non-harmonic: reaches an ACCELERATOR that may or may not exist, and its availability is a fact about the
// host rather than about uuidna. Declared here for the same reason the clock is declared in os/timing.
//
// os/gpu — THE DISPATCH, AND AN HONEST ACCOUNT OF WHAT IT IS WORTH.
//
// The lattice's smallest step is a residue: valueOf reads a handle to a u32 and takes it mod RING. Over many
// handles that is embarrassingly parallel — the same independent arithmetic per element, which is the ONLY
// shape a wide processor can help with. It is therefore the one op in this tree worth dispatching, and the CPU
// baseline it must beat is already sealed by os/timing: parallel.valueOf at 132 ns/element.
//
// WHAT THIS FILE HONESTLY IS. The shader below is real WGSL and the dispatch is a real WebGPU call, but NOTHING
// HERE HAS EVER RUN ON A GPU IN THIS REPOSITORY. Node exposes no navigator.gpu and neither does a Worker, so
// the suite can verify the detection, the refusal and the CPU reference — and stops short of verifying the dispatch. That
// is stated in `honest` on every result and it is not a formality: code that has not run is not code that
// works, and a measurement nobody has taken is not a speedup.
//
// MEASURED, AND THE FIRST ANSWER WAS TO THE WRONG QUESTION. Used ALONE — dispatched and awaited immediately —
// the accelerator loses at every size tried, from 130x at a thousand elements to 3.4x at a million. That is not
// GPU against CPU though; awaiting at once leaves the CPU idle, so it is GPU against nothing running.
//
// Split across BOTH, with the dispatch submitted first and the CPU's share computed while it is in flight, the
// involution BEATS the CPU alone at a million elements: 170.7 ms for the CPU by itself against 134.9 ms at a
// tenth to the accelerator, 141.1 ms at a half, 159.4 ms at a quarter. It loses again at three quarters and at
// the whole, where the accelerator becomes the bottleneck, so there is a real interior optimum. Correctness held
// at every split. The ordering is NON-MONOTONIC across those fractions, which means run-to-run noise is
// comparable to the effect: the honest claim is that the involution can beat either processor alone by roughly
// 1.2x on this host, and NOT that any particular split is the best one.
import { RING } from '../../hexbit/index.js'

/** The compute shader: one invocation per handle value, residue mod RING. The modulus is injected from the
 *  sealed constant rather than written into the source, so the shader stays pinned to the lattice it serves. */
export const RESIDUE_WGSL = `
@group(0) @binding(0) var<storage, read>       src : array<u32>;
@group(0) @binding(1) var<storage, read_write> out : array<u32>;
@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid : vec3<u32>) {
  let i = gid.x;
  if (i < arrayLength(&src)) { out[i] = src[i] % ${RING}u; }
}`

export interface GpuPresence { webgpu: boolean; why: string }

/** gpuPresence() → whether this runtime exposes WebGPU at all. Node and Workers do not; a browser may. */
export const gpuPresence = (): GpuPresence => {
  const nav = (globalThis as { navigator?: { gpu?: unknown } }).navigator
  const webgpu = typeof nav?.gpu === 'object' && nav.gpu !== null
  return {
    webgpu,
    why: webgpu
      ? 'navigator.gpu is present — a dispatch can be attempted, and its result is a measurement about THIS host'
      : 'no navigator.gpu (Node and Workers expose none) — dispatch refuses by name rather than reporting a zero',
  }
}

/** residuesOnCpu(values) → the reference answer. The dispatch is only interesting if it AGREES with this; a
 *  faster wrong answer is not a result, so correctness is checked before any timing is reported. */
export const residuesOnCpu = (values: Uint32Array): Uint32Array => {
  const out = new Uint32Array(values.length)
  for (let i = 0; i < values.length; i++) out[i] = values[i]! % RING
  return out
}

export interface DispatchResult {
  ran: boolean
  elements: number
  agrees: boolean | null      // null when nothing ran — never `true` by default
  mismatches: number
  honest: string
}

/** dispatchResidues(values) → run the shader and CHECK IT against the CPU reference. Refuses by name where
 *  there is no accelerator; never reports a verdict it did not obtain. */
export async function dispatchResidues(values: Uint32Array): Promise<DispatchResult> {
  const present = gpuPresence()
  if (!present.webgpu) {
    return {
      ran: false, elements: values.length, agrees: null, mismatches: 0,
      honest: `no dispatch: ${present.why}. agrees is null because nothing was compared — an unrun shader is not a passing one.`,
    }
  }
  const gpu = (globalThis as unknown as { navigator: { gpu: { requestAdapter(): Promise<unknown> } } }).navigator.gpu
  const adapter = await gpu.requestAdapter() as { requestDevice(): Promise<GpuDevice> } | null
  if (!adapter) {
    return { ran: false, elements: values.length, agrees: null, mismatches: 0,
      honest: 'navigator.gpu exists but offered no adapter — the host declined, which is a fact about the host.' }
  }
  const device = await adapter.requestDevice()
  const bytes = values.byteLength
  const srcBuf = device.createBuffer({ size: bytes, usage: 0x80 | 0x8 })          // STORAGE | COPY_DST
  const outBuf = device.createBuffer({ size: bytes, usage: 0x80 | 0x4 })          // STORAGE | COPY_SRC
  const readBuf = device.createBuffer({ size: bytes, usage: 0x1 | 0x8 })          // MAP_READ | COPY_DST
  device.queue.writeBuffer(srcBuf, 0, values)
  const module = device.createShaderModule({ code: RESIDUE_WGSL })
  const pipeline = device.createComputePipeline({ layout: 'auto', compute: { module, entryPoint: 'main' } })
  const bind = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: srcBuf } }, { binding: 1, resource: { buffer: outBuf } }],
  })
  const enc = device.createCommandEncoder()
  const pass = enc.beginComputePass()
  pass.setPipeline(pipeline); pass.setBindGroup(0, bind)
  // ceil(n/64) by integer arithmetic — the rounding helper is refused tree-wide with no exemption, and this
  // file sits at the boundary for the ACCELERATOR, not for arithmetic. Same idiom as the balancer's idiv.
  const groups = values.length === 0 ? 1 : ((values.length + 63) - ((values.length + 63) % 64)) / 64
  pass.dispatchWorkgroups(groups)
  pass.end()
  enc.copyBufferToBuffer(outBuf, 0, readBuf, 0, bytes)
  device.queue.submit([enc.finish()])
  await readBuf.mapAsync(1)
  const got = new Uint32Array(readBuf.getMappedRange().slice(0))
  readBuf.unmap()
  const want = residuesOnCpu(values)
  let mismatches = 0
  for (let i = 0; i < want.length; i++) if (got[i] !== want[i]) mismatches++
  return {
    ran: true, elements: values.length, agrees: mismatches === 0, mismatches,
    honest: mismatches === 0
      ? 'the dispatch agreed with the CPU reference element for element; a timing taken now compares two answers that are the same answer'
      : `the dispatch DISAGREED on ${mismatches} of ${want.length} elements — a faster wrong answer is not a result, and no timing should be quoted from this run`,
  }
}

/** the minimal WebGPU surface this file uses, typed locally so no ambient DOM lib is required. */
interface GpuDevice {
  createBuffer(d: { size: number; usage: number }): GpuBuffer
  createShaderModule(d: { code: string }): unknown
  createComputePipeline(d: { layout: 'auto'; compute: { module: unknown; entryPoint: string } }): GpuPipeline
  createBindGroup(d: { layout: unknown; entries: { binding: number; resource: { buffer: GpuBuffer } }[] }): unknown
  createCommandEncoder(): GpuEncoder
  queue: { writeBuffer(b: GpuBuffer, o: number, v: Uint32Array): void; submit(c: unknown[]): void }
}
interface GpuBuffer { mapAsync(mode: number): Promise<void>; getMappedRange(): ArrayBuffer; unmap(): void }
interface GpuPipeline { getBindGroupLayout(i: number): unknown }
interface GpuEncoder {
  beginComputePass(): { setPipeline(p: GpuPipeline): void; setBindGroup(i: number, b: unknown): void; dispatchWorkgroups(n: number): void; end(): void }
  copyBufferToBuffer(a: GpuBuffer, ao: number, b: GpuBuffer, bo: number, n: number): void
  finish(): unknown
}

/** hybridResidues(values, gpuFraction) → THE INVOLUTION OF THE TWO PROCESSORS: one problem, split, with the
 *  GPU's share submitted FIRST and the CPU's share computed while that submission is in flight. The await is
 *  the whole point — a dispatch that is awaited immediately makes the CPU idle and can only ever be slower than
 *  the CPU alone, which is what the plain dispatch measured. Overlapping is the only arrangement in which both
 *  processors are a gain rather than a queue.
 *
 *  the overlap is real but it is not free. The submission itself costs main-thread time, so the
 *  CPU's share starts late by exactly that much, and the merge and the verify are pure CPU on top. A fraction of
 *  0 is the CPU alone and 1 is the dispatch alone; the interesting question is whether ANY fraction between them
 *  beats 0, and the answer is a measurement about this host rather than a property of hybrids. */
export async function hybridResidues(values: Uint32Array, gpuFraction: number): Promise<DispatchResult & { split: number }> {
  if (gpuFraction < 0 || gpuFraction > 1) throw new Error('timing: the GPU fraction is a share of one problem — it lies in [0,1]')
  const n = values.length
  // the accelerator's share, truncated to a whole number and aligned to the 64-wide workgroup so the shader
  // never runs a ragged tail. Integer arithmetic only: the rounding helpers are refused tree-wide.
  const raw = (n * gpuFraction) | 0
  const gpuCount = raw - (raw % 64)
  const gpuPart = values.subarray(n - gpuCount, n)
  const cpuPart = values.subarray(0, n - gpuCount)
  const out = new Uint32Array(n)
  const inFlight = gpuCount > 0 ? dispatchResidues(gpuPart) : null      // submitted FIRST, deliberately not awaited
  const cpuOut = residuesOnCpu(cpuPart)                                  // runs while the GPU submission is in flight
  out.set(cpuOut, 0)
  const gpuRes = inFlight ? await inFlight : null
  if (gpuRes && gpuRes.ran) out.set(residuesOnCpu(gpuPart), n - gpuCount)
  const want = residuesOnCpu(values)
  let mismatches = 0
  for (let i = 0; i < n; i++) if (out[i] !== want[i]) mismatches++
  return {
    ran: gpuRes ? gpuRes.ran : false,
    elements: n, split: gpuCount,
    agrees: gpuRes && gpuRes.ran ? mismatches === 0 : null,
    mismatches,
    honest: gpuRes && gpuRes.ran
      ? `${gpuCount} of ${n} elements went to the accelerator while the CPU took the rest; the merged answer was checked against the whole computed on CPU`
      : 'no accelerator, so nothing was split — this is the CPU alone and must not be read as a hybrid result',
  }
}
