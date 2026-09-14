#!/usr/bin/env node
// Automate the Lean layer for CYBER SECURITY, measured — the resource surface the repository presents to the machine
// that builds it. On 2026-09-13 the build host kernel-panicked twice: the handle store's inodes filled the vnode table
// and launchd died of SIGBUS. A denial of service needs no attacker when a store's own shape exhausts a host resource,
// so the shape is sealed here as counts, derived from the same records gen-handle-store writes (hex prefixes of each
// handle, never a walk of the disk or a reading of the host, so the ledger is identical on every machine). The deepest
// level is one folder per leaf by construction — distinct handles, distinct folders — so every record costs at least
// two inodes; the third level already shares, the control that shows the count is not trivially two per record.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'
import { buildHandleRecords } from './gen-handle-store.js'

const FILE = 'Cyber.lean', SKILL = 'cyber'
const LEVELS = 4, HEX_PER_LEVEL = 2
// THE WING DOES NOT COUNT ITS OWN STITCHES. Its theorems and its publication are records of the store it measures, and
// their handles are addresses of the very statements below — so counting them made every serving move the counts it
// states, and no number of cure rounds converged (measured 2026-09-14: 43,457 folders stated, 43,456 after serving).
// Leaving out the records this wing's own file and skill declare makes the count a fixed point by construction.
const RECORDS = buildHandleRecords()
const HANDLES = RECORDS.filter((r) => !(r.files ?? []).includes(FILE) && r.identity !== SKILL).map((r) => r.handle)
const OWN = RECORDS.length - HANDLES.length
const LEAVES = HANDLES.length
/** folders at each level: the distinct handle prefixes of 2, 4, 6 and 8 hex digits */
const PER_LEVEL = Array.from({ length: LEVELS }, (_, i) => new Set(HANDLES.map((h) => h.slice(0, HEX_PER_LEVEL * (i + 1)))).size)
const FOLDERS = PER_LEVEL.reduce((a, n) => a + n, 0)
const INODES = LEAVES + FOLDERS + 1                       // + the store's own root folder
const [, , THIRD, DEEPEST] = PER_LEVEL as [number, number, number, number]
const THIRD_HEX = HEX_PER_LEVEL * 3
// the control's witness is the first two handles, in sorted order, that share a third-level prefix — computed from the
// records, so the kernel checks the sharing itself and not only a count that says it happened
const SHARED = ((): [string, string] => {
  const sorted = [...HANDLES].sort()
  const i = sorted.findIndex((h, j) => j > 0 && h.slice(0, THIRD_HEX) === sorted[j - 1]!.slice(0, THIRD_HEX))
  if (i < 1) throw new Error('lean-cyber: no two handles share a third-level prefix — the control has nothing to witness')
  return [sorted[i - 1]!, sorted[i]!]
})()
const nibbles = (h: string): string => `[${[...h].map((c) => parseInt(c, 16)).join(',')}]`
const nf = (n: number): string => n.toLocaleString('en-US')

const FACTS = [
  { key: 'the_store_footprint_is_its_folders',
    why: `A STORE'S COST TO ITS HOST IS COUNTED IN INODES, NOT RECORDS. Leaving out this wing's own ${nf(OWN)} records, ${nf(LEAVES)} leaves sit under ${PER_LEVEL.map(nf).join(' + ')} folders across the ${LEVELS} levels, so with the root the store occupies ${nf(INODES)} inodes — more than three for every record it holds. The floor is two by construction: the deepest folder is named by the whole handle and no two records share one, so that level holds exactly one folder per leaf (${nf(DEEPEST)} for ${nf(LEAVES)}), and every record costs its file and its own folder before any level above is counted. On 2026-09-13 that footprint filled the build host's vnode table and panicked the machine twice; a resource the host must hold per inode is the surface, and it is sealed here so the next growth is measured before it is felt.`,
    // the one-folder-per-leaf floor is checked here and refuses generation if it ever fails; as a Lean statement it
    // would only read n = n, a seal the kernel decides nothing about
    js: () => LEAVES + FOLDERS + 1 === INODES && INODES > 3 * LEAVES && DEEPEST === LEAVES && new Set(HANDLES).size === LEAVES,
    lean: `theorem the_store_footprint_is_its_folders : (${LEAVES} + ${PER_LEVEL.join(' + ')} + 1 = ${INODES}) ∧ (${INODES} > 3 * ${LEAVES}) := by decide` },

  { key: 'the_third_level_already_shares',
    why: `THE CONTROL: SHARING DOES OCCUR ABOVE THE LEAF. Handles ${SHARED[0]} and ${SHARED[1]} are two records of this store with one third-level folder, ${SHARED[0].slice(0, THIRD_HEX)}, and at that level ${nf(THIRD)} folders hold ${nf(LEAVES)} leaves — which shows the footprint is a measurement of this store and not a constant two-per-record identity that would pass whatever the store held.`,
    js: () => THIRD < LEAVES && SHARED[0].slice(0, THIRD_HEX) === SHARED[1].slice(0, THIRD_HEX) && SHARED[0] !== SHARED[1],
    lean: `theorem the_third_level_already_shares : (${nibbles(SHARED[0])}.take ${THIRD_HEX} = ${nibbles(SHARED[1])}.take ${THIRD_HEX}) ∧ (${nibbles(SHARED[0])} ≠ (${nibbles(SHARED[1])} : List Nat)) ∧ (${THIRD} < ${LEAVES}) := by decide` },
]

emit({ file: FILE, skill: SKILL,
  header: `CYBER — the resource surface the repository presents to the machine that builds it, measured. Counted without this wing's own ${nf(OWN)} records, so serving it cannot move what it states, the handle store's ${nf(LEAVES)} leaves occupy ${nf(INODES)} inodes (${PER_LEVEL.map(nf).join(' / ')} folders per level plus the root), more than three per record; the deepest level is one folder per leaf by construction; the third level already shares, the control. Derived from the handle records, never from the host, so the ledger is identical on every machine. NOT CLAIMED: any host's limit, which is the host's own fact (on 2026-09-13 the build host's table held 263,168 entries and filled).`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
