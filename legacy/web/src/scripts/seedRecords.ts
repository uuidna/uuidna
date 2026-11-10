// Seeds the website pages through Payload's local API, then reads them back.
// A check reads only. Deploy is allowed when every current record agrees with its seed.
// `./engine` and `./discovery` are not yet in @uuidna/qpu's exports map; the qpu repository owns adding them.
import { seeds } from '@uuidna/qpu/engine'
import { linkSeedParents, mcpPages, openPages, seedsSynced, syncSeeds, seedWaves } from '@uuidna/qpu/payload-api'
import { mcpHostList } from '@uuidna/qpu/discovery'
import { TOOLBOXES } from '@uuidna/qpu/mcp'
import { seoFrom } from '../plugins/websiteClient.ts'

/** The public site reads published pages, and beforeValidate rewrites meta from the page text. */
const live = <T extends { meta: { title: string; description: string } }>(page: T) => {
  const data = { ...page, _status: 'published' as const }
  const seo = seoFrom(data)
  return { ...data, meta: { ...data.meta, title: seo.title, description: seo.description } }
}
const mcp = mcpPages(TOOLBOXES.flatMap((box) => box.tools.map((tool) => ({ name: tool.name, toolbox: box.name, description: tool.description }))), mcpHostList())
const waves = [
  { name: 'games', pages: seeds().map((seed) => live(seed.page)), nest: [] as { id: string; parentId: string | null }[] },
  ...seedWaves().map((wave) => ({ ...wave, pages: wave.pages.map((page) => live(page)), nest: [] as { id: string; parentId: string | null }[] })),
  { name: mcp.name, pages: mcp.pages.map((page) => live(page)), nest: [] as { id: string; parentId: string | null }[] },
]
const only = process.env.SEED_WAVE
const chosen = only ? waves.filter((wave) => wave.name === only) : waves
if (only && chosen.length === 0) {
  console.error(JSON.stringify({ wave: only, known: waves.map((wave) => wave.name) }))
  process.exit(1)
}
const check = process.env.SEED_CHECK === '1' || process.argv.includes('--check')
const payload = await openPages()
const results: Record<string, unknown>[] = []
for (const wave of chosen) {
  const result = check ? await seedsSynced(payload, wave.pages) : await syncSeeds(payload, wave.pages)
  const parents = !check && wave.nest.length > 0 ? await linkSeedParents(payload, wave.nest) : { linked: 'parents' in result ? result.parents : 0 }
  results.push({ wave: wave.name, allowsDeploy: result.allowsDeploy, pages: result.pages, written: result.written, synced: result.synced, parents: parents.linked })
  console.log(JSON.stringify({ check, ...results.at(-1) }))
  if (!result.allowsDeploy) process.exit(1)
}
console.log(JSON.stringify({ check, waves: results.length, allowsDeploy: true }))
