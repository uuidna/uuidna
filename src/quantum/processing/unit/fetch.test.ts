import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getOf } from '../../../mcp/qpu-fused.js'

// THE DATA DOOR'S FETCH RETRIES A TRANSIENT FAILURE, NOT A SETTLED ONE. A 5xx, a 429 (rate limit) or a dropped
// connection is a blip the next attempt may clear, so getOf retries it a few times with a short backoff within one
// deadline; a flaky public source no longer fails a whole lead feed. A 4xx below 429 is the client's own and fails
// fast — a real 404 is not worth another attempt. The fetch is stubbed so the contract is exercised without a network.
const probe = async (impl: (attempt: number) => Response): Promise<{ calls: number; status: number; threw: string }> => {
  const original = globalThis.fetch
  let calls = 0
  globalThis.fetch = (async () => impl(++calls)) as unknown as typeof fetch
  try {
    const r = await getOf('https://example.test/x')
    return { calls, status: r.status, threw: '' }
  } catch (e) {
    return { calls, status: 0, threw: (e as Error).message }
  } finally {
    globalThis.fetch = original
  }
}

test('data fetch retries a transient 503 then succeeds', async () => {
  const r = await probe((n) => new Response('{}', { status: n < 3 ? 503 : 200 }))
  assert.equal(r.status, 200, 'the retry cleared the 503')
  assert.equal(r.calls, 3, 'two retries after the first attempt')
})

test('data fetch retries a 429 rate limit then succeeds', async () => {
  const r = await probe((n) => new Response('{}', { status: n < 2 ? 429 : 200 }))
  assert.equal(r.status, 200, 'the rate limit was retried')
})

test('data fetch does not retry a settled 404', async () => {
  const r = await probe(() => new Response('no', { status: 404 }))
  assert.match(r.threw, /answered 404/, 'the 404 surfaced')
  assert.equal(r.calls, 1, 'a settled 4xx is not retried')
})

test('data fetch retries a dropped connection then succeeds', async () => {
  const r = await probe((n) => {
    if (n < 2) throw new Error('fetch failed')
    return new Response('{}', { status: 200 })
  })
  assert.equal(r.status, 200, 'the network blip was retried')
  assert.equal(r.calls, 2, 'one retry after the dropped connection')
})
