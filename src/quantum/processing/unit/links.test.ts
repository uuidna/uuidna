import '../../../mcp/families.js'
import { test } from './receipted.js'
import assert from 'node:assert/strict'
import { citeHolds, qpuCiteOf, hexDecodeOf, qpuPageOf } from './index.js'
import { publicOf } from './zeropage.js'
import { hrefsOf, bundledCitationOf, citationFileTextOf, citationHrefsOf } from './links.js'

const pair = (edges: { from: string; to: string; lead?: true }[], from: string, to: string) => edges.find((edge) => edge.from === from && edge.to === to)

test('external link graph: citation hrefs, both directions, one next address', () => {
  const cite = qpuCiteOf()
  const fileHrefs = citationHrefsOf(citationFileTextOf())
  const bundledHrefs = citationHrefsOf(bundledCitationOf())
  assert.deepEqual(bundledHrefs, fileHrefs)
  assert.equal(fileHrefs.includes('https://orcid.org/0009-0000-7312-9778'), false)
  assert.equal(hrefsOf('mailto:ceccec@psg.bg doi:10.5281/zenodo.23156998').includes('https://doi.org/10.5281/zenodo.23156998'), true)
  assert.equal(hrefsOf('email ceccec@psg.bg').some((href) => href.includes('@')), false)

  const { links } = cite
  assert.equal(citeHolds(cite), true)
  assert.equal(links.holds, false)
  assert.equal(links.edges.every((edge) => edge.holds === false && edge.address === undefined && !('next' in edge)), true)
  assert.equal(links.next !== undefined && links.next.handle.length === 8 && links.next.uuid.startsWith(links.next.handle), true)

  const version = `https://doi.org/${cite.doi}`
  const concept = `https://doi.org/${cite.conceptdoi}`
  const github = 'https://github.com/uuidna/qpu'
  const host = cite.href
  const mcp = `${host}/api`
  const license = `${host}/license`
  const archive = cite.archive
  assert.equal(cite.doi.startsWith('10.5281/'), true)
  assert.equal(cite.conceptdoi.startsWith('10.5281/'), true)
  assert.ok(pair(links.edges, version, host))
  assert.ok(pair(links.edges, host, version))
  assert.ok(pair(links.edges, concept, host))
  assert.ok(pair(links.edges, github, host))
  assert.ok(pair(links.edges, host, github))
  assert.ok(pair(links.edges, archive, mcp))
  assert.ok(pair(links.edges, version, license)?.lead)
  assert.equal(pair(links.edges, version, mcp)?.lead, undefined)
  assert.deepEqual(links.lead, [{ href: license, lead: true }])
  assert.equal(links.edges.some((edge) => edge.from.includes('orcid.org') || edge.to.includes('orcid.org') || edge.from.includes('@') || edge.to.includes('@')), false)
  assert.equal('price' in links, false)
  assert.equal('referer' in links, false)
  assert.equal(cite.grant.price, 'relation')
  assert.equal(cite.grant.licence, 'CC-BY-NC-ND-4.0')
  const royalty = hexDecodeOf(cite.grant.next?.uuid ?? '')
  assert.equal(royalty.holds, true)
  assert.equal('program' in royalty && royalty.program[0], 'royalty')
  assert.equal('family' in royalty && royalty.family, 'publishing')
  assert.equal('params' in royalty && royalty.params.length, 0)
  assert.equal(publicOf().prize, false)

  const page = qpuPageOf({ public: publicOf().lines, links }, host)
  assert.equal(page.includes(`<a href="${version}">`), true)
  assert.equal(page.includes(`<a href="${github}">`), true)
  assert.equal(page.includes(`<a href="${license}">`), true)
  assert.equal(page.includes('ceccec@'), false)
  assert.equal(page.includes('orcid.org'), false)
})
