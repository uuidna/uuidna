// missions — the board held to its laws: pure and deterministic, every open record lands exactly once, a closed
// record never lands, the baked slice IS the sealed census (never a lagging copy), and a control that must fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { missionsOf, MISSION_KINDS, type BoundSlice } from './index.js'
import { BOUND_SLICE, MISSION_CAPTAIN } from './generated.js'
import { mirrorRows } from '../../rosetta-legs.js'
import { FINDINGS, type Finding } from '../../research-ledger.js'
import { LEAN_LEDGER } from '../../theorems/generated.js'
import { ROOT, HERE } from '../../scripts/api.js'
import { isWidenable } from '../../bound-perturbation.js'

const sha = (s: string): string => createHash('sha256').update(s).digest('hex').slice(0, 16)
const bounds: BoundSlice = { digest: 'test', rows: [
  { key: 'a_one', wing: 'Alpha.lean', verdict: 'survived-widening' },
  { key: 'a_two', wing: 'Alpha.lean', verdict: 'load-bearing' },
  { key: 'b_one', wing: 'Beta.lean', verdict: 'survived-widening' },
] }
const findings: Finding[] = [
  { claim: 'open value', value: '1', units: 'u', source: 's', status: 'read', kind: 'convention' },
  { claim: 'sealed value', value: '2', units: 'u', source: 's', status: 'read', kind: 'convention', theorem: 'some_key' },
]
const rows = [
  { key: 'a_one', wing: 'Alpha.lean', legs: ['proof', 'falsifier', 'address'], missing: ['symbol', 'witness'], claimedBy: 'captain' },
  { key: 'a_two', wing: 'Alpha.lean', legs: ['symbol', 'proof', 'falsifier', 'address'], missing: ['witness'], claimedBy: 'captain' },
] as Parameters<typeof missionsOf>[0]['rows']

test('deterministic, and every open record lands exactly once while a closed one never lands', () => {
  const a = missionsOf({ rows, bounds, findings, captain: 'c' })
  const b = missionsOf({ rows, bounds, findings, captain: 'c' })
  assert.deepEqual(a, b)
  assert.equal(a.byKind['seal-finding'], 1, 'the finding with a theorem is closed and must not be a mission')
  assert.equal(a.byKind['decide-bound'], 2, 'one mission per wing with a survivor; the load-bearing row is closed')
  assert.equal(a.byKind['symbol-leg'], 1, 'one wing lacks a symbol leg')
  const covered = a.missions.filter((m) => m.kind === 'decide-bound').flatMap((m) => m.keys)
  assert.deepEqual(covered.sort(), ['a_one', 'b_one'], 'every survivor appears exactly once')
  assert.equal(a.total, a.missions.length)
  for (const m of a.missions) assert.match(m.handle, /^[0-9a-f]{8}$/, 'a mission handle is the eight-hex handle of its own address')
  assert.ok(new Set(a.missions.map((m) => m.handle)).size === a.missions.length, 'handles are distinct')
})

test('kind, wing and limit filter the rows and leave the totals whole', () => {
  const k = missionsOf({ rows, bounds, findings, captain: 'c', kind: 'decide-bound' })
  assert.ok(k.missions.every((m) => m.kind === 'decide-bound') && k.total === 4)
  const w = missionsOf({ rows, bounds, findings, captain: 'c', wing: 'alpha' })
  assert.deepEqual(w.missions.map((m) => m.kind).sort(), ['decide-bound', 'symbol-leg'], 'a bare wing name matches Wing.lean')
  assert.equal(missionsOf({ rows, bounds, findings, captain: 'c', limit: 1 }).missions.length, 1)
})

test('generated.ts IS the sealed bound census, and the census was decided under the current ledger', () => {
  const sealed = JSON.parse(readFileSync(join(ROOT, 'lean', 'bound-census.json'), 'utf8')) as { digest: string; instrument: string; rows: { key: string; wing: string; verdict: string; statement: string }[] }
  assert.deepEqual(BOUND_SLICE, { digest: sealed.digest, rows: sealed.rows.map(({ key, wing, verdict }) => ({ key, wing, verdict })) },
    'src/school/missions/generated.ts lags lean/bound-census.json — run `npm run x -- gen-missions`')
  const instrument = sha(readFileSync(join(HERE, '..', 'bound-perturbation.js'), 'utf8'))
  const bounded = LEAN_LEDGER.filter((t) => isWidenable(t.statement))
  const live = sha(instrument + '\n' + bounded.map((t) => `${t.key}|${t.statement}`).join('\n'))
  assert.equal(sealed.digest, live, 'lean/bound-census.json was decided under another ledger or instrument — run `npm run x -- gen-bound-census` (incremental: only moved statements are re-decided)')
  const claims = JSON.parse(readFileSync(join(ROOT, 'docs', 'captain-claims.json'), 'utf8')) as { captain_authority: string }
  assert.equal(MISSION_CAPTAIN, claims.captain_authority, 'the baked captain must be the claims record\'s, never typed')
})

test('the live board is non-empty in every kind, and its keys are sealed theorems', () => {
  const board = missionsOf({ rows: mirrorRows(), bounds: BOUND_SLICE, findings: FINDINGS, captain: MISSION_CAPTAIN })
  const keys = new Set(LEAN_LEDGER.map((t) => t.key))
  for (const k of MISSION_KINDS) assert.ok(board.byKind[k] > 0, `${k}: an empty kind on this tree means a spring is unread, not that the work is done`)
  for (const m of board.missions) for (const k of m.keys) assert.ok(keys.has(k), `${m.handle} covers ${k}, which the ledger does not seal`)
})

test('CONTROL — a finding that loses its theorem field reappears as a mission', () => {
  const closed = missionsOf({ rows: [], bounds: { digest: 't', rows: [] }, findings: [findings[1]!], captain: 'c' })
  assert.equal(closed.total, 0)
  const reopened = missionsOf({ rows: [], bounds: { digest: 't', rows: [] }, findings: [{ ...findings[1]!, theorem: undefined }], captain: 'c' })
  assert.equal(reopened.total, 1, 'the board must be able to grow, or it cannot be trusted to shrink')
})
