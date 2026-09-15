#!/usr/bin/env node
// gen-remaining-alpine — lean/remaining-alpine-port.json, the Alpine port census for the mirrors and classifier as
// they stand. The census is keyed by its inputs (the three mirrors and the two classifier sources), so when one
// moves the key moves; this records the new entry in the chain, where the heal commits it before any receipt.
// Tests only read it: a verification that wrote a tracked file moved the tree under its own receipt.
import { portRemainingAlpine } from '../quantum/os/patime/index.js'
import { UUID_BITS } from '../hexbit/index.js'

// the widths the census is asked at: one bit, and the address
for (const width of [1, UUID_BITS]) {
  const p = portRemainingAlpine(width, { record: true })
  console.log(`✓ gen-remaining-alpine — width ${width}: ${p.remaining} remaining, ${p.failedCount} failed → lean/remaining-alpine-port.json`)
}
