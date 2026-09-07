// heartbeats-durable — A COST THE KERNEL HAS ALREADY PAID FOR MUST REACH DISK BEFORE THE NEXT WING STARTS.
//
// LEAD 239, and it was measured rather than imagined. On 2026-09-07 a `--sync` ran fifty-five minutes on one
// expensive wing with `lean/heartbeats.json` untouched the whole time, because the sync wrote once at the end
// over every wing at once. That made an ordinary decision — let it finish, or cap it and re-run — cost an hour
// either way: stopping would have discarded fifty-five minutes of kernel work, and a capped re-run would have
// paid for it again from zero. The wing's cost was a FACT the moment the kernel produced it; holding it in memory
// until every other wing agreed to finish was an all-or-nothing write pretending to be prudence.
//
// WHY THIS IS A SOURCE TEST AND NOT A BEHAVIOURAL ONE, stated so the limit is visible: exercising the real path
// means spawning Lean over a real wing, which is minutes of kernel time per run and the very cost the lead is
// about. So this holds the STRUCTURE that makes durability true — one writer, called from inside the per-wing
// worker — and says plainly that it does not prove the file's contents at an arbitrary interruption. A weaker
// instrument named as weak beats a stronger one claimed and not built.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = readFileSync(
  join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src', 'scripts', 'lean-heartbeats.ts'), 'utf8')

/** the body of the per-wing worker passed to pool(...) — where a completed wing must land */
function perWingWorker(src: string): string {
  const at = src.indexOf('const perWing = await pool(')
  // `>= 0`, not `> 0`: the control feeds a fixture whose pool starts at index ZERO, and the first version of this
  // rejected it as "not found". The control caught the extractor, which is the whole reason it is here.
  assert.ok(at >= 0, 'the batched per-wing pool must exist — if this moved, the durability claim moved with it')
  let depth = 0
  for (let i = src.indexOf('(', at); i < src.length; i++) {
    const ch = src[i]!
    if (ch === '(') depth++
    else if (ch === ')') { depth--; if (depth === 0) return src.slice(at, i) }
  }
  return ''
}

test('a completed wing is written before the next one finishes — the write lives INSIDE the per-wing worker', () => {
  const body = perWingWorker(SRC)
  assert.match(body, /writeCosts\(\)/,
    'the per-wing worker must persist its costs. Without this the sync is all-or-nothing again: a stop at any '
    + 'point discards every wing, which is what made a fifty-five-minute run unstoppable on 2026-09-07.')
  assert.match(body, /for \(const r of rows\) if \(r\.cost !== null\) costs\[r\.address\] = r\.cost/,
    'and it must fold that wing\'s own rows in before writing, or it writes the previous state')
})

test('there is exactly ONE writer of the costs file — two spellings would drift apart', () => {
  const writes = [...SRC.matchAll(/writeFileSync\(path,/g)]
  assert.equal(writes.length, 1,
    'the per-wing landing and the final write must go through the same function. Two write sites is how a '
    + 'partial file and a complete one stop looking alike:\n  ' + writes.map((w) => w[0]).join('\n  '))
  assert.match(SRC, /const writeCosts = \(\): void => \{/, 'and that one writer is named, not inlined twice')
})

test('THE CONTROL — the extractor really reads the worker, so the assertions above can fail', () => {
  // If perWingWorker returned the whole file, every assertion would pass for the wrong reason: the file contains
  // `writeCosts()` somewhere regardless. Pin that it returns a PROPER SUBSTRING, and that a worker without the
  // write is rejected.
  const body = perWingWorker(SRC)
  assert.ok(body.length > 0 && body.length < SRC.length, 'the worker is a slice of the file, not the file')
  assert.doesNotMatch(body, /wrote lean\/heartbeats\.json/, 'the final coverage line is OUTSIDE the worker')
  const stripped = 'const perWing = await pool(wings, lanes, async ([file, ts], wi) => { return rows })'
  assert.doesNotMatch(perWingWorker(stripped), /writeCosts\(\)/,
    'a worker with no per-wing write must NOT satisfy the rule — otherwise the test is decoration')
})
