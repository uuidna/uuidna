// THE PAYLOAD ENTRY — the five names a Payload site on Cloudflare imports, and nothing else.
//
// The root entry reaches 418 modules and 7.4 MB, because it re-exports every family of the deposit. A Worker that imports
// the root ships all of it. These four functions come from five modules and about 52 KB, and they are the same functions:
// the root re-exports them unchanged. quantumSeo is deliberately NOT here: it is the one heavy module (66 modules, 2.7 MB),
// so it has its own entry, '@uuidna/uuidna/seo', and a site pays for it only where it uses it.
export { toUuid, merkleFold } from './address.js'
export { accepts, acceptanceReceipt } from './acceptance.js'
