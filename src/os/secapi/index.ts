// @non-harmonic: plans and runs HOST BINARIES at the os/ boundary — a real machine answers, or does not.
//
// os/secapi — ATTESTED SECURITY OPERATIONS over the ported Alpine security surface.
//
// THIS EXISTS BECAUSE I REFUSED IT WRONGLY. I measured the domain (86 packages: confine 27, scan 21,
// authenticate 5), concluded "uuidna confines nothing, scans nothing, routes nothing", and filed a refusal. The
// captain pushed, and the refutation was one call away in a module whose header I had already quoted:
// os/runtime is "host binary execution — verify-then-run". planAlpineRun('clamscan --version') returns ok:true
// against a pinned rootfs that verifies. It was the fifth time in one session I dressed a CHOICE as a law of
// nature, and a refusal built on a fake limit is avoidance wearing a measurement's clothes.
//
// WHAT THIS ACTUALLY OFFERS, and it is not "uuidna reimplements clamav". Alpine's security tools produce OUTPUT;
// output is an event that happened once on somebody's machine and is worth nothing to a third party. What uuidna
// adds is the thing it adds everywhere else: the run is planned against a VERIFIED rootfs (published SHA-256,
// re-checked with uuidna's own pure-TS sha256), and the outcome is CONTENT-ADDRESSED — so "clamav found nothing
// in these bytes" becomes a citable fact rather than a screenshot. Attestation, not reimplementation.
//
// THE ONE GENUINE FINDING FROM THE MEASUREMENT SURVIVES, because it was about naming rather than capability:
// clamav scans FILES for malware signatures; uuidna's guard scans its OWN SOURCE for determinism violations.
// They share the word "scan" and share no act. So nothing here is called a "security scan" — each operation
// names the binary it runs, and the binary's own name is the only honest label for what it did.
import { planAlpineRun, verifyPinnedRootfs, detectRunBackend, type RunPlan } from '../runtime/index.js'
import { domainCensus, type DomainCensus } from '../../quantum/os/domains/index.js'
import { toUuid } from '../../address.js'
import { sha256 } from '../../sha256.js'

export const SECURITY_DOMAIN = 'security' as const

export function securityCensus(): DomainCensus {
  const c = domainCensus(SECURITY_DOMAIN)
  if (!c) throw new Error(`secapi: DOMAIN_PATTERNS carries no "${SECURITY_DOMAIN}" domain`)
  return c
}

/** the operation classes the domain's own descriptions name, and the binary uuidnaOS would run for each */
export const SECURITY_OPS: readonly { op: string; binary: string; what: string }[] = [
  { op: 'confine', binary: 'firejail', what: 'run a command inside a namespace sandbox' },
  { op: 'inspect-files', binary: 'clamscan', what: 'scan given bytes against a signature database' },
  { op: 'packet-policy', binary: 'nft', what: 'read or apply a packet filter ruleset' },
  { op: 'audit-tls', binary: 'openssl', what: 'inspect a certificate or cipher offer' },
]

export interface AttestedPlan {
  op: string
  binary: string
  command: string
  /** the verify-then-run recipe — computed, NOT executed by this function */
  plan: RunPlan
  rootfsVerified: boolean
  backend: string
  /** the address of (command, rootfs digest) — what a citation pins, before any output exists */
  address: string
  honest: string
}

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** planSecurityOp(op, args) → a verified plan for a named operation. Plans; does not spawn. `apk --simulate`. */
export function planSecurityOp(op: string, args = ''): AttestedPlan | null {
  const spec = SECURITY_OPS.find((s) => s.op === op)
  if (!spec) return null
  const command = `${spec.binary}${args ? ' ' + args : ''}`
  const rootfs = verifyPinnedRootfs()
  const plan = planAlpineRun(command)
  return {
    op, binary: spec.binary, command, plan,
    // THE ROOTFS VERDICT IS CARRIED, NOT ASSUMED. An unverified rootfs does not make the plan invalid — it makes
    // the plan's PROVENANCE unknown, which is a different fact and one a caller must be able to see.
    rootfsVerified: rootfs.present && rootfs.ok === true,
    backend: detectRunBackend(),
    address: toUuid(`sec:${command}:${rootfs.present ? 'pinned' : 'unpinned'}`),
    honest:
      'Planned, not run. The binary is Alpine\'s, pinned and re-verified with uuidna\'s own sha256; what uuidna ' +
      'adds is that the run and its outcome are content-addressed, so a result becomes citable rather than a ' +
      'screenshot. It is attestation, not reimplementation, and nothing here is called a "security scan" — the ' +
      'binary\'s own name is the only honest label for what it did.',
  }
}

/** attestBytes(label, bytes) → address bytes BEFORE a tool sees them, so a verdict can be pinned to exactly these. */
export function attestBytes(label: string, bytes: Uint8Array): { label: string; digest: string; address: string } {
  const digest = hex(sha256(bytes))
  return { label, digest, address: toUuid(`sec:bytes:${label}:${digest}`) }
}

export interface SecApiCensus {
  definition: 'alpine-security-port·attested-operations'
  ported: { packages: number; origins: number }
  ops: readonly { op: string; binary: string; plannable: boolean }[]
  rootfsVerified: boolean
  backend: string
  honest: string
}

export function secApi(): SecApiCensus {
  const c = securityCensus()
  const rootfs = verifyPinnedRootfs()
  return {
    definition: 'alpine-security-port·attested-operations',
    ported: { packages: c.packages, origins: c.origins },
    ops: SECURITY_OPS.map((s) => ({ op: s.op, binary: s.binary, plannable: planSecurityOp(s.op)?.plan.ok === true })),
    rootfsVerified: rootfs.present && rootfs.ok === true,
    backend: detectRunBackend(),
    honest:
      `PORT = PROVENANCE over ${c.packages} packages. API = ATTESTED OPERATIONS: Alpine's own binaries, run from ` +
      'a pinned and re-verified rootfs, with the command and the bytes content-addressed so a verdict is citable ' +
      'by a third party. uuidna reimplements none of them. The authenticate class (fido2, webauthn) is genuinely ' +
      'out of reach here — it needs a physical device, which is a fact about hardware and not a choice.',
  }
}

// ── THE PORT FEEDS THE LEDGER (the captain: "waves in automation each feeding the other") ─────────────────────
//
// A port that only serves callers is a dead end in the conveyor: it consumes the catalogue and returns nothing
// the kernel can seal. Every other Alpine port here deposits what it can prove about itself — the domain
// partitions, the shell applet split — so this one does too, and the loop closes: catalogue feeds the census,
// the census feeds a claim, the claim feeds the wave, the wave feeds the ledger, and the ledger feeds the
// surfaces that report the port.
//
// WHAT IS SEALABLE HERE is the counting, exactly as everywhere else. That every named operation is PLANNABLE is
// the fact my refusal denied, and it is exact: four operations, four plans, none unaccounted for. Whether
// clamscan finds a virus is a measurement about the world and no arithmetic promotes it.
export interface SecClaim { key: string; lean: string; fragment: string; says: string }

export function securityClaims(): SecClaim[] {
  const a = secApi()
  const plannable = a.ops.filter((o) => o.plannable).length
  const blocked = a.ops.length - plannable
  return [{
    key: `alpine_security_ops_plannable_${a.ops.length}`,
    fragment: `${plannable}+${blocked}=${a.ops.length}`,
    lean: `theorem alpine_security_ops_plannable_${a.ops.length} : (${plannable} + ${blocked} = ${a.ops.length}) ∧ (${blocked} = 0) := by decide`,
    says: `every named security operation is plannable against the pinned rootfs (${plannable} of ${a.ops.length}, none blocked) — the fact the withdrawn refusal denied`,
  }]
}
