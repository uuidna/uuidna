// quantum/apps/terminal — THE TERMINAL, BUILT ON THE MCP: a singularity, not a mirror (the captain's law,
// 2026-08-22: "keep terminal and mcp in singularity" · "build the terminal on mcp"). The sealed meaning of
// uuidna.com/terminal is busybox — "the toolbox of many common UNIX utilities" (the_terminal_is_the_toolbox)
// — and the site's toolbox IS the MCP registry, so the terminal's commands ARE MCP tool calls: the same
// JSON-RPC wire at /mcp, the same gate, the same two-coin deposit, the same receipt as any client. THE
// SINGULARITY IS A CHECKABLE PROPERTY: this module carries ZERO tool names of its own — the toolbox is learned
// LIVE from the wire's own tools/list, so there is no second copy to drift (the test asserts no registry
// name is hardcoded here). This module is the PURE half (hexbit-app law: no network, no clock, no float —
// parse, envelope, fold; Node-testable, browser-computable); the thin Vue shell owns the one fetch to the
// SAME uuidna surface. The serving rule it lives under: the 404 audit is the CATCH-ALL and every served page
// has priority — /terminal gains its function by becoming a served page carrying this app.
import { toUuid } from '../../address.js'
import { hexbitDoorOf, installFor } from '../os/index.js'

/** One parsed command line. `call` is an MCP tool invocation; builtins are the few words the terminal itself
 *  answers (help, meaning, clear — never a tool: tools come from the wire). */
export interface TermCommand {
  kind: 'empty' | 'builtin' | 'call' | 'error' | 'chat'
  name?: string        // builtin word, or the MCP tool to call
  args?: unknown       // parsed JSON arguments for a call
  text?: string        // the error's honest sentence, or the chat utterance to route
}

/** The builtin words — deliberately tiny, and none of them a tool. */
export const BUILTINS = ['help', 'meaning', 'clear'] as const

/** parseLine(line) → the command a line means. Grammar first: `<tool_name> {json args}` — the name lowercase
 *  [a-z0-9_]+ (exactly the registry's shape), the args an optional single JSON object (absent = {}). A line
 *  that is NOT the grammar is not an error — it is CHAT: natural language the router matches to a tool
 *  deterministically (routeUtterance). Input is DATA either way; nothing is ever executed here. */
export function parseLine(line: string): TermCommand {
  const trimmed = line.trim()
  if (!trimmed) return { kind: 'empty' }
  const word = trimmed.split(/\s+/, 1)[0]!
  const rest = trimmed.slice(word.length).trim()
  if ((BUILTINS as readonly string[]).includes(word) && !rest) return { kind: 'builtin', name: word }
  if (/^[a-z][a-z0-9_]*$/.test(word)) {
    if (!rest) return { kind: 'call', name: word, args: {} }
    if (rest.startsWith('{')) {
      try { return { kind: 'call', name: word, args: JSON.parse(rest) } }
      catch { return { kind: 'error', text: 'that JSON does not parse — arguments are one JSON object, e.g. {"key":"two_coins"}' } }
    }
    // a tool-shaped word followed by shell-shaped rest (flags, paths, pipes, redirects) is an attempted COMMAND,
    // and this terminal runs no shell: refuse loudly, never route it to chat and never guess — the controls in
    // the grammar test exist to hold exactly this line.
    if (/[-/\\|;&<>*$`]/.test(rest)) return { kind: 'error', text: 'shell-shaped input is not a tool name — this terminal speaks MCP: <tool_name> {json args}' }
  } else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(word) && rest) {
    // a would-be tool name in the wrong case is a mistake to NAME, not a sentence to route
    return { kind: 'error', text: 'the registry shape is lowercase — did you mean ' + word.toLowerCase() + '?' }
  }
  return { kind: 'chat', text: trimmed }   // a sentence — the router's job, never a guess and never a shell
}

/** rpcCall(cmd, id) → the exact JSON-RPC 2.0 message the wire takes for tools/call — the terminal speaks the
 *  MCP's own protocol, nothing bespoke. */
export const rpcCall = (cmd: TermCommand, id: number): object =>
  ({ jsonrpc: '2.0', id, method: 'tools/call', params: { name: cmd.name, arguments: cmd.args ?? {} } })

/** rpcList(id) → the tools/list message — how the terminal LEARNS the toolbox (the one source; no local copy). */
export const rpcList = (id: number): object => ({ jsonrpc: '2.0', id, method: 'tools/list' })

/** helpText() → the terminal's own words. NOTE WHAT IS ABSENT: no tool list — the toolbox is fetched from the
 *  wire at mount, because a help text that named tools would be the second copy the singularity forbids. */
export const helpText = (): string => [
  'the uuidna terminal — the toolbox IS the MCP: every command is a tool call on the same wire (/mcp),',
  'through the same gate, depositing the same two coins, returning the same receipt as any MCP client.',
  '',
  '  <tool> {json}   call a tool — e.g. any name from the list above, args as one JSON object',
  '  meaning         what this path means — the sealed spec of /terminal (Installs.lean)',
  '  help            these words',
  '  clear           clear the scrollback',
  '',
  'the tool list is learned LIVE from tools/list — this page carries no list of its own to drift.',
].join('\n')

/** meaningOf() → the sealed meaning of the path this terminal serves — straight from the default-install
 *  port, never restated by hand. */
export function meaningOf(): string {
  const spec = installFor('/terminal')
  return spec
    ? `/terminal means ${spec.id} ${spec.version} — "${spec.meaning}" (address ${spec.address}, sealed: the_terminal_is_the_toolbox)`
    : '/terminal — the sealed spec is not in this build (the mirror moved?); the audit page carries the answer'
}

/** resultText(rpcResult) → the text blocks of a tools/call result, in order — the answer, then the ledger
 *  line the gate appends. Anything unexpected renders as JSON, honestly, rather than being swallowed. */
export function resultText(result: unknown): string {
  const r = result as { result?: { content?: { type?: string; text?: string }[] }; error?: { message?: string } }
  if (r?.error?.message) return '✗ ' + r.error.message
  const blocks = r?.result?.content
  if (Array.isArray(blocks) && blocks.length)
    return blocks.map((b) => (b?.type === 'text' && typeof b.text === 'string' ? b.text : JSON.stringify(b))).join('\n')
  return JSON.stringify(result)
}

/** transcriptReceipt(lines) → the session, compiled: fold every line to one address and that address to its
 *  32 hexbit states — the terminal session is a first-class lattice object like any spec. */
export function transcriptReceipt(lines: readonly string[]): { address: string; hexbits: number[] } {
  const address = toUuid('terminal-transcript|' + lines.join('\n'))
  return { address, ...hexbitDoorOf(address) }
}

// ── THE NATURAL-LANGUAGE ROUTER — chat commands route to the matching MCP tool, DETERMINISTICALLY ────────────
// The chat page's law holds: there is no language model here and none is pretended. A sentence routes by a
// relevance floor in the spirit of adjudicate's contentWords, but with the ROUTER'S OWN word law: adjudicate
// strips 'theorem'/'proof'/'claim' as citation noise, and a router deaf to 'theorem' cannot hear its own most
// meaningful command word — so the router keeps domain words and instead drops articles AND imperative noise
// ('show me', 'get', 'find'): what remains scores against the LIVE-learned tool list (names weighted over
// descriptions), arguments extract against the tool's OWN schema (inline {json} wins; key=value pairs; the
// leftover fills a single missing required string). Ambiguity is SHOWN, never guessed; no match says so and
// points at help. The same sentence and the same toolbox always route the same way — a conversation that
// recomputes.
import { contentWords } from '../../adjudicate.js'

// the router's noise list: articles/pronouns/imperative framing — NEVER domain words. A verb here ('find') is
// deliberately noise: a tool named for it must be addressed by its other name parts or called by exact name.
const ROUTER_NOISE = new Set(['the', 'a', 'an', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'is', 'are',
  'was', 'be', 'it', 'its', 'this', 'that', 'and', 'or', 'not', 'me', 'my', 'your', 'our', 'please', 'show',
  'get', 'give', 'find', 'tell', 'display', 'what', 'which', 'how', 'do', 'does', 'can', 'could', 'you',
  'i', 'we', 'us', 'run', 'call', 'use', 'about', 'from', 'into'])

/** routerWords(text) → the words a command line means by: lowercase alphanumeric tokens minus the noise —
 *  the router's own floor ('theorem' survives here; 'show me' does not). */
export const routerWords = (text: string): string[] =>
  [...text.toLowerCase().matchAll(/[a-z0-9]+/g)].map((m) => m[0]).filter((w) => !ROUTER_NOISE.has(w))

/** A tool as tools/list serves it — the router reads the wire's own shapes, nothing bespoke. */
export interface WireTool {
  name: string
  description?: string
  inputSchema?: { properties?: Record<string, { type?: string }>; required?: string[] }
}

export interface RouteCandidate { name: string; score: number }
export interface RouteResult {
  kind: 'route' | 'ambiguous' | 'none'
  name?: string
  args?: Record<string, unknown>
  why: string
  candidates?: RouteCandidate[]
}

const overlapCount = (a: readonly string[], b: readonly string[]): number => a.filter((t) => b.includes(t)).length

/** routeUtterance(utterance, tools) → the matching tool call, or honest ambiguity/none. Pure and total. */
export function routeUtterance(utterance: string, tools: readonly WireTool[]): RouteResult {
  // 1) an inline {json} object anywhere in the sentence is the arguments, verbatim — the speaker's exact word wins
  let text = utterance
  let inlineArgs: Record<string, unknown> | null = null
  const jsonStart = text.indexOf('{')
  if (jsonStart >= 0) {
    try {
      const parsed = JSON.parse(text.slice(jsonStart, text.lastIndexOf('}') + 1))
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        inlineArgs = parsed as Record<string, unknown>
        text = (text.slice(0, jsonStart) + ' ' + text.slice(text.lastIndexOf('}') + 1)).trim()
      }
    } catch { /* not a JSON island — the words stand as words */ }
  }
  // 2) score every tool: name parts weigh 3, description content words weigh 1 — deterministic, tie-broken by
  // name. The utterance speaks routerWords (domain words kept, articles/imperatives dropped); descriptions
  // still match by adjudicate's contentWords — the citation floor is right for prose.
  const words = routerWords(text)
  const scored = tools.map((t) => {
    const nameParts = t.name.replace(/^uuidna_/, '').split('_').filter(Boolean)
    const score = 3 * overlapCount(words, nameParts) + overlapCount(words, contentWords(t.description ?? ''))
    return { tool: t, nameHits: overlapCount(words, nameParts), score }
  }).filter((s) => s.score > 0).sort((a, b) => b.score - a.score || (a.tool.name < b.tool.name ? -1 : 1))
  const top = scored[0]
  if (!top || (top.nameHits === 0 && top.score < 3))
    return { kind: 'none', why: 'no tool matches those words — the router only matches content words against the live toolbox (try: help, or name a tool exactly)' }
  if (scored[1] && scored[1].score === top.score)
    return { kind: 'ambiguous', why: 'those words match more than one tool equally — say which', candidates: scored.slice(0, 3).map((s) => ({ name: s.tool.name, score: s.score })) }
  // 3) arguments, from the tool's OWN schema: inline json > key=value pairs > the leftover fills one required
  // string. A leftover is a raw token that is neither routing noise nor a word of the matched tool's name —
  // raw, so a value like two_coins survives with its underscore intact.
  const args: Record<string, unknown> = { ...(inlineArgs ?? {}) }
  const props = top.tool.inputSchema?.properties ?? {}
  const kv = /^([A-Za-z_][A-Za-z0-9_]*)[=:](.+)$/
  const nameParts = top.tool.name.replace(/^uuidna_/, '').split('_')
  const leftovers: string[] = []
  for (const tok of text.split(/\s+/).filter(Boolean)) {
    const m = kv.exec(tok)
    if (m && m[1]! in props && !(m[1]! in args)) {
      const v = m[2]!.replace(/^"|"$/g, '')
      args[m[1]!] = props[m[1]!]?.type === 'number' || props[m[1]!]?.type === 'integer' ? Number(v) : v
      continue
    }
    const low = tok.toLowerCase()
    if (!ROUTER_NOISE.has(low) && low !== top.tool.name && !nameParts.includes(low)) leftovers.push(tok)
  }
  const missing = (top.tool.inputSchema?.required ?? []).filter((r) => !(r in args))
  if (missing.length === 1 && leftovers.length && (props[missing[0]!]?.type ?? 'string') === 'string')
    args[missing[0]!] = leftovers.join(' ')
  return { kind: 'route', name: top.tool.name, args,
    why: `routed by the router's word floor (score ${top.score}: ${top.nameHits} on the name) — deterministic, no model` }
}
