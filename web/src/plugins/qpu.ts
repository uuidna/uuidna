import type { Config, Endpoint, Plugin } from 'payload'
import { feeds, type FeedRates } from '@uuidna/qpu/feeds'

const rates = (): FeedRates | null => {
  try {
    return process.env.QPU_RATES ? (JSON.parse(process.env.QPU_RATES) as FeedRates) : null
  } catch {
    return null
  }
}

const door: Endpoint = {
  path: '/qpu/feeds',
  method: 'get',
  handler: async (req) => {
    const q = req.url ? new URL(req.url, 'http://local').searchParams : null
    const combinations = q?.get('combinations') === '1'
    const limitRaw = q?.get('combinationLimit')
    return Response.json(
      feeds({
        rates: rates(),
        combinations,
        combinationLimit: combinations ? (limitRaw ? Math.min(512, Math.max(0, Number(limitRaw) || 0)) : 32) : 0,
        google: q?.get('google') === '1',
        repos: q?.get('repos') === '1',
      }),
      { headers: { 'cache-control': 'public, max-age=60', 'x-qpu-feed': 'products-variants' } },
    )
  },
}

/** GET /api/qpu/feeds — payload { feeds } document for ecommerce seed. */
export default (o: { enabled?: boolean; feeds?: boolean } = {}): Plugin => (c: Config): Config =>
  o.enabled === false
    ? c
    : {
        ...c,
        endpoints: [
          ...(c.endpoints ?? []).filter((e) => !(e.path === '/qpu/feeds' && e.method === 'get')),
          ...(o.feeds === false ? [] : [door]),
        ],
      }
