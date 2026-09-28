// entanglement — A BRIDGE IS A RARE QUANTITY WITH MORE THAN ONE CARRIER, computed in one walk.
//
// Extracted from scripts/entanglement-map so the CODATA proving door shares the rule rather than restating it. A
// duplicated criterion is a criterion that drifts: two doors would disagree about what a bridge is within a week, and
// the disagreement would be invisible because each would look self-consistent.

export interface Bridge {
  value: string
  /** every wing carrying it, file suffix stripped */
  wings: string[]
  /** how many distinct wing FAMILIES carry it — an enumerated family counts once */
  families: number
}

/**
 * AN ENUMERATED FAMILY IS ONE CARRIER, NOT SIXTEEN. HexSpan1..16 and EquilibriumXor1..64 are one wing split across
 * files by a generator, so counting them separately makes every integer they hold look widely shared and drowns the
 * real bridges in one generator's arithmetic.
 */
export const familyOf = (wing: string): string => wing.replace(/\.lean$/, '').replace(/\d+$/, '')

/**
 * Every quantity shared by at least two and at most `maxFamilies` wing families.
 *
 * The upper bound is what separates a bridge from a counting number: two wings sharing 1616255 is a bridge, and
 * seventy-seven wings sharing 4 is arithmetic. Ranked by family count ascending, so the sharpest come first.
 */
export function bridges(
  rows: readonly { file: string; numerals: readonly string[] }[],
  maxFamilies = 4,
): Bridge[] {
  const carriers = new Map<string, Set<string>>()
  for (const row of rows) {
    const wing = String(row.file).replace(/\.lean$/, '')
    for (const v of row.numerals) {
      const s = carriers.get(v) ?? new Set<string>()
      s.add(wing)
      carriers.set(v, s)
    }
  }
  const out: Bridge[] = []
  for (const [value, wingSet] of carriers) {
    const wings = [...wingSet].sort()
    const families = new Set(wings.map(familyOf)).size
    if (families < 2 || families > maxFamilies) continue
    out.push({ value, wings, families })
  }
  return out.sort((a, b) =>
    a.families - b.families
    || (BigInt(b.value) > BigInt(a.value) ? 1 : BigInt(b.value) < BigInt(a.value) ? -1 : 0))
}

/** how many distinct quantities were walked, so a bridge count is readable against its denominator */
export const carriedCount = (rows: readonly { numerals: readonly string[] }[]): number =>
  new Set(rows.flatMap((r) => [...r.numerals])).size
