// quantum/os/ports — THE ONE REGISTRY OF PORTED ALPINE APIs, AND THE ANSWER TO ENTROPY I CREATED MYSELF.
//
// Seven domains were ported in one sitting — chat, shell, filesystem, network, driver, database, blockchain —
// and each arrived with its own summary function: chatApi(), shellCoverage(), fsApi(), netApi(), driverState(),
// dbApi(), chainApi(). Seven names, seven shapes, seven places to look, and no way to ask "what is ported?"
// without knowing all seven in advance. Each was locally reasonable and together they were a mess: exactly the
// duplication this tree's dry law exists to catch, produced by the person who keeps invoking it.
//
// One shape, computed once, is the fix. Every port answers the same five questions — which domain, how many
// packages and origins, what the API offers, what it honestly is — and the extras each port genuinely has
// (shell's coverage ratio, chat's protocol families) ride in `detail` instead of forcing seven signatures.
//
// THIS IS ALSO THE BUILD'S ANALYTICS SOURCE. README and the home page carry the port numbers, and hand-written
// numbers in prose are the thing the guard's own `counts` and `expected` finders refuse — a figure typed once is
// wrong on the next landing. portsCensus() is computed from the committed mirror on every build, so the surfaces
// quote a function rather than a memory.
import { chatApi } from '../chat/index.js'
import { shellCoverage } from '../shellapi/index.js'
import { fsApi } from '../fsapi/index.js'
import { dbApi } from '../dbapi/index.js'
import { chainApi } from '../chainapi/index.js'
import { netApi } from '../../../os/netapi/index.js'
import { driverState } from '../../../drivers/driverapi/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'

export interface PortedApi {
  domain: string
  /** what the one API is FOR, in a phrase — the reason the port is more than a census */
  offers: string
  packages: number
  origins: number
  /** the exported entry points, so a caller can find the door without reading the module */
  api: readonly string[]
  /** whatever this port measures that the others do not */
  detail: Record<string, unknown>
  address: string
}

export interface PortsCensus {
  definition: 'alpine-ports·one-registry'
  ports: PortedApi[]
  totals: { domains: number; packages: number; origins: number }
  /** the fold over every port address — moves when any port's counts move */
  receipt: string
  honest: string
}

/** every ported API in one shape — computed from the committed mirror, never written down. */
export function portsCensus(): PortsCensus {
  const chat = chatApi()
  const shell = shellCoverage()
  const fs = fsApi()
  const db = dbApi()
  const chain = chainApi()
  const net = netApi()
  const drv = driverState()

  const ports: PortedApi[] = [
    { domain: 'shell', offers: 'one exec door over uuidnaOS applets', packages: shell.ported.packages, origins: shell.ported.origins,
      api: ['shellRun', 'shellCoverage'], detail: { applets: shell.applets.length, met: shell.coverage.met, of: shell.coverage.of, missing: shell.missing.length } },
    { domain: 'driver', offers: 'the machine and the published bundle behind one door', packages: drv.ported.packages, origins: drv.ported.origins,
      api: drv.api, detail: { logical: drv.device.logical, memoryGiB: drv.device.memoryGiB, platform: drv.device.platform, arch: drv.device.arch } },
    { domain: 'database', offers: 'one query door where the address is the key', packages: db.ported.packages, origins: db.ported.origins,
      api: db.api, detail: { records: db.records } },
    { domain: 'network', offers: 'fetch-and-address, so a read becomes citable', packages: net.ported.packages, origins: net.ported.origins,
      api: net.api, detail: { boundary: net.boundary } },
    { domain: 'chat', offers: 'one sealed channel, no bridge', packages: chat.ported.packages, origins: chat.ported.origins,
      api: chat.api, detail: { protocols: chat.protocols.length, largest: chat.protocols[0]?.protocol ?? '' } },
    { domain: 'filesystem', offers: 'one question: are these the bytes that were sealed', packages: fs.ported.packages, origins: fs.ported.origins,
      api: fs.api, detail: {} },
    { domain: 'blockchain', offers: 'inclusion without disclosure', packages: chain.ported.packages, origins: chain.ported.origins,
      api: chain.api, detail: { leftToTheOperator: chain.leftToTheOperator.length } },
  ]
    .map((p) => ({ ...p, address: toUuid(`port:${p.domain}:${p.packages}:${p.origins}`) }))
    .sort((a, b) => b.packages - a.packages || a.domain.localeCompare(b.domain))

  return {
    definition: 'alpine-ports·one-registry',
    ports,
    totals: {
      domains: ports.length,
      packages: ports.reduce((s, p) => s + p.packages, 0),
      // ORIGINS ARE SUMMED PER PORT AND THAT IS NOT A DISTINCT COUNT. A package can match two domains (a chat
      // bridge is also network), so these origin sets overlap and the total OVER-COUNTS. Saying so is cheaper
      // than a distinct count nobody asked for, and far cheaper than a reader assuming it is one.
      origins: ports.reduce((s, p) => s + p.origins, 0),
    },
    receipt: merkleGravity(ports.map((p) => p.address)),
    honest:
      'Every port is PROVENANCE over Alpine\'s published metadata plus ONE API of uuidna\'s own. Package counts ' +
      'are per domain and the domains overlap, so the totals over-count rather than partition — a bridge is chat ' +
      'and network at once. Computed from the committed mirror on every build; no number here is written down.',
  }
}

// THE FRAGMENT IS COMPUTED HERE AND WRITTEN NOWHERE, and that is the drain law's doing rather than taste. The
// first cut shipped a gen-ports script that injected this block into README.md and docs/index.md — and the guard
// refused it in one line: "README.md has 2 declared writers (gen-readme, gen-ports) — two owners is drift waiting
// to happen". It is right. Two writers to one file means the last one to run decides, and which one that is
// becomes a fact about chain order rather than about intent.
//
// So the ownership does not move: gen-readme still owns README.md and gen-unlocks still owns docs/index.md, and
// both ask THIS function for the same block. One computation, two owners, no second writer — which is what DRY
// actually asks for, as opposed to one more script.
export const PORTS_BEGIN = '<!-- ports:begin -->'
export const PORTS_END = '<!-- ports:end -->'

/** the port analytics as a markdown block — computed from the mirror, injected by whoever owns the file */
export function portsFragment(): string {
  const c = portsCensus()
  const table = [
    '| domain | packages | origins | the one API offers |',
    '| --- | ---: | ---: | --- |',
    ...c.ports.map((p) => `| \`${p.domain}\` | ${p.packages} | ${p.origins} | ${p.offers} |`),
  ].join('\n')
  return [
    `**Alpine ported into ${c.totals.domains} APIs.** ${c.totals.packages} packages, each domain answering through one door —`,
    "provenance from Alpine's own published metadata, and one API of uuidna's own beside it.",
    '',
    table,
    '',
    'Package counts are per domain and the domains overlap — a chat bridge is also network — so these totals',
    `over-count rather than partition. Computed from the committed mirror on every build; receipt \`${c.receipt}\`.`,
  ].join('\n')
}

/** idempotent marker replace — running it twice is the same world as running it once */
export function injectPorts(text: string): string {
  const block = `${PORTS_BEGIN}\n${portsFragment()}\n${PORTS_END}`
  return text.includes(PORTS_BEGIN) && text.includes(PORTS_END)
    ? text.replace(new RegExp(`${PORTS_BEGIN}[\\s\\S]*?${PORTS_END}`), block)
    : text.trimEnd() + `\n\n${block}\n`
}
