// The ONE wiring point: Lean is the single source. This VitePress data loader derives the whole ledger from
// lean/*.lean (via src/theorems/generated.ts, compiled to dist/index.js) and hands it to every page and to the
// site config. No separate static generator — `vitepress build` reads this. A theorem computes in Lean, or it is
// not a theorem. The recomputation-only capabilities (FNV address, gate, crypto) are TOOLS, not theorems.
//
// Requires the package to be built first (`npm run build` → dist/). `npm run docs:build` does both in order.
import { theorems, runTrial, PRINCIPLES, merkleGravity, toUuid, publications, rosettaIndex } from '../dist/index.js'

export type Theorem = {
  key: string
  name: string
  statement: string
  tactic: string
  file: string
  principle: string
  skill: string
  lean: string
  address: string
}

export type PrincipleGroup = {
  name: string
  blurb: string
  count: number
  fold: string
  guide: string | null   // the /publications/<slug> guide for this cluster (its audited monograph), or null
  theorems: Theorem[]
}

// A discussion topic, computed by the theorem skill axis (mined from theorem keys) — public, folded to a receipt.
export type SkillGroup = {
  skill: string
  count: number
  fold: string
  theorems: Theorem[]
}


export type LedgerData = {
  total: number
  principleCount: number
  theorems: Theorem[]
  order: string[]
  blurb: Record<string, string>
  groups: PrincipleGroup[]
  skillGroups: SkillGroup[]
  rosetta: { ray: number; count: number; fold: string; theorems: { key: string; name: string }[] }[]
  trial: {
    receipt: string
    count: number
    verified: number
    leanBacked: number
    orderInvariant: boolean
    chainGenesis: string
    chainTip: string
  }
  gh: string
}

declare const data: LedgerData
export { data }

export default {
  // Rebuild the ledger whenever the compiled package changes.
  watch: ['../dist/index.js'],
  load(): LedgerData {
    const LEDGER = theorems() as Theorem[]
    const trial = runTrial()
    const blurb = Object.fromEntries(PRINCIPLES.map((p: string[]) => [p[1], p[2]])) as Record<string, string>
    const order = PRINCIPLES.map((p: string[]) => p[1]).filter((name: string) => LEDGER.some((t) => t.principle === name))

    // Each cluster's GUIDE is its audited monograph on /publications, matched by the .lean file the theorems share.
    const guideByFile = Object.fromEntries(publications().map((p) => [p.file, p.slug])) as Record<string, string>
    const groups: PrincipleGroup[] = order.map((name) => {
      const list = LEDGER.filter((t) => t.principle === name)
      const slug = guideByFile[list[0]?.file]
      return { name, blurb: blurb[name] || '', count: list.length, fold: merkleGravity(list.map((t) => t.address)), guide: slug ? `/publications/${slug}` : null, theorems: list }
    })

    // Discussion topics computed by the theorem skill axis — biggest first, each folded to its own receipt. Public.
    const skillGroups: SkillGroup[] = [...new Set(LEDGER.map((t) => t.skill))]
      .map((skill) => {
        const list = LEDGER.filter((t) => t.skill === skill)
        return { skill, count: list.length, fold: merkleGravity(list.map((t) => t.address)), theorems: list }
      })
      .sort((a, b) => b.count - a.count)

    // The trial: every theorem's content-address folded, order-invariant, to ONE receipt; plus the sequential chain.
    const roots = LEDGER.map((t) => t.address)
    const orderInvariant = trial.receipt === merkleGravity([...roots].reverse())
    const chainGenesis = 'axiom'
    let chainTip = chainGenesis
    for (const r of roots) chainTip = toUuid(chainTip + '→' + r)

    return {
      total: LEDGER.length,
      principleCount: order.length,
      theorems: LEDGER,
      order,
      blurb,
      groups,
      skillGroups,
      // the 7-ray rosette index — a decidable ℤ/7 partition of the ledger by content-address, each ray folded.
      rosetta: rosettaIndex().map((r) => ({ ray: r.ray, count: r.count, fold: r.fold, theorems: r.theorems.map((t) => ({ key: t.key, name: t.name })) })),
      trial: {
        receipt: trial.receipt,
        count: trial.count,
        verified: trial.verified,
        leanBacked: trial.leanBacked,
        orderInvariant,
        chainGenesis,
        chainTip,
      },
      gh: 'https://github.com/uuidna/uuidna/blob/main/lean/',
    }
  },
}
