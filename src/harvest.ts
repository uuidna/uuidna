// harvest — extract decidable arithmetic from external bytes and shape them for the conveyor.
// FREE MINTING LAW (Coins.lean): the kernel decides at zero marginal cost; APIs supply the ore, decide() smelts it,
// the wave queue carries candidates, and only a by-decide seal mints the two coins. Evidence never auto-seals.
import { decide } from './decide.js'
import { handleOf } from './handle.js'
import { toUuid } from './address.js'
import { theoremByKey } from './theorems/index.js'
import { isBareLiteralLean, type WaveCandidate } from './wave-deposit.js'

// Bounded quantifiers: commas are stripped before matchAll, so the class is digits only; unbounded
// `\s*` next to `%` in the operator class is the ReDoS shape CodeQL names (js/polynomial-redos).
export const ARITH_FRAG = /\d{1,24}(?:[ \t]{0,4}[+\-*/%^][ \t]{0,4}\d{1,24})+[ \t]{0,4}(?:=|==|<=|>=|<|>)[ \t]{0,4}\d{1,24}|\d{1,24}[ \t]{0,4}(?:=|==|<=|>=|<|>)[ \t]{0,4}\d{1,24}(?:[ \t]{0,4}[+\-*/%^][ \t]{0,4}\d{1,24})*/g

const normKey = (s: string): string => s.replace(/,/g, '').replace(/\s+/g, '')

/** harvestFragments(text) → unique arithmetic snippets worth judging. Pure. */
export function harvestFragments(text: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const m of text.replace(/,/g, '').matchAll(ARITH_FRAG)) {
    const f = m[0].trim()
    const k = normKey(f)
    if (!seen.has(k)) { seen.add(k); out.push(f) }
  }
  return out
}

/** fragmentToLean(f) → a Lean proposition the kernel can decide. Pure. */
export function fragmentToLean(fragment: string): string {
  let s = fragment.replace(/,/g, '').replace(/\*\*/g, '^').replace(/==/g, '=')
  s = s.replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠')
  s = s.replace(/([0-9)])([+\-*/^%])/g, '$1 $2').replace(/([+\-*/^%=<>!])([0-9(])/g, '$1 $2')
  s = s.replace(/([^=!<>])=([^=])/g, '$1 = $2')
  s = s.replace(/\s+/g, ' ').trim()
  if (!s.startsWith('(')) s = `(${s})`
  return s
}

/** keyFromFragment(f) → a lawful theorem key derived from the statement, not chosen. Pure. */
export function keyFromFragment(fragment: string): string {
  return 'api_' + handleOf(toUuid('api-mint:' + normKey(fragment)))
}

export interface MintLead {
  key: string
  fragment: string
  lean: string
  why: string
  source: string
  from: string
  receipt: string
}

/** mintLeadsFromText(source, from, text) → FREE-MINT candidates: decided TRUE, absent from the sealed ledger. Pure. */
export function mintLeadsFromText(source: string, from: string, text: string): MintLead[] {
  const sealed = theoremByKey()
  const leads: MintLead[] = []
  for (const fragment of harvestFragments(text)) {
    const d = decide(fragment)
    if (d.verdict !== 'VERIFIED_BY_DECIDE' || d.kind !== 'decided-arithmetic') continue
    const prop = fragmentToLean(fragment)
    const key = keyFromFragment(fragment)
    if (sealed.has(key)) continue
    const lean = `theorem ${key} : ${prop} := by decide`
    // ASK THE DOOR BEFORE CARRYING THE ORE. decide() confirms `5 = 5` as readily as it confirms real arithmetic —
    // truth is not the scarce thing, ALGEBRA is — so a fragment of two bare literals passes the check above and is
    // still nothing the ledger can want. ARITH_FRAG's second alternative allows ZERO operators, which is how a
    // digit inside a package name became a proposed theorem 79 times over. The door law is imported, never
    // restated, so a miner cannot drift from the conveyor that judges it.
    if (isBareLiteralLean(lean)) continue
    leads.push({
      key,
      fragment,
      lean,
      why: `FREE MINT from ${source}: the public API attested "${fragment.slice(0, 80)}"; decide() confirmed it TRUE and the ledger does not yet seal it — minting costs nothing, only the kernel approves (theorem minting_is_free_and_forging_is_not). Provenance: ${from.slice(0, 60)}.`,
      source,
      from,
      receipt: d.receipt,
    })
  }
  return leads
}

/** mintLeadsToCandidates(leads) → wave-queue shape. Pure. */
export function mintLeadsToCandidates(leads: readonly MintLead[]): WaveCandidate[] {
  const seen = new Set<string>()
  return leads.filter((l) => !seen.has(l.key) && seen.add(l.key)).map((l) => ({ key: l.key, why: l.why, lean: l.lean }))
}
