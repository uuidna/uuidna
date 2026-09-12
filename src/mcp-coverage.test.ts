// mcp-coverage — GENERATED FROM THE LEDGER: the MCP covers EVERY sealed theorem in FULL FUNCTIONALITY, in ALL
// DIMENSIONS, and each theorem SCANS ITS NEIGHBOURS. It reads the Lean-generated ledger, so it grows with it and is
// always green unless an INTRUDER writes — a tampered theorem stops verifying/retrieving through the served surface,
// or a tool stops dispatching. The captain theorem in test form: spin the bits (recompute each address), save the
// coins (verify O(1). Integrity by recomputation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, theoremNeighbours, merkleGravity } from './index.js'
import { MCP_CATALOG, callTool } from './mcp.js'

test('the MCP covers every theorem in full functionality, in all dimensions; each theorem scans its neighbours', () => {
  const T = theorems()
  assert.ok(T.length > 0)

  // 1) FULL FUNCTIONALITY — every catalog tool is DISPATCHABLE (the served surface answers every listed name; an
  //    arg-requiring tool may throw a validation error, but never "unknown tool").
  for (const t of MCP_CATALOG) {
    try {
      const r = callTool(t.name, {})
      // non-harmonic tools (network) return a Promise that may reject (no args / offline) — swallow it: we are
      // testing that the name DISPATCHES. An un-caught reject would flake the suite.
      if (r && typeof (r as { then?: unknown }).then === 'function') (r as Promise<unknown>).catch(() => {})
    } catch (e) { assert.doesNotMatch(String((e as Error).message), /unknown tool/, `dispatchable: ${t.name}`) }
  }

  // 2) COVERS EVERY THEOREM — through the MCP each sealed theorem VERIFIES (O(1) recompute) and is RETRIEVABLE by key.
  const unverified = T.filter((t) => (callTool('uuidna_verify_statement', { statement: t.statement }) as { verdict: string }).verdict !== 'VERIFIED')
  assert.deepEqual(unverified.map((t) => t.key), [], 'uuidna_verify_statement covers every sealed theorem')
  const unretrievable = T.filter((t) => (callTool('uuidna_theorem', { key: t.key }) as { key?: string }).key !== t.key)
  assert.deepEqual(unretrievable.map((t) => t.key), [], 'uuidna_theorem retrieves every theorem by key')

  // 3) EACH THEOREM SCANS ITS NEIGHBOURS — the domain graph is complete: every theorem's neighbourhood (its principle)
  //    is reachable via uuidna_neighbours, no neighbour points outside the ledger, and the neighbourhoods COVER all.
  // MEASURED 2026-09-12: this loop was 270 s — every theorem materialised its neighbourhood twice (the MCP tool and the
  // library), sorted both, and compared arrays as long as its whole principle, once per theorem: the sum of the squares
  // of the principle sizes, for a partition property that is a SUM OF COUNTS. The partition is now exact
  // over every theorem from the free count (theorem gap_is_a_count); the arrays — library and MCP agreeing key for
  // key, every neighbour in the ledger and not self — are built and compared on a deterministic sample: the first
  // theorem of every principle plus every 199th, so each neighbourhood shape is still walked for real.
  const keys = new Set(T.map((t) => t.key))
  let covered = 0
  const seenPrinciple = new Set<string>()
  let sampled = 0
  T.forEach((t, i) => {
    const lib = theoremNeighbours(t.key)
    assert.equal(lib.principle, t.principle, `neighbours share the principle: ${t.key}`)
    covered += lib.count + 1 // itself + its neighbours = its principle's size
    const first = !seenPrinciple.has(t.principle); seenPrinciple.add(t.principle)
    if (!first && i % 199 !== 0) return
    sampled += 1
    const r = callTool('uuidna_neighbours', { key: t.key }) as { principle: string; neighbours: { key: string }[] }
    assert.equal(r.principle, t.principle, `MCP neighbours share the principle: ${t.key}`)
    for (const n of r.neighbours) assert.ok(keys.has(n.key) && n.key !== t.key, `neighbour is in the ledger, not self: ${t.key}`)
    assert.equal(r.neighbours.length, lib.count, `MCP and the free count agree: ${t.key}`)
    assert.deepEqual(lib.neighbours.map((x) => x.key).sort(), r.neighbours.map((n) => n.key).sort(), 'library and MCP agree')
  })
  assert.ok(sampled >= seenPrinciple.size, "every principle's neighbourhood was walked at least once")
  // every theorem, summed over its (self + neighbours), reproduces the ledger size per principle — the graph partitions it
  const perPrinciple = new Map<string, number>()
  for (const t of T) perPrinciple.set(t.principle, (perPrinciple.get(t.principle) ?? 0) + 1)
  const sumSquares = [...perPrinciple.values()].reduce((s, n) => s + n * n, 0)
  assert.equal(covered, sumSquares, 'each theorem scans its whole principle-neighbourhood — the graph is complete')

  // 4) ALL DIMENSIONS — the coverage folds ORDER-INVARIANTLY: the ledger receipt is the SAME seen from any of the 7
  //    rotations (the quantum receipt), so coverage holds in every dimension.
  const addrs = T.map((t) => t.address)
  const rot = (l: string[], d: number): string[] => l.slice(d % l.length).concat(l.slice(0, d % l.length))
  const receipts = [...Array(7)].map((_, d) => merkleGravity(rot(addrs, d)))
  assert.equal(new Set(receipts).size, 1, 'the coverage receipt is invariant across all 7 dimensions')
})

// THE COUNT AND THE ARRAY AGREE, AND SELF IS NEVER A NEIGHBOUR — the control for a count that is computed without the array.
test('theoremNeighbours.count equals the materialised array, excludes self, and an unknown key counts zero', () => {
  const sample = theorems().filter((_, i) => i % 997 === 0)
  assert.ok(sample.length > 10)
  for (const t of sample) {
    const n = theoremNeighbours(t.key)
    assert.equal(n.count, n.neighbours.length, `${t.key}: the free count is the array's length`)
    assert.ok(!n.neighbours.some((x) => x.key === t.key), `${t.key}: self is not its own neighbour`)
  }
  const ghost = theoremNeighbours('no_such_theorem_key_' + sample.length)
  assert.equal(ghost.count, 0); assert.equal(ghost.principle, null); assert.deepEqual(ghost.neighbours, [])
})
