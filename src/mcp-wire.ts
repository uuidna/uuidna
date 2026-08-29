// mcp-wire — THE TOLL EVERY AGENT PAYS, computed once from the 64-bit coin.
//
// tools/list sends name + description + inputSchema on EVERY request. Essays belong in `detail` (docs/mcp.md),
// never on that payload. Caps are occupancy × fold, not a decimal guess: one 64-bit word is ADDRESS_BYTES / COINS
// (the coin), the wire holds one address of those words, a schema blurb holds one digest.
import { rdRoot } from './boundary.js'
import { ADDRESS_BYTES, KEY_BYTES, COINS } from './hexbit/index.js'

/** tools/list row — name + description + schema; never detail. */
export interface WireTool { name: string; description: string; detail?: string; inputSchema?: unknown }

/** The exact bytes an MCP client puts in the model's context for tools/list. */
export const wireBytes = (tools: readonly WireTool[]): number =>
  JSON.stringify(tools.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))).length

export interface WireBudget { wireBytes: number; note: string }

/** The sealed tools/list ceiling. Absent / unreadable at the edge is null, never a throw. */
export const sealedBudget = (): WireBudget | null => {
  try { return JSON.parse(rdRoot('lean/mcp-context-budget.json')) as WireBudget } catch { return null }
}

/** One 64-bit machine word in bytes — half an address, the coin. */
export const WORD_BYTES = ADDRESS_BYTES / COINS
/** Wire description: sixteen 64-bit words = one address of cells. */
export const WIRE_CAP = WORD_BYTES * ADDRESS_BYTES
/** Param blurbs: one digest. Enough to call, not a second essay. */
export const SCHEMA_CAP = KEY_BYTES
/** Citation bound: digest × coins + one address. The two canonical citations sit under it; the 146-byte essay does not. */
export const LAW_PHRASE = KEY_BYTES * COINS + ADDRESS_BYTES
/** When slicing a long first sentence to leave room for Returns: keep at least one digest. */
const HEAD_KEEP = KEY_BYTES

/** Split a description into sentences, keeping bracketed shapes like `Returns {a,b}` intact. */
export const sentences = (t: string): string[] => {
  const out: string[] = []
  let buf = '', depth = 0
  for (let i = 0; i < t.length; i++) {
    const c = t[i]!
    if (c === '{' || c === '[' || c === '(') depth++
    if (c === '}' || c === ']' || c === ')') depth--
    buf += c
    if (depth <= 0 && (c === '.' || c === '!' || c === '?') && !/^ [a-z]/.test(t.slice(i + 1, i + 3))) {
      out.push(buf.trim()); buf = ''
    }
  }
  if (buf.trim()) out.push(buf.trim())
  return out
}

const atSpace = (s: string, cap: number): string => {
  if (s.length <= cap) return s
  let cut = cap
  while (cut > HEAD_KEEP && s[cut] !== ' ') cut--
  return s.slice(0, cut).trim()
}

/** clipWire(text) → what belongs on tools/list: first sentence (sliced if needed) plus Returns when it fits. */
export function clipWire(text: string, cap = WIRE_CAP): string {
  if (text.length <= cap) return text
  const parts = sentences(text)
  const head = parts[0] ?? ''
  const ret = parts.find((s) => s.startsWith('Returns ') || s.startsWith('Returns {'))
  const cite = parts.find((s) => s.length <= LAW_PHRASE && s.includes('theorem ') && s !== ret && s !== head)
  if (head.length <= cap) {
    let out = head
    if (ret && ret !== head) {
      const n = out + ' ' + ret
      if (n.length <= cap) out = n
    }
    if (cite) {
      const n = out + ' ' + cite
      if (n.length <= cap) out = n
    }
    return out
  }
  if (ret && ret.length + HEAD_KEEP + 1 <= cap) {
    const budget = cap - ret.length - 1
    return atSpace(head, budget) + ' ' + ret
  }
  return atSpace(head, cap)
}

function clipSchema(schema: unknown, cap = SCHEMA_CAP): unknown {
  if (!schema || typeof schema !== 'object') return schema
  const s = schema as { properties?: Record<string, { description?: string } & Record<string, unknown>> }
  if (!s.properties) return schema
  const properties: Record<string, unknown> = {}
  for (const k of Object.keys(s.properties)) {
    const p = s.properties[k]!
    const d = p.description
    properties[k] = d && d.length > cap ? { ...p, description: clipWire(d, cap) } : p
  }
  return { ...s, properties }
}

/** sealToolWire(t) → same tool with a wire-sized description; the original essay is preserved in detail. */
export function sealToolWire<T extends { description: string; detail?: string; inputSchema?: unknown }>(t: T): T {
  const description = clipWire(t.description)
  const essay = t.description
  const detail = description === essay
    ? t.detail
    : t.detail
      ? (t.detail.includes(essay) ? t.detail : essay + '\n\n' + t.detail)
      : essay
  const inputSchema = t.inputSchema !== undefined ? clipSchema(t.inputSchema) : t.inputSchema
  return {
    ...t,
    description,
    ...(detail !== undefined ? { detail } : {}),
    ...(inputSchema !== undefined ? { inputSchema } : {}),
  }
}
