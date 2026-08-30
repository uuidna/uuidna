// THE CONVERSE ARM: A PRESCRIBED REMEDY MUST NAME A COMMAND THAT EXISTS.
//
// one-receipt.ts already guards the relation between package.json's scripts and the surfaces that call them, and
// it does so in ONE direction: for every script that EXISTS, is it referenced anywhere? That reports a dead entry,
// which costs a line in package.json. It never asks the converse — for every command PRESCRIBED to a reader, does
// that command exist? — and the converse is the direction with a victim. A dead entry wastes a line; a dead
// PRESCRIPTION sends a reader to a command that fails at the exact moment they are already stuck, and it does it
// wearing the authority of a gate that just told them what was wrong.
//
// THE TREE HAS PAID FOR THIS TWICE, WHICH IS WHY IT IS A TEST AND NOT A REPAIR. account.ts still carries the first:
// "THE FIX IT NAMED WAS THE EXPENSIVE DOOR, AND IT DID NOT EXIST (2026-08-25)". That instance was corrected and no
// finder was added, so on 2026-08-26 the drain guard prescribed `npm run gen:gitattributes`, which is not a script
// either — and the sweep that followed found twelve more names across ten files. Every one was the same event:
// thin wrappers were collapsed into the `x` dispatcher, and the prose that named them was never updated. The rule
// this test exists to satisfy is one-receipt.ts's own, written a few hundred lines from the gap it missed:
// a repeated mistake is a missing finder.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

// EXEMPT BY NAME AND WITH A REASON — never by widening the match until it detects nothing. Each of these MENTIONS
// a command rather than prescribing one, and a scanner cannot tell use from mention on its own.
const EXEMPT: Record<string, string> = {
  'account.ts': 'carries the historical record of this defect and quotes the command that did not exist; rewriting it would erase the evidence that the mistake repeated',
  'run.ts': 'explains in prose why the dispatcher is named x — the phrase it contains is the naming being ruled out, not a remedy being offered',
  'prescribed-scripts.test.ts': 'this file. A finder that explains itself has to QUOTE the dead command it was built for, and it cannot tell its own citation from a prescription — the same use-versus-mention limit it inherits from every scanner here, arriving immediately and on the guard itself',
  'gate-all.test.ts': 'asserts kindOf() against a deliberately absent script name; the fixture has to stay absent to test anything at all',
}

const walk = (dir: string, out: string[] = []): string[] => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith('.ts')) out.push(p)
  }
  return out
}

test('every prescribed `npm run` names a script that exists — a remedy pointing nowhere is worse than none', () => {
  const scripts = new Set(Object.keys(JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts))
  // the name must OPEN with an alphanumeric, so `npm run --silent <name>` and `npm run <name>` in prose about the
  // pattern itself are not read as prescriptions of a script called --silent
  const NAMED = /npm run ([a-z0-9][a-z0-9:_-]*)/g
  const dead: string[] = []
  for (const file of walk(join(ROOT, 'src'))) {
    const base = file.slice(file.lastIndexOf(String.fromCharCode(92)) + 1).split('/').pop() as string
    if (EXEMPT[base]) continue
    const text = readFileSync(file, 'utf8')
    for (const [i, line] of text.split(String.fromCharCode(10)).entries())
      for (const m of line.matchAll(NAMED))
        if (!scripts.has(m[1] as string))
          dead.push(base + ':' + (i + 1) + ' prescribes `npm run ' + m[1] + '`, which package.json does not declare')
  }
  assert.deepEqual(dead, [], 'a gate that names its own fix is the best feature this tree has; a fix that cannot be run is that feature inverted')

  // THE CONTROL, because a guard that only ever passes proves nothing about what it would catch. Built from a name
  // no package could declare, so it cannot go stale the way the prescriptions it polices did.
  const bogus = 'run `npm run ' + 'no-such-script-anywhere' + '` to fix it'
  const found = [...bogus.matchAll(NAMED)].map((m) => m[1] as string)
  assert.deepEqual(found, ['no-such-script-anywhere'], 'the detector reads a prescription when one is present')
  assert.ok(!scripts.has(found[0] as string), 'and it would report this one as dead')

  // the other half of the control: a real prescription must NOT be reported, or the guard is merely noisy
  const real = [...('run `npm run build` first').matchAll(NAMED)].map((m) => m[1] as string)
  assert.deepEqual(real, ['build'])
  assert.ok(scripts.has('build'), 'build is declared, so the guard stays silent about it')
})
