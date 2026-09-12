// gpu-dispatch — drive THIS repository's own GPU module on a real device, and let the CPU reference judge it.
// Node and Cloudflare Workers expose no navigator.gpu, so the repository's own tests exercise the REFUSAL path;
// this instrument exists because a runtime that does expose one can finally answer the other half:
//     deno run --allow-all --unstable-webgpu tools/gpu-dispatch.ts
// Measured 2026-09-13, Apple M1 Max, 32 GPU cores, Deno 2.8.1: ran true, 65536 elements, agrees true, 0 mismatches;
// hybrid at 0.5 split ran true, 32768 on the device, agrees true, 0 mismatches. Correctness only — a timing taken
// while another run holds the host is not a reading.
// Drive THIS REPOSITORY'S OWN GPU module on a real device. The module says nothing in it has ever run on a GPU here,
// because Node and Workers expose no binding. Deno does. Correctness only: no timing is claimed under a busy host.
import { dispatchResidues, hybridResidues, gpuPresence, residuesOnCpu } from '../dist/os/gpu/index.js'
console.log('presence:', JSON.stringify(gpuPresence()))
const N = 65536
const values = new Uint32Array(N)
for (let i = 0; i < N; i++) values[i] = (i * 2654435761) >>> 0
const cpu = residuesOnCpu(values)
console.log('cpu reference computed:', cpu.length, 'residues; first four', Array.from(cpu.slice(0, 4)).join(','))
const d = await dispatchResidues(values)
console.log('dispatch:', JSON.stringify({ ran: d.ran, elements: d.elements, agrees: d.agrees, mismatches: d.mismatches }))
console.log('honest:', String(d.honest).slice(0, 160))
const h = await hybridResidues(values, 0.5)
console.log('hybrid 0.5:', JSON.stringify({ ran: h.ran, split: h.split, agrees: h.agrees, mismatches: h.mismatches }))
