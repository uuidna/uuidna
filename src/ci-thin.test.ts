import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { commandsOf, thinCiGaps } from './ci-thin.js'
import { callTool } from './mcp.js'

const WF = join(ROOT, '.github', 'workflows')

test('ci is a thin MCP client: no workflow command runs a dist script or a package script except through uuidna_ci', () => {
  const gaps = readdirSync(WF).filter((f) => f.endsWith('.yml')).flatMap((f) => thinCiGaps(f, readFileSync(join(WF, f), 'utf8')))
  assert.deepEqual(gaps, [])
})

test('control: the finder names a direct call in every position a workflow puts one, and passes the door and the build', () => {
  const text = [
    '        run: node dist/scripts/guard.js',
    '        run: npm run build && node dist/scripts/leads-gate.js --strict',
    '          npm run state -- --assert || echo "::warning::npm run state && node dist/scripts/x.js stays prose"',
    "        run: npm run -s mcp -- uuidna_ci '{\"step\":\"npm:state\"}' --local || true",
    '        run: npm run build',
    '        # node dist/scripts/commented.js',
    '          npm run -s mcp -- uuidna_ci \'{"script":"predict-and-fill"}\' --local > homework.txt 2>&1',
  ].join('\n')
  assert.deepEqual(thinCiGaps('w.yml', text), [
    'w.yml:1 node dist/scripts/guard.js',
    'w.yml:2 node dist/scripts/leads-gate.js --strict',
    'w.yml:3 npm run state -- --assert',
  ])
  assert.deepEqual(commandsOf("run: a ${{ x || 'y' }} && b > out.txt 2>&1"), ["a ${{ x || 'y' }}", 'b'])
})

test('the uuidna_ci door: refuses an undeclared step, passes a step that exits 0, and fails the call when the step fails', () => {
  assert.throws(() => callTool('uuidna_ci', {}), /missing required argument: step/)
  assert.throws(() => callTool('uuidna_ci', { step: 'npm:no-such-script' }), /not a package\.json script/)
  assert.throws(() => callTool('uuidna_ci', { step: '' }), /name a step/)
  assert.throws(() => callTool('uuidna_ci', { step: '../escape' }), /not a dist\/scripts program/)
  const ok = callTool('uuidna_ci', { step: 'mcp-call', args: ['--help'] }) as { ok: boolean; step: string; exit: number }
  assert.deepEqual([ok.ok, ok.step, ok.exit], [true, 'mcp-call', 0])
  assert.throws(() => callTool('uuidna_ci', { step: 'mcp-call', args: ['x', '{'] }), /ci: mcp-call exited [1-9]/)
})
