// The BUILD-TIME census used only by leftover surfaces that have not yet become a per-URL monograph
// (LinkAuditor, unused on Layout). Listings (/theorems, /topics, /rosetta, /trials, home) read
// frontmatter.axis / census from transformPageData (axis-monograph.ts). Layout must never import this
// file — that was the entropy: every page paid for the full ledger because chrome imported it.
//
// Lean is the single source. Requires the package to be built first (`npm run build` → dist/).
import { theorems, runTrial, PRINCIPLES, rosettaIndex } from '../../dist/theorems/index.js'
import { merkleGravity } from '../../dist/gravity/index.js'
import { toUuid } from '../../dist/address.js'
import { publications } from '../../dist/publish.js'
import { quantumAura } from '../../dist/aura.js'
import { discoverStaticPages, canonicalOrder, nextOf } from '../../dist/site.js'
import { axiomWitness } from '../../dist/axiom-witness.js'
import { mirrorRows } from '../../dist/rosetta-legs.js'

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
  lineAddress: string
  aura: { hsl: string; ray: number }       // the A432 quantum aura folded from address (the PROPOSITION's colour)
  lineAura: { hsl: string; ray: number }   // the A432 quantum aura folded from lineAddress (the exact Lean LINE's
                                            // own colour — quantumAura only ever reads the address's first 8 hex
                                            // chars, so this is genuinely a different colour, not address's twin)
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
  // route → next route, the SAME wrapping walk scripts/next.ts's Arm 4 verifies has zero gaps (canonicalOrder +
  // nextOf, site.ts) — so a client reading this always has a next for ANY current route, not only theorem pages.
  next: Record<string, string>
  /** Rosetta leg census per theorem key — witness / falsifier / axiom anchoring for ObjectCrosslinks. */
  legs: Record<string, { legs: string[]; missing: string[]; claimedBy: string; wing: string }>
  /** Kernel-only axiom witness holds for the whole ledger (lean/axioms.json vs live theorems). */
  axiomHolds: boolean
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
  watch: ['../../dist/theorems/generated.js', '../../dist/publish.js', '../../dist/site.js'],
  load(): LedgerData {
    // Both auras are content-addressed and deterministic, so they fold HERE, at build time — no client-side
    // recompute. Only hsl + ray ship per aura (the full Aura carries a per-address CSS block; shipping both in
    // full for EVERY theorem would bloat the page data past what any consumer here actually reads — the count is
    // deliberately not written here, since a number in a comment is the one place the ledger cannot keep current).
    const LEDGER: Theorem[] = theorems().map((t) => {
      const a = quantumAura(t.address)
      const la = quantumAura(t.lineAddress)
      return { ...t, aura: { hsl: a.hsl, ray: a.ray }, lineAura: { hsl: la.hsl, ray: la.ray } }
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

    // route → next route, over EVERY page (static sections + every theorem + every publication) — the exact walk
    // scripts/next.ts's Arm 4 recomputes and checks for gaps at release time. Shipped so the client (ReferrerNav)
    // always has a next for the current route, not only when the referrer happened to be a theorem.
    const walkOrder = canonicalOrder(discoverStaticPages())
    const next = Object.fromEntries([...nextOf(walkOrder)].map(([route, n]) => [route, n.route]))

    // Rosetta legs (witness / falsifier / …) — ObjectCrosslinks surfaces them as VPButton doors to /tests · /rosetta.
    const legs: LedgerData['legs'] = {}
    for (const r of mirrorRows()) {
      legs[r.key] = { legs: r.legs, missing: r.missing, claimedBy: r.claimedBy, wing: r.wing }
    }
    let axiomHolds = false
    try { axiomHolds = !!axiomWitness().holds } catch { axiomHolds = false }

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
      next,
      legs,
      axiomHolds,
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
