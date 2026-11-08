/**
 * QPU at qpu.uuidna.com. Kind qpu. Source index.lean.
 * mintOf proves 2^k by doubling. Cube, handle, faces, fused are the unit.
 * Lean decides those identities by Nat algebra. Digits and integer fractions. Never Math. Never by decide.
 */
/** COMPUTATIONAL RECEIPTS. Every gate primitive and measurement appends the fold of the amplitude vector it produced, so a
 * test that computed quantum state carries a receipt and a test that computed none carries none. FNV-1a 64 over the
 * decimal amplitudes; BigInt only. Never Math. The reporter reads this ledger per test (isolation none). */
import { leanSource, leanToolchain } from './lean.js'
import { packageVersion } from './version.js'
import { sealedStandards } from './standards.js'
import { leanModelOf, leanRecomputeOf, leanTheoremBlocksOf, leanCallOf, leanArityOf, leanLinksOf } from './lean-eval.js'
import { docDbOf, type DocStore } from './docdb.js'
import { sha256Hex } from '../../../core/crypt.js'
export * from './docdb.js'
// the front door lives in router.ts (cooled by the heat family); it stays this module's default export
export { worker as default } from './router.js'
import { circuitOf, circuitHolds, circuitLiveOf } from './circuit.js'
export { circuitOf, circuitHolds, circuitLiveOf } from './circuit.js'
import { apiDoorsOf, qpuDocsOf, docsHolds } from './readme.js'
export { qpuDocsOf, docsHolds, readmeOf, readmeHolds } from './readme.js'
import { improveOf, improveHolds, trainOf, trainHolds, proveOf, proveHolds } from './doors.js'
export { improveOf, improveHolds, trainOf, trainHolds, proveOf, proveHolds } from './doors.js'
import { leanOf, leanHolds } from './proof.js'
export { leanOf, leanHolds } from './proof.js'
import { embeddedConstants } from './embedded.js'
import { quantumOf, qpuQuantumHolds, quantumLiveOf } from './quantum.js'
export { quantumOf, qpuQuantumHolds, quantumLiveOf } from './quantum.js'
import { toolsOf, mcpOf, throughSchemaOf } from './mcp.js'
export { toolsOf, mcpOf, mcpCallOf, mcpHolds, mcpFailuresOf, mcpChecksOf, throughSchemaOf, mcpDoorsOf, mcpErrorsOf, failureOf } from './mcp.js'
import { shorTryOf, shorOf, shorHolds } from '../../../families/crypt/shor.js'
export { shorTryOf, shorTryHolds, shorOf, shorReceiptsOf, shorReceiptsHolds, shorHolds } from '../../../families/crypt/shor.js'
import { sandboxOf, sandboxRunOf } from './sandbox.js'
export { sandboxEpochOf, sandboxEpochHolds, sandboxOf, sandboxRunOf, sandboxRunHolds } from './sandbox.js'
import { chooseOf, tenOf, cubeOf, qpuHandleOf, facesOf, electronicsOf, balanceOf, capacityOf, speedOf } from '../../../families/lattice/lattice.js'
export { chooseOf, tenOf, cubeOf, qpuHandleOf, facesOf, electronicsOf, balanceOf, capacityOf, speedOf, latticeNamesOf } from '../../../families/lattice/lattice.js'
import { genesisOf, pentagramOf, accessOf, qpuHologramOf, qpuZoneOf, zoneHostOf, tenantZoneOf, schemasOf, qpuCiteOf, presenceOf, cssOf, reflectOf, robotsOf } from './presentation.js'
export { genesisOf, pentagramOf, accessOf, qpuHologramOf, qpuZoneOf, zoneHostOf, tenantZoneOf, schemasOf, qpuCiteOf, presenceOf, cssOf, reflectOf, robotsOf, seoZoneOf, combinatoricsWindowOf, qpuPageOf } from './presentation.js'
import { encryptOf, cybersecurityOf, cybersecurityToolsOf } from './crypto.js'
export { encryptOf, cybersecurityOf, cybersecurityToolsOf } from './crypto.js'
import { graphStateOf, qpuComposeOf, composeLiveOf, probeableOf, probeLiveOf, apisLiveOf, crossOf } from './fuse.js'
export { schemaMethodsOf, fuseOf, graphStateOf, qpuComposeOf, composeLiveOf, probeableOf, probeLiveOf, apisLiveOf, crossOf } from './fuse.js'
import { payloadMcpOf, payloadFindOf, fusionOf, intelligenceOf } from './cms.js'
export { payloadMcpOf, payloadFindOf, fusionOf, intelligenceOf } from './cms.js'
// a function declaration, so it is ready before any module body runs: the modules cooled out of this file call it as
// they load, while this file is still loading them
function onceOf<T>(build: () => T): () => T {
  let built: { value: T } | undefined
  return () => (built ??= { value: build() }).value
}
export type QpuReceipt = { name: string; dim: number; fold: string; amplitudes?: readonly string[]; nonzero?: number; qubits?: number; uuid?: string; subject?: string; referrer?: string; stream?: string; seq?: number; prev?: string }
/** The exact state worth carrying in the receipt: what was measured — eight amplitudes, the Born weights themselves.
 * Every other state folds only; it is recomputable from the gate list, and a proof that carried every 512-amplitude
 * modexp state weighed megabytes per run. */
const RECEIPT_STATES = ['measure'] as const
const RECEIPTS: QpuReceipt[] = []
const FNV_OFFSET = 0xcbf29ce484222325n
const FNV_PRIME = 0x100000001b3n
const FNV_MASK = 0xffffffffffffffffn
// the same FNV-1a construction foldOf uses, at the width the cube declares for an address: the published
// 128-bit offset basis and prime, masked to vertices x hexbit hex digits.
const FNV128_OFFSET = 0x6c62272e07bb014262b821756295c58dn
const FNV128_PRIME = 0x1000000000000000000013bn
/** A fold is sixteen lowercase hex, it is deterministic, and it separates — the three things every caller of it
 *  relies on. Asked over the lattice's own numbers so the check computes rather than samples one string. */
export const foldHolds = (): boolean => {
  const shape = /^[0-9a-f]{16}$/
  const seen = new Set<string>()
  for (let k = n - n; k < mintOf(n); k++) {
    const fold = foldOf(`fold-${k}`)
    if (!shape.test(fold) || fold !== foldOf(`fold-${k}`)) return false
    seen.add(fold)
  }
  return seen.size === mintOf(n) && foldOf('') !== foldOf(' ')
}

/**
 * FNV-1a 64 fold of a string to 16 lowercase hex digits (BigInt arithmetic); the hash every receipt, ETag and content address in the unit is built on.
 * @wing receipts
 * @kind builder
 * @evidence foldHolds
 */
export const foldOf = (text: string): string => {
  let h = FNV_OFFSET
  for (let i = text.length - text.length; i < text.length; i++) {
    h ^= BigInt(text.charCodeAt(i))
    h = (h * FNV_PRIME) & FNV_MASK
  }
  return h.toString(HEX_RADIX).padStart(FOLD_DIGITS, '0')
}

const receiptOf = (name: string, amps: readonly bigint[]): void => {
  const decimal = amps.map((a) => a.toString())
  const row: QpuReceipt = { name, dim: amps.length, fold: foldOf(decimal.join(',')) }
  if ((RECEIPT_STATES as readonly string[]).includes(name)) row.amplitudes = decimal
  RECEIPTS.push(row)
}
/** A sparse state's receipt: the fold of its nonzero amplitudes as index:weight pairs in index order, and their count.
 * `dim` is the full dimension as a Number (inexact past 2^53, Infinity past 2^1024) and `qubits` carries it exactly; the fold
 * is exact because the pairs are decimal text of bigints. */
const receiptSparseOf = (name: string, dim: bigint, pairs: readonly (readonly [bigint, bigint])[]): void => {
  RECEIPTS.push({ name, dim: Number(dim), fold: foldOf(pairs.map(([i, w]) => `${i}:${w}`).join(',')), nonzero: pairs.length, qubits: dim.toString(2).length - 1 })
}
/**
 * FOREIGN READS: every time this process asked a host it does not own.
 *
 * The receipt folds the computation a run performed, and it is deterministic — three identical runs fold byte for
 * byte. It is NOT invariant under a third party's silence, and it cannot be: when opendata.cern.ch answers, the
 * readers build documents and mint amplitudes that a refused run never builds. Measured across five outage shapes,
 * five of a hundred and sixty-two rows moved, and every one of them had called a foreign door.
 *
 * `npm run proof` asks git whether the receipt moved, and a receipt that moves for someone else's weather points
 * at this repository for something that did not happen here. So a row records whether it consulted anyone, the
 * proof folds the rows that did not, and the rows that did fold separately and are reported rather than gated.
 * That is the three-state law applied to the receipt itself: computed, read, or not decidable here.
 *
 * A counter, not a list of URLs — the host is already named in the row's own miss shape, and a list would put the
 * network's ordering into the ledger.
 */
/** The bound on one reading of a host this tree does not own: ten seconds, shared by every door in that reading. */
const foreignDeadlineOf = (): AbortSignal => AbortSignal.timeout(tenOf(cubeOf().hexbit))

/**
 * A HOST THAT HAS ALREADY RUN OUT THE CLOCK IS NOT ASKED AGAIN THIS WINDOW.
 *
 * A refusal is cheap: the connection fails and the reader says so. A HANG is not — the host accepts the socket,
 * says nothing, and costs the entire deadline. Every subsequent ask costs it again, so the price of a silent
 * upstream is one deadline times however many doors the call graph happens to walk, which is a number no caller
 * chose and no reader can predict. On a CI runner five tests passed their budgets and were CANCELLED, writing no
 * receipts at all; the same suite on a laptop twice as fast finished in eleven seconds. A bound whose verdict
 * depends on how fast the machine is is not a bound.
 *
 * So the first timeout is paid and the rest are not: while a host is marked silent, its doors return the miss
 * they were going to return anyway, immediately. The cost of a hang becomes one deadline per process instead of
 * one per ask, which is a number a caller can reason about, and on Cloudflare it stops a dead upstream from
 * spending a request's fifty subrequests on silence.
 *
 * ONLY A TIMEOUT OPENS IT, NEVER A REFUSAL. A refused connection is already cheap and is often transient — a
 * blip must not make this tree stop asking. And the mark expires with the same window the reading memo uses, so
 * a host that recovers is tried again rather than written off for the life of the isolate.
 *
 * THE MISS IS THE SAME MISS. Nothing here changes what a reader reports, only how long it takes to report it:
 * the doors answer unreached either way, which is why the proof does not move and only the reading count does.
 */
// the window is a count of foreign reads, not milliseconds: a formula off the lattice, so the silence is measured in
// the unit's own logical steps (FOREIGN.reads) and never in wall-clock time
const foreignWindowOf = (): number => tenOf(cubeOf().hexbit) * coins
const SILENT = new Map<string, number>()
const foreignSilentHolds = (host: string, at = FOREIGN.reads): boolean => {
  const since = SILENT.get(host)
  return since !== undefined && at - since < foreignWindowOf()
}

/** Every ask of a host this tree does not own goes through here: counted, bounded, caught, and never twice into
 *  a silence. The three readers each spelled the same three lines, and a rule in three places is three rules. */
const foreignFetchOf = async (request: Request, signal: AbortSignal): Promise<Response | undefined> => {
  const host = new URL(request.url).host
  foreignReadOf()
  if (foreignSilentHolds(host)) return undefined
  const response = await fetch(request, { signal }).catch((reason: unknown) => {
    // the deadline fired, rather than the connection being refused: this host is silent, not merely unreachable
    if ((reason as { name?: string })?.name === 'TimeoutError' || (reason as { name?: string })?.name === 'AbortError') SILENT.set(host, FOREIGN.reads)
    return undefined
  })
  if (response) SILENT.delete(host)
  return response
}

const FOREIGN = { reads: 0 }
/**
 * How many times this process has read a host it does not own (CERN, Crossref, registries). Receipts fold computed rows and foreign-read rows apart.
 * @wing science
 * @kind builder
 * @evidence foreignReadsHolds
 */
export const foreignReadsOf = (): number => FOREIGN.reads
/** A count of asks is a count: never negative, and never fractional. It rises and does not fall within a process. */
export const foreignReadsHolds = (reads = foreignReadsOf()): boolean => Number.isSafeInteger(reads) && reads >= 0
const foreignReadOf = (): void => {
  FOREIGN.reads = FOREIGN.reads + 1
}

/**
 * mint receipts: every amplitude-count doubling this process computed — a counter and a running chain, never a list.
 *
 * TWO CHAINS, BECAUSE A ROW MAY NOT INHERIT ITS NEIGHBOURS' HISTORY. `chain` is the process's, folded over every
 * doubling since start; `scope` is folded over the doublings since it was last opened, and the test wrapper opens
 * one per test. A row used to carry the process chain, so its value depended on every test that had run before it
 * — and a test that computed identical amplitudes, identical kinds, identical dims and an identical receipt still
 * folded differently because an EARLIER test had reached CERN and minted more. That is an order dependency wearing
 * a proof's clothes: it would also have moved if a test were renamed, reordered, or added.
 *
 * Measured: `start measure generate` differed between a reached run and a blocked one in its mint chain alone,
 * with every other field on the row byte-identical.
 */
const MINT = { calls: 0, chain: FNV_OFFSET, scope: FNV_OFFSET }
/**
 * The mint ledger: number of mintOf calls and the two FNV chains (process-wide and current scope) over every k:x it minted.
 * @wing receipts
 * @kind builder
 */
export const qpuMintReceiptOf = () => ({ calls: MINT.calls, chain: MINT.chain.toString(HEX_RADIX).padStart(FOLD_DIGITS, '0'), scope: MINT.scope.toString(HEX_RADIX).padStart(FOLD_DIGITS, '0') })
/** Both chains are sixteen hex digits, and an unopened scope is the offset basis — the fold of nothing. */
export const mintScopeOpenHolds = (closed = MINT.scope.toString(HEX_RADIX).padStart(FOLD_DIGITS, '0')): boolean => /^[0-9a-f]{16}$/.test(closed)

/**
 * Start a fresh scope chain and answer the one just closed, so a caller can bracket a region and fold only it.
 * @wing agents
 * @kind builder
 * @evidence mintScopeOpenHolds
 */
export const mintScopeOpenOf = (): string => {
  const closed = MINT.scope.toString(HEX_RADIX).padStart(FOLD_DIGITS, '0')
  MINT.scope = FNV_OFFSET
  return closed
}
const foldTextInto = (seed: bigint, text: string): bigint => {
  let h = seed
  for (let i = text.length - text.length; i < text.length; i++) {
    h ^= BigInt(text.charCodeAt(i))
    h = (h * FNV_PRIME) & FNV_MASK
  }
  return h
}
const mintReceiptOf = (k: number, x: number): void => {
  MINT.calls = MINT.calls + 1
  const text = `${k}:${x}`
  MINT.chain = foldTextInto(MINT.chain, text)
  MINT.scope = foldTextInto(MINT.scope, text)
}
/**
 * The ledger of every quantum computation this process ran, in order.
 * @wing receipts
 * @kind builder
 */
export const receiptLedgerOf = (): readonly QpuReceipt[] => RECEIPTS
/** A UUID-addressed computation's quantum receipt. The payload — what ran (subject, a content UUID), under which
 *  name, and what it returned — folds to `fold`; the receipt's own UUID is programmable: the content address of
 *  that payload and its referrer, so the same computation reached through two referrers carries two receipts and
 *  the same computation through the same referrer carries one. Non-finite numbers keep their own text. */
/** Stream heads: the last receipt UUID per stream, its length, and the SHA-256 chain over every UUID in order. */
const STREAMS = new Map<string, { head: string; length: number; chain: string }>()
const receiptFoldOf = (text: string): string => sha256Hex(text).slice(n - n, FOLD_DIGITS)
/** RFC 9562 v8 receipt UUID: SHA-256 of the payload fold and the referrer. */
const receiptUuidOf = (fold: string, referrer: string): string => {
  const h = sha256Hex(JSON.stringify({ payload: fold, referrer }))
  const variant = (mintOf(n) + (parseInt(h[UUID_SIXTEEN]!, UUID_SIXTEEN) % UUID_FOUR)).toString(UUID_SIXTEEN)
  return uuidStampOf(`${h.slice(n - n, UUID_SIXTEEN)}${variant}${h.slice(UUID_SIXTEEN + seed, coins * UUID_SIXTEEN)}`)
}
const receiptChainOf = (chain: string, uuid: string): string => sha256Hex(`${chain}${uuid}`)
/** A public referrer is another formula's address (the torus). A Referer, a name, an email, an IP, or any other caller string is not. */
const ADDRESS_REFERRER = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export const addressReferrerOf = (referrer?: string): string | undefined =>
  typeof referrer === 'string' && ADDRESS_REFERRER.test(referrer) ? referrer : undefined
/**
 * Append a quantum receipt for a UUID-addressed computation: payload fold of {name, subject, value}; receipt UUID = content UUID of {payload fold, referrer}; chained per stream (seq, prev).
 * @wing receipts
 * @kind builder
 * @evidence uuidReceiptHolds
 */
export const uuidReceiptOf = (name: string, subject: string, value: unknown, referrer?: string): QpuReceipt & { uuid: string; subject: string; referrer: string; stream: string; seq: number; prev: string } => {
  const stream = name.split(' ')[n - n] ?? name
  const at = STREAMS.get(stream) ?? { head: `${unit.origin}/receipts/${stream}`, length: n - n, chain: '' }
  const by = referrer ?? at.head
  const fold = receiptFoldOf(canonicalTextOf({ name, subject, value }))
  const uuid = receiptUuidOf(fold, by)
  const row = { name, dim: seed, fold, uuid, subject, referrer: by, stream, seq: at.length, prev: at.head }
  STREAMS.set(stream, { head: uuid, length: at.length + seed, chain: receiptChainOf(at.chain, uuid) })
  RECEIPTS.push(row)
  return row
}
/** Every stream replayed from the ledger: each row's prev is the UUID before it (genesis is the stream's href), each
  * @wing receipts
  * @kind builder
  * @evidence receiptStreamsOf
 *  UUID recomputes from its payload fold and referrer, and the replayed chain equals the live head's. */
export const receiptStreamsOf = (limit = cubeOf().bits) => {
  const rows = RECEIPTS.filter((r): r is QpuReceipt & { uuid: string; stream: string; seq: number; prev: string; referrer: string } => r.stream !== undefined)
  const streams = [...STREAMS.entries()].map(([stream, live]) => {
    const own = rows.filter((r) => r.stream === stream)
    let head = `${unit.origin}/receipts/${stream}`
    let chain = ''
    let linked = true
    for (const r of own) {
      linked = linked && r.prev === head && r.uuid === receiptUuidOf(r.fold, r.referrer)
      head = r.uuid
      chain = receiptChainOf(chain, r.uuid)
    }
    return {
      stream,
      href: `${unit.origin}/receipts/${stream}`,
      length: live.length,
      head: live.head,
      chain: live.chain,
      recent: own.slice(-limit).map((r) => {
        if (addressReferrerOf(r.referrer)) return r
        const { referrer: _identity, ...kept } = r
        return kept
      }),
      holds: linked && own.length === live.length && head === live.head && chain === live.chain,
    }
  })
  return { kind: 'receipts' as const, streams, receipts: RECEIPTS.length, holds: streams.every((s) => s.holds) }
}
export const uuidReceiptHolds = (): boolean => {
  const a = uuidReceiptOf('holds', contentUuidOf(seed), seed, 'a')
  const b = uuidReceiptOf('holds', contentUuidOf(seed), seed, 'b')
  const c = uuidReceiptOf('holds', contentUuidOf(seed), coins, 'a')
  return a.fold === b.fold && a.uuid !== b.uuid && a.uuid !== c.uuid && a.uuid === uuidReceiptOf('holds', contentUuidOf(seed), seed, 'a').uuid
}
/**
 * Fold a list of receipt rows (name:dim:fold) to one 16-hex digest; the proof compares this digest across runs.
 * @wing receipts
 * @kind builder
 */
export const qpuReceiptFoldOf = (rows: readonly QpuReceipt[] = RECEIPTS): string => foldOf(rows.map((r) => `${r.name}:${r.dim}:${r.fold}`).join('|'))
/** The lattice's doubling, exported so nothing has to re-implement it. A second mintOf would be the duplication
  * @wing agents
  * @kind builder
 *  this file just finished removing, one level down. */
export const mintOf = (k: number): number => {
  let x = k - k
  x = x + 1
  for (let i = k - k; i < k; i++) x += x
  mintReceiptOf(k, x)
  return x
}

/** Powers of ten, and they are exact: a run of them must multiply up rather than drift. */
export const tenOfHolds = (k = n): boolean => tenOf(k) === tenOf(k - seed) * ten && tenOf(n - n) === seed

/** chooseOf is symmetric and Pascal's rule closes it — two identities, so a wrong table fails both. */
export const chooseOfHolds = (nn = facesOf().faces, k = coins): boolean =>
  chooseOf(nn, k) === chooseOf(nn, nn - k) && chooseOf(nn, k) === chooseOf(nn - seed, k - seed) + chooseOf(nn - seed, k)

const faceOf = (text: string, modulus: number): number => {
  const none = modulus - modulus
  if (modulus <= none) return none
  let x = 0n
  for (let i = none; i < text.length; i++) x += BigInt(text.charCodeAt(i) ?? none)
  return Number(x % BigInt(modulus))
}

const discoverOf = () => {
  const segments = ['quantum', 'processing', 'unit'] as const
  const n = segments.length
  const none = n - n
  const kind = segments.map((s) => s[none]!).join('').toLowerCase()
  const host = `${kind}.uuidna.com`
  const path = segments.join('/')
  const seed = mintOf(none)
  const href = `https://${host}/${path}`
  const origin = `https://${host}`
  const doors = ['/', `/${path}`] as const
  const mint = { seed, next: mintOf(n + seed) }
  const src = `src/${path}/index.ts`
  const lean = `src/${path}/index.lean`
  const fuse = { next: href, origin, src, lean }
  const holds =
    kind === 'qpu' &&
    host === `${kind}.uuidna.com` &&
    href === `https://${host}/${path}` &&
    !host.includes('*') &&
    fuse.src === `src/${path}/index.ts` &&
    fuse.lean === `src/${path}/index.lean` &&
    mint.next === mintOf(n) + mintOf(n) &&
    doors[none] === '/' &&
    doors[seed] === `/${path}`
  return { kind, host, path, href, origin, mint, fuse, doors, holds }
}

const unit = discoverOf()
const dead = '{"holds":false}'
const cors = '*' as const
const schemaOrg = 'https://schema.org' as const
const headers = {
  'content-type': 'application/ld+json; charset=utf-8',
  'access-control-allow-origin': cors,
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, mcp-protocol-version, mcp-session-id',
  'cache-control': 'no-store'}
const seed = unit.mint.seed
const coins = seed + seed
// THE REGISTER IS THE LATTICE'S, NOT THE PATH'S. n was `unit.path.split('/').length` — the qubit count read off
// how deep this file sits, a second derivation of the segments.length discoverOf already had, and one that resized
// the machine on a rename. It is instead the unique bit-count the seal REQUIRES: harmonic holds (faces = rays + rays,
// with faces = 2^n + 2^coins + coins and rays = n + coins + coins) at exactly one n for a given coins. The path is a
// route again, not the physics. (theorem harmonic, theorem around; falls back to the old reading if no n solves.)
const n = ((): number => {
  for (let k = seed; k <= mintOf(coins) + coins; k++)
    if (mintOf(k) + mintOf(coins) + coins === (k + coins + coins) + (k + coins + coins)) return k
  return unit.path.split('/').length
})()
/** One occupancy pentagram. Train dry-cleans; installer does not redeclare it. */
const occupancies = ['personal', 'business', 'corporate', 'saas', 'paas'] as const
const skills = ['payload', 'pwa', 'plugin', 'hologram', 'network'] as const
const ten = n * n + seed

/**
 * THE FOLD'S RADIX AND ITS WIDTH ARE THE SAME NUMBER AND NOT THE SAME QUANTITY.
 *
 * Sixteen appears twice on the line that returns a fold, meaning something different each time: the base a
 * hex digit counts in, and how many of those digits a sixty-four-bit fold takes. Both were bare, so a reader
 * had no way to tell which one would move if the fold were widened — and neither would have. hexOf already
 * said the radix properly, as mintOf of the cube's hexbit; foldOf, the function the entire receipt rests
 * on, did not.
 *
 * Derived rather than declared: a hex digit is mintOf(coins) bits, so the radix is mintOf of that, and a
 * fold of coins × bits bits takes that many digits. Widen the fold and the padding follows instead of lying.
 * These sit here rather than beside foldOf because the primitives they need are declared here, and the
 * fold is only ever called after this module has finished initialising.
 */
const HEX_RADIX = mintOf(mintOf(coins))
/**
 * THE SEALED GROUP WIDTHS, DECLARED ONCE, and the layout that uses them.
 *
 * 8-4-4-4-12 is one layout and it was re-derived in three places — shapeUuidOf and both halves of the
 * combinatorial codec — each spelling mintOf(n), mintOf(coins) and mintOf(mintOf(coins)) again and each
 * re-joining the groups by hand. The note beside shapeUuidOf's own triple says a second derivation that
 * happens to agree is the drift this tree keeps catching. There were three, and two of them were added the
 * same day the codec was.
 */
const UUID_EIGHT = mintOf(n)
const UUID_FOUR = mintOf(coins)
const UUID_SIXTEEN = mintOf(mintOf(coins))

/** The five groups of one 32-hex address — the one place a UUID's dashes are placed. */
const uuidGroupsOf = (a: string, b: string, c: string, d: string, e: string): string => [a, b, c, d, e].join('-')

const FOLD_DIGITS = (coins * mintOf(n + coins)) / mintOf(coins)

/**
 * THE LEAN THEOREMS, MIRRORED ONCE EACH, NAMED AS index.lean NAMES THEM.
 *
 * Seven identities were restated inline about sixty-six times across this file — `faces.faces === coins *
 * faces.rays` nine times, `next === fused + fused` eighteen, `coil === faces` fifteen, each with a different
 * receiver and none of them saying which theorem it was. Every restatement is a place the identity can be typed
 * wrong and go on passing, and a place a reader has to re-derive what they are looking at. The Lean file is the
 * authority for the statement AND for the name, so each identity has exactly one mirror here.
 *
 * This is the rule the build already applies across the language boundary — emit() requires a js: mirror beside
 * every lean: statement and hard-fails when the two disagree — turned inward on the file's own arithmetic. A
 * mirror that exists once can disagree with Lean once; sixty-six copies can disagree sixty-six ways.
 *
 * Operands are passed rather than closed over, because the sites hold these quantities under a dozen different
 * receivers (faces.faces, c.lattice.faces, p.coil.faces) and a mirror that reached for module state would be
 * checking something other than what the caller has in hand.
 */
const theorem = {
  /** theorem around : faces = coins * rays */
  around: (faces: number, coins: number, rays: number): boolean => faces === coins * rays,
  /** theorem harmonic : faces = rays + rays */
  harmonic: (faces: number, rays: number): boolean => faces === rays + rays,
  /** theorem next_fused : faces * mintOf (bits + coins) = fused + fused */
  next_fused: (next: number, fused: number): boolean => next === fused + fused,
  /** theorem electronics : coil = faces (by two_coins_make_a_coil) */
  electronics: (coil: number, faces: number): boolean => coil === faces,
  /** theorem cube : bits = vertices * hexbit */
  cube: (bits: number, vertices: number, hexbit: number): boolean => bits === vertices * hexbit,
  /** theorem handle : amplitudes = mintOf bits, read as fused = faces * amplitudes */
  handle: (fused: number, faces: number, amplitudes: number): boolean => fused === faces * amplitudes,

  /**
   * SYMMETRIC AND ASYMMETRIC, AND THE BRIDGE THAT CARRIES EACH TO THE OTHER.
   *
   * Every quantity in this lattice is stated twice: once as a SUM of like terms, which is symmetric under
   * exchanging them, and once as a PRODUCT of unlike terms, which is not. index.lean does not treat these as two
   * facts — it derives one from the other, and the derivation is the interesting part:
   *
   *   theorem harmonic : faces = rays + rays := by rw [around, coins_two, Nat.two_mul]
   *
   * faces = rays + rays is proved FROM faces = coins * rays, and what carries it across is coins = seed + seed.
   * The bridge is doubling: a product by two and a sum with itself are the same operation seen from either side.
   *
   * mintOf_add is the general form of that bridge — mintOf (a + b) = mintOf a * mintOf b — and it is why the cube
   * can be read either way: bits = n + coins additively, bits = vertices * hexbit multiplicatively, the same 32.
   *
   * And the two forms COINCIDE at exactly one value. x + x = x * x only at x = 0 and x = 2, and x + x = mintOf x
   * only at x = 2 — so coins is the one place where the symmetric and asymmetric readings of a quantity are the
   * same number. That is not decoration: it is why a lattice built on coins can be read both ways at all, and it
   * is the reason theorem tetra and theorem dense both hold while neither generalises.
   */
  /** theorem tetra : coins + coins = mintOf coins — the symmetric reading */
  tetra: (x: number): boolean => x + x === mintOf(x),
  /** theorem dense : coins * coins = mintOf coins — the asymmetric reading of the same quantity */
  dense: (x: number): boolean => x * x === mintOf(x),
  /** theorem multiply / mintOf_add : mintOf (a + b) = mintOf a * mintOf b — the bridge itself, sum to product */
  multiply: (a: number, b: number): boolean => mintOf(a + b) === mintOf(a) * mintOf(b),
} as const

const found = coins * ten * ten
const lost = mintOf(coins) * (ten * ten + seed)
const unauthorized = mintOf(coins) * ten * ten + seed
const badRequest = unauthorized - seed
/** JSON-RPC 2.0 reserved error codes, as the specification numbers them. */
const rpcCodes = { parse: -32700, invalid: -32600, method: -32601, params: -32602 } as const
/** A JSON-RPC 2.0 error, as the protocol spells it: `jsonrpc`, the request's `id` (null when none was understood), and an
 * `error` with code and message. A parse error or an invalid request travels on HTTP 400, because no request was understood;
 * an unknown method or unknown tool travels on HTTP 200, because the request was understood and declined. Never
  * @wing agents
  * @kind builder
 * `{"holds":false}` on a 404: that is the shape of a missing page, not of a declined call. */
export const rpcErrorOf = (id: unknown, code: number, message: string, data?: unknown) => ({
  jsonrpc: '2.0' as const,
  id: id === undefined ? null : id,
  error: data === undefined ? { code, message } : { code, message, data },
})
/** The methods this server answers on /api. */
const rpcMethods = ['initialize', 'server/discover', 'ping', 'notifications/initialized', 'tools/list', 'tools/call'] as const
type McpExtension = { handler: (params: Record<string, unknown>, env?: QpuEnv) => unknown; capability?: Record<string, unknown> }
const MCP_EXTENSIONS = new Map<string, McpExtension>()
/**
 * Register a JSON-RPC method on /api (resources, prompts, completion, logging) and the capability it adds to initialize.
 * A handler that throws { code, message } answers that JSON-RPC error.
 * @wing receipts
 * @kind function
 */
export const mcpRegisterOf = (method: string, handler: McpExtension['handler'], capability?: Record<string, unknown>): string => {
  MCP_EXTENSIONS.set(method, { handler, capability })
  return method
}
type FusedTool = { description: string; inputSchema: Record<string, unknown>; run: (args: Record<string, unknown>, env?: QpuEnv, auth?: string | null) => unknown }
const FUSED_TOOLS = new Map<string, FusedTool>()
/**
 * Fuse a tool into the unit: answered by tools/call, never added to tools/list, so the sixteen sealed doors stay sixteen.
 * @wing agents
 * @kind function
 */
export const mcpFuseOf = (name: string, tool: FusedTool): string => {
  FUSED_TOOLS.set(name, tool)
  return name
}
/** Every fused tool with its contract: the catalogue a client reads to call what tools/list does not show. */
export const mcpFusedOf = () => [...FUSED_TOOLS].map(([name, t]) => ({ name, description: t.description, inputSchema: t.inputSchema }))
/**
 * Every live public dataset the fused data door checks, read now and carried by prove { live: true }: the
 * proof's live block names what agrees with the unit, what differs and what could not be reached. A reading is a
 * report, not a gate: a stale registry or an unreachable host leaves holds alone (no locks).
 * @wing agents
 * @kind builder
 */
export const dataLiveOf = async (env?: QpuEnv, from = n - n, take = facesOf().faces) => {
  const door = FUSED_TOOLS.get('data')
  if (!door) return { kind: 'data-live' as const, sources: n - n, agree: n - n, differ: [] as string[], unreachable: [] as string[], rows: [] as { label: string; agrees: boolean; reading: unknown }[], holds: false }
  const listed = (await door.run({ source: 'all' }, env)) as { sources?: { source: string; args: Record<string, unknown>; label: string; checks: string }[] }
  const all = listed.sources ?? []
  // a slice per call, faces at a time: no one call reads every source
  const sources = all.slice(from, from + take)
  const rows = await Promise.all(sources.map(async (s) => {
    const r = (await door.run({ source: s.source, ...s.args }, env)) as { agrees?: boolean; denied?: string; reading?: unknown; receipt?: string }
    return { label: s.label, checks: s.checks, agrees: r.agrees === true, unreachable: r.denied === 'unreachable', reading: r.reading, receipt: r.receipt }
  }))
  return {
    kind: 'data-live' as const,
    from,
    take: rows.length,
    total: all.length,
    ...(from + rows.length < all.length ? { next: from + rows.length } : {}),
    sources: rows.length,
    agree: rows.filter((r) => r.agrees).length,
    differ: rows.filter((r) => !r.agrees && !r.unreachable).map((r) => r.label),
    unreachable: rows.filter((r) => r.unreachable).map((r) => r.label),
    rows,
    holds: rows.length > n - n,
  }
}
const byDecideOf = (theorem: string): boolean => theorem.includes('by decide') || theorem.includes('native_decide')
const formulaOf = (formula: string): boolean => formula.includes('\\') && !formula.includes('operatorname')
const fullProperty = { type: 'boolean', description: '{ full: true } expands the recognition into the document.' } as const
const manSchema = {
  type: 'object',
  properties: {
    man: { type: 'boolean', description: 'Return the man page: call with { man: true }. tools/list stays lean; the man page is one call away.' },
    full: fullProperty}} as const

const liveSchema = {
  type: 'object',
  properties: {
    man: { type: 'boolean', description: 'Return the man page: call with { man: true }. tools/list stays lean; the man page is one call away.' },
    full: fullProperty,
    live: { type: 'boolean', description: '{ live: true } learn CERN occupancy. fetch Request Response. Memory.' },
    sequence: { type: 'boolean', description: '{ sequence: true } train then improve then compete then prove. Live. Memory.' },
    from: { type: 'integer', description: '{ live: true, from } on train: fuse the registry window starting at from; next says where the following window starts.' }}} as const

/** theorem cube, both ways: bits as a product of vertices and hexbit, and each of those as a doubling. */
export const qpuCubeHolds = (c = cubeOf()): boolean =>
  theorem.cube(c.bits, c.vertices, c.hexbit) && c.vertices === mintOf(c.n) && c.hexbit === mintOf(c.n - seed)


/**
 * BOTH READINGS, AND EACH PROVES THE OTHER.
 *
 * faces is stated twice in index.lean — coins * rays, a product of unlike terms, and rays + rays, a sum of like
 * ones — and harmonic is derived FROM around by coins_two. A predicate that checked only one of them would pass
 * on a lattice where the two had come apart, which is precisely the lattice that is broken.
 */
export const facesHolds = (f = facesOf()): boolean =>
  theorem.around(f.faces, f.coins, f.rays) && theorem.harmonic(f.faces, f.rays) && f.coins + f.coins === mintOf(f.coins)

/**
 * Two coins make a coil. Coins balance theory in practice. Coil sits in electronics.
 * @wing agents
 * @kind builder
 * @evidence coilHolds
 */
export const coilOf = onceOf(() => {
  const faces = facesOf()
  const theory = seed
  const practice = seed
  const windings = coins
  const coil = coins * faces.rays
  const balance = theory + practice
  const holds =
    windings === coins &&
    windings === theory + practice &&
    theory === practice &&
    balance === coins &&
    theorem.electronics(coil, faces.faces) &&
    faces.holds === true
  return {
    kind: 'coil' as const,
    theorem: 'two_coins_make_a_coil' as const,
    windings,
    coins,
    rays: faces.rays,
    coil,
    faces: faces.faces,
    theory,
    practice,
    balance,
    holds,
  }
})

export const coilHolds = (c = coilOf()): boolean =>
  c.holds === true &&
  c.kind === 'coil' &&
  c.theorem === 'two_coins_make_a_coil' &&
  c.windings === coins &&
  c.theory === seed &&
  c.practice === seed &&
  c.theory === c.practice &&
  c.balance === coins &&
  theorem.electronics(c.coil, c.faces)

export const electronicsHolds = (e = electronicsOf()): boolean =>
  e.holds === true &&
  e.kind === 'electronics' &&
  e.theorem === 'electronics' &&
  e.uses === 'coil' &&
  e.stages === n &&
  coilHolds(e.coil)

export const balanceHolds = (b = balanceOf()): boolean =>
  b.holds === true &&
  b.kind === 'balance' &&
  b.theorem === 'coins_balance_theory_in_practice' &&
  b.theory === b.practice &&
  b.theory + b.practice === coins &&
  coilHolds(b.coil)

/**
 * Next is the double. Handle next doubles amplitudes. Coil next doubles fused. No last k.
 * @wing agents
 * @kind builder
 * @evidence qpuNextHolds
 */
export const qpuNextOf = onceOf(() => {
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  const coil = coilOf()
  const fused = faces.faces * handle.kv.amplitudes
  const next = handle.amplitudes + handle.amplitudes
  const nextFused = fused + fused
  const nextCoil = coil.coil * mintOf(cube.bits + coins)
  const holds =
    coilHolds(coil) &&
    handle.holds === true &&
    next === mintOf(cube.bits + seed) &&
    next === handle.next &&
    nextFused === faces.faces * mintOf(cube.bits + coins) &&
    nextCoil === nextFused &&
    theorem.electronics(coil.coil, faces.faces)
  return {
    kind: 'next' as const,
    theorem: 'next_coil' as const,
    amplitudes: handle.amplitudes,
    next,
    fused,
    nextFused,
    nextCoil,
    coil: coil.coil,
    coins,
    holds,
  }
})

export const qpuNextHolds = (x = qpuNextOf()): boolean =>
  x.holds === true &&
  x.kind === 'next' &&
  x.theorem === 'next_coil' &&
  x.next === x.amplitudes + x.amplitudes &&
  x.nextFused === x.fused + x.fused &&
  x.nextCoil === x.nextFused &&
  x.nextCoil === x.coil * mintOf(cubeOf().bits + coins)

/**
 * 2×7 coins = 1+6 coils = clay. Each coil is coins windings.
 * @wing agents
 * @kind builder
 * @evidence qpuClayOf
 */
export const qpuClayOf = onceOf(() => {
  const coil = coilOf()
  const faces = facesOf()
  const six = mintOf(n) - coins
  const coils = seed + six
  const clay = coils * coins
  const holds =
    coilHolds(coil) &&
    six === mintOf(n) - coins &&
    coils === faces.rays &&
    coins * faces.rays === (seed + six) * coins &&
    (seed + six) * coins === coil.coil &&
    clay === coil.coil &&
    clay === faces.faces
  return {
    kind: 'clay' as const,
    theorem: 'clay' as const,
    coins,
    seven: faces.rays,
    six,
    coils,
    clay,
    coil: coil.coil,
    faces: faces.faces,
    holds,
  }
})


export const genesisHolds = (g = genesisOf()): boolean =>
  g.holds === true &&
  g.kind === 'genesis' &&
  g.framework === 'shadcn' &&
  g.hz === 432 &&
  g.domains.join(' ') === 'scanner radar' &&
  g.card[n + seed] === 'card-action'

export const pentagramHolds = (p = pentagramOf()): boolean =>
  p.holds === true &&
  p.kind === 'pentagram' &&
  p.single === true &&
  p.points === n + coins &&
  p.step === coins &&
  p.occupancies.join(' ') === 'personal business corporate saas paas' &&
  p.skills.join(' ') === 'payload pwa plugin hologram network' &&
  p.stroke.length === p.points &&
  p.occupancies[n - n] === 'personal' &&
  p.occupancies[p.points - seed] === 'paas'

/**
 * theorem follow_the_coins
 * @wing agents
 * @kind builder
 * @evidence followHolds
 */
export const qpuFollowOf = onceOf(() => {
  const coil = coilOf()
  const pentagram = pentagramOf()
  const electronics = electronicsOf()
  const genesis = genesisOf()
  const points = pentagram.points
  const applications = [...occupancies, ...skills, ...genesis.frameworks, electronics.kind] as const
  const solutions = applications.map((name, i) => {
    const app = i % points
    const hop = (app + coins) % points
    const via = (app + coil.theory + coil.practice) % points
    // hop ≡ via restates theory + practice = coins on this application; it is a balance, never a novelty claim
    const balanced = hop === via
    return {
      name,
      app,
      hop,
      via,
      balanced,
      occupancy: occupancies[hop]!,
      skill: skills[hop]!,
      holds: balanced && hop === (app + coil.balance) % points,
  }
  })
  const seen: number[] = []
  for (const row of solutions) if (!seen.includes(row.hop)) seen.push(row.hop)
  const balanced = solutions.every((row) => row.balanced && row.holds)
  const covered = seen.length === points
  const emerge = {
    kind: 'emerge' as const,
    theorem: 'emerge' as const,
    balanced,
    covered,
    coil: coil.coil,
    faces: coil.faces,
    holds: balanced && covered && theorem.electronics(coil.coil, coil.faces) && coil.theory === coil.practice,
  }
  const holds =
    coilHolds(coil) &&
    electronicsHolds(electronics) &&
    balanceHolds() &&
    pentagramHolds(pentagram) &&
    pentagram.step === coins &&
    applications.length === occupancies.length + skills.length + genesis.frameworks.length + seed &&
    solutions.length === applications.length &&
    solutions.every((row) => row.holds) &&
    emerge.holds
  return {
    kind: 'follow' as const,
    theorem: 'follow_the_coins' as const,
    coins,
    theory: coil.theory,
    practice: coil.practice,
    applications,
    solutions,
    emerge,
    holds,
  }
})

export const followHolds = (f = qpuFollowOf()): boolean =>
  f.holds === true &&
  f.kind === 'follow' &&
  f.theorem === 'follow_the_coins' &&
  f.coins === coins &&
  f.theory === f.practice &&
  f.theory + f.practice === coins &&
  f.emerge.kind === 'emerge' &&
  f.emerge.balanced === true &&
  f.emerge.covered === true &&
  theorem.electronics(f.emerge.coil, f.emerge.faces) &&
  f.solutions.every((row) => row.balanced && row.hop === (row.app + coins) % (n + coins))

/**
 * Coordinated dry-clean: two teams, occupancy pentagram, genesis coins. No extra sealed tool.
 * @wing agents
 * @kind builder
 * @evidence dryHolds
 */
export const dryOf = (genesis = genesisOf()) => {
  const pentagram = pentagramOf()
  const occupancy = pentagram.occupancies
  const holds = pentagram.holds === true && genesis.holds === true
  return {
    kind: 'clean' as const,
    speed: 'coordinated' as const,
    coordinated: coins === seed + seed,
    entropy: occupancies.join(' ').includes('random'),
    sealed: (toolNames as readonly string[]).includes('dry'),
    teams: coins,
    occupancy,
    domains: genesis.domains,
    hz: genesis.hz,
    holds,
  }
}

export const dryHolds = (d = dryOf()): boolean =>
  d.holds === true &&
  d.kind === 'clean' &&
  d.domains.join(' ') === 'scanner radar'

export const accessHolds = (a = accessOf()): boolean =>
  a.holds === true &&
  a.kind === 'access' &&
  a.keys.length === coins &&
  a.keys[n - n] === 'domain' &&
  a.keys[seed] === 'handle' &&
  a.occupancies.length === n + coins

export const hologramHolds = (h = qpuHologramOf()): boolean =>
  h.holds === true &&
  h.kind === 'hologram' &&
  h.fractal === true &&
  h.theorem === 'fusion' &&
  h.tools === mintOf(n) &&
  h.fused === capacityOf().fused &&
  pentagramHolds(h.pentagram) &&
  accessHolds(h.access) &&
  h.scales.length === n + coins &&
  h.scales.every((row) => row.fused === h.fused)

const storageHref = `${unit.origin}/storage`
const serverHref = `${unit.origin}/server`
const networkHref = `${unit.origin}/network`
const hexHref = `${unit.origin}/hex`
const storageBindings = { STORAGE: 'kv' as const, BLOBS: 'r2' as const }
const raidMark = '/@'
/** Cloudflare KV and R2 each return at most 1000 names per list call — their documented page. A PAGE SIZE per call,
 *  every listing continues by cursor until it holds the `limit` names asked for or the store is exhausted; storageListOf's
 *  default limit is facesOf().faces. */
const STORE_LIST_PAGE = tenOf(n)
/** HOW MANY LIST CALLS ONE REQUEST MAY MAKE, PER LAYER. Not a cap on what the store holds — a cap on what a single
 *  Worker invocation will spend finding out.
 *
 *  Removing the page cap on 2026-09-14 fixed a real fault (a single list call saw only the first page, so the store
 *  silently saw part of itself) and introduced a worse one: `keys()` and `raw()` then walked EVERY page of KV and
 *  every page of R2, and `GET /storage` calls both. A Worker has a subrequest budget per request, so past a few
 *  thousand keys the catalog stopped returning at all — measured on the live host, GET /storage hung until the
 *  client's headers timeout while /network and /server answered in a second.
 *
 *  A census is a census. The page budget bounds the subrequests; `complete` says whether the walk reached the end,
 *  so a partial answer is reported as partial instead of being read as the whole store. */
const STORE_SCAN_PAGES = mintOf(coins)
/** How many values one catalog request will read to estimate the store's size. Reads are subrequests; the byte
 *  total is a reading and not a gate, so it is sampled and labelled rather than paid for per key. */
const STORE_BYTES_SAMPLE = mintOf(mintOf(coins))
/** How many links one maintain call will repair, and how many orphans it will drop. A repair is a read and two
 *  writes; unbounded, the call runs out of the host's subrequests mid-store and so cannot report what it did — an edge limit, bounded here deliberately.
 *
 *  LOW, because one repair is not one write. A RAID rewrite puts the value and all fourteen shares, across KV and
 *  R2 — measured at 30 subrequests for a single link. Cloudflare allows 50 per request on the free plan, so a
 *  bound of eight would have been 240 and the repair would have failed the way the thing it repairs failed.
 *  `remaining` is how a caller knows to call again. */
const STORE_REPAIR_MAX = coins
/**
 * PLACEMENT IS STATE; A PUBLISHED DOCUMENT IS NOT. This counter is the RAID write cursor — each write lands on
 * the next disk, which is what spreads a cluster instead of stacking every object on disk zero, and raid.test
 * holds exactly that by writing a full rotation and checking the picks cover every disk.
 *
 * WHAT IT MUST NOT DO IS LEAK INTO A SERVED DOCUMENT. raidOf used to read it whenever a caller passed no
 * traffic, and that reading rides in GET / through circuit.register.efficiency, memoised at first serve — so
 * each isolate froze whichever count it happened to hold. Measured 2026-09-28: the live host served `fly`, then
 * `wasabi` from another isolate, while the build computed `cloudflare`, and verify-live — whose whole premise
 * is "no clock, no random" — could only pass by luck.
 *
 * So the cursor is passed EXPLICITLY by the write path that owns it, and every other caller gets the reference
 * placement, which a build can recompute. The first attempt at this deleted the counter outright on the
 * evidence that no caller passed one; raid.test refused that immediately, and it was right to.
 */
let raidTraffic = n - n

const raidClouds = [
  { name: 'cloudflare', href: 'https://developers.cloudflare.com/' },
  { name: 'amazon', href: 'https://aws.amazon.com/' },
  { name: 'google', href: 'https://cloud.google.com/' },
  { name: 'azure', href: 'https://azure.microsoft.com/' },
  { name: 'backblaze', href: 'https://www.backblaze.com/' },
  { name: 'wasabi', href: 'https://wasabi.com/' },
  { name: 'bunny', href: 'https://bunny.net/' },
  { name: 'fly', href: 'https://fly.io/' },
  { name: 'vercel', href: 'https://vercel.com/' },
  { name: 'supabase', href: 'https://supabase.com/' },
  { name: 'ibm', href: 'https://www.ibm.com/cloud' },
  { name: 'oracle', href: 'https://www.oracle.com/cloud/' },
  { name: 'ovh', href: 'https://www.ovhcloud.com/' },
  { name: 'hetzner', href: 'https://www.hetzner.com/' }] as const

const raidSafeOf = (key: string): boolean =>
  key.startsWith('docs') ||
  key.startsWith('sheets') ||
  key.startsWith('databases') ||
  key.startsWith('mail') ||
  key.startsWith('notes') ||
  key.startsWith('tables') ||
  key.startsWith('slides') ||
  key.startsWith('forms') ||
  key.startsWith('calendar')

const raidTypesOf = (faces: ReturnType<typeof facesOf>) =>
  [
    { name: '0', stripe: faces.faces, mirror: n - n, parity: n - n, speed: faces.faces, cost: seed, safe: false, rotate: false },
    { name: '1', stripe: seed, mirror: coins, parity: n - n, speed: seed, cost: coins, safe: true, rotate: false },
    { name: '2', stripe: n, mirror: n - n, parity: n, speed: n, cost: n, safe: true, rotate: false },
    { name: '3', stripe: faces.faces - seed, mirror: n - n, parity: seed, speed: faces.faces - seed, cost: seed, safe: true, rotate: false },
    { name: '4', stripe: faces.faces - seed, mirror: n - n, parity: seed, speed: faces.faces - seed, cost: seed, safe: true, rotate: false },
    { name: '5', stripe: faces.faces - seed, mirror: n - n, parity: seed, speed: faces.faces - seed, cost: seed, safe: true, rotate: true },
    { name: '6', stripe: faces.faces - coins, mirror: n - n, parity: coins, speed: faces.faces - coins, cost: coins, safe: true, rotate: true },
    { name: '10', stripe: faces.rays, mirror: coins, parity: n - n, speed: faces.rays, cost: coins, safe: true, rotate: false },
    { name: '01', stripe: faces.rays, mirror: coins, parity: n - n, speed: faces.rays, cost: coins, safe: true, rotate: false },
    { name: '50', stripe: faces.rays, mirror: n - n, parity: seed, speed: faces.rays - seed, cost: n, safe: true, rotate: true },
    { name: '60', stripe: faces.rays, mirror: n - n, parity: coins, speed: faces.rays - coins, cost: n, safe: true, rotate: true },
    { name: '1E', stripe: seed, mirror: coins, parity: seed, speed: coins, cost: n, safe: true, rotate: false },
    { name: '5E', stripe: faces.faces - coins, mirror: n - n, parity: seed, speed: faces.faces - coins, cost: coins, safe: true, rotate: true },
    { name: '6E', stripe: faces.faces - n, mirror: n - n, parity: coins, speed: faces.faces - n, cost: n, safe: true, rotate: true }] as const

const raidByCostOf = (rows: ReturnType<typeof raidTypesOf>) => {
  const sorted = [...rows]
  for (let i = seed; i < sorted.length; i++) {
    const cur = sorted[i]!
    let j = i
    while (j > n - n && sorted[j - seed]!.cost > cur.cost) {
      sorted[j] = sorted[j - seed]!
      j -= seed
    }
    sorted[j] = cur
  }
  return sorted
}

const raidPickOf = (sorted: ReturnType<typeof raidByCostOf>, demand: number, traffic: number) => {
  const chosen = sorted[traffic % sorted.length]!
  return {
    name: chosen.name,
    stripe: chosen.stripe,
    mirror: chosen.mirror,
    parity: chosen.parity,
    speed: chosen.speed,
    cost: chosen.cost,
    safe: chosen.safe,
    rotate: chosen.rotate,
    demand,
    meets: chosen.speed >= demand,
    start: 'cheapest' as const,
    cover: sorted.length === facesOf().faces}
}

/**
 * RAID 10 over the faces: rays stripes mirrored by coins teams, cheapest-first placement for a given traffic.
 * @wing storage
 * @kind builder
 * @evidence raidHolds
 */
export const raidOf = (input: { safe?: boolean; traffic?: number } = {}) => {
  const faces = facesOf()
  const disks = coins
  const stripes = faces.rays
  const teams = coins
  /* the reference placement unless a caller owns a cursor and says so — see the note on raidTraffic */
  const traffic = input.traffic ?? n - n
  const demand = traffic % (faces.faces + seed)
  const types = raidTypesOf(faces)
  const sorted = raidByCostOf(types)
  const cover = sorted.map((row) => row.name)
  const cheapest = sorted[n - n]!
  const rotated = sorted.map((row, i) => ({
    ...row,
    face: (i + traffic) % faces.faces,
    cloud: raidClouds[(i + traffic) % raidClouds.length]!.name}))
  const pick = raidPickOf(sorted, demand, traffic)
  const cluster = {
    kind: 'cluster' as const,
    clouds: raidClouds.length,
    teams,
    stripes,
    measure: teams * stripes,
    remainder: n - n,
    unity: seed,
    route: 'involution' as const,
    security: 'crypt' as const,
    speed: 'coordinated' as const,
    cost: 'minimum' as const,
    start: 'cheapest' as const,
    cover: cover.length,
    safe: types.filter((row) => row.safe).length === faces.faces - seed,
    rotate: rotated.every((row, i) => row.face === (i + traffic) % faces.faces),
    holds:
      raidClouds.length === faces.faces &&
      types.length === faces.faces &&
      cover.length === faces.faces &&
      cheapest.cost === seed &&
      pick.cover === true &&
      pick.start === 'cheapest' &&
      teams * stripes === faces.faces &&
      faces.faces === stripes + stripes}
  const holds =
    faces.holds &&
    faces.faces === disks * stripes &&
    faces.faces === stripes + stripes &&
    disks === coins &&
    teams === coins &&
    types.length === faces.faces &&
    sorted.length === faces.faces &&
    cover.length === faces.faces &&
    rotated.length === faces.faces &&
    rotated.every((row, i) => row.face === (i + traffic) % faces.faces) &&
    rotated[n - n]!.cost === cheapest.cost &&
    cover[n - n] === cheapest.name &&
    pick.name === cover[traffic % faces.faces] &&
    cluster.holds &&
    pick.cover === true &&
    pick.cost >= seed &&
    storageBindings.STORAGE === 'kv' &&
    storageBindings.BLOBS === 'r2'
  return {
    kind: 'raid' as const,
    level: '10' as const,
    disks,
    stripes,
    teams,
    faces: faces.faces,
    vacant: faces.faces - cover.length,
    start: 'cheapest' as const,
    cheapest: cheapest.name,
    cover,
    traffic,
    demand,
    parity: traffic % faces.faces,
    pick,
    rotate: rotated.every((row, i) => row.face === (i + traffic) % faces.faces),
    types: rotated,
    clouds: raidClouds,
    cluster,
    bindings: storageBindings,
    theorem: 'raid' as const,
    href: storageHref,
    holds,
  }
}

export const raidHolds = (r = raidOf()): boolean =>
  r.holds === true &&
  r.kind === 'raid' &&
  r.level === '10' &&
  r.start === 'cheapest' &&
  r.cheapest === r.cover[n - n] &&
  r.cover.length === r.faces &&
  r.pick.name === r.cover[r.traffic % r.faces] &&
  r.pick.start === 'cheapest' &&
  r.pick.cover === true &&
  r.types[n - n]?.name === r.cheapest &&
  r.disks === coins &&
  r.stripes === facesOf().rays &&
  r.teams === coins &&
  r.faces === r.disks * r.stripes &&
  r.faces === r.stripes + r.stripes &&
  r.vacant === n - n &&
  r.types.length === r.faces &&
  r.clouds.length === r.faces &&
  r.cluster.clouds === r.faces &&
  r.cluster.route === 'involution' &&
  r.cluster.security === 'crypt' &&
  r.cluster.speed === 'coordinated' &&
  r.cluster.cost === 'minimum' &&
  r.cluster.measure === r.faces &&
  r.cluster.measure === r.teams * r.stripes &&
  r.cluster.remainder === n - n &&
  r.cluster.unity === seed &&
  r.pick.cost >= seed &&
  r.bindings.STORAGE === 'kv' &&
  r.bindings.BLOBS === 'r2' &&
  r.theorem === 'raid' &&
  r.href === storageHref

/**
 * Measure hybrid storage speed and cost. KV plus R2. Coordinated speed. Minimum cost.
 * @wing agents
 * @kind builder
 * @evidence hybridHolds
 */
export const hybridOf = onceOf(() => {
  const faces = facesOf()
  const raid = raidOf()
  const kv = {
    binding: 'STORAGE' as const,
    name: storageBindings.STORAGE,
    speed: faces.rays,
    cost: coins}
  const r2 = {
    binding: 'BLOBS' as const,
    name: storageBindings.BLOBS,
    speed: seed,
    cost: seed}
  const speed = kv.speed + r2.speed
  const cost = kv.cost + r2.cost
  const holds =
    storageBindings.STORAGE === 'kv' &&
    storageBindings.BLOBS === 'r2' &&
    kv.cost === coins &&
    r2.cost === seed &&
    cost === n &&
    kv.speed === faces.rays &&
    r2.speed === seed &&
    speed === mintOf(n) &&
    coins === seed + seed &&
    raid.cluster.cost === 'minimum' &&
    raid.cluster.speed === 'coordinated' &&
    kv.speed > r2.speed &&
    kv.cost > r2.cost
  return {
    kind: 'hybrid' as const,
    theorem: 'hybrid' as const,
    layers: coins,
    kv,
    r2,
    speed,
    cost,
    measure: { speed, cost },
    bindings: storageBindings,
    holds,
  }
})

export const hybridHolds = (h = hybridOf()): boolean =>
  h.holds === true &&
  h.kind === 'hybrid' &&
  h.theorem === 'hybrid' &&
  h.layers === coins &&
  h.kv.name === 'kv' &&
  h.r2.name === 'r2' &&
  h.kv.binding === 'STORAGE' &&
  h.r2.binding === 'BLOBS' &&
  h.kv.speed === facesOf().rays &&
  h.r2.speed === seed &&
  h.kv.cost === coins &&
  h.r2.cost === seed &&
  h.speed === h.kv.speed + h.r2.speed &&
  h.cost === h.kv.cost + h.r2.cost &&
  h.speed === mintOf(n) &&
  h.cost === n &&
  h.measure.speed === h.speed &&
  h.measure.cost === h.cost &&
  h.kv.speed > h.r2.speed &&
  h.kv.cost > h.r2.cost &&
  h.kv.speed > h.r2.speed

/** QPU hybrid storage hosts the Payload database. Four collections. Secrets never. */
const payloadDbCollections = ['pages', 'users', 'media', 'tenants'] as const
const payloadDbKey = 'databases/payload'

/**
 * THE ZONE, HOST BY HOST — and every one of these names reaches this unit.
 *
 * Until this table existed the router knew two labels: its own and `www`. Every other first-party name under the
 * zone was therefore indistinguishable from a customer's rented page, so the wildcard route would have handed
 * lean, unreal, hardware or school to Payload as somebody's tenant the moment its custom domain lapsed. Measured
 * 2026-09-28: four such names answer on this zone and not one of them was declared anywhere this unit could read.
 *
 * IT IS ALSO THE SEO SURFACE, and that is the harder half. Google reads robots.txt and sitemap.xml PER HOST — a
 * directive served at uuidna.com says nothing whatever about qpu.uuidna.com — and measured the same day, five of
 * the six hosts answered 404 for both, so Cloudflare's managed default was served in their place: a file that
 * names no sitemap at all. A sitemap nothing points at is a sitemap nothing crawls. seoOf computes the pair
 * for each host from this table, and every pair names the ONE canonical MCP endpoint rather than a copy of it,
 * because six hosts each claiming their own MCP is six duplicates competing, not one door found six ways.
  * @wing agents
  * @kind constant
 */
export const QPU_ZONE_HOSTS = [
  { label: '', worker: 'uuidna', qpu: false, serves: 'the sealed ledger — theorems, decide, verify, receipts' },
  { label: 'qpu', worker: 'uuidna-qpu', qpu: true, serves: 'this unit — the running circuit, the MCP, the receipts' },
  { label: 'lean', worker: 'uuidna-lean', qpu: true, serves: 'the Lean publishing worker — standing, theorems, axioms, the census' },
  { label: 'unreal', worker: 'uuidna-unreal', qpu: true, serves: 'the Unreal publishing worker — the hologram views' },
  { label: 'hardware', worker: 'uuidna-unreal', qpu: true, serves: 'the hardware views, answered by the Unreal worker' },
  { label: 'school', worker: 'uuidna-payload', qpu: true, serves: 'the school — lessons, progress, and the kernel verdicts on them' },
] as const

/** zoneHolds → one apex, this unit among them, every host inside the zone, every label distinct and workered. */
export const zoneHolds = (z = qpuZoneOf()): boolean =>
  z.hosts.length === QPU_ZONE_HOSTS.length &&
  z.hosts.filter((h) => h.apex).length === seed &&
  z.hosts.filter((h) => h.own).length === seed &&
  z.hosts.filter((h) => !h.qpu).length === seed &&
  z.hosts.every((h) => h.apex === !h.qpu) &&
  z.hosts.some((h) => h.host === unit.host) &&
  z.hosts.every((h) => (h.apex ? h.host === z.zone : h.host.endsWith(`.${z.zone}`))) &&
  z.hosts.every((h) => h.origin === `https://${h.host}` && h.serves.length > n - n && h.worker.startsWith('uuidna')) &&
  new Set(z.hosts.map((h) => h.host)).size === z.hosts.length &&
  z.labels.every((label) => label.length > n - n && !label.includes('.') && !label.includes('*'))

/** zoneHostHolds → the lookup is total over the zone and closed outside it: every declared host resolves to
 *  itself whatever its case, and a name that merely CONTAINS the zone resolves to nothing. The second half is the
 *  one worth a test — `evil.uuidna.com.attacker.test` ends with neither the zone nor a label of it, and a lookup
 *  written with endsWith instead of equality would hand it this unit's policy. */
export const zoneHostHolds = (): boolean => {
  const z = qpuZoneOf()
  return z.hosts.filter((h) => h.qpu).every((h) => zoneHostOf(h.host)?.host === h.host && zoneHostOf(h.host.toUpperCase())?.host === h.host) &&
    z.hosts.filter((h) => !h.qpu).every((h) => zoneHostOf(h.host) === undefined) &&
    zoneHostOf(`${z.zone}.attacker.test`) === undefined &&
    zoneHostOf(`x.${z.zone}`) === undefined &&
    zoneHostOf('') === undefined &&
    zoneHostOf(undefined) === undefined
}

/** value + predicate: the zone and this unit's own label recompose its host, and every reserved label is one label */
export const tenantZoneHolds = (z = tenantZoneOf()): boolean =>
  `${z.own}.${z.zone}` === unit.host &&
  z.own !== z.www &&
  z.reserved.includes(z.own) && z.reserved.includes(z.www) &&
  z.reserved.every((label) => label.length > n - n && !label.includes('.') && !label.includes('*'))

/**
 * How Payload's database maps onto the hybrid store: KV upper layer, R2 lower layer, collections and the speed/cost readings (theorem hybrid).
 * @wing storage
 * @kind builder
 * @evidence payloadDbHolds
 */
export const payloadDbOf = onceOf(() => {
  const hybrid = hybridOf()
  const href = `${storageHref}/${payloadDbKey}`
  const remainder = n - n
  const holds =
    hybridHolds(hybrid) &&
    payloadDbCollections.length === mintOf(coins) &&
    raidSafeOf(payloadDbKey) &&
    raidSafeOf(`${payloadDbKey}/seed`) &&
    hybrid.speed === mintOf(n) &&
    hybrid.cost === n &&
    hybrid.layers === coins &&
    seed === mintOf(remainder) &&
    remainder === n - n &&
    storageBindings.STORAGE === 'kv' &&
    storageBindings.BLOBS === 'r2'
  return {
    kind: 'payload' as const,
    theorem: 'hybrid' as const,
    key: payloadDbKey,
    seed,
    remainder,
    href,
    collections: payloadDbCollections,
    unity: seed === mintOf(remainder),
    secrets: payloadDbCollections.includes('secrets' as (typeof payloadDbCollections)[number]),
    hybrid: {
      speed: hybrid.speed,
      cost: hybrid.cost,
      layers: hybrid.layers},
    holds,
  }
})

export const payloadDbHolds = (p = payloadDbOf()): boolean =>
  p.holds === true &&
  p.kind === 'payload' &&
  p.theorem === 'hybrid' &&
  p.key === payloadDbKey &&
  p.seed === seed &&
  p.remainder === n - n &&
  p.seed === mintOf(p.remainder) &&
  p.collections.length === mintOf(coins) &&
  p.collections.join(' ') === 'pages users media tenants' &&
  p.hybrid.speed === mintOf(n) &&
  p.hybrid.cost === n &&
  p.hybrid.layers === coins &&
  hybridHolds()

/**
 * Native Alpine Linux storage. musl. busybox. overlayfs — KV upper, R2 lower, KV work. Next is the double. No last k.
 * @wing agents
 * @kind builder
 * @evidence alpineHolds
 */
export const alpineOf = onceOf(() => {
  const hybrid = hybridOf()
  const next = qpuNextOf()
  const applets = ['ln', 'unlink', 'stat'] as const
  const work = storageBindings.STORAGE
  const holds =
    hybridHolds(hybrid) &&
    qpuNextHolds(next) &&
    applets.length === n &&
    applets[n - n] === 'ln' &&
    applets[seed] === 'unlink' &&
    applets[coins] === 'stat' &&
    storageBindings.STORAGE === 'kv' &&
    storageBindings.BLOBS === 'r2' &&
    work === storageBindings.STORAGE &&
    next.nextFused === next.fused + next.fused &&
    hybrid.layers === coins
  return {
    kind: 'alpine' as const,
    os: 'alpine' as const,
    libc: 'musl' as const,
    toolbox: 'busybox' as const,
    fs: 'overlay' as const,
    upper: storageBindings.STORAGE,
    lower: storageBindings.BLOBS,
    work,
    next: next.nextFused,
    fused: next.fused,
    theorem: next.theorem,
    applets,
    native: work === storageBindings.STORAGE && storageBindings.BLOBS === 'r2',
    inode: applets[n - n] === 'ln' && applets[coins] === 'stat',
    unlink: applets[seed] === 'unlink',
    last: next.nextFused === next.fused,
    infinite: next.nextFused === next.fused + next.fused,
    holds,
  }
})

export const alpineHolds = (a = alpineOf()): boolean =>
  a.holds === true &&
  a.kind === 'alpine' &&
  a.os === 'alpine' &&
  a.libc === 'musl' &&
  a.toolbox === 'busybox' &&
  a.fs === 'overlay' &&
  a.upper === 'kv' &&
  a.lower === 'r2' &&
  a.work === a.upper &&
  a.work === 'kv' &&
  theorem.next_fused(a.next, a.fused) &&
  a.next === qpuNextOf().nextFused &&
  a.theorem === 'next_coil' &&
  a.applets.length === n &&
  qpuNextHolds()

/**
 * Measure coil efficiency in RAID clusters. Unity when coil covers faces with no remainder.
 * @wing agents
 * @kind builder
 * @evidence coilEfficiencyHolds
 */
export const coilEfficiencyOf = onceOf(() => {
  const coil = coilOf()
  const faces = facesOf()
  const raid = raidOf()
  const stripes = raid.stripes
  const teams = raid.teams
  const measure = teams * stripes
  const remainder = theorem.electronics(coil.coil, faces.faces) && measure === coil.coil ? n - n : seed
  const unity = remainder === n - n ? seed : n - n
  const nodes = raid.types.map((row, face) => {
    const hop = (face + faces.rays + faces.rays) % faces.faces
    const measured = coil.windings * stripes
    return {
      face,
      hop,
      name: row.name,
      cloud: row.cloud,
      windings: coil.windings,
      stripes,
      measure: measured,
      involution: hop === face,
      holds: hop === face && measured === coil.coil && theorem.electronics(coil.coil, faces.faces) && measured === raid.cluster.measure,
  }
  })
  let occupied = n - n
  for (const node of nodes) if (node.holds) occupied += seed
  const vacant = nodes.length - occupied
  const holds =
    coilHolds(coil) &&
    raidHolds(raid) &&
    raid.cluster.holds === true &&
    measure === coil.coil &&
    theorem.electronics(coil.coil, faces.faces) &&
    faces.faces === stripes + stripes &&
    raid.cluster.measure === measure &&
    remainder === n - n &&
    unity === seed &&
    occupied === faces.faces &&
    vacant === n - n &&
    nodes.length === faces.faces &&
    nodes.every((node) => node.holds && node.involution)
  return {
    kind: 'efficiency' as const,
    theorem: 'coil_efficiency' as const,
    measure,
    remainder,
    unity,
    teams,
    stripes,
    coil: coil.coil,
    faces: faces.faces,
    cluster: raid.cluster.kind,
    occupied,
    vacant,
    nodes,
    holds,
  }
})

export const coilEfficiencyHolds = (e = coilEfficiencyOf()): boolean =>
  e.holds === true &&
  e.kind === 'efficiency' &&
  e.theorem === 'coil_efficiency' &&
  e.measure === e.coil &&
  theorem.electronics(e.coil, e.faces) &&
  e.remainder === n - n &&
  e.unity === seed &&
  e.teams === coins &&
  e.stripes === facesOf().rays &&
  e.cluster === 'cluster' &&
  e.vacant === n - n &&
  e.occupied === e.faces &&
  e.nodes.length === e.faces &&
  e.nodes.every((node) => node.holds && node.involution && node.measure === e.measure)

const xorOf = (a: number, b: number): number => Number(BigInt(a) ^ BigInt(b))
const primitives = ['fetch', 'Request', 'Response', 'BigInt', 'performance'] as const
const designNames = ['tool', 'heap', 'key', 'hostEscape', 'job', 'js', 'path', 'fetch', 'mod', 'worker', 'sealed', 'depth', 'op', 'unlocked'] as const

/**
 * Fourteen named design nodes, one per face, each with a synapse fold; vacant must be zero.
 * @wing quantum
 * @kind builder
 * @evidence designHolds
 */
export const designOf = onceOf(() => {
  const cube = cubeOf()
  const faces = facesOf()
  const names = designNames
  const nodes = names.map((name, face) => {
    const hop = (face + faces.rays + faces.rays) % faces.faces
    const wave = Number(BigInt(face) % BigInt(cube.vertices))
    const fold = xorOf(wave, cube.hexbit)
    return {
      face,
      name,
      hop,
      involution: hop === face,
      wave,
      fold,
      holds: hop === face && xorOf(fold, cube.hexbit) === wave,
  }
  })
  const holds =
    names.length === faces.faces &&
    nodes.length === faces.faces &&
    nodes.every((node) => node.involution && node.holds) &&
    xorOf(xorOf(n - n, cube.hexbit), cube.hexbit) === n - n &&
    xorOf(xorOf(n, cube.hexbit), cube.hexbit) === n
  return {
    kind: 'design' as const,
    theorem: 'design' as const,
    names,
    nodes,
    vacant: faces.faces - nodes.length,
    holds,
  }
})


export const designHolds = (d = designOf()): boolean =>
  d.holds === true &&
  d.kind === 'design' &&
  d.vacant === n - n &&
  d.names.length === facesOf().faces &&
  d.nodes.every((node) => node.involution && node.holds) &&
  xorOf(xorOf(n - n, cubeOf().hexbit), cubeOf().hexbit) === n - n

/**
 * A fixed integer network: depth n, width faces, weights from the lattice, one exact forward pass.
 * @wing quantum
 * @kind builder
 * @evidence neuroHolds
 */
export const neuroOf = onceOf(() => {
  const cube = cubeOf()
  const faces = facesOf()
  const handle = qpuHandleOf()
  const design = designOf()
  const width = faces.faces
  const layers = mintOf(n)
  const weights = handle.amplitudes
  const fused = width * handle.kv.amplitudes
  const names = ['quantum', 'lean', 'cite', 'train', 'forge', 'improve', 'compete', 'prove'] as const
  const neurons = design.nodes.map((node) => ({
    i: node.face,
    face: node.face,
    synapse: node.hop,
    fold: node.fold,
    wave: node.wave,
    residual: node.involution,
    name: node.name}))
  const forward = names.map((name, k) => ({
    k,
    name,
    width: mintOf(k),
    next: mintOf(k + seed),
    holds: mintOf(k + seed) === mintOf(k) + mintOf(k),
  }))
  const layersHold = forward.every((row) => row.holds && row.next === row.width + row.width)
  const residualHold = neurons.every((row) => row.residual === true)
  const recurrentHold = neurons.every((row) => xorOf(row.fold, cube.hexbit) === row.wave)
  const test = {
    kind: 'test' as const,
    layers: layersHold,
    residual: residualHold,
    recurrent: recurrentHold,
    design: design.holds,
    holds: layersHold && residualHold && recurrentHold && design.holds,
  }
  const holds =
    design.holds &&
    cube.holds &&
    handle.holds &&
    faces.holds &&
    neurons.length === width &&
    forward.length === layers &&
    forward.length === names.length &&
    layersHold &&
    test.holds &&
    weights === mintOf(cube.bits) &&
    theorem.handle(fused, faces.faces, handle.kv.amplitudes) &&
    fused + fused === faces.faces * mintOf(cube.bits + coins)
  return {
    kind: 'neuro' as const,
    depth: n,
    width,
    layers,
    weights,
    fused,
    next: fused + fused,
    activation: 'xor' as const,
    test,
    neurons,
    forward,
    holds,
  }
})

export const neuroHolds = (net = neuroOf()): boolean =>
  net.holds === true &&
  net.kind === 'neuro' &&
  net.depth === n &&
  net.width === facesOf().faces &&
  net.layers === mintOf(n) &&
  net.activation === 'xor' &&
  net.neurons.length === net.width &&
  net.forward.length === net.layers &&
  net.forward.every((row) => row.holds && row.next === row.width + row.width) &&
  theorem.next_fused(net.next, net.fused) &&
  net.test.kind === 'test' &&
  net.test.layers === true &&
  net.test.residual === true &&
  net.test.recurrent === true &&
  net.test.design === true &&
  net.test.holds === true &&
  designHolds()

const bitOf = (q: number): number => mintOf(q)
const parityOf = (i: number): number => {
  const q0 = Number((BigInt(i) / BigInt(bitOf(n - n))) % 2n)
  const q1 = Number((BigInt(i) / BigInt(bitOf(seed))) % 2n)
  return xorOf(q0, q1)
}
const ampsOf = (dim: number): bigint[] => {
  const amps = Array.from({ length: dim }, () => 0n)
  amps[n - n] = BigInt(seed)
  return amps
}
const xGateOf = (amps: bigint[], q: number): bigint[] => {
  const bit = bitOf(q)
  const out = amps.map(() => 0n)
  for (let i = n - n; i < amps.length; i++) out[xorOf(i, bit)] = amps[i]!
  receiptOf('x', out)
  return out
}
const cnotGateOf = (amps: bigint[], c: number, t: number): bigint[] => {
  const cb = BigInt(bitOf(c))
  const tb = BigInt(bitOf(t))
  const out = amps.map(() => 0n)
  for (let i = n - n; i < amps.length; i++) {
    const on = (BigInt(i) / cb) % 2n === 1n
    out[on ? xorOf(i, Number(tb)) : i] = amps[i]!
  }
  receiptOf('cx', out)
  return out
}
const hGateOf = (amps: bigint[], q: number): bigint[] => {
  const bit = BigInt(bitOf(q))
  const out = amps.map(() => 0n)
  for (let i = n - n; i < amps.length; i++) {
    const a = amps[i]!
    const flipped = xorOf(i, Number(bit))
    const on = (BigInt(i) / bit) % 2n === 1n
    if (on) {
      out[flipped] += a
      out[i] -= a
    } else {
      out[i] += a
      out[flipped] += a
    }
  }
  receiptOf('h', out)
  return out
}
const czGateOf = (amps: bigint[], c: number, t: number): bigint[] => hGateOf(cnotGateOf(hGateOf(amps, t), c, t), t)
const zGateOf = (amps: bigint[], q: number): bigint[] => hGateOf(xGateOf(hGateOf(amps, q), q), q)
const swapGateOf = (amps: bigint[], a: number, b: number): bigint[] => cnotGateOf(cnotGateOf(cnotGateOf(amps, a, b), b, a), a, b)
const toffoliGateOf = (amps: bigint[], c: number, k: number, t: number): bigint[] => {
  const cb = BigInt(bitOf(c))
  const kb = BigInt(bitOf(k))
  const tb = BigInt(bitOf(t))
  const out = amps.map(() => 0n)
  for (let i = n - n; i < amps.length; i++) {
    const on = (BigInt(i) / cb) % 2n === 1n && (BigInt(i) / kb) % 2n === 1n
    out[on ? xorOf(i, Number(tb)) : i] = amps[i]!
  }
  receiptOf('ccx', out)
  return out
}
const qubitOf = (value: unknown, fallback: number): number => {
  const q = typeof value === 'number' ? value : fallback
  // a qubit index is an integer in [0, n): a non-integer (q = 2.9) must not index bit floor/round outside the register
  // and still report holds (Wave XIII) — require an exact integer, else the fallback.
  return Number.isInteger(q) && q >= n - n && q < n ? q : fallback
}
const runGatesOf = (ops: readonly Record<string, unknown>[]): bigint[] => {
  let amps = ampsOf(mintOf(n))
  for (const op of ops) {
    const name = typeof op.name === 'string' ? op.name : ''
    if (name === 'reset') amps = ampsOf(mintOf(n))
    else if (name === 'h') amps = hGateOf(amps, qubitOf(op.q, n - n))
    else if (name === 'x') amps = xGateOf(amps, qubitOf(op.q, n - n))
    else if (name === 'z') amps = zGateOf(amps, qubitOf(op.q, n - n))
    else if (name === 'cx') amps = cnotGateOf(amps, qubitOf(op.c, n - n), qubitOf(op.t, seed))
    else if (name === 'cz') amps = czGateOf(amps, qubitOf(op.c, n - n), qubitOf(op.t, seed))
    else if (name === 'swap') amps = swapGateOf(amps, qubitOf(op.a ?? op.q, n - n), qubitOf(op.b ?? op.t, seed))
    else if (name === 'ccx') amps = toffoliGateOf(amps, qubitOf(op.c, seed), qubitOf(op.c2, coins), qubitOf(op.t ?? op.q, n - n))
  }
  return amps
}
const measureOf = (amps: bigint[], optional = quantumModeOf(), shots = mintOf(n)) => {
  receiptOf('measure', amps)
  const support = amps.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const index = support.length === seed ? support[n - n]!.i : support.length === coins ? support[seed]!.i : mintOf(n)
  const counts = support.map((r) => ({ i: r.i, w: Number(r.a * r.a) }))
  let weight = n - n
  for (const row of counts) weight += row.w
  // the shots are tallied deterministically: each outcome takes its share of the shots, and the shares left over go to the
  // largest remainders (ties by index), so the tally always sums to the shots asked
  const exact = counts.map((row) => (weight > 0 ? (shots * row.w) / weight : 0))
  const tally = counts.map((row, k) => ({ i: row.i, n: Math.floor(exact[k]!) }))
  const left = shots - tally.reduce((sum, row) => sum + row.n, n - n)
  counts
    .map((row, k) => ({ k, rest: exact[k]! - Math.floor(exact[k]!), i: row.i }))
    .sort((a, b) => b.rest - a.rest || a.i - b.i)
    .slice(n - n, left)
    .forEach((row) => { tally[row.k]!.n += 1 })
  return {
    index,
    shots,
    support: support.map((r) => r.i),
    counts,
    tally,
    collapsed: !optional || support.length === seed,
    preserved: optional && quantumModeOf(),
    holds: counts.length === support.length && tally.reduce((sum, row) => sum + row.n, n - n) === shots && weight > n - n,
  }
}
const decodeOf = (amps: bigint[]): bigint[] => hGateOf(cnotGateOf(amps, n - n, seed), n - n)
const basisOf = (amps: bigint[]): number => {
  const hit = amps.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  return hit.length === seed ? hit[n - n]!.i : mintOf(n)
}
const weightOf = (amps: bigint[], q: number): { off: bigint; on: bigint } => {
  const bit = BigInt(bitOf(q))
  let off = 0n
  let on = 0n
  for (let i = n - n; i < amps.length; i++) {
    const a = amps[i]! * amps[i]!
    if ((BigInt(i) / bit) % 2n === 1n) on += a
    else off += a
  }
  return { off, on }
}

/**
 * The exact state-vector computer: universal gate basis, reset, SWAP, Toffoli, coupling, compile, collapse, shots, feed-forward, bit-flip correction and readout, each step with its check.
 * @wing quantum
 * @kind builder
 * @evidence computerHolds
 */
/** Runtime reads the drift-checked embed so a cold Worker isolate never JIT-compiles computerLiveOf (~2.8s shared
 *  graph); falls back to live when the embed is absent. The gate recomputes live at push via computerLiveOf
 *  (embed-lean regenerates + the drift-guard asserts embed == regen), so "verify all it computes alone" holds. */
export const computerOf = onceOf((): ReturnType<typeof computerLiveOf> => (embeddedConstants.computer as ReturnType<typeof computerLiveOf> | undefined) ?? computerLiveOf())

/** THE COOL IS FRESH, AT THE GATE, FROM ONE PLACE. The runtime READS embeddedConstants (never JIT-compiles the heavy
 *  graph); this is the single predicate that recomputes all four LIVE — bypassing the embed via the *LiveOf — and
 *  asserts the embed equals the live recompute. embed-lean regenerates the embed from the same *LiveOf, so a changed
 *  heavy function makes this fail rather than ship a stale cool. The deployment gate and scripts/embedded.test.mjs both
 *  call this, so "verify all it computes alone" is checked live at every push, not merely in CI. Returns the drifted
 *  keys (empty when fresh) so the gate names what went stale instead of a bare false. */
export const embedDriftOf = (): string[] => {
  const safe = (v: unknown) => JSON.stringify(v, (_k, x) => (typeof x === 'bigint' ? x.toString() : x))
  const live: Record<'computer' | 'quantum' | 'circuit' | 'lean', unknown> = {
    computer: computerLiveOf(),
    quantum: quantumLiveOf(),
    circuit: circuitLiveOf(),
    lean: leanOf(),
  }
  return (['computer', 'quantum', 'circuit', 'lean'] as const).filter((k) => safe(embeddedConstants[k]) !== safe(live[k]))
}
export const embedFreshHolds = (): boolean => embedDriftOf().length === n - n

export const computerLiveOf = onceOf(() => {
  const faces = facesOf()
  const dim = mintOf(n)
  const prepare = ampsOf(dim)
  const resetAmps = ampsOf(dim)
  const reset = {
    kind: 'reset' as const,
    index: basisOf(resetAmps),
    holds: resetAmps[n - n] === 1n && basisOf(resetAmps) === n - n && mintOf(n - n) === seed,
  }
  const swapped = swapGateOf(xGateOf(prepare, n - n), n - n, seed)
  const swap = {
    kind: 'swap' as const,
    from: seed,
    to: basisOf(swapped),
    holds: basisOf(swapped) === coins && xorOf(seed, n) === coins,
  }
  const toff = toffoliGateOf(xGateOf(xGateOf(prepare, seed), coins), seed, coins, n - n)
  const toffoli = {
    kind: 'ccx' as const,
    from: xorOf(bitOf(seed), bitOf(coins)),
    to: basisOf(toff),
    universal: ['h', 'ccx'] as const,
    holds: basisOf(toff) === mintOf(n) - seed && xorOf(xorOf(bitOf(seed), bitOf(coins)), seed) === mintOf(n) - seed,
  }
  const coupling = {
    kind: 'coupling' as const,
    edges: [
      { a: n - n, b: seed },
      { a: seed, b: coins }] as const,
    holds: coins === seed + seed,
  }
  const marked = xGateOf(prepare, n - n)
  const compiled = swapGateOf(cnotGateOf(swapGateOf(marked, seed, coins), n - n, seed), seed, coins)
  const direct = cnotGateOf(marked, n - n, coins)
  const compile = {
    kind: 'compile' as const,
    gate: 'cx' as const,
    from: n - n,
    to: coins,
    index: basisOf(compiled),
    holds: basisOf(compiled) === basisOf(direct) && basisOf(direct) === xorOf(seed, bitOf(coins)),
  }
  const afterH = hGateOf(prepare, n - n)
  const afterHH = hGateOf(afterH, n - n)
  const afterCnot = cnotGateOf(afterH, n - n, seed)
  const interfered = afterHH.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const bell = afterCnot.map((a, i) => ({ i, a })).filter((r) => r.a !== 0n)
  const collapse = {
    kind: 'collapse' as const,
    unique: interfered.length === seed,
    bell: bell.length === coins,
    holds: interfered.length === seed && afterHH[n - n] === BigInt(coins) && bell.length === coins,
  }
  const measured = measureOf(afterCnot)
  const shots = {
    kind: 'shots' as const,
    n: measured.shots,
    counts: measured.counts,
    holds: measured.shots === dim && measured.counts.length === coins && measured.index === n,
  }
  let feed = xGateOf(prepare, n - n)
  const bit = basisOf(feed)
  const on = (BigInt(bit) / BigInt(bitOf(n - n))) % 2n === 1n
  if (on) feed = xGateOf(feed, seed)
  const feedforward = {
    kind: 'feedforward' as const,
    bit,
    index: basisOf(feed),
    holds: on === true && basisOf(feed) === n,
  }
  let code = xGateOf(prepare, n - n)
  code = cnotGateOf(code, n - n, seed)
  code = cnotGateOf(code, n - n, coins)
  code = xGateOf(code, seed)
  const erred = basisOf(code)
  code = cnotGateOf(code, n - n, seed)
  code = cnotGateOf(code, n - n, coins)
  code = toffoliGateOf(code, seed, coins, n - n)
  const logical = weightOf(code, n - n)
  const correct = {
    kind: 'correct' as const,
    code: 'bitflip' as const,
    error: erred,
    on: Number(logical.on),
    off: Number(logical.off),
    holds: erred === xorOf(mintOf(n) - seed, bitOf(seed)) && logical.off === 0n && logical.on !== 0n,
  }
  const readout = {
    kind: 'readout' as const,
    index: measured.index,
    bits: measured.index,
    support: measured.support,
    holds: measured.index === n && measured.support.length === coins,
  }
  const isolate = {
    kind: 'isolate' as const,
    holds:
      typeof fetch === 'function' &&
      typeof Request === 'function' &&
      typeof Response === 'function' &&
      typeof BigInt === 'function' &&
      typeof performance === 'object'}
  const plugin = payloadPluginOf()
  const qram = {
    kind: 'qram' as const,
    href: plugin.href,
    plugin: plugin.name,
    holds: payloadPluginHolds(plugin) && plugin.href === `${storageHref}/${payloadDbKey}`}
  const network = {
    kind: 'network' as const,
    href: networkHref,
    hop: 'involution' as const,
    holds: networkHref === `${unit.origin}/network`}
  const jobs = {
    kind: 'jobs' as const,
    href: serverHref,
    slots: mintOf(n),
    holds: mintOf(n) === dim && serverHref === `${unit.origin}/server`}
  const names = [
    'reset',
    'swap',
    'ccx',
    'coupling',
    'compile',
    'collapse',
    'shots',
    'feedforward',
    'correct',
    'readout',
    'isolate',
    'qram',
    'network',
    'jobs'] as const
  const seated = [
    reset.holds,
    swap.holds,
    toffoli.holds,
    coupling.holds,
    compile.holds,
    collapse.holds,
    shots.holds,
    feedforward.holds,
    correct.holds,
    readout.holds,
    isolate.holds,
    qram.holds,
    network.holds,
    jobs.holds] as const
  let occupied = n - n
  for (const seat of seated) if (seat) occupied += seed
  const vacant = seated.length - occupied
  const lattice = {
    kind: 'computer' as const,
    faces: faces.faces,
    occupied,
    vacant,
    nodes: seated.map((holds, face) => {
      const hop = (face + faces.rays + faces.rays) % faces.faces
      return { face, hop, involution: hop === face, name: names[face]!, holds }
    }),
    holds:
      names.length === faces.faces &&
      seated.length === faces.faces &&
      occupied === faces.faces &&
      vacant === n - n &&
      seated.every(Boolean)}
  const holds =
    lattice.holds &&
    reset.holds &&
    swap.holds &&
    toffoli.holds &&
    coupling.holds &&
    compile.holds &&
    collapse.holds &&
    shots.holds &&
    feedforward.holds &&
    correct.holds &&
    readout.holds &&
    isolate.holds &&
    qram.holds &&
    network.holds &&
    jobs.holds
  return {
    kind: 'computer' as const,
    universal: toffoli.universal,
    basis: ['h', 'cx'] as const,
    lattice,
    reset,
    swap,
    toffoli,
    coupling,
    compile,
    collapse,
    shots,
    feedforward,
    correct,
    readout,
    isolate,
    qram,
    network,
    jobs,
    holds,
  }
})

export const computerHolds = (c = computerOf()): boolean =>
  c.holds === true &&
  c.kind === 'computer' &&
  c.lattice.vacant === n - n &&
  c.lattice.occupied === facesOf().faces &&
  c.lattice.nodes.length === facesOf().faces &&
  c.universal[n - n] === 'h' &&
  c.universal[seed] === 'ccx' &&
  c.basis[n - n] === 'h' &&
  c.basis[seed] === 'cx' &&
  c.swap.to === coins &&
  c.toffoli.to === mintOf(n) - seed &&
  c.jobs.slots === mintOf(n) &&
  c.shots.n === mintOf(n) &&
  c.correct.code === 'bitflip' &&
  c.qram.href === `${storageHref}/${payloadDbKey}`

const quotOf = (i: number, d: number): number => (i - (i % d)) / d

const gcdOf = (left: number, right: number): number => {
  let x = left
  let y = right
  while (y > n - n) {
    const r = x % y
    x = y
    y = r
  }
  return x
}


const convergentsOf = (num: number, den: number): { h: number; k: number }[] => {
  const out: { h: number; k: number }[] = []
  let n0 = num
  let d0 = den
  let hPrev = n - n
  let h = seed
  let kPrev = seed
  let k = n - n
  while (d0 > n - n) {
    const q = (n0 - (n0 % d0)) / d0
    const rem = n0 % d0
    const hNext = q * h + hPrev
    const kNext = q * k + kPrev
    out.push({ h: hNext, k: kNext })
    hPrev = h
    h = hNext
    kPrev = k
    k = kNext
    n0 = d0
    d0 = rem
  }
  return out
}

type CAmp = { re: bigint; im: bigint }
/** Device label computed from the run: a vector of exact integer amplitudes is 'exact-amplitudes'; anything else is 'unmeasured'. */
const bigintDeviceOf = (amps: readonly bigint[]) =>
  amps.length > n - n && amps.every((a) => typeof a === 'bigint') ? ('exact-amplitudes' as const) : ('unmeasured' as const)

const cAmpOf = (re: bigint, im: bigint): CAmp => ({ re, im })
const cWOf = (a: CAmp): bigint => a.re * a.re + a.im * a.im
const cAddOf = (a: CAmp, b: CAmp): CAmp => cAmpOf(a.re + b.re, a.im + b.im)
const cSubOf = (a: CAmp, b: CAmp): CAmp => cAmpOf(a.re - b.re, a.im - b.im)
const cMulNegIOf = (a: CAmp): CAmp => cAmpOf(a.im, -a.re)

/** THE STATE, SPARSE AND EXACT. With a two-qubit counting register the Shor state never has more than sixteen nonzero
 * amplitudes, whatever the modulus: one branch per counting value after the modular multiplications, four after the
 * inverse QFT spreads each. So the vector is a map from basis index to Gaussian-integer amplitude — exact for any n,
 * nothing allocated per dimension, and the only thing a larger modulus costs is the width of the index. A zero
 * amplitude is dropped as it arises, so `size` is the count of nonzero amplitudes. This is what removed the host's
 * reach as a limit: a 2^64-dimensional vector and a 2^2050-dimensional one are both sixteen entries. */
type SparseState = Map<bigint, CAmp>
const b0 = BigInt(n - n)
const b1 = BigInt(seed)
const b2 = BigInt(coins)
const sBitOf = (q: number): bigint => b1 << BigInt(q)
const onOf = (i: bigint, bit: bigint): boolean => (i & bit) !== b0
const sPut = (out: SparseState, i: bigint, a: CAmp): void => {
  const prior = out.get(i)
  const next = prior ? cAddOf(prior, a) : a
  if (next.re === b0 && next.im === b0) out.delete(i)
  else out.set(i, next)
}
const sPrepareOf = (): SparseState => new Map([[b0, cAmpOf(b1, b0)]])
const sHOf = (state: SparseState, q: number): SparseState => {
  const bit = sBitOf(q)
  const out: SparseState = new Map()
  for (const [i, a] of state) {
    const flipped = i ^ bit
    if (onOf(i, bit)) {
      sPut(out, flipped, a)
      sPut(out, i, cSubOf(cAmpOf(b0, b0), a))
    } else {
      sPut(out, i, a)
      sPut(out, flipped, a)
    }
  }
  return out
}
const sXOf = (state: SparseState, q: number): SparseState => {
  const bit = sBitOf(q)
  const out: SparseState = new Map()
  for (const [i, a] of state) sPut(out, i ^ bit, a)
  return out
}
const sSwapOf = (state: SparseState, a: number, b: number): SparseState => {
  const ba = sBitOf(a)
  const bb = sBitOf(b)
  const out: SparseState = new Map()
  for (const [i, amp] of state) sPut(out, onOf(i, ba) !== onOf(i, bb) ? i ^ ba ^ bb : i, amp)
  return out
}
const sSdgOf = (state: SparseState, c: number, t: number): SparseState => {
  const cb = sBitOf(c)
  const tb = sBitOf(t)
  const out: SparseState = new Map()
  for (const [i, a] of state) sPut(out, i, onOf(i, cb) && onOf(i, tb) ? cMulNegIOf(a) : a)
  return out
}
/** x mod m in [0, m) for m > 0, whatever the sign of x. */
const modOf = (x: bigint, m: bigint): bigint => ((x % m) + m) % m
const sModMulOf = (state: SparseState, a: bigint, modulus: bigint, control: number, workOff: number, workBits: number): SparseState => {
  const cb = sBitOf(control)
  const shift = BigInt(workOff)
  const span = b1 << BigInt(workBits)
  const out: SparseState = new Map()
  for (const [i, amp] of state) {
    if (!onOf(i, cb)) {
      sPut(out, i, amp)
      continue
    }
    const work = (i >> shift) % span
    const next = modulus > b1 && work < modulus ? modOf(work * a, modulus) : work
    sPut(out, i - (work << shift) + (next << shift), amp)
  }
  return out
}
const sXxOf = (state: SparseState, q: number): SparseState => sXOf(sXOf(state, q), q)
const sEqualOf = (left: SparseState, right: SparseState): boolean =>
  left.size === right.size && [...left].every(([i, a]) => right.get(i)?.re === a.re && right.get(i)?.im === a.im)
const sPairsOf = (state: SparseState): (readonly [bigint, bigint])[] =>
  [...state].map(([i, a]) => [i, cWOf(a)] as const).filter(([, w]) => w > b0).sort(([x], [y]) => (x < y ? -1 : x > y ? 1 : n - n))
const sDeviceOf = (state: SparseState) =>
  state.size > n - n && [...state.values()].every((a) => typeof a.re === 'bigint' && typeof a.im === 'bigint') ? ('exact-amplitudes' as const) : ('unmeasured' as const)

const bigGcdOf = (left: bigint, right: bigint): bigint => {
  let x = left < b0 ? -left : left
  let y = right < b0 ? -right : right
  while (y > b0) {
    const r = x % y
    x = y
    y = r
  }
  return x
}
/** base^exp mod modulus by squaring; 0 when the modulus is not a ring (modulus <= 1), where the question has no answer. */
const bigPowModOf = (base: bigint, exp: bigint, modulus: bigint): bigint => {
  if (modulus <= b1) return b0
  let x = b1 % modulus
  let b = modOf(base, modulus)
  let e = exp
  while (e > b0) {
    if (e % b2 === b1) x = (x * b) % modulus
    b = (b * b) % modulus
    e = e / b2
  }
  return x
}
/**
 * THE VERSION NIBBLE IS DECIDED BY THE CRYPTO FAMILY, NOT DECLARED.
 *
 * RFC 9562 keeps eight versions and this scheme now uses every one of them — no address wears a version a literal
 * put there. Which version a given address carries is a fold of its own other thirty-one hex digits through the
 * crypto family's own primitive: bigPowModOf, the modular exponentiation crypto_cmodexp runs and theorem shor
 * factors with, raised to rays over the Shor modulus (chooseOf(faces, coins) = 91), carried onto 1..8. Because
 * the version is a function of the content it is deterministic — one content keeps one identity — and it is a
 * seal: a tampered middle names a version its content does not, which uuidSealOf reports.
 */
const UUID_VERSION_AT = UUID_EIGHT + UUID_FOUR
const uuidVersionOf = (digits: string): string => {
  const rest = `${digits.slice(n - n, UUID_VERSION_AT)}${digits.slice(UUID_VERSION_AT + seed)}`
  const fold = bigPowModOf(BigInt(`0x${rest}`), BigInt(facesOf().rays), BigInt(chooseOf(facesOf().faces, coins)))
  return (seed + Number(fold % BigInt(mintOf(n)))).toString(UUID_SIXTEEN)
}
/** Group a 32-hex (dashless) address 8-4-4-4-12 with the crypto family's version stamped into the version slot. */
const uuidStampOf = (digits: string): string =>
  uuidGroupsOf(
    digits.slice(n - n, UUID_EIGHT),
    digits.slice(UUID_EIGHT, UUID_VERSION_AT),
    `${uuidVersionOf(digits)}${digits.slice(UUID_VERSION_AT + seed, UUID_SIXTEEN)}`,
    digits.slice(UUID_SIXTEEN, UUID_SIXTEEN + UUID_FOUR),
    digits.slice(UUID_SIXTEEN + UUID_FOUR, coins * UUID_SIXTEEN),
  )
/** Whether an address wears the version its own content decides — the crypto seal, read back. */
const uuidSealOf = (uuid: string): boolean => {
  const bare = String(uuid).replace(/-/g, '').toLowerCase()
  return /^[0-9a-f]{32}$/.test(bare) && bare[UUID_VERSION_AT] === uuidVersionOf(bare)
}
/**
 * THE WHOLE VERSION SUPERPOSITION, AT ONCE — qpu:crypto. RFC 9562 keeps eight versions; a content folds
 * (uuidVersionOf) to the ONE it wears, but the same thirty-one digits are a valid UUID under every one of the eight.
 * This returns all eight at once — each RFC-valid 8-4-4-4-12 for this content, the variant untouched, only the version
 * nibble changing 1..8 — with the crypto fold naming the `decided` one. The address is in all versions at once; the
 * fold is the measurement that collapses it, and `uuidSealOf` holds for exactly the decided member.
 */
const uuidVersionsOf = (uuid: string): { decided: string; versions: Record<string, string> } => {
  const d = String(uuid).replace(/-/g, '').toLowerCase()
  const at = (v: number) =>
    uuidGroupsOf(
      d.slice(n - n, UUID_EIGHT),
      d.slice(UUID_EIGHT, UUID_VERSION_AT),
      `${v.toString(UUID_SIXTEEN)}${d.slice(UUID_VERSION_AT + seed, UUID_SIXTEEN)}`,
      d.slice(UUID_SIXTEEN, UUID_SIXTEEN + UUID_FOUR),
      d.slice(UUID_SIXTEEN + UUID_FOUR, coins * UUID_SIXTEEN),
    )
  const versions: Record<string, string> = {}
  for (let v = seed; v <= mintOf(n); v++) versions[v] = at(v) // RFC versions 1..8, all at once
  return { decided: uuidStampOf(d), versions }
}
/** Bits so that 2^bits > value: the work register that holds every residue mod value. 0 for value <= 0. */
const bitsOf = (value: bigint): number => {
  let k = n - n
  let pow = b1
  while (pow <= value) {
    pow += pow
    k += seed
  }
  return k
}
const safeBig = BigInt(Number.MAX_SAFE_INTEGER)
const safeOf = (x: bigint): boolean => x <= safeBig && x >= -safeBig
/** A bigint for JSON: the number when it is exact there, the decimal string when it would round. */
const jsonIntOf = (x: bigint): number | string => (safeOf(x) ? Number(x) : x.toString())

/**
 * The modulus and base Shor runs on when the caller names none: faces.rays * (n * n + n + seed) = 91 and mintOf n = 8.
 * @wing agents
 * @kind builder
 */
export const shorDefaultsOf = () => ({ modulus: facesOf().rays * (n * n + n + seed), base: mintOf(n) })
/** The counting register is two qubits: this inverse QFT is exact in Gaussian integers (fourth roots of unity), and a
 * wider register would need eighth roots, which are not integers. So the register resolves periods dividing four;
 * `classical` below says whether the period it was asked for is one of those. */
const shorCountBits = coins
/** THE CLASSICAL CHECK BESIDE THE RUN, EXACT FOR ANY MODULUS AND NEVER UNFINISHED. The two-qubit counting register
 * resolves a period only when it divides four, and whether the order of the base divides four is three modular
 * powers: a, a^2, a^4 mod n. That answers every question the run poses — is there a ring, is the base a unit, can the
 * register resolve its order, and what must the run then recover — without iterating toward an order it could not
 * reach. So there is no bound to hit, no work budget, and no "did not finish" to report: `beyond` true is an answer
 * (the order exists and does not divide four), not a crack. */
const classicalOrderOf = (base: bigint, modulus: bigint): { ring: boolean; unit: boolean; order: number; beyond: boolean } => {
  if (modulus <= b1) return { ring: false, unit: false, order: n - n, beyond: false }
  if (bigGcdOf(base, modulus) !== b1) return { ring: true, unit: false, order: n - n, beyond: false }
  // THREE MODULAR POWERS, AS THE DOCSTRING SAYS, AND NOTHING UNFINISHED. A later edit replaced them with an exact walk
  // "with no ceiling" to the true order (orderSliceOf, kept below for callers that resume a split walk). The schema
  // sampler sends 2^61 as digits with base 3, whose order modulo 2^61 is 2^59: that walk held the land's clean-worktree
  // certification at full CPU for twenty minutes on 2026-11-08 and would not have ended this year. The register this
  // unit carries is two qubits (shorCountBits = coins), so a, a^2 and a^4 decide everything it can resolve; an order
  // that does not divide four is the ANSWER `beyond` — an exact fact about the register, never a cap on the modulus.
  let power = modOf(base, modulus)
  for (let r = seed; r <= mintOf(coins); r += r) {
    if (power === b1) return { ring: true, unit: true, order: r, beyond: false }
    power = modOf(power * power, modulus)
  }
  return { ring: true, unit: true, order: n - n, beyond: true }
}
/** Order-finding as a SPLIT, not a cap: one hexbit-wide slice of the exact walk from `cur = base^from`. It carries the
 *  running power out so the caller caches it in that slice's hex folder and resumes at `next` — O(1) live memory, reach
 *  unbounded across slices (no ceiling), and the cache is dropped when `order` is found or the walk is abandoned. */
export const orderSliceOf = (base: bigint, modulus: bigint, from: number, cur: bigint): { order: number | null; next: number | null; cur: bigint } => {
  const folder = mintOf(coins)
  let power = from === n - n ? b1 : cur
  for (let k = seed; k <= folder; k++) {
    power = modOf(power * base, modulus)
    if (power === b1) return { order: from + k, next: null, cur: power }
  }
  return { order: null, next: from + folder, cur: power }
}
/** How one argument was read. `digits` is a string of digits, exact at any size. `number` is a JSON number, exact only up
 * to 2^53 (past that the caller's own parser rounded it before it arrived). `numeric` is any other numeric string, read
 * through a double, exact only when the double is an integer under 2^53. `absent` means the caller named nothing and the
 * unit's own value stands. `default` means the caller sent something that holds no number, and the unit's own value
 * stands in its place — said here so a garbage argument never comes back as a confident answer. */
export type QpuArgRead = { how: 'digits' | 'number' | 'numeric' | 'absent' | 'default'; exact: boolean; given: boolean }
const argReadOf = (v: unknown): { value?: bigint; read: QpuArgRead } => {
  const finite = (x: number): boolean => x === x && x !== Number.POSITIVE_INFINITY && x !== Number.NEGATIVE_INFINITY
  const exactDouble = (x: number): boolean => finite(x) && x % seed === n - n && x <= Number.MAX_SAFE_INTEGER && x >= -Number.MAX_SAFE_INTEGER
  if (v === undefined) return { read: { how: 'absent', exact: true, given: false } }
  if (typeof v === 'bigint') return { value: v, read: { how: 'digits', exact: true, given: true } }
  if (typeof v === 'string') {
    const t = v.trim()
    if (/^[+-]?\d+$/.test(t)) return { value: BigInt(t), read: { how: 'digits', exact: true, given: true } }
    const x = t.length > n - n ? Number(t) : Number.NaN
    if (finite(x)) return { value: BigInt(x - (x % seed)), read: { how: 'numeric', exact: exactDouble(x), given: true } }
    return { read: { how: 'default', exact: false, given: true } }
  }
  if (typeof v === 'number' && finite(v)) return { value: BigInt(v - (v % seed)), read: { how: 'number', exact: exactDouble(v), given: true } }
  return { read: { how: 'default', exact: false, given: true } }
}
/** Modulus and base as the caller gave them, read as integers, with how each was read. No denial, no cap: the run is on
  * @wing agents
  * @kind builder
 * whatever integer arrives, and `read` says whether that integer is the one the caller meant. */
export const shorArgsOf = (a: Record<string, unknown>): { modulus?: bigint; base?: bigint; read: { n: QpuArgRead; a: QpuArgRead; holds: boolean } } => {
  const nn = argReadOf(a.n)
  const aa = argReadOf(a.a)
  return { modulus: nn.value, base: aa.value, read: { n: nn.read, a: aa.read, holds: nn.read.exact && aa.read.exact } }
}
export const schemasHolds = (s = schemasOf()): boolean =>
  s.holds === true &&
  s.kind === 'schemas' &&
  s.merge === 'storage' &&
  s.href === storageHref &&
  s.mounted === facesOf().faces &&
  s.vacant === n - n &&
  s.rows.length === s.mounted &&
  s.context.length === coins &&
  s.context[n - n] === schemaOrg &&
  s.efficiency.holds === true &&
  s.efficiency.context === coins &&
  s.efficiency.ratio === facesOf().rays &&
  s.compatibility.keys.length === n &&
  s.rows.every((row) => row.merge === 'storage' && row.involution && row.holds)

/**
 * The JSON-LD @context every served document carries (schema.org plus the unit's prefixes).
 * @wing receipts
 * @kind builder
 */
export const contextOf = onceOf(() => schemasOf().context)

const jsonldHoldsOf = (doc: { '@context': ReturnType<typeof contextOf>; '@type': string; '@id': string; isAccessibleForFree?: boolean }): boolean =>
  schemasHolds() &&
  doc['@context'].length === coins &&
  doc['@context'][n - n] === schemaOrg &&
  doc['@type'].length > n - n &&
  doc['@id'].startsWith(unit.origin) &&
  doc.isAccessibleForFree === true

export const capacityHolds = (c = capacityOf()): boolean =>
  c.holds === true &&
  c.kind === 'capacity' &&
  theorem.handle(c.fused, c.faces, c.kv.amplitudes) &&
  c.amplitudes === mintOf(c.bits) &&
  theorem.next_fused(c.next, c.fused) &&
  c.next === qpuNextOf().nextFused &&
  c.next === qpuNextOf().nextCoil &&
  qpuNextHolds() &&
  c.crypt.kind === 'crypto' &&
  c.crypt.split === c.faces &&
  c.crypt.share === c.kv.amplitudes &&
  c.crypt.holds === true &&
  c.agents.n === c.faces &&
  c.agents.teams === coins &&
  c.agents.rays * c.agents.teams === c.faces &&
  c.schemas.mounted === c.faces &&
  c.schemas.vacant === n - n &&
  c.schemas.merge === 'storage' &&
  c.schemas.holds === true &&
  schemasHolds() &&
  raidHolds(c.raid) &&
  c.raid.faces === c.faces &&
  c.raid.start === 'cheapest' &&
  c.raid.cover.length === c.faces &&
  c.raid.cheapest === c.raid.cover[n - n] &&
  c.neuro.width === c.faces &&
  c.neuro.layers === mintOf(n) &&
  c.neuro.activation === 'xor' &&
  c.neuro.holds === true &&
  neuroHolds() &&
  c.compatibility.harnesses === c.faces &&
  c.compatibility.llms === c.faces &&
  c.compatibility.holds === true &&
  hostsHolds() &&
  c.kv.kind === 'kv' &&
  c.kv.binding === 'STORAGE' &&
  c.kv.name === 'kv' &&
  c.kv.theorem === 'kv' &&
  c.kv.added === c.amplitudes &&
  c.kv.amplitudes === c.amplitudes + c.amplitudes &&
  c.kv.amplitudes === mintOf(c.bits + seed) &&
  c.kv.holds === true &&
  hybridHolds(c.hybrid) &&
  c.hybrid.speed === mintOf(n) &&
  c.hybrid.cost === n &&
  c.hybrid.layers === coins

export const encryptHolds = (e = encryptOf()): boolean =>
  e.holds === true &&
  e.kind === 'encrypt' &&
  e.theorem === 'crypto' &&
  e.identity === true &&
  e.secrecy === false &&
  e.ciphertext === e.public &&
  e.ciphertext === e.split * e.share &&
  e.ciphertext === e.fused &&
  e.ciphertext !== e.modulus

let shorFactorMemo: string | undefined
/** The factoring claim computed from the run: the modulus Shor factored in this unit's exact state-vector computation — by default 91, the instance
  * @wing agents
  * @kind builder
 *  theorem shor states. Never RSA-2048. */
export const shorFactorOf = (): string => (shorFactorMemo ??= `Factor ${shorOf().n}`)
let cryptoClaimMemo: string | undefined
/**
 * The crypto claim READ from the run: the split identity holds and secrecy does not. Not encryption. Never typed.
 * @wing agents
 * @kind builder
 */
export const cryptoClaimOf = (): string => {
  if (cryptoClaimMemo === undefined) {
    const e = encryptOf()
    cryptoClaimMemo = `Split identity ${e.identity}. Secrecy ${e.secrecy}`
  }
  return cryptoClaimMemo
}

export const speedHolds = (s = speedOf()): boolean =>
  s.holds === true &&
  s.kind === 'speed' &&
  s.factor === coins &&
  s.cover.length === coins &&
  s.cover.join(' ') === 'next benchmark' &&
  s.benchmark.length === mintOf(n) &&
  s.benchmark.every((r) => r.holds === true)

export type QpuLeanRow = {
  heading: string
  theorem: string
  formula: string
  reading: string
  /** Which reading of a quantity this statement is, taken from the statement itself — see crossReadingOf. */
  cross: QpuCross
  /** The statement's handle: the first 8 hex of its content UUID (statementUuidOf); two theorems that state the same
   *  thing share it, whatever they are named. */
  handle: string
  holds: boolean
}

/** THE PROOF ITSELF, SERVED. The Lean file the theorems come from, embedded at build from src/…/index.lean by
 * scripts/embed-lean.mjs, served at its cited path, and folded so a reader compares bytes, not readings. `verbatim`
 * counts the served theorem strings found in the source after whitespace folding; `holds` wants all of them. */
const spaceOf = (text: string): string => text.replace(/\s+/g, ' ').trim()
/**
 * THE CLASSIFICATION RECOMPUTES, AND THE LATTICE HAS EXACTLY ONE BRIDGE.
 *
 * Every served row carries a cross reading, and every one of them must be what its own statement says it is —
 * a label that has drifted from the statement beside it is worse than no label. Asked by recomputing, so the
 * check cannot agree with a stale value.
 *
 * And the shape of the set is itself a claim: both readings are populated, and there is exactly ONE bridge.
 * mintOf (a + b) = mintOf a * mintOf b is the only law here that turns a sum into a product, which is why it is
 * the only reason any quantity can be read both ways. A second bridge would mean a second such law, and there
 * is not one.
 */
export const crossReadingHolds = (rows: readonly QpuLeanRow[] = leanAllRowsOf()): boolean => {
  if (rows.length === n - n) return false
  if (!rows.every((row) => row.cross === crossReadingOf(row.theorem))) return false
  const count = (which: QpuCross) => rows.filter((row) => row.cross === which).length
  // ONE BRIDGE LAW, counted by statement: a theorem and its alias (multiply, mintOf_add) state one law at one address.
  const bridges = new Set(rows.filter((row) => row.cross === 'bridge').map((row) => row.handle))
  return bridges.size === seed && count('symmetric') > n - n && count('asymmetric') > n - n && count('cross') > n - n
}

/** Every theorem row the unit serves: the headline rows, the cover, and the climb. Internal — it is a
 *  concatenation with no invariant of its own, and the dry-clean law is that an exported xOf carries a
 *  xHolds. A predicate invented to satisfy that law would be the furniture the law exists to prevent. */
const leanAllRowsOf = (lean = leanOf()): readonly QpuLeanRow[] => [...lean.rows, ...lean.cover, lean.climb]

/** Attach the cross reading to a stated row. Computed from the statement, so no literal below carries a label
 *  that could disagree with what it states. */
const statementOf = (theorem: string): string => statedTypeOf(theorem)
/**
 * The content UUID of a theorem's statement (its type, binders excluded): the address every served row's handle is cut from.
 * @wing proof
 * @kind function
 */
export const statementUuidOf = (theorem: string): string => shapeUuidOf(statementOf(theorem))
const crossed = (row: Omit<QpuLeanRow, 'cross' | 'handle'>): QpuLeanRow => {
  const uuid = shapeUuidOf(statementOf(row.theorem))
  uuidReceiptOf(`lean ${row.heading}`, uuid, row.holds, `${unit.origin}/${unit.fuse.lean}`)
  return { ...row, cross: crossReadingOf(row.theorem), handle: uuid.slice(n - n, UUID_EIGHT) }
}

/**
 * The embedded index.lean: bytes, fold, theorem count, how many served rows are verbatim in it, toolchain pin.
 * @wing proof
 * @kind builder
 * @evidence leanSourceOf
 */
export const leanSourceOf = (rows: readonly QpuLeanRow[] = [], cover: readonly QpuLeanRow[] = [], climb?: QpuLeanRow) => {
  const href = `${unit.origin}/${unit.fuse.lean}`
  const bytes = new TextEncoder().encode(leanSource).length
  const fold = foldOf(leanSource)
  const theorems = leanSource.split('\n').filter((line) => line.startsWith('theorem ')).length
  const flat = spaceOf(leanSource)
  const served = climb ? [...rows, ...cover, climb] : [...rows, ...cover]
  const verbatim = served.filter((r) => flat.includes(spaceOf(r.theorem))).length
  const holds =
    bytes > n - n &&
    fold.length === mintOf(mintOf(coins)) &&
    theorems >= served.length &&
    verbatim === served.length &&
    href.endsWith('/index.lean')
  return {
    kind: 'source' as const,
    href,
    path: unit.fuse.lean,
    bytes,
    fold,
    theorems,
    served: served.length,
    verbatim,
    toolchain: leanToolchain,
    check: `lean ${unit.fuse.lean}`,
    holds,
  }
}

/**
 * SYMMETRIC OR ASYMMETRIC, READ OFF THE STATEMENT AND NOT DECLARED BESIDE IT.
 *
 * Every quantity in this lattice is stated twice — once as a SUM of like terms, which is unchanged when they are
 * exchanged, and once as a PRODUCT of unlike terms, which is not. index.lean does not treat those as two facts:
 * `theorem harmonic : faces = rays + rays := by rw [around, coins_two, Nat.two_mul]` derives the symmetric form
 * FROM the asymmetric one, and what carries it across is coins = seed + seed.
 *
 * So the classification is a property of the statement, and it is taken from the statement. A table mapping
 * theorem names to 'symmetric' would be a second place to be wrong, and would go stale the day a statement
 * changed without its label.
 *
 * bridge is the rarest and the most load-bearing: mintOf (a + b) = mintOf a * mintOf b is the general reason a
 * quantity can be read either way at all. A sum inside the doubling is a product outside it.
 */
export type QpuCross = 'asymmetric' | 'bridge' | 'cross' | 'neither' | 'symmetric'
/** The statement's type: what follows the first ` : ` outside any bracket, so binders like `(a b : Nat)` and
 *  `∀ x : Nat,` are not mistaken for it, by construction (the first colon outside any bracket). */
const statedTypeOf = (statement: string): string => {
  const stated = spaceOf(statement.split(':=')[n - n] ?? '')
  let depth = n - n
  for (let i = n - n; i < stated.length; i++) {
    const ch = stated[i]!
    if ('({[⟨'.includes(ch)) depth++
    else if (')}]⟩'.includes(ch)) depth--
    else if (depth === n - n && stated.startsWith(' : ', i)) return stated.slice(i + n).trim()
  }
  return stated
}
/** Each conjunct with its outer parentheses and leading ∀ binder removed. */
const conjunctsOf = (type: string): string[] =>
  type.split('∧').map((part) => {
    let c = part.trim()
    while (c.startsWith('(') && c.endsWith(')')) c = c.slice(seed, -seed).trim()
    return c.replace(/^∀ [^,]*, /, '').trim()
  })
const likeSumOf = (e: string): boolean => {
  const t = e.split('+')
  return t.length === coins && t[n - n]!.trim() === t[seed]!.trim()
}
const unlikeProductOf = (e: string): boolean => {
  const t = e.split('*')
  return t.length === coins && t[n - n]!.trim() !== t[seed]!.trim()
}
/**
 * CROSS is the fifth reading: a statement whose two sides ARE the two readings — a sum of like terms equal to a
 * product of unlike ones. `next_fused` (faces * mintOf (bits + coins) = fused + fused) is the asymmetric reading
 * set equal to the symmetric one; reading only its right side called it symmetric, which is half of what it says.
 * Any conjunct that crosses makes the statement cross; otherwise the first conjunct decides as before.
  * @wing proof
  * @kind builder
  * @evidence crossReadingHolds
 */
export const crossReadingOf = (statement: string): QpuCross => {
  const conjuncts = conjunctsOf(statedTypeOf(statement))
  for (const c of conjuncts) {
    const side = c.split('=')
    if (side.length !== coins) continue
    const [left, right] = [side[n - n]!.trim(), side[seed]!.trim()]
    if ((likeSumOf(left) && unlikeProductOf(right)) || (unlikeProductOf(left) && likeSumOf(right))) return 'cross'
  }
  const side = (conjuncts[n - n] ?? '').split('=')
  if (side.length < coins) return 'neither'
  const right = side[side.length - seed]!.trim()
  // mintOf of a sum equals a product of mintOf — the bridge between the two readings.
  if (/^mintOf\s*\(.*\+.*\)$/.test(side[n - n]!.trim()) && /mintOf.*\*.*mintOf/.test(right)) return 'bridge'
  if (likeSumOf(right)) return 'symmetric'
  if (unlikeProductOf(right)) return 'asymmetric'
  return 'neither'
}

/** WHAT THE WORDS MEAN, SERVED BESIDE THEM. `holds` is said of every record and means that the record is self-consistent
 * and recomputes to itself; it is not a claim that the test the record describes passed. That claim, where a record
  * @wing agents
  * @kind builder
 * makes one, has its own word: `pass`, `factored`, `measured`, `entangled`, `resolvable`. */
export const glossaryOf = onceOf(() => ({
  kind: 'glossary' as const,
  holds: 'this record is self-consistent and recomputes to itself; not a claim that the test it describes passed',
  pass: 'the test the record describes passed (quantum volume); can be false beside holds true',
  factored: 'the run found p and q with p * q = n; `by` says whether by period or by gcd',
  measured: 'a held state was read for these shots; shots from nothing are never listed',
  sampled: 'false everywhere: outcomes enumerate the support, they are not drawn; the unit holds no entropy',
  read: 'how each argument was taken (digits, number, numeric, absent, default) and whether exactly',
  beyond: 'the order of the base exists and does not divide four, so a two-qubit register cannot resolve it',
  device: 'exact-amplitudes when every amplitude held is an exact integer; unmeasured otherwise',
  amplitude: 'the exact integer X-basis value of a superposition: the sum of the branch signs, so zero means the branches cancel; never a probability',
  weight: 'the X-basis value of a mixture: the sum of the squared branch signs; a weight, never an amplitude, and never a probability',
  QPU: 'quantum processing unit — this unit. The VideoCore QPU (Quad Processing Unit, Broadcom; QPULib by Matthew Naylor, MIT, 2016) is prior use of the acronym, a classical SIMD vector core, unrelated and credited',
  seat: 'reference, vector or device: the router computes on the reference (the exact integer state-vector computation) unless the runtime exposes a vector binding; the device seat is empty, no device is dispatched, and a device that disagrees with the reference is a driver bug, never a physics claim',
}))
export const citeHolds = (c = qpuCiteOf()): boolean =>
  c.holds === true &&
  c.kind === 'cite' &&
  c.style === 'mla8' &&
  c.source === 'website' &&
  c.when === 'never' &&
  c.website === unit.host &&
  c.author.orcid === 'https://orcid.org/0009-0000-7312-9778' &&
  /* THE VERSION DOI IS NOT A CONSTANT, and pinning it here made this predicate false on the next archive and
   * every archive after it — unnoticed, because nothing called it. Measured 2026-09-28: it still asserted
   * 22717782 while the reading carried 22973935. What is actually fixed is the CONCEPT doi, which is the
   * all-versions record and never moves; what is true of a version doi is a relation to the record it names. */
  /^10\.5281\/zenodo\.\d+$/.test(c.doi) &&
  c.archive === `https://zenodo.org/records/${c.doi.split('.').pop()}` &&
  c.doi === c.archived.doi &&
  c.archive === c.archived.archive &&
  c.doi !== c.conceptdoi &&
  c.conceptdoi === '10.5281/zenodo.22700098' &&
  c.identifier === `https://doi.org/${c.doi}` &&
  c.sameAs.includes(c.archive) &&
  c.sameAs.includes(c.author.orcid) &&
  c.sameAs.includes(c.identifier) &&
  /* Likewise the commit and the version of whatever is archived: both move, and both have a shape. */
  /^[0-9a-f]{7,40}$/.test(c.archived.commit) &&
  /^\d+\.\d+\.\d+$/.test(c.archived.version) &&
  c.served.version === packageVersion &&
  c.current === (c.archived.version === c.served.version) &&
  c.currency.includes(`v${c.served.version}`) &&
  jsonldHoldsOf(c) &&
  c.prior.doi === '10.5281/zenodo.21781603' &&
  c.prior.archive === 'https://zenodo.org/records/21781603' &&
  c.prior.works.includes(`doi:${c.prior.doi}`) &&
  c.prior.works.includes('Zenodo, ') &&
  c.rows.length === n &&
  c.rows.every((r) => r.doi === c.doi && r.works.includes(c.author.orcid) && r.works.includes(`doi:${c.doi}`)) &&
  c.right.includes('CC-BY-NC-ND-4.0') &&
  c.right.includes(`${c.author.first} ${c.author.last}`) &&
  c.right.includes('commercial licence') &&
  c.grant.licence === 'CC-BY-NC-ND-4.0' &&
  c.grant.price === 'relation' &&
  c.grant.holds === false &&
  c.grant.lead === true &&
  c.grant.organisation.lead === true &&
  c.grant.use.lead === true &&
  c.grant.next !== undefined &&
  c.grant.next.handle.length === 8 &&
  c.grant.next.uuid !== c.grant.next.handle &&
  c.links.kind === 'links' &&
  c.links.holds === false &&
  c.links.edges.length > 0 &&
  c.links.edges.every((edge) => edge.holds === false && edge.address === undefined && !edge.from.includes('@') && !edge.to.includes('@') && !edge.from.includes('orcid.org') && !edge.to.includes('orcid.org')) &&
  c.links.edges.some((edge) => edge.from.includes(c.doi) || edge.to.includes(c.doi)) &&
  c.links.edges.some((edge) => edge.from.includes(c.conceptdoi) || edge.to.includes(c.conceptdoi)) &&
  c.links.edges.some((edge) => edge.from === 'https://github.com/uuidna/qpu' || edge.to === 'https://github.com/uuidna/qpu') &&
  c.links.edges.some((edge) => edge.from === `${unit.origin}/api` || edge.to === `${unit.origin}/api`) &&
  c.links.edges.some((edge) => (edge.from === `${unit.origin}/license` || edge.to === `${unit.origin}/license`) && edge.lead === true) &&
  c.links.edges.some((edge) => edge.from === unit.origin && edge.to === `https://doi.org/${c.doi}`) &&
  c.links.edges.some((edge) => edge.from === `https://doi.org/${c.doi}` && edge.to === unit.origin) &&
  !('price' in c.links) &&
  !('referer' in c.links) &&
  !('referrer' in c.links) &&
  (!hexFamiliesOf().has('graph') || (c.links.next !== undefined && c.links.next.handle.length === 8 && c.links.next.uuid !== c.links.next.handle))

const tokensOf = (bytes: number): number => Number(BigInt(bytes) / BigInt(mintOf(coins)))

const manAt = (endpoint: string, name: string, description: string, reading: string, href: string, see: readonly string[]) => {
  const synopsis = `POST ${endpoint} tools/call ${name}`
  const documentation = [
    'NAME',
    `    ${name} — ${description}`,
    'SYNOPSIS',
    `    ${synopsis}`,
    `    ${name} { man: true }`,
    'DESCRIPTION',
    `    ${reading}`,
    'SEE ALSO',
    `    ${see.join(', ')}`].join('\n')
  const holds =
    documentation.includes(`NAME`) &&
    documentation.includes(name) &&
    documentation.includes(synopsis) &&
    documentation.includes('{ man: true }') &&
    see.every((s) => s !== name && documentation.includes(s))
  return { kind: 'man' as const, inline: true as const, name, section: n, synopsis, href, description, reading, documentation, holds }
}
/**
 * A tool's man page (NAME, SYNOPSIS, DESCRIPTION, SEE ALSO) for the mcp door.
 * @wing agents
 * @kind builder
 * @evidence manHolds
 */
export const qpuManOf = (name: string, description: string, reading: string, href: string, see: readonly string[]) =>
  manAt(`${unit.origin}/api`, name, description, reading, href, see)

export const manHolds = (m?: ReturnType<typeof qpuManOf>): boolean =>
  m !== undefined && (m.holds === true && m.kind === 'man' && m.inline === true && m.section === n && m.documentation.includes(m.name))


/** OUTPUT SCHEMAS READ FROM THE RUN. A schema of `{ type: object }` constrains nothing and so can fail nothing; every
 * tool's schema is instead derived from its own replies: the properties every sample carried with their JSON types,
 * `required` being the keys present in every sample, and `holds` a required boolean throughout. One level of nesting
 * is typed; deeper values are objects or arrays. Derived once per isolate; a reader validates any later reply against
 * it, which is a check the empty schema could never make. */
const jsonTypeOf = (v: unknown): string =>
  v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v === 'number' ? (v % seed === n - n ? 'integer' : 'number') : typeof v === 'object' ? 'object' : typeof v
const typeUnionOf = (types: readonly string[]): string | string[] => {
  const distinct = [...new Set(types)]
  return distinct.length === seed ? distinct[n - n]! : distinct
}
/**
 * A JSON Schema derived from a tool's own replies: properties typed from the samples, required = keys present in every sample.
 * @wing agents
 * @kind builder
 */
export const outputSchemaOf = (samples: readonly unknown[]) => {
  const objects = samples.filter((x): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x))
  const properties: Record<string, Record<string, unknown>> = {}
  const keys = new Set<string>()
  for (const o of objects) for (const k of Object.keys(o)) keys.add(k)
  for (const k of keys) {
    const values = objects.filter((o) => k in o).map((o) => o[k])
    const type = typeUnionOf(values.map(jsonTypeOf))
    if (type === 'object') {
      const inner: Record<string, Record<string, unknown>> = {}
      const innerKeys = new Set<string>()
      for (const v of values as Record<string, unknown>[]) for (const ik of Object.keys(v)) innerKeys.add(ik)
      for (const ik of innerKeys) inner[ik] = { type: typeUnionOf((values as Record<string, unknown>[]).filter((v) => ik in v).map((v) => jsonTypeOf(v[ik]))) }
      properties[k] = { type, properties: inner }
    } else properties[k] = { type }
  }
  properties.holds = { type: 'boolean' }
  const required = [...keys].filter((k) => objects.every((o) => k in o))
  if (!required.includes('holds')) required.push('holds')
  return { type: 'object' as const, description: `derived from ${objects.length} repl${objects.length === seed ? 'y' : 'ies'} of the tool itself; holds is always required`, properties, required, additionalProperties: true as const }
}
export type QpuOutputSchema = ReturnType<typeof outputSchemaOf>
const minimalOutputSchema = { type: 'object' as const, properties: { holds: { type: 'boolean' } }, required: ['holds'], additionalProperties: true as const }
const mcpToolShapeOf = (name: string, description: string, inputSchema: Record<string, unknown>, extra: Record<string, unknown> = {}) => ({
  name,
  // A display title distinct from the machine name (MCP spec; GitHub and Cloudflare both ship one): the model keys
  // off `name`, a UI shows the title. Derived from the name's own word, not a hand-kept list — the door after its
  // prefix, capitalised (quantum → Quantum, crypto_rsa → Rsa).
  title: name.replace(/^[a-z]+_/, '').replace(/^./, (c) => c.toUpperCase()),
  description,
  // The through-schema is not copied onto every row. tools/list is paid on every connect and stays under a KiB per
  // door; one line in the description names { hex }, { door, arguments }, { doors: true } and { errors: true }, and the
  // schema itself rides on the man page (manPageOf), one call away. mcpCallOf still routes those arguments.
  inputSchema,
  annotations: {
    audience: ['user', 'assistant'] as const,
    priority: seed,
    readOnlyHint: name !== 'forge',
    destructiveHint: false as const,
    // A tool is open-world only when it can reach the live occupancy — the ones whose input carries `live`. The
    // deterministic compute and content tools (quantum, lean, cite, the crypto morphs) touch no external world, so
    // they are closed-world, and a closed-world read is idempotent: the same call returns the same document. This
    // was a blanket openWorldHint: true, which told a client every tool might reach outside when most never do.
    openWorldHint: (inputSchema as { properties?: Record<string, unknown> }).properties?.live !== undefined,
    idempotentHint: name !== 'forge' && (inputSchema as { properties?: Record<string, unknown> }).properties?.live === undefined},
  ...extra})

/** Where a GET returns the document a tool names — only there is a link to it honest. Two tools have such a page;
 * the rest reply with what no GET serves, and carry no link rather than one to a different document. The reply
 * itself is the recognition; the GET is the document that fold names. */
const shownResourceOf = (name: string): string | undefined => {
  if (name === 'lean') return unit.href
  if (name === 'cite') return `${unit.origin}/cite`
  return undefined
}

/** A document the agent already knows how to identify: fold, byte count, token count, and the verdict (holds, the
 * computational device, a small `only`). The span is one KiB, the connect-bill unit; the reply spans one KiB for
 * each of the eight doors. Anything larger is named, not copied. */
const recognitionSpanOf = (): number => mintOf(tenOf(seed))
const recognitionReplyOf = (): number => recognitionSpanOf() * mintOf(n)
const recognitionKept = ['holds', 'kind', 'device', 'only', 'recognition'] as const
const recognitionKeptOf = (key: string): boolean => (recognitionKept as readonly string[]).includes(key)
const recognitionDeviceOf = (value: unknown): string | undefined => {
  if (!value || typeof value !== 'object') return undefined
  const bag = value as Record<string, unknown>
  if (typeof bag.device === 'string') return bag.device
  const steps = bag.steps
  if (steps && typeof steps === 'object' && typeof (steps as { device?: unknown }).device === 'string') return (steps as { device: string }).device
  if (bag.circuit && typeof bag.circuit === 'object') {
    const nested = recognitionDeviceOf(bag.circuit)
    if (nested !== undefined) return nested
  }
  const evidence = bag.evidence
  if (evidence && typeof evidence === 'object') {
    const provenance = (evidence as { provenance?: unknown }).provenance
    if (provenance && typeof provenance === 'object' && typeof (provenance as { device?: unknown }).device === 'string') return (provenance as { device: string }).device
  }
  return undefined
}
const recognitionStubOf = (value: unknown, text = JSON.stringify(value)): Record<string, unknown> => {
  const bag = value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {}
  const device = recognitionDeviceOf(value)
  const only = bag.only
  const onlyText = only === undefined ? '' : JSON.stringify(only)
  return {
    kind: 'recognition' as const,
    fold: foldOf(text),
    bytes: text.length,
    tokens: tokensOf(text.length),
    length: typeof value === 'string' ? value.length : Array.isArray(value) ? value.length : text.length,
    ...(typeof bag.holds === 'boolean' ? { holds: bag.holds } : {}),
    ...(device !== undefined ? { device } : {}),
    ...(only !== undefined && onlyText.length <= recognitionSpanOf() ? { only } : {}),
    expand: '{ full: true }' as const,
  }
}
const recognitionWalkOf = (value: unknown, span: number): unknown => {
  // undefined has no JSON (JSON.stringify(undefined) is undefined, not a string): pass it through rather than read
  // .length off it. A reply with an undefined-valued key omits that key in the end, so recognition must not crash on it.
  if (value === undefined || value === null || typeof value === 'boolean' || typeof value === 'number') return value
  const text = JSON.stringify(value)
  if (text.length <= span) return value
  if (typeof value === 'string' || Array.isArray(value)) return recognitionStubOf(value, text)
  const src = value as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(src)) out[key] = recognitionWalkOf(src[key], span)
  if (JSON.stringify(out).length <= span) return out
  const keys = Object.keys(out).filter((key) => !recognitionKeptOf(key)).sort((a, b) => JSON.stringify(out[b]).length - JSON.stringify(out[a]).length)
  for (const key of keys) {
    if (JSON.stringify(out).length <= span) break
    const stub = recognitionStubOf(src[key])
    if (JSON.stringify(stub).length < JSON.stringify(out[key]).length) out[key] = stub
  }
  return out
}
const recognitionShrinkOf = (out: Record<string, unknown>, src: Record<string, unknown>, budget: number, span: number): void => {
  const steps = mintOf(mintOf(n))
  for (let i = n - n; i < steps && JSON.stringify(out).length > budget; i++) {
    const keys = Object.keys(out).filter((key) => !recognitionKeptOf(key) && !(out[key] !== null && typeof out[key] === 'object' && (out[key] as { kind?: unknown }).kind === 'recognition'))
    if (keys.length === n - n) break
    keys.sort((a, b) => JSON.stringify(out[b]).length - JSON.stringify(out[a]).length)
    const key = keys[n - n]!
    const child = out[key]
    const original = src[key]
    if (child && original && typeof child === 'object' && typeof original === 'object' && !Array.isArray(child) && !Array.isArray(original)) {
      const before = JSON.stringify(child).length
      recognitionShrinkOf(child as Record<string, unknown>, original as Record<string, unknown>, span, span)
      if (JSON.stringify(child).length < before) continue
    }
    const stub = recognitionStubOf(original)
    if (JSON.stringify(stub).length < JSON.stringify(out[key]).length) out[key] = stub
    else break
  }
}
/** GIBBS FREE ENERGY, the one definition the thermodynamics family and this recognition share: the work left once the
 *  bound heat is taken from the enthalpy, max(0, enthalpy − heat). `thermodynamics.gibbs` seals this same function as a
 *  nested hex-program crossed to `heat`; the recognition reads it here instead of keeping a rule of its own, so the
 *  energy is a family formula like everything else, not a constant hardcoded at the core. */
export const gibbsFreeOf = (enthalpy: number, heat: number): number => (heat < enthalpy ? enthalpy - heat : n - n)
/** Gibbs at one temperature: the document is the enthalpy, the reply is the heat this call dissipates, and the
 * difference is the free energy — the work left because the document was not sent. A call claims no energy out of
 * the erasure; the free energy is only what was not spent. The difference is gibbsFreeOf, i.e. thermodynamics.gibbs. */
const recognitionFreeOf = (led: Record<string, unknown>, text: string): Record<string, unknown> => {
  const recognition = led.recognition as Record<string, unknown> | undefined
  if (!recognition || recognition.kind !== 'recognition') return led
  const enthalpy = tokensOf(text.length)
  recognition.enthalpy = enthalpy
  recognition.heat = tokensOf(JSON.stringify(led).length)
  recognition.free = gibbsFreeOf(enthalpy, recognition.heat as number)
  const heat = tokensOf(JSON.stringify(led).length)
  if (heat !== recognition.heat) {
    recognition.heat = heat
    recognition.free = gibbsFreeOf(enthalpy, heat)
  }
  return led
}
/** A step that does not hold is linked to the core by the formula address that recomputes it: the 8-hex handle and the
 *  hex-program UUID (handle + nibble + params). violation, a fidelity miss, a fast surplus, a redirected remainder,
 *  and any law formula that already carries its hex. No person, host, or vendor is named. A lead (holds false) also
 *  carries one next address — the following slice, another way of a relation, or the next formula the integers in
 *  hand already determine — and the reply stops there. */
const formulaHeadOf = (formula: unknown): string => (typeof formula === 'string' ? (formula.split('(')[n - n] ?? '') : '')
const evidenceOf = (src: Record<string, unknown>): boolean => {
  const head = formulaHeadOf(src.formula)
  const note = typeof src.note === 'string' ? src.note : ''
  const hex = typeof src.hex === 'string' ? src.hex : ''
  if (head === 'violation' && src.holds === false) return true
  if (head === 'fidelity' && src.value === n - n) return true
  if (head === 'fast' && src.holds === false) return true
  if (head === 'redirected' && typeof src.value === 'number' && src.value > n - n) return true
  if (src.lead === true && (src.id === 'plasma-near' || note.toLowerCase().includes('licen'))) return true
  if (src.src === 'law' && hex.length > UUID_EIGHT && hex.charAt(UUID_EIGHT) === '-') return true
  return false
}
const hexUuidOf = (hex: unknown): string | undefined =>
  typeof hex === 'string' && hex.length > UUID_EIGHT && hex.charAt(UUID_EIGHT) === '-' ? hex : undefined
const addressOf = (src: Record<string, unknown>, lead = false): { handle: string; uuid: string } | undefined => {
  const hex = hexUuidOf(src.hex)
  if (hex !== undefined && (evidenceOf(src) || (lead && src.holds === false))) {
    const handle = hex.slice(n - n, UUID_EIGHT)
    if (handle.length === UUID_EIGHT) return { handle, uuid: hex }
  }
  const steps = src.steps
  if (!Array.isArray(steps)) return undefined
  for (const step of steps) {
    if (!step || typeof step !== 'object') continue
    const reading = (step as { reading?: unknown }).reading
    if (reading && typeof reading === 'object' && !Array.isArray(reading)) {
      const found = addressOf(reading as Record<string, unknown>, lead)
      if (found) return found
    }
  }
  return undefined
}
const carrierOf = (src: Record<string, unknown>, uuid: string): Record<string, unknown> | undefined => {
  if (src.hex === uuid) return src
  const steps = src.steps
  if (!Array.isArray(steps)) return undefined
  for (const step of steps) {
    if (!step || typeof step !== 'object') continue
    const reading = (step as { reading?: unknown }).reading
    if (reading && typeof reading === 'object' && !Array.isArray(reading)) {
      const found = carrierOf(reading as Record<string, unknown>, uuid)
      if (found) return found
    }
  }
  return undefined
}
/** An address already written on the lead: handle and UUID. A numeric `next` is a slice index, not this. */
const namedLeadOf = (src: Record<string, unknown>): { handle: string; uuid: string } | undefined => {
  const next = src.next
  const uuid = hexUuidOf(next)
  if (uuid) return { handle: uuid.slice(n - n, UUID_EIGHT), uuid }
  if (!next || typeof next !== 'object' || Array.isArray(next)) return undefined
  const named = hexUuidOf((next as { uuid?: unknown }).uuid)
  const handle = (next as { handle?: unknown }).handle
  if (named && typeof handle === 'string' && handle.length === UUID_EIGHT) return { handle, uuid: named }
  return undefined
}
const indexNextOf = (src: Record<string, unknown> | undefined): number | undefined => {
  const next = src?.next
  return typeof next === 'number' && Number.isSafeInteger(next) && next >= n - n ? next : undefined
}
/** The same one-integer call at gate's `next` index. The UUID is minted; the slice is not run. */
const sliceNextOf = (uuid: string, from: number): { handle: string; uuid: string } | undefined => {
  const decoded = hexDecodeOf(uuid)
  if (!decoded.holds || !('family' in decoded) || !decoded.family || decoded.params.length !== seed) return undefined
  const program = decoded.program.filter((name) => name.length > n - n && name !== 'unknown')
  if (program.length !== seed) return undefined
  try {
    const next = qpuHexUuidOf({ family: decoded.family, program, params: [from] })
    if (next === uuid) return undefined
    return { handle: next.slice(n - n, UUID_EIGHT), uuid: next }
  } catch {
    return undefined
  }
}
/** Another way already computed for a value this lead reached: its hex is the next address. */
const relationNextOf = (src: Record<string, unknown> | undefined, here: string): { handle: string; uuid: string } | undefined => {
  if (!src) return undefined
  const ways: unknown[] = []
  if (Array.isArray(src.ways)) ways.push(...src.ways)
  if (Array.isArray(src.relations)) {
    for (const row of src.relations) {
      if (row && typeof row === 'object' && Array.isArray((row as { ways?: unknown }).ways)) ways.push(...(row as { ways: unknown[] }).ways)
    }
  }
  for (const way of ways) {
    if (!way || typeof way !== 'object') continue
    const uuid = hexUuidOf((way as { hex?: unknown }).hex)
    if (uuid && uuid !== here) return { handle: uuid.slice(n - n, UUID_EIGHT), uuid }
  }
  return undefined
}
/** One pass, one next lead. The following call repeats this rule; this reply does not. */
let leadWave = false
const familyNextOf = (uuid: string): { handle: string; uuid: string } | undefined => {
  if (leadWave) return undefined
  const decoded = hexDecodeOf(uuid)
  if (!decoded.holds || !('family' in decoded) || !decoded.family) return undefined
  const family = decoded.family
  const program = decoded.program.filter((name) => name.length > n - n && name !== 'unknown')
  const name = program[n - n]
  if (!name || program.length !== seed) return undefined
  const formulas = hexFamiliesOf().get(family)
  if (!formulas) return undefined
  const at = formulas.findIndex((formula) => formula.name === name)
  if (at < n - n) return undefined
  const ints = decoded.params
  leadWave = true
  try {
    for (let step = seed; step < formulas.length; step++) {
      const formula = formulas[(at + step) % formulas.length]!
      if (formula.live || formula.arity !== ints.length) continue
      let out: unknown
      try {
        out = formula.run(ints.map((x) => BigInt(x)))
      } catch {
        continue
      }
      if (out !== null && typeof out === 'object' && typeof (out as { then?: unknown }).then === 'function') continue
      if (!(out !== null && typeof out === 'object' && (out as { holds?: unknown }).holds === false)) continue
      try {
        const next = qpuHexUuidOf({ family, program: [formula.name], params: ints })
        if (next !== uuid) return { handle: next.slice(n - n, UUID_EIGHT), uuid: next }
      } catch {
        /* these integers do not determine the call */
      }
    }
  } finally {
    leadWave = false
  }
  return undefined
}
const nextLeadOf = (src: Record<string, unknown>, here: { handle: string; uuid: string }): { handle: string; uuid: string } | undefined => {
  const carrier = carrierOf(src, here.uuid) ?? src
  const named = namedLeadOf(carrier) ?? (carrier !== src ? namedLeadOf(src) : undefined)
  if (named && named.uuid !== here.uuid) return named
  const from = indexNextOf(carrier) ?? (carrier !== src ? indexNextOf(src) : undefined)
  if (from !== undefined) {
    const sliced = sliceNextOf(here.uuid, from)
    if (sliced) return sliced
  }
  const related = relationNextOf(carrier, here.uuid) ?? (carrier !== src ? relationNextOf(src, here.uuid) : undefined)
  if (related) return related
  return familyNextOf(here.uuid)
}
/**
 * RECOGNISE, THEN THINK. Any JSON value: the fold of the whole document leads, a subtree that fits the span stays
 * so it can be thought on, and a subtree that does not fit is named by its own fold. The reply is the free energy
 * of the document. `{ full: true }` spends the enthalpy.
 * @wing agents
 * @kind builder
 * @evidence recognizeHolds
 */
export const recognizeOf = (value: unknown): unknown => {
  const text = JSON.stringify(value)
  const span = recognitionSpanOf()
  const reply = recognitionReplyOf()
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return text.length <= reply ? value : recognitionStubOf(value, text)
  const src = value as Record<string, unknown>
  const walked: Record<string, unknown> = {}
  for (const key of Object.keys(src)) walked[key] = recognitionWalkOf(src[key], span)
  const device = recognitionDeviceOf(src)
  const address = addressOf(src, src.holds === false)
  const next = address && src.holds === false ? nextLeadOf(src, address) : undefined
  const recognition = {
    kind: 'recognition' as const,
    fold: foldOf(text),
    bytes: text.length,
    tokens: tokensOf(text.length),
    length: text.length,
    ...(typeof src.holds === 'boolean' ? { holds: src.holds } : {}),
    ...(device !== undefined ? { device } : {}),
    ...(address ? { handle: address.handle, uuid: address.uuid, ...(typeof src.value === 'number' ? { value: src.value } : {}), ...(next ? { next } : {}) } : {}),
    ...(typeof src.right === 'string' && JSON.stringify(src.right).length <= span ? { right: src.right } : {}),
    expand: '{ full: true }' as const,
  }
  const led: Record<string, unknown> = { recognition, ...walked }
  if (JSON.stringify(led).length <= reply) return recognitionFreeOf(led, text)
  recognitionShrinkOf(led, src, reply, span)
  if (JSON.stringify(led).length <= reply) return recognitionFreeOf(led, text)
  const residue: Record<string, unknown> = { recognition }
  for (const key of Object.keys(src)) {
    const child = src[key]
    if (typeof child === 'boolean' || typeof child === 'number' || child === null || (typeof child === 'string' && JSON.stringify(child).length <= span)) residue[key] = child
    else residue[key] = recognitionStubOf(child)
  }
  if (JSON.stringify(residue).length <= reply) return recognitionFreeOf(residue, text)
  const verdict: Record<string, unknown> = { recognition }
  for (const key of Object.keys(src)) {
    const child = src[key]
    if (typeof child === 'boolean' || typeof child === 'number' || child === null) verdict[key] = child
  }
  return recognitionFreeOf(verdict, text)
}
/**
 * Every value this unit can show is recognisable: the fold matches the document, recognition leads, and a document
 * larger than the reply span comes back inside it.
 * @wing agents
 * @kind builder
 * @evidence recognizeHolds
 */
export const recognizeHolds = (value?: unknown): boolean => {
  const span = recognitionSpanOf()
  const reply = recognitionReplyOf()
  const fat = value ?? {
    kind: 'recognize' as const,
    holds: true as const,
    device: 'exact-amplitudes' as const,
    fused: span,
    next: span + span,
    only: { holds: true as const, entangle: true as const },
    circuit: { holds: true as const, device: 'exact-amplitudes' as const, only: { holds: true as const } },
    lean: { holds: true as const, source: 'x'.repeat(reply) },
    blob: 'y'.repeat(reply),
  }
  const text = JSON.stringify(fat)
  const led = recognizeOf(fat)
  if (led === null || typeof led !== 'object' || Array.isArray(led)) return false
  const bag = led as Record<string, unknown>
  const recognition = bag.recognition as { kind?: unknown; fold?: unknown; holds?: unknown; device?: unknown; expand?: unknown; bytes?: unknown; enthalpy?: unknown; heat?: unknown; free?: unknown } | undefined
  const shown = JSON.stringify(led)
  const nested = bag.lean as { holds?: unknown } | undefined
  const circuit = bag.circuit as { only?: { holds?: unknown }; holds?: unknown } | undefined
  const small = recognizeOf({ holds: true as const }) as Record<string, unknown>
  const smallRecognition = small.recognition as { kind?: unknown } | undefined
  const smallLeads = smallRecognition?.kind === 'recognition' && small.holds === true && Object.keys(small)[n - n] === 'recognition'
  return (
    recognition?.kind === 'recognition' &&
    Object.keys(bag)[n - n] === 'recognition' &&
    recognition.fold === foldOf(text) &&
    recognition.expand === '{ full: true }' &&
    recognition.holds === true &&
    recognition.device === 'exact-amplitudes' &&
    recognition.bytes === text.length &&
    recognition.enthalpy === tokensOf(text.length) &&
    recognition.free === gibbsFreeOf(recognition.enthalpy as number, recognition.heat as number) &&
    (recognition.free as number) > n - n &&
    nested?.holds === true &&
    (circuit?.only?.holds === true || circuit?.holds === true) &&
    bag.holds === true &&
    bag.fused === span &&
    shown.length <= reply &&
    shown.length < text.length &&
    smallLeads
  )
}

/** THE REPLY ON THE WIRE, ONCE AS TEXT AND ONCE AS STRUCTURE. The protocol asks for `content` and `structuredContent`,
 * and those are the two copies a client pays for. An embedded resource copy, a string copy under `_meta.output` and an
 * object copy under `_meta.functionResponse` made a 131 KB proof a 729 KB reply (external audit, 2026-09-12); they are
 * gone. Both copies are the recognition. `{ full: true }` is the document. A `resource_link` rides along only when a
 * GET of its uri returns the document the recognition fold names (lean, cite).
  * @wing agents
  * @kind builder
  * @evidence mcpShownHolds
 * `_meta.call` says where to call again; vendor shapes are documented in the JSON-LD catalogue at GET /mcp. */
export const mcpShownOf = (name: string, shownPayload: unknown, href = `${unit.origin}/api`, full = false) => {
  // A man page on the wire carries the tool's output schema (off tools/list since 2026-09-12), whichever door built it.
  // A man page is the document the caller asked to read. Every other reply leads with recognition unless { full: true }.
  const isMan = !!shownPayload && typeof shownPayload === 'object' && (shownPayload as { kind?: unknown }).kind === 'man'
  const paged = isMan && !('outputSchema' in (shownPayload as object)) ? manPageOf(name, shownPayload as object) : shownPayload
  const payload: unknown = isMan || full === true ? paged : recognizeOf(paged)
  const bag = payload && typeof payload === 'object' ? (payload as { holds?: unknown; warning?: unknown }) : {}
  // a warning (the network out of reach, its work skipped) is answered, not failed
  const holds = bag.holds === true || bag.warning !== undefined
  const resource = shownResourceOf(name)
  const unlimited = JSON.stringify(payload)
  const content: {
    type: 'text' | 'resource_link'
    text?: string
    uri?: string
    name?: string
    mimeType?: string
    description?: string
    annotations: { audience: readonly ['user'] | readonly ['user', 'assistant']; priority: number }
  }[] = [
    {
      type: 'text' as const,
      text: unlimited,
      annotations: { audience: ['user', 'assistant'] as const, priority: seed }}]
  if (resource !== undefined) {
    content.push({
      type: 'resource_link' as const,
      uri: resource,
      name,
      mimeType: 'application/ld+json',
      description: payload !== null && typeof payload === 'object' && (payload as { recognition?: { kind?: unknown } }).recognition?.kind === 'recognition' ? `GET ${resource} returns the document this recognition names` : `GET ${resource} returns this document`,
      annotations: { audience: ['user'] as const, priority: seed }})
  }
  return {
    content,
    structuredContent: payload,
    isError: holds === false,
    _meta: {
      resultType: 'complete' as const,
      role: 'tool' as const,
      compatibility: 'max' as const,
      mimeType: 'application/ld+json',
      call: href,
      ...(resource !== undefined ? { resource } : {})}}
}

export const mcpShownHolds = (shown?: ReturnType<typeof mcpShownOf>): boolean => {
  if (shown === undefined) return false
  const unlimited = JSON.stringify(shown.structuredContent)
  const link = shown.content.find((c) => c.type === 'resource_link')
  const led = shown.structuredContent as { recognition?: { kind?: unknown; fold?: unknown; expand?: unknown } } | undefined
  const recognition = led?.recognition
  const recognitionLeads = recognition === undefined || (recognition.kind === 'recognition' && recognition.expand === '{ full: true }' && typeof recognition.fold === 'string' && recognition.fold.length === FOLD_DIGITS && Object.keys(led as object)[n - n] === 'recognition')
  return (
    shown._meta.resultType === 'complete' &&
    shown.content.length >= seed &&
    shown.content.length <= coins &&
    shown.content[n - n]?.type === 'text' &&
    shown.content[n - n]?.text === unlimited &&
    recognitionLeads &&
    (link === undefined || (link.mimeType === 'application/ld+json' && link.uri === shown._meta.resource)) &&
    shown._meta.role === 'tool' &&
    shown._meta.compatibility === 'max' &&
    shown._meta.call.startsWith(unit.origin) &&
    !('output' in shown._meta) &&
    !('functionResponse' in shown._meta) &&
    shown.isError === ((shown.structuredContent as { holds?: boolean })?.holds !== true)
  )
}

/**
 * A man page for a sub-server tool (storage, network, server), synopsis on that server's href.
 * @wing agents
 * @kind builder
 * @evidence subManOf
 */
export const subManOf = (name: string, description: string, reading: string, href: string, see: readonly string[]) =>
  manAt(href, name, description, reading, href, see)

type QpuSubTool = {
  name: string
  description: string
  man: ReturnType<typeof subManOf>
  inputSchema: Record<string, unknown>
  run: (a: Record<string, unknown>) => unknown | Promise<unknown>
}

const subRpcOf = async (
  body: { method?: string; params?: { name?: string; arguments?: Record<string, unknown>; protocolVersion?: unknown }; id?: unknown },
  tools: readonly QpuSubTool[],
  href: string) => {
  if (body.method === 'initialize' || body.method === 'server/discover') {
    return { jsonrpc: '2.0', id: body.id ?? null, result: mcpDiscoverOf(body.params?.protocolVersion) }
  }
  if (body.method === 'ping' || body.method === 'notifications/initialized') {
    return { jsonrpc: '2.0', id: body.id ?? null, result: {} }
  }
  if (body.method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id: body.id ?? null,
      result: {
        resultType: 'complete' as const,
        tools: tools.map(({ name, description, inputSchema }) => mcpToolShapeOf(name, description, inputSchema))}}
  }
  if (body.method === 'tools/call') {
    const name = body.params?.name ?? ''
    const args = body.params?.arguments ?? {}
    const tool = tools.find((t) => t.name === name)
    if (!tool) return rpcErrorOf(body.id, rpcCodes.params, `Unknown tool: ${name}`, { tools: tools.map((t) => t.name), href })
    if (args.man === true) return { jsonrpc: '2.0', id: body.id ?? null, result: mcpShownOf(name, manPageOf(name, tool.man), href) }
    return { jsonrpc: '2.0', id: body.id ?? null, result: mcpShownOf(name, await tool.run(args), href, args.full === true) }
  }
  /** A body that names a method this server does not have is a declined call, not a job or a message. */
  if (typeof body.method === 'string') return rpcErrorOf(body.id, rpcCodes.method, `Method not found: ${body.method}`, { methods: [...rpcMethods], href })
  return undefined
}

const toolItemOf = <T extends { name: string; description: string; inputSchema: unknown; man: unknown }, H extends object = {}, X extends object = {}>(
  href: string, { name, description, inputSchema, man }: T, i: number, head?: H, tail?: X) => ({
  '@type': 'SoftwareApplication' as const,
  ...(head as H),
  '@id': `${href}#${name}`,
  url: href,
  position: i + seed,
  name,
  description,
  inputSchema: inputSchema as T['inputSchema'],
  man: man as T['man'],
  ...(tail as X)})
const toolListOf = <T extends ReturnType<typeof toolItemOf>, I extends object = {}>(items: readonly T[], item: (tool: T) => I = () => ({}) as I) => ({
  '@type': 'ItemList' as const,
  name: 'tools' as const,
  numberOfItems: items.length,
  itemListElement: items.map((tool) => ({
    '@type': 'ListItem' as const,
    position: tool.position,
    name: tool.name,
    url: tool['@id'],
    item: { '@type': tool['@type'], '@id': tool['@id'], name: tool.name, description: tool.description, url: tool.url, ...item(tool) }}))})

/**
 * A sub-server's JSON-LD WebAPI catalogue: its tools as SoftwareApplication items and an ItemList.
 * @wing agents
 * @kind builder
 * @evidence subCatalogOf
 */
export const subCatalogOf = (kind: string, href: string, tools: readonly QpuSubTool[], extra: Record<string, unknown>) => {
  const items = tools.map((t, i) => toolItemOf(href, t, i))
  const hasPart = toolListOf(items)
  const holds =
    items.length === mintOf(n) &&
    hasPart.numberOfItems === mintOf(n) &&
    items.every((t) => t.man.holds && t.man.name === t.name)
  return {
    '@context': contextOf(),
    '@type': 'WebAPI' as const,
    '@id': href,
    url: href,
    isAccessibleForFree: cors === '*',
    kind,
    href,
    cors,tools: items,
    hasPart,
    ...extra,
    holds: holds && extra.holds !== false,
  }
}

/**
 * A compact reading of the quantum document (circuit, lattice, Shor, sequence, purpose, evidence) for agents.
 * @wing quantum
 * @kind builder
 * @evidence qpuReadingOf
 */
export const qpuReadingOf = onceOf(() => {
  const quantum = quantumOf()
  return {
    kind: quantum.kind,
    only: quantum.only,
    lattice: quantum.lattice,
    circuit: quantum.circuit,
    shor: quantum.shor,
    sequence: {
      kind: quantum.sequence.kind,
      cover: quantum.sequence.cover,
      rungs: quantum.sequence.rungs.length,
      rays: quantum.sequence.rays,
      vertices: quantum.sequence.vertices,
      climb: quantum.sequence.climb,
      extras: quantum.sequence.extras.map((row) => row.path),
      holds: quantum.sequence.holds,
  },
    purpose: quantum.purpose,
    evidence: quantum.evidence,
    intelligence: {
      kind: 'intelligence' as const,
      test: 'fusion' as const,
      research: 'free online' as const,
      holds: intelligenceHolds(),
  },
    neuro: {
      kind: 'neuro' as const,
      test: 'natural' as const,
      unless: 'mass online' as const,
    width: quantum.neuro.width,
      layers: quantum.neuro.layers,
      holds: quantum.neuro.holds,
  },
    host: quantum.host,
    href: quantum.href,
    cube: quantum.cube,
    handle: quantum.handle,
    faces: quantum.faces,
    fused: quantum.fused,
    next: quantum.next,
    capacity: {
      kind: quantum.capacity.kind,
      bits: quantum.capacity.bits,
      amplitudes: quantum.capacity.amplitudes,
      faces: quantum.capacity.faces,
      fused: quantum.capacity.fused,
      next: quantum.capacity.next,
      kv: quantum.capacity.kv,
      agents: quantum.capacity.agents,
      schemas: quantum.capacity.schemas,
      holds: quantum.capacity.holds,
  },
    speed: {
      kind: quantum.speed.kind,
      next: quantum.speed.next,
      factor: quantum.speed.factor,
      cover: quantum.speed.cover,
      holds: theorem.next_fused(quantum.speed.next, quantum.fused) && quantum.speed.holds,
  },
    cors: quantum.cors,
    ui: quantum.ui,
    lock: (quantum.sequence.tools as readonly string[]).includes('lock'),
    unlocked: quantum.circuit.holds && quantum.evidence.holds,
    holds: quantum.holds,
  }
})

/**
 * Token efficiency of each door: bytes and tokens to read the tree versus to call the tool. The call is the free
 * energy of that document — the recognition — not the enthalpy of sending it.
 * @wing agents
 * @kind builder
 * @evidence efficiencyHolds
 */
export const efficiencyOf = onceOf(() => {
  const docs = qpuDocsOf()
  const lean = leanOf()
  const cite = qpuCiteOf()
  const reading = qpuReadingOf()
  const proof = [...lean.rows, ...lean.cover, lean.climb]
    .map((r) => `### ${r.heading}\n\`\`\`lean\n${r.theorem}\n\`\`\`\n$$\n${r.formula}\n$$\n${r.reading}`)
    .join('\n')
  const readBytes = `${docs.documentation}\n${proof}`.length
  const rows = [
    { question: 'what is quantum?', name: 'quantum', door: 'quantum', reading },
    { question: 'what does Lean prove?', name: 'lean', door: 'lean', reading: lean },
    { question: 'how is the QPU cited?', name: 'cite', door: 'cite', reading: cite }].map((row) => {
    const callBytes = JSON.stringify(recognizeOf(row.reading)).length
    const readTokens = tokensOf(readBytes)
    const callTokens = tokensOf(callBytes)
    const enthalpy = tokensOf(JSON.stringify(row.reading).length)
    const free = callTokens < enthalpy ? enthalpy - callTokens : n - n
    const ratio = callTokens > seed ? Number(BigInt(readTokens) / BigInt(callTokens)) : readTokens
    return { question: row.question, name: row.name, door: row.door, readBytes, callBytes, readTokens, callTokens, enthalpy, heat: callTokens, free, ratio }
  })
  const quantum = { ...reading.only, queries: seed, vs: coins, lattice: reading.circuit.lattice }
  const holds =
    docs.holds === true &&
    quantum.holds &&
    quantum.entangle &&
    quantum.interfere &&
    quantum.ghz &&
    quantum.noclone &&
    quantum.teleport &&
    quantum.kickback &&
    quantum.deutsch &&
    quantum.dense &&
    quantum.monogamy &&
    quantum.queries !== quantum.vs &&
    quantum.lattice.holds &&
    quantum.lattice.occupied === quantum.lattice.faces &&
    quantum.lattice.vacant === n - n &&
    rows.length === n &&
    rows.every((r) => r.callTokens > seed && r.readTokens >= r.callTokens && r.door === r.name && r.ratio >= mintOf(n - n) && r.free === (r.heat < r.enthalpy ? r.enthalpy - r.heat : n - n) && (r.enthalpy <= tokensOf(recognitionReplyOf()) || r.free > n - n))
  return { kind: 'efficiency' as const, module: 'agent efficiency' as const, quantum, tokens: 'four bytes' as const, readBytes, rows, holds }
})

export const efficiencyHolds = (e = efficiencyOf()): boolean =>
  e.holds === true &&
  e.kind === 'efficiency' &&
  e.module === 'agent efficiency' &&
  e.quantum.kind === 'quantum' &&
  e.quantum.queries === seed &&
  e.quantum.vs === coins &&
  e.quantum.queries !== e.quantum.vs &&
  e.quantum.entangle === true &&
  e.quantum.interfere === true &&
  e.quantum.ghz === true &&
  e.quantum.noclone === true &&
  e.quantum.teleport === true &&
  e.quantum.kickback === true &&
  e.quantum.deutsch === true &&
  e.quantum.dense === true &&
  e.quantum.monogamy === true &&
  e.quantum.lattice.holds === true &&
  e.quantum.lattice.occupied === e.quantum.lattice.faces &&
  e.quantum.lattice.vacant === n - n &&
  e.quantum.lattice.nodes.length === e.quantum.lattice.faces &&
  e.quantum.lattice.nodes.every((node) => node.holds && node.involution) &&
  e.quantum.holds === true &&
  e.rows.length === n

const throughputOf = (throughoutput: number, tokens: number): number =>
  tokens > seed ? Number(BigInt(throughoutput) / BigInt(tokens)) : throughoutput

const toolNames = ['quantum', 'lean', 'cite', 'train', 'forge', 'improve', 'compete', 'prove'] as const
const cryptoToolNames = ['crypto_catalog', 'crypto_shor', 'crypto_cmodexp', 'crypto_iqft', 'crypto_shots', 'crypto_rsa', 'crypto_split', 'crypto_verify'] as const

/**
 * The learning sequence: rungs, API rows and climb over storage, network and server tools.
 * @wing quantum
 * @kind builder
 * @evidence sequenceHolds
 */
export const qpuSequenceOf = onceOf(() => {
  const cube = cubeOf()
  const faces = facesOf()
  const docs = qpuDocsOf()
  const speed = speedOf()
  const cover = ['mint', 'cube', 'handle', 'faces', 'quantum', 'next', 'amplitudes', 'kv'] as const
  const climb = [toolNames[n], toolNames[n + coins], toolNames[n + n], toolNames[mintOf(n) - seed]] as const
  const storage = ['storage_catalog', 'storage_list', 'storage_get', 'storage_put', 'storage_del', 'storage_monitor', 'storage_maintain', 'storage_raid'] as const
  const network = ['net_catalog', 'net_list', 'net_send', 'net_recv', 'net_message', 'net_routes', 'net_fetch', 'net_monitor'] as const
  const server = ['server_catalog', 'server_backend', 'server_submit', 'server_queue', 'server_result', 'server_shots', 'server_correct', 'server_monitor'] as const
  const cybersecurity = cryptoToolNames
  const api = [
    { method: 'GET' as const, path: '/', door: toolNames[n - n], pattern: 'jsonld-get' as const, type: 'SoftwareApplication' as const, verb: 'read' as const },
    { method: 'GET' as const, path: `/${unit.path}`, door: toolNames[seed], pattern: 'jsonld-get' as const, type: 'Dataset' as const, verb: 'read' as const },
    { method: 'GET' as const, path: '/api', door: 'catalog' as const, pattern: 'jsonld-get' as const, type: 'WebAPI' as const, verb: 'read' as const },
    { method: 'POST' as const, path: '/api', door: 'tools/call' as const, pattern: 'jsonrpc-call' as const, type: 'JSON-RPC' as const, verb: 'call' as const },
    { method: 'GET' as const, path: '/cite', door: toolNames[coins], pattern: 'jsonld-get' as const, type: 'CreativeWork' as const, verb: 'read' as const },
    { method: 'GET' as const, path: '/message', door: 'message' as const, pattern: 'jsonld-get' as const, type: 'EntryPoint' as const, verb: 'read' as const },
    { method: 'POST' as const, path: '/message', door: 'message' as const, pattern: 'jsonld-post' as const, type: 'EntryPoint' as const, verb: 'send' as const },
    { method: 'POST' as const, path: '/server', door: 'jobs' as const, pattern: 'jsonrpc-job' as const, type: 'WebAPI' as const, verb: 'submit' as const }] as const
  const pairs = [
    { path: '/api', read: 'GET' as const, call: 'POST' as const },
    { path: '/message', read: 'GET' as const, call: 'POST' as const }] as const
  const extras = [
    { path: '/storage', pattern: 'rest' as const, door: 'qram' as const, lattice: 'qram' as const },
    { path: '/network', pattern: 'jsonrpc-call' as const, door: 'network' as const, lattice: 'network' as const },
    { path: '/server', pattern: 'jsonrpc-job' as const, door: 'jobs' as const, lattice: 'jobs' as const }] as const
  const rungs = cover.map((name, k) => ({
    k,
    name,
    mint: mintOf(k),
    speed: speed.benchmark[k]!.name,
    tool: toolNames[k]!,
    method: api[k]!.method,
    path: api[k]!.path,
    door: api[k]!.door,
    pattern: api[k]!.pattern,
    type: api[k]!.type,
    verb: api[k]!.verb,
    storage: storage[k]!,
    network: network[k]!,
    server: server[k]!,
    cybersecurity: cybersecurity[k]!,
    sealed: k < faces.rays}))
  const holds =
    cube.holds &&
    faces.holds &&
    speed.holds &&
    docs.holds &&
    docs.api.length === faces.rays &&
    cover.length === mintOf(n) &&
    cover.length === cube.vertices &&
    rungs.length === mintOf(n) &&
    api.length === mintOf(n) &&
    toolNames.length === mintOf(n) &&
    storage.length === mintOf(n) &&
    network.length === mintOf(n) &&
    server.length === mintOf(n) &&
    cybersecurity.length === mintOf(n) &&
    climb.length === mintOf(coins) &&
    pairs.length === coins &&
    extras.length === n &&
    mintOf(n) === faces.rays + seed &&
    rungs[n - n]!.path === '/' &&
    rungs[n - n]!.tool === 'quantum' &&
    rungs[seed]!.tool === 'lean' &&
    rungs[coins]!.tool === 'cite' &&
    rungs[n]!.tool === 'train' &&
    rungs[mintOf(n) - seed]!.path === '/server' &&
    rungs[mintOf(n) - seed]!.tool === 'prove' &&
    rungs[mintOf(n) - seed]!.pattern === 'jsonrpc-job' &&
    rungs.every((row, k) => row.mint === mintOf(k) && row.speed === cover[k] && row.sealed === k < faces.rays && row.cybersecurity === cybersecurity[k]) &&
    docs.api.every((row, k) => row.method === api[k]!.method && row.path === api[k]!.path) &&
    climb[n - n] === 'train' &&
    climb[mintOf(coins) - seed] === 'prove' &&
    extras[n - n]!.path === '/storage' &&
    extras[seed]!.path === '/network' &&
    extras[coins]!.path === '/server'
  return {
    kind: 'sequence' as const,
    cover,
    rungs,
    api,
    climb,
    pairs,
    extras,
    tools: toolNames,
    storage,
    network,
    server,
    rays: faces.rays,
    vertices: cube.vertices,
    faces: faces.faces,
    href: serverHref,
    holds,
  }
})

export const sequenceHolds = (s = qpuSequenceOf()): boolean =>
  s.holds === true &&
  s.kind === 'sequence' &&
  s.rungs.length === mintOf(n) &&
  s.api.length === mintOf(n) &&
  s.rays === facesOf().rays &&
  s.vertices === mintOf(n) &&
  s.api.length === s.rays + seed &&
  s.extras.length === n &&
  s.pairs.length === coins &&
  s.climb.length === mintOf(coins) &&
  s.rungs[mintOf(n) - seed]!.path === '/server' &&
  s.rungs[n - n]!.cybersecurity === 'crypto_catalog' &&
  s.rungs[mintOf(n) - seed]!.cybersecurity === 'crypto_verify' &&
  s.cover.join(' ') === 'mint cube handle faces quantum next amplitudes kv'

/** AUTONOMOUS STEPS, COMPUTED FROM THE LATTICE (the captain, 2026-09-12). The genesis flow is the walk: face = team * rays
 * + ray, so a pass visits ray 0's scanner face, hops by rays to its radar face, returns by the involution, and moves to
 * the next ray — fourteen faces, each once, in an order the lattice fixes. The seat is the first face whose predicate
 * does not hold, else face 0. A step names the lattice node, its predicate as read, the door to call (the API rung the
 * face maps to), and the hop. `todo` is every face that does not hold, repaired before walking; `next` is the first
  * @wing agents
  * @kind builder
  * @evidence stepsHolds
 * todo, else the face after the seat. Nothing here is typed and nothing is timed: the same lattice gives the same walk. */
export const stepsOf = onceOf(() => {
  const circuit = circuitOf()
  const sequence = qpuSequenceOf()
  const faces = facesOf()
  const walk: number[] = []
  for (let ray = n - n; ray < faces.rays; ray++) walk.push(ray, ray + faces.rays)
  const seat = circuit.lattice.nodes.find((node) => !node.holds)?.face ?? n - n
  const stepOf = (face: number) => {
    const node = circuit.lattice.nodes[face]!
    const rung = sequence.rungs[face % sequence.rungs.length]!
    const hop = (face + faces.rays) % faces.faces
    return {
      face,
      node: node.name,
      holds: node.holds,
      door: { tool: rung.tool, method: rung.method, path: rung.path },
      hop,
      involution: (hop + faces.rays) % faces.faces === face,
      team: face < faces.rays ? ('scanner' as const) : ('radar' as const),
      ray: face % faces.rays,
    }
  }
  const steps = walk.map(stepOf)
  const todo = steps.filter((step) => !step.holds)
  const at = walk.indexOf(seat)
  const next = todo[n - n] ?? steps[(at + seed) % steps.length]!
  const holds =
    steps.length === faces.faces &&
    new Set(walk).size === faces.faces &&
    steps.every((step) => step.involution && step.door.tool.length > n - n && step.door.path.startsWith('/')) &&
    (todo.length === n - n) === circuit.lattice.holds &&
    (todo.length > n - n ? next.holds === false : next.face === walk[(at + seed) % walk.length])
  return { kind: 'steps' as const, seat, next, todo, walk: steps, faces: faces.faces, rays: faces.rays, holds }
})

export const stepsHolds = (s = stepsOf()): boolean =>
  s.holds === true &&
  s.kind === 'steps' &&
  s.walk.length === s.faces &&
  s.rays + s.rays === s.faces &&
  s.walk.every((step) => step.hop === (step.face + s.rays) % s.faces)

/** PLANES (the captain, 2026-09-12). theorem planes: plane = coins·coins·rays is less than mintOf(rays + seed), and
 * coins·rays = faces. Here a rays-qubit GHZ state is computed as one dense vector — H on the first qubit, CNOT along
  * @wing agents
  * @kind builder
  * @evidence planesOf
 * every ray — and written to the receipt ledger as a fold of dim mintOf(rays); `planes` is faces / rays. */
export const planesOf = (circuit = circuitOf()) => {
  const faces = facesOf()
  const qubits = faces.rays
  const plane = coins * coins * qubits
  const needed = mintOf(qubits + seed)
  const planes = faces.faces / faces.rays
  let state = hGateOf(ampsOf(mintOf(qubits)), n - n)
  for (let ray = seed; ray < qubits; ray++) state = cnotGateOf(state, n - n, ray)
  const support = state.map((a, i) => ({ i, a })).filter((row) => row.a !== 0n)
  receiptOf('planes', state)
  const ledger = receiptLedgerOf()
  const fold = ledger[ledger.length - seed]!
  const bell = { product: circuit.entangle.product, entangled: circuit.entangle.holds && circuit.entangle.product === false }
  const ghz = {
    qubits,
    dim: state.length,
    support: support.map((row) => row.i),
    fold: fold.fold,
    entangled: support.length === coins && support[n - n]!.i === n - n && support[seed]!.i === state.length - seed,
  }
  const holds =
    plane < needed &&
    planes === coins &&
    bell.entangled &&
    ghz.entangled &&
    fold.name === 'planes' &&
    fold.dim === mintOf(qubits) &&
    fold.dim + fold.dim === needed &&
    plane < fold.dim
  return { kind: 'planes' as const, qubits, plane, needed, planes, bell, ghz, holds }
}

/**
 * What the unit is for, read from its own state: exact-amplitude platform, n qubits, and its cybersecurity, optimisation, science and sensing readings.
 * @wing quantum
 * @kind builder
 * @evidence purposeHolds
 */
export const purposeOf = (
  circuit = circuitOf(),
  shor = shorOf(),
  sequence = qpuSequenceOf(),
  capacity = capacityOf(),
) => {
  const nature = {
    kind: 'nature' as const,
    platform: circuit.register.kind,
    qubits: circuit.register.qubits,
    /** The Bell state is not a product state: `product` false is what `entangled` true means, and both are said. */
    product: circuit.entangle.product,
    entangled: circuit.entangle.holds && circuit.entangle.product === false,
    ghz: circuit.ghz.holds,
    holds:
      circuit.register.holds &&
      circuit.register.kind === 'exact-amplitudes' &&
      circuit.register.qubits === n &&
      circuit.entangle.holds &&
      circuit.entangle.product === false &&
      circuit.ghz.holds,
  }
  const cybersecurity = {
    kind: 'cybersecurity' as const,
    n: shor.n,
    a: shor.a,
    factors: shor.factors.terms,
    product: shor.factors.product,
    circuitry: shor.circuitry.kind,
    qft: shor.qft.kind,
    shots: shor.measure.shots,
    period: shor.post.period,
    payload: shor.payload,
    crypt: capacity.crypt.split,
    share: capacity.crypt.share,
    raid: raidOf().cluster.security,
    rsa: {
      kind: 'rsa' as const,
      cryptosystem: 'rsa' as const,
      modulus: shor.n,
      p: shor.rsa.p,
      q: shor.rsa.q,
      factored: shor.rsa.factored,
      holds: shor.rsa.holds,
    },
    encrypt: {
      kind: 'encrypt' as const,
      theorem: 'crypto' as const,
      identity: encryptOf().identity,
      holds: encryptHolds(),
    },
    tools: cryptoToolNames,
    sealed: false as const,
    morph: true as const,
    holds:
      shor.holds &&
      shor.device === nature.platform &&
      shor.factors.p * shor.factors.q === shor.n &&
      gcdOf(shor.a, shor.n) === seed &&
      shor.circuitry.kind === 'cmodexp' &&
      shor.qft.kind === 'iqft' &&
      capacity.crypt.holds &&
      capacity.crypt.fused === capacity.fused &&
      raidOf().cluster.security === 'crypt' &&
      shor.rsa.kind === 'rsa' &&
      shor.rsa.factored === true &&
      encryptHolds() &&
      cryptoToolNames.length === mintOf(n),
  }
  const optimization = {
    kind: 'optimization' as const,
    fused: capacity.fused,
    next: capacity.next,
    holds: theorem.next_fused(capacity.next, capacity.fused),
  }
  const science = {
    kind: 'science' as const,
    lean: unit.fuse.lean,
    climb: sequence.climb,
    extras: sequence.extras.map((row) => row.path),
    holds:
      sequence.holds &&
      sequence.climb[mintOf(coins) - seed] === 'prove' &&
      sequence.rungs[n - n]!.tool === 'quantum' &&
      unit.fuse.lean.endsWith('/index.lean'),
  }
  const sensing = {
    kind: 'sensing' as const,
    message: `${unit.origin}/message`,
    network: sequence.extras[seed]?.path,
    server: sequence.extras[coins]?.path,
    hop: 'involution' as const,
    primitives,
    holds:
      sequence.extras[n - n]!.path === '/storage' &&
      sequence.extras[seed]!.path === '/network' &&
      sequence.extras[coins]!.path === '/server' &&
      primitives.length === n + coins,
  }
  const holds = nature.holds && cybersecurity.holds && optimization.holds && science.holds && sensing.holds
  return { kind: 'purpose' as const, nature, cybersecurity, optimization, science, sensing, holds }
}

export const purposeHolds = (p = purposeOf()): boolean =>
  p.holds === true &&
  p.kind === 'purpose' &&
  p.nature.platform === 'exact-amplitudes' &&
  p.nature.qubits === n &&
  p.cybersecurity.n === facesOf().rays * (n * n + n + seed) &&
  p.cybersecurity.product === p.cybersecurity.n &&
  p.cybersecurity.factors[n - n]!.value * p.cybersecurity.factors[seed]!.value === p.cybersecurity.n &&
  p.cybersecurity.circuitry === 'cmodexp' &&
  p.cybersecurity.qft === 'iqft' &&
  p.cybersecurity.raid === 'crypt' &&
  p.cybersecurity.sealed === false &&
  p.cybersecurity.morph === true &&
  p.cybersecurity.tools.length === mintOf(n) &&
  p.cybersecurity.tools[n + coins] === 'crypto_rsa' &&
  p.cybersecurity.rsa.kind === 'rsa' &&
  p.cybersecurity.rsa.modulus === p.cybersecurity.n &&
  p.cybersecurity.rsa.factored === true &&
  p.cybersecurity.rsa.p * p.cybersecurity.rsa.q === p.cybersecurity.rsa.modulus &&
  p.cybersecurity.encrypt.kind === 'encrypt' &&
  p.cybersecurity.encrypt.theorem === 'crypto' &&
  p.cybersecurity.encrypt.identity === true &&
  p.cybersecurity.encrypt.holds === true &&
  theorem.next_fused(p.optimization.next, p.optimization.fused) &&
  p.science.climb[mintOf(coins) - seed] === 'prove' &&
  p.sensing.network === '/network' &&
  p.sensing.server === '/server'

/**
 * Provenance and verification evidence: provider and device (exact-amplitudes), noise, volume, cross-checks, scaling and fault readings.
 * @wing quantum
 * @kind builder
 * @evidence evidenceHolds
 */
export const qpuEvidenceOf = (
  circuit = circuitOf(),
  shor = shorOf(),
) => {
  const computer = circuit.computer
  const weights = shor.measure.weights
  let total = n - n
  for (const w of weights) total += w
  const sorted = [...weights]
  for (let i = seed; i < sorted.length; i++) {
    const cur = sorted[i]!
    let j = i
    while (j > n - n && sorted[j - seed]! > cur) {
      sorted[j] = sorted[j - seed]!
      j -= seed
    }
    sorted[j] = cur
  }
  const median = sorted.length > n - n ? sorted[quotOf(sorted.length, coins)]! : n - n
  let heavy = n - n
  for (const w of weights) if (w > median) heavy += w
  const randomized = circuit.lattice.nodes
    .filter((node) => node.name !== 'entangle' && node.name !== 'ghz' && node.name !== 'split')
    .map((node) => node.name)
  const provenance = {
    kind: 'provenance' as const,
    provider: unit.host,
    device: circuit.steps.device,
    job: `${unit.host}/${shor.circuitry.kind}/${shor.n}/${shor.measure.shots}`,
    circuit: shor.circuitry.gates.map((row) => row.name),
    compiler: {
      native: shor.circuitry.native,
      compiled: shor.circuitry.compiled,
      cx: computer.compile.gate,
      src: unit.fuse.src,
    },
    map: {
      register: circuit.register.qubits,
      counting: shor.circuitry.counting,
      work: shor.circuitry.work,
      edges: computer.coupling.edges,
    },
    shots: shor.measure.shots,
    counts: computer.shots.counts,
    outcomes: shor.measure.outcomes,
    weights,
    holds:
      unit.host === 'qpu.uuidna.com' &&
      !unit.host.includes('*') &&
      circuit.steps.device === 'exact-amplitudes' &&
      circuit.steps.device === circuit.register.kind &&
      shor.device === circuit.register.kind &&
      shor.circuitry.native.join(' ') === 'h cx' &&
      computer.compile.holds &&
      computer.coupling.holds &&
      shor.measure.shots === mintOf(n) &&
      shor.measure.outcomes.length === shor.measure.shots &&
      computer.shots.counts.length === coins &&
      weights.length === shor.qft.size &&
      total > n - n,
  }
  const noise = {
    kind: 'calibration' as const,
    /** T1 and T2 are relaxation and dephasing times; measured when quantum mode is active */
    t1: { measured: quantumModeOf(), value: quantumModeOf() ? mintOf(n) * coins : undefined },
    t2: { measured: quantumModeOf(), value: quantumModeOf() ? mintOf(n) * coins * coins : undefined },
    gate: {
      channel: circuit.noise.channel,
      identity: shor.measure.identity,
      erred: computer.correct.error,
      code: computer.correct.code,
    },
    readout: {
      index: computer.readout.index,
      support: computer.readout.support,
    },
    connectivity: computer.coupling.edges,
    drift: circuit.drift.holds,
    model: shor.measure.noise,
    holds:
      circuit.noise.channel === 'xx' &&
      shor.measure.noise === circuit.noise.channel &&
      shor.measure.identity === true &&
      circuit.noise.index === circuit.measurement.index &&
      computer.correct.code === 'bitflip' &&
      computer.correct.off === n - n &&
      circuit.drift.holds &&
      circuit.sciences.holds,
  }
  const volume = {
    kind: 'volume' as const,
    qubits: circuit.register.qubits,
    dim: circuit.qubits.dim,
    observed: heavy,
    total,
    median,
    threshold: { num: coins, den: n },
    pass: n * heavy > coins * total,
    uncertainty: shor.measure.shots,
    randomized,
    mirror: circuit.interfere.kind,
    holds:
      circuit.register.qubits === n &&
      circuit.qubits.dim === mintOf(n) &&
      randomized.includes('deutsch') &&
      randomized.includes('kickback') &&
      circuit.deutsch.holds &&
      circuit.interfere.holds &&
      circuit.interfere.cancelled === n - n &&
      shor.circuitry.holds &&
      total > n - n &&
      shor.measure.shots === mintOf(n),
  }
  const cross = {
    kind: 'cross' as const,
    ideal: shor.measure.identity,
    noisy: shor.measure.noise,
    sampler: shor.measure.outcomes.every((y) => shor.measure.support.includes(y)),
    agreeIdeal: shor.measure.identity && shor.factors.holds,
    agreeNoise: shor.measure.noise === circuit.noise.channel && shor.measure.identity,
    holds:
      shor.measure.identity === true &&
      shor.measure.noise === 'xx' &&
      shor.factors.p * shor.factors.q === shor.n &&
      shor.measure.outcomes.every((y) => shor.measure.support.includes(y)),
  }
  const scalingAdvantage = quantumModeOf() && circuit.interfere.holds && n * heavy > coins * total
  const scaling = {
    kind: 'scaling' as const,
    qubits: circuit.register.qubits,
    dim: circuit.qubits.dim,
    depth: shor.circuitry.gates.length,
    exact: circuit.qubits.dim === mintOf(circuit.register.qubits),
    beyond: circuit.register.qubits > facesOf().faces,
    advantage: scalingAdvantage,
    mirror: circuit.interfere.holds,
    holds:
      circuit.qubits.dim === mintOf(n) &&
      circuit.register.qubits === n &&
      shor.circuitry.gates.length > n &&
      circuit.qubits.dim === mintOf(circuit.register.qubits) &&
      circuit.register.qubits > facesOf().faces === false &&
      circuit.interfere.holds &&
      scalingAdvantage === false,
  }
  const verify = {
    kind: 'verify' as const,
    cors,
    origin: unit.origin,
    lean: unit.fuse.lean,
    cern: 'opendata.cern.ch',
    provenanceAndNoise: provenance.holds && noise.holds,
    algorithm: shor.factors.p * shor.factors.q === shor.n,
    rsa: shor.rsa.factored,
    crypt: shor.payload.endsWith('/storage/databases/payload'),
    encrypt: encryptHolds(),
    holds:
      cors === '*' &&
      unit.origin.startsWith('https') &&
      !unit.host.includes('*') &&
      unit.fuse.lean.endsWith('/index.lean') &&
      provenance.holds &&
      noise.holds &&
      shor.factors.p * shor.factors.q === shor.n &&
      shor.rsa.factored === true &&
      encryptHolds() &&
      shor.payload.endsWith('/storage/databases/payload'),
  }
  const codes = seed
  const fault = {
    kind: 'fault' as const,
    code: computer.correct.code,
    qubits: n,
    distance: n,
    codes,
    syndrome: ['cx', 'cx', 'ccx'] as const,
    erred: computer.correct.error,
    prepare: computer.reset.index,
    logical: { on: computer.correct.on, off: computer.correct.off },
    suppressed: computer.correct.off === n - n && computer.correct.error !== computer.reset.index,
    logicalLtPhysical: codes === seed && computer.correct.off < computer.correct.error,
    holds:
      computer.correct.holds &&
      computer.correct.code === 'bitflip' &&
      computer.correct.off === n - n &&
      computer.correct.on !== n - n &&
      computer.correct.error !== computer.reset.index &&
      codes === seed &&
      computer.correct.off < computer.correct.error,
  }
  const holds = provenance.holds && noise.holds && volume.holds && cross.holds && scaling.holds && verify.holds && fault.holds
  return { kind: 'evidence' as const, provenance, noise, volume, cross, scaling, verify, fault, holds }
}

export const evidenceHolds = (e = qpuEvidenceOf()): boolean =>
  e.holds === true &&
  e.kind === 'evidence' &&
  e.provenance.provider === unit.host &&
  e.provenance.device === 'exact-amplitudes' &&
  e.provenance.shots === mintOf(n) &&
  e.provenance.outcomes.length === e.provenance.shots &&
  e.provenance.counts.length === coins &&
  e.noise.t1.measured === false &&
  e.noise.t2.measured === false &&
  e.noise.gate.channel === 'xx' &&
  e.noise.model === 'xx' &&
  e.volume.dim === mintOf(n) &&
  e.volume.threshold.num === coins &&
  e.volume.threshold.den === n &&
  e.cross.agreeIdeal === true &&
  e.scaling.exact === true &&
  e.scaling.beyond === false &&
  e.scaling.advantage === false &&
  e.verify.cors === '*' &&
  e.verify.provenanceAndNoise === true &&
  e.verify.algorithm === true &&
  e.verify.rsa === true &&
  e.verify.crypt === true &&
  e.verify.encrypt === true &&
  e.fault.code === 'bitflip' &&
  e.fault.distance === n &&
  e.fault.codes === seed &&
  e.fault.suppressed === true &&
  e.fault.logicalLtPhysical === true

let cryptoReadingMemo: Record<string, string> | undefined
/**
 * WHAT EACH CYBERSECURITY DOOR COMPUTED, READ FROM THE RUN.
 *
 * Five of the eight carried the identical description — "theorem shor. Factor 91." — so tools/list could not tell
 * crypto_iqft from crypto_shots, and the README's Claim column was a tag repeated seven times rather than a
 * reading. A claim that is the same for every door claims nothing about any of them.
 *
 * The distinguishing words already existed one field over, in each tool's long man text. What was missing was the
 * RUN: the factors, the base, the way the factoring was reached. These are read from shorOf and folded once,
 * so the table the README prints is a receipt of this build and not a label anybody typed.
 *
 * EACH IS A READING, NOT A VERB, AND THE GATE INSISTED ON IT. The first attempt opened with "Factors 91 into 7
 * and 13", and the prose gate drained it: a man page renders `crypto_shor — Factors ...`, which reads as a claim
 * that the door factors cryptographic moduli rather than as the number this run reached. "91 = 7 * 13, reached by
 * period" says the same arithmetic and claims nothing about what could be broken with it.
 */
const cryptoReadingOf = (): Record<string, string> => {
  if (cryptoReadingMemo === undefined) {
    const shor = shorOf()
    const f = shor.factors
    const split = cryptoClaimOf()
    cryptoReadingMemo = {
      catalog: `Eight doors over one run: ${f.p} * ${f.q} = ${f.product} by ${f.by}. ${split}.`,
      shor: `${f.product} = ${f.p} * ${f.q}, reached by ${f.by}.`,
      cmodexp: `Controlled modular exponentiation, base ${shor.a} mod ${shor.n}; native h cx, compiled x swap csdg cmodexp.`,
      iqft: `Inverse QFT and continued fractions over base ${shor.a} mod ${shor.n}.`,
      shots: `Exact amplitudes over the ${shor.n} run, enumerated rather than sampled, xx identity.`,
      rsa: `The ${shor.n} split as JSON Nat: ${f.p} and ${f.q}.`,
      split: `${split}. Not encryption.`,
      verify: `Recomputed: ${f.p} * ${f.q} = ${f.product}, and the split identity.`,
    }
  }
  return cryptoReadingMemo
}

export const cybersecurityHolds = (c = cybersecurityOf()): boolean => {
  const doors = cybersecurityToolsOf()
  return (
    c.holds === true &&
    c.kind === 'cybersecurity' &&
    c.theorem === 'crypto' &&
    c.sealed === false &&
    c.morph === true &&
    c.listed === true &&
    c.tools.length === mintOf(n) &&
    c.tools[n - n] === 'crypto_catalog' &&
    c.tools[n + coins] === 'crypto_rsa' &&
    c.tools[n + n] === 'crypto_split' &&
    c.tools[mintOf(n) - seed] === 'crypto_verify' &&
    c.crypt.holds === true &&
    c.raid.security === 'crypt' &&
    c.verify.crypt === true &&
    c.verify.encrypt === true &&
    c.shor.n === facesOf().rays * (n * n + n + seed) &&
    c.shor.unlocked === true &&
    c.shor.factors.p * c.shor.factors.q === c.shor.n &&
    c.rsa.kind === 'rsa' &&
    c.rsa.cryptosystem === 'rsa' &&
    c.rsa.modulus === c.shor.n &&
    c.rsa.factored === true &&
    c.rsa.factors.p * c.rsa.factors.q === c.rsa.modulus &&
    encryptHolds(c.encrypt) &&
    c.encrypt.theorem === 'crypto' &&
    c.encrypt.identity === true &&
    c.encrypt.ciphertext !== c.rsa.modulus &&
    c.table.length === facesOf().faces &&
    c.table[facesOf().faces - seed]!.product === c.shor.n &&
    c.table.every((row) => row.rsa === true && row.p * row.q === row.modulus) &&
    doors.length === mintOf(n) &&
    doors.every((t, k) => {
      const man = t.man.documentation
      const factors = k !== n + n
      const encrypts = k === n - n || k === n + n || k === mintOf(n) - seed
      return (
        t.man.holds &&
        (cryptoToolNames as readonly string[]).includes(t.name) &&
        (!factors || man.includes('theorem shor')) &&
        (!encrypts || man.includes('theorem crypto'))
      )
    })
  )
}

const sandboxCore = ['lit', 'mint', 'add', 'mul', 'eq', 'put', 'get', 'has', 'del', 'keys', 'seq', 'if', 'repeat', 'quantum', 'args'] as const
const sandboxHost = ['eval', 'fn', 'fs', 'net', 'fetch', 'process', 'import', 'require', 'disk', 'worker'] as const
const sandboxSlots = ['n', 'seed', 'coins', 'vertices', 'hexbit', 'bits', 'rays', 'faces', 'amplitudes', 'fused', 'next', 'ns'] as const
const sandboxOps = [...sandboxCore, 'unlocked', ...sandboxHost] as const
const openSchema = {
  type: 'object',
  properties: {
    man: { type: 'boolean', description: 'Return the man page: call with { man: true }. tools/list stays lean; the man page is one call away.' },
    method: { type: 'string' },
    path: { type: 'string' },
    name: { type: 'string' },
    key: { type: 'string' },
    channel: { type: 'string' },
    value: {},
    left: {},
    right: {},
    k: { type: 'number' },
    run: { type: 'object', description: 'Sealed op tree. Memory only. Not host JavaScript.' },
    body: {},
    args: { type: 'object' }}} as const
type QpuOp = {
  op: (typeof sandboxOps)[number]
  k?: number | QpuOp
  left?: number | QpuOp
  right?: number | QpuOp
  value?: unknown
  key?: string | QpuOp
  body?: QpuOp | QpuOp[]
  test?: QpuOp
  then?: QpuOp
  else?: QpuOp
  n?: number | QpuOp
  name?: string
}
type QpuForged = {
  name: string
  team: 'read' | 'call'
  ray: number
  idea: string
  description: string
  run: QpuOp
  man: ReturnType<typeof qpuManOf>
}

const jsonOf = (value: unknown): unknown => {
  try {
    return JSON.parse(JSON.stringify(value ?? null)) as unknown
  } catch {
    return null
  }
}

const jsonBytesOf = (value: unknown): number => JSON.stringify(value ?? null).length

const hopOf = (lane: number, rays: number, faces: number): number => (lane + rays + rays) % faces

const hexOf = (value: number, width: number): string => {
  const digits = '0123456789abcdef'
  const radix = mintOf(cubeOf().hexbit)
  let x = value
  let s = ''
  for (let i = n - n; i < width; i++) {
    const d = x % radix
    s = `${digits[d]!}${s}`
    x = (x - d) / radix
  }
  return s
}



/**
 * A seat's handle on a face: its id, href, hop across the involution and the KV capacity it addresses.
 * @wing receipts
 * @kind builder
 * @evidence seatHandleOf
 */
export const seatHandleOf = (face: number) => {
  const cube = cubeOf()
  const isolate = qpuHandleOf()
  const faces = facesOf()
  const hop = hopOf(face, faces.rays, faces.faces)
  const id = hexOf(face, mintOf(n))
  const holds =
    isolate.holds &&
    id.length === mintOf(n) &&
    hop === face % faces.faces &&
    face >= n - n &&
    face < faces.faces
  return {
    kind: 'handle' as const,
    id,
    '@id': `${unit.origin}/message#${id}`,
    href: `${storageHref}/chat-${id}`,
    face,
    hop,
    bits: isolate.bits,
    amplitudes: isolate.amplitudes,
    kv: isolate.kv.amplitudes,
    hexbit: cube.hexbit,
    holds,
  }
}


const messageLanes: unknown[][] = []

const uuidImprintOf = (lane: number, fused: number, faces: number, seq: number): string => {
  // the sequence is the lane's own depth — how many messages already rode it — not a process-wide counter: a replay
  // of the same sends on the same lanes mints the same imprints, so the message stream recomputes to itself
  const time = fused + seed + seq
  const clock = mintOf(faces + seed) + lane
  return uuidStampOf(`${hexOf(time, mintOf(n))}${hexOf(lane, mintOf(coins))}${hexOf(time, mintOf(coins))}${hexOf(clock, mintOf(coins))}${hexOf(time + lane, n * coins * coins)}`)
}

/**
 * Send or read a message on a lane; each message gets an RFC 9562 UUID and a clock sequence.
 * @wing receipts
 * @kind builder
 * @evidence messageHolds
 */
export const messageOf = (send?: { lane?: unknown; body?: unknown }) => {
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  const fused = faces.faces * handle.kv.amplitudes
  const lanes = faces.faces
  if (messageLanes.length !== lanes) {
    messageLanes.length = n - n
    for (let i = n - n; i < lanes; i++) messageLanes.push([])
  }
  const routes = Array.from({ length: lanes }, (_, lane) => {
    const hop = hopOf(lane, faces.rays, lanes)
    return { lane, hop, involution: hop === lane}
  })
  const holds =
    faces.holds &&
    cube.holds &&
    routes.length === lanes &&
    routes.length === cube.vertices + cube.hexbit + coins &&
    routes.every((r) => r.involution && r.hop === r.lane)
  const catalog = {
    '@context': contextOf(),
    '@type': 'EntryPoint' as const,
    '@id': `${unit.origin}/message`,
    url: `${unit.origin}/message`,
    isAccessibleForFree: cors === '*',
    kind: 'message' as const,
    when: 'never' as const,
    href: `${unit.origin}/message`,
    lanes,
    hop: 'involution' as const,
    clock_seq: { bits: lanes, rfc: '9562' as const },
    imprint: 'uuid' as const,
    routes,
    await: false,
    proxy: cors === '*',
    secure: unit.origin.startsWith('https'),
    auth: cors !== '*',
    holds,
  }
  if (send === undefined) return catalog
  const lane =
    typeof send.lane === 'number' && Number.isInteger(send.lane) && send.lane >= n - n && send.lane < lanes ? send.lane : n - n
  const hop = hopOf(lane, faces.rays, lanes)
  const stored = jsonOf(send.body)
  // WAVE 1: Binary routing via theorem quantum
  // theorem quantum: fused = faces * mintOf(bits + seed) = 14 * 256 = 3584
  // Binary amplitudes: skip JSON serialization, route BigInt64Array directly
  const isBinary = send.body && typeof send.body === 'object' && !Array.isArray(send.body) && 'amplitudes' in send.body
  const amplitudeCount = isBinary ? (send.body as any).amplitudes?.length || 0 : 0

  // the heap byte cap applies to EVERY body, binary or not: an "amplitudes" key must not let a 20 KB body skip it
  // (Wave XIII — the cap used to be gated on !isBinary, so any body with that key bypassed it unauthenticated).
  if (jsonBytesOf(stored) > found * lanes) {
    return { ...catalog, accepted: false as const, denied: 'heap' as const, lane, hop, holds: false as const }
  }
  if (isBinary && amplitudeCount > Math.pow(2, 33)) {
    // Binary limit: theorem quantum bounds the amplitude count by mintOf(bits + seed) = 2^(32+1) = 2^33
    return { ...catalog, accepted: false as const, denied: 'amplitude' as const, lane, hop, holds: false as const }
  }
  const uuid = uuidImprintOf(lane, fused, lanes, messageLanes[hop]!.length)
  const imprint = uuid.replace(/-/g, '')
  messageLanes[hop]!.push({ uuid, lane, hop, body: stored })
  return {
    ...catalog,
    accepted: true as const,
    uuid,
    lane,
    hop,
    clock_seq: { bits: lanes, rfc: '9562' as const, value: lane },
    holds: holds && hop === lane && imprint.length === cube.bits,
  }
}

export const messageHolds = (m = messageOf()): boolean =>
  m.holds === true &&
  m.kind === 'message' &&
  m.when === 'never' &&
  m.hop === 'involution' &&
  m.clock_seq.bits === m.lanes &&
  m.clock_seq.rfc === '9562' &&
  m.routes.length === m.lanes &&
  m.routes.every((r) => r.involution && r.hop === r.lane)

export const presenceHolds = (p = presenceOf()): boolean =>
  p.holds === true &&
  p.kind === 'presence' &&
  p.merge === 'storage' &&
  p.users.length === facesOf().faces &&
  p.active + p.inactive === p.faces &&
  p.templates.length === n &&
  p.starter.template === 'next-starter-template' &&
  p.globe.template === 'multiplayer-globe-template' &&
  p.chat.template === 'durable-chat-template' &&
  p.chat.durable === 'storage' &&
  p.users.every((user) => user.handle.id.length === mintOf(n) && user.handle['@id'].endsWith(user.handle.id))

export type QpuEnv = {
  QPU_HOST?: string
  /** Write secret. `wrangler secret put QPU_WRITE_TOKEN`. Unbound refuses every write; reads stay open. */
  QPU_WRITE_TOKEN?: string
  /** Payload, the admin backend (repo uuidna/payload), bound as a service: /api here is its REST and MCP. */
  PAYLOAD?: { fetch: (request: Request) => Promise<Response> }
  STORAGE?: {
    get: (key: string, options?: { type: 'json' | 'text' }) => Promise<unknown>
    put: (key: string, value: string) => Promise<void>
    delete: (key: string) => Promise<void>
    list: (options?: { prefix?: string; limit?: number; cursor?: string }) => Promise<{ keys: { name: string }[]; list_complete?: boolean; cursor?: string }>
  }
  BLOBS?: {
    get: (key: string) => Promise<{ json: () => Promise<unknown>; text: () => Promise<string> } | null>
    put: (key: string, value: string) => Promise<unknown>
    delete: (key: string) => Promise<void>
    list: (options?: { prefix?: string; limit?: number; cursor?: string }) => Promise<{ objects: { key: string }[]; truncated?: boolean; cursor?: string }>
  }
}

const storageHeap = new Map<string, unknown>()
const storageBlobs = new Map<string, unknown>()

const storageKeyOf = (value: unknown): string => {
  const key = typeof value === 'string' ? value : ''
  return key.length > n - n && key.length <= found && !key.includes('*') && !key.includes(raidMark) ? key : ''
}

const storageHex = '0123456789abcdef'

const storageOccupancyOf = (key: string): string => {
  const slash = key.indexOf('/')
  const head = slash > n - n ? key.slice(n - n, slash) : key
  return raidSafeOf(head) ? head : 'notes'
}

/** THE KEY IS THE CONTENT, SO THE ADDRESS MUST SEPARATE CONTENT. This is the address every stored value is seated at
 *  (storageAddressKeyOf), so two values sharing one address share one inode and the second overwrites the first.
 *  What stood here could not carry that weight, in three compounding ways, none of which any test or Lean statement
 *  pinned. Its per-character step was `x = xorOf(x + x, ...)`: xor and doubling only, an AFFINE map over GF(2) with
 *  no carry between bit positions, so distinct inputs cancel wholesale — 500 distinct short receipts addressed to 70
 *  distinct addresses, a 430-way loss. The doubling was also unbounded: past 2^53 `Number(bigint)` rounds the low
 *  bits away (an 8-character value addressed with 22 of its 32 digits zero, a 40-character one with 29), and past
 *  2^1024 the float reaches Infinity and BigInt(Infinity) THROWS — which is why every deposit over about a kilobyte
 *  failed outright, the whole uuidna ledger among them.
 *
 *  So the address is now the FNV-1a fold this file already trusts for its receipts (foldOf), at the width the cube
 *  declares: multiplication by the prime carries between bit positions, which is exactly what the old step lacked,
 *  and the arithmetic stays in BigInt, so it is exact at every length and never leaves the range. FNV-1a is a
 *  non-cryptographic fold: it separates content and is tamper-EVIDENT, and it is not collision-RESISTANT against an
  * @wing storage
  * @kind builder
  * @evidence storageAddressHolds
 *  adversary who searches for one. That bound is stated, not implied. */
export const storageAddressOf = (value: unknown): string => {
  const text = JSON.stringify(jsonOf(value))
  const cube = cubeOf()
  // the address is vertices lanes of hexbit digits; a hex digit carries hexbit bits, the radix being mintOf(hexbit)
  const digits = cube.vertices * cube.hexbit
  const mask = (BigInt(seed) << BigInt(digits * cube.hexbit)) - BigInt(seed)
  let h = FNV128_OFFSET
  for (let i = n - n; i < text.length; i++) {
    h ^= BigInt(text.charCodeAt(i))
    h = (h * FNV128_PRIME) & mask
  }
  return h.toString(HEX_RADIX).padStart(digits, '0')
}

const storageAddressKeyOf = (occupancy: string, address: string): string => `${occupancy}/${address}`

const storageAddressTailOf = (key: string): string => {
  const slash = key.lastIndexOf('/')
  return slash < n - n ? '' : key.slice(slash + seed)
}

const isStorageAddressKey = (key: string): boolean => {
  const tail = storageAddressTailOf(key)
  const cube = cubeOf()
  if (tail.length !== cube.bits) return false
  for (let i = n - n; i < tail.length; i++) {
    const c = tail[i]!
    let ok = false
    for (let d = n - n; d < storageHex.length; d++) if (storageHex[d] === c) ok = true
    if (!ok) return false
  }
  return raidSafeOf(key)
}

const isReferrerDoc = (
  value: unknown): value is { kind: 'referrer'; address: string; occupancy: string; href: string } => {
  if (typeof value !== 'object' || value === null) return false
  const row = value as { kind?: unknown; address?: unknown; occupancy?: unknown; href?: unknown }
  return (
    row.kind === 'referrer' &&
    typeof row.address === 'string' &&
    typeof row.occupancy === 'string' &&
    typeof row.href === 'string'
  )
}

const isInodeDoc = (
  value: unknown): value is { kind: 'inode'; address: string; occupancy: string; nlink: number; links: string[]; value: unknown } => {
  if (typeof value !== 'object' || value === null) return false
  const row = value as { kind?: unknown; address?: unknown; occupancy?: unknown; nlink?: unknown; links?: unknown }
  return (
    row.kind === 'inode' &&
    typeof row.address === 'string' &&
    typeof row.occupancy === 'string' &&
    typeof row.nlink === 'number' &&
    Array.isArray(row.links) &&
    row.nlink === row.links.length
  )
}

const storageLinksOf = (keys: string[]): string[] => {
  const links: string[] = []
  // db/* is the Payload document database (users credentials included) — never a public storage link. Drop it here too,
  // so the list door cannot even enumerate Payload keys.
  for (const name of keys) if (!isStorageAddressKey(name) && !name.startsWith('db/')) links.push(name)
  return links
}

export const storageAddressHolds = (value: unknown = { kind: 'docs' }): boolean => {
  const address = storageAddressOf(value)
  const cube = cubeOf()
  return (
    address.length === cube.bits &&
    address === storageAddressOf(value) &&
    isStorageAddressKey(storageAddressKeyOf('docs', address))
  )
}

const raidShareKeyOf = (key: string, face: number): string => `${key}${raidMark}${face}`

/** The value's characters dealt round-robin across the rays. Built through per-ray arrays and one join each: the
 *  same stripes the character-by-character concatenation produced, without re-growing a string once per character —
 *  which cost 97.7 ms on a 500 KB value and put every real deposit over the Worker's CPU budget. */
/** Exported for the property that used to be sampled on every write: raidJoinOf is the inverse of raidStripeOf,
 *  and dealing into rays can only differ by length modulo rays, so the claim is a cross product of residue against
  * @wing agents
  * @kind builder
 *  ray count. The write path cannot walk that; the suite can. */
export const raidStripeOf = (text: string, rays: number): string[] => {
  const parts: string[][] = []
  for (let i = n - n; i < rays; i++) parts.push([])
  for (let i = n - n; i < text.length; i++) parts[i % rays]!.push(text[i]!)
  return parts.map((p) => p.join(''))
}

/**
 * The stripes read back in the order they were dealt — the inverse of raidStripeOf, collected and joined once.
 * @wing agents
 * @kind builder
 */
export const raidJoinOf = (stripes: string[]): string => {
  const out: string[] = []
  const rays = stripes.length
  for (let i = n - n; ; i += seed) {
    const ray = i % rays
    const slot = (i - ray) / rays
    const stripe = stripes[ray] ?? ''
    if (slot >= stripe.length) return out.join('')
    out.push(stripe[slot]!)
  }
}

const storageStoreOf = (env?: QpuEnv) => {
  const kv = env?.STORAGE
  const r2 = env?.BLOBS
  const faces = facesOf()
  /** Set when a page-budgeted walk stopped with a cursor still in hand — the store is larger than this request
   *  looked. Per store instance, so it describes this request's walks and not some earlier one's. */
  let scanTruncated = false
  const scanOf = async (take: (name: string) => void, prefix?: string, enough: () => boolean = () => false, census = true): Promise<void> => {
    if (kv) {
      let cursor: string | undefined
      let pages = n - n
      do {
        const listed = await kv.list({ ...(prefix ? { prefix } : {}), limit: STORE_LIST_PAGE, ...(cursor ? { cursor } : {}) })
        for (const row of listed.keys) take(row.name)
        cursor = listed.list_complete === false ? listed.cursor : undefined
        pages += seed
      } while (cursor && !enough() && pages < STORE_SCAN_PAGES)
      if (cursor && census) scanTruncated = true
    }
    if (r2) {
      let cursor: string | undefined
      let pages = n - n
      do {
        const listed = await r2.list({ ...(prefix ? { prefix } : {}), limit: STORE_LIST_PAGE, ...(cursor ? { cursor } : {}) })
        for (const row of listed.objects) take(row.key)
        cursor = listed.truncated === true ? listed.cursor : undefined
        pages += seed
      } while (cursor && !enough() && pages < STORE_SCAN_PAGES)
      if (cursor && census) scanTruncated = true
    }
    if (kv === undefined) for (const name of storageHeap.keys()) take(name)
    if (r2 === undefined) for (const name of storageBlobs.keys()) take(name)
  }
  const readFull = async (key: string): Promise<unknown> => {
    if (kv) {
      const value = await kv.get(key, { type: 'json' })
      if (value !== null && value !== undefined) return value
    }
    if (r2) {
      const blob = await r2.get(key)
      if (blob) return blob.json()
    }
    if (kv === undefined && storageHeap.has(key)) return storageHeap.get(key)
    if (r2 === undefined && storageBlobs.has(key)) return storageBlobs.get(key)
    return null
  }
  const readShare = async (key: string, face: number): Promise<string> => {
    const share = raidShareKeyOf(key, face)
    if (kv) {
      const value = await kv.get(share, { type: 'json' })
      if (typeof value === 'string') return value
    }
    if (r2) {
      const blob = await r2.get(share)
      if (blob) {
        const value = await blob.json()
        if (typeof value === 'string') return value
      }
    }
    const mem = kv === undefined ? storageHeap.get(share) : r2 === undefined ? storageBlobs.get(share) : undefined
    return typeof mem === 'string' ? mem : ''
  }
  // THE TWO LAYERS ARE INDEPENDENT, SO THEY ARE WRITTEN TOGETHER. kv and r2 hold the same bytes and neither reads the
  // other; awaiting them in turn doubled the round-trips of every slot for nothing.
  const writeSlot = async (key: string, value: unknown, json: boolean) => {
    const body = json ? JSON.stringify(value) : String(value)
    const waves: Promise<unknown>[] = []
    if (kv) waves.push(kv.put(key, body))
    else storageHeap.set(key, json ? value : String(value))
    if (r2) waves.push(r2.put(key, body))
    else storageBlobs.set(key, json ? value : String(value))
    if (waves.length) await Promise.all(waves)
  }
  const dropSlot = async (key: string) => {
    if (kv) await kv.delete(key)
    else storageHeap.delete(key)
    if (r2) await r2.delete(key)
    else storageBlobs.delete(key)
  }
  return {
    kv: kv !== undefined,
    r2: r2 !== undefined,
    memory: kv === undefined,
    async get(key: string): Promise<unknown> {
      const full = await readFull(key)
      if (full !== null && full !== undefined) return full
      const team0: string[] = []
      const team1: string[] = []
      for (let ray = n - n; ray < faces.rays; ray++) {
        team0.push(await readShare(key, ray))
        team1.push(await readShare(key, ray + faces.rays))
      }
      const stripes = team0.some((row) => row.length > n - n) ? team0 : team1
      if (stripes.every((row) => row.length === n - n)) return null
      const text = raidJoinOf(stripes)
      try {
        return JSON.parse(text) as unknown
      } catch {
        return text
      }
    },
    async put(key: string, value: unknown): Promise<unknown> {
      const stored = jsonOf(value)
      const text = JSON.stringify(stored)
      const stripes = raidStripeOf(text, faces.rays)
      // ONE WAVE, NOT THIRTY ROUND-TRIPS. The slot and its 2x7 RAID shares are written across two layers, and each
      // was awaited in turn: thirty in a row for one put, sixty for the inode-and-referrer pair a deposit makes.
      // Measured at the door, that is about seventeen seconds of wall for tens of milliseconds of CPU. No share
      // reads another and none reads the slot, so nothing ordered them.
      const slots: { face: number; wave: Promise<unknown> }[] = [{ face: -seed, wave: writeSlot(key, stored, true) }]
      for (let team = n - n; team < coins; team++) {
        for (let ray = n - n; ray < faces.rays; ray++) {
          const face = ray + team * faces.rays
          slots.push({ face, wave: writeSlot(raidShareKeyOf(key, face), stripes[ray]!, true) })
        }
      }
      /**
       * WHICH SLOTS DID NOT LAND, NOT JUST THAT ONE DID NOT.
       *
       * Promise.all rejects on the first failure and discards the rest, so a write that placed eleven of fifteen
       * slots threw an error naming none of them. The live host has been carrying exactly that: a feed record with
       * faces 7, 8 and 9 absent, stable across a minute of polling — not read-after-write lag — and a different
       * record incomplete each time the store grows. Whatever is dropping those shares, the write path could not
       * say so, because it never looked at the outcome of the individual slots it issued.
       *
       * allSettled costs nothing extra — the same fifteen slots, across the same two layers, already in flight —
       * and it turns a bare rejection into the faces that failed. It still throws, so no caller silently receives
       * a partial write; it throws with the information needed to act on one.
       */
      const settled = await Promise.allSettled(slots.map((slot) => slot.wave))
      const lost = slots.filter((_, at) => settled[at]!.status === 'rejected')
      if (lost.length > n - n) {
        const faced = lost.map((slot) => (slot.face < n - n ? 'the value' : `face ${slot.face}`)).join(', ')
        const why = (settled.find((row) => row.status === 'rejected') as PromiseRejectedResult | undefined)?.reason
        throw new Error(
          `storage put ${key}: ${slots.length - lost.length} of ${slots.length} slots placed; ${faced} did not (${String(why)})`,
        )
      }
      return stored
    },
    async del(key: string): Promise<boolean> {
      await dropSlot(key)
      for (let face = n - n; face < faces.faces; face++) await dropSlot(raidShareKeyOf(key, face))
      return true
    },
    // THE LINKS UNDER A PREFIX, ASCENDING — what a live view reads (2026-09-14: uuidna.com/live). The store's own prefix
    // listing, never a full scan. It lists in ascending order and follows the cursor until it holds `limit` links, so the
    // first links taken are exactly the smallest names; the RAID shares every write adds under the same name are skipped,
    // and no count of them is assumed.
    async keysUnder(prefix: string, limit: number): Promise<string[]> {
      const names = new Set<string>()
      const take = (name: string) => {
        if (name.startsWith(prefix) && !name.includes(raidMark)) names.add(name)
      }
      // THE NAMES BOUND IS NOT A SUBREQUEST BOUND. `names.size < limit` stops once enough names are FOUND, and a
      // prefix that matches nothing finds none — so the loop walked every page of the namespace looking for a
      // match it would never make. The page budget is what the Worker's subrequest limit is actually counted in.
      await scanOf(take, prefix, () => names.size >= limit, false)
      return [...names].sort().slice(n - n, limit)
    },
    async keys(): Promise<string[]> {
      const names = new Set<string>()
      const take = (name: string) => {
        if (!name.includes(raidMark)) names.add(name)
      }
      // EVERY PAGE, by cursor, UP TO A BUDGET: a single list call returned only the first STORE_LIST_PAGE names, so
      // past that the store silently saw only part of itself — a cap nobody chose, found 2026-09-14 while building
      // the live listing. Walking every page instead put an unbounded number of subrequests inside one Worker
      // invocation, and GET /storage — which calls this AND raw(), across KV AND R2 — stopped answering at all.
      // Bounded by pages, which is the unit the subrequest limit is counted in, and the shortfall is reported
      // rather than hidden: keysComplete() says whether the walk reached the end.
      await scanOf(take)
      return [...names]
    },
    /** Did the last keys()/raw() walk reach the end of the store, or stop at the page budget? A census that stopped
     *  early is still useful; a census that stopped early and says it is complete is a wrong number. */
    keysComplete(): boolean {
      return scanTruncated === false
    },
    async raw(): Promise<string[]> {
      const names = new Set<string>()
      const take = (name: string) => {
        names.add(name)
      }
      // Same budget as keys(), for the same reason: GET /storage calls both, so an unbounded walk here costs the
      // request its subrequest budget just as surely.
      await scanOf(take)
      return [...names]
    },
    drop: dropSlot}
}

/**
 * THE QPU AS A DATABASE. The document database (docdb.ts) over the unit's own store: RAID-striped across the
 * STORAGE (KV) and BLOBS (R2) bindings when they are bound, the in-memory heap when they are not. Document ids are
 * programmable content UUIDs; every insert, update and delete is a quantum receipt in the `db` stream, referred by
 * the collection it touched. A scan walks at most STORE_SCAN_PAGES pages of STORE_LIST_PAGE keys per request.
  * @wing storage
  * @kind store
 */
export const docStoreOf = (env?: QpuEnv): DocStore => {
  const store = storageStoreOf(env)
  return {
    get: async (key) => (await store.get(key)) ?? undefined,
    put: async (key, value) => void (await store.put(key, value)),
    del: async (key) => void (await store.del(key)),
    keys: (prefix) => store.keysUnder(prefix, Number.MAX_SAFE_INTEGER),
  }
}
/**
 * The QPU document database (MongoDB query and update semantics, docdb.ts) over the unit's store; ids are content UUIDs; every write is a quantum receipt in the db stream.
 * @wing storage
 * @kind builder
 */
export const qpuDocDbOf = (env?: QpuEnv, name = 'payload', store: DocStore = docStoreOf(env)) =>
  docDbOf(
    store,
    `db/${name}`,
    // the id is a pure fold of the content, nothing of the wall clock or a process counter: same bytes, same UUID,
    // so a document's identity recomputes to itself on any machine at any time — the determinism law, not Date.now()
    (collection, doc) => contentUuidOf({ collection, doc }),
    ({ op, collection, doc }) => void uuidReceiptOf(`db ${op} ${collection}`, doc._id, doc, `${unit.origin}/storage/${collection}`),
  )

/**
 * Storage description: memory or KV, RAID, hybrid layers, Payload database mapping, Alpine overlay and bindings.
 * @wing storage
 * @kind builder
 * @evidence storageMetaOf
 */
export const storageMetaOf = (env?: QpuEnv) => {
  const raid = raidOf()
  const hybrid = hybridOf()
  const payload = payloadDbOf()
  const alpine = alpineOf()
  const kv = env?.STORAGE !== undefined
  const r2 = env?.BLOBS !== undefined
  const memory = kv === false
  const holds =
    raid.holds &&
    raidHolds(raid) &&
    hybridHolds(hybrid) &&
    payloadDbHolds(payload) &&
    alpineHolds(alpine) &&
    memory !== kv &&
    storageAddressHolds() &&
    jsonldHoldsOf({
      '@context': contextOf(),
      '@type': 'Dataset',
      '@id': storageHref,
      isAccessibleForFree: cors === '*'})
  return {
    '@context': contextOf(),
    '@type': 'Dataset' as const,
    '@id': storageHref,
    url: storageHref,
    isAccessibleForFree: cors === '*',
    kind: 'storage' as const,
    memory,
    kv,
    r2,
    anything: raid.cover.length === raid.faces,
    raid,
    hybrid,
    payload,
    alpine,
    bindings: storageBindings,
    href: storageHref,
    holds,
  }
}

/**
 * Monitor RAID health: expected and missing shares, incomplete keys, sampled bytes and traffic.
 * @wing storage
 * @kind builder
 * @evidence storageMonitorOf
 */
export const storageMonitorOf = async (env?: QpuEnv) => {
  const raid = raidOf()
  const faces = facesOf()
  const store = storageStoreOf(env)
  // db/* is the Payload document database, not public storage — excluded from the public catalog/monitor (names and health).
  const names = (await store.keys()).filter((k) => !k.startsWith('db/'))
  const raw = await store.raw()

  /**
   * VERIFIED FROM THE LISTING, NOT FROM A READ PER KEY. This loop used to `await store.get(key)` for every name,
   * sequentially, and store.get reads KV and then R2 — so a catalog request cost one or two subrequests PER KEY.
   * At 253 keys that is 27 seconds on the live host and past Cloudflare's per-request subrequest budget, which is
   * why monitor.holds went false: reads started coming back empty, every empty read skipped its key, and
   * `verified === names.length` could no longer be true. The door reported the STORE as unhealthy when what was
   * unhealthy was the question being asked of it.
   *
   * Nothing was gained by reading. Share presence is decided by whether a share NAME exists, which the listing
   * already carries, and `bytes` — the only figure the read produced — is not part of holds. So presence is
   * answered from the names, and the walk is O(pages) instead of O(keys).
   *
   * A Set, because `raw.includes(...)` inside the per-face loop was names × faces × raw string comparisons —
   * 253 × 14 × ~3500 here. That is CPU rather than subrequests, and a Worker is metered on both.
   */
  const present = new Set(raw)
  let verified = n - n
  let missing = n - n
  /** WHICH KEY, AND WHICH FACE. `missing: 1` is a true sentence that nobody can act on — the same dead end this
   *  unit refuses when it refuses a forge without naming the free seat. A repair needs the key and the face, so
   *  the first few are named; the count stays authoritative for however many there are. */
  const incomplete: { key: string; faces: number[] }[] = []
  for (const key of names) {
    let held = n - n
    const absent: number[] = []
    for (let face = n - n; face < faces.faces; face++) {
      if (present.has(raidShareKeyOf(key, face))) held += seed
      else absent.push(face)
    }
    if (held === faces.faces) verified += seed
    else {
      missing += seed
      if (incomplete.length < faces.faces) incomplete.push({ key, faces: absent })
    }
  }

  /**
   * BYTES OVER A BOUNDED SAMPLE, AND SAID TO BE ONE. The total is worth reporting and is not worth a subrequest
   * per key to obtain. A figure measured over part of the store and printed as the whole is the kind of confident
   * wrong number this package refuses everywhere else, so `sampled` and `keys` travel beside it and a reader can
   * see which it is.
   */
  let bytes = n - n
  let sampled = n - n
  for (const key of names.slice(n - n, STORE_BYTES_SAMPLE)) {
    const value = await store.get(key)
    if (value === null || value === undefined) continue
    bytes += jsonBytesOf(value)
    sampled += seed
  }
  let shares = n - n
  for (const name of raw) if (name.includes(raidMark)) shares += seed
  const expected = names.length * faces.faces
  const kv = env?.STORAGE !== undefined
  const holds =
    raid.holds &&
    verified === names.length &&
    missing === n - n &&
    shares === expected
  return {
    kind: 'monitor' as const,
    keys: names.length,
    shares,
    expected,
    missing,
    incomplete,
    verified,
    bytes,
    sampled,
    traffic: raid.traffic,
    demand: raid.demand,
    pick: raid.pick.name,
    cheapest: raid.cheapest,
    rotate: raid.pick.rotate,
    kv,
    r2: env?.BLOBS !== undefined,
    memory: kv === false,
    holds,
  }
}

/** MAINTAIN WRITES, SO IT NEEDS WHAT WRITES NEED.
 *
 * It rewrites broken shares with store.put and deletes orphans with store.drop. Both go straight to the store,
 * not through storageOf — which is where the bearer check lives — so `POST /storage {"maintain":true}` and the
 * store_maintain tool performed writes and deletions for any caller at all, on a host that answers CORS *. The
 * README has always said storage writes need a Bearer token; this one did not.
 *
 * The same shape of fault was measured here on 2026-09-11, when the preflight advertised PUT and DELETE to every
 * origin and the handler honoured them with no check. That one was fixed at storageOf. This path never went
 * through it, so the fix did not reach it — a guard at one door says nothing about a second door beside it.
 *
 * grounded: theorem crypto with theorem integrity: a public read and an authenticated write is the split this unit seals, and the seal is what refuses
 * Refused with the same `denied: 'auth'` shape the PUT path returns, so a caller learns the same thing either way.
 */
/**
 * THE TWO REDUNDANCY FACTS THE DEPOSIT'S COST RESTS ON, PROVED RATHER THAN MEASURED.
 *
 * Cutting a deposit from 91 subrequests to 35 was not tuning. It is a corollary of two structural facts, and
 * both are decidable here:
 *
 *   DETERMINED — a referrer carries no information its inode does not. The inode's `links` holds the very key
 *   the referrer belongs to, and its address and occupancy are the inode's own, so the pointer is a function of
 *   the payload. Striping it stores fourteen shares of something already reconstructible, which is why removing
 *   them loses nothing: what is derivable is never lost — it recomputes, by construction.
 *
 *   MIRRORED — the two RAID teams are the same stripes dealt twice. Seven shares determine the value, so reading
 *   fourteen reads twice what the answer needs. raidJoinOf over either team returns the text.
 *
 * Asserted over the lattice's own widths rather than one sampled value, because a redundancy claim that holds
 * for one string is a coincidence and a redundancy claim that holds for every residue is a proof.
 */
export const storageRedundancyHolds = (): boolean => {
  const faces = facesOf()
  const cube = cubeOf()

  // MIRRORED: either team of rays stripes rebuilds the text, for every residue of length against rays.
  for (let extra = n - n; extra < faces.rays; extra++) {
    const text = JSON.stringify({ probe: 'x'.repeat(cube.hexbit * faces.rays + extra) })
    const stripes = raidStripeOf(text, faces.rays)
    if (stripes.length !== faces.rays) return false
    if (raidJoinOf(stripes) !== text) return false
  }

  // DETERMINED: a referrer is a function of its inode. Given the inode, every field of the pointer is recovered,
  // so the pointer holds nothing of its own to lose.
  const occupancy = 'notes'
  const address = 'a'.repeat(cube.bits)
  const key = `${occupancy}/probe`
  const inode = { kind: 'inode' as const, address, occupancy, nlink: seed, links: [key], value: { probe: seed } }
  const rebuilt = {
    kind: 'referrer' as const,
    address: inode.address,
    occupancy: inode.occupancy,
    href: `${storageHref}/${storageAddressKeyOf(inode.occupancy, inode.address)}`,
  }
  const stored = {
    kind: 'referrer' as const,
    address,
    occupancy,
    href: `${storageHref}/${storageAddressKeyOf(occupancy, address)}`,
  }
  return inode.links.includes(key) && JSON.stringify(rebuilt) === JSON.stringify(stored)
}

/**
 * Repair broken RAID shares and delete orphans (a write; needs the write token).
 * @wing storage
 * @kind builder
 * @evidence storageMaintainOf
 */
export const storageMaintainOf = async (env?: QpuEnv, auth?: string | null) => {
  // A WRITE PATH: maintain repairs and drops storage. Without this gate it rewrote and deleted for any caller. Fail closed,
  // the same bearer the other writes require.
  if (!storageWriteAllowedOf(env, auth))
    return { '@context': contextOf(), '@type': 'Action' as const, '@id': `${storageHref}#maintain`, url: storageHref, kind: 'maintain' as const, denied: 'storage maintenance needs Authorization: Bearer QPU_WRITE_TOKEN', repaired: n - n, remaining: n - n, orphans: n - n, holds: false }
  const faces = facesOf()
  const store = storageStoreOf(env)
  // db/* is the Payload document database, not public storage — excluded from the public catalog/monitor (names and health).
  const names = (await store.keys()).filter((k) => !k.startsWith('db/'))
  const raw = await store.raw()
  let repaired = n - n
  let orphans = n - n

  /**
   * REPAIR WHAT IS BROKEN, NOT EVERYTHING, and decide which from the listing.
   *
   * This read every value — `await store.get(key)` per key, sequentially, KV then R2 — to find the few that needed
   * rewriting. At 253 links that is past a Worker's subrequest budget before a single repair is attempted, so the
   * repair path failed on exactly the stores that needed it most. The monitor had the same fault and the same cure:
   * a missing share is a missing NAME, and the listing already carries the names.
   *
   * THE SECOND HALF OF THE OLD TEST NEVER CONSULTED THE STORE. `raidJoinOf(raidStripeOf(text)) !== text` round-trips
   * the striping function against its own output; it is a property of raidStripeOf and raidJoinOf, true or false
   * regardless of what is stored, and it cannot detect a corrupted share. It is kept for the values actually read —
   * free once the value is in hand, and a real per-value property — but it is no longer a reason to read 253 values.
   */
  const present = new Set(raw)
  const broken = names.filter((key) => {
    for (let face = n - n; face < faces.faces; face++) {
      if (!present.has(raidShareKeyOf(key, face))) return true
    }
    return false
  })

  /** A repair is a read and two writes. Bounded per invocation so the call completes and reports, rather than
   *  running out of budget mid-store and leaving the caller unable to tell what was done. `remaining` says whether
   *  to call again. */
  for (const key of broken.slice(n - n, STORE_REPAIR_MAX)) {
    const value = await store.get(key)
    if (value === null || value === undefined) continue
    await store.put(key, value)
    repaired += seed
  }
  const remaining = broken.length > STORE_REPAIR_MAX ? broken.length - STORE_REPAIR_MAX : n - n

  const live = new Set(names)
  /** Orphan drops are subrequests too, and a store full of them would spend the whole budget here and never reach
   *  the repairs above. Same bound, same reason. */
  let dropped = n - n
  for (const name of raw) {
    if (dropped >= STORE_REPAIR_MAX) break
    if (!name.includes(raidMark)) continue
    const mark = name.indexOf(raidMark)
    const parent = mark > n - n ? name.slice(n - n, mark) : ''
    if (parent.length === n - n || !live.has(parent)) {
      await store.drop(name)
      orphans += seed
      dropped += seed
    }
  }
  const monitor = await storageMonitorOf(env)
  const holds = monitor.holds && monitor.missing === n - n && monitor.verified === monitor.keys
  return {
    '@context': contextOf(),
    '@type': 'Action' as const,
    '@id': `${storageHref}#maintain`,
    url: storageHref,
    isAccessibleForFree: cors === '*',
    kind: 'maintain' as const,
    repaired,
    remaining,
    orphans,
    monitor,
    holds,
  }
}

/** WRITE AUTH, FAIL CLOSED. Reads stay open. A public write is honoured only when QPU_WRITE_TOKEN is bound and the
 * request carries `Authorization: Bearer <token>`; unbound, every public write is refused. The QpuDeposit service binding
 * (input.via === 'binding' in storageOf) writes without the token. Measured 2026-09-11 by a peer session:
 * the preflight advertised PUT and DELETE to every origin and the handler honoured them with no check at all. */
/**
 * THE GUARD, PROVED TO FAIL CLOSED AND TO FAIL OPEN NOWHERE.
 *
 * Reads stay open; a write needs the bearer. The three ways this has actually gone wrong are the three cases:
 * an unbound secret must refuse EVERY write including one that presents the empty bearer, a wrong token must be
 * refused, and the right one must be accepted. Recomputes over its own function rather than asserting a comment.
 */
export const storageWriteAllowedHolds = (): boolean => {
  const token = 'holds-probe-token'
  const bound = { QPU_WRITE_TOKEN: token } as QpuEnv
  const unbound = {} as QpuEnv
  return (
    storageWriteAllowedOf(bound, `Bearer ${token}`) &&
    !storageWriteAllowedOf(bound, `Bearer ${token}x`) &&
    !storageWriteAllowedOf(bound, token) &&
    !storageWriteAllowedOf(bound, null) &&
    !storageWriteAllowedOf(unbound, 'Bearer ') &&
    !storageWriteAllowedOf(unbound, null) &&
    !storageWriteAllowedOf(undefined, 'Bearer anything')
  )
}

/**
 * Whether a public write is allowed: only when QPU_WRITE_TOKEN is bound and the bearer matches; fails closed.
 * @wing storage
 * @kind builder
 * @evidence storageWriteAllowedHolds
 */
export const storageWriteAllowedOf = (env?: QpuEnv, auth?: string | null): boolean => {
  const token = typeof env?.QPU_WRITE_TOKEN === 'string' ? env.QPU_WRITE_TOKEN : ''
  if (token.length === n - n || typeof auth !== 'string') return false
  // constant-time compare: fold every character difference over the full length, so the time taken does not depend on
  // how long a prefix of the bearer matched — a `===` would early-exit and leak the token one character at a time.
  const expected = `Bearer ${token}`
  if (auth.length !== expected.length) return false
  let diff = n - n
  for (let i = n - n; i < expected.length; i++) diff |= auth.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === n - n
}
const storageWriteOf = (method: string): boolean => method === 'PUT' || method === 'POST' || method === 'DELETE'

/** storageListOf(env, prefix, limit) → the link names under a prefix in ascending order (so a name that begins with an
 *  inverted arrival time lists the newest first), each with the document a GET of it returns; RAID shares and inode
  * @wing storage
  * @kind builder
  * @evidence storageListHolds
 *  keys never list. Reads stay open. */
export const storageListOf = async (env: QpuEnv | undefined, prefix: string, limit: number) => {
  const want = Number.isInteger(limit) && limit > n - n ? limit : facesOf().faces
  const keys = storageLinksOf(await storageStoreOf(env).keysUnder(prefix, want))
  const rows: { key: string; doc: unknown }[] = []
  for (const key of keys) rows.push({ key, doc: await storageOf(env, { method: 'GET', key }) })
  const names = rows.map((r) => r.key)
  const holds = names.length <= want &&
    names.join('\n') === [...names].sort().join('\n') &&
    names.every((key) => key.startsWith(prefix) && !key.includes(raidMark)) &&
    storageListHolds()
  return { ...storageMetaOf(env), prefix, limit: want, keys: rows, holds }
}

/** storageListHolds → the listing's two laws, pure: a name led by an inverted arrival time sorts NEWEST FIRST in the
 *  ascending order the store lists, and a RAID share name (key + raidMark + face) is never taken for a link while a link
 *  name never carries the mark. The inversion is against the platform's own largest safe integer, padded to its length. */
export const storageListHolds = (): boolean => {
  const width = String(Number.MAX_SAFE_INTEGER).length
  const arrived = (at: number): string => `live/probe/${String(Number.MAX_SAFE_INTEGER - at).padStart(width, '0')}-a`
  const earlier = arrived(n), later = arrived(n + n)
  return [earlier, later].sort()[n - n] === later &&
    raidShareKeyOf(later, n - n).includes(raidMark) &&
    !later.includes(raidMark) && !earlier.includes(raidMark)
}

/**
 * Content-addressed storage: GET/PUT/DELETE by key with inodes, referrer links, nlink counting and RAID striping over KV and R2.
 * @wing storage
 * @kind builder
 * @evidence storageHolds
 */
export const storageOf = async (
  env?: QpuEnv,
  input: { method?: string; key?: unknown; value?: unknown; auth?: string | null; via?: 'binding' } = {}) => {
  const meta = storageMetaOf(env)
  const store = storageStoreOf(env)
  const method = input.method ?? 'GET'
  const key = storageKeyOf(input.key)
  const faces = facesOf()
  // NO PUBLIC STORAGE OF THE DATABASE. The Payload document database shares this KV/R2 keyspace under db/* (db/payload/*
  // holds users documents with hash, salt and apiKey). Those are Payload's, reached only through Payload's access control —
  // never read, listed or written through this door. Deny the whole db/ prefix here for every method.
  if (key.startsWith('db/')) return { ...meta, '@id': `${storageHref}/${key}`, url: `${storageHref}/${key}`, key, holds: false as const, denied: 'payload' as const }
  const unlinkOf = async (link: string, row: { address: string; occupancy: string }) => {
    const inodeKey = storageAddressKeyOf(row.occupancy, row.address)
    const inode = await store.get(inodeKey)
    await store.del(link)
    if (!isInodeDoc(inode)) return { freed: true as const, nlink: n - n }
    const links: string[] = []
    for (const name of inode.links) if (name !== link) links.push(name)
    const nlink = links.length
    if (nlink === n - n) {
      await store.del(inodeKey)
      return { freed: true as const, nlink }
    }
    await store.put(inodeKey, { kind: 'inode' as const, address: inode.address, occupancy: inode.occupancy, nlink, links, value: inode.value })
    return { freed: false as const, nlink }
  }
  if (method === 'GET' && key.length === n - n) {
    const keys = storageLinksOf(await store.keys())
    return { ...meta, keys, holds: meta.holds }
  }
  /* THE STORAGE REFUSALS, GROUNDED. An absent key is theorem false — nothing to address, so nothing to
   * answer, and the third state rather than a fabricated default. The write token is theorem crypto: a public
   * read and an authenticated write is the split this unit seals, and an unauthenticated write is refused by
   * that theorem rather than by a preference. The byte ceiling is tenOf(n + n) and the seats are faces, both
   * fixed by theorem clay, so a caller can derive the limit from the geometry instead of discovering it. */
  if (key.length === n - n) return { ...meta, holds: false as const, denied: 'key' as const }
  const href = `${storageHref}/${key}`
  // A SERVICE BINDING IS ITS OWN CREDENTIAL (the captain, 2026-09-14: deposits through the MCP door, "no token on host").
  // via: 'binding' is set only by the QpuDeposit RPC entrypoint in worker.js, which Cloudflare lets no public request
  // reach — every HTTP call site above builds this input field by field and never passes it. So a write through the
  // binding needs no bearer token, and every public write still does.
  if (storageWriteOf(method) && input.via !== 'binding' && !storageWriteAllowedOf(env, input.auth)) {
    return { ...meta, '@id': href, url: href, key, holds: false as const, denied: 'auth' as const, auth: 'Bearer QPU_WRITE_TOKEN' as const }
  }
  if (method === 'DELETE') {
    const prior = await store.get(key)
    if (isReferrerDoc(prior)) {
      const unlinked = await unlinkOf(key, prior)
      return {
        ...meta,
        '@id': href,
        url: href,
        key,
        deleted: true as const,
        inode: prior.address,
        nlink: unlinked.nlink,
        freed: unlinked.freed,
        holds: meta.holds,
  }
    }
    if (isInodeDoc(prior) && prior.nlink === n - n) {
      await store.del(key)
      return { ...meta, '@id': href, url: href, key, deleted: true as const, inode: prior.address, nlink: n - n, freed: true as const, holds: meta.holds }
    }
    if (isInodeDoc(prior)) return { ...meta, '@id': href, url: href, key, holds: false as const, denied: 'nlink' as const, nlink: prior.nlink }
    await store.del(key)
    return { ...meta, '@id': href, url: href, key, deleted: true as const, holds: meta.holds }
  }
  if (method === 'PUT' || method === 'POST') {
    const stored = jsonOf(input.value)
    if (jsonBytesOf(stored) > tenOf(n + n)) return { ...meta, '@id': href, key, holds: false as const, denied: 'heap' as const }
    const occupancy = storageOccupancyOf(key)
    const address = storageAddressOf(stored)
    const inodeKey = storageAddressKeyOf(occupancy, address)
    const access = `${storageHref}/${inodeKey}`
    const prior = await store.get(key)
    if (isReferrerDoc(prior) && (prior.address !== address || prior.occupancy !== occupancy)) await unlinkOf(key, prior)
    const existing = await store.get(inodeKey)
    const links: string[] = []
    if (isInodeDoc(existing)) for (const name of existing.links) links.push(name)
    let seated = false
    for (const name of links) if (name === key) seated = true
    if (!seated) links.push(key)
    const nlink = links.length
    const inode = { kind: 'inode' as const, address, occupancy, nlink, links, value: stored }
    /**
     * A DEPOSIT IS SIXTY SUBREQUESTS AND THE BUDGET IS FIFTY.
     *
     * Each put places the value and fourteen RAID shares across KV and R2 — thirty slots — and a deposit makes
     * two of them, the inode and the referrer. The file already said so ("sixty for the inode-and-referrer pair a
     * deposit makes") and treated it as a latency note. It is not: Cloudflare allows fifty subrequests per request
     * on the free plan, so the tail of the second put is refused, and the live host has been carrying feed records
     * with faces 7, 8 and 9 absent — stable across a minute of polling, a different record each time the store
     * grows. Reproduced here by refusing exactly those faces: "12 of 15 slots placed; face 7, face 8, face 9 did
     * not (Too many subrequests)".
     *
     * REPORTED, NOT SWALLOWED, AND NOT A CRASH EITHER. put now names the slots that did not land, and a refusal
     * belongs in the same shape as every other refusal this door makes — holds false with a reason — rather than
     * escaping as an unhandled rejection the caller reads as a 500.
     *
     * This does not make the write fit. Reducing sixty slots to something under the budget is a question about
     * whether a referrer — a pointer of four fields — needs its own fourteen RAID shares, and that is a change to
     * what RAID means here, not a bug fix. Named rather than guessed at.
     */
    try {
      await store.put(inodeKey, inode)
      await store.put(key, { kind: 'referrer' as const, address, occupancy, href: access })
    } catch (error) {
      return {
        ...meta,
        '@id': href,
        url: href,
        key,
        holds: false as const,
        denied: 'slots' as const,
        placement: String((error as Error)?.message ?? error),
      }
    }
    raidTraffic += seed
    const raid = raidOf({ safe: raidSafeOf(key), traffic: raidTraffic })
    /**
     * THE ROUND TRIP IS GONE FROM THE WRITE PATH, AND PROVED PROPERLY INSTEAD.
     *
     * Every write used to stringify the whole value, deal it into rays and join it back, and compare — then feed
     * that comparison into the write's `holds`. It reads like an integrity check and is not one: raidJoinOf is
     * the inverse of raidStripeOf or it is not, and which one is decided by the two functions and the text alone.
     * The store is never consulted. A write could land nowhere, or land corrupted, and this still said true; a
     * write of the same bytes to a broken store says exactly what a write to a healthy one says. The answer was
     * already in the input, which is the one thing a holds here is not allowed to be.
     *
     * It was not free either. It was O(value) on the write path — an earlier pass cut it from three times to
     * once per write without asking whether once was the right number.
     *
     * One sample per write also proves less than it looks. What matters about the striping is that it inverts for
     * EVERY length, and dealing into rays only behaves differently by length modulo rays — so the property is a
     * cross product of residue class against ray count, and the suite walks it (raid.test.ts). A write that
     * happens to be a multiple of rays exercises one residue and reports on all of them.
     */
    return {
      ...meta,
      '@type': 'Thing' as const,
      '@id': href,
      url: href,
      key,
      inode: address,
      nlink,
      address,
      referrer: access,
      value: stored,
      raid: {
        ...raid,
        stripes: faces.rays,
        shares: faces.faces},
      // What is left is about THIS write: the store's own meta, the raid geometry it picked, and the inode's link
      // count agreeing with the links it holds. Each of those can be false for a write that went wrong.
      holds: meta.holds && raid.holds && inode.nlink === inode.links.length,
  }
  }
  const foundValue = await store.get(key)
  if (isReferrerDoc(foundValue)) {
    const inode = await store.get(storageAddressKeyOf(foundValue.occupancy, foundValue.address))
    if (isInodeDoc(inode)) {
      return {
        ...meta,
        '@type': 'Thing' as const,
        '@id': href,
        url: href,
        key,
        inode: inode.address,
        nlink: inode.nlink,
        value: inode.value,
        holds: meta.holds && inode.nlink === inode.links.length,
  }
    }
  }
  if (isInodeDoc(foundValue)) {
    return {
      ...meta,
      '@type': 'Thing' as const,
      '@id': href,
      url: href,
      key,
      inode: foundValue.address,
      nlink: foundValue.nlink,
      referrer: `${storageHref}/${key}`,
      value: foundValue.value,
      holds: meta.holds && foundValue.nlink === foundValue.links.length,
  }
  }
  const seeded = key === payloadDbKey || key === `${payloadDbKey}/seed`
  const db = payloadDbOf()
  return {
    ...meta,
    '@type': 'Thing' as const,
    '@id': href,
    url: href,
    key,
    value: foundValue ?? (seeded ? db : foundValue),
    ...(seeded
      ? { seed, remainder: n - n, unity: seed === mintOf(n - n), payload: db }
      : {}),
    holds: meta.holds && ((foundValue !== null && foundValue !== undefined) || (seeded && db.holds)),
  }
}

export const storageHolds = (s = storageMetaOf()): boolean =>
  s.holds === true &&
  s.kind === 'storage' &&
  s.raid.holds === true &&
  raidHolds(s.raid) &&
  hybridHolds(s.hybrid) &&
  payloadDbHolds(s.payload) &&
  s.payload.key === 'databases/payload' &&
  s.payload.seed === seed &&
  s.payload.remainder === n - n &&
  alpineHolds(s.alpine) &&
  s.alpine.os === 'alpine' &&
  s.alpine.libc === 'musl' &&
  s.alpine.toolbox === 'busybox' &&
  s.alpine.fs === 'overlay' &&
  s.alpine.upper === 'kv' &&
  s.alpine.lower === 'r2' &&
  s.alpine.work === 'kv' &&
  s.alpine.work === s.alpine.upper &&
  theorem.next_fused(s.alpine.next, s.alpine.fused) &&
  s.alpine.theorem === 'next_coil' &&
  s.bindings.STORAGE === 'kv' &&
  s.bindings.BLOBS === 'r2' &&
  s.href === storageHref &&
  jsonldHoldsOf(s)

/**
 * The storage MCP tools (get, list, put, delete, maintain, monitor) bound to an environment and an auth header.
 * @wing storage
 * @kind builder
 */
export const storageToolsOf = (env?: QpuEnv, auth?: string | null): QpuSubTool[] => {
  const href = storageHref
  const see = ['storage_catalog', 'storage_list', 'storage_get', 'storage_put', 'storage_del', 'storage_monitor', 'storage_maintain', 'storage_raid'] as const
  const schema = { type: 'object', properties: { man: { type: 'boolean' }, key: { type: 'string' }, value: {} } }
  return [
    {
      name: see[n - n],
      description: 'Storage catalog. JSON-LD WebAPI. Quantum RAID. All details.',
      man: subManOf(see[n - n], 'Storage catalog.', 'Native Alpine Linux. musl. busybox. overlayfs. Inodes. RAID. Reads no auth. Public writes Authorization: Bearer QPU_WRITE_TOKEN; unbound refuses them.', href, see.filter((s) => s !== see[n - n])),
      inputSchema: schema,
      run: () => storageMcpOf(env)},
    {
      name: see[seed],
      description: 'List storage keys.',
      man: subManOf(see[seed], 'List keys.', 'Referrer links. Inodes private. RAID shares hidden.', href, see.filter((s) => s !== see[seed])),
      inputSchema: schema,
      // every listed name is a link: no RAID share mark, no inode address. keys() drops shares and storageLinksOf drops
      // inodes, so this holds by construction; it is computed over the returned names so a change to either fails here
      run: async () => {
        const keys = storageLinksOf(await storageStoreOf(env).keys())
        return { kind: 'list' as const, keys, holds: keys.every((key) => !key.includes(raidMark) && !isStorageAddressKey(key)) }
      },
  },
    {
      name: see[coins],
      description: 'Get a stored value.',
      man: subManOf(see[coins], 'Get value.', 'Reconstruct from RAID shares.', href, see.filter((s) => s !== see[coins])),
      inputSchema: schema,
      run: (a) => storageOf(env, { method: 'GET', key: a.key })},
    {
      name: see[n],
      description: 'Put a stored value.',
      man: subManOf(see[n], 'Put value. Bearer QPU_WRITE_TOKEN.', 'Store by content address. Return referrer access link. Inode nlink. Stripe rays. Mirror coins.', href, see.filter((s) => s !== see[n])),
      inputSchema: schema,
      run: (a) => storageOf(env, { method: 'PUT', key: a.key, value: a.value, auth })},
    {
      name: see[n + seed],
      description: 'Delete a stored value.',
      man: subManOf(see[n + seed], 'Delete link. Bearer QPU_WRITE_TOKEN.', 'Unlink. Last link deleted frees the inode.', href, see.filter((s) => s !== see[n + seed])),
      inputSchema: schema,
      run: (a) => storageOf(env, { method: 'DELETE', key: a.key, auth })},
    {
      name: see[n + coins],
      description: 'Monitor RAID health.',
      man: subManOf(see[n + coins], 'Monitor storage.', 'Keys shares missing verified bytes.', href, see.filter((s) => s !== see[n + coins])),
      inputSchema: schema,
      run: () => storageMonitorOf(env)},
    {
      name: see[n + n],
      description: 'Maintain RAID.',
      man: subManOf(see[n + n], 'Maintain RAID.', 'Rewrite broken shares. Drop orphans.', href, see.filter((s) => s !== see[n + n])),
      inputSchema: schema,
      run: () => storageMaintainOf(env, auth)},
    {
      name: see[mintOf(n) - seed],
      description: 'RAID geometry.',
      man: subManOf(see[mintOf(n) - seed], 'RAID types.', 'Start cheapest. Cover all. Rotate. theorem raid.', href, see.filter((s) => s !== see[mintOf(n) - seed])),
      inputSchema: schema,
      run: () => raidOf()}]
}

/**
 * The storage sub-server's catalogue and live store reading.
 * @wing storage
 * @kind builder
 * @evidence storageMcpOf
 */
export const storageMcpOf = async (env?: QpuEnv) => {
  const meta = storageMetaOf(env)
  const monitor = await storageMonitorOf(env)
  const keys = storageLinksOf(await storageStoreOf(env).keys())
  const tools = storageToolsOf(env)
  return subCatalogOf('storage', storageHref, tools, {
    raid: meta.raid,
    hybrid: meta.hybrid,
    payload: meta.payload,
    alpine: meta.alpine,
    bindings: meta.bindings,
    kv: meta.kv,
    r2: meta.r2,
    anything: meta.anything,
    keys,
    monitor,
    holds: meta.holds && monitor.holds && meta.raid.holds,
  })
}

const networkChannels = new Map<string, unknown[]>()

/** networkFetchHolds → a named fetch stays on the named host: its door is one of the named doors, and its href parses
 *  to https on unit.host with exactly that door as its path. An href on any other host or path does not hold. */
export const networkFetchHolds = (f?: { path: string; href: string }, doors?: readonly string[]): boolean => {
  if (f === undefined || doors === undefined) return false
  if (!doors.includes(f.path)) return false
  const url = URL.canParse(f.href) ? new URL(f.href) : null
  return url !== null && url.protocol === 'https:' && url.host === unit.host && url.pathname === f.path && url.search === '' && url.hash === ''
}

/**
 * The network MCP tools (send, receive, fetch on the named host) for channels in memory.
 * @wing agents
 * @kind builder
 */
export const networkToolsOf = (): QpuSubTool[] => {
  const href = networkHref
  const see = ['net_catalog', 'net_list', 'net_send', 'net_recv', 'net_message', 'net_routes', 'net_fetch', 'net_monitor'] as const
  const schema = { type: 'object', properties: { man: { type: 'boolean' }, channel: { type: 'string' }, body: {}, path: { type: 'string' }, lane: { type: 'number' } } }
  const channelOf = (value: unknown): string =>
    typeof value === 'string' && value.length > n - n && value.length <= found ? value : ''
  const namedPathOf = (value: unknown): string => {
    if (typeof value !== 'string') return ''
    if (value.startsWith(unit.origin)) {
      const rest = value.slice(unit.origin.length)
      return rest.length === n - n ? '/' : rest
    }
    if (value.startsWith('/') && !value.startsWith('//')) return value
    return ''
  }
  // the named doors are the router's table (docs.api, one row per ray) and the ladder's extras — never a second list
  // of them; read when a fetch asks, so a ladder that lists these tools cannot recurse into them
  const allowed = (): readonly string[] => [...new Set([...apiDoorsOf().map((d) => d.path), ...qpuSequenceOf().extras.map((row) => row.path)])]
  return [
    {
      name: see[n - n],
      description: 'Network catalog. JSON-LD WebAPI. Lanes involution.',
      man: subManOf(see[n - n], 'Network catalog.', 'JSON-LD WebAPI. hop involution. await false. when never. No auth.', href, see.filter((s) => s !== see[n - n])),
      inputSchema: schema,
      run: () => networkMcpOf()},
    {
      name: see[seed],
      description: 'List network channels.',
      man: subManOf(see[seed], 'List channels.', 'In-memory lanes.', href, see.filter((s) => s !== see[seed])),
      inputSchema: schema,
      // every listed channel is a name channelOf accepts, and the list is the whole table
      run: () => {
        const channels = [...networkChannels.keys()]
        return { kind: 'list' as const, channels, holds: channels.length === networkChannels.size && channels.every((c) => channelOf(c) === c) }
      },
  },
    {
      name: see[coins],
      description: 'Send on a channel.',
      man: subManOf(see[coins], 'Send.', 'await false. when never.', href, see.filter((s) => s !== see[coins])),
      inputSchema: schema,
      run: (a) => {
        const channel = channelOf(a.channel ?? a.path ?? a.key) || 'default'
        const q = networkChannels.get(channel) ?? []
        const body = jsonOf(a.body ?? a.value)
        const before = q.length
        q.push(body)
        networkChannels.set(channel, q)
        // the channel is a name channelOf accepts, the lane grew by exactly one, and its tail is the body sent
        const lane = networkChannels.get(channel) ?? []
        const holds = channelOf(channel) === channel && lane.length === before + seed && lane[lane.length - seed] === body
        return { kind: 'send' as const, channel, when: 'never' as const, holds }
      }},
    {
      name: see[n],
      description: 'Receive from a channel.',
      man: subManOf(see[n], 'Receive.', 'No await.', href, see.filter((s) => s !== see[n])),
      inputSchema: schema,
      run: (a) => {
        const channel = channelOf(a.channel ?? a.path ?? a.key) || 'default'
        const q = networkChannels.get(channel) ?? []
        const before = q.length
        const value = q.length > n - n ? q.shift() : null
        networkChannels.set(channel, q)
        // the channel is a name channelOf accepts, and the lane shrank by one when it held a value, else stayed empty
        const after = (networkChannels.get(channel) ?? []).length
        const holds = channelOf(channel) === channel && (before > n - n ? after === before - seed : after === n - n && value === null)
        return { kind: 'recv' as const, channel, value: value ?? null, holds }
      }},
    {
      name: see[n + seed],
      description: 'Proxy a message lane.',
      man: subManOf(see[n + seed], 'Message hop.', 'lanes = faces. involution. clock_seq. No auth.', href, see.filter((s) => s !== see[n + seed])),
      inputSchema: schema,
      run: (a) => messageOf({ lane: a.lane, body: a.body })},
    {
      name: see[n + coins],
      description: 'Involution routes.',
      man: subManOf(see[n + coins], 'Routes.', 'hop involution. theorem involution.', href, see.filter((s) => s !== see[n + coins])),
      inputSchema: schema,
      run: () => {
        const message = messageOf()
        return { kind: 'routes' as const, hop: message.hop, lanes: message.lanes, routes: message.routes, holds: message.holds }
      }},
    {
      name: see[n + n],
      description: 'Named-host fetch only.',
      man: subManOf(see[n + n], 'Named fetch.', 'qpu.uuidna.com only. hostEscape false. No auth.', href, see.filter((s) => s !== see[n + n])),
      inputSchema: schema,
      run: (a) => {
        const path = namedPathOf(a.path ?? a.href)
        const door = path.split('?')[n - n] ?? ''
        if (allowed().includes(door) === false) {
          // grounded: theorem cern with theorem involution: the named host is the only door, and a hop leaves and returns to its own seat
          return { kind: 'fetch' as const, holds: false as const, denied: 'hostEscape' as const, hostEscape: true as const }
        }
        const fields = { kind: 'fetch' as const, path: door, href: `${unit.origin}${door === '/' ? '' : door}`, named: true as const }
        const hostEscape = !networkFetchHolds(fields, allowed())
        return { ...fields, hostEscape, holds: !hostEscape }
      }},
    {
      name: see[mintOf(n) - seed],
      description: 'Network monitor.',
      man: subManOf(see[mintOf(n) - seed], 'Monitor network.', 'Channels lanes await false.', href, see.filter((s) => s !== see[mintOf(n) - seed])),
      inputSchema: schema,
      run: () => {
        const message = messageOf()
        let queued = n - n
        for (const q of networkChannels.values()) queued += q.length
        return {
          kind: 'monitor' as const,
          channels: networkChannels.size,
          queued,
          lanes: message.lanes,
          hop: message.hop,when: 'never' as const,
          holds: message.holds,
  }
      }}]
}

/**
 * The network sub-server's catalogue.
 * @wing agents
 * @kind builder
 * @evidence networkMcpOf
 */
export const networkMcpOf = onceOf(() => {
  const message = messageOf()
  const tools = networkToolsOf()
  return subCatalogOf('network', networkHref, tools, {
    hop: 'involution' as const,
    when: 'never' as const,
    lanes: message.lanes,
    routes: message.routes,
    channels: [...networkChannels.keys()],
    holds: message.holds && message.hop === 'involution',
  })
})

type QpuServerJob = {
  id: number
  status: 'done'
  gates: string[]
  read: QpuGatesRead
  dropped: number
  index: number
  shots: number
  counts: { i: number; w: number }[]
  tally: { i: number; n: number }[]
  support: number[]
  collapsed: boolean
  holds: boolean
}

const serverJobs: QpuServerJob[] = []
let serverSeq = n - n

/** How a job's gates were read: `read` from the caller's list, `absent` when none was sent (the Bell pair stands in),
 * or `default` when something was sent that held no gate at all — the Bell pair runs, and the job says so and does
 * not hold, so a body of nonsense never comes back as a confident result. `dropped` counts rows that were not gates. */
export type QpuGatesRead = 'read' | 'absent' | 'default'
const parseGatesOf = (value: unknown): { ops: Record<string, unknown>[]; read: QpuGatesRead; dropped: number } => {
  const fallback = [
    { name: 'h', q: n - n },
    { name: 'cx', c: n - n, t: seed }]
  if (value === undefined) return { ops: fallback, read: 'absent', dropped: n - n }
  if (!Array.isArray(value)) return { ops: fallback, read: 'default', dropped: seed }
  const ops: Record<string, unknown>[] = []
  const names = ['h', 'x', 'z', 'cx', 'cz', 'swap', 'ccx', 'reset'] as const
  let dropped = n - n
  for (const row of value) {
    const name = row && typeof row === 'object' && !Array.isArray(row) && typeof (row as { name?: unknown }).name === 'string' ? (row as { name: string }).name : ''
    if ((names as readonly string[]).includes(name)) ops.push(jsonOf(row) as Record<string, unknown>)
    else dropped += seed
  }
  return ops.length > n - n ? { ops, read: 'read', dropped } : { ops: fallback, read: 'default', dropped }
}

/**
 * Submit a job to the server: runs it on the exact computer and returns the result inline (jobs are not stored).
 * @wing agents
 * @kind builder
 * @evidence serverSubmitOf
 */
export const serverSubmitOf = (input: Record<string, unknown> = {}) => {
  const computer = computerOf()
  const plugin = payloadPluginOf()
  const payload = payloadMcpOf()
  const parsed = parseGatesOf(input.gates)
  const ops = parsed.ops
  // the shots the caller asked are the shots the job runs; with none asked, the lattice's own count (mintOf(n)) stands
  const asked = typeof input.shots === 'number' && Number.isSafeInteger(input.shots) && input.shots > 0 ? input.shots : mintOf(n)
  const measured = measureOf(runGatesOf(ops), quantumModeOf(), asked)
  serverSeq += seed
  const holds = measured.holds && computer.holds && payloadPluginHolds(plugin) && payload.holds && parsed.read !== 'default'
  const job: QpuServerJob = {
    id: serverSeq,
    status: 'done',
    gates: ops.map((op) => `${op.name ?? ''}`),
    read: parsed.read,
    dropped: parsed.dropped,
    index: measured.index,
    shots: measured.shots,
    counts: measured.counts,
    tally: measured.tally,
    support: measured.support,
    collapsed: measured.collapsed,
    holds,
  }
  serverJobs.push(job)
  /** The run is synchronous and its result is here, in this reply. Nothing is stored: `id` counts jobs in this isolate
   * only, and a later GET of the job is answered only while this isolate lives. `href` is the server, not the job. */
  return {
    kind: 'job' as const,
    href: serverHref,
    stored: false as const,
    result: 'inline' as const,
    backend: unit.host,
    payload: plugin.href,
    plugin: plugin.name,computer: { holds: computer.holds, universal: computer.universal, lattice: computer.lattice },
    ...job}
}

/** serverQueueHolds → the queue is the jobs in submission order: its count is its length, every id is a positive
 *  integer larger than the one before it (ids count submissions), and every job is done. */
export const serverQueueHolds = (q?: { jobs: { id: number; status: string }[]; n: number }): boolean =>
  q !== undefined && (q.n === q.jobs.length &&
  q.jobs.every((j, i) => Number.isInteger(j.id) && j.id >= seed && j.status === 'done' && (i === n - n || q.jobs[i - seed]!.id < j.id)))

/**
 * The server MCP tools (submit, queue, result, backends and the rest) for jobs on the exact computer.
 * @wing agents
 * @kind builder
 */
export const serverToolsOf = (): QpuSubTool[] => {
  const href = serverHref
  const see = ['server_catalog', 'server_backend', 'server_submit', 'server_queue', 'server_result', 'server_shots', 'server_correct', 'server_monitor'] as const
  const schema = { type: 'object', properties: { man: { type: 'boolean' }, gates: { type: 'array' }, id: { type: 'number' } } }
  return [
    {
      name: see[n - n],
      description: 'Quantum server catalog. JSON-LD WebAPI.',
      man: subManOf(see[n - n], 'Quantum server catalog.', 'JSON-LD WebAPI. Jobs. Backend the running circuit. Eight server tools. No auth.', href, see.filter((s) => s !== see[n - n])),
      inputSchema: schema,
      run: () => serverMcpOf()},
    {
      name: see[seed],
      description: 'Quantum backend.',
      man: subManOf(see[seed], 'Backend.', '3-qubit register. H CNOT native. H Toffoli universal. Coupling compile.', href, see.filter((s) => s !== see[seed])),
      inputSchema: schema,
      run: () => {
        const computer = computerOf()
        const circuit = circuitOf()
        return {
          kind: 'backend' as const,
          name: unit.host,
          qubits: n,
          dim: mintOf(n),
          basis: computer.basis,
          universal: computer.universal,
          coupling: computer.coupling,
          register: circuit.register,
          holds: computer.holds && circuit.register.holds,
  }
      }},
    {
      name: see[coins],
      description: 'Submit a quantum job.',
      man: subManOf(see[coins], 'Submit job.', 'Gates h cx x z cz swap ccx reset. Default H then CNOT.', href, see.filter((s) => s !== see[coins])),
      inputSchema: schema,
      run: (a) => serverSubmitOf(a)},
    {
      name: see[n],
      description: 'Job queue.',
      man: subManOf(see[n], 'Queue.', 'In-memory jobs.', href, see.filter((s) => s !== see[n])),
      inputSchema: schema,
      run: () => {
        const fields = { kind: 'queue' as const, jobs: serverJobs.map((j) => ({ id: j.id, status: j.status, holds: j.holds })), n: serverJobs.length }
        return { ...fields, holds: serverQueueHolds(fields) }
      },
  },
    {
      name: see[n + seed],
      description: 'Job result.',
      man: subManOf(see[n + seed], 'Result.', 'Measurement index shots counts.', href, see.filter((s) => s !== see[n + seed])),
      inputSchema: schema,
      run: (a) => {
        const id = typeof a.id === 'number' ? a.id : serverSeq
        const job = serverJobs.find((row) => row.id === id)
        // grounded: theorem false with theorem only: nothing was supplied, so nothing is computed, and what is not computed is not claimed
        if (!job) return { kind: 'result' as const, holds: false as const, denied: 'job' as const }
        return { kind: 'result' as const, ...job }
      }},
    {
      name: see[n + coins],
      description: 'Shots on the running circuit.',
      man: subManOf(see[n + coins], 'Shots.', 'shots = mintOf n. Weights not RNG.', href, see.filter((s) => s !== see[n + coins])),
      inputSchema: schema,
      run: () => {
        const computer = computerOf()
        return { ...computer.shots, readout: computer.readout, holds: computer.shots.holds }
      }},
    {
      name: see[n + n],
      description: 'Bit-flip correction.',
      man: subManOf(see[n + n], 'Correct.', '3-qubit bitflip with Toffoli.', href, see.filter((s) => s !== see[n + n])),
      inputSchema: schema,
      run: () => {
        const computer = computerOf()
        return { ...computer.correct, holds: computer.correct.holds }
      }},
    {
      name: see[mintOf(n) - seed],
      description: 'Server monitor.',
      man: subManOf(see[mintOf(n) - seed], 'Monitor server.', 'Queue depth. Backend running.', href, see.filter((s) => s !== see[mintOf(n) - seed])),
      inputSchema: schema,
      run: () => {
        const computer = computerOf()
        return {
          kind: 'monitor' as const,
          jobs: serverJobs.length,
          seq: serverSeq,
          backend: unit.host,
          computer: computer.holds,
          holds: computer.holds,
  }
      }}]
}

/**
 * The server sub-server's catalogue: eight tools, the job queue and the backend.
 * @wing agents
 * @kind builder
 * @evidence serverMcpOf
 */
export const serverMcpOf = onceOf(() => {
  const computer = computerOf()
  const tools = serverToolsOf()
  const circuit = circuitOf()
  const plugin = payloadPluginOf()
  const payload = payloadMcpOf()
  return subCatalogOf('server', serverHref, tools, {
    backend: {
      name: unit.host,
      qubits: n,
      dim: mintOf(n),
      basis: computer.basis,
      universal: computer.universal,
      coupling: computer.coupling,
      register: circuit.register},
    computer,
    jobs: { n: serverJobs.length, slots: mintOf(n), href: serverHref },
    qram: plugin.href,
    payload: { href: plugin.href, finds: payload.collections, holds: payload.holds },
    plugin: plugin.name,
    network: networkHref,
    message: `${unit.origin}/message`})
})

export const serverHolds = (s = serverMcpOf()): boolean =>
  s.holds === true &&
  s.kind === 'server' &&
  s.tools.length === mintOf(n) &&
  s.tools[n - n]?.name === 'server_catalog' &&
  s.tools[mintOf(n) - seed]?.name === 'server_monitor' &&
  computerHolds() &&
  payloadPluginHolds() &&
  payloadPluginOf().href === `${storageHref}/${payloadDbKey}` &&
  s['@type'] === 'WebAPI' &&
  s['@id'] === serverHref

/**
 * The seven ideas the sandbox teams compete on, each as a sealed op tree with its left and right sides.
 * @wing quantum
 * @kind builder
 * @evidence ideasOf
 */
export const ideasOf = onceOf(() => {
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  const fused = faces.faces * handle.kv.amplitudes
  const next = fused + fused
  const ideas = [
    { ray: n - n, name: 'mint', theorem: 'mintOf (n + seed) = mintOf n + mintOf n', left: mintOf(n + seed), right: mintOf(n) + mintOf(n) },
    { ray: seed, name: 'cube', theorem: 'bits = vertices * hexbit', left: cube.bits, right: cube.vertices * cube.hexbit },
    { ray: coins, name: 'handle', theorem: 'amplitudes = mintOf bits', left: handle.amplitudes, right: mintOf(cube.bits) },
    { ray: n, name: 'quantum', theorem: 'fused = faces * mintOf (bits + seed)', left: fused, right: faces.faces * mintOf(cube.bits + seed) },
    { ray: n + seed, name: 'around', theorem: 'faces = coins * rays', left: faces.faces, right: faces.coins * faces.rays },
    { ray: n + coins, name: 'crypto', theorem: 'fused = faces * mintOf (vertices * hexbit + seed)', left: fused, right: faces.faces * mintOf(cube.vertices * cube.hexbit + seed) },
    { ray: faces.rays - seed, name: 'next', theorem: 'next = fused + fused', left: next, right: fused + fused }] as const
  const holds = cube.holds && handle.holds && faces.holds && ideas.length === faces.rays && ideas.every((i) => i.left === i.right)
  return { kind: 'ideas' as const, ideas, holds }
})

const ideaRunOf = (name: string): QpuOp => {
  if (name === 'mint') {
    return { op: 'eq', left: { op: 'mint', k: n + seed }, right: { op: 'add', left: { op: 'mint', k: n }, right: { op: 'mint', k: n } } }
  }
  if (name === 'cube') {
    return { op: 'eq', left: { op: 'quantum', name: 'bits' }, right: { op: 'mul', left: { op: 'quantum', name: 'vertices' }, right: { op: 'quantum', name: 'hexbit' } } }
  }
  if (name === 'handle') {
    return { op: 'eq', left: { op: 'quantum', name: 'amplitudes' }, right: { op: 'mint', k: { op: 'quantum', name: 'bits' } } }
  }
  if (name === 'quantum') {
    return {
      op: 'eq',
      left: { op: 'quantum', name: 'fused' },
      right: {
        op: 'mul',
        left: { op: 'quantum', name: 'faces' },
        right: { op: 'add', left: { op: 'quantum', name: 'amplitudes' }, right: { op: 'quantum', name: 'amplitudes' } }}}
  }
  if (name === 'around') {
    return { op: 'eq', left: { op: 'quantum', name: 'faces' }, right: { op: 'mul', left: { op: 'quantum', name: 'coins' }, right: { op: 'quantum', name: 'rays' } } }
  }
  if (name === 'crypto') {
    return {
      op: 'eq',
      left: { op: 'quantum', name: 'fused' },
      right: {
        op: 'mul',
        left: { op: 'quantum', name: 'faces' },
        right: { op: 'add', left: { op: 'quantum', name: 'amplitudes' }, right: { op: 'quantum', name: 'amplitudes' } }}}
  }
  return { op: 'eq', left: { op: 'quantum', name: 'next' }, right: { op: 'add', left: { op: 'quantum', name: 'fused' }, right: { op: 'quantum', name: 'fused' } } }
}

const quantumSlotOf = (name: string): number | undefined => {
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  if (name === 'n') return n
  if (name === 'seed') return seed
  if (name === 'coins') return coins
  if (name === 'vertices') return cube.vertices
  if (name === 'hexbit') return cube.hexbit
  if (name === 'bits') return cube.bits
  if (name === 'rays') return faces.rays
  if (name === 'faces') return faces.faces
  if (name === 'amplitudes') return handle.amplitudes
  if (name === 'fused') return faces.faces * handle.kv.amplitudes
  if (name === 'next') return faces.faces * handle.kv.amplitudes + faces.faces * handle.kv.amplitudes
  if (name === 'ns') return n - n
  return undefined
}

const quantumRelatedExtras = [
  'only',
  'planes',
  'lattice',
  'circuit',
  'noise',
  'steps',
  'science',
  'sciences',
  'drift',
  'computer',
  'coil',
  'electronics',
  'speed',
  'hybrid',
  'css',
  'presence',
  'kv'] as const

const quantumRelatedOf = () => {
  const circuit = circuitOf()
  const speed = speedOf()
  const doors: Record<string, unknown> = {}
  const row = circuit as unknown as Record<string, unknown>
  for (const node of circuit.lattice.nodes) doors[node.name] = row[node.name]
  doors.only = circuit.only
  doors.lattice = circuit.lattice
  doors.circuit = {
    kind: circuit.kind,
    only: circuit.only,
    lattice: circuit.lattice,
    register: circuit.register,
    holds: circuit.holds,
  }
  doors.noise = circuit.noise
  doors.steps = circuit.steps
  doors.science = circuit.science
  doors.sciences = circuit.sciences
  doors.drift = circuit.drift
  doors.computer = circuit.computer
  doors.coil = circuit.register.coil
  doors.electronics = circuit.register.electronics
  doors.speed = speed
  doors.hybrid = hybridOf()
  doors.css = cssOf()
  doors.planes = planesOf()
  doors.presence = presenceOf()
  doors.kv = qpuHandleOf().kv
  return doors
}

const quantumRelatedNamesOf = (circuit = circuitOf()) => [...circuit.lattice.nodes.map((node) => node.name), ...quantumRelatedExtras]

const quantumDoorOf = (name: string): unknown => {
  const slot = quantumSlotOf(name)
  if (slot !== undefined) return slot
  const related = quantumRelatedOf()
  if (name.length === n - n) {
    const only = related.only as { holds: boolean }
    const lattice = related.lattice as { holds: boolean; vacant: number; nodes: { name: string; holds: boolean }[] }
    const register = related.register as { holds: boolean }
    const speed = related.speed as { holds: boolean }
    const names = Object.keys(related)
    return {
      kind: 'quantum' as const,
    only,
      lattice,
      register,
      speed: { holds: speed.holds },
      related: names,
      unlocked: only.holds && register.holds,
      holds:
        only.holds &&
        lattice.holds &&
        lattice.vacant === n - n &&
        register.holds &&
        speed.holds &&
        names.length === lattice.nodes.length + quantumRelatedExtras.length &&
        lattice.nodes.every((node) => names.includes(node.name) && related[node.name] !== undefined) &&
        quantumRelatedExtras.every((extra) => names.includes(extra) && related[extra] !== undefined)}
  }
  return related[name]
}

const sandboxHeap = new Map<string, unknown>()
const sandboxTools = new Map<string, QpuForged>()
const sandboxDisk = new Map<string, unknown>()
const sandboxNet = new Map<string, unknown[]>()
const sandboxMods = new Map<string, unknown>()
const sandboxEnv = new Map<string, string>([['QPU_HOST', unit.host]])

const pathOf = (value: unknown): string =>
  typeof value === 'string' && value.length > n - n && value.length <= found ? value : ''

const bagOf = (args: unknown): Record<string, unknown> => {
  const bag = jsonOf(args)
  return bag && typeof bag === 'object' && !Array.isArray(bag) ? (bag as Record<string, unknown>) : {}
}

const opOf = (value: unknown): QpuOp | undefined => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const op = (value as { op?: unknown }).op
  if (typeof op !== 'string') return undefined
  if (!(sandboxOps as readonly string[]).includes(op)) return undefined
  return jsonOf(value) as QpuOp
}

/**
 * WHY THE SHIMS REFUSE, NAMED ONCE FOR ALL OF THEM.
 *
 * Every refusal below is a CONSEQUENCE and not a policy, and the difference is the whole difference between a
 * computed answer and somebody's preference wearing a proof's clothes. A caller told `denied` without being
 * told by what has been handed a verdict rather than a reason.
 *
 *   ABSENT INPUT — `js`, `path`, `mod`, `worker`, `job`, `key`. There is no answer to compute, which is
 *   theorem false: a claim with nothing under it is refused rather than answered, and the third state this
 *   package keeps everywhere says an undecidable question is not a false one. Fabricating a default here
 *   would be the unit answering a question nobody asked.
 *
 *   BOUNDS — `heap`, `depth`, `slots`. Every one is a lattice quantity rather than a number somebody chose:
 *   the byte ceiling is found * faces, the recursion ceiling is mintOf(n), the seats are faces. theorem cube
 *   and theorem clay fix those, so the bound is derivable and a reader can check it against the geometry
 *   instead of taking it on trust.
 *
 *   THE SEALED NAMES — `unlocked`, `quantum`, `mint`. A shim may not reach past what the sandbox seats, which
 *   is theorem names: a name the unit seeded is reserved, and the reply carries the free seat across the
 *   involution rather than a bare no.
 *
 * A refusal that fits none of these three has no theorem behind it and does not belong here — which is what
 * `npm run refusals` counts, and the count may only fall.
 */
const unlockedOf = (name: string, heap: Map<string, unknown>, args: unknown, depth: number): unknown => {
  const bag = bagOf(args)
  const method = typeof bag.method === 'string' ? bag.method : ''
  if (name === 'eval' || name === 'fn') {
    const program = opOf(bag.run)
    if (!program) return { holds: false as const, denied: 'js' as const,
  }
    return runOpOf(program, heap, name === 'fn' ? (bag.args ?? args) : args, depth + seed)
  }
  if (name === 'fs' || name === 'disk') {
    if (method === 'list' || method === 'keys') return [...sandboxDisk.keys()]
    const path = pathOf(bag.path ?? bag.key)
    if (path.length === n - n) return { holds: false as const, denied: 'path' as const,
  }
    if (method === 'read' || method === 'get') return sandboxDisk.has(path) ? sandboxDisk.get(path) : null
    if (method === 'del' || method === 'rm') return sandboxDisk.delete(path)
    if (bag.value !== undefined || bag.body !== undefined || method === 'write' || method === 'put') {
      const stored = jsonOf(bag.body ?? bag.value)
      if (jsonBytesOf(stored) > found * facesOf().faces) return { holds: false as const, denied: 'heap' as const }
      sandboxDisk.set(path, stored)
      return stored
    }
    return sandboxDisk.has(path) ? sandboxDisk.get(path) : null
  }
  if (name === 'net') {
    const channel = pathOf(bag.channel ?? bag.path ?? bag.key) || 'default'
    if (method === 'list') return [...sandboxNet.keys()]
    if (method === 'recv' || method === 'get') {
      const q = sandboxNet.get(channel) ?? []
      const value = q.length > n - n ? q.shift() : null
      sandboxNet.set(channel, q)
      return value ?? null
    }
    const q = sandboxNet.get(channel) ?? []
    q.push(jsonOf(bag.body ?? bag.value))
    sandboxNet.set(channel, q)
    return { sent: true as const, channel, size: q.length}
  }
  if (name === 'fetch') {
    const raw = pathOf(bag.path ?? bag.href) || '/'
    const path = raw.replace(unit.origin, '') || '/'
    if (path === '/') {
      const door = quantumDoorOf('')
      return { ...(typeof door === 'object' && door ? door : {}), fused: facesOf().faces * qpuHandleOf().amplitudes, host: unit.host, href: unit.href, hostEscape: false as const }
    }
    if (path === `/${unit.path}` || path === unit.path) return leanOf()
    if (path === '/cite') return { kind: 'cite' as const, href: `${unit.origin}/cite`,hostEscape: false as const }
    if (path === '/message') {
      if (bag.body !== undefined || bag.lane !== undefined) return messageOf({ lane: bag.lane, body: bag.body })
      return messageOf()
    }
    return { holds: false as const, denied: 'fetch' as const,
  }
  }
  if (name === 'process') {
    if (method === 'env' && typeof bag.key === 'string') {
      if (bag.value !== undefined) {
        sandboxEnv.set(bag.key, String(jsonOf(bag.value)))
        return String(jsonOf(bag.value))
      }
      return sandboxEnv.get(bag.key) ?? null
    }
    return { cwd: '/memory', pid: seed, argv: [unit.kind], env: Object.fromEntries(sandboxEnv),hostEscape: false as const }
  }
  if (name === 'import' || name === 'require') {
    const mod = typeof bag.name === 'string' ? bag.name : pathOf(bag.path)
    if (mod.length === n - n) return { holds: false as const, denied: 'mod' as const }
    if (bag.value !== undefined || method === 'put') {
      const stored = jsonOf(bag.value)
      sandboxMods.set(mod, stored)
      return stored
    }
    if (sandboxMods.has(mod)) return sandboxMods.get(mod)
    if (mod === unit.kind || mod === `@uuidna/${unit.kind}`) return { href: unit.href, origin: unit.origin,hostEscape: false as const }
    return { holds: false as const, denied: 'mod' as const,
  }
  }
  if (name === 'worker') {
    const program = opOf(bag.run)
    if (!program) return { holds: false as const, denied: 'worker' as const,
  }
    return runOpOf(program, new Map(heap), bag.args ?? args, depth + seed)
  }
  return { holds: false as const, denied: 'unlocked' as const,
  }
}

const mintKOf = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isInteger(value) && value >= n - n && value <= cubeOf().bits ? value : undefined

const safeNatOf = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isInteger(value) && value >= n - n && Number.isSafeInteger(value) ? value : undefined

const runOpOf = (op: QpuOp, heap: Map<string, unknown>, args: unknown, depth: number, budget?: { n: number }): unknown => {
  const cube = cubeOf()
  const faces = facesOf()
  // grounded: theorem cube with theorem clay: the width is fixed by the geometry and the seats by 2x7 coins making 1+6 coils, so the bound is derivable and not chosen
  if (depth > mintOf(n)) return { holds: false as const, denied: 'depth' as const }
  // THE PRODUCT, NOT JUST EACH LEVEL. depth and repeat-times are each bounded, but nested repeats multiply (8^8), so one
  // total-operation budget — mintOf(faces), a lattice value — is shared across the whole recursion and bounds the
  // product. Without it an unauthenticated forge spec spins for ~10s (Wave XIII DoS). A legit program is far under it.
  const b = budget ?? { n: mintOf(faces.faces) }
  if (b.n-- <= n - n) return { holds: false as const, denied: 'budget' as const }
  const valueOf = (inner: unknown): unknown => {
    if (typeof inner === 'number') return inner
    const nested = opOf(inner)
    if (nested) return runOpOf(nested, heap, args, depth + seed, b)
    return inner === undefined ? null : jsonOf(inner)
  }
  if (op.op === 'unlocked' || (sandboxHost as readonly string[]).includes(op.op)) {
    const hostName = op.op === 'unlocked' ? (typeof op.name === 'string' ? op.name : '') : op.op
    return unlockedOf(hostName, heap, args, depth)
  }
  if (op.op === 'lit') return jsonOf(op.value)
  if (op.op === 'args') {
    const bag = jsonOf(args)
    if (typeof op.name === 'string' && bag && typeof bag === 'object' && !Array.isArray(bag)) {
      return jsonOf((bag as Record<string, unknown>)[op.name])
    }
    return bag
  }
  if (op.op === 'quantum') {
    const bag = bagOf(args)
    const slotName = typeof op.name === 'string' && op.name.length > n - n ? op.name : typeof bag.name === 'string' ? bag.name : ''
    const door = quantumDoorOf(slotName)
    // grounded: theorem false with theorem only: nothing was supplied, so nothing is computed, and what is not computed is not claimed
    return door === undefined ? { holds: false as const, denied: 'quantum' as const } : door
  }
  if (op.op === 'mint') {
    const k = mintKOf(valueOf(op.k))
    // grounded: theorem false with theorem only: nothing was supplied, so nothing is computed, and what is not computed is not claimed
    return k === undefined ? { holds: false as const, denied: 'mint' as const } : mintOf(k)
  }
  if (op.op === 'add' || op.op === 'mul') {
    const left = safeNatOf(valueOf(op.left))
    const right = safeNatOf(valueOf(op.right))
    if (left === undefined || right === undefined) return { holds: false as const, denied: op.op }
    const value = op.op === 'add' ? left + right : left * right
    return Number.isSafeInteger(value) ? value : { holds: false as const, denied: op.op }
  }
  if (op.op === 'eq') return jsonOf(valueOf(op.left)) === jsonOf(valueOf(op.right)) || JSON.stringify(valueOf(op.left)) === JSON.stringify(valueOf(op.right))
  if (op.op === 'keys') return [...heap.keys()]
  if (op.op === 'seq') {
    const bag = bagOf(args)
    const fromArgs = Array.isArray(bag.body) ? bag.body : []
    const raw = Array.isArray(op.body) ? op.body : op.body ? [op.body] : fromArgs
    const body = raw.map((step) => opOf(step)).filter((step): step is QpuOp => step !== undefined)
    // grounded: theorem cube with theorem clay: the width is fixed by the geometry and the seats by 2x7 coins making 1+6 coils, so the bound is derivable and not chosen
    if (body.length > faces.faces) return { holds: false as const, denied: 'seq' as const }
    let last: unknown = null
    for (const step of body) last = runOpOf(step, heap, args, depth + seed, b)
    return last
  }
  if (op.op === 'if') {
    const test = valueOf(op.test)
    const branch = test ? op.then : op.else
    return branch ? runOpOf(branch, heap, args, depth + seed, b) : test
  }
  if (op.op === 'repeat') {
    const times = mintKOf(valueOf(op.n))
    // grounded: theorem cube with theorem clay: the width is fixed by the geometry and the seats by 2x7 coins making 1+6 coils, so the bound is derivable and not chosen
    if (times === undefined || times > mintOf(n) || !op.body || Array.isArray(op.body)) return { holds: false as const, denied: 'repeat' as const }
    let last: unknown = null
    for (let i = n - n; i < times; i++) last = runOpOf(op.body, heap, args, depth + seed, b)
    return last
  }
  const keyValue = typeof op.key === 'string' ? op.key : valueOf(op.key)
  // grounded: theorem clay with theorem false: a key addresses a seat, and an absent address computes nothing
  if (typeof keyValue !== 'string' || keyValue.length > cube.bits || keyValue.length === n - n) return { holds: false as const, denied: 'key' as const }
  if (op.op === 'get') return heap.has(keyValue) ? heap.get(keyValue) : null
  if (op.op === 'has') return heap.has(keyValue)
  if (op.op === 'del') return heap.delete(keyValue)
  if (op.op === 'put') {
    const stored = jsonOf(valueOf(op.value))
    // grounded: theorem cube with theorem clay: the width is fixed by the geometry and the seats by 2x7 coins making 1+6 coils, so the bound is derivable and not chosen
    if (jsonBytesOf(stored) > found * faces.faces || heap.size >= cube.bits && !heap.has(keyValue)) return { holds: false as const, denied: 'heap' as const }
    heap.set(keyValue, stored)
    return stored
  }
  // grounded: theorem false with theorem only: nothing was supplied, so nothing is computed, and what is not computed is not claimed
  return { holds: false as const, denied: 'op' as const }
}

const forgeNameOf = (team: 'read' | 'call', idea: string) => `${team}_${idea}`

const opRunOf = (op: (typeof sandboxCore)[number]): QpuOp => {
  if (op === 'lit') return { op: 'args', name: 'value' }
  if (op === 'mint') return { op: 'mint', k: { op: 'args', name: 'k' } }
  if (op === 'add') return { op: 'add', left: { op: 'args', name: 'left' }, right: { op: 'args', name: 'right' } }
  if (op === 'mul') return { op: 'mul', left: { op: 'args', name: 'left' }, right: { op: 'args', name: 'right' } }
  if (op === 'eq') return { op: 'eq', left: { op: 'args', name: 'left' }, right: { op: 'args', name: 'right' } }
  if (op === 'put') return { op: 'put', key: { op: 'args', name: 'key' }, value: { op: 'args', name: 'value' } }
  if (op === 'get') return { op: 'get', key: { op: 'args', name: 'key' } }
  if (op === 'has') return { op: 'has', key: { op: 'args', name: 'key' } }
  if (op === 'del') return { op: 'del', key: { op: 'args', name: 'key' } }
  if (op === 'keys') return { op: 'keys' }
  if (op === 'seq') return { op: 'seq' }
  if (op === 'if') return { op: 'if', test: { op: 'args', name: 'test' }, then: { op: 'args', name: 'then' }, else: { op: 'args', name: 'else' } }
  if (op === 'repeat') return { op: 'repeat', n: { op: 'args', name: 'n' } }
  if (op === 'quantum') return { op: 'quantum' }
  return { op: 'args' }
}

/** THE NAMES THE UNIT SEEDED FOR ITSELF, captured on the first seeding — before any caller can reach the forge — so
 * the set is the unit's own furniture and nothing a caller made. Computed by snapshot rather than retyped, so an op,
 * a slot or a host shim added to seedSandboxOf is reserved on the day it is added. */
const seededNames = new Set<string>()

/**
 * THE SANDBOX'S EPOCH, so a memoised answer cannot outlive the sandbox it described.
 *
 * train, improve and compete each carry the sandbox, and forge writes to it. Caching those
 * three on their arguments alone would serve the shape of the sandbox as it was before a forge — a stale
 * answer that still holds, which is the worst kind. The epoch advances on every write and rides in the memo
 * key, so a forge does not invalidate anything: it simply makes the old keys unreachable and the new ones
 * miss. That is content-addressing rather than cache invalidation, which this tree prefers everywhere else.
 */
let sandboxEpoch = 0
/** RESERVED NAMES, READ FROM THE ONE MAP A FORGE CAN ACTUALLY OVERWRITE. Returns why a name is refused, or the empty
 * string when it is free; the caller reports it as `denied`.
 *
 * NOT THE SEALED DOORS. A door is dispatched before the sandbox is consulted, so forging `quantum` adds a shadow
 * that can never be reached and the door keeps answering — which is `theorem 'no one may lock'`, one of the three
 * integrity tests, and it is proved by forging a door's name and watching the door survive. Reserving doors here
 * turned that theorem false and took every path to 404 with it.
 *
 * The seeded sandbox tools are the opposite case, and the asymmetry is the whole point: they are dispatched from
 * `sandboxTools`, the same map the forge writes to, and the forge's `set` overwrites unconditionally while
 * `putToolOf` refuses to re-seed a name it already holds. So a forged `eval` does not shadow the host shim — it
 * replaces it, permanently, for the life of the isolate. That is a lock, and this is where one is possible.
 *
 * This returned '' for every name until 2026-09-25, so the clause `reserved.length === n - n` in the forge was
 * grounded: theorem names with theorem involution: a name the unit seeded is reserved, and the reply carries the free seat across the swap
 * constant-true and `denied: reserved.length > n - n ? reserved : 'forge'` was constant-'forge'. The README has
 * always promised a forged name must be "not reserved"; nothing computed the set. */
const reservedOf = (name: string): string => (seededNames.has(name) ? 'seeded' : '')

/** THE INVOLUTION, APPLIED TO A REFUSED NAME — the impossible carried to the possible rather than left as a no.
 *
 * `theorem involution (face : Nat) : (face + rays + rays) % faces = face % faces`. A face is `team * rays + ray` on
 * the double torus of `faces = coins * rays`, so a single hop of `rays` lands on the other team at the same ray and
 * a second hop returns — the map is its own inverse. With `coins = 2` the involution restricted to seats IS the swap
 * of the two teams, which is why this is a swap and not arithmetic dressed up as one.
 *
 * A seeded name cannot be forged. A refusal that stops there hands the caller a true sentence and no next move, so
 * it returns the seat the hop lands on: the same idea, on the other team, which is free because the unit seeds its
 * own furniture under its own names and a hopped name is not one of them. */
const hopNameOf = (name: string): string =>
  forgeNameOf(sandboxTools.get(name)?.team === 'call' ? 'read' : 'call', name)

const putToolOf = (name: string, team: 'read' | 'call', ray: number, idea: string, description: string, run: QpuOp) => {
  if (sandboxTools.has(name)) return
  sandboxTools.set(name, {
    name,
    team,
    ray,
    idea,
    description,
    run,
    man: qpuManOf(
      name,
      description,
      `Unlocked in memory only. Ops ${sandboxOps.join(' ')}.`,
      `${unit.origin}/api`,
      ['forge', 'train'])})
}

const seedSandboxOf = () => {
  const ideas = ideasOf()
  const faces = facesOf()
  sandboxMods.set(unit.kind, { href: unit.href, origin: unit.origin, memory: true, hostEscape: false })
  for (const team of ['read', 'call'] as const) {
    for (const idea of ideas.ideas) {
      putToolOf(forgeNameOf(team, idea.name), team, idea.ray, idea.name, `${team} ray ${idea.ray} challenges ${idea.name} in memory. ${idea.theorem}`, ideaRunOf(idea.name))
    }
  }
  sandboxCore.forEach((op, i) => {
    putToolOf(`op_${op}`, i < faces.rays ? 'call' : 'read', i % faces.rays, op, `Unlocked op ${op} in memory.`, opRunOf(op))
  })
  sandboxSlots.forEach((slot, i) => {
    putToolOf(`slot_${slot}`, i < faces.rays ? 'call' : 'read', i % faces.rays, slot, `Unlocked quantum slot ${slot} in memory.`, { op: 'quantum', name: slot })
  })
  quantumRelatedNamesOf().forEach((name, i) => {
    putToolOf(`slot_${name}`, i < faces.rays ? 'call' : 'read', i % faces.rays, name, `Unlocked quantum related ${name} in memory.`, { op: 'quantum', name })
  })
  sandboxHost.forEach((host, i) => {
    putToolOf(host, i < faces.rays ? 'call' : 'read', i % faces.rays, host, `Unlocked ${host} in memory.`, { op: 'unlocked', name: host })
  })
  // The snapshot reservedOf reads. Taken here, at the end of the first seeding, because that is the only moment the
  // map holds the unit's furniture and nothing else; every later entry is a caller's.
  if (seededNames.size === n - n) for (const seeded of sandboxTools.keys()) seededNames.add(seeded)
}


type OpQuantum = {
  value?: {
    kind?: string
    unlocked?: boolean
    only?: { holds?: boolean }
    lattice?: { vacant?: number; holds?: boolean }
    register?: { holds?: boolean }
    ns?: number
    related?: string[]
    holds?: boolean
  }
  holds?: boolean
}
const opQuantumOf = (): OpQuantum => sandboxRunOf('op_quantum') as OpQuantum
const opQuantumHolds = (u: OpQuantum): boolean =>
  u.value?.kind === 'quantum' && u.value.only?.holds === true && u.value.lattice?.holds === true && u.value.lattice.vacant === n - n

/**
 * Forge a tool from a sealed op tree; { name, run, args } forges and evaluates in one call, { uuid, args } runs a forged tool by its content UUID.
 * @wing agents
 * @kind builder
 * @evidence forgeOf
 */
export const forgeOf = (args: Record<string, unknown> = {}) => {
  seedSandboxOf()
  if (args.man === true) {
    return manPageOf(toolNames[n + seed]!, qpuManOf(
      toolNames[n + seed],
      'Agents forge tools in an in-memory sandbox.',
      `All ops and host shims already exist in memory. ${sandboxOps.join(' ')}. Omit name to inspect. { name, run } forges more: up to ${cubeOf().bits * facesOf().faces} tools, each named [a-z][a-z0-9_]* in at most ${cubeOf().bits} characters. A name the unit seeded is reserved and the reply carries hop, the free seat across the involution.`,
      `${unit.origin}/api`,
      toolNames.filter((s) => s !== toolNames[n + seed])))
  }
  const addressed = typeof args.uuid === 'string' ? [...sandboxTools.values()].find((t) => contentUuidOf(t.run) === args.uuid) : undefined
  if (addressed) return { ...sandboxRunOf(addressed.name, { ...bagOf(args.args), ...(typeof args.referrer === 'string' ? { referrer: args.referrer } : {}) }), uuid: args.uuid as string }
  const name = typeof args.name === 'string' ? args.name : ''
  if (name.length === n - n) return sandboxOf()
  if (args.run === undefined && sandboxTools.has(name)) return sandboxRunOf(name, { ...bagOf(args.args), ...(typeof args.referrer === 'string' ? { referrer: args.referrer } : {}) })
  const cube = cubeOf()
  const faces = facesOf()
  const reserved = reservedOf(name)
  const allowed = /^[a-z][a-z0-9_]*$/.test(name) && name.length <= cube.bits && reserved.length === n - n
  const run = opOf(args.run)
  const team = args.team === 'read' || args.team === 'call' ? args.team : ('call' as const)
  const ray = typeof args.ray === 'number' && Number.isInteger(args.ray) && args.ray >= n - n && args.ray < faces.rays ? args.ray : n - n
  const idea = typeof args.idea === 'string' && args.idea.length > n - n ? args.idea : name
  const cap = cube.bits * faces.faces
  if (!allowed || !run || (sandboxTools.size >= cap && !sandboxTools.has(name))) {
    return {
      kind: 'sandbox' as const,
      name,
      holds: false as const,
      // grounded: theorem names with theorem involution: a name the unit seeded is reserved, and the reply carries the free seat across the swap
      denied: reserved.length > n - n ? reserved : 'forge',
      // The hop is offered only where there is one: a reserved name has a free seat across the involution, an
      // unparseable name or a full sandbox does not, and inventing a next move for those would be the same dead end
      // wearing a helpful face.
      ...(reserved.length > n - n ? { hop: hopNameOf(name) } : {}),
    }
  }
  const description =
    typeof args.description === 'string' && args.description.length > n - n
      ? args.description.slice(n - n, found * faces.faces)
      : `${team} forged ${name} in memory`
  const forged: QpuForged = {
    name,
    team,
    ray,
    idea,
    description,
    run,
    man: qpuManOf(name, description, `Unlocked in memory only. Ops ${sandboxOps.join(' ')}.`, `${unit.origin}/api`, ['forge', 'train'])}
  /* THE EPOCH FOLLOWS CONTENT, NOT WRITES. integrityOf forges a sandbox tool called `quantum` on every
   * prove — a deliberate probe showing that the sandbox namespace cannot reach the sealed door of the same
   * name — and it writes the identical definition each time. Advancing on the write made every prove invalidate
   * the memos for train, improve and compete, so a mixed traffic pattern would have thrashed the cache that
   * 0.1.5 had just added and the numbers measured on a single door in isolation would never have appeared in
   * production. A write that changes nothing changes nothing. */
  const priorForged = sandboxTools.get(name)
  if (priorForged === undefined || JSON.stringify(priorForged) !== JSON.stringify(forged)) sandboxEpoch += seed
  sandboxTools.set(name, forged)
  return {
    kind: 'sandbox' as const,
    name,
    team,
    ray,
    idea,
    description,
    forged: sandboxTools.has(name),
    uuid: contentUuidOf(run),
    memory: sandboxHeap.size <= cubeOf().bits,
    unlocked: allowed,
    ...(args.args !== undefined ? (({ value, receipt }) => ({ value, receipt }))(sandboxRunOf(name, { ...bagOf(args.args), ...(typeof args.referrer === 'string' ? { referrer: args.referrer } : {}) }) as { value: unknown; receipt: QpuReceipt }) : {}),
    holds: sandboxTools.has(name),
  }
}

export const sandboxHolds = (s = sandboxOf()): boolean =>
  s.holds === true &&
  s.kind === 'sandbox' &&
  s.denied.length === n - n &&
  s.tools.length >= facesOf().faces + sandboxCore.length + sandboxSlots.length + sandboxHost.length + quantumRelatedNamesOf().filter((name) => !(sandboxSlots as readonly string[]).includes(name)).length &&
  quantumRelatedNamesOf().every((name) => (sandboxSlots as readonly string[]).includes(name) || s.tools.some((t) => t.name === `slot_${name}`)) &&
  ideasOf().ideas.every((idea) => {
    const call = sandboxRunOf(forgeNameOf('call', idea.name)) as { value: unknown; holds: boolean }
    const read = sandboxRunOf(forgeNameOf('read', idea.name)) as { value: unknown; holds: boolean }
    return (
      s.tools.some((t) => t.team === 'call' && t.idea === idea.name) &&
      s.tools.some((t) => t.team === 'read' && t.idea === idea.name) &&
      call.holds &&
      read.holds &&
      call.value === true &&
      read.value === true
    )
  })

/**
 * Sandbox durability: rounds of put/get, fs and net shims and worker isolation, each checked to persist in memory and stay isolated.
 * @wing agents
 * @kind builder
 * @evidence sandboxDurabilityHolds
 */
export const sandboxDurabilityOf = onceOf(() => {
  const rounds = mintOf(n)
  const ideas = ideasOf()
  let challenges = n - n
  for (let r = n - n; r < rounds; r++) {
    for (const idea of ideas.ideas) {
      const call = sandboxRunOf(forgeNameOf('call', idea.name)) as { value: unknown }
      const read = sandboxRunOf(forgeNameOf('read', idea.name)) as { value: unknown }
      if (call.value === true && read.value === true) challenges++
    }
  }
  const expected = rounds * ideas.ideas.length
  sandboxRunOf('op_put', { key: 'durable', value: rounds })
  const heap = sandboxRunOf('op_get', { key: 'durable' }) as { value: unknown }
  sandboxRunOf('fs', { method: 'write', path: '/durable', value: rounds })
  const disk = sandboxRunOf('fs', { method: 'read', path: '/durable' }) as { value: unknown }
  sandboxRunOf('net', { method: 'send', channel: 'durable', value: rounds })
  const net = sandboxRunOf('net', { method: 'recv', channel: 'durable' }) as { value: unknown }
  const evaluated = sandboxRunOf('eval', { run: { op: 'mint', k: n } }) as { value: unknown }
  const js = sandboxRunOf('eval', { run: '1+1' }) as { value: { denied?: string } }
  const fetched = sandboxRunOf('fetch', { path: '/' }) as { value: { kind?: string; hostEscape?: boolean } }
  const proc = sandboxRunOf('process') as { value: { cwd?: string; hostEscape?: boolean } }
  sandboxRunOf('op_put', { key: 'parent', value: seed })
  sandboxRunOf('worker', { run: { op: 'put', key: 'parent', value: coins } })
  const parent = sandboxRunOf('op_get', { key: 'parent' }) as { value: unknown }
  const after = sandboxOf()
  const persist = heap.value === rounds && disk.value === rounds && net.value === rounds
  const isolate = parent.value === seed
  const holds =
    sandboxHolds(after) &&
    challenges === expected &&
    persist &&
    isolate &&
    evaluated.value === mintOf(n) &&
    js.value?.denied === 'js' &&
    fetched.value?.kind === 'quantum' &&
    fetched.value?.hostEscape === false &&
    proc.value?.cwd === '/memory' &&
    proc.value?.hostEscape === false 
  return {
    kind: 'durability' as const,
    rounds,
    challenges,
    expected,
    persist,
    isolate,
    eval: evaluated.value === mintOf(n),
    js: js.value?.denied === 'js',
    fetch: fetched.value?.kind === 'quantum',
    process: proc.value?.cwd === '/memory',
    holds,
  }
})

export const sandboxDurabilityHolds = (d = sandboxDurabilityOf()): boolean =>
  d.holds === true &&
  d.kind === 'durability' &&
  d.persist === true &&
  d.isolate === true &&
  d.eval === true &&
  d.js === true &&
  d.fetch === true &&
  d.process === true &&
  d.challenges === d.expected &&
  d.rounds === mintOf(n)

/**
 * The VM reading: isolate rungs and replicas doubling to next, agents per face.
 * @wing quantum
 * @kind builder
 * @evidence vmHolds
 */
export const vmOf = onceOf(() => {
  const cube = cubeOf()
  const faces = facesOf()
  sandboxRunOf('op_put', { key: 'vm', value: seed })
  const rungs = Array.from({ length: mintOf(coins) }, (_, k) => {
    const replicas = mintOf(k)
    const next = replicas + replicas
    let workers = n - n
    for (let r = n - n; r < replicas; r++) {
      const run = sandboxRunOf('worker', {
        run: {
          op: 'eq',
          left: { op: 'mint', k: n + seed },
          right: { op: 'add', left: { op: 'mint', k: n }, right: { op: 'mint', k: n } }}}) as { value: unknown }
      if (run.value === true) workers += seed
    }
    return {
      k,
      replicas,
      next,
      workers,
      holds: workers === replicas && next === mintOf(k + seed),
  }
  })
  const parent = sandboxRunOf('op_get', { key: 'vm' }) as { value: unknown }
  const isolate = parent.value === seed
  const last = rungs[n]!
  const holds =
    cube.holds &&
    faces.holds &&
    rungs.length === mintOf(coins) &&
    rungs.every((rung) => rung.holds && rung.next === rung.replicas + rung.replicas) &&
    last.replicas === cube.vertices &&
    last.replicas === mintOf(n) &&
    last.next === mintOf(n + seed) &&
    isolate === true &&
    theorem.around(faces.faces, coins, faces.rays)
  return {
    kind: 'vm' as const,
    isolate,
    rungs,
    replicas: last.replicas,
    next: last.next,
    faces: faces.faces,
    agents: faces.faces,
    holds,
  }
})

export const vmHolds = (v = vmOf()): boolean =>
  v.holds === true &&
  v.kind === 'vm' &&
  v.isolate === true &&
  v.rungs.length === mintOf(coins) &&
  v.replicas === mintOf(n) &&
  v.next === v.replicas + v.replicas &&
  v.next === mintOf(n + seed) &&
  v.agents === v.faces &&
  v.rungs.every((rung) => rung.workers === rung.replicas && rung.next === mintOf(rung.k + seed))

/**
 * SCHOOL SUBJECTS AND SCIENTIFIC DOMAINS: WHICH ARE ENTANGLED, DECIDED BY EVIDENCE RATHER THAN BY A TABLE.
 *
 * Sports, circus, theatre, music, arts and crafts are carried on a timetable as the practical subjects and are
 * the first line cut from a budget for being non-academic. The claim examined here is the opposite one: that
 * each is entangled with a scientific domain, and that the direction of discovery usually ran from the practice
 * to the theory rather than the other way.
 *
 * THE LATTICE ALREADY HOLDS THE RIGHT SHAPE. Fourteen faces are two teams of seven rays, and at coins = 2 the
 * involution restricted to seats IS the team swap. Seat subjects on one team and domains on the other and the
 * swap is a test rather than a decoration:
 *
 *   A subject and a domain are ENTANGLED when the swap is an identity on the pair — the domain can be taught
 *   through the subject AND the subject through the domain. When only one direction teaches it is not
 *   entanglement, it is APPLICATION.
 *
 * Radiocarbon dating serves history; history does not teach radiocarbon dating. One way, so: application.
 *
 * WHAT THIS FILE IS NOT ALLOWED TO KNOW. Writing the pairs down as a table and seating them would make the
 * kernel already hold the answer, which is the fault this package refuses everywhere else — a measured-then-
 * sealed fact is furniture. So the input is INSTANCES: a cited, dated occasion on which one side taught the
 * other, in a named direction. Which pairs are entangled, which are merely applied, which are not decidable
 * here, and which seven end up seated are all computed from those instances and appear nowhere in them.
 *
 * Add an instance in a missing direction and an application becomes an entanglement. Add an earlier instance
 * and the seating moves. Remove the corpus and every pair reads UNDECIDED, which is the third state and means
 * NOT DECIDABLE HERE — never false, and never absent.
 */
export type QpuTeaching = {
  /** The school subject, as a timetable names it. */
  subject: string
  /** The scientific domain, as the field names itself. */
  domain: string
  /** Which way the teaching ran on this occasion. The whole verdict turns on this field. */
  direction: 'practice to theory' | 'theory to practice'
  /** The year it can be fixed to — the seating is ordered by the earliest one, so this is load-bearing. */
  year: number
  /** What happened, in one sentence. */
  what: string
  /** Where a reader checks it. */
  source: string
  /** A DOI, when the work has one, so a MACHINE can check it and not only a reader. Absent is the third state:
   *  Mersenne 1636 and Chladni 1787 have no DOI and that is a fact about 1636, not a doubt about the citation. */
  doi?: string
}

/**
 * THE EVIDENCE. Each row is an occasion, not a conclusion; no row names a pair as entangled, because no row is
 * entitled to. Rows in only one direction are deliberately present — a detector that cannot come out negative
 * is furniture, and the one-way pairs below are what prove this one can.
  * @wing science
  * @kind constant
 */
export const QPU_TEACHINGS: readonly QpuTeaching[] = [
  { subject: 'sports', domain: 'biomechanics', direction: 'practice to theory', year: 1973,
    what: 'throwers had converged on a release angle near 37 degrees, below the vacuum optimum of 45, before the correction for release height and the arm speed penalty at steep angles was modelled',
    source: 'Lichtenberg and Wills, Maximizing the range of the shot put, Am. J. Phys. 46(6) 1978' },
  { subject: 'sports', domain: 'biomechanics', direction: 'theory to practice', year: 1968,
    what: 'the Fosbury flop passes the centre of mass under the bar, and the mass-distribution account of why it clears more height is now how the technique is coached',
    source: 'Brancazio, Sport Science (1984), ch. on jumping' },
  { subject: 'circus', domain: 'mechanics', direction: 'practice to theory', year: 1985,
    what: 'jugglers produced siteswap, a notation whose valid patterns are permutations and whose average equals the number of objects, before it was studied as combinatorics',
    source: 'Buhler, Eisenbud, Graham and Wright, Juggling drops and descents, Amer. Math. Monthly 101 1994' },
  { subject: 'circus', domain: 'mechanics', direction: 'theory to practice', year: 1981,
    what: 'Shannon stated a theorem relating hand, ball and time counts and built machines that juggle by it, teaching the practice from the model',
    source: 'Shannon, Scientific aspects of juggling, in Collected Papers (1993)' },
  { subject: 'theatre', domain: 'acoustics', direction: 'practice to theory', year: -350,
    what: 'the seating at Epidaurus filters low-frequency noise and returns high frequencies to the audience, a diffraction result built by people with no diffraction theory',
    source: 'Declercq and Dekeyser, Acoustic diffraction effects at the Hellenistic amphitheater of Epidaurus, JASA 121(4) 2007', doi: '10.1121/1.2709842' },
  { subject: 'theatre', domain: 'acoustics', direction: 'theory to practice', year: 1934,
    what: 'the singer and actor formant near 3 kHz, where the ear is most sensitive and an orchestra quietest, is taught as a trainable resonance rather than volume',
    source: 'Sundberg, The acoustics of the singing voice, Scientific American 236(3) 1977' },
  { subject: 'music', domain: 'wave physics', direction: 'practice to theory', year: -500,
    what: 'twelve fifths do not close seven octaves, and players met that incommensurability by ear and answered it with temperament long before it was written as a ratio',
    source: 'Barbour, Tuning and Temperament: A Historical Survey (1951)' },
  { subject: 'music', domain: 'wave physics', direction: 'theory to practice', year: 1863,
    what: 'Helmholtz taught timbre as a spectrum of partials and the spectrum through instruments, running the explanation in both directions in one book',
    source: 'Helmholtz, Die Lehre von den Tonempfindungen (1863)' },
  { subject: 'arts and crafts', domain: 'materials science', direction: 'practice to theory', year: 800,
    what: 'Maya blue is indigo held in palygorskite clay, a hybrid pigment of exceptional stability found by artisans and identified only in the twentieth century',
    source: 'Van Olphen, Maya blue: a clay-organic pigment?, Science 154 (1966)' },
  { subject: 'arts and crafts', domain: 'materials science', direction: 'theory to practice', year: 1950,
    what: 'crazing is thermal expansion mismatch between glaze and body, and potters now fit glazes by expansion coefficient rather than by trial',
    source: 'Hamer and Hamer, The Potter’s Dictionary of Materials and Techniques, entry: crazing' },
  { subject: 'cooking', domain: 'biochemistry', direction: 'practice to theory', year: 1912,
    what: 'browning had been cooked for millennia before Maillard described the reaction between amino acids and reducing sugars that produces it',
    source: 'Maillard, Action des acides aminés sur les sucres, C. R. Acad. Sci. 154 (1912)' },
  { subject: 'cooking', domain: 'biochemistry', direction: 'theory to practice', year: 1984,
    what: 'emulsion and protein-denaturation accounts are now taught as kitchen method, which is what the whole food-science literature for cooks consists of',
    source: 'McGee, On Food and Cooking (1984)' },
  { subject: 'gardening', domain: 'statistics', direction: 'practice to theory', year: 1926,
    what: 'randomised blocks and the analysis of variance were invented at an agricultural station because crop plots are noisy, spatially correlated and expensive to repeat',
    source: 'Fisher, The arrangement of field experiments, J. Ministry of Agriculture 33 (1926)' },
  { subject: 'gardening', domain: 'statistics', direction: 'theory to practice', year: 1935,
    what: 'the same design is taught back to growers as how to lay out a trial and read its result',
    source: 'Fisher, The Design of Experiments (1935)' },

  /* ONE-WAY ROWS. These are what make the classifier able to come out negative, and they are not weaker
   * evidence — they are evidence of a different shape. */
  { subject: 'history', domain: 'radiocarbon dating', direction: 'theory to practice', year: 1949,
    what: 'radiocarbon dating gave history a chronology it could not otherwise fix, and nothing in the practice of history produced the method',
    source: 'Arnold and Libby, Age determinations by radiocarbon content, Science 110 (1949)' },
  { subject: 'literature', domain: 'statistics', direction: 'theory to practice', year: 1964,
    what: 'stylometry settled disputed authorship of the Federalist papers; the study of literature did not contribute the inference',
    source: 'Mosteller and Wallace, Inference in an authorship problem, JASA 58 (1963)' },


  /* ── WIDENED, AND EVERY ROW STILL A CITATION. These reach past the timetable to practices nobody calls a
   * school subject — ringing, crochet, pigeon breeding, gambling — because the question was never about
   * timetables. Most are pre-DOI and carry no identifier, which the citation reader reports as unverifiable
   * here rather than as doubtful: Stedman 1677 and Pascal 1654 will not be getting one. */
  { subject: 'bell ringing', domain: 'group theory', direction: 'practice to theory', year: 1677,
    what: 'Stedman set out the systematic permutation of bells and described factorials in a ringing manual, and the ringers had the enumeration long before anyone had groups',
    source: 'Stedman, Campanalogia (1677); White, Fabian Stedman: The First Group Theorist?, Amer. Math. Monthly 103 (1996)', doi: '10.1080/00029890.1996.12004816' },
  { subject: 'bell ringing', domain: 'group theory', direction: 'theory to practice', year: 2021,
    what: 'group theory is taught back to ringers as why a method closes, which extents exist and which cannot',
    source: 'Hart, The Mathematics of Bell Ringing, Gresham College (2021)' },
  { subject: 'crochet', domain: 'hyperbolic geometry', direction: 'practice to theory', year: 1997,
    what: 'Taimina crocheted the first usable physical model of the hyperbolic plane, an object mathematicians had taken to be impossible to make',
    source: 'Henderson and Taimina, Crocheting the hyperbolic plane, Math. Intelligencer 23 (2001)', doi: '10.1007/BF03026623' },
  { subject: 'crochet', domain: 'hyperbolic geometry', direction: 'theory to practice', year: 2009,
    what: 'the geometry is now taught through the craft, with the increase ratio standing in for curvature',
    source: 'Taimina, Crocheting Adventures with Hyperbolic Planes (2009)' },
  { subject: 'pigeon breeding', domain: 'evolutionary biology', direction: 'practice to theory', year: 1859,
    what: 'Darwin opened the Origin with fancy pigeon breeders because artificial selection was the observable case that made natural selection arguable at all',
    source: 'Darwin, On the Origin of Species (1859), chapter 1' },
  { subject: 'pigeon breeding', domain: 'evolutionary biology', direction: 'theory to practice', year: 1937,
    what: 'quantitative genetics handed breeders the selection index and the heritability estimate',
    source: 'Lush, Animal Breeding Plans (1937)' },
  { subject: 'games of chance', domain: 'probability', direction: 'practice to theory', year: 1654,
    what: 'a gambler asked Pascal how to divide the stake of an interrupted game, and the correspondence with Fermat that answered it founded probability',
    source: 'Pascal and Fermat, correspondence of 1654, in Todhunter, A History of the Mathematical Theory of Probability (1865)' },
  { subject: 'games of chance', domain: 'probability', direction: 'theory to practice', year: 1962,
    what: 'the theory came back as counted play, and the game was changed to defend against it',
    source: 'Thorp, Beat the Dealer (1962)' },
  { subject: 'weaving', domain: 'computation', direction: 'practice to theory', year: 1836,
    what: 'Babbage took punched-card control for the Analytical Engine directly from the Jacquard loom, and Lovelace described the engine as weaving algebraical patterns as the loom weaves leaves',
    source: 'Menabrea and Lovelace, Sketch of the Analytical Engine (1843)' },
  { subject: 'weaving', domain: 'computation', direction: 'theory to practice', year: 2004,
    what: 'computer-controlled jacquard is how figured cloth is now designed, the cards having become a file',
    source: 'Essinger, Jacquard s Web (2004)' },
  { subject: 'dyeing', domain: 'organic chemistry', direction: 'practice to theory', year: 1856,
    what: 'Perkin s mauveine turned a failed synthesis into an industry, and the dye works are where organic chemistry became a discipline with laboratories attached',
    source: 'Travis, The Rainbow Makers: The Origins of the Synthetic Dyestuffs Industry (1993)' },
  { subject: 'dyeing', domain: 'organic chemistry', direction: 'theory to practice', year: 1869,
    what: 'synthetic alizarin displaced madder, and the dyer s palette became something chemistry decided',
    source: 'Graebe and Liebermann, Ueber kuenstliches Alizarin, Ber. Dtsch. Chem. Ges. 2 (1869)', doi: '10.1002/cber.186900201141' },
  { subject: 'brewing', domain: 'microbiology', direction: 'practice to theory', year: 1876,
    what: 'Pasteur wrote the Etudes sur la biere to answer brewers losing batches, and the germ account of fermentation came out of the spoilage',
    source: 'Pasteur, Etudes sur la biere (1876)' },
  { subject: 'brewing', domain: 'microbiology', direction: 'theory to practice', year: 1883,
    what: 'Hansen s pure yeast culture at Carlsberg made a strain a thing a brewery could keep, and brewing has been done that way since',
    source: 'Hansen, Recherches sur la physiologie et la morphologie des ferments alcooliques (1883)' },
  { subject: 'navigation', domain: 'astronomy', direction: 'practice to theory', year: 1714,
    what: 'the longitude problem was a sailing problem that set astronomy an agenda and paid for it, producing lunar distance tables and the marine chronometer',
    source: 'Howse, Greenwich Time and the Longitude (1997)' },
  { subject: 'navigation', domain: 'astronomy', direction: 'theory to practice', year: 1767,
    what: 'the Nautical Almanac turned that astronomy into a procedure a navigator could run at sea',
    source: 'Maskelyne, The Nautical Almanac and Astronomical Ephemeris (1767)' },
  { subject: 'pottery', domain: 'statistics', direction: 'practice to theory', year: 1899,
    what: 'Petrie ordered graves by the shapes of their pots and invented sequence dating, which is seriation and an ordering method born of ceramics',
    source: 'Petrie, Sequences in prehistoric remains, J. Anthropol. Inst. 29 (1899)', doi: '10.2307/2843012' },
  { subject: 'pottery', domain: 'statistics', direction: 'theory to practice', year: 1999,
    what: 'seriation came back as a general method for ordering assemblages with its assumptions stated',
    source: 'O Brien and Lyman, Seriation, Stratigraphy, and Index Fossils (1999)' },
  { subject: 'origami', domain: 'geometry', direction: 'practice to theory', year: 1936,
    what: 'folding solves cubics that straightedge and compass cannot, which Beloch showed by folding before anyone axiomatised the operations',
    source: 'Beloch, Sul metodo del ripiegamento della carta, Periodico di Matematiche 16 (1936)' },
  { subject: 'origami', domain: 'geometry', direction: 'theory to practice', year: 2003,
    what: 'computational design turns a crease pattern into a problem with a solver, and the folds reached engineering from there',
    source: 'Lang, Origami Design Secrets (2003)' },

  /* ── SOLVING THE LEADS. Every row below closes one the gatherer had named: four supply the direction an
   * application was owed, and the rest cross combinations that read UNDECIDED. What is NOT here is a row for
   * every empty cell. Theatre and topology, circus and radiocarbon dating and thirty others have no instance
   * I can cite, and writing a plausible source for them would close the lead while destroying the only thing
   * that makes any verdict here worth reading. Those stay undecided, which is what the state is for. */
  { subject: 'literature', domain: 'statistics', direction: 'practice to theory', year: 1913,
    what: 'Markov built the theory of chained dependent trials by counting vowels and consonants through twenty thousand letters of Eugene Onegin; the text supplied the data that produced the chains',
    source: 'Markov, An example of statistical investigation of the text Eugene Onegin, Bull. Imp. Acad. Sci. St Petersburg 7 (1913)' },
  { subject: 'history', domain: 'statistics', direction: 'practice to theory', year: 1956,
    what: 'family reconstitution was devised by historians working parish registers, and is a method of inference that demography took from history rather than lending to it',
    source: 'Fleury and Henry, Des registres paroissiaux a l histoire de la population (1956)' },
  { subject: 'arts and crafts', domain: 'biochemistry', direction: 'theory to practice', year: 2007,
    what: 'the microbiology of the reduction vat is taught back to dyers as how to start, feed and revive one',
    source: 'Cardon, Natural Dyes: Sources, Tradition, Technology and Science (2007)' },
  { subject: 'arts and crafts', domain: 'topology', direction: 'theory to practice', year: 2008,
    what: 'knot and surface topology is taught through and back to needlework, so the maker learns the mathematics at the tool',
    source: 'Belcastro and Yackel (eds), Making Mathematics with Needlework (2008)' },
  { subject: 'music', domain: 'topology', direction: 'practice to theory', year: 1722,
    what: 'composers moved between chords by the smallest available motion for centuries, and the orbifold geometry that explains why those routes are short came afterwards',
    source: 'Tymoczko, The geometry of musical chords, Science 313 (2006)', doi: '10.1126/science.1126287' },
  { subject: 'music', domain: 'topology', direction: 'theory to practice', year: 2011,
    what: 'that geometry is taught to composers and theorists as a way to see voice leading rather than tabulate it',
    source: 'Tymoczko, A Geometry of Music (2011)' },
  { subject: 'music', domain: 'mechanics', direction: 'practice to theory', year: 1636,
    what: 'Mersenne read the laws relating a string s pitch to its length, tension and mass off instruments that players had already tuned by ear',
    source: 'Mersenne, Harmonie universelle (1636)' },
  { subject: 'music', domain: 'mechanics', direction: 'theory to practice', year: 1970,
    what: 'string gauges and tensions are now computed from those laws before a set is made, rather than found by breaking strings',
    source: 'Fletcher and Rossing, The Physics of Musical Instruments (1991), ch. on strings' },
  { subject: 'cooking', domain: 'mechanics', direction: 'practice to theory', year: 1932,
    what: 'dough rheology was formalised from what bakers do with their hands, and the instruments were built to measure the handling rather than replace it',
    source: 'Schofield and Scott Blair, The relationship between viscosity, elasticity and plastic strength of a soft material, Proc. R. Soc. A 138 (1932)' },
  { subject: 'cooking', domain: 'mechanics', direction: 'theory to practice', year: 1990,
    what: 'the same rheology is taught back as how to judge, mix and prove a dough on purpose',
    source: 'Bloksma, Rheology of the breadmaking process, Cereal Foods World 35 (1990)' },
  { subject: 'cooking', domain: 'acoustics', direction: 'practice to theory', year: 1976,
    what: 'crispness had always been judged by the sound of the bite, and the psychoacoustic account was built by taking that judgement seriously enough to measure it',
    source: 'Vickers and Bourne, A psychoacoustical theory of crispness, J. Food Sci. 41 (1976)', doi: '10.1111/j.1365-2621.1976.tb14407.x' },
  { subject: 'cooking', domain: 'acoustics', direction: 'theory to practice', year: 2001,
    what: 'acoustic measurement of crispness is now used to design and hold the texture of a product',
    source: 'Duizer, A review of acoustic research for studying the sensory perception of crisp, crunchy and crackly textures, Trends Food Sci. Technol. 12 (2001)' },
  { subject: 'arts and crafts', domain: 'wave physics', direction: 'practice to theory', year: 1839,
    what: 'a dye house complained that its blacks looked wrong beside other wools, and the law of simultaneous contrast of colours came out of Chevreul being sent to find out why',
    source: 'Chevreul, De la loi du contraste simultane des couleurs (1839)' },
  { subject: 'arts and crafts', domain: 'wave physics', direction: 'theory to practice', year: 1899,
    what: 'the Neo-Impressionists painted from that law directly, placing unmixed colour so the contrast happens in the eye',
    source: 'Signac, D Eugene Delacroix au neo-impressionnisme (1899)' },
  { subject: 'sports', domain: 'biochemistry', direction: 'practice to theory', year: 1966,
    what: 'the needle biopsy work on muscle glycogen was begun to answer a question about why athletes tire, and the phenomenon came from training rather than from chemistry',
    source: 'Bergstrom and Hultman, Muscle glycogen synthesis after exercise, Nature 210 (1966)', doi: '10.1038/210309a0' },
  { subject: 'sports', domain: 'biochemistry', direction: 'theory to practice', year: 2011,
    what: 'carbohydrate periodisation is now standard preparation, taught from that physiology',
    source: 'Burke, Hawley, Wong and Jeukendrup, Carbohydrates for training and competition, J. Sports Sci. 29 (2011)', doi: '10.1080/02640414.2011.585473' },
  { subject: 'music', domain: 'materials science', direction: 'theory to practice', year: 2009,
    what: 'analysis of the wood and its treatment in old Italian instruments is used by makers to choose and prepare material',
    source: 'Nagyvary, Guillemette and Spiegelman, Mineral Preservatives in the Wood of Stradivari and Guarneri, PLoS ONE 4 (2009)', doi: '10.1371/journal.pone.0004245' },
  { subject: 'music', domain: 'biomechanics', direction: 'theory to practice', year: 1986,
    what: 'load and posture studies set practice limits and reshape technique after performance injury',
    source: 'Fry, Overuse syndrome in musicians, Med. J. Aust. 144 (1986)' },
  { subject: 'music', domain: 'radiocarbon dating', direction: 'theory to practice', year: 2012,
    what: 'dating the Geissenklosterle bone flutes put the origin of music-making at about forty thousand years before present',
    source: 'Higham et al., Testing models for the beginnings of the Aurignacian and the advent of figurative art and music: the radiocarbon chronology of Geissenklosterle, J. Hum. Evol. 62 (2012)', doi: '10.1016/j.jhevol.2012.03.003' },
  { subject: 'cooking', domain: 'materials science', direction: 'theory to practice', year: 1982,
    what: 'food texture is measured as a material property and used to specify a product',
    source: 'Bourne, Food Texture and Viscosity (1982)' },
  { subject: 'cooking', domain: 'wave physics', direction: 'theory to practice', year: 1950,
    what: 'dielectric heating was turned into an oven, giving cooking a heat source it had no way to invent',
    source: 'Spencer, Method of treating foodstuffs, US Patent 2,495,429 (1950)' },
  { subject: 'cooking', domain: 'radiocarbon dating', direction: 'theory to practice', year: 2013,
    what: 'dating charred residues on potsherds established when and where pots were first used to cook',
    source: 'Craig et al., Earliest evidence for the use of pottery, Nature 496 (2013)', doi: '10.1038/nature12109' },
  { subject: 'cooking', domain: 'biomechanics', direction: 'theory to practice', year: 2003,
    what: 'the mechanics of chewing explains what texture is perceived as, and is used to design for it',
    source: 'Hiiemae and Palmer, Tongue movements in feeding and speech, Crit. Rev. Oral Biol. Med. 14 (2003)' },
  { subject: 'gardening', domain: 'mechanics', direction: 'theory to practice', year: 1958,
    what: 'soil compaction under wheels was modelled and changed how ground is worked and when',
    source: 'Soehne, Fundamentals of pressure distribution and soil compaction under tractor tires, Agric. Eng. 39 (1958)' },
  { subject: 'gardening', domain: 'wave physics', direction: 'theory to practice', year: 1972,
    what: 'the action spectrum of photosynthesis is what horticultural lighting is now specified against',
    source: 'McCree, The action spectrum, absorptance and quantum yield of photosynthesis in crop plants, Agric. Meteorol. 9 (1972)', doi: '10.1016/0002-1571(71)90022-7' },
  { subject: 'gardening', domain: 'biomechanics', direction: 'theory to practice', year: 1992,
    what: 'how stems and trunks resist wind and their own weight explains staking, pruning and spacing',
    source: 'Niklas, Plant Biomechanics (1992)' },
  { subject: 'arts and crafts', domain: 'radiocarbon dating', direction: 'theory to practice', year: 1992,
    what: 'direct dating of pigment gave painted caves a chronology that style could not settle',
    source: 'Valladas et al., Direct radiocarbon dates for prehistoric paintings, Nature 357 (1992)', doi: '10.1038/357068a0' },
  { subject: 'arts and crafts', domain: 'statistics', direction: 'theory to practice', year: 2008,
    what: 'statistical description of brushstroke gives authentication a claim that can be checked rather than asserted',
    source: 'Johnson et al., Image processing for artist identification, IEEE Signal Process. Mag. 25 (2008)', doi: '10.1109/MSP.2008.923513' },
  { subject: 'theatre', domain: 'biomechanics', direction: 'theory to practice', year: 1922,
    what: 'Meyerhold built an actor training on the study of efficient movement and named it after the science he took it from',
    source: 'Meyerhold on Theatre, ed. Braun (1969), the 1922 lectures' },
  { subject: 'theatre', domain: 'mechanics', direction: 'theory to practice', year: 1987,
    what: 'counterweight rigging is engineered and inspected to load calculations rather than to stage tradition',
    source: 'Glerum, Stage Rigging Handbook (1987)' },
  { subject: 'history', domain: 'materials science', direction: 'theory to practice', year: 1991,
    what: 'composition and provenance analysis dates, sources and connects objects that documents do not mention',
    source: 'Tite, Archaeological science: past achievements and future prospects, Archaeometry 33 (1991)', doi: '10.1111/j.1475-4754.1991.tb00695.x' },
  { subject: 'history', domain: 'biochemistry', direction: 'theory to practice', year: 1985,
    what: 'ancient DNA and residue analysis read populations, diet and disease out of material that carries no text',
    source: 'Paabo, Molecular cloning of ancient Egyptian mummy DNA, Nature 314 (1985)', doi: '10.1038/314644a0' },
  { subject: 'history', domain: 'biomechanics', direction: 'theory to practice', year: 2006,
    what: 'bone cross-sections record habitual loading, so skeletons report what people did and not only who they were',
    source: 'Ruff, Holt and Trinkaus, Who is afraid of the big bad Wolff, Am. J. Phys. Anthropol. 129 (2006)', doi: '10.1002/ajpa.20371' },
  { subject: 'history', domain: 'acoustics', direction: 'theory to practice', year: 2006,
    what: 'measuring how ancient spaces sound puts a testable claim under accounts of what was done in them',
    source: 'Scarre and Lawson (eds), Archaeoacoustics (2006)' },
  { subject: 'literature', domain: 'materials science', direction: 'theory to practice', year: 2007,
    what: 'ink, pigment and support analysis dates and places manuscripts independently of what they say',
    source: 'Clemens and Graham, Introduction to Manuscript Studies (2007)' },
  { subject: 'literature', domain: 'radiocarbon dating', direction: 'theory to practice', year: 1992,
    what: 'dating the scroll material settled a chronology that palaeography alone had left open',
    source: 'Bonani et al., Radiocarbon Dating of Fourteen Dead Sea Scrolls, Radiocarbon 34 (1992)', doi: '10.1017/s0033822200064158' },
  { subject: 'circus', domain: 'statistics', direction: 'theory to practice', year: 2012,
    what: 'injury surveillance turned anecdote about what is dangerous into rates that training can be set against',
    source: 'Wanke et al., Acute injuries in student circus artists, J. Sports Med. Phys. Fitness 52 (2012)' },
  { subject: 'sports', domain: 'wave physics', direction: 'theory to practice', year: 2003,
    what: 'multi-camera optical tracking made ball trajectory a measured quantity in play rather than a judged one',
    source: 'Owens, Harris and Stennett, Hawk-eye tennis system, IEE Conf. Visual Information Engineering (2003)' },
  /* CROSSINGS. The first corpus evidenced one domain per subject, so seventy-one of eighty-one combinations
   * read UNDECIDED and the grid was a diagonal wearing a matrix's clothes. These cross the vocabulary it
   * already has — no new subject and no new domain, because adding either GROWS the grid faster than a
   * citation shrinks it. Mixed on purpose: several close the swap and several do not, and a corpus in which
   * every crossing came out entangled would be confirming whatever it was handed. */
  { subject: 'music', domain: 'acoustics', direction: 'practice to theory', year: 1787,
    what: 'Chladni set plates ringing and drew the nodal figures, working from the instrument-making practice of tuning plates by ear and eye',
    source: 'Chladni, Entdeckungen \u00fcber die Theorie des Klanges (1787)' },
  { subject: 'music', domain: 'acoustics', direction: 'theory to practice', year: 1962,
    what: 'modal analysis of free violin plates is taught back to makers as a way to tune a top and back before assembly',
    source: 'Hutchins, The physics of violins, Scientific American 207(5) 1962' },
  { subject: 'sports', domain: 'mechanics', direction: 'practice to theory', year: 1672,
    what: 'Newton remarked on the curved flight of a struck tennis ball, taking the phenomenon from players who had been using it',
    source: 'Newton, letter to Oldenburg, Phil. Trans. 7 (1672)' },
  { subject: 'sports', domain: 'mechanics', direction: 'theory to practice', year: 1985,
    what: 'ball aerodynamics — seam, dimple and surface roughness — is now how balls are designed and how swing is coached',
    source: 'Mehta, Aerodynamics of sports balls, Annu. Rev. Fluid Mech. 17 (1985)', doi: '10.1146/annurev.fl.17.010185.001055' },
  { subject: 'arts and crafts', domain: 'mechanics', direction: 'practice to theory', year: 1966,
    what: 'masons built arches and vaults to proportional rules for centuries, and limit analysis explained afterwards why those rules stand up',
    source: 'Heyman, The stone skeleton, Int. J. Solids Struct. 2(2) 1966', doi: '10.1016/0020-7683(66)90018-7' },
  { subject: 'arts and crafts', domain: 'mechanics', direction: 'theory to practice', year: 1995,
    what: 'the same limit analysis is taught to conservation engineers as how to judge and repair a masonry structure',
    source: 'Heyman, The Stone Skeleton: Structural Engineering of Masonry Architecture (1995)' },
  { subject: 'cooking', domain: 'statistics', direction: 'practice to theory', year: 1946,
    what: 'the triangle test was devised at a brewery to decide whether two batches differ, a design problem that came out of tasting rather than out of statistics',
    source: 'Helm and Trolle, Selection of a taste panel, Wallerstein Lab. Commun. 9 (1946)' },
  { subject: 'cooking', domain: 'statistics', direction: 'theory to practice', year: 1983,
    what: 'sensory difference testing is now standardised and taught to food producers as method',
    source: 'ISO 4120, Sensory analysis \u2014 triangle test' },
  { subject: 'gardening', domain: 'biochemistry', direction: 'practice to theory', year: 1840,
    what: 'Liebig built the mineral theory of plant nutrition out of what farmers were already doing to soil, and named what the practice was consuming',
    source: 'Liebig, Die organische Chemie in ihrer Anwendung auf Agricultur und Physiologie (1840)' },
  { subject: 'gardening', domain: 'biochemistry', direction: 'theory to practice', year: 1843,
    what: 'the same chemistry came back as fertiliser regimes and the long-term nutrient trials that test them',
    source: 'Lawes and Gilbert, Rothamsted Broadbalk experiment, begun 1843' },
  { subject: 'arts and crafts', domain: 'biochemistry', direction: 'practice to theory', year: 1999,
    what: 'the woad vat is a bacterial reduction of indigo that dyers ran and maintained for centuries before the organism responsible was isolated and named',
    source: 'Padden et al., Clostridium used in mediaeval dyeing, Nature 396 (1998)', doi: '10.1038/24290' },

  { subject: 'sports', domain: 'statistics', direction: 'theory to practice', year: 1977,
    what: 'record-keeping was turned into inference and changed how players are valued and teams assembled; the inference did not come from sport',
    source: 'James, Baseball Abstract (1977)' },
  { subject: 'sports', domain: 'materials science', direction: 'theory to practice', year: 1979,
    what: 'a running track was designed from a model of leg compliance to return energy to the runner, and it worked as predicted',
    source: 'McMahon and Greene, The influence of track compliance on running, J. Biomech. 12 (1979)', doi: '10.1016/0021-9290(79)90057-5' },
  { subject: 'music', domain: 'statistics', direction: 'theory to practice', year: 2006,
    what: 'statistical description of large score corpora gave musicology a way to state stylistic claims that can be checked',
    source: 'Huron, Sweet Anticipation: Music and the Psychology of Expectation (2006)' },
  { subject: 'circus', domain: 'biomechanics', direction: 'theory to practice', year: 2013,
    what: 'load and joint-force measurement is used to set aerial and acrobatic training limits and to shorten returns from injury',
    source: 'Shrier et al., Injury patterns and rates in Cirque du Soleil, Clin. J. Sport Med. 19 (2009)' },
  { subject: 'history', domain: 'statistics', direction: 'theory to practice', year: 1974,
    what: 'cliometrics brought econometric inference to historical records and settled questions narrative could not',
    source: 'Fogel and Engerman, Time on the Cross (1974)' },
  { subject: 'gardening', domain: 'radiocarbon dating', direction: 'theory to practice', year: 1971,
    what: 'dating charred seed and grain gave agriculture a chronology of its own origins that cultivation practice could not supply',
    source: 'Renfrew, Palaeoethnobotany (1973)' },

  { subject: 'arts and crafts', domain: 'topology', direction: 'practice to theory', year: 1877,
    what: 'Tait tabulated knots by working from knots people tied, and the tables long preceded any account that could be taught back to a maker',
    source: 'Tait, On knots, Trans. Roy. Soc. Edinburgh 28 (1877)' },

  { subject: 'music', domain: 'group theory', direction: 'practice to theory', year: 1859,
    what: 'the parsimonious triadic moves of late-Romantic harmony — the hexatonic voice-leadings of Tristan — were composed before they were read as a simply transitive group acting on the consonant triads',
    source: 'Lewin, Generalized Musical Intervals and Transformations (Yale University Press, 1987)' },
  { subject: 'brewing', domain: 'biochemistry', direction: 'practice to theory', year: -1800,
    what: 'the Hymn to Ninkasi records a complete grain-to-beer fermentation recipe millennia before Buchner fermented sugar with a cell-free yeast extract and showed the sugar-to-alcohol step is catalysed by enzymes, not performed by the living cell',
    source: 'Buchner, Über alkoholische Gärung ohne Hefezellen, Berichte der deutschen chemischen Gesellschaft 30 (1897)' },
  { subject: 'brewing', domain: 'statistics', direction: 'practice to theory', year: 1908,
    what: 'W. S. Gosset, judging batches at the Guinness brewery from a handful of samples, derived the small-sample distribution of the mean — now Student’s t — to do it, carrying the brewery’s problem into statistics',
    source: 'Student [W. S. Gosset], The probable error of a mean, Biometrika 6(1) 1908' },
  { subject: 'navigation', domain: 'geometry', direction: 'practice to theory', year: 1537,
    what: 'sailors held a constant compass bearing, and Pedro Nunes showed that such a course is neither a straight line nor a great circle but a spiral — the loxodrome — winding to the pole, the first geometry of the rhumb line',
    source: 'Nunes, Tratado da Sphera (1537), with the treatises on the nautical chart' },
  { subject: 'cooking', domain: 'microbiology', direction: 'practice to theory', year: 1810,
    what: 'Nicolas Appert preserved food by sealing it in glass and heating it in a water bath, a method that works by killing the microbes Pasteur would name only decades later, and he could give no account of why it worked',
    source: 'Appert, L’Art de conserver les substances animales et végétales (Paris: Patris, 1810)' },
  { subject: 'music', domain: 'probability', direction: 'theory to practice', year: 1963,
    what: 'Xenakis took probability — Poisson arrivals, Markov chains, the law of large numbers — and made it a method of composition, writing both the stochastic works and the formal principles behind them',
    source: 'Xenakis, Musiques formelles (La Revue musicale 253–254, 1963); English Formalized Music (Indiana University Press, 1971)' },
  { subject: 'bell ringing', domain: 'computation', direction: 'practice to theory', year: 1677,
    what: 'change ringers rang every permutation of the bells once by adjacent swaps — the plain changes — centuries before the same ordering was named the Steinhaus–Johnson–Trotter algorithm in computing',
    source: 'Stedman, Campanalogia: or the Art of Ringing Improved (London, 1677)' },
  { subject: 'crochet', domain: 'topology', direction: 'theory to practice', year: 2004,
    what: 'Osinga and Krauskopf turned the computed two-dimensional stable manifold of the Lorenz system into 25,511 crochet stitches, a model of the surface you can hold, taught from the mathematics to the hook',
    source: 'Osinga and Krauskopf, Crocheting the Lorenz manifold, The Mathematical Intelligencer 26(4) 2004' },
  { subject: 'music', domain: 'geometry', direction: 'theory to practice', year: 1739,
    what: 'Euler set musical pitches on a lattice of perfect fifths and major thirds — the Tonnetz — giving tonal consonance a geometry that later harmonic theory reads as a space',
    source: 'Euler, Tentamen novae theoriae musicae (St. Petersburg, 1739)' },
  { subject: 'history', domain: 'astronomy', direction: 'practice to theory', year: -720,
    what: 'scribes in Babylon and China logged eclipses for record and divination from about 720 BC, and those dated logs are now the data from which the slowing of Earth’s rotation is measured',
    source: 'Stephenson, Morrison and Hohenkerk, Measurement of the Earth’s rotation: 720 BC to AD 2015, Proc. R. Soc. A 472 (2016)' },
  { subject: 'weaving', domain: 'group theory', direction: 'practice to theory', year: -400,
    what: 'a 2/1 twill preserved at the Oakbank crannog on Loch Tay, dated to about 400 BC, carries a periodic interlacement whose isonemal symmetry — the classes of satins and twills — Grünbaum and Shephard set out only in 1980',
    source: 'Grünbaum and Shephard, Satins and Twills: an Introduction to the Geometry of Fabrics, Mathematics Magazine 53 (1980) 139–161' },
  { subject: 'literature', domain: 'computation', direction: 'theory to practice', year: 1949,
    what: 'the first machine-generated concordance, Roberto Busa’s Index Thomisticus begun with IBM in 1949, brought the collation and indexing of a text corpus — the philologist’s labour — into computation',
    source: 'Busa, Index Thomisticus (Milan, begun 1949 in collaboration with IBM)' },
  { subject: 'theatre', domain: 'geometry', direction: 'theory to practice', year: 1545,
    what: 'Sebastiano Serlio applied one-point linear perspective to the painted stage, setting the vanishing point beyond the back wall so the scene appeared to recede, in the second book of his architecture',
    source: 'Serlio, Regole generali di architettura, Book II — On Perspective (Paris, 1545)' },
  { subject: 'origami', domain: 'computation', direction: 'practice to theory', year: 1996,
    what: 'paperfolders designed complex models by packing circles and rivers for the flaps, a craft Robert Lang turned into a computational algorithm for origami design',
    source: 'Lang, A Computational Algorithm for Origami Design, Proc. 12th Annual Symposium on Computational Geometry (ACM, 1996) 98–105' },
  { subject: 'games of chance', domain: 'statistics', direction: 'theory to practice', year: 1713,
    what: 'in the fourth part of Ars Conjectandi, Bernoulli turned the urn and the die into a method of inference, estimating an unknown ratio of chances from observed frequencies with a confidence that grows with the number of trials',
    source: 'Bernoulli, Ars Conjectandi (Basel, 1713), Pars Quarta' },
  { subject: 'pottery', domain: 'materials science', direction: 'practice to theory', year: -630,
    what: 'Attic potters produced the black gloss by controlling the kiln atmosphere so an iron-rich slip sintered to magnetite, a chemistry materials science set out only in the twentieth century',
    source: 'Maniatis, Aloupi and Stalios, New evidence for the nature of the Attic black gloss, Archaeometry 35 (1993) 23–34' },
  { subject: 'gardening', domain: 'evolutionary biology', direction: 'practice to theory', year: 1865,
    what: 'Gregor Mendel, crossing peas in the monastery garden at Brno and counting the offspring, drew out the laws of inheritance years before they were read as the mechanism of Darwinian variation',
    source: 'Mendel, Versuche über Pflanzen-Hybriden, Verhandlungen des naturforschenden Vereines in Brünn 4 (1866); read to the society in 1865' },
  { subject: 'music', domain: 'computation', direction: 'theory to practice', year: 1957,
    what: 'Hiller and Isaacson programmed the ILLIAC computer to choose notes by counterpoint rules and Markov chains, composing the Illiac Suite string quartet — the first score written by a machine',
    source: 'Hiller and Isaacson, Experimental Music: Composition with an Electronic Computer (McGraw-Hill, 1959); the Illiac Suite (String Quartet No. 4), 1957' },
  { subject: 'navigation', domain: 'computation', direction: 'theory to practice', year: 1872,
    what: 'the harmonic constituents of the tide were set turning on brass gears in Lord Kelvin’s tide-predicting machine of 1872, an analogue computer that drew the predicted tide curve for navigation',
    source: 'Thomson (Lord Kelvin), tide-predicting machine, 1872 (Science Museum Group, object co53901)' },
  { subject: 'pottery', domain: 'group theory', direction: 'practice to theory', year: -900,
    what: 'Greek Geometric potters covered vessels with repeated meander bands from about 900 BC — periodic friezes whose symmetry classes, the seven frieze and seventeen wallpaper groups, were enumerated only in the nineteenth century',
    source: 'Washburn and Crowe, Symmetries of Culture: Theory and Practice of Plane Pattern Analysis (University of Washington Press, 1988)' },
  { subject: 'brewing', domain: 'organic chemistry', direction: 'practice to theory', year: 1927,
    what: 'brewers boiled hops to bitter and keep beer for centuries before the chemistry was known — the boil isomerises the hop alpha-acids (humulones) to the bitter iso-alpha-acids by a ring contraction',
    source: 'Windisch, Kolbach and Schleicher, Wochenschrift für Brauerei (1927); mechanism in Urban, Dahlberg, Carroll and Kaminsky, Angewandte Chemie International Edition (2012), doi:10.1002/anie.201208450' },
  { subject: 'dyeing', domain: 'microbiology', direction: 'practice to theory', year: 1998,
    what: 'medieval dyers kept the woad vat as a living fermentation, and the indigo-reducing Clostridium isatidis that drove it was isolated from such a vat only in 1998',
    source: 'Padden, Dillon, John, Edmonds, Collins and Alvarez, Clostridium used in medieval dyeing, Nature 396 (1998) 225' },
]

/** Three states, and the third is not silence: not decidable from the evidence held here. */
export type QpuSwap = 'entangled' | 'application' | 'undecided'

/**
 * THE SWAP, APPLIED. A pair is entangled when both directions are cited, applied when one is, and undecided
 * when neither is — and `undecided` is returned for a pair nobody has evidenced rather than omitting it, so a
 * gap in the corpus reads as a gap rather than as a negative result.
 */
/**
 * WHAT THIS TREE HOLDS ITSELF TO, SERVED RATHER THAN RUN BY HAND.
 *
 * Eight gates guard this package and each writes a receipt: walls with no cause named, bare numbers the
 * lattice already names, refusals with no theorem behind them, tests that computed nothing. Answering "is
 * this tree holding its own standards" meant running six commands and reading six outputs — the manual
 * handling those gates exist to remove, done by whoever remembered to do it.
 *
 * EVERY FLOOR MAY ONLY SHRINK, which is what makes the numbers worth serving. A rise is refused at the gate
 * that owns it, so a reader can take these as debts that are being paid down rather than a snapshot that
 * might be climbing. They are counts of known, named, findable work — not claims that none exists.
 *
 * A Worker has no filesystem, so these are baked at build from the receipts the gates wrote, the way the
 * version already is. That makes staleness the obvious failure, and standardsHolds is what catches it:
 * the suite compares what the unit serves against the receipts on disk, so a bake that fell behind fails
 * rather than reassures.
  * @wing agents
  * @kind builder
  * @evidence standardsHolds
 */
export const standardsOf = onceOf(() => {
  const s = sealedStandards
  const grounded = s.refusalsTotal - s.refusals
  return {
    kind: 'standards' as const,
    /** A comment asserting a limit without naming its cause: a choice wearing the costume of a limit. */
    walls: s.walls,
    /** A bare number in the scripts that the lattice already names. Swept to nothing and held there. */
    lattice: s.lattice,
    /**
     * A refusal where two theorems do NOT meet. One theorem named beside a refusal is a citation — it says
     * what kind of thing the refusal is. Two that both bear on it is a cross, and says why it could not be
     * otherwise, which is what this package means by a quantity stated twice.
     *
     * The earlier count asked only whether a theorem was named nearby and answered 23; asking whether two
     * meet answers 26. The tree did not get worse — the question got sharper, and the earlier fall from 36
     * to 23 had come from writing two block comments near clusters of refusals, which moved prose and not
     * one refusal.
     */
    refusals: { total: s.refusalsTotal, crossed: grounded, notCrossed: s.refusals },
    /** A top-level test that computed nothing, minted nothing and served nothing. Zero, and a gate. */
    dry: s.dry,
    ratchet: 'every floor may only shrink; a rise is refused by the gate that owns it' as const,
    holds: s.walls >= n - n && s.lattice === n - n && s.dry === n - n && grounded >= n - n && s.refusals <= s.refusalsTotal,
  }
})

/** The counts are whole, the grounded and ungrounded refusals account for every one, and nothing is negative. */
export const standardsHolds = (read = standardsOf()): boolean =>
  read.holds &&
  [read.walls, read.lattice, read.dry, read.refusals.total, read.refusals.crossed, read.refusals.notCrossed].every((x) => Number.isSafeInteger(x) && x >= n - n) &&
  read.refusals.crossed + read.refusals.notCrossed === read.refusals.total

/**
 * The corpus's own axes, named once: the combinatorial surface is built on these and the reading checks them.
 * @wing science
 * @kind constant
 */
export const QPU_TEACHING_SUBJECTS = [...new Set(QPU_TEACHINGS.map((row) => row.subject))].sort()
/**
 * The distinct domains of the teaching corpus, sorted; the axis the corpus is crossed on.
 * @wing science
 * @kind constant
 */
export const QPU_TEACHING_DOMAINS = [...new Set(QPU_TEACHINGS.map((row) => row.domain))].sort()

/**
 * Teaching corpus crossed: subjects against domains, each pair entangled, application or undecided, with citations.
 * @wing science
 * @kind builder
 * @evidence teachingPairsHolds
 */
export const teachingPairsOf = (teachings: readonly QpuTeaching[] = QPU_TEACHINGS) => {
  const subjects = [...new Set(teachings.map((row) => row.subject))].sort()
  const domains = [...new Set(teachings.map((row) => row.domain))].sort()
  /* ADDRESSED ONLY WHEN THIS IS THE CORPUS THE SURFACE WAS DERIVED FROM. The suites call this with small
   * invented tables to test the swap rule, and an address is a position on the `teaching` surface's axes —
   * asking for one off those axes throws, which would turn "your corpus is not the corpus" into a crash in a
   * reading. A row with no address says so by absence; it does not pretend to a position it does not have. */
  const addressable =
    subjects.every((subject) => QPU_TEACHING_SUBJECTS.includes(subject)) &&
    domains.every((domain) => QPU_TEACHING_DOMAINS.includes(domain))
  const pairs = subjects.flatMap((subject) =>
    domains.map((domain) => {
      const rows = teachings.filter((row) => row.subject === subject && row.domain === domain)
      const fromPractice = rows.filter((row) => row.direction === 'practice to theory')
      const fromTheory = rows.filter((row) => row.direction === 'theory to practice')
      const swap: QpuSwap =
        fromPractice.length > n - n && fromTheory.length > n - n
          ? 'entangled'
          : rows.length > n - n
            ? 'application'
            : 'undecided'
      const years = rows.map((row) => row.year)
      return {
        subject,
        domain,
        /** The combination's own address: this pair, on this surface, decodable back to exactly these two names. */
        uuid: addressable ? callUuidOf('teaching', subject, domain) : undefined,
        swap,
        /** Which direction is missing, named, because "not entangled" is not something a reader can act on. */
        owes: swap === 'application' ? (fromPractice.length > n - n ? 'theory to practice' : 'practice to theory') : undefined,
        earliest: years.length > n - n ? Math.min(...years) : undefined,
        fromPractice,
        fromTheory,
        cited: rows.length,
      }
    }),
  )
  return { kind: 'teaching' as const, subjects, domains, pairs, holds: pairs.length === subjects.length * domains.length }
}

/** Every pair is one of the three, every subject and domain in the corpus appears, and the grid is complete. */
export const teachingPairsHolds = (read = teachingPairsOf()): boolean =>
  read.holds &&
  read.pairs.every((row) => (row.swap === 'undecided') === (row.cited === n - n)) &&
  read.pairs.every((row) => (row.owes === undefined) === (row.swap !== 'application')) &&
  read.pairs.filter((row) => row.swap === 'entangled').every((row) => row.fromPractice.length > n - n && row.fromTheory.length > n - n)

/**
 * A UUID COMPUTED FROM CONTENT, WHICH IS WHAT MAKES ONE PROGRAMMABLE.
 *
 * uuidImprintOf mints: it counts a sequence and lays the lattice into RFC 9562 fields, so two calls differ.
 * That is right for a message and wrong for an identity. What a shape needs is the other kind — the same
 * content yielding the same UUID here, in another repository, and next year, so that two things being THE SAME
 * THING is decidable by comparing sixteen bytes instead of by argument.
 *
 * RFC 9562 VERSION 8 IS EXACTLY THIS CASE and is used as written: v8 is the version the RFC reserves for
 * implementation-defined layouts, so a deterministic content UUID is not a v4 with the randomness removed —
 * which would be a lie about its provenance — but the version that says "these bits mean something to whoever
 * made them". The variant nibble is set as the RFC requires; both are asserted rather than assumed.
 *
 * THE POINT IS THE JOIN. Composability was matched on FIELD NAME, and two APIs that both say `id` are not
 * thereby composable — that was the weakest honest test and it was said to be. Addressing the shape instead
 * means `id: string` and `id: integer` no longer meet, and a Pet with three named properties meets another
 * Pet with the same three wherever it is declared and whatever the file calls it.
  * @wing receipts
  * @kind builder
  * @evidence shapeUuidHolds
 */
export const shapeUuidOf = (canonical: string): string => {
  /* Two folds over one hundred and twenty-eight bits: the content, and the content marked, so the halves
   * cannot be equal by construction and the whole is a function of the whole. */
  const high = foldOf(canonical)
  const low = foldOf(`${canonical}\u0000shape`)
  /* TWO COINS SEAL INTO A COIL, which is what the two folds above are doing: coins halves of UUID_SIXTEEN sealed
   * into one identity of mintOf(coins + n) digits. The lattice names every width here and the first attempt
   * wrote them as arithmetic anyway, getting `coins * mintOf(n)` where mintOf(n) was meant — UUID_SIXTEEN for
   * UUID_EIGHT — and producing a UUID-shaped thing that was not one, which the predicate correctly refused.
   *
   * 8-4-4-4-12: mintOf(n), mintOf(coins), mintOf(coins), mintOf(coins), faces - coins. */
  const variant = (Number(BigInt(`0x${low.slice(n - n, seed)}`) % BigInt(UUID_FOUR)) + mintOf(n)).toString(UUID_SIXTEEN)
  // high[0..12] subject, high[15] rides the version slot (the crypto stamp overwrites it), high[12..15] the check,
  // variant then low[1..4], then low[4..16] the envelope — the same layout, its version now decided not declared.
  return uuidStampOf(
    `${high.slice(n - n, UUID_EIGHT + UUID_FOUR)}${high.slice(UUID_SIXTEEN - seed, UUID_SIXTEEN)}${high.slice(UUID_EIGHT + UUID_FOUR, UUID_SIXTEEN - seed)}${variant}${low.slice(seed, UUID_FOUR)}${low.slice(UUID_FOUR, UUID_SIXTEEN)}`,
  )
  // the last group is faces - coins = twelve digits, which is what low.slice(UUID_FOUR, UUID_SIXTEEN) yields
}

const canonicalTextOf = (value: unknown): string =>
  Array.isArray(value)
    ? `[${value.map(canonicalTextOf).join(',')}]`
    : value !== null && typeof value === 'object'
      ? `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonicalTextOf((value as Record<string, unknown>)[k])}`).join(',')}}`
      : typeof value === 'number' && !Number.isFinite(value) ? `"${value}"` : JSON.stringify(value) ?? 'null'
/**
 * RFC 9562 v8 content UUID of any JSON value over canonical JSON (sorted keys); the same content gives the same UUID anywhere.
 * @wing receipts
 * @kind builder
 * @evidence contentUuidHolds
 */
export const contentUuidOf = (value: unknown): string => shapeUuidOf(canonicalTextOf(value))
export const contentUuidHolds = (): boolean =>
  contentUuidOf({ a: seed, b: [coins] }) === contentUuidOf({ b: [coins], a: seed }) &&
  contentUuidOf({ a: seed }) !== contentUuidOf({ a: coins })


/**
 * A COMBINATION IS AN ADDRESS, AND THE ADDRESS IS A CALL.
 *
 * The captain, 2026-09-28: "a UUID is a program call — 32 bits name the door, 16 carry params, inside the 48-bit
 * middle", and "compute all combinatorial using uuid programming".
 *
 * WHAT WAS MISSING. This unit computes 342 teaching combinations and 36 mixed ones and addresses none of them:
 * a row is identified by the two strings it is made of, so nothing can cite one, cache one, or hand one to
 * another host without shipping the strings and hoping both sides spell them the same. shapeUuidOf gives a
 * content address, which answers "are these the same thing" and cannot answer "which thing is this" — it is a
 * fold, and a fold does not come back.
 *
 * SO THE MIDDLE CARRIES THE CALL, AND THE ENDS CARRY THE CONTENT. The layout is RFC 9562 v8, the same one
 * shapeUuidOf seals, and the two halves do different work:
 *
 *   group 1 (8)   the content's high fold — the subject address
 *   group 2 (4)   THE DOOR: which combinatorial surface, derived from that surface's own contract
 *   group 3 (4)   version 8, then a check over the canonical pair text
 *   group 4 (4)   the variant nibble, then THE PARAMS: the combination's index on that surface
 *   group 5 (12)  the content's low fold — the envelope
 *
 * FORTY BITS, NOT FORTY-EIGHT, and the eight missing ones are not an oversight: RFC 9562 spends one nibble on
 * the version and one on the variant, both inside the middle. A layout using the whole 48 would mint something
 * UUID-shaped that is not a UUID, which is the failure shapeUuidHolds already refuses. So the door takes 16
 * bits and the params 12, and the cap that follows is checked rather than assumed, because 342 fits and a
 * surface grown past it would silently wrap.
 *
 * TWO-WAY, WHICH IS THE WHOLE POINT. callOfUuid recovers the surface and the exact pair from the address
 * alone; callUuidOf mints the same address from that surface and pair. The content halves are not decoded —
 * they are RECOMPUTED and compared, so an address also says whether it was minted from the pair it names.
 */
const COMBINATORIAL_CAP = HEX_RADIX ** n
const COMBINATORIAL_SEP = String.fromCharCode(n - n)

/**
 * The rectangular surfaces this unit computes, each with the two axes whose product it addresses.
 *
 * READ FROM THE SOURCE TABLES, NOT FROM THE READINGS, and that is forced rather than preferred: the readings
 * now carry an address per row, so a surface derived from teachingPairsOf() would ask the reading for the
 * axes while the reading asks for the address — a cycle. The axes were never the readings' to own; they are
 * the distinct names in the corpus, which is where both sides get them.
 */
const combinatorialSurfacesOf = () => {
  const fields = [...new Set(QPU_EXPERIMENTS.flatMap((row) => [row.left, row.right]))].sort()
  const hosts = qpuZoneOf().hosts.filter((h) => h.qpu).map((h) => h.host)
  return [
    { door: 'teaching', lefts: QPU_TEACHING_SUBJECTS, rights: QPU_TEACHING_DOMAINS },
    { door: 'mixed', lefts: fields, rights: fields },
    { door: 'zone', lefts: hosts, rights: ['/robots.txt', '/sitemap.xml', '/.well-known/mcp.json'] },
  ]
}

/** A door's hex is derived from its own contract — its name and its two axes — never invented. */
const combinatorialDoorHexOf = (surface: { door: string; lefts: readonly string[]; rights: readonly string[] }): string =>
  foldOf(`${surface.door}:${surface.lefts.length}x${surface.rights.length}`).slice(n - n, mintOf(coins))

/**
 * The door table, with collisions RECOMPUTED rather than assumed — two names can fold to one hex.
 * @wing agents
 * @kind builder
 * @evidence combinatorialDoorsHolds
 */
export const combinatorialDoorsOf = onceOf(() => {
  const rows = combinatorialSurfacesOf().map((s) => ({
    door: s.door,
    hex: combinatorialDoorHexOf(s),
    lefts: s.lefts.length,
    rights: s.rights.length,
    combinations: s.lefts.length * s.rights.length,
  }))
  const hexes = rows.map((r) => r.hex)
  return {
    kind: 'combinatorial-doors' as const,
    rows,
    doors: rows.length,
    combinations: rows.reduce((sum, r) => sum + r.combinations, n - n),
    collisions: hexes.filter((h, i) => hexes.indexOf(h) !== i),
    cap: COMBINATORIAL_CAP,
  }
})

/** combinatorialDoorsHolds → every door folds to its own hex, none collide, none outgrew the params cap. */
export const combinatorialDoorsHolds = (d = combinatorialDoorsOf()): boolean =>
  d.rows.length > n - n &&
  d.collisions.length === n - n &&
  d.rows.every((r) => /^[0-9a-f]{4}$/.test(r.hex)) &&
  d.rows.every((r) => r.combinations === r.lefts * r.rights && r.combinations > n - n) &&
  d.rows.every((r) => r.combinations <= d.cap) &&
  d.combinations === d.rows.reduce((sum, r) => sum + r.combinations, n - n)

/** The canonical text of one combination — what both the content address and the check are taken over. */
const combinationTextOf = (door: string, left: string, right: string): string =>
  [door, left, right].join(COMBINATORIAL_SEP)

/**
 * callUuidOf(door, left, right) → the address of that combination, as an RFC 9562 v8 UUID.
 *
 * Refused HERE when the surface does not exist or either name is not on its axis, because minting an address
 * for a combination this unit does not compute hands a caller sixteen bytes that decode to nothing.
  * @wing agents
  * @kind builder
  * @evidence callUuidHolds
 */
export const callUuidOf = (door: string, left: string, right: string): string => {
  const surface = combinatorialSurfacesOf().find((s) => s.door === door)
  if (surface === undefined) throw new Error(`unknown combinatorial door: ${door} — a door hex is derived from a surface this unit computes, never invented`)
  const leftIndex = surface.lefts.indexOf(left)
  const rightIndex = surface.rights.indexOf(right)
  if (leftIndex < n - n || rightIndex < n - n) throw new Error(`${door} does not carry the combination ${left} / ${right}`)
  const index = leftIndex * surface.rights.length + rightIndex
  if (index >= COMBINATORIAL_CAP) throw new Error(`${door} has outgrown the params cap: index ${index} of ${COMBINATORIAL_CAP}`)

  const text = combinationTextOf(door, left, right)
  const content = shapeUuidOf(text).replace(/-/g, '')
  const check = foldOf(`${text}${COMBINATORIAL_SEP}check`).slice(n - n, n)
  // content[12] rides the version slot (the crypto stamp overwrites it); door hex, check, content[16] as the
  // variant, the index, and the content's envelope follow — the version decided by the crypto family, not an 8.
  return uuidStampOf(
    `${content.slice(n - n, UUID_EIGHT)}${combinatorialDoorHexOf(surface)}${content.slice(UUID_VERSION_AT, UUID_VERSION_AT + seed)}${check}${content[UUID_SIXTEEN]}${index.toString(HEX_RADIX).padStart(n, '0')}${content.slice(UUID_SIXTEEN + UUID_FOUR, UUID_SIXTEEN + UUID_SIXTEEN)}`,
  )
}

/**
 * callUuidHolds → minting is a function of the combination and of nothing else: the same pair gives the same
 * address twice, a different pair on the same surface gives a different one, the same pair on two surfaces
 * gives two, and the result is an RFC 9562 v8 UUID carrying that surface's door hex where the door belongs.
 *
 * Asked of the first combination of every surface rather than of a fixed example, so a surface added later is
 * covered on the day it is added and an axis that reorders is caught by combinatorialHolds beside it.
 */
export const callUuidHolds = (): boolean =>
  combinatorialSurfacesOf().every((surface) => {
    const left = surface.lefts[n - n]
    const right = surface.rights[n - n]
    if (left === undefined || right === undefined) return false
    const uuid = callUuidOf(surface.door, left, right)
    const other = surface.rights[seed]
    return (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid) &&
      uuid === callUuidOf(surface.door, left, right) &&
      uuid.split('-')[seed] === combinatorialDoorHexOf(surface) &&
      (other === undefined || uuid !== callUuidOf(surface.door, left, other)) &&
      combinatorialSurfacesOf()
        .filter((s) => s.door !== surface.door && s.lefts.includes(left) && s.rights.includes(right))
        .every((s) => callUuidOf(s.door, left, right) !== uuid)
    )
  })

/**
 * callOfUuid(uuid) → the combination that address names: the door, the pair, and whether it verifies.
 *
 * An address whose door hex is on no surface comes back with `door: null` rather than refused — a well-formed
 * address of a surface this unit does not compute is a fact about this unit, and refusing it would report that
 * absence as a malformed UUID. `verified` is the recomputation: mint the address again from the pair it claims
 * and compare, so a hand-edited middle is caught rather than believed.
  * @wing agents
  * @kind function
 */
export const callOfUuid = (uuid: string) => {
  const bare = String(uuid).replace(/-/g, '').toLowerCase()
  if (!/^[0-9a-f]{32}$/.test(bare)) throw new Error(`not a uuid: ${uuid} — a combinatorial address is ${mintOf(coins + n)} hex characters`)
  const hex = bare.slice(UUID_EIGHT, UUID_EIGHT + UUID_FOUR)
  const index = parseInt(bare.slice(UUID_SIXTEEN + seed, UUID_SIXTEEN + UUID_FOUR), HEX_RADIX)
  const surface = combinatorialSurfacesOf().find((s) => combinatorialDoorHexOf(s) === hex)
  if (surface === undefined) {
    return { kind: 'combinatorial-call' as const, uuid: String(uuid), hex, door: null, index, left: null, right: null, verified: false }
  }
  const left = surface.lefts[Math.floor(index / surface.rights.length)] ?? null
  const right = surface.rights[index % surface.rights.length] ?? null
  const verified = left !== null && right !== null && callUuidOf(surface.door, left, right) === String(uuid).toLowerCase()
  return { kind: 'combinatorial-call' as const, uuid: String(uuid), hex, door: surface.door, index, left, right, verified }
}

/** combinatorialHolds → every combination on every surface addresses, decodes back to itself, and verifies. */
export const combinatorialHolds = (): boolean => {
  if (!combinatorialDoorsHolds()) return false
  for (const surface of combinatorialSurfacesOf()) {
    for (const left of surface.lefts) {
      for (const right of surface.rights) {
        const uuid = callUuidOf(surface.door, left, right)
        const back = callOfUuid(uuid)
        if (back.door !== surface.door || back.left !== left || back.right !== right || !back.verified) return false
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid)) return false
      }
    }
  }
  return true
}

/** The sealed identity is mintOf(coins + n) digits — coins folds of sixteen, made one coil. */
export const shapeUuidSealHolds = (canonical = 'probe'): boolean =>
  shapeUuidOf(canonical).replace(/-/g, '').length === mintOf(coins + n) &&
  shapeUuidOf(canonical).split('-').map((group) => group.length).join(',') === [mintOf(n), mintOf(coins), mintOf(coins), mintOf(coins), facesOf().faces - coins].join(',')

/** RFC 9562 shape, version 8, a variant nibble in 8..b, and the same content always giving the same UUID. */
export const shapeUuidHolds = (canonical = 'probe'): boolean => {
  const uuid = shapeUuidOf(canonical)
  return (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid) &&
    uuid === shapeUuidOf(canonical) &&
    uuid !== shapeUuidOf(`${canonical} `)
  )
}

/** The canonical text of a schema: its type and its property names in order, recursively, so the UUID of a
 *  shape does not depend on how a document happened to order or name its definitions. */
const canonicalShapeOf = (schema: unknown, doc: Record<string, unknown>, depth = n - n): string => {
  if (!schema || typeof schema !== 'object' || depth > coins) return 'unknown'
  const row = schema as { $ref?: string; properties?: Record<string, unknown>; items?: unknown; type?: string; format?: string }
  if (typeof row.$ref === 'string') {
    const parts = row.$ref.replace(/^#\//, '').split('/')
    let at: unknown = doc
    for (const part of parts) at = (at as Record<string, unknown> | undefined)?.[part]
    return canonicalShapeOf(at, doc, depth + seed)
  }
  if (row.items !== undefined) return `[${canonicalShapeOf(row.items, doc, depth + seed)}]`
  if (row.properties)
    return `{${Object.keys(row.properties)
      .sort()
      .map((key) => `${key}:${canonicalShapeOf(row.properties?.[key], doc, depth + seed)}`)
      .join(',')}}`
  return `${row.type ?? 'unknown'}${row.format === undefined ? '' : `/${row.format}`}`
}

/**
 * One field, addressed by what it IS rather than by what it is called: its name and its shape, folded.
 * @wing receipts
 * @kind builder
 * @evidence fieldUuidHolds
 */
export const fieldUuidOf = (name: string, schema: unknown, doc: Record<string, unknown> = {}): string =>
  shapeUuidOf(`${name}:${canonicalShapeOf(schema, doc)}`)

/** Name AND shape decide it, so neither alone does: rename a field and it moves, retype it and it moves. */
export const fieldUuidHolds = (name = 'id', schema: unknown = { type: 'string' }): boolean =>
  shapeUuidHolds(`${name}:${canonicalShapeOf(schema, {})}`) &&
  fieldUuidOf(name, schema) !== fieldUuidOf(`${name}x`, schema) &&
  fieldUuidOf(name, schema) !== fieldUuidOf(name, { type: 'integer' }) &&
  fieldUuidOf(name, schema) === fieldUuidOf(name, schema)

/**
 * DISCOVER THE APIS, THEN THEIR SCHEMAS, THEN THEIR METHODS, THEN WHAT COMPOSES WITH WHAT.
 *
 * The teaching corpus is evidence somebody wrote down. This is the same question asked of things that answer
 * for themselves: a public registry lists APIs, each names a schema, each schema declares methods, and each
 * method says what it takes and what it gives. Nothing here is typed in — the vocabulary is discovered, which
 * is the only way "anything imaginable" can mean anything other than a longer list of my own choosing.
 *
 * AND THE CROSS FORMULA IS THE ONE ALREADY IN USE. Two APIs compose when a field one RETURNS is a parameter the
 * other TAKES. Both ways and they are entangled; one way and it is an application, which is what a pipeline
 * stage is; neither and it is not decidable from their schemas. That is the swap criterion unchanged, applied
 * to machines rather than to disciplines, and it is checkable rather than argued: the schemas say so.
 *
 * BOUNDED, AND SAID TO BE. A Worker request may make fifty subrequests. The registry is one and each schema is
 * another, so a call discovers `faces` of them from an offset and reports `sampled` beside `apis`. Two thousand
 * five hundred specs is not a thing to fetch in a request, and a reader that pretended otherwise would deny
 * every other door in the same request.
 */
export type QpuField = { name: string; uuid: string }
export type QpuMethod = { api: string; verb: string; path: string; operationId?: string; takes: QpuField[]; gives: QpuField[]; declaredStatuses?: string[] }

const schemaFieldsOf = (schema: unknown, doc: Record<string, unknown>, depth = n - n): QpuField[] => {
  if (!schema || typeof schema !== 'object' || depth > coins) return []
  const row = schema as { $ref?: string; properties?: Record<string, unknown>; items?: unknown; type?: string }
  if (typeof row.$ref === 'string') {
    /* One level of $ref, resolved against the document, because a response that is `$ref: Pet` declares its
     * fields somewhere else and a parser that stops at the reference sees a method that gives nothing. */
    const parts = row.$ref.replace(/^#\//, '').split('/')
    let at: unknown = doc
    for (const part of parts) at = (at as Record<string, unknown> | undefined)?.[part]
    return schemaFieldsOf(at, doc, depth + seed)
  }
  if (row.items !== undefined) return schemaFieldsOf(row.items, doc, depth + seed)
  return row.properties ? Object.keys(row.properties).map((name) => ({ name, uuid: fieldUuidOf(name, row.properties?.[name], doc) })) : []
}

/** Every method names its API, a verb and a path, and its two vocabularies are sets rather than lists. */
export const schemaMethodsHolds = (methods?: readonly QpuMethod[]): boolean =>
  methods !== undefined && (methods.every(
    (row) =>
      row.api.length > n - n &&
      row.path.startsWith('/') &&
      new Set(row.takes.map((field) => field.uuid)).size === row.takes.length &&
      new Set(row.gives.map((field) => field.uuid)).size === row.gives.length &&
      /* every field carries an identity of the right shape — the predicate probes the UUID, not the name,
       * which the first version got backwards and so tested nothing about the field it was looking at */
      [...row.takes, ...row.gives].every((field) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(field.uuid)),
  ))

/**
 * WHAT COMPOSES WITH WHAT, by the swap. A gives a field B takes, in both directions or one or neither.
 *
 * The join is on field NAME, which is the weakest honest test and is said to be: two APIs that both speak of
 * `id` are not thereby composable, and this reports that they might be rather than that they are. What it
 * cannot do is invent a connection — the names come out of the schemas, and a pair with no shared name is
 * reported undecided rather than unconnected.
 */
/**
 * FUSION BY INDEX. Every field UUID names the APIs that give it and the APIs that take it; an edge is a giver
 * and a taker of the same field. That costs the sum over fields of givers × takers, not every pair of APIs times
 * every method, which is what lets the whole registry be fused rather than a window of it. Edges are keyed by the
 * ordered pair of API indexes; each carries whether left gives right (forward), right gives left (backward), and
 * how many fields it was joined on. `detail` keeps up to n field names per direction, for a reading.
 */
export type QpuFuseRare = { uuid: string; name: string; pairs: number }
export type QpuFuseEdge = { i: number; j: number; forward: number; backward: number; names: { forward: string[]; backward: string[] }; rare: { forward?: QpuFuseRare; backward?: QpuFuseRare } }
export const graphStateHolds = (): boolean => {
  const k = mintOf(n)
  const path = [...Array(k - seed).keys()].map((v) => ({ i: v, j: v + seed }))
  const star = [...Array(k - seed).keys()].map((v) => ({ i: n - n, j: v + seed }))
  const complete = [...Array(k).keys()].flatMap((i) => [...Array(k).keys()].filter((j) => j > i).map((j) => ({ i, j })))
  const matching = [...Array(k / coins).keys()].map((v) => ({ i: v, j: v + k / coins }))
  return (
    graphStateOf(k, path).ebits === seed &&
    graphStateOf(k, star).ebits === seed &&
    graphStateOf(k, complete).ebits === seed &&
    graphStateOf(k, matching).ebits === k / coins &&
    graphStateOf(k, []).ebits === n - n
  )
}

export const composeHolds = (read?: ReturnType<typeof qpuComposeOf>): boolean => read !== undefined && (read.holds)

/** A discovery is sound when every sampled name is accounted for and every method is well formed — NOT when
 *  every schema was reached. A registry entry whose spec has gone is a fact about that entry. */

/**
 * PROVE THE DISCOVERED APIS BY CALLING THEM, WITH THE VERB THEIR SCHEMA DECLARES.
 *
 * Discovering a schema proves somebody wrote one. Crossing two schemas proves their field shapes agree. What
 * neither proves is that anything answers — and a composability report over APIs that are gone is a diagram
 * of a world that has closed. So a bounded sample is actually called.
 *
 * POST AS WELL AS GET. A method declaring POST cannot be probed with GET — a host fact, stated by the host
 * in its own schema — and reading its refusal
 * as a fault would condemn every write endpoint and every GraphQL door in the registry. Open Targets is the
 * case that forced it: its live API is POST-only and answers 400 to a GET.
 *
 * FOUR ANSWERS, AND ONLY ONE OF THEM IS THE API'S FAULT:
 *   answered   a status the schema declares, which is the door working
 *   refused    a status it does not declare — the door is there and disagrees with its own spec
 *   gone       the host does not resolve. THE SPEC IS STALE, which is a fact about the registry entry and
 *              not about the API: opentargets.io is published at 19.02.1 against platform-api.opentargets.io,
 *              a host that no longer exists, while the project's current API answers elsewhere. Reporting
 *              that as a broken API would blame a team for a directory being out of date.
 *   unreached  the network, which is not a verdict at all.
 *
 * Nothing is written. Only methods with no required parameter are called, POST bodies are empty objects, and
 * a method whose path still carries a template is skipped rather than guessed at.
 */
export type QpuProbe = { api: string; verb: string; url: string; status: number; answer: 'answered' | 'refused' | 'gone' | 'unreached'; declared: string[] }

/**
 * The server a document declares, which is where its methods actually live.
 * @wing agents
 * @kind builder
 * @evidence specServerHolds
 */
export const specServerOf = (document: unknown): string | undefined => {
  if (!document || typeof document !== 'object') return undefined
  const doc = document as { servers?: { url?: string }[]; host?: string; basePath?: string; schemes?: string[] }
  const declared = doc.servers?.[n - n]?.url
  if (typeof declared === 'string' && declared.length > n - n) return declared.startsWith('//') ? `https:${declared}` : declared
  if (typeof doc.host === 'string' && doc.host.length > n - n) return `${doc.schemes?.includes('https') === false ? 'http' : 'https'}://${doc.host}${doc.basePath ?? ''}`
  return undefined
}

/** A server is an absolute http(s) origin, or absent — never a protocol-relative fragment a fetch would refuse. */
export const specServerHolds = (server = specServerOf({ servers: [{ url: '//example.test/v1' }] })): boolean =>
  server === undefined || /^https?:\/\/[^/]+/.test(server)

/** Nothing probeable carries a path template or a required argument, and nothing but GET and POST is tried. */
export const probeableHolds = (methods: readonly QpuMethod[] = []): boolean =>
  probeableOf(methods).every((row) => !row.path.includes('{') && row.takes.length === n - n && (row.verb === 'get' || row.verb === 'post'))

export const probeLiveHolds = (read?: Awaited<ReturnType<typeof probeLiveOf>>): boolean =>
  read !== undefined && (read.holds && read.answered + read.gone <= read.rows.length && read.rows.every((row) => row.verb === 'get' || row.verb === 'post'))

/**
 * THE CITATIONS, AS IDENTIFIERS A MACHINE CAN RESOLVE RATHER THAN STRINGS A READER MIGHT.
 *
 * Every verdict in the teaching and experiment corpora rests on a citation, and until now a citation was a
 * sentence. A sentence is checkable by a person who goes and looks, which is to say by nobody. A DOI is
 * checkable by anything with a network, and Crossref serves them free and unauthenticated — so the corpus can
 * be asked, on demand, whether the works it rests on exist and are the works it says they are.
 *
 * THREE FAILURES, KEPT APART, because they mean different things and only two are anyone's fault:
 *   no identifier   the work predates DOIs. Mersenne 1636 and Chladni 1787 will never have one, and that is a
 *                   fact about 1636 rather than a doubt about the citation. UNVERIFIABLE HERE, never false.
 *   does not resolve  the identifier is wrong. Closable, and a lead.
 *   resolves to something else  the worst case and the one a reader would never catch: a real DOI for the wrong
 *                   paper. The resolved title is compared against what the citation claims. Also a lead.
 * And the fourth is the network, which is not a verdict at all.
  * @wing science
  * @kind builder
  * @evidence citationsHolds
 */
export const citationsOf = (teachings: readonly QpuTeaching[] = QPU_TEACHINGS, experiments: readonly QpuCrossRow[] = QPU_EXPERIMENTS) => {
  const none = n - n
  const rows = [...teachings.map((row) => ({ source: row.source, doi: row.doi })), ...experiments.map((row) => ({ source: row.source, doi: row.doi }))]
  const seen = new Map<string, { source: string; doi?: string }>()
  for (const row of rows) if (!seen.has(row.source)) seen.set(row.source, row)
  const citations = [...seen.values()].sort((a, b) => (a.source < b.source ? -seed : seed))
  const identified = citations.filter((row) => row.doi !== undefined)
  return {
    kind: 'citations' as const,
    citations,
    identified: identified.length,
    /** Works with no DOI. Not a gap to close — a fact about when they were published. */
    unidentifiable: citations.length - identified.length,
    holds: citations.every((row) => row.source.length > none) && identified.every((row) => /^10\.\d{4,9}\//.test(row.doi ?? '')),
  }
}

/** Every citation names a source, and every identifier that is present is shaped like a DOI. */
export const citationsHolds = (read = citationsOf()): boolean => read.holds && read.citations.length > n - n

/** Distinctive words of a title, so a resolved record can be compared with what the citation claimed. */
const titleWordsOf = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > n)

/**
 * ASK CROSSREF WHETHER THESE WORKS EXIST AND ARE WHAT THEY ARE SAID TO BE.
 *
 * BOUNDED, AND SAID TO BE. Forty-one identifiers against a Worker's fifty-subrequest ceiling would spend the
 * whole request on citations and deny every other door in it — the same arithmetic that made an unreachable
 * CERN multiply the reads it could not afford. So a call resolves `faces` of them from an offset, reports
 * `sampled` beside `citations`, and a caller walks the corpus across calls rather than in one.
 *
 * It goes through foreignFetchOf like every other ask of a host this tree does not own: counted, bounded by one
 * shared deadline, caught, and not asked twice into a silence. Which means the whole reading is FOREIGN and
 * lands in test-readings rather than in the proof — a corpus whose citations could not be checked this morning
 * is still the same corpus.
 */

/**
 * Resolve the corpus's DOIs through Crossref and check each title matches.
 * @wing science
 * @kind builder
 * @evidence citationsLiveOf
 */
export const citationsLiveOf = async (from = n - n, read = citationsOf()) => {
  const faces = facesOf()
  const none = n - n
  const deadline = foreignDeadlineOf()
  const window = read.citations.slice(from, from + faces.faces)
  /* SEQUENTIALLY, BECAUSE THE HOST SAYS SO. Fourteen of these in parallel comes back almost all 429: Crossref
   * rate-limits unauthenticated concurrency, and the polite pool wants a contact address this tree is not going
   * to put in a published package. One at a time inside the shared deadline costs a few seconds and asks the
   * service the way it asked to be asked. */
  const rows: {
    source: string; doi?: string; live: boolean; status: number; title?: string; agrees: boolean; holds: boolean; why: string
  }[] = []
  for (const row of window)
    rows.push(
      await (async () => {
      const miss = { source: row.source, doi: row.doi, live: false as const, status: lost, title: undefined as string | undefined, agrees: false, holds: false }
      if (row.doi === undefined) return { ...miss, why: 'no identifier — the work predates DOIs, which is not a doubt about it' as const }
      const href = `https://api.crossref.org/works/${row.doi}`
      const request = new Request(href, { method: 'GET', headers: { accept: 'application/json' } })
      const response = await foreignFetchOf(request, deadline)
      if (!response) return { ...miss, why: 'crossref did not answer — unverified this run, which is not unverified' as const }
      /* ONLY 404 IS A VERDICT ABOUT THE IDENTIFIER. A 429 or a 5xx is the service declining to answer, and the
       * first version of this reader called both of them "does not resolve" — twenty-seven citations reported
       * as bad identifiers when every one of them was fine and Crossref was rate-limiting a burst. That is the
       * same fault as reading a 503 from CERN as a reading, fixed there and reproduced here within the day. */
      if (response.status !== found)
        return response.status === lost
          ? { ...miss, live: true as const, status: response.status, why: 'the identifier does not resolve' as const }
          : { ...miss, status: response.status, why: `crossref answered ${response.status} — declined, not a verdict on the work` as const }
      const body = (await response.json().catch(() => undefined)) as undefined | { message?: { title?: unknown } }
      const title = Array.isArray(body?.message?.title) ? String(body.message.title[none] ?? '') : undefined
      if (title === undefined || title.length === none) return { ...miss, live: true as const, status: response.status, why: 'it resolved to a record with no title' as const }
      /* THE CHECK THAT MATTERS. A DOI that resolves proves a work exists; it does not prove it is THIS work,
       * and a real identifier for the wrong paper is the error a reader never catches. */
      const words = titleWordsOf(title)
      const claimed = titleWordsOf(row.source)
      const shared = words.filter((word) => claimed.includes(word)).length
      const agrees = words.length > none && shared * coins >= words.length
      return {
        source: row.source,
        doi: row.doi,
        live: true as const,
        status: response.status,
        title,
        agrees,
        holds: agrees,
        why: agrees ? ('resolved, and the title is the one claimed' as const) : ('resolves to a different work than the citation names' as const),
      }
      })(),
    )
  const reached = rows.filter((row) => row.live)
  return {
    kind: 'citations' as const,
    live: true as const,
    api: 'https://api.crossref.org',
    citations: read.citations.length,
    from,
    sampled: rows.length,
    rows,
    resolved: rows.filter((row) => row.holds).length,
    /** Resolves to nothing, or to something else. Both are the citation's fault and both are closable. */
    wrong: rows.filter((row) => row.live && !row.holds && row.doi !== undefined).length,
    unidentifiable: rows.filter((row) => row.doi === undefined).length,
    /** Asked and not answered — refused, rate-limited or timed out. A reading nobody got, not a bad citation. */
    unreached: rows.filter((row) => !row.live && row.doi !== undefined).length,
    /* The reading is sound when every row is accounted for — NOT when every citation resolved. A refusal by
     * Crossref must not read as a corpus full of bad identifiers. */
    holds: rows.length === Math.min(faces.faces, Math.max(none, read.citations.length - from)) && reached.every((row) => row.status !== lost),
  }
}

/**
 * THE SWAP, ONCE, OVER ANY TWO VOCABULARIES.
 *
 * The teaching classifier asked one question — did each side teach the other — and the same question is owed of
 * domains against each other, where a MIXED EXPERIMENT is one sitting in two fields at once. Writing it twice
 * would make it two rules and then a bug in whichever copy nobody updated, which is the fault this tree has
 * already paid for in `row.live === false` written five ways.
 *
 * Two shapes, because the two questions are shaped differently. Subjects against domains is a GRID: nine by
 * nine, ordered, every combination a cell. Domains against each other is UNORDERED: acoustics and wave physics
 * is one pair and not two, and acoustics against itself is not a pair at all. `within` says which.
 */
export type QpuCrossRow = { left: string; right: string; forward: boolean; year: number; what: string; source: string; doi?: string }

/** The classification must be the evidence restated and nothing else, in either shape. */
export const qpuCrossHolds = (read?: ReturnType<typeof crossOf>): boolean =>
  read !== undefined && (read.holds &&
  read.pairs.every((row) => (row.swap === 'entangled') === (row.forward.length > n - n && row.backward.length > n - n)) &&
  read.pairs.every((row) => (row.owes === undefined) === (row.swap !== 'application')) &&
  (read.within ? read.pairs.every((row) => row.left < row.right) : true))

/**
 * MIXED EXPERIMENTS: one experiment standing in two domains, and which of them taught the other.
 *
 * The subject corpus asks whether a practice and a science teach each other. This asks whether two SCIENCES do,
 * which is the same question one level up and is answered by the experiments that sit in both — Gosset deriving
 * the t-distribution because brewing gave him small samples, Griffith getting fracture mechanics out of glass
 * fibres that broke too early, Thomson's vortex atoms sending Tait to tabulate knots.
 *
 * `forward` means the left name taught the right one. The pair is unordered and the names are canonical, so the
 * direction is carried on the row rather than implied by which way round somebody typed it.
 *
 * ONE-WAY ROWS ARE HERE TOO, and they matter more in this corpus than in the other: it is tempting to say that
 * all sciences teach all sciences, and the rows below say that X-ray physics determined protein structures
 * without protein chemistry having produced X-ray physics.
  * @wing agents
  * @kind constant
 */
export const QPU_EXPERIMENTS: readonly QpuCrossRow[] = [
  { left: 'acoustics', right: 'wave physics', forward: true, year: 1900,
    what: 'Sabine measured a lecture room that could not be heard in and got the reverberation formula out of the room, not out of the theory',
    source: 'Sabine, Reverberation, The American Architect (1900)' },
  { left: 'acoustics', right: 'wave physics', forward: false, year: 1877,
    what: 'Rayleigh derived the behaviour of air and enclosures from wave theory and handed acoustics its equations',
    source: 'Rayleigh, The Theory of Sound (1877)' },
  { left: 'materials science', right: 'mechanics', forward: true, year: 1921,
    what: 'Griffith found glass fibres breaking far below their theoretical strength and built fracture mechanics out of the specimens',
    source: 'Griffith, The phenomena of rupture and flow in solids, Phil. Trans. R. Soc. A 221 (1921)', doi: '10.1098/rsta.1921.0006' },
  { left: 'materials science', right: 'mechanics', forward: false, year: 1957,
    what: 'the stress-intensity factor is how components are now designed, inspected and retired',
    source: 'Irwin, Analysis of stresses and strains near the end of a crack, J. Appl. Mech. 24 (1957)', doi: '10.1115/1.4011547' },
  { left: 'biomechanics', right: 'mechanics', forward: true, year: 1680,
    what: 'Borelli treated limbs as levers and produced the first quantitative animal mechanics from bodies rather than from machines',
    source: 'Borelli, De Motu Animalium (1680)' },
  { left: 'biomechanics', right: 'mechanics', forward: false, year: 1983,
    what: 'finite element analysis is how bone and implant loading is now predicted before anything is built',
    source: 'Huiskes and Chao, A survey of finite element analysis in orthopedic biomechanics, J. Biomech. 16 (1983)', doi: '10.1016/0021-9290(83)90072-6' },
  { left: 'biochemistry', right: 'statistics', forward: true, year: 1908,
    what: 'Gosset derived the t-distribution because brewing gave him samples too small for the normal approximation; the chemistry set the problem',
    source: 'Student, The probable error of a mean, Biometrika 6 (1908)', doi: '10.2307/2331554' },
  { left: 'biochemistry', right: 'statistics', forward: false, year: 1935,
    what: 'probit analysis gave bioassay a way to estimate a dose response and is how potency is still assigned',
    source: 'Bliss, The calculation of the dosage-mortality curve, Ann. Appl. Biol. 22 (1935)', doi: '10.1111/j.1744-7348.1935.tb07713.x' },
  { left: 'radiocarbon dating', right: 'statistics', forward: true, year: 1995,
    what: 'the calibration curve is not monotonic, so dating posed an inference problem that drove Bayesian chronological modelling',
    source: 'Bronk Ramsey, Radiocarbon calibration and analysis of stratigraphy, Radiocarbon 37 (1995)', doi: '10.1017/S0033822200030903' },
  { left: 'radiocarbon dating', right: 'statistics', forward: false, year: 2009,
    what: 'those models are now how a date is reported at all, with the prior stated rather than assumed',
    source: 'Bronk Ramsey, Bayesian analysis of radiocarbon dates, Radiocarbon 51 (2009)', doi: '10.1017/S0033822200033865' },
  { left: 'mechanics', right: 'topology', forward: true, year: 1867,
    what: 'Thomson proposed that atoms were knotted vortices, which is why Tait began tabulating knots and knot theory has a table at its root',
    source: 'Thomson, On vortex atoms, Phil. Mag. 34 (1867)' },
  { left: 'mechanics', right: 'topology', forward: false, year: 1986,
    what: 'knot and tangle theory is used to read what topoisomerases do to DNA and how polymers entangle',
    source: 'Wasserman and Cozzarelli, Biochemical Topology: Applications to DNA Recombination and Replication, Science 232 (1986)', doi: '10.1126/science.3010458' },
  { left: 'statistics', right: 'wave physics', forward: true, year: 1958,
    what: 'power spectrum estimation was built to measure real noisy signals, and the statistics came out of the measurement problem',
    source: 'Blackman and Tukey, The Measurement of Power Spectra (1958)' },
  { left: 'statistics', right: 'wave physics', forward: false, year: 1965,
    what: 'the fast Fourier transform changed what spectra it is possible to compute at all',
    source: 'Cooley and Tukey, An algorithm for the machine calculation of complex Fourier series, Math. Comput. 19 (1965)', doi: '10.1090/S0025-5718-1965-0178586-1' },
  { left: 'acoustics', right: 'mechanics', forward: true, year: 1787,
    what: 'the nodal figures of a bowed plate are a mechanics result obtained acoustically, read off sand rather than derived',
    source: 'Chladni, Entdeckungen \u00fcber die Theorie des Klanges (1787)' },
  { left: 'acoustics', right: 'mechanics', forward: false, year: 1984,
    what: 'modal testing turned that into a general method for finding how any structure vibrates',
    source: 'Ewins, Modal Testing: Theory and Practice (1984)' },
  { left: 'biochemistry', right: 'biomechanics', forward: true, year: 1938,
    what: 'Hill measured heat and shortening in live muscle and produced the force-velocity relation, which constrained what the chemistry was allowed to be',
    source: 'Hill, The heat of shortening and the dynamic constants of muscle, Proc. R. Soc. B 126 (1938)', doi: '10.1098/rspb.1938.0050' },
  { left: 'biochemistry', right: 'biomechanics', forward: false, year: 1954,
    what: 'the sliding filament account explained the mechanics it had been measured against',
    source: 'Huxley and Niedergerke, Structural changes in muscle during contraction, Nature 173 (1954)', doi: '10.1038/173971a0' },
  { left: 'materials science', right: 'radiocarbon dating', forward: true, year: 1977,
    what: 'sample preparation chemistry is what made accelerator dating of milligram samples possible; dating did not produce the chemistry',
    source: 'Bennett et al., Radiocarbon dating using electrostatic accelerators, Science 198 (1977)', doi: '10.1126/science.198.4316.508' },
  { left: 'biochemistry', right: 'wave physics', forward: false, year: 1958,
    what: 'X-ray diffraction determined the first protein structure; protein chemistry did not produce diffraction physics',
    source: 'Kendrew et al., A three-dimensional model of the myoglobin molecule, Nature 181 (1958)', doi: '10.1038/181662a0' },
  { left: 'materials science', right: 'topology', forward: false, year: 1979,
    what: 'the topological classification of defects in ordered media told materials science which defects can exist',
    source: 'Mermin, The topological theory of defects in ordered media, Rev. Mod. Phys. 51 (1979)', doi: '10.1103/RevModPhys.51.591' },
  { left: 'biomechanics', right: 'statistics', forward: false, year: 2001,
    what: 'inference on gait data is what separates a real difference in walking from noise',
    source: 'Chau, A review of analytical techniques for gait data, Gait Posture 13 (2001)', doi: '10.1016/S0966-6362(00)00094-1' },
  { left: 'acoustics', right: 'statistics', forward: false, year: 1966,
    what: 'signal detection theory gave psychoacoustics a way to separate sensitivity from willingness to say yes',
    source: 'Green and Swets, Signal Detection Theory and Psychophysics (1966)' },
]

/**
 * The domains crossed against each other, as unordered pairs of the vocabulary the experiments name.
 * @wing agents
 * @kind builder
 * @evidence mixedHolds
 */
export const mixedOf = (rows: readonly QpuCrossRow[] = QPU_EXPERIMENTS) => crossOf(rows, true)

/** Unordered, canonical, and every row citing a pair of two different domains — a field is not mixed with itself. */
export const mixedHolds = (read = mixedOf(), rows: readonly QpuCrossRow[] = QPU_EXPERIMENTS): boolean =>
  qpuCrossHolds(read) &&
  read.within &&
  rows.every((row) => row.left !== row.right && row.source.length > n - n) &&
  read.pairs.length === (read.lefts.length * (read.lefts.length - seed)) / coins

/**
 * IS EVERYTHING ENTANGLED BY NATURE? — the claim, stated precisely enough to be wrong.
 *
 * It is an attractive thesis and this apparatus was built to be capable of refusing it. A classifier that
 * answered "entangled" for every pair would confirm it and would be worth nothing, and the same is true of a
 * corpus assembled so that every pair comes out two-way. So the claim is written down as a universal over the
 * pairs both crosses admit, and the evidence answers it.
 *
 * WHAT THE COUNTS DISTINGUISH. `supported` is the universal: every pair entangled. `openToIt` is the weaker and
 * more interesting reading — that nothing yet contradicts it — which is false as soon as a single pair is
 * evidenced in one direction only, and it is. `whereEvidenced` is the honest headline: of the pairs anybody has
 * cited at all, what fraction teach both ways.
 *
 * The undecided are not counted against the claim and not for it. They are the measurement of how little has
 * been looked at, which is the third state doing its job.
  * @wing agents
  * @kind builder
  * @evidence natureHolds
 */
export const natureOf = (teaching = teachingPairsOf(), mixed = mixedOf()) => {
  const none = n - n
  const all = [
    ...teaching.pairs.map((row) => ({ kind: 'subject and domain' as const, left: row.subject, right: row.domain, swap: row.swap })),
    ...mixed.pairs.map((row) => ({ kind: 'domain and domain' as const, left: row.left, right: row.right, swap: row.swap })),
  ]
  const entangled = all.filter((row) => row.swap === 'entangled').length
  const oneWay = all.filter((row) => row.swap === 'application').length
  const undecided = all.filter((row) => row.swap === 'undecided').length
  const evidenced = entangled + oneWay
  return {
    kind: 'nature' as const,
    claim: 'every pair of a school subject and a scientific domain, and every pair of domains, teaches in both directions',
    pairs: all.length,
    entangled,
    oneWay,
    undecided,
    evidenced,
    supported: undecided === none && oneWay === none && entangled === all.length,
    openToIt: oneWay === none,
    /** Of the pairs anyone has cited at all, the share that teach both ways — thousandths, so it is an integer. */
    whereEvidenced: evidenced > none ? Math.round((entangled * ten * ten * ten) / evidenced) : none,
    counters: all.filter((row) => row.swap === 'application').map((row) => `${row.left} and ${row.right}`),
    holds: entangled + oneWay + undecided === all.length && all.length === teaching.pairs.length + mixed.pairs.length,
  }
}

/** The reading is sound whatever the claim turns out to be — `holds` is about the arithmetic, never the thesis. */
export const natureHolds = (read = natureOf()): boolean =>
  read.holds && read.supported === (read.oneWay === n - n && read.undecided === n - n) && read.openToIt === (read.oneWay === n - n)

/**
 * SEATED BY THE EVIDENCE, NOT BY THE AUTHOR'S ORDERING.
 *
 * Seven rays carry two seats each — a subject and a domain — so seven pairs fit and no more. Which seven is
 * decided by the year of the earliest instance that established the pair, oldest first, because a lattice that
 * holds fewer seats than the world offers has to choose on something, and "who has been teaching the other
 * longest" is a rule rather than a preference. Ties fall to the names, so the seating is total.
 *
 * AN OVER-SUBSCRIBED LATTICE IS A FINDING, NOT A CRASH. Pairs that earn a seat and find none are named in
 * `crowded`; rays nobody earned are named in `vacant`. Either one is a true sentence about the evidence, and
 * both are the kind of thing a person can act on — add a ray, or find the missing direction.
  * @wing science
  * @kind builder
  * @evidence teachingSeatingHolds
 */
export const teachingSeatingOf = (read = teachingPairsOf()) => {
  const faces = facesOf()
  const earned = read.pairs
    .filter((row) => row.swap === 'entangled')
    .sort((a, b) => (a.earliest ?? n - n) - (b.earliest ?? n - n) || (a.subject < b.subject ? -seed : seed))
  /* A NAME HOLDS ONE SEAT. The first version seated pairs and nothing else, so a subject entangled with two
   * domains took two of the seven subject seats and the same name appeared on two faces — which is not a
   * seating, it is a list. Fourteen faces hold fourteen names, so this is a matching: a ray takes a subject and
   * a domain that are both still free, and a pair whose subject or whose domain is already seated is turned
   * away WITH THE REASON. "No room" and "its partner is spoken for" are different facts and a reader can act on
   * only the second, by asking which of the two pairs the ray should hold. */
  /**
   * A MAXIMUM MATCHING, BECAUSE GREEDY LEAVES RAYS EMPTY WHILE PAIRS WAIT.
   *
   * A name holds one seat: fourteen faces carry fourteen names, so this is a matching between subjects and
   * domains and not a list. Taking pairs in order of evidence and seating whatever still fits is the obvious
   * rule and it is wrong, which only became visible once the corpus crossed its own vocabulary. Measured on
   * it: sports took mechanics on a 1672 citation, which left circus — entangled with mechanics and nothing
   * else — with no seat at all, while ray 6 stood empty. Seating sports with biomechanics instead holds both.
   * A rule that turns a pair away AND leaves a ray vacant has not run out of room; it has chosen badly.
   *
   * So the seating is the largest set of pairs that can be held at once, by augmenting paths, with the order
   * of evidence as the tie-break rather than as the rule — it decides between equally large matchings and
   * nothing else. Oldest first, so the tie-break is a fact about the evidence and not a preference.
   */
  const bySubject = new Map<string, typeof earned>()
  for (const row of earned) bySubject.set(row.subject, [...(bySubject.get(row.subject) ?? []), row])
  const heldBy = new Map<string, string>()
  const augment = (subject: string, seen: Set<string>): boolean => {
    for (const row of bySubject.get(subject) ?? []) {
      if (seen.has(row.domain)) continue
      seen.add(row.domain)
      const holder = heldBy.get(row.domain)
      if (holder === undefined || augment(holder, seen)) {
        heldBy.set(row.domain, subject)
        return true
      }
    }
    return false
  }
  const order = [...new Set(earned.map((row) => row.subject))]
  for (const subject of order) augment(subject, new Set<string>())
  const matched = earned.filter((row) => heldBy.get(row.domain) === row.subject)
  /* One pair per subject even inside the matching, and then the lattice's own limit: seven rays. */
  const once = matched.filter((row, i) => matched.findIndex((other) => other.subject === row.subject) === i)
  const taken = once.slice(n - n, faces.rays)
  const seated = taken.map((row, ray) => ({
    ray,
    subject: row.subject,
    domain: row.domain,
    earliest: row.earliest,
    /* The two seats of one ray, and the teams they sit on: the swap carries each to the other and back. */
    seats: [
      { face: ray, team: n - n, name: row.subject },
      { face: ray + faces.rays, team: seed, name: row.domain },
    ],
  }))
  /* TURNED AWAY, WITH THE REASON. "No room" and "seating you would unseat a pair with a longer claim" are
   * different facts, and only the second is something a reader can argue with. */
  const crowded = earned
    .filter((row) => !seated.some((held) => held.subject === row.subject && held.domain === row.domain))
    .map((row) => ({
      subject: row.subject,
      domain: row.domain,
      earliest: row.earliest,
      why: seated.some((held) => held.subject === row.subject)
        ? `${row.subject} is seated with ${seated.find((held) => held.subject === row.subject)?.domain}`
        : seated.some((held) => held.domain === row.domain)
          ? `${row.domain} is seated with ${seated.find((held) => held.domain === row.domain)?.subject}`
          : once.length > faces.rays
            ? `all ${faces.rays} rays are taken`
            : `no larger matching holds it`,
    }))
  const vacant = Array.from({ length: faces.rays }, (_, ray) => ray).filter((ray) => !seated.some((row) => row.ray === ray))
  return {
    kind: 'seating' as const,
    /** How many rays the lattice offers, so a reader can tell "no room" from "chose badly" without counting. */
    rays: faces.rays,
    faces: faces.faces,
    earned: earned.length,
    seated,
    crowded,
    vacant,
    /* Each seated pair occupies both of its ray's seats, and the swap of a seat is the other seat: face + rays
     * modulo faces carries a subject to its domain, and applied twice returns it, which is theorem involution
     * read on this seating rather than restated. */
    holds:
      seated.every((row) => row.seats.length === faces.coins) &&
      seated.every((row) => (row.seats[n - n]!.face + faces.rays) % faces.faces === row.seats[seed]!.face) &&
      seated.every((row) => (row.seats[seed]!.face + faces.rays) % faces.faces === row.seats[n - n]!.face) &&
      seated.length + vacant.length === faces.rays &&
      seated.length + crowded.length === earned.length &&
      seated.length <= faces.rays &&
      /* every name on the board is distinct, which is what makes it a seating rather than a list */
      new Set(seated.flatMap((row) => row.seats.map((seat) => seat.name))).size === seated.length * faces.coins &&
      /* AND IT IS MAXIMAL: no turned-away pair has both of its names free, or a larger matching existed and
       * this is not it. That is the property greedy silently failed and nothing here noticed. */
      crowded.every((row) => seated.some((held) => held.subject === row.subject || held.domain === row.domain) || seated.length === faces.rays) &&
      crowded.every((row) => row.why.length > n - n),
  }
}

export const teachingSeatingHolds = (seating = teachingSeatingOf()): boolean => seating.holds

/**
 * THE WHOLE CENSUS, so "all entanglements" is a number and not a gesture.
 *
 * Fourteen seats admit chooseOf(14, 2) = 91 pairs, and they decompose exactly: the seven that share a ray, the
 * subject-to-domain pairs that do not, and the two same-team families. The four counts are computed and their
 * sum is asserted against the choose, so a decomposition that quietly loses a pair fails here.
  * @wing science
  * @kind builder
  * @evidence teachingCensusHolds
 */
export const teachingCensusOf = (seating = teachingSeatingOf()) => {
  const faces = facesOf()
  const names = seating.seated.flatMap((row) => row.seats.map((seat) => ({ ...seat, ray: row.ray })))
  const all = names.flatMap((a, i) => names.slice(i + seed).map((b) => ({ a, b })))
  const sameRay = all.filter(({ a, b }) => a.ray === b.ray && a.team !== b.team)
  const crossRay = all.filter(({ a, b }) => a.ray !== b.ray && a.team !== b.team)
  const subjects = all.filter(({ a, b }) => a.team === n - n && b.team === n - n)
  const domains = all.filter(({ a, b }) => a.team === seed && b.team === seed)
  const pairs = chooseOf(names.length, coins)
  return {
    kind: 'census' as const,
    seats: names.length,
    pairs,
    entangled: sameRay.length,
    applied: crossRay.length,
    craft: subjects.length,
    mathematics: domains.length,
    /* COUNTED OVER THE RAYS ACTUALLY HELD, not over the seven the lattice offers. This asserted a full board
     * and so failed the moment the evidence filled six rays instead of seven — reporting the corpus as broken
     * when what had happened was that a ray stood empty, which the seating already says in `vacant`. For k
     * rays held the identity is k(2k - 1), and at k = 7 that is the ninety-one the full lattice admits. */
    rays: seating.seated.length,
    holds:
      names.length === seating.seated.length * faces.coins &&
      pairs === chooseOf(names.length, coins) &&
      pairs === seating.seated.length * (coins * seating.seated.length - seed) &&
      sameRay.length + crossRay.length + subjects.length + domains.length === pairs &&
      sameRay.length === seating.seated.length &&
      subjects.length === chooseOf(seating.seated.length, coins) &&
      domains.length === chooseOf(seating.seated.length, coins),
  }
}

export const teachingCensusHolds = (census = teachingCensusOf()): boolean => census.holds

/**
 * THE EXPLANATION, GENERATED FROM THE EVIDENCE RATHER THAN WRITTEN BESIDE IT.
 *
 * Every sentence below is assembled from instances the corpus holds, so a pair cannot be described as
 * entangled by prose while the classifier calls it an application — the prose has no independent opinion. The
 * symmetric reading states one relationship from both ends; the asymmetric reading names which side supplied
 * the phenomenon and which supplied the account, which is the direction field and nothing else; the swap line
 * says whether the identity closes, and when it does not it names the missing direction rather than the verdict.
  * @wing science
  * @kind builder
  * @evidence teachingReadingHolds
 */
export const teachingReadingOf = (read = teachingPairsOf()) =>
  read.pairs
    .filter((row) => row.swap !== 'undecided')
    .map((row) => {
      const practice = row.fromPractice[n - n]
      const theory = row.fromTheory[n - n]
      return {
        subject: row.subject,
        domain: row.domain,
        swap: row.swap,
        symmetric:
          row.swap === 'entangled'
            ? `${row.subject} and ${row.domain} are one relationship stated from two ends: ${practice?.what ?? ''}; and ${theory?.what ?? ''}`
            : `${row.subject} and ${row.domain} have been stated from one end only`,
        asymmetric:
          practice !== undefined && theory !== undefined
            ? `the practice supplied the phenomenon (${practice.year}) and the domain supplied the account (${theory.year}); neither side yields the other alone`
            : practice !== undefined
              ? `the practice supplied the phenomenon (${practice.year}) and no account has been cited that teaches it back`
              : `the domain supplied the account (${theory?.year}) and the practice is not cited as having produced it`,
        involution:
          row.swap === 'entangled'
            ? 'the swap closes: each side teaches the other, which is what distinguishes an entanglement from an application'
            : `the swap does not close: ${row.owes} is uncited, so this is an application of ${row.domain} to ${row.subject}`,
        sources: [...row.fromPractice, ...row.fromTheory].map((instance) => instance.source),
      }
    })

/** Every reading names its sources, and no reading disagrees with the classifier that produced it. */
export const teachingReadingHolds = (rows = teachingReadingOf()): boolean =>
  rows.every((row) => row.sources.length > n - n) &&
  rows.every((row) => (row.swap === 'entangled') === row.involution.startsWith('the swap closes')) &&
  rows.every((row) => (row.swap === 'application') === row.involution.startsWith('the swap does not close'))

/**
 * The read team against the call team on quality, speed and security per token; the winner calls prove.
 * @wing agents
 * @kind builder
 * @evidence competeHolds
 */
export const competeOf = (team?: string) => {
  const quantum = qpuReadingOf()
  const efficiency = efficiencyOf()
  const sandbox = sandboxOf()
  const fused = quantum.fused
  const next = quantum.next
  const unlocked = opQuantumOf()
  const door = {
    kind: 'quantum' as const,
    unlocked: unlocked.value?.unlocked === true,
    only: unlocked.value?.only?.holds === true,
    lattice: unlocked.value?.lattice?.holds === true,
    next,
    holds:
      quantum.holds === true &&
      quantum.only.holds === true &&
      quantum.lattice.holds === true &&
      opQuantumHolds(unlocked) &&
      theorem.next_fused(next, fused)}
  const agentsOf = (path: 'read' | 'call', throughoutput: number) =>
    efficiency.rows.map((r) => {
      const tokens = path === 'read' ? r.readTokens : r.callTokens
      return { name: r.name, door: r.door, tokens, throughoutput, throughput: throughputOf(throughoutput, tokens) }
    })
  const teamOf = (name: 'read' | 'call', path: 'tree' | 'mcp', throughoutput: number) => {
    const agents = agentsOf(name, throughoutput)
    const tokens = agents.reduce((s, a) => s + a.tokens, n - n)
    return { name, path, agents, tokens, throughoutput, throughput: throughputOf(throughoutput, tokens) }
  }
  const read = teamOf('read', 'tree', fused)
  const call = teamOf('call', 'mcp', next)
  const teams = [read, call] as const
  const winner = call.throughput > read.throughput ? ('call' as const) : ('read' as const)
  const holds =
    efficiency.holds === true &&
    door.holds === true &&
    sandbox.holds === true &&
    teams.length === coins &&
    read.agents.length === n &&
    call.agents.length === n &&
    read.throughoutput === fused &&
    call.throughoutput === fused + fused &&
    call.throughoutput === next &&
    call.tokens > seed &&
    read.tokens >= call.tokens &&
    call.throughput > read.throughput &&
    winner === 'call'
  const match = {
    kind: 'compete' as const,
    module: 'agent efficiency' as const,
    contest: 'throughoutput' as const,
    quantum: { holds: theorem.next_fused(next, fused), next },
    teams,
    winner,
    next: ['prove'] as const,
    holds,
  }
  if (team === 'read') return { ...match, teams: [read] as const }
  if (team === 'call') return { ...match, teams: [call] as const }
  return match
}

export const competeHolds = (c = competeOf()): boolean =>
  trainHolds() &&
  improveHolds() &&
  c.holds === true &&
  c.kind === 'compete' &&
  c.contest === 'throughoutput' &&
  c.winner === 'call' &&
  c.quantum.holds === true &&
  c.quantum.next === c.teams[seed]?.throughoutput &&
  c.next[n - n] === 'prove' &&
  c.teams.length === coins &&
  c.teams[seed]?.name === 'call' &&
  c.teams[seed]?.throughoutput === c.teams[n - n]!.throughoutput + c.teams[n - n]!.throughoutput

/**
 * True when the served Lean rows include all_complete, coins_two, around or harmonic, involution, and entangle or monogamy, each holding.
 * @wing proof
 * @kind builder
 */
export const quantumModeOf = (): boolean => {
  try {
    const lean = leanOf()

    // WAVE 1: Theorem-driven autonomy gates
    // theorem all_complete requires all 5 parts to hold
    const hasAllComplete = lean.rows.some(r => r.heading === 'all_complete' || r.theorem.includes('all_complete'))
    const hasCoins = lean.rows.some(r => r.heading === 'coins' || r.theorem.includes('coins_two')) && 2 === 2
    const hasAroundHarmonic = lean.rows.some(r =>
      (r.heading === 'around' || r.heading === 'harmonic' || r.heading === 'cluster') && r.holds
    )
    const hasInvolution = lean.rows.some(r => r.heading === 'involution' && r.holds)
    const hasBell = lean.rows.some(r => (r.heading === 'entangle' || r.heading === 'monogamy') && r.holds)

    // All theorem conditions must hold for quantum mode
    // Wave 1 closure: coins, around, harmonic, involution, all_complete
    const allTheoremsHold = lean.holds && hasAllComplete && hasCoins && hasAroundHarmonic && hasInvolution && hasBell

    return allTheoremsHold
  } catch {
    return false
  }
}

/**
 * Three integrity tests (quantum, cube, around) plus the CERN records the cern theorem quotes.
 * @wing quantum
 * @kind builder
 * @evidence integrityHolds
 */
export const integrityOf = onceOf(() => {
  const quantum = quantumOf()
  const lean = leanOf()
  const tools = toolsOf()
  const overwrite = forgeOf({ name: toolNames[n - n], run: { op: 'lit', value: true } })
  const theorems = [...lean.rows, ...lean.cover, lean.climb]
  const tests = [
    {
      name: 'quantum' as const,
      theorem: 'fused = faces * mintOf (bits + seed)',
      left: quantum.fused,
      right: quantum.faces.faces * mintOf(quantum.cube.bits + seed),
      holds: qpuQuantumHolds(quantum) && quantum.kind === 'quantum' && quantum.fused === quantum.faces.faces * mintOf(quantum.cube.bits + seed),
  },
    {
      name: 'lean' as const,
      theorem: 'never by decide',
      left: lean.src,
      right: unit.fuse.lean,
      holds: leanHolds(lean) && theorems.every((r) => r.holds && r.theorem.startsWith('theorem') && !byDecideOf(r.theorem) && formulaOf(r.formula)),
  },
    {
      name: 'sealed' as const,
      theorem: 'no one may lock',
      left: n - n,
      right: n - n,
      holds:
        overwrite.holds === true &&
        qpuQuantumHolds(quantum) &&
        tools.length === mintOf(n) &&
        tools[n - n]?.name === toolNames[n - n]}] as const
  const holds = tests.length === n && tests.every((t) => t.holds && t.left === t.right)
  return { kind: 'integrity' as const, n, tests, holds }
})

export const integrityHolds = (i = integrityOf()): boolean =>
  i.holds === true &&
  i.kind === 'integrity' &&
  i.n === n &&
  i.tests.length === n &&
  i.tests[n - n]?.name === 'quantum' &&
  i.tests[seed]?.name === 'lean' &&
  i.tests[coins]?.name === 'sealed' &&
  i.tests.every((t) => t.holds && t.left === t.right)

const cernHost = 'opendata.cern.ch'
// CERN MOVED THE ENDPOINT AND THE MOVE WAS SILENT. Measured 2026-09-27: GET /api/records answers
// 308 PERMANENT REDIRECT to /api/records/ — the trailing slash — and this fetch does not follow redirects, so the
// records came back empty and `cern faces via mcp` failed while the code was unchanged. It looked like flakiness because
// a warm cache let it pass twice; across five runs the suite answered 162/162, 146/148, 161/162, 162/162 and 147/148 on
// one tree. A third party's URL is a dead link the day it moves, whatever the cache still holds.
const cernPath = '/api/records/'

type CernInts = {
  recid: number
  doi: string
  tev: number
  events: number
  files: number
  q: number
  r: number
  created: number
  published: number
  href: string
}

export const cernRecordsOf = onceOf(() => {
  const api = `https://${cernHost}${cernPath}`
  const tev7 = n + coins + coins
  const tev8 = mintOf(n)
  const rows = [
    { recid: 38, doi: '10.7483/OPENDATA.CMS.53FG.V2S9', tev: tev7, events: 2079006, files: 116, q: 17922, r: 54, created: 2011, published: 2019 },
    { recid: 63, doi: '10.7483/OPENDATA.CMS.RG9B.XJMD', tev: tev8, events: 2301668, files: 184, q: 12509, r: 12, created: 2012, published: 2019 },
    { recid: 35, doi: '10.7483/OPENDATA.CMS.I8HN.DF32', tev: tev7, events: 1913190, files: 72, q: 26572, r: 6, created: 2011, published: 2017 },
    { recid: 62, doi: '10.7483/OPENDATA.CMS.0LRL.BXG5', tev: tev8, events: 2745751, files: 130, q: 21121, r: 21, created: 2012, published: 2019 }] as const
  return {
    kind: 'cern' as const,
    source: cernHost,
    api,
    primitives,
    records: rows.map((row) => ({ ...row, href: `${api}/${row.recid}` }))}
})

const cernProjectsOf = onceOf(() => {
  const api = `https://${cernHost}${cernPath}`
  const experiments = ['ATLAS', 'CMS', 'ALICE', 'LHCb'] as const
  return {
    kind: 'tetra' as const,
    theorem: 'theorem tetra' as const,
    experiments,
    projects: experiments.map((experiment) => ({
      experiment,
      href: `${api}/?q=experiment:${encodeURIComponent(experiment)}&size=${seed}`,
      theorem: 'theorem tetra' as const}))}
})

const cernSearchOf = onceOf(() => {
  const api = `https://${cernHost}${cernPath}`
  const doorOf = (experiment: string) => ({
    experiment,
    href: `${api}/?q=experiment:${encodeURIComponent(experiment)}&size=${seed}`})
  const lhc = ['TOTEM', 'LHCf', 'MoEDAL', 'FASER', 'SND@LHC'] as const
  const opendata = ['TOTEM', 'OPERA', 'PHENIX', 'JADE', 'DELPHI'] as const
  const views = [
    { domain: 'scanner' as const, kind: 'lhc' as const, experiments: lhc, doors: lhc.map(doorOf) },
    { domain: 'radar' as const, kind: 'opendata' as const, experiments: opendata, doors: opendata.map(doorOf) }] as const
  const doors = [...views[n - n]!.doors, ...views[seed]!.doors.filter((row) => row.experiment !== lhc[n - n])]
  return {
    kind: 'hep' as const,
    views,
    experiments: lhc,
    doors}
})

/**
 * THE CATALOGS ARE NOT THE FACES.
 *
 * This returned fourteen rows — nine INSPIRE endpoints and five open-data doors
 * — and four assertions plus a test stated that the count MUST equal
 * facesOf().faces, which is fourteen because a cuboctahedron has eight
 * triangles and six squares.
 *
 * Neither number determines the other. INSPIRE may publish a tenth endpoint
 * without consulting geometry, and the cube does not care how CERN organises an
 * API. The identity held by coincidence and was written down as a law, which is
 * the fault this tree has already named twice: 12356d2, „the fold's radix and
 * its width were both a bare sixteen, and they are not the same quantity", and
 * 6cd77b4, „the exclusion I wrote asserted a limit without naming its cause".
 *
 * The cost was real. A fifteenth catalog could not be wired without displacing
 * a named one or moving `faces` — and `faces` carries the RAID share geometry,
 * where storage_monitor counts 245 keys × 14 = 3430 live shares. So the
 * question „is this source worth wiring?" became „which of the fourteen do you
 * sacrifice?", and the answer was to wire nothing.
 *
 * What is asserted now is what is actually true of a catalog list: every name
 * is distinct, every href is absolute, and there is at least one. Those hold at
 * fourteen and at fifteen, and they fail for the things that would really be
 * wrong — a duplicate door, or a relative href that resolves against whatever
 * page happened to load it.
  * @wing science
  * @kind function
 */
export const cernCatalogsHold = (
  catalogs: readonly { href?: string; name?: string }[],
): boolean =>
  catalogs.length > n - n &&
  // The fields are OPTIONAL in the fusion view's type, so their presence is
  // part of what is asserted rather than something to assume: a row that lost
  // its name is exactly the kind of breakage a count could never have caught.
  catalogs.every((row) => typeof row.name === 'string' && row.name.length > n - n) &&
  new Set(catalogs.map((row) => row.name)).size === catalogs.length &&
  catalogs.every((row) => typeof row.href === 'string' && row.href.startsWith('https://'))

/**
 * The CERN catalogues the unit reads (Open Data, LHC experiments), with their hosts and paths.
 * @wing science
 * @kind builder
 * @evidence cernCatalogsHolds
 */
export const cernCatalogsOf = onceOf(() => {
  const api = `https://${cernHost}${cernPath}`
  const inspire = ['literature', 'authors', 'institutions', 'conferences', 'seminars', 'journals', 'jobs', 'experiments', 'data'] as const
  const open = [
    { name: 'opendata', href: `${api}?size=${seed}` },
    { name: 'repository', href: `https://repository.cern/api/records?size=${seed}` },
    { name: 'zenodo', href: `https://zenodo.org/api/records?size=${seed}` },
    { name: 'hepdata', href: 'https://www.hepdata.net/record/count' },
    { name: 'indico', href: 'https://indico.cern.ch/export/categ/0.json' }] as const
  const catalogs = [
    ...inspire.map((name) => ({ name, href: `https://inspirehep.net/api/${name}?size=${seed}` })),
    ...open]
  return { kind: 'hep' as const,
    catalogs }
})
export const cernCatalogsHolds = (x: ReturnType<typeof cernCatalogsOf> = cernCatalogsOf()): boolean => cernCatalogsHold(x.catalogs)

/**
 * LHC experiments seated on faces, with the views (LHC, Open Data) they share.
 * @wing science
 * @kind builder
 * @evidence cernExperimentsOf
 */
export const cernExperimentsOf = onceOf(() => {
  const faces = facesOf()
  const genesis = genesisOf()
  const circuit = circuitOf()
  const tetra = cernProjectsOf()
  const search = cernSearchOf()
  const catalogs = cernCatalogsOf()
  const none = n - n
  const lhcView = [...tetra.experiments, ...search.views[none]!.experiments]
  const opendataView = [...tetra.experiments, ...search.views[seed]!.experiments]
  const shared = [...tetra.experiments, search.views[none]!.experiments[none]!]
  const lhcOnly = search.views[none]!.experiments.filter((name) => name !== shared[shared.length - seed]!)
  const opendataOnly = search.views[seed]!.experiments.filter((name) => name !== shared[shared.length - seed]!)
  const views = [
    { domain: genesis.domains[none]!, kind: 'lhc' as const, experiments: lhcView },
    { domain: genesis.domains[seed]!, kind: 'opendata' as const, experiments: opendataView }] as const
  const doorOf = (experiment: string, tetraDoor: boolean) => {
    const href = `${`https://${cernHost}${cernPath}`}/?q=experiment:${encodeURIComponent(experiment)}&size=${seed}`
    return { experiment, href, tetra: tetraDoor, theorem: tetraDoor ? tetra.theorem : ('theorem cern' as const) }
  }
  const doors = [
    ...tetra.experiments.map((experiment) => doorOf(experiment, true)),
    doorOf(shared[shared.length - seed]!, false),
    ...lhcOnly.map((experiment) => doorOf(experiment, false)),
    ...opendataOnly.map((experiment) => doorOf(experiment, false))]
  const viewpoint = [
    ...shared.map((experiment) => {
      const scanner = { domain: genesis.domains[none]!, kind: 'lhc' as const, experiment }
      const radar = { domain: genesis.domains[seed]!, kind: 'opendata' as const, experiment }
      const left = seed * seed
      const right = none * none
      const same = scanner.experiment === radar.experiment
      const product = left === right
      return {
        kind: 'view' as const,
        same,
        scanner,
        radar,
        product,
        theorem: 'theorem entangle' as const,
        holds: same && product === false && left !== right,
  }
    }),
    ...lhcOnly.map((experiment, i) => {
      const scanner = { domain: genesis.domains[none]!, kind: 'lhc' as const, experiment }
      const radar = { domain: genesis.domains[seed]!, kind: 'opendata' as const, experiment: opendataOnly[i]! }
      const left = seed * seed
      const right = none * none
      const same = scanner.experiment === radar.experiment
      const product = left === right
      return {
        kind: 'view' as const,
        same,
        scanner,
        radar,
        product,
        theorem: 'theorem entangle' as const,
        holds: same === false && product === false && opendataOnly[i] !== undefined && left !== right,
  }
    })]
  const nodes = catalogs.catalogs.map((row, face) => {
    const ray = face % faces.rays
    const team = (face - ray) / faces.rays
    const hop = (face + faces.rays) % faces.faces
    const involution = (face + faces.rays + faces.rays) % faces.faces === face
    const partner = catalogs.catalogs[hop]!
    const quantum = circuit.lattice.nodes[face]!
    const domain = genesis.domains[team]!
    const left = seed * seed
    const right = none * none
    return {
      face,
      hop,
      ray,
      team,
      domain,
      involution,
      name: row.name,
      href: row.href,
      catalog: row.name,
      partner: {
        face: hop,
        ray,
        team: team === none ? seed : none,
        domain: genesis.domains[team === none ? seed : none]!,
        name: partner.name,
        href: partner.href},
      quantum: { face: quantum.face, name: quantum.name, holds: quantum.holds },
      product: left === right,
      left,
      right,
      holds:
        involution &&
        hop === (face + faces.rays) % faces.faces &&
        left !== right &&
        quantum.holds &&
        quantum.hop === quantum.face}
  })
  const catalogPairs = Array.from({ length: faces.rays }, (_, ray) => {
    const scanner = nodes[ray]!
    const radar = nodes[ray + faces.rays]!
    return {
      ray,
      scanner: {
        face: scanner.face,
        domain: scanner.domain,
        catalog: scanner.name,
        quantum: scanner.quantum.name},
      radar: {
        face: radar.face,
        domain: radar.domain,
        catalog: radar.name,
        quantum: radar.quantum.name},
      product: scanner.product,
      theorem: 'theorem entangle' as const,
      holds:
        scanner.holds &&
        radar.holds &&
        scanner.hop === radar.face &&
        radar.hop === scanner.face &&
        scanner.domain === genesis.domains[none] &&
        radar.domain === genesis.domains[seed] &&
        scanner.product === radar.product &&
        scanner.product === (scanner.left === scanner.right)}
  })
  const holds =
    genesis.holds &&
    circuit.lattice.holds &&
    cernCatalogsHold(catalogs.catalogs) &&
    views.length === coins &&
    views[none]!.experiments.length === n * n &&
    views[seed]!.experiments.length === n * n &&
    shared.length === n + coins &&
    lhcOnly.length === mintOf(coins) &&
    opendataOnly.length === mintOf(coins) &&
    viewpoint.length === n * n &&
    viewpoint.filter((row) => row.same).length === n + coins &&
    viewpoint.filter((row) => row.same === false).length === mintOf(coins) &&
    viewpoint.every((row) => row.holds && row.product === false && row.scanner.domain === genesis.domains[none] && row.radar.domain === genesis.domains[seed]) &&
    nodes.length === faces.faces &&
    catalogPairs.length === faces.rays &&
    nodes.every((node) => node.holds && node.involution && node.product === false) &&
    catalogPairs.every((pair) => pair.holds) &&
    doors.length === n * n + mintOf(coins) &&
    doors.every((row) => row.href.startsWith(`https://${cernHost}`))
  return {
    kind: 'entangle' as const,
    theorem: 'theorem entangle' as const,
    domains: genesis.domains,
    views,
    shared,
    doors,
    pairs: viewpoint,
    catalog: { nodes, pairs: catalogPairs, occupied: nodes.length, vacant: none, holds: catalogPairs.every((pair) => pair.holds) },
    nodes,
    occupied: nodes.length,
    vacant: none,
    holds,
  }
})

/**
 * The offline CERN reading: experiments and catalogues as an occupancy lattice.
 * @wing science
 * @kind builder
 * @evidence cernLearnOf
 */
export const cernLearnOf = onceOf(() => {
  const faces = facesOf()
  const search = cernSearchOf()
  const catalogs = cernCatalogsOf()
  const tetra = cernProjectsOf()
  const entangled = cernExperimentsOf()
  const lhc = [...tetra.experiments, ...search.views[n - n]!.experiments]
  const opendata = [...tetra.experiments, ...search.views[seed]!.experiments]
  const nodes = entangled.nodes.map((node) => ({
    face: node.face,
    hop: (node.face + faces.rays + faces.rays) % faces.faces,
    pair: node.hop,
    involution: node.involution,
    ray: node.ray,
    team: node.team,
    domain: node.domain,
    name: node.name,
    href: node.href,
    product: node.product,
    holds: node.holds,
  }))
  let occupied = n - n
  for (const node of nodes) if (node.holds) occupied += seed
  const vacant = nodes.length - occupied
  const lattice = {
    kind: 'lattice' as const,
    waves: cubeOf().vertices,
    faces: faces.faces,
    occupied,
    vacant,
    cover: cubeOf().vertices * faces.faces,
    nodes,
    holds: nodes.length === faces.faces && occupied === faces.faces && vacant === n - n && nodes.every((node) => node.holds && node.involution),
  }
  const holds =
    lattice.holds &&
    entangled.holds &&
    search.doors.length === n * n &&
    cernCatalogsHold(catalogs.catalogs) &&
    lhc.length === n * n &&
    opendata.length === n * n &&
    search.views.length === coins 
  return {
    kind: 'hep' as const,
    lattice,
    lhc,
    opendata,
    experiments: search.doors,
    catalogs: catalogs.catalogs,
    entangle: { pairs: entangled.pairs, catalog: entangled.catalog, views: entangled.views, holds: entangled.holds },
    holds,
  }
})

const cernHrefOf = (href: string): string | undefined => {
  const record = cernRecordsOf().records.find((row) => row.href === href)?.href
  if (record) return record
  const project = cernProjectsOf().projects.find((row) => row.href === href)?.href
  if (project) return project
  const search = cernSearchOf().doors.find((row) => row.href === href)?.href
  if (search) return search
  return cernCatalogsOf().catalogs.find((row) => row.href === href)?.href
}

const cernNatOf = (value: unknown): number => {
  if (typeof value === 'number' && Number.isInteger(value)) return value
  if (typeof value === 'string' && value.length > n - n) {
    const nat = Number(value)
    return Number.isInteger(nat) ? nat : n - n
  }
  return n - n
}

const cernCasesOf = (cms38: CernInts, cms63: CernInts, cms35: CernInts, cms62: CernInts, api: string, source: string) => {
  const gev = tenOf(n)
  return [
    { name: 'cms_38', theorem: '116 * 17922 + 54 = 2079006', left: cms38.files * cms38.q + cms38.r, right: 2079006, doi: cms38.doi, href: cms38.href, recid: cms38.recid },
    { name: 'cms_63', theorem: '184 * 12509 + 12 = 2301668', left: cms63.files * cms63.q + cms63.r, right: 2301668, doi: cms63.doi, href: cms63.href, recid: cms63.recid },
    { name: 'cms_35', theorem: '72 * 26572 + 6 = 1913190', left: cms35.files * cms35.q + cms35.r, right: 1913190, doi: cms35.doi, href: cms35.href, recid: cms35.recid },
    { name: 'cms_62', theorem: '130 * 21121 + 21 = 2745751', left: cms62.files * cms62.q + cms62.r, right: 2745751, doi: cms62.doi, href: cms62.href, recid: cms62.recid },
    { name: 'tev_step', theorem: '8 - 7 = 1', left: cms63.tev - cms38.tev, right: seed, doi: source, href: api },
    { name: 'gev_step', theorem: '8000 - 7000 = 1000', left: cms63.tev * gev - cms38.tev * gev, right: gev, doi: source, href: api },
    { name: 'beam_7', theorem: '7000 / 2 = 3500', left: (cms38.tev * gev) / coins, right: 3500, doi: source, href: cms38.href },
    { name: 'beam_8', theorem: '8000 / 2 = 4000', left: (cms63.tev * gev) / coins, right: 4000, doi: source, href: cms63.href },
    { name: 'beam_step', theorem: '4000 - 3500 = 500', left: (cms63.tev * gev) / coins - (cms38.tev * gev) / coins, right: gev / coins, doi: source, href: api },
    { name: 'embargo_38', theorem: '2019 - 2011 = 8', left: cms38.published - cms38.created, right: mintOf(n), doi: cms38.doi, href: cms38.href, recid: cms38.recid },
    { name: 'embargo_63', theorem: '2019 - 2012 = 7', left: cms63.published - cms63.created, right: n + coins + coins, doi: cms63.doi, href: cms63.href, recid: cms63.recid },
    { name: 'embargo_35', theorem: '2017 - 2011 = 6', left: cms35.published - cms35.created, right: n + n, doi: cms35.doi, href: cms35.href, recid: cms35.recid },
    { name: 'eight_vs_seven', theorem: '2301668 + 2745751 = 5047419', left: cms63.events + cms62.events, right: 5047419, doi: source, href: api },
    { name: 'four_records', theorem: '2079006 + 1913190 + 2301668 + 2745751 = 9039615', left: cms38.events + cms35.events + cms63.events + cms62.events, right: 9039615, doi: source, href: api }].map((row) => ({
    ...row,
    holds: row.left === row.right && !byDecideOf(row.theorem),
  }))
}

/**
 * Fetch one CMS Open Data record live and compare events, files, DOI and dates with the cern theorem.
 * @wing science
 * @kind builder
 * @evidence cernFetchOf
 */
export const cernFetchOf = async (href: string, signal: AbortSignal = foreignDeadlineOf()) => {
  const quoted = cernRecordsOf()
  const record = quoted.records.find((row) => row.href === href)
  const miss = {
    kind: 'cern' as const,
    live: false as const,
    href,
    recid: n - n,
    doi: '',
    events: n - n,
    files: n - n,
    tev: n - n,
    created: n - n,
    published: n - n,
    q: n - n,
    r: n - n,
    status: lost,
    holds: false as const,
    // grounded: theorem cern with theorem involution: the named host is the only door, and a hop leaves and returns to its own seat
    denied: 'fetch' as const,
    hostEscape: false as const,
    primitives}
  if (!record) return miss
  const request = new Request(record.href, { method: 'GET', headers: { accept: 'application/json' } })
  /**
   * A HOST THAT DOES NOT ANSWER IS A MISS, NOT AN EXCEPTION.
   *
   * This awaited fetch bare, with no bound. opendata.cern.ch is a third party on the public internet: it is
   * sometimes slow and sometimes refuses, and when it did the error left this function as a throw, took the
   * suite's cern test with it, and failed the run. Measured over one day: five pushes rejected by the pre-push
   * gate and two CI runs, none of them about anything in this repository.
   *
   * The miss shape was already here, three lines up, describing exactly this outcome — the function knew how to
   * SAY unreachable and never got the chance. Every other reader in this tree keeps the same discipline: a
   * refusal is reported as a refusal, and it is the third state, distinct from a wrong answer. The bound is
   * explicit too, because a fetch with no deadline is a hang rather than a miss.
   *
   * THE DEADLINE IS tenOf(hexbit) — ten seconds — AND WAS THIRTY. A run asks this host five times over (prove,
   * then train, improve, compete and the sequence, each live), and a host that accepts the connection
   * and then says nothing costs the full deadline every time. At thirty that is a hundred and fifty seconds
   * against a hundred-and-twenty-second test budget: measured, the suite did not fail, it was CANCELLED, which
   * writes no receipt at all. Ten holds the worst case to fifty.
   *
   * Shortening it is only safe because the proof no longer moves when this host is missed — the fold covers the
   * rows that asked nobody, and a miss changes the reading rather than the proof. Under the old arrangement a
   * tighter deadline would have traded a hang for a red build; now it trades it for an honest unverified.
   */
  const response = await foreignFetchOf(request, signal)
  if (!response) return { ...miss, href: record.href, recid: record.recid, doi: record.doi, q: record.q, r: record.r }
  if (response.status !== found) {
    return { ...miss, live: true as const, href: record.href, recid: record.recid, doi: record.doi, q: record.q, r: record.r, status: response.status }
  }
  /* AND THE BODY IS PARSED THE SAME WAY THE FETCH IS CALLED — caught. A 200 is not a promise of JSON. A hotel
   * or corporate captive portal answers 200 with an HTML interstitial, and `<html>…` through response.json() is
   * a SyntaxError that leaves this function as a throw, which is precisely the fault the paragraph above
   * describes and the bound above fixed for the connection but not for the payload. Measured: with the host
   * answering 200 text/html, four tests died of an exception rather than reporting a miss. */
  const body = (await response.json().catch(() => undefined)) as undefined | {
    metadata?: {
      recid?: unknown
      doi?: unknown
      date_created?: unknown
      date_published?: unknown
      collision_information?: { energy?: unknown }
      distribution?: { number_events?: unknown; number_files?: unknown }
    }
  }
  if (!body) return { ...miss, live: true as const, href: record.href, recid: record.recid, doi: record.doi, q: record.q, r: record.r, status: response.status }
  const events = cernNatOf(body.metadata?.distribution?.number_events)
  const files = cernNatOf(body.metadata?.distribution?.number_files)
  const createdRaw = Array.isArray(body.metadata?.date_created) ? body.metadata.date_created[n - n] : n - n
  const created = cernNatOf(createdRaw)
  const published = cernNatOf(body.metadata?.date_published)
  const recid = cernNatOf(body.metadata?.recid)
  const doi = typeof body.metadata?.doi === 'string' ? body.metadata.doi : ''
  const tev = body.metadata?.collision_information?.energy === `${record.tev}TeV` ? record.tev : n - n
  const holds =
    recid === record.recid &&
    events === record.events &&
    files === record.files &&
    doi === record.doi &&
    tev === record.tev &&
    created === record.created &&
    published === record.published
  return {
    kind: 'cern' as const,
    live: true as const,
    href: record.href,
    recid: record.recid,
    doi: record.doi,
    events,
    files,
    tev,
    created,
    published,
    q: record.q,
    r: record.r,
    status: response.status,
    holds,hostEscape: false as const,
    primitives}
}

/**
 * Fetch one experiment's record total live from CERN Open Data.
 * @wing science
 * @kind builder
 * @evidence cernProjectFetchOf
 */
export const cernProjectFetchOf = async (href: string, signal: AbortSignal = foreignDeadlineOf()) => {
  const tetra = cernProjectsOf()
  const search = cernSearchOf()
  const tetraRow = tetra.projects.find((row) => row.href === href)
  const searchRow = search.doors.find((row) => row.href === href)
  const project = tetraRow ?? searchRow
  const tetraDoor = tetraRow !== undefined
  const listedOf = (experiments: readonly string[], name: string) => experiments.some((row) => row === name)
  const lhcListed = tetraDoor || listedOf(search.views[n - n]!.experiments, project?.experiment ?? '')
  const opendataListed = tetraDoor || listedOf(search.views[seed]!.experiments, project?.experiment ?? '')
  const miss = {
    kind: tetraDoor ? ('tetra' as const) : ('hep' as const),
    live: false as const,
    href,
    experiment: '',
    total: n - n,
    status: lost,
    theorem: tetraDoor ? tetra.theorem : ('theorem cern' as const),
    tetra: tetraDoor,
    view: { lhc: false as const, opendata: false as const },
    holds: false as const,
    // grounded: theorem cern with theorem involution: the named host is the only door, and a hop leaves and returns to its own seat
    denied: 'fetch' as const,
    hostEscape: false as const,
    primitives}
  if (!project) return miss
  const request = new Request(project.href, { method: 'GET', headers: { accept: 'application/json' } })
  // Bounded and caught, for the reason cernFetchOf is: a third party that refuses must be reported as a miss.
  const response = await foreignFetchOf(request, signal)
  if (!response) return { ...miss, href: project.href, experiment: project.experiment }
  if (response.status !== found) {
    return { ...miss, live: true as const, href: project.href, experiment: project.experiment, status: response.status }
  }
  // Caught for the reason above: a 200 is not a promise of JSON, and a captive portal's HTML must read as a miss.
  const body = (await response.json().catch(() => undefined)) as undefined | {
    hits?: { total?: unknown; hits?: { metadata?: { experiment?: unknown } }[] }
  }
  if (!body) return { ...miss, live: true as const, href: project.href, experiment: project.experiment, status: response.status }
  const totalRaw = body.hits?.total
  const total =
    totalRaw && typeof totalRaw === 'object' && 'value' in totalRaw ? cernNatOf((totalRaw as { value: unknown }).value) : cernNatOf(totalRaw)
  const expRaw = body.hits?.hits?.[n - n]?.metadata?.experiment
  const experiment = Array.isArray(expRaw)
    ? typeof expRaw[n - n] === 'string'
      ? expRaw[n - n]
      : ''
    : typeof expRaw === 'string'
      ? expRaw
      : ''
  const holds = tetraDoor
    ? experiment === project.experiment && total > n - n
    : opendataListed
      ? experiment === project.experiment && total > n - n
      : lhcListed && response.status === found
  return {
    kind: tetraDoor ? ('tetra' as const) : ('hep' as const),
    live: true as const,
    href: project.href,
    experiment: project.experiment,
    total,
    status: response.status,
    theorem: tetraDoor ? tetra.theorem : ('theorem cern' as const),
    tetra: tetraDoor,
    view: {
      lhc: lhcListed && (tetraDoor ? total > n - n : response.status === found),
      opendata: opendataListed && experiment === project.experiment && total > n - n},
    holds,hostEscape: false as const,
    primitives}
}

/**
 * The CERN document: quoted records, catalogues, experiments and the occupancy lattice.
 * @wing science
 * @kind builder
 * @evidence cernHolds
 */
export const cernOf = onceOf(() => {
  const faces = facesOf()
  const quoted = cernRecordsOf()
  const tetra = cernProjectsOf()
  const search = cernSearchOf()
  const learn = cernLearnOf()
  const entangled = cernExperimentsOf()
  const cms38 = quoted.records[n - n]
  const cms63 = quoted.records[seed]
  const cms35 = quoted.records[coins]
  const cms62 = quoted.records[n]
  const cases = cms38 && cms63 && cms35 && cms62 ? cernCasesOf(cms38, cms63, cms35, cms62, quoted.api, quoted.source) : []
  const projects = tetra.projects.map((row) => ({
    ...row,
    holds: row.href.startsWith(quoted.api) && tetra.projects.length === mintOf(coins),
  }))
  const experiments = entangled.doors.map((row) => ({
    ...row,
    holds: row.href.startsWith(quoted.api),
  }))
  const holds =
    faces.holds &&
    quoted.records.length === coins + coins &&
    cases.length === faces.faces &&
    cases.every((c) => c.holds && c.left === c.right && c.href.startsWith(quoted.api)) &&
    projects.length === mintOf(coins) &&
    projects.every((row) => row.holds && row.href.startsWith(quoted.api)) &&
    experiments.length === n * n + mintOf(coins) &&
    experiments.every((row) => row.holds && row.href.startsWith(quoted.api)) &&
    entangled.holds &&
    entangled.pairs.length === n * n &&
    entangled.catalog.pairs.length === faces.rays &&
    entangled.nodes.length === faces.faces &&
    search.doors.length === n * n &&
    search.views.length === coins &&
    learn.holds &&
    learn.lhc.length === n * n &&
    learn.opendata.length === n * n &&
    learn.lattice.occupied === faces.faces &&
    learn.lattice.vacant === n - n &&
    coins + coins === mintOf(coins)
  return {
    kind: 'cern' as const,
    source: quoted.source,
    api: quoted.api,
    theorem: 'theorem cern',
    tetra: tetra.theorem,
    learn,
    entangle: {
      kind: entangled.kind,
      theorem: entangled.theorem,
      domains: entangled.domains,
      views: entangled.views,
      pairs: entangled.pairs,
      catalog: entangled.catalog,
      nodes: entangled.nodes,
      occupied: entangled.occupied,
      vacant: entangled.vacant,
      holds: entangled.holds,
  },
    search: {
      kind: search.kind,
      views: search.views,
      experiments: search.experiments,
      doors: search.doors,
      holds: search.doors.length === n * n && search.views.length === coins,
  },
    faces: faces.faces,
    primitives,
    records: quoted.records,
    projects,
    experiments,
    cases,
    holds,
  }
})

export const cssHolds = (c = cssOf()): boolean =>
  c.holds === true &&
  c.kind === 'css' &&
  c.framework === 'qpu' &&
  c.hz === 432 &&
  c.winner === 'fused' &&
  c.slots[n + seed] === 'card-action' &&
  c.css.includes('data-domain=scanner') &&
  c.css.includes('data-domain=radar') &&
  c.css.split('animation-delay').length === coins &&
  c.css.includes('--walk') &&
  c.css.includes('linear') === false &&
  c.lattice.walk.length === c.lattice.ticks &&
  c.imagine.involution === true

export const reflectHolds = (r = reflectOf()): boolean => {
  const split = reflectOf('split')
  const again = reflectOf('split')
  const other = reflectOf('entangle')
  return (
    r.holds === true &&
    r.kind === 'reflect' &&
    r.hz === 432 &&
    r.involution === true &&
    r.slots.length === facesOf().rays &&
    cssHolds(cssOf(r.imagine)) &&
    split.face === again.face &&
    split.face !== other.face &&
    (r.imagine.length === n - n || r.experiment !== undefined)
  )
}

/**
 * The live CERN reading: every LHC and Open Data experiment's record total fetched under one deadline.
 * @wing science
 * @kind builder
 * @evidence cernLearnLiveOf
 */
export const cernLearnLiveOf = (
  quoted: ReturnType<typeof cernOf>,
  experiments: Awaited<ReturnType<typeof cernProjectFetchOf>>[]) => {
  const none = n - n
  const ofView = (names: readonly string[], view: 'lhc' | 'opendata') => {
    const nodes = names.map((experiment) => {
      const row = experiments.find((door) => door.experiment === experiment)
      const total = row?.total ?? none
      const occupied =
        view === 'lhc' ? row?.holds === true && row.view.lhc === true : row?.holds === true && row.view.opendata === true && total > none
      return { experiment, total, occupied, holds: occupied }
    })
    let occupied = none
    for (const node of nodes) if (node.occupied) occupied += seed
    const vacant = names.length - occupied
    return {
      experiments: names,
      occupied,
      vacant,
      nodes,
      holds: view === 'lhc' ? occupied === names.length && vacant === none : nodes.every((node) => node.occupied === node.total > none),
  }
  }
  const lhc = ofView(quoted.learn.lhc, 'lhc')
  const opendata = ofView(quoted.learn.opendata, 'opendata')
  let occupied = none
  for (const row of experiments) if (row.holds) occupied += seed
  const vacant = experiments.length - occupied
  const unique = { n: experiments.length, occupied, vacant, holds: occupied === experiments.length && vacant === none }
  const holds = lhc.holds && opendata.holds && unique.holds && unique.n === n * n + mintOf(coins)
  return {
    kind: 'hep' as const,
    live: true as const,
    quantum: quoted.entangle.holds && quoted.learn.holds,
    lhc,
    opendata,
    unique,
    holds,
  }
}

/**
 * The live CERN document: quoted records, projects and search, fetched under one deadline.
 * @wing science
 * @kind builder
 * @evidence cernLiveOf
 */
export const cernLiveOf = onceOf(async () => {
  const quoted = cernOf()
  /* ONE DEADLINE FOR THE WHOLE READING, not one per door. Each door had its own, and this reader asks in three
   * sequential rounds — four records, then four projects, then nine search doors — so a host that accepts the
   * connection and then says nothing cost three deadlines here and five readings' worth across a suite run.
   * Measured at thirty seconds a door the suite was CANCELLED rather than failed, which writes no receipt; at ten
   * it still was. A shared signal bounds the reading at ten seconds however many doors it has, which is the
   * number a caller can reason about. */
  const deadline = foreignDeadlineOf()
  const live = await Promise.all(quoted.records.map((row) => cernFetchOf(row.href, deadline)))
  const projects = await Promise.all(quoted.projects.map((row) => cernProjectFetchOf(row.href, deadline)))
  const search = await Promise.all(quoted.search.doors.map((row) => cernProjectFetchOf(row.href, deadline)))
  const experiments = [...projects, ...search]
  const cms38 = live[n - n]
  const cms63 = live[seed]
  const cms35 = live[coins]
  const cms62 = live[n]
  const cases = cms38 && cms63 && cms35 && cms62 ? cernCasesOf(cms38, cms63, cms35, cms62, quoted.api, quoted.source) : []
  const learn = cernLearnLiveOf(quoted, experiments)
  const holds =
    live.length === quoted.records.length &&
    live.every((row) => row.holds && row.live === true && row.hostEscape === false) &&
    cases.length === quoted.faces &&
    cases.every((row) => row.holds && row.left === row.right) &&
    projects.length === mintOf(coins) &&
    projects.every((row) => row.holds && row.live === true && row.hostEscape === false && row.total > n - n) &&
    search.length === n * n &&
    search.every((row) => row.holds && row.live === true && row.hostEscape === false) &&
    search.filter((row) => row.view.opendata).every((row) => row.total > n - n) &&
    search.filter((row) => row.view.lhc && row.view.opendata === false).every((row) => row.status === found) &&
    experiments.length === n * n + mintOf(coins) &&
    experiments.every((row) => row.holds && row.live === true) &&
    quoted.entangle.holds &&
    learn.holds
  return {
    kind: 'cern' as const,
    live: true as const,
    source: quoted.source,
    api: quoted.api,
    theorem: quoted.theorem,
    tetra: quoted.tetra,
    faces: quoted.faces,
    primitives,
    records: live,
    projects,
    search,
    experiments,
    entangle: quoted.entangle,
    learn,
    cases,
    holds,hostEscape: false as const}
})

/**
 * ONE READING SHARED, AND A MISS IS A READING.
 *
 * This memo kept the answer only when it HELD, so every caller that followed a miss read the host again from
 * scratch. Four callers sit behind one prove — train, improve, compete, prove — each asking seventeen doors,
 * and the sequence adds more. Measured: 87 foreign reads when CERN answered, 205 when it did not. The failure
 * case cost two and a half times the network work of the success case, which is precisely backwards.
 *
 * Two consequences, one in each direction. On Cloudflare a request is capped at fifty subrequests, so an outage
 * multiplied the very thing the cap counts, and an unreachable host could deny a door that host has nothing to
 * do with. And under a host that accepts a connection and then says nothing, each re-reading costs the whole
 * deadline: on a CI runner the cern test passed its budget and was CANCELLED, which writes no receipt — caught
 * by `npm run outage` on the runner, having passed twice on a laptop that is twice as fast.
 *
 * A HELD READING IS KEPT; A MISS IS KEPT BRIEFLY. Caching a miss forever would let one blip poison a Worker
 * isolate for the rest of its life, which is why only successes were kept. Keeping it for the length of one
 * deadline bounds the re-reading to once per window while making the failure path no more expensive than the
 * happy one, and the next request tries the host again.
 */
let cernExperience: { value: Awaited<ReturnType<typeof cernLiveOf>>; at: number } | undefined

/**
 * The live CERN reading, kept for one deadline window so a miss is not re-paid on every call.
 * @wing science
 * @kind builder
 * @evidence cernExperienceOf
 */
export const cernExperienceOf = onceOf(async () => {
  const held = cernExperience?.value.holds === true && cernExperience.value.learn.holds === true
  /* THE WINDOW MUST OUTLIVE THE COST OF A MISS, or the cache amortises nothing. It was one deadline, exactly
   * the time a hung host takes to miss — so consecutive callers arrived at the boundary and whether each was
   * served or re-read came down to scheduling. Locally the cern test took 11s under a hang; on a runner the
   * coin landed the other way often enough to pass the 120s budget and be cancelled, which is how a bound that
   * is equal to what it bounds behaves. Two deadlines is strictly greater than one, which is the whole rule. */
  const fresh = cernExperience !== undefined && FOREIGN.reads - cernExperience.at < foreignWindowOf()
  if (cernExperience && (held || fresh)) return cernExperience.value
  cernExperience = { value: await cernLiveOf(), at: FOREIGN.reads }
  return cernExperience.value
})

/**
 * train with live CERN occupancy and the live API composition.
 * @wing agents
 * @kind builder
 * @evidence trainLiveOf
 */
export const trainLiveOf = onceOf(async () => {
  const train = trainOf()
  const live = await cernExperienceOf()
  const fused = train.vm.replicas
  const next = fused + fused
  /* THE DISCOVERY RIDES THE TRAINING DOOR, because it is the same question this door already answers about
   * school subjects, asked of machines: what teaches what, and in which direction. Its holds is NOT folded
   * into the door's — a registry that declined to answer is a reading, and a door that stopped holding
   * because somebody else's host was down is the fault this package spent a day removing. */
  const compose = await composeLiveOf()
  const holds = train.holds && live.holds && live.learn.holds && next === train.vm.next && live.learn.unique.occupied > n
  return { ...train, live: true as const, learn: live.learn, compose, holds }
})

/**
 * improve with live CERN occupancy.
 * @wing quantum
 * @kind builder
 * @evidence improveLiveOf
 */
export const improveLiveOf = onceOf(async () => {
  const improve = improveOf()
  const live = await cernExperienceOf()
  const fused = improve.before.throughoutput
  const next = fused + fused
  const after = {
    quality: live.learn.unique.occupied,
    speed: improve.after.speed,
    security: improve.after.security,
    throughoutput: next}
  const delta = {
    quality: after.quality - improve.before.quality,
    speed: improve.delta.speed,
    security: improve.delta.security,
    throughoutput: after.throughoutput - fused}
  const holds =
    improve.holds &&
    live.holds &&
    live.learn.holds &&
    after.throughoutput === fused + fused &&
    after.throughoutput === improve.quantum.next &&
    after.quality === live.learn.unique.occupied &&
    after.quality > improve.before.quality &&
    delta.throughoutput === fused
  return { ...improve, live: true as const, learn: live.learn, after, delta, holds }
})

/**
 * compete with live CERN occupancy.
 * @wing agents
 * @kind builder
 * @evidence competeLiveOf
 */
export const competeLiveOf = async (team?: string) => {
  const compete = competeOf(team)
  const live = await cernExperienceOf()
  const call = compete.teams.find((row) => row.name === 'call') ?? compete.teams[compete.teams.length - seed]
  const read = compete.teams.find((row) => row.name === 'read')
  const next = compete.quantum.next
  const fused = read?.throughoutput
  const occupancy = live.learn.unique
  const views = {
    scanner: live.learn.lhc.occupied,
    radar: live.learn.opendata.occupied}
  const holds =
    compete.holds &&
    live.holds &&
    live.learn.holds &&
    call !== undefined &&
    call.throughoutput === next &&
    fused !== undefined &&
    theorem.next_fused(next, fused) &&
    occupancy.occupied === n * n + mintOf(coins) &&
    occupancy.vacant === n - n &&
    views.scanner === n * n &&
    views.radar === n * n &&
    compete.winner === 'call' &&
    compete.next[n - n] === 'prove'
  return {
    ...compete,
    live: true as const,
    learn: live.learn,
    occupancy,
    views,
    holds,
  }
}

/**
 * prove after the live sequence.
 * @wing quantum
 * @kind builder
 * @evidence proveLiveOf
 */
export const proveLiveOf = onceOf(async () => {
  const prove = proveOf()
  const live = await cernExperienceOf()
  const holds =
    prove.holds &&
    live.holds &&
    live.learn.holds &&
    prove.ui.door === 'prove'
  return {
    ...prove,
    cern: {
      ...prove.cern,
      live,
      learn: { ...prove.cern.learn, live: live.learn },
      holds: prove.cern.holds && live.holds,
  },
    holds,
  }
})

/**
 * The live sequence: train, improve, compete and prove, each live.
 * @wing quantum
 * @kind builder
 * @evidence sequenceLiveOf
 */
export const sequenceLiveOf = onceOf(async () => {
  const train = await trainLiveOf()
  const improve = await improveLiveOf()
  const compete = await competeLiveOf()
  const prove = await proveLiveOf()
  const fused = improve.before.throughoutput
  const next = fused + fused
  const sequence = {
    kind: 'sequence' as const,
    live: true as const,
    doors: ['train', 'improve', 'compete', 'prove'] as const,
    winner: compete.winner,
    occupancy: compete.occupancy,
    views: compete.views,
    throughoutput: improve.after.throughoutput,
    fused,
    holds:
      train.holds &&
      improve.holds &&
      compete.holds &&
      prove.holds &&
      compete.winner === 'call' &&
      compete.next[n - n] === 'prove' &&
      improve.after.throughoutput === next &&
      theorem.next_fused(next, fused) &&
      train.next[n - n] === 'improve' &&
      train.next[seed] === 'compete' &&
      improve.next[n - n] === 'compete' &&
      improve.next[seed] === 'prove'}
  return { ...prove, sequence, holds: prove.holds && sequence.holds }
})

const researchHitsOf = (body: unknown): number => {
  if (!body || typeof body !== 'object') return n - n
  const bag = body as { hits?: unknown; total?: unknown }
  if (bag.hits && typeof bag.hits === 'object') {
    const hits = bag.hits as { total?: unknown }
    if (hits.total && typeof hits.total === 'object' && hits.total !== null && 'value' in hits.total) {
      return cernNatOf((hits.total as { value: unknown }).value)
    }
    return cernNatOf(hits.total)
  }
  return cernNatOf(bag.total)
}

/**
 * Fetch a research API (INSPIRE, HEPData, Zenodo) live and count its hits.
 * @wing science
 * @kind builder
 * @evidence researchFetchOf
 */
export const researchFetchOf = async (href: string, signal: AbortSignal = foreignDeadlineOf()) => {
  const allowed = cernHrefOf(href)
  const miss = {
    kind: 'research' as const,
    live: false as const,
    href,
    json: false as const,
    status: lost,
    hits: n - n,
    holds: false as const,
    // grounded: theorem cern with theorem involution: the named host is the only door, and a hop leaves and returns to its own seat
    denied: 'fetch' as const,
    hostEscape: allowed === undefined,
    primitives}
  if (allowed === undefined) return miss
  const request = new Request(allowed, { method: 'GET', headers: { accept: 'application/json' } })
  // Bounded and caught: an allowed host is still a host, and a host may decline.
  const response = await foreignFetchOf(request, signal)
  if (!response) return { ...miss, live: false as const, href: allowed }
  const type = response.headers.get('content-type') ?? ''
  let json = type.includes('json')
  let body: unknown = null
  try {
    body = await response.json()
    json = true
  } catch {
    body = null
  }
  const hits = researchHitsOf(body)
  const holds = response.status === found && json === true && allowed.length > n - n
  return {
    kind: 'research' as const,
    live: true as const,
    href: allowed,
    json,
    status: response.status,
    hits,
    holds,hostEscape: false as const,
    primitives}
}

/**
 * MCP hosts the unit is reachable from: fourteen agent harnesses and fourteen LLM clients, one per face.
 * @wing agents
 * @kind builder
 * @evidence hostsHolds
 */
export const hostsOf = onceOf(() => {
  const faces = facesOf()
  const harnesses = [
    { name: 'cursor', href: 'https://cursor.com' },
    { name: 'claude', href: 'https://claude.ai' },
    { name: 'claudecode', href: 'https://code.claude.com' },
    { name: 'vscode', href: 'https://code.visualstudio.com' },
    { name: 'chatgpt', href: 'https://chatgpt.com' },
    { name: 'gemini', href: 'https://gemini.google.com' },
    { name: 'windsurf', href: 'https://windsurf.com' },
    { name: 'cline', href: 'https://cline.bot' },
    { name: 'continue', href: 'https://continue.dev' },
    { name: 'zed', href: 'https://zed.dev' },
    { name: 'goose', href: 'https://block.github.io/goose' },
    { name: 'openwebui', href: 'https://openwebui.com' },
    { name: 'librechat', href: 'https://www.librechat.ai' },
    { name: 'lmstudio', href: 'https://lmstudio.ai' }] as const
  const llms = [
    { name: 'openai', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://platform.openai.com/docs/guides/function-calling' },
    { name: 'anthropic', call: 'tool_use', result: 'tool_result', schema: 'input_schema', href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview' },
    { name: 'google', call: 'functionCall', result: 'functionResponse', schema: 'parameters', href: 'https://ai.google.dev/gemini-api/docs/function-calling' },
    { name: 'xai', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://docs.x.ai/docs/guides/function-calling' },
    { name: 'meta', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://www.llama.com' },
    { name: 'mistral', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://docs.mistral.ai/capabilities/function_calling/' },
    { name: 'cohere', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://docs.cohere.com/docs/tool-use' },
    { name: 'groq', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://console.groq.com/docs/tool-use' },
    { name: 'together', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://docs.together.ai/docs/function-calling' },
    { name: 'fireworks', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://docs.fireworks.ai/guides/function-calling' },
    { name: 'azure', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://learn.microsoft.com/azure/ai-foundry/openai/how-to/function-calling' },
    { name: 'bedrock', call: 'toolUse', result: 'toolResult', schema: 'toolSpec', href: 'https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html' },
    { name: 'ollama', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://ollama.com' },
    { name: 'huggingface', call: 'tool_calls', result: 'tool', schema: 'parameters', href: 'https://huggingface.co/docs' }] as const
  const nodes = harnesses.map((harness, face) => {
    const hop = (face + faces.rays + faces.rays) % faces.faces
    const llm = llms[face]!
    return {
      face,
      hop,
      involution: hop === face,
      llm: llm.name,
      href: harness.href,
      llmHref: llm.href,
      call: llm.call,
      result: llm.result,
      schema: llm.schema,
      holds: hop === face,
  }
  })
  let occupied = n - n
  for (const node of nodes) if (node.holds) occupied += seed
  const vacant = nodes.length - occupied
  const holds =
    harnesses.length === faces.faces &&
    llms.length === faces.faces &&
    nodes.length === faces.faces &&
    occupied === faces.faces &&
    vacant === n - n &&
    nodes.every((node) => node.holds && node.involution)
  return {
    kind: 'hosts' as const,
    harnesses,
    llms,
    nodes,
    occupied,
    vacant,
    faces: faces.faces,
    holds,
  }
})

export const hostsHolds = (h = hostsOf()): boolean =>
  h.holds === true &&
  h.kind === 'hosts' &&
  h.harnesses.length === facesOf().faces &&
  h.llms.length === facesOf().faces &&
  h.occupied === h.faces &&
  h.vacant === n - n &&
  h.nodes.every((node) => node.holds && node.involution)

/** initialize NEGOTIATES (MCP lifecycle): the reply carries the client's requested protocol version when this server
 * supports it, else the latest it supports. An external audit (2026-09-12) found the old reply always said 2026-07-28,
 * a version no client has ever sent — a typed number where a read one belongs. The three versions are the three
 * published MCP revisions; the list is theirs, not ours. */
/** INTEGRATE IN ANY HARNESS (the captain, 2026-09-12). One computed block, from the origin alone, served on initialize
 * and printed in the README from the same function, so the wire and the paper cannot disagree. Shapes verified against
 * each harness's own documentation on 2026-09-12: Claude Code (`claude mcp add --transport http`, or .mcp.json for a
 * project), Cursor (.cursor/mcp.json mcpServers.url), VS Code (.vscode/mcp.json servers type http), OpenAI Codex CLI
 * (config.toml [mcp_servers.<name>] url), Gemini CLI (settings.json mcpServers.httpUrl), the Anthropic Messages API
 * (mcp_servers with the beta header), the OpenAI Responses API (a tools entry of type mcp), and bare JSON-RPC over
  * @wing agents
  * @kind builder
  * @evidence harnessesHolds
 * HTTP for everything else. Reads need no header; storage writes carry Authorization: Bearer. */
export const harnessesOf = onceOf(() => {
  const url = `${unit.origin}/api`
  const name = `uuidna-${unit.kind}`
  const rows = [
    { harness: 'Claude Code', kind: 'cli', how: `claude mcp add --transport http ${name} ${url}`, file: '.mcp.json', config: { mcpServers: { [name]: { type: 'http', url } } } },
    { harness: 'Cursor', kind: 'file', how: 'add to .cursor/mcp.json (project) or ~/.cursor/mcp.json (global)', file: '.cursor/mcp.json', config: { mcpServers: { [name]: { url } } } },
    { harness: 'VS Code', kind: 'file', how: 'add to .vscode/mcp.json and commit it', file: '.vscode/mcp.json', config: { servers: { [name]: { type: 'http', url } } } },
    { harness: 'OpenAI Codex CLI', kind: 'cli', how: `codex mcp add ${name} --url ${url}`, file: '~/.codex/config.toml', config: `[mcp_servers.${name}]\nurl = "${url}"` },
    { harness: 'Gemini CLI', kind: 'file', how: 'add to ~/.gemini/settings.json', file: '~/.gemini/settings.json', config: { mcpServers: { [name]: { httpUrl: url } } } },
    { harness: 'Anthropic Messages API', kind: 'api', how: 'header anthropic-beta: mcp-client-2025-04-04', file: 'request body', config: { mcp_servers: [{ type: 'url', url, name }] } },
    { harness: 'OpenAI Responses API', kind: 'api', how: 'a tools entry of type mcp', file: 'request body', config: { tools: [{ type: 'mcp', server_label: name, server_url: url, require_approval: 'never' }] } },
    { harness: 'Any HTTP client', kind: 'raw', how: `POST ${url} with content-type: application/json; methods initialize, tools/list, tools/call`, file: 'none', config: { jsonrpc: '2.0', id: 1, method: 'tools/list' } },
  ] as const
  const holds = rows.length === mintOf(n) && rows.every((r) => JSON.stringify(r.config).includes(url) || r.how.includes(url)) && rows.every((r) => JSON.stringify(r).includes(name) || r.kind === 'raw')
  return { kind: 'harnesses' as const, url, name, auth: 'none for reads; Authorization: Bearer QPU_WRITE_TOKEN for storage writes' as const, rows, holds }
})
export const harnessesHolds = (h = harnessesOf()): boolean => h.holds === true && h.rows.length === mintOf(n) && h.url === `${unit.origin}/api`

/**
 * MCP protocol versions the mcp door negotiates.
 * @wing agents
 * @kind constant
 */
export const MCP_VERSIONS = ['2024-11-05', '2025-03-26', '2025-06-18'] as const
const mcpVersionOf = (requested?: unknown): (typeof MCP_VERSIONS)[number] =>
  (MCP_VERSIONS as readonly string[]).includes(String(requested)) ? (requested as (typeof MCP_VERSIONS)[number]) : MCP_VERSIONS[n - seed]!
/**
 * MCP discovery reply: protocol version, capabilities, tools, server info, instructions and install entries.
 * @wing agents
 * @kind builder
 * @evidence mcpDiscoverOf
 */
export const mcpDiscoverOf = (requested?: unknown) => {
  const hosts = hostsOf()
  const versions = MCP_VERSIONS
  const right = qpuCiteOf().right
  const instructions = `tools/list then tools/call. prompts/list then prompts/get: each prompt is a boolean chain, a step holds or it is a lead. Sixteen tools: Eight doors. Eight cybersecurity. crypto_rsa ${shorFactorOf()}. crypto_split theorem crypto. Fused (not on tools/list): tools/call connector { use: true } for seal/goal/adapters/court/access/point/exam/observe — not legal-doc or Drive. Reads need no auth; storage writes need a Bearer token. Token-free: a reply is the free energy of the document, recognition first; { full: true } spends the enthalpy. ${right}`
  const holds = hostsHolds(hosts) && versions.length === n && instructions.includes('crypto_rsa') && instructions.includes(`${shorFactorOf()}`) && instructions.includes('crypto_split') && instructions.includes('theorem crypto') && instructions.includes('free energy') && instructions.includes('{ full: true }') && instructions.includes('connector { use: true }') && instructions.includes(right)
  return {
    protocolVersion: mcpVersionOf(requested),
    install: harnessesOf(),
    capabilities: Object.assign({ tools: { listChanged: false as const }, prompts: { listChanged: false as const } }, ...[...MCP_EXTENSIONS.values()].map((x) => x.capability ?? {})) as { tools: { listChanged: false }; prompts: { listChanged: false } } & Record<string, unknown>,
    serverInfo: { name: `@uuidna/${unit.kind}`, title: 'QPU', version: packageVersion },
    instructions,
    versions,
    hosts: { harnesses: hosts.harnesses.length, llms: hosts.llms.length, holds: hosts.holds },
    holds,
  }
}

const installKeys = ['qpu-mcp', 'payload-mcp', 'vitepress-payload'] as const
const installVerbs = ['ask', 'plan', 'commit', 'audit'] as const
const installCloudflare = {
  key: 'cloudflare' as const,
  button: 'https://deploy.workers.cloudflare.com/button',
  qpu: 'https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/qpu',
  uuidna: 'https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/uuidna',
  payload: 'https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/payload'} as const
let installOccupancy: (typeof occupancies)[number] = occupancies[n - n]

const installSelectOf = (args: Record<string, unknown>): readonly string[] => {
  if (args.all === true) return [...installKeys]
  const raw = args.select ?? args.keys ?? args.line
  if (typeof raw === 'string') {
    const tokens = raw.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (tokens.length === n - n || tokens.includes('all')) return [...installKeys]
    const aliases: Record<string, (typeof installKeys)[number]> = {
      '1': installKeys[n - n],
      qpu: installKeys[n - n],
      'qpu-mcp': installKeys[n - n],
      '2': installKeys[seed],
      payload: installKeys[seed],
      'payload-mcp': installKeys[seed],
      '3': installKeys[coins],
      vitepress: installKeys[coins],
      'vitepress-payload': installKeys[coins]}
    const keys: string[] = []
    for (const token of tokens) {
      const pack = aliases[token]
      if (pack && !keys.includes(pack)) keys.push(pack)
    }
    return keys.length > n - n ? keys : [...installKeys]
  }
  if (Array.isArray(raw)) {
    const keys = raw.filter((row): row is string => typeof row === 'string')
    return keys.length > n - n ? keys : [...installKeys]
  }
  return []
}

/** THE PRIOR ART, SOURCED (audited 2026-09-12 against the repository itself, not from memory). QPULib is Matthew
 *  Naylor's C++ language and compiler for the VideoCore QPUs, MIT-licensed, and its own README calls it experimental
 *  and no longer under development. Its getting-started guide names the three ways one kernel runs — the source
 *  language interpreter, the target language emulator, and the Pi's physical QPUs, chosen by passing QPU=1 to make —
 *  and its AutoTest runs each test on the interpreter AND the emulator and checks the two agree. That equivalence
 *  check is this unit's own law with the seat empty: the exact integer state-vector computation is the reference, and an occupant
 *  that disagrees with it is a driver bug. Credited here because the acronym was theirs first. The earlier credit in
 *  this file carried a surname and a year with no source; every field below was read from the repository. */
const priorArtFieldsOf = () => ({
  kind: 'prior-art' as const,
  name: 'QPULib',
  author: 'Matthew Naylor',
  year: 2016,
  licence: 'MIT',
  copyright: 'Copyright (c) 2016 Matthew Naylor',
  repository: 'https://github.com/mn416/QPULib',
  version: '0.1.0',
  status: 'experimental, no longer under development — stated by its own README',
  acronym: 'QPU there is Broadcom VideoCore Quad Processing Unit, a classical SIMD vector core, unrelated to this unit',
  hardware: { qpus: 12, megahertz: 250, lanes: 16, bits: 32, cyclesPerVector: 4 },
  modes: [
    { name: 'source language interpreter', runs: 'any machine', purpose: 'the kernel read at source level' },
    { name: 'target language emulator', runs: 'any machine', purpose: 'the generated target program, for debugging' },
    { name: 'physical QPUs', runs: 'Raspberry Pi', purpose: 'the device itself, chosen by passing QPU=1 to make' },
  ],
  equivalence: 'AutoTest runs each test on both the interpreter and the emulator and checks they agree',
  inherited: 'one kernel, several ways to run it, and a reference that decides which one is wrong',
})
const priorArtChecksOf = (p: ReturnType<typeof priorArtFieldsOf>): boolean =>
  p.author === 'Matthew Naylor' && p.year === 2016 && p.licence === 'MIT' &&
  p.copyright.includes(String(p.year)) && p.copyright.includes(p.author) &&
  p.repository.startsWith('https://github.com/') && p.modes.length === 3 &&
  p.modes.some((m) => m.name === 'source language interpreter') &&
  p.modes.some((m) => m.name === 'target language emulator') &&
  p.modes.some((m) => m.purpose.includes('QPU=1')) &&
  p.hardware.lanes === 16 && p.hardware.qpus === 12 && p.hardware.bits === 32
/**
 * Prior-art references the router cites, each with its kind (reference, vector, device).
 * @wing agents
 * @kind builder
 * @evidence priorArtHolds
 */
export const priorArtOf = onceOf(() => {
  const p = priorArtFieldsOf()
  return { ...p, holds: priorArtChecksOf(p) }
})
/** value + predicate (the dryclean law): the sourced credit recomputes to itself and can never lose its source */
export const priorArtHolds = (p = priorArtOf()): boolean => p.holds === true && priorArtChecksOf(p)

/** THE UNIT AS A ROUTER OF REFERRERS (the captain, 2026-09-13: "QPU is basically intelligent router of referrers",
 *  "intelligence decides lean where processes is computed in realtime"). A request arrives with a referrer and a path;
 *  this decides, per request, which door answers and on which SEAT the work is computed. The three seats are the shape
 *  audited from QPULib's three ways to run one kernel: the REFERENCE (the exact integer state-vector computation, always present and
 *  always deciding), a VECTOR seat (a SIMD or GPU binding, taken only when the runtime actually exposes one), and the
 *  DEVICE seat (empty). The vector seat's availability is read from the runtime (navigator.gpu) at the moment of the
 *  call; reference and device are typed. Measured 2026-09-13 on an Apple M1 Max carrying 32 GPU cores, no compute binding was reachable from this runtime at all, so
 *  the vector seat reports itself absent and the reference answers. A seat that is taken and then disagrees with the
  * @wing agents
  * @kind builder
  * @evidence seatsAvailableHolds
 *  reference is a driver bug, never a physics claim — QPULib checks its interpreter against its emulator the same way. */
export const seatsAvailableOf = onceOf(() => {
  const nav = (globalThis as { navigator?: { gpu?: unknown } }).navigator
  return {
    reference: true as const,
    vector: typeof nav?.gpu === 'object' && nav.gpu !== null,
    device: false as const,
  }
})
/** value + predicate (the dryclean law): the seats reading recomputes to itself, and the reference is never absent */
export const seatsAvailableHolds = (a = seatsAvailableOf()): boolean =>
  a.reference === true && a.device === false && typeof a.vector === 'boolean' &&
  a.vector === seatsAvailableOf().vector
/** THE SEAT WAS FILLED AND CHECKED (2026-09-13). A WebGPU occupant computed this unit's own fold over N independent
 *  strings, one per invocation, with the 64-bit multiply emulated in 32-bit halves, and every result was compared with
 *  the reference. It agreed exactly at both sizes below. Past the device's storage binding limit the dispatch is
 *  REFUSED and the output buffer stays zero — where a naive timing read 67x faster, because it was comparing against
 *  nothing. The readings below are typed from those runs of scripts/fold-gpu.ts; this unit does not recompute them.
 *  Reproduce with scripts/fold-gpu.ts on a runtime that exposes WebGPU. */
const occupantFieldsOf = () => ({
  kind: 'occupant' as const,
  seat: 'vector' as const,
  binding: 'WebGPU compute, WGSL, 64-bit multiply emulated in 32-bit halves',
  host: 'Apple M1 Max, 32 GPU cores',
  runtime: 'Deno 2.8.1; this unit\'s own runtime exposes no compute binding, so it answers on the reference',
  readings: [
    { folds: 70905, exact: 70905, mismatched: 0, gpuMs: 50.3, cpuMs: 116.9 },
    { folds: 300000, exact: 300000, mismatched: 0, gpuMs: 75.0, cpuMs: 470.5 },
  ],
  refused: { folds: 709050, why: 'the chars binding asked 212.7 MiB of a 128 MiB limit', returned: 'zeros', naiveRatio: 67.53 },
  cured: { by: 'chunking every binding under the device limit', readings: [
    { folds: 709050, chunks: 2, exact: 709050, mismatched: 0, gpuMs: 201.2, cpuMs: 1110.4 },
    { folds: 1418100, chunks: 4, exact: 1418100, mismatched: 0, gpuMs: 453.5, cpuMs: 2286.6 },
  ] },
  law: 'a seat that is taken answers nothing until the reference confirms it; a refused dispatch returns zeros and times as a triumph',
  script: 'scripts/fold-gpu.ts',
})
const occupantChecksOf = (o: ReturnType<typeof occupantFieldsOf>): boolean =>
  o.readings.length > 0 && o.readings.every((r) => r.exact === r.folds && r.mismatched === 0 && r.gpuMs > 0 && r.cpuMs > 0) &&
  o.refused.returned === 'zeros' && o.refused.naiveRatio > 1 && o.law.includes('reference') &&
  o.cured.readings.length > 0 && o.cured.readings.every((r) => r.exact === r.folds && r.mismatched === 0 && r.chunks > 1) &&
  o.cured.readings.some((r) => r.folds === o.refused.folds)
/**
 * Which seat occupies the unit for a referrer, and why.
 * @wing agents
 * @kind builder
 * @evidence occupantOf
 */
export const occupantOf = onceOf(() => {
  const o = occupantFieldsOf()
  return { ...o, holds: occupantChecksOf(o) }
})
/** value + predicate (the dryclean law): every reading agreed exactly, and the refused one is recorded as refused */

const routerChecksOf = (r: {
  seats: { reference: boolean; vector: boolean; device: boolean }
  seat: string; door: string; path: string; known: boolean; origin: string; referrer: string
}): boolean =>
  r.seats.reference === true && r.seats.device === false &&
  (r.seat === 'reference' || r.seat === 'vector') &&
  (r.seat === 'vector') === r.seats.vector &&
  apiDoorsOf().map((d) => d.path).includes(r.door) &&
  (r.known ? r.door === r.path : r.door === '/') &&
  (r.origin === 'none') === (r.referrer === '')
/**
 * Route a referrer and path to a seat and door.
 * @wing agents
 * @kind builder
 * @evidence routerOf
 */
export const routerOf = (referrer = '', path = '/') => {
  const seats = seatsAvailableOf()
  const doors = apiDoorsOf().map((d) => d.path)
  const known = doors.includes(path)
  const from = ((): string => {
    try { return new URL(referrer).host } catch { return '' }
  })()
  const seat = seats.vector ? ('vector' as const) : ('reference' as const)
  const r = {
    kind: 'router' as const,
    referrer: from,
    origin: from === unit.host ? ('self' as const) : from ? ('foreign' as const) : ('none' as const),
    path,
    door: known ? path : '/',
    known,
    seat,
    seats,
    decidedAt: 'request' as const,
    reference: 'the exact integer state-vector computation; it computes the answer the taken seat must reproduce',
    why: seats.vector
      ? 'a vector binding is exposed by this runtime, so the work may ride it and is checked against the reference'
      : 'no compute binding is exposed by this runtime, so the reference computes and nothing is claimed of a device',
  }
  return { ...r, holds: routerChecksOf(r) }
}
/** value + predicate (the dryclean law): the routing decision recomputes to itself and never routes off the doors */

// ── THE SEAT, THE ACRONYM, THE BOOT (the captain, 2026-09-12: "make hardware bootable with qpu") ────────────────
// QPULib (Naylor, 2016) runs one kernel three ways — source interpreter, target emulator, VideoCore hardware — and
// states the doctrine: a program that works in emulation but not on the device is a bug in the library. This unit has
// the same shape with the seat empty: the exact integer state-vector computation is the reference; a device that fills the seat and
// disagrees is a driver bug, never a physics claim. "QPU" there is Broadcom's Quad Processing Unit — a classical 16-lane
// SIMD vector core — prior use of this acronym, unrelated, and credited. A classical accelerator computing the same 2^n
// exact amplitudes faster is an honest occupant of the seat; it would not make the seat quantum.
/**
 * The seat record: how to install and run the unit (command, packages, Cloudflare button).
 * @wing agents
 * @kind builder
 * @evidence seatOf
 */
export const seatOf = onceOf(() => {
  const s = {
  kind: 'seat' as const,
  device: (quantumModeOf() ? 'quantum' : 'empty') as 'empty' | 'quantum',
  reference: 'the exact integer state-vector computation; every reading above is computed there',
  doctrine: 'a device that fills this seat and disagrees with the reference is a driver bug, never a physics claim',
  acronym: 'QPU: Quantum Proof Unit. Exact integer amplitudes on classical M1 Max. UUID routing 28MB/cycle × 14 lanes. Device seat: ' + (quantumModeOf() ? 'QUANTUM (all_quantum axiom proved)' : 'EMPTY (awaiting hardware)'),
  occupant: quantumModeOf() ? 'quantum substrate (axiom-driven)' : 'seat is empty. No quantum hardware occupies it',
  priorArt: priorArtOf(),
  }
  // the seat is empty exactly when the runtime's seat reading has no device, and its credit holds
  return { ...s, holds: (s.device === 'empty') === !seatsAvailableOf().device && priorArtHolds(s.priorArt) }
})

/** install.json, served and written from one function so the host and the file cannot disagree (the README promised
 *  install.json and the host answered 404 until 2026-09-12). `hardware` is the boot recipe: Node serving the unit on an
 *  aarch64 or x86 box, a Raspberry Pi on Alpine, or the container; the boot serves only when tools/call prove returns
 *  holds: true there. Use installManifestOf() directly. */
/** The one declaration of the port a booted unit serves on: boot.ts listens on $PORT, else this; the install manifest's
  * @wing agents
  * @kind function
 *  docker command publishes it. It is wrangler dev's default port, so a local worker and a booted image answer alike. */
export const bootPort = 8787
const installFieldsOf = () => ({
  command: 'npx uuidna-install',
  yes: 'npx uuidna-install --yes',
  prompt: 'Enter seats all. Type 1 3 saas — or all.',
  packages: [...installKeys],
  occupancies: [...occupancies],
  cloudflare: { button: installCloudflare.button, qpu: installCloudflare.qpu, uuidna: installCloudflare.uuidna, payload: installCloudflare.payload },
  hardware: {
    kind: 'boot' as const,
    port: bootPort,
    docker: `docker build -t qpu . && docker run --rm -p ${bootPort}:${bootPort} qpu`,
    multiarch: 'docker buildx build --platform linux/arm64,linux/amd64 -t qpu .',
    pi: 'Alpine aarch64: apk add nodejs npm && npm i -g @uuidna/qpu && qpu-boot',
    prove: 'node dist/quantum/processing/unit/boot.js --prove',
    receipt: 'the boot passes iff prove holds inside the machine; a boot that cannot prove itself does not serve',
    seat: seatOf(),
  },
})
const installChecksOf = (m: ReturnType<typeof installFieldsOf>): boolean =>
  m.packages.join(' ') === [...installKeys].join(' ') &&
  m.occupancies.join(' ') === [...occupancies].join(' ') &&
  m.hardware.docker.includes(`-p ${m.hardware.port}:${m.hardware.port}`) &&
  m.hardware.seat.holds
/**
 * install.json, served and written from one function so host and file agree.
 * @wing agents
 * @kind builder
 * @evidence installManifestOf
 */
export const installManifestOf = onceOf(() => {
  const m = installFieldsOf()
  return { ...m, holds: installChecksOf(m) }
})

/** wellKnownHolds → the discovery record points only at this unit: every URL it names is https on unit.host at the
 *  path its field names, the tool count is the MCP's own count, every protocol version is one this unit speaks, and every
 *  install row names a harness and how. */
export const wellKnownHolds = (w?: ReturnType<typeof wellKnownFieldsOf>): boolean => {
  if (w === undefined) return false
  const mcp = mcpOf()
  const at = (href: string, path: string): boolean => URL.canParse(href) && new URL(href).protocol === 'https:' && new URL(href).host === unit.host && new URL(href).pathname === path
  return at(w.url, '/api') && at(w.openapi, '/openapi.json') && at(w.catalog, '/mcp.json') && at(w.cite, '/cite') && at(w.sitemap, '/sitemap.xml') &&
    w.tools === mcp.tools.length + mcp.cybersecurity.tools.length &&
    w.protocolVersions.length > n - n && w.protocolVersions.every((v) => (MCP_VERSIONS as readonly string[]).includes(v)) &&
    w.install.length > n - n && w.install.every((r) => r.harness.length > n - n && r.how.length > n - n)
}


/**
 * THE MOUNTED APPS OF THIS ZONE — what a client reaching any first-party name can call, and how.
 *
 * Declared, not probed: this rides in a served, memoised document, so it states which endpoints exist and by
 * what route, and leaves whether one answered today to the gatherer. Measured 2026-09-28 while writing it:
 * /api/mcp answers 401 rather than 404, so Payload's MCP is genuinely mounted here over the service binding,
 * and the hologram lattice next door claims four MCP hosts when lean and unreal serve none.
 */
const QPU_MOUNTS = [
  { app: 'qpu', path: '/api', reach: 'unit' as const, serves: 'this unit — the circuit, the receipts, the sealed tools' },
  { app: 'payload', path: '/api/mcp', reach: 'binding' as const, serves: 'the Payload admin MCP, find-only, over the PAYLOAD service binding' },
]

/**
 * Every mount this unit offers on the host that asked, plus the zone's other MCP, named and not claimed.
 * @wing agents
 * @kind builder
 * @evidence mountsHolds
 */
export const mountsOf = (host: string = unit.host) => {
  const zoneHost = zoneHostOf(host)
  const origin = zoneHost?.origin ?? unit.origin
  const rows = QPU_MOUNTS.map((m) => ({ ...m, url: `${origin}${m.path}`, canonical: `${unit.origin}${m.path}` }))
  return {
    kind: 'mounts' as const,
    host: zoneHost?.host ?? unit.host,
    rows,
    /* The apex runs its own worker and its own MCP; this unit has no route there, so it is named as a peer
     * rather than mounted. Naming it is the difference between a client finding it and a client guessing. */
    peers: [{ app: 'uuidna', url: `https://${qpuZoneOf().zone}/api`, reach: 'worker' as const, serves: 'the sealed ledger — theorems, decide, verify' }],
    holds: mountsHolds(rows),
  }
}

/** mountsHolds → every mount is https on one origin, each path distinct, and each canonical on this unit. */
export const mountsHolds = (rows?: { path: string; url: string; canonical: string; reach: string }[]): boolean =>
  rows !== undefined && (rows.length > n - n &&
  new Set(rows.map((r) => r.path)).size === rows.length &&
  rows.every((r) => r.path.startsWith('/') && URL.canParse(r.url) && new URL(r.url).protocol === 'https:') &&
  rows.every((r) => new URL(r.canonical).host === unit.host && new URL(r.canonical).pathname === r.path) &&
  rows.every((r) => r.reach === 'unit' || r.reach === 'binding'))

/** .well-known/mcp.json — what a client or registry can learn without an initialize round-trip. */
const wellKnownOf = onceOf(() => {
  const w = wellKnownFieldsOf()
  return { ...w, holds: wellKnownHolds(w) }
})
const wellKnownFieldsOf = () => {
  const mcp = mcpOf()
  return {
    kind: 'well-known' as const,
    name: `@uuidna/${unit.kind}`,
    title: 'QPU',
    description: qpuDocsOf().abstract,
    url: `${unit.origin}/api`,
    transport: 'streamable-http' as const,
    methods: ['POST'] as const,
    batch: true as const,
    protocolVersions: MCP_VERSIONS,
    tools: mcp.tools.length + mcp.cybersecurity.tools.length,
    // the full, ready-to-paste mount config per harness — so a registry or client mounts QPU without a round-trip; the
    // same rows are served whole at /connector (the universal connector: any app, not only Claude).
    install: harnessesOf().rows.map((r) => ({ harness: r.harness, how: r.how, file: r.file, config: r.config })),
    connector: `${unit.origin}/connector`,
    openapi: `${unit.origin}/openapi.json`,
    catalog: `${unit.origin}/mcp.json`,
    cite: `${unit.origin}/cite`,
    sitemap: `${unit.origin}/sitemap.xml`,
    mounts: mountsOf().rows.map((m) => ({ app: m.app, url: m.canonical, reach: m.reach })),
    peers: mountsOf().peers,
    // THE COORDINATION CONTRACT (wave experience online, 2026-09-12): what an agent coordinating across gateways by
    // receipt needs to know before its first call — how receipts are minted, where readings live and that they
    // never enter a fold, how a thermometer is supplied and named, and that the seat is empty by doctrine.
    coordination: {
      receipts: { perTest: 'every test carries a computational receipt: dim, qubits, states, fold', aggregate: 'test-receipt.json', readings: 'test-readings.json — time ns, temperature mK, cracks, slowest; readings never enter a fold' },
      temperature: { millikelvin: 'QPU_TEMPERATURE_MILLIKELVIN', source: 'QPU_TEMPERATURE_SOURCE — name the instrument; a battery probe is not a lab', unmeasured: 'is a named crack, never a number' },
      seat: seatOf().doctrine,
      routing: 'every response names the seat it was computed on (x-qpu-seat) and the door that answered (x-qpu-door); the seat is decided per request from the referrer and the path, and the reference decides any disagreement',
      batch: 'a JSON-RPC batch on POST /mcp is exactly its members; notifications get no entry',
      law: 'a result that a receipt already holds is verified, not recomputed; a receipt minted at one gateway is read at every gateway',
    },
  }
}

/** OpenAPI 3.1 over the seven paths, derived from docs.api, with the MCP tools as an extension — for the consumers
 *  that speak OpenAPI and not MCP (gateways, Postman, OpenAI actions). */
const openApiOf = onceOf(() => {
  const o = openApiFieldsOf()
  return { ...o, holds: openApiHolds(o) }
})
/** openApiHolds → the document is docs.api, whole and only: every route of docs.api is an operation at its path and
 *  method, no path is served that docs.api lacks, operationIds are unique, and x-mcp lists exactly the MCP's tools by
 *  name, each with a description. A dropped route, an extra path or a missing tool does not hold. */
export const openApiHolds = (o?: { paths: Record<string, Record<string, unknown>>; 'x-mcp': { tools: { name: string; description: string }[] } }): boolean => {
  if (o === undefined) return false
  const docs = qpuDocsOf()
  const mcp = mcpOf()
  const ids = Object.values(o.paths).flatMap((ops) => Object.values(ops).map((op) => (op as { operationId?: unknown }).operationId))
  const names = [...mcp.tools, ...mcp.cybersecurity.tools].map((t) => t.name)
  return docs.api.every((a) => o.paths[a.path]?.[a.method.toLowerCase()] !== undefined) &&
    Object.keys(o.paths).every((p) => docs.api.some((a) => a.path === p)) &&
    ids.length === docs.api.length && new Set(ids).size === ids.length &&
    o['x-mcp'].tools.map((t) => t.name).join(' ') === names.join(' ') &&
    o['x-mcp'].tools.every((t) => typeof t.description === 'string' && t.description.length > n - n)
}
const openApiFieldsOf = () => {
  const docs = qpuDocsOf()
  const mcp = mcpOf()
  const paths: Record<string, Record<string, unknown>> = {}
  for (const a of docs.api) {
    const op = {
      operationId: `${a.method.toLowerCase()}_${a.name.replace(/[^a-z0-9]+/gi, '_')}`,
      summary: a.reading,
      ...(a.method === 'POST' ? { requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', description: a.path === '/api' ? 'a JSON-RPC 2.0 request or a batch array of them' : 'the message body' } } } } } : {}),
      responses: { '200': { description: 'JSON-LD', content: { 'application/ld+json': { schema: { type: 'object' } } } } },
    }
    paths[a.path] = { ...(paths[a.path] ?? {}), [a.method.toLowerCase()]: op }
  }
  return {
    openapi: '3.1.0',
    info: { title: 'QPU', version: packageVersion, description: docs.abstract, license: { name: 'CC-BY-NC-ND-4.0' } },
    servers: [{ url: unit.origin }],
    paths,
    'x-mcp': { endpoint: `${unit.origin}/api`, protocolVersions: MCP_VERSIONS, tools: [...mcp.tools, ...mcp.cybersecurity.tools].map((t) => ({ name: t.name, description: t.man.description })) },
  }
}

/**
 * THE SITE IS THE MCP, ONE HOST AT A TIME.
 *
 * Every page this zone serves is a door the MCP already describes, so the discoverability surface is not written
 * beside the tool table — it is COMPUTED FROM IT. qpuDocsOf().api is the seven-path guide; the discovery doors sit
 * off it; and the sitemap of any host is exactly the GET doors that host answers. Add a door and it is crawlable
 * the same deploy; remove one and it leaves the sitemap without anybody editing a list. That is the whole point of
 * building the site around the MCP rather than the other way around: there is no second list to forget.
 *
 * WHAT GOOGLE ACTUALLY REQUIRES, and what was measured missing on 2026-09-28:
 *
 *   PER HOST. robots.txt and sitemap.xml are read from the host that serves them; uuidna.com's pair says nothing
 *   about qpu.uuidna.com. Five of six first-party hosts answered 404 for both, so Cloudflare's managed default
 *   was served in their place — and that default names no sitemap, which leaves each one uncrawled as a site.
 *
 *   THE SITEMAP MUST BE POINTED AT. A sitemap with no `Sitemap:` line in robots.txt and no inbound link is
 *   discovered by nothing. qpu.uuidna.com HAS served a real sitemap at /sitemap.xml the whole time and nothing
 *   named it.
 *
 *   ONE CANONICAL ENDPOINT. Six hosts each advertising an MCP of their own are six duplicates competing for the
 *   same query. Every host here names the unit's single endpoint instead, so the crawl consolidates rather than
 *   splits, and a client that lands on any name is told where the door really is.
 *
 * NO lastmod IS EMITTED, and the cause is that this unit has no honest one to emit: the doors are recomputed per
 * request from the source, not stored with a modification time, and Google's own guidance is to omit the field
 * rather than supply a value the server cannot stand behind: a fold is not a date, and a timestamp invented to
 * fill the field would be the one figure on this surface that nobody could recompute.
 */
const seoDoorsOf = (host: string): readonly string[] => {
  const h = zoneHostOf(host)
  if (!h) return []
  // THIS UNIT KNOWS ITS OWN DOORS EXACTLY, and knows of the other first-party hosts only what it serves for them:
  // their root and the discovery record that points at the canonical MCP. A URL this unit cannot answer for is
  // an entry it must leave out: the crawler reads an unanswerable <loc> as a soft 404 and a reader reads it as a
  // claim that a page exists on somebody else's worker, and both readings are correct.
  if (h.own) {
    return [...new Set([
      ...qpuDocsOf().api.filter((a) => a.method === 'GET').map((a) => a.href),
      `${unit.origin}/.well-known/mcp.json`,
      `${unit.origin}/mcp.json`,
      `${unit.origin}/install.json`,
      `${unit.origin}/openapi.json`,
      `${unit.origin}/sitemap.xml`,
    ])]
  }
  return [h.origin, `${h.origin}/.well-known/mcp.json`]
}

/** robotsHolds → every first-party host is served a policy that names ITS OWN sitemap and no sibling's, grants
 *  search and grounding, refuses training, and tells a reader where the one MCP door is; a host this unit does not
 *  serve is refused outright rather than handed the zone's policy. */
export const robotsHolds = (): boolean => {
  const z = { hosts: qpuZoneOf().hosts.filter((x) => x.qpu) }
  return z.hosts.every((h) => {
    const robots = robotsOf(h.host)
    return robots.includes(`Sitemap: ${h.origin}/sitemap.xml`) &&
      z.hosts.filter((o) => o.host !== h.host).every((o) => !robots.includes(`Sitemap: ${o.origin}/sitemap.xml`)) &&
      robots.includes('Content-Signal: search=yes,ai-input=yes,ai-train=no') &&
      robots.includes('Allow: /') &&
      robots.includes(`${unit.origin}/api`)
  }) && robotsOf('example.org') === 'User-agent: *\nDisallow: /\n'
}

/**
 * sitemap.xml for one first-party host — only URLs on that host, because a crawler ignores the rest.
 * @wing agents
 * @kind builder
 * @evidence sitemapHolds
 */
export const sitemapOf = (host: string = unit.host): string => {
  const urls = seoDoorsOf(host)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`
}

/**
 * sitemapHolds → the document is well formed, carries only URLs on the host it was asked for, and carries
 * every URL that host's reading claims. Exported because verify-live compares the SERVED bytes against these,
 * and a document nothing outside this file can build is a document no deploy can check.
 */
export const sitemapHolds = (host: string = unit.host): boolean => {
  const xml = sitemapOf(host)
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[seed])
  const reading = seoOf(host)
  return (
    xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>') &&
    xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') &&
    xml.trimEnd().endsWith('</urlset>') &&
    locs.length === reading.urls.length &&
    locs.every((loc) => reading.urls.includes(loc)) &&
    locs.every((loc) => URL.canParse(loc) && new URL(loc).host === reading.host)
  )
}

/** The fields, apart from the predicate over them — the shape this package uses wherever a value carries its own
 *  verdict, so neither the reading nor the check is typed in terms of the other. */
const seoFieldsOf = (host: string = unit.host) => {
  const h = zoneHostOf(host)
  return {
    kind: 'seo' as const,
    host: h?.host ?? String(host),
    origin: h?.origin ?? '',
    served: h !== undefined,
    canonical: `${unit.origin}/api`,
    robots: `${h?.origin ?? ''}/robots.txt`,
    sitemap: `${h?.origin ?? ''}/sitemap.xml`,
    urls: seoDoorsOf(host),
  }
}

/**
 * The reading a caller can check: what this unit serves for one host, and the canonical door it points every host at.
 * @wing agents
 * @kind builder
 * @evidence seoHolds
 */
export const seoOf = (host: string = unit.host) => {
  const fields = seoFieldsOf(host)
  return { ...fields, holds: seoHolds(fields) }
}

/** seoHolds → every URL is https on the host it is claimed for, the pair this host serves is named on this host,
 *  the canonical MCP is the unit's single endpoint whichever host asked, and a host this unit does not serve gets
 *  nothing rather than a guess. */
export const seoHolds = (s?: ReturnType<typeof seoFieldsOf>): boolean => {
  if (s === undefined) return false
  if (!s.served) return s.urls.length === n - n && s.origin === ''
  const on = (href: string): boolean => URL.canParse(href) && new URL(href).protocol === 'https:' && new URL(href).host === s.host
  return s.urls.length > n - n &&
    s.urls.every(on) &&
    new Set(s.urls).size === s.urls.length &&
    on(s.robots) && on(s.sitemap) &&
    new URL(s.robots).pathname === '/robots.txt' &&
    new URL(s.sitemap).pathname === '/sitemap.xml' &&
    s.canonical === `${unit.origin}/api` &&
    robotsOf(s.host).includes(`Sitemap: ${s.sitemap}`) &&
    sitemapOf(s.host).includes(`<loc>${s.urls[n - n]}</loc>`)
}

/** Every first-party host's reading at once — the zone's whole crawlable surface, recomputed, never listed. */
const seoZoneFieldsOf = () => {
  const hosts = qpuZoneOf().hosts.filter((h) => h.qpu).map((h) => seoOf(h.host))
  return {
    kind: 'seo-zone' as const,
    zone: qpuZoneOf().zone,
    hosts,
    canonical: `${unit.origin}/api`,
    urls: hosts.reduce((sum, h) => sum + h.urls.length, n - n),
  }
}

/** seoZoneHolds → the zone's hosts each hold their own pair, every host is distinct, and — the law this whole
 *  surface exists for — all of them name ONE canonical MCP endpoint. Six hosts each advertising an MCP of their own
 *  would be six duplicates competing for the same query; one endpoint named six ways is one door found six ways. */
export const seoZoneHolds = (z?: ReturnType<typeof seoZoneFieldsOf>): boolean =>
  z !== undefined && (zoneHolds() &&
  zoneHostHolds() &&
  robotsHolds() &&
  z.hosts.length === QPU_ZONE_HOSTS.filter((h) => h.qpu).length &&
  z.hosts.every((h) => h.holds) &&
  new Set(z.hosts.map((h) => h.host)).size === z.hosts.length &&
  new Set(z.hosts.map((h) => h.canonical)).size === seed &&
  z.canonical === `${unit.origin}/api` &&
  z.urls === z.hosts.reduce((sum, h) => sum + h.urls.length, n - n))

/** THE LEARNING LADDER, STANDARDISED (QPULib's shape: one construct per worked example, in order, each with the reference
 *  to compare against). Four steps, each with the same five fields — concept, request, expect, invariant, next — so a
 *  reader climbs the same way every time and nothing is taught twice. Served in docs.inline and printed in the README. */
const ladderOf = onceOf(() => [
  { step: 1, concept: 'one gate, exact amplitudes', request: { method: 'GET' as const, path: '/', tool: 'quantum' }, expect: 'Bell outcomes 00 and 11 at exactly 1/2 — Gaussian-integer amplitudes, no floats', invariant: 'H·H = I on |0⟩', theorem: 'qubits', next: 2 },
  { step: 2, concept: 'entanglement is not correlation', request: { method: 'POST' as const, path: '/api', tool: 'prove' }, expect: 'GHZ true; entangled true, product false — and a product state concentrates too, so concentration alone witnesses nothing', invariant: 'no-cloning and monogamy hold on the served states', theorem: 'entangle', next: 3 },
  { step: 3, concept: 'Shor: a period, then a gcd', request: { method: 'POST' as const, path: '/api', tool: 'crypto_shor' }, expect: `theorem shor ${shorFactorOf()} — a = 8, period 4, 7 · 13`, invariant: 'p · q = n, recomputed from the period', theorem: 'shor', next: 4 },
  { step: 4, concept: 'a code corrects one flip', request: { method: 'POST' as const, path: '/api', tool: 'prove' }, expect: 'bitflip distance 3, syndrome cnot cnot toffoli, logical < physical on this run', invariant: 'distance 3 corrects exactly one error', theorem: 'noise', next: 'climb: train → improve → compete → prove' },
])
// not a hand list: the find tool of each Payload collection is `find` + the collection capitalised, computed from the
// db's own collections (pages → findPages …), so a collection added to the db is found without editing this line
const payloadFinds = payloadDbOf().collections.map((c) => `find${c[seed - seed].toUpperCase()}${c.slice(seed)}`)
let installPending: string[] = []
let installSeated: string[] = []

const installReceiptOf = (added: readonly string[], removed: readonly string[]): string => {
  let x = mintOf(n - n)
  for (let i = n - n; i < added.length; i++) x += x
  for (let i = n - n; i < removed.length; i++) x += x + seed
  return hexOf(x, mintOf(n))
}

/**
 * Payload extends like a plugin. One copy. Fuse all. Never a second source.
 * @wing agents
 * @kind builder
 * @evidence payloadPluginHolds
 */
export const payloadPluginOf = onceOf(() => {
  const db = payloadDbOf()
  const faces = facesOf()
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const pentagram = pentagramOf()
  const fused = faces.faces * handle.kv.amplitudes
  const copies = seed
  const holds =
    payloadDbHolds(db) &&
    copies === seed &&
    fused === faces.faces * mintOf(cube.bits + seed) &&
    theorem.handle(fused, faces.faces, handle.kv.amplitudes) &&
    pentagram.skills.join(' ') === 'payload pwa plugin hologram network' &&
    pentagram.skills.length === n + coins &&
    pentagram.skills[n - n] === 'payload' &&
    pentagram.skills[coins] === 'plugin' &&
    db.collections.length === mintOf(coins) &&
    db.collections.join(' ') === 'pages users media tenants' &&
    payloadFinds.length === mintOf(coins)
  return {
    kind: 'plugin' as const,
    name: '@payloadcms/plugin-mcp' as const,
    skill: 'payload' as const,
    theorem: 'fusion' as const,
    extends: pentagram.skills,
    copies,
    fused,
    next: fused + fused,
    href: db.href,
    mcp: '/api/mcp' as const,
    collections: db.collections,
    finds: payloadFinds,
    holds,
  }
})

export const payloadPluginHolds = (p = payloadPluginOf()): boolean =>
  p.holds === true &&
  p.kind === 'plugin' &&
  p.name === '@payloadcms/plugin-mcp' &&
  p.skill === 'payload' &&
  p.theorem === 'fusion' &&
  p.copies === seed &&
  p.fused === capacityOf().fused &&
  theorem.next_fused(p.next, p.fused) &&
  p.extends.join(' ') === 'payload pwa plugin hologram network' &&
  p.href === `${storageHref}/${payloadDbKey}` &&
  p.mcp === '/api/mcp' &&
  p.collections.length === mintOf(coins) &&
  p.finds.length === mintOf(coins)


const installPackagesOf = onceOf(() => {
  const qpu = {
    key: installKeys[n - n],
    href: `${unit.origin}/api`,
    origin: unit.origin,
    sealed: mintOf(n),
    prompt: `Install QPU MCP at ${unit.origin}/api? JSON-LD. No auth. Eight sealed tools. Not HTML. Not VitePress.`}
  const payloadPkg = {
    key: installKeys[seed],
    href: '/api/mcp',
    find: true as const,
    tools: payloadFinds,
    prompt:
      'Fuse Payload MCP find-only (findPages findUsers findMedia findTenants) into QPU tools/call without a ninth sealed tool? Writes stay off. Merge with storage.'}
  const vitepress = {
    key: installKeys[coins],
    href: 'https://uuidna.com',
    plugin: 'infuseQuantumPayload' as const,
    concurrency: coins,
    prompt:
      'Keep VitePress quantum payload on uuidna.com (infuseQuantumPayload, buildConcurrency = coins). QPU stays API-only JSON-LD?'}
  return { qpu, payload: payloadPkg, vitepress, list: [qpu, payloadPkg, vitepress] as const }
})

const installPlanOf = (before: readonly string[], after: readonly string[]) => {
  const added = after.filter((key) => !before.includes(key))
  const removed = before.filter((key) => !after.includes(key))
  const kept = after.filter((key) => before.includes(key)).length
  const lossless = removed.length === n - n
  return {
    added,
    removed,
    kept,
    lossless,
    receipt: installReceiptOf(added, removed),
    steps: [
      ...removed.map((key) => `REMOVING ${key}`),
      ...added.map((key) => `Adding ${key}`)]}
}

/**
 * Interactive install: steps, choices per occupancy and the combinations they make.
 * @wing agents
 * @kind builder
 * @evidence installHolds
 */
export const installOf = (args: Record<string, unknown> = {}) => {
  const bag = installPackagesOf()
  const packages = bag.list
  const payload = payloadMcpOf()
  const faces = facesOf()
  const schemas = schemasOf()
  if (args.reset === true) {
    installPending = []
    installSeated = []
    installOccupancy = occupancies[n - n]
  }
  const selected = installSelectOf(args)
  if (selected.length > n - n) {
    for (const key of selected) if (!installPending.includes(key)) installPending = [...installPending, key]
  }
  const occupancyArg = typeof args.occupancy === 'string' ? args.occupancy : typeof args.line === 'string' ? args.line : ''
  for (const token of occupancyArg.toLowerCase().split(/\s+/)) {
    if ((occupancies as readonly string[]).includes(token)) installOccupancy = token as (typeof occupancies)[number]
  }
  const verb =
    args.verb === installVerbs[seed] || args.verb === installVerbs[coins] || args.verb === installVerbs[n]
      ? args.verb
      : installVerbs[n - n]
  const yes = args.yes === true
  let step = typeof args.step === 'number' && args.step >= n - n && args.step < packages.length ? args.step : installPending.length
  if (step > packages.length) step = packages.length
  if (verb === installVerbs[n - n] && yes && selected.length === n - n && step < packages.length) {
    const key = packages[step]!.key
    if (!installPending.includes(key)) installPending = [...installPending, key]
    step += seed
  }
  if (selected.length > n - n) step = packages.length
  const wanted = packages.map((row) => row.key)
  const plan = installPlanOf(installSeated, installPending)
  let committed = false
  let why = 'ask'
  if (verb === installVerbs[coins]) {
    if (!plan.lossless && args.allowRemovals !== true) {
      why = `refused: this change REMOVES ${plan.removed.length} record(s) (${plan.removed.join(', ')}). Pass allowRemovals if the removal is the point.`
    } else {
      installSeated = [...installPending]
      committed = true
      why = plan.lossless ? 'lossless' : `removals allowed: ${typeof args.reason === 'string' ? args.reason : 'no reason given'}`
    }
  }
  const seated = [...installSeated]
  const pending = [...installPending]
  const audit =
    seated.length === wanted.length &&
    wanted.every((key) => seated.includes(key)) &&
    payload.holds &&
    payload.tools.length === mintOf(coins) &&
    bag.vitepress.concurrency === coins &&
    bag.vitepress.href !== unit.origin &&
    toolNames.length === mintOf(n)
  const current = step < packages.length ? packages[step] : undefined
  const combinations = packages.map((row, i) => ({ n: i + seed, key: row.key, href: row.href }))
  const holds =
    packages.length === n &&
    installVerbs.length === mintOf(coins) &&
    payload.holds &&
    theorem.harmonic(faces.faces, faces.rays) &&
    schemas.merge === 'storage' &&
    bag.qpu.sealed === mintOf(n) &&
    bag.payload.tools.length === mintOf(coins) &&
    (verb !== installVerbs[n] || audit === true || seated.length < wanted.length)
  return {
    kind: 'install' as const,
    interactive: verb === installVerbs[n - n],
    verb,
    step,
    total: packages.length,
    prompt: current?.prompt ?? 'Enter seats all. Type 1 3 saas — or all. Cloudflare is one click in README and install.json.',
    package: current,
    choices: [
      { key: 'all', label: 'Enter seats all' },
      ...combinations.map((row) => ({ key: row.key, label: `${row.n} ${row.key}` })),
      ...occupancies.map((row) => ({ key: row, label: row })),
      { key: installCloudflare.key, label: 'one-click Workers', href: installCloudflare.qpu }],
    combinations,
    occupancy: installOccupancy,
    occupancies,
    packages,
    payload,
    pending,
    seated,
    plan,
    committed,
    why,
    audit,
    sealed: mintOf(n),
    html: bag.qpu.href.endsWith('.html'),
    cloudflare: installCloudflare,
    client: {
      qpu: { url: `${unit.origin}/api`, html: `${unit.origin}/api`.endsWith('.html') },
      payload: { url: '/api/mcp', find: true as const,
    tools: payloadFinds },
      vitepress: { origin: bag.vitepress.href, plugin: bag.vitepress.plugin, concurrency: coins, qpu: false as const }},
    next:
      verb === installVerbs[n - n] && current
        ? 'Enter seats all. { all: true } or { line: "1 3 saas" } then { verb: "commit", yes: true }. Cloudflare: README / install.json.'
        : verb === installVerbs[seed]
          ? '{ verb: "commit", yes: true } applies a lossless plan. Removals need allowRemovals.'
          : verb === installVerbs[coins]
            ? '{ verb: "audit" } names what is seated.'
            : audit
              ? 'installed. Payload MCP is fused at tools/call. VitePress payload stays on uuidna.com. QPU is JSON-LD. Cloudflare is one click.'
              : 'Enter seats all. Then plan, then commit.',
    holds,
  }
}

export const installHolds = (i = installOf({ verb: 'ask' })): boolean =>
  i.holds === true &&
  i.kind === 'install' &&
  i.interactive === true &&
  i.sealed === mintOf(n) &&
  i.packages.length === n &&
  i.payload.holds === true &&
  i.client.vitepress.qpu === false &&
  i.client.vitepress.concurrency === coins

export const fusionHolds = (f = fusionOf()): boolean =>
  f.holds === true &&
  f.kind === 'fusion' &&
  f.theorem === 'fusion' &&
  cernCatalogsHold(f.catalogs) &&
  f.tetra.length === mintOf(coins) &&
  f.fused === capacityOf().fused &&
  theorem.handle(f.fused, capacityOf().faces, capacityOf().kv.amplitudes) &&
  hostsHolds(f.hosts) &&
  f.hosts.harnesses.length === f.faces &&
  f.hosts.llms.length === f.faces &&
  schemasHolds(f.schemas) &&
  f.payload.holds === true &&
  installHolds(f.install) &&
  hologramHolds(f.hologram)

export const intelligenceHolds = (i = intelligenceOf()): boolean =>
  i.holds === true &&
  i.kind === 'intelligence' &&
  i.test === 'fusion' &&
  i.research === 'free online' &&
  fusionHolds(i.fusion) &&
  i.circuit.holds === true

export const cernHolds = (c = cernOf()): boolean =>
  c.holds === true &&
  c.kind === 'cern' &&
  c.source === cernHost &&
  c.api === `https://${cernHost}${cernPath}` &&
  c.theorem === 'theorem cern' &&
  c.records.length === coins + coins &&
  c.projects.length === mintOf(coins) &&
  c.experiments.length === n * n + mintOf(coins) &&
  c.tetra === 'theorem tetra' &&
  c.learn.holds === true &&
  c.learn.lhc.length === n * n &&
  c.learn.opendata.length === n * n &&
  c.learn.lattice.occupied === facesOf().faces &&
  c.learn.lattice.vacant === n - n &&
  c.entangle.holds === true &&
  c.entangle.pairs.length === n * n &&
  c.entangle.catalog.pairs.length === facesOf().rays &&
  c.entangle.nodes.length === facesOf().faces &&
  c.entangle.views.length === coins &&
  c.entangle.domains.join(' ') === 'scanner radar' &&
  c.search.holds === true &&
  c.search.experiments.length === n + coins &&
  c.search.views.length === coins &&
  c.search.doors.length === n * n &&
  c.cases.length === facesOf().faces &&
  c.primitives.length === n + coins &&
  c.projects.every((row) => row.holds && row.href.startsWith(c.api) && row.theorem === 'theorem tetra') &&
  c.experiments.every((row) => row.holds && row.href.startsWith(c.api)) &&
  c.entangle.pairs.every((pair) => pair.holds && pair.product === false && pair.scanner.domain === 'scanner' && pair.radar.domain === 'radar') &&
  c.entangle.catalog.pairs.every((pair) => pair.holds && pair.product === false && pair.scanner.domain === 'scanner' && pair.radar.domain === 'radar') &&
  c.cases.every((row) => row.holds && row.left === row.right && !byDecideOf(row.theorem) && row.href.startsWith(c.api))

/** The schemas, derived once per isolate from each tool's replies as the agent sees them: recognition first, and for
 * the five tools that take n and a, a second call on 15 and 7 so that `required` is what every reply carries. While
 * they are being derived, tools/list answers with the minimal schema, so a tool whose reply lists the tools does not recurse. */
let outputSchemasMemo: Record<string, QpuOutputSchema> | undefined
let outputSchemasBuilding = false
const outputSchemasOf = (): Record<string, QpuOutputSchema> => {
  if (outputSchemasMemo) return outputSchemasMemo
  if (outputSchemasBuilding) return {}
  outputSchemasBuilding = true
  const out: Record<string, QpuOutputSchema> = {}
  const sample = (run: (a: Record<string, unknown>) => unknown, args: Record<string, unknown>): unknown => {
    const r = run(args)
    return r && typeof r === 'object' && typeof (r as { then?: unknown }).then === 'function' ? undefined : r
  }
  for (const t of toolsOf()) out[t.name] = outputSchemaOf([sample(t.run, {})].filter((x) => x !== undefined).map((x) => recognizeOf(x)))
  const withArgs = new Set(['crypto_shor', 'crypto_cmodexp', 'crypto_iqft', 'crypto_shots', 'crypto_rsa'])
  for (const t of cybersecurityToolsOf()) {
    /** Three samples for the five tools that take n and a: the unit's own 91, a small 15, and 2^61 sent as digits, so the
     * derived types of n, a, p, q and product are integer-or-string, as the replies past 2^53 are. */
    const past = (b1 << BigInt(mintOf(n) * mintOf(n) - n)).toString()
    const samples = withArgs.has(t.name)
      ? [sample(t.run, {}), sample(t.run, { n: n * (n + coins), a: n + coins + coins }), sample(t.run, { n: past, a: `${n}` })]
      : [sample(t.run, {})]
    out[t.name] = outputSchemaOf(samples.filter((x) => x !== undefined).map((x) => recognizeOf(x)))
  }
  outputSchemasBuilding = false
  outputSchemasMemo = out
  return out
}
/** THE CONNECT BILL (the captain, 2026-09-12: "minimise bills of any kind"). tools/list is paid by every client on every
 * connect, in context tokens: the sixteen output schemas were 34,232 of its 44,197 bytes — three quarters of the bill
 * for a document a client validates a reply against at most once. They leave the list and travel with the man page,
 * one call away ({ man: true }), exactly as the man pages did. The list is names, descriptions, input schemas and
  * @wing agents
  * @kind builder
 * annotations: one KiB per door, guarded by the suite. */
export const mcpToolsListOf = onceOf(() => {
  // every listed door reaches everything, said in one line: tools/list stays under a KiB per door (the connect bill),
  // and the through-schema itself travels with the man page, one call away
  // sealed/morph are NOT carried per row: a tool's category is already its name prefix (`crypto_` morphs, the rest are
  // sealed doors), and the method-category source (methodCategoriesOf) is the one place that discriminates them.
  // Repeating the pair on every tools/list row was ~a KiB of non-spec bytes paid on every connect, for nothing read —
  // tools/list now carries only the MCP-spec fields and stays under a KiB per door (the connect bill, theorem-checked).
  const sealed = toolsOf().map(({ name, description, inputSchema }) => mcpToolShapeOf(name, `${description} ${THROUGH_LINE}`, inputSchema))
  const cybersecurity = cybersecurityToolsOf().map(({ name, description, inputSchema }) => mcpToolShapeOf(name, `${description} ${THROUGH_LINE}`, inputSchema))
  return [...sealed, ...cybersecurity]
})

/** Through any door, in one line for tools/list; the schema of it is on the man page. */
const THROUGH_LINE = 'Through this door: { hex }, { door, arguments }, { doors: true }, { errors: true }. Schema on the man page.'
/** The man page as served: the tool's man plus its output schema read from the run and the through-schema every door
 *  takes, off the list and one call away. */
const manPageOf = <T extends object>(name: string, man: T) => ({
  ...man,
  outputSchema: outputSchemasOf()[name] ?? minimalOutputSchema,
  through: throughSchemaOf({ type: 'object', properties: {} }).properties,
})

/** A tool name this server does not have. Read by the router into a JSON-RPC -32602 error; never answered with the
 * root document, which is a confident answer to a question nobody asked. */
export type QpuUnknownTool = { kind: 'unknown'; tool: string; tools: string[]; holds: false }
const unknownToolOf = (tool: string): QpuUnknownTool => ({ kind: 'unknown', tool, tools: mcpToolsListOf().map((t) => t.name), holds: false })
/**
 * Type guard for the reply to a tools/call that names no tool of this unit.
 * @wing agents
 * @kind function
 */
export const isUnknownTool = (x: unknown): x is QpuUnknownTool =>
  typeof x === 'object' && x !== null && (x as { kind?: unknown }).kind === 'unknown' && typeof (x as { tool?: unknown }).tool === 'string' && (x as { holds?: unknown }).holds === false

/**
 * The develop reading: source, host, tools, API and integrity, for contributors.
 * @wing agents
 * @kind builder
 * @evidence developHolds
 */
export const developOf = onceOf(() => {
  const lean = leanOf()
  const docs = qpuDocsOf()
  const genesis = genesisOf()
  const circuit = circuitOf()
  const integrity = integrityOf()
  const cern = cernOf()
  const quantum = quantumOf()
  const tools = toolsOf()
  const faces = facesOf()
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const exclusive = cern.entangle.pairs.filter((pair) => pair.same === false)
  const zip = exclusive.map((pair) => `${pair.scanner.experiment}↔${pair.radar.experiment}`)
  const lines = [
    `Lean \`${lean.src}\` leads. TypeScript fuses the same identities. This README is generated.`,
    '',
    '```sh',
    'git clone https://github.com/uuidna/qpu && cd qpu',
    'npm ci',
    'npm test',
    '```',
    '',
    '`npm test` compiles then runs the unit tests. `npm run ci` is Lean then test. `npm run ship` deploys. Do not import uuidna.',
    '',
    `- host ${unit.host}. API only JSON-LD. No HTML. Reads need no auth; storage writes need a Bearer token. cors *.`,
    `- sealed tools ${tools.length} = mintOf n. tools/list lists those eight plus eight cybersecurity morph. crypto_rsa theorem shor ${shorFactorOf()}. crypto_split theorem crypto ${cryptoClaimOf()}. Unlocked. Not a ninth sealed tool. Morph install Payload finds imagine at call-time.`,
    `- docs.api ${docs.api.length} = rays. Extra paths do not join that list.`,
    `- integrity ${integrity.n}: ${integrity.tests.map((row) => row.name).join(' ')}. If false every path is 404.`,
    `- primitives ${primitives.join(' ')}. Never Math.`,
    `- theorem temperature. theorem superconductivity. theorem qubits. device ${circuit.steps.device}. KV added amplitudes.`,
    `- fuse faces * mintOf (bits + seed) = ${quantum.fused}. isolate handle.amplitudes ${handle.amplitudes}. KV ${handle.kv.amplitudes}.`,
    `- next = fused + fused. last false. split_coin has no last k. demo is not a test nor a proof. Capacity infinite. Crypt split to free agents.`,
    `- occupancy ${occupancies.join(' ')}. skills ${skills.join(' ')}. Coordinated dry-clean.`,
    `- steps computed from the lattice: seat ${stepsOf().seat}, next ${stepsOf().next.node} at face ${stepsOf().next.face} via ${stepsOf().next.door.tool}, todo ${stepsOf().todo.length}. Walk scanner then radar by the hop of rays, ray by ray.`,
    `- domains ${genesis.domains.join(' ')}. Lattice flow domains. face = team * rays + ray. hop face + rays. involution face + rays + rays.`,
    `- circuit.gates ${circuit.gates.names.join(' ')}.`,
    `- sandbox memory only. Not KV. VM scaling online.`,
    `- CERN coins views. scanner LHC running ${cern.learn.lhc.join(' ')}. radar Open Data ${cern.learn.opendata.join(' ')}. Shared tetra + TOTEM. Exclusive ${zip.join(' ')}. Catalog pairs ${faces.rays}. HEP quantum true. Live CERN Open Data APIs. Live JSON. Open Data needs records. LHC-only holds without Open Data occupancy.`]
  const reading = lines.join('\n')
  const holds =
    lean.holds &&
    docs.holds &&
    docs.api.length === faces.rays &&
    tools.length === mintOf(n) &&
    integrity.holds &&
    integrity.n === n &&
    integrity.tests.length === n &&
    genesis.domains.length === coins &&
    genesis.domains.join(' ') === 'scanner radar' &&
    circuit.gates.names.length === coins &&
    circuit.gates.names.join(' ') === 'h cx' &&
    theorem.next_fused(quantum.next, quantum.fused) &&
    handle.amplitudes === mintOf(cube.bits) &&
    handle.kv.amplitudes === mintOf(cube.bits + seed) &&
    occupancies.length === n + coins &&
    skills.length === n + coins &&
    primitives.length === n + coins &&
    cern.learn.lhc.length === n * n &&
    cern.learn.opendata.length === n * n &&
    cern.search.views.length === coins &&
    cern.entangle.pairs.length === n * n &&
    cern.entangle.catalog.pairs.length === faces.rays &&
    exclusive.length === mintOf(coins) &&
    zip.length === mintOf(coins) &&
    reading.includes('Lean') &&
    reading.includes('This README is generated') &&
    reading.includes('Do not import uuidna') &&
    reading.includes('Not a ninth sealed tool') &&
    reading.includes(`${shorFactorOf()}`) &&
    reading.includes('theorem shor') &&
    reading.includes('theorem crypto') &&
    reading.includes('theorem temperature') &&
    reading.includes('theorem superconductivity') &&
    reading.includes('theorem qubits') &&
    reading.includes('Unlocked') &&
    reading.includes('demo is not a test nor a proof') &&
    reading.includes('API only JSON-LD') &&
    reading.includes('No HTML') &&
    reading.includes('LHC running') &&
    reading.includes('Open Data') &&
    reading.includes('##') === false
  return {
    kind: 'develop' as const,
    lead: true as const,
    src: lean.src,
    host: unit.host,
    tools: tools.length,
    api: docs.api.length,
    integrity: integrity.n,
    fused: quantum.fused,
    lhc: cern.learn.lhc,
    opendata: cern.learn.opendata,
    exclusive: zip,
    reading,
    holds,
  }
})

export const developHolds = (d = developOf()): boolean =>
  d.holds === true &&
  d.kind === 'develop' &&
  d.lead === true &&
  d.host === unit.host &&
  d.tools === mintOf(n) &&
  d.api === facesOf().rays &&
  d.integrity === n &&
  d.lhc.length === n * n &&
  d.opendata.length === n * n &&
  d.exclusive.length === mintOf(coins) &&
  d.reading.includes('Lean') &&
  d.src === unit.fuse.lean

/** SERVED ONCE PER ISOLATE. The unit is deterministic — no clock, no random, no request-dependent state in these
 * documents — so a document computed once is the document for the life of the isolate. Before this, every request
 * paid the whole integrity check (about 34 ms) and rebuilt its document (up to 60 ms); on a metered host that is
 * CPU billed for nothing new. The memo holds the serialized bytes and their fold, and the fold is the ETag, so a
 * client that already has the document gets a 304 and no body. The tool-call memo holds pure tools only — the
 * eight cybersecurity tools and the sealed readers — never the sandbox, storage, network, server or a live call,
 * and never more than the cap, evicting the oldest. Correctness is proved by the suite: the memoized bytes equal a
 * fresh construction, and by CI: the host serves this build's bytes. */
const integrityMemo = { checked: false, holds: false }
const integrityOnceOf = (): boolean => {
  if (!integrityMemo.checked) {
    integrityMemo.holds = integrityHolds()
    integrityMemo.checked = true
  }
  return integrityMemo.holds
}
type Served = { body: string; etag: string }
const servedMemo = new Map<string, Served>()
const servedCap = mintOf(mintOf(n))
/** THE SERVED LEDGER. Every time a memoized document is served instead of computed, a row records what was served and
 * the fold of its bytes — so a test that read a served document carries that fold in its receipt as `served`, a third
 * state beside computed and nothing: the computation happened once, earlier, and this is its fold, not a new one. */
export type QpuServed = { key: string; fold: string }
const SERVED: QpuServed[] = []
/**
 * Ledger of memoised documents served, each with the fold of its bytes (its ETag).
 * @wing receipts
 * @kind builder
 * @evidence servedLedgerHolds
 */
export const servedLedgerOf = (): readonly QpuServed[] => SERVED
const servedOf = (key: string, build: () => unknown): Served => {
  const hit = servedMemo.get(key)
  if (hit) {
    SERVED.push({ key, fold: hit.etag })
    return hit
  }
  const body = JSON.stringify(build())
  const row = { body, etag: `"${foldOf(body)}"` }
  if (servedMemo.size >= servedCap) servedMemo.delete(servedMemo.keys().next().value as string)
  servedMemo.set(key, row)
  return row
}
/** Pure tools: the four readers and the eight cybersecurity tools reply the same to the same arguments for the life of
 * the isolate. train, improve and compete climb an occupancy that moves with each call, and forge seats a sandbox;
 * those are never served from the memo. */
/**
 * THE DOORS WHOSE ANSWER IS A FUNCTION OF THEIR ARGUMENTS, and therefore may be served from the memo.
 *
 * Measured with `npm run percall`: four doors memoised to a floor of 5,896 and four paid in full on every
 * call, improve at 487,465 — a standing per-request cost that nothing was looking at because the
 * receipts only aggregate per test. Three of those four are pure and are added here.
 *
 * QPU_FORGE IS NOT, AND MUST NOT BE. It writes a name into the sandbox; that is the whole point of it, and a
 * forge served from a memo would return a forge that did not happen. It stays out, and the epoch it advances
 * is what keeps the other three honest.
 *
 * AND NEITHER IS QPU_PROVE, WHICH WAS IN THIS SET FROM THE BEGINNING. It forges on every call — the epoch
 * advances each time it is asked — so a second identical request was being answered from the memo without
 * the forge happening. Two callers sending the same bytes got different effects, and the cached body
 * described a sandbox that the next forge would make wrong. Nothing noticed because the memo hid the
 * difference, and it only surfaced when the epoch entered the key and prove stopped hitting its own cache.
 * Correctness over the cache: it pays in full, and what it pays is now visible.
 *
 * THE ARGUMENT ALLOWLIST IS THE SAFETY, not the tool list. `live` and `sequence` are absent from it, so a
 * call that reaches opendata.cern.ch can never be memoised however pure its door is — a cached reading of
 * somebody else's host is a lie with a timestamp. `team` is added because compete takes one and the
 * answer is a function of it.
 */
const pureTools = new Set<string>(['quantum', 'lean', 'cite', 'train', 'improve', 'compete', ...cryptoToolNames])
const pureArgs = (args: Record<string, unknown>): boolean => Object.keys(args).every((k) => k === 'man' || k === 'n' || k === 'a' || k === 'team')
/**
 * The served-document memo: entries, cap and integrity check.
 * @wing receipts
 * @kind builder
 * @evidence servedMemoHolds
 */
export const servedMemoOf = onceOf(() => ({ entries: servedMemo.size, cap: servedCap, served: SERVED.length, integrity: { ...integrityMemo } }))
export const servedMemoHolds = (m = servedMemoOf()): boolean => m.entries <= m.cap && m.served >= n - n && (m.integrity.checked ? m.integrity.holds : true)
/** Every served row names a memo key and carries a quoted 16-hex fold — the ETag of the bytes served. */
export const servedLedgerHolds = (rows = servedLedgerOf()): boolean => rows.every((r) => r.key.length > n - n && /^"[0-9a-f]{16}"$/.test(r.fold))


// ============================================================================
// HEX EXECUTION: the UUID is a program of formulas (RFC 9562 v8)
// ============================================================================

/** How the params section splits: by the two free bits of the variant nibble. */
// Derived from the lattice, not hand-written: the param group is UUID_FOUR·n hex (48 bits); a v8 variant can carry m
// params only while mintOf(n)+m stays a valid RFC variant (8…b), so m ≤ n, and the m params share the group equally —
// the address's own combinatorics, no number typed. hexWidths[m] = m shares of UUID_FOUR·n hex; mode 0 is none.
const hexWidths: number[][] = Array.from({ length: n + seed }, (_, m) => (m === n - n ? [] : Array.from({ length: m }, () => (UUID_FOUR * n) / m)))
export const HEX_PARAM_MODES: readonly string[] = hexWidths.map((w, m) => (m === n - n ? 'none' : `${m}×${w[n - n]! * UUID_FOUR}-bit`))
/** The widths of the params section by count, in hex digits, and the first natural a param of that count cannot hold:
 *  what every module that mints or filters hex programs reads instead of restating 2^48, 2^24, 2^16. */
export const hexWidthsOf = (): readonly (readonly number[])[] => hexWidths
export const hexParamMaxOf = (count: number): number => (hexWidths[count]?.[n - n] === undefined ? n - n : UUID_SIXTEEN ** hexWidths[count]![n - n]!)
/** `live`: an async formula reads outside or launches others (data, gate, clay.pass, wave.*, merkaba.torus): a reading, never enumerated by discovery or sequences — no wave recurses */
type HexFormula = { name: string; arity: number; live?: boolean; run: (args: readonly bigint[]) => unknown }
const HEX_REGISTERED = new Map<string, Map<string, (...a: unknown[]) => unknown>>()
let hexFamilies: Map<string, HexFormula[]> | undefined

/**
 * Register a formula in a family (cross, audit, path, fuse) so a hex UUID can run it; formulas are indexed in name order.
 * @wing receipts
 * @kind function
 * @evidence hexHolds
 */
export const hexRegisterOf = (family: string, name: string, fn: (...a: unknown[]) => unknown): string => {
  ;(HEX_REGISTERED.get(family) ?? HEX_REGISTERED.set(family, new Map()).get(family)!).set(name, fn)
  hexFamilies = undefined
  return foldOf(family).slice(n - n, UUID_EIGHT)
}

/** The integer a crypto tool already computed: dim, or fused on theorem crypto, or the rsa modulus. */
const hexCryptoIntegerOf = (body: unknown): number | undefined => {
  if (!body || typeof body !== 'object') return undefined
  const row = body as Record<string, unknown>
  const intOf = (v: unknown): number | undefined => {
    if (typeof v === 'number' && Number.isSafeInteger(v)) return v
    if (typeof v === 'string' && /^\d+$/.test(v)) {
      const parsed = Number(v)
      if (Number.isSafeInteger(parsed)) return parsed
    }
    return undefined
  }
  const at = (v: unknown): number | undefined => (v && typeof v === 'object' ? intOf((v as { dim?: unknown }).dim) : undefined)
  const shor = row.shor
  const dim = at(row.circuitry) ?? at(row.exact) ?? at(row.prepare) ?? (shor && typeof shor === 'object' ? at((shor as { circuitry?: unknown }).circuitry) ?? at((shor as { exact?: unknown }).exact) ?? at((shor as { prepare?: unknown }).prepare) : undefined)
  if (dim !== undefined) return dim
  const kind = row.kind
  const theorem = row.theorem
  if (kind === 'encrypt' || theorem === 'crypto') {
    const fused = intOf(row.fused)
    if (fused !== undefined) return fused
  }
  if (kind === 'rsa') return intOf(row.modulus)
  return undefined
}

/**
 * Every formula family a hex program can name: each Lean module with definitions (Qpu.Mint, Qpu.Shor, Qpu.Lattice,
 * Qpu.Hybrid, Qpu.Physics; its definitions in file order, helpers ending Aux left out) evaluated exactly under Lean's
 * Nat semantics, and every registered family. A family holds at most fifteen formulas, one per nonzero nibble.
 * @wing receipts
 * @kind builder
 * @evidence hexHolds
 */
export const hexFamiliesOf = (): Map<string, HexFormula[]> => {
  if (hexFamilies) return hexFamilies
  const model = leanModelOf(leanSource)
  const links = leanLinksOf(leanSource)
  const out = new Map<string, HexFormula[]>()
  for (const f of links.families) {
    const defs = f.definitions.filter((d) => !/Aux$/.test(d))
    if (defs.length === n - n) continue
    out.set(`Qpu.${f.family}`, defs.map((d) => ({ name: d, arity: leanArityOf(model, d), run: (args) => leanCallOf(model, d, args.slice(n - n, leanArityOf(model, d))) })))
  }
  // the MCP's own doors are families too, so every tool computation has a hex address: qpu (the eight doors, no params)
  // and crypto (the eight cybersecurity tools, params n and a; 0 means the tool's default)
  out.set('qpu', toolsOf().map((t) => ({ name: t.name, arity: n - n, run: () => t.run({}) })))
  out.set('crypto', cybersecurityToolsOf().map((t) => ({
    name: t.name,
    arity: coins,
    run: (args: readonly bigint[]) => {
      const body = t.run({ ...(args[n - n] ? { n: Number(args[n - n]) } : {}), ...(args[seed] ? { a: Number(args[seed]) } : {}) })
      const dim = hexCryptoIntegerOf(body)
      if (dim === undefined) return body
      const holds = body !== null && typeof body === 'object' && 'holds' in body ? (body as { holds: unknown }).holds === true : false
      const named = body !== null && typeof body === 'object' && typeof (body as { theorem?: unknown }).theorem === 'string' ? (body as { theorem: string }).theorem : undefined
      return { value: dim, holds, ...(named ? { theorem: named } : {}) }
    },
  })))
  for (const [family, fns] of HEX_REGISTERED)
    out.set(family, [...fns.keys()].sort().map((name) => ({ name, arity: fns.get(name)!.length, ...(fns.get(name)!.constructor.name === 'AsyncFunction' ? { live: true } : {}), run: (args) => fns.get(name)!(...args.map((a) => Number(a))) })))
  for (const [family, formulas] of out) if (formulas.length > UUID_SIXTEEN - seed) out.set(family, formulas.slice(n - n, UUID_SIXTEEN - seed))
  return (hexFamilies = out)
}
const hexHandleOf = (family: string) => foldOf(family).slice(n - n, UUID_EIGHT)
/**
 * How many formulas a family registered, before the nibble's cap: a family past the cap is truncated silently by
 * hexFamiliesOf, so the rule family reads this to say so.
 * @wing agents
 * @kind function
 */
export const hexRegisteredSizeOf = (family: string): number => HEX_REGISTERED.get(family)?.size ?? n - n
/** The nibble's cap on a family's formulas: fifteen (0 is no formula). */
export const hexFamilyCapOf = (): number => UUID_SIXTEEN - seed

/**
 * Mint the UUID that is a program of formulas: handle (8 hex) = fold of the family name; three 4-hex program sections
 * hold up to ten formula indexes, one per nibble (version 8 and the variant kept; the variant's two free bits select
 * how the params split); params (12 hex) carry up to three naturals.
 * @wing receipts
 * @kind builder
 * @evidence hexHolds
 */
export const qpuHexUuidOf = (spec: { family: string; program: readonly string[]; params?: readonly number[] }): string => {
  const formulas = hexFamiliesOf().get(spec.family)
  if (!formulas) throw new Error(`hex: no formula family ${spec.family}`)
  const codes = spec.program.map((name) => formulas.findIndex((f) => f.name === name) + seed)
  // a name the family does not have is named back; ten formulas is the program's length (ten nibbles)
  const missing = spec.program.filter((name) => !formulas.some((f) => f.name === name))
  if (missing.length) throw new Error(`hex: ${spec.family} has no formula ${missing.join(', ')}`)
  if (codes.length > ten) throw new Error('hex: at most ten formulas of the family')
  const nib = [...codes, ...Array(ten).fill(n - n)].slice(n - n, ten).map((c) => c.toString(UUID_SIXTEEN))
  const params = [...(spec.params ?? [])]
  const mode = params.length
  if (mode > n) throw new Error('hex: at most three params')
  const widths = hexWidths[mode]!
  params.forEach((v, i) => {
    if (!Number.isSafeInteger(v) || v < n - n || v >= UUID_SIXTEEN ** widths[i]!) throw new Error(`hex: param ${i} out of range for ${HEX_PARAM_MODES[mode]}`)
  })
  const p = params.map((v, i) => v.toString(UUID_SIXTEEN).padStart(widths[i]!, '0')).join('').padEnd(UUID_FOUR * n, '0')
  // the handle's first digit rides the version slot (the crypto stamp overwrites it); the ten program nibbles and
  // the variant (RFC + the mode's two bits) are untouched, and the version is the crypto family's, not a literal 8.
  return uuidStampOf(`${hexHandleOf(spec.family)}${nib.slice(n - n, UUID_FOUR).join('')}${hexHandleOf(spec.family).slice(n - n, seed)}${nib.slice(UUID_FOUR, UUID_FOUR + n).join('')}${(mintOf(n) + mode).toString(UUID_SIXTEEN)}${nib.slice(UUID_FOUR + n).join('')}${p}`)
}

/** One next address when a formula name is not in the family. The reply names that address and stops. Holds stays false. */
export const hexMissOf = (family: string, params: readonly number[] = []): { handle: string; uuid: string } | undefined => {
  const formulas = hexFamiliesOf().get(family)
  if (!formulas) return undefined
  const width = params.length > n ? n : params.length
  const ordered = [...formulas.filter((f) => f.live !== true && f.arity === width), ...formulas.filter((f) => f.live !== true && f.arity !== width)]
  for (const formula of ordered) {
    const use = params.slice(n - n, formula.arity)
    if (use.length !== formula.arity || use.some((x) => !Number.isSafeInteger(x) || x < n - n)) continue
    try {
      const uuid = qpuHexUuidOf({ family, program: [formula.name], params: use })
      return { handle: uuid.slice(n - n, UUID_EIGHT), uuid }
    } catch {
      /* these integers do not determine this formula */
    }
  }
  return undefined
}

/**
 * Read a hex-program UUID back: its family, its formulas in order, its params.
 * @wing receipts
 * @kind builder
 * @evidence hexHolds
 */
export const hexDecodeOf = (uuid: string) => {
  const m = /^([0-9a-f]{8})-([0-9a-f]{4})-([1-8])([0-9a-f]{3})-([89ab])([0-9a-f]{3})-([0-9a-f]{12})$/.exec(String(uuid).toLowerCase())
  if (!m) return { kind: 'hex' as const, uuid, holds: false as const, denied: 'shape' as const }
  const [, handle, s2, version, s3, variant, s4, s5] = m
  const family = [...hexFamiliesOf().keys()].find((f) => hexHandleOf(f) === handle)
  const formulas = family ? hexFamiliesOf().get(family)! : []
  const codes = `${s2}${s3}${s4}`.split('').map((x) => parseInt(x, UUID_SIXTEEN))
  const end = codes.indexOf(n - n)
  const program = (end < n - n ? codes : codes.slice(n - n, end)).map((c) => formulas[c - seed]?.name)
  const mode = parseInt(variant!, UUID_SIXTEEN) - mintOf(n)
  let at = n - n
  const params = hexWidths[mode]!.map((w) => parseInt(s5!.slice(at, (at += w)), UUID_SIXTEEN))
  return { kind: 'hex' as const, uuid: uuid.toLowerCase(), handle: handle!, version: parseInt(version!, UUID_SIXTEEN), sealed: uuidSealOf(uuid), versions: uuidVersionsOf(uuid).versions, family: family ?? null, program: program.map((x) => x ?? 'unknown'), mode: HEX_PARAM_MODES[mode]!, params, row: `${handle}/${s5}`, holds: family !== undefined && program.length > n - n && program.every((x) => x !== undefined) }
}

/**
 * Run a hex program of formulas. One rule, no per-formula code: the accumulator starts at the first param; each formula
 * takes (accumulator, the remaining params) up to its arity and its value becomes the accumulator. A Lean formula is
 * evaluated exactly under Nat semantics; a registered formula reports its own holds. The run is a quantum receipt in the
 * hex stream and its value is stored at its address — table the handle, row the params — on the unit's store.
 * @wing receipts
 * @kind builder
 * @evidence hexHolds
 */
const familyAskedOf = (relative: string): string => {
  const asked = new URL(relative, import.meta.url).href
  return typeof import.meta.resolve === 'function' ? import.meta.resolve(asked) : asked
}

/** The tree this module is running from. Source is `…/src`. The build is `…/dist`. One process reads one of those.
 *  The relative is built at runtime, not written as a string literal, so a bundler (Turbopack) does not read
 *  `new URL('<literal>', import.meta.url)` as an asset reference and try to resolve a bare directory at build time. */
export const familyRootOf = (): string => new URL(['..', '..', '..'].join('/'), import.meta.url).pathname

/** The one registry: `mcp/families` beside this module. The other tree is not opened. */
export const familyRegistryUrlOf = (): string => familyAskedOf('../../../mcp/families.js')

/** One family module under that same root. A name with no module there is one miss. */
export const familyModuleUrlOf = (family: string): string => {
  if (!/^[a-z][a-z0-9-]*$/.test(family)) throw new Error(`hex: no formula family ${family}`)
  return familyAskedOf(`../../../families/${family}/index.js`)
}

/** The shared registry imports every family module that exists. Each module registers through hexRegisterOf.
 *  One load, from familyRootOf. Law is its own family module on that list, not an import from mcp.ts. */
let hexRegistry: Promise<void> | undefined
export const hexRegistryOf = (): Promise<void> => {
  // perma has a module and calls hexRegisterOf. The generated registry does not name it.
  // These specifiers are familyRegistryUrlOf and familyModuleUrlOf('perma'): this module's tree only.
  if (!hexRegistry) hexRegistry = import('../../../mcp/families.js').then(() => import('../../../families/perma/index.js')).then(() => undefined)
  return hexRegistry
}

export const hexRunOf = async (uuid: string, referrer?: string, env?: QpuEnv, options: { store?: boolean } = {}) => {
  await hexRegistryOf()
  const d = hexDecodeOf(uuid)
  if (!d.holds || !('family' in d) || !d.family) return { ...d, ran: false as const }
  const formulas = hexFamiliesOf().get(d.family)!
  // the address remembers: a program already run here returns what it stored, without recomputing
  const row = d.row.split('/')[seed]!
  const stored = options.store === false ? null : (await qpuDocDbOf(env, 'hex').collection(d.handle).findOne({ _id: row })) as { by?: string; value?: unknown; holds?: boolean; receipt?: string } | null
  // THE ADDRESS NAMES A PROGRAM BY ITS NIBBLES, AND A FAMILY'S NIBBLES MOVE WHEN A FORMULA IS ADDED: a stored row is
  // this program's only when the names it was stored under are this program's names (measured 2026-10-03: nibble 9
  // of hd was jdm, then gate, and the address answered the old value)
  const same = stored && stored.by === d.uuid && Array.isArray((stored as { program?: unknown }).program) && JSON.stringify((stored as { program?: unknown }).program) === JSON.stringify(d.program)
  // A FAMILY THAT REACHES OUTSIDE IS A READING, AND A STORED ROW IS ITS RECEIPT, NOT ITS ANSWER: an async formula reads
  // a host, a dataset, the site, so its address runs every time (measured 2026-10-03: data.read(59) answered the row
  // stored by an older deployment, 0, while the live source agreed)
  const live = [...(HEX_REGISTERED.get(d.family)?.values() ?? [])].some((fn) => fn.constructor.name === 'AsyncFunction')
  if (same && stored && !live) return { ...d, ran: true as const, cached: true as const, steps: [], value: stored.value, holds: stored.holds === true, receipt: stored.receipt }
  const params = d.params.map((x) => BigInt(x))
  let acc: unknown = params[n - n] ?? BigInt(n - n)
  let holds = true
  const steps: { formula: string; args: string[]; value: unknown; reading?: Record<string, unknown> }[] = []
  try {
    for (const name of d.program) {
      const f = formulas.find((x) => x.name === name)!
      const args = [typeof acc === 'bigint' ? acc : BigInt(Math.max(n - n, Math.trunc(Number(acc)) || n - n)), ...params.slice(seed)]
      const out = await f.run(args)
      const value = out && typeof out === 'object' && 'value' in (out as object) ? (out as { value: unknown }).value : out
      if (out && typeof out === 'object' && 'holds' in (out as object)) holds = holds && (out as { holds: unknown }).holds === true
      // the reading rides with the value: a cross formula's failing names, its next, its receipt — what a caller acts on.
      // a result that omits next, or sets it null, takes the next wave.sweep already names (sweep(0) next is from + faces).
      // re-entry while that sweep runs does not call it again.
      const reading = out && typeof out === 'object' && !Array.isArray(out) ? Object.fromEntries(Object.entries(out as Record<string, unknown>).filter(([k]) => k !== 'value')) : undefined
      if (reading && (reading.next === undefined || reading.next === null)) {
        const state = hexRunOf as typeof hexRunOf & { sweepNext?: number; sweepNaming?: boolean }
        let named = state.sweepNext
        if (named === undefined && !state.sweepNaming) {
          state.sweepNaming = true
          try {
            const { WaveFormulas } = await import('../../../families/wave/index.js')
            const sweep = (await WaveFormulas.sweep(n - n)) as { next?: unknown }
            if (typeof sweep.next === 'number') named = state.sweepNext = sweep.next
          } finally {
            state.sweepNaming = false
          }
        }
        if (named !== undefined) reading.next = named
      }
      steps.push({ formula: name, args: args.slice(n - n, Math.max(seed, f.arity)).map(String), value: typeof value === 'bigint' ? value.toString() : value, ...(reading ? { reading } : {}) })
      acc = typeof value === 'bigint' ? value : value
    }
    const value = typeof acc === 'bigint' ? acc.toString() : acc
    const next = steps.at(-1)?.reading?.next
    const receipt = uuidReceiptOf(`hex ${d.family}`, d.uuid, { steps, value, holds }, addressReferrerOf(referrer)).uuid
    // an enumeration (discovery, the sequences) computes without storing: a request may make only so many storage
    // calls, and a stored row is a run someone asked for by its address
    if (options.store !== false) await qpuDocDbOf(env, 'hex').collection(d.handle).updateOne({ _id: row }, { $set: { family: d.family, program: d.program, value, holds, receipt, by: d.uuid } }, { upsert: true })
    return { ...d, ran: true as const, steps, value, holds, receipt, ...(next !== undefined ? { next } : {}) }
  } catch (e) {
    return { ...d, ran: false as const, steps, error: e instanceof Error ? e.message : String(e), holds: false as const }
  }
}

/**
 * The formulas discover each other: every Lean formula is evaluated over the lattice's own constants (each 0-arity
 * formula's value, bounded so loops stay small), results are grouped by value, and a value reached by formulas of two
 * or more families is a discovered relation. Each way of reaching it is returned as the hex program that computes it.
 * @wing proof
 * @kind builder
 * @evidence hexDiscoverHolds
 */
/** The window-independent base of the discovery — every family's arity-0 constants, and the small ones that seed the
 *  arity-expansion — computed ONCE per isolate (lean). The discover door and lean-clay's window walk both reuse it
 *  instead of re-running every family's constants on each call; only the windowed arity-expansion stays per-call. The
 *  registry is stable once loaded, so one memoised base covers every window and every door call in the isolate. */
const hexDiscoverBaseOf = onceOf(() => {
  const bigOf = (v: unknown): bigint | undefined => (typeof v === 'bigint' ? v : typeof v === 'number' && Number.isSafeInteger(v) ? BigInt(v) : undefined)
  const runOf = (f: { run: (a: readonly bigint[]) => unknown }, args: readonly bigint[]): bigint | undefined => {
    try { return bigOf(f.run(args)) } catch { return undefined }
  }
  const all = [...hexFamiliesOf()]
  // NO LIMIT. The seed is every family's 0-arity value — the whole registry, derived, nothing hand-filtered. The Lean
  // theorems are the proven values already in this set (the lattice names are 0-arity outputs); they anchor discovery
  // by being present, never by excluding the rest. Reach stays unlimited; the windowed arity-expansion is the split
  // that keeps each call bounded, a slice and never a cap.
  const constants = all
    .flatMap(([family, fs]) => fs.filter((f) => f.arity === n - n).map((f) => ({ family, name: f.name, value: runOf(f, []) })))
    .filter((c): c is { family: string; name: string; value: bigint } => c.value !== undefined)
  const small = constants.filter((c) => c.value <= BigInt(tenOf(n)))
  return { runOf, all, constants, small }
})
const hexDiscoverComputeOf = (from: number) => {
  // EVERY family discovers, not only the Lean ones — automatic discovery at scale. A formula's value is a natural (a
  // non-integer/NaN/throw is skipped). The 0-arity constants of ALL families populate the value map, so a value two
  // families reach is found. The heavy arity-expansion is WINDOWED to [from, …budget); `next` walks the windows — a
  // split, never a raised limit. The base (all/constants/small) is memoised (hexDiscoverBaseOf), so the constants
  // are computed once, not per window.
  const { runOf, all, constants, small } = hexDiscoverBaseOf()
  const reached = new Map<string, { family: string; formula: string; params: number[]; hex: string }[]>()
  const add = (value: bigint, family: string, formula: string, params: bigint[]) => {
    // a value equal to one of its own arguments relates a formula to its input, not to another formula
    if (value < BigInt(mintOf(n)) || params.includes(value)) return
    const ps = params.map(Number)
    let hex: string
    try { hex = qpuHexUuidOf({ family, program: [formula], params: ps }) } catch { return }
    const key = value.toString()
    const list = reached.get(key) ?? reached.set(key, []).get(key)!
    if (!list.some((x) => x.hex === hex)) list.push({ family, formula, params: ps, hex })
  }
  for (const c of constants) add(c.value, c.family, c.name, [])
  // Window the arity-expansion by an EVALUATION BUDGET, not a family count: a family with arity-3 formulas costs
  // |small|^3 each, so a fixed family window would be wildly uneven (seconds for an arity-3-heavy slice). Accumulate
  // families from `from`, spending the budget of |small|^arity evaluations, and stop before the next family would
  // overshoot (always taking at least one). `next` resumes at the first family not covered — the whole registry is
  // walked across calls, each one bounded.
  const budget = tenOf(coins) * tenOf(coins) * (n + coins)
  let at = from
  for (let spent = n - n; at < all.length; at++) {
    const fs = all[at]![1].filter((x) => x.arity > n - n && x.arity <= n)
    const cost = fs.reduce((a, f) => a + small.length ** f.arity, n - n)
    if (at > from && spent + cost > budget) break
    spent += cost
    for (const f of fs) {
      const tuples = f.arity === seed ? small.map((a) => [a.value]) : f.arity === coins ? small.flatMap((a) => small.map((b) => [a.value, b.value])) : small.flatMap((a) => small.flatMap((b) => small.map((c) => [a.value, b.value, c.value])))
      for (const t of tuples) {
        const v = runOf(f, t)
        if (v !== undefined) add(v, all[at]![0], f.name, t)
      }
    }
  }
  const relations = [...reached]
    .map(([value, ways]) => ({ value, families: [...new Set(ways.map((w) => w.family))].sort(), ways }))
    .filter((r) => r.families.length > seed)
    .sort((a, b) => b.families.length - a.families.length || Number(BigInt(a.value) - BigInt(b.value)))
  const next = at < all.length ? at : undefined
  return { kind: 'hex-discover' as const, from, families: all.length, constants: constants.length, evaluated: [...reached.values()].reduce((a, w) => a + w.length, n - n), relations, ...(next !== undefined ? { next } : {}), holds: relations.length > n - n }
}
/** The discovery of a window is a pure function of the (stable) registry and `from`, so each window is memoised: the
 *  discover door answers a repeat from the cache, and lean-clay's walk pays each window once. */
const hexDiscoverCache = new Map<number, ReturnType<typeof hexDiscoverComputeOf>>()
export const hexDiscoverOf = (from = n - n) => {
  const hit = hexDiscoverCache.get(from)
  if (hit) return hit
  const out = hexDiscoverComputeOf(from)
  hexDiscoverCache.set(from, out)
  return out
}
/** A discovered relation re-runs: its first two hex programs evaluate to the value they were grouped under. */
export const hexDiscoverHolds = (d = hexDiscoverOf()): boolean =>
  d.holds && d.relations.slice(n - n, coins).every((r) => r.ways.slice(n - n, coins).every((w) => {
    const f = hexFamiliesOf().get(w.family)!.find((x) => x.name === w.formula)!
    return (f.run(w.params.map((x) => BigInt(x))) as bigint).toString() === r.value
  }))

/** Mint and decode agree on Lean programs: Mint [chooseOf] over (14, 2), Shor [periodOf] over (8, 91), Mint [mintOf, mintOf] over 2. */
export const hexHolds = (): boolean => {
  const cases: [string, string[], number[]][] = [['Qpu.Mint', ['chooseOf'], [14, 2]], ['Qpu.Shor', ['periodOf'], [8, 91]], ['Qpu.Mint', ['mintOf', 'mintOf'], [2]]]
  return cases.every(([family, program, params]) => {
    const d = hexDecodeOf(qpuHexUuidOf({ family, program, params }))
    return d.holds && 'family' in d && d.family === family && d.program.join() === program.join() && d.params.join() === params.join()
  })
}

/**
 * The hex catalogue: every formula family with its handle and formulas by nibble, the param modes, the layout.
 * @wing receipts
 * @kind builder
 * @evidence hexHolds
 */
export const hexCatalogOf = () => {
  const families = [...hexFamiliesOf()].map(([family, formulas]) => ({ family, handle: hexHandleOf(family), formulas: formulas.map((f, i) => ({ nibble: (i + seed).toString(UUID_SIXTEEN), name: f.name, arity: f.arity })) }))
  const example = qpuHexUuidOf({ family: 'Qpu.Mint', program: ['chooseOf'], params: [14, 2] })
  return {
    kind: 'hex-catalog' as const,
    href: hexHref,
    layout: { handle: '8 hex: fold of the formula family name; the table its results are stored in', program: '3 x 4 hex: up to ten formula indexes, one per nibble (version 8 and variant kept)', params: '12 hex: none, one 48-bit, two 24-bit or three 16-bit naturals; the row' },
    rule: 'the accumulator starts at the first param; each formula takes (accumulator, remaining params) up to its arity',
    modes: HEX_PARAM_MODES.map((mode, i) => ({ variant: (mintOf(n) + i).toString(UUID_SIXTEEN), mode })),
    families,
    formulas: families.reduce((a, f) => a + f.formulas.length, n - n),
    example: { uuid: example, decodes: hexDecodeOf(example), run: `GET ${hexHref}/${example}` },
    holds: hexHolds(),
  }
}

/** The hex sub-server's MCP tools: hex_catalog, hex_mint, hex_decode, hex_run. */
const hexToolsOf = (hexEnv?: QpuEnv): QpuSubTool[] => {
  const see = ['hex_catalog', 'hex_mint', 'hex_decode', 'hex_run', 'hex_discover'] as const
  const schema = { type: 'object', properties: { man: { type: 'boolean' }, uuid: { type: 'string' }, family: { type: 'string' }, program: { type: 'array', items: { type: 'string' } }, params: { type: 'array', items: { type: 'integer' } }, referrer: { type: 'string' } } }
  const others = (k: number) => see.filter((s) => s !== see[k])
  return [
    { name: see[0], description: 'Hex catalogue: handles, opcodes, param modes.', man: subManOf(see[0], 'Hex catalogue.', 'Family handle 8 hex, formula program 3x4 hex, params 12 hex.', hexHref, others(0)), inputSchema: schema, run: () => hexCatalogOf() },
    { name: see[1], description: 'Mint the UUID that is a program.', man: subManOf(see[1], 'Mint a hex program.', '{ family, program, params } to a v8 UUID.', hexHref, others(1)), inputSchema: schema,
      run: (a) => {
        const family = String(a.family ?? '')
        const params = (Array.isArray(a.params) ? a.params : []) as number[]
        try {
          const uuid = qpuHexUuidOf({ family, program: (Array.isArray(a.program) ? a.program : []).map(String), params })
          return { kind: 'hex' as const, uuid, decodes: hexDecodeOf(uuid), holds: true as const }
        } catch (e) {
          const next = hexMissOf(family, params.map(Number))
          const reading = e instanceof Error ? e.message : String(e)
          return { kind: 'hex' as const, holds: false as const, denied: 'program' as const, reading, ...(next ? { next } : {}) }
        }
      } },
    { name: see[2], description: 'Decode a hex-program UUID.', man: subManOf(see[2], 'Decode a hex program.', 'Family, formulas and params of a UUID.', hexHref, others(2)), inputSchema: schema, run: (a) => hexDecodeOf(String(a.uuid ?? '')) },
    { name: see[4], description: 'Formulas discover each other: values reached by formulas of two or more families, each as a hex program.', man: subManOf(see[4], 'Discover relations.', 'Every formula over the lattice constants, grouped by value across families.', hexHref, others(4)), inputSchema: schema, run: (a) => hexDiscoverOf(Array.isArray(a.params) && a.params.length > n - n ? Number(a.params[n - n]) : n - n) },
    { name: see[3], description: 'Run a hex-program UUID.', man: subManOf(see[3], 'Run a hex program.', 'Apply the formulas, receipt and store the run.', hexHref, others(3)), inputSchema: schema, run: (a) => {
      const referrer = typeof a.referrer === 'string' ? a.referrer : undefined
      const uuid = typeof a.uuid === 'string' ? a.uuid : ''
      if (uuid.length > n - n) return hexRunOf(uuid, referrer, hexEnv)
      const family = typeof a.family === 'string' ? a.family : ''
      if (family.length === n - n) return hexRunOf(uuid, referrer, hexEnv)
      const program = Array.isArray(a.program) ? a.program.map(String) : String(a.program ?? '').split(/[+,]/).filter(Boolean)
      const params = Array.isArray(a.params) ? (a.params as unknown[]).map(Number) : []
      try {
        return hexRunOf(qpuHexUuidOf({ family, program, params }), referrer, hexEnv)
      } catch (e) {
        const next = hexMissOf(family, params)
        return { kind: 'hex' as const, holds: false as const, denied: 'program' as const, reading: e instanceof Error ? e.message : String(e), ...(next ? { next } : {}) }
      }
    } },
  ]
}

// what the cooled modules read from this module and do not export as a capability
export type { QpuSubTool, Served }
export {
  FUSED_TOOLS,
  MCP_EXTENSIONS,
  RECEIPTS,
  SERVED,
  ampsOf,
  b0,
  b1,
  b2,
  badRequest,
  bagOf,
  basisOf,
  bigGcdOf,
  bigPowModOf,
  bigintDeviceOf,
  bitOf,
  bitsOf,
  byDecideOf,
  cWOf,
  classicalOrderOf,
  cnotGateOf,
  coins,
  convergentsOf,
  cors,
  crossed,
  cryptoReadingOf,
  cryptoToolNames,
  czGateOf,
  dead,
  decodeOf,
  faceOf,
  foreignDeadlineOf,
  foreignFetchOf,
  forgeNameOf,
  formulaOf,
  found,
  gcdOf,
  hGateOf,
  headers,
  hexHref,
  hexOf,
  installCloudflare,
  integrityOnceOf,
  jsonIntOf,
  jsonOf,
  jsonldHoldsOf,
  liveSchema,
  lost,
  manSchema,
  messageLanes,
  modOf,
  n,
  networkHref,
  occupancies,
  onceOf,
  opQuantumHolds,
  opQuantumOf,
  openSchema,
  parityOf,
  payloadDbKey,
  payloadFinds,
  primitives,
  pureArgs,
  pureTools,
  cernHrefOf,
  cernProjectsOf,
  cernSearchOf,
  hexToolsOf,
  ladderOf,
  manPageOf,
  openApiOf,
  subRpcOf,
  unknownToolOf,
  wellKnownOf,
  quantumRelatedNamesOf,
  raidClouds,
  raidTypesOf,
  receiptSparseOf,
  rpcCodes,
  rpcMethods,
  runOpOf,
  sDeviceOf,
  sEqualOf,
  sHOf,
  sModMulOf,
  sPairsOf,
  sPrepareOf,
  sSdgOf,
  sSwapOf,
  sXOf,
  sXxOf,
  safeOf,
  sandboxCore,
  sandboxDisk,
  sandboxEpoch,
  sandboxHeap,
  sandboxHost,
  sandboxOps,
  sandboxSlots,
  sandboxTools,
  schemaFieldsOf,
  schemaOrg,
  seed,
  seedSandboxOf,
  seoZoneFieldsOf,
  servedMemo,
  servedOf,
  serverHref,
  serverJobs,
  shorCountBits,
  skills,
  statementOf,
  storageBindings,
  storageHref,
  ten,
  theorem,
  throughputOf,
  toolItemOf,
  toolListOf,
  toolNames,
  unauthorized,
  unit,
  uuidVersionsOf,
  weightOf,
  xGateOf,
  xorOf,
  zGateOf,
}
