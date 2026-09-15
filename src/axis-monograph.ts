// axis-monograph — the census of one URL, not a second template. TypeScript computes; VitePress attaches.
//
// A URL is a monograph: ObjectPage + params. Listing routes (/theorems, /topics, /rosetta, /trials, home)
// were importing ledger.data as a live query over every theorem (statement + lean, tripled into groups).
// That is entropy: the same census on Layout, on indexes, and named "monograph" only for /publications.
//
// Naming: publication = audited domain prose. principle = derivation wing. skill = capability axis.
// monograph = any URL's relations + body. Layout never reads this module; transformPageData attaches
// only the slice that URL is.
import { theorems, PRINCIPLES, rosettaIndex, dependsOn, gravityOf, isUnbound, isPagelessFile, axiomIndex, type Theorem } from './theorems/index.js'
import { fillLattice } from './lattice.js'
import { typeset } from './formula.js'
import { runTrial } from './trial-run.js'
import { axiomWitness } from './axiom-witness.js'
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'
import { SITE } from './site/index.js'
import { quantumAura } from './aura.js'
import { timeShorFullUse } from './os/host/index.js'
import { phdProofs } from './phd-proofs.js'
import { tamperCosts } from './tamper-cost.js'

export type AxisMember = {
  key: string
  name: string
  statement: string
  /** the statement as LaTeX, present only where it IS a formula. TeX and not MathML deliberately: MathML for
   *  every row costs +205 KB of payload against 49 KB for the whole TeX set, and this list's filter searches the
   *  statement AS TEXT, which markup would break. The MathML waits on the object's own page. */
  tex: string | null
  skill: string
  principle: string
  aura: { hsl: string; ray: number }
  lineAura: { hsl: string; ray: number }
  dependsOn: string[]
  depCount: number
  gravity: number
  unbound: boolean
}

export type TheoremsAxis = {
  objectKind: 'theorems'
  total: number
  members: AxisMember[]
  order: string[]
  publicationByPrinciple: Record<string, string | null>
  skills: string[]
  trialReceipt: string
  axiomHolds: boolean
  unboundCount: number
  /** Four-hex span: stations that CALL named cargo, then the solution involution. */
  span: {
    count: number
    wings: number
    door: string
    fill: {
      occupied: number
      vacant: number
      theoremsSeated: number
      axiomsSeated: number
      problemsSeated: number
      involutionPairs: number
    }
  }
}

export type TopicsAxis = {
  objectKind: 'topics'
  skills: { skill: string; count: number; fold: string; members: { key: string; name: string; statement: string }[] }[]
}

export type RosettaAxis = {
  objectKind: 'rosetta'
  total: number
  rays: { ray: number; count: number; fold: string; theorems: { key: string; name: string }[] }[]
}

export type TrialsAxis = {
  objectKind: 'trials'
  total: number
  trial: {
    receipt: string
    count: number
    verified: number
    leanBacked: number
    orderInvariant: boolean
    chainTip: string
  }
}

export type AxiomsAxis = {
  objectKind: 'axioms'
  totalDefs: number
  citedDefs: number
  unusedDefs: number
  wings: number
  axiomHolds: boolean
  entries: {
    file: string
    def: string
    principle: string
    theoremCount: number
    unused: boolean
    theorems: { key: string; name: string }[]
  }[]
}

export type HomeCensus = {
  objectKind: 'page'
  theorems: number
  /** proved by `decide` alone; otherTactics = theorems − decided (exact, intro, unfold …) */
  decided: number
  otherTactics: number
  /** kernel-audited with an empty axiom set (lean/axioms.json via axiomWitness); 0 when the witness is unreadable */
  axiomFree: number
  principles: number
  skills: number
  shor: {
    chunkQubits: number
    chunkStates: number
    handleChunks: number
    uuidChunks: number
    handleStates: number
    uuidStates: number
    handleMs: number
    uuidMs: number
    underSecond: boolean
  }
  tamper: {
    mint: number
    traitorNet: number
    handleVerify: number
    handleForgeExponent: number
    handleRatioExponent: number
    handleCompletionExponent: number
    handleForgeWithWitnessesExponent: number
    theoremVerify: number
    theoremForgeExponent: number
    theoremRatioExponent: number
    theoremNeighbourWitnesses: number
    theoremRelatedWitnesses: number
    theoremForgeWithWitnessesExponent: number
    coinVerify: number
    coinForgeExponent: number
    coinRatioExponent: number
    coinNeighbourWitnesses: number
    coinRelatedWitnesses: number
    coinForgeWithWitnessesExponent: number
    sha256CollisionExponent: number
    neighbours: number
    board: number
    coins: number
    handlesPerUuid: number
    handlesPerCoin: number
    rosettaLegs: number
    locateLegs: number
  }
  phd: {
    complete: boolean
    clay: number
    clayKernel: boolean
    gravity: boolean
    demos: boolean
    digestBits: number
    verifyBits: number
    search: number
    drills: number
    keyBits: number
    tagBits: number
    groverFloor: number
    shorTargets: number
    sides: number
    faceBits: number
    occupancyBits: number
    thesisOk: boolean
    receipt: string
    dna: number
    dnaKernel: boolean
    dnaName: boolean
    bases: number
    frame: number
    codons: number
    strands: number
    complementInvolution: boolean
    thesisDrills: number
    thesisRequired: number
  }
}

export type HomeHeroAction = { theme: 'brand' | 'alt'; text: string; link: string }
export type HomeHeroFeature = { title: string; details: string; link: string }

/** Stock VP home hero for a first-time visitor: what this is, what they can do, the next step. Typed YAML on
 *  index.md is a crack, so every figure here is read from the census and every link is a built docs route
 *  (layout-monograph.test.ts checks both: a digit run absent from the census fails, a route with no page fails). */
export function homeHeroOf(census: HomeCensus): {
  name: string
  text: string
  tagline: string
  actions: HomeHeroAction[]
  features: HomeHeroFeature[]
} {
  const n = census.theorems.toLocaleString('en-US')
  // the axiom-free sentence is said of every statement only when the kernel audit covers every statement
  const text = census.axiomFree === census.theorems
    ? `${n} facts, each proved and checked by the Lean kernel with no axiom assumed`
    : `${census.axiomFree.toLocaleString('en-US')} of ${n} facts proved and checked by the Lean kernel with no axiom assumed`
  return {
    name: SITE.name,
    text,
    tagline: `Free to read and free to re-check. Learn from ${census.skills} topics, test a claim against the proofs, or let your AI cite them.`,
    actions: [
      { theme: 'brand', text: 'Start learning', link: '/school' },
      { theme: 'alt', text: 'Check a claim', link: '/trials' },
      { theme: 'alt', text: 'Use it in your AI', link: '/guides#fuse-the-mcp-into-an-agent' },
    ],
    features: [
      {
        title: 'Learn step by step',
        details: `The school walks all ${census.principles} subject wings one lesson at a time, and every lesson is a proof you can drill.`,
        link: '/school',
      },
      {
        title: 'Check a claim',
        details: 'Any statement gets one answer: VERIFIED when a proof in the ledger backs it, UNVERIFIED when none does.',
        link: '/trials',
      },
      {
        title: 'Re-check everything yourself',
        details: `One command line re-runs the Lean kernel over all ${n} proofs on your own machine.`,
        link: '/guides#verify-every-theorem-yourself',
      },
      {
        title: 'Use it in your AI',
        details: 'Add one MCP server and your assistant can search, cite and verify the proofs while it answers you.',
        link: '/mcp',
      },
      {
        title: 'Cite it permanently',
        details: 'Every release is archived under a DOI, and every page has a short handle link that keeps pointing at the same content.',
        link: '/succession#what-is-already-permanent-with-or-without-anyone',
      },
      { title: 'Support the work', details: SITE.sponsor.message, link: '/captain' },
    ],
  }
}

export type AxisBundle = {
  theorems: TheoremsAxis
  topics: TopicsAxis
  rosetta: RosettaAxis
  trials: TrialsAxis
  axioms: AxiomsAxis
  census: HomeCensus
}

let CACHED: AxisBundle | null = null

function thinMember(t: Theorem): AxisMember {
  const a = quantumAura(t.address)
  const la = quantumAura(t.lineAddress)
  const deps = [...dependsOn(t)]
  return {
    key: t.key,
    name: t.name,
    statement: t.statement,
    tex: typeset(t.statement).tex,
    skill: t.skill,
    principle: t.principle,
    aura: { hsl: a.hsl, ray: a.ray },
    lineAura: { hsl: la.hsl, ray: la.ray },
    dependsOn: deps,
    depCount: deps.length,
    gravity: gravityOf(t),
    unbound: isUnbound(t),
  }
}

export function axisMonographs(): AxisBundle {
  if (CACHED) return CACHED
  const LEDGER = theorems()
  const named: Theorem[] = []
  let spanCount = 0
  const spanFiles = new Set<string>()
  for (const t of LEDGER) {
    if (isPagelessFile(t.file)) { spanCount++; spanFiles.add(t.file); continue }
    named.push(t)
  }
  const members = named.map(thinMember)
  const trial = runTrial()
  const presentPrinciples = new Set(LEDGER.map((t) => t.principle))
  const order = PRINCIPLES.map((p) => p[1]).filter((name) => presentPrinciples.has(name))
  // Slug only — composePublication walks every HexSpan theorem into a note and hangs the suite.
  const publicationPath = (file: string): string =>
    '/publications/' + file.replace(/\.lean$/i, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  const fileByPrinciple = new Map<string, string>()
  for (const t of LEDGER) if (!fileByPrinciple.has(t.principle)) fileByPrinciple.set(t.principle, t.file)
  const publicationByPrinciple: Record<string, string | null> = {}
  for (const name of order) {
    const file = fileByPrinciple.get(name)
    publicationByPrinciple[name] = file ? publicationPath(file) : null
  }
  const shor = timeShorFullUse()
  const ms = (ns: number): number => (ns - (ns % 1000000)) / 1000000
  const bySkill = new Map<string, Theorem[]>()
  for (const t of LEDGER) {
    const list = bySkill.get(t.skill)
    if (list) list.push(t)
    else bySkill.set(t.skill, [t])
  }
  const skillNames = [...bySkill.keys()]
  const topics: TopicsAxis = {
    objectKind: 'topics',
    skills: [...bySkill]
      .map(([skill, list]) => ({
        skill,
        count: list.length,
        fold: merkleGravity(list.map((t) => t.address)),
        members: list.filter((t) => !isPagelessFile(t.file)).map((t) => ({ key: t.key, name: t.name, statement: t.statement })),
      }))
      .sort((a, b) => b.count - a.count),
  }
  const roots = LEDGER.map((t) => t.address)
  let axiomHolds = false
  let axiomFree = 0
  try {
    const w = axiomWitness()
    axiomHolds = !!w.holds
    axiomFree = w.axiomFree
  } catch { axiomHolds = false }
  const decided = LEDGER.filter((t) => t.tactic === 'decide').length
  const unboundCount = LEDGER.filter(isUnbound).length
  const axiomsIdx = axiomIndex()
  const fill = fillLattice()
  CACHED = {
    theorems: {
      objectKind: 'theorems',
      total: LEDGER.length,
      members,
      order,
      publicationByPrinciple,
      skills: skillNames,
      trialReceipt: trial.receipt,
      axiomHolds,
      unboundCount,
      span: {
        count: spanCount,
        wings: spanFiles.size,
        door: '/theorem/enumeration_hex4_0000',
        fill: {
          occupied: fill.occupied,
          vacant: fill.vacant,
          theoremsSeated: fill.theoremsSeated,
          axiomsSeated: fill.axiomsSeated,
          problemsSeated: fill.problemsSeated,
          involutionPairs: fill.involution.pairs.length,
        },
      },
    },
    topics,
    rosetta: {
      objectKind: 'rosetta',
      total: LEDGER.length,
      rays: rosettaIndex().map((r) => ({
        ray: r.ray,
        count: r.count,
        fold: r.fold,
        theorems: r.theorems.filter((t) => !isPagelessFile(t.file)).map((t) => ({ key: t.key, name: t.name })),
      })),
    },
    trials: {
      objectKind: 'trials',
      total: LEDGER.length,
      trial: {
        receipt: trial.receipt,
        count: trial.count,
        verified: trial.verified,
        leanBacked: trial.leanBacked,
        orderInvariant: trial.receipt === merkleGravity([...roots].reverse()),
        chainTip: roots.reduce((tip, r) => toUuid(tip + '→' + r), 'axiom'),
      },
    },
    axioms: {
      objectKind: 'axioms',
      totalDefs: axiomsIdx.totalDefs,
      citedDefs: axiomsIdx.citedDefs,
      unusedDefs: axiomsIdx.unusedDefs,
      wings: axiomsIdx.wings,
      axiomHolds,
      entries: axiomsIdx.entries.map((e) => ({
        file: e.file,
        def: e.def,
        principle: e.principle,
        theoremCount: e.theoremCount,
        unused: e.unused,
        theorems: e.theorems.map((t) => ({ key: t.key, name: t.name })),
      })),
    },
    census: {
      objectKind: 'page',
      theorems: LEDGER.length,
      decided,
      otherTactics: LEDGER.length - decided,
      axiomFree,
      principles: order.length,
      skills: skillNames.length,
      shor: {
        chunkQubits: shor.chunkQubits,
        chunkStates: shor.chunkStates,
        handleChunks: shor.handleChunks,
        uuidChunks: shor.uuidChunks,
        handleStates: shor.handleStates,
        uuidStates: shor.uuidStates,
        handleMs: ms(shor.handleNs),
        uuidMs: ms(shor.uuidNs),
        underSecond: shor.underSecond,
      },
      tamper: (() => {
        const t = tamperCosts()
        return {
          mint: t.mint,
          traitorNet: t.traitorNet,
          handleVerify: t.handle.verify,
          handleForgeExponent: t.handle.forgeExponent,
          handleRatioExponent: t.handle.ratioExponent,
          handleCompletionExponent: t.handle.completionExponent ?? 0,
          handleForgeWithWitnessesExponent: t.handle.forgeWithWitnessesExponent,
          theoremVerify: t.theorem.verify,
          theoremForgeExponent: t.theorem.forgeExponent,
          theoremRatioExponent: t.theorem.ratioExponent,
          theoremNeighbourWitnesses: t.theorem.neighbourWitnesses,
          theoremRelatedWitnesses: t.theorem.relatedWitnesses,
          theoremForgeWithWitnessesExponent: t.theorem.forgeWithWitnessesExponent,
          coinVerify: t.coin.verify,
          coinForgeExponent: t.coin.forgeExponent,
          coinRatioExponent: t.coin.ratioExponent,
          coinNeighbourWitnesses: t.coin.neighbourWitnesses,
          coinRelatedWitnesses: t.coin.relatedWitnesses,
          coinForgeWithWitnessesExponent: t.coin.forgeWithWitnessesExponent,
          sha256CollisionExponent: t.sha256CollisionExponent,
          neighbours: t.neighbours,
          board: t.board,
          coins: t.coins,
          handlesPerUuid: t.handlesPerUuid,
          handlesPerCoin: t.handlesPerCoin,
          rosettaLegs: t.rosettaLegs,
          locateLegs: t.locateLegs,
        }
      })(),
      phd: (() => {
        const p = phdProofs()
        return {
          complete: p.complete,
          clay: p.concept.clay,
          clayKernel: p.concept.clayKernel,
          gravity: p.concept.gravity,
          demos: p.concept.demos,
          digestBits: p.work.digestBits,
          verifyBits: p.work.verifyBits,
          search: p.work.search,
          drills: p.work.drills,
          keyBits: p.work.keyBits,
          tagBits: p.work.tagBits,
          groverFloor: p.work.groverFloor,
          shorTargets: p.work.shorTargets,
          sides: p.work.sides,
          faceBits: p.work.faceBits,
          occupancyBits: p.work.occupancyBits,
          thesisOk: p.thesis.ok,
          receipt: p.receipt,
          dna: p.concept.dna,
          dnaKernel: p.concept.dnaKernel,
          dnaName: p.concept.dnaName,
          bases: p.work.bases,
          frame: p.work.frame,
          codons: p.work.codons,
          strands: p.work.strands,
          complementInvolution: p.work.complementInvolution,
          thesisDrills: p.work.thesisDrills,
          thesisRequired: p.work.thesisRequired,
        }
      })(),
    },
  }
  return CACHED
}

/** Slice of the census that THIS markdown path is the monograph of. Other URLs get none. */
export function axisForRelativePath(relativePath: string): { axis?: object; census?: HomeCensus; objectKind?: string } {
  const rel = relativePath.replace(/\\/g, '/')
  if (rel !== 'theorems.md' && rel !== 'topics.md' && rel !== 'rosetta.md' && rel !== 'trials.md' && rel !== 'axioms.md' && rel !== 'index.md') {
    return {}
  }
  const bundle = axisMonographs()
  if (rel === 'theorems.md') return { axis: bundle.theorems, objectKind: 'theorems' }
  if (rel === 'topics.md') return { axis: bundle.topics, objectKind: 'topics' }
  if (rel === 'rosetta.md') return { axis: bundle.rosetta, objectKind: 'rosetta' }
  if (rel === 'trials.md') return { axis: bundle.trials, objectKind: 'trials' }
  if (rel === 'axioms.md') return { axis: bundle.axioms, objectKind: 'axioms' }
  if (rel === 'index.md') return { census: bundle.census, objectKind: 'page' }
  return {}
}
