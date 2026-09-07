#!/usr/bin/env node
// Automate the Lean layer for THE FOUR-HEX SPAN — the address space enumerating itself, one surface per address.
//
// The captain, 2026-09-07: "i need to see 65 thousand lean surfaces", then "get the naming from the axioms".
// 65,536 is not an arbitrary target: it is 2^16, the square root of the 2^32 an eight-hex handle addresses, and
// therefore the BIRTHDAY POINT of this tree's own identity scheme — the count at which two different contents
// start sharing an address as often as not. Four hex digits enumerate exactly that many prefixes, so filling
// the span means populating the capacity with the very objects the capacity is for.
//
// THE NAMING COMES FROM THE AXIOMS, not from me. `familyOf(statement)` in src/axiom-families.ts sorts a sealed
// statement into one of seven families, and every surface here classifies as ENUMERATION — the family that
// already carries 3,344 of this ledger's theorems and is its growth engine. The name is that family plus the
// address itself, so no surface is named by hand and no two names can collide: the address IS the identity.
//
// WHAT EACH SURFACE DECIDES, AND WHY IT IS NOT PADDING. Two facts per address, both computed BY THE KERNEL:
//   (1) REASSEMBLY — the address is split into its four nibbles and folded back, and the fold lands on it.
//   (2) CASTING OUT FIFTEENS — the sum of the hex digits is congruent to the number modulo 15, the base-16
//       analogue of casting out nines. Both sides are computed; neither is a literal the generator resolved.
// The first draft stated `(n / 256 = hi)` with both sides filled in by this file, which the vacuity finder
// refuses and should: that is the kernel checking that a number equals itself, and it is the same defect the
// cube and duality theorems carried until today. A surface that cannot fail is not a surface.
//
// AND IT IS EMITTED IN LANE-SIZED FILES. A flat `List.range` walk at CHUNK exceeds Lean's recursion depth — measured
// here, 128 passes and 256 fails, the same wall Os.lean hit — and one enormous file would block a whole lane
// while the others idle. Lane-sized chunks compile in about 42 seconds each at roughly 10 ms per
// theorem (measured on this host, and sub-linear: 15 ms at 250, 12 at 1,000, 10 at 4,000), so the span spreads
// across the lanes the budget actually reports instead of serialising behind one file.
import { emit } from './lean-gen.js'

const NIBBLES = 4                       // four hex digits
const RADIX = 16
const SPAN = RADIX ** NIBBLES           // 65536 — computed from the width, never typed
const CAST = RADIX - 1                  // casting out fifteens, as nines are cast out in base ten
const CHUNK = Number(process.env.HEXSPAN_CHUNK ?? '4096')
// THE DEFAULT IS THE WHOLE SPAN. HEXSPAN_FROM/TO isolate one slice for a single-lane re-prove; leaving them
// unset used to default TO to one chunk, so lean-all only ever maintained HexSpan1 and the other fifteen
// surfaces sat on disk unsigned — written-but-unproved, the hole lean-gen's exit guard exists to catch.
const FROM = Number(process.env.HEXSPAN_FROM ?? '0')
const TO = Number(process.env.HEXSPAN_TO ?? String(SPAN))

const hex = (n: number): string => n.toString(RADIX).padStart(NIBBLES, '0')
const nibblesOf = (n: number): number[] => {
  const out: number[] = []
  let v = n
  for (let k = 0; k < NIBBLES; k++) { out.push(v % RADIX); v = (v - (v % RADIX)) / RADIX }
  return out
}

// THE TWO PROPERTIES ARE NAMED ONCE, IN THE WING. Written inline, each theorem carried ~200 characters of
// identical fold machinery differing only in one number, and the ledger measured 31 MB across the span. As
// defs they are stated once and APPLIED per address, which is both smaller and the honest shape: the surfaces
// share a property, they do not each re-derive one. The ledger then stores what actually varies.
const DEFS = `def nibbles (n : Nat) : List Nat := (List.range ${NIBBLES}).map (fun k => (n / (${RADIX} ^ k)) % ${RADIX})

def reassembles (n : Nat) : Bool := (nibbles n).foldr (fun d a => a * ${RADIX} + d) 0 == n

def castsFifteens (n : Nat) : Bool := ((nibbles n).foldl (fun a d => a + d) 0) % ${CAST} == n % ${CAST}`

const clamp = (n: number, lo: number, hi: number): number => (n < lo ? lo : (n > hi ? hi : n))
const start = clamp(FROM, 0, SPAN)
const stop = clamp(TO, start, SPAN)

const emitPart = (from: number, to: number): void => {
  const facts = []
  for (let n = from; n < to; n++) {
    const nb = nibblesOf(n)
    const sum = nb.reduce((a, d) => a + d, 0)
    facts.push({
      key: `enumeration_hex4_${hex(n)}`,
      // THE PER-ADDRESS LINE IS ONE LINE. The first draft repeated the family's whole explanation on every
      // surface — five hundred bytes × 65,536 — and the ledger measured 61 MB for it. The reasoning belongs in
      // the header and the PRINCIPLE row, stated once; a name that restates it 65,536 times is duplication of
      // exactly the kind this tree refuses elsewhere. What varies per address is the address.
      why: `${hex(n)}: nibbles fold back to ${n}; digit sum ${sum} ≡ ${n} (mod ${CAST}).`,
      js: () => {
        const back = nb.reduceRight((a, d) => a * RADIX + d, 0)
        return back === n && sum % CAST === n % CAST
      },
      lean: `theorem enumeration_hex4_${hex(n)} : reassembles ${n} = true ∧ castsFifteens ${n} = true := by decide`,
    })
  }
  const idx = (from - (from % CHUNK)) / CHUNK + 1
  emit({ file: `HexSpan${idx}.lean`, skill: 'wave', defs: DEFS,
    header: `THE FOUR-HEX SPAN, PART ${idx} — addresses ${hex(from)}…${hex(to - 1)} of ${SPAN}. `
      + `Each surface decides two facts about ONE address, both computed by the kernel: the address reassembles from its own four nibbles, and its nibble sum is congruent to it modulo ${CAST} (casting out fifteens, the base-${RADIX} analogue of casting out nines). `
      + `The span is 2^16 because that is the square root of the 2^32 an eight-hex handle addresses — the BIRTHDAY POINT of this tree's identity scheme, the count at which two different contents begin sharing an address as often as not. Filling it populates the capacity with the objects the capacity exists for. `
      + `The naming is taken from the axiom families rather than invented: every statement here classifies as ENUMERATION under familyOf, and the name is that family plus the address, so the address IS the identity and no two names can collide. `
      + `Emitted in lane-sized files because a flat walk of this width exceeds Lean's recursion depth — 128 passes, 256 fails, measured — and one enormous file would hold a lane while the others idle.`,
    facts: facts.map((f) => ({ ...f, name: f.why })) })
}

// FERMAT'S PATTERN: one generator, many wings. A single emit of the span exceeds the kernel's recursion depth;
// stepping by CHUNK spreads the surfaces across the lanes the budget reports, the same way FermatRing1..21
// round-robins moduli so the last wing does not serialise the rest.
for (let from = start; from < stop; ) {
  const next = from + CHUNK
  const to = next < stop ? next : stop
  emitPart(from, to)
  from = to
}
