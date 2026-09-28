// codata-cross — PROVE A BRIDGE BY MATCHING ITS INTEGER TO A PUBLISHED CONSTANT, against NIST's own table.
//
// The captain, 2026-09-28: "widen to anything imaginable and deep research the entanglements and cross applications
// proving with public apis and datasets".
//
// THE PROOF AVAILABLE HERE IS EXACT, and that is why this file can exist at all. entanglement-map finds 896 bridges —
// quantities two wing families share — and cannot tell a physical constant from a digit coincidence, because both arrive here as the same thing: a run of digits with no provenance attached. That is a property of the input rather than a gap in the method. Colour and
// Acoustics share 340: a hue angle and a wave speed. Relativity and Thermodynamics share 1380649. Only one of those
// pairs is physics, and reading the wings is how I established it by hand, which does not scale and is not evidence
// anyone else can recompute.
//
// NIST PUBLISHES THE CODATA VALUES AS A PLAIN TABLE, and the ledger's integers ARE the mantissa digits of those values:
// the Boltzmann constant is written 1.380 649 e-23 and the wings carry 1380649; the Planck length is 1.616 255 e-35 and
// the wings carry 1616255. So "is this integer a published constant?" has an exact answer from an authoritative public
// dataset, and a bridge whose quantity matches is PROVEN to be a shared constant rather than a shared digit string.
//
// WHAT A MATCH DOES AND DOES NOT ESTABLISH. It establishes that the integer is the mantissa of a published constant to
// the digits given — which is exactly what makes two wings carrying it a real bridge instead of a coincidence. It does
// NOT establish that either wing uses it correctly, that the arithmetic around it is meaningful, or that the constant
// is relevant to what the wing claims. A wing could carry 299792458 while saying something false about light. The match
// is evidence about the QUANTITY, and the wings' use of it remains a question for a reader.
//
// AND A SHORT MANTISSA IS NOT EVIDENCE. `2`, `3` and `7` are the mantissas of nothing in particular and of hundreds of
// constants at once, so a match on a short digit string is noise. The floor is computed from the table rather than
// chosen: a mantissa must be at least as long as the table's median mantissa to count. Below that, a "match" would be
// the same numerology this file exists to distinguish itself from.

export interface CodataConstant {
  /** the quantity's name as NIST writes it */
  quantity: string
  /** the mantissa digits with separators and the decimal point removed — what a wing would carry as an integer */
  mantissa: string
  /** the exponent, kept so a reader can reconstruct the value */
  exponent: string
  unit: string
  /** NIST marks a defining constant exact; an exact constant's digits cannot drift under a later adjustment */
  exact: boolean
}

/**
 * Parse one line of NIST's allascii.txt.
 *
 * The format is fixed-width-ish: quantity, value, uncertainty, unit. Values use SPACES as digit group separators
 * (1.380 649 e-23), which is why the digits have to be joined before they can be compared with a ledger integer.
 * Returns null for headers, rules and anything whose value does not parse — a line whose value does not parse cannot be read as a quantity BY CONSTRUCTION, there being no number in it to compare, so it is skipped, never
 * guessed at.
 */
export function parseCodataLine(line: string): CodataConstant | null {
  if (line.trim() === '' || /^-{5,}/.test(line) || /^Quantity\s/.test(line)) return null
  // the value begins at the first digit that follows two or more spaces after the quantity name
  const m = /^(.{1,60}?)\s{2,}([\d.\s]+(?:e[+-]?\d+)?)\s{2,}(.*)$/.exec(line)
  if (m === null) return null
  const quantity = m[1]!.trim()
  const rawValue = m[2]!.trim()
  const rest = m[3]!.trim()
  if (quantity === '' || rawValue === '') return null
  const eAt = rawValue.search(/e[+-]?\d+$/)
  const mantissaPart = eAt >= 0 ? rawValue.slice(0, eAt) : rawValue
  const exponent = eAt >= 0 ? rawValue.slice(eAt) : ''
  const digits = mantissaPart.replace(/[\s.]/g, '')
  if (!/^\d+$/.test(digits)) return null
  // NIST writes "(exact)" in the uncertainty column for the defining constants
  const exact = /\(exact\)/.test(rest)
  const unit = rest.replace(/\(exact\)/, '').replace(/^[\d.\s]+/, '').trim()
  return { quantity, mantissa: digits.replace(/0+$/, '') === '' ? digits : digits, exponent, unit, exact }
}

/** every constant the table holds, in order, skipping what cannot be read */
export function parseCodata(table: string): CodataConstant[] {
  const out: CodataConstant[] = []
  for (const line of table.split('\n')) {
    const c = parseCodataLine(line)
    if (c !== null) out.push(c)
  }
  return out
}

/**
 * The shortest mantissa that counts as evidence: the table's own median mantissa length.
 *
 * A match on "2" or "314" is noise — short digit strings are the mantissa of many constants and of none. Taking the
 * median from the table means the floor moves if NIST's precision does, and is not a number anybody here picked.
 */
export function evidenceFloor(constants: readonly CodataConstant[]): number {
  if (constants.length === 0) return 0
  const lens = constants.map((c) => c.mantissa.length).sort((a, b) => a - b)
  const mid = lens.length >> 1
  return lens.length % 2 === 1
    ? lens[mid]!
    : ((lens[mid - 1]! + lens[mid]!) - ((lens[mid - 1]! + lens[mid]!) % 2)) / 2
}

export interface ProvenBridge {
  value: string
  /** the wings that share it — two or more families, from entanglement-map's criterion */
  wings: readonly string[]
  /** every published constant whose mantissa is exactly this integer */
  constants: { quantity: string; exponent: string; unit: string; exact: boolean }[]
}

/**
 * Which shared quantities are published constants — the bridges a public dataset PROVES.
 *
 * A value may match more than one constant (the same digits appear in related quantities), and every match is kept
 * rather than the first: choosing one would hide that the digits are shared, which is the very thing being measured.
 */
export function provenBridges(
  bridges: readonly { value: string; wings: readonly string[] }[],
  constants: readonly CodataConstant[],
  floor: number = evidenceFloor(constants),
): ProvenBridge[] {
  const byMantissa = new Map<string, CodataConstant[]>()
  for (const c of constants) {
    if (c.mantissa.length < floor) continue
    const l = byMantissa.get(c.mantissa) ?? []
    l.push(c)
    byMantissa.set(c.mantissa, l)
  }
  const out: ProvenBridge[] = []
  for (const b of bridges) {
    const hit = byMantissa.get(b.value)
    if (hit === undefined || hit.length === 0) continue
    out.push({
      value: b.value,
      wings: b.wings,
      constants: hit.map((c) => ({ quantity: c.quantity, exponent: c.exponent, unit: c.unit, exact: c.exact })),
    })
  }
  // exact constants first — a defining constant's digits cannot drift under a later adjustment — BY DEFINITION, since the SI fixes its value exactly rather than measuring it — so a bridge on one is
  // permanent in a way a measured constant's is not
  return out.sort((a, b) => {
    const ax = a.constants.some((c) => c.exact) ? 0 : 1
    const bx = b.constants.some((c) => c.exact) ? 0 : 1
    return ax - bx || b.value.length - a.value.length || a.value.localeCompare(b.value)
  })
}
