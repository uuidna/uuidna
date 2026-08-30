// alpine-agent-wave — AGENTS TEST EVERY ALPINE APP IN ONE WAVE, THE WAY NATURE ALREADY SHARDS WORK.
//
// Nothing new is named. Each package already tests itself (packageSelfTest — uuidnaOS executes nothing,
// theorem the_os_is_bootable_quantum). The wave executor already runs a width of jobs at once (runWaves).
// The handle already routes without a lock (laneOf — the vector equilibrium's 14 faces, the same count
// upgrade-wave uses). Agents already agree by comparing 128 bits (receipt — theorem unison_is_collision).
// The reasoner already cites modus ponens / the hypothetical syllogism. This suite COMPOSES those over
// the live catalogue and purges the rest: no new theorem key, no coordinator, no intelligence layer,
// no execution of Alpine.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runWaves, type WaveJob } from '../quantum/os/waves/index.js'
import {
  catalogue, catalogueCompile, packageSelfTest, type CataloguePackage,
} from '../quantum/os/catalogue/index.js'
import { laneOf, handleOf, handlePath, handleOfPath, isHandle } from '../handle.js'
import { empty, remember, union, receipt, verify, missing, type Store } from '../agent/memory/index.js'
import { reason } from '../reason.js'
import { HANDLE_HEXBITS } from '../hexbit/index.js'

/** vector-equilibrium faces — upgrade-wave's default, measured on the live ledger in lanes.test.ts */
const FACES = 14

interface Share {
  lane: number
  packages: CataloguePackage[]
  brokenHandles: string[]
}

let CACHED: Share[] | null = null
function shard(): Share[] {
  if (CACHED) return CACHED
  const shares: Share[] = Array.from({ length: FACES }, (_, lane) => ({ lane, packages: [], brokenHandles: [] }))
  for (const p of catalogue()) {
    const { address } = catalogueCompile(p)
    const h = handleOf(address)
    const lane = laneOf(address, FACES)
    if (!isHandle(h) || h.length !== HANDLE_HEXBITS || handleOfPath(handlePath(h)) !== h) {
      shares[lane]!.brokenHandles.push(p.name)
    }
    shares[lane]!.packages.push(p)
  }
  return (CACHED = shares)
}

function honestPass(p: CataloguePackage): boolean {
  return packageSelfTest(p).ok
}

test('fourteen agents test the whole catalogue in ONE wave — partitioned, concurrent, no coordinator', async () => {
  const shares = shard()
  const catalogued = catalogue()
  const gathered = shares.flatMap((s) => s.packages)
  assert.equal(gathered.length, catalogued.length, 'the faces together hold every app and nothing extra')
  assert.equal(new Set(gathered.map((p) => p.name)).size, catalogued.length, 'no app in two faces — that is the collision')
  assert.ok(shares.every((s) => s.packages.length > 0), 'no face sits idle while others work')
  assert.ok(shares.every((s) => s.brokenHandles.length === 0),
    `every app handle must round-trip: ${shares.flatMap((s) => s.brokenHandles).slice(0, 5).join(', ')}`)
  assert.ok(catalogued.length > 25000, `Alpine publishes tens of thousands; got ${catalogued.length}`)

  const memories: Store[] = Array.from({ length: FACES }, () => empty())
  const jobs: WaveJob[] = shares.map((s) => ({
    name: `face-${s.lane}`,
    run: () => {
      let passed = 0
      const defects: string[] = []
      for (const p of s.packages) {
        if (honestPass(p)) passed++
        else defects.push(p.name)
      }
      memories[s.lane] = remember(empty(), 'tally',
        `face ${s.lane} tested ${s.packages.length} passed ${passed}`).store
      return { ok: defects.length === 0 }
    },
  }))

  const wave = await runWaves(jobs, { width: FACES })
  assert.equal(wave.waves.length, 1, 'width = faces, so every agent runs in the same wave')
  assert.equal(wave.jobs, FACES)
  assert.equal(wave.okTotal, FACES, 'every face share is closed — no allowed self-test gaps')
})

test('agents communicate by receipt — merge order cannot change what they agree on, and they build the cover by reasoning', async () => {
  const shares = shard()
  const memories = shares.map((s) =>
    remember(empty(), 'tally', `face ${s.lane} tested ${s.packages.length}`).store)

  let folded = empty()
  for (const m of memories) folded = union(folded, m)
  let reversed = empty()
  for (const m of [...memories].reverse()) reversed = union(reversed, m)
  assert.equal(receipt(folded), receipt(reversed), 'union in either order is one receipt — unison_is_collision')
  assert.equal(folded.size, FACES, 'fourteen tallies, one per face')
  assert.equal(missing(folded, reversed).length, 0)
  assert.ok([...folded.values()].every((r) => verify(r).ok), 'a recollection from another agent is checked, not trusted')

  const laneFacts = shares.map((s) => `face-${s.lane}-complete`)
  const built = reason(
    [...laneFacts, 'partition', 'handles-round-trip'],
    [{ if: [...laneFacts, 'partition', 'handles-round-trip'], then: 'wave-covers-alpine' }],
  )
  assert.ok(built.derived.includes('wave-covers-alpine'))
  assert.equal(built.trace[0]!.cites, '/theorem/hypothetical_syllogism')
  assert.ok(built.reachedFixpoint)

  const short = reason(
    [...laneFacts.slice(1), 'partition', 'handles-round-trip'],
    [{ if: [...laneFacts, 'partition', 'handles-round-trip'], then: 'wave-covers-alpine' }],
  )
  assert.equal(short.derived.includes('wave-covers-alpine'), false,
    'thirteen faces do not cover the catalogue — the control that proves the rule can fail')
})

test('two agents on the same face collide — the assignment is the address, not who asked first', () => {
  const shares = shard()
  const a = new Set(shares[3]!.packages.map((p) => p.name))
  const b = new Set(shares[3]!.packages.map((p) => p.name))
  assert.deepEqual([...a].sort(), [...b].sort(), 'the same face, asked twice, is the same work')
  const other = new Set(shares[4]!.packages.map((p) => p.name))
  for (const name of a) assert.equal(other.has(name), false, `${name} must not land in two faces`)
})
