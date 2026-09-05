// hex-line-css — THE 768 LINE ATTRIBUTES ARE POSITION, AND CSS ALREADY KNOWS POSITION.
//
// MEASURED ON THE BUILT SITE. Every theorem page shipped 768 `<span class="hex-line" data-yang="0|1">`
// elements — 46,080 bytes, 28 percent of the page, against 11,746 bytes of visible text. Across 5,606 pages that
// is about 246 MEGABYTES. And the bits carry NO page-specific information whatsoever: the component computed
// them as `(i >> b) & 1`, the LSB-first binary expansion of each gate's own index, so the same 768 values appear
// on every page of the site. Verified directly rather than reasoned about — the bit string extracted from two
// different theorem pages in the built dist is byte-identical.
//
// A span whose only attribute is the binary expansion of its own position is a span describing where it already
// is. CSS reads position with `:nth-child`, so the attribute can go and the styling can be derived instead.
//
// THE ARITHMETIC. Line b (zero-based) of gate i is YANG iff bit b of i is set. A gate is the (i+1)-th child of
// the board and a line the (b+1)-th child of its gate, so with n = i + 1 the condition is on (n-1) mod 2^(b+1):
// set iff that residue is at least 2^b. Each bit therefore needs 2^b `:nth-child(2^(b+1) n + k)` clauses, and
// 1 + 2 + 4 + 8 + 16 + 32 = 63 clauses cover all six lines — about 3 KB of stylesheet, shipped ONCE, replacing
// 46 KB of markup on every page. The generator below emits them and the test checks every one of the 128 x 6
// cases against `(i >> b) & 1`, because a selector that is subtly wrong changes the face silently.

// WHY THE SPANS THEMSELVES STAY, measured and decided rather than left as an obvious next step. After the
// attributes came off, 768 bare spans remained at roughly 16 KB a page — another 86 MB across the site — and
// painting the six lines from the gate's own background instead would remove them entirely. It was not done, and
// the reason is layout rather than effort: the gate is a square with `flex-direction: column-reverse` and
// `justify-content: space-evenly`, which positions six 2px bars correctly at ANY rendered size, and the board is
// a responsive grid. A background-image equivalent needs percentage colour stops, so the bar positions would
// become a function of the gate's rendered height and drift at viewport widths the flex version handles exactly.
//
// So the trade is 86 MB against responsive correctness, and correctness wins. The distinction worth keeping is
// that the 46 KB removed above was PURE WASTE — attributes stating the binary expansion of their own position,
// identical on every page — while what remains is elements doing real layout work. The two look alike in a byte
// count and are not alike at all.

// THE FOLD, 63 SELECTORS TO 21 (2026-09-05). The set "bit b of the position is set" has TWO exact descriptions,
// and they are duals under bit-reversal of the index: 2^b arithmetic progressions of stride 2^(b+1), or 2^(6-b)
// CONTIGUOUS RUNS of length 2^b. Where one is cheap the other is expensive, and they cross between line 4 and
// line 5 — so paying stride cost for all six lines, as this generator first did, is optimal for the low lines
// and eight times too expensive for the high ones. Line 6 shipped 32 clauses for a set that is two ranges:
// positions 33-64 and 97-128. Taking the cheaper dual per line costs 1+2+4+8+4+2 = 21 selectors against
// 1+2+4+8+16+32 = 63, paints identically on all 128 x 6 cases, and the stylesheet fell 4246 bytes to 2384.
//
// NOTHING IN THE DOM MOVED, and that is the honest limit of this fold. The 768 bare spans still ship on every
// page for the reason stated above — they do real layout work — so this is kilobytes once, not the 86 MB that
// would need the spans gone. A saving named for the wrong quantity is the same defect as a ceiling on the wrong
// quantity.

/** How many lines a hexagram has. Mirrored as a plain number so this module stays free of a cycle. */
export const HEX_LINES = 6

/** yangAt(gate, line) → is that line solid? The ONE definition, and the component's own former expression. */
export const yangAt = (gate: number, line: number): boolean => ((gate >> line) & 1) === 1

/** nthClausesForBit(b) → the `An+B` pairs selecting every gate position whose bit b is SET.
 *
 *  With n one-based, gate i = n - 1, and bit b of i is set exactly when (n-1) mod 2^(b+1) >= 2^b. Enumerating
 *  those residues gives 2^b arithmetic progressions of stride 2^(b+1). */
export function nthClausesForBit(b: number): { stride: number; offset: number }[] {
  const stride = 1 << (b + 1)
  const half = 1 << b
  const out: { stride: number; offset: number }[] = []
  for (let r = half; r < stride; r++) {
    // residue r of (n-1) means n ≡ r+1 (mod stride); nth-child(An+B) uses B in 1..A
    const offset = ((r + 1) % stride) === 0 ? stride : (r + 1) % stride
    out.push({ stride, offset })
  }
  return out
}

/** matchesNth(n, stride, offset) → does `:nth-child(stride n + offset)` select the n-th child?
 *  CSS counts n from 0 upward, so the clause selects positions offset, offset+stride, offset+2*stride, … */
export const matchesNth = (n: number, stride: number, offset: number): boolean =>
  n >= offset && (n - offset) % stride === 0

/** runsForBit(b, gates) → the CONTIGUOUS one-based position ranges whose bit b is set.
 *
 *  THE SAME SET, DESCRIBED THE OTHER WAY. "Bit b of the position is set" is simultaneously a stride cover
 *  (2^b arithmetic progressions of stride 2^(b+1)) and a run cover (2^(6-b) contiguous blocks of length 2^b),
 *  and the two descriptions are duals under bit-reversal of the position index: the cheap end of one is the
 *  expensive end of the other. The generator paid stride cost for all six lines, which is optimal for the low
 *  lines and eight times too expensive for the high ones — line 6 shipped 32 clauses where the same set is two
 *  ranges. Enumerated rather than derived in closed form because a board length that is not a multiple of
 *  2^(b+1) clips the last run, and an off-by-one here paints the wrong line on every page of the site. */
export function runsForBit(b: number, gates: number): { from: number; to: number }[] {
  const out: { from: number; to: number }[] = []
  let from = 0
  for (let n = 1; n <= gates; n++) {
    const on = yangAt(n - 1, b)
    if (on && from === 0) from = n
    if (!on && from !== 0) { out.push({ from, to: n - 1 }); from = 0 }
  }
  if (from !== 0) out.push({ from, to: gates })
  return out
}

/** The cover a line is painted with — whichever of the two duals costs fewer selectors. */
export type Cover =
  | { kind: 'stride'; clauses: { stride: number; offset: number }[] }
  | { kind: 'runs'; runs: { from: number; to: number }[] }

/** coverForBit(b, gates) → the cheaper of the two equivalent descriptions, counted in selectors.
 *
 *  A TIE GOES TO THE STRIDE. At line 4 both covers cost eight, and the stride form is the one the ledger's
 *  arithmetic already speaks — `(i >> b) & 1` reads straight off it — so the tie-break keeps the reading that
 *  needs no second explanation rather than the one that happens to be newer. */
export function coverForBit(b: number, gates: number): Cover {
  const clauses = nthClausesForBit(b).filter((c) => c.offset <= gates)
  const runs = runsForBit(b, gates)
  return runs.length < clauses.length ? { kind: 'runs', runs } : { kind: 'stride', clauses }
}

/** coverSelectors(cover) → how many selectors this cover ships. */
export const coverSelectors = (cover: Cover): number =>
  cover.kind === 'runs' ? cover.runs.length : cover.clauses.length

/** selectedByBit(gate, b, gates) → does the EMITTED cover for bit b select this gate's position?
 *  It evaluates whichever cover the generator chose, so the 128 x 6 check tests what actually ships. */
export function selectedByBit(gate: number, b: number, gates = 128): boolean {
  const n = gate + 1
  const cover = coverForBit(b, gates)
  return cover.kind === 'runs'
    ? cover.runs.some((r) => n >= r.from && n <= r.to)
    : cover.clauses.some((c) => matchesNth(n, c.stride, c.offset))
}

/** hexLineCss(gates) → the stylesheet block: default yin, with the derived YANG overrides.
 *
 *  Default-yin and override-yang is the inverse of what the component had (default solid, `[data-yang="0"]`
 *  broken). It is inverted deliberately: the override set is what the generator can prove correct, so the
 *  proven half is the half that paints, and a missing clause shows as a visibly broken line rather than a
 *  silently solid one. A wrong selector must be visible. */
export function hexLineCss(gates = 128): string {
  const lines: string[] = []
  lines.push('/* GENERATED by src/hex-line-css.ts — do not hand-edit.')
  lines.push(' * The line values are the binary expansion of each gate\'s own position, so they are derived from')
  lines.push(' * :nth-child rather than shipped as 768 per-line attributes on every page (about 246 MB across the')
  lines.push(' * site). Default is YIN (broken); the clauses below paint the YANG lines. */')
  lines.push('.hex-gate > span {')
  lines.push('  display: block;')
  lines.push('  height: 2px;')
  lines.push('  background: linear-gradient(90deg, var(--face-aura) 38%, transparent 38%, transparent 62%, var(--face-aura) 62%);')
  lines.push('}')
  for (let b = 0; b < HEX_LINES; b++) {
    const cover = coverForBit(b, gates)
    const sel = (cover.kind === 'runs'
      ? cover.runs.map((r) => `.hex-board > :nth-child(n + ${r.from}):nth-child(-n + ${r.to}) > :nth-child(${b + 1})`)
      : cover.clauses.map((c) => `.hex-board > :nth-child(${c.stride}n + ${c.offset}) > :nth-child(${b + 1})`)
    ).join(',\n')
    if (!sel) continue
    lines.push(`/* line ${b + 1}: yang where bit ${b} of the gate index is set — ${cover.kind} cover, ${coverSelectors(cover)} selector(s) */`)
    lines.push(`${sel} {`)
    lines.push('  background: var(--face-aura);')
    lines.push('}')
  }
  return lines.join('\n')
}
