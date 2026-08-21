// discover — HOLD EVERY CANDIDATE AT ONCE, AND REFUTE IN THE SAME PASS.
//
// Relations between the ledger's own measured numbers are worth finding, and finding them one at a time is how
// noise gets sealed. In one session I claimed the re-namings were 2 x 42 (they were 73
// 432 (it does not: 7 does not divide 72). Both were arithmetic that LOOKED like structure, proposed singly and
// checked only after being stated.
//
// So the superposition is held whole: every candidate relation over the supplied values is enumerated, and each is
// then attacked in the SAME pass. A relation survives only if it holds AND stops holding when an input moves by
// one. That second test is the whole point — `a % b == 0` for b = 1 holds for every a alive or dead, and a
// discoverer without it reports the trivially true as though it were found.
//
// WHAT RIGIDITY CANNOT SEE. Perturbation moves each value INDEPENDENTLY, so a value DERIVED from the others is
// invisible to it: `renames` is defined as keys minus distinct, and moving keys alone produces a state that cannot
// exist, so the relation breaks and the tool calls it rigid. It is a definition read back. Feed this only values
// that are independently measured; against derived quantities it confirms their own construction.
//
// Nothing here seals anything. It proposes, and the proposals still owe the other legs: an independent witness,
// and a falsifier. A survivor is a candidate for a theorem.

export interface Value { name: string; n: number }
export interface Relation { form: string; holds: boolean; rigid: boolean; note?: string }

/** every candidate over the values, as exact integer arithmetic — no division is ever taken. */
export function superposition(vs: readonly Value[]): { form: string; test: (m: Map<string, number>) => boolean }[] {
  const out: { form: string; test: (m: Map<string, number>) => boolean }[] = []
  const at = (m: Map<string, number>, k: string): number => m.get(k) ?? 0
  for (const a of vs) for (const b of vs) {
    if (a.name === b.name) continue
    for (const c of vs) {
      if (c.name === a.name || c.name === b.name) continue
      out.push({ form: `${a.name} * ${b.name} = ${c.name}`, test: (m) => at(m, a.name) * at(m, b.name) === at(m, c.name) })
      out.push({ form: `${a.name} + ${b.name} = ${c.name}`, test: (m) => at(m, a.name) + at(m, b.name) === at(m, c.name) })
      out.push({ form: `${a.name} - ${b.name} = ${c.name}`, test: (m) => at(m, a.name) - at(m, b.name) === at(m, c.name) })
    }
    out.push({ form: `${b.name} divides ${a.name}`, test: (m) => at(m, b.name) !== 0 && at(m, a.name) % at(m, b.name) === 0 })
    for (const k of [2, 3, 4]) out.push({ form: `${a.name}^${k} = ${b.name}`, test: (m) => at(m, a.name) ** k === at(m, b.name) })
  }
  return out
}

/** RIGIDITY is the refutation: move each input by one and require the relation to break. A relation that survives
 *  perturbation is not describing these numbers, it is describing arithmetic. */
export function rigid(test: (m: Map<string, number>) => boolean, vs: readonly Value[]): boolean {
  const base = new Map(vs.map((v) => [v.name, v.n]))
  for (const v of vs) for (const d of [1, -1]) {
    const m = new Map(base)
    m.set(v.name, v.n + d)
    if (test(m)) return false
  }
  return true
}

/** one pass: enumerate, evaluate, refute. Only rigid survivors are returned as findings. */
export function discover(vs: readonly Value[]): { survived: Relation[]; limp: Relation[]; considered: number } {
  const base = new Map(vs.map((v) => [v.name, v.n]))
  const survived: Relation[] = []
  const limp: Relation[] = []
  const seen = new Set<string>()
  for (const c of superposition(vs)) {
    if (!c.test(base) || seen.has(c.form)) continue
    seen.add(c.form)
    const r: Relation = { form: c.form, holds: true, rigid: rigid(c.test, vs) }
    ;(r.rigid ? survived : limp).push(r)
  }
  return { survived, limp, considered: seen.size }
}
