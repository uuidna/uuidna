// @non-harmonic: fetch to the hosted MCP door (tools/call). The mill is on uuidna.com; this leaf only unwraps JSON-RPC.
// quantum/advantage/mcp/wire — THE HOSTED DOOR. Fetch tools/call on uuidna.com/mcp (or same-origin /mcp
// on a licensed host). No OS, no catalogue, no theorems: verify_beats_recompute_by_magnitudes is the axis.

export const AGENT_ORIGIN = 'https://uuidna.com'
export const AGENT_MCP_PATH = '/mcp'
export const ADVANTAGE_MCP_ORIGIN = AGENT_ORIGIN + AGENT_MCP_PATH

/** hostedMcpUrl() → the wire an external agent uses. Same-origin /mcp on a licensed uuidna host; uuidna.com from anywhere else. */
export function hostedMcpUrl(): string {
  if (typeof location !== 'undefined' && /\.?uuidna\.(com|net|org)$/.test(location.hostname))
    return `${location.origin}${AGENT_MCP_PATH}`
  return AGENT_ORIGIN + AGENT_MCP_PATH
}

/** toolsCall(name, args) → JSON-RPC 2.0 tools/call. */
export function toolsCall(name: string, args: Record<string, unknown> = {}, id = 1): object {
  return { jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } }
}

/** resultText(rpcResult) → the text blocks of a tools/call result. Copied here so the monitor does not import the terminal (OS). */
export function resultText(result: unknown): string {
  const r = result as { result?: { content?: { type?: string; text?: string }[] }; error?: { message?: string } }
  if (r?.error?.message) return '✗ ' + r.error.message
  const blocks = r?.result?.content
  if (Array.isArray(blocks) && blocks.length)
    return blocks.map((b) => (b?.type === 'text' && typeof b.text === 'string' ? b.text : JSON.stringify(b))).join('\n')
  return JSON.stringify(result)
}

/** payloadOf(raw) → parse the first JSON text block, else the raw RPC body. */
export function payloadOf(raw: unknown): unknown {
  const text = resultText(raw)
  const first = text.split('\n')[0] ?? ''
  if (first.startsWith('{') || first.startsWith('[')) {
    try { return JSON.parse(first) } catch { return raw }
  }
  return raw
}

/** advantageCall(name, args) → one hosted tools/call, payload unwrapped. */
export async function advantageCall(name: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const res = await fetch(hostedMcpUrl(), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(toolsCall(name, args)),
  })
  return payloadOf(await res.json())
}
