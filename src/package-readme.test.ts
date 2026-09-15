// package-readme — EVERY WORKSPACE README'S QUICK START RUNS, AND PRINTS WHAT IT SAYS IT PRINTS. Measured 2026-09-15:
// the six READMEs carried an import line and nothing that ran, and the install they implied (`npm i @uuidna/<x>`,
// `npx @uuidna/mcp`) answers 404. Each README now carries a ```js block under "## Quick start" whose `// → ` lines are
// its expected output; this runs the block as written, from the repository root, and compares line for line.
// A workspace without a built dist is SKIPPED with the command that builds it — unbuilt is unread, never a pass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { workspacePackages } from './npm-pack.js'

export function quickStart(md: string): { code: string; expected: string[] } | null {
  const m = /^## Quick start\s*\n[\s\S]*?```js\n([\s\S]*?)```/m.exec(md)
  if (!m) return null
  const code = m[1]!
  const expected = [...code.matchAll(/^\/\/ → (.*)$/gm)].map((x) => x[1]!.trimEnd())
  return { code, expected }
}

test('CONTROL — a README with only an import line has no quick start', () => {
  assert.equal(quickStart("# x\n\n```ts\nimport { a } from 'x'\n```\n"), null)
  assert.deepEqual(quickStart('## Quick start\n\n```js\nconsole.log(1)\n// → 1\n```\n')?.expected, ['1'])
})

for (const p of workspacePackages()) {
  test(`${p.name} — the README quick start runs and prints its stated output`, (t) => {
    const q = quickStart(readFileSync(join(ROOT, 'packages', p.dir, 'README.md'), 'utf8'))
    assert.ok(q, `packages/${p.dir}/README.md needs a "## Quick start" with a runnable \`\`\`js block`)
    assert.ok(q.expected.length > 0, 'the quick start states its output as // → lines')
    if (!existsSync(join(ROOT, 'packages', p.dir, 'dist', 'index.js'))) {
      t.skip(`packages/${p.dir}/dist is unbuilt — run \`npm run build:packages\`; nothing was verified`)
      return
    }
    const out = execFileSync(process.execPath, ['--input-type=module', '-e', q.code], { cwd: ROOT, encoding: 'utf8', timeout: 120_000 })
    assert.deepEqual(out.trimEnd().split('\n').map((l) => l.trimEnd()), q.expected)
  })
}
