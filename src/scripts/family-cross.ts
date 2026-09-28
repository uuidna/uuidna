#!/usr/bin/env node
// @finder phase:9 — DISCOVERED, not listed. It runs beside the other censuses in the audit chain; nothing central
// names it, because finders.ts reads this declaration out of this file.
// family-cross — FAMILIES FROM DIFFERENT DOMAINS PROVE EACH OTHER, AND EACH PROVES ITSELF AGAINST THE KERNEL.
//
// The captain, 2026-09-28: "families from different domains prove each other. automate autonomy".
//
// A FAMILY DECLARES A SET OF WINGS AND THE KERNEL SEALS THEM. Those are two domains: what a generator intends and what
// Lean accepted. The equilibrium family is the six-cube's xor translations — algebra, 2^6 = 64 cells, one translation to
// a file. The involution family is refuted leads — epistemics, one involution to a file plus one per formalised lead the
// kernel took. Nothing connects the two except that both end as wings in one ledger, which is exactly what makes them a
// cross: they share no step, no generator and no subject, and they must both land on wings that exist.
//
// MEASURED WHEN THIS WAS WRITTEN: equilibrium 64 declared, 64 sealed; involution 9 declared, 9 sealed. Both agree, and
// the agreement of the one with 64 members is what makes the agreement of the one with 9 worth reading — a method that
// holds across two unrelated domains is a method, while a single family agreeing with itself is a surface agreeing with
// itself, which this tree has a lesson about.
//
// AND TWO WRONG READINGS GOT THERE FIRST, recorded because they are the reason this is a script and not a sentence.
// Counting the involution family by the filename prefix `Involution*` reported 7 against 4 and looked like a drift; the
// family also emits a Proof*.lean wing, so the prefix was the wrong instrument. Then comparing INVOLUTION_HANDLES
// reported 4 against 7, because that export names only the hand-built half and the family has a second source. Both
// were faults in the instrument, and both looked exactly like faults in the tree.
//
// THE FAMILIES ARE DISCOVERED, WHICH IS THE AUTONOMY. src/scripts/*-family.ts is the glob, and a family's membership is
// the zero-argument export whose name ends in `Wings`. A family added tomorrow is crossed on that landing with nothing
// edited here — the same discipline the finder chain itself now uses. A module that exposes no such export is reported
// UNMEASURED and never folded into clean: "I could not ask" is not "nothing is wrong".
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../theorems/index.js'
import { wrArtifact } from '../artifact.js'

export interface FamilyCross { family: string; declared: number; sealed: number; missing: string[]; agrees: boolean }

/** every family module, from the directory rather than a list */
export const familyModules = (dir = join(ROOT, 'src', 'scripts')): string[] =>
  readdirSync(dir).filter((f) => f.endsWith('-family.ts') && !f.endsWith('.test.ts')).map((f) => f.replace(/\.ts$/, '')).sort()

/** cross one family's declared wings against the wings the kernel sealed */
export function crossFamily(name: string, declared: readonly { file?: string; name?: string }[], sealed: ReadonlySet<string>): FamilyCross {
  const files = declared.map((w) => w.file ?? w.name).filter((f): f is string => typeof f === 'string')
  const missing = files.filter((f) => !sealed.has(f))
  return { family: name, declared: files.length, sealed: files.length - missing.length, missing, agrees: missing.length === 0 }
}

if (process.argv[1]?.endsWith('family-cross.js')) {
  const sealed = new Set(theorems().map((t) => t.file))
  const rows: FamilyCross[] = []
  const unmeasured: { family: string; why: string }[] = []

  for (const mod of familyModules()) {
    let exported: Record<string, unknown>
    try { exported = (await import(join(ROOT, 'dist', 'scripts', mod + '.js'))) as Record<string, unknown> } catch (e) {
      unmeasured.push({ family: mod, why: 'could not be imported: ' + String((e as Error).message).slice(0, 90) })
      continue
    }
    const wingsFn = Object.entries(exported).find(([k, v]) => /Wings$/.test(k) && typeof v === 'function')
    if (!wingsFn) { unmeasured.push({ family: mod, why: 'exposes no zero-argument export ending in Wings, so its membership cannot be asked' }); continue }
    try {
      const declared = (wingsFn[1] as () => { file?: string; name?: string }[])()
      rows.push(crossFamily(mod, declared, sealed))
    } catch (e) {
      unmeasured.push({ family: mod, why: `${wingsFn[0]}() threw: ` + String((e as Error).message).slice(0, 90) })
    }
  }

  const disagreeing = rows.filter((r) => !r.agrees)
  console.log(`family-cross — ${rows.length} family(ies) crossed against ${sealed.size} sealed wings, ${unmeasured.length} unmeasured`)
  for (const r of rows) {
    console.log(`  ${r.agrees ? '✓' : '✗'} ${r.family.padEnd(20)} declared ${String(r.declared).padStart(3)} · sealed ${String(r.sealed).padStart(3)}`
      + (r.agrees ? '' : `  NOT SEALED: ${r.missing.slice(0, 5).join(', ')}`))
  }
  for (const u of unmeasured) console.log(`  ? ${u.family.padEnd(20)} ${u.why}`)
  // TWO FAMILIES AGREEING IS THE CROSS; ONE IS A SURFACE AGREEING WITH ITSELF, so the count is reported and not hidden.
  if (rows.length < 2) console.log('  · only one family was measurable, so this run is a self-check rather than a cross')

  wrArtifact('lean/family-cross.json', {
    kind: 'family-cross',
    why: 'A family declares a set of wings and the kernel seals them: two domains, one intent and one proof. Families '
      + 'from unrelated subjects (the six-cube xor translations; refuted leads) must both land on wings that exist, so '
      + 'they prove each other rather than each proving itself. The families are DISCOVERED from src/scripts/*-family.ts '
      + 'and their membership is the zero-argument export ending in Wings, so a family added tomorrow is crossed on that '
      + 'landing with nothing edited. A module that cannot be asked is UNMEASURED and never counted as clean.',
    families: rows.length,
    agreeing: rows.filter((r) => r.agrees).length,
    disagreeing: disagreeing.length,
    unmeasured: unmeasured.length,
    sealedWings: sealed.size,
    rows,
    unmeasuredRows: unmeasured,
  })

  if (disagreeing.length > 0) {
    console.error(`\n✗ family-cross — ${disagreeing.length} family(ies) declare a wing the kernel has not sealed`)
    process.exit(1)
  }
  if (unmeasured.length > 0) console.log(`\n· family-cross — ${unmeasured.length} family(ies) unmeasured; not counted as agreeing`)
  else console.log(`\n✓ family-cross — every declared wing of every family is sealed`)
}
