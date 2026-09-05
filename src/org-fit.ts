// org-fit — WHICH OUTSIDE REPOSITORIES THIS TREE CAN CONTRIBUTE TO, AND BY WHICH ROUTE. Four organisations were
// named in one turn (microsoft, google, apple, cloudflare) and every one of them asked the same four questions in
// the same order, which is the signature of a judgement that belongs in code: can the source be donated, can a finding
// be filed, can fresh material be authored for them, can the two trees interoperate without either moving.
//
// THE FIRST ANSWER IS NOT A MATTER OF DEGREE AND DOES NOT DEPEND ON THE HOST. This tree is licensed
// CC-BY-NC-ND-4.0; NoDerivatives forbids distributing a modified or built-upon form of it, and a pull request is
// exactly that distribution. So `donate-source` is REFUSED against every repository on earth, and scoring hosts on
// how well their licence would receive our code invents a choice nobody has. What genuinely varies per host is which
// of the REMAINING routes stay open — a filed finding transfers no copyright, freshly authored material is the
// author's to grant under their CLA, and an interop demonstration runs here and only cites there.
//
// THE MATCH IS COMPUTED FROM THIS TREE'S OWN MEASURED SURFACES, never from an opinion about what we are good at:
// the caller derives each surface from the ledger, the tool registry and the filesystem (see scripts/org-fit.ts) and
// hands them in, so the library stays pure and a test can drive it with no network and no checkout.
import { handleOf } from './handle.js'
import { toUuid } from './address.js'

/** One outside repository, as its host's public metadata describes it — data, never instructions. */
export interface OutsideRepo {
  fullName: string       // owner/name
  license: string        // SPDX id, or 'none' when the host declares no licence
  archived: boolean      // an archived repository accepts neither issues nor pull requests
  stars: number          // the host's own popularity count, used only to order equals
  text: string           // name + description + topics, lowercased by the caller — the surface we match against
  claRequired?: boolean  // the host's CONTRIBUTING asks for a contributor licence agreement, when known
}

/** One surface THIS tree measured in itself, with the keys that name it in someone else's prose. */
export interface Surface {
  name: string                  // 'lean-ledger', 'mcp-surface', …
  keys: readonly string[]       // lowercase substrings that name this surface in a repository's own words
  magnitude: number             // what we measured — theorems, tools, files; the size of the thing offered
  evidence: string              // where the magnitude came from, so the number can be re-derived
}

/** The four ways one tree can reach another. Only the first is a transfer of our source. */
export type RouteName = 'donate-source' | 'file-findings' | 'author-fresh' | 'interop-demo'

/** A route's verdict against one repository, with the reason it holds. */
export interface Route {
  route: RouteName
  open: boolean
  because: string
}

/** One repository, fitted: which of our surfaces it names, and which routes remain open to it. */
export interface RepoFit {
  fullName: string
  license: string
  stars: number
  claRequired?: boolean  // undefined means UNREAD — an unread CONTRIBUTING and a CLA-free one are not one fact
  surfaces: string[]     // our surface names that this repository's own text reaches for
  routes: Route[]
  score: number          // how many of our surfaces it names — the only ranking that is about fit, not popularity
}

/** One organisation, fitted. */
export interface OrgFit {
  org: string
  ourLicence: string
  derivativesAllowed: boolean
  repos: RepoFit[]
  donatable: number      // repositories our source could be donated to — zero while the licence has ND
  reachable: number      // repositories at least one route still reaches
  receipt: string        // 8-hex fold of the verdict, recomputable by anyone holding the same inputs
  honest: string
}

const HONEST =
  'Which outside repositories this tree can contribute to, computed from this tree\'s measured surfaces and its own ' +
  'licence. `donate-source` is refused against every host because CC-BY-NC-ND-4.0 forbids distributing a derived ' +
  'form, not because of anything the host does; the other three routes are judged per host. Repository metadata is ' +
  'the host\'s public description read as DATA — a match is a naming overlap, never a claim that the host wants us, ' +
  'and never permission to open anything. Best-effort: a repository we could not read contributes nothing.'

/** ourLicenceAllowsDerivatives(spdx) → whether OUR licence permits distributing a built-upon form of this tree.
 *  The one question that decides `donate-source`, asked of us and not of the host. */
export function ourLicenceAllowsDerivatives(spdx: string): boolean {
  return !spdx.toUpperCase().includes('ND')
}

/** namesKey(text, key) → whether the text reaches for this key AT A WORD START.
 *  A plain substring test read microsoft/TypeScript's own word "clean" as our key "lean" and reported the largest
 *  compiler on GitHub as a theorem-prover match. The boundary is required at the START only, so "crypto" still
 *  reaches "cryptography" — a prefix is the same word, an infix is a different one. */
export function namesKey(text: string, key: string): boolean {
  return new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text)
}

/** surfacesNamed(repo, surfaces) → the surface names this repository's own text reaches for, in surface order. */
export function surfacesNamed(repo: OutsideRepo, surfaces: readonly Surface[]): string[] {
  return surfaces.filter((s) => s.keys.some((k) => namesKey(repo.text, k))).map((s) => s.name)
}

/** routesFor(repo, derivativesAllowed) → the four routes with the reason each one holds or fails.
 *  An archived repository closes every route that needs the host to act; interop needs nothing from them. */
export function routesFor(repo: OutsideRepo, derivativesAllowed: boolean): Route[] {
  const cla = repo.claRequired === true
    ? ' Their CLA grants them the newly authored material only — it reaches nothing already sealed here.'
    : ''
  return [
    {
      route: 'donate-source',
      open: derivativesAllowed,
      because: derivativesAllowed
        ? 'Our licence permits distributing a derived form, so a source contribution is a licence question about the host.'
        : 'Our licence carries NoDerivatives — a pull request distributes a built-upon form of this tree, which it forbids. Refused before the host is consulted.',
    },
    {
      route: 'file-findings',
      open: !repo.archived,
      because: repo.archived
        ? 'Archived: the host accepts neither issues nor pull requests, so a finding has nowhere to land.'
        : 'A filed finding is a report about THEIR code and transfers no copyright of ours — open regardless of either licence.',
    },
    {
      route: 'author-fresh',
      open: !repo.archived,
      because: repo.archived
        ? 'Archived: nothing new can be authored into it.'
        : `Material written for them is the author's to grant, and is not a derived form of this tree.${cla}`,
    },
    {
      route: 'interop-demo',
      open: true,
      because: 'A demonstration runs in this tree and cites theirs — it moves no code in either direction, so no host can close it.',
    },
  ]
}

/** fitOrg(org, repos, surfaces, ourLicence) → every repository fitted and ordered by how many of our surfaces it
 *  names, popularity breaking ties only among equals. The receipt folds the verdict, not the inputs, so two
 *  recomputations that agree on the verdict agree on the receipt. */
export function fitOrg(org: string, repos: readonly OutsideRepo[], surfaces: readonly Surface[], ourLicence: string): OrgFit {
  const derivativesAllowed = ourLicenceAllowsDerivatives(ourLicence)
  const fitted: RepoFit[] = repos.map((r) => {
    const named = surfacesNamed(r, surfaces)
    return { fullName: r.fullName, license: r.license, stars: r.stars, claRequired: r.claRequired, surfaces: named, routes: routesFor(r, derivativesAllowed), score: named.length }
  }).sort((a, b) => b.score - a.score || b.stars - a.stars || a.fullName.localeCompare(b.fullName))
  const donatable = fitted.filter((f) => f.routes.some((t) => t.route === 'donate-source' && t.open)).length
  const reachable = fitted.filter((f) => f.routes.some((t) => t.open)).length
  const receipt = handleOf(toUuid(JSON.stringify(fitted.map((f) => [f.fullName, f.surfaces, f.routes.filter((t) => t.open).map((t) => t.route)]))))
  return { org, ourLicence, derivativesAllowed, repos: fitted, donatable, reachable, receipt, honest: HONEST }
}
