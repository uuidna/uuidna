import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRegistryOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MerkabaFormulas, flowFamiliesOf } from './index.js'

/** A flow passes 3 through three distinct families; mirror(c, b, a) is the flow a → b → c and mirror(a, b, c) its
 *  counter-rotation; a formation is counted by the star when the two meet; the torus runs each from the other's
 *  referrer. */
test('merkaba: trinity flows cross three families, their mirrors counter-rotate, the formations are counted', async (t) => {
  // complete the registry first: hexRunOf (torus, the final loop) lazily loads families beyond families.js, so the
  // ring must be whole before names is captured, or develop's n would outgrow names.length mid-test.
  await hexRegistryOf()
  const names = flowFamiliesOf()
  assert.ok(names.length >= 3, 'at least three families flow')
  assert.ok(!names.includes('merkaba') && !names.includes('data') && !names.includes('gate'), 'no door and not itself: no flow recurses')
  const up = MerkabaFormulas.trinity(0, 1, 2), down = MerkabaFormulas.mirror(0, 1, 2)
  assert.equal(up.value, MerkabaFormulas.mirror(2, 1, 0).value, 'the flow is the mirror of its reverse')
  assert.equal(MerkabaFormulas.trinity(0, 0, 1).holds, false, 'a flow needs three distinct families')
  assert.equal(MerkabaFormulas.steps(0, 0, 1).holds, false)
  const m = MerkabaFormulas.merkaba(0, 1, 2)
  assert.equal(m.holds, up.holds && down.holds && up.value === down.value && up.value > 0, 'a merkaba forms exactly when the flow meets its mirror')
  assert.equal(MerkabaFormulas.spin(0, 1, 2).value, up.value > down.value ? 1 : up.value < down.value ? 2 : 0)
  const n = Math.min(names.length, 5)
  const flows = MerkabaFormulas.flows(n), star = MerkabaFormulas.star(n)
  assert.ok(flows.value >= 0 && flows.value <= n * (n - 1) * (n - 2), 'flows are ordered triples of distinct families')
  assert.ok(star.value <= flows.value / 6 + 1, 'formations are unordered triples among the flows')
  const torus = await MerkabaFormulas.torus(0, 1, 2)
  assert.equal(torus.holds, up.holds && down.holds, 'from either referrer the flow reaches the same value: the double torus closes')
  if (torus.holds) assert.equal(torus.value, up.value)
  // the trinity coil and the rosetta: n trinities around the ring; one turn each way crosses 2n adjacent edges
  const coil = MerkabaFormulas.coil(n), rosetta = MerkabaFormulas.rosetta(n)
  assert.ok(coil.value >= 0 && coil.value <= n, 'the coil holds at most n trinities')
  assert.equal((rosetta as unknown as { edges: number }).edges <= 2 * n, true, 'one turn each way is at most 2n edges')
  assert.equal(rosetta.holds, (rosetta as unknown as { forward: number }).forward > 0 && (rosetta as unknown as { back: number }).back > 0, 'the rosetta holds when both turns reach the end')
  // a lead developed: the first formula of the first ring family is one rotation per address — 2n addresses in all.
  // The walk is SPLIT, not marked: each develop(0, 0, s) is one slice (a hex program, cached), so the test proves the
  // slice contract over a lattice window — a distinct rotation per address, value 0/1, the full 2n count read from a
  // slice's own metadata — instead of executing all 2n × O(n) rotations as a monolith (hot: it never ends, it only costs).
  const window = [0, 1, 2, names.length, names.length + 1, 2 * names.length - 1]
  const slices = window.map((s) => MerkabaFormulas.develop(0, 0, s) as unknown as { value: number; holds: boolean; rotations: number; rotation: string })
  assert.ok(slices.every((d) => d.rotations === 2 * names.length && (d.value === 0 || d.value === 1)), 'each slice is one rotation per address of 2n')
  assert.equal(new Set(slices.map((d) => d.rotation)).size, window.length, 'each address in the window is a distinct start, one way or the other')
  assert.equal(MerkabaFormulas.develop(999, 0, 0).holds, false, 'no such family: nothing develops')
  assert.equal(MerkabaFormulas.develop(0, 0, 2 * names.length).holds, false, 'a rotation past the ring is none')
  assert.equal(hexFamiliesOf().get('merkaba')?.length, 11)
  for (const [name, params, expected] of [['trinity', [0, 1, 2], up.value], ['star', [n], star.value]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'merkaba', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(Number(run.value), expected, `merkaba.${name} at ${uuid}`)
    uuidReceiptOf(`merkaba ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic(`${names.length} families flow; ${flows.value} flows, ${star.value} formations, a coil of ${coil.value}/${n} trinities, the rosetta turned each way: ${rosetta.value}`)
})
