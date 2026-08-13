// layers — the NAMED LAYERS of the stack (hardware → software → os), as ONE builder. Each layer reads the sealed
// lean/*.lean theorems of a given skill from the ledger and hands them out as one spec: the decidable statement each is
// proven by (the specification itself) plus its 128-bit content-address particle, folded to one order-invariant
// receipt. The three layers differ ONLY in (skill, principle, honest, boundary) — so there is ONE builder, not three
// copies (DRY: a fix or a field lands once, for all three). The sealed STATEMENT is the single source; the layer
// derives from the ledger alone, so nothing drifts. Integrity, not truth.
import { theorems } from './theorems/index.js'
import { merkleFold, toUuid } from './address.js'

/** One sealed member of a layer: its ledger key, the human label, the exact Lean statement it is proven by (the
 *  specification itself), and its 128-bit content-address particle. */
export interface LayerPart {
  key: string
  title: string        // the member label (from the theorem name, first clause)
  statement: string    // the sealed Lean proposition — the SPEC, `by decide`
  particle: string     // the 128-bit content-address of this theorem
}

/** A named layer: every sealed member of one skill, folded to one recomputable receipt. `boundary` is present only on
 *  the OS layer (the two named non-determinism modules it is confined to). */
export interface NamedLayer {
  principle: string        // the lean/*.lean file — the named layer
  count: number
  parts: LayerPart[]
  receipt: string          // the members' particles folded order-invariant — the layer seal, recomputable
  bits: number             // particle width — 128 bits each
  boundary?: readonly string[]
  honest: string
}

// the ledger is immutable at runtime — select+fold each layer once and memoise by skill.
const _cache = new Map<string, NamedLayer>()

/** namedLayer(skill, principle, honest[, boundary]) → the sealed layer of that skill as one named spec. Derived from
 *  the ledger alone; the sealed statement is the single source, no drift. Memoised per skill. */
export function namedLayer(skill: string, principle: string, honest: string, boundary?: readonly string[]): NamedLayer {
  const hit = _cache.get(skill)
  if (hit) return hit
  const parts: LayerPart[] = theorems()
    .filter((t) => t.skill === skill)
    .map((t) => ({ key: t.key, title: t.name.split(/[—:.]/)[0].trim(), statement: t.statement, particle: t.address }))
    .sort((a, b) => (a.key < b.key ? -1 : 1))
  const layer: NamedLayer = {
    principle,
    count: parts.length,
    parts,
    receipt: parts.length ? merkleFold(parts.map((p) => p.particle)) : toUuid('empty-layer|' + skill),
    bits: 128,
    ...(boundary ? { boundary } : {}),
    honest,
  }
  _cache.set(skill, layer)
  return layer
}

/** hardwareLayer() → the HARDWARE-VERIFIABLE binary algebra (lean/Hardware.lean): the combinational-logic identities a
 *  netlist is verified against — gate truth tables, NAND completeness, De Morgan, half/full adder, 2:1 mux. */
export const hardwareLayer = (): NamedLayer => namedLayer('hardware', 'lean/Hardware.lean',
  'The hardware-verifiable binary algebra: sealed combinational-logic identities (gate truth tables, NAND functional ' +
  'completeness, De Morgan, half/full adder, 2:1 mux), each `by decide`, axiom-free, and a 128-bit particle. The sealed ' +
  'STATEMENT is the specification — a gate design can be verified AGAINST it. uuidna seals the spec; it does NOT ' +
  'fabricate a device, synthesise a netlist, or develop silicon. A sealed spec, not a chip.')

/** softwareLayer() → the SOFTWARE-VERIFIABLE algebra (lean/Software.lean): the program-correctness laws an
 *  implementation is verified against — losslessness, totality, termination, order-invariance, safe access, reversibility. */
export const softwareLayer = (): NamedLayer => namedLayer('software', 'lean/Software.lean',
  'The software-verifiable algebra: sealed program-correctness laws (losslessness, structure preservation, idempotence, ' +
  'total guarded division, bounded termination, order-invariant reduction, ordering compare-swap, total safe indexing, ' +
  'reversibility), each `by decide`, axiom-free, and a 128-bit particle. The sealed STATEMENT is the specification — an ' +
  'implementation can be verified AGAINST it. uuidna seals the spec; it does NOT write, compile, or run your program, ' +
  'nor prove an arbitrary program correct. A sealed spec, not the program.')

/** osLayer() → the OS-INTEGRITY algebra (lean/Os.lean): the exact-copy facts a deployment is verified against — byte-
 *  equality, tamper/truncation/reorder detection, fixed digest/address widths, the two-module non-determinism boundary. */
export const osLayer = (): NamedLayer => namedLayer('os', 'lean/Os.lean',
  'The OS-integrity algebra: sealed exact-copy facts (verification is byte-equality; tamper / truncation / reordering ' +
  'break the match; the digest is 256 bits, the address 128; the boundary is exactly two named modules), each `by ' +
  'decide`, axiom-free, and a 128-bit particle. The sealed STATEMENT is the specification; the runtime verifier (Alpine ' +
  '+ driver provenance, portAllAlpine for the whole arch matrix) enforces it against real bytes. uuidna seals the ' +
  'integrity spec; it does NOT boot, link, or run an operating system. A sealed spec, not an OS.',
  ['src/quantum/os', 'src/quantum/drivers'])
