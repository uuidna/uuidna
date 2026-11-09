// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
'use client'
// The host of an MCP App: the tool's ui:// resource read over the MCP endpoint (resources/read), hosted in a sandboxed frame and spoken to
// through the MCP Apps protocol (ui/initialize → initialized, tool-input, tool-result, size-changed). The UI is built from the MCP; nothing is drawn here.
import React, { useEffect, useRef, useState } from 'react'

// html: the resource already read by the server (the app reads it from the handler in its own runtime); else it is read over mcp with the key the MCP plugin takes (Authorization: Bearer <payload-mcp-api-keys key>, measured on 4.0.0-beta.7)
export type QpuAppProps = { tool?: string; args?: Record<string, unknown>; result?: unknown; html?: string; mcp?: string; apiKey?: string }
// no tool: the chat (ui://qpu/chat), as the admin mounts it
export const QpuApp: React.FC<QpuAppProps> = ({ tool = 'chat', args = {}, result = null, html: given, mcp = '/api/mcp', apiKey }) => {
  const frame = useRef<HTMLIFrameElement>(null)
  const held = useRef<string | undefined>(undefined)
  const [html, setHtml] = useState('') // mounted only once the listener below is registered: the view's ui/initialize must not race the host (measured)
  const [height, setHeight] = useState(120)
  const ready = useRef(false)
  // plain data only: a framework proxy cannot be cloned across the frame, so every message is the JSON of itself
  const post = (m: Record<string, unknown>) => frame.current?.contentWindow?.postMessage(JSON.parse(JSON.stringify({ jsonrpc: '2.0', ...m })), '*')
  // one request with the host's key: the JSON, or a stream's last data line
  const rpc = (id: unknown, method: string, params: unknown) => { const key = held.current || apiKey; return fetch(mcp, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', ...(key ? { authorization: 'Bearer ' + key } : {}) }, body: JSON.stringify({ jsonrpc: '2.0', id, method, params }) }).then((r) => r.text()).then((t) => JSON.parse((t.split('\n').filter((l) => l.startsWith('{') || l.startsWith('data: ')).pop() ?? t).replace(/^data: /, ''))) }
  const tell = () => { if (!ready.current) return; post({ method: 'ui/notifications/tool-input', params: { arguments: args } }); post({ method: 'ui/notifications/tool-result', params: result }) }
  useEffect(() => {
    ready.current = false
    if (given !== undefined) { setTimeout(() => setHtml(given), 0); return }
    rpc(1, 'resources/read', { uri: 'ui://qpu/' + tool }).then((j) => setHtml(j.result?.contents?.[0]?.text ?? '')).catch(() => setHtml(''))
  }, [tool, mcp, given, apiKey])
  useEffect(() => { tell() }, [result])
  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (!frame.current || e.source !== frame.current.contentWindow) return
      const m = e.data ?? {}
      if (m.method === 'ui/initialize') { post({ id: m.id, result: { protocolVersion: '2026-01-26', hostCapabilities: {}, hostContext: { displayMode: 'inline' } } }); return }
      if (m.method === 'ui/notifications/initialized') { ready.current = true; tell(); return }
      if (m.method === 'ui/notifications/size-changed' && typeof m.params?.height === 'number') setHeight(Math.max(40, Math.min(2400, m.params.height + 8)))
      // the view's tools/call (a verification, a chat turn) through the app's MCP with the host's key, no model; a link opened only when https
      if (m.method === 'ui/accept-token' && typeof m.params?.authorization === 'string' && m.params.authorization.length > 0) { held.current = m.params.authorization; post({ id: m.id, result: { accepted: true, echoed: false } }); return }
      if (m.method === 'tools/call' && m.id !== undefined) { const token = m.params?.arguments?.token; if (typeof token === 'string') { post({ id: m.id, error: { code: -32602, message: 'a secret never travels' } }); return } rpc(m.id, 'tools/call', m.params).then(post).catch((e) => post({ id: m.id, error: { code: -32603, message: String(e) } })); return }
      if (m.method === 'ui/open-link' && typeof m.params?.url === 'string' && /^https:\/\//.test(m.params.url)) { window.open(m.params.url, '_blank', 'noopener'); post({ id: m.id, result: {} }); return }
    }
    window.addEventListener('message', on)
    return () => window.removeEventListener('message', on)
  })
  return <iframe ref={frame} srcDoc={html} sandbox="allow-scripts" title={'qpu · ' + tool} style={{ width: '100%', height, border: '0.5px solid var(--color-border-primary, #e4e4e7)', borderRadius: 8, background: 'transparent' }} />
}
