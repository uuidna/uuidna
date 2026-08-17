// api — THE TEST LAYER'S SINGULARITY. The tests keep the node:test defaults (every file imports its own
// framework — that IS the standard); what folds here is only the REAL duplication the measurement found:
// the uuid shape asserted in five files and the hex encoder declared twice under two names. Declared once,
// imported everywhere; `one-receipt dry` objects to a re-declaration with the exact fix.
/** the canonical uuid shape every minted address must match */
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
/** bytes → lowercase hex */
export const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
