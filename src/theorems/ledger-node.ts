// '#ledger' on a host (package.json "imports", the default condition): the literal lean-ledger writes, and no edge
// state. Every host path reads exactly what it read before this door existed.
import type { EdgeLedger } from './ledger-shape.js'
export { WING_DEFS, LEAN_LEDGER, PRINCIPLES, type LeanTheorem } from './generated.js'

/** a host holds the rows itself, so there is no edge state */
export const LEDGER_EDGE: EdgeLedger | null = null
