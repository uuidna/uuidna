// corroborate — augment the LOCAL binary verification (adjudicate: VERIFIED / UNVERIFIED, where UNVERIFIED is never
// "false", only "not yet verified") with EXTERNAL RESEARCH streamed from FREE APIs. HONEST SCOPE: external evidence
// is a recomputable PROVENANCE FINGERPRINT of what a public source says — it CORROBORATES, it does NOT prove. Only a
// `by decide` theorem SEALS (VERIFIED); CORROBORATED means "unverified locally, but a named free source attests it" —
// evidence, never truth. A local VERIFIED (a sealed proof) always outranks external evidence; a binary gate can prove
// but never refute, so external research only ever populates the silent UNVERIFIED bucket, never overturns a seal.
// The evidence folds ORDER-INVARIANTLY to one receipt (the same merkle-gravity fold the quantum domain uses).
// Integrity, not truth.
import { adjudicate } from './adjudicate.js'
import { nistConstant } from './constants.js'
import { merkleGravity } from './gravity.js'
import { toUuid } from './address.js'

/** One piece of external research — a provenance-fingerprinted attestation from a free public API. NOT a proof. */
export interface ResearchEvidence { source: string; address: string; note: string }

export interface Corroboration {
  statement: string
  local: 'VERIFIED' | 'UNVERIFIED'                     // the binary local gate (a sealed by-decide proof, or not)
  evidence: ResearchEvidence[]                                  // external research, each a provenance fingerprint
  verdict: 'VERIFIED' | 'CORROBORATED' | 'UNVERIFIED'   // sealed proof · external attestation · neither (never "false")
  receipt: string                                       // order-invariant fold of the evidence addresses
  develop: string[]                                     // the REFLECTION — the recomputable path to seal it (never a dead end)
  honest: string
}

const HONEST =
  'External research CORROBORATES, it does not PROVE: each evidence item is a provenance fingerprint of what a FREE ' +
  'public API says, never a proof. Only a `by decide` theorem SEALS (VERIFIED). CORROBORATED = unverified locally but ' +
  'attested by a named external source — evidence, not truth; UNVERIFIED is never "false", only "not yet verified". A ' +
  'binary gate proves but never refutes, so a local VERIFIED always outranks external evidence, and no stream can ' +
  'promote a claim to SEALED. The evidence folds order-invariantly to the receipt, recomputable by anyone.'

/** corroborate(statement, evidence[, decidableTest]) → the LOCAL binary verdict augmented with external evidence,
 *  folded to an order-invariant receipt. A sealed proof (VERIFIED) outranks everything; else external evidence, if
 *  any, yields CORROBORATED (attestation, not proof); else UNVERIFIED (never "false"). Pure and deterministic. */
export function corroborate(statement: string, evidence: ResearchEvidence[] = [], decidableTest?: () => boolean): Corroboration {
  const adj = adjudicate(statement, decidableTest)
  const local = adj.verdict
  const receipt = merkleGravity(evidence.map((e) => e.address))
  const verdict = local === 'VERIFIED' ? 'VERIFIED' : evidence.length ? 'CORROBORATED' : 'UNVERIFIED'
  return { statement, local, evidence, verdict, receipt, develop: adj.develop, honest: HONEST }
}

/** researchEvidence(query) → external research from FREE API STREAMS (currently NIST CODATA, no key), each match a
 *  provenance-fingerprinted Evidence item. The network call; the responses are DATA — content-addressed, never
 *  executed. Best-effort: a down or empty stream yields no evidence, never a fabricated one. */
export async function researchEvidence(query: string): Promise<ResearchEvidence[]> {
  const out: ResearchEvidence[] = []
  try {
    const nist = await nistConstant(query)
    for (const m of nist.matches.slice(0, 8)) {
      const note = JSON.stringify(m).replace(/[{}"]/g, '').slice(0, 100)
      out.push({ source: nist.source, address: toUuid(JSON.stringify(m)), note })
    }
  } catch {
    /* a free API may be unreachable — corroboration is best-effort and NEVER fabricates evidence */
  }
  return out
}

/** approve(c) → the HARD gate: ONLY a local by-decide seal (the "quantum" verification — a proof that COMPUTES)
 *  approves a claim. THROWS if a non-sealed source is used as approval — CORROBORATED (external research) and
 *  UNVERIFIED (silence) are evidence and not-yet, NEVER approval. This makes "only lean approves" a HARD FAILURE, not
 *  a soft downgrade: no external stream, no attestation, can ever seal. (Honest caveat: this gates APPROVAL, not the
 *  ledger — uuidna's own arithmetic is classical and honestly so; "quantum" here names the recomputable Lean seal.) */
export function approve(c: Corroboration): Corroboration {
  if (c.local !== 'VERIFIED')
    throw new Error(
      `corroborate: HARD FAIL — approval requires a local by-decide seal (the "quantum" verification); ` +
        `"${c.statement.slice(0, 60)}" is ${c.verdict}. External research CORROBORATES, it never APPROVES; ` +
        `UNVERIFIED is not "false", only not-yet. Only lean approves.\n` +
        `REFLECT — the failure is not a dead end; the recomputable path to seal it (the quantum solution):\n` +
        (c.develop.length ? c.develop.map((d) => '  • ' + d).join('\n') : '  • express it as a decidable proposition and prove it `by decide`.'),
    )
  return c
}

/** corroborateWithResearch(statement) → corroborate a claim against the free research streams (one network call).
 *  HONEST: it can only CORROBORATE (external evidence) or leave UNVERIFIED — it can NEVER seal; only a by-decide
 *  theorem does, and it can never refute (no counterexample lives in an external stream). */
export async function corroborateWithResearch(statement: string): Promise<Corroboration> {
  return corroborate(statement, await researchEvidence(statement))
}
