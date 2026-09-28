// array-formula — AN ARRAY IS THE IMAGE OF A RULE, AND A HASH IS AN INTEGER. Both are formulas the cross machinery
// could not see.
//
// The captain, 2026-09-28: "why arrays and hashes are not result of cross formulas?!? formulate all!"
//
// THE GAP IS REAL AND MEASURED. src/formulas.ts draws its crosses from numerals, so a sealed list is read as unrelated
// integers: [45, 90, 135, 180] enters the pool as four numbers with no relation between them recorded, when the relation
// IS the content — 45k for k in 1..4. And a content address never enters at all, because toUuid answers a string and
// characteristicNumerals reads digits. So two of the three things this ledger is made of — lists and addresses — are
// invisible to the machinery that finds crosses, and only the loose numerals are visible.
//
// AN ARRAY'S FORMULA IS FITTED AND THEN VERIFIED, never assumed. A closed form is proposed from the list's own
// differences or ratios and then REGENERATED: if the regenerated list is not identical to the original, the fit is
// discarded. A formula that merely matches the first terms is the shape of a false pattern, and this whole session has
// been an argument for checking rather than trusting.
//
// A HASH IS AN EXACT INTEGER, which is the simpler half and the one with a real consequence. A UUID is 128 bits written
// in hex; read as a bigint it is a quantity like any other, and it can be compared, folded and crossed. Nothing about it
// becomes MEANINGFUL by being an integer — two addresses sharing a prefix is not a bridge, and this module says so —
// but until it is an integer the question is unaskable BY CONSTRUCTION: the cross machinery compares numerals, and a
// string is not one.
//
// WHAT THIS DOES NOT CLAIM. A fitted formula is a description of the list as written, not a proof that the list had to be
// that way: [1, 2, 4] fits 2^k and also fits a quadratic, and both regenerate it exactly. So the fit reports EVERY form
// that reproduces the list, ranked simplest first, and calls none of them the truth. Choosing among them is a reader's
// judgement about what the list means, and arithmetic is silent on meaning BY CONSTRUCTION: both forms regenerate the
// list exactly, so no computation can prefer one.

export type Closed =
  | { kind: 'constant'; value: string }
  | { kind: 'arithmetic'; first: string; step: string }
  | { kind: 'geometric'; first: string; ratio: string }
  | { kind: 'polynomial'; degree: number; differences: string[] }

export interface ArrayFit {
  /** the list as given, exact */
  list: string[]
  /** every closed form that REGENERATES the list exactly, simplest first */
  forms: Closed[]
  /** rendered arithmetic for the simplest form, or null when nothing fits */
  formula: string | null
}

const B = (x: string): bigint => BigInt(x)

/** regenerate a list from a closed form — the verification every fit must pass */
export function generate(form: Closed, n: number): string[] {
  const out: string[] = []
  if (form.kind === 'constant') {
    for (let i = 0; i < n; i += 1) out.push(form.value)
    return out
  }
  if (form.kind === 'arithmetic') {
    let v = B(form.first)
    for (let i = 0; i < n; i += 1) { out.push(String(v)); v += B(form.step) }
    return out
  }
  if (form.kind === 'geometric') {
    let v = B(form.first)
    for (let i = 0; i < n; i += 1) { out.push(String(v)); v *= B(form.ratio) }
    return out
  }
  // NEWTON FORWARD DIFFERENCES: the top row of the difference table regenerates the whole sequence by summing down.
  const row = form.differences.map(B)
  for (let i = 0; i < n; i += 1) {
    out.push(String(row[0]!))
    for (let j = 0; j + 1 < row.length; j += 1) row[j] = row[j]! + row[j + 1]!
  }
  return out
}

/** the difference table of a list, until it is constant or exhausted */
const differencesOf = (xs: readonly bigint[]): bigint[][] => {
  const rows: bigint[][] = [[...xs]]
  while (rows[rows.length - 1]!.length > 1) {
    const last = rows[rows.length - 1]!
    const next: bigint[] = []
    for (let i = 0; i + 1 < last.length; i += 1) next.push(last[i + 1]! - last[i]!)
    rows.push(next)
    if (next.every((v) => v === next[0])) break
  }
  return rows
}

/**
 * Every closed form that reproduces the list exactly, simplest first.
 *
 * Simplicity is the order constant, arithmetic, geometric, polynomial — fewer parameters before more. A list shorter
 * than two terms admits every form and is therefore reported as fitting none: one point is not a sequence, and calling
 * it constant would be a statement about the reader rather than the list.
 */
export function fitArray(list: readonly string[]): ArrayFit {
  const given = list.map(String)
  if (given.length < 2 || !given.every((x) => /^-?\d+$/.test(x))) {
    return { list: given, forms: [], formula: null }
  }
  const xs = given.map(B)
  const forms: Closed[] = []
  const keeps = (f: Closed): boolean => {
    const made = generate(f, given.length)
    return made.length === given.length && made.every((v, i) => v === given[i])
  }

  if (xs.every((v) => v === xs[0])) {
    const f: Closed = { kind: 'constant', value: String(xs[0]) }
    if (keeps(f)) forms.push(f)
  }
  const step = xs[1]! - xs[0]!
  const arith: Closed = { kind: 'arithmetic', first: String(xs[0]), step: String(step) }
  if (keeps(arith) && !forms.some((f) => f.kind === 'constant')) forms.push(arith)
  else if (keeps(arith) && step !== 0n) forms.push(arith)

  if (xs[0] !== 0n && xs.every((v) => v !== 0n) && (xs[1]! % xs[0]!) === 0n) {
    const geo: Closed = { kind: 'geometric', first: String(xs[0]), ratio: String(xs[1]! / xs[0]!) }
    if (keeps(geo)) forms.push(geo)
  }
  // A POLYNOMIAL OF DEGREE n-1 INTERPOLATES ANY n POINTS, so the polynomial branch could not fail and [1,2,3,999] fitted
  // a cubic. Newton differences will always bottom out at a single value, and "every element equal" is trivially true of
  // one element — which is a fact about counting, not about the list. The constancy must be OBSERVED: at least two
  // entries of the final difference row must agree, or nothing has been seen repeat. Squares bottom out at [2,2,2] and
  // pass; [1,2,3,999] bottoms out at [995] and is correctly refused.
  const table = differencesOf(xs)
  const bottom = table[table.length - 1]!
  if (bottom.length >= 2 && bottom.every((v) => v === bottom[0])) {
    const top = table.map((r) => String(r[0]!))
    const poly: Closed = { kind: 'polynomial', degree: table.length - 1, differences: top }
    if (keeps(poly) && !forms.some((f) => f.kind === 'arithmetic' || f.kind === 'constant')) forms.push(poly)
  }

  const render = (f: Closed | undefined): string | null => {
    if (!f) return null
    if (f.kind === 'constant') return `a(k) = ${f.value}`
    if (f.kind === 'arithmetic') return `a(k) = ${f.first} + ${f.step}k`
    if (f.kind === 'geometric') return `a(k) = ${f.first} * ${f.ratio}^k`
    return `a(k) = Newton(${f.differences.join(', ')}), degree ${f.degree}`
  }
  return { list: given, forms, formula: render(forms[0]) }
}

/**
 * A content address as the exact integer it is: 128 bits of UUID, hex read as a bigint.
 *
 * THIS MAKES A HASH ASKABLE AND NOTHING MORE. An address becoming an integer does not make a comparison between two
 * addresses meaningful — a shared prefix is not a bridge, and a digest is designed so that nearby inputs give distant
 * outputs. What changes is that the quantity EXISTS for the machinery: before this, a cross could not be formed with an
 * address at all, so the question could not even be put.
 */
export function hashQuantity(uuid: string): string | null {
  const hex = uuid.replace(/-/g, '').toLowerCase()
  if (!/^[0-9a-f]{32}$/.test(hex)) return null
  return String(BigInt(`0x${hex}`))
}

/** the arrays a statement writes, as lists of numeral strings — the structure the numeral reader throws away */
export function arraysOf(statement: string): string[][] {
  const out: string[][] = []
  for (const m of statement.matchAll(/\[([-\d,\s]+)\]/g)) {
    const parts = m[1]!.split(',').map((p) => p.trim()).filter((p) => p !== '')
    if (parts.length >= 2 && parts.every((p) => /^-?\d+$/.test(p))) out.push(parts)
  }
  return out
}
