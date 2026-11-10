import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { facesOf, hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WaveFormulas, waveFamiliesOf } from './index.js'
import '../../mcp/families.js'

/** One call launches a wave of agents and answers one receipt: the calls saved are the agents less the waves, the
 *  unit runs the same programs, and no door or wave is launched by a wave. */
test('wave: one call launches faces agents and answers one receipt; the calls saved are counted', async (t) => {
  const names = waveFamiliesOf()
  assert.ok(names.length >= 3 && !names.includes('wave') && !names.includes('data') && !names.includes('gate'), 'no door and not itself: no wave recurses')
  const faces = facesOf().faces
  const i = names.indexOf('tesla') >= 0 ? names.indexOf('tesla') : 0
  const w = (await WaveFormulas.wave(i, 0)) as unknown as { value: number; holds: boolean; agents: number; calls: number; saved: number; next: number; receipt: string }
  assert.equal(w.calls, 1)
  const called = (hexFamiliesOf().get(names[i]!) ?? []).filter((x) => x.arity <= 1)
  assert.equal(w.agents, called.length * faces, 'one amount calls a formula of arity 0 or 1')
  assert.equal(w.saved, w.agents - 1, 'the calls saved by one wave')
  assert.equal(w.next, faces)
  assert.ok(w.holds && w.value > 0, 'some agent held')
  assert.match(w.receipt, /^[0-9a-f-]{36}$/, 'one receipt for the wave')
  const s = (await WaveFormulas.sweep(0)) as unknown as { value: number; agents: number; families: string[]; silent: string[] }
  const swept = names.slice(0, faces).filter((family) => (hexFamiliesOf().get(family)?.[0]?.arity ?? 2) <= 1)
  assert.equal(s.agents, swept.length, 'the seed fills one parameter; a wider first formula is not called')
  assert.equal(s.value + s.silent.length, s.families.length)
  const n = 16
  assert.equal(Number(WaveFormulas.saved(n).value), Number(WaveFormulas.agents(n).value) - Number(WaveFormulas.waves(n).value))
  assert.equal(Number(WaveFormulas.waves(faces).value), names.length, 'faces inputs: one wave per family')
  // the massive wave: every family, every program of one or two formulas, inputs 1 … 2, at once — timed
  // the massive wave: every family's address fired at once by the caller; here one family — its every program of one
  // or two formulas × inputs 1 … 4 — timed
  const m = (await WaveFormulas.massive(i)) as unknown as { value: number; agents: number; signals: string[]; calls: number; programs: number }
  assert.equal(m.calls, 1)
  const k = hexFamiliesOf().get(names[i]!)!.length
  assert.equal(m.programs, k + k * k, 'every program of one or two formulas')
  const fs = hexFamiliesOf().get(names[i]!)!
  const callable = fs.filter((x) => x.arity <= 1).length + fs.reduce((n, x) => n + fs.filter((y) => Math.max(x.arity, y.arity) <= 1).length, 0)
  assert.ok(m.agents === callable * 4 && m.value > 0, `${m.agents} agents`)
  assert.ok(m.signals.every((u) => /^[0-9a-f-]{36}$/.test(u)), 'every signal is a UUID')
  // a program as a hex combination: 0x21 is the second formula composed with the first
  const c = (await WaveFormulas.combo(i, 0x21, 0)) as unknown as { program: string[]; agents: number; holds: boolean }
  assert.deepEqual(c.program, [hexFamiliesOf().get(names[i]!)![1]!.name, hexFamiliesOf().get(names[i]!)![0]!.name])
  const comboArity = Math.max(hexFamiliesOf().get(names[i]!)![1]!.arity, hexFamiliesOf().get(names[i]!)![0]!.arity)
  assert.equal(c.agents, comboArity <= 1 ? faces : 0)
  assert.equal((await WaveFormulas.combo(i, 0xf, 0)).holds, false, 'a digit past the family names no formula')
  // the remote agents: a slice of the AI APIs read for the credential they ask and called free; the reading says which
  const rem = (await WaveFormulas.remote(0)) as unknown as { value: number; matched: number; agents: string[]; calls: number }
  assert.equal(rem.calls, 1)
  assert.ok(rem.matched > 0, 'the registry names AI APIs')
  assert.equal(rem.agents.length, Math.min(rem.value, faces))
  uuidReceiptOf('wave remote', contentUuidOf(rem), { agents: rem.value })
  // the wave at its own address through the unit
  // the token bill: free remote agents are keyless public APIs — no key, no token, no bill; only keyed APIs or model leads bill
  assert.equal(Number(WaveFormulas.bill(14, 0, 0).value), 0, 'a wave of 14 keyless public APIs costs no tokens')
  assert.equal(WaveFormulas.bill(14, 0, 0).holds, true, 'no token bill — holds')
  assert.equal(Number(WaveFormulas.bill(14, 2, 1).value), 3, 'two keyed APIs and one model lead are the only bill')
  assert.equal(WaveFormulas.bill(14, 2, 1).holds, false)
  assert.equal((WaveFormulas.bill(14, 0, 0) as unknown as { free: number }).free, 14, 'all fourteen free')
  assert.equal(hexFamiliesOf().get('wave')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'wave', program: ['waves'], params: [faces] })
  const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
  assert.equal(Number(run.value), Number(WaveFormulas.waves(faces).value))
  uuidReceiptOf('wave waves', contentUuidOf(run), { uuid })
  t.diagnostic(`${names.length} families; wave(${names[i]}, 0): ${w.agents} agents, ${w.value} held, 1 call, ${w.saved} saved; sweep(0): ${s.value}/${s.families.length}; massive(${names[i]}): ${m.agents} agents; remote(0): ${rem.value} keyless AI APIs of ${rem.matched}`)
})
