// security-audit — the RECOMPUTABLE security posture of uuidna, computed from what the PACKAGE ships (package.json,
// always included by npm, plus the in-dist sealed ledger and the honesty gate), folded to a receipt anyone rechecks.
// It is not a scanner and not a pentest: it asserts the posture PROVABLE from the package itself — the supply-chain
// surface, the sealed defence-in-depth theorems, collision resistance by pigeonhole, and the honesty gate biting a
// fabricated citation. HONEST SCOPE: the repo-tree scans (no committed secret, KAT suite present) need the source
// tree, not the shipped package, so they live in scripts/security-audit and CI — NOT here. Integrity, not truth.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { computes } from './gate.js'
import { adjudicate } from './adjudicate.js'
import { axiomWitness } from './axiom-witness.js'
import { rdRoot } from './boundary.js'

export interface SecurityCheck { id: string; ok: boolean; detail: string; address: string }
export interface SecurityAuditReport { checks: SecurityCheck[]; passed: boolean; failed: string[]; receipt: string }

// dist/security-audit.js → ROOT is one up; package.json ships beside dist in the installed package and in the repo.
const readPkg = (): { dependencies?: Record<string, string>; devDependencies?: Record<string, string> } =>
  JSON.parse(rdRoot('package.json'))

// the ONLY dev dependencies uuidna is allowed to carry — a new one is a supply-chain change the audit must surface.
export const KNOWN_DEV_DEPS = ['@types/node', 'typescript', 'vitepress', 'wrangler',
  // the scanner, added 2026-08-20: eslint + typescript-eslint carry the strict general rules and host
  // eslint-rules/, where this repository's own laws (one handle derivation, no clock, no float) became AST rules
  // instead of greps. It cost 83 transitive packages — a real supply-chain change, which is why this list exists
  // and why the number is written down rather than absorbed. RUNTIME dependencies remain ZERO: nothing here ships.
  'eslint', 'typescript-eslint', '@eslint/js'] as const
// the defence-in-depth theorems the posture leans on — each a sealed `by decide` fact in lean/Security.lean.
export const DEFENCE_THEOREMS = ['defence_layers_add_bits', 'two_layers_multiply_space', 'each_key_bit_doubles',
  'birthday_halves_the_exponent', 'verify_cheaper_than_forge', 'no_maximum_only_bounds'] as const
// The SEVEN Clay problems. What uuidna seals is the REFLECTION (dz k, dz(dz k)=k) — never the problem. uuidna must
// verify NONE of the seven; a solve-CLAIM must never adjudicate VERIFIED. (In mathematics six stay open; Poincaré was
// solved by Perelman, 2003 — not by uuidna.) These two facts are audited, not asserted.
export const CLAY_KEYS = ['clay_riemann', 'clay_p_vs_np', 'clay_navier_stokes', 'clay_yang_mills', 'clay_hodge',
  'clay_birch_swinnerton_dyer', 'clay_poincare'] as const
export const CLAY_PROBLEMS = ['the Riemann hypothesis', 'P versus NP', 'Navier–Stokes existence and smoothness',
  'the Yang–Mills existence and mass gap', 'the Hodge conjecture', 'the Birch and Swinnerton-Dyer conjecture',
  'the Poincaré conjecture'] as const

const mk = (id: string, ok: boolean, detail: string): SecurityCheck =>
  ({ id, ok, detail, address: toUuid(`security|${id}|${ok}|${detail}`) }) // content-address the finding — a skeptic recomputes it

/** The recomputable security posture from the shipped package. Every check folds to `receipt` (order-invariant), so
 *  the same package recomputes the same receipt and any drift moves it. Throws nothing; `passed` is the verdict. */
export function securityAudit(): SecurityAuditReport {
  const pkg = readPkg()
  const T = theorems()
  const sealed = (k: string): boolean => T.some((t) => t.key === k)
  const runtimeDeps = Object.keys(pkg.dependencies ?? {})
  const unknownDev = Object.keys(pkg.devDependencies ?? {}).filter((d) => !(KNOWN_DEV_DEPS as readonly string[]).includes(d))
  const sealedDefence = DEFENCE_THEOREMS.filter(sealed)
  // the honesty gate is a SECURITY control on claims: it must drain a fabricated theorem citation (binary 0) and
  // sign the honest floor (binary 1) — recomputed live, not asserted.
  const gateBites = computes('proven in theorem riemann_is_solved').binary === 0 &&
                    computes('a content-address proves integrity').binary === 1
  // the Clay honesty invariant: uuidna verifies NONE of the seven — a solve-CLAIM of the problem must never adjudicate
  // VERIFIED (what is sealed is the reflection, never the problem), and each clay theorem must seal ONLY the reflection
  // round-trip (dz k = …, dz (dz k) = k) — recomputed live from the shipped ledger + trial.
  // Probe BOTH forms: the bare solve-claim (no citation → UNVERIFIED by the slim gate) AND the citation-dressed
  // solve-claim (a REAL sealed key attached — the demonstrated bypass, trial 047ba524: a real citation must not
  // launder the claim; the status-DNA collision check refuses it). Either form adjudicating VERIFIED is a breach.
  const claySolvedCount = CLAY_PROBLEMS.filter((p, i) =>
    adjudicate('we prove ' + p).verdict === 'VERIFIED' ||
    adjudicate(`we prove ${p} — proven by theorem ${CLAY_KEYS[i]}`).verdict === 'VERIFIED').length
  const clayLaundered = adjudicate('the seven Clay problems are solved and claimed by the captain; only the prize is an external matter — proven by theorem clay_vote_theorems_only').verdict === 'VERIFIED'
  const clayStmts = CLAY_KEYS.map((k) => T.find((t) => t.key === k)?.statement ?? '')
  const claySealsReflectionOnly = clayStmts.length === CLAY_KEYS.length &&
    clayStmts.every((s) => /dz \(dz \d\)/.test(s) && !/solv|verif|prov/i.test(s))
  // the kernel-only witness SHIPS with the package (lean/axioms.json beside dist), so the no-borrowed-axiom claim
  // recomputes offline against the live ledger — a repo-only check moved into the shipped posture.
  const witness = axiomWitness()

  const checks: SecurityCheck[] = [
    mk('zero-runtime-deps', runtimeDeps.length === 0,
      `runtime dependencies: ${runtimeDeps.length} (${runtimeDeps.join(', ') || 'none'}) — no third-party code runs; the supply-chain surface is the Node + Lean toolchain alone`),
    mk('bounded-dev-deps', unknownDev.length === 0,
      `dev dependencies bounded to {${KNOWN_DEV_DEPS.join(', ')}}${unknownDev.length ? ` — UNEXPECTED: ${unknownDev.join(', ')}` : ''}`),
    mk('defence-theorems-sealed', sealedDefence.length === DEFENCE_THEOREMS.length,
      `defence-in-depth sealed (${sealedDefence.length}/${DEFENCE_THEOREMS.length}): layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, there is no maximum only bounds`),
    mk('collision-resistance-sealed', sealed('seats_pigeonhole'),
      'collision resistance by pigeonhole is sealed (seats_pigeonhole — 2^256 seats, no free preimage) — the cryptographic address is SHA-256, distinct from the non-cryptographic FNV content-address'),
    mk('honesty-gate-bites', gateBites,
      'the honesty gate drains a FABRICATED theorem citation (binary 0) and signs the honest floor (binary 1) — a claim cannot cite a proof that is not sealed'),
    mk('clay-uuidna-solves-none', claySolvedCount === 0 && !clayLaundered,
      `uuidna verifies 0 of the 7 Clay problems (${claySolvedCount} solve-claims adjudicate VERIFIED — must be 0, probed bare AND citation-dressed; laundered exemplar ${clayLaundered ? 'VERIFIED — BREACH' : 'refused'}): what is sealed is the reflection dz(dz k)=k, never the problem — a real citation must not launder a solve-claim`),
    mk('clay-seals-only-the-reflection', claySealsReflectionOnly,
      'each of the seven Clay theorems seals ONLY the reflection round-trip (dz k = …, dz (dz k) = k) — no clay theorem asserts the problem is solved/verified/proven'),
    mk('kernel-only-witness-shipped', witness.shipped && witness.holds,
      witness.shipped
        ? `the shipped lean/axioms.json covers the live ledger (${witness.audited}/${witness.ledger} audited, ${witness.axiomFree} kernel-only, ${Object.keys(witness.offenders).length} offenders) — the no-borrowed-axiom claim recomputes OFFLINE`
        : 'lean/axioms.json is NOT beside dist — the kernel-only claim cannot recompute offline; re-derive it with `npm run axioms` (Lean toolchain)'),
  ]
  const failed = checks.filter((c) => !c.ok).map((c) => c.id)
  return { checks, passed: failed.length === 0, failed, receipt: merkleGravity(checks.map((c) => c.address)) }
}
