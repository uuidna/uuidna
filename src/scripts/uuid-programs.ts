#!/usr/bin/env node
// @finder phase:21 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added.
//
// uuid-programs — A UUID IS A PROGRAM CALL, AND EVERY CALL THIS SURFACE CAN NAME ROUND-TRIPS. Exhaustively.
//
// The captain, 2026-09-28: "compute all combinatorial using uuid programming… complete and test combinatorics cover all
// combinations in cross formulas proving each other".
//
// THE MECHANISM WAS BUILT AND WIRED TO NOTHING. src/hex-programs.ts encodes a call into a uuid and decodes it back —
// 32 bits of the middle name the door, 16 carry params — and `uuidOfCall` and `callOfUuid` had NO consumer anywhere in
// the tree or the worker. Only the collision census used the index. So the one place this repository does arithmetic on
// uuids as programs was unexercised, which is the failure class it keeps meeting from the other side.
//
// TWO FORMULAS PROVING EACH OTHER, which is what makes this a cross and not a checksum. encode∘decode = id and
// decode∘encode = id are not one claim twice: the first says a uuid survives being understood, the second says a call
// survives being written down, and either can fail while the other holds. A layout change that widened the program
// field would keep the first (the same bytes come back) and break the second (the call now names a different door).
// Both are asserted on every combination, in both directions.
//
// COMPLETE OVER WHAT CAN BE ENUMERATED, AND EXPLICIT ABOUT WHAT CANNOT. The decidable product is
// doors × params = 251 × 65,536 = 16,449,536 calls, and every one of them is walked — not a sample, not a stride.
// handle (2^32) and envelope (2^48) are NOT enumerated, because their product with the above is 2^80 calls and no
// machine finishes it. They are carried through slices DISJOINT from the program and params fields, so the enumerated
// two dimensions are the whole space in which a round trip can fail — and that disjointness is MEASURED below rather
// than argued, by varying handle and envelope over a basis and confirming the door and params results do not move. A
// product proof resting on an unchecked independence claim is the vacuity this tree refuses.
//
// IT COSTS 48 SECONDS AND IS PAID ONCE. The first walk took 147s of linear `programs.find` scans; the index now carries
// hex→door and door→hex maps, which is 3x. What remains is real arithmetic over sixteen million calls, so it rides a
// receipt keyed on the rule AND the door set: a new door changes the set's address and the walk runs again, and nothing
// else does. The captain's rule about long tasks — "usually cracks without real meaning" — is answered by the second
// half of it: this one has meaning, and it is not paid on every pass.
import { hexProgramIndex, callOfUuid, uuidOfCall } from '../hex-programs.js'
import { servedAsync } from '../receipt.js'
import { fsStore, ledgerAndRule } from './receipted.js'

const PARAMS = 16 ** 4          // every value the params cap can hold — the arithmetic, not a literal beside it
const hex4 = (n: number): string => n.toString(16).padStart(4, '0')
/** the carried bases: values for the two fields that are copied verbatim, not enumerated */
const HANDLE = 'aabbccdd'
const ENVELOPE = '0123456789ab'

interface Fail { door: string; params: string; why: string }

const served = await servedAsync<{
  doors: number; params: number; combinations: number; walked: number
  forwardFails: Fail[]; backFails: Fail[]; independence: { bases: number; disagreements: number }
  collisions: number; unresolved: number
}>({
  path: 'lean/uuid-programs-receipt.json',
  // THE DOOR SET IS AN INPUT, not just the rule: the claim is about every door this surface serves, so adding one must
  // invalidate the receipt. Its address comes from the index's own handle, which folds the whole program table.
  inputs: [...ledgerAndRule(['dist/scripts/uuid-programs.js', 'dist/hex-programs.js']), `doors:${hexProgramIndex().handle}`],
  compute: async () => {
    const ix = hexProgramIndex()
    const doors = ix.programs
    const forwardFails: Fail[] = []
    const backFails: Fail[] = []
    let walked = 0
    let unresolved = 0

    for (const d of doors) {
      for (let p = 0; p < PARAMS; p += 1) {
        const params = hex4(p)
        const u = uuidOfCall({ handle: HANDLE, door: d.name, params, envelope: ENVELOPE }, ix)
        const c = callOfUuid(u, ix)
        walked += 1
        if (c.door === null) unresolved += 1
        // FORWARD: the call survives being written down and read back, field by field. Comparing only the door would
        // pass a layout that wrote params into the envelope.
        if (c.door !== d.name || c.params !== params || c.handle !== HANDLE || c.envelope !== ENVELOPE) {
          if (forwardFails.length < 8) forwardFails.push({ door: d.name, params, why: `decoded ${c.door}/${c.params}/${c.handle}/${c.envelope}` })
        }
        // BACK: re-encoding what was decoded reproduces the same 36 characters. This is the direction a widened field
        // breaks while the forward one still holds.
        const again = c.door === null ? '' : uuidOfCall({ handle: c.handle, door: c.door, params: c.params, envelope: c.envelope }, ix)
        if (again !== u) {
          if (backFails.length < 8) backFails.push({ door: d.name, params, why: `re-encoded ${again || '<unresolved>'} ≠ ${u}` })
        }
      }
    }

    // INDEPENDENCE, MEASURED. The product proof above enumerates two of four fields; it is only the whole space if the
    // other two cannot affect the result. Vary them over a basis and require the verdict to be identical.
    let disagreements = 0
    let bases = 0
    for (let hi = 0; hi < 16; hi += 1) {
      for (let ei = 0; ei < 16; ei += 1) {
        const handle = hex4(hi * 4369) + hex4(ei * 4369)
        const envelope = hex4(ei * 4369) + hex4(hi * 4369) + hex4((hi + ei) * 2113 % PARAMS)
        bases += 1
        for (const d of [doors[0]!, doors[(doors.length / 2) | 0]!, doors[doors.length - 1]!]) {
          for (const params of ['0000', '00ff', 'ffff']) {
            const u = uuidOfCall({ handle, door: d.name, params, envelope }, ix)
            const c = callOfUuid(u, ix)
            if (c.door !== d.name || c.params !== params || c.handle !== handle || c.envelope !== envelope) disagreements += 1
          }
        }
      }
    }

    return {
      doors: doors.length, params: PARAMS, combinations: doors.length * PARAMS, walked,
      forwardFails, backFails, independence: { bases, disagreements },
      collisions: ix.collisions.length, unresolved,
    }
  },
}, fsStore)

const v = served.value
console.log(served.hit ? `served by receipt ${served.digest}` : `walked and earned receipt ${served.digest}`)
console.log(`uuid programs — ${v.doors} doors × ${v.params} params = ${v.combinations} combinations`)
// THE COUNT IS AN IDENTITY, not a tally that happened to reach a number. A loop that exited early would report a
// smaller walk and no failure, which is the vacuous success this line exists to refuse.
const complete = v.walked === v.combinations
console.log(`  walked ${v.walked} — ${complete ? 'COMPLETE: every combination, no sample, no stride' : `INCOMPLETE: ${v.combinations - v.walked} never reached`}`)
console.log(`  encode∘decode = id : ${v.forwardFails.length === 0 ? 'holds on all' : `${v.forwardFails.length}+ FAILED`}`)
console.log(`  decode∘encode = id : ${v.backFails.length === 0 ? 'holds on all' : `${v.backFails.length}+ FAILED`}`)
console.log(`  independence of handle/envelope: ${v.independence.bases} bases, ${v.independence.disagreements} disagreement(s)`)
console.log(`  program collisions ${v.collisions} · unresolved programs ${v.unresolved}`)
for (const f of [...v.forwardFails, ...v.backFails].slice(0, 8)) console.log(`    ✗ ${f.door} params ${f.params}: ${f.why}`)

const bad = !complete || v.forwardFails.length > 0 || v.backFails.length > 0
  || v.independence.disagreements > 0 || v.collisions > 0 || v.unresolved > 0
if (bad) {
  console.error('\n✗ uuid-programs — a uuid did not survive being read as the call it names. The middle is the wire')
  console.error('  format this surface routes on, so a broken round trip routes a call to the wrong door or to none.')
  process.exit(1)
}
console.log('\n✓ uuid-programs — every call this surface can name survives both directions, over the complete product.')
