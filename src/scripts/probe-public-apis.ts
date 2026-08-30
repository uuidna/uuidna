#!/usr/bin/env node
// @non-harmonic: asks every wired public API its declared probe query — research sweep, EU school, weather, news.
// IT NEVER FAILS THE BUILD by default: a public API being down is not this repository's defect (same law as probe-school-apis).
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { researchSweep, RESEARCH_SOURCE_NAMES } from '../quantum/os/research/index.js'
import { probeSchoolApis } from '../quantum/os/school/index.js'
import { fetchOpenMeteoForecast, fetchNoaaTideHeight } from '../quantum/os/weather/index.js'
import { fetchWikinewsFeatured } from '../quantum/os/news/index.js'
import { publicApiRegistry } from '../quantum/os/public/index.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid } from '../address.js'
import { HERE } from './api.js'

const strict = process.argv.includes('--strict')
const query = process.argv.find((a) => a.startsWith('--query='))?.slice(8) ?? 'quantum'

const sweep = await researchSweep(query)
for (const r of sweep) {
  const rows = r.evidence.length
  console.log(`  ${r.reached ? '✓' : '·'} ${r.source.padEnd(22)} ${String(rows).padStart(3)} rows  ${r.reached ? '' : r.why ?? ''}`)
}
const researchAnswering = sweep.filter((r) => r.reached).length
console.log(`\n${researchAnswering === RESEARCH_SOURCE_NAMES.length ? '✓' : '·'} research — ${researchAnswering}/${RESEARCH_SOURCE_NAMES.length} answering; query "${query}"`)

const eu = await probeSchoolApis()
for (const p of eu.probes)
  console.log(`  ${p.ok ? '✓' : '·'} ${p.id.padEnd(13)} ${String(p.rows).padStart(3)} rows  ${p.note}`)
console.log(`${eu.dark.length ? '·' : '✓'} EU school — ${eu.answering}/${eu.probed} answering`)

let weatherOk = 0
try {
  const meteo = await fetchOpenMeteoForecast(42.6977, 23.3219)
  weatherOk++
  console.log(`  ✓ open-meteo-forecast   ${String(meteo.length).padStart(3)} facts  Sofia probe`)
} catch (e) {
  console.log(`  · open-meteo-forecast     0 facts  ${(e as Error).message.slice(0, 50)}`)
}
try {
  const tide = await fetchNoaaTideHeight('9414290')
  weatherOk++
  console.log(`  ✓ noaa-tides            ${String(tide.length).padStart(3)} facts  station 9414290`)
} catch (e) {
  console.log(`  · noaa-tides              0 facts  ${(e as Error).message.slice(0, 50)}`)
}
console.log(`${weatherOk === 2 ? '✓' : '·'} weather — ${weatherOk}/2 answering`)

let newsRows = 0
try {
  const articles = await fetchWikinewsFeatured(3)
  newsRows = articles.length
  console.log(`  ✓ wikinews-rss          ${String(newsRows).padStart(3)} articles  featured feed`)
} catch (e) {
  console.log(`  · wikinews-rss            0 articles  ${(e as Error).message.slice(0, 50)}`)
}
console.log(`${newsRows ? '✓' : '·'} news — ${newsRows ? '1' : '0'}/1 answering`)

const reg = publicApiRegistry()
const receipt = merkleGravity([reg.receipt, eu.receipt, toUuid(`${researchAnswering}:${weatherOk}:${newsRows}`)])
console.log(`\n✓ public-apis — ${reg.count} catalogued · ${reg.sweepCount} in research sweep · receipt ${receipt}`)

const dark = RESEARCH_SOURCE_NAMES.length - researchAnswering + eu.dark.length + (weatherOk < 2 ? 1 : 0) + (newsRows ? 0 : 1)
// Named on-demand CLIs — spawn so they are not dormant (reachable ≠ exercised).
spawnSync(process.execPath, [join(HERE, 'probe-school-apis.js')], { stdio: 'inherit' })
spawnSync(process.execPath, [join(HERE, 'api-mint.js'), query], { stdio: 'inherit' })
spawnSync(process.execPath, [join(HERE, 'package-at-a-time.js'), '--limit=0'], { stdio: 'inherit' })
process.exit(strict && dark > 0 ? 1 : 0)
