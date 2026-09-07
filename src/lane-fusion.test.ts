// lane-fusion — EVERY FAN-OUT ASKS THE HOST HOW WIDE IT MAY BE. No exceptions, and no numbers typed by hand.
//
// THE CAPTAIN'S ORDER, 2026-09-07: "fuse all without exception to qpu". The QPU here is the hardware load
// balancer — `capacity()` in src/os/host, which measures the machine and answers `lanes`. A fan-out that spawns
// a width somebody typed is not fused to it: it is a SECOND OPINION ABOUT THE HARDWARE, held by a module that
// never looked at the hardware.
//
// WHAT WAS FOUND WHEN THIS WAS WRITTEN. Two live sites disagreed with the balancer while sitting next to code
// that asks it properly:
//   src/scripts/lean-heartbeats.ts  the --sync path asked capacity().lanes; the --all path beside it spawned 8
//   src/scripts/lean-axioms.ts      spawned 8
// On this host `capacity().lanes` happens to BE 8, so nothing misbehaved here — which is exactly why a test is
// the right instrument and a measurement on one machine is not. The defect is invisible on the machine that
// matches and certain on every machine that does not.
//
// AND IT IS WORSE ON A SHARED TREE, which is this tree's ordinary condition: several sessions run fleets at once,
// so a hardcoded width cannot see the lanes a neighbour is already holding. `capacity()` is honest per process
// and blind to neighbours — that blindness is a known open lead — but a typed number is blind to BOTH.
//
// THE RULE, deliberately narrow: the width argument of `pool(...)` may not be a numeric literal. It may be
// `capacity().lanes`, a variable derived from it, or an explicit operator override (`lean-one --lanes`), because
// a human naming a width for one run is a decision, while a constant compiled into the tree is a guess that
// outlives the machine it was guessed on.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src')

const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? sources(join(dir, e.name)) : e.name.endsWith('.ts') ? [join(dir, e.name)] : [])

/** the arguments of a `pool(` call, split at depth zero — strings and nested calls kept whole */
export function poolArgs(src: string, open: number): string[] {
  const out: string[] = []
  let depth = 0, cur = '', quote = ''
  for (let i = open; i < src.length; i++) {
    const ch = src[i]!
    if (quote) { cur += ch; if (ch === quote && src[i - 1] !== '\\') quote = ''; continue }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; cur += ch; continue }
    if ('([{'.includes(ch)) { depth++; if (depth === 1) continue }
    if (')]}'.includes(ch)) { depth--; if (depth === 0) { out.push(cur); break } }
    if (ch === ',' && depth === 1) { out.push(cur); cur = ''; continue }
    cur += ch
  }
  return out.map((a) => a.trim())
}

test('no fan-out carries a hand-typed lane count — every width comes from the host', () => {
  const offenders: string[] = []
  for (const f of sources(SRC)) {
    // THE SUBJECT OF THIS RULE IS PRODUCTION FAN-OUT — code that spawns work on the host. A `.test.ts` is
    // exempt, and the exemption is stated rather than hidden because it has a reason that survives inspection:
    // `gate-all.test.ts` asserts "pool honours its limit" by running twelve fake jobs at width 4 and checking the
    // peak never exceeds it. A test of pool MUST pin a width or it cannot test the thing it exists to test, and
    // its jobs are setTimeout, not processes — nothing is spawned on the machine, so there is no hardware opinion
    // to be wrong about. This is NOT the exemption-by-provenance that was proposed and refused elsewhere in this
    // tree: that one excused files because of who wrote them, this one excludes calls that spawn no work.
    if (f.endsWith('.test.ts')) continue
    const src = readFileSync(f, 'utf8')
    for (const m of src.matchAll(/\bpool\(/g)) {
      const args = poolArgs(src, m.index + 4)
      const width = args[1]
      if (width === undefined) continue
      if (!/^\d+$/.test(width)) continue          // a variable, capacity().lanes, or an override — fused
      const line = src.slice(0, m.index).split('\n').length
      offenders.push(`${f.slice(SRC.length - 3)}:${line} — pool(…, ${width}, …)`)
    }
  }
  assert.deepEqual(offenders, [],
    'a fan-out is spawning a width nobody measured. Ask the balancer instead: `capacity().lanes` from '
    + 'src/os/host. On 2026-09-07 two such sites (lean-heartbeats --all, lean-axioms) both said 8 while the host '
    + 'also said 8 — invisible here, wrong on every other machine, and blind on a shared tree to the lanes a '
    + 'neighbour already holds:\n  ' + offenders.join('\n  '))
})

test('THE CONTROL — the rule can actually fire, and does not fire on a fused width', () => {
  // Without this, the test above passes against a parser that never finds a second argument at all.
  assert.deepEqual(poolArgs('pool(xs, 8, fn)', 4), ['xs', '8', 'fn'])
  assert.deepEqual(poolArgs('pool(xs, capacity().lanes, fn)', 4), ['xs', 'capacity().lanes', 'fn'])
  // a literal inside the FIRST argument is not a width — the shape that would make this finder cry wolf
  assert.deepEqual(poolArgs('pool(Array.from({ length: 12 }, f), limit)', 4),
    ['Array.from({ length: 12 }, f)', 'limit'])
  // AND THE RULE MUST STILL FIRE ON A PRODUCTION-SHAPED PATH. Without this the exemption above could widen
  // silently until nothing is scanned at all — the finder would go green by looking at less.
  const production = "const costs = await pool(T, 8, async (t) => costOf(t))"
  const args = poolArgs(production, production.indexOf('pool(') + 4)
  assert.equal(args[1], '8', 'a literal width in production code is still seen')
  assert.ok(/^\d+$/.test(args[1]!), 'and still classified as hand-typed')
})
