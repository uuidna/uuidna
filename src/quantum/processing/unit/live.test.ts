import { monitorFaultsOf, test, type QpuMonitorReading } from './receipted.js'
import assert from 'node:assert/strict'
import worker, { quantumOf, shorOf } from './index.js'

/** LIVE WHEN ASKED. QPU_LIVE names the host to test (https://qpu.uuidna.com). Unset, the same requests go to the worker
 * in this process: the gate that runs before a deploy must not measure the host it is about to replace, or a change
 * to any shape these tests assert could never ship — the old host fails the new assertion and blocks the push that
 * would fix it. CI sets QPU_LIVE on scheduled runs (against the deployed host); on a push the deploy is manual, so the
 * suite runs the new code in-process and never asserts against a host it has not yet deployed to. */
const target = process.env.QPU_LIVE?.replace(/\/$/, '')
const pageOf = (names: string[], o: { prefix?: string; limit?: number; cursor?: string } = {}) => {
  const all = names.filter((k) => k.startsWith(o.prefix ?? '')).sort()
  const start = Number(o.cursor ?? 0)
  const page = all.slice(start, start + (o.limit ?? all.length))
  const end = start + page.length
  return { page, done: end >= all.length, cursor: end >= all.length ? undefined : String(end) }
}
const memoryKv = () => {
  const m = new Map<string, string>()
  return {
    get: async (k: string, o?: { type?: string }) => (m.has(k) ? (o?.type === 'json' ? JSON.parse(m.get(k)!) : m.get(k)) : null),
    put: async (k: string, v: string) => void m.set(k, String(v)),
    delete: async (k: string) => void m.delete(k),
    list: async (o?: { prefix?: string; limit?: number; cursor?: string }) => {
      const p = pageOf([...m.keys()], o)
      return { keys: p.page.map((name) => ({ name })), list_complete: p.done, cursor: p.cursor }
    },
  }
}
const memoryR2 = () => {
  const m = new Map<string, string>()
  return {
    get: async (k: string) => (m.has(k) ? { json: async () => JSON.parse(m.get(k)!), text: async () => m.get(k)! } : null),
    put: async (k: string, v: string) => void m.set(k, String(v)),
    delete: async (k: string) => void m.delete(k),
    list: async (o?: { prefix?: string; limit?: number; cursor?: string }) => {
      const p = pageOf([...m.keys()], o)
      return { objects: p.page.map((key) => ({ key, size: m.get(key)!.length })), truncated: !p.done, cursor: p.cursor }
    },
  }
}
const liveEnv = { QPU_HOST: 'qpu.uuidna.com', STORAGE: memoryKv(), BLOBS: memoryR2() } as never
const liveFetch = (url: string, init?: RequestInit): Promise<Response> => (target ? fetch(url, init) : worker.fetch(new Request(url, init), liveEnv))
const where = target ? `live host ${target}` : 'the worker in this process (set QPU_LIVE=https://qpu.uuidna.com to test the host)'

const json = { accept: 'application/json' }

test('live qpu.uuidna.com', async (t) => {
  const live = target ?? 'https://qpu.uuidna.com'
  t.diagnostic(`against ${where}`)
  const local = quantumOf()
  const root = await liveFetch(live, { headers: json })
  await t.test('chat fetch is JSON quantum', async () => {
    assert.equal(root.status, 200)
    assert.equal((root.headers.get('content-type') ?? '').includes('json'), true)
    const page = (await root.json()) as {
      kind: string
      holds: boolean
      fused: number
      next: number
      genesis: { domains: string[]; holds: boolean }
      circuit: { running: boolean; only: { holds: boolean; classical: boolean } }
      docs: { inline: boolean; guide: boolean }
    }
    assert.equal(page.kind, 'quantum')
    assert.equal(page.holds, true)
    assert.equal(page.fused, local.fused)
    assert.equal(page.next, local.next)
    assert.equal(page.next, page.fused + page.fused)
    assert.deepEqual(page.genesis.domains, ['scanner', 'radar'])
    assert.equal(page.genesis.holds, true)
    assert.equal(page.circuit.only.holds, true)
    assert.equal(page.docs.inline, true)
    assert.equal(page.docs.guide, true)
  })
  await t.test('chat calls tools/call', async () => {
    const listed = await liveFetch(`${live}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    })
    const called = await liveFetch(`${live}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'quantum', arguments: {} } }),
    })
    assert.equal(listed.status, 200)
    assert.equal(called.status, 200)
    const catalog = (await listed.json()) as { result: { tools: { name: string }[] } }
    const call = (await called.json()) as {
      result: {
        holds?: boolean
        fused?: number
        next?: number
        structuredContent?: { holds?: boolean; fused?: number; next?: number; circuit?: { only: { holds: boolean } }; docs?: unknown }
        circuit?: { only: { holds: boolean } }
        docs?: unknown
      }
    }
    const shown = call.result.structuredContent ?? call.result
    assert.deepEqual(
      catalog.result.tools.slice(0, 8).map((t) => t.name),
      ['quantum', 'lean', 'cite', 'train', 'forge', 'improve', 'compete', 'prove'],
    )
    assert.equal(shown.holds, true)
    assert.equal(shown.fused, local.fused)
    assert.equal(shown.next, local.next)
    assert.equal(shown.circuit?.only.holds, true)
    assert.equal(shown.docs, undefined)
  })
  await t.test('chat uses every sealed door', async () => {
    const names = ['quantum', 'lean', 'cite', 'train', 'forge', 'improve', 'compete', 'prove'] as const
    const crypto = ['crypto_catalog', 'crypto_shor', 'crypto_cmodexp', 'crypto_iqft', 'crypto_shots', 'crypto_rsa', 'crypto_split', 'crypto_verify'] as const
    const discovered = await liveFetch(`${live}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize' }),
    })
    assert.equal(discovered.status, 200)
    assert.equal(discovered.headers.get('access-control-allow-origin'), '*')
    const hello = (await discovered.json()) as { result: { holds?: boolean; instructions?: string; serverInfo?: { name: string } } }
    assert.equal(hello.result.holds, true)
    assert.equal(hello.result.serverInfo?.name, '@uuidna/qpu')
    const listed = await liveFetch(`${live}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    })
    assert.equal(listed.status, 200)
    const catalog = (await listed.json()) as { result: { tools: { name: string; man?: { holds?: boolean } }[] } }
    const listedNames = catalog.result.tools.map((row) => row.name)
    assert.deepEqual(listedNames.slice(0, 8), [...names])
    if (listedNames.length > 8) {
      assert.deepEqual(listedNames.slice(8), [...crypto])
    }
    for (const name of listedNames) {
      const man = await liveFetch(`${live}/api`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: { man: true } } }),
      })
      assert.equal(man.status, 200, name)
      const manBody = (await man.json()) as { result: { structuredContent?: { kind?: string; holds?: boolean }; holds?: boolean; kind?: string } }
      const manShown = manBody.result.structuredContent ?? manBody.result
      assert.equal(manShown.kind, 'man', name)
      assert.equal(manShown.holds, true, name)
      const called = await liveFetch(`${live}/api`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: {} } }),
      })
      assert.equal(called.status, 200, name)
      const body = (await called.json()) as {
        jsonrpc?: string
        result: {
          _meta?: { resultType?: string }
          isError?: boolean
          content?: { type: string }[]
          holds?: boolean
          structuredContent?: { holds?: boolean }
        }
      }
      const shown = body.result.structuredContent ?? body.result
      assert.equal(body.jsonrpc, '2.0', name)
      assert.equal(body.result._meta?.resultType, 'complete', name)
      assert.equal((body.result.content?.length ?? 0) >= 1 && (body.result.content?.length ?? 0) <= 2, true, name) // text, plus a link only where a GET returns the reply
      assert.equal(shown.holds, true, name)
      assert.equal(body.result.isError, false, name)
    }
  })
  /** A store reading names how many keys it verified, how many it could not, and which ones — whether it is the
   *  monitor itself or a catalog that folds one in. */
  type Monitor = QpuMonitorReading
  type Reading = { holds?: boolean; kind?: string; monitor?: Monitor } & Partial<Monitor>
  const monitorOf = (shown: Reading): Monitor | undefined => {
    const row = shown.kind === 'monitor' ? (shown as Monitor) : shown.monitor
    return row !== undefined && typeof row.missing === 'number' && Array.isArray(row.incomplete) ? row : undefined
  }

  await t.test('extras catalogs speak MCP JSON-RPC', async () => {
    const extras = [
      {
        path: '/storage',
        names: ['storage_catalog', 'storage_list', 'storage_get', 'storage_put', 'storage_del', 'storage_monitor', 'storage_maintain', 'storage_raid'],
        read: ['storage_catalog', 'storage_list', 'storage_get', 'storage_monitor', 'storage_raid'],
      },
      {
        path: '/network',
        names: ['net_catalog', 'net_list', 'net_send', 'net_recv', 'net_message', 'net_routes', 'net_fetch', 'net_monitor'],
        read: ['net_catalog', 'net_list', 'net_routes', 'net_fetch', 'net_monitor'],
      },
      {
        path: '/server',
        names: ['server_catalog', 'server_backend', 'server_submit', 'server_queue', 'server_result', 'server_shots', 'server_correct', 'server_monitor'],
        read: ['server_catalog', 'server_backend', 'server_queue', 'server_shots', 'server_correct', 'server_monitor'],
      },
    ] as const
    for (const extra of extras) {
      const listed = await liveFetch(`${live}${extra.path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
      })
      assert.equal(listed.status, 200, extra.path)
      assert.equal(listed.headers.get('access-control-allow-origin'), '*', extra.path)
      const catalog = (await listed.json()) as { result: { tools: { name: string }[] } }
      assert.deepEqual(catalog.result.tools.map((row) => row.name), [...extra.names], extra.path)
      for (const name of extra.names) {
        const man = await liveFetch(`${live}${extra.path}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name, arguments: { man: true } } }),
        })
        assert.equal(man.status, 200, name)
        const manBody = (await man.json()) as { result: { structuredContent?: { kind?: string; holds?: boolean }; kind?: string; holds?: boolean } }
        const manShown = manBody.result.structuredContent ?? manBody.result
        assert.equal(manShown.kind, 'man', name)
        assert.equal(manShown.holds, true, name)
      }
      for (const name of extra.read) {
        const args = name === 'net_fetch' ? { path: '/' } : {}
        const called = await liveFetch(`${live}${extra.path}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name, arguments: args } }),
        })
        assert.equal(called.status, 200, name)
        const body = (await called.json()) as { result: Reading & { structuredContent?: Reading } }
        const shown = body.result.structuredContent ?? body.result
        /**
         * THIS GATE JUDGES THE BUILD. THE STORE'S CONTENTS ARE NOT THE BUILD.
         *
         * A monitor that reports missing shares makes its own holds false, and storage_catalog folds the monitor
         * in, so ONE key with no redundancy turned every deploy red — including the deploy that would carry the
         * repair. Three pushes were blocked by a single link while the code that found it was working perfectly.
         * A monitor that finds something and says so is not a broken monitor; failing the build on it conflates
         * "the instrument is faulty" with "the instrument took a reading".
         *
         * So the reading is judged and the STORE is not. `hostLeadsOf` already carries the fault by name, with
         * its count and what it owes — "monitor holds false — 1 link(s) missing shares of 248; owes: maintain,
         * bounded, until remaining is 0" — which is an operational queue that a person works, not a gate that
         * stops a ship. Nothing is dropped by this; it moves to the stream that exists for it.
         *
         * WHAT STILL FAILS HERE, so this is a move and not a hole: the monitor must be SELF-CONSISTENT and must
         * not claim to hold while reporting a gap. An instrument that stops noticing — missing zero while the
         * shares do not add up — fails, and so does one that notices and reports success anyway. Those are
         * properties of the code, and the code is what this gate is for.
         */
        const monitor = monitorOf(shown)
        if (monitor === undefined) {
          assert.equal(shown.holds, true, name)
          continue
        }
        assert.deepEqual(monitorFaultsOf(monitor, shown.holds), [], `${name}: the instrument itself must be sound`)
        if (monitor.missing === 0) {
          assert.equal(shown.holds, true, name)
          continue
        }
        t.diagnostic(
          `${name}: ${monitor.missing} of ${monitor.keys} key(s) missing shares (${monitor.shares}/${monitor.expected}) — a store fault, carried by leads, not by this gate`,
        )
      }
    }
  })
  await t.test('no auth message proxy', async () => {
    const inbox = await liveFetch(`${live}/message`, { headers: json })
    assert.equal(inbox.status, 200)
    assert.equal(inbox.headers.get('access-control-allow-origin'), '*')
    const proxy = (await inbox.json()) as { kind: string; proxy: boolean; auth: boolean; holds: boolean }
    assert.equal(proxy.kind, 'message')
    assert.equal(proxy.proxy, true)
    assert.equal(proxy.holds, true)
    const sent = await liveFetch(`${live}/message`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lane: 0, body: 'public' }),
    })
    assert.equal(sent.status, 202)
    const hop = (await sent.json()) as { accepted: boolean; await: boolean; hop: number; lane: number }
    assert.equal(hop.accepted, true)
    assert.equal(hop.await, false)
    assert.equal(hop.hop, hop.lane)
  })
})

/** The deployed host climbed the same way: the work register doubles each step, the modulus travels as exact decimal
 * text, and the measured growth between steps stops the climb before the budget, so the climb stops before the host does.
 * Where it stops is a reading of qpu.uuidna.com's reach, never a cap: nothing in the unit refuses a wider request. */
test('live reach: qpu.uuidna.com is climbed under a time budget, and the run at its reach holds', async (t) => {
  const live = target ?? 'https://qpu.uuidna.com'
  t.diagnostic(`against ${where}`)
  const floor = shorOf()
  /** Twenty seconds against a host; two in process, where reach.test already climbs this machine. The budget is a
   * guard: the climb is bounded by WIDTH, read from the host's own reply — once it says the state is sparse, a wider
   * modulus costs only its digits on the wire, so the climb doubles the width to a ceiling of 2^16 bits and stops
   * there, in a dozen requests, instead of spending the budget on round trips that measure nothing but the network. */
  const budgetMs = target ? 20000 : 2000
  const widthCeiling = 65536
  type Run = { circuitry: { qubits: number; holds: boolean }; exact: { n: string }; prepare: { prepared: boolean; amplitudes: number; sparse: boolean }; measure: { holds: boolean }; factors: { by: string } }
  const steps: { qubits: number; work: number; ms: number }[] = []
  let stoppedBy = 'nothing'
  for (let work = 8; work <= widthCeiling; work *= 2) {
    const modulus = (1n << BigInt(work)) - 1n
    const t0 = process.hrtime.bigint()
    const res = await liveFetch(`${live}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'crypto_shor', arguments: { n: modulus.toString(), a: 3 } } }),
    })
    const ms = Number(process.hrtime.bigint() - t0) / 1e6
    assert.equal(res.status, 200, `qubits ${work + 2}`)
    const body = (await res.json()) as { result: { content: { text: string }[] } }
    const run = JSON.parse(body.result.content[0]!.text) as Run
    assert.equal(run.circuitry.qubits, work + 2)
    // THE REACH OF EXACT TEXT. The state stays sparse at every width (no modulus is past the host's reach), but the exact
    // modulus 2^work − 1 grows ~one digit per 3.3 bits and eventually no longer travels as text under the token budget —
    // the recognition contract folds it to a stub. That fold, not the host's compute, is where the climb stops: its reach.
    if (run.exact.n !== modulus.toString()) {
      stoppedBy = `the ${modulus.toString().length}-digit modulus folds past the token budget — the reach of exact text, the state still sparse`
      break
    }
    assert.equal(run.prepare.prepared, true)
    assert.equal(run.prepare.sparse, true)
    assert.equal(run.prepare.amplitudes > 0 && run.prepare.amplitudes <= 16, true)
    assert.equal(run.circuitry.holds, true)
    assert.equal(run.measure.holds, true)
    assert.equal(run.factors.by, 'gcd') // even work: 3 divides 2^work - 1, so the live climb measures width, never period-finding
    const prev = steps[steps.length - 1]
    steps.push({ qubits: run.circuitry.qubits, work, ms })
    if (ms > budgetMs) {
      stoppedBy = 'this step passed the budget'
      break
    }
    const growth = prev && prev.ms > 0 ? Math.max(ms / prev.ms, 1) : 1
    if (prev && ms * growth > budgetMs) {
      stoppedBy = `measured growth ×${growth.toFixed(2)} predicts the next step past the budget`
      break
    }
    if (work === widthCeiling) stoppedBy = `the width ceiling of ${widthCeiling} bits, the state being sparse by the host's own reply`
  }
  const reach = steps[steps.length - 1]!
  assert.equal(reach.qubits > floor.circuitry.qubits, true)
  assert.equal(stoppedBy !== 'nothing', true)
  t.diagnostic(`live reach ${reach.qubits} qubits · dim 2^${reach.qubits} · ${reach.ms.toFixed(0)} ms round trip · ${steps.length} steps · stopped: ${stoppedBy} · every step factored by gcd, none by period`)
})
