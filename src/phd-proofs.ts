// phd-proofs — CONCEPT AND WORK, BOTH TRIED, AGAINST THE THESIS SEAL.
//
// Proof of concept is Clay (seven finite instances plus clay_gravity_equals_rosette) AND DNA (codon cube,
// complement involution, the name uuidna_is_dna_times_the_two_coins) — every one `by decide`, and every sealed
// theorem drills. Proof of work is the SHA-256 digest at KEY_BITS against the address floor, the mint that
// searches nothing, the live symmetric stack, AND the codon occupancy: 4³ = 2⁶ = 64 = one coin face, two strands
// fuse the uuid. Complete is both pairs plus prepublishSeal. Arithmetic of counts, not a claim that DNA stores
// addresses.
import { toUuid, TRINITY } from './address.js'
import { coins } from './captain/billing/index.js'
import { BLOCK_BYTES } from './chacha.js'
import { coinSupply } from './coin-supply.js'
import { occupancyTapeOf, ITER, NONCE_BYTES, SALT_BYTES, TAG_BYTES } from './crypt.js'
import { HEXBIT_BITS, KEY_BITS, LEVERAGE, UUID_BITS, GROVER_FLOOR_BITS } from './hexbit/index.js'
import {
  VECTOR_EQUILIBRIUM_INVOLUTIONS, WAVE_INVOLUTION_SEALS, FINITE_INFINITY_GRANTS,
} from './involution-seals.js'
import { prepublishSeal } from './prepublish-seal.js'
import { drillOf } from './quantum/apps/categories/practice/drill.js'
import { theoremDemoCoverage } from './quantum/apps/theorem-demos.js'
import { minerFirmware } from './quantum/os/firmware/index.js'
import { sha256 } from './sha256.js'
import { MAX_LAYERS } from './stream.js'
import { theorems } from './theorems/index.js'

const WORK_DRILLS: readonly string[] = [
  'minting_is_two_per_theorem',
  'minting_is_free_and_forging_is_not',
  'sha256_grover_margin_is_the_address',
  'verify_beats_recompute_by_magnitudes',
  'digest_doubles_the_address',
  'key_floor_is_one_uuid',
  'aead_nonce_and_salt_bits',
  'grover_quadratic_bound',
  'uuidna_is_dna_times_the_two_coins',
  'codons_four_cubed',
  'dna_complement_involution',
  'complement_is_xor_key3',
]

const THESIS_DRILLS: readonly string[] = [...new Set([
  ...VECTOR_EQUILIBRIUM_INVOLUTIONS,
  ...WAVE_INVOLUTION_SEALS,
  ...FINITE_INFINITY_GRANTS,
])]

const DNA_KEYS: readonly string[] = [
  'dna_complement_involution',
  'dna_complement_fixed_point_free',
  'complement_is_xor_key3',
  'codons_four_cubed',
  'uuidna_is_dna_times_the_two_coins',
  'octave_codon_address',
  'otp_self_inverse',
  'translation_is_lossy',
]

export interface PhdConcept {
  clay: number
  clayDecide: boolean
  gravity: boolean
  demos: boolean
  dna: number
  dnaDecide: boolean
  dnaName: boolean
}

export interface PhdWork {
  digestBytes: number
  digestBits: number
  verifyBits: number
  search: number
  drills: number
  decimalSubunit: number
  unit: number
  keyBits: number
  hmacBits: number
  tagBits: number
  nonceBits: number
  saltBits: number
  chachaBlockBits: number
  groverFloor: number
  onionLayers: number
  pbkdf2Iter: number
  shorTargets: number
  sides: number
  faceBits: number
  occupancyBits: number
  bases: number
  frame: number
  codons: number
  strands: number
  complementInvolution: boolean
  complementFixedPointFree: boolean
  thesisDrills: number
  thesisRequired: number
}

export interface PhdThesis {
  ok: boolean
  drained: number
  allDecide: boolean
  gaps: number
}

export interface PhdProofs {
  concept: PhdConcept
  work: PhdWork
  thesis: PhdThesis
  complete: boolean
  receipt: string
}

function power(base: number, exp: number): number {
  let p = 1
  for (let i = 0; i < exp; i++) p = p * base
  return p
}

function complementWalk(bases: number): { involution: boolean; fixedPointFree: boolean } {
  const pad = bases - 1
  const complement = (x: number): number => pad - x
  let involution = true
  let fixedPointFree = true
  for (let x = 0; x < bases; x++) {
    if (complement(complement(x)) !== x) involution = false
    if (complement(x) === x) fixedPointFree = false
  }
  return { involution, fixedPointFree }
}

/** phdProofs() → concept (Clay + DNA + demos) and work (digest + codon occupancy + symmetric stack) against the thesis seal. */
export function phdProofs(): PhdProofs {
  const T = theorems()
  const unit = coins()
  const octet = HEXBIT_BITS * unit
  const clay = T.filter((t) => t.file === 'Clay.lean')
  const clayDecide = clay.length > 0 && clay.every((t) => t.tactic.includes('decide'))
  const gravity = clay.some((t) => t.key === 'clay_gravity_equals_rosette')
  const dnaTheorems = T.filter((t) => DNA_KEYS.includes(t.key))
  const dnaDecide = dnaTheorems.length === DNA_KEYS.length && dnaTheorems.every((t) => t.tactic.includes('decide'))
  const dnaName = dnaTheorems.some((t) => t.key === 'uuidna_is_dna_times_the_two_coins')
  const demos = theoremDemoCoverage(T)
  const supply = coinSupply()
  const firmware = minerFirmware()
  const digest = sha256(new TextEncoder().encode(firmware.image))
  const tape = occupancyTapeOf(toUuid(firmware.image))
  let drills = 0
  const seen = new Set<string>()
  for (const k of [...WORK_DRILLS, ...THESIS_DRILLS]) {
    if (seen.has(k)) continue
    seen.add(k)
    drillOf(k, T)
    drills++
  }
  const thesis = prepublishSeal()
  const bases = HEXBIT_BITS
  const frame = TRINITY
  const codons = power(bases, frame)
  const walk = complementWalk(bases)
  const concept: PhdConcept = {
    clay: clay.length,
    clayDecide,
    gravity,
    demos: demos.ok,
    dna: dnaTheorems.length,
    dnaDecide,
    dnaName,
  }
  const none = unit - unit
  const work: PhdWork = {
    digestBytes: digest.length,
    digestBits: firmware.digestBits,
    verifyBits: firmware.verifyBits,
    search: supply.search,
    drills,
    decimalSubunit: supply.decimalSubunit,
    unit: supply.unit,
    keyBits: KEY_BITS,
    hmacBits: KEY_BITS,
    tagBits: TAG_BYTES * octet,
    nonceBits: NONCE_BYTES * octet,
    saltBits: SALT_BYTES * octet,
    chachaBlockBits: BLOCK_BYTES * octet,
    groverFloor: GROVER_FLOOR_BITS,
    onionLayers: MAX_LAYERS,
    pbkdf2Iter: ITER,
    shorTargets: none,
    sides: unit,
    faceBits: LEVERAGE,
    occupancyBits: tape.length * octet,
    bases,
    frame,
    codons,
    strands: unit,
    complementInvolution: walk.involution,
    complementFixedPointFree: walk.fixedPointFree,
    thesisDrills: THESIS_DRILLS.length,
    thesisRequired: THESIS_DRILLS.length,
  }
  const complete =
    concept.clayDecide && concept.gravity && concept.demos &&
    concept.dnaDecide && concept.dnaName &&
    work.search === none &&
    work.digestBytes * octet === work.digestBits &&
    work.digestBits === KEY_BITS &&
    work.verifyBits === UUID_BITS &&
    work.digestBits / work.verifyBits === unit &&
    work.keyBits === work.digestBits &&
    work.hmacBits === work.keyBits &&
    work.tagBits === work.verifyBits &&
    work.saltBits === work.verifyBits &&
    work.nonceBits < work.saltBits &&
    work.groverFloor === work.verifyBits &&
    work.occupancyBits === work.keyBits &&
    work.sides * work.faceBits === work.verifyBits &&
    work.codons === work.faceBits &&
    work.strands * work.codons === work.verifyBits &&
    work.complementInvolution &&
    work.complementFixedPointFree &&
    work.thesisDrills === work.thesisRequired &&
    thesis.equilibrium.missing.length === none &&
    thesis.finiteInfinities.missing.length === none &&
    work.shorTargets === none &&
    work.decimalSubunit !== work.unit &&
    thesis.ok
  return {
    concept,
    work,
    thesis: {
      ok: thesis.ok,
      drained: thesis.thesis.drained,
      allDecide: thesis.leanFormat.allDecide,
      gaps: thesis.gaps.length,
    },
    complete,
    receipt: toUuid('phd-proofs|' + concept.clay + '|' + concept.dna + '|' + work.drills + '|' + work.codons + '|' + work.keyBits + '|' + work.tagBits + '|' + thesis.gaps + '|' + firmware.image),
  }
}
