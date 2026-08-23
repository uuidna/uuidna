// quantum/apps — THE HEXBIT QUANTUM APPS, the one registry (the captain's standard, 2026-08-22): every app is a
// pure function from hexbit states to verifiable output — browser-computable, Node-testable, asset-free. A
// surface that wants sound, image or motion imports an app from here and computes it where the visitor stands;
// nothing is served that could not be recomputed.
export { renderStates, type HexbitRecording } from './hexbit-player.js'
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
