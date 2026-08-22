// api — THE TEST LAYER'S SINGULARITY. The tests keep the node:test defaults (every file imports its own
// framework — that IS the standard); what folds here is only the REAL duplication the measurement found:
// the uuid shape asserted in five files and the hex encoder declared twice under two names. Declared once,
// imported everywhere; `one-receipt dry` objects to a re-declaration with the exact fix.
/** the canonical uuid shape every minted address must match */
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
/** bytes → lowercase hex */
export const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

// ── THE SANDBOX: uuidnaOS BOOTED UNDER EVERY TEST (the captain's order, 2026-08-23) ─────────────────────────
// Boot means what the seal means (the_os_is_bootable_quantum): the VERIFIED LOADING of compiled states —
// never execution. bootSandbox() verifies the whole image (32·(count+1) states, every one on-lattice, the
// receipt page closing it) and returns the ground a test stands on; it THROWS on a drifted world, so a suite
// that opens here fails ALL AT ONCE, loudly, with the receipt naming what moved — the constants-fail-the-
// sequence cure applied to the suite's own floor. Verified in 3.8 ms at first boot: the sandbox costs nothing.
// the ONE boot lives in the OS module (every surface runs from uuidnaOS — MCP, tests, site alike); the test
// api re-serves it under the sandbox name so a suite reads as what it is: tests inside the booted world.
export { bootOS as bootSandbox, type BootedOS as BootedSandbox } from '../quantum/os/index.js'
