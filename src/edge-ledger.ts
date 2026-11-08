// @non-harmonic: reads the ledger's pieces from qpu storage over the network — a named boundary; every piece is verified against its content address before a row is used, so what it returns does not depend on the order the reads finish.
//
// edge-ledger — THE EDGE SERVES THE WHOLE LEDGER WITHOUT CARRYING IT (the owner, 2026-09-14: "autonomy fails at scale
// until all lean uncapped and unscoped"). Measured on the tree of that day: 70,931 rows compiled to 22 MB of module
// source, and evaluating the Worker's global scope took 0.95–1.1 s and 155 MB — over the 1 s startup CPU and 128 MB
// a Workers isolate allows — so the uuidna.com Worker could not be built from a tree whose ledger had grown. The rows
// now live where receipts live: the host splits the ledger into pieces and deposits each through the MCP door
// (scripts/ledger-deposit), which lands it in qpu storage at receipts/uuidna/ledger/<its content address>; a manifest
// names the pieces in ledger order, and the manifest's own address — the ROOT — is baked into the bundle
// (src/theorems/edge-root.ts). The edge reads the manifest and the pieces, RECOMPUTES every address from the bytes it
// received and refuses a mismatch, then primes '#ledger' once per isolate. Nothing is trusted that the root does not pin.
//
// THE SPLIT IS DERIVED, never sized by hand: one piece per wing, in ledger order, except a PAGELESS wing (the same
// isPagelessFile predicate compose-object and the theorem door share) — served one key at a time — which splits at the
// first character where its keys differ. qpu storage refuses a value whose JSON exceeds its own heap bound (qpu
// storage: `denied: 'heap'`); a piece that ever meets it is refused at the door by name, not truncated.
import { canonicalJson, toUuidOnce } from './address.js'
import { SEALED_BY } from './refusal-trials.js'
import { isPagelessFile, ledgerFactsOf, type Theorem } from './theorems/index.js'
import { LEDGER_EDGE, type LeanTheorem } from '#ledger'
import type { EdgeRoot } from './theorems/ledger-shape.js'
import { VE_FACES } from './hexbit/index.js'

/** the run the ledger is deposited under — the folder of qpu storage its pieces land in */
export const LEDGER_RUN = 'ledger'
/** where the MCP door lands a run's deposits: receipts/uuidna/<run>/<content address> (mcp.ts, uuidna_evidence {run, deposit}) */
export const LEDGER_STORAGE = `https://qpu.uuidna.com/storage/receipts/uuidna/${LEDGER_RUN}`

/** one deposited piece: a contiguous run of the ledger, with the line address of each row */
export interface LedgerPiece { kind: 'ledger-piece'; file: string; part: string | null; rows: LeanTheorem[]; lines: string[] }
/** the manifest: every piece in ledger order, its row count and its content address */
export interface LedgerManifest { kind: 'ledger-manifest'; count: number; wings: { file: string; part: string | null; count: number; address: string }[] }

/** contentAddressOf(body) → the address the MCP door stores a deposit at: its canonical JSON, addressed (receiptSealOf) */
export const contentAddressOf = (body: unknown): string => toUuidOnce(canonicalJson(body))

/** the longest prefix every key shares */
const sharedPrefix = (keys: readonly string[]): string =>
  keys.reduce((p, k) => { let i = 0; while (i < p.length && p[i] === k[i]) i++; return p.slice(0, i) }, keys[0] ?? '')

/** ledgerPiecesOf(rows, lines) → the ledger as deposit pieces, in ledger order. A wing is one contiguous run of one
 *  file; a pageless wing splits at the first character its keys differ in (the four-hex span: one piece per hex digit). */
export const ledgerPiecesOf = (rows: readonly LeanTheorem[], lines: readonly string[]): LedgerPiece[] => {
  if (rows.length !== lines.length) throw new Error(`ledgerPiecesOf: ${rows.length} rows but ${lines.length} line addresses`)
  const runs: { file: string; at: number; end: number }[] = []
  rows.forEach((t, i) => {
    const last = runs[runs.length - 1]
    if (last && last.file === t.file) last.end = i + 1
    else runs.push({ file: t.file, at: i, end: i + 1 })
  })
  return runs.flatMap(({ file, at, end }) => {
    const wing = rows.slice(at, end)
    const wingLines = lines.slice(at, end)
    if (!isPagelessFile(file)) return [{ kind: 'ledger-piece' as const, file, part: null, rows: [...wing], lines: [...wingLines] }]
    const cut = sharedPrefix(wing.map((t) => t.key)).length + 1
    const parts: LedgerPiece[] = []
    wing.forEach((t, i) => {
      const part = t.key.slice(0, cut)
      const last = parts[parts.length - 1]
      if (last && last.part === part) { last.rows.push(t); last.lines.push(wingLines[i]!) }
      else parts.push({ kind: 'ledger-piece', file, part, rows: [t], lines: [wingLines[i]!] })
    })
    return parts
  })
}

/** ledgerManifestOf(pieces) → the manifest naming every piece by its content address, in ledger order */
export const ledgerManifestOf = (pieces: readonly LedgerPiece[]): LedgerManifest => ({
  kind: 'ledger-manifest',
  count: pieces.reduce((s, p) => s + p.rows.length, 0),
  wings: pieces.map((p) => ({ file: p.file, part: p.part, count: p.rows.length, address: contentAddressOf(p) })),
})

/** edgeRootOf(theorems, root, gate) → what the bundle carries: the manifest's address, the sealed keys and addresses in
 *  ledger order, and the gate's spec (the honesty gate, the witness fold and every gated call read these without rows) */
export const edgeRootOf = (theorems: readonly Theorem[], root: string, gate: readonly string[]): EdgeRoot => ({
  root,
  count: theorems.length,
  keys: theorems.map((t) => t.key).join('\n'),
  addresses: theorems.map((t) => t.address).join(''),
  gate: [...gate],
  facts: ledgerFactsOf(theorems),
})


/** storedAt(address, fetch) → the deposit stored at that address, without the seal the door added — REFUSED unless its
 *  bytes recompute the address it was asked for */
export const storedAt = async (address: string, fetchImpl: typeof fetch): Promise<Record<string, unknown>> => {
  const href = `${LEDGER_STORAGE}/${address}`
  const res = await fetchImpl(href, { headers: { accept: 'application/json' } })
  if (!res.ok) throw new Error(`${href}: qpu storage answered ${res.status}`)
  const doc = (await res.json()) as { value?: unknown }
  const value = doc?.value
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${href}: nothing is stored at this address`)
  const { [SEALED_BY]: _seal, ...body } = value as Record<string, unknown>
  const got = contentAddressOf(body)
  if (got !== address) throw new Error(`${href}: the stored bytes address to ${got}, not ${address} — refused`)
  return body
}

export interface LedgerRead { root: string; manifest: LedgerManifest; rows: LeanTheorem[]; lines: string[] }

// EVERY VERIFIED PIECE IS KEPT, across calls. One request may reach only so many storage reads — the runtime's
// per-request budget, which this code does not know and does not type — so a read that stops part-way keeps what it
// verified, and the next call reads only the pieces still missing. The budget is measured by where the runtime stops.
// FOUR FIELDS, 680 VALUES, 284,068 STRINGS. file, principle, skill and tactic repeat across the ledger — counted over
// the whole of it, those four columns hold 680 distinct values between them — but a parse builds a separate string for
// every row, four per row over 71,017 rows. Pointing the repeats at one string each costs a Map of 680 entries and
// gives the isolate back what 283,388 redundant string headers were holding. The rows are unchanged as values: every
// field still reads equal to what storage sent, because only identical strings are shared.
const POOL = new Map<string, string>()
const intern = (rows: LeanTheorem[]): void => {
  for (const r of rows) {
    for (const f of ['file', 'principle', 'skill', 'tactic'] as const) {
      const v = (r as unknown as Record<string, unknown>)[f]
      if (typeof v !== 'string') continue
      const held = POOL.get(v)
      if (held === undefined) POOL.set(v, v)
      else (r as unknown as Record<string, unknown>)[f] = held
    }
  }
}

const pieceAt = new Map<string, LedgerPiece>()
const manifestAt = new Map<string, LedgerManifest>()
const readLedger = async (root: string, fetchImpl: typeof fetch): Promise<LedgerRead> => {
  const manifest = manifestAt.get(root) ?? (await storedAt(root, fetchImpl)) as unknown as LedgerManifest
  if (manifest.kind !== 'ledger-manifest' || !Array.isArray(manifest.wings)) throw new Error(`${root} is not a ledger manifest`)
  manifestAt.set(root, manifest)
  const missing = manifest.wings.filter((w) => !pieceAt.has(w.address))
  // READ IN LANES, BECAUSE THE TEXTS AND THE OBJECTS ARE RESIDENT AT THE SAME TIME. Asking for all 492 pieces at once
  // held about 25 MB of response text beside the 83.7 MB the parsed rows occupy — measured — and the isolate has 128.
  // The peak is what matters, not the total: a bounded number of texts alive at once keeps the parse from meeting the
  // whole ledger. The pieces still land in pieceAt exactly as before, so a part-read still keeps what it verified.
  // THE CONCURRENT WIDTH IS THE SYSTEM'S OWN COUNT, NOT A NUMBER THAT FELT RIGHT. This read 8, which nothing
  // decided — and the ledger already carries the answer as an open lead: "concurrent width is 14 VE faces". That is
  // VE_FACES, the vector equilibrium's 8 + 6, derived from the handle's hexbits, the hexbit's bits and the two
  // coins, and the same count the 2x7 witness fold signs by. A hand-picked width is a cap no theorem set.
  const LANES = VE_FACES
  const settled: PromiseSettledResult<void>[] = []
  const one = async (w: LedgerManifest['wings'][number]): Promise<void> => {
    const p = (await storedAt(w.address, fetchImpl)) as unknown as LedgerPiece
    if (p.kind !== 'ledger-piece' || p.file !== w.file || p.part !== w.part || p.rows.length !== w.count || p.lines.length !== w.count)
      throw new Error(`piece ${w.address} does not match its manifest entry (${w.file}${w.part === null ? '' : ' ' + w.part}, ${w.count} rows)`)
    intern(p.rows)
    pieceAt.set(w.address, p)
  }
  for (let at = 0; at < missing.length; at += LANES)
    settled.push(...(await Promise.allSettled(missing.slice(at, at + LANES).map(one))))
  const failed = settled.flatMap((s) => (s.status === 'rejected' ? [String((s.reason as Error)?.message ?? s.reason)] : []))
  if (failed.length) throw new Error(`${manifest.wings.length - failed.length} of ${manifest.wings.length} ledger pieces are read and verified; ${failed.length} continue on the next call (first: ${failed[0]})`)
  const pieces = manifest.wings.map((w) => pieceAt.get(w.address)!)
  const rows = pieces.flatMap((p) => p.rows)
  const lines = pieces.flatMap((p) => p.lines)
  if (rows.length !== manifest.count) throw new Error(`the manifest counts ${manifest.count} rows and its pieces hold ${rows.length}`)
  return { root, manifest, rows, lines }
}

/** THE ONE PIECE A KEY SITS IN, FROM QPU STORAGE. This is the whole of what a claim needs: the door resolves each
 *  cited key to its position through the baked root — O(1), no rows — walks the manifest's counts to the single wing
 *  that holds that position, and asks qpu for THAT piece. A handful of keys is a handful of GETs against 492, and the
 *  rows never accumulate in this isolate: they are handed to the shim's row cache, which holds what this call cites
 *  and nothing else. The load sits where the data is.
 *
 *  A key the ledger does not seal is skipped, not fetched, and a key whose piece is already held costs nothing. */
export const rowsForKeys = async (wanted: readonly string[], fetchImpl: typeof fetch): Promise<{ keys: number; pieces: number; rows: number }> => {
  const edge = LEDGER_EDGE
  if (!edge?.root || wanted.length === 0) return { keys: 0, pieces: 0, rows: 0 }
  const root = edge.root.root
  const manifest = manifestAt.get(root) ?? ((await storedAt(root, fetchImpl)) as unknown as LedgerManifest)
  if (manifest.kind !== 'ledger-manifest' || !Array.isArray(manifest.wings)) throw new Error(`${root} is not a ledger manifest`)
  manifestAt.set(root, manifest)
  const addresses = new Set<string>()
  let found = 0
  for (const key of wanted) {
    const i = edge.indexOf(key)
    if (i === undefined) continue
    found++
    let at = 0
    for (const w of manifest.wings) {
      if (i < at + w.count) { addresses.add(w.address); break }
      at += w.count
    }
  }
  let rows = 0
  for (const address of addresses) {
    const piece = pieceAt.get(address) ?? ((await storedAt(address, fetchImpl)) as unknown as LedgerPiece)
    if (piece.kind !== 'ledger-piece') throw new Error(`${address} is not a ledger piece`)
    intern(piece.rows)
    pieceAt.set(address, piece)
    edge.holdRows(piece.rows)
    rows += piece.rows.length
  }
  return { keys: found, pieces: addresses.size, rows }
}

const reads = new Map<string, Promise<LedgerRead>>()
/** ledgerAt(root, fetch) → the whole ledger the manifest at `root` names, every piece verified; read once per isolate
 *  (a failed read is forgotten, so the next call asks again) */
export const ledgerAt = (root: string, fetchImpl: typeof fetch): Promise<LedgerRead> => {
  let p = reads.get(root)
  if (!p) {
    p = readLedger(root, fetchImpl)
    reads.set(root, p)
    p.catch(() => reads.delete(root))
  }
  return p
}

// THE FULL PRIME IS GONE. It read all 492 pieces and held every row for the life of the isolate — 40 MB parsed
// against a 128 MB ceiling — so a door that cited one theorem paid for the ledger and a door that cited none paid
// for it too. Every aggregate a door reports is baked into the root, and the rows a claim cites arrive through
// rowsForKeys, one piece each. Nothing reads the whole ledger at the edge, because nothing there can hold it.

