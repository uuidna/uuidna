// @non-harmonic: reverse fetch of the four named hologram hosts — NAMED boundary (like qpu-edge / wave-run).
//
// hologram-fanout — ONE CALL, FANNED OUT TO ONE NAMED HOST. The hologram lattice (hologram-lattice.ts) is pure; this is
// its network half: a JSON-RPC message forwarded to uuidna.com, qpu.uuidna.com, lean.uuidna.com, or unreal.uuidna.com
// and the reply returned as received. The host is checked against the lattice BEFORE any request is built — an
// unlisted host is refused by name and nothing is fetched. No header is forwarded; the four hosts read without auth.
import { isHologramHost, mcpUrlOf } from './hologram-lattice.js'

export type FanoutInput = { host?: unknown; method?: unknown; name?: unknown; arguments?: unknown; id?: unknown }

export const fanoutRequestOf = (a: FanoutInput): { url: string; body: string } => {
  if (!isHologramHost(a.host)) throw new Error(`uuidna_fanout: host must be one of the hologram hosts — got ${JSON.stringify(a.host)}; nothing was fetched`)
  const method = typeof a.method === 'string' && a.method.length > 0 ? a.method : 'tools/list'
  const params = method === 'tools/call'
    ? { name: String(a.name ?? ''), arguments: a.arguments && typeof a.arguments === 'object' ? a.arguments : {} }
    : method === 'initialize'
      ? { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'uuidna-hologram', version: '1' } }
      : {}
  return { url: mcpUrlOf(a.host), body: JSON.stringify({ jsonrpc: '2.0', id: a.id ?? 1, method, params }) }
}

export const hologramFanout = async (a: FanoutInput, fetchImpl: typeof fetch = fetch): Promise<unknown> => {
  const { url, body } = fanoutRequestOf(a)
  const res = await fetchImpl(url, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body })
  const text = await res.text()
  let reply: unknown
  try { reply = JSON.parse(text) } catch { reply = { error: 'the host answered non-JSON', text: text.slice(0, 400) } }
  return { kind: 'fanout', host: a.host, url, status: res.status, reply }
}
