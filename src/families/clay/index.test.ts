import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf } from '../../quantum/processing/unit/index.js'
import { leanSource, leanRecomputed } from '../../quantum/processing/unit/lean.js'
import { verifyHex } from '../verify.js'
import { ClaySeals, CLAY_SEALS, claySealDomainOf, claySealDomainCoverageOf } from './index.js'
import { facesOf } from '../../quantum/processing/unit/index.js'
import '../../mcp/families.js'

/** THE CLUSTER GENERATOR, offline and exact. The clusters a formula belongs to are read from the served Lean source
 *  and the registry, never the live host: the theorem cluster (every theorem the kernel recomputes), the axiom cluster
 *  (none — the lattice assumes nothing of its own), the def cluster the theorems are built from, and each family's
 *  formulas, counted by how many are a Lean def the kernel already proves. The clay cluster is held to its seals,
 *  exact, at their hex addresses. The live cross-development — a value two families reach, answering alike from every
 *  perspective — is verified where it is generated, by `receipt.mjs next` and the discovery receipt, not here. */
test('clusters: every theorem, 0 axioms, the def cluster, each family, and the clay seals — offline and exact', async (t) => {
  const families = hexFamiliesOf()
  const leanDefs = new Set([...leanSource.matchAll(/^[ \t]*def ([A-Za-z]\w*)/gm)].map((m) => m[1]))
  const theorems = [...leanSource.matchAll(/^[ \t]*theorem ([A-Za-z]\w*)/gm)].map((m) => m[1])
  const axioms = [...leanSource.matchAll(/^[ \t]*axiom ([A-Za-z]\w*)/gm)].map((m) => m[1])

  // the Lean clusters, from the source the kernel checks
  // the cluster is the set of theorems in the source, and each is one the kernel recomputed and holds: two readings of
  // the one Lean file (the source's own theorem lines, the build's recompute table) that must name the same theorems
  assert.equal(new Set(theorems).size, theorems.length, 'no theorem is stated twice')
  assert.deepEqual([...theorems].sort(), Object.keys(leanRecomputed).sort(), 'the theorem cluster: each theorem of the source recomputed by the kernel, and nothing recomputed that the source does not state')
  assert.ok(Object.values(leanRecomputed).every((r) => r.holds), 'each recomputed theorem holds')
  assert.equal(axioms.length, 0, 'no axioms: nothing assumed, everything proven')
  assert.ok(leanDefs.size >= 40, 'the def cluster the theorems are built from')

  // THE GENERATOR over every family cluster: how many of its formulas are a Lean def the kernel already proves
  const clusters = [...families.keys()].filter((f) => !['qpu', 'crypto', 'api', 'data', 'gate'].includes(f)).sort()
    .map((family) => { const ns = (families.get(family) ?? []).map((f) => f.name); return { family, lean: ns.filter((n) => leanDefs.has(n)).length, total: ns.length } })
  assert.ok(clusters.length > 0 && clusters.every((c) => c.lean <= c.total), 'the generator accounts for every family cluster')

  // THE CLAY CLUSTER: six problems, their σ-seals exact — Hodge's rank 2g, Yang–Mills' two eigenvalues ±1, BSD's
  // self-inverse pairs — at their hex addresses through the MCP (verifyHex)
  const clayNames = (families.get('clay') ?? []).map((f) => f.name)
  assert.ok(clayNames.length >= 6, 'the six problems are formulas')
  assert.equal(ClaySeals.hodge(2).value, 4, 'H₁(Σ₂) = ℤ⁴')
  assert.equal(ClaySeals.yangMills().value, 2, 'spectrum {−1, +1}: two real eigenvalues')
  assert.equal(ClaySeals.bsd(15).value, 2, 'two self-inverse pairs in (ℤ/15ℤ)*')
  await verifyHex('clay', clayNames.length, [['hodge', [2], 4], ['yangMills', [], 2], ['bsd', [15], 2]])

  t.diagnostic(`${clusters.length} family clusters (${clusters.reduce((s, c) => s + c.lean, 0)} kernel-proven of ${clusters.reduce((s, c) => s + c.total, 0)}); theorems ${theorems.length}, axioms ${axioms.length}, defs ${leanDefs.size}; clay seals hodge 4, yangMills 2, bsd 2`)
})

/** Combinatorial domains: bsd m>2 ∪ {15}, pVsNp {0,1}, others arity-correct — not blind 1…faces. */
test('claySealDomainOf: tree-valid domains; universal coverage holds', async (t) => {
  const faces = facesOf().faces
  const bsd = claySealDomainOf('bsd', faces)
  assert.ok(bsd.params.every((p) => p[0]! > 2), 'bsd domain excludes m=1,2')
  assert.ok(bsd.params.some((p) => p[0] === 15), 'bsd domain includes named 15')
  const pnp = claySealDomainOf('pVsNp', faces)
  assert.deepEqual(pnp.params, [[0], [1]])
  const ym = claySealDomainOf('yangMills', faces)
  assert.deepEqual(ym.params, [[]])
  const cov = claySealDomainCoverageOf(faces)
  assert.equal(cov.rows.length, CLAY_SEALS.length)
  assert.equal(cov.universal, true, 'σ holds on every domain input')
  assert.equal(cov.held, cov.size)
  t.diagnostic(`domains ${cov.size} slots; universal ${cov.universal}; bsd ${bsd.kind}; pVsNp ${pnp.kind}`)
})

