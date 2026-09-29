// uuidna_wing — the door the gap log asked for 215 times, and the three answers it must keep apart.
//
// audit-door-demand ranks the recorded escapes and "a door that wings" is the largest family by two and a half times.
// This holds the contract that makes the door worth having rather than merely present.
//
// THE DEFS LEG IS PROVED ON A WING THAT HAS DEFS. CoinsBalance answers 0 defs, which is true and is also what a door
// whose parser is never reached would answer — so a test that only asked CoinsBalance would pass with the leg dead.
// Uuidna.lean carries sig, tau and kap: the definitions the second implementation had to be taught in 2026-09-06.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'
import { theorems } from './theorems/index.js'

const call = async (args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const r = await callTool('uuidna_wing', args)
  return (typeof r === 'string' ? JSON.parse(r) : r) as Record<string, unknown>
}

test('uuidna_wing reads a wing: its theorems, its principle and the size of its Lean', async () => {
  const w = await call({ wing: 'CoinsBalance' })
  assert.equal(w.wing, 'CoinsBalance.lean', 'the .lean suffix is supplied when omitted')
  assert.ok((w.count as number) > 0, 'a served wing has sealed theorems')
  assert.equal((w.theorems as unknown[]).length, w.count, 'the count is the list, not a second tally')
  assert.ok((w.principles as string[]).length > 0, 'and the principles it is filed under')
  assert.ok((w.bytes as number) > 0, 'its Lean has a size')
})

// THE LEG THAT COULD HAVE BEEN DEAD
test('uuidna_wing parses a wing’s own definitions where the wing has them', async () => {
  const w = await call({ wing: 'Uuidna.lean' })
  const defs = w.defs as { name: string }[]
  assert.ok(defs.length > 0, 'Uuidna.lean carries wing-local defs; zero here means the parser is never reached')
  for (const d of defs) assert.equal(typeof d.name, 'string')
})

// THREE ANSWERS, NOT TWO: withheld is not absent, and absent is not empty.
test('uuidna_wing withholds the source until asked, and never substitutes an empty string', async () => {
  const without = await call({ wing: 'Uuidna.lean' })
  assert.equal(without.source, null, 'not asked for is null, never ""')
  assert.ok((without.bytes as number) > 0, 'and the byte count still says the wing is not empty')
  const with_ = await call({ wing: 'Uuidna.lean', source: true })
  assert.equal(typeof with_.source, 'string', 'asked for, the raw Lean arrives')
  assert.equal((with_.source as string).length, with_.bytes, 'the bytes reported are the bytes returned')
})

test('uuidna_wing refuses an unknown wing by name, and does not answer an empty set', async () => {
  const r = await call({ wing: 'NotAWing' })
  assert.equal(r.refused, true)
  assert.match(String(r.why), /NotAWing/, 'the refusal quotes what was asked')
  assert.match(String(r.why), /\d+ wings are served/, 'and says how many exist, so the caller is not told nothing proves')
  assert.equal(r.count, undefined, 'a refusal is not a wing with zero theorems')
})

test('every wing the ledger names is readable through the door — no wing is served and unreachable', async () => {
  const files = [...new Set(theorems().map((t) => String(t.file)))]
  const unreadable: string[] = []
  for (const f of files) {
    const w = await call({ wing: f })
    if (w.refused === true || (w.count as number) < 1) unreadable.push(f)
  }
  assert.deepEqual(unreadable, [], 'a wing in the ledger that the door cannot read is the gap this door was built to close')
})
