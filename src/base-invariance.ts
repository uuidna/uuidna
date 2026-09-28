// base-invariance — A CLAIM THAT DIES IN ANOTHER BASE IS A CLAIM ABOUT NOTATION, and must say so.
//
// The captain, 2026-09-28, after research refuted a bridge I had reported as fact: "do the guard first".
//
// WHAT WENT WRONG, MEASURED. I told the captain that Song, Anthem and Referrer sharing 142857 and 999999 was a real
// entanglement — "music's period structure is the repunit structure of base-10 division by 7". It is not, and one line
// settles it: the multiplicative order of 8 mod 7 is 1, so in base eight 1/7 = 0.111… and there is no cyclic number at
// all. 142857 exists only because ten happens to be a primitive root mod seven. Nothing about a musical scale changes
// when you write numbers in octal, so a notation-dependent quantity cannot be the cause of a notation-independent one.
// The derivation fails at its first step, and no amount of sealed arithmetic downstream repairs it.
//
// THE LEDGER HAD NO TEST FOR THIS. It has a padding detector (a conjunct true whatever its numerals), a vacuity
// detector, an impossibility guard, a determinism scan. None of them looks at whether a statement's truth depends on
// the base its numerals are written in, so three wings inherited one esoteric doctrine — Gurdjieff's Law of Seven maps
// 1/7's digits onto the musical octave — and the kernel sealed the arithmetic each time without objection. `by decide`
// cannot catch this: the arithmetic IS true. What is false is the claim the key makes about what the arithmetic means.
//
// SO THE TEST IS SUBSTITUTION OF THE BASE, which is exactly how the padding detector works and for the same reason. A
// base-10 ARTEFACT is a numeral that is a function of ten: a power of ten, a repdigit of nines (10^k − 1), or a cyclic
// number (10^(p−1) − 1)/p. Replace each with its analogue in another base — 8^k, 8^k − 1, (8^(p−1) − 1)/p — and ask the
// evaluator again. A statement that held in ten and fails in eight is a fact about decimal writing.
//
// A FLAGGED STATEMENT IS NOT FALSE AND MUST NOT BE DELETED. Midy's theorem — that the halves of 1/7's period sum to all
// nines — is a genuine theorem ABOUT notation, and it knows that about itself. So is casting out nines, which works
// because 10 ≡ 1 (mod 9) and becomes casting out sevens in base eight. Those belong in the ledger. What the guard
// demands is that they DECLARE the dependency, so a reader cannot mistake a fact about decimal for a fact about music,
// physics or the world. The fix is a word in the key or the prose, never a deletion.
//
// WHAT THIS DOES NOT CATCH, stated so nobody trusts it too far. It tests the numerals a statement writes, so it cannot
// see a base-10 assumption carried in a wing definition it does not expand, and it cannot judge a claim whose base
// dependence is in the PROSE rather than the arithmetic — `song_notes_are_units` is a digit coincidence the arithmetic
// makes true in any base. Those remain a reader's job. This closes one class, exactly, and says which.

/** how a numeral can be a function of the base it is written in */
export type ArtefactKind = 'power' | 'nines' | 'cyclic'

export interface Artefact {
  kind: ArtefactKind
  /** the numeral as it appears in the statement */
  numeral: string
  /** the exponent for a power or a repdigit; the prime for a cyclic number */
  at: number
}

/** 10, 100, 1000 … — a power of the base, and nothing else */
const powerOfTen = (v: bigint): number | null => {
  if (v < 10n) return null
  let k = 0
  let x = v
  while (x % 10n === 0n) { x /= 10n; k += 1 }
  return x === 1n ? k : null
}

/** 9, 99, 999 … — one less than a power of the base */
const ninesOf = (v: bigint): number | null => {
  if (v < 9n) return null
  const k = powerOfTen(v + 1n)
  return k === null ? null : k
}

/**
 * (10^(p−1) − 1)/p for a prime p where ten is a primitive root — 142857 for 7, 0588235294117647 for 17.
 *
 * Bounded at p < 64 because the cyclic numbers grow as fast as 10^p and a ledger numeral beyond that is not one; the
 * bound is stated rather than silent so a miss is a known miss.
 */
const cyclicOf = (v: bigint): number | null => {
  for (let p = 7; p < 64; p += 2) {
    const bp = BigInt(p)
    if (10n ** BigInt(p - 1) % bp !== 1n) continue
    if ((10n ** BigInt(p - 1) - 1n) / bp === v) return p
  }
  return null
}

/** every base-10 artefact a numeral can be — at most one kind, checked in order of specificity */
export function artefactOf(numeral: string): Artefact | null {
  if (!/^\d+$/.test(numeral)) return null
  let v: bigint
  try { v = BigInt(numeral) } catch { return null }
  const nines = ninesOf(v)
  if (nines !== null) return { kind: 'nines', numeral, at: nines }
  const power = powerOfTen(v)
  if (power !== null) return { kind: 'power', numeral, at: power }
  const cyclic = cyclicOf(v)
  if (cyclic !== null) return { kind: 'cyclic', numeral, at: cyclic }
  return null
}

/** the same artefact written in another base — the substitution the test turns on */
export function inBase(a: Artefact, base: number): string | null {
  const b = BigInt(base)
  if (a.kind === 'power') return String(b ** BigInt(a.at))
  if (a.kind === 'nines') return String(b ** BigInt(a.at) - 1n)
  // a cyclic number exists in base b only when b is a primitive root mod p; when it is not, there IS no analogue and
  // that absence is itself the finding — 1/7 in base eight has period one.
  const p = BigInt(a.at)
  if (b % p === 0n) return null
  let order = 1
  let x = b % p
  while (x !== 1n) { x = (x * b) % p; order += 1 }
  if (order !== a.at - 1) return null
  return String((b ** BigInt(a.at - 1) - 1n) / p)
}

export interface Restatement {
  base: number
  statement: string
  /** the substitutions made, so a reader can check the rewrite rather than trust it */
  swapped: { from: string; to: string; kind: ArtefactKind }[]
  /** an artefact with NO analogue in this base — the sharpest possible evidence of base dependence */
  absent: Artefact[]
}

/**
 * Rewrite a statement's base-10 artefacts into another base.
 *
 * Longest numeral first, so rewriting 999999 cannot be corrupted by an earlier rewrite of 9 inside it — a shorter-first
 * pass produces nonsense that then "fails" in the new base for the wrong reason, which would manufacture findings.
 */
export function restate(statement: string, base: number): Restatement {
  const numerals = [...new Set(statement.match(/\b\d+\b/g) ?? [])]
    .sort((a, b) => b.length - a.length || b.localeCompare(a))
  let out = statement
  const swapped: Restatement['swapped'] = []
  const absent: Artefact[] = []
  for (const n of numerals) {
    const a = artefactOf(n)
    if (a === null) continue
    const to = inBase(a, base)
    if (to === null) { absent.push(a); continue }
    if (to === n) continue
    out = out.split(n).join(to)
    swapped.push({ from: n, to, kind: a.kind })
  }
  return { base, statement: out, swapped, absent }
}

export interface BaseVerdict {
  key: string
  file: string
  /**
   * 'invariant' survived every base tried; 'notational' held in ten and failed elsewhere on an UNAMBIGUOUS artefact;
   * 'suspect' failed only on a one-digit artefact, which cannot carry the verdict alone; 'unread' undecidable.
   */
  verdict: 'invariant' | 'notational' | 'declared' | 'suspect' | 'unread' | 'no-artefact'
  /** the bases where it failed, with what was swapped */
  failedIn: Restatement[]
  why: string
}

/**
 * Ask one sealed statement whether its truth survives a change of base.
 *
 * `decide` is injected: the evaluator is the boundary's business and a test must be able to hand this a decision
 * function it controls. A statement the evaluator cannot read is `unread` — never `invariant`, because an undecided
 * restatement is a fact about the reader and reporting it as survival is the vacuous pass this tree refuses.
 */
export function baseVerdictOf(
  row: { key: string; file: string; statement: string },
  decide: (statement: string) => boolean | null,
  bases: readonly number[] = [8, 12, 16],
  /**
   * Whether the row's own prose DECLARES the base dependency.
   *
   * Without this the guard is unfalsifiable as a work list: it tests statements, so annotating prose could never clear
   * a finding and "fix the twelve" would have no measurable end. A notational statement that says it is about decimal
   * writing has done the only thing asked of it, and the census must be able to see that it did.
   */
  declares = false,
): BaseVerdict {
  const artefacts = [...new Set(row.statement.match(/\b\d+\b/g) ?? [])]
    .map((n) => artefactOf(n))
    .filter((a): a is Artefact => a !== null)
  if (artefacts.length === 0) {
    return { key: row.key, file: row.file, verdict: 'no-artefact', failedIn: [],
      why: 'no numeral in it is a function of ten, so there is nothing for a change of base to move' }
  }
  if (decide(row.statement) !== true) {
    return { key: row.key, file: row.file, verdict: 'unread', failedIn: [],
      why: 'the evaluator cannot decide the sealed statement itself, so a restatement would compare two unknowns' }
  }
  const failedIn: Restatement[] = []
  let unread = false
  for (const base of bases) {
    const r = restate(row.statement, base)
    if (r.absent.length > 0) { failedIn.push(r); continue }
    if (r.swapped.length === 0) continue
    const held = decide(r.statement)
    if (held === null) { unread = true; continue }
    if (held === false) failedIn.push(r)
  }
  // AN ARTEFACT AT EXPONENT ONE IS AMBIGUOUS AND CANNOT CONVICT, and the criterion is the EXPONENT rather than the digit
  // count — which is the correction. `9` is both 10^1 − 1 and the number nine; `10` is both the base and the number ten,
  // and `1 + 2 + 3 + 4 = 10` is plainly about ten. My first cut convicted on any numeral of two digits or more, which let
  // `10` through and flagged a Symphony theorem whose 10 is a SUM. Exponent one is exactly the ambiguous case: the base
  // itself, and the base less one. Anything at exponent two or above — 99, 1000, 999999 — is unambiguous.
  //
  // A CORRELATED BOUND LEFT UNREWRITTEN BREAKS A STATEMENT FOR THE WRONG REASON, and that is the second correction.
  // `(List.range 11).all (fun d => 10 - (10 - d) == d)` is true for ANY base — b − (b − d) = d — and failed only because
  // 10 was rewritten while the range bound 11 was not. A rewritten artefact whose neighbour (n ± 1) also appears
  // unrewritten in the statement means the rewrite was partial, so the failure is the guard's and not the statement's.
  const partial = (f: Restatement): boolean =>
    f.swapped.some((sw) => {
      const n = BigInt(sw.from)
      return new RegExp(`\\b(?:${n + 1n}|${n - 1n})\\b`).test(row.statement)
        && !f.swapped.some((o) => o.from === String(n + 1n) || o.from === String(n - 1n))
    })
  const conclusive = failedIn.filter((f) =>
    !partial(f)
    && (f.absent.some((a) => a.at >= 2) || f.swapped.some((sw) => (artefactOf(sw.from)?.at ?? 0) >= 2)))
  if (conclusive.length > 0 && declares) {
    return { key: row.key, file: row.file, verdict: 'declared', failedIn: conclusive,
      why: 'holds in base ten and fails elsewhere, AND its own prose says so — a true claim about decimal writing that '
        + 'declares itself, which is all the guard asks. Midy\'s theorem is this case' }
  }
  if (conclusive.length > 0) {
    return { key: row.key, file: row.file, verdict: 'notational', failedIn: conclusive,
      why: `holds in base ten and fails in ${conclusive.map((f) => f.base).join(', ')} on a multi-digit artefact — a `
        + 'true claim about decimal writing, which must SAY so in its key or its prose rather than read as a claim '
        + 'about its subject' }
  }
  if (failedIn.length > 0) {
    return { key: row.key, file: row.file, verdict: 'suspect', failedIn,
      why: 'fails in another base only on an artefact at exponent one (9 becoming 7, or 10 becoming 8), or because a '
        + 'correlated bound was left unrewritten. Exponent one is ambiguous — 9 is both ten-less-one and the number '
        + 'nine — and a partial rewrite breaks a statement for the guard\'s reason rather than its own. A reader decides' }
  }
  if (unread) {
    return { key: row.key, file: row.file, verdict: 'unread', failedIn: [],
      why: 'the restatement was not decidable, and an undecided restatement is not survival' }
  }
  return { key: row.key, file: row.file, verdict: 'invariant', failedIn: [],
    why: 'carries a base-ten artefact and still holds when it is rewritten in every base tried' }
}

export interface BaseCensus {
  asked: number
  invariant: number
  notational: number
  /** notational AND declaring it — the cleared state */
  declared: number
  /** failed only on an exponent-one artefact or a partial rewrite — a reader's call, not the guard's */
  suspect: number
  unread: number
  noArtefact: number
  /** the notational ones, which are the work list */
  notationalKeys: string[]
}

export function baseCensus(verdicts: readonly BaseVerdict[]): BaseCensus {
  return {
    asked: verdicts.length,
    invariant: verdicts.filter((v) => v.verdict === 'invariant').length,
    notational: verdicts.filter((v) => v.verdict === 'notational').length,
    declared: verdicts.filter((v) => v.verdict === 'declared').length,
    suspect: verdicts.filter((v) => v.verdict === 'suspect').length,
    unread: verdicts.filter((v) => v.verdict === 'unread').length,
    noArtefact: verdicts.filter((v) => v.verdict === 'no-artefact').length,
    notationalKeys: verdicts.filter((v) => v.verdict === 'notational').map((v) => v.key).sort(),
  }
}
