// quantum/os/browser-boot — verified uuidnaOS load for browser hosts (and Node tests).
//
// bootOS() seals the default install; the catalogue must be primed separately in the browser
// (primeCatalogueFrom). Node self-loads mirror/ on first catalogueState().
import { bootOS } from './index.js'
import {
  primeCatalogueFrom, catalogueState, testAllPackagesChunked, isUpstreamClosureGap,
  type CatalogueState,
} from './catalogue.js'

export const DEFAULT_CATALOGUE_URL = '/alpine-catalogue.tsv'

export interface BrowserSelfTestSummary {
  tested: number
  passed: number
  failed: number
  upstreamGaps: number
  present: boolean
}

export interface BrowserBootResult {
  bootReceipt: string
  catalogue: CatalogueState
  selfTest?: BrowserSelfTestSummary
}

/** runBrowserSelfTestChunked — the whole catalogue self-test without blocking the main thread past ~50 ms. */
export async function runBrowserSelfTestChunked(chunk = 1500): Promise<BrowserSelfTestSummary> {
  const suite = await testAllPackagesChunked(chunk)
  const upstreamGaps = suite.failures.filter((f) => isUpstreamClosureGap(f.unresolved)).length
  return {
    tested: suite.tested,
    passed: suite.passed,
    failed: suite.failed,
    upstreamGaps,
    present: suite.present,
  }
}

/** bootUuidnaOSInBrowser — verify-load the install port, then ensure the catalogue is present.
 *  Idempotent: safe to call on every /terminal and /os mount. Throws if the boot image drifted.
 *  With selfTest (default true when catalogue loads), runs the chunked package self-test once per boot. */
export async function bootUuidnaOSInBrowser(
  catalogueUrl = DEFAULT_CATALOGUE_URL,
  opts?: { selfTest?: boolean },
): Promise<BrowserBootResult> {
  const booted = bootOS()
  let catalogue = catalogueState()
  if (!catalogue.present) catalogue = await primeCatalogueFrom(catalogueUrl)
  const selfTest = opts?.selfTest !== false && catalogue.present
    ? await runBrowserSelfTestChunked()
    : undefined
  return { bootReceipt: booted.receipt, catalogue, selfTest }
}

let edgeCataloguePrimed: Promise<CatalogueState> | null = null

/** ensureEdgeCatalogue(origin) — prime the committed census at the Workers edge (once per isolate). */
export function ensureEdgeCatalogue(origin: string): Promise<CatalogueState> {
  const st = catalogueState()
  if (st.present) return Promise.resolve(st)
  if (!edgeCataloguePrimed) {
    const url = origin.replace(/\/$/, '') + DEFAULT_CATALOGUE_URL
    edgeCataloguePrimed = primeCatalogueFrom(url)
  }
  return edgeCataloguePrimed
}
