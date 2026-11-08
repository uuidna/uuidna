// Cooled out of index.ts by the heat family (scripts/cool.mjs): qpuDocsOf, docsHolds, readmeOf, readmeHolds.
import {
  byDecideOf,
  coins,
  cors,
  cryptoClaimOf,
  formulaOf,
  installCloudflare,
  mintOf,
  n,
  onceOf,
  qpuCiteOf,
  cssOf,
  cubeOf,
  developHolds,
  developOf,
  facesOf,
  genesisOf,
  qpuHandleOf,
  harnessesOf,
  installManifestOf,
  ladderOf,
  leanOf,
  mcpCallOf,
  mcpOf,
  proveOf,
  quantumOf,
  seatOf,
  seed,
  shorFactorOf,
  theorem,
  unit,
} from './index.js'

/**
 * The door TABLE — method, path, name, href only, no theorem readings. CHEAP: the router reads the door PATHS from
 * this without building the full qpuDocsOf (which evaluates leanOf and, through it, the Shor/circuit computation).
 * Single source of the door list; qpuDocsOf attaches the readings on top so the two cannot drift.
 * @wing agents
 * @kind function
 */
export const apiDoorsOf = (): { method: 'GET' | 'POST'; path: string; name: string; href: string }[] => [
  { method: 'GET', path: '/', name: 'quantum', href: unit.origin },
  { method: 'GET', path: `/${unit.path}`, name: 'lean', href: unit.href },
  { method: 'GET', path: '/api', name: 'catalog', href: `${unit.origin}/api` },
  { method: 'POST', path: '/api', name: 'tools/call', href: `${unit.origin}/api` },
  { method: 'GET', path: '/cite', name: 'cite', href: `${unit.origin}/cite` },
  { method: 'GET', path: '/message', name: 'message', href: `${unit.origin}/message` },
  { method: 'POST', path: '/message', name: 'message', href: `${unit.origin}/message` },
]

/**
 * The unit's inline guide: abstract, API rows, formulas and the learning ladder, as one document.
 * @wing agents
 * @kind builder
 * @evidence docsHolds
 */
export const qpuDocsOf = onceOf(() => {
  const lean = leanOf()
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  const fused = faces.faces * handle.kv.amplitudes
  const abstract = `theorem quantum : fused = faces * mintOf (bits + seed). vertices ${cube.vertices} hexbit ${cube.hexbit} bits ${cube.bits} faces ${faces.faces} fused ${fused}. Source ${lean.src}. GET ${unit.origin} quantum. GET ${unit.href} lean. POST ${unit.origin}/api tools/list. tools/call prove. Reads need no auth; storage writes need a Bearer token. JSON-LD.`
  const readingOf = (d: { method: string; path: string }): string =>
    d.method === 'GET' && d.path === '/' ? `theorem quantum. theorem shor. theorem crypto. ${shorFactorOf()}. JSON-LD. No auth.`
    : d.method === 'GET' && d.path === `/${unit.path}` ? `Lean proof. theorem infinite. theorem distribute. theorem shor. theorem crypto. ${lean.src}. JSON-LD. No auth.`
    : d.method === 'GET' && d.path === '/api' ? `tools ${mintOf(n) + mintOf(n)} in tools/list: ${mintOf(n)} doors and ${mintOf(n)} cybersecurity. cybersecurity theorem shor ${shorFactorOf()}. theorem crypto ${cryptoClaimOf()}. fourteen schemas. schema.org ItemList. JSON-LD. No auth.`
    : d.method === 'POST' && d.path === '/api' ? 'JSON-RPC tools/list tools/call prove. theorem shor. theorem crypto. crypto_rsa crypto_split. { man: true }. No auth.'
    : d.method === 'GET' && d.path === '/cite' ? 'MLA 8. when never. JSON-LD. No auth.'
    : d.method === 'GET' && d.path === '/message' ? 'lanes = faces. hop involution. JSON-LD. No auth.'
    : '202. hop involution. JSON-LD. No auth.'
  const api = apiDoorsOf().map((d) => ({ ...d, reading: readingOf(d) }))
  const formulas = [...lean.rows, ...lean.cover, lean.climb].map((r) => ({
    identity: r.heading,
    formula: r.formula,
    theorem: r.theorem,
    reading: r.reading}))
  const ladder = ladderOf()
  const documentation = [abstract, ...api.map((a) => `${a.method} ${a.path} ${a.name}. ${a.reading}`), ...formulas.map((f) => `theorem ${f.identity}. ${f.reading}`), ...ladder.map((l) => `learn ${l.step}. ${l.concept}: ${l.request.tool}. ${l.expect}. invariant ${l.invariant}. theorem ${l.theorem}.`)].join('\n')
  const holds =
    lean.holds === true &&
    documentation.includes(abstract) &&
    documentation.includes('No auth') &&
    documentation.includes('theorem quantum') &&
    documentation.includes('theorem infinite') &&
    documentation.includes('theorem distribute') &&
    documentation.includes('theorem raid') &&
    documentation.includes('theorem kv') &&
    documentation.includes('theorem temperature') &&
    documentation.includes('theorem superconductivity') &&
    documentation.includes('theorem computer') &&
    documentation.includes('theorem server') &&
    documentation.includes('theorem fusion') &&
    documentation.includes('theorem design') &&
    documentation.includes('theorem neuro') &&
    documentation.includes('theorem hybrid') &&
    documentation.includes('JSON-LD') &&
    documentation.includes('schema.org') &&
    documentation.includes('tools/list') &&
    api.length === faces.rays &&
    formulas.every((f) => documentation.includes(f.reading) && formulaOf(f.formula) && !byDecideOf(f.theorem))
  return { kind: 'docs' as const, inline: true as const,
    guide: api.length === faces.rays,
    abstract, api, formulas, ladder, documentation, src: lean.src, holds }
})

export const docsHolds = (d = qpuDocsOf()): boolean =>
  d.holds === true &&
  d.inline === true &&
  d.kind === 'docs' &&
  d.documentation.includes(d.abstract) &&
  d.documentation.includes('No auth') &&
  d.documentation.includes('theorem quantum') &&
  d.documentation.includes('theorem infinite') &&
  d.documentation.includes('theorem raid') &&
  d.documentation.includes('theorem fusion') &&
  d.documentation.includes('JSON-LD') &&
  d.documentation.includes('schema.org') &&
  d.documentation.includes('tools/list') &&
  d.documentation.includes('theorem shor') &&
  d.documentation.includes('theorem crypto') &&
  d.documentation.includes(`${shorFactorOf()}`) &&
  d.api.length === facesOf().rays &&
  d.src === unit.fuse.lean

/** THE README IS THE npm PAGE. Read as the package's front door on npmjs.com (2026-09-12): the first screen had no
 * install line, no usage, and the same tag sentences repeated down the page — "demo is not a test nor a proof" five
 * times, "theorem shor. Factor 91." fifteen. Every claim is kept (readmeHolds pins each one, verbatim), but a
 * reader now meets install → use → routes → tools as tables, and each pinned sentence is said once. Nothing here is
  * @wing agents
  * @kind builder
  * @evidence readmeHolds
 * typed twice: descriptions, readings, citations and harness recipes are the served objects printed. */
export const readmeOf = (m = mcpOf()): string => {
  const lean = leanOf()
  const quantum = quantumOf()
  const cite = qpuCiteOf()
  const prove = proveOf()
  const docs = quantum.docs
  const blueprint = unit.fuse.src
  const harness = harnessesOf()
  const row = (...cells: string[]): string => `| ${cells.join(' | ')} |`
  const lines = [
    `# QPU`,
    '',
    `\`@uuidna/qpu\` — Running quantum circuit at ${unit.origin}: an exact state-vector computation (a ${quantum.circuit.register.qubits}-qubit circuit register; Shor's register is sized by its modulus), its Lean 4 proofs, and an MCP server in one Cloudflare Worker, which boot.js also serves from Node. theorem quantum : fused = faces * mintOf (bits + seed). Public quantum API. Reads need no auth; storage writes need a Bearer token. JSON-LD. CORS ${cors}. API only. No HTML. The TypeScript and Lean sources are the blueprint; this README is the paper generated from that blueprint.`,
    '',
    '```sh',
    'npm install @uuidna/qpu',
    '```',
    '',
    '```ts',
    "import { mcpCallOf, mcpOf } from '@uuidna/qpu'",
    '',
    'const catalog = mcpOf()                       // the MCP catalog: tools, schemas, install recipes',
    "const circuit = await mcpCallOf('quantum') // recognition first; { full: true } is the JSON-LD document",
    '```',
    '',
    `Or without installing: \`GET ${unit.origin}\`, or \`POST ${m.href}\` with JSON-RPC \`tools/list\` then \`tools/call\`. Do not import uuidna; this package stands alone. Source \`${lean.src}\`.`,
    '',
    '## Abstract',
    '',
    `A named host ${unit.host} exposes one quantum processing unit as JSON-LD. fused is ${quantum.fused}; next is fused + fused = ${quantum.next}. Native gates are h and cnot. theorem temperature, theorem superconductivity, theorem qubits, theorem shor and theorem crypto are theorems in \`${lean.src}\`. GHZ ${quantum.purpose.nature.ghz}; entangled ${quantum.purpose.nature.entangled}, product ${quantum.purpose.nature.product}. demo is not a test nor a proof.`,
    '',
    '## Unit',
    '',
    `The blueprint is \`${blueprint}\` fused with \`${lean.src}\`. theorem quantum, theorem infinite, and theorem distribute are theorems in Lean, not restated as chapters here.`,
    '',
    row('Constant', 'Value'),
    row('---', '---'),
    row('mintOf(k)', '2^k by doubling'),
    row('n', '3'),
    row('seed', '1'),
    row('coins', '2'),
    row('rays', '7'),
    row('faces', '14'),
    row('bits', '32'),
    row('cube vertices', String(quantum.cube.vertices)),
    row('hexbit', String(quantum.cube.hexbit)),
    '',
    `Climb ${quantum.purpose.science.climb.join(' then ')}. Extras ${quantum.purpose.science.extras.join(' ')} stay off the seven-path guide. Integrity is three tests: quantum, lean, sealed. If they fail every path is 404.`,
    '',
    '## Interface',
    '',
    `Seven paths. Eight sealed MCP tools, plus eight cybersecurity morph tools listed on tools/list. Extra paths do not join that list. Not a ninth sealed tool. User guide is docs.inline on the unit. Theorems are lean and prove. \`{ man: true }\` is the theorem on the wire.`,
    '',
    row('Route', 'Tool', 'Reading'),
    row('---', '---', '---'),
    ...docs.api.map((r) => row(`\`${r.method} ${r.path}\``, r.name, r.reading)),
    '',
    row('Tool', 'What it returns'),
    row('---', '---'),
    ...m.tools.map((t) => row(`\`${t.name}\``, t.man.description)),
    '',
    `Cybersecurity morph tools. crypto_rsa theorem shor ${shorFactorOf()}. crypto_split theorem crypto ${cryptoClaimOf()}.`,
    '',
    `Discovery, off the seven-path guide: \`/.well-known/mcp.json\` \`/mcp.json\` \`/install.json\` \`/openapi.json\` \`/sitemap.xml\` \`/qpu.css\`. The sheet is ${genesisOf().card.length} card slots on rays, ${genesisOf().frameworks.length} frameworks on faces, and variant size state element theme seated by index — no HTML, no request, ${cssOf().fused.bytes} bytes. JSON-RPC batches accepted on \`POST /mcp\`; a \`GET /mcp\` asking for an event stream gets 405 with Allow, so streamable-HTTP clients fall back to POST.`,
    '',
    row('Tool', 'Claim'),
    row('---', '---'),
    ...m.cybersecurity.tools.map((t) => row(`\`${t.name}\``, t.man.description)),
    '',
    '## Results',
    '',
    `theorem shor ${shorFactorOf()}. theorem crypto ${cryptoClaimOf()}.`,
    '',
    '```lean',
    prove.theorems.find((r) => r.heading === 'shor')?.theorem ?? '',
    prove.theorems.find((r) => r.heading === 'crypto')?.theorem ?? '',
    '```',
    '',
    `Fault tolerance: ${quantum.evidence.fault.code}, distance ${quantum.evidence.fault.distance}, codes ${quantum.evidence.fault.codes}, syndrome ${quantum.evidence.fault.syndrome.join(' ')}, logical off ${quantum.evidence.fault.logical.off}; logical < physical ${quantum.evidence.fault.logicalLtPhysical} on this run, one distance.`,
    '',
    `CERN Open Data ${quantum.evidence.verify.cern}. LHC running. Four CMS records. Coil, electronics, hybrid, raid, and clay identities are in \`${lean.src}\`; theorem clay is coins * rays = faces.`,
    '',
    '## Evidence',
    '',
    row('Measurement', 'Value'),
    row('---', '---'),
    row('Execution provenance', `provider ${quantum.evidence.provenance.provider}, device ${quantum.evidence.provenance.device}, job ${quantum.evidence.provenance.job}, shots ${quantum.evidence.provenance.shots}`),
    row('Compiler', `native ${quantum.evidence.provenance.compiler.native.join(' ')}; compiled ${quantum.evidence.provenance.compiler.compiled.join(' ')}`),
    row('Device-specific noise', `channel ${quantum.evidence.noise.model}, drift ${quantum.evidence.noise.drift}`),
    row('Volume (heavy outputs)', `volume dim ${quantum.evidence.volume.dim}, heavy ${quantum.evidence.volume.observed} / ${quantum.evidence.volume.total}, mirror ${quantum.evidence.volume.mirror}`),
    row('Cross-validation', `ideal ${quantum.evidence.cross.ideal}, noisy ${quantum.evidence.cross.noisy}, agree ideal ${quantum.evidence.cross.agreeIdeal}, agree noise ${quantum.evidence.cross.agreeNoise}`),
    row('Scaling (theorem qubits, theorem register)', `qubits ${quantum.evidence.scaling.qubits}, dim ${quantum.evidence.scaling.dim}, depth ${quantum.evidence.scaling.depth}, exact ${quantum.evidence.scaling.exact}, beyond ${quantum.evidence.scaling.beyond}, advantage ${quantum.evidence.scaling.advantage}`),
    row('Independent verification', `CORS ${quantum.evidence.verify.cors}, origin ${quantum.evidence.verify.origin}, Lean \`${quantum.evidence.verify.lean}\`, provenance and noise ${quantum.evidence.verify.provenanceAndNoise}, algorithm ${quantum.evidence.verify.algorithm}, RSA ${quantum.evidence.verify.rsa}, crypt ${quantum.evidence.verify.crypt}, encrypt ${quantum.evidence.verify.encrypt}`),
    '',
    '## Recompute',
    '',
    'This README is generated from the blueprint at build. `npm test` compiles then writes the paper. `qpu script ci` is Lean then test. `npm run ship` deploys.',
    '',
    '```sh',
    'git clone https://github.com/uuidna/qpu && cd qpu',
    'npm ci',
    'npm test',
    '```',
    '',
    `Run your own: \`npx uuidna-install\` reads Cloudflare \`install.json\`, or [![Deploy to Cloudflare](${installCloudflare.button})](${installCloudflare.qpu}).`,
    '',
    'Learn, in order. Each step teaches one thing, names the invariant to check it against, and is its own test: Reproduce runs the test that asserts exactly what Expect says.',
    '',
    row('Step', 'Concept', 'Request', 'Expect', 'Invariant', 'Theorem', 'Reproduce'),
    row('---', '---', '---', '---', '---', '---', '---'),
    ...ladderOf().map((l) => row(String(l.step), l.concept, `${l.request.method} ${l.request.path} · ${l.request.tool}`, l.expect, l.invariant, `theorem ${l.theorem}`, `\`node --test --test-name-pattern="ladder ${l.step} " dist/quantum/processing/unit/ladder.test.js\``)),
    '',
    `Boot with Node. ${installManifestOf().hardware.docker}. Raspberry Pi: ${installManifestOf().hardware.pi}. The boot's receipt is ${installManifestOf().hardware.prove} — ${installManifestOf().hardware.receipt}. The device seat stays ${seatOf().device}: ${seatOf().doctrine}.`,
    '',
    `Integrate in any harness. One computed block, served on initialize as \`install\` and printed here from the same function. URL ${harness.url}. ${harness.auth}.`,
    '',
    row('Harness', 'How', 'File', 'Config'),
    row('---', '---', '---', '---'),
    ...harness.rows.map((r) => row(`**${r.harness}** (${r.kind})`, r.how, r.file, `\`${typeof r.config === 'string' ? r.config.replace(/\n/g, ' ') : JSON.stringify(r.config)}\``)),
    '',
    '## Cite',
    '',
    `MLA 8, ${cite.inText}. DOI ${cite.doi}, archive ${cite.archive}, identifier ${cite.identifier}, ORCID ${cite.author.orcid}. when ${cite.when}: the citation names no access date; the DOI names archived version ${cite.archived.version}${cite.current ? '' : `, and the host serves ${cite.served.version}`}. Cite the running quantum circuit and its Lean proof.`,
    '',
    ...cite.rows.map((r) => `- ${r.works}`),
    `- ${cite.prior.works}`,
    ...cite.links.edges.map((edge) => `- ${edge.from} → ${edge.to} holds ${edge.holds}${edge.lead ? ' lead' : ''}`),
    ...(cite.links.next ? [`- next ${cite.links.next.uuid}`] : []),
    '',
    seatOf().acronym,
    '',
    '## License',
    '',
    'CC-BY-NC-ND-4.0. Source `LICENSE`. Copyright Tsvetan Rouschev.',
    '',
  ]
  return `${lines.join('\n')}\n`
}

export const readmeHolds = (text = readmeOf()): boolean => {
  const lean = leanOf()
  const mcp = mcpOf()
  const cite = qpuCiteOf()
  const headings = ['## Abstract', '## Unit', '## Interface', '## Results', '## Evidence', '## Recompute', '## Cite', '## License'] as const
  const order = headings.every((h, i) => i === n - n || text.indexOf(headings[i - seed]!) < text.indexOf(h))
  return (
    order &&
    text.startsWith('# QPU\n') &&
    !text.includes('Host never') &&
    !text.includes('## Develop') &&
    !text.includes('## Purpose') &&
    !text.includes('## Coil') &&
    !text.includes('## Hybrid') &&
    !text.includes('## Guide') &&
    !text.includes('## Tools') &&
    !text.includes('## Efficiency') &&
    !text.includes('## Train') &&
    !text.includes('## Sandbox') &&
    !text.includes('## Improve') &&
    !text.includes('## Compete') &&
    !text.includes('## Storage') &&
    !text.includes('## Proof') &&
    !text.includes('## Build') &&
    !text.includes('## Man') &&
    !text.includes('## Prove') &&
    !text.includes('## Message') &&
    !text.includes('DOI empty') &&
    !text.includes(developOf().reading) &&
    text.includes('API only') &&
    text.includes('No HTML') &&
    text.includes('docs.inline') &&
    text.includes('npx uuidna-install') &&
    text.includes('deploy.workers.cloudflare.com') &&
    text.includes('install.json') &&
    text.includes('This README is generated') &&
    text.includes('Do not import uuidna') &&
    text.includes('demo is not a test nor a proof') &&
    text.includes('the blueprint') &&
    text.includes('the paper') &&
    text.includes('theorem quantum') &&
    text.includes('theorem shor') &&
    text.includes('theorem crypto') &&
    text.includes('theorem temperature') &&
    text.includes('theorem qubits') &&
    text.includes('Theorems are lean') &&
    text.includes(`${shorFactorOf()}`) &&
    text.includes(`Up to ${cubeOf().bits * facesOf().faces} tools`) &&
    text.includes('crypto_rsa') &&
    text.includes('crypto_split') &&
    text.includes('theorem infinite') &&
    text.includes('theorem distribute') &&
    text.includes('LHC running') &&
    text.includes('opendata.cern.ch') &&
    text.includes('Not a ninth sealed tool') &&
    text.includes('No auth') &&
    text.includes('JSON-LD') &&
    text.includes('schema.org') &&
    text.includes('Running quantum circuit') &&
    text.includes('next is fused + fused') &&
    text.includes('/message') &&
    text.includes('CC-BY-NC-ND-4.0') &&
    text.includes('LICENSE') &&
    text.includes(cite.author.orcid) &&
    text.includes(cite.doi) &&
    text.includes(cite.identifier) &&
    text.includes(cite.prior.works) &&
    text.includes(lean.src) &&
    text.includes(unit.fuse.src) &&
    developHolds() &&
    mcp.tools.every((t) => text.includes(t.name) && text.includes(t.man.description)) &&
    mcp.cybersecurity.tools.every((t) => text.includes(t.name) && text.includes(t.man.description)) &&
    mcp.prove.src === lean.src &&
    cite.rows.every((r) => text.includes(r.works)) &&
    qpuDocsOf().api.every((row) => text.includes(`\`${row.method} ${row.path}\``))
  )
}
