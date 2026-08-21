// llm.txt — the first thing an agent reads, and until now the only generated surface with no test.
//
// It is generated from the ledger, which makes it exactly as trustworthy as its generator. A fabricated theorem
// key here would be read and cited by every agent that loads it, and nothing would have caught it — the same shape
// as the ledger that witnessed itself.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { theorems } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'

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

// ── ORDER. An agent should be able to connect before it has read anything else.
test('the MCP connection comes before the exposition', () => {
  const t = txt()
  const connect = t.indexOf('## Connect first')
  assert.ok(connect > 0, 'the connect block must exist')
  for (const later of ['## THE RULE', '## The coins first', '## Hard rules']) {
    assert.ok(t.indexOf(later) > connect, `${later} must come after the connection`)
  }
  assert.ok(connect < 1200, 'the connection must be reachable in the first screenful')
})

// ── SLIM. A budget only means something if something enforces it.
test('llm.txt stays within its size budget', () => {
  const n = Buffer.byteLength(txt(), 'utf8')
  assert.ok(n <= 6000, `llm.txt is ${n} bytes; it is the first thing an agent loads and must stay slim`)
  assert.ok(n > 2000, 'and it must not have silently emptied')
})

// ── THE RULES THAT PREVENT AGENT FAILURE. Each was earned by a real failure in this repository.
test('the operational hard rules survive regeneration', () => {
  const t = txt()
  for (const rule of [/Math\.\*/, /exit code/i, /use is not mention|Use is not mention/, /git add -A/])
    assert.match(t, rule, 'a hard rule was lost from the generated file')
})

// ── NO FROZEN COUNTS. A number written into prose is a claim with no way to stay true.
test('it does not freeze a ledger count that will drift', () => {
  const stale = [...txt().matchAll(/\b(\d{3,5})\s+(?:theorems|lessons|tools)\b/gi)]
    .map((m) => Number(m[1]))
    .filter((n) => n !== theorems().length && n !== MCP_CATALOG.length)
  assert.deepEqual(stale, [], 'a count in prose must equal the live figure, or not be written at all')
})
