// remaining-alpine-cache — VERIFY THE ALPINE PORT CENSUS (verify_beats_recompute_by_magnitudes).
// portRemainingAlpine walks every remaining catalogue row; the catalogue digest + boot closure key the receipt.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../scripts/api.js'
import {
  CATALOGUE_FILE,
  CATALOGUE_OVERLAY_FILE,
  CATALOGUE_TESTING_FILE,
} from './catalogue.js'
import type { RemainingAlpinePort } from './package-at-a-time.js'

const CACHE = join(ROOT, 'lean', 'remaining-alpine-port.json')

const digestPaths = (): string => {
  const h = createHash('sha256')
  for (const rel of [CATALOGUE_FILE, CATALOGUE_OVERLAY_FILE, CATALOGUE_TESTING_FILE]) {
    h.update(rel)
    h.update(existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel)) : Buffer.alloc(0))
  }
  return h.digest('hex').slice(0, 16)
}

const mem = new Map<string, RemainingAlpinePort>()

export function remainingAlpineCacheKey(bootNames: readonly string[], bitWidth: number): string {
  const h = createHash('sha256')
  h.update(digestPaths())
  h.update('|')
  h.update(bootNames.slice().sort().join(','))
  h.update('|')
  h.update(String(bitWidth))
  return h.digest('hex').slice(0, 16)
}

export function readRemainingAlpineCache(key: string): RemainingAlpinePort | null {
  const hit = mem.get(key)
  if (hit) return hit
  if (!existsSync(CACHE)) return null
  try {
    const raw = JSON.parse(readFileSync(CACHE, 'utf8')) as {
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
  let entries: Record<string, RemainingAlpinePort> = {}
  if (existsSync(CACHE)) {
    try {
      entries = (JSON.parse(readFileSync(CACHE, 'utf8')) as { entries?: Record<string, RemainingAlpinePort> }).entries ?? {}
    } catch { /* rewrite */ }
  }
  entries[key] = port
  writeFileSync(
    CACHE,
    JSON.stringify({
      why: 'Remaining Alpine port census — keyed by catalogue digest + boot closure + bit width. verify_beats_recompute_by_magnitudes: recompute when the mirror moves, verify O(1) when it has not.',
      catalogue: digestPaths(),
      entries,
    }, null, 2) + '\n',
  )
}
