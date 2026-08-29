// refused — A BOUNDARY NOTHING READS IS PROSE.
//
// lean/leads.json's `refused` list records decisions this project has declined to take. Seven readers open that
// file and none looked at `refused`, so the boundary existed and enforced nothing — and the lead recording that
// notes somebody proposing to crawl a host the file had refused hours earlier.
//
// These tests hold the two properties that make the finder worth having, and both can fail: that it FIRES on a
// real reach, and that it does NOT fire on a mention. The second matters more than it looks — four finders in this
// tree have been fooled by prose about the thing they police, so a finder that cannot tell a URL from a sentence
// would join them rather than help.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { refusedReaches } from '../refused.js'
import { refusedHostsFrom, readRefusedHosts } from '../refused-hosts.js'

test('THE REFUSALS ARE READ FROM THE LEDGER, not copied into the finder', () => {
  const { hosts, read } = readRefusedHosts()
  assert.equal(read, true, 'lean/leads.json must be readable — an unread boundary is the defect this exists to fix')
  assert.ok(hosts.length > 0, 'the refusals name at least one host; if this ever becomes zero the finder covers nothing')
  // the two the ledger names today; asserted as a SUBSET so adding a refusal does not break the test
  for (const h of ['chitanka.info', 'stackoverflow.com', 'ceccec.psg.bg']) assert.ok(hosts.includes(h), `${h} is refused and must be covered`)
  assert.ok(!hosts.includes('api.stackexchange.com'), 'the sanctioned substitute in a boundary is not a refused host')
})

test('UNREAD IS NOT EMPTY — the two must never collapse into one value', () => {
  // the whole disease this tree has been treating: an absence rendering as a pass. A finder that returned []
  // for "the boundary could not be read" would report a clean tree on the day the ledger goes missing.
  assert.deepEqual(refusedHostsFrom(null), [])
  assert.deepEqual(refusedHostsFrom({}), [])
  assert.deepEqual(refusedHostsFrom({ refused: 'not an array' }), [])
  // and the reader reports WHICH of the two it was
  assert.equal(readRefusedHosts().read, true)
})

test('IT FIRES on a source that reaches a refused host over the network', () => {
  const hits = refusedReaches([['src/scout.ts', 'const r = await fetch("https://chitanka.info/books/all")']])
  assert.equal(hits.length, 1, 'a fetch to a refused host must be caught')
  assert.equal(hits[0]!.host, 'chitanka.info')
  assert.equal(hits[0]!.line, 1)
  const origin = refusedReaches([['src/port.ts', 'await fetch("https://ceccec.psg.bg/theorems")']])
  assert.equal(origin.length, 1, 'origin-site fetch is a refused ingestion')
  assert.equal(origin[0]!.host, 'ceccec.psg.bg')
})

test('AND IT DOES NOT FIRE on prose that merely names the host — use versus mention', () => {
  // the trap that caught the deadkey scan, the determinism scan, the pipes finder and a citation regex this week
  const mention = refusedReaches([['src/notes.ts', '// bulk crawling of chitanka.info was refused — see lean/leads.json']])
  assert.deepEqual(mention, [], 'naming a refused host in a comment is how the refusal is EXPLAINED, not violated')
  // the anchor is the scheme: a URL a fetch could take, never the bare name
  const bare = refusedReaches([['src/notes.ts', 'const HOST = "chitanka.info"']])
  assert.deepEqual(bare, [], 'a bare hostname is not a reach; only a fetch is')
})

test('AND A LINK IS NOT AN INGESTION — the distinction the refusal itself draws', () => {
  // The refused entry reads "stackoverflow.com /ai-assist AS A THEOREM SOURCE". What is declined is taking
  // material FROM the host. On its first run this finder flagged scripts/gen-leads.ts, which builds an <a href>
  // inviting a reader to take a lead further — an outbound link in a generated page, not an ingestion. Reading
  // that as a violation would have demanded a change the refusal never asked for. A finder that convicts on the
  // wrong charge is worse than one that stays silent, because it is confident.
  const link = refusedReaches([['src/scripts/gen-leads.ts', "const ASSIST = 'https://stackoverflow.com/ai-assist'"]])
  assert.deepEqual(link, [], 'an outbound href is not a refused ingestion')
  const anchor = refusedReaches([['src/x.ts', '`<a href="https://stackoverflow.com/ai-assist?q=${q}">take it further</a>`']])
  assert.deepEqual(anchor, [], 'rendering a link for a human is not taking a theorem from the host')
})

test('the finder does not flag the files that DEFINE the boundary', () => {
  // refused-hosts.ts must name the hosts to refuse them, and refused.ts shows one to explain itself. A finder
  // that reports its own definition is the use-versus-mention defect wearing a badge.
  const own = refusedReaches([['src/refused-hosts.ts', 'https://chitanka.info/x'], ['src/refused.ts', 'https://chitanka.info/x']])
  assert.deepEqual(own, [])
})

test('THE LIVE TREE OBEYS THE BOUNDARY — and this is the assertion that can fail on a real change', () => {
  const walk = (d: string): string[] => readdirSync(d).flatMap((n) => {
    const p = join(d, n)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : []
  })
  const files = walk('src').map((p) => [p.split('\\').join('/'), readFileSync(p, 'utf8')] as const)
  const hits = refusedReaches(files)
  assert.deepEqual(hits.map((h) => `${h.file}:${h.line} reaches ${h.host}`), [],
    'a source reaches a host lean/leads.json refuses — the refusal is a decision, not a suggestion')
})
