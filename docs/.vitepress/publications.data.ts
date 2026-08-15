// Data loader for the /publications index — the automated stream of domain notes, each written by READING its
// sealed theorems and AUDITED before it is published. Derives from the compiled package (dist/), so Lean stays the
// single source: add a domain, its audited note appears. If any note overreaches a proof its `publishable` is false
// and the index shows it refused — the per-note route ([slug].paths.js) fails the build outright, so a false note
// never ships. Requires `npm run build` first (npm run docs:build does both in order).
import { publications } from '../../dist/index.js'

export type PublicationCard = {
  slug: string
  file: string
  title: string
  count: number
  receipt: string
  address: string
  publishable: boolean
  findings: number
}

export type PublicationsData = {
  total: number
  theorems: number
  publishable: number
  refused: number
  cards: PublicationCard[]
}

declare const data: PublicationsData
export { data }

export default {
  watch: ['../../dist/index.js'],
  load(): PublicationsData {
    const P = publications()
    return {
      total: P.length,
      theorems: P.reduce((s, p) => s + p.count, 0),
      publishable: P.filter((p) => p.publishable).length,
      refused: P.filter((p) => !p.publishable).length,
      cards: P.map((p) => ({
        slug: p.slug, file: p.file, title: p.title, count: p.count,
        receipt: p.receipt, address: p.address, publishable: p.publishable, findings: p.findings.length,
      })),
    }
  },
}
