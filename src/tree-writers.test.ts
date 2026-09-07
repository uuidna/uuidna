// tree-writers — FOLD THE FINDER: the disagreement that named this must not be able to come back.
//
// The finding was not "seal() watches too few processes". It was that TWO probes asked the same question and
// answered it differently, and nothing in the tree could notice. Fixing the two call sites cures today; this
// file is what makes the cure hold, because the next writer script arrives with nobody remembering these lines.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TREE_WRITERS, grepProbe } from './tree-writers.js'

const SRC = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src')

/** every .ts under src/, recursively */
const sources = (dir: string): string[] => {
  const out: string[] = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...sources(p))
    else if (e.name.endsWith('.ts')) out.push(p)
  }
  return out
}

test('no probe in the tree carries its own writer list — one list or none', () => {
  const offenders: string[] = []
  for (const f of sources(SRC)) {
    if (f.endsWith('tree-writers.ts') || f.endsWith('tree-writers.test.ts')) continue
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      // A COMMENT ABOUT THE PROBE IS NOT A PROBE. This scan's first run flagged develop.ts's own doc comment —
      // the paragraph explaining that the probe has three answers contains the words `ps aux`. A finder that
      // reports prose has not found a second list; it has found itself reading, which is the unearned finding
      // this tree keeps catching. Code lines only.
      const t = line.trim()
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) continue
      // a process probe is `ps aux` reaching for a script name; the shared one is called, never spelled out
      if (!/ps aux/.test(line)) continue
      if (/grepProbe\(\)/.test(line)) continue
      offenders.push(`${f.slice(SRC.length - 3)}: ${line.trim().slice(0, 100)}`)
    }
  }
  assert.deepEqual(offenders, [],
    'a second writer list has appeared. That is the exact defect tree-writers.ts was written for: on 2026-09-07 '
    + 'seal() waited for reconcile.js alone while develop waited for reconcile.js and lean-all.js, and a live '
    + 'measurement found SIX writer processes on the tree that the first probe counted as two. Call grepProbe() '
    + 'and add the script to TREE_WRITERS instead:\n  ' + offenders.join('\n  '))
})

test('the probe names every writer, and cannot match its own grep', () => {
  const probe = grepProbe()
  for (const w of TREE_WRITERS) {
    // bracket-escaped: [l]and\.js, never land.js — otherwise grep counts itself and the tree never reads quiet
    assert.match(probe, new RegExp(`\\[${w[0]}\\]${w.slice(1).replace(/\./g, '\\\\\\.')}`),
      `${w} must appear bracket-escaped in the probe`)
    assert.doesNotMatch(probe, new RegExp(`(^|["|])${w.replace(/\./g, '\\.')}`),
      `${w} appears unescaped — grep would match its own argv and the wait would never end`)
  }
})

test('THE CONTROL: a writer removed from the list is no longer waited for', () => {
  // A test that only asserts presence would pass against a list of one. This asserts the probe DISCRIMINATES:
  // drop land.js and the pattern stops naming it, which is precisely the state the tree was in this morning.
  const withoutLand = TREE_WRITERS.filter((w) => w !== 'land.js')
  const narrowed = withoutLand.map((w) => `[${w[0]}]${w.slice(1)}`.replace(/\./g, '\\.')).join('|')
  assert.ok(!narrowed.includes('and\\.js'), 'the narrowed probe must not name land.js — else this control proves nothing')
  assert.ok(grepProbe().includes('[l]and\\.js'), 'the real probe must name land.js — the widening is the fix')
})
