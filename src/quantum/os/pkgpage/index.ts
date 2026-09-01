// quantum/os/pkgpage — A PAGE PER PUBLISHED PACKAGE, COMPUTED RATHER THAN BUILT.
//
// gen-os has told readers for a while that "each package also has an editorial path /catalogue/<name>". It did
// not: the route answered 404 on the live site. This computes it.
//
// WHY COMPUTED AND NOT GENERATED, measured rather than argued. Alpine publishes 28,635 packages; the whole site
// is 4,705 pages, so generating one file each is two orders of magnitude more build, deploy and storage for
// content that is a lookup. Computing it costs the primed index and nothing per page:
//
//     index + one row parsed   17.1 MB          <- what this route holds
//     all 28,635 rows          35.3 MB          <- what materialising would hold
//     one package lookup        0.0 MB, ~211 ns <- what a request adds
//
// The lazy catalogue is what makes that true: priming indexes name→line and parses ONE row on demand, so a page
// never materialises the catalogue it reads from.
//
// NOTHING IS HARDCODED. The domains a package belongs to are matched from the seeded patterns, the man page is
// resolved by the catalogue's own resolver, and the tools are filtered from the live MCP roster by what they
// declare — so a new domain, a new man page or a new tool appears here without this file changing.
import { cataloguePackage, resolveManPage, catalogueRouteOf, type CataloguePackage } from '../catalogue/index.js'
import { DOMAIN_PATTERNS } from '../domains/index.js'
import { toUuid } from '../../../address.js'
import { handleOf } from '../../../handle.js'

export interface PackagePage {
  name: string
  version: string
  repo: string
  checksum: string
  desc: string
  deps: readonly string[]
  provides: readonly string[]
  domains: readonly string[]
  man: { name: string; version: string } | null
  address: string
  handle: string
  route: string
  honest: string
}

const HONEST =
  'Provenance for one published package, computed from the committed Alpine mirror on request. Every field is ' +
  'Alpine\'s own metadata — name, version, checksum, dependencies, provides — and the domains are pattern ' +
  'matches over that metadata, a MEASUREMENT and not a verdict. Nothing here is installed, linked or executed, ' +
  'and the address is a content-address of the row, never a claim that the package was audited.'

/** packagePage(name) → everything a page needs, or null when the catalogue does not publish that name. Null is
 *  "no such package" only when the catalogue is present; an unprimed host says so through catalogueState. */
export function packagePage(name: string): PackagePage | null {
  const p: CataloguePackage | null = cataloguePackage(name)
  if (!p) return null
  const domains = DOMAIN_PATTERNS.filter((d) => d.match.test(p.name) || d.match.test(p.desc)).map((d) => d.domain)
  const man = resolveManPage(p.name)
  const address = toUuid(`alpine|${p.repo}|${p.name}|${p.version}|${p.checksum}`)
  return {
    name: p.name, version: p.version, repo: p.repo, checksum: p.checksum, desc: p.desc,
    deps: p.deps, provides: p.provides,
    domains,
    man: man && man.name !== p.name ? { name: man.name, version: man.version } : null,
    address, handle: handleOf(address), route: catalogueRouteOf(p.name),
    honest: HONEST,
  }
}

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// THE PAYLOAD IS THE MARKUP, not a second copy beside it. Every field carries its schema.org itemprop, so the
// page IS the record: a reader sees prose, a machine reads microdata, and there is no JSON block that can drift
// from the HTML because there is only one statement of each fact. `prop` is passed rather than derived from the
// label, because a label is prose and prose is translated.
const row = (k: string, v: string, prop?: string): string =>
  `<div data-slot="card-content"><strong>${esc(k)}</strong> ` +
  `<code${prop ? ` itemprop="${esc(prop)}"` : ''}>${esc(v)}</code></div>`

// EVERY ENTRY IS SERVED — the 40 was a number nobody derived (the captain: port all apps unlimited).
//
// It truncated with an honest "… N more", which is better than silence and still a page that does not carry
// what the package is. Measured before removing it: the largest dependency list is 422 (aws-sdk-cpp-dev), the
// largest provides list 1162 (rocq), and only 315 packages of 28,635 — 1.10% — exceed 40 at all. So the cap was
// paid by every reader of those 315 pages and bought nothing on the other 98.9%.
//
// A truncated list is also worse than it looks in THIS page specifically: the entries carry itemprop microdata,
// so a dropped dependency is not merely invisible to a person, it is absent from the machine-readable graph an
// agent or a search engine reads. The page's whole argument is that the markup IS the answer; a page that
// silently answers 40 of 422 is answering a different question.
const list = (k: string, xs: readonly string[], link?: (x: string) => string, prop?: string): string =>
  !xs.length ? '' : `<div data-slot="card-content"><strong>${esc(k)}</strong> ` +
    xs.map((x) => link
      ? `<a${prop ? ` itemprop="${esc(prop)}"` : ''} href="${esc(link(x))}">${esc(x)}</a>`
      : `<code${prop ? ` itemprop="${esc(prop)}"` : ''}>${esc(x)}</code>`).join(' ') + '</div>'

/** renderPackagePage(page, tools) → the served HTML. The tool list is passed IN rather than imported, so this
 *  module carries no opinion about which roster a host serves — the edge subset and the full one both fit. */
export function renderPackagePage(page: PackagePage, tools: readonly { name: string }[]): string {
  const bare = (d: string): string => d.split(/[<>=~]/)[0]!
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${esc(page.name)} ${esc(page.version)} · the published package · uuidna</title>` +
    `<meta name="description" content="${esc(page.desc || page.name)} — Alpine ${esc(page.repo)}, version ${esc(page.version)}, content-addressed ${esc(page.handle)}.">` +
    `<link rel="stylesheet" href="/uuidna.css"></head><body>` +
    `<main class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/SoftwareApplication">` +
    `<div data-slot="card-header"><h1 data-slot="card-title" itemprop="name">${esc(page.name)}</h1>` +
    `<p data-slot="card-description" itemprop="description">${esc(page.desc)}</p></div>` +
    `<link itemprop="url" href="${esc(page.route)}">` +
    `<meta itemprop="applicationCategory" content="${esc(page.domains.join(' ') || 'unclassified')}">` +
    row('version', page.version, 'softwareVersion') + row('repo', page.repo) +
    // the checksum as a schema.org PropertyValue — an identifier with its name, so a reader knows WHICH digest
    `<div data-slot="card-content" itemprop="identifier" itemscope itemtype="https://schema.org/PropertyValue">` +
    `<strong>checksum</strong> <meta itemprop="name" content="apk-checksum">` +
    `<code itemprop="value">${esc(page.checksum)}</code></div>` +
    row('address', page.address, 'sameAs') + row('handle', page.handle) +
    (page.domains.length ? list('domains', page.domains, () => `/os#the-port-by-domain`) : '') +
    (page.man ? `<div data-slot="card-content"><strong>man</strong> ` +
      `<a itemprop="documentation" href="${esc(catalogueRouteOf(page.man.name))}">${esc(page.man.name)}</a> ` +
      `<code>${esc(page.man.version)}</code></div>` : '') +
    list('depends on', page.deps.map(bare), (d) => catalogueRouteOf(d), 'requirements') +
    list('provides', page.provides, undefined, 'featureList') +
    list('tools', tools.map((t) => t.name), (t) => `/mcp#${t}`, 'potentialAction') +
    `<div data-slot="card-footer"><small itemprop="disambiguatingDescription">${esc(page.honest)}</small>` +
    `<p><a data-slot="button" href="/catalogue">/catalogue</a><a data-slot="button" href="/os">/os</a>` +
    `<a data-slot="button" href="/mcp">/mcp</a></p></div></main></body></html>`
}
