// mcp-bypass — the hook refuses each ad-hoc form that reaches this repository's dist/ or src/, lets the repository's
// own tooling and repo-free evaluations through untouched, and records a stated gap. Every direction has a case.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { bypassesOf, gapOf, judge, recordGap, sitesOf, tokenize, wordsOf, GAP_FILE, type Suggestion } from './mcp-bypass.js'

const ROOT = '/repo/uuidna'
const asked: string[][] = []
const door = async (words: readonly string[], tools: readonly string[]): Promise<{ via: string; suggestions: Suggestion[] }> => {
  asked.push([...tools, ...words])
  const known: Record<string, string> = {
    handle: 'npm run mcp -- uuidna_handle \'{"address":"<address>"}\'',
    address: 'npm run mcp -- uuidna_address \'{"value":"<value>"}\'',
  }
  const hits = words.filter((w) => known[w]).map((w) => ({ name: `uuidna_${w}`, command: known[w]! }))
  return { via: 'list_tools {query}', suggestions: hits }
}
const verdictOf = (command: string, cwd = ROOT, readFile?: (p: string) => string | null) =>
  judge({ command, cwd, root: ROOT, address: (s) => `addr:${s.length}`, suggest: door, ...(readFile ? { readFile } : {}) })

const REFUSED: readonly [string, string, string?][] = [
  ['node -e', `node -e "import('./dist/handles.js').then((m) => console.log(m.handleOf('x')))"`],
  ['node -p', `node -p "require('${ROOT}/dist/address.js').toUuid('a')"`, '/tmp'],
  ['node --eval', `node --eval "const { handleOf } = await import('./dist/handles.js')"`],
  ['node --eval=', `node --eval="import('./dist/handles.js')"`],
  ['node --input-type=module -e', `node --input-type=module -e 'import { handleOf } from "./dist/handles.js"; console.log(handleOf("x"))'`],
  ['npx tsx -e over src', `npx tsx -e "import { toUuid } from './src/address.ts'; console.log(toUuid('a'))"`],
  ['cd into the repo first', `cd ${ROOT} && node -e "import('./dist/handles.js')"`, '/tmp'],
  ['a here-doc into stdin', `node --input-type=module <<'EOF'\nimport { handleOf } from './dist/handles.js'\nconsole.log(handleOf('x'))\nEOF`],
  ['echo piped into node', `echo "import('./dist/handles.js')" | node --input-type=module`],
  ['a template off process.cwd()', 'node -e "import(`${process.cwd()}/dist/handles.js`)"'],
  ['a worktree\'s dist', `node -e "import('${ROOT}/.claude/worktrees/w1/dist/handles.js')"`, '/tmp'],
  ['the package from inside the repo', `node -e "import('@uuidna/uuidna').then((m) => m.callTool('uuidna_handle', {}))"`],
]
for (const [name, command, cwd] of REFUSED) {
  test(`refuses ${name}`, async () => {
    const v = await verdictOf(command, cwd ?? ROOT)
    assert.equal(v.kind, 'refuse', command)
  })
}

const ALLOWED: readonly [string, string, string?][] = [
  ['npm run', 'npm run build && npm run guard'],
  ['npm test', 'npm test'],
  ['the door itself', `npm run mcp -- uuidna_handle '{"address":"x"}'`],
  ['a dist script, flags after its path included', 'node dist/scripts/guard.js -e whatever'],
  ['node --test', 'node --test --test-isolation=none dist/scripts/mcp-bypass.test.js'],
  ['node -e importing nothing local', `node -e "console.log(1 + 1)"`],
  ['node -e importing a builtin', `node -e "import('node:fs').then((fs) => console.log(fs.existsSync('x')))"`],
  ['a relative dist import from outside the repo', `node -e "import('./dist/x.js')"`, '/tmp'],
  ['a script the repository keeps in its trees', 'node scripts/release.mjs'],
  ['words in an echo', `echo "node -e import('./dist/x.js')"`],
]
for (const [name, command, cwd] of ALLOWED) {
  test(`allows ${name}`, async () => {
    const v = await verdictOf(command, cwd ?? ROOT, () => null)
    assert.equal(v.kind, 'allow', command)
  })
}

test('a scratch script outside the repository that imports its dist is read and refused', async () => {
  const v = await verdictOf('node /tmp/probe.mjs', ROOT, (p) => (p === '/tmp/probe.mjs' ? `import { handleOf } from '${ROOT}/dist/handles.js'` : null))
  assert.equal(v.kind, 'refuse')
})

test('the refusal hands over the exact door calls, found by the words of what the code imported', async () => {
  asked.length = 0
  const v = await verdictOf(`node --input-type=module -e "import { handleOf } from './dist/handles.js'; console.log(handleOf('x'))"`)
  assert.equal(v.kind, 'refuse')
  if (v.kind !== 'refuse') return
  assert.ok(asked[0]!.includes('handle'), `the search was asked "handle": ${JSON.stringify(asked)}`)
  assert.match(v.reason, /npm run mcp -- uuidna_handle '\{"address":"<address>"\}'/)
  assert.match(v.reason, /UUIDNA_MCP_GAP="<what is missing>"/)
  assert.match(v.reason, /dist\/handles\.js \(handleOf, handles\)/)
})

test('when no tool matches, the refusal names the gap and the only escape', async () => {
  const v = await verdictOf(`node -e "import { frobnicateWidget } from './dist/widget.js'"`)
  assert.equal(v.kind, 'refuse')
  if (v.kind !== 'refuse') return
  assert.match(v.reason, /No tool in the door matches frobnicate, widget/)
  assert.match(v.reason, /gap in the door, not a licence/)
  assert.match(v.reason, /UUIDNA_MCP_GAP="<what is missing>" node -e/)
})

test('a search that cannot be asked still refuses, and says why', async () => {
  const v = await judge({ command: `node -e "import('./dist/handles.js')"`, cwd: ROOT, root: ROOT, address: (s) => s,
    suggest: async () => { throw new Error('dist not built') } })
  assert.equal(v.kind, 'refuse')
  if (v.kind === 'refuse') assert.match(v.reason, /could not be asked: dist not built/)
})

test('the gap escape runs the command and records a line with its address and the missing capability', async () => {
  const command = `UUIDNA_MCP_GAP="bitsOf over a list of widths" node -e "import { bitsOf } from './dist/bits.js'"`
  const v = await verdictOf(command)
  assert.equal(v.kind, 'gap')
  if (v.kind !== 'gap') return
  assert.equal(v.record.gap, 'bitsOf over a list of widths')
  assert.equal(v.record.address, `addr:${command.length}`)
  assert.deepEqual(v.record.imports, ['dist/bits.js'])
  const root = mkdtempSync(join(tmpdir(), 'uuidna-mcp-gap-'))
  recordGap(root, v.record)
  recordGap(root, { ...v.record, gap: 'a second request' })
  const lines = readFileSync(join(root, GAP_FILE), 'utf8').trim().split('\n').map((l) => JSON.parse(l) as { gap: string; address: string })
  assert.deepEqual(lines.map((l) => l.gap), ['bitsOf over a list of widths', 'a second request'])
  assert.equal(lines[0]!.address, `addr:${command.length}`)
})

test('an empty or unfilled gap is not an escape', async () => {
  assert.equal(gapOf(`UUIDNA_MCP_GAP="" node -e 1`), null)
  assert.equal(gapOf(`UUIDNA_MCP_GAP="<what is missing>" node -e 1`), null)
  assert.equal(gapOf(`export UUIDNA_MCP_GAP='merkle over files'; node -e 1`), 'merkle over files')
  assert.equal((await verdictOf(`UUIDNA_MCP_GAP="" node -e "import('./dist/x.js')"`)).kind, 'refuse')
})

test('the tokenizer resolves quotes, here-docs and fd duplication', () => {
  assert.deepEqual(tokenize(`a 'b c' "d\\"e" $'f\\ng'`).map((t) => t.w), ['a', 'b c', 'd"e', 'f\ng'])
  const h = tokenize(`node <<-EOF 2>&1\n\timport x\n\tEOF\necho done`)
  assert.equal(h.find((t) => t.kind === 'heredoc')?.w, '\timport x')
  assert.ok(h.some((t) => t.kind === 'dup'))
  assert.equal(sitesOf(`node dist/scripts/x.js -e 'import("./dist/y.js")'`, ROOT)[0]?.file, `${ROOT}/dist/scripts/x.js`)
})

test('the words asked of the search split identifiers and leave out what every call shares', () => {
  assert.deepEqual(wordsOf(['handleOf', 'toUuid', 'merkle_roots', 'mcp', 'callTool']), ['handle', 'uuid', 'merkle', 'root'])
  assert.deepEqual(bypassesOf(`node -p "require('./dist/address.js').toUuid('a')"`, ROOT, ROOT)[0]?.ids, ['toUuid', 'address'])
})
