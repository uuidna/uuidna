// Seeds the website pages through Payload's local API, then reads them back.
// A check reads only. Deploy is allowed when every current record agrees with its seed.
import config from '@payload-config'
import { getPayload } from 'payload'
import { linkSeedParents, seedsSynced, syncSeeds } from '@uuidna/qpu/payload-api'
import { seoFrom } from '@uuidna/qpu/website-client'
import { allSeedWaves } from './seedWaves.ts'

/** The public site reads published pages, and beforeValidate rewrites meta from the page text. */
const live = <T extends { meta: { title: string; description: string } }>(page: T) => {
  const data = { ...page, _status: 'published' as const }
  const seo = seoFrom(data)
  return { ...data, meta: { ...data.meta, title: seo.title, description: seo.description } }
}
const waves = allSeedWaves().map((wave) => ({ name: wave.name, pages: wave.pages.map((page) => live(page)), nest: [] as { id: string; parentId: string | null }[] }))
const only = process.env.SEED_WAVE
const chosen = only ? waves.filter((wave) => wave.name === only) : waves
if (only && chosen.length === 0) {
  console.error(JSON.stringify({ wave: only, known: waves.map((wave) => wave.name) }))
  process.exit(1)
}
const check = process.env.SEED_CHECK === '1' || process.argv.includes('--check')
// Payload's local API, the same getPayload({ config }) the website uses
const payload = (await getPayload({ config })) as unknown as Parameters<typeof syncSeeds>[0]
const results: Record<string, unknown>[] = []
for (const wave of chosen) {
  const result = check ? await seedsSynced(payload, wave.pages) : await syncSeeds(payload, wave.pages)
  const parents = !check && wave.nest.length > 0 ? await linkSeedParents(payload, wave.nest) : { linked: 'parents' in result ? result.parents : 0 }
  results.push({ wave: wave.name, allowsDeploy: result.allowsDeploy, pages: result.pages, written: result.written, synced: result.synced, parents: parents.linked })
  console.log(JSON.stringify({ check, ...results.at(-1) }))
  if (!result.allowsDeploy) process.exit(1)
}
console.log(JSON.stringify({ check, waves: results.length, allowsDeploy: true }))
