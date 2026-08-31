// acme-port — Let's Encrypt on uuidnaOS: Alpine ACME clients through uuidna_exec (Layer 1) and
// uuidna_run (Layer 2). Theorems come from the apps — harmoniseOf binds each catalogue row to a
// sealed witness; crypto-using clients carry /theorem/sha256_grover_margin_is_the_address when unnamed.
import { handleOf } from '../../../handle.js'
import { domainToASCII } from 'node:url'
import { cataloguePackage } from '../catalogue/index.js'
import { defaultInstalls } from '../index.js'
import { uuidnaExec } from '../exec/index.js'
import { testInstallPackage, testAvailablePackage, type PackageAtATime } from '../patime/index.js'
import { planAlpineRun, planAlpineRuns, type RunPlan } from '../../../os/runtime/index.js'
import { foldAppTheorems, type AppTheoremBehind, type AppTheoremFold, type TheoremClaim } from '../apptheorem/index.js'
import { UUID_HEXBITS, hexbitDoorOf } from '../../../hexbit/index.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'

/** Published Let's Encrypt ACME v2 directory (RFC 8555). */
export const LETS_ENCRYPT_DIRECTORY = 'https://acme-v02.api.letsencrypt.org/directory'

/** Alpine packages that speak ACME to a CA — one uuidna_exec door each, not one MCP tool per apk. */
export const ACME_CLIENT_PACKAGES = [
  'lego',
  'certbot',
  'certbot-nginx',
  'acme-client',
  'acme.sh',
  'acme-tiny',
  'acmed',
] as const

/** Edge stack the HTTP-01 path expects — challenge responder + TLS primitives. */
export const ACME_EDGE_PACKAGES = ['nginx', 'openssl', 'acme-redirect'] as const

export type AcmeClient = (typeof ACME_CLIENT_PACKAGES)[number]

export interface AcmeDomainLabel {
  uLabel: string
  aLabel: string
  idn: boolean
}

export interface AcmeExecHit {
  line: string
  ok: boolean
  detail: string
}

export interface AcmeIssuancePlan {
  definition: 'uuidnaOS·acme·letsencrypt'
  directory: typeof LETS_ENCRYPT_DIRECTORY
  client: AcmeClient
  domains: string[]
  labels: AcmeDomainLabel[]
  challenge: 'http-01'
  webroot: string
  email: string
  layer1: AcmeExecHit[]
  layer2: { command: string; plan: RunPlan }
  packages: PackageAtATime[]
  apps: readonly AppTheoremBehind[]
  cites: readonly TheoremClaim[]
  receipt: string
  hexbits: number[]
}

export interface AcmePortCoverage {
  definition: 'uuidnaOS·acme-port·letsencrypt'
  clients: number
  edge: number
  passed: number
  failed: string[]
  complete: boolean
  commands: string[]
  packages: PackageAtATime[]
  plans: { ok: boolean; built: number; total: number; reason?: string }
  apps: readonly AppTheoremBehind[]
  cites: readonly TheoremClaim[]
  theoremFold: Pick<AppTheoremFold, 'harmonised' | 'crypto' | 'port'>
  receipt: string
  hexbits: number[]
}

const DEFAULT_WEBROOT = '/var/www/acme'
const DEFAULT_EMAIL = 'ops@localhost'

const ACME_NAMES = (): readonly string[] => [...ACME_CLIENT_PACKAGES, ...ACME_EDGE_PACKAGES]

function acmeTheoremFold(): AppTheoremFold {
  return foldAppTheorems(ACME_NAMES())
}

/** acmeDomainLabels(domains) → U-label / A-label pairs; ACME and nginx use A-labels on the wire. */
export function acmeDomainLabels(domains: readonly string[]): AcmeDomainLabel[] {
  return domains.map((uLabel) => {
    const aLabel = domainToASCII(uLabel)
    return { uLabel, aLabel, idn: aLabel !== uLabel }
  })
}

function testAcmePackage(name: string): PackageAtATime {
  const spec = defaultInstalls().specs.find((s) => s.name === name)
  if (spec) return testInstallPackage(spec)
  const pkg = cataloguePackage(name)
  if (!pkg) {
    return {
      name,
      route: '/catalogue/' + name,
      ok: false,
      man: null,
      commands: [],
      checks: [{ check: 'catalogue', ok: false, detail: `${name} missing from catalogue` }],
    }
  }
  return testAvailablePackage(pkg)
}

function legoRunCommand(labels: readonly AcmeDomainLabel[], webroot: string, email: string): string {
  const flags = labels.flatMap((l) => ['--domains', l.aLabel]).join(' ')
  return `lego --email ${email} ${flags} --http --http.webroot ${webroot} --path /etc/lego run`
}

function certbotRunCommand(labels: readonly AcmeDomainLabel[], webroot: string, email: string): string {
  const domains = labels.flatMap((l) => ['-d', l.aLabel]).join(' ')
  return `certbot certonly --webroot -w ${webroot} ${domains} --email ${email} --agree-tos --non-interactive`
}

/** planLetsEncryptIssuance(opts) → Layer 1 exec census + Layer 2 run recipe for one HTTP-01 issuance. */
export function planLetsEncryptIssuance(opts: {
  domains: readonly string[]
  client?: AcmeClient
  webroot?: string
  email?: string
}): AcmeIssuancePlan {
  const client = opts.client ?? 'lego'
  const webroot = opts.webroot ?? DEFAULT_WEBROOT
  const email = opts.email ?? DEFAULT_EMAIL
  const labels = acmeDomainLabels(opts.domains)
  const fold = acmeTheoremFold()
  const packages = ACME_NAMES().map(testAcmePackage)
  const layer1Lines = [
    `apk info ${client}`,
    `man ${client}`,
    'nginx',
    'openssl',
    'apk search lego',
    'man openssl',
  ]
  const layer1: AcmeExecHit[] = layer1Lines.map((line) => {
    const r = uuidnaExec(line)
    const bits = Array.isArray(r.hexbits) ? r.hexbits : []
    const ok = r.ok === true && bits.length === UUID_HEXBITS
    return { line, ok, detail: ok ? line : (r.output[0] ?? 'exec refused') }
  })
  const command = client === 'certbot' || client === 'certbot-nginx'
    ? certbotRunCommand(labels, webroot, email)
    : legoRunCommand(labels, webroot, email)
  const layer2 = { command, plan: planAlpineRun(command) }
  const receipt = merkleGravity([
    toUuid('acme|letsencrypt|' + client),
    toUuid('domains|' + labels.map((l) => l.aLabel).join(',')),
    toUuid('layer2|' + (layer2.plan.ok ? '1' : '0')),
    ...fold.apps.map((a) => toUuid('app|' + a.name + '|' + a.theorem)),
    ...packages.filter((p) => !p.ok).map((p) => toUuid('fail|' + p.name)),
  ])
  return {
    definition: 'uuidnaOS·acme·letsencrypt',
    directory: LETS_ENCRYPT_DIRECTORY,
    client,
    domains: [...opts.domains],
    labels,
    challenge: 'http-01',
    webroot,
    email,
    layer1,
    layer2,
    packages,
    apps: fold.apps,
    cites: fold.theorems,
    receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
  }
}

/** testAcmePort() → every ACME client + edge package through uuidna_exec; all cmd: get Layer 2 plans. */
export function testAcmePort(): AcmePortCoverage {
  const names = ACME_NAMES()
  const fold = acmeTheoremFold()
  const packages = names.map(testAcmePackage)
  const commands = [...new Set(packages.flatMap((p) => p.commands))]
  const batch = planAlpineRuns(commands)
  const built = batch.plans.filter((p) => p.plan.ok).length
  const failed = packages.filter((p) => !p.ok).map((p) => p.name)
  const receipt = merkleGravity([
    toUuid('acme-port|' + names.length),
    toUuid('passed|' + (packages.length - failed.length)),
    toUuid('cmd|' + commands.length),
    ...fold.apps.map((a) => toUuid('app|' + a.name + '|' + a.theorem)),
    ...failed.map((n) => toUuid('fail|' + n)),
  ])
  return {
    definition: 'uuidnaOS·acme-port·letsencrypt',
    clients: ACME_CLIENT_PACKAGES.length,
    edge: ACME_EDGE_PACKAGES.length,
    passed: packages.length - failed.length,
    failed,
    complete: failed.length === 0,
    commands,
    packages,
    plans: { ok: batch.ok, built, total: batch.plans.length, reason: batch.reason },
    apps: fold.apps,
    cites: fold.theorems,
    theoremFold: { harmonised: fold.harmonised, crypto: fold.crypto, port: fold.port },
    receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
  }
}

/** renderAcmePort(c) → summary for CLI and tests. */
export function renderAcmePort(c: AcmePortCoverage): string {
  const status = c.complete ? 'COMPLETE' : 'INCOMPLETE'
  return [
    `${status} acme-port ${c.passed}/${c.clients + c.edge} (clients ${c.clients} · edge ${c.edge})`,
    `  ${c.commands.length} cmd: · plans ${c.plans.built}/${c.plans.total}${c.plans.reason ? ` (${c.plans.reason})` : ''}`,
    `  theorems from apps ${c.cites.length} (harmonised ${c.theoremFold.harmonised} · crypto ${c.theoremFold.crypto} · port ${c.theoremFold.port})`,
    `  cites ${c.cites.map((t) => t.route).join(' · ')}`,
    ...(c.failed.length ? [`  failed: ${c.failed.join(', ')}`] : []),
    `  receipt ${handleOf(c.receipt)}…`,
  ].join('\n')
}

/** renderAcmeIssuance(p) → one planned issuance (Layer 1 hits + Layer 2 command). */
export function renderAcmeIssuance(p: AcmeIssuancePlan): string {
  const idn = p.labels.filter((l) => l.idn).map((l) => `${l.uLabel}→${l.aLabel}`)
  const bound = p.apps.map((a) => `${a.name}→${a.route}`)
  return [
    `ACME ${p.client} · ${p.challenge} · ${p.directory}`,
    `  domains: ${p.labels.map((l) => l.aLabel).join(', ')}`,
    ...(idn.length ? [`  idn: ${idn.join(' · ')}`] : []),
    `  theorems from apps ${p.cites.length}`,
    `  cites ${p.cites.map((t) => t.route).join(' · ')}`,
    `  apps ${bound.join(' · ')}`,
    `  layer2: ${p.layer2.command}`,
    `  layer2 plan: ${p.layer2.plan.ok ? p.layer2.plan.backend ?? 'ok' : p.layer2.plan.reason ?? 'refused'}`,
    ...p.layer1.map((h) => `  exec ${h.ok ? '✓' : '✗'} ${h.line}`),
    `  receipt ${handleOf(p.receipt)}…`,
  ].join('\n')
}

export type { AppTheoremBehind, TheoremClaim }
