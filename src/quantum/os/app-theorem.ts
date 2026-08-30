// app-theorem — THE THEOREM BEHIND ANY APP. Apps are the main source: harmoniseOf binds each catalogue
// row to the heaviest sealed theorem in its skill; crypto-census apps carry sha256_grover_margin; every
// ported app rides the_os_is_bootable_quantum.
import { cataloguePackage } from './catalogue.js'
import { INSTALLS_MIRROR } from './mirror.js'
import { packageInCryptoCensus } from './crypto-via.js'
import { portApp } from '../../os/apps/index.js'
import { theoremByKey } from '../../theorems/index.js'

export const PORT_THEOREM = 'the_os_is_bootable_quantum' as const
export const CRYPTO_THEOREM = 'sha256_grover_margin_is_the_address' as const

export interface TheoremClaim {
  key: string
  route: `/theorem/${string}`
}

export interface AppTheoremBehind {
  name: string
  skill: string | null
  /** every ported app — identity on the lattice, never ELF */
  port: TheoremClaim
  /** harmoniseOf + witnessFor when Alpine's purpose matches a ledger skill */
  harmonised: TheoremClaim | null
  /** uuidna_crypto census when the app uses crypto but is not harmonised by name */
  crypto: TheoremClaim | null
  /** harmonised ?? crypto ?? port */
  theorem: string
  route: `/theorem/${string}`
}

const claim = (key: string): TheoremClaim | null =>
  theoremByKey().has(key) ? { key, route: `/theorem/${key}` } : null

/** appTheoremBehind(name) → the sealed theorem(s) behind one catalogue app. */
export function appTheoremBehind(name: string): AppTheoremBehind {
  const port = claim(PORT_THEOREM)!
  const pkg = cataloguePackage(name)
  if (!pkg) {
    return { name, skill: null, port, harmonised: null, crypto: null, theorem: PORT_THEOREM, route: port.route }
  }
  const app = portApp(pkg, pkg.repo, INSTALLS_MIRROR.branch, INSTALLS_MIRROR.arch)
  const harmonised = app.theorem ? claim(app.theorem) : null
  const crypto = !harmonised && packageInCryptoCensus(name) ? claim(CRYPTO_THEOREM) : null
  const primary = harmonised ?? crypto ?? port
  return {
    name,
    skill: app.skill,
    port,
    harmonised,
    crypto,
    theorem: primary.key,
    route: primary.route,
  }
}

/** appTheoremClaims(names) → one row per app, same order as input. */
export function appTheoremClaims(names: readonly string[]): AppTheoremBehind[] {
  return names.map(appTheoremBehind)
}

export interface AppTheoremFold {
  /** apps are the main source — one harmonised witness per catalogue row */
  apps: AppTheoremBehind[]
  /** unique sealed keys carried by the app set */
  theorems: TheoremClaim[]
  harmonised: number
  crypto: number
  port: number
}

/** foldAppTheorems(names) → unique theorem citations folded from the app census. */
export function foldAppTheorems(names: readonly string[]): AppTheoremFold {
  const apps = appTheoremClaims(names)
  const seen = new Set<string>()
  const theorems: TheoremClaim[] = []
  let harmonised = 0
  let crypto = 0
  let port = 0
  for (const a of apps) {
    if (a.harmonised) harmonised++
    else if (a.crypto) crypto++
    else port++
    if (!seen.has(a.theorem)) {
      seen.add(a.theorem)
      theorems.push({ key: a.theorem, route: a.route })
    }
  }
  return { apps, theorems, harmonised, crypto, port }
}
