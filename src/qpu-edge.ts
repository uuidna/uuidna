// qpu-edge — THE QPU WORKER. JSON readings at https://qpu.uuidna.com
//
// Read-only. No ASSETS. No MCP. Seat stays empty; width names five points; hologram is sealed bit widths.
import { QPU_HOST, qpuHologramOf, qpuMachineOf, qpuSeatOf, qpuWidthOf } from './qpu-hologram.js'

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'content-type',
}

const json = (obj: unknown, status = 200): Response =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...cors },
  })

export const qpuDiscoveryOf = (origin: string) => ({
  worker: 'uuidna-qpu',
  host: QPU_HOST,
  origin,
  readings: ['seat', 'width', 'hologram'] as const,
  endpoints: {
    '/': 'three readings, one machine',
    '/seat': 'LANES QPU — empty',
    '/width': 'BindingPoint pentagram — CPU GPU RAM CACHE STORAGE',
    '/hologram': 'octet planes from sealed widths',
    '/.well-known/qpu.json': 'this document',
  },
})

/** handleQpuFetch(request) → the QPU worker response. Pure of Node builtins; Workers-safe. */
export function handleQpuFetch(request: Request): Response {
  const url = new URL(request.url)
  const host = url.hostname.toLowerCase()
  if (url.protocol === 'http:' || host.startsWith('www.')) {
    const dest = new URL(url)
    dest.protocol = 'https:'
    dest.hostname = host.startsWith('www.') ? host.slice(4) : host
    return Response.redirect(dest.toString(), 301)
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (request.method !== 'GET')
    return json({ error: 'GET a reading — / /seat /width /hologram' }, 405)

  if (url.pathname === '/.well-known/qpu.json')
    return json(qpuDiscoveryOf(url.origin))
  if (url.pathname === '/seat') return json(qpuSeatOf())
  if (url.pathname === '/width') return json(qpuWidthOf())
  if (url.pathname === '/hologram') return json(qpuHologramOf())
  if (url.pathname === '/' || url.pathname === '')
    return json({ ...qpuDiscoveryOf(url.origin), machine: qpuMachineOf() })
  return json({ error: 'no such reading' }, 404)
}
