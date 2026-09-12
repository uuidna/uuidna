import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { MCP_CATALOG } from './mcp.js'
import { EDGE_ABSENT } from './mcp-http.js'

// A DEAD KEY IS A TOOL NOBODY CAN REACH (the captain, 2026-09-12: "simple dry clear picture is more efficient than
// thousands of keys"). The edge serves the one catalogue minus EDGE_ABSENT; a tool that is absent from the wire AND
// called by no source outside the two catalogues is reachable by no agent anywhere, external or local, and that is
// dead by definition — 22 such keys were found and deleted the day this guard landed. So: every declared absence
// must be named in the catalogue, must carry a reason, and must have a caller.
const SKIP = new Set(['src/mcp.ts', 'src/mcp-http.ts', 'src/mcp-edge-absent.test.ts'])
const SKIP_DIR = /^src\/(handles|chunks|seeds)(\/|$)/
const walk = (dir: string): string[] => {
  const out: string[] = []
  for (const n of readdirSync(join(ROOT, dir))) {
    const rel = `${dir}/${n}`
    if (SKIP_DIR.test(rel) || n === 'node_modules') continue
    if (statSync(join(ROOT, rel)).isDirectory()) out.push(...walk(rel))
    else if (rel.endsWith('.ts') && !SKIP.has(rel)) out.push(rel)
  }
  return out
}

test('every edge-absent tool is declared, gives a reason, and is called by someone — none is dead', () => {
  const declared = new Set(MCP_CATALOG.map((t) => t.name))
  const sources = walk('src').map((rel) => readFileSync(join(ROOT, rel), 'utf8'))
  const dead: string[] = []
  for (const [name, reason] of Object.entries(EDGE_ABSENT)) {
    assert.ok(declared.has(name), `${name}: absent from the edge but not in the catalogue`)
    assert.ok(reason.length > 0, `${name}: absence without a reason`)
    if (!sources.some((text) => text.includes(name))) dead.push(name)
  }
  assert.deepEqual(dead, [], `dead keys — absent from the wire and called by nobody:\n${dead.join('\n')}`)
})
