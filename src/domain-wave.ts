// @non-harmonic: external free-API research wave (network — evidence— NAMED boundary; the harmonic core must never carry these ops.
// domain-wave — for ONE domain (principle/skill), run BOTH waves: the LOCAL development audit (its theorems fold
// order-invariantly to a receipt and are sealed by decide — the approval) AND the EXTERNAL free-research wave
// (corroborate the domain's topic against a free public API — evidence. HONEST SCOPE: the LOCAL wave
// is the seal — only a by-decide proof approves; the EXTERNAL wave only CORROBORATES, and for a pure-arithmetic
// domain (ℤ/9, ℤ/7) a physics-constants stream honestly returns NO evidence, which is correct. The
// order-invariant fold is the "quantum touch" (bell_no_signaling). Integrity.
import { theorems } from './theorems/index.js'
import { merkleGravity } from './gravity.js'
import { toUuid } from './address.js'
import { corroborateWithResearch, type Corroboration } from './corroborate.js'

export interface DomainWave {
  domain: string
  // the local development wave — the seal. `recomputes` is the audit that can FAIL: every address is re-derived
  // from the theorem's own key and statement and compared, so a forged or edited entry is caught. `orderInvariant`
  // is kept because it is the receipt property callers rely on, but it is STRUCTURAL—
  // merkleFold sorts its leaves, so it is true for every input (checked over 492 permutations: never false).
  // Reporting it as though it were an audit is the vacuous class: a check that cannot fail proves nothing.
  local: { theorems: number; fold: string; orderInvariant: boolean; recomputes: boolean; forged: string[] }
  external: Corroboration // the external free-research wave — evidence
  honest: string
}

const HONEST =
  'Two waves for a domain: the LOCAL development wave (its theorems fold ORDER-INVARIANTLY to a receipt and are sealed ' +
  '`by decide`, axiom-free — the approval) and the EXTERNAL free-research wave (corroborate the topic against a free ' +
  'public API — evidence). Only the LOCAL by-decide seal APPROVES; external research only CORROBORATES, and for a ' +
  'pure-arithmetic domain a physics stream honestly returns no evidence — correct. Integrity.'

/** domainWave(domain) → the two waves for a principle/skill: LOCAL (its theorems fold order-invariantly — the seal)
 *  and EXTERNAL (free research corroborating the domain's topic — evidence. One network call. */
export async function domainWave(domain: string): Promise<DomainWave> {
  const list = theorems().filter((t) => t.principle === domain || t.skill === domain)
  const addrs = list.map((t) => t.address)
  const fold = merkleGravity(addrs)
  const orderInvariant = fold === merkleGravity([...addrs].reverse())   // structural — see the type
  // THE REAL AUDIT: an address is toUuid(key + ':' + statement), so it is recomputable from the theorem itself.
  // Any entry whose stored address does not fall out of its own content has been edited or forged.
  const forged = list.filter((t) => toUuid(t.key + ':' + t.statement) !== t.address).map((t) => t.key)
  const external = await corroborateWithResearch(domain)
  return { domain, local: { theorems: list.length, fold, orderInvariant, recomputes: forged.length === 0, forged }, external, honest: HONEST }
}
