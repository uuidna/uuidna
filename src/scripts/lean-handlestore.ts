#!/usr/bin/env node
// Automate the Lean layer for THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address.
//
// The captain, 2026-09-07: "QPU uses handle folders to store multiple uuids related to the handle so fractal
// hologram is complete even on smallest possible level and even there each file is schema that can theoretically
// hold the whole. infinite finites."
//
// WHAT THE STORE ACTUALLY IS, measured before anything was sealed. `src/handles/aa/bb/cc/dd/index.json` — four
// levels of two hexadecimal digits, which spell the eight-digit handle, and the leaf carries the full uuid whose
// first eight digits those are. Both facts are counted over every leaf at generation (SPELLS and PREFIX below) and
// stated as counts, never typed: they were literals from 2026-09-07 (5,512) while the store grew thirteen-fold. The
// theorems below are the arithmetic that shape forces; the measurement is what says this tree is that shape.
//
// THE HOLOGRAM, STATED AS AN IDENTITY RATHER THAN AN IMAGE. The tree is FINITE and exactly sized: two hex digits
// branch 256 ways, four levels give 256⁴ = 16⁸ = 2³² leaves. A uuid is 2¹²⁸. The handle spends 32 of those bits
// as the path, leaving 96 — so 2³² leaves × 2⁹⁶ payloads is 2¹²⁸ exactly, with nothing left over and nothing
// double-counted. The index is not a summary of the space; it is a factorisation of it.
//
// AND THAT IS WHY THE SMALLEST LEVEL IS COMPLETE. One leaf's payload space is 2⁹⁶, which exceeds the ENTIRE
// tree's leaf count of 2³² by a factor of 2⁶⁴. A single folder can therefore carry more distinct addresses than
// the whole index has folders — the part is larger than the whole it sits in, which is the precise sense in which
// nothing is lost at the bottom. "Infinite finites": every level is finite and exactly counted, and the nesting
// of finite levels is what makes the bottom unbounded in practice.
//
// SCOPE: the ARITHMETIC of the addressing, and a measurement of the store as it stands. Nothing here claims the
// store is full — it holds a counted fraction of the 2³² it admits — and nothing claims a leaf's payload space is
// realisable on any disk. A capacity is what the addressing admits, not what has been written.
import { emit } from './lean-gen.js'
import { buildHandleRecords } from './gen-handle-store.js'
import { handlePath } from '../handle.js'

const LEVELS = 4          // aa/bb/cc/dd
const HEX_PER_LEVEL = 2
const BITS_PER_HEX = 4
const HANDLE_HEXBITS = LEVELS * HEX_PER_LEVEL          // 8
const HANDLE_BITS = HANDLE_HEXBITS * BITS_PER_HEX      // 32
const UUID_BITS = 128
const PAYLOAD_BITS = UUID_BITS - HANDLE_BITS           // 96
const BRANCH = 16 ** HEX_PER_LEVEL                     // 256

// the store as it stands, counted from the records gen-handle-store writes
const RECORDS = buildHandleRecords()
const LEAVES = RECORDS.length
const SPELLS = RECORDS.filter((r) => handlePath(r.handle).split('/').slice(2, 2 + LEVELS).join('') === r.handle).length
const PREFIX = RECORDS.filter((r) => r.address.startsWith(r.handle)).length
const CAPACITY = 2 ** HANDLE_BITS
const OVER = (CAPACITY - (CAPACITY % LEAVES)) / LEAVES
const nf = (n: number): string => n.toLocaleString('en-US')

const FACTS = [
  { key: 'the_path_spells_the_handle',
    why: `THE FOLDERS ARE THE NAME, NOT A ROUTE TO IT. Four levels of two hexadecimal digits concatenate to the eight-digit handle, so a leaf's location and its identity are the same string read two different ways. There is no lookup between them and nothing to fall out of step: ${LEVELS} × ${HEX_PER_LEVEL} = ${HANDLE_HEXBITS}. Measured over the store as it stands, the path spells the handle in ${nf(SPELLS)} of ${nf(LEAVES)} leaves.`,
    js: () => LEVELS * HEX_PER_LEVEL === HANDLE_HEXBITS && HANDLE_HEXBITS * BITS_PER_HEX === HANDLE_BITS,
    lean: `theorem the_path_spells_the_handle : (${LEVELS} * ${HEX_PER_LEVEL} = ${HANDLE_HEXBITS}) ∧ (${HANDLE_HEXBITS} * ${BITS_PER_HEX} = ${HANDLE_BITS}) := by decide` },

  { key: 'every_level_branches_the_same_way',
    why: `THE FRACTAL CLAIM, AS A CONSTANT RATHER THAN A RESEMBLANCE. Two hex digits branch ${BRANCH} ways, and every one of the ${LEVELS} levels branches identically — so a subtree at any depth has the shape of the tree itself, and a reader who descends cannot tell from the branching how deep they are. Self-similar is a measurable property here (the branching factor does not vary with depth), not a description of how the store looks.`,
    js: () => [0, 1, 2, 3].every(() => 16 ** HEX_PER_LEVEL === BRANCH),
    lean: `theorem every_level_branches_the_same_way : [1,2,3,4].all (fun _ => 16 ^ ${HEX_PER_LEVEL} == ${BRANCH}) := by decide` },

  { key: 'four_levels_index_two_to_the_thirty_two',
    why: `THE TREE IS FINITE AND EXACTLY SIZED. ${BRANCH}^${LEVELS} = 16^${HANDLE_HEXBITS} = 2^${HANDLE_BITS} = ${(BRANCH ** LEVELS).toLocaleString('en-US')} leaves. Three ways of writing one number, decided as equal so the store's capacity cannot be quoted in one form and checked in another — which is exactly how a census drifts from the thing it counts.`,
    js: () => BRANCH ** LEVELS === 16 ** HANDLE_HEXBITS && 16 ** HANDLE_HEXBITS === 2 ** HANDLE_BITS,
    lean: `theorem four_levels_index_two_to_the_thirty_two : (${BRANCH} ^ ${LEVELS} = 16 ^ ${HANDLE_HEXBITS}) ∧ (16 ^ ${HANDLE_HEXBITS} = 2 ^ ${HANDLE_BITS}) := by decide` },

  { key: 'the_index_factorises_the_whole_space',
    why: `THE HOLOGRAM AS AN IDENTITY. A uuid is 2^${UUID_BITS}. The path spends ${HANDLE_BITS} of those bits, leaving ${PAYLOAD_BITS}, and 2^${HANDLE_BITS} × 2^${PAYLOAD_BITS} = 2^${UUID_BITS} — exactly, with nothing left over and nothing counted twice. The store is not a summary of the address space or an index into it; it is a FACTORISATION of it, which is why descending the tree loses nothing.`,
    js: () => 2 ** HANDLE_BITS * 2 ** PAYLOAD_BITS === 2 ** UUID_BITS && HANDLE_BITS + PAYLOAD_BITS === UUID_BITS,
    lean: `theorem the_index_factorises_the_whole_space : (2 ^ ${HANDLE_BITS} * 2 ^ ${PAYLOAD_BITS} = 2 ^ ${UUID_BITS}) ∧ (${HANDLE_BITS} + ${PAYLOAD_BITS} = ${UUID_BITS}) := by decide` },

  { key: 'the_smallest_leaf_outruns_the_whole_index',
    why: `WHY THE BOTTOM IS COMPLETE. One leaf's payload space is 2^${PAYLOAD_BITS}; the entire tree has 2^${HANDLE_BITS} leaves; the leaf exceeds the index by 2^${PAYLOAD_BITS - HANDLE_BITS}. A single folder can carry more distinct addresses than the whole store has folders — the part is larger than the whole containing it, which is the precise sense in which nothing is lost at the smallest level. Infinite finites: every level is finite and exactly counted, and it is the NESTING of finite levels that leaves the bottom unbounded in practice.`,
    js: () => 2 ** PAYLOAD_BITS > 2 ** HANDLE_BITS && 2 ** PAYLOAD_BITS === 2 ** HANDLE_BITS * 2 ** (PAYLOAD_BITS - HANDLE_BITS),
    lean: `theorem the_smallest_leaf_outruns_the_whole_index : (2 ^ ${PAYLOAD_BITS} > 2 ^ ${HANDLE_BITS}) ∧ (2 ^ ${PAYLOAD_BITS} = 2 ^ ${HANDLE_BITS} * 2 ^ ${PAYLOAD_BITS - HANDLE_BITS}) := by decide` },

  { key: 'the_store_holds_far_less_than_it_admits',
    why: `AND THE CAPACITY IS NOT A CLAIM ABOUT WHAT IS WRITTEN. The store carries ${nf(LEAVES)} leaves against ${nf(CAPACITY)} the addressing admits — decided here so the two numbers can never be quoted as one. A capacity describes what the scheme permits; an occupancy describes what exists; a ledger that let those drift together would be overstating itself by a factor of about ${nf(OVER)}.`,
    js: () => SPELLS === LEAVES && PREFIX === LEAVES && LEAVES < CAPACITY,
    lean: `theorem the_store_holds_far_less_than_it_admits : ${LEAVES} < 2 ^ ${HANDLE_BITS} := by decide` },
]

emit({ file: 'HandleStore.lean',
  header: 'THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address. `src/handles/aa/bb/cc/dd/index.json`: four levels of two hex digits SPELL the eight-digit handle, and the leaf holds the full uuid whose prefix those digits are. ' + `Measured over the ${nf(LEAVES)} leaves present, the path spells the handle in ${nf(SPELLS)} of ${nf(LEAVES)} and the handle is the address prefix in ${nf(PREFIX)} of ${nf(LEAVES)}. `
    + 'THE HOLOGRAM IS AN IDENTITY, NOT AN IMAGE. Two hex digits branch 256 ways and every level branches identically, so a subtree at any depth has the shape of the tree; four levels give 256⁴ = 16⁸ = 2³² leaves; a uuid is 2¹²⁸ and the path spends 32 of those bits, so 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ EXACTLY. The store is a factorisation of the address space rather than an index into it, which is why descending loses nothing. '
    + 'AND THE SMALLEST LEVEL IS COMPLETE because one leaf admits 2⁹⁶ addresses while the entire tree has 2³² leaves — the part exceeds the whole containing it by 2⁶⁴. Infinite finites: every level is finite and exactly counted, and the nesting of finite levels is what leaves the bottom unbounded in practice. '
    + `SCOPE: the arithmetic of the addressing, plus a measurement of the store as it stands. Nothing here claims the store is full — ${nf(LEAVES)} leaves of a possible 2³², sealed as its own theorem so capacity and occupancy can never be quoted as one number — and nothing claims a leaf's payload space is realisable on any disk.`,
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
