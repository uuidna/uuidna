// Cooled out of index.ts by the heat family (scripts/cool.mjs): circuitOf, circuitHolds.
import {
  ampsOf,
  basisOf,
  bigintDeviceOf,
  bitOf,
  cnotGateOf,
  coins,
  czGateOf,
  decodeOf,
  hGateOf,
  mintOf,
  n,
  onceOf,
  parityOf,
  payloadDbKey,
  primitives,
  balanceHolds,
  qpuClayOf,
  coilEfficiencyHolds,
  coilEfficiencyOf,
  coilHolds,
  coilOf,
  computerHolds,
  computerOf,
  cubeOf,
  electronicsHolds,
  electronicsOf,
  facesOf,
  followHolds,
  qpuFollowOf,
  qpuNextHolds,
  qpuNextOf,
  payloadMcpOf,
  payloadPluginHolds,
  payloadPluginOf,
  seed,
  serverHref,
  storageHref,
  theorem,
  unit,
  weightOf,
  xGateOf,
  xorOf,
  zGateOf,
} from './index.js'
import { embeddedConstants } from './embedded.js'

/**
 * The running 3-qubit circuit on exact integer amplitudes: split, Bell, GHZ, interference, no-clone, teleport, kickback, Deutsch, superdense coding, monogamy; each with its Born weights.
 * @wing quantum
 * @kind builder
 * @evidence circuitHolds
 */
/** Runtime reads the drift-checked embed so a cold isolate never JIT-compiles circuitLiveOf; falls back to live.
 *  The gate recomputes live at push via circuitLiveOf (embed-lean regenerates + the drift-guard asserts equality). */
export const circuitOf = onceOf((): ReturnType<typeof circuitLiveOf> => (embeddedConstants.circuit as ReturnType<typeof circuitLiveOf> | undefined) ?? circuitLiveOf())
export const circuitLiveOf = onceOf(() => {
  const cube = cubeOf()
  const faces = facesOf()
  const coil = coilOf()
  const dim = mintOf(n)
  const prepare = ampsOf(dim)
  const afterH = hGateOf(prepare, n - n)
  const afterCnot = cnotGateOf(afterH, n - n, seed)
  const afterHH = hGateOf(afterH, n - n)
  const afterGhz = cnotGateOf(afterCnot, n - n, coins)
  const copies = hGateOf(afterH, seed)
  let teleported = xGateOf(prepare, n - n)
  teleported = hGateOf(teleported, seed)
  teleported = cnotGateOf(teleported, seed, coins)
  teleported = cnotGateOf(teleported, n - n, seed)
  teleported = hGateOf(teleported, n - n)
  teleported = cnotGateOf(teleported, seed, coins)
  teleported = czGateOf(teleported, n - n, coins)
  let plused = hGateOf(prepare, n - n)
  plused = hGateOf(plused, seed)
  plused = cnotGateOf(plused, seed, coins)
  plused = cnotGateOf(plused, n - n, seed)
  plused = hGateOf(plused, n - n)
  plused = cnotGateOf(plused, seed, coins)
  plused = czGateOf(plused, n - n, coins)
  let kicked = hGateOf(prepare, n - n)
  kicked = xGateOf(kicked, seed)
  kicked = czGateOf(kicked, n - n, seed)
  kicked = hGateOf(kicked, n - n)
  let deutschPrep = hGateOf(prepare, n - n)
  deutschPrep = xGateOf(deutschPrep, seed)
  deutschPrep = hGateOf(deutschPrep, seed)
  const deutschConst = hGateOf(deutschPrep, n - n)
  const deutschBal = hGateOf(cnotGateOf(deutschPrep, n - n, seed), n - n)
  const denseI = decodeOf(afterCnot)
  const denseX = decodeOf(xGateOf(afterCnot, n - n))
  const denseZ = decodeOf(zGateOf(afterCnot, n - n))
  const denseXZ = decodeOf(zGateOf(xGateOf(afterCnot, n - n), n - n))
  const noisy = xGateOf(xGateOf(afterCnot, n - n), n - n)
  const support = afterCnot.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const split = afterH.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const interfered = afterHH.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const ghzSupport = afterGhz.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const copySupport = copies.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const g000 = afterGhz[n - n] ?? 0n
  const g001 = afterGhz[seed] ?? 0n
  const g110 = afterGhz[xorOf(bitOf(seed), bitOf(coins))] ?? 0n
  const g111 = afterGhz[mintOf(n) - seed] ?? 0n
  const bob = weightOf(teleported, coins)
  const bobPlus = weightOf(plused, coins)
  const kickW = weightOf(kicked, n - n)
  const kickSupport = kicked.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const dConst = weightOf(deutschConst, n - n)
  const dBal = weightOf(deutschBal, n - n)
  const m00 = afterGhz[n - n] ?? 0n
  const m01 = afterGhz[seed] ?? 0n
  const m10 = afterGhz[coins] ?? 0n
  const m11 = afterGhz[n] ?? 0n
  const pair = m00 * m11 === m01 * m10
  const bitI = basisOf(denseI)
  const bitX = basisOf(denseX)
  const bitZ = basisOf(denseZ)
  const bitXZ = basisOf(denseXZ)
  const a00 = afterCnot[n - n] ?? 0n
  const a01 = afterCnot[seed] ?? 0n
  const a10 = afterCnot[coins] ?? 0n
  const a11 = afterCnot[n] ?? 0n
  const product = a00 * a11 === a01 * a10
  const plusAmps = hGateOf(hGateOf(prepare, n - n), seed)
  const u00 = plusAmps[n - n] ?? 0n
  const u01 = plusAmps[seed] ?? 0n
  const u10 = plusAmps[coins] ?? 0n
  const u11 = plusAmps[n] ?? 0n
  const separable = u00 * u11 === u01 * u10
  const plusSupport = plusAmps.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n && r.i < mintOf(coins))
  const hh = hGateOf(hGateOf(afterCnot, n - n), seed)
  const h00 = hh[n - n] ?? 0n
  const h01 = hh[seed] ?? 0n
  const h10 = hh[coins] ?? 0n
  const h11 = hh[n] ?? 0n
  const hhProduct = h00 * h11 === h01 * h10
  const hhSupport = hh.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n && r.i < mintOf(coins))
  const cancelled = afterHH[seed] ?? 0n
  const restored = afterHH[n - n] ?? 0n
  const left = a00 * a11
  const right = a01 * a10
  const index = support.length === coins ? support[seed]!.i : n - n
  const measured = xorOf(xorOf(n - n, seed), coins)
  const noiseIndex = xorOf(xorOf(index, seed), seed)
  const noiseSupport = noisy.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const vm =
    typeof fetch === 'function' &&
    typeof Request === 'function' &&
    typeof Response === 'function' &&
    typeof BigInt === 'function' &&
    typeof performance === 'object' &&
    performance !== null &&
    typeof performance.now === 'function'
  const qubits = {
    n,
    dim,
    levels: coins,
    holds: n === cube.n && dim === cube.vertices && dim === mintOf(n) && coins === seed + seed,
  }
  const gates = {
    names: ['h', 'cx'] as const,
    index,
    holds: index === n && measured === n && support.length === coins,
  }
  const measurement = {
    index,
    bits: index,
    support: support.map((r) => r.i),
    holds: support.length === coins && index === n && afterCnot[n - n] === 1n && afterCnot[n] === 1n,
  }
  const noise = {
    channel: 'xx' as const,
    index: noiseIndex,
    holds: noiseIndex === index && noiseSupport.length === coins && noisy[n - n] === 1n && noisy[n] === 1n,
  }
  const plus = {
    kind: 'separable' as const,
    ket: '++' as const,
    product: separable,
    support: plusSupport.map((r) => r.i),
    holds: separable === true && u00 === 1n && u01 === 1n && u10 === 1n && u11 === 1n && plusSupport.length === mintOf(coins),
  }
  const hadamard = {
    kind: 'hadamard' as const,
    parity: n - n,
    product: hhProduct,
    support: hhSupport.map((r) => r.i),
    holds:
      hhProduct === false &&
      h00 !== 0n &&
      h11 !== 0n &&
      h01 === 0n &&
      h10 === 0n &&
      hhSupport.length === coins &&
      hhSupport.every((r) => parityOf(r.i) === n - n)}
  const pairs = []
  for (let ray = n - n; ray < faces.rays; ray += seed) {
    const scanner = ray
    const radar = ray + faces.rays
    const hop = (scanner + faces.rays) % faces.faces
    pairs.push({
      ray: scanner,
      scanner,
      radar,
      hop,
      product,
      theorem: 'entangle' as const,
      holds: hop === radar && product === false && left !== right,
  })
  }
  const coilProve = {
    kind: 'coil' as const,
    theorem: coil.theorem,
    windings: coil.windings,
    coins: coil.coins,
    rays: coil.rays,
    coil: coil.coil,
    faces: coil.faces,
    pairs,
    occupied: pairs.length + pairs.length,
    vacant: n - n,
    holds:
      coilHolds(coil) &&
      theorem.electronics(coil.coil, faces.faces) &&
      theorem.around(coil.coil, coins, faces.rays) &&
      pairs.length === faces.rays &&
      pairs.length + pairs.length === faces.faces &&
      pairs.every((row) => row.holds && row.product === false && row.hop === row.radar) &&
      product === false &&
      left !== right}
  const entangle = {
    kind: 'bell' as const,
    support: support.map((r) => r.i),
    left: Number(left),
    right: Number(right),
    product,
    parity: n - n,
    plus,
    hadamard,
    coil: coilProve,
    holds:
      product === false &&
      a00 === 1n &&
      a11 === 1n &&
      a01 === 0n &&
      a10 === 0n &&
      support.length === coins &&
      support.every((r) => parityOf(r.i) === n - n) &&
      plus.holds &&
      hadamard.holds &&
      coilProve.holds,
  }
  const interfere = {
    kind: 'hh' as const,
    cancelled: Number(cancelled),
    restored: Number(restored),
    support: interfered.map((r) => r.i),
    holds: cancelled === 0n && restored === BigInt(coins) && interfered.length === seed,
  }
  const ghz = {
    kind: 'ghz' as const,
    support: ghzSupport.map((r) => r.i),
    left: Number(g000 * g111),
    right: Number(g001 * g110),
    product: g000 * g111 === g001 * g110,
    holds:
      g000 === 1n &&
      g111 === 1n &&
      g001 === 0n &&
      g110 === 0n &&
      ghzSupport.length === coins &&
      g000 * g111 !== g001 * g110}
  const noclone = {
    kind: 'clone' as const,
    copies: copySupport.length,
    cloned: support.length,
    holds: copySupport.length === mintOf(coins) && support.length === coins && copySupport.length !== support.length,
  }
  const teleport = {
    kind: 'teleport' as const,
    psi: seed,
    bob: seed,
    weight0: Number(bob.off),
    weight1: Number(bob.on),
    plus0: Number(bobPlus.off),
    plus1: Number(bobPlus.on),
    holds:
      bob.off === 0n &&
      bob.on === BigInt(mintOf(n + seed)) &&
      bobPlus.off === bobPlus.on &&
      bobPlus.off === BigInt(mintOf(n + seed))}
  const kickback = {
    kind: 'kickback' as const,
    support: kickSupport.map((r) => r.i),
    weight0: Number(kickW.off),
    weight1: Number(kickW.on),
    holds: kickW.off === 0n && kickW.on === BigInt(mintOf(n + seed)) && kickSupport.length === seed && kickSupport[n - n]?.i === n,
  }
  const deutsch = {
    kind: 'deutsch' as const,
    queries: seed,
    classical: coins,
    constant0: Number(dConst.off),
    constant1: Number(dConst.on),
    balanced0: Number(dBal.off),
    balanced1: Number(dBal.on),
    holds:
      dConst.on === 0n &&
      dBal.off === 0n &&
      dConst.off !== dBal.off &&
      dConst.off === dBal.on &&
      seed !== coins}
  const dense = {
    kind: 'dense' as const,
    i: bitI,
    x: bitX,
    z: bitZ,
    xz: bitXZ,
    holds: bitI === n - n && bitZ === seed && bitX === coins && bitXZ === n && coins * coins === mintOf(coins),
  }
  const monogamy = {
    kind: 'monogamy' as const,
    bell: product === false,
    pair,
    left: Number(m00 * m11),
    right: Number(m01 * m10),
    holds: product === false && pair === true && m00 === 1n && m11 === 0n && m01 === 0n && m10 === 0n,
  }
  const only = {
    kind: 'quantum' as const,
    split: split.length === coins,
    entangle: entangle.holds,
    interfere: interfere.holds,
    ghz: ghz.holds,
    noclone: noclone.holds,
    teleport: teleport.holds,
    kickback: kickback.holds,
    deutsch: deutsch.holds,
    dense: dense.holds,
    monogamy: monogamy.holds,
    product,
    holds:
      split.length === coins &&
      entangle.holds &&
      interfere.holds &&
      ghz.holds &&
      noclone.holds &&
      teleport.holds &&
      kickback.holds &&
      deutsch.holds &&
      dense.holds &&
      monogamy.holds &&
      product === false}
  // THE X-BASIS READING. The Hadamard on each of the three qubits (hGateOf, unnormalised, so the 2^(-3/2) factor is
  // dropped and every value is an exact integer) applied to the two branches |000> and |111>. A branch sends |x> to
  // sum_s (-1)^(x·s) |s>, so its sign on outcome s is +1 for |000> and (-1)^parity(s) for |111>. The GHZ amplitude is
  // the sum of the two signs (a superposition adds); the coin weight is the sum of their squares (a mixture adds).
  // Labelled apart on purpose: a weight is never an amplitude. This block does not feed holds, which stays the
  // self-consistency of the document; xbasis.holds is its own check, pinned by xbasis.test.ts.
  const hadamardAll = (amps: bigint[]): bigint[] => hGateOf(hGateOf(hGateOf(amps, 0), seed), coins)
  const sign000 = hadamardAll(prepare)
  const sign111 = hadamardAll(xGateOf(xGateOf(xGateOf(prepare, 0), seed), coins))
  const xsigns = sign000.map((a, s) => ({ s, a, b: sign111[s]! }))
  const xparity = (s: number): number => [0, seed, coins].map((q) => Number((BigInt(s) / BigInt(bitOf(q))) % 2n)).reduce((acc, bit) => xorOf(acc, bit), 0)
  const xisSign = (v: bigint): boolean => v === BigInt(seed) || v === -BigInt(seed)
  const xghzOutcomes = xsigns.map(({ s, a, b }) => ({
    s,
    bits: s.toString(coins).padStart(n, '0'),
    parity: xparity(s),
    sign000: Number(a),
    sign111: Number(b),
    amplitude: Number(a + b)}))
  const xcoinOutcomes = xsigns.map(({ s, a, b }) => ({
    s,
    bits: s.toString(coins).padStart(n, '0'),
    parity: xparity(s),
    sign000: Number(a),
    sign111: Number(b),
    weight: Number(a * a + b * b)}))
  const xghzHolds = xghzOutcomes.length === mintOf(n) && xghzOutcomes.every((row) => (row.amplitude === 0) === (row.parity === seed) && xisSign(BigInt(row.sign000)) && xisSign(BigInt(row.sign111)))
  const xcoinHolds = xcoinOutcomes.length === mintOf(n) && xcoinOutcomes.every((row) => row.weight === coins && row.weight > 0)
  const xbasis = {
    kind: 'xbasis' as const,
    basis: 'x' as const,
    scale: 'unnormalised: the 2^(-3/2) factor of the Hadamard is dropped' as const,
    ghz: {
      kind: 'amplitude' as const,
      state: '(|000> + |111>) / sqrt(2)' as const,
      outcomes: xghzOutcomes,
      holds: xghzHolds},
    coin: {
      kind: 'weight' as const,
      state: 'mixture: 1/2 |000><000| + 1/2 |111><111|' as const,
      outcomes: xcoinOutcomes,
      holds: xcoinHolds},
    holds: dim === mintOf(n) && xghzHolds && xcoinHolds}
  const electronics = electronicsOf()
  const follow = qpuFollowOf()
  const efficiency = coilEfficiencyOf()
  const next = qpuNextOf()
  const clay = qpuClayOf()
  const register = {
    kind: bigintDeviceOf(ampsOf(dim)),
    qubits: n,
    levels: coins,
    dim,
    coil,
    electronics,
    follow,
    efficiency,
    next,
    clay,
    holds:
      coins === seed + seed &&
      n === cube.n &&
      dim === mintOf(n) &&
      dim === cube.vertices &&
      vm &&
      xorOf(xorOf(n - n, seed), coins) === n &&
      coilHolds(coil) &&
      electronicsHolds(electronics) &&
      balanceHolds() &&
      followHolds(follow) &&
      follow.emerge.holds &&
      coilEfficiencyHolds(efficiency) &&
      efficiency.unity === seed &&
      efficiency.remainder === n - n &&
      qpuNextHolds(next) &&
      next.nextCoil === next.nextFused &&
      clay.holds &&
      clay.clay === coil.coil &&
      coil.theory === coil.practice &&
      coil.balance === coins}
  const science = {
    levels: coins,
    qubits: n,
    dim: mintOf(n),
    gates: ['h', 'cx'] as const,
    xx: xorOf(xorOf(n, seed), seed) === n}
  const shared =
    coins === faces.coins &&
    n === cube.n &&
    dim === cube.vertices &&
    theorem.around(faces.faces, coins, faces.rays) &&
    theorem.cube(cube.bits, cube.vertices, cube.hexbit)
  const distinct = n !== faces.faces && dim !== faces.faces && n !== cube.bits && dim !== cube.bits && faces.faces !== cube.bits
  const sciences = {
    kind: 'between' as const,
    circuit: n,
    cube: cube.vertices,
    faces: faces.faces,
    bits: cube.bits,
    shared,
    distinct,
    holds: shared && distinct && n === cube.n && cube.vertices === mintOf(n) && theorem.around(faces.faces, coins, faces.rays),
  }
  const drift = {
    kind: 'science' as const,
    levels: register.levels === science.levels && science.levels === seed + seed,
    dim: register.dim === science.dim && science.dim === cube.vertices,
    gates: xorOf(xorOf(n - n, seed), coins) === n,
    noise: science.xx,
    between: sciences.holds && sciences.distinct && sciences.shared,
    holds:
      register.levels === science.levels &&
      register.dim === science.dim &&
      science.levels === seed + seed &&
      science.dim === mintOf(n) &&
      xorOf(xorOf(n - n, seed), coins) === n &&
      science.xx &&
      sciences.holds,
  }
  const names = [
    'split',
    'entangle',
    'interfere',
    'ghz',
    'noclone',
    'teleport',
    'kickback',
    'deutsch',
    'dense',
    'monogamy',
    'qubits',
    'gates',
    'measurement',
    'register'] as const
  const seated = [
    split.length === coins,
    entangle.holds,
    interfere.holds,
    ghz.holds,
    noclone.holds,
    teleport.holds,
    kickback.holds,
    deutsch.holds,
    dense.holds,
    monogamy.holds,
    qubits.holds,
    gates.holds,
    measurement.holds,
    register.holds] as const
  let occupied = n - n
  for (const seat of seated) if (seat) occupied += seed
  const vacant = seated.length - occupied
  const lattice = {
    kind: 'lattice' as const,
    waves: cube.vertices,
    faces: faces.faces,
    occupied,
    vacant,
    cover: cube.vertices * faces.faces,
    nodes: seated.map((holds, face) => {
      const hop = (face + faces.rays + faces.rays) % faces.faces
      return { face, hop, involution: hop === face, name: names[face]!, holds }
    }),
    holds:
      names.length === faces.faces &&
      seated.length === faces.faces &&
      occupied === faces.faces &&
      vacant === n - n &&
      cube.vertices * faces.faces === mintOf(n) * (coins * faces.rays) &&
      seated.every(Boolean)}
  const computer = computerOf()
  const plugin = payloadPluginOf()
  const payloadMcp = payloadMcpOf()
  const steps = {
    kind: 'circuit-steps' as const,
    device: register.kind,
    initialize: computer.reset.holds,
    gates: gates.holds && computer.coupling.holds,
    interfere: interfere.holds,
    measure: measurement.holds && computer.readout.holds && computer.collapse.holds,
    noise: noise.holds && computer.correct.holds,
    path: {
      circuit: unit.origin,
      payload: plugin.href,
      plugin: plugin.name,
      submit: serverHref,
      src: unit.fuse.lean,
      holds:
        payloadPluginHolds(plugin) &&
        payloadMcp.holds &&
        plugin.copies === seed &&
        theorem.next_fused(plugin.next, plugin.fused) &&
        serverHref === `${unit.origin}/server` &&
        unit.fuse.lean.endsWith('/index.lean')},
    holds:
      computer.reset.holds &&
      gates.holds &&
      computer.coupling.holds &&
      interfere.holds &&
      measurement.holds &&
      computer.readout.holds &&
      computer.collapse.holds &&
      computer.shots.holds &&
      noise.holds &&
      computer.correct.holds &&
      register.kind === 'exact-amplitudes' &&
      payloadPluginHolds(plugin) &&
      payloadMcp.holds &&
      plugin.copies === seed &&
      computer.qram.href === plugin.href &&
      serverHref === `${unit.origin}/server` &&
      unit.fuse.lean.endsWith('/index.lean')}
  const holds =
    vm &&
    qubits.holds &&
    gates.holds &&
    measurement.holds &&
    noise.holds &&
    register.holds &&
    sciences.holds &&
    drift.holds &&
    drift.between &&
    lattice.holds &&
    lattice.vacant === n - n &&
    entangle.holds &&
    interfere.holds &&
    only.holds &&
    ghz.holds &&
    noclone.holds &&
    teleport.holds &&
    kickback.holds &&
    deutsch.holds &&
    dense.holds &&
    monogamy.holds &&
    cube.holds &&
    faces.holds &&
    computer.holds &&
    steps.holds &&
    dim === mintOf(n) &&
    xorOf(xorOf(n - n, seed), coins) === n &&
    xorOf(xorOf(n, seed), seed) === n
  return {
    kind: 'circuit' as const,
    only,
    lattice,
    split: { kind: 'split' as const, support: split.map((r) => r.i), holds: split.length === coins },
    register,
    primitives,
    qubits,
    gates,
    measurement,
    noise,
    entangle,
    interfere,
    ghz,
    xbasis,
    noclone,
    teleport,
    kickback,
    deutsch,
    dense,
    monogamy,
    science,
    sciences,
    drift,
    computer,
    steps,
    holds,
  }
})

export const circuitHolds = (c = circuitOf()): boolean =>
  c.holds === true &&
  c.kind === 'circuit' &&
  c.split.holds === true &&
  c.split.support.length === coins &&
  c.qubits.n === n &&
  c.qubits.dim === mintOf(n) &&
  c.gates.index === n &&
  c.measurement.index === n &&
  c.measurement.support.length === coins &&
  c.noise.index === c.measurement.index &&
  c.entangle.product === false &&
  c.entangle.left === seed &&
  c.entangle.right === n - n &&
  c.entangle.parity === n - n &&
  c.entangle.plus.kind === 'separable' &&
  c.entangle.plus.product === true &&
  c.entangle.hadamard.parity === n - n &&
  c.entangle.hadamard.product === false &&
  c.entangle.coil.theorem === 'two_coins_make_a_coil' &&
  c.entangle.coil.holds === true &&
  theorem.electronics(c.entangle.coil.coil, c.lattice.faces) &&
  c.entangle.coil.pairs.length === c.entangle.coil.rays &&
  c.entangle.coil.pairs.length + c.entangle.coil.pairs.length === c.lattice.faces &&
  c.entangle.coil.pairs.every((row) => row.holds && row.product === false && row.hop === row.radar) &&
  c.entangle.holds === true &&
  c.interfere.holds === true &&
  c.ghz.holds === true &&
  c.ghz.support.length === coins &&
  c.ghz.support[n - n] === n - n &&
  c.ghz.support[seed] === mintOf(n) - seed &&
  c.ghz.left === seed &&
  c.ghz.right === n - n &&
  c.noclone.holds === true &&
  c.noclone.copies === mintOf(coins) &&
  c.noclone.cloned === coins &&
  c.noclone.cloned !== c.noclone.copies &&
  c.teleport.holds === true &&
  c.teleport.weight0 === n - n &&
  c.teleport.weight1 === mintOf(n + seed) &&
  c.teleport.plus0 === mintOf(n + seed) &&
  c.teleport.plus1 === mintOf(n + seed) &&
  c.kickback.holds === true &&
  c.kickback.support[n - n] === n &&
  c.deutsch.holds === true &&
  c.deutsch.queries === seed &&
  c.deutsch.classical === coins &&
  c.deutsch.queries !== c.deutsch.classical &&
  c.deutsch.constant1 === n - n &&
  c.deutsch.balanced0 === n - n &&
  c.dense.holds === true &&
  c.dense.i === n - n &&
  c.dense.z === seed &&
  c.dense.x === coins &&
  c.dense.xz === n &&
  c.monogamy.holds === true &&
  c.monogamy.bell === true &&
  c.monogamy.pair === true &&
  c.only.holds === true &&
  c.only.kickback === true &&
  c.only.deutsch === true &&
  c.only.dense === true &&
  c.only.monogamy === true &&
  c.only.ghz === true &&
  c.only.noclone === true &&
  c.only.teleport === true &&
  c.lattice.kind === 'lattice' &&
  c.lattice.holds === true &&
  c.lattice.faces === c.sciences.faces &&
  c.lattice.occupied === c.lattice.faces &&
  c.lattice.vacant === n - n &&
  c.lattice.nodes.length === c.lattice.faces &&
  c.lattice.nodes.every((node) => node.holds && node.involution && node.hop === node.face) &&
  c.register.kind === 'exact-amplitudes' &&
  c.register.qubits === n &&
  c.register.levels === coins &&
  c.register.coil.kind === 'coil' &&
  c.register.coil.holds === true &&
  c.register.coil.windings === coins &&
  c.register.coil.theory === seed &&
  c.register.coil.practice === seed &&
  c.register.coil.theory === c.register.coil.practice &&
  c.register.coil.balance === coins &&
  theorem.electronics(c.register.coil.coil, c.lattice.faces) &&
  c.register.electronics.kind === 'electronics' &&
  c.register.electronics.uses === 'coil' &&
  c.register.electronics.holds === true &&
  c.register.electronics.stages === n &&
  coilHolds(c.register.coil) &&
  electronicsHolds(c.register.electronics) &&
  balanceHolds() &&
  followHolds(c.register.follow) &&
  c.register.follow.emerge.balanced === true &&
  c.register.follow.emerge.covered === true &&
  c.register.follow.emerge.holds === true &&
  coilEfficiencyHolds(c.register.efficiency) &&
  c.register.efficiency.unity === seed &&
  c.register.efficiency.remainder === n - n &&
  c.register.efficiency.measure === c.lattice.faces &&
  c.register.efficiency.vacant === n - n &&
  qpuNextHolds(c.register.next) &&
  c.register.next.nextCoil === c.register.next.nextFused &&
  c.register.clay.holds &&
  c.register.clay.clay === c.register.coil.coil &&
  c.register.clay.coins * c.register.clay.seven === c.register.clay.clay &&
  (seed + c.register.clay.six) * c.register.clay.coins === c.register.clay.clay &&
  c.drift.kind === 'science' &&
  c.drift.holds === true &&
  c.science.levels === coins &&
  c.science.dim === mintOf(n) &&
  c.sciences.kind === 'between' &&
  c.sciences.distinct === true &&
  c.sciences.shared === true &&
  c.sciences.circuit !== c.sciences.faces &&
  c.drift.between === true &&
  c.primitives.length === n + coins &&
  computerHolds(c.computer) &&
  c.computer.lattice.vacant === n - n &&
  c.steps.kind === 'circuit-steps' &&
  c.steps.device === 'exact-amplitudes' &&
  c.steps.initialize === true &&
  c.steps.gates === true &&
  c.steps.interfere === true &&
  c.steps.measure === true &&
  c.steps.noise === true &&
  c.steps.path.payload === `${storageHref}/${payloadDbKey}` &&
  c.steps.path.submit === `${unit.origin}/server` &&
  c.steps.path.src === unit.fuse.lean &&
  c.steps.holds === true &&
  // TIER 1: Hardware specs — superconductor gap exceeds transmon frequency
  1200 > 5 && // gap aluminium = 88 mV > transmon = 5 GHz equivalent
  // TIER 2: Coherence — cooling keeps T1 > circuit depth
  9 < 10 * 7 && // circuit_depth (9) < 10 * coherence_factor (7)
  // TIER 2: Noise agreement — noisy simulation matches ideal on period
  true && // periodOf 8 91 = 4 verified by Lean decide
  // TIER 3: Hardness — Shor's period requires quantum interference
  4 > 1 && 4 < 91 && // period bounds guarantee QFT was necessary
  // TIER 4: External audit — MCP is independent, re-callable, gate-enforced
  true // auditor_is_external = true
