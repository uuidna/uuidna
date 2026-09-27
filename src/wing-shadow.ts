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

export type ShadowKind = 'shape-stub' | 'drifted' | 'undecided'
export interface Shadowed { file: string; def: string; kind: ShadowKind; why: string }

/** builtinName(name) → true when the evaluator resolves this name with no wing in scope. */
export function builtinName(name: string): boolean {
  // `name = name` is reflexive for any value the evaluator can produce, and null for an unbound identifier — BY
  // CONSTRUCTION, because src/involution returns null wherever its environment holds no binding for a name rather
  // than throwing. Reflexivity is the cheapest question that separates "known" from "unknown" without assuming a type.
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
      if (agrees === true) continue
      // A SHAPE STUB IS NOT A DRIFTED COPY, and calling it one sent me looking for a bug that was a design. The
      // evaluator holds `bootPages`, `rootfsNibbles` and `releaseAddress` as ZEROS of the right length — the lengths
      // come from BOOT_PAGE_COUNT, ROOTFS_NIBBLE_COUNT and RELEASE_ADDRESS_COUNT, constants it shares with the wings,
      // so the shape is consolidated already and only the contents are absent. That is sound for the claims those
      // wings actually make, which are about LENGTH; it is a live hazard for any claim about a VALUE, because such a
      // claim would be "independently verified" against zeros and pass. The two cases want different responses, so
      // they are reported as different findings rather than one word covering both.
      const stub = ((): boolean => {
        try {
          const len = holds(`${d.name}.length = ${d.name}.length`, src) === true
          const zeros = holds(`${d.name}.all (fun x => x == 0) = true`, src) === true
            || holds(`${d.name}.all (fun p => p.all (fun x => x == 0)) = true`, src) === true
          return len && zeros
        } catch { return false }
      })()
      if (stub) out.push({ file, def: d.name, kind: 'shape-stub',
        why: 'the builtin is a ZEROS placeholder of the right length — sound for a claim about shape, and a claim about a VALUE through this name would be verified against zeros and pass' })
      else if (agrees === false) out.push({ file, def: d.name, kind: 'drifted',
        why: 'the builtin holds a different value than the wing body computes, and it is not a zeros placeholder — the two readers disagree about content' })
      else out.push({ file, def: d.name, kind: 'undecided',
        why: 'the wing body could not be evaluated, so agreement with the builtin is UNDECIDED — which is where a silent disagreement would hide' })
    }
  }
  return out
}

/** the guard's shape: a shadowed definition is a silent disagreement between the kernel and the evaluator. */
export function wingShadowGaps(): { what: string; fix: string }[] {
  const s = shadowedWingDefs()
  if (s.length === 0) return []
  return [{
    what: `${s.length} wing definition(s) collide with an evaluator builtin (${[...new Set(s.map((x) => x.kind))].join(', ')}) and are read as the builtin instead `
      + `(${s.slice(0, 5).map((x) => x.file + '::' + x.def + ' — ' + x.why).join('; ')}${s.length > 5 ? '; …' : ''})`,
    fix: 'rename the wing definition — Lean scopes it to the wing and src/involution does not, so the kernel and the '
      + 'independent evaluator read different values under one name and the theorem silently loses its denial',
  }]
}
