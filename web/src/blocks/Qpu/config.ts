// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The qpu block: one lexical/layout block of programmable UUID logic, the shape every tools/call result already carries in _meta.payload.
import type { Block } from 'payload'
import { uuid } from '@uuidna/qpu/blocks'
import { qpuFields, typeOk } from '@uuidna/qpu/payload'
import { call, handle } from '@uuidna/qpu/mcp'
import { createHmac, createPrivateKey, hkdfSync, sign } from 'node:crypto'
// the tools an editor names, each with its schema from the MCP's own tools/list: the tool checked on save, and its arguments against that
// tool's schema (the required keys, the types, the enums); a bound is the tool's to re-fuse, and a key the schema does not name is the tool's
type ToolSchema = { required?: string[]; properties?: Record<string, { type?: string | string[]; enum?: unknown[] }> }
const TOOL_SCHEMAS = new Map((handle({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: { name: string; inputSchema: ToolSchema }[] } }).result.tools.map((t) => [t.name, t.inputSchema]))
const checkTool = (v: unknown) => TOOL_SCHEMAS.has(String(v)) || `${String(v)} is no tool: name one of ${[...TOOL_SCHEMAS.keys()].join(', ')}`
const checkArguments = (v: unknown, { siblingData }: { siblingData?: { tool?: string } }) => {
  const s = TOOL_SCHEMAS.get(String(siblingData?.tool)); if (!s) return true
  if (v != null && (typeof v !== 'object' || Array.isArray(v))) return 'the arguments are one object'
  const a = (v ?? {}) as Record<string, unknown>, missing = (s.required ?? []).filter((k) => !(k in a))
  if (missing.length) return `${siblingData!.tool} needs ${missing.join(', ')}`
  for (const [k, p] of Object.entries(s.properties ?? {})) { if (!(k in a)) continue; if (!typeOk(a[k], p.type)) return `${k} is ${[p.type].flat().join(' or ')}`; if (p.enum && !p.enum.includes(a[k])) return `${k} is one of ${p.enum.join(', ')}` }
  return true
}
// the proof keys made once per process from their witnesses (the deployment secret, the signing seed), then only used, as a factor is
let keys: { mac: Buffer | null; signing: ReturnType<typeof createPrivateKey> | null } | undefined
const keysOf = () => (keys ??= { mac: process.env.QPU_DATA_KEY ? Buffer.from(hkdfSync('sha256', process.env.QPU_DATA_KEY, '', 'qpu proof mac', 32)) : null, signing: process.env.QPU_PROOF_SIGNING_KEY ? createPrivateKey({ key: Buffer.from(process.env.QPU_PROOF_SIGNING_KEY, 'base64'), format: 'der', type: 'pkcs8' }) : null })
export const Qpu: Block = {
  slug: 'qpu',
  interfaceName: 'QpuBlock',
  fields: [
    // the caller sends the tool and its arguments; the address and all read from it are computed here
    { name: 'uuid', type: 'text', validate: (v: unknown) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(String(v)) || 'a UUID of 36 characters', custom: { theorem: 'textbook_uuid_is_36' }, hooks: { beforeValidate: [({ siblingData: s }) => (s?.tool ? Object.assign(s, qpuFields(uuid(JSON.stringify({ tool: s.tool, arguments: s.arguments ?? {} })), s.tool, s.arguments ?? {}, s.theorem ?? null)).uuid : s?.uuid)] }, admin: { readOnly: true, description: 'the block address: a content-addressed RFC 9562 v8 UUID' } },
    { name: 'handle', type: 'text', admin: { readOnly: true } },
    { name: 'program', type: 'text', admin: { readOnly: true, description: 'the hex program (the version and variant nibbles rotated)' } },
    { name: 'tail', type: 'text', admin: { readOnly: true } },
    { name: 'tool', type: 'text', required: true, validate: checkTool, admin: { description: 'the tool whose result this block is: one the MCP lists (tools/list)' } },
    { name: 'arguments', type: 'json', validate: checkArguments as never, admin: { description: 'the arguments, so the block recomputes anywhere: checked on save against the schema of the tool' } },
    { name: 'prev', type: 'text', validate: (v: unknown) => (v == null || v === '') || /^$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(String(v)) || 'a UUID or empty', custom: { theorem: 'textbook_uuid_is_36' }, admin: { description: 'the referer block' } },
    { name: 'next', type: 'text', validate: (v: unknown) => (v == null || v === '') || /^$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(String(v)) || 'a UUID or empty', custom: { theorem: 'textbook_uuid_is_36' }, admin: { description: 'the program rotated: the next step' } },
    { name: 'stream', type: 'text', admin: { readOnly: true, description: 'the scannable stream of the address: the frames as a CSS gradient, stepped through by the qpu-scan item; computed by the lexical hook from uuid, never typed' }, custom: { theorem: 'textbook_scan_stream' }, hooks: { afterRead: [({ siblingData }) => { const u = String(siblingData?.uuid ?? ''); if (!/^[0-9a-f-]{36}$/.test(u)) return null; const hue = (ch: string) => (ch === '-' ? null : parseInt(ch, 16) * 22.5); return 'linear-gradient(90deg, ' + [...u].map((ch, i) => (hue(ch) === null ? 'hsl(0 0% 0%)' : 'hsl(' + hue(ch) + ' 62% 44%)') + ' ' + ((i / 36) * 100).toFixed(3) + '% ' + (((i + 1) / 36) * 100).toFixed(3) + '%').join(', ') + ')' }] } },
    { name: 'theorem', type: 'text', hooks: { beforeValidate: [({ value, siblingData: s }) => { const r = (call('verify', value ? { theorem: value } : { call: { tool: s?.tool, arguments: s?.arguments ?? {} } }) as { result?: { structuredContent?: { theorem?: string | null; accepted?: boolean } } }).result?.structuredContent; if (value && !r?.accepted) throw new Error('the kernel accepts no theorem ' + value); return value || (r?.accepted ? r.theorem : value) }] }, admin: { description: 'the kernel-accepted theorem that makes this block true; written by the QPU as a client of this MCP, read from the textbook' } },
    { name: 'proof', type: 'json', admin: { readOnly: true, description: 'the proof of the block, the digest of its round trip signed twice: an HMAC under the deployment secret, checked by the server, and a signature by the key the deployment holds (alg read from it), checked offline with the published public key' }, hooks: { beforeValidate: [({ siblingData: s }) => { const r = (call('verify', { call: { tool: s?.tool, arguments: s?.arguments ?? {} }, ...(s?.theorem ? { theorem: s.theorem } : {}) }) as { result?: { structuredContent?: { digest?: string | null; accepted?: boolean } } }).result?.structuredContent; if (!r?.digest || !r.accepted) return null; const k = keysOf(), d = r.digest; return { digest: d, alg: k.signing?.asymmetricKeyType ?? null, mac: k.mac ? createHmac('sha256', k.mac).update(d).digest('hex') : null, signature: k.signing ? sign(null, Buffer.from(d), k.signing).toString('base64') : null } }] } },
    { name: 'license', type: 'text', admin: { readOnly: true, description: 'the licence the block is served under (SPDX), kept with the content as every result carries it' } },
  ],
}
