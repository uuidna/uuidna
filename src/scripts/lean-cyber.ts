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

const LEVELS = 4, HEX_PER_LEVEL = 2
const HANDLES = buildHandleRecords().map((r) => r.handle)
const LEAVES = HANDLES.length
/** folders at each level: the distinct handle prefixes of 2, 4, 6 and 8 hex digits */
const PER_LEVEL = Array.from({ length: LEVELS }, (_, i) => new Set(HANDLES.map((h) => h.slice(0, HEX_PER_LEVEL * (i + 1)))).size)
const FOLDERS = PER_LEVEL.reduce((a, n) => a + n, 0)
const INODES = LEAVES + FOLDERS + 1                       // + the store's own root folder
const [, , THIRD, DEEPEST] = PER_LEVEL as [number, number, number, number]
const nf = (n: number): string => n.toLocaleString('en-US')

const FACTS = [
  { key: 'the_store_footprint_is_its_folders',
    why: `A STORE'S COST TO ITS HOST IS COUNTED IN INODES, NOT RECORDS. ${nf(LEAVES)} leaves sit under ${PER_LEVEL.map(nf).join(' + ')} folders across the ${LEVELS} levels, so with the root the store occupies ${nf(INODES)} inodes — more than three for every record it holds. On 2026-09-13 that footprint filled the build host's vnode table and panicked the machine twice; a resource the host must hold per inode is the surface, and it is sealed here so the next growth is measured before it is felt.`,
    js: () => LEAVES + FOLDERS + 1 === INODES && INODES > 3 * LEAVES,
    lean: `theorem the_store_footprint_is_its_folders : (${LEAVES} + ${PER_LEVEL.join(' + ')} + 1 = ${INODES}) ∧ (${INODES} > 3 * ${LEAVES}) := by decide` },

  { key: 'every_leaf_owns_its_deepest_folder',
    why: `WHY THE COST IS AT LEAST TWO PER RECORD. The deepest folder is named by the whole eight-digit handle, and no two records share a handle, so the deepest level holds exactly one folder per leaf: ${nf(DEEPEST)} folders for ${nf(LEAVES)} leaves. Every record therefore costs its file and its own folder before any level above is counted — a floor set by the layout, not by how full the store is.`,
    js: () => DEEPEST === LEAVES && new Set(HANDLES).size === LEAVES,
    lean: `theorem every_leaf_owns_its_deepest_folder : ${DEEPEST} = ${LEAVES} := by decide` },

  { key: 'the_third_level_already_shares',
    why: `THE CONTROL: SHARING DOES OCCUR ABOVE THE LEAF. At the third level ${nf(THIRD)} folders hold ${nf(LEAVES)} leaves — fewer folders than leaves, so some six-digit prefixes are shared — which shows the footprint is a measurement of this store and not a constant two-per-record identity that would pass whatever the store held.`,
    js: () => THIRD < LEAVES,
    lean: `theorem the_third_level_already_shares : ${THIRD} < ${LEAVES} := by decide` },
]

emit({ file: 'Cyber.lean', skill: 'cyber',
  header: `CYBER — the resource surface the repository presents to the machine that builds it, measured. The handle store's ${nf(LEAVES)} leaves occupy ${nf(INODES)} inodes (${PER_LEVEL.map(nf).join(' / ')} folders per level plus the root), more than three per record; the deepest level is one folder per leaf by construction; the third level already shares, the control. Derived from the handle records, never from the host, so the ledger is identical on every machine. NOT CLAIMED: any host's limit, which is the host's own fact (on 2026-09-13 the build host's table held 263,168 entries and filled).`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
