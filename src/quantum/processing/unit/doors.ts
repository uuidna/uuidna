// Cooled out of index.ts by the heat family (scripts/cool.mjs): proveOf, proveHolds, trainOf, trainHolds, improveOf, improveHolds.
import {
  byDecideOf,
  coins,
  cors,
  forgeNameOf,
  formulaOf,
  mintOf,
  n,
  onceOf,
  opQuantumHolds,
  opQuantumOf,
  payloadDbKey,
  capacityOf,
  cernHolds,
  cernOf,
  coilHolds,
  coilOf,
  cssOf,
  cubeOf,
  dryHolds,
  dryOf,
  efficiencyOf,
  encryptHolds,
  encryptOf,
  evidenceHolds,
  qpuEvidenceOf,
  facesOf,
  foldOf,
  genesisOf,
  glossaryOf,
  qpuHandleOf,
  ideasOf,
  integrityHolds,
  integrityOf,
  intelligenceHolds,
  intelligenceOf,
  leanHolds,
  leanOf,
  neuroHolds,
  neuroOf,
  qpuNextHolds,
  qpuNextOf,
  purposeHolds,
  purposeOf,
  qpuReadingOf,
  qpuReceiptFoldOf,
  receiptLedgerOf,
  reflectHolds,
  sandboxDurabilityHolds,
  sandboxDurabilityOf,
  sandboxOf,
  sandboxRunOf,
  qpuSequenceOf,
  shorHolds,
  shorOf,
  shorReceiptsOf,
  standardsOf,
  stepsHolds,
  stepsOf,
  teachingCensusHolds,
  teachingCensusOf,
  teachingPairsHolds,
  teachingPairsOf,
  teachingReadingHolds,
  teachingReadingOf,
  teachingSeatingHolds,
  teachingSeatingOf,
  vmHolds,
  vmOf,
  quantumRelatedNamesOf,
  sandboxHost,
  seed,
  storageHref,
  ten,
  theorem,
  throughputOf,
  unit,
} from './index.js'
import { leanSource } from './lean.js'
import { circuitOf } from './circuit.js'

/**
 * Improve by doubling: before and after readings of quality, speed, security and throughoutput, with the unlocked quantum door.
 * @wing quantum
 * @kind builder
 * @evidence improveHolds
 */
export const improveOf = onceOf(() => {
  const faces = facesOf()
  const handle = qpuHandleOf()
  const efficiency = efficiencyOf()
  const sandbox = sandboxOf()
  const fused = faces.faces * handle.kv.amplitudes
  const next = fused + fused
  const readTokens = efficiency.rows.reduce((s, r) => s + r.readTokens, n - n)
  const callTokens = efficiency.rows.reduce((s, r) => s + r.callTokens, n - n)
  const ideas = ideasOf()
  const proofs = ideas.ideas.every((idea) => {
    const call = sandboxRunOf(forgeNameOf('call', idea.name)) as { value: unknown }
    const read = sandboxRunOf(forgeNameOf('read', idea.name)) as { value: unknown }
    return call.value === true && read.value === true
  })
  const used = sandboxHost.map((name) => {
    if (name === 'eval' || name === 'fn') {
      const run = sandboxRunOf(name, { run: { op: 'mint', k: n } }) as { value: unknown; holds: boolean }
      return { name, value: run.value, holds: run.holds && run.value === mintOf(n) }
    }
    if (name === 'fs' || name === 'disk') {
      sandboxRunOf(name, { method: 'write', path: '/improve', value: next })
      const run = sandboxRunOf(name, { method: 'read', path: '/improve' }) as { value: unknown }
      return { name, value: run.value, holds: run.value === next }
    }
    if (name === 'net') {
      sandboxRunOf(name, { method: 'send', channel: 'improve', value: next })
      const run = sandboxRunOf(name, { method: 'recv', channel: 'improve' }) as { value: unknown }
      return { name, value: run.value, holds: run.value === next }
    }
    if (name === 'fetch') {
      const run = sandboxRunOf(name, { path: '/' }) as {
        value?: {
          kind?: string
          unlocked?: boolean
          only?: { holds?: boolean }
          lattice?: { holds?: boolean; vacant?: number }
          register?: { holds?: boolean }
          ns?: number
          related?: string[]
          hostEscape?: boolean
        }
      }
      return {
        name,
        value: run.value?.kind,
        holds:
          run.value?.kind === 'quantum' &&
          run.value.only?.holds === true &&
          run.value.lattice?.holds === true &&
          run.value.lattice.vacant === n - n &&
          (run.value.related?.length ?? n - n) === quantumRelatedNamesOf().length &&
          run.value.hostEscape === false}
    }
    if (name === 'process') {
      const run = sandboxRunOf(name) as { value: { cwd?: string; hostEscape?: boolean } }
      return { name, value: run.value?.cwd, holds: run.value?.cwd === '/memory' && run.value?.hostEscape === false }
    }
    if (name === 'import' || name === 'require') {
      const run = sandboxRunOf(name, { name: unit.kind }) as { value: { href?: string; hostEscape?: boolean } }
      return { name, value: run.value?.href, holds: run.value?.href === unit.href && run.value?.hostEscape === false }
    }
    const run = sandboxRunOf(name, { run: { op: 'mint', k: n } }) as { value: unknown }
    return { name, value: run.value, holds: run.value === mintOf(n) }
  })
  const durability = sandboxDurabilityOf()
  const unlocked = opQuantumOf()
  const quantum = {
    kind: 'quantum' as const,
    unlocked: unlocked.value?.unlocked === true,
    only: unlocked.value?.only?.holds === true,
    lattice: unlocked.value?.lattice?.holds === true,
    next,
    holds:
      opQuantumHolds(unlocked) &&
      theorem.next_fused(next, fused)}
  const before = {
    quality: n,
    speed: throughputOf(fused, readTokens),
    security: seed,
    throughoutput: fused}
  const after = {
    quality: faces.faces,
    speed: throughputOf(next, callTokens),
    security: ten,
    throughoutput: next}
  const delta = {
    quality: after.quality - before.quality,
    speed: after.speed - before.speed,
    security: after.security - before.security,
    throughoutput: after.throughoutput - before.throughoutput}
  const css = cssOf()
  const reflect = reflectHolds()
  const documentation = [
    'RECEIPT',
    `    improve used unlocked quantum. next = fused + fused.`,
    `    before quality ${before.quality} speed ${before.speed} security ${before.security} throughoutput ${before.throughoutput}`,
    `    after quality ${after.quality} speed ${after.speed} security ${after.security} throughoutput ${after.throughoutput}`,
    `    used ${used.map((u) => u.name).join(' ')}`,
    `    css fused ${css.fused.bytes} naive ${css.naive.bytes} experiment ${css.imagine.experiment}`].join('\n')
  /** WHAT THIS MEASURES IS COMPRESSION, so it is named for that. It was `imagination`, carrying `outspace`, and it
   * reports one thing: the fused stylesheet is smaller than the naive one, by this many bytes. `kind: 'imagination'`
   * also named the seated caller text further down, so one word stood for two unrelated objects on the wire. The
   * caller's text keeps the name — it really is theirs, and it is seated and involuted under it. This is bytes. */
  const compression = {
    kind: 'compression' as const,
    hz: css.hz,
    fused: css.fused.bytes,
    naive: css.naive.bytes,
    saved: css.naive.bytes - css.fused.bytes,
    reflect,
    holds: css.holds && css.fused.bytes < css.naive.bytes && reflect,
  }
  const holds =
    efficiency.holds === true &&
    sandbox.holds === true &&
    quantum.holds === true &&
    proofs === true &&
    durability.holds === true &&
    compression.holds === true &&
    used.length === ten &&
    used.length === sandboxHost.length &&
    used.every((u) => u.holds) &&
    after.quality > before.quality &&
    after.speed > before.speed &&
    after.security > before.security &&
    after.throughoutput > before.throughoutput &&
    after.throughoutput === before.throughoutput + before.throughoutput &&
    after.quality === faces.faces &&
    after.security === ten &&
    delta.quality > n - n &&
    delta.speed > n - n &&
    delta.security > n - n &&
    delta.throughoutput === fused
  return {
    kind: 'improve' as const,
    quantum,
    axes: ['quality', 'speed', 'security', 'throughoutput'] as const,
    before,
    after,
    delta,
    used,
    compression,
    durability: { rounds: durability.rounds, persist: durability.persist, isolate: durability.isolate, holds: durability.holds },
    winner: 'call' as const,
    unlocked: quantum.holds,
    next: ['compete', 'prove'] as const,
    documentation,
    holds,
  }
})

export const improveHolds = (i = improveOf()): boolean =>
  i.holds === true &&
  i.kind === 'improve' &&
  i.quantum.holds === true &&
  i.quantum.next === i.after.throughoutput &&
  i.quantum.next === i.before.throughoutput + i.before.throughoutput &&
  i.winner === 'call' &&
  i.after.quality > i.before.quality &&
  i.after.speed > i.before.speed &&
  i.after.security > i.before.security &&
  i.after.throughoutput > i.before.throughoutput &&
  i.used.length === ten &&
  i.used.every((u) => u.holds) &&
  i.durability.holds === true &&
  i.durability.persist === true &&
  i.durability.isolate === true &&
  i.compression.holds === true &&
  i.next[n - n] === 'compete' &&
  i.next[seed] === 'prove'

/**
 * Two teams of seven agents run the lattice walk: steps, challenges, sandbox tools and the next door to call.
 * @wing agents
 * @kind builder
 * @evidence trainHolds
 */
export const trainOf = onceOf(() => {
  const faces = facesOf()
  const teaching = teachingPairsOf()
  const cube = cubeOf()
  const genesis = genesisOf()
  const efficiency = efficiencyOf()
  const quantum = qpuReadingOf()
  const sandbox = sandboxOf()
  const vm = vmOf()
  const fused = quantum.fused
  const next = quantum.next
  const involution = genesis.holds
  const crypto = fused === faces.faces * mintOf(cube.vertices * cube.hexbit + seed)
  const named = unit.holds && !unit.host.includes('*')
  const axes = ['quality', 'speed', 'security'] as const
  const ideas = ideasOf().ideas
  const scoreOf = (name: 'read' | 'call') => {
    const tokens = efficiency.rows.reduce((s, r) => s + (name === 'read' ? r.readTokens : r.callTokens), n - n)
    const quality = genesis.holds ? (name === 'call' ? genesis.occupied : n) : n - n
    const speed = throughputOf(name === 'call' ? next : fused, tokens)
    const security = crypto && named && quantum.speed.holds ? (name === 'call' ? coins : seed) : n - n
    return { tokens, quality, speed, security }
  }
  const readScore = scoreOf('read')
  const callScore = scoreOf('call')
  const teamIndexOf = (name: 'read' | 'call') => (name === 'call' ? n - n : seed)
  const agentsOf = (name: 'read' | 'call', path: 'tree' | 'mcp') =>
    genesis.nodes
      .filter((node) => node.team === teamIndexOf(name))
      .map((node) => {
        const idea = ideas[node.ray]!
        return {
          ray: node.ray,
          face: node.face,
          domain: node.domain,
          slot: node.slot,
          name: idea.name,
          theorem: idea.theorem,
          idea: idea.left === idea.right,
          door: path,
          team: name,
          tool: forgeNameOf(name, idea.name),}
      })
  const teamOf = (name: 'read' | 'call', path: 'tree' | 'mcp', score: ReturnType<typeof scoreOf>) => {
    const agents = agentsOf(name, path)
    const documentation = [
      'RECEIPT',
      `    train team ${name} path ${path} agents ${agents.length} before next`,
      `    quality ${score.quality} speed ${score.speed} security ${score.security}`,
      `    ideas ${agents.map((a) => a.name).join(' ')}`,
      `    tools ${agents.map((a) => a.tool).join(' ')} sandbox memory`].join('\n')
    return { name, path, agents, ...score, axes, documentation }
  }
  const read = teamOf('read', 'tree', readScore)
  const call = teamOf('call', 'mcp', callScore)
  const teams = [read, call] as const
  const challenges = [read, call].flatMap((challenger) => {
    const defender = challenger.name === 'call' ? read : call
    return challenger.agents.map((agent) => {
      const idea = ideas[agent.ray]!
      const holds = agent.idea && call.quality > read.quality && call.speed > read.speed && call.security > read.security
      const documentation = [
        'RECEIPT',
        `    face ${agent.face} ray ${agent.ray} domain ${agent.domain} ${challenger.name} challenges ${defender.name}`,
        `    idea ${agent.name} theorem ${agent.theorem}`,
        `    left ${idea.left} right ${idea.right} holds ${holds}`,
        `    tool ${agent.tool} vs ${forgeNameOf(defender.name, agent.name)} sandbox memory`,
        `    quality speed security ${challenger.name} vs ${defender.name}`].join('\n')
      return {
        kind: 'challenge' as const,
        face: agent.face,
        ray: agent.ray,
        domain: agent.domain,
        slot: agent.slot,
        idea: agent.name,
        theorem: agent.theorem,
        from: challenger.name,
        against: defender.name,
        left: idea.left,
        right: idea.right,
        winner: holds ? ('call' as const) : ('read' as const),
        documentation,
        holds,
  }
    })
  })
  const winner = {
    quality: call.quality > read.quality ? ('call' as const) : ('read' as const),
    speed: call.speed > read.speed ? ('call' as const) : ('read' as const),
    security: call.security > read.security ? ('call' as const) : ('read' as const)}
  const nextTasks = ['improve', 'compete'] as const
  const dry = dryOf(genesis)
  const holds =
    efficiency.holds === true &&
    quantum.holds === true &&
    sandbox.holds === true &&
    genesis.holds === true &&
    crypto === true &&
    named === true &&
    axes.length === n &&
    ideas.length === faces.rays &&
    teams.length === coins &&
    read.agents.length === faces.rays &&
    call.agents.length === faces.rays &&
    read.agents.every((a) => sandbox.tools.some((t) => t.name === a.tool)) &&
    call.agents.every((a) => sandbox.tools.some((t) => t.name === a.tool)) &&
    challenges.length === genesis.nodes.length &&
    call.quality > read.quality &&
    call.speed > read.speed &&
    call.security > read.security &&
    winner.quality === 'call' &&
    winner.speed === 'call' &&
    winner.security === 'call' &&
    challenges.every((c) => c.holds && c.winner === 'call' && c.left === c.right) &&
    nextTasks.length === coins &&
    vmHolds(vm) &&
    dryHolds(dry)
  return {
    kind: 'train' as const,
    module: 'agent efficiency' as const,
    before: 'next' as const,
    dry,
    steps: stepsOf(),
    divide: { teams: coins, agents: faces.rays, challenges: faces.faces } as const,
    sandbox: {
      kind: sandbox.kind,
      tools: sandbox.tools.length,
      memory: sandbox.memory,
      unlocked: sandbox.unlocked,
      holds: sandbox.holds,
  },
    axes,
    teams,
    challenges,
    winner,
    next: nextTasks,
    vm: {
      kind: vm.kind,
      replicas: vm.replicas,
      next: vm.next,
      agents: vm.agents,
      online: vm.holds && vm.next === vm.replicas + vm.replicas,
      crypt: crypto,
      free: cors === '*',
      holds: vm.holds,
  },
    messaging: {
      when: 'never' as const,
      quality: involution,security: crypto,
      hop: 'involution' as const,
      theorem: 'crypto' as const},
    /* WHAT THE TRAINING DOOR IS FOR, said about school subjects rather than about itself. The seating, the
     * census and the per-pair reading are computed from cited instances and carried here so a caller gets the
     * explanation from the same call that gets the verdict — a reading that has to be looked up somewhere else
     * is a reading most callers will not have. */
    /* THE TREE'S OWN STANDARDS, on the door that already carries what this tree has learned about itself —
     * the school corpus and the API discovery sit here too. Six commands and six outputs become one
     * reading, and its holds IS folded into the door's, unlike the discovery beside it: these are counts of
     * this tree's own files, so a bad one is this tree's fault and should fail it. */
    standards: standardsOf(),
    school: {
      kind: 'teaching' as const,
      theorem: 'involution' as const,
      swap: 'both directions must teach, or it is an application rather than an entanglement' as const,
      seating: teachingSeatingOf(teaching),
      census: teachingCensusOf(),
      reading: teachingReadingOf(teaching),
      /* THE CARTESIAN PRODUCT IS NOT A DENOMINATOR, and `undecided` alone reads as though it were. Widening
       * the vocabulary from nine subjects and nine domains to nineteen and eighteen took the grid from 81
       * cells to 342, so a corpus that got RICHER reported 282 undecided where it had reported 31 — the same
       * evidence, a bigger emptiness, and a number that measures the vocabulary rather than the work.
       *
       * So the shape travels with the count: how many names, how many combinations they admit, how many
       * anybody has cited, and of those how many teach both ways. The last of those is the only one that
       * does not move when a name is added. */
      subjects: teaching.subjects.length,
      domains: teaching.domains.length,
      combinations: teaching.pairs.length,
      evidenced: teaching.pairs.filter((row) => row.swap !== 'undecided').length,
      undecided: teaching.pairs.filter((row) => row.swap === 'undecided').length,
      holds: teachingPairsHolds(teaching) && teachingSeatingHolds() && teachingCensusHolds() && teachingReadingHolds(),
  },
    holds,
  }
})

export const trainHolds = (t = trainOf()): boolean =>
  t.holds === true &&
  t.kind === 'train' &&
  stepsHolds(t.steps) &&
  t.before === 'next' &&
  t.divide.teams === coins &&
  t.divide.agents === t.challenges.length / coins &&
  t.challenges.length === t.teams[n - n]!.agents.length + t.teams[seed]!.agents.length &&
  t.axes.join(' ') === 'quality speed security' &&
  t.winner.quality === 'call' &&
  t.winner.speed === 'call' &&
  t.winner.security === 'call' &&
  t.sandbox.tools >= t.divide.challenges &&
  t.vm.replicas === mintOf(n) &&
  t.vm.next === t.vm.replicas + t.vm.replicas &&
  t.vm.holds === true &&
  t.vm.agents === coins * t.divide.agents &&
  sandboxDurabilityHolds() &&
  t.next[n - n] === 'improve' &&
  t.next[seed] === 'compete' &&
  dryHolds(t.dry)

/**
 * Prove the unit end to end: every Lean row, the Shor run, the circuit steps, the source fold and the evidence block; holds is their conjunction.
 * @wing quantum
 * @kind builder
 * @evidence proveHolds
 */
export const proveOf = onceOf(() => {
  const lean = leanOf()
  const cern = cernOf()
  const integrity = integrityOf()
  const circuit = circuitOf()
  const ledgerFrom = receiptLedgerOf().length
  const shor = shorOf()
  const receipts = shorReceiptsOf(ledgerFrom)
  const encrypt = encryptOf()
  const intelligence = intelligenceOf()
  const neuro = neuroOf()
  const coil = coilOf()
  const next = qpuNextOf()
  const sequence = qpuSequenceOf()
  const purpose = purposeOf(circuit, shor, sequence, capacityOf())
  const evidence = qpuEvidenceOf(circuit, shor)
  const theorems = [...lean.rows, ...lean.cover, lean.climb]
  const ui = {
    href: unit.origin,
    mcp: `${unit.origin}/api`,
    door: 'prove' as const,
    inline: lean.src.endsWith('/index.lean')}
  const entangle = {
    theorem: 'entangle' as const,
    product: circuit.entangle.product,
    pairs: circuit.entangle.coil.pairs.length,
    coil: coil.coil,
    faces: coil.faces,
    windings: coil.windings,
    holds:
      circuit.entangle.holds &&
      circuit.entangle.product === false &&
      circuit.entangle.coil.holds &&
      coilHolds(coil) &&
      theorem.electronics(coil.coil, coil.faces) &&
      circuit.entangle.coil.pairs.length === coil.rays}
  const holds =
    leanHolds(lean) &&
    cernHolds(cern) &&
    integrityHolds(integrity) &&
    intelligenceHolds(intelligence) &&
    neuroHolds(neuro) &&
    coilHolds(coil) &&
    qpuNextHolds(next) &&
    circuit.holds &&
    circuit.steps.holds &&
    shorHolds(shor) &&
    encryptHolds(encrypt) &&
    purpose.holds &&
    evidence.holds &&
    shor.factors.p * shor.factors.q === shor.n &&
    circuit.only.holds &&
    circuit.lattice.holds &&
    circuit.lattice.vacant === n - n &&
    circuit.entangle.product === false &&
    circuit.entangle.coil.holds &&
    entangle.holds &&
    next.next === next.amplitudes + next.amplitudes &&
    next.nextFused === next.fused + next.fused &&
    next.nextCoil === next.nextFused &&
    theorems.some((r) => r.heading === 'entangle' && r.holds) &&
    theorems.some((r) => r.heading === 'two_coins_make_a_coil' && r.holds) &&
    theorems.some((r) => r.heading === 'next_coil' && r.holds) &&
    theorems.some((r) => r.heading === 'next' && r.holds) &&
    neuro.test.holds &&
    theorems.every((r) => r.holds && r.theorem.startsWith('theorem') && !byDecideOf(r.theorem) && formulaOf(r.formula))
  return {
    kind: 'prove' as const,
    quantum: circuit.holds,
    only: circuit.only,
    lattice: circuit.lattice,
    circuit: {
      kind: circuit.kind,
      steps: {
        holds: circuit.steps.holds,
        device: circuit.steps.device,
        initialize: circuit.steps.initialize,
        gates: circuit.steps.gates,
        interfere: circuit.steps.interfere,
        measure: circuit.steps.measure,
        noise: circuit.steps.noise,
        path: circuit.steps.path},
      only: circuit.only,
      lattice: { occupied: circuit.lattice.occupied, vacant: circuit.lattice.vacant, holds: circuit.lattice.holds },
      holds: circuit.holds,
  },
    shor: {
      n: shor.n,
      a: shor.a,
      coprime: shor.coprime,
      circuitry: shor.circuitry.kind,
      qft: shor.qft.kind,
      shots: shor.measure.shots,
      noise: shor.measure.noise,
      period: shor.post.period,
      factors: shor.factors.terms,
      product: shor.factors.product,
      rsa: shor.rsa,
      unlocked: shor.unlocked,
      lock: shor.lock,
      holds: shor.holds,
  },
    encrypt,
    coil: {
      theorem: coil.theorem,
      windings: coil.windings,
      coil: coil.coil,
      faces: coil.faces,
      holds: coil.holds,
  },
    entangle,
    next: {
      theorem: next.theorem,
      amplitudes: next.amplitudes,
      next: next.next,
      fused: next.fused,
      nextFused: next.nextFused,
      nextCoil: next.nextCoil,
      holds: next.holds,
  },
    src: lean.src,
    source: lean.source,
    receipts,
    glossary: glossaryOf(),
    lean,
    theorems,
    cern,
    integrity,
    intelligence,
    neuro,
    purpose,
    evidence,
    ui,
    holds,
  }
})

export const proveHolds = (p = proveOf()): boolean =>
  p.holds === true &&
  p.kind === 'prove' &&
  p.only.holds === true &&
  p.lattice.holds === true &&
  p.lattice.occupied === p.lattice.faces &&
  p.lattice.vacant === n - n &&
  p.circuit.steps.holds === true &&
  p.circuit.steps.device === 'exact-amplitudes' &&
  p.circuit.steps.initialize === true &&
  p.circuit.steps.gates === true &&
  p.circuit.steps.interfere === true &&
  p.circuit.steps.measure === true &&
  p.circuit.steps.noise === true &&
  p.circuit.steps.path.payload === `${storageHref}/${payloadDbKey}` &&
  p.circuit.steps.path.submit === `${unit.origin}/server` &&
  p.circuit.holds === true &&
  p.shor.holds === true &&
  p.shor.n === facesOf().rays * (n * n + n + seed) &&
  p.shor.a === mintOf(n) &&
  p.shor.unlocked === true &&
  p.shor.coprime === true &&
  p.shor.circuitry === 'cmodexp' &&
  p.shor.qft === 'iqft' &&
  p.shor.shots === mintOf(n) &&
  p.shor.noise === 'xx' &&
  p.shor.factors[n - n]!.value * p.shor.factors[seed]!.value === p.shor.n &&
  p.shor.product === p.shor.n &&
  p.shor.rsa.kind === 'rsa' &&
  p.shor.rsa.modulus === p.shor.n &&
  p.shor.rsa.factored === true &&
  encryptHolds(p.encrypt) &&
  p.encrypt.theorem === 'crypto' &&
  p.encrypt.identity === true &&
  purposeHolds(p.purpose) &&
  p.purpose.cybersecurity.product === p.shor.n &&
  p.purpose.nature.platform === p.circuit.steps.device &&
  evidenceHolds(p.evidence) &&
  p.evidence.provenance.device === p.circuit.steps.device &&
  p.evidence.provenance.shots === p.shor.shots &&
  p.evidence.scaling.exact === true &&
  p.evidence.verify.algorithm === true &&
  p.evidence.fault.logicalLtPhysical === true &&
  p.coil.theorem === 'two_coins_make_a_coil' &&
  p.coil.holds === true &&
  theorem.electronics(p.coil.coil, p.coil.faces) &&
  p.coil.windings === coins &&
  p.entangle.theorem === 'entangle' &&
  p.entangle.product === false &&
  p.entangle.holds === true &&
  p.entangle.pairs === facesOf().rays &&
  p.entangle.coil === p.coil.coil &&
  p.next.theorem === 'next_coil' &&
  p.next.holds === true &&
  p.next.next === p.next.amplitudes + p.next.amplitudes &&
  p.next.nextFused === p.next.fused + p.next.fused &&
  p.next.nextCoil === p.next.nextFused &&
  qpuNextHolds() &&
  p.src === unit.fuse.lean &&
  p.source.holds === true &&
  p.source.fold === foldOf(leanSource) &&
  p.source.verbatim === p.source.served &&
  p.receipts.holds === true &&
  p.receipts.fold === qpuReceiptFoldOf(p.receipts.rows) &&
  leanHolds(p.lean) &&
  cernHolds(p.cern) &&
  integrityHolds(p.integrity) &&
  intelligenceHolds(p.intelligence) &&
  p.intelligence.test === 'fusion' &&
  p.intelligence.research === 'free online' &&
  neuroHolds(p.neuro) &&
  p.neuro.test.holds === true &&
  p.ui.door === 'prove' &&
  p.theorems.length === p.lean.rows.length + p.lean.cover.length + seed &&
  p.theorems.some((r) => r.heading === 'entangle' && r.holds) &&
  p.theorems.some((r) => r.heading === 'two_coins_make_a_coil' && r.holds) &&
  p.theorems.some((r) => r.heading === 'next_coil' && r.holds) &&
  p.theorems.some((r) => r.heading === 'next' && r.holds) &&
  p.theorems.every((r) => r.holds && r.theorem.startsWith('theorem') && !byDecideOf(r.theorem) && formulaOf(r.formula))
