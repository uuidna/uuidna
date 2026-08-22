// quantum/apps — THE HEXBIT QUANTUM APPS, the one registry (the captain's standard, 2026-08-22): every app is a
// pure function from hexbit states to verifiable output — browser-computable, Node-testable, asset-free. A
// surface that wants sound, image or motion imports an app from here and computes it where the visitor stands;
// nothing is served that could not be recomputed.
export { renderStates, type HexbitRecording } from './hexbit-player.js'
// url-audit — the 404 handled as an AUDIT: parse the url, compute the relevant sealed content (exact path
// meaning, family, token matches, total fallback), never an empty answer — serving always 200 in substance.
export { auditUrl, type UrlAuditReport, type UrlAuditMatch } from './url-audit.js'
