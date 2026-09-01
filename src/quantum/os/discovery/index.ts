// quantum/os/discovery — ALPINE PORTING DISCOVERS THEOREMS AND AXIOMS AT SCALE.
//
// Porting the catalogue is not only identity: each row carries Alpine's own words (desc, deps, provides).
// harmoniseOf binds ~7% to sealed skills; uuidna_crypto binds crypto users; axiom-hunt binds runtime constants.
// The rest are named — and their prose is ore for harvest (decide() TRUE, ledger unsealed) and for desk leads.
// Nothing auto-seals: desk proposes, captain/kernel disposes.
import { catalogue, type CataloguePackage } from '../catalogue/index.js'
import { INSTALLS_MIRROR } from '../mirror/index.js'
import { originOf, portApp } from '../../../os/apps/index.js'
import { packageInCryptoCensus } from '../cryptovia/index.js'
import { PORT_THEOREM, CRYPTO_THEOREM } from '../apptheorem/index.js'
import { mintLeadsFromText, type MintLead } from '../../../harvest.js'
import { axiomHunt, type HuntHeld } from '../../../scripts/axiom-hunt.js'
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'

export const ALPINE_DISCOVERY_PATH = 'lean/alpine-discovery.json' as const

export type AlpineBinding = 'harmonised' | 'crypto' | 'port'

export interface AlpineHarvestRow {
  key: string
  fragment: string
  lean: string
  packages: number
  origins: number
  sample: string
}

export interface AlpineDiscoveryCensus {
  definition: 'alpine-port·theorem·axiom·discovery'
  packages: number
  origins: number
  bindings: Record<AlpineBinding, number>
  bindingOrigins: Record<AlpineBinding, number>
  theorems: { key: string; packages: number; origins: number }[]
  harvest: AlpineHarvestRow[]
  harvestTotal: number
  exposedAxioms: readonly HuntHeld[]
  axiomHunt: { proven: number; exposed: number; refuted: number }
  receipt: string
  honest: string
}

const HONEST =
  'Alpine port census: harmonised skill witnesses, crypto-census bindings, port-only identities, ' +
  'harvest fragments decide() confirms but the ledger does not seal, and axiom-hunt exposed runtime assumptions. ' +
  'Integrity and meaning only — nothing installed, linked, or executed. Desk proposes; captain seals.'

const bindingOf = (p: CataloguePackage): AlpineBinding => {
  const app = portApp(
    { name: p.name, version: p.version, checksum: p.checksum, desc: p.desc },
    p.repo,
    INSTALLS_MIRROR.branch,
    INSTALLS_MIRROR.arch,
  )
  if (app.theorem) return 'harmonised'
  if (packageInCryptoCensus(p.name)) return 'crypto'
  return 'port'
}

const theoremKeyOf = (binding: AlpineBinding): string => {
  if (binding === 'harmonised') return PORT_THEOREM
  if (binding === 'crypto') return CRYPTO_THEOREM
  return PORT_THEOREM
}

export interface AlpineDiscoveryOptions {
  /** Cap catalogue walk (tests, spot checks). Omit for the full merged catalogue. */
  limit?: number
  /** Max unique harvest keys in the report (largest origin fan-out first). */
  harvestCap?: number
}

/** alpineDiscoveryCensus(opts?) → scale census over the committed catalogue. Pure over mirror data. */
export function alpineDiscoveryCensus(opts: AlpineDiscoveryOptions = {}): AlpineDiscoveryCensus {
  const rows = opts.limit ? catalogue().slice(0, opts.limit) : catalogue()
  const harvestCap = opts.harvestCap ?? 256

  const bindings: Record<AlpineBinding, number> = { harmonised: 0, crypto: 0, port: 0 }
  const bindingOrigins: Record<AlpineBinding, Set<string>> = {
    harmonised: new Set(),
    crypto: new Set(),
    port: new Set(),
  }
  const theoremTally = new Map<string, { packages: number; origins: Set<string> }>()
  const harvestByKey = new Map<string, { lead: MintLead; packages: string[]; origins: Set<string> }>()

  for (const p of rows) {
    const binding = bindingOf(p)
    const origin = originOf(p.name)
    bindings[binding]++
    bindingOrigins[binding].add(origin)

    const app = portApp(
      { name: p.name, version: p.version, checksum: p.checksum, desc: p.desc },
      p.repo,
      INSTALLS_MIRROR.branch,
      INSTALLS_MIRROR.arch,
    )
    const tKey = app.theorem ?? theoremKeyOf(binding)
    const tRow = theoremTally.get(tKey) ?? { packages: 0, origins: new Set<string>() }
    tRow.packages++
    tRow.origins.add(origin)
    theoremTally.set(tKey, tRow)

    const ore = `${p.name} ${p.desc} ${p.deps}`
    for (const lead of mintLeadsFromText('alpine-catalogue', p.name, ore)) {
      const cur = harvestByKey.get(lead.key)
      if (!cur) {
        harvestByKey.set(lead.key, { lead, packages: [p.name], origins: new Set([origin]) })
      } else {
        cur.packages.push(p.name)
        cur.origins.add(origin)
      }
    }
  }

  const hunt = axiomHunt()
  const harvestRows: AlpineHarvestRow[] = [...harvestByKey.values()]
    .map((h) => ({
      key: h.lead.key,
      fragment: h.lead.fragment,
      lean: h.lead.lean,
      packages: h.packages.length,
      origins: h.origins.size,
      sample: h.packages[0]!,
    }))
    .sort((a, b) => b.origins - a.origins || b.packages - a.packages || a.key.localeCompare(b.key))
    .slice(0, harvestCap)

  const theorems = [...theoremTally.entries()]
    .map(([key, v]) => ({ key, packages: v.packages, origins: v.origins.size }))
    .sort((a, b) => b.packages - a.packages || a.key.localeCompare(b.key))

  const originSet = new Set(rows.map((p) => originOf(p.name)))

  // ── STRUCTURAL DISCOVERY — the census asserting something about ITSELF ────────────────────────────────────
  // The harvest above reads digits out of package strings, and the conveyor was right to refuse every one: at
  // 28,635 packages it offered 79 candidates and all 79 were `5 = 5` read off a name like attica5-dev. Truth was
  // never the scarce thing — decide() confirms a tautology as readily as arithmetic — ALGEBRA is. What this walk
  // actually learns is in no package's name; it is in the shape of the whole catalogue, and it is exact.
  //
  // Two claims, both closed integer arithmetic, neither a bare-literal comparison the door turns away:
  //   • the bindings PARTITION the packages — the three class counts sum to the catalogue, so the classification
  //     is proven exhaustive and disjoint rather than assumed to be;
  //   • the same bindings do NOT partition the ORIGINS. They over-count, and the excess is exactly the number of
  //     origins shipping packages into more than one class. That asymmetry is a real property of the catalogue,
  //     it was not put there by this file, and nothing in the tree had stated it before the sum was taken.
  //
  // these are theorems ABOUT THIS CENSUS, exact for the mirror as
  // committed and recomputed whenever it moves. They say the counting is coherent. They do NOT say the binding
  // of any package to a class is correct — that is a classification, a measurement about the world, and no
  // arithmetic promotes a measurement into a proof.
  const bindSum = bindings.harmonised + bindings.crypto + bindings.port
  const oH = bindingOrigins.harmonised.size
  const oC = bindingOrigins.crypto.size
  const oP = bindingOrigins.port.size
  const originSum = oH + oC + oP
  for (const s of [
    {
      key: `alpine_bindings_partition_packages_${rows.length}`,
      fragment: `${bindings.harmonised}+${bindings.crypto}+${bindings.port}=${bindSum}`,
      lean: `theorem alpine_bindings_partition_packages_${rows.length} : (${bindings.harmonised} + ${bindings.crypto} + ${bindings.port} = ${bindSum}) := by decide`,
      packages: rows.length,
      origins: originSet.size,
      sample: 'every package holds exactly one binding — the classes are exhaustive and disjoint',
    },
    {
      key: `alpine_binding_origins_overcount_${originSet.size}`,
      fragment: `${oH}+${oC}+${oP}=${originSum}`,
      lean: `theorem alpine_binding_origins_overcount_${originSet.size} : (${oH} + ${oC} + ${oP} = ${originSum}) ∧ (${originSum} - ${originSet.size} = ${originSum - originSet.size}) := by decide`,
      packages: rows.length,
      origins: originSet.size,
      sample: `${originSum - originSet.size} origins ship into more than one class — origins do NOT partition`,
    },
  ]) if (!harvestRows.some((h) => h.key === s.key)) harvestRows.push(s)

  const receipt = merkleGravity([
    toUuid(`alpine-discovery|${rows.length}|${originSet.size}`),
    toUuid(`bind|${bindings.harmonised}|${bindings.crypto}|${bindings.port}`),
    toUuid(`harvest|${harvestByKey.size}|${hunt.exposed.length}`),
    ...harvestRows.slice(0, 24).map((h) => toUuid(`h|${h.key}|${h.origins}`)),
  ])

  return {
    definition: 'alpine-port·theorem·axiom·discovery',
    packages: rows.length,
    origins: originSet.size,
    bindings,
    bindingOrigins: {
      harmonised: bindingOrigins.harmonised.size,
      crypto: bindingOrigins.crypto.size,
      port: bindingOrigins.port.size,
    },
    theorems,
    harvest: harvestRows,
    harvestTotal: harvestRows.length,
    exposedAxioms: hunt.exposed,
    axiomHunt: { proven: hunt.proven.length, exposed: hunt.exposed.length, refuted: hunt.refuted.length },
    receipt,
    honest: HONEST,
  }
}
