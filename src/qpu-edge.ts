// qpu-edge — REVERSE FETCH OF THE LIVE QPU. uuidna does not impersonate qpu.uuidna.com.
// GET a path here, GET the same path there. JSON-LD. No auth. CORS already sits on QPU.
import { QPU_HOST, QPU_HREF, qpuCircuitOf, qpuMachineOf, qpuReverseHrefOf } from './qpu-hologram.js'

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
}

const json = (obj: unknown, status = 200): Response =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/ld+json; charset=utf-8', ...cors },
  })

export const qpuDiscoveryOf = (origin: string) => ({
  worker: 'uuidna-qpu-reverse',
  host: QPU_HOST,
  origin,
  href: QPU_HREF,
  reverse: true as const,
  readings: ['circuit'] as const,
  endpoints: {
    '/': QPU_HREF,
    '/mcp': qpuReverseHrefOf('/mcp'),
    '/storage': qpuReverseHrefOf('/storage'),
    '/.well-known/qpu.json': 'this document — points at the live circuit',
  },
  circuit: qpuCircuitOf(),
})

/** handleQpuFetch(request) → reverse GET of https://qpu.uuidna.com. Pure of Node builtins; Workers-safe. */
export async function handleQpuFetch(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const host = url.hostname.toLowerCase()
  if (url.protocol === 'http:' || host.startsWith('www.')) {
    const dest = new URL(url)
    dest.protocol = 'https:'
    dest.hostname = host.startsWith('www.') ? host.slice(4) : host
    return Response.redirect(dest.toString(), 301)
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (url.pathname === '/.well-known/qpu.json') return json(qpuDiscoveryOf(url.origin))
  const dest = qpuReverseHrefOf(`${url.pathname}${url.search}`)
  if (request.method !== 'GET') return json({ error: 'GET the live circuit', href: dest }, 405)
  const res = await fetch(dest, { headers: { accept: 'application/ld+json, application/json' } })
  const type = res.headers.get('content-type') ?? 'application/ld+json; charset=utf-8'
  return new Response(res.body, { status: res.status, headers: { 'content-type': type, ...cors } })
}

export const qpuEdgeOf = () => ({
  kind: 'edge' as const,
  reverse: true as const,
  host: QPU_HOST,
  href: QPU_HREF,
  machine: qpuMachineOf(),
  holds: qpuCircuitOf().holds === true,
})
