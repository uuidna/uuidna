import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRegistryOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ApiFormulas } from './index.js'

/** The web interface's arithmetic — pagination, rate windows, backoff, status class, quota, payload, methods, offset. */
test('api: pages, window, backoff, statusClass, remaining, payload, methods, offset', async (t) => {
  // `api` is a contested family (the api-door registers to it too); complete the registry before minting so the hex
  // nibbles are stable and a minted program decodes to the same formula it was minted from.
  await hexRegistryOf()
  assert.equal(ApiFormulas.pages(101, 20).value, 6, '101 rows, 20 a page')
  assert.equal(ApiFormulas.pages(100, 0).value, 0, 'no page size, no divide')
  assert.equal(ApiFormulas.window(600, 60).value, 10, '600 a minute is 10 a second')
  assert.equal(ApiFormulas.backoff(100, 4).value, 1600, '100ms doubled four times')
  assert.equal(ApiFormulas.statusClass(404).value, 4, '4xx')
  assert.equal(ApiFormulas.remaining(1000, 999).value, 1, 'quota left')
  assert.equal(ApiFormulas.remaining(1000, 2000).value, 0, 'overspent, floored')
  assert.equal(ApiFormulas.payload(12, 64).value, 768, '12 fields of 64 bytes')
  assert.equal(ApiFormulas.methods(4).value, 16, '2^4 method subsets')
  assert.equal(ApiFormulas.offset(5, 20).value, 100, 'page 5 at 20 a page')
  assert.equal(ApiFormulas.ratelimit(600, 60).value, 10, '600 requests over 60s')
  assert.equal(ApiFormulas.quota(1000, 400).value, 600, '1000 limit less 400 used')
  assert.equal(ApiFormulas.pagesize(101, 20).value, 6, '101 rows into pages of 20')
  assert.equal(ApiFormulas.latency(4, 25).value, 100, '4 hops of 25 each')
  assert.equal(ApiFormulas.retries(3).value, 2, '3 attempts, 2 retries left')
  // api's own 13 formulas; the contested registry caps the family at 15 (the api-door registers two more to the nibble).
  assert.equal(hexFamiliesOf().get('api')?.length, 15)
  // run a program through hex and confirm it equals the direct formula — self-consistent, so it holds whatever the
  // contested registry orders the nibbles as (comparing to a hardcoded number would break when the order shifts).
  const direct = (name: 'pagesize' | 'latency' | 'quota', ...p: number[]) => Number(ApiFormulas[name](...(p as [number, number])).value)
  for (const [name, params] of [['pagesize', [101, 20]], ['latency', [4, 25]], ['quota', [1000, 400]]] as ['pagesize' | 'latency' | 'quota', number[]][]) {
    const uuid = qpuHexUuidOf({ family: 'api', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), direct(name, ...params), `api.${name} at ${uuid}`)
    uuidReceiptOf(`api ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('13 own formulas (15 with the api-door); pagesize 101/20=6, latency 100, quota 600, retries 2; crossing to software')
})
