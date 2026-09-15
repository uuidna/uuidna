// memory-home — the finder must be silent on the whole home and fire on each missing piece; a finder shown only a
// clean tree gives the same output whether it found nothing or was unable to look.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './scripts/api.js'
import { memoryHomeGaps, memoryHomeGuardGaps, MEMORY_HOME_FILES } from './memory-home.js'

const tree = (p: string): string | undefined => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), 'utf8') : undefined)

test('the committed memory home is whole: memoryHomeGuardGaps reads the tree and names nothing', () => {
  assert.deepEqual(memoryHomeGuardGaps(tree), [])
})

test('CONTROL: memoryHomeGuardGaps fires when any one piece of the real home is removed', () => {
  for (const gone of MEMORY_HOME_FILES) {
    const gaps = memoryHomeGuardGaps((p) => (p === gone ? undefined : tree(p)))
    assert.ok(gaps.length >= 1, `removing ${gone} must be named`)
    assert.ok(gaps.every((g) => g.fix.length > 0))
  }
  // an index that forgets a home, and a CLAUDE.md that grows its own prose, each fire once
  for (const home of ['src/laws.ts', 'lean/leads.json', '.claude/lessons.md']) {
    const gaps = memoryHomeGuardGaps((p) => (p === 'AGENTS.md' ? tree(p)!.split(home).join('') : tree(p)))
    assert.equal(gaps.length, 1, `an AGENTS.md without ${home} is named`)
  }
  assert.equal(memoryHomeGuardGaps((p) => (p === 'CLAUDE.md' ? '@AGENTS.md\nremember: a private note' : tree(p))).length, 1)
})

test('memoryHomeGaps counts one gap per missing piece, the law\'s own fixtures', () => {
  const home = new Map([['AGENTS.md', 'src/laws.ts lean/leads.json .claude/lessons.md'], ['CLAUDE.md', '@AGENTS.md\n'], ['.claude/lessons.md', '']])
  assert.equal(memoryHomeGaps(home).length, 0)
  assert.equal(memoryHomeGaps(new Map([...home].filter(([p]) => p !== 'CLAUDE.md'))).length, 1)
  assert.equal(memoryHomeGaps(new Map([...home, ['AGENTS.md', 'src/laws.ts only']])).length, 2)
  assert.equal(memoryHomeGaps(new Map()).length, 3)
})
