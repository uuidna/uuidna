// boundary — THE LIBRARY'S NAMED SINGULARITY for what it cannot prove: filesystem reach. The recomputable core
// never touches the disk; the few modules that must (the axiom witness reading lean/axioms.json, the security
// audit reading package.json) import THIS one declared place instead of each re-declaring the ROOT resolution.
// One boundary, visible in review, exempted by name in `one-receipt dry` — everything else in the library is pure.
// (File reads are deterministic given the tree — the harmonic scan ruled no boundary marker is needed here.)
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/** the repo root (dist/boundary.js → one level up) */
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
/** read a repo-relative file as utf8 — the boundary's one verb */
export const rdRoot = (p: string): string => readFileSync(join(ROOT, p), 'utf8')
