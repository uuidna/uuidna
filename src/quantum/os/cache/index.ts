// remaining-alpine-cache — VERIFY THE ALPINE PORT CENSUS (verify_beats_recompute_by_magnitudes).
// Host writes lean/remaining-alpine-port.json through boundary; edge never touches disk (ROOT '').
import { existsRoot, rdRoot, wrRoot, ROOT } from '../../../boundary.js'
import { sha256 } from '../../../sha256.js'
import {
  CATALOGUE_FILE,
  CATALOGUE_OVERLAY_FILE,
  CATALOGUE_TESTING_FILE,
} from '../catalogue/index.js'
import type { RemainingAlpinePort } from '../patime/index.js'

const CACHE = 'lean/remaining-alpine-port.json'
const onHost = (): boolean => ROOT.length > 0

const cat = (...parts: Uint8Array[]): Uint8Array => {
  const n = parts.reduce((s, p) => s + p.length, 0)
  const out = new Uint8Array(n)
  let o = 0
  for (const p of parts) { out.set(p, o); o += p.length }
  return out
}

const digestPaths = (): string => {
  const enc = new TextEncoder()
  const parts: Uint8Array[] = []
  // THE KEY IS THE INPUT, AND THE CODE IS AN INPUT (2026-09-13). The same three mirrors once served a stale remainder
  // while a fresh fold of them differed: the classification had changed and this key had not, so an old fold passed
  // as current. The sources that decide the fold are digested beside the data, as lead 144 settled for audit-citations.
  for (const rel of [CATALOGUE_FILE, CATALOGUE_OVERLAY_FILE, CATALOGUE_TESTING_FILE, 'src/quantum/os/patime/index.ts', 'src/quantum/os/catalogue/index.ts']) {
    parts.push(enc.encode(rel))
    parts.push(onHost() && existsRoot(rel) ? enc.encode(rdRoot(rel)) : new Uint8Array(0))
  }
  return [...sha256(cat(...parts))].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
}

const mem = new Map<string, RemainingAlpinePort>()

export function remainingAlpineCacheKey(bootNames: readonly string[], bitWidth: number): string {
  const enc = new TextEncoder()
  const parts = [
    enc.encode(digestPaths()),
    enc.encode('|'),
    enc.encode(bootNames.slice().sort().join(',')),
    enc.encode('|'),
    enc.encode(String(bitWidth)),
  ]
  return [...sha256(cat(...parts))].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
}

export function readRemainingAlpineCache(key: string): RemainingAlpinePort | null {
  const hit = mem.get(key)
  if (hit) return hit
  if (!onHost() || !existsRoot(CACHE)) return null
  try {
    const raw = JSON.parse(rdRoot(CACHE)) as {
      entries?: Record<string, RemainingAlpinePort>
    }
    const row = raw.entries?.[key]
    if (row) mem.set(key, row)
    return row ?? null
  } catch {
    return null
  }
}

export function writeRemainingAlpineCache(key: string, port: RemainingAlpinePort): void {
  mem.set(key, port)
  if (!onHost()) return
  let entries: Record<string, RemainingAlpinePort> = {}
  if (existsRoot(CACHE)) {
    try {
      entries = (JSON.parse(rdRoot(CACHE)) as { entries?: Record<string, RemainingAlpinePort> }).entries ?? {}
    } catch { /* rewrite */ }
  }
  entries[key] = port
  wrRoot(
    CACHE,
    JSON.stringify({
      why: 'Remaining Alpine port census — keyed by catalogue digest + boot closure + bit width. verify_beats_recompute_by_magnitudes: recompute when the mirror moves, verify O(1) when it has not.',
      catalogue: digestPaths(),
      entries,
    }, null, 2) + '\n',
  )
}
