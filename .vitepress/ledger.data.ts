// The ONE wiring point: Lean is the single source. This VitePress data loader derives the whole ledger from
// lean/*.lean (via src/theorems/generated.ts, compiled to dist/index.js) and hands it to every page and to the
// site config. No separate static generator — `vitepress build` reads this. A theorem computes in Lean, or it is
// not a theorem. The recomputation-only capabilities (FNV address, gate, crypto) are TOOLS, not theorems.
//
// Requires the package to be built first (`npm run build` → dist/). `npm run docs:build` does both in order.
import { theorems, runTrial, PRINCIPLES, merkleGravity, toUuid, publications, rosettaIndex, quantumAura } from '../dist/index.js'

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
  aura: { hsl: string; ray: number }   // the A432 quantum aura folded from the address at build time (deterministic)
}

export type PrincipleGroup = {
  name: string
  blurb: string
  count: number
  fold: string
  monograph: string | null   // the /publications/<slug> monograph for this cluster (its audited prose), or null
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
    // The aura is content-addressed and deterministic, so it folds HERE, at build time — no client-side recompute.
    // Only hsl + ray ship (the full Aura carries a per-address CSS block; 1132 of those would bloat the page data).
    const LEDGER: Theorem[] = theorems().map((t) => {
      const a = quantumAura(t.address)
      return { ...t, aura: { hsl: a.hsl, ray: a.ray } }
    })
    const trial = runTrial()
    const blurb = Object.fromEntries(PRINCIPLES.map((p: string[]) => [p[1], p[2]])) as Record<string, string>
    const order = PRINCIPLES.map((p: string[]) => p[1]).filter((name: string) => LEDGER.some((t) => t.principle === name))

    // Each cluster's MONOGRAPH is its audited prose on /publications, matched by the .lean file the theorems share.
    const monographByFile = Object.fromEntries(publications().map((p) => [p.file, p.slug])) as Record<string, string>
    const groups: PrincipleGroup[] = order.map((name) => {
      const list = LEDGER.filter((t) => t.principle === name)
      const slug = monographByFile[list[0]?.file]
      return { name, blurb: blurb[name] || '', count: list.length, fold: merkleGravity(list.map((t) => t.address)), monograph: slug ? `/publications/${slug}` : null, theorems: list }
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
