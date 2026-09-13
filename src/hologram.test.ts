import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HOLOGRAM_HOSTS, hologramLattice, harnessRecipesOf, isHologramHost } from './hologram-lattice.js'
import { fanoutRequestOf, hologramFanout } from './hologram-fanout.js'
import { callTool } from './mcp.js'

// THE FRACTAL HOLOGRAM: four hosts, each naming the other three, each with the eight harness recipes computed from its
// name; the fan-out builds a request only for a listed host and fetches nothing for any other.
test('the hologram lattice is four hosts, fractal, with eight recipes each', () => {
  const h = hologramLattice()
  assert.equal(h.holds, true)
  assert.deepEqual(h.hosts.map((x) => x.host), ['uuidna.com', 'qpu.uuidna.com', 'lean.uuidna.com', 'unreal.uuidna.com'])
  for (const host of h.hosts) {
    assert.equal(host.mcp, `https://${host.host}/mcp`)
    assert.equal(host.recipes.length, 8)
    assert.equal(host.names.length, 3)
  }
  assert.equal(harnessRecipesOf('qpu.uuidna.com')[0]!.how, 'claude mcp add --transport http uuidna-qpu https://qpu.uuidna.com/mcp')
  assert.deepEqual(hologramLattice(), h)
  assert.deepEqual(callTool('uuidna_hologram', {}), h)
})

test('fanout builds a request only for a hologram host and refuses any other by name', async () => {
  assert.equal(isHologramHost('qpu.uuidna.com'), true)
  assert.equal(isHologramHost('evil.example'), false)
  const r = fanoutRequestOf({ host: 'lean.uuidna.com', method: 'tools/call', name: 'qpu_seat' })
  assert.equal(r.url, 'https://lean.uuidna.com/mcp')
  assert.equal(JSON.parse(r.body).params.name, 'qpu_seat')
  assert.throws(() => fanoutRequestOf({ host: 'evil.example' }), /host must be one of the hologram hosts/)
  let fetched = 0
  const fake: typeof fetch = async (url) => { fetched += 1; return new Response(JSON.stringify({ jsonrpc: '2.0', id: 1, result: { echo: String(url) } }), { status: 200 }) }
  const out = (await hologramFanout({ host: 'qpu.uuidna.com', method: 'tools/list' }, fake)) as { status: number; reply: { result: { echo: string } } }
  assert.equal(fetched, 1)
  assert.equal(out.status, 200)
  assert.equal(out.reply.result.echo, 'https://qpu.uuidna.com/mcp')
  await assert.rejects(hologramFanout({ host: 'evil.example' }, fake), /nothing was fetched/)
  await assert.rejects(Promise.resolve().then(() => callTool('uuidna_fanout', { host: 'evil.example' })), /nothing was fetched/)
  assert.equal(fetched, 1)
  assert.equal(HOLOGRAM_HOSTS.length, 4)
})
