// The ONE wiring point: Lean is the single source. This VitePress data loader derives the whole ledger from
// lean/*.lean (via src/theorems/generated.ts, compiled to dist/index.js) and hands it to every page and to the
// site config. No separate static generator — `vitepress build` reads this. A theorem computes in Lean, or it is
// not a theorem. The recomputation-only capabilities (FNV address, gate, crypto) are TOOLS, not theorems.
//
// Requires the package to be built first (`npm run build` → dist/). `npm run docs:build` does both in order.
import { theorems, runTrial, PRINCIPLES, merkleGravity, toUuid } from '../dist/index.js'

export type Theorem = {
  key: string
  name: string
  statement: string
  tactic: string
  file: string
  principle: string
  lean: string
  address: string
}

export type PrincipleGroup = {
  name: string
  blurb: string
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
  trial: {
    receipt: string
    count: number
    sealed: number
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

    const groups: PrincipleGroup[] = order.map((name) => {
      const list = LEDGER.filter((t) => t.principle === name)
      return { name, blurb: blurb[name] || '', count: list.length, fold: merkleGravity(list.map((t) => t.address)), theorems: list }
    })

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
      trial: {
        receipt: trial.receipt,
        count: trial.count,
        sealed: trial.sealed,
        leanBacked: trial.leanBacked,
        orderInvariant,
        chainGenesis,
        chainTip,
      },
      gh: 'https://github.com/uuidna/uuidna/blob/main/lean/',
    }
  },
}
