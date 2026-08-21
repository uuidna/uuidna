#!/usr/bin/env node
// Align the published package to a whole multiple of 64 KiB unpacked, to the byte.
//
// WHY THE TARGET IS COMPUTED AND NOT A CONSTANT. This script used to hardcode `TARGET = 65536` — align the whole
// package to exactly 64 KiB. That held while the package was small and then quietly stopped being reachable: by
// v0.2.7 the base measured 3,253,634 bytes, so the required reserve was NEGATIVE and the script threw every time.
// Nothing noticed, because a dormant script is not run by any chain. Two things rotted behind that throw:
//   1. the shipped `reserved.uuidna` still ASSERTED "aligned to EXACTLY 64 KiB (65536 bytes)" — a claim that was
//      false by a factor of 50, published to every npm consumer;
//   2. the script emptied `reserved.uuidna` (to measure the base) BEFORE the reachability check, so merely running
//      it DESTROYED a shipped artifact and then failed.
// Both are fixed here. 64 KiB is now the ALIGNMENT UNIT
// or above the base, so it is reachable at every size the package will ever reach, the padding never exceeds one
// unit, and the header states the measured figure instead of a remembered one.
//
// The reserve is REPRODUCIBLE content-addresses (toUuid of "uuidna:reserve:<i>") — a self-hosted reserve for
// cryptography-goal development, NOT random padding: every line recomputes.
//   node dist/scripts/reserve.js        · verify: npm pack --dry-run --json → unpackedSize % 65536 === 0
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { toUuid } from '../index.js'

const UNIT = 65536 // 64 KiB — the alignment unit
const RESERVED = 'reserved.uuidna'

interface PackFile { path: string; size: number }
interface PackResult { files: PackFile[]; unpackedSize: number }
const measure = (): PackResult => JSON.parse(execSync('npm pack --dry-run --json', { encoding: 'utf8' }))[0]

/** the target is derived
 *  for the header when the base already sits exactly on a boundary. Integer arithmetic only — Math.* settles no
 *  theorem, so the determinism scan rejects it outright and the alignment must be computed without rounding. */
export const alignTarget = (base: number, unit: number = UNIT): number => {
  const pad = (unit - (base % unit)) % unit
  return base + (pad === 0 ? unit : pad)
}

/** ASCII-only header (1 char == 1 byte, so a byte-exact truncation is a char-exact slice). Every number in it is
 *  MEASURED at generation time — the previous header carried a literal, which is how it came to lie. */
export const headerFor = (target: number, base: number): string =>
`# uuidna reserved space - this package is aligned to EXACTLY ${target} bytes unpacked (${target / UNIT} x 64 KiB).
# Measured base (everything except this file): ${base} bytes. Reserve: ${target - base} bytes.
# Below: reproducible content-addresses (toUuid of "uuidna:reserve:<i>"), a self-hosted reserve for the
# cryptography-goal development - NOT random padding; every line recomputes. Regenerate with reserve.js.
`

/** the reserve body, filled to EXACTLY `size` bytes. */
export function reserveBody(size: number, target: number, base: number): string {
  let body = headerFor(target, base)
  for (let i = 0; body.length < size; i++) body += toUuid('uuidna:reserve:' + i) + '\n'
  return body.slice(0, size)
}

if (process.argv[1] && /reserve\.(js|ts)$/.test(process.argv[1])) {
  // measure the base WITHOUT clobbering the shipped file: subtract the reserve entry from the current total.
  const before = measure()
  const entry = before.files.find((f: PackFile) => f.path === RESERVED)
  const base = before.unpackedSize - (entry ? entry.size : 0)

  const target = alignTarget(base)
  const R = target - base
  const header = headerFor(target, base)
  // unreachable only if one whole unit cannot hold the header — then widen the unit rather than corrupt the file.
  if (R < header.length) {
    console.error(`reserve: base ${base} sits ${R} bytes below the ${target} boundary, too tight for a ${header.length}-byte header`)
    process.exit(1)
  }

  writeFileSync(RESERVED, reserveBody(R, target, base))
  const after = measure()
  const exact = after.unpackedSize === target
  console.log(`base: ${base} · reserve: ${R} · unpacked: ${after.unpackedSize} · target: ${target} (${target / UNIT} x 64 KiB) · aligned: ${exact}`)
  if (!exact) { console.error('NOT aligned: ' + after.unpackedSize + ' != ' + target); process.exit(1) }
}
