// quantum/os/crypto-apps — Alpine apps that USE crypto, ported through ONE MCP door.
//
// Doctrine (same as uuidna_exec / mcp-man): never mint one wire tool per package. libcrypto3, openssl, nginx,
// curl, and every other catalogue row that links libssl/libcrypto (or whose published purpose is cryptographic)
// get a uuidna identity here; the primitives they stand on are the existing MCP crypto doors.
import { catalogue, cataloguePackage, catalogueState, type CataloguePackage } from './catalogue.js'
import { INSTALLS_MIRROR } from './mirror.js'
import { portApp, originOf, type AppPort } from '../../os/apps/index.js'
import {
  KEY_BITS, UUID_BITS, COINS, HEXBIT_BITS, GROVER_FLOOR_BITS, shorCapacityFit, shorFullUse,
  type ShorCapacityFit, type ShorFullUse,
} from '../../hexbit/index.js'
import { NONCE_BYTES, SALT_BYTES, TAG_BYTES, ITER } from '../../crypt.js'
import { BLOCK_BYTES } from '../../chacha.js'
import { MAX_LAYERS } from '../../stream.js'
import { pqcPosture, type PqcPosture } from '../../pqc/index.js'
import { CAPACITY, FREE_BITS } from '../../imprint.js'
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { appTheoremBehind } from './app-theorem.js'
import {
  type CryptoVia,
  viaOf, directCryptoNames,
} from './crypto-via.js'

export interface CryptoWidths {
  shor: ShorCapacityFit
  full: ShorFullUse
  groverFloorBits: number
  digestBits: number
  hmacBits: number
  keyBits: number
  nonceBits: number
  saltBits: number
  tagBits: number
  chachaBlockBits: number
  maxOnionLayers: number
  imprintFreeBits: number
  imprintCapacityBits: number
  pbkdf2Iter: number
  addressBirthdayBits: number
  digestBirthdayBits: number
}

export interface CryptoAppRow {
  name: string
  id: string
  address: string
  hexbits: number[]
  skill: string | null
  theorem: string | null
  via: CryptoVia
  route: string
}

export interface CryptoAppsPort {
  definition: 'mcp·uuidna_crypto·alpine-apps-using-crypto'
  wireDoors: 1
  doors: readonly string[]
  widths: CryptoWidths
  pqc: PqcPosture
  total: number
  origins: number
  via: { purpose: number; depends: number; both: number }
  shown: number
  packages: CryptoAppRow[]
  receipt: string
}

export interface CryptoAppLookup extends CryptoAppsPort {
  name: string
  uses: boolean
  package: CryptoAppRow | null
}

/** MCP tools that ARE the uuidna port of Alpine crypto (symmetric stack). Not one tool per apk. */
export const MCP_CRYPTO_DOORS = [
  'uuidna_sha256', 'uuidna_hmac', 'uuidna_pbkdf2', 'uuidna_chacha20', 'uuidna_poly1305',
  'uuidna_aead_encrypt', 'uuidna_aead_decrypt', 'uuidna_encrypt', 'uuidna_decrypt',
  'uuidna_verify_envelope', 'uuidna_seal_stream', 'uuidna_seal_onion', 'uuidna_open_onion',
  'uuidna_seal_chain', 'uuidna_open_chain', 'uuidna_seats', 'uuidna_os', 'uuidna_exec',
  'uuidna_quantum', 'uuidna_crypto',
] as const

export type { CryptoVia } from './crypto-via.js'

export function cryptoWidths(): CryptoWidths {
  const full = shorFullUse()
  const byteBits = HEXBIT_BITS * COINS
  return {
    shor: shorCapacityFit(),
    full,
    groverFloorBits: GROVER_FLOOR_BITS,
    digestBits: KEY_BITS,
    hmacBits: KEY_BITS,
    keyBits: KEY_BITS,
    nonceBits: NONCE_BYTES * byteBits,
    saltBits: SALT_BYTES * byteBits,
    tagBits: TAG_BYTES * byteBits,
    chachaBlockBits: BLOCK_BYTES * byteBits,
    maxOnionLayers: MAX_LAYERS,
    imprintFreeBits: FREE_BITS,
    imprintCapacityBits: CAPACITY,
    pbkdf2Iter: ITER,
    addressBirthdayBits: UUID_BITS / COINS,
    digestBirthdayBits: KEY_BITS / COINS,
  }
}

function rowOf(p: CataloguePackage, via: CryptoVia): CryptoAppRow {
  const port: AppPort = portApp(p, p.repo, INSTALLS_MIRROR.branch, INSTALLS_MIRROR.arch)
  const behind = appTheoremBehind(p.name)
  return {
    name: p.name,
    id: port.id,
    address: port.address,
    hexbits: port.hexbits,
    skill: behind.skill ?? port.skill,
    theorem: behind.theorem,
    via,
    route: '/catalogue/' + p.name,
  }
}

let CACHED: CryptoAppsPort | null = null

function directNames(): Set<string> {
  return directCryptoNames()
}

function emptyPort(widths: CryptoWidths): CryptoAppsPort {
  const receipt = toUuid('crypto-apps|absent|0')
  return {
    definition: 'mcp·uuidna_crypto·alpine-apps-using-crypto',
    wireDoors: 1,
    doors: MCP_CRYPTO_DOORS,
    widths,
    pqc: pqcPosture(),
    total: 0,
    origins: 0,
    via: { purpose: 0, depends: 0, both: 0 },
    shown: 0,
    packages: [],
    receipt,
  }
}

/** cryptoAppsPort() → every catalogue app that uses crypto, as identities. {name} lookup is the same census. */
export function cryptoAppsPort(): CryptoAppsPort {
  if (CACHED) return CACHED
  const widths = cryptoWidths()
  const st = catalogueState()
  if (!st.present) return emptyPort(widths)
  const direct = directNames()
  const hits: { p: CataloguePackage; via: CryptoVia }[] = []
  const via = { purpose: 0, depends: 0, both: 0 }
  const origins = new Set<string>()
  for (const p of catalogue()) {
    const v = viaOf(p, direct)
    if (!v) continue
    hits.push({ p, via: v })
    via[v]++
    origins.add(originOf(p.name))
  }
  const ranked = [...hits].sort((a, b) => (a.p.name < b.p.name ? -1 : a.p.name > b.p.name ? 1 : 0))
  const packages = ranked.map((h) => rowOf(h.p, h.via))
  const root = packages.length ? merkleGravity(packages.map((r) => r.address)) : toUuid('crypto-apps|empty')
  const receipt = toUuid(`crypto-apps|${hits.length}|${origins.size}|${root}`)
  CACHED = {
    definition: 'mcp·uuidna_crypto·alpine-apps-using-crypto',
    wireDoors: 1,
    doors: MCP_CRYPTO_DOORS,
    widths,
    pqc: pqcPosture(),
    total: hits.length,
    origins: origins.size,
    via,
    shown: packages.length,
    packages,
    receipt,
  }
  return CACHED
}

/** cryptoAppOf(name) → one catalogue row if it uses crypto; uses:false when the package exists but does not. */
export function cryptoAppOf(name: string): CryptoAppLookup {
  const census = cryptoAppsPort()
  const p = cataloguePackage(name)
  if (!p) {
    throw new Error(`uuidna_crypto: ${name}: no such package — searched the committed catalogue`)
  }
  const v = viaOf(p, directNames())
  const row = v ? rowOf(p, v) : null
  return { ...census, name: p.name, uses: v !== null, package: row }
}
