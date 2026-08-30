// os/overlay/quantumise — ANY PUBLISHED PACKAGE INDEX, SAME CATALOGUE DOOR.
//
// Alpine APKINDEX, npm, RubyGems, PyPI, crates.io all publish the same kind of row: a name, a version, a
// digest, a one-line meaning. uuidna does not grow a TypeScript port per language. catalogueCompile already
// mints uuidna/<name> and folds 128 bits to UUID_HEXBITS states (theorem a_spec_compiles_to_hexbits). This
// module MAPS a registry record onto CataloguePackage. Ingest of a live index stays at the os/ boundary
// (like APKINDEX / gen-alpine-overlay). A census is derived, never frozen in Lean.
import { npmShasumToQ1 } from '../index.js'
import type { CataloguePackage } from '../../../quantum/os/catalogue/index.js'

export const REGISTRY_REPOS = ['npm', 'rubygems', 'pypi', 'crates'] as const
export type RegistryRepo = (typeof REGISTRY_REPOS)[number]

export interface RegistryRecord {
  registry: RegistryRepo
  name: string
  version: string
  /** published digest: sha1 hex (40), sha256 hex (64), or apk/npm Q1 form */
  checksum: string
  desc: string
  deps?: string[]
  provides?: string[]
}

/** registryIdentityName(name) → catalogue identity charset. Scoped npm `@scope/pkg` → `scope-pkg`. */
export function registryIdentityName(name: string): string {
  return String(name ?? '').trim().replace(/^@/, '').replace(/\//g, '-')
}

/** registryChecksum(published) → Q1 for sha1-20, lowercase hex64 for sha256; null if the width is not a published digest. */
export function registryChecksum(published: string): string | null {
  const raw = String(published ?? '').trim()
  if (raw.startsWith('Q1')) return raw
  const c = raw.toLowerCase()
  if (/^[a-f0-9]{40}$/.test(c)) return npmShasumToQ1(c)
  if (/^[a-f0-9]{64}$/.test(c)) return c
  return null
}

export type QuantumiseResult =
  | { ok: true; pkg: CataloguePackage }
  | { ok: false; reason: string }

/** quantumiseRegistry(record) → one CataloguePackage, or a named refusal. Same door as Alpine / overlay. */
export function quantumiseRegistry(r: RegistryRecord): QuantumiseResult {
  const name = registryIdentityName(r.name)
  if (!/^[A-Za-z0-9._+-]+$/.test(name)) {
    return { ok: false, reason: `name ${r.name} is not a catalogue identity` }
  }
  if (!/^\d/.test(String(r.version ?? ''))) {
    return { ok: false, reason: `version ${r.version} does not start with a digit` }
  }
  const checksum = registryChecksum(r.checksum)
  if (!checksum) {
    return { ok: false, reason: 'published digest is not sha1-20 or sha256-32' }
  }
  return {
    ok: true,
    pkg: {
      repo: r.registry,
      name,
      version: r.version,
      checksum,
      desc: r.desc,
      deps: [...(r.deps ?? [])],
      provides: [...(r.provides ?? [])],
    },
  }
}

export function isRegistryPackage(p: CataloguePackage): boolean {
  return (REGISTRY_REPOS as readonly string[]).includes(p.repo)
}
