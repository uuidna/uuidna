// domain-wave — for ONE domain (principle/skill), run BOTH waves: the LOCAL development audit (its theorems fold
// order-invariantly to a receipt and are sealed by decide — the approval) AND the EXTERNAL free-research wave
// (corroborate the domain's topic against a free public API — evidence, never a seal). HONEST SCOPE: the LOCAL wave
// is the seal — only a by-decide proof approves; the EXTERNAL wave only CORROBORATES, and for a pure-arithmetic
// domain (ℤ/9, ℤ/7) a physics-constants stream honestly returns NO evidence, which is correct, not a failure. The
// order-invariant fold is the "quantum touch" (bell_no_signaling). Integrity, not truth.
import { theorems } from './theorems/index.js'
import { merkleGravity } from './gravity.js'
import { corroborateWithResearch, type Corroboration } from './corroborate.js'

export interface DomainWave {
  domain: string
  local: { theorems: number; fold: string; orderInvariant: boolean } // the local development wave — the seal
  external: Corroboration // the external free-research wave — evidence, never a seal
  honest: string
}

const HONEST =
  'Two waves for a domain: the LOCAL development wave (its theorems fold ORDER-INVARIANTLY to a receipt and are sealed ' +
  '`by decide`, axiom-free — the approval) and the EXTERNAL free-research wave (corroborate the topic against a free ' +
  'public API — evidence). Only the LOCAL by-decide seal APPROVES; external research only CORROBORATES, and for a ' +
  'pure-arithmetic domain a physics stream honestly returns no evidence — correct, not a failure. Integrity, not truth.'

/** domainWave(domain) → the two waves for a principle/skill: LOCAL (its theorems fold order-invariantly — the seal)
 *  and EXTERNAL (free research corroborating the domain's topic — evidence, not proof). One network call. */
export async function domainWave(domain: string): Promise<DomainWave> {
  const list = theorems().filter((t) => t.principle === domain || t.skill === domain)
  const addrs = list.map((t) => t.address)
  const fold = merkleGravity(addrs)
  const orderInvariant = fold === merkleGravity([...addrs].reverse())
  const external = await corroborateWithResearch(domain)
  return { domain, local: { theorems: list.length, fold, orderInvariant }, external, honest: HONEST }
}
