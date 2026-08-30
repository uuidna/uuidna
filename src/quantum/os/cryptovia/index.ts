// crypto-via — whether a catalogue row uses crypto (same law as uuidna_crypto census).
import { catalogue, cataloguePackage, type CataloguePackage } from '../catalogue/index.js'
import { harmoniseOf } from '../../../os/apps/index.js'

export const CRYPTO_PKG = new Set([
  'libcrypto3', 'libssl3', 'openssl', 'openssl3', 'libressl', 'gnutls', 'nettle', 'libsodium', 'libgcrypt',
])

export type CryptoVia = 'purpose' | 'depends' | 'both'

export function soIsCrypto(tok: string): boolean {
  if (!tok.startsWith('so:')) return false
  const stem = tok.slice(3).split('=')[0]!
  return stem.startsWith('libssl.so')
    || stem.startsWith('libcrypto.so')
    || stem.startsWith('libssl3.so')
    || stem.startsWith('libnss3.so')
    || stem.startsWith('libsmime3.so')
    || stem.startsWith('libgnutls.so')
    || stem.startsWith('libsodium.so')
    || stem.startsWith('libgcrypt.so')
    || stem.startsWith('libnettle.so')
}

export function pkgDepIsCrypto(tok: string): boolean {
  if (tok.startsWith('so:') || tok.startsWith('cmd:') || tok.startsWith('pc:') || tok.startsWith('/')) return false
  return CRYPTO_PKG.has(tok.split('=')[0]!)
}

export function purposeCrypto(p: CataloguePackage): boolean {
  return CRYPTO_PKG.has(p.name) || harmoniseOf(p.name, p.desc)?.skill === 'security'
}

export function depCrypto(p: CataloguePackage): boolean {
  for (const d of p.deps) {
    if (soIsCrypto(d) || pkgDepIsCrypto(d)) return true
  }
  return false
}

export function namedDeps(p: CataloguePackage): string[] {
  const out: string[] = []
  for (const d of p.deps) {
    if (d.startsWith('so:') || d.startsWith('cmd:') || d.startsWith('pc:') || d.startsWith('/')) continue
    const n = d.split('=')[0]!
    if (n) out.push(n)
  }
  return out
}

export function viaOf(p: CataloguePackage, direct: ReadonlySet<string>): CryptoVia | null {
  const purpose = purposeCrypto(p)
  let depends = depCrypto(p)
  if (!depends) {
    for (const n of namedDeps(p)) {
      if (direct.has(n)) { depends = true; break }
    }
  }
  if (purpose && depends) return 'both'
  if (purpose) return 'purpose'
  if (depends) return 'depends'
  return null
}

let DIRECT: Set<string> | null = null

export function directCryptoNames(): Set<string> {
  if (DIRECT) return DIRECT
  const s = new Set<string>()
  for (const p of catalogue()) {
    if (purposeCrypto(p) || depCrypto(p)) s.add(p.name)
  }
  DIRECT = s
  return s
}

/** packageInCryptoCensus(name) → same admission as uuidna_crypto. */
export function packageInCryptoCensus(name: string): boolean {
  const p = cataloguePackage(name)
  if (!p) return false
  return viaOf(p, directCryptoNames()) !== null
}
