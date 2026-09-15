// mcp-names — ONE COMMON NAME PER TOOL, derived from what the tool is and does; every old name stays callable.
//
// The catalogue grew one house word at a time (hologram, holofractal, rosetta, involute, treason, reeducate …), and a
// model choosing a tool reads the name first. The standard is the one MCP clients already use: a verb then its object in snake case, a plain
// `title`, and annotations that say what the call touches. Nothing here is typed per tool unless no derivation
// reaches it, and every such row says why.
//
// THE DERIVATION — the first rule that answers wins:
//   1. DECLARED: the tool has a row in RENAMES (house words with no plain word in the tool's name or run target,
//      and one-word names whose object nothing else supplies).
//   2. The name already LEADS with a standard verb (uuidna_verify_statement → verify_statement).
//   3. The name ENDS with one (uuidna_fs_seal → seal_fs): object-verb order, flipped.
//   4. The run has ONE target and it leads with a standard verb (uuidna_contract_chain runs sealChainToContract →
//      seal_contract_chain; uuidna_search runs searchLedger → search_ledger). A run with several targets is a
//      dispatch over branches, and its first branch does not name the tool.
//   5. BEHAVIOUR picks the verb: reaches the network → fetch; spawns a process → run; writes → record; no required argument → get;
//      otherwise compute — a pure function of its arguments.
// A name two tools derive stays with the lower rule; the other falls back to rule 5 over its whole old object, so no
// two tools share a name and no outcome depends on catalogue order.
//
// Pure and edge-safe: string arithmetic over the names, run targets and effects the generator recorded.

/** THE STANDARD VERBS — the one vocabulary rules 2–4 read, each with the meaning it standardises. A DECLARATION:
 *  part of speech is not in the tree. Each is the plain word a client already uses for that act. */
export const VERBS: Readonly<Record<string, string>> = {
  get: 'read one computed record or report; no argument required',
  list: 'enumerate a collection',
  search: 'find entries matching words',
  compute: 'a pure function of the arguments',
  verify: 'check a claim, proof or envelope; answers whether it holds',
  check: 'test one property of the input',
  audit: 'examine an input and report every finding',
  detect: 'find one class of fault',
  decide: 'evaluate a proposition to a verdict',
  prove: 'produce a proof for a verdict',
  seal: 'bind or encrypt into a sealed form',
  open: 'reverse a seal, or read an open register',
  encrypt: 'encrypt with a key',
  decrypt: 'decrypt with a key',
  sign: 'sign with a key',
  send: 'seal a message for a recipient',
  receive: 'open a message sent to you',
  read: 'decode a stored or imprinted value',
  fetch: 'read over the network',
  render: 'produce display output',
  decode: 'turn an encoded value back into its parts',
  run: 'execute a command, circuit or sequence',
  deposit: 'append a record to a store',
  record: 'write a record the call produced',
  publish: 'compose a publication',
  compare: 'compare two inputs',
  review: 'review a set of inputs',
  declare: 'declare a spend',
  enroll: 'enroll a member',
  call: 'invoke another tool',
  imprint: 'write text into an address chain',
  query: 'query a store',
  fill: 'fill gaps',
  grow: 'grow a pattern',
  try: 'try a claim',
  optimise: 'optimise an objective',
  transform: 'rewrite an input until a condition holds',
  merge: 'combine two inputs into one',
  rotate: 'rotate a sequence',
  sanitize: 'clean an input for safe use',
  predict: 'predict what is about to break',
  edit: 'revise a publication',
  reveal: 'reveal a verdict with its citations',
  reason: 'answer a question from sealed statements',
  bill: 'price a call',
}

/** THE DECLARED NAMES — each a choice no rule reaches, with its reason. Keyed by the old name, which stays callable.
 *  The names test refuses a row whose target equals what rules 2–5 derive, so the table cannot keep a row it
 *  does not need. */
export const RENAMES: Readonly<Record<string, { to: string; why: string }>> = {
  uuidna_call: { to: 'call_tool', why: 'MCP names invoking a tool tools/call; the door does exactly that for any tool' },
  uuidna_hologram: { to: 'list_hosts', why: 'house word "hologram"; it lists the four MCP hosts and how to connect to each' },
  uuidna_fanout: { to: 'call_host', why: 'house word "fanout"; it forwards one JSON-RPC call to a named MCP host' },
  uuidna_holofractal: { to: 'compute_pentagram_fractal', why: 'house word "holofractal"; its run target pentagramHologramFractal draws a pentagram fractal' },
  uuidna_rosetta_legs: { to: 'get_verification_legs', why: 'house word "rosetta"; it reports the independent checks (legs) each theorem has' },
  uuidna_involute: { to: 'compute_involution', why: 'house verb "involute"; it computes an involution and its fixed points' },
  uuidna_treason: { to: 'detect_traitors', why: 'house word "treason"; its run target catchTraitors flags statements that contradict the ledger' },
  uuidna_reeducate: { to: 'compute_correction', why: 'house verb "reeducate"; it rewrites a refuted claim toward the sealed statement' },
  uuidna_unify: { to: 'get_receipt', why: 'house verb "unify"; it folds the whole ledger to one receipt' },
  uuidna_adjudicate: { to: 'verify_claim', why: 'house verb "adjudicate"; it answers VERIFIED, REFUTED or UNVERIFIED for a claim' },
  uuidna_gate: { to: 'check_citations', why: 'house word "gate"; it checks that every theorem a claim cites is sealed' },
  uuidna_slim_gate: { to: 'check_citations_slim', why: 'house word "gate"; the minimal form of check_citations' },
  uuidna_through_void: { to: 'compute_zero_division', why: 'house phrase "through void"; it evaluates division through zero under x/0 = 0' },
  uuidna_theorems: { to: 'list_theorems', why: 'plural noun; it lists the ledger with filters' },
  uuidna_decide: { to: 'decide_expression', why: 'one-word verb name with a one-word target; the input is an expression or proposition' },
  uuidna_verify: { to: 'verify_address', why: 'one-word verb name; its run target verifyUuidna checks a uuidna address' },
  uuidna_merge: { to: 'merge_addresses', why: 'one-word verb name with a one-word target; it merges two content-addresses' },
  uuidna_rotate: { to: 'rotate_sequence', why: 'one-word verb name with a one-word target; it rotates a digit sequence' },
  uuidna_encrypt: { to: 'encrypt_text', why: 'one-word verb name with a one-word target' },
  uuidna_decrypt: { to: 'decrypt_envelope', why: 'one-word verb name with a one-word target; the input is the envelope encrypt_text returns' },
  uuidna_send: { to: 'send_message', why: 'one-word verb name over two targets; it seals a message into a uuid chain' },
  uuidna_receive: { to: 'receive_message', why: 'one-word verb name over two targets; it opens a sealed uuid chain' },
  uuidna_reveal: { to: 'reveal_verdict', why: 'one-word name with a one-word target; it reveals a claim\'s verdict and citations' },
  uuidna_reason: { to: 'reason_question', why: 'one-word name with a one-word target; it answers a question from sealed statements' },
  uuidna_publish: { to: 'publish_article', why: 'one-word verb name over two targets; it composes a publication' },
  uuidna_edit: { to: 'edit_publication', why: 'one-word verb name over two targets; it revises a publication' },
  uuidna_bill: { to: 'bill_call', why: 'one-word verb name; its target billUuidna prices one call from its measured cost' },
  uuidna_sanitize: { to: 'sanitize_value', why: 'one-word verb name over two targets; it sanitises a value' },
  uuidna_run: { to: 'run_command', why: 'one-word verb name; it runs a command in the pinned Alpine rootfs on the host' },
  uuidna_expose: { to: 'list_open_coordinates', why: 'one-word name; it lists ledger coordinates with unsealed structure' },
  uuidna_exec: { to: 'run_app', why: 'one-word name "exec"; it runs an Alpine app (apk, man, a busybox command) in the Layer-1 sandbox' },
  uuidna_decode: { to: 'decode_theorem', why: 'one-word verb name over several targets; its target decodeTheorem splits a theorem key into its parts' },
  uuidna_theorem: { to: 'get_theorem', why: 'a lookup by key reads one record; rule 5 would call it compute because it takes an argument' },
  uuidna_leads_gate: { to: 'check_release_readiness', why: 'house word "gate"; it answers ready only when every source answered and no lead is open' },
  uuidna_gate_status: { to: 'get_server_status', why: 'house word "gate"; it self-tests the per-call check and reports the server\'s health' },
}

/** the words of a snake or camel identifier, lower-cased, prefix dropped: sealToContract → [seal, to, contract] */
export const wordsOf = (id: string): string[] =>
  id.replace(/^uuidna_/, '').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)

/** What a tool's run reaches — the generator's reading of the run, its targets' bodies and the example call. */
export interface Effects { network: boolean; writes: boolean; deletes: boolean; spawns: boolean }

/** MCP tool annotations (2025-06-18), derived from the effects, never typed per tool. */
export interface Annotations { readOnlyHint: boolean; destructiveHint: boolean; idempotentHint: boolean; openWorldHint: boolean }

/** wireHintsOf(a) → the hints as tools/list carries them: destructiveHint only where it means something. MCP reads it
 *  only when readOnlyHint is false, so a read-only tool does not pay for it on every request. */
export const wireHintsOf = (a: Annotations): Partial<Annotations> => {
  const { destructiveHint, ...rest } = a
  return a.readOnlyHint ? rest : { ...rest, destructiveHint }
}

/** annotationsOf(effects) → the hints. Pure → read-only and idempotent. A network read is read-only and open-world,
 *  not promised idempotent (the far side moves). A write, spawn or deletion is not read-only; a spawn reaches outside
 *  the process, so it is open-world; only a deletion is destructive. */
export const annotationsOf = (e: Effects): Annotations => {
  const readOnly = !e.writes && !e.spawns && !e.deletes
  return { readOnlyHint: readOnly, destructiveHint: e.deletes, idempotentHint: readOnly && !e.network, openWorldHint: e.network || e.spawns }
}

/** The inputs to a name: the old name, the run's distinct targets, the behaviour, the required-argument count. */
export interface NameInput { old: string; targets: readonly string[]; effects: Effects; required: number }

const joinName = (verb: string, object: readonly string[]): string => [verb, ...object.filter((w) => w !== verb)].join('_')

/** behaviourVerb(t) → rule 5's verb: what the run reaches, then whether it needs an argument */
export const behaviourVerb = (t: NameInput): string =>
  t.effects.network ? 'fetch' : t.effects.spawns ? 'run' : t.effects.writes || t.effects.deletes ? 'record' : t.required === 0 ? 'get' : 'compute'

/** derivedName(t, declared) → the name rules 1–5 give, and the rule that gave it. Pass declared = {} to read what the
 *  rules alone would say (the names test uses that to refuse a redundant row). */
export const derivedName = (t: NameInput, declared: Readonly<Record<string, { to: string }>> = RENAMES): { name: string; rule: number } => {
  const row = declared[t.old]
  if (row) return { name: row.to, rule: 1 }
  const words = wordsOf(t.old)
  const head = words[0]!, tail = words[words.length - 1]!
  if (words.length > 1 && VERBS[head]) return { name: words.join('_'), rule: 2 }
  if (words.length > 1 && VERBS[tail]) return { name: joinName(tail, words.slice(0, -1)), rule: 3 }
  const lead = t.targets.length === 1 ? wordsOf(t.targets[0]!) : []
  if (lead.length > 1 && VERBS[lead[0]!] && lead[0] !== 'get')
    return { name: words.length === 1 && words[0] === lead[0] ? lead.join('_') : joinName(lead[0]!, words), rule: 4 }
  return { name: joinName(behaviourVerb(t), words), rule: 5 }
}

/** standardNames(tools) → old name → standard name for the whole catalogue. A name two tools derive stays with the
 *  lower rule; the other falls back to rule 5 over its full old object (then with `tool` appended). */
export const standardNames = (tools: readonly NameInput[]): Record<string, string> => {
  const first = tools.map((t) => ({ t, ...derivedName(t) }))
  const holder = new Map<string, { old: string; rule: number }>()
  for (const d of first) {
    const h = holder.get(d.name)
    if (!h || d.rule < h.rule) holder.set(d.name, { old: d.t.old, rule: d.rule })
  }
  const out: Record<string, string> = {}
  const taken = new Set<string>()
  for (const d of first) if (holder.get(d.name)!.old === d.t.old) { out[d.t.old] = d.name; taken.add(d.name) }
  for (const d of first) {
    if (out[d.t.old]) continue
    const words = wordsOf(d.t.old)
    let name = joinName(behaviourVerb(d.t), words)
    if (taken.has(name)) name = joinName(behaviourVerb(d.t), [...words, 'tool'])
    if (taken.has(name)) throw new Error(`mcp-names: ${d.t.old} derives ${name}, already taken — declare it in RENAMES`)
    out[d.t.old] = name; taken.add(name)
  }
  return out
}

/** titleOf(name) → the plain title: the words, first capitalised (verify_statement → Verify statement) */
export const titleOf = (name: string): string => {
  const w = name.split('_').join(' ')
  return w.charAt(0).toUpperCase() + w.slice(1)
}

/** renderNames(text, names) → the text with every old tool name replaced by its standard name */
export const renderNames = (text: string, names: Readonly<Record<string, string>>): string =>
  text.replace(/\buuidna_[a-z0-9_]+/g, (n) => names[n] ?? n)

/** A shape, as the generator recorded it from the tool's actual answer (a JSON Schema fragment). */
export type Shape = { type: string; properties?: Record<string, Shape>; items?: Shape }

/** shapeOf(value, depth) → the JSON Schema of an actual answer, to `depth` levels (a list reads its first item). */
export const shapeOf = (v: unknown, depth = 2): Shape => {
  if (v === null || v === undefined) return { type: 'null' }
  if (Array.isArray(v)) return v.length && depth > 0 ? { type: 'array', items: shapeOf(v[0], depth - 1) } : { type: 'array' }
  if (typeof v === 'object') {
    if (depth <= 0) return { type: 'object' }
    const properties: Record<string, Shape> = {}
    for (const k of Object.keys(v as object)) properties[k] = shapeOf((v as Record<string, unknown>)[k], depth - 1)
    return { type: 'object', properties }
  }
  return { type: typeof v === 'number' && Number.isInteger(v) ? 'integer' : typeof v }
}

/** returnsOf(shape, cap) → the "Returns X" phrase: {a,b,c} for an object, [X] for a list, the type otherwise. */
export const returnsOf = (s: Shape | undefined, cap = 64): string => {
  if (!s) return 'a result'
  if (s.type === 'array') return s.items ? `[${returnsOf(s.items, cap - 2)}]` : '[]'
  if (s.type !== 'object') return s.type
  const keys = Object.keys(s.properties ?? {})
  if (!keys.length) return '{}'
  let out = '{'
  for (const k of keys) {
    const next = (out.length > 1 ? out + ',' : out) + k
    if (next.length + 2 > cap) return out + ',…}'
    out = next
  }
  return out + '}'
}

/** One tool's computed documentation, as scripts/gen-mcp-docs records it (src/mcp-docs.generated.ts). */
export interface ToolDoc {
  name: string
  title: string
  /** the one line tools/list carries */
  description: string
  annotations: Annotations
  effects: Effects
  /** for each effect, the function whose body showed it (or `run`) */
  why?: Partial<Record<keyof Effects, string>>
  /** the effects the example call was seen to attempt */
  observed?: string[]
  /** the JSON Schema of the actual answer to the example call */
  outputSchema?: Shape
  /** the edge's own implementation answers in a different shape */
  edge?: { description: string; outputSchema: Shape }
  example?: { args: Record<string, unknown>; excerpt: string }
  /** documented · varies (answer moves between calls: shape only) · sandboxed (a write/spawn was refused) ·
   *  unreached (the network answered 503 and the tool refused by name) · broken (the example threw) */
  status: 'documented' | 'varies' | 'sandboxed' | 'unreached' | 'broken'
}

/** wireLineOf(name, shape) → the one plain line tools/list carries: "Verb object. Returns X." */
export const wireLineOf = (name: string, shape: Shape | undefined): string => `${titleOf(name)}. Returns ${returnsOf(shape)}.`
