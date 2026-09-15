// mcp-door — COVER ALL WITH MINIMAL KEYS, IN MCP'S OWN WORDS: two listed tools open every tool, and tools/call still
// takes every name.
//
// MEASURED 2026-09-15, before the door: tools/list carried all 242 tools — 77,824 bytes, 321.58 bytes per tool,
// 218 distinct argument names across 161 schema shapes — into the model's context on EVERY request. Grouping by
// name prefix would not have helped: the names fall into 182 prefix families, most of them singletons, so family
// doors would still list 182 tools. What does shrink it is a door: a model that can find any tool
// by a word does not need all 242 contracts resent on every turn. The catalogue itself is unchanged. Each tool
// keeps its name, schema and dispatch, and a client calling a name directly (the site's AdvantageMcp and
// RightsDoor, the terminal grammar, every script) is answered exactly as before.
//
// THE DOOR SPEAKS THE PROTOCOL'S VOCABULARY. It is two tools whose keys are the ones MCP itself uses:
//   list_tools {}        → {tools:[{name, title, description}]}, tools/list's own fields, for every tool
//   list_tools {name}    → that tool's contract as tools/list would serve it, plus the shape of its actual answer
//                          and the example that produced it (src/mcp-docs.generated.ts)
//   list_tools {query}   → the tools every word of the query matches, in the {} row shape
//   call_tool {name, arguments} → the named tool, exactly as tools/call {name, arguments} would run it
// The first door's keys — uuidna_call {op, args} / {q} / {} — still answer, unlisted, exactly as before.
//
// WHAT IS LISTED IS DERIVED, NEVER CHOSEN. The two doors, plus every tool the surface's own INSTRUCTIONS name —
// the words a client hands the model on connect. A tool the instructions tell a model to call must be callable
// from the listing, and naming it there is the only way onto the listing; there is no second list to keep.
//
// THE DOOR IS UNWRAPPED BEFORE THE GATE. call_tool {name, arguments} (and {op, args}) is rewritten to the call it
// names before the gate, the audit, the deposit and the receipt see it, so a call through the door and the same
// call made directly return the same answer and the same ledger line. The door adds no claim of its own.
// Pure and edge-safe: no node builtins, no clock, no randomness.

import { RENAMES, type Annotations } from './mcp-names.js'

/** The call door's catalogue id; its standard name (src/mcp-names.ts) is what the listing shows. */
export const DOOR = 'uuidna_call'
/** call_tool — the call door's standard name. DOOR stays callable as its alias. */
export const DOOR_NAME = RENAMES[DOOR]!.to
/** The list door's catalogue id. Its standard name is derived (it leads with the verb `list`), never declared. */
export const LIST = 'uuidna_list_tools'
/** list_tools — the list door's standard name */
export const LIST_NAME = 'list_tools'
/** isDoor(name) → whether a name, standard or alias, is the CALL door (the one tools/call unwraps) */
export const isDoor = (name: unknown): boolean => name === DOOR || name === DOOR_NAME
/** isListDoor(name) → whether a name, standard or alias, is the list door */
export const isListDoor = (name: unknown): boolean => name === LIST || name === LIST_NAME
/** isDoorTool(name) → either door: listed whatever the instructions say, and each keeps its own line */
export const isDoorTool = (name: unknown): boolean => isDoor(name) || isListDoor(name)

/** THE CONNECT SENTENCE — the one plain sentence both surfaces' instructions carry, naming the two doors. */
export const CONNECT = 'Every tool is reached through two: list_tools lists them all ({name} gives one tool\'s full contract, {query} finds tools by words), and call_tool {name, arguments} runs any tool exactly as calling it by name.'

/** A listed contract: what tools/list serves for one tool — the standard name, its plain title, the one computed
 *  line, the input schema, the derived annotations, the old names that still call it. The door's index adds the
 *  shape of the actual answer and the example that produced it (src/mcp-docs.generated.ts). */
export interface DoorRow {
  name: string; description: string; inputSchema?: unknown; handle?: string
  title?: string; aliases?: string[]; annotations?: Partial<Annotations>
  outputSchema?: unknown; example?: { args: Record<string, unknown>; excerpt: string }
}
const namesOf = (r: DoorRow): string[] => [r.name, ...(r.aliases ?? [])]
/** idOf(row) → the catalogue id a row serves: its old name when it carries one as an alias, else its name. A reader
 *  that keys the toolbox by catalogue id reads this, not `name`. */
export const idOf = (r: { name: string; aliases?: readonly string[] }): string => r.aliases?.[0] ?? r.name

/** call_tool's input contract: tools/call's own two keys. Nothing required, so the first door's {} and {q} still
 *  answer through it. No enum of names: the enum would re-send every tool name on every request (4.4 kB over 242
 *  names), which is the toll the door exists to lift. list_tools finds them instead. */
export const DOOR_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'the tool to run' },
    arguments: { type: 'object', description: 'its arguments' },
  },
} as const
/** list_tools's input contract */
export const LIST_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'one tool: its full contract' },
    query: { type: 'string', description: 'words to find tools by' },
  },
} as const

/** The doors' wire descriptions, under the wire cap. Short on purpose: each door is also a catalogue row, and
 *  lean/ratchets.json holds the catalogue's bytes per tool to a shrink-only reading. */
export const DOOR_DESCRIPTION = 'Run any uuidna tool by name with its arguments, exactly as a direct tools/call. Find names with list_tools.'
export const LIST_DESCRIPTION = 'Every uuidna tool: {} lists name, title and description; {name} gives one full contract; {query} finds tools.'

/** namedIn(text, names) → the names the text mentions as whole tokens, in the order the names come. */
export const namedIn = (text: string, names: readonly string[]): string[] => {
  const tokens = new Set(text.match(/\b[A-Za-z][A-Za-z0-9_]*\b/g) ?? [])
  return names.filter((n) => tokens.has(n))
}

/** listedOf(rows, instructions) → the listing: list_tools, call_tool, then every row the instructions name by its
 *  standard name or by an alias. */
export const listedOf = <T extends DoorRow>(rows: readonly T[], instructions: string): T[] => {
  const said = new Set(namedIn(instructions, rows.flatMap(namesOf)))
  const door = (r: DoorRow): boolean => namesOf(r).some(isDoorTool)
  const doors = [...rows.filter((r) => namesOf(r).some(isListDoor)), ...rows.filter((r) => namesOf(r).some(isDoor))]
  return [...doors, ...rows.filter((r) => !door(r) && namesOf(r).some((n) => said.has(n)))]
}

/** openDoor(name, args) → the call the door names, or null when this is not a door call to unwrap.
 *  Two forms are unwrapped: tools/call's own {name, arguments}, and the first door's {op, args}. Only a well-formed
 *  call is (a string name other than the call door, arguments absent or a plain object, the two forms unmixed);
 *  anything else is left for the door's own run to refuse by name, through the ordinary path. */
export const openDoor = (name: unknown, args: Record<string, unknown> | undefined): { name: string; args: Record<string, unknown> } | null => {
  if (!isDoor(name) || !args) return null
  const mcp = 'name' in args || 'arguments' in args
  if (mcp && ('op' in args || 'args' in args)) return null
  const op = mcp ? args.name : args.op
  const inner = mcp ? args.arguments : args.args
  if (typeof op !== 'string' || isDoor(op)) return null
  if (inner !== undefined && (inner === null || typeof inner !== 'object' || Array.isArray(inner))) return null
  return { name: op, args: (inner as Record<string, unknown> | undefined) ?? {} }
}

/** matching(rows, q) → the rows matching every word of q in their name, aliases, title or description */
const matching = (rows: readonly DoorRow[], q: string): DoorRow[] => {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  return rows.filter((r) => { const hay = [...namesOf(r), r.title ?? '', r.description].join(' ').toLowerCase(); return words.every((w) => hay.includes(w)) })
}
/** rowOf(rows, name) → the row a standard name or an old alias names, or undefined */
const rowOf = (rows: readonly DoorRow[], name: string): DoorRow | undefined => rows.find((r) => namesOf(r).includes(name))

/** doorIndex(rows, q) → the first door's index: the rows matching every word of q, each with its example; all rows
 *  when q is absent, without the examples. Served by uuidna_call {q} and {}, unchanged. */
export const doorIndex = (rows: readonly DoorRow[], q?: unknown): { q?: string; count: number; tools: DoorRow[] } => {
  const tools = typeof q === 'string' && q.trim() ? matching(rows, q) : rows.map(({ example: _example, ...r }) => r)
  return { ...(typeof q === 'string' ? { q } : {}), count: tools.length, tools }
}

/** A list_tools row: tools/list's own fields, and nothing a model must pay for before it asks. */
export type ListRow = { name: string; title?: string; description: string }
const brief = (r: DoorRow): ListRow => ({ name: r.name, ...(r.title ? { title: r.title } : {}), description: r.description })

/** unknownLookup(rows, name, args) → the tool name a list_tools call asks about when no row carries it, else null.
 *  Each surface refuses it with the JSON-RPC error an unknown tools/call name gets, so "no such tool" reads the
 *  same whichever way a client asked. */
export const unknownLookup = (rows: readonly DoorRow[], name: unknown, args: Record<string, unknown> | undefined): string | null =>
  isListDoor(name) && typeof args?.name === 'string' && !rowOf(rows, args.name) ? args.name : null

/** listTools(rows, a) → list_tools's answer: one contract by {name}; the rows {query} matches; every row. */
export const listTools = (rows: readonly DoorRow[], a: Record<string, unknown>): DoorRow | { query?: string; tools: ListRow[] } => {
  if (typeof a.name === 'string') {
    const row = rowOf(rows, a.name)
    if (!row) throw new Error(`unknown tool: ${a.name}`)
    return row
  }
  if (typeof a.query === 'string') return { query: a.query, tools: matching(rows, a.query).map(brief) }
  return { tools: rows.map(brief) }
}

/** doorRun(rows, call, a) → the call door's own run: dispatch {name, arguments} or {op, args} through `call`, or
 *  answer the first door's index for {} and {q}. Reached when the door is called through callTool, or with a call
 *  openDoor declined to unwrap. */
export const doorRun = (rows: readonly DoorRow[], call: (name: string, args: Record<string, unknown>) => unknown, a: Record<string, unknown>): unknown => {
  const op = a.name ?? a.op
  if (op === undefined && a.arguments === undefined && a.args === undefined) return doorIndex(rows, a.q)
  if (isDoor(op)) throw new Error(`${DOOR_NAME}: the door does not open itself — pass another tool's name`)
  const opened = openDoor(DOOR, a)
  if (!opened) throw new Error(`${DOOR_NAME}: name must be a tool name and arguments an object of that tool's arguments — nothing was computed`)
  return call(opened.name, opened.args)
}

/** doorDetail(rows) → the docs copy: every name the call door opens. Rendered into docs/mcp.md, never on the wire. */
export const doorDetail = (rows: readonly DoorRow[]): string => {
  const opens = rows.filter((r) => !namesOf(r).some(isDoor))
  return `THE DOOR THAT COVERS THE CATALOGUE, in tools/call's own keys. tools/list carries list_tools, this door and the tools the server's instructions name; call_tool {name, arguments} runs every other tool exactly as tools/call would, and tools/call still accepts every name and alias directly. The first door's keys, {op, args}, {q} and {}, still answer. Opens ${opens.length} tools: ${opens.map((r) => r.name).join(', ')}.`
}
/** LIST_DETAIL → the list door's docs copy, never on the wire */
export const LIST_DETAIL = 'THE CATALOGUE IN tools/list\'s OWN FIELDS. {} answers {tools:[{name, title, description}]} for every tool the surface serves; {name} (a standard name or an old alias) answers that tool\'s contract as tools/list would serve it — inputSchema and annotations — with the JSON Schema of its actual answer and the example that produced it; {query} answers the tools matching every word. An unknown name is refused with the same JSON-RPC error an unknown tools/call name gets.'
