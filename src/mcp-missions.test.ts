// uuidna_missions — the served board held to the module it wraps: same rows as missionsOf over the shipped
// inputs, an unknown kind refuses with nothing computed, and the filters narrow the rows without moving the totals.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'
import { missionsOf, MISSION_KINDS, type MissionBoard } from './school/missions/index.js'
import { BOUND_SLICE, MISSION_CAPTAIN } from './school/missions/generated.js'
import { mirrorRows } from './rosetta-legs.js'
import { FINDINGS } from './research-ledger.js'

const board = async (args: Record<string, unknown> = {}): Promise<MissionBoard> => (await callTool('uuidna_missions', args)) as MissionBoard

test('uuidna_missions serves exactly missionsOf over the shipped mirror, the baked slice and the baked findings', async () => {
  const served = await board()
  const local = missionsOf({ rows: mirrorRows(), bounds: BOUND_SLICE, findings: FINDINGS, captain: MISSION_CAPTAIN })
  assert.equal(served.total, local.total)
  assert.deepEqual(served.byKind, local.byKind)
  assert.deepEqual(served.missions.map((m) => m.handle), local.missions.map((m) => m.handle), 'the served rows are the module\'s rows, in its order')
  assert.equal(served.captain, MISSION_CAPTAIN)
  assert.ok(served.total > 0 && served.missions.length === served.total)
})

test('uuidna_missions filters narrow the rows and leave the totals whole', async () => {
  const whole = await board()
  for (const kind of MISSION_KINDS) {
    const k = await board({ kind })
    assert.equal(k.total, whole.total, 'total counts every open record whatever the filter')
    assert.ok(k.missions.length > 0 && k.missions.every((m) => m.kind === kind), `${kind}: only that kind`)
    assert.equal(k.missions.length, whole.byKind[kind], `${kind}: the filtered rows are the byKind count`)
  }
  const capped = await board({ limit: 3 })
  assert.equal(capped.missions.length, 3)
  const fermat = await board({ wing: 'Fermat' })
  assert.ok(fermat.missions.every((m) => m.wing === 'Fermat.lean'), 'a bare wing name matches the .lean file')
})

test('uuidna_missions refuses an unknown kind by name, with nothing computed', async () => {
  await assert.rejects(board({ kind: 'lottery' }), /unknown kind "lottery"/)
})
