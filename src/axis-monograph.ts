// axis-monograph — the census of one URL, not a second template. TypeScript computes; VitePress attaches.
//
// A URL is a monograph: ObjectPage + params. Listing routes (/theorems, /topics, /rosetta, /trials, home)
// were importing ledger.data as a live query over every theorem (statement + lean, tripled into groups).
// That is entropy: the same census on Layout, on indexes, and named "monograph" only for /publications.
//
// Naming: publication = audited domain prose. principle = derivation wing. skill = capability axis.
// monograph = any URL's relations + body. Layout never reads this module; transformPageData attaches
// only the slice that URL is.
import { theorems, runTrial, PRINCIPLES, rosettaIndex, dependsOn, gravityOf, isUnbound, axiomIndex, type Theorem } from './theorems/index.js'
import { axiomWitness } from './axiom-witness.js'
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'
import { publications } from './publish.js'
import { quantumAura } from './aura.js'
import { timeShorFullUse } from './os/host/index.js'
import { phdProofs } from './phd-proofs.js'
import { tamperCosts } from './tamper-cost.js'

export type AxisMember = {
  key: string
  name: string
  statement: string
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
    theoremVerify: number
    theoremForgeExponent: number
    theoremRatioExponent: number
    coinVerify: number
    coinForgeExponent: number
    coinRatioExponent: number
    sha256CollisionExponent: number
    neighbours: number
    board: number
    coins: number
  }
  phd: {
    complete: boolean
    clay: number
    clayDecide: boolean
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
    dnaDecide: boolean
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
  const members = LEDGER.map(thinMember)
  const trial = runTrial()
  const order = PRINCIPLES.map((p) => p[1]).filter((name) => LEDGER.some((t) => t.principle === name))
  const publicationByFile = Object.fromEntries(publications().map((p) => [p.file, p.slug]))
  const publicationByPrinciple: Record<string, string | null> = {}
  for (const name of order) {
    const file = LEDGER.find((t) => t.principle === name)?.file
    const slug = file ? publicationByFile[file] : undefined
    publicationByPrinciple[name] = slug ? `/publications/${slug}` : null
  }
  const skillNames = [...new Set(LEDGER.map((t) => t.skill))]
  const shor = timeShorFullUse()
  const ms = (ns: number): number => (ns - (ns % 1000000)) / 1000000
  const topics: TopicsAxis = {
    objectKind: 'topics',
    skills: skillNames
      .map((skill) => {
        const list = LEDGER.filter((t) => t.skill === skill)
        return {
          skill,
          count: list.length,
          fold: merkleGravity(list.map((t) => t.address)),
          members: list.map((t) => ({ key: t.key, name: t.name, statement: t.statement })),
        }
      })
      .sort((a, b) => b.count - a.count),
  }
  const roots = LEDGER.map((t) => t.address)
  let axiomHolds = false
  try { axiomHolds = !!axiomWitness().holds } catch { axiomHolds = false }
  const unboundCount = LEDGER.filter(isUnbound).length
  const axiomsIdx = axiomIndex()
  CACHED = {
    theorems: {
      objectKind: 'theorems',
      total: members.length,
      members,
      order,
      publicationByPrinciple,
      skills: skillNames,
      trialReceipt: trial.receipt,
      axiomHolds,
      unboundCount,
    },
    topics,
    rosetta: {
      objectKind: 'rosetta',
      total: members.length,
      rays: rosettaIndex().map((r) => ({
        ray: r.ray,
        count: r.count,
        fold: r.fold,
        theorems: r.theorems.map((t) => ({ key: t.key, name: t.name })),
      })),
    },
    trials: {
      objectKind: 'trials',
      total: members.length,
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
      theorems: members.length,
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
          theoremVerify: t.theorem.verify,
          theoremForgeExponent: t.theorem.forgeExponent,
          theoremRatioExponent: t.theorem.ratioExponent,
          coinVerify: t.coin.verify,
          coinForgeExponent: t.coin.forgeExponent,
          coinRatioExponent: t.coin.ratioExponent,
          sha256CollisionExponent: t.sha256CollisionExponent,
          neighbours: t.neighbours,
          board: t.board,
          coins: t.coins,
        }
      })(),
      phd: (() => {
        const p = phdProofs()
        return {
          complete: p.complete,
          clay: p.concept.clay,
          clayDecide: p.concept.clayDecide,
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
          dnaDecide: p.concept.dnaDecide,
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
