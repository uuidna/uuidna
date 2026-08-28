// handle-permanence — uuidna.com/[handle] IS A DOI-CLASS STABLE CITATION URL (captain, 2026-08-26).
//
// Worker.js 301s `/[8-hex]` → `/theorem/<key>` via HANDLES. After the final SEO freeze, that door must not churn:
// the sealed lean/seo-url-map.json binds identity → handle → hexbitDoor. Same permanence expectations as a DOI.
//
// Bidirectional seal: when a Zenodo DOI exists, completeness requires BOTH doi.org/<doi> AND uuidna.com/<handle>
// cited in the archive metadata and on the site surface. The handle URL is ALWAYS required (DOI may be absent).
//
// NO top-level node:fs: SiteFooter imports STANDING_DOI / doiUrl in the browser. The audit reads the disk lazily.
import { handleOf, isHandle } from './handle.js'
import { toUuid } from './address.js'
import { rdRoot, existsRoot } from './boundary.js'

export const HANDLE_HOST = 'https://uuidna.com'
export const UUIDNA_HOSTNAME = 'uuidna.com'
/** Standing archive DOI for the ledger deposit (workflow-minted). */
export const STANDING_DOI = '10.5281/zenodo.21787144'

/** Hostname equality — `startsWith('https://uuidna.com')` accepts `https://uuidna.com.evil.com`. */
export function isUuidnaUrl(s: string): boolean {
  try {
    const u = new URL(s)
    return u.protocol === 'https:' && u.hostname === UUIDNA_HOSTNAME
  } catch {
    return false
  }
}

/** Cite check over free text: parse extracted https URLs, never substring-match the origin. */
export function textCitesUuidna(text: string): boolean {
  const hits = text.match(/https:\/\/[^\s"'<>]+/g) ?? []
  for (const raw of hits) {
    let u = raw
    while (u.length > 0 && '.,;:)]>'.includes(u[u.length - 1]!)) u = u.slice(0, -1)
    if (isUuidnaUrl(u)) return true
  }
  return false
}

export const handleUrl = (handleOrAddress: string): string => {
  const h = isHandle(handleOrAddress) ? handleOrAddress : handleOf(handleOrAddress)
  return `${HANDLE_HOST}/${h}`
}

export const doiUrl = (doi: string = STANDING_DOI): string => `https://doi.org/${doi}`

export interface HandlePermanenceGap { what: string; fix: string }

export interface HandlePermanenceAudit {
  ok: boolean
  gaps: HandlePermanenceGap[]
  frozenHandles: number
  standingDoi: string
  receipt: string
  honest: string
}

/**
 * handlePermanenceAudit() → DOI-class permanence of sealed handle doors + bidirectional DOI↔handle cites.
 * Does not remeasure. Fails if sealed map missing, handles malformed, or DOI present without mutual cites.
 */
export function handlePermanenceAudit(): HandlePermanenceAudit {
  const gaps: HandlePermanenceGap[] = []
  const mapPath = 'lean/seo-url-map.json'
  let sealed: { entries: { handle: string; route: string; hexbitDoor: string; kind: string }[] } | null = null
  try { sealed = JSON.parse(rdRoot(mapPath)) as { entries: { handle: string; route: string; hexbitDoor: string; kind: string }[] } } catch { sealed = null }
  if (!sealed) {
    gaps.push({
      what: `${mapPath} missing — handle permanence has no freeze seal`,
      fix: 'run gen-seo-freeze and commit lean/seo-url-map.json; handles are DOI-class doors after freeze',
    })
  } else {
    const seen = new Set<string>()
    for (const e of sealed.entries) {
      if (!isHandle(e.handle)) {
        gaps.push({ what: `sealed handle not eight hex: ${e.handle} (${e.route})`, fix: 'handleOf must emit [0-9a-f]{8}' })
      }
      const want = `${HANDLE_HOST}/${e.handle}`
      if (e.hexbitDoor !== want) {
        gaps.push({
          what: `hexbitDoor drift: ${e.hexbitDoor} ≠ ${want}`,
          fix: 'hexbitDoor must be exactly https://uuidna.com/<handle> — DOI-class citation URL',
        })
      }
      if (seen.has(e.handle) && e.kind === 'page') {
        // collisions already refused in finalSeoAudit; note permanence impact
      }
      seen.add(e.handle)
    }
  }

  // Bidirectional DOI ↔ handle/URL seal against .zenodo.json + site surfaces
  let doiPresent = false
  if (existsRoot('.zenodo.json')) {
    const z = JSON.parse(rdRoot('.zenodo.json')) as {
      related_identifiers?: Array<{ identifier?: string; relation?: string }>
      description?: string
    }
    const ids = (z.related_identifiers ?? []).map((r) => r.identifier ?? '')
    doiPresent = ids.some((id) => id.includes(STANDING_DOI)) || /10\.5281\/zenodo\./.test(z.description ?? '')
    const citesSite = ids.some((id) => isUuidnaUrl(id)) || textCitesUuidna(z.description ?? '')
    if (doiPresent && !citesSite) {
      gaps.push({
        what: 'DOI present in .zenodo.json but no uuidna.com URL / handle door cited (bidirectional seal broken)',
        fix: 'related_identifiers must include https://uuidna.com and/or https://uuidna.com/<handle> stable doors',
      })
    }
    if (!ids.some((id) => id === HANDLE_HOST || id === HANDLE_HOST + '/')) {
      gaps.push({
        what: '.zenodo.json related_identifiers missing https://uuidna.com (archive must cite the live door)',
        fix: 'gen-zenodo must emit related_identifiers with the site origin — handle doors are DOI-class permanence',
      })
    }
  }

  // Site must cite standing DOI when we claim archive completeness (README + home)
  for (const rel of ['README.md', 'docs/index.md']) {
    if (!existsRoot(rel)) continue
    const text = rdRoot(rel)
    if (doiPresent || existsRoot('.zenodo.json')) {
      if (!text.includes(STANDING_DOI) && !text.includes('doi.org/10.5281')) {
        gaps.push({
          what: `${rel} does not cite standing DOI ${STANDING_DOI}`,
          fix: 'bidirectional seal: pages cite DOI and uuidna.com/<handle>; archive cites the live URL',
        })
      }
    }
    // Always require at least one documented handle-door citation pattern on home/readme for permanence law
    if (rel === 'docs/index.md' && !/uuidna\.com\/[0-9a-f]{8}/.test(text) && !text.includes('uuidna.com/<handle>') && !text.includes('/<handle>')) {
      gaps.push({
        what: `${rel} does not document the stable handle URL (uuidna.com/<handle>)`,
        fix: 'document DOI-class permanence: https://uuidna.com/<handle> 301s to the theorem (worker HANDLES)',
      })
    }
  }

  const frozenHandles = sealed?.entries.length ?? 0
  return {
    ok: gaps.length === 0,
    gaps,
    frozenHandles,
    standingDoi: STANDING_DOI,
    receipt: toUuid(`handle-permanence|${frozenHandles}|${STANDING_DOI}|${gaps.length}`),
    honest:
      'uuidna.com/<handle> is a DOI-class stable citation URL (worker 301 via HANDLES). After SEO freeze, ' +
      'handles must not churn — sealed in lean/seo-url-map.json. Bidirectional seal: DOI pages cite handles; ' +
      'Zenodo cites uuidna.com. Completeness = DOI (when present) + handle URL (always).',
  }
}
