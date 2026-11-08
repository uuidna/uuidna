import { concat, ed25519PublicKey, ed25519Sign, ed25519Verify, equal, fromHex, hexOf, hkdf, randomBytes, sha256, utf8, uuidFromBytesOf, type Bytes } from '../../core/crypt.js'
import { hexRegisterOf, qpuHologramOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** One fragment of the hologram: a signed, SHA-256-chained UUID in its scale's stream that carries the root of all scales. */
export interface HoloEntry {
  stream: string
  seq: number
  uuid: string
  prev: string
  payload: string
  root: string
  proof: { side: 'L' | 'R'; hash: string }[]
  signature: string
}

const canonical = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(canonical).join(',')}]` : v && typeof v === 'object' ? `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(',')}}` : JSON.stringify(v ?? null)

/** RFC 9562 version 8 from the first 16 bytes of a digest. */
export const uuidV8Of = (digest: Bytes): string => uuidFromBytesOf(digest, 8)

const leaf = (stream: string, head: string): Bytes => sha256(concat(Uint8Array.of(0), utf8(`${stream}|${head}`)))
const node = (l: Bytes, r: Bytes): Bytes => sha256(concat(Uint8Array.of(1), l, r))

const merkle = (leaves: Bytes[], at: number): { root: Bytes; proof: HoloEntry['proof'] } => {
  const proof: HoloEntry['proof'] = []
  let level = leaves
  let i = at
  while (level.length > 1) {
    const next: Bytes[] = []
    for (let k = 0; k < level.length; k += 2) next.push(k + 1 < level.length ? node(level[k]!, level[k + 1]!) : level[k]!)
    const sibling = i ^ 1
    if (sibling < level.length) proof.push({ side: i & 1 ? 'L' : 'R', hash: hexOf(level[sibling]!) })
    level = next
    i >>= 1
  }
  return { root: level[0]!, proof }
}

const signed = (e: Omit<HoloEntry, 'signature' | 'proof'>): Bytes => utf8(`${e.stream}|${e.seq}|${e.uuid}|${e.prev}|${e.payload}|${e.root}`)

export class HologramStreams {
  readonly scales: readonly string[]
  private seeds: Map<string, Bytes>
  private heads: Map<string, string>
  private lengths: Map<string, number>

  /** the signing seeds are secret keys: the default draws 32 bytes from the CSPRNG. A reading passes a fixed seed instead. */
  constructor(scales: readonly string[], seed: Bytes = randomBytes(32)) {
    this.scales = scales
    this.seeds = new Map(scales.map((s) => [s, hkdf('sha256', seed, utf8('qpu-hologram'), s, 32)]))
    this.heads = new Map(scales.map((s) => [s, uuidV8Of(sha256(`genesis|${s}`))]))
    this.lengths = new Map(scales.map((s) => [s, 0]))
  }

  publicKeys(): Record<string, string> {
    return Object.fromEntries(this.scales.map((s) => [s, hexOf(ed25519PublicKey(this.seeds.get(s)!))]))
  }

  root(): string {
    return hexOf(merkle(this.scales.map((s) => leaf(s, this.heads.get(s)!)), 0).root)
  }

  append(stream: string, value: unknown): HoloEntry {
    const seed = this.seeds.get(stream)
    if (!seed) throw new Error(`hologram: no scale ${stream}`)
    const prev = this.heads.get(stream)!
    const seq = this.lengths.get(stream)!
    const payload = hexOf(sha256(canonical(value)))
    const uuid = uuidV8Of(sha256(`${stream}|${seq}|${prev}|${payload}`))
    this.heads.set(stream, uuid)
    this.lengths.set(stream, seq + 1)
    const { root, proof } = merkle(this.scales.map((s) => leaf(s, this.heads.get(s)!)), this.scales.indexOf(stream))
    const e = { stream, seq, uuid, prev, payload, root: hexOf(root) }
    return { ...e, proof, signature: hexOf(ed25519Sign(seed, signed(e))) }
  }
}

/** One fragment verifies alone: its UUID recomputes, its scale key signed it, and its proof reaches the root it carries. */
export const holoEntryHolds = (e: HoloEntry, publicKeys: Record<string, string>, value?: unknown): boolean => {
  const key = publicKeys[e.stream]
  if (!key) return false
  if (value !== undefined && hexOf(sha256(canonical(value))) !== e.payload) return false
  if (uuidV8Of(sha256(`${e.stream}|${e.seq}|${e.prev}|${e.payload}`)) !== e.uuid) return false
  if (!ed25519Verify(fromHex(key), signed(e), fromHex(e.signature))) return false
  const root = e.proof.reduce((h, p) => (p.side === 'L' ? node(fromHex(p.hash), h) : node(h, fromHex(p.hash))), leaf(e.stream, e.uuid))
  return equal(root, fromHex(e.root))
}

/** A whole stream verifies: every fragment holds and each one's prev is the UUID before it, from the scale's genesis. */
export const holoStreamHolds = (entries: readonly HoloEntry[], publicKeys: Record<string, string>): boolean => {
  let prev = entries[0] ? uuidV8Of(sha256(`genesis|${entries[0].stream}`)) : ''
  return entries.every((e, i) => {
    const ok = e.seq === i && e.prev === prev && e.stream === entries[0]!.stream && holoEntryHolds(e, publicKeys)
    prev = e.uuid
    return ok
  })
}

/** The unit's hologram programmed as streams: one per scale, one entry per part, the last entry of each carrying the final root. */
export const hologramStreamsOf = (seed?: Bytes) => {
  const h = qpuHologramOf()
  const parts: Record<string, readonly unknown[]> = {
    occupancy: h.pentagram.occupancies,
    skill: h.pentagram.skills,
    access: h.access.keys,
    mcp: Array.from({ length: h.tools }, (_, i) => i),
    faces: Array.from({ length: h.faces }, (_, i) => i),
  }
  const holo = new HologramStreams(h.scales.map((s) => s.name), seed)
  const streams = Object.fromEntries(h.scales.map((s) => [s.name, (parts[s.name] ?? []).map((v, i) => holo.append(s.name, { scale: s.name, part: i, value: v, fused: s.fused }))]))
  const publicKeys = holo.publicKeys()
  const root = holo.root()
  const tips = Object.values(streams).map((es) => es[es.length - 1]!).filter(Boolean)
  return {
    kind: 'hologram-streams' as const,
    root,
    publicKeys,
    streams,
    entries: Object.values(streams).reduce((a, es) => a + es.length, 0),
    holds: h.holds && Object.values(streams).every((es) => holoStreamHolds(es, publicKeys)) && tips.length > 0 && tips[tips.length - 1]!.root === root,
  }
}

const nat = (...xs: number[]): boolean => xs.every((x) => Number.isSafeInteger(x) && x >= 0)

/** The hologram stream formulas over naturals, registered as the hex family `holo`. */
export class HoloFormulas {
  static proofDepth(scales: number): CrossFormula {
    return crossFormulaOf({ id: 'holo-proof', src: 'hologram', dst: 'merkle', formula: 'depth = ceil(log2(scales))', value: scales > 1 ? Math.ceil(Math.log2(scales)) : 0, proof: 'A fragment reaches the whole through one sibling per level' }, nat(scales) && scales > 0, { name: 'holo.proofDepth', params: [scales] })
  }

  static forgery(hashBits: number): CrossFormula {
    // the birthday bound as work, 2^⌊bits/2⌋ hash evaluations (the lattice's mintOf(bits/2)); its chance per try beside it
    return crossFormulaOf({ id: 'holo-forgery', src: 'hologram', dst: 'qsec', formula: 'work_forge = 2^⌊hashBits/2⌋ (p_forge = 2^-(hashBits/2))', value: 2 ** Math.floor(hashBits / 2), proof: 'Splicing a fragment needs a SHA-256 collision; birthday bound', ...{ p: 2 ** -(hashBits / 2) } }, nat(hashBits) && hashBits > 0, { name: 'holo.forgery', params: [hashBits] })
  }
}

for (const name of ['forgery', 'proofDepth'] as const)
  hexRegisterOf('holo', name, (HoloFormulas[name] as (...x: unknown[]) => unknown).bind(HoloFormulas))
