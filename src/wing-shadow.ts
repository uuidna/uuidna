// wing-shadow — A WING DEFINITION THE EVALUATOR ALREADY KNOWS BY THAT NAME IS READ AS THE OTHER ONE.
//
// src/involution seeds its environment with builtins and then adds a wing's own definitions, skipping any name the
// environment already holds. Lean does the opposite: a wing's `def` is the wing's, and nothing the second reader
// knows is in scope. So a wing definition whose name collides with a builtin is read by the KERNEL as the wing meant
// and by the EVALUATOR as something else entirely — the two readers disagree silently, on the only axis where their
// agreement is the whole point.
//
// MEASURED 2026-09-26, and it cost the last check holding the mint gate shut. lean/SiCross.lean defined
// `units` as the seventeen SI dimension vectors. `units` is a builtin: the six units of ℤ/9, [1, 2, 4, 5, 7, 8]. The
// evaluator read seventeen seven-vectors as six scalars, asked `.length` of a number, returned null, and
// the_lattice_is_closed_under_product_and_ratio carried no independent denial for as long as the name stood. Nothing
// failed. Nothing was logged. The theorem simply had one leg fewer than the census believed.
//
// THE DETECTION NEEDS NO INTERNALS, which is why it is a probe rather than a copy of the environment: ask the
// evaluator to resolve the bare name with NO wing source. If it answers, the name is a builtin, and a wing def of
// that name will lose to it. That is exactly the condition the evaluator applies, asked from outside.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { holds } from './involution/index.js'
import { simpleDefs } from './wing-defs.js'

export interface Shadowed { file: string; def: string; why: string }

/** builtinName(name) → true when the evaluator resolves this name with no wing in scope. */
export function builtinName(name: string): boolean {
  // `name = name` is reflexive for any value the evaluator can produce, and null when it cannot resolve the name at
  // all. Reflexivity is the cheapest question that distinguishes "known" from "unknown" without assuming a type.
  try { return holds(`${name} = ${name}`) === true } catch { return false }
}

/**
 * A SHARED NAME IS NOT YET A BUG, and the first version of this finder reported 26 of them as if it were.
 *
 * Most builtins that share a wing definition's name IMPLEMENT that definition — that is how the evaluator reads the
 * wing at all, and `agl`, `words`, `bfsOrder` and their kin are in the builtin table for exactly that reason. The
 * defect is a builtin that means something ELSE. Nothing about the name distinguishes the two, so the name is the
 * wrong question: what separates them is whether the builtin's VALUE is the value the wing's body computes.
 *
 * So the body is evaluated against the wing and compared to the bare name. `units` fails it — seventeen seven-vectors
 * against six scalars — and a faithful builtin passes it by construction. A body the evaluator cannot read at all is
 * reported as UNDECIDED rather than as agreement, because an unreadable body is exactly where a silent disagreement
 * would hide.
 */
export function shadowedWingDefs(): Shadowed[] {
  const dir = join(ROOT, 'lean')
  if (!existsSync(dir)) return []
  const out: Shadowed[] = []
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.lean')).sort()) {
    const src = readFileSync(join(dir, file), 'utf8')
    for (const d of simpleDefs(src)) {
      if (!builtinName(d.name)) continue
      // a definition taking parameters cannot be compared as a value; its name is shared and its agreement is
      // decided wherever a theorem applies it, so it is not reported here rather than reported on a guess
      if (d.params.length > 0) continue
      const agrees = ((): boolean | null => {
        try { return holds(`${d.body} = ${d.name}`, src) } catch { return null }
      })()
      if (agrees === false) out.push({ file, def: d.name, why: 'the builtin holds a different value than the wing body computes' })
      else if (agrees === null) out.push({ file, def: d.name, why: 'the wing body could not be evaluated, so agreement with the builtin is UNDECIDED' })
    }
  }
  return out
}

/** the guard's shape: a shadowed definition is a silent disagreement between the kernel and the evaluator. */
export function wingShadowGaps(): { what: string; fix: string }[] {
  const s = shadowedWingDefs()
  if (s.length === 0) return []
  return [{
    what: `${s.length} wing definition(s) collide with an evaluator builtin and are read as the builtin instead `
      + `(${s.slice(0, 5).map((x) => x.file + '::' + x.def + ' — ' + x.why).join('; ')}${s.length > 5 ? '; …' : ''})`,
    fix: 'rename the wing definition — Lean scopes it to the wing and src/involution does not, so the kernel and the '
      + 'independent evaluator read different values under one name and the theorem silently loses its denial',
  }]
}
