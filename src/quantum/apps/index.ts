// quantum/apps — THE HEXBIT QUANTUM APPS, the one registry (the captain's standard, 2026-08-22): every app is a
// pure function from hexbit states to verifiable output — browser-computable, Node-testable, asset-free. A
// surface that wants sound, image or motion imports an app from here and computes it where the visitor stands;
// nothing is served that could not be recomputed.
export { renderStates, type HexbitRecording } from './hexbit-player.js'
// the kernel's second layer — the same states as MOTION: integer keyframes the shell paints; sound and motion
// align bar-for-bar by the sealed 4032 = 24·168, and every layer refolds to the one identity (lead 94)
export { animateStates, layersOf, BAR_MS, FRAMES_PER_BAR, SAMPLES_PER_FRAME, type Animation, type Keyframe } from './hexbit-animator.js'
// url-audit — the 404 handled as an AUDIT: parse the url, compute the relevant sealed content (exact path
// meaning, family, token matches, total fallback), never an empty answer — serving always 200 in substance.
export { auditUrl, type UrlAuditReport, type UrlAuditMatch } from './url-audit.js'
// categories — the store's shelves (the captain's taxonomy): each category directory re-exports its apps, and a
// store page derives its listing from this registry, never from a hand-typed list. coding/ is the school's
// shelf: testing, editing, building — the instruments of educated quantum minds (lead 81).
export { testClaim, type ClaimTest, type ControlRun, start, applyStride, undo, unitSquaresToOne, UNITS_24, FRAME_RING, type EditState, build, type Composition } from './categories/coding/index.js'
// the reading room, the practice loop and the games — the sixteen complete (leads 81b, 81c, 79)
export { readPassage, findFacts, rankShelf, tryQuote, type Reading, type FactFinding, type BookLead, type ShelfEntry, type QuoteVerdict } from './categories/books/index.js'
export { drillOf, attemptDrill, foldFeedback, meterLoop, CLOSES_AT, prerequisitesOf, walkTo, type Drill, type FeedbackFold, type LoopMeter, type Walk } from './categories/practice/index.js'
export { startState, legalFrom, allLegal, applyMove, statusOf, bestMove, nimSum, nimVerdict, mobilityOf, type ChessState, type NimVerdict, type Mobility } from './categories/gaming/index.js'
// the trading floor — the desk, the census, the leverage and the compound over the sealed billing (lead 89)
export { costOf, walletCensus, chargeFor, leverageOf, compoundAt, type WorkloadCost, type WalletCensus, type Leverage, type Compound } from './categories/trading/index.js'
// NOTE: browser-usable.ts is the Node seal (man→app + mounts). Import it from scripts/tests only — do NOT
// re-export here, or the VitePress browser bundle pulls the Alpine catalogue executor into every page.
