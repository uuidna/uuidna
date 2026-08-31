// browser/court — run uuidnaOS court on the hosted MCP wire (same door as hooks; fuse export for git).
import { advantageCall, resultText, toolsCall, hostedMcpUrl } from '../../../advantage/mcp/wire/index.js'
import { handleOf } from '../../../../handle.js'

export interface McpCourtResult {
  ok: boolean
  receipt: string | null
  fuseExport: string | null
  detail: string
}

function execPayload(raw: unknown): { ok?: boolean; output?: string[]; receipt?: string } {
  return raw && typeof raw === 'object' ? raw as { ok?: boolean; output?: string[]; receipt?: string } : {}
}

/** runCourtViaMcp — daily court through uuidna_exec on /mcp (hex + MCP + playbook on the host). */
export async function runCourtViaMcp(mode: 'daily' | 'publish' = 'daily'): Promise<McpCourtResult> {
  const line = mode === 'publish' ? 'court --court' : 'court'
  const raw = await advantageCall('uuidna_exec', { line })
  const p = execPayload(raw)
  const text = Array.isArray(p.output) ? p.output.join('\n') : resultText({ result: { content: [{ type: 'text', text: JSON.stringify(raw) }] } })
  const ok = p.ok === true
  const receipt = typeof p.receipt === 'string' ? p.receipt : null
  const fuseExport = ok && receipt && mode === 'daily' ? `export UUIDNA_OS_MCP=${handleOf(receipt)}` : null
  return { ok, receipt, fuseExport, detail: text }
}

/** formatCourtFuseHint — one line for the terminal after court green. */
export function formatCourtFuseHint(r: McpCourtResult): string {
  if (!r.ok) return r.detail
  const tag = r.receipt ? handleOf(r.receipt) : 'green'
  return [
    `✓ court green · receipt \`${tag}\``,
    r.fuseExport ? `fuse git hooks: ${r.fuseExport}` : 'publish court — hooks still run their own pass',
  ].join('\n')
}

/** mcpToolsCallRaw — JSON-RPC tools/call for Terminal.vue (returns full RPC body). */
export async function mcpToolsCallRaw(name: string, args: Record<string, unknown>, id: number): Promise<unknown> {
  const res = await fetch(hostedMcpUrl(), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(toolsCall(name, args, id)),
  })
  return res.json()
}
