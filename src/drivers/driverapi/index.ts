// @non-harmonic: reads the REAL MACHINE — core count, memory and platform are facts about silicon, not theorems.
//
// drivers/driverapi — ONE DRIVER API OVER THE PORTED ALPINE DRIVER SURFACE.
//
// IT LIVES UNDER src/drivers BECAUSE THAT IS THE OTHER NAMED BOUNDARY. src/os and src/drivers are the two places
// the determinism hard-reject exempts, and hardware is the reason the second one exists: the same code reads 10
// cores here and 4 there, and no amount of care makes that decidable. Bounded, not forbidden — the captain's
// correction, 2026-09-01, when I had called this surface off-limits rather than declared.
//
// Alpine publishes 630 driver packages across 460 origins: firmware blobs, kernel module bundles, the userspace
// halves of device stacks. Three questions run through all of them, and until now uuidna answered each in a
// different place:
//
//   • WHAT HARDWARE IS ACTUALLY HERE?      hostQuantumDevice — measured, impure, folded to an address
//   • WHAT DRIVER BUNDLE IS THIS RESTING ON? driverBundle + verifyDriverBundle — Alpine's published SHA-256,
//                                             re-checked against real bytes with uuidna's own pure-TS sha256
//   • WHAT DOES ALPINE EVEN NAME?           the domain census — provenance over the 630
//
// This is those three behind one door, which is the whole port: not new capability, one surface over capability
// that was scattered. The measured half and the sealed half are kept VISIBLY apart in the answer, because
// conflating "what this machine is" with "what was published" is precisely the mistake a driver stack invites.
//
// IT LOADS NOTHING. No kernel module is inserted, no firmware is flashed, no device is opened, no ioctl is
// issued, and no Alpine binary runs. The bundle is VERIFIED, never installed — "verified LOADING, never
// execution" is the installs wing's own law and this API is on the loading side of it.
import { hostQuantumDevice, type QuantumDevice } from '../quantum/index.js'
import { driverBundle, verifyDriverBundle, type DriverBundle, type DriverCheck } from '../driver/index.js'
import { domainCensus, type DomainCensus } from '../../quantum/os/domains/index.js'
import { toUuid } from '../../address.js'

export const DRIVER_DOMAIN = 'driver' as const

export function driverCensus(): DomainCensus {
  const c = domainCensus(DRIVER_DOMAIN)
  if (!c) throw new Error(`driverapi: DOMAIN_PATTERNS carries no "${DRIVER_DOMAIN}" domain`)
  return c
}

export interface DriverApiState {
  definition: 'alpine-driver-port·one-device-api'
  /** MEASURED — impure, this machine, now. Folds to an address so another reader can recompute the reading. */
  device: { platform: string; arch: string; logical: number; memoryGiB: number; cpu: string; address: string }
  /** PUBLISHED — provenance over what Alpine names. Nothing here was measured on this machine. */
  ported: { packages: number; origins: number }
  api: readonly string[]
  cannot: readonly string[]
  boundary: string
  receipt: string
  honest: string
}

/** driverState() — the machine and the catalogue in one answer, kept apart inside it. */
export function driverState(): DriverApiState {
  const d: QuantumDevice = hostQuantumDevice()
  const c = driverCensus()
  const device = { platform: d.platform, arch: d.arch, logical: d.logical, memoryGiB: d.memoryGiB, cpu: d.cpu, address: d.deviceAddress }
  return {
    definition: 'alpine-driver-port·one-device-api',
    device,
    ported: { packages: c.packages, origins: c.origins },
    api: ['driverState', 'driverPin', 'driverCheck', 'driverCensus'],
    cannot: ['insert a kernel module', 'flash firmware', 'open a device node', 'issue an ioctl', 'run an Alpine binary', 'install anything'],
    boundary: 'src/drivers — the NAMED non-determinism boundary; logical processors, memory and platform are facts about silicon',
    // the receipt folds the SEALED half only. Folding the measured half would move the receipt from machine to
    // machine and make it useless as an identity for the port — the device carries its own address for that.
    receipt: toUuid(`driverapi|${c.packages}|${c.origins}`),
    honest:
      `PORT = PROVENANCE over ${c.packages} packages, ${c.origins} origins — names, versions and Alpine's own ` +
      'published digests. DEVICE = MEASURED on this host and impure by construction, kept separate in this ' +
      'answer because "what this machine is" and "what was published" are different kinds of fact. Nothing is ' +
      'loaded, flashed, opened or executed: the bundle is VERIFIED, never installed.',
  }
}

/** driverPin — pin the exact bundle a deployment rests on, so anyone can recompute which drivers those were. */
export function driverPin(version: string, arch: string, sha256Digest: string): DriverBundle {
  return driverBundle(version, arch, sha256Digest)
}

/** driverCheck — do the bytes you hold ARE the pinned bundle? uuidna's own sha256, no host crypto. */
export function driverCheck(bytes: Uint8Array, bundle: DriverBundle): DriverCheck {
  return verifyDriverBundle(bytes, bundle)
}
