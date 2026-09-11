import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_HOST, QPU_HREF, qpuCircuitOf, qpuMachineOf, qpuReverseHrefOf, qpuSeatOf } from './qpu-hologram.js'
import { handleQpuFetch, qpuDiscoveryOf, qpuEdgeOf } from './qpu-edge.js'

test('uuidna reverse-hops to live QPU and keeps the classical seat empty', () => {
  const circuit = qpuCircuitOf()
  const seat = qpuSeatOf()
  const edge = qpuEdgeOf()
  const machine = qpuMachineOf()
  assert.equal(QPU_HOST, 'qpu.uuidna.com')
  assert.equal(QPU_HREF, 'https://qpu.uuidna.com')
  assert.equal(qpuReverseHrefOf('/storage'), 'https://qpu.uuidna.com/storage')
  assert.equal(qpuReverseHrefOf('mcp'), 'https://qpu.uuidna.com/mcp')
  assert.equal(seat.seat, 'empty')
  assert.equal(seat.host, 'uuidna')
  assert.equal(circuit.host, QPU_HOST)
  assert.equal(circuit.attributed, 'qpu.uuidna.com')
  assert.equal(circuit.theorem, 'quantum')
  assert.equal(circuit.bits, 32)
  assert.equal(circuit.amplitudes, 4294967296)
  assert.equal(circuit.kv.added, circuit.amplitudes)
  assert.equal(circuit.kv.amplitudes, circuit.amplitudes + circuit.amplitudes)
  assert.equal(circuit.faces, 14)
  assert.equal(circuit.fused, 120259084288)
  assert.equal(circuit.next, circuit.fused + circuit.fused)
  assert.equal(circuit.hz, 432)
  assert.equal(circuit.holds, true)
  assert.equal(edge.reverse, true)
  assert.equal(edge.holds, true)
  assert.equal(machine.reverse, true)
  assert.equal(qpuDiscoveryOf('https://uuidna.com').href, QPU_HREF)
})

test('reverse discovery names qpu.uuidna.com', async () => {
  const res = await handleQpuFetch(new Request('https://uuidna.com/.well-known/qpu.json'))
  assert.equal(res.status, 200)
  const body = (await res.json()) as { reverse: boolean; href: string; host: string }
  assert.equal(body.reverse, true)
  assert.equal(body.href, 'https://qpu.uuidna.com')
  assert.equal(body.host, 'qpu.uuidna.com')
})

test('live QPU still answers JSON', async () => {
  const res = await fetch('https://qpu.uuidna.com/', { headers: { accept: 'application/ld+json, application/json' } })
  assert.equal(res.status, 200)
  assert.equal((res.headers.get('content-type') ?? '').includes('json'), true)
  const page = (await res.json()) as { kind?: string; fused?: number; host?: string }
  assert.equal(page.kind, 'quantum')
  assert.equal(page.host, 'qpu.uuidna.com')
})
