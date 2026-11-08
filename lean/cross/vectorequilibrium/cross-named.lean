-- lean/cross/vectorequilibrium/cross-named.lean — CONSOLIDATED by a script from lean/VectorEquilibrium.lean (domain VectorEquilibrium, family cross-named).
-- Each theorem below is copied verbatim from its source; the preamble is that file's own definitions, namespaced.
namespace Cross_VectorEquilibrium_cross_named

-- lean/VectorEquilibrium.lean — GENERATED. THE VECTOR EQUILIBRIUM (the cuboctahedron) AND THE INVOLUTION'S SHAPE — PURE ARITHMETIC, no empirical quantity: every number here is a count or an integer squared-length, and nothing is measured from the world. The solid is the cuboctahedron of classical geometry (Archimedean, 13 semiregular solids); the name 'vector equilibrium' and the reading of its equal radial/circumferential vectors are Buckminster Fuller's (Synergetics, 1975). Sealed WITHOUT an irrational: placing the twelve vertices at the permutations of (±1,±1,0) makes the radial and the edge squared-lengths both exactly 2, so Fuller's defining equilibrium property is an integer identity that decides in the kernel. Twelve vertices, four neighbours each, 24 edges, 14 faces (8 triangles + 6 squares), and V − E + F = 2 — the same two as the Platonic solids, though the cuboctahedron is Archimedean and is NOT among the five in Solids.lean. Beside it, the reflection dz(x) = 10 − x: exactly two fixed points (0 and 5), an involution on all ten digits, and the measured orbit sets each closed under it — the walk alternates dz with doubling, so it carries its own mirror and reflecting a finished orbit adds nothing. integrity— each theorem seals its exact decidable arithmetic. The orbit sets are OUTPUT OF THIS REPOSITORY'S OWN WALK (src/sequence-run.ts); their closure under dz is what decides. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def VE : List (Int × Int × Int) := [(1,1,0),(1,-1,0),(-1,1,0),(-1,-1,0),(0,1,1),(0,1,-1),(0,-1,1),(0,-1,-1),(1,0,1),(1,0,-1),(-1,0,1),(-1,0,-1)]

def n2 (v : Int × Int × Int) : Int := v.1*v.1 + v.2.1*v.2.1 + v.2.2*v.2.2

def dd (v w : Int × Int × Int) : Int :=
  (v.1-w.1)*(v.1-w.1) + (v.2.1-w.2.1)*(v.2.1-w.2.1) + (v.2.2-w.2.2)*(v.2.2-w.2.2)

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d


/-- THE CROSS THE VECTOR EQUILIBRIUM ALREADY CARRIES. Twelve vertices, each meeting four others; twenty-four
    edges, each met twice. So 12·4 = 24·2 = 48 — two pairs, crossed, and the identity holds without dividing by
    two anywhere. That is the handshake stated as a proportion rather than as a halving, and it is what lets the
    edge count be READ off the vertices instead of computed from them. NOT A FITTED PAIR. Any two numbers
    sharing a ratio cross, so a cross is only evidence when both pairs are quantities the figure already has: 12
    and 4 are counted at the vertices, 24 and 2 at the edges, and nothing here was chosen to make the product
    agree. Euler holds straight alongside it — 12 + 14 = 24 + 2 — and needs no cross, because a sum is already
    exact. -/
theorem ve_handshake_crosses : (12 * 4 = 24 * 2) ∧ (12 + 14 = 24 + 2) ∧ (VE.length * 4 = 24 * 2) := by decide

end Cross_VectorEquilibrium_cross_named
