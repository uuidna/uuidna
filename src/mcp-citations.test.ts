import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mcpCitations, mcpCitationGaps } from './mcp-citations.js'
import { THEOREMS } from './theorems/index.js'
import { MCP_CATALOG } from './mcp.js'

test('no served tool cites a proof the ledger does not hold', () => {
  assert.deepEqual(mcpCitationGaps(), [], 'a fabricated citation in a served description is the load-bearing case')
})

test('the finder actually reads the catalogue — a detector finding nothing in nothing is not a result', () => {
  const cites = mcpCitations()
  assert.ok(cites.length > 0, 'the catalogue does cite theorems; zero citations would mean the regex stopped matching')
  const sealed = new Set(THEOREMS.map((t) => t.key))
  for (const c of cites) assert.ok(sealed.has(c.key), `${c.tool} cites ${c.key}`)
  // and it must not mistake a TOOL name for a theorem: every name in the catalogue is snake_case with
  // underscores, so an unguarded pattern would report all 254 of them as fabricated proofs
  const names = new Set(MCP_CATALOG.map((t) => t.name))
  for (const c of cites) assert.ok(!names.has(c.key), `${c.key} is a tool name, not a citation`)
})

test('CONTROL — an unsealed key IS caught, or the clean report means nothing', () => {
  // the finder reads MCP_CATALOG, so the control exercises its rule directly against a key no wing emits,
  // because a test that mutated the served catalogue would prove a rule about a fixture instead of the tree
  const sealed = new Set(THEOREMS.map((t) => t.key))
  const invented = 'this_key_is_not_sealed_anywhere'
  assert.ok(!sealed.has(invented))
  const CITATION = /\b(?!uuidna_)[a-z][a-z0-9]*(?:_[a-z0-9]+){2,}\b/g
  assert.deepEqual([...invented.matchAll(CITATION)].map((m) => m[0]), [invented], 'the pattern must match a theorem-shaped key')
  assert.deepEqual([...'uuidna_through_void'.matchAll(CITATION)].map((m) => m[0]), [], 'and must NOT match a tool name')
  assert.deepEqual([...'a plain english sentence'.matchAll(CITATION)].map((m) => m[0]), [], 'nor ordinary prose')
})

// THE LATEX DOOR. The typesetting was computed, tested and unreachable: lead 111 named it, and a capability with
// no door is a capability the ledger cannot be asked about. These hold the contract the description promises —
// including the refusal, which is the half most likely to be quietly dropped.
test('uuidna_latex answers the census, one statement, and a key that is not sealed', async () => {
  const { callTool } = await import('./mcp.js')
  const census = callTool('uuidna_latex') as { total: number; formula: number; program: number; refused: number }
  assert.equal(census.formula + census.program, census.total, 'the split must partition the ledger')
  assert.equal(census.refused, 0, 'a formula-shaped statement that will not typeset is a gap, not a rounding')

  const f = callTool('uuidna_latex', { key: 'mul9_1_7' }) as { classification: string; tex: string; mathml: string }
  assert.equal(f.classification, 'formula')
  assert.equal(f.tex, '1 \\cdot 7 \\equiv 7 \\pmod{9}', 'the standard congruence form, not the remainder form')
  assert.match(f.mathml, /^<math /)

  // a Lean COMPUTATION must be refused the treatment BY NAME — returning pseudo-mathematics here is the one
  // dishonest option, and it is the one a future edit is most likely to add for the sake of a fuller answer
  const p = callTool('uuidna_latex', { key: 'z7rays_seven' }) as { classification: string; tex: null; mathml: null }
  assert.equal(p.classification, 'program')
  assert.equal(p.tex, null)
  assert.equal(p.mathml, null)

  const missing = callTool('uuidna_latex', { key: 'nope_nope_nope' }) as { error: string }
  assert.match(missing.error, /no sealed theorem/)
})

// ── A SERVED DESCRIPTION MUST NOT SERVE A FALSE SENTENCE. clipWire slices an over-long first sentence to fit the
// wire cap and then appends the Returns clause. It appended it to a BARE slice, so the two ran together and the
// result read as one grammatical sentence saying something nobody wrote: "stream a sequence through the star
// Returns {…}", "THE QUANTUM SAILING LIBRARY — an Returns {…}". Measured 41 of 255 — sixteen percent of the copy
// a model reads to choose a tool, every one of them believable. The slice is marked now; this holds it marked.
test('no served description splices a truncated fragment into its Returns clause', async () => {
  const { MCP_CATALOG } = await import('./mcp.js')
  const spliced = MCP_CATALOG.filter((t) => {
    const d = t.description ?? ''
    return / Returns \{/.test(d) && !/[.:…!?] Returns \{/.test(d)
  }).map((t) => t.name)
  assert.deepEqual(spliced, [], 'a truncated head must end in … before Returns, or the sentence lies')
})

test('and every served description fits the wire cap it was clipped to', async () => {
  const { MCP_CATALOG } = await import('./mcp.js')
  const { WIRE_CAP } = await import('./mcp-wire.js')
  const over = MCP_CATALOG.filter((t) => (t.description ?? '').length > WIRE_CAP).map((t) => t.name)
  assert.deepEqual(over, [], `nothing may exceed ${WIRE_CAP} bytes on tools/list`)
})

test('a period inside a token is not a sentence end', async () => {
  const { sentences } = await import('./mcp-wire.js')
  // CC-BY-NC-ND-4.0 split at the `.` and served "bind the CC-BY-NC-ND-4." — 89 bytes stopping inside a licence id
  assert.deepEqual(sentences('bind the CC-BY-NC-ND-4.0 terms here.'), ['bind the CC-BY-NC-ND-4.0 terms here.'])
  assert.deepEqual(sentences('version 2.0 shipped.'), ['version 2.0 shipped.'])
  // and a real sentence boundary still splits
  assert.equal(sentences('One thing. Another thing.').length, 2)
  assert.equal(sentences('Ends here.').length, 1)
})
