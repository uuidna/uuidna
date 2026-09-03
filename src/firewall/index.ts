// firewall — REJECT BY DEFAULT; ADMIT ONLY ON A SEAL THAT VERIFIES.
//
// THE GATE TODAY IS DEFAULT-ALLOW, and its own output says so. `reveal()` returns binary 1 — not drained — for a
// claim that cites NOTHING:
//
//     reveal('a claim citing nothing at all')
//       → { verdict: 'UNVERIFIED', binary: 1, cites: [], fabricated: [] }
//
// Only a FABRICATED citation drains. So the gate admits silence and refuses lies, which means it has to hunt: it
// must enumerate the ways a claim can be wrong, and it is exactly as complete as that enumeration. Every defect
// found tonight lived in the gap between the enumeration and the world — a purged key still in backticks, an
// unsealed key rendered in backticks by a generator, a census frozen in prose, a receipt certifying tests it
// never ran, four "frames" that agree by construction.
//
// A FIREWALL INVERTS THE BURDEN AND THAT IS WHY IT IS FAST. There is one way to be admitted — present a key the
// ledger seals — and no list of ways to be refused. Nothing has to be enumerated, so nothing can be missing from
// the enumeration. The cost per claim is a set membership, constant in the size of the ledger, where hunting is
// linear in the number of things you thought to look for and silent about the rest.
//
// IT IS STRICTER THAN reveal(), NOT A REPLACEMENT FOR IT. reveal's binary answers "was this drained"; the
// firewall's answers "is this sealed". A claim can be undrained and unsealed at the same time — that is precisely
// the population this admits nothing from, and it is the population the README's four-frame section lived in.
//
// WHAT IT DOES NOT DO, named so the boundary is a decision rather than an omission: it does not judge whether the
// sealed theorem SUPPORTS the claim citing it. That is the citation-vs-support distinction the tree already draws
// — "the gate proves backed, not authentic" — and no set membership can close it. The firewall refuses the
// unsealed; it admits the irrelevant.
import { theorems } from '../theorems/index.js'

// *** THE CORRECTION, AND IT CAME FROM A SEALED THEOREM REFUSING THIS FILE. ***
//
// The first version of this firewall returned two states: admitted, or rejected. Asked who WITNESSED a
// rejection, it had no answer — it refused on its own authority, which is precisely the thing it was built to
// refuse. And the ledger already seals against it. `silence_never_refutes` (Negation.lean):
//
//     Of the four citation states, exactly ONE verifies (cited AND sealed: 1·1) and the other three are OPEN
//     — 4 − 1 = 3, and 3 > 0 — none of them refuted, because absence of a citation is not a refutation.
//
// So a two-state firewall converts OPEN into REFUTED for three of four states, and the kernel has decided that
// it may not. A claim citing nothing is not false; nothing has been said about it. Refusing to ACT on it is
// legitimate — a firewall may decline to admit — but calling that a refutation is a verdict nobody witnessed.
//
// WHO WITNESSES WHAT, now carried in the type rather than in my confidence:
//   ADMITTED — witnessed by the LEDGER: a sealed theorem, named, with the address it resolved to. Recomputable
//              by anyone holding the same ledger; the firewall's opinion is not part of it.
//   REFUTED  — witnessed by the ledger's positive LACK of a key that was positively CLAIMED. This is the one
//              decidably-false case `exactly_one_flag` reserves — the hollow-and-uncleared — and it is a
//              refutation because evidence was offered and the evidence does not exist.
//   OPEN     — witnessed by NOBODY, and the state says so. Not admitted, not refuted, not held against the
//              claim. The honest report of an absence.
export type Admission =
  | { state: 'admitted'; witness: 'ledger'; seals: readonly string[]; addresses: readonly string[] }
  | { state: 'refuted'; witness: 'ledger'; reason: string; fabricated: readonly string[] }
  | { state: 'open'; witness: 'none'; reason: string }

/** Convenience for callers that only need "may I act on this" — admitted is the only yes, and OPEN is not a no
 *  about the claim, only a no about acting. Kept explicit so the collapse happens at the CALLER, where someone
 *  is deciding, rather than inside the instrument where it would look like a finding. */
export const actionable = (a: Admission): boolean => a.state === 'admitted'

/** The sealed set, built once. Membership is the whole test, so the cost per claim does not grow with the ledger. */
let SEALED: Map<string, string> | null = null
const sealed = (): Map<string, string> => (SEALED ??= new Map(theorems().map((t) => [t.key, t.address])))

/** Citations a claim presents: `theorem <key>`, `/theorem/<key>`, or a backticked key — the same three surfaces
 *  the deadkey finder reads, so the firewall and the finder agree by construction about what was cited. */
export function citationsIn(text: string): string[] {
  const found = new Set<string>()
  for (const re of [/\btheorem\s+([a-z0-9_]+)/g, /\/theorem\/([a-z0-9_]+)/g, /`([a-z0-9_]{4,})`/g]) {
    for (const m of text.matchAll(re)) found.add(m[1]!)
  }
  return [...found]
}

/** admit(text) → the firewall's verdict. Rejected unless at least one cited key is sealed AND no cited key is
 *  fabricated. Both conditions matter: silence is refused because nothing vouches for it, and a fabricated key
 *  is refused even beside a good one, because a claim that cites one live key and one dead one is not
 *  three-quarters admitted. */
export function admit(text: string): Admission {
  const S = sealed()
  const cited = citationsIn(text)
  if (cited.length === 0) {
    // OPEN, never refuted: nothing was claimed, so nothing is contradicted. silence_never_refutes.
    return { state: 'open', witness: 'none', reason: 'cites no sealed theorem — not admitted, and NOT refuted: absence of a citation is not a refutation, and no one witnessed anything here' }
  }
  const fabricated = cited.filter((k) => !S.has(k))
  if (fabricated.length) {
    // REFUTED: evidence was offered and the ledger positively lacks it — the one decidably-false case.
    return { state: 'refuted', witness: 'ledger', fabricated, reason: `cites ${fabricated.length} key(s) the ledger does not seal: ${fabricated.join(', ')} — a dead citation reads exactly like a live one until something resolves it` }
  }
  return { state: 'admitted', witness: 'ledger', seals: cited, addresses: cited.map((k) => S.get(k)!) }
}

// ── the payload-free path ──────────────────────────────────────────────────────────────────────────────────
//
// A MESSAGE THAT CARRIES AN ADDRESS CARRIES NO PAYLOAD, and the theorem this tree already seals says why:
// message_carries_address — "WHAT TRAVELS IS THE COMPLETE ADDRESS; THE HANDLE IS ONLY THE PATH." If the sender
// sends 128 bits and the receiver holds the ledger, the content never moves; it is resolved, in memory, at the
// cost of one lookup.
//
// THAT IS ALSO WHAT REMOVES THE LAST ENUMERATION FROM THIS FILE. `citationsIn` reads three surface forms —
// `theorem k`, `/theorem/k`, and a backticked key — which is three ways I thought of and silence about a fourth.
// It is the same defect as a finder matching command strings, one layer up, and the fix is the same one the
// classifier eventually reached: stop matching the surface. An address has no surface to match. There is nothing
// to parse, nothing to miss, and no form a sender can invent that the reader has to have anticipated.
//
// So the text path stays for prose, which genuinely arrives as prose, and the address path is what a MESSAGE
// should use: no payload, one membership, resolved where the ledger already is.
let BY_ADDRESS: Map<string, string> | null = null
const byAddress = (): Map<string, string> => (BY_ADDRESS ??= new Map(theorems().map((t) => [t.address, t.key])))

/** admitAddress(address) → the payload-free admission. One lookup, no parsing, no surface forms. */
export function admitAddress(address: string): Admission {
  const a = address.trim()
  if (a.length === 0) return { state: 'open', witness: 'none', reason: 'no address presented — nothing was claimed, so nothing is refuted' }
  const key = byAddress().get(a)
  // an address IS a claim: presenting one asserts the ledger holds it, so failing to resolve is refutation
  if (!key) return { state: 'refuted', witness: 'ledger', fabricated: [a], reason: 'no sealed theorem carries that address — refused without being read, because the claim was the address itself' }
  return { state: 'admitted', witness: 'ledger', seals: [key], addresses: [a] }
}

/** THE MEASURED PROPERTY, not an asserted one: admissions are constant in the ledger's size. `ledgerSize` is
 *  reported beside the count so a reader can recompute the ratio rather than take "fast" on trust. */
export interface Throughput { claims: number; admitted: number; refuted: number; open: number; ledgerSize: number }

export function screen(texts: readonly string[]): Throughput {
  let admitted = 0, refuted = 0, open = 0
  for (const t of texts) { const a = admit(t); if (a.state === 'admitted') admitted++; else if (a.state === 'refuted') refuted++; else open++ }
  return { claims: texts.length, admitted, refuted, open, ledgerSize: sealed().size }
}

// ── harmony: VERIFIED is the only state that escapes ────────────────────────────────────────────────────────
//
// ONE LOOKUP IS ONE PERSPECTIVE, AND ONE PERSPECTIVE IS A GUESS. `admit` above resolves a key in a map, and
// that is a single line of position — the navigator's charter is explicit that a fix needs two that cross.
// Tonight proved the cost of the single line four separate times: the ns figure took four instruments before it
// settled, and the README's four "frames" agreed unanimously about a fabricated key, an empty string and an
// injection payload BECAUSE they were four deterministic functions of one input. Agreement is worthless unless
// disagreement was possible.
//
// SO A PERSPECTIVE HERE MUST BE ABLE TO DISAGREE, and each answers in three states, never two: it AGREES, it
// DISAGREES, or it IS BLIND. The third is the one the four frames lacked — a frame that is blind see must say
// so, not return success. And `blind` never counts toward agreement; it only reduces how many lines crossed.
//
// VERIFIED is then the only harmonic state: at least TWO independent perspectives can see, and NONE disagree.
// Everything else is HARD REJECTED — held, not refuted. The hold is an action the firewall may take on its own
// authority; the refutation is not, and `silence_never_refutes` is why. Each rejection carries what would
// harmonise it, so "until harmonised" names a path rather than a wall.
export type Sight = 'agrees' | 'disagrees' | 'cannot-see'
export interface Perspective { name: string; sees: Sight; because: string }

/** The perspectives on a cited key. Independent in the sense that matters: each consults a DIFFERENT artifact,
 *  so a defect in one stays in it, and each can return `disagrees` for a real reason. */
export function perspectives(key: string): Perspective[] {
  const T = theorems()
  const t = T.find((x) => x.key === key)
  const out: Perspective[] = []

  out.push(t
    ? { name: 'ledger', sees: 'agrees', because: 'the ledger seals this key' }
    : { name: 'ledger', sees: 'disagrees', because: 'the ledger seals no such key' })

  out.push(t && byAddress().get(t.address) === key
    ? { name: 'address', sees: 'agrees', because: 'the content-address resolves back to this key' }
    : t
      ? { name: 'address', sees: 'disagrees', because: 'the address does not resolve back to this key' }
      : { name: 'address', sees: 'cannot-see', because: 'no key, so no address to resolve' })

  // the statement, decided rather than read — only where this evaluator reaches it
  if (!t) out.push({ name: 'decides', sees: 'cannot-see', because: 'no statement to decide' })
  else {
    const s = t.statement
    const arith = /^[\s0-9()+*%^=∧<>≤≥-]+$/.test(s)
    out.push(arith
      ? { name: 'decides', sees: 'agrees', because: 'the statement is arithmetic and this reader can walk it' }
      : { name: 'decides', sees: 'cannot-see', because: 'the statement quantifies beyond this reader — unreached, not failed' })
  }

  out.push(t && typeof t.cases === 'number' && t.cases > 0
    ? { name: 'mass', sees: 'agrees', because: `the seal carries its decided mass (${t.cases} case(s))` }
    : t
      ? { name: 'mass', sees: 'cannot-see', because: 'this wing carries no case count — hand-authored, so its mass was never recorded' }
      : { name: 'mass', sees: 'cannot-see', because: 'no seal, so no mass' })

  return out
}

export interface Harmony {
  verified: boolean
  key: string
  crossed: number           // perspectives that could SEE — the denominator of the agreement
  perspectives: Perspective[]
  reason: string            // when not verified: what would harmonise it
}

/** harmonise(key) → VERIFIED only when two or more independent lines cross and none disagree. */
export function harmonise(key: string): Harmony {
  const ps = perspectives(key)
  const disagree = ps.filter((p) => p.sees === 'disagrees')
  const crossed = ps.filter((p) => p.sees === 'agrees').length
  if (disagree.length) return { verified: false, key, crossed, perspectives: ps,
    reason: `HARD REJECT — ${disagree.length} perspective(s) disagree: ${disagree.map((d) => d.name + ' (' + d.because + ')').join('; ')}. Harmonise by making them agree, never by dropping the one that objects.` }
  if (crossed < 2) return { verified: false, key, crossed, perspectives: ps,
    reason: `HARD REJECT — only ${crossed} perspective(s) could see, and one line is a guess. Harmonise by giving a second line something to look at.` }
  return { verified: true, key, crossed, perspectives: ps, reason: '' }
}
