/** The uuidna MCP door (https://uuidna.com/mcp): one JSON-RPC tools/call, answered by the door's own gate and receipts. */
export const UUIDNA_MCP_URL = process.env.UUIDNA_MCP_URL || 'https://uuidna.com/mcp'

export type UuidnaAnswer = { isError: boolean; text: string; structured?: unknown }

export const callUuidna = async (name: string, args: Record<string, unknown> = {}): Promise<UuidnaAnswer> => {
  const res = await fetch(UUIDNA_MCP_URL, {
    body: JSON.stringify({ id: 1, jsonrpc: '2.0', method: 'tools/call', params: { arguments: args, name } }),
    headers: { accept: 'application/json, text/event-stream', 'content-type': 'application/json' },
    method: 'POST',
  })
  if (!res.ok) return { isError: true, text: `uuidna door answered ${res.status}` }
  const body = (await res.json()) as {
    error?: { message?: string }
    result?: { content?: { text?: string }[]; isError?: boolean; structuredContent?: unknown }
  }
  if (body.error) return { isError: true, text: body.error.message ?? 'uuidna door error' }
  return {
    isError: body.result?.isError === true,
    structured: body.result?.structuredContent,
    text: body.result?.content?.map((c) => c.text ?? '').join('\n') ?? '',
  }
}
