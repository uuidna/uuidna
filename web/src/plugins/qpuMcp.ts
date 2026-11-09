import { mcpPlugin } from '@payloadcms/plugin-mcp'
import type { CollectionSlug, Endpoint, PayloadRequest } from 'payload'
import { handle } from '@uuidna/qpu/mcp'
import { VERSION } from '@uuidna/qpu/version'
import { appCall } from '../payload.qpu.mcp'

import { executableFind } from './websiteClient.ts'
import { WEBSITE_MCP_COLLECTIONS, WEBSITE_MCP_GLOBALS } from './websiteCatalogue.ts'

export { WEBSITE_MCP_COLLECTIONS, WEBSITE_MCP_GLOBALS }

const described = (description: string) => ({ description })
/** A tool reaches a request as Payload's RBAC reaches the collection it answers from: its read access (a where counts), else a signed-in user. */
const reads = (slug: CollectionSlug) => async ({ req }: { req: PayloadRequest }) => { const read = req.payload.collections[slug]?.config.access?.read; return Boolean(read ? await read({ req, slug }) : req.user) }

/** GET /api/mcp: the door described, as the unit's own hosted MCP (uuidna.com/mcp) answers it. Streamable HTTP lets a server answer GET with 405
 *  when it offers no server→client stream, which plugin-mcp does; a connector check reads that 405 as a sign-in demand, so the description stands
 *  first in the endpoints and answers 200 with the transport, the protocol version, the endpoint and the tool names: a client without a key then
 *  knows the door before it POSTs initialize. (payloadcms.com/docs/rest-api/overview#custom-endpoints) */
export const qpuMcpDescribeEndpoint: Endpoint = {
  path: '/mcp',
  method: 'get',
  handler: (req) => {
    const origin = `${req.protocol}//${req.host}`
    return Response.json({ server: 'qpu', version: VERSION, transport: 'streamable-http (JSON-RPC 2.0)', protocolVersion: '2025-06-18', endpoint: `${origin}/api/mcp`, methods: { post: 'JSON-RPC 2.0: initialize, tools/list, tools/call, resources/list, resources/read', get: 'this description; the server offers no server-to-client stream' }, auth: 'none for the catalogue; a Payload API key (users API-Key …) for the collection tools under the key\'s roles', tools: listed.map((t) => t.name), license: 'CC-BY-NC-ND-4.0 (https://uuidna.com/license)' }, { headers: { 'cache-control': 'public, max-age=60' } })
  },
}

/** Handler catalogue as top-level MCP tools (plugin-mcp 4.x: `tools`, not `mcp.tools`).
 *  Each tools/call is a UUID program; afterToolCall fuses the route. First the dictionary meaning; then the meaning is verified. */
const listed = (handle({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: { name: string; description: string; inputSchema: object }[] } }).result.tools
const handlerTools = Object.fromEntries(
  listed.map((t) => [
    t.name,
    {
      description: t.description,
      input: t.inputSchema,
      access: reads('entries'), // a catalogue answer is an entries call row, which everyone reads
      handler: async ({ input }: { input: Record<string, unknown> }) => {
        // answered as the app answers a tool (appCall)
        const r = appCall(t.name, input, { draw: true }) as { result?: { structuredContent: unknown }; error?: { message: string } }
        if (r.error) return { content: [{ type: 'text' as const, text: JSON.stringify({ error: r.error.message }) }], isError: true }
        return {
          content: [{ type: 'text' as const, text: JSON.stringify(r.result!.structuredContent) }],
          structuredContent: r.result!.structuredContent as Record<string, unknown>,
          _meta: { ui: { resourceUri: `ui://qpu/${t.name}` } },
        }
      },
    },
  ]),
)

const listedResources = (handle({ jsonrpc: '2.0', id: 1, method: 'resources/list' }) as { result: { resources: { uri: string; name: string; description: string; mimeType: string }[] } }).result.resources
const handlerResources = Object.fromEntries(
  listedResources.map((r) => [
    r.uri.replace(/^([a-z]+):\/\/qpu\//, '$1-'),
    {
      title: r.name,
      description: r.description,
      uri: r.uri,
      mimeType: r.mimeType,
      handler: async () => {
        const x = handle({ jsonrpc: '2.0', id: 1, method: 'resources/read', params: { uri: r.uri } }) as { result?: { contents: { uri: string; text: string }[] } }
        return { contents: (x.result?.contents ?? []).map((c) => ({ uri: c.uri, text: c.text })) }
      },
    },
  ]),
)

export const qpuMcpPlugin = mcpPlugin({
  collections: Object.fromEntries(Object.entries(WEBSITE_MCP_COLLECTIONS).map(([slug, description]) => [slug, slug === 'pages'
    ? { description, tools: { find: { access: reads('pages') } } }
    : described(description)])),
  disabled: false,
  globals: Object.fromEntries(Object.entries(WEBSITE_MCP_GLOBALS).map(([slug, description]) => [slug, described(description)])),
  hooks: {
    afterToolCall: [
      ({ input, response, toolName }) => {
        const found = toolName === 'findDocuments'
          ? executableFind(response as never, (response.doc ?? {}) as Record<string, unknown>, input)
          : response
        return {
          ...response,
          content: found.content,
          doc: found.doc && typeof found.doc === 'object' ? found.doc as Record<string, unknown> : response.doc,
          isError: found.isError,
          structuredContent: found.structuredContent,
        }
      },
    ],
  },
  mcp: {
    maxRequestBodySize: 4194304,
    verboseLogs: true,
    serverOptions: { serverInfo: { name: 'qpu', version: VERSION } },
  },
  resources: handlerResources,
  tools: {
    ...handlerTools,
  },
})
