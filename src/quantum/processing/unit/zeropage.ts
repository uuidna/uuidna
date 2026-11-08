// The byte a Pravets 8M accumulator can recompute, and the summarised analytics hold every integer the byte cannot: an accumulator holds one byte.
import { ClaySeals } from '../../../families/clay/index.js'
import { LawFormulas } from '../../../families/law/index.js'
import { TuneFormulas } from '../../../families/tune/index.js'
import { qpuCiteOf } from './presentation.js'
import {
  chooseOf,
  coins,
  mintOf,
  n,
  onceOf,
  capacityOf,
  circuitOf,
  qpuClayOf,
  coilOf,
  cubeOf,
  qpuEvidenceOf,
  facesOf,
  qpuHandleOf,
  hexRunOf,
  qpuHexUuidOf,
  latticeNamesOf,
  seed,
  ten,
  tenOf,
} from './index.js'

const none = n - n

/** One unsigned byte is the span mintOf(vertices): the values 0 .. span − 1. */
const spanOf = (): number => mintOf(latticeNamesOf().vertices)

const readInt = (value: unknown): number | undefined => {
  const x = typeof value === 'number' || typeof value === 'bigint' || typeof value === 'string' ? Number(value) : Number.NaN
  return Number.isSafeInteger(x) && x >= none ? x : undefined
}

/** Little-endian bytes of a safe integer. The walk is the program counter's; one byte is never the whole count. */
const bytesOf = (value: number): number[] => {
  const span = spanOf()
  const out: number[] = []
  let x = value
  if (x === none) return [none]
  while (x > none) {
    const low = x % span
    out.push(low)
    x = (x - low) / span
  }
  return out
}

const fitsByte = (value: number): boolean => value >= none && value < spanOf()

export type QpuAnalytics = {
  kind: 'analytics'
  seed: number
  coins: number
  n: number
  rays: number
  clay: number
  modulus: number
  riemann: number
  bsd: number
  hodge: number
  navierStokes: number
  pVsNp: number
  yangMills: number
  hz: number
  low: number
  high: number
  amplitudes: number
  fused: number
  next: number
  plane: number
  amplitudeBytes: readonly number[]
  fusedBytes: readonly number[]
  holds: boolean
}

/**
 * Counts only: the zero-page bytes, the fundamental as two bytes, and the multi-byte leads.
 * holds when each integer equals the builder that produces it. The amplitude count is held here.
 * @wing lattice
 * @kind builder
 * @evidence analyticsHolds
 */
export const analyticsOf = onceOf((): QpuAnalytics => {
  const lattice = latticeNamesOf()
  const faces = facesOf()
  const coil = coilOf()
  const clay = qpuClayOf()
  const handle = qpuHandleOf()
  const capacity = capacityOf()
  const span = spanOf()
  const riemann = ClaySeals.riemann(seed, coins)
  const bsdNine = ClaySeals.bsd(n * n)
  const bsdFaces = ClaySeals.bsd(faces.faces + seed)
  const hodge = ClaySeals.hodge(coins)
  const navier = ClaySeals.navierStokes(n, n)
  const pvs = ClaySeals.pVsNp(none)
  const yang = ClaySeals.yangMills()
  const tune = TuneFormulas.fundamental()
  const modulus = chooseOf(faces.faces, coins)
  const hz = mintOf(lattice.hexbit) * (lattice.plane - seed)
  const low = hz % span
  const high = (hz - low) / span
  const amplitudes = handle.amplitudes
  const fused = capacity.fused
  const next = capacity.next
  const plane = lattice.plane
  const amplitudeBytes = bytesOf(amplitudes)
  const fusedBytes = bytesOf(fused)
  const holds =
    clay.holds &&
    clay.clay === faces.faces &&
    clay.clay === coil.coil &&
    clay.clay === coins * faces.rays &&
    lattice.seed === seed &&
    lattice.coins === coins &&
    lattice.n === n &&
    lattice.rays === faces.rays &&
    faces.holds === true &&
    coil.holds === true &&
    handle.holds === true &&
    capacity.holds === true &&
    riemann.holds === true &&
    bsdNine.holds === true &&
    bsdFaces.holds === true &&
    bsdNine.value === bsdFaces.value &&
    hodge.holds === true &&
    navier.holds === true &&
    pvs.holds === true &&
    yang.holds === true &&
    tune.holds === true &&
    tune.value === hz &&
    low + high * span === hz &&
    amplitudes === mintOf(lattice.bits) &&
    fused === faces.faces * handle.kv.amplitudes &&
    next === fused + fused &&
    plane === coins * coins * faces.rays &&
    plane !== fused &&
    fitsByte(seed) &&
    fitsByte(coins) &&
    fitsByte(n) &&
    fitsByte(faces.rays) &&
    fitsByte(clay.clay) &&
    fitsByte(modulus) &&
    fitsByte(riemann.value) &&
    fitsByte(bsdNine.value) &&
    fitsByte(hodge.value) &&
    fitsByte(navier.value) &&
    fitsByte(pvs.value) &&
    fitsByte(yang.value) &&
    fitsByte(low) &&
    fitsByte(high) &&
    fitsByte(plane) &&
    !fitsByte(amplitudes) &&
    !fitsByte(fused) &&
    !fitsByte(next) &&
    amplitudeBytes[amplitudeBytes.length - seed] === seed &&
    fusedBytes[fusedBytes.length - seed] === plane &&
    Number.isSafeInteger(amplitudes) &&
    Number.isSafeInteger(fused) &&
    Number.isSafeInteger(next)
  return {
    kind: 'analytics' as const,
    seed,
    coins,
    n,
    rays: faces.rays,
    clay: clay.clay,
    modulus,
    riemann: riemann.value,
    bsd: bsdNine.value,
    hodge: hodge.value,
    navierStokes: navier.value,
    pVsNp: pvs.value,
    yangMills: yang.value,
    hz,
    low,
    high,
    amplitudes,
    fused,
    next,
    plane,
    amplitudeBytes,
    fusedBytes,
    holds,
  }
})

export const analyticsHolds = (a = analyticsOf()): boolean =>
  a.holds === true &&
  a.kind === 'analytics' &&
  a.seed === seed &&
  a.coins === coins &&
  a.n === n &&
  a.rays === facesOf().rays &&
  a.clay === qpuClayOf().clay &&
  a.modulus === chooseOf(facesOf().faces, coins) &&
  a.riemann === ClaySeals.riemann(seed, coins).value &&
  a.bsd === ClaySeals.bsd(n * n).value &&
  a.hodge === ClaySeals.hodge(coins).value &&
  a.navierStokes === ClaySeals.navierStokes(n, n).value &&
  a.pVsNp === ClaySeals.pVsNp(none).value &&
  a.yangMills === ClaySeals.yangMills().value &&
  a.hz === TuneFormulas.fundamental().value &&
  a.amplitudes === qpuHandleOf().amplitudes &&
  a.fused === capacityOf().fused &&
  a.next === capacityOf().next &&
  a.plane === latticeNamesOf().plane &&
  !fitsByte(a.amplitudes)

/** The summary holds the amplitude count. The prize line is said once, on the public sentence. */
export const analyticsSentenceOf = (a = analyticsOf()): string =>
  `Summarised analytics hold a Pravets 8M clay register: seed ${a.seed}, coins ${a.coins}, n ${a.n}, rays ${a.rays}, clay ${a.clay}, modulus ${a.modulus}, riemann ${a.riemann}, bsd ${a.bsd}, hodge ${a.hodge}, navierStokes ${a.navierStokes}, pVsNp ${a.pVsNp}, yangMills ${a.yangMills}, ${a.hz} as bytes ${a.low} and ${a.high}, amplitudes ${a.amplitudes}, fused ${a.fused}, next ${a.next}, plane ${a.plane}.`

/** Read from the npm registry and the published tarball READMEs. Not a lattice integer. */
const zeropointNode = {
  name: 'zeropoint-node',
  version: '1.5.8',
  published: '2026-09-07',
  created: '2025-07-08',
  sequenceFrom: '1.0.2',
  sequenceFromDate: '2026-07-29',
  augustFrom: '1.0.3',
  augustFromDate: '2026-08-19',
  augustTo: '1.3.1',
  augustToDate: '2026-08-31',
  sequence: '0\\1\\2\\4\\8/7/5/3\\6\\9/0\\1',
} as const

/** The homepage sentence: the sequence the package prints, the author's claim, and one prize line. */
export const publicSentenceOf = (a = analyticsOf()): string => {
  const cite = qpuCiteOf()
  const z = zeropointNode
  return `Author's published sequence: ${z.name} ${z.version}, published ${z.published}, prints ${z.sequence} (that identifier is in the ${z.version} README, and in the README from version ${z.sequenceFrom} published ${z.sequenceFromDate}, including the August 2026 releases ${z.augustFrom} published ${z.augustFromDate} through ${z.augustTo} published ${z.augustToDate}; the package was first published ${z.created}). Author's claim: "${cite.prior.title}" (Rouschev, 2026, doi:${cite.prior.conceptdoi}). A prize is a lead.`
}

/** Visible record: the sentence, the amplitude summary, and the licence. A prize holds false. */
export const publicOf = (a = analyticsOf()) => {
  const cite = qpuCiteOf()
  const sentence = publicSentenceOf(a)
  return {
    prize: false as const,
    sentence,
    lines: [sentence, analyticsSentenceOf(a), cite.right] as const,
  }
}

type ZeroCell = { address: number; name: string; value: number; fits: true; hex?: string; hexes?: readonly string[] }

/**
 * Zero page: each address recomputes from the lattice or from a formula that already exists.
 * Amplitudes and fused are leads on this page (they do not fit in one byte) and integers in the analytics.
 * @wing lattice
 * @kind builder
 * @evidence zeroPageHolds
 */
export const zeroPageOf = onceOf(async () => {
  const a = analyticsOf()
  const lattice = latticeNamesOf()
  const faces = facesOf()
  const clay = qpuClayOf()
  const programs: { name: string; family: string; program: string; params: number[]; value: number }[] = [
    { name: 'modulus', family: 'Qpu.Mint', program: 'chooseOf', params: [faces.faces, coins], value: a.modulus },
    { name: 'riemann', family: 'clay', program: 'riemann', params: [seed, coins], value: a.riemann },
    { name: 'bsd', family: 'clay', program: 'bsd', params: [n * n], value: a.bsd },
    { name: 'bsdFaces', family: 'clay', program: 'bsd', params: [faces.faces + seed], value: a.bsd },
    { name: 'hodge', family: 'clay', program: 'hodge', params: [coins], value: a.hodge },
    { name: 'navierStokes', family: 'clay', program: 'navierStokes', params: [n, n], value: a.navierStokes },
    { name: 'pVsNp', family: 'clay', program: 'pVsNp', params: [none], value: a.pVsNp },
    { name: 'yangMills', family: 'clay', program: 'yangMills', params: [], value: a.yangMills },
    { name: 'hz', family: 'tune', program: 'fundamental', params: [], value: a.hz },
  ]
  const ran = await Promise.all(programs.map(async (row) => {
    const hex = qpuHexUuidOf({ family: row.family, program: [row.program], params: row.params })
    const run = await hexRunOf(hex, undefined, undefined, { store: false })
    const value = readInt((run as { value?: unknown }).value)
    return { ...row, hex, value, agrees: value === row.value && (run as { holds?: unknown }).holds === true }
  }))
  const hexOf = (name: string) => ran.find((row) => row.name === name)
  const bsdHexes = [hexOf('bsd')?.hex, hexOf('bsdFaces')?.hex].filter((hex): hex is string => hex !== undefined)
  const cells: ZeroCell[] = [
    { address: none, name: 'seed', value: a.seed, fits: true },
    { address: seed, name: 'coins', value: a.coins, fits: true },
    { address: coins, name: 'n', value: a.n, fits: true },
    { address: n, name: 'rays', value: a.rays, fits: true },
    { address: lattice.hexbit, name: 'clay', value: a.clay, fits: true },
    { address: n + coins, name: 'modulus', value: a.modulus, fits: true, hex: hexOf('modulus')?.hex },
    { address: clay.six, name: 'riemann', value: a.riemann, fits: true, hex: hexOf('riemann')?.hex },
    { address: faces.rays, name: 'bsd', value: a.bsd, fits: true, hexes: bsdHexes },
    { address: lattice.vertices, name: 'hodge', value: a.hodge, fits: true, hex: hexOf('hodge')?.hex },
    { address: n * n, name: 'navierStokes', value: a.navierStokes, fits: true, hex: hexOf('navierStokes')?.hex },
    { address: n + faces.rays, name: 'pVsNp', value: a.pVsNp, fits: true, hex: hexOf('pVsNp')?.hex },
    { address: n + lattice.vertices, name: 'yangMills', value: a.yangMills, fits: true, hex: hexOf('yangMills')?.hex },
    { address: mintOf(lattice.hexbit), name: 'hzLow', value: a.low, fits: true, hex: hexOf('hz')?.hex },
    { address: mintOf(lattice.hexbit) + seed, name: 'hzHigh', value: a.high, fits: true, hex: hexOf('hz')?.hex },
  ]
  const leads = [
    { name: 'amplitudes' as const, value: a.amplitudes, bytes: a.amplitudeBytes, fits: false as const },
    { name: 'fused' as const, value: a.fused, bytes: a.fusedBytes, fits: false as const },
    { name: 'next' as const, value: a.next, bytes: bytesOf(a.next), fits: false as const },
  ]
  const holds =
    analyticsHolds(a) &&
    cells.every((cell) => cell.fits === true && fitsByte(cell.value)) &&
    leads.every((lead) => lead.fits === false && !fitsByte(lead.value)) &&
    ran.every((row) => row.agrees) &&
    a.low + a.high * spanOf() === a.hz
  return { kind: 'zeropage' as const, cells, leads, analytics: a, ran, holds }
})

export const zeroPageHolds = async (page?: Awaited<ReturnType<typeof zeroPageOf>>): Promise<boolean> => {
  const got = page ?? await zeroPageOf()
  return got.holds === true && got.kind === 'zeropage' && got.analytics.holds === true && !fitsByte(got.analytics.amplitudes)
}

/** Quotient of two natural numbers. The remainder is what spills into the next limb. */
const quotOf = (value: number, width: number): number => (value - (value % width)) / width

/** Bit length of a natural number. Zero takes no bits. */
const bitsOf = (value: number): number => {
  let x = value
  let b = none
  while (x > none) {
    x = quotOf(x, coins)
    b += seed
  }
  return b
}

/** Decimal length. Zero is one digit, the way a register still stores it. */
const digitsOf = (value: number): number => {
  if (value === none) return seed
  let x = value
  let d = none
  while (x > none) {
    x = quotOf(x, ten)
    d += seed
  }
  return d
}

/** How many limbs of `width` a value takes. One limb when the width already covers it. */
const limbsOf = (value: number, width: number): number => {
  const q = quotOf(value, width)
  return value % width === none ? q : q + seed
}

type MachineWidth =
  | { kind: 'binary'; bits: number }
  | { kind: 'decimal'; digits: number; accumulators: number }
  | { kind: 'exact' }

type MachineSpec = {
  name: string
  era?: string
  when: 'here' | 'before' | 'after'
  width: MachineWidth
  ramBytes?: number
  adder: boolean
  spec: string
}

type MachineClay = {
  riemann: number
  hodge: number
  yangMills: number
  bsd: number
  bsdFaces: number
  navierStokes: number
  pVsNp: number
  holds: boolean
  fidelity: number
  redirected: number
  next: string
}

export type QpuMachine = {
  name: string
  era?: string
  when: 'here' | 'before' | 'after'
  wordBits: number | 'exact' | 'decimal'
  digits?: number
  spec: string
  integersHeld: boolean
  amplitudesHeld: boolean
  fusedHeld: boolean
  amplitudesInOneRegister: boolean
  fusedInOneRegister: boolean
  oneRegisterFidelity: number
  /** value and holds, named when the equality bit and the holds bit differ. */
  note?: string
  redirected: number
  amplitudesRedirected: number
  registerNext: string
  lead: boolean
  lawful: number
  advantage?: boolean
  clay?: MachineClay
}

export type QpuMachines = {
  kind: 'machines'
  prize: false
  catalogEnds: false
  floorBytes: number
  analytics: QpuAnalytics
  walk: { measured: false; pravetsCycleNs: number; modernOpNs: number; amplitudesNs: number; fusedNs: number }
  rows: readonly QpuMachine[]
  holds: boolean
}

/** A few dozen bytes: n dozens, and a dozen is twelve (vertices + hexbit). The byte string of the three integers is the other bar; the floor is the larger. */
const floorBytesOf = (a: QpuAnalytics): number => {
  const lattice = latticeNamesOf()
  const dozen = lattice.vertices + lattice.hexbit
  const fewDozen = n * dozen
  const payload = a.amplitudeBytes.length + a.fusedBytes.length + bytesOf(a.next).length
  return payload > fewDozen ? payload : fewDozen
}

const fitsWidth = (value: number, width: MachineWidth): boolean => {
  if (width.kind === 'exact') return Number.isSafeInteger(value) && value >= none
  if (width.kind === 'decimal') return digitsOf(value) <= width.digits
  return bitsOf(value) <= width.bits
}

/** What one register holds: the integer when it fits, otherwise the register's maximum. */
const registerOf = (value: number, width: MachineWidth): number => {
  if (fitsWidth(value, width)) return value
  if (width.kind === 'decimal') return tenOf(width.digits) - seed
  if (width.kind === 'binary' && width.bits <= cubeOf().bits) return mintOf(width.bits) - seed
  return none
}

/** One step up the word ladder. A miss names that next address and stops. */
const nextWordOf = (width: MachineWidth): string => {
  const lattice = latticeNamesOf()
  const word16 = lattice.vertices * coins
  const word32 = cubeOf().bits
  const word64 = word32 * coins
  if (width.kind === 'exact') return 'held'
  if (width.kind === 'decimal') return `${word64}-bit`
  if (width.bits >= word64) return 'held'
  if (width.bits >= word32) return `${word64}-bit`
  if (width.bits >= word16) return `${word32}-bit`
  return `${word16}-bit`
}

const stampOf = (values: readonly number[]): number => {
  const radix = latticeNamesOf().vertices
  let x = none
  for (const value of values) x = x * radix + value
  return x
}

const clayOnOf = (width: MachineWidth): MachineClay => {
  const latticeSeals = [
    ClaySeals.riemann(seed, coins),
    ClaySeals.hodge(coins),
    ClaySeals.yangMills(),
    ClaySeals.bsd(n * n),
    ClaySeals.bsd(facesOf().faces + seed),
    ClaySeals.navierStokes(n, n),
    ClaySeals.pVsNp(none),
  ]
  const projected = latticeSeals.map((seal) => registerOf(seal.value, fitsWidth(seal.value, width) ? { kind: 'exact' } : width))
  const ordered = stampOf(latticeSeals.map((seal) => seal.value))
  const computed = stampOf(projected)
  const fidelity = LawFormulas.fidelity(ordered, computed)
  const redirected = LawFormulas.redirected(ordered, computed)
  const radix = latticeNamesOf().vertices
  const faithful = latticeSeals.every((seal) => seal.value >= none && seal.value < radix)
  const matched = faithful && fidelity.value === seed && latticeSeals.every((seal) => seal.holds === true) && qpuClayOf().holds
  return {
    riemann: projected[none]!,
    hodge: projected[seed]!,
    yangMills: projected[coins]!,
    bsd: projected[n]!,
    bsdFaces: projected[n + seed]!,
    navierStokes: projected[n + coins]!,
    pVsNp: projected[n + n]!,
    holds: matched && ClaySeals.bsd(n * n).value === ClaySeals.bsd(facesOf().faces + seed).value,
    fidelity: fidelity.value,
    redirected: redirected.value,
    next: matched ? 'held' : nextWordOf(width),
  }
}

const machineOf = (spec: MachineSpec, floor: number, a: QpuAnalytics, advantage?: boolean): QpuMachine => {
  const lattice = latticeNamesOf()
  const byteBits = lattice.vertices
  const fusedBits = bitsOf(a.fused)
  const fusedDigits = digitsOf(a.fused)
  let integersHeld = false
  if (spec.width.kind === 'exact') integersHeld = true
  else if (spec.adder && spec.width.kind === 'decimal') {
    const per = spec.width.digits
    const total = spec.width.accumulators * per
    integersHeld = total >= fusedDigits && spec.width.accumulators >= limbsOf(fusedDigits, per) && total >= digitsOf(a.amplitudes)
  } else if (spec.adder && spec.width.kind === 'binary' && spec.ramBytes !== undefined && spec.ramBytes >= floor) {
    const storeWords = quotOf(spec.ramBytes * byteBits, spec.width.bits)
    integersHeld = storeWords >= limbsOf(fusedBits, spec.width.bits) && storeWords >= limbsOf(bitsOf(a.amplitudes), spec.width.bits)
  }
  const amplitudesComputed = registerOf(a.amplitudes, spec.width)
  const fusedComputed = registerOf(a.fused, spec.width)
  const fidelity = LawFormulas.fidelity(a.fused, fusedComputed)
  const fidelityNote = (fidelity as { note?: string }).note
  const redirected = LawFormulas.redirected(a.fused, fusedComputed)
  const amplitudesRedirected = LawFormulas.redirected(a.amplitudes, amplitudesComputed)
  const lawful = LawFormulas.lawful(none)
  const amplitudesInOneRegister = amplitudesComputed === a.amplitudes
  const fusedInOneRegister = fusedComputed === a.fused
  const registerNext = fusedInOneRegister ? 'held' : nextWordOf(spec.width)
  const wordBits = spec.width.kind === 'binary' ? spec.width.bits : spec.width.kind === 'decimal' ? 'decimal' as const : 'exact' as const
  return {
    name: spec.name,
    era: spec.era,
    when: spec.when,
    wordBits,
    digits: spec.width.kind === 'decimal' ? spec.width.digits : undefined,
    spec: spec.spec,
    integersHeld,
    amplitudesHeld: integersHeld,
    fusedHeld: integersHeld,
    amplitudesInOneRegister,
    fusedInOneRegister,
    oneRegisterFidelity: fidelity.value,
    ...(fidelityNote ? { note: fidelityNote } : {}),
    redirected: redirected.value,
    amplitudesRedirected: amplitudesRedirected.value,
    registerNext,
    lead: fidelity.value !== seed,
    lawful: lawful.value,
    advantage,
    clay: integersHeld ? clayOnOf(spec.width) : undefined,
  }
}

/**
 * Word-size classes that can store the lattice integers. Pravets first, then earlier public machines, then wider words.
 * The list of individual computers does not end; the classification is the computation. A one-register miss is a lead.
 * Clay runs only on a class whose published store holds the integers. A prize holds false.
 * @wing lattice
 * @kind builder
 * @evidence machinesHolds
 */
export const machinesOf = onceOf((): QpuMachines => {
  const a = analyticsOf()
  const lattice = latticeNamesOf()
  const cube = cubeOf()
  const floor = floorBytesOf(a)
  const byteBits = lattice.vertices
  const word16 = byteBits * coins
  const word32 = cube.bits
  const word64 = word32 * coins
  const address = mintOf(word16)
  // Published figures. A 12-bit address holds mintOf(12) words; 4 KB and 16 KB are the cited minima.
  const eniacAccumulators = 20
  const babyWords = 32
  const babyBits = 32
  const univacWords = 1000
  const univacChars = 12
  const univacCharBits = 6
  const univacBits = univacChars * univacCharBits
  const pdp8Bits = 12
  const pdp8Words = mintOf(pdp8Bits)
  const appleBytes = 4 * mintOf(ten)
  const pcBytes = word16 * mintOf(ten)
  const evidence = qpuEvidenceOf()
  const device = circuitOf().register.kind
  const specs: MachineSpec[] = [
    {
      name: 'Pravets 8M',
      era: '1980s',
      when: 'here',
      width: { kind: 'binary', bits: byteBits },
      ramBytes: address,
      adder: true,
      spec: `6502 at ${tenOf(coins * n)} Hz, address space ${address}, RAM ${address} bytes, accumulator 0..${spanOf() - seed}, cycle ${tenOf(n)} ns`,
    },
    {
      name: 'ENIAC',
      era: '1946',
      when: 'before',
      width: { kind: 'decimal', digits: ten, accumulators: eniacAccumulators },
      adder: true,
      spec: `${eniacAccumulators} accumulators of ${ten} decimal digits`,
    },
    {
      name: 'Manchester Baby',
      era: '1948',
      when: 'before',
      width: { kind: 'binary', bits: babyBits },
      ramBytes: quotOf(babyWords * babyBits, byteBits),
      adder: true,
      spec: `${babyWords} words of ${babyBits} bits`,
    },
    {
      name: 'UNIVAC I',
      era: '1951',
      when: 'before',
      width: { kind: 'binary', bits: univacBits },
      ramBytes: quotOf(univacWords * univacBits, byteBits),
      adder: true,
      spec: `${univacWords} words of ${univacChars} characters of ${univacCharBits} bits`,
    },
    {
      name: 'PDP-8',
      era: '1965',
      when: 'before',
      width: { kind: 'binary', bits: pdp8Bits },
      ramBytes: quotOf(pdp8Words * pdp8Bits, byteBits),
      adder: true,
      spec: `${pdp8Words} words of ${pdp8Bits} bits`,
    },
    {
      name: 'Apple II',
      era: '1977',
      when: 'before',
      width: { kind: 'binary', bits: byteBits },
      ramBytes: appleBytes,
      adder: true,
      spec: `6502, ${byteBits}-bit, ${appleBytes} bytes minimum`,
    },
    {
      name: 'IBM PC',
      era: '1981',
      when: 'before',
      width: { kind: 'binary', bits: word16 },
      ramBytes: pcBytes,
      adder: true,
      spec: `8088, ${word16}-bit registers, 20-bit address, ${pcBytes} bytes minimum`,
    },
    {
      name: '16-bit',
      era: '1978',
      when: 'after',
      width: { kind: 'binary', bits: word16 },
      ramBytes: pcBytes,
      adder: true,
      spec: `8086/80286 class, ${word16}-bit registers`,
    },
    {
      name: '32-bit',
      era: '1985',
      when: 'after',
      width: { kind: 'binary', bits: word32 },
      ramBytes: pcBytes,
      adder: true,
      spec: `80386 class, ${word32}-bit registers; memory exceeds the byte-string floor`,
    },
    {
      name: '64-bit',
      era: '2003',
      when: 'after',
      width: { kind: 'binary', bits: word64 },
      ramBytes: pcBytes,
      adder: true,
      spec: `${word64}-bit registers; one register holds the integers`,
    },
    {
      name: 'modern',
      era: 'current',
      when: 'after',
      width: { kind: 'binary', bits: word64 },
      ramBytes: pcBytes,
      adder: true,
      spec: `${word64}-bit, one integer op about ${seed} ns; the product is not a measurement`,
    },
    {
      name: device,
      when: 'after',
      width: { kind: 'exact' },
      adder: true,
      spec: 'exact integer amplitudes; advantage is the evidence reading',
    },
  ]
  const rows = specs.map((spec) => machineOf(spec, floor, a, spec.name === device ? evidence.scaling.advantage : undefined))
  const holds =
    analyticsHolds(a) &&
    rows[none]?.name === 'Pravets 8M' &&
    rows.every((row) => row.lawful === seed && (row.integersHeld ? row.clay?.holds === true && row.clay.fidelity === seed && row.clay.next === 'held' : row.clay === undefined)) &&
    rows.every((row) => row.oneRegisterFidelity === seed || row.lead === true) &&
    evidence.scaling.advantage === false &&
    device === 'exact-amplitudes'
  return {
    kind: 'machines' as const,
    prize: false as const,
    catalogEnds: false as const,
    floorBytes: floor,
    analytics: a,
    walk: {
      measured: false as const,
      pravetsCycleNs: tenOf(n),
      modernOpNs: seed,
      amplitudesNs: a.amplitudes * seed,
      fusedNs: a.fused * seed,
    },
    rows,
    holds,
  }
})

export const machinesHolds = (m = machinesOf()): boolean =>
  m.holds === true &&
  m.kind === 'machines' &&
  m.prize === false &&
  m.catalogEnds === false &&
  m.walk.measured === false &&
  m.rows[none]?.name === 'Pravets 8M' &&
  m.rows.every((row) => row.integersHeld === row.amplitudesHeld && row.amplitudesHeld === row.fusedHeld)

/** The summary holds every integer. Seals recompute. A prize is a lead. The naming scheme solves none of the problems it names. */
export const machinesSentenceOf = (m = machinesOf()): string => {
  const a = m.analytics
  const clay = m.rows[none]?.clay
  return `Machine classes hold seed ${a.seed}, coins ${a.coins}, n ${a.n}, rays ${a.rays}, clay ${a.clay}, modulus ${a.modulus}, hz ${a.hz}, amplitudes ${a.amplitudes}, fused ${a.fused}, next ${a.next}. Clay seals recompute: riemann ${clay?.riemann}, hodge ${clay?.hodge}, yangMills ${clay?.yangMills}, bsd ${clay?.bsd}, bsd ${clay?.bsdFaces}, navierStokes ${clay?.navierStokes}, pVsNp ${clay?.pVsNp}. A prize is a lead. The naming scheme solves none of the problems it names.`
}
