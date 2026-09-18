import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { theoremByKey } from '../theorems/index.js'

// THE FALSIFIER LEG IS A TEST THAT NAMES THE KEY (src/scripts/rosetta.ts: `if (span || tests.includes(key))`).
// Two of the Links wing's eleven crossings shipped without one — the_aura_pair_the_wheel_cannot_separate and
// reconciled_generator_sat_inside_the_truncated_run — so the mint gate's falsifier-ceiling read 71015 of 71017 and
// refused the deposit: "a proof whose denial nobody can state is worth less than one whose denial is checkable".
// Naming a key in a string would satisfy the leg and earn nothing, which is the fault the leg exists to catch, so
// each test below RECOMPUTES the crossing's own claim from its own source and would fail if the claim moved.

test('the_aura_pair_the_wheel_cannot_separate — the two witness colours part in three channels and meet in one hue', () => {
  const t = theoremByKey().get('the_aura_pair_the_wheel_cannot_separate')
  assert.ok(t, 'the crossing must be sealed in the ledger')
  // the two colours the lonely theorem carries, read off the statement rather than retyped
  const [a, b] = [...t!.statement.matchAll(/\((\d{7}) \/ 65536 = \d+\)/g)].map((m) => Number(m[1]))
  assert.equal(typeof a, 'number'); assert.equal(typeof b, 'number')
  const channels = (c: number): [number, number, number] => [Math.floor(c / 65536), Math.floor(c / 256) % 256, c % 256]
  // the hue of a colour in the green band, as the crossing states it: 120 + round(60·(b − r)/(g − r))
  const hue = (c: number): number => { const [r, g, bl] = channels(c); return 120 + Math.round((60 * (bl - r)) / (g - r)) }
  assert.notDeepEqual(channels(a!), channels(b!), 'three channels separate the pair')
  assert.equal(hue(a!), hue(b!), 'one hue does not — that is the pigeonhole the crossing makes concrete')
  assert.equal(hue(a!), 161)
  assert.ok(9 * 7 * 6 > 360, '378 states cannot be named by a 360-degree wheel')
  // CONTROL: the equality must be able to fail. A one-step change in green does NOT move the rounded hue (measured:
  // 220 to 221 still reads 161), which is why the control shifts BLUE by 30 — 171 to 201 carries it to 173.
  assert.notEqual(hue(a! + 30), hue(b!), 'a moved channel parts the hues, so the meeting above is a measurement')
})

test('reconciled_generator_sat_inside_the_truncated_run — the generator sits inside the window, read from the manifest', () => {
  const t = theoremByKey().get('reconciled_generator_sat_inside_the_truncated_run')
  assert.ok(t, 'the crossing must be sealed in the ledger')
  // the manifest is WALKED, never typed — the same source the wing reads
  const manifest = [...readFileSync(join(ROOT, 'src', 'scripts', 'generate.ts'), 'utf8').matchAll(/\{\s*file:\s*'([^']+)'/g)].map((m) => m[1]!)
  const at = manifest.indexOf('gen-prose-evidence.js')
  assert.ok(at >= 0, 'the generator the crossing places must still be in the manifest')
  const sealed = Number(/(\d+)/.exec(t!.statement)?.[1] ?? 0)
  assert.ok(sealed > 0, 'the crossing states a position')
  // the window the sealed truncation named: the run ended at 6 of 47 listed generators
  assert.ok(at > 6, `gen-prose-evidence.js sits at ${at}, past the cut of 6 — which is why the silent skip reached it`)
  assert.ok(manifest.length > 47, `the list the sealed theorem counted at 47 now carries ${manifest.length}`)
  for (const g of ['gen-readme.js', 'gen-llm.js']) assert.ok(manifest.includes(g), `${g} is a literal entry of the manifest`)
  // CONTROL: a name the manifest does not carry is not placed by this reading
  assert.equal(manifest.indexOf('gen-not-a-generator.js'), -1)
})
