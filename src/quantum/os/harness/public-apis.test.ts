import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { publicApiRegistry, RESEARCH_SOURCE_NAMES } from '../public/index.js'
import { hexbitDoorOf, HANDLE_HEXBITS, UUID_HEXBITS } from '../../../hexbit/index.js'
import { SCHOOL_APIS } from '../../../school-apis.js'
import { ROOT } from '../../../boundary.js'

test('publicApiRegistry catalogues every research sweep source', () => {
  const reg = publicApiRegistry()
  assert.equal(reg.research.length, RESEARCH_SOURCE_NAMES.length)
  assert.equal(reg.sweepCount, RESEARCH_SOURCE_NAMES.length)
  for (const name of RESEARCH_SOURCE_NAMES)
    assert.ok(reg.research.some((r) => r.host === name), `missing ${name}`)
})

test('publicApiRegistry includes weather, news, and EU education', () => {
  const reg = publicApiRegistry()
  assert.ok(reg.weather.length >= 2, 'open-meteo and NOAA tides')
  assert.ok(reg.news.length >= 1, 'wikinews')
  assert.ok(reg.euEducation.length >= 6, 'school APIs')
  assert.ok(reg.count > reg.sweepCount, 'not everything is a text sweep')
})

test('extended research sources are named in RESEARCH_SOURCE_NAMES', () => {
  const named = new Set(RESEARCH_SOURCE_NAMES)
  for (const host of ['arxiv.org', 'mathoverflow.net', 'open-meteo.com', 'en.wikinews.org'] as const)
    assert.ok(named.has(host), host)
  assert.equal(named.size, RESEARCH_SOURCE_NAMES.length)
})

test('publicApiRegistry receipt is a hexbit door', () => {
  const reg = publicApiRegistry()
  const door = hexbitDoorOf(reg.receipt)
  assert.equal(reg.handle, door.handle)
  assert.deepEqual(reg.hexbits, door.hexbits)
  assert.equal(reg.door, door.door)
  assert.equal(reg.handle.length, HANDLE_HEXBITS)
  assert.equal(reg.hexbits.length, UUID_HEXBITS)
  assert.match(reg.door, new RegExp(`^https://uuidna\\.com/[0-9a-f]{${HANDLE_HEXBITS}}$`))
})

test('collectApiEvidence wires weather and news beside EU education', () => {
  const src = readFileSync(join(ROOT, 'src', 'api-mint.ts'), 'utf8')
  for (const id of ['escoSearch', 'eurostatEducation', 'dataEuropaSearch', 'giscoSchools', 'cordisSearch', 'tedNotices'])
    assert.ok(src.includes(id), `collectApiEvidence must call ${id}`)
  assert.ok(src.includes('fetchOpenMeteoForecast'), 'weather: Open-Meteo')
  assert.ok(src.includes('fetchNoaaTideHeight'), 'weather: NOAA tides')
  assert.ok(src.includes('fetchWikinewsFeatured'), 'news: Wikinews')
  assert.ok(src.includes('unansweredMath'), 'unanswered math: MathOverflow')
  assert.ok(src.includes('collectMintExtras'), 'mint extras are a named function, not inlined forever')
})

test('unanswered math is the Stack Exchange unanswered door, not an intitle scrape', () => {
  const src = readFileSync(join(ROOT, 'src', 'quantum', 'os', 'research', 'index.ts'), 'utf8')
  assert.match(src, /questions\/unanswered/)
  assert.match(src, /site=mathoverflow/)
  assert.match(src, /export async function unansweredMath/)
})

test('gen-apis drains publicApiRegistry — no hand-typed /apis page', () => {
  const gen = readFileSync(join(ROOT, 'src', 'scripts', 'gen-apis.ts'), 'utf8')
  assert.match(gen, /publicApiRegistry/)
  assert.match(gen, /docs\/apis\.md/)
})

test('publicApiRegistry hosts cover RESEARCH_SOURCE_NAMES plus weather and news', () => {
  const reg = publicApiRegistry()
  const hosts = new Set([...reg.research, ...reg.euEducation, ...reg.weather, ...reg.news, ...reg.other].map((r) => r.host))
  const sameHost = (a: string, b: string): boolean => a === b || a.endsWith('.' + b) || b.endsWith('.' + a)
  for (const name of RESEARCH_SOURCE_NAMES)
    assert.ok([...hosts].some((h) => sameHost(h, name)), `registry names ${name}`)
})

test('every src fetch host is in publicApiRegistry or SCHOOL_APIS — undeclared is a gap', () => {
  const hostOf = (s: string): string => {
    try { return new URL(s.includes('://') ? s : 'https://' + s).host } catch { return s }
  }
  const named = new Set<string>()
  const reg = publicApiRegistry()
  for (const row of [...reg.research, ...reg.euEducation, ...reg.weather, ...reg.news, ...reg.other]) {
    named.add(hostOf(row.host))
    named.add(hostOf(row.base))
  }
  for (const s of SCHOOL_APIS) named.add(hostOf(s.base))
  const undeclared: string[] = []
  const walk = (dir: string): void => {
    if (dir.endsWith('/tests') || dir.includes('/scripts/lean-')) return
    for (const n of readdirSync(dir)) {
      const p = join(dir, n)
      const st = statSync(p)
      if (st.isDirectory()) { walk(p); continue }
      if (!n.endsWith('.ts') || n.endsWith('.test.ts')) continue
      const src = readFileSync(p, 'utf8')
      for (const m of src.matchAll(/fetch\(\s*['"]https:\/\/([^/'"]+)/g)) {
        const host = m[1]!
        if (!/^[a-z0-9.-]+$/i.test(host)) continue
        if (host === 'uuidna.com' || host.endsWith('.uuidna.com')) continue
        const ok = [...named].some((h) => host === h || host.endsWith('.' + h) || h.endsWith('.' + host) || h === host)
        if (!ok) undeclared.push(`${p.replace(ROOT + '/', '')}: ${host}`)
      }
    }
  }
  walk(join(ROOT, 'src'))
  assert.deepEqual(undeclared, [], 'a fetched host must be in publicApiRegistry or SCHOOL_APIS')
})
