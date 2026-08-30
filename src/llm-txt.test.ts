// llm.txt — the first thing an agent reads, and until now the only generated surface with no test.
//
// It is generated from the ledger, which makes it exactly as trustworthy as its generator. A fabricated theorem
// key here would be read and cited by every agent that loads it, and nothing would have caught it — the same shape
// as the ledger that witnessed itself.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems, toUuid } from './index.js'
import { handleOf } from './index.js'
import { MCP_CATALOG } from './mcp.js'

const txt = (): string => readFileSync(new URL('../../llm.txt', import.meta.url), 'utf8')

// ── CITATIONS. Every identifier it names must be a sealed theorem OR a dispatching tool.
//
// Checked against BOTH sets at once rather than partitioned by prefix. The first version split them on `uuidna_`
// and a theorem key beginning with that prefix — uuidna_is_dna_times_the_two_coins — fell through both checks,
// excluded from one and wrongly demanded of the other. A prefix is a naming convention.
test('every identifier cited in llm.txt is a sealed theorem or a real tool', () => {
  const known = new Set([...theorems().map((t) => t.key), ...MCP_CATALOG.map((t) => t.name)])
  const cited = [...new Set([...txt().matchAll(/`([a-z][a-z0-9_]{4,})`/g)].map((m) => m[1]))]
    .filter((k) => k.includes('_') && !k.startsWith('npm'))
  assert.ok(cited.length > 5, `expected real citations, saw ${cited.length}`)
  const fabricated = cited.filter((k) => !known.has(k))
  assert.deepEqual(fabricated, [], 'a fabricated citation would be read and repeated by every agent that loads this')
})

test('it cites both kinds — theorems to verify, and tools to call', () => {
  const keys = new Set(theorems().map((t) => t.key))
  const tools = new Set(MCP_CATALOG.map((t) => t.name))
  const cited = [...new Set([...txt().matchAll(/`([a-z][a-z0-9_]{4,})`/g)].map((m) => m[1]))]
  assert.ok(cited.some((c) => keys.has(c)), 'no theorem cited — the claims would be unbacked')
  assert.ok(cited.some((c) => tools.has(c)), 'no tool cited — an agent could not act on it')
})

// ── ORDER. The claim and its proof lead; an agent can still connect without scrolling.
test('the proof leads and the endpoint is reachable in one screenful', () => {
  const t = txt()
  assert.ok(t.indexOf('```lean') < 400, 'the Lean proof must lead the file')
  assert.ok(t.indexOf('https://uuidna.com/mcp') > 0, 'the endpoint must be present')
  assert.ok(t.indexOf('## Agree, then contribute') > t.indexOf('```lean'), 'the licence follows the proof')
})

// ── SLIM. A budget only means something if something enforces it.
test('llm.txt stays within its size budget', () => {
  const n = Buffer.byteLength(txt(), 'utf8')
  assert.ok(n <= 2500, `llm.txt is ${n} bytes; it is the first thing an agent loads and must stay slim`)
  assert.ok(n > 800, 'and it must not have silently emptied')
})

// ── THE PAYLOAD RESOLVES. The operational rules moved out of the inline file and into content-addressed
// chunks named by their 8-hexbit handle, so llm.txt costs an index line instead of the whole text on every
// session. That is only honest if the handles actually open: an index naming a chunk nobody can fetch is worse
// than the bytes it saved. Every handle is checked against the chunk it names, and the chunk against its own
// address — same bytes, same handle, or the name moved and the index is stale.
test('every payload handle resolves to the chunk it names', () => {
  const t = txt()
  const listed = [...t.matchAll(/^- `([0-9a-f]{8})` — (.+)$/gm)]
  assert.ok(listed.length >= 4, `expected the payload index, saw ${listed.length} entries`)
  for (const [, handle, title] of listed) {
    const path = join(ROOT, 'docs', 'public', 'chunk', handle + '.json')
    assert.ok(existsSync(path), `${handle} (${title}) is indexed but no chunk exists at ${path}`)
    const chunk = JSON.parse(readFileSync(path, 'utf8')) as { handle: string; body: string; title: string }
    assert.equal(chunk.handle, handle, 'the chunk must carry the handle it is filed under')
    assert.equal(handleOf(toUuid(chunk.body)), handle, `${handle} does not content-address to its own body`)
    assert.ok(chunk.body.length > 100, `${handle} resolves to an empty payload`)
  }
})

// the rules themselves must survive SOMEWHERE — inline or in the payload they moved to
test('the operational hard rules survive regeneration, in the payload', () => {
  const t = txt()
  const listed = [...t.matchAll(/^- `([0-9a-f]{8})`/gm)].map((m) => m[1])
  const all = t + listed.map((h) => {
    const p = join(ROOT, 'docs', 'public', 'chunk', h + '.json')
    return existsSync(p) ? (JSON.parse(readFileSync(p, 'utf8')) as { body: string }).body : ''
  }).join('\n')
  for (const rule of [/Math\.\*/, /exit code/i, /use is not mention|Use is not mention/, /git add -A/])
    assert.match(all, rule, 'a hard rule was lost from the generated file and its payload')
})

// ── NO FROZEN COUNTS. A number written into prose is a claim with no way to stay true.
test('it does not freeze a ledger count that will drift', () => {
  const stale = [...txt().matchAll(/\b(\d{3,5})\s+(?:theorems|lessons|tools)\b/gi)]
    .map((m) => Number(m[1]))
    .filter((n) => n !== theorems().length && n !== MCP_CATALOG.length)
  assert.deepEqual(stale, [], 'a count in prose must equal the live figure, or not be written at all')
})
