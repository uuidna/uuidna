// quantum/os/browser-boot — verified uuidnaOS load for browser hosts (and Node tests).
//
// bootOS() seals the default install; the catalogue must be primed separately in the browser
// (primeCatalogueFrom). Node self-loads mirror/ on first catalogueState().
import { bootOS } from './index.js'
import { primeCatalogueFrom, catalogueState, type CatalogueState } from './catalogue.js'

export const DEFAULT_CATALOGUE_URL = '/alpine-catalogue.tsv'

export interface BrowserBootResult {
  bootReceipt: string
  catalogue: CatalogueState
}

/** bootUuidnaOSInBrowser — verify-load the install port, then ensure the catalogue is present.
 *  Idempotent: safe to call on every /terminal and /os mount. Throws if the boot image drifted. */
export async function bootUuidnaOSInBrowser(catalogueUrl = DEFAULT_CATALOGUE_URL): Promise<BrowserBootResult> {
  const booted = bootOS()
  let catalogue = catalogueState()
  if (!catalogue.present) catalogue = await primeCatalogueFrom(catalogueUrl)
  return { bootReceipt: booted.receipt, catalogue }
}
